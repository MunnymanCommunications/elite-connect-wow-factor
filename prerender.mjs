/**
 * Post-build prerendering script (auto-discovery edition).
 *
 * What this does:
 *   1. Auto-discovers every <Route path="..."> in src/App.tsx via route-discovery.mjs.
 *      Skips wildcard, gated, and /admin/ routes.
 *   2. Builds the SSR bundle with Vite (entry: src/entry-server.tsx, which is
 *      regenerated from App.tsx by scripts/generate-entry-server.mjs in the
 *      build pipeline before this script runs).
 *   3. Renders each discovered route to dist/{route}/index.html.
 *   4. Injects per-route SEO metadata from seo-metadata.mjs. Routes without
 *      a custom entry get a sensible fallback and are flagged as warnings.
 *   5. Idempotently syncs public/sitemap.xml — newly discovered routes are
 *      appended; existing entries (priority/changefreq) are preserved.
 *
 * No hand-maintained ALL_ROUTES list. App.tsx is the single source of truth.
 */
import { build } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SEO_METADATA } from "./seo-metadata.mjs";
import { discoverRoutes } from "./route-discovery.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, "dist");
const SSR_DIR = path.resolve(__dirname, "dist-ssr");
const SITEMAP_PATH = path.resolve(__dirname, "public/sitemap.xml");

export const BASE_URL = process.env.PRERENDER_BASE_URL || "https://elitecardpro.com";

// Routes that should be prerendered but kept out of sitemap.xml (test/internal pages).
const INTERNAL_ROUTES = new Set([]);

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fallbackMetadata(route) {
  const slug = route.replace(/^\/|\/$/g, "").split("/").pop() || "home";
  const human = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${human} | Elite Card Pro`,
    description: `Learn more about ${human} from Elite Card Pro — professional NFC contact cards that generate referrals. (Add a custom entry to seo-metadata.mjs.)`,
    isFallback: true,
  };
}

function injectMetadata(html, route) {
  const meta = SEO_METADATA[route] || fallbackMetadata(route);
  const safeTitle = escapeHtml(meta.title);
  const safeDesc = escapeHtml(meta.description);

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?"\s*\/?>/,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?"\s*\/?>/,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta property="og:description" content="[\s\S]*?"\s*\/?>/,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[\s\S]*?"\s*\/?>/,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[\s\S]*?"\s*\/?>/,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );
}

function syncSitemap(routes) {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn(`  ⚠️  ${SITEMAP_PATH} not found; skipping sitemap sync`);
    return { added: [], skipped: [] };
  }
  const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");
  const existingLocs = new Set(
    [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim())
  );

  const toAdd = [];
  const skipped = [];
  for (const route of routes) {
    if (INTERNAL_ROUTES.has(route)) {
      skipped.push(route);
      continue;
    }
    const url = `${BASE_URL}${route.endsWith("/") ? route : route + "/"}`;
    if (!existingLocs.has(url)) toAdd.push(url);
  }

  if (toAdd.length === 0) return { added: [], skipped };

  const newEntries = toAdd
    .map(
      (url) =>
        `  <url><loc>${url}</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>`
    )
    .join("\n");

  const updated = xml.replace(
    /<\/urlset>/,
    `\n  <!-- Auto-added by prerender.mjs -->\n${newEntries}\n</urlset>`
  );

  fs.writeFileSync(SITEMAP_PATH, updated);
  return { added: toAdd, skipped };
}

async function prerender() {
  console.log("🔍 Discovering routes from src/App.tsx...");
  const { routes, gated, excluded } = discoverRoutes();
  console.log(`   Found ${routes.length} prerenderable routes`);
  if (gated.length) console.log(`   Skipping ${gated.length} auth-gated route(s): ${gated.join(", ")}`);
  if (excluded.length) console.log(`   Skipping ${excluded.length} excluded route(s): ${excluded.join(", ")}`);

  console.log("\n🗺️  Syncing public/sitemap.xml...");
  const { added: sitemapAdded } = syncSitemap(routes);
  if (sitemapAdded.length) {
    console.log(`   Added ${sitemapAdded.length} new URL(s) to sitemap:`);
    sitemapAdded.forEach((u) => console.log(`     + ${u}`));
  } else {
    console.log("   Sitemap already up to date");
  }

  console.log("\n🔨 Building SSR bundle...");
  await build({
    build: {
      ssr: true,
      outDir: SSR_DIR,
      rollupOptions: {
        input: "src/entry-server.tsx",
        output: { format: "esm" },
      },
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  });

  const { render } = await import(path.join(SSR_DIR, "entry-server.js"));
  const template = fs
    .readFileSync(path.join(DIST_DIR, "index.html"), "utf-8")
    .replace(/\s*<link rel="canonical"[^>]*\/?>/g, "");

  let successCount = 0;
  let errorCount = 0;
  let fallbackCount = 0;
  const fallbackRoutes = [];

  console.log("\n📄 Prerendering routes:");
  for (const route of routes) {
    try {
      const appHtml = render(route);
      const canonicalPath = route.endsWith("/") ? route : route + "/";
      const canonical = `${BASE_URL}${canonicalPath}`;

      let html = template
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        .replace("</head>", `  <link rel="canonical" href="${canonical}" />\n  </head>`);
      html = injectMetadata(html, canonicalPath);

      const dir = path.join(DIST_DIR, canonicalPath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html);

      if (!SEO_METADATA[canonicalPath]) {
        fallbackCount++;
        fallbackRoutes.push(canonicalPath);
        console.log(`  ⚠️  ${canonicalPath} (using fallback SEO copy — please update seo-metadata.mjs)`);
      } else {
        console.log(`  ✓ ${canonicalPath}`);
      }
      successCount++;
    } catch (err) {
      errorCount++;
      console.error(`  ✗ ${route}: ${err.message}`);
    }
  }

  fs.rmSync(SSR_DIR, { recursive: true, force: true });

  console.log(`\n✅ Prerendered ${successCount}/${routes.length} routes`);
  if (fallbackCount > 0) {
    console.log(`⚠️  ${fallbackCount} route(s) used fallback SEO copy. Add real entries to seo-metadata.mjs:`);
    fallbackRoutes.forEach((r) => console.log(`     - ${r}`));
  }
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} route(s) failed to prerender (still served as SPA fallback)`);
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error("\n💥 Prerender failed:", err);
  process.exit(1);
});

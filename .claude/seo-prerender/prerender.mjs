/**
 * Post-build prerendering script (auto-discovery edition).
 *
 * Usage: node prerender.mjs
 *
 * What this does:
 * 1. Parses src/App.tsx and extracts every <Route path="..."> automatically.
 *    - Skips wildcard ("*") routes
 *    - Skips routes wrapped in an auth gate (TridentGate, RequireAuth, etc.)
 *    - Skips routes whose path starts with /admin/
 * 2. Builds the SSR bundle with Vite.
 * 3. Renders each discovered route to HTML.
 * 4. Injects per-route SEO metadata from seo-metadata.mjs.
 *    - If a route has no entry, falls back to a templated default and logs a warning.
 * 5. Writes route-specific dist/{route}/index.html files.
 * 6. Updates public/sitemap.xml so any newly discovered route is added with sensible
 *    defaults. Existing entries (priority/changefreq) are preserved.
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

// ── Configuration ────────────────────────────────────────────────────────────
// Production canonical base URL. Override per-client when copying to a new repo.
export const BASE_URL = process.env.PRERENDER_BASE_URL || "https://2.enzoscleaning.com"; // ⬅️ CLIENT SETUP: change this to the client's production domain

// Internal routes (won't appear in sitemap.xml even if discovered).
// Customize per client. Pages here are still prerendered, just kept out of the sitemap.
const INTERNAL_ROUTES = new Set([ // ⬅️ CLIENT SETUP: update these for each client (test pages, referral pages, etc.)
  "/claude-test/",
  "/ota/",
  "/shop-now/",
  "/hulabowl-ohiobrett/",
  "/hulabowl-ohiobrett/ohiobrettform",
]);

// ── Metadata helpers ─────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Build a fallback title/description for routes that have no SEO_METADATA entry.
 * The verifier flags these as warnings so a human can write real copy later.
 */
function fallbackMetadata(route) {
  const slug = route.replace(/^\/|\/$/g, "").split("/").pop() || "home";
  const human = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${human} | Enzo's Cleaning Solutions`,
    description: `Learn more about ${human} from Enzo's Cleaning Solutions. (This page is missing custom SEO copy — please update seo-metadata.mjs.)`,
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
      /<meta name="description" content="[\s\S]*?">/,
      `<meta name="description" content="${safeDesc}">`
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?">/,
      `<meta property="og:title" content="${safeTitle}">`
    )
    .replace(
      /<meta property="og:description" content="[\s\S]*?">/,
      `<meta property="og:description" content="${safeDesc}">`
    )
    .replace(
      /<meta name="twitter:title" content="[\s\S]*?">/,
      `<meta name="twitter:title" content="${safeTitle}">`
    )
    .replace(
      /<meta name="twitter:description" content="[\s\S]*?">/,
      `<meta name="twitter:description" content="${safeDesc}">`
    );
}

// ── Sitemap auto-sync ────────────────────────────────────────────────────────
/**
 * Add any discovered, non-internal routes to public/sitemap.xml that aren't already
 * present. Existing entries (their priority/changefreq) are preserved untouched.
 */
function syncSitemap(routes) {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn(`  ⚠️  ${SITEMAP_PATH} not found; skipping sitemap sync`);
    return { added: [], skipped: [] };
  }
  const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");

  // Parse existing <loc> entries
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
    if (!existingLocs.has(url)) {
      toAdd.push(url);
    }
  }

  if (toAdd.length === 0) {
    return { added: [], skipped };
  }

  // Insert new entries just before </urlset>. Default priority 0.7, monthly.
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

// ── Main ─────────────────────────────────────────────────────────────────────
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

  // Read the client-built index.html as template, stripping any pre-existing canonical
  // so this script is idempotent (safe to re-run without doubling tags).
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
      const canonical = `${BASE_URL}${route.endsWith("/") ? route : route + "/"}`;

      let html = template
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        .replace("</head>", `  <link rel="canonical" href="${canonical}" />\n  </head>`);
      html = injectMetadata(html, route);

      const routePath = route.endsWith("/") ? route : route + "/";
      const dir = path.join(DIST_DIR, routePath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html);

      if (!SEO_METADATA[route]) {
        fallbackCount++;
        fallbackRoutes.push(route);
        console.log(`  ⚠️  ${route} (using fallback SEO copy — please update seo-metadata.mjs)`);
      } else {
        console.log(`  ✓ ${route}`);
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
    console.log(
      `⚠️  ${fallbackCount} route(s) used fallback SEO copy. Add real entries to seo-metadata.mjs:`
    );
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

/**
 * Prerender verification script.
 *
 * Usage:
 *   node verify-prerender.mjs           # full audit (needs a prior `npm run build`)
 *   node verify-prerender.mjs --routes  # routes vs sitemap only, no build needed
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ALL_ROUTES = [
  "/",
  "/elite-contact-card/",
  "/elite-review-placards/",
  "/videos/",
  "/ai-solutions/",
  "/frequently-asked-questions/",
  "/elite-network/",
  "/venmo-card/",
  "/bitcoin-elite-wallet-card/",
  "/blog/",
  "/nicholasmunn/",
  "/on-boarding/",
  "/digital-business-card/",
];

const EXCLUDED_FROM_PRERENDER = new Set([]);
const INTERNAL = new Set([]);

const BASE_URL = "https://elitecardpro.com";
const GENERIC_TITLE =
  "Elite Card Pro — Professional NFC Contact Cards | Munnyman Communications";
const GENERIC_DESC_FRAGMENT =
  "Professional NFC contact cards with intelligent keyword search. Generate referrals, never lose a connection. Change the way experts connect.";

const DIST_DIR = path.resolve(__dirname, "dist");
const SITEMAP_PATH = path.resolve(__dirname, "public/sitemap.xml");

const ok = (msg) => console.log(`  ✅ ${msg}`);
const warn = (msg) => console.warn(`  ⚠️  ${msg}`);
const fail = (msg) => {
  console.error(`  ❌ ${msg}`);
  errors++;
};

let errors = 0;
let warnings = 0;

function parseSitemapRoutes() {
  const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((m) => {
    const url = m[1].trim();
    return url.replace(BASE_URL, "") || "/";
  });
}

function auditRoutes(sitemapRoutes) {
  console.log("\n📋  ROUTE COVERAGE\n");
  const prerenderedSet = new Set(ALL_ROUTES);
  const sitemapSet = new Set(sitemapRoutes);

  const sitemapNotPrerendered = sitemapRoutes.filter(
    (r) => !prerenderedSet.has(r) && !EXCLUDED_FROM_PRERENDER.has(r)
  );
  if (sitemapNotPrerendered.length) {
    sitemapNotPrerendered.forEach((r) =>
      fail(`In sitemap but NOT prerendered: ${r}`)
    );
  } else {
    ok("All sitemap URLs are prerendered");
  }

  const prerenderedNotInSitemap = ALL_ROUTES.filter(
    (r) => !sitemapSet.has(r) && !INTERNAL.has(r)
  );
  if (prerenderedNotInSitemap.length) {
    prerenderedNotInSitemap.forEach((r) =>
      warn(`Prerendered but NOT in sitemap: ${r}`)
    );
    warnings += prerenderedNotInSitemap.length;
  }
}

async function auditMetadata() {
  console.log("\n🏷️   SEO METADATA COVERAGE\n");
  const { SEO_METADATA } = await import("./seo-metadata.mjs");
  let missing = 0;
  for (const route of ALL_ROUTES) {
    if (!SEO_METADATA[route]) {
      fail(`No SEO metadata for route: ${route}`);
      missing++;
    }
  }
  if (missing === 0) ok(`All ${ALL_ROUTES.length} routes have SEO metadata`);
}

function auditBuiltFiles() {
  console.log("\n🗂️   BUILT HTML FILES\n");

  if (!fs.existsSync(DIST_DIR)) {
    warn("dist/ directory not found — run `npm run build` first.");
    warnings++;
    return;
  }

  for (const route of ALL_ROUTES) {
    const routePath = route.endsWith("/") ? route : route + "/";
    const htmlPath = path.join(DIST_DIR, routePath, "index.html");

    if (!fs.existsSync(htmlPath)) {
      fail(`Missing: dist${routePath}index.html`);
      continue;
    }

    const html = fs.readFileSync(htmlPath, "utf-8");
    const routeErrors = [];

    const rootStart = html.indexOf('<div id="root">');
    const rootEnd = html.lastIndexOf("</div>");
    const rootContent =
      rootStart >= 0 && rootEnd > rootStart
        ? html.slice(rootStart + '<div id="root">'.length, rootEnd)
        : "";
    if (rootContent.trim().length < 100) {
      routeErrors.push("root div is empty or suspiciously short");
    }

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title || title === GENERIC_TITLE) {
      routeErrors.push(`generic/missing <title>: "${title}"`);
    }

    const descMatch = html.match(/<meta name="description" content="([\s\S]*?)"/);
    const desc = descMatch ? descMatch[1].trim() : "";
    if (!desc || desc.startsWith(GENERIC_DESC_FRAGMENT.slice(0, 40))) {
      if (route !== "/") {
        routeErrors.push(`generic/missing <meta description>`);
      }
    }

    const canonical = `${BASE_URL}${routePath}`;
    if (!html.includes(`rel="canonical" href="${canonical}"`)) {
      routeErrors.push(`missing or wrong canonical (expected ${canonical})`);
    }

    if (routeErrors.length) {
      fail(`${route}\n      → ${routeErrors.join("\n      → ")}`);
    } else {
      ok(`${route}  "${title}"`);
    }
  }
}

const routesOnly = process.argv.includes("--routes");

console.log("=".repeat(60));
console.log("  PRERENDER VERIFICATION");
console.log("=".repeat(60));

const sitemapRoutes = parseSitemapRoutes();
auditRoutes(sitemapRoutes);

if (!routesOnly) {
  await auditMetadata();
  auditBuiltFiles();
}

console.log("\n" + "=".repeat(60));
if (errors === 0) {
  console.log(
    `✅  All checks passed${
      warnings ? ` (${warnings} warning${warnings > 1 ? "s" : ""})` : ""
    }.`
  );
} else {
  console.log(
    `❌  ${errors} error${errors > 1 ? "s" : ""}${
      warnings ? `, ${warnings} warning${warnings > 1 ? "s" : ""}` : ""
    } found.`
  );
  process.exit(1);
}
console.log("=".repeat(60) + "\n");

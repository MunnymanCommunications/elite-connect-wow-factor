/**
 * Prerender verification script (auto-discovery edition).
 *
 * Usage:
 *   node verify-prerender.mjs           # full audit (needs a prior `npm run build`)
 *   node verify-prerender.mjs --routes  # just compare routes vs sitemap, no build needed
 *
 * Routes are auto-discovered from src/App.tsx — no hand-maintained list.
 *
 * Checks:
 *   1. Every discovered route has a matching <loc> in public/sitemap.xml (unless internal).
 *   2. Every discovered route has a real entry in seo-metadata.mjs (warns on fallback copy).
 *   3. After a build: every dist/{route}/index.html exists and contains:
 *        - <div id="root"> with real content (not empty)
 *        - A <title> that isn't the generic site fallback
 *        - A <meta name="description"> that isn't the generic fallback
 *        - Exactly one <link rel="canonical"> pointing to the correct URL
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { discoverRoutes } from "./route-discovery.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Configuration ────────────────────────────────────────────────────────────
// Must match BASE_URL in prerender.mjs. Override per-client.
const BASE_URL = process.env.PRERENDER_BASE_URL || "https://2.enzoscleaning.com"; // ⬅️ CLIENT SETUP: change this to the client's production domain
const GENERIC_TITLE = "Enzos Cleaning Solutions"; // ⬅️ CLIENT SETUP: change to the client's generic/fallback site title (no special chars)
const GENERIC_DESC_FRAGMENT = "If You Have A Need We Have The Solution";
const FALLBACK_DESC_FRAGMENT = "This page is missing custom SEO copy";
const DIST_DIR = path.resolve(__dirname, "dist");
const SITEMAP_PATH = path.resolve(__dirname, "public/sitemap.xml");

// Routes that intentionally aren't in the public sitemap (internal/test pages).
// Keep this in sync with INTERNAL_ROUTES in prerender.mjs.
const INTERNAL_ROUTES = new Set([
  "/claude-test/",
  "/ota/",
  "/shop-now/",
  "/hulabowl-ohiobrett/",
  "/hulabowl-ohiobrett/ohiobrettform",
]);

// ── Helpers ──────────────────────────────────────────────────────────────────
let errors = 0;
let warnings = 0;
const ok = (msg) => console.log(`  ✅ ${msg}`);
const warn = (msg) => { console.warn(`  ⚠️  ${msg}`); warnings++; };
const fail = (msg) => { console.error(`  ❌ ${msg}`); errors++; };

function parseSitemapRoutes() {
  if (!fs.existsSync(SITEMAP_PATH)) return [];
  const xml = fs.readFileSync(SITEMAP_PATH, "utf-8");
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((m) => {
    const url = m[1].trim();
    return url.replace(BASE_URL, "") || "/";
  });
}

// ── 1. Route coverage ────────────────────────────────────────────────────────
function auditRoutes(prerenderRoutes, sitemapRoutes, gated, excluded) {
  console.log("\n📋  ROUTE COVERAGE\n");

  const sitemapSet = new Set(sitemapRoutes);
  const prerenderSet = new Set(prerenderRoutes);

  const sitemapNotPrerendered = sitemapRoutes.filter((r) => !prerenderSet.has(r));
  if (sitemapNotPrerendered.length) {
    sitemapNotPrerendered.forEach((r) =>
      fail(`In sitemap.xml but not discovered in App.tsx: ${r}`)
    );
  } else {
    ok("Every sitemap URL is a real, prerenderable route");
  }

  const missingFromSitemap = prerenderRoutes.filter(
    (r) => !sitemapSet.has(r) && !INTERNAL_ROUTES.has(r)
  );
  if (missingFromSitemap.length) {
    missingFromSitemap.forEach((r) =>
      warn(`Prerendered but not in sitemap (won't be crawled): ${r}`)
    );
  } else {
    ok(`All ${prerenderRoutes.length} prerenderable routes are in the sitemap (or marked internal)`);
  }

  if (gated.length) {
    console.log(`\n  ℹ️   Auth-gated, intentionally NOT prerendered:`);
    gated.forEach((r) => console.log(`       ${r}`));
  }
  if (excluded.length) {
    console.log(`\n  ℹ️   Path-excluded (admin/internal), NOT prerendered:`);
    excluded.forEach((r) => console.log(`       ${r}`));
  }
}

// ── 2. SEO metadata coverage ─────────────────────────────────────────────────
async function auditMetadata(prerenderRoutes) {
  console.log("\n🏷️   SEO METADATA COVERAGE\n");
  const { SEO_METADATA } = await import("./seo-metadata.mjs");

  const missing = [];
  for (const route of prerenderRoutes) {
    if (!SEO_METADATA[route]) missing.push(route);
  }
  if (missing.length) {
    missing.forEach((r) =>
      warn(`No custom SEO metadata for: ${r} (using fallback — write real copy in seo-metadata.mjs)`)
    );
  } else {
    ok(`All ${prerenderRoutes.length} routes have custom SEO metadata`);
  }
}

// ── 3. Built HTML audit ──────────────────────────────────────────────────────
function auditBuiltFiles(prerenderRoutes) {
  console.log("\n🗂️   BUILT HTML FILES\n");

  if (!fs.existsSync(DIST_DIR)) {
    warn("dist/ directory not found — run `npm run build` first, then re-run.");
    return;
  }

  for (const route of prerenderRoutes) {
    const routePath = route.endsWith("/") ? route : route + "/";
    const htmlPath = path.join(DIST_DIR, routePath, "index.html");

    if (!fs.existsSync(htmlPath)) {
      fail(`Missing: dist${routePath}index.html`);
      continue;
    }

    const html = fs.readFileSync(htmlPath, "utf-8");
    const issues = [];

    const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>/);
    if (!rootMatch || rootMatch[1].trim().length < 100) {
      issues.push("root div is empty or suspiciously short");
    }

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title || title === GENERIC_TITLE) {
      issues.push(`generic/missing <title>: "${title}"`);
    }

    const descMatch = html.match(/<meta name="description" content="([\s\S]*?)"/);
    const desc = descMatch ? descMatch[1].trim() : "";
    if (!desc || desc.startsWith(GENERIC_DESC_FRAGMENT)) {
      issues.push("generic/missing <meta description>");
    }
    const isFallback = desc.includes(FALLBACK_DESC_FRAGMENT);

    const canonical = `${BASE_URL}${routePath}`;
    const canonicalMatches = [...html.matchAll(/<link rel="canonical"[^>]*href="([^"]+)"/g)];
    if (canonicalMatches.length === 0) {
      issues.push(`missing canonical (expected ${canonical})`);
    } else if (canonicalMatches.length > 1) {
      issues.push(`duplicate canonical tags (${canonicalMatches.length} found)`);
    } else if (canonicalMatches[0][1] !== canonical) {
      issues.push(`wrong canonical: got ${canonicalMatches[0][1]}, expected ${canonical}`);
    }

    if (issues.length) {
      fail(`${route}\n      → ${issues.join("\n      → ")}`);
    } else if (isFallback) {
      warn(`${route}  "${title}"  (fallback SEO copy — write real metadata)`);
    } else {
      ok(`${route}  "${title}"`);
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
const routesOnly = process.argv.includes("--routes");

console.log("=".repeat(60));
console.log("  PRERENDER VERIFICATION");
console.log("=".repeat(60));

const { routes: prerenderRoutes, gated, excluded } = discoverRoutes();
const sitemapRoutes = parseSitemapRoutes();

auditRoutes(prerenderRoutes, sitemapRoutes, gated, excluded);
await auditMetadata(prerenderRoutes); // Always run — fast, and the GH Action depends on it

if (!routesOnly) {
  auditBuiltFiles(prerenderRoutes);
}

console.log("\n" + "=".repeat(60));
if (errors === 0) {
  console.log(
    `✅  All checks passed${warnings ? ` (${warnings} warning${warnings > 1 ? "s" : ""} — review above)` : ""}.`
  );
} else {
  console.log(
    `❌  ${errors} error${errors > 1 ? "s" : ""}${warnings ? `, ${warnings} warning${warnings > 1 ? "s" : ""}` : ""} found.`
  );
  process.exit(1);
}
console.log("=".repeat(60) + "\n");

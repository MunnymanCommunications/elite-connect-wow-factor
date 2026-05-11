#!/usr/bin/env node
/**
 * scripts/generate-entry-server.mjs
 *
 * Auto-generates src/entry-server.tsx from src/App.tsx at build time so the
 * SSR renderer is always in sync with the client router. New pages added by
 * Lovable (or any human edit) are picked up on the next build with zero
 * manual maintenance.
 *
 * Rules:
 *   - `import Foo from "./pages/Foo"`            (default import)  → forwarded
 *   - `import { A, B as C } from "./pages/Bar"`  (named import)    → forwarded
 *   - Wildcard "*" routes are skipped
 *   - Routes wrapped in an auth gate component are skipped
 *   - Routes whose path starts with /admin/ are skipped
 *
 * Usage: node scripts/generate-entry-server.mjs
 *
 * CLIENT SETUP:
 *   1. GATE_WRAPPERS — add any auth gate component names the client uses
 *   2. The provider tree inside the `generate()` template literal must match
 *      App.tsx's client-safe providers (drop Toaster, Sonner, ScrollToTop,
 *      analytics — anything that touches window/document at mount).
 *   3. If App.tsx uses a shared <Layout> wrapper Route, wrap the generated
 *      routes inside it too. If each page renders its own Navbar/Footer
 *      (common Lovable pattern), leave the Layout out as shown below.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_FILE = path.resolve(ROOT, "src/App.tsx");
const ENTRY_FILE = path.resolve(ROOT, "src/entry-server.tsx");

const GATE_WRAPPERS = new Set([
  "TridentGate",
  "RequireAuth",
  "AuthGate",
  "ProtectedRoute",
]);

/**
 * Returns Map<localName, { from: string, kind: "default" | "named", originalName?: string }>
 * Handles default, named, and aliased named imports from "./pages/...".
 */
function parsePageImports(src) {
  const map = new Map();

  // Default: import Foo from "./pages/Foo";
  for (const m of src.matchAll(/^import\s+(\w+)\s+from\s+"(\.\/pages\/[^"]+)"\s*;?$/gm)) {
    map.set(m[1], { from: m[2], kind: "default" });
  }

  // Named (possibly multi-line collapsed to one line): import { A, B as C } from "./pages/Foo";
  for (const m of src.matchAll(
    /^import\s*\{([^}]+)\}\s*from\s*"(\.\/pages\/[^"]+)"\s*;?$/gm
  )) {
    const from = m[2];
    const names = m[1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const n of names) {
      const aliasMatch = n.match(/^(\w+)\s+as\s+(\w+)$/);
      if (aliasMatch) {
        map.set(aliasMatch[2], { from, kind: "named", originalName: aliasMatch[1] });
      } else {
        map.set(n, { from, kind: "named", originalName: n });
      }
    }
  }

  return map;
}

function parseRoutes(src) {
  const routes = [];
  for (const line of src.split("\n")) {
    if (!/<Route\s+path="/.test(line)) continue;
    const pathM = line.match(/path="([^"]+)"/);
    if (!pathM) continue;
    const routePath = pathM[1];
    if (routePath === "*" || routePath.startsWith("/admin/")) continue;

    const elemM = line.match(
      /element=\{<(\w+)((?:\s+\w+=(?:"[^"]*"|'[^']*'|\{[^}]*\}))*)\s*(?:\/>|>)/
    );
    if (!elemM) continue;
    const component = elemM[1];
    if (GATE_WRAPPERS.has(component)) continue;

    // Extract string props only (e.g. partner="ohiobrett")
    const props = {};
    for (const pm of (elemM[2] || "").matchAll(/(\w+)="([^"]+)"/g)) {
      props[pm[1]] = pm[2];
    }

    routes.push({ path: routePath, component, props });
  }
  return routes;
}

function extractExistingPaths(src) {
  const paths = new Set();
  for (const m of src.matchAll(/path:\s*"([^"]+)"/g)) paths.add(m[1]);
  for (const m of src.matchAll(/path="([^"]+)"/g)) paths.add(m[1]);
  paths.delete("*");
  return paths;
}

function jsxProps(props) {
  const entries = Object.entries(props);
  if (!entries.length) return "";
  return " " + entries.map(([k, v]) => `${k}="${v}"`).join(" ");
}

function generate(importMap, routes) {
  const used = new Set(routes.map((r) => r.component));

  // Group imports by source file so named imports collapse into one line.
  const bySource = new Map();
  for (const [name, info] of importMap.entries()) {
    if (!used.has(name)) continue;
    if (!bySource.has(info.from)) bySource.set(info.from, { default: null, named: [] });
    const bucket = bySource.get(info.from);
    if (info.kind === "default") bucket.default = name;
    else bucket.named.push({ local: name, original: info.originalName });
  }

  const importLines = [...bySource.entries()]
    .map(([from, { default: def, named }]) => {
      const parts = [];
      if (def) parts.push(def);
      if (named.length) {
        const inner = named
          .map(({ local, original }) =>
            local === original ? local : `${original} as ${local}`
          )
          .join(", ");
        parts.push(`{ ${inner} }`);
      }
      return `import ${parts.join(", ")} from "${from}";`;
    })
    .join("\n");

  const routeLines = routes
    .map(
      ({ path: p, component, props }) =>
        `          <Route path="${p}" element={<${component}${jsxProps(props)} />} />`
    )
    .join("\n");

  // ⬇️ CLIENT SETUP: adjust the provider tree below to match App.tsx (omit
  //    client-only providers like Toaster/Sonner/ScrollToTop). If App.tsx
  //    uses a <Layout> wrapper Route, add it inside <Routes>.
  return `// AUTO-GENERATED — do not edit by hand.
// Source of truth: src/App.tsx  |  Generator: scripts/generate-entry-server.mjs
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

${importLines}

export function render(url: string) {
  const queryClient = new QueryClient();

  return ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StaticRouter location={url}>
          <Routes>
${routeLines}
          </Routes>
        </StaticRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const appSrc = fs.readFileSync(APP_FILE, "utf-8");
const currentEntry = fs.existsSync(ENTRY_FILE) ? fs.readFileSync(ENTRY_FILE, "utf-8") : "";

const pageImports = parsePageImports(appSrc);
const routes = parseRoutes(appSrc);

const newPaths = new Set(routes.map((r) => r.path));
const oldPaths = extractExistingPaths(currentEntry);
const added = [...newPaths].filter((p) => !oldPaths.has(p));
const removed = [...oldPaths].filter((p) => !newPaths.has(p));

if (added.length) console.log(`  ➕ Added routes:\n${added.map((p) => `     ${p}`).join("\n")}`);
if (removed.length) console.log(`  ➖ Removed routes:\n${removed.map((p) => `     ${p}`).join("\n")}`);
if (!added.length && !removed.length) console.log("  ✓ No route changes.");

fs.writeFileSync(ENTRY_FILE, generate(pageImports, routes), "utf-8");
console.log(`✅ src/entry-server.tsx regenerated (${routes.length} routes)`);

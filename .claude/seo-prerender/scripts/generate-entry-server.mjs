#!/usr/bin/env node
// ── CLIENT SETUP — edit these before uploading to a new client repo ──────────
// GATE_COMPONENTS: add any auth gate component names the client uses
// EXCLUDED_PREFIXES: path prefixes that should never be prerendered
// ─────────────────────────────────────────────────────────────────────────────
/**
 * scripts/generate-entry-server.mjs
 *
 * Auto-generates src/entry-server.tsx from src/App.tsx at build time.
 * Ensures the SSR renderer always matches the client router without manual maintenance.
 *
 * Rules applied when reading App.tsx:
 *   - Only imports matching `import X from "./pages/..."` become SSR imports
 *   - Routes wrapped in TridentGate or RequireAuth are excluded (gated content)
 *   - Routes starting with /admin/ are excluded
 *   - The wildcard * route is excluded (irrelevant for explicit URL rendering)
 *
 * Usage: node scripts/generate-entry-server.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_FILE = path.resolve(ROOT, "src/App.tsx");
const ENTRY_FILE = path.resolve(ROOT, "src/entry-server.tsx");

const GATE_WRAPPERS = new Set(["TridentGate", "RequireAuth"]);

/** Extract page component imports: `import X from "./pages/..."` → Map<name, path> */
function parsePageImports(src) {
  const map = new Map();
  for (const m of src.matchAll(/^import\s+(\w+)\s+from\s+"(\.\/pages\/[^"]+)"/gm)) {
    map.set(m[1], m[2]);
  }
  return map;
}

/**
 * Extract Route definitions from App.tsx, skipping gated, admin, and wildcard routes.
 * Returns: Array<{ path: string, component: string, props: Record<string, string> }>
 */
function parseRoutes(src) {
  const routes = [];
  for (const line of src.split("\n")) {
    if (!/<Route\s+path="/.test(line)) continue;

    const pathM = line.match(/path="([^"]+)"/);
    if (!pathM) continue;
    const routePath = pathM[1];

    if (routePath === "*" || routePath.startsWith("/admin/")) continue;

    // Capture root component name and its JSX props string
    // Handles: element={<Comp />}  and  element={<Comp key="val" />}
    const elemM = line.match(/element=\{<(\w+)((?:\s+\w+=(?:"[^"]*"|'[^']*'|[^}\s>]*))*)\s*(?:\/>|>)/);
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

/** Extract route paths from the current entry-server.tsx for diff logging */
function extractExistingPaths(src) {
  const paths = new Set();
  for (const m of src.matchAll(/path:\s*"([^"]+)"/g)) {
    paths.add(m[1]);
  }
  paths.delete("*");
  return paths;
}

/** Build a React.createElement(...) call string, optionally with a props object */
function createElement(component, props) {
  const entries = Object.entries(props);
  if (entries.length === 0) return `React.createElement(${component})`;
  const propsStr = entries.map(([k, v]) => `${k}: "${v}"`).join(", ");
  return `React.createElement(${component}, { ${propsStr} })`;
}

/** Assemble the full entry-server.tsx file content */
function generate(importMap, routes) {
  const usedComponents = new Set(routes.map((r) => r.component));

  const pageImportLines = [...importMap.entries()]
    .filter(([name]) => usedComponents.has(name))
    .map(([name, from]) => `import ${name} from "${from}";`)
    .join("\n");

  const routeLines = routes
    .map(
      ({ path, component, props }) =>
        `              React.createElement(Route, { path: "${path}", element: ${createElement(component, props)} }),`
    )
    .join("\n");

  return `// AUTO-GENERATED — do not edit by hand.
// Source of truth: src/App.tsx  |  Generator: scripts/generate-entry-server.mjs
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

${pageImportLines}

export function render(url: string) {
  const queryClient = new QueryClient();

  const html = ReactDOMServer.renderToString(
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(
        TooltipProvider,
        null,
        React.createElement(
          StaticRouter,
          { location: url },
          React.createElement(
            Routes,
            null,
            React.createElement(
              Route,
              { element: React.createElement(Layout) },
${routeLines}
            )
          )
        )
      )
    )
  );

  return html;
}
`;
}

// ── Main ──────────────────────────────────────────────────────────────────────

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

const output = generate(pageImports, routes);
fs.writeFileSync(ENTRY_FILE, output, "utf-8");
console.log(`✅ src/entry-server.tsx regenerated (${routes.length} routes)`);

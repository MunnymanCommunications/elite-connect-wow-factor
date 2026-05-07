#!/usr/bin/env node
/**
 * scripts/generate-entry-server.mjs
 *
 * Auto-generates src/entry-server.tsx from src/App.tsx at build time.
 * Ensures the SSR renderer always matches the client router without manual
 * maintenance — so any new <Route> added in App.tsx (e.g. by Lovable) is
 * picked up on the next build with no human edits.
 *
 * Rules:
 *   - Default imports `import X from "./pages/..."` are forwarded
 *   - Named imports `import { A, B } from "./pages/..."` are forwarded
 *   - The wildcard "*" route and routes wrapped in auth gates are skipped
 *   - Routes with path starting with /admin/ are skipped
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

const GATE_WRAPPERS = new Set(["TridentGate", "RequireAuth", "AuthGate", "ProtectedRoute"]);

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

  // Named (possibly multi-line): import { A, B as C } from "./pages/Foo";
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

function buildImportLine(localName, info) {
  if (info.kind === "default") return `import ${localName} from "${info.from}";`;
  if (info.originalName === localName) return `import { ${localName} } from "${info.from}";`;
  return `import { ${info.originalName} as ${localName} } from "${info.from}";`;
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

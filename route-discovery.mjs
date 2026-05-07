/**
 * Route discovery — shared by prerender.mjs and verify-prerender.mjs.
 *
 * Parses src/App.tsx and returns the list of routes that should be prerendered,
 * the routes wrapped in auth gates, and the routes excluded by path prefix.
 *
 * Zero-dependency so the verifier can run without `vite` installed.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_TSX = path.resolve(__dirname, "src/App.tsx");

// Auth-gate component names whose children should NOT be prerendered.
export const GATE_COMPONENTS = ["TridentGate", "RequireAuth", "AuthGate", "ProtectedRoute"];

// Path prefixes that should never be prerendered.
export const EXCLUDED_PREFIXES = ["/admin/"];

export function discoverRoutes() {
  const source = fs.readFileSync(APP_TSX, "utf-8");
  const routes = [];
  const gated = [];
  const excluded = [];

  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/<Route\b[^>]*\bpath\s*=\s*["']([^"']+)["']/);
    if (!m) continue;
    const routePath = m[1];
    if (routePath === "*") continue;

    let element = line;
    let j = i;
    while (
      !element.includes("/>") &&
      !element.includes("</Route>") &&
      j < lines.length - 1
    ) {
      j++;
      element += " " + lines[j];
      if (element.includes("</Route>") || element.match(/\/>\s*$/)) break;
    }

    const isGated = GATE_COMPONENTS.some((g) =>
      new RegExp(`<\\s*${g}\\b`).test(element)
    );
    if (isGated) {
      gated.push(routePath);
      continue;
    }

    if (EXCLUDED_PREFIXES.some((p) => routePath.startsWith(p))) {
      excluded.push(routePath);
      continue;
    }

    routes.push(routePath);
  }

  return {
    routes: [...new Set(routes)],
    gated: [...new Set(gated)],
    excluded: [...new Set(excluded)],
  };
}

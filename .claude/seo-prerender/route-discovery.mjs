/**
 * Route discovery — shared by prerender.mjs and verify-prerender.mjs.
 *
 * Parses src/App.tsx and returns the list of routes that should be prerendered,
 * the routes wrapped in auth gates, and the routes excluded by path prefix.
 *
 * This file has zero dependencies so the verifier can run without `vite`
 * installed (useful in lightweight CI jobs).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_TSX = path.resolve(__dirname, "src/App.tsx");

// ── CLIENT SETUP — edit these before uploading to a new client repo ──────────
// GATE_COMPONENTS: add any auth gate component names the client uses
// EXCLUDED_PREFIXES: path prefixes that should never be prerendered
// ─────────────────────────────────────────────────────────────────────────────

// Auth-gate component names whose children should NOT be prerendered.
// Add new gate names here if a client uses something different.
export const GATE_COMPONENTS = ["TridentGate", "RequireAuth", "AuthGate", "ProtectedRoute"];

// Path prefixes that should never be prerendered.
export const EXCLUDED_PREFIXES = ["/admin/"];

/**
 * Parse src/App.tsx and extract every prerenderable route path.
 *
 * Walks line-by-line. For each <Route path="..."> declaration, accumulates
 * the full element (in case it spans multiple lines) and inspects just that
 * element for auth-gate components. This avoids the trap of looking at the
 * wrong route's element when scanning a window of lines.
 *
 * Returns { routes: string[], gated: string[], excluded: string[] }.
 */
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

    // Build the full Route element. Most are one line. If not, append following
    // lines until we hit "/>" or "</Route>".
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

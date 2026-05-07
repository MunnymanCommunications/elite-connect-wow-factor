# /seo-prerender

Installs and configures static HTML prerendering for SEO on a Vite + React (Lovable) site. Run this once per client project. The system prerenders every route to a real HTML file so Google and AI crawlers don't need JavaScript — React then silently hydrates over the static HTML on the client.

---

## What it does

1. **Reads `src/App.tsx`** to discover all routes automatically (no manual list needed)
2. **Generates `src/entry-server.tsx`** from a template so Vite can do SSR-style rendering
3. **Builds the site** — `vite build` produces the normal client bundle, `prerender.mjs` then renders every route to `dist/{route}/index.html`
4. **Injects per-page SEO metadata** — unique titles and descriptions from `seo-metadata.mjs`
5. **Writes `public/sitemap.xml`** for all public routes
6. **Sets up a GitHub Action** that opens an issue whenever a new Lovable page is added without SEO copy, and auto-closes the issue once copy is written

---

## Trigger

Run via `/seo-prerender` inside a Claude Code session in the client's repo root.

---

## Steps

### 1. Read context

Read these files before changing anything:
- `src/App.tsx` — routes, auth gates, component names
- `package.json` — dependencies (Supabase, router version, etc.)
- `index.html` — existing SEO tags
- `src/main.tsx` — current render setup
- `vercel.json` (if exists) — existing build config

### 2. Fix Supabase localStorage crash (if applicable)

Search for `createClient` from `@supabase/supabase-js`. If found, in the file where the Supabase client is created, change:

```js
storage: localStorage,
```
to:
```js
storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
```

This prevents `ReferenceError: localStorage is not defined` during Node.js prerendering.

### 3. Fix src/main.tsx for hydration

Replace the render call with the hydration-aware pattern. Keep all existing imports and side-effect code:

```tsx
const root = document.getElementById("root")!;
// ⚠️  SEO-CRITICAL — DO NOT simplify this to createRoot().render()
//
// This site uses static HTML prerendering for SEO (see prerender.mjs).
// hydrateRoot: used when Vercel serves a prerendered page.
// createRoot:  fallback for local dev or routes without a prerendered file.
if (root.innerHTML.trim().length > 0) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
```

Make sure `hydrateRoot` is imported from `react-dom/client` alongside `createRoot`.

### 4. Ensure index.html has all required SEO tags

Confirm `index.html` `<head>` contains these (add any that are missing with placeholder content — `prerender.mjs` replaces them at build time):
- `<title>...</title>`
- `<meta name="description" content="..." />`
- `<meta property="og:title" content="..." />`
- `<meta property="og:description" content="..." />`
- `<meta name="twitter:title" content="..." />`
- `<meta name="twitter:description" content="..." />`

### 5. Install prerender scripts

Copy these files from `.claude/seo-prerender/` into the repo root (or create them if the source package isn't present):

| Source | Destination |
|---|---|
| `scripts/generate-entry-server.mjs` | `scripts/generate-entry-server.mjs` |
| `route-discovery.mjs` | `route-discovery.mjs` |
| `prerender.mjs` | `prerender.mjs` |
| `verify-prerender.mjs` | `verify-prerender.mjs` |
| `public/robots.txt` | `public/robots.txt` |

Update `BASE_URL` in `prerender.mjs` and `verify-prerender.mjs` to the client's production domain (read it from `vercel.json` or the existing `sitemap.xml` if present, otherwise ask the user).

### 6. Update vercel.json

Write or update `vercel.json` so the build command is:
```json
{
  "buildCommand": "node scripts/generate-entry-server.mjs && vite build && node prerender.mjs",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 7. Update package.json build script

Ensure the `"build"` script in `package.json` is:
```
"build": "node scripts/generate-entry-server.mjs && vite build && node prerender.mjs"
```

### 8. Write seo-metadata.mjs

Read `src/App.tsx` to get all public routes. Write `seo-metadata.mjs` with a real `title` (50-60 chars) and `description` (140-160 chars) for each route. Use the client's actual business name, services, and geography. No placeholder text.

### 9. Write public/sitemap.xml

Create `public/sitemap.xml` covering all public routes. Exclude internal/test/admin routes (same set as `INTERNAL_ROUTES` in `prerender.mjs`). Use `lastmod` = today's date in `YYYY-MM-DD` format.

### 10. Run the build

```bash
npm run build
```

Fix any errors before continuing. Common ones:
- `ReferenceError: localStorage is not defined` → Supabase fix (Step 2) wasn't applied
- `ReferenceError: window is not defined` → a page reads `window` at module top-level; wrap in `typeof window !== 'undefined'`
- `Cannot find module './entry-server'` → `generate-entry-server.mjs` didn't run; run it manually with `node scripts/generate-entry-server.mjs`

### 11. Run the verifier

```bash
node verify-prerender.mjs
```

Fix all ❌ errors. ⚠️ warnings about fallback copy are OK if you already wrote real copy in Step 8. Re-run until no ❌ errors remain.

### 12. Install the GitHub Action

Copy `.github/workflows/seo-coverage.yml` from `.claude/seo-prerender/` to `.github/workflows/seo-coverage.yml` in the repo root. This is the ongoing maintenance loop — it surfaces missing SEO copy whenever Lovable adds a new page.

### 13. Report before committing

Report:
- How many routes prerendered successfully (N/N)
- Any remaining warnings
- The `<title>` and first 100 chars of `<div id="root">` content in `dist/index.html`

Then commit all changes with the message `feat: add static HTML prerendering for SEO` and push to the current branch.

---

## Files written/modified

| File | Status | Notes |
|---|---|---|
| `src/main.tsx` | Modified | Hydration-aware render |
| `src/entry-server.tsx` | Generated (auto) | Regenerated on every build |
| `scripts/generate-entry-server.mjs` | New | Route → entry-server generator |
| `route-discovery.mjs` | New | Auto-discovers routes from App.tsx |
| `prerender.mjs` | New/Updated | Prerender runner |
| `verify-prerender.mjs` | New/Updated | Build verifier |
| `seo-metadata.mjs` | New/Updated | Per-page SEO copy |
| `public/sitemap.xml` | New/Updated | Sitemap for all public routes |
| `public/robots.txt` | New/Updated | Open to all crawlers incl. AI |
| `vercel.json` | New/Updated | Build command override |
| `package.json` | Modified | Build script |
| `.github/workflows/seo-coverage.yml` | New | Ongoing maintenance action |

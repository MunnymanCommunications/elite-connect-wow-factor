# Lovable SEO Prerender — Client Onboarding

Static HTML prerendering for Vite + React SPAs built with Lovable. Every page becomes a real HTML file that Google and AI crawlers can read without running JavaScript. React then hydrates over it silently on the client.

---

## A. Before you upload anything (5 min)

Open these files in a text editor and make the client-specific edits:

1. **`prerender.mjs`** — find `BASE_URL` (line marked `⬅️ CLIENT SETUP`) and change `https://2.enzoscleaning.com` to the client's production domain (e.g. `https://www.acmecleaning.com`). Also update `INTERNAL_ROUTES` — remove Enzo's-specific paths and add any test/referral pages this client has.

2. **`verify-prerender.mjs`** — same `BASE_URL` change. Also update `GENERIC_TITLE` to the client's site name (used to detect un-replaced placeholder titles), and update `INTERNAL_ROUTES` to match.

3. **`scripts/generate-entry-server.mjs`** — confirm `GATE_WRAPPERS` covers whatever auth gate component the client uses (default covers `TridentGate` and `RequireAuth`). No change needed if the client has no gated routes.

4. **`route-discovery.mjs`** — same: confirm `GATE_COMPONENTS` and `EXCLUDED_PREFIXES` match the client's setup.

5. **`public/robots.txt`** — change `https://CLIENT-DOMAIN.com/sitemap.xml` on the last line to the client's production domain.

Do **not** edit `seo-metadata.mjs` yet — Claude Code writes the real copy during Step E.

---

## B. Upload to GitHub via web UI (10 min)

Go to the client's GitHub repo. For each file below, use **Upload files** (drag-and-drop) or **Create new file** (paste content) as noted.

| File in this package | Destination path in client repo | Method |
|---|---|---|
| `scripts/generate-entry-server.mjs` | `scripts/generate-entry-server.mjs` | Upload files (create `scripts/` folder first by prefixing the path) |
| `route-discovery.mjs` | `route-discovery.mjs` | Upload files |
| `prerender.mjs` | `prerender.mjs` | Upload files (replaces existing if present) |
| `verify-prerender.mjs` | `verify-prerender.mjs` | Upload files (replaces existing if present) |
| `vercel.json` | `vercel.json` | Upload files (replaces existing if present) |
| `seo-metadata.mjs` | `seo-metadata.mjs` | Upload files — **only if the file doesn't already exist** |
| `public/robots.txt` | `public/robots.txt` | Upload files (replaces existing) |
| `.github/workflows/seo-coverage.yml` | `.github/workflows/seo-coverage.yml` | Create new file (create `.github/workflows/` folders first) |

**Commit message to use:** `feat: add static HTML prerendering for SEO`

After uploading, verify the Vercel project settings: the **Build Command** in Vercel's dashboard should be overridden to `node scripts/generate-entry-server.mjs && vite build && node prerender.mjs` — or left blank so `vercel.json` takes over (preferred).

---

## C. Run Claude Code once (paste this prompt)

Open Claude Code in the client repo root and paste the following prompt exactly. Claude will fix the Supabase localStorage crash, update `src/main.tsx` for hydration, write `seo-metadata.mjs`, create `public/sitemap.xml`, run the build, verify it, and report back before committing.

---

```
I've uploaded the SEO prerendering system to this repo. Please complete the client-side setup:

1. **Fix Supabase localStorage (if Supabase is used)**
   Search for `createClient` from `@supabase/supabase-js`. If found, in the file where it's called, change:
     `storage: localStorage,`
   to:
     `storage: typeof localStorage !== 'undefined' ? localStorage : undefined,`
   This prevents a `ReferenceError: localStorage is not defined` crash during Node.js prerendering.

2. **Fix src/main.tsx for hydration**
   Replace the existing render call with this pattern (keep any existing imports and side-effect imports):
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

3. **Check index.html has all required SEO tags**
   Confirm `index.html` contains these tags in `<head>` (add any that are missing with placeholder content):
   - `<title>...</title>`
   - `<meta name="description" content="..." />`
   - `<meta property="og:title" content="..." />`
   - `<meta property="og:description" content="..." />`
   - `<meta name="twitter:title" content="..." />`
   - `<meta name="twitter:description" content="..." />`

4. **Read src/App.tsx** to understand the client's business, routes, and any gated routes.

5. **Write seo-metadata.mjs** with a unique `title` (50-60 chars) and `description` (140-160 chars) for every non-gated, non-admin route in App.tsx. Use the client's actual business name, services, and geography. Do not use generic placeholder text.

6. **Create public/sitemap.xml** covering all public routes (exclude internal test pages, referral pages, admin routes). Use priority 1.0 for `/`, 0.8-0.9 for top-level sections, 0.6-0.7 for deep pages.

7. **Run the full build**: `npm run build`
   This runs: `node scripts/generate-entry-server.mjs && vite build && node prerender.mjs`
   Fix any errors before continuing. Common errors:
   - `ReferenceError: localStorage is not defined` → Supabase fix wasn't applied
   - `ReferenceError: window is not defined` → a page calls `window` at module top-level; wrap in `typeof window !== 'undefined'`

8. **Run the verifier**: `node verify-prerender.mjs`
   Fix any ❌ errors. ⚠️ warnings about fallback SEO copy are OK at this stage if the page just needs copy written.

9. **Report the results** — show me:
   - How many routes prerendered successfully (N/N)
   - Any errors or warnings
   - The `<title>` and first 100 chars of `<div id="root">` for the homepage (`dist/index.html`)
   
   Do NOT commit yet — I want to review the diff first.
```

---

## D. Verify the deploy

After Claude Code reports clean results and you approve the commit + push:

**Vercel build log** — look for these lines in order:
```
✅ src/entry-server.tsx regenerated (N routes)
✅ Prerendered N/N routes
```
If `Prerendered N/N routes` is missing, the generator or prerender script didn't run — check that `vercel.json`'s `buildCommand` is active.

**Googlebot test** — paste the production homepage URL into [Google's Rich Results Test](https://search.google.com/test/rich-results). Under "More info" → "Rendered HTML", you should see real page content, not a blank `<div id="root"></div>`.

**GitHub Action** — go to Actions tab → "SEO Metadata Coverage". It should show green (all routes covered) or open an issue listing routes that need copy. Either outcome is correct — a green run means you're done; an open issue means copy needs writing.

---

## E. Ongoing: when Lovable adds a new page

This is the six-step loop that keeps everything in sync automatically:

1. **Lovable pushes a new page** — it adds a component in `src/pages/` and a `<Route>` in `src/App.tsx`
2. **Vercel triggers a deploy** — `generate-entry-server.mjs` picks up the new route from `App.tsx` and regenerates `src/entry-server.tsx`; `prerender.mjs` prerender the new page with fallback SEO copy
3. **GitHub Action runs** — `verify-prerender.mjs --routes` detects the new route has no custom metadata and opens (or updates) a GitHub issue listing the route with Claude-suggested copy
4. **Write real SEO copy** — open `seo-metadata.mjs`, add the entry for the new route using the suggested copy as a starting point (edit to match actual page content)
5. **Commit and push** — push the `seo-metadata.mjs` change to `main`
6. **Action closes the issue** — `verify-prerender.mjs` now finds the route covered; the action closes the issue automatically

The new page is fully indexed with real SEO copy. No manual entry-server.tsx editing, no manual sitemap updates — those happen automatically.

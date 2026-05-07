---
name: lovable-seo-prerender
description: Set up static-HTML prerendering on a Vite + React (typically Lovable) client website so every page is indexable by Google and AI crawlers. Use when a client's site is a JavaScript SPA that crawlers see as a blank page, when they want to be found by ChatGPT/Claude/Perplexity/Google AI, or whenever you're asked to "make this Lovable site SEO-ready."
---

# Lovable SEO Prerender Setup

This skill bootstraps the same static-HTML prerendering system we built for Enzo's Cleaning onto any Vite + React client website. End state: every route is a real HTML file with unique title, meta description, canonical link, and full body content, served instantly by Vercel; React then hydrates over it without a flash. Crawlers see complete content; users see a fast SPA.

## When to invoke

- Site is a Lovable / Vite / React SPA that scores ~0% on a Googlebot crawl simulator
- Client says "we're not showing up on Google" or "ChatGPT doesn't know about us"
- Onboarding a new client repo and SEO is in scope
- User says "set up prerender like Enzo's" or similar

Skip if the site is already Next.js / Remix / Astro — those have their own SSR/SSG and this skill would conflict.

## Pre-flight checks (do these first)

Confirm the project is compatible. Bail out and tell the user if any check fails.

1. `package.json` has `vite` and `react-dom` (>= 18 for `hydrateRoot`)
2. `react-router-dom` (>= 6) is the router — if it's a different router, the entry-server pattern needs adapting
3. `src/App.tsx` (or equivalent) contains `<BrowserRouter>` with `<Route>` children
4. `index.html` has a `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">`
5. `dist/` is the build output (Vite default) — if customized, note the actual output dir

## Discovery phase

Before touching anything, gather data. Do not skip — the seo-metadata file depends on understanding the business.

1. **Business context.** Read the homepage component and `index.html` to learn what the client does, who they serve, and their geographic area. This drives every page's `<title>` and `<meta description>`.
2. **Route inventory.** Open `src/App.tsx`. Extract every `<Route path="..." element={...} />`. Note: ignore wildcard `*` routes and admin routes.
3. **Gated routes.** Look for any route wrapped in an auth gate (e.g. `<TridentGate>`, `<RequireAuth>`, etc.). These must NOT be prerendered — they'd leak gated content and cause hydration mismatches. Track them in an exclusion list.
4. **Client-only providers.** Note any provider in App.tsx that depends on browser APIs: toasts, analytics SDKs, anything reading `window`/`localStorage`/`document`. The SSR entry must omit these.
5. **Supabase usage.** Search for `createClient` from `@supabase/supabase-js`. If found, note the file — almost certainly contains a `localStorage` reference that will crash SSR (see "Common pitfalls" below).
6. **Existing files.** Check whether `vercel.json`, `public/sitemap.xml`, `public/robots.txt`, `prerender.mjs`, `seo-metadata.mjs` already exist. If yes, plan to merge rather than overwrite.

## Implementation order

Do these strictly in order. Each step assumes the previous one is in place.

### 1. Fix Supabase localStorage (only if Supabase is used)

Supabase's auth client references `localStorage` at module load. Node SSR has no `localStorage`, so it crashes the prerender before a single page renders. In `src/integrations/supabase/client.ts` (or wherever `createClient` is called), change:

```ts
storage: localStorage,
```
to:
```ts
storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
```

Behavior is identical in the browser. In Node, Supabase falls back to in-memory storage, which is correct for SSR. The file usually has a `// automatically generated. Do not edit it directly.` banner — apply the fix anyway and warn the user that Supabase tooling may revert it. This is the #1 gotcha.

### 2. Create `src/entry-server.tsx`

Server-side React renderer that mirrors `App.tsx` but with `StaticRouter` instead of `BrowserRouter`, and strips client-only providers (toasts, gates, analytics). Use `templates/entry-server.tsx.template` as a starting point. For each route in App.tsx:
- Import the same page component
- Wrap auth-gated pages with `<></>` instead of the gate (or just omit them entirely if they're not in `ALL_ROUTES`)
- Do NOT include `<Toaster>`, `<Sonner>`, `<ScrollToTop>`, or any browser-only component

### 3. Create `seo-metadata.mjs`

This is the only file that requires real thought. For every route, write a unique `title` (50–60 chars) and `description` (140–160 chars) tailored to the client's business. Don't copy generic descriptions. Format:

```js
export const SEO_METADATA = {
  "/": { title: "...", description: "..." },
  "/about/": { title: "...", description: "..." },
  // every route in ALL_ROUTES needs an entry
};
```

Use the business context gathered in discovery. Include the company name, geography, and key keywords naturally.

### 4. Create `prerender.mjs`

Copy `templates/prerender.mjs.template` verbatim. Then populate the `ALL_ROUTES` array with every route from App.tsx, EXCLUDING gated/admin routes. Update the `BASE_URL` constant to the client's production domain (used for canonical tags).

### 5. Update `src/main.tsx`

Replace the existing render call with the hydration-aware version from `templates/main.tsx.template`. Keep the `import "./index.css"` and any other side-effect imports.

The key logic: `if (root.innerHTML.trim().length > 0) hydrateRoot(...) else createRoot(...).render(...)`. The leading comment in the template is intentionally loud — keep it.

### 6. Create `vercel.json`

Copy `templates/vercel.json.template` verbatim. The `buildCommand` is intentionally `"vite build && node prerender.mjs"` rather than `"npm run build"` — this protects the build pipeline from Lovable regenerating `package.json`. The `rewrites` rule tells Vercel to serve real files when they exist (the prerendered HTML) and fall back to `/index.html` (the SPA shell) for everything else.

### 7. Update `package.json` build script

Change to: `"build": "vite build && node prerender.mjs"`. This keeps local builds in sync with Vercel. If Lovable later reverts it, Vercel still uses `vercel.json`'s buildCommand, so production stays correct.

### 8. Update `index.html` template

The prerender script uses regex to swap the page's `<title>`, `<meta description>`, OG tags, and Twitter tags. Confirm `index.html` contains all of these tags so the regex has something to match. If any are missing, add them with placeholder content — the prerender will replace them per route.

Required tags in `<head>`:
```html
<title>...</title>
<meta name="description" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
```

### 9. Create `public/sitemap.xml`

Generate from `ALL_ROUTES` minus internal pages (test pages, partner forms, etc.). Use `<priority>` 1.0 for `/`, 0.8–0.9 for top-level sections, 0.6–0.7 for deep pages. Reference the sitemap from `robots.txt`.

### 10. Create `public/robots.txt`

Copy `templates/robots.txt.template`. Update the `Sitemap:` line at the bottom to the client's production domain. The template already explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and other AI crawlers — don't strip those.

### 11. Create `verify-prerender.mjs`

Copy `templates/verify-prerender.mjs.template`. Update its internal `ALL_ROUTES` copy and `BASE_URL` to match. This script is the safety net — run after every build to confirm every page actually has unique title, real content, and correct canonical.

## Verification

In order, run these and confirm clean output:

1. `node verify-prerender.mjs --routes` — confirms route + sitemap + metadata coverage. Must pass before anything else.
2. `npm run build` — confirms the prerender actually runs without errors. Look for `✅ Prerendered N/N routes` at the end. If any route fails, the error tells you which import is doing something browser-only.
3. `node verify-prerender.mjs` — full audit of `dist/`. Every route must have non-empty root div, unique title, unique description, and correct canonical.
4. Spot-check one or two pages: `cat dist/about-us/index.html | head -50` — eyeball that the title, description, and visible body text match the page.
5. After Vercel deploy: paste the production URL into a Googlebot simulator (e.g. `https://search.google.com/test/rich-results`) and confirm the rendered HTML has real content, not a blank shell.

## Common pitfalls (debug guide)

- **`ReferenceError: localStorage is not defined`** during prerender → Supabase fix wasn't applied. See step 1.
- **`ReferenceError: window is not defined`** → A page or hook calls `window` at module top-level. Wrap it in `typeof window !== 'undefined'` or move it inside a `useEffect`.
- **Hydration mismatch warnings on a route** → That route renders different markup on server vs client. Usual cause: a gate, an auth check, or a `Math.random()`/`Date.now()` at render time. Either exclude the route from `ALL_ROUTES` or make the component render identically.
- **Empty `<div id="root">` in the output** → entry-server isn't matching the URL. Confirm the route path in entry-server.tsx exactly matches the `ALL_ROUTES` entry, including trailing slash.
- **All pages have the same title** → `index.html` is missing the `<title>` tag the regex looks for, or the route isn't in `seo-metadata.mjs`.
- **Lovable regenerated `main.tsx` and broke hydration** → restore the template, point the user at the warning comment, and consider extracting the hydration logic to a helper file Lovable doesn't know about.
- **Lovable regenerated `package.json` and dropped the prerender step** → no action needed; `vercel.json`'s `buildCommand` is the authoritative source. Local builds will be wrong but production is fine.

## Adding new pages later

When the client adds a new page through Lovable:

1. Lovable adds the route to `App.tsx` automatically.
2. Manually mirror it in `src/entry-server.tsx`.
3. Add the path to `ALL_ROUTES` in both `prerender.mjs` AND `verify-prerender.mjs`.
4. Add a `title` + `description` entry to `seo-metadata.mjs`.
5. Add the URL to `public/sitemap.xml`.
6. Push. Vercel rebuilds and re-prerenders everything automatically.

If steps 2–5 aren't done, the page still works as a client-side SPA route but won't be indexable.

## Files this skill creates or modifies

| File | New or modified |
|---|---|
| `vercel.json` | new |
| `prerender.mjs` | new |
| `seo-metadata.mjs` | new |
| `verify-prerender.mjs` | new |
| `src/entry-server.tsx` | new |
| `src/main.tsx` | modified (hydrateRoot) |
| `src/integrations/supabase/client.ts` | modified (only if Supabase) |
| `package.json` | modified (build script) |
| `index.html` | modified (ensure SEO tag stubs) |
| `public/sitemap.xml` | new or merged |
| `public/robots.txt` | new or merged (AI-friendly) |

## Templates

Reference templates live in `templates/` next to this file. They are starting points, not exact files — `ALL_ROUTES`, `BASE_URL`, page imports, and `SEO_METADATA` content must always be customized per project.

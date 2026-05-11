---
name: lovable-seo-prerender
description: Set up static-HTML prerendering on a Vite + React (typically Lovable) client website so every page is indexable by Google and AI crawlers. Use when a client's site is a JavaScript SPA that crawlers see as a blank page, when they want to be found by ChatGPT/Claude/Perplexity/Google AI, or whenever you're asked to "make this Lovable site SEO-ready."
---

# Lovable SEO Prerender Setup — Auto-Discovery Edition

## What this system does

Every `<Route>` in `src/App.tsx` is automatically discovered at build time, rendered to a real HTML file, and added to `public/sitemap.xml`. React hydrates over the prerendered DOM so users still get a fast SPA. Crawlers see complete content without executing JavaScript.

**After initial setup there is zero ongoing maintenance.** When a client adds a new page via Lovable:
- `scripts/generate-entry-server.mjs` regenerates `src/entry-server.tsx` from App.tsx
- `prerender.mjs` renders the new route and appends its URL to the sitemap
- Optionally add real copy to `seo-metadata.mjs` — the build uses a sensible fallback until you do

`src/App.tsx` is the single source of truth. No hand-maintained route lists anywhere.

## When to invoke

- Site is a Lovable / Vite / React SPA that scores ~0% on a Googlebot crawl simulator
- Client says "we're not showing up on Google" or "ChatGPT doesn't know about us"
- Onboarding a new client repo and SEO is in scope
- User says "set up prerender" or similar

Skip if the site is already Next.js / Remix / Astro — those have SSR/SSG and this system would conflict.

## Pre-flight checks (do these first, bail out if any fail)

1. `package.json` has `vite` and `react-dom` >= 18 (needed for `hydrateRoot`)
2. `react-router-dom` >= 6 is the router (`<BrowserRouter>` with `<Route>` children)
3. `src/App.tsx` contains `<Route path="..." element={...} />` declarations
4. `index.html` has `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">`
5. `dist/` is the Vite build output directory

## Discovery phase (do not skip)

Before creating any files, read the codebase to understand the client's setup. These answers drive every decision below.

### A. Business context
Read `index.html`, the homepage component, and a few page components. Learn:
- What the business does
- Who they serve and what geography (if any)
- Primary keywords a potential customer would search for
- Company name and any brand variants

This feeds `seo-metadata.mjs`. Every title and description must reflect this client specifically — never use generic copy.

### B. Route structure
Read `src/App.tsx` completely. Note:
- Every `<Route path="...">` — these become `ALL_ROUTES`
- Ignore wildcard `*` routes and `/admin/` routes
- Any routes wrapped in auth gates (e.g. `<TridentGate>`, `<RequireAuth>`) — these must be excluded
- Whether pages use a shared `<Layout>` wrapper route or each page renders its own Navbar/Footer

### C. Import style
Look at how App.tsx imports page components:
- **Default imports:** `import Foo from "./pages/Foo"` — standard
- **Named imports from a shared file:** `import { A, B, C } from "./pages/ProductPages"` — the generator handles this, but note the source file name

The generator handles both styles automatically. Just be aware so you can verify the generated `entry-server.tsx` looks correct.

### D. Client-only providers
In App.tsx, identify providers that use browser APIs at mount:
- `<Toaster>`, `<Sonner>`, `<ScrollToTop>` — omit from SSR entry
- Analytics SDKs reading `window` — omit from SSR entry
- `<QueryClientProvider>`, `<TooltipProvider>` — safe to keep in SSR entry

### E. Supabase check
Search for `createClient` from `@supabase/supabase-js`. If found, it needs the localStorage guard (Step 1 below) or SSR crashes.

### F. Existing files
Check for `vercel.json`, `public/sitemap.xml`, `public/robots.txt`, `prerender.mjs`, `seo-metadata.mjs`. Merge rather than overwrite if they exist.

---

## Implementation order

Do these strictly in order. Each step assumes the previous is done.

### Step 1 — Fix Supabase localStorage (only if Supabase is used)

In `src/integrations/supabase/client.ts` (or wherever `createClient` is called):

```ts
// Before
storage: localStorage,

// After
storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
```

Node SSR has no `localStorage`. This guard is the #1 crash cause. The file often has a "do not edit" banner — apply the fix anyway and warn the user Supabase tooling may revert it.

---

### Step 2 — Create `route-discovery.mjs`

This is the shared parser. Both `prerender.mjs` and `verify-prerender.mjs` import from it. Use `templates/route-discovery.mjs.template` as the base — it needs no client-specific edits unless the project uses custom gate component names or additional excluded path prefixes.

Place it at the project root.

---

### Step 3 — Create `scripts/generate-entry-server.mjs`

This auto-generates `src/entry-server.tsx` from `src/App.tsx` every build. Use `templates/generate-entry-server.mjs.template` as the base, then make two client-specific edits:

**A. Layout wrapper** — check if App.tsx uses a shared layout route:
```tsx
// WITH shared Layout (has a parent <Route element={<Layout />}>)
// → the generator template wraps routes in a Layout Route — keep it

// WITHOUT shared Layout (each page component includes Navbar/Footer itself)
// → remove the Layout wrapping from the generated entry-server output in the template
```

**B. Provider tree** — the generated entry-server must include the same providers App.tsx uses, minus browser-only ones. Edit the `generate()` function's template literal to match: typically `QueryClientProvider` + `TooltipProvider` wrapping `StaticRouter`.

Place the script at `scripts/generate-entry-server.mjs`.

---

### Step 4 — Create `seo-metadata.mjs`

This is the only file requiring real thought per client. Write a unique `title` (50–60 chars) and `description` (140–160 chars) for every current route. Routes added later by Lovable will get an auto-generated fallback title until you add an entry here.

```js
export const SEO_METADATA = {
  "/": {
    title: "Company Name | Primary Keyword Phrase",
    description: "What they do, who they serve, geography, compelling reason to click. ~150 chars.",
  },
  "/about/": {
    title: "About | Company Name",
    description: "...",
  },
  // one entry per route, keyed with trailing slash
};
```

**Keys must use trailing slashes** (e.g. `"/about/"` not `"/about"`) — prerender.mjs normalizes all routes to trailing-slash form before looking up metadata.

Use `templates/seo-metadata.mjs.template` as the starting format.

---

### Step 5 — Create `prerender.mjs`

Use `templates/prerender.mjs.template`. Make these client-specific edits:

1. **`BASE_URL`** — set to the client's production domain: `"https://clientdomain.com"`
2. **`INTERNAL_ROUTES`** — add any routes that should prerender but stay out of sitemap (test pages, internal partner pages, etc.). Usually empty for a fresh client.
3. **Fallback metadata company name** — in `fallbackMetadata()`, change `"Client Name"` to the actual client name

Everything else (route discovery, sitemap sync, SSR build, per-route HTML generation) is automatic.

---

### Step 6 — Update `src/main.tsx`

Replace the existing render call with the hydration-aware version from `templates/main.tsx.template`. Keep any existing side-effect imports (`./index.css`, etc.).

The key logic:
```tsx
if (root.innerHTML.trim().length > 0) {
  hydrateRoot(root, <App />);   // prerendered page — attach without destroying DOM
} else {
  createRoot(root).render(<App />);  // local dev / non-prerendered route
}
```

The loud comment block is intentional — keep it. It stops Lovable or another engineer from "simplifying" this back to `createRoot` and breaking all SEO.

---

### Step 7 — Create `vercel.json`

Use `templates/vercel.json.template`. The build command must be:
```
node scripts/generate-entry-server.mjs && vite build && node prerender.mjs
```

This order is mandatory: generate entry-server first → build client bundle → prerender. The `rewrites` rule serves real prerendered files when they exist and falls back to the SPA shell.

---

### Step 8 — Update `package.json` build script

Change to match the Vercel build command:
```json
"build": "node scripts/generate-entry-server.mjs && vite build && node prerender.mjs"
```

If Lovable later reverts `package.json`, Vercel still uses `vercel.json`'s `buildCommand`, so production stays correct. Local builds will be out of sync until restored, but production never breaks.

---

### Step 9 — Ensure `index.html` has required SEO tag stubs

The prerender script uses regex to replace these tags per route. If any are missing, the regex has nothing to match and that page's metadata won't be injected. Add placeholder content for any that are absent:

```html
<title>Placeholder</title>
<meta name="description" content="placeholder" />
<meta property="og:title" content="placeholder" />
<meta property="og:description" content="placeholder" />
<meta name="twitter:title" content="placeholder" />
<meta name="twitter:description" content="placeholder" />
```

---

### Step 10 — Create `public/sitemap.xml`

Manually create the initial sitemap with the current known routes and priorities. After this, `prerender.mjs` will auto-append any new routes it discovers. Existing entries (priority, changefreq) are never touched by the auto-sync.

Priority guide:
- `1.0` — homepage
- `0.8–0.9` — main product/service pages
- `0.7` — secondary pages, blog, videos
- `0.5–0.6` — FAQ, about, onboarding

Use `templates/sitemap.xml.template` as a starting point.

---

### Step 11 — Create `public/robots.txt`

Use `templates/robots.txt.template`. Change only the `Sitemap:` line at the bottom to the client's domain. The template explicitly allows all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) — do not remove these lines.

---

### Step 12 — Create `verify-prerender.mjs`

Use `templates/verify-prerender.mjs.template`. Make these client-specific edits:

1. **`BASE_URL`** — client's production domain
2. **`GENERIC_TITLE_FRAGMENT`** — a substring of the homepage's generic `<title>` in `index.html`, used to detect when a non-home page got the wrong title

No `ALL_ROUTES` list to maintain — routes come from `route-discovery.mjs`.

---

## Verification sequence

Run in this order. Do not skip steps.

```bash
# 1. Confirm routes discovered correctly (no build needed)
node verify-prerender.mjs --routes

# 2. Generate entry-server and confirm correct routes/imports
node scripts/generate-entry-server.mjs

# 3. Full build
npm run build
# Expected: "✅ Prerendered N/N routes" with no ✗ errors
# Warnings about fallback SEO copy are OK for now

# 4. Full audit of built files
node verify-prerender.mjs
# Every route should show ✅ with its unique title

# 5. Spot-check a route
head -30 dist/about/index.html
# Should see the correct <title>, <meta description>, canonical
```

---

## Common pitfalls

**`ReferenceError: localStorage is not defined`** during build
→ Supabase fix (Step 1) wasn't applied or was reverted.

**`ReferenceError: window is not defined`**
→ A page component or hook reads `window` at module top-level (outside `useEffect`). Wrap with `typeof window !== 'undefined'` or move inside `useEffect`. Check the error stack for the exact file.

**`ReferenceError: document is not defined`**
→ Same pattern as above. Usually found in analytics or scroll helpers. Move inside `useEffect`.

**Hydration mismatch warnings on a route**
→ Server HTML and client HTML differ. Common causes: auth gates, `Math.random()` at render time, `Date.now()` at render time, or any component that reads `window` and renders differently. Exclude the route from prerendering or make the component render identically in both environments.

**Generated `entry-server.tsx` is missing a page component**
→ The import in App.tsx doesn't match the parser's expected pattern. Check for unusual import forms. Rare — the parser handles default and named imports from `./pages/` files.

**Empty `<div id="root">` in output for one route**
→ The `StaticRouter` couldn't match that URL to a `<Route>`. Check that the path in `entry-server.tsx` exactly matches the discovered route path (including whether there's a trailing slash).

**All pages show the same title**
→ `index.html` is missing the `<title>` tag the regex targets, or the route key in `seo-metadata.mjs` doesn't have a trailing slash (keys must be `"/about/"` not `"/about"`).

**Lovable regenerated `main.tsx` and broke hydration**
→ Restore `src/main.tsx` from `templates/main.tsx.template`. To reduce recurrence, the warning comment in main.tsx is intentionally prominent. If Lovable keeps reverting it, extract the hydration check to a small `src/boot.ts` file Lovable has no reason to touch.

**Lovable regenerated `package.json` and dropped the build step**
→ No urgent action. Vercel reads `buildCommand` from `vercel.json` which Lovable doesn't touch — production builds stay correct. Restore `package.json` for local dev parity when convenient.

**New page prerendered with fallback SEO copy**
→ Expected behavior. Add an entry to `seo-metadata.mjs` with a real title/description. The build will then use the custom copy. The build prints a warning listing all routes using fallback copy.

---

## What never needs manual updates after setup

| Concern | Handled by |
|---|---|
| New route added by Lovable | `generate-entry-server.mjs` picks it up from App.tsx |
| New page prerendered | `prerender.mjs` discovers and renders it |
| New URL added to sitemap | `prerender.mjs` appends it automatically |
| `entry-server.tsx` staying in sync | Regenerated on every build — never edit by hand |
| SPA hydration on unprerendered routes | `main.tsx` `createRoot` fallback |

## What requires a human after setup

| Concern | What to do |
|---|---|
| New page needs real SEO copy | Add entry to `seo-metadata.mjs` (build warns until done) |
| New page needs custom sitemap priority | Edit the auto-added `<url>` entry in `public/sitemap.xml` |
| Supabase client.ts reverted | Re-apply the `localStorage` guard |
| `main.tsx` reverted by Lovable | Restore from `templates/main.tsx.template` |

---

## Files this skill creates or modifies

| File | Status |
|---|---|
| `route-discovery.mjs` | **new** — App.tsx parser, no client edits needed |
| `scripts/generate-entry-server.mjs` | **new** — auto-generates `src/entry-server.tsx` |
| `src/entry-server.tsx` | **auto-generated** — never edit by hand, regenerated on every build |
| `prerender.mjs` | **new** — auto-discovers routes, renders HTML, syncs sitemap |
| `seo-metadata.mjs` | **new** — per-route titles/descriptions (only file needing ongoing human copy) |
| `verify-prerender.mjs` | **new** — build audit script |
| `src/main.tsx` | **modified** — hydrateRoot when prerendered |
| `vercel.json` | **new** — authoritative build command + SPA rewrite |
| `package.json` | **modified** — build script kept in sync |
| `index.html` | **modified if needed** — ensure SEO tag stubs present |
| `public/sitemap.xml` | **new** (initial) then auto-updated by prerender |
| `public/robots.txt` | **new or updated** — AI-crawler friendly |
| `src/integrations/supabase/client.ts` | **modified only if Supabase is used** |

---

## Templates

All templates are in the `templates/` directory next to this file.

| Template | Purpose |
|---|---|
| `route-discovery.mjs.template` | Copy verbatim — no per-client edits usually needed |
| `generate-entry-server.mjs.template` | Adapt provider tree and Layout usage for the client |
| `prerender.mjs.template` | Set BASE_URL, INTERNAL_ROUTES, fallback company name |
| `verify-prerender.mjs.template` | Set BASE_URL and GENERIC_TITLE_FRAGMENT |
| `main.tsx.template` | Copy verbatim |
| `vercel.json.template` | Copy verbatim |
| `seo-metadata.mjs.template` | Write real copy per-client — the only creative work |
| `sitemap.xml.template` | Generate initial entries, then prerender.mjs takes over |
| `robots.txt.template` | Update Sitemap: URL only |
| `entry-server.tsx.template` | Reference only — actual file is auto-generated |

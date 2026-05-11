# SEO Prerender Skill — Distribution Kit

This folder is a non-hidden mirror of `.claude/skills/lovable-seo-prerender/` so it survives Lovable's "Download as ZIP" (which strips dotfolders). Use it when you want to drop the SEO prerender skill into a new Lovable client repo through the GitHub web IDE or any file uploader.

## What's inside

- `SKILL.md` — the instructions Claude reads to set up the prerender system
- `templates/` — 10 source files (route-discovery, entry-server generator, prerender, verify, main.tsx, vercel.json, seo-metadata, sitemap, robots.txt, entry-server reference)

## How to install in a new client repo

The skill only works when Claude Code can discover it at `.claude/skills/lovable-seo-prerender/`. So once this folder lands in a new repo, it must be moved to that hidden path.

### Option A — Through github.dev (VS Code in the browser)

1. Open the new client repo at `https://github.dev/<owner>/<repo>` (or press `.` on the repo page).
2. Drag this entire `seo-prerender-skill/` folder into the file tree.
3. Right-click the uploaded folder → **Rename** to `.claude/skills/lovable-seo-prerender`.
   - VS Code will create the intermediate `.claude/` and `skills/` folders for you.
4. Commit and push. Done.

### Option B — Locally with the terminal

```bash
# Inside the new client repo
mkdir -p .claude/skills/lovable-seo-prerender
cp -r seo-prerender-skill/* .claude/skills/lovable-seo-prerender/
rm -rf seo-prerender-skill   # optional cleanup
git add .claude && git commit -m "Add SEO prerender skill"
```

### Option C — Through GitHub's web UI (slowest)

GitHub's web UI doesn't let you create dotfolders directly. Use Option A or B instead.

## After install — run the skill

Open Claude Code in the new repo and type:

> Use the lovable-seo-prerender skill to set up static HTML prerendering on this site.

Claude will:

1. Read `SKILL.md` to understand the workflow
2. Verify the repo is compatible (Vite + React + react-router-dom)
3. Read the homepage and a few pages to learn what the business does
4. Create all the runtime files (`prerender.mjs`, `route-discovery.mjs`, `scripts/generate-entry-server.mjs`, `verify-prerender.mjs`, `vercel.json`, `seo-metadata.mjs`, `public/sitemap.xml`)
5. Update `src/main.tsx` with hydration logic
6. Update `package.json` build script
7. Write custom SEO copy for every current route
8. Run the build and confirm every route prerenders

After setup, future pages added by Lovable are picked up **automatically** on each build — no human edits required.

## What the skill needs the client repo to look like

- Vite + React (>= 18, for `hydrateRoot`)
- `react-router-dom` (>= 6) with `<BrowserRouter>` + `<Route>` in `src/App.tsx`
- `index.html` with `<div id="root"></div>` and the standard SEO tag stubs
- Output directory is `dist/` (Vite default)

If those four things are true, the skill works without modification.

## File the client will need to maintain by hand

Just one: `seo-metadata.mjs`. New pages get a fallback title/description automatically, but custom copy is always better for SEO. The build prints a warning listing any route still using fallback copy so it's easy to spot.

Everything else — sitemap, entry-server, robots.txt — is automatic.

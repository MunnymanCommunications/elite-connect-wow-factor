import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

// ⚠️  SEO-CRITICAL — DO NOT simplify this to createRoot().render()
//
// This site uses static HTML prerendering for SEO (see prerender.mjs).
// Every page is pre-built as a real HTML file so Google and AI crawlers
// can read it without executing JavaScript.
//
// hydrateRoot: used when Vercel serves a prerendered page — React attaches
//   to the existing DOM without destroying it (zero flash, no re-render).
// createRoot:  fallback for local dev or any route without a prerendered file.
//
// Reverting to createRoot().render() everywhere would blank the page on load,
// break hydration, and undo all SEO work.
if (root.innerHTML.trim().length > 0) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

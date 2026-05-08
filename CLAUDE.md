# CLAUDE.md

Operational guide for Claude Code working in this repo. Read this before suggesting any infrastructure, framework, or backend changes.

## Project type

Static personal portfolio site — plain HTML, CSS, vanilla JS. **No build step, no framework, no package.json, no node_modules.** Three pages: `/` (about), `/projects` (experience + projects), `/contact`. Hosted on GitHub Pages at `lsmat2.github.io`.

## Hosting: GitHub Pages — hard constraints

The repo is named `lsmat2.github.io` (the username.github.io convention), so GitHub Pages serves it as the user root site. Auto-deploys on push to `main`.

**Things that CANNOT exist on this site — do not propose, scaffold, or implement them:**

- **No server-side code.** No Node servers, no Python backends, no PHP, no anything that runs on a server.
- **No serverless functions / API routes.** GitHub Pages has no equivalent of Vercel/Netlify Functions. There is nowhere for `/api/*` to run.
- **No environment variables or secrets.** The repo is public; anything committed is public. Never embed API keys, tokens, or credentials, even in JS files. If a feature needs a secret, it cannot be implemented here.
- **No request-time rewrites, redirects, or middleware.** No equivalent of `vercel.json`, `_redirects`, or `next.config.js`. Only client-side navigation and static file serving.
- **No SSR / ISR / streaming / edge logic.** Everything renders client-side from static HTML/CSS/JS.
- **No image optimization pipeline.** Images are served as-is from `/images/`.
- **No private data, no auth, no databases.**

**Acceptable patterns for "dynamic" features:**

- Fetching a JSON file from the same origin and rendering it client-side (the existing `experiences.json` / `projects.json` pattern).
- Embedding third-party services via their public client SDKs (e.g., a contact form via Formspree, analytics via Plausible/GA, comments via Giscus).
- Linking to external services (`mailto:`, social media URLs).

If the user asks for a feature that genuinely requires a backend (e.g., "process this form server-side and email me"), say so explicitly and offer the static alternatives — don't try to fake it.

## Architecture conventions

### No shared layout

Each page has its own `<head>`, `<body>`, and complete navbar markup. There is no template engine. **Every navbar change must be made in all three HTML files** (`index.html`, `projects/index.html`, `contact/index.html`).

### Navbar "current page" pattern

The active page's navbar entry is rendered as a bare `<button>` (no `<a>` wrapper). Other-page entries are `<a><button>...</button></a>`. The "LEO SMAT" header logo follows the same rule: bare `<header>` on the homepage, wrapped in `<a href="/">` on `/projects` and `/contact`. The absence of the link is the active-page indicator — don't add a CSS active class.

### Theme system

Two themes: `classic` (default) and `aurora`. Toggled via `data-theme` attribute on `<html>` (see `scripts/theme.js`). All theme differences are expressed as **CSS custom properties** in `styles/themes.css` — theme-scoped selectors should set variables, not actual layout/typography properties.

**Rule of thumb:** if a property would be the same in both themes, put it in `global.css` (or page-specific CSS) using either a hardcoded value or a variable. If it must differ, put a CSS variable in `themes.css` under each `[data-theme="..."]` block.

The navbar in particular is **structurally identical across themes** — only colors change via `--navbar-text-color`, `--accent-hover`, `--bg-navbar`, `--border-color`, `--toggle-bg`, `--toggle-icon`. Don't add theme-conditional structural rules to the navbar.

### Fonts

- Satoshi is the only typeface used site-wide, imported once in `themes.css` from Fontshare. Both themes set `--font-family` to the Satoshi stack; nothing falls back to Roboto or any other webfont.
- Satoshi is loaded at weights `400, 500, 700, 900` only. **Don't use `font-weight: 300`, `600`, or `800` with Satoshi** — those would synthesize and look off. If you need a weight outside the imported set, update the `@import` URL in `themes.css`.
- The `<button>` UA stylesheet does not inherit `font-family` by default. Form controls inside themed regions need `font-family: inherit` explicitly (see `.navbar button`).

### JSON-driven content

`projects/experiences.json` and `projects/projects.json` are fetched client-side by `projects/scripts/projects.js` and rendered into `#experienceGrid` and `#projectsGrid`. To add/edit content, edit JSON — not HTML.

Because of `fetch()` semantics, the site **must be served over HTTP** during local development (not opened via `file://`). Absolute paths (`/projects`, `/contact`) also require HTTP serving.

## Local development

```bash
python3 -m http.server 8000
```

Run from the repo root. Open `http://localhost:8000`. No watch mode / hot reload — refresh the browser after edits. The Python server reads files fresh per request, so no restart needed for content changes.

If a port-bind fails, another process is on 8000 — pick a different port. Avoid suggesting `npx serve`, Vite, or other tools as a default; they require Node and add complexity this project doesn't need.

## Deployment

Push to `main`. GitHub Pages auto-builds and serves within a minute or two. There is no preview environment or per-PR deploy — the only "preview" is local.

## Commit conventions

- **No `Co-Authored-By:` trailer.** Don't append Claude or any AI co-author line to commit messages.
- **Keep messages short.** One sentence is usually enough — a brief subject line that says what changed at a high level. Don't write multi-paragraph rationale; the diff is the source of truth and the body shouldn't restate the diff.

## Things to be careful about

- **Don't add a build step** without explicit user request. The whole site's simplicity depends on no toolchain.
- **Don't introduce a framework** (React, Vue, Astro, etc.) unless explicitly asked. The vanilla-JS architecture is intentional.
- **Don't propose Vercel/Netlify-specific features** while the site is on GitHub Pages. The user has a Vercel account and is considering switching, but until they do, those features don't exist here.
- **Don't add tracking, analytics, or third-party embeds** without asking — the site is currently dependency-free aside from a Google Fonts equivalent (fontshare).
- **Don't rename `projects/` to `experience/`** despite the navbar label saying "Experience." The URL is intentionally left as `/projects` to avoid breaking inbound links and the `fetch()` paths in `projects.js`.

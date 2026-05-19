# CLAUDE.md

Operational guide for Claude Code working in this repo. Read this before suggesting any infrastructure, framework, or backend changes.

## Project type

Static personal portfolio site — plain HTML, CSS, vanilla JS. **No build step, no framework, no package.json, no node_modules.** A single `index.html` at the repo root with anchor-scrolling sections (Hero / About / Experience / Projects / Contact) and a fixed scroll-spy navbar. Hosted on GitHub Pages at `lsmat2.github.io`.

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

### Single-page structure

The whole site is one `index.html` at the repo root. Sections (`#about`, `#experience`, `#projects`, `#contact`) are anchor targets in the same document; the navbar links use `#hash` hrefs. There are no other HTML files — don't add `projects/index.html` or `contact/index.html` back. The `projects/` directory exists only as a content store (two JSON files) and is not a route.

### Scroll-spy navbar, not active-page classes

The top navbar is sticky and highlights the section currently in view. The active-link logic lives in `scripts/global.js` (`setupScrollSpy`): the last section whose top has crossed a trigger line (35% from the viewport top) wins, and its corresponding `<a>` gets `.is-active` plus `aria-current="location"`. Hero is intentionally unrepresented in the nav, so nothing is active while the hero fills the viewport.

If you add a new section, give it an `id` and a matching `<a href="#id">` in the navbar — the scroll-spy picks it up automatically.

### Design tokens, single theme

There is one visual theme: a warm dark editorial palette. All design tokens (colors, type stacks, fluid type scale, spacing, motion easings) are declared as CSS custom properties in `:root` inside `styles/themes.css`. There is no `[data-theme]` switch, no theme toggle, and no second theme — do not reintroduce one without being asked.

**Rule of thumb:** if you're adding a color, font size, spacing value, or easing curve and there's already a token for it in `themes.css`, use the token. If you're adding a new design dimension, add the token to `themes.css` first and reference it from `global.css` / `index.css`. Hardcoded hex values and magic numbers in component CSS are a smell.

### Fonts

Three webfonts, imported in `styles/themes.css`:

- **Erode** (display serif) — Fontshare, weights 400/500/600/700 with italics. Bound to `--font-display`.
- **Supreme** (sans) — Fontshare, weights 400/500/600/700. Bound to `--font-sans`.
- **JetBrains Mono** — Google Fonts, weights 400/500/600. Bound to `--font-mono`.

Only use weights that are actually imported — synthesized weights look off. If you need a weight outside the imported set, update the `@import` URL in `themes.css` first.

### JSON-driven content

`projects/experiences.json` and `projects/projects.json` are fetched client-side by `scripts/index.js` and rendered into `#experienceList` and `#projectsList`. To add or edit work history or projects, edit the JSON — not the HTML.

Entry shapes:

```jsonc
// experiences.json: { "experiences": [ ... ] }
{
  "title": "Role - Organization",   // split on " - " into role / org by the renderer
  "time": "January 2024 - Present", // formatted to "JAN 2024 — PRESENT"
  "location": "Chicago, IL",
  "descriptions": ["Bullet one.", "Bullet two."]
}

// projects.json: { "projects": [ ... ] }
{
  "title": "Project name",
  "time": "May 2025",
  "description": "Short description."
}
```

Because of `fetch()` semantics, the site **must be served over HTTP** during local development (not opened via `file://`). The fetch URLs are absolute (`/projects/experiences.json`), which also requires HTTP serving.

### Reveal-on-scroll

Elements with the `.reveal` class fade/slide in when they enter the viewport. The observer setup lives in `scripts/global.js` (`setupReveals`) for static markup and is repeated in `scripts/index.js` (`upgradeReveals`) for nodes injected after JSON fetch. When you dynamically inject new `.reveal` nodes, call `upgradeReveals(scope)` on the parent so they're observed too — otherwise they stay invisible.

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
- **Don't split the page back into multiple HTML files.** The single-page anchor layout is the current design; don't recreate `projects/index.html` or `contact/index.html`.
- **Don't propose Vercel/Netlify-specific features** while the site is on GitHub Pages. The user has a Vercel account and is considering switching, but until they do, those features don't exist here.
- **Don't add tracking, analytics, or third-party embeds** without asking — the site is currently dependency-free aside from the Fontshare and Google Fonts CSS imports.
- **Don't rename `projects/`** — the path is hardcoded in `scripts/index.js` as `/projects/experiences.json` and `/projects/projects.json`.

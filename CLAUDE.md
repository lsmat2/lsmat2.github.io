# CLAUDE.md

Operational guide for Claude Code working in this repo. Read this before suggesting any infrastructure, framework, or backend changes.

## Project type

Static personal portfolio site — plain HTML, CSS, vanilla JS. **No build step, no framework, no package.json, no node_modules.** A single `public/index.html` with anchor-scrolling sections (Hero / About / Experience / Projects / Contact) and a fixed scroll-spy navbar. Hosted on Cloudflare (Workers static assets) at `lsmat.com`; see **Hosting & deployment**.

**Everything the site serves lives in `public/`** — only that folder is deployed. Repo docs (`CLAUDE.md`, `README.md`, `TODO.md`) and `wrangler.jsonc` stay at the root and are never published.

**Favicon:** `public/favicon.svg`, `public/favicon.ico` and `public/apple-touch-icon.png`, linked from the `<head>` of `public/index.html`. `blinkFavicon` in `scripts/global.js` makes the cursor blink: it loads `favicon.svg` and `favicon-cursor-off.svg` once as data URLs, removes the page's `rel="icon"` links, and replaces a single icon `<link>` every 530ms (Chrome ignores `href` changes on an existing link). Skipped under reduced motion; Safari doesn't show it. The `.ico` link must stay `sizes="32x32"`, not `any`, or Chrome prefers it over the SVG. Keep both SVGs identical apart from the cursor. Their design sources and saved alternates live in `brand/favicons/` (not deployed); its README says how to regenerate the files. All site paths below are relative to `public/`.

## Hosting & deployment

- **Host:** Cloudflare Workers with static assets — a Worker named `lsmat-site` with no script, serving the files in `public/`. Config lives in `wrangler.jsonc` at the repo root; `name` must match the Worker's name in the Cloudflare dashboard.
- **Domains:** `lsmat.com` is the canonical address. `lsmat.com` and `www.lsmat.com` are attached as custom domains in `wrangler.jsonc` (`routes`), so Cloudflare manages their DNS records and certificates — don't add DNS records for them by hand. The `workers.dev` URL (`lsmat-site.leosmat663.workers.dev`) stays enabled because branch preview URLs depend on it.
- **Deploys:** Cloudflare's Git integration (Workers Builds) is connected to this GitHub repo. Every push to `main` runs `npx wrangler deploy` on Cloudflare's side and goes live within a minute or so. Pushes to other branches create preview URLs (listed under the Worker's **Previews** in the dashboard). Nothing is installed or built locally.
- **Redirects:**
  - `public/_redirects` (in the repo) maps section-style URLs (`/projects`, `/contact`, `/experience`, `/experiences`, with and without trailing slash) to their sections with 301s. Rules match exact paths only. They are not applied by the local Python server — test them on a preview or the live site.
  - In the Cloudflare dashboard (zone `lsmat.com`, **not** in the repo): a Redirect Rule sends `www.lsmat.com/*` to `https://lsmat.com/*` with a 301, preserving the query string, and **Always Use HTTPS** is on.
- **Old address:** GitHub Pages publishes the `gh-pages` branch, which holds only a forwarding page: any `lsmat2.github.io/...` URL is sent to the same path on `lsmat.com`. Never merge `gh-pages` and `main` into each other.
- **Cloudflare access from Claude Code:** the Cloudflare MCP server (`https://mcp.cloudflare.com/mcp`) is configured for this project. Use it to check builds, DNS, and zone settings; ask before changing anything.

### Hard constraints

**Things that CANNOT exist on this site — do not propose, scaffold, or implement them:**

- **No server-side code.** No Node servers, no Python backends, no PHP, no anything that runs on a server.
- **No serverless functions / API routes.** The Worker has no script. Adding one is possible on Cloudflare but is an architecture change — don't do it without explicit user request.
- **No environment variables or secrets.** The repo is public; anything committed is public. Never embed API keys, tokens, or credentials, even in JS files. If a feature needs a secret, it cannot be implemented here.
- **No middleware or request-time logic.** Static path redirects belong in `public/_redirects` and response headers in `public/_headers`; anything beyond that would need a Worker script (see above).
- **No SSR / ISR / streaming / edge logic.** Everything renders client-side from static HTML/CSS/JS.
- **No image optimization pipeline.** Images are served as-is from `public/images/`.
- **No private data, no auth, no databases.**

**Acceptable patterns for "dynamic" features:**

- Fetching a JSON file from the same origin and rendering it client-side (the existing `experiences.json` / `projects.json` pattern).
- Embedding third-party services via their public client SDKs (e.g., a contact form via Formspree, analytics via Plausible/GA, comments via Giscus).
- Linking to external services (`mailto:`, social media URLs).

If the user asks for a feature that genuinely requires a backend (e.g., "process this form server-side and email me"), say so explicitly and offer the static alternatives — don't try to fake it.

## Architecture conventions

### Single-page structure

The whole site is one `public/index.html`. Sections (`#about`, `#experience`, `#projects`, `#contact`) are anchor targets in the same document; the navbar links use `#hash` hrefs. There are no other HTML files — don't add `projects/index.html` or `contact/index.html` back. The `projects/` directory exists only as a content store (two JSON files) and is not a route.

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
  "time": "May 2025",               // metadata only — not displayed on the site
  "description": "Short description."
}
```

- **`"hidden": true`** on any experience or project keeps it in the JSON but skips rendering it (it's also excluded from the project count). Use it to archive entries instead of deleting them.
- **Array order is display order**, newest first. The project count is generated. Sections and projects are intentionally unnumbered — don't add `§01`/`[01]`-style numbering back.
- Projects still carry a `time` field for record-keeping; fill it in for new entries even though it isn't shown.
- Content is condensed from Leo's resumes in `/Users/leo/Code/leo-resumes` (`resume_v3.md` is the newest), but website wording and titles intentionally differ — don't sync blindly.

Because of `fetch()` semantics, the site **must be served over HTTP** during local development (not opened via `file://`). The fetch URLs are absolute (`/projects/experiences.json`), which also requires HTTP serving.

### Reveal-on-scroll

Elements with the `.reveal` class fade/slide in when they enter the viewport. The observer setup lives in `scripts/global.js` (`setupReveals`) for static markup and is repeated in `scripts/index.js` (`upgradeReveals`) for nodes injected after JSON fetch. When you dynamically inject new `.reveal` nodes, call `upgradeReveals(scope)` on the parent so they're observed too — otherwise they stay invisible.

## Local development

```bash
python3 -m http.server 8000 -d public
```

Run from the repo root (`-d public` serves the site folder). Open `http://localhost:8000`. No watch mode / hot reload — refresh the browser after edits. The Python server reads files fresh per request, so no restart needed for content changes.

If a port-bind fails, another process is on 8000 — pick a different port. Avoid suggesting `npx serve`, Vite, or other tools as a default; they require Node and add complexity this project doesn't need.

## Commit conventions

- **No `Co-Authored-By:` trailer.** Don't append Claude or any AI co-author line to commit messages.
- **Keep messages short.** One sentence is usually enough — a brief subject line that says what changed at a high level. Don't write multi-paragraph rationale; the diff is the source of truth and the body shouldn't restate the diff.

## Things to be careful about

- **Queued work lives in `TODO.md`** — check it at the start of a session.
- **Don't add a build step** without explicit user request. The whole site's simplicity depends on no toolchain.
- **Don't introduce a framework** (React, Vue, Astro, etc.) unless explicitly asked. The vanilla-JS architecture is intentional.
- **Don't split the page back into multiple HTML files.** The single-page anchor layout is the current design; don't recreate `projects/index.html` or `contact/index.html`.
- **Don't propose Vercel/Netlify-specific features.** The site is on Cloudflare; Vercel was considered and ruled out.
- **Don't add tracking, analytics, or third-party embeds** without asking — the site is currently dependency-free aside from the Fontshare and Google Fonts CSS imports.
- **Don't rename `public/projects/`** — the path is hardcoded in `scripts/index.js` as `/projects/experiences.json` and `/projects/projects.json`, and `_redirects` only redirects the exact paths `/projects` and `/projects/`.
- **New site files go in `public/`.** Anything outside it is not deployed.

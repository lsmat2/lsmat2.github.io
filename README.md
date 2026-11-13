# Leo Smat — Personal Portfolio

A single-page personal site showcasing background, experience, and projects. Plain HTML, CSS, and vanilla JavaScript — no framework, no build step, no dependencies installed locally.

## Live site

[lsmat.com](https://lsmat.com) — deployed by Cloudflare on every push to `main`.

## Stack

- **HTML5 / CSS3 / vanilla JavaScript.** Three CSS files and two JS files, no bundler.
- **Typography:** Erode (display serif) and Supreme (sans) via Fontshare, JetBrains Mono via Google Fonts.
- **Content:** Experience and project entries live in JSON files and are fetched and rendered client-side.
- **Hosting:** Cloudflare Workers static assets, configured in `wrangler.jsonc`. No server-side code, no serverless functions, no environment variables.

## Project structure

```
lsmat2.github.io/
├── public/                     # Everything the site serves (the only folder deployed)
│   ├── index.html              # Single-page site: hero + About / Experience / Projects / Contact
│   ├── _redirects              # Cloudflare redirects for old URLs
│   ├── favicon.svg, favicon.ico, apple-touch-icon.png  # Site icons
│   ├── styles/
│   │   ├── themes.css          # CSS custom properties — palette, type scale, fonts, spacing, motion
│   │   ├── global.css          # Shared layout: navbar, shell container, footer, reveal animation
│   │   └── index.css           # Page-specific styles for each section
│   ├── scripts/
│   │   ├── global.js           # Footer year, IntersectionObserver reveals, scroll-spy navbar
│   │   └── index.js            # Fetches JSON content and renders the Experience + Projects lists
│   ├── projects/
│   │   ├── experiences.json    # Work history entries
│   │   └── projects.json       # Project entries
│   └── images/                 # Profile photo and social icons
├── brand/favicons/             # Favicon design sources and alternates (not deployed)
├── wrangler.jsonc              # Cloudflare deploy config
├── CLAUDE.md                   # Operational notes for Claude Code working in this repo
├── TODO.md                     # Queued work
└── README.md
```

## Page layout

A single `index.html` with anchor sections:

- **Hero** — name, role, portrait, social links, tagline.
- **§01 About** — short bio.
- **§02 Experience** — rendered from `projects/experiences.json`.
- **§03 Projects** — rendered from `projects/projects.json`.
- **§04 Contact** — email and social links.

The fixed top navbar uses in-page anchor links (`#about`, `#experience`, etc.). A scroll-spy in `scripts/global.js` highlights the active section as the user scrolls.

## Editing content

To add or change experience and project entries, edit the JSON files in `public/projects/` — no HTML changes needed.

**`public/projects/experiences.json`** entries follow the shape:

```json
{
  "title": "Role - Organization",
  "time": "January 2024 - Present",
  "location": "Chicago, IL",
  "descriptions": ["Bullet one.", "Bullet two."]
}
```

The renderer in `scripts/index.js` splits `title` on `" - "` into role and organization, and formats `time` into uppercase short-month form (e.g., `JAN 2024 — PRESENT`).

**`public/projects/projects.json`** entries follow the shape:

```json
{
  "title": "Project name",
  "time": "May 2025",
  "description": "Short description."
}
```

Project `time` is kept as metadata but not displayed. Add `"hidden": true` to any experience or project to keep it in the file without showing it on the site.

## Styling

All theme tokens (colors, typography, spacing, motion) live as CSS custom properties in `public/styles/themes.css`. Layout and component rules in `global.css` and `index.css` reference those variables rather than hardcoding values, so a palette or type-scale change in `themes.css` propagates everywhere.

## Local development

The site uses `fetch()` for content and absolute paths for assets, so it must be served over HTTP rather than opened from `file://`.

```bash
python3 -m http.server 8000 -d public
```

Run from the repo root, then open `http://localhost:8000`. There is no watch mode — refresh after edits.

## Deployment

Push to `main`. Cloudflare's Git integration runs `npx wrangler deploy`, which publishes the contents of `public/` within a minute or so. Pushes to other branches get their own preview URLs.

Old multi-page URLs (`/projects`, `/contact`) are redirected to their sections by `public/_redirects`. That file only takes effect on Cloudflare, not on the local Python server.

---

Built by Leo Smat — Computer Science & Economics graduate, software developer, and entrepreneur.

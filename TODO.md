# TODO

In order of priority.

## 1. Move the site to lsmat.com on Cloudflare (in progress)
- Hosting: Cloudflare Workers static assets, deployed from `main` via Workers Builds. `lsmat.com` is the main address; `www` redirects to it.
- Done: GitHub Pages now publishes the `gh-pages` branch; site moved into `public/`; `wrangler.jsonc` and `public/_redirects` added.
- Next: connect the repo in the Cloudflare dashboard and check the workers.dev URL; add `lsmat.com` as a custom domain plus the www → root redirect rule; replace `gh-pages` with a forwarding page to lsmat.com.
- Afterwards: Leo updates the site link on resumes and LinkedIn.

## 2. Rewrite the About section
- The hero intro and About copy in `index.html` are hardcoded, not JSON-driven.
- They still describe leading the local venue discovery app as current work, and don't mention Prime Care Medical Group or Benmore Technologies.

## 3. Explore a revamp/redesign of the whole site
- After the About rewrite. More direction to come from Leo when we get there.

## 4. Professional email signature
- For the personal email account, including the new website domain.
- Blocked until the site is live on the new domain.

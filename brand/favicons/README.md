# Favicon designs

Not deployed; the live favicon files are in `public/`.

| File | Design | Status |
|---|---|---|
| `d-terminal-ls.svg` | "ls" (the Unix list command) in a monospace style with an orange cursor block | **In use.** Letters are drawn as shapes, so it needs no font. Identical to `public/favicon.svg`; `public/favicon-cursor-off.svg` is the same file without the cursor rect (the blink frame). |
| `e-bracketed-index.svg` | "[LS]" in JetBrains Mono, echoing the `[01]` project numbering | Alternate. Weaker at 16px. |
| `f-ink-on-paper.svg` | Dark serif "LS" on cream with an orange underline | Alternate: the pick if the site goes for a more formal, professional look. |

E and F still use live text. A favicon can't load webfonts, so before switching to either, convert its letters to shapes the way D's are drawn.

To regenerate the live files from an SVG (needs `rsvg-convert`):
- `public/favicon.svg`: the SVG itself.
- `public/favicon-cursor-off.svg`: the same SVG without the `id="cursor"` rect.
- `public/favicon.ico`: 16, 32 and 48px PNG renders packed into one ICO.
- `public/apple-touch-icon.png`: a 180px render with square corners (remove the background `rx`); iOS rounds the corners itself.

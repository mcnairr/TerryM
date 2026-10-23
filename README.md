# Remembering Terry McNair

A family memorial website for John (Terry) McNair, 1945–2022, hosted on GitHub Pages at **https://www.terrymcnair.com/**.

## Pages

- **Home:** the full original obituary, with the portrait extracted from the supplied Word document and a memorial donation link to the [Henry County (IA) Heritage Trust](https://www.henrycountyheritagetrust.org/about-5).
- **Celebration of Life:** all three 2022 gatherings in Mt. Pleasant, Imperial, and Lincoln, with the original dates, times, venues, organizers, and photographs. Clearly marked as past events.
- **Metal Sculptures:** all 44 photographs from the original sculpture carousel, with a keyboard accessible photo viewer. Images also open directly when JavaScript is unavailable.

The warm ivory background, charcoal masthead, rust accent, serif headings, and simple navigation are inspired by the Terry Pickett memorial site. The site uses system fonts and local assets, with no Google Sites, external font, or framework dependencies.

Google Analytics uses measurement ID `G-TC96XVYT4N`. The shared Google tag in `scripts/build.mjs` is included once immediately after `<head>` on every generated HTML page, including redirects and the 404 page.

## Content and maintenance

The supplied original source files in `assets/` are retained locally and excluded from Git. Public images are in `images/`. The obituary text is preserved in `scripts/obituary-source.json`; the obvious original typo “Aat Ceco” is rendered as “His work at Ceco.” The obituary's original reference to future services is retained as historical text, with a dated explanatory note and a link to the event archive.

Edit `scripts/build.mjs` for page structure or event details, `scripts/obituary-source.json` for obituary text, `css/style.css` for appearance, and `js/gallery.js` for the viewer. Then regenerate the HTML:

```sh
node scripts/build.mjs
node scripts/check.mjs
```

Commit the generated HTML along with source edits. GitHub Pages publishes the repository root from `main`; `.nojekyll` disables Jekyll. There is no build service or package installation required. `CNAME` sets the custom domain. Old `/home`, `/obituary`, and `.html` links redirect to the corresponding new pages.

## Validation

`node scripts/check.mjs` verifies public file references, the migrated obituary paragraphs, all 44 gallery images, all three events, and legacy redirect files. Browser checks additionally cover desktop (1280px), mobile (390px and 320px), image loading, internal navigation, the viewer's arrow keys and Escape key, modal focus containment and restoration, and horizontal overflow. Browser tooling and screenshots stay in ignored `.preview/`.

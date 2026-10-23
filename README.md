# Remembering Terry McNair

A family memorial website for John (Terry) McNair, 1945–2022, hosted on GitHub Pages at **https://www.terrymcnair.com/**.

## Pages

- **Home:** the full original obituary, with the portrait extracted from the supplied Word document.
- **Celebration of Life:** all three 2022 gatherings in Mt. Pleasant, Imperial, and Lincoln, with the original dates, times, venues, organizers, and photographs. Clearly marked as past events.
- **Metal Sculptures:** all 44 photographs from the original sculpture carousel, with a keyboard accessible photo viewer. Images also open directly when JavaScript is unavailable.

The warm ivory background, charcoal masthead, rust accent, serif headings, and simple navigation are inspired by the Terry Pickett memorial site. The site uses system fonts and local assets, with no Google Sites, external font, or framework dependencies.

## Content and maintenance

The supplied original source files in `assets/` are retained locally and excluded from Git. Public images are in `images/`. The obituary text is preserved in `scripts/obituary-source.json`; the obvious original typo “Aat Ceco” is rendered as “His work at Ceco.” The obituary's original reference to future services is retained as historical text, with a dated explanatory note and a link to the event archive.

Edit `scripts/build.mjs` for page structure or event details, `scripts/obituary-source.json` for obituary text, `css/style.css` for appearance, and `js/gallery.js` for the viewer. Then regenerate the HTML:

```sh
node scripts/build.mjs
node scripts/check.mjs
```

Commit the generated HTML along with source edits. GitHub Pages publishes the repository root from `main`; `.nojekyll` disables Jekyll. There is no build service or package installation required. `CNAME` sets the custom domain. Old `/home`, `/obituary`, and `.html` links redirect to the corresponding new pages.

## DNS cutover

GitHub Pages should be configured with **www.terrymcnair.com** as the custom domain before changing DNS. At the domain's DNS provider, make these changes:

| Type | Host/name | Value |
| --- | --- | --- |
| CNAME | `www` | `mcnairr.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Replace the existing `www` CNAME pointing to `ghs.googlehosted.com`, and replace the existing apex A record `198.185.159.145` with the four A records above. Use a TTL of 300 seconds, or the provider's default. Leave unrelated records, including mail and verification records, in place. No nameserver change is needed.

IPv6 is optional. If using it, add all four `@` AAAA records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`. Remove any conflicting old web AAAA records.

The CNAME target is the account hostname, without `/TerryM` or a protocol. With these apex and www records, GitHub redirects `terrymcnair.com` to `www.terrymcnair.com`.

After DNS propagates, check [Pages settings](https://github.com/mcnairr/TerryM/settings/pages), wait for the custom-domain certificate, and enable **Enforce HTTPS**. Certificate issuance may take up to 24 hours. Check both hostname variants over HTTPS before retiring the Google Site.

Reference: [GitHub's custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Validation

`node scripts/check.mjs` verifies public file references, the migrated obituary paragraphs, all 44 gallery images, all three events, and legacy redirect files. Browser checks additionally cover desktop (1280px), mobile (390px and 320px), image loading, internal navigation, the viewer's arrow keys and Escape key, modal focus containment and restoration, and horizontal overflow. Browser tooling and screenshots stay in ignored `.preview/`.

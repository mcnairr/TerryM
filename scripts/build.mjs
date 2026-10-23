import fs from 'node:fs';
import path from 'node:path';

// Build plain HTML: GitHub Pages serves these files without dependencies.
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const original = JSON.parse(fs.readFileSync('scripts/obituary-source.json', 'utf8').replace(/^\uFEFF/, ''));
const obituary = original.slice(1).map(p => p.trim().replace(/^Aat Ceco/, 'His work at Ceco'));
const nav = [['Home', ''], ['Celebration of Life', 'celebration-of-life/'], ['Metal Sculptures', 'metal-sculptures/']];
function page(title, description, current, body) {
  const prefix = current ? '../' : './';
  const url = `https://www.terrymcnair.com/${current}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title)} | Terry McNair · 1945–2022</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${escape(title)} | Terry McNair">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="https://www.terrymcnair.com/images/terry-mcnair.jpg">
  <meta name="theme-color" content="#2b2724">
  <link rel="icon" href="${prefix}images/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}css/style.css">
  <script src="${prefix}js/gallery.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="masthead"><a class="site-title" href="${prefix}">Terry McNair</a><p class="life-dates">1945 <span aria-hidden="true">—</span> 2022</p></div>
    <nav aria-label="Main navigation"><ul>${nav.map(([label, href]) => `<li><a href="${prefix}${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}</ul></nav>
  </header>
  <main id="main" class="${current === 'metal-sculptures/' ? 'wide' : 'reading'}" tabindex="-1">${body}</main>
  <footer class="site-footer"><p>Terry McNair <span aria-hidden="true">·</span> 1945–2022</p><p>Remembered with love by family and friends.</p></footer>
</body>
</html>\n`;
}
fs.writeFileSync('index.html', page('Remembering Terry McNair', 'Remembering John (Terry) McNair, 1945–2022. His life, family, community, travels, and metal sculptures.', '', `
    <article>
      <div class="page-heading"><p class="eyebrow">A life remembered</p><h1>Remembering Terry McNair</h1><p class="subtitle">Father, grandfather, friend, and maker.</p></div>
      <div class="obituary">
        <figure class="portrait"><img src="./images/terry-mcnair.jpg" width="2048" height="2048" alt="Terry McNair smiling at a restaurant"><figcaption>John “Terry” McNair · 1945–2022<br><a href="./images/memory-01.jpg">Memorial photograph</a></figcaption></figure>
        ${obituary.map(p => `<p>${escape(p)}</p>`).join('\n        ')}
      </div>
      <aside class="memorial-note"><p class="eyebrow">In his memory</p><p>In lieu of flowers, the family asks that you donate to the <strong>Henry County (IA) Heritage Trust</strong>.</p><p class="small">This obituary was written in 2022. Details of the three memorial gatherings are preserved on the <a href="./celebration-of-life/">Celebration of Life page</a>.</p></aside>
    </article>
    <div class="explore"><a href="./celebration-of-life/"><span class="eyebrow">Family &amp; friends</span><span>Celebration of Life <span aria-hidden="true">→</span></span></a><a href="./metal-sculptures/"><span class="eyebrow">Made by Terry</span><span>Metal Sculptures <span aria-hidden="true">→</span></span></a></div>`));

fs.writeFileSync('celebration-of-life/index.html', page('Celebration of Life', 'The three 2022 gatherings remembering Terry McNair in Mt. Pleasant, Iowa; Imperial, Nebraska; and Lincoln, Nebraska.', 'celebration-of-life/', `
    <div class="page-heading"><p class="eyebrow">Gathering in remembrance</p><h1>Celebration of Life</h1><p class="subtitle">Three gatherings. A lifetime of memories.</p></div>
    <p class="archive-note">These gatherings took place in 2022. The original event information is preserved here for family and friends.</p>
    <blockquote><p>“Please join me in remembering my father, at one or more of the events below.”</p><cite>— Ryan</cite></blockquote>
    <nav class="event-nav" aria-label="Jump to an event"><a href="#mt-pleasant">Mt. Pleasant, IA</a><a href="#imperial">Imperial, NE</a><a href="#lincoln">Lincoln, NE</a></nav>
    <div class="events">
      <section class="event" id="mt-pleasant" aria-labelledby="event-one"><div class="event-date"><span>May</span><strong>07</strong><span>2022</span></div><div class="event-body"><p class="eyebrow">Mt. Pleasant, Iowa</p><h2 id="event-one">Celebration of Life</h2><p class="event-time"><time datetime="2022-05-07">Saturday, May 7, 2022</time> · 1–4 p.m.</p><p>Open house, come and go anytime.</p><address><strong>Van Allen House Heritage Center</strong><br>403 West Madison Street<br>Mt. Pleasant, Iowa 52641</address><p><a href="https://www.google.com/maps/search/?api=1&amp;query=Van+Allen+House+403+West+Madison+Street+Mount+Pleasant+Iowa">View location on map <span aria-hidden="true">↗</span></a></p><p class="organizer">Organized by Kate McNair.</p><figure class="event-photo"><img src="../images/memory-02.jpg" width="354" height="354" loading="lazy" alt="The yellow Van Allen House in Mt. Pleasant"><figcaption>Van Allen House Heritage Center</figcaption></figure></div></section>
      <section class="event" id="imperial" aria-labelledby="event-two"><div class="event-date"><span>July</span><strong>04</strong><span>2022</span></div><div class="event-body"><p class="eyebrow">Imperial, Nebraska</p><h2 id="event-two">Scattering of Ashes</h2><p class="event-time"><time datetime="2022-07-04">Monday, July 4, 2022</time></p><dl class="schedule"><dt>10 a.m.</dt><dd>Scattering of ashes at McNair Farms.<br><span class="small">Optional and brief.</span></dd><dt>11:30 a.m.</dt><dd>Lunch at Eagles Club.</dd></dl><p class="organizer">Organized by Kelli Major.</p><figure class="event-photo"><img src="../images/memory-03.jpg" width="696" height="696" loading="lazy" alt="Aerial view of the McNair family farm in Imperial, Nebraska"><figcaption>McNair Farms · Imperial, Nebraska</figcaption></figure></div></section>
      <section class="event" id="lincoln" aria-labelledby="event-three"><div class="event-date"><span>July</span><strong>08</strong><span>2022</span></div><div class="event-body"><p class="eyebrow">Lincoln, Nebraska</p><h2 id="event-three">Cemetery Burial</h2><p class="event-time"><time datetime="2022-07-08">Friday, July 8, 2022</time> · 11 a.m.</p><p>Graveside service.</p><address><strong>Wyuka Cemetery</strong><br>3600 “O” Street<br>Lincoln, Nebraska 68510</address><p><a href="https://www.google.com/maps/search/?api=1&amp;query=Wyuka+Cemetery+3600+O+Street+Lincoln+Nebraska">View location on map <span aria-hidden="true">↗</span></a></p><p class="organizer">Organized by Ryan McNair.</p><figure class="event-photo"><img src="../images/memory-04.jpg" width="804" height="804" loading="lazy" alt="The Wyuka Cemetery entrance sign, Place of Rest"><figcaption>Wyuka Cemetery · Lincoln, Nebraska</figcaption></figure></div></section>
    </div>
    <p class="back-link"><a href="../">← Remembering Terry McNair</a></p>`));

const images = fs.readdirSync('images/sculptures').filter(f => /\.jpg$/.test(f)).sort();
fs.writeFileSync('metal-sculptures/index.html', page('Metal Sculptures', 'A gallery of Terry McNair’s metal sculptures, made for family and friends from scrap metal at the Ceco plant.', 'metal-sculptures/', `
    <div class="page-heading"><p class="eyebrow">Made by Terry</p><h1>Metal Sculptures</h1><p class="subtitle">A little scrap metal. A lot of imagination.</p></div>
    <p class="gallery-intro">Terry used scrap metal and tools at the Ceco plant to create cherished sculptures for family and friends. This collection preserves the photographs from his original website.</p>
    <p class="gallery-hint">${images.length} photographs · Select a photograph to take a closer look.</p>
    <div class="sculpture-gallery gallery">${images.map((f, i) => `<a class="gallery-item" href="../images/sculptures/${f}"><img src="../images/sculptures/${f}" alt="Metal sculpture by Terry McNair, photograph ${i + 1}" loading="lazy"><span class="photo-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></a>`).join('\n      ')}</div>
    <p class="back-link"><a href="../">← Remembering Terry McNair</a></p>`));

// Preserve incoming links from Google Sites and the saved .html version.
for (const [file, target] of [['home.html', './'], ['obituary.html', './'], ['metal-sculptures.html', './metal-sculptures/'], ['celebration-of-life.html', './celebration-of-life/'], ['obituary/index.html', '../'], ['home/index.html', '../']]) {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Terry McNair</title><link rel="canonical" href="https://www.terrymcnair.com/${target.includes('metal-sculptures') ? 'metal-sculptures/' : target.includes('celebration') ? 'celebration-of-life/' : ''}"><meta http-equiv="refresh" content="0;url=${target}"></head><body><p><a href="${target}">Continue to Terry McNair’s memorial website</a>.</p></body></html>\n`);
}
fs.writeFileSync('404.html', page('Page not found', 'Find your way back to Terry McNair’s memorial website.', '', '<div class="page-heading"><p class="eyebrow">Page not found</p><h1>Let’s find your way back.</h1><p><a href="/">Remembering Terry McNair</a> · <a href="/celebration-of-life/">Celebration of Life</a> · <a href="/metal-sculptures/">Metal Sculptures</a></p></div>').replaceAll('href="./', 'href="/').replaceAll('src="./', 'src="/'));
fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${nav.map(([,href])=>`<url><loc>https://www.terrymcnair.com/${href}</loc></url>`).join('')}</urlset>\n`);
console.log(`Built obituary, 3 memorial events, ${images.length} gallery photos, and legacy redirects.`);

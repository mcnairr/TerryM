import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const home=fs.readFileSync('index.html','utf8');
const original=JSON.parse(fs.readFileSync('scripts/obituary-source.json','utf8').replace(/^\uFEFF/,''));
for(const paragraph of original.slice(1)) assert.ok(home.includes(`<p>${escape(paragraph.trim().replace(/^Aat Ceco/,'His work at Ceco'))}</p>`),'Obituary paragraph missing');
const gallery=fs.readFileSync('metal-sculptures/index.html','utf8');
assert.equal((gallery.match(/class="gallery-item"/g)||[]).length,44);
assert.equal(fs.readdirSync('images/sculptures').filter(f=>f.endsWith('.jpg')).length,44);
for(const file of fs.readdirSync('images/sculptures')){
  const bytes=fs.readFileSync(`images/sculptures/${file}`);
  assert.equal(bytes[0],0xff,`Invalid JPEG: ${file}`);assert.equal(bytes[1],0xd8,`Invalid JPEG: ${file}`);
}
const events=fs.readFileSync('celebration-of-life/index.html','utf8');
for(const item of ['2022-05-07','2022-07-04','2022-07-08','1–4 p.m.','10 a.m.','11:30 a.m.','11 a.m.','Kate McNair','Kelli Major','Ryan McNair','403 West Madison Street','3600 “O” Street','McNair Farms','Eagles Club']) assert.ok(events.includes(item),`Missing event detail: ${item}`);
const pages=['index.html','celebration-of-life/index.html','metal-sculptures/index.html','home.html','obituary.html','metal-sculptures.html','celebration-of-life.html','home/index.html','obituary/index.html','404.html'];
for(const file of pages){
  const html=fs.readFileSync(file,'utf8');
  for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(/^(?:https?:|#)/.test(ref))continue;
    let target=ref.startsWith('/')?ref.slice(1):path.join(path.dirname(file),ref);
    if(ref.endsWith('/'))target=path.join(target,'index.html');
    assert.ok(fs.existsSync(target),`Broken reference: ${file} → ${ref}`);
  }
}
assert.equal(fs.readFileSync('CNAME','utf8').trim(),'www.terrymcnair.com');
assert.ok(fs.existsSync('.nojekyll'));
console.log('PASS: complete obituary, 44 JPEGs, 3 events, internal file references, legacy redirects, and Pages configuration.');

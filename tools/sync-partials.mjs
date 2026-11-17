// Writes the shared nav and footer (partials/*.html) into every site/*.html page.
// Usage (from the repo root):  node tools/sync-partials.mjs
// Not a build step: it edits the HTML in place, and you commit the result.
//
// Each page marks where a partial goes, with optional settings on the opening marker:
//   <!-- partial:nav theme=light active=partners -->
//   <!-- /partial:nav -->
//   <!-- partial:footer -->
//   <!-- /partial:footer -->
//
// nav settings
//   theme=dark   the page starts on the dark sky (nav turns white after the sky, via main.js)
//   theme=light  the page starts white (nav is white from the start)
//   active=ID    marks the nav item with data-nav="ID" as the current page (aria-current="page")
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
const strip = (s) => s.replace(/^<!--[\s\S]*?-->\n/, '').trim(); // drop the "edit here" note
const sources = {
  nav: strip(readFileSync(join(root, 'partials/nav.html'), 'utf8')),
  footer: strip(readFileSync(join(root, 'partials/footer.html'), 'utf8')),
};

const render = (name, opts, file) => {
  let html = sources[name];
  if (!html) throw new Error(`${file}: unknown partial "${name}"`);
  if (name === 'nav') {
    if (opts.theme === 'light') html = html.replace('<header class="nav"', '<header class="nav is-light"');
    else if (opts.theme && opts.theme !== 'dark') throw new Error(`${file}: theme must be dark or light`);
    if (opts.active) {
      const hook = `data-nav="${opts.active}"`;
      if (!html.includes(hook)) throw new Error(`${file}: no nav item with ${hook}`);
      html = html.replace(hook, `${hook} aria-current="page"`);
    }
  }
  return html;
};

const block = /<!-- partial:([a-z]+)((?:\s+[a-z]+=[^\s>]+)*)\s*-->[\s\S]*?<!-- \/partial:\1 -->/g;
let total = 0;

for (const file of readdirSync(site).filter((f) => f.endsWith('.html'))) {
  const path = join(site, file);
  const before = readFileSync(path, 'utf8');
  let count = 0;
  const after = before.replace(block, (_m, name, attrs) => {
    const opts = Object.fromEntries([...attrs.matchAll(/([a-z]+)=([^\s>]+)/g)].map((m) => [m[1], m[2]]));
    count++;
    const open = `<!-- partial:${name}${attrs} -->`;
    return `${open}\n${render(name, opts, file)}\n<!-- /partial:${name} -->`;
  });
  if (after !== before) { writeFileSync(path, after); total++; }
  console.log(`site/${file}: ${count} partial(s)${after !== before ? ', updated' : ''}`);
}
console.log(total ? `Done. ${total} page(s) updated.` : 'Every page already matches partials/.');

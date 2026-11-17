// Writes the values from site/assets/config.js into every site/*.html page.
// Usage (from the repo root):  node tools/sync-config.mjs
// Not a build step: it edits the HTML in place, and you commit the result.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const site = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(site, 'assets/config.js'), 'utf8'), sandbox);
const cfg = sandbox.window.MB_CONFIG;

const tag = /(<([a-z][a-z0-9]*)\b[^>]*\sdata-cfg="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g;
let total = 0;

for (const file of readdirSync(site).filter((f) => f.endsWith('.html'))) {
  const path = join(site, file);
  const before = readFileSync(path, 'utf8');
  let changed = 0;
  const after = before.replace(tag, (m, open, _name, key, text, close) => {
    const value = cfg.text(key);
    if (value !== text) changed++;
    return open + value + close;
  });
  if (after !== before) writeFileSync(path, after);
  console.log(`site/${file}: ${changed} value(s) updated`);
  total += changed;
}
console.log(total ? `Done. ${total} change(s).` : 'Everything already matches site/assets/config.js.');

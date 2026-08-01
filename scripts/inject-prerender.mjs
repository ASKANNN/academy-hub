// Build-time step, runs on Vercel too — no browser involved. Takes the
// committed snapshot (see scripts/generate-snapshot.mjs) and inlines it into
// dist/index.html's #root, so crawlers get real content without executing JS.
// The freshly-hashed <script>/<link> tags from this build's own dist/index.html
// are left untouched, so hydration still points at the right assets.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const [distHtml, snapshot] = await Promise.all([
  readFile(resolve(root, 'dist/index.html'), 'utf8'),
  readFile(resolve(root, 'prerendered/root.html'), 'utf8'),
]);

const injected = distHtml.replace(
  '<div id="root"></div>',
  `<div id="root">${snapshot}</div>`,
);

if (injected === distHtml) {
  throw new Error('inject-prerender: did not find <div id="root"></div> in dist/index.html');
}

await writeFile(resolve(root, 'dist/index.html'), injected);

console.log('Injected prerendered content into dist/index.html');

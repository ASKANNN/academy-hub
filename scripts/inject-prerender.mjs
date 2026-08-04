// Build-time step, runs on Vercel too — no browser involved. Takes the
// committed snapshots (see scripts/generate-snapshot.mjs, one page.json per
// route under prerendered/) and writes a full dist/<route>/index.html per
// route: #root filled with the snapshot's markup, plus title/description/
// canonical/OG tags overwritten to match that route. Vercel's static file
// serving resolves directory index.html files before falling back to the
// vercel.json catch-all rewrite, so each route gets its own prerendered HTML
// without any routing config changes.
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, relative } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const prerenderedDir = resolve(root, 'prerendered');

async function findPageManifests(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const manifests = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      manifests.push(...(await findPageManifests(full)));
    } else if (entry.name === 'page.json') {
      manifests.push(full);
    }
  }
  return manifests;
}

function setContentAttr(html, matchAttr, value) {
  const regex = new RegExp(`(${matchAttr}[^>]*content=")[^"]*(")`);
  return html.replace(regex, `$1${value}$2`);
}

const baseHtml = await readFile(resolve(root, 'dist/index.html'), 'utf8');
const manifests = await findPageManifests(prerenderedDir);

for (const manifestPath of manifests) {
  const relDir = relative(prerenderedDir, dirname(manifestPath));
  const page = JSON.parse(await readFile(manifestPath, 'utf8'));

  let html = baseHtml.replace('<div id="root"></div>', `<div id="root">${page.rootHtml}</div>`);
  if (html === baseHtml) {
    throw new Error(`inject-prerender: did not find <div id="root"></div> for /${relDir}`);
  }

  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
  html = setContentAttr(html, 'name="description"', page.description);
  html = setContentAttr(html, 'property="og:title"', page.title);
  html = setContentAttr(html, 'property="og:description"', page.description);
  html = setContentAttr(html, 'property="og:url"', page.canonical);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${page.canonical}$2`);

  if (page.jsonLd) {
    html = html.replace(
      '</head>',
      `<script type="application/ld+json" data-page-jsonld>${page.jsonLd}</script></head>`
    );
  }

  const outDir = relDir ? resolve(root, 'dist', relDir) : resolve(root, 'dist');
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'index.html'), html);
}

console.log(`Injected prerendered content into ${manifests.length} route(s) under dist/`);

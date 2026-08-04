import { preview } from 'vite';
import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { getAllRoutes } from './lib/routes.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const server = await preview({ root, preview: { port: 4173, open: false } });
const baseUrl = server.resolvedUrls.local[0];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript(() => {
  sessionStorage.setItem('academy-intro', '1');
  localStorage.setItem('academy-hub-lang', 'ru');
});

const routes = await getAllRoutes();

for (const route of routes) {
  await page.goto(new URL(route, baseUrl).href, { waitUntil: 'networkidle' });
  await page.waitForSelector(route === '/' ? '.hero__title' : '.algorithms-hero__title');
  // usePageMeta sets title/description/canonical in a useEffect that fires
  // after the selector above is already in the DOM — wait for the canonical
  // link to actually point at this route before snapshotting, or the capture
  // below can race the effect and grab the previous route's meta.
  await page.waitForFunction((path) => {
    const canonical = document.querySelector('link[rel="canonical"]');
    return !!canonical && new URL(canonical.href).pathname === path;
  }, route);

  const data = await page.evaluate(() => ({
    rootHtml: document.getElementById('root').innerHTML,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
    jsonLd: document.querySelector('script[data-page-jsonld]')?.textContent ?? null,
  }));

  const outDir = resolve(root, 'prerendered', route === '/' ? '.' : route.slice(1));
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'page.json'), JSON.stringify(data, null, 2));
  console.log(`Snapshot written for ${route}`);
}

await browser.close();
await new Promise((res) => server.httpServer.close(res));

console.log(`Wrote ${routes.length} snapshots to prerendered/ — commit these files.`);

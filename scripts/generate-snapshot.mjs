// Dev-only. Vercel's build machine can't run headless Chromium (missing
// system libs like libnspr4.so, no apt/yum access to install them), so this
// must be run locally after `npm run build` whenever page content changes,
// and the resulting file committed. See scripts/inject-prerender.mjs for the
// build-time step that actually uses it (no browser involved there).
import { preview } from 'vite';
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const server = await preview({ root, preview: { port: 4173, open: false } });
const url = server.resolvedUrls.local[0];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.addInitScript(() => {
  sessionStorage.setItem('academy-intro', '1');
  localStorage.setItem('academy-hub-lang', 'ru');
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForSelector('.hero__title');

const rootHtml = await page.evaluate(() => document.getElementById('root').innerHTML);

await browser.close();
await new Promise((res) => server.httpServer.close(res));

await writeFile(resolve(root, 'prerendered/root.html'), rootHtml);

console.log('Wrote prerendered/root.html — commit this file.');

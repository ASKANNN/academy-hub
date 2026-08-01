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

const html = await page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`);

await browser.close();
await new Promise((res) => server.httpServer.close(res));

await writeFile(resolve(root, 'dist/index.html'), html);

console.log('Prerendered dist/index.html');

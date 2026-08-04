import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllRoutes } from './lib/routes.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://askanacademy.com';
const TODAY = new Date().toISOString().slice(0, 10);

function metaFor(path) {
  if (path === '/') return { priority: '1.0', changefreq: 'weekly' };
  if (path === '/algorithms') return { priority: '0.9', changefreq: 'weekly' };
  if (path === '/algorithms/sorting') return { priority: '0.8', changefreq: 'weekly' };
  return { priority: '0.7', changefreq: 'monthly' };
}

const routes = await getAllRoutes();

const entries = routes
  .map((path) => {
    const { priority, changefreq } = metaFor(path);
    return `  <url>\n    <loc>${BASE}${path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

await writeFile(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml written — ${routes.length} URLs`);

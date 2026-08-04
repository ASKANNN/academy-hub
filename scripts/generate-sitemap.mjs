import { readdir, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const BASE = 'https://askanacademy.com';
const TODAY = new Date().toISOString().slice(0, 10);

const sortingDir = resolve(root, 'src/data/algorithms/sorting');
const files = await readdir(sortingDir);
const sortingSlugs = files
  .filter((f) => f.endsWith('.js'))
  .map((f) => f.replace(/\.js$/, ''))
  .sort();

const staticUrls = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/algorithms', priority: '0.9', changefreq: 'weekly' },
  { path: '/algorithms/sorting', priority: '0.8', changefreq: 'weekly' },
];

const algorithmUrls = sortingSlugs.map((slug) => ({
  path: `/algorithms/sorting/${slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const allUrls = [...staticUrls, ...algorithmUrls];

const entries = allUrls
  .map(
    ({ path, priority, changefreq }) =>
      `  <url>\n    <loc>${BASE}${path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

await writeFile(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml written — ${allUrls.length} URLs`);

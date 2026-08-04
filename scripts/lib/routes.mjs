import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');

// Read each algorithm's real `slug` field rather than deriving it from the
// filename — a few files (bogo-sort.js -> slug 'bogosort', flash-sort.js ->
// slug 'flashsort') don't match, and routing (getAlgorithm) keys off `slug`.
// Filename-derived URLs for those would 404/redirect and silently poison the
// sitemap and prerendered snapshots.
export async function getSortingSlugs() {
  const dir = resolve(root, 'src/data/algorithms/sorting');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.js'));
  const modules = await Promise.all(
    files.map((f) => import(pathToFileURL(resolve(dir, f)).href))
  );
  return modules
    .map((mod) => Object.values(mod)[0].slug)
    .sort();
}

export async function getAllRoutes() {
  const slugs = await getSortingSlugs();
  return [
    '/',
    '/algorithms',
    '/algorithms/sorting',
    ...slugs.map((slug) => `/algorithms/sorting/${slug}`),
  ];
}

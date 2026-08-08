import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');

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

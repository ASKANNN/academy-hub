import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ALGORITHM_CATEGORIES } from '../../src/data/algorithms/categories.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');

export async function getCategorySlugs(category) {
  const dir = resolve(root, 'src/data/algorithms', category);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.js'));
  const modules = await Promise.all(
    files.map((f) => import(pathToFileURL(resolve(dir, f)).href))
  );
  return modules
    .map((mod) => Object.values(mod)[0].slug)
    .sort();
}

export async function getAllRoutes() {
  const liveCategories = ALGORITHM_CATEGORIES.filter((c) => c.status === 'live');

  const routes = ['/', '/algorithms'];
  for (const category of liveCategories) {
    routes.push(`/algorithms/${category.slug}`);
    const slugs = await getCategorySlugs(category.slug);
    for (const slug of slugs) routes.push(`/algorithms/${category.slug}/${slug}`);
  }
  return routes;
}

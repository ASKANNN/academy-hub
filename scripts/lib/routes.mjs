import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ALGORITHM_CATEGORIES } from '../../src/data/algorithms/categories.js';
import { ARCHITECTURE_CATEGORIES } from '../../src/data/architectural-patterns/categories.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');

export async function getCategorySlugs(dataDir, category) {
  const dir = resolve(root, dataDir, category);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.js'));
  const modules = await Promise.all(
    files.map((f) => import(pathToFileURL(resolve(dir, f)).href))
  );
  return modules
    .map((mod) => Object.values(mod)[0].slug)
    .sort();
}

export async function getAllRoutes() {
  const routes = ['/', '/algorithms', '/architectural-patterns'];

  const liveAlgorithmCategories = ALGORITHM_CATEGORIES.filter((c) => c.status === 'live');
  for (const category of liveAlgorithmCategories) {
    routes.push(`/algorithms/${category.slug}`);
    const slugs = await getCategorySlugs('src/data/algorithms', category.slug);
    for (const slug of slugs) routes.push(`/algorithms/${category.slug}/${slug}`);
  }

  const liveArchitectureCategories = ARCHITECTURE_CATEGORIES.filter((c) => c.status === 'live');
  for (const category of liveArchitectureCategories) {
    routes.push(`/architectural-patterns/${category.slug}`);
    const slugs = await getCategorySlugs('src/data/architectural-patterns', category.slug);
    for (const slug of slugs) routes.push(`/architectural-patterns/${category.slug}/${slug}`);
  }

  return routes;
}

import { ARCHITECTURE_CATEGORIES, getArchitectureCategory } from './categories.js';
import { mvc } from './presentation/mvc.js';
import { mvp } from './presentation/mvp.js';

export { ARCHITECTURE_CATEGORIES, getArchitectureCategory };

const PATTERNS_BY_CATEGORY = {
  presentation: [
    mvc,
    mvp,
  ],
};

export function getPatternsByCategory(categorySlug) {
  return PATTERNS_BY_CATEGORY[categorySlug] ?? [];
}

export function getPattern(categorySlug, slug) {
  return getPatternsByCategory(categorySlug).find((p) => p.slug === slug);
}

export function getAdjacentPatterns(categorySlug, slug) {
  const list = getPatternsByCategory(categorySlug);
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}

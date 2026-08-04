import { ALGORITHM_CATEGORIES, getCategory } from './categories.js';
import { bubbleSort } from './sorting/bubble-sort.js';
import { selectionSort } from './sorting/selection-sort.js';
import { insertionSort } from './sorting/insertion-sort.js';
import { mergeSort } from './sorting/merge-sort.js';
import { quickSort } from './sorting/quick-sort.js';
import { heapSort } from './sorting/heap-sort.js';
import { shellSort } from './sorting/shell-sort.js';
import { cocktailShakerSort } from './sorting/cocktail-shaker-sort.js';
import { combSort } from './sorting/comb-sort.js';
import { countingSort } from './sorting/counting-sort.js';
import { radixSort } from './sorting/radix-sort.js';
import { bucketSort } from './sorting/bucket-sort.js';
import { timSort } from './sorting/tim-sort.js';

export { ALGORITHM_CATEGORIES, getCategory };

const ALGORITHMS_BY_CATEGORY = {
  sorting: [
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort,
    shellSort,
    cocktailShakerSort,
    combSort,
    countingSort,
    radixSort,
    bucketSort,
    timSort,
  ],
};

export function getAlgorithmsByCategory(categorySlug) {
  return ALGORITHMS_BY_CATEGORY[categorySlug] ?? [];
}

export function getAlgorithm(categorySlug, slug) {
  return getAlgorithmsByCategory(categorySlug).find((a) => a.slug === slug);
}

export function getAdjacentAlgorithms(categorySlug, slug) {
  const list = getAlgorithmsByCategory(categorySlug);
  const index = list.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}

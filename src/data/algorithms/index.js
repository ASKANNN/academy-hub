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
import { introSort } from './sorting/intro-sort.js';
import { cycleSort } from './sorting/cycle-sort.js';
import { smoothSort } from './sorting/smooth-sort.js';
import { tournamentSort } from './sorting/tournament-sort.js';
import { patienceSort } from './sorting/patience-sort.js';
import { blockSort } from './sorting/block-sort.js';
import { librarySort } from './sorting/library-sort.js';
import { gnomeSort } from './sorting/gnome-sort.js';
import { oddEvenSort } from './sorting/odd-even-sort.js';
import { strandSort } from './sorting/strand-sort.js';
import { pancakeSort } from './sorting/pancake-sort.js';
import { postmanSort } from './sorting/postman-sort.js';
import { bitonicSort } from './sorting/bitonic-sort.js';
import { sortingNetwork } from './sorting/sorting-network.js';
import { spreadSort } from './sorting/spread-sort.js';
import { flashSort } from './sorting/flash-sort.js';
import { bogoSort } from './sorting/bogo-sort.js';
import { stoogeSort } from './sorting/stooge-sort.js';
import { oN } from './big-o/o-n.js';
import { o1 } from './big-o/o-1.js';
import { oLogN } from './big-o/o-log-n.js';
import { oNLogN } from './big-o/o-n-log-n.js';
import { oN2 } from './big-o/o-n-2.js';

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
    introSort,
    cycleSort,
    smoothSort,
    tournamentSort,
    patienceSort,
    blockSort,
    librarySort,
    gnomeSort,
    oddEvenSort,
    strandSort,
    pancakeSort,
    postmanSort,
    bitonicSort,
    sortingNetwork,
    spreadSort,
    flashSort,
    bogoSort,
    stoogeSort,
  ],
  'big-o': [
    o1,
    oLogN,
    oN,
    oNLogN,
    oN2,
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

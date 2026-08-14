const IMAGE_FILES = {
  'block-sort': 'BlockSort.png',
  'bubble-sort': 'BubbleSort.png',
  'bucket-sort': 'BucketSort.png',
  'cocktail-shaker-sort': 'CocktailShakerSort.png',
  'comb-sort': 'CombSort.png',
  'counting-sort': 'CountingSort.png',
  'cycle-sort': 'CycleSort.png',
  'gnome-sort': 'GnomeSort.png',
  'heap-sort': 'HeapSort.png',
  'insertion-sort': 'InsertionSort.png',
  'intro-sort': 'IntroSort.png',
  'library-sort': 'LibrarySort.png',
  'merge-sort': 'MergeSort.png',
  'odd-even-sort': 'Odd-EvenSort.png',
  'pancake-sort': 'PancakeSort.png',
  'patience-sort': 'PatienceSort.png',
  'postman-sort': 'PostmanSort.png',
  'quick-sort': 'QuickSort.png',
  'radix-sort': 'RadixSort.png',
  'selection-sort': 'SelectionSort.png',
  'shell-sort': 'ShellSort.png',
  'smooth-sort': 'SmoothSort.png',
  'strand-sort': 'StrandSort.png',
  'tim-sort': 'TimSort.png',
  'tournament-sort': 'TournamentSort.png',
};

export function imageFor(slug) {
  const file = IMAGE_FILES[slug];
  return file ? `/images/algorithms/${file}` : null;
}

const IMAGE_FOLDERS = {
  sorting: 'algorithms',
  'big-o': 'big-o',
};

const IMAGE_FILES = {
  sorting: {
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
  },
  'big-o': {
    'o-n': 'LinearTime.png',
  },
};

export function imageFor(category, slug) {
  const folder = IMAGE_FOLDERS[category];
  const file = IMAGE_FILES[category]?.[slug];
  return folder && file ? `/images/${folder}/${file}` : null;
}

const IMAGE_FOLDERS = {
  sorting: 'algorithms',
  'big-o': 'big-o',
};

const IMAGE_FILES = {
  sorting: {
    'block-sort': 'BlockSort.png',
    'bubble-sort': 'BubbleSort.png',
    'bucket-sort': 'BucketSort.webp',
    'cocktail-shaker-sort': 'CocktailShakerSort.webp',
    'comb-sort': 'CombSort.webp',
    'counting-sort': 'CountingSort.webp',
    'cycle-sort': 'CycleSort.webp',
    'gnome-sort': 'GnomeSort.png',
    'heap-sort': 'HeapSort.webp',
    'insertion-sort': 'InsertionSort.webp',
    'intro-sort': 'IntroSort.webp',
    'library-sort': 'LibrarySort.png',
    'merge-sort': 'MergeSort.webp',
    'odd-even-sort': 'Odd-EvenSort.png',
    'pancake-sort': 'PancakeSort.png',
    'patience-sort': 'PatienceSort.webp',
    'postman-sort': 'PostmanSort.png',
    'quick-sort': 'QuickSort.webp',
    'radix-sort': 'RadixSort.webp',
    'selection-sort': 'SelectionSort.webp',
    'shell-sort': 'ShellSort.webp',
    'smooth-sort': 'SmoothSort.png',
    'strand-sort': 'StrandSort.png',
    'tim-sort': 'TimSort.webp',
    'tournament-sort': 'TournamentSort.png',
  },
  'big-o': {
    'o-1': 'ConstantTime.webp',
    'o-log-n': 'LogarithmicTime.webp',
    'o-n': 'LinearTime.webp',
    'o-n-log-n': 'LinearithmicTime.webp',
    'o-n-2': 'QuadraticTime.webp',
    'o-n-3': 'CubicTime.webp',
    'o-2-n': 'ExponentialTime.png',
    'o-n-factorial': 'FactorialTime.png',
    'best-average-worst-case': 'BAWCase.png',
  },
};

export function imageFor(category, slug) {
  const folder = IMAGE_FOLDERS[category];
  const file = IMAGE_FILES[category]?.[slug];
  return folder && file ? `/images/${folder}/${file}` : null;
}

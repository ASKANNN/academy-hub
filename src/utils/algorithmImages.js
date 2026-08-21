const IMAGE_FOLDERS = {
  sorting: 'algorithms',
  'big-o': 'big-o',
};

const IMAGE_FILES = {
  sorting: {
    'block-sort': 'BlockSort.webp',
    'bubble-sort': 'BubbleSort.webp',
    'bucket-sort': 'BucketSort.webp',
    'cocktail-shaker-sort': 'CocktailShakerSort.webp',
    'comb-sort': 'CombSort.webp',
    'counting-sort': 'CountingSort.webp',
    'cycle-sort': 'CycleSort.webp',
    'gnome-sort': 'GnomeSort.png',
    'heap-sort': 'HeapSort.webp',
    'insertion-sort': 'InsertionSort.webp',
    'intro-sort': 'IntroSort.webp',
    'library-sort': 'LibrarySort.webp',
    'merge-sort': 'MergeSort.webp',
    'odd-even-sort': 'Odd-EvenSort.png',
    'pancake-sort': 'PancakeSort.png',
    'patience-sort': 'PatienceSort.webp',
    'postman-sort': 'PostmanSort.png',
    'quick-sort': 'QuickSort.webp',
    'radix-sort': 'RadixSort.webp',
    'selection-sort': 'SelectionSort.webp',
    'shell-sort': 'ShellSort.webp',
    'smooth-sort': 'SmoothSort.webp',
    'strand-sort': 'StrandSort.png',
    'tim-sort': 'TimSort.webp',
  },
  'big-o': {
    'o-1': 'ConstantTime.webp',
    'o-log-n': 'LogarithmicTime.webp',
    'o-n': 'LinearTime.webp',
    'o-n-log-n': 'LinearithmicTime.webp',
    'o-n-2': 'QuadraticTime.webp',
    'o-n-3': 'CubicTime.webp',
    'o-2-n': 'ExponentialTime.webp',
    'o-n-factorial': 'FactorialTime.webp',
    'best-average-worst-case': 'BAWCase.webp',
  },
};

export function imageFor(category, slug) {
  const folder = IMAGE_FOLDERS[category];
  const file = IMAGE_FILES[category]?.[slug];
  return folder && file ? `/images/${folder}/${file}` : null;
}

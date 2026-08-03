export const quickSort = {
  slug: 'quick-sort',
  category: 'sorting',
  name: { ru: 'Быстрая сортировка', en: 'Quick Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: 'O(log n)',
  },
  popularity: 3,
  tags: ['divide-and-conquer', 'in-place', 'unstable'],

  intent: {
    ru: 'Быстрая сортировка выбирает опорный элемент, разбивает массив на элементы меньше и больше опорного, а затем рекурсивно сортирует каждую часть — почти всегда на месте и с очень низкими константными накладными расходами.',
    en: 'Quick sort picks a pivot, partitions the array into elements smaller and larger than the pivot, then recursively sorts each part — almost always in place, with very low constant overhead.',
  },

  problem: {
    ru: 'Сортировка слиянием гарантирует O(n log n), но платит за это O(n) дополнительной памяти на каждом слиянии. Нужен алгоритм с той же асимптотикой в среднем случае, но сортирующий на месте — то есть почти не потребляющий дополнительной памяти, что критично для больших массивов в памяти с ограниченным объёмом.',
    en: 'Merge sort guarantees O(n log n) but pays for it with O(n) extra memory per merge. What is needed is an algorithm with the same average-case asymptotics that sorts in place — using almost no extra memory, which matters for large arrays under tight memory limits.',
  },

  solution: {
    ru: 'Выбирается опорный элемент (pivot) — например, последний элемент подмассива. Массив переставляется («партиционируется») так, что все элементы меньше опорного оказываются слева от него, а все больше — справа; сам опорный элемент встаёт на своё окончательное отсортированное место. Затем алгоритм рекурсивно применяется к левой и правой частям отдельно, до подмассивов длины 0 или 1.',
    en: 'A pivot element is chosen — e.g. the last element of the subarray. The array is rearranged ("partitioned") so all elements smaller than the pivot end up to its left, all larger ones to its right, and the pivot itself lands in its final sorted position. The algorithm then recurses independently on the left and right parts, down to subarrays of length 0 or 1.',
  },

  steps: [
    {
      title: { ru: 'Выбрать опорный элемент', en: 'Choose a pivot' },
      explanation: {
        ru: 'Взять один элемент подмассива (например, последний) в качестве опорного.',
        en: 'Take one element of the subarray (e.g. the last one) as the pivot.',
      },
    },
    {
      title: { ru: 'Партиционировать', en: 'Partition' },
      explanation: {
        ru: 'Пройти по подмассиву, переставляя элементы так, чтобы меньшие опорного оказались слева от него, большие — справа.',
        en: 'Walk through the subarray, rearranging elements so smaller-than-pivot values end up on its left, larger ones on its right.',
      },
    },
    {
      title: { ru: 'Зафиксировать опорный', en: 'Fix the pivot' },
      explanation: {
        ru: 'После партиционирования опорный элемент стоит ровно на своей финальной позиции в отсортированном массиве.',
        en: 'After partitioning, the pivot sits exactly at its final position in the sorted array.',
      },
    },
    {
      title: { ru: 'Рекурсия слева', en: 'Recurse left' },
      explanation: {
        ru: 'Применить тот же алгоритм к подмассиву элементов левее опорного.',
        en: 'Apply the same algorithm to the subarray of elements to the left of the pivot.',
      },
    },
    {
      title: { ru: 'Рекурсия справа', en: 'Recurse right' },
      explanation: {
        ru: 'Применить тот же алгоритм к подмассиву элементов правее опорного — до тех пор, пока все подмассивы не станут длины 0 или 1.',
        en: 'Apply the same algorithm to the subarray of elements to the right of the pivot — until every subarray has length 0 or 1.',
      },
    },
  ],

  implementation: {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

    return arr


def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
  },

  pros: [
    {
      ru: 'Сортирует на месте — O(log n) памяти на стек рекурсии против O(n) у сортировки слиянием.',
      en: 'Sorts in place — O(log n) memory for the recursion stack versus O(n) for merge sort.',
    },
    {
      ru: 'На практике часто быстрее сортировки слиянием благодаря низким константам и хорошей работе с кэшем процессора.',
      en: 'Often faster than merge sort in practice thanks to low constants and cache-friendly access patterns.',
    },
    {
      ru: 'Хорошо распараллеливается: левая и правая части независимы после партиционирования.',
      en: 'Parallelizes well: the left and right parts are independent after partitioning.',
    },
  ],
  cons: [
    {
      ru: 'Худший случай O(n²) — возникает, если опорный элемент раз за разом оказывается наименьшим или наибольшим (например, на уже отсортированном массиве при наивном выборе опорного).',
      en: 'Worst case O(n²) — happens when the pivot repeatedly ends up smallest or largest (e.g. on an already-sorted array with a naive pivot choice).',
    },
    {
      ru: 'Неустойчив: партиционирование может изменить относительный порядок равных элементов.',
      en: 'Unstable: partitioning can change the relative order of equal elements.',
    },
    {
      ru: 'Производительность сильно зависит от стратегии выбора опорного элемента — плохая стратегия сводит алгоритм к квадратичному.',
      en: 'Performance is highly sensitive to the pivot-selection strategy — a bad strategy degrades it to quadratic.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда важна скорость на практике и сортировка «на месте», а гарантия худшего случая не критична (можно смягчить случайным выбором опорного).',
      en: 'When practical speed and in-place sorting matter, and a worst-case guarantee isn\'t critical (can be mitigated with random pivot selection).',
    },
    {
      ru: 'Для сортировки массивов примитивных типов в памяти, где произвольный доступ дешёв.',
      en: 'For sorting arrays of primitive types in memory, where random access is cheap.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**`Array.prototype.sort` во многих движках JavaScript** для примитивных типов исторически использовала варианты быстрой сортировки (сейчас чаще Timsort/гибриды).',
      en: '**`Array.prototype.sort` in many JavaScript engines** historically used quicksort variants for primitive types (now more often Timsort/hybrids).',
    },
    {
      ru: '**Introsort** (используется в C++ `std::sort`) начинает с быстрой сортировки и переключается на heapsort, если рекурсия становится подозрительно глубокой — защита от худшего случая.',
      en: '**Introsort** (used by C++\'s `std::sort`) starts with quicksort and switches to heapsort if recursion gets suspiciously deep — a safeguard against the worst case.',
    },
  ],

  relatedAlgorithms: ['merge-sort', 'selection-sort'],

  quiz: [
    {
      question: {
        ru: 'Что гарантированно верно об опорном элементе сразу после шага партиционирования?',
        en: 'What is guaranteed true about the pivot right after the partition step?',
      },
      options: [
        {
          ru: 'Он стоит на своей окончательной позиции в отсортированном массиве',
          en: 'It sits at its final position in the sorted array',
        },
        { ru: 'Он всегда является минимальным элементом', en: 'It is always the minimum element' },
        { ru: 'Он удаляется из массива', en: 'It is removed from the array' },
        { ru: 'Он копируется во временный массив', en: 'It is copied into a temporary array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование расставляет все меньшие элементы слева, большие — справа от опорного, поэтому его текущая позиция и есть его финальное место в отсортированном массиве.',
        en: 'Partitioning places all smaller elements to the left and all larger ones to the right of the pivot, so its current position is exactly its final place in the sorted array.',
      },
    },
    {
      question: {
        ru: 'При каких условиях быстрая сортировка деградирует до O(n²)?',
        en: 'Under what conditions does quicksort degrade to O(n²)?',
      },
      options: [
        {
          ru: 'Когда опорный элемент раз за разом оказывается самым маленьким или самым большим в подмассиве',
          en: 'When the pivot repeatedly ends up being the smallest or largest element in the subarray',
        },
        { ru: 'Когда массив содержит только уникальные значения', en: 'When the array contains only unique values' },
        { ru: 'Когда длина массива — степень двойки', en: 'When the array length is a power of two' },
        { ru: 'Это невозможно, quicksort всегда O(n log n)', en: 'This is impossible, quicksort is always O(n log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'В этом случае каждое партиционирование делит массив на части размером 0 и n−1 вместо примерно равных половин, и глубина рекурсии становится O(n) вместо O(log n).',
        en: 'In that case, every partition splits the array into parts of size 0 and n−1 instead of roughly equal halves, and recursion depth becomes O(n) instead of O(log n).',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти использует быстрая сортировка в среднем случае?',
        en: 'How much extra memory does quicksort use in the average case?',
      },
      options: [
        { ru: 'O(log n) — на стек рекурсии', en: 'O(log n) — for the recursion stack' },
        { ru: 'O(n) — как сортировка слиянием', en: 'O(n) — same as merge sort' },
        { ru: 'O(1) — рекурсия не занимает память', en: 'O(1) — recursion takes no memory' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование происходит на месте, но каждый рекурсивный вызов занимает кадр стека — при сбалансированном разбиении глубина рекурсии составляет O(log n).',
        en: 'Partitioning happens in place, but each recursive call takes a stack frame — with balanced splits, recursion depth is O(log n).',
      },
    },
    {
      question: {
        ru: 'Почему быстрая сортировка считается неустойчивой?',
        en: 'Why is quicksort considered unstable?',
      },
      options: [
        {
          ru: 'Перестановки во время партиционирования могут изменить относительный порядок равных элементов',
          en: 'Swaps during partitioning can change the relative order of equal elements',
        },
        { ru: 'Она использует случайные числа для сравнения', en: 'It uses random numbers for comparisons' },
        { ru: 'Она никогда не завершает работу на дубликатах', en: 'It never finishes on duplicate values' },
        { ru: 'Она не сортирует на месте', en: 'It doesn\'t sort in place' },
      ],
      correct: 0,
      explanation: {
        ru: 'В процессе перестановки элементов вокруг опорного равные по значению элементы могут «обменяться местами» друг с другом, теряя исходный порядок.',
        en: 'While rearranging elements around the pivot, equal-valued elements can get swapped past each other, losing their original order.',
      },
    },
    {
      question: {
        ru: 'Как Introsort (используется в C++ `std::sort`) защищается от худшего случая quicksort?',
        en: 'How does Introsort (used by C++\'s `std::sort`) guard against quicksort\'s worst case?',
      },
      options: [
        {
          ru: 'Отслеживает глубину рекурсии и переключается на heapsort, если она становится слишком большой',
          en: 'It tracks recursion depth and switches to heapsort if it gets too large',
        },
        { ru: 'Полностью отказывается от быстрой сортировки', en: 'It abandons quicksort entirely' },
        { ru: 'Всегда выбирает опорным первый элемент', en: 'It always picks the first element as pivot' },
        { ru: 'Использует только чётные индексы для сравнения', en: 'It only uses even indices for comparison' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort начинает как быстрая сортировка ради практической скорости, но при аномально глубокой рекурсии (признак плохого разбиения) переключается на heapsort с гарантированным O(n log n), избегая квадратичного срыва.',
        en: 'Introsort starts as quicksort for practical speed, but on abnormally deep recursion (a sign of bad partitioning) switches to heapsort with a guaranteed O(n log n), avoiding the quadratic blowup.',
      },
    },
  ],
};

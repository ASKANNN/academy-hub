export const heapSort = {
  slug: 'heap-sort',
  category: 'sorting',
  name: { ru: 'Пирамидальная сортировка', en: 'Heap Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable', 'heap'],

  intent: {
    ru: 'Пирамидальная сортировка строит из массива структуру данных «куча» (heap) и многократно извлекает из неё наибольший элемент, помещая его в конец массива — гарантированно за O(n log n) в любом случае, без рекурсии и почти без дополнительной памяти.',
    en: 'Heap sort builds a heap data structure out of the array and repeatedly extracts its largest element into the tail of the array — guaranteed O(n log n) in every case, with no recursion and almost no extra memory.',
  },

  problem: {
    ru: 'Быстрая сортировка в среднем очень быстра, но в худшем случае деградирует до O(n²), а сортировка слиянием гарантирует O(n log n), но требует O(n) дополнительной памяти. Нужен алгоритм с гарантированной асимптотикой O(n log n) в худшем случае, который при этом сортирует на месте, используя лишь O(1) дополнительной памяти.',
    en: 'Quicksort is fast on average but degrades to O(n²) in the worst case, while merge sort guarantees O(n log n) but needs O(n) extra memory. What is needed is an algorithm with a guaranteed O(n log n) worst case that still sorts in place, using only O(1) extra memory.',
  },

  solution: {
    ru: 'Массив интерпретируется как бинарная куча (heap) — дерево, хранящееся прямо в массиве, где родитель элемента с индексом `i` находится по индексу `(i-1)/2`, а дети — по `2i+1` и `2i+2`. Сначала массив превращается в **max-heap** — куча, где родитель всегда не меньше своих детей, то есть наибольший элемент оказывается в корне (индекс 0). Затем корень (максимум) меняется местами с последним элементом кучи, куча «сжимается» на один элемент, и просеивание (`sift down`) восстанавливает свойство кучи для нового корня. Шаг повторяется, пока куча не опустеет — так весь массив оказывается отсортирован на месте.',
    en: 'The array is interpreted as a binary heap — a tree stored directly inside the array, where the parent of index `i` sits at `(i-1)/2` and its children sit at `2i+1` and `2i+2`. First, the array is turned into a **max-heap** — a heap where every parent is at least as large as its children, so the largest element ends up at the root (index 0). Then the root (the maximum) is swapped with the last element of the heap, the heap "shrinks" by one element, and sift-down restores the heap property for the new root. The step repeats until the heap is empty, leaving the whole array sorted in place.',
  },

  steps: [
    {
      title: { ru: 'Построить max-heap', en: 'Build a max-heap' },
      explanation: {
        ru: 'Пройти по массиву от последнего родительского узла к корню, просеивая (`sift down`) каждый узел вниз, пока весь массив не станет корректной max-heap.',
        en: 'Walk the array from the last parent node back to the root, sifting each node down until the whole array is a valid max-heap.',
      },
    },
    {
      title: { ru: 'Извлечь максимум', en: 'Extract the maximum' },
      explanation: {
        ru: 'Поменять местами корень кучи (индекс 0, наибольший элемент) с последним элементом текущей кучи.',
        en: 'Swap the heap root (index 0, the largest element) with the last element of the current heap.',
      },
    },
    {
      title: { ru: 'Сжать кучу', en: 'Shrink the heap' },
      explanation: {
        ru: 'Уменьшить границу кучи на один — только что переставленный максимум теперь считается отсортированным и в куче больше не участвует.',
        en: 'Decrease the heap boundary by one — the element just moved to the end is now considered sorted and no longer part of the heap.',
      },
    },
    {
      title: { ru: 'Просеять новый корень', en: 'Sift the new root down' },
      explanation: {
        ru: 'Новый элемент в корне почти наверняка нарушает свойство кучи — просеять его вниз, меняя местами с большим из детей, пока свойство не восстановится.',
        en: 'The new root element almost certainly breaks the heap property — sift it down, swapping with the larger child, until the property holds again.',
      },
    },
    {
      title: { ru: 'Повторять до опустошения кучи', en: 'Repeat until the heap is empty' },
      explanation: {
        ru: 'Повторять извлечение максимума и просеивание, пока в куче не останется ни одного элемента — массив полностью отсортирован по возрастанию.',
        en: 'Repeat extracting the maximum and sifting down until the heap has no elements left — the array is fully sorted in ascending order.',
      },
    },
  ],

  implementation: {
    javascript: `function heapSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(a, n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    siftDown(a, end, 0);
  }

  return a;
}

function siftDown(a, size, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < size && a[left] > a[largest]) largest = left;
  if (right < size && a[right] > a[largest]) largest = right;

  if (largest !== i) {
    [a[i], a[largest]] = [a[largest], a[i]];
    siftDown(a, size, largest);
  }
}`,
    python: `def heap_sort(arr):
    a = arr.copy()
    n = len(a)

    for i in range(n // 2 - 1, -1, -1):
        sift_down(a, n, i)

    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        sift_down(a, end, 0)

    return a


def sift_down(a, size, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < size and a[left] > a[largest]:
        largest = left
    if right < size and a[right] > a[largest]:
        largest = right

    if largest != i:
        a[i], a[largest] = a[largest], a[i]
        sift_down(a, size, largest)`,
  },

  pros: [
    {
      ru: 'Гарантированный O(n log n) в худшем случае — в отличие от быстрой сортировки, нет патологического входа, на котором алгоритм деградирует до O(n²).',
      en: 'Guaranteed O(n log n) worst case — unlike quicksort, there is no pathological input that degrades it to O(n²).',
    },
    {
      ru: 'Сортирует на месте — всего O(1) дополнительной памяти, без рекурсии и без стека вызовов O(log n), как у быстрой сортировки.',
      en: 'Sorts in place — only O(1) extra memory, with no recursion and no O(log n) call stack like quicksort.',
    },
    {
      ru: 'Предсказуемая производительность: время работы почти не зависит от исходного порядка элементов.',
      en: 'Predictable performance: running time barely depends on the initial order of the elements.',
    },
  ],
  cons: [
    {
      ru: 'На практике обычно медленнее быстрой сортировки из-за худшей локальности обращений к памяти — прыжки по индексам кучи хуже используют кэш процессора.',
      en: 'Usually slower than quicksort in practice due to worse memory locality — jumping around heap indices makes poorer use of the CPU cache.',
    },
    {
      ru: 'Неустойчива: перестановки при просеивании могут изменить относительный порядок равных элементов.',
      en: 'Unstable: swaps during sift-down can change the relative order of equal elements.',
    },
    {
      ru: 'Сложнее для понимания и реализации, чем простые квадратичные алгоритмы вроде сортировки вставками.',
      en: 'Harder to understand and implement than simple quadratic algorithms like insertion sort.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда нужна гарантия O(n log n) в худшем случае и мало памяти — например, во встраиваемых системах или в системном коде, где непредсказуемое поведение quicksort недопустимо.',
      en: 'When a guaranteed O(n log n) worst case and low memory usage matter — e.g. in embedded systems or system-level code where quicksort\'s unpredictable behavior is unacceptable.',
    },
    {
      ru: 'Как строительный блок для других алгоритмов и структур данных: очередь с приоритетом, алгоритм Дейкстры, top-k выборка через частично отсортированную кучу.',
      en: 'As a building block for other algorithms and data structures: priority queues, Dijkstra\'s algorithm, top-k selection via a partially sorted heap.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Introsort** (используется в C++ `std::sort`) начинает с быстрой сортировки, но переключается на heapsort, если рекурсия становится подозрительно глубокой — это защищает от худшего случая quicksort.',
      en: '**Introsort** (used by C++\'s `std::sort`) starts with quicksort but switches to heapsort if recursion gets suspiciously deep — a safeguard against quicksort\'s worst case.',
    },
    {
      ru: '**Очереди с приоритетом (priority queue)** в большинстве стандартных библиотек — те же структуры данных «куча», что использует heapsort, применяются напрямую для планировщиков задач и алгоритмов на графах.',
      en: '**Priority queues** in most standard libraries — the same heap data structure heapsort relies on is used directly for task schedulers and graph algorithms.',
    },
  ],

  relatedAlgorithms: ['quick-sort', 'merge-sort'],

  quiz: [
    {
      question: {
        ru: 'Как найти индекс родителя элемента с индексом `i` в куче, хранящейся в массиве?',
        en: 'How do you find the parent index of an element at index `i` in an array-backed heap?',
      },
      options: [
        { ru: '(i - 1) / 2 (целочисленное деление)', en: '(i - 1) / 2 (integer division)' },
        { ru: 'i / 2 + 1', en: 'i / 2 + 1' },
        { ru: 'i * 2', en: 'i * 2' },
        { ru: 'i - 2', en: 'i - 2' },
      ],
      correct: 0,
      explanation: {
        ru: 'Дети элемента `i` находятся по индексам `2i+1` и `2i+2`, поэтому обратное преобразование к родителю — `(i-1)/2` с целочисленным делением.',
        en: 'The children of element `i` sit at indices `2i+1` and `2i+2`, so inverting that to find the parent gives `(i-1)/2` with integer division.',
      },
    },
    {
      question: {
        ru: 'Что происходит на каждой итерации фазы извлечения максимума?',
        en: 'What happens on each iteration of the extraction phase?',
      },
      options: [
        {
          ru: 'Корень кучи меняется местами с последним элементом кучи, куча сжимается, и новый корень просеивается вниз',
          en: 'The heap root is swapped with the last heap element, the heap shrinks, and the new root is sifted down',
        },
        { ru: 'Массив разбивается на две равные половины', en: 'The array is split into two equal halves' },
        { ru: 'Выбирается случайный опорный элемент', en: 'A random pivot element is chosen' },
        { ru: 'Куча полностью перестраивается заново', en: 'The heap is fully rebuilt from scratch' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно эта пара операций — swap с концом кучи и sift down нового корня — превращает max-heap в отсортированный массив за n шагов.',
        en: 'This pair of operations — swapping with the end of the heap and sifting the new root down — is exactly what turns a max-heap into a sorted array over n steps.',
      },
    },
    {
      question: {
        ru: 'Почему у пирамидальной сортировки гарантированный худший случай O(n log n), в отличие от быстрой сортировки?',
        en: 'Why does heap sort have a guaranteed O(n log n) worst case, unlike quicksort?',
      },
      options: [
        {
          ru: 'Просеивание всегда обрабатывает сбалансированное бинарное дерево высотой log n, независимо от исходных данных',
          en: 'Sift-down always operates on a balanced binary tree of height log n, regardless of the input data',
        },
        { ru: 'Она использует случайные числа для балансировки', en: 'It uses random numbers to balance itself' },
        { ru: 'Она всегда сортирует уже почти отсортированные данные', en: 'It only ever sorts nearly-sorted data' },
        { ru: 'Куча не зависит от количества элементов', en: 'The heap does not depend on the number of elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от партиционирования в quicksort, структура кучи как полного бинарного дерева всегда сбалансирована по построению, поэтому просеивание всегда стоит O(log n) независимо от порядка входных данных.',
        en: 'Unlike quicksort\'s partitioning, a heap is a complete binary tree that is balanced by construction, so sift-down always costs O(log n) regardless of the input order.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует пирамидальная сортировка?',
        en: 'How much extra memory does heap sort require?',
      },
      options: [
        { ru: 'O(1) — сортирует на месте, куча хранится в исходном массиве', en: 'O(1) — it sorts in place, the heap lives in the original array' },
        { ru: 'O(n) — как сортировка слиянием', en: 'O(n) — same as merge sort' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(log n) — на стек рекурсии, как у quicksort', en: 'O(log n) — for a recursion stack, like quicksort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Куча — это просто способ интерпретировать существующий массив как дерево через индексную арифметику, отдельная структура данных не создаётся.',
        en: 'A heap is just a way of interpreting the existing array as a tree via index arithmetic — no separate data structure is allocated.',
      },
    },
    {
      question: {
        ru: 'Почему Introsort переключается на heapsort при слишком глубокой рекурсии quicksort?',
        en: 'Why does Introsort switch to heapsort when quicksort\'s recursion gets too deep?',
      },
      options: [
        {
          ru: 'Глубокая рекурсия — признак плохого партиционирования, и heapsort даёт гарантию O(n log n), избегая квадратичного срыва',
          en: 'Deep recursion signals bad partitioning, and heapsort guarantees O(n log n), avoiding the quadratic blowup',
        },
        { ru: 'Heapsort быстрее quicksort на любых данных', en: 'Heapsort is faster than quicksort on any data' },
        { ru: 'Heapsort требует меньше сравнений', en: 'Heapsort requires fewer comparisons' },
        { ru: 'Это чисто историческое решение без технической причины', en: 'It is a purely historical decision with no technical reason' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort использует глубину рекурсии как сигнал тревоги: если она превышает ожидаемый порог `O(log n)`, это значит, что разбиения несбалансированы, и алгоритм подстраховывается гарантированным heapsort.',
        en: 'Introsort treats recursion depth as a warning sign: if it exceeds the expected `O(log n)` threshold, partitions are unbalanced, and the algorithm falls back to guaranteed-safe heapsort.',
      },
    },
  ],
};

export const heapSort = {
  slug: 'heap-sort',
  category: 'sorting',
  name: { ru: 'Heap Sort', en: 'Heap Sort' },
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
        { ru: 'i / 2 + 1, как в некоторых 1-индексированных реализациях кучи', en: 'i / 2 + 1, as used in some 1-indexed heap implementations' },
        { ru: 'i * 2, поскольку это обратная операция к вычислению левого ребёнка', en: 'i * 2, since it inverts the left-child formula' },
        { ru: 'i - 2, потому что родитель всегда на два индекса раньше', en: 'i - 2, because the parent is always two indices earlier' },
      ],
      correct: 0,
      explanation: {
        ru: 'Дети элемента `i` находятся по индексам `2i+1` и `2i+2`, поэтому обратное преобразование к родителю — `(i-1)/2` с целочисленным делением.',
        en: 'The children of element `i` sit at indices `2i+1` and `2i+2`, so inverting that to find the parent gives `(i-1)/2` with integer division.',
      },
      hint: {
        ru: 'Попробуй обратить формулы для детей `2i+1` и `2i+2` — какое действие возвращает обратно к `i`?',
        en: 'Try inverting the children formulas `2i+1` and `2i+2` — what operation gets you back to `i`?',
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
        { ru: 'Массив разбивается на две равные половины, которые затем сортируются и сливаются обратно', en: 'The array is split into two equal halves, which are then sorted and merged back together' },
        { ru: 'Выбирается случайный опорный элемент, вокруг которого партиционируются остальные', en: 'A random pivot element is chosen, and the rest are partitioned around it' },
        { ru: 'Куча полностью перестраивается заново из оставшихся элементов на каждой итерации', en: 'The heap is fully rebuilt from scratch out of the remaining elements on every iteration' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно эта пара операций — swap с концом кучи и sift down нового корня — превращает max-heap в отсортированный массив за n шагов.',
        en: 'This pair of operations — swapping with the end of the heap and sifting the new root down — is exactly what turns a max-heap into a sorted array over n steps.',
      },
      hint: {
        ru: 'Подумай, какая пара операций постепенно превращает max-heap в отсортированный по возрастанию массив, шаг за шагом.',
        en: 'Think about which pair of operations gradually turns a max-heap into an ascending sorted array, one step at a time.',
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
        { ru: 'Она использует случайные числа для балансировки дерева, как рандомизированный quicksort выбирает опорный элемент', en: 'It uses random numbers to balance the tree, the same way randomized quicksort picks its pivot' },
        { ru: 'Она всегда сортирует уже почти отсортированные данные благодаря начальному построению кучи', en: 'It only ever sorts nearly-sorted data thanks to the initial heap construction step' },
        { ru: 'Куча не зависит от количества элементов, так как её высота фиксирована для любого входа', en: 'The heap does not depend on the number of elements, since its height is fixed for any input' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от партиционирования в quicksort, структура кучи как полного бинарного дерева всегда сбалансирована по построению, поэтому просеивание всегда стоит O(log n) независимо от порядка входных данных.',
        en: 'Unlike quicksort\'s partitioning, a heap is a complete binary tree that is balanced by construction, so sift-down always costs O(log n) regardless of the input order.',
      },
      hint: {
        ru: 'Подумай о структурном свойстве полного бинарного дерева, которое никогда не меняется независимо от входных данных.',
        en: 'Think about the structural property of a complete binary tree that never changes regardless of the input data.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует пирамидальная сортировка?',
        en: 'How much extra memory does heap sort require?',
      },
      options: [
        { ru: 'O(1) — сортирует на месте, куча хранится в исходном массиве', en: 'O(1) — it sorts in place, the heap lives in the original array' },
        { ru: 'O(n) — как сортировка слиянием, потому что тоже нужен временный буфер для слияния уровней кучи', en: 'O(n) — same as merge sort, because it also needs a temporary buffer to merge heap levels' },
        { ru: 'O(n log n) — по одному дополнительному элементу на каждый шаг просеивания', en: 'O(n log n) — one extra element allocated for every sift-down step' },
        { ru: 'O(log n) — на стек рекурсии, как у quicksort, поскольку siftDown вызывает себя рекурсивно', en: 'O(log n) — for a recursion stack, like quicksort, since siftDown calls itself recursively' },
      ],
      correct: 0,
      explanation: {
        ru: 'Куча — это просто способ интерпретировать существующий массив как дерево через индексную арифметику, отдельная структура данных не создаётся.',
        en: 'A heap is just a way of interpreting the existing array as a tree via index arithmetic — no separate data structure is allocated.',
      },
      hint: {
        ru: 'Подумай, создаётся ли куча как отдельная структура данных или это просто другой взгляд на тот же массив.',
        en: 'Think about whether the heap is a separate data structure, or just another way of looking at the same array.',
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
        { ru: 'Heapsort быстрее quicksort на любых данных, поэтому его выгодно использовать при любой возможности', en: 'Heapsort is faster than quicksort on any data, so it pays to switch to it whenever possible' },
        { ru: 'Heapsort требует меньше сравнений благодаря структуре кучи, что компенсирует издержки переключения', en: 'Heapsort requires fewer comparisons thanks to the heap structure, offsetting the cost of switching' },
        { ru: 'Это чисто историческое решение без технической причины, унаследованное от ранних реализаций std::sort', en: 'It is a purely historical decision with no technical reason, inherited from early std::sort implementations' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort использует глубину рекурсии как сигнал тревоги: если она превышает ожидаемый порог `O(log n)`, это значит, что разбиения несбалансированы, и алгоритм подстраховывается гарантированным heapsort.',
        en: 'Introsort treats recursion depth as a warning sign: if it exceeds the expected `O(log n)` threshold, partitions are unbalanced, and the algorithm falls back to guaranteed-safe heapsort.',
      },
      hint: {
        ru: 'Подумай, о чём сигнализирует слишком глубокая рекурсия относительно качества разбиений quicksort.',
        en: 'Think about what unusually deep recursion signals about the quality of quicksort\'s partitions.',
      },
    },
    {
      question: {
        ru: 'Почему построение max-heap (`build-heap`) занимает O(n), а не O(n log n), хотя просеивание каждого узла стоит O(log n)?',
        en: 'Why does building a max-heap (`build-heap`) take O(n), not O(n log n), even though sifting each node costs O(log n)?',
      },
      options: [
        {
          ru: 'Большинство узлов находится ближе к листьям, где просеивание короткое, и сумма по всем уровням сходится к O(n)',
          en: 'Most nodes sit near the leaves, where sifting is short, and the sum across all levels converges to O(n)',
        },
        { ru: 'На самом деле это O(n log n), а O(n) — распространённое заблуждение', en: 'It is actually O(n log n) — the O(n) claim is a common misconception' },
        { ru: 'Просеивание стоит O(1), а не O(log n)', en: 'Sift-down costs O(1), not O(log n)' },
        { ru: 'Это зависит от исходного порядка элементов', en: 'It depends on the initial order of the elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Грубая оценка n/2 * O(log n) даёт O(n log n), но точный анализ учитывает, что узлов на нижних уровнях экспоненциально больше, а просеивание там короче — сумма вклада по уровням образует сходящийся геометрический ряд, дающий в итоге O(n).',
        en: 'A naive bound of n/2 * O(log n) gives O(n log n), but a tighter analysis accounts for exponentially more nodes near the bottom, where sift-down is short — the per-level contribution forms a converging geometric series that sums to O(n).',
      },
      hint: {
        ru: 'Подумай, сколько узлов лежит близко к низу дерева (где просеивание дешёвое) по сравнению с корнем (где оно дорогое).',
        en: 'Think about how many nodes sit near the bottom of the tree (where sift-down is cheap) compared to the root (where it is expensive).',
      },
    },
    {
      question: {
        ru: 'Почему пирамидальная сортировка на практике обычно медленнее быстрой сортировки, несмотря на такую же или лучшую гарантию худшего случая?',
        en: 'Why is heap sort typically slower than quicksort in practice, despite matching or beating its worst-case guarantee?',
      },
      options: [
        {
          ru: 'Обращения к куче прыгают по несмежным индексам, что даёт худшую локальность обращений к кэшу, чем у последовательных проходов quicksort',
          en: 'Heap access jumps between non-contiguous indices, giving worse cache locality than quicksort\'s mostly sequential scans',
        },
        { ru: 'У heapsort хуже асимптотическая сложность', en: 'Heap sort has worse asymptotic complexity' },
        { ru: 'Heapsort всегда использует больше памяти', en: 'Heap sort always uses more memory' },
        { ru: 'Heapsort на самом деле не O(n log n) в среднем случае', en: 'Heap sort is not actually O(n log n) on average' },
      ],
      correct: 0,
      explanation: {
        ru: 'Просеивание постоянно перескакивает между родителем и детьми, которые в массиве могут быть далеко друг от друга, вызывая больше промахов кэша, чем в целом локальные проходы партиционирования quicksort — реальный проигрыш по константе, несмотря на асимптотическое преимущество.',
        en: 'Sift-down repeatedly jumps between parent and child indices that can be far apart in memory, causing more cache misses than quicksort\'s largely local partitioning scans — a real constant-factor disadvantage despite the asymptotic edge.',
      },
      hint: {
        ru: 'Подумай, насколько далеко друг от друга в памяти обычно находятся родитель и его дети в куче на основе массива, и как это влияет на кэш процессора.',
        en: 'Think about how far apart in memory a parent and its children usually sit in an array-backed heap, and what that means for CPU cache access.',
      },
    },
    {
      question: {
        ru: 'Почему пирамидальная сортировка неустойчива, хотя явно не «пропускает» сравнение равных элементов?',
        en: 'Why is heap sort unstable even though it never explicitly "skips" comparing equal elements?',
      },
      options: [
        {
          ru: 'Просеивание переставляет элементы по свойству кучи без какого-либо правила сохранения порядка равных элементов',
          en: 'Sift-down reorders elements based on the heap property with no tie-breaking rule that preserves the original order of equal elements',
        },
        { ru: 'На самом деле она устойчива — это заблуждение', en: 'It is actually stable, this is a misconception' },
        { ru: 'Неустойчивость возникает только при дубликатах больше половины массива', en: 'Instability only occurs with duplicates larger than half the array' },
        { ru: 'Неустойчивость возникает только на этапе построения кучи, но не при извлечении', en: 'Instability only happens during heap construction, not extraction' },
      ],
      correct: 0,
      explanation: {
        ru: 'Когда просеивание или обмен при извлечении перемещает элемент мимо равного ему соседа или корня, ничто в алгоритме не отслеживает и не сохраняет их исходный относительный порядок — в отличие от явного правила `<=` в сортировке слиянием.',
        en: 'Whenever sift-down or the extraction swap moves an element past an equal-valued sibling or root, nothing in the algorithm tracks or preserves their original relative order — unlike merge sort\'s explicit `<=` tie-break.',
      },
      hint: {
        ru: 'Подумай, отслеживает ли что-нибудь в просеивании или извлечении, какой из двух равных элементов был раньше в исходном массиве.',
        en: 'Think about whether anything in sift-down or extraction specifically tracks which of two equal elements came first in the original array.',
      },
    },
    {
      question: {
        ru: 'Как операция «извлечь максимум и просеять корень вниз» в heapsort связана с очередью с приоритетом в алгоритме Дейкстры?',
        en: 'How does heap sort\'s "extract the max, then sift the root down" operation relate to the priority queue used in Dijkstra\'s algorithm?',
      },
      options: [
        {
          ru: 'Это одна и та же операция «извлечь корень за O(log n), восстановить свойство кучи» — Дейкстра просто вызывает её многократно во время обхода графа, а не только в конце статичной сортировки',
          en: 'Both rely on the same "extract the root in O(log n), restore the heap property" operation — Dijkstra just calls it repeatedly during graph traversal instead of once at the end of a static sort',
        },
        { ru: 'Алгоритм Дейкстры вообще не использует кучи', en: 'Dijkstra\'s algorithm does not use heaps at all' },
        { ru: 'Реализации heapsort и очереди с приоритетом никак не связаны', en: 'Heap sort and priority queue implementations are unrelated' },
        { ru: 'Дейкстре нужно перестраивать кучу с нуля при каждом извлечении', en: 'Dijkstra\'s algorithm must rebuild the heap from scratch on every extraction' },
      ],
      correct: 0,
      explanation: {
        ru: 'Внутренний механизм heapsort — извлечь корень, просеять вниз — это ровно та операция очереди с приоритетом, которую алгоритм Дейкстры вызывает снова и снова, чтобы всегда обрабатывать ближайшую непосещённую вершину за O(log n) вместо O(n) при линейном переборе.',
        en: 'Heap sort\'s inner mechanism — extract the root, sift it down — is exactly the priority-queue operation Dijkstra\'s algorithm calls repeatedly to always process the next-closest unvisited node in O(log n) instead of O(n) with a linear scan.',
      },
      hint: {
        ru: 'Подумай, чем в более общих терминах структур данных является шаг heapsort «извлечь максимум, затем просеять вниз».',
        en: 'Think about what heap sort\'s "extract the maximum, then sift down" step actually is, in more general data-structure terms.',
      },
    },
    {
      question: {
        ru: 'Что нужно изменить в heapsort, чтобы он сразу давал массив, отсортированный по убыванию?',
        en: 'What would you change in heap sort to make it directly produce a descending-order array?',
      },
      options: [
        {
          ru: 'Строить min-heap вместо max-heap, чтобы наименьший элемент извлекался первым и попадал в конец массива',
          en: 'Build a min-heap instead of a max-heap, so the smallest element is extracted first and placed at the end each time',
        },
        { ru: 'Ничего не изменится — heapsort не может давать убывающий порядок', en: 'Nothing changes — heap sort cannot produce descending order' },
        { ru: 'Развернуть итоговый массив после сортировки — тип кучи не влияет', en: 'Reverse the final array after sorting; the heap type has no effect' },
        { ru: 'Изменить направление просеивания, оставив max-heap', en: 'Change the sift-down direction but keep a max-heap' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку извлечённый корень каждый раз помещается в текущий конец массива, использование min-heap вместо max-heap отправляет наименьшие элементы к концу, а наибольшие — к началу, напрямую давая убывающий порядок без отдельного разворота.',
        en: 'Since the extracted root is placed at the current end of the array each pass, using a min-heap instead of a max-heap sends the smallest elements toward the end and the largest toward the front, directly producing descending order without a separate reversal pass.',
      },
      hint: {
        ru: 'Подумай, в какой конец массива попадает каждый извлечённый корень, и какая куча отправила бы туда наименьшие элементы первыми.',
        en: 'Think about which end of the array receives each extracted root, and what kind of heap would send the smallest elements there first.',
      },
    },
  ],
};

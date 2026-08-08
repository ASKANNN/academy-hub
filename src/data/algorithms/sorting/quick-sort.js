export const quickSort = {
  slug: 'quick-sort',
  category: 'sorting',
  name: { ru: 'Quick Sort', en: 'Quick Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: 'O(log n)',
  },
  popularity: 3,
  tags: ['divide-and-conquer', 'in-place', 'unstable'],

  intent: {
    ru: 'Быстрая сортировка выбирает опорный элемент, разбивает массив на элементы меньше и больше опорного, а затем рекурсивно сортирует каждую часть - почти всегда на месте и с очень низкими константными накладными расходами.',
    en: 'Quick sort picks a pivot, partitions the array into elements smaller and larger than the pivot, then recursively sorts each part - almost always in place, with very low constant overhead.',
  },

  problem: {
    ru: 'Сортировка слиянием гарантирует O(n log n), но платит за это O(n) дополнительной памяти на каждом слиянии. Нужен алгоритм с той же асимптотикой в среднем случае, но сортирующий на месте - то есть почти не потребляющий дополнительной памяти, что критично для больших массивов в памяти с ограниченным объёмом.',
    en: 'Merge sort guarantees O(n log n) but pays for it with O(n) extra memory per merge. What is needed is an algorithm with the same average-case asymptotics that sorts in place - using almost no extra memory, which matters for large arrays under tight memory limits.',
  },

  solution: {
    ru: 'Выбирается опорный элемент (pivot) - например, последний элемент подмассива. Массив переставляется («партиционируется») так, что все элементы меньше опорного оказываются слева от него, а все больше - справа; сам опорный элемент встаёт на своё окончательное отсортированное место. Затем алгоритм рекурсивно применяется к левой и правой частям отдельно, до подмассивов длины 0 или 1.',
    en: 'A pivot element is chosen - e.g. the last element of the subarray. The array is rearranged ("partitioned") so all elements smaller than the pivot end up to its left, all larger ones to its right, and the pivot itself lands in its final sorted position. The algorithm then recurses independently on the left and right parts, down to subarrays of length 0 or 1.',
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
        ru: 'Пройти по подмассиву, переставляя элементы так, чтобы меньшие опорного оказались слева от него, большие - справа.',
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
        ru: 'Применить тот же алгоритм к подмассиву элементов правее опорного - до тех пор, пока все подмассивы не станут длины 0 или 1.',
        en: 'Apply the same algorithm to the subarray of elements to the right of the pivot - until every subarray has length 0 or 1.',
      },
    },
  ],
  stepBreakpoints: [3, 14, 18, 27],

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
      ru: 'Сортирует на месте - O(log n) памяти на стек рекурсии против O(n) у сортировки слиянием.',
      en: 'Sorts in place - O(log n) memory for the recursion stack versus O(n) for merge sort.',
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
      ru: 'Худший случай O(n²) - возникает, если опорный элемент раз за разом оказывается наименьшим или наибольшим (например, на уже отсортированном массиве при наивном выборе опорного).',
      en: 'Worst case O(n²) - happens when the pivot repeatedly ends up smallest or largest (e.g. on an already-sorted array with a naive pivot choice).',
    },
    {
      ru: 'Неустойчив: партиционирование может изменить относительный порядок равных элементов.',
      en: 'Unstable: partitioning can change the relative order of equal elements.',
    },
    {
      ru: 'Производительность сильно зависит от стратегии выбора опорного элемента - плохая стратегия сводит алгоритм к квадратичному.',
      en: 'Performance is highly sensitive to the pivot-selection strategy - a bad strategy degrades it to quadratic.',
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
      ru: '**Introsort** (используется в C++ `std::sort`) начинает с быстрой сортировки и переключается на heapsort, если рекурсия становится подозрительно глубокой - защита от худшего случая.',
      en: '**Introsort** (used by C++\'s `std::sort`) starts with quicksort and switches to heapsort if recursion gets suspiciously deep - a safeguard against the worst case.',
    },
  ],

  details: {
    deepDive: {
      ru: 'Быстрая сортировка использует стратегию «разделяй и властвуй» через операцию партиционирования. Алгоритм выбирает один элемент (опорный, pivot) - традиционно последний в подмассиве. Затем выполняется основная работа: двухуказательное партиционирование. Левый указатель идёт справа налево, ища элемент больший или равный опорному. Правый указатель идёт слева направо, ища элемент меньший опорного. Когда оба нашли свои элементы, они меняются местами. Процесс повторяется до пересечения указателей. На конец происходит финальная перестановка: опорный элемент встаёт на позицию пересечения, которая - это его окончательное место в отсортированном массиве. Все элементы слева теперь меньше опорного, все справа больше. Затем алгоритм рекурсивно применяется к левой и правой части. Глубина рекурсии в лучшем случае O(log n), если опорный примерно посередине, в худшем O(n) если опорный каждый раз крайний (наименьший или наибольший). Разница в выборе опорного - критична: случайный выбор гарантирует O(n log n) в высокой вероятности; наивный выбор (первый, последний) может привести к O(n²) на специально подготовленных данных.',
      en: 'Quicksort uses divide-and-conquer via a partitioning operation. The algorithm chooses one element (the pivot) - traditionally the last in the subarray. Then the core work happens: two-pointer partitioning. The left pointer walks right-to-left seeking an element >= pivot. The right pointer walks left-to-right seeking an element < pivot. When both find their elements, they swap. This repeats until the pointers cross. At the end, the pivot is placed at the crossing point - its final sorted position. All elements to the left are now smaller, all to the right are larger. The algorithm then recurses on the left and right parts. Recursion depth is O(log n) in the best case (pivot roughly in the middle), O(n) in the worst (pivot always smallest or largest). The pivot-selection strategy is critical: random selection guarantees O(n log n) with high probability; naive choices (first, last) can degrade to O(n²) on adversarially arranged data.',
    },
    whenToUse: {
      ru: 'Быстрая сортировка - выбор, когда нужна скорость на практике и O(n) дополнительной памяти недопустимо. Во-первых, она сортирует на месте с O(log n) памяти только на стеке рекурсии (vs. O(n) у Mergesort). Во-вторых, на случайных данных она работает быстрее Mergesort благодаря низким константным накладным расходам и хорошей локальности памяти (данные обрабатываются в нужном порядке для кэша). В-третьих, она ядро стандартных функций сортировки: C++ `std::sort` использует Introsort (гибрид Quick-Heapsort), Rust `slice::sort` также использует гибрид. Главный недостаток - нестабильность и худший случай O(n²). Для защиты от худшего случая применяют Introsort (переключение на Heapsort при глубокой рекурсии) или рандомизованный выбор опорного. На почти отсортированных данных Quicksort медленнее Insertion Sort и даже Mergesort, так как не адаптируется к исходному порядку. На маленьких подмассивах (< 10-20) часто переключаются на Insertion Sort. Нестабильность может быть проблемой, если требуется сохранить порядок для вторичных ключей.',
      en: 'Quicksort is the choice when practical speed matters and O(n) extra memory is not acceptable. First, it sorts in place with just O(log n) memory for the recursion stack (vs. O(n) for Mergesort). Second, on random data it runs faster than Mergesort thanks to low constant overhead and good memory locality (data is processed in an order friendly to the cache). Third, it is the core of standard sort functions: C++\'s `std::sort` uses Introsort (Quick-Heapsort hybrid), Rust\'s `slice::sort` also uses a hybrid. The main drawbacks are instability and O(n²) worst case. To guard against the worst case, use Introsort (switch to Heapsort at deep recursion) or randomized pivot selection. On nearly-sorted data Quicksort is slower than Insertion Sort and even Mergesort, as it does not adapt to existing order. On small subarrays (< 10-20) often switch to Insertion Sort. Instability can be a problem if you need to preserve order for secondary keys.',
    },
    realWorld: {
      ru: 'Чистый Quicksort в production редко встречается, но его гибриды везде. Introsort (используется в C++ STL, Rust) работает так: начинает с Quicksort с хорошей стратегией выбора опорного (медиана из трёх, random), отсчитывает глубину рекурсии, и если она превысит 2 * log(n), переключается на Heapsort для оставшегося подмассива - это защита от худшего случая O(n²). Однажды я встречал его как `pdqsort` (pattern-defeating quicksort) - ещё лучшая версия, обнаруживающая патологические случаи по шаблону данных. Timsort (Python, Java) начинает с поиска натуральных runs, может применять Quicksort к очень большим runs перед слиянием. В Linux ядро сортирует структуры в памяти через `sort.h` с вариантом гибридной сортировки. В базах данных: PostgreSQL для индексов использует Quicksort для большого диапазона индекса. Сетевые коммутаторы и маршрутизаторы часто используют быстрые варианты для классификации пакетов. Проблема с нестабильностью решается просто: если нужна устойчивость, применяют гибрид (добавляют информацию о позиции в ключ) или используют Mergesort/Timsort сразу.',
      en: 'Pure Quicksort in production is rare, but its hybrids are everywhere. Introsort (used in C++ STL, Rust) starts with Quicksort with a good pivot strategy (median-of-three, random), counts recursion depth, and if it exceeds 2*log(n), switches to Heapsort for the remaining subarray - a guard against O(n²). I have also seen it as `pdqsort` (pattern-defeating quicksort) - an even better version detecting pathological patterns in the data. Timsort (Python, Java) finds natural runs, may apply Quicksort to very large runs before merging. The Linux kernel sorts in-memory structures via `sort.h` with a hybrid sort variant. In databases: PostgreSQL uses Quicksort for large index ranges. Network switches and routers often use fast variants for packet classification. The instability issue is solved simply: if stability is needed, use a hybrid (add position info to the key) or use Mergesort/Timsort from the start.',
    },
  },

  relatedAlgorithms: ['merge-sort', 'selection-sort'],

  quiz: [
    {
      question: {
        ru: 'Является ли быстрая сортировка устойчивой (stable)?',
        en: 'Is quicksort stable?',
      },
      options: [
        { ru: 'Нет - перестановки при разбиении нарушают порядок равных элементов', en: 'No - swaps during partitioning can change the relative order of equal elements' },
        { ru: 'Да - при разбиении равные элементы никогда не меняют свой относительный порядок', en: 'Yes - equal elements never change their relative order during partitioning' },
        { ru: 'Зависит от версии: рандомизированная устойчива, а с фиксированным опорным - нет', en: 'It depends on the version: randomized quicksort is stable, fixed-pivot quicksort is not' },
        { ru: 'Только если все элементы массива различны', en: 'Only if all elements of the array are distinct' },
      ],
      correct: 0,
      explanation: {
        ru: 'Операция swap во время разбиения может «перебросить» равные по значению элементы через опорный, меняя их взаимный порядок - отсюда нестабильность.',
        en: 'The swap operation during partitioning can leap-frog equal-valued elements past the pivot, changing their mutual order - hence the instability.',
      },
      hint: {
        ru: 'Подумай, что операция обмена (swap) может сделать с относительным порядком двух равных по значению элементов.',
        en: 'Think about what a swap operation can do to the relative order of two equal-valued elements.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти использует быстрая сортировка в среднем случае?',
        en: 'How much extra memory does quicksort use in the average case?',
      },
      options: [
        { ru: 'O(log n) - на стек рекурсии', en: 'O(log n) - for the recursion stack' },
        {
          ru: 'O(n) - столько же дополнительной памяти, сколько требуется сортировке слиянием для слияния',
          en: 'O(n) - the same amount of extra memory that merge sort needs for merging its subarrays',
        },
        {
          ru: 'O(1) - потому что рекурсивные вызовы полностью оптимизируются компилятором',
          en: 'O(1) - because recursive calls are optimized away entirely by the compiler',
        },
        {
          ru: 'O(n log n) - по числу сравнений, выполняемых в процессе сортировки',
          en: 'O(n log n) - matching the number of comparisons made during sorting',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование происходит на месте, но каждый рекурсивный вызов занимает кадр стека - при сбалансированном разбиении глубина рекурсии составляет O(log n).',
        en: 'Partitioning happens in place, but each recursive call takes a stack frame - with balanced splits, recursion depth is O(log n).',
      },
      hint: {
        ru: 'Раздели вопрос на два: занимает ли память само партиционирование, и занимает ли память сам механизм рекурсивных вызовов.',
        en: 'Split the question in two: does the partitioning itself use memory, and does the recursive call mechanism itself use memory?',
      },
    },
    {
      question: {
        ru: 'Какова средняя и лучшая временная сложность быстрой сортировки?',
        en: 'What is the average-case and best-case time complexity of quicksort?',
      },
      options: [
        { ru: 'O(n log n) - при равномерных разбиениях дерево рекурсии имеет глубину log n', en: 'O(n log n) - with balanced splits the recursion tree has depth log n' },
        { ru: 'O(n²) - она всегда деградирует в квадратичную, так как использует обмен элементами', en: 'O(n²) - it always degrades to quadratic because it relies on element swaps' },
        { ru: 'O(n) - потому что партиционирование является линейным проходом по массиву', en: 'O(n) - because partitioning is a single linear pass over the array' },
        { ru: 'O(n log² n) - из-за двойного логарифмического множителя глубины рекурсии', en: 'O(n log² n) - due to a double logarithmic factor in recursion depth' },
      ],
      correct: 0,
      explanation: {
        ru: 'При сбалансированных разбиениях глубина рекурсии равна O(log n), а каждый уровень выполняет O(n) работы при партиционировании - итого O(n log n). Это же значение является и лучшим случаем.',
        en: 'With balanced splits, recursion depth is O(log n), and each level does O(n) work during partitioning - total O(n log n). This is also the best-case value.',
      },
      hint: {
        ru: 'Подумай, какова глубина рекурсии при идеальном разбиении пополам и сколько работы выполняется на каждом уровне.',
        en: 'Think about what the recursion depth is with ideal half-splits, and how much work happens at each level.',
      },
    },
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
        {
          ru: 'Он всегда является минимальным элементом во всём исходном массиве, а не только в подмассиве',
          en: 'It is always the minimum element of the entire original array, not just the subarray',
        },
        {
          ru: 'Он удаляется из массива и хранится отдельно до завершения всей рекурсии',
          en: 'It is removed from the array and stored separately until the whole recursion finishes',
        },
        {
          ru: 'Он копируется во временный массив вместе с остальной частью подмассива на всякий случай',
          en: 'It is copied into a temporary array alongside the rest of the subarray for safekeeping',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование расставляет все меньшие элементы слева, большие - справа от опорного, поэтому его текущая позиция и есть его финальное место в отсортированном массиве.',
        en: 'Partitioning places all smaller elements to the left and all larger ones to the right of the pivot, so its current position is exactly its final place in the sorted array.',
      },
      hint: {
        ru: 'Подумай, что партиционирование гарантирует про расположение элементов относительно опорного, независимо от их количества по каждую сторону.',
        en: 'Think about what partitioning guarantees about elements relative to the pivot, regardless of how many end up on each side.',
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
        {
          ru: 'Когда массив содержит только уникальные значения, поэтому каждое сравнение при партиционировании оказывается строгим неравенством',
          en: 'When the array contains only unique values, so every comparison during partitioning is a strict inequality',
        },
        {
          ru: 'Когда длина массива является точной степенью двойки, например 16, 32 или 1024 элемента',
          en: 'When the array length is an exact power of two, such as 16, 32, or 1024 elements',
        },
        {
          ru: 'Это невозможно - quicksort математически гарантированно всегда работает за O(n log n), независимо от входных данных',
          en: 'This is impossible - quicksort is mathematically guaranteed to always run in O(n log n) time, regardless of input',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В этом случае каждое партиционирование делит массив на части размером 0 и n−1 вместо примерно равных половин, и глубина рекурсии становится O(n) вместо O(log n).',
        en: 'In that case, every partition splits the array into parts of size 0 and n−1 instead of roughly equal halves, and recursion depth becomes O(n) instead of O(log n).',
      },
      hint: {
        ru: 'Подумай про наивный выбор опорного (например, последний элемент) на уже отсортированном массиве - каким он всегда будет оказываться?',
        en: 'Think about a naive pivot choice (e.g. the last element) on an already sorted array - what will it always turn out to be?',
      },
    },
    {
      question: {
        ru: 'Как Introsort (используется в C++ `std::sort`) защищается от худшего случая quicksort?',
        en: 'How does Introsort (used by C++\'s `std::sort`) guard against quicksort\'s worst case?',
      },
      options: [
        {
          ru: 'Отслеживает глубину рекурсии и переключается на heapsort при её чрезмерном росте',
          en: 'It tracks recursion depth and switches to heapsort if it gets too large',
        },
        {
          ru: 'Полностью отказывается от быстрой сортировки и всегда начинает с сортировки слиянием',
          en: 'It abandons quicksort entirely and always begins sorting with merge sort instead',
        },
        {
          ru: 'Всегда выбирает опорным самый первый элемент массива при каждом рекурсивном вызове',
          en: 'It always picks the very first element of the array as the pivot on every call',
        },
        {
          ru: 'Использует для сравнения только элементы с чётными индексами массива',
          en: 'It only uses elements at even-numbered indices when comparing values',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort начинает как быстрая сортировка ради практической скорости, но при аномально глубокой рекурсии (признак плохого разбиения) переключается на heapsort с гарантированным O(n log n), избегая квадратичного срыва.',
        en: 'Introsort starts as quicksort for practical speed, but on abnormally deep recursion (a sign of bad partitioning) switches to heapsort with a guaranteed O(n log n), avoiding the quadratic blowup.',
      },
      hint: {
        ru: 'Подумай, какой сигнал говорит о том, что разбиения на очередных шагах оказываются плохими и несбалансированными.',
        en: 'Think about what signal indicates that the splits at recent steps have been bad and unbalanced.',
      },
    },
    {
      question: {
        ru: 'Как случайный выбор опорного элемента (или медиана из трёх) решает проблему худшего случая quicksort?',
        en: "How does randomized pivot selection (or median-of-three) address quicksort's worst-case problem?",
      },
      options: [
        {
          ru: 'Делает маловероятным, чтобы конкретный вход систематически вызывал худший случай, хотя теоретически он всё ещё возможен',
          en: 'It makes it unlikely for any specific input to systematically trigger the worst case, though it remains theoretically possible',
        },
        {
          ru: 'Математически гарантирует, что худший случай O(n log n) будет достигнут для абсолютно любого возможного входного массива, полностью исключая деградацию до O(n²) навсегда',
          en: 'It mathematically guarantees an O(n log n) worst case on every single possible input array, permanently eliminating any chance of the O(n²) case',
        },
        {
          ru: 'Делает сортировку полностью и необратимо устойчивой, гарантированно сохраняя относительный порядок всех равных элементов на каждом запуске',
          en: 'It makes the sort fully and permanently stable, guaranteeing the relative order of all equal elements is preserved on every single run',
        },
        {
          ru: 'Полностью устраняет саму необходимость в рекурсии, заменяя её единственным итеративным циклом обхода без стека вызовов',
          en: 'It eliminates the need for recursion entirely, replacing it with a single iterative loop that uses no call stack whatsoever',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Случайный выбор опорного (или медиана из первого/среднего/последнего элементов) не меняет теоретический худший случай O(n²) - он всё ещё существует для какого-то расположения элементов. Но он делает крайне маловероятным, чтобы конкретный фиксированный вход раз за разом его вызывал.',
        en: 'Randomizing the pivot (or taking the median of the first/middle/last elements) does not change the theoretical O(n²) worst case - it still exists for some arrangement of elements. But it makes it extremely unlikely that any specific fixed input will repeatedly trigger it.',
      },
      hint: {
        ru: 'Подумай, устраняет ли рандомизация худший случай полностью, или лишь делает крайне маловероятным его срабатывание на конкретном входе.',
        en: 'Think about whether randomization removes the worst case entirely, or just makes it highly unlikely to trigger on a specific input.',
      },
    },
    {
      question: {
        ru: 'В чём практическое отличие схемы партиционирования Хоара (Hoare) от схемы Ломуто (Lomuto), использованной в реализации выше?',
        en: "What is the practical difference between Hoare's partition scheme and the Lomuto scheme used in the implementation above?",
      },
      options: [
        {
          ru: 'Схема Хоара в среднем делает примерно втрое меньше перестановок',
          en: 'Hoare\'s scheme performs roughly three times fewer swaps on average',
        },
        {
          ru: 'Схема Хоара не сортирует на месте, требуя отдельный выходной массив целиком',
          en: "Hoare's scheme doesn't sort in place, requiring a separate output array entirely",
        },
        {
          ru: 'Схема Ломуто асимптотически быстрее, снижая класс сложности алгоритма в целом',
          en: "Lomuto's scheme is asymptotically faster, reducing the overall complexity class",
        },
        {
          ru: 'Между этими двумя схемами партиционирования нет вообще никакой значимой разницы',
          en: 'There is no meaningful difference between the schemes in theory or in practice',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Схема Ломуто обходит массив одним указателем и переставляет элементы чаще, особенно при большом числе повторяющихся значений. Оригинальная схема Хоара использует два указателя, идущих навстречу друг другу, и в среднем делает примерно втрое меньше перестановок, что обычно быстрее на практике.',
        en: "Lomuto's scheme scans with a single pointer and swaps more often, especially with many duplicate values. Hoare's original scheme uses two pointers moving toward each other and performs roughly three times fewer swaps on average, which is usually faster in practice.",
      },
      hint: {
        ru: 'Подумай, сколько указателей движется по массиву в каждой из схем, и как это влияет на частоту перестановок.',
        en: 'Think about how many pointers move through the array in each scheme, and how that affects how often swaps happen.',
      },
    },
    {
      question: {
        ru: 'Почему быстрая сортировка на практике часто обгоняет сортировку слиянием при одинаковой средней асимптотике O(n log n)?',
        en: 'Why does quicksort often outperform merge sort in practice despite the same average O(n log n) asymptotics?',
      },
      options: [
        {
          ru: 'Она сортирует на месте с хорошей локальностью кэша, не выделяя временные массивы, в отличие от сортировки слиянием',
          en: "It sorts in place with good cache locality, without allocating temporary arrays, unlike merge sort",
        },
        {
          ru: 'У неё строго лучшая асимптотическая сложность по времени, чем у сортировки слиянием, буквально в любом возможном случае без исключений',
          en: 'It has a strictly better big-O time complexity than merge sort in absolutely every single case, without exception',
        },
        {
          ru: 'Сортировка слиянием на самом деле никогда не является O(n log n) на практике, вопреки тому, что утверждают учебники',
          en: 'Merge sort is not actually O(n log n) in practice at all, despite what every textbook claims about it',
        },
        {
          ru: 'Быстрая сортировка всегда делает строго меньше сравнений элементов, чем сортировка слиянием на любом входе',
          en: 'Quicksort always makes strictly fewer element comparisons than merge sort, no matter the input given',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование quicksort работает прямо внутри исходного массива - хорошая локальность кэша и минимум обращений к памяти. Сортировка слиянием на каждом шаге выделяет и копирует данные во временные массивы. Число сравнений асимптотически одинаково, но quicksort обычно выигрывает по константам и эффективности на реальном железе.',
        en: "Quicksort's partitioning works directly within the original array - good cache locality and minimal memory traffic. Merge sort allocates and copies into temporary arrays at every step. The comparison count is asymptotically the same, but quicksort typically wins on constant factors and real hardware efficiency.",
      },
      hint: {
        ru: 'Подумай, что физически происходит в памяти во время партиционирования quicksort по сравнению со слиянием в merge sort.',
        en: "Think about what physically happens in memory during quicksort's partitioning versus merge sort's merging.",
      },
    },
    {
      question: {
        ru: 'Как «трёхстороннее» партиционирование (Dutch national flag) помогает quicksort на массивах с большим числом одинаковых значений?',
        en: "How does three-way ('Dutch national flag') partitioning help quicksort on arrays with many duplicate values?",
      },
      options: [
        {
          ru: 'Оно выделяет отдельную область элементов, равных опорному, и исключает её из дальнейшей рекурсии',
          en: 'It carves out a separate region of elements equal to the pivot and excludes it from further recursion',
        },
        {
          ru: 'Оно делает сортировку полностью и необратимо устойчивой, гарантированно сохраняя порядок всех равных элементов навсегда',
          en: 'It makes the sort fully and permanently stable by guaranteeing the order of all equal elements is preserved forever',
        },
        {
          ru: 'Оно полностью устраняет саму необходимость в опорном элементе, сортируя массив исключительно по числу выполненных сравнений',
          en: 'It eliminates the need for a pivot element entirely, sorting the array purely by counting comparisons instead',
        },
        {
          ru: 'Оно вообще никак не влияет на производительность, независимо от того, сколько повторяющихся значений содержит массив',
          en: 'It has no measurable effect on performance whatsoever, regardless of how many duplicate values the array contains',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Обычное двустороннее партиционирование продолжает рекурсивно обрабатывать все элементы, равные опорному, что превращает массив с массой повторов в патологический O(n²) случай. Трёхстороннее партиционирование группирует элементы на «меньше», «равно» и «больше» опорного и полностью исключает среднюю группу из рекурсии, возвращая производительность к O(n) на таких данных.',
        en: 'Standard two-way partitioning keeps recursively processing all elements equal to the pivot, which turns an array with heavy duplication into a pathological O(n²) case. Three-way partitioning groups elements into "less than," "equal to," and "greater than" the pivot and excludes the middle group from recursion entirely, bringing performance back toward O(n) on such data.',
      },
      hint: {
        ru: 'Подумай, что происходит с обычным двусторонним партиционированием, если почти все элементы массива равны друг другу.',
        en: 'Think about what happens to standard two-way partitioning when almost all elements in the array are equal to each other.',
      },
    },
  ],
};

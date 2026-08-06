export const introSort = {
  slug: 'intro-sort',
  category: 'sorting',
  name: { ru: 'Introsort', en: 'Introsort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(log n)',
  },
  popularity: 3,
  tags: ['hybrid', 'comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Интроспективная сортировка начинает как быстрая сортировка, но следит за глубиной рекурсии и переключается на пирамидальную сортировку, если рекурсия уходит слишком глубоко, а на маленьких подмассивах - на сортировку вставками.',
    en: 'Introsort starts as quicksort but tracks recursion depth and switches to heap sort if the recursion goes too deep, and to insertion sort on small subarrays.',
  },

  problem: {
    ru: 'Быстрая сортировка в среднем быстрее всех практических алгоритмов, но на неудачных входных данных (например, уже отсортированный массив с наивным выбором опорного элемента) её рекурсия деградирует до O(n²) и может исчерпать стек вызовов. Библиотечная функция сортировки не может позволить себе такой риск на произвольных пользовательских данных - нужна гарантия наихудшего случая без потери средней производительности quicksort.',
    en: 'Quicksort is on average faster than any practical algorithm, but on unlucky input (e.g. an already sorted array with a naive pivot choice) its recursion degrades to O(n²) and can exhaust the call stack. A library sort function cannot afford that risk on arbitrary user data - a worst-case guarantee is needed without losing quicksort\'s average-case performance.',
  },

  solution: {
    ru: 'Интроспективная сортировка запускает обычный quicksort, но отслеживает глубину рекурсии. Если глубина превышает порог 2·log₂(n), алгоритм «сдаётся» и досортировывает текущий подмассив пирамидальной сортировкой - у неё гарантированный O(n log n) в худшем случае. На маленьких подмассивах (обычно меньше ~16 элементов) применяется сортировка вставками, так как на таком размере она быстрее из-за низких констант. Так интроспективная сортировка получает среднюю скорость quicksort, гарантию heap sort и эффективность insertion sort на «хвостах».',
    en: 'Introsort runs regular quicksort but tracks recursion depth. If the depth exceeds a threshold of 2·log₂(n), the algorithm "gives up" and finishes sorting the current subarray with heap sort, which has a guaranteed O(n log n) worst case. On small subarrays (typically under ~16 elements), insertion sort is used since it is faster there due to low constant factors. This way introsort gets quicksort\'s average speed, heap sort\'s guarantee, and insertion sort\'s efficiency on the tails.',
  },

  steps: [
    {
      title: { ru: 'Начать с быстрой сортировки', en: 'Start with quicksort' },
      explanation: {
        ru: 'Выбрать опорный элемент и разбить массив на части меньше и больше опорного, как в обычном quicksort.',
        en: 'Choose a pivot and partition the array into parts smaller and larger than the pivot, as in regular quicksort.',
      },
    },
    {
      title: { ru: 'Отслеживать глубину рекурсии', en: 'Track recursion depth' },
      explanation: {
        ru: 'На каждом рекурсивном вызове увеличивать счётчик глубины и сравнивать его с порогом 2·log₂(n).',
        en: 'On each recursive call, increment the depth counter and compare it against the threshold 2·log₂(n).',
      },
    },
    {
      title: { ru: 'Переключиться на heap sort при превышении порога', en: 'Switch to heap sort past the threshold' },
      explanation: {
        ru: 'Если глубина превысила порог, досортировать оставшийся подмассив пирамидальной сортировкой вместо дальнейшей рекурсии quicksort.',
        en: 'If the depth has exceeded the threshold, finish sorting the remaining subarray with heap sort instead of continuing quicksort recursion.',
      },
    },
    {
      title: { ru: 'Переключиться на insertion sort на маленьких блоках', en: 'Switch to insertion sort on small blocks' },
      explanation: {
        ru: 'Когда размер подмассива становится меньше порогового значения, отсортировать его сортировкой вставками.',
        en: 'When a subarray shrinks below a size threshold, sort it with insertion sort.',
      },
    },
    {
      title: { ru: 'Собрать результат', en: 'Assemble the result' },
      explanation: {
        ru: 'Все подмассивы, отсортированные тремя разными способами, вместе образуют полностью отсортированный массив.',
        en: 'All subarrays, sorted via three different methods, together form the fully sorted array.',
      },
    },
  ],
  stepBreakpoints: [2, 10, 18, 25],

  implementation: {
    javascript: `function introSort(arr) {
  const a = [...arr];
  const maxDepth = 2 * Math.floor(Math.log2(a.length || 1));
  introsortRec(a, 0, a.length - 1, maxDepth);
  return a;
}

function introsortRec(a, low, high, depthLimit) {
  const size = high - low + 1;
  if (size < 16) {
    insertionSortRange(a, low, high);
    return;
  }
  if (depthLimit === 0) {
    heapSortRange(a, low, high);
    return;
  }
  const p = partition(a, low, high);
  introsortRec(a, low, p - 1, depthLimit - 1);
  introsortRec(a, p + 1, high, depthLimit - 1);
}

function partition(a, low, high) {
  const pivot = a[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (a[j] < pivot) {
      i++;
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
  [a[i + 1], a[high]] = [a[high], a[i + 1]];
  return i + 1;
}

function insertionSortRange(a, low, high) {
  for (let i = low + 1; i <= high; i++) {
    const current = a[i];
    let j = i - 1;
    while (j >= low && a[j] > current) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = current;
  }
}

function heapSortRange(a, low, high) {
  const size = high - low + 1;
  const sub = a.slice(low, high + 1);
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) siftDown(sub, size, i);
  for (let end = size - 1; end > 0; end--) {
    [sub[0], sub[end]] = [sub[end], sub[0]];
    siftDown(sub, end, 0);
  }
  for (let i = 0; i < size; i++) a[low + i] = sub[i];
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
    python: `import math


def intro_sort(arr):
    a = arr.copy()
    max_depth = 2 * math.floor(math.log2(len(a) or 1))
    _introsort_rec(a, 0, len(a) - 1, max_depth)
    return a


def _introsort_rec(a, low, high, depth_limit):
    size = high - low + 1
    if size < 16:
        _insertion_sort_range(a, low, high)
        return
    if depth_limit == 0:
        _heap_sort_range(a, low, high)
        return
    p = _partition(a, low, high)
    _introsort_rec(a, low, p - 1, depth_limit - 1)
    _introsort_rec(a, p + 1, high, depth_limit - 1)


def _partition(a, low, high):
    pivot = a[high]
    i = low - 1
    for j in range(low, high):
        if a[j] < pivot:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[high] = a[high], a[i + 1]
    return i + 1


def _insertion_sort_range(a, low, high):
    for i in range(low + 1, high + 1):
        current = a[i]
        j = i - 1
        while j >= low and a[j] > current:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = current


def _heap_sort_range(a, low, high):
    size = high - low + 1
    sub = a[low:high + 1]

    def sift_down(size, i):
        largest = i
        left, right = 2 * i + 1, 2 * i + 2
        if left < size and sub[left] > sub[largest]:
            largest = left
        if right < size and sub[right] > sub[largest]:
            largest = right
        if largest != i:
            sub[i], sub[largest] = sub[largest], sub[i]
            sift_down(size, largest)

    for i in range(size // 2 - 1, -1, -1):
        sift_down(size, i)
    for end in range(size - 1, 0, -1):
        sub[0], sub[end] = sub[end], sub[0]
        sift_down(end, 0)

    a[low:high + 1] = sub`,
  },

  pros: [
    {
      ru: 'Гарантированный O(n log n) в худшем случае - не деградирует до O(n²), в отличие от чистого quicksort.',
      en: 'Guaranteed O(n log n) worst case - doesn\'t degrade to O(n²) unlike plain quicksort.',
    },
    {
      ru: 'Сохраняет среднюю производительность quicksort на типичных данных за счёт того, что переключение случается редко.',
      en: 'Retains quicksort\'s average performance on typical data, since the fallback triggers rarely.',
    },
    {
      ru: 'Сортирует на месте с O(log n) памяти на стек рекурсии.',
      en: 'Sorts in place with O(log n) memory for the recursion stack.',
    },
    {
      ru: 'Промышленный стандарт: используется как `std::sort` в C++ STL и `Array.Sort` в .NET.',
      en: 'An industry standard: used as `std::sort` in the C++ STL and `Array.Sort` in .NET.',
    },
  ],
  cons: [
    {
      ru: 'Неустойчив - не сохраняет относительный порядок равных элементов, как и обычный quicksort.',
      en: 'Not stable - doesn\'t preserve relative order of equal elements, same as plain quicksort.',
    },
    {
      ru: 'Сложнее в реализации и отладке, чем каждый из трёх алгоритмов по отдельности.',
      en: 'More complex to implement and debug than any of the three underlying algorithms alone.',
    },
    {
      ru: 'Переключение между тремя алгоритмами усложняет профилирование и предсказание поведения на конкретных данных.',
      en: 'Switching between three algorithms makes profiling and predicting behavior on specific data harder.',
    },
  ],

  whenToUse: [
    {
      ru: 'Как универсальная сортировка общего назначения в библиотеке, где нужна и высокая средняя скорость, и гарантия худшего случая.',
      en: 'As a general-purpose library sort where both high average speed and a worst-case guarantee are needed.',
    },
    {
      ru: 'Когда неустойчивость сортировки не критична, а важна именно производительность на произвольных данных.',
      en: 'When sort stability doesn\'t matter but performance on arbitrary data does.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**C++ STL** - `std::sort` в большинстве реализаций (libstdc++, libc++) - это интроспективная сортировка.',
      en: '**C++ STL** - `std::sort` in most implementations (libstdc++, libc++) is introsort.',
    },
    {
      ru: '**.NET / C#** - `Array.Sort` использует гибрид quicksort/heapsort/insertion sort, концептуально идентичный introsort.',
      en: '**.NET / C#** - `Array.Sort` uses a quicksort/heapsort/insertion sort hybrid conceptually identical to introsort.',
    },
  ],

  relatedAlgorithms: ['quick-sort', 'heap-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что заставляет интроспективную сортировку переключиться с quicksort на heap sort?',
        en: 'What makes introsort switch from quicksort to heap sort?',
      },
      options: [
        {
          ru: 'Глубина рекурсии превышает порог 2·log₂(n)',
          en: 'Recursion depth exceeds the threshold of 2·log₂(n)',
        },
        {
          ru: 'Массив содержит дубликаты, из-за которых партиционирование quicksort начинает работать некорректно',
          en: 'The array contains duplicates, which cause quicksort\'s partitioning step to start behaving incorrectly',
        },
        {
          ru: 'Пользователь явно указывает флаг конфигурации перед вызовом функции сортировки',
          en: 'The user explicitly sets a configuration flag before calling the sort function',
        },
        {
          ru: 'Массив больше 1000 элементов, что превышает внутренний лимит библиотеки сортировки',
          en: 'The array is larger than 1000 elements, exceeding the sort library\'s internal size limit',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Превышение порога глубины сигнализирует, что quicksort работает на неудачных данных и рискует уйти в O(n²) - вместо этого текущий подмассив досортировывается heap sort с гарантированной асимптотикой.',
        en: 'Exceeding the depth threshold signals that quicksort is running on unlucky data and risks O(n²) - instead, the current subarray is finished with heap sort\'s guaranteed asymptotics.',
      },
      hint: {
        ru: 'Какой показатель алгоритм отслеживает, чтобы понять, что quicksort «ушёл не туда»?',
        en: 'What metric does the algorithm monitor to detect that quicksort is going off the rails?',
      },
    },
    {
      question: {
        ru: 'Почему интроспективная сортировка использует insertion sort на маленьких подмассивах, а не продолжает quicksort?',
        en: 'Why does introsort use insertion sort on small subarrays instead of continuing quicksort?',
      },
      options: [
        {
          ru: 'На малом n константные затраты insertion sort делают её практически быстрее рекурсии quicksort',
          en: 'At small sizes, insertion sort\'s low constant overhead makes it practically faster than quicksort recursion',
        },
        { ru: 'Quicksort в принципе не умеет корректно работать с маленькими массивами вообще, независимо от реализации', en: 'Quicksort fundamentally cannot handle small arrays correctly at all, regardless of implementation details' },
        { ru: 'Это прямое требование, явно прописанное словом в словах текста официального стандарта языка C++', en: 'It\'s a hard requirement explicitly spelled out word-for-word in the text of the official C++ language standard' },
        { ru: 'Insertion sort работает за гарантированное O(log n) на абсолютно любых входных данных без исключений', en: 'Insertion sort runs in a guaranteed O(log n) on absolutely any kind of input data with no exceptions' },
      ],
      correct: 0,
      explanation: {
        ru: 'Тот же приём, что и в Timsort: на маленьких n асимптотика не так важна, как константы, а у insertion sort они минимальны.',
        en: 'Same trick as in Timsort: at small n, asymptotics matter less than constant factors, and insertion sort has the lowest ones.',
      },
      hint: {
        ru: 'При очень малом n асимптотика перестаёт иметь значение - что тогда определяет практическую скорость?',
        en: 'At very small n, asymptotics stop mattering - what then determines practical speed?',
      },
    },
    {
      question: {
        ru: 'Какую гарантию даёт интроспективная сортировка, которой не даёт обычный quicksort?',
        en: 'What guarantee does introsort provide that plain quicksort does not?',
      },
      options: [
        { ru: 'O(n log n) в худшем случае', en: 'O(n log n) worst case' },
        { ru: 'Устойчивость сортировки', en: 'Sort stability' },
        { ru: 'O(1) дополнительной памяти', en: 'O(1) extra memory' },
        { ru: 'Работу с потоковыми данными', en: 'Support for streaming data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Обычный quicksort может деградировать до O(n²) на неудачном выборе опорных элементов; introsort страхует этот случай переключением на heap sort.',
        en: 'Plain quicksort can degrade to O(n²) on unlucky pivot choices; introsort hedges against this by switching to heap sort.',
      },
      hint: {
        ru: 'Зачем вообще нужен fallback на heap sort - от какой именно беды он защищает?',
        en: 'What specific failure mode does the heap sort fallback protect against?',
      },
    },
    {
      question: {
        ru: 'Почему introsort считается неустойчивой сортировкой?',
        en: 'Why is introsort considered an unstable sort?',
      },
      options: [
        {
          ru: 'Она наследует неустойчивость от quicksort и heap sort, которые меняют порядок равных элементов при обмене',
          en: 'It inherits instability from quicksort and heap sort, which can reorder equal elements during swaps',
        },
        { ru: 'Она использует случайные числа при выборе опорного элемента абсолютно на каждом отдельном шаге рекурсии', en: 'It uses random numbers when picking the pivot element at every single step of the recursion process' },
        { ru: 'Она в принципе никогда не сравнивает друг с другом равные элементы ни на одном из этапов работы', en: 'It fundamentally never compares equal elements against each other at any stage of the entire algorithm' },
        { ru: 'На самом деле она полностью устойчива, а обратное - это очень распространённое заблуждение среди программистов', en: 'It is actually fully stable, and the opposite claim is simply a very common misconception among programmers' },
      ],
      correct: 0,
      explanation: {
        ru: 'И партиционирование quicksort, и обмены в heap sort могут переставить местами равные элементы относительно друг друга - устойчивость не гарантируется ни одним из компонентов.',
        en: 'Both quicksort\'s partitioning and heap sort\'s swaps can reorder equal elements relative to each other - stability isn\'t guaranteed by either component.',
      },
      hint: {
        ru: 'Устойчивость гибрида определяется его компонентами - являются ли quicksort и heap sort устойчивыми?',
        en: 'A hybrid\'s stability comes from its components - are quicksort and heap sort stable?',
      },
    },
    {
      question: {
        ru: 'Почему именно introsort выбран как `std::sort` в C++ вместо чистого quicksort или чистого merge sort?',
        en: 'Why was introsort chosen as `std::sort` in C++ instead of plain quicksort or plain merge sort?',
      },
      options: [
        {
          ru: 'Он сочетает среднюю скорость quicksort с гарантией худшего случая, не требуя O(n) доп. памяти, как merge sort',
          en: 'It combines quicksort\'s average speed with a worst-case guarantee, without needing O(n) extra memory like merge sort',
        },
        { ru: 'Он единственный по-настоящему устойчивый алгоритм среди всех трёх рассматриваемых вариантов сортировки данных', en: 'It\'s the only genuinely stable algorithm among all three of the sorting candidates being considered here today' },
        { ru: 'Стандарт языка C++ официально требует минимум O(n) дополнительной памяти для реализации абсолютно любой сортировки', en: 'The official C++ language standard requires a minimum of O(n) extra memory for implementing absolutely any sort at all' },
        { ru: 'Merge sort в принципе не поддерживается подавляющим большинством современных компиляторов и языковых рантаймов', en: 'Merge sort fundamentally isn\'t supported by the vast majority of modern compilers and language runtimes at all today' },
      ],
      correct: 0,
      explanation: {
        ru: 'Стандарт `std::sort` требует O(n log n) в среднем; introsort даёт это и вдобавок гарантию худшего случая, оставаясь при этом in-place - в отличие от merge sort, который требует O(n) памяти.',
        en: 'The `std::sort` standard requires O(n log n) average; introsort delivers that plus a worst-case guarantee while staying in-place - unlike merge sort, which needs O(n) memory.',
      },
      hint: {
        ru: 'Подумайте, чего не хватает чистому quicksort и чем платит за надёжность merge sort.',
        en: 'Think about what plain quicksort lacks and what merge sort pays for its reliability.',
      },
    },
    {
      question: {
        ru: 'Какой порог глубины рекурсии использует introsort перед переключением на heap sort?',
        en: 'What recursion depth threshold does introsort use before switching to heap sort?',
      },
      options: [
        { ru: '2·log₂(n)', en: '2·log₂(n)' },
        { ru: 'n / 2', en: 'n / 2' },
        { ru: 'log₂(n) / 2', en: 'log₂(n) / 2' },
        { ru: 'sqrt(n)', en: 'sqrt(n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Порог 2·log₂(n) выбран так, чтобы нормальная рекурсия quicksort никогда не достигала его при сбалансированных разбиениях, но при деградации он срабатывал быстро.',
        en: 'The threshold 2·log₂(n) is chosen so that normal quicksort recursion never reaches it under balanced partitions, but triggers quickly during degeneration.',
      },
      hint: {
        ru: 'Это произведение константы на логарифм от n - какая именно константа используется?',
        en: 'It is a constant multiplied by the logarithm of n - which constant is used?',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность introsort?',
        en: 'What is the space complexity of introsort?',
      },
      options: [
        { ru: 'O(log n) - под стек рекурсии', en: 'O(log n) - for the recursion stack' },
        { ru: 'O(n) - для вспомогательного массива при слиянии', en: 'O(n) - for an auxiliary array during merging' },
        { ru: 'O(1) - никакой дополнительной памяти не требуется совсем', en: 'O(1) - no extra memory is needed at all' },
        { ru: 'O(n log n) - из-за рекурсивных вызовов с накладными расходами на каждом уровне', en: 'O(n log n) - due to recursive calls with overhead at each level' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort сортирует на месте, но рекурсивный стек quicksort в сбалансированном случае имеет глубину O(log n).',
        en: 'Introsort sorts in place, but the quicksort recursion stack has O(log n) depth in the balanced case.',
      },
      hint: {
        ru: 'Алгоритм in-place, но рекурсия занимает память - какова максимальная глубина стека при сбалансированных разбиениях?',
        en: 'The algorithm is in-place, but recursion uses memory - what is the maximum stack depth under balanced partitions?',
      },
    },
    {
      question: {
        ru: 'Какой из трёх алгоритмов introsort применяет первым при запуске?',
        en: 'Which of the three algorithms does introsort apply first upon starting?',
      },
      options: [
        { ru: 'Quicksort', en: 'Quicksort' },
        { ru: 'Heap sort', en: 'Heap sort' },
        { ru: 'Insertion sort', en: 'Insertion sort' },
        { ru: 'Merge sort', en: 'Merge sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort начинает работу как обычный quicksort и переключается на heap sort или insertion sort только при выполнении соответствующих условий.',
        en: 'Introsort starts as regular quicksort and only switches to heap sort or insertion sort when the respective conditions are met.',
      },
      hint: {
        ru: 'Название «интроспективная» намекает на то, что алгоритм начинает как один хорошо известный метод и лишь затем «смотрит внутрь себя».',
        en: 'The name "introspective" hints that the algorithm starts as one well-known method and only then "looks inward."',
      },
    },
    {
      question: {
        ru: 'Ниже какого размера подмассива introsort переключается на insertion sort?',
        en: 'Below what subarray size does introsort switch to insertion sort?',
      },
      options: [
        { ru: 'Примерно 16 элементов', en: 'Approximately 16 elements' },
        { ru: 'Примерно 1000 элементов', en: 'Approximately 1000 elements' },
        { ru: 'Примерно 2 элемента', en: 'Approximately 2 elements' },
        { ru: 'Примерно 256 элементов', en: 'Approximately 256 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Типичное пороговое значение - около 16 элементов; на таком размере insertion sort обгоняет quicksort за счёт низких накладных расходов.',
        en: 'The typical threshold is around 16 elements; at that size insertion sort outpaces quicksort due to its low overhead.',
      },
      hint: {
        ru: 'Подумайте о небольшом числе, при котором накладные расходы рекурсии quicksort становятся дороже, чем O(n²) алгоритм с маленькими константами.',
        en: 'Think of a small number at which quicksort\'s recursion overhead becomes costlier than an O(n²) algorithm with tiny constants.',
      },
    },
    {
      question: {
        ru: 'Как introsort отличается от Timsort, который тоже является гибридным алгоритмом?',
        en: 'How does introsort differ from Timsort, which is also a hybrid algorithm?',
      },
      options: [
        { ru: 'Introsort неустойчив и in-place, тогда как Timsort устойчив и требует O(n) памяти', en: 'Introsort is unstable and in-place, while Timsort is stable and requires O(n) memory' },
        { ru: 'Introsort использует merge sort вместо heap sort в качестве резервного алгоритма', en: 'Introsort uses merge sort instead of heap sort as its fallback algorithm for deep recursion' },
        { ru: 'Timsort применяется только в C++, тогда как introsort используется исключительно в Python', en: 'Timsort is only used in C++, while introsort is used exclusively in Python' },
        { ru: 'Introsort устойчив, а Timsort - нет, что и является главным практическим различием', en: 'Introsort is stable while Timsort is not, which is the main practical difference' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort (quicksort + heap sort + insertion sort) жертвует устойчивостью ради in-place работы; Timsort (merge sort + insertion sort) сохраняет устойчивость, но использует O(n) памяти.',
        en: 'Introsort (quicksort + heap sort + insertion sort) trades stability for in-place operation; Timsort (merge sort + insertion sort) preserves stability but uses O(n) memory.',
      },
      hint: {
        ru: 'Какое ключевое свойство имеет merge sort, которого нет у quicksort и heap sort?',
        en: 'What key property does merge sort have that quicksort and heap sort lack?',
      },
    },
  ],
};

export const timSort = {
  slug: 'tim-sort',
  category: 'sorting',
  name: { ru: 'Timsort', en: 'Timsort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 3,
  tags: ['hybrid', 'stable', 'comparison', 'adaptive'],

  intent: {
    ru: 'Timsort - гибридный алгоритм, объединяющий сортировку вставками для маленьких «прогонов» (run) и сортировку слиянием для их объединения, специально настроенный на реальные данные, которые часто содержат уже отсортированные участки.',
    en: 'Timsort is a hybrid algorithm combining insertion sort for small "runs" with merge sort for combining them, specifically tuned for real-world data that often contains already-sorted stretches.',
  },

  problem: {
    ru: 'Сортировка слиянием даёт гарантию O(n log n), но игнорирует структуру реальных данных: логи, отсортированные по времени с редкими вставками, частично обработанные списки - всё это содержит длинные уже отсортированные участки. Сортировка вставками эффективна на маленьких и почти отсортированных массивах, но деградирует до O(n²) на больших случайных данных. Нужен алгоритм, который использует сильные стороны обоих подходов и адаптируется к реальному, а не худшему случаю.',
    en: 'Merge sort guarantees O(n log n) but ignores the structure of real-world data: time-ordered logs with occasional inserts, partially processed lists - these all contain long already-sorted stretches. Insertion sort is efficient on small and nearly sorted arrays but degrades to O(n²) on large random data. What is needed is an algorithm that combines the strengths of both and adapts to the real case, not just the worst case.',
  },

  solution: {
    ru: 'Массив делится на небольшие блоки - «прогоны» (run) фиксированного размера (обычно 32-64 элемента, minrun). Каждый прогон сортируется сортировкой вставками - на таком маленьком размере она быстрее из-за низких констант. Затем отсортированные прогоны сливаются попарно тем же механизмом слияния, что и в merge sort, пока не останется один отсортированный массив. Если во входных данных уже встречаются естественные отсортированные участки длиннее minrun, Timsort использует их напрямую как готовые прогоны, экономя работу.',
    en: 'The array is divided into small fixed-size blocks - "runs" (typically 32-64 elements, minrun). Each run is sorted with insertion sort - at that small size it is faster due to low constant factors. The sorted runs are then merged pairwise using the same merge mechanism as merge sort, until one sorted array remains. If the input already contains natural sorted stretches longer than minrun, Timsort uses them directly as ready-made runs, saving work.',
  },

  steps: [
    {
      title: { ru: 'Разбить на прогоны', en: 'Split into runs' },
      explanation: {
        ru: 'Разделить массив на блоки фиксированного размера minrun (например, 32 элемента).',
        en: 'Divide the array into fixed-size blocks of minrun (e.g. 32 elements).',
      },
    },
    {
      title: { ru: 'Отсортировать каждый прогон', en: 'Sort each run' },
      explanation: {
        ru: 'Применить сортировку вставками к каждому прогону отдельно - на таком размере она эффективнее сложных алгоритмов.',
        en: 'Apply insertion sort to each run individually - at this size it outperforms more complex algorithms.',
      },
    },
    {
      title: { ru: 'Слить соседние прогоны', en: 'Merge adjacent runs' },
      explanation: {
        ru: 'Слить пары соседних отсортированных прогонов тем же способом, что и в сортировке слиянием.',
        en: 'Merge pairs of adjacent sorted runs the same way merge sort does.',
      },
    },
    {
      title: { ru: 'Удваивать размер слитых блоков', en: 'Double the merged block size' },
      explanation: {
        ru: 'После каждого раунда слияния размер отсортированных блоков удваивается - повторять, пока блоков больше одного.',
        en: 'After each merge round, the size of sorted blocks doubles - repeat while more than one block remains.',
      },
    },
    {
      title: { ru: 'Получить единый отсортированный массив', en: 'Obtain the final sorted array' },
      explanation: {
        ru: 'Когда остаётся один блок размером со весь массив, он и есть результат сортировки.',
        en: 'When a single block spanning the whole array remains, it is the sorted result.',
      },
    },
  ],
  stepBreakpoints: [2, 8, 26, 40],

  implementation: {
    javascript: `const MIN_RUN = 32;

function insertionSortRange(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
}

function merge(arr, left, mid, right) {
  const leftPart = arr.slice(left, mid + 1);
  const rightPart = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] <= rightPart[j]) arr[k++] = leftPart[i++];
    else arr[k++] = rightPart[j++];
  }
  while (i < leftPart.length) arr[k++] = leftPart[i++];
  while (j < rightPart.length) arr[k++] = rightPart[j++];
}

function timSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let start = 0; start < n; start += MIN_RUN) {
    const end = Math.min(start + MIN_RUN - 1, n - 1);
    insertionSortRange(a, start, end);
  }

  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += size * 2) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + size * 2 - 1, n - 1);
      if (mid < right) merge(a, left, mid, right);
    }
  }

  return a;
}`,
    python: `MIN_RUN = 32


def insertion_sort_range(arr, left, right):
    for i in range(left + 1, right + 1):
        current = arr[i]
        j = i - 1
        while j >= left and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = current


def merge(arr, left, mid, right):
    left_part = arr[left:mid + 1]
    right_part = arr[mid + 1:right + 1]
    i = j = 0
    k = left

    while i < len(left_part) and j < len(right_part):
        if left_part[i] <= right_part[j]:
            arr[k] = left_part[i]
            i += 1
        else:
            arr[k] = right_part[j]
            j += 1
        k += 1

    while i < len(left_part):
        arr[k] = left_part[i]
        i += 1
        k += 1
    while j < len(right_part):
        arr[k] = right_part[j]
        j += 1
        k += 1


def tim_sort(arr):
    a = arr.copy()
    n = len(a)

    for start in range(0, n, MIN_RUN):
        end = min(start + MIN_RUN - 1, n - 1)
        insertion_sort_range(a, start, end)

    size = MIN_RUN
    while size < n:
        for left in range(0, n, size * 2):
            mid = min(left + size - 1, n - 1)
            right = min(left + size * 2 - 1, n - 1)
            if mid < right:
                merge(a, left, mid, right)
        size *= 2

    return a`,
  },

  pros: [
    {
      ru: 'Адаптивен: на частично отсортированных данных приближается к O(n), используя существующие прогоны напрямую.',
      en: 'Adaptive: approaches O(n) on partially sorted data by using existing runs directly.',
    },
    {
      ru: 'Устойчив - как и merge sort, сохраняет относительный порядок равных элементов, что важно при сортировке объектов.',
      en: 'Stable - like merge sort, preserves the relative order of equal elements, important when sorting objects.',
    },
    {
      ru: 'На маленьких прогонах использует сортировку вставками, избегая накладных расходов рекурсии на низком уровне.',
      en: 'Uses insertion sort on small runs, avoiding recursion overhead at the low level.',
    },
    {
      ru: 'Проверенная в промышленных условиях реализация - стандартная сортировка в Python и Java уже больше десяти лет.',
      en: 'Battle-tested in production - the default sort in Python and Java for over a decade.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти для временных массивов при слиянии, как и обычный merge sort.',
      en: 'Needs O(n) extra memory for temporary arrays during merging, same as regular merge sort.',
    },
    {
      ru: 'Сложнее в реализации и отладке, чем любой из алгоритмов, из которых он состоит по отдельности.',
      en: 'More complex to implement and debug than either of the algorithms it is built from individually.',
    },
    {
      ru: 'На полностью случайных данных без структуры не даёт заметного выигрыша перед обычным merge sort.',
      en: 'On fully random data with no structure, offers no meaningful advantage over plain merge sort.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортируются реальные данные, которые часто частично упорядочены (логи, истории изменений, повторные сортировки).',
      en: 'When sorting real-world data that is often partially ordered (logs, change histories, repeated sorts).',
    },
    {
      ru: 'Когда нужна и устойчивость, и хорошая производительность на типичных, а не только на худших входных данных.',
      en: 'When both stability and good performance on typical (not just worst-case) input are required.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Python** использует Timsort как реализацию встроенных `sorted()` и `list.sort()` с 2002 года.',
      en: '**Python** has used Timsort to implement the built-in `sorted()` and `list.sort()` since 2002.',
    },
    {
      ru: '**Java** использует Timsort в `Collections.sort()` и `Arrays.sort()` для массивов объектов (не примитивов).',
      en: '**Java** uses Timsort in `Collections.sort()` and `Arrays.sort()` for arrays of objects (not primitives).',
    },
  ],

  relatedAlgorithms: ['merge-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Из каких двух алгоритмов состоит Timsort?',
        en: 'Which two algorithms is Timsort built from?',
      },
      options: [
        {
          ru: 'Сортировка вставками (для прогонов) и сортировка слиянием (для их объединения)',
          en: 'Insertion sort (for runs) and merge sort (for combining them)',
        },
        {
          ru: 'Быстрая сортировка для прогонов и пирамидальная сортировка для их окончательного слияния',
          en: 'Quicksort for the runs and heap sort for their final combination step',
        },
        {
          ru: 'Сортировка пузырьком для маленьких прогонов и сортировка подсчётом для их объединения',
          en: 'Bubble sort for small runs and counting sort for combining them together',
        },
        {
          ru: 'Только классическая сортировка слиянием без каких-либо модификаций или гибридизации',
          en: 'Just classic merge sort, completely unmodified and without any hybridization at all',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Timsort сортирует маленькие прогоны сортировкой вставками, а затем сливает их механизмом слияния, идентичным merge sort.',
        en: 'Timsort sorts small runs with insertion sort, then merges them using a mechanism identical to merge sort.',
      },
      hint: {
        ru: 'Один компонент эффективен на маленьких данных, другой - при объединении уже отсортированных частей.',
        en: 'One component excels on small data, the other at combining already-sorted pieces.',
      },
    },
    {
      question: {
        ru: 'Почему для сортировки маленьких прогонов используется именно сортировка вставками, а не рекурсивный merge sort?',
        en: 'Why is insertion sort specifically used to sort small runs instead of recursive merge sort?',
      },
      options: [
        {
          ru: 'На маленьких размерах низкие константные накладные расходы вставками делают её быстрее асимптотически лучших алгоритмов',
          en: 'At small sizes, insertion sort\'s low constant overhead makes it faster than asymptotically superior algorithms',
        },
        {
          ru: 'Потому что сортировка вставками, вопреки распространённому мнению большинства программистов, на самом деле работает за O(log n)',
          en: 'Because insertion sort, contrary to what most programmers commonly believe, actually runs in O(log n) time overall',
        },
        {
          ru: 'Сортировка слиянием технически принципиально не умеет обрабатывать маленькие массивы вообще',
          en: 'Merge sort is technically and fundamentally incapable of handling small arrays at all',
        },
        {
          ru: 'Это чисто исторический выбор разработчиков языка без какой-либо реальной технической причины позади него',
          en: "It is a purely historical choice made by the language's developers with no real technical reason behind it",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На массивах размером ~32-64 элемента O(n²) сортировки вставками на практике быстрее, чем рекурсия merge sort из-за меньшего числа операций и лучшей локальности данных.',
        en: 'On arrays of ~32-64 elements, insertion sort\'s O(n²) is faster in practice than merge sort\'s recursion, due to fewer operations and better data locality.',
      },
      hint: {
        ru: 'Асимптотика важна при больших n, но на 32 элементах константы при O(n²) могут быть меньше, чем при O(n log n).',
        en: 'Asymptotics matter for large n, but on 32 elements the constants of O(n²) can beat those of O(n log n).',
      },
    },
    {
      question: {
        ru: 'Что делает Timsort «адаптивным» алгоритмом?',
        en: 'What makes Timsort an "adaptive" algorithm?',
      },
      options: [
        {
          ru: 'Он распознаёт уже существующие отсортированные участки во входных данных и использует их напрямую как готовые прогоны',
          en: 'It detects already-sorted stretches in the input data and uses them directly as ready-made runs',
        },
        {
          ru: 'Он способен каким-то загадочным образом менять сам язык программирования, на котором написан, прямо во время выполнения программы',
          en: 'It is somehow able to change the very programming language it was written in, dynamically at runtime while executing',
        },
        {
          ru: 'Он всегда работает строго за линейное время O(n) для абсолютно любых входных данных без единого исключения',
          en: 'It always runs in strictly linear O(n) time for absolutely any input data whatsoever, with no exceptions',
        },
        {
          ru: 'Он случайным образом выбирает один из нескольких совершенно разных алгоритмов сортировки на каждом отдельном запуске',
          en: 'It randomly picks one of several completely different sorting algorithms to use on every single separate run',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Если входной массив уже содержит длинный отсортированный (или обратно отсортированный) участок, Timsort использует его как прогон вместо принудительного разбиения на фиксированные блоки.',
        en: 'If the input array already contains a long sorted (or reverse-sorted) stretch, Timsort uses it as a run instead of forcibly splitting into fixed blocks.',
      },
      hint: {
        ru: 'Подумайте, как Timsort ведёт себя иначе на данных с уже упорядоченными участками по сравнению с обычным merge sort.',
        en: 'Think about how Timsort behaves differently on data with already-ordered stretches compared to plain merge sort.',
      },
    },
    {
      question: {
        ru: 'Какую гарантию сохраняет Timsort от своего merge-компонента?',
        en: 'What guarantee does Timsort retain from its merge component?',
      },
      options: [
        { ru: 'Устойчивость - равные элементы сохраняют относительный порядок', en: 'Stability - equal elements keep their original relative order' },
        {
          ru: 'Сортировку строго на месте, требующую всего O(1) дополнительной памяти',
          en: 'Strictly in-place sorting that requires only O(1) extra memory to run',
        },
        {
          ru: 'Полное отсутствие каких-либо сравнений элементов друг с другом вообще',
          en: 'A complete absence of any comparisons between elements whatsoever',
        },
        {
          ru: 'Возможность работать исключительно с целыми числами, а не с объектами',
          en: 'The ability to work exclusively with integers, rather than with objects',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и обычный merge sort, слияние в Timsort берёт элемент из левого прогона при равенстве - это сохраняет устойчивость всего алгоритма.',
        en: 'Like regular merge sort, Timsort\'s merge step takes the element from the left run on ties - this preserves stability across the whole algorithm.',
      },
      hint: {
        ru: 'Merge sort устойчив благодаря тому, как он обрабатывает равные элементы при слиянии - Timsort наследует это свойство.',
        en: 'Merge sort is stable due to how it handles equal elements during merging - Timsort inherits this property.',
      },
    },
    {
      question: {
        ru: 'Почему именно Python и Java выбрали Timsort как сортировку по умолчанию для объектов?',
        en: 'Why did Python and Java specifically choose Timsort as the default sort for objects?',
      },
      options: [
        {
          ru: 'Реальные данные приложений часто частично упорядочены, а устойчивость критична при сортировке объектов по полям',
          en: 'Real application data is often partially ordered, and stability is critical when sorting objects by fields',
        },
        {
          ru: 'Timsort считается самым простым из всех известных алгоритмов сортировки для практической реализации с нуля',
          en: 'Timsort is widely considered the simplest of all known sorting algorithms to implement from scratch in practice',
        },
        {
          ru: 'Timsort требует меньше всего дополнительной памяти среди абсолютно всех существующих алгоритмов сортировки без исключения',
          en: 'Timsort requires the least extra memory among absolutely all existing sorting algorithms without exception',
        },
        {
          ru: 'Это было полностью произвольное решение разработчиков языка, принятое без какого-либо предварительного анализа или тестирования',
          en: "It was a completely arbitrary decision made by the language's developers without any prior analysis or testing",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Для языков общего назначения важны и типичная производительность на реальных, часто частично упорядоченных данных, и устойчивость при сортировке сложных объектов - Timsort даёт оба свойства.',
        en: 'General-purpose languages need both typical performance on real, often partially-ordered data and stability when sorting complex objects - Timsort provides both.',
      },
      hint: {
        ru: 'Что важно при сортировке объектов (например, записей таблицы) по нескольким полям последовательно?',
        en: 'What matters when sorting objects (e.g., table rows) by multiple fields in sequence?',
      },
    },
    {
      question: {
        ru: 'Каков типичный размер прогона (minrun) в Timsort и почему именно такой?',
        en: 'What is the typical run size (minrun) in Timsort and why that value?',
      },
      options: [
        { ru: '32-64 элемента: вставки тут быстрее из-за малых констант', en: '32-64 elements - the range where insertion sort wins on constant factors' },
        { ru: '2 элемента - минимально возможная единица для слияния пар', en: '2 elements - the smallest possible unit for pairwise merging' },
        { ru: '1000 элементов - достаточно большой блок, чтобы избежать рекурсии', en: '1000 elements - large enough to avoid recursion altogether' },
        { ru: 'Всегда n/2 - ровно половина массива, как в классическом merge sort', en: 'Always n/2 - exactly half the array, just like classic merge sort in all cases' },
      ],
      correct: 0,
      explanation: {
        ru: 'В диапазоне 32-64 сортировка вставками на практике обгоняет merge sort благодаря лучшей локальности кэша и меньшим константным расходам на рекурсию.',
        en: 'In the 32-64 range, insertion sort beats merge sort in practice thanks to better cache locality and lower constant overhead from recursion.',
      },
      hint: {
        ru: 'Оптимальный размер прогона - это баланс между тем, когда сортировка вставками перестаёт быть быстрой, и тем, когда merge sort ещё слишком дорог.',
        en: 'The optimal run size is the balance point where insertion sort stops being fast and merge sort is still too costly.',
      },
    },
    {
      question: {
        ru: 'Что происходит с обратно отсортированными прогонами при обнаружении в Timsort?',
        en: 'What happens to descending runs when Timsort encounters them?',
      },
      options: [
        { ru: 'Они разворачиваются на месте, превращаясь в возрастающие прогоны', en: 'They are reversed in place, turning them into ascending runs' },
        { ru: 'Они игнорируются и сортируются с нуля сортировкой вставками', en: 'They are ignored and sorted from scratch with insertion sort' },
        { ru: 'Они удаляются из массива и добавляются в конец', en: 'They are removed from the array and appended to the end' },
        { ru: 'Они вызывают переключение на быструю сортировку для данного блока', en: 'They trigger a switch to quicksort for that block' },
      ],
      correct: 0,
      explanation: {
        ru: 'Timsort распознаёт строго убывающие прогоны и разворачивает их за O(k), получая готовый возрастающий прогон без лишней работы.',
        en: 'Timsort detects strictly descending runs and reverses them in O(k), obtaining a ready ascending run without extra work.',
      },
      hint: {
        ru: 'Обратная последовательность уже «почти отсортирована» - как можно использовать её без повторной сортировки?',
        en: 'A descending sequence is already "almost sorted" - how can it be used without re-sorting?',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность Timsort?',
        en: 'What is the space complexity of Timsort?',
      },
      options: [
        { ru: 'O(n) - буферы при слиянии занимают линейную память', en: 'O(n) - merge buffers occupy linear extra memory' },
        { ru: 'O(1) - Timsort сортирует полностью на месте', en: 'O(1) - Timsort sorts entirely in place' },
        { ru: 'O(log n) - только стек вызовов без дополнительных массивов', en: 'O(log n) - only the call stack without extra arrays' },
        { ru: 'O(n²) - каждый прогон создаёт копию всего массива', en: 'O(n²) - each run creates a copy of the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Слияние двух прогонов в Timsort требует временного буфера размером с меньший из них - в худшем случае O(n).',
        en: 'Merging two runs in Timsort requires a temporary buffer the size of the smaller run - O(n) in the worst case.',
      },
      hint: {
        ru: 'Вспомните, как выглядит слияние двух отсортированных массивов с точки зрения памяти.',
        en: 'Recall what merging two sorted arrays looks like from a memory perspective.',
      },
    },
    {
      question: {
        ru: 'Даёт ли Timsort гарантированный O(n log n) в худшем случае?',
        en: 'Does Timsort guarantee O(n log n) in the worst case?',
      },
      options: [
        { ru: 'Да - даже на случайных данных Timsort не деградирует хуже O(n log n)', en: 'Yes - even on random data Timsort does not degrade worse than O(n log n)' },
        { ru: 'Нет - на случайных данных возможно O(n²) из-за большого числа коротких прогонов', en: 'No - on random data O(n²) is possible due to a large number of short runs' },
        { ru: 'Да, но только на отсортированных данных; на случайных гарантии нет', en: 'Yes, but only on sorted data; there\'s no guarantee on random data' },
        { ru: 'Нет - в худшем случае Timsort вырождается до O(n³)', en: 'No - in the worst case Timsort degenerates to O(n³)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Гарантия O(n log n) в худшем случае достигается за счёт механизма слияния прогонов - даже при коротких прогонах слияние выполняется за логарифмическое число раундов.',
        en: 'The O(n log n) worst-case guarantee comes from the run-merging mechanism - even with short runs, merging takes a logarithmic number of rounds.',
      },
      hint: {
        ru: 'Компонент merge sort в Timsort отвечает за гарантию - а merge sort всегда работает за O(n log n).',
        en: 'The merge sort component in Timsort provides the guarantee - and merge sort always runs in O(n log n).',
      },
    },
    {
      question: {
        ru: 'Как изменяется производительность Timsort при сортировке уже полностью отсортированного массива?',
        en: 'How does Timsort\'s performance change when sorting an already fully sorted array?',
      },
      options: [
        { ru: 'Деградирует до O(n) - весь массив распознаётся как один прогон', en: 'Improves to O(n) - the whole array is detected as one run' },
        { ru: 'Остаётся O(n log n) - алгоритм не способен использовать готовый порядок', en: 'Stays O(n log n) - the algorithm cannot exploit existing order' },
        { ru: 'Деградирует до O(n²) - слияние одного прогона с пустым результатом дорогостоящее', en: 'Degrades to O(n²) - merging one run with an empty result is costly' },
        { ru: 'Ухудшается до O(n³) из-за повторных сравнений внутри прогона', en: 'Worsens to O(n³) due to repeated comparisons inside the run' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если массив уже отсортирован, Timsort распознаёт его как один естественный прогон и не делает ни одного лишнего обмена - сложность O(n).',
        en: 'If the array is already sorted, Timsort recognizes it as one natural run and makes no unnecessary swaps - complexity O(n).',
      },
      hint: {
        ru: 'Это тот же лучший случай, что и у adaptive-сортировок: что происходит, когда данные уже упорядочены?',
        en: 'This is the same best case as adaptive sorts: what happens when the data is already in order?',
      },
    },
  ],
};

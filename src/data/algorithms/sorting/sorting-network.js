export const sortingNetwork = {
  slug: 'sorting-network',
  category: 'sorting',
  name: { ru: "Sorting Network (Batcher's)", en: "Sorting Network (Batcher's)" },
  complexity: {
    time: { best: 'O(n log² n)', average: 'O(n log² n)', worst: 'O(n log² n)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['comparison', 'sorting-network', 'parallelizable', 'divide-and-conquer'],

  intent: {
    ru: 'Нечётно-чётная сортировка слиянием Батчера строит сортирующую сеть - фиксированную, заранее известную последовательность операций «сравнить и при необходимости поменять местами» - но, в отличие от битонической сортировки, использует другую схему слияния двух уже отсортированных половин, основанную на разделении элементов по чётности их позиции.',
    en: "Batcher's odd-even mergesort builds a sorting network - a fixed, known-in-advance sequence of \"compare and swap if needed\" operations - but, unlike bitonic sort, uses a different scheme for merging two already-sorted halves, based on splitting elements by the parity of their position.",
  },

  problem: {
    ru: 'Обычное слияние двух отсортированных последовательностей (как в сортировке слиянием) требует последовательного продвижения двух указателей и решения на каждом шаге, откуда брать следующий элемент, - а это, опять же, зависимость от данных, которая плохо ложится на параллельное или аппаратное исполнение. Нужна схема слияния, которая, как и в битонической сортировке, задаётся заранее фиксированным набором сравнений, но использует другую, зачастую более компактную комбинаторную структуру.',
    en: 'Ordinary merging of two sorted sequences (as in merge sort) requires advancing two pointers sequentially and deciding at each step where to take the next element from - again a data dependency that maps poorly onto parallel or hardware execution. What is needed is a merge scheme that, like bitonic sort, is defined by a fixed set of comparisons known in advance, but uses a different, often more compact combinatorial structure.',
  },

  solution: {
    ru: 'Массив рекурсивно делится пополам, каждая половина сортируется той же сетью, а затем две отсортированные половины сливаются «нечётно-чётным слиянием»: сначала отдельно и рекурсивно сливаются элементы, стоящие на чётных позициях, и элементы на нечётных позициях каждой половины, а затем один финальный проход сравнений между соседними элементами (i, i+1) исправляет оставшиеся немногочисленные нарушения порядка. Такое разбиение по чётности и есть источник названия «нечётно-чётное слияние», а весь набор сравнений полностью фиксирован и известен ещё до начала выполнения.',
    en: "The array is recursively split in half, each half is sorted by the same network, and then the two sorted halves are combined via \"odd-even merge\": the elements at even positions and the elements at odd positions of each half are separately and recursively merged first, and then one final pass of comparisons between neighboring elements (i, i+1) fixes the few remaining order violations. This split by parity is where the name \"odd-even merge\" comes from, and the entire set of comparisons is completely fixed and known before execution even starts.",
  },

  details: {
    deepDive: [
      {
        ru: 'В коде параметр `r` функции `oddEvenMerge` - это не индекс, а **шаг (расстояние) между сравниваемыми элементами**: на входе в рекурсию `r = 1` (сравниваются соседи), а на каждом уровне рекурсии он удваивается (`m = r * 2`). Это отражает саму суть нечётно-чётного слияния - сначала объединяются элементы, отстоящие друг от друга на 1 позицию (условно «нечётные» и «чётные» подпоследовательности), затем на 2, затем на 4 и так далее, пока шаг не станет достаточно большим, чтобы одного сравнения хватило.',
        en: 'In the code, the `r` parameter of `oddEvenMerge` is not an index but the **stride (distance) between compared elements**: recursion starts with `r = 1` (neighbors are compared), and it doubles at every recursion level (`m = r * 2`). This mirrors the essence of odd-even merge - elements one position apart (the "odd" and "even" subsequences, loosely speaking) are merged first, then elements two apart, then four, and so on, until the stride is large enough that a single comparison suffices.',
      },
      {
        ru: 'База рекурсии - строки 22-23 (JS) - срабатывает, когда `m >= len`: дальше дробить нечётно-чётным разбиением уже некуда, и функция просто сравнивает и при необходимости меняет местами единственную оставшуюся пару `a[lo]`/`a[lo + r]`. Рекурсивный случай (строки 16-21) сначала рекурсивно сливает «чётную» подпоследовательность (`oddEvenMerge(lo, len, m)`) и «нечётную» (`oddEvenMerge(lo + r, len, m)`), а затем один проход `for` (строка 19) сравнивает пары с шагом `r` между уже слитыми подпоследовательностями - это и есть тот самый «финальный проход», исправляющий оставшиеся нарушения.',
        en: 'The recursion base case - lines 22-23 (JS) - fires when `m >= len`: there is nowhere further to split by parity, so the function simply compares and, if needed, swaps the one remaining pair `a[lo]`/`a[lo + r]`. The recursive case (lines 16-21) first recursively merges the "even" subsequence (`oddEvenMerge(lo, len, m)`) and the "odd" one (`oddEvenMerge(lo + r, len, m)`), then a single `for` pass (line 19) compares pairs at stride `r` between the already-merged subsequences - this is exactly the "final pass" that fixes remaining violations.',
      },
      {
        ru: 'Сравним с битонической сортировкой: та строит **битоническую последовательность** (сначала возрастающую, потом убывающую) и «расчёсывает» её половинным сравнением элементов, отстоящих на n/2. Сеть Батчера действует иначе - она **не требует битонической формы** входа вообще, а полагается на то, что обе половины уже монотонно отсортированы обычным (не битоническим) образом, и просто аккуратно чередует слияние по чётности и коррекцию соседей.',
        en: "Compare with bitonic sort: it builds a **bitonic sequence** (ascending then descending) and 'combs' it by comparing elements n/2 apart. Batcher's network works differently - it doesn't require a bitonic input shape at all, relying instead on both halves already being sorted the ordinary (non-bitonic) way, and simply interleaves parity-based merging with neighbor correction.",
      },
      {
        ru: 'Пример на n = 4: пусть обе половины `[1, 3]` и `[2, 4]` уже отсортированы. Нечётно-чётное слияние сравнивает чётные позиции (`1` и `2` → без обмена) и нечётные (`3` и `4` → без обмена) отдельно, затем финальный проход сравнивает соседей `3` и `2` (индексы 1 и 2 объединённого массива `[1, 3, 2, 4]`) и меняет их местами - результат `[1, 2, 3, 4]`. Всего на этом уровне потребовалось 3 сравнения вместо 6 у наивного попарного сравнения всех элементов.',
        en: 'Example with n = 4: say both halves `[1, 3]` and `[2, 4]` are already sorted. Odd-even merge compares even positions (`1` and `2` → no swap) and odd positions (`3` and `4` → no swap) separately, then a final pass compares neighbors `3` and `2` (indices 1 and 2 of the combined `[1, 3, 2, 4]`) and swaps them - result `[1, 2, 3, 4]`. That level took 3 comparisons total instead of 6 for a naive pairwise comparison of every element.',
      },
      {
        ru: 'Глубина сети - **O(log² n)** уровней, тот же порядок, что и у битонической сортировки: `oddEvenMergeSort` (строки 27-34) даёт log n уровней разбиения пополам, а каждый вызов `oddEvenMerge` на своём уровне сам рекурсивно углубляется ещё на log n шагов через удвоение `r`. При n = 1 000 000: log₂(1 000 000) ≈ 20, значит глубина сети около 20 × 20 = 400 уровней сравнений - большая, но фиксированная и предсказуемая величина, не зависящая от порядка входных данных.',
        en: 'The network depth is **O(log² n)** levels, the same order as bitonic sort: `oddEvenMergeSort` (lines 27-34) gives log n levels of halving, and each `oddEvenMerge` call at its level recurses another log n steps deep by doubling `r`. At n = 1,000,000: log₂(1,000,000) ≈ 20, so the network depth is roughly 20 × 20 = 400 comparison levels - large but fixed and predictable, independent of the input\'s order.',
      },
      {
        ru: 'Как и в битонической сортировке, массив дополняется до ближайшей степени двойки «часовыми» (`sentinel`, строка 7 JS) - значением заведомо больше любого элемента входа, - потому что рекурсивное деление пополам с сохранением инварианта чётности требует одинаковой длины на каждом уровне. После завершения сети дополнение просто отбрасывается (`a.slice(0, n)`, строка 37).',
        en: 'Just like bitonic sort, the array is padded to the nearest power of two with sentinels (`sentinel`, line 7 in JS) - a value guaranteed larger than any input element - because recursive halving that preserves the parity invariant requires equal length at every level. Once the network finishes, the padding is simply dropped (`a.slice(0, n)`, line 37).',
      },
      {
        ru: 'Сеть Батчера появилась в **той же статье 1968 года Кеннета Батчера** «Sorting Networks and Their Applications», что и битоническая сортировка - обе конструкции решали одну задачу (сортировка на параллельном оборудовании без зависимости от данных), но с разными компромиссами по числу компараторов и простоте построения индексов.',
        en: "Batcher's network appeared in the **same 1968 paper by Kenneth Batcher**, \"Sorting Networks and Their Applications,\" that introduced bitonic sort - both constructions solved the same problem (data-independent sorting on parallel hardware) with different trade-offs between comparator count and index-construction simplicity.",
      },
    ],
    whenToUse: [
      {
        ru: '**Та же ниша, что и битоническая сортировка** - параллельное и аппаратное исполнение (FPGA/ASIC, SIMD), где важна статическая, известная заранее последовательность сравнений, но с чуть меньшим числом компараторов при том же O(n log² n).',
        en: '**The same niche as bitonic sort** - parallel and hardware execution (FPGA/ASIC, SIMD) where a static, known-in-advance comparison sequence matters, but with a slightly lower comparator count at the same O(n log² n).',
      },
      {
        ru: '**Проектирование коммутационных сетей** (switching networks) - структура нечётно-чётного слияния близка к схемам маршрутизации с предсказуемой задержкой, используемым в сетевом оборудовании.',
        en: '**Switching network design** - the odd-even merge structure is close to the predictable-latency routing schemes used in networking hardware.',
      },
      {
        ru: 'Не подходит, если важно **общее число сравнений на последовательном процессоре** - обычная сортировка слиянием с её O(n log n) и адаптивным числом сравнений выигрывает у фиксированной сети O(n log² n).',
        en: "Not a fit when the **total comparison count on a sequential processor** matters - ordinary merge sort with its O(n log n) and data-adaptive comparison count beats the fixed O(n log² n) network.",
      },
      {
        ru: 'Стоит выбрать сеть Батчера вместо битонической, когда **число физических компараторов - ограниченный ресурс** (площадь кристалла в ASIC), поскольку она использует их меньше при той же глубине.',
        en: "Prefer Batcher's network over bitonic when **the number of physical comparators is the scarce resource** (die area in an ASIC), since it uses fewer of them at the same depth.",
      },
      {
        ru: 'Как **вторая точка сравнения** при изучении сортирующих сетей - показывает, что задача «зафиксировать сеть сравнений заранее» решается не единственным способом, а целым семейством конструкций с разными компромиссами.',
        en: 'As a **second comparison point** when studying sorting networks - it shows that "fix the comparison network in advance" isn\'t solved one way, but by a whole family of constructions with different trade-offs.',
      },
    ],
    realWorld: [
      {
        ru: '**Кеннет Батчер, 1968** - статья "Sorting Networks and Their Applications" (AFIPS Spring Joint Computer Conference), где одновременно представлены и битоническая сортировка, и нечётно-чётная сеть слияния.',
        en: '**Kenneth Batcher, 1968** - "Sorting Networks and Their Applications" (AFIPS Spring Joint Computer Conference), which introduced both bitonic sort and the odd-even merge network at once.',
      },
      {
        ru: '**Учебники по параллельным алгоритмам** (например, "Introduction to Parallel Computing" Grama et al.) разбирают сеть Батчера как канонический пример сети слияния с меньшим числом компараторов, чем у битонической.',
        en: '**Parallel algorithms textbooks** (e.g. Grama et al., "Introduction to Parallel Computing") cover Batcher\'s network as the canonical example of a merge network with fewer comparators than the bitonic one.',
      },
      {
        ru: '**Модули аппаратной сортировки на FPGA** (часто в конвейерах обработки сетевых пакетов и баз данных на кристалле) реализуют именно нечётно-чётные сети слияния ради экономии логических элементов.',
        en: '**FPGA hardware sorting modules** (often in network-packet-processing and in-database pipelines) implement odd-even merge networks specifically to save logic elements.',
      },
      {
        ru: '**Курсы по проектированию цифровых схем** используют сеть Батчера как пример компромисса между глубиной схемы (задержкой) и площадью (числом компараторов) - классическая задача синтеза аппаратуры.',
        en: '**Digital circuit design courses** use Batcher\'s network as an example of the depth-versus-area (latency-versus-comparator-count) trade-off - a classic hardware synthesis problem.',
      },
    ],
  },

  steps: [
    {
      title: { ru: 'Разделить пополам', en: 'Split in half' },
      explanation: {
        ru: 'Рекурсивно разделить массив на две половины и отсортировать каждую той же сетью.',
        en: 'Recursively split the array into two halves and sort each with the same network.',
      },
    },
    {
      title: { ru: 'Слить чётные позиции', en: 'Merge the even positions' },
      explanation: {
        ru: 'Рекурсивно слить элементы, стоящие на чётных позициях обеих половин.',
        en: 'Recursively merge the elements at even positions from both halves.',
      },
    },
    {
      title: { ru: 'Слить нечётные позиции', en: 'Merge the odd positions' },
      explanation: {
        ru: 'Рекурсивно слить элементы, стоящие на нечётных позициях обеих половин.',
        en: 'Recursively merge the elements at odd positions from both halves.',
      },
    },
    {
      title: { ru: 'Финальный проход сравнений', en: 'Final comparison pass' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами каждую соседнюю пару (i, i+1) - это исправляет немногочисленные оставшиеся нарушения порядка.',
        en: 'Compare and, if needed, swap every neighboring pair (i, i+1) - this fixes the few remaining order violations.',
      },
    },
    {
      title: { ru: 'Отбросить дополнение', en: 'Drop the padding' },
      explanation: {
        ru: 'После завершения сети сравнений отбросить фиктивные элементы дополнения - оставшиеся элементы отсортированы.',
        en: 'Once the comparison network finishes, drop the sentinel padding elements - the remaining elements are sorted.',
      },
    },
  ],
  stepBreakpoints: [2, 25, 49, 69],

  implementation: {
    javascript: `function sortingNetwork(arr) {
  const n = arr.length;
  if (n <= 1) return [...arr];

  let size = 1;
  while (size < n) size *= 2;
  const sentinel = Math.max(...arr) + 1;
  const a = [...arr, ...new Array(size - n).fill(sentinel)];

  function compareExchange(i, j) {
    if (a[i] > a[j]) [a[i], a[j]] = [a[j], a[i]];
  }

  function oddEvenMerge(lo, len, r) {
    const m = r * 2;
    if (m < len) {
      oddEvenMerge(lo, len, m);
      oddEvenMerge(lo + r, len, m);
      for (let i = lo + r; i + r < lo + len; i += m) {
        compareExchange(i, i + r);
      }
    } else {
      compareExchange(lo, lo + r);
    }
  }

  function oddEvenMergeSort(lo, len) {
    if (len > 1) {
      const m = Math.floor(len / 2);
      oddEvenMergeSort(lo, m);
      oddEvenMergeSort(lo + m, len - m);
      oddEvenMerge(lo, len, 1);
    }
  }

  oddEvenMergeSort(0, size);
  return a.slice(0, n);
}`,
    python: `def sorting_network(arr):
    n = len(arr)
    if n <= 1:
        return list(arr)

    size = 1
    while size < n:
        size *= 2
    sentinel = max(arr) + 1
    a = list(arr) + [sentinel] * (size - n)

    def compare_exchange(i, j):
        if a[i] > a[j]:
            a[i], a[j] = a[j], a[i]

    def odd_even_merge(lo, length, r):
        m = r * 2
        if m < length:
            odd_even_merge(lo, length, m)
            odd_even_merge(lo + r, length, m)
            i = lo + r
            while i + r < lo + length:
                compare_exchange(i, i + r)
                i += m
        else:
            compare_exchange(lo, lo + r)

    def odd_even_merge_sort(lo, length):
        if length > 1:
            m = length // 2
            odd_even_merge_sort(lo, m)
            odd_even_merge_sort(lo + m, length - m)
            odd_even_merge(lo, length, 1)

    odd_even_merge_sort(0, size)
    return a[:n]`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 3],
        title: { ru: 'Тривиальный случай', en: 'Trivial case' },
        explanation: {
          ru: 'Массив из 0 или 1 элемента уже отсортирован - копия возвращается сразу без построения сети.',
          en: 'An array of 0 or 1 elements is already sorted - a copy is returned immediately with no network built.',
        },
      },
      {
        lines: [5, 8],
        title: { ru: 'Дополнение до степени двойки', en: 'Padding to a power of two' },
        explanation: {
          ru: '`size` растёт удвоением, пока не станет ≥ n; недостающие позиции заполняются часовым `sentinel`, заведомо большим любого элемента, чтобы сеть работала на фиксированной длине.',
          en: '`size` doubles until it is ≥ n; missing slots are filled with a `sentinel` guaranteed larger than any element, so the network operates on a fixed length.',
        },
      },
      {
        lines: [10, 12],
        title: { ru: 'Компаратор', en: 'The comparator' },
        explanation: {
          ru: '`compareExchange` - единственная элементарная операция сети: сравнить два индекса и поменять местами, если нарушен порядок.',
          en: '`compareExchange` is the network\'s single elementary operation: compare two indices and swap if out of order.',
        },
      },
      {
        lines: [14, 25],
        title: { ru: 'oddEvenMerge: рекурсивное слияние по шагу r', en: 'oddEvenMerge: recursive merge by stride r' },
        explanation: {
          ru: 'Пока удвоенный шаг `m` меньше длины участка, функция рекурсивно сливает подпоследовательности с шагом `m`, а затем один проход `for` (шаг 19) сравнивает пары с шагом `r` - это и есть финальная коррекция; при `m >= len` остаётся одно прямое сравнение (строка 23).',
          en: 'While the doubled stride `m` is less than the segment length, the function recursively merges subsequences at stride `m`, then a single `for` pass (line 19) compares pairs at stride `r` - this is the final correction; once `m >= len`, only one direct comparison remains (line 23).',
        },
      },
      {
        lines: [27, 34],
        title: { ru: 'oddEvenMergeSort: разделение пополам', en: 'oddEvenMergeSort: splitting in half' },
        explanation: {
          ru: 'Классическое рекурсивное деление на две половины, сортировка каждой той же функцией, а затем слияние результата через `oddEvenMerge` с начальным шагом `r = 1`.',
          en: 'Classic recursive split into two halves, each sorted by the same function, then merged via `oddEvenMerge` starting at stride `r = 1`.',
        },
      },
      {
        lines: [36, 38],
        title: { ru: 'Запуск и отбрасывание дополнения', en: 'Kicking off and dropping the padding' },
        explanation: {
          ru: 'Сеть строится на всей дополненной длине `size`, а на выходе возвращаются только первые n элементов - часовые `sentinel` остаются в хвосте и отбрасываются.',
          en: 'The network runs over the full padded length `size`, and only the first n elements are returned on output - the sentinel values stay in the tail and are dropped.',
        },
      },
    ],
    python: [
      {
        lines: [1, 4],
        title: { ru: 'Тривиальный случай', en: 'Trivial case' },
        explanation: {
          ru: 'Массив из 0 или 1 элемента уже отсортирован - копия возвращается сразу.',
          en: 'An array of 0 or 1 elements is already sorted - a copy is returned immediately.',
        },
      },
      {
        lines: [6, 10],
        title: { ru: 'Дополнение до степени двойки', en: 'Padding to a power of two' },
        explanation: {
          ru: '`size` растёт удвоением, пока не станет ≥ n; недостающие позиции заполняются часовым `sentinel`.',
          en: '`size` doubles until it is ≥ n; missing slots are filled with a `sentinel` value.',
        },
      },
      {
        lines: [12, 14],
        title: { ru: 'Компаратор', en: 'The comparator' },
        explanation: {
          ru: '`compare_exchange` - единственная элементарная операция сети.',
          en: '`compare_exchange` is the network\'s single elementary operation.',
        },
      },
      {
        lines: [16, 26],
        title: { ru: 'odd_even_merge: рекурсивное слияние по шагу r', en: 'odd_even_merge: recursive merge by stride r' },
        explanation: {
          ru: 'Пока удвоенный шаг `m` меньше длины участка, функция рекурсивно сливает подпоследовательности с шагом `m`, затем цикл `while` (строки 21-24) выполняет финальный проход сравнений с шагом `r`; иначе - одно прямое сравнение (строка 26).',
          en: 'While the doubled stride `m` is less than the segment length, the function recursively merges at stride `m`, then a `while` loop (lines 21-24) runs the final comparison pass at stride `r`; otherwise a single direct comparison happens (line 26).',
        },
      },
      {
        lines: [28, 33],
        title: { ru: 'odd_even_merge_sort: разделение пополам', en: 'odd_even_merge_sort: splitting in half' },
        explanation: {
          ru: 'Рекурсивное деление на две половины, сортировка каждой той же функцией, слияние через `odd_even_merge` с начальным шагом `r = 1`.',
          en: 'Recursive split into two halves, each sorted by the same function, merged via `odd_even_merge` starting at stride `r = 1`.',
        },
      },
      {
        lines: [35, 36],
        title: { ru: 'Запуск и отбрасывание дополнения', en: 'Kicking off and dropping the padding' },
        explanation: {
          ru: 'Сеть строится на всей дополненной длине `size`, на выходе возвращаются только первые n элементов.',
          en: 'The network runs over the full padded length `size`, and only the first n elements are returned.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Как и битоническая сортировка, задаётся полностью фиксированной, независимой от данных сетью сравнений - подходит для параллельного и аппаратного исполнения.',
      en: 'Like bitonic sort, defined by a completely fixed, data-independent comparison network - suited to parallel and hardware execution.',
    },
    {
      ru: 'Асимптотически использует примерно вдвое меньше отдельных операций сравнения, чем классическая битоническая сеть, при том же порядке роста O(n log² n).',
      en: 'Asymptotically uses roughly half as many individual comparison operations as the classic bitonic network, at the same O(n log² n) growth order.',
    },
    {
      ru: 'Гарантированная сложность вне зависимости от входных данных - нет отдельного «худшего случая».',
      en: 'Guaranteed complexity regardless of the input - there\'s no separate "worst case."',
    },
  ],
  cons: [
    {
      ru: 'Как и битоническая сортировка, требует дополнения до размера степени двойки, тратя часть сравнений на фиктивные элементы.',
      en: 'Like bitonic sort, requires padding to a power-of-two size, spending some comparisons on sentinel elements.',
    },
    {
      ru: 'На обычном последовательном процессоре с одним потоком проигрывает по скорости сортировке слиянием (O(n log² n) против O(n log n)).',
      en: 'On an ordinary single-threaded processor it loses out in speed to merge sort (O(n log² n) vs O(n log n)).',
    },
    {
      ru: 'Не является устойчивой: фиксированная схема сравнений не сохраняет исходный относительный порядок равных элементов.',
      en: 'Not stable: the fixed comparison scheme does not preserve the original relative order of equal elements.',
    },
  ],

  whenToUse: [
    {
      ru: 'Там же, где и битоническая сортировка - при сортировке на параллельном оборудовании или в задачах, требующих статической, заранее скомпилированной последовательности сравнений, но с чуть меньшим общим числом операций.',
      en: 'The same places bitonic sort is used - sorting on parallel hardware, or problems needing a static, precompiled comparison sequence, but with a slightly lower total operation count.',
    },
    {
      ru: 'Как учебный пример второй классической конструкции сортирующей сети, показывающий, что фиксированные сети сравнений можно строить разными способами с разными компромиссами.',
      en: 'As a teaching example of a second classic sorting-network construction, showing that fixed comparison networks can be built different ways with different trade-offs.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**ASIC- и FPGA-реализации аппаратных сортировщиков** нередко используют сети Батчера вместо битонических именно из-за меньшего числа компараторов при сравнимой глубине сети.',
      en: '**ASIC and FPGA hardware sorter implementations** often use Batcher networks instead of bitonic ones precisely because they need fewer comparators at a comparable network depth.',
    },
    {
      ru: '**Ранние параллельные вычислительные системы (в том числе сети Клоза и коммутационные сети)** опирались на идеи, близкие к сетям сортировки Батчера, при проектировании маршрутизации данных с предсказуемой задержкой.',
      en: '**Early parallel computing systems (including Clos networks and switching fabrics)** drew on ideas close to Batcher\'s sorting networks when designing data routing with predictable latency.',
    },
  ],

  relatedAlgorithms: ['bitonic-sort', 'merge-sort'],

  quiz: [
    {
      question: {
        ru: 'По какому признаку нечётно-чётное слияние разбивает элементы перед рекурсивным слиянием?',
        en: 'By what criterion does odd-even merge split elements before recursively merging?',
      },
      options: [
        { ru: 'По чётности позиции элемента', en: 'By the parity of the element\'s position' },
        { ru: 'По знаку значения элемента', en: 'By the sign of the element\'s value' },
        { ru: 'По тому, больше ли элемент среднего значения массива', en: 'By whether the element is above the array\'s average value' },
        { ru: 'Разбиения не происходит вовсе', en: 'No splitting happens at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Элементы на чётных и на нечётных позициях сливаются раздельно и рекурсивно, а затем один финальный проход исправляет оставшиеся нарушения - отсюда и название алгоритма.',
        en: 'Elements at even and odd positions are merged separately and recursively, and a final pass then fixes the remaining violations - hence the algorithm\'s name.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» (параметр `r` - шаг между сравниваемыми элементами).',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab (the `r` parameter as the stride between compared elements).',
      },
    },
    {
      question: {
        ru: 'Чем сеть Батчера отличается от битонической сортировки по конструкции слияния?',
        en: "How does Batcher's network differ from bitonic sort in its merge construction?",
      },
      options: [
        {
          ru: 'Применяет нечётно-чётную схему слияния отсортированных половин с меньшим числом сравнений',
          en: 'It uses a different (odd-even) scheme for merging two sorted halves, with fewer comparisons',
        },
        { ru: 'Она вообще никогда не использует рекурсию ни на каком этапе построения', en: 'It never uses recursion at all at any stage of the network construction' },
        { ru: 'Она работает исключительно с уже полностью отсортированными входными массивами', en: 'It only works correctly on input arrays that are already fully sorted' },
        { ru: 'Она никак вообще не отличается - это просто два разных названия для одного и того же самого алгоритма', en: 'It doesn\'t differ at all - it\'s simply two different names for the exact same underlying algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма - сети сравнений с фиксированной структурой, но именно детали построения сети слияния и определяют, сколько всего нужно компараторов.',
        en: 'Both algorithms are comparison networks with a fixed structure, but the details of the merge network construction are what determine the total comparator count.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Углублённо» на вкладке «Суть» (битоническая последовательность против нечётно-чётного разбиения).',
        en: 'See the third "Deep dive" paragraph on the "Intent" tab (a bitonic sequence versus an odd-even split).',
      },
    },
    {
      question: {
        ru: 'Зачем нужен финальный проход сравнений соседних пар после раздельного слияния чётных и нечётных позиций?',
        en: 'Why is a final pass of comparisons between neighboring pairs needed after separately merging the even and odd positions?',
      },
      options: [
        {
          ru: 'Исправляет немногочисленные нарушения порядка между соседними элементами',
          en: 'It fixes the few remaining order violations between neighboring elements',
        },
        { ru: 'Он полностью отменяет абсолютно все ранее сделанные сравнения в сети', en: 'It completely undoes absolutely all of the previously made comparisons in the network' },
        { ru: 'Он требуется исключительно для входных массивов с чётным числом элементов', en: 'It\'s only ever needed when the input array has an even number of elements' },
        { ru: 'Он вообще никак не влияет на итоговый результат сортировки массива', en: 'It has no effect on the final sorted result of the array whatsoever' },
      ],
      correct: 0,
      explanation: {
        ru: 'После раздельного слияния чётных и нечётных подпоследовательностей результат почти отсортирован, но требует финальной коррекции соседних пар.',
        en: 'After the even and odd subsequences are merged separately, the result is nearly sorted but needs a final correction of neighboring pairs.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Углублённо» на вкладке «Суть» и шаг «oddEvenMerge: рекурсивное слияние по шагу r» построчного разбора на вкладке «Реализация».',
        en: 'See the second "Deep dive" paragraph on the "Intent" tab and the "oddEvenMerge: recursive merge by stride r" walkthrough step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность сортирующей сети Батчера?',
        en: "What is the time complexity of Batcher's sorting network?",
      },
      options: [
        { ru: 'O(n log² n)', en: 'O(n log² n)' },
        { ru: 'O(n log n), как у обычной сортировки слиянием', en: 'O(n log n), the same as regular merge sort' },
        { ru: 'O(n), потому что сеть строится всего за один линейный проход', en: 'O(n), because the network is built in a single linear pass' },
        { ru: 'O(n²), как у наивной сортировки пузырьком', en: 'O(n²), the same as naive bubble sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Тот же порядок роста, что и у битонической сортировки - O(log² n) уровней сети, каждый требует O(n) сравнений.',
        en: 'The same growth order as bitonic sort - O(log² n) network levels, each requiring O(n) comparisons.',
      },
      hint: {
        ru: 'Смотрите бейдж «Время» вверху страницы и пятый абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the "Time" complexity badge at the top of the page and the fifth "Deep dive" paragraph on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что объединяет и битоническую сортировку, и сортирующую сеть Батчера как класс алгоритмов?',
        en: 'What unites both bitonic sort and Batcher\'s sorting network as a class of algorithms?',
      },
      options: [
        {
          ru: 'Обе строят фиксированную, независимую от данных сеть операций сравнения',
          en: 'Both build a fixed, data-independent network of comparison operations',
        },
        { ru: 'Обе требуют, чтобы входные данные были предварительно полностью отсортированы заранее', en: 'Both require that the input data already be fully pre-sorted beforehand' },
        { ru: 'Обе способны работать исключительно с целыми числами и ни с чем другим', en: 'Both are only able to work with integers and nothing else at all' },
        { ru: 'Обе имеют одинаковую линейную сложность O(n) в худшем случае', en: 'Both have the same linear O(n) complexity in the worst case' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно фиксированность сети сравнений, известная заранее, объединяет их в класс «сортирующих сетей», пригодных для параллельного исполнения.',
        en: 'It is precisely the fixed, known-in-advance comparison network that unites them into the class of "sorting networks," suited to parallel execution.',
      },
      hint: {
        ru: 'Смотрите первый пункт whenToUse (углублённого) и последний абзац раздела «Углублённо» на вкладке «Суть» (общая статья Батчера 1968 года).',
        en: 'See the first extended "When to use" item and the last "Deep dive" paragraph on the "Intent" tab (Batcher\'s single 1968 paper).',
      },
    },
    {
      question: {
        ru: 'Почему сортирующие сети (в том числе сеть Батчера) требуют дополнения массива до степени двойки?',
        en: 'Why do sorting networks (including Batcher\'s) require padding the array to a power of two?',
      },
      options: [
        { ru: 'Рекурсивное деление пополам требует чётного числа элементов на каждом уровне', en: 'Recursive splitting into equal halves requires an even element count at every level' },
        { ru: 'Степень двойки минимизирует число сравнений по сравнению с любым другим размером', en: 'A power of two minimizes the comparison count compared to any other size' },
        { ru: 'Аппаратные реализации не могут работать с нечётным числом элементов физически', en: 'Hardware implementations physically cannot process an odd number of elements' },
        { ru: 'Это требование языка программирования, а не самого алгоритма', en: 'This is a programming language requirement, not a property of the algorithm itself always' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нечётно-чётное слияние (и битоническое слияние) основаны на рекурсивном делении пополам, которое должно выполняться на каждом уровне. Нестепень-двоечный размер нарушает эту симметрию.',
        en: 'Odd-even merge (and bitonic merge) are based on recursive halving that must work at every level. A non-power-of-two size breaks this symmetry.',
      },
      hint: {
        ru: 'Смотрите первый пункт минусов на вкладке «Плюсы и минусы» и шестой абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the first "Cons" item on the "Pros & Cons" tab and the sixth "Deep dive" paragraph on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли сортирующая сеть Батчера устойчивым алгоритмом?',
        en: "Is Batcher's sorting network a stable algorithm?",
      },
      options: [
        { ru: 'Нет - фиксированная схема сравнений может менять порядок равных элементов', en: 'No - the fixed comparison scheme can change the relative order of equal elements' },
        { ru: 'Да - все компараторы сети сохраняют порядок равных элементов по определению', en: 'Yes - all network comparators preserve the order of equal elements by definition' },
        { ru: 'Зависит от размера массива: для n ≤ 8 устойчива, для больших n - нет', en: 'It depends on array size: stable for n ≤ 8, unstable for larger n' },
        { ru: 'Устойчивость неприменима к алгоритмам, выполняемым на аппаратном обеспечении', en: 'Stability does not apply to algorithms executed on hardware' },
      ],
      correct: 0,
      explanation: {
        ru: 'Компаратор «сравнить и поменять, если нужно» меняет элементы независимо от их исходных позиций. Если два одинаковых элемента стоят в «неправильном» порядке с точки зрения компаратора, они поменяются местами.',
        en: 'A "compare and swap if needed" comparator exchanges elements regardless of their original positions. If two equal elements happen to be in the "wrong" comparator order, they will be swapped.',
      },
      hint: {
        ru: 'Смотрите третий пункт минусов на вкладке «Плюсы и минусы» и шаг «Компаратор» построчного разбора на вкладке «Реализация».',
        en: 'See the third "Cons" item on the "Pros & Cons" tab and the "The comparator" walkthrough step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему сортирующие сети эффективны на FPGA и ASIC?',
        en: 'Why are sorting networks efficient on FPGAs and ASICs?',
      },
      options: [
        { ru: 'Компараторы известны заранее и реализуются параллельными аппаратными блоками', en: 'All comparators are known in advance and can be implemented as parallel hardware units' },
        { ru: 'FPGA автоматически оптимизирует любой алгоритм до линейного времени при компиляции', en: 'FPGAs automatically optimize any algorithm to linear time at compile time' },
        { ru: 'Аппаратные сортировщики работают только с сетями, но не с программными алгоритмами', en: 'Hardware sorters only work with networks and never with software algorithms in all cases' },
        { ru: 'Сортирующие сети не требуют никакого тактового сигнала для синхронизации этапов', en: 'Sorting networks require no clock signal to synchronize their stages at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку набор сравнений фиксирован и не зависит от данных, каждый компаратор может быть реализован как отдельная логическая схема. Независимые компараторы на одном уровне сети работают одновременно.',
        en: 'Since the comparison set is fixed and data-independent, each comparator can be implemented as a separate logic circuit. Independent comparators at the same network level operate simultaneously.',
      },
      hint: {
        ru: 'Смотрите третий пункт «Примеры из практики» (углублённого) на вкладке «Суть» (FPGA-модули аппаратной сортировки).',
        en: 'See the third extended "Real world" item on the "Intent" tab (FPGA hardware sorting modules).',
      },
    },
    {
      question: {
        ru: 'Чем отличается сортирующая сеть от обычного алгоритма сортировки с точки зрения зависимости от данных?',
        en: 'How does a sorting network differ from an ordinary sorting algorithm in terms of data dependency?',
      },
      options: [
        { ru: 'Последовательность сравнений фиксирована и не зависит от входных данных', en: 'The comparison sequence in the network is fixed and does not change based on the input data' },
        { ru: 'Сортирующая сеть всегда выбирает следующее сравнение случайным образом', en: 'A sorting network always selects the next comparison at random' },
        { ru: 'Обычный алгоритм выполняет больше сравнений, чем сортирующая сеть, при любом входе', en: 'An ordinary algorithm always performs more comparisons than a sorting network on any input always' },
        { ru: 'Никакой разницы нет - оба подхода принимают одинаковые решения при одинаковых данных', en: 'There is no difference - both approaches make the same decisions given the same data' },
      ],
      correct: 0,
      explanation: {
        ru: 'В обычных алгоритмах (quicksort, mergesort) следующее сравнение зависит от результата предыдущего. В сортирующей сети все сравнения определены заранее - входные данные влияют только на то, произойдёт ли обмен при каждом конкретном сравнении.',
        en: 'In ordinary algorithms (quicksort, mergesort) the next comparison depends on the result of the previous one. In a sorting network all comparisons are predefined - input data only affects whether a swap occurs at each specific comparison.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» (шаг `r` рекурсии фиксирован заранее, а не зависит от сравнений).',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab (the recursion stride `r` is fixed in advance, not derived from comparisons).',
      },
    },
    {
      question: {
        ru: 'Сколько уровней сравнений (глубина сети) в нечётно-чётной сортировке для n элементов?',
        en: 'How many comparison levels (network depth) does odd-even sort use for n elements?',
      },
      options: [
        { ru: 'O(log² n) уровней - как у битонической сети', en: 'O(log² n) levels - matching the asymptotic depth of the bitonic network' },
        { ru: 'O(n) уровней - по одному уровню на каждый элемент массива', en: 'O(n) levels - one level for each element in the array' },
        { ru: 'O(log n) уровней - как и у оптимальной сортирующей сети', en: 'O(log n) levels - the same as an optimal sorting network regardless of input' },
        { ru: 'Ровно n/2 уровней независимо от содержания массива', en: 'Exactly n/2 levels regardless of the array contents' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нечётно-чётная сортировка имеет глубину O(log² n), как и битоническая. Теоретически оптимальная сортирующая сеть имела бы глубину O(log n), но практически реализуемые конструкции дают O(log² n).',
        en: 'Odd-even sort has depth O(log² n), same as bitonic sort. A theoretically optimal sorting network would have depth O(log n), but practically constructible networks yield O(log² n).',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Углублённо» на вкладке «Суть» (расчёт глубины для n = 1 000 000).',
        en: 'See the fifth "Deep dive" paragraph on the "Intent" tab (the depth calculation for n = 1,000,000).',
      },
    },
  ],
};

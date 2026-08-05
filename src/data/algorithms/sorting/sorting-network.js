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
    ru: 'Нечётно-чётная сортировка слиянием Батчера строит сортирующую сеть — фиксированную, заранее известную последовательность операций «сравнить и при необходимости поменять местами» — но, в отличие от битонической сортировки, использует другую схему слияния двух уже отсортированных половин, основанную на разделении элементов по чётности их позиции.',
    en: "Batcher's odd-even mergesort builds a sorting network — a fixed, known-in-advance sequence of \"compare and swap if needed\" operations — but, unlike bitonic sort, uses a different scheme for merging two already-sorted halves, based on splitting elements by the parity of their position.",
  },

  problem: {
    ru: 'Обычное слияние двух отсортированных последовательностей (как в сортировке слиянием) требует последовательного продвижения двух указателей и решения на каждом шаге, откуда брать следующий элемент, — а это, опять же, зависимость от данных, которая плохо ложится на параллельное или аппаратное исполнение. Нужна схема слияния, которая, как и в битонической сортировке, задаётся заранее фиксированным набором сравнений, но использует другую, зачастую более компактную комбинаторную структуру.',
    en: 'Ordinary merging of two sorted sequences (as in merge sort) requires advancing two pointers sequentially and deciding at each step where to take the next element from — again a data dependency that maps poorly onto parallel or hardware execution. What is needed is a merge scheme that, like bitonic sort, is defined by a fixed set of comparisons known in advance, but uses a different, often more compact combinatorial structure.',
  },

  solution: {
    ru: 'Массив рекурсивно делится пополам, каждая половина сортируется той же сетью, а затем две отсортированные половины сливаются «нечётно-чётным слиянием»: сначала отдельно и рекурсивно сливаются элементы, стоящие на чётных позициях, и элементы на нечётных позициях каждой половины, а затем один финальный проход сравнений между соседними элементами (i, i+1) исправляет оставшиеся немногочисленные нарушения порядка. Такое разбиение по чётности и есть источник названия «нечётно-чётное слияние», а весь набор сравнений полностью фиксирован и известен ещё до начала выполнения.',
    en: "The array is recursively split in half, each half is sorted by the same network, and then the two sorted halves are combined via \"odd-even merge\": the elements at even positions and the elements at odd positions of each half are separately and recursively merged first, and then one final pass of comparisons between neighboring elements (i, i+1) fixes the few remaining order violations. This split by parity is where the name \"odd-even merge\" comes from, and the entire set of comparisons is completely fixed and known before execution even starts.",
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
        ru: 'Сравнить и при необходимости поменять местами каждую соседнюю пару (i, i+1) — это исправляет немногочисленные оставшиеся нарушения порядка.',
        en: 'Compare and, if needed, swap every neighboring pair (i, i+1) — this fixes the few remaining order violations.',
      },
    },
    {
      title: { ru: 'Отбросить дополнение', en: 'Drop the padding' },
      explanation: {
        ru: 'После завершения сети сравнений отбросить фиктивные элементы дополнения — оставшиеся элементы отсортированы.',
        en: 'Once the comparison network finishes, drop the sentinel padding elements — the remaining elements are sorted.',
      },
    },
  ],

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

  pros: [
    {
      ru: 'Как и битоническая сортировка, задаётся полностью фиксированной, независимой от данных сетью сравнений — подходит для параллельного и аппаратного исполнения.',
      en: 'Like bitonic sort, defined by a completely fixed, data-independent comparison network — suited to parallel and hardware execution.',
    },
    {
      ru: 'Асимптотически использует примерно вдвое меньше отдельных операций сравнения, чем классическая битоническая сеть, при том же порядке роста O(n log² n).',
      en: 'Asymptotically uses roughly half as many individual comparison operations as the classic bitonic network, at the same O(n log² n) growth order.',
    },
    {
      ru: 'Гарантированная сложность вне зависимости от входных данных — нет отдельного «худшего случая».',
      en: 'Guaranteed complexity regardless of the input — there\'s no separate "worst case."',
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
      ru: 'Там же, где и битоническая сортировка — при сортировке на параллельном оборудовании или в задачах, требующих статической, заранее скомпилированной последовательности сравнений, но с чуть меньшим общим числом операций.',
      en: 'The same places bitonic sort is used — sorting on parallel hardware, or problems needing a static, precompiled comparison sequence, but with a slightly lower total operation count.',
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
        ru: 'Элементы на чётных и на нечётных позициях сливаются раздельно и рекурсивно, а затем один финальный проход исправляет оставшиеся нарушения — отсюда и название алгоритма.',
        en: 'Elements at even and odd positions are merged separately and recursively, and a final pass then fixes the remaining violations — hence the algorithm\'s name.',
      },
      hint: {
        ru: 'Название алгоритма «нечётно-чётное слияние» уже содержит подсказку: по какому свойству позиций разделяются элементы?',
        en: 'The algorithm\'s name "odd-even merge" already contains the hint: by what property of their positions are elements split?',
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
        { ru: 'Она никак вообще не отличается — это просто два разных названия для одного и того же самого алгоритма', en: 'It doesn\'t differ at all — it\'s simply two different names for the exact same underlying algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма — сети сравнений с фиксированной структурой, но именно детали построения сети слияния и определяют, сколько всего нужно компараторов.',
        en: 'Both algorithms are comparison networks with a fixed structure, but the details of the merge network construction are what determine the total comparator count.',
      },
      hint: {
        ru: 'Оба алгоритма строят сортирующие сети, но по-разному объединяют две отсортированные половины. Что лежит в основе каждого подхода?',
        en: 'Both algorithms build sorting networks, but combine two sorted halves differently. What is the foundation of each approach?',
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
        ru: 'После двух раздельных слияний чётных и нечётных элементов почти всё стоит правильно. Какие нарушения порядка ещё могут оставаться?',
        en: 'After two separate merges of even and odd elements, nearly everything is in order. What order violations can still remain?',
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
        ru: 'Тот же порядок роста, что и у битонической сортировки — O(log² n) уровней сети, каждый требует O(n) сравнений.',
        en: 'The same growth order as bitonic sort — O(log² n) network levels, each requiring O(n) comparisons.',
      },
      hint: {
        ru: 'Сколько уровней рекурсии нужно для разбиения n элементов — и сколько сравнений на каждом уровне?',
        en: 'How many recursion levels are needed to split n elements — and how many comparisons per level?',
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
        ru: 'Что принципиально отличает сортирующие сети от обычных алгоритмов — зависит ли последовательность сравнений от значений элементов?',
        en: 'What fundamentally distinguishes sorting networks from ordinary algorithms — does the comparison sequence depend on element values?',
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
        ru: 'Что происходит при рекурсивном делении нечётного числа элементов пополам — получаются ли равные половины?',
        en: 'What happens when you recursively split an odd number of elements in half — do you always get equal halves?',
      },
    },
    {
      question: {
        ru: 'Является ли сортирующая сеть Батчера устойчивым алгоритмом?',
        en: "Is Batcher's sorting network a stable algorithm?",
      },
      options: [
        { ru: 'Нет — фиксированная схема сравнений может менять порядок равных элементов', en: 'No — the fixed comparison scheme can change the relative order of equal elements' },
        { ru: 'Да — все компараторы сети сохраняют порядок равных элементов по определению', en: 'Yes — all network comparators preserve the order of equal elements by definition' },
        { ru: 'Зависит от размера массива: для n ≤ 8 устойчива, для больших n — нет', en: 'It depends on array size: stable for n ≤ 8, unstable for larger n' },
        { ru: 'Устойчивость неприменима к алгоритмам, выполняемым на аппаратном обеспечении', en: 'Stability does not apply to algorithms executed on hardware' },
      ],
      correct: 0,
      explanation: {
        ru: 'Компаратор «сравнить и поменять, если нужно» меняет элементы независимо от их исходных позиций. Если два одинаковых элемента стоят в «неправильном» порядке с точки зрения компаратора, они поменяются местами.',
        en: 'A "compare and swap if needed" comparator exchanges elements regardless of their original positions. If two equal elements happen to be in the "wrong" comparator order, they will be swapped.',
      },
      hint: {
        ru: 'Компаратор сети меняет элементы, если они стоят в неправильном порядке. Учитывает ли он исходные позиции равных элементов?',
        en: 'A network comparator swaps elements when they are out of order. Does it consider the original positions of equal elements?',
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
        ru: 'Если все операции сравнения известны заранее и некоторые из них независимы — что можно сделать с такими операциями на параллельном оборудовании?',
        en: 'If all comparison operations are known in advance and some of them are independent — what can be done with those operations on parallel hardware?',
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
        { ru: 'Никакой разницы нет — оба подхода принимают одинаковые решения при одинаковых данных', en: 'There is no difference — both approaches make the same decisions given the same data' },
      ],
      correct: 0,
      explanation: {
        ru: 'В обычных алгоритмах (quicksort, mergesort) следующее сравнение зависит от результата предыдущего. В сортирующей сети все сравнения определены заранее — входные данные влияют только на то, произойдёт ли обмен при каждом конкретном сравнении.',
        en: 'In ordinary algorithms (quicksort, mergesort) the next comparison depends on the result of the previous one. In a sorting network all comparisons are predefined — input data only affects whether a swap occurs at each specific comparison.',
      },
      hint: {
        ru: 'В quicksort следующий шаг зависит от того, как элемент сравнился с опорным. В сортирующей сети — зависит ли следующий шаг от результата текущего сравнения?',
        en: 'In quicksort the next step depends on how an element compared to the pivot. In a sorting network — does the next step depend on the current comparison\'s result?',
      },
    },
    {
      question: {
        ru: 'Сколько уровней сравнений (глубина сети) в нечётно-чётной сортировке для n элементов?',
        en: 'How many comparison levels (network depth) does odd-even sort use for n elements?',
      },
      options: [
        { ru: 'O(log² n) уровней — как у битонической сети', en: 'O(log² n) levels — matching the asymptotic depth of the bitonic network' },
        { ru: 'O(n) уровней — по одному уровню на каждый элемент массива', en: 'O(n) levels — one level for each element in the array' },
        { ru: 'O(log n) уровней — как и у оптимальной сортирующей сети', en: 'O(log n) levels — the same as an optimal sorting network regardless of input' },
        { ru: 'Ровно n/2 уровней независимо от содержания массива', en: 'Exactly n/2 levels regardless of the array contents' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нечётно-чётная сортировка имеет глубину O(log² n), как и битоническая. Теоретически оптимальная сортирующая сеть имела бы глубину O(log n), но практически реализуемые конструкции дают O(log² n).',
        en: 'Odd-even sort has depth O(log² n), same as bitonic sort. A theoretically optimal sorting network would have depth O(log n), but practically constructible networks yield O(log² n).',
      },
      hint: {
        ru: 'Глубина сети определяет, сколько параллельных шагов нужно для завершения сортировки. Вспомните асимптотику из вопроса о временной сложности.',
        en: 'Network depth determines how many parallel steps are needed to complete sorting. Recall the asymptotic from the time complexity question.',
      },
    },
  ],
};

export const bitonicSort = {
  slug: 'bitonic-sort',
  category: 'sorting',
  name: { ru: 'Битоническая сортировка', en: 'Bitonic Sort' },
  complexity: {
    time: { best: 'O(n log² n)', average: 'O(n log² n)', worst: 'O(n log² n)' },
    space: 'O(n)',
  },
  popularity: 2,
  tags: ['comparison', 'sorting-network', 'parallelizable', 'divide-and-conquer'],

  intent: {
    ru: 'Битоническая сортировка строит массив из «битонических» последовательностей — тех, что сначала монотонно возрастают, а потом монотонно убывают (или наоборот) — и сливает их фиксированной сетью сравнений, у которой заранее известны все пары элементов для сравнения, независимо от значений самих элементов.',
    en: 'Bitonic sort builds up "bitonic" sequences — ones that first monotonically increase, then monotonically decrease (or vice versa) — and merges them with a fixed comparison network whose comparison pairs are known in advance, independent of the actual element values.',
  },

  problem: {
    ru: 'Большинство быстрых алгоритмов сортировки (быстрая, сортировка слиянием) выбирают, что сравнивать дальше, в зависимости от результатов предыдущих сравнений — это затрудняет их аппаратную реализацию или выполнение на GPU, где заранее хочется знать полную и неизменную последовательность операций сравнения, чтобы выполнять их параллельно, независимо от входных данных.',
    en: 'Most fast sorting algorithms (quicksort, merge sort) decide what to compare next based on the outcome of previous comparisons — this makes them awkward to implement in hardware or on a GPU, where a fixed, data-independent sequence of comparisons, known in advance, is what allows many of them to run in parallel.',
  },

  solution: {
    ru: 'Массив (дополненный до размера, равного степени двойки) рекурсивно делится на две половины: левая сортируется по возрастанию, правая — по убыванию. Вместе они образуют битоническую последовательность (сначала растёт, потом падает). Такую последовательность можно слить в отсортированный порядок с помощью «битонического слияния»: сравнить и, если нужно, поменять местами каждый элемент первой половины с соответствующим элементом второй половины, затем рекурсивно слить каждую половину так же. Ключевое свойство: результат такого слияния всегда правильно отсортирован, а пары сравнений полностью фиксированы заранее — это и есть сеть сравнений.',
    en: 'The array (padded to a power-of-two size) is recursively split into two halves: the left half sorted ascending, the right half sorted descending. Together they form a bitonic sequence (rising, then falling). Such a sequence can be merged into fully sorted order via "bitonic merge": compare and, if needed, swap each element of the first half with the corresponding element of the second half, then recursively merge each half the same way. The key property is that this merge always produces a correctly sorted result, and the comparison pairs are completely fixed in advance — that fixed structure is the comparison network.',
  },

  steps: [
    {
      title: { ru: 'Дополнить до степени двойки', en: 'Pad to a power of two' },
      explanation: {
        ru: 'Дополнить массив фиктивными элементами, большими любого настоящего, чтобы его размер стал степенью двойки — этого требует классическая сеть.',
        en: 'Pad the array with sentinel elements larger than any real one, so its size becomes a power of two — required by the classic network.',
      },
    },
    {
      title: { ru: 'Построить битоническую последовательность', en: 'Build a bitonic sequence' },
      explanation: {
        ru: 'Рекурсивно отсортировать левую половину по возрастанию, а правую — по убыванию, получив в сумме битоническую последовательность.',
        en: 'Recursively sort the left half ascending and the right half descending, producing a combined bitonic sequence.',
      },
    },
    {
      title: { ru: 'Сравнить половины', en: 'Compare the halves' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами каждый элемент первой половины с соответствующим элементом второй половины.',
        en: 'Compare and, if needed, swap every element of the first half with the corresponding element of the second half.',
      },
    },
    {
      title: { ru: 'Слить рекурсивно', en: 'Merge recursively' },
      explanation: {
        ru: 'Каждая из двух получившихся половин снова является битонической последовательностью — рекурсивно слить каждую из них тем же способом.',
        en: 'Each of the two resulting halves is itself a bitonic sequence — recursively merge each one the same way.',
      },
    },
    {
      title: { ru: 'Отбросить дополнение', en: 'Drop the padding' },
      explanation: {
        ru: 'После завершения сети сравнений отбросить фиктивные элементы — оставшиеся элементы отсортированы.',
        en: 'Once the comparison network finishes, drop the sentinel elements — the remaining elements are sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function bitonicSort(arr) {
  const n = arr.length;
  if (n <= 1) return [...arr];

  let size = 1;
  while (size < n) size *= 2;
  const sentinel = Math.max(...arr) + 1;
  const a = [...arr, ...new Array(size - n).fill(sentinel)];

  function compareAndSwap(i, j, dir) {
    if ((dir === 1 && a[i] > a[j]) || (dir === 0 && a[i] < a[j])) {
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  function bitonicMerge(lo, cnt, dir) {
    if (cnt > 1) {
      const k = Math.floor(cnt / 2);
      for (let i = lo; i < lo + k; i++) compareAndSwap(i, i + k, dir);
      bitonicMerge(lo, k, dir);
      bitonicMerge(lo + k, cnt - k, dir);
    }
  }

  function bitonicSortRec(lo, cnt, dir) {
    if (cnt > 1) {
      const k = Math.floor(cnt / 2);
      bitonicSortRec(lo, k, 1);
      bitonicSortRec(lo + k, cnt - k, 0);
      bitonicMerge(lo, cnt, dir);
    }
  }

  bitonicSortRec(0, size, 1);
  return a.slice(0, n);
}`,
    python: `def bitonic_sort(arr):
    n = len(arr)
    if n <= 1:
        return list(arr)

    size = 1
    while size < n:
        size *= 2
    sentinel = max(arr) + 1
    a = list(arr) + [sentinel] * (size - n)

    def compare_and_swap(i, j, dir_):
        if (dir_ == 1 and a[i] > a[j]) or (dir_ == 0 and a[i] < a[j]):
            a[i], a[j] = a[j], a[i]

    def bitonic_merge(lo, cnt, dir_):
        if cnt > 1:
            k = cnt // 2
            for i in range(lo, lo + k):
                compare_and_swap(i, i + k, dir_)
            bitonic_merge(lo, k, dir_)
            bitonic_merge(lo + k, cnt - k, dir_)

    def bitonic_sort_rec(lo, cnt, dir_):
        if cnt > 1:
            k = cnt // 2
            bitonic_sort_rec(lo, k, 1)
            bitonic_sort_rec(lo + k, cnt - k, 0)
            bitonic_merge(lo, cnt, dir_)

    bitonic_sort_rec(0, size, 1)
    return a[:n]`,
  },

  pros: [
    {
      ru: 'Сеть сравнений полностью фиксирована заранее и не зависит от значений элементов — идеально подходит для параллельного или аппаратного выполнения (GPU, FPGA, SIMD).',
      en: 'The comparison network is completely fixed in advance and independent of element values — ideal for parallel or hardware execution (GPU, FPGA, SIMD).',
    },
    {
      ru: 'Гарантированная сложность O(n log² n) вне зависимости от исходного порядка элементов — нет отдельного «худшего случая», как у быстрой сортировки.',
      en: 'Guaranteed O(n log² n) complexity regardless of the initial ordering — there\'s no separate "worst case" the way there is for quicksort.',
    },
    {
      ru: 'При достаточном числе параллельных процессоров все сравнения одного уровня сети выполняются одновременно, снижая реальное время выполнения до O(log² n).',
      en: 'Given enough parallel processors, all comparisons at one network level run simultaneously, cutting real execution time to O(log² n).',
    },
  ],
  cons: [
    {
      ru: 'Требует дополнения массива до размера, равного степени двойки — на данных произвольного размера часть сравнений выполняется впустую с фиктивными элементами.',
      en: 'Requires padding the array to a power-of-two size — on arbitrary-sized data, some comparisons are wasted on sentinel elements.',
    },
    {
      ru: 'На обычном последовательном процессоре с одним потоком выполняет больше сравнений, чем сортировка слиянием (O(n log² n) против O(n log n)) — параллельность здесь ключевое преимущество, а не сама по себе последовательная скорость.',
      en: 'On an ordinary single-threaded processor it performs more comparisons than merge sort (O(n log² n) vs O(n log n)) — the parallelism is the key advantage here, not raw sequential speed.',
    },
    {
      ru: 'Не является устойчивой сортировкой: фиксированная сеть сравнений не сохраняет исходный относительный порядок равных элементов.',
      en: 'Not a stable sort: the fixed comparison network does not preserve the original relative order of equal elements.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортировка выполняется на параллельном оборудовании (GPU-шейдеры, FPGA, SIMD-инструкции) и важна предсказуемая, полностью статическая последовательность операций.',
      en: 'When sorting runs on parallel hardware (GPU shaders, FPGA, SIMD instructions) and a predictable, fully static sequence of operations matters.',
    },
    {
      ru: 'В задачах с фиксированным, заранее известным размером входных данных, где заранее скомпилированная сеть сравнений может быть развёрнута без циклов и условных переходов.',
      en: 'In problems with a fixed, known-in-advance input size, where a precompiled comparison network can be unrolled without loops or branches.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**GPU-реализации сортировки** (например, в OpenCL и CUDA) часто используют битоническую сортировку именно потому, что её сеть сравнений не содержит ветвлений по данным, что критично для эффективного выполнения на SIMD-архитектурах.',
      en: '**GPU sorting implementations** (e.g., in OpenCL and CUDA) frequently use bitonic sort precisely because its comparison network contains no data-dependent branches, which is critical for efficient execution on SIMD architectures.',
    },
    {
      ru: '**Сети сортировки в аппаратных ускорителях и сетевых коммутаторах** используют битонические сети для сортировки пакетов данных на лету с предсказуемой задержкой и полным параллелизмом.',
      en: '**Sorting networks in hardware accelerators and network switches** use bitonic networks to sort data packets on the fly with predictable latency and full parallelism.',
    },
  ],

  relatedAlgorithms: ['merge-sort', 'heap-sort'],

  quiz: [
    {
      question: {
        ru: 'Что такое «битоническая последовательность»?',
        en: 'What is a "bitonic sequence"?',
      },
      options: [
        {
          ru: 'Последовательность, сначала монотонно возрастающая, а затем монотонно убывающая (или наоборот)',
          en: 'A sequence that first monotonically increases, then monotonically decreases (or vice versa)',
        },
        { ru: 'Последовательность из ровно двух элементов', en: 'A sequence of exactly two elements' },
        { ru: 'Последовательность, отсортированная в случайном порядке', en: 'A sequence sorted in random order' },
        { ru: 'Последовательность, состоящая только из чётных чисел', en: 'A sequence consisting only of even numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно эта форма («гора» или «долина») позволяет корректно слить последовательность за один проход битонического слияния.',
        en: 'Exactly this shape (a "mountain" or "valley") is what lets the sequence be correctly merged in a single bitonic-merge pass.',
      },
    },
    {
      question: {
        ru: 'Зачем массив дополняется до размера, равного степени двойки?',
        en: 'Why is the array padded to a power-of-two size?',
      },
      options: [
        { ru: 'Классическая сеть сравнений битонической сортировки построена рекурсивным делением пополам и требует этого размера', en: 'The classic bitonic comparison network is built by recursive halving and requires this size' },
        { ru: 'Иначе сортировка даёт неверный результат для отрицательных чисел', en: 'Otherwise the sort gives an incorrect result for negative numbers' },
        { ru: 'Это ускоряет работу на обычном процессоре с одним потоком', en: 'It speeds up execution on an ordinary single-threaded processor' },
        { ru: 'Дополнение не нужно, это архитектурная особенность конкретной реализации', en: 'Padding isn\'t actually needed — it\'s an implementation quirk' },
      ],
      correct: 0,
      explanation: {
        ru: 'Рекурсивное деление cnt/2 на каждом уровне сети предполагает степень двойки; для произвольного n массив дополняют фиктивными элементами.',
        en: 'The recursive cnt/2 split at every network level assumes a power of two; for arbitrary n, the array is padded with sentinel elements.',
      },
    },
    {
      question: {
        ru: 'Почему битоническая сортировка хорошо подходит для параллельного оборудования?',
        en: 'Why is bitonic sort well suited to parallel hardware?',
      },
      options: [
        {
          ru: 'Все пары сравнений известны заранее и не зависят от значений элементов',
          en: 'All comparison pairs are known in advance and don\'t depend on element values',
        },
        { ru: 'Она использует меньше сравнений, чем любой другой алгоритм', en: 'It uses fewer comparisons than any other algorithm' },
        { ru: 'Она никогда не переставляет элементы местами', en: 'It never swaps elements' },
        { ru: 'Она работает только с уже отсортированными данными', en: 'It only works on already-sorted data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Фиксированная, независимая от данных структура сравнений позволяет выполнять их одновременно на многих процессорах без ветвлений.',
        en: 'A fixed, data-independent comparison structure lets many processors execute them simultaneously without branching.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность битонической сортировки?',
        en: 'What is the time complexity of bitonic sort?',
      },
      options: [
        { ru: 'O(n log² n)', en: 'O(n log² n)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(n²)', en: 'O(n²)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сеть состоит из O(log² n) уровней, каждый из которых требует O(n) сравнений, что даёт в сумме O(n log² n).',
        en: 'The network consists of O(log² n) levels, each requiring O(n) comparisons, giving O(n log² n) overall.',
      },
    },
    {
      question: {
        ru: 'Является ли битоническая сортировка устойчивой (stable)?',
        en: 'Is bitonic sort stable?',
      },
      options: [
        { ru: 'Нет — фиксированная сеть сравнений не сохраняет исходный порядок равных элементов', en: 'No — the fixed comparison network doesn\'t preserve the original order of equal elements' },
        { ru: 'Да, всегда сохраняет порядок равных элементов', en: 'Yes, it always preserves the order of equal elements' },
        { ru: 'Только если массив уже отсортирован', en: 'Only if the array is already sorted' },
        { ru: 'Устойчивость не определена для сетей сравнений', en: 'Stability is undefined for comparison networks' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и большинство сетей сравнений, битоническая сортировка меняет местами равные элементы в зависимости от их позиции в сети, теряя исходный порядок.',
        en: 'Like most comparison networks, bitonic sort swaps equal elements based on their position in the network, losing their original order.',
      },
    },
  ],
};

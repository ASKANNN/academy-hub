export const oddEvenSort = {
  slug: 'odd-even-sort',
  category: 'sorting',
  name: { ru: 'Odd-Even Sort', en: 'Odd-Even Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'stable', 'parallelizable'],

  intent: {
    ru: 'Чётно-нечётная сортировка (brick sort) — вариант пузырьковой сортировки, который вместо одного последовательного прохода чередует два независимых набора сравнений: по нечётным и по чётным позициям, что делает пары сравнений внутри каждого набора независимыми друг от друга и пригодными для параллельного выполнения.',
    en: 'Odd-even sort (brick sort) is a bubble sort variant that, instead of one sequential pass, alternates between two independent sets of comparisons: odd-indexed pairs and even-indexed pairs — which makes the comparisons within each set independent of one another and suitable for parallel execution.',
  },

  problem: {
    ru: 'Обычная пузырьковая сортировка по своей природе последовательна: каждое сравнение (i, i+1) должно выполниться после предыдущего (i-1, i), потому что результат обмена на предыдущем шаге влияет на следующий. Это делает bubble sort плохим кандидатом для параллельных вычислений или аппаратной реализации (например, в сортирующих сетях), где хочется выполнять много сравнений одновременно.',
    en: 'Plain bubble sort is inherently sequential: each comparison (i, i+1) must happen after the previous one (i-1, i), because the previous step\'s swap outcome affects the next. This makes bubble sort a poor fit for parallel computation or hardware implementations (e.g., in sorting networks), where many comparisons should run simultaneously.',
  },

  solution: {
    ru: 'Все сравнения разбиваются на две группы, которые не пересекаются по индексам: «нечётная» фаза сравнивает пары (1,2), (3,4), (5,6)... а «чётная» фаза — пары (0,1), (2,3), (4,5).... Внутри одной фазы ни одна пара индексов не используется дважды, поэтому все сравнения этой фазы можно выполнять одновременно, независимо друг от друга. Алгоритм чередует нечётную и чётную фазы, пока за очередной полный проход (обе фазы) не произойдёт ни одного обмена — тогда массив отсортирован.',
    en: 'All comparisons are split into two non-overlapping groups by index: the "odd" phase compares pairs (1,2), (3,4), (5,6)... and the "even" phase compares pairs (0,1), (2,3), (4,5).... Within a single phase, no index is used twice, so every comparison in that phase can run simultaneously, independent of the others. The algorithm alternates odd and even phases until a full pass (both phases) makes no swaps at all — at which point the array is sorted.',
  },

  steps: [
    {
      title: { ru: 'Нечётная фаза', en: 'Odd phase' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами все пары (a[1],a[2]), (a[3],a[4]), (a[5],a[6])...',
        en: 'Compare and, if needed, swap every pair (a[1],a[2]), (a[3],a[4]), (a[5],a[6])...',
      },
    },
    {
      title: { ru: 'Чётная фаза', en: 'Even phase' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами все пары (a[0],a[1]), (a[2],a[3]), (a[4],a[5])...',
        en: 'Compare and, if needed, swap every pair (a[0],a[1]), (a[2],a[3]), (a[4],a[5])...',
      },
    },
    {
      title: { ru: 'Отследить перестановки', en: 'Track swaps' },
      explanation: {
        ru: 'Запомнить, была ли хотя бы одна перестановка в течение обеих фаз этого прохода.',
        en: 'Remember whether at least one swap happened during either phase of this pass.',
      },
    },
    {
      title: { ru: 'Повторить обе фазы', en: 'Repeat both phases' },
      explanation: {
        ru: 'Повторять чередование нечётной и чётной фаз, пока происходят перестановки.',
        en: 'Keep alternating the odd and even phases as long as swaps occur.',
      },
    },
    {
      title: { ru: 'Остановиться', en: 'Stop' },
      explanation: {
        ru: 'Когда полный проход (обе фазы) не даёт ни одной перестановки, массив отсортирован.',
        en: 'When a full pass (both phases) produces no swaps, the array is sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function oddEvenSort(arr) {
  const a = [...arr];
  const n = a.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 1; i + 1 < n; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
      }
    }
    for (let i = 0; i + 1 < n; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
      }
    }
  }
  return a;
}`,
    python: `def odd_even_sort(arr):
    a = arr.copy()
    n = len(a)
    sorted_ = False

    while not sorted_:
        sorted_ = True
        for i in range(1, n - 1, 2):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                sorted_ = False
        for i in range(0, n - 1, 2):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                sorted_ = False
    return a`,
  },

  pros: [
    {
      ru: 'Сравнения внутри каждой фазы независимы друг от друга, поэтому алгоритм естественно распараллеливается — каждый процессор может обрабатывать свою пару без блокировок.',
      en: 'Comparisons within each phase are independent of one another, so the algorithm parallelizes naturally — each processor can handle its own pair without locking.',
    },
    {
      ru: 'Устойчив и сортирует на месте с O(1) дополнительной памяти, как и обычный bubble sort.',
      en: 'Stable and sorts in place with O(1) extra memory, same as plain bubble sort.',
    },
    {
      ru: 'Простая, регулярная структура сравнений делает алгоритм удобным для реализации в виде сортирующей сети или на SIMD/GPU-архитектурах.',
      en: 'The simple, regular comparison structure makes the algorithm convenient to implement as a sorting network or on SIMD/GPU architectures.',
    },
  ],
  cons: [
    {
      ru: 'В последовательном (не параллельном) исполнении остаётся O(n²), не давая никакого выигрыша по сравнению с обычным bubble sort.',
      en: 'In sequential (non-parallel) execution it remains O(n²), offering no gain over plain bubble sort.',
    },
    {
      ru: 'При аппаратной/параллельной реализации требует n процессоров или ядер для полного выигрыша — на обычном процессоре с одним потоком эта параллельность не используется.',
      en: 'A hardware/parallel implementation needs n processors or cores for the full benefit — on an ordinary single-threaded CPU, this parallelism goes unused.',
    },
    {
      ru: 'Как и bubble sort, страдает от «черепах» — маленьких элементов, застревающих в конце массива и требующих много проходов.',
      en: 'Like bubble sort, it suffers from "turtles" — small elements stuck near the end of the array that need many passes.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда доступно параллельное или SIMD-оборудование и нужна простая, регулярная схема сравнений без сложной логики зависимостей — например, в сортирующих сетях.',
      en: 'When parallel or SIMD hardware is available and a simple, regular comparison scheme without complex dependency logic is needed — for example, in sorting networks.',
    },
    {
      ru: 'Как учебный пример того, как переформулировать последовательный алгоритм (bubble sort) в параллельно-совместимую форму, разбив зависимые шаги на независимые группы.',
      en: 'As a teaching example of how to reformulate a sequential algorithm (bubble sort) into a parallel-friendly form by splitting dependent steps into independent groups.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Параллельные вычислительные архитектуры и transputer-сети (1980-е годы)** использовали чётно-нечётную сортировку как один из первых практических примеров параллельного алгоритма сортировки.',
      en: '**Parallel computing architectures and transputer networks (1980s)** used odd-even sort as one of the earliest practical examples of a parallel sorting algorithm.',
    },
    {
      ru: '**Сортирующие сети (sorting networks) и их аппаратные реализации** нередко используют чётно-нечётную схему сравнений как основу для регулярной, легко масштабируемой топологии компараторов.',
      en: '**Sorting networks and their hardware implementations** often use the odd-even comparison scheme as the basis for a regular, easily scalable comparator topology.',
    },
  ],

  relatedAlgorithms: ['bubble-sort', 'cocktail-shaker-sort'],

  quiz: [
    {
      question: {
        ru: 'Какие пары индексов сравниваются на «нечётной» фазе?',
        en: 'Which index pairs are compared during the "odd" phase?',
      },
      options: [
        { ru: '(1,2), (3,4), (5,6) и так далее', en: '(1,2), (3,4), (5,6), and so on' },
        { ru: '(0,1), (2,3), (4,5) и так далее', en: '(0,1), (2,3), (4,5), and so on' },
        { ru: 'Все возможные пары сразу', en: 'All possible pairs at once' },
        { ru: 'Только пара (0, n-1)', en: 'Only the pair (0, n-1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нечётная фаза начинается с индекса 1 и сравнивает соседние пары, не пересекаясь по индексам, что позволяет выполнять их одновременно.',
        en: 'The odd phase starts at index 1 and compares neighboring pairs that never share an index, which is what allows them to run simultaneously.',
      },
    },
    {
      question: {
        ru: 'Почему сравнения внутри одной фазы можно выполнять параллельно?',
        en: 'Why can comparisons within a single phase run in parallel?',
      },
      options: [
        {
          ru: 'Ни один индекс не участвует в двух парах одновременно внутри одной фазы',
          en: 'No index participates in two pairs at once within a single phase',
        },
        { ru: 'Потому что массив уже почти отсортирован, как это часто предполагается перед последним проходом', en: 'Because the array is already nearly sorted, as is often assumed right before the final pass' },
        { ru: 'Потому что используется случайный выбор пар на каждой итерации, как в рандомизированной сортировке', en: 'Because pairs are chosen randomly on every iteration, as in a randomized sort' },
        { ru: 'Параллельность здесь невозможна в принципе, так как сравнения всегда зависят друг от друга', en: 'Parallelism isn\'t actually possible here, since comparisons always depend on one another' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отсутствие пересечения по индексам — ключевое свойство, которое устраняет зависимости между сравнениями внутри фазы.',
        en: 'The lack of overlapping indices is the key property that removes dependencies between comparisons within a phase.',
      },
    },
    {
      question: {
        ru: 'Когда чётно-нечётная сортировка останавливается?',
        en: 'When does odd-even sort stop?',
      },
      options: [
        {
          ru: 'Когда полный проход (обе фазы) не произвёл ни одной перестановки',
          en: 'When a full pass (both phases) produces no swaps',
        },
        { ru: 'После ровно n/2 проходов, независимо от того, как расположены элементы', en: 'After exactly n/2 passes, regardless of how the elements are arranged' },
        { ru: 'Когда встречается первый уже отсортированный элемент где-то в середине массива', en: 'When the first already-sorted element is found somewhere in the middle of the array' },
        { ru: 'Никогда — алгоритм не имеет условия остановки и должен прерываться извне', en: 'Never — the algorithm has no stopping condition and must be interrupted externally' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и в bubble sort, отсутствие перестановок на полном проходе — надёжный признак того, что массив отсортирован.',
        en: 'As in bubble sort, no swaps during a full pass is a reliable sign the array is sorted.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность чётно-нечётной сортировки при обычном последовательном выполнении?',
        en: 'What is the time complexity of odd-even sort under ordinary sequential execution?',
      },
      options: [
        { ru: 'O(n²), как у обычной пузырьковой сортировки', en: 'O(n²), same as plain bubble sort' },
        { ru: 'O(n log n), как у merge sort благодаря чередованию фаз', en: 'O(n log n), same as merge sort thanks to the alternating phases' },
        { ru: 'O(n), благодаря параллельности, доступной даже на одном ядре', en: 'O(n), thanks to the parallelism, even available on a single core' },
        { ru: 'O(log n), поскольку число фаз растёт логарифмически', en: 'O(log n), since the number of phases grows logarithmically' },
      ],
      correct: 0,
      explanation: {
        ru: 'Параллельность снижает сложность только при наличии реального параллельного оборудования; на одном ядре число операций остаётся квадратичным.',
        en: 'The parallelism only reduces complexity given real parallel hardware; on a single core, the operation count stays quadratic.',
      },
    },
    {
      question: {
        ru: 'В какой области чётно-нечётная сортировка находит наибольшее практическое применение?',
        en: 'Where does odd-even sort find its greatest practical use?',
      },
      options: [
        {
          ru: 'В сортирующих сетях и параллельных/аппаратных архитектурах',
          en: 'In sorting networks and parallel/hardware architectures',
        },
        { ru: 'В сортировке больших текстовых файлов на диске, где важна последовательность операций', en: 'In sorting large text files on disk, where sequential operation order matters' },
        { ru: 'В базах данных с одним потоком выполнения и без параллельных операций', en: 'In single-threaded databases with no parallel operations' },
        { ru: 'В сжатии видео, где нужна быстрая последовательная обработка кадров', en: 'In video compression, where fast sequential frame processing is needed' },
      ],
      correct: 0,
      explanation: {
        ru: 'Регулярная, независимая структура сравнений именно то, что нужно для эффективной аппаратной или SIMD-реализации.',
        en: 'The regular, independent comparison structure is exactly what an efficient hardware or SIMD implementation needs.',
      },
    },
  ],
};

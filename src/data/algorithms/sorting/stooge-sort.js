export const stoogeSort = {
  slug: 'stooge-sort',
  category: 'sorting',
  name: { ru: 'Стуз-сортировка', en: 'Stooge Sort' },
  complexity: {
    time: { best: 'O(n^2.7095)', average: 'O(n^2.7095)', worst: 'O(n^2.7095)' },
    space: 'O(log n)',
  },
  popularity: 1,
  tags: ['joke', 'recursive', 'inefficient', 'educational'],

  intent: {
    ru: 'Стуз-сортировка — намеренно неэффективный рекурсивный алгоритм: он сравнивает и при необходимости меняет местами лишь крайние элементы диапазона, а затем трижды рекурсивно обрабатывает пересекающиеся две трети диапазона — интересный не практической пользой, а тем, насколько простая на вид рекурсия может давать почти кубическую сложность.',
    en: "Stooge sort is a deliberately inefficient recursive algorithm: it compares and, if needed, swaps only the outermost elements of a range, then recursively processes three overlapping two-thirds of the range — interesting not for practical use but for how a simple-looking recursion can yield near-cubic complexity.",
  },

  problem: {
    ru: 'Многие эффективные сортировки делят массив на непересекающиеся половины или трети и обрабатывают их независимо. Что произойдёт, если вместо непересекающихся частей рекурсивно обрабатывать перекрывающиеся две трети диапазона — сначала первые 2/3, потом последние 2/3, потом снова первые 2/3? Формально это всё ещё корректно сортирует массив, но перекрытие означает огромную избыточную работу: значительная часть элементов обрабатывается заново по несколько раз на каждом уровне рекурсии.',
    en: 'Many efficient sorts split the array into non-overlapping halves or thirds and process them independently. What happens if, instead of non-overlapping parts, we recursively process overlapping two-thirds of the range — first the first 2/3, then the last 2/3, then the first 2/3 again? Formally this still correctly sorts the array, but the overlap means enormous redundant work: a large fraction of elements gets reprocessed multiple times at every level of recursion.',
  },

  solution: {
    ru: 'Для диапазона [lo, hi] сначала сравниваются крайние элементы: если a[lo] больше a[hi], они меняются местами — это гарантирует, что после всей обработки наибольший элемент диапазона не окажется в начале. Если в диапазоне больше двух элементов, вычисляется треть его длины t, и рекурсивно обрабатываются три перекрывающихся поддиапазона: первые две трети [lo, hi−t], последние две трети [lo+t, hi], и снова первые две трети [lo, hi−t]. Такое тройное перекрывающееся применение гарантирует корректность (это доказуемо, хотя и не очевидно с первого взгляда), но приводит к сложности порядка O(n^log(3)/log(1.5)) ≈ O(n^2.71) — гораздо хуже, чем даже пузырьковая сортировка.',
    en: "For a range [lo, hi], the outer elements are first compared: if a[lo] is greater than a[hi], they're swapped — this guarantees the largest element of the range won't end up at the start after processing. If the range has more than two elements, its length's third t is computed, and three overlapping subranges are recursively processed: the first two-thirds [lo, hi−t], the last two-thirds [lo+t, hi], and the first two-thirds again [lo, hi−t]. This triple overlapping application guarantees correctness (provable, though not obvious at a glance), but results in complexity on the order of O(n^log(3)/log(1.5)) ≈ O(n^2.71) — far worse than even bubble sort.",
  },

  steps: [
    {
      title: { ru: 'Сравнить крайние элементы диапазона', en: 'Compare the range\'s outer elements' },
      explanation: {
        ru: 'Если первый элемент диапазона больше последнего, поменять их местами.',
        en: "If the range's first element is greater than its last, swap them.",
      },
    },
    {
      title: { ru: 'Проверить размер диапазона', en: 'Check the range size' },
      explanation: {
        ru: 'Если в диапазоне два или меньше элементов, обработка этого диапазона завершена.',
        en: "If the range has two or fewer elements, processing of this range is done.",
      },
    },
    {
      title: { ru: 'Рекурсивно обработать первые две трети', en: 'Recursively process the first two-thirds' },
      explanation: {
        ru: 'Вычислить треть длины диапазона и рекурсивно вызвать сортировку на первых двух третях.',
        en: "Compute a third of the range's length and recursively sort its first two-thirds.",
      },
    },
    {
      title: { ru: 'Рекурсивно обработать последние две трети', en: 'Recursively process the last two-thirds' },
      explanation: {
        ru: 'Рекурсивно вызвать сортировку на последних двух третях того же диапазона.',
        en: 'Recursively sort the last two-thirds of the same range.',
      },
    },
    {
      title: { ru: 'Снова обработать первые две трети', en: 'Process the first two-thirds again' },
      explanation: {
        ru: 'Повторно рекурсивно вызвать сортировку на первых двух третях, чтобы гарантировать корректность после предыдущих двух шагов.',
        en: 'Recursively sort the first two-thirds once more, to guarantee correctness after the previous two steps.',
      },
    },
  ],

  implementation: {
    javascript: `function stoogeSort(arr) {
  const a = [...arr];

  function rec(lo, hi) {
    if (a[lo] > a[hi]) {
      [a[lo], a[hi]] = [a[hi], a[lo]];
    }
    if (hi - lo + 1 > 2) {
      const t = Math.floor((hi - lo + 1) / 3);
      rec(lo, hi - t);
      rec(lo + t, hi);
      rec(lo, hi - t);
    }
  }

  if (a.length > 1) rec(0, a.length - 1);
  return a;
}`,
    python: `def stooge_sort(arr):
    a = list(arr)

    def rec(lo, hi):
        if a[lo] > a[hi]:
            a[lo], a[hi] = a[hi], a[lo]
        if hi - lo + 1 > 2:
            t = (hi - lo + 1) // 3
            rec(lo, hi - t)
            rec(lo + t, hi)
            rec(lo, hi - t)

    if len(a) > 1:
        rec(0, len(a) - 1)
    return a`,
  },

  pros: [
    {
      ru: 'Реализация предельно короткая и рекурсия концептуально проста — интересный пример того, что «простой код» и «эффективный код» не одно и то же.',
      en: 'The implementation is extremely short and the recursion is conceptually simple — an interesting example that "simple code" and "efficient code" are not the same thing.',
    },
    {
      ru: 'Корректность доказывается индукцией по перекрывающимся третям — хорошая учебная задача на доказательство корректности рекурсивных алгоритмов.',
      en: "Correctness is proved by induction over the overlapping thirds — a good exercise in proving correctness of recursive algorithms.",
    },
    {
      ru: 'Требует лишь O(log n) дополнительной памяти на стек рекурсии, в отличие от многих других намеренно неэффективных алгоритмов.',
      en: 'Requires only O(log n) extra memory for the recursion stack, unlike many other deliberately inefficient algorithms.',
    },
  ],
  cons: [
    {
      ru: 'Сложность порядка O(n^2.71) хуже, чем у пузырьковой или сортировки вставками (O(n²)) — практически нет сценария, где Стуз-сортировка была бы предпочтительнее их.',
      en: "Complexity on the order of O(n^2.71) is worse than bubble or insertion sort (O(n²)) — there is virtually no scenario where stooge sort would be preferable to them.",
    },
    {
      ru: 'Тройное перекрывающееся рекурсивное применение к двум третям диапазона порождает огромную избыточную работу — большая часть элементов обрабатывается заново по несколько раз.',
      en: 'The triple overlapping recursive application to two-thirds of the range creates enormous redundant work — most elements get reprocessed several times.',
    },
    {
      ru: 'Существует исключительно в учебных и шуточных целях; ни одна известная реальная система не использует его для сортировки данных.',
      en: 'Exists purely for educational and joke purposes; no known real-world system uses it to sort data.',
    },
  ],

  whenToUse: [
    {
      ru: 'Никогда в реальных задачах — как и Бого-сортировка, Стуз-сортировка существует исключительно как учебный и шуточный пример.',
      en: 'Never in real tasks — like bogosort, stooge sort exists purely as an educational and joke example.',
    },
    {
      ru: 'В обучении рекурсии и анализу сложности — хороший пример того, как перекрывающиеся подзадачи (в отличие от непересекающихся, как в сортировке слиянием) резко ухудшают асимптотику.',
      en: "In teaching recursion and complexity analysis — a good example of how overlapping subproblems (unlike the non-overlapping ones in merge sort) drastically worsen the asymptotics.",
    },
  ],

  realWorldExamples: [
    {
      ru: '**Курсы по анализу алгоритмов** нередко используют Стуз-сортировку как задачу на вывод рекуррентного соотношения T(n) = 3T(2n/3) + O(1) и его решение методом основной теоремы.',
      en: '**Algorithm analysis courses** often use stooge sort as an exercise in deriving the recurrence T(n) = 3T(2n/3) + O(1) and solving it with the master theorem.',
    },
    {
      ru: '**Списки «алгоритмов-приколов»** в сообществе программистов регулярно упоминают Стуз-сортировку рядом с Бого-сортировкой как пример нарочито плохого дизайна.',
      en: '**"Joke algorithm" lists** in the programming community regularly mention stooge sort alongside bogosort as an example of deliberately bad design.',
    },
  ],

  relatedAlgorithms: ['bogosort', 'bubble-sort', 'gnome-sort'],

  quiz: [
    {
      question: {
        ru: 'Что сравнивается и при необходимости меняется местами на каждом шаге Стуз-сортировки?',
        en: 'What is compared and, if needed, swapped at each step of stooge sort?',
      },
      options: [
        { ru: 'Первый и последний элементы текущего диапазона', en: "The first and last elements of the current range" },
        { ru: 'Два соседних элемента', en: 'Two adjacent elements' },
        { ru: 'Средний элемент с первым', en: 'The middle element with the first' },
        { ru: 'Максимум и минимум всего массива', en: 'The maximum and minimum of the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если первый элемент диапазона больше последнего, они меняются местами — это единственное фактическое сравнение на каждом уровне.',
        en: "If the range's first element is greater than its last, they are swapped — this is the only actual comparison at each level.",
      },
    },
    {
      question: {
        ru: 'На какие подзадачи рекурсивно делится диапазон в Стуз-сортировке?',
        en: 'Into what subproblems is the range recursively split in stooge sort?',
      },
      options: [
        { ru: 'На три перекрывающихся вызова: первые 2/3, последние 2/3, снова первые 2/3', en: 'Three overlapping calls: the first 2/3, the last 2/3, the first 2/3 again' },
        { ru: 'На две непересекающиеся половины', en: 'Two non-overlapping halves' },
        { ru: 'На n непересекающихся частей по одному элементу', en: 'n non-overlapping single-element parts' },
        { ru: 'На случайно выбранные подмассивы', en: 'Randomly chosen subarrays' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно перекрытие двух третей — а не непересекающееся деление, как в сортировке слиянием — отличает Стуз-сортировку и объясняет её плохую асимптотику.',
        en: "It's exactly the overlap of the two-thirds — not a non-overlapping split like in merge sort — that defines stooge sort and explains its poor asymptotics.",
      },
    },
    {
      question: {
        ru: 'Какова асимптотическая сложность Стуз-сортировки?',
        en: 'What is the asymptotic complexity of stooge sort?',
      },
      options: [
        { ru: 'O(n^2.71), хуже, чем у пузырьковой сортировки', en: 'O(n^2.71), worse than bubble sort' },
        { ru: 'O(n log n), как у сортировки слиянием', en: 'O(n log n), like merge sort' },
        { ru: 'O(n), линейная', en: 'O(n), linear' },
        { ru: 'O(n²), точно как у пузырьковой сортировки', en: 'O(n²), exactly like bubble sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Решение рекуррентного соотношения T(n) = 3T(2n/3) + O(1) даёт показатель степени log(3)/log(1.5) ≈ 2.71.',
        en: 'Solving the recurrence T(n) = 3T(2n/3) + O(1) gives the exponent log(3)/log(1.5) ≈ 2.71.',
      },
    },
    {
      question: {
        ru: 'Почему, несмотря на плохую сложность, Стуз-сортировка вообще корректно сортирует массив?',
        en: 'Why, despite its poor complexity, does stooge sort correctly sort the array at all?',
      },
      options: [
        {
          ru: 'Тройное перекрывающееся применение к двум третям диапазона доказуемо гарантирует правильный порядок',
          en: 'The triple overlapping application to two-thirds of the range provably guarantees correct ordering',
        },
        { ru: 'Она на самом деле не гарантирует корректность в общем случае', en: 'It actually does not guarantee correctness in general' },
        { ru: 'Потому что сначала выполняется отдельный проход сортировки вставками', en: 'Because a separate insertion sort pass runs first' },
        { ru: 'Только для чётного числа элементов', en: 'Only for an even number of elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Хотя это не очевидно на интуитивном уровне, тройное перекрывающееся рекурсивное применение можно строго доказать корректным индукцией по размеру диапазона.',
        en: 'Although not intuitively obvious, the triple overlapping recursive application can be rigorously proved correct by induction on the range size.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует Стуз-сортировка?',
        en: 'How much extra memory does stooge sort require?',
      },
      options: [
        { ru: 'O(log n) на стек рекурсии', en: 'O(log n) for the recursion stack' },
        { ru: 'O(n) на вспомогательный массив', en: 'O(n) for an auxiliary array' },
        { ru: 'O(n²) на матрицу сравнений', en: 'O(n²) for a comparison matrix' },
        { ru: 'O(1), рекурсия не используется', en: 'O(1), no recursion is used' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка выполняется на месте, а дополнительная память уходит только на глубину рекурсивных вызовов.',
        en: 'The sort runs in place, and the only extra memory goes to the depth of the recursive calls.',
      },
    },
  ],
};

export const bucketSort = {
  slug: 'bucket-sort',
  category: 'sorting',
  name: { ru: 'Bucket Sort', en: 'Bucket Sort' },
  complexity: {
    time: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    space: 'O(n + k)',
  },
  popularity: 1,
  tags: ['non-comparison', 'distribution', 'stable'],

  intent: {
    ru: 'Блочная сортировка распределяет элементы по нескольким «корзинам» (bucket) в соответствии с их значением, сортирует каждую корзину отдельно (обычно простым алгоритмом), а затем соединяет корзины по порядку.',
    en: 'Bucket sort distributes elements into several "buckets" based on their value, sorts each bucket individually (usually with a simple algorithm), then concatenates the buckets in order.',
  },

  problem: {
    ru: 'Сортировка подсчётом и поразрядная сортировка отлично работают с целыми числами, но что делать с равномерно распределёнными вещественными числами, скажем, в диапазоне [0, 1)? Считать по каждому значению бессмысленно — значений бесконечно много. Нужен способ использовать знание о распределении данных, не требуя дискретных ключей.',
    en: 'Counting sort and radix sort work great with integers, but what about uniformly distributed floating-point numbers, say in the range [0, 1)? Counting each individual value makes no sense — there are infinitely many. A way is needed to exploit knowledge of the data\'s distribution without requiring discrete keys.',
  },

  solution: {
    ru: 'Диапазон возможных значений делится на k равных интервалов — «корзин». Каждый элемент попадает в корзину, соответствующую его значению (например, `floor(value * k)` для чисел из [0, 1)). Если исходные данные распределены равномерно, в каждой корзине окажется примерно n/k элементов — небольшое количество, которое можно быстро отсортировать простым алгоритмом (обычно insertion sort, эффективным на маленьких массивах). После сортировки всех корзин их содержимое просто соединяется по порядку от первой к последней — результат уже отсортирован.',
    en: 'The range of possible values is divided into k equal intervals — "buckets." Each element lands in the bucket matching its value (e.g. `floor(value * k)` for numbers in [0, 1)). If the source data is uniformly distributed, each bucket ends up with roughly n/k elements — a small amount that a simple algorithm (usually insertion sort, efficient on small arrays) can sort quickly. After all buckets are sorted, their contents are simply concatenated from first to last — the result is already sorted.',
  },

  steps: [
    {
      title: { ru: 'Создать пустые корзины', en: 'Create empty buckets' },
      explanation: {
        ru: 'Выделить k пустых корзин, покрывающих весь диапазон значений входного массива.',
        en: 'Allocate k empty buckets spanning the full value range of the input array.',
      },
    },
    {
      title: { ru: 'Разложить элементы по корзинам', en: 'Distribute elements into buckets' },
      explanation: {
        ru: 'Для каждого элемента вычислить индекс его корзины по значению и добавить элемент туда.',
        en: 'For each element, compute its bucket index from its value and append the element there.',
      },
    },
    {
      title: { ru: 'Отсортировать каждую корзину', en: 'Sort each bucket' },
      explanation: {
        ru: 'Применить простой алгоритм сортировки (например, insertion sort) к содержимому каждой отдельной корзины.',
        en: 'Apply a simple sorting algorithm (e.g. insertion sort) to the contents of each individual bucket.',
      },
    },
    {
      title: { ru: 'Соединить корзины по порядку', en: 'Concatenate buckets in order' },
      explanation: {
        ru: 'Пройти корзины от первой к последней и выписать их отсортированное содержимое в итоговый массив.',
        en: 'Walk the buckets from first to last, writing their sorted contents into the final array.',
      },
    },
    {
      title: { ru: 'Вернуть результат', en: 'Return the result' },
      explanation: {
        ru: 'Так как корзины упорядочены по диапазону, а каждая корзина отсортирована внутри себя, итоговый массив полностью отсортирован.',
        en: 'Since buckets are ordered by range, and each bucket is sorted internally, the final array is fully sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function bucketSort(arr, bucketCount = Math.ceil(Math.sqrt(arr.length)) || 1) {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = (max - min + 1) / bucketCount || 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  for (const value of arr) {
    let idx = Math.floor((value - min) / range);
    if (idx >= bucketCount) idx = bucketCount - 1;
    buckets[idx].push(value);
  }

  return buckets.flatMap((bucket) => bucket.sort((a, b) => a - b));
}`,
    python: `def bucket_sort(arr, bucket_count=None):
    if not arr:
        return []
    bucket_count = bucket_count or max(1, int(len(arr) ** 0.5))
    lo, hi = min(arr), max(arr)
    span = (hi - lo + 1) / bucket_count or 1
    buckets = [[] for _ in range(bucket_count)]

    for value in arr:
        idx = min(int((value - lo) / span), bucket_count - 1)
        buckets[idx].append(value)

    result = []
    for bucket in buckets:
        result.extend(sorted(bucket))
    return result`,
  },

  pros: [
    {
      ru: 'При равномерно распределённых данных даёт среднюю сложность O(n + k), обгоняя сравнивающие сортировки.',
      en: 'With uniformly distributed data, achieves O(n + k) average complexity, beating comparison sorts.',
    },
    {
      ru: 'Легко распараллеливается: каждую корзину можно сортировать независимо на отдельном потоке или ядре.',
      en: 'Easy to parallelize: each bucket can be sorted independently on a separate thread or core.',
    },
    {
      ru: 'Гибок в выборе внутреннего алгоритма сортировки корзин — можно подобрать его под характер данных.',
      en: 'Flexible in the choice of inner bucket-sorting algorithm — it can be tuned to the data\'s characteristics.',
    },
  ],
  cons: [
    {
      ru: 'Сильно зависит от распределения входных данных: при сильно неравномерном распределении почти все элементы попадут в одну корзину, и сложность деградирует до O(n²).',
      en: 'Heavily dependent on the input distribution: with a strongly skewed distribution, almost all elements land in one bucket, degrading complexity to O(n²).',
    },
    {
      ru: 'Требует дополнительной памяти O(n + k) под корзины, в отличие от сортировок на месте.',
      en: 'Needs O(n + k) extra memory for the buckets, unlike in-place sorts.',
    },
    {
      ru: 'Нужно заранее знать диапазон и приблизительный характер распределения значений, чтобы выбрать разумное число и границы корзин.',
      en: 'Requires knowing the value range and rough distribution shape in advance to choose a sensible bucket count and boundaries.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные заведомо равномерно распределены на известном интервале — измерения датчиков, случайные числа, нормализованные оценки.',
      en: 'When the data is known to be uniformly distributed over a known interval — sensor readings, random numbers, normalized scores.',
    },
    {
      ru: 'Когда сортировку нужно распараллелить, а данные естественно разбиваются на независимые диапазоны.',
      en: 'When the sort needs to be parallelized and the data naturally splits into independent ranges.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Обработка больших объёмов числовых измерений** (научные вычисления, финансовые тики) с заранее известным диапазоном значений и равномерным разбросом.',
      en: '**Large-scale numeric measurement processing** (scientific computing, financial ticks) with a known value range and uniform spread.',
    },
    {
      ru: '**Распределённые системы обработки данных** (аналог MapReduce) используют идею блочной сортировки: данные «разбрасываются» по узлам-корзинам по диапазону ключа, каждый узел сортирует свою часть независимо.',
      en: '**Distributed data processing systems** (MapReduce-style) apply the bucket-sort idea: data is scattered across bucket nodes by key range, and each node sorts its share independently.',
    },
  ],

  relatedAlgorithms: ['counting-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'От чего сильнее всего зависит производительность блочной сортировки?',
        en: 'What does bucket sort\'s performance depend on most?',
      },
      options: [
        { ru: 'От того, насколько равномерно распределены входные данные', en: 'How uniformly the input data is distributed' },
        { ru: 'От того, отсортирован ли массив изначально перед запуском алгоритма', en: 'Whether the array is already sorted before the algorithm starts running' },
        { ru: 'От выбора конкретного языка программирования для реализации', en: 'The choice of programming language used for the implementation' },
        { ru: 'От того, чётное или нечётное количество элементов в массиве', en: 'Whether the number of elements in the array is even or odd' },
      ],
      correct: 0,
      explanation: {
        ru: 'При равномерном распределении элементы поровну распределяются по корзинам, каждая корзина маленькая, и сортировка каждой из них быстрая. При перекошенном распределении почти все элементы могут попасть в одну корзину.',
        en: 'With uniform distribution, elements spread evenly across buckets, each bucket is small, and sorting each is fast. With skewed distribution, nearly everything can land in one bucket.',
      },
    },
    {
      question: {
        ru: 'Что происходит с производительностью, если почти все элементы попадают в одну корзину?',
        en: 'What happens to performance if nearly all elements land in one bucket?',
      },
      options: [
        { ru: 'Сложность деградирует до O(n²) — как у сортировки одной большой корзины', en: 'Complexity degrades to O(n²) — like sorting one large bucket' },
        { ru: 'Алгоритм завершается с ошибкой переполнения буфера корзины', en: 'The algorithm crashes with a bucket buffer overflow error' },
        { ru: 'Ничего не меняется, сложность так и остаётся линейной O(n + k)', en: 'Nothing changes, complexity stays exactly linear at O(n + k)' },
        { ru: 'Сложность неожиданно улучшается до O(log n)', en: 'Complexity unexpectedly improves down to O(log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если одна корзина содержит почти все n элементов, внутренняя сортировка (например, insertion sort) выполняется за O(n²) на этой корзине — распределение по корзинам не дало никакого выигрыша.',
        en: 'If one bucket holds nearly all n elements, the inner sort (e.g. insertion sort) runs in O(n²) on that bucket — distributing into buckets gave no benefit.',
      },
    },
    {
      question: {
        ru: 'Какой алгоритм обычно используют для сортировки содержимого отдельной корзины?',
        en: 'Which algorithm is typically used to sort the contents of an individual bucket?',
      },
      options: [
        { ru: 'Простой алгоритм вроде insertion sort — корзины обычно маленькие', en: 'A simple algorithm like insertion sort — buckets are usually small' },
        { ru: 'Обязательно merge sort, независимо от размера отдельной корзины', en: 'Merge sort, mandatorily, no matter how small the individual bucket is' },
        { ru: 'Ещё один рекурсивный вызов самой блочной сортировки заново', en: 'Another recursive call back into bucket sort itself, applied again' },
        { ru: 'Сортировка вообще не нужна — все корзины уже гарантированно упорядочены', en: 'No sorting is needed inside a bucket, they are already guaranteed ordered' },
      ],
      correct: 0,
      explanation: {
        ru: 'При равномерном распределении каждая корзина содержит примерно n/k элементов — на таких маленьких массивах простые O(n²) алгоритмы вроде insertion sort работают быстро и с минимальными накладными расходами.',
        en: 'With uniform distribution, each bucket holds roughly n/k elements — on such small arrays, simple O(n²) algorithms like insertion sort run fast with minimal overhead.',
      },
    },
    {
      question: {
        ru: 'Почему блочную сортировку легко распараллелить?',
        en: 'Why is bucket sort easy to parallelize?',
      },
      options: [
        { ru: 'Корзины независимы друг от друга и могут сортироваться одновременно', en: 'Buckets are independent of each other and can be sorted simultaneously' },
        { ru: 'Алгоритм в принципе не использует никакой дополнительной памяти вообще', en: 'The algorithm uses no extra memory whatsoever in any implementation at all' },
        { ru: 'Он полностью реализован без единого цикла в коде', en: 'It contains no loops at all anywhere in its implementation' },
        { ru: 'Он способен обрабатывать только один элемент за один проход', en: 'It only works on one element at a time during any given pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'После распределения элементов по корзинам сортировка каждой корзины не зависит от других — их можно раздать по потокам или узлам вычислительного кластера.',
        en: 'Once elements are distributed into buckets, sorting each bucket doesn\'t depend on the others — they can be handed off to separate threads or cluster nodes.',
      },
    },
    {
      question: {
        ru: 'Чем блочная сортировка принципиально отличается от сортировки подсчётом?',
        en: 'What fundamentally distinguishes bucket sort from counting sort?',
      },
      options: [
        { ru: 'Корзина представляет диапазон значений, а не одно конкретное значение', en: 'A bucket represents a range of values, not one specific value' },
        { ru: 'Блочная сортировка работает исключительно с отрицательными числами и ничем иным', en: 'Bucket sort only works with negative numbers and nothing else at all' },
        { ru: 'Блочная сортировка вообще не требует никакой дополнительной памяти для работы', en: 'Bucket sort needs no extra memory at all to run, unlike counting sort does' },
        { ru: 'Между ними по сути нет никакой значимой разницы вообще', en: 'There is essentially no meaningful difference between them at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'В counting sort каждой ячейке счётчика соответствует ровно одно значение; в bucket sort каждая корзина покрывает целый интервал значений, что делает её пригодной и для вещественных чисел.',
        en: 'In counting sort, each counter slot maps to exactly one value; in bucket sort, each bucket spans a whole interval of values, which makes it suitable for floating-point numbers too.',
      },
    },
  ],
};

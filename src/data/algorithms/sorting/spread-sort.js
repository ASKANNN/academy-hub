export const spreadSort = {
  slug: 'spread-sort',
  category: 'sorting',
  name: { ru: 'Спред-сортировка', en: 'Spreadsort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n log(k/s))', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['hybrid', 'distribution', 'adaptive', 'in-place-fallback'],

  intent: {
    ru: 'Спред-сортировка — гибридный алгоритм, который на каждом уровне рекурсии выбирает между «распределением» элементов по корзинам (как в корзинной сортировке) и обычной сортировкой сравнениями для маленьких групп, адаптивно подстраиваясь под то, насколько равномерно распределены данные и насколько мала текущая группа.',
    en: 'Spreadsort is a hybrid algorithm that, at every level of recursion, chooses between "distributing" elements into buckets (as in bucket sort) and plain comparison-based sorting for small groups, adaptively deciding based on how evenly the data is spread and how small the current group is.',
  },

  problem: {
    ru: 'Корзинная сортировка быстра, когда данные распределены равномерно, но становится неэффективной, если после распределения по корзинам многие элементы всё равно попадают в одну и ту же корзину (неравномерные данные) — тогда рекурсивная корзинная сортировка каждой такой перегруженной корзины может выродиться в излишне глубокую рекурсию. С другой стороны, сортировка сравнениями (например, сортировка вставками) эффективна на маленьких группах, но медленна на больших. Хочется алгоритма, который сочетает сильные стороны обоих подходов и переключается между ними по ситуации.',
    en: "Bucket sort is fast when data is evenly distributed, but becomes inefficient if, after distributing into buckets, many elements still land in the same bucket (uneven data) — recursively bucket-sorting each such overloaded bucket can then degenerate into needlessly deep recursion. On the other hand, comparison-based sorting (e.g., insertion sort) is efficient on small groups but slow on large ones. What's wanted is an algorithm that combines the strengths of both approaches and switches between them as the situation calls for it.",
  },

  solution: {
    ru: 'Для текущего диапазона элементов вычисляется его размер. Если размер мал (например, не больше некоторого порога вроде 16), диапазон сортируется напрямую сортировкой вставками — для маленьких групп накладные расходы на организацию корзин того не стоят. Иначе элементы распределяются по корзинам по значению (как в корзинной сортировке), число корзин выбирается адаптивно (например, порядка квадратного корня от размера диапазона), а затем каждая заполненная корзина рекурсивно обрабатывается тем же способом — снова либо распределением, либо прямой сортировкой, в зависимости от её итогового размера.',
    en: "The size of the current element range is computed. If the size is small (say, no more than some threshold like 16), the range is sorted directly with insertion sort — for small groups, the overhead of setting up buckets isn't worth it. Otherwise, elements are distributed into buckets by value (as in bucket sort), with the bucket count chosen adaptively (for example, on the order of the square root of the range size), and each non-empty bucket is then recursively processed the same way — again either distributed further or sorted directly, depending on its resulting size.",
  },

  steps: [
    {
      title: { ru: 'Проверить размер диапазона', en: 'Check the range size' },
      explanation: {
        ru: 'Определить, достаточно ли мал текущий диапазон, чтобы отсортировать его напрямую.',
        en: 'Determine whether the current range is small enough to be sorted directly.',
      },
    },
    {
      title: { ru: 'Малый диапазон — сортировка вставками', en: 'Small range — insertion sort' },
      explanation: {
        ru: 'Если диапазон мал, отсортировать его сортировкой вставками и завершить обработку этого диапазона.',
        en: 'If the range is small, sort it with insertion sort and finish processing this range.',
      },
    },
    {
      title: { ru: 'Большой диапазон — распределить по корзинам', en: 'Large range — distribute into buckets' },
      explanation: {
        ru: 'Иначе вычислить минимум и максимум диапазона и распределить его элементы по адаптивному числу корзин.',
        en: 'Otherwise compute the range\'s minimum and maximum and distribute its elements into an adaptive number of buckets.',
      },
    },
    {
      title: { ru: 'Записать корзины по порядку', en: 'Write the buckets back in order' },
      explanation: {
        ru: 'Записать содержимое корзин обратно в массив по порядку от наименьшей к наибольшей.',
        en: 'Write the contents of the buckets back into the array in order from smallest to largest.',
      },
    },
    {
      title: { ru: 'Рекурсивно обработать каждую корзину', en: 'Recursively process each bucket' },
      explanation: {
        ru: 'Для каждой корзины повторить весь процесс — снова проверить размер и выбрать распределение либо прямую сортировку.',
        en: 'Repeat the whole process for each bucket — check the size again and choose distribution or direct sorting.',
      },
    },
  ],

  implementation: {
    javascript: `function spreadSort(arr) {
  const n = arr.length;
  const a = [...arr];
  const THRESHOLD = 16;

  function insertionSort(lo, hi) {
    for (let i = lo + 1; i < hi; i++) {
      const current = a[i];
      let j = i - 1;
      while (j >= lo && a[j] > current) {
        a[j + 1] = a[j];
        j--;
      }
      a[j + 1] = current;
    }
  }

  function sortRange(lo, hi) {
    const size = hi - lo;
    if (size <= THRESHOLD) {
      insertionSort(lo, hi);
      return;
    }

    let min = a[lo], max = a[lo];
    for (let i = lo + 1; i < hi; i++) {
      if (a[i] < min) min = a[i];
      if (a[i] > max) max = a[i];
    }
    if (min === max) return;

    const bucketCount = Math.max(2, Math.floor(Math.sqrt(size)));
    const span = (max - min + 1) / bucketCount;
    const buckets = Array.from({ length: bucketCount }, () => []);
    for (let i = lo; i < hi; i++) {
      let idx = Math.floor((a[i] - min) / span);
      if (idx >= bucketCount) idx = bucketCount - 1;
      buckets[idx].push(a[i]);
    }

    let idx = lo;
    for (const bucket of buckets) {
      const start = idx;
      for (const value of bucket) a[idx++] = value;
      sortRange(start, idx);
    }
  }

  sortRange(0, n);
  return a;
}`,
    python: `def spread_sort(arr):
    a = list(arr)
    n = len(a)
    THRESHOLD = 16

    def insertion_sort(lo, hi):
        for i in range(lo + 1, hi):
            current = a[i]
            j = i - 1
            while j >= lo and a[j] > current:
                a[j + 1] = a[j]
                j -= 1
            a[j + 1] = current

    def sort_range(lo, hi):
        size = hi - lo
        if size <= THRESHOLD:
            insertion_sort(lo, hi)
            return

        lo_val = min(a[lo:hi])
        hi_val = max(a[lo:hi])
        if lo_val == hi_val:
            return

        bucket_count = max(2, int(size ** 0.5))
        span = (hi_val - lo_val + 1) / bucket_count
        buckets = [[] for _ in range(bucket_count)]
        for i in range(lo, hi):
            idx = int((a[i] - lo_val) / span)
            if idx >= bucket_count:
                idx = bucket_count - 1
            buckets[idx].append(a[i])

        idx = lo
        for bucket in buckets:
            start = idx
            for value in bucket:
                a[idx] = value
                idx += 1
            sort_range(start, idx)

    sort_range(0, n)
    return a`,
  },

  pros: [
    {
      ru: 'На данных, распределённых достаточно равномерно, ведёт себя почти линейно — O(n) в лучшем случае, значительно быстрее универсальных O(n log n) сортировок сравнениями.',
      en: 'On sufficiently evenly distributed data, behaves close to linear — O(n) in the best case, notably faster than general-purpose O(n log n) comparison sorts.',
    },
    {
      ru: 'Порог перехода на сортировку вставками для маленьких групп устраняет главный недостаток чистой корзинной сортировки — избыточные накладные расходы на организацию корзин там, где они не окупаются.',
      en: 'The switch-to-insertion-sort threshold for small groups eliminates the main weakness of plain bucket sort — needless bucket-setup overhead where it doesn\'t pay off.',
    },
    {
      ru: 'В худшем случае деградирует не хуже, чем до O(n log n) — гораздо надёжнее, чем чистая корзинная сортировка, которая на сильно неравномерных данных может выродиться в O(n²).',
      en: 'In the worst case it degrades no further than O(n log n) — far more reliable than plain bucket sort, which can degenerate to O(n²) on heavily skewed data.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти под корзины на каждом уровне рекурсии — не сортирует на месте.',
      en: 'Requires O(n) extra memory for the buckets at each level of recursion — does not sort in place.',
    },
    {
      ru: 'Показанная реализация — упрощённый учебный вариант: оригинальный алгоритм Спредсорт (Стивен Росс, 2002) использует более тонкую адаптивную формулу выбора числа корзин на основе логарифма разброса значений, а не просто квадратный корень от размера.',
      en: 'The implementation shown is a simplified, educational variant: the original Spreadsort algorithm (Steven Ross, 2002) uses a more refined adaptive formula for choosing the bucket count, based on the logarithm of the value spread rather than simply the square root of the size.',
    },
    {
      ru: 'Требует, чтобы элементы поддерживали вычисление разности и деления (числовые или строковые ключи с определённой метрикой) — не подходит для произвольных объектов, сравнимых только оператором «меньше».',
      en: 'Requires elements to support subtraction and division (numeric or string keys with a well-defined metric) — not suited to arbitrary objects that only support "less than" comparisons.',
    },
  ],

  whenToUse: [
    {
      ru: 'При сортировке больших объёмов числовых данных, распределение которых заранее неизвестно и может быть как равномерным, так и сильно скошенным — там, где чистая корзинная сортировка рискованна, а сортировка сравнениями заведомо не использует структуру данных.',
      en: 'When sorting large volumes of numeric data whose distribution is unknown in advance and could be either even or heavily skewed — where plain bucket sort is risky and a comparison sort provably ignores the data\'s structure.',
    },
    {
      ru: 'В высокопроизводительных библиотеках общего назначения (сортировка чисел с плавающей точкой, целых чисел), где нужна одна реализация, устойчиво работающая быстрее O(n log n) в среднем случае без ручной настройки под конкретные данные.',
      en: 'In high-performance general-purpose libraries (sorting floating-point numbers, integers) where a single implementation is needed that reliably beats O(n log n) on average without manual tuning for specific data.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Библиотека Boost.Sort (C++)** включает промышленную реализацию Спредсорт как одну из доступных стратегий сортировки, применяемую как более быстрая альтернатива std::sort на подходящих числовых данных.',
      en: '**The Boost.Sort library (C++)** includes a production implementation of Spreadsort as one of its available sorting strategies, used as a faster alternative to std::sort on suitable numeric data.',
    },
    {
      ru: '**Обработка больших массивов геопространственных или сенсорных данных** нередко использует гибридные распределяющие сортировки вроде Спредсорт, поскольку значения там часто числовые и допускают адаптивное разбиение на корзины.',
      en: '**Processing large arrays of geospatial or sensor data** often uses hybrid distribution sorts like Spreadsort, since the values there are typically numeric and lend themselves to adaptive bucketing.',
    },
  ],

  relatedAlgorithms: ['bucket-sort', 'radix-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Между какими двумя стратегиями выбирает спред-сортировка на каждом уровне рекурсии?',
        en: 'Between which two strategies does spreadsort choose at each level of recursion?',
      },
      options: [
        {
          ru: 'Распределение по корзинам и сортировка вставками для маленьких групп',
          en: 'Distributing into buckets and insertion sort for small groups',
        },
        { ru: 'Быстрая сортировка и сортировка слиянием', en: 'Quicksort and merge sort' },
        { ru: 'Поразрядная сортировка по младшему и по старшему разряду', en: 'LSD radix sort and MSD radix sort' },
        { ru: 'Параллельное и последовательное выполнение', en: 'Parallel and sequential execution' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно это переключение между распределением и прямой сортировкой сравнениями для маленьких групп и делает алгоритм гибридным.',
        en: 'This switching between distribution and direct comparison sorting for small groups is exactly what makes the algorithm hybrid.',
      },
    },
    {
      question: {
        ru: 'Зачем нужен порог перехода на сортировку вставками для маленьких диапазонов?',
        en: 'Why is a threshold for switching to insertion sort on small ranges needed?',
      },
      options: [
        {
          ru: 'Накладные расходы на организацию корзин не окупаются для маленьких групп элементов',
          en: 'The overhead of setting up buckets isn\'t worth it for small groups of elements',
        },
        { ru: 'Сортировка вставками единственная работает с отрицательными числами', en: 'Insertion sort is the only one that works with negative numbers' },
        { ru: 'Без порога алгоритм даёт неверный результат', en: 'Without the threshold the algorithm produces an incorrect result' },
        { ru: 'Порог нужен только для строк', en: 'The threshold is only needed for strings' },
      ],
      correct: 0,
      explanation: {
        ru: 'На маленьких группах прямая сортировка сравнениями обычно быстрее, чем создание и заполнение корзин.',
        en: 'On small groups, direct comparison sorting is usually faster than creating and filling buckets.',
      },
    },
    {
      question: {
        ru: 'Что происходит, если элементы одного диапазона распределяются по корзинам крайне неравномерно (многие попадают в одну корзину)?',
        en: 'What happens if elements of one range are distributed into buckets very unevenly (many landing in one bucket)?',
      },
      options: [
        {
          ru: 'Эта перегруженная корзина рекурсивно обрабатывается тем же алгоритмом заново',
          en: 'That overloaded bucket is recursively processed by the same algorithm again',
        },
        { ru: 'Алгоритм сразу завершается с ошибкой', en: 'The algorithm immediately fails with an error' },
        { ru: 'Перегруженная корзина просто отбрасывается', en: 'The overloaded bucket is simply discarded' },
        { ru: 'Все корзины объединяются обратно без сортировки', en: 'All buckets are merged back without sorting' },
      ],
      correct: 0,
      explanation: {
        ru: 'Рекурсивная обработка каждой корзины (распределение снова или переход к сортировке вставками) — то, что защищает алгоритм от вырождения на неравномерных данных.',
        en: 'Recursively processing each bucket (distributing again or falling back to insertion sort) is exactly what protects the algorithm from degenerating on skewed data.',
      },
    },
    {
      question: {
        ru: 'Какова сложность спред-сортировки в худшем случае?',
        en: 'What is the worst-case complexity of spreadsort?',
      },
      options: [
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(log n)', en: 'O(log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Благодаря переходу на сортировку вставками для маленьких групп алгоритм не деградирует хуже O(n log n), в отличие от чистой корзинной сортировки.',
        en: 'Thanks to the fallback to insertion sort for small groups, the algorithm never degrades worse than O(n log n), unlike plain bucket sort.',
      },
    },
    {
      question: {
        ru: 'В какой библиотеке применяется промышленная реализация спред-сортировки?',
        en: 'In which library is a production implementation of spreadsort used?',
      },
      options: [
        { ru: 'Boost.Sort (C++)', en: 'Boost.Sort (C++)' },
        { ru: 'NumPy (Python)', en: 'NumPy (Python)' },
        { ru: 'lodash (JavaScript)', en: 'lodash (JavaScript)' },
        { ru: 'java.util.Collections (Java)', en: 'java.util.Collections (Java)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Boost.Sort включает Спредсорт как одну из доступных стратегий, оптимизированную для числовых данных.',
        en: 'Boost.Sort includes Spreadsort as one of its available strategies, optimized for numeric data.',
      },
    },
  ],
};

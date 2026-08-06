export const spreadSort = {
  slug: 'spread-sort',
  category: 'sorting',
  name: { ru: 'Spreadsort', en: 'Spreadsort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n log(k/s))', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['hybrid', 'distribution', 'adaptive', 'in-place-fallback'],

  intent: {
    ru: 'Спред-сортировка - гибридный алгоритм, который на каждом уровне рекурсии выбирает между «распределением» элементов по корзинам (как в корзинной сортировке) и обычной сортировкой сравнениями для маленьких групп, адаптивно подстраиваясь под то, насколько равномерно распределены данные и насколько мала текущая группа.',
    en: 'Spreadsort is a hybrid algorithm that, at every level of recursion, chooses between "distributing" elements into buckets (as in bucket sort) and plain comparison-based sorting for small groups, adaptively deciding based on how evenly the data is spread and how small the current group is.',
  },

  problem: {
    ru: 'Корзинная сортировка быстра, когда данные распределены равномерно, но становится неэффективной, если после распределения по корзинам многие элементы всё равно попадают в одну и ту же корзину (неравномерные данные) - тогда рекурсивная корзинная сортировка каждой такой перегруженной корзины может выродиться в излишне глубокую рекурсию. С другой стороны, сортировка сравнениями (например, сортировка вставками) эффективна на маленьких группах, но медленна на больших. Хочется алгоритма, который сочетает сильные стороны обоих подходов и переключается между ними по ситуации.',
    en: "Bucket sort is fast when data is evenly distributed, but becomes inefficient if, after distributing into buckets, many elements still land in the same bucket (uneven data) - recursively bucket-sorting each such overloaded bucket can then degenerate into needlessly deep recursion. On the other hand, comparison-based sorting (e.g., insertion sort) is efficient on small groups but slow on large ones. What's wanted is an algorithm that combines the strengths of both approaches and switches between them as the situation calls for it.",
  },

  solution: {
    ru: 'Для текущего диапазона элементов вычисляется его размер. Если размер мал (например, не больше некоторого порога вроде 16), диапазон сортируется напрямую сортировкой вставками - для маленьких групп накладные расходы на организацию корзин того не стоят. Иначе элементы распределяются по корзинам по значению (как в корзинной сортировке), число корзин выбирается адаптивно (например, порядка квадратного корня от размера диапазона), а затем каждая заполненная корзина рекурсивно обрабатывается тем же способом - снова либо распределением, либо прямой сортировкой, в зависимости от её итогового размера.',
    en: "The size of the current element range is computed. If the size is small (say, no more than some threshold like 16), the range is sorted directly with insertion sort - for small groups, the overhead of setting up buckets isn't worth it. Otherwise, elements are distributed into buckets by value (as in bucket sort), with the bucket count chosen adaptively (for example, on the order of the square root of the range size), and each non-empty bucket is then recursively processed the same way - again either distributed further or sorted directly, depending on its resulting size.",
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
      title: { ru: 'Малый диапазон - сортировка вставками', en: 'Small range - insertion sort' },
      explanation: {
        ru: 'Если диапазон мал, отсортировать его сортировкой вставками и завершить обработку этого диапазона.',
        en: 'If the range is small, sort it with insertion sort and finish processing this range.',
      },
    },
    {
      title: { ru: 'Большой диапазон - распределить по корзинам', en: 'Large range - distribute into buckets' },
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
        ru: 'Для каждой корзины повторить весь процесс - снова проверить размер и выбрать распределение либо прямую сортировку.',
        en: 'Repeat the whole process for each bucket - check the size again and choose distribution or direct sorting.',
      },
    },
  ],
  stepBreakpoints: [2, 10, 18, 25],

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
      ru: 'На данных, распределённых достаточно равномерно, ведёт себя почти линейно - O(n) в лучшем случае, значительно быстрее универсальных O(n log n) сортировок сравнениями.',
      en: 'On sufficiently evenly distributed data, behaves close to linear - O(n) in the best case, notably faster than general-purpose O(n log n) comparison sorts.',
    },
    {
      ru: 'Порог перехода на сортировку вставками для маленьких групп устраняет главный недостаток чистой корзинной сортировки - избыточные накладные расходы на организацию корзин там, где они не окупаются.',
      en: 'The switch-to-insertion-sort threshold for small groups eliminates the main weakness of plain bucket sort - needless bucket-setup overhead where it doesn\'t pay off.',
    },
    {
      ru: 'В худшем случае деградирует не хуже, чем до O(n log n) - гораздо надёжнее, чем чистая корзинная сортировка, которая на сильно неравномерных данных может выродиться в O(n²).',
      en: 'In the worst case it degrades no further than O(n log n) - far more reliable than plain bucket sort, which can degenerate to O(n²) on heavily skewed data.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти под корзины на каждом уровне рекурсии - не сортирует на месте.',
      en: 'Requires O(n) extra memory for the buckets at each level of recursion - does not sort in place.',
    },
    {
      ru: 'Показанная реализация - упрощённый учебный вариант: оригинальный алгоритм Спредсорт (Стивен Росс, 2002) использует более тонкую адаптивную формулу выбора числа корзин на основе логарифма разброса значений, а не просто квадратный корень от размера.',
      en: 'The implementation shown is a simplified, educational variant: the original Spreadsort algorithm (Steven Ross, 2002) uses a more refined adaptive formula for choosing the bucket count, based on the logarithm of the value spread rather than simply the square root of the size.',
    },
    {
      ru: 'Требует, чтобы элементы поддерживали вычисление разности и деления (числовые или строковые ключи с определённой метрикой) - не подходит для произвольных объектов, сравнимых только оператором «меньше».',
      en: 'Requires elements to support subtraction and division (numeric or string keys with a well-defined metric) - not suited to arbitrary objects that only support "less than" comparisons.',
    },
  ],

  whenToUse: [
    {
      ru: 'При сортировке больших объёмов числовых данных, распределение которых заранее неизвестно и может быть как равномерным, так и сильно скошенным - там, где чистая корзинная сортировка рискованна, а сортировка сравнениями заведомо не использует структуру данных.',
      en: 'When sorting large volumes of numeric data whose distribution is unknown in advance and could be either even or heavily skewed - where plain bucket sort is risky and a comparison sort provably ignores the data\'s structure.',
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
        { ru: 'Быстрая сортировка и сортировка слиянием, переключение между которыми происходит по размеру массива, как в интроспективной сортировке', en: 'Quicksort and merge sort, switching between them based on array size, as introspective sort does' },
        { ru: 'Поразрядная сортировка по младшему и по старшему разряду, выбор которой определяется диапазоном значений ключа', en: 'LSD radix sort and MSD radix sort, the choice of which depends on the key value range' },
        { ru: 'Параллельное и последовательное выполнение в зависимости от числа доступных ядер процессора', en: 'Parallel and sequential execution depending on the number of available processor cores' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно это переключение между распределением и прямой сортировкой сравнениями для маленьких групп и делает алгоритм гибридным.',
        en: 'This switching between distribution and direct comparison sorting for small groups is exactly what makes the algorithm hybrid.',
      },
      hint: {
        ru: 'Подумайте, какую операцию алгоритм выполняет над большой группой, а какую - над маленькой.',
        en: 'Think about what operation the algorithm performs on a large group versus a small one.',
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
        { ru: 'Сортировка вставками единственная из всех сортировок сравнениями работает с отрицательными числами', en: 'Insertion sort is the only comparison sort of all of them that works with negative numbers' },
        { ru: 'Без порога алгоритм даёт неверный результат, так как рекурсия никогда не завершается', en: 'Without the threshold the algorithm produces an incorrect result because the recursion never terminates' },
        { ru: 'Порог нужен только для строк, а для чисел его можно всегда опустить', en: 'The threshold is only needed for strings, and can always be omitted for numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'На маленьких группах прямая сортировка сравнениями обычно быстрее, чем создание и заполнение корзин.',
        en: 'On small groups, direct comparison sorting is usually faster than creating and filling buckets.',
      },
      hint: {
        ru: 'Вспомните, какова стоимость создания корзин относительно числа обрабатываемых элементов.',
        en: 'Consider the cost of creating buckets relative to the number of elements being processed.',
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
        { ru: 'Алгоритм сразу завершается с ошибкой, потому что не может выбрать число корзин', en: 'The algorithm immediately fails with an error because it cannot choose a bucket count' },
        { ru: 'Перегруженная корзина просто отбрасывается, а её элементы теряются безвозвратно', en: 'The overloaded bucket is simply discarded, and its elements are lost permanently' },
        { ru: 'Все корзины объединяются обратно без сортировки, как в поразрядной сортировке', en: 'All buckets are merged back without sorting, as in radix sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Рекурсивная обработка каждой корзины (распределение снова или переход к сортировке вставками) - то, что защищает алгоритм от вырождения на неравномерных данных.',
        en: 'Recursively processing each bucket (distributing again or falling back to insertion sort) is exactly what protects the algorithm from degenerating on skewed data.',
      },
      hint: {
        ru: 'Алгоритм применяет к каждой корзине тот же процесс, что и к исходному диапазону.',
        en: 'The algorithm applies the same process to each bucket as it does to the original range.',
      },
    },
    {
      question: {
        ru: 'Какова сложность спред-сортировки в худшем случае?',
        en: 'What is the worst-case complexity of spreadsort?',
      },
      options: [
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n²), как у пузырьковой сортировки на почти отсортированных данных', en: 'O(n²), same as bubble sort on nearly sorted data' },
        { ru: 'O(n), потому что корзины всегда распределяют элементы идеально равномерно', en: 'O(n), because buckets always distribute elements perfectly evenly' },
        { ru: 'O(log n), поскольку рекурсия делит диапазон пополам на каждом шаге', en: 'O(log n), since the recursion halves the range at every step' },
      ],
      correct: 0,
      explanation: {
        ru: 'Благодаря переходу на сортировку вставками для маленьких групп алгоритм не деградирует хуже O(n log n), в отличие от чистой корзинной сортировки.',
        en: 'Thanks to the fallback to insertion sort for small groups, the algorithm never degrades worse than O(n log n), unlike plain bucket sort.',
      },
      hint: {
        ru: 'Переход к сортировке сравнениями не позволяет алгоритму выйти за рамки классической теоретической границы.',
        en: 'The fallback to comparison sorting keeps the algorithm within the classical theoretical bound.',
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
      hint: {
        ru: 'Вспомните, в каком высокопроизводительном C++ фреймворке алгоритм получил промышленную реализацию.',
        en: 'Recall which high-performance C++ framework gave the algorithm a production-grade implementation.',
      },
    },
    {
      question: {
        ru: 'Как спред-сортировка определяет число корзин для текущего диапазона?',
        en: 'How does spreadsort determine the number of buckets for the current range?',
      },
      options: [
        { ru: 'Адаптивно, примерно как квадратный корень от размера диапазона', en: 'Adaptively, roughly as the square root of the range size' },
        { ru: 'Всегда фиксированное число - ровно 256 корзин на любой размер', en: 'Always a fixed count - exactly 256 buckets regardless of the size' },
        { ru: 'Равно числу различных значений, встречающихся в диапазоне', en: 'Equal to the count of distinct values occurring in the range' },
        { ru: 'Всегда два, потому что алгоритм всегда делит диапазон строго пополам', en: 'Always two, because the algorithm always divides the range exactly in half' },
      ],
      correct: 0,
      explanation: {
        ru: 'Адаптивный выбор числа корзин (порядка √size) балансирует между слишком большим числом пустых корзин и слишком маленьким числом перегруженных.',
        en: 'Choosing the bucket count adaptively (on the order of √size) balances between too many empty buckets and too few overloaded ones.',
      },
      hint: {
        ru: 'Подумайте, какая математическая функция от размера хорошо балансирует число корзин.',
        en: 'Think about which mathematical function of the size gives a good bucket count balance.',
      },
    },
    {
      question: {
        ru: 'Требует ли спред-сортировка, чтобы элементы поддерживали только операцию «меньше»?',
        en: 'Does spreadsort require elements to support only the "less than" comparison?',
      },
      options: [
        { ru: 'Нет - нужны также вычитание и деление для вычисления индекса корзины', en: 'No - subtraction and division are also needed to compute the bucket index' },
        { ru: 'Да, только оператор сравнения «меньше», как в любой сортировке сравнениями', en: 'Yes, only the less-than comparison operator, just like any comparison-based sort' },
        { ru: 'Нет - нужен только оператор равенства, сравнение «меньше» не требуется вообще', en: 'No - only equality is needed, less-than is not required at all' },
        { ru: 'Да, но дополнительно требуется поддержка битовых операций XOR и AND', en: 'Yes, but bitwise XOR and AND support is additionally required' },
      ],
      correct: 0,
      explanation: {
        ru: 'Распределение элементов по корзинам требует вычисления (a[i] − min) / span, поэтому элементы должны поддерживать арифметику, а не только сравнение.',
        en: 'Distributing elements into buckets requires computing (a[i] − min) / span, so elements must support arithmetic, not just comparison.',
      },
      hint: {
        ru: 'Вспомните формулу вычисления индекса корзины для конкретного элемента.',
        en: 'Recall the formula for computing a bucket index for a given element.',
      },
    },
    {
      question: {
        ru: 'Какова сложность спред-сортировки по памяти?',
        en: 'What is the space complexity of spreadsort?',
      },
      options: [
        { ru: 'O(n) - корзины занимают линейную дополнительную память', en: 'O(n) - buckets occupy linear extra memory' },
        { ru: 'O(1) - сортировка выполняется на месте без дополнительных структур', en: 'O(1) - the sort runs in place without extra structures' },
        { ru: 'O(log n) - только стек рекурсии без каких-либо вспомогательных массивов', en: 'O(log n) - only the recursion stack and no auxiliary arrays' },
        { ru: 'O(n²) - матрица всех попарных сравнений элементов', en: 'O(n²) - a matrix of all pairwise element comparisons' },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом уровне рекурсии корзины суммарно хранят все элементы текущего диапазона, что даёт O(n) дополнительной памяти.',
        en: 'At each recursion level, the buckets collectively hold all elements of the current range, giving O(n) extra memory.',
      },
      hint: {
        ru: 'Сколько элементов суммарно хранится во всех корзинах на одном уровне рекурсии?',
        en: 'How many elements in total are stored across all buckets at one recursion level?',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда минимум и максимум текущего диапазона совпадают?',
        en: 'What happens when the minimum and maximum of the current range are equal?',
      },
      options: [
        { ru: 'Обработка диапазона сразу завершается - все элементы одинаковы', en: 'Processing of the range ends immediately - all elements are equal' },
        { ru: 'Все элементы помещаются в одну корзину и рекурсия продолжается', en: 'All elements go into one bucket and the recursion continues as normal' },
        { ru: 'Алгоритм переключается на поразрядную сортировку для дубликатов', en: 'The algorithm switches to radix sort to handle the duplicates' },
        { ru: 'Диапазон дополнительно проверяется сортировкой подсчётом', en: 'The range is additionally checked with counting sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если min == max, все элементы одинаковы и уже «отсортированы» - дальнейшая работа не нужна.',
        en: 'If min == max, all elements are identical and already "sorted" - no further work is needed.',
      },
      hint: {
        ru: 'Если все значения одинаковы, нужна ли вообще сортировка?',
        en: 'If all values are the same, is any sorting needed at all?',
      },
    },
    {
      question: {
        ru: 'Чем подход спред-сортировки к выбору числа корзин отличается от классической корзинной сортировки?',
        en: 'How does spreadsort\'s approach to choosing the bucket count differ from classic bucket sort?',
      },
      options: [
        { ru: 'Число корзин адаптируется к текущему размеру диапазона, а не задаётся фиксированно', en: 'The bucket count adapts to the current range size rather than being fixed upfront' },
        { ru: 'Спред-сортировка использует вдвое больше корзин, чем классическая корзинная сортировка', en: 'Spreadsort always uses exactly twice as many buckets as classic bucket sort ever uses' },
        { ru: 'Классическая корзинная сортировка адаптивна, а спред-сортировка - нет', en: 'Classic bucket sort is adaptive and spreadsort is not' },
        { ru: 'Никакой разницы - оба алгоритма выбирают число корзин одинаково', en: 'No difference - both algorithms choose the bucket count the same way' },
      ],
      correct: 0,
      explanation: {
        ru: 'Адаптивный выбор числа корзин позволяет алгоритму эффективно работать как на больших, так и на маленьких диапазонах без ручной настройки.',
        en: 'The adaptive bucket count lets the algorithm work efficiently on both large and small ranges without manual tuning.',
      },
      hint: {
        ru: 'В классической корзинной сортировке число корзин обычно задаётся заранее как константа.',
        en: 'In classic bucket sort the number of buckets is typically set as a constant upfront.',
      },
    },
  ],
};

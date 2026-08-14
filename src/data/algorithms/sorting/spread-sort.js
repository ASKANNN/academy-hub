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

  details: {
    deepDive: [
      {
        ru: 'Ключевая константа реализации - `THRESHOLD = 16` (строка 4): порог, ниже которого диапазон сортируется вставками, а не распределяется по корзинам. Число выбрано не произвольно - на группах примерно такого размера накладные расходы на создание массива корзин (`Array.from`, строка 34) и заполнение их элементами обычно перевешивают выигрыш от распределения, а сортировка вставками на 16 элементах выполняется практически мгновенно.',
        en: 'The implementation\'s key constant is `THRESHOLD = 16` (line 4): the cutoff below which a range is sorted with insertion sort instead of being distributed into buckets. The number isn\'t arbitrary - at roughly that group size, the overhead of allocating the bucket array (`Array.from`, line 34) and filling it usually outweighs the benefit of distributing, while insertion sort on 16 elements finishes essentially instantly.',
      },
      {
        ru: 'Индекс корзины для элемента вычисляется как `Math.floor((a[i] - min) / span)` (строка 36), где `span = (max - min + 1) / bucketCount` (строка 33) - это линейная интерполяция значения в диапазон корзин, тот же принцип, что и в обычной корзинной сортировке, но границы `min`/`max` пересчитываются заново на каждом уровне рекурсии (строки 25-29) для текущего поддиапазона, а не берутся из исходного массива целиком.',
        en: 'A bucket index for an element is computed as `Math.floor((a[i] - min) / span)` (line 36), where `span = (max - min + 1) / bucketCount` (line 33) - a linear interpolation of the value into the bucket range, the same principle as plain bucket sort, but `min`/`max` are recomputed fresh at every recursion level (lines 25-29) for the current subrange, not taken from the original array as a whole.',
      },
      {
        ru: 'Число корзин `bucketCount = Math.max(2, Math.floor(Math.sqrt(size)))` (строка 32) растёт как квадратный корень от размера диапазона - компромисс между слишком малым числом корзин (тогда в каждой окажется много элементов, и рекурсия почти не помогает) и слишком большим (тогда много корзин будут почти пустыми, а накладные расходы на их создание не окупятся). Оригинальный алгоритм Спредсорт Стивена Росса использует более точную формулу на основе логарифма разброса битового представления ключей, а не просто квадратный корень от размера - упрощение сделано ради учебной ясности.',
        en: 'The bucket count `bucketCount = Math.max(2, Math.floor(Math.sqrt(size)))` (line 32) grows as the square root of the range size - a compromise between too few buckets (each ends up with many elements, and recursion barely helps) and too many (most stay nearly empty, and their setup cost doesn\'t pay off). The original Spreadsort algorithm by Steven Ross uses a more precise formula based on the logarithm of the keys\' bit-representation spread rather than just the square root of the size - this is simplified here for educational clarity.',
      },
      {
        ru: 'После распределения по корзинам их содержимое записывается обратно в массив по порядку (строки 41-46), а затем **каждый записанный сегмент рекурсивно передаётся в `sortRange`** (строка 45) - именно эта повторная проверка размера и решения «распределять или сортировать вставками» защищает от вырождения на сильно неравномерных данных: перегруженная корзина не остаётся неотсортированной, а обрабатывается заново тем же способом, пока не станет достаточно маленькой.',
        en: 'After distribution, bucket contents are written back into the array in order (lines 41-46), and then **every written segment is recursively passed to `sortRange`** (line 45) - this repeated size check and "distribute or fall back to insertion sort" decision is exactly what protects against degeneration on heavily skewed data: an overloaded bucket doesn\'t stay unsorted but is reprocessed the same way until it\'s small enough.',
      },
      {
        ru: 'Пример на диапазоне из 25 элементов со значениями от 0 до 99: `bucketCount = max(2, floor(sqrt(25))) = 5`, `span = (99 - 0 + 1) / 5 = 20`. Корзина 0 получает значения `[0, 20)`, корзина 1 - `[20, 40)` и так далее. Если все 25 значений равномерно распределены, в каждой корзине окажется примерно по 5 элементов - меньше порога 16, и они сразу сортируются вставками без дальнейшей рекурсии.',
        en: 'An example with a range of 25 elements valued 0 to 99: `bucketCount = max(2, floor(sqrt(25))) = 5`, `span = (99 - 0 + 1) / 5 = 20`. Bucket 0 receives values `[0, 20)`, bucket 1 gets `[20, 40)`, and so on. If all 25 values are evenly distributed, each bucket ends up with roughly 5 elements - below the threshold of 16 - and they\'re sorted immediately with insertion sort, no further recursion needed.',
      },
      {
        ru: 'Проверка `if (min === max) return` (строка 30) не просто оптимизация - она обязательна для корректности: без неё диапазон из одинаковых значений дал бы `span = 0`, деление на ноль в вычислении индекса корзины и, как следствие, некорректное поведение или бесконечную рекурсию (все элементы снова и снова попадали бы в диапазон без прогресса).',
        en: 'The check `if (min === max) return` (line 30) isn\'t just an optimization - it\'s required for correctness: without it, a range of identical values would give `span = 0`, a division by zero in the bucket-index computation, and consequently incorrect behavior or infinite recursion (elements would keep landing in the same unchanged range with no progress).',
      },
      {
        ru: 'Средняя сложность **O(n log(k/s))** отражает именно этот процесс: k - примерная битовая ширина диапазона значений ключа, s - порог перехода на сортировку вставками (аналог `THRESHOLD`). Чем больше исходный разброс значений (больше k) и чем меньше порог (меньше s), тем глубже рекурсия распределения - но каждый уровень стоит O(n) на распределение и запись назад, а глубина ограничена логарифмом отношения k/s, а не n, что и даёт выигрыш перед O(n log n) при достаточно равномерных данных.',
        en: 'The average complexity **O(n log(k/s))** reflects exactly this process: k is the approximate bit width of the key value range, s is the insertion-sort threshold (the analogue of `THRESHOLD`). The larger the original value spread (bigger k) and the smaller the threshold (smaller s), the deeper the distribution recursion goes - but each level costs O(n) for distributing and writing back, and the depth is bounded by the logarithm of the ratio k/s rather than n, which is exactly the edge over O(n log n) on sufficiently even data.',
      },
      {
        ru: 'Алгоритм разработан **Стивеном Дж. Россом** в 2002 году (диссертация и статья "Adaptive Distribution-Based Sorting") как попытка получить производительность корзинной сортировки без риска её худшего случая - той же цели, что и у смузсорта относительно heap sort, но решённой через комбинацию распределения и сравнений, а не через структуру кучи.',
        en: 'The algorithm was designed by **Steven J. Ross** in 2002 (dissertation and paper "Adaptive Distribution-Based Sorting") as an attempt to get bucket sort\'s performance without risking its worst case - the same goal smoothsort had relative to heap sort, but solved by combining distribution and comparisons rather than through heap structure.',
      },
    ],
    whenToUse: [
      {
        ru: '**Когда одна реализация должна одинаково хорошо работать и на равномерных, и на сильно скошенных данных** без переключения кода вручную - например, сенсорные измерения, которые иногда почти равномерны, а иногда кластеризуются вокруг нескольких значений.',
        en: '**When a single implementation must handle both evenly distributed and heavily skewed data equally well** without manually switching code paths - for example, sensor measurements that are sometimes nearly uniform and sometimes clustered around a few values.',
      },
      {
        ru: '**Предпочесть Спредсорт корзинной сортировке**, когда распределение данных заранее неизвестно или может быть враждебным (специально подобранным) - обычная корзинная сортировка деградирует до O(n²) там, где Спредсорт остаётся на уровне O(n log n).',
        en: '**Prefer Spreadsort over plain bucket sort** when the data distribution is unknown in advance or could be adversarial (deliberately crafted) - plain bucket sort degrades to O(n²) exactly where Spreadsort still stays at O(n log n).',
      },
      {
        ru: '**Предпочесть поразрядную сортировку Спредсорту**, если ключи - целые числа фиксированной битовой ширины с известной структурой: radix sort проще, не требует деления и не пересчитывает min/max на каждом уровне.',
        en: '**Prefer radix sort over Spreadsort** if keys are fixed-width integers with a known structure: radix sort is simpler, needs no division, and doesn\'t recompute min/max at every level.',
      },
      {
        ru: 'Не стоит применять на **маленьких массивах** (n не больше пары сотен элементов) - расходы на вычисление min/max и распределение по корзинам не окупаются; проще сразу использовать insertion sort или встроенную сортировку языка.',
        en: 'Not worth applying to **small arrays** (n up to a couple hundred elements) - the cost of computing min/max and distributing into buckets doesn\'t pay off; just use insertion sort or the language\'s built-in sort directly.',
      },
      {
        ru: 'Хороший выбор в **высокопроизводительных C++/системных библиотеках**, сортирующих числа с плавающей точкой или целые числа большими партиями, где даже небольшой выигрыш над O(n log n) заметен на масштабе.',
        en: 'A good choice in **high-performance C++/systems libraries** sorting floating-point or integer numbers in large batches, where even a modest edge over O(n log n) shows up at scale.',
      },
    ],
    realWorld: [
      {
        ru: '**Стивен Дж. Росс, 2002** - диссертация и статья "Adaptive Distribution-Based Sorting", описывающая Спредсорт как обобщение корзинной и поразрядной сортировок с адаптивным выбором стратегии.',
        en: '**Steven J. Ross, 2002** - the dissertation and paper "Adaptive Distribution-Based Sorting," describing Spreadsort as a generalization of bucket and radix sort with an adaptive strategy choice.',
      },
      {
        ru: '**Документация Boost.Sort** приводит собственные бенчмарки, сравнивающие Спредсорт с `std::sort` (introsort) на разных типах числовых данных, показывая выигрыш именно на больших объёмах данных с широким диапазоном значений.',
        en: '**The Boost.Sort documentation** publishes its own benchmarks comparing Spreadsort to `std::sort` (introsort) on various numeric data types, showing a win specifically on large volumes of data with a wide value range.',
      },
      {
        ru: 'Алгоритм часто фигурирует в статьях о **семействе гибридных распределяющих сортировок** (наряду с American flag sort и bucket sort) как пример адаптивного выбора между распределением и сравнением без ручной настройки под конкретный набор данных.',
        en: 'The algorithm often appears in articles about the **family of hybrid distribution sorts** (alongside American flag sort and bucket sort) as an example of adaptively choosing between distribution and comparison without manual tuning for a specific dataset.',
      },
      {
        ru: 'Обсуждается в материалах о **сортировке чисел с плавающей точкой** как пример алгоритма, который работает с IEEE 754 значениями напрямую (после соответствующего преобразования порядка битов), не сводя задачу к целочисленной поразрядной сортировке.',
        en: 'Discussed in material on **sorting floating-point numbers** as an example of an algorithm that works with IEEE 754 values directly (after an appropriate bit-order transformation), without reducing the problem to integer radix sort.',
      },
    ],
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

  walkthrough: {
    javascript: [
      {
        lines: [1, 4],
        title: { ru: 'Подготовка и порог', en: 'Setup and the threshold' },
        explanation: {
          ru: 'Копия массива сортируется на месте; `THRESHOLD = 16` - порог, ниже которого дальнейшее распределение по корзинам не имеет смысла.',
          en: 'A copy of the array is sorted in place; `THRESHOLD = 16` is the cutoff below which further distribution into buckets isn\'t worth it.',
        },
      },
      {
        lines: [6, 16],
        title: { ru: 'insertionSort: сортировка малых диапазонов', en: 'insertionSort: sorting small ranges' },
        explanation: {
          ru: 'Обычная сортировка вставками, ограниченная границами `[lo, hi)` - применяется к диапазонам не больше порога.',
          en: 'A plain insertion sort scoped to the `[lo, hi)` bounds - applied to ranges at or below the threshold.',
        },
      },
      {
        lines: [18, 23],
        title: { ru: 'sortRange: проверка размера', en: 'sortRange: checking the size' },
        explanation: {
          ru: 'Если размер диапазона не больше `THRESHOLD`, он сортируется вставками и обработка завершается - дальше корзины не создаются.',
          en: 'If the range size is at or below `THRESHOLD`, it\'s sorted with insertion sort and processing stops - no buckets are created.',
        },
      },
      {
        lines: [25, 30],
        title: { ru: 'Вычисление min/max и защита от деления на ноль', en: 'Computing min/max and guarding against division by zero' },
        explanation: {
          ru: 'Минимум и максимум диапазона нужны для вычисления шага корзины; если они совпадают, все элементы одинаковы и диапазон уже отсортирован.',
          en: 'The range\'s minimum and maximum are needed to compute the bucket span; if they\'re equal, all elements are identical and the range is already sorted.',
        },
      },
      {
        lines: [32, 39],
        title: { ru: 'Распределение по корзинам', en: 'Distributing into buckets' },
        explanation: {
          ru: 'Число корзин растёт как √size; каждый элемент попадает в корзину по формуле `floor((значение - min) / span)`, с защитой от выхода за последнюю корзину при `a[i] === max`.',
          en: 'The bucket count grows as √size; each element lands in a bucket via `floor((value - min) / span)`, with a guard against overflowing past the last bucket when `a[i] === max`.',
        },
      },
      {
        lines: [41, 46],
        title: { ru: 'Запись корзин назад и рекурсия', en: 'Writing buckets back and recursing' },
        explanation: {
          ru: 'Корзины записываются в массив по порядку от наименьшей к наибольшей, а каждый записанный сегмент немедленно передаётся обратно в `sortRange` - именно здесь происходит адаптивное переключение между распределением и вставками на следующем уровне.',
          en: 'Buckets are written into the array in order from smallest to largest, and each written segment is immediately passed back into `sortRange` - this is exactly where the adaptive switch between distribution and insertion sort happens at the next level.',
        },
      },
      {
        lines: [49, 51],
        title: { ru: 'Запуск и возврат результата', en: 'Kicking off and returning the result' },
        explanation: {
          ru: 'Процесс запускается на всём массиве `[0, n)`, а по завершении рекурсии массив `a` полностью отсортирован.',
          en: 'The process starts on the whole array `[0, n)`, and once recursion finishes, array `a` is fully sorted.',
        },
      },
    ],
    python: [
      {
        lines: [1, 4],
        title: { ru: 'Подготовка и порог', en: 'Setup and the threshold' },
        explanation: {
          ru: 'Копия списка сортируется на месте; `THRESHOLD = 16` - порог перехода на сортировку вставками.',
          en: 'A copy of the list is sorted in place; `THRESHOLD = 16` is the cutoff for switching to insertion sort.',
        },
      },
      {
        lines: [6, 13],
        title: { ru: 'insertion_sort: сортировка малых диапазонов', en: 'insertion_sort: sorting small ranges' },
        explanation: {
          ru: 'Обычная сортировка вставками, ограниченная границами `[lo, hi)`.',
          en: 'A plain insertion sort scoped to the `[lo, hi)` bounds.',
        },
      },
      {
        lines: [15, 19],
        title: { ru: 'sort_range: проверка размера', en: 'sort_range: checking the size' },
        explanation: {
          ru: 'Если размер диапазона не больше `THRESHOLD`, он сортируется вставками и обработка завершается.',
          en: 'If the range size is at or below `THRESHOLD`, it\'s sorted with insertion sort and processing stops.',
        },
      },
      {
        lines: [21, 24],
        title: { ru: 'Вычисление min/max и защита от деления на ноль', en: 'Computing min/max and guarding against division by zero' },
        explanation: {
          ru: 'Минимум и максимум нужны для вычисления шага корзины; при совпадении все элементы одинаковы, и диапазон уже отсортирован.',
          en: 'The minimum and maximum are needed for the bucket span; if they\'re equal, all elements are identical and the range is already sorted.',
        },
      },
      {
        lines: [26, 33],
        title: { ru: 'Распределение по корзинам', en: 'Distributing into buckets' },
        explanation: {
          ru: 'Число корзин растёт как √size; каждый элемент попадает в корзину по формуле `int((значение - lo_val) / span)`, с защитой от выхода за последнюю корзину.',
          en: 'The bucket count grows as √size; each element lands in a bucket via `int((value - lo_val) / span)`, with a guard against overflowing past the last bucket.',
        },
      },
      {
        lines: [35, 41],
        title: { ru: 'Запись корзин назад и рекурсия', en: 'Writing buckets back and recursing' },
        explanation: {
          ru: 'Корзины записываются в список по порядку, каждый записанный сегмент немедленно передаётся обратно в `sort_range` - адаптивное переключение на следующем уровне.',
          en: 'Buckets are written into the list in order, and each written segment is immediately passed back into `sort_range` - the adaptive switch at the next level.',
        },
      },
      {
        lines: [43, 44],
        title: { ru: 'Запуск и возврат результата', en: 'Kicking off and returning the result' },
        explanation: {
          ru: 'Процесс запускается на всём списке `[0, n)`, по завершении рекурсии `a` полностью отсортирован.',
          en: 'The process starts on the whole list `[0, n)`, and once recursion finishes, `a` is fully sorted.',
        },
      },
    ],
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
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» и шаг «sortRange: проверка размера» построчного разбора на вкладке «Реализация».',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab and the "sortRange: checking the size" walkthrough step on the "Implementation" tab.',
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
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» (почему выбрано именно 16).',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab (why exactly 16 was chosen).',
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
        ru: 'Смотрите четвёртый абзац раздела «Углублённо» на вкладке «Суть» и шаг «Запись корзин назад и рекурсия» построчного разбора на вкладке «Реализация».',
        en: 'See the fourth "Deep dive" paragraph on the "Intent" tab and the "Writing buckets back and recursing" walkthrough step on the "Implementation" tab.',
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
        ru: 'Смотрите третий пункт плюсов на вкладке «Плюсы и минусы» и бейдж «Время» вверху страницы.',
        en: 'See the third "Pros" item on the "Pros & Cons" tab and the "Time" complexity badge at the top of the page.',
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
        ru: 'Смотрите первый пункт «Примеры из практики» на вкладке «Суть» и второй пункт «Примеры из практики» (углублённого) там же.',
        en: 'See the first "Real world" item on the "Intent" tab and the second extended "Real world" item there.',
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
        ru: 'Смотрите третий абзац раздела «Углублённо» на вкладке «Суть» и строку 32 функции `sortRange` на вкладке «Реализация».',
        en: 'See the third "Deep dive" paragraph on the "Intent" tab and line 32 of `sortRange` on the "Implementation" tab.',
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
        ru: 'Смотрите второй абзац раздела «Углублённо» на вкладке «Суть» и третий пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the second "Deep dive" paragraph on the "Intent" tab and the third "Cons" item on the "Pros & Cons" tab.',
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
        ru: 'Смотрите бейдж «Память» вверху страницы и первый пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the "Space" complexity badge at the top of the page and the first "Cons" item on the "Pros & Cons" tab.',
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
        ru: 'Смотрите шестой абзац раздела «Углублённо» на вкладке «Суть» (деление на ноль в формуле индекса корзины).',
        en: 'See the sixth "Deep dive" paragraph on the "Intent" tab (division by zero in the bucket-index formula).',
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
        ru: 'Смотрите третий абзац раздела «Углублённо» и второй пункт whenToUse (углублённого) на вкладке «Суть».',
        en: 'See the third "Deep dive" paragraph and the second extended "When to use" item on the "Intent" tab.',
      },
    },
  ],
};

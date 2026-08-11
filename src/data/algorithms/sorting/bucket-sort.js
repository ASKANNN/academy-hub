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
    ru: 'Сортировка подсчётом и поразрядная сортировка отлично работают с целыми числами, но что делать с равномерно распределёнными вещественными числами, скажем, в диапазоне [0, 1)? Считать по каждому значению бессмысленно - значений бесконечно много. Нужен способ использовать знание о распределении данных, не требуя дискретных ключей.',
    en: 'Counting sort and radix sort work great with integers, but what about uniformly distributed floating-point numbers, say in the range [0, 1)? Counting each individual value makes no sense - there are infinitely many. A way is needed to exploit knowledge of the data\'s distribution without requiring discrete keys.',
  },

  solution: {
    ru: 'Диапазон возможных значений делится на k равных интервалов - «корзин». Каждый элемент попадает в корзину, соответствующую его значению (например, `floor(value * k)` для чисел из [0, 1)). Если исходные данные распределены равномерно, в каждой корзине окажется примерно n/k элементов - небольшое количество, которое можно быстро отсортировать простым алгоритмом (обычно insertion sort, эффективным на маленьких массивах). После сортировки всех корзин их содержимое просто соединяется по порядку от первой к последней - результат уже отсортирован.',
    en: 'The range of possible values is divided into k equal intervals - "buckets." Each element lands in the bucket matching its value (e.g. `floor(value * k)` for numbers in [0, 1)). If the source data is uniformly distributed, each bucket ends up with roughly n/k elements - a small amount that a simple algorithm (usually insertion sort, efficient on small arrays) can sort quickly. After all buckets are sorted, their contents are simply concatenated from first to last - the result is already sorted.',
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
  stepBreakpoints: [3, 10, 13, 16],

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

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура и число корзин по умолчанию', en: 'Signature and default bucket count' },
        explanation: {
          ru: 'Второй параметр `bucketCount` по умолчанию вычисляется как `Math.ceil(Math.sqrt(arr.length))` - число корзин, приблизительно равное квадратному корню от длины массива, а не самой длине. Хвостовое `|| 1` страхует от нулевого значения, хотя при непустом массиве `Math.sqrt` уже даёт минимум 1.',
          en: 'The second parameter `bucketCount` defaults to `Math.ceil(Math.sqrt(arr.length))` - a bucket count roughly equal to the array length\'s square root, not the length itself. The trailing `|| 1` guards against a zero value, though for a non-empty array `Math.sqrt` already yields at least 1.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Пустой массив', en: 'Empty array' },
        explanation: {
          ru: 'Если `arr.length === 0`, дальше идти незачем - функция сразу возвращает пустой массив, минуя вычисление `min`/`max`, которое иначе упало бы на пустом входе.',
          en: 'If `arr.length === 0`, there is nothing left to do - the function returns an empty array immediately, skipping the `min`/`max` computation below, which would otherwise fail on empty input.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Границы диапазона', en: 'Range bounds' },
        explanation: {
          ru: '`Math.min(...arr)` и `Math.max(...arr)` находят наименьшее и наибольшее значения массива - это границы всего диапазона, который предстоит разбить на `bucketCount` корзин.',
          en: '`Math.min(...arr)` and `Math.max(...arr)` find the array\'s smallest and largest values - these are the bounds of the whole range that gets split into `bucketCount` buckets.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Ширина одной корзины', en: 'Width of one bucket' },
        explanation: {
          ru: '`range` - ширина одного интервала, вычисленная делением всего диапазона на число корзин. Добавка `+ 1` к `(max - min)` нужна для корректности индекса максимального элемента - подробный разбор в разделе «Как это работает» на вкладке «Суть».',
          en: '`range` is the width of a single interval, computed by dividing the whole span by the bucket count. The `+ 1` added to `(max - min)` keeps the maximum element\'s index correct - see the detailed breakdown in the "How it works" section of the "Intent" tab.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Создание пустых корзин', en: 'Creating empty buckets' },
        explanation: {
          ru: '`Array.from({ length: bucketCount }, () => [])` создаёт `bucketCount` независимых пустых массивов. Важно вызывать `() => []` как фабрику - иначе все корзины ссылались бы на один и тот же массив.',
          en: '`Array.from({ length: bucketCount }, () => [])` creates `bucketCount` independent empty arrays. It\'s important to call `() => []` as a factory - otherwise every bucket would reference the same shared array.',
        },
      },
      {
        lines: [8, 9],
        title: { ru: 'Распределение: индекс корзины', en: 'Distribution: bucket index' },
        explanation: {
          ru: 'Цикл `for (const value of arr)` перебирает каждый элемент исходного массива. `idx = Math.floor((value - min) / range)` сдвигает значение к нулю вычитанием `min`, а затем делит на ширину корзины, чтобы получить номер интервала, в который значение попадает.',
          en: 'The `for (const value of arr)` loop walks every element of the input array. `idx = Math.floor((value - min) / range)` shifts the value toward zero by subtracting `min`, then divides by the bucket width to get the index of the interval the value falls into.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Защита от выхода за границу', en: 'Out-of-bounds guard' },
        explanation: {
          ru: '`if (idx >= bucketCount) idx = bucketCount - 1` перехватывает редкий случай, когда округление с плавающей точкой всё же выдаёт `idx === bucketCount` для максимального элемента, и принудительно направляет его в последнюю корзину.',
          en: '`if (idx >= bucketCount) idx = bucketCount - 1` catches the rare case where floating-point rounding still produces `idx === bucketCount` for the maximum element, forcing it into the last bucket instead.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Добавление элемента в корзину', en: 'Appending the element to its bucket' },
        explanation: {
          ru: '`buckets[idx].push(value)` кладёт элемент в вычисленную корзину, сохраняя порядок появления элементов внутри одной корзины - это обеспечивает устойчивость итогового результата, если внутренняя сортировка тоже устойчива.',
          en: '`buckets[idx].push(value)` appends the element to its computed bucket, preserving the order elements arrived in within a single bucket - this is what makes the final result stable, provided the inner sort is stable too.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Сортировка корзин и склейка результата', en: 'Sorting buckets and concatenating the result' },
        explanation: {
          ru: '`buckets.flatMap((bucket) => bucket.sort((a, b) => a - b))` сортирует содержимое каждой корзины через `Array.prototype.sort` (которая в V8 для небольших массивов использует insertion sort) и сразу же соединяет все отсортированные корзины по порядку в один плоский массив - `flatMap` делает сортировку и склейку одним выражением.',
          en: '`buckets.flatMap((bucket) => bucket.sort((a, b) => a - b))` sorts each bucket\'s contents with `Array.prototype.sort` (which V8 backs with insertion sort for small arrays) and immediately concatenates all sorted buckets in order into one flat array - `flatMap` folds the sort and the concatenation into a single expression.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`bucket_count=None` по умолчанию - реальное значение вычисляется на следующих строках, только если аргумент не передан явно.',
          en: '`bucket_count=None` is the default - the real value is computed on the next lines only if the caller didn\'t pass one explicitly.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Пустой список', en: 'Empty list' },
        explanation: {
          ru: '`if not arr: return []` - если список пуст, дальше идти незачем, функция сразу возвращает пустой список, минуя вычисление `min`/`max`, которое иначе упало бы на пустом входе.',
          en: '`if not arr: return []` - if the list is empty, there is nothing left to do; the function returns an empty list immediately, skipping the `min`/`max` computation below, which would otherwise fail on empty input.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Число корзин по умолчанию', en: 'Default bucket count' },
        explanation: {
          ru: '`bucket_count = bucket_count or max(1, int(len(arr) ** 0.5))` - если `bucket_count` не передан, он вычисляется как квадратный корень длины списка (`** 0.5`), округлённый вниз через `int`, но не меньше 1.',
          en: '`bucket_count = bucket_count or max(1, int(len(arr) ** 0.5))` - if `bucket_count` wasn\'t passed, it\'s computed as the square root of the list\'s length (`** 0.5`), truncated via `int`, but never below 1.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Границы диапазона', en: 'Range bounds' },
        explanation: {
          ru: '`lo, hi = min(arr), max(arr)` находит наименьшее и наибольшее значения списка - границы диапазона, который предстоит разбить на `bucket_count` корзин.',
          en: '`lo, hi = min(arr), max(arr)` finds the list\'s smallest and largest values - the bounds of the range that gets split into `bucket_count` buckets.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Ширина одной корзины', en: 'Width of one bucket' },
        explanation: {
          ru: '`span = (hi - lo + 1) / bucket_count or 1` - ширина одного интервала. Добавка `+ 1` к `(hi - lo)` нужна для корректности индекса максимального элемента, тот же приём, что и в JS-версии.',
          en: '`span = (hi - lo + 1) / bucket_count or 1` is the width of a single interval. The `+ 1` added to `(hi - lo)` keeps the maximum element\'s index correct, the same trick as in the JS version.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Создание пустых корзин', en: 'Creating empty buckets' },
        explanation: {
          ru: '`buckets = [[] for _ in range(bucket_count)]` - списковое включение создаёт `bucket_count` независимых пустых списков. Именно `for _ in range(...)`, а не `[[]] * bucket_count`, важно - второе создало бы `bucket_count` ссылок на один и тот же список.',
          en: '`buckets = [[] for _ in range(bucket_count)]` - a list comprehension creates `bucket_count` independent empty lists. Using `for _ in range(...)` instead of `[[]] * bucket_count` matters - the latter would create `bucket_count` references to the same shared list.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Распределение: индекс корзины', en: 'Distribution: bucket index' },
        explanation: {
          ru: 'Цикл `for value in arr` перебирает каждый элемент. `idx = min(int((value - lo) / span), bucket_count - 1)` сразу совмещает вычисление индекса и защиту от выхода за границу через `min(..., bucket_count - 1)` - в отличие от JS-версии, где эти две операции разнесены на отдельные строки.',
          en: 'The `for value in arr` loop walks every element. `idx = min(int((value - lo) / span), bucket_count - 1)` folds the index computation and the out-of-bounds guard into one expression via `min(..., bucket_count - 1)` - unlike the JS version, which splits these into two separate lines.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Добавление элемента в корзину', en: 'Appending the element to its bucket' },
        explanation: {
          ru: '`buckets[idx].append(value)` кладёт элемент в вычисленную корзину, сохраняя порядок появления элементов внутри неё.',
          en: '`buckets[idx].append(value)` appends the element to its computed bucket, preserving the order elements arrived in within it.',
        },
      },
      {
        lines: [13, 16],
        title: { ru: 'Сортировка корзин и склейка результата', en: 'Sorting buckets and concatenating the result' },
        explanation: {
          ru: '`result = []` заводит итоговый список, а цикл `for bucket in buckets: result.extend(sorted(bucket))` сортирует содержимое каждой корзины встроенной `sorted` (Timsort) и дописывает её в конец результата - раздельно на две операции, в отличие от однострочного `flatMap` в JS-версии.',
          en: '`result = []` starts the output list, and the `for bucket in buckets: result.extend(sorted(bucket))` loop sorts each bucket\'s contents with the built-in `sorted` (Timsort) and appends it to the end of the result - split into two separate operations, unlike the single-expression `flatMap` in the JS version.',
        },
      },
    ],
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
      ru: 'Гибок в выборе внутреннего алгоритма сортировки корзин - можно подобрать его под характер данных.',
      en: 'Flexible in the choice of inner bucket-sorting algorithm - it can be tuned to the data\'s characteristics.',
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
      ru: 'Когда данные заведомо равномерно распределены на известном интервале - измерения датчиков, случайные числа, нормализованные оценки.',
      en: 'When the data is known to be uniformly distributed over a known interval - sensor readings, random numbers, normalized scores.',
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

  details: {
    deepDive: [
      {
        ru: 'Заявленная средняя сложность **O(n + k)** верна только при скрытом допущении: число корзин k должно быть примерно пропорционально n, чтобы на каждую корзину в среднем приходился O(1) элемент. Реализация на этой странице задаёт `bucketCount` по умолчанию как `⌈√n⌉`, а не как n - разберём, что это меняет в реальной асимптотике.',
        en: 'The stated average complexity of **O(n + k)** holds only under a hidden assumption: the bucket count k must be roughly proportional to n, so each bucket ends up with O(1) elements on average. This page\'s implementation defaults `bucketCount` to `⌈√n⌉`, not to n - let\'s work out what that actually changes.',
      },
      {
        ru: 'Модель **«шаров по урнам»** даёт точную формулу: если n элементов случайно и равномерно раскиданы по k корзинам, ожидаемое значение суммы квадратов размеров всех корзин равно примерно **n + n²/k** (дисперсия биномиального распределения плюс квадрат среднего, просуммированные по k корзинам). Сумма квадратов важна именно потому, что insertion sort на корзине из m элементов в среднем делает порядка m² сравнений - значит, суммарная работа всех корзин пропорциональна этой же n + n²/k.',
        en: 'The **"balls into bins"** model gives an exact formula: if n elements are scattered uniformly at random into k buckets, the expected sum of squared bucket sizes across all buckets comes out to roughly **n + n²/k** (a binomial distribution\'s variance plus the square of its mean, summed over k buckets). That sum of squares matters because insertion sort on a bucket of m elements makes on the order of m² comparisons on average - so the total work across all buckets is proportional to that same n + n²/k.',
      },
      {
        ru: 'Подставим числа. При k = n сумма даёт n + n²/n = 2n - линейная работа, ради которой блочная сортировка и задумывалась. При выборе из этой реализации, k = √n, та же формула даёт n + n²/√n = n + n^1.5. Для n = 1 000 000 это n^1.5 = 10⁹ - примерно в **500 раз больше**, чем 2n = 2 000 000 операций при k = n.',
        en: 'Plug in numbers. At k = n, the sum works out to n + n²/n = 2n - the linear work bucket sort was designed to achieve. At this implementation\'s choice of k = √n, the same formula gives n + n²/√n = n + n^1.5. For n = 1,000,000, n^1.5 = 10⁹ - roughly **500 times more** than the 2n = 2,000,000 operations at k = n.',
      },
      {
        ru: 'Это не ошибка, а осознанный компромисс. При k = n пришлось бы выделить n почти пустых массивов - большинство содержало бы 0 или 1 элемент, и накладные расходы на создание и обход стольких мелких объектов на практике часто перевешивают выигрыш от более быстрой внутренней сортировки. **`√n` корзин** - популярный практический баланс между размером корзины и их количеством, применяемый во многих реализациях, даже ценой худшей асимптотики на бумаге.',
        en: 'This isn\'t a bug, it\'s a deliberate trade-off. At k = n, n mostly-empty arrays would need to be allocated - most holding 0 or 1 element - and the overhead of creating and walking that many tiny objects often outweighs the gain from a faster inner sort in practice. **`√n` buckets** is a common practical balance between bucket size and bucket count, used in many implementations, even at the cost of worse asymptotics on paper.',
      },
      {
        ru: 'Индекс корзины вычисляется как `floor((value - min) / range)`. Добавка `+ 1` к `(max - min)` в формуле `range` нужна, чтобы для максимального элемента `idx` получался строго меньше `bucketCount` - без неё `value === max` дал бы `idx === bucketCount`, что вышло бы за границы массива корзин. Из-за неточности **чисел с плавающей точкой** даже с этой поправкой округление на пограничных значениях иногда может дать `idx === bucketCount`, поэтому строка `if (idx >= bucketCount) idx = bucketCount - 1` - не избыточная подстраховка, а необходимая защита от выхода за границу.',
        en: 'A bucket\'s index is computed as `floor((value - min) / range)`. The `+ 1` added to `(max - min)` in the `range` formula exists so that the maximum element\'s `idx` comes out strictly below `bucketCount` - without it, `value === max` would give `idx === bucketCount`, running past the end of the bucket array. Because of **floating-point** imprecision, rounding can still occasionally push `idx` to `bucketCount` at boundary values even with that correction, so the line `if (idx >= bucketCount) idx = bucketCount - 1` isn\'t redundant caution, it\'s a necessary guard against an out-of-bounds write.',
      },
      {
        ru: 'Поскольку индекс всегда считается через `(value - min)`, алгоритм одинаково работает для **отрицательных чисел**, дробей и любых сдвинутых диапазонов - в отличие от counting sort, которому нужны неотрицательные целые ключи в разумных пределах. Единственное жёсткое требование - значения должны поддерживать вычитание и сравнение, то есть быть числами.',
        en: 'Because the index is always computed via `(value - min)`, the algorithm works identically for **negative numbers**, fractions, and any shifted range - unlike counting sort, which needs non-negative integer keys within a reasonable bound. The only hard requirement is that values support subtraction and comparison, i.e. that they are numbers.',
      },
      {
        ru: 'Худший случай виден на конкретном примере: массив из 1000 чисел, где 990 значений лежат в диапазоне [0, 0.01), а оставшиеся 10 - равномерно раскиданы по [0.01, 1). При 32 корзинах диапазон первой корзины - [0, 1/32) ⊃ [0, 0.01) - поглотит почти все 990 «тесных» значений, и insertion sort на корзине из ~990 элементов сделает порядка **990² ≈ 980 000 сравнений**, против нескольких десятков во всех остальных корзинах вместе взятых. Равномерность распределения - не формальность в описании алгоритма, а условие, без которого блочная сортировка вырождается в insertion sort с лишним шагом группировки.',
        en: 'The worst case is concrete: an array of 1000 numbers where 990 values lie in [0, 0.01) and the remaining 10 are spread uniformly across [0.01, 1). With 32 buckets, the first bucket\'s range - [0, 1/32) ⊃ [0, 0.01) - swallows nearly all 990 "crowded" values, and insertion sort on that ~990-element bucket makes on the order of **990² ≈ 980,000 comparisons**, against a few dozen for every other bucket combined. Uniform distribution isn\'t a formality in the algorithm\'s description, it\'s the condition without which bucket sort degenerates into insertion sort with an extra grouping step.',
      },
      {
        ru: 'Название «bucket sort» (иногда «bin sort») закрепилось в литературе к 1970-м годам; **Дональд Кнут** описывает эту семью распределяющих сортировок в третьем томе The Art of Computer Programming (1973) как естественное развитие сортировки подсчётом на непрерывные значения. Более поздний родственник - **flashsort** Карла-Дитриха Нойберта (1998, статья в Dr. Dobb\'s Journal) - идёт дальше: вычисляет индекс корзины по единственной формуле без отдельного прохода на min/max и без сортировки каждой корзины по отдельности, добиваясь среднего O(n) буквально за один проход по массиву.',
        en: 'The name "bucket sort" (sometimes "bin sort") became standard in the literature by the 1970s; **Donald Knuth** covers this family of distribution sorts in Volume 3 of The Art of Computer Programming (1973) as a natural extension of counting sort onto continuous values. A later relative - **flashsort**, by Karl-Dietrich Neubert (1998, in Dr. Dobb\'s Journal) - goes further: it computes a bucket index from a single formula with no separate min/max pass and no per-bucket inner sort, reaching average O(n) in essentially one pass over the array.',
      },
    ],
    whenToUse: [
      {
        ru: '**Выбор между bucket sort и radix sort** зависит от типа ключей: radix sort рассчитан на данные с фиксированной битовой шириной (целые числа, строки фиксированной длины), а bucket sort - на произвольные вещественные значения на известном интервале, где разрядов для поразрядного разбора попросту нет.',
        en: '**Choosing between bucket sort and radix sort** comes down to key type: radix sort is built for fixed-width data (integers, fixed-length strings), while bucket sort handles arbitrary real-valued numbers on a known interval, where there are no digit positions to sort by in the first place.',
      },
      {
        ru: '**Число корзин - явный параметр настройки**, не деталь реализации: слишком мало корзин (например, `√n` вместо n) сохраняет асимптотику деградировавшей до O(n^1.5) даже на идеально равномерных данных (см. разбор в разделе «Как это работает»), а слишком много корзин увеличивает накладные расходы на создание и обход почти пустых массивов.',
        en: '**Bucket count is an explicit tuning knob**, not an implementation detail: too few buckets (e.g. `√n` instead of n) keeps the asymptotics degraded to O(n^1.5) even on perfectly uniform data (see the breakdown in "How it works"), while too many buckets raise the overhead of creating and walking mostly-empty arrays.',
      },
      {
        ru: '**При известном, но не равномерном распределении** (например, нормальном с пиком в центре) корзины равной ширины перегружают центральные интервалы - решение - выбирать границы корзин по квантилям распределения, а не делить диапазон значений поровну.',
        en: '**Under a known but non-uniform distribution** (e.g. a normal distribution peaked in the middle), equal-width buckets overload the central intervals - the fix is to set bucket boundaries by the distribution\'s quantiles instead of splitting the value range evenly.',
      },
      {
        ru: '**На маленьких массивах** (n < 50-100) накладные расходы на создание корзин и последующую конкатенацию обычно перевешивают выигрыш - обычный insertion sort или встроенная сортировка языка работает быстрее без лишнего шага группировки.',
        en: '**On small arrays** (n < 50-100), the overhead of creating buckets and concatenating them afterward usually outweighs the gain - plain insertion sort or the language\'s built-in sort runs faster without the extra grouping step.',
      },
      {
        ru: '**Если распределение данных неизвестно заранее** и не может быть гарантировано равномерным, безопаснее выбрать алгоритм с гарантированным средним случаем независимо от входа (quicksort, Timsort) - ошибочное допущение равномерности не просто замедляет работу, а способно выродить сортировку до O(n²), как показано в примере с перекошенным распределением выше.',
        en: '**When the data\'s distribution is unknown in advance** and can\'t be guaranteed uniform, it\'s safer to pick an algorithm with an input-independent average guarantee (quicksort, Timsort) - a wrong uniformity assumption doesn\'t just slow things down, it can degrade the sort to O(n²), as shown in the skewed-distribution example above.',
      },
    ],
    realWorld: [
      {
        ru: '**GPU-параллельная блочная сортировка** - исследования по сортировке на CUDA часто используют bucket sort как первый этап: каждая корзина назначается отдельному thread block и сортируется независимо, поскольку GPU-архитектура хорошо подходит именно под такое разбиение на изолированные подзадачи.',
        en: '**GPU-parallel bucket sort** - CUDA sorting research often uses bucket sort as a first stage: each bucket is assigned to a separate thread block and sorted independently, since GPU architecture maps naturally onto exactly this kind of independent-subtask split.',
      },
      {
        ru: '**Apache Spark**\'s `repartitionByRange` разбивает строки датафрейма на партиции по диапазонам значений ключа перед параллельной сортировкой каждой партиции - тот же принцип «разложить по диапазону, затем отсортировать порознь», что и в bucket sort.',
        en: '**Apache Spark**\'s `repartitionByRange` splits a dataframe\'s rows into partitions by key-value range before sorting each partition in parallel - the same "distribute by range, then sort separately" principle as bucket sort.',
      },
      {
        ru: '**Распределённые SQL-базы данных** (CockroachDB, Google Spanner) делят пространство ключей таблицы на диапазоны и закрепляют каждый диапазон за отдельным узлом кластера - распределение по диапазону значений, а не по хэшу, концептуально то же самое разбиение на корзины.',
        en: '**Distributed SQL databases** (CockroachDB, Google Spanner) split a table\'s key space into ranges and assign each range to a separate cluster node - range-based rather than hash-based distribution, conceptually the same bucket split.',
      },
      {
        ru: '**MSD-вариант поразрядной сортировки** (most-significant-digit radix sort) можно рассматривать как специализированную блочную сортировку с ровно 256 корзинами на каждый байт ключа - в высокопроизводительных библиотеках сортировки для GPU и SIMD эти два алгоритма нередко делят общий код распределения по корзинам.',
        en: '**MSD (most-significant-digit) radix sort** can be viewed as a specialized bucket sort with exactly 256 buckets per key byte - in high-performance GPU and SIMD sorting libraries, the two algorithms often share the same bucket-distribution code.',
      },
    ],
  },

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
      hint: {
        ru: 'Что происходит с размером корзин при разных распределениях? Разобрано в подразделе «Решение» на вкладке «Суть» и на конкретном числовом примере в разделе «Как это работает» (990 из 1000 значений в одной корзине).',
        en: 'What happens to bucket sizes under different distributions? See the "Solution" subsection on the "Intent" tab and the concrete numeric example in "How it works" (990 of 1000 values landing in one bucket).',
      },
    },
    {
      question: {
        ru: 'Что происходит с производительностью, если почти все элементы попадают в одну корзину?',
        en: 'What happens to performance if nearly all elements land in one bucket?',
      },
      options: [
        { ru: 'Сложность деградирует до O(n²) - вся нагрузка в одной корзине', en: 'Complexity degrades to O(n²) - like sorting one large bucket' },
        { ru: 'Алгоритм завершается с ошибкой переполнения буфера корзины', en: 'The algorithm crashes with a bucket buffer overflow error' },
        { ru: 'Ничего не меняется, сложность так и остаётся линейной O(n + k)', en: 'Nothing changes, complexity stays exactly linear at O(n + k)' },
        { ru: 'Сложность неожиданно улучшается до O(log n)', en: 'Complexity unexpectedly improves down to O(log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если одна корзина содержит почти все n элементов, внутренняя сортировка (например, insertion sort) выполняется за O(n²) на этой корзине - распределение по корзинам не дало никакого выигрыша.',
        en: 'If one bucket holds nearly all n elements, the inner sort (e.g. insertion sort) runs in O(n²) on that bucket - distributing into buckets gave no benefit.',
      },
      hint: {
        ru: 'Если одна корзина содержит почти все элементы, что происходит при сортировке этой корзины insertion sort\'ом? Разобрано на конкретном примере (990² ≈ 980 000 сравнений) в разделе «Как это работает» на вкладке «Суть».',
        en: 'If one bucket holds nearly all elements, what happens when insertion sort processes it? Worked out with concrete numbers (990² ≈ 980,000 comparisons) in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какой алгоритм обычно используют для сортировки содержимого отдельной корзины?',
        en: 'Which algorithm is typically used to sort the contents of an individual bucket?',
      },
      options: [
        { ru: 'Простой алгоритм вроде insertion sort - корзины обычно маленькие', en: 'A simple algorithm like insertion sort - buckets are usually small' },
        { ru: 'Обязательно merge sort, независимо от размера отдельной корзины', en: 'Merge sort, mandatorily, no matter how small the individual bucket is' },
        { ru: 'Ещё один рекурсивный вызов самой блочной сортировки заново', en: 'Another recursive call back into bucket sort itself, applied again' },
        { ru: 'Сортировка вообще не нужна - все корзины уже гарантированно упорядочены', en: 'No sorting is needed inside a bucket, they are already guaranteed ordered' },
      ],
      correct: 0,
      explanation: {
        ru: 'При равномерном распределении каждая корзина содержит примерно n/k элементов - на таких маленьких массивах простые O(n²) алгоритмы вроде insertion sort работают быстро и с минимальными накладными расходами.',
        en: 'With uniform distribution, each bucket holds roughly n/k elements - on such small arrays, simple O(n²) algorithms like insertion sort run fast with minimal overhead.',
      },
      hint: {
        ru: 'Если корзина содержит всего несколько элементов, нужен ли сложный алгоритм сортировки? Смотрите шаг «Отсортировать каждую корзину» на вкладке «Визуализация» и подраздел «Решение» на вкладке «Суть».',
        en: 'If a bucket contains just a few elements, does it need a complex sorting algorithm? See the "Sort each bucket" step on the "Visualization" tab and the "Solution" subsection on "Intent".',
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
        ru: 'После распределения элементов по корзинам сортировка каждой корзины не зависит от других - их можно раздать по потокам или узлам вычислительного кластера.',
        en: 'Once elements are distributed into buckets, sorting each bucket doesn\'t depend on the others - they can be handed off to separate threads or cluster nodes.',
      },
      hint: {
        ru: 'После шага распределения нужны ли корзины друг другу для сортировки своего содержимого? Названо напрямую во втором пункте плюсов на вкладке «Плюсы и минусы».',
        en: 'After distribution, do buckets need each other to sort their own contents? Named directly in the second "Pros" item on the "Pros & Cons" tab.',
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
      hint: {
        ru: 'Counting sort считает вхождения каждого конкретного значения. Что делает bucket sort вместо этого - см. подраздел «Проблема» на вкладке «Суть».',
        en: 'Counting sort tallies occurrences of each specific value. What does bucket sort do instead - see the "Problem" subsection on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность блочной сортировки?',
        en: 'What is the space complexity of bucket sort?',
      },
      options: [
        { ru: 'O(n + k) - на хранение n элементов в k корзинах', en: 'O(n + k) - for storing n elements across k buckets' },
        { ru: 'O(1) - все операции выполняются на месте без дополнительной памяти', en: 'O(1) - all operations run in place without any extra memory' },
        { ru: 'O(n²) - каждый элемент сравнивается со всеми остальными', en: 'O(n²) - each element is compared against all others' },
        { ru: 'O(log n) - только на рекурсивный стек вызовов алгоритма', en: 'O(log n) - only for the algorithm\'s recursive call stack' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нужно хранить все n элементов в корзинах и сами k корзин - итоговая память O(n + k).',
        en: 'All n elements must be stored in buckets plus the k bucket structures themselves - total memory is O(n + k).',
      },
      hint: {
        ru: 'Сколько памяти нужно для хранения n элементов, разложенных по k корзинам? Смотрите бейдж «Память» вверху страницы и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'How much memory is needed to hold n elements distributed across k buckets? See the "Space" complexity badge at the top and the second "Cons" item on "Pros & Cons".',
      },
    },
    {
      question: {
        ru: 'Почему блочная сортировка может работать быстрее O(n log n)?',
        en: 'Why can bucket sort run faster than O(n log n)?',
      },
      options: [
        { ru: 'Она не сравнивает попарно - использует знание о диапазоне значений', en: 'It is not a comparison sort and exploits knowledge of the value range' },
        { ru: 'Она нарушает теорему об информационной нижней оценке для сортировок', en: 'It violates the information-theoretic lower bound for sorting in all cases' },
        { ru: 'Она всегда делает меньше сравнений, чем любой другой алгоритм', en: 'It always makes fewer comparisons than any other algorithm' },
        { ru: 'Она использует аппаратные инструкции, недоступные другим алгоритмам', en: 'It uses hardware instructions unavailable to other algorithms' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нижняя оценка Ω(n log n) применима только к сортировкам сравнением; блочная сортировка распределяет элементы по диапазону, а не сравнивает их попарно, обходя это ограничение.',
        en: 'The Ω(n log n) lower bound applies only to comparison sorts; bucket sort distributes by value range rather than comparing pairs, which is how it bypasses that limit.',
      },
      hint: {
        ru: 'Нижняя оценка Ω(n log n) применима только к алгоритмам, которые только сравнивают элементы. Чем отличается bucket sort и откуда берётся формула n + n²/k - см. бейджи сложности вверху страницы (Средний: O(n + k)) и вывод через модель «шаров по урнам» в разделе «Как это работает».',
        en: 'The Ω(n log n) lower bound only applies to algorithms that do nothing but compare elements. What bucket sort does differently, and where the n + n²/k formula comes from - see the complexity badges at the top (Average: O(n + k)) and the "balls into bins" derivation in "How it works".',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если выбрать слишком мало корзин для большого массива?',
        en: 'What happens if too few buckets are chosen for a large array?',
      },
      options: [
        { ru: 'Корзины будут переполнены, и внутренняя сортировка займёт больше времени', en: 'Buckets will be overfull and the inner sort will take longer' },
        { ru: 'Алгоритм автоматически создаст дополнительные корзины по мере необходимости', en: 'The algorithm automatically creates extra buckets as needed' },
        { ru: 'Элементы будут потеряны, так как индексы корзин выйдут за границы', en: 'Elements will be lost because bucket indices go out of bounds' },
        { ru: 'Алгоритм переключится на merge sort для повышения точности', en: 'The algorithm switches to merge sort for better accuracy' },
      ],
      correct: 0,
      explanation: {
        ru: 'Малое число корзин означает больше элементов в каждой корзине - внутренняя сортировка (insertion sort) на большой корзине работает медленно, снижая общую производительность.',
        en: 'Too few buckets means more elements per bucket - the inner sort (insertion sort) on a large bucket is slow, reducing overall performance.',
      },
      hint: {
        ru: 'Если корзин мало, что происходит со средним числом элементов в каждой корзине? Разобрано с конкретными цифрами (√n корзин против n корзин, разница в 500 раз при n = 1 000 000) в разделе «Как это работает» на вкладке «Суть».',
        en: 'If there are too few buckets, what happens to the average number of elements per bucket? Worked out with concrete numbers (√n buckets vs. n buckets, a 500x difference at n = 1,000,000) in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли блочная сортировка устойчивой (stable)?',
        en: 'Is bucket sort stable?',
      },
      options: [
        { ru: 'Да, если внутренняя сортировка каждой корзины устойчива', en: 'Yes, if the inner sort used for each bucket is stable' },
        { ru: 'Нет никогда - распределение по корзинам всегда нарушает порядок', en: 'No, never - distributing into buckets always breaks the order' },
        { ru: 'Только если все элементы уникальны и нет повторяющихся значений', en: 'Only if all elements are unique and there are no repeated values' },
        { ru: 'Зависит исключительно от числа корзин, а не от алгоритма внутри', en: 'Depends solely on the number of buckets, not on the inner algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Распределение по корзинам сохраняет исходный порядок элементов внутри каждой корзины, если элементы добавляются по порядку; устойчивость финального результата определяется устойчивостью внутреннего алгоритма.',
        en: 'Distribution into buckets preserves the original order of elements within each bucket when they are appended in order; final stability depends on the inner algorithm\'s stability.',
      },
      hint: {
        ru: 'После распределения порядок элементов внутри одной корзины сохранён - см. шаг «Разложить элементы по корзинам» на вкладке «Визуализация» и код на вкладке «Реализация». Что далее влияет на устойчивость?',
        en: 'After distribution, the order within one bucket is preserved - see the "Distribute elements into buckets" step on "Visualization" and the code on "Implementation". What then determines overall stability?',
      },
    },
    {
      question: {
        ru: 'При каком распределении данных блочная сортировка показывает наилучшую производительность?',
        en: 'Under what data distribution does bucket sort perform best?',
      },
      options: [
        { ru: 'При равномерном распределении на известном интервале', en: 'Under uniform distribution over a known interval' },
        { ru: 'При нормальном (гауссовом) распределении с пиком в центре', en: 'Under a normal (Gaussian) distribution with a peak in the center' },
        { ru: 'При уже отсортированных данных - как у insertion sort', en: 'On already-sorted data - the same as insertion sort' },
        { ru: 'При обратно отсортированных данных - наихудший случай для bubble sort', en: 'On reverse-sorted data - the worst case for bubble sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'При равномерном распределении каждая корзина получает примерно n/k элементов, что минимизирует время сортировки каждой корзины и приводит к O(n + k) суммарно.',
        en: 'With uniform distribution, each bucket receives roughly n/k elements, minimizing the sorting time per bucket and yielding O(n + k) overall.',
      },
      hint: {
        ru: 'При каком распределении корзины заполняются наиболее равномерно? Названо в подразделе «Когда применять» на вкладке «Суть».',
        en: 'Under which distribution do buckets fill most evenly? Named in the "When to use" subsection on the "Intent" tab.',
      },
    },
  ],
};

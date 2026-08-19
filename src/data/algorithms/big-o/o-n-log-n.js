export const oNLogN = {
  slug: 'o-n-log-n',
  category: 'big-o',
  name: { ru: 'O(n log n) - Линеарифмическая Сложность', en: 'O(n log n) - Linearithmic Time' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 3,
  tags: ['linearithmic', 'divide-and-conquer', 'comparison-sort'],

  intent: {
    ru: 'O(n log n) - это когда алгоритм делит данные пополам снова и снова (получается log n уровней), а на каждом уровне честно обрабатывает все n элементов. Итоговая работа - произведение этих двух чисел, не сумма. Это класс, в котором живёт почти любая быстрая сортировка общего назначения: заметно быстрее, чем перебор всех пар (O(n²)), но чуть дороже, чем один проход по данным (O(n)).',
    en: 'O(n log n) describes an algorithm that keeps splitting the data in half (producing log n levels) while doing a full pass over all n elements at every one of those levels. The total work is the product of the two, not their sum. This is the class almost every fast general-purpose sort lives in: noticeably faster than checking all pairs (O(n²)), but a bit more expensive than a single pass over the data (O(n)).',
  },

  problem: {
    ru: 'Сортировки вроде Bubble Sort или Insertion Sort работают за O(n²): на 10 000 элементах это уже до 100 000 000 сравнений, счёт идёт на секунды там, где хочется миллисекунды. При этом простой однопроходный O(n) для сортировки в общем случае недостижим - алгоритму нужно как-то сравнить между собой все элементы, а не просто взглянуть на каждый по одному разу. Нужен способ сортировать быстрее квадратичного роста, не выдумывая для этого что-то невозможное вроде настоящего O(n).',
    en: 'Sorts like Bubble Sort or Insertion Sort run at O(n²): on 10,000 elements that is already up to 100,000,000 comparisons, seconds where milliseconds are wanted. At the same time, a simple single-pass O(n) is not achievable for general-purpose sorting - the algorithm has to compare elements against each other somehow, not just glance at each one once. What is needed is a way to sort faster than quadratic growth, without inventing something impossible like true O(n) sorting.',
  },

  solution: {
    ru: 'Алгоритм попадает в O(n log n), если он **делит задачу пополам** (это даёт `log₂ n` уровней разбиения) и на **каждом уровне выполняет O(n) работы** - слияние, партиционирование или проход по всем элементам целиком. Итоговая сложность - произведение числа уровней на работу одного уровня: `log n · n`. Узнать такой код можно по характерной форме: **рекурсия, которая на каждом шаге делит вход примерно пополам**, а после рекурсивных вызовов (или перед ними) стоит цикл, проходящий по всем элементам текущего куска.',
    en: 'An algorithm lands in O(n log n) if it **splits the problem in half** (producing `log₂ n` levels of division) and does **O(n) of work at every one of those levels** - merging, partitioning, or a full pass over the current chunk. The total cost is the number of levels multiplied by the work per level: `log n · n`. The tell in code: **recursion that roughly halves the input on every call**, paired with a loop before or after the recursive calls that walks the full current chunk.',
  },

  steps: [
    {
      title: { ru: 'n умножить на log n, не сложить', en: 'n times log n, not n plus log n' },
      explanation: {
        ru: 'При `n = 4` уровней разбиения `log₂ 4 = 2`, и на каждом уровне - 4 операции. Итого `4 · 2 = 8`, а не `4 + 2 = 6`. Это умножение, и именно оно даёт характерную форму кривой.',
        en: 'At `n = 4` there are `log₂ 4 = 2` levels, and each level does 4 operations. The total is `4 · 2 = 8`, not `4 + 2 = 6`. It is a product, and that product shapes the curve.',
      },
    },
    {
      title: { ru: 'Круче линии, положе параболы', en: 'Steeper than a line, flatter than a parabola' },
      explanation: {
        ru: 'Кривая O(n log n) идёт заметно выше прямой O(n) - множитель `log n` больше 1 при `n > 2`. Но она остаётся далеко ниже параболы O(n²), потому что `log n` растёт куда медленнее, чем сам `n`.',
        en: 'The O(n log n) curve sits visibly above the straight O(n) line - the `log n` factor exceeds 1 once `n > 2`. But it stays far below the O(n²) parabola, because `log n` grows far slower than `n` itself.',
      },
    },
    {
      title: { ru: 'Пример: сортировка слиянием', en: 'Example: merge sort' },
      explanation: {
        ru: 'Самый частый источник O(n log n) - разделяй-и-властвуй сортировки. Массив делится пополам `log n` раз, а слияние двух отсортированных половин на каждом уровне - это честный проход по всем n элементам.',
        en: 'The typical source of O(n log n) is a divide-and-conquer sort. The array is halved `log n` times, and merging two sorted halves at each level is an honest pass over all n elements.',
      },
    },
    {
      title: { ru: 'n = 8: 8 · log₂ 8 = 24', en: 'n = 8: 8 · log₂ 8 = 24' },
      explanation: {
        ru: '3 уровня разбиения (`8 → 4 → 2 → 1`), на каждом - 8 операций слияния суммарно. `8 · 3 = 24` - против 8 у O(n) и 64 у O(n²) на том же n.',
        en: '3 levels of splitting (`8 to 4 to 2 to 1`), 8 units of merge work total at each. `8 · 3 = 24` - versus 8 for O(n) and 64 for O(n²) at the same n.',
      },
    },
    {
      title: { ru: 'Между O(n) и O(n²)', en: 'Between O(n) and O(n²)' },
      explanation: {
        ru: 'К `n = 10` линия O(n log n) стоит на отметке около 33, заметно выше линии O(n) (на 10), но всё ещё далеко от O(n²) (100, упирается в потолок графика).',
        en: 'By `n = 10`, the O(n log n) line sits around 33 - noticeably above the O(n) line (at 10), but still far below O(n²) (100, hitting the top of the chart).',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}`,
    python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Сигнатура и базовый случай', en: 'Signature and the base case' },
        explanation: {
          ru: '`mergeSort` принимает массив `arr`. Если в нём 0 или 1 элемент, сортировать нечего - рекурсия останавливается здесь, это база разбиения.',
          en: '`mergeSort` takes an array `arr`. If it holds 0 or 1 elements, there is nothing to sort - the recursion stops here, the base case of the split.',
        },
      },
      {
        lines: [3, 4, 5],
        title: { ru: 'Деление пополам', en: 'Splitting in half' },
        explanation: {
          ru: '`mid` делит массив на две примерно равные половины, и каждая рекурсивно сортируется отдельным вызовом `mergeSort`. Именно эта рекурсия и создаёт `log₂ n` уровней разбиения.',
          en: '`mid` splits the array into two roughly equal halves, each sorted by its own recursive `mergeSort` call. This recursion is exactly what produces the `log₂ n` levels of splitting.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Слияние отсортированных половин', en: 'Merging the sorted halves' },
        explanation: {
          ru: '`merge(left, right)` соединяет две уже отсортированные половины в один отсортированный массив. Эта строка - точка, где на каждом уровне рекурсии выполняется O(n) работы.',
          en: '`merge(left, right)` combines two already-sorted halves into one sorted array. This line is where O(n) of work happens at every level of the recursion.',
        },
      },
      {
        lines: [9, 10, 11, 12],
        title: { ru: 'Подготовка к слиянию', en: 'Setting up the merge' },
        explanation: {
          ru: '`result` - массив под ответ, `i` и `j` - указатели на текущий необработанный элемент в `left` и `right` соответственно, оба начинаются с нуля.',
          en: '`result` is the output array, `i` and `j` are pointers to the next unprocessed element in `left` and `right`, both starting at zero.',
        },
      },
      {
        lines: [13, 14, 15],
        title: { ru: 'Сравнение голов двух половин', en: 'Comparing the two heads' },
        explanation: {
          ru: 'Пока в обеих половинах остались элементы, в результат уходит меньший из двух текущих - `left[i]` или `right[j]`. Это единственное сравнение на шаг, и весь цикл в сумме делает не больше `left.length + right.length` таких сравнений - линейно от размера обеих половин вместе.',
          en: 'While both halves still have elements left, the smaller of `left[i]` and `right[j]` goes into the result. That is one comparison per step, and the whole loop makes at most `left.length + right.length` of them in total - linear in the combined size of both halves.',
        },
      },
      {
        lines: [17],
        title: { ru: 'Остаток одной из половин', en: 'The leftover tail' },
        explanation: {
          ru: 'Когда одна половина закончилась, вторая уже отсортирована - её остаток просто дописывается в конец без единого сравнения. `concat` завершает O(n) работу этого уровня слияния.',
          en: 'Once one half runs out, the other is already sorted - its remaining tail is simply appended with no further comparisons. `concat` finishes the O(n) work of this merge level.',
        },
      },
    ],
    python: [
      {
        lines: [1, 2, 3],
        title: { ru: 'Сигнатура и базовый случай', en: 'Signature and the base case' },
        explanation: {
          ru: '`merge_sort` принимает список `arr`. Список из 0 или 1 элементов уже отсортирован сам по себе - это база рекурсии, та же, что и в JS-версии.',
          en: '`merge_sort` takes a list `arr`. A list of 0 or 1 elements is already sorted by definition - the recursion base, identical to the JS version.',
        },
      },
      {
        lines: [4, 5, 6],
        title: { ru: 'Деление пополам', en: 'Splitting in half' },
        explanation: {
          ru: '`mid` делит список на две половины срезами `arr[:mid]`/`arr[mid:]`, каждая сортируется своим рекурсивным вызовом - тот же источник `log₂ n` уровней, что в JS.',
          en: '`mid` splits the list into two halves via `arr[:mid]`/`arr[mid:]`, each sorted by its own recursive call - the same source of `log₂ n` levels as in JS.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Слияние отсортированных половин', en: 'Merging the sorted halves' },
        explanation: {
          ru: '`merge(left, right)` объединяет две отсортированные половины - та же точка O(n) работы на уровень, что и в JS-версии.',
          en: '`merge(left, right)` combines the two sorted halves - the same O(n)-per-level merge point as the JS version.',
        },
      },
      {
        lines: [9, 10, 11],
        title: { ru: 'Подготовка к слиянию', en: 'Setting up the merge' },
        explanation: {
          ru: '`result` собирает ответ, `i = j = 0` заводит оба указателя сразу - функционально то же самое, что раздельные `let i = 0; let j = 0;` в JS.',
          en: '`result` collects the output, `i = j = 0` sets up both pointers at once - functionally the same as the separate `let i = 0; let j = 0;` in JS.',
        },
      },
      {
        lines: [12, 13, 14, 15, 16, 17, 18],
        title: { ru: 'Сравнение голов двух половин', en: 'Comparing the two heads' },
        explanation: {
          ru: 'Тот же цикл, что в JS: пока в обеих половинах остались элементы, меньший уходит в `result`, а соответствующий указатель сдвигается на один шаг вперёд.',
          en: 'The same loop as JS: while both halves still have elements, the smaller one goes into `result`, and the matching pointer advances by one.',
        },
      },
      {
        lines: [19, 20, 21],
        title: { ru: 'Остаток одной из половин', en: 'The leftover tail' },
        explanation: {
          ru: '`extend` дописывает в конец то, что осталось непосредственно в `left` или `right` - тот же остаток без сравнений, что и `concat` в JS.',
          en: '`extend` appends whatever remains directly in `left` or `right` - the same comparison-free leftover as `concat` in JS.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Намного быстрее квадратичных сортировок на больших данных: на 10 000 элементах это около 130 000 операций против 100 000 000 у O(n²).',
      en: 'Far faster than quadratic sorts at scale: on 10,000 elements that is roughly 130,000 operations versus 100,000,000 for O(n²).',
    },
    {
      ru: 'Это доказанный потолок для сортировки сравнением - быстрее в общем случае не бывает, так что не приходится гадать, существует ли более быстрый вариант.',
      en: 'This is the proven ceiling for comparison-based sorting - nothing faster exists in the general case, so there is no need to wonder whether a faster approach is out there.',
    },
    {
      ru: 'Многие алгоритмы этого класса (Merge Sort, Heap Sort) дают гарантию O(n log n) даже в худшем случае, без неприятных сюрпризов на конкретных входных данных.',
      en: 'Many algorithms in this class (Merge Sort, Heap Sort) guarantee O(n log n) even in the worst case, with no unpleasant surprises on any specific input.',
    },
  ],
  cons: [
    {
      ru: 'Всё ещё заметно дороже, чем O(n): если задачу можно решить одним проходом (сумма, максимум), сортировка ради неё - лишняя работа.',
      en: 'Still noticeably more expensive than O(n): if the task can be solved with a single pass (sum, maximum), sorting for it is unnecessary work.',
    },
    {
      ru: 'Разбиение и слияние часто требуют дополнительной памяти под промежуточные массивы (как `left`/`right`/`result` у Merge Sort) - O(n) сверх исходных данных.',
      en: 'Splitting and merging often need extra memory for intermediate arrays (like `left`/`right`/`result` in Merge Sort) - O(n) on top of the original data.',
    },
    {
      ru: 'Если данные и так почти отсортированы или подходят под более узкий частный случай (диапазон целых чисел, ограниченный алфавит), O(n)-сортировки вроде Counting Sort или Radix Sort обгонят это в разы.',
      en: 'If the data is nearly sorted already or fits a narrower special case (a bounded integer range, a limited alphabet), O(n) sorts like Counting Sort or Radix Sort will beat this by a wide margin.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда нужно отсортировать произвольные, ничем заранее не ограниченные данные (сравнимые между собой значения любого типа), и объём данных достаточно велик, чтобы O(n²) стало заметно медленным.',
      en: 'When arbitrary, unrestricted data needs sorting (any comparable values, no special structure), and the volume is large enough that O(n²) becomes visibly slow.',
    },
    {
      ru: 'Когда важна гарантия худшего случая, а не только средняя скорость - Merge Sort и Heap Sort не деградируют на неудачных входных данных, в отличие от некоторых O(n log n)-в-среднем алгоритмов.',
      en: 'When a worst-case guarantee matters more than average speed alone - Merge Sort and Heap Sort do not degrade on adversarial input, unlike some algorithms that are only O(n log n) on average.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Array.prototype.sort в V8** и стандартные сортировки Python/Java - все построены на вариантах O(n log n) (Timsort, уже реализованный в разделе сортировок).',
      en: '**Array.prototype.sort in V8** and the standard sorts in Python/Java - all built on O(n log n) variants (Timsort, already implemented in the sorting section).',
    },
    {
      ru: '**Быстрое преобразование Фурье (FFT)** в обработке звука и сжатии сигналов - тот же принцип «разделяй пополам, объединяй за O(n)», но применённый не к сортировке, а к вычислению спектра.',
      en: '**The Fast Fourier Transform (FFT)** in audio processing and signal compression - the same "split in half, combine in O(n)" principle, applied to computing a spectrum instead of sorting.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Формально O(n log n) значит: работа равна `n`, умноженному на `log₂ n` - число уровней разбиения. При `n = 8` это `8 · log₂ 8 = 8 · 3 = 24`. Это именно **умножение**, а не сложение: `log n` показывает, во сколько раз n «повторяет» свою O(n)-работу на разных уровнях рекурсии, а не сколько операций добавляется поверх линейного прохода.',
        en: 'Formally, O(n log n) means the work equals `n` multiplied by `log₂ n`, the number of splitting levels. At `n = 8` that is `8 · log₂ 8 = 8 · 3 = 24`. It is genuinely a **product**, not a sum: `log n` counts how many times the O(n) work repeats across recursion levels, not how many extra operations get tacked onto a single linear pass.',
      },
      {
        ru: 'Числа растут показательно, но не квадратично. При `n = 1 000` работа - около **9 966** операций (`1000 · log₂ 1000 ≈ 1000 · 9.97`). При `n = 1 000 000` - уже **19 931 569**, около 19.9 миллиона. Данные выросли в 1000 раз, а работа - примерно в **2000 раз**, а не ровно в 1000: лишний множитель дал рост самого `log n` с 9.97 до 19.93 - почти вдвое. Для сравнения, у O(n²) тот же рост данных в 1000 раз означал бы рост работы в миллион раз - разница на несколько порядков.',
        en: 'The numbers grow noticeably, but not quadratically. At `n = 1,000`, the work is about **9,966** operations (`1000 · log₂ 1000 ≈ 1000 · 9.97`). At `n = 1,000,000`, it is **19,931,569**, roughly 19.9 million. The input grew 1000x, and the work grew by roughly **2000x**, not exactly 1000x: the extra factor comes from `log n` itself nearly doubling, from 9.97 to 19.93. For comparison, an O(n²) algorithm would see that same 1000x input growth turn into a millionfold jump in work - orders of magnitude apart.',
      },
      {
        ru: 'Структурно это разделяй-и-властвуй: `mergeSort` делит массив пополам `log₂ n` раз, пока не останутся кусочки длиной 1, а `merge` на каждом уровне честно проходит по всем элементам этого уровня - в сумме `n` элементов на уровень, независимо от того, сколько кусочков на нём сейчас лежит. Ровно эта пара - «глубина рекурсии `log n`» и «O(n) работы на уровень» - и даёт произведение `n log n`.',
        en: 'Structurally this is divide-and-conquer: `mergeSort` halves the array `log₂ n` times until pieces of length 1 remain, and `merge` walks a full `n` elements worth of work at every level, regardless of how many pieces that level currently holds. That exact pair - "recursion depth `log n`" and "O(n) of work per level" - is what produces the product `n log n`.',
      },
      {
        ru: 'O(n log n) - это доказанная нижняя граница для **любой** сортировки, основанной на сравнении пар элементов, а не просто «типичная скорость». Массив из n элементов можно упорядочить `n!` разными способами, и каждое сравнение делит оставшиеся варианты примерно пополам - значит нужно минимум `log₂(n!)` сравнений, чтобы отличить один порядок от всех остальных. По формуле Стирлинга `log₂(n!) ≈ n log₂ n`: быстрее этого предела никакая сортировка сравнением в худшем случае работать не может.',
        en: 'O(n log n) is a proven lower bound for **any** sort based on pairwise comparisons, not just a typical speed. An array of n elements can be ordered in `n!` different ways, and each comparison roughly halves the remaining possibilities - so at least `log₂(n!)` comparisons are needed to pin down the one true order among all the rest. By Stirling\'s approximation, `log₂(n!) ≈ n log₂ n`: no comparison-based sort can beat this bound in the worst case.',
      },
      {
        ru: 'Это объясняет, почему Counting Sort, Radix Sort и Bucket Sort (уже реализованы в разделе сортировок) достигают O(n) и не противоречат этой границе - они **не сравнивают элементы друг с другом**. Counting Sort раскладывает значения напрямую по индексам счётчика, Radix Sort - по разрядам числа: граница `n log n` применима только к алгоритмам, которые узнают порядок через сравнения `<`/`>`, а не через прямой доступ по значению.',
        en: 'This explains why Counting Sort, Radix Sort, and Bucket Sort (already implemented in the sorting section) reach O(n) without contradicting this bound - they **never compare elements against each other**. Counting Sort places values directly by count-array index, Radix Sort by digit: the `n log n` bound only applies to algorithms that discover order through `<`/`>` comparisons, not through direct access by value.',
      },
      {
        ru: 'На маленьких n разница с O(n) обманчива: при `n = 10` `log₂ 10 ≈ 3.3` - множитель кажется несущественным, кривые почти сливаются на графике. Но `log n` растёт без остановки, просто очень медленно - при `n = 1 000 000` тот же множитель равен 19.93, и разрыв между O(n) и O(n log n) уже составляет почти 20 раз, а не «почти незаметен», как казалось на маленьких значениях.',
        en: 'At small n, the gap from O(n) is deceptive: at `n = 10`, `log₂ 10 ≈ 3.3` - the multiplier looks negligible, the curves nearly overlap on the chart. But `log n` keeps growing, just very slowly - at `n = 1,000,000` that same multiplier is 19.93, and the gap between O(n) and O(n log n) is now nearly 20x, not the "barely noticeable" difference small values suggested.',
      },
    ],
    whenToUse: [
      {
        ru: '**Сортировка данных общего вида без ограничений** - произвольные сравнимые значения, где нельзя воспользоваться трюками вроде Counting Sort (ограниченный диапазон целых) или Radix Sort (фиксированное число разрядов).',
        en: '**Sorting unrestricted general-purpose data** - arbitrary comparable values, where tricks like Counting Sort (bounded integer range) or Radix Sort (fixed digit count) do not apply.',
      },
      {
        ru: '**Против O(n²)** - на любом входе, кроме совсем маленького (примерно до нескольких десятков элементов, где константы перевешивают), O(n log n)-сортировка обгонит Bubble Sort или Insertion Sort.',
        en: '**Against O(n²)** - on any input beyond a handful of elements (where constant factors can still win), an O(n log n) sort will outrun Bubble Sort or Insertion Sort.',
      },
      {
        ru: '**Против O(n)** - если задачу можно решить одним проходом без установления полного порядка (сумма, максимум, проверка на дубликаты через множество), сортировка - лишний шаг, не нужный самой задаче.',
        en: '**Against O(n)** - if the task can be solved in one pass without establishing a full order (sum, maximum, a duplicate check via a set), sorting is an unnecessary detour from the actual task.',
      },
      {
        ru: '**Гарантия против средней скорости** - если нельзя допустить деградацию на неудачном входе, стоит выбирать алгоритм с гарантией O(n log n) в худшем случае (Merge Sort, Heap Sort), а не только в среднем (как базовый Quick Sort).',
        en: '**Guarantee versus average speed** - if degrading on an adversarial input is not acceptable, pick an algorithm that guarantees O(n log n) in the worst case (Merge Sort, Heap Sort), not just on average (like plain Quick Sort).',
      },
    ],
    realWorld: [
      {
        ru: '**Timsort** (в разделе сортировок, стандарт сортировки в Python и Java) - гибрид, гарантирующий O(n log n) в худшем случае и ускоряющийся на частично отсортированных данных.',
        en: '**Timsort** (in the sorting section, the standard sort in Python and Java) - a hybrid guaranteeing O(n log n) worst case while speeding up on partially sorted data.',
      },
      {
        ru: '**Построение дерева Хаффмана** для сжатия данных - на каждом шаге из очереди с приоритетом (кучи) извлекаются два самых редких символа, `log n` работы на операцию, `n` операций всего.',
        en: '**Building a Huffman coding tree** for data compression - each step pulls the two rarest symbols from a priority queue (a heap), `log n` of work per operation, `n` operations total.',
      },
      {
        ru: '**Быстрое преобразование Фурье (FFT)** - основа цифровой обработки сигналов (аудио, изображения, сжатие MP3/JPEG), сводит вычисление, которое напрямую заняло бы O(n²), к O(n log n) тем же разделяй-и-властвуй приёмом.',
        en: '**The Fast Fourier Transform (FFT)** - the backbone of digital signal processing (audio, images, MP3/JPEG compression), cutting a computation that would naively take O(n²) down to O(n log n) with the same divide-and-conquer trick.',
      },
      {
        ru: '**Построение выпуклой оболочки (convex hull)** в вычислительной геометрии - алгоритмы вроде Quickhull делят точки пополам и объединяют результат, тот же паттерн, что у Merge Sort, только над точками на плоскости.',
        en: '**Convex hull construction** in computational geometry - algorithms like Quickhull split points in half and combine the result, the same pattern as Merge Sort, just applied to points on a plane.',
      },
    ],
  },

  relatedAlgorithms: ['o-n', 'o-log-n'],

  quiz: [
    {
      question: {
        ru: 'Как связаны между собой n и log n в формуле сложности O(n log n)?',
        en: 'How are n and log n related in the O(n log n) complexity formula?',
      },
      options: [
        { ru: 'Умножаются: работа - это n, повторённое log n раз на разных уровнях', en: 'They are multiplied: the work is n, repeated log n times across levels' },
        { ru: 'Складываются: сначала выполняется n операций, потом ещё log n сверху', en: 'They are added: n operations run first, then log n more on top' },
        { ru: 'Делятся: итоговая работа - это n, делённое на log n на каждом шаге', en: 'They are divided: the total work is n divided by log n at every step' },
        { ru: 'Никак не связаны: log n здесь - это просто название класса, а не число', en: 'They are unrelated: log n here is just a class label, not an actual number' },
      ],
      correct: 0,
      explanation: {
        ru: 'O(n log n) - это произведение n на log n, а не их сумма: при n = 4 это 4 · 2 = 8, а не 4 + 2 = 6.',
        en: 'O(n log n) is the product of n and log n, not their sum: at n = 4 that is 4 · 2 = 8, not 4 + 2 = 6.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - первый шаг напрямую разбирает пример с n = 4.',
        en: 'See the "Intent" tab - the first step directly works through the n = 4 example.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде можно узнать O(n log n)?',
        en: 'What code pattern signals O(n log n)?',
      },
      options: [
        { ru: 'Рекурсия, делящая вход примерно пополам, с O(n) работы на каждом уровне', en: 'Recursion that roughly halves the input, with O(n) of work at every level' },
        { ru: 'Один цикл без вложенности, проходящий по всем элементам ровно один раз', en: 'A single non-nested loop that walks every element exactly once' },
        { ru: 'Два цикла один внутри другого, оба зависящие от полного размера входа', en: 'Two loops nested inside each other, both depending on the full input size' },
        { ru: 'Код вообще без циклов и рекурсии - только фиксированный набор простых действий заранее', en: 'Code with no loops or recursion at all - just a fixed set of operations' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно эту пару признаков показывает `mergeSort` на вкладке «Реализация»: деление пополам плюс O(n) слияние на уровень.',
        en: 'That exact pair is what `mergeSort` shows on the "Implementation" tab: halving the input plus O(n) merge work per level.',
      },
      hint: {
        ru: 'Смотрите строки 3-6 функции `mergeSort` на вкладке «Реализация» и шаг «Деление пополам».',
        en: 'See lines 3-6 of `mergeSort` on the "Implementation" tab and its walkthrough step "Splitting in half".',
      },
    },
    {
      question: {
        ru: 'На графике: как расположена линия O(n log n) при n = 10 относительно O(n) и O(n²)?',
        en: 'On the visualization chart: where does the O(n log n) line sit at n = 10 relative to O(n) and O(n²)?',
      },
      options: [
        { ru: 'Заметно выше O(n), но далеко ниже O(n²)', en: 'Noticeably above O(n), but far below O(n²)' },
        { ru: 'Точно совпадает с линией O(n) на всём графике', en: 'Exactly overlaps the O(n) line across the whole chart' },
        { ru: 'Выше O(n²) - самая быстрорастущая линия из всех восьми', en: 'Above O(n²) - the fastest-growing line of all eight' },
        { ru: 'Ниже O(log n) - растёт медленнее любой другой линии на графике', en: 'Below O(log n) - grows slower than any other line on the chart' },
      ],
      correct: 0,
      explanation: {
        ru: 'O(n log n) занимает промежуточное положение между линейным и квадратичным ростом - это видно по форме кривой.',
        en: 'O(n log n) sits between linear and quadratic growth - visible directly in the shape of the curve.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и сравните высоту всех трёх линий при n = 10.',
        en: 'Open the "Visualization" tab and compare the height of all three lines at n = 10.',
      },
    },
    {
      question: {
        ru: 'Почему в `mergeSort` рекурсия создаёт именно `log₂ n` уровней, а не, скажем, `n` уровней?',
        en: 'Why does the recursion in `mergeSort` produce exactly `log₂ n` levels, rather than, say, n levels?',
      },
      options: [
        { ru: 'На каждом уровне размер куска делится пополам, а не уменьшается на единицу', en: 'At every level the chunk size is halved, not reduced by one' },
        { ru: 'Потому что массив всегда делится ровно на 3 равные части на каждом уровне', en: 'Because the array always splits into exactly 3 equal parts at every level' },
        { ru: 'Количество уровней задаётся длиной массива вручную через отдельный счётчик', en: 'The number of levels is set manually by the input array length via a separate counter' },
        { ru: 'Рекурсия останавливается только когда массив достигает ровно 10 элементов', en: 'The recursion only stops once the array reaches exactly 10 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Деление пополам на каждом шаге - это и есть определение log₂ n: сколько раз n можно поделить на 2, прежде чем останется 1.',
        en: 'Halving at every step is exactly the definition of log₂ n: how many times n can be divided by 2 before 1 is left.',
      },
      hint: {
        ru: 'Смотрите шаг «Деление пополам» на вкладке «Реализация» и первый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the "Splitting in half" walkthrough step on the "Implementation" tab and the first "Deep dive" paragraph on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Данные выросли с 1 000 до 1 000 000 элементов - в 1000 раз. Во сколько раз выросла работа у O(n log n)-алгоритма?',
        en: 'The data grew from 1,000 to 1,000,000 elements - 1000x. By what factor did the work of an O(n log n) algorithm grow?',
      },
      options: [
        { ru: 'Примерно в 2000 раз - лишний множитель дал рост самого log n почти вдвое', en: 'By roughly 2000x - the extra factor comes from log n itself nearly doubling' },
        { ru: 'Ровно в 1000 раз, вместе с тем, во сколько раз выросли сами данные', en: 'By exactly 1000x, matching how much the data itself grew' },
        { ru: 'В 1 000 000 раз - так же, как выросла бы работа у алгоритма O(n²)', en: 'By 1,000,000x - the same growth an O(n²) algorithm would show' },
        { ru: 'Работа не изменилась вообще - log n компенсирует любой рост самого n целиком', en: 'The work did not change at all - log n fully cancels out any growth in n by design' },
      ],
      correct: 0,
      explanation: {
        ru: '1000-кратный рост n даёт рост работы примерно в 2000 раз (9 966 → 19 931 569), потому что log₂ n тоже выросло, почти удвоившись.',
        en: 'A 1000x growth in n produces roughly a 2000x growth in work (9,966 to 19,931,569), because log₂ n also grew, nearly doubling.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть» - там разобраны точные числа 9 966 и 19 931 569.',
        en: 'See the second "Deep dive" paragraph on the "Intent" tab - it works through the exact numbers 9,966 and 19,931,569.',
      },
    },
    {
      question: {
        ru: 'Почему ни один алгоритм сортировки, основанный на сравнении элементов, не может в худшем случае работать быстрее O(n log n)?',
        en: 'Why can no comparison-based sorting algorithm run faster than O(n log n) in the worst case?',
      },
      options: [
        { ru: 'Нужно минимум log₂(n!) сравнений, чтобы отличить один из n! порядков от всех остальных', en: 'At least log₂(n!) comparisons are needed to tell one of the n! possible orderings apart from the rest' },
        { ru: 'Аппаратные ограничения процессора не позволяют сравнивать элементы быстрее этого предела', en: 'CPU hardware limitations prevent comparing elements faster than this bound' },
        { ru: 'Это не доказанный факт, а просто удобное практическое соглашение среди программистов', en: 'This is not a proven fact at all, just a convenient practical convention agreed on informally among programmers' },
        { ru: 'Языки программирования технически запрещают писать сортировки быстрее O(n log n)', en: 'Programming languages technically forbid implementing sorts faster than O(n log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждое сравнение делит оставшиеся варианты порядка примерно пополам, значит нужно минимум log₂(n!) ≈ n log₂ n сравнений - это доказанная граница, а не соглашение.',
        en: 'Each comparison roughly halves the remaining candidate orderings, so at least log₂(n!) ≈ n log₂ n comparisons are required - a proven bound, not a convention.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть» - про n! перестановок и формулу Стирлинга.',
        en: 'See the fourth "Deep dive" paragraph on the "Intent" tab - about the n! permutations and Stirling\'s approximation.',
      },
    },
    {
      question: {
        ru: 'Counting Sort и Radix Sort (уже реализованы в разделе сортировок) достигают O(n) - как это согласуется с границей O(n log n) для сортировки?',
        en: 'Counting Sort and Radix Sort (already implemented in the sorting section) reach O(n) - how does this square with the O(n log n) sorting bound?',
      },
      options: [
        { ru: 'Граница применима только к сортировкам сравнением - эти алгоритмы не сравнивают элементы друг с другом', en: 'The bound only applies to comparison-based sorts - these algorithms never compare elements against each other' },
        { ru: 'Это ошибка в их реализации - на самом деле они никак не могут быть быстрее O(n log n) ни при каких условиях', en: 'It is a bug in their implementation - they cannot actually be faster than O(n log n) in reality, under any circumstances' },
        { ru: 'Граница O(n log n) относится только к массивам длиннее миллиона элементов', en: 'The O(n log n) bound only applies to arrays longer than a million elements' },
        { ru: 'Counting Sort и Radix Sort используют скрытую сортировку сравнением внутри себя', en: 'Counting Sort and Radix Sort secretly rely on a comparison sort hidden inside them' },
      ],
      correct: 0,
      explanation: {
        ru: 'Counting Sort раскладывает значения напрямую по индексам счётчика, Radix Sort - по разрядам числа: обе узнают порядок без единого сравнения `<`/`>`.',
        en: 'Counting Sort places values directly by count-array index, Radix Sort by digit: both discover order without a single `<`/`>` comparison.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» - про Counting Sort и Radix Sort как исключение.',
        en: 'See the fifth "Deep dive" paragraph on the "Intent" tab - about Counting Sort and Radix Sort as the exception.',
      },
    },
    {
      question: {
        ru: 'Чем `mergeSort` (O(n log n)) отличается по структуре от Bubble Sort (O(n²)) из раздела сортировок?',
        en: 'How does `mergeSort` (O(n log n)) structurally differ from Bubble Sort (O(n²)) in the sorting section?',
      },
      options: [
        { ru: 'У mergeSort глубина рекурсии - log n уровней с O(n) работы на каждом, у Bubble Sort - n полных проходов подряд', en: "mergeSort's recursion has log n levels of O(n) work each, while Bubble Sort runs n full passes back to back" },
        { ru: 'Bubble Sort вообще не использует сравнения элементов, только прямую перестановку по индексам', en: 'Bubble Sort uses no element comparisons at all, only direct index-based repositioning' },
        { ru: 'mergeSort делает заметно больше отдельных сравнений на каждый элемент, чем Bubble Sort вообще когда-либо делает', en: 'mergeSort performs more individual comparisons per element than Bubble Sort ever performs' },
        { ru: 'Структурной разницы нет - у обоих ровно n проходов, отличается только порядок операций', en: 'There is no structural difference at all here - both make exactly n passes, only the operation order differs' },
      ],
      correct: 0,
      explanation: {
        ru: 'У Bubble Sort n проходов, каждый - O(n): итого n · n = n². У mergeSort - log n уровней, каждый - O(n): итого n · log n, заметно меньше при больших n.',
        en: 'Bubble Sort has n passes at O(n) each: n · n = n² total. mergeSort has log n levels at O(n) each: n · log n total, noticeably smaller at large n.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - прямое сравнение структуры рекурсии и вложенных циклов.',
        en: 'See the third "Deep dive" paragraph on the "Intent" tab - a direct comparison of the recursion structure versus nested loops.',
      },
    },
    {
      question: {
        ru: 'При n = 10 разница между O(n) и O(n log n) выглядит небольшой - множитель log₂ 10 ≈ 3.3. Почему нельзя сказать, что на практике это «почти одно и то же»?',
        en: 'At n = 10 the gap between O(n) and O(n log n) looks small - the multiplier log₂ 10 ≈ 3.3. Why is it wrong to call these "practically the same" in general?',
      },
      options: [
        { ru: 'log n продолжает расти без остановки: при n = 1 000 000 тот же множитель уже около 20, а не 3.3', en: 'log n keeps growing without bound: at n = 1,000,000 that same multiplier is already about 20, not 3.3' },
        { ru: 'На самом деле log₂ 10 точно равен 1, а не 3.3 - в примере ошибка вычисления', en: 'log₂ 10 is actually exactly equal to 1, not 3.3 at all - the example simply contains a calculation error' },
        { ru: 'Разница появляется только для нечётных значений n, а n = 10 - чётное число', en: 'The gap only appears for odd values of n, and n = 10 happens to be even' },
        { ru: 'Разницы никогда не будет ни при каком значении n - это просто два разных названия одного и того же класса', en: 'There will never be a difference at any n - these are two names for the same complexity class' },
      ],
      correct: 0,
      explanation: {
        ru: 'log n растёт медленно, но не останавливается: множитель, который на n = 10 равен 3.3, на n = 1 000 000 вырастает почти до 20 - разница накапливается с ростом n, а не исчезает.',
        en: 'log n grows slowly but never stops: the multiplier that is 3.3 at n = 10 grows to nearly 20 at n = 1,000,000 - the gap compounds as n grows, it does not vanish.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» на вкладке «Суть» - про обманчивость разницы на маленьких n.',
        en: 'See the last "Deep dive" paragraph on the "Intent" tab - about the deceptive gap at small n.',
      },
    },
    {
      question: {
        ru: 'Нужно отсортировать данные с гарантией, что худший случай никогда не деградирует до O(n²), даже на специально подобранном неудачном входе. Что выбрать: Merge Sort или базовый Quick Sort?',
        en: 'Data must be sorted with a guarantee that the worst case never degrades to O(n²), even on a specially crafted adversarial input. Merge Sort or plain Quick Sort?',
      },
      options: [
        { ru: 'Merge Sort - его O(n log n) гарантирован в худшем случае, а не только в среднем', en: 'Merge Sort - its O(n log n) is guaranteed in the worst case, not only on average' },
        { ru: 'Quick Sort - его средний случай O(n log n) быстрее в реальных бенчмарках всегда', en: 'Quick Sort - its average-case O(n log n) is always faster in real-world benchmarks' },
        { ru: 'Разницы нет - оба гарантируют ровно одинаковый худший случай O(n log n)', en: 'There is no difference - both guarantee exactly the same O(n log n) worst case' },
        { ru: 'Ни один вариант не подходит - для такой гарантии годится только O(n²)-сортировка', en: 'Neither option works - only an O(n²) sort can provide this kind of guarantee' },
      ],
      correct: 0,
      explanation: {
        ru: 'Базовый Quick Sort - O(n log n) только в среднем, а в худшем случае (например, уже отсортированный вход при наивном выборе опорного элемента) деградирует до O(n²); Merge Sort гарантирует O(n log n) при любом входе.',
        en: 'Plain Quick Sort is O(n log n) only on average, degrading to O(n²) in the worst case (for example, an already-sorted input with a naive pivot choice); Merge Sort guarantees O(n log n) regardless of input.',
      },
      hint: {
        ru: 'Смотрите пункт «Гарантия против средней скорости» в разделе «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Guarantee versus average speed" point in the "Choice nuances" section on the "Intent" tab.',
      },
    },
  ],
};

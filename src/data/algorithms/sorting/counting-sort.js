export const countingSort = {
  slug: 'counting-sort',
  category: 'sorting',
  name: { ru: 'Counting Sort', en: 'Counting Sort' },
  complexity: {
    time: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    space: 'O(n + k)',
  },
  popularity: 1,
  tags: ['non-comparison', 'stable', 'integer-keys'],

  intent: {
    ru: 'Сортировка подсчётом не сравнивает элементы друг с другом - она считает, сколько раз встречается каждое значение, и по этим подсчётам напрямую вычисляет финальную позицию каждого элемента.',
    en: 'Counting sort never compares elements against each other - it counts how many times each value occurs, and uses those counts to compute each element\'s final position directly.',
  },

  problem: {
    ru: 'Теоретический предел любой сортировки, основанной на попарных сравнениях, - O(n log n): это доказывается через дерево решений. Но если заранее известно, что значения - это целые числа из небольшого диапазона (например, оценки от 0 до 100 или возраст людей), сравнивать их вообще не обязательно - можно посчитать, сколько раз встречается каждое значение.',
    en: 'The theoretical limit of any comparison-based sort is O(n log n) - this is provable via a decision-tree argument. But if it\'s known in advance that values are integers from a small range (e.g. scores 0-100, or people\'s ages), comparisons aren\'t needed at all - you can just count how many times each value occurs.',
  },

  solution: {
    ru: 'Алгоритм заводит вспомогательный массив `count` длиной в диапазон возможных значений и проходит по входному массиву, увеличивая `count[значение]` для каждого элемента. Затем `count` превращается в массив префиксных сумм - `count[v]` теперь означает «сколько элементов ≤ v», то есть последнюю позицию значения v в отсортированном массиве. После этого исходный массив проходится справа налево: каждый элемент кладётся в выходной массив на позицию `count[значение] - 1`, а счётчик уменьшается - обход справа налево нужен именно для устойчивости сортировки.',
    en: 'The algorithm builds a helper `count` array sized to the range of possible values, then walks the input incrementing `count[value]` for each element. Next, `count` is turned into a prefix-sum array - `count[v]` now means "how many elements are ≤ v," i.e. the last position value v takes in the sorted output. The original array is then walked right to left: each element is placed into the output array at `count[value] - 1`, and the counter is decremented - the right-to-left walk is specifically what makes the sort stable.',
  },

  steps: [
    {
      title: { ru: 'Найти диапазон значений', en: 'Find the value range' },
      explanation: {
        ru: 'Определить минимальное и максимальное значение во входном массиве, чтобы выделить массив `count` нужного размера.',
        en: 'Determine the minimum and maximum values in the input so the `count` array can be sized correctly.',
      },
    },
    {
      title: { ru: 'Посчитать вхождения', en: 'Count occurrences' },
      explanation: {
        ru: 'Пройти по входному массиву и увеличить `count[значение]` для каждого встреченного элемента.',
        en: 'Walk the input array, incrementing `count[value]` for every element encountered.',
      },
    },
    {
      title: { ru: 'Построить префиксные суммы', en: 'Build prefix sums' },
      explanation: {
        ru: 'Превратить `count` в массив накопленных сумм - теперь `count[v]` даёт позицию, где заканчивается диапазон значения v в отсортированном массиве.',
        en: 'Turn `count` into a running-sum array - now `count[v]` gives the position where value v\'s range ends in the sorted output.',
      },
    },
    {
      title: { ru: 'Разместить элементы справа налево', en: 'Place elements right to left' },
      explanation: {
        ru: 'Пройти исходный массив с конца, для каждого элемента взять его позицию из `count`, поставить в выходной массив и уменьшить счётчик.',
        en: 'Walk the original array from the end, look up each element\'s position in `count`, place it in the output, and decrement the counter.',
      },
    },
    {
      title: { ru: 'Вернуть выходной массив', en: 'Return the output array' },
      explanation: {
        ru: 'После обработки всех элементов выходной массив полностью отсортирован.',
        en: 'After processing every element, the output array is fully sorted.',
      },
    },
  ],
  stepBreakpoints: [3, 10, 13, 16],

  implementation: {
    javascript: `function countingSort(arr) {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const count = new Array(max - min + 1).fill(0);

  for (const value of arr) {
    count[value - min]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i];
    count[value - min]--;
    output[count[value - min]] = value;
  }
  return output;
}`,
    python: `def counting_sort(arr):
    if not arr:
        return []
    lo, hi = min(arr), max(arr)
    count = [0] * (hi - lo + 1)

    for value in arr:
        count[value - lo] += 1
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    output = [0] * len(arr)
    for value in reversed(arr):
        count[value - lo] -= 1
        output[count[value - lo]] = value
    return output`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - диапазон значений вычисляется внутри, вызывающему коду не нужно передавать min/max заранее.',
          en: 'The function takes a single array `arr` - the value range is computed inside, so the caller doesn\'t need to pass min/max ahead of time.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Защита от пустого массива', en: 'Guarding against an empty array' },
        explanation: {
          ru: '`if (arr.length === 0) return []` выходит раньше, чем ниже будут вызваны `Math.min(...arr)`/`Math.max(...arr)` - на пустом массиве они вернули бы `Infinity`/`-Infinity`, что сломало бы размер массива `count`.',
          en: '`if (arr.length === 0) return []` exits before `Math.min(...arr)`/`Math.max(...arr)` run below - on an empty array those would return `Infinity`/`-Infinity`, breaking the size of the `count` array.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Диапазон значений', en: 'The value range' },
        explanation: {
          ru: '`min`/`max` находят границы входных данных - это ровно шаг 1 из вкладки «Визуализация», без него невозможно решить, каким размером выделять `count`.',
          en: '`min`/`max` find the bounds of the input data - exactly step 1 from the "Visualization" tab, without it there\'s no way to size `count`.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Выделение массива count', en: 'Allocating the count array' },
        explanation: {
          ru: '`new Array(max - min + 1).fill(0)` создаёт по одной ячейке на каждое возможное значение диапазона - это и есть k из оценки сложности O(n + k), заполненное нулями заранее, чтобы инкременты ниже были корректны.',
          en: '`new Array(max - min + 1).fill(0)` creates one cell per possible value in the range - this is exactly the k in the O(n + k) bound, pre-filled with zeros so the increments below start from a known state.',
        },
      },
      {
        lines: [7, 9],
        title: { ru: 'Подсчёт вхождений', en: 'Counting occurrences' },
        explanation: {
          ru: '`for (const value of arr) count[value - min]++` проходит по входу один раз, увеличивая счётчик своего значения - `value - min` сдвигает индексацию так, чтобы наименьшее значение попадало в ячейку 0, даже если min больше нуля или отрицателен.',
          en: '`for (const value of arr) count[value - min]++` walks the input once, incrementing the counter for its own value - `value - min` shifts indexing so the smallest value lands in cell 0, even if min is above zero or negative.',
        },
      },
      {
        lines: [10, 12],
        title: { ru: 'Префиксные суммы', en: 'Prefix sums' },
        explanation: {
          ru: '`count[i] += count[i - 1]` превращает счётчик отдельных значений в накопленную сумму - после цикла `count[i]` означает «сколько элементов входного массива ≤ значения с индексом i», то есть последний допустимый индекс этого значения в выходе.',
          en: '`count[i] += count[i - 1]` turns per-value counters into a running sum - after the loop, `count[i]` means "how many input elements are ≤ the value at index i," i.e. the last valid output index for that value.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Выходной массив', en: 'The output array' },
        explanation: {
          ru: '`new Array(arr.length)` выделяет место под результат заранее, полным размером n - элементы будут расставлены в него не по порядку прохода, а сразу на финальные позиции.',
          en: '`new Array(arr.length)` pre-allocates the result at its full size n - elements will land in it not in scan order but directly at their final positions.',
        },
      },
      {
        lines: [15, 16],
        title: { ru: 'Обход справа налево', en: 'Walking right to left' },
        explanation: {
          ru: '`for (let i = arr.length - 1; i >= 0; i--)` и `const value = arr[i]` перебирают исходный массив с последнего элемента к первому - именно направление этого обхода определяет, устойчива ли сортировка (см. следующий шаг).',
          en: '`for (let i = arr.length - 1; i >= 0; i--)` and `const value = arr[i]` walk the input from the last element to the first - the direction of this walk is exactly what determines whether the sort is stable (see the next step).',
        },
      },
      {
        lines: [17, 18],
        title: { ru: 'Размещение и устойчивость', en: 'Placement and stability' },
        explanation: {
          ru: '`count[value - min]--` уменьшает границу перед записью, а `output[count[value - min]] = value` кладёт элемент на освободившийся индекс. Раз обход идёт справа налево, при двух равных значениях позже стоящий в `arr` элемент занимает более высокий индекс первым, а более ранний - освободившийся под ним индекс, из-за чего их взаимный порядок сохраняется.',
          en: '`count[value - min]--` decrements the boundary right before the write, and `output[count[value - min]] = value` places the element at the freed index. Because the walk goes right to left, of two equal values the one appearing later in `arr` claims the higher index first, and the earlier one gets the index freed below it - preserving their relative order.',
        },
      },
      {
        lines: [20],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После того как все n элементов размещены, `output` полностью отсортирован и возвращается - исходный массив `arr` при этом не был изменён.',
          en: 'Once all n elements have been placed, `output` is fully sorted and gets returned - the original `arr` was never mutated.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, диапазон значений вычисляется внутри.',
          en: 'The function takes a single list `arr` - just like the JS version, the value range is computed inside.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Защита от пустого списка', en: 'Guarding against an empty list' },
        explanation: {
          ru: '`if not arr: return []` выходит раньше, чем `min(arr)`/`max(arr)` будут вызваны на пустом списке, что иначе вызвало бы `ValueError`.',
          en: '`if not arr: return []` exits before `min(arr)`/`max(arr)` are called on an empty list, which would otherwise raise a `ValueError`.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Диапазон значений', en: 'The value range' },
        explanation: {
          ru: '`lo, hi = min(arr), max(arr)` находит границы данных за один проход каждая - идентично `min`/`max` в JS-версии.',
          en: '`lo, hi = min(arr), max(arr)` finds the data bounds, one pass each - identical to `min`/`max` in the JS version.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Выделение массива count', en: 'Allocating the count array' },
        explanation: {
          ru: '`count = [0] * (hi - lo + 1)` создаёт список нулей длиной ровно в диапазон значений - тот же размер k, что и в JS-версии.',
          en: '`count = [0] * (hi - lo + 1)` creates a zero-filled list exactly as long as the value range - the same k as in the JS version.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Подсчёт вхождений', en: 'Counting occurrences' },
        explanation: {
          ru: '`for value in arr: count[value - lo] += 1` проходит по входу, увеличивая счётчик каждого значения по его смещению от `lo`.',
          en: '`for value in arr: count[value - lo] += 1` walks the input, incrementing each value\'s counter at its offset from `lo`.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Префиксные суммы', en: 'Prefix sums' },
        explanation: {
          ru: '`count[i] += count[i - 1]` в цикле `range(1, len(count))` превращает счётчики в накопленные суммы - `count[i]` после этого означает «сколько элементов ≤ значения с индексом i».',
          en: '`count[i] += count[i - 1]` inside `range(1, len(count))` turns counters into running sums - `count[i]` now means "how many elements are ≤ the value at index i."',
        },
      },
      {
        lines: [12],
        title: { ru: 'Выходной список', en: 'The output list' },
        explanation: {
          ru: '`output = [0] * len(arr)` выделяет результат сразу нужного размера n, заполняя его временными нулями до расстановки реальных значений.',
          en: '`output = [0] * len(arr)` pre-allocates the result at size n, filled with placeholder zeros before real values are placed.',
        },
      },
      {
        lines: [13],
        title: { ru: 'Обход справа налево', en: 'Walking right to left' },
        explanation: {
          ru: '`for value in reversed(arr)` перебирает исходный список с конца - Python позволяет получить сами значения напрямую через `reversed()`, без явного индекса, как в JS-версии.',
          en: '`for value in reversed(arr)` walks the input from the end - Python gets the values directly via `reversed()`, without an explicit index like the JS version needs.',
        },
      },
      {
        lines: [14, 15],
        title: { ru: 'Размещение и устойчивость', en: 'Placement and stability' },
        explanation: {
          ru: '`count[value - lo] -= 1` затем `output[count[value - lo]] = value` - тот же механизм, что и в JS: обход справа налево гарантирует, что равные элементы сохранят исходный относительный порядок.',
          en: '`count[value - lo] -= 1` then `output[count[value - lo]] = value` - the same mechanism as JS: walking right to left guarantees equal elements keep their original relative order.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После обработки всех элементов `output` возвращается полностью отсортированным, а исходный `arr` остаётся нетронутым.',
          en: 'After all elements are processed, `output` is returned fully sorted, while the original `arr` is left untouched.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Линейная сложность O(n + k) - быстрее теоретического предела O(n log n) для сравнивающих сортировок, если k не слишком велико.',
      en: 'Linear O(n + k) complexity - beats the O(n log n) comparison-sort lower bound when k isn\'t too large.',
    },
    {
      ru: 'Устойчив: при правильном обходе (справа налево) равные элементы сохраняют исходный порядок.',
      en: 'Stable: with the right-to-left walk, equal elements keep their original relative order.',
    },
    {
      ru: 'Простая и предсказуемая логика без рекурсии - время выполнения не зависит от исходного порядка элементов.',
      en: 'Simple, predictable, non-recursive logic - runtime doesn\'t depend on the initial order of elements.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(k) дополнительной памяти, где k - диапазон значений; для больших или разреженных диапазонов это может быть непрактично.',
      en: 'Requires O(k) extra memory, where k is the value range; impractical for large or sparse ranges.',
    },
    {
      ru: 'Работает только с целочисленными (или сводимыми к целым) ключами известного диапазона - не годится для произвольных сравнимых объектов.',
      en: 'Only works with integer (or integer-reducible) keys of a known range - not applicable to arbitrary comparable objects.',
    },
    {
      ru: 'Если диапазон значений k намного больше числа элементов n, алгоритм становится медленнее и прожорливее по памяти, чем O(n log n) сортировки.',
      en: 'If the value range k is much larger than the element count n, the algorithm becomes slower and more memory-hungry than O(n log n) sorts.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортируемые значения - целые числа из заранее известного и не слишком большого диапазона (оценки, возраст, ранги).',
      en: 'When the values being sorted are integers from a known, reasonably small range (grades, ages, ranks).',
    },
    {
      ru: 'Как строительный блок для radix sort - сортировка подсчётом по одному разряду это его внутренний шаг.',
      en: 'As a building block for radix sort - counting sort on a single digit is its internal step.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Radix sort** использует сортировку подсчётом как подпрограмму для упорядочивания чисел по каждому разряду.',
      en: '**Radix sort** uses counting sort as a subroutine to order numbers by each digit.',
    },
    {
      ru: '**Обработка изображений** - построение гистограммы яркости пикселей (значения 0-255) и сортировка пикселей по яркости используют по сути тот же принцип подсчёта.',
      en: '**Image processing** - building a pixel-brightness histogram (values 0-255) and sorting pixels by brightness use essentially the same counting principle.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Возьмём массив `[4, 2, 2, 8, 3, 3, 1]` (n = 7). Значения лежат в диапазоне 1-8, значит k = 8. Сравнивающая сортировка на 50 элементах сделала бы порядка n·log₂n ≈ 50 · 5.64 ≈ 282 сравнений, а сортировка подсчётом на этом же n при k = 101 (например, оценки 0-100) выполняет всего n + k = 151 «элементарных» операций - меньше и без единого сравнения.',
        en: 'Take the array `[4, 2, 2, 8, 3, 3, 1]` (n = 7). Values lie in range 1-8, so k = 8. A comparison sort on 50 elements would make roughly n·log₂n ≈ 50 · 5.64 ≈ 282 comparisons, while counting sort on that same n with k = 101 (say, scores 0-100) does only n + k = 151 "elementary" operations - fewer, and without a single comparison.',
      },
      {
        ru: 'Для `[4, 2, 2, 8, 3, 3, 1]` подсчёт вхождений (индекс = значение - 1, так как min = 1) даёт `count = [1, 2, 2, 1, 0, 0, 0, 1]` - единица встретилась 1 раз, двойка 2 раза, тройка 2 раза, четвёрка 1 раз, восьмёрка 1 раз. После построения префиксных сумм получается `[1, 3, 5, 6, 6, 6, 6, 7]` - **последнее значение массива, 7, равно длине входа**, что и должно быть: все 7 элементов ≤ максимума.',
        en: 'For `[4, 2, 2, 8, 3, 3, 1]`, counting occurrences (index = value - 1, since min = 1) gives `count = [1, 2, 2, 1, 0, 0, 0, 1]` - one 1, two 2s, two 3s, one 4, one 8. After the prefix-sum pass this becomes `[1, 3, 5, 6, 6, 6, 6, 7]` - **the last entry, 7, equals the input length**, exactly as expected: all 7 elements are ≤ the maximum.',
      },
      {
        ru: 'Устойчивость проверяется на дубликатах с меткой: пусть на позициях 0 и 2 исходного массива стоят два одинаковых значения A и C (`[A(2), B(5), C(2)]`). Обход справа налево берёт C первым - он получает индекс `count[0] - 1 = 1`, - затем A получает освободившийся индекс 0. **Итог `[A, C, B]` - относительный порядок A перед C сохранён**, хотя C был обработан раньше физически.',
        en: 'Stability is checkable on tagged duplicates: say positions 0 and 2 of the input hold two equal values A and C (`[A(2), B(5), C(2)]`). The right-to-left walk processes C first - it gets index `count[0] - 1 = 1` - then A gets the freed index 0. **The result `[A, C, B]` keeps A before C**, even though C was physically processed first.',
      },
      {
        ru: 'Крайний случай в другую сторону: сортировка n = 1000 случайных 32-битных целых чисел. Диапазон k достигает 2^32 ≈ 4.3 миллиарда - массив `count` такого размера физически невозможно выделить в памяти обычного компьютера. Здесь алгоритм ломается не по логике, а по ресурсам: O(n + k) перестаёт быть практичным, когда k на порядки больше n.',
        en: 'The opposite extreme: sorting n = 1000 random 32-bit integers. The range k reaches 2^32 ≈ 4.3 billion - a `count` array of that size is physically impossible to allocate on ordinary hardware. The algorithm doesn\'t break logically here, it breaks on resources: O(n + k) stops being practical once k dwarfs n by orders of magnitude.',
      },
      {
        ru: 'Именно эта проблема решается **поразрядной сортировкой (radix sort)**: вместо одного прохода по всему диапазону значений она сортирует по разрядам числа, каждый раз вызывая устойчивую сортировку подсчётом с k = 10 (для десятичных разрядов). На примере `[170, 45, 75, 90, 802, 24, 2, 66]` после прохода по разряду единиц получается `[170, 90, 802, 2, 24, 45, 75, 66]`, после разряда десятков - `[802, 2, 24, 45, 66, 170, 75, 90]`, а после разряда сотен массив уже полностью отсортирован: `[2, 24, 45, 66, 75, 90, 170, 802]`.',
        en: 'This exact problem is what **radix sort** solves: instead of a single pass over the whole value range, it sorts digit by digit, calling a stable counting sort with k = 10 (for decimal digits) at each step. On `[170, 45, 75, 90, 802, 24, 2, 66]`, the ones-digit pass produces `[170, 90, 802, 2, 24, 45, 75, 66]`, the tens-digit pass produces `[802, 2, 24, 45, 66, 170, 75, 90]`, and after the hundreds-digit pass the array is fully sorted: `[2, 24, 45, 66, 75, 90, 170, 802]`.',
      },
      {
        ru: 'Каждый такой проход обязан быть устойчивым - иначе более старший разряд перепутает порядок, уже установленный младшими разрядами. Это единственная причина, по которой counting sort вообще заботится об устойчивости: сама по себе задача «отсортировать целые числа» её не требует, но её реализация как строительного блока radix sort требует обязательно.',
        en: 'Each such pass must be stable - otherwise a more significant digit would scramble the order already established by less significant ones. This is the whole reason counting sort bothers with stability at all: the plain task of "sort integers" doesn\'t require it, but its role as a radix sort building block absolutely does.',
      },
      {
        ru: 'Первое известное описание идеи принадлежит **Гарольду Сьюарду (Harold H. Seward)** в его магистерской диссертации 1954 года в MIT - там же встречается и ранняя формулировка радикс-сортировки, использующей тот же принцип подсчёта по разрядам.',
        en: 'The earliest known description of the idea is credited to **Harold H. Seward** in his 1954 MIT master\'s thesis - the same thesis also contains an early formulation of radix sort using the same digit-counting principle.',
      },
      {
        ru: 'Итог: сортировка подсчётом - это не «более быстрая» сортировка сравнениями, а алгоритм из другого класса, который обменивает время (пропуск сравнений) на пространство (массив `count` размером k). Пока k сопоставим с n, обмен выгоден; как только k начинает расти отдельно от n, выгоднее либо **radix sort** (разбить один большой диапазон на несколько маленьких), либо **bucket sort** (для непрерывных, а не дискретных значений).',
        en: 'The takeaway: counting sort isn\'t a "faster" comparison sort - it\'s an algorithm from a different class that trades time (skipping comparisons) for space (a `count` array of size k). As long as k stays comparable to n, the trade pays off; once k starts growing independently of n, it\'s better to switch to either **radix sort** (split one large range into several small ones) or **bucket sort** (for continuous rather than discrete values).',
      },
    ],
    whenToUse: [
      {
        ru: '**Вместо radix sort, когда диапазон сам по себе мал** - если k уже порядка десятков-сотен (оценки, возраст, ранги), не нужно городить поразрядную обработку, один проход counting sort проще и не медленнее.',
        en: '**Instead of radix sort when the range is already small** - if k is already in the tens or hundreds (grades, ages, ranks), there\'s no need for digit-by-digit processing; one counting sort pass is simpler and no slower.',
      },
      {
        ru: '**Как внутренний шаг radix sort**, когда диапазон одного разряда фиксирован (0-9 для десятичных чисел, 0-255 для байтов) - здесь устойчивость обязательна, не опциональна.',
        en: '**As radix sort\'s internal step**, when a single digit\'s range is fixed (0-9 for decimal, 0-255 for bytes) - here stability is mandatory, not optional.',
      },
      {
        ru: '**Против bucket sort - когда данные дискретны, а не непрерывны**: у counting sort ключи - это сами индексы ячеек, у bucket sort - диапазоны значений внутри корзины, которые всё равно надо досортировать. Для целых чисел известного диапазона counting sort и проще, и точнее.',
        en: '**Against bucket sort - when data is discrete, not continuous**: counting sort\'s keys are literally the cell indices, while bucket sort\'s buckets hold value ranges that still need sorting internally. For integers with a known range, counting sort is both simpler and exact.',
      },
      {
        ru: '**Не выбирать при неизвестном заранее диапазоне** - если min/max нельзя оценить до запуска (поток данных без ограничений), нет гарантии, что k останется разумным; здесь безопаснее сравнивающая сортировка с предсказуемой O(n log n) памятью и временем.',
        en: '**Don\'t pick it when the range is unknown up front** - if min/max can\'t be bounded before running (an unconstrained data stream), there\'s no guarantee k stays reasonable; a comparison sort with predictable O(n log n) time and space is safer here.',
      },
      {
        ru: '**Для построения гистограмм наряду с сортировкой** - если всё равно нужно посчитать частоту каждого значения (аналитика, статистика), массив `count` уже содержит этот результат бесплатно, до всякой сортировки.',
        en: '**For building histograms alongside sorting** - if the per-value frequency is needed anyway (analytics, statistics), the `count` array already contains that result for free, before any sorting happens.',
      },
    ],
    realWorld: [
      {
        ru: '**Магистерская диссертация Гарольда Сьюарда (MIT, 1954)** - первое зафиксированное описание идеи подсчёта вхождений для сортировки и связанной с ней поразрядной сортировки.',
        en: '**Harold H. Seward\'s master\'s thesis (MIT, 1954)** - the first recorded description of the counting-occurrences idea for sorting, alongside the related radix sort.',
      },
      {
        ru: '**Построение суффиксных массивов (алгоритм DC3/skew)** - внутренние проходы поразрядной сортировки троек символов реализуются именно устойчивой сортировкой подсчётом, критичной для итогового O(n) времени построения.',
        en: '**Suffix array construction (the DC3/skew algorithm)** - the internal radix passes over character triples are implemented with a stable counting sort, critical to the overall O(n) construction time.',
      },
      {
        ru: '**Аналитика по колонкам с малой кардинальностью** (страна, категория, оценка) в столбцовых базах данных использует ту же идею подсчёта вхождений для группировки и сортировки результатов агрегации.',
        en: '**Low-cardinality column analytics** (country, category, rating) in columnar databases reuse the same counting idea for grouping and sorting aggregate results.',
      },
      {
        ru: '**Конкурентное программирование** - задача "counting sort" часто маскируется под "отсортируй массив с элементами от 1 до 10^5" или "посчитай инверсии в ограниченном диапазоне", где решение в лоб через сравнения проходит по времени, но подсчёт вхождений быстрее и проще.',
        en: '**Competitive programming** - "counting sort" problems are often disguised as "sort an array with elements from 1 to 10^5" or "count inversions within a bounded range," where a plain comparison solution passes on time but the counting approach is faster and simpler to write.',
      },
    ],
  },

  relatedAlgorithms: ['radix-sort', 'bucket-sort'],

  quiz: [
    {
      question: {
        ru: 'Почему сортировка подсчётом может работать быстрее теоретического предела O(n log n)?',
        en: 'Why can counting sort beat the O(n log n) theoretical limit?',
      },
      options: [
        { ru: 'Она вообще не сравнивает элементы друг с другом', en: 'It never compares elements against each other at all' },
        { ru: 'Она использует несколько потоков одновременно, распределяя работу по ядрам', en: 'It uses multiple threads at once, spreading the work across CPU cores' },
        { ru: 'Она сортирует только первую половину массива, а вторую копирует как есть', en: 'It only sorts the first half of the array and copies the rest as-is' },
        { ru: 'Предел O(n log n) относится только к строкам, а не к числам', en: 'The O(n log n) limit only applies to strings, not to numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нижняя граница O(n log n) доказывается для сортировок, которые определяют порядок через попарные сравнения. Подсчёт вхождений - принципиально другой механизм, на который эта граница не распространяется.',
        en: 'The O(n log n) lower bound is proven for sorts that determine order via pairwise comparisons. Counting occurrences is a fundamentally different mechanism, so the bound doesn\'t apply.',
      },
      hint: {
        ru: 'Смотрите подраздел «Проблема» на вкладке «Суть» и первый абзац раздела «Глубже» с числовым сравнением 282 против 151 операции.',
        en: 'See the "Problem" subsection on the "Intent" tab and the first "Deep dive" paragraph comparing 282 against 151 operations.',
      },
    },
    {
      question: {
        ru: 'Что означает k в оценке сложности O(n + k)?',
        en: 'What does k mean in the O(n + k) complexity bound?',
      },
      options: [
        { ru: 'Диапазон возможных значений элементов', en: 'The range of possible element values' },
        { ru: 'Количество проходов по массиву за весь алгоритм', en: 'The number of passes made over the array during the whole algorithm' },
        { ru: 'Глубину рекурсии, как в сортировке слиянием', en: 'The recursion depth, similar to merge sort' },
        { ru: 'Число потоков выполнения, задействованных при сортировке', en: 'The number of execution threads used while sorting' },
      ],
      correct: 0,
      explanation: {
        ru: 'k - это размер вспомогательного массива `count`, который равен диапазону значений (max - min + 1). Если k сопоставим с n, сложность фактически линейна.',
        en: 'k is the size of the helper `count` array, equal to the value range (max - min + 1). When k is comparable to n, the complexity is effectively linear.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и строку 5 (`new Array(max - min + 1)`) функции `countingSort` на вкладке «Реализация».',
        en: 'See the "Space" badge at the top of the page and line 5 (`new Array(max - min + 1)`) of `countingSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем выходной массив заполняется, проходя исходный массив именно справа налево?',
        en: 'Why is the output array filled by walking the input right to left?',
      },
      options: [
        { ru: 'Сохранить устойчивость - относительный порядок равных элементов', en: 'To preserve stability - the relative order of equal elements' },
        { ru: 'Это ускоряет выполнение алгоритма за счёт лучшей локальности кэша', en: 'It speeds up execution thanks to better cache locality' },
        { ru: 'Иначе алгоритм не сможет обработать отрицательные числа', en: 'Otherwise the algorithm can\'t handle negative numbers' },
        { ru: 'Это требование языка программирования при работе с массивами', en: 'It\'s a requirement of the programming language when working with arrays' },
      ],
      correct: 0,
      explanation: {
        ru: 'При обходе справа налево более поздний из двух равных элементов размещается первым (с большим индексом), поэтому исходный порядок между равными значениями сохраняется.',
        en: 'Walking right to left places the later of two equal elements first (at the higher index), so the original order between equal values is preserved.',
      },
      hint: {
        ru: 'Смотрите шаг walkthrough «Размещение и устойчивость» (строки 17-18) на вкладке «Реализация» и пример A/C/B в третьем абзаце раздела «Глубже».',
        en: 'See the "Placement and stability" walkthrough step (lines 17-18) on the "Implementation" tab and the A/C/B example in the third "Deep dive" paragraph.',
      },
    },
    {
      question: {
        ru: 'Когда сортировка подсчётом становится невыгодной?',
        en: 'When does counting sort stop being worthwhile?',
      },
      options: [
        { ru: 'Когда диапазон k намного больше числа элементов n', en: 'When the value range k is much larger than the element count n' },
        { ru: 'Когда массив уже почти отсортирован перед запуском', en: 'When the array is already nearly sorted before the run starts' },
        { ru: 'Когда все элементы одинаковы и сравнивать нечего', en: 'When all elements are identical and there is nothing to compare' },
        { ru: 'Когда n - чётное число, что усложняет разбиение на пары', en: 'When n is an even number, which complicates pairing elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если k (например, 10^9 при малом n) намного больше n, память и время на массив `count` перевешивают выигрыш от отсутствия сравнений.',
        en: 'If k (e.g. 10^9 with a small n) dwarfs n, the memory and time spent on the `count` array outweigh the benefit of skipping comparisons.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Глубже» (пример с 32-битными числами и k ≈ 4.3 миллиарда) и третий пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the fourth "Deep dive" paragraph (the 32-bit integers example with k ≈ 4.3 billion) and the third "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Может ли сортировка подсчётом сортировать произвольные объекты, например строки по алфавиту?',
        en: 'Can counting sort sort arbitrary objects, like strings alphabetically?',
      },
      options: [
        { ru: 'Только если их можно свести к целочисленным ключам известного диапазона', en: 'Only if they can be reduced to integer keys within a known range' },
        { ru: 'Да, без каких-либо изменений алгоритма, поскольку сравнения не используются', en: 'Yes, with no changes to the algorithm at all, since it never compares values' },
        { ru: 'Нет, алгоритм работает только с числами с плавающей точкой в диапазоне [0, 1]', en: 'No, the algorithm only works with floating-point numbers in the range [0, 1]' },
        { ru: 'Да, но только для строк одинаковой длины из-за особенностей индексации', en: 'Yes, but only for strings of equal length, due to how indexing works' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка подсчётом требует дискретных ключей известного диапазона - строки можно сортировать посимвольно (это и есть идея LSD radix sort), но не напрямую одним проходом подсчёта.',
        en: 'Counting sort needs discrete keys of a known range - strings can be sorted character by character (this is exactly the LSD radix sort idea), but not directly in a single counting pass.',
      },
      hint: {
        ru: 'Смотрите второй пункт минусов на вкладке «Плюсы и минусы» и пятый абзац раздела «Глубже» про LSD radix sort по разрядам.',
        en: 'See the second "Cons" item on the "Pros & Cons" tab and the fifth "Deep dive" paragraph about LSD radix sort digit passes.',
      },
    },
    {
      question: {
        ru: 'Для чего нужен шаг построения префиксных сумм в массиве count?',
        en: 'What is the purpose of the prefix-sum step on the count array?',
      },
      options: [
        { ru: 'Чтобы count[i] хранил, сколько элементов не превышает i', en: 'So each count entry stores how many input elements are no greater than that value' },
        { ru: 'Чтобы отсортировать сам массив count по возрастанию перед финальным проходом', en: 'To sort the count array itself in ascending order before the final pass' },
        { ru: 'Чтобы подсчитать суммарное количество элементов в массиве и проверить целостность данных', en: 'To compute the total number of elements in the array and verify data integrity always' },
        { ru: 'Чтобы уменьшить размер массива count вдвое и сэкономить память', en: 'To halve the size of the count array and save memory' },
      ],
      correct: 0,
      explanation: {
        ru: 'После построения префиксных сумм count[v] равен числу элементов ≤ v, что непосредственно задаёт последний индекс, который занимает значение v в выходном массиве.',
        en: 'After prefix sums, count[v] equals the number of elements ≤ v, which directly gives the last index that value v occupies in the output array.',
      },
      hint: {
        ru: 'Смотрите шаг «Построить префиксные суммы» на вкладке «Визуализация» и второй абзац раздела «Глубже» с числами `[1,3,5,6,6,6,6,7]`.',
        en: 'See the "Build prefix sums" step on the "Visualization" tab and the second "Deep dive" paragraph with the `[1,3,5,6,6,6,6,7]` numbers.',
      },
    },
    {
      question: {
        ru: 'Какую роль играет сортировка подсчётом внутри поразрядной сортировки (radix sort)?',
        en: 'What role does counting sort play inside radix sort?',
      },
      options: [
        { ru: 'Она стабильно сортирует числа по одному разряду за проход', en: 'It stably sorts numbers by one digit per pass' },
        { ru: 'Она выбирает опорный элемент для разбиения массива на части', en: 'It selects a pivot element for partitioning the array into parts' },
        { ru: 'Она рекурсивно делит массив, как при сортировке слиянием', en: 'It recursively divides the array, as in merge sort' },
        { ru: 'Она освобождает память после каждого прохода по разряду', en: 'It frees memory after each digit pass completes' },
      ],
      correct: 0,
      explanation: {
        ru: 'Radix sort обрабатывает числа разряд за разрядом; на каждом шаге он вызывает counting sort по текущему разряду, опираясь на устойчивость, чтобы сохранить порядок, достигнутый предыдущими шагами.',
        en: 'Radix sort processes numbers digit by digit; at each step it calls counting sort on the current digit, relying on stability to preserve the order established by previous steps.',
      },
      hint: {
        ru: 'Смотрите первый пункт раздела «В реальном мире» (radix sort) и пятый-шестой абзацы раздела «Глубже» с примером `[170, 45, 75, ...]` по разрядам.',
        en: 'See the first "Real world" item (radix sort) and the fifth-sixth "Deep dive" paragraphs with the `[170, 45, 75, ...]` digit-pass example.',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если массив count заполнять, проходя исходный массив слева направо при размещении элементов в выход?',
        en: 'What happens if the output is filled by walking the input array left to right instead of right to left?',
      },
      options: [
        { ru: 'Алгоритм останется корректным, но потеряет устойчивость', en: 'The algorithm stays correct but loses stability' },
        { ru: 'Алгоритм полностью перестанет работать и выдаст неотсортированный результат', en: 'The algorithm breaks entirely and returns an unsorted result' },
        { ru: 'Сложность ухудшится с O(n + k) до O(n²) из-за конфликтов при записи', en: 'The complexity degrades from O(n + k) to O(n²) due to write conflicts' },
        { ru: 'Вспомогательный массив count переполнится и вызовет выход за границы памяти', en: 'The auxiliary count array overflows and causes an out-of-bounds memory access' },
      ],
      correct: 0,
      explanation: {
        ru: 'Обход слева направо разместит более ранние равные элементы на более высоких индексах, нарушив их исходный порядок, - сортировка станет нестабильной, но результат всё равно будет отсортирован.',
        en: 'Walking left to right places earlier equal elements at higher indices, breaking their original order - the sort becomes unstable, but the result is still sorted.',
      },
      hint: {
        ru: 'Смотрите строки 15-18 функции `countingSort` на вкладке «Реализация» и третий абзац раздела «Глубже» - переставьте направление обхода в примере A/C/B.',
        en: 'See lines 15-18 of `countingSort` on the "Implementation" tab and the third "Deep dive" paragraph - flip the walk direction in the A/C/B example.',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность сортировки подсчётом?',
        en: 'What is the space complexity of counting sort?',
      },
      options: [
        { ru: 'O(n + k) - для выходного массива и массива count размером в диапазон значений', en: 'O(n + k) - for the output array and the count array sized to the value range' },
        { ru: 'O(1) - алгоритм сортирует данные прямо на месте без дополнительных структур', en: 'O(1) - the algorithm sorts in place without any extra structures' },
        { ru: 'O(log n) - за счёт стека рекурсивных вызовов при разбиении диапазона пополам', en: 'O(log n) - from the recursive call stack when splitting the range in half always' },
        { ru: 'O(n²) - потому что для каждого элемента хранится его полная история сравнений', en: 'O(n²) - because the full comparison history of each element is stored' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм выделяет массив `count` размером k и выходной массив размером n, откуда и берётся суммарная сложность O(n + k).',
        en: 'The algorithm allocates a `count` array of size k and an output array of size n, giving total space O(n + k).',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и строки 5 и 14 функции `countingSort` (массивы `count` и `output`) на вкладке «Реализация».',
        en: 'See the "Space" badge at the top of the page and lines 5 and 14 of `countingSort` (the `count` and `output` arrays) on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем при инициализации массива count из него вычитается минимальное значение при индексации?',
        en: 'Why is the minimum value subtracted from each element when indexing into the count array?',
      },
      options: [
        { ru: 'Сдвинуть диапазон к нулю - не выделять память под значения ниже минимума', en: 'To shift the value range to start at zero and avoid allocating memory for values below the minimum' },
        { ru: 'Чтобы ускорить вычисление индекса при помощи битового сдвига вместо деления', en: 'To speed up index computation using a bit shift instead of division regardless of input size or order' },
        { ru: 'Потому что отрицательные индексы массива требуют коррекции знака', en: 'Because negative array indices require a sign correction' },
        { ru: 'Чтобы гарантировать, что максимальный элемент всегда попадёт в последнюю ячейку', en: 'To guarantee the maximum element always lands in the last cell' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если минимальное значение равно, например, 50, то без вычитания первые 50 ячеек массива count были бы пусты - вычитание минимума убирает этот мёртвый балласт.',
        en: 'If the minimum value is, say, 50, then without subtraction the first 50 cells of count would be empty - subtracting the minimum removes this dead space.',
      },
      hint: {
        ru: 'Смотрите строки 3-5 функции `countingSort` на вкладке «Реализация» и второй абзац раздела «Глубже», где диапазон 1-8 даёт k = 8.',
        en: 'See lines 3-5 of `countingSort` on the "Implementation" tab and the second "Deep dive" paragraph, where the 1-8 range gives k = 8.',
      },
    },
  ],
};

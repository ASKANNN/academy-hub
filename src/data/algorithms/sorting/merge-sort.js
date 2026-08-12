export const mergeSort = {
  slug: 'merge-sort',
  category: 'sorting',
  name: { ru: 'Merge Sort', en: 'Merge Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 3,
  tags: ['divide-and-conquer', 'stable', 'comparison'],

  intent: {
    ru: 'Сортировка слиянием рекурсивно делит массив пополам, сортирует каждую половину независимо, а затем сливает две отсортированные половины в один отсортированный массив.',
    en: 'Merge sort recursively splits the array in half, sorts each half independently, then merges the two sorted halves back into one sorted array.',
  },

  problem: {
    ru: 'Все алгоритмы сортировки сравнением, рассмотренные ранее (пузырьковая, выбором, вставками), гарантированно требуют O(n²) сравнений в худшем случае на больших массивах - для миллиона элементов это триллион операций. Нужен алгоритм, который использует принцип «разделяй и властвуй», чтобы гарантированно уложиться в O(n log n) независимо от исходного порядка данных.',
    en: 'All the comparison sorts covered so far (bubble, selection, insertion) are guaranteed O(n²) worst case on large arrays - a trillion operations for a million elements. What is needed is an algorithm that uses divide-and-conquer to guarantee O(n log n) regardless of the input order.',
  },

  solution: {
    ru: 'Если массив состоит из 0 или 1 элемента, он уже отсортирован. Иначе массив делится пополам, каждая половина сортируется тем же алгоритмом рекурсивно, а затем две уже отсортированные половины сливаются в один массив: на каждом шаге слияния сравниваются «головы» двух половин, и меньший элемент забирается в результат. Деление даёт log n уровней рекурсии, а слияние на каждом уровне стоит O(n) - итого O(n log n).',
    en: 'If the array has 0 or 1 elements, it is already sorted. Otherwise, split it in half, sort each half recursively with the same algorithm, then merge the two already-sorted halves into one array: at each merge step, compare the "heads" of both halves and take the smaller one into the result. The splitting gives log n recursion levels, and merging at each level costs O(n) - O(n log n) overall.',
  },

  steps: [
    {
      title: { ru: 'Базовый случай', en: 'Base case' },
      explanation: {
        ru: 'Если в подмассиве 0 или 1 элемент, он уже отсортирован - вернуть как есть.',
        en: 'If the subarray has 0 or 1 elements, it is already sorted - return it as-is.',
      },
    },
    {
      title: { ru: 'Разделить пополам', en: 'Split in half' },
      explanation: {
        ru: 'Найти середину и разбить массив на левую и правую половины.',
        en: 'Find the midpoint and split the array into left and right halves.',
      },
    },
    {
      title: { ru: 'Рекурсивно отсортировать каждую половину', en: 'Recursively sort each half' },
      explanation: {
        ru: 'Вызвать тот же алгоритм на левой и правой половинах отдельно.',
        en: 'Call the same algorithm on the left and right halves separately.',
      },
    },
    {
      title: { ru: 'Слить две половины', en: 'Merge the two halves' },
      explanation: {
        ru: 'Сравнивать головные элементы двух отсортированных половин, забирая меньший в результирующий массив.',
        en: 'Compare the head elements of the two sorted halves, taking the smaller one into the result array.',
      },
    },
    {
      title: { ru: 'Добавить остаток', en: 'Append the remainder' },
      explanation: {
        ru: 'Когда одна половина закончится, оставшиеся элементы другой половины добавляются в конец - они уже отсортированы.',
        en: 'When one half runs out, the remaining elements of the other half are appended - they are already sorted.',
      },
    },
  ],
  stepBreakpoints: [2, 16, 30, 41],

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
  let i = 0, j = 0;

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
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция `mergeSort` принимает один массив `arr` и ничего не мутирует на входе - весь результат строится из новых массивов, которые возвращаются наружу.',
          en: 'The `mergeSort` function takes a single array `arr` and never mutates the input - the whole result is built from new arrays returned outward.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: '`if (arr.length <= 1) return arr` останавливает рекурсию: массив из 0 или 1 элемента уже отсортирован по определению, дальше делить нечего.',
          en: '`if (arr.length <= 1) return arr` stops the recursion: an array of 0 or 1 elements is sorted by definition, there is nothing left to split.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Точка деления', en: 'The split point' },
        explanation: {
          ru: '`Math.floor(arr.length / 2)` находит середину массива по индексу, а не по значению элементов - для массива из 7 элементов `mid = 3`, независимо от того, что в нём лежит.',
          en: '`Math.floor(arr.length / 2)` finds the midpoint by index, not by element value - for a 7-element array `mid = 3`, no matter what values it holds.',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Рекурсия на обе половины', en: 'Recursing into both halves' },
        explanation: {
          ru: '`arr.slice(0, mid)` и `arr.slice(mid)` вырезают левую и правую половины в новые массивы, и каждая рекурсивно проходит через тот же `mergeSort` - к моменту следующей строки `left` и `right` уже полностью отсортированы.',
          en: '`arr.slice(0, mid)` and `arr.slice(mid)` cut out the left and right halves into new arrays, and each recurses through the same `mergeSort` - by the next line, `left` and `right` are already fully sorted.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Слияние результатов', en: 'Merging the results' },
        explanation: {
          ru: '`return merge(left, right)` передаёт две уже отсортированные половины в отдельную функцию `merge`, которая и делает всю содержательную работу.',
          en: '`return merge(left, right)` hands the two already-sorted halves to a separate `merge` function, which does all the actual work.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Сигнатура merge', en: 'The merge signature' },
        explanation: {
          ru: '`merge` принимает два отсортированных массива `left` и `right` - функция не знает и не проверяет, откуда они взялись, ей достаточно, что оба уже упорядочены.',
          en: '`merge` takes two sorted arrays, `left` and `right` - the function neither knows nor checks where they came from, it only relies on both already being ordered.',
        },
      },
      {
        lines: [12, 13],
        title: { ru: 'Результат и указатели', en: 'Result array and pointers' },
        explanation: {
          ru: '`result` - новый массив, куда будут складываться элементы по порядку. `i` и `j` - указатели на текущую непросмотренную позицию в `left` и `right` соответственно, оба стартуют с 0.',
          en: '`result` is a new array to collect elements in order. `i` and `j` are pointers to the current unseen position in `left` and `right`, both starting at 0.',
        },
      },
      {
        lines: [15],
        title: { ru: 'Условие цикла слияния', en: 'The merge loop condition' },
        explanation: {
          ru: '`while (i < left.length && j < right.length)` продолжает сравнивать, пока в обеих половинах остаются непросмотренные элементы - как только одна заканчивается, цикл останавливается.',
          en: '`while (i < left.length && j < right.length)` keeps comparing as long as both halves still have unseen elements - as soon as one runs out, the loop stops.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Взять из левой половины', en: 'Taking from the left half' },
        explanation: {
          ru: '`if (left[i] <= right[j])` - именно `<=`, а не `<`, обеспечивает устойчивость: при равенстве элемент из `left` (который стоял раньше в исходном массиве) забирается первым. `result.push(left[i++])` кладёт его в результат и сразу сдвигает указатель `i`.',
          en: '`if (left[i] <= right[j])` - `<=`, not `<`, is what makes the sort stable: on a tie, the element from `left` (which appeared earlier in the original array) is taken first. `result.push(left[i++])` pushes it and advances the `i` pointer in one step.',
        },
      },
      {
        lines: [17],
        title: { ru: 'Взять из правой половины', en: 'Taking from the right half' },
        explanation: {
          ru: 'Иначе, когда `right[j]` строго меньше, `result.push(right[j++])` забирает элемент из правой половины и сдвигает `j` - на каждой итерации выбирается ровно один из двух элементов.',
          en: 'Otherwise, when `right[j]` is strictly smaller, `result.push(right[j++])` takes the element from the right half and advances `j` - each iteration picks exactly one of the two heads.',
        },
      },
      {
        lines: [20],
        title: { ru: 'Добавить остаток', en: 'Appending the remainder' },
        explanation: {
          ru: 'Когда цикл завершается, одна из половин ещё не исчерпана. `left.slice(i)` и `right.slice(j)` берут её непросмотренный хвост, а `result.concat(...)` дописывает его в конец - хвост уже отсортирован, повторно сравнивать его элементы друг с другом не нужно.',
          en: 'When the loop ends, one half still has leftover elements. `left.slice(i)` and `right.slice(j)` grab its unseen tail, and `result.concat(...)` appends it - the tail is already sorted, so its elements never need to be compared against each other again.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция `merge_sort` принимает один список `arr` - как и в JS-версии, вход не изменяется на месте, результат строится из новых списков.',
          en: 'The `merge_sort` function takes a single list `arr` - like the JS version, the input is never modified in place, the result is built from new lists.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: '`if len(arr) <= 1: return arr` - список из 0 или 1 элемента уже отсортирован, рекурсия останавливается здесь, без дальнейшего деления.',
          en: '`if len(arr) <= 1: return arr` - a list of 0 or 1 elements is already sorted, the recursion stops here without further splitting.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Точка деления', en: 'The split point' },
        explanation: {
          ru: '`len(arr) // 2` - целочисленное деление находит индекс середины: для списка из 7 элементов `mid = 3`, ровно как в JS-версии с `Math.floor`.',
          en: '`len(arr) // 2` - integer division finds the midpoint index: for a 7-element list, `mid = 3`, exactly like the JS version\'s `Math.floor`.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Рекурсия на обе половины', en: 'Recursing into both halves' },
        explanation: {
          ru: '`arr[:mid]` и `arr[mid:]` - срезы списка, создающие левую и правую половины, каждая рекурсивно сортируется тем же `merge_sort` до того, как попасть в `merge`.',
          en: '`arr[:mid]` and `arr[mid:]` slice out the left and right halves, each recursively sorted by the same `merge_sort` before it reaches `merge`.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Слияние результатов', en: 'Merging the results' },
        explanation: {
          ru: '`return merge(left, right)` передаёт уже отсортированные половины в функцию `merge`, где происходит собственно слияние.',
          en: '`return merge(left, right)` hands the already-sorted halves to the `merge` function, where the actual merging happens.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Сигнатура merge', en: 'The merge signature' },
        explanation: {
          ru: '`merge` принимает два отсортированных списка - функции всё равно, откуда они взялись, важно лишь то, что оба уже упорядочены.',
          en: '`merge` takes two sorted lists - it doesn\'t matter where they came from, only that both are already ordered.',
        },
      },
      {
        lines: [13, 14],
        title: { ru: 'Результат и указатели', en: 'Result list and pointers' },
        explanation: {
          ru: '`result = []` - новый список для собранных элементов. `i = j = 0` - идиома Python, присваивающая обеим переменным одно и то же начальное значение за один раз, эквивалент `i = 0; j = 0` в JS.',
          en: '`result = []` is a new list to collect elements. `i = j = 0` is a Python idiom assigning both variables the same starting value in one statement, equivalent to `i = 0; j = 0` in JS.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Условие цикла слияния', en: 'The merge loop condition' },
        explanation: {
          ru: '`while i < len(left) and j < len(right)` продолжает сравнение, пока в обеих половинах остаются непросмотренные элементы - та же логика, что и в JS-версии.',
          en: '`while i < len(left) and j < len(right)` keeps comparing as long as both halves have unseen elements - the same logic as the JS version.',
        },
      },
      {
        lines: [17, 18, 19],
        title: { ru: 'Взять из левой половины', en: 'Taking from the left half' },
        explanation: {
          ru: '`if left[i] <= right[j]:` - `<=` обеспечивает устойчивость точно так же, как в JS. `result.append(left[i])` добавляет элемент, а `i += 1` сдвигает указатель отдельной строкой - Python не даёт совместить это в одно выражение, как `left[i++]` в JS.',
          en: '`if left[i] <= right[j]:` - `<=` makes the sort stable, exactly as in JS. `result.append(left[i])` adds the element, then `i += 1` advances the pointer on its own line - Python has no way to fold that into one expression like JS\'s `left[i++]`.',
        },
      },
      {
        lines: [20, 21, 22],
        title: { ru: 'Взять из правой половины', en: 'Taking from the right half' },
        explanation: {
          ru: '`else:` - когда `right[j]` строго меньше, `result.append(right[j])` добавляет его, а `j += 1` сдвигает указатель правой половины.',
          en: '`else:` - when `right[j]` is strictly smaller, `result.append(right[j])` adds it, then `j += 1` advances the right pointer.',
        },
      },
      {
        lines: [24, 25, 26],
        title: { ru: 'Добавить остаток', en: 'Appending the remainder' },
        explanation: {
          ru: '`result.extend(left[i:])` и `result.extend(right[j:])` дописывают непросмотренный (уже отсортированный) хвост той половины, что не закончилась в цикле - только один из двух вызовов реально что-то добавит, второй сработает на пустом срезе. `return result` возвращает готовый отсортированный список.',
          en: '`result.extend(left[i:])` and `result.extend(right[j:])` append the unseen (already sorted) tail of whichever half didn\'t run out in the loop - only one of the two calls actually adds anything, the other runs on an empty slice. `return result` returns the finished sorted list.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Гарантированный O(n log n) в лучшем, среднем и худшем случае - предсказуемая производительность независимо от входных данных.',
      en: 'Guaranteed O(n log n) best, average, and worst case - predictable performance regardless of input.',
    },
    {
      ru: 'Устойчив - важно при сортировке объектов по одному полю с сохранением порядка по другому.',
      en: 'Stable - important when sorting objects by one field while preserving order by another.',
    },
    {
      ru: 'Естественно распараллеливается: левая и правая половины можно сортировать независимо на разных ядрах/машинах.',
      en: 'Naturally parallelizable: left and right halves can be sorted independently on different cores/machines.',
    },
    {
      ru: 'Хорошо работает с данными, которые не помещаются в память целиком (внешняя сортировка).',
      en: 'Works well with data that doesn\'t fit entirely in memory (external sorting).',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти для временных массивов при слиянии - не сортирует «на месте» без сложных модификаций.',
      en: 'Needs O(n) extra memory for temporary arrays during merging - doesn\'t sort in place without complex modifications.',
    },
    {
      ru: 'На маленьких массивах константные накладные расходы рекурсии делают его медленнее сортировки вставками.',
      en: 'On small arrays, the constant overhead of recursion makes it slower than insertion sort.',
    },
    {
      ru: 'Копирование подмассивов на каждом уровне рекурсии создаёт больше операций с памятью, чем сортировка на месте (quicksort).',
      en: 'Copying subarrays at every recursion level creates more memory traffic than an in-place sort (quicksort).',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда важна гарантия O(n log n) в худшем случае (например, real-time системы, где недопустим квадратичный «срыв»).',
      en: 'When a guaranteed O(n log n) worst case matters (e.g. real-time systems where a quadratic blowup is unacceptable).',
    },
    {
      ru: 'Когда нужна устойчивая сортировка, а не только быстрая.',
      en: 'When you need a stable sort, not just a fast one.',
    },
    {
      ru: 'Для сортировки связных списков, где произвольный доступ дорог, но последовательное слияние - нет.',
      en: 'For sorting linked lists, where random access is expensive but sequential merging is not.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Timsort** (Python `sorted()`, Java `Arrays.sort()` для объектов) - гибрид сортировки слиянием и вставками, использующий именно устойчивость и гарантированную асимптотику слияния.',
      en: '**Timsort** (Python\'s `sorted()`, Java\'s `Arrays.sort()` for objects) - a hybrid of merge sort and insertion sort that relies on merge sort\'s stability and guaranteed asymptotics.',
    },
    {
      ru: '**Внешняя сортировка больших файлов** - база данных сортирует куски, помещающиеся в память, а затем сливает их с диска, что является прямым применением merge-шага.',
      en: '**External sorting of large files** - a database sorts memory-sized chunks, then merges them from disk, which is a direct application of the merge step.',
    },
    {
      ru: '**Git** использует вариант слияния при трёхстороннем merge истории коммитов (концептуально близкий принцип объединения двух упорядоченных последовательностей).',
      en: '**Git** uses a merging variant in three-way history merges (conceptually close to combining two ordered sequences).',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Возьмём конкретный массив из 8 элементов: `[5, 2, 8, 1, 9, 3, 7, 4]`. Деление пополам даёт `[5,2,8,1]` и `[9,3,7,4]`, каждая половина делится снова до `[5,2]`/`[8,1]` и `[9,3]`/`[7,4]`, а затем ещё раз - до восьми массивов по одному элементу. От исходного размера 8 до базового случая размера 1 потребовалось ровно **3 деления пополам** - это и есть log2(8) = 3, глубина рекурсии для этого конкретного n.',
        en: 'Take a concrete 8-element array: `[5, 2, 8, 1, 9, 3, 7, 4]`. Splitting in half gives `[5,2,8,1]` and `[9,3,7,4]`, each half splits again into `[5,2]`/`[8,1]` and `[9,3]`/`[7,4]`, then once more into eight single-element arrays. Going from size 8 down to the base case of size 1 took exactly **3 halvings** - that is log2(8) = 3, the recursion depth for this particular n.',
      },
      {
        ru: 'Эта формула масштабируется предсказуемо: для миллиона элементов log2(1 000 000) ≈ 19.93, значит потребуется **около 20 уровней рекурсии** - независимо от того, в каком порядке стояли исходные элементы. У сортировки вставками или пузырьком такой гарантии нет: их число проходов растёт вместе с n, а не с log n, так что разрыв между 20 и n становится огромным уже на массивах в тысячи элементов.',
        en: 'This formula scales predictably: for a million elements, log2(1,000,000) ≈ 19.93, so it takes **about 20 recursion levels** - regardless of the original element order. Insertion sort or bubble sort have no such guarantee: their pass count grows with n, not log n, so the gap between 20 and n becomes enormous once arrays reach the thousands.',
      },
      {
        ru: 'Разберём саму функцию `merge` на конкретном примере: `left = [2, 5, 8]`, `right = [1, 3, 9]`. Указатели `i` и `j` стартуют с 0. Шаг 1: `2` против `1` - берём `1` из right, `j = 1`. Шаг 2: `2` против `3` - берём `2` из left, `i = 1`. Шаг 3: `5` против `3` - берём `3`, `j = 2`. Шаг 4: `5` против `9` - берём `5`, `i = 2`. Шаг 5: `8` против `9` - берём `8`, `i = 3`, цикл заканчивается, потому что `left` исчерпан. Остаётся дописать хвост `right.slice(2)` = `[9]` - итог `[1, 2, 3, 5, 8, 9]` за **5 сравнений** на 6 элементов.',
        en: 'Walk through `merge` on a concrete example: `left = [2, 5, 8]`, `right = [1, 3, 9]`. Pointers `i` and `j` start at 0. Step 1: `2` vs `1` - take `1` from right, `j = 1`. Step 2: `2` vs `3` - take `2` from left, `i = 1`. Step 3: `5` vs `3` - take `3`, `j = 2`. Step 4: `5` vs `9` - take `5`, `i = 2`. Step 5: `8` vs `9` - take `8`, `i = 3`, the loop ends because `left` is exhausted. The tail `right.slice(2)` = `[9]` is appended - result `[1, 2, 3, 5, 8, 9]` in **5 comparisons** for 6 elements.',
      },
      {
        ru: 'Отсюда видно, откуда берётся итоговая формула сложности. На каждом уровне рекурсии сумма размеров всех подмассивов, которые нужно слить, равна n - на верхнем уровне это одно слияние `n/2 + n/2`, на следующем два слияния по `n/4 + n/4` каждое, и так далее. Каждое слияние занимает время, пропорциональное сумме размеров сливаемых половин, значит **весь уровень стоит O(n)** независимо от того, на сколько отдельных слияний он разбит. Уровней log n, поэтому итог - O(n log n).',
        en: 'This is where the total complexity formula comes from. At every recursion level, the combined size of all subarrays that need merging equals n - at the top level that\'s a single `n/2 + n/2` merge, at the next level two merges of `n/4 + n/4` each, and so on. Each merge takes time proportional to the combined size of its two halves, so **every level costs O(n)** no matter how many separate merges it\'s split into. There are log n levels, so the total is O(n log n).',
      },
      {
        ru: 'Устойчивость - не побочный эффект, а прямое следствие одной строки кода: `if (left[i] <= right[j])`. Представим сортировку заказов по полю `total`, где два заказа имеют одинаковую сумму `total: 500`, но разное поле `id` - `A (id: 12)` пришёл раньше `B (id: 47)` в исходном массиве. Если `A` окажется в `left`, а `B` - в `right`, условие `<=` при равенстве сумм заберёт `A` первым, сохранив исходный порядок между ними. Замени `<=` на `<`, и при равенстве всегда выигрывал бы `right` - устойчивость терялась бы незаметно, без единой ошибки на этапе выполнения.',
        en: 'Stability isn\'t a side effect - it comes directly from one line: `if (left[i] <= right[j])`. Picture sorting orders by their `total` field, where two orders share the same `total: 500` but different `id` fields - `A (id: 12)` appeared earlier than `B (id: 47)` in the original array. If `A` ends up in `left` and `B` in `right`, the `<=` condition takes `A` first on a tie, preserving their original order. Swap `<=` for `<`, and `right` would always win on ties instead - stability would silently break, with no runtime error to catch it.',
      },
      {
        ru: 'Про память стоит уточнить деталь, которую часто упрощают до «O(n) дополнительной памяти». Учебники обычно описывают вариант с одним общим буфером размером n, используемым повторно на всех уровнях. Реализация на этой странице устроена иначе: `arr.slice(0, mid)` и `arr.slice(mid)` создают новые массивы на **каждом** рекурсивном вызове. На каждом уровне суммарно копируется n элементов (как и в самом слиянии), а уровней log n - значит за весь запуск выполняется порядка n log n операций копирования, просто не одновременно: массивы предыдущих уровней уже освобождены сборщиком мусора к моменту, когда создаются следующие. Пиковая одновременная память всё ещё O(n), но общее число выделенных ячеек за всё время работы - O(n log n), а не O(n).',
        en: 'One memory detail is often flattened into "O(n) extra memory". Textbooks usually describe a version with a single shared buffer of size n, reused at every level. The implementation on this page works differently: `arr.slice(0, mid)` and `arr.slice(mid)` allocate new arrays on **every** recursive call. Each level copies n elements in total for the split (on top of the merge itself), and there are log n levels - so the whole run performs roughly n log n copy operations, just not all at once: earlier levels\' arrays are already garbage-collected by the time later ones are created. Peak simultaneous memory is still O(n), but the total number of cells allocated over the algorithm\'s lifetime is O(n log n), not O(n).',
      },
      {
        ru: 'Существует и итеративная (bottom-up) версия того же алгоритма: вместо рекурсивного деления сверху вниз она сразу сливает пары соседних элементов размером 1, затем результаты по 2, потом по 4, и так далее - удваивая размер сливаемых блоков на каждой итерации внешнего цикла. Итоговая сложность та же O(n log n), но без единого рекурсивного вызова и без связанного с ним расхода стека - на встраиваемых системах с жёстким лимитом глубины стека это не косметическая деталь, а условие, без которого рекурсивная версия просто упадёт на достаточно большом входе.',
        en: 'An iterative (bottom-up) version of the same algorithm also exists: instead of recursively splitting top-down, it immediately merges adjacent pairs of size 1, then merges those results in groups of 2, then 4, and so on - doubling the merged block size on every outer-loop iteration. The complexity stays O(n log n), but without a single recursive call and the stack usage that comes with it - on embedded systems with a hard stack-depth limit, that\'s not a cosmetic detail but the difference between running and crashing on a large enough input.',
      },
      {
        ru: 'Сортировка слиянием старше большинства алгоритмов в этом разделе: её описал **Джон фон Нейман в 1945 году** в отчёте о первом компьютере EDVAC, ещё до того, как термин «алгоритм сортировки» стал общеупотребимым в информатике. Идея разделять задачу на независимые половины и сливать готовые решения - один из первых зафиксированных примеров техники divide-and-conquer, к которой позже свели quicksort, быстрое умножение матриц (алгоритм Штрассена) и множество других алгоритмов.',
        en: 'Merge sort predates most algorithms covered in this section: it was described by **John von Neumann in 1945** in a report on the EDVAC, the first stored-program computer, before "sorting algorithm" was even a standard term in computer science. The idea of splitting a problem into independent halves and merging finished solutions is one of the earliest recorded examples of divide-and-conquer, a technique later applied to quicksort, fast matrix multiplication (Strassen\'s algorithm), and many other algorithms.',
      },
    ],
    whenToUse: [
      {
        ru: '**Против Quicksort** - Quicksort в среднем быстрее за счёт меньших констант и сортировки на месте, но его худший случай O(n²) реален на специально подобранных или уже почти отсортированных данных при плохом выборе опорного элемента. Merge sort выбирают, когда нужна гарантия «никогда не хуже O(n log n)», а не просто хорошее среднее поведение.',
        en: '**Against Quicksort** - Quicksort is faster on average thanks to smaller constants and in-place sorting, but its O(n²) worst case is real on adversarial or nearly-sorted input with a poor pivot choice. Merge sort is chosen when a "never worse than O(n log n)" guarantee is needed, not just good average behavior.',
      },
      {
        ru: '**Против Heap Sort** - оба дают гарантированный O(n log n) и оба используют O(1)-O(n) дополнительной памяти по-разному, но Heap Sort не устойчив, а его доступ к памяти скачет по индексам кучи, что плохо для кэша процессора. Merge sort проходит по данным последовательно, поэтому на реальном железе часто оказывается быстрее, несмотря на одинаковую асимптотику.',
        en: '**Against Heap Sort** - both give a guaranteed O(n log n) and use extra memory differently, but Heap Sort isn\'t stable, and its heap-index memory access jumps around, which is bad for CPU cache locality. Merge sort walks data sequentially, so on real hardware it\'s often faster despite matching asymptotics.',
      },
      {
        ru: '**На маленьких подмассивах** - гибридные реализации (Timsort, стандартные библиотеки C++/Java) переключаются на insertion sort ниже порога примерно в **32-64 элемента** (конкретное значение - `MIN_MERGE` в Timsort), потому что накладные расходы на рекурсивные вызовы перевешивают выигрыш от O(n log n) на настолько маленьких n.',
        en: '**On small subarrays** - hybrid implementations (Timsort, standard C++/Java libraries) switch to insertion sort below a threshold of roughly **32-64 elements** (the concrete value is Timsort\'s `MIN_MERGE`), because recursive-call overhead outweighs the O(n log n) benefit at such small n.',
      },
      {
        ru: '**Для многостороннего внешнего слияния** - когда данные разбиты на k отсортированных кусков на диске (например, после параллельной обработки), merge sort обобщается до k-стороннего слияния через мин-кучу размером k, читая по одной записи из каждого куска - Quicksort здесь неприменим напрямую, потому что ему нужен произвольный доступ ко всем данным сразу.',
        en: '**For k-way external merging** - when data is split into k sorted chunks on disk (e.g. after parallel processing), merge sort generalizes to a k-way merge via a size-k min-heap, reading one record from each chunk at a time - Quicksort doesn\'t directly apply here because it needs random access to all the data at once.',
      },
      {
        ru: '**Не выбирать для памяти-ограниченных встраиваемых систем** - когда доступно, скажем, 2КБ RAM на массив в 500 элементов, O(n) дополнительной памяти merge sort может просто не поместиться, тогда как in-place Heap Sort или Shell Sort с O(1) памяти работают в тех же границах без компромиссов по гарантии сложности.',
        en: '**Don\'t pick it for memory-constrained embedded systems** - when only, say, 2KB of RAM is available for a 500-element array, merge sort\'s O(n) extra memory may simply not fit, whereas in-place Heap Sort or Shell Sort with O(1) memory work within the same limits without giving up the complexity guarantee.',
      },
    ],
    realWorld: [
      {
        ru: '**John von Neumann, 1945** - первое задокументированное описание merge sort появилось в отчёте о компьютере EDVAC, написанном фон Нейманом и Германом Голдстайном; это один из самых ранних формально описанных алгоритмов в истории вычислительной техники, задолго до появления самого термина «divide-and-conquer».',
        en: '**John von Neumann, 1945** - the first documented description of merge sort appeared in a report on the EDVAC computer, written by von Neumann and Herman Goldstine; it is one of the earliest formally described algorithms in computing history, long before the term "divide-and-conquer" existed.',
      },
      {
        ru: '**`java.util.Arrays.sort(Object[])`** до сих пор явно требует устойчивую сортировку по контракту JavaDoc и реализована через модифицированный merge sort (а с Java 7 - через TimSort) именно потому, что сортировка объектов по одному полю обязана сохранять порядок по остальным - для массивов примитивов (`int[]`, `double[]`) тот же метод использует dual-pivot quicksort, где устойчивость не имеет смысла.',
        en: '**`java.util.Arrays.sort(Object[])`** still explicitly requires a stable sort per its JavaDoc contract and is implemented via a modified merge sort (TimSort since Java 7), precisely because sorting objects by one field must preserve order on the rest - for primitive arrays (`int[]`, `double[]`), the same method uses dual-pivot quicksort, where stability is meaningless.',
      },
      {
        ru: '**`std::stable_sort` в C++ STL** гарантирует устойчивость по стандарту и обычно реализуется как merge sort; если дополнительная память для буфера недоступна, реализация откатывается на медленный in-place merge с ухудшением сложности до O(n log²n) - явный компромисс «время за память», прописанный прямо в стандарте библиотеки.',
        en: '**`std::stable_sort` in the C++ STL** guarantees stability by standard and is typically implemented as merge sort; if extra buffer memory is unavailable, the implementation falls back to a slower in-place merge with complexity degrading to O(n log²n) - an explicit time-for-space tradeoff written directly into the library standard.',
      },
      {
        ru: '**`lib/list_sort.c` в ядре Linux** реализует bottom-up merge sort специально для связных списков (`struct list_head`), используемый несколькими подсистемами ядра для сортировки очередей и списков устройств - выбор объясняется тем же свойством, что и в общей теории: слияние связных списков не требует произвольного доступа, которого списки не дают.',
        en: '**`lib/list_sort.c` in the Linux kernel** implements a bottom-up merge sort specifically for linked lists (`struct list_head`), used by several kernel subsystems to sort queues and device lists - the choice comes from the same property covered above: merging linked lists needs no random access, which lists don\'t provide.',
      },
      {
        ru: '**Apache Spark** на этапе shuffle (`sortByKey`, `repartitionAndSortWithinPartitions`) сортирует данные, которые не помещаются в память одного узла, разбивая их на отсортированные куски на диске и сливая через внешний многосторонний merge - тот же принцип, что и в базах данных, но в масштабе распределённого кластера.',
        en: '**Apache Spark**, during its shuffle stage (`sortByKey`, `repartitionAndSortWithinPartitions`), sorts data that doesn\'t fit in a single node\'s memory by splitting it into sorted disk chunks and merging them via an external k-way merge - the same principle as in databases, applied at distributed-cluster scale.',
      },
    ],
  },

  relatedAlgorithms: ['quick-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Сколько дополнительной памяти в худшем случае требует классическая реализация сортировки слиянием?',
        en: 'How much extra memory does the classic merge sort implementation need in the worst case?',
      },
      options: [
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(1)', en: 'O(1)' },
        { ru: 'O(log n)', en: 'O(log n)' },
        { ru: 'O(n²)', en: 'O(n²)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Шаг слияния создаёт новый временный массив размером с объединяемые половины - суммарно на каждом уровне рекурсии требуется O(n) памяти.',
        en: 'The merge step creates a new temporary array the size of the merged halves - each recursion level needs O(n) memory in total.',
      },
      hint: {
        ru: 'Смотри бейдж «Память» в шапке страницы и шаг «Результат и указатели» в разборе кода на вкладке «Реализация».',
        en: 'See the "Space" badge in the page header and the "Result array and pointers" step in the code walkthrough on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что происходит на шаге `merge`, когда одна из половин заканчивается раньше другой?',
        en: 'What happens in the `merge` step when one half runs out before the other?',
      },
      options: [
        {
          ru: 'Оставшиеся элементы второй половины просто дописываются в конец результата',
          en: 'The remaining elements of the other half are simply appended to the end of the result',
        },
        {
          ru: 'Алгоритм останавливается с ошибкой, потому что длины половин не совпадают',
          en: 'The algorithm stops with an error because the two halves have mismatched lengths',
        },
        {
          ru: 'Оставшиеся элементы сортируются заново с самого начала перед добавлением',
          en: 'The remaining elements get sorted again from scratch before being appended',
        },
        {
          ru: 'Слияние перезапускается с начала обеих половин, теряя уже проделанную работу',
          en: 'The merge restarts from the beginning of both halves, discarding the work already done',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Раз обе половины уже отсортированы по отдельности, оставшийся «хвост» одной из них уже находится в правильном относительном порядке - его можно просто дописать.',
        en: 'Since both halves are already independently sorted, the remaining "tail" of one is already in correct relative order - it can just be appended.',
      },
      hint: {
        ru: 'Смотри шаг «Добавить остаток» на вкладке «Визуализация» и его построчный разбор на вкладке «Реализация».',
        en: 'See the "Append the remainder" step on the "Visualization" tab and its line-by-line breakdown on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли сортировка слиянием устойчивой (stable)?',
        en: 'Is merge sort stable?',
      },
      options: [
        { ru: 'Да - равные элементы сохраняют исходный относительный порядок', en: 'Yes - equal elements keep their original relative order' },
        { ru: 'Нет - шаг слияния всегда меняет порядок равных элементов из разных половин', en: 'No - the merge step always swaps the order of equal elements from different halves' },
        { ru: 'Зависит от реализации - рекурсивная устойчива, а итеративная нет', en: 'It depends on the implementation - the recursive version is stable, but the iterative one is not' },
        { ru: 'Только если массив не содержит повторяющихся значений', en: 'Only if the array contains no duplicate values' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие `left[i] <= right[j]` при слиянии гарантирует: при равенстве первым берётся элемент из левой половины - той, что стояла в исходном массиве раньше. Относительный порядок равных элементов сохраняется.',
        en: 'The `left[i] <= right[j]` merge condition guarantees that on a tie, the element from the left half - the one that appeared earlier in the original array - is taken first. The relative order of equal elements is preserved.',
      },
      hint: {
        ru: 'Смотри шаг «Взять из левой половины» в разборе кода на вкладке «Реализация» - там разобрано условие `<=`.',
        en: 'See the "Taking from the left half" step in the code walkthrough on the "Implementation" tab - it explains the `<=` condition.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка слиянием гарантирует O(n log n) даже в худшем случае?',
        en: 'Why does merge sort guarantee O(n log n) even in the worst case?',
      },
      options: [
        {
          ru: 'Массив всегда делится строго пополам, независимо от значений элементов',
          en: 'The array is always split exactly in half, regardless of element values',
        },
        {
          ru: 'Она использует хеш-таблицу для быстрого поиска места вставки каждого элемента',
          en: 'It uses a hash table to quickly look up the insertion point for each element',
        },
        {
          ru: 'Она сортирует на месте без какой-либо дополнительной памяти на всех этапах',
          en: 'It sorts in place without needing any extra memory at any stage of the process',
        },
        {
          ru: 'Она никогда не сравнивает элементы напрямую друг с другом на протяжении всего алгоритма',
          en: 'It never compares elements directly against each other throughout the entire algorithm',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от quicksort, где разбиение зависит от выбора опорного элемента и данных, merge sort делит массив по индексу - глубина рекурсии всегда ровно log n.',
        en: 'Unlike quicksort, where partitioning depends on the pivot choice and data, merge sort splits by index - recursion depth is always exactly log n.',
      },
      hint: {
        ru: 'Смотри раздел «Как это работает» на вкладке «Суть» - там разобран пример с точкой деления массива по индексу.',
        en: 'See the "How it works" section on the "Intent" tab - it walks through an example of the split point being based on index.',
      },
    },
    {
      question: {
        ru: 'Почему Timsort строит гибрид именно вокруг сортировки слиянием, а не пузырьковой или сортировки выбором?',
        en: 'Why does Timsort build its hybrid specifically around merge sort rather than bubble or selection sort?',
      },
      options: [
        {
          ru: 'Merge sort даёт O(n log n) и устойчивость, которых нет у квадратичных алгоритмов',
          en: 'Merge sort provides guaranteed O(n log n) and stability, which quadratic algorithms lack',
        },
        {
          ru: 'Merge sort проще всего запрограммировать среди всех известных алгоритмов сортировки',
          en: 'Merge sort is the easiest of all known sorting algorithms to implement correctly',
        },
        {
          ru: 'Пузырьковая сортировка официально запрещена условиями лицензии языка Python',
          en: "Bubble sort is officially banned by the terms of Python's programming language license",
        },
        {
          ru: 'Разницы между этими алгоритмами нет вообще, выбор дизайнеров был совершенно случаен',
          en: "There is no real difference between these algorithms, the designers' choice was arbitrary",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Для промышленного алгоритма сортировки критичны гарантированная асимптотика на больших данных и устойчивость при сортировке объектов - оба свойства даёт именно merge sort.',
        en: 'A production sort needs guaranteed large-scale asymptotics and stability when sorting objects - both properties come specifically from merge sort.',
      },
      hint: {
        ru: 'Смотри пункт про `java.util.Arrays.sort` в разделе «Примеры в коде» на вкладке «Суть».',
        en: 'See the `java.util.Arrays.sort` entry in the "In code" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какое свойство merge sort делает его удобным для распараллеливания?',
        en: 'What property of merge sort makes it convenient to parallelize?',
      },
      options: [
        {
          ru: 'Левая и правая половины сортируются полностью независимо друг от друга',
          en: 'The left and right halves are sorted completely independently of each other',
        },
        {
          ru: 'Он вообще не использует рекурсию ни на одном из этапов сортировки, заменяя её очередями',
          en: 'It never uses recursion at any stage of the sorting process, replacing it with queues instead',
        },
        {
          ru: 'Он требует всего O(1) памяти на протяжении всего выполнения, включая слияние',
          en: 'It requires only O(1) memory throughout the entire execution, including the merge step',
        },
        {
          ru: 'Шаг слияния можно полностью пропустить без потери корректности итогового результата',
          en: 'The merge step can be entirely skipped without any loss of correctness in the final result',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку рекурсивные вызовы на левой и правой половине не зависят друг от друга и не разделяют состояние, их можно выполнять параллельно на разных потоках или машинах.',
        en: 'Since the recursive calls on the left and right halves don\'t depend on each other or share state, they can run in parallel on different threads or machines.',
      },
      hint: {
        ru: 'Смотри пункт про распараллеливание в разделе «Плюсы» на вкладке «Плюсы и минусы».',
        en: 'See the parallelization item in the "Pros" section on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Сколько всего элементов обрабатывается операциями слияния на одном уровне рекурсии (суммарно по всем вызовам этого уровня)?',
        en: 'How many elements total are processed by merge operations at a single recursion level (summed across all calls at that level)?',
      },
      options: [
        {
          ru: 'O(n) - сумма размеров всех сливаемых пар на уровне всегда равна размеру исходного массива',
          en: 'O(n) - the combined size of all merged pairs at a level always equals the size of the original array',
        },
        {
          ru: 'O(n log n) - потому что каждый элемент сравнивается со всеми остальными элементами на каждом отдельном уровне',
          en: 'O(n log n) - because every single element gets compared against all other elements at every single level',
        },
        {
          ru: 'O(1) - на каждом уровне рекурсии обрабатывается одно и то же фиксированное небольшое число элементов',
          en: 'O(1) - the exact same small fixed number of elements gets processed at every single recursion level',
        },
        {
          ru: 'O(log n) - только ровно по одному слиянию происходит на каждом уровне рекурсии всего дерева',
          en: 'O(log n) - only exactly a single merge operation happens at each level of the whole recursion tree',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Хотя на уровне может быть много отдельных вызовов `merge`, вместе они всегда покрывают весь массив ровно один раз - O(n) работы на уровень. Помножив на log n уровней рекурсии, получаем итоговую сложность O(n log n).',
        en: 'Although a level can have many separate `merge` calls, together they always cover the entire array exactly once - O(n) work per level. Multiplied by the log n recursion levels, this gives the overall O(n log n) complexity.',
      },
      hint: {
        ru: 'Смотри раздел «Как это работает» на вкладке «Суть» - там разобрано, сколько элементов сливается на одном уровне рекурсии.',
        en: 'See the "How it works" section on the "Intent" tab - it works out how many elements get merged at one recursion level.',
      },
    },
    {
      question: {
        ru: 'В чём преимущество итеративной (bottom-up) версии сортировки слиянием перед рекурсивной (top-down)?',
        en: 'What is the advantage of the iterative (bottom-up) version of merge sort over the recursive (top-down) one?',
      },
      options: [
        {
          ru: 'Она избегает накладных расходов на рекурсивные вызовы и использование стека',
          en: 'It avoids the overhead of recursive calls and stack usage',
        },
        {
          ru: 'Она меняет асимптотическую сложность всего алгоритма на линейную O(n)',
          en: 'It changes the asymptotic complexity of the whole algorithm down to linear O(n)',
        },
        {
          ru: 'Она превращает сортировку в сортировку на месте, требующую всего O(1) памяти',
          en: 'It turns the sort into an in-place sort that requires only O(1) extra memory',
        },
        {
          ru: 'Она делает получившуюся сортировку неустойчивой в отличие от рекурсивной версии',
          en: 'It makes the resulting sort unstable, unlike the recursive top-down version',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Bottom-up версия начинает со слияния пар размером 1, затем 2, 4, 8 и так далее, обходясь без рекурсии - та же сложность O(n log n), но без накладных расходов на стек вызовов, что важно в средах с ограниченным размером стека.',
        en: 'The bottom-up version starts by merging chunks of size 1, then 2, 4, 8, and so on, without recursion - same O(n log n) complexity, but without call-stack overhead, which matters in environments with limited stack size.',
      },
      hint: {
        ru: 'Смотри последний абзац про итеративную (bottom-up) версию в разделе «Как это работает» на вкладке «Суть».',
        en: 'See the last paragraph about the iterative (bottom-up) version in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка слиянием часто предпочтительнее quicksort для сортировки связных списков?',
        en: 'Why is merge sort often preferred over quicksort for sorting linked lists?',
      },
      options: [
        {
          ru: 'Слияние работает через последовательный доступ, а разбиение quicksort требует произвольного доступа, которого у связных списков нет',
          en: "Merging works via sequential access and needs no extra array, while quicksort's partitioning benefits from random access, which lists lack",
        },
        {
          ru: 'Quicksort вообще технически абсолютно неспособен сортировать связные списки любой длины, структуры или содержимого',
          en: 'Quicksort is technically and absolutely incapable of sorting linked lists of any length, structure, or content whatsoever',
        },
        {
          ru: 'Merge sort асимптотически строго и всегда быстрее quicksort на любых мыслимых входных данных без единого исключения даже на маленьких массивах',
          en: 'Merge sort is asymptotically and always strictly faster than quicksort on any conceivable input data, without a single exception even on tiny arrays',
        },
        {
          ru: 'Связные списки во всех известных языках программирования по определению всегда уже отсортированы заранее автоматически',
          en: 'Linked lists in every known programming language are, by definition, always already sorted beforehand automatically',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Шаг слияния merge sort нуждается лишь в последовательном обходе - идеально для связного списка, а сама операция слияния двух списков требует лишь O(1) дополнительной памяти (перелинковка). Разбиение quicksort вокруг опорного элемента, напротив, активно опирается на произвольный доступ к элементам.',
        en: "Merge sort's merge step only needs sequential traversal - ideal for a linked list - and merging two lists costs only O(1) extra memory (re-linking pointers). Quicksort's pivot-based partitioning, in contrast, relies heavily on random access to elements.",
      },
      hint: {
        ru: 'Смотри пункт про связные списки в разделе «Когда применять» на вкладке «Суть».',
        en: 'See the linked-lists item in the "When to use" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Как сортировку слиянием можно использовать для подсчёта числа инверсий в массиве за O(n log n)?',
        en: 'How can merge sort be adapted to count the number of inversions in an array in O(n log n)?',
      },
      options: [
        {
          ru: 'При слиянии считать, сколько раз элемент из правой половины забирается раньше, чем закончится левая - это число инверсий',
          en: "During merging, count how many times an element from the right half is taken before the left half is exhausted - that is the inversion count",
        },
        {
          ru: 'Сортировка слиянием в принципе не умеет считать инверсии ни при каких возможных модификациях алгоритма или реализации',
          en: 'Merge sort is fundamentally and permanently incapable of counting inversions under any possible modification or implementation',
        },
        {
          ru: 'Подсчёт инверсий математически всегда требует как минимум O(n²) времени независимо от выбранного подхода',
          en: 'Counting inversions mathematically always requires at least O(n²) time to complete, regardless of the chosen approach',
        },
        {
          ru: 'Число инверсий всегда в точности равно глубине рекурсии сортировки слиянием на абсолютно любом входном массиве без единого исключения из этого правила',
          en: "The number of inversions always exactly equals merge sort's recursion depth on absolutely any given input array, with no exception to this rule",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Когда на шаге слияния берётся элемент из правой половины раньше, чем исчерпана левая, это означает, что он образует инверсию с каждым из оставшихся элементов левой половины. Суммируя такие случаи по всем слияниям, получаем общее число инверсий массива за то же время, что и сама сортировка.',
        en: 'When the merge step takes an element from the right half before the left half is exhausted, it forms an inversion with every remaining element of the left half. Summing these cases across all merges gives the array\'s total inversion count in the same time as the sort itself.',
      },
      hint: {
        ru: 'Смотри шаг «Взять из правой половины» в разборе кода на вкладке «Реализация» - там объясняется, что значит выбор элемента из right до исчерпания left.',
        en: 'See the "Taking from the right half" step in the code walkthrough on the "Implementation" tab - it explains what taking from right before left runs out means.',
      },
    },
  ],
};

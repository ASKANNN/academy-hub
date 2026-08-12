export const quickSort = {
  slug: 'quick-sort',
  category: 'sorting',
  name: { ru: 'Quick Sort', en: 'Quick Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: 'O(log n)',
  },
  popularity: 3,
  tags: ['divide-and-conquer', 'in-place', 'unstable'],

  intent: {
    ru: 'Быстрая сортировка выбирает опорный элемент, разбивает массив на элементы меньше и больше опорного, а затем рекурсивно сортирует каждую часть - почти всегда на месте и с очень низкими константными накладными расходами.',
    en: 'Quick sort picks a pivot, partitions the array into elements smaller and larger than the pivot, then recursively sorts each part - almost always in place, with very low constant overhead.',
  },

  problem: {
    ru: 'Сортировка слиянием гарантирует O(n log n), но платит за это O(n) дополнительной памяти на каждом слиянии. Нужен алгоритм с той же асимптотикой в среднем случае, но сортирующий на месте - то есть почти не потребляющий дополнительной памяти, что критично для больших массивов в памяти с ограниченным объёмом.',
    en: 'Merge sort guarantees O(n log n) but pays for it with O(n) extra memory per merge. What is needed is an algorithm with the same average-case asymptotics that sorts in place - using almost no extra memory, which matters for large arrays under tight memory limits.',
  },

  solution: {
    ru: 'Выбирается опорный элемент (pivot) - например, последний элемент подмассива. Массив переставляется («партиционируется») так, что все элементы меньше опорного оказываются слева от него, а все больше - справа; сам опорный элемент встаёт на своё окончательное отсортированное место. Затем алгоритм рекурсивно применяется к левой и правой частям отдельно, до подмассивов длины 0 или 1.',
    en: 'A pivot element is chosen - e.g. the last element of the subarray. The array is rearranged ("partitioned") so all elements smaller than the pivot end up to its left, all larger ones to its right, and the pivot itself lands in its final sorted position. The algorithm then recurses independently on the left and right parts, down to subarrays of length 0 or 1.',
  },

  steps: [
    {
      title: { ru: 'Выбрать опорный элемент', en: 'Choose a pivot' },
      explanation: {
        ru: 'Взять один элемент подмассива (например, последний) в качестве опорного.',
        en: 'Take one element of the subarray (e.g. the last one) as the pivot.',
      },
    },
    {
      title: { ru: 'Партиционировать', en: 'Partition' },
      explanation: {
        ru: 'Пройти по подмассиву, переставляя элементы так, чтобы меньшие опорного оказались слева от него, большие - справа.',
        en: 'Walk through the subarray, rearranging elements so smaller-than-pivot values end up on its left, larger ones on its right.',
      },
    },
    {
      title: { ru: 'Зафиксировать опорный', en: 'Fix the pivot' },
      explanation: {
        ru: 'После партиционирования опорный элемент стоит ровно на своей финальной позиции в отсортированном массиве.',
        en: 'After partitioning, the pivot sits exactly at its final position in the sorted array.',
      },
    },
    {
      title: { ru: 'Рекурсия слева', en: 'Recurse left' },
      explanation: {
        ru: 'Применить тот же алгоритм к подмассиву элементов левее опорного.',
        en: 'Apply the same algorithm to the subarray of elements to the left of the pivot.',
      },
    },
    {
      title: { ru: 'Рекурсия справа', en: 'Recurse right' },
      explanation: {
        ru: 'Применить тот же алгоритм к подмассиву элементов правее опорного - до тех пор, пока все подмассивы не станут длины 0 или 1.',
        en: 'Apply the same algorithm to the subarray of elements to the right of the pivot - until every subarray has length 0 or 1.',
      },
    },
  ],
  stepBreakpoints: [3, 14, 18, 27],

  implementation: {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

    return arr


def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`quickSort(arr, low = 0, high = arr.length - 1)` сортирует `arr` на месте в границах `[low, high]`. Параметры по умолчанию позволяют вызывать функцию просто как `quickSort(arr)` снаружи, а изнутри - с явными границами подмассива при рекурсии.',
          en: '`quickSort(arr, low = 0, high = arr.length - 1)` sorts `arr` in place within `[low, high]`. The default parameters let it be called as plainly as `quickSort(arr)` from outside, while recursive calls pass explicit subarray bounds.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: '`if (low < high)` - когда границы сошлись или пересеклись (подмассив длины 0 или 1), делать нечего, он уже отсортирован. Рекурсия останавливается сама, без явного `return` в начале функции.',
          en: '`if (low < high)` - once the bounds meet or cross (a subarray of length 0 or 1), there is nothing to do, it is already sorted. The recursion stops implicitly, with no explicit early `return`.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Партиционирование', en: 'Partitioning' },
        explanation: {
          ru: '`partition(arr, low, high)` переставляет элементы подмассива вокруг опорного и возвращает `pivotIndex` - индекс, на котором опорный элемент оказался в итоге.',
          en: '`partition(arr, low, high)` rearranges the subarray around a pivot and returns `pivotIndex` - the index the pivot ended up at.',
        },
      },
      {
        lines: [4, 5],
        title: { ru: 'Рекурсия на обе части', en: 'Recursing into both parts' },
        explanation: {
          ru: '`quickSort(arr, low, pivotIndex - 1)` сортирует всё, что осталось левее опорного, `quickSort(arr, pivotIndex + 1, high)` - всё, что правее. Сам `pivotIndex` в рекурсию не попадает - он уже на своём финальном месте.',
          en: '`quickSort(arr, low, pivotIndex - 1)` sorts everything left of the pivot, `quickSort(arr, pivotIndex + 1, high)` sorts everything to its right. `pivotIndex` itself is excluded from both calls - it already sits at its final position.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Возврат массива', en: 'Returning the array' },
        explanation: {
          ru: '`return arr` возвращает тот же массив, изменённый на месте - удобно для чтения кода в цепочке, хотя вызывающий код может опираться на мутацию исходного `arr` напрямую, не используя возврат.',
          en: '`return arr` returns the same array, mutated in place - convenient for chained reads, though the caller can also rely on the mutation of the original `arr` directly, without using the return value.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Сигнатура partition', en: 'The partition signature' },
        explanation: {
          ru: '`partition(arr, low, high)` работает на подмассиве `[low, high]` того же массива `arr` - никакой копии не создаётся, все перестановки происходят прямо в исходных ячейках.',
          en: '`partition(arr, low, high)` operates on the `[low, high]` slice of the same `arr` - no copy is made, every swap happens directly in the original cells.',
        },
      },
      {
        lines: [11, 12],
        title: { ru: 'Выбор опорного и указатель границы', en: 'Pivot choice and boundary pointer' },
        explanation: {
          ru: '`pivot = arr[high]` - опорным берётся последний элемент подмассива (схема Ломуто). `i = low - 1` - указатель на правую границу уже обработанной «зоны меньших» элементов; изначально эта зона пуста, поэтому `i` стоит на одну позицию левее `low`.',
          en: '`pivot = arr[high]` - the last element of the subarray is taken as the pivot (the Lomuto scheme). `i = low - 1` marks the right edge of the already-processed "smaller than pivot" zone; it starts empty, so `i` sits one position left of `low`.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Обход подмассива', en: 'Scanning the subarray' },
        explanation: {
          ru: '`for (let j = low; j < high; j++)` проходит все элементы подмассива, кроме самого опорного (`high` исключён из диапазона) - сравнивая каждый по очереди с `pivot`.',
          en: '`for (let j = low; j < high; j++)` walks every element of the subarray except the pivot itself (`high` is excluded from the range) - comparing each one against `pivot` in turn.',
        },
      },
      {
        lines: [15, 18],
        title: { ru: 'Найден элемент меньше опорного', en: 'Found an element smaller than the pivot' },
        explanation: {
          ru: '`if (arr[j] < pivot)` - когда текущий элемент меньше опорного, зона «меньших» должна вырасти на одну позицию: `i++` расширяет её границу, а `[arr[i], arr[j]] = [arr[j], arr[i]]` перемещает найденный элемент внутрь этой зоны обменом с тем, что там сейчас стоит.',
          en: '`if (arr[j] < pivot)` - when the current element is smaller than the pivot, the "smaller" zone needs to grow by one: `i++` extends its boundary, and `[arr[i], arr[j]] = [arr[j], arr[i]]` swaps the found element into that zone.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Финальная перестановка опорного', en: 'The final pivot swap' },
        explanation: {
          ru: 'После цикла `i` указывает на последнюю позицию зоны «меньших». `[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]` меняет опорный элемент (который всё ещё стоит на `high`) местами с первым элементом зоны «больших» - опорный занимает границу между двумя зонами.',
          en: 'After the loop, `i` points at the last position of the "smaller" zone. `[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]` swaps the pivot (still sitting at `high`) with the first element of the "greater" zone - the pivot lands right on the boundary between the two zones.',
        },
      },
      {
        lines: [22],
        title: { ru: 'Возврат позиции опорного', en: 'Returning the pivot position' },
        explanation: {
          ru: '`return i + 1` сообщает вызывающей `quickSort`, на каком индексе теперь стоит опорный элемент - эта граница используется, чтобы разбить дальнейшую рекурсию на левую и правую части, не включая сам опорный.',
          en: '`return i + 1` tells the calling `quickSort` which index the pivot now sits at - that boundary is used to split further recursion into left and right parts, excluding the pivot itself.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`quick_sort(arr, low=0, high=None)` - Python не умеет использовать `len(arr)` прямо в значении параметра по умолчанию (оно вычисляется один раз при определении функции, до того как `arr` известен), поэтому `high` временно принимает `None`.',
          en: '`quick_sort(arr, low=0, high=None)` - Python cannot use `len(arr)` directly as a default value (defaults are evaluated once, when the function is defined, before `arr` exists), so `high` temporarily takes `None`.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Настоящее значение high', en: 'Resolving the real high' },
        explanation: {
          ru: '`if high is None: high = len(arr) - 1` подставляет настоящую верхнюю границу при первом внешнем вызове. При рекурсивных вызовах `high` уже передаётся явно, и эта ветка не срабатывает.',
          en: '`if high is None: high = len(arr) - 1` fills in the real upper bound on the initial outside call. Recursive calls already pass `high` explicitly, so this branch is skipped for them.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: '`if low < high:` - как и в JS-версии, подмассив длины 0 или 1 уже отсортирован, и рекурсия просто не заходит в этот блок.',
          en: '`if low < high:` - just like the JS version, a subarray of length 0 or 1 is already sorted, and the recursion simply skips this block.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Партиционирование', en: 'Partitioning' },
        explanation: {
          ru: '`pivot_index = partition(arr, low, high)` переставляет элементы вокруг опорного и возвращает его итоговую позицию.',
          en: '`pivot_index = partition(arr, low, high)` rearranges elements around the pivot and returns its final position.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Рекурсия на обе части', en: 'Recursing into both parts' },
        explanation: {
          ru: '`quick_sort(arr, low, pivot_index - 1)` и `quick_sort(arr, pivot_index + 1, high)` обрабатывают левую и правую части отдельно, минуя сам опорный элемент - идентично JS-версии.',
          en: '`quick_sort(arr, low, pivot_index - 1)` and `quick_sort(arr, pivot_index + 1, high)` process the left and right parts separately, skipping the pivot itself - identical to the JS version.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Возврат массива', en: 'Returning the array' },
        explanation: {
          ru: '`return arr` возвращает тот же список, изменённый на месте.',
          en: '`return arr` returns the same list, mutated in place.',
        },
      },
      {
        lines: [13, 14, 15],
        title: { ru: 'Выбор опорного и указатель границы', en: 'Pivot choice and boundary pointer' },
        explanation: {
          ru: '`pivot = arr[high]` берёт последний элемент подмассива опорным. `i = low - 1` - указатель на границу зоны «меньших», изначально пустой, ровно как в JS-версии.',
          en: '`pivot = arr[high]` takes the last element of the subarray as pivot. `i = low - 1` marks the boundary of the "smaller" zone, initially empty, exactly like the JS version.',
        },
      },
      {
        lines: [17],
        title: { ru: 'Обход подмассива', en: 'Scanning the subarray' },
        explanation: {
          ru: '`for j in range(low, high):` перебирает все индексы подмассива, кроме `high` (сам опорный не участвует в сравнениях).',
          en: '`for j in range(low, high):` iterates every index of the subarray except `high` (the pivot itself is not compared against).',
        },
      },
      {
        lines: [18, 20],
        title: { ru: 'Найден элемент меньше опорного', en: 'Found an element smaller than the pivot' },
        explanation: {
          ru: '`if arr[j] < pivot:` - при находке меньшего элемента `i += 1` расширяет зону «меньших», а `arr[i], arr[j] = arr[j], arr[i]` перемещает элемент в неё - Python позволяет обменять значения без временной переменной, в отличие от императивного цикла на других языках.',
          en: '`if arr[j] < pivot:` - on finding a smaller element, `i += 1` extends the "smaller" zone, and `arr[i], arr[j] = arr[j], arr[i]` moves the element into it - Python lets values swap without a temporary variable, unlike an imperative loop in some other languages.',
        },
      },
      {
        lines: [22],
        title: { ru: 'Финальная перестановка опорного', en: 'The final pivot swap' },
        explanation: {
          ru: '`arr[i + 1], arr[high] = arr[high], arr[i + 1]` меняет опорный элемент местами с первым элементом зоны «больших», ставя его точно на границу между двумя зонами.',
          en: '`arr[i + 1], arr[high] = arr[high], arr[i + 1]` swaps the pivot with the first element of the "greater" zone, placing it exactly on the boundary between the two zones.',
        },
      },
      {
        lines: [23],
        title: { ru: 'Возврат позиции опорного', en: 'Returning the pivot position' },
        explanation: {
          ru: '`return i + 1` возвращает индекс, на котором теперь стоит опорный элемент - именно эту границу использует `quick_sort`, чтобы разделить дальнейшую рекурсию.',
          en: '`return i + 1` returns the index the pivot now occupies - `quick_sort` uses exactly that boundary to split further recursion.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Сортирует на месте - O(log n) памяти на стек рекурсии против O(n) у сортировки слиянием.',
      en: 'Sorts in place - O(log n) memory for the recursion stack versus O(n) for merge sort.',
    },
    {
      ru: 'На практике часто быстрее сортировки слиянием благодаря низким константам и хорошей работе с кэшем процессора.',
      en: 'Often faster than merge sort in practice thanks to low constants and cache-friendly access patterns.',
    },
    {
      ru: 'Хорошо распараллеливается: левая и правая части независимы после партиционирования.',
      en: 'Parallelizes well: the left and right parts are independent after partitioning.',
    },
  ],
  cons: [
    {
      ru: 'Худший случай O(n²) - возникает, если опорный элемент раз за разом оказывается наименьшим или наибольшим (например, на уже отсортированном массиве при наивном выборе опорного).',
      en: 'Worst case O(n²) - happens when the pivot repeatedly ends up smallest or largest (e.g. on an already-sorted array with a naive pivot choice).',
    },
    {
      ru: 'Неустойчив: партиционирование может изменить относительный порядок равных элементов.',
      en: 'Unstable: partitioning can change the relative order of equal elements.',
    },
    {
      ru: 'Производительность сильно зависит от стратегии выбора опорного элемента - плохая стратегия сводит алгоритм к квадратичному.',
      en: 'Performance is highly sensitive to the pivot-selection strategy - a bad strategy degrades it to quadratic.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда важна скорость на практике и сортировка «на месте», а гарантия худшего случая не критична (можно смягчить случайным выбором опорного).',
      en: 'When practical speed and in-place sorting matter, and a worst-case guarantee isn\'t critical (can be mitigated with random pivot selection).',
    },
    {
      ru: 'Для сортировки массивов примитивных типов в памяти, где произвольный доступ дешёв.',
      en: 'For sorting arrays of primitive types in memory, where random access is cheap.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**`Array.prototype.sort` во многих движках JavaScript** для примитивных типов исторически использовала варианты быстрой сортировки (сейчас чаще Timsort/гибриды).',
      en: '**`Array.prototype.sort` in many JavaScript engines** historically used quicksort variants for primitive types (now more often Timsort/hybrids).',
    },
    {
      ru: '**Introsort** (используется в C++ `std::sort`) начинает с быстрой сортировки и переключается на heapsort, если рекурсия становится подозрительно глубокой - защита от худшего случая.',
      en: '**Introsort** (used by C++\'s `std::sort`) starts with quicksort and switches to heapsort if recursion gets suspiciously deep - a safeguard against the worst case.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Разберём партиционирование на конкретном примере: `arr = [8, 2, 5, 3, 9, 4, 7]`, `low = 0`, `high = 6`, опорный `pivot = arr[6] = 7`. Указатель `i` стартует с `-1`. Цикл `j` идёт от 0 до 5: `j=0` (значение 8) не меньше опорного, пропуск; `j=1` (2) меньше - `i` становится 0, обмен даёт `[2,8,5,3,9,4,7]`; `j=2` (5) меньше - `i=1`, обмен: `[2,5,8,3,9,4,7]`; `j=3` (3) меньше - `i=2`, обмен: `[2,5,3,8,9,4,7]`; `j=4` (9) не меньше, пропуск; `j=5` (4) меньше - `i=3`, обмен с `arr[5]`: `[2,5,3,4,9,8,7]`.',
        en: 'Walk through partitioning on a concrete example: `arr = [8, 2, 5, 3, 9, 4, 7]`, `low = 0`, `high = 6`, pivot `= arr[6] = 7`. Pointer `i` starts at `-1`. The `j` loop runs from 0 to 5: `j=0` (value 8) is not smaller, skip; `j=1` (2) is smaller - `i` becomes 0, swap gives `[2,8,5,3,9,4,7]`; `j=2` (5) is smaller - `i=1`, swap: `[2,5,8,3,9,4,7]`; `j=3` (3) is smaller - `i=2`, swap: `[2,5,3,8,9,4,7]`; `j=4` (9) is not smaller, skip; `j=5` (4) is smaller - `i=3`, swap with `arr[5]`: `[2,5,3,4,9,8,7]`.',
      },
      {
        ru: 'После цикла (**6 сравнений**, 4 обмена) финальная перестановка меняет опорный `arr[6]=7` местами с `arr[i+1] = arr[4] = 9`, давая `[2,5,3,4,7,8,9]` и возвращая `pivotIndex = 4`. Проверка: всё слева от индекса 4 (`[2,5,3,4]`) меньше 7, всё справа (`[8,9]`) больше - опорный на своём финальном месте, хотя обе стороны сами по себе ещё не отсортированы и требуют отдельной рекурсии.',
        en: 'After the loop (**6 comparisons**, 4 swaps), the final swap trades the pivot `arr[6]=7` with `arr[i+1] = arr[4] = 9`, giving `[2,5,3,4,7,8,9]` and returning `pivotIndex = 4`. Check: everything left of index 4 (`[2,5,3,4]`) is smaller than 7, everything right (`[8,9]`) is larger - the pivot sits at its final spot, though neither side is internally sorted yet and each needs its own recursive call.',
      },
      {
        ru: 'Худший случай проявляется конкретно на уже отсортированном массиве при наивном выборе последнего элемента опорным. Для `[1, 2, 3, 4, 5]` (n = 5) опорный `5` всегда оказывается наибольшим, партиционирование даёт части размером `n-1` и `0` на каждом шаге. Число сравнений на уровнях: `4 + 3 + 2 + 1 + 0 = 10`, что равно `n(n-1)/2` - той же формуле, что и у пузырьковой сортировки, и это ровно O(n²), а не O(n log n).',
        en: 'The worst case shows up concretely on an already-sorted array with a naive last-element pivot. For `[1, 2, 3, 4, 5]` (n = 5), the pivot `5` is always the largest, so partitioning produces parts of size `n-1` and `0` at every step. Comparisons per level: `4 + 3 + 2 + 1 + 0 = 10`, equal to `n(n-1)/2` - the same formula as bubble sort, and exactly O(n²), not O(n log n).',
      },
      {
        ru: 'Схема партиционирования выше называется **схемой Ломуто** (по имени Ника Ломуто) - один указатель, простая для понимания, но делающая относительно много обменов. Оригинальная **схема Хоара** (её придумал сам Тони Хоар в 1961-м) использует два указателя, движущихся навстречу друг другу от обоих концов подмассива, и делает в среднем примерно втрое меньше перестановок за счёт того, что не гарантирует финальную позицию опорного, а лишь корректно разделяет подмассив.',
        en: 'The partitioning scheme above is called the **Lomuto scheme** (after Nico Lomuto) - one pointer, easy to follow, but relatively swap-heavy. The original **Hoare scheme** (devised by Tony Hoare himself in 1961) uses two pointers moving toward each other from both ends of the subarray, and performs roughly three times fewer swaps on average, at the cost of not guaranteeing the pivot\'s final position, only a correct split.',
      },
      {
        ru: 'Наивный выбор опорного (первый или последний элемент) уязвим именно к уже отсортированным или обратно отсортированным входам - частый случай на практике, а не редкость. **Случайный выбор** или **медиана из трёх** (первого, среднего и последнего элементов) не убирают теоретический худший случай O(n²) - для любой фиксированной стратегии выбора опорного существует вход, который её обманет - но делают маловероятным, чтобы типичный или намеренно подготовленный вход раз за разом на него попадал.',
        en: 'A naive pivot choice (first or last element) is exactly vulnerable to already-sorted or reverse-sorted input - a common case in practice, not a rarity. **Random selection** or **median-of-three** (of the first, middle, and last elements) does not remove the theoretical O(n²) worst case - any fixed pivot strategy has some input that defeats it - but it makes it unlikely that a typical or deliberately crafted input keeps hitting it.',
      },
      {
        ru: 'Introsort, использующийся в libstdc++ для C++ `std::sort`, решает ту же проблему иначе: отслеживает глубину рекурсии и переключается на Heap Sort, если она превышает `2 * log2(n)`. Для n = 1000 порог составляет `2 * log2(1000) ≈ 19.93`, то есть примерно **20 уровней** - если Quicksort зашёл глубже, это верный признак систематически несбалансированных разбиений, и алгоритм страхуется гарантированным O(n log n) вместо риска квадратичного срыва.',
        en: 'Introsort, used by libstdc++ for C++\'s `std::sort`, solves the same problem differently: it tracks recursion depth and switches to Heap Sort once it exceeds `2 * log2(n)`. For n = 1000 the threshold is `2 * log2(1000) ≈ 19.93`, roughly **20 levels** - if Quicksort has gone deeper than that, it is a reliable sign of systematically unbalanced splits, and the algorithm falls back to a guaranteed O(n log n) instead of risking the quadratic blowup.',
      },
      {
        ru: 'Массивы с большим числом повторяющихся значений создают отдельную проблему: обычное двустороннее партиционирование продолжает рекурсивно дробить группу элементов, равных опорному, вместо того чтобы исключить её. **Трёхстороннее партиционирование** (Dutch national flag, по аналогии с тремя полосами голландского флага) делит подмассив на три зоны - «меньше», «равно», «больше» опорного - за один проход и рекурсирует только по крайним двум, полностью исключая среднюю зону из дальнейшей работы.',
        en: 'Arrays with many duplicate values create a separate problem: standard two-way partitioning keeps recursively splitting the group of elements equal to the pivot instead of excluding it. **Three-way partitioning** (the "Dutch national flag" scheme, named after the flag\'s three stripes) splits the subarray into "less than," "equal to," and "greater than" the pivot in one pass, then recurses only on the two outer zones, excluding the middle one from any further work.',
      },
      {
        ru: 'Quicksort известен с **1959 года**, когда его придумал британский информатик **Тони Хоар** во время работы над машинным переводом в МГУ; опубликован алгоритм был в 1961-м под названием «Algorithm 64: Quicksort» в журнале Communications of the ACM. Название прижилось не случайно - на реальном железе он почти всегда обгоняет сортировку слиянием того же среднего порядка сложности именно за счёт партиционирования прямо в исходном массиве, без выделения временных буферов на каждом уровне рекурсии.',
        en: 'Quicksort dates back to **1959**, when British computer scientist **Tony Hoare** devised it while working on machine translation at Moscow State University; the algorithm was published in 1961 as "Algorithm 64: Quicksort" in Communications of the ACM. The name stuck for a reason - on real hardware it almost always beats merge sort despite matching average-case complexity, precisely because it partitions directly within the original array, with no temporary buffer allocated at every recursion level.',
      },
    ],
    whenToUse: [
      {
        ru: '**Против Merge Sort** - если O(n) дополнительной памяти merge sort недопустимо (большой массив в ограниченной памяти), Quicksort с его O(log n) на стек рекурсии - предпочтительный выбор, при условии что гарантия худшего случая не критична.',
        en: '**Against Merge Sort** - if merge sort\'s O(n) extra memory is unacceptable (a large array under a tight memory budget), Quicksort\'s O(log n) recursion-stack footprint is the preferable choice, provided a worst-case guarantee isn\'t critical.',
      },
      {
        ru: '**Против Heap Sort** - Heap Sort гарантирует O(n log n) всегда и сортирует на месте с O(1) памяти, но его доступ к памяти скачет по индексам кучи, тогда как Quicksort обходит данные более последовательно. Когда гарантия важнее скорости - Heap Sort (или Introsort с его подстраховкой); когда важна типичная скорость - Quicksort.',
        en: '**Against Heap Sort** - Heap Sort always guarantees O(n log n) and sorts in place with O(1) memory, but its heap-index access pattern jumps around, whereas Quicksort walks data more sequentially. When the guarantee matters more than speed, pick Heap Sort (or Introsort with its safety net); when typical-case speed matters, pick Quicksort.',
      },
      {
        ru: '**На данных с большим числом повторов** - стандартное двустороннее партиционирование (как в реализации на этой странице) деградирует к O(n²) на массиве, где почти все значения равны; здесь нужна модификация с трёхсторонним партиционированием, а не базовая схема Ломуто.',
        en: '**On data with heavy duplication** - standard two-way partitioning (as implemented on this page) degrades to O(n²) on an array where almost all values are equal; a three-way-partitioning variant is needed there, not the plain Lomuto scheme.',
      },
      {
        ru: '**Не выбирать наивную версию для входа, который может быть адверсариальным** (например, данные приходят от внешнего пользователя) - предсказуемый выбор опорного (первый/последний элемент) даёт атакующему возможность спровоцировать O(n²) заранее подготовленным входом; нужны либо случайный выбор опорного, либо Introsort с подстраховкой глубины.',
        en: '**Don\'t pick the naive version for potentially adversarial input** (e.g. data arriving from an external user) - a predictable pivot choice (first/last element) lets an attacker trigger O(n²) with a crafted input ahead of time; either randomized pivot selection or Introsort\'s depth safety net is needed.',
      },
      {
        ru: '**На маленьких подмассивах** (примерно до 10-20 элементов) накладные расходы на рекурсивные вызовы Quicksort перевешивают выигрыш от O(n log n) - гибридные реализации переключаются на Insertion Sort ниже этого порога, так же как это делают Timsort и Introsort.',
        en: '**On small subarrays** (roughly up to 10-20 elements), Quicksort\'s recursive-call overhead outweighs the O(n log n) benefit - hybrid implementations switch to Insertion Sort below this threshold, the same way Timsort and Introsort do.',
      },
    ],
    realWorld: [
      {
        ru: '**Тони Хоар, 1959/1961** - Quicksort изобретён во время работы над проектом машинного перевода в МГУ и опубликован как «Algorithm 64: Quicksort» в Communications of the ACM - один из самых цитируемых алгоритмов сортировки в истории информатики.',
        en: '**Tony Hoare, 1959/1961** - Quicksort was invented while working on a machine-translation project at Moscow State University and published as "Algorithm 64: Quicksort" in Communications of the ACM - one of the most cited sorting algorithms in computer science history.',
      },
      {
        ru: '**libstdc++ (GCC) для `std::sort`** реализует Introsort с конкретным порогом переключения на Heap Sort в `2 * log2(n)` уровней глубины рекурсии - именно то число, которое проверяется в квизе этой страницы.',
        en: '**libstdc++ (GCC) for `std::sort`** implements Introsort with a concrete switch-to-Heap-Sort threshold of `2 * log2(n)` recursion levels - the exact figure checked in this page\'s quiz.',
      },
      {
        ru: '**Dual-Pivot Quicksort** (Владимир Ярославский, Йон Бенткус, Йозеф Бентли, 2009) используется в `java.util.Arrays.sort(int[])` и других методах для примитивных типов в Java - вариант с двумя опорными элементами вместо одного, разбивающий массив сразу на три части за проход.',
        en: '**Dual-Pivot Quicksort** (Vladimir Yaroslavskiy, Jon Bentley, Joshua Bloch, 2009) is used by `java.util.Arrays.sort(int[])` and other primitive-type sort methods in Java - a variant with two pivots instead of one, splitting the array into three parts in a single pass.',
      },
      {
        ru: '**pdqsort** (pattern-defeating quicksort, Орсон Питерс, 2015) используется в Rust\'овом `slice::sort_unstable` - сочетает схему Хоара, эвристики обнаружения уже отсортированных участков и защиту от худшего случая по глубине, как у Introsort.',
        en: '**pdqsort** (pattern-defeating quicksort, Orson Peters, 2015) is used by Rust\'s `slice::sort_unstable` - it combines Hoare-style partitioning, heuristics for detecting already-sorted runs, and Introsort-style depth-based worst-case protection.',
      },
      {
        ru: '**Атаки на алгоритмическую сложность (algorithmic complexity attacks)** - в 2000-х исследователи показывали, что сервисы, принимающие пользовательские данные и сортирующие их наивным Quicksort с предсказуемым выбором опорного, можно положить заранее подготовленным входом, вызывающим O(n²) - это одна из причин, по которой современные стандартные библиотеки перешли на рандомизацию опорного или Introsort по умолчанию.',
        en: '**Algorithmic complexity attacks** - in the 2000s, researchers showed that services accepting user data and sorting it with a naive, predictably-pivoted Quicksort could be brought down with a crafted input triggering O(n²) - one of the reasons modern standard libraries default to randomized pivots or Introsort.',
      },
    ],
  },

  relatedAlgorithms: ['merge-sort', 'selection-sort'],

  quiz: [
    {
      question: {
        ru: 'Является ли быстрая сортировка устойчивой (stable)?',
        en: 'Is quicksort stable?',
      },
      options: [
        { ru: 'Нет - перестановки при разбиении нарушают порядок равных элементов', en: 'No - swaps during partitioning can change the relative order of equal elements' },
        { ru: 'Да - при разбиении равные элементы никогда не меняют свой относительный порядок', en: 'Yes - equal elements never change their relative order during partitioning' },
        { ru: 'Зависит от версии: рандомизированная устойчива, а с фиксированным опорным - нет', en: 'It depends on the version: randomized quicksort is stable, fixed-pivot quicksort is not' },
        { ru: 'Только если все элементы массива различны', en: 'Only if all elements of the array are distinct' },
      ],
      correct: 0,
      explanation: {
        ru: 'Операция swap во время разбиения может «перебросить» равные по значению элементы через опорный, меняя их взаимный порядок - отсюда нестабильность.',
        en: 'The swap operation during partitioning can leap-frog equal-valued elements past the pivot, changing their mutual order - hence the instability.',
      },
      hint: {
        ru: 'Смотри пункт про неустойчивость в разделе «Минусы» на вкладке «Плюсы и минусы» и шаг «Найден элемент меньше опорного» в разборе кода на вкладке «Реализация».',
        en: 'See the instability item in the "Cons" section on the "Pros & Cons" tab and the "Found an element smaller than the pivot" step in the code walkthrough on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти использует быстрая сортировка в среднем случае?',
        en: 'How much extra memory does quicksort use in the average case?',
      },
      options: [
        { ru: 'O(log n) - на стек рекурсии', en: 'O(log n) - for the recursion stack' },
        {
          ru: 'O(n) - столько же дополнительной памяти, сколько требуется сортировке слиянием для слияния',
          en: 'O(n) - the same amount of extra memory that merge sort needs for merging its subarrays',
        },
        {
          ru: 'O(1) - потому что рекурсивные вызовы полностью оптимизируются компилятором',
          en: 'O(1) - because recursive calls are optimized away entirely by the compiler',
        },
        {
          ru: 'O(n log n) - по числу сравнений, выполняемых в процессе сортировки',
          en: 'O(n log n) - matching the number of comparisons made during sorting',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование происходит на месте, но каждый рекурсивный вызов занимает кадр стека - при сбалансированном разбиении глубина рекурсии составляет O(log n).',
        en: 'Partitioning happens in place, but each recursive call takes a stack frame - with balanced splits, recursion depth is O(log n).',
      },
      hint: {
        ru: 'Смотри бейдж «Память» в шапке страницы и шаг «Рекурсия на обе части» в разборе кода на вкладке «Реализация».',
        en: 'See the "Space" badge in the page header and the "Recursing into both parts" step in the code walkthrough on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова средняя и лучшая временная сложность быстрой сортировки?',
        en: 'What is the average-case and best-case time complexity of quicksort?',
      },
      options: [
        { ru: 'O(n log n) - при равномерных разбиениях дерево рекурсии имеет глубину log n', en: 'O(n log n) - with balanced splits the recursion tree has depth log n' },
        { ru: 'O(n²) - она всегда деградирует в квадратичную, так как использует обмен элементами', en: 'O(n²) - it always degrades to quadratic because it relies on element swaps' },
        { ru: 'O(n) - потому что партиционирование является линейным проходом по массиву', en: 'O(n) - because partitioning is a single linear pass over the array' },
        { ru: 'O(n log² n) - из-за двойного логарифмического множителя глубины рекурсии', en: 'O(n log² n) - due to a double logarithmic factor in recursion depth' },
      ],
      correct: 0,
      explanation: {
        ru: 'При сбалансированных разбиениях глубина рекурсии равна O(log n), а каждый уровень выполняет O(n) работы при партиционировании - итого O(n log n). Это же значение является и лучшим случаем.',
        en: 'With balanced splits, recursion depth is O(log n), and each level does O(n) work during partitioning - total O(n log n). This is also the best-case value.',
      },
      hint: {
        ru: 'Смотри раздел «Как это работает» на вкладке «Суть» - там разобран пример партиционирования конкретного массива по шагам.',
        en: 'See the "How it works" section on the "Intent" tab - it walks through a concrete array partitioning example step by step.',
      },
    },
    {
      question: {
        ru: 'Что гарантированно верно об опорном элементе сразу после шага партиционирования?',
        en: 'What is guaranteed true about the pivot right after the partition step?',
      },
      options: [
        {
          ru: 'Он стоит на своей окончательной позиции в отсортированном массиве',
          en: 'It sits at its final position in the sorted array',
        },
        {
          ru: 'Он всегда является минимальным элементом во всём исходном массиве, а не только в подмассиве',
          en: 'It is always the minimum element of the entire original array, not just the subarray',
        },
        {
          ru: 'Он удаляется из массива и хранится отдельно до завершения всей рекурсии',
          en: 'It is removed from the array and stored separately until the whole recursion finishes',
        },
        {
          ru: 'Он копируется во временный массив вместе с остальной частью подмассива на всякий случай',
          en: 'It is copied into a temporary array alongside the rest of the subarray for safekeeping',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование расставляет все меньшие элементы слева, большие - справа от опорного, поэтому его текущая позиция и есть его финальное место в отсортированном массиве.',
        en: 'Partitioning places all smaller elements to the left and all larger ones to the right of the pivot, so its current position is exactly its final place in the sorted array.',
      },
      hint: {
        ru: 'Смотри шаг «Зафиксировать опорный» на вкладке «Визуализация» и шаг «Финальная перестановка опорного» в разборе кода на вкладке «Реализация».',
        en: 'See the "Fix the pivot" step on the "Visualization" tab and the "The final pivot swap" step in the code walkthrough on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'При каких условиях быстрая сортировка деградирует до O(n²)?',
        en: 'Under what conditions does quicksort degrade to O(n²)?',
      },
      options: [
        {
          ru: 'Когда опорный элемент раз за разом оказывается самым маленьким или самым большим в подмассиве',
          en: 'When the pivot repeatedly ends up being the smallest or largest element in the subarray',
        },
        {
          ru: 'Когда массив содержит только уникальные значения, поэтому каждое сравнение при партиционировании оказывается строгим неравенством',
          en: 'When the array contains only unique values, so every comparison during partitioning is a strict inequality',
        },
        {
          ru: 'Когда длина массива является точной степенью двойки, например 16, 32 или 1024 элемента',
          en: 'When the array length is an exact power of two, such as 16, 32, or 1024 elements',
        },
        {
          ru: 'Это невозможно - quicksort математически гарантированно всегда работает за O(n log n), независимо от входных данных',
          en: 'This is impossible - quicksort is mathematically guaranteed to always run in O(n log n) time, regardless of input',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В этом случае каждое партиционирование делит массив на части размером 0 и n−1 вместо примерно равных половин, и глубина рекурсии становится O(n) вместо O(log n).',
        en: 'In that case, every partition splits the array into parts of size 0 and n−1 instead of roughly equal halves, and recursion depth becomes O(n) instead of O(log n).',
      },
      hint: {
        ru: 'Смотри раздел «Как это работает» на вкладке «Суть» - там разобран числовой пример деградации на отсортированном массиве.',
        en: 'See the "How it works" section on the "Intent" tab - it works through a numeric example of degradation on a sorted array.',
      },
    },
    {
      question: {
        ru: 'Как Introsort (используется в C++ `std::sort`) защищается от худшего случая quicksort?',
        en: 'How does Introsort (used by C++\'s `std::sort`) guard against quicksort\'s worst case?',
      },
      options: [
        {
          ru: 'Отслеживает глубину рекурсии и переключается на heapsort при её чрезмерном росте',
          en: 'It tracks recursion depth and switches to heapsort if it gets too large',
        },
        {
          ru: 'Полностью отказывается от быстрой сортировки и всегда начинает с сортировки слиянием',
          en: 'It abandons quicksort entirely and always begins sorting with merge sort instead',
        },
        {
          ru: 'Всегда выбирает опорным самый первый элемент массива при каждом рекурсивном вызове',
          en: 'It always picks the very first element of the array as the pivot on every call',
        },
        {
          ru: 'Использует для сравнения только элементы с чётными индексами массива',
          en: 'It only uses elements at even-numbered indices when comparing values',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort начинает как быстрая сортировка ради практической скорости, но при аномально глубокой рекурсии (признак плохого разбиения) переключается на heapsort с гарантированным O(n log n), избегая квадратичного срыва.',
        en: 'Introsort starts as quicksort for practical speed, but on abnormally deep recursion (a sign of bad partitioning) switches to heapsort with a guaranteed O(n log n), avoiding the quadratic blowup.',
      },
      hint: {
        ru: 'Смотри пункт про Introsort и порог `2 * log2(n)` в разделе «Как это работает» на вкладке «Суть».',
        en: 'See the Introsort item and the `2 * log2(n)` threshold in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Как случайный выбор опорного элемента (или медиана из трёх) решает проблему худшего случая quicksort?',
        en: "How does randomized pivot selection (or median-of-three) address quicksort's worst-case problem?",
      },
      options: [
        {
          ru: 'Делает маловероятным, чтобы конкретный вход систематически вызывал худший случай, хотя теоретически он всё ещё возможен',
          en: 'It makes it unlikely for any specific input to systematically trigger the worst case, though it remains theoretically possible',
        },
        {
          ru: 'Математически гарантирует, что худший случай O(n log n) будет достигнут для абсолютно любого возможного входного массива, полностью исключая деградацию до O(n²) навсегда',
          en: 'It mathematically guarantees an O(n log n) worst case on every single possible input array, permanently eliminating any chance of the O(n²) case',
        },
        {
          ru: 'Делает сортировку полностью и необратимо устойчивой, гарантированно сохраняя относительный порядок всех равных элементов на каждом запуске',
          en: 'It makes the sort fully and permanently stable, guaranteeing the relative order of all equal elements is preserved on every single run',
        },
        {
          ru: 'Полностью устраняет саму необходимость в рекурсии, заменяя её единственным итеративным циклом обхода без стека вызовов',
          en: 'It eliminates the need for recursion entirely, replacing it with a single iterative loop that uses no call stack whatsoever',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Случайный выбор опорного (или медиана из первого/среднего/последнего элементов) не меняет теоретический худший случай O(n²) - он всё ещё существует для какого-то расположения элементов. Но он делает крайне маловероятным, чтобы конкретный фиксированный вход раз за разом его вызывал.',
        en: 'Randomizing the pivot (or taking the median of the first/middle/last elements) does not change the theoretical O(n²) worst case - it still exists for some arrangement of elements. But it makes it extremely unlikely that any specific fixed input will repeatedly trigger it.',
      },
      hint: {
        ru: 'Смотри абзац про случайный выбор опорного и медиану из трёх в разделе «Как это работает» на вкладке «Суть».',
        en: 'See the paragraph about randomized pivot selection and median-of-three in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'В чём практическое отличие схемы партиционирования Хоара (Hoare) от схемы Ломуто (Lomuto), использованной в реализации выше?',
        en: "What is the practical difference between Hoare's partition scheme and the Lomuto scheme used in the implementation above?",
      },
      options: [
        {
          ru: 'Схема Хоара в среднем делает примерно втрое меньше перестановок',
          en: 'Hoare\'s scheme performs roughly three times fewer swaps on average',
        },
        {
          ru: 'Схема Хоара не сортирует на месте, требуя отдельный выходной массив целиком',
          en: "Hoare's scheme doesn't sort in place, requiring a separate output array entirely",
        },
        {
          ru: 'Схема Ломуто асимптотически быстрее, снижая класс сложности алгоритма в целом',
          en: "Lomuto's scheme is asymptotically faster, reducing the overall complexity class",
        },
        {
          ru: 'Между этими двумя схемами партиционирования нет вообще никакой значимой разницы',
          en: 'There is no meaningful difference between the schemes in theory or in practice',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Схема Ломуто обходит массив одним указателем и переставляет элементы чаще, особенно при большом числе повторяющихся значений. Оригинальная схема Хоара использует два указателя, идущих навстречу друг другу, и в среднем делает примерно втрое меньше перестановок, что обычно быстрее на практике.',
        en: "Lomuto's scheme scans with a single pointer and swaps more often, especially with many duplicate values. Hoare's original scheme uses two pointers moving toward each other and performs roughly three times fewer swaps on average, which is usually faster in practice.",
      },
      hint: {
        ru: 'Смотри абзац про схему Ломуто и схему Хоара в разделе «Как это работает» на вкладке «Суть».',
        en: 'See the paragraph about the Lomuto and Hoare schemes in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему быстрая сортировка на практике часто обгоняет сортировку слиянием при одинаковой средней асимптотике O(n log n)?',
        en: 'Why does quicksort often outperform merge sort in practice despite the same average O(n log n) asymptotics?',
      },
      options: [
        {
          ru: 'Она сортирует на месте с хорошей локальностью кэша, не выделяя временные массивы, в отличие от сортировки слиянием',
          en: "It sorts in place with good cache locality, without allocating temporary arrays, unlike merge sort",
        },
        {
          ru: 'У неё строго лучшая асимптотическая сложность по времени, чем у сортировки слиянием, буквально в любом возможном случае без исключений',
          en: 'It has a strictly better big-O time complexity than merge sort in absolutely every single case, without exception',
        },
        {
          ru: 'Сортировка слиянием на самом деле никогда не является O(n log n) на практике, вопреки тому, что утверждают учебники',
          en: 'Merge sort is not actually O(n log n) in practice at all, despite what every textbook claims about it',
        },
        {
          ru: 'Быстрая сортировка всегда делает строго меньше сравнений элементов, чем сортировка слиянием на любом входе',
          en: 'Quicksort always makes strictly fewer element comparisons than merge sort, no matter the input given',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Партиционирование quicksort работает прямо внутри исходного массива - хорошая локальность кэша и минимум обращений к памяти. Сортировка слиянием на каждом шаге выделяет и копирует данные во временные массивы. Число сравнений асимптотически одинаково, но quicksort обычно выигрывает по константам и эффективности на реальном железе.',
        en: "Quicksort's partitioning works directly within the original array - good cache locality and minimal memory traffic. Merge sort allocates and copies into temporary arrays at every step. The comparison count is asymptotically the same, but quicksort typically wins on constant factors and real hardware efficiency.",
      },
      hint: {
        ru: 'Смотри пункт про кэш-локальность в разделе «Плюсы» на вкладке «Плюсы и минусы».',
        en: 'See the cache-locality item in the "Pros" section on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Как «трёхстороннее» партиционирование (Dutch national flag) помогает quicksort на массивах с большим числом одинаковых значений?',
        en: "How does three-way ('Dutch national flag') partitioning help quicksort on arrays with many duplicate values?",
      },
      options: [
        {
          ru: 'Оно выделяет отдельную область элементов, равных опорному, и исключает её из дальнейшей рекурсии',
          en: 'It carves out a separate region of elements equal to the pivot and excludes it from further recursion',
        },
        {
          ru: 'Оно делает сортировку полностью и необратимо устойчивой, гарантированно сохраняя порядок всех равных элементов навсегда',
          en: 'It makes the sort fully and permanently stable by guaranteeing the order of all equal elements is preserved forever',
        },
        {
          ru: 'Оно полностью устраняет саму необходимость в опорном элементе, сортируя массив исключительно по числу выполненных сравнений',
          en: 'It eliminates the need for a pivot element entirely, sorting the array purely by counting comparisons instead',
        },
        {
          ru: 'Оно вообще никак не влияет на производительность, независимо от того, сколько повторяющихся значений содержит массив',
          en: 'It has no measurable effect on performance whatsoever, regardless of how many duplicate values the array contains',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Обычное двустороннее партиционирование продолжает рекурсивно обрабатывать все элементы, равные опорному, что превращает массив с массой повторов в патологический O(n²) случай. Трёхстороннее партиционирование группирует элементы на «меньше», «равно» и «больше» опорного и полностью исключает среднюю группу из рекурсии, возвращая производительность к O(n) на таких данных.',
        en: 'Standard two-way partitioning keeps recursively processing all elements equal to the pivot, which turns an array with heavy duplication into a pathological O(n²) case. Three-way partitioning groups elements into "less than," "equal to," and "greater than" the pivot and excludes the middle group from recursion entirely, bringing performance back toward O(n) on such data.',
      },
      hint: {
        ru: 'Смотри абзац про трёхстороннее партиционирование (Dutch national flag) в разделе «Как это работает» на вкладке «Суть».',
        en: 'See the paragraph about three-way ("Dutch national flag") partitioning in the "How it works" section on the "Intent" tab.',
      },
    },
  ],
};

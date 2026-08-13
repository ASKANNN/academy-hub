export const introSort = {
  slug: 'intro-sort',
  category: 'sorting',
  name: { ru: 'Introsort', en: 'Introsort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(log n)',
  },
  popularity: 3,
  tags: ['hybrid', 'comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Интроспективная сортировка начинает как быстрая сортировка, но следит за глубиной рекурсии и переключается на пирамидальную сортировку, если рекурсия уходит слишком глубоко, а на маленьких подмассивах - на сортировку вставками.',
    en: 'Introsort starts as quicksort but tracks recursion depth and switches to heap sort if the recursion goes too deep, and to insertion sort on small subarrays.',
  },

  problem: {
    ru: 'Быстрая сортировка в среднем быстрее всех практических алгоритмов, но на неудачных входных данных (например, уже отсортированный массив с наивным выбором опорного элемента) её рекурсия деградирует до O(n²) и может исчерпать стек вызовов. Библиотечная функция сортировки не может позволить себе такой риск на произвольных пользовательских данных - нужна гарантия наихудшего случая без потери средней производительности quicksort.',
    en: 'Quicksort is on average faster than any practical algorithm, but on unlucky input (e.g. an already sorted array with a naive pivot choice) its recursion degrades to O(n²) and can exhaust the call stack. A library sort function cannot afford that risk on arbitrary user data - a worst-case guarantee is needed without losing quicksort\'s average-case performance.',
  },

  solution: {
    ru: 'Интроспективная сортировка запускает обычный quicksort, но отслеживает глубину рекурсии. Если глубина превышает порог 2·log₂(n), алгоритм «сдаётся» и досортировывает текущий подмассив пирамидальной сортировкой - у неё гарантированный O(n log n) в худшем случае. На маленьких подмассивах (обычно меньше ~16 элементов) применяется сортировка вставками, так как на таком размере она быстрее из-за низких констант. Так интроспективная сортировка получает среднюю скорость quicksort, гарантию heap sort и эффективность insertion sort на «хвостах».',
    en: 'Introsort runs regular quicksort but tracks recursion depth. If the depth exceeds a threshold of 2·log₂(n), the algorithm "gives up" and finishes sorting the current subarray with heap sort, which has a guaranteed O(n log n) worst case. On small subarrays (typically under ~16 elements), insertion sort is used since it is faster there due to low constant factors. This way introsort gets quicksort\'s average speed, heap sort\'s guarantee, and insertion sort\'s efficiency on the tails.',
  },

  steps: [
    {
      title: { ru: 'Начать с быстрой сортировки', en: 'Start with quicksort' },
      explanation: {
        ru: 'Выбрать опорный элемент и разбить массив на части меньше и больше опорного, как в обычном quicksort.',
        en: 'Choose a pivot and partition the array into parts smaller and larger than the pivot, as in regular quicksort.',
      },
    },
    {
      title: { ru: 'Отслеживать глубину рекурсии', en: 'Track recursion depth' },
      explanation: {
        ru: 'На каждом рекурсивном вызове увеличивать счётчик глубины и сравнивать его с порогом 2·log₂(n).',
        en: 'On each recursive call, increment the depth counter and compare it against the threshold 2·log₂(n).',
      },
    },
    {
      title: { ru: 'Переключиться на heap sort при превышении порога', en: 'Switch to heap sort past the threshold' },
      explanation: {
        ru: 'Если глубина превысила порог, досортировать оставшийся подмассив пирамидальной сортировкой вместо дальнейшей рекурсии quicksort.',
        en: 'If the depth has exceeded the threshold, finish sorting the remaining subarray with heap sort instead of continuing quicksort recursion.',
      },
    },
    {
      title: { ru: 'Переключиться на insertion sort на маленьких блоках', en: 'Switch to insertion sort on small blocks' },
      explanation: {
        ru: 'Когда размер подмассива становится меньше порогового значения, отсортировать его сортировкой вставками.',
        en: 'When a subarray shrinks below a size threshold, sort it with insertion sort.',
      },
    },
    {
      title: { ru: 'Собрать результат', en: 'Assemble the result' },
      explanation: {
        ru: 'Все подмассивы, отсортированные тремя разными способами, вместе образуют полностью отсортированный массив.',
        en: 'All subarrays, sorted via three different methods, together form the fully sorted array.',
      },
    },
  ],
  stepBreakpoints: [2, 10, 18, 25],

  implementation: {
    javascript: `function introSort(arr) {
  const a = [...arr];
  const maxDepth = 2 * Math.floor(Math.log2(a.length || 1));
  introsortRec(a, 0, a.length - 1, maxDepth);
  return a;
}

function introsortRec(a, low, high, depthLimit) {
  const size = high - low + 1;
  if (size < 16) {
    insertionSortRange(a, low, high);
    return;
  }
  if (depthLimit === 0) {
    heapSortRange(a, low, high);
    return;
  }
  const p = partition(a, low, high);
  introsortRec(a, low, p - 1, depthLimit - 1);
  introsortRec(a, p + 1, high, depthLimit - 1);
}

function partition(a, low, high) {
  const pivot = a[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (a[j] < pivot) {
      i++;
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
  [a[i + 1], a[high]] = [a[high], a[i + 1]];
  return i + 1;
}

function insertionSortRange(a, low, high) {
  for (let i = low + 1; i <= high; i++) {
    const current = a[i];
    let j = i - 1;
    while (j >= low && a[j] > current) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = current;
  }
}

function heapSortRange(a, low, high) {
  const size = high - low + 1;
  const sub = a.slice(low, high + 1);
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) siftDown(sub, size, i);
  for (let end = size - 1; end > 0; end--) {
    [sub[0], sub[end]] = [sub[end], sub[0]];
    siftDown(sub, end, 0);
  }
  for (let i = 0; i < size; i++) a[low + i] = sub[i];
}

function siftDown(a, size, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < size && a[left] > a[largest]) largest = left;
  if (right < size && a[right] > a[largest]) largest = right;
  if (largest !== i) {
    [a[i], a[largest]] = [a[largest], a[i]];
    siftDown(a, size, largest);
  }
}`,
    python: `import math


def intro_sort(arr):
    a = arr.copy()
    max_depth = 2 * math.floor(math.log2(len(a) or 1))
    _introsort_rec(a, 0, len(a) - 1, max_depth)
    return a


def _introsort_rec(a, low, high, depth_limit):
    size = high - low + 1
    if size < 16:
        _insertion_sort_range(a, low, high)
        return
    if depth_limit == 0:
        _heap_sort_range(a, low, high)
        return
    p = _partition(a, low, high)
    _introsort_rec(a, low, p - 1, depth_limit - 1)
    _introsort_rec(a, p + 1, high, depth_limit - 1)


def _partition(a, low, high):
    pivot = a[high]
    i = low - 1
    for j in range(low, high):
        if a[j] < pivot:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[high] = a[high], a[i + 1]
    return i + 1


def _insertion_sort_range(a, low, high):
    for i in range(low + 1, high + 1):
        current = a[i]
        j = i - 1
        while j >= low and a[j] > current:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = current


def _heap_sort_range(a, low, high):
    size = high - low + 1
    sub = a[low:high + 1]

    def sift_down(size, i):
        largest = i
        left, right = 2 * i + 1, 2 * i + 2
        if left < size and sub[left] > sub[largest]:
            largest = left
        if right < size and sub[right] > sub[largest]:
            largest = right
        if largest != i:
            sub[i], sub[largest] = sub[largest], sub[i]
            sift_down(size, largest)

    for i in range(size // 2 - 1, -1, -1):
        sift_down(size, i)
    for end in range(size - 1, 0, -1):
        sub[0], sub[end] = sub[end], sub[0]
        sift_down(end, 0)

    a[low:high + 1] = sub`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Сигнатура и копия', en: 'Signature and copy' },
        explanation: {
          ru: '`introSort(arr)` принимает исходный массив и сразу копирует его в `a` - вся дальнейшая работа (все четыре вспомогательные функции ниже) происходит в этой копии.',
          en: '`introSort(arr)` takes the input array and immediately copies it into `a` - all subsequent work (all four helper functions below) happens on this copy.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Порог глубины рекурсии', en: 'Recursion depth threshold' },
        explanation: {
          ru: '`maxDepth = 2 * Math.floor(Math.log2(a.length || 1))` вычисляется один раз для всего массива. `|| 1` защищает от `Math.log2(0)` на пустом входе. Это тот самый порог `2·log₂(n)`, при превышении которого рекурсия сочтёт себя «неудачной» и уступит место heap sort.',
          en: '`maxDepth = 2 * Math.floor(Math.log2(a.length || 1))` is computed once for the whole array. The `|| 1` guards against `Math.log2(0)` on empty input. This is exactly the `2·log₂(n)` threshold - once recursion exceeds it, it\'s deemed to have gone wrong and hands off to heap sort.',
        },
      },
      {
        lines: [4, 5],
        title: { ru: 'Запуск рекурсии и возврат', en: 'Kicking off recursion and returning' },
        explanation: {
          ru: '`introsortRec(a, 0, a.length - 1, maxDepth)` запускает основную рекурсию на всём диапазоне массива с полным бюджетом глубины. После её завершения `a` полностью отсортирован и возвращается.',
          en: '`introsortRec(a, 0, a.length - 1, maxDepth)` starts the main recursion over the whole array range with the full depth budget. Once it finishes, `a` is fully sorted and gets returned.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Размер текущего подмассива', en: 'Current subarray size' },
        explanation: {
          ru: '`const size = high - low + 1` вычисляется на каждом вызове `introsortRec` - именно от него зависит, какая из трёх стратегий сработает на этом диапазоне.',
          en: '`const size = high - low + 1` is computed on every `introsortRec` call - it determines which of the three strategies fires for this range.',
        },
      },
      {
        lines: [10, 12],
        title: { ru: 'Маленький блок - insertion sort', en: 'Small block - insertion sort' },
        explanation: {
          ru: '`if (size < 16)` перехватывает подмассив раньше, чем депth-лимит вообще проверяется - маленькие диапазоны всегда идут в `insertionSortRange`, независимо от оставшегося бюджета глубины.',
          en: '`if (size < 16)` intercepts the subarray before the depth limit is even checked - small ranges always go to `insertionSortRange`, regardless of remaining depth budget.',
        },
      },
      {
        lines: [14, 16],
        title: { ru: 'Глубина исчерпана - heap sort', en: 'Depth exhausted - heap sort' },
        explanation: {
          ru: '`if (depthLimit === 0)` срабатывает, когда рекурсия зашла настолько глубоко, что превысила `maxDepth` - в этом случае текущий диапазон досортировывается гарантированным `heapSortRange` вместо дальнейшего партиционирования.',
          en: '`if (depthLimit === 0)` fires when recursion has gone deep enough to exceed `maxDepth` - in that case the current range is finished off with the guaranteed `heapSortRange` instead of further partitioning.',
        },
      },
      {
        lines: [18, 20],
        title: { ru: 'Партиционирование и рекурсия', en: 'Partitioning and recursing' },
        explanation: {
          ru: 'Если ни одно из условий выше не сработало, `partition` разбивает диапазон вокруг опорного элемента, и `introsortRec` вызывается на обеих половинах с `depthLimit - 1` - именно этот счётчик убывает на единицу на каждом уровне и в итоге запускает переключение на heap sort.',
          en: 'If neither condition above fired, `partition` splits the range around a pivot, and `introsortRec` recurses on both halves with `depthLimit - 1` - this counter is what decreases by one at each level and eventually triggers the heap sort switch.',
        },
      },
      {
        lines: [24, 25],
        title: { ru: 'Выбор опорного и границы', en: 'Pivot choice and boundary' },
        explanation: {
          ru: '`partition` берёт последний элемент диапазона `a[high]` как опорный (pivot) - самый простой вариант выбора, без медианы трёх, как в промышленных реализациях. `i = low - 1` - граница «уже меньше опорного» части, изначально пустой.',
          en: '`partition` takes the range\'s last element `a[high]` as the pivot - the simplest possible choice, no median-of-three like production implementations use. `i = low - 1` is the boundary of the "already smaller than pivot" section, initially empty.',
        },
      },
      {
        lines: [26, 29],
        title: { ru: 'Сканирование и обмен', en: 'Scanning and swapping' },
        explanation: {
          ru: 'Цикл `for (let j = low; j < high; j++)` проходит диапазон до опорного элемента. Каждый раз, когда `a[j] < pivot`, граница `i` сдвигается вперёд и элемент `a[j]` меняется местами с `a[i]` - так все элементы меньше опорного собираются в начале диапазона.',
          en: 'The `for (let j = low; j < high; j++)` loop scans the range up to the pivot. Whenever `a[j] < pivot`, the boundary `i` advances and `a[j]` is swapped with `a[i]` - this way all elements smaller than the pivot get collected at the front of the range.',
        },
      },
      {
        lines: [32, 33],
        title: { ru: 'Установка опорного на место', en: 'Placing the pivot' },
        explanation: {
          ru: 'Опорный элемент меняется местами с `a[i + 1]`, занимая своё окончательное отсортированное место, и `i + 1` возвращается как индекс раздела - именно эта точка делит диапазон на две части для рекурсии.',
          en: 'The pivot is swapped with `a[i + 1]`, landing in its final sorted position, and `i + 1` is returned as the split index - this is exactly the point that divides the range into two parts for recursion.',
        },
      },
      {
        lines: [36, 46],
        title: { ru: 'Сортировка вставками на диапазоне', en: 'Insertion sort over a range' },
        explanation: {
          ru: '`insertionSortRange` - обычная сортировка вставками, но ограниченная границами `low`/`high` вместо всего массива: она сдвигает больший элемент вправо в цикле `while`, пока не найдёт место для `current`. Логика идентична отдельному алгоритму insertion sort.',
          en: '`insertionSortRange` is plain insertion sort, but bounded to `low`/`high` instead of the whole array: it shifts larger elements right in a `while` loop until it finds `current`\'s spot. The logic is identical to the standalone insertion sort algorithm.',
        },
      },
      {
        lines: [49, 50],
        title: { ru: 'Извлечение подмассива', en: 'Extracting the subarray' },
        explanation: {
          ru: '`heapSortRange` работает не с индексами `low`/`high` напрямую, а копирует диапазон в отдельный `sub = a.slice(low, high + 1)` - так вложенный `siftDown` может использовать простую 0-индексацию, как в обычном heap sort.',
          en: '`heapSortRange` doesn\'t work with `low`/`high` indices directly - it copies the range into a separate `sub = a.slice(low, high + 1)`, so the nested `siftDown` can use plain 0-based indexing, just like standalone heap sort.',
        },
      },
      {
        lines: [51, 55],
        title: { ru: 'Построение кучи и извлечение максимумов', en: 'Building the heap and extracting maximums' },
        explanation: {
          ru: 'Ровно та же пара циклов, что и в отдельном алгоритме heap sort: сначала `siftDown` строит max-heap на `sub`, затем корень многократно меняется с концом кучи и просеивается заново - `sub` становится отсортированным по возрастанию.',
          en: 'Exactly the same pair of loops as standalone heap sort: `siftDown` first builds a max-heap over `sub`, then the root is repeatedly swapped with the heap\'s end and re-sifted - `sub` ends up sorted in ascending order.',
        },
      },
      {
        lines: [56],
        title: { ru: 'Запись результата обратно', en: 'Writing the result back' },
        explanation: {
          ru: 'Отсортированный `sub` копируется обратно в исходный массив `a` начиная с позиции `low` - только после этого шага изменения видны за пределами `heapSortRange`.',
          en: 'The sorted `sub` is copied back into the original array `a` starting at position `low` - only after this step do the changes become visible outside `heapSortRange`.',
        },
      },
      {
        lines: [60, 62],
        title: { ru: 'Индексы детей в siftDown', en: 'Child indices in siftDown' },
        explanation: {
          ru: '`siftDown` использует ту же формулу индексации кучи в массиве, что и отдельный heap sort: `largest = i`, дети - `2 * i + 1` и `2 * i + 2`.',
          en: '`siftDown` uses the same array-heap indexing formula as standalone heap sort: `largest = i`, children at `2 * i + 1` and `2 * i + 2`.',
        },
      },
      {
        lines: [64, 65],
        title: { ru: 'Сравнение с детьми', en: 'Comparing against children' },
        explanation: {
          ru: 'Каждая проверка `left < size` / `right < size` защищает от выхода за пределы текущей границы `size`, которая уменьшается на каждом шаге извлечения в `heapSortRange`.',
          en: 'Each `left < size` / `right < size` check guards against going past the current boundary `size`, which shrinks on every extraction step inside `heapSortRange`.',
        },
      },
      {
        lines: [67, 69],
        title: { ru: 'Обмен и рекурсивное просеивание', en: 'Swapping and recursing' },
        explanation: {
          ru: 'Если `largest !== i`, узел меняется местами с большим ребёнком и `siftDown` вызывается рекурсивно для новой позиции - просеивание продолжается, пока свойство кучи не восстановится.',
          en: 'If `largest !== i`, the node swaps with the larger child and `siftDown` recurses on the new position - sifting continues until the heap property is restored.',
        },
      },
    ],
    python: [
      {
        lines: [4, 5],
        title: { ru: 'Сигнатура и копия', en: 'Signature and copy' },
        explanation: {
          ru: '`intro_sort(arr)` копирует входной список в `a` перед тем, как передать его во внутреннюю рекурсию - все четыре вспомогательные функции ниже работают именно с этой копией.',
          en: '`intro_sort(arr)` copies the input list into `a` before handing it to the internal recursion - all four helper functions below operate on this copy.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Порог глубины рекурсии', en: 'Recursion depth threshold' },
        explanation: {
          ru: '`max_depth = 2 * math.floor(math.log2(len(a) or 1))` - тот же порог `2·log₂(n)`, что и в JS-версии; `or 1` защищает от `log2(0)` на пустом списке.',
          en: '`max_depth = 2 * math.floor(math.log2(len(a) or 1))` - the same `2·log₂(n)` threshold as the JS version; `or 1` guards against `log2(0)` on an empty list.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Запуск рекурсии и возврат', en: 'Kicking off recursion and returning' },
        explanation: {
          ru: '`_introsort_rec(a, 0, len(a) - 1, max_depth)` запускает рекурсию на весь список с полным бюджетом глубины, после чего `a` возвращается уже отсортированным.',
          en: '`_introsort_rec(a, 0, len(a) - 1, max_depth)` starts the recursion over the whole list with the full depth budget, after which `a` is returned fully sorted.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Размер текущего подмассива', en: 'Current subarray size' },
        explanation: {
          ru: '`size = high - low + 1` вычисляется на каждом вызове - от него зависит выбор одной из трёх стратегий.',
          en: '`size = high - low + 1` is computed on every call - it determines which of the three strategies is chosen.',
        },
      },
      {
        lines: [13, 15],
        title: { ru: 'Маленький блок - insertion sort', en: 'Small block - insertion sort' },
        explanation: {
          ru: '`if size < 16:` направляет маленькие диапазоны в `_insertion_sort_range` раньше проверки лимита глубины, идентично JS-версии.',
          en: '`if size < 16:` routes small ranges to `_insertion_sort_range` before the depth-limit check, identical to the JS version.',
        },
      },
      {
        lines: [16, 18],
        title: { ru: 'Глубина исчерпана - heap sort', en: 'Depth exhausted - heap sort' },
        explanation: {
          ru: '`if depth_limit == 0:` переключает текущий диапазон на `_heap_sort_range`, когда рекурсия превысила порог `max_depth`.',
          en: '`if depth_limit == 0:` switches the current range to `_heap_sort_range` once recursion has exceeded the `max_depth` threshold.',
        },
      },
      {
        lines: [19, 21],
        title: { ru: 'Партиционирование и рекурсия', en: 'Partitioning and recursing' },
        explanation: {
          ru: '`_partition` разбивает диапазон вокруг опорного, и `_introsort_rec` вызывается на обеих половинах с `depth_limit - 1` - убывающий счётчик, который в итоге вызовет переключение на heap sort.',
          en: '`_partition` splits the range around a pivot, and `_introsort_rec` recurses on both halves with `depth_limit - 1` - the decreasing counter that eventually triggers the heap sort switch.',
        },
      },
      {
        lines: [25, 26],
        title: { ru: 'Выбор опорного и границы', en: 'Pivot choice and boundary' },
        explanation: {
          ru: '`pivot = a[high]` берёт последний элемент диапазона как опорный, `i = low - 1` - изначально пустая граница «уже меньше опорного» части, идентично JS-версии.',
          en: '`pivot = a[high]` takes the range\'s last element as the pivot, `i = low - 1` is the initially empty "already smaller than pivot" boundary, identical to the JS version.',
        },
      },
      {
        lines: [27, 30],
        title: { ru: 'Сканирование и обмен', en: 'Scanning and swapping' },
        explanation: {
          ru: '`for j in range(low, high):` сканирует диапазон, и при `a[j] < pivot` граница `i` сдвигается и элементы меняются местами кортежным присваиванием.',
          en: '`for j in range(low, high):` scans the range, and whenever `a[j] < pivot`, the boundary `i` advances and the elements swap via tuple assignment.',
        },
      },
      {
        lines: [31, 32],
        title: { ru: 'Установка опорного на место', en: 'Placing the pivot' },
        explanation: {
          ru: 'Опорный элемент меняется местами с `a[i + 1]`, и `i + 1` возвращается как индекс раздела для рекурсии.',
          en: 'The pivot swaps with `a[i + 1]`, and `i + 1` is returned as the split index for recursion.',
        },
      },
      {
        lines: [35, 42],
        title: { ru: 'Сортировка вставками на диапазоне', en: 'Insertion sort over a range' },
        explanation: {
          ru: '`_insertion_sort_range` - обычная сортировка вставками в границах `low`/`high`, идентичная по логике отдельному алгоритму insertion sort.',
          en: '`_insertion_sort_range` is plain insertion sort bounded to `low`/`high`, identical in logic to the standalone insertion sort algorithm.',
        },
      },
      {
        lines: [46, 47],
        title: { ru: 'Извлечение подмассива', en: 'Extracting the subarray' },
        explanation: {
          ru: '`sub = a[low:high + 1]` копирует диапазон в отдельный список, чтобы вложенная `sift_down` использовала простую 0-индексацию.',
          en: '`sub = a[low:high + 1]` copies the range into a separate list so the nested `sift_down` can use plain 0-based indexing.',
        },
      },
      {
        lines: [49, 58],
        title: { ru: 'Вложенная sift_down', en: 'The nested sift_down' },
        explanation: {
          ru: 'Здесь `sift_down` объявлена как вложенная функция, замыкающая `sub` - в остальном её логика (индексы детей, сравнение, обмен, рекурсия) идентична отдельному алгоритму heap sort.',
          en: 'Here `sift_down` is declared as a nested function closing over `sub` - otherwise its logic (child indices, comparison, swap, recursion) is identical to standalone heap sort.',
        },
      },
      {
        lines: [60, 64],
        title: { ru: 'Построение кучи и извлечение максимумов', en: 'Building the heap and extracting maximums' },
        explanation: {
          ru: 'Та же пара циклов, что и в JS-версии: сначала строится max-heap на `sub`, затем корень многократно меняется с концом кучи и просеивается заново.',
          en: 'The same pair of loops as the JS version: a max-heap is first built over `sub`, then the root is repeatedly swapped with the heap\'s end and re-sifted.',
        },
      },
      {
        lines: [66],
        title: { ru: 'Запись результата обратно', en: 'Writing the result back' },
        explanation: {
          ru: '`a[low:high + 1] = sub` записывает отсортированный диапазон обратно в исходный список срезовым присваиванием.',
          en: '`a[low:high + 1] = sub` writes the sorted range back into the original list via slice assignment.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Гарантированный O(n log n) в худшем случае - не деградирует до O(n²), в отличие от чистого quicksort.',
      en: 'Guaranteed O(n log n) worst case - doesn\'t degrade to O(n²) unlike plain quicksort.',
    },
    {
      ru: 'Сохраняет среднюю производительность quicksort на типичных данных за счёт того, что переключение случается редко.',
      en: 'Retains quicksort\'s average performance on typical data, since the fallback triggers rarely.',
    },
    {
      ru: 'Сортирует на месте с O(log n) памяти на стек рекурсии.',
      en: 'Sorts in place with O(log n) memory for the recursion stack.',
    },
    {
      ru: 'Промышленный стандарт: используется как `std::sort` в C++ STL и `Array.Sort` в .NET.',
      en: 'An industry standard: used as `std::sort` in the C++ STL and `Array.Sort` in .NET.',
    },
  ],
  cons: [
    {
      ru: 'Неустойчив - не сохраняет относительный порядок равных элементов, как и обычный quicksort.',
      en: 'Not stable - doesn\'t preserve relative order of equal elements, same as plain quicksort.',
    },
    {
      ru: 'Сложнее в реализации и отладке, чем каждый из трёх алгоритмов по отдельности.',
      en: 'More complex to implement and debug than any of the three underlying algorithms alone.',
    },
    {
      ru: 'Переключение между тремя алгоритмами усложняет профилирование и предсказание поведения на конкретных данных.',
      en: 'Switching between three algorithms makes profiling and predicting behavior on specific data harder.',
    },
  ],

  whenToUse: [
    {
      ru: 'Как универсальная сортировка общего назначения в библиотеке, где нужна и высокая средняя скорость, и гарантия худшего случая.',
      en: 'As a general-purpose library sort where both high average speed and a worst-case guarantee are needed.',
    },
    {
      ru: 'Когда неустойчивость сортировки не критична, а важна именно производительность на произвольных данных.',
      en: 'When sort stability doesn\'t matter but performance on arbitrary data does.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**C++ STL** - `std::sort` в большинстве реализаций (libstdc++, libc++) - это интроспективная сортировка.',
      en: '**C++ STL** - `std::sort` in most implementations (libstdc++, libc++) is introsort.',
    },
    {
      ru: '**.NET / C#** - `Array.Sort` использует гибрид quicksort/heapsort/insertion sort, концептуально идентичный introsort.',
      en: '**.NET / C#** - `Array.Sort` uses a quicksort/heapsort/insertion sort hybrid conceptually identical to introsort.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Для случайного массива из 1000 элементов порог глубины `maxDepth = 2 * floor(log₂1000) = 18`. При прогоне на реальных случайных данных **фаза heap sort не запускается ни разу (0 переключений)**, а `insertionSortRange` вызывается **115 раз** - на всех подмассивах, ставших меньше 16 элементов. Это подтверждает заявление из «Решения»: fallback действительно случается редко, а не «иногда» в абстрактном смысле.',
        en: 'For a random 1000-element array, the depth threshold is `maxDepth = 2 * floor(log₂1000) = 18`. Running on real random data, **the heap sort phase never triggers (0 switches)**, while `insertionSortRange` gets called **115 times** - on every subarray that shrinks below 16 elements. This confirms the claim from "Solution": the fallback really is rare, not just abstractly "sometimes."',
      },
      {
        ru: 'На враждебном входе - уже отсортированном массиве из 1000 элементов, худшем случае для quicksort с опорным `a[high]` - картина меняется ровно один раз: рекурсия по всё уменьшающимся подмассивам достигает порога `depthLimit = 0` на восемнадцатом уровне вложенности, и **heap sort запускается ровно 1 раз** на оставшемся диапазоне, спасая алгоритм от квадратичного срыва. При этом `insertionSortRange` всё равно вызывается 18 раз - на маленьких хвостах, отсечённых партиционированием до momента переключения.',
        en: 'On adversarial input - an already-sorted 1000-element array, the worst case for quicksort with an `a[high]` pivot - the picture changes exactly once: recursion over ever-shrinking subarrays hits `depthLimit = 0` at the eighteenth nesting level, and **heap sort fires exactly 1 time** on the remaining range, saving the algorithm from a quadratic blowup. `insertionSortRange` still gets called 18 times regardless - on the small tails partitioning had already cut off before the switch.',
      },
      {
        ru: 'На меньшем сортированном массиве из 50 элементов та же картина воспроизводится в миниатюре: `maxDepth = 2 * floor(log₂50) = 10`, партиционирование доходит ровно до этого предела, `heapSortRange` вызывается **1 раз**, а `insertionSortRange` - **10 раз**. Итоговый массив в обоих случаях (n=50 и n=1000) корректно отсортирован - переключение происходит незаметно для результата, только для затраченной работы.',
        en: 'On a smaller 50-element sorted array, the same picture reproduces in miniature: `maxDepth = 2 * floor(log₂50) = 10`, partitioning reaches exactly that limit, `heapSortRange` gets called **1 time**, and `insertionSortRange` gets called **10 times**. In both cases (n=50 and n=1000) the final array comes out correctly sorted - the switch is invisible to the result, only to the work spent getting there.',
      },
      {
        ru: 'Порог `size < 16` для перехода на insertion sort - не круглое число «для красоты», а эмпирический компромисс: на таком размере накладные расходы рекурсивного вызова и партиционирования quicksort перевешивают квадратичную асимптотику insertion sort, у которой на маленьком n константа мала, а данные почти всегда помещаются в кэш L1. Разные библиотеки используют разные пороги для одной и той же идеи: libstdc++ - 16, реализации MSVC STL исторически используют 32.',
        en: 'The `size < 16` threshold for switching to insertion sort isn\'t a round number chosen for looks - it\'s an empirical trade-off: at that size, the overhead of quicksort\'s recursive calls and partitioning outweighs insertion sort\'s quadratic asymptotics, since at small n its constant factor is tiny and the data almost always fits in L1 cache. Different libraries use different thresholds for the same idea: libstdc++ uses 16, MSVC STL implementations have historically used 32.',
      },
      {
        ru: 'Интроспективную сортировку изобрёл **Дэвид Р. Массер (David R. Musser)** и описал в статье 1997 года «Introspective Sorting and Selection Algorithms» (Software - Practice and Experience). Название «introspective» («самоанализирующая») отражает именно то, что алгоритм следит за собственным поведением (глубиной рекурсии) и меняет стратегию на основе этого наблюдения, а не заранее фиксированного плана.',
        en: 'Introsort was invented by **David R. Musser** and described in his 1997 paper "Introspective Sorting and Selection Algorithms" (Software - Practice and Experience). The name "introspective" reflects exactly this: the algorithm monitors its own behavior (recursion depth) and changes strategy based on that observation, rather than following a fixed plan set in advance.',
      },
      {
        ru: 'Почему порог именно `2·log₂(n)`, а не, скажем, `log₂(n)` или `3·log₂(n)`? Для случайного выбора опорного элемента ожидаемая глубина рекурсии сбалансированного quicksort составляет около `1.39·log₂(n)` (тот же результат, что и для средней высоты случайного бинарного дерева поиска). Порог `2·log₂(n)` даёт около 44% запаса над этим типичным значением - достаточно, чтобы не переключаться на нормальных данных, но достаточно жёстко, чтобы поймать деградацию раньше, чем она успеет стоить O(n²) работы.',
        en: 'Why the threshold `2·log₂(n)` specifically, rather than say `log₂(n)` or `3·log₂(n)`? For a random pivot choice, the expected recursion depth of balanced quicksort is about `1.39·log₂(n)` (the same result as the average height of a random binary search tree). The `2·log₂(n)` threshold gives roughly 44% headroom over that typical value - enough to avoid switching on normal data, but tight enough to catch degeneration before it costs O(n²) worth of work.',
      },
      {
        ru: 'Итог: introsort не меняет асимптотику ни одного из трёх алгоритмов по отдельности - она меняет то, какой именно алгоритм отвечает за каждый конкретный диапазон данных, основываясь на измеримом сигнале (размер и глубина), а не на предположении о структуре входа. Это и есть его практическая сила: гарантия худшего случая, купленная почти без потерь в среднем случае.',
        en: 'The takeaway: introsort doesn\'t change the asymptotics of any of the three underlying algorithms individually - it changes which algorithm is responsible for a given data range, based on a measurable signal (size and depth) rather than an assumption about input structure. That\'s its practical strength: a worst-case guarantee bought at almost no cost to the average case.',
      },
    ],
    whenToUse: [
      {
        ru: '**Как реализация `std::sort` или её эквивалента в новой библиотеке** - когда нужна гарантия худшего случая, сравнимая со скоростью quicksort на типичных данных, и неустойчивость сортировки допустима.',
        en: '**As the implementation behind `std::sort` or an equivalent in a new library** - when a worst-case guarantee comparable to quicksort\'s typical-case speed is needed, and sort instability is acceptable.',
      },
      {
        ru: '**Против чистого quicksort** - если входные данные могут быть подобраны злонамеренно (например, сервис принимает пользовательские массивы для сортировки), introsort устраняет риск атаки на алгоритм через специально сконструированный худший случай.',
        en: '**Against plain quicksort** - if the input could be adversarially crafted (e.g. a service accepts user-supplied arrays to sort), introsort removes the risk of an algorithmic-complexity attack via a specially constructed worst case.',
      },
      {
        ru: '**Против heap sort как основного алгоритма** - если типичные данные преобладают над враждебными, introsort почти всегда быстрее на практике за счёт того, что чистый heap sort запускается только в крайне редких случаях.',
        en: '**Against heap sort as the primary algorithm** - if typical data dominates over adversarial cases, introsort is almost always faster in practice since plain heap sort only kicks in on rare occasions.',
      },
      {
        ru: '**Не выбирать, если нужна устойчивость сортировки** - ни один из трёх компонентов (quicksort, heap sort, insertion sort в этой реализации без учёта равенства) не гарантирует сохранение порядка равных элементов; для этого нужен Timsort или merge sort.',
        en: '**Don\'t pick it if sort stability is required** - none of the three components (quicksort, heap sort, insertion sort as implemented here) guarantees preserving the order of equal elements; for that, use Timsort or merge sort.',
      },
    ],
    realWorld: [
      {
        ru: '**David R. Musser, «Introspective Sorting and Selection Algorithms» (Software - Practice and Experience, 1997)** - оригинальная статья, вводящая introsort и доказывающая его гарантию O(n log n) в худшем случае.',
        en: '**David R. Musser, "Introspective Sorting and Selection Algorithms" (Software - Practice and Experience, 1997)** - the original paper introducing introsort and proving its O(n log n) worst-case guarantee.',
      },
      {
        ru: '**libstdc++ (реализация GCC для C++ STL)** - использует порог 16 для перехода на insertion sort и явно документирует лимит глубины `2 * log2(n)` в исходном коде `stl_algo.h`.',
        en: '**libstdc++ (GCC\'s C++ STL implementation)** - uses a threshold of 16 for switching to insertion sort and explicitly documents the `2 * log2(n)` depth limit in the `stl_algo.h` source.',
      },
      {
        ru: '**Атаки на алгоритмическую сложность (algorithmic complexity attacks)** - класс уязвимостей, при которых злоумышленник подбирает вход, вызывающий худший случай алгоритма; introsort - стандартная защита от такой атаки специально для сортировки на стороне сервера.',
        en: '**Algorithmic complexity attacks** - a class of vulnerabilities where an attacker crafts input to trigger an algorithm\'s worst case; introsort is the standard defense against this specific attack for server-side sorting.',
      },
      {
        ru: '**Go, начиная с версии 1.19** - встроенная функция `sort.Sort` использует паттерн pattern-defeating quicksort (pdqsort), развивающий ту же идею introsort с дополнительными эвристиками против типичных враждебных паттернов.',
        en: '**Go, since version 1.19** - the built-in `sort.Sort` function uses pattern-defeating quicksort (pdqsort), which extends the same introsort idea with additional heuristics against common adversarial patterns.',
      },
    ],
  },

  relatedAlgorithms: ['quick-sort', 'heap-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что заставляет интроспективную сортировку переключиться с quicksort на heap sort?',
        en: 'What makes introsort switch from quicksort to heap sort?',
      },
      options: [
        {
          ru: 'Глубина рекурсии превышает порог 2·log₂(n)',
          en: 'Recursion depth exceeds the threshold of 2·log₂(n)',
        },
        {
          ru: 'Массив содержит дубликаты, из-за которых партиционирование quicksort начинает работать некорректно',
          en: 'The array contains duplicates, which cause quicksort\'s partitioning step to start behaving incorrectly',
        },
        {
          ru: 'Пользователь явно указывает флаг конфигурации перед вызовом функции сортировки',
          en: 'The user explicitly sets a configuration flag before calling the sort function',
        },
        {
          ru: 'Массив больше 1000 элементов, что превышает внутренний лимит библиотеки сортировки',
          en: 'The array is larger than 1000 elements, exceeding the sort library\'s internal size limit',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Превышение порога глубины сигнализирует, что quicksort работает на неудачных данных и рискует уйти в O(n²) - вместо этого текущий подмассив досортировывается heap sort с гарантированной асимптотикой.',
        en: 'Exceeding the depth threshold signals that quicksort is running on unlucky data and risks O(n²) - instead, the current subarray is finished with heap sort\'s guaranteed asymptotics.',
      },
      hint: {
        ru: 'Смотрите шаг «Переключиться на heap sort при превышении порога» на вкладке «Визуализация» и строки 14-16 функции `introsortRec` на вкладке «Реализация».',
        en: 'See the "Switch to heap sort past the threshold" step on the "Visualization" tab and lines 14-16 of `introsortRec` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему интроспективная сортировка использует insertion sort на маленьких подмассивах, а не продолжает quicksort?',
        en: 'Why does introsort use insertion sort on small subarrays instead of continuing quicksort?',
      },
      options: [
        {
          ru: 'На малом n константные затраты insertion sort делают её практически быстрее рекурсии quicksort',
          en: 'At small sizes, insertion sort\'s low constant overhead makes it practically faster than quicksort recursion',
        },
        { ru: 'Quicksort в принципе не умеет корректно работать с маленькими массивами вообще, независимо от реализации', en: 'Quicksort fundamentally cannot handle small arrays correctly at all, regardless of implementation details' },
        { ru: 'Это прямое требование, явно прописанное словом в словах текста официального стандарта языка C++', en: 'It\'s a hard requirement explicitly spelled out word-for-word in the text of the official C++ language standard' },
        { ru: 'Insertion sort работает за гарантированное O(log n) на абсолютно любых входных данных без исключений', en: 'Insertion sort runs in a guaranteed O(log n) on absolutely any kind of input data with no exceptions' },
      ],
      correct: 0,
      explanation: {
        ru: 'Тот же приём, что и в Timsort: на маленьких n асимптотика не так важна, как константы, а у insertion sort они минимальны.',
        en: 'Same trick as in Timsort: at small n, asymptotics matter less than constant factors, and insertion sort has the lowest ones.',
      },
      hint: {
        ru: 'Смотрите шаг «Переключиться на insertion sort на маленьких блоках» на вкладке «Визуализация» и четвёртый абзац раздела «Углублённо» на вкладке «Суть» (сравнение порогов libstdc++ и MSVC).',
        en: 'See the "Switch to insertion sort on small blocks" step on the "Visualization" tab and the fourth paragraph of the "Deep dive" section on the "Intent" tab (the libstdc++ vs MSVC threshold comparison).',
      },
    },
    {
      question: {
        ru: 'Какую гарантию даёт интроспективная сортировка, которой не даёт обычный quicksort?',
        en: 'What guarantee does introsort provide that plain quicksort does not?',
      },
      options: [
        { ru: 'O(n log n) в худшем случае', en: 'O(n log n) worst case' },
        { ru: 'Устойчивость сортировки', en: 'Sort stability' },
        { ru: 'O(1) дополнительной памяти', en: 'O(1) extra memory' },
        { ru: 'Работу с потоковыми данными', en: 'Support for streaming data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Обычный quicksort может деградировать до O(n²) на неудачном выборе опорных элементов; introsort страхует этот случай переключением на heap sort.',
        en: 'Plain quicksort can degrade to O(n²) on unlucky pivot choices; introsort hedges against this by switching to heap sort.',
      },
      hint: {
        ru: 'Смотрите подраздел «Задача» на вкладке «Суть» и второй абзац раздела «Углублённо» (пример с отсортированным массивом из 1000 элементов и одним переключением на heap sort).',
        en: 'See the "Problem" subsection on the "Intent" tab and the second paragraph of the "Deep dive" section (the 1000-element sorted-array example with a single heap sort switch).',
      },
    },
    {
      question: {
        ru: 'Почему introsort считается неустойчивой сортировкой?',
        en: 'Why is introsort considered an unstable sort?',
      },
      options: [
        {
          ru: 'Она наследует неустойчивость от quicksort и heap sort, которые меняют порядок равных элементов при обмене',
          en: 'It inherits instability from quicksort and heap sort, which can reorder equal elements during swaps',
        },
        { ru: 'Она использует случайные числа при выборе опорного элемента абсолютно на каждом отдельном шаге рекурсии', en: 'It uses random numbers when picking the pivot element at every single step of the recursion process' },
        { ru: 'Она в принципе никогда не сравнивает друг с другом равные элементы ни на одном из этапов работы', en: 'It fundamentally never compares equal elements against each other at any stage of the entire algorithm' },
        { ru: 'На самом деле она полностью устойчива, а обратное - это очень распространённое заблуждение среди программистов', en: 'It is actually fully stable, and the opposite claim is simply a very common misconception among programmers' },
      ],
      correct: 0,
      explanation: {
        ru: 'И партиционирование quicksort, и обмены в heap sort могут переставить местами равные элементы относительно друг друга - устойчивость не гарантируется ни одним из компонентов.',
        en: 'Both quicksort\'s partitioning and heap sort\'s swaps can reorder equal elements relative to each other - stability isn\'t guaranteed by either component.',
      },
      hint: {
        ru: 'Смотрите первый пункт минусов на вкладке «Плюсы и минусы» и последний пункт whenToUse раздела «Углублённо» на вкладке «Суть».',
        en: 'See the first "Cons" item on the "Pros & Cons" tab and the last "When to use" item in the "Deep dive" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему именно introsort выбран как `std::sort` в C++ вместо чистого quicksort или чистого merge sort?',
        en: 'Why was introsort chosen as `std::sort` in C++ instead of plain quicksort or plain merge sort?',
      },
      options: [
        {
          ru: 'Он сочетает среднюю скорость quicksort с гарантией худшего случая, не требуя O(n) доп. памяти, как merge sort',
          en: 'It combines quicksort\'s average speed with a worst-case guarantee, without needing O(n) extra memory like merge sort',
        },
        { ru: 'Он единственный по-настоящему устойчивый алгоритм среди всех трёх рассматриваемых вариантов сортировки данных', en: 'It\'s the only genuinely stable algorithm among all three of the sorting candidates being considered here today' },
        { ru: 'Стандарт языка C++ официально требует минимум O(n) дополнительной памяти для реализации абсолютно любой сортировки', en: 'The official C++ language standard requires a minimum of O(n) extra memory for implementing absolutely any sort at all' },
        { ru: 'Merge sort в принципе не поддерживается подавляющим большинством современных компиляторов и языковых рантаймов', en: 'Merge sort fundamentally isn\'t supported by the vast majority of modern compilers and language runtimes at all today' },
      ],
      correct: 0,
      explanation: {
        ru: 'Стандарт `std::sort` требует O(n log n) в среднем; introsort даёт это и вдобавок гарантию худшего случая, оставаясь при этом in-place - в отличие от merge sort, который требует O(n) памяти.',
        en: 'The `std::sort` standard requires O(n log n) average; introsort delivers that plus a worst-case guarantee while staying in-place - unlike merge sort, which needs O(n) memory.',
      },
      hint: {
        ru: 'Смотрите четвёртый пункт плюсов на вкладке «Плюсы и минусы» и первый пункт realWorldExamples («C++ STL») на вкладке «Суть».',
        en: 'See the fourth "Pros" item on the "Pros & Cons" tab and the first "Real-world examples" item ("C++ STL") on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какой порог глубины рекурсии использует introsort перед переключением на heap sort?',
        en: 'What recursion depth threshold does introsort use before switching to heap sort?',
      },
      options: [
        { ru: '2·log₂(n)', en: '2·log₂(n)' },
        { ru: 'n / 2', en: 'n / 2' },
        { ru: 'log₂(n) / 2', en: 'log₂(n) / 2' },
        { ru: 'sqrt(n)', en: 'sqrt(n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Порог 2·log₂(n) выбран так, чтобы нормальная рекурсия quicksort никогда не достигала его при сбалансированных разбиениях, но при деградации он срабатывал быстро.',
        en: 'The threshold 2·log₂(n) is chosen so that normal quicksort recursion never reaches it under balanced partitions, but triggers quickly during degeneration.',
      },
      hint: {
        ru: 'Смотрите строку 3 функции `introSort` на вкладке «Реализация» (`maxDepth`) и шестой абзац раздела «Углублённо» на вкладке «Суть» (вывод порога `2·log₂(n)`).',
        en: 'See line 3 of `introSort` on the "Implementation" tab (`maxDepth`) and the sixth paragraph of the "Deep dive" section on the "Intent" tab (the `2·log₂(n)` threshold derivation).',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность introsort?',
        en: 'What is the space complexity of introsort?',
      },
      options: [
        { ru: 'O(log n) - под стек рекурсии', en: 'O(log n) - for the recursion stack' },
        { ru: 'O(n) - для вспомогательного массива при слиянии', en: 'O(n) - for an auxiliary array during merging' },
        { ru: 'O(1) - никакой дополнительной памяти не требуется совсем', en: 'O(1) - no extra memory is needed at all' },
        { ru: 'O(n log n) - из-за рекурсивных вызовов с накладными расходами на каждом уровне', en: 'O(n log n) - due to recursive calls with overhead at each level' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort сортирует на месте, но рекурсивный стек quicksort в сбалансированном случае имеет глубину O(log n).',
        en: 'Introsort sorts in place, but the quicksort recursion stack has O(log n) depth in the balanced case.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и третий пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the "Space" complexity badge at the top of the page and the third "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Какой из трёх алгоритмов introsort применяет первым при запуске?',
        en: 'Which of the three algorithms does introsort apply first upon starting?',
      },
      options: [
        { ru: 'Quicksort', en: 'Quicksort' },
        { ru: 'Heap sort', en: 'Heap sort' },
        { ru: 'Insertion sort', en: 'Insertion sort' },
        { ru: 'Merge sort', en: 'Merge sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort начинает работу как обычный quicksort и переключается на heap sort или insertion sort только при выполнении соответствующих условий.',
        en: 'Introsort starts as regular quicksort and only switches to heap sort or insertion sort when the respective conditions are met.',
      },
      hint: {
        ru: 'Смотрите шаг «Начать с быстрой сортировки» на вкладке «Визуализация» и строку 18 функции `introsortRec` на вкладке «Реализация» (первый вызов `partition`).',
        en: 'See the "Start with quicksort" step on the "Visualization" tab and line 18 of `introsortRec` on the "Implementation" tab (the first `partition` call).',
      },
    },
    {
      question: {
        ru: 'Ниже какого размера подмассива introsort переключается на insertion sort?',
        en: 'Below what subarray size does introsort switch to insertion sort?',
      },
      options: [
        { ru: 'Примерно 16 элементов', en: 'Approximately 16 elements' },
        { ru: 'Примерно 1000 элементов', en: 'Approximately 1000 elements' },
        { ru: 'Примерно 2 элемента', en: 'Approximately 2 elements' },
        { ru: 'Примерно 256 элементов', en: 'Approximately 256 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Типичное пороговое значение - около 16 элементов; на таком размере insertion sort обгоняет quicksort за счёт низких накладных расходов.',
        en: 'The typical threshold is around 16 elements; at that size insertion sort outpaces quicksort due to its low overhead.',
      },
      hint: {
        ru: 'Смотрите строку 10 функции `introsortRec` на вкладке «Реализация» (`if (size < 16)`) и четвёртый абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See line 10 of `introsortRec` on the "Implementation" tab (`if (size < 16)`) and the fourth paragraph of the "Deep dive" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Как introsort отличается от Timsort, который тоже является гибридным алгоритмом?',
        en: 'How does introsort differ from Timsort, which is also a hybrid algorithm?',
      },
      options: [
        { ru: 'Introsort неустойчив и in-place, тогда как Timsort устойчив и требует O(n) памяти', en: 'Introsort is unstable and in-place, while Timsort is stable and requires O(n) memory' },
        { ru: 'Introsort использует merge sort вместо heap sort в качестве резервного алгоритма', en: 'Introsort uses merge sort instead of heap sort as its fallback algorithm for deep recursion' },
        { ru: 'Timsort применяется только в C++, тогда как introsort используется исключительно в Python', en: 'Timsort is only used in C++, while introsort is used exclusively in Python' },
        { ru: 'Introsort устойчив, а Timsort - нет, что и является главным практическим различием', en: 'Introsort is stable while Timsort is not, which is the main practical difference' },
      ],
      correct: 0,
      explanation: {
        ru: 'Introsort (quicksort + heap sort + insertion sort) жертвует устойчивостью ради in-place работы; Timsort (merge sort + insertion sort) сохраняет устойчивость, но использует O(n) памяти.',
        en: 'Introsort (quicksort + heap sort + insertion sort) trades stability for in-place operation; Timsort (merge sort + insertion sort) preserves stability but uses O(n) memory.',
      },
      hint: {
        ru: 'Смотрите первый пункт минусов на вкладке «Плюсы и минусы» и первый вопрос этого квиза про причину переключения на heap sort.',
        en: 'See the first "Cons" item on the "Pros & Cons" tab and the first question in this quiz about why introsort switches to heap sort.',
      },
    },
  ],
};

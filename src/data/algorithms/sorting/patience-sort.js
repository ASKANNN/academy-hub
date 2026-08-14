export const patienceSort = {
  slug: 'patience-sort',
  category: 'sorting',
  name: { ru: 'Patience Sort', en: 'Patience Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['comparison', 'not-in-place', 'unstable'],

  intent: {
    ru: 'Пасьянсная сортировка вдохновлена карточным пасьянсом «солитёр»: карты раскладываются по стопкам так, чтобы верх каждой стопки не убывал сверху вниз, а затем стопки сливаются как в merge sort - попутно алгоритм даёт изящный способ найти длиннейшую возрастающую подпоследовательность.',
    en: 'Patience sort is inspired by the solitaire card game: cards are dealt into piles so each pile\'s top never decreases as cards are added, then the piles are merged like in merge sort - as a side effect, the algorithm gives an elegant way to find the longest increasing subsequence.',
  },

  problem: {
    ru: 'Многие алгоритмы сортировки сравнением требуют либо явного разбиения (quicksort), либо явного слияния заранее упорядоченных половин (merge sort). Хочется алгоритма, который бы строил упорядоченные группы «на лету», раскладывая элементы по ходу единственного прохода, а не заранее зная, как делить массив.',
    en: 'Many comparison sorts require either explicit partitioning (quicksort) or explicitly merging pre-split halves (merge sort). What\'s wanted is an algorithm that builds ordered groups "on the fly" while dealing elements in a single pass, rather than deciding upfront how to split the array.',
  },

  solution: {
    ru: 'Элементы по очереди «раскладываются» на стопки: каждая карта кладётся на первую слева стопку, чей верх больше или равен ей (поиск такой стопки - бинарный, O(log n)); если подходящей стопки нет, начинается новая стопка. В результате получается несколько стопок, каждая из которых по построению убывает сверху вниз. Финальный шаг - слить эти стопки, как k отсортированных списков, многократно забирая минимальный верхний элемент среди всех стопок (эффективно - через кучу).',
    en: 'Elements are "dealt" one by one onto piles: each card goes on the leftmost pile whose top is greater than or equal to it (finding that pile is a binary search, O(log n)); if no pile fits, a new pile is started. This produces several piles, each decreasing top-to-bottom by construction. The final step merges these piles like k sorted lists, repeatedly taking the minimum top element across all piles (efficiently, via a heap).',
  },

  steps: [
    {
      title: { ru: 'Взять следующую карту', en: 'Take the next card' },
      explanation: {
        ru: 'Пройти по входному массиву слева направо, беря по одному элементу за раз.',
        en: 'Walk the input array left to right, taking one element at a time.',
      },
    },
    {
      title: { ru: 'Найти подходящую стопку', en: 'Find a fitting pile' },
      explanation: {
        ru: 'Бинарным поиском найти самую левую стопку, чей текущий верхний элемент больше либо равен взятой карте.',
        en: 'Binary-search for the leftmost pile whose current top element is greater than or equal to the card just taken.',
      },
    },
    {
      title: { ru: 'Положить карту или начать стопку', en: 'Place the card or start a pile' },
      explanation: {
        ru: 'Если подходящая стопка найдена - положить карту на неё; иначе создать новую стопку справа от всех.',
        en: 'If a fitting pile is found, place the card on it; otherwise create a new pile to the right of all existing ones.',
      },
    },
    {
      title: { ru: 'Повторить для всех карт', en: 'Repeat for every card' },
      explanation: {
        ru: 'Продолжать раскладывать карты, пока весь исходный массив не будет разложен по стопкам.',
        en: 'Keep dealing until the entire input array has been placed onto piles.',
      },
    },
    {
      title: { ru: 'Слить стопки', en: 'Merge the piles' },
      explanation: {
        ru: 'Многократно брать минимальный верхний элемент среди всех непустых стопок и добавлять его в результат, пока все стопки не опустеют.',
        en: 'Repeatedly take the minimum top element among all non-empty piles and append it to the result until every pile is empty.',
      },
    },
  ],
  stepBreakpoints: [3, 23, 26, 29],

  implementation: {
    javascript: `function patienceSort(arr) {
  const n = arr.length;
  if (n === 0) return [];

  const piles = [];
  for (let i = 0; i < n; i++) {
    const value = arr[i];
    let lo = 0, hi = piles.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (piles[mid][piles[mid].length - 1] >= value) hi = mid;
      else lo = mid + 1;
    }
    if (lo === piles.length) piles.push([value]);
    else piles[lo].push(value);
  }

  const heap = piles.map((_, idx) => idx);
  for (let i = (heap.length >> 1) - 1; i >= 0; i--) siftDown(piles, heap, i);

  const output = new Array(n);
  for (let outPos = 0; outPos < n; outPos++) {
    const pileIdx = heap[0];
    output[outPos] = piles[pileIdx].pop();
    if (piles[pileIdx].length === 0) {
      heap[0] = heap[heap.length - 1];
      heap.pop();
    }
    if (heap.length > 0) siftDown(piles, heap, 0);
  }
  return output;
}

function siftDown(piles, heap, i) {
  const size = heap.length;
  const top = (p) => piles[heap[p]][piles[heap[p]].length - 1];
  while (true) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < size && top(left) < top(smallest)) smallest = left;
    if (right < size && top(right) < top(smallest)) smallest = right;
    if (smallest === i) break;
    [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
    i = smallest;
  }
}`,
    python: `def patience_sort(arr):
    n = len(arr)
    if n == 0:
        return []

    piles = []
    for value in arr:
        lo, hi = 0, len(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            if piles[mid][-1] >= value:
                hi = mid
            else:
                lo = mid + 1
        if lo == len(piles):
            piles.append([value])
        else:
            piles[lo].append(value)

    heap = list(range(len(piles)))
    for i in range(len(heap) // 2 - 1, -1, -1):
        sift_down(piles, heap, i)

    output = []
    for _ in range(n):
        pile_idx = heap[0]
        output.append(piles[pile_idx].pop())
        if not piles[pile_idx]:
            heap[0] = heap[-1]
            heap.pop()
        if heap:
            sift_down(piles, heap, 0)
    return output


def sift_down(piles, heap, i):
    size = len(heap)

    def top(p):
        return piles[heap[p]][-1]

    while True:
        smallest = i
        left = 2 * i + 1
        right = 2 * i + 2
        if left < size and top(left) < top(smallest):
            smallest = left
        if right < size and top(right) < top(smallest):
            smallest = right
        if smallest == i:
            break
        heap[i], heap[smallest] = heap[smallest], heap[i]
        i = smallest`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`patienceSort` координирует две фазы: раскладку карт по стопкам и слияние стопок через кучу. Вспомогательная `siftDown` объявлена отдельно ниже.',
          en: '`patienceSort` coordinates two phases: dealing cards onto piles and merging the piles via a heap. The helper `siftDown` is declared separately below.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Длина и пустой массив', en: 'Length and the empty-array guard' },
        explanation: {
          ru: '`n` сохраняется один раз; для пустого входа сразу возвращается пустой массив - дальше по коду можно не думать про n = 0.',
          en: '`n` is cached once; an empty input returns an empty array immediately - the rest of the code doesn\'t need to worry about n = 0.',
        },
      },
      {
        lines: [5, 8],
        title: { ru: 'Начало раскладки', en: 'Start of dealing' },
        explanation: {
          ru: '`piles` - массив стопок (каждая стопка - обычный массив). Цикл берёт очередное `value` из входа и готовит границы `lo`/`hi` для бинарного поиска по всем текущим стопкам.',
          en: '`piles` is an array of piles (each pile is a plain array). The loop takes the next `value` from the input and sets up `lo`/`hi` bounds for a binary search over the current piles.',
        },
      },
      {
        lines: [9, 13],
        title: { ru: 'Бинарный поиск стопки', en: 'Binary-searching for a pile' },
        explanation: {
          ru: 'Верхние элементы стопок всегда образуют неубывающую последовательность слева направо (иначе карта легла бы раньше), поэтому бинарный поиск корректен: сужение `hi = mid` при `top >= value` находит самую левую подходящую стопку за O(log k).',
          en: 'Pile tops always form a non-decreasing sequence left to right (otherwise the card would have landed earlier), so the binary search is valid: narrowing `hi = mid` when `top >= value` finds the leftmost fitting pile in O(log k).',
        },
      },
      {
        lines: [14, 15],
        title: { ru: 'Положить карту или начать стопку', en: 'Placing the card or starting a pile' },
        explanation: {
          ru: 'Если поиск дошёл до `piles.length` (ни одна стопка не подошла), создаётся новая стопка; иначе карта кладётся на верх найденной стопки `piles[lo]`.',
          en: 'If the search reached `piles.length` (no pile fit), a new pile is created; otherwise the card is placed on top of the found pile `piles[lo]`.',
        },
      },
      {
        lines: [18, 19],
        title: { ru: 'Построение кучи стопок', en: 'Building the pile heap' },
        explanation: {
          ru: '`heap` хранит индексы стопок, упорядоченные как min-heap по значению верхнего элемента каждой стопки. Поскольку верхние элементы уже отсортированы по возрастанию (см. шаг про бинарный поиск), построение кучи не делает ни одного обмена - массив индексов `[0, 1, 2, ...]` уже валидная куча.',
          en: '`heap` holds pile indices, ordered as a min-heap by each pile\'s top value. Since the tops are already sorted ascending (see the binary-search step), building the heap performs zero swaps - the index array `[0, 1, 2, ...]` is already a valid heap.',
        },
      },
      {
        lines: [21, 24],
        title: { ru: 'Извлечение минимума', en: 'Extracting the minimum' },
        explanation: {
          ru: 'На каждой итерации `heap[0]` указывает на стопку с наименьшим верхним элементом среди всех - её верхняя карта снимается (`.pop()`) и записывается в `output[outPos]`.',
          en: 'On each iteration, `heap[0]` points to the pile with the smallest top element overall - its top card is removed (`.pop()`) and written into `output[outPos]`.',
        },
      },
      {
        lines: [25, 28],
        title: { ru: 'Удаление опустевшей стопки', en: 'Removing an emptied pile' },
        explanation: {
          ru: 'Если снятая карта была последней в стопке, эта стопка больше не участвует в слиянии: её индекс в куче заменяется последним элементом кучи, а куча сжимается на один - тот же приём «swap with last, shrink», что и в heap sort.',
          en: 'If the removed card was the pile\'s last, that pile no longer takes part in the merge: its heap slot is overwritten with the heap\'s last element, and the heap shrinks by one - the same "swap with last, shrink" trick used in heap sort.',
        },
      },
      {
        lines: [29],
        title: { ru: 'Восстановление свойства кучи', en: 'Restoring the heap property' },
        explanation: {
          ru: 'После каждого извлечения новый корень почти наверняка нарушает порядок кучи - `siftDown` восстанавливает его за O(log k), где k - число оставшихся непустых стопок.',
          en: 'After every extraction the new root almost certainly breaks the heap order - `siftDown` restores it in O(log k), where k is the number of piles still remaining.',
        },
      },
      {
        lines: [31],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После n извлечений `output` полностью заполнен по возрастанию.',
          en: 'After n extractions, `output` is fully filled in ascending order.',
        },
      },
      {
        lines: [34, 36],
        title: { ru: 'Сигнатура siftDown и helper top', en: 'The siftDown signature and the top helper' },
        explanation: {
          ru: '`siftDown(piles, heap, i)` просеивает элемент кучи `heap[i]` вниз. `top(p)` - маленький helper: верхний элемент стопки, на которую указывает `heap[p]` - используется вместо прямого сравнения индексов, потому что куча хранит индексы стопок, а не сами значения.',
          en: '`siftDown(piles, heap, i)` sifts the heap element `heap[i]` down. `top(p)` is a small helper: the top element of the pile that `heap[p]` points to - needed because the heap stores pile indices, not the values themselves.',
        },
      },
      {
        lines: [37, 43],
        title: { ru: 'Поиск меньшего из детей', en: 'Finding the smaller child' },
        explanation: {
          ru: 'Цикл `while (true)` ищет среди `i` и его детей `left`/`right` того, у чьей стопки верхний элемент меньше всех - ровно то же сравнение по `left < size`/`right < size`, что и в heap sort, только с обратным знаком (min-heap вместо max-heap).',
          en: 'The `while (true)` loop finds, among `i` and its children `left`/`right`, the one whose pile top is smallest - the same `left < size`/`right < size` guards as heap sort, just with the comparison flipped (min-heap instead of max-heap).',
        },
      },
      {
        lines: [44, 45],
        title: { ru: 'Обмен и продолжение', en: 'Swapping and continuing' },
        explanation: {
          ru: 'Если `smallest !== i`, элементы кучи меняются местами и просеивание продолжается с новой позиции - это сделано итеративным циклом, а не рекурсией, чтобы глубина стека не зависела от числа стопок.',
          en: 'If `smallest !== i`, the heap slots are swapped and sifting continues from the new position - written as an iterative loop rather than recursion so the call-stack depth doesn\'t depend on the number of piles.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`patience_sort` координирует раскладку и слияние через кучу, как и JS-версия.',
          en: '`patience_sort` coordinates dealing and the heap-based merge, same as the JS version.',
        },
      },
      {
        lines: [2, 4],
        title: { ru: 'Длина и пустой список', en: 'Length and the empty-list guard' },
        explanation: {
          ru: '`n` кешируется один раз; пустой вход сразу возвращает пустой список.',
          en: '`n` is cached once; an empty input returns an empty list right away.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Начало раскладки', en: 'Start of dealing' },
        explanation: {
          ru: '`piles` - список стопок. Для каждого `value` из `arr` вычисляются границы `lo`, `hi` бинарного поиска по текущим стопкам.',
          en: '`piles` is the list of piles. For each `value` in `arr`, the `lo`, `hi` bounds of a binary search over the current piles are set up.',
        },
      },
      {
        lines: [9, 14],
        title: { ru: 'Бинарный поиск стопки', en: 'Binary-searching for a pile' },
        explanation: {
          ru: 'Идентично JS-версии: верхние элементы стопок отсортированы по возрастанию, поэтому сужение `hi = mid` при `piles[mid][-1] >= value` корректно находит самую левую подходящую стопку.',
          en: 'Identical to the JS version: pile tops are sorted ascending, so narrowing `hi = mid` when `piles[mid][-1] >= value` correctly finds the leftmost fitting pile.',
        },
      },
      {
        lines: [15, 18],
        title: { ru: 'Положить карту или начать стопку', en: 'Placing the card or starting a pile' },
        explanation: {
          ru: '`lo == len(piles)` означает «ни одна стопка не подошла» - создаётся новая; иначе карта добавляется на верх `piles[lo]`.',
          en: '`lo == len(piles)` means "no pile fit" - a new one is created; otherwise the card is appended on top of `piles[lo]`.',
        },
      },
      {
        lines: [20, 22],
        title: { ru: 'Построение кучи стопок', en: 'Building the pile heap' },
        explanation: {
          ru: '`heap` - список индексов стопок `[0, 1, ..., len(piles) - 1]`. Поскольку верхние элементы стопок уже отсортированы по возрастанию, цикл построения кучи фактически не делает обменов, но код остаётся общим и не полагается на этот факт явно.',
          en: '`heap` is the list of pile indices `[0, 1, ..., len(piles) - 1]`. Since pile tops are already sorted ascending, the heap-build loop performs no real swaps in practice, but the code stays generic and doesn\'t rely on that fact explicitly.',
        },
      },
      {
        lines: [24, 27],
        title: { ru: 'Извлечение минимума', en: 'Extracting the minimum' },
        explanation: {
          ru: '`heap[0]` - стопка с наименьшим верхним элементом. Её верхняя карта снимается через `.pop()` и добавляется в `output`.',
          en: '`heap[0]` is the pile with the smallest top element. Its top card is removed via `.pop()` and appended to `output`.',
        },
      },
      {
        lines: [28, 30],
        title: { ru: 'Удаление опустевшей стопки', en: 'Removing an emptied pile' },
        explanation: {
          ru: 'Если `piles[pile_idx]` стала пустой, её слот в куче заменяется последним элементом кучи, а сама куча укорачивается на один.',
          en: 'If `piles[pile_idx]` became empty, its heap slot is overwritten with the heap\'s last element and the heap shrinks by one.',
        },
      },
      {
        lines: [31, 32],
        title: { ru: 'Восстановление свойства кучи', en: 'Restoring the heap property' },
        explanation: {
          ru: 'Пока в куче остались элементы, `sift_down` восстанавливает порядок для нового корня.',
          en: 'As long as the heap is non-empty, `sift_down` restores the order for the new root.',
        },
      },
      {
        lines: [33],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После n извлечений `output` полностью отсортирован.',
          en: 'After n extractions, `output` is fully sorted.',
        },
      },
      {
        lines: [36, 37],
        title: { ru: 'Сигнатура sift_down', en: 'The sift_down signature' },
        explanation: {
          ru: '`sift_down(piles, heap, i)` принимает те же параметры, что и JS-версия; `size` кешируется один раз.',
          en: '`sift_down(piles, heap, i)` takes the same parameters as the JS version; `size` is cached once.',
        },
      },
      {
        lines: [39, 40],
        title: { ru: 'Вложенный helper top', en: 'The nested top helper' },
        explanation: {
          ru: '`top(p)` - вложенная функция, замыкающаяся над `piles` и `heap`, возвращает верхний элемент стопки под индексом `heap[p]` - используется вместо прямого сравнения индексов кучи.',
          en: '`top(p)` is a nested function closing over `piles` and `heap`, returning the top element of the pile at index `heap[p]` - used instead of comparing heap indices directly.',
        },
      },
      {
        lines: [42, 49],
        title: { ru: 'Поиск меньшего из детей', en: 'Finding the smaller child' },
        explanation: {
          ru: '`while True` ищет среди `i` и его детей `left`/`right` того, чья стопка имеет наименьший верхний элемент - те же проверки границ `left < size`/`right < size`, что и в JS-версии.',
          en: '`while True` finds, among `i` and its children `left`/`right`, the one whose pile has the smallest top element - the same `left < size`/`right < size` bounds checks as the JS version.',
        },
      },
      {
        lines: [50, 53],
        title: { ru: 'Обмен и продолжение', en: 'Swapping and continuing' },
        explanation: {
          ru: 'Если `smallest == i`, порядок кучи уже верен и цикл прерывается; иначе элементы кучи меняются местами кортежным присваиванием, и просеивание продолжается с позиции `smallest`.',
          en: 'If `smallest == i`, the heap order already holds and the loop breaks; otherwise the heap slots are swapped via tuple assignment, and sifting continues from position `smallest`.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Побочный продукт алгоритма - число стопок равно длине самой длинной строго убывающей подпоследовательности сверху вниз, что даёт основу для эффективного O(n log n) поиска LIS (longest increasing subsequence).',
      en: 'A side effect of the algorithm: the number of piles equals the length of the longest strictly decreasing top-to-bottom run, giving the basis for an efficient O(n log n) longest-increasing-subsequence (LIS) algorithm.',
    },
    {
      ru: 'Гарантированное O(n log n) без худшего случая O(n²), в отличие от quicksort.',
      en: 'Guaranteed O(n log n) with no O(n²) worst case, unlike quicksort.',
    },
    {
      ru: 'Естественно адаптивен: на уже отсортированном массиве образуется всего одна стопка, и слияние тривиально.',
      en: 'Naturally adaptive: on an already sorted array, only one pile forms, and merging is trivial.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти под стопки - не сортирует на месте.',
      en: 'Needs O(n) extra memory for the piles - doesn\'t sort in place.',
    },
    {
      ru: 'Неустойчив: относительный порядок равных элементов из разных стопок при слиянии не гарантируется.',
      en: 'Unstable: the relative order of equal elements coming from different piles isn\'t guaranteed during the merge.',
    },
    {
      ru: 'На практике медленнее сортировок с лучшей локальностью памяти, таких как quicksort или Timsort, из-за большого числа отдельных списков-стопок.',
      en: 'In practice slower than sorts with better memory locality, such as quicksort or Timsort, due to the many separate pile lists.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда наряду с сортировкой нужна длиннейшая возрастающая подпоследовательность - пасьянсная сортировка решает обе задачи по сути одним алгоритмом.',
      en: 'When the longest increasing subsequence is needed alongside sorting - patience sort essentially solves both with one algorithm.',
    },
    {
      ru: 'Как наглядная демонстрация связи между карточными играми, жадными стратегиями и гарантией O(n log n) - популярна в учебных курсах по анализу алгоритмов.',
      en: 'As a vivid demonstration of the connection between card games, greedy strategies, and an O(n log n) guarantee - popular in algorithm-analysis courses.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Утилита `git blame`/поиск наименьшего diff в системах контроля версий** использует вариант LIS, вычислимый через раскладывание по стопкам, для нахождения минимального набора изменений между версиями файла.',
      en: '**`git blame` / diff-minimizing tools in version control systems** use a variant of LIS, computable via pile-dealing, to find the minimal set of changes between file versions.',
    },
    {
      ru: '**Задачи на анализ последовательностей** (биоинформатика, финансовые временные ряды), где нужен эффективный поиск наибольшей возрастающей подпоследовательности значений.',
      en: '**Sequence-analysis problems** (bioinformatics, financial time series), where an efficient search for the longest increasing subsequence of values is needed.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проследим раскладку на конкретном массиве `[6, 3, 5, 1, 8, 2, 7, 4]` (n = 8). Карта 6 открывает стопку 1. Карта 3 находит подходящую стопку 1 (верх 6 ≥ 3) и ложится на неё. Карта 5 не подходит ни одной стопке (верх стопки 1 теперь 3 < 5) - открывается стопка 2. После всех восьми карт получаются три стопки: `[6,3,1]`, `[5,2]`, `[8,7,4]` с верхними элементами 1, 2, 4. Три стопки - и действительно, длиннейшая возрастающая подпоследовательность входа (например, `3, 5, 8` или `1, 2, 7`) имеет длину ровно **3**.',
        en: 'Let\'s trace dealing on a concrete array `[6, 3, 5, 1, 8, 2, 7, 4]` (n = 8). Card 6 opens pile 1. Card 3 fits pile 1 (top 6 ≥ 3) and lands on it. Card 5 fits no pile (pile 1\'s top is now 3 < 5) - pile 2 opens. After all eight cards, three piles remain: `[6,3,1]`, `[5,2]`, `[8,7,4]`, with tops 1, 2, 4. Three piles - and indeed the input\'s longest increasing subsequence (e.g. `3, 5, 8` or `1, 2, 7`) has length exactly **3**.',
      },
      {
        ru: 'Раскладка стоит O(n log n): для каждой из n карт бинарный поиск идёт по массиву стопок длиной до k (текущее число стопок, k ≤ n), то есть O(log k) на карту. В худшем случае, когда вход отсортирован по убыванию, каждая новая карта меньше верха любой стопки - подходящей не находится, и открывается новая стопка на каждом шаге: итог - n стопок по одному элементу.',
        en: 'Dealing costs O(n log n): for each of the n cards, the binary search scans a pile array of length up to k (the current pile count, k ≤ n), so O(log k) per card. In the worst case, when the input is sorted descending, every new card is smaller than every pile\'s top - nothing fits, and a new pile opens on every step: the result is n piles of one element each.',
      },
      {
        ru: 'Слияние стопок реализовано через min-heap индексов стопок, а не наивным линейным перебором всех стопок на каждый выходной элемент. Разница принципиальна: линейный перебор стоил бы O(k) на элемент вывода, то есть O(n·k) суммарно - при n стопках (худший случай раскладки, вход по убыванию) это выродилось бы в O(n²). Куча же даёт O(log k) на извлечение и восстановление порядка, то есть честные O(n log n) при любом числе стопок.',
        en: 'The pile merge is implemented via a min-heap of pile indices, not a naive linear scan of every pile per output element. The difference matters: a linear scan would cost O(k) per output element, O(n·k) in total - with n piles (the worst-case deal, a descending input), that degrades to O(n²). The heap instead costs O(log k) per extraction and re-sift, giving an honest O(n log n) regardless of the pile count.',
      },
      {
        ru: 'На примере из первого абзаца слияние 8 элементов из 3 стопок через кучу делает всего **4 реальных обмена** внутри `siftDown` (по одному при выводе каждого из первых четырёх элементов, пока в куче остаются 2-3 стопки) - остальные 4 извлечения не требуют перестановок, поскольку куча к этому моменту уже мала (1-2 стопки). Построение самой кучи перед слиянием не делает ни одного обмена: верхние элементы стопок `1, 2, 4` уже отсортированы по возрастанию силой самого инварианта бинарного поиска, поэтому массив индексов `[0, 1, 2]` - готовая min-heap без какой-либо предобработки.',
        en: 'On the example from the first paragraph, merging the 8 elements from 3 piles via the heap performs only **4 real swaps** inside `siftDown` (one for each of the first four outputs, while 2-3 piles remain in the heap) - the remaining 4 extractions need no swaps, since the heap is already small (1-2 piles) by then. Building the heap itself before merging performs zero swaps: the pile tops `1, 2, 4` are already sorted ascending purely from the binary-search invariant, so the index array `[0, 1, 2]` is a ready-made min-heap with no preprocessing needed.',
      },
      {
        ru: 'Эта пара наблюдений - что построение кучи почти всегда бесплатно, а слияние ограничено O(n log n) даже в худшем случае - и даёт итоговую гарантию алгоритма: раскладка O(n log n) плюс слияние O(n log n) равно O(n log n) суммарно, без скрытого квадратичного члена, который был бы у наивного линейного слияния.',
        en: 'This pair of observations - that building the heap is almost always free, and merging is bounded by O(n log n) even in the worst case - is exactly what gives the algorithm its overall guarantee: O(n log n) dealing plus O(n log n) merging equals O(n log n) total, with no hidden quadratic term such as a naive linear-scan merge would introduce.',
      },
      {
        ru: 'Связь числа стопок с длиной LIS - не совпадение, а прямое следствие **теоремы Дилворта** (Dilworth, 1950): в любом частичном порядке минимальное число цепей, покрывающих все элементы, равно максимальному размеру антицепи. Здесь «цепь» - убывающая сверху вниз стопка (образует возрастающую подпоследовательность при чтении снизу вверх), а «антицепь» - множество элементов, никакие два из которых не сравнимы в порядке «меньше и левее» - то есть возрастающая подпоследовательность. Число стопок при жадной раскладке (класть карту на первую подходящую) минимально по построению, поэтому оно и равно длине LIS.',
        en: 'The link between pile count and LIS length isn\'t a coincidence - it\'s a direct consequence of **Dilworth\'s theorem** (Dilworth, 1950): in any partial order, the minimum number of chains covering all elements equals the maximum size of an antichain. Here, a "chain" is a top-to-bottom decreasing pile (forming an increasing subsequence when read bottom-up), and an "antichain" is a set of elements no two of which are comparable under "smaller and further right" - i.e., an increasing subsequence. The pile count under the greedy rule (place each card on the first fitting pile) is minimal by construction, which is exactly why it equals the LIS length.',
      },
      {
        ru: 'Карточный пасьянс, давший алгоритму имя (**«patience»** - британский синоним слова «solitaire»), был математически проанализирован **К. Л. Мэллоуcом (C. L. Mallows)** в статье 1962 года о статистике числа стопок при случайной раскладке карт. Алгоритмический вариант с бинарным поиском для нахождения LIS за O(n log n) и его связь со случайными перестановками подробно разобраны в статье **Дэвида Олдоса и Перси Дьяконписа (David Aldous, Persi Diaconis), «Longest increasing subsequences: from patience sorting to the Baik-Deift-Johansson theorem»** (Bulletin of the AMS, 1999).',
        en: 'The solitaire game that gave the algorithm its name (**"patience"** is British English for "solitaire") was mathematically analyzed by **C. L. Mallows** in a 1962 paper on the statistics of the pile count under random dealing. The algorithmic O(n log n) LIS variant using binary search, and its connection to random permutations, is worked out in **David Aldous and Persi Diaconis\'s "Longest increasing subsequences: from patience sorting to the Baik-Deift-Johansson theorem"** (Bulletin of the AMS, 1999).',
      },
      {
        ru: 'Итог: пасьянсная сортировка платит O(n) памяти под стопки и неустойчивость слияния за две вещи одновременно - гарантированное O(n log n), не зависящее от структуры входа, и попутный ответ на задачу LIS без отдельного прохода. На практике это делает её скорее учебным и специализированным инструментом (там, где LIS реально нужна), чем заменой merge sort или Timsort для повседневной сортировки.',
        en: 'The takeaway: patience sort trades O(n) pile memory and merge instability for two things at once - a guaranteed O(n log n) independent of input structure, and an LIS answer as a side effect with no separate pass. In practice this makes it more of a teaching and specialized tool (wherever LIS is genuinely needed) than a replacement for merge sort or Timsort in everyday sorting.',
      },
    ],
    whenToUse: [
      {
        ru: '**Нужны и сортировка, и LIS одновременно** - вместо отдельного O(n log n) алгоритма для LIS и отдельной сортировки, раскладка по стопкам сразу даёт оба ответа: отсортированный массив после слияния и длину LIS как число стопок.',
        en: '**Both sorting and LIS are needed at once** - instead of a separate O(n log n) LIS algorithm plus a separate sort, pile-dealing gives both answers at once: the sorted array after merging, and the LIS length as the pile count.',
      },
      {
        ru: '**Против merge sort** - если LIS не нужна, обычный merge sort почти всегда предпочтительнее: он устойчив, не требует бинарного поиска и кучи для слияния, и его константы на практике ниже.',
        en: '**Against merge sort** - if LIS isn\'t needed, plain merge sort is almost always preferable: it\'s stable, needs no binary search or merge heap, and its practical constants are lower.',
      },
      {
        ru: '**На почти отсортированных данных** число стопок остаётся маленьким (в пределе - одна стопка на полностью отсортированном входе), поэтому и куча для слияния маленькая, а обменов внутри `siftDown` почти нет - алгоритм заметно быстрее своей же худшей асимптотики.',
        en: '**On nearly sorted data** the pile count stays small (in the limit, a single pile on a fully sorted input), so the merge heap is small too and `siftDown` performs almost no swaps - the algorithm runs noticeably faster than its own worst-case asymptotics.',
      },
      {
        ru: '**В учебных курсах по комбинаторике и анализу алгоритмов** - раскладка по стопкам одновременно иллюстрирует жадные стратегии, теорему Дилворта и связь сортировки с задачами на подпоследовательности, что делает её удобным мостом между темами.',
        en: '**In combinatorics and algorithm-analysis courses** - pile-dealing simultaneously illustrates greedy strategies, Dilworth\'s theorem, and the link between sorting and subsequence problems, making it a convenient bridge between topics.',
      },
    ],
    realWorld: [
      {
        ru: '**C. L. Mallows, «Problem 62-2, Patience Sorting»** (SIAM Review, 1962) - первый математический анализ карточной игры пасьянс «patience», включая статистику ожидаемого числа стопок при случайной раскладке колоды.',
        en: '**C. L. Mallows, "Problem 62-2, Patience Sorting"** (SIAM Review, 1962) - the first mathematical analysis of the "patience" solitaire game, including the statistics of the expected pile count under a random deck.',
      },
      {
        ru: '**David Aldous, Persi Diaconis, «Longest increasing subsequences: from patience sorting to the Baik-Deift-Johansson theorem»** (Bulletin of the AMS, 1999) - связывает раскладку по стопкам с глубокой теорией случайных перестановок и распределением Трейси-Уидома (Tracy-Widom) из теории случайных матриц.',
        en: '**David Aldous, Persi Diaconis, "Longest increasing subsequences: from patience sorting to the Baik-Deift-Johansson theorem"** (Bulletin of the AMS, 1999) - connects pile-dealing to deep random-permutation theory and the Tracy-Widom distribution from random matrix theory.',
      },
      {
        ru: '**Соответствие Робинсона-Шенстеда (Robinson-Schensted correspondence)** в алгебраической комбинаторике строит из перестановки пару таблиц Юнга через вставку по строкам; столбцы получившейся таблицы соответствуют в точности стопкам пасьянсной раскладки того же входа.',
        en: '**The Robinson-Schensted correspondence** in algebraic combinatorics builds a pair of Young tableaux from a permutation via row insertion; the columns of the resulting tableau correspond exactly to the piles of patience-dealing the same input.',
      },
      {
        ru: '**Название «patience»** - британский английский термин для того, что в США называют «solitaire»: класс карточных игр для одного игрока, где карты раскладываются по определённым правилам - именно эта раскладка легла в основу названия алгоритма.',
        en: '**The name "patience"** is British English for what Americans call "solitaire": a class of single-player card games where cards are dealt according to fixed rules - that dealing process is exactly what the algorithm\'s name refers to.',
      },
    ],
  },

  relatedAlgorithms: ['merge-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'На какую стопку кладётся очередная карта в пасьянсной сортировке?',
        en: 'Which pile does the next card go on in patience sort?',
      },
      options: [
        {
          ru: 'На самую левую стопку, чей верхний элемент больше либо равен этой карте',
          en: 'The leftmost pile whose top element is greater than or equal to that card',
        },
        { ru: 'Всегда на последнюю созданную стопку, независимо от значения её верхней карты', en: 'Always onto the most recently created pile, regardless of its top card value' },
        { ru: 'На случайно выбранную стопку среди всех, что уже существуют', en: 'Onto a randomly chosen pile among all that already exist' },
        { ru: 'На стопку с наибольшим числом карт, чтобы стопки оставались сбалансированными', en: 'Onto the pile with the most cards, to keep the piles balanced' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это правило гарантирует, что каждая стопка остаётся убывающей сверху вниз, а поиск подходящей стопки можно делать бинарным поиском.',
        en: 'This rule guarantees each pile stays decreasing top-to-bottom, and the fitting pile can be found via binary search.',
      },
      hint: {
        ru: 'Смотрите абзац `solution` на вкладке «Суть» и шаг «Бинарный поиск стопки» построчного разбора на вкладке «Реализация».',
        en: 'See the `solution` paragraph on the "Intent" tab and the "Binary-searching for a pile" walkthrough step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что означает количество получившихся стопок после раскладки?',
        en: 'What does the number of resulting piles represent after dealing?',
      },
      options: [
        {
          ru: 'Длину самой длинной строго убывающей (сверху вниз) подпоследовательности значений',
          en: 'The length of the longest strictly decreasing (top-to-bottom) subsequence of values',
        },
        { ru: 'Количество отдельных перестановок элементов, нужных для полной сортировки всего массива целиком', en: 'The number of individual element swaps needed to fully sort the entire array from start to finish' },
        { ru: 'Число элементов, которые уже были отсортированы заранее до самого начала процесса раскладки', en: 'The number of elements that were already sorted beforehand, well before the dealing process even began' },
        { ru: 'Совершенно ничего - это просто бессмысленный побочный эффект без какого-либо практического применения', en: 'Absolutely nothing - it\'s just a meaningless side effect with no practical application whatsoever' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это ключевое наблюдение, которое связывает пасьянсную сортировку с задачей поиска длиннейшей возрастающей подпоследовательности (LIS).',
        en: 'This is the key observation linking patience sort to the longest-increasing-subsequence (LIS) problem.',
      },
      hint: {
        ru: 'Смотрите первый пункт плюсов на вкладке «Плюсы и минусы» и первый абзац раздела «Углублённо» на вкладке «Суть» (пример на 8 картах, 3 стопки).',
        en: 'See the first "Pros" item on the "Pros & Cons" tab and the first "Deep dive" paragraph on the "Intent" tab (the 8-card example, 3 piles).',
      },
    },
    {
      question: {
        ru: 'Как получить итоговый отсортированный массив после того, как все карты разложены по стопкам?',
        en: 'How is the final sorted array obtained once all cards are dealt onto piles?',
      },
      options: [
        {
          ru: 'Многократно забирать минимальный верхний элемент среди всех стопок',
          en: 'Repeatedly take the minimum top element across all piles',
        },
        { ru: 'Просто склеить стопки одну за другой в порядке их создания', en: 'Just concatenate the piles one after another in the order they were created' },
        { ru: 'Развернуть каждую стопку и склеить их слева направо', en: 'Reverse each pile and concatenate them left to right' },
        { ru: 'Отсортировать каждую стопку заново стандартной сортировкой сравнением', en: 'Re-sort each pile from scratch using a standard comparison sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это k-путевое слияние: каждая стопка уже упорядочена, поэтому многократный выбор минимального верха даёт полностью отсортированный результат, как при слиянии в merge sort.',
        en: 'This is a k-way merge: each pile is already ordered, so repeatedly picking the minimum top yields a fully sorted result, similar to merging in merge sort.',
      },
      hint: {
        ru: 'Смотрите шаги «Извлечение минимума» и «Восстановление свойства кучи» построчного разбора на вкладке «Реализация».',
        en: 'See the "Extracting the minimum" and "Restoring the heap property" walkthrough steps on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли пасьянсная сортировка сортировкой на месте (in-place)?',
        en: 'Is patience sort an in-place sort?',
      },
      options: [
        { ru: 'Нет - требует O(n) дополнительной памяти под стопки', en: 'No - it needs O(n) extra memory for the piles' },
        { ru: 'Да, всегда работает без дополнительной памяти, как quicksort', en: 'Yes, it always works with no extra memory, like quicksort' },
        { ru: 'Только если во входном массиве нет дубликатов значений', en: 'Only if the input array has no duplicate values' },
        { ru: 'Только для массивов длиной меньше 100 элементов', en: 'Only for arrays shorter than 100 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Стопки - это отдельная структура данных поверх исходного массива, поэтому память растёт линейно с n.',
        en: 'The piles are a separate data structure on top of the original array, so memory grows linearly with n.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и первый пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the "Space" complexity badge at the top of the page and the first "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Откуда пасьянсная сортировка получила своё название?',
        en: 'Where does patience sort get its name from?',
      },
      options: [
        {
          ru: 'Она моделирует карточный пасьянс: раскладывание карт по стопкам',
          en: 'It models dealing cards into piles, as in the solitaire card game',
        },
        { ru: 'Она требует терпеливого ожидания O(n²) времени на больших массивах', en: 'It requires patiently waiting through O(n²) time on large arrays' },
        { ru: 'Её придумал программист по фамилии Пасьянс в начале XX века', en: 'It was invented by a programmer named Patience in the early 20th century' },
        { ru: 'Название никак не связано с сутью алгоритма и выбрано случайно', en: 'The name has nothing to do with how the algorithm works and was chosen arbitrarily' },
      ],
      correct: 0,
      explanation: {
        ru: 'Правило «класть карту на первую подходящую стопку» - это в точности упрощённая стратегия одного из пасьянсов.',
        en: 'The "place the card on the first fitting pile" rule is exactly the simplified strategy of one solitaire variant.',
      },
      hint: {
        ru: 'Смотрите вступительный абзац (intent) на вкладке «Суть» и последний пункт раздела «Примеры из практики» (углублённого) там же («patience» - британский синоним «solitaire»).',
        en: 'See the opening (intent) paragraph on the "Intent" tab and the last item in the extended "Real world" section there ("patience" is British English for "solitaire").',
      },
    },
    {
      question: {
        ru: 'Как связано число стопок в пасьянсной сортировке с задачей LIS?',
        en: 'How is the number of piles in patience sort connected to the LIS problem?',
      },
      options: [
        { ru: 'Число стопок равно длине LIS (возрастающей подпоследовательности) входа', en: 'The number of piles equals the length of the longest increasing subsequence (LIS) of the input' },
        { ru: 'Число стопок равно числу инверсий в исходном массиве', en: 'The number of piles equals the number of inversions in the original array' },
        { ru: 'LIS никак не связана с пасьянсной сортировкой - это совпадение терминов', en: 'LIS has nothing to do with patience sort - the apparent connection is merely a coincidence of terminology' },
        { ru: 'Число стопок равно квадрату длины LIS входного массива', en: 'The number of piles equals the square of the LIS length of the input array' },
      ],
      correct: 0,
      explanation: {
        ru: 'По теореме Дилворта число стопок в пасьянсной сортировке равно длине LIS: верхние карты стопок образуют убывающую последовательность, длина которой по теореме Дилворта равна длине LIS.',
        en: 'By Dilworth\'s theorem, the number of piles in patience sort equals the LIS length: pile tops form a decreasing sequence whose length equals the LIS length by Dilworth\'s theorem.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Углублённо» на вкладке «Суть» (теорема Дилворта, цепи и антицепи).',
        en: 'See the sixth "Deep dive" paragraph on the "Intent" tab (Dilworth\'s theorem, chains and antichains).',
      },
    },
    {
      question: {
        ru: 'Каков метод поиска подходящей стопки при раскладке карт?',
        en: 'What search method is used to find the fitting pile during dealing?',
      },
      options: [
        { ru: 'Бинарный поиск по верхним элементам стопок', en: 'Binary search over the pile tops' },
        { ru: 'Линейный перебор всех стопок слева направо', en: 'Linear scan of all piles from left to right' },
        { ru: 'Случайный выбор стопки с последующей проверкой', en: 'Random pile selection with a subsequent check' },
        { ru: 'Хеш-таблица с ключами из верхних элементов стопок', en: 'Hash table keyed on pile tops' },
      ],
      correct: 0,
      explanation: {
        ru: 'Верхние элементы стопок всегда образуют возрастающую последовательность (иначе карта легла бы раньше), поэтому по ним можно проводить бинарный поиск за O(log k), где k - текущее число стопок.',
        en: 'Pile tops always form an increasing sequence (otherwise the card would have been placed earlier), so binary search over them takes O(log k), where k is the current number of piles.',
      },
      hint: {
        ru: 'Смотрите строки 9-13 функции `patienceSort` на вкладке «Реализация» и шаг «Бинарный поиск стопки» построчного разбора там же.',
        en: 'See lines 9-13 of `patienceSort` on the "Implementation" tab and the "Binary-searching for a pile" walkthrough step there.',
      },
    },
    {
      question: {
        ru: 'Как ведёт себя пасьянсная сортировка на полностью отсортированном входе?',
        en: 'How does patience sort behave on a fully sorted input?',
      },
      options: [
        { ru: 'Образуется ровно одна стопка, а слияние тривиально - алгоритм адаптивен', en: 'Exactly one pile forms and merging is trivial - the algorithm is adaptive' },
        { ru: 'Образуется n стопок по одной карте - это наихудший случай для пасьянсной сортировки', en: 'Exactly n piles of one card each form - this is the worst case for patience sort' },
        { ru: 'Алгоритм обнаруживает упорядоченность и завершает работу немедленно без раскладки', en: 'The algorithm detects the order and terminates immediately without dealing' },
        { ru: 'Число стопок равно log n, как в сбалансированном дереве', en: 'The number of piles equals log n, as in a balanced tree' },
      ],
      correct: 0,
      explanation: {
        ru: 'При возрастающем входе каждая следующая карта меньше или равна верху последней стопки, поэтому всегда находится первая же стопка - в итоге стопка одна.',
        en: 'For increasing input every next card is less than or equal to the last pile\'s top, so the first pile always fits - resulting in a single pile.',
      },
      hint: {
        ru: 'Смотрите третий пункт плюсов на вкладке «Плюсы и минусы» и третий пункт whenToUse (углублённого) на вкладке «Суть» (адаптивность на почти отсортированных данных).',
        en: 'See the third "Pros" item on the "Pros & Cons" tab and the third extended "When to use" item on the "Intent" tab (adaptivity on nearly sorted data).',
      },
    },
    {
      question: {
        ru: 'Почему пасьянсная сортировка считается неустойчивой?',
        en: 'Why is patience sort considered unstable?',
      },
      options: [
        { ru: 'Равные элементы из разных стопок могут поменяться местами при слиянии', en: 'Equal elements from different piles can change their relative order during the merge' },
        { ru: 'Бинарный поиск стопки всегда помещает новый элемент перед равными ему, нарушая порядок', en: 'Binary search always places a new element before equal ones, breaking their order always' },
        { ru: 'Алгоритм использует случайный порядок слияния стопок, что нарушает устойчивость', en: 'The algorithm merges piles in a random order, breaking stability' },
        { ru: 'Неустойчивость возникает только при повторяющихся значениях в уже отсортированном входе', en: 'Instability only occurs for duplicate values in an already-sorted input' },
      ],
      correct: 0,
      explanation: {
        ru: 'При слиянии k стопок не отслеживается, из какой именно стопки пришли равные элементы, поэтому их исходный относительный порядок не гарантируется.',
        en: 'During the k-way merge, no tracking is done of which pile equal elements came from, so their original relative order is not guaranteed.',
      },
      hint: {
        ru: 'Смотрите тег `unstable` рядом с названием алгоритма вверху страницы и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the `unstable` tag next to the algorithm name at the top of the page and the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность пасьянсной сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of patience sort?',
      },
      options: [
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n²) при обратно отсортированном входе', en: 'O(n²) on reverse-sorted input' },
        { ru: 'O(n) при любом входе благодаря адаптивности', en: 'O(n) for any input thanks to adaptivity' },
        { ru: 'O(n log² n) из-за накладных расходов на k-путевое слияние', en: 'O(n log² n) due to k-way merge overhead' },
      ],
      correct: 0,
      explanation: {
        ru: 'Даже в худшем случае (обратно отсортированный вход, когда образуется n стопок) раскладка занимает O(n log n), а слияние n стопок через кучу тоже O(n log n).',
        en: 'Even in the worst case (reverse-sorted input, where n piles form), dealing takes O(n log n) and merging n piles via a heap also takes O(n log n).',
      },
      hint: {
        ru: 'Смотрите второй и третий абзацы раздела «Углублённо» на вкладке «Суть» (почему слияние через кучу, а не линейным перебором, даёт O(n log n), а не O(n²)).',
        en: 'See the second and third "Deep dive" paragraphs on the "Intent" tab (why merging via a heap, not a linear scan, gives O(n log n) instead of O(n²)).',
      },
    },
  ],
};

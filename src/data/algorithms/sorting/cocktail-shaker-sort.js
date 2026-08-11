export const cocktailShakerSort = {
  slug: 'cocktail-shaker-sort',
  category: 'sorting',
  name: { ru: 'Cocktail Shaker Sort', en: 'Cocktail Shaker Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'stable'],

  intent: {
    ru: 'Шейкерная сортировка - это двунаправленная пузырьковая сортировка: она поочерёдно проходит массив слева направо и справа налево, «выталкивая» на каждом проходе и самый большой, и самый маленький ещё не отсортированный элемент.',
    en: 'Cocktail shaker sort is bidirectional bubble sort: it alternates passing the array left-to-right and right-to-left, pushing both the largest and the smallest unsorted element into place on every round.',
  },

  problem: {
    ru: 'Обычная пузырьковая сортировка всегда движется в одну сторону, поэтому маленький элемент, застрявший в конце массива (её называют «черепахой»), сдвигается к началу лишь на одну позицию за проход - это требует почти n проходов, даже если весь остальной массив уже отсортирован.',
    en: 'Plain bubble sort always moves in one direction, so a small element stuck at the end of the array (a "turtle") only moves one position toward the start per pass - this takes nearly n passes even if the rest of the array is already sorted.',
  },

  solution: {
    ru: 'Алгоритм чередует направление прохода: сначала идёт слева направо, как обычный bubble sort, выталкивая наибольший элемент в конец; затем сразу разворачивается и идёт справа налево, выталкивая наименьший элемент в начало. Границы отсортированной части сжимаются с обеих сторон одновременно, поэтому «черепахи» устраняются так же быстро, как и «кролики» (большие элементы у начала массива).',
    en: 'The algorithm alternates pass direction: first left-to-right like regular bubble sort, pushing the largest element to the end; then immediately reversing to go right-to-left, pushing the smallest element to the start. The sorted boundary shrinks from both sides at once, so "turtles" are eliminated just as fast as "rabbits" (large elements near the start).',
  },

  steps: [
    {
      title: { ru: 'Проход слева направо', en: 'Left-to-right pass' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами соседние элементы, двигаясь от начала неотсортированной части к концу - как в bubble sort.',
        en: 'Compare and swap adjacent elements while moving from the start of the unsorted part to its end - just like bubble sort.',
      },
    },
    {
      title: { ru: 'Сжать правую границу', en: 'Shrink the right boundary' },
      explanation: {
        ru: 'Самый большой элемент прохода теперь на своём месте справа - исключить его из дальнейших проходов.',
        en: 'The largest element of the pass is now in place on the right - exclude it from further passes.',
      },
    },
    {
      title: { ru: 'Проход справа налево', en: 'Right-to-left pass' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами соседние элементы, двигаясь от конца неотсортированной части к началу.',
        en: 'Compare and swap adjacent elements while moving from the end of the unsorted part back to its start.',
      },
    },
    {
      title: { ru: 'Сжать левую границу', en: 'Shrink the left boundary' },
      explanation: {
        ru: 'Самый маленький элемент прохода теперь на своём месте слева - исключить его из дальнейших проходов.',
        en: 'The smallest element of the pass is now in place on the left - exclude it from further passes.',
      },
    },
    {
      title: { ru: 'Остановиться без перестановок', en: 'Stop with no swaps' },
      explanation: {
        ru: 'Если целый двойной проход не дал ни одной перестановки, массив отсортирован - можно закончить раньше времени.',
        en: 'If a full round-trip pass makes zero swaps, the array is sorted - the algorithm can exit early.',
      },
    },
  ],
  stepBreakpoints: [2, 16, 30, 45],

  implementation: {
    javascript: `function cocktailShakerSort(arr) {
  const a = [...arr];
  let start = 0;
  let end = a.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
    }
    end--;
    if (!swapped) break;

    swapped = false;
    for (let i = end; i > start; i--) {
      if (a[i - 1] > a[i]) {
        [a[i - 1], a[i]] = [a[i], a[i - 1]];
        swapped = true;
      }
    }
    start++;
  }
  return a;
}`,
    python: `def cocktail_shaker_sort(arr):
    a = arr.copy()
    start, end = 0, len(a) - 1
    swapped = True

    while swapped:
        swapped = False
        for i in range(start, end):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
        end -= 1
        if not swapped:
            break

        swapped = False
        for i in range(end, start, -1):
            if a[i - 1] > a[i]:
                a[i - 1], a[i] = a[i], a[i - 1]
                swapped = True
        start += 1
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - направление и границы прохода настраиваются полностью внутри функции, никаких дополнительных параметров не требуется.',
          en: 'The function takes a single array `arr` - pass direction and boundaries are configured entirely inside the function, no extra parameters are needed.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия массива', en: 'Copying the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт копию входного массива, чтобы функция не изменяла аргумент, переданный вызывающим кодом - все дальнейшие перестановки происходят в этой копии.',
          en: '`const a = [...arr]` copies the input array so the function doesn\'t mutate the caller\'s argument - every swap below happens on this copy.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Границы неотсортированной зоны', en: 'Bounds of the unsorted zone' },
        explanation: {
          ru: '`start` и `end` отмечают левую и правую границы ещё не отсортированной части массива. Изначально это весь массив: `start = 0`, `end = a.length - 1`. С каждым полным двойным проходом обе границы будут сдвигаться внутрь.',
          en: '`start` and `end` mark the left and right edges of the still-unsorted part of the array. Initially that\'s the whole array: `start = 0`, `end = a.length - 1`. Each full round-trip pass moves both boundaries inward.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Флаг перестановок', en: 'The swap flag' },
        explanation: {
          ru: '`swapped` инициализируется в `true`, хотя ни одной перестановки ещё не было - это не отражает реальное состояние, а просто гарантирует, что цикл `while (swapped)` выполнится хотя бы один раз.',
          en: '`swapped` starts as `true` even though no swap has happened yet - this doesn\'t reflect a real state, it just guarantees the `while (swapped)` loop runs at least once.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Внешний цикл и сброс флага', en: 'Outer loop and flag reset' },
        explanation: {
          ru: '`while (swapped)` продолжает выполнять полные двойные проходы, пока хоть один из них что-то менял. В начале каждой итерации `swapped = false` - если ни левый, ни правый проход не найдут ни одной перестановки, флаг так и останется `false`, и цикл завершится.',
          en: '`while (swapped)` keeps running full round-trip passes as long as the previous one changed something. At the top of each iteration `swapped = false` - if neither the left nor the right pass finds a single swap, the flag stays `false` and the loop ends.',
        },
      },
      {
        lines: [9, 14],
        title: { ru: 'Проход слева направо', en: 'Left-to-right pass' },
        explanation: {
          ru: '`for (let i = start; i < end; i++)` идёт от текущей левой границы к текущей правой, сравнивая `a[i]` с `a[i + 1]` и меняя их местами, если левый элемент больше правого - это тот же цикл, что и в обычном bubble sort, но ограниченный сузившейся зоной `[start, end]`.',
          en: '`for (let i = start; i < end; i++)` walks from the current left boundary to the current right one, comparing `a[i]` with `a[i + 1]` and swapping them if the left element is greater - the same loop as plain bubble sort, just bounded to the shrunken `[start, end]` zone.',
        },
      },
      {
        lines: [15],
        title: { ru: 'Сжатие правой границы', en: 'Shrinking the right boundary' },
        explanation: {
          ru: '`end--` исключает последний индекс из будущих проходов: после прохода слева направо самый большой элемент зоны гарантированно оказался на позиции `end`, и трогать его больше не нужно.',
          en: '`end--` excludes the last index from future passes: after the left-to-right pass, the zone\'s largest element is guaranteed to sit at position `end`, so it no longer needs to be touched.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Ранний выход после левого прохода', en: 'Early exit after the left pass' },
        explanation: {
          ru: '`if (!swapped) break` останавливает алгоритм сразу после левого прохода, не запуская правый, если левый проход не сделал ни одной перестановки - это значит, что вся оставшаяся зона уже отсортирована, и разворачиваться в другую сторону незачем.',
          en: '`if (!swapped) break` stops the algorithm right after the left pass, skipping the right pass entirely, if the left pass made zero swaps - that means the remaining zone is already sorted, so there\'s nothing left to catch by reversing direction.',
        },
      },
      {
        lines: [18],
        title: { ru: 'Сброс флага перед правым проходом', en: 'Resetting the flag before the right pass' },
        explanation: {
          ru: '`swapped = false` сбрасывается заново - перестановки, сделанные во время левого прохода, не должны маскировать отсутствие перестановок в правом. Каждый проход отслеживается независимо.',
          en: '`swapped = false` is reset again - swaps made during the left pass must not mask the absence of swaps in the right one. Each pass is tracked independently.',
        },
      },
      {
        lines: [19, 24],
        title: { ru: 'Проход справа налево', en: 'Right-to-left pass' },
        explanation: {
          ru: '`for (let i = end; i > start; i--)` идёт от текущей правой границы к текущей левой, сравнивая `a[i - 1]` с `a[i]` и меняя их местами, если левый элемент больше правого. Направление обратное, но сравниваемая пара соседей та же самая идея, что и в левом проходе.',
          en: '`for (let i = end; i > start; i--)` walks from the current right boundary to the current left one, comparing `a[i - 1]` with `a[i]` and swapping them if the left element is greater. The direction is reversed, but comparing an adjacent pair is the same idea as the left pass.',
        },
      },
      {
        lines: [25],
        title: { ru: 'Сжатие левой границы', en: 'Shrinking the left boundary' },
        explanation: {
          ru: '`start++` исключает первый индекс из будущих проходов: после прохода справа налево самый маленький элемент зоны гарантированно оказался на позиции `start`.',
          en: '`start++` excludes the first index from future passes: after the right-to-left pass, the zone\'s smallest element is guaranteed to sit at position `start`.',
        },
      },
      {
        lines: [27],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `while (swapped)` завершается - либо через `break`, либо потому что правый проход тоже не сделал перестановок - зона `[start, end]` сжалась до пустой, и `a` полностью отсортирован.',
          en: 'When `while (swapped)` ends - either via `break` or because the right pass also made no swaps - the `[start, end]` zone has shrunk to empty, and `a` is fully sorted.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, вся настройка направления и границ живёт внутри функции.',
          en: 'The function takes a single list `arr` - just like the JS version, all direction and boundary setup lives inside the function.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия списка', en: 'Copying the list' },
        explanation: {
          ru: '`a = arr.copy()` создаёт копию входного списка, чтобы не изменять аргумент вызывающего кода.',
          en: '`a = arr.copy()` copies the input list so the caller\'s argument stays untouched.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Границы неотсортированной зоны', en: 'Bounds of the unsorted zone' },
        explanation: {
          ru: '`start, end = 0, len(a) - 1` задаёт начальные границы - весь список. Как и в JS-версии, эти границы будут сдвигаться внутрь с каждым полным двойным проходом.',
          en: '`start, end = 0, len(a) - 1` sets the initial boundaries to the whole list. As in the JS version, they move inward with every full round-trip pass.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Флаг перестановок', en: 'The swap flag' },
        explanation: {
          ru: '`swapped = True` - тот же приём, что и в JS: значение не отражает реальное состояние, а лишь гарантирует хотя бы одну итерацию `while swapped`.',
          en: '`swapped = True` - the same trick as in JS: the value doesn\'t reflect a real state, it just guarantees at least one `while swapped` iteration.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Внешний цикл и сброс флага', en: 'Outer loop and flag reset' },
        explanation: {
          ru: '`while swapped:` повторяет полные двойные проходы, пока хоть один из них менял порядок. `swapped = False` в начале итерации сбрасывает флаг для нового двойного прохода.',
          en: '`while swapped:` repeats full round-trip passes as long as the previous one changed the order. `swapped = False` at the top of the iteration resets the flag for the new round trip.',
        },
      },
      {
        lines: [8, 11],
        title: { ru: 'Проход слева направо', en: 'Left-to-right pass' },
        explanation: {
          ru: '`for i in range(start, end):` перебирает индексы от текущей левой границы до текущей правой (не включая `end`), сравнивая `a[i]` с `a[i + 1]` и меняя их местами при необходимости - идентично левому проходу в JS-версии.',
          en: '`for i in range(start, end):` walks indices from the current left boundary up to (not including) the current right one, comparing `a[i]` with `a[i + 1]` and swapping when needed - identical to the JS version\'s left pass.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Сжатие правой границы', en: 'Shrinking the right boundary' },
        explanation: {
          ru: '`end -= 1` исключает последний индекс из будущих проходов - наибольший элемент зоны уже занял позицию `end`.',
          en: '`end -= 1` excludes the last index from future passes - the zone\'s largest element already occupies position `end`.',
        },
      },
      {
        lines: [13, 14],
        title: { ru: 'Ранний выход после левого прохода', en: 'Early exit after the left pass' },
        explanation: {
          ru: '`if not swapped: break` останавливает алгоритм, не запуская правый проход, если левый проход не сделал ни одной перестановки - остаток зоны уже отсортирован.',
          en: '`if not swapped: break` stops the algorithm without running the right pass if the left pass made zero swaps - the rest of the zone is already sorted.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Сброс флага перед правым проходом', en: 'Resetting the flag before the right pass' },
        explanation: {
          ru: '`swapped = False` сбрасывается заново перед правым проходом, чтобы отслеживать его перестановки независимо от левого.',
          en: '`swapped = False` is reset again before the right pass, so its swaps are tracked independently of the left pass.',
        },
      },
      {
        lines: [17, 20],
        title: { ru: 'Проход справа налево', en: 'Right-to-left pass' },
        explanation: {
          ru: '`for i in range(end, start, -1):` перебирает индексы от текущей правой границы до `start + 1` (третий аргумент `-1` задаёт шаг назад, диапазон не включает `start`), сравнивая `a[i - 1]` с `a[i]`.',
          en: '`for i in range(end, start, -1):` walks indices from the current right boundary down to `start + 1` (the third argument `-1` sets the backward step, the range excludes `start`), comparing `a[i - 1]` with `a[i]`.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Сжатие левой границы', en: 'Shrinking the left boundary' },
        explanation: {
          ru: '`start += 1` исключает первый индекс из будущих проходов - наименьший элемент зоны уже занял позицию `start`.',
          en: '`start += 1` excludes the first index from future passes - the zone\'s smallest element already occupies position `start`.',
        },
      },
      {
        lines: [22],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `while swapped:` завершается, зона `[start, end]` сжалась до пустой, и `a` полностью отсортирован.',
          en: 'When `while swapped:` ends, the `[start, end]` zone has shrunk to empty, and `a` is fully sorted.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Устраняет и «черепах» (маленькие элементы в конце), и «кроликов» (большие элементы в начале) одинаково быстро, в отличие от обычного bubble sort.',
      en: 'Eliminates both "turtles" (small elements at the end) and "rabbits" (large elements at the start) equally fast, unlike plain bubble sort.',
    },
    {
      ru: 'Сортирует на месте - требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place - needs only O(1) extra memory.',
    },
    {
      ru: 'Устойчив: равные элементы сохраняют исходный относительный порядок.',
      en: 'Stable: equal elements keep their original relative order.',
    },
    {
      ru: 'С флагом ранней остановки на почти отсортированных данных выполняется за O(n).',
      en: 'With the early-exit flag, it runs in O(n) on nearly sorted data.',
    },
  ],
  cons: [
    {
      ru: 'Всё ещё O(n²) сравнений в среднем и худшем случае - асимптотически не лучше bubble sort.',
      en: 'Still O(n²) comparisons on average and worst case - asymptotically no better than bubble sort.',
    },
    {
      ru: 'Более сложная реализация, чем обычный bubble sort, за прирост производительности только на конкретных «неудобных» распределениях данных.',
      en: 'More complex to implement than plain bubble sort, for a speed-up that only matters on specific "awkward" data distributions.',
    },
    {
      ru: 'На случайных данных выигрыш перед обычным bubble sort минимален - константный множитель, не порядок сложности.',
      en: 'On random data the gain over plain bubble sort is minimal - a constant factor, not a complexity-order improvement.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные почти отсортированы, но несколько элементов «застряли» не с той стороны массива, где их достала бы обычная пузырьковая сортировка.',
      en: 'When data is nearly sorted but a few elements are "stuck" on the wrong side for plain bubble sort to reach quickly.',
    },
    {
      ru: 'Как учебный пример двунаправленного прохода - концептуальный мостик к более сложным алгоритмам вроде timsort.',
      en: 'As a teaching example of a bidirectional pass - a conceptual bridge to more advanced algorithms like Timsort.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Учебные курсы по алгоритмам** используют его, чтобы показать, как небольшое изменение стратегии прохода (двунаправленность) устраняет конкретный класс худших случаев без смены общей идеи алгоритма.',
      en: '**Algorithms courses** use it to show how a small change in pass strategy (bidirectionality) eliminates a specific class of worst cases without changing the algorithm\'s core idea.',
    },
    {
      ru: '**Небольшие встроенные буферы данных**, где данные почти отсортированы (например, скользящее окно последних измерений сенсора), а простота реализации важнее асимптотики.',
      en: '**Small embedded data buffers** where data is nearly sorted (e.g. a sliding window of recent sensor readings), and implementation simplicity matters more than asymptotics.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Заявленное преимущество - устранение «черепах» - стоит проверить на конкретных числах, а не принимать на слово. Возьмём массив `[2, 3, 4, 5, 6, 7, 8, 9, 10, 1]` (n = 10): единица - классическая черепаха, застрявшая в самом конце уже отсортированного по возрастанию хвоста.',
        en: 'The claimed advantage - eliminating "turtles" - is worth checking against actual numbers, not taken on faith. Take the array `[2, 3, 4, 5, 6, 7, 8, 9, 10, 1]` (n = 10): the 1 is a classic turtle, stuck at the very end of an otherwise ascending tail.',
      },
      {
        ru: 'В обычном bubble sort этот 1 сдвигается влево ровно на одну позицию за каждый проход - алгоритму нужно **9 полных проходов**, чтобы дотащить его до индекса 0. В шейкерной сортировке первый проход слева направо просто переставляет 10 и 1 местами (`[2,3,4,5,6,7,8,9,1,10]`), а следующий сразу же проход справа налево тащит 1 через всю оставшуюся зону за один присест - единица оказывается в начале уже **после 2 проходов** вместо 9.',
        en: 'In plain bubble sort, that 1 moves left by exactly one position per pass - it takes **9 full passes** to drag it to index 0. In cocktail shaker sort, the first left-to-right pass simply swaps 10 and 1 (`[2,3,4,5,6,7,8,9,1,10]`), and the very next right-to-left pass drags the 1 across the entire remaining zone in one go - it reaches the front after **2 passes** instead of 9.',
      },
      {
        ru: 'Это не совпадение, а асимметрия, изначально заложенная в bubble sort. **«Кролик»** (большой элемент у начала массива) уже движется быстро в обычном одностороннем проходе: сравнение `a[i] > a[i+1]` заставляет его сдвигаться вправо на каждом шаге того же прохода, так что он долетает до своего места за один проход. Медленно ползёт только «черепаха» - потому что после того как её один раз сдвинули влево, проход уже ушёл дальше вправо и не возвращается проверить её снова. Шейкерная сортировка - это, по сути, патч именно для этого одностороннего слепого пятна, а не общее ускорение алгоритма.',
        en: 'This isn\'t a coincidence, it\'s an asymmetry baked into bubble sort itself. A **"rabbit"** (a large element near the start) already moves fast in a plain one-directional pass: the `a[i] > a[i+1]` check pushes it right on every subsequent step of the same pass, so it reaches its spot in one pass. Only the "turtle" crawls, because once it\'s nudged left, the pass has already moved on and never comes back to check it again. Cocktail shaker sort is, in effect, a patch for exactly this one-directional blind spot, not a general speed-up of the algorithm.',
      },
      {
        ru: 'Отсюда же следует, почему средний и худший случай остаются **O(n²)**. Каждый полный двойной проход сжимает зону с обеих сторон: `end--` после левого прохода и `start++` после правого. Значит, всего может быть не больше `⌈n/2⌉` двойных проходов, а k-й проход обрабатывает зону шириной примерно `n - 2k` с обеих сторон - `2(n - 2k)` сравнений. Просуммировав по всем `k` от 0 до n/2, получаем порядка `n²/2` сравнений - та же величина, что и у обычного bubble sort, только переупакованная в проходы вдвое короче, но их вдвое больше по счёту с обеих сторон одновременно.',
        en: 'This also explains why the average and worst case stay **O(n²)**. Every full round-trip pass shrinks the zone from both ends: `end--` after the left pass, `start++` after the right one. That caps the number of round trips at `⌈n/2⌉`, and the k-th round trip processes a zone about `n - 2k` wide on both sides - `2(n - 2k)` comparisons. Summing over `k` from 0 to n/2 gives roughly `n²/2` comparisons - the same total as plain bubble sort, just repackaged into passes that are each half as long but come in pairs going both directions.',
      },
      {
        ru: 'В коде на этой странице есть тонкая асимметрия в самой проверке `swapped`. Ранний выход `if (!swapped) break` стоит только после **левого** прохода - если он ничего не переставил, правый проход вообще не запускается. После **правого** прохода отдельной проверки нет: цикл просто идёт на следующую итерацию `while (swapped)`, и если правый проход тоже ничего не поменял, флаг остаётся `false`, и цикл завершается сам собой на условии `while`. Итог тот же самый - лишний проход не выполняется в обоих случаях, - но механизм выхода технически разный: явный `break` против естественного условия цикла.',
        en: 'The code on this page has a subtle asymmetry in the `swapped` check itself. The early exit `if (!swapped) break` only sits after the **left** pass - if it swapped nothing, the right pass never runs at all. There\'s no matching check after the **right** pass: the loop simply moves to the next `while (swapped)` iteration, and if the right pass also changed nothing, the flag stays `false` and the loop ends on its own via the `while` condition. The outcome is identical either way - no wasted extra pass - but the exit mechanism is technically different: an explicit `break` versus the loop\'s own condition doing the job.',
      },
      {
        ru: 'Имя «shaker sort» само по себе неоднозначно и часто путает при чтении разных источников. Помимо двунаправленной пузырьковой сортировки, описанной здесь, тот же термин иногда используют для совсем другого алгоритма - двунаправленного варианта **selection sort**, который за один проход одновременно находит и минимум, и максимум оставшейся неотсортированной зоны и сразу ставит оба на края. Эти два алгоритма решают внешне похожую задачу (обработать оба конца массива за один заход), но устроены принципиально по-разному: один основан на перестановке соседей, второй - на поиске экстремума.',
        en: 'The name "shaker sort" is itself ambiguous and often causes confusion across sources. Besides the bidirectional bubble sort described here, the same term is sometimes used for a completely different algorithm - a bidirectional variant of **selection sort** that finds both the minimum and the maximum of the remaining unsorted zone in a single pass and places both at the edges immediately. The two algorithms solve a superficially similar problem (handle both ends of the array in one sweep) but work on fundamentally different mechanics: one is swap-based, the other is extremum-search-based.',
      },
      {
        ru: 'Более серьёзное решение той же проблемы «черепах» - **comb sort**, изобретённый Влодзимежем Добосевичем в 1980 году и заново популяризированный Стивеном Лейси и Ричардом Боксом в статье в журнале Byte в 1991-м. Вместо смены направления comb sort сравнивает элементы через зазор шире 1, сокращая его на каждом проходе (обычно делением на 1.3) - это сразу расталкивает «черепах» на большие расстояния, а не тащит их пошагово в обратную сторону, поэтому даёт заметно лучшую константу, оставаясь при этом в том же классе O(n²) в худшем случае.',
        en: 'A more serious fix for the same turtle problem is **comb sort**, invented by Włodzimierz Dobosiewicz in 1980 and rediscovered/popularized by Stephen Lacey and Richard Box in a 1991 Byte Magazine article. Instead of switching direction, comb sort compares elements across a gap wider than 1, shrinking it every pass (typically by dividing by 1.3) - this shoves turtles across large distances at once rather than dragging them back one step at a time, giving a noticeably better constant while still staying in the same O(n²) worst-case class.',
      },
      {
        ru: 'Итог: шейкерная сортировка стоит рассматривать не как «улучшенный bubble sort» в общем смысле, а как точечный патч под одну конкретную форму входных данных - редкие элементы, застрявшие не с той стороны. Как учебная концепция она ценна тем, что показывает: изменение стратегии обхода (направление, зазор) может радикально поменять поведение на конкретных распределениях, не трогая при этом асимптотику в общем случае - мостик к пониманию, зачем вообще нужны более сложные стратегии вроде divide-and-conquer у merge/quick sort.',
        en: 'The takeaway: cocktail shaker sort is best understood not as a general "improved bubble sort" but as a targeted patch for one specific input shape - a few elements stuck on the wrong side. As a teaching concept its value is showing that changing the traversal strategy (direction, gap) can radically change behavior on specific distributions without touching the general-case asymptotics - a bridge toward understanding why more elaborate strategies like merge/quick sort\'s divide-and-conquer exist at all.',
      },
    ],
    whenToUse: [
      {
        ru: '**Против comb sort** - если реальная цель именно быстро устранить черепах, comb sort справляется с этим лучше за счёт сокращающегося зазора, а не смены направления; шейкерная сортировка выигрывает только простотой объяснения механизма, а не производительностью.',
        en: '**Against comb sort** - if the real goal is fast turtle elimination, comb sort does it better via a shrinking gap rather than a direction switch; cocktail shaker sort only wins on how simple the mechanism is to explain, not on performance.',
      },
      {
        ru: '**Когда беспорядок сосредоточен с обеих сторон** массива одновременно (не только «черепахи» в конце, но и «медленные кролики» ближе к середине после первых проходов) - двунаправленный обход убирает оба конца за один двойной проход, тогда как односторонние методы вроде insertion sort по одному направлению справляются с этим медленнее.',
        en: '**When disorder sits at both ends** of the array at once (not just a "turtle" at the end, but "slow rabbits" nearer the middle after the first few passes) - the bidirectional sweep clears both ends in a single round trip, while single-direction methods like insertion sort handle this more slowly.',
      },
      {
        ru: '**Как учебный шаг перед comb sort** - объяснить сначала, что смена направления решает конкретную проблему без изменения порядка сложности, а уже затем показать, что зазор больше 1 решает ту же проблему быстрее - естественная прогрессия для курса по алгоритмам сортировки.',
        en: '**As a teaching step before comb sort** - explain first that switching direction fixes a concrete problem without changing the complexity order, then show that a gap wider than 1 fixes the same problem faster - a natural progression for a sorting-algorithms course.',
      },
      {
        ru: '**Не выбирать для случайных или крупных данных** - ни асимметрия направления, ни early-exit флаг не спасают от O(n²) сравнений на случайном входе; для этого нужны quicksort, mergesort или Timsort, а не патчи над bubble sort.',
        en: '**Don\'t pick it for random or large data** - neither the direction asymmetry nor the early-exit flag saves it from O(n²) comparisons on random input; quicksort, mergesort, or Timsort are needed there, not patches on top of bubble sort.',
      },
      {
        ru: '**Если нужно меньше перестановок, а не меньше проходов** - двунаправленный вариант selection sort (иногда тоже называемый «shaker sort», см. выше) ищет min и max за один проход и переставляет каждый элемент максимум один раз за операцию, тогда как здесь любая перестановка - это отдельный своп соседей.',
        en: '**If fewer swaps matter more than fewer passes** - the bidirectional selection sort variant (also sometimes called "shaker sort", see above) finds min and max in one pass and moves each element at most once per operation, whereas here every swap is a separate adjacent-pair exchange.',
      },
    ],
    realWorld: [
      {
        ru: '**Wikipedia и большинство вводных курсов по алгоритмам** используют именно эту пару bubble/cocktail shaker sort как канонический пример того, что изменение стратегии обхода может радикально поменять поведение на конкретной форме входных данных, не меняя асимптотику в общем случае - урок важнее самого алгоритма.',
        en: '**Wikipedia and most introductory algorithms courses** use exactly this bubble/cocktail-shaker pair as the canonical example that changing a traversal strategy can radically change behavior on a specific input shape without touching general-case asymptotics - the lesson matters more than the algorithm.',
      },
      {
        ru: '**Comb sort** (Влодзимеж Добосевич, 1980; заново описан Стивеном Лейси и Ричардом Боксом в Byte Magazine, 1991) - самостоятельный алгоритм, решающий ту же проблему черепах через сокращающийся зазор, а не смену направления; исторически применялся в нескольких ранних библиотеках сортировки как быстрая и простая замена bubble sort до широкого распространения quicksort.',
        en: '**Comb sort** (Włodzimierz Dobosiewicz, 1980; rediscovered by Stephen Lacey and Richard Box in Byte Magazine, 1991) is a standalone algorithm solving the same turtle problem through a shrinking gap instead of a direction switch; it saw use in a handful of early sorting libraries as a fast, simple bubble sort replacement before quicksort became the default.',
      },
      {
        ru: '**Учебные визуализаторы алгоритмов сортировки** нередко включают шейкерную сортировку отдельно от bubble sort именно из-за характерного «двустороннего волнового» узора перестановок на экране - это визуально показывает разницу между односторонним и двунаправленным обходом лучше, чем текстовое объяснение.',
        en: '**Sorting-algorithm visualizer tools** often include cocktail shaker sort separately from bubble sort specifically for the distinctive "two-sided wave" swap pattern it produces on screen - it demonstrates the difference between one-directional and bidirectional traversal better than a text explanation would.',
      },
      {
        ru: '**Прошивки для маленьких микроконтроллеров**, где важен размер скомпилированного кода, а не асимптотика: шейкерная сортировка требует лишь на несколько строк больше, чем bubble sort, но не тянет за собой ни рекурсию, ни дополнительные структуры данных, которых требуют более быстрые алгоритмы вроде quicksort.',
        en: '**Firmware for small microcontrollers**, where compiled code size matters more than asymptotics: cocktail shaker sort needs only a few lines more than bubble sort, but pulls in no recursion or extra data structures the way faster algorithms like quicksort would.',
      },
    ],
  },

  relatedAlgorithms: ['bubble-sort', 'comb-sort'],

  quiz: [
    {
      question: {
        ru: 'Чем шейкерная сортировка отличается от обычной пузырьковой?',
        en: 'What distinguishes cocktail shaker sort from plain bubble sort?',
      },
      options: [
        { ru: 'Она чередует направление прохода: слева направо и справа налево', en: 'It alternates pass direction: left-to-right and right-to-left' },
        { ru: 'Она использует дополнительный временный массив для слияния промежуточных результатов', en: 'It uses an extra temporary array to merge intermediate results together' },
        { ru: 'Она сравнивает элементы через постепенно сокращающийся фиксированный gap', en: 'It compares elements through a gradually shrinking fixed gap' },
        { ru: 'Она каждый раз выбирает случайный опорный элемент для сравнения', en: 'It picks a random pivot element for comparison on every pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Проход слева направо выталкивает наибольший элемент вправо, а следующий проход справа налево выталкивает наименьший элемент влево - границы сортированной зоны сжимаются с обеих сторон.',
        en: 'A left-to-right pass pushes the largest element right, and the following right-to-left pass pushes the smallest element left - the sorted boundary shrinks from both sides.',
      },
      hint: {
        ru: 'Подумайте о движении шейкера для коктейлей - что отличает его от простого движения в одну сторону? Смотрите шаги «Проход слева направо» и «Проход справа налево» на вкладке «Визуализация».',
        en: 'Think about the motion of a cocktail shaker - what sets it apart from moving one way? See the "Left-to-right pass" and "Right-to-left pass" steps on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Какую проблему обычного bubble sort решает шейкерная сортировка?',
        en: 'What problem of plain bubble sort does cocktail shaker sort solve?',
      },
      options: [
        { ru: 'Медленный ход маленьких элементов («черепах») в конце массива', en: 'Slow movement of small elements ("turtles") stuck at the end of the array' },
        { ru: 'Излишний расход дополнительной памяти на каждый проход по массиву', en: 'Excessive extra memory usage on every single pass through the array' },
        { ru: 'Нестабильность сортировки, когда в массиве встречаются равные элементы', en: 'Sort instability whenever equal elements happen to appear in the array' },
        { ru: 'Принципиальная невозможность вообще сортировать массив по убыванию', en: 'A fundamental inability to ever sort the array in descending order at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'В обычном bubble sort маленький элемент у конца массива сдвигается к началу лишь на одну позицию за проход; двунаправленные проходы устраняют эту асимметрию.',
        en: 'In plain bubble sort, a small element near the end only moves one position toward the start per pass; bidirectional passes remove that asymmetry.',
      },
      hint: {
        ru: 'Представьте маленький элемент в самом конце массива при обычном bubble sort. Насколько быстро он доберётся до начала? Разобрано в подразделе «Проблема» на вкладке «Суть».',
        en: 'Imagine a small element at the very end of the array in plain bubble sort. How quickly can it reach the start? Covered in the "Problem" subsection on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность шейкерной сортировки в среднем случае?',
        en: 'What is the average-case time complexity of cocktail shaker sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(√n)', en: 'O(√n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Двунаправленность меняет константный множитель и поведение на конкретных распределениях, но не меняет порядок роста - в среднем всё ещё O(n²) сравнений.',
        en: 'Bidirectionality changes the constant factor and behavior on specific distributions, but not the growth order - still O(n²) comparisons on average.',
      },
      hint: {
        ru: 'Каждый двойной проход сжимает зону лишь на 1 элемент с каждой стороны - сколько всего таких проходов получится и сколько сравнений они дадут в сумме? Разобрано с формулой n²/2 в разделе «Как это работает» на вкладке «Суть».',
        en: 'Each round-trip pass shrinks the zone by only 1 element per side - how many such passes are there, and how many comparisons do they add up to? Worked out with the n²/2 formula in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли шейкерная сортировка устойчивой (stable)?',
        en: 'Is cocktail shaker sort stable?',
      },
      options: [
        { ru: 'Да - меняются местами только строго неравные соседние элементы', en: 'Yes - only strictly unequal adjacent elements are swapped' },
        { ru: 'Нет - двунаправленные проходы нарушают порядок равных элементов', en: 'No - bidirectional passes break the order of equal elements' },
        { ru: 'Зависит от направления первого прохода', en: 'It depends on the direction of the first pass' },
        { ru: 'Устойчивость неприменима к сортировкам на месте', en: 'Stability doesn\'t apply to in-place sorts' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и в bubble sort, элементы меняются местами только если левый строго больше правого - равные элементы никогда не переставляются друг с другом.',
        en: 'Just like bubble sort, elements swap only when the left one is strictly greater - equal elements never swap with each other.',
      },
      hint: {
        ru: 'Посмотрите на условие перестановки `a[i] > a[i+1]` на вкладке «Реализация» - что происходит, если элементы равны? Названо напрямую в третьем пункте плюсов на вкладке «Плюсы и минусы».',
        en: 'Look at the swap condition `a[i] > a[i+1]` on the "Implementation" tab - what happens when elements are equal? Named directly in the third "Pros" item on "Pros & Cons".',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует шейкерная сортировка?',
        en: 'How much extra memory does cocktail shaker sort need?',
      },
      options: [
        { ru: 'O(1) - сортировка происходит на месте', en: 'O(1) - it sorts in place' },
        { ru: 'O(n) - по одному элементу с каждой стороны', en: 'O(n) - one per side' },
        { ru: 'O(log n) - на стек рекурсии', en: 'O(log n) - for a recursion stack' },
        { ru: 'O(n²) - на матрицу сравнений', en: 'O(n²) - for a comparison matrix' },
      ],
      correct: 0,
      explanation: {
        ru: 'Все перестановки происходят прямо в исходном массиве; нужны лишь переменные-границы `start`/`end` и флаг `swapped`.',
        en: 'All swaps happen directly in the original array; only `start`/`end` boundary variables and a `swapped` flag are needed.',
      },
      hint: {
        ru: 'Создаёт ли алгоритм копии массива или вспомогательные структуры данных? Смотрите бейдж «Память» вверху страницы и второй пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'Does the algorithm create copies of the array or auxiliary structures? See the "Space" complexity badge at the top and the second "Pros" item on "Pros & Cons".',
      },
    },
    {
      question: {
        ru: 'Каков лучший случай шейкерной сортировки и когда он возникает?',
        en: 'What is the best case of cocktail shaker sort and when does it occur?',
      },
      options: [
        { ru: 'O(n) - массив уже упорядочен, первый проход не даёт перестановок', en: 'O(n) - when the array is already sorted and the first round trip makes no swaps' },
        { ru: 'O(1) - когда массив из одного элемента', en: 'O(1) - when the array has exactly one element' },
        { ru: 'O(n log n) - когда данные случайные, но близкие к нормальному распределению', en: 'O(n log n) - when data is random but close to a normal distribution in all cases' },
        { ru: 'O(n²) - лучший случай не отличается от среднего', en: 'O(n²) - the best case is no different from the average case' },
      ],
      correct: 0,
      explanation: {
        ru: 'Флаг ранней остановки `swapped` позволяет выйти после одного прохода туда и обратно, если не было ни одной перестановки - это означает, что массив уже был отсортирован.',
        en: 'The early-exit flag `swapped` lets the algorithm stop after one round trip if no swap was made - meaning the array was already sorted.',
      },
      hint: {
        ru: 'Когда флаг swapped остаётся ложным после целого прохода туда и обратно? Смотрите бейдж «Лучший» вверху страницы, шаг «Остановиться без перестановок» на вкладке «Визуализация» и четвёртый пункт плюсов на «Плюсы и минусы».',
        en: 'When does the swapped flag stay false after a full round trip? See the "Best" complexity badge at the top, the "Stop with no swaps" step on "Visualization", and the fourth "Pros" item on "Pros & Cons".',
      },
    },
    {
      question: {
        ru: 'Почему шейкерная сортировка не улучшает асимптотику по сравнению с bubble sort?',
        en: 'Why doesn\'t cocktail shaker sort improve the asymptotic complexity over bubble sort?',
      },
      options: [
        { ru: 'По-прежнему O(n²) сравнений на случайных данных в среднем', en: 'It still makes O(n²) comparisons on random data on average' },
        { ru: 'Она добавляет лишние проходы справа налево, удваивая работу', en: 'It adds extra right-to-left passes that double the work' },
        { ru: 'Она устойчива, а устойчивые алгоритмы не могут быть лучше O(n²)', en: 'It is stable, and stable algorithms cannot be better than O(n²)' },
        { ru: 'Она не использует рекурсию, а без неё нельзя достичь O(n log n)', en: 'It uses no recursion, and without recursion O(n log n) is impossible' },
      ],
      correct: 0,
      explanation: {
        ru: 'Двунаправленность устраняет конкретный патологический случай («черепахи»), но не меняет порядок роста числа сравнений - на случайных данных алгоритм всё равно делает O(n²) сравнений.',
        en: 'Bidirectionality removes a specific pathological case ("turtles") but doesn\'t change the growth order of comparisons - on random data the algorithm still makes O(n²) comparisons.',
      },
      hint: {
        ru: 'Сравните, сколько проходов требуется обычному bubble sort и шейкерной сортировке на массиве с одной «черепахой» в конце - а затем на случайных данных. Разобрано с числовым примером в разделе «Как это работает» на вкладке «Суть».',
        en: 'Compare how many passes plain bubble sort and cocktail shaker sort need on an array with one "turtle" at the end - then on random data. Worked out with a numeric example in the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Как называется «маленький элемент, застрявший в конце массива» в контексте bubble sort?',
        en: 'What is the name for a "small element stuck at the end of the array" in the context of bubble sort?',
      },
      options: [
        { ru: '«Черепаха» - она движется к началу медленно, по одной позиции за проход', en: '"Turtle" - it moves toward the start slowly, one position per pass' },
        { ru: '«Кролик» - он быстро перемещается вправо за один проход влево', en: '"Rabbit" - it moves quickly to the right in a single left pass' },
        { ru: '«Якорь» - он полностью останавливает алгоритм до следующего перезапуска', en: '"Anchor" - it completely stops the algorithm until the next restart' },
        { ru: '«Сентинель» - специальный элемент для обозначения границы массива', en: '"Sentinel" - a special element marking the array boundary' },
      ],
      correct: 0,
      explanation: {
        ru: '«Черепаха» - классический термин для маленького элемента у правого края: в bubble sort он двигается влево лишь на одну позицию за каждый полный проход.',
        en: '"Turtle" is the classic term for a small element near the right edge: in bubble sort it moves left by only one position per full pass.',
      },
      hint: {
        ru: 'Подумайте о животном, которое движется очень медленно. Термин назван в подразделе «Проблема» на вкладке «Суть».',
        en: 'Think of an animal that moves very slowly. The term is named in the "Problem" subsection on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что происходит с границами `start` и `end` после каждого полного двойного прохода?',
        en: 'What happens to the `start` and `end` boundaries after each full round-trip pass?',
      },
      options: [
        { ru: '`end` уменьшается на 1, а `start` увеличивается на 1', en: '`end` decreases by 1 and `start` increases by 1' },
        { ru: 'Обе границы сбрасываются в исходные позиции для следующего прохода', en: 'Both boundaries reset to their initial positions for the next pass' },
        { ru: '`start` увеличивается на 2, а `end` не меняется', en: '`start` increases by 2 and `end` stays the same' },
        { ru: 'Границы меняются местами после каждого полного двойного прохода', en: 'The boundaries swap with each other after every full round-trip' },
      ],
      correct: 0,
      explanation: {
        ru: 'После прохода слева направо `end` уменьшается - наибольший элемент встал на место; после прохода справа налево `start` увеличивается - наименьший элемент встал на место.',
        en: 'After the left-to-right pass `end` decreases - the largest element is in place; after the right-to-left pass `start` increases - the smallest element is in place.',
      },
      hint: {
        ru: 'После каждого прохода один элемент занимает своё финальное место. Смотрите шаги «Сжать правую границу» и «Сжать левую границу» на вкладке «Визуализация».',
        en: 'After each pass, one element reaches its final place. See the "Shrink the right boundary" and "Shrink the left boundary" steps on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Какой алгоритм использует аналогичную идею «уменьшающегося зазора», но более агрессивно?',
        en: 'Which algorithm uses a similar "shrinking gap" idea but more aggressively?',
      },
      options: [
        { ru: 'Comb sort - быстрее уменьшает зазор между элементами', en: 'Comb sort - it shrinks the gap between compared elements faster' },
        { ru: 'Merge sort - рекурсивно уменьшает размер подзадачи вдвое', en: 'Merge sort - it recursively halves the subproblem size' },
        { ru: 'Radix sort - уменьшает диапазон ключей поразрядно', en: 'Radix sort - it reduces the key range digit by digit' },
        { ru: 'Heap sort - уменьшает кучу после каждого извлечения максимума', en: 'Heap sort - it shrinks the heap after each maximum extraction always' },
      ],
      correct: 0,
      explanation: {
        ru: 'Comb sort использует тот же базовый принцип пузырьковой сортировки, но сравнивает элементы через зазор больше 1, быстро уменьшая его - это устраняет «черепах» гораздо быстрее, чем шейкерная сортировка.',
        en: 'Comb sort uses the same basic bubble sort principle but compares elements across a gap greater than 1, shrinking it rapidly - this eliminates turtles much faster than cocktail shaker sort does.',
      },
      hint: {
        ru: 'Шейкерная сортировка сравнивает соседние элементы (зазор = 1) и решает проблему черепах сменой направления. Какой родственный алгоритм решает ту же проблему через сокращающийся зазор шире 1? Названо в разделе «Как это работает» на вкладке «Суть» (с историей изобретения) и в разделе «Похожие алгоритмы» внизу страницы.',
        en: 'Cocktail shaker sort compares adjacent elements (gap = 1) and fixes the turtle problem by switching direction. Which related algorithm fixes the same problem via a shrinking gap wider than 1? Named in the "How it works" section on the "Intent" tab (with its invention history) and in the "Related algorithms" section at the bottom of the page.',
      },
    },
  ],
};

export const librarySort = {
  slug: 'library-sort',
  category: 'sorting',
  name: { ru: 'Library Sort', en: 'Library Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['comparison', 'insertion-based', 'gapped-array'],

  intent: {
    ru: 'Библиотечная сортировка (или gapped insertion sort) - вставочная сортировка, которая держит между элементами свободные «зазоры», чтобы вставка нового элемента чаще всего не требовала сдвигать большой хвост массива, как в обычной сортировке вставками, а находила себе пустое место рядом.',
    en: 'Library sort (also called gapped insertion sort) is an insertion sort variant that keeps free "gaps" between elements so that inserting a new element usually doesn\'t require shifting a long tail of the array, as in plain insertion sort, but instead finds an empty slot nearby.',
  },

  problem: {
    ru: 'В обычной сортировке вставками, чтобы вставить элемент в уже отсортированную часть массива, приходится физически сдвигать вправо все элементы, которые окажутся после него - в среднем это O(n) сдвигов на одну вставку. Идея похожа на то, как библиотекарь расставляет книги на полке: если книги стоят вплотную друг к другу, вставка новой книги в середину требует подвинуть все книги после неё. Но если между книгами оставлены небольшие промежутки - совсем как настоящие библиотекари специально оставляют место на полках для новых поступлений, - вставку чаще всего можно сделать, просто задвинув книгу в ближайший пустой промежуток.',
    en: 'In plain insertion sort, inserting an element into the already-sorted portion of the array means physically shifting every element that ends up after it - on average O(n) shifts per insertion. This mirrors how a librarian shelves books: if books sit flush against each other, inserting a new one in the middle means moving every book after it. But if small gaps are left between books - much like real librarians deliberately leave room on shelves for new arrivals - the insertion can usually be done by simply sliding the book into the nearest empty gap.',
  },

  solution: {
    ru: 'Элементы хранятся в массиве вдвое большего размера (`capacity`), где часть ячеек пуста (`null`) - это и есть «зазоры», равномерно распределённые между заполненными элементами. Чтобы вставить новый элемент: бинарным поиском среди заполненных ячеек находится позиция, куда он должен встать по порядку; если целевая ячейка пуста - элемент просто кладётся туда; если занята - элементы сдвигаются по направлению к ближайшему свободному зазору (вправо или влево), освобождая нужное место. Когда зазоры вокруг какого-то участка заканчиваются (массив заполняется или сдвигать больше некуда), выполняется `rebalance()` - все текущие элементы перераспределяются заново, равномерно, в массиве увеличенной ёмкости.',
    en: 'Elements live in an array of double the needed size (`capacity`), where some cells are empty (`null`) - these are the "gaps," spread evenly between the filled elements. To insert a new element: binary search among the filled cells finds where it belongs in order; if the target cell is empty, the element is simply placed there; if occupied, elements are shifted toward the nearest free gap (right or left) to open up the needed space. When the gaps around some region run out (the array fills up or there\'s nowhere left to shift), a `rebalance()` step redistributes all current elements evenly across an array of increased capacity.',
  },

  steps: [
    {
      title: { ru: 'Выделить массив с зазорами', en: 'Allocate a gapped array' },
      explanation: {
        ru: 'Создать массив ёмкостью в несколько раз больше числа элементов, изначально заполненный пустыми ячейками.',
        en: 'Create an array with capacity several times the element count, initially filled with empty cells.',
      },
    },
    {
      title: { ru: 'Найти позицию бинарным поиском', en: 'Find the position via binary search' },
      explanation: {
        ru: 'Среди уже заполненных ячеек бинарным поиском найти, куда должен встать очередной элемент по порядку.',
        en: 'Among the already-filled cells, binary search finds where the next element belongs in sorted order.',
      },
    },
    {
      title: { ru: 'Вставить в зазор', en: 'Insert into a gap' },
      explanation: {
        ru: 'Если целевая ячейка пуста, элемент вставляется прямо туда без единого сдвига.',
        en: 'If the target cell is empty, the element is inserted directly there with no shifting at all.',
      },
    },
    {
      title: { ru: 'Сдвинуть к ближайшему зазору', en: 'Shift toward the nearest gap' },
      explanation: {
        ru: 'Если целевая ячейка занята, соседние элементы сдвигаются в сторону ближайшего свободного места, освобождая нужную позицию.',
        en: 'If the target cell is occupied, neighboring elements are shifted toward the nearest empty spot, freeing up the needed position.',
      },
    },
    {
      title: { ru: 'Перебалансировать при заполнении', en: 'Rebalance when full' },
      explanation: {
        ru: 'Когда свободных зазоров не остаётся, все элементы равномерно перераспределяются в массиве большей ёмкости.',
        en: 'When no free gaps remain, all elements are evenly redistributed into an array of larger capacity.',
      },
    },
  ],
  stepBreakpoints: [2, 11, 21, 29],

  implementation: {
    javascript: `function librarySort(arr) {
  const n = arr.length;
  if (n === 0) return [];

  let capacity = Math.max(n * 2, 4);
  let a = new Array(capacity).fill(null);
  let count = 0;

  const filledIndices = () => {
    const idxs = [];
    for (let k = 0; k < a.length; k++) if (a[k] !== null) idxs.push(k);
    return idxs;
  };

  function rebalance() {
    const values = a.filter((v) => v !== null);
    capacity = Math.max(values.length * 2, 4);
    const next = new Array(capacity).fill(null);
    const gap = capacity / (values.length + 1);
    for (let k = 0; k < values.length; k++) {
      next[Math.floor((k + 1) * gap)] = values[k];
    }
    a = next;
  }

  for (let idx = 0; idx < n; idx++) {
    const value = arr[idx];
    let inserted = false;

    while (!inserted) {
      if (count === capacity) {
        rebalance();
        continue;
      }

      const idxs = filledIndices();
      let lo = 0, hi = idxs.length;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (a[idxs[mid]] < value) lo = mid + 1;
        else hi = mid;
      }
      const insertAt = lo === idxs.length ? (idxs.length === 0 ? Math.floor(capacity / 2) : idxs[idxs.length - 1] + 1) : idxs[lo];

      if (insertAt >= a.length) {
        rebalance();
        continue;
      }

      if (a[insertAt] === null) {
        a[insertAt] = value;
        count++;
        inserted = true;
      } else {
        let right = insertAt;
        while (right < a.length && a[right] !== null) right++;
        if (right < a.length) {
          for (let k = right; k > insertAt; k--) a[k] = a[k - 1];
          a[insertAt] = value;
          count++;
          inserted = true;
        } else {
          let left = insertAt - 1;
          while (left >= 0 && a[left] !== null) left--;
          if (left >= 0) {
            for (let k = left; k < insertAt - 1; k++) a[k] = a[k + 1];
            a[insertAt - 1] = value;
            count++;
            inserted = true;
          } else {
            rebalance();
          }
        }
      }
    }
  }

  return a.filter((v) => v !== null);
}`,
    python: `def library_sort(arr):
    n = len(arr)
    if n == 0:
        return []

    capacity = max(n * 2, 4)
    a = [None] * capacity
    count = 0

    def rebalance():
        nonlocal a, capacity
        values = [v for v in a if v is not None]
        capacity = max(len(values) * 2, 4)
        next_a = [None] * capacity
        gap = capacity / (len(values) + 1)
        for k, v in enumerate(values):
            next_a[int((k + 1) * gap)] = v
        a = next_a

    for value in arr:
        inserted = False
        while not inserted:
            if count == capacity:
                rebalance()
                continue

            idxs = [k for k in range(len(a)) if a[k] is not None]
            lo, hi = 0, len(idxs)
            while lo < hi:
                mid = (lo + hi) // 2
                if a[idxs[mid]] < value:
                    lo = mid + 1
                else:
                    hi = mid
            if lo == len(idxs):
                insert_at = capacity // 2 if not idxs else idxs[-1] + 1
            else:
                insert_at = idxs[lo]

            if insert_at >= len(a):
                rebalance()
                continue

            if a[insert_at] is None:
                a[insert_at] = value
                count += 1
                inserted = True
            else:
                right = insert_at
                while right < len(a) and a[right] is not None:
                    right += 1
                if right < len(a):
                    for k in range(right, insert_at, -1):
                        a[k] = a[k - 1]
                    a[insert_at] = value
                    count += 1
                    inserted = True
                else:
                    left = insert_at - 1
                    while left >= 0 and a[left] is not None:
                        left -= 1
                    if left >= 0:
                        for k in range(left, insert_at - 1):
                            a[k] = a[k + 1]
                        a[insert_at - 1] = value
                        count += 1
                        inserted = True
                    else:
                        rebalance()

    return [v for v in a if v is not None]`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - весь остальной механизм (ёмкость, зазоры, перебалансировка) настраивается внутри функции.',
          en: 'The function takes a single array `arr` - the rest of the mechanism (capacity, gaps, rebalancing) is set up entirely inside the function.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Длина и пустой вход', en: 'Length and the empty-input guard' },
        explanation: {
          ru: '`const n = arr.length` запоминает число элементов; `if (n === 0) return []` сразу возвращает пустой массив, чтобы дальнейшая логика не делила на ноль при вычислении зазоров.',
          en: '`const n = arr.length` records the element count; `if (n === 0) return []` returns immediately so the rest of the logic never divides by zero when computing gaps.',
        },
      },
      {
        lines: [5, 7],
        title: { ru: 'Массив с зазорами и счётчик', en: 'The gapped array and the counter' },
        explanation: {
          ru: '`capacity = Math.max(n * 2, 4)` фиксирует ёмкость - вдвое больше числа элементов (не меньше 4 для очень маленьких входов). `a` создаётся этой длины и заполняется `null` - это и есть зазоры. `count` считает, сколько ячеек уже занято.',
          en: '`capacity = Math.max(n * 2, 4)` fixes the capacity - double the element count (never below 4 for tiny inputs). `a` is created at that length filled with `null` - these are the gaps. `count` tracks how many cells are occupied.',
        },
      },
      {
        lines: [9, 13],
        title: { ru: 'Список заполненных индексов', en: 'The list of filled indices' },
        explanation: {
          ru: '`filledIndices()` пересобирает список позиций, где `a[k] !== null`, каждый раз, когда вызывается - именно по этому списку идёт бинарный поиск, потому что заполненные ячейки всегда отсортированы между собой.',
          en: '`filledIndices()` rebuilds the list of positions where `a[k] !== null` every time it\'s called - this is the list binary search runs over, since filled cells are always sorted relative to one another.',
        },
      },
      {
        lines: [15, 24],
        title: { ru: 'Перебалансировка', en: 'Rebalancing' },
        explanation: {
          ru: '`rebalance()` собирает все ненулевые значения (`a.filter`), удваивает ёмкость от их числа и раскладывает их равномерно в новом массиве `next` с шагом `gap = capacity / (values.length + 1)` - это и восстанавливает свободные промежутки. В этой реализации функция объявлена, но, как показано в углублённом разборе на вкладке «Суть», ни разу не вызывается ни для одного входа при `capacity = 2n`.',
          en: '`rebalance()` collects every non-null value (`a.filter`), doubles the capacity relative to their count, and spreads them evenly across a new array `next` with step `gap = capacity / (values.length + 1)` - this is what restores free gaps. In this implementation the function is defined but, as shown in the deep-dive on the "Intent" tab, never actually gets called for any input once `capacity = 2n`.',
        },
      },
      {
        lines: [26, 28],
        title: { ru: 'Внешний цикл по входным элементам', en: 'The outer loop over input elements' },
        explanation: {
          ru: '`for (let idx = 0; idx < n; idx++)` перебирает исходный массив по одному значению `value`; `inserted` - флаг того, что текущий элемент ещё не нашёл своё место.',
          en: '`for (let idx = 0; idx < n; idx++)` walks the original array one `value` at a time; `inserted` flags whether the current element has found its spot yet.',
        },
      },
      {
        lines: [30, 34],
        title: { ru: 'Цикл вставки и защита от переполнения', en: 'The insertion loop and the overflow guard' },
        explanation: {
          ru: '`while (!inserted)` повторяет попытку вставки, пока элемент не встанет на место. `if (count === capacity) { rebalance(); continue; }` - защитная проверка на случай полностью заполненного массива, хотя при `capacity = max(n*2, 4)` и не более `n` вставок `count` никогда не достигает `capacity`.',
          en: '`while (!inserted)` retries insertion until the element lands. `if (count === capacity) { rebalance(); continue; }` is a safety check for a fully-packed array, though with `capacity = max(n*2, 4)` and at most `n` insertions, `count` never actually reaches `capacity`.',
        },
      },
      {
        lines: [36, 42],
        title: { ru: 'Бинарный поиск позиции', en: 'Binary search for the position' },
        explanation: {
          ru: '`idxs = filledIndices()` собирает заполненные позиции, затем `while (lo < hi)` ищет среди них первую, где значение не меньше `value` - `lo`/`hi` сужаются к точке вставки за `O(log(число заполненных))` сравнений.',
          en: '`idxs = filledIndices()` collects filled positions, then `while (lo < hi)` searches among them for the first one not less than `value` - `lo`/`hi` narrow to the insertion point in `O(log(filled count))` comparisons.',
        },
      },
      {
        lines: [43],
        title: { ru: 'Вычисление целевой ячейки', en: 'Computing the target cell' },
        explanation: {
          ru: 'Если `lo` вышел за конец списка заполненных индексов, элемент встаёт после последнего заполненного (или в середину пустого массива, если заполненных ещё нет); иначе - в позицию `idxs[lo]`, найденную поиском.',
          en: 'If `lo` walked past the end of the filled-index list, the element goes right after the last filled cell (or into the middle of an empty array, if nothing is filled yet); otherwise it targets `idxs[lo]`, the position found by the search.',
        },
      },
      {
        lines: [45, 48],
        title: { ru: 'Защита от выхода за границы', en: 'The out-of-bounds guard' },
        explanation: {
          ru: '`if (insertAt >= a.length) { rebalance(); continue; }` ловит случай, когда вычисленная позиция вышла за пределы массива - на практике при `capacity = 2n` это условие тоже никогда не выполняется, но код остаётся корректным даже при другом выборе ёмкости.',
          en: '`if (insertAt >= a.length) { rebalance(); continue; }` catches the computed target landing outside the array - in practice, with `capacity = 2n`, this never fires either, but the code stays correct even under a different capacity choice.',
        },
      },
      {
        lines: [50, 53],
        title: { ru: 'Вставка в пустую ячейку', en: 'Inserting into an empty cell' },
        explanation: {
          ru: 'Если `a[insertAt] === null`, элемент кладётся туда напрямую - это самый частый и самый дешёвый случай, ноль сдвигов.',
          en: 'If `a[insertAt] === null`, the element is placed there directly - the most common and cheapest case, zero shifts.',
        },
      },
      {
        lines: [54, 62],
        title: { ru: 'Сдвиг вправо к ближайшему зазору', en: 'Shifting right to the nearest gap' },
        explanation: {
          ru: 'Если целевая ячейка занята, `right` ищет ближайшую пустую справа. Если находит (`right < a.length`), цикл `for (let k = right; k > insertAt; k--)` сдвигает элементы на одну позицию вправо, освобождая `insertAt`.',
          en: 'If the target cell is occupied, `right` scans for the nearest empty cell to the right. If found (`right < a.length`), the `for (let k = right; k > insertAt; k--)` loop shifts elements one position right, opening up `insertAt`.',
        },
      },
      {
        lines: [63, 73],
        title: { ru: 'Сдвиг влево или перебалансировка', en: 'Shifting left, or rebalancing' },
        explanation: {
          ru: 'Если справа зазора нет, `left` ищет пустую ячейку слева и сдвигает элементы влево тем же способом, но зеркально. Если пусто нет и слева (`left < 0`), выполняется `rebalance()` - но, как показано в углублённом разборе, эта ветка недостижима при `capacity = 2n`, потому что `count < capacity` не даёт заполниться обеим сторонам одновременно.',
          en: 'If there\'s no gap to the right, `left` scans for an empty cell to the left and shifts elements left the same way, mirrored. If there\'s no gap on that side either (`left < 0`), `rebalance()` runs - but, as the deep-dive shows, this branch is unreachable at `capacity = 2n`, because `count < capacity` never lets both sides fill up at once.',
        },
      },
      {
        lines: [78],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: '`return a.filter((v) => v !== null)` отбрасывает оставшиеся зазоры (`null`) и возвращает только заполненные значения - уже в отсортированном порядке.',
          en: '`return a.filter((v) => v !== null)` drops the remaining gaps (`null`) and returns only the filled values - already in sorted order.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, вся настройка живёт внутри функции.',
          en: 'The function takes a single list `arr` - just like the JS version, all setup lives inside the function.',
        },
      },
      {
        lines: [2, 4],
        title: { ru: 'Длина и пустой вход', en: 'Length and the empty-input guard' },
        explanation: {
          ru: '`n = len(arr)` запоминает число элементов; `if n == 0: return []` сразу выходит на пустом входе.',
          en: '`n = len(arr)` records the element count; `if n == 0: return []` exits immediately on empty input.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Массив с зазорами и счётчик', en: 'The gapped array and the counter' },
        explanation: {
          ru: '`capacity = max(n * 2, 4)` фиксирует ёмкость, `a = [None] * capacity` создаёт список из зазоров, `count = 0` считает занятые ячейки - идентично JS-версии.',
          en: '`capacity = max(n * 2, 4)` fixes the capacity, `a = [None] * capacity` creates a list of gaps, `count = 0` tracks occupied cells - identical to the JS version.',
        },
      },
      {
        lines: [10, 19],
        title: { ru: 'Перебалансировка', en: 'Rebalancing' },
        explanation: {
          ru: '`rebalance()` объявлена с `nonlocal a, capacity`, чтобы иметь право переприсваивать переменные внешней функции. Логика та же: собрать значения, удвоить ёмкость, разложить их равномерно по `next_a` с шагом `gap`. Как и в JS, эта функция определена, но при `capacity = 2n` фактически ни разу не вызывается.',
          en: '`rebalance()` is declared with `nonlocal a, capacity` so it can reassign the enclosing function\'s variables. Same logic: collect the values, double the capacity, spread them evenly across `next_a` with step `gap`. As in JS, this function is defined but, at `capacity = 2n`, never actually gets called.',
        },
      },
      {
        lines: [20, 22],
        title: { ru: 'Внешний цикл по входным элементам', en: 'The outer loop over input elements' },
        explanation: {
          ru: '`for value in arr:` перебирает исходный список; `inserted = False` начинает попытку вставки очередного значения.',
          en: '`for value in arr:` walks the original list; `inserted = False` starts the attempt to place the current value.',
        },
      },
      {
        lines: [23, 25],
        title: { ru: 'Цикл вставки и защита от переполнения', en: 'The insertion loop and the overflow guard' },
        explanation: {
          ru: '`while not inserted:` повторяет попытку, пока элемент не найдёт место. `if count == capacity:` - тот же защитный, фактически недостижимый случай полностью заполненного массива, что и в JS.',
          en: '`while not inserted:` retries until the element lands. `if count == capacity:` is the same defensive, practically unreachable full-array case as in JS.',
        },
      },
      {
        lines: [27, 34],
        title: { ru: 'Бинарный поиск позиции', en: 'Binary search for the position' },
        explanation: {
          ru: '`idxs` собирает заполненные позиции списковым включением; `while lo < hi:` сужает `lo`/`hi` к точке вставки - логика поиска дословно повторяет JS-версию.',
          en: '`idxs` collects filled positions via a list comprehension; `while lo < hi:` narrows `lo`/`hi` to the insertion point - the search logic mirrors the JS version exactly.',
        },
      },
      {
        lines: [35, 38],
        title: { ru: 'Вычисление целевой ячейки', en: 'Computing the target cell' },
        explanation: {
          ru: 'Если `lo == len(idxs)`, элемент встаёт после последнего заполненного индекса (или в середину пустого списка); иначе - в `idxs[lo]`.',
          en: 'If `lo == len(idxs)`, the element goes after the last filled index (or into the middle of an empty list); otherwise it targets `idxs[lo]`.',
        },
      },
      {
        lines: [40, 42],
        title: { ru: 'Защита от выхода за границы', en: 'The out-of-bounds guard' },
        explanation: {
          ru: '`if insert_at >= len(a):` ловит выход вычисленной позиции за пределы списка - как и в JS, на практике при `capacity = 2n` не срабатывает.',
          en: '`if insert_at >= len(a):` catches the computed position landing outside the list - as in JS, in practice this never fires at `capacity = 2n`.',
        },
      },
      {
        lines: [44, 47],
        title: { ru: 'Вставка в пустую ячейку', en: 'Inserting into an empty cell' },
        explanation: {
          ru: 'Если `a[insert_at] is None`, значение кладётся туда напрямую - без единого сдвига.',
          en: 'If `a[insert_at] is None`, the value is placed there directly - no shifting at all.',
        },
      },
      {
        lines: [48, 57],
        title: { ru: 'Сдвиг вправо к ближайшему зазору', en: 'Shifting right to the nearest gap' },
        explanation: {
          ru: '`right` ищет ближайшую пустую ячейку справа; если находит, `for k in range(right, insert_at, -1)` сдвигает элементы вправо на одну позицию, освобождая `insert_at`.',
          en: '`right` scans for the nearest empty cell to the right; if found, `for k in range(right, insert_at, -1)` shifts elements one position right, freeing `insert_at`.',
        },
      },
      {
        lines: [58, 69],
        title: { ru: 'Сдвиг влево или перебалансировка', en: 'Shifting left, or rebalancing' },
        explanation: {
          ru: 'Если справа зазора нет, `left` ищет пустую ячейку слева и сдвигает элементы влево. Если пусто нет нигде (`left < 0`), вызывается `rebalance()` - недостижимая при `capacity = 2n` ветка, зеркальная JS-версии.',
          en: 'If there\'s no gap to the right, `left` scans for an empty cell to the left and shifts elements left. If there\'s no gap anywhere (`left < 0`), `rebalance()` runs - an unreachable branch at `capacity = 2n`, mirroring the JS version.',
        },
      },
      {
        lines: [71],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: '`return [v for v in a if v is not None]` отбрасывает оставшиеся `None`-зазоры и возвращает отсортированные значения.',
          en: '`return [v for v in a if v is not None]` drops the remaining `None` gaps and returns the sorted values.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'В среднем случае обеспечивает O(n log n) - существенно быстрее, чем O(n²) у обычной сортировки вставками, за счёт того, что вставки чаще всего попадают в пустой зазор без сдвига.',
      en: 'Achieves O(n log n) on average - significantly faster than plain insertion sort\'s O(n²), because insertions usually land in an empty gap without shifting.',
    },
    {
      ru: 'Хорошо подходит для онлайн-сортировки (когда элементы поступают по одному, а массив должен оставаться отсортированным в любой момент времени).',
      en: 'Well suited to online sorting (when elements arrive one at a time and the array must stay sorted at every point in time).',
    },
    {
      ru: 'Бинарный поиск позиции вставки делает каждую отдельную вставку логарифмической по числу сравнений, в отличие от линейного поиска в обычной сортировке вставками.',
      en: 'Binary-searching the insertion position makes each individual insertion logarithmic in comparisons, unlike the linear search in plain insertion sort.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти под массив с зазорами - не сортирует на месте.',
      en: 'Requires O(n) extra memory for the gapped array - does not sort in place.',
    },
    {
      ru: 'В худшем случае (например, при неудачном распределении вставок) деградирует до O(n²), как обычная сортировка вставками.',
      en: 'In the worst case (e.g., an unfavorable insertion pattern) it degrades to O(n²), just like plain insertion sort.',
    },
    {
      ru: 'Показанная реализация - упрощённый учебный вариант: полноценная библиотечная сортировка периодически перебалансирует зазоры логарифмическим числом эпох, тогда как здесь `rebalance()` вызывается по необходимости, что проще для понимания, но менее оптимально по константам.',
      en: 'The implementation shown is a simplified, educational variant: a full library sort rebalances gaps periodically across a logarithmic number of epochs, whereas here `rebalance()` is called on demand, which is easier to follow but less optimal in constants.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда элементы поступают по одному в реальном времени и в любой момент нужен доступ к отсортированному массиву (онлайн-сценарий), а полноценное дерево поиска - избыточно.',
      en: 'When elements arrive one at a time in real time and a sorted array is needed at any moment (an online scenario), but a full search tree would be overkill.',
    },
    {
      ru: 'Как учебный пример того, как компромисс «немного лишней памяти в обмен на меньше сдвигов» превращает O(n²) в ожидаемое O(n log n).',
      en: 'As a teaching example of how the "trade a bit of extra memory for fewer shifts" compromise turns O(n²) into an expected O(n log n).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Оригинальная статья Bender, Farach-Colton и Mosteiro (2004)** представила библиотечную сортировку как простую альтернативу балансированным деревьям поиска для задач поддержания отсортированного порядка при потоковой вставке элементов.',
      en: '**The original paper by Bender, Farach-Colton, and Mosteiro (2004)** introduced library sort as a simple alternative to balanced search trees for maintaining sorted order under streaming insertion.',
    },
    {
      ru: '**Структуры данных с «дырявыми» массивами (gapped/packed-memory arrays)** используются в базах данных и системах хранения столбцов для поддержания приблизительно отсортированного порядка без постоянной полной пересортировки.',
      en: '**Gapped/packed-memory array data structures** are used in databases and column-store systems to maintain approximately sorted order without constantly re-sorting everything from scratch.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проверим заявленную экономию на конкретном входе. Возьмём массив `[8, 3, 9, 1, 6, 4, 7, 2, 5]` (n = 9) - тот же, что используется на вкладке «Визуализация». При `capacity = max(9 * 2, 4) = 18` симуляция реализации из вкладки «Реализация» даёт: **17 сравнений** бинарного поиска и **21 операцию сдвига** на все 9 вставок вместе - в среднем 2.3 сдвига на вставку, а не 4-5, как было бы при линейном поиске места вставки в обычной сортировке вставками.',
        en: 'Let\'s check the claimed savings against a concrete input. Take the array `[8, 3, 9, 1, 6, 4, 7, 2, 5]` (n = 9) - the same one used on the "Visualization" tab. At `capacity = max(9 * 2, 4) = 18`, simulating the code from the "Implementation" tab gives: **17 binary-search comparisons** and **21 shift operations** across all 9 insertions combined - an average of 2.3 shifts per insertion, not the 4-5 a linear insertion-point search in plain insertion sort would cost.',
      },
      {
        ru: 'Число сдвигов сильно зависит от паттерна входа. На уже отсортированном `[1..9]` та же реализация делает **16 сравнений и 0 сдвигов** - каждый новый максимум просто дописывается в следующую пустую ячейку справа. На развороте `[9..1]` - **21 сравнение и 36 сдвигов** (в среднем 4 на вставку): каждый новый минимум должен протолкнуться через уже занятые ячейки к началу массива, зазоры на этой стороне быстро заканчиваются.',
        en: 'The shift count depends heavily on the input pattern. On the already-sorted `[1..9]`, the same code makes **16 comparisons and 0 shifts** - every new maximum simply lands in the next empty cell to the right. On the reversed `[9..1]` it takes **21 comparisons and 36 shifts** (4 per insertion on average): every new minimum has to push through already-occupied cells toward the start, and gaps on that side run out fast.',
      },
      {
        ru: 'Отсюда видно, откуда берётся средняя `O(n log n)`: бинарный поиск всегда стоит `O(log(число заполненных ячеек))`, независимо от порядка входа - это и даёт `16-21` сравнение на массиве из 9 элементов (`9 * log₂9 ≈ 9 * 3.17 ≈ 28.5` - верхняя оценка с запасом). Сдвиги же - переменная часть: при случайном или сортированном входе они в среднем `O(1)` на вставку благодаря равномерно распределённым зазорам, но могут вырасти до `O(n)` на вставку при систематически однонаправленном заполнении, как в развороте.',
        en: 'This shows where the average `O(n log n)` comes from: binary search always costs `O(log(filled cell count))`, regardless of input order - which is exactly the 16-21 comparisons seen on a 9-element array (`9 * log₂9 ≈ 9 * 3.17 ≈ 28.5` is a loose upper bound). Shifts are the variable part: on random or sorted input they average `O(1)` per insertion thanks to evenly spread gaps, but can grow to `O(n)` per insertion under systematically one-directional filling, as in the reversed case.',
      },
      {
        ru: 'Отдельный факт, который стоит проверить прямо в коде: при `capacity = Math.max(n * 2, 4)` (строка 5 на вкладке «Реализация») функция `rebalance()` не вызывается ни разу ни для одного из проверенных входов - ни для случайного, ни для отсортированного, ни для разворота, ни для массива из повторяющихся значений. Причина в арифметике: за весь проход `count` увеличивается максимум до `n`, а `capacity` не меньше `2n` (или 4), поэтому условие `count === capacity` (строка 31) никогда не выполняется, а значит массив никогда не заполняется полностью и найти свободную ячейку слева или справа удаётся всегда.',
        en: 'One specific fact worth checking directly against the code: at `capacity = Math.max(n * 2, 4)` (line 5 on the "Implementation" tab), `rebalance()` never gets called for any of the tested inputs - not the random one, not the sorted one, not the reversed one, not an array of repeated values. The reason is arithmetic: over the whole run `count` climbs to at most `n`, while `capacity` is never below `2n` (or 4), so the `count === capacity` condition (line 31) is never satisfied - the array never fills up completely, and a free cell to the left or right can always be found.',
      },
      {
        ru: 'Это отличает показанную реализацию от оригинального алгоритма из статьи Bender, Farach-Colton и Mosteiro (2004). Там ёмкость не фиксируется заранее с большим запасом - вместо этого используется схема «эпох»: массив периодически, раз в `O(log n)` вставок, полностью перестраивается с новой, растущей ёмкостью, что и даёт строгую амортизированную границу `O(log n)` на вставку в ожидании. Здесь же `rebalance()` оставлена как защитный код на случай другого выбора `capacity`, но при `capacity = 2n` она - мёртвый код: упрощение ради читаемости, отмеченное и в разделе «Минусы» на вкладке «Плюсы и минусы».',
        en: 'This is what separates the implementation shown from the original algorithm in Bender, Farach-Colton, and Mosteiro (2004). There, capacity isn\'t fixed upfront with a large margin - instead an "epoch" scheme is used: the array is fully rebuilt with a new, larger capacity once every `O(log n)` insertions, which is what gives the strict expected amortized `O(log n)`-per-insertion bound. Here `rebalance()` is left in as defensive code for a different capacity choice, but at `capacity = 2n` it is dead code - a readability trade-off, also flagged in the "Cons" section on the "Pros & Cons" tab.',
      },
      {
        ru: 'Худший случай `O(n²)` не исчезает из-за большой стартовой ёмкости - он просто требует другого паттерна, чем полное заполнение. Массив, где каждая новая вставка вынуждена сдвигать длинный хвост элементов (например, значения, поочерёдно чуть меньше и чуть больше уже вставленной середины, раз за разом упирающиеся в один и тот же занятый участок), даёт то же квадратичное поведение, что и обычная сортировка вставками, просто константа перед `n²` меньше благодаря зазорам.',
        en: 'The `O(n²)` worst case doesn\'t disappear because of the large starting capacity - it just needs a different pattern than a fully packed array. An input where every new insertion is forced to shift a long tail of elements (for instance, values alternating just below and just above an already-inserted midpoint, repeatedly running into the same occupied stretch) produces the same quadratic behavior as plain insertion sort, just with a smaller constant in front of `n²` thanks to the gaps.',
      },
      {
        ru: 'Библиотечную сортировку изобрели **Майкл Бендер, Мартин Фарак-Колтон и Мигель Мостейро** и опубликовали в 2004 году под названием «Insertion sort is O(n log n)» - намеренно провокационное название, обыгрывающее тот факт, что вставочная сортировка обычно ассоциируется исключительно с `O(n²)`. Их результат показал, что тот же базовый механизм (сравнить и вставить) при добавлении зазоров и периодической перестройки даёт логарифмический множитель в ожидании, оставаясь при этом онлайн-алгоритмом - в отличие от сортировок, которым нужен весь массив целиком заранее.',
        en: 'Library sort was invented by **Michael Bender, Martin Farach-Colton, and Miguel Mosteiro** and published in 2004 under the title "Insertion sort is O(n log n)" - a deliberately provocative title, playing on the fact that insertion sort is usually associated purely with `O(n²)`. Their result showed that the same basic mechanism (compare and insert), with gaps and periodic rebuilding added, gives an expected logarithmic factor while staying an online algorithm - unlike sorts that need the entire array upfront.',
      },
    ],
    whenToUse: [
      {
        ru: '**Против обычной сортировки вставками** - при одинаковой простоте реализации библиотечная сортировка выигрывает в константе на любом входе, кроме патологически однонаправленного заполнения; измеренные 21 сдвиг вместо потенциальных ~36 (как в развороте) на n = 9 показывают выигрыш уже на маленьких массивах.',
        en: '**Against plain insertion sort** - at similar implementation complexity, library sort wins on the constant factor for any input except pathologically one-directional filling; the measured 21 shifts instead of the potential ~36 (as in the reversed case) at n = 9 already show a win on small arrays.',
      },
      {
        ru: '**Против сбалансированного дерева поиска или skip list** - если нужен именно отсортированный массив (не абстрактная упорядоченная структура), библиотечная сортировка даёт лучшую локальность кэша за счёт непрерывной памяти, но без строгой гарантии `O(log n)` на вставку, которую даёт дерево.',
        en: '**Against a balanced search tree or a skip list** - if a genuinely sorted array is needed (not an abstract ordered structure), library sort gives better cache locality thanks to contiguous memory, but without the strict `O(log n)`-per-insertion guarantee a tree provides.',
      },
      {
        ru: '**При выборе размера начальной ёмкости** - как показано в разборе выше, `capacity = 2n` делает `rebalance()` практически недостижимым; для настоящей амортизированной гарантии `O(log n)` нужна более плотная ёмкость (например, `1.1n`) вместе с периодической перестройкой по эпохам, а не только «по требованию».',
        en: '**When choosing the initial capacity** - as shown in the deep-dive above, `capacity = 2n` makes `rebalance()` practically unreachable; a genuine amortized `O(log n)` guarantee needs a tighter capacity (e.g. `1.1n`) combined with periodic epoch-based rebuilding, not only "on demand".',
      },
      {
        ru: '**Не выбирать при систематически враждебном порядке вставки** - если входной поток гарантированно однонаправленный (например, постоянно новые минимумы), сдвиги растут до `O(n)` на вставку и суммарная сложность деградирует к `O(n²)`, как измерено на развороте `[9..1]` выше.',
        en: '**Don\'t pick it for a systematically adversarial insertion order** - if the input stream is guaranteed one-directional (e.g. a constant stream of new minimums), shifts grow to `O(n)` per insertion and the total complexity degrades to `O(n²)`, as measured on the reversed `[9..1]` case above.',
      },
    ],
    realWorld: [
      {
        ru: '**Курс MIT 6.851 «Advanced Data Structures»** использует библиотечную сортировку как канонический пример амортизированного анализа онлайн-структур данных - демонстрация того, как небольшая избыточность памяти превращает `O(n²)` в ожидаемое `O(n log n)`.',
        en: '**MIT\'s 6.851 "Advanced Data Structures" course** uses library sort as a canonical example of amortized analysis for online data structures - a demonstration of how a small memory overhead turns `O(n²)` into expected `O(n log n)`.',
      },
      {
        ru: '**Gap buffer в текстовых редакторах** (Emacs и многие другие) применяет ту же базовую идею - один большой зазор в месте курсора вместо распределённых по всему буферу, чтобы редактирование рядом с курсором стоило `O(1)`, а не сдвига всего текста.',
        en: '**Gap buffers in text editors** (Emacs and many others) use the same underlying idea - one large gap at the cursor position instead of gaps spread across the buffer, so editing near the cursor costs `O(1)` rather than shifting the entire text.',
      },
      {
        ru: '**Система потоковой обработки графов Aspen** (Dhulipala, Blelloch, Shun) использует массивы с зазорами (packed-memory arrays) в том же духе, что и библиотечная сортировка, для поддержания отсортированных списков смежности под непрерывным потоком обновлений графа.',
        en: '**The Aspen streaming graph-processing system** (Dhulipala, Blelloch, Shun) uses gapped arrays (packed-memory arrays) in the same spirit as library sort to maintain sorted adjacency lists under a continuous stream of graph updates.',
      },
      {
        ru: '**Материалы для подготовки к собеседованиям и статьи по анализу алгоритмов** регулярно разбирают библиотечную сортировку как пример компромисса «память в обмен на скорость» - на нём удобно показывать разницу между худшим и ожидаемым случаем при неслучайном входе.',
        en: '**Interview-prep material and algorithm-analysis write-ups** regularly cover library sort as an example of a "memory for speed" trade-off - it\'s a convenient case for illustrating the gap between worst-case and expected-case behavior under non-random input.',
      },
    ],
  },

  relatedAlgorithms: ['insertion-sort', 'block-sort'],

  quiz: [
    {
      question: {
        ru: 'Какова главная идея библиотечной сортировки?',
        en: 'What is the core idea of library sort?',
      },
      options: [
        {
          ru: 'Оставлять пустые зазоры между элементами, чтобы вставка требовала меньше сдвигов',
          en: 'Leave empty gaps between elements so insertion needs fewer shifts',
        },
        { ru: 'Сортировать элементы по алфавиту названий, как это делают некоторые табличные редакторы при сравнении строк', en: 'Sort elements by the alphabetical order of their names, similar to how some spreadsheet tools compare strings' },
        { ru: 'Делить массив на страницы фиксированного размера и сортировать каждую страницу по отдельности перед слиянием', en: 'Split the array into fixed-size pages and sort each page separately before merging them back' },
        { ru: 'Использовать хеш-таблицу вместо массива, чтобы вставка происходила за постоянное время без сравнений', en: 'Use a hash table instead of an array so insertion happens in constant time without comparisons' },
      ],
      correct: 0,
      explanation: {
        ru: 'Свободные зазоры позволяют чаще всего вставлять новый элемент без сдвига большого числа соседей, как в обычной сортировке вставками.',
        en: 'Free gaps usually let a new element be inserted without shifting a large number of neighbors, unlike plain insertion sort.',
      },
      hint: {
        ru: 'Смотрите подраздел «Проблема» на вкладке «Суть» (аналогия с библиотечной полкой) и шаг «Вставить в зазор» на вкладке «Визуализация».',
        en: 'See the "Problem" subsection on the "Intent" tab (the library shelf analogy) and the "Insert into a gap" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда рядом с целевой позицией не остаётся свободных зазоров?',
        en: 'What happens when no free gaps remain near the target position?',
      },
      options: [
        { ru: 'Выполняется rebalance() - элементы перераспределяются в массиве большей ёмкости', en: 'A rebalance() runs - elements are redistributed into a larger-capacity array' },
        { ru: 'Вставка данного элемента просто отменяется и полностью пропускается без каких-либо последствий', en: 'The insertion of that element is simply cancelled and skipped entirely without consequence' },
        { ru: 'Весь массив целиком пересортировывается заново с нуля обычной пузырьковой сортировкой', en: 'The entire array is completely re-sorted from scratch using plain bubble sort' },
        { ru: 'Элемент вместо этого добавляется в отдельный, никак не связанный вспомогательный массив', en: 'The element is instead added to a separate, entirely unrelated auxiliary array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Перебалансировка равномерно распределяет все текущие элементы по новому, увеличенному массиву, снова создавая зазоры.',
        en: 'Rebalancing evenly spreads all current elements across a new, larger array, recreating the gaps.',
      },
      hint: {
        ru: 'Смотрите шаг «Перебалансировать при заполнении» на вкладке «Визуализация» и строки 15-24 функции `librarySort` (`rebalance()`) на вкладке «Реализация».',
        en: 'See the "Rebalance when full" step on the "Visualization" tab and lines 15-24 of `librarySort` (`rebalance()`) on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Как ищется позиция вставки среди заполненных ячеек?',
        en: 'How is the insertion position found among the filled cells?',
      },
      options: [
        { ru: 'Бинарным поиском', en: 'Via binary search' },
        { ru: 'Линейным перебором с конца массива', en: 'Via a linear scan from the end of the array' },
        { ru: 'Случайным выбором с последующей проверкой', en: 'By random selection followed by a check' },
        { ru: 'Позиция всегда фиксирована в середине массива', en: 'The position is always fixed at the middle of the array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Заполненные ячейки в любой момент отсортированы между собой, поэтому бинарный поиск находит нужную позицию за логарифмическое число сравнений.',
        en: 'The filled cells are always sorted relative to each other, so binary search finds the right position in a logarithmic number of comparisons.',
      },
      hint: {
        ru: 'Смотрите шаг «Найти позицию бинарным поиском» на вкладке «Визуализация» и строки 36-42 функции `librarySort` на вкладке «Реализация».',
        en: 'See the "Find the position via binary search" step on the "Visualization" tab and lines 36-42 of `librarySort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова средняя временная сложность библиотечной сортировки?',
        en: 'What is the average time complexity of library sort?',
      },
      options: [
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n²) всегда', en: 'Always O(n²)' },
        { ru: 'O(log n)', en: 'O(log n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Благодаря зазорам большинство вставок обходится без сдвига, а позиция ищется бинарным поиском, что в среднем даёт O(n log n).',
        en: 'Thanks to the gaps, most insertions avoid shifting, and the position is found via binary search, giving O(n log n) on average.',
      },
      hint: {
        ru: 'Смотрите бейдж «Средний» вверху страницы и первый абзац раздела «Как это работает» на вкладке «Суть» (17 сравнений на 9 вставок).',
        en: 'See the "Average" complexity badge at the top of the page and the first paragraph of the "How it works" section on the "Intent" tab (17 comparisons for 9 insertions).',
      },
    },
    {
      question: {
        ru: 'Требует ли библиотечная сортировка дополнительной памяти сверх исходного массива?',
        en: 'Does library sort require extra memory beyond the original array?',
      },
      options: [
        { ru: 'Да, O(n) - массив с зазорами больше исходного числа элементов', en: 'Yes, O(n) - the gapped array is larger than the original element count' },
        { ru: 'Нет, сортирует строго на месте, не выделяя вообще ни одной дополнительной ячейки', en: 'No, it sorts strictly in place without allocating a single extra cell at all' },
        { ru: 'Да, но требуется лишь незначительный логарифмический объём O(log n)', en: 'Yes, but it only ever requires a small logarithmic amount, O(log n)' },
        { ru: 'Нет, вся работа выполняется исключительно в регистрах процессора', en: 'No, all of the work is performed exclusively within CPU registers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Массив с зазорами создаётся с ёмкостью в несколько раз больше числа элементов, что и даёт линейный по n дополнительный расход памяти.',
        en: 'The gapped array is allocated with capacity several times the element count, which is exactly the linear-in-n extra memory cost.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и строку 5 (`capacity = Math.max(n * 2, 4)`) функции `librarySort` на вкладке «Реализация».',
        en: 'See the "Space" complexity badge at the top of the page and line 5 (`capacity = Math.max(n * 2, 4)`) of `librarySort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли библиотечная сортировка устойчивой (stable)?',
        en: 'Is library sort stable?',
      },
      options: [
        { ru: 'Да, равные элементы сохраняют исходный порядок благодаря левостороннему бинарному поиску', en: 'Yes, equal elements keep their original relative order thanks to left-biased binary search' },
        { ru: 'Нет, зазоры перемешивают равные элементы непредсказуемым образом при каждой перебалансировке', en: 'No, gaps shuffle equal elements unpredictably during every rebalance, so the original order is lost' },
        { ru: 'Нет, библиотечная сортировка устойчива только для целочисленных массивов без повторений', en: 'No, library sort is stable only for integer arrays with no repeated values' },
        { ru: 'Это зависит от реализации и не гарантируется стандартом алгоритма', en: 'It depends on the implementation and isn\'t guaranteed by the algorithm\'s specification' },
      ],
      correct: 0,
      explanation: {
        ru: 'При использовании левостороннего (lower-bound) бинарного поиска новый элемент встаёт перед равными ему - это стандартный приём, обеспечивающий устойчивость вставочных алгоритмов.',
        en: 'With a left-biased (lower-bound) binary search, the new element is placed before equal ones - a standard technique for making insertion-based algorithms stable.',
      },
      hint: {
        ru: 'Смотрите строку 40 (`if (a[idxs[mid]] < value) lo = mid + 1;`) функции `librarySort` на вкладке «Реализация» - куда попадает `value`, равный уже стоящему элементу?',
        en: 'See line 40 (`if (a[idxs[mid]] < value) lo = mid + 1;`) of `librarySort` on the "Implementation" tab - where does a `value` equal to an existing element land?',
      },
    },
    {
      question: {
        ru: 'Как библиотечная сортировка ведёт себя на уже отсортированном входе?',
        en: 'How does library sort behave on an already-sorted input?',
      },
      options: [
        { ru: 'O(n log n) - бинарный поиск всё равно нужен, хотя сдвиги редки', en: 'O(n log n) - binary search is still needed, though shifts are rare' },
        { ru: 'O(n) - каждый элемент попадает в пустой зазор прямо за последним, без поиска', en: 'O(n) - each element falls into the empty gap right after the last, needing no search' },
        { ru: 'O(n²) - отсортированный вход всегда является худшим случаем для этого алгоритма', en: 'O(n²) - sorted input is always the worst case for this algorithm' },
        { ru: 'O(1) - алгоритм сразу обнаруживает упорядоченность и завершает работу', en: 'O(1) - the algorithm immediately detects order and terminates' },
      ],
      correct: 0,
      explanation: {
        ru: 'Бинарный поиск выполняется на каждой вставке независимо от порядка входа, давая O(log n) на вставку и O(n log n) суммарно.',
        en: 'Binary search is performed on each insertion regardless of input order, giving O(log n) per insertion and O(n log n) total.',
      },
      hint: {
        ru: 'Смотрите бейдж «Лучший» вверху страницы и второй абзац раздела «Как это работает» на вкладке «Суть» (16 сравнений и 0 сдвигов на отсортированном входе).',
        en: 'See the "Best" complexity badge at the top of the page and the second paragraph of the "How it works" section on the "Intent" tab (16 comparisons and 0 shifts on sorted input).',
      },
    },
    {
      question: {
        ru: 'Чем библиотечная сортировка концептуально похожа на работу настоящего библиотекаря?',
        en: 'How is library sort conceptually similar to what a real librarian does?',
      },
      options: [
        { ru: 'Оба оставляют пустые места на полке, чтобы вставить новую книгу без сдвига всех остальных', en: 'Both leave empty slots on the shelf to fit a new book without moving all the others' },
        { ru: 'Оба сортируют книги исключительно по числу страниц, а не по алфавиту или другому критерию', en: 'Both sort books purely by page count rather than alphabetically or by any other criterion' },
        { ru: 'Оба удаляют книги из середины полки и добавляют их снова в конец при каждой операции', en: 'Both remove books from the middle of a shelf and re-add them to the end on every operation' },
        { ru: 'Оба используют хеш-функцию, чтобы сразу определить точную позицию каждой новой книги', en: 'Both use a hash function to immediately determine the exact position of each new book' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оставленные промежутки на полке - это и есть ключевая аналогия, давшая алгоритму название.',
        en: 'The deliberate gaps left on the shelf are the key analogy that gave the algorithm its name.',
      },
      hint: {
        ru: 'Смотрите вступительный абзац (intent) в самом начале вкладки «Суть», под подзаголовком с названием алгоритма.',
        en: 'See the opening (intent) paragraph at the very top of the "Intent" tab, right under the algorithm name.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность библиотечной сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of library sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(n log² n)', en: 'O(n log² n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'При неудачном паттерне вставок зазоры исчезают быстро, частые перебалансировки накапливают O(n) работу, и суммарная сложность деградирует до O(n²).',
        en: 'Under an unfavorable insertion pattern, gaps disappear quickly, frequent rebalances accumulate O(n) work each, and the total complexity degrades to O(n²).',
      },
      hint: {
        ru: 'Смотрите бейдж «Худший» вверху страницы и шестой абзац раздела «Как это работает» на вкладке «Суть» (паттерн, вынуждающий длинные сдвиги).',
        en: 'See the "Worst" complexity badge at the top of the page and the sixth paragraph of the "How it works" section on the "Intent" tab (the pattern that forces long shifts).',
      },
    },
    {
      question: {
        ru: 'Какой сценарий использования наиболее подходит для библиотечной сортировки?',
        en: 'Which usage scenario suits library sort best?',
      },
      options: [
        { ru: 'Онлайн-сортировка: элементы поступают по одному и массив должен оставаться отсортированным', en: 'Online sorting where elements arrive one at a time and the array must stay sorted' },
        { ru: 'Параллельная сортировка больших массивов на многоядерном процессоре без дополнительной памяти', en: 'Parallel sorting of large arrays on a multicore processor, distributing work without any extra shared memory' },
        { ru: 'Сортировка массивов с очень большим числом дубликатов методом подсчёта их частот', en: 'Sorting arrays with many duplicates by counting their frequencies' },
        { ru: 'Внешняя сортировка данных, не умещающихся в оперативной памяти, с помощью диска', en: 'External sorting of data that doesn\'t fit in RAM, using disk storage' },
      ],
      correct: 0,
      explanation: {
        ru: 'Вставка по одному элементу при поддержании отсортированного массива - именно тот сценарий, для которого библиотечная сортировка разрабатывалась.',
        en: 'Inserting elements one at a time while keeping the array sorted is precisely the scenario library sort was designed for.',
      },
      hint: {
        ru: 'Смотрите первый пункт раздела «Нюансы выбора» (углублённого, на вкладке «Суть») и раздел «Когда применять» там же.',
        en: 'See the first item in the extended "Nuances of choice" section on the "Intent" tab and the "When to use" section there as well.',
      },
    },
  ],
};

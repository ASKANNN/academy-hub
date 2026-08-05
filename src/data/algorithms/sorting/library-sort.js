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
    ru: 'Библиотечная сортировка (или gapped insertion sort) — вставочная сортировка, которая держит между элементами свободные «зазоры», чтобы вставка нового элемента чаще всего не требовала сдвигать большой хвост массива, как в обычной сортировке вставками, а находила себе пустое место рядом.',
    en: 'Library sort (also called gapped insertion sort) is an insertion sort variant that keeps free "gaps" between elements so that inserting a new element usually doesn\'t require shifting a long tail of the array, as in plain insertion sort, but instead finds an empty slot nearby.',
  },

  problem: {
    ru: 'В обычной сортировке вставками, чтобы вставить элемент в уже отсортированную часть массива, приходится физически сдвигать вправо все элементы, которые окажутся после него — в среднем это O(n) сдвигов на одну вставку. Идея похожа на то, как библиотекарь расставляет книги на полке: если книги стоят вплотную друг к другу, вставка новой книги в середину требует подвинуть все книги после неё. Но если между книгами оставлены небольшие промежутки — совсем как настоящие библиотекари специально оставляют место на полках для новых поступлений, — вставку чаще всего можно сделать, просто задвинув книгу в ближайший пустой промежуток.',
    en: 'In plain insertion sort, inserting an element into the already-sorted portion of the array means physically shifting every element that ends up after it — on average O(n) shifts per insertion. This mirrors how a librarian shelves books: if books sit flush against each other, inserting a new one in the middle means moving every book after it. But if small gaps are left between books — much like real librarians deliberately leave room on shelves for new arrivals — the insertion can usually be done by simply sliding the book into the nearest empty gap.',
  },

  solution: {
    ru: 'Элементы хранятся в массиве вдвое большего размера (`capacity`), где часть ячеек пуста (`null`) — это и есть «зазоры», равномерно распределённые между заполненными элементами. Чтобы вставить новый элемент: бинарным поиском среди заполненных ячеек находится позиция, куда он должен встать по порядку; если целевая ячейка пуста — элемент просто кладётся туда; если занята — элементы сдвигаются по направлению к ближайшему свободному зазору (вправо или влево), освобождая нужное место. Когда зазоры вокруг какого-то участка заканчиваются (массив заполняется или сдвигать больше некуда), выполняется `rebalance()` — все текущие элементы перераспределяются заново, равномерно, в массиве увеличенной ёмкости.',
    en: 'Elements live in an array of double the needed size (`capacity`), where some cells are empty (`null`) — these are the "gaps," spread evenly between the filled elements. To insert a new element: binary search among the filled cells finds where it belongs in order; if the target cell is empty, the element is simply placed there; if occupied, elements are shifted toward the nearest free gap (right or left) to open up the needed space. When the gaps around some region run out (the array fills up or there\'s nowhere left to shift), a `rebalance()` step redistributes all current elements evenly across an array of increased capacity.',
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

  pros: [
    {
      ru: 'В среднем случае обеспечивает O(n log n) — существенно быстрее, чем O(n²) у обычной сортировки вставками, за счёт того, что вставки чаще всего попадают в пустой зазор без сдвига.',
      en: 'Achieves O(n log n) on average — significantly faster than plain insertion sort\'s O(n²), because insertions usually land in an empty gap without shifting.',
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
      ru: 'Требует O(n) дополнительной памяти под массив с зазорами — не сортирует на месте.',
      en: 'Requires O(n) extra memory for the gapped array — does not sort in place.',
    },
    {
      ru: 'В худшем случае (например, при неудачном распределении вставок) деградирует до O(n²), как обычная сортировка вставками.',
      en: 'In the worst case (e.g., an unfavorable insertion pattern) it degrades to O(n²), just like plain insertion sort.',
    },
    {
      ru: 'Показанная реализация — упрощённый учебный вариант: полноценная библиотечная сортировка периодически перебалансирует зазоры логарифмическим числом эпох, тогда как здесь `rebalance()` вызывается по необходимости, что проще для понимания, но менее оптимально по константам.',
      en: 'The implementation shown is a simplified, educational variant: a full library sort rebalances gaps periodically across a logarithmic number of epochs, whereas here `rebalance()` is called on demand, which is easier to follow but less optimal in constants.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда элементы поступают по одному в реальном времени и в любой момент нужен доступ к отсортированному массиву (онлайн-сценарий), а полноценное дерево поиска — избыточно.',
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
        ru: 'Вспомните аналогию с библиотечной полкой: что упрощает работу библиотекаря при добавлении новой книги?',
        en: 'Think of the library shelf analogy: what makes a librarian\'s job easier when adding a new book?',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда рядом с целевой позицией не остаётся свободных зазоров?',
        en: 'What happens when no free gaps remain near the target position?',
      },
      options: [
        { ru: 'Выполняется rebalance() — элементы перераспределяются в массиве большей ёмкости', en: 'A rebalance() runs — elements are redistributed into a larger-capacity array' },
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
        ru: 'Когда на полке кончается место, библиотекарь переставляет книги на полку большего размера — что происходит в алгоритме?',
        en: 'When a shelf runs out of space, the librarian moves to a bigger shelf — what does the algorithm do?',
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
        ru: 'Заполненные ячейки всегда отсортированы — какой метод поиска работает быстрее всего на отсортированном наборе?',
        en: 'The filled cells are always sorted — which search method is fastest on a sorted set?',
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
        ru: 'Бинарный поиск даёт O(log n) на вставку, а n вставок суммируются до какой сложности?',
        en: 'Binary search gives O(log n) per insertion — what does that sum to for n insertions?',
      },
    },
    {
      question: {
        ru: 'Требует ли библиотечная сортировка дополнительной памяти сверх исходного массива?',
        en: 'Does library sort require extra memory beyond the original array?',
      },
      options: [
        { ru: 'Да, O(n) — массив с зазорами больше исходного числа элементов', en: 'Yes, O(n) — the gapped array is larger than the original element count' },
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
        ru: 'Зазоры — это пустые ячейки в массиве большего размера: больше ли такой массив исходного, и насколько?',
        en: 'Gaps are empty slots in a larger array — is that array bigger than the input, and by how much?',
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
        ru: 'При использовании левостороннего (lower-bound) бинарного поиска новый элемент встаёт перед равными ему — это стандартный приём, обеспечивающий устойчивость вставочных алгоритмов.',
        en: 'With a left-biased (lower-bound) binary search, the new element is placed before equal ones — a standard technique for making insertion-based algorithms stable.',
      },
      hint: {
        ru: 'Подумайте о том, куда именно ставится новый элемент относительно уже существующих равных ему при корректном бинарном поиске.',
        en: 'Think about exactly where a new element lands relative to existing equal ones under a proper binary search.',
      },
    },
    {
      question: {
        ru: 'Как библиотечная сортировка ведёт себя на уже отсортированном входе?',
        en: 'How does library sort behave on an already-sorted input?',
      },
      options: [
        { ru: 'O(n log n) — бинарный поиск всё равно нужен, хотя сдвиги редки', en: 'O(n log n) — binary search is still needed, though shifts are rare' },
        { ru: 'O(n) — каждый элемент попадает в пустой зазор прямо за последним, без поиска', en: 'O(n) — each element falls into the empty gap right after the last, needing no search' },
        { ru: 'O(n²) — отсортированный вход всегда является худшим случаем для этого алгоритма', en: 'O(n²) — sorted input is always the worst case for this algorithm' },
        { ru: 'O(1) — алгоритм сразу обнаруживает упорядоченность и завершает работу', en: 'O(1) — the algorithm immediately detects order and terminates' },
      ],
      correct: 0,
      explanation: {
        ru: 'Бинарный поиск выполняется на каждой вставке независимо от порядка входа, давая O(log n) на вставку и O(n log n) суммарно.',
        en: 'Binary search is performed on each insertion regardless of input order, giving O(log n) per insertion and O(n log n) total.',
      },
      hint: {
        ru: 'Алгоритм всегда выполняет бинарный поиск — исчезает ли он на отсортированном входе?',
        en: 'The algorithm always runs binary search — does that disappear on sorted input?',
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
        ru: 'Оставленные промежутки на полке — это и есть ключевая аналогия, давшая алгоритму название.',
        en: 'The deliberate gaps left on the shelf are the key analogy that gave the algorithm its name.',
      },
      hint: {
        ru: 'Что делает опытный библиотекарь, чтобы не двигать сотни книг при добавлении каждой новой?',
        en: 'What does an experienced librarian do to avoid moving hundreds of books when adding a new one?',
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
        ru: 'Что происходит, если зазоры постоянно заканчиваются и rebalance() вызывается очень часто?',
        en: 'What happens if gaps run out constantly and rebalance() is called very often?',
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
        ru: 'Вставка по одному элементу при поддержании отсортированного массива — именно тот сценарий, для которого библиотечная сортировка разрабатывалась.',
        en: 'Inserting elements one at a time while keeping the array sorted is precisely the scenario library sort was designed for.',
      },
      hint: {
        ru: 'Алгоритм вставляет элементы по одному — для каких задач это является естественным требованием?',
        en: 'The algorithm inserts elements one at a time — for what tasks is that a natural requirement?',
      },
    },
  ],
};

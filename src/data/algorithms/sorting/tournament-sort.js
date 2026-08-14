export const tournamentSort = {
  slug: 'tournament-sort',
  category: 'sorting',
  name: { ru: 'Tournament Sort', en: 'Tournament Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['comparison', 'not-in-place', 'unstable', 'heap-based'],

  intent: {
    ru: 'Турнирная сортировка - вариант сортировки выбором, который находит минимум не за O(n) линейным проходом, а за O(log n) с помощью бинарного дерева турнира, где каждый внутренний узел хранит «победителя» сравнения своих потомков.',
    en: 'Tournament sort is a variant of selection sort that finds the minimum not with an O(n) linear scan but in O(log n) using a binary tournament tree, where every internal node stores the "winner" of its children\'s comparison.',
  },

  problem: {
    ru: 'Обычная сортировка выбором находит минимум оставшейся части массива за O(n) проходом, повторяя это n раз, что даёт O(n²). При этом информация о сравнениях, сделанных на предыдущем проходе, полностью выбрасывается - на следующем проходе всё сравнивается заново. Нужен способ переиспользовать результаты прошлых сравнений, чтобы находить следующий минимум быстрее.',
    en: 'Plain selection sort finds the minimum of the remaining array with an O(n) scan, repeated n times, for O(n²) total. The comparisons made on one pass are thrown away entirely - the next pass compares everything again from scratch. A way to reuse the results of past comparisons is needed to find the next minimum faster.',
  },

  solution: {
    ru: 'Все элементы становятся листьями полного бинарного дерева (дерева турнира). Каждый внутренний узел хранит индекс «победителя» - меньшего из двух потомков, как в турнирной сетке на выбывание. Корень дерева всегда содержит глобальный минимум. После извлечения минимума его лист заменяется на +∞, и обновить дерево нужно только вдоль пути от этого листа до корня - O(log n) вместо O(n). Повторяя это n раз, получаем полностью отсортированный массив за O(n log n).',
    en: 'All elements become leaves of a complete binary tree (the tournament tree). Every internal node stores the index of the "winner" - the smaller of its two children - like a single-elimination tournament bracket. The tree\'s root always holds the global minimum. After extracting the minimum, its leaf is replaced with +∞, and only the path from that leaf to the root needs updating - O(log n) instead of O(n). Repeating this n times yields a fully sorted array in O(n log n).',
  },

  steps: [
    {
      title: { ru: 'Построить дерево турнира', en: 'Build the tournament tree' },
      explanation: {
        ru: 'Разместить элементы массива в листьях полного бинарного дерева (дополнив фиктивными +∞ до степени двойки), затем снизу вверх вычислить победителя в каждом внутреннем узле.',
        en: 'Place the array elements in the leaves of a complete binary tree (padded with dummy +∞ leaves to a power of two), then compute the winner of each internal node bottom-up.',
      },
    },
    {
      title: { ru: 'Извлечь корень', en: 'Extract the root' },
      explanation: {
        ru: 'Корень дерева содержит индекс листа с минимальным значением во всём массиве - записать это значение в результат.',
        en: 'The tree\'s root holds the index of the leaf with the minimum value in the whole array - write that value to the result.',
      },
    },
    {
      title: { ru: 'Заменить лист на +∞', en: 'Replace the leaf with +∞' },
      explanation: {
        ru: 'Значение только что извлечённого листа заменяется на +∞, чтобы он больше не мог победить ни в одном сравнении.',
        en: 'The value at the just-extracted leaf is set to +∞ so it can never win another comparison.',
      },
    },
    {
      title: { ru: 'Пересчитать путь до корня', en: 'Recompute the path to the root' },
      explanation: {
        ru: 'Двигаясь от изменённого листа вверх, пересчитать победителя в каждом предке на пути - всего O(log n) сравнений.',
        en: 'Walking up from the changed leaf, recompute the winner at each ancestor on the path - only O(log n) comparisons total.',
      },
    },
    {
      title: { ru: 'Повторить n раз', en: 'Repeat n times' },
      explanation: {
        ru: 'Повторять извлечение корня и пересчёт пути, пока все элементы не будут извлечены в отсортированном порядке.',
        en: 'Repeat extracting the root and recomputing the path until every element has been extracted in sorted order.',
      },
    },
  ],
  stepBreakpoints: [12, 17, 25, 38],

  implementation: {
    javascript: `function tournamentSort(arr) {
  const n = arr.length;
  const output = [...arr];
  if (n <= 1) return output;

  let size = 1;
  while (size < n) size *= 2;
  const INF = Infinity;
  const leaves = new Array(size).fill(INF);
  for (let i = 0; i < n; i++) leaves[i] = arr[i];

  const winner = new Array(2 * size - 1).fill(-1);
  for (let i = 0; i < size; i++) winner[size - 1 + i] = i;

  for (let node = size - 2; node >= 0; node--) {
    const left = winner[node * 2 + 1];
    const right = winner[node * 2 + 2];
    winner[node] = leaves[left] <= leaves[right] ? left : right;
  }

  function rebuildFrom(leafSlot) {
    let node = size - 1 + leafSlot;
    while (node > 0) {
      const parent = Math.floor((node - 1) / 2);
      const left = winner[parent * 2 + 1];
      const right = winner[parent * 2 + 2];
      winner[parent] = leaves[left] <= leaves[right] ? left : right;
      node = parent;
    }
  }

  for (let outPos = 0; outPos < n; outPos++) {
    const champion = winner[0];
    output[outPos] = leaves[champion];
    leaves[champion] = INF;
    rebuildFrom(champion);
  }
  return output;
}`,
    python: `def tournament_sort(arr):
    n = len(arr)
    output = arr.copy()
    if n <= 1:
        return output

    size = 1
    while size < n:
        size *= 2
    INF = float('inf')
    leaves = [INF] * size
    for i in range(n):
        leaves[i] = arr[i]

    winner = [-1] * (2 * size - 1)
    for i in range(size):
        winner[size - 1 + i] = i

    for node in range(size - 2, -1, -1):
        left = winner[node * 2 + 1]
        right = winner[node * 2 + 2]
        winner[node] = left if leaves[left] <= leaves[right] else right

    def rebuild_from(leaf_slot):
        node = size - 1 + leaf_slot
        while node > 0:
            parent = (node - 1) // 2
            left = winner[parent * 2 + 1]
            right = winner[parent * 2 + 2]
            winner[parent] = left if leaves[left] <= leaves[right] else right
            node = parent

    for out_pos in range(n):
        champion = winner[0]
        output[out_pos] = leaves[champion]
        leaves[champion] = INF
        rebuild_from(champion)

    return output`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 4],
        title: { ru: 'Сигнатура и краевой случай', en: 'Signature and edge case' },
        explanation: {
          ru: 'Копируем вход в `output`; массив из 0-1 элементов уже отсортирован и возвращается сразу, без построения дерева.',
          en: 'The input is copied into `output`; an array of 0-1 elements is already sorted and returned immediately, without building a tree.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Дополнение до степени двойки', en: 'Padding to a power of two' },
        explanation: {
          ru: '`size` увеличивается вдвое, пока не станет ≥ n - только со степенью двойки дерево получается полным бинарным без "дыр".',
          en: '`size` doubles until it reaches ≥ n - only with a power of two does the tree come out as a complete binary tree without gaps.',
        },
      },
      {
        lines: [8, 10],
        title: { ru: 'Заполнение листьев', en: 'Filling the leaves' },
        explanation: {
          ru: 'Реальные элементы копируются в первые n листьев, остальные заполняются `+∞` - фиктивный лист никогда не побеждает в сравнении.',
          en: 'Real elements are copied into the first n leaves; the rest are filled with `+∞` - a dummy leaf never wins a comparison.',
        },
      },
      {
        lines: [12, 13],
        title: { ru: 'Массив победителей и листья-указатели', en: 'The winner array and leaf pointers' },
        explanation: {
          ru: '`winner` хранит для каждого узла индекс листа-победителя (не значение); для листовых позиций дерева победитель - это сам лист.',
          en: '`winner` stores, for every node, the index of the winning leaf (not the value itself); for leaf positions of the tree, the winner is the leaf itself.',
        },
      },
      {
        lines: [15, 19],
        title: { ru: 'Построение дерева за один проход', en: 'Building the tree in a single pass' },
        explanation: {
          ru: 'Цикл идёт от последнего внутреннего узла (`size - 2`) до корня (`0`) - у любого узла с таким индексом оба потомка уже вычислены раньше в этом же проходе, поэтому каждый узел считается ровно один раз, без повторных обходов пути. Итого O(n) вместо O(n log n) при пересчёте каждого листа отдельно.',
          en: 'The loop runs from the last internal node (`size - 2`) down to the root (`0`) - any node with that index already has both children computed earlier in the same pass, so every node is computed exactly once, with no repeated path walks. Total O(n), instead of O(n log n) from recomputing each leaf\'s path separately.',
        },
      },
      {
        lines: [21, 30],
        title: { ru: 'rebuildFrom - точечное обновление пути', en: 'rebuildFrom - a targeted path update' },
        explanation: {
          ru: 'После изменения одного листа эта функция пересчитывает только предков вдоль пути от него до корня - O(log n), в отличие от полного построения выше.',
          en: 'After a single leaf changes, this function recomputes only the ancestors along the path to the root - O(log n), unlike the full build above.',
        },
      },
      {
        lines: [32, 37],
        title: { ru: 'Извлечение и обновление n раз', en: 'Extracting and updating n times' },
        explanation: {
          ru: 'Корень (`winner[0]`) даёт текущий минимум; его лист "выключается" через `+∞`, а `rebuildFrom` восстанавливает дерево за O(log n) - n таких извлечений дают O(n log n).',
          en: 'The root (`winner[0]`) gives the current minimum; its leaf is "switched off" via `+∞`, and `rebuildFrom` restores the tree in O(log n) - n such extractions give O(n log n).',
        },
      },
    ],
    python: [
      {
        lines: [1, 5],
        title: { ru: 'Сигнатура и краевой случай', en: 'Signature and edge case' },
        explanation: {
          ru: 'Вход копируется в `output`; список из 0-1 элементов уже отсортирован и возвращается сразу.',
          en: 'The input is copied into `output`; a list of 0-1 elements is already sorted and returned immediately.',
        },
      },
      {
        lines: [7, 9],
        title: { ru: 'Дополнение до степени двойки', en: 'Padding to a power of two' },
        explanation: {
          ru: '`size` удваивается, пока не станет ≥ n, чтобы дерево получилось полным бинарным.',
          en: '`size` doubles until it reaches ≥ n, so the tree comes out as a complete binary tree.',
        },
      },
      {
        lines: [10, 13],
        title: { ru: 'Заполнение листьев', en: 'Filling the leaves' },
        explanation: {
          ru: 'Реальные элементы попадают в первые n листьев, остальные заполняются `float(\'inf\')` - фиктивные листья, которые не могут выиграть сравнение.',
          en: 'Real elements go into the first n leaves; the rest are filled with `float(\'inf\')` - dummy leaves that can never win a comparison.',
        },
      },
      {
        lines: [15, 17],
        title: { ru: 'Массив победителей и листья-указатели', en: 'The winner array and leaf pointers' },
        explanation: {
          ru: '`winner` хранит индекс листа-победителя для каждого узла; листовые позиции дерева изначально указывают сами на себя.',
          en: '`winner` stores the index of the winning leaf for each node; the tree\'s leaf positions initially point to themselves.',
        },
      },
      {
        lines: [19, 22],
        title: { ru: 'Построение дерева за один проход', en: 'Building the tree in a single pass' },
        explanation: {
          ru: 'Цикл идёт от `size - 2` вниз до `0`: оба потомка любого узла с таким индексом уже посчитаны раньше в этом же проходе, поэтому построение занимает ровно O(n) сравнений, а не O(n log n).',
          en: 'The loop runs from `size - 2` down to `0`: both children of any node at that index are already computed earlier in the same pass, so building the tree takes exactly O(n) comparisons, not O(n log n).',
        },
      },
      {
        lines: [24, 31],
        title: { ru: 'rebuild_from - точечное обновление пути', en: 'rebuild_from - a targeted path update' },
        explanation: {
          ru: 'После изменения одного листа функция пересчитывает только путь от него до корня - O(log n) на вызов.',
          en: 'After one leaf changes, the function recomputes only the path to the root - O(log n) per call.',
        },
      },
      {
        lines: [33, 38],
        title: { ru: 'Извлечение и обновление n раз', en: 'Extracting and updating n times' },
        explanation: {
          ru: 'Корень (`winner[0]`) даёт минимум, его лист заменяется на `float(\'inf\')`, а `rebuild_from` чинит дерево за O(log n) - всего n раз, итого O(n log n).',
          en: 'The root (`winner[0]`) gives the minimum, its leaf is replaced with `float(\'inf\')`, and `rebuild_from` fixes the tree in O(log n) - n times total, giving O(n log n) overall.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Каждое извлечение минимума занимает O(log n) вместо O(n), что даёт гарантированное O(n log n) для всего алгоритма без рекурсии слияния, как в merge sort.',
      en: 'Each minimum extraction takes O(log n) instead of O(n), giving a guaranteed O(n log n) for the whole algorithm without merge-sort-style recursion.',
    },
    {
      ru: 'Естественно обобщается на k-путевое слияние (turnament winner tree) - та же идея используется во внешней сортировке для слияния множества отсортированных файлов.',
      en: 'Naturally generalizes to k-way merging (a tournament winner tree) - the same idea is used in external sorting to merge many sorted runs at once.',
    },
    {
      ru: 'Дерево турнира по структуре - частный случай priority queue, поэтому алгоритм легко объяснить через уже знакомую идею кучи.',
      en: 'The tournament tree is structurally a special case of a priority queue, so the algorithm is easy to explain via the already-familiar heap idea.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти для дерева - не сортирует на месте, в отличие от heap sort с той же гарантией O(n log n).',
      en: 'Needs O(n) extra memory for the tree - doesn\'t sort in place, unlike heap sort with the same O(n log n) guarantee.',
    },
    {
      ru: 'На практике медленнее heap sort и quicksort из-за накладных расходов на структуру дерева и худшей локальности памяти.',
      en: 'In practice slower than heap sort and quicksort due to the overhead of the tree structure and worse memory locality.',
    },
    {
      ru: 'Неустойчив: порядок равных элементов не гарантируется при выборе победителя.',
      en: 'Unstable: the order of equal elements isn\'t guaranteed when picking a winner.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда нужно многократно находить и удалять минимум из динамически меняющегося набора - не только для одноразовой сортировки, но как структура данных (winner tree).',
      en: 'When repeatedly finding and removing the minimum from a dynamically changing set - not just for one-off sorting, but as a data structure (a winner tree).',
    },
    {
      ru: 'Как учебный мост между сортировкой выбором и приоритетными очередями/кучами: помогает понять, зачем вообще нужна O(log n) структура для повторного извлечения минимума.',
      en: 'As a teaching bridge between selection sort and priority queues/heaps: it helps explain why an O(log n) structure for repeated minimum extraction is needed at all.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Внешняя сортировка (external merge sort)** использует winner tree именно в форме турнирного дерева для k-путевого слияния множества отсортированных файлов с диска за один проход.',
      en: '**External merge sort** uses a winner tree in exactly this tournament-tree form for k-way merging many sorted files from disk in a single pass.',
    },
    {
      ru: '**Системы обработки потоковых данных**, где нужно постоянно поддерживать «текущий минимум/максимум» среди активных элементов с эффективным обновлением.',
      en: '**Stream-processing systems**, where a running minimum/maximum among active elements needs to be maintained with efficient updates.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Дерево турнира хранит в каждом внутреннем узле не значение, а **индекс листа-победителя**. Это важное отличие от кучи: в min-heap узел содержит само значение и теряет связь с исходной позицией элемента, а в дереве турнира можно всегда узнать, *какой именно* элемент сейчас в корне, не теряя его исходный индекс.',
        en: 'Every internal node of the tournament tree stores not a value, but the **index of the winning leaf**. This is a key difference from a heap: a min-heap node holds the value itself and loses track of the element\'s original position, while the tournament tree can always tell *which* element currently sits at the root without losing its original index.',
      },
      {
        ru: 'Построение дерева - это ровно один проход снизу вверх: цикл идёт от последнего внутреннего узла (индекс `size - 2`) до корня (индекс `0`). У любого узла с таким индексом оба потомка уже вычислены раньше в этом же проходе (они либо листья, либо узлы с большим индексом), поэтому каждый узел считается ровно один раз - **O(n) сравнений всего**, без единого повторного обхода пути.',
        en: 'Building the tree is exactly one bottom-up pass: the loop runs from the last internal node (index `size - 2`) down to the root (index `0`). Any node at that index already has both children computed earlier in the same pass (they are either leaves or higher-indexed nodes), so every node is computed exactly once - **O(n) comparisons total**, with no repeated path traversal.',
      },
      {
        ru: 'На массиве из 1000 случайных элементов (дополненном до `size = 1024`) построение занимает ровно **1023 сравнения** - это `size - 1`, столько же, сколько внутренних узлов в дереве. Наивная альтернатива - вызывать пересчёт пути от каждого листа до корня по отдельности - дала бы **10240 сравнений** (n·log₂(size)) на построение, то есть в 10 раз больше, вырождая заявленное O(n) в фактическое O(n log n).',
        en: 'On a 1000-element random array (padded to `size = 1024`), the build takes exactly **1023 comparisons** - that is `size - 1`, the same as the number of internal nodes in the tree. The naive alternative - calling the path-recompute step separately for every leaf - would take **10,240 comparisons** (n·log₂(size)) just to build, ten times more, degrading the claimed O(n) into an actual O(n log n).',
      },
      {
        ru: 'После построения каждое извлечение минимума требует пересчёта только пути от изменённого листа до корня - **O(log n)** сравнений. На том же массиве из 1000 элементов это даёт **10000 сравнений** на все n извлечений (`n · log₂(size)`), что вместе с построением суммарно даёт около **11000 сравнений** - тот же порядок, что и `n · log₂(n) ≈ 9966`.',
        en: 'After the build, each minimum extraction requires recomputing only the path from the changed leaf to the root - **O(log n)** comparisons. On the same 1000-element array this gives **10,000 comparisons** for all n extractions (`n · log₂(size)`), which together with the build sums to roughly **11,000 comparisons** - the same order as `n · log₂(n) ≈ 9966`.',
      },
      {
        ru: 'Дополнение массива фиктивными `+∞`-листьями до ближайшей степени двойки (например, 9 элементов дополняются до 16) гарантирует, что дерево - **полное бинарное дерево**: у каждого внутреннего узла ровно два потомка, без особых случаев для "неполного последнего уровня". Фиктивные листья никогда не побеждают ни в одном сравнении и просто не попадают в вывод.',
        en: 'Padding the array with dummy `+∞` leaves up to the nearest power of two (e.g. 9 elements padded to 16) guarantees the tree is a **complete binary tree**: every internal node has exactly two children, with no special cases for a "partial last level". Dummy leaves never win any comparison and simply never make it into the output.',
      },
      {
        ru: 'Дерево турнира структурно эквивалентно **priority queue поверх фиксированного набора элементов**: операция "извлечь минимум и обновить" - это ровно `extract-min` из очереди с приоритетом. Разница с min-heap - не в асимптотике (обе O(log n) на операцию), а в том, что дерево турнира явно хранит результаты всех прошлых парных сравнений в виде дерева, а не только частичный порядок в массиве кучи.',
        en: 'The tournament tree is structurally equivalent to a **priority queue over a fixed set of elements**: "extract the minimum and update" is exactly `extract-min` from a priority queue. The difference from a min-heap is not in asymptotics (both are O(log n) per operation), but in the fact that the tournament tree explicitly stores the results of every past pairwise comparison as an explicit tree, rather than just a partial order inside a heap array.',
      },
    ],
    whenToUse: [
      {
        ru: '**По сравнению с heap sort**: если важна память и in-place сортировка, heap sort выигрывает - он не создаёт отдельную структуру. Дерево турнира оправдано, когда нужен явный доступ к дереву сравнений между операциями, а не только к текущему минимуму.',
        en: '**Versus heap sort**: if memory and in-place sorting matter, heap sort wins - it builds no separate structure. The tournament tree is worth it when explicit access to the comparison tree between operations is needed, not just the current minimum.',
      },
      {
        ru: '**По сравнению с обычным min-heap**: дерево турнира предпочтительнее, когда важно явно видеть путь сравнений, приведших к победителю (например, для отладки турнирной логики или визуализации "кто с кем сравнивался") - min-heap этого не хранит.',
        en: '**Versus a plain min-heap**: the tournament tree is preferable when the comparison path leading to a winner needs to be explicitly visible (e.g. for debugging tournament logic or visualizing "who was compared to whom") - a min-heap does not retain this.',
      },
      {
        ru: 'В **k-путевом слиянии** (внешняя сортировка, слияние N потоков): дерево турнира естественно масштабируется - каждый "лист" представляет текущую голову одного потока, и обновление после извлечения затрагивает только O(log k) узлов вместо сравнения всех k голов заново.',
        en: 'In **k-way merging** (external sorting, merging N streams): the tournament tree scales naturally - each "leaf" represents the current head of one stream, and updating after an extraction touches only O(log k) nodes instead of comparing all k heads again.',
      },
      {
        ru: 'Крайний случай - **очень маленький n** (например, n ≤ 4): накладные расходы на построение дерева (дополнение до степени двойки, отдельный массив `winner`) не окупаются, и обычная сортировка вставками отработает быстрее на практике при одинаковой корректности результата.',
        en: 'Edge case - **very small n** (e.g. n ≤ 4): the overhead of building the tree (padding to a power of two, a separate `winner` array) does not pay off, and plain insertion sort runs faster in practice while producing the same correct result.',
      },
    ],
    realWorld: [
      {
        ru: '**Внешняя сортировка больших файлов** (Донald Кнут, "The Art of Computer Programming", том 3, раздел 5.4.1) использует winner tree в форме турнирного дерева для слияния десятков и сотен отсортированных фрагментов за один проход, не помещающихся в память целиком.',
        en: '**External sorting of large files** (Donald Knuth, "The Art of Computer Programming", volume 3, section 5.4.1) uses a winner tree in this exact tournament-tree form to merge dozens or hundreds of sorted fragments too large to fit in memory at once, in a single pass.',
      },
      {
        ru: '**Реляционные базы данных** используют аналогичные структуры (replacement selection + tournament tree) в операторах `ORDER BY`/`MERGE JOIN`, когда промежуточный результат сортировки не помещается в буфер памяти и требует слияния временных файлов на диске.',
        en: '**Relational databases** use similar structures (replacement selection + a tournament tree) in `ORDER BY`/`MERGE JOIN` operators, when an intermediate sort result does not fit in the memory buffer and requires merging temporary files on disk.',
      },
      {
        ru: '**Симуляции спортивных турниров и матчмейкинг-системы** (например, рейтинговые системы на основе single-elimination bracket) используют структуру дерева турнира буквально - не как метафору сортировки, а как модель реального турнира с обновлением после каждого матча.',
        en: '**Sports tournament simulations and matchmaking systems** (e.g. rating systems based on a single-elimination bracket) use the tournament tree structure literally - not as a sorting metaphor, but as a model of an actual tournament, updated after every match.',
      },
      {
        ru: '**k-way merge в MapReduce/Hadoop shuffle-фазе** использует ту же идею для слияния отсортированных выходов множества мапперов перед подачей на редьюсер - без tournament-tree пришлось бы сравнивать все k текущих голов при каждом выборе следующего элемента.',
        en: '**k-way merge in the MapReduce/Hadoop shuffle phase** uses the same idea to merge the sorted outputs of many mappers before feeding a reducer - without a tournament tree, all k current heads would need comparing on every choice of the next element.',
      },
    ],
  },

  relatedAlgorithms: ['selection-sort', 'heap-sort'],

  quiz: [
    {
      question: {
        ru: 'Чем турнирная сортировка отличается от обычной сортировки выбором?',
        en: 'How does tournament sort differ from plain selection sort?',
      },
      options: [
        {
          ru: 'Минимум находится за O(log n) с помощью дерева турнира вместо линейного прохода O(n)',
          en: 'The minimum is found in O(log n) via a tournament tree instead of a linear O(n) scan',
        },
        { ru: 'Она сортирует только чётные числа, полностью игнорируя все нечётные значения массива', en: 'It only sorts even numbers, completely ignoring every odd value found in the array' },
        { ru: 'Она вообще не использует сравнения элементов, а полагается исключительно на хеширование', en: 'It doesn\'t use element comparisons at all, relying exclusively on hashing instead' },
        { ru: 'Разницы вообще нет, это просто два разных исторических названия одного и того же алгоритма', en: 'There\'s no difference whatsoever, it\'s just two different historical names for the exact same algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Дерево турнира хранит результаты прошлых сравнений, поэтому после извлечения минимума достаточно пересчитать только путь до корня.',
        en: 'The tournament tree keeps the results of past comparisons, so after extracting the minimum only the path to the root needs recomputing.',
      },
      hint: {
        ru: 'Смотрите абзац `problem` на вкладке «Суть» и шаг «rebuildFrom - точечное обновление пути» построчного разбора на вкладке «Реализация».',
        en: 'See the `problem` paragraph on the "Intent" tab and the "rebuildFrom - a targeted path update" walkthrough step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что происходит с листом дерева после того, как его значение извлечено?',
        en: 'What happens to a tree leaf after its value has been extracted?',
      },
      options: [
        { ru: 'Оно заменяется на +∞, чтобы больше не побеждать в сравнениях', en: 'It is replaced with +∞ so it can never win a comparison again' },
        { ru: 'Лист физически удаляется из дерева, и все узлы ниже него смещаются вверх', en: 'The leaf is physically removed from the tree, and every node below it shifts upward' },
        { ru: 'Всё дерево турнира каждый раз перестраивается заново с нуля целиком', en: 'The entire tournament tree is rebuilt completely from scratch every single time' },
        { ru: 'Извлечённое значение переносится и постоянно хранится в корне дерева', en: 'The extracted value is moved into and permanently stored at the root of the tree' },
      ],
      correct: 0,
      explanation: {
        ru: 'Замена на +∞ - простой способ «выключить» уже отсортированный элемент, не меняя структуру дерева.',
        en: 'Replacing with +∞ is a simple way to "switch off" an already-sorted element without changing the tree\'s structure.',
      },
      hint: {
        ru: 'Смотрите шаг «Извлечение и обновление n раз» построчного разбора на вкладке «Реализация» (`leaves[champion] = INF`) и третий шаг «Заменить лист на +∞» на вкладке «Визуализация».',
        en: 'See the "Extracting and updating n times" walkthrough step on the "Implementation" tab (`leaves[champion] = INF`) and the "Replace the leaf with +∞" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность одной операции извлечения минимума после начального построения дерева?',
        en: 'What is the time complexity of one minimum-extraction operation after the initial tree build?',
      },
      options: [
        { ru: 'O(log n)', en: 'O(log n)' },
        { ru: 'O(n), как и в обычной сортировке выбором', en: 'O(n), the same as plain selection sort' },
        { ru: 'O(1), это происходит мгновенно', en: 'O(1), it happens instantly' },
        { ru: 'O(n²), как при полной пересборке', en: 'O(n²), as with a full rebuild' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нужно пересчитать только путь от листа до корня, а высота полного бинарного дерева с n листьями - O(log n).',
        en: 'Only the path from the leaf to the root needs recomputing, and a complete binary tree with n leaves has height O(log n).',
      },
      hint: {
        ru: 'Смотрите шаг «rebuildFrom - точечное обновление пути» построчного разбора на вкладке «Реализация» и четвёртый абзац раздела «Углублённо» на вкладке «Суть» (10000 сравнений на 1000 извлечений).',
        en: 'See the "rebuildFrom - a targeted path update" walkthrough step on the "Implementation" tab and the fourth "Deep dive" paragraph on the "Intent" tab (10,000 comparisons for 1000 extractions).',
      },
    },
    {
      question: {
        ru: 'Какой объём дополнительной памяти требует турнирная сортировка?',
        en: 'How much extra memory does tournament sort require?',
      },
      options: [
        { ru: 'O(n) - для хранения дерева турнира', en: 'O(n) - to store the tournament tree' },
        { ru: 'O(1) - сортирует полностью на месте, без единого дополнительного узла', en: 'O(1) - sorts entirely in place, without a single extra node' },
        { ru: 'O(log n), потому что хранится только один путь дерева', en: 'O(log n), because only a single tree path is kept in memory' },
        { ru: 'O(n²), из-за постоянной полной пересборки дерева', en: 'O(n²), due to constantly rebuilding the whole tree completely' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от heap sort, дерево турнира строится как отдельная структура поверх исходного массива, а не внутри него.',
        en: 'Unlike heap sort, the tournament tree is built as a separate structure on top of the original array, not inside it.',
      },
      hint: {
        ru: 'Смотрите шаг «Массив победителей и листья-указатели» построчного разбора на вкладке «Реализация» (`2 * size - 1`) и первый пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the "The winner array and leaf pointers" walkthrough step on the "Implementation" tab (`2 * size - 1`) and the first "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Где идея дерева турнира (winner tree) применяется за пределами сортировки одного массива в памяти?',
        en: 'Where is the tournament (winner) tree idea used beyond sorting a single array in memory?',
      },
      options: [
        {
          ru: 'В k-путевом слиянии при внешней сортировке больших файлов',
          en: 'In k-way merging during external sorting of large files',
        },
        { ru: 'В сжатии изображений и видео на лету во время потоковой передачи', en: 'In real-time image and video compression during streaming playback' },
        { ru: 'В хешировании строк для распределённых таблиц соответствия', en: 'In string hashing for distributed lookup and mapping tables' },
        { ru: 'В шифровании с открытым ключом для обмена секретными сессионными ключами', en: 'In public-key encryption for exchanging secret session keys' },
      ],
      correct: 0,
      explanation: {
        ru: 'Внешняя сортировка сливает много отсортированных файлов за один проход, используя winner tree для быстрого выбора следующего наименьшего элемента среди «голов» всех файлов.',
        en: 'External sorting merges many sorted files in a single pass, using a winner tree to quickly pick the next-smallest element among all the files\' current heads.',
      },
      hint: {
        ru: 'Смотрите первый пункт «Примеры из практики» (углублённого) на вкладке «Суть» (внешняя сортировка, Кнут) и второй пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the first extended "Real world" item on the "Intent" tab (external sorting, Knuth) and the second "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли турнирная сортировка устойчивой?',
        en: 'Is tournament sort stable?',
      },
      options: [
        { ru: 'Нет - победитель при равенстве задаётся позицией в дереве, не порядком', en: 'No - on equal values the winner is determined by tree structure, not element order' },
        { ru: 'Да - слияние в дереве всегда берёт из левого поддерева при равенстве', en: 'Yes - the tree merge always takes from the left subtree on ties' },
        { ru: 'Зависит от реализации - устойчивость можно обеспечить дополнительной логикой', en: 'Depends on the implementation - stability can be ensured with extra logic in all cases' },
        { ru: 'Да - дерево турнира гарантирует исходный порядок равных значений', en: 'Yes - the tournament tree guarantees the original order of equal values' },
      ],
      correct: 0,
      explanation: {
        ru: 'Турнирная сортировка неустойчива: при равных значениях победитель зависит от позиции в дереве, а не от исходного порядка элементов.',
        en: 'Tournament sort is unstable: among equal values, the winner depends on tree position, not on the original element order.',
      },
      hint: {
        ru: 'Смотрите строку `winner[node] = leaves[left] <= leaves[right] ? left : right` (шаг «Построение дерева за один проход» на вкладке «Реализация») и третий пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the `winner[node] = leaves[left] <= leaves[right] ? left : right` line (the "Building the tree in a single pass" walkthrough step on the "Implementation" tab) and the third "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Чем дерево турнира концептуально похоже на кучу (heap)?',
        en: 'In what way is the tournament tree conceptually similar to a heap?',
      },
      options: [
        { ru: 'Оба являются бинарными деревьями, где корень всегда содержит минимум', en: 'Both are binary trees where the root always holds the minimum' },
        { ru: 'Оба сортируют за O(n) без какой-либо рекурсии или дополнительной памяти', en: 'Both sort in O(n) without any recursion or extra memory' },
        { ru: 'Оба требуют O(n²) операций для начального построения структуры', en: 'Both require O(n²) operations to build the initial structure always' },
        { ru: 'Оба являются хеш-таблицами с открытой адресацией', en: 'Both are hash tables with open addressing' },
      ],
      correct: 0,
      explanation: {
        ru: 'И дерево турнира, и min-heap поддерживают свойство, при котором корень всегда содержит глобальный минимум, и оба обновляются за O(log n).',
        en: 'Both the tournament tree and a min-heap maintain the property that the root always holds the global minimum, and both update in O(log n).',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» и первый пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab and the first "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Почему турнирная сортировка медленнее пирамидальной (heap sort) на практике, несмотря на одинаковую асимптотику?',
        en: 'Why is tournament sort slower than heap sort in practice despite the same asymptotic complexity?',
      },
      options: [
        { ru: 'Дерево турнира хранится отдельно, что ухудшает локальность кэша', en: 'The tournament tree is stored separately from the array, worsening cache locality' },
        { ru: 'Турнирная сортировка использует больше сравнений, чем пирамидальная', en: 'Tournament sort uses more comparisons than heap sort' },
        { ru: 'Пирамидальная сортировка работает за O(n), а турнирная - за O(n log n)', en: 'Heap sort runs in O(n) while tournament sort runs in O(n log n) regardless of input' },
        { ru: 'Турнирная сортировка несовместима с современными процессорами', en: 'Tournament sort is incompatible with modern processors' },
      ],
      correct: 0,
      explanation: {
        ru: 'Heap sort сортирует прямо внутри входного массива, обращаясь к соседним ячейкам памяти, тогда как дерево турнира - отдельная структура с худшей локальностью кэша.',
        en: 'Heap sort sorts directly inside the input array, accessing nearby memory cells, whereas the tournament tree is a separate structure with worse cache locality.',
      },
      hint: {
        ru: 'Смотрите второй пункт минусов на вкладке «Плюсы и минусы» и второй пункт whenToUse (углублённого) на вкладке «Суть».',
        en: 'See the second "Cons" item on the "Pros & Cons" tab and the second extended "When to use" item on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Как строится дерево турнира в начале алгоритма?',
        en: 'How is the tournament tree built at the start of the algorithm?',
      },
      options: [
        { ru: 'Элементы в листья, победители вычисляются снизу вверх за O(n)', en: 'Elements are placed in leaves, then winners are computed bottom-up in O(n)' },
        { ru: 'Элементы сортируются сначала, потом помещаются в дерево сверху вниз', en: 'Elements are sorted first, then placed into the tree top-down' },
        { ru: 'Дерево строится вставками по одному элементу за O(log n) каждый', en: 'The tree is built by inserting one element at a time in O(log n) each always' },
        { ru: 'Все элементы помещаются в корень, затем распределяются по листьям', en: 'All elements are placed at the root, then distributed to the leaves' },
      ],
      correct: 0,
      explanation: {
        ru: 'Построение дерева снизу вверх - стандартный способ за O(n): листья уже содержат элементы, а внутренние узлы заполняются поочерёдно от нижнего уровня к корню.',
        en: 'Building the tree bottom-up in O(n) is the standard approach: leaves already hold elements, and internal nodes are filled level by level up to the root.',
      },
      hint: {
        ru: 'Смотрите шаг «Построение дерева за один проход» построчного разбора на вкладке «Реализация» и второй абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the "Building the tree in a single pass" walkthrough step on the "Implementation" tab and the second "Deep dive" paragraph on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какова общая временная сложность турнирной сортировки для массива из n элементов?',
        en: 'What is the overall time complexity of tournament sort for an array of n elements?',
      },
      options: [
        { ru: 'O(n log n) - построение O(n) плюс n извлечений по O(log n) каждое', en: 'O(n log n) - O(n) build plus n extractions of O(log n) each' },
        { ru: 'O(n²) - каждое извлечение минимума требует линейного прохода по дереву', en: 'O(n²) - each minimum extraction requires a linear pass over the tree' },
        { ru: 'O(n) - дерево строится один раз и все извлечения бесплатны', en: 'O(n) - the tree is built once and all extractions are free' },
        { ru: 'O(log n) - только высота дерева определяет сложность', en: 'O(log n) - only the tree height determines the complexity' },
      ],
      correct: 0,
      explanation: {
        ru: 'Начальное построение дерева за O(n) плюс n операций извлечения по O(log n) каждая даёт итоговую сложность O(n log n).',
        en: 'The initial O(n) tree build plus n extraction operations of O(log n) each gives a total complexity of O(n log n).',
      },
      hint: {
        ru: 'Смотрите третий и четвёртый абзацы раздела «Углублённо» на вкладке «Суть» (1023 сравнения на построение + 10000 на извлечения при n=1000).',
        en: 'See the third and fourth "Deep dive" paragraphs on the "Intent" tab (1023 comparisons to build + 10,000 for the extractions at n=1000).',
      },
    },
  ],
};

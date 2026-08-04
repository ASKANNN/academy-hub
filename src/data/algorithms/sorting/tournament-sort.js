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
    ru: 'Турнирная сортировка — вариант сортировки выбором, который находит минимум не за O(n) линейным проходом, а за O(log n) с помощью бинарного дерева турнира, где каждый внутренний узел хранит «победителя» сравнения своих потомков.',
    en: 'Tournament sort is a variant of selection sort that finds the minimum not with an O(n) linear scan but in O(log n) using a binary tournament tree, where every internal node stores the "winner" of its children\'s comparison.',
  },

  problem: {
    ru: 'Обычная сортировка выбором находит минимум оставшейся части массива за O(n) проходом, повторяя это n раз, что даёт O(n²). При этом информация о сравнениях, сделанных на предыдущем проходе, полностью выбрасывается — на следующем проходе всё сравнивается заново. Нужен способ переиспользовать результаты прошлых сравнений, чтобы находить следующий минимум быстрее.',
    en: 'Plain selection sort finds the minimum of the remaining array with an O(n) scan, repeated n times, for O(n²) total. The comparisons made on one pass are thrown away entirely — the next pass compares everything again from scratch. A way to reuse the results of past comparisons is needed to find the next minimum faster.',
  },

  solution: {
    ru: 'Все элементы становятся листьями полного бинарного дерева (дерева турнира). Каждый внутренний узел хранит индекс «победителя» — меньшего из двух потомков, как в турнирной сетке на выбывание. Корень дерева всегда содержит глобальный минимум. После извлечения минимума его лист заменяется на +∞, и обновить дерево нужно только вдоль пути от этого листа до корня — O(log n) вместо O(n). Повторяя это n раз, получаем полностью отсортированный массив за O(n log n).',
    en: 'All elements become leaves of a complete binary tree (the tournament tree). Every internal node stores the index of the "winner" — the smaller of its two children — like a single-elimination tournament bracket. The tree\'s root always holds the global minimum. After extracting the minimum, its leaf is replaced with +∞, and only the path from that leaf to the root needs updating — O(log n) instead of O(n). Repeating this n times yields a fully sorted array in O(n log n).',
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
        ru: 'Корень дерева содержит индекс листа с минимальным значением во всём массиве — записать это значение в результат.',
        en: 'The tree\'s root holds the index of the leaf with the minimum value in the whole array — write that value to the result.',
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
        ru: 'Двигаясь от изменённого листа вверх, пересчитать победителя в каждом предке на пути — всего O(log n) сравнений.',
        en: 'Walking up from the changed leaf, recompute the winner at each ancestor on the path — only O(log n) comparisons total.',
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

  // winner[node] holds the leaf slot that wins at this internal node
  const winner = new Array(2 * size - 1).fill(-1);
  for (let i = 0; i < size; i++) winner[size - 1 + i] = i;

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
  for (let i = 0; i < size; i++) rebuildFrom(i);

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

    def rebuild_from(leaf_slot):
        node = size - 1 + leaf_slot
        while node > 0:
            parent = (node - 1) // 2
            left = winner[parent * 2 + 1]
            right = winner[parent * 2 + 2]
            winner[parent] = left if leaves[left] <= leaves[right] else right
            node = parent

    for i in range(size):
        rebuild_from(i)

    for out_pos in range(n):
        champion = winner[0]
        output[out_pos] = leaves[champion]
        leaves[champion] = INF
        rebuild_from(champion)

    return output`,
  },

  pros: [
    {
      ru: 'Каждое извлечение минимума занимает O(log n) вместо O(n), что даёт гарантированное O(n log n) для всего алгоритма без рекурсии слияния, как в merge sort.',
      en: 'Each minimum extraction takes O(log n) instead of O(n), giving a guaranteed O(n log n) for the whole algorithm without merge-sort-style recursion.',
    },
    {
      ru: 'Естественно обобщается на k-путевое слияние (turnament winner tree) — та же идея используется во внешней сортировке для слияния множества отсортированных файлов.',
      en: 'Naturally generalizes to k-way merging (a tournament winner tree) — the same idea is used in external sorting to merge many sorted runs at once.',
    },
    {
      ru: 'Дерево турнира по структуре — частный случай priority queue, поэтому алгоритм легко объяснить через уже знакомую идею кучи.',
      en: 'The tournament tree is structurally a special case of a priority queue, so the algorithm is easy to explain via the already-familiar heap idea.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти для дерева — не сортирует на месте, в отличие от heap sort с той же гарантией O(n log n).',
      en: 'Needs O(n) extra memory for the tree — doesn\'t sort in place, unlike heap sort with the same O(n log n) guarantee.',
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
      ru: 'Когда нужно многократно находить и удалять минимум из динамически меняющегося набора — не только для одноразовой сортировки, но как структура данных (winner tree).',
      en: 'When repeatedly finding and removing the minimum from a dynamically changing set — not just for one-off sorting, but as a data structure (a winner tree).',
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
        ru: 'Замена на +∞ — простой способ «выключить» уже отсортированный элемент, не меняя структуру дерева.',
        en: 'Replacing with +∞ is a simple way to "switch off" an already-sorted element without changing the tree\'s structure.',
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
        ru: 'Нужно пересчитать только путь от листа до корня, а высота полного бинарного дерева с n листьями — O(log n).',
        en: 'Only the path from the leaf to the root needs recomputing, and a complete binary tree with n leaves has height O(log n).',
      },
    },
    {
      question: {
        ru: 'Какой объём дополнительной памяти требует турнирная сортировка?',
        en: 'How much extra memory does tournament sort require?',
      },
      options: [
        { ru: 'O(n) — для хранения дерева турнира', en: 'O(n) — to store the tournament tree' },
        { ru: 'O(1) — сортирует полностью на месте, без единого дополнительного узла', en: 'O(1) — sorts entirely in place, without a single extra node' },
        { ru: 'O(log n), потому что хранится только один путь дерева', en: 'O(log n), because only a single tree path is kept in memory' },
        { ru: 'O(n²), из-за постоянной полной пересборки дерева', en: 'O(n²), due to constantly rebuilding the whole tree completely' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от heap sort, дерево турнира строится как отдельная структура поверх исходного массива, а не внутри него.',
        en: 'Unlike heap sort, the tournament tree is built as a separate structure on top of the original array, not inside it.',
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
    },
  ],
};

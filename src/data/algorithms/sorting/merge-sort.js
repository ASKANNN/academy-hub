export const mergeSort = {
  slug: 'merge-sort',
  category: 'sorting',
  name: { ru: 'Сортировка слиянием', en: 'Merge Sort' },
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
    ru: 'Все алгоритмы сортировки сравнением, рассмотренные ранее (пузырьковая, выбором, вставками), гарантированно требуют O(n²) сравнений в худшем случае на больших массивах — для миллиона элементов это триллион операций. Нужен алгоритм, который использует принцип «разделяй и властвуй», чтобы гарантированно уложиться в O(n log n) независимо от исходного порядка данных.',
    en: 'All the comparison sorts covered so far (bubble, selection, insertion) are guaranteed O(n²) worst case on large arrays — a trillion operations for a million elements. What is needed is an algorithm that uses divide-and-conquer to guarantee O(n log n) regardless of the input order.',
  },

  solution: {
    ru: 'Если массив состоит из 0 или 1 элемента, он уже отсортирован. Иначе массив делится пополам, каждая половина сортируется тем же алгоритмом рекурсивно, а затем две уже отсортированные половины сливаются в один массив: на каждом шаге слияния сравниваются «головы» двух половин, и меньший элемент забирается в результат. Деление даёт log n уровней рекурсии, а слияние на каждом уровне стоит O(n) — итого O(n log n).',
    en: 'If the array has 0 or 1 elements, it is already sorted. Otherwise, split it in half, sort each half recursively with the same algorithm, then merge the two already-sorted halves into one array: at each merge step, compare the "heads" of both halves and take the smaller one into the result. The splitting gives log n recursion levels, and merging at each level costs O(n) — O(n log n) overall.',
  },

  steps: [
    {
      title: { ru: 'Базовый случай', en: 'Base case' },
      explanation: {
        ru: 'Если в подмассиве 0 или 1 элемент, он уже отсортирован — вернуть как есть.',
        en: 'If the subarray has 0 or 1 elements, it is already sorted — return it as-is.',
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
        ru: 'Когда одна половина закончится, оставшиеся элементы другой половины добавляются в конец — они уже отсортированы.',
        en: 'When one half runs out, the remaining elements of the other half are appended — they are already sorted.',
      },
    },
  ],

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

  pros: [
    {
      ru: 'Гарантированный O(n log n) в лучшем, среднем и худшем случае — предсказуемая производительность независимо от входных данных.',
      en: 'Guaranteed O(n log n) best, average, and worst case — predictable performance regardless of input.',
    },
    {
      ru: 'Устойчив — важно при сортировке объектов по одному полю с сохранением порядка по другому.',
      en: 'Stable — important when sorting objects by one field while preserving order by another.',
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
      ru: 'Требует O(n) дополнительной памяти для временных массивов при слиянии — не сортирует «на месте» без сложных модификаций.',
      en: 'Needs O(n) extra memory for temporary arrays during merging — doesn\'t sort in place without complex modifications.',
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
      ru: 'Для сортировки связных списков, где произвольный доступ дорог, но последовательное слияние — нет.',
      en: 'For sorting linked lists, where random access is expensive but sequential merging is not.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Timsort** (Python `sorted()`, Java `Arrays.sort()` для объектов) — гибрид сортировки слиянием и вставками, использующий именно устойчивость и гарантированную асимптотику слияния.',
      en: '**Timsort** (Python\'s `sorted()`, Java\'s `Arrays.sort()` for objects) — a hybrid of merge sort and insertion sort that relies on merge sort\'s stability and guaranteed asymptotics.',
    },
    {
      ru: '**Внешняя сортировка больших файлов** — база данных сортирует куски, помещающиеся в память, а затем сливает их с диска, что является прямым применением merge-шага.',
      en: '**External sorting of large files** — a database sorts memory-sized chunks, then merges them from disk, which is a direct application of the merge step.',
    },
    {
      ru: '**Git** использует вариант слияния при трёхстороннем merge истории коммитов (концептуально близкий принцип объединения двух упорядоченных последовательностей).',
      en: '**Git** uses a merging variant in three-way history merges (conceptually close to combining two ordered sequences).',
    },
  ],

  relatedAlgorithms: ['quick-sort', 'insertion-sort'],

  quiz: [
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
        { ru: 'Она использует хеш-таблицу для быстрого поиска', en: 'It uses a hash table for fast lookups' },
        { ru: 'Она сортирует на месте без дополнительной памяти', en: 'It sorts in place without extra memory' },
        { ru: 'Она никогда не сравнивает элементы напрямую', en: 'It never compares elements directly' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от quicksort, где разбиение зависит от выбора опорного элемента и данных, merge sort делит массив по индексу — глубина рекурсии всегда ровно log n.',
        en: 'Unlike quicksort, where partitioning depends on the pivot choice and data, merge sort splits by index — recursion depth is always exactly log n.',
      },
    },
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
        ru: 'Шаг слияния создаёт новый временный массив размером с объединяемые половины — суммарно на каждом уровне рекурсии требуется O(n) памяти.',
        en: 'The merge step creates a new temporary array the size of the merged halves — each recursion level needs O(n) memory in total.',
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
        { ru: 'Алгоритм останавливается с ошибкой', en: 'The algorithm stops with an error' },
        { ru: 'Оставшиеся элементы сортируются заново', en: 'The remaining elements get sorted again' },
        { ru: 'Слияние перезапускается с начала', en: 'The merge restarts from the beginning' },
      ],
      correct: 0,
      explanation: {
        ru: 'Раз обе половины уже отсортированы по отдельности, оставшийся «хвост» одной из них уже находится в правильном относительном порядке — его можно просто дописать.',
        en: 'Since both halves are already independently sorted, the remaining "tail" of one is already in correct relative order — it can just be appended.',
      },
    },
    {
      question: {
        ru: 'Почему Timsort строит гибрид именно вокруг сортировки слиянием, а не пузырьковой или сортировки выбором?',
        en: 'Why does Timsort build its hybrid specifically around merge sort rather than bubble or selection sort?',
      },
      options: [
        {
          ru: 'Merge sort даёт гарантированный O(n log n) и устойчивость, чего нет у квадратичных алгоритмов',
          en: 'Merge sort provides guaranteed O(n log n) and stability, which quadratic algorithms lack',
        },
        { ru: 'Merge sort проще всего запрограммировать', en: 'Merge sort is the easiest to code' },
        { ru: 'Пузырьковая сортировка запрещена лицензией Python', en: 'Bubble sort is banned by Python\'s license' },
        { ru: 'Разницы нет, выбор случаен', en: 'There is no difference, the choice was arbitrary' },
      ],
      correct: 0,
      explanation: {
        ru: 'Для промышленного алгоритма сортировки критичны гарантированная асимптотика на больших данных и устойчивость при сортировке объектов — оба свойства даёт именно merge sort.',
        en: 'A production sort needs guaranteed large-scale asymptotics and stability when sorting objects — both properties come specifically from merge sort.',
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
        { ru: 'Он не использует рекурсию', en: 'It doesn\'t use recursion' },
        { ru: 'Он требует O(1) памяти', en: 'It requires O(1) memory' },
        { ru: 'Слияние можно пропустить', en: 'The merge step can be skipped' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку рекурсивные вызовы на левой и правой половине не зависят друг от друга и не разделяют состояние, их можно выполнять параллельно на разных потоках или машинах.',
        en: 'Since the recursive calls on the left and right halves don\'t depend on each other or share state, they can run in parallel on different threads or machines.',
      },
    },
  ],
};

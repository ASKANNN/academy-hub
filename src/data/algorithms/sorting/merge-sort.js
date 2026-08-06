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
        ru: 'Подумай, что именно создаётся на каждом шаге `merge`, и какого размера этот новый объект.',
        en: 'Think about what exactly gets created at each `merge` step, and how large that new object is.',
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
        ru: 'Подумай, нужно ли заново сравнивать элементы внутри уже отсортированного «хвоста» друг с другом.',
        en: 'Think about whether the elements inside the already-sorted "tail" need to be compared against each other again.',
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
        ru: 'Подумай, что происходит на шаге слияния, когда left[i] и right[j] равны по значению.',
        en: 'Think about what happens in the merge step when left[i] and right[j] are equal in value.',
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
        ru: 'Подумай, от чего зависит точка деления массива - от значений элементов или от их позиции.',
        en: 'Think about what the split point depends on - element values, or their position.',
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
        ru: 'Подумай, какого гарантированного свойства не хватает квадратичным алгоритмам вроде пузырьковой сортировки на больших данных.',
        en: 'Think about what guaranteed property quadratic algorithms like bubble sort lack on large data.',
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
        ru: 'Подумай, разделяют ли рекурсивные вызовы на левой и правой половинах какое-либо общее состояние друг с другом.',
        en: 'Think about whether the recursive calls on the left and right halves share any state with each other.',
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
        ru: 'Подумай, сколько всего элементов покрывают все одновременные слияния на одном уровне рекурсии, если сложить их вместе.',
        en: 'Think about how many elements, in total, all the simultaneous merges at one recursion level cover if you add them up.',
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
        ru: 'Подумай, что меняется, если заменить рекурсивные вызовы на явные циклы, выполняющие те же слияния снизу вверх.',
        en: 'Think about what changes if recursive calls are replaced with explicit loops doing the same merges bottom-up.',
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
        ru: 'Подумай, какой тип доступа к данным - последовательный или произвольный - нужен ключевому шагу каждого из алгоритмов.',
        en: 'Think about what kind of data access - sequential or random - each algorithm\'s key step needs.',
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
        ru: 'Подумай, что означает ситуация, когда на шаге слияния элемент из правой половины забирается раньше, чем левая ещё не исчерпана.',
        en: 'Think about what it means, during a merge step, for an element from the right half to be taken before the left half runs out.',
      },
    },
  ],
};

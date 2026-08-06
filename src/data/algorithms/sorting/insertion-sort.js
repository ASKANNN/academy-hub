export const insertionSort = {
  slug: 'insertion-sort',
  category: 'sorting',
  name: { ru: 'Insertion Sort', en: 'Insertion Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['comparison', 'in-place', 'stable', 'online'],

  intent: {
    ru: 'Сортировка вставками строит отсортированную часть массива слева направо, забирая по одному элементу из неотсортированной части и вставляя его на правильную позицию.',
    en: 'Insertion sort builds the sorted part of the array left to right, taking one element at a time from the unsorted part and inserting it at its correct position.',
  },

  problem: {
    ru: 'Представьте, что вы держите в руке карты и сортируете их по одной, вставляя каждую новую карту в нужное место среди уже отсортированных. Нужен алгоритм, который так же естественно работает с данными, поступающими по одному элементу (например, поток), и который особенно эффективен, если данные уже почти упорядочены.',
    en: 'Imagine sorting a hand of playing cards one at a time, inserting each new card into the right place among the already-sorted ones. You need an algorithm that naturally handles data arriving one element at a time (e.g. a stream) and that is especially efficient when the data is already nearly sorted.',
  },

  solution: {
    ru: 'Массив делится на отсортированную часть слева (изначально из одного элемента) и неотсортированную часть справа. На каждом шаге берётся первый элемент неотсортированной части и сдвигается влево через отсортированную часть до тех пор, пока не найдётся элемент меньше него — туда он и вставляется. Отсортированная часть растёт на один элемент за шаг.',
    en: 'The array is split into a sorted left part (initially a single element) and an unsorted right part. On each step, the first element of the unsorted part is taken and shifted left through the sorted part until an element smaller than it is found — that is where it gets inserted. The sorted part grows by one element per step.',
  },

  steps: [
    {
      title: { ru: 'Взять следующий элемент', en: 'Take the next element' },
      explanation: {
        ru: 'Забрать первый элемент неотсортированной части и запомнить его значение.',
        en: 'Take the first element of the unsorted part and remember its value.',
      },
    },
    {
      title: { ru: 'Сравнивать и сдвигать', en: 'Compare and shift' },
      explanation: {
        ru: 'Идти влево по отсортированной части, сдвигая каждый больший элемент на одну позицию вправо.',
        en: 'Walk left through the sorted part, shifting each larger element one position to the right.',
      },
    },
    {
      title: { ru: 'Найти позицию вставки', en: 'Find the insertion point' },
      explanation: {
        ru: 'Остановиться, когда встретится элемент меньше или равный запомненному значению (или дойдя до начала массива).',
        en: 'Stop when an element smaller than or equal to the stored value is found (or the start of the array is reached).',
      },
    },
    {
      title: { ru: 'Вставить элемент', en: 'Insert the element' },
      explanation: {
        ru: 'Поставить запомненное значение в освободившуюся позицию.',
        en: 'Place the stored value into the freed-up position.',
      },
    },
    {
      title: { ru: 'Повторять до конца массива', en: 'Repeat to the end of the array' },
      explanation: {
        ru: 'Перейти к следующему элементу неотсортированной части и повторить процесс.',
        en: 'Move on to the next element of the unsorted part and repeat the process.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 21, 31],

  implementation: {
    javascript: `function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const current = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > current) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = current;
  }
  return a;
}`,
    python: `def insertion_sort(arr):
    a = arr.copy()
    for i in range(1, len(a)):
        current = a[i]
        j = i - 1
        while j >= 0 and a[j] > current:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = current
    return a`,
  },

  pros: [
    {
      ru: 'На почти отсортированных данных приближается к O(n) — каждый новый элемент сдвигается всего на пару позиций.',
      en: 'Approaches O(n) on nearly sorted data — each new element only shifts a couple of positions.',
    },
    {
      ru: 'Онлайн-алгоритм: может сортировать данные по мере их поступления, не имея всего массива заранее.',
      en: 'An online algorithm: can sort data as it arrives, without needing the whole array upfront.',
    },
    {
      ru: 'Устойчив и сортирует на месте с O(1) дополнительной памяти.',
      en: 'Stable and sorts in place with O(1) extra memory.',
    },
    {
      ru: 'Простая реализация, которую многие языки/библиотеки используют как «финальный штрих» для маленьких подмассивов в гибридных сортировках.',
      en: 'Simple enough that many languages/libraries use it as the "finishing touch" for small subarrays inside hybrid sorts.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) в среднем и худшем случае — на случайных или обратно отсортированных больших массивах медленный.',
      en: 'O(n²) average and worst case — slow on random or reverse-sorted large arrays.',
    },
    {
      ru: 'Сдвиг элементов в массиве — операция O(n) в худшем случае на каждой вставке, что дороже, чем перестановка местами в сортировке выбором.',
      en: 'Shifting array elements is an O(n) operation in the worst case per insertion, more expensive than a single swap in selection sort.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные почти отсортированы или поступают потоком, элемент за элементом.',
      en: 'When data is nearly sorted or arrives as a stream, one element at a time.',
    },
    {
      ru: 'Как финальный проход для маленьких подмассивов внутри более сложных алгоритмов (Timsort, интроспективная сортировка).',
      en: 'As the final pass for small subarrays inside more advanced algorithms (Timsort, introspective sort).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Timsort** (используется в Python `sorted()` и Java `Arrays.sort()` для объектов) применяет сортировку вставками для небольших «прогонов» перед их слиянием.',
      en: '**Timsort** (used by Python\'s `sorted()` and Java\'s `Arrays.sort()` for objects) uses insertion sort on small "runs" before merging them.',
    },
    {
      ru: '**Сортировка карт в руке** — классическая аналогия, буквально описывающая механику алгоритма.',
      en: '**Sorting a hand of playing cards** — the classic analogy that literally describes the algorithm\'s mechanics.',
    },
  ],

  relatedAlgorithms: ['bubble-sort', 'selection-sort', 'merge-sort'],

  quiz: [
    {
      question: {
        ru: 'Какова временная сложность сортировки вставками на уже отсортированном массиве?',
        en: 'What is the time complexity of insertion sort on an already sorted array?',
      },
      options: [
        { ru: 'O(n) — лучший случай', en: 'O(n) — best case' },
        { ru: 'O(n²) — как и всегда', en: 'O(n²) — same as always' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если каждый следующий элемент уже больше предыдущего, внутренний цикл сдвига ни разу не выполняется — алгоритм делает всего n−1 сравнение.',
        en: 'If every next element is already greater than the previous one, the inner shifting loop never runs — the algorithm makes only n−1 comparisons.',
      },
      hint: {
        ru: 'Подумай, сколько раз условие `a[j] > current` окажется истинным, если массив уже отсортирован.',
        en: 'Think about how many times the condition `a[j] > current` can be true if the array is already sorted.',
      },
    },
    {
      question: {
        ru: 'Что значит, что сортировка вставками — «онлайн-алгоритм»?',
        en: 'What does it mean that insertion sort is an "online algorithm"?',
      },
      options: [
        {
          ru: 'Она может сортировать элементы по мере их поступления, не имея всего массива заранее',
          en: 'It can sort elements as they arrive, without having the entire array upfront',
        },
        { ru: 'Она требует подключения к интернету для синхронизации промежуточных результатов сортировки', en: 'It requires an internet connection to synchronize intermediate sorting results' },
        { ru: 'Она работает только с числами с плавающей точкой из-за особенностей округления при сравнении', en: 'It only works with floating-point numbers because of rounding quirks in the comparisons' },
        { ru: 'Она использует облачные вычисления для распределения сравнений между узлами', en: 'It uses cloud computing to distribute comparisons across nodes' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отсортированная часть массива в любой момент валидна сама по себе — можно вставлять новые элементы по одному, не пересчитывая всё заново.',
        en: 'The sorted part of the array is valid on its own at any point — new elements can be inserted one at a time without recomputing everything.',
      },
      hint: {
        ru: 'Подумай, остаётся ли отсортированная часть корректно упорядоченной на каждом промежуточном шаге, а не только в самом конце.',
        en: 'Think about whether the sorted part stays correctly ordered at every intermediate step, not just at the very end.',
      },
    },
    {
      question: {
        ru: 'Почему Timsort использует сортировку вставками для маленьких подмассивов?',
        en: 'Why does Timsort use insertion sort for small subarrays?',
      },
      options: [
        {
          ru: 'На маленьких n накладные расходы более сложных алгоритмов не окупаются, а вставками быстро и просто',
          en: 'At small n, the overhead of more complex algorithms doesn\'t pay off, while insertion sort is fast and simple',
        },
        {
          ru: 'Потому что она работает за O(n log n), точно так же как и слияние прогонов в самом Timsort на больших массивах',
          en: 'Because it runs in O(n log n), exactly the same as the run-merging step in Timsort itself on large arrays',
        },
        {
          ru: 'Потому что она использует заметно меньше памяти, чем любой другой алгоритм сортировки, что критично для встроенных систем',
          en: 'Because it uses noticeably less memory than any other sorting algorithm, which matters greatly for embedded systems',
        },
        {
          ru: 'Это в корне не так, Timsort никогда не использует сортировку вставками — это распространённое заблуждение среди новичков в программировании',
          en: "That's fundamentally not true, Timsort never uses insertion sort at all — a common misconception among beginner programmers",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На маленьких подмассивах (обычно до ~32-64 элементов) практическая скорость сортировки вставками из-за низких констант превосходит асимптотически более быстрые, но более «тяжёлые» алгоритмы.',
        en: 'On small subarrays (typically up to ~32-64 elements), insertion sort\'s low constant factors make it practically faster than asymptotically superior but "heavier" algorithms.',
      },
      hint: {
        ru: 'Подумай о разнице между асимптотической сложностью и реальной скоростью на маленьком n, где константы решают многое.',
        en: 'Think about the difference between asymptotic complexity and real speed at small n, where constant factors matter a lot.',
      },
    },
    {
      question: {
        ru: 'Что делает внутренний цикл (`while`) в реализации сортировки вставками?',
        en: 'What does the inner (`while`) loop do in the insertion sort implementation?',
      },
      options: [
        {
          ru: 'Сдвигает элементы отсортированной части вправо, освобождая место для вставки',
          en: 'Shifts elements of the sorted part rightward, making room for the insertion',
        },
        { ru: 'Меняет местами два соседних элемента, как это делает сортировка пузырьком', en: 'Swaps two neighboring elements, the way bubble sort does' },
        { ru: 'Ищет минимум во всём массиве и переставляет его в начало, как в сортировке выбором', en: 'Searches for the minimum across the whole array and moves it to the front, as in selection sort' },
        { ru: 'Разбивает массив пополам и рекурсивно сортирует обе половины', en: 'Splits the array in half and recursively sorts both halves' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от swap-based алгоритмов, вставками использует сдвиг (shift): элементы копируются на одну позицию вправо, пока не найдётся место для вставляемого значения.',
        en: 'Unlike swap-based algorithms, insertion sort uses a shift: elements are copied one position to the right until a spot is found for the value being inserted.',
      },
      hint: {
        ru: 'Сравни, сколько элементов перемещается за один swap и за один шаг сдвига (shift).',
        en: 'Compare how many elements move during a single swap versus a single shift step.',
      },
    },
    {
      question: {
        ru: 'Сортировка вставками устойчива (stable). Почему?',
        en: 'Insertion sort is stable. Why?',
      },
      options: [
        {
          ru: 'Элемент вставляется сразу после последнего равного ему элемента, а не перед ним',
          en: 'An element is inserted right after the last equal element, not before it',
        },
        { ru: 'Она никогда не сравнивает равные элементы, потому что цикл сдвига пропускает такие пары', en: 'It never compares equal elements, because the shift loop skips over such pairs' },
        { ru: 'Она использует хеш-таблицу для отслеживания порядка исходных индексов элементов', en: 'It uses a hash table to track the original indices of elements for ordering' },
        { ru: 'Стабильность не гарантируется, это распространённое заблуждение, как и в сортировке выбором', en: 'Stability is not guaranteed, this is a common misconception, same as with selection sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Цикл сдвига останавливается на условии `a[j] > current` (строгое сравнение) — равные элементы не сдвигаются, поэтому их относительный порядок сохраняется.',
        en: 'The shift loop stops on `a[j] > current` (strict comparison) — equal elements don\'t get shifted past, so their relative order is preserved.',
      },
      hint: {
        ru: 'Подумай, что произойдёт с циклом сдвига, если он встретит элемент, равный вставляемому значению.',
        en: 'Think about what happens to the shift loop when it encounters an element equal to the value being inserted.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность сортировки вставками на массиве, отсортированном в обратном порядке?',
        en: 'What is the time complexity of insertion sort on a reverse-sorted array?',
      },
      options: [
        {
          ru: 'O(n²) — каждый новый элемент сдвигается через всю отсортированную часть',
          en: 'O(n²) — each new element shifts across the entire already-sorted part',
        },
        {
          ru: 'O(n log n) — благодаря бинарному поиску места вставки для каждого элемента',
          en: 'O(n log n) — thanks to a binary search for the insertion point of each element',
        },
        {
          ru: 'O(n) — точно так же, как и на уже отсортированном по возрастанию массиве',
          en: 'O(n) — exactly the same as on an already ascending-sorted array',
        },
        {
          ru: 'O(1) — потому что сортировка происходит мгновенно независимо от размера',
          en: 'O(1) — because the sort completes instantly regardless of array size',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На развёрнутом массиве каждый следующий элемент меньше всех уже отсортированных, поэтому сдвигается до самого начала — суммарно получается квадратичное число операций, худший случай алгоритма.',
        en: 'On a reverse-sorted array, every next element is smaller than everything already sorted, so it shifts all the way to the front — the total work is quadratic, the algorithm\'s worst case.',
      },
      hint: {
        ru: 'Подумай, как далеко придётся сдвигаться самому маленькому из оставшихся элементов, если он всегда меньше уже отсортированной части.',
        en: 'Think about how far the smallest remaining element has to travel if it is always smaller than everything already placed.',
      },
    },
    {
      question: {
        ru: 'С чем напрямую связано число сдвигов, которые сортировка вставками делает для каждого элемента?',
        en: "What does the number of shifts insertion sort performs for each element directly relate to?",
      },
      options: [
        {
          ru: 'С числом инверсий — пар элементов, стоящих в неправильном относительном порядке',
          en: 'The number of inversions — pairs of elements standing in the wrong relative order',
        },
        {
          ru: 'Только с длиной всего массива целиком, и больше ни с чем другим',
          en: 'Only the total length of the whole array, and nothing else at all',
        },
        {
          ru: 'С числом простых делителей длины массива, что довольно необычно для алгоритмов сортировки',
          en: 'The number of prime divisors of the array length, which is unusual for sorting algorithms',
        },
        {
          ru: 'Только со значением самого вставляемого элемента, а не с его положением',
          en: 'Only the value of the element being inserted, not its position at all',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Для каждого элемента число сдвигов равно количеству элементов слева от него, которые больше него самого, — то есть числу инверсий, в которых он участвует. Сумма по всем элементам даёт общее число инверсий массива.',
        en: 'For each element, the number of shifts equals the number of elements to its left that are greater than it — i.e. the number of inversions it takes part in. Summed over all elements, this gives the array\'s total inversion count.',
      },
      hint: {
        ru: 'Подумай про пары элементов, стоящие «не в том порядке» друг относительно друга — как это обычно называется в теории сортировки.',
        en: 'Think about pairs of elements standing "out of order" relative to each other — what that is usually called in sorting theory.',
      },
    },
    {
      question: {
        ru: 'Бинарная сортировка вставками ищет место вставки бинарным поиском за O(log n). Почему это не ускоряет алгоритм до O(n log n)?',
        en: 'Binary insertion sort finds the insertion point via binary search in O(log n). Why doesn\'t this speed the algorithm up to O(n log n)?',
      },
      options: [
        {
          ru: 'Потому что сдвиг элементов для освобождения места всё равно остаётся O(n) операцией',
          en: 'Because shifting elements to make room is still an O(n) operation',
        },
        {
          ru: 'Потому что бинарный поиск в принципе не работает на обычных индексируемых массивах',
          en: 'Because binary search does not work on regular indexable arrays at all',
        },
        {
          ru: 'Потому что использование бинарного поиска делает получившийся алгоритм неустойчивым',
          en: 'Because using binary search makes the resulting algorithm unstable overall',
        },
        {
          ru: 'На самом деле это действительно ускоряет весь алгоритм целиком до O(n log n)',
          en: 'It actually does speed the whole algorithm up to O(n log n) overall',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Бинарный поиск сокращает число сравнений до O(log n) за вставку, но освобождение места под новый элемент по-прежнему требует сдвига до O(n) элементов — именно сдвиг, а не поиск, определяет асимптотику, поэтому в худшем случае остаётся O(n²).',
        en: 'Binary search cuts comparisons down to O(log n) per insertion, but making room for the new element still requires shifting up to O(n) elements — it\'s the shifting, not the search, that dominates the asymptotics, so the worst case stays O(n²).',
      },
      hint: {
        ru: 'Подумай, ускоряет ли более быстрый поиск позиции ещё и перемещение всех элементов, которые нужно сдвинуть, чтобы освободить эту позицию.',
        en: 'Think about whether finding the spot faster also speeds up moving all the elements that need to shift to free that spot.',
      },
    },
    {
      question: {
        ru: 'Нужен ли сдвиг элементов, если применить идею сортировки вставками к связному списку (linked list) вместо массива?',
        en: 'Is shifting needed if the idea of insertion sort is applied to a linked list instead of an array?',
      },
      options: [
        {
          ru: 'Нет — вставка узла в найденную позицию стоит O(1), сдвигать нечего',
          en: 'No — inserting a node at the found position costs O(1), there is nothing to shift',
        },
        {
          ru: 'Да, сдвиг элементов всегда обязателен независимо от используемой структуры данных',
          en: 'Yes, shifting elements is always required regardless of which data structure is used',
        },
        {
          ru: 'Связные списки в принципе нельзя сортировать с помощью сортировки вставками',
          en: 'Linked lists cannot be sorted with insertion sort as a matter of principle',
        },
        {
          ru: 'Применение к связному списку делает получившийся алгоритм сортировки неустойчивым',
          en: 'Applying it to a linked list makes the resulting sorting algorithm unstable overall',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В связном списке, как только найдена позиция вставки, «вклеить» туда новый узел — это просто переставить пару указателей, O(1). Поиск позиции всё ещё требует до O(n) обхода, но дорогостоящего сдвига остальных элементов, как в массиве, не происходит.',
        en: 'In a linked list, once the insertion point is found, splicing in the new node is just re-pointing a couple of pointers — O(1). Finding the position still takes up to O(n) traversal, but there is no expensive shifting of the remaining elements like in an array.',
      },
      hint: {
        ru: 'Подумай, что на самом деле означает «сдвиг» для непрерывного массива в памяти — и есть ли у связного списка такое же ограничение.',
        en: 'Think about what "shifting" actually means for a contiguous array in memory — and whether a linked list has the same constraint.',
      },
    },
    {
      question: {
        ru: 'Чем принципиально отличается объём работы сортировки вставками на почти отсортированных данных от объёма работы сортировки выбором?',
        en: 'How does the amount of work insertion sort does on nearly sorted data fundamentally differ from selection sort?',
      },
      options: [
        {
          ru: 'Работа вставками масштабируется с числом «беспорядка» в данных, а выбором всегда делает одно и то же число перестановок',
          en: "Insertion sort's work scales with how disordered the data is, while selection sort always performs the same number of swaps",
        },
        {
          ru: 'Оба алгоритма всегда выполняют совершенно одинаковый фиксированный объём работы независимо от степени упорядоченности исходных данных',
          en: 'Both algorithms always do exactly the same fixed amount of work regardless of how ordered the original input data already happens to be',
        },
        {
          ru: 'Сортировка выбором адаптируется к порядку входных данных, а сортировка вставками — совершенно нет',
          en: 'Selection sort adapts to the order of the input data, while insertion sort absolutely does not',
        },
        {
          ru: 'Сортировка вставками всегда делает больше операций записи, чем выбором, независимо от входных данных и их порядка',
          en: 'Insertion sort always writes more than selection sort, regardless of the input data and its ordering',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Число сдвигов сортировки вставками равно числу инверсий и стремится к нулю на почти отсортированных данных. Сортировка выбором игнорирует существующий порядок и всегда делает ровно n−1 перестановку, сколько бы элементов уже ни стояло на своих местах.',
        en: "Insertion sort's shift count equals the number of inversions and shrinks toward zero on nearly sorted data. Selection sort ignores existing order and always performs exactly n−1 swaps, no matter how many elements are already in place.",
      },
      hint: {
        ru: 'Вспомни, поведение какого из двух алгоритмов меняется в зависимости от того, насколько входные данные уже близки к отсортированным.',
        en: "Recall which of the two algorithms' behavior changes depending on how close the input already is to sorted.",
      },
    },
  ],
};

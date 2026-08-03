export const insertionSort = {
  slug: 'insertion-sort',
  category: 'sorting',
  name: { ru: 'Сортировка вставками', en: 'Insertion Sort' },
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
        { ru: 'Она требует подключения к интернету', en: 'It requires an internet connection' },
        { ru: 'Она работает только с числами с плавающей точкой', en: 'It only works with floating-point numbers' },
        { ru: 'Она использует облачные вычисления', en: 'It uses cloud computing' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отсортированная часть массива в любой момент валидна сама по себе — можно вставлять новые элементы по одному, не пересчитывая всё заново.',
        en: 'The sorted part of the array is valid on its own at any point — new elements can be inserted one at a time without recomputing everything.',
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
        { ru: 'Потому что она работает за O(n log n)', en: 'Because it runs in O(n log n)' },
        { ru: 'Потому что она использует меньше памяти, чем любой другой алгоритм', en: 'Because it uses less memory than any other algorithm' },
        { ru: 'Это не так, Timsort никогда не использует сортировку вставками', en: 'That\'s not true, Timsort never uses insertion sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'На маленьких подмассивах (обычно до ~32-64 элементов) практическая скорость сортировки вставками из-за низких констант превосходит асимптотически более быстрые, но более «тяжёлые» алгоритмы.',
        en: 'On small subarrays (typically up to ~32-64 elements), insertion sort\'s low constant factors make it practically faster than asymptotically superior but "heavier" algorithms.',
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
        { ru: 'Меняет местами два соседних элемента', en: 'Swaps two neighboring elements' },
        { ru: 'Ищет минимум во всём массиве', en: 'Searches for the minimum across the whole array' },
        { ru: 'Разбивает массив пополам', en: 'Splits the array in half' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от swap-based алгоритмов, вставками использует сдвиг (shift): элементы копируются на одну позицию вправо, пока не найдётся место для вставляемого значения.',
        en: 'Unlike swap-based algorithms, insertion sort uses a shift: elements are copied one position to the right until a spot is found for the value being inserted.',
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
        { ru: 'Она никогда не сравнивает равные элементы', en: 'It never compares equal elements' },
        { ru: 'Она использует хеш-таблицу для отслеживания порядка', en: 'It uses a hash table to track order' },
        { ru: 'Стабильность не гарантируется, это распространённое заблуждение', en: 'Stability is not guaranteed, this is a common misconception' },
      ],
      correct: 0,
      explanation: {
        ru: 'Цикл сдвига останавливается на условии `a[j] > current` (строгое сравнение) — равные элементы не сдвигаются, поэтому их относительный порядок сохраняется.',
        en: 'The shift loop stops on `a[j] > current` (strict comparison) — equal elements don\'t get shifted past, so their relative order is preserved.',
      },
    },
  ],
};

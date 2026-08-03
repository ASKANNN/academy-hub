export const selectionSort = {
  slug: 'selection-sort',
  category: 'sorting',
  name: { ru: 'Сортировка выбором', en: 'Selection Sort' },
  complexity: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Сортировка выбором на каждом шаге находит наименьший элемент в неотсортированной части массива и ставит его сразу после уже отсортированной части.',
    en: 'Selection sort repeatedly finds the smallest element in the unsorted part of the array and places it right after the sorted part.',
  },

  problem: {
    ru: 'Нужно отсортировать массив, но при этом минимизировать количество операций записи (перестановок), потому что запись в память или на диск иногда дороже, чем чтение и сравнение. Пузырьковая сортировка делает перестановку почти при каждом сравнении — хочется алгоритм, который переставляет элементы реже.',
    en: 'You need to sort an array while minimizing the number of writes (swaps), because writing to memory or disk is sometimes more expensive than reading and comparing. Bubble sort swaps on almost every comparison — a cheaper alternative in terms of writes would help.',
  },

  solution: {
    ru: 'Массив мысленно делится на отсортированную часть слева и неотсортированную справа. На каждом шаге алгоритм просматривает всю неотсортированную часть, находит в ней минимальный элемент и меняет его местами с первым элементом неотсортированной части — ровно одна перестановка за шаг, независимо от того, сколько было сравнений.',
    en: 'The array is conceptually split into a sorted left part and an unsorted right part. On each step, the algorithm scans the entire unsorted part, finds its minimum, and swaps it with the first element of the unsorted part — exactly one swap per step, no matter how many comparisons it took.',
  },

  steps: [
    {
      title: { ru: 'Отметить границу', en: 'Mark the boundary' },
      explanation: {
        ru: 'Считать всё слева от текущей позиции уже отсортированным, всё справа — нет.',
        en: 'Treat everything left of the current position as sorted, everything to the right as not.',
      },
    },
    {
      title: { ru: 'Найти минимум справа', en: 'Find the minimum on the right' },
      explanation: {
        ru: 'Пройти всю неотсортированную часть и запомнить индекс наименьшего элемента.',
        en: 'Scan the whole unsorted part and remember the index of the smallest element.',
      },
    },
    {
      title: { ru: 'Поменять местами один раз', en: 'Swap once' },
      explanation: {
        ru: 'Обменять найденный минимум с элементом на границе — ровно одна перестановка за шаг.',
        en: 'Swap the found minimum with the element at the boundary — exactly one swap per step.',
      },
    },
    {
      title: { ru: 'Сдвинуть границу', en: 'Advance the boundary' },
      explanation: {
        ru: 'Отсортированная часть выросла на один элемент — сдвинуть границу на позицию вправо.',
        en: 'The sorted part grew by one element — move the boundary one position to the right.',
      },
    },
    {
      title: { ru: 'Повторять до конца', en: 'Repeat to the end' },
      explanation: {
        ru: 'Повторять поиск минимума и перестановку, пока неотсортированная часть не сведётся к одному элементу.',
        en: 'Repeat finding the minimum and swapping until the unsorted part is down to one element.',
      },
    },
  ],

  implementation: {
    javascript: `function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
    }
  }
  return a;
}`,
    python: `def selection_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if a[j] < a[min_index]:
                min_index = j
        if min_index != i:
            a[i], a[min_index] = a[min_index], a[i]
    return a`,
  },

  pros: [
    {
      ru: 'Делает не более n−1 перестановок, независимо от исходного порядка данных — полезно, когда запись дороже сравнения.',
      en: 'Makes at most n−1 swaps regardless of the initial order — useful when writes are more expensive than comparisons.',
    },
    {
      ru: 'Простая реализация без рекурсии и дополнительных структур данных.',
      en: 'Simple implementation with no recursion or extra data structures.',
    },
    {
      ru: 'Сортирует на месте — O(1) дополнительной памяти.',
      en: 'Sorts in place — O(1) extra memory.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений всегда — в отличие от пузырьковой сортировки, нет способа завершиться раньше на почти отсортированных данных.',
      en: 'Always O(n²) comparisons — unlike bubble sort, there is no way to finish early on nearly sorted data.',
    },
    {
      ru: 'Неустойчив в базовой реализации: перестановка минимума с границей может изменить относительный порядок равных элементов.',
      en: 'Unstable in the basic implementation: swapping the minimum with the boundary can change the relative order of equal elements.',
    },
    {
      ru: 'На больших наборах данных проигрывает по скорости алгоритмам O(n log n).',
      en: 'Loses on speed to O(n log n) algorithms on large datasets.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда операция записи в память заметно дороже сравнения — например, запись на флеш-память с ограниченным числом циклов перезаписи.',
      en: 'When a write operation is noticeably more expensive than a comparison — e.g. writing to flash memory with limited write cycles.',
    },
    {
      ru: 'Для небольших массивов или как шаг в комбинированных алгоритмах (например, в качестве finishing touch для маленьких подмассивов в интроспективной сортировке).',
      en: 'For small arrays, or as a step inside hybrid algorithms (e.g. as the finishing touch for small subarrays in introspective sort).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Сортировка данных на носителях с дорогой записью** — там, где важно свести число операций записи к минимуму, а не число сравнений.',
      en: '**Sorting on storage with expensive writes** — where minimizing the number of write operations matters more than the number of comparisons.',
    },
    {
      ru: '**Учебные визуализации** — предсказуемое, линейно нарастающее поведение делает алгоритм удобным для демонстрации самой идеи «выбора минимума».',
      en: '**Teaching visualizations** — its predictable, linearly growing behavior makes it convenient for demonstrating the "pick the minimum" idea itself.',
    },
  ],

  relatedAlgorithms: ['bubble-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Сколько перестановок (swap) максимум выполнит сортировка выбором на массиве из n элементов?',
        en: 'At most how many swaps will selection sort perform on an array of n elements?',
      },
      options: [
        { ru: 'n − 1', en: 'n − 1' },
        { ru: 'n²', en: 'n²' },
        { ru: 'n log n', en: 'n log n' },
        { ru: 'Ровно n', en: 'Exactly n' },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом из n−1 шагов происходит не более одной перестановки — минимум обменивается с элементом на границе.',
        en: 'Each of the n−1 steps performs at most one swap — the minimum is exchanged with the boundary element.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка выбором может считаться неустойчивой (unstable)?',
        en: 'Why can selection sort be considered unstable?',
      },
      options: [
        {
          ru: 'Перестановка минимума с границей может «перепрыгнуть» через равный элемент и изменить его относительный порядок',
          en: 'Swapping the minimum with the boundary can "jump over" an equal element and change its relative order',
        },
        { ru: 'Алгоритм использует случайные числа', en: 'The algorithm uses random numbers' },
        { ru: 'Он не сортирует на месте', en: 'It does not sort in place' },
        { ru: 'Он работает только с целыми числами', en: 'It only works with integers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если минимум находится дальше в массиве, чем равный ему по значению элемент ближе к границе, обмен местами меняет их исходный порядок.',
        en: 'If the minimum is found further in the array than an equal-valued element closer to the boundary, the swap changes their original order.',
      },
    },
    {
      question: {
        ru: 'В чём главное отличие сортировки выбором от пузырьковой в терминах производительности?',
        en: 'What is the main performance difference between selection sort and bubble sort?',
      },
      options: [
        {
          ru: 'Сортировка выбором делает намного меньше перестановок, но столько же сравнений',
          en: 'Selection sort makes far fewer swaps but the same number of comparisons',
        },
        { ru: 'Сортировка выбором работает за O(n log n)', en: 'Selection sort runs in O(n log n)' },
        { ru: 'Сортировка выбором требует O(n) дополнительной памяти', en: 'Selection sort needs O(n) extra memory' },
        { ru: 'Разницы нет — оба алгоритма идентичны по производительности', en: 'There is no difference — both algorithms perform identically' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма делают O(n²) сравнений, но сортировка выбором ограничивает число перестановок до n−1, тогда как пузырьковая может переставлять элементы почти при каждом сравнении.',
        en: 'Both make O(n²) comparisons, but selection sort caps swaps at n−1, while bubble sort can swap on almost every comparison.',
      },
    },
    {
      question: {
        ru: 'Есть ли у сортировки выбором лучший случай быстрее O(n²)?',
        en: 'Does selection sort have a best case faster than O(n²)?',
      },
      options: [
        {
          ru: 'Нет — она всегда просматривает всю неотсортированную часть на каждом шаге',
          en: 'No — it always scans the entire unsorted part on every step',
        },
        { ru: 'Да, O(n) на уже отсортированном массиве', en: 'Yes, O(n) on an already sorted array' },
        { ru: 'Да, O(log n) на случайных данных', en: 'Yes, O(log n) on random data' },
        { ru: 'Да, но только для строк', en: 'Yes, but only for strings' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от пузырьковой сортировки с ранним выходом, сортировка выбором всегда ищет минимум по всей оставшейся части — сравнения не зависят от исходного порядка.',
        en: 'Unlike bubble sort with early exit, selection sort always searches for the minimum across the whole remaining part — comparisons don\'t depend on the initial order.',
      },
    },
    {
      question: {
        ru: 'Когда сортировка выбором особенно уместна?',
        en: 'When is selection sort particularly appropriate?',
      },
      options: [
        {
          ru: 'Когда операция записи заметно дороже операции сравнения',
          en: 'When a write operation is noticeably more expensive than a comparison',
        },
        { ru: 'Для сортировки многогигабайтных файлов на диске', en: 'For sorting multi-gigabyte files on disk' },
        { ru: 'Когда данные почти отсортированы', en: 'When the data is nearly sorted' },
        { ru: 'Для сортировки связных списков', en: 'For sorting linked lists' },
      ],
      correct: 0,
      explanation: {
        ru: 'Минимизация количества перестановок — главное преимущество алгоритма, поэтому он оправдан там, где запись стоит дороже, чем чтение и сравнение.',
        en: 'Minimizing the number of swaps is the algorithm\'s main advantage, so it pays off where writing costs more than reading and comparing.',
      },
    },
  ],
};

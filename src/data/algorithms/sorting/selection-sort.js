export const selectionSort = {
  slug: 'selection-sort',
  category: 'sorting',
  name: { ru: 'Selection Sort', en: 'Selection Sort' },
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
    ru: 'Нужно отсортировать массив, но при этом минимизировать количество операций записи (перестановок), потому что запись в память или на диск иногда дороже, чем чтение и сравнение. Пузырьковая сортировка делает перестановку почти при каждом сравнении - хочется алгоритм, который переставляет элементы реже.',
    en: 'You need to sort an array while minimizing the number of writes (swaps), because writing to memory or disk is sometimes more expensive than reading and comparing. Bubble sort swaps on almost every comparison - a cheaper alternative in terms of writes would help.',
  },

  solution: {
    ru: 'Массив мысленно делится на отсортированную часть слева и неотсортированную справа. На каждом шаге алгоритм просматривает всю неотсортированную часть, находит в ней минимальный элемент и меняет его местами с первым элементом неотсортированной части - ровно одна перестановка за шаг, независимо от того, сколько было сравнений.',
    en: 'The array is conceptually split into a sorted left part and an unsorted right part. On each step, the algorithm scans the entire unsorted part, finds its minimum, and swaps it with the first element of the unsorted part - exactly one swap per step, no matter how many comparisons it took.',
  },

  steps: [
    {
      title: { ru: 'Отметить границу', en: 'Mark the boundary' },
      explanation: {
        ru: 'Считать всё слева от текущей позиции уже отсортированным, всё справа - нет.',
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
        ru: 'Обменять найденный минимум с элементом на границе - ровно одна перестановка за шаг.',
        en: 'Swap the found minimum with the element at the boundary - exactly one swap per step.',
      },
    },
    {
      title: { ru: 'Сдвинуть границу', en: 'Advance the boundary' },
      explanation: {
        ru: 'Отсортированная часть выросла на один элемент - сдвинуть границу на позицию вправо.',
        en: 'The sorted part grew by one element - move the boundary one position to the right.',
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
  stepBreakpoints: [9, 11, 24, 36],

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
      ru: 'Делает не более n−1 перестановок, независимо от исходного порядка данных - полезно, когда запись дороже сравнения.',
      en: 'Makes at most n−1 swaps regardless of the initial order - useful when writes are more expensive than comparisons.',
    },
    {
      ru: 'Простая реализация без рекурсии и дополнительных структур данных.',
      en: 'Simple implementation with no recursion or extra data structures.',
    },
    {
      ru: 'Сортирует на месте - O(1) дополнительной памяти.',
      en: 'Sorts in place - O(1) extra memory.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений всегда - в отличие от пузырьковой сортировки, нет способа завершиться раньше на почти отсортированных данных.',
      en: 'Always O(n²) comparisons - unlike bubble sort, there is no way to finish early on nearly sorted data.',
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
      ru: 'Когда операция записи в память заметно дороже сравнения - например, запись на флеш-память с ограниченным числом циклов перезаписи.',
      en: 'When a write operation is noticeably more expensive than a comparison - e.g. writing to flash memory with limited write cycles.',
    },
    {
      ru: 'Для небольших массивов или как шаг в комбинированных алгоритмах (например, в качестве finishing touch для маленьких подмассивов в интроспективной сортировке).',
      en: 'For small arrays, or as a step inside hybrid algorithms (e.g. as the finishing touch for small subarrays in introspective sort).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Сортировка данных на носителях с дорогой записью** - там, где важно свести число операций записи к минимуму, а не число сравнений.',
      en: '**Sorting on storage with expensive writes** - where minimizing the number of write operations matters more than the number of comparisons.',
    },
    {
      ru: '**Учебные визуализации** - предсказуемое, линейно нарастающее поведение делает алгоритм удобным для демонстрации самой идеи «выбора минимума».',
      en: '**Teaching visualizations** - its predictable, linearly growing behavior makes it convenient for demonstrating the "pick the minimum" idea itself.',
    },
  ],

  relatedAlgorithms: ['bubble-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Какова временная сложность сортировки выбором в лучшем, среднем и худшем случаях?',
        en: 'What is the time complexity of selection sort in the best, average, and worst cases?',
      },
      options: [
        { ru: 'O(n²) во всех трёх случаях - количество сравнений не зависит от порядка', en: 'O(n²) in all three cases - comparisons never depend on input order' },
        { ru: 'O(n) в лучшем случае (уже отсортирован) и O(n²) в худшем', en: 'O(n) in the best case (already sorted) and O(n²) in the worst' },
        { ru: 'O(n log n) в среднем случае благодаря встроенному бинарному поиску минимума', en: 'O(n log n) on average thanks to a built-in binary search for the minimum' },
        { ru: 'O(n²) в худшем и O(n log n) в среднем, как у большинства популярных алгоритмов', en: 'O(n²) in the worst and O(n log n) on average, like most popular algorithms' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка выбором всегда проходит весь оставшийся неотсортированный участок на каждом шаге - число сравнений фиксировано и равно n(n−1)/2 независимо от расположения элементов. Ни одного «лучшего» случая не существует.',
        en: 'Selection sort always scans the entire remaining unsorted range on every step - the number of comparisons is fixed at n(n−1)/2 regardless of element order. There is no "good" case.',
      },
      hint: {
        ru: 'Подумай, может ли внутренний цикл поиска минимума пропустить часть массива хотя бы в одном случае.',
        en: 'Think about whether the inner loop searching for the minimum can ever skip part of the array in any case.',
      },
    },
    {
      question: {
        ru: 'Какой инвариант сортировка выбором поддерживает в начале каждого шага?',
        en: 'What invariant does selection sort maintain at the start of every step?',
      },
      options: [
        {
          ru: 'Слева от границы всё уже на своём окончательном отсортированном месте',
          en: 'Everything left of the boundary is already in its final sorted position',
        },
        {
          ru: 'Весь массив в любой момент является корректной кучей относительно значений',
          en: 'The whole array is a valid heap with respect to values at every moment',
        },
        {
          ru: 'Элементы отсортированы по модулю значения, а не по самому значению',
          en: 'Elements are sorted by absolute value rather than by their actual value',
        },
        {
          ru: 'Массив в любой момент разбит на две уже независимо отсортированные половины',
          en: 'The array is split into two already independently sorted halves at all times',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Это инвариант цикла, который делает алгоритм корректным: как только элемент поставлен на границу и граница сдвинута, этот элемент больше никогда не трогается.',
        en: "This is the loop invariant that makes the algorithm correct: once an element is placed at the boundary and the boundary advances, that element is never touched again.",
      },
      hint: {
        ru: 'Подумай, что остаётся неизменным для элементов, уже оказавшихся слева от текущей границы шага.',
        en: "Think about what stays unchanged for elements that already ended up left of the current step's boundary.",
      },
    },
    {
      question: {
        ru: 'Сколько всего сравнений выполнит сортировка выбором на массиве из n элементов, независимо от исходного порядка?',
        en: 'How many total comparisons does selection sort perform on an array of n elements, regardless of the initial order?',
      },
      options: [
        { ru: 'n(n − 1) / 2', en: 'n(n − 1) / 2' },
        {
          ru: 'n log n - как у оптимальных алгоритмов сравнения',
          en: 'n log n - matching the optimal comparison-based algorithms',
        },
        {
          ru: 'n − 1 - столько же, сколько и максимальное число перестановок',
          en: 'n − 1 - the same as the maximum number of swaps',
        },
        {
          ru: 'Зависит от исходного порядка расположения элементов в массиве',
          en: 'It depends on the initial order in which the elements are arranged',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом из n−1 шагов алгоритм просматривает весь оставшийся неотсортированный участок: (n−1) + (n−2) + … + 1 = n(n − 1) / 2 сравнений - эта сумма не зависит от того, как расположены элементы.',
        en: 'Each of the n−1 steps scans the entire remaining unsorted range: (n−1) + (n−2) + … + 1 = n(n − 1) / 2 comparisons - this sum does not depend on how the elements are arranged.',
      },
      hint: {
        ru: 'Просуммируй, сколько элементов просматривается на каждом из n−1 шагов.',
        en: 'Sum up how many elements get scanned on each of the n−1 steps.',
      },
    },
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
        ru: 'На каждом из n−1 шагов происходит не более одной перестановки - минимум обменивается с элементом на границе.',
        en: 'Each of the n−1 steps performs at most one swap - the minimum is exchanged with the boundary element.',
      },
      hint: {
        ru: 'Подумай, сколько перестановок происходит за один шаг, и сколько всего таких шагов в алгоритме.',
        en: 'Think about how many swaps happen per step, and how many steps the algorithm takes in total.',
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
        {
          ru: 'Алгоритм использует случайные числа для выбора следующего элемента на каждом шаге, что делает результат непредсказуемым',
          en: 'The algorithm uses random numbers to decide the next element to process at every step, making the result unpredictable',
        },
        {
          ru: 'Он не сортирует на месте, требуя отдельного вспомогательного массива для результата размером с исходный',
          en: 'It does not sort in place, requiring a separate auxiliary array the same size as the original for the result',
        },
        {
          ru: 'Он работает только с целыми числами и не может обрабатывать строки или объекты',
          en: 'It only works with integers and cannot handle strings or arbitrary objects',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Если минимум находится дальше в массиве, чем равный ему по значению элемент ближе к границе, обмен местами меняет их исходный порядок.',
        en: 'If the minimum is found further in the array than an equal-valued element closer to the boundary, the swap changes their original order.',
      },
      hint: {
        ru: 'Подумай, что происходит с равным по значению элементом, стоящим между границей и найденным минимумом, когда происходит обмен.',
        en: 'Think about what happens to an equal-valued element sitting between the boundary and the found minimum when the swap happens.',
      },
    },
    {
      question: {
        ru: 'Есть ли у сортировки выбором лучший случай быстрее O(n²)?',
        en: 'Does selection sort have a best case faster than O(n²)?',
      },
      options: [
        {
          ru: 'Нет - она всегда просматривает всю неотсортированную часть на каждом шаге',
          en: 'No - it always scans the entire unsorted part on every step',
        },
        {
          ru: 'Да, O(n) на уже отсортированном массиве благодаря раннему выходу из цикла',
          en: 'Yes, O(n) on an already sorted array thanks to an early exit from the loop',
        },
        {
          ru: 'Да, O(log n) на случайных данных за счёт бинарного поиска минимума',
          en: 'Yes, O(log n) on random data thanks to a binary search for the minimum',
        },
        {
          ru: 'Да, но только для строк благодаря лексикографическому сравнению символов',
          en: 'Yes, but only for strings thanks to lexicographic character comparison',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от пузырьковой сортировки с ранним выходом, сортировка выбором всегда ищет минимум по всей оставшейся части - сравнения не зависят от исходного порядка.',
        en: "Unlike bubble sort with early exit, selection sort always searches for the minimum across the whole remaining part - comparisons don't depend on the initial order.",
      },
      hint: {
        ru: 'Подумай, может ли внутренний цикл поиска минимума когда-нибудь пропустить часть неотсортированного участка.',
        en: 'Think about whether the inner minimum-search loop can ever skip part of the unsorted range.',
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
        {
          ru: 'Для сортировки многогигабайтных файлов на диске с ограниченной оперативной памятью',
          en: 'For sorting multi-gigabyte files on disk with limited available memory',
        },
        {
          ru: 'Когда данные почти отсортированы и нужен алгоритм с ранним завершением',
          en: 'When the data is nearly sorted and an early-exit algorithm is desired',
        },
        {
          ru: 'Для сортировки связных списков, где произвольный доступ к элементам недоступен',
          en: 'For sorting linked lists, where random access to elements is unavailable',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Минимизация количества перестановок - главное преимущество алгоритма, поэтому он оправдан там, где запись стоит дороже, чем чтение и сравнение.',
        en: "Minimizing the number of swaps is the algorithm's main advantage, so it pays off where writing costs more than reading and comparing.",
      },
      hint: {
        ru: 'Вспомни главное преимущество алгоритма из его описания - что именно он минимизирует ценой большего числа сравнений.',
        en: "Recall the algorithm's main advantage from its description - what exactly it minimizes at the cost of more comparisons.",
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
        {
          ru: 'Сортировка выбором работает за O(n log n) благодаря более умному поиску минимума',
          en: 'Selection sort runs in O(n log n) thanks to a smarter way of locating the minimum',
        },
        {
          ru: 'Сортировка выбором требует O(n) дополнительной памяти для хранения промежуточных результатов',
          en: 'Selection sort needs O(n) extra memory to store intermediate results during sorting',
        },
        {
          ru: 'Разницы нет - оба алгоритма идентичны по производительности в любых сценариях',
          en: 'There is no difference - both algorithms perform identically in every scenario',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма делают O(n²) сравнений, но сортировка выбором ограничивает число перестановок до n−1, тогда как пузырьковая может переставлять элементы почти при каждом сравнении.',
        en: 'Both make O(n²) comparisons, but selection sort caps swaps at n−1, while bubble sort can swap on almost every comparison.',
      },
      hint: {
        ru: 'Раздели вопрос на два отдельных счётчика: сколько сравнений и сколько перестановок делает каждый алгоритм.',
        en: 'Split the question into two separate counters: how many comparisons and how many swaps each algorithm performs.',
      },
    },
    {
      question: {
        ru: 'Какой классический алгоритм можно рассматривать как ускоренную версию шага «найти минимум» из сортировки выбором?',
        en: "Which classic algorithm can be seen as a sped-up version of selection sort's 'find the minimum' step?",
      },
      options: [
        {
          ru: 'Пирамидальная сортировка - находит минимум/максимум за O(log n) вместо O(n)',
          en: 'Heap sort - it finds the minimum/maximum in O(log n) instead of O(n)',
        },
        {
          ru: 'Сортировка слиянием - делит массив пополам и сливает отсортированные половины обратно',
          en: 'Merge sort - splits the array in half and merges the sorted halves back together',
        },
        {
          ru: 'Сортировка подсчётом - считает частоту каждого значения вместо сравнения элементов',
          en: 'Counting sort - tallies the frequency of each value instead of comparing elements',
        },
        {
          ru: 'Пузырьковая сортировка - многократно меняет местами соседние элементы не по порядку',
          en: 'Bubble sort - repeatedly swaps adjacent elements that are out of order with each other',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Пирамидальная сортировка хранит неотсортированную часть в виде кучи, поэтому извлечение следующего экстремального элемента стоит O(log n) вместо полного линейного просмотра - это и снижает общую сложность до O(n log n).',
        en: 'Heap sort keeps the unsorted part as a heap, so extracting the next extreme element costs O(log n) instead of a full linear scan - this is exactly what brings the total complexity down to O(n log n).',
      },
      hint: {
        ru: 'Подумай, какая структура данных позволяет находить минимум быстрее, чем перебором всех элементов подряд.',
        en: 'Think about what data structure lets you find a minimum faster than scanning every element one by one.',
      },
    },
    {
      question: {
        ru: 'Как можно сделать сортировку выбором устойчивой (stable), пожертвовав числом операций записи?',
        en: 'How can selection sort be made stable, at the cost of extra writes?',
      },
      options: [
        {
          ru: 'Вставлять найденный минимум на место сдвигом элементов, а не прямым обменом с границей',
          en: 'Insert the found minimum into place by shifting elements over, instead of directly swapping with the boundary',
        },
        {
          ru: 'Сортировать в обратном порядке, а затем полностью развернуть весь итоговый результат целиком в самом конце работы',
          en: 'Sort in reverse order and then completely reverse the entire final result afterward at the very end of the run',
        },
        {
          ru: 'Использовать два отдельных массива и постоянно копировать элементы туда и обратно между ними на каждом шаге',
          en: 'Use two separate arrays and constantly copy elements back and forth between them at every single step',
        },
        {
          ru: 'Это принципиально невозможно сделать для данного конкретного алгоритма никаким известным способом',
          en: 'It is fundamentally impossible to do for this particular algorithm by any known method whatsoever',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Устойчивость ломается именно из-за прямого обмена, который «перепрыгивает» через равный элемент. Если вместо обмена сдвигать элементы, освобождая место для минимума (как в сортировке вставками), относительный порядок равных элементов сохранится - ценой до O(n) записей за шаг вместо одной.',
        en: 'Stability breaks specifically because of the direct swap, which "jumps over" an equal element. If, instead of swapping, elements are shifted to make room for the minimum (like in insertion sort), the relative order of equal elements is preserved - at the cost of up to O(n) writes per step instead of one.',
      },
      hint: {
        ru: 'Подумай, что именно ломает устойчивость - сам обмен местами - и как избежать этого «перепрыгивания».',
        en: 'Think about what specifically breaks stability - the swap itself - and how you would avoid that "jump".',
      },
    },
  ],
};

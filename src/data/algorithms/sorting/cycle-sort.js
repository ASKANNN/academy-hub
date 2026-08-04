export const cycleSort = {
  slug: 'cycle-sort',
  category: 'sorting',
  name: { ru: 'Циклическая сортировка', en: 'Cycle Sort' },
  complexity: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable', 'minimizes-writes'],

  intent: {
    ru: 'Циклическая сортировка находит для каждого элемента его финальную позицию в отсортированном массиве и переставляет элементы по циклам так, чтобы каждый элемент был записан ровно один раз.',
    en: 'Cycle sort finds each element\'s final position in the sorted array and rotates elements through cycles so that each element is written exactly once.',
  },

  problem: {
    ru: 'На флеш-памяти, EEPROM или в системах, где каждая запись стоит дорого (ограниченный ресурс перезаписи, дорогая операция ввода-вывода), важно не количество сравнений, а количество записей. Большинство сортировок делают O(n log n) или O(n²) записей — нужен алгоритм, который сортирует массив с теоретически минимальным числом записей.',
    en: 'On flash memory, EEPROM, or in systems where each write is expensive (limited write endurance, costly I/O), what matters isn\'t the number of comparisons but the number of writes. Most sorts perform O(n log n) or O(n²) writes — an algorithm is needed that sorts with the theoretically minimal number of writes.',
  },

  solution: {
    ru: 'Для каждой позиции i вычисляется, сколько элементов массива меньше a[i] — это и есть правильная позиция элемента в отсортированном массиве. Если элемент уже на своём месте, он пропускается без записи. Иначе элемент записывается на верную позицию, а элемент, который там был, вытесняется и ищет уже свою правильную позицию — так образуется «цикл» перестановок, который завершается, когда вытесненный элемент возвращается в исходную точку. Каждый элемент внутри цикла записывается ровно один раз — общее число записей равно n минус число уже правильно стоящих элементов, что является теоретическим минимумом.',
    en: 'For each position i, the algorithm computes how many array elements are less than a[i] — that is the element\'s correct position in the sorted array. If the element is already in place, it is skipped without a write. Otherwise, the element is written to its correct position, and whatever element was there gets displaced and looks for its own correct position — forming a "cycle" of rotations that closes when the displaced element returns to its starting point. Each element within a cycle is written exactly once — the total write count equals n minus the number of already-correct elements, the theoretical minimum.',
  },

  steps: [
    {
      title: { ru: 'Начать цикл с позиции i', en: 'Start a cycle at position i' },
      explanation: {
        ru: 'Взять элемент на позиции i и посчитать, сколько элементов массива меньше него — это его правильная позиция.',
        en: 'Take the element at position i and count how many array elements are smaller — that is its correct position.',
      },
    },
    {
      title: { ru: 'Пропустить, если элемент уже на месте', en: 'Skip if the element is already in place' },
      explanation: {
        ru: 'Если правильная позиция совпадает с текущей, перейти к следующей позиции без записи.',
        en: 'If the correct position matches the current one, move to the next position without a write.',
      },
    },
    {
      title: { ru: 'Записать элемент на правильную позицию', en: 'Write the element to its correct position' },
      explanation: {
        ru: 'Поменять элемент местами с тем, что стоит на его правильной позиции — вытесненный элемент теперь нужно пристроить.',
        en: 'Swap the element with whatever occupies its correct position — the displaced element now needs to be placed too.',
      },
    },
    {
      title: { ru: 'Продолжить цикл для вытесненного элемента', en: 'Continue the cycle for the displaced element' },
      explanation: {
        ru: 'Повторить процесс для вытесненного элемента: найти его правильную позицию и записать туда.',
        en: 'Repeat the process for the displaced element: find its correct position and write it there.',
      },
    },
    {
      title: { ru: 'Замкнуть цикл', en: 'Close the cycle' },
      explanation: {
        ru: 'Цикл завершается, когда вытесненный элемент возвращается на позицию i — тогда переходим к следующей начальной позиции.',
        en: 'The cycle closes when the displaced element returns to position i — then move on to the next starting position.',
      },
    },
  ],

  implementation: {
    javascript: `function cycleSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = a[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < n; i++) {
      if (a[i] < item) pos++;
    }
    if (pos === cycleStart) continue;

    while (item === a[pos]) pos++;
    [a[pos], item] = [item, a[pos]];

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (a[i] < item) pos++;
      }
      while (item === a[pos]) pos++;
      [a[pos], item] = [item, a[pos]];
    }
  }
  return a;
}`,
    python: `def cycle_sort(arr):
    a = arr.copy()
    n = len(a)

    for cycle_start in range(n - 1):
        item = a[cycle_start]
        pos = cycle_start

        for i in range(cycle_start + 1, n):
            if a[i] < item:
                pos += 1
        if pos == cycle_start:
            continue

        while item == a[pos]:
            pos += 1
        a[pos], item = item, a[pos]

        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, n):
                if a[i] < item:
                    pos += 1
            while item == a[pos]:
                pos += 1
            a[pos], item = item, a[pos]

    return a`,
  },

  pros: [
    {
      ru: 'Теоретически минимальное число записей в массив — каждый элемент записывается не более одного раза за весь алгоритм.',
      en: 'Theoretically minimal number of array writes — each element is written at most once during the entire algorithm.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти.',
      en: 'Sorts in place with O(1) extra memory.',
    },
    {
      ru: 'Незаменим там, где запись физически дороже чтения (флеш-память, EEPROM с ограниченным ресурсом циклов перезаписи).',
      en: 'Invaluable where writes are physically more expensive than reads (flash memory, EEPROM with limited write-cycle endurance).',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений даже в лучшем случае — на большинстве современных процессоров вычисления дешевле записи, поэтому этот компромисс редко оправдан вне embedded-систем.',
      en: 'O(n²) comparisons even in the best case — on most modern CPUs, computation is cheaper than writes, so this tradeoff rarely pays off outside embedded systems.',
    },
    {
      ru: 'Неустойчив — не сохраняет относительный порядок равных элементов.',
      en: 'Not stable — doesn\'t preserve the relative order of equal elements.',
    },
    {
      ru: 'Существенно медленнее quicksort/mergesort по общему времени выполнения на обычном железе.',
      en: 'Significantly slower than quicksort/merge sort in total runtime on typical hardware.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортировка происходит во флеш-памяти или EEPROM, где важно минимизировать число циклов записи.',
      en: 'When sorting happens on flash memory or EEPROM, where minimizing write cycles matters.',
    },
    {
      ru: 'В embedded-системах, где запись в память энергозатратна или физически ограничена по ресурсу.',
      en: 'In embedded systems where writing to memory is power-costly or physically limited in endurance.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Прошивки embedded-устройств** — сортировка конфигурационных данных прямо во флеш-памяти микроконтроллера с ограниченным числом циклов перезаписи.',
      en: '**Embedded device firmware** — sorting configuration data directly in a microcontroller\'s flash memory with a limited number of rewrite cycles.',
    },
    {
      ru: '**Задача «найти недостающее/дублирующееся число»** — циклическая сортировка часто используется как приём для задач с числами в диапазоне [1, n] за O(n) времени и O(1) памяти.',
      en: '**"Find the missing/duplicate number" problems** — cycle sort\'s technique is often reused as a trick for problems with numbers in range [1, n] in O(n) time and O(1) space.',
    },
  ],

  relatedAlgorithms: ['selection-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что минимизирует циклическая сортировка по сравнению с другими алгоритмами сортировки?',
        en: 'What does cycle sort minimize compared to other sorting algorithms?',
      },
      options: [
        { ru: 'Число записей в массив', en: 'The number of array writes' },
        { ru: 'Число сравнений', en: 'The number of comparisons' },
        { ru: 'Используемую память', en: 'Memory usage' },
        { ru: 'Глубину рекурсии', en: 'Recursion depth' },
      ],
      correct: 0,
      explanation: {
        ru: 'Циклическая сортировка жертвует числом сравнений (O(n²)) ради теоретически минимального числа записей — каждый элемент пишется не более одного раза.',
        en: 'Cycle sort sacrifices comparison count (O(n²)) for a theoretically minimal write count — each element is written at most once.',
      },
    },
    {
      question: {
        ru: 'Почему циклическая сортировка особенно полезна на флеш-памяти?',
        en: 'Why is cycle sort especially useful on flash memory?',
      },
      options: [
        {
          ru: 'Флеш-память имеет ограниченный ресурс циклов перезаписи, а запись физически дороже чтения',
          en: 'Flash memory has limited write-cycle endurance, and writes are physically more expensive than reads',
        },
        { ru: 'Флеш-память не поддерживает чтение произвольного доступа', en: 'Flash memory doesn\'t support random-access reads' },
        { ru: 'Циклическая сортировка не использует сравнения вообще', en: 'Cycle sort doesn\'t use comparisons at all' },
        { ru: 'Это единственный алгоритм, который умеет сортировать байты', en: 'It\'s the only algorithm that can sort bytes' },
      ],
      correct: 0,
      explanation: {
        ru: 'Минимизация записей напрямую продлевает срок службы флеш-памяти и снижает энергопотребление — то, за что другие алгоритмы не оптимизируют.',
        en: 'Minimizing writes directly extends flash memory lifespan and reduces power consumption — something other algorithms don\'t optimize for.',
      },
    },
    {
      question: {
        ru: 'Как циклическая сортировка находит правильную позицию элемента без вспомогательных структур?',
        en: 'How does cycle sort find an element\'s correct position without auxiliary structures?',
      },
      options: [
        {
          ru: 'Подсчитывает, сколько элементов в массиве меньше данного',
          en: 'It counts how many elements in the array are smaller than the given one',
        },
        { ru: 'Использует бинарный поиск по отсортированной копии', en: 'It uses binary search on a sorted copy' },
        { ru: 'Строит хеш-таблицу значений', en: 'It builds a hash table of values' },
        { ru: 'Запрашивает позицию у пользователя', en: 'It asks the user for the position' },
      ],
      correct: 0,
      explanation: {
        ru: 'Число элементов меньше данного равно числу позиций перед ним в отсортированном порядке — это и есть его целевой индекс.',
        en: 'The count of smaller elements equals the number of positions before it in sorted order — that is exactly its target index.',
      },
    },
    {
      question: {
        ru: 'Почему циклическая сортировка редко используется вне embedded-систем?',
        en: 'Why is cycle sort rarely used outside embedded systems?',
      },
      options: [
        {
          ru: 'На обычном железе вычисления дешевле записи, а O(n²) сравнений делает её медленнее quicksort/mergesort',
          en: 'On typical hardware, computation is cheaper than writes, and O(n²) comparisons make it slower than quicksort/merge sort',
        },
        { ru: 'Она требует O(n) дополнительной памяти', en: 'It requires O(n) extra memory' },
        { ru: 'Она не работает с целыми числами', en: 'It doesn\'t work with integers' },
        { ru: 'Она не была опубликована в открытом доступе', en: 'It was never published openly' },
      ],
      correct: 0,
      explanation: {
        ru: 'На CPU и RAM запись почти так же дешева, как чтение — компромисс "меньше записей ценой квадратичных сравнений" там невыгоден.',
        en: 'On CPU and RAM, writes are nearly as cheap as reads — the "fewer writes at the cost of quadratic comparisons" tradeoff doesn\'t pay off there.',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда вытесненный элемент возвращается на позицию, с которой начался цикл?',
        en: 'What happens when the displaced element returns to the position where the cycle started?',
      },
      options: [
        { ru: 'Цикл завершается, алгоритм переходит к следующей начальной позиции', en: 'The cycle closes and the algorithm moves to the next starting position' },
        { ru: 'Алгоритм останавливается с ошибкой', en: 'The algorithm stops with an error' },
        { ru: 'Начинается новый проход по всему массиву', en: 'A new pass over the whole array begins' },
        { ru: 'Массив сортируется заново с нуля', en: 'The array is re-sorted from scratch' },
      ],
      correct: 0,
      explanation: {
        ru: 'Возврат в стартовую точку означает, что цепочка перестановок замкнулась и все элементы цикла заняли свои места — цикл закрыт.',
        en: 'Returning to the starting point means the rotation chain has closed and all elements in the cycle have taken their places — the cycle is done.',
      },
    },
  ],
};

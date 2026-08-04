export const gnomeSort = {
  slug: 'gnome-sort',
  category: 'sorting',
  name: { ru: 'Гномья сортировка', en: 'Gnome Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'stable'],

  intent: {
    ru: 'Гномья сортировка получила название по методу, которым садовый гном якобы сортирует горшки с цветами: он смотрит на два соседних горшка, и если порядок неправильный — меняет их местами и делает шаг назад, а если порядок правильный — делает шаг вперёд.',
    en: 'Gnome sort is named after the method a garden gnome supposedly uses to sort flower pots: it looks at two neighboring pots, and if they\'re out of order, swaps them and steps back; if they\'re in order, it steps forward.',
  },

  problem: {
    ru: 'Сортировка вставками эффективно перемещает элемент на нужное место, но требует внутреннего цикла со своим индексом для сдвига предыдущих элементов. Хочется алгоритма с той же идеей — «протолкнуть неуместный элемент назад», — но выраженного через единственный указатель и минимум управляющей логики, без вложенных циклов.',
    en: 'Insertion sort efficiently moves an element into place, but needs an inner loop with its own index to shift preceding elements. What\'s wanted is an algorithm with the same idea — "push the out-of-place element backward" — expressed with a single pointer and minimal control logic, no nested loops.',
  },

  solution: {
    ru: 'Указатель `i` движется по массиву. Если `i` в начале массива или `a[i-1] <= a[i]` — сравниваемая пара уже в порядке, указатель сдвигается вперёд. Если же `a[i-1] > a[i]` — элементы меняются местами, а указатель сдвигается на шаг назад, чтобы проверить новую пару перед собой. Это ровно тот же эффект, что и сдвиг элемента в сортировке вставками, но без явного внутреннего цикла — вся работа выполняется одним указателем, который то идёт вперёд, то пятится назад.',
    en: 'A pointer `i` walks through the array. If `i` is at the start of the array or `a[i-1] <= a[i]`, the compared pair is already in order, and the pointer moves forward. If `a[i-1] > a[i]`, the elements are swapped and the pointer steps back one position to check the new pair ahead of it. This has exactly the same effect as insertion sort\'s shifting, but without an explicit inner loop — all the work is done by one pointer moving forward and backward.',
  },

  steps: [
    {
      title: { ru: 'Начать с i = 0', en: 'Start with i = 0' },
      explanation: {
        ru: 'Указатель i устанавливается в начало массива.',
        en: 'The pointer i is set to the start of the array.',
      },
    },
    {
      title: { ru: 'Сравнить с предыдущим', en: 'Compare with the previous element' },
      explanation: {
        ru: 'Если i равен нулю или a[i-1] <= a[i], пара в порядке.',
        en: 'If i is zero or a[i-1] <= a[i], the pair is in order.',
      },
    },
    {
      title: { ru: 'Шаг вперёд', en: 'Step forward' },
      explanation: {
        ru: 'Когда пара в порядке, увеличить i на единицу и перейти к следующей паре.',
        en: 'When the pair is in order, increment i and move to the next pair.',
      },
    },
    {
      title: { ru: 'Поменять местами и отступить', en: 'Swap and step back' },
      explanation: {
        ru: 'Если a[i-1] > a[i], поменять элементы местами и уменьшить i на единицу, чтобы проверить новую пару перед текущей позицией.',
        en: 'If a[i-1] > a[i], swap the elements and decrement i to check the new pair before the current position.',
      },
    },
    {
      title: { ru: 'Остановиться в конце', en: 'Stop at the end' },
      explanation: {
        ru: 'Когда i достигает длины массива, все элементы отсортированы.',
        en: 'When i reaches the array\'s length, every element is sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function gnomeSort(arr) {
  const a = [...arr];
  const n = a.length;
  let i = 0;
  while (i < n) {
    if (i === 0 || a[i - 1] <= a[i]) {
      i++;
    } else {
      [a[i], a[i - 1]] = [a[i - 1], a[i]];
      i--;
    }
  }
  return a;
}`,
    python: `def gnome_sort(arr):
    a = arr.copy()
    n = len(a)
    i = 0
    while i < n:
        if i == 0 or a[i - 1] <= a[i]:
            i += 1
        else:
            a[i], a[i - 1] = a[i - 1], a[i]
            i -= 1
    return a`,
  },

  pros: [
    {
      ru: 'Один из самых простых алгоритмов сортировки в реализации — не требует вложенных циклов, только один указатель.',
      en: 'One of the simplest sorting algorithms to implement — no nested loops, just a single pointer.',
    },
    {
      ru: 'Устойчив: равные элементы никогда не меняются местами, так как своп происходит только при строгом нарушении порядка.',
      en: 'Stable: equal elements are never swapped, since a swap only happens on a strict order violation.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти и, как и сортировка вставками, ведёт себя почти линейно на уже отсортированных данных.',
      en: 'Sorts in place with O(1) extra memory and, like insertion sort, behaves nearly linearly on already sorted data.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) в среднем и худшем случае — на случайных данных совершает заметно больше отдельных операций сравнения/обмена, чем сортировка вставками.',
      en: 'O(n²) on average and worst case — on random data it performs noticeably more individual compare/swap operations than insertion sort.',
    },
    {
      ru: 'Указатель может «пятиться» далеко назад при неудачном порядке элементов, что делает поведение менее предсказуемым, чем у обычных вложенных циклов.',
      en: 'The pointer can step far backward on unfavorable element orderings, making its behavior less predictable than plain nested loops.',
    },
    {
      ru: 'Не имеет практических преимуществ перед сортировкой вставками — используется почти исключительно в учебных целях.',
      en: 'Has no practical advantage over insertion sort — used almost exclusively for teaching purposes.',
    },
  ],

  whenToUse: [
    {
      ru: 'Как самый простой способ показать идею «сдвинуть элемент на место», не вводя понятие внутреннего цикла — хороший первый шаг перед сортировкой вставками.',
      en: 'As the simplest way to demonstrate the "shift an element into place" idea without introducing an inner loop — a good first step before insertion sort.',
    },
    {
      ru: 'В средах с крайне ограниченной кодовой базой (например, встраиваемые системы с жёстким лимитом на размер программы), где важна абсолютная простота кода, а не скорость.',
      en: 'In environments with an extremely constrained codebase (e.g., embedded systems with a hard program-size limit), where absolute code simplicity matters more than speed.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Учебные курсы по алгоритмам** используют гномью сортировку как забавный, легко запоминающийся пример того, как переформулировать сортировку вставками без вложенных циклов.',
      en: '**Algorithm courses** use gnome sort as a fun, memorable example of reformulating insertion sort without nested loops.',
    },
    {
      ru: '**Идея встречается в реализациях Brainfuck и других эзотерических языков** для сортировки чисел, так как единственный указатель проще реализовать при минималистичном наборе инструкций.',
      en: '**The idea shows up in Brainfuck and other esoteric-language implementations** for sorting numbers, since a single pointer is easier to implement with a minimalist instruction set.',
    },
  ],

  relatedAlgorithms: ['insertion-sort', 'bubble-sort'],

  quiz: [
    {
      question: {
        ru: 'Что делает указатель гномьей сортировки, когда пара элементов уже в правильном порядке?',
        en: 'What does the gnome sort pointer do when a pair of elements is already in order?',
      },
      options: [
        { ru: 'Сдвигается на шаг вперёд', en: 'Steps forward by one' },
        { ru: 'Сдвигается на шаг назад', en: 'Steps back by one' },
        { ru: 'Останавливается навсегда', en: 'Stops permanently' },
        { ru: 'Меняет элементы местами на всякий случай', en: 'Swaps the elements just in case' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если a[i-1] <= a[i], менять местами нечего, и алгоритм просто переходит к следующей паре.',
        en: 'If a[i-1] <= a[i], there\'s nothing to swap, so the algorithm simply moves to the next pair.',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда указатель находит пару a[i-1] > a[i]?',
        en: 'What happens when the pointer finds a pair a[i-1] > a[i]?',
      },
      options: [
        { ru: 'Элементы меняются местами, указатель отступает на шаг назад', en: 'The elements are swapped, and the pointer steps back one position' },
        { ru: 'Массив пересортировывается с самого начала', en: 'The array is re-sorted from the very beginning' },
        { ru: 'Элемент удаляется из массива', en: 'The element is removed from the array' },
        { ru: 'Указатель прыгает в конец массива', en: 'The pointer jumps to the end of the array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отступ назад позволяет проверить, не нарушает ли переставленный элемент порядок и с тем, что стоит перед ним.',
        en: 'Stepping back lets the algorithm check whether the swapped element also violates order with what comes before it.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность гномьей сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of gnome sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(log n)', en: 'O(log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'В худшем случае (например, обратно отсортированный массив) указатель многократно пятится назад, что даёт квадратичное число операций.',
        en: 'In the worst case (e.g., a reverse-sorted array), the pointer repeatedly steps back, giving a quadratic number of operations.',
      },
    },
    {
      question: {
        ru: 'Является ли гномья сортировка устойчивой (stable)?',
        en: 'Is gnome sort stable?',
      },
      options: [
        { ru: 'Да — своп происходит только при строгом нарушении порядка', en: 'Yes — a swap only happens on a strict order violation' },
        { ru: 'Нет, как quicksort', en: 'No, like quicksort' },
        { ru: 'Только для отрицательных чисел', en: 'Only for negative numbers' },
        { ru: 'Зависит от длины массива', en: 'It depends on the array\'s length' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие обмена — строгое `a[i-1] > a[i]`, поэтому равные соседние элементы никогда не меняются местами.',
        en: 'The swap condition is the strict `a[i-1] > a[i]`, so equal neighboring elements are never swapped.',
      },
    },
    {
      question: {
        ru: 'На какой известный алгоритм больше всего похожа гномья сортировка по своей логике?',
        en: 'Which well-known algorithm is gnome sort most similar to in its logic?',
      },
      options: [
        { ru: 'На сортировку вставками, но без вложенного цикла', en: 'Insertion sort, but without an inner loop' },
        { ru: 'На быструю сортировку', en: 'Quicksort' },
        { ru: 'На сортировку слиянием', en: 'Merge sort' },
        { ru: 'На поразрядную сортировку', en: 'Radix sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма проталкивают неуместный элемент назад до его правильной позиции; гномья сортировка просто выражает это через единственный указатель.',
        en: 'Both algorithms push an out-of-place element backward to its correct position; gnome sort just expresses this with a single pointer.',
      },
    },
  ],
};

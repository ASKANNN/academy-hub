export const gnomeSort = {
  slug: 'gnome-sort',
  category: 'sorting',
  name: { ru: 'Gnome Sort', en: 'Gnome Sort' },
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
      hint: {
        ru: 'Алгоритм проверяет следующую пару, только двигаясь вперёд. Что означает «нет нарушения» для направления движения?',
        en: 'The algorithm checks the next pair only by moving forward. What does "no violation" mean for the direction of movement?',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда указатель находит пару a[i-1] > a[i]?',
        en: 'What happens when the pointer finds a pair a[i-1] > a[i]?',
      },
      options: [
        { ru: 'Элементы меняются местами, указатель отступает на шаг назад', en: 'The elements are swapped, and the pointer steps back one position' },
        { ru: 'Весь массив полностью пересортировывается заново с самого начала', en: 'The whole array is completely re-sorted from the very beginning again' },
        { ru: 'Проблемный элемент насовсем удаляется из массива и отбрасывается', en: 'The problematic element is permanently removed from the array and discarded' },
        { ru: 'Указатель немедленно прыгает в самый конец массива', en: 'The pointer immediately jumps all the way to the end of the array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отступ назад позволяет проверить, не нарушает ли переставленный элемент порядок и с тем, что стоит перед ним.',
        en: 'Stepping back lets the algorithm check whether the swapped element also violates order with what comes before it.',
      },
      hint: {
        ru: 'После обмена перемещённый элемент оказывается левее. Нужно ли проверить, на своём ли он теперь месте?',
        en: 'After the swap, the moved element is one position to the left. Does it need to be checked against its new neighbor?',
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
      hint: {
        ru: 'Представьте массив [n, n-1, ..., 2, 1]. Сколько шагов назад сделает указатель при вставке каждого элемента?',
        en: 'Imagine the array [n, n-1, ..., 2, 1]. How many backward steps does the pointer take when placing each element?',
      },
    },
    {
      question: {
        ru: 'Является ли гномья сортировка устойчивой (stable)?',
        en: 'Is gnome sort stable?',
      },
      options: [
        { ru: 'Да — своп происходит только при строгом нарушении порядка', en: 'Yes — a swap only happens on a strict order violation' },
        { ru: 'Нет, она нестабильна точно так же, как и quicksort', en: 'No, it is unstable, just the same way quicksort is' },
        { ru: 'Только для отрицательных чисел, для положительных всё иначе', en: 'Only for negative numbers, positive ones behave differently' },
        { ru: 'Это зависит от конкретной длины сортируемого массива', en: 'It depends on the specific length of the array being sorted' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие обмена — строгое `a[i-1] > a[i]`, поэтому равные соседние элементы никогда не меняются местами.',
        en: 'The swap condition is the strict `a[i-1] > a[i]`, so equal neighboring elements are never swapped.',
      },
      hint: {
        ru: 'Посмотрите на условие обмена: `a[i-1] > a[i]`. Произойдёт ли обмен, если элементы равны?',
        en: 'Look at the swap condition: `a[i-1] > a[i]`. Does a swap happen when elements are equal?',
      },
    },
    {
      question: {
        ru: 'На какой известный алгоритм больше всего похожа гномья сортировка по своей логике?',
        en: 'Which well-known algorithm is gnome sort most similar to in its logic?',
      },
      options: [
        { ru: 'На сортировку вставками, но без вложенного цикла', en: 'Insertion sort, but without an inner loop' },
        { ru: 'На быструю сортировку и её стратегию выбора опорного элемента', en: 'Quicksort and its overall pivot-selection strategy' },
        { ru: 'На сортировку слиянием и её принцип разделения массива пополам', en: 'Merge sort and its principle of splitting the array in half' },
        { ru: 'На поразрядную сортировку и обработку чисел по разрядам', en: 'Radix sort and its digit-by-digit processing of numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма проталкивают неуместный элемент назад до его правильной позиции; гномья сортировка просто выражает это через единственный указатель.',
        en: 'Both algorithms push an out-of-place element backward to its correct position; gnome sort just expresses this with a single pointer.',
      },
      hint: {
        ru: 'Какой алгоритм тоже «тащит» элемент на нужное место, перемещая его влево через уже отсортированный участок?',
        en: 'Which algorithm also "drags" an element into place by moving it left through an already sorted portion?',
      },
    },
    {
      question: {
        ru: 'Какова лучшая временная сложность гномьей сортировки и при каком условии она достигается?',
        en: 'What is the best-case time complexity of gnome sort and when is it achieved?',
      },
      options: [
        { ru: 'O(n) — когда массив уже отсортирован и указатель ни разу не пятится', en: 'O(n) — when the array is already sorted and the pointer never steps back' },
        { ru: 'O(1) — если массив содержит ровно один элемент и сортировать нечего', en: 'O(1) — if the array contains exactly one element and nothing needs sorting' },
        { ru: 'O(n log n) — на случайных данных за счёт особой структуры откатов указателя', en: 'O(n log n) — on random data due to the special structure of pointer rollbacks' },
        { ru: 'O(n²) всегда, независимо от исходного порядка элементов в массиве', en: 'O(n²) always, regardless of the initial order of elements in the array' },
      ],
      correct: 0,
      explanation: {
        ru: 'На уже отсортированном массиве каждый шаг — вперёд, ни одного обмена, итого n шагов.',
        en: 'On an already sorted array every step is forward, no swaps occur, giving n total steps.',
      },
      hint: {
        ru: 'Если на каждом шаге пара в порядке, сколько шагов назад сделает алгоритм?',
        en: 'If every pair is in order on every step, how many backward steps does the algorithm take?',
      },
    },
    {
      question: {
        ru: 'Зачем гномья сортировка проверяет условие `i === 0` перед сравнением `a[i-1]` и `a[i]`?',
        en: 'Why does gnome sort check the condition `i === 0` before comparing `a[i-1]` and `a[i]`?',
      },
      options: [
        { ru: 'Чтобы не выйти за левую границу массива при обращении к a[i-1]', en: 'To avoid going past the left boundary of the array when accessing a[i-1]' },
        { ru: 'Чтобы ускорить первую итерацию и пропустить ненужное сравнение', en: 'To speed up the first iteration and skip an unnecessary comparison' },
        { ru: 'Потому что при i=0 элемент гарантированно является минимумом всего массива', en: 'Because at i=0 the element is guaranteed to be the minimum of the whole array' },
        { ru: 'Это избыточная проверка, которая никак не влияет на корректность алгоритма', en: 'This is a redundant check that has no effect on correctness of the algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'При i = 0 обращение к a[-1] выйдет за границы массива. Проверка `i === 0` гарантирует, что `a[i-1]` всегда существует.',
        en: 'At i = 0, accessing a[-1] would be out of bounds. The `i === 0` check guarantees that `a[i-1]` always exists.',
      },
      hint: {
        ru: 'Что произошло бы при попытке обратиться к a[i-1], когда i равно нулю?',
        en: 'What would happen if the code tried to access a[i-1] when i is zero?',
      },
    },
    {
      question: {
        ru: 'Чем гномья сортировка хуже сортировки вставками по числу операций на случайных данных?',
        en: 'How does gnome sort perform worse than insertion sort in operation count on random data?',
      },
      options: [
        { ru: 'Гномья сортировка делает больше обменов, тогда как сортировка вставками сдвигает элементы без обмена', en: 'Gnome sort performs more swaps, while insertion sort shifts elements without swapping' },
        { ru: 'Гномья сортировка требует дополнительного прохода в конце для проверки результата', en: 'Gnome sort requires an extra pass at the end to verify the result' },
        { ru: 'Сортировка вставками использует рекурсию и поэтому быстрее при большом n', en: 'Insertion sort uses recursion and is therefore faster at large n' },
        { ru: 'Гномья сортировка не поддерживает параллельное выполнение, а сортировка вставками поддерживает', en: 'Gnome sort does not support parallel execution while insertion sort does at every step' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка вставками сдвигает элементы одной записью на шаг, тогда как гномья сортировка выполняет полный обмен (3 записи) на каждый шаг назад — это делает её медленнее по числу операций записи.',
        en: 'Insertion sort shifts elements with one write per step, while gnome sort performs a full swap (3 writes) on each backward step — making it slower in terms of write operations.',
      },
      hint: {
        ru: 'Сравните, что происходит при каждом шаге назад: полный обмен трёх операций записи против одного сдвига.',
        en: 'Compare what happens on each backward step: a full three-write swap versus a single shift.',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность гномьей сортировки?',
        en: 'What is the space complexity of gnome sort?',
      },
      options: [
        { ru: 'O(1) — только переменная-указатель и временная переменная для обмена', en: 'O(1) — only a pointer variable and a temporary variable for swapping' },
        { ru: 'O(n) — для хранения исходного массива во время сортировки', en: 'O(n) — to store the original array during sorting' },
        { ru: 'O(log n) — из-за глубины стека рекурсии при откатах указателя', en: 'O(log n) — due to the recursion stack depth during pointer rollbacks' },
        { ru: 'O(n²) — потому что хранится история всех позиций указателя', en: 'O(n²) — because the history of all pointer positions is stored' },
      ],
      correct: 0,
      explanation: {
        ru: 'Гномья сортировка работает прямо в исходном массиве и не выделяет никаких дополнительных структур — только счётчик i и временная переменная при обмене.',
        en: 'Gnome sort works directly on the original array and allocates no additional structures — only the counter i and a temporary variable during swaps.',
      },
      hint: {
        ru: 'Нужно ли алгоритму выделять какие-либо дополнительные массивы или структуры данных?',
        en: 'Does the algorithm need to allocate any additional arrays or data structures?',
      },
    },
    {
      question: {
        ru: 'Почему гномья сортировка почти не используется в производственном коде?',
        en: 'Why is gnome sort almost never used in production code?',
      },
      options: [
        { ru: 'Она не даёт никаких практических преимуществ перед сортировкой вставками, которая делает то же самое быстрее', en: 'It offers no practical advantage over insertion sort, which does the same thing faster' },
        { ru: 'Она нестабильна, что делает её непригодной для большинства реальных задач сортировки', en: 'It is unstable, which makes it unsuitable for most real-world sorting tasks' },
        { ru: 'Её патент запрещает коммерческое использование без лицензии правообладателя', en: 'Its patent prohibits commercial use without a license from the rights holder' },
        { ru: 'Большинство компиляторов не умеют оптимизировать код с одним указателем без вложенных циклов', en: 'Most compilers cannot optimize code with a single pointer and no nested loops in all cases' },
      ],
      correct: 0,
      explanation: {
        ru: 'Гномья сортировка делает то же самое, что сортировка вставками, но выполняет больше операций из-за попарных обменов вместо сдвигов — на практике это просто более медленная альтернатива с той же идеей.',
        en: 'Gnome sort does the same thing as insertion sort but performs more operations due to pairwise swaps instead of shifts — in practice it is simply a slower alternative with the same underlying idea.',
      },
      hint: {
        ru: 'Какой алгоритм с той же идеей работает эффективнее? Есть ли у гномьей сортировки хоть одно преимущество в скорости?',
        en: 'Which algorithm with the same idea works more efficiently? Does gnome sort have any speed advantage at all?',
      },
    },
  ],
};

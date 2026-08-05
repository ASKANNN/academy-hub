export const pancakeSort = {
  slug: 'pancake-sort',
  category: 'sorting',
  name: { ru: 'Pancake Sort', en: 'Pancake Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable', 'reversal-based'],

  intent: {
    ru: 'Блинная сортировка сортирует массив, используя только одну операцию — «переворот» (flip) префикса массива, как переворачивание стопки блинов лопаткой: перевернуть верхние k блинов сразу, не трогая остальные.',
    en: 'Pancake sort sorts an array using only one operation — "flipping" a prefix of the array, like flipping a stack of pancakes with a spatula: flip the top k pancakes all at once, without touching the rest.',
  },

  problem: {
    ru: 'Представьте стопку блинов разного размера, которые нужно расставить по возрастанию размера сверху вниз, но единственное разрешённое действие — просунуть лопатку под какой-то блин и перевернуть всю стопку блинов над ней. Нельзя вытащить блин из середины стопки или поменять местами два произвольных блина — только переворот целого верхнего сегмента. Как этой одной операцией добиться полной сортировки за конечное число шагов?',
    en: 'Imagine a stack of differently sized pancakes that must be arranged by increasing size from top to bottom, but the only allowed move is to slide a spatula under some pancake and flip the entire stack of pancakes above it. You cannot pull a pancake out of the middle of the stack or swap two arbitrary pancakes — only flip a whole top segment. How can this single operation achieve a full sort in a finite number of moves?',
  },

  solution: {
    ru: 'На каждом шаге рассматривается ещё не отсортированный префикс массива размером `size` (изначально — весь массив). В нём находится позиция максимального элемента. Если максимум уже стоит в конце этого префикса — переходим к следующему, уменьшенному префиксу. Иначе выполняются два переворота: сначала переворачивается префикс до позиции максимума (это переносит максимум на самый верх, то есть в начало массива), затем переворачивается весь префикс размера `size` (это переносит максимум с начала прямо на последнюю позицию префикса — его законное место). После этого `size` уменьшается на единицу, и процесс повторяется для оставшейся неотсортированной части.',
    en: 'At each step, the still-unsorted prefix of size `size` (initially the whole array) is examined. The position of its maximum element is found. If the maximum already sits at the end of this prefix, move on to the next, smaller prefix. Otherwise two flips are performed: first, flip the prefix up to the maximum\'s position (this brings the maximum to the very top, i.e., the start of the array); then flip the entire prefix of size `size` (this carries the maximum from the start straight to the last position of the prefix — its rightful place). Then `size` is decreased by one, and the process repeats for the remaining unsorted portion.',
  },

  steps: [
    {
      title: { ru: 'Найти максимум в префиксе', en: 'Find the maximum in the prefix' },
      explanation: {
        ru: 'В ещё не отсортированном префиксе размера size найти позицию наибольшего элемента.',
        en: 'In the still-unsorted prefix of size size, find the position of the largest element.',
      },
    },
    {
      title: { ru: 'Перевернуть до максимума', en: 'Flip up to the maximum' },
      explanation: {
        ru: 'Перевернуть префикс до найденной позиции — максимум оказывается в самом начале массива.',
        en: 'Flip the prefix up to the found position — the maximum ends up at the very start of the array.',
      },
    },
    {
      title: { ru: 'Перевернуть весь текущий префикс', en: 'Flip the whole current prefix' },
      explanation: {
        ru: 'Перевернуть весь префикс размера size — максимум перемещается с начала на своё законное последнее место в этом префиксе.',
        en: 'Flip the entire prefix of size size — the maximum moves from the start to its rightful last place within that prefix.',
      },
    },
    {
      title: { ru: 'Уменьшить границу префикса', en: 'Shrink the prefix boundary' },
      explanation: {
        ru: 'Уменьшить size на единицу — последний элемент теперь на своём месте и больше не рассматривается.',
        en: 'Decrease size by one — the last element is now in place and no longer considered.',
      },
    },
    {
      title: { ru: 'Повторить для остатка', en: 'Repeat for the rest' },
      explanation: {
        ru: 'Процесс повторяется для уменьшенного префикса, пока размер префикса не станет равен единице.',
        en: 'The process repeats for the shrunk prefix until the prefix size reaches one.',
      },
    },
  ],

  implementation: {
    javascript: `function pancakeSort(arr) {
  const a = [...arr];
  const n = a.length;

  function flip(k) {
    let lo = 0, hi = k;
    while (lo < hi) {
      [a[lo], a[hi]] = [a[hi], a[lo]];
      lo++;
      hi--;
    }
  }

  for (let size = n; size > 1; size--) {
    let maxIdx = 0;
    for (let i = 1; i < size; i++) {
      if (a[i] > a[maxIdx]) maxIdx = i;
    }
    if (maxIdx !== size - 1) {
      if (maxIdx !== 0) flip(maxIdx);
      flip(size - 1);
    }
  }
  return a;
}`,
    python: `def pancake_sort(arr):
    a = arr.copy()
    n = len(a)

    def flip(k):
        lo, hi = 0, k
        while lo < hi:
            a[lo], a[hi] = a[hi], a[lo]
            lo += 1
            hi -= 1

    for size in range(n, 1, -1):
        max_idx = 0
        for i in range(1, size):
            if a[i] > a[max_idx]:
                max_idx = i
        if max_idx != size - 1:
            if max_idx != 0:
                flip(max_idx)
            flip(size - 1)
    return a`,
  },

  pros: [
    {
      ru: 'Использует единственную операцию (переворот префикса), что делает его отличным примером сортировки с ограниченным набором разрешённых действий — классическая задача в теории алгоритмов.',
      en: 'Uses a single operation (prefix flip), making it an excellent example of sorting under a restricted set of allowed moves — a classic problem in algorithm theory.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти.',
      en: 'Sorts in place with O(1) extra memory.',
    },
    {
      ru: 'Число переворотов ограничено 2(n-1), что даёт понятную, легко доказуемую верхнюю границу на число операций.',
      en: 'The number of flips is bounded by 2(n-1), giving a clean, easily provable upper bound on the number of operations.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений в среднем и худшем случае — не быстрее обычной сортировки выбором.',
      en: 'O(n²) comparisons on average and worst case — no faster than plain selection sort.',
    },
    {
      ru: 'Неустойчив: переворот префикса меняет относительный порядок равных элементов.',
      en: 'Unstable: flipping a prefix changes the relative order of equal elements.',
    },
    {
      ru: 'Нахождение минимального числа переворотов для сортировки произвольной перестановки («блинная задача», pancake problem) — открытая NP-трудная задача с неизвестной точной формулой; показанный алгоритм даёт лишь простую, но не минимальную по числу переворотов стратегию.',
      en: 'Finding the minimum number of flips to sort an arbitrary permutation (the "pancake problem") is an open, NP-hard problem with no known exact formula; the algorithm shown gives a simple but not flip-minimal strategy.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда единственная доступная операция — это переворот префикса (например, задачи с ограничением на модель вычислений или роботизированные системы, физически способные только «перевернуть верхний блок»).',
      en: 'When the only available operation is a prefix flip (for example, problems with a restricted computation model, or robotic systems that can physically only "flip the top block").',
    },
    {
      ru: 'Как учебный пример для изучения NP-трудной «блинной задачи» и того, как ограниченный набор операций всё ещё позволяет достичь полной сортировки.',
      en: 'As a teaching example for studying the NP-hard "pancake problem" and how a restricted set of operations can still achieve a full sort.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Ранняя статья Билла Гейтса и Христоса Пападимитриу (1979)** предложила алгоритм и оценку числа переворотов для «блинной задачи», ставшую классической в теории алгоритмов.',
      en: '**An early paper by Bill Gates and Christos Papadimitriou (1979)** proposed an algorithm and a bound on the number of flips for the "pancake problem," which became a classic in algorithm theory.',
    },
    {
      ru: '**Перестройка сегментов ДНК в биоинформатике** моделируется похожей задачей о развороте (сортировка перестановок реверсиями) — переворот отрезка последовательности вместо отдельных перестановок элементов.',
      en: '**DNA segment rearrangement in bioinformatics** is modeled by a similar reversal problem (sorting permutations by reversals) — flipping a segment of the sequence rather than swapping individual elements.',
    },
  ],

  relatedAlgorithms: ['selection-sort', 'cycle-sort'],

  quiz: [
    {
      question: {
        ru: 'Какая единственная операция разрешена в блинной сортировке?',
        en: 'What is the single operation allowed in pancake sort?',
      },
      options: [
        { ru: 'Переворот (flip) префикса массива', en: 'Flipping (reversing) a prefix of the array' },
        { ru: 'Обмен местами двух произвольных элементов', en: 'Swapping two arbitrary elements' },
        { ru: 'Удаление элемента из середины массива', en: 'Removing an element from the middle of the array' },
        { ru: 'Циклический сдвиг всего массива', en: 'Cyclically rotating the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как лопатка переворачивает верхнюю часть стопки блинов, алгоритм может лишь развернуть какой-то начальный отрезок массива.',
        en: 'Just as a spatula flips the top part of a pancake stack, the algorithm can only reverse some leading segment of the array.',
      },
      hint: {
        ru: 'Вспомните аналогию с лопаткой: что она физически делает со стопкой блинов?',
        en: 'Recall the spatula analogy: what does it physically do to a stack of pancakes?',
      },
    },
    {
      question: {
        ru: 'Зачем на каждом шаге выполняются два переворота, а не один?',
        en: 'Why are two flips performed at each step instead of one?',
      },
      options: [
        {
          ru: 'Первый переворот доставляет максимум в начало, второй — переносит его на нужное место в конце префикса',
          en: 'The first flip brings the maximum to the start, the second carries it to its correct place at the end of the prefix',
        },
        { ru: 'Один-единственный переворот всегда сортирует весь массив полностью, поэтому второй переворот выполняется лишь для дополнительной проверки итогового результата', en: 'A single flip always sorts the entire array completely on its own, so the second flip is only ever performed to double-check the final result' },
        { ru: 'Второй переворот полностью отменяет действие первого, возвращая массив ровно в то же исходное состояние, в котором он находился перед началом текущего шага', en: 'The second flip completely undoes the effect of the first one, returning the array to exactly the same original state it was in before the current step began' },
        { ru: 'Такая пара переворотов требуется исключительно для массивов с чётным числом элементов, тогда как для массивов с нечётным числом элементов достаточно всего одного переворота', en: 'This pair of flips is only ever required for arrays with an even number of elements, while arrays with an odd count need just a single flip' },
      ],
      correct: 0,
      explanation: {
        ru: 'Переворот префикса может переместить элемент только на позицию 0 или на текущий конец префикса, поэтому максимум сначала выводится в начало, а затем — в конец.',
        en: 'A prefix flip can only move an element to position 0 or to the current end of the prefix, so the maximum is first brought to the start, then to the end.',
      },
      hint: {
        ru: 'Переворот может поставить что-то только на позицию 0 или в конец. Как за два шага доставить максимум в конец?',
        en: 'A flip can only place something at position 0 or at the end. How do two flips get the maximum to the end?',
      },
    },
    {
      question: {
        ru: 'Как называется задача о нахождении минимального числа переворотов для сортировки произвольной перестановки?',
        en: 'What is the problem of finding the minimum number of flips to sort an arbitrary permutation called?',
      },
      options: [
        { ru: 'Блинная задача (pancake problem)', en: 'The pancake problem' },
        { ru: 'Задача о рюкзаке', en: 'The knapsack problem' },
        { ru: 'Задача коммивояжёра', en: 'The traveling salesman problem' },
        { ru: 'Задача о раскраске графа', en: 'The graph coloring problem' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это классическая NP-трудная задача, точная минимальная формула для которой до сих пор неизвестна.',
        en: 'This is a classic NP-hard problem for which an exact minimal formula is still unknown.',
      },
      hint: {
        ru: 'Название задачи совпадает с образом, который лежит в основе алгоритма.',
        en: 'The problem\'s name matches the image that inspired the algorithm.',
      },
    },
    {
      question: {
        ru: 'Является ли блинная сортировка устойчивой (stable)?',
        en: 'Is pancake sort stable?',
      },
      options: [
        { ru: 'Нет — переворот префикса меняет относительный порядок равных элементов', en: 'No — flipping a prefix changes the relative order of equal elements' },
        { ru: 'Да, она всегда полностью сохраняет исходный относительный порядок равных элементов', en: 'Yes, it always fully preserves the original relative order of equal elements' },
        { ru: 'Только в частном случае массивов, вообще не содержащих никаких повторяющихся значений', en: 'Only in the special case of arrays containing no duplicate values whatsoever' },
        { ru: 'Понятие устойчивости вообще не определено и неприменимо для данного конкретного алгоритма', en: 'The concept of stability isn\'t defined or applicable for this particular algorithm at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Разворот сегмента переставляет местами позиции равных элементов внутри него, поэтому исходный относительный порядок теряется.',
        en: 'Reversing a segment swaps the positions of equal elements within it, so their original relative order is lost.',
      },
      hint: {
        ru: 'Когда вы переворачиваете сегмент, что происходит с относительным порядком элементов внутри него?',
        en: 'When you reverse a segment, what happens to the relative order of elements within it?',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность блинной сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of pancake sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n), как у большинства эффективных сортировок сравнением', en: 'O(n log n), like most efficient comparison sorts' },
        { ru: 'O(n), поскольку каждый элемент перемещается не более одного раза', en: 'O(n), since each element is moved at most once' },
        { ru: 'O(2^n), из-за экспоненциального роста числа возможных переворотов', en: 'O(2^n), due to the exponential growth in the number of possible flips' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поиск максимума в префиксе на каждом из n шагов даёт квадратичное число сравнений, как в сортировке выбором.',
        en: 'Finding the maximum in the prefix at each of the n steps gives a quadratic number of comparisons, just like selection sort.',
      },
      hint: {
        ru: 'На каждом из n шагов нужно найти максимум линейным перебором — что это даёт суммарно?',
        en: 'At each of n steps, the maximum is found by linear scan — what does that give in total?',
      },
    },
    {
      question: {
        ru: 'Какова верхняя граница числа переворотов для сортировки массива из n элементов?',
        en: 'What is the upper bound on the number of flips to sort an array of n elements?',
      },
      options: [
        { ru: '2(n−1)', en: '2(n−1)' },
        { ru: 'n!', en: 'n!' },
        { ru: 'n log n', en: 'n log n' },
        { ru: 'n²', en: 'n²' },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом шаге выполняется не более двух переворотов, а шагов n−1, поэтому верхняя граница — 2(n−1) переворотов.',
        en: 'At each of the n−1 steps at most two flips are made, so the upper bound is 2(n−1) flips.',
      },
      hint: {
        ru: 'Если на каждом из n−1 шагов выполняется не более двух переворотов, то суммарный максимум — это сколько?',
        en: 'If at most two flips are made per step and there are n−1 steps, what is the total maximum?',
      },
    },
    {
      question: {
        ru: 'Что происходит, если максимум уже стоит на последнем месте текущего префикса?',
        en: 'What happens if the maximum is already at the last position of the current prefix?',
      },
      options: [
        { ru: 'Перевороты не выполняются — алгоритм сразу переходит к меньшему префиксу', en: 'No flips are made — the algorithm immediately moves to the smaller prefix' },
        { ru: 'Всё равно выполняется один переворот для проверки правильности положения', en: 'One flip is still made to verify the element is in the correct position' },
        { ru: 'Весь массив переворачивается, чтобы убедиться в его полной отсортированности', en: 'The entire array is flipped to confirm it is fully sorted' },
        { ru: 'Алгоритм переходит к следующей итерации, но увеличивает, а не уменьшает размер префикса', en: 'The algorithm moves to the next iteration but increases rather than decreases the prefix size' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если максимум уже на нужном месте, никаких переворотов не нужно — он уже «уложен» и граница префикса просто уменьшается.',
        en: 'If the maximum is already in place, no flips are needed — it is already "settled" and the prefix boundary simply shrinks.',
      },
      hint: {
        ru: 'Цель шага — поставить максимум на конец префикса. Что делать, если он уже там?',
        en: 'The goal of each step is to place the maximum at the end of the prefix. What if it is already there?',
      },
    },
    {
      question: {
        ru: 'Как блинная сортировка связана с задачами биоинформатики?',
        en: 'How is pancake sort related to problems in bioinformatics?',
      },
      options: [
        { ru: 'Переупорядочивание сегментов ДНК реверсиями формально аналогично сортировке переворотами', en: 'DNA segment rearrangement by reversals is formally analogous to sorting by flips' },
        { ru: 'Алгоритм используется для выравнивания белковых последовательностей в базах данных', en: 'The algorithm is used to align protein sequences in databases' },
        { ru: 'Блинная сортировка применяется для сжатия геномных данных перед хранением', en: 'Pancake sort is applied to compress genomic data before storage' },
        { ru: 'Никакой реальной связи нет — это просто отдалённая метафора без практического значения', en: 'There is no real connection — it is merely a distant metaphor without practical significance' },
      ],
      correct: 0,
      explanation: {
        ru: 'В геномике хромосомные перестройки моделируются реверсиями сегментов последовательности, что математически идентично задаче блинной сортировки.',
        en: 'In genomics, chromosomal rearrangements are modeled as reversals of sequence segments, which is mathematically identical to the pancake sorting problem.',
      },
      hint: {
        ru: 'Что общего между «переворотом» сегмента ДНК при мутации и «переворотом» префикса массива?',
        en: 'What do "reversing" a DNA segment in a mutation and "flipping" an array prefix have in common?',
      },
    },
    {
      question: {
        ru: 'Чем блинная сортировка концептуально похожа на сортировку выбором?',
        en: 'How is pancake sort conceptually similar to selection sort?',
      },
      options: [
        { ru: 'Оба на каждом шаге находят максимум в неотсортированной части и ставят его на нужное место', en: 'Both find the maximum in the unsorted part at each step and place it in its correct position' },
        { ru: 'Оба используют переворот префикса как единственную разрешённую операцию над массивом', en: 'Both use a prefix flip as the only allowed operation on the array, never swapping arbitrary elements' },
        { ru: 'Оба устойчивы и сортируют за O(n log n) в лучшем случае на упорядоченных данных', en: 'Both are stable and sort in O(n log n) in the best case on ordered data' },
        { ru: 'Оба используют случайный выбор опорного элемента для ускорения сортировки', en: 'Both use random pivot selection to speed up the sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма последовательно помещают максимальный элемент неотсортированной части на его законное место; разница лишь в том, как именно он туда доставляется.',
        en: 'Both algorithms successively place the unsorted portion\'s maximum at its rightful position; the difference is only in how it is delivered there.',
      },
      hint: {
        ru: 'Какая стратегия выбора следующего «обрабатываемого» элемента у обоих алгоритмов одинакова?',
        en: 'What element-selection strategy do both algorithms share?',
      },
    },
    {
      question: {
        ru: 'Кто из известных учёных написал раннюю статью о блинной задаче?',
        en: 'Which well-known figure co-authored an early paper on the pancake problem?',
      },
      options: [
        { ru: 'Билл Гейтс', en: 'Bill Gates' },
        { ru: 'Дональд Кнут', en: 'Donald Knuth' },
        { ru: 'Тони Хоар', en: 'Tony Hoare' },
        { ru: 'Джон фон Нейман', en: 'John von Neumann' },
      ],
      correct: 0,
      explanation: {
        ru: 'Билл Гейтс и Христос Пападимитриу опубликовали статью о блинной задаче в 1979 году — это единственная научная публикация Гейтса.',
        en: 'Bill Gates and Christos Papadimitriou published a paper on the pancake problem in 1979 — it is Gates\'s only academic publication.',
      },
      hint: {
        ru: 'Этот соавтор позже стал соучредителем одной из крупнейших технологических компаний в мире.',
        en: 'This co-author later co-founded one of the largest technology companies in the world.',
      },
    },
  ],
};

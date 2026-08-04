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
    },
  ],
};

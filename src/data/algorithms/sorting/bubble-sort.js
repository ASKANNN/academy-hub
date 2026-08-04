export const bubbleSort = {
  slug: 'bubble-sort',
  category: 'sorting',
  name: { ru: 'Bubble Sort', en: 'Bubble Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'stable'],

  intent: {
    ru: 'Пузырьковая сортировка многократно проходит по массиву, меняя местами соседние элементы, пока весь массив не окажется упорядочен.',
    en: 'Bubble sort repeatedly walks the array, swapping adjacent elements that are out of order, until the whole array is sorted.',
  },

  problem: {
    ru: 'Есть массив чисел в произвольном порядке, и его нужно упорядочить по возрастанию. Самая простая мысленная модель — сравнивать пары соседних элементов и переставлять их местами, если левый больше правого. Вопрос в том, как повторять это действие так, чтобы за конечное число проходов массив гарантированно стал отсортированным.',
    en: 'Given an array of numbers in arbitrary order, you need it sorted ascending. The simplest mental model is comparing neighboring pairs and swapping them when the left one is bigger. The question is how to repeat that action so the array is guaranteed sorted after a finite number of passes.',
  },

  solution: {
    ru: 'На каждом проходе алгоритм сравнивает пары соседних элементов слева направо и меняет их местами, если они стоят в неправильном порядке. После первого прохода самый большой элемент гарантированно «всплывает» в конец массива — отсюда и название. Проходы повторяются, каждый раз укорачиваясь на один элемент справа, пока за целый проход не произойдёт ни одной перестановки — это значит, что массив уже отсортирован.',
    en: 'On each pass, the algorithm compares neighboring pairs left to right and swaps them when they are in the wrong order. After the first pass, the largest element is guaranteed to have "bubbled" to the end — hence the name. Passes repeat, each one shrinking by one element from the right, until a full pass makes zero swaps — which means the array is already sorted.',
  },

  steps: [
    {
      title: { ru: 'Сравнить соседей', en: 'Compare neighbors' },
      explanation: {
        ru: 'Взять текущий элемент и следующий за ним, сравнить их значения.',
        en: 'Take the current element and the one right after it, compare their values.',
      },
    },
    {
      title: { ru: 'Поменять местами при необходимости', en: 'Swap if needed' },
      explanation: {
        ru: 'Если левый элемент больше правого — поменять их местами.',
        en: 'If the left element is greater than the right one, swap them.',
      },
    },
    {
      title: { ru: 'Дойти до конца прохода', en: 'Reach the end of the pass' },
      explanation: {
        ru: 'Повторять сравнение для каждой следующей пары до конца неотсортированной части массива.',
        en: 'Repeat the comparison for every next pair until the end of the unsorted part of the array.',
      },
    },
    {
      title: { ru: 'Сократить границу', en: 'Shrink the boundary' },
      explanation: {
        ru: 'Самый большой элемент прохода теперь на своём месте — исключить его из следующих проходов.',
        en: 'The largest element of the pass is now in its final place — exclude it from the next passes.',
      },
    },
    {
      title: { ru: 'Остановиться без перестановок', en: 'Stop with no swaps' },
      explanation: {
        ru: 'Если целый проход не дал ни одной перестановки, массив отсортирован — можно закончить раньше времени.',
        en: 'If a full pass makes zero swaps, the array is sorted — the algorithm can exit early.',
      },
    },
  ],

  implementation: {
    javascript: `function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return a;
}`,
    python: `def bubble_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a`,
  },

  pros: [
    {
      ru: 'Один из самых простых алгоритмов сортировки для понимания и реализации с нуля.',
      en: 'One of the simplest sorting algorithms to understand and implement from scratch.',
    },
    {
      ru: 'Сортирует на месте — требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place — needs only O(1) extra memory.',
    },
    {
      ru: 'Устойчив: равные элементы сохраняют исходный относительный порядок.',
      en: 'Stable: equal elements keep their original relative order.',
    },
    {
      ru: 'С флагом ранней остановки на почти отсортированных данных выполняется за O(n).',
      en: 'With the early-exit flag, it runs in O(n) on nearly sorted data.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений и перестановок в среднем и худшем случае делает его непригодным для больших массивов.',
      en: 'O(n²) comparisons and swaps on average and worst case make it impractical for large arrays.',
    },
    {
      ru: 'Большинство промышленных алгоритмов (merge sort, quicksort, Timsort) обгоняют его на любом размере данных, кроме совсем малых.',
      en: 'Most production algorithms (merge sort, quicksort, Timsort) outperform it at any size beyond tiny inputs.',
    },
    {
      ru: 'Много операций записи в массив — на больших данных это дороже, чем алгоритмы с меньшим числом перестановок (например, сортировка выбором).',
      en: 'It performs many array writes — costlier on large data than algorithms with fewer swaps (e.g. selection sort).',
    },
  ],

  whenToUse: [
    {
      ru: 'Как учебный пример для объяснения самой идеи сортировки сравнением, до перехода к более сложным алгоритмам.',
      en: 'As a teaching example to explain the very idea of comparison sorting, before moving to more advanced algorithms.',
    },
    {
      ru: 'Для очень маленьких или почти отсортированных массивов, где простота кода важнее асимптотики.',
      en: 'For very small or nearly sorted arrays, where code simplicity matters more than asymptotics.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Учебные курсы по алгоритмам** — почти всегда первый алгоритм сортировки, который объясняют, благодаря наглядности идеи «всплытия».',
      en: '**Algorithms courses** — almost always the first sorting algorithm taught, thanks to how visual the "bubbling" idea is.',
    },
    {
      ru: '**Встроенные системы с крайне ограниченной памятью**, где O(1) дополнительной памяти важнее скорости на небольшом наборе данных.',
      en: '**Embedded systems with extremely tight memory**, where O(1) extra memory matters more than speed on a small dataset.',
    },
  ],

  relatedAlgorithms: ['selection-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что происходит с самым большим элементом массива после первого прохода пузырьковой сортировки?',
        en: 'What happens to the largest element in the array after the first pass of bubble sort?',
      },
      options: [
        { ru: 'Он оказывается в конце массива', en: 'It ends up at the end of the array' },
        { ru: 'Он оказывается в начале массива', en: 'It ends up at the start of the array' },
        { ru: 'Он остаётся на случайной позиции', en: 'It stays at a random position' },
        { ru: 'Массив нужно пройти дважды, чтобы это произошло', en: 'The array must be traversed twice for this to happen' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сравнивая соседей слева направо и переставляя большие элементы правее, алгоритм гарантированно «выталкивает» наибольший элемент в конец за один проход.',
        en: 'By comparing left-to-right and pushing larger elements rightward, the algorithm guarantees the largest element gets pushed to the end in a single pass.',
      },
      hint: {
        ru: 'Подумай, что происходит с элементом, когда он оказывается больше своего соседа при каждом сравнении — куда он «двигается»?',
        en: "Think about what happens to an element whenever it's bigger than its neighbor at each comparison — which direction does it keep moving?",
      },
    },
    {
      question: {
        ru: 'Зачем нужен флаг `swapped` в реализации?',
        en: 'Why does the implementation track a `swapped` flag?',
      },
      options: [
        { ru: 'Чтобы досрочно завершить сортировку, если массив уже упорядочен', en: 'To exit early once the array is already sorted' },
        { ru: 'Чтобы посчитать общее количество инверсий за все проходы', en: 'To count the total number of inversions across all passes' },
        { ru: 'Чтобы гарантировать устойчивость сортировки между проходами', en: 'To guarantee sort stability between passes' },
        { ru: 'Он ни на что не влияет и оставлен по ошибке', en: 'It has no effect and was left in by mistake' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если за целый проход не было перестановок, значит массив уже отсортирован — алгоритм может выйти из цикла раньше, доводя лучший случай до O(n).',
        en: 'If a full pass makes no swaps, the array is already sorted — the algorithm can break out early, bringing the best case down to O(n).',
      },
      hint: {
        ru: 'Что означает отсутствие перестановок за целый проход с точки зрения порядка массива?',
        en: "What does zero swaps during an entire pass tell you about the array's order?",
      },
    },
    {
      question: {
        ru: 'Какова временная сложность пузырьковой сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of bubble sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'В худшем случае (массив отсортирован в обратном порядке) требуется полное количество проходов и сравнений — квадратичное от размера массива.',
        en: 'In the worst case (reverse-sorted array), the algorithm needs the full number of passes and comparisons — quadratic in the array size.',
      },
      hint: {
        ru: 'Посчитай, сколько сравнений потребуется, если после каждого прохода массив остаётся в обратном порядке.',
        en: 'Count how many comparisons are needed if the array stays reverse-ordered after every pass.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует пузырьковая сортировка?',
        en: 'How much extra memory does bubble sort require?',
      },
      options: [
        { ru: 'O(1) — сортировка происходит на месте', en: 'O(1) — it sorts in place' },
        { ru: 'O(n) — нужен второй массив', en: 'O(n) — a second array is needed' },
        { ru: 'O(log n) — как у merge sort', en: 'O(log n) — like merge sort' },
        { ru: 'O(n²) — по одной ячейке на каждое сравнение', en: 'O(n²) — one cell per comparison' },
      ],
      correct: 0,
      explanation: {
        ru: 'Все перестановки происходят прямо в исходном массиве, дополнительно нужна лишь пара временных переменных для обмена значениями.',
        en: 'All swaps happen directly in the original array; only a couple of temporary variables are needed to exchange values.',
      },
      hint: {
        ru: 'Обрати внимание, используется ли отдельная структура данных для хранения промежуточных результатов, или всё происходит прямо в исходном массиве.',
        en: 'Notice whether any separate data structure holds intermediate results, or whether everything happens directly in the original array.',
      },
    },
    {
      question: {
        ru: 'Пузырьковая сортировка устойчива (stable). Что это значит?',
        en: 'Bubble sort is stable. What does that mean?',
      },
      options: [
        {
          ru: 'Равные по значению элементы сохраняют исходный относительный порядок',
          en: 'Elements with equal values keep their original relative order',
        },
        { ru: 'Алгоритм никогда не падает на пустом или однотонном массиве', en: 'The algorithm never crashes on an empty or single-element array' },
        { ru: 'Время выполнения не зависит от порядка входных данных', en: 'Runtime does not depend on the order of the input data' },
        { ru: 'Сортировка всегда завершается ровно за O(n) шагов', en: 'The sort always finishes in exactly O(n) steps' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм меняет местами только строго больший элемент со следующим — равные элементы никогда не переставляются друг с другом, порядок между ними сохраняется.',
        en: 'The algorithm only swaps a strictly greater element with the next one — equal elements never swap with each other, so their order is preserved.',
      },
      hint: {
        ru: 'Подумай, могут ли вообще поменяться местами два равных элемента при сравнении «строго больше».',
        en: 'Think about whether two equal elements can ever swap under a strictly-greater comparison.',
      },
    },
    {
      question: {
        ru: 'При каких условиях пузырьковая сортировка с флагом `swapped` достигает лучшего случая O(n)?',
        en: 'Under what condition does bubble sort with the `swapped` flag hit its best case of O(n)?',
      },
      options: [
        { ru: 'Когда массив уже отсортирован', en: 'When the array is already sorted' },
        { ru: 'Когда массив отсортирован в обратном порядке', en: 'When the array is reverse-sorted' },
        { ru: 'Когда все элементы одинаковы, но флаг отключён', en: 'When all elements are equal but the flag is disabled' },
        { ru: 'Лучший случай всегда O(n²), флаг ничего не меняет', en: 'The best case is always O(n²); the flag changes nothing' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если массив уже упорядочен, первый же проход не находит ни одной пары для перестановки, флаг остаётся `false`, и алгоритм завершается за один линейный проход.',
        en: 'If the array is already sorted, the very first pass finds no pair to swap, the flag stays `false`, and the algorithm finishes after a single linear pass.',
      },
      hint: {
        ru: 'Подумай, что покажет самый первый проход, если сравнивать уже упорядоченные соседние элементы.',
        en: 'Think about what the very first pass finds when comparing neighbors that are already in order.',
      },
    },
    {
      question: {
        ru: 'Сколько проходов нужно пузырьковой сортировке в худшем случае для массива из n элементов?',
        en: 'How many passes does bubble sort need in the worst case for an array of n elements?',
      },
      options: [
        { ru: 'n − 1', en: 'n − 1' },
        { ru: 'n', en: 'n' },
        { ru: 'log₂ n', en: 'log₂ n' },
        { ru: 'n / 2', en: 'n / 2' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждый полный проход гарантированно ставит на место ещё один элемент с конца, поэтому после n − 1 проходов оставшийся единственный элемент уже обязан быть на своём месте.',
        en: 'Each full pass is guaranteed to place one more element correctly at the end, so after n − 1 passes the single remaining element must already be in its place.',
      },
      hint: {
        ru: 'Подумай, сколько элементов остаётся «непроверенными», если каждый проход фиксирует ровно один элемент справа.',
        en: 'Think about how many elements remain unchecked if each pass locks exactly one more element on the right.',
      },
    },
    {
      question: {
        ru: 'Почему пузырьковую сортировку с флагом `swapped` называют адаптивной?',
        en: 'Why is bubble sort with the `swapped` flag called adaptive?',
      },
      options: [
        {
          ru: 'Она выполняет меньше работы на частично отсортированных данных',
          en: 'It does less work on partially sorted data',
        },
        { ru: 'Она подстраивается под размер массива, меняя алгоритм', en: 'It swaps its algorithm depending on array size' },
        { ru: 'Она автоматически выбирает язык программирования', en: 'It picks the programming language automatically' },
        { ru: 'Она не является адаптивной', en: 'It is not actually adaptive' },
      ],
      correct: 0,
      explanation: {
        ru: 'Адаптивность алгоритма означает, что его производительность улучшается на «почти готовых» входных данных. Флаг `swapped` даёт именно это: чем ближе массив к отсортированному, тем меньше проходов и перестановок потребуется.',
        en: "An algorithm is adaptive when its performance improves on 'almost sorted' input. The `swapped` flag delivers exactly that: the closer the array is to sorted, the fewer passes and swaps it takes.",
      },
      hint: {
        ru: 'Вспомни, как флаг `swapped` использует уже существующий порядок в массиве, а не игнорирует его.',
        en: 'Recall how the `swapped` flag takes advantage of existing order in the array instead of ignoring it.',
      },
    },
    {
      question: {
        ru: 'Чем отличается число перестановок (swaps) у пузырьковой сортировки от сортировки выбором в худшем случае?',
        en: 'How does the number of swaps in bubble sort compare to selection sort in the worst case?',
      },
      options: [
        {
          ru: 'Пузырьковая делает до O(n²) перестановок, сортировка выбором — не больше O(n)',
          en: 'Bubble sort makes up to O(n²) swaps, selection sort makes at most O(n)',
        },
        { ru: 'Обе делают одинаковое число перестановок независимо от размера и порядка входа', en: 'Both make the exact same number of swaps regardless of the input size or order' },
        { ru: 'Пузырьковая делает меньше перестановок за проход, чем сортировка выбором', en: 'Bubble sort makes fewer swaps per pass than selection sort does' },
        { ru: 'Сортировка выбором делает больше перестановок в сумме, чем пузырьковая', en: 'Selection sort makes more swaps in total than bubble sort does' },
      ],
      correct: 0,
      explanation: {
        ru: 'Пузырьковая сортировка меняет местами любую соседнюю пару, стоящую в неправильном порядке, — таких перестановок может быть до O(n²). Сортировка выбором делает не более одной перестановки за проход — всего до n перестановок, что важно для дорогих операций записи (например, во флеш-память).',
        en: "Bubble sort swaps any adjacent out-of-order pair — up to O(n²) swaps total. Selection sort does at most one swap per pass — up to n swaps total, which matters when writes are expensive (e.g. flash memory).",
      },
      hint: {
        ru: 'Подумай, сколько перестановок каждый алгоритм делает за один проход по непросортированной части массива.',
        en: 'Think about how many swaps each algorithm makes during a single pass over the unsorted portion.',
      },
    },
    {
      question: {
        ru: 'Что делает вариант «шейкерной» (cocktail shaker) сортировки лучше обычной пузырьковой на практике?',
        en: "What makes the cocktail shaker sort variant faster than plain bubble sort in practice?",
      },
      options: [
        {
          ru: 'Она чередует проходы вперёд и назад, быстрее поднимая маленькие элементы у конца массива',
          en: 'It alternates forward and backward passes, lifting small elements near the end faster',
        },
        { ru: 'Она использует дополнительный массив для хранения промежуточных копий элементов', en: 'It uses an extra array to hold intermediate copies of the elements' },
        { ru: 'Она параллелит все сравнения элементов одновременно на нескольких ядрах', en: 'It parallelizes all element comparisons at once across multiple cores' },
        { ru: 'Она снижает асимптотику худшего случая до O(n log n), как в сортировке слиянием', en: 'It lowers the worst-case asymptotic complexity all the way down to O(n log n), like merge sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'В обычной пузырьковой сортировке маленький элемент («черепаха»), застрявший у конца массива, продвигается только на одну позицию за проход. Шейкерная сортировка чередует направление прохода, поднимая такие элементы значительно быстрее — при той же асимптотике O(n²) в худшем случае.',
        en: "In plain bubble sort, a small element (a 'turtle') stuck near the end only moves one position per pass. Cocktail shaker sort alternates the pass direction, lifting such elements much faster — while keeping the same O(n²) worst case.",
      },
      hint: {
        ru: 'Представь маленький элемент в самом конце массива в обычной пузырьковой сортировке — сколько проходов ему нужно, чтобы добраться до начала?',
        en: 'Picture a small element sitting at the very end of the array in plain bubble sort — how many passes does it take to reach the front?',
      },
    },
  ],
};

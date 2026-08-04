export const cocktailShakerSort = {
  slug: 'cocktail-shaker-sort',
  category: 'sorting',
  name: { ru: 'Cocktail Shaker Sort', en: 'Cocktail Shaker Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'stable'],

  intent: {
    ru: 'Шейкерная сортировка — это двунаправленная пузырьковая сортировка: она поочерёдно проходит массив слева направо и справа налево, «выталкивая» на каждом проходе и самый большой, и самый маленький ещё не отсортированный элемент.',
    en: 'Cocktail shaker sort is bidirectional bubble sort: it alternates passing the array left-to-right and right-to-left, pushing both the largest and the smallest unsorted element into place on every round.',
  },

  problem: {
    ru: 'Обычная пузырьковая сортировка всегда движется в одну сторону, поэтому маленький элемент, застрявший в конце массива (её называют «черепахой»), сдвигается к началу лишь на одну позицию за проход — это требует почти n проходов, даже если весь остальной массив уже отсортирован.',
    en: 'Plain bubble sort always moves in one direction, so a small element stuck at the end of the array (a "turtle") only moves one position toward the start per pass — this takes nearly n passes even if the rest of the array is already sorted.',
  },

  solution: {
    ru: 'Алгоритм чередует направление прохода: сначала идёт слева направо, как обычный bubble sort, выталкивая наибольший элемент в конец; затем сразу разворачивается и идёт справа налево, выталкивая наименьший элемент в начало. Границы отсортированной части сжимаются с обеих сторон одновременно, поэтому «черепахи» устраняются так же быстро, как и «кролики» (большие элементы у начала массива).',
    en: 'The algorithm alternates pass direction: first left-to-right like regular bubble sort, pushing the largest element to the end; then immediately reversing to go right-to-left, pushing the smallest element to the start. The sorted boundary shrinks from both sides at once, so "turtles" are eliminated just as fast as "rabbits" (large elements near the start).',
  },

  steps: [
    {
      title: { ru: 'Проход слева направо', en: 'Left-to-right pass' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами соседние элементы, двигаясь от начала неотсортированной части к концу — как в bubble sort.',
        en: 'Compare and swap adjacent elements while moving from the start of the unsorted part to its end — just like bubble sort.',
      },
    },
    {
      title: { ru: 'Сжать правую границу', en: 'Shrink the right boundary' },
      explanation: {
        ru: 'Самый большой элемент прохода теперь на своём месте справа — исключить его из дальнейших проходов.',
        en: 'The largest element of the pass is now in place on the right — exclude it from further passes.',
      },
    },
    {
      title: { ru: 'Проход справа налево', en: 'Right-to-left pass' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами соседние элементы, двигаясь от конца неотсортированной части к началу.',
        en: 'Compare and swap adjacent elements while moving from the end of the unsorted part back to its start.',
      },
    },
    {
      title: { ru: 'Сжать левую границу', en: 'Shrink the left boundary' },
      explanation: {
        ru: 'Самый маленький элемент прохода теперь на своём месте слева — исключить его из дальнейших проходов.',
        en: 'The smallest element of the pass is now in place on the left — exclude it from further passes.',
      },
    },
    {
      title: { ru: 'Остановиться без перестановок', en: 'Stop with no swaps' },
      explanation: {
        ru: 'Если целый двойной проход не дал ни одной перестановки, массив отсортирован — можно закончить раньше времени.',
        en: 'If a full round-trip pass makes zero swaps, the array is sorted — the algorithm can exit early.',
      },
    },
  ],

  implementation: {
    javascript: `function cocktailShakerSort(arr) {
  const a = [...arr];
  let start = 0;
  let end = a.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
    }
    end--;
    if (!swapped) break;

    swapped = false;
    for (let i = end; i > start; i--) {
      if (a[i - 1] > a[i]) {
        [a[i - 1], a[i]] = [a[i], a[i - 1]];
        swapped = true;
      }
    }
    start++;
  }
  return a;
}`,
    python: `def cocktail_shaker_sort(arr):
    a = arr.copy()
    start, end = 0, len(a) - 1
    swapped = True

    while swapped:
        swapped = False
        for i in range(start, end):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
        end -= 1
        if not swapped:
            break

        swapped = False
        for i in range(end, start, -1):
            if a[i - 1] > a[i]:
                a[i - 1], a[i] = a[i], a[i - 1]
                swapped = True
        start += 1
    return a`,
  },

  pros: [
    {
      ru: 'Устраняет и «черепах» (маленькие элементы в конце), и «кроликов» (большие элементы в начале) одинаково быстро, в отличие от обычного bubble sort.',
      en: 'Eliminates both "turtles" (small elements at the end) and "rabbits" (large elements at the start) equally fast, unlike plain bubble sort.',
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
      ru: 'Всё ещё O(n²) сравнений в среднем и худшем случае — асимптотически не лучше bubble sort.',
      en: 'Still O(n²) comparisons on average and worst case — asymptotically no better than bubble sort.',
    },
    {
      ru: 'Более сложная реализация, чем обычный bubble sort, за прирост производительности только на конкретных «неудобных» распределениях данных.',
      en: 'More complex to implement than plain bubble sort, for a speed-up that only matters on specific "awkward" data distributions.',
    },
    {
      ru: 'На случайных данных выигрыш перед обычным bubble sort минимален — константный множитель, не порядок сложности.',
      en: 'On random data the gain over plain bubble sort is minimal — a constant factor, not a complexity-order improvement.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные почти отсортированы, но несколько элементов «застряли» не с той стороны массива, где их достала бы обычная пузырьковая сортировка.',
      en: 'When data is nearly sorted but a few elements are "stuck" on the wrong side for plain bubble sort to reach quickly.',
    },
    {
      ru: 'Как учебный пример двунаправленного прохода — концептуальный мостик к более сложным алгоритмам вроде timsort.',
      en: 'As a teaching example of a bidirectional pass — a conceptual bridge to more advanced algorithms like Timsort.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Учебные курсы по алгоритмам** используют его, чтобы показать, как небольшое изменение стратегии прохода (двунаправленность) устраняет конкретный класс худших случаев без смены общей идеи алгоритма.',
      en: '**Algorithms courses** use it to show how a small change in pass strategy (bidirectionality) eliminates a specific class of worst cases without changing the algorithm\'s core idea.',
    },
    {
      ru: '**Небольшие встроенные буферы данных**, где данные почти отсортированы (например, скользящее окно последних измерений сенсора), а простота реализации важнее асимптотики.',
      en: '**Small embedded data buffers** where data is nearly sorted (e.g. a sliding window of recent sensor readings), and implementation simplicity matters more than asymptotics.',
    },
  ],

  relatedAlgorithms: ['bubble-sort', 'comb-sort'],

  quiz: [
    {
      question: {
        ru: 'Чем шейкерная сортировка отличается от обычной пузырьковой?',
        en: 'What distinguishes cocktail shaker sort from plain bubble sort?',
      },
      options: [
        { ru: 'Она чередует направление прохода: слева направо и справа налево', en: 'It alternates pass direction: left-to-right and right-to-left' },
        { ru: 'Она использует дополнительный временный массив для слияния промежуточных результатов', en: 'It uses an extra temporary array to merge intermediate results together' },
        { ru: 'Она сравнивает элементы через постепенно сокращающийся фиксированный gap', en: 'It compares elements through a gradually shrinking fixed gap' },
        { ru: 'Она каждый раз выбирает случайный опорный элемент для сравнения', en: 'It picks a random pivot element for comparison on every pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Проход слева направо выталкивает наибольший элемент вправо, а следующий проход справа налево выталкивает наименьший элемент влево — границы сортированной зоны сжимаются с обеих сторон.',
        en: 'A left-to-right pass pushes the largest element right, and the following right-to-left pass pushes the smallest element left — the sorted boundary shrinks from both sides.',
      },
    },
    {
      question: {
        ru: 'Какую проблему обычного bubble sort решает шейкерная сортировка?',
        en: 'What problem of plain bubble sort does cocktail shaker sort solve?',
      },
      options: [
        { ru: 'Медленное перемещение маленьких элементов («черепах»), застрявших в конце массива', en: 'Slow movement of small elements ("turtles") stuck at the end of the array' },
        { ru: 'Излишний расход дополнительной памяти на каждый проход по массиву', en: 'Excessive extra memory usage on every single pass through the array' },
        { ru: 'Нестабильность сортировки, когда в массиве встречаются равные элементы', en: 'Sort instability whenever equal elements happen to appear in the array' },
        { ru: 'Принципиальная невозможность вообще сортировать массив по убыванию', en: 'A fundamental inability to ever sort the array in descending order at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'В обычном bubble sort маленький элемент у конца массива сдвигается к началу лишь на одну позицию за проход; двунаправленные проходы устраняют эту асимметрию.',
        en: 'In plain bubble sort, a small element near the end only moves one position toward the start per pass; bidirectional passes remove that asymmetry.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность шейкерной сортировки в среднем случае?',
        en: 'What is the average-case time complexity of cocktail shaker sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(√n)', en: 'O(√n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Двунаправленность меняет константный множитель и поведение на конкретных распределениях, но не меняет порядок роста — в среднем всё ещё O(n²) сравнений.',
        en: 'Bidirectionality changes the constant factor and behavior on specific distributions, but not the growth order — still O(n²) comparisons on average.',
      },
    },
    {
      question: {
        ru: 'Является ли шейкерная сортировка устойчивой (stable)?',
        en: 'Is cocktail shaker sort stable?',
      },
      options: [
        { ru: 'Да — меняются местами только строго неравные соседние элементы', en: 'Yes — only strictly unequal adjacent elements are swapped' },
        { ru: 'Нет — двунаправленные проходы нарушают порядок равных элементов', en: 'No — bidirectional passes break the order of equal elements' },
        { ru: 'Зависит от направления первого прохода', en: 'It depends on the direction of the first pass' },
        { ru: 'Устойчивость неприменима к сортировкам на месте', en: 'Stability doesn\'t apply to in-place sorts' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и в bubble sort, элементы меняются местами только если левый строго больше правого — равные элементы никогда не переставляются друг с другом.',
        en: 'Just like bubble sort, elements swap only when the left one is strictly greater — equal elements never swap with each other.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует шейкерная сортировка?',
        en: 'How much extra memory does cocktail shaker sort need?',
      },
      options: [
        { ru: 'O(1) — сортировка происходит на месте', en: 'O(1) — it sorts in place' },
        { ru: 'O(n) — по одному элементу с каждой стороны', en: 'O(n) — one per side' },
        { ru: 'O(log n) — на стек рекурсии', en: 'O(log n) — for a recursion stack' },
        { ru: 'O(n²) — на матрицу сравнений', en: 'O(n²) — for a comparison matrix' },
      ],
      correct: 0,
      explanation: {
        ru: 'Все перестановки происходят прямо в исходном массиве; нужны лишь переменные-границы `start`/`end` и флаг `swapped`.',
        en: 'All swaps happen directly in the original array; only `start`/`end` boundary variables and a `swapped` flag are needed.',
      },
    },
  ],
};

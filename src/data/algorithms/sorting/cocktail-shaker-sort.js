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
  stepBreakpoints: [2, 16, 30, 45],

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
      hint: {
        ru: 'Подумайте о движении шейкера для коктейлей — что отличает его от простого движения в одну сторону?',
        en: 'Think about the motion of a cocktail shaker — what sets it apart from just moving in one direction?',
      },
    },
    {
      question: {
        ru: 'Какую проблему обычного bubble sort решает шейкерная сортировка?',
        en: 'What problem of plain bubble sort does cocktail shaker sort solve?',
      },
      options: [
        { ru: 'Медленный ход маленьких элементов («черепах») в конце массива', en: 'Slow movement of small elements ("turtles") stuck at the end of the array' },
        { ru: 'Излишний расход дополнительной памяти на каждый проход по массиву', en: 'Excessive extra memory usage on every single pass through the array' },
        { ru: 'Нестабильность сортировки, когда в массиве встречаются равные элементы', en: 'Sort instability whenever equal elements happen to appear in the array' },
        { ru: 'Принципиальная невозможность вообще сортировать массив по убыванию', en: 'A fundamental inability to ever sort the array in descending order at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'В обычном bubble sort маленький элемент у конца массива сдвигается к началу лишь на одну позицию за проход; двунаправленные проходы устраняют эту асимметрию.',
        en: 'In plain bubble sort, a small element near the end only moves one position toward the start per pass; bidirectional passes remove that asymmetry.',
      },
      hint: {
        ru: 'Представьте маленький элемент в самом конце массива при обычном bubble sort. Насколько быстро он доберётся до начала?',
        en: 'Imagine a small element at the very end of the array in plain bubble sort. How quickly can it reach the start?',
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
      hint: {
        ru: 'Двунаправленность улучшает константу, но меняет ли она порядок роста числа сравнений?',
        en: 'Bidirectionality improves the constant, but does it change the growth order of comparisons?',
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
      hint: {
        ru: 'Посмотрите на условие перестановки: `a[i] > a[i+1]`. Что происходит, если элементы равны?',
        en: 'Look at the swap condition: `a[i] > a[i+1]`. What happens when elements are equal?',
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
      hint: {
        ru: 'Создаёт ли алгоритм копии массива или вспомогательные структуры данных?',
        en: 'Does the algorithm create copies of the array or auxiliary data structures?',
      },
    },
    {
      question: {
        ru: 'Каков лучший случай шейкерной сортировки и когда он возникает?',
        en: 'What is the best case of cocktail shaker sort and when does it occur?',
      },
      options: [
        { ru: 'O(n) — массив уже упорядочен, первый проход не даёт перестановок', en: 'O(n) — when the array is already sorted and the first round trip makes no swaps' },
        { ru: 'O(1) — когда массив из одного элемента', en: 'O(1) — when the array has exactly one element' },
        { ru: 'O(n log n) — когда данные случайные, но близкие к нормальному распределению', en: 'O(n log n) — when data is random but close to a normal distribution in all cases' },
        { ru: 'O(n²) — лучший случай не отличается от среднего', en: 'O(n²) — the best case is no different from the average case' },
      ],
      correct: 0,
      explanation: {
        ru: 'Флаг ранней остановки `swapped` позволяет выйти после одного прохода туда и обратно, если не было ни одной перестановки — это означает, что массив уже был отсортирован.',
        en: 'The early-exit flag `swapped` lets the algorithm stop after one round trip if no swap was made — meaning the array was already sorted.',
      },
      hint: {
        ru: 'Когда флаг swapped остаётся ложным после целого прохода туда и обратно?',
        en: 'When does the swapped flag stay false after a full round-trip pass?',
      },
    },
    {
      question: {
        ru: 'Почему шейкерная сортировка не улучшает асимптотику по сравнению с bubble sort?',
        en: 'Why doesn\'t cocktail shaker sort improve the asymptotic complexity over bubble sort?',
      },
      options: [
        { ru: 'По-прежнему O(n²) сравнений на случайных данных в среднем', en: 'It still makes O(n²) comparisons on random data on average' },
        { ru: 'Она добавляет лишние проходы справа налево, удваивая работу', en: 'It adds extra right-to-left passes that double the work' },
        { ru: 'Она устойчива, а устойчивые алгоритмы не могут быть лучше O(n²)', en: 'It is stable, and stable algorithms cannot be better than O(n²)' },
        { ru: 'Она не использует рекурсию, а без неё нельзя достичь O(n log n)', en: 'It uses no recursion, and without recursion O(n log n) is impossible' },
      ],
      correct: 0,
      explanation: {
        ru: 'Двунаправленность устраняет конкретный патологический случай («черепахи»), но не меняет порядок роста числа сравнений — на случайных данных алгоритм всё равно делает O(n²) сравнений.',
        en: 'Bidirectionality removes a specific pathological case ("turtles") but doesn\'t change the growth order of comparisons — on random data the algorithm still makes O(n²) comparisons.',
      },
      hint: {
        ru: 'Что меняет двунаправленность — поведение на конкретном распределении или общий порядок роста?',
        en: 'What does bidirectionality change — behavior on a specific distribution, or the overall growth order?',
      },
    },
    {
      question: {
        ru: 'Как называется «маленький элемент, застрявший в конце массива» в контексте bubble sort?',
        en: 'What is the name for a "small element stuck at the end of the array" in the context of bubble sort?',
      },
      options: [
        { ru: '«Черепаха» — она движется к началу медленно, по одной позиции за проход', en: '"Turtle" — it moves toward the start slowly, one position per pass' },
        { ru: '«Кролик» — он быстро перемещается вправо за один проход влево', en: '"Rabbit" — it moves quickly to the right in a single left pass' },
        { ru: '«Якорь» — он полностью останавливает алгоритм до следующего перезапуска', en: '"Anchor" — it completely stops the algorithm until the next restart' },
        { ru: '«Сентинель» — специальный элемент для обозначения границы массива', en: '"Sentinel" — a special element marking the array boundary' },
      ],
      correct: 0,
      explanation: {
        ru: '«Черепаха» — классический термин для маленького элемента у правого края: в bubble sort он двигается влево лишь на одну позицию за каждый полный проход.',
        en: '"Turtle" is the classic term for a small element near the right edge: in bubble sort it moves left by only one position per full pass.',
      },
      hint: {
        ru: 'Подумайте о животном, которое движется очень медленно. Какой термин использует терминология bubble sort?',
        en: 'Think of an animal that moves very slowly. What term does bubble sort terminology use?',
      },
    },
    {
      question: {
        ru: 'Что происходит с границами `start` и `end` после каждого полного двойного прохода?',
        en: 'What happens to the `start` and `end` boundaries after each full round-trip pass?',
      },
      options: [
        { ru: '`end` уменьшается на 1, а `start` увеличивается на 1', en: '`end` decreases by 1 and `start` increases by 1' },
        { ru: 'Обе границы сбрасываются в исходные позиции для следующего прохода', en: 'Both boundaries reset to their initial positions for the next pass' },
        { ru: '`start` увеличивается на 2, а `end` не меняется', en: '`start` increases by 2 and `end` stays the same' },
        { ru: 'Границы меняются местами после каждого полного двойного прохода', en: 'The boundaries swap with each other after every full round-trip' },
      ],
      correct: 0,
      explanation: {
        ru: 'После прохода слева направо `end` уменьшается — наибольший элемент встал на место; после прохода справа налево `start` увеличивается — наименьший элемент встал на место.',
        en: 'After the left-to-right pass `end` decreases — the largest element is in place; after the right-to-left pass `start` increases — the smallest element is in place.',
      },
      hint: {
        ru: 'После каждого прохода один элемент занимает своё финальное место. С какой стороны?',
        en: 'After each pass, one element reaches its final place. On which side?',
      },
    },
    {
      question: {
        ru: 'Какой алгоритм использует аналогичную идею «уменьшающегося зазора», но более агрессивно?',
        en: 'Which algorithm uses a similar "shrinking gap" idea but more aggressively?',
      },
      options: [
        { ru: 'Comb sort — быстрее уменьшает зазор между элементами', en: 'Comb sort — it shrinks the gap between compared elements faster' },
        { ru: 'Merge sort — рекурсивно уменьшает размер подзадачи вдвое', en: 'Merge sort — it recursively halves the subproblem size' },
        { ru: 'Radix sort — уменьшает диапазон ключей поразрядно', en: 'Radix sort — it reduces the key range digit by digit' },
        { ru: 'Heap sort — уменьшает кучу после каждого извлечения максимума', en: 'Heap sort — it shrinks the heap after each maximum extraction always' },
      ],
      correct: 0,
      explanation: {
        ru: 'Comb sort использует тот же базовый принцип пузырьковой сортировки, но сравнивает элементы через зазор больше 1, быстро уменьшая его — это устраняет «черепах» гораздо быстрее, чем шейкерная сортировка.',
        en: 'Comb sort uses the same basic bubble sort principle but compares elements across a gap greater than 1, shrinking it rapidly — this eliminates turtles much faster than cocktail shaker sort does.',
      },
      hint: {
        ru: 'Шейкерная сортировка сравнивает соседние элементы (зазор = 1). Какой алгоритм начинает с большего зазора и уменьшает его?',
        en: 'Cocktail shaker sort compares adjacent elements (gap = 1). Which algorithm starts with a larger gap and shrinks it?',
      },
    },
  ],
};

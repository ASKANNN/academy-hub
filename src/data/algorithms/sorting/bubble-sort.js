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
    ru: 'Есть массив чисел в произвольном порядке, и его нужно упорядочить по возрастанию. Самая простая мысленная модель - сравнивать пары соседних элементов и переставлять их местами, если левый больше правого. Вопрос в том, как повторять это действие так, чтобы за конечное число проходов массив гарантированно стал отсортированным.',
    en: 'Given an array of numbers in arbitrary order, you need it sorted ascending. The simplest mental model is comparing neighboring pairs and swapping them when the left one is bigger. The question is how to repeat that action so the array is guaranteed sorted after a finite number of passes.',
  },

  solution: {
    ru: 'На каждом проходе алгоритм сравнивает пары соседних элементов слева направо и меняет их местами, если они стоят в неправильном порядке. После первого прохода самый большой элемент гарантированно «всплывает» в конец массива - отсюда и название. Проходы повторяются, каждый раз укорачиваясь на один элемент справа, пока за целый проход не произойдёт ни одной перестановки - это значит, что массив уже отсортирован.',
    en: 'On each pass, the algorithm compares neighboring pairs left to right and swaps them when they are in the wrong order. After the first pass, the largest element is guaranteed to have "bubbled" to the end - hence the name. Passes repeat, each one shrinking by one element from the right, until a full pass makes zero swaps - which means the array is already sorted.',
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
        ru: 'Если левый элемент больше правого - поменять их местами.',
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
        ru: 'Самый большой элемент прохода теперь на своём месте - исключить его из следующих проходов.',
        en: 'The largest element of the pass is now in its final place - exclude it from the next passes.',
      },
    },
    {
      title: { ru: 'Остановиться без перестановок', en: 'Stop with no swaps' },
      explanation: {
        ru: 'Если целый проход не дал ни одной перестановки, массив отсортирован - можно закончить раньше времени.',
        en: 'If a full pass makes zero swaps, the array is sorted - the algorithm can exit early.',
      },
    },
  ],
  stepBreakpoints: [2, 16, 31, 47],

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
      ru: 'Сортирует на месте - требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place - needs only O(1) extra memory.',
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
      ru: 'Много операций записи в массив - на больших данных это дороже, чем алгоритмы с меньшим числом перестановок (например, сортировка выбором).',
      en: 'It performs many array writes - costlier on large data than algorithms with fewer swaps (e.g. selection sort).',
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
      ru: '**Учебные курсы по алгоритмам** - почти всегда первый алгоритм сортировки, который объясняют, благодаря наглядности идеи «всплытия».',
      en: '**Algorithms courses** - almost always the first sorting algorithm taught, thanks to how visual the "bubbling" idea is.',
    },
    {
      ru: '**Встроенные системы с крайне ограниченной памятью**, где O(1) дополнительной памяти важнее скорости на небольшом наборе данных.',
      en: '**Embedded systems with extremely tight memory**, where O(1) extra memory matters more than speed on a small dataset.',
    },
  ],

  details: {
    deepDive: {
      ru: 'Пузырьковая сортировка работает через повторяющееся сравнение и обмен соседних элементов. На каждом проходе алгоритм идёт слева направо: если левый элемент больше правого, они меняются местами. Благодаря этому процессу каждый больший элемент как бы «всплывает» в сторону конца массива - отсюда и название. На первом проходе наибольший элемент гарантированно достигнет конца. На втором проходе - второй по величине элемент встанет на своё место рядом, и так далее. После каждого прохода один элемент уже находится на окончательной позиции, поэтому на следующем проходе можно сократить активную часть массива на один элемент справа. Ключевое наблюдение: за один проход элемент может сдвинуться максимум на n-1 позиций, если каждый раз происходит обмен. Однако маленький элемент, оказавшись в конце отсортированного в обратном порядке массива, будет смещаться только на одну позицию за проход - это создаёт худший случай O(n²).',
      en: 'Bubble sort works by repeatedly comparing and swapping adjacent elements. On each pass, the algorithm moves left to right: if the left element is larger, they swap. This process causes each larger element to "bubble" toward the end - hence the name. On the first pass, the largest element is guaranteed to reach the end. On the second pass, the second-largest element settles beside it, and so on. After each pass, one element is in its final position, so the next pass can shrink the active part by one element from the right. A key insight: an element can shift at most n-1 positions in one pass if swaps happen every time. However, a small element stuck at the end of a reverse-sorted array advances only one position per pass - this is what creates the O(n²) worst case.',
    },
    whenToUse: {
      ru: 'Пузырьковую сортировку практически никогда не используют в production-коде из-за квадратичной сложности. Однако она полезна в трёх ситуациях. Первая - обучение: это самый наглядный алгоритм для понимания идеи сравнивающей сортировки, особенно визуализация с анимацией «всплытия». Вторая - почти отсортированные данные: если использовать флаг `swapped`, лучший случай O(n) может быть быстрее чем Insertion Sort на таких данных из-за отсутствия overhead-а. Третья - крайне ограниченная память: O(1) дополнительной памяти важна в встроенных системах, но даже там Insertion Sort часто предпочтительнее благодаря меньшему числу перестановок. Сравнение с Selection Sort: последняя гарантирует не более n перестановок, в то время как пузырьковая делает до O(n²) обменов - критично, когда операции записи дорогие (флеш-память, EEPROM).',
      en: 'Bubble sort is almost never used in production code due to its quadratic complexity. However, it is useful in three scenarios. First, education: it is the most intuitive algorithm for understanding comparison-based sorting, especially with animated visualization of the "bubbling" effect. Second, nearly-sorted data: with the `swapped` flag, the O(n) best case can be faster than Insertion Sort due to less overhead. Third, extremely tight memory: O(1) extra space matters in embedded systems, but even there Insertion Sort is often preferable because it makes fewer swaps. Comparing to Selection Sort: the latter guarantees at most n swaps, while bubble sort makes up to O(n²) exchanges - crucial when writes are expensive (flash memory, EEPROM).',
    },
    realWorld: {
      ru: 'Пузырьковую сортировку встречают в живом коде редко, но существуют специализированные варианты. Cocktail Shaker Sort (шейкерная сортировка) чередует направление прохода: сначала слева направо (маленькие элементы вверху становятся меньше идут вверх), потом справа налево (большие элементы опускаются вниз быстрее). Это существенно ускоряет практическое выполнение на случайных данных, оставляя асимптотику O(n²). Пример: если в массиве одна маленькая «черепаха» у правого конца, обычный bubble sort гонит её слева направо n-1 проходов. Шейкерная сортировка на обратном проходе (справа налево) сдвигает её влево быстрее. В ядрах JavaScript-движков (V8, SpiderMonkey) и старых версиях Java до 2011 года использовались оптимизированные in-place шейкер-сортировки для малых массивов (обычно до 10 элементов) перед переключением на быстрые алгоритмы типа Insertion Sort или Quicksort. Сегодня её место - только в конкурсах по программированию и в учебных целях.',
      en: 'Bubble sort appears in live code rarely, but specialized variants exist. Cocktail Shaker Sort alternates the pass direction: left-to-right first (small elements at the right bubble up), then right-to-left (large elements sink down faster). This significantly speeds up practical performance on random data while keeping O(n²) asymptotics. Example: if one small "turtle" sits at the right end, regular bubble sort spends n-1 passes moving it left. Cocktail sort moves it leftward faster on backward passes. In JavaScript engine kernels (V8, SpiderMonkey) and old Java versions before 2011, optimized in-place cocktail sorts were used for small arrays (typically under 10 elements) before switching to fast algorithms like Insertion Sort or Quicksort. Today its place is only in programming contests and education.',
    },
  },

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
        ru: 'Подумай, что происходит с элементом, когда он оказывается больше своего соседа при каждом сравнении - куда он «двигается»?',
        en: "Think about what happens to an element whenever it's bigger than its neighbor at each comparison - which direction does it keep moving?",
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
        ru: 'В худшем случае (массив отсортирован в обратном порядке) требуется полное количество проходов и сравнений - квадратичное от размера массива.',
        en: 'In the worst case (reverse-sorted array), the algorithm needs the full number of passes and comparisons - quadratic in the array size.',
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
        { ru: 'O(1) - сортировка происходит на месте', en: 'O(1) - it sorts in place' },
        { ru: 'O(n) - нужен второй массив', en: 'O(n) - a second array is needed' },
        { ru: 'O(log n) - как у merge sort', en: 'O(log n) - like merge sort' },
        { ru: 'O(n²) - по одной ячейке на каждое сравнение', en: 'O(n²) - one cell per comparison' },
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
        ru: 'Зачем нужен флаг `swapped` в реализации?',
        en: 'Why does the implementation track a `swapped` flag?',
      },
      options: [
        { ru: 'Досрочно завершить сортировку, если массив уже упорядочен', en: 'To exit early once the array is already sorted' },
        { ru: 'Чтобы посчитать общее количество инверсий за все проходы', en: 'To count the total number of inversions across all passes' },
        { ru: 'Чтобы гарантировать устойчивость сортировки между проходами', en: 'To guarantee sort stability between passes' },
        { ru: 'Он ни на что не влияет и оставлен по ошибке', en: 'It has no effect and was left in by mistake' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если за целый проход не было перестановок, значит массив уже отсортирован - алгоритм может выйти из цикла раньше, доводя лучший случай до O(n).',
        en: 'If a full pass makes no swaps, the array is already sorted - the algorithm can break out early, bringing the best case down to O(n).',
      },
      hint: {
        ru: 'Что означает отсутствие перестановок за целый проход с точки зрения порядка массива?',
        en: "What does zero swaps during an entire pass tell you about the array's order?",
      },
    },
    {
      question: {
        ru: 'Почему пузырьковая сортировка является устойчивой (stable)?',
        en: 'Why is bubble sort stable?',
      },
      options: [
        { ru: 'Условие обмена - строго больше (>): равные элементы никогда не меняются местами', en: 'Strictly greater than (>): equal adjacent elements are never swapped' },
        { ru: 'Она всегда делает чётное число перестановок, что сохраняет относительный порядок', en: 'It always makes an even number of swaps, which preserves relative order' },
        { ru: 'Она сравнивает элементы одновременно по значению и по исходному индексу', en: 'It compares elements by both value and original index simultaneously' },
        { ru: 'Она переносит равные элементы в начало массива перед основной сортировкой', en: 'It moves equal elements to the front of the array before the main sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм меняет местами соседей только если a[j] > a[j+1] (строгое неравенство). При a[j] === a[j+1] обмена не происходит, поэтому относительный порядок равных элементов всегда сохраняется.',
        en: 'The algorithm swaps neighbors only when a[j] > a[j+1] (strict inequality). When a[j] === a[j+1] no swap occurs, so the relative order of equal elements is always preserved.',
      },
      hint: {
        ru: 'Посмотри на условие обмена в реализации - что происходит, когда два соседних элемента равны по значению?',
        en: 'Look at the swap condition in the implementation - what happens when two neighboring elements are equal in value?',
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
        ru: 'В каком случае пузырьковая сортировка с флагом `swapped` вынуждена делать ровно n−1 проходов, несмотря на то что почти все элементы уже стоят на правильных местах?',
        en: "When is bubble sort with the `swapped` flag forced to make exactly n−1 passes, even though almost every element is already in its correct position?",
      },
      options: [
        { ru: 'Когда наименьший элемент стоит в самом конце массива («черепаха»)', en: "When the smallest element is at the very end of the array ('turtle')" },
        { ru: 'Когда наибольший элемент стоит в самом начале массива («кролик»)', en: "When the largest element is at the very start of the array ('rabbit')" },
        { ru: 'Когда в массиве есть ровно одна инверсия - два соседних элемента стоят не в том порядке', en: 'When the array has exactly one inversion - two adjacent elements are out of order' },
        { ru: 'Когда все элементы одинаковы по значению', en: 'When all elements have the same value' },
      ],
      correct: 0,
      explanation: {
        ru: 'Пузырьковая сортировка сдвигает элементы влево не более чем на одну позицию за проход. Маленький элемент («черепаха») у правого конца вынуждает хотя бы одну перестановку на каждом из n−1 проходов - флаг `swapped` каждый раз становится `true`, ранний выход не срабатывает, хотя остальные элементы уже давно на своих местах.',
        en: "Bubble sort can shift an element leftward by at most one position per pass. A small 'turtle' near the right end forces at least one swap on each of the n−1 passes - the `swapped` flag is set to `true` every time, so early exit never triggers, even though all other elements are long since in place.",
      },
      hint: {
        ru: 'Подумай, насколько быстро элемент может переместиться к началу массива за один проход пузырьковой сортировки.',
        en: 'Think about how far left an element can travel in a single bubble sort pass.',
      },
    },
    {
      question: {
        ru: 'Чем отличается число перестановок (swaps) у пузырьковой сортировки от сортировки выбором в худшем случае?',
        en: 'How does the number of swaps in bubble sort compare to selection sort in the worst case?',
      },
      options: [
        {
          ru: 'Пузырьковая делает до O(n²) перестановок, сортировка выбором - не больше O(n)',
          en: 'Bubble sort makes up to O(n²) swaps, selection sort makes at most O(n)',
        },
        { ru: 'Обе делают одинаковое число перестановок независимо от размера и порядка входа', en: 'Both make the exact same number of swaps regardless of the input size or order' },
        { ru: 'Пузырьковая делает меньше перестановок за проход, чем сортировка выбором', en: 'Bubble sort makes fewer swaps per pass than selection sort does' },
        { ru: 'Сортировка выбором делает больше перестановок в сумме, чем пузырьковая', en: 'Selection sort makes more swaps in total than bubble sort does' },
      ],
      correct: 0,
      explanation: {
        ru: 'Пузырьковая сортировка меняет местами любую соседнюю пару, стоящую в неправильном порядке, - таких перестановок может быть до O(n²). Сортировка выбором делает не более одной перестановки за проход - всего до n перестановок, что важно для дорогих операций записи (например, во флеш-память).',
        en: "Bubble sort swaps any adjacent out-of-order pair - up to O(n²) swaps total. Selection sort does at most one swap per pass - up to n swaps total, which matters when writes are expensive (e.g. flash memory).",
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
          ru: 'Чередует проходы вперёд и назад, быстрее поднимая малые элементы к началу',
          en: 'It alternates forward and backward passes, lifting small elements near the end faster',
        },
        { ru: 'Она использует дополнительный массив для хранения промежуточных копий элементов', en: 'It uses an extra array to hold intermediate copies of the elements' },
        { ru: 'Она параллелит все сравнения элементов одновременно на нескольких ядрах', en: 'It parallelizes all element comparisons at once across multiple cores' },
        { ru: 'Она снижает асимптотику худшего случая до O(n log n), как в сортировке слиянием', en: 'It lowers the worst-case asymptotic complexity all the way down to O(n log n), like merge sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'В обычной пузырьковой сортировке маленький элемент («черепаха»), застрявший у конца массива, продвигается только на одну позицию за проход. Шейкерная сортировка чередует направление прохода, поднимая такие элементы значительно быстрее - при той же асимптотике O(n²) в худшем случае.',
        en: "In plain bubble sort, a small element (a 'turtle') stuck near the end only moves one position per pass. Cocktail shaker sort alternates the pass direction, lifting such elements much faster - while keeping the same O(n²) worst case.",
      },
      hint: {
        ru: 'Представь маленький элемент в самом конце массива в обычной пузырьковой сортировке - сколько проходов ему нужно, чтобы добраться до начала?',
        en: 'Picture a small element sitting at the very end of the array in plain bubble sort - how many passes does it take to reach the front?',
      },
    },
  ],
};

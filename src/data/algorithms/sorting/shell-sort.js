export const shellSort = {
  slug: 'shell-sort',
  category: 'sorting',
  name: { ru: 'Shell Sort', en: 'Shell Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n^1.3)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Сортировка Шелла — это сортировка вставками, которая сначала сравнивает и переставляет далеко отстоящие друг от друга элементы, постепенно сокращая это расстояние (gap) до 1.',
    en: 'Shell sort is insertion sort that first compares and swaps elements far apart from each other, gradually shrinking that gap down to 1.',
  },

  problem: {
    ru: 'Сортировка вставками эффективна на почти отсортированных данных, но медленна, когда маленький элемент находится далеко от своего места — его приходится сдвигать через все промежуточные позиции по одной. На случайном массиве это создаёт много «мелких шагов» там, где нужен один большой прыжок.',
    en: 'Insertion sort is efficient on nearly sorted data, but slow when a small element is far from its final position — it has to be shifted through every intermediate slot one at a time. On a random array, this creates many "small steps" where one big jump would do.',
  },

  solution: {
    ru: 'Алгоритм задаёт последовательность убывающих промежутков (gap), например n/2, n/4, ..., 1. На каждом шаге он выполняет сортировку вставками, но сравнивает не соседние элементы, а элементы, отстоящие друг от друга на текущий gap — это позволяет далёким элементам быстро «перепрыгнуть» на нужную сторону массива. Когда gap становится равным 1, выполняется обычная сортировка вставками, но к этому моменту массив уже почти упорядочен, поэтому она проходит быстро.',
    en: 'The algorithm defines a decreasing sequence of gaps, e.g. n/2, n/4, ..., 1. At each step it runs insertion sort, but compares elements that are `gap` positions apart instead of adjacent ones — letting far-away elements quickly "jump" to the right side of the array. When the gap reaches 1, a plain insertion sort runs, but by then the array is already nearly sorted, so it finishes fast.',
  },

  steps: [
    {
      title: { ru: 'Выбрать начальный gap', en: 'Pick the initial gap' },
      explanation: {
        ru: 'Взять gap равным половине длины массива (или другую убывающую последовательность).',
        en: 'Set the gap to half the array length (or another decreasing sequence).',
      },
    },
    {
      title: { ru: 'Сортировка вставками с шагом gap', en: 'Gapped insertion sort' },
      explanation: {
        ru: 'Для каждого элемента, начиная с позиции gap, сравнить его с элементом на gap позиций левее и сдвигать, пока порядок не восстановится.',
        en: 'For each element starting at index gap, compare it with the element gap positions to the left and shift until order is restored.',
      },
    },
    {
      title: { ru: 'Уменьшить gap', en: 'Shrink the gap' },
      explanation: {
        ru: 'Разделить gap пополам (или по формуле выбранной последовательности) и повторить проход.',
        en: 'Halve the gap (or follow the chosen sequence) and repeat the pass.',
      },
    },
    {
      title: { ru: 'Повторять до gap = 1', en: 'Repeat until gap = 1' },
      explanation: {
        ru: 'Продолжать уменьшать gap и сортировать, пока он не станет равным единице.',
        en: 'Keep shrinking the gap and sorting until it equals one.',
      },
    },
    {
      title: { ru: 'Финальный проход', en: 'Final pass' },
      explanation: {
        ru: 'При gap = 1 выполняется обычная сортировка вставками — но данные уже почти упорядочены, поэтому сдвигов немного.',
        en: 'At gap = 1, a plain insertion sort runs — but the data is already nearly sorted, so few shifts are needed.',
      },
    },
  ],

  implementation: {
    javascript: `function shellSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const current = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > current) {
        a[j] = a[j - gap];
        j -= gap;
      }
      a[j] = current;
    }
  }
  return a;
}`,
    python: `def shell_sort(arr):
    a = arr.copy()
    n = len(a)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            current = a[i]
            j = i
            while j >= gap and a[j - gap] > current:
                a[j] = a[j - gap]
                j -= gap
            a[j] = current
        gap //= 2
    return a`,
  },

  pros: [
    {
      ru: 'Заметно быстрее простой сортировки вставками на средних по размеру массивах, оставаясь простым в реализации.',
      en: 'Noticeably faster than plain insertion sort on medium-sized arrays, while staying simple to implement.',
    },
    {
      ru: 'Сортирует на месте — требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place — needs only O(1) extra memory.',
    },
    {
      ru: 'Не требует рекурсии и дополнительных структур данных, в отличие от merge sort.',
      en: 'Needs no recursion or extra data structures, unlike merge sort.',
    },
  ],
  cons: [
    {
      ru: 'Неустойчив: равные элементы могут поменять относительный порядок из-за сравнений «через gap».',
      en: 'Unstable: equal elements can change relative order because of the gapped comparisons.',
    },
    {
      ru: 'Точная временная сложность зависит от выбранной последовательности gap и математически анализируется сложно.',
      en: 'The exact time complexity depends on the chosen gap sequence and is mathematically hard to analyze.',
    },
    {
      ru: 'Всё ещё уступает O(n log n) алгоритмам вроде merge sort и quicksort на больших массивах.',
      en: 'Still loses to O(n log n) algorithms like merge sort and quicksort on large arrays.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда нужна сортировка на месте лучше, чем O(n²), но без накладных расходов на рекурсию или дополнительную память merge sort.',
      en: 'When you need in-place sorting better than O(n²) but without merge sort\'s recursion or extra-memory overhead.',
    },
    {
      ru: 'Для встроенных систем и библиотек, где важна простота кода при разумной производительности на средних объёмах данных.',
      en: 'For embedded systems and libraries where code simplicity matters alongside reasonable performance on medium-sized data.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**uClibc** (стандартная библиотека C для встраиваемых систем) использует сортировку Шелла для `qsort()` из-за её компактного кода и хорошей производительности без рекурсии.',
      en: '**uClibc** (a C standard library for embedded systems) uses Shell sort for `qsort()` because of its compact code and good performance without recursion.',
    },
    {
      ru: '**Ранние версии Linux kernel** применяли сортировку Шелла в некоторых внутренних утилитах, где нужна была простая сортировка на месте без выделения памяти.',
      en: '**Early Linux kernel** versions used Shell sort in some internal utilities that needed a simple in-place sort without memory allocation.',
    },
  ],

  relatedAlgorithms: ['insertion-sort', 'comb-sort'],

  quiz: [
    {
      question: {
        ru: 'Что делает сортировку Шелла быстрее обычной сортировки вставками?',
        en: 'What makes Shell sort faster than plain insertion sort?',
      },
      options: [
        { ru: 'Сравнение элементов на расстоянии gap друг от друга вместо соседних', en: 'Comparing elements gap positions apart instead of adjacent ones' },
        { ru: 'Использование дополнительного массива такого же размера для слияния отсортированных половин', en: 'Using an extra array the same size as the input for merging sorted halves' },
        { ru: 'Рекурсивное разбиение массива пополам до тех пор, пока не останутся единичные элементы', en: 'Recursively splitting the array in half until only single elements remain' },
        { ru: 'Подсчёт количества вхождений каждого отдельного значения во всём массиве', en: 'Counting the number of occurrences of each individual value across the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сравнения «через gap» позволяют далёким друг от друга элементам быстро переместиться на большое расстояние за один шаг, а не через множество мелких сдвигов.',
        en: 'Gapped comparisons let far-apart elements move a long distance in one step instead of many small shifts.',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда gap становится равным 1?',
        en: 'What happens when the gap becomes 1?',
      },
      options: [
        { ru: 'Выполняется обычная сортировка вставками по почти упорядоченному массиву', en: 'A plain insertion sort runs over an already nearly sorted array' },
        { ru: 'Алгоритм полностью завершается, вообще пропуская последний финальный проход', en: 'The algorithm finishes entirely, completely skipping the very last final pass' },
        { ru: 'Оставшийся массив досортировывается путём слияния двух его отсортированных половин', en: 'The remaining array gets sorted by merging its two already-sorted halves together' },
        { ru: 'Начинается отдельный подсчёт частот встречаемости каждого элемента массива', en: 'A separate count of each array element\'s frequency of occurrence begins' },
      ],
      correct: 0,
      explanation: {
        ru: 'При gap = 1 алгоритм превращается в обычную сортировку вставками, но благодаря предыдущим проходам данные уже почти упорядочены, поэтому сдвигов немного.',
        en: 'At gap = 1 the algorithm is plain insertion sort, but thanks to earlier passes the data is already nearly sorted, so few shifts remain.',
      },
    },
    {
      question: {
        ru: 'Является ли сортировка Шелла устойчивой (stable)?',
        en: 'Is Shell sort stable?',
      },
      options: [
        { ru: 'Нет — сравнения через gap могут поменять порядок равных элементов', en: 'No — gapped comparisons can change the order of equal elements' },
        { ru: 'Да — она устойчива точно так же, как и обычная сортировка вставками', en: 'Yes — it\'s stable in exactly the same way plain insertion sort is' },
        { ru: 'Зависит от конкретного размера сортируемого входного массива', en: 'It depends on the specific size of the input array being sorted' },
        { ru: 'Устойчивость к сортировкам на месте неприменима', en: 'Stability doesn\'t apply to in-place sorts' },
      ],
      correct: 0,
      explanation: {
        ru: 'Элемент может «перепрыгнуть» через равный себе элемент, стоящий между позициями i и i-gap, поэтому относительный порядок равных элементов не гарантирован.',
        en: 'An element can jump over an equal element sitting between positions i and i-gap, so equal elements\' relative order isn\'t guaranteed.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует сортировка Шелла?',
        en: 'How much extra memory does Shell sort need?',
      },
      options: [
        { ru: 'O(1) — сортировка происходит на месте', en: 'O(1) — it sorts in place' },
        { ru: 'O(n) — как merge sort', en: 'O(n) — like merge sort' },
        { ru: 'O(log n) — на стек рекурсии', en: 'O(log n) — for the recursion stack' },
        { ru: 'O(n log n) — на хранение всех gap-последовательностей', en: 'O(n log n) — to store all gap sequences' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и обычная сортировка вставками, алгоритм переставляет элементы прямо в исходном массиве.',
        en: 'Like plain insertion sort, the algorithm rearranges elements directly in the original array.',
      },
    },
    {
      question: {
        ru: 'Почему точный анализ временной сложности сортировки Шелла сложен?',
        en: 'Why is the exact time complexity analysis of Shell sort difficult?',
      },
      options: [
        { ru: 'Она сильно зависит от выбранной последовательности значений gap', en: 'It depends heavily on the chosen gap sequence' },
        { ru: 'Алгоритм использует случайный выбор опорного элемента', en: 'The algorithm uses a random pivot choice' },
        { ru: 'Сложность меняется в зависимости от языка реализации', en: 'Complexity changes depending on the implementation language' },
        { ru: 'Она никогда не была измерена эмпирически', en: 'It has never been measured empirically' },
      ],
      correct: 0,
      explanation: {
        ru: 'Разные последовательности gap (Шелла, Кнута, Седжвика и другие) дают разные гарантии сложности — от O(n²) до O(n^1.3) и лучше, поэтому единой формулы для «сортировки Шелла вообще» не существует.',
        en: 'Different gap sequences (Shell\'s, Knuth\'s, Sedgewick\'s, and others) give different complexity guarantees — from O(n²) to O(n^1.3) and better — so there is no single formula for "Shell sort in general."',
      },
    },
  ],
};

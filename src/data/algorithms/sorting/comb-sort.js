export const combSort = {
  slug: 'comb-sort',
  category: 'sorting',
  name: { ru: 'Comb Sort', en: 'Comb Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n² / 2^p)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Сортировка расчёской — это улучшение пузырьковой сортировки: она сравнивает элементы, отстоящие друг от друга на убывающий промежуток (gap), а не только соседей, что устраняет главную слабость bubble sort — маленькие элементы («черепахи»), застревающие в конце.',
    en: 'Comb sort is an improvement on bubble sort: it compares elements a shrinking gap apart instead of only neighbors, removing bubble sort\'s main weakness — small elements ("turtles") stuck near the end.',
  },

  problem: {
    ru: 'В обычной пузырьковой сортировке маленький элемент в конце массива продвигается к своей позиции только на один шаг за проход, что делает алгоритм катастрофически медленным именно на таких «неудобных» входных данных, даже если основная часть массива уже отсортирована.',
    en: 'In plain bubble sort, a small element near the end of the array only advances one position per pass toward its final spot, making the algorithm catastrophically slow on exactly these "awkward" inputs, even when most of the array is already sorted.',
  },

  solution: {
    ru: 'Алгоритм начинает с промежутка (gap), примерно равного длине массива, и сравнивает элементы, отстоящие друг от друга на этот gap, меняя их местами при необходимости. После каждого прохода gap уменьшается делением на фиксированный коэффициент (обычно 1.3). Когда gap становится равным 1, алгоритм превращается в обычный bubble sort, но к этому моменту большинство «черепах» уже переставлены на большое расстояние за один шаг, поэтому финальные проходы короткие.',
    en: 'The algorithm starts with a gap roughly equal to the array length and compares elements that far apart, swapping when needed. After each pass, the gap shrinks by dividing by a fixed shrink factor (typically 1.3). When the gap reaches 1, the algorithm becomes plain bubble sort, but by then most "turtles" have already jumped a long distance in a single step, so the final passes are short.',
  },

  steps: [
    {
      title: { ru: 'Выбрать начальный gap', en: 'Pick the initial gap' },
      explanation: {
        ru: 'Взять gap равным длине массива.',
        en: 'Set the gap to the length of the array.',
      },
    },
    {
      title: { ru: 'Уменьшить gap', en: 'Shrink the gap' },
      explanation: {
        ru: 'Разделить текущий gap на коэффициент сжатия (обычно 1.3) и округлить вниз, но не меньше 1.',
        en: 'Divide the current gap by the shrink factor (typically 1.3) and round down, but never below 1.',
      },
    },
    {
      title: { ru: 'Сравнить элементы через gap', en: 'Compare elements gap apart' },
      explanation: {
        ru: 'Пройти по массиву, сравнивая пары элементов, отстоящих друг от друга на gap, и меняя их местами, если левый больше правого.',
        en: 'Walk the array, comparing pairs of elements gap positions apart, swapping when the left one is greater.',
      },
    },
    {
      title: { ru: 'Отследить перестановки', en: 'Track swaps' },
      explanation: {
        ru: 'Запомнить, была ли хотя бы одна перестановка на этом проходе.',
        en: 'Remember whether at least one swap happened on this pass.',
      },
    },
    {
      title: { ru: 'Остановиться', en: 'Stop' },
      explanation: {
        ru: 'Когда gap равен 1 и на проходе не было перестановок, массив отсортирован.',
        en: 'When the gap is 1 and a pass makes no swaps, the array is sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function combSort(arr) {
  const a = [...arr];
  let gap = a.length;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    for (let i = 0; i + gap < a.length; i++) {
      if (a[i] > a[i + gap]) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        sorted = false;
      }
    }
  }
  return a;
}`,
    python: `def comb_sort(arr):
    a = arr.copy()
    gap = len(a)
    shrink = 1.3
    sorted_ = False

    while not sorted_:
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted_ = True
        for i in range(len(a) - gap):
            if a[i] > a[i + gap]:
                a[i], a[i + gap] = a[i + gap], a[i]
                sorted_ = False
    return a`,
  },

  pros: [
    {
      ru: 'Устраняет проблему «черепах» пузырьковой сортировки, давая заметный прирост производительности при почти такой же простоте реализации.',
      en: 'Fixes bubble sort\'s "turtle" problem, giving a noticeable speed-up while staying almost as simple to implement.',
    },
    {
      ru: 'Сортирует на месте — требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place — needs only O(1) extra memory.',
    },
    {
      ru: 'На практике часто быстрее сортировки Шелла на случайных данных при том же уровне простоты кода.',
      en: 'In practice often faster than Shell sort on random data at the same level of code simplicity.',
    },
  ],
  cons: [
    {
      ru: 'Неустойчив: сравнения через gap могут поменять относительный порядок равных элементов.',
      en: 'Unstable: gapped comparisons can change the relative order of equal elements.',
    },
    {
      ru: 'В худшем случае всё ещё O(n²), как и у обычного bubble sort.',
      en: 'Worst case is still O(n²), same as plain bubble sort.',
    },
    {
      ru: 'Коэффициент сжатия 1.3 подобран эмпирически — нет строгого теоретического обоснования, почему именно это значение оптимально.',
      en: 'The 1.3 shrink factor is empirically chosen — there\'s no rigorous theoretical proof that this exact value is optimal.',
    },
  ],

  whenToUse: [
    {
      ru: 'Как быстрая замена пузырьковой сортировке, когда простота кода важнее гарантированной сложности O(n log n).',
      en: 'As a fast drop-in replacement for bubble sort, when code simplicity matters more than a guaranteed O(n log n) bound.',
    },
    {
      ru: 'Для обучения идее «сжимающегося gap» перед переходом к сортировке Шелла, которая использует тот же принцип для вставок.',
      en: 'To teach the "shrinking gap" idea before moving to Shell sort, which applies the same principle to insertions.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Игровые движки и небольшие утилиты**, где нужно быстро улучшить существующую реализацию bubble sort без переписывания на другой алгоритм с нуля.',
      en: '**Game engines and small utilities**, where an existing bubble sort implementation needs a quick speed-up without rewriting it as a different algorithm from scratch.',
    },
    {
      ru: '**Учебные материалы по оптимизации алгоритмов** — классический пример того, как небольшое изменение (gap вместо соседей) убирает конкретный класс худших случаев.',
      en: '**Algorithm-optimization teaching material** — a classic example of how one small change (gap instead of neighbors) removes a specific class of worst cases.',
    },
  ],

  relatedAlgorithms: ['bubble-sort', 'shell-sort'],

  quiz: [
    {
      question: {
        ru: 'Какую слабость пузырьковой сортировки устраняет сортировка расчёской?',
        en: 'What bubble sort weakness does comb sort fix?',
      },
      options: [
        { ru: '«Черепах» — маленькие элементы, застревающие в конце массива', en: '"Turtles" — small elements getting stuck near the end of the array' },
        { ru: 'Избыточное использование памяти, как в сортировке слиянием', en: 'Excessive memory usage, similar to what merge sort requires' },
        { ru: 'Отсутствие поддержки отрицательных чисел без дополнительной обработки знака', en: 'Lack of support for negative numbers without extra sign handling' },
        { ru: 'Невозможность сортировки строк без предварительного преобразования в числа', en: 'Inability to sort strings without first converting them to numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сравнения через большой gap позволяют маленькому элементу в конце массива быстро переместиться на много позиций влево за один шаг.',
        en: 'Large-gap comparisons let a small element near the end of the array jump many positions left in a single step.',
      },
    },
    {
      question: {
        ru: 'Как изменяется gap между проходами в сортировке расчёской?',
        en: 'How does the gap change between passes in comb sort?',
      },
      options: [
        { ru: 'Делится на коэффициент сжатия (обычно 1.3)', en: 'Divided by a shrink factor (typically 1.3)' },
        { ru: 'Увеличивается вдвое каждый проход, как в бинарном поиске', en: 'Doubles every pass, similar to how binary search halves its range' },
        { ru: 'Остаётся фиксированным весь алгоритм, как размер блока в блочной сортировке', en: 'Stays fixed for the whole algorithm, like the block size in block sort' },
        { ru: 'Устанавливается случайно на каждом проходе для избежания худшего случая', en: 'Is set randomly on each pass to avoid worst-case inputs' },
      ],
      correct: 0,
      explanation: {
        ru: 'Уменьшение gap делением на ~1.3 — эмпирически найденное значение, дающее хороший баланс между скоростью схождения к gap=1 и качеством перемешивания.',
        en: 'Shrinking the gap by dividing by ~1.3 is an empirically found value giving a good balance between converging to gap=1 quickly and mixing elements well.',
      },
    },
    {
      question: {
        ru: 'Во что превращается сортировка расчёской, когда gap достигает 1?',
        en: 'What does comb sort become once the gap reaches 1?',
      },
      options: [
        { ru: 'В обычную пузырьковую сортировку', en: 'Plain bubble sort' },
        { ru: 'В сортировку вставками', en: 'Insertion sort' },
        { ru: 'В сортировку слиянием', en: 'Merge sort' },
        { ru: 'Алгоритм останавливается без финального прохода', en: 'The algorithm stops without a final pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'При gap = 1 сравниваются только соседние элементы — это в точности определение bubble sort, но выполняется оно на уже почти упорядоченном массиве.',
        en: 'At gap = 1, only adjacent elements are compared — that\'s exactly bubble sort, but it runs on an already nearly sorted array.',
      },
    },
    {
      question: {
        ru: 'Является ли сортировка расчёской устойчивой (stable)?',
        en: 'Is comb sort stable?',
      },
      options: [
        { ru: 'Нет — перестановки через gap могут изменить порядок равных элементов', en: 'No — gapped swaps can change the order of equal elements' },
        { ru: 'Да, как обычный bubble sort, ведь оба используют только обмены соседей', en: 'Yes, same as plain bubble sort, since both only ever swap adjacent-looking pairs' },
        { ru: 'Только при чётном значении gap, из-за симметрии сравнений', en: 'Only when the gap is even, due to the symmetry of the comparisons' },
        { ru: 'Только на финальном проходе с gap=1, когда сравниваются соседи', en: 'Only during the final gap=1 pass, when neighbors are compared' },
      ],
      correct: 0,
      explanation: {
        ru: 'Элемент может перепрыгнуть через равный себе элемент, стоящий между позициями i и i+gap, поэтому их относительный порядок не гарантирован.',
        en: 'An element can jump over an equal element sitting between positions i and i+gap, so their relative order isn\'t guaranteed.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность сортировки расчёской в худшем случае?',
        en: 'What is the worst-case time complexity of comb sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Хотя на практике сортировка расчёской обычно намного быстрее bubble sort, для определённых патологических входов её худший случай остаётся квадратичным.',
        en: 'While in practice comb sort is usually much faster than bubble sort, for certain pathological inputs its worst case remains quadratic.',
      },
    },
  ],
};

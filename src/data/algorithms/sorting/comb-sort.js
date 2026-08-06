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
  stepBreakpoints: [2, 16, 30, 41],

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
      hint: {
        ru: 'Подумайте, что происходит с маленькими элементами в хвосте массива при стандартном bubble sort и почему это медленно.',
        en: 'Think about what happens to small elements at the tail of the array in standard bubble sort and why that is slow.',
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
      hint: {
        ru: 'Алгоритм должен начать с большого промежутка и постепенно прийти к сравнению соседей. В каком направлении gap должен двигаться?',
        en: 'The algorithm must start with a large gap and gradually arrive at comparing neighbors. Which direction must the gap move?',
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
      hint: {
        ru: 'Когда gap равен 1, какое расстояние между сравниваемыми элементами? Какой алгоритм сравнивает исключительно соседей?',
        en: 'When the gap is 1, what is the distance between compared elements? Which algorithm exclusively compares neighbors?',
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
      hint: {
        ru: 'Представьте два равных элемента, между которыми стоят другие элементы. Может ли обмен через gap изменить их взаимный порядок?',
        en: 'Picture two equal elements with other elements between them. Can a gapped swap alter their relative order?',
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
      hint: {
        ru: 'Сортировка расчёской основана на bubble sort. Удалось ли ей избавиться от квадратичного худшего случая или только улучшить средний?',
        en: 'Comb sort builds on bubble sort. Did it escape the quadratic worst case, or only improve the average case?',
      },
    },
    {
      question: {
        ru: 'Почему начальный gap выбирается примерно равным длине массива?',
        en: 'Why is the initial gap chosen to be roughly equal to the array length?',
      },
      options: [
        { ru: 'Перемещать элементы с первого прохода на максимально большое расстояние', en: 'To move elements the largest possible distance right from the first pass' },
        { ru: 'Чтобы сразу сравнивать только соседей и не делать лишних итераций', en: 'To compare only neighbors immediately and skip extra iterations' },
        { ru: 'Потому что меньший начальный gap гарантированно приводит к O(n log n) сложности', en: 'Because a smaller initial gap guarantees O(n log n) complexity' },
        { ru: 'Из-за ограничений на размер стека при рекурсивных вызовах функции', en: 'Due to call-stack size constraints when the function is called recursively' },
      ],
      correct: 0,
      explanation: {
        ru: 'Большой начальный gap позволяет элементам сразу прыгать через весь массив, что устраняет «черепах» быстрее всего.',
        en: 'A large initial gap lets elements jump across the whole array immediately, which eliminates "turtles" as fast as possible.',
      },
      hint: {
        ru: 'Вспомните, зачем вообще нужен gap. Чем он больше, тем дальше может прыгнуть элемент за один проход.',
        en: 'Recall why the gap exists at all. The larger it is, the farther an element can jump in one pass.',
      },
    },
    {
      question: {
        ru: 'Как сортировка расчёской соотносится с сортировкой Шелла?',
        en: 'How does comb sort relate to Shell sort?',
      },
      options: [
        { ru: 'Оба применяют убывающий gap: comb sort обменивает соседей, Shell sort вставляет', en: 'Both use a shrinking gap, but comb sort applies it to swaps (like bubble), while Shell sort applies it to insertions' },
        { ru: 'Это один и тот же алгоритм с разными названиями и идентичной реализацией', en: 'They are the same algorithm with different names and an identical implementation' },
        { ru: 'Shell sort является частным случаем comb sort только при коэффициенте сжатия ровно 2.0', en: 'Shell sort is a special case of comb sort only when the shrink factor is exactly 2.0 regardless of input size or order' },
        { ru: 'Comb sort всегда медленнее Shell sort на любых возможных входных данных', en: 'Comb sort is always slower than Shell sort on any possible input data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка Шелла уменьшает gap для сортировки вставками, тогда как сортировка расчёской уменьшает gap для пузырьковой сортировки — общая идея та же, базовый примитив разный.',
        en: 'Shell sort shrinks the gap for insertion sort, while comb sort shrinks it for bubble sort — the overarching idea is the same, but the underlying primitive differs.',
      },
      hint: {
        ru: 'Оба алгоритма применяют идею «сравнивать через убывающий gap». Чем отличается то, что происходит при каждом сравнении?',
        en: 'Both algorithms apply the "compare across a shrinking gap" idea. What differs in what happens at each comparison?',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если не ограничивать gap снизу значением 1?',
        en: 'What happens if the gap is not clamped to a minimum of 1?',
      },
      options: [
        { ru: 'Gap может стать нулём или меньше, вызвав ошибку при обращении к элементам', en: 'The gap can reach zero or below, causing an error when accessing array elements' },
        { ru: 'Алгоритм станет быстрее, так как пропустит неэффективный финальный проход при gap=1', en: 'The algorithm becomes faster by skipping the inefficient final pass at gap=1 always' },
        { ru: 'Gap автоматически обнуляется языком программирования при делении на 1.3', en: 'The gap is automatically zeroed out by the language when divided by 1.3' },
        { ru: 'Сортировка станет устойчивой, так как перестанет совершать сравнения через промежуток', en: 'The sort becomes stable since it stops making gapped comparisons altogether' },
      ],
      correct: 0,
      explanation: {
        ru: 'При gap = 0 индексы i и i+gap совпадают, а при gap < 0 доступ выходит за границы массива.',
        en: 'At gap = 0, indices i and i+gap coincide; at gap < 0, the access goes out of array bounds.',
      },
      hint: {
        ru: 'Подумайте, что означает gap = 0: какие два элемента будут сравниваться в каждой итерации внутреннего цикла?',
        en: 'Think about what gap = 0 means: which two elements would be compared on each iteration of the inner loop?',
      },
    },
    {
      question: {
        ru: 'Почему алгоритм продолжает работу даже после того, как gap достиг 1 и прошёл один проход без перестановок?',
        en: 'Why does the algorithm stop only after gap equals 1 AND a pass makes no swaps?',
      },
      options: [
        { ru: 'Gap=1 не гарантирует результат — нужно убедиться, что при gap=1 больше нечего менять', en: 'Because gap=1 alone does not guarantee sorted order — it must be confirmed that nothing needs swapping at gap=1' },
        { ru: 'Потому что каждый проход с gap=1 сортирует ровно один дополнительный элемент на своём месте', en: 'Because each gap=1 pass puts exactly one additional element into its correct place regardless of input size or order' },
        { ru: 'Из-за ограничений языка: цикл должен выполниться хотя бы один раз при gap=1', en: 'Due to a language constraint: the loop must execute at least once at gap=1' },
        { ru: 'Потому что массив всегда полностью отсортирован уже после первого прохода с gap=1', en: 'Because the array is always fully sorted after the very first gap=1 pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Gap=1 означает, что следующий проход будет по соседям, но сам массив может ещё быть неупорядочен — только отсутствие перестановок при gap=1 служит доказательством сортировки.',
        en: 'Gap=1 means the next pass will compare neighbors, but the array may still be disordered — only a swap-free pass at gap=1 proves the array is sorted.',
      },
      hint: {
        ru: 'Что именно доказывает, что массив отсортирован: сам факт gap=1 или то, что при gap=1 ничего не пришлось менять?',
        en: 'What actually proves the array is sorted: the fact of gap=1, or the fact that nothing needed swapping at gap=1?',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность сортировки расчёской?',
        en: 'What is the space complexity of comb sort?',
      },
      options: [
        { ru: 'O(1) — требуется лишь несколько переменных для gap и флага', en: 'O(1) — only a few variables for the gap and a flag are needed' },
        { ru: 'O(n) — для хранения вспомогательной копии массива при перестановках', en: 'O(n) — to store an auxiliary array copy during the permutation phase' },
        { ru: 'O(log n) — из-за стека вызовов при рекурсивном уменьшении gap', en: 'O(log n) — due to the call stack when gap is reduced recursively' },
        { ru: 'O(n log n) — из-за числа проходов, умноженного на размер массива', en: 'O(n log n) — because the number of passes multiplied by array size' },
      ],
      correct: 0,
      explanation: {
        ru: 'Comb sort работает прямо в исходном массиве, используя лишь переменные gap, sorted и временную переменную для обмена.',
        en: 'Comb sort works directly on the input array, using only the gap, sorted flag, and a temporary swap variable.',
      },
      hint: {
        ru: 'Нужен ли алгоритму дополнительный массив или он переставляет элементы внутри исходного?',
        en: 'Does the algorithm need an extra array, or does it permute elements within the original?',
      },
    },
  ],
};

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
    ru: 'Сортировка Шелла - это сортировка вставками, которая сначала сравнивает и переставляет далеко отстоящие друг от друга элементы, постепенно сокращая это расстояние (gap) до 1.',
    en: 'Shell sort is insertion sort that first compares and swaps elements far apart from each other, gradually shrinking that gap down to 1.',
  },

  problem: {
    ru: 'Сортировка вставками эффективна на почти отсортированных данных, но медленна, когда маленький элемент находится далеко от своего места - его приходится сдвигать через все промежуточные позиции по одной. На случайном массиве это создаёт много «мелких шагов» там, где нужен один большой прыжок.',
    en: 'Insertion sort is efficient on nearly sorted data, but slow when a small element is far from its final position - it has to be shifted through every intermediate slot one at a time. On a random array, this creates many "small steps" where one big jump would do.',
  },

  solution: {
    ru: 'Алгоритм задаёт последовательность убывающих промежутков (gap), например n/2, n/4, ..., 1. На каждом шаге он выполняет сортировку вставками, но сравнивает не соседние элементы, а элементы, отстоящие друг от друга на текущий gap - это позволяет далёким элементам быстро «перепрыгнуть» на нужную сторону массива. Когда gap становится равным 1, выполняется обычная сортировка вставками, но к этому моменту массив уже почти упорядочен, поэтому она проходит быстро.',
    en: 'The algorithm defines a decreasing sequence of gaps, e.g. n/2, n/4, ..., 1. At each step it runs insertion sort, but compares elements that are `gap` positions apart instead of adjacent ones - letting far-away elements quickly "jump" to the right side of the array. When the gap reaches 1, a plain insertion sort runs, but by then the array is already nearly sorted, so it finishes fast.',
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
        ru: 'При gap = 1 выполняется обычная сортировка вставками - но данные уже почти упорядочены, поэтому сдвигов немного.',
        en: 'At gap = 1, a plain insertion sort runs - but the data is already nearly sorted, so few shifts are needed.',
      },
    },
  ],
  stepBreakpoints: [2, 13, 24, 34],

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
      ru: 'Сортирует на месте - требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place - needs only O(1) extra memory.',
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
      hint: {
        ru: 'Главная слабость сортировки вставками - маленький элемент ползёт к началу массива по одной позиции. Как сортировка Шелла ускоряет это перемещение?',
        en: 'Insertion sort\'s main weakness is a small element crawling toward the start one position at a time. How does Shell sort speed that move up?',
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
      hint: {
        ru: 'Gap = 1 означает сравнение соседних элементов. Какой алгоритм делает именно это?',
        en: 'Gap = 1 means comparing adjacent elements. Which algorithm does exactly that?',
      },
    },
    {
      question: {
        ru: 'Является ли сортировка Шелла устойчивой (stable)?',
        en: 'Is Shell sort stable?',
      },
      options: [
        { ru: 'Нет - сравнения через gap могут поменять порядок равных элементов', en: 'No - gapped comparisons can change the order of equal elements' },
        { ru: 'Да - она устойчива точно так же, как и обычная сортировка вставками', en: 'Yes - it\'s stable in exactly the same way plain insertion sort is' },
        { ru: 'Зависит от конкретного размера сортируемого входного массива', en: 'It depends on the specific size of the input array being sorted' },
        { ru: 'Устойчивость к сортировкам на месте неприменима', en: 'Stability doesn\'t apply to in-place sorts' },
      ],
      correct: 0,
      explanation: {
        ru: 'Элемент может «перепрыгнуть» через равный себе элемент, стоящий между позициями i и i-gap, поэтому относительный порядок равных элементов не гарантирован.',
        en: 'An element can jump over an equal element sitting between positions i and i-gap, so equal elements\' relative order isn\'t guaranteed.',
      },
      hint: {
        ru: 'Когда элемент перепрыгивает через несколько позиций сразу, что может случиться с равными ему элементами, стоящими между старым и новым местом?',
        en: 'When an element jumps over several positions at once, what can happen to equal elements sitting between the old and new position?',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует сортировка Шелла?',
        en: 'How much extra memory does Shell sort need?',
      },
      options: [
        { ru: 'O(1) - сортировка происходит на месте', en: 'O(1) - it sorts in place' },
        { ru: 'O(n) - как merge sort', en: 'O(n) - like merge sort' },
        { ru: 'O(log n) - на стек рекурсии', en: 'O(log n) - for the recursion stack' },
        { ru: 'O(n log n) - на хранение всех gap-последовательностей', en: 'O(n log n) - to store all gap sequences' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и обычная сортировка вставками, алгоритм переставляет элементы прямо в исходном массиве.',
        en: 'Like plain insertion sort, the algorithm rearranges elements directly in the original array.',
      },
      hint: {
        ru: 'Создаёт ли алгоритм дополнительные массивы или использует рекурсию - или он работает непосредственно в исходном массиве?',
        en: 'Does the algorithm create extra arrays or use recursion - or does it work directly in the original array?',
      },
    },
    {
      question: {
        ru: 'Почему точный анализ временной сложности сортировки Шелла сложен?',
        en: 'Why is the exact time complexity analysis of Shell sort difficult?',
      },
      options: [
        { ru: 'Сильно зависит от выбранной последовательности gap', en: 'It depends heavily on the chosen gap sequence' },
        { ru: 'Алгоритм использует случайный выбор опорного элемента', en: 'The algorithm uses a random pivot choice' },
        { ru: 'Сложность меняется в зависимости от языка реализации', en: 'Complexity changes depending on the implementation language' },
        { ru: 'Она никогда не была измерена эмпирически', en: 'It has never been measured empirically' },
      ],
      correct: 0,
      explanation: {
        ru: 'Разные последовательности gap (Шелла, Кнута, Седжвика и другие) дают разные гарантии сложности - от O(n²) до O(n^1.3) и лучше, поэтому единой формулы для «сортировки Шелла вообще» не существует.',
        en: 'Different gap sequences (Shell\'s, Knuth\'s, Sedgewick\'s, and others) give different complexity guarantees - from O(n²) to O(n^1.3) and better - so there is no single formula for "Shell sort in general."',
      },
      hint: {
        ru: 'Какой единственный параметр алгоритма кардинально меняет его производительность и не зафиксирован стандартом?',
        en: 'Which single parameter of the algorithm drastically changes its performance and is not fixed by any standard?',
      },
    },
    {
      question: {
        ru: 'Что означает последовательность Кнута (1, 4, 13, 40, ...) в контексте сортировки Шелла?',
        en: 'What does Knuth\'s sequence (1, 4, 13, 40, ...) represent in the context of Shell sort?',
      },
      options: [
        { ru: 'Убывающая последовательность gap, дающая сложность O(n^1.5)', en: 'It is one of the possible decreasing gap sequences, giving O(n^1.5) complexity' },
        { ru: 'Это числа Фибоначчи, используемые для определения размера временного буфера', en: 'These are Fibonacci numbers used to determine the size of a temporary auxiliary buffer' },
        { ru: 'Это индексы элементов, которые нужно поменять местами на первом проходе', en: 'These are the indices of elements to be swapped during the first pass' },
        { ru: 'Это количество сравнений, выполняемых на каждом из проходов алгоритма', en: 'These are the comparison counts performed during each pass of the algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Последовательность Кнута h = 3h + 1 генерирует значения gap сверху вниз. При её использовании сортировка Шелла достигает сложности O(n^1.5) и значительно опережает простую последовательность n/2.',
        en: 'Knuth\'s sequence h = 3h + 1 generates gap values top-down. Using it, Shell sort achieves O(n^1.5) complexity and significantly outperforms the simple n/2 sequence.',
      },
      hint: {
        ru: 'Последовательность gap определяет расстояния между сравниваемыми элементами. Как формируется последовательность Кнута?',
        en: 'The gap sequence defines the distances between compared elements. How is Knuth\'s sequence generated?',
      },
    },
    {
      question: {
        ru: 'Почему сортировка Шелла предпочтительна перед merge sort во встроенных системах?',
        en: 'Why is Shell sort preferred over merge sort in embedded systems?',
      },
      options: [
        { ru: 'Сортирует на месте без рекурсии, не требуя дополнительной памяти', en: 'It sorts in place without recursion, requiring no extra memory allocation' },
        { ru: 'Она всегда быстрее merge sort на любых входных данных любого размера', en: 'It is always faster than merge sort on any input data of any size' },
        { ru: 'Она устойчива, что важно при сортировке структур с несколькими полями', en: 'It is stable, which matters when sorting structs with multiple fields always' },
        { ru: 'Она использует меньше сравнений, чем сортировка пузырьком, при любом gap', en: 'It uses fewer comparisons than bubble sort for any gap value at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Во встроенных системах часто критичен жёсткий лимит стека и отсутствие динамического выделения памяти. Сортировка Шелла удовлетворяет обоим требованиям: нет рекурсии, нет дополнительных массивов.',
        en: 'Embedded systems often have strict stack limits and no dynamic memory allocation. Shell sort satisfies both constraints: no recursion, no extra arrays.',
      },
      hint: {
        ru: 'Каковы два главных ресурсных ограничения встроенных систем, и как сортировка Шелла их соблюдает?',
        en: 'What are the two main resource constraints of embedded systems, and how does Shell sort respect both?',
      },
    },
    {
      question: {
        ru: 'Чем сортировка Шелла похожа на сортировку расчёской (comb sort)?',
        en: 'How is Shell sort similar to comb sort?',
      },
      options: [
        { ru: 'Обе работают с большим расстоянием между элементами, постепенно его уменьшая', en: 'Both start with a large gap between compared elements and gradually shrink it' },
        { ru: 'Обе используют числа Фибоначчи для формирования последовательности gap', en: 'Both use Fibonacci numbers to form the gap sequence' },
        { ru: 'Обе устойчивы и сохраняют порядок равных элементов при любом gap', en: 'Both are stable and preserve equal element order for any gap value in all cases' },
        { ru: 'Обе являются нерекурсивными вариантами быстрой сортировки с опорным элементом', en: 'Both are non-recursive variants of quicksort with a pivot element' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка расчёской - это «сортировка пузырьком с gap»: она тоже начинает с большого расстояния и сокращает его до 1. Сортировка Шелла делает то же самое, но на основе сортировки вставками.',
        en: 'Comb sort is "bubble sort with a gap": it also starts with a large distance and shrinks it to 1. Shell sort does the same thing, but based on insertion sort.',
      },
      hint: {
        ru: 'Оба алгоритма решают одну и ту же проблему медленных «черепах» - маленьких элементов, далёких от своей позиции. Как?',
        en: 'Both algorithms solve the same "turtle" problem - small elements far from their position. How?',
      },
    },
    {
      question: {
        ru: 'Какова лучшая временная сложность сортировки Шелла и при каком условии она достигается?',
        en: 'What is the best-case time complexity of Shell sort and when is it achieved?',
      },
      options: [
        { ru: 'O(n log n) - лучший случай при правильной последовательности gap', en: 'O(n log n) - with a good gap sequence on an already nearly sorted array' },
        { ru: 'O(n) - когда массив уже полностью отсортирован и gap не нужен вовсе', en: 'O(n) - when the array is already fully sorted and no gap is needed at all' },
        { ru: 'O(n²) - лучший и худший случаи у сортировки Шелла одинаковы', en: 'O(n²) - Shell sort\'s best and worst cases are the same' },
        { ru: 'O(1) - если все элементы массива одинаковы и перестановок не требуется', en: 'O(1) - if all array elements are equal and no swaps are required at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Лучший случай O(n log n) достигается при хороших последовательностях gap (например, Седжвика) и благоприятных входных данных. На идеально отсортированных данных с простейшей последовательностью n/2 сложность всё равно Θ(n log n) из-за числа проходов.',
        en: 'The O(n log n) best case is achieved with good gap sequences (e.g. Sedgewick\'s) and favorable input. On perfectly sorted data with the simplest n/2 sequence, complexity is still Θ(n log n) due to the number of passes.',
      },
      hint: {
        ru: 'Сколько проходов делает алгоритм в любом случае - и как это влияет на нижнюю границу сложности?',
        en: 'How many passes does the algorithm always make - and how does that affect the lower bound on complexity?',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если использовать последовательность gap с чётными числами (например, 4, 2)?',
        en: 'What happens if you use a gap sequence of only even numbers (for example, 4, 2)?',
      },
      options: [
        { ru: 'Нечётные позиции никогда не сравниваются с чётными до финального прохода gap = 1', en: 'Odd-indexed elements never compare against even-indexed ones until the final gap=1 pass' },
        { ru: 'Алгоритм завершится быстрее, поскольку чётные числа делятся пополам за меньшее число шагов', en: 'The algorithm finishes faster because even numbers halve in fewer steps than odd ones' },
        { ru: 'Результат будет неверным, так как не все элементы попадут в одну группу сравнений', en: 'The result will be incorrect because not all elements end up in the same comparison group' },
        { ru: 'Алгоритм вообще не сможет запуститься, так как gap должен быть нечётным по определению', en: 'The algorithm cannot start at all because gap must be odd by definition' },
      ],
      correct: 0,
      explanation: {
        ru: 'С чётными gap элементы на чётных позициях сравниваются только между собой, а элементы на нечётных - только между собой, до тех пор пока gap не станет 1. Это не ошибка - массив будет отсортирован - но может быть неэффективно.',
        en: 'With even gaps, even-indexed elements only compare among themselves and odd-indexed elements only among themselves, until gap reaches 1. This isn\'t incorrect - the array will be sorted - but can be inefficient.',
      },
      hint: {
        ru: 'При чётном gap элементы с чётными и нечётными индексами смешиваются? Проверьте: если gap = 2, то элемент на позиции 1 сравнивается с позицией -1 или позицией 3?',
        en: 'With an even gap, do elements at even and odd indices ever mix? Check: if gap = 2, does the element at index 1 compare with index -1 or index 3?',
      },
    },
  ],
};

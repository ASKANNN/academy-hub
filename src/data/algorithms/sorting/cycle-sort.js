export const cycleSort = {
  slug: 'cycle-sort',
  category: 'sorting',
  name: { ru: 'Cycle Sort', en: 'Cycle Sort' },
  complexity: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable', 'minimizes-writes'],

  intent: {
    ru: 'Циклическая сортировка находит для каждого элемента его финальную позицию в отсортированном массиве и переставляет элементы по циклам так, чтобы каждый элемент был записан ровно один раз.',
    en: 'Cycle sort finds each element\'s final position in the sorted array and rotates elements through cycles so that each element is written exactly once.',
  },

  problem: {
    ru: 'На флеш-памяти, EEPROM или в системах, где каждая запись стоит дорого (ограниченный ресурс перезаписи, дорогая операция ввода-вывода), важно не количество сравнений, а количество записей. Большинство сортировок делают O(n log n) или O(n²) записей - нужен алгоритм, который сортирует массив с теоретически минимальным числом записей.',
    en: 'On flash memory, EEPROM, or in systems where each write is expensive (limited write endurance, costly I/O), what matters isn\'t the number of comparisons but the number of writes. Most sorts perform O(n log n) or O(n²) writes - an algorithm is needed that sorts with the theoretically minimal number of writes.',
  },

  solution: {
    ru: 'Для каждой позиции i вычисляется, сколько элементов массива меньше a[i] - это и есть правильная позиция элемента в отсортированном массиве. Если элемент уже на своём месте, он пропускается без записи. Иначе элемент записывается на верную позицию, а элемент, который там был, вытесняется и ищет уже свою правильную позицию - так образуется «цикл» перестановок, который завершается, когда вытесненный элемент возвращается в исходную точку. Каждый элемент внутри цикла записывается ровно один раз - общее число записей равно n минус число уже правильно стоящих элементов, что является теоретическим минимумом.',
    en: 'For each position i, the algorithm computes how many array elements are less than a[i] - that is the element\'s correct position in the sorted array. If the element is already in place, it is skipped without a write. Otherwise, the element is written to its correct position, and whatever element was there gets displaced and looks for its own correct position - forming a "cycle" of rotations that closes when the displaced element returns to its starting point. Each element within a cycle is written exactly once - the total write count equals n minus the number of already-correct elements, the theoretical minimum.',
  },

  steps: [
    {
      title: { ru: 'Начать цикл с позиции i', en: 'Start a cycle at position i' },
      explanation: {
        ru: 'Взять элемент на позиции i и посчитать, сколько элементов массива меньше него - это его правильная позиция.',
        en: 'Take the element at position i and count how many array elements are smaller - that is its correct position.',
      },
    },
    {
      title: { ru: 'Пропустить, если элемент уже на месте', en: 'Skip if the element is already in place' },
      explanation: {
        ru: 'Если правильная позиция совпадает с текущей, перейти к следующей позиции без записи.',
        en: 'If the correct position matches the current one, move to the next position without a write.',
      },
    },
    {
      title: { ru: 'Записать элемент на правильную позицию', en: 'Write the element to its correct position' },
      explanation: {
        ru: 'Поменять элемент местами с тем, что стоит на его правильной позиции - вытесненный элемент теперь нужно пристроить.',
        en: 'Swap the element with whatever occupies its correct position - the displaced element now needs to be placed too.',
      },
    },
    {
      title: { ru: 'Продолжить цикл для вытесненного элемента', en: 'Continue the cycle for the displaced element' },
      explanation: {
        ru: 'Повторить процесс для вытесненного элемента: найти его правильную позицию и записать туда.',
        en: 'Repeat the process for the displaced element: find its correct position and write it there.',
      },
    },
    {
      title: { ru: 'Замкнуть цикл', en: 'Close the cycle' },
      explanation: {
        ru: 'Цикл завершается, когда вытесненный элемент возвращается на позицию i - тогда переходим к следующей начальной позиции.',
        en: 'The cycle closes when the displaced element returns to position i - then move on to the next starting position.',
      },
    },
  ],
  stepBreakpoints: [9, 36, 64, 87],

  implementation: {
    javascript: `function cycleSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = a[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < n; i++) {
      if (a[i] < item) pos++;
    }
    if (pos === cycleStart) continue;

    while (item === a[pos]) pos++;
    [a[pos], item] = [item, a[pos]];

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (a[i] < item) pos++;
      }
      while (item === a[pos]) pos++;
      [a[pos], item] = [item, a[pos]];
    }
  }
  return a;
}`,
    python: `def cycle_sort(arr):
    a = arr.copy()
    n = len(a)

    for cycle_start in range(n - 1):
        item = a[cycle_start]
        pos = cycle_start

        for i in range(cycle_start + 1, n):
            if a[i] < item:
                pos += 1
        if pos == cycle_start:
            continue

        while item == a[pos]:
            pos += 1
        a[pos], item = item, a[pos]

        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, n):
                if a[i] < item:
                    pos += 1
            while item == a[pos]:
                pos += 1
            a[pos], item = item, a[pos]

    return a`,
  },

  pros: [
    {
      ru: 'Теоретически минимальное число записей в массив - каждый элемент записывается не более одного раза за весь алгоритм.',
      en: 'Theoretically minimal number of array writes - each element is written at most once during the entire algorithm.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти.',
      en: 'Sorts in place with O(1) extra memory.',
    },
    {
      ru: 'Незаменим там, где запись физически дороже чтения (флеш-память, EEPROM с ограниченным ресурсом циклов перезаписи).',
      en: 'Invaluable where writes are physically more expensive than reads (flash memory, EEPROM with limited write-cycle endurance).',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений даже в лучшем случае - на большинстве современных процессоров вычисления дешевле записи, поэтому этот компромисс редко оправдан вне embedded-систем.',
      en: 'O(n²) comparisons even in the best case - on most modern CPUs, computation is cheaper than writes, so this tradeoff rarely pays off outside embedded systems.',
    },
    {
      ru: 'Неустойчив - не сохраняет относительный порядок равных элементов.',
      en: 'Not stable - doesn\'t preserve the relative order of equal elements.',
    },
    {
      ru: 'Существенно медленнее quicksort/mergesort по общему времени выполнения на обычном железе.',
      en: 'Significantly slower than quicksort/merge sort in total runtime on typical hardware.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортировка происходит во флеш-памяти или EEPROM, где важно минимизировать число циклов записи.',
      en: 'When sorting happens on flash memory or EEPROM, where minimizing write cycles matters.',
    },
    {
      ru: 'В embedded-системах, где запись в память энергозатратна или физически ограничена по ресурсу.',
      en: 'In embedded systems where writing to memory is power-costly or physically limited in endurance.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Прошивки embedded-устройств** - сортировка конфигурационных данных прямо во флеш-памяти микроконтроллера с ограниченным числом циклов перезаписи.',
      en: '**Embedded device firmware** - sorting configuration data directly in a microcontroller\'s flash memory with a limited number of rewrite cycles.',
    },
    {
      ru: '**Задача «найти недостающее/дублирующееся число»** - циклическая сортировка часто используется как приём для задач с числами в диапазоне [1, n] за O(n) времени и O(1) памяти.',
      en: '**"Find the missing/duplicate number" problems** - cycle sort\'s technique is often reused as a trick for problems with numbers in range [1, n] in O(n) time and O(1) space.',
    },
  ],

  relatedAlgorithms: ['selection-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что минимизирует циклическая сортировка по сравнению с другими алгоритмами сортировки?',
        en: 'What does cycle sort minimize compared to other sorting algorithms?',
      },
      options: [
        { ru: 'Число записей в массив', en: 'The number of array writes' },
        { ru: 'Число сравнений между элементами массива', en: 'The number of comparisons between array elements' },
        { ru: 'Используемую дополнительную память сверх исходного массива', en: 'The extra memory used beyond the original array' },
        { ru: 'Глубину рекурсии при вызовах функции', en: 'The recursion depth across function calls' },
      ],
      correct: 0,
      explanation: {
        ru: 'Циклическая сортировка жертвует числом сравнений (O(n²)) ради теоретически минимального числа записей - каждый элемент пишется не более одного раза.',
        en: 'Cycle sort sacrifices comparison count (O(n²)) for a theoretically minimal write count - each element is written at most once.',
      },
      hint: {
        ru: 'Подумайте, что именно дорого в контексте флеш-памяти или EEPROM. Что алгоритм оптимизирует в первую очередь?',
        en: 'Think about what is expensive in the context of flash memory or EEPROM. What does the algorithm optimize first?',
      },
    },
    {
      question: {
        ru: 'Почему циклическая сортировка особенно полезна на флеш-памяти?',
        en: 'Why is cycle sort especially useful on flash memory?',
      },
      options: [
        {
          ru: 'Флеш-память имеет ограниченный ресурс циклов перезаписи, а запись физически дороже чтения',
          en: 'Flash memory has limited write-cycle endurance, and writes are physically more expensive than reads',
        },
        { ru: 'Флеш-память в принципе не поддерживает чтение произвольного доступа, а только строго последовательное чтение данных', en: 'Flash memory doesn\'t support random-access reads at all, only strictly sequential reads of the data' },
        { ru: 'Циклическая сортировка вообще не использует сравнения, полагаясь только на хеширование значений', en: 'Cycle sort doesn\'t use comparisons at all, relying only on hashing the values instead' },
        { ru: 'Это единственный известный человечеству алгоритм, который вообще умеет сортировать отдельные байты', en: 'It\'s the only algorithm known to humanity that can sort individual bytes at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Минимизация записей напрямую продлевает срок службы флеш-памяти и снижает энергопотребление - то, за что другие алгоритмы не оптимизируют.',
        en: 'Minimizing writes directly extends flash memory lifespan and reduces power consumption - something other algorithms don\'t optimize for.',
      },
      hint: {
        ru: 'Флеш-память изнашивается от записей, а не от чтений. Что делает cycle sort с количеством записей?',
        en: 'Flash memory wears out from writes, not reads. What does cycle sort do to the write count?',
      },
    },
    {
      question: {
        ru: 'Как циклическая сортировка находит правильную позицию элемента без вспомогательных структур?',
        en: 'How does cycle sort find an element\'s correct position without auxiliary structures?',
      },
      options: [
        {
          ru: 'Подсчитывает, сколько элементов в массиве меньше данного',
          en: 'It counts how many elements in the array are smaller than the given one',
        },
        { ru: 'Использует бинарный поиск по заранее отсортированной вспомогательной копии массива', en: 'It uses binary search on a pre-sorted auxiliary copy of the array' },
        { ru: 'Строит хеш-таблицу значений и их будущих индексов заранее', en: 'It builds a hash table mapping values to their future indices in advance' },
        { ru: 'Запрашивает правильную позицию у пользователя через ввод данных', en: 'It asks the user for the correct position via input' },
      ],
      correct: 0,
      explanation: {
        ru: 'Число элементов меньше данного равно числу позиций перед ним в отсортированном порядке - это и есть его целевой индекс.',
        en: 'The count of smaller elements equals the number of positions before it in sorted order - that is exactly its target index.',
      },
      hint: {
        ru: 'В отсортированном массиве, если перед элементом стоит ровно k меньших элементов, какой у него индекс?',
        en: 'In a sorted array, if exactly k elements smaller than it come before it, what is its index?',
      },
    },
    {
      question: {
        ru: 'Почему циклическая сортировка редко используется вне embedded-систем?',
        en: 'Why is cycle sort rarely used outside embedded systems?',
      },
      options: [
        {
          ru: 'На обычном железе вычисления дешевле записи, а O(n²) сравнений делает её медленнее quicksort/mergesort',
          en: 'On typical hardware, computation is cheaper than writes, and O(n²) comparisons make it slower than quicksort/merge sort',
        },
        { ru: 'Она требует O(n) дополнительной памяти на каждый отдельный вызов функции сортировки, что делает её совершенно непрактичной для встраиваемых систем', en: 'It requires O(n) extra memory on every single call to the sort function, which makes it completely impractical for embedded systems' },
        { ru: 'Она в принципе не умеет работать с целыми числами и требует исключительно чисел с плавающей точкой для всего', en: 'It fundamentally can\'t work with integers and requires floating-point numbers exclusively for everything' },
        { ru: 'Она никогда не была опубликована в открытом доступе и известна лишь очень узкому кругу специалистов по алгоритмам', en: 'It was never published openly and is known only to a very small circle of algorithm specialists' },
      ],
      correct: 0,
      explanation: {
        ru: 'На CPU и RAM запись почти так же дешева, как чтение - компромисс "меньше записей ценой квадратичных сравнений" там невыгоден.',
        en: 'On CPU and RAM, writes are nearly as cheap as reads - the "fewer writes at the cost of quadratic comparisons" tradeoff doesn\'t pay off there.',
      },
      hint: {
        ru: 'Цикличская сортировка торгует сравнениями на записи. Когда этот обмен выгоден, а когда нет?',
        en: 'Cycle sort trades comparisons for writes. When is that trade worthwhile, and when is it not?',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда вытесненный элемент возвращается на позицию, с которой начался цикл?',
        en: 'What happens when the displaced element returns to the position where the cycle started?',
      },
      options: [
        { ru: 'Цикл завершается, алгоритм переходит к следующей начальной позиции', en: 'The cycle closes and the algorithm moves to the next starting position' },
        { ru: 'Алгоритм немедленно останавливается с ошибкой переполнения индекса массива, что требует перезапуска всей сортировки', en: 'The algorithm immediately stops with an array index overflow error, requiring the whole sort to be restarted' },
        { ru: 'Начинается совершенно новый проход по всему массиву с самого первого элемента, игнорируя уже сделанную работу', en: 'A brand new pass over the whole array begins again from the very first element, ignoring the work already done' },
        { ru: 'Весь массив сортируется заново с нуля с использованием совершенно другого запасного алгоритма', en: 'The entire array is re-sorted from scratch using a completely different fallback algorithm instead' },
      ],
      correct: 0,
      explanation: {
        ru: 'Возврат в стартовую точку означает, что цепочка перестановок замкнулась и все элементы цикла заняли свои места - цикл закрыт.',
        en: 'Returning to the starting point means the rotation chain has closed and all elements in the cycle have taken their places - the cycle is done.',
      },
      hint: {
        ru: 'Цикл перестановок - это замкнутая цепочка. Что означает возврат в начальную точку для состояния всех элементов в цепочке?',
        en: 'A permutation cycle is a closed chain. What does returning to the start mean for the state of all elements in the chain?',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность циклической сортировки в лучшем случае?',
        en: 'What is the best-case time complexity of cycle sort?',
      },
      options: [
        { ru: 'O(n²) - подсчёт позиций всегда требует прохода по оставшейся части массива', en: 'O(n²) - counting correct positions always requires scanning the remaining portion of the array' },
        { ru: 'O(n) - когда массив уже отсортирован и запись не нужна ни разу', en: 'O(n) - when the array is already sorted and no writes are needed at all' },
        { ru: 'O(n log n) - благодаря структуре циклов, аналогичной куче', en: 'O(n log n) - due to the cycle structure similar to a heap' },
        { ru: 'O(1) - если все элементы уже стоят на своих местах без каких-либо перемещений', en: 'O(1) - if all elements are already in place with no movements needed whatsoever regardless of input' },
      ],
      correct: 0,
      explanation: {
        ru: 'Даже когда массив уже отсортирован (записей нет), для каждой позиции i алгоритм всё равно проходит по всем j > i, подсчитывая меньшие элементы - это даёт O(n²) сравнений.',
        en: 'Even when the array is already sorted (no writes needed), for each position i the algorithm still scans all j > i to count smaller elements - giving O(n²) comparisons.',
      },
      hint: {
        ru: 'Вспомните, как алгоритм находит правильную позицию элемента. Этот шаг выполняется всегда, независимо от состояния массива?',
        en: 'Recall how the algorithm finds an element\'s correct position. Is that step always performed regardless of array state?',
      },
    },
    {
      question: {
        ru: 'Является ли циклическая сортировка устойчивой (stable)?',
        en: 'Is cycle sort stable?',
      },
      options: [
        { ru: 'Нет - перестановка по циклам может изменить порядок равных элементов', en: 'No - cycling through permutations can change the relative order of equal elements' },
        { ru: 'Да - каждый элемент записывается ровно один раз, поэтому их порядок не нарушается', en: 'Yes - each element is written exactly once, so their order is not disturbed' },
        { ru: 'Только если все элементы в массиве различны и дубликатов нет', en: 'Only if all elements in the array are distinct and there are no duplicates' },
        { ru: 'Только при чётном числе элементов из-за симметрии циклов перестановок', en: 'Only when the element count is even due to the symmetry of permutation cycles always' },
      ],
      correct: 0,
      explanation: {
        ru: 'При подсчёте элементов меньше данного алгоритм может поставить элемент перед равным ему, изменив их исходный порядок - устойчивость не гарантирована.',
        en: 'When counting elements smaller than the current one, the algorithm may place an element before an equal one, altering their original order - stability is not guaranteed.',
      },
      hint: {
        ru: 'Подумайте, что происходит, когда два равных элемента участвуют в одном или разных циклах перестановок.',
        en: 'Think about what happens when two equal elements are involved in the same or different permutation cycles.',
      },
    },
    {
      question: {
        ru: 'Почему алгоритм дополнительно сдвигает pos вперёд при `item === a[pos]`?',
        en: 'Why does the algorithm shift pos forward when `item === a[pos]`?',
      },
      options: [
        { ru: 'Не перезаписывать равный элемент, когда тот уже стоит на правильной позиции', en: 'To avoid overwriting an equal element that is already in its correct position' },
        { ru: 'Чтобы ускорить поиск позиции с помощью пропуска уже обработанных элементов', en: 'To speed up position search by skipping already processed elements' },
        { ru: 'Потому что сравнение на равенство работает медленнее, чем сравнение на меньше', en: 'Because equality comparison runs slower than less-than comparison' },
        { ru: 'Это баг в стандартной реализации, который никто не удосужился исправить', en: 'This is a bug in the standard implementation that nobody bothered to fix always' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если на целевой позиции стоит элемент, равный перемещаемому, его нельзя трогать - он уже корректно размещён. Алгоритм ищет следующую позицию с другим значением.',
        en: 'If the target position holds an element equal to the one being moved, it must not be touched - it is already correctly placed. The algorithm finds the next position with a different value.',
      },
      hint: {
        ru: 'Что означало бы поставить элемент на место равного ему, не проверив, что тот уже стоит правильно?',
        en: 'What would it mean to place an element into the slot of an equal element without checking that the latter is already correctly placed?',
      },
    },
    {
      question: {
        ru: 'Чем циклическая сортировка принципиально отличается от сортировки выбором по числу записей?',
        en: 'How does cycle sort fundamentally differ from selection sort in terms of write count?',
      },
      options: [
        { ru: 'Cycle sort: O(n) записей; selection sort: O(n) обменов ≈ 2-3 записи каждый', en: 'Cycle sort makes O(n) writes, while selection sort makes O(n) swaps each involving 2-3 writes' },
        { ru: 'Cycle sort делает O(n²) записей, а selection sort - O(n log n) обменов', en: 'Cycle sort makes O(n²) writes, while selection sort makes O(n log n) swaps regardless of input' },
        { ru: 'Оба алгоритма делают абсолютно одинаковое число записей на любых входных данных', en: 'Both algorithms make the exact same number of writes on any input data' },
        { ru: 'Selection sort вообще не делает записей, поскольку использует только сравнения', en: 'Selection sort makes no writes at all since it only uses comparisons' },
      ],
      correct: 0,
      explanation: {
        ru: 'Selection sort делает примерно n обменов, каждый из которых требует 3 записи (через временную переменную). Cycle sort записывает каждый элемент ровно раз - итого не более n записей.',
        en: 'Selection sort makes roughly n swaps, each needing 3 writes (via a temporary variable). Cycle sort writes each element exactly once - at most n writes total.',
      },
      hint: {
        ru: 'Сколько записей нужно для одного обмена двух элементов через временную переменную? Умножьте на n обменов.',
        en: 'How many writes does one swap of two elements via a temporary variable require? Multiply by n swaps.',
      },
    },
    {
      question: {
        ru: 'Как задача «найти пропущенное число в массиве [1, n]» связана с идеей циклической сортировки?',
        en: 'How does the "find the missing number in array [1, n]" problem relate to cycle sort\'s idea?',
      },
      options: [
        { ru: 'Оба используют подсчёт меньших элементов для определения правильной позиции каждого числа', en: 'Both use counting smaller elements to determine each number\'s correct position' },
        { ru: 'Задача о пропущенном числе решается только сортировкой слиянием и не имеет связи с cycle sort', en: 'The missing-number problem is solved only by merge sort and has no relation to cycle sort' },
        { ru: 'Cycle sort специально разработан для задач о пропущенных числах и не умеет ничего другого', en: 'Cycle sort was specifically designed for missing-number problems and cannot do anything else' },
        { ru: 'Связь отсутствует: это принципиально разные алгоритмические задачи без пересечений', en: 'There is no connection: these are fundamentally different algorithmic problems with no overlap' },
      ],
      correct: 0,
      explanation: {
        ru: 'Трюк cycle sort - «поставь число на позицию, равную его значению минус 1» - напрямую применим для расстановки чисел [1, n] на свои индексы, после чего пропущенное число легко найти.',
        en: 'Cycle sort\'s trick - "place a number at the index equal to its value minus 1" - applies directly to arranging numbers [1, n] at their indices, after which the missing number is easy to find.',
      },
      hint: {
        ru: 'Если все числа от 1 до n стоят на позиции value-1, что можно сказать о позиции с «чужим» числом или без числа вовсе?',
        en: 'If all numbers from 1 to n sit at position value-1, what can you say about the position that has a "wrong" number or no number at all?',
      },
    },
  ],
};

export const countingSort = {
  slug: 'counting-sort',
  category: 'sorting',
  name: { ru: 'Counting Sort', en: 'Counting Sort' },
  complexity: {
    time: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    space: 'O(n + k)',
  },
  popularity: 1,
  tags: ['non-comparison', 'stable', 'integer-keys'],

  intent: {
    ru: 'Сортировка подсчётом не сравнивает элементы друг с другом — она считает, сколько раз встречается каждое значение, и по этим подсчётам напрямую вычисляет финальную позицию каждого элемента.',
    en: 'Counting sort never compares elements against each other — it counts how many times each value occurs, and uses those counts to compute each element\'s final position directly.',
  },

  problem: {
    ru: 'Теоретический предел любой сортировки, основанной на попарных сравнениях, — O(n log n): это доказывается через дерево решений. Но если заранее известно, что значения — это целые числа из небольшого диапазона (например, оценки от 0 до 100 или возраст людей), сравнивать их вообще не обязательно — можно посчитать, сколько раз встречается каждое значение.',
    en: 'The theoretical limit of any comparison-based sort is O(n log n) — this is provable via a decision-tree argument. But if it\'s known in advance that values are integers from a small range (e.g. scores 0–100, or people\'s ages), comparisons aren\'t needed at all — you can just count how many times each value occurs.',
  },

  solution: {
    ru: 'Алгоритм заводит вспомогательный массив `count` длиной в диапазон возможных значений и проходит по входному массиву, увеличивая `count[значение]` для каждого элемента. Затем `count` превращается в массив префиксных сумм — `count[v]` теперь означает «сколько элементов ≤ v», то есть последнюю позицию значения v в отсортированном массиве. После этого исходный массив проходится справа налево: каждый элемент кладётся в выходной массив на позицию `count[значение] - 1`, а счётчик уменьшается — обход справа налево нужен именно для устойчивости сортировки.',
    en: 'The algorithm builds a helper `count` array sized to the range of possible values, then walks the input incrementing `count[value]` for each element. Next, `count` is turned into a prefix-sum array — `count[v]` now means "how many elements are ≤ v," i.e. the last position value v takes in the sorted output. The original array is then walked right to left: each element is placed into the output array at `count[value] - 1`, and the counter is decremented — the right-to-left walk is specifically what makes the sort stable.',
  },

  steps: [
    {
      title: { ru: 'Найти диапазон значений', en: 'Find the value range' },
      explanation: {
        ru: 'Определить минимальное и максимальное значение во входном массиве, чтобы выделить массив `count` нужного размера.',
        en: 'Determine the minimum and maximum values in the input so the `count` array can be sized correctly.',
      },
    },
    {
      title: { ru: 'Посчитать вхождения', en: 'Count occurrences' },
      explanation: {
        ru: 'Пройти по входному массиву и увеличить `count[значение]` для каждого встреченного элемента.',
        en: 'Walk the input array, incrementing `count[value]` for every element encountered.',
      },
    },
    {
      title: { ru: 'Построить префиксные суммы', en: 'Build prefix sums' },
      explanation: {
        ru: 'Превратить `count` в массив накопленных сумм — теперь `count[v]` даёт позицию, где заканчивается диапазон значения v в отсортированном массиве.',
        en: 'Turn `count` into a running-sum array — now `count[v]` gives the position where value v\'s range ends in the sorted output.',
      },
    },
    {
      title: { ru: 'Разместить элементы справа налево', en: 'Place elements right to left' },
      explanation: {
        ru: 'Пройти исходный массив с конца, для каждого элемента взять его позицию из `count`, поставить в выходной массив и уменьшить счётчик.',
        en: 'Walk the original array from the end, look up each element\'s position in `count`, place it in the output, and decrement the counter.',
      },
    },
    {
      title: { ru: 'Вернуть выходной массив', en: 'Return the output array' },
      explanation: {
        ru: 'После обработки всех элементов выходной массив полностью отсортирован.',
        en: 'After processing every element, the output array is fully sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function countingSort(arr) {
  if (arr.length === 0) return [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const count = new Array(max - min + 1).fill(0);

  for (const value of arr) {
    count[value - min]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i];
    count[value - min]--;
    output[count[value - min]] = value;
  }
  return output;
}`,
    python: `def counting_sort(arr):
    if not arr:
        return []
    lo, hi = min(arr), max(arr)
    count = [0] * (hi - lo + 1)

    for value in arr:
        count[value - lo] += 1
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    output = [0] * len(arr)
    for value in reversed(arr):
        count[value - lo] -= 1
        output[count[value - lo]] = value
    return output`,
  },

  pros: [
    {
      ru: 'Линейная сложность O(n + k) — быстрее теоретического предела O(n log n) для сравнивающих сортировок, если k не слишком велико.',
      en: 'Linear O(n + k) complexity — beats the O(n log n) comparison-sort lower bound when k isn\'t too large.',
    },
    {
      ru: 'Устойчив: при правильном обходе (справа налево) равные элементы сохраняют исходный порядок.',
      en: 'Stable: with the right-to-left walk, equal elements keep their original relative order.',
    },
    {
      ru: 'Простая и предсказуемая логика без рекурсии — время выполнения не зависит от исходного порядка элементов.',
      en: 'Simple, predictable, non-recursive logic — runtime doesn\'t depend on the initial order of elements.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(k) дополнительной памяти, где k — диапазон значений; для больших или разреженных диапазонов это может быть непрактично.',
      en: 'Requires O(k) extra memory, where k is the value range; impractical for large or sparse ranges.',
    },
    {
      ru: 'Работает только с целочисленными (или сводимыми к целым) ключами известного диапазона — не годится для произвольных сравнимых объектов.',
      en: 'Only works with integer (or integer-reducible) keys of a known range — not applicable to arbitrary comparable objects.',
    },
    {
      ru: 'Если диапазон значений k намного больше числа элементов n, алгоритм становится медленнее и прожорливее по памяти, чем O(n log n) сортировки.',
      en: 'If the value range k is much larger than the element count n, the algorithm becomes slower and more memory-hungry than O(n log n) sorts.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортируемые значения — целые числа из заранее известного и не слишком большого диапазона (оценки, возраст, ранги).',
      en: 'When the values being sorted are integers from a known, reasonably small range (grades, ages, ranks).',
    },
    {
      ru: 'Как строительный блок для radix sort — сортировка подсчётом по одному разряду это его внутренний шаг.',
      en: 'As a building block for radix sort — counting sort on a single digit is its internal step.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Radix sort** использует сортировку подсчётом как подпрограмму для упорядочивания чисел по каждому разряду.',
      en: '**Radix sort** uses counting sort as a subroutine to order numbers by each digit.',
    },
    {
      ru: '**Обработка изображений** — построение гистограммы яркости пикселей (значения 0–255) и сортировка пикселей по яркости используют по сути тот же принцип подсчёта.',
      en: '**Image processing** — building a pixel-brightness histogram (values 0–255) and sorting pixels by brightness use essentially the same counting principle.',
    },
  ],

  relatedAlgorithms: ['radix-sort', 'bucket-sort'],

  quiz: [
    {
      question: {
        ru: 'Почему сортировка подсчётом может работать быстрее теоретического предела O(n log n)?',
        en: 'Why can counting sort beat the O(n log n) theoretical limit?',
      },
      options: [
        { ru: 'Она вообще не сравнивает элементы друг с другом', en: 'It never compares elements against each other at all' },
        { ru: 'Она использует несколько потоков одновременно, распределяя работу по ядрам', en: 'It uses multiple threads at once, spreading the work across CPU cores' },
        { ru: 'Она сортирует только первую половину массива, а вторую копирует как есть', en: 'It only sorts the first half of the array and copies the rest as-is' },
        { ru: 'Предел O(n log n) относится только к строкам, а не к числам', en: 'The O(n log n) limit only applies to strings, not to numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нижняя граница O(n log n) доказывается для сортировок, которые определяют порядок через попарные сравнения. Подсчёт вхождений — принципиально другой механизм, на который эта граница не распространяется.',
        en: 'The O(n log n) lower bound is proven for sorts that determine order via pairwise comparisons. Counting occurrences is a fundamentally different mechanism, so the bound doesn\'t apply.',
      },
      hint: {
        ru: 'Нижняя граница O(n log n) доказана для конкретного класса алгоритмов. Использует ли подсчёт вхождений сравнения вообще?',
        en: 'The O(n log n) lower bound is proven for a specific class of algorithms. Does counting occurrences use comparisons at all?',
      },
    },
    {
      question: {
        ru: 'Что означает k в оценке сложности O(n + k)?',
        en: 'What does k mean in the O(n + k) complexity bound?',
      },
      options: [
        { ru: 'Диапазон возможных значений элементов', en: 'The range of possible element values' },
        { ru: 'Количество проходов по массиву за весь алгоритм', en: 'The number of passes made over the array during the whole algorithm' },
        { ru: 'Глубину рекурсии, как в сортировке слиянием', en: 'The recursion depth, similar to merge sort' },
        { ru: 'Число потоков выполнения, задействованных при сортировке', en: 'The number of execution threads used while sorting' },
      ],
      correct: 0,
      explanation: {
        ru: 'k — это размер вспомогательного массива `count`, который равен диапазону значений (max - min + 1). Если k сопоставим с n, сложность фактически линейна.',
        en: 'k is the size of the helper `count` array, equal to the value range (max - min + 1). When k is comparable to n, the complexity is effectively linear.',
      },
      hint: {
        ru: 'Какую структуру выделяет алгоритм помимо выходного массива? Её размер и есть k.',
        en: 'What structure does the algorithm allocate besides the output array? Its size is k.',
      },
    },
    {
      question: {
        ru: 'Зачем выходной массив заполняется, проходя исходный массив именно справа налево?',
        en: 'Why is the output array filled by walking the input right to left?',
      },
      options: [
        { ru: 'Сохранить устойчивость — относительный порядок равных элементов', en: 'To preserve stability — the relative order of equal elements' },
        { ru: 'Это ускоряет выполнение алгоритма за счёт лучшей локальности кэша', en: 'It speeds up execution thanks to better cache locality' },
        { ru: 'Иначе алгоритм не сможет обработать отрицательные числа', en: 'Otherwise the algorithm can\'t handle negative numbers' },
        { ru: 'Это требование языка программирования при работе с массивами', en: 'It\'s a requirement of the programming language when working with arrays' },
      ],
      correct: 0,
      explanation: {
        ru: 'При обходе справа налево более поздний из двух равных элементов размещается первым (с большим индексом), поэтому исходный порядок между равными значениями сохраняется.',
        en: 'Walking right to left places the later of two equal elements first (at the higher index), so the original order between equal values is preserved.',
      },
      hint: {
        ru: 'Представьте два одинаковых элемента. Если обходить массив слева направо, который из них окажется на большем индексе в выводе?',
        en: 'Imagine two identical elements. If you walk left to right, which one ends up at the higher index in the output?',
      },
    },
    {
      question: {
        ru: 'Когда сортировка подсчётом становится невыгодной?',
        en: 'When does counting sort stop being worthwhile?',
      },
      options: [
        { ru: 'Когда диапазон k намного больше числа элементов n', en: 'When the value range k is much larger than the element count n' },
        { ru: 'Когда массив уже почти отсортирован перед запуском', en: 'When the array is already nearly sorted before the run starts' },
        { ru: 'Когда все элементы одинаковы и сравнивать нечего', en: 'When all elements are identical and there is nothing to compare' },
        { ru: 'Когда n — чётное число, что усложняет разбиение на пары', en: 'When n is an even number, which complicates pairing elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если k (например, 10^9 при малом n) намного больше n, память и время на массив `count` перевешивают выигрыш от отсутствия сравнений.',
        en: 'If k (e.g. 10^9 with a small n) dwarfs n, the memory and time spent on the `count` array outweigh the benefit of skipping comparisons.',
      },
      hint: {
        ru: 'Алгоритм выделяет массив размером k. Что будет, если k в тысячи раз больше n?',
        en: 'The algorithm allocates an array of size k. What happens if k is thousands of times larger than n?',
      },
    },
    {
      question: {
        ru: 'Может ли сортировка подсчётом сортировать произвольные объекты, например строки по алфавиту?',
        en: 'Can counting sort sort arbitrary objects, like strings alphabetically?',
      },
      options: [
        { ru: 'Только если их можно свести к целочисленным ключам известного диапазона', en: 'Only if they can be reduced to integer keys within a known range' },
        { ru: 'Да, без каких-либо изменений алгоритма, поскольку сравнения не используются', en: 'Yes, with no changes to the algorithm at all, since it never compares values' },
        { ru: 'Нет, алгоритм работает только с числами с плавающей точкой в диапазоне [0, 1]', en: 'No, the algorithm only works with floating-point numbers in the range [0, 1]' },
        { ru: 'Да, но только для строк одинаковой длины из-за особенностей индексации', en: 'Yes, but only for strings of equal length, due to how indexing works' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка подсчётом требует дискретных ключей известного диапазона — строки можно сортировать посимвольно (это и есть идея LSD radix sort), но не напрямую одним проходом подсчёта.',
        en: 'Counting sort needs discrete keys of a known range — strings can be sorted character by character (this is exactly the LSD radix sort idea), but not directly in a single counting pass.',
      },
      hint: {
        ru: 'Алгоритм использует значение элемента как индекс в массиве count. Что нужно для этого знать о значениях?',
        en: 'The algorithm uses each element\'s value as an index into the count array. What must be known about the values for this to work?',
      },
    },
    {
      question: {
        ru: 'Для чего нужен шаг построения префиксных сумм в массиве count?',
        en: 'What is the purpose of the prefix-sum step on the count array?',
      },
      options: [
        { ru: 'Чтобы count[i] хранил, сколько элементов не превышает i', en: 'So each count entry stores how many input elements are no greater than that value' },
        { ru: 'Чтобы отсортировать сам массив count по возрастанию перед финальным проходом', en: 'To sort the count array itself in ascending order before the final pass' },
        { ru: 'Чтобы подсчитать суммарное количество элементов в массиве и проверить целостность данных', en: 'To compute the total number of elements in the array and verify data integrity always' },
        { ru: 'Чтобы уменьшить размер массива count вдвое и сэкономить память', en: 'To halve the size of the count array and save memory' },
      ],
      correct: 0,
      explanation: {
        ru: 'После построения префиксных сумм count[v] равен числу элементов ≤ v, что непосредственно задаёт последний индекс, который занимает значение v в выходном массиве.',
        en: 'After prefix sums, count[v] equals the number of elements ≤ v, which directly gives the last index that value v occupies in the output array.',
      },
      hint: {
        ru: 'Зная, сколько элементов меньше или равно v, что можно сказать о позиции последнего вхождения v в отсортированном массиве?',
        en: 'Knowing how many elements are less than or equal to v, what can you say about the position of the last occurrence of v in the sorted array?',
      },
    },
    {
      question: {
        ru: 'Какую роль играет сортировка подсчётом внутри поразрядной сортировки (radix sort)?',
        en: 'What role does counting sort play inside radix sort?',
      },
      options: [
        { ru: 'Она стабильно сортирует числа по одному разряду за проход', en: 'It stably sorts numbers by one digit per pass' },
        { ru: 'Она выбирает опорный элемент для разбиения массива на части', en: 'It selects a pivot element for partitioning the array into parts' },
        { ru: 'Она рекурсивно делит массив, как при сортировке слиянием', en: 'It recursively divides the array, as in merge sort' },
        { ru: 'Она освобождает память после каждого прохода по разряду', en: 'It frees memory after each digit pass completes' },
      ],
      correct: 0,
      explanation: {
        ru: 'Radix sort обрабатывает числа разряд за разрядом; на каждом шаге он вызывает counting sort по текущему разряду, опираясь на устойчивость, чтобы сохранить порядок, достигнутый предыдущими шагами.',
        en: 'Radix sort processes numbers digit by digit; at each step it calls counting sort on the current digit, relying on stability to preserve the order established by previous steps.',
      },
      hint: {
        ru: 'Radix sort обрабатывает одну цифру за проход. Какие свойства counting sort делают её идеальной для этой роли?',
        en: 'Radix sort processes one digit per pass. Which properties of counting sort make it ideal for this role?',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если массив count заполнять, проходя исходный массив слева направо при размещении элементов в выход?',
        en: 'What happens if the output is filled by walking the input array left to right instead of right to left?',
      },
      options: [
        { ru: 'Алгоритм останется корректным, но потеряет устойчивость', en: 'The algorithm stays correct but loses stability' },
        { ru: 'Алгоритм полностью перестанет работать и выдаст неотсортированный результат', en: 'The algorithm breaks entirely and returns an unsorted result' },
        { ru: 'Сложность ухудшится с O(n + k) до O(n²) из-за конфликтов при записи', en: 'The complexity degrades from O(n + k) to O(n²) due to write conflicts' },
        { ru: 'Вспомогательный массив count переполнится и вызовет выход за границы памяти', en: 'The auxiliary count array overflows and causes an out-of-bounds memory access' },
      ],
      correct: 0,
      explanation: {
        ru: 'Обход слева направо разместит более ранние равные элементы на более высоких индексах, нарушив их исходный порядок, — сортировка станет нестабильной, но результат всё равно будет отсортирован.',
        en: 'Walking left to right places earlier equal elements at higher indices, breaking their original order — the sort becomes unstable, but the result is still sorted.',
      },
      hint: {
        ru: 'Подумайте конкретно о двух одинаковых элементах. Как их расположение в выходе изменится, если обходить массив в другом направлении?',
        en: 'Think specifically about two identical elements. How will their placement in the output change if the array is walked in the opposite direction?',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность сортировки подсчётом?',
        en: 'What is the space complexity of counting sort?',
      },
      options: [
        { ru: 'O(n + k) — для выходного массива и массива count размером в диапазон значений', en: 'O(n + k) — for the output array and the count array sized to the value range' },
        { ru: 'O(1) — алгоритм сортирует данные прямо на месте без дополнительных структур', en: 'O(1) — the algorithm sorts in place without any extra structures' },
        { ru: 'O(log n) — за счёт стека рекурсивных вызовов при разбиении диапазона пополам', en: 'O(log n) — from the recursive call stack when splitting the range in half always' },
        { ru: 'O(n²) — потому что для каждого элемента хранится его полная история сравнений', en: 'O(n²) — because the full comparison history of each element is stored' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм выделяет массив `count` размером k и выходной массив размером n, откуда и берётся суммарная сложность O(n + k).',
        en: 'The algorithm allocates a `count` array of size k and an output array of size n, giving total space O(n + k).',
      },
      hint: {
        ru: 'Перечислите все структуры, которые выделяет алгоритм помимо входного массива, и оцените размер каждой.',
        en: 'List all the structures the algorithm allocates beyond the input array and estimate the size of each.',
      },
    },
    {
      question: {
        ru: 'Зачем при инициализации массива count из него вычитается минимальное значение при индексации?',
        en: 'Why is the minimum value subtracted from each element when indexing into the count array?',
      },
      options: [
        { ru: 'Сдвинуть диапазон к нулю — не выделять память под значения ниже минимума', en: 'To shift the value range to start at zero and avoid allocating memory for values below the minimum' },
        { ru: 'Чтобы ускорить вычисление индекса при помощи битового сдвига вместо деления', en: 'To speed up index computation using a bit shift instead of division regardless of input size or order' },
        { ru: 'Потому что отрицательные индексы массива требуют коррекции знака', en: 'Because negative array indices require a sign correction' },
        { ru: 'Чтобы гарантировать, что максимальный элемент всегда попадёт в последнюю ячейку', en: 'To guarantee the maximum element always lands in the last cell' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если минимальное значение равно, например, 50, то без вычитания первые 50 ячеек массива count были бы пусты — вычитание минимума убирает этот мёртвый балласт.',
        en: 'If the minimum value is, say, 50, then without subtraction the first 50 cells of count would be empty — subtracting the minimum removes this dead space.',
      },
      hint: {
        ru: 'Что было бы размером массива count, если бы он индексировался напрямую значениями, а не их смещением относительно минимума?',
        en: 'What would the count array size be if it were indexed directly by values rather than by their offset from the minimum?',
      },
    },
  ],
};

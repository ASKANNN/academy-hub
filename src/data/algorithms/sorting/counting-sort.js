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
    },
    {
      question: {
        ru: 'Зачем выходной массив заполняется, проходя исходный массив именно справа налево?',
        en: 'Why is the output array filled by walking the input right to left?',
      },
      options: [
        { ru: 'Чтобы сохранить устойчивость сортировки — относительный порядок равных элементов', en: 'To preserve stability — the relative order of equal elements' },
        { ru: 'Это ускоряет выполнение алгоритма за счёт лучшей локальности кэша', en: 'It speeds up execution thanks to better cache locality' },
        { ru: 'Иначе алгоритм не сможет обработать отрицательные числа', en: 'Otherwise the algorithm can\'t handle negative numbers' },
        { ru: 'Это требование языка программирования при работе с массивами', en: 'It\'s a requirement of the programming language when working with arrays' },
      ],
      correct: 0,
      explanation: {
        ru: 'При обходе справа налево более поздний из двух равных элементов размещается первым (с большим индексом), поэтому исходный порядок между равными значениями сохраняется.',
        en: 'Walking right to left places the later of two equal elements first (at the higher index), so the original order between equal values is preserved.',
      },
    },
    {
      question: {
        ru: 'Когда сортировка подсчётом становится невыгодной?',
        en: 'When does counting sort stop being worthwhile?',
      },
      options: [
        { ru: 'Когда диапазон значений k намного больше числа элементов n', en: 'When the value range k is much larger than the element count n' },
        { ru: 'Когда массив уже почти отсортирован перед запуском', en: 'When the array is already nearly sorted before the run starts' },
        { ru: 'Когда все элементы одинаковы и сравнивать нечего', en: 'When all elements are identical and there is nothing to compare' },
        { ru: 'Когда n — чётное число, что усложняет разбиение на пары', en: 'When n is an even number, which complicates pairing elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если k (например, 10^9 при малом n) намного больше n, память и время на массив `count` перевешивают выигрыш от отсутствия сравнений.',
        en: 'If k (e.g. 10^9 with a small n) dwarfs n, the memory and time spent on the `count` array outweigh the benefit of skipping comparisons.',
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
    },
  ],
};

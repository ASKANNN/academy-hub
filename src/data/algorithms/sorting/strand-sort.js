export const strandSort = {
  slug: 'strand-sort',
  category: 'sorting',
  name: { ru: 'Strand Sort', en: 'Strand Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['comparison', 'merge-based', 'stable', 'linked-list-friendly'],

  intent: {
    ru: 'Сортировка прядями раз за разом вытягивает из входных данных максимально длинную уже возрастающую подпоследовательность («прядь»), а затем сливает её с результатом — так же, как последний шаг сортировки слиянием, но без предварительного деления массива пополам.',
    en: 'Strand sort repeatedly pulls the longest already-increasing subsequence (a "strand") out of the input, then merges it into the result — much like the final merge step of merge sort, but without first splitting the array in half.',
  },

  problem: {
    ru: 'Сортировка слиянием эффективно объединяет уже отсортированные части, но сначала слепо делит массив пополам, не глядя на то, что в данных уже может быть естественный порядок. Если во входных данных уже встречаются длинные возрастающие участки (частично отсортированные данные, объединение нескольких предварительно отсортированных источников), хочется алгоритма, который распознаёт и использует эти участки напрямую, а не проходит через ненужное деление.',
    en: 'Merge sort efficiently combines already-sorted pieces, but first blindly splits the array in half, ignoring any order that might already exist in the data. If the input already contains long increasing runs (partially sorted data, several pre-sorted sources being combined), an algorithm that recognizes and uses those runs directly — rather than going through pointless splitting — is more appealing.',
  },

  solution: {
    ru: 'Из оставшихся (ещё не обработанных) элементов извлекается «прядь»: первый элемент берётся всегда, а следующие добавляются к пряди, только если они не меньше последнего элемента пряди — так формируется самая длинная возрастающая подпоследовательность, встречающаяся по порядку в оставшихся данных. Все элементы, не попавшие в прядь, остаются для следующей итерации. Готовая прядь сливается (как в сортировке слиянием) с уже накопленным результатом. Процесс повторяется, пока не останется необработанных элементов.',
    en: 'A "strand" is pulled from the remaining (not-yet-processed) elements: the first element is always taken, and subsequent elements join the strand only if they are not smaller than the strand\'s last element — this forms the longest increasing subsequence that appears in order within the remaining data. Elements that don\'t join the strand are kept for the next iteration. The finished strand is then merged (as in merge sort) into the result accumulated so far. This repeats until no elements remain.',
  },

  steps: [
    {
      title: { ru: 'Начать новую прядь', en: 'Start a new strand' },
      explanation: {
        ru: 'Взять первый из оставшихся элементов как начало новой пряди.',
        en: 'Take the first of the remaining elements as the start of a new strand.',
      },
    },
    {
      title: { ru: 'Собрать возрастающую подпоследовательность', en: 'Collect the increasing subsequence' },
      explanation: {
        ru: 'Пройти по оставшимся элементам по порядку, добавляя в прядь каждый, что не меньше последнего добавленного.',
        en: 'Walk the remaining elements in order, appending each one that is not smaller than the last one added to the strand.',
      },
    },
    {
      title: { ru: 'Отложить неподходящие элементы', en: 'Set aside the rest' },
      explanation: {
        ru: 'Элементы, не вошедшие в прядь, остаются в списке оставшихся для следующей итерации.',
        en: 'Elements that didn\'t join the strand stay in the remaining list for the next iteration.',
      },
    },
    {
      title: { ru: 'Слить прядь с результатом', en: 'Merge the strand into the result' },
      explanation: {
        ru: 'Готовая прядь сливается с уже накопленным отсортированным результатом, как в сортировке слиянием.',
        en: 'The finished strand is merged into the sorted result accumulated so far, just like in merge sort.',
      },
    },
    {
      title: { ru: 'Повторить до конца', en: 'Repeat until done' },
      explanation: {
        ru: 'Процесс повторяется, пока не останется необработанных элементов — тогда результат полностью отсортирован.',
        en: 'The process repeats until no elements remain unprocessed — at that point the result is fully sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function strandSort(arr) {
  let remaining = [...arr];
  let result = [];

  while (remaining.length) {
    const strand = [remaining[0]];
    const rest = [];
    for (let i = 1; i < remaining.length; i++) {
      if (remaining[i] >= strand[strand.length - 1]) {
        strand.push(remaining[i]);
      } else {
        rest.push(remaining[i]);
      }
    }
    remaining = rest;
    result = merge(result, strand);
  }
  return result;
}

function merge(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}`,
    python: `def strand_sort(arr):
    remaining = list(arr)
    result = []

    while remaining:
        strand = [remaining[0]]
        rest = []
        for x in remaining[1:]:
            if x >= strand[-1]:
                strand.append(x)
            else:
                rest.append(x)
        remaining = rest
        result = merge(result, strand)
    return result


def merge(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out`,
  },

  pros: [
    {
      ru: 'На частично отсортированных данных с длинными возрастающими участками ведёт себя близко к O(n), извлекая почти весь массив одной прядью.',
      en: 'On partially sorted data with long increasing runs, behaves close to O(n), pulling nearly the whole array out as one strand.',
    },
    {
      ru: 'Устойчив: слияние сохраняет относительный порядок равных элементов.',
      en: 'Stable: the merge step preserves the relative order of equal elements.',
    },
    {
      ru: 'Естественно подходит для связных списков — извлечение пряди и слияние выполняются через перестановку ссылок, без произвольного доступа по индексу, который нужен большинству других алгоритмов сортировки.',
      en: 'Naturally suited to linked lists — extracting a strand and merging can be done by relinking pointers, without the random index access most other sorting algorithms need.',
    },
  ],
  cons: [
    {
      ru: 'На случайных данных (без длинных естественных возрастающих участков) деградирует до O(n²), так как каждая прядь оказывается короткой.',
      en: 'On random data (with no long natural increasing runs) it degrades to O(n²), since each strand ends up short.',
    },
    {
      ru: 'Требует O(n) дополнительной памяти для промежуточных прядей и результата — не сортирует на месте.',
      en: 'Requires O(n) extra memory for the intermediate strands and result — does not sort in place.',
    },
    {
      ru: 'Менее предсказуем по производительности, чем сортировка слиянием, так как число и длина прядей зависят от структуры входных данных.',
      en: 'Less predictable in performance than merge sort, since the number and length of strands depend on the structure of the input data.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда входные данные представлены связным списком и уже частично упорядочены (например, объединение нескольких предварительно отсортированных потоков).',
      en: 'When the input is a linked list and is already partially ordered (for example, combining several pre-sorted streams).',
    },
    {
      ru: 'Как учебный пример алгоритма, использующего естественный порядок в данных, в противовес слепому делению массива пополам в классической сортировке слиянием.',
      en: 'As a teaching example of an algorithm that exploits natural order already present in the data, in contrast to merge sort\'s blind halving of the array.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Слияние нескольких предварительно отсортированных журналов или очередей событий** — если каждый источник уже упорядочен, стратегия «вытянуть длинную возрастающую цепочку и слить» эффективно объединяет их.',
      en: '**Merging several pre-sorted logs or event queues** — when each source is already ordered, the "pull out a long increasing chain and merge" strategy combines them efficiently.',
    },
    {
      ru: '**Реализации сортировки для связных списков** нередко используют идею прядей, поскольку извлечение подпоследовательности через перестановку указателей естественно для списков и избегает накладных расходов на произвольный доступ по индексу.',
      en: '**Linked-list sorting implementations** often use the strand idea, since extracting a subsequence via pointer relinking is natural for lists and avoids the overhead of random index access.',
    },
  ],

  relatedAlgorithms: ['merge-sort', 'tim-sort', 'patience-sort'],

  quiz: [
    {
      question: {
        ru: 'Что представляет собой «прядь» в сортировке прядями?',
        en: 'What is a "strand" in strand sort?',
      },
      options: [
        {
          ru: 'Самая длинная возрастающая подпоследовательность, встречающаяся по порядку в оставшихся элементах',
          en: 'The longest increasing subsequence appearing in order within the remaining elements',
        },
        { ru: 'Случайное подмножество элементов фиксированного размера', en: 'A random subset of elements of fixed size' },
        { ru: 'Половина массива, полученная делением пополам', en: 'Half of the array obtained by splitting it in two' },
        { ru: 'Единственный самый большой элемент массива', en: 'The single largest element of the array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Прядь собирается жадно: первый элемент берётся всегда, а следующий добавляется, только если он не меньше последнего добавленного.',
        en: 'The strand is built greedily: the first element is always taken, and the next joins only if it is not smaller than the last one added.',
      },
    },
    {
      question: {
        ru: 'Как готовая прядь объединяется с уже накопленным результатом?',
        en: 'How is a finished strand combined with the result accumulated so far?',
      },
      options: [
        { ru: 'Через слияние, как в сортировке слиянием', en: 'Via a merge, just like in merge sort' },
        { ru: 'Прядь просто дописывается в конец результата без изменений', en: 'The strand is simply appended to the end of the result unchanged' },
        { ru: 'Прядь и результат сортируются заново целиком', en: 'The strand and result are both re-sorted from scratch' },
        { ru: 'Прядь отбрасывается, если результат уже не пуст', en: 'The strand is discarded if the result is already non-empty' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку и прядь, и накопленный результат уже отсортированы по отдельности, их можно слить за линейное время, как два отсортированных списка.',
        en: 'Since both the strand and the accumulated result are already individually sorted, they can be merged in linear time like any two sorted lists.',
      },
    },
    {
      question: {
        ru: 'На каких данных сортировка прядями показывает лучшую производительность?',
        en: 'On which kind of data does strand sort perform best?',
      },
      options: [
        {
          ru: 'На данных с длинными естественными возрастающими участками',
          en: 'On data with long natural increasing runs',
        },
        { ru: 'На полностью случайных данных', en: 'On fully random data' },
        { ru: 'На данных, состоящих только из повторяющихся значений', en: 'On data consisting only of repeated values' },
        { ru: 'Производительность не зависит от структуры данных', en: 'Performance doesn\'t depend on the structure of the data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Чем длиннее естественные возрастающие участки, тем меньше итераций требуется, чтобы извлечь и слить все элементы.',
        en: 'The longer the natural increasing runs, the fewer iterations are needed to extract and merge all the elements.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка прядями хорошо подходит для связных списков?',
        en: 'Why is strand sort well suited to linked lists?',
      },
      options: [
        {
          ru: 'Извлечение пряди и слияние можно выполнить перестановкой ссылок, без произвольного доступа по индексу',
          en: 'Extracting a strand and merging can be done by relinking pointers, without random index access',
        },
        { ru: 'Связные списки нельзя сортировать никаким другим способом', en: 'Linked lists cannot be sorted any other way' },
        { ru: 'Потому что в связных списках элементы всегда уже отсортированы', en: 'Because elements in linked lists are always already sorted' },
        { ru: 'Потому что связные списки не поддерживают сравнение элементов', en: 'Because linked lists don\'t support comparing elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от алгоритмов, опирающихся на индексацию (например, быстрой сортировки), извлечение пряди естественно выражается через перестановку указателей.',
        en: 'Unlike algorithms that rely on indexing (such as quicksort), extracting a strand is naturally expressed through pointer relinking.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность сортировки прядями в худшем случае?',
        en: 'What is the worst-case time complexity of strand sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'В худшем случае (например, на обратно отсортированном массиве) каждая прядь состоит из одного элемента, что даёт квадратичное поведение, как у сортировки вставками.',
        en: 'In the worst case (e.g., a reverse-sorted array), every strand consists of a single element, giving quadratic behavior similar to insertion sort.',
      },
    },
  ],
};

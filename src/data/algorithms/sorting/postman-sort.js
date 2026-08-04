export const postmanSort = {
  slug: 'postman-sort',
  category: 'sorting',
  name: { ru: 'Postman Sort', en: 'Postman Sort' },
  complexity: {
    time: { best: 'O(n·k)', average: 'O(n·k)', worst: 'O(n·k)' },
    space: 'O(n + k)',
  },
  popularity: 1,
  tags: ['non-comparison', 'distribution', 'digit-based', 'stable'],

  intent: {
    ru: 'Почтовая сортировка названа по методу, которым реальные почтовые сортировочные машины раскладывают письма по индексу: сначала — по первой (самой значимой) цифре в отдельные лотки, а затем каждый лоток заново сортируется по следующей цифре, и так далее, пока письма не окажутся полностью упорядочены.',
    en: 'Postman sort is named after the method real postal sorting machines use to arrange mail by ZIP code: first bucket everything by the first (most significant) digit, then re-sort each bucket by the next digit, and so on, until the mail ends up fully ordered.',
  },

  problem: {
    ru: 'Классическая поразрядная сортировка (LSD radix sort) обрабатывает цифры от младшей к старшей — это просто и корректно, но требует пройтись по всем разрядам числа даже тогда, когда после первых нескольких проходов данные уже почти разложены по группам. Хочется способа сортировки по цифрам, начиная с самой значимой — так, как естественно раскладывают почту: сначала грубая раскладка по первому разряду индекса, а внутри каждой такой группы отдельно и независимо уточняется порядок по следующим разрядам.',
    en: 'Classic radix sort (LSD radix sort) processes digits from least to most significant — simple and correct, but it requires passing over every digit position even when, after the first few passes, the data is already nearly grouped. What\'s wanted is a way to sort by digits starting from the most significant one — the way mail is naturally sorted: a coarse first pass by the leading ZIP-code digit, then each resulting group is independently refined by the next digit.',
  },

  solution: {
    ru: 'Массив делится на 10 корзин по значению самой значимой (старшей) незадействованной цифры каждого числа. Затем для каждой заполненной корзины рекурсивно применяется тот же приём — деление на 10 корзин, но уже по следующей, менее значимой цифре — до тех пор, пока не будут исчерпаны все разряды или в корзине не останется не более одного элемента. Такая раскладка «от старшего разряда к младшему» (most-significant-digit-first) точно соответствует тому, как почтовая машина раскладывает письма: грубая сортировка по первой цифре индекса, а затем всё более точная — по следующим.',
    en: 'The array is split into 10 buckets by the value of each number\'s most significant not-yet-used digit. Then the same trick is applied recursively to every non-empty bucket — splitting into 10 buckets by the next, less significant digit — until digits run out or a bucket holds at most one element. This most-significant-digit-first distribution matches exactly how a postal sorting machine handles mail: a coarse first pass by the leading ZIP-code digit, then progressively finer passes on the following digits.',
  },

  steps: [
    {
      title: { ru: 'Определить число разрядов', en: 'Determine the digit count' },
      explanation: {
        ru: 'По максимальному значению в массиве вычислить, сколько десятичных разрядов нужно рассмотреть.',
        en: 'From the maximum value in the array, compute how many decimal digit positions need to be examined.',
      },
    },
    {
      title: { ru: 'Разложить по старшей цифре', en: 'Distribute by the leading digit' },
      explanation: {
        ru: 'Разложить текущий диапазон элементов по 10 корзинам, используя самую значимую ещё не использованную цифру.',
        en: 'Distribute the current range of elements into 10 buckets, using the most significant digit not yet used.',
      },
    },
    {
      title: { ru: 'Собрать корзины по порядку', en: 'Collect the buckets in order' },
      explanation: {
        ru: 'Записать содержимое корзин от 0 до 9 обратно в массив, сохраняя относительный порядок внутри каждой корзины.',
        en: 'Write the contents of buckets 0 through 9 back into the array, preserving the relative order within each bucket.',
      },
    },
    {
      title: { ru: 'Рекурсивно уточнить каждую корзину', en: 'Recursively refine each bucket' },
      explanation: {
        ru: 'Для каждой корзины с более чем одним элементом повторить раскладку по следующей, менее значимой цифре.',
        en: 'For each bucket with more than one element, repeat the distribution using the next, less significant digit.',
      },
    },
    {
      title: { ru: 'Остановиться', en: 'Stop' },
      explanation: {
        ru: 'Когда разряды закончились или в корзине остался один элемент, дальнейшая раскладка этой корзины не нужна — массив отсортирован.',
        en: 'When digits run out or a bucket holds only one element, that bucket needs no further distribution — the array is sorted.',
      },
    },
  ],

  implementation: {
    javascript: `function postmanSort(arr) {
  const n = arr.length;
  if (n === 0) return [];
  const a = [...arr];
  const max = Math.max(...a);
  const maxDigits = max > 0 ? String(max).length : 1;

  function msdSort(lo, hi, digitIndex) {
    if (hi - lo <= 1 || digitIndex < 0) return;
    const exp = 10 ** digitIndex;
    const buckets = Array.from({ length: 10 }, () => []);
    for (let i = lo; i < hi; i++) {
      const digit = Math.floor(a[i] / exp) % 10;
      buckets[digit].push(a[i]);
    }
    let idx = lo;
    const boundaries = [];
    for (const bucket of buckets) {
      boundaries.push(idx);
      for (const value of bucket) a[idx++] = value;
    }
    boundaries.push(hi);
    for (let b = 0; b < 10; b++) {
      msdSort(boundaries[b], boundaries[b + 1], digitIndex - 1);
    }
  }

  msdSort(0, n, maxDigits - 1);
  return a;
}`,
    python: `def postman_sort(arr):
    n = len(arr)
    if n == 0:
        return []
    a = list(arr)
    max_val = max(a)
    max_digits = len(str(max_val)) if max_val > 0 else 1

    def msd_sort(lo, hi, digit_index):
        if hi - lo <= 1 or digit_index < 0:
            return
        exp = 10 ** digit_index
        buckets = [[] for _ in range(10)]
        for i in range(lo, hi):
            digit = (a[i] // exp) % 10
            buckets[digit].append(a[i])
        idx = lo
        boundaries = []
        for bucket in buckets:
            boundaries.append(idx)
            for value in bucket:
                a[idx] = value
                idx += 1
        boundaries.append(hi)
        for b in range(10):
            msd_sort(boundaries[b], boundaries[b + 1], digit_index - 1)

    msd_sort(0, n, max_digits - 1)
    return a`,
  },

  pros: [
    {
      ru: 'Линейна по числу элементов и разрядов — O(n·k), где k — число цифр, без единого сравнения элементов друг с другом.',
      en: 'Linear in the number of elements and digits — O(n·k), where k is the digit count, with no direct comparisons between elements at all.',
    },
    {
      ru: 'Раскладка «от старшего разряда» позволяет рано завершать обработку корзин с одним элементом, не дожидаясь прохода по всем оставшимся разрядам — в отличие от LSD-варианта, который всегда проходит все разряды целиком.',
      en: 'Most-significant-digit-first distribution lets single-element buckets finish early, without waiting through the remaining digit passes — unlike the LSD variant, which always processes every digit position in full.',
    },
    {
      ru: 'Устойчива: относительный порядок элементов с одинаковым значением сохраняется внутри каждой корзины.',
      en: 'Stable: the relative order of elements with equal values is preserved within each bucket.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n + k) дополнительной памяти под корзины на каждом уровне рекурсии.',
      en: 'Requires O(n + k) extra memory for the buckets at each level of recursion.',
    },
    {
      ru: 'Применима только к данным с чёткой разрядной структурой (целые числа, строки фиксированной длины) — не подходит для произвольных сравнимых объектов.',
      en: 'Only applicable to data with a clear digit/positional structure (integers, fixed-length strings) — not suited to arbitrary comparable objects.',
    },
    {
      ru: 'Глубина рекурсии зависит от числа разрядов, а не от размера входных данных, что для очень больших чисел может потребовать аккуратной обработки стека вызовов.',
      en: 'Recursion depth depends on the digit count rather than the input size, which for very large numbers may require careful handling of the call stack.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные — целые числа или строки фиксированного формата (почтовые индексы, номера телефонов, идентификаторы), а нужна сортировка без сравнений, начиная с самой значимой части ключа.',
      en: 'When the data are integers or fixed-format strings (postal codes, phone numbers, identifiers) and a comparison-free sort is needed, starting from the most significant part of the key.',
    },
    {
      ru: 'Как учебный пример разницы между LSD- и MSD-поразрядной сортировкой — почтовая сортировка иллюстрирует MSD-подход на интуитивно понятном примере реальной почтовой сортировочной машины.',
      en: 'As a teaching example of the difference between LSD and MSD radix sort — postman sort illustrates the MSD approach through the intuitive example of a real postal sorting machine.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Почтовые сортировочные машины (mail sorting machines)**, используемые почтовыми службами по всему миру, физически раскладывают письма по лоткам сначала по первым цифрам индекса, а затем уточняют раскладку по следующим цифрам — именно этот процесс и дал алгоритму название.',
      en: '**Mail sorting machines** used by postal services worldwide physically route letters into bins first by the leading digits of the ZIP/postal code, then refine the routing using subsequent digits — this exact process is what gives the algorithm its name.',
    },
    {
      ru: '**MSD radix sort в базах данных и системах с префиксными индексами** (например, сортировка строк по префиксу) применяет тот же принцип «сначала самая значимая часть ключа», что удобно сочетается со структурами данных вроде trie.',
      en: '**MSD radix sort in databases and prefix-indexed systems** (e.g., sorting strings by prefix) applies the same "most significant part of the key first" principle, which pairs naturally with data structures like tries.',
    },
  ],

  relatedAlgorithms: ['radix-sort', 'bucket-sort', 'counting-sort'],

  quiz: [
    {
      question: {
        ru: 'С какой цифры начинает обработку почтовая сортировка?',
        en: 'Which digit does postman sort start processing from?',
      },
      options: [
        { ru: 'С самой значимой (старшей)', en: 'The most significant (leading) one' },
        { ru: 'С самой младшей, как в классическом LSD radix sort', en: 'The least significant one, as in classic LSD radix sort' },
        { ru: 'С произвольной, выбранной случайно на каждом проходе', en: 'A randomly chosen one on each pass' },
        { ru: 'Со средней цифры числа, чтобы разбить его на две симметричные половины', en: 'The middle digit of the number, to split it into two symmetric halves' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это MSD-подход (most-significant-digit-first) — грубая раскладка идёт по старшей цифре, а затем уточняется по следующим, как в реальной почтовой сортировке.',
        en: 'This is the MSD (most-significant-digit-first) approach — the coarse pass uses the leading digit, then refines using the following digits, just like real postal sorting.',
      },
    },
    {
      question: {
        ru: 'Чем почтовая сортировка принципиально отличается от классической поразрядной сортировки (radix sort) в этом курсе?',
        en: 'How does postman sort fundamentally differ from the classic radix sort covered elsewhere in this course?',
      },
      options: [
        {
          ru: 'Обрабатывает цифры от старшей к младшей (MSD), а не от младшей к старшей (LSD)',
          en: 'It processes digits from most to least significant (MSD) rather than least to most (LSD)',
        },
        { ru: 'Не использует корзины вообще, полагаясь только на сравнения элементов', en: 'It doesn\'t use buckets at all, relying only on element comparisons' },
        { ru: 'Работает только с отрицательными числами и не поддерживает положительные', en: 'It only works with negative numbers and doesn\'t support positive ones' },
        { ru: 'Требует предварительной сортировки входных данных перед первым проходом', en: 'It requires the input to already be pre-sorted before the first pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Radix sort в этом курсе — классический LSD-вариант; почтовая сортировка — MSD-вариант с рекурсивным уточнением внутри каждой корзины.',
        en: 'The radix sort covered elsewhere is the classic LSD variant; postman sort is the MSD variant, with recursive refinement inside each bucket.',
      },
    },
    {
      question: {
        ru: 'Когда рекурсивная раскладка корзины прекращается?',
        en: 'When does the recursive distribution of a bucket stop?',
      },
      options: [
        {
          ru: 'Когда разряды закончились или в корзине не более одного элемента',
          en: 'When digits run out or the bucket has at most one element',
        },
        { ru: 'После ровно трёх уровней рекурсии, независимо от числа разрядов', en: 'After exactly three levels of recursion, regardless of the digit count' },
        { ru: 'Когда сумма элементов корзины становится чётной по значению', en: 'When the sum of the bucket\'s elements becomes even-valued' },
        { ru: 'Никогда — рекурсия продолжается бесконечно на любом входе', en: 'Never — the recursion continues indefinitely on any input' },
      ],
      correct: 0,
      explanation: {
        ru: 'Корзина с одним элементом уже упорядочена сама по себе, а отсутствие оставшихся разрядов означает, что дальше делить нечем.',
        en: 'A single-element bucket is already trivially ordered, and running out of digits means there\'s nothing left to split on.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность почтовой сортировки?',
        en: 'What is the time complexity of postman sort?',
      },
      options: [
        { ru: 'O(n·k), где k — число разрядов', en: 'O(n·k), where k is the digit count' },
        { ru: 'O(n²), как у простых сортировок сравнением', en: 'O(n²), same as simple comparison sorts' },
        { ru: 'O(log n), благодаря бинарному делению корзин', en: 'O(log n), thanks to the binary division of buckets' },
        { ru: 'O(1), поскольку разряды обрабатываются параллельно', en: 'O(1), since digit positions are processed in parallel' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждый элемент обрабатывается один раз на каждом из k уровней разрядности, что даёт линейную по n·k сложность.',
        en: 'Each element is processed once at each of the k digit levels, giving a complexity linear in n·k.',
      },
    },
    {
      question: {
        ru: 'Является ли почтовая сортировка сортировкой сравнениями?',
        en: 'Is postman sort a comparison-based sort?',
      },
      options: [
        { ru: 'Нет — она распределяет элементы по цифрам, не сравнивая их напрямую друг с другом', en: 'No — it distributes elements by digit value, without directly comparing them to each other' },
        { ru: 'Да, как быстрая сортировка, сравнивающая пары элементов между собой', en: 'Yes, like quicksort, which compares pairs of elements against each other' },
        { ru: 'Да, но только для отрицательных чисел, где сравнение неизбежно', en: 'Yes, but only for negative numbers, where comparison is unavoidable' },
        { ru: 'Зависит от языка реализации и используемой платформы', en: 'It depends on the implementation language and platform used' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и другие поразрядные и корзинные сортировки, почтовая сортировка использует значения цифр для распределения по корзинам, а не сравнение пар элементов.',
        en: 'Like other radix and bucket sorts, postman sort uses digit values to distribute elements into buckets rather than comparing pairs of elements.',
      },
    },
  ],
};

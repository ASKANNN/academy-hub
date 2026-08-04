export const radixSort = {
  slug: 'radix-sort',
  category: 'sorting',
  name: { ru: 'Поразрядная сортировка', en: 'Radix Sort' },
  complexity: {
    time: { best: 'O(d · (n + k))', average: 'O(d · (n + k))', worst: 'O(d · (n + k))' },
    space: 'O(n + k)',
  },
  popularity: 2,
  tags: ['non-comparison', 'stable', 'integer-keys'],

  intent: {
    ru: 'Поразрядная сортировка упорядочивает числа, сортируя их многократно по одному разряду за раз — от младшего к старшему — используя на каждом шаге устойчивую сортировку подсчётом.',
    en: 'Radix sort orders numbers by sorting them repeatedly on one digit at a time — least significant first — using a stable counting sort at each pass.',
  },

  problem: {
    ru: 'Сортировка подсчётом быстра, но требует O(k) памяти, где k — диапазон значений; для чисел вроде номеров телефонов или паспортов (миллиарды возможных значений) это неприменимо, даже если элементов всего несколько тысяч. Нужен способ получить линейное время без создания счётчика на весь диапазон значений.',
    en: 'Counting sort is fast but needs O(k) memory, where k is the value range; for numbers like phone or passport numbers (billions of possible values) this is impractical even with only a few thousand elements. A way is needed to get linear time without a counter array spanning the whole value range.',
  },

  solution: {
    ru: 'Вместо того чтобы считать по всему значению целиком, алгоритм сортирует числа по одному разряду за раз, начиная с младшего (единицы, затем десятки, затем сотни и т.д.). Каждый проход — это устойчивая сортировка подсчётом с диапазоном ключей всего 0–9 (или 0 – (основание системы счисления − 1)), поэтому счётчик всегда маленький и фиксированного размера. Устойчивость критична: она гарантирует, что порядок, установленный на предыдущих (менее значимых) разрядах, не разрушается при сортировке по следующему, более значимому разряду. После обработки всех разрядов самого длинного числа массив полностью отсортирован.',
    en: 'Instead of counting over the whole value, the algorithm sorts numbers by one digit at a time, starting from the least significant (ones, then tens, then hundreds, and so on). Each pass is a stable counting sort over a tiny fixed key range of 0–9 (or 0 to base−1), so the counter array is always small and fixed-size. Stability is critical: it guarantees the ordering established by earlier, less significant digits isn\'t destroyed while sorting by the next, more significant one. After processing every digit of the longest number, the array is fully sorted.',
  },

  steps: [
    {
      title: { ru: 'Найти максимальное число разрядов', en: 'Find the max digit count' },
      explanation: {
        ru: 'Определить наибольшее значение в массиве, чтобы узнать, сколько разрядных проходов потребуется.',
        en: 'Find the largest value in the array to know how many digit passes are needed.',
      },
    },
    {
      title: { ru: 'Взять текущий разряд', en: 'Take the current digit' },
      explanation: {
        ru: 'Начиная с единиц, выделить текущий разряд каждого числа (`Math.floor(value / exp) % 10`).',
        en: 'Starting from the ones place, extract the current digit of every number (`Math.floor(value / exp) % 10`).',
      },
    },
    {
      title: { ru: 'Устойчиво отсортировать по разряду', en: 'Stably sort by that digit' },
      explanation: {
        ru: 'Разложить числа по «корзинам» 0–9 по значению текущего разряда, сохраняя относительный порядок внутри каждой корзины.',
        en: 'Distribute numbers into "buckets" 0–9 by the current digit\'s value, preserving relative order within each bucket.',
      },
    },
    {
      title: { ru: 'Собрать массив заново', en: 'Reassemble the array' },
      explanation: {
        ru: 'Соединить содержимое корзин по порядку от 0 до 9 — это и есть промежуточно отсортированный (по текущему разряду) массив.',
        en: 'Concatenate the buckets in order from 0 to 9 — this is the array sorted so far by the current digit.',
      },
    },
    {
      title: { ru: 'Перейти к следующему разряду', en: 'Move to the next digit' },
      explanation: {
        ru: 'Повторить процесс для десятков, сотен и так далее, пока не будет обработан самый старший разряд наибольшего числа.',
        en: 'Repeat the process for tens, hundreds, and so on, until the most significant digit of the largest number has been processed.',
      },
    },
  ],

  implementation: {
    javascript: `function radixSort(arr) {
  if (arr.length === 0) return [];
  let a = [...arr];
  const max = Math.max(...a);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (const value of a) {
      const digit = Math.floor(value / exp) % 10;
      buckets[digit].push(value);
    }
    a = buckets.flat();
  }
  return a;
}`,
    python: `def radix_sort(arr):
    if not arr:
        return []
    a = arr.copy()
    max_val = max(a)

    exp = 1
    while max_val // exp > 0:
        buckets = [[] for _ in range(10)]
        for value in a:
            digit = (value // exp) % 10
            buckets[digit].append(value)
        a = [v for bucket in buckets for v in bucket]
        exp *= 10
    return a`,
  },

  pros: [
    {
      ru: 'Линейное время O(d · n) при фиксированном числе разрядов d — на практике быстрее любой сравнивающей сортировки для чисел ограниченной длины.',
      en: 'Linear O(d · n) time for a fixed digit count d — in practice faster than any comparison sort for bounded-length numbers.',
    },
    {
      ru: 'В отличие от counting sort, не требует памяти, пропорциональной всему диапазону значений — только 10 корзин на проход.',
      en: 'Unlike counting sort, doesn\'t need memory proportional to the whole value range — just 10 buckets per pass.',
    },
    {
      ru: 'Устойчив, что делает его пригодным для многоключевой сортировки (например, сначала по фамилии, потом по имени).',
      en: 'Stable, which makes it suitable for multi-key sorting (e.g. sort by last name, then by first name).',
    },
  ],
  cons: [
    {
      ru: 'Число разрядов d зависит от максимального значения — для чисел с очень большим разбросом (например, одно огромное число среди мелких) это невыгодно.',
      en: 'The digit count d depends on the maximum value — for numbers with a huge spread (e.g. one giant number among small ones), this is wasteful.',
    },
    {
      ru: 'Ограничен целыми числами (или строками фиксированной структуры) — не годится напрямую для чисел с плавающей точкой или произвольных объектов.',
      en: 'Limited to integers (or fixed-structure strings) — not directly applicable to floating-point numbers or arbitrary objects.',
    },
    {
      ru: 'Требует дополнительной памяти под корзины на каждом проходе, в отличие от сортировок на месте вроде quicksort.',
      en: 'Needs extra memory for buckets on every pass, unlike in-place sorts like quicksort.',
    },
  ],

  whenToUse: [
    {
      ru: 'Для сортировки больших массивов целых чисел ограниченной разрядности — идентификаторов, телефонных номеров, почтовых индексов.',
      en: 'For sorting large arrays of bounded-length integers — IDs, phone numbers, postal codes.',
    },
    {
      ru: 'Как основа для LSD-сортировки строк одинаковой длины, где «разряд» — это символ в определённой позиции.',
      en: 'As the basis for LSD string sorting of equal-length strings, where the "digit" is a character at a given position.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Сортировка карточек в механических табуляторах** (США, перепись населения 1890 года) — исторически первое массовое применение идеи поразрядной сортировки, ещё до появления компьютеров.',
      en: '**Punch-card sorting in mechanical tabulators** (US 1890 census) — historically the first mass application of the radix-sort idea, predating computers.',
    },
    {
      ru: '**Сортировка IP-адресов и MAC-адресов** в сетевом оборудовании часто использует поразрядный подход из-за фиксированной битовой длины ключей.',
      en: '**Sorting IP addresses and MAC addresses** in networking equipment often uses a radix approach because of the fixed bit-length of the keys.',
    },
  ],

  relatedAlgorithms: ['counting-sort', 'bucket-sort'],

  quiz: [
    {
      question: {
        ru: 'В каком порядке поразрядная сортировка (LSD) обрабатывает разряды числа?',
        en: 'In what order does (LSD) radix sort process digits?',
      },
      options: [
        { ru: 'От младшего разряда к старшему', en: 'From least significant to most significant' },
        { ru: 'От старшего разряда к младшему', en: 'From most significant to least significant' },
        { ru: 'В случайном порядке', en: 'In random order' },
        { ru: 'Одновременно все разряды', en: 'All digits simultaneously' },
      ],
      correct: 0,
      explanation: {
        ru: 'LSD (least significant digit) сортировка начинает с единиц и постепенно переходит к более значимым разрядам, полагаясь на устойчивость каждого прохода.',
        en: 'LSD (least significant digit) sort starts from the ones place and moves toward more significant digits, relying on the stability of each pass.',
      },
    },
    {
      question: {
        ru: 'Почему устойчивость сортировки подсчётом критична внутри поразрядной сортировки?',
        en: 'Why is counting sort\'s stability critical inside radix sort?',
      },
      options: [
        { ru: 'Без неё порядок, установленный предыдущими разрядами, был бы разрушен', en: 'Without it, the ordering established by earlier digits would be destroyed' },
        { ru: 'Она ускоряет каждый отдельный проход', en: 'It speeds up each individual pass' },
        { ru: 'Она уменьшает объём используемой памяти', en: 'It reduces the memory used' },
        { ru: 'Она нужна только для отрицательных чисел', en: 'It\'s only needed for negative numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если бы сортировка по текущему разряду не была устойчивой, она могла бы перемешать элементы, уже правильно упорядоченные по младшим разрядам с предыдущих проходов.',
        en: 'If the sort on the current digit weren\'t stable, it could scramble elements already correctly ordered by lower digits from previous passes.',
      },
    },
    {
      question: {
        ru: 'От чего зависит число проходов d в поразрядной сортировке?',
        en: 'What determines the number of passes d in radix sort?',
      },
      options: [
        { ru: 'От количества разрядов в наибольшем числе массива', en: 'The number of digits in the largest value in the array' },
        { ru: 'От количества элементов в массиве', en: 'The number of elements in the array' },
        { ru: 'От того, отсортирован ли массив изначально', en: 'Whether the array is already sorted' },
        { ru: 'Всегда фиксировано и равно 10', en: 'It\'s always fixed at 10' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм проходит по разрядам, пока не обработает самый старший разряд наибольшего числа — значит d равно количеству разрядов этого числа.',
        en: 'The algorithm processes digits until it handles the most significant digit of the largest value — so d equals that value\'s digit count.',
      },
    },
    {
      question: {
        ru: 'Когда поразрядная сортировка становится невыгодной по сравнению с обычной сортировкой сравнением?',
        en: 'When does radix sort stop being worthwhile compared to a comparison sort?',
      },
      options: [
        { ru: 'Когда одно число в массиве намного длиннее остальных', en: 'When one number in the array is far longer than the rest' },
        { ru: 'Когда массив уже отсортирован', en: 'When the array is already sorted' },
        { ru: 'Когда все элементы различны', en: 'When all elements are distinct' },
        { ru: 'Когда массив содержит менее 10 элементов', en: 'When the array has fewer than 10 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Число проходов d определяется наибольшим значением — один аномально длинный «выброс» заставляет делать много проходов ради небольшого числа коротких чисел.',
        en: 'The pass count d is set by the largest value — one abnormally long "outlier" forces many passes for the sake of a few short numbers.',
      },
    },
    {
      question: {
        ru: 'Сколько «корзин» используется на каждом проходе при сортировке по десятичным разрядам?',
        en: 'How many "buckets" are used per pass when sorting by decimal digits?',
      },
      options: [
        { ru: '10 — по одной на каждое значение цифры от 0 до 9', en: '10 — one for each digit value from 0 to 9' },
        { ru: 'Столько же, сколько элементов в массиве', en: 'As many as there are elements in the array' },
        { ru: '2 — чётные и нечётные значения', en: '2 — even and odd values' },
        { ru: 'Диапазон значений всего массива', en: 'The value range of the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку каждый разряд — это цифра от 0 до 9, счётчик/корзины внутренней сортировки подсчётом всегда фиксированного размера 10, независимо от диапазона исходных чисел.',
        en: 'Since each digit is a value 0–9, the inner counting sort\'s counters/buckets are always a fixed size of 10, regardless of the original numbers\' range.',
      },
    },
  ],
};

export const radixSort = {
  slug: 'radix-sort',
  category: 'sorting',
  name: { ru: 'Radix Sort', en: 'Radix Sort' },
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
  stepBreakpoints: [2, 4, 7, 9],

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
      hint: {
        ru: 'Расшифровка аббревиатуры LSD подсказывает ответ: с какого конца числа начинается обработка?',
        en: 'The LSD abbreviation itself is a hint: which end of the number does processing start from?',
      },
    },
    {
      question: {
        ru: 'Почему устойчивость сортировки подсчётом критична внутри поразрядной сортировки?',
        en: 'Why is counting sort\'s stability critical inside radix sort?',
      },
      options: [
        { ru: 'Без неё порядок, установленный предыдущими разрядами, был бы разрушен', en: 'Without it, the ordering established by earlier digits would be destroyed' },
        { ru: 'Она ускоряет каждый отдельный проход, так как позволяет пропускать сравнения', en: 'It speeds up each individual pass, since it lets the pass skip comparisons' },
        { ru: 'Она уменьшает объём используемой памяти, как и при сортировке слиянием', en: 'It reduces the memory used, the same way merge sort does' },
        { ru: 'Она нужна только для отрицательных чисел, из-за особенностей их представления', en: 'It\'s only needed for negative numbers, because of how they\'re represented' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если бы сортировка по текущему разряду не была устойчивой, она могла бы перемешать элементы, уже правильно упорядоченные по младшим разрядам с предыдущих проходов.',
        en: 'If the sort on the current digit weren\'t stable, it could scramble elements already correctly ordered by lower digits from previous passes.',
      },
      hint: {
        ru: 'Что случится с порядком, установленным на прошлом проходе, если следующий проход не сохранит относительный порядок равных элементов?',
        en: 'What happens to the order set by the previous pass if the next pass doesn\'t preserve the relative order of equal elements?',
      },
    },
    {
      question: {
        ru: 'От чего зависит число проходов d в поразрядной сортировке?',
        en: 'What determines the number of passes d in radix sort?',
      },
      options: [
        { ru: 'От количества разрядов в наибольшем числе массива', en: 'The number of digits in the largest value in the array' },
        { ru: 'От количества элементов в массиве, поскольку каждый проход обрабатывает их все', en: 'The number of elements in the array, since every pass has to process each one' },
        { ru: 'От того, отсортирован ли массив изначально, как и в сортировке вставками', en: 'Whether the array is already sorted, similar to insertion sort' },
        { ru: 'Всегда фиксировано и равно 10, независимо от входных данных', en: 'It\'s always fixed at 10, regardless of the input data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм проходит по разрядам, пока не обработает самый старший разряд наибольшего числа — значит d равно количеству разрядов этого числа.',
        en: 'The algorithm processes digits until it handles the most significant digit of the largest value — so d equals that value\'s digit count.',
      },
      hint: {
        ru: 'Алгоритм должен обработать все разряды хотя бы одного числа. Какое число задаёт верхнюю границу числа проходов?',
        en: 'The algorithm must process every digit position of at least one number. Which number sets the upper bound on the pass count?',
      },
    },
    {
      question: {
        ru: 'Когда поразрядная сортировка становится невыгодной по сравнению с обычной сортировкой сравнением?',
        en: 'When does radix sort stop being worthwhile compared to a comparison sort?',
      },
      options: [
        { ru: 'Когда одно число в массиве намного длиннее остальных', en: 'When one number in the array is far longer than the rest' },
        { ru: 'Когда массив уже отсортирован, ведь тогда сравнения становятся бесполезными', en: 'When the array is already sorted, since comparisons become pointless at that point' },
        { ru: 'Когда все элементы различны, потому что дубликаты ускоряют проходы', en: 'When all elements are distinct, because duplicates would otherwise speed up the passes' },
        { ru: 'Когда массив содержит менее 10 элементов, как и для большинства простых сортировок', en: 'When the array has fewer than 10 elements, as with most simple sorts' },
      ],
      correct: 0,
      explanation: {
        ru: 'Число проходов d определяется наибольшим значением — один аномально длинный «выброс» заставляет делать много проходов ради небольшого числа коротких чисел.',
        en: 'The pass count d is set by the largest value — one abnormally long "outlier" forces many passes for the sake of a few short numbers.',
      },
      hint: {
        ru: 'Какое единственное число во входных данных диктует количество проходов, и что происходит, если это число аномально велико?',
        en: 'Which single number in the input dictates the pass count, and what happens when that number is abnormally large?',
      },
    },
    {
      question: {
        ru: 'Сколько «корзин» используется на каждом проходе при сортировке по десятичным разрядам?',
        en: 'How many "buckets" are used per pass when sorting by decimal digits?',
      },
      options: [
        { ru: '10 — по одной корзине на каждую цифру', en: '10 — one for each digit value from 0 to 9' },
        { ru: 'Столько же, сколько элементов в массиве', en: 'As many as there are elements in the array' },
        { ru: '2 — чётные и нечётные значения', en: '2 — even and odd values' },
        { ru: 'Диапазон значений всего массива', en: 'The value range of the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку каждый разряд — это цифра от 0 до 9, счётчик/корзины внутренней сортировки подсчётом всегда фиксированного размера 10, независимо от диапазона исходных чисел.',
        en: 'Since each digit is a value 0–9, the inner counting sort\'s counters/buckets are always a fixed size of 10, regardless of the original numbers\' range.',
      },
      hint: {
        ru: 'Сколько возможных значений может принимать одна десятичная цифра?',
        en: 'How many possible values can a single decimal digit take?',
      },
    },
    {
      question: {
        ru: 'Чем поразрядная сортировка лучше сортировки подсчётом для больших чисел?',
        en: 'Why is radix sort better than counting sort for large numbers?',
      },
      options: [
        { ru: 'Только 10 счётчиков на проход, а не счётчик для каждого возможного значения', en: 'It uses only 10 counters per pass, not a counter for every possible value' },
        { ru: 'Она работает быстрее, потому что делает меньше проходов, чем сортировка подсчётом', en: 'It runs faster because it makes fewer passes than counting sort always does' },
        { ru: 'Она не требует дополнительной памяти, сортируя элементы полностью на месте', en: 'It needs no extra memory, sorting elements entirely in place without any buffers' },
        { ru: 'Она может сортировать отрицательные числа, а сортировка подсчётом — никогда', en: 'It can sort negative numbers while counting sort can never handle them at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка подсчётом требует массив счётчиков размером во весь диапазон значений. Поразрядная разбивает задачу на проходы по одному разряду, каждый из которых требует всего 10 счётчиков.',
        en: 'Counting sort requires a counter array as large as the entire value range. Radix sort breaks the task into single-digit passes, each needing only 10 counters.',
      },
      hint: {
        ru: 'Сколько счётчиков нужно сортировке подсчётом для чисел от 0 до миллиарда — и сколько нужно поразрядной сортировке на один проход?',
        en: 'How many counters does counting sort need for numbers from 0 to one billion — and how many does radix sort need per pass?',
      },
    },
    {
      question: {
        ru: 'Можно ли применить поразрядную сортировку к строкам?',
        en: 'Can radix sort be applied to strings?',
      },
      options: [
        { ru: 'Да — для строк одной длины «разрядом» служит символ в заданной позиции', en: 'Yes — for equal-length strings, each character position serves as a digit' },
        { ru: 'Нет — строки невозможно сортировать без попарного сравнения символов', en: 'No — strings cannot be sorted without pairwise character comparisons' },
        { ru: 'Да, но только для строк, содержащих исключительно цифровые символы от 0 до 9', en: 'Yes, but only for strings containing exclusively digit characters from 0 to 9' },
        { ru: 'Нет — алгоритм требует числового типа данных и не работает с символами', en: 'No — the algorithm requires a numeric data type and cannot handle characters at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поразрядная сортировка обобщается на строки фиксированной длины: позиция символа играет роль «разряда», а код символа — роль «цифры». Именно на этой идее строится быстрая сортировка строк LSD.',
        en: 'Radix sort generalizes to fixed-length strings: the character position plays the role of "digit place," and the character code plays the role of "digit value." This is the basis of LSD string sorting.',
      },
      hint: {
        ru: 'Что является «разрядом» для строки, если применить аналогию с числами?',
        en: 'What serves as a "digit position" for a string if you apply the analogy with numbers?',
      },
    },
    {
      question: {
        ru: 'Какое основание системы счисления (base) чаще всего используется в реализациях поразрядной сортировки на практике и почему?',
        en: 'What numeral base is most often used in practical radix sort implementations, and why?',
      },
      options: [
        { ru: '256 — равно размеру байта, удобно для работы с числами в битовом представлении', en: '256 — matches the byte size, which is convenient for working with bit representations of numbers' },
        { ru: '10 — десятичная система наиболее привычна людям и самая быстрая для процессора', en: '10 — the decimal system is most natural for humans and is the fastest base for the processor to use' },
        { ru: '2 — двоичная арифметика всегда быстрее любого другого основания на любом процессоре', en: '2 — binary arithmetic is always faster than any other base on any processor' },
        { ru: '16 — шестнадцатеричное основание минимизирует число проходов для любых данных', en: '16 — hexadecimal base minimizes the number of passes for any possible data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Основание 256 (один байт) позволяет разделить 32-битное целое всего на 4 прохода, каждый с 256 корзинами. Это даёт отличный баланс между числом проходов и размером счётчиков.',
        en: 'Base 256 (one byte) splits a 32-bit integer into just 4 passes, each with 256 buckets. This gives an excellent balance between pass count and counter-array size.',
      },
      hint: {
        ru: 'Подумайте о том, какой единицей данных оперирует процессор — и какое основание позволяет минимизировать число проходов для 32-битных чисел.',
        en: 'Think about what unit of data a processor naturally works with — and which base minimizes passes for 32-bit integers.',
      },
    },
    {
      question: {
        ru: 'Как изменится число проходов поразрядной сортировки, если все числа в массиве трёхзначные?',
        en: 'How many passes does radix sort make if all numbers in the array are three-digit numbers?',
      },
      options: [
        { ru: 'Ровно 3 прохода — по одному на каждый разряд', en: 'Exactly 3 passes — one for each digit position' },
        { ru: 'Зависит от количества элементов, а не от числа разрядов', en: 'It depends on the element count, not the digit count' },
        { ru: '10 проходов — по одному на каждое возможное значение цифры', en: '10 passes — one for each possible digit value' },
        { ru: '1 проход — если все числа попадают в одну корзину при первом разряде', en: '1 pass — if all numbers land in one bucket on the first digit' },
      ],
      correct: 0,
      explanation: {
        ru: 'Число проходов равно числу разрядов наибольшего числа в массиве. Все трёхзначные числа — значит наибольшее тоже трёхзначное, и достаточно ровно трёх проходов.',
        en: 'The pass count equals the digit count of the largest number in the array. All three-digit numbers means the largest is also three digits, so exactly three passes suffice.',
      },
      hint: {
        ru: 'Сколько разрядов у трёхзначного числа — и сколько проходов делает алгоритм по разрядам?',
        en: 'How many digit positions does a three-digit number have — and how many passes does the algorithm make per digit position?',
      },
    },
    {
      question: {
        ru: 'Является ли поразрядная сортировка алгоритмом сравнения?',
        en: 'Is radix sort a comparison-based algorithm?',
      },
      options: [
        { ru: 'Нет — она раскладывает по значению разряда, а не сравнивает пары элементов', en: 'No — it distributes elements by digit value rather than comparing pairs of elements' },
        { ru: 'Да — каждый проход сравнивает соседние элементы, как в сортировке пузырьком', en: 'Yes — each pass compares neighboring elements just like bubble sort does' },
        { ru: 'Да, но только в первом проходе, когда определяется максимальный элемент', en: 'Yes, but only in the very first pass when the maximum element is being determined always' },
        { ru: 'Зависит от основания: при base=2 это сортировка сравнением, при base=10 — нет', en: 'It depends on the base: at base=2 it is a comparison sort, at base=10 it is not' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поразрядная сортировка не принадлежит к классу алгоритмов сравнения — она обходит нижнюю границу Ω(n log n), используя не сравнения пар элементов, а чтение разрядов ключей.',
        en: 'Radix sort does not belong to the comparison-based class — it bypasses the Ω(n log n) lower bound by reading digit values rather than comparing pairs of elements.',
      },
      hint: {
        ru: 'Нижняя граница Ω(n log n) применяется к сортировкам сравнением. Нарушает ли поразрядная сортировка эту границу — и если да, то как?',
        en: 'The Ω(n log n) lower bound applies to comparison sorts. Does radix sort violate that bound — and if so, how?',
      },
    },
  ],
};

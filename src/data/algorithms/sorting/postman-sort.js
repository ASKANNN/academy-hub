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
    ru: 'Почтовая сортировка названа по методу, которым реальные почтовые сортировочные машины раскладывают письма по индексу: сначала - по первой (самой значимой) цифре в отдельные лотки, а затем каждый лоток заново сортируется по следующей цифре, и так далее, пока письма не окажутся полностью упорядочены.',
    en: 'Postman sort is named after the method real postal sorting machines use to arrange mail by ZIP code: first bucket everything by the first (most significant) digit, then re-sort each bucket by the next digit, and so on, until the mail ends up fully ordered.',
  },

  problem: {
    ru: 'Классическая поразрядная сортировка (LSD radix sort) обрабатывает цифры от младшей к старшей - это просто и корректно, но требует пройтись по всем разрядам числа даже тогда, когда после первых нескольких проходов данные уже почти разложены по группам. Хочется способа сортировки по цифрам, начиная с самой значимой - так, как естественно раскладывают почту: сначала грубая раскладка по первому разряду индекса, а внутри каждой такой группы отдельно и независимо уточняется порядок по следующим разрядам.',
    en: 'Classic radix sort (LSD radix sort) processes digits from least to most significant - simple and correct, but it requires passing over every digit position even when, after the first few passes, the data is already nearly grouped. What\'s wanted is a way to sort by digits starting from the most significant one - the way mail is naturally sorted: a coarse first pass by the leading ZIP-code digit, then each resulting group is independently refined by the next digit.',
  },

  solution: {
    ru: 'Массив делится на 10 корзин по значению самой значимой (старшей) незадействованной цифры каждого числа. Затем для каждой заполненной корзины рекурсивно применяется тот же приём - деление на 10 корзин, но уже по следующей, менее значимой цифре - до тех пор, пока не будут исчерпаны все разряды или в корзине не останется не более одного элемента. Такая раскладка «от старшего разряда к младшему» (most-significant-digit-first) точно соответствует тому, как почтовая машина раскладывает письма: грубая сортировка по первой цифре индекса, а затем всё более точная - по следующим.',
    en: 'The array is split into 10 buckets by the value of each number\'s most significant not-yet-used digit. Then the same trick is applied recursively to every non-empty bucket - splitting into 10 buckets by the next, less significant digit - until digits run out or a bucket holds at most one element. This most-significant-digit-first distribution matches exactly how a postal sorting machine handles mail: a coarse first pass by the leading ZIP-code digit, then progressively finer passes on the following digits.',
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
        ru: 'Когда разряды закончились или в корзине остался один элемент, дальнейшая раскладка этой корзины не нужна - массив отсортирован.',
        en: 'When digits run out or a bucket holds only one element, that bucket needs no further distribution - the array is sorted.',
      },
    },
  ],
  stepBreakpoints: [3, 11, 14, 17],

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

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`postmanSort` вычисляет число разрядов и делегирует всю работу вложенной рекурсивной функции `msdSort`.',
          en: '`postmanSort` computes the digit count and delegates all the work to the nested recursive function `msdSort`.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Длина и пустой массив', en: 'Length and the empty-array guard' },
        explanation: {
          ru: '`n` кешируется один раз; для пустого входа сразу возвращается пустой массив.',
          en: '`n` is cached once; an empty input returns an empty array immediately.',
        },
      },
      {
        lines: [4, 6],
        title: { ru: 'Копия массива и число разрядов', en: 'Array copy and digit count' },
        explanation: {
          ru: '`a` - копия входного массива, сортируемая на месте внутри неё. `maxDigits` - количество десятичных разрядов наибольшего значения, то есть верхняя граница глубины рекурсии MSD.',
          en: '`a` is a copy of the input array, sorted in place inside it. `maxDigits` is the decimal digit count of the largest value - the upper bound on the MSD recursion depth.',
        },
      },
      {
        lines: [8, 9],
        title: { ru: 'Сигнатура msdSort и базовый случай', en: 'The msdSort signature and base case' },
        explanation: {
          ru: '`msdSort(lo, hi, digitIndex)` обрабатывает диапазон `[lo, hi)` массива `a` по разряду `digitIndex`. Если в диапазоне не больше одного элемента или разряды закончились (`digitIndex < 0`) - дальше сортировать нечего, функция сразу возвращается.',
          en: '`msdSort(lo, hi, digitIndex)` processes the range `[lo, hi)` of `a` by digit `digitIndex`. If the range holds at most one element, or digits have run out (`digitIndex < 0`), there\'s nothing left to sort, so the function returns immediately.',
        },
      },
      {
        lines: [10, 11],
        title: { ru: 'Множитель разряда и корзины', en: 'The digit multiplier and buckets' },
        explanation: {
          ru: '`exp = 10 ** digitIndex` переводит номер разряда в множитель для его извлечения (сотни - `exp=100`, десятки - `exp=10` и т.д.). `buckets` - 10 пустых массивов, по одному на каждую возможную цифру 0-9.',
          en: '`exp = 10 ** digitIndex` converts the digit position into a multiplier used to extract it (hundreds → `exp=100`, tens → `exp=10`, and so on). `buckets` is 10 empty arrays, one for each possible digit 0-9.',
        },
      },
      {
        lines: [12, 15],
        title: { ru: 'Раскладка по текущему разряду', en: 'Distributing by the current digit' },
        explanation: {
          ru: 'Для каждого элемента диапазона `[lo, hi)` вычисляется его цифра на позиции `digitIndex` (`Math.floor(a[i] / exp) % 10`), и элемент добавляется в конец соответствующей корзины - порядок внутри корзины сохраняется, что и обеспечивает устойчивость.',
          en: 'For every element in the range `[lo, hi)`, its digit at position `digitIndex` is computed (`Math.floor(a[i] / exp) % 10`), and the element is appended to the matching bucket - preserving order within a bucket, which is exactly what makes the sort stable.',
        },
      },
      {
        lines: [16, 21],
        title: { ru: 'Сборка корзин обратно с границами', en: 'Reassembling buckets with boundaries' },
        explanation: {
          ru: 'Корзины 0-9 записываются обратно в `a`, начиная с `idx = lo`. Массив `boundaries` запоминает, с какого индекса `a` начиналось содержимое каждой корзины - эти границы понадобятся, чтобы дать рекурсии точный диапазон для каждой корзины.',
          en: 'Buckets 0-9 are written back into `a`, starting at `idx = lo`. The `boundaries` array records at which index of `a` each bucket\'s contents started - these boundaries are what let the recursion give each bucket its exact range.',
        },
      },
      {
        lines: [22],
        title: { ru: 'Замыкающая граница', en: 'The closing boundary' },
        explanation: {
          ru: '`boundaries.push(hi)` добавляет финальную границу - конец последней (девятой) корзины совпадает с концом всего исходного диапазона `hi`.',
          en: '`boundaries.push(hi)` adds the final boundary - the end of the last (ninth) bucket coincides with the end of the whole original range `hi`.',
        },
      },
      {
        lines: [23, 25],
        title: { ru: 'Рекурсия по каждой корзине', en: 'Recursing into each bucket' },
        explanation: {
          ru: 'Для каждой из 10 корзин `msdSort` вызывается на её собственном диапазоне `[boundaries[b], boundaries[b+1])` со следующим, менее значимым разрядом. Корзины с 0-1 элементом (или исчерпанными разрядами) завершатся мгновенно на строке 9 - именно в этом источник ранней остановки MSD-подхода.',
          en: 'For each of the 10 buckets, `msdSort` is called on its own range `[boundaries[b], boundaries[b+1])` with the next, less significant digit. Buckets with 0-1 elements (or exhausted digits) return instantly at line 9 - this is exactly where MSD\'s early-exit behavior comes from.',
        },
      },
      {
        lines: [28, 29],
        title: { ru: 'Запуск и возврат', en: 'Kicking off and returning' },
        explanation: {
          ru: 'Начальный вызов обрабатывает весь массив (`[0, n)`) со старшего разряда `maxDigits - 1`. После того как рекурсия развернётся, `a` полностью отсортирован и возвращается.',
          en: 'The initial call processes the whole array (`[0, n)`) starting at the most significant digit `maxDigits - 1`. Once the recursion unwinds, `a` is fully sorted and gets returned.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`postman_sort` вычисляет число разрядов и делегирует работу вложенной функции `msd_sort`, как и JS-версия.',
          en: '`postman_sort` computes the digit count and delegates the work to the nested `msd_sort` function, same as the JS version.',
        },
      },
      {
        lines: [2, 4],
        title: { ru: 'Длина и пустой список', en: 'Length and the empty-list guard' },
        explanation: {
          ru: '`n` кешируется один раз; пустой вход сразу возвращает пустой список.',
          en: '`n` is cached once; an empty input returns an empty list right away.',
        },
      },
      {
        lines: [5, 7],
        title: { ru: 'Копия списка и число разрядов', en: 'List copy and digit count' },
        explanation: {
          ru: '`a` - копия входного списка. `max_digits` - число десятичных разрядов наибольшего значения, вычисленное через длину его строкового представления.',
          en: '`a` is a copy of the input list. `max_digits` is the decimal digit count of the largest value, computed via the length of its string representation.',
        },
      },
      {
        lines: [9, 11],
        title: { ru: 'Сигнатура msd_sort и базовый случай', en: 'The msd_sort signature and base case' },
        explanation: {
          ru: '`msd_sort(lo, hi, digit_index)` обрабатывает диапазон `[lo, hi)` по разряду `digit_index`. При диапазоне из 0-1 элемента или закончившихся разрядах рекурсия немедленно останавливается.',
          en: '`msd_sort(lo, hi, digit_index)` processes the range `[lo, hi)` by digit `digit_index`. With a 0-1 element range or exhausted digits, the recursion stops immediately.',
        },
      },
      {
        lines: [12, 13],
        title: { ru: 'Множитель разряда и корзины', en: 'The digit multiplier and buckets' },
        explanation: {
          ru: '`exp = 10 ** digit_index` - тот же множитель, что и в JS. `buckets` - список из 10 пустых списков.',
          en: '`exp = 10 ** digit_index` is the same multiplier as in JS. `buckets` is a list of 10 empty lists.',
        },
      },
      {
        lines: [14, 16],
        title: { ru: 'Раскладка по текущему разряду', en: 'Distributing by the current digit' },
        explanation: {
          ru: 'Для каждого индекса в `[lo, hi)` вычисляется цифра `(a[i] // exp) % 10`, и элемент добавляется в конец нужной корзины - порядок внутри корзины сохраняется.',
          en: 'For every index in `[lo, hi)`, the digit `(a[i] // exp) % 10` is computed, and the element is appended to the matching bucket - preserving order within the bucket.',
        },
      },
      {
        lines: [17, 23],
        title: { ru: 'Сборка корзин обратно с границами', en: 'Reassembling buckets with boundaries' },
        explanation: {
          ru: 'Корзины записываются обратно в `a`, начиная с `idx = lo`, а `boundaries` запоминает начальный индекс каждой корзины - идентично JS-версии.',
          en: 'Buckets are written back into `a`, starting at `idx = lo`, while `boundaries` records each bucket\'s starting index - identical to the JS version.',
        },
      },
      {
        lines: [24],
        title: { ru: 'Замыкающая граница', en: 'The closing boundary' },
        explanation: {
          ru: '`boundaries.append(hi)` добавляет финальную границу для последней корзины.',
          en: '`boundaries.append(hi)` adds the final boundary for the last bucket.',
        },
      },
      {
        lines: [25, 26],
        title: { ru: 'Рекурсия по каждой корзине', en: 'Recursing into each bucket' },
        explanation: {
          ru: 'Для каждой из 10 корзин `msd_sort` вызывается на её диапазоне со следующим, менее значимым разрядом - однодиапазонные корзины завершаются мгновенно на строке 11.',
          en: 'For each of the 10 buckets, `msd_sort` is called on its range with the next, less significant digit - single-element bucket ranges return instantly at line 11.',
        },
      },
      {
        lines: [28, 29],
        title: { ru: 'Запуск и возврат', en: 'Kicking off and returning' },
        explanation: {
          ru: 'Начальный вызов обрабатывает весь список со старшего разряда `max_digits - 1`; после разворачивания рекурсии `a` возвращается полностью отсортированным.',
          en: 'The initial call processes the whole list starting at the most significant digit `max_digits - 1`; after the recursion unwinds, `a` is returned fully sorted.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Линейна по числу элементов и разрядов - O(n·k), где k - число цифр, без единого сравнения элементов друг с другом.',
      en: 'Linear in the number of elements and digits - O(n·k), where k is the digit count, with no direct comparisons between elements at all.',
    },
    {
      ru: 'Раскладка «от старшего разряда» позволяет рано завершать обработку корзин с одним элементом, не дожидаясь прохода по всем оставшимся разрядам - в отличие от LSD-варианта, который всегда проходит все разряды целиком.',
      en: 'Most-significant-digit-first distribution lets single-element buckets finish early, without waiting through the remaining digit passes - unlike the LSD variant, which always processes every digit position in full.',
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
      ru: 'Применима только к данным с чёткой разрядной структурой (целые числа, строки фиксированной длины) - не подходит для произвольных сравнимых объектов.',
      en: 'Only applicable to data with a clear digit/positional structure (integers, fixed-length strings) - not suited to arbitrary comparable objects.',
    },
    {
      ru: 'Глубина рекурсии зависит от числа разрядов, а не от размера входных данных, что для очень больших чисел может потребовать аккуратной обработки стека вызовов.',
      en: 'Recursion depth depends on the digit count rather than the input size, which for very large numbers may require careful handling of the call stack.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные - целые числа или строки фиксированного формата (почтовые индексы, номера телефонов, идентификаторы), а нужна сортировка без сравнений, начиная с самой значимой части ключа.',
      en: 'When the data are integers or fixed-format strings (postal codes, phone numbers, identifiers) and a comparison-free sort is needed, starting from the most significant part of the key.',
    },
    {
      ru: 'Как учебный пример разницы между LSD- и MSD-поразрядной сортировкой - почтовая сортировка иллюстрирует MSD-подход на интуитивно понятном примере реальной почтовой сортировочной машины.',
      en: 'As a teaching example of the difference between LSD and MSD radix sort - postman sort illustrates the MSD approach through the intuitive example of a real postal sorting machine.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Почтовые сортировочные машины (mail sorting machines)**, используемые почтовыми службами по всему миру, физически раскладывают письма по лоткам сначала по первым цифрам индекса, а затем уточняют раскладку по следующим цифрам - именно этот процесс и дал алгоритму название.',
      en: '**Mail sorting machines** used by postal services worldwide physically route letters into bins first by the leading digits of the ZIP/postal code, then refine the routing using subsequent digits - this exact process is what gives the algorithm its name.',
    },
    {
      ru: '**MSD radix sort в базах данных и системах с префиксными индексами** (например, сортировка строк по префиксу) применяет тот же принцип «сначала самая значимая часть ключа», что удобно сочетается со структурами данных вроде trie.',
      en: '**MSD radix sort in databases and prefix-indexed systems** (e.g., sorting strings by prefix) applies the same "most significant part of the key first" principle, which pairs naturally with data structures like tries.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проследим раскладку на массиве трёхзначных чисел `[329, 457, 65, 839, 436, 720, 355]` (n = 7, maxDigits = 3). Первый проход идёт по сотням (`exp = 100`): 329→3, 457→4, 65→0, 839→8, 436→4, 720→7, 355→3. Корзины: `0:[65]`, `3:[329,355]`, `4:[457,436]`, `7:[720]`, `8:[839]`. После сборки массив становится `[65, 329, 355, 457, 436, 720, 839]`.',
        en: 'Let\'s trace dealing on an array of three-digit numbers `[329, 457, 65, 839, 436, 720, 355]` (n = 7, maxDigits = 3). The first pass reads hundreds (`exp = 100`): 329→3, 457→4, 65→0, 839→8, 436→4, 720→7, 355→3. Buckets: `0:[65]`, `3:[329,355]`, `4:[457,436]`, `7:[720]`, `8:[839]`. After reassembly the array becomes `[65, 329, 355, 457, 436, 720, 839]`.',
      },
      {
        ru: 'Из семи чисел три - `65`, `720`, `839` - попали в корзины размером ровно 1, поэтому рекурсивный вызов для них немедленно завершается на строке 9 (`hi - lo <= 1`), даже несмотря на то что впереди ещё два неиспользованных разряда. Продолжают раскладку только две группы: `[329, 355]` и `[457, 436]` - по два элемента каждая.',
        en: 'Of the seven numbers, three - `65`, `720`, `839` - land in buckets of size exactly 1, so their recursive call returns immediately at line 9 (`hi - lo <= 1`), even though two digit positions remain unused. Only two groups continue being dealt: `[329, 355]` and `[457, 436]` - two elements each.',
      },
      {
        ru: 'Второй проход (десятки, `exp = 10`) обрабатывает только эти 4 оставшихся элемента: `329→2`, `355→5` в одной группе и `457→5`, `436→3` в другой. После раскладки обе группы уже полностью упорядочены - `[329, 355]` и `[436, 457]` - и рекурсия для единиц (`digitIndex = 0`) не нужна вообще: каждая корзина второго прохода тоже получилась размером 1.',
        en: 'The second pass (tens, `exp = 10`) processes only these 4 remaining elements: `329→2`, `355→5` in one group, and `457→5`, `436→3` in the other. After dealing, both groups are already fully ordered - `[329, 355]` and `[436, 457]` - and the units-digit recursion (`digitIndex = 0`) is never needed at all: every bucket in the second pass also ended up size 1.',
      },
      {
        ru: 'Итого на весь пример потребовалось всего **11 вычислений цифры** (7 на первом проходе + 4 на втором), хотя LSD radix sort того же массива сделал бы честные 3 прохода по всем 7 элементам - **21 вычисление цифры**, то есть почти вдвое больше. Разница растёт с ростом доли «уникальных с первого взгляда» чисел во входе - каждое такое число экономит все оставшиеся разряды.',
        en: 'The whole example needed only **11 digit computations** (7 in the first pass + 4 in the second), while LSD radix sort on the same array would make a strict 3 passes over all 7 elements - **21 digit computations**, almost twice as many. The gap grows with the share of "immediately unique" numbers in the input - each one saves every remaining digit position.',
      },
      {
        ru: 'Асимптотика в худшем случае, однако, не выигрывает у LSD: если все n чисел совпадают вплоть до последнего разряда (например, `100, 101, ..., 100 + n - 1`), каждый из k уровней рекурсии проходит по всем n элементам, и суммарная работа - O(n · k), совпадая с LSD. Выигрыш MSD - это выигрыш по константе на «удачных» данных, а не по асимптотическому классу.',
        en: 'Worst-case asymptotics, however, don\'t beat LSD: if all n numbers agree up to the very last digit (e.g. `100, 101, ..., 100 + n - 1`), every one of the k recursion levels scans all n elements, and the total work is O(n · k), matching LSD. MSD\'s win is a constant-factor win on "favorable" data, not a better asymptotic class.',
      },
      {
        ru: 'Пространственная сложность O(n + k) складывается из двух источников: до n элементов, временно лежащих в 10 корзинах на любом отдельном уровне рекурсии (корзины на разных уровнях не существуют одновременно, поэтому не умножаются на k), и стека рекурсии глубиной до k - числа разрядов.',
        en: 'The O(n + k) space complexity comes from two sources: up to n elements temporarily sitting in the 10 buckets at any single recursion level (buckets at different levels don\'t coexist, so they don\'t multiply by k), plus a recursion stack of depth up to k - the digit count.',
      },
      {
        ru: 'Раскладка MSD-first неявно строит структуру, эквивалентную **дереву trie** глубиной k: каждый уровень рекурсии - это один уровень дерева, а узлы на этом уровне - это 10 возможных значений очередной цифры. Числа, разошедшиеся по разным поддеревьям на раннем уровне, никогда больше не сравниваются друг с другом - ровно так же, как строки с разными префиксами не встречаются в одной ветке символьного trie.',
        en: 'MSD-first dealing implicitly builds a structure equivalent to a **trie** of depth k: each recursion level is one level of the tree, and the nodes at that level are the 10 possible values of the next digit. Numbers that diverge into different subtrees at an early level are never compared to each other again - exactly like strings with different prefixes never meeting in the same branch of a character trie.',
      },
      {
        ru: 'Итог: почтовая сортировка не меняет асимптотику LSD-варианта, но меняет то, *когда* выполняется работа - грубая раскладка сначала, уточнение только там, где оно ещё нужно. Это делает её удачной моделью того, как реальные системы (почтовая логистика, префиксные индексы) устроены на практике: сначала используется самая информативная часть ключа, а точная доработка откладывается до тех пор, пока она действительно требуется.',
        en: 'The takeaway: postman sort doesn\'t change the LSD variant\'s asymptotics, but it changes *when* work happens - coarse dealing first, refinement only where it\'s still needed. That makes it a fitting model of how real systems (postal logistics, prefix indexes) are structured in practice: use the most informative part of the key first, and defer exact refinement until it\'s actually required.',
      },
    ],
    whenToUse: [
      {
        ru: '**Данные с сильно неравномерным распределением по старшим разрядам** - если значения естественно группируются по первой цифре (почтовые индексы одного региона, диапазоны ID), MSD быстро выделяет уже готовые группы и не тратит проходы на них.',
        en: '**Data with strongly uneven distribution over leading digits** - if values naturally cluster by their first digit (postal codes from one region, ID ranges), MSD quickly isolates already-finished groups and doesn\'t waste passes on them.',
      },
      {
        ru: '**Против LSD radix sort (`radix-sort` в этом курсе)** - если данные обычно короткие или быстро расходятся по значению, MSD в среднем делает меньше работы за счёт ранней остановки однородных корзин; если же входные числа почти совпадают вплоть до последнего разряда, оба варианта эквивалентны, а LSD проще для реализации без рекурсии.',
        en: '**Against LSD radix sort (`radix-sort` in this course)** - when data is typically short or diverges quickly by value, MSD on average does less work thanks to early-stopping uniform buckets; when the input numbers agree up to nearly the last digit, both variants are equivalent, and LSD is simpler to implement without recursion.',
      },
      {
        ru: '**Как основа для сортировки строк по префиксу** - тот же MSD-принцип с побуквенной раскладкой вместо поразрядной лежит в основе быстрой лексикографической сортировки словарей и списков URL, где важен именно префикс.',
        en: '**As the basis for prefix-based string sorting** - the same MSD principle, dealing by character instead of by digit, underlies fast lexicographic sorting of dictionaries and URL lists, where the prefix specifically matters.',
      },
      {
        ru: '**Не стоит использовать**, если глубина рекурсии (число разрядов k) непредсказуема или очень велика относительно n - накладные расходы на создание 10 корзин на каждом уровне рекурсии для малых групп могут перевесить выигрыш от ранней остановки.',
        en: '**Avoid it** when the recursion depth (digit count k) is unpredictable or very large relative to n - the overhead of allocating 10 buckets at every recursion level for small groups can outweigh the benefit of early stopping.',
      },
    ],
    realWorld: [
      {
        ru: '**Автоматизированные системы сортировки почты (например, оборудование USPS и Deutsche Post)** физически организованы как многоуровневая MSD-раскладка: письма сначала грубо распределяются по региону (первые цифры индекса), затем внутри каждого региона - по более мелким зонам, и лишь на последнем уровне - по конкретному отделению.',
        en: '**Automated mail-sorting systems (e.g. USPS and Deutsche Post equipment)** are physically organized as a multi-level MSD dealing process: mail is first coarsely routed by region (the leading code digits), then within each region by smaller zones, and only at the final level by the specific delivery office.',
      },
      {
        ru: '**Файловые системы и базы данных с префиксным индексированием** (B-деревья и trie-структуры, например в LevelDB/RocksDB) применяют тот же принцип «сначала самая значимая часть ключа», распределяя записи по диапазонам префиксов прежде, чем уточнять порядок внутри диапазона.',
        en: '**File systems and databases with prefix indexing** (B-trees and trie structures, e.g. in LevelDB/RocksDB) apply the same "most significant part of the key first" principle, distributing records by prefix range before refining the order within each range.',
      },
      {
        ru: '**Маршрутизация телефонных звонков** по коду страны и коду города использует ту же логику MSD: коммутатор сначала грубо направляет звонок по первым цифрам номера, а точная маршрутизация к абоненту происходит на более позднем, локальном этапе.',
        en: '**Phone call routing** by country code and area code uses the same MSD logic: the switch first coarsely routes the call using the leading digits of the number, with precise routing to the subscriber happening at a later, local stage.',
      },
    ],
  },

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
        ru: 'Это MSD-подход (most-significant-digit-first) - грубая раскладка идёт по старшей цифре, а затем уточняется по следующим, как в реальной почтовой сортировке.',
        en: 'This is the MSD (most-significant-digit-first) approach - the coarse pass uses the leading digit, then refines using the following digits, just like real postal sorting.',
      },
      hint: {
        ru: 'Смотрите вступительный абзац (intent) на вкладке «Суть» и шаг «Раскладка по текущему разряду» построчного разбора на вкладке «Реализация».',
        en: 'See the opening (intent) paragraph on the "Intent" tab and the "Distributing by the current digit" walkthrough step on the "Implementation" tab.',
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
        { ru: 'Она вообще не использует никакие корзины, полагаясь исключительно на прямые попарные сравнения элементов', en: 'It doesn\'t use any buckets at all, relying exclusively on direct pairwise comparisons of elements' },
        { ru: 'Она работает исключительно с отрицательными числами и совершенно не поддерживает положительные значения', en: 'It only works with negative numbers and doesn\'t support positive values whatsoever' },
        { ru: 'Она требует, чтобы входные данные были уже полностью отсортированы заранее перед самым первым проходом', en: 'It requires that the input already be fully pre-sorted well before the very first pass begins' },
      ],
      correct: 0,
      explanation: {
        ru: 'Radix sort в этом курсе - классический LSD-вариант; почтовая сортировка - MSD-вариант с рекурсивным уточнением внутри каждой корзины.',
        en: 'The radix sort covered elsewhere is the classic LSD variant; postman sort is the MSD variant, with recursive refinement inside each bucket.',
      },
      hint: {
        ru: 'Смотрите абзац `problem` на вкладке «Суть» и четвёртый абзац раздела «Углублённо» там же (11 вычислений цифры против 21 у LSD на конкретном примере).',
        en: 'See the `problem` paragraph on the "Intent" tab and the fourth "Deep dive" paragraph there (11 digit computations versus LSD\'s 21, on a concrete example).',
      },
    },
    {
      question: {
        ru: 'Когда рекурсивная раскладка корзины прекращается?',
        en: 'When does the recursive distribution of a bucket stop?',
      },
      options: [
        {
          ru: 'Когда разряды кончились или в корзине не более одного элемента',
          en: 'When digits run out or the bucket has at most one element',
        },
        { ru: 'После ровно трёх уровней рекурсии, независимо от числа разрядов', en: 'After exactly three levels of recursion, regardless of the digit count' },
        { ru: 'Когда сумма элементов корзины становится чётной по значению', en: 'When the sum of the bucket\'s elements becomes even-valued' },
        { ru: 'Никогда - рекурсия продолжается бесконечно на любом входе', en: 'Never - the recursion continues indefinitely on any input' },
      ],
      correct: 0,
      explanation: {
        ru: 'Корзина с одним элементом уже упорядочена сама по себе, а отсутствие оставшихся разрядов означает, что дальше делить нечем.',
        en: 'A single-element bucket is already trivially ordered, and running out of digits means there\'s nothing left to split on.',
      },
      hint: {
        ru: 'Смотрите строку 9 функции `msdSort` на вкладке «Реализация» и шаг «Сигнатура msdSort и базовый случай» построчного разбора там же.',
        en: 'See line 9 of `msdSort` on the "Implementation" tab and the "The msdSort signature and base case" walkthrough step there.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность почтовой сортировки?',
        en: 'What is the time complexity of postman sort?',
      },
      options: [
        { ru: 'O(n·k), где k - число разрядов', en: 'O(n·k), where k is the digit count' },
        { ru: 'O(n²), как у простых сортировок сравнением', en: 'O(n²), same as simple comparison sorts' },
        { ru: 'O(log n), благодаря бинарному делению корзин', en: 'O(log n), thanks to the binary division of buckets' },
        { ru: 'O(1), поскольку разряды обрабатываются параллельно', en: 'O(1), since digit positions are processed in parallel' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждый элемент обрабатывается один раз на каждом из k уровней разрядности, что даёт линейную по n·k сложность.',
        en: 'Each element is processed once at each of the k digit levels, giving a complexity linear in n·k.',
      },
      hint: {
        ru: 'Смотрите бейдж сложности вверху страницы и пятый абзац раздела «Углублённо» на вкладке «Суть» (худший случай совпадает с LSD - O(n·k)).',
        en: 'See the complexity badge at the top of the page and the fifth "Deep dive" paragraph on the "Intent" tab (the worst case matches LSD - O(n·k)).',
      },
    },
    {
      question: {
        ru: 'Является ли почтовая сортировка сортировкой сравнениями?',
        en: 'Is postman sort a comparison-based sort?',
      },
      options: [
        { ru: 'Нет - она распределяет элементы по цифрам, не сравнивая их напрямую друг с другом', en: 'No - it distributes elements by digit value, without directly comparing them to each other' },
        { ru: 'Да, точно так же, как быстрая сортировка, постоянно сравнивающая пары элементов друг с другом', en: 'Yes, exactly like quicksort, which constantly compares pairs of elements against each other' },
        { ru: 'Да, но исключительно для отрицательных чисел, где прямое сравнение оказывается совершенно неизбежным', en: 'Yes, but only for negative numbers, where direct comparison turns out to be completely unavoidable' },
        { ru: 'Это полностью зависит от конкретного языка реализации и используемой аппаратной платформы', en: 'It entirely depends on the specific implementation language and the hardware platform being used' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и другие поразрядные и корзинные сортировки, почтовая сортировка использует значения цифр для распределения по корзинам, а не сравнение пар элементов.',
        en: 'Like other radix and bucket sorts, postman sort uses digit values to distribute elements into buckets rather than comparing pairs of elements.',
      },
      hint: {
        ru: 'Смотрите абзац `solution` на вкладке «Суть» и тег `non-comparison` рядом с названием алгоритма вверху страницы.',
        en: 'See the `solution` paragraph on the "Intent" tab and the `non-comparison` tag next to the algorithm name at the top of the page.',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность почтовой сортировки?',
        en: 'What is the space complexity of postman sort?',
      },
      options: [
        { ru: 'O(n + k), где k - основание системы счисления', en: 'O(n + k), where k is the base of the numeral system' },
        { ru: 'O(1) - алгоритм сортирует полностью на месте', en: 'O(1) - the algorithm sorts entirely in place' },
        { ru: 'O(n²) - из-за вложенных корзин на каждом уровне рекурсии', en: 'O(n²) - due to nested buckets at every recursion level' },
        { ru: 'O(log n) - только стек рекурсии, без дополнительных массивов', en: 'O(log n) - only the recursion stack, no extra arrays' },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом уровне рекурсии нужно хранить до n элементов в корзинах и до k корзин, поэтому суммарная дополнительная память равна O(n + k).',
        en: 'At each recursion level, up to n elements must be held in buckets alongside up to k buckets, so the total extra memory is O(n + k).',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и шестой абзац раздела «Углублённо» на вкладке «Суть» (почему k, а не n·k).',
        en: 'See the "Space" complexity badge at the top of the page and the sixth "Deep dive" paragraph on the "Intent" tab (why k, not n·k).',
      },
    },
    {
      question: {
        ru: 'Почему MSD-подход почтовой сортировки позволяет завершить обработку некоторых корзин раньше, чем LSD-вариант?',
        en: 'Why does the MSD approach of postman sort allow some buckets to finish earlier than the LSD variant?',
      },
      options: [
        { ru: 'Корзина с одним элементом не требует дальнейших проходов по оставшимся разрядам', en: 'A single-element bucket needs no further passes over the remaining digits' },
        { ru: 'LSD-вариант пропускает первый разряд, поэтому всегда делает на один проход меньше', en: 'The LSD variant skips the first digit, so it always makes one fewer pass' },
        { ru: 'MSD-подход использует параллельную обработку нескольких корзин одновременно', en: 'The MSD approach processes several buckets simultaneously in parallel' },
        { ru: 'LSD требует нечётного числа проходов, а MSD всегда делает чётное число проходов', en: 'LSD always requires an odd number of passes while MSD always makes an even number' },
      ],
      correct: 0,
      explanation: {
        ru: 'LSD всегда делает ровно k проходов по всем элементам независимо от их значений. MSD рекурсивно обрабатывает только непустые корзины и останавливается, как только в корзине остался один элемент.',
        en: 'LSD always makes exactly k passes over all elements regardless of their values. MSD recursively processes only non-empty buckets and stops as soon as a bucket contains one element.',
      },
      hint: {
        ru: 'Смотрите второй пункт плюсов на вкладке «Плюсы и минусы» и второй абзац раздела «Углублённо» на вкладке «Суть» (65, 720 и 839 завершаются на первом же проходе).',
        en: 'See the second "Pros" item on the "Pros & Cons" tab and the second "Deep dive" paragraph on the "Intent" tab (65, 720, and 839 finish after the very first pass).',
      },
    },
    {
      question: {
        ru: 'Как почтовая сортировка связана со структурой данных trie?',
        en: 'How is postman sort related to the trie data structure?',
      },
      options: [
        { ru: 'Оба обрабатывают ключи символ за символом (или цифру за цифрой) начиная с самого значимого', en: 'Both process keys character by character (or digit by digit) starting from the most significant' },
        { ru: 'Trie используется внутри почтовой сортировки как обязательная промежуточная структура данных', en: 'A trie is used internally by postman sort as a mandatory intermediate data structure' },
        { ru: 'Они не связаны - trie применяется только для текстового поиска, а не для сортировки', en: 'They are unrelated - tries are only used for text search and never applied to sorting at all always' },
        { ru: 'Оба требуют O(n²) памяти при работе с числами большого диапазона значений', en: 'Both require O(n²) memory when dealing with numbers from a large value range' },
      ],
      correct: 0,
      explanation: {
        ru: 'Почтовая сортировка неявно строит trie-подобную структуру: каждый уровень рекурсии соответствует одному уровню дерева, где узлы - это значения очередной цифры.',
        en: 'Postman sort implicitly builds a trie-like structure: each recursion level corresponds to one level of the tree, where nodes are digit values.',
      },
      hint: {
        ru: 'Смотрите седьмой абзац раздела «Углублённо» на вкладке «Суть» (глубина trie равна числу разрядов k).',
        en: 'See the seventh "Deep dive" paragraph on the "Intent" tab (trie depth equals the digit count k).',
      },
    },
    {
      question: {
        ru: 'Почему почтовая сортировка не подходит для сортировки вещественных чисел (float) напрямую?',
        en: 'Why is postman sort not directly applicable to sorting floating-point numbers?',
      },
      options: [
        { ru: 'У вещественных чисел нет чёткой разрядной структуры для раскладки по корзинам', en: 'Floating-point numbers lack a clear positional digit structure suitable for bucket distribution' },
        { ru: 'Алгоритм выдаёт неверный результат при наличии хотя бы одного числа меньше нуля', en: 'The algorithm produces wrong results whenever any number is less than zero' },
        { ru: 'Вещественные числа всегда имеют бесконечное число значимых разрядов, делая k = ∞', en: 'Floating-point numbers always have infinitely many significant decimal digits, making k = ∞ always' },
        { ru: 'Алгоритм требует, чтобы все числа имели одинаковое количество разрядов до запятой', en: 'The algorithm requires all numbers to have the same digit count before the decimal point' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поразрядные алгоритмы работают с целочисленной или позиционной структурой ключа. Для вещественных чисел нужно либо преобразование в целые, либо специальные трюки с битовым представлением.',
        en: 'Radix-based algorithms rely on integer or positional key structure. For floating-point numbers, either integer conversion or special bit-representation tricks are needed.',
      },
      hint: {
        ru: 'Смотрите второй пункт минусов на вкладке «Плюсы и минусы» и абзац `solution` на вкладке «Суть» (что именно служит «разрядом»).',
        en: 'See the second "Cons" item on the "Pros & Cons" tab and the `solution` paragraph on the "Intent" tab (what exactly counts as a "digit").',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если все числа в массиве одинаковые?',
        en: 'What happens if all numbers in the array are identical?',
      },
      options: [
        { ru: 'Все элементы попадут в одну корзину, и рекурсия быстро остановится', en: 'After the first pass all elements land in one bucket, and the recursion stops quickly' },
        { ru: 'Алгоритм зациклится, так как корзина никогда не сократится до одного элемента', en: 'The algorithm loops forever because the bucket never shrinks to one element' },
        { ru: 'Все корзины заполнятся равномерно, по одному элементу на корзину', en: 'All ten buckets fill evenly, with exactly one element landing in each bucket in all cases' },
        { ru: 'Алгоритм автоматически переключится на LSD-вариант для однородных данных', en: 'The algorithm automatically switches to the LSD variant for uniform data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Одинаковые числа имеют одинаковые цифры на каждом разряде, поэтому при каждом проходе все они попадают в одну и ту же корзину. Рекурсия прекратится, когда исчерпаются разряды.',
        en: 'Identical numbers share the same digit at every position, so at each pass they all land in the same bucket. Recursion ends when digits run out.',
      },
      hint: {
        ru: 'Смотрите шаг «Раскладка по текущему разряду» построчного разбора на вкладке «Реализация» и строку 9 (базовый случай) там же.',
        en: 'See the "Distributing by the current digit" walkthrough step on the "Implementation" tab and line 9 (the base case) there.',
      },
    },
  ],
};

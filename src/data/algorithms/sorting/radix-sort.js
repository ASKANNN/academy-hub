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
    ru: 'Поразрядная сортировка упорядочивает числа, сортируя их многократно по одному разряду за раз - от младшего к старшему - используя на каждом шаге устойчивую сортировку подсчётом.',
    en: 'Radix sort orders numbers by sorting them repeatedly on one digit at a time - least significant first - using a stable counting sort at each pass.',
  },

  problem: {
    ru: 'Сортировка подсчётом быстра, но требует O(k) памяти, где k - диапазон значений; для чисел вроде номеров телефонов или паспортов (миллиарды возможных значений) это неприменимо, даже если элементов всего несколько тысяч. Нужен способ получить линейное время без создания счётчика на весь диапазон значений.',
    en: 'Counting sort is fast but needs O(k) memory, where k is the value range; for numbers like phone or passport numbers (billions of possible values) this is impractical even with only a few thousand elements. A way is needed to get linear time without a counter array spanning the whole value range.',
  },

  solution: {
    ru: 'Вместо того чтобы считать по всему значению целиком, алгоритм сортирует числа по одному разряду за раз, начиная с младшего (единицы, затем десятки, затем сотни и т.д.). Каждый проход - это устойчивая сортировка подсчётом с диапазоном ключей всего 0-9 (или 0 - (основание системы счисления − 1)), поэтому счётчик всегда маленький и фиксированного размера. Устойчивость критична: она гарантирует, что порядок, установленный на предыдущих (менее значимых) разрядах, не разрушается при сортировке по следующему, более значимому разряду. После обработки всех разрядов самого длинного числа массив полностью отсортирован.',
    en: 'Instead of counting over the whole value, the algorithm sorts numbers by one digit at a time, starting from the least significant (ones, then tens, then hundreds, and so on). Each pass is a stable counting sort over a tiny fixed key range of 0-9 (or 0 to base−1), so the counter array is always small and fixed-size. Stability is critical: it guarantees the ordering established by earlier, less significant digits isn\'t destroyed while sorting by the next, more significant one. After processing every digit of the longest number, the array is fully sorted.',
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
        ru: 'Разложить числа по «корзинам» 0-9 по значению текущего разряда, сохраняя относительный порядок внутри каждой корзины.',
        en: 'Distribute numbers into "buckets" 0-9 by the current digit\'s value, preserving relative order within each bucket.',
      },
    },
    {
      title: { ru: 'Собрать массив заново', en: 'Reassemble the array' },
      explanation: {
        ru: 'Соединить содержимое корзин по порядку от 0 до 9 - это и есть промежуточно отсортированный (по текущему разряду) массив.',
        en: 'Concatenate the buckets in order from 0 to 9 - this is the array sorted so far by the current digit.',
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

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`radixSort` принимает массив `arr` и выполняет фиксированную последовательность проходов от младшего разряда к старшему.',
          en: '`radixSort` takes an array `arr` and runs a fixed sequence of passes from the least significant digit to the most significant.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Пустой массив', en: 'The empty-array guard' },
        explanation: {
          ru: 'Для пустого входа сразу возвращается пустой массив - `Math.max(...a)` на пустом массиве дал бы `-Infinity` и сломал бы цикл ниже.',
          en: 'An empty input returns an empty array right away - `Math.max(...a)` on an empty array would give `-Infinity` and break the loop below.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Копия массива и максимум', en: 'Array copy and the maximum' },
        explanation: {
          ru: '`a` - копия входа, переприсваиваемая на каждом проходе (`let`, не `const`). `max` определяет, сколько разрядов нужно обработать - последний проход остановится, когда `exp` превысит `max`.',
          en: '`a` is a copy of the input, reassigned on every pass (`let`, not `const`). `max` determines how many digit positions need processing - the last pass stops once `exp` exceeds `max`.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Управление проходами', en: 'Controlling the passes' },
        explanation: {
          ru: '`exp` идёт `1, 10, 100, ...` - множитель текущего разряда. Условие `Math.floor(max / exp) > 0` останавливает цикл, как только `exp` становится больше `max`, то есть ровно после разрядов самого длинного числа.',
          en: '`exp` runs `1, 10, 100, ...` - the multiplier for the current digit. The condition `Math.floor(max / exp) > 0` stops the loop as soon as `exp` exceeds `max`, i.e. exactly after the longest number\'s digit positions are exhausted.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Корзины на проход', en: 'Buckets for this pass' },
        explanation: {
          ru: 'На каждом проходе создаются заново 10 пустых корзин - по одной на цифру 0-9. Ничего не переносится между проходами.',
          en: 'Every pass creates 10 fresh empty buckets - one per digit 0-9. Nothing carries over between passes.',
        },
      },
      {
        lines: [8, 11],
        title: { ru: 'Раскладка по текущему разряду', en: 'Distributing by the current digit' },
        explanation: {
          ru: 'Каждое значение из `a` (в порядке, оставшемся от предыдущего прохода) добавляется в конец корзины, соответствующей его цифре на позиции `exp` (`Math.floor(value / exp) % 10`). Добавление именно в конец сохраняет относительный порядок - это и есть устойчивость.',
          en: 'Every value from `a` (in the order left over from the previous pass) is appended to the bucket matching its digit at position `exp` (`Math.floor(value / exp) % 10`). Appending to the end preserves relative order - this is exactly what makes the pass stable.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Сборка прохода', en: 'Reassembling the pass' },
        explanation: {
          ru: '`buckets.flat()` соединяет все 10 корзин по порядку от 0 до 9 в новый массив `a` - это и есть промежуточно отсортированный по текущему разряду результат, готовый для следующего прохода.',
          en: '`buckets.flat()` concatenates all 10 buckets in order from 0 to 9 into a new `a` - this is the result sorted so far by the current digit, ready for the next pass.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После последнего прохода (по самому старшему разряду наибольшего числа) `a` полностью отсортирован.',
          en: 'After the last pass (over the most significant digit of the largest number), `a` is fully sorted.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`radix_sort` принимает список `arr` и выполняет ту же последовательность проходов, что и JS-версия.',
          en: '`radix_sort` takes a list `arr` and runs the same sequence of passes as the JS version.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Пустой список', en: 'The empty-list guard' },
        explanation: {
          ru: 'Для пустого входа сразу возвращается пустой список - `max(a)` на пустом списке выбросил бы `ValueError`.',
          en: 'An empty input returns an empty list right away - `max(a)` on an empty list would raise a `ValueError`.',
        },
      },
      {
        lines: [4, 5],
        title: { ru: 'Копия списка и максимум', en: 'List copy and the maximum' },
        explanation: {
          ru: '`a` - копия входа, переприсваиваемая на каждом проходе. `max_val` определяет число разрядов, которые нужно обработать.',
          en: '`a` is a copy of the input, reassigned on every pass. `max_val` determines how many digit positions need processing.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Управление проходами', en: 'Controlling the passes' },
        explanation: {
          ru: '`exp` начинается с 1 и умножается на 10 в конце каждой итерации `while`. Цикл идёт, пока `max_val // exp > 0` - ровно до тех пор, пока в `max_val` остаются необработанные разряды.',
          en: '`exp` starts at 1 and is multiplied by 10 at the end of each `while` iteration. The loop runs while `max_val // exp > 0` - exactly as long as `max_val` still has unprocessed digit positions.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Корзины на проход', en: 'Buckets for this pass' },
        explanation: {
          ru: 'Список из 10 пустых списков создаётся заново на каждой итерации `while`.',
          en: 'A list of 10 empty lists is created fresh on every `while` iteration.',
        },
      },
      {
        lines: [10, 12],
        title: { ru: 'Раскладка по текущему разряду', en: 'Distributing by the current digit' },
        explanation: {
          ru: 'Каждое `value` из `a` добавляется в конец корзины `(value // exp) % 10` - идентично JS-версии, порядок внутри корзины сохраняется.',
          en: 'Every `value` from `a` is appended to bucket `(value // exp) % 10` - identical to the JS version, preserving order within the bucket.',
        },
      },
      {
        lines: [13, 14],
        title: { ru: 'Сборка прохода и переход к следующему разряду', en: 'Reassembling the pass and advancing the digit' },
        explanation: {
          ru: 'Генератор списков `[v for bucket in buckets for v in bucket]` соединяет все 10 корзин по порядку - тот же результат, что и `buckets.flat()` в JS. `exp *= 10` сразу после этого сдвигает множитель на следующий, более значимый разряд для очередной проверки условия `while`.',
          en: 'The list comprehension `[v for bucket in buckets for v in bucket]` concatenates all 10 buckets in order - the same result as JS\'s `buckets.flat()`. `exp *= 10` right after it shifts the multiplier to the next, more significant digit for the next `while` check.',
        },
      },
      {
        lines: [15],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После выхода из цикла `while` (когда `exp` превысило `max_val`) список `a` полностью отсортирован.',
          en: 'After the `while` loop exits (once `exp` has exceeded `max_val`), list `a` is fully sorted.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Линейное время O(d · n) при фиксированном числе разрядов d - на практике быстрее любой сравнивающей сортировки для чисел ограниченной длины.',
      en: 'Linear O(d · n) time for a fixed digit count d - in practice faster than any comparison sort for bounded-length numbers.',
    },
    {
      ru: 'В отличие от counting sort, не требует памяти, пропорциональной всему диапазону значений - только 10 корзин на проход.',
      en: 'Unlike counting sort, doesn\'t need memory proportional to the whole value range - just 10 buckets per pass.',
    },
    {
      ru: 'Устойчив, что делает его пригодным для многоключевой сортировки (например, сначала по фамилии, потом по имени).',
      en: 'Stable, which makes it suitable for multi-key sorting (e.g. sort by last name, then by first name).',
    },
  ],
  cons: [
    {
      ru: 'Число разрядов d зависит от максимального значения - для чисел с очень большим разбросом (например, одно огромное число среди мелких) это невыгодно.',
      en: 'The digit count d depends on the maximum value - for numbers with a huge spread (e.g. one giant number among small ones), this is wasteful.',
    },
    {
      ru: 'Ограничен целыми числами (или строками фиксированной структуры) - не годится напрямую для чисел с плавающей точкой или произвольных объектов.',
      en: 'Limited to integers (or fixed-structure strings) - not directly applicable to floating-point numbers or arbitrary objects.',
    },
    {
      ru: 'Требует дополнительной памяти под корзины на каждом проходе, в отличие от сортировок на месте вроде quicksort.',
      en: 'Needs extra memory for buckets on every pass, unlike in-place sorts like quicksort.',
    },
  ],

  whenToUse: [
    {
      ru: 'Для сортировки больших массивов целых чисел ограниченной разрядности - идентификаторов, телефонных номеров, почтовых индексов.',
      en: 'For sorting large arrays of bounded-length integers - IDs, phone numbers, postal codes.',
    },
    {
      ru: 'Как основа для LSD-сортировки строк одинаковой длины, где «разряд» - это символ в определённой позиции.',
      en: 'As the basis for LSD string sorting of equal-length strings, where the "digit" is a character at a given position.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Сортировка карточек в механических табуляторах** (США, перепись населения 1890 года) - исторически первое массовое применение идеи поразрядной сортировки, ещё до появления компьютеров.',
      en: '**Punch-card sorting in mechanical tabulators** (US 1890 census) - historically the first mass application of the radix-sort idea, predating computers.',
    },
    {
      ru: '**Сортировка IP-адресов и MAC-адресов** в сетевом оборудовании часто использует поразрядный подход из-за фиксированной битовой длины ключей.',
      en: '**Sorting IP addresses and MAC addresses** in networking equipment often uses a radix approach because of the fixed bit-length of the keys.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проследим все три прохода на массиве `[170, 45, 75, 90, 802, 24, 2, 66]` (n = 8, max = 802, значит 3 разряда). Проход по единицам (`exp = 1`) даёт `[170, 90, 802, 2, 24, 45, 75, 66]` - обратите внимание, что 170 и 90 (оба с цифрой единиц 0) сохранили свой исходный взаимный порядок, как и 45 и 75 (оба с цифрой 5).',
        en: 'Let\'s trace all three passes on `[170, 45, 75, 90, 802, 24, 2, 66]` (n = 8, max = 802, so 3 digit positions). The ones-digit pass (`exp = 1`) yields `[170, 90, 802, 2, 24, 45, 75, 66]` - notice that 170 and 90 (both with ones-digit 0) kept their original relative order, as did 45 and 75 (both with ones-digit 5).',
      },
      {
        ru: 'Проход по десяткам (`exp = 10`) берёт результат первого прохода как есть и даёт `[802, 2, 24, 45, 66, 170, 75, 90]`. Здесь видна цена неустойчивости: 802 и 2 оба имеют цифру десятков 0, и их порядок (802 перед 2) - это в точности порядок, унаследованный от конца первого прохода, а не случайность. Если бы распределение по корзинам не было устойчивым, это наследование сломалось бы, и результат перестал бы быть корректным после третьего прохода.',
        en: 'The tens-digit pass (`exp = 10`) takes the first pass\'s result as-is and produces `[802, 2, 24, 45, 66, 170, 75, 90]`. This is where stability\'s value shows: 802 and 2 both have tens-digit 0, and their order (802 before 2) is exactly the order inherited from the end of the first pass, not chance. If the bucket distribution weren\'t stable, that inheritance would break, and the result after the third pass would no longer be correct.',
      },
      {
        ru: 'Финальный проход по сотням (`exp = 100`) даёт `[2, 24, 45, 66, 75, 90, 170, 802]` - массив полностью отсортирован. Цикл останавливается на следующей проверке: `Math.floor(802 / 1000) === 0`, значит `exp = 1000` уже превышает `max`, и четвёртый проход не нужен.',
        en: 'The final hundreds-digit pass (`exp = 100`) produces `[2, 24, 45, 66, 75, 90, 170, 802]` - the array is fully sorted. The loop stops on the next check: `Math.floor(802 / 1000) === 0`, meaning `exp = 1000` already exceeds `max`, so a fourth pass isn\'t needed.',
      },
      {
        ru: 'Каждый проход стоит O(n + 10): O(n) на раскладку по корзинам плюс O(10) на сборку 10 корзин обратно (в общем случае - O(n + k), где k - основание системы счисления). При d = 3 прохода общая стоимость - O(3 · (n + 10)) = O(d · (n + k)), в точности заявленная асимптотика.',
        en: 'Each pass costs O(n + 10): O(n) to distribute into buckets plus O(10) to reassemble the 10 buckets (in general, O(n + k), where k is the numeral base). With d = 3 passes, the total cost is O(3 · (n + 10)) = O(d · (n + k)), exactly the stated asymptotics.',
      },
      {
        ru: 'В отличие от MSD-варианта (`postman-sort` в этом курсе), здесь число проходов d не зависит от того, насколько быстро числа расходятся по значению - все n элементов проходят через все d раундов раскладки безусловно. Это делает LSD проще (без рекурсии, без явного отслеживания диапазонов), но лишает его возможности завершить обработку части данных раньше срока.',
        en: 'Unlike the MSD variant (`postman-sort` in this course), the pass count d here doesn\'t depend on how quickly the numbers diverge in value - all n elements go through all d rounds of distribution unconditionally. This makes LSD simpler (no recursion, no explicit range tracking), but it can\'t finish part of the data early.',
      },
      {
        ru: 'Выбор основания k = 10 удобен для примеров, но не оптимален: для 32-битных целых чисел основание k = 256 (один байт) требует всего d = 4 прохода вместо d = 10 при основании 10 (для чисел до ~4 миллиардов). Компромисс - больше памяти на корзины за проход (256 вместо 10), но меньше самих проходов, и битовые операции для извлечения байта (`(value >> (8 * i)) & 0xFF`) быстрее деления по основанию 10.',
        en: 'Base k = 10 is convenient for examples but not optimal: for 32-bit integers, base k = 256 (one byte) needs only d = 4 passes instead of d = 10 at base 10 (for numbers up to ~4 billion). The trade-off is more per-pass bucket memory (256 instead of 10) but fewer passes overall, and byte-extraction via bit operations (`(value >> (8 * i)) & 0xFF`) is faster than base-10 division.',
      },
      {
        ru: 'Формальный анализ LSD- и MSD-поразрядной сортировки, включая терминологию «radix sort» и доказательство корректности через устойчивость промежуточных проходов, приведён в **Дональде Кнуте (Donald Knuth), «The Art of Computer Programming, Volume 3: Sorting and Searching»** (1973, раздел 5.2.5) - это же издание формализовало и нижнюю границу Ω(n log n) для сортировок сравнением, от которой поразрядная сортировка как раз свободна.',
        en: 'The formal analysis of LSD and MSD radix sort, including the "radix sort" terminology and a correctness proof via the stability of intermediate passes, appears in **Donald Knuth\'s "The Art of Computer Programming, Volume 3: Sorting and Searching"** (1973, section 5.2.5) - the same volume that formalized the Ω(n log n) lower bound for comparison sorts, which radix sort is exempt from.',
      },
      {
        ru: 'Итог: поразрядная сортировка обходит нижнюю границу Ω(n log n), потому что вообще не сравнивает элементы друг с другом - она читает цифры и раскладывает по корзинам, и цена этого - линейная зависимость от d, числа разрядов, а не от log n. Пока d ограничено (32-битные числа, почтовые индексы, IP-адреса), это выгодный обмен; для ключей с непредсказуемо большим или переменным числом разрядов выигрыш исчезает.',
        en: 'The takeaway: radix sort bypasses the Ω(n log n) lower bound because it never compares elements to each other at all - it reads digits and distributes into buckets, and the price is a linear dependence on d, the digit count, rather than on log n. As long as d is bounded (32-bit numbers, postal codes, IP addresses), this is a favorable trade; for keys with an unpredictably large or variable digit count, the advantage disappears.',
      },
    ],
    whenToUse: [
      {
        ru: '**Фиксированное, небольшое основание k** - например, байтовое основание 256 для 32/64-битных целых чисел даёт предсказуемое малое d (4 или 8 проходов) и хорошо ложится на битовые операции вместо деления.',
        en: '**A fixed, small base k** - e.g. byte-wise base 256 for 32/64-bit integers gives a predictably small d (4 or 8 passes) and maps well onto bit operations instead of division.',
      },
      {
        ru: '**Против MSD-варианта (`postman-sort`)** - если ключи в основном одинаковой длины и не расходятся рано по значению, простота LSD (без рекурсии) перевешивает потенциальную экономию MSD на ранней остановке; для сильно неравномерных данных выигрывает MSD.',
        en: '**Against the MSD variant (`postman-sort`)** - if keys are mostly the same length and don\'t diverge in value early, LSD\'s simplicity (no recursion) outweighs MSD\'s potential early-exit savings; for strongly uneven data, MSD wins.',
      },
      {
        ru: '**Многоключевая сортировка** (сначала по фамилии, затем по имени) - устойчивость каждого прохода позволяет буквально прогнать сортировку по каждому ключу от наименее значимого к наиболее значимому, получив корректный составной порядок без единой явной функции сравнения.',
        en: '**Multi-key sorting** (last name first, then first name) - each pass\'s stability lets you literally run a sort by each key from least to most significant, producing a correct composite order without a single explicit comparator function.',
      },
      {
        ru: '**Избегать при переменной длине ключей** - строки или числа сильно разной длины требуют выравнивания (дополнения нулями/пробелами до общей длины) перед LSD-проходами; для таких данных MSD-подход без выравнивания обычно естественнее.',
        en: '**Avoid it for variable-length keys** - strings or numbers of widely differing lengths require padding (with zeros/spaces to a common length) before LSD passes; for such data, the MSD approach without padding is usually more natural.',
      },
    ],
    realWorld: [
      {
        ru: '**Donald Knuth, «The Art of Computer Programming, Volume 3: Sorting and Searching»** (1973, раздел 5.2.5) - формальный источник термина «radix sort» и анализа LSD/MSD-вариантов.',
        en: '**Donald Knuth, "The Art of Computer Programming, Volume 3: Sorting and Searching"** (1973, section 5.2.5) - the formal source of the term "radix sort" and the analysis of the LSD/MSD variants.',
      },
      {
        ru: '**Jon Bentley, Robert Sedgewick, «Fast Algorithms for Sorting and Searching Strings»** (1997) - строит на поразрядном подходе алгоритмы сортировки строк (three-way radix quicksort, MSD string sort), обобщая «разряд» на символ строки.',
        en: '**Jon Bentley, Robert Sedgewick, "Fast Algorithms for Sorting and Searching Strings"** (1997) - builds string-sorting algorithms (three-way radix quicksort, MSD string sort) on top of the radix approach, generalizing "digit" to a string character.',
      },
      {
        ru: '**GPU-библиotеки сортировки** (например, NVIDIA Thrust) используют поразрядную сортировку как реализацию по умолчанию для примитивных числовых ключей - у неё нет зависящих от данных ветвлений, что делает её удобной для параллельного исполнения на тысячах ядер.',
        en: '**GPU sorting libraries** (e.g. NVIDIA Thrust) use radix sort as the default implementation for primitive numeric keys - it has no data-dependent branching, which makes it a good fit for parallel execution across thousands of cores.',
      },
      {
        ru: '**Алгоритм построения суффиксного массива DC3/skew** (Kärkkäinen, Sanders, 2003) использует поразрядную сортировку как линейную по времени подпрограмму для сортировки троек символов - без неё заявленная линейная сложность DC3 была бы недостижима.',
        en: '**The DC3/skew suffix-array construction algorithm** (Kärkkäinen, Sanders, 2003) uses radix sort as a linear-time subroutine for sorting character triples - without it, DC3\'s claimed linear time complexity would be unreachable.',
      },
    ],
  },

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
        ru: 'Смотрите абзац `solution` на вкладке «Суть» и шаг «Управление проходами» построчного разбора на вкладке «Реализация».',
        en: 'See the `solution` paragraph on the "Intent" tab and the "Controlling the passes" walkthrough step on the "Implementation" tab.',
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
        ru: 'Смотрите второй абзац раздела «Углублённо» на вкладке «Суть» (802 и 2 на конкретном примере) и шаг «Раскладка по текущему разряду» построчного разбора на вкладке «Реализация».',
        en: 'See the second "Deep dive" paragraph on the "Intent" tab (802 and 2 in the concrete example) and the "Distributing by the current digit" walkthrough step on the "Implementation" tab.',
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
        ru: 'Алгоритм проходит по разрядам, пока не обработает самый старший разряд наибольшего числа - значит d равно количеству разрядов этого числа.',
        en: 'The algorithm processes digits until it handles the most significant digit of the largest value - so d equals that value\'s digit count.',
      },
      hint: {
        ru: 'Смотрите шаг «Управление проходами» построчного разбора на вкладке «Реализация» (условие `Math.floor(max / exp) > 0`) и третий абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the "Controlling the passes" walkthrough step on the "Implementation" tab (the `Math.floor(max / exp) > 0` condition) and the third "Deep dive" paragraph on the "Intent" tab.',
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
        ru: 'Число проходов d определяется наибольшим значением - один аномально длинный «выброс» заставляет делать много проходов ради небольшого числа коротких чисел.',
        en: 'The pass count d is set by the largest value - one abnormally long "outlier" forces many passes for the sake of a few short numbers.',
      },
      hint: {
        ru: 'Смотрите первый пункт минусов на вкладке «Плюсы и минусы» и четвёртый абзац раздела «Углублённо» на вкладке «Суть» (O(d · (n + k))).',
        en: 'See the first "Cons" item on the "Pros & Cons" tab and the fourth "Deep dive" paragraph on the "Intent" tab (O(d · (n + k))).',
      },
    },
    {
      question: {
        ru: 'Сколько «корзин» используется на каждом проходе при сортировке по десятичным разрядам?',
        en: 'How many "buckets" are used per pass when sorting by decimal digits?',
      },
      options: [
        { ru: '10 - по одной корзине на каждую цифру', en: '10 - one for each digit value from 0 to 9' },
        { ru: 'Столько же, сколько элементов в массиве', en: 'As many as there are elements in the array' },
        { ru: '2 - чётные и нечётные значения', en: '2 - even and odd values' },
        { ru: 'Диапазон значений всего массива', en: 'The value range of the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку каждый разряд - это цифра от 0 до 9, счётчик/корзины внутренней сортировки подсчётом всегда фиксированного размера 10, независимо от диапазона исходных чисел.',
        en: 'Since each digit is a value 0-9, the inner counting sort\'s counters/buckets are always a fixed size of 10, regardless of the original numbers\' range.',
      },
      hint: {
        ru: 'Смотрите шаг «Корзины на проход» построчного разбора на вкладке «Реализация» и пятый абзац раздела «Углублённо» на вкладке «Суть» (основание 256 вместо 10).',
        en: 'See the "Buckets for this pass" walkthrough step on the "Implementation" tab and the fifth "Deep dive" paragraph on the "Intent" tab (base 256 instead of 10).',
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
        { ru: 'Она может сортировать отрицательные числа, а сортировка подсчётом - никогда', en: 'It can sort negative numbers while counting sort can never handle them at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка подсчётом требует массив счётчиков размером во весь диапазон значений. Поразрядная разбивает задачу на проходы по одному разряду, каждый из которых требует всего 10 счётчиков.',
        en: 'Counting sort requires a counter array as large as the entire value range. Radix sort breaks the task into single-digit passes, each needing only 10 counters.',
      },
      hint: {
        ru: 'Смотрите абзац `problem` на вкладке «Суть» и второй пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the `problem` paragraph on the "Intent" tab and the second "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Можно ли применить поразрядную сортировку к строкам?',
        en: 'Can radix sort be applied to strings?',
      },
      options: [
        { ru: 'Да - для строк одной длины «разрядом» служит символ в заданной позиции', en: 'Yes - for equal-length strings, each character position serves as a digit' },
        { ru: 'Нет - строки невозможно сортировать без попарного сравнения символов', en: 'No - strings cannot be sorted without pairwise character comparisons' },
        { ru: 'Да, но только для строк, содержащих исключительно цифровые символы от 0 до 9', en: 'Yes, but only for strings containing exclusively digit characters from 0 to 9' },
        { ru: 'Нет - алгоритм требует числового типа данных и не работает с символами', en: 'No - the algorithm requires a numeric data type and cannot handle characters at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поразрядная сортировка обобщается на строки фиксированной длины: позиция символа играет роль «разряда», а код символа - роль «цифры». Именно на этой идее строится быстрая сортировка строк LSD.',
        en: 'Radix sort generalizes to fixed-length strings: the character position plays the role of "digit place," and the character code plays the role of "digit value." This is the basis of LSD string sorting.',
      },
      hint: {
        ru: 'Смотрите второй пункт whenToUse (углублённого) на вкладке «Суть» и второй пункт раздела «Примеры из практики» (углублённого) там же (Bentley и Sedgewick, 1997).',
        en: 'See the second extended "When to use" item on the "Intent" tab and the second extended "Real world" item there (Bentley and Sedgewick, 1997).',
      },
    },
    {
      question: {
        ru: 'Какое основание системы счисления (base) чаще всего используется в реализациях поразрядной сортировки на практике и почему?',
        en: 'What numeral base is most often used in practical radix sort implementations, and why?',
      },
      options: [
        { ru: '256 - равно размеру байта, удобно для работы с числами в битовом представлении', en: '256 - matches the byte size, which is convenient for working with bit representations of numbers' },
        { ru: '10 - десятичная система наиболее привычна людям и самая быстрая для процессора', en: '10 - the decimal system is most natural for humans and is the fastest base for the processor to use' },
        { ru: '2 - двоичная арифметика всегда быстрее любого другого основания на любом процессоре', en: '2 - binary arithmetic is always faster than any other base on any processor' },
        { ru: '16 - шестнадцатеричное основание минимизирует число проходов для любых данных', en: '16 - hexadecimal base minimizes the number of passes for any possible data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Основание 256 (один байт) позволяет разделить 32-битное целое всего на 4 прохода, каждый с 256 корзинами. Это даёт отличный баланс между числом проходов и размером счётчиков.',
        en: 'Base 256 (one byte) splits a 32-bit integer into just 4 passes, each with 256 buckets. This gives an excellent balance between pass count and counter-array size.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Углублённо» на вкладке «Суть» (d = 4 прохода при основании 256 против d = 10 при основании 10).',
        en: 'See the fifth "Deep dive" paragraph on the "Intent" tab (d = 4 passes at base 256 versus d = 10 at base 10).',
      },
    },
    {
      question: {
        ru: 'Как изменится число проходов поразрядной сортировки, если все числа в массиве трёхзначные?',
        en: 'How many passes does radix sort make if all numbers in the array are three-digit numbers?',
      },
      options: [
        { ru: 'Ровно 3 прохода - по одному на каждый разряд', en: 'Exactly 3 passes - one for each digit position' },
        { ru: 'Зависит от количества элементов, а не от числа разрядов', en: 'It depends on the element count, not the digit count' },
        { ru: '10 проходов - по одному на каждое возможное значение цифры', en: '10 passes - one for each possible digit value' },
        { ru: '1 проход - если все числа попадают в одну корзину при первом разряде', en: '1 pass - if all numbers land in one bucket on the first digit' },
      ],
      correct: 0,
      explanation: {
        ru: 'Число проходов равно числу разрядов наибольшего числа в массиве. Все трёхзначные числа - значит наибольшее тоже трёхзначное, и достаточно ровно трёх проходов.',
        en: 'The pass count equals the digit count of the largest number in the array. All three-digit numbers means the largest is also three digits, so exactly three passes suffice.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» (максимум 802 → 3 разряда → 3 прохода) и шаг «Управление проходами» построчного разбора на вкладке «Реализация».',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab (max 802 → 3 digits → 3 passes) and the "Controlling the passes" walkthrough step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли поразрядная сортировка алгоритмом сравнения?',
        en: 'Is radix sort a comparison-based algorithm?',
      },
      options: [
        { ru: 'Нет - она раскладывает по значению разряда, а не сравнивает пары элементов', en: 'No - it distributes elements by digit value rather than comparing pairs of elements' },
        { ru: 'Да - каждый проход сравнивает соседние элементы, как в сортировке пузырьком', en: 'Yes - each pass compares neighboring elements just like bubble sort does' },
        { ru: 'Да, но только в первом проходе, когда определяется максимальный элемент', en: 'Yes, but only in the very first pass when the maximum element is being determined always' },
        { ru: 'Зависит от основания: при base=2 это сортировка сравнением, при base=10 - нет', en: 'It depends on the base: at base=2 it is a comparison sort, at base=10 it is not' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поразрядная сортировка не принадлежит к классу алгоритмов сравнения - она обходит нижнюю границу Ω(n log n), используя не сравнения пар элементов, а чтение разрядов ключей.',
        en: 'Radix sort does not belong to the comparison-based class - it bypasses the Ω(n log n) lower bound by reading digit values rather than comparing pairs of elements.',
      },
      hint: {
        ru: 'Смотрите тег `non-comparison` рядом с названием алгоритма вверху страницы и последний абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the `non-comparison` tag next to the algorithm name at the top of the page and the final "Deep dive" paragraph on the "Intent" tab.',
      },
    },
  ],
};

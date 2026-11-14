export const fibonacciSearch = {
  slug: 'fibonacci-search',
  category: 'searching',
  name: { ru: 'Fibonacci Search', en: 'Fibonacci Search' },
  complexity: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['sorted-input', 'random-access', 'no-division'],

  intent: {
    ru: 'Поиск Фибоначчи ищет значение в отсортированном массиве, как бинарный, но делит отрезок не пополам, а в пропорции соседних чисел Фибоначчи - примерно 0.382 к 0.618, золотое сечение. Позиция пробы считается только сложением и вычитанием, без деления и сдвига. За это он платит пробами: в среднем их немного больше, чем у бинарного поиска, а в худшем случае - примерно в 1.44 раза больше.',
    en: 'Fibonacci search looks for a value in a sorted array the way binary search does, but splits the stretch not in half but in the proportion of adjacent Fibonacci numbers - about 0.382 to 0.618, the golden section. The probe position is computed with addition and subtraction only, without division or a shift. It pays for this in probes: slightly more than binary search on average, and about 1.44 times as many in the worst case.',
  },

  problem: {
    ru: 'Бинарному поиску на каждом шаге нужна середина: `lo + Math.floor((hi - lo) / 2)` - деление на два или сдвиг. На ранних машинах это могло стоить заметно дороже сложения: так объясняет смысл поиска Фибоначчи, например, Эфраимидис (2010). Отсюда вопрос: можно ли сужать отрезок так же гарантированно, за O(log n), но считая границы только сложением и вычитанием? Пропорция 1:1 для этого не годится, а пропорция соседних чисел Фибоначчи - годится, потому что каждое из них - сумма двух предыдущих.',
    en: 'Binary search needs a middle at every step: `lo + Math.floor((hi - lo) / 2)` - a division by two or a shift. On early machines that could cost noticeably more than an addition: this is how Efraimidis (2010), for one, explains the point of Fibonacci search. Hence the question: can the stretch be narrowed with the same O(log n) guarantee, while computing the bounds with addition and subtraction only? A 1:1 split does not do it, but the proportion of adjacent Fibonacci numbers does, because each of them is the sum of the two before it.',
  },

  solution: {
    ru: 'Сначала подбираются три соседних числа Фибоначчи: самое маленькое `fibM`, не меньшее длины, и два предыдущих, `fibMm1` и `fibMm2`. Проба ставится на `offset + fibMm2`: слева от неё меньшая часть, справа большая. Если элемент меньше искомого, остаётся большая часть, `offset` переезжает на пробу, а числа **сдвигаются вниз на одно**: 13, 8, 5 -> 8, 5, 3. Если больше - остаётся меньшая часть, и числа **сдвигаются на два**: 13, 8, 5 -> 5, 3, 2. Когда числа дошли до 1, может остаться один непроверенный элемент `arr[offset + 1]` - его проверяют отдельно. В отличие от **Binary Search**, части не равны, а в отличие от **Interpolation Search**, позиция зависит только от длины, не от значений.',
    en: 'First three adjacent Fibonacci numbers are picked: the smallest `fibM` not less than the length, and the two before it, `fibMm1` and `fibMm2`. The probe goes at `offset + fibMm2`: the smaller part lies to its left, the larger to its right. If the element is less than the target, the larger part stays, `offset` moves onto the probe, and the numbers **shift down by one**: 13, 8, 5 -> 8, 5, 3. If it is greater, the smaller part stays, and the numbers **shift down by two**: 13, 8, 5 -> 5, 3, 2. When the numbers reach 1, one unchecked element `arr[offset + 1]` may remain - it is checked separately. Unlike **Binary Search**, the parts are not equal, and unlike **Interpolation Search**, the position depends only on the length, not on the values.',
  },

  steps: [
    {
      title: { ru: 'Подобрать числа Фибоначчи', en: 'Pick the Fibonacci numbers' },
      explanation: {
        ru: 'Числа растут 1, 2, 3, 5, 8, 13, пока не станут не меньше длины массива. В демо 13 элементов, и тройка - 13, 8, 5. Массив пока не читается: это одни сложения, ни одного сравнения элементов.',
        en: 'The numbers grow 1, 2, 3, 5, 8, 13 until they are not less than the length of the array. The demo has 13 elements, and the triple is 13, 8, 5. The array is not read yet: these are additions only, not a single comparison of elements.',
      },
    },
    {
      title: { ru: 'Проба: отступ на меньшее число', en: 'Probe: a step of the smaller number' },
      explanation: {
        ru: 'Подсвечен `arr[offset + fibMm2]`: от последнего исключённого элемента отступают на меньшее из двух чисел. Сначала `offset = -1`, отступ 5, и первая проба - индекс 4: вместе с ней слева 5 элементов, справа 8, а 13 = 5 + 8. Отрезок делится не пополам, а примерно в пропорции 0.38 к 0.62. Пустым контуром показано то, что уже исключено.',
        en: '`arr[offset + fibMm2]` is highlighted: a step of the smaller of the two numbers from the last ruled-out element. At first `offset = -1`, the step is 5, and the first probe is index 4: with it there are 5 elements on the left and 8 on the right, and 13 = 5 + 8. The stretch is split not in half but in roughly 0.38 to 0.62. An empty outline marks what has already been ruled out.',
      },
    },
    {
      title: { ru: 'Оставить большую или меньшую часть', en: 'Keep the larger or the smaller part' },
      explanation: {
        ru: 'Элемент меньше искомого - остаётся большая часть справа, `offset` переезжает на пробу, числа сдвигаются на одно вниз. Больше - остаётся меньшая часть слева, числа сдвигаются на два. Для 33: 26 меньше - остаются индексы 5-12 (8, 5, 3), 36 больше - остаются 5-6 (3, 2, 1), 29 меньше - остаётся 6. Бинарный поиск попал бы в индекс 6 с первой пробы: на 13 элементах демо выигрыша не показывает.',
        en: 'The element is less than the target - the larger part on the right stays, `offset` moves onto the probe, and the numbers shift down by one. Greater - the smaller part on the left stays, and the numbers shift down by two. For 33: 26 is less - indices 5-12 stay (8, 5, 3), 36 is greater - 5-6 stay (3, 2, 1), 29 is less - 6 stays. Binary search would hit index 6 with its first probe: on 13 elements the demo shows no gain.',
      },
    },
    {
      title: { ru: 'Последний кандидат', en: 'The last candidate' },
      explanation: {
        ru: 'Цикл кончился, а один элемент - `arr[offset + 1]` - мог остаться непроверенным. В демо так бывает с последним элементом: 13 - само число Фибоначчи, и пробы покрывают только индексы 0-11. Поиск 54 или 55 доходит до `offset = 11` и проверяет `arr[12]` отдельно.',
        en: 'The loop is over, but one element - `arr[offset + 1]` - may have stayed unchecked. In the demo this happens with the last element: 13 is itself a Fibonacci number, and the probes cover only indices 0-11. A search for 54 or 55 reaches `offset = 11` and checks `arr[12]` separately.',
      },
    },
    {
      title: { ru: 'Ответ - индекс или -1', en: 'The answer is an index or -1' },
      explanation: {
        ru: 'Совпало - ответ индекс. Кандидатов не осталось - ответ `-1`. Для 33 это 4 пробы и индекс 6; для 55, которого нет, - 6 проб: 26, 36, 43, 47, 50 и последний кандидат 54.',
        en: 'A match - the answer is the index. No candidates left - the answer is `-1`. For 33 that is 4 probes and index 6; for 55, which is absent, it is 6 probes: 26, 36, 43, 47, 50 and the last candidate 54.',
      },
    },
  ],

  implementation: {
    javascript: `function fibonacciSearch(arr, target) {
  const n = arr.length;
  let fibMm2 = 0;
  let fibMm1 = 1;
  let fibM = fibMm2 + fibMm1;
  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM = fibMm2 + fibMm1;
  }
  let offset = -1;
  while (fibM > 1) {
    const i = Math.min(offset + fibMm2, n - 1);
    if (arr[i] < target) {
      fibM = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
    } else if (arr[i] > target) {
      fibM = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
    } else {
      return i;
    }
  }
  if (fibMm1 === 1 && offset + 1 < n && arr[offset + 1] === target) return offset + 1;
  return -1;
}`,
    python: `def fibonacci_search(arr, target):
    n = len(arr)
    fib_mm2 = 0
    fib_mm1 = 1
    fib_m = fib_mm2 + fib_mm1
    while fib_m < n:
        fib_mm2 = fib_mm1
        fib_mm1 = fib_m
        fib_m = fib_mm2 + fib_mm1
    offset = -1
    while fib_m > 1:
        i = min(offset + fib_mm2, n - 1)
        if arr[i] < target:
            fib_m = fib_mm1
            fib_mm1 = fib_mm2
            fib_mm2 = fib_m - fib_mm1
            offset = i
        elif arr[i] > target:
            fib_m = fib_mm2
            fib_mm1 = fib_mm1 - fib_mm2
            fib_mm2 = fib_m - fib_mm1
        else:
            return i
    if fib_mm1 == 1 and offset + 1 < n and arr[offset + 1] == target:
        return offset + 1
    return -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`fibonacciSearch` принимает отсортированный по возрастанию массив `arr` и искомое `target` и вернёт индекс совпадения или `-1`. Порядок массива функция не проверяет: это стоило бы O(n).',
          en: '`fibonacciSearch` takes an array `arr` sorted in ascending order and a target `target` and returns the index of a match, or `-1`. The function does not check the order of the array: that would cost O(n).',
        },
      },
      {
        lines: [2, 5],
        title: { ru: 'Три числа Фибоначчи', en: 'Three Fibonacci numbers' },
        explanation: {
          ru: '`n` - длина. `fibMm2`, `fibMm1` и `fibM` - три соседних числа Фибоначчи: «m minus 2», «m minus 1» и само `fibM`. Они начинаются с 0, 1 и 1, и третье всегда сумма двух первых. Это вся память алгоритма: таблицы чисел Фибоначчи нет, нужные числа считаются на ходу.',
          en: '`n` is the length. `fibMm2`, `fibMm1` and `fibM` are three adjacent Fibonacci numbers: "m minus 2", "m minus 1" and `fibM` itself. They start at 0, 1 and 1, and the third is always the sum of the first two. That is all the memory the algorithm uses: there is no table of Fibonacci numbers, the ones it needs are computed on the fly.',
        },
      },
      {
        lines: [6, 10],
        title: { ru: 'Дорастить до длины', en: 'Grow up to the length' },
        explanation: {
          ru: 'Пока `fibM` меньше длины, тройка сдвигается вверх: 1, 2, 3, 5, 8, 13. Для 13 элементов цикл остановится на 13, 8, 5. Это около log₁.₆₂ n сложений и ни одного чтения массива. Для непустого массива `fibM` меньше 2n, так что в JS переполнения нет: длина массива меньше 2^32, а числа точны до 2^53.',
          en: 'While `fibM` is less than the length, the triple shifts up: 1, 2, 3, 5, 8, 13. For 13 elements the loop stops at 13, 8, 5. That is about log₁.₆₂ n additions and not a single read of the array. For a non-empty array `fibM` is less than 2n, so there is no overflow in JS: an array is shorter than 2^32, and numbers are exact up to 2^53.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Смещение offset', en: 'The offset' },
        explanation: {
          ru: '`offset` - индекс последнего элемента, про который уже известно, что он меньше искомого. Всё до него включительно исключено. Сначала таких нет, поэтому `-1`, а не 0: с `offset = 0` поиск никогда не проверит `arr[0]` - в демо поиск 12 вернёт `-1`.',
          en: '`offset` is the index of the last element already known to be less than the target. Everything up to it, inclusive, is ruled out. At first there are none, hence `-1`, not 0: with `offset = 0` the search never checks `arr[0]` - in the demo a search for 12 returns `-1`.',
        },
      },
      {
        lines: [12, 13],
        title: { ru: 'Проба', en: 'The probe' },
        explanation: {
          ru: 'Пока `fibM` больше 1, проба ставится на `offset + fibMm2` - отступ на меньшее из двух чисел. `Math.min` нужен, когда проба может выйти за массив. Без него JS читает `undefined`, а оно не меньше и не больше искомого, и функция отвечает индексом за массивом: `fibonacciSearch([1, 3, 5, 7, 9, 11], 12)` вернёт 6. На всех n до 1000 `min` не срабатывал только при n, равном F(k) или F(k) - 1.',
          en: 'While `fibM` is greater than 1, the probe goes at `offset + fibMm2` - a step of the smaller of the two numbers. `Math.min` is needed when the probe can go past the array. Without it JS reads `undefined`, which is neither less nor greater than the target, and the function answers with an index past the array: `fibonacciSearch([1, 3, 5, 7, 9, 11], 12)` returns 6. On every n up to 1000 the `min` never fired only when n was F(k) or F(k) - 1.',
        },
      },
      {
        lines: [14, 18],
        title: { ru: 'Искомое правее', en: 'The target is to the right' },
        explanation: {
          ru: 'Проба меньше искомого - она и всё левее исключены, остаётся большая часть, длиной `fibMm1`. Числа сдвигаются вниз на одно: новое `fibM` - прежнее `fibMm1`, новое `fibMm1` - прежнее `fibMm2`, а третье получается вычитанием. `offset` переезжает на пробу. Порядок присваиваний важен: третье читает уже обновлённые `fibM` и `fibMm1`.',
          en: 'The probe is less than the target - it and everything to its left are ruled out, and the larger part, of length `fibMm1`, stays. The numbers shift down by one: the new `fibM` is the old `fibMm1`, the new `fibMm1` is the old `fibMm2`, and the third comes from a subtraction. `offset` moves onto the probe. The order of the assignments matters: the third reads the already updated `fibM` and `fibMm1`.',
        },
      },
      {
        lines: [19, 22],
        title: { ru: 'Искомое левее', en: 'The target is to the left' },
        explanation: {
          ru: 'Проба больше искомого - остаётся меньшая часть, левее пробы, и числа сдвигаются на два: 13, 8, 5 -> 5, 3, 2. `offset` не меняется. Здесь порядок ещё опаснее: если сначала посчитать `fibMm2`, а потом `fibMm1`, тройка перестаёт быть числами Фибоначчи, и в демо поиск 29, 33 и 40 не кончается вовсе, а 12-22 дают `-4`.',
          en: 'The probe is greater than the target - the smaller part, left of the probe, stays, and the numbers shift down by two: 13, 8, 5 -> 5, 3, 2. `offset` does not change. Here the order is even more dangerous: compute `fibMm2` first and `fibMm1` after, and the triple stops being Fibonacci numbers - in the demo a search for 29, 33 or 40 never ends, while 12-22 give `-4`.',
        },
      },
      {
        lines: [23, 26],
        title: { ru: 'Совпало', en: 'A match' },
        explanation: {
          ru: 'Ни меньше, ни больше - значит, равно, и ответ `i`. Сравнение «меньше» стоит первым: шаг в большую часть, самый частый, обходится одним сравнением. Среди дубликатов это не обязательно первое вхождение: в `[1, 3, 3, 3, 3, 3, 5]` поиск 3 вернёт 2.',
          en: 'Neither less nor greater means equal, and the answer is `i`. The "less" comparison comes first: a step into the larger part, the most frequent one, costs a single comparison. Among duplicates this is not necessarily the first occurrence: in `[1, 3, 3, 3, 3, 3, 5]` a search for 3 returns 2.',
        },
      },
      {
        lines: [27],
        title: { ru: 'Последний кандидат', en: 'The last candidate' },
        explanation: {
          ru: 'Подбор остановился на `fibM`, не меньшем n, а пробы покрывают только `fibM - 1` позиций. Если n само число Фибоначчи, последний элемент остаётся вне проб, и его проверяет эта строка: без неё теряется последний элемент ровно при n = 1, 2, 3, 5, 8, 13, ... `offset + 1 < n` не даёт читать за массивом: при поиске больше максимума `offset` может дойти до `n - 1`. `fibMm1 === 1` отличает случай, когда кандидат остался, от случая, когда он только что проверен; без этого условия ответы те же, но иногда с лишним сравнением.',
          en: 'The picking stopped at a `fibM` not less than n, but the probes cover only `fibM - 1` positions. If n is itself a Fibonacci number, the last element stays outside the probes, and this line checks it: without it the last element is lost exactly when n = 1, 2, 3, 5, 8, 13, ... `offset + 1 < n` keeps it from reading past the array: on a search above the maximum `offset` can reach `n - 1`. `fibMm1 === 1` tells the case where a candidate remains from the one where it was just checked; without that condition the answers are the same, only sometimes with an extra comparison.',
        },
      },
      {
        lines: [28, 29],
        title: { ru: 'Искомого нет', en: 'The target is absent' },
        explanation: {
          ru: 'Кандидатов не осталось - ответ `-1`. Без проверки `offset + 1 < n` JS обычно всё равно вернул бы `-1`, читая `undefined`, но `fibonacciSearch([], undefined)` вернул бы `0`.',
          en: 'No candidates are left - the answer is `-1`. Without the `offset + 1 < n` check JS would usually still return `-1`, reading `undefined`, but `fibonacciSearch([], undefined)` would return `0`.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`fibonacci_search` принимает отсортированный по возрастанию список `arr` и искомое `target` и вернёт индекс совпадения или `-1`. Порядок списка функция не проверяет.',
          en: '`fibonacci_search` takes a list `arr` sorted in ascending order and a target `target` and returns the index of a match, or `-1`. The function does not check the order of the list.',
        },
      },
      {
        lines: [2, 5],
        title: { ru: 'Три числа Фибоначчи', en: 'Three Fibonacci numbers' },
        explanation: {
          ru: '`fib_mm2`, `fib_mm1` и `fib_m` - три соседних числа Фибоначчи, начиная с 0, 1 и 1. Таблицы нет: следующие числа получаются сложением, предыдущие - вычитанием.',
          en: '`fib_mm2`, `fib_mm1` and `fib_m` are three adjacent Fibonacci numbers, starting at 0, 1 and 1. There is no table: the next numbers come from addition, the previous ones from subtraction.',
        },
      },
      {
        lines: [6, 9],
        title: { ru: 'Дорастить до длины', en: 'Grow up to the length' },
        explanation: {
          ru: 'Пока `fib_m` меньше длины, тройка сдвигается вверх. Для 13 элементов - 13, 8, 5. Целые в Python не ограничены, так что переполнения нет при любой длине.',
          en: 'While `fib_m` is less than the length, the triple shifts up. For 13 elements it is 13, 8, 5. Python integers are unbounded, so there is no overflow at any length.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Смещение offset', en: 'The offset' },
        explanation: {
          ru: '`offset` - индекс последнего элемента, который заведомо меньше искомого. Начинается с `-1`: ещё ничего не исключено, и `arr[0]` тоже должен попасть в пробы.',
          en: '`offset` is the index of the last element known to be less than the target. It starts at `-1`: nothing is ruled out yet, and `arr[0]` must be reachable by the probes too.',
        },
      },
      {
        lines: [11, 12],
        title: { ru: 'Проба', en: 'The probe' },
        explanation: {
          ru: 'Проба - `offset + fib_mm2`, обрезанная до `n - 1`. Без `min` Python падает с `IndexError`: `fibonacci_search([1, 3, 5, 7, 9, 11], 12)` пробует индекс 6.',
          en: 'The probe is `offset + fib_mm2`, cut down to `n - 1`. Without `min` Python fails with `IndexError`: `fibonacci_search([1, 3, 5, 7, 9, 11], 12)` probes index 6.',
        },
      },
      {
        lines: [13, 17],
        title: { ru: 'Искомое правее', en: 'The target is to the right' },
        explanation: {
          ru: 'Проба меньше искомого - остаётся большая часть, числа сдвигаются вниз на одно, `offset` переезжает на пробу. Присваивания идут по очереди, как в JS, и третье читает уже обновлённые `fib_m` и `fib_mm1`.',
          en: 'The probe is less than the target - the larger part stays, the numbers shift down by one, and `offset` moves onto the probe. The assignments run one after another, as in JS, and the third reads the already updated `fib_m` and `fib_mm1`.',
        },
      },
      {
        lines: [18, 21],
        title: { ru: 'Искомое левее', en: 'The target is to the left' },
        explanation: {
          ru: 'Проба больше искомого - остаётся меньшая часть, числа сдвигаются на два, `offset` не меняется. Порядок строк важен и здесь: если посчитать `fib_mm2` раньше `fib_mm1`, тройка уходит в минус, и в демо поиск 29, 33 и 40 не кончается.',
          en: 'The probe is greater than the target - the smaller part stays, the numbers shift down by two, and `offset` does not change. The order of the lines matters here too: compute `fib_mm2` before `fib_mm1` and the triple goes negative, so in the demo a search for 29, 33 or 40 never ends.',
        },
      },
      {
        lines: [22, 23],
        title: { ru: 'Совпало', en: 'A match' },
        explanation: {
          ru: 'Ни меньше, ни больше - ответ `i`. Среди дубликатов - то вхождение, на которое попала проба.',
          en: 'Neither less nor greater - the answer is `i`. Among duplicates it is whichever occurrence the probe landed on.',
        },
      },
      {
        lines: [24, 25],
        title: { ru: 'Последний кандидат', en: 'The last candidate' },
        explanation: {
          ru: 'Если n - число Фибоначчи, последний элемент остаётся вне проб, и его проверяет эта строка. `and` не вычисляет правую часть, если левая ложна, поэтому `arr[offset + 1]` читается только внутри списка. Без `offset + 1 < n` поиск 23 в списке чётных чисел от 0 до 22 падает с `IndexError`, как и любой поиск в пустом списке.',
          en: 'If n is a Fibonacci number, the last element stays outside the probes, and this line checks it. `and` does not evaluate its right side when the left is false, so `arr[offset + 1]` is read only inside the list. Without `offset + 1 < n` a search for 23 in the list of even numbers from 0 to 22 fails with `IndexError`, as does any search in an empty list.',
        },
      },
      {
        lines: [26],
        title: { ru: 'Искомого нет', en: 'The target is absent' },
        explanation: {
          ru: 'Кандидатов не осталось - ответ `-1`.',
          en: 'No candidates are left - the answer is `-1`.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Позиция пробы считается только сложением и вычитанием - ни деления, ни сдвига, ни таблицы: три числа и `offset`, память O(1).',
      en: 'The probe position is computed with addition and subtraction only - no division, no shift, no table: three numbers and `offset`, O(1) memory.',
    },
    {
      ru: 'Шаг в большую часть стоит одно сравнение: если в обоих алгоритмах первым проверять «меньше», на миллионе элементов в среднем 28.4 сравнения против 28.8 у бинарного.',
      en: 'A step into the larger part costs one comparison: with "less" checked first in both algorithms, a million elements take 28.4 comparisons on average against 28.8 for binary search.',
    },
    {
      ru: 'Та же гарантия O(log n), что у бинарного, на любой длине: благодаря `offset`, `min` и проверке последнего элемента n не обязано быть F(k) - 1, при котором пробы покрывают массив ровно.',
      en: 'The same O(log n) guarantee as binary search, at any length: thanks to `offset`, `min` and the check of the last element, n need not be F(k) - 1, where the probes cover the array exactly.',
    },
  ],
  cons: [
    {
      ru: 'В худшем случае проб примерно в 1.44 раза больше, чем у бинарного: на миллионе элементов 28 против 20.',
      en: 'In the worst case it takes about 1.44 times as many probes as binary search: 28 against 20 in a million elements.',
    },
    {
      ru: 'И в среднем проб больше: 19.9 против 19.0, и из миллиона позиций дешевле бинарного только 259 334, а дороже - 579 526.',
      en: 'On average it takes more probes too: 19.9 against 19.0, and out of a million positions only 259,334 are cheaper than with binary search, while 579,526 are dearer.',
    },
    {
      ru: 'Много ловушек: `offset = -1`, `min`, отдельная проверка последнего элемента и порядок присваиваний, который при ошибке зацикливает поиск.',
      en: 'Plenty of traps: `offset = -1`, the `min`, the separate check of the last element, and an order of assignments that loops the search forever when wrong.',
    },
  ],

  whenToUse: [
    {
      ru: '**Деление и сдвиг заметно дороже сложения** - по Эфраимидису, так могло быть на ранних машинах; на современном железе это нужно мерить, а не предполагать. По числу проб поиск Фибоначчи проигрывает бинарному.',
      en: '**Division and shifts cost noticeably more than addition** - as, according to Efraimidis, they may have on early machines; on modern hardware that has to be measured, not assumed. By the number of probes Fibonacci search loses to binary search.',
    },
    {
      ru: '**Изучение идеи деления в неравной пропорции** - тот же приём, на числах Фибоначчи и золотом сечении, ищет максимум унимодальной функции. Для обычного поиска в массиве берите **Binary Search** из стандартной библиотеки.',
      en: '**Learning the idea of an unequal split** - the same trick, with Fibonacci numbers and the golden section, finds the maximum of a unimodal function. For ordinary array search take **Binary Search** from the standard library.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**SciPy** - `scipy.optimize.golden` и `minimize_scalar(method=\'golden\')` ищут минимум функции одной переменной методом золотого сечения, с константой `_gR = 0.61803399` (версия 1.18.1). Это родственная задача - экстремум функции, а не значение в массиве.',
      en: '**SciPy** - `scipy.optimize.golden` and `minimize_scalar(method=\'golden\')` find the minimum of a function of one variable by the golden section method, with the constant `_gR = 0.61803399` (version 1.18.1). It is a related problem - an extremum of a function, not a value in an array.',
    },
    {
      ru: '**Поиск с неравной ценой ответа** - Эфраимидис (2010) обобщает поиск Фибоначчи на случай, когда проба с одним исходом дороже, чем с другим. Его пример - краш-тест: найти скорость, при которой раскрываются подушки безопасности, когда раскрытие стоит 1500 евро, а нераскрытие - 500.',
      en: '**Search with an unequal cost per answer** - Efraimidis (2010) generalises Fibonacci search to the case where a probe with one outcome costs more than one with the other. His example is a crash test: finding the speed at which airbags deploy when a deployment costs 1500 euros and a non-deployment 500.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Поиск Фибоначчи - это бинарный поиск с неравным делением.** Он тоже сужает отрезок по одной пробе и тоже требует отсортированный массив с доступом по индексу, но проба стоит не в середине, а в `offset + fibMm2`: отступ на меньшее из двух соседних чисел Фибоначчи от последнего исключённого элемента. От **Interpolation Search** он отличается тем, что значения элементов на позицию не влияют - только длина. От **Exponential Search** - тем, что длина нужна заранее: тройка чисел подбирается под n до первой пробы.',
        en: '**Fibonacci search is binary search with an unequal split.** It too narrows the stretch with one probe at a time and needs a sorted array with access by index, but the probe sits not in the middle but at `offset + fibMm2`: a step of the smaller of two adjacent Fibonacci numbers from the last ruled-out element. It differs from **Interpolation Search** in that the values of the elements do not affect the position - only the length does. And from **Exponential Search** in that the length is needed in advance: the triple of numbers is picked for n before the first probe.',
      },
      {
        ru: '**Почему деление сходится.** Пусть кандидатов F(k) - 1. Проба на F(k-2)-м по счёту кандидате оставляет слева F(k-2) - 1 элементов, справа F(k-1) - 1: вместе с пробой (F(k-2) - 1) + 1 + (F(k-1) - 1) = F(k) - 1, потому что F(k) = F(k-1) + F(k-2). После сравнения снова остаётся «число Фибоначчи минус один» - F(k-1) - 1 или F(k-2) - 1, и шаг можно повторить. В демо 13 элементов, а 13 = F(7) - на один больше, чем F(k) - 1. Поэтому пробы покрывают индексы 0-11: первая проба - индекс 4, слева от неё 4 элемента, справа до индекса 11 - ещё 7. Последний элемент, индекс 12, проверяет отдельная строка после цикла. Справа от пробы остаётся около 8/13 = 0.615 массива. Отношение соседних чисел быстро стремится к 0.618 - **золотое сечение**, поэтому части всегда примерно 0.62 и 0.38.',
        en: '**Why the split works.** Let there be F(k) - 1 candidates. A probe at the F(k-2)-th candidate leaves F(k-2) - 1 elements on its left and F(k-1) - 1 on its right: with the probe that is (F(k-2) - 1) + 1 + (F(k-1) - 1) = F(k) - 1, because F(k) = F(k-1) + F(k-2). After the comparison what remains is again "a Fibonacci number minus one" - F(k-1) - 1 or F(k-2) - 1 - and the step can be repeated. The demo has 13 elements, and 13 = F(7) - one more than F(k) - 1. So the probes cover indices 0-11: the first probe is index 4, with 4 elements to its left and 7 more to its right up to index 11. The last element, index 12, is checked by a separate line after the loop. About 8/13 = 0.615 of the array lies to the right of the probe. The ratio of adjacent numbers quickly approaches 0.618 - the **golden section** - so the parts are always about 0.62 and 0.38.',
      },
      {
        ru: '**Только сложение и вычитание.** Новые числа после шага получаются из старых сдвигом тройки: вправо - `fibM = fibMm1`, влево - `fibM = fibMm2`, третье число - вычитанием. Деления нет нигде, даже на два. Эфраимидис (2010) объясняет интерес к этому тем, что на ранних машинах деление на два и даже сдвиг могли быть дорогими, - без ссылки на замер. Сегодня середина бинарного поиска - это один сдвиг, и мы не мерили, выигрывает ли поиск Фибоначчи по времени на современном процессоре; по числу проб он проигрывает, это ниже.',
        en: '**Addition and subtraction only.** The new numbers after a step come from the old ones by shifting the triple: right - `fibM = fibMm1`, left - `fibM = fibMm2`, the third number by subtraction. There is no division anywhere, not even by two. Efraimidis (2010) explains the interest in this by division by two and even a shift possibly being expensive on early machines - with no measurement cited. Today the middle of binary search is one shift, and we have not measured whether Fibonacci search wins on time on a modern processor; by the number of probes it loses, as shown below.',
      },
      {
        ru: '**В числах, n = 10^6** (прогон по всем позициям, проба = одно чтение элемента). Найденное - в среднем **19.9 пробы против 19.0** у бинарного, максимум **28 против 20**: худший случай растёт как log по основанию 1.618, то есть около 1.44 log₂ n. Из миллиона позиций поиск Фибоначчи дешевле на 259 334, дороже на 579 526 и вровень на 161 140. Дёшево обходится конец массива: последний элемент находится за 3 пробы (бинарный - 20), а первый стоит 15 (бинарный - 19). Промах - в среднем 21.5 против 20.0. На 10^7 картина та же: 23.5 против 22.3 в среднем, 33 против 24 в худшем.',
        en: '**In numbers, n = 10^6** (a run over every position, a probe = one read of an element). A found target takes **19.9 probes against 19.0** for binary search on average, and at most **28 against 20**: the worst case grows as a log to base 1.618, that is about 1.44 log₂ n. Out of a million positions Fibonacci search is cheaper on 259,334, dearer on 579,526 and level on 161,140. The end of the array comes cheap: the last element is found in 3 probes (binary - 20), while the first costs 15 (binary - 19). A miss averages 21.5 against 20.0. At 10^7 the picture is the same: 23.5 against 22.3 on average, 33 against 24 in the worst case.',
      },
      {
        ru: '**Что говорят Бентли и Яо и что вышло у нас.** В препринте 1975 года (раздел 4, «Areas for further work») они пишут, что Кнут в т. 3, §6.2.1 описывает поиск Фибоначчи с лучшим средним временем поиска, но худшим временем в худшем случае, чем у бинарного, и спрашивают, интересен ли «неограниченный поиск Фибоначчи», - вопрос оставлен открытым. По **пробам** наш вариант хуже и в среднем, и в худшем. По **сравнениям** при проверке «меньше» первым в обоих - в среднем 28.4 против 28.8 и в худшем 30 против 39: дорогая ветка из двух сравнений у поиска Фибоначчи ведёт в меньшую часть. Какую модель времени имеет в виду Кнут, мы не проверили: книгу не открывали.',
        en: '**What Bentley and Yao say and what we got.** In their 1975 preprint (section 4, "Areas for further work") they write that Knuth, vol. 3, §6.2.1 describes a Fibonaccian search with a better average search time, though a worse worst-case time, than binary search, and ask whether an "unbounded Fibonaccian search" is interesting - the question is left open. By **probes** our variant is worse both on average and in the worst case. By **comparisons**, with "less" checked first in both, it takes 28.4 against 28.8 on average and 30 against 39 in the worst case: the expensive two-comparison branch of Fibonacci search leads into the smaller part. Which model of time Knuth means we have not checked: we have not opened the book.',
      },
      {
        ru: '**Родственная задача - максимум функции.** Кифер (1953) искал максимум **унимодальной функции** на отрезке - функции, которая до пика растёт, а после убывает, - и показал, что при заданном числе вычислений точки лучше всего ставить по числам Фибоначчи: в пересказе Оливера и Уайлда (1964) конечный отрезок неопределённости - L / F(n) плюс малая поправка. Если число вычислений заранее не задано, отношение соседних чисел Фибоначчи заменяют его пределом 0.618 - это **поиск золотого сечения** (вывод наш, не из их статьи). Это не поиск значения в массиве: там сравнивают два значения функции между собой, а не элемент с искомым. Тот же класс задач решает **Ternary Search** - о нём следующая страница раздела.',
        en: '**A related problem - the maximum of a function.** Kiefer (1953) looked for the maximum of a **unimodal function** on an interval - one that rises up to a peak and falls after it - and showed that for a given number of evaluations the points are best placed by Fibonacci numbers: as Oliver and Wilde (1964) retell it, the final interval of uncertainty is L / F(n) plus a small correction. If the number of evaluations is not fixed in advance, the ratio of adjacent Fibonacci numbers is replaced by its limit 0.618 - that is **golden section search** (our inference, not from their paper). That is not a search for a value in an array: there two values of the function are compared with each other, not an element with a target. **Ternary Search**, the next page in this section, solves the same class of problems.',
      },
      {
        ru: '**Ловушки.** `offset` начинается с `-1`, иначе `arr[0]` не проверяется. `min(offset + fibMm2, n - 1)` нужен при любом n, кроме F(k) и F(k) - 1: без него Python падает с `IndexError`, а JS отвечает индексом за массивом - `undefined` не меньше и не больше искомого. Последний элемент при n = F(k) проверяется отдельной строкой, и она же без `offset + 1 < n` читает за массивом. Порядок присваиваний при сдвиге на два: посчитать `fibMm2` раньше `fibMm1` - и в демо поиск 29, 33 и 40 зацикливается. **Переполнение**: в JS числа Фибоначчи здесь меньше 2n и точны, в Python целые не ограничены, а в Java с `int` при n больше F(46) = 1 836 311 903 следующее число переполняется - на массиве из 1 836 311 904 байт поиск последнего упал с `ArrayIndexOutOfBoundsException: Index -741600055`, а при n = F(46) нашёл его.',
        en: '**Traps.** `offset` starts at `-1`, otherwise `arr[0]` is never checked. `min(offset + fibMm2, n - 1)` is needed for every n except F(k) and F(k) - 1: without it Python fails with `IndexError`, and JS answers with an index past the array - `undefined` is neither less nor greater than the target. The last element at n = F(k) is checked by a separate line, and without `offset + 1 < n` that same line reads past the array. The order of assignments in the shift by two: compute `fibMm2` before `fibMm1` and in the demo a search for 29, 33 or 40 loops forever. **Overflow**: in JS the Fibonacci numbers here are below 2n and exact, in Python integers are unbounded, and in Java with `int` the next number overflows when n is above F(46) = 1,836,311,903 - on an array of 1,836,311,904 bytes a search for the last element failed with `ArrayIndexOutOfBoundsException: Index -741600055`, while at n = F(46) it found it.',
      },
      {
        ru: '**Дубликаты.** Ответ - то вхождение, на которое попала проба. `[1, 3, 3, 3, 3, 3, 5]`, ищем 3: поиск Фибоначчи даёт 2, `binarySearch` - 3, прыжковый и экспоненциальный - 1. `[10, 20, 30, 40, 50, 60, 60, 70, 80]`, ищем 60: поиск Фибоначчи и прыжковый - 5, бинарный и экспоненциальный - 6. На 200 000 случайных массивах с повторами первое вхождение вернулось в 60% случаев у поиска Фибоначчи, в 58% у бинарного, в 75% у экспоненциального и всегда у прыжкового. JS и Python отвечают одинаково.',
        en: '**Duplicates.** The answer is whichever occurrence the probe landed on. `[1, 3, 3, 3, 3, 3, 5]`, looking for 3: Fibonacci search gives 2, `binarySearch` gives 3, jump and exponential search give 1. `[10, 20, 30, 40, 50, 60, 60, 70, 80]`, looking for 60: Fibonacci and jump search give 5, binary and exponential give 6. On 200,000 random arrays with repeats the first occurrence came back in 60% of cases for Fibonacci search, 58% for binary, 75% for exponential and always for jump search. JS and Python answer the same.',
      },
    ],
    whenToUse: [
      {
        ru: '**Обычный поиск в отсортированном массиве** - **Binary Search**: на миллионе элементов в среднем 19.0 пробы против 19.9 и в худшем 20 против 28. Поиск Фибоначчи здесь не быстрее ни по пробам, ни по гарантии.',
        en: '**Ordinary search in a sorted array** - **Binary Search**: on a million elements 19.0 probes on average against 19.9, and 20 against 28 in the worst case. Fibonacci search is faster here neither in probes nor in its guarantee.',
      },
      {
        ru: '**Деление или сдвиг действительно дороги** - например, на простом процессоре без них. Тогда поиск Фибоначчи может окупиться, но только замер на этом железе скажет, перевешивает ли дешёвый шаг лишние пробы.',
        en: '**Division or shifts really are expensive** - for instance on a simple processor without them. Then Fibonacci search may pay off, but only a measurement on that hardware says whether the cheap step outweighs the extra probes.',
      },
      {
        ru: '**Цена пробы зависит от исхода** - обобщённый вариант Эфраимидиса ставит пробы по «(α, β)-последовательностям Фибоначчи» и, по его доказательству, точно следует оптимальному дереву решений для сравнений, цена которых зависит от исхода.',
        en: '**The cost of a probe depends on its outcome** - the generalised variant by Efraimidis places probes by "(α, β) Fibonacci sequences" and, as he proves, follows exactly the optimal decision tree for comparisons whose cost depends on the outcome.',
      },
      {
        ru: '**Максимум или минимум унимодальной функции** - это не поиск значения: нужен поиск золотого сечения (как `scipy.optimize.golden`) или **Ternary Search**. Поиск Фибоначчи по массиву значений функции не сработает: значения не отсортированы.',
        en: '**The maximum or minimum of a unimodal function** - that is not a value search: you need golden section search (like `scipy.optimize.golden`) or **Ternary Search**. Fibonacci search over an array of function values will not work: the values are not sorted.',
      },
      {
        ru: '**Длина неизвестна** - **Exponential Search**: поиску Фибоначчи тройка чисел нужна до первой пробы, а «неограниченный поиск Фибоначчи» у Бентли и Яо остался открытым вопросом.',
        en: '**The length is unknown** - **Exponential Search**: Fibonacci search needs its triple of numbers before the first probe, and an "unbounded Fibonaccian search" was left as an open question by Bentley and Yao.',
      },
    ],
    realWorld: [
      {
        ru: '**D. E. Ferguson, «Fibonaccian searching», Communications of the ACM 3(12), декабрь 1960, с. 648** - статья, на которую как на источник поиска Фибоначчи ссылается Эфраимидис (2010). Выходные данные - по Crossref (автор указан из Computer Sciences Corp., Инглвуд); текст статьи мы не открыли - сайт ACM закрыт проверкой браузера, - поэтому что именно в ней написано, здесь не пересказываем.',
        en: '**D. E. Ferguson, "Fibonaccian searching", Communications of the ACM 3(12), December 1960, p. 648** - the paper that Efraimidis (2010) cites as the source of Fibonacci search. The publication details are from Crossref (the author is listed at Computer Sciences Corp., Inglewood); we have not opened the text - the ACM site is behind a browser check - so we do not retell what it says.',
      },
      {
        ru: '**J. Kiefer, «Sequential minimax search for a maximum», Proceedings of the AMS 4(3), июнь 1953, с. 502-506** - выходные данные по Crossref, текст за проверкой браузера мы не открыли. Содержание - по **L. T. Oliver, D. J. Wilde, «Symmetric sequential minimax search for a maximum», Fibonacci Quarterly 2(3), октябрь 1964, с. 169-175** (прочитан): максимум унимодальной функции одной переменной на отрезке, точки по числам Фибоначчи, конечный отрезок L / F(n) + ε, и Кифер показал, что это ε-минимакс среди нерандомизированных процедур.',
        en: '**J. Kiefer, "Sequential minimax search for a maximum", Proceedings of the AMS 4(3), June 1953, pp. 502-506** - publication details from Crossref; the text is behind a browser check and we have not opened it. The content is from **L. T. Oliver, D. J. Wilde, "Symmetric sequential minimax search for a maximum", Fibonacci Quarterly 2(3), October 1964, pp. 169-175** (read): the maximum of a unimodal function of one variable on an interval, points placed by Fibonacci numbers, a final interval of L / F(n) + ε, and Kiefer showed this is ε-minimax among non-randomised procedures.',
      },
      {
        ru: '**J. L. Bentley, A. C. Yao, «An almost optimal algorithm for unbounded searching», препринт SLAC-PUB-1679, ноябрь 1975** (вышел в Information Processing Letters 5(3), 1976) - раздел 4: со ссылкой на Кнута, т. 3, §6.2.1, поиск Фибоначчи по конечной таблице имеет лучшее среднее время и худшее время в худшем случае, чем бинарный; интересен ли неограниченный вариант - открытый вопрос. Книгу Кнута мы не открывали.',
        en: '**J. L. Bentley, A. C. Yao, "An almost optimal algorithm for unbounded searching", preprint SLAC-PUB-1679, November 1975** (published in Information Processing Letters 5(3), 1976) - section 4: citing Knuth, vol. 3, §6.2.1, a Fibonaccian search of a finite table has a better average time and a worse worst-case time than binary search; whether the unbounded variant is interesting is an open question. We have not opened Knuth\'s book.',
      },
      {
        ru: '**P. S. Efraimidis, «(α, β) Fibonacci Search», arXiv 1012.0259, декабрь 2010** (прочитан) - поиск Фибоначчи как вариант бинарного без деления; цитирует Кнута: программа поиска Фибоначчи «на первый взгляд выглядит очень загадочно» и «кажется, работает как по волшебству». Обобщает метод на сравнения, цена которых зависит от исхода, - пример с краш-тестами подушек безопасности.',
        en: '**P. S. Efraimidis, "(α, β) Fibonacci Search", arXiv 1012.0259, December 2010** (read) - Fibonacci search as a variant of binary search without division; quotes Knuth that the Fibonaccian search program "looks very mysterious at first glance" and "seems to work by magic". Generalises the method to comparisons whose cost depends on the outcome - the airbag crash-test example.',
      },
      {
        ru: '**SciPy 1.18.1, scipy/optimize/_optimize.py** - `golden` и `_minimize_scalar_golden`: минимум функции одной переменной методом золотого сечения, `_gR = 0.61803399` и `_gC = 1.0 - _gR` - те же 0.618 и 0.382, что в делении поиска Фибоначчи, но для экстремума функции, а не для массива.',
        en: '**SciPy 1.18.1, scipy/optimize/_optimize.py** - `golden` and `_minimize_scalar_golden`: the minimum of a function of one variable by the golden section method, `_gR = 0.61803399` and `_gC = 1.0 - _gR` - the same 0.618 and 0.382 as in the Fibonacci search split, but for an extremum of a function, not for an array.',
      },
    ],
  },

  relatedAlgorithms: ['binary-search', 'exponential-search', 'jump-search', 'interpolation-search', 'linear-search', 'ternary-search'],

  quiz: [
    {
      question: {
        ru: 'Куда поиск Фибоначчи ставит очередную пробу?',
        en: 'Where does Fibonacci search place its next probe?',
      },
      options: [
        { ru: 'В середину отрезка: `lo + (hi - lo) / 2`, как обычный бинарный поиск', en: 'In the middle of the stretch: `lo + (hi - lo) / 2`, like binary search' },
        { ru: 'Туда, где искомое должно быть по значениям на концах отрезка', en: 'Where the target should be, judging by the values at the ends' },
        { ru: 'На `offset + fibMm2`: части относятся как соседние числа Фибоначчи', en: 'At `offset + fibMm2`: the parts relate as adjacent Fibonacci numbers' },
        { ru: 'В конец следующего блока длиной √n, двигаясь слева направо', en: 'At the end of the next block of length √n, moving left to right' },
      ],
      correct: 2,
      explanation: {
        ru: 'Проба отступает от `offset` на меньшее из двух соседних чисел Фибоначчи, и отрезок делится примерно 0.38 к 0.62. Середина - бинарный поиск, оценка по значениям - интерполяционный, блоки √n - прыжковый.',
        en: 'The probe steps from `offset` by the smaller of two adjacent Fibonacci numbers, and the stretch splits roughly 0.38 to 0.62. The middle is binary search, an estimate from the values is interpolation search, blocks of √n are jump search.',
      },
      hint: {
        ru: 'Смотрите шаг «Проба: отступ на меньшее число» на вкладке «Визуализация».',
        en: 'See the "Probe: a step of the smaller number" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'В массиве 13 элементов. Какие числа Фибоначчи подберёт алгоритм и куда встанет первая проба?',
        en: 'An array has 13 elements. Which Fibonacci numbers does the algorithm pick, and where does the first probe go?',
      },
      options: [
        { ru: '21, 13, 8 и индекс 7: число должно быть строго больше длины', en: '21, 13, 8 and index 7: the number must be strictly above the length' },
        { ru: '13, 8, 5 и индекс 4: `offset = -1`, и к нему прибавляется 5', en: '13, 8, 5 and index 4: `offset` starts at -1, and 5 is added to it' },
        { ru: '13, 8, 5 и индекс 6: первая проба всегда в середине массива', en: '13, 8, 5 and index 6: the first probe is always in the middle' },
        { ru: '8, 5, 3 и индекс 7: берётся число, не большее длины массива', en: '8, 5, 3 and index 7: it takes the number not above the length' },
      ],
      correct: 1,
      explanation: {
        ru: 'Числа растут, пока не станут не меньше 13: тройка 13, 8, 5. Проба - `-1 + 5 = 4`: вместе с ней слева 5 элементов, справа 8.',
        en: 'The numbers grow until they are not less than 13: the triple is 13, 8, 5. The probe is `-1 + 5 = 4`: 5 elements on the left with it, 8 on the right.',
      },
      hint: {
        ru: 'Смотрите шаг «Подобрать числа Фибоначчи» на вкладке «Визуализация».',
        en: 'See the "Pick the Fibonacci numbers" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Проба оказалась меньше искомого. Что происходит с тройкой 13, 8, 5 и с `offset`?',
        en: 'The probe turned out less than the target. What happens to the triple 13, 8, 5 and to `offset`?',
      },
      options: [
        { ru: 'Тройка становится 8, 5, 3, `offset` переезжает на пробу', en: 'The triple becomes 8, 5, 3, and `offset` moves onto the probe' },
        { ru: 'Тройка становится 5, 3, 2, а `offset` остаётся на месте', en: 'The triple becomes 5, 3, 2, and `offset` stays exactly where it is' },
        { ru: 'Тройка остаётся 13, 8, 5, а `offset` растёт на единицу', en: 'The triple stays 13, 8, 5, and `offset` grows by one' },
        { ru: 'Тройка вырастает до 21, 13, 8, а `offset` сбрасывается в -1', en: 'The triple grows to 21, 13, 8, and `offset` resets to -1' },
      ],
      correct: 0,
      explanation: {
        ru: 'Остаётся большая часть, справа от пробы, длиной `fibMm1`, поэтому числа сдвигаются вниз на одно, а `offset = i`. Сдвиг на два и неподвижный `offset` - это ветка «больше».',
        en: 'The larger part, right of the probe, of length `fibMm1` stays, so the numbers shift down by one, and `offset = i`. A shift by two with `offset` standing still is the "greater" branch.',
      },
      hint: {
        ru: 'Смотрите шаг «Искомое правее» на вкладке «Реализация».',
        en: 'See the "The target is to the right" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему после любого сравнения снова остаётся отрезок, для которого шаг можно повторить?',
        en: 'Why does any comparison again leave a stretch on which the step can be repeated?',
      },
      options: [
        { ru: 'Потому что отрезок всегда делится ровно пополам, как в бинарном', en: 'Because the stretch is always split exactly in half, as in binary search' },
        { ru: 'Потому что длина массива обязана быть числом Фибоначчи', en: 'Because the length of the array has to be a Fibonacci number' },
        { ru: 'Потому что алгоритм хранит таблицу всех чисел Фибоначчи до n', en: 'Because the algorithm keeps a table of all Fibonacci numbers up to n' },
        { ru: 'F(k) = F(k-1) + F(k-2), и остаётся F(k-1) - 1 или F(k-2) - 1', en: 'F(k) = F(k-1) + F(k-2), so F(k-1) - 1 or F(k-2) - 1 elements remain' },
      ],
      correct: 3,
      explanation: {
        ru: 'Из F(k) - 1 кандидатов проба оставляет F(k-2) - 1 слева и F(k-1) - 1 справа - снова «число Фибоначчи минус один». Длина массива может быть любой: это исправляют `offset`, `min` и проверка последнего элемента, а таблицы нет - числа считаются на ходу.',
        en: 'Out of F(k) - 1 candidates the probe leaves F(k-2) - 1 on the left and F(k-1) - 1 on the right - again "a Fibonacci number minus one". The length of the array can be anything: `offset`, `min` and the check of the last element take care of that, and there is no table - the numbers are computed on the fly.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the second paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем после цикла отдельно проверять `arr[offset + 1]`?',
        en: 'Why check `arr[offset + 1]` separately after the loop?',
      },
      options: [
        { ru: 'Это лишь ускорение: цикл и сам нашёл бы этот элемент позже', en: 'It is only a speed-up: the loop itself would find that element later anyway' },
        { ru: 'Если n - число Фибоначчи, последний элемент остаётся вне проб', en: 'If n is a Fibonacci number, the last element stays outside the probes' },
        { ru: 'Чтобы вернуть первое вхождение, когда в массиве есть дубликаты', en: 'To return the first occurrence when the array has duplicates' },
        { ru: 'Чтобы отличить пустой массив от массива из одного элемента', en: 'To tell an empty array from an array of one element' },
      ],
      correct: 1,
      explanation: {
        ru: 'Подбор останавливается на `fibM`, не меньшем n, а пробы покрывают `fibM - 1` позиций. При n = 1, 2, 3, 5, 8, 13, ... последний элемент без этой строки теряется - в демо так пропал бы 54. Цикл после выхода уже ничего не проверит, а на выбор вхождения строка не влияет.',
        en: 'The picking stops at a `fibM` not less than n, while the probes cover `fibM - 1` positions. At n = 1, 2, 3, 5, 8, 13, ... the last element is lost without this line - in the demo 54 would be. The loop has already exited and checks nothing more, and the line does not affect which occurrence is chosen.',
      },
      hint: {
        ru: 'Смотрите шаг «Последний кандидат» на вкладке «Реализация».',
        en: 'See the "The last candidate" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'В JS-версии в ветке «больше» поменяли местами две строки и считают `fibMm2` раньше `fibMm1`. Что будет в демо?',
        en: 'In the JS version two lines of the "greater" branch were swapped, and `fibMm2` is computed before `fibMm1`. What happens in the demo?',
      },
      options: [
        { ru: 'Ничего: от порядка присваиваний результат не зависит', en: 'Nothing: the result does not depend on the order of the assignments' },
        { ru: 'Поиск станет на одну пробу дольше, но ответы останутся верными', en: 'The search takes one probe longer, but the answers stay correct' },
        { ru: 'Поиск 29, 33 и 40 не кончится, а для 12-22 ответ будет `-4`', en: 'A search for 29, 33 or 40 never ends, and targets 12-22 give `-4`' },
        { ru: 'Функция всегда вернёт `-1`, потому что `offset` не сдвинется', en: 'The function always returns `-1`, because `offset` never moves' },
      ],
      correct: 2,
      explanation: {
        ru: 'Строка `fibMm2 = fibM - fibMm1` должна читать уже обновлённое `fibMm1`. С другим порядком тройка перестаёт быть числами Фибоначчи и уходит в минус: проба застревает на одном индексе или уходит левее массива. В прогоне на демо-массиве так и вышло: 29, 33 и 40 - вечный цикл, 12-22 - `-4`. В Python зацикливаются те же три, а 12-22 дают `-1`: отрицательный индекс читает список с конца.',
        en: 'The line `fibMm2 = fibM - fibMm1` has to read the already updated `fibMm1`. In another order the triple stops being Fibonacci numbers and goes negative: the probe gets stuck on one index or goes left of the array. A run on the demo array showed exactly that: 29, 33 and 40 loop forever, 12-22 give `-4`. In Python the same three loop, while 12-22 give `-1`: a negative index reads the list from the end.',
      },
      hint: {
        ru: 'Смотрите шаг «Искомое левее» на вкладке «Реализация».',
        en: 'See the "The target is to the left" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Из JS-версии убрали `Math.min`. Что вернёт `fibonacciSearch([1, 3, 5, 7, 9, 11], 12)`?',
        en: 'The `Math.min` was removed from the JS version. What does `fibonacciSearch([1, 3, 5, 7, 9, 11], 12)` return?',
      },
      options: [
        { ru: '`-1`: 12 нет в массиве, и поиск это верно сообщает', en: '`-1`: 12 is not in the array, and the search reports that correctly' },
        { ru: 'Исключение `RangeError` при чтении за концом массива', en: 'A `RangeError` exception on reading past the end of the array' },
        { ru: '`5`: проба упирается в последний элемент и возвращает его', en: '`5`: the probe hits the last element and returns it' },
        { ru: '`6`: `arr[6]` - `undefined`, не меньше и не больше 12', en: '`6`: `arr[6]` is `undefined`, neither less nor greater than 12' },
      ],
      correct: 3,
      explanation: {
        ru: 'Проба уходит на индекс 6, JS читает `undefined` без ошибки, оба сравнения с ним ложны, и срабатывает ветка «совпало». Python в той же ситуации падает с `IndexError`. При длине, равной F(k) или F(k) - 1, `min` не срабатывает, поэтому ошибку легко не заметить на удобных тестах.',
        en: 'The probe goes to index 6, JS reads `undefined` without an error, both comparisons with it are false, and the "match" branch fires. Python in the same spot fails with `IndexError`. At a length of F(k) or F(k) - 1 the `min` never fires, so the bug is easy to miss on convenient tests.',
      },
      hint: {
        ru: 'Смотрите шаг «Проба» на вкладке «Реализация».',
        en: 'See the "The probe" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Массив из 10^6 чисел, прогон по всем позициям. Сколько проб в среднем и в худшем случае у поиска Фибоначчи и бинарного поиска?',
        en: 'An array of 10^6 numbers, a run over every position. How many probes on average and in the worst case for Fibonacci and binary search?',
      },
      options: [
        { ru: 'Фибоначчи 19.9 и 28, бинарный 19.0 и 20: неравное деление дороже', en: 'Fibonacci 19.9 and 28, binary 19.0 and 20: the unequal split costs probes' },
        { ru: 'Фибоначчи 17.2 и 20, бинарный 19.0 и 20: золотое сечение экономнее', en: 'Fibonacci 17.2 and 20, binary 19.0 and 20: the golden section saves probes' },
        { ru: 'Оба 19.0 и 20: деление влияет только на скорость арифметики', en: 'Both 19.0 and 20: the split only affects the speed of the arithmetic' },
        { ru: 'Фибоначчи 19.0 и 40, бинарный 19.0 и 20: худший вдвое хуже', en: 'Fibonacci 19.0 and 40, binary 19.0 and 20: the worst case is twice as bad' },
      ],
      correct: 0,
      explanation: {
        ru: 'Прогон: 19.9 против 19.0 в среднем, 28 против 20 в худшем. Худший растёт как log по основанию 1.618 - около 1.44 log₂ n. Неравное деление проигрывает делению пополам по пробам: в большей части элементов больше, и туда искомое попадает чаще.',
        en: 'A run: 19.9 against 19.0 on average, 28 against 20 in the worst case. The worst case grows as a log to base 1.618 - about 1.44 log₂ n. An unequal split loses to halving in probes: the larger part holds more elements, and the target lands there more often.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fourth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Бентли и Яо со ссылкой на Кнута пишут, что у поиска Фибоначчи лучше среднее время, но хуже худшее, чем у бинарного. Что показал наш прогон на 10^6?',
        en: 'Bentley and Yao, citing Knuth, write that Fibonacci search has a better average time but a worse worst-case time than binary search. What did our run on 10^6 show?',
      },
      options: [
        { ru: 'Полное подтверждение: в среднем проб меньше, а в худшем случае заметно больше', en: 'Full confirmation: fewer probes on average and more probes in the worst case' },
        { ru: 'Проб больше в среднем и в худшем, а сравнений с «меньше» первым - меньше', en: 'More probes on average and at worst, fewer comparisons with "less" first' },
        { ru: 'Полное опровержение: он хуже бинарного при любом способе подсчёта', en: 'Full refutation: it is worse than binary search by any way of counting' },
        { ru: 'Разницы нет: оба алгоритма делают одни и те же пробы', en: 'No difference: both algorithms make the very same probes' },
      ],
      correct: 1,
      explanation: {
        ru: 'Проб больше и в среднем (19.9 против 19.0), и в худшем (28 против 20). Двухсторонних сравнений при «меньше» первым - 28.4 против 28.8 в среднем и 30 против 39 в худшем. Утверждение у Бентли и Яо - про время; какую модель времени берёт Кнут, мы не проверили.',
        en: 'There are more probes both on average (19.9 against 19.0) and in the worst case (28 against 20). Two-way comparisons with "less" first come to 28.4 against 28.8 on average and 30 against 39 in the worst case. The claim in Bentley and Yao is about time; which model of time Knuth uses we have not checked.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fifth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Нужно найти максимум функции, которая на отрезке сначала растёт, а потом убывает. Что выбрать?',
        en: 'You need the maximum of a function that first rises and then falls on an interval. What do you choose?',
      },
      options: [
        { ru: 'Поиск Фибоначчи по массиву её значений: он и придуман для этого', en: 'Fibonacci search over an array of its values: it was made for this' },
        { ru: 'Бинарный поиск по значениям функции, как по любому отсортированному массиву', en: 'Binary search over the values of the function, as over any sorted array' },
        { ru: 'Поиск золотого сечения: сравнивать два значения функции между собой', en: 'Golden section search: compare two function values with each other' },
        { ru: 'Экспоненциальный поиск: удваивать шаг, пока функция растёт', en: 'Exponential search: double the step while the function keeps rising' },
      ],
      correct: 2,
      explanation: {
        ru: 'Это задача Кифера об унимодальной функции: точки ставят по числам Фибоначчи или по золотому сечению, и сравнивают значения функции друг с другом. Значения такой функции не отсортированы, поэтому поиск значения в массиве - бинарный или Фибоначчи - тут неприменим. Удвоение найдёт область пика, но не сам пик.',
        en: 'This is Kiefer\'s problem of a unimodal function: points are placed by Fibonacci numbers or the golden section, and the values of the function are compared with each other. The values of such a function are not sorted, so a value search in an array - binary or Fibonacci - does not apply. Doubling finds the region of the peak, but not the peak itself.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the sixth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
  ],
};

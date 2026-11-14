export const interpolationSearch = {
  slug: 'interpolation-search',
  category: 'searching',
  name: { ru: 'Interpolation Search', en: 'Interpolation Search' },
  complexity: {
    time: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['sorted-input', 'random-access', 'numeric-keys'],

  intent: {
    ru: 'Интерполяционный поиск ищет число в отсортированном массиве, но пробует не середину, а то место, где искомое должно лежать по своему значению - так словарь открывают ближе к концу, если слово начинается на «Ш». Если ключи распределены равномерно, в среднем хватает O(log log n) проб: около 4 на миллионе элементов против почти 20 у бинарного поиска. На неравномерных данных оценка промахивается, и худший случай - O(n).',
    en: 'Interpolation search looks for a number in a sorted array, but instead of the middle it probes the place where the target should lie given its value - the way you open a dictionary near the end for a word starting with "W". If the keys are spread evenly, O(log log n) probes are enough on average: about 4 in a million elements, against nearly 20 for binary search. On uneven data the estimate misses, and the worst case is O(n).',
  },

  problem: {
    ru: 'Бинарный поиск смотрит только на порядок элементов и не пользуется их значениями: ищете ли вы 11 или 999 в массиве от 10 до 1000, первая проба - всегда середина. Если же ключи распределены равномерно, само значение подсказывает, где искать: 999 лежит почти в самом конце. Бинарный поиск эту подсказку выбрасывает и тратит log₂ n сравнений там, где хватило бы нескольких.',
    en: 'Binary search looks only at the order of the elements and makes no use of their values: whether you look for 11 or 999 in an array from 10 to 1000, the first probe is always the middle. Yet if the keys are spread evenly, the value itself tells you where to look: 999 lies almost at the very end. Binary search throws this hint away and spends log₂ n comparisons where a few would do.',
  },

  solution: {
    ru: 'Границы `lo` и `hi` отмечают диапазон, где искомое ещё может быть. Сначала поиск сверяет искомое с концами: если оно меньше `arr[lo]` или больше `arr[hi]`, его нет. Иначе позиция пробы считается **линейной интерполяцией** - какую долю пути от `arr[lo]` до `arr[hi]` прошло искомое, такую же долю пути от `lo` до `hi` проходит индекс: `pos = lo + ⌊(target - arr[lo]) · (hi - lo) / (arr[hi] - arr[lo])⌋`. Дальше всё как в бинарном поиске: совпало - ответ, проба меньше искомого - `lo = pos + 1`, больше - `hi = pos - 1`. Если концы равны, делить нельзя, но тогда искомое внутри может быть только равно им.',
    en: 'The bounds `lo` and `hi` mark the range where the target can still be. First the search checks the target against the ends: if it is less than `arr[lo]` or greater than `arr[hi]`, it is absent. Otherwise the probe position is found by **linear interpolation** - whatever share of the way from `arr[lo]` to `arr[hi]` the target has covered, the index covers the same share of the way from `lo` to `hi`: `pos = lo + ⌊(target - arr[lo]) · (hi - lo) / (arr[hi] - arr[lo])⌋`. From there it is the same as binary search: a match is the answer, a probe less than the target gives `lo = pos + 1`, a greater one `hi = pos - 1`. If the ends are equal, there is nothing to divide by, but then a target inside can only be equal to them.',
  },

  steps: [
    {
      title: { ru: 'Сверить искомое с концами диапазона', en: 'Check the target against the ends of the range' },
      explanation: {
        ru: 'Подсвечены крайние элементы диапазона, `arr[lo]` и `arr[hi]`. Если искомое меньше первого или больше последнего, в диапазоне его нет, и поиск кончается без новой пробы. Значения концов нужны и для следующего шага: по ним оценивается, где искомое лежит.',
        en: 'The end elements of the range, `arr[lo]` and `arr[hi]`, are highlighted. If the target is less than the first or greater than the last, it is not in the range, and the search ends without another probe. The values at the ends are needed for the next step too: they are what the position is estimated from.',
      },
    },
    {
      title: { ru: 'Оценить позицию по значению', en: 'Estimate the position from the value' },
      explanation: {
        ru: 'Проба - не середина, а `pos = lo + ⌊(target - arr[lo]) · (hi - lo) / (arr[hi] - arr[lo])⌋`. Для 42 в массиве от 10 до 49 это `⌊32 · 11 / 39⌋ = 9`, и `arr[9]` - сразу 42. Бинарный поиск начал бы с середины, `arr[5] = 28`, и потратил бы 4 сравнения: 28, 38, 45, 42.',
        en: 'The probe is not the middle but `pos = lo + ⌊(target - arr[lo]) · (hi - lo) / (arr[hi] - arr[lo])⌋`. For 42 in an array from 10 to 49 that is `⌊32 · 11 / 39⌋ = 9`, and `arr[9]` is 42 straight away. Binary search would start at the middle, `arr[5] = 28`, and spend 4 comparisons: 28, 38, 45, 42.',
      },
    },
    {
      title: { ru: 'Сузить диапазон за пробой', en: 'Narrow the range past the probe' },
      explanation: {
        ru: 'Проба меньше искомого - она и всё левее неё отброшены, `lo = pos + 1`. Больше - отброшены она и всё правее, `hi = pos - 1`. Отброшенное остаётся пустым контуром, и оценка повторяется по концам нового диапазона.',
        en: 'The probe is less than the target - it and everything to its left are discarded, `lo = pos + 1`. Greater - it and everything to its right are discarded, `hi = pos - 1`. The discarded part is left as an empty outline, and the estimate is repeated from the ends of the new range.',
      },
    },
    {
      title: { ru: 'Совпало - вернуть индекс', en: 'A match - return the index' },
      explanation: {
        ru: 'Проба равна искомому - ответ `pos`. Среди дубликатов это то вхождение, куда попала проба, а не обязательно первое. Если концы диапазона равны, делить на их разность нельзя, но искомое между ними тогда равно им, и ответ - `lo`.',
        en: 'The probe equals the target - the answer is `pos`. Among duplicates this is whichever occurrence the probe hit, not necessarily the first. If the ends of the range are equal, there is no dividing by their difference, but then a target between them equals them, and the answer is `lo`.',
      },
    },
    {
      title: { ru: 'Искомого нет - вернуть -1', en: 'The target is absent - return -1' },
      explanation: {
        ru: 'Искомое вышло за концы диапазона или диапазон опустел - ответ `-1`. Для 50 это видно сразу: оно больше `arr[11] = 49`, и пробы не нужны. Для 21 - после одной: проба `arr[3] = 20` меньше, а в новом диапазоне 21 меньше его первого элемента 24.',
        en: 'The target has gone past the ends of the range, or the range is empty - the answer is `-1`. For 50 this is clear at once: it is greater than `arr[11] = 49`, and no probes are needed. For 21 it takes one: the probe `arr[3] = 20` is less, and in the new range 21 is less than its first element, 24.',
      },
    },
  ],

  implementation: {
    javascript: `function interpolationSearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    if (arr[hi] === arr[lo]) return lo;
    const pos = lo + Math.floor(((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo]));
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) lo = pos + 1;
    else hi = pos - 1;
  }
  return -1;
}`,
    python: `def interpolation_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi and arr[lo] <= target <= arr[hi]:
        if arr[hi] == arr[lo]:
            return lo
        pos = lo + int((target - arr[lo]) * (hi - lo) // (arr[hi] - arr[lo]))
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            lo = pos + 1
        else:
            hi = pos - 1
    return -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`interpolationSearch` принимает отсортированный по возрастанию массив чисел `arr` и искомое число `target` и вернёт индекс совпадения или `-1`. Числа нужны не для красоты: формула ниже вычитает и делит ключи. Порядок массива функция не проверяет - это стоило бы O(n).',
          en: '`interpolationSearch` takes an array of numbers `arr` sorted in ascending order and a target number `target` and returns the index of a match, or `-1`. The numbers matter: the formula below subtracts and divides keys. The function does not check the order of the array - that would cost O(n).',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Границы диапазона', en: 'The bounds of the range' },
        explanation: {
          ru: '`lo` и `hi` - первый и последний индексы диапазона, где искомое ещё может быть, обе границы включены. Сначала это весь массив. Для пустого массива `hi = -1`, и цикл ниже не выполнится ни разу.',
          en: '`lo` and `hi` are the first and last indices of the range where the target can still be, both bounds included. At first that is the whole array. For an empty array `hi = -1`, and the loop below never runs.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Искомое между концами', en: 'The target between the ends' },
        explanation: {
          ru: 'Цикл идёт, пока диапазон не пуст и искомое лежит между `arr[lo]` и `arr[hi]`. Вторая половина условия - не оптимизация, а защита: только тогда доля в формуле ниже от 0 до 1, и `pos` попадает в диапазон. Без неё поиск `100` среди нечётных чисел от 1 до 19 даёт `pos = 49`. Заодно значение вне диапазона отсекается без единой пробы.',
          en: 'The loop runs while the range is not empty and the target lies between `arr[lo]` and `arr[hi]`. The second half of the condition is not an optimisation but a guard: only then is the share in the formula below between 0 and 1, so `pos` lands inside the range. Without it a search for `100` among the odd numbers 1 to 19 gives `pos = 49`. As a bonus, a value outside the range is ruled out without a single probe.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Равные концы', en: 'Equal ends' },
        explanation: {
          ru: 'Если `arr[hi] === arr[lo]`, в формуле ниже знаменатель равен нулю. Но условие цикла уже проверило, что искомое между концами, а между равными числами есть только они сами, поэтому ответ - `lo`. Без этой строки `interpolationSearch([4, 4, 4, 4], 4)` в JS вернёт `-1`: `0 / 0` - это `NaN`, а `arr[NaN]` - `undefined`.',
          en: 'If `arr[hi] === arr[lo]`, the denominator in the formula below is zero. But the loop condition has already checked that the target is between the ends, and between equal numbers there is only that number itself, so the answer is `lo`. Without this line `interpolationSearch([4, 4, 4, 4], 4)` in JS returns `-1`: `0 / 0` is `NaN`, and `arr[NaN]` is `undefined`.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Оценка позиции', en: 'Estimating the position' },
        explanation: {
          ru: '`(target - arr[lo]) / (arr[hi] - arr[lo])` - какую долю пути между значениями концов прошло искомое. Та же доля от `hi - lo` - сколько индексов отступить от `lo`. Для 42 в массиве `[10, 13, ..., 49]` из 12 чисел это `32 · 11 / 39 ≈ 9.03`, и `Math.floor` даёт индекс `9`.',
          en: '`(target - arr[lo]) / (arr[hi] - arr[lo])` is the share of the way between the end values that the target has covered. The same share of `hi - lo` is how many indices to step from `lo`. For 42 in the 12-number array `[10, 13, ..., 49]` that is `32 · 11 / 39 ≈ 9.03`, and `Math.floor` gives index `9`.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Целый индекс и большие числа', en: 'A whole index and large numbers' },
        explanation: {
          ru: 'Сначала умножение, потом деление: в целочисленной арифметике (Java, C, `//` в Python) деление первым почти всегда давало бы 0. `Math.floor` от числа с плавающей точкой даёт целое значение, и индекс получается обычным. Переполнения, как у 32-битного `int` в Java, в JS нет, но после 2^53 произведение округляется: на миллионе ключей до 10^18 все 2000 проверочных поисков нашли верный индекс, и `pos` ни разу не вышел из диапазона.',
          en: 'Multiplication comes first, then division: in integer arithmetic (Java, C, `//` in Python) dividing first would almost always give 0. `Math.floor` of a floating-point number gives a whole value, so the index is an ordinary one. There is no overflow in JS like that of a 32-bit `int` in Java, but past 2^53 the product is rounded: on a million keys up to 10^18 all 2000 test searches found the right index, and `pos` never left the range.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Совпадение', en: 'A match' },
        explanation: {
          ru: 'Проба равна искомому - функция возвращает `pos`. Среди дубликатов это любое вхождение, куда попала проба: в `[1, 3, 3, 3, 3, 3, 5]` поиск `3` даёт `3`, в `[1, 3, 3, 3, 3]` - `4`, последнее.',
          en: 'The probe equals the target - the function returns `pos`. Among duplicates this is whichever occurrence the probe hit: in `[1, 3, 3, 3, 3, 3, 5]` a search for `3` gives `3`, in `[1, 3, 3, 3, 3]` it gives `4`, the last one.',
        },
      },
      {
        lines: [8, 9],
        title: { ru: 'Сдвинуть границу за пробу', en: 'Move a bound past the probe' },
        explanation: {
          ru: 'Проба меньше искомого - она и всё левее неё меньше, и `lo` переходит на `pos + 1`. Больше - `hi` переходит на `pos - 1`. Проба исключается в обоих случаях, поэтому диапазон каждый раз становится хотя бы на один элемент меньше, и цикл обязательно кончится.',
          en: 'The probe is less than the target - it and everything to its left are less, and `lo` moves to `pos + 1`. Greater - `hi` moves to `pos - 1`. The probe is ruled out either way, so the range shrinks by at least one element every time, and the loop is sure to end.',
        },
      },
      {
        lines: [10, 12],
        title: { ru: 'Искомого нет', en: 'The target is absent' },
        explanation: {
          ru: 'Цикл кончился - диапазон опустел или искомое вышло за его концы, и ответ `-1`. Как быстро это случится, зависит от данных: на равномерных ключах это несколько проб, а на неравномерных проба может каждый раз падать на `lo`, и поиск пойдёт по одному элементу.',
          en: 'The loop has ended - the range is empty or the target has gone past its ends, and the answer is `-1`. How soon that happens depends on the data: on evenly spread keys it is a few probes, while on uneven ones the probe can land on `lo` every time, and the search moves one element at a time.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`interpolation_search` принимает отсортированный по возрастанию список чисел `arr` и искомое `target` и вернёт индекс совпадения или `-1`. Для строк функция не подходит: `\'b\' - \'a\'` в Python - `TypeError`.',
          en: '`interpolation_search` takes a list of numbers `arr` sorted in ascending order and a target `target` and returns the index of a match, or `-1`. It does not work for strings: `\'b\' - \'a\'` in Python is a `TypeError`.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Границы диапазона', en: 'The bounds of the range' },
        explanation: {
          ru: '`lo` и `hi` - первый и последний индексы диапазона, обе границы включены. Для пустого списка `hi = -1`, и цикл не начнётся.',
          en: '`lo` and `hi` are the first and last indices of the range, both bounds included. For an empty list `hi = -1`, and the loop does not start.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Искомое между концами', en: 'The target between the ends' },
        explanation: {
          ru: '`arr[lo] <= target <= arr[hi]` - цепочка сравнений, в Python она значит то же, что два сравнения через `and`. Без неё поиск `100` среди нечётных чисел от 1 до 19 падает с `IndexError`, а поиск `0` даёт `pos = -1` и молча читает `arr[-1]` - последний элемент, потому что отрицательный индекс в Python считается с конца.',
          en: '`arr[lo] <= target <= arr[hi]` is a comparison chain; in Python it means the same as two comparisons joined by `and`. Without it a search for `100` among the odd numbers 1 to 19 fails with `IndexError`, and a search for `0` gives `pos = -1` and silently reads `arr[-1]` - the last element, because a negative index in Python counts from the end.',
        },
      },
      {
        lines: [4, 5],
        title: { ru: 'Равные концы', en: 'Equal ends' },
        explanation: {
          ru: 'Концы равны - делить на их разность нельзя, а искомое между ними может быть только равно им, поэтому ответ `lo`. Без этой проверки `interpolation_search([4, 4, 4, 4], 4)` падает с `ZeroDivisionError`.',
          en: 'The ends are equal - there is no dividing by their difference, and a target between them can only be equal to them, so the answer is `lo`. Without this check `interpolation_search([4, 4, 4, 4], 4)` fails with `ZeroDivisionError`.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Оценка позиции', en: 'Estimating the position' },
        explanation: {
          ru: 'Та же пропорция, что в JS. `//` делит с округлением вниз, а целые числа в Python не переполняются: на ключах до 10^36 ответы верные. Зачем `int`: на числах с плавающей точкой `//` даёт `1.0`, а не `1`, и `arr[1.0]` - `TypeError`. Так падал поиск `0.5` в `[0.1, 0.5, 0.9]`, пока `int` не было.',
          en: 'The same proportion as in JS. `//` divides rounding down, and integers in Python do not overflow: on keys up to 10^36 the answers are right. Why `int`: on floating-point numbers `//` gives `1.0`, not `1`, and `arr[1.0]` is a `TypeError`. That is how a search for `0.5` in `[0.1, 0.5, 0.9]` failed before `int` was there.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Совпадение', en: 'A match' },
        explanation: {
          ru: 'Проба равна искомому - ответ `pos`. Среди дубликатов это не обязательно первое вхождение: в `[1, 3, 3, 3, 3, 3, 5]` поиск `3` даёт `3`.',
          en: 'The probe equals the target - the answer is `pos`. Among duplicates it is not necessarily the first occurrence: in `[1, 3, 3, 3, 3, 3, 5]` a search for `3` gives `3`.',
        },
      },
      {
        lines: [9, 12],
        title: { ru: 'Сдвинуть границу за пробу', en: 'Move a bound past the probe' },
        explanation: {
          ru: 'Проба меньше искомого - `lo` переходит за неё, больше - `hi` переходит перед ней. Проба исключается в обоих случаях, так что диапазон всякий раз сужается хотя бы на один элемент.',
          en: 'The probe is less than the target - `lo` moves past it; greater - `hi` moves before it. The probe is ruled out either way, so the range narrows by at least one element every time.',
        },
      },
      {
        lines: [13],
        title: { ru: 'Искомого нет', en: 'The target is absent' },
        explanation: {
          ru: 'Диапазон опустел или искомое вышло за его концы - ответ `-1`. На равномерных ключах до этого доходит за несколько проб, а на неравномерных данных - до n.',
          en: 'The range is empty or the target has gone past its ends - the answer is `-1`. On evenly spread keys it gets here within a few probes, and on uneven data within up to n.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'На равномерно распределённых ключах в среднем O(log log n) проб: в прогоне на миллионе случайных ключей около 4 против 19 у бинарного поиска.',
      en: 'On evenly distributed keys it makes O(log log n) probes on average: in a run on a million random keys about 4, against 19 for binary search.',
    },
    {
      ru: 'Пробы ложатся рядом с искомым, а не по всему массиву, поэтому в файле на диске меньше страниц приходится читать в память.',
      en: 'The probes land near the target rather than all over the array, so in a file on disk fewer pages have to be read into memory.',
    },
    {
      ru: 'Значение меньше первого или больше последнего элемента отсекается сразу, без единой пробы.',
      en: 'A value less than the first or greater than the last element is ruled out at once, without a single probe.',
    },
  ],
  cons: [
    {
      ru: 'Худший случай O(n): в `[1, 2, ..., 9999, 10^9]` поиск `9999` делает 9999 проб, бинарному хватает 13.',
      en: 'The worst case is O(n): in `[1, 2, ..., 9999, 10^9]` a search for `9999` makes 9999 probes, while binary search needs 13.',
    },
    {
      ru: 'Только для чисел или ключей, которые можно превратить в число: формула вычитает и делит, и строки ей не подходят.',
      en: 'Only for numbers or keys that can be turned into a number: the formula subtracts and divides, so strings do not fit it.',
    },
    {
      ru: 'Больше ловушек, чем у бинарного: деление на ноль при равных концах, выход `pos` за диапазон, переполнение произведения в 32-битном `int`.',
      en: 'More traps than binary search: division by zero when the ends are equal, `pos` leaving the range, overflow of the product in a 32-bit `int`.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда ключи - числа, распределённые примерно равномерно, а каждое обращение к данным дорогое: файл во внешней памяти, где время поиска определяется числом чтений.',
      en: 'When the keys are numbers spread roughly evenly and every access to the data is expensive: a file in external memory, where search time is set by the number of reads.',
    },
    {
      ru: 'Когда распределение неизвестно или нужна гарантия на худший случай, лучше **Binary Search** или гибрид, который не даст интерполяции выродиться в O(n).',
      en: 'When the distribution is unknown or a worst-case guarantee is needed, **Binary Search** is the better choice, or a hybrid that keeps interpolation from degrading to O(n).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Файлы во внешней памяти** - Перл, Итаи и Авни (1978) пишут, что для внешнего поиска интерполяционный лучше бинарного: время определяется числом обращений. А раз пробы ложатся рядом с искомым, при страничной памяти меньше промахов страниц.',
      en: '**Files in external memory** - Perl, Itai and Avni (1978) write that for external search interpolation beats binary search, since time is set by the number of accesses. And because the probes land near the target, a paged memory sees fewer page faults.',
    },
    {
      ru: '**Отсортированные массивы в памяти** - Ван Сандт, Хронис и Патель (SIGMOD 2019) снова сравнили интерполяционный поиск с оптимизированным бинарным и предложили свои варианты для неравномерных данных. Мы читали только аннотацию, поэтому их цифры не приводим.',
      en: '**Sorted arrays in memory** - Van Sandt, Chronis and Patel (SIGMOD 2019) compared interpolation search with an optimised binary search again and proposed their own variants for uneven data. We have read only the abstract, so we do not quote their figures.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Интерполяционный поиск меняет одно: где пробовать.** Схема та же, что у **Binary Search** - сравнить, отбросить часть, повторить, - но точка пробы считается по значению искомого. В демо-массиве `[10, 13, 17, ..., 49]` из 12 чисел поиск 42 попадает с первой пробы: `⌊32 · 11 / 39⌋ = 9`, а `arr[9] = 42`. Бинарный поиск на том же массиве проверяет 28, 38, 45 и только потом 42. Цена - зависимость от того, как распределены ключи.',
        en: '**Interpolation search changes one thing: where to probe.** The scheme is the same as **Binary Search** - compare, discard a part, repeat - but the probe point is computed from the target\'s value. In the 12-number demo array `[10, 13, 17, ..., 49]` a search for 42 hits on the first probe: `⌊32 · 11 / 39⌋ = 9`, and `arr[9] = 42`. Binary search on the same array checks 28, 38 and 45 and only then 42. The price is a dependence on how the keys are distributed.',
      },
      {
        ru: '**Формула и её границы.** Доля `(target - arr[lo]) / (arr[hi] - arr[lo])` лежит от 0 до 1, только если искомое между концами, - тогда и `pos` между `lo` и `hi`. Поэтому проверка концов стоит в условии цикла: без неё поиск 100 среди нечётных чисел от 1 до 19 даёт `pos = 49` в массиве из 10 элементов. Python падает с `IndexError`, а поиск 0 даёт `pos = -1` и тихо читает последний элемент. JS читает `undefined` и возвращает верный `-1` - но по случайности.',
        en: '**The formula and its bounds.** The share `(target - arr[lo]) / (arr[hi] - arr[lo])` lies between 0 and 1 only if the target is between the ends - and then `pos` is between `lo` and `hi`. That is why the check of the ends sits in the loop condition: without it a search for 100 among the odd numbers 1 to 19 gives `pos = 49` in an array of 10 elements. Python fails with `IndexError`, and a search for 0 gives `pos = -1` and quietly reads the last element. JS reads `undefined` and returns the right `-1` - but by luck.',
      },
      {
        ru: 'Откуда **O(log log n)**. Перл, Итаи и Авни (CACM, 1978) доказывают его в предположении, что N ключей - независимые случайные числа, **равномерно распределённые** на отрезке. Средняя ошибка оценки после первой пробы меньше √N, а после j-й - меньше N^(2^-j): каждая проба в среднем извлекает из ошибки квадратный корень. После log log N проб средняя ошибка не больше двух. Тот же результат верен, если известна функция распределения ключей: применив её к ключам, получаем равномерные.',
        en: 'Where **O(log log n)** comes from. Perl, Itai and Avni (CACM, 1978) prove it assuming the N keys are independent random numbers **uniformly distributed** over an interval. The average error of the estimate after the first probe is less than √N, and after the j-th less than N^(2^-j): each probe takes, on average, the square root of the error. After log log N probes the average error is at most two. The same holds if the distribution function of the keys is known: applying it to the keys makes them uniform.',
      },
      {
        ru: '**Что это значит в числах.** log₂ log₂ n для миллиона - 4.32, для миллиарда - 4.90, против 20 и 30 сравнений у бинарного поиска в худшем случае. Прогон на 10^6 равномерных случайных ключей, 4000 поисков существующих значений: в среднем 4.24 пробы в JS и 4.10 в Python, максимум 10; бинарный в среднем 18.97. У Перла и др. на 400 000 ключей - 4.28 при log log N = 4.21.',
        en: '**What that means in numbers.** log₂ log₂ n is 4.32 for a million and 4.90 for a billion, against 20 and 30 comparisons for binary search in the worst case. A run on 10^6 evenly spread random keys, 4000 searches for present values: 4.24 probes on average in JS and 4.10 in Python, at most 10; binary search averages 18.97. Perl et al. report 4.28 on 400,000 keys with log log N = 4.21.',
      },
      {
        ru: '**Худший случай - O(n)**, и построить его легко. В `[1, 2, ..., 9999, 10^9]` один выброс в конце растягивает отрезок значений, и для искомого 9999 доля в формуле почти ноль: каждая проба падает на `lo`, и поиск идёт по одному элементу - **9999 проб**, у бинарного 13. На значениях 2^i при n = 1000 худший поиск стоит 990 проб, в среднем 493, у бинарного - не больше 10. Формула предполагает, что значения растут равномерно, и на таких данных систематически промахивается в одну сторону.',
        en: '**The worst case is O(n)**, and it is easy to build. In `[1, 2, ..., 9999, 10^9]` one outlier at the end stretches the range of values, and for the target 9999 the share in the formula is nearly zero: every probe lands on `lo`, and the search moves one element at a time - **9999 probes**, against 13 for binary search. On the values 2^i with n = 1000 the worst search costs 990 probes, 493 on average, and binary search at most 10. The formula assumes values grow evenly, and on such data it keeps missing to the same side.',
      },
      {
        ru: '**Равные значения** ломают формулу дважды. Если `arr[hi] === arr[lo]`, знаменатель ноль: Python падает с `ZeroDivisionError`, а JS считает `0 / 0 = NaN` и для `[4, 4, 4, 4]` молча отвечает `-1`, хотя 4 в массиве есть. Проверка концов спасает: искомое между равными числами может быть только равно им. **Дубликаты** же дают произвольное вхождение: `[1, 3, 3, 3, 3, 3, 5]` - индекс 3, `[1, 3, 3, 3, 3]` - 4, `[3, 3, 3, 3, 5]` - 0. На случайных массивах с повторами все ответы оказались верными совпадениями, но в прогоне JS 54 784 из 1 708 000 - не первыми.',
        en: '**Equal values** break the formula twice. If `arr[hi] === arr[lo]`, the denominator is zero: Python fails with `ZeroDivisionError`, while JS computes `0 / 0 = NaN` and for `[4, 4, 4, 4]` silently answers `-1`, though 4 is in the array. The check of the ends saves it: a target between equal numbers can only be equal to them. **Duplicates**, for their part, give an arbitrary occurrence: `[1, 3, 3, 3, 3, 3, 5]` gives index 3, `[1, 3, 3, 3, 3]` gives 4, `[3, 3, 3, 3, 5]` gives 0. On random arrays with repeats every answer was a correct match, but in the JS run 54,784 of 1,708,000 were not the first one.',
      },
      {
        ru: '**Арифметика над ключами** - то, чего бинарному поиску не нужно. Ключи должны вычитаться и делиться: в Python строки дают `TypeError`, а в JS `\'b\' - \'a\'` - это `NaN`, и поиск `\'b\'` в `[\'a\', \'b\', \'c\']` молча возвращает `-1`. В Java с `int` произведение `(target - arr[lo]) * (hi - lo)` переполняется: на 100 000 чисел `i · 20 000` поиск `arr[60000]` получил `pos = lo - 1` и зациклился - остановили после 3 млн итераций, лечится `long`. В JS переполнения нет, после 2^53 только округление; в Python целые точны, а для float нужен `int(...)` вокруг `//`.',
        en: '**Arithmetic on keys** is something binary search does not need. The keys must subtract and divide: in Python strings give a `TypeError`, and in JS `\'b\' - \'a\'` is `NaN`, so a search for `\'b\'` in `[\'a\', \'b\', \'c\']` silently returns `-1`. In Java with `int` the product `(target - arr[lo]) * (hi - lo)` overflows: on 100,000 numbers `i · 20,000` a search for `arr[60000]` got `pos = lo - 1` and looped forever - we stopped it after 3 million iterations; `long` fixes it. JS has no overflow, only rounding past 2^53; in Python integers are exact, and floats need `int(...)` around `//`.',
      },
      {
        ru: '**История.** Первым метод описал **У. У. Петерсон**, «Addressing for Random-Access Storage», IBM Journal of Research and Development, апрель 1957, с. 130-146; интерполяции там посвящено несколько абзацев на с. 131-132. Его пример: номера записей от 0000 до 9999, ищем 1000 - смотрим на десятую часть файла. Петерсон оценил метод в 0.5 log₂ N обращений, и не меньше; Перл, Итаи и Авни показали, что их около log log N, и сообщают, что Яо и Яо (1976) получили то же другим путём и доказали, что быстрее в среднем не может ни один алгоритм. По их же словам, это решение упражнения 22 из §6.2.1 Кнута; ни книгу Кнута, ни статью Яо мы не открывали.',
        en: '**History.** The method was first described by **W. W. Peterson**, "Addressing for Random-Access Storage", IBM Journal of Research and Development, April 1957, pp. 130-146; interpolation gets a few paragraphs on pp. 131-132. His example: record numbers from 0000 to 9999, looking for 1000 - look a tenth of the way into the file. Peterson estimated the method at 0.5 log₂ N accesses and no fewer; Perl, Itai and Avni showed there are about log log N, and report that Yao and Yao (1976) got the same by another route and proved that no algorithm can do better on average. By their account this solves exercise 22 of Knuth\'s §6.2.1; we have opened neither Knuth\'s book nor the Yao paper.',
      },
    ],
    whenToUse: [
      {
        ru: '**Числовые ключи, равномерные и во внешней памяти** - главный случай. Перл и др. пишут, что для внешнего поиска интерполяционный лучше бинарного, а в памяти на IBM 370/165 оба шли примерно одинаково: интерполяционный выигрывал лишь на файлах больше 5000 записей, а бинарный со сдвигом вместо деления был ещё быстрее.',
        en: '**Numeric keys, evenly spread and in external memory** - the main case. Perl et al. write that for external search interpolation beats binary search, while in memory on an IBM 370/165 the two ran about the same: interpolation won only on files larger than 5000 records, and binary search with a shift instead of a division was faster still.',
      },
      {
        ru: '**Распределение неизвестно или неравномерно** - выбирайте **Binary Search**: O(log n) при любых данных, а интерполяция на выбросе или на экспоненциально растущих значениях вырождается в проход по одному элементу.',
        en: '**The distribution is unknown or uneven** - choose **Binary Search**: O(log n) on any data, while interpolation on an outlier or on exponentially growing values degrades into a walk one element at a time.',
      },
      {
        ru: '**Нужна гарантия O(log n) и скорость интерполяции** - гибриды. Бонасера и др. (Adaptive Search, 2015) сначала сужают диапазон пробой интерполяции, а если осталось больше половины, делят остаток ещё и пополам: в худшем случае O(log n), на данных, близких к равномерным, - O(log log n), как у интерполяции. Похожий гибрид Санторо и Сидни (1985) мы знаем только по их пересказу.',
        en: '**A guarantee of O(log n) plus the speed of interpolation** - hybrids. Bonasera et al. (Adaptive Search, 2015) first narrow the range with an interpolation probe, and if more than half is left, they also halve the rest: O(log n) in the worst case, and O(log log n) on nearly even data, as with interpolation. A similar hybrid by Santoro and Sidney (1985) we know only from their summary.',
      },
      {
        ru: '**Ключи не числа** - строки, составные ключи - интерполяция без отображения в число невозможна: формуле нечего вычитать. Здесь тоже нужен **Binary Search**, ему хватает сравнения.',
        en: '**The keys are not numbers** - strings, compound keys - interpolation is impossible without mapping them to numbers: the formula has nothing to subtract. Here too the answer is **Binary Search**, which needs only comparison.',
      },
      {
        ru: '**Последние шаги** - Перл и др. советуют, когда пробы уже близко, перейти на последовательный поиск и сэкономить вычисления. Статья с названием «The Interpolation-Sequential Search Algorithm» есть у Гоннета и Роджерса (IPL, 1977), но её мы не открывали.',
        en: '**The last steps** - Perl et al. advise switching to sequential search once the probes are close, to save computation. A paper titled "The Interpolation-Sequential Search Algorithm" exists by Gonnet and Rogers (IPL, 1977), but we have not opened it.',
      },
    ],
    realWorld: [
      {
        ru: '**W. W. Peterson, «Addressing for Random-Access Storage», IBM J. Res. Dev. 1(2), 1957, с. 130-146** - статья в основном про адресацию записей в памяти с произвольным доступом; интерполяции - несколько абзацев на с. 131-132 под именем «modified binary search» и оценка 0.5 log₂ N. Сверено по скану статьи.',
        en: '**W. W. Peterson, "Addressing for Random-Access Storage", IBM J. Res. Dev. 1(2), 1957, pp. 130-146** - a paper mostly about addressing records in random-access storage; interpolation is a few paragraphs on pp. 131-132 under the name "modified binary search", with the 0.5 log₂ N estimate. Checked against a scan of the paper.',
      },
      {
        ru: '**Y. Perl, A. Itai, H. Avni, «Interpolation Search - A Log Log N Search», CACM 21(7), июль 1978, с. 550-553** - доказательство log log N для равномерных ключей, оценка лишних проб (в среднем не больше 0.53), опыт на 400 000 ключей. Сверено по PDF со страницы Итаи в Технионе.',
        en: '**Y. Perl, A. Itai, H. Avni, "Interpolation Search - A Log Log N Search", CACM 21(7), July 1978, pp. 550-553** - the proof of log log N for uniform keys, a bound on extra probes (at most 0.53 on average), an experiment on 400,000 keys. Checked against the PDF on Itai\'s Technion page.',
      },
      {
        ru: '**A. C. Yao, F. F. Yao, «The Complexity of Searching an Ordered Random Table», FOCS 1976, с. 173-177** - по Перлу и др., тот же log log N комбинаторным путём и нижняя граница для любого алгоритма. Саму статью мы не открывали.',
        en: '**A. C. Yao, F. F. Yao, "The Complexity of Searching an Ordered Random Table", FOCS 1976, pp. 173-177** - according to Perl et al., the same log log N by a combinatorial route and a lower bound for any algorithm. We have not opened the paper itself.',
      },
      {
        ru: '**B. Bonasera, E. Ferrara, G. Fiumara, F. Pagano, A. Provetti, «Adaptive Search over Sorted Sets», arXiv 1502.03845, 2015** - гибрид интерполяционного и бинарного поиска с худшим случаем O(log n); там же пересказ Interpolation-Binary Search Санторо и Сидни (IPL, 1985). Сверено по препринту.',
        en: '**B. Bonasera, E. Ferrara, G. Fiumara, F. Pagano, A. Provetti, "Adaptive Search over Sorted Sets", arXiv 1502.03845, 2015** - a hybrid of interpolation and binary search with an O(log n) worst case; it also summarises Santoro and Sidney\'s Interpolation-Binary Search (IPL, 1985). Checked against the preprint.',
      },
    ],
  },

  relatedAlgorithms: ['binary-search', 'jump-search', 'linear-search', 'exponential-search', 'fibonacci-search', 'ternary-search'],

  quiz: [
    {
      question: {
        ru: 'Как интерполяционный поиск выбирает, какой элемент проверить?',
        en: 'How does interpolation search choose which element to check?',
      },
      options: [
        { ru: 'Всегда берёт середину текущего диапазона, как и бинарный поиск', en: 'It always takes the middle of the current range, like binary search' },
        { ru: 'Оценивает место по значению искомого относительно концов диапазона', en: 'It estimates the spot from the target\'s value relative to the ends' },
        { ru: 'Прыгает вперёд блоками по √n и сверяет конец каждого из блоков', en: 'It jumps ahead in blocks of √n and checks the end of each block' },
        { ru: 'Удваивает шаг от начала массива, пока не перепрыгнет искомое значение', en: 'It doubles the step from the start until it jumps past the target' },
      ],
      correct: 1,
      explanation: {
        ru: 'Проба `pos = lo + ⌊(target - arr[lo]) · (hi - lo) / (arr[hi] - arr[lo])⌋`: какую долю пути между значениями концов прошло искомое, такую долю индексов отступаем от `lo`. Середина - это бинарный поиск, блоки по √n - прыжковый, удвоение шага - экспоненциальный.',
        en: 'The probe is `pos = lo + ⌊(target - arr[lo]) · (hi - lo) / (arr[hi] - arr[lo])⌋`: whatever share of the way between the end values the target has covered, that share of the indices is stepped from `lo`. The middle is binary search, blocks of √n are jump search, a doubling step is exponential search.',
      },
      hint: {
        ru: 'Смотрите шаг «Оценить позицию по значению» на вкладке «Визуализация».',
        en: 'See the "Estimate the position from the value" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Массив `[10, 13, 17, 20, 24, 28, 31, 34, 38, 42, 45, 49]`, ищем 42. Какой индекс будет первой пробой?',
        en: 'The array `[10, 13, 17, 20, 24, 28, 31, 34, 38, 42, 45, 49]`, looking for 42. Which index is the first probe?',
      },
      options: [
        { ru: '`5` - середина массива из 12 элементов', en: '`5` - the middle of a 12-element array' },
        { ru: '`3` - конец первого блока длиной ⌊√12⌋', en: '`3` - the end of the first block of length ⌊√12⌋' },
        { ru: '`9` - то есть ⌊32 · 11 / 39⌋, и там сразу 42', en: '`9` - that is ⌊32 · 11 / 39⌋, and 42 is there' },
        { ru: '`11` - последний элемент, ведь 42 ближе к концу', en: '`11` - the last element, since 42 is near the end' },
      ],
      correct: 2,
      explanation: {
        ru: '`pos = 0 + ⌊(42 - 10) · 11 / (49 - 10)⌋ = ⌊352 / 39⌋ = 9`, и `arr[9] = 42` - найдено с первой пробы. Бинарный поиск начал бы с `arr[5] = 28` и сделал бы 4 сравнения.',
        en: '`pos = 0 + ⌊(42 - 10) · 11 / (49 - 10)⌋ = ⌊352 / 39⌋ = 9`, and `arr[9] = 42` - found on the first probe. Binary search would start at `arr[5] = 28` and make 4 comparisons.',
      },
      hint: {
        ru: 'Смотрите шаг «Оценить позицию по значению» на вкладке «Визуализация».',
        en: 'See the "Estimate the position from the value" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Искомое больше `arr[hi]`. Что сделает `interpolationSearch`?',
        en: 'The target is greater than `arr[hi]`. What does `interpolationSearch` do?',
      },
      options: [
        { ru: 'Проверит `arr[hi]` и пойдёт от него назад по одному элементу', en: 'It checks `arr[hi]` and walks back from it one element at a time' },
        { ru: 'Посчитает `pos` за пределами массива и прочитает его', en: 'It computes a `pos` beyond the array and reads it' },
        { ru: 'Сразу вернёт `-1`, не сделав ни одной пробы по массиву', en: 'It returns `-1` at once, without making a single probe' },
        { ru: 'Возьмёт середину, как бинарный поиск, и продолжит оттуда', en: 'It takes the middle, like binary search, and goes on from there' },
      ],
      correct: 2,
      explanation: {
        ru: 'Условие цикла требует `target <= arr[hi]`, поэтому цикл не начнётся, и ответ `-1` без единой пробы. Так в демо работает поиск 50 в массиве до 49. Без этой проверки `pos` вылетел бы за массив.',
        en: 'The loop condition requires `target <= arr[hi]`, so the loop does not start, and the answer is `-1` without a single probe. That is how the demo handles a search for 50 in an array that ends at 49. Without this check `pos` would fly off the array.',
      },
      hint: {
        ru: 'Смотрите шаг «Сверить искомое с концами диапазона» на вкладке «Визуализация».',
        en: 'See the "Check the target against the ends of the range" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем перед формулой стоит проверка `arr[hi] === arr[lo]`?',
        en: 'Why is there a check `arr[hi] === arr[lo]` before the formula?',
      },
      options: [
        { ru: 'Иначе деление на ноль, а искомое между равными концами равно им', en: 'Else it divides by zero, and a target between equal ends equals them' },
        { ru: 'Чтобы среди дубликатов всегда находилось первое вхождение', en: 'So that among duplicates the first occurrence is always found' },
        { ru: 'Это ускорение: при равных концах можно сразу вернуть `-1`', en: 'It is a speed-up: with equal ends `-1` can be returned at once' },
        { ru: 'Без неё на равных концах `pos` уходит за правую границу всего массива', en: 'Without it `pos` runs past the right end of the array when the ends are equal' },
      ],
      correct: 0,
      explanation: {
        ru: 'Знаменатель `arr[hi] - arr[lo]` при равных концах - ноль. В Python это `ZeroDivisionError`, в JS `0 / 0 = NaN`, и `[4, 4, 4, 4]` молча даёт `-1`. Условие цикла уже проверило, что искомое между концами, значит, оно равно им, и ответ - `lo`.',
        en: 'The denominator `arr[hi] - arr[lo]` is zero when the ends are equal. In Python that is a `ZeroDivisionError`, in JS `0 / 0 = NaN`, and `[4, 4, 4, 4]` silently gives `-1`. The loop condition has already checked that the target is between the ends, so it equals them, and the answer is `lo`.',
      },
      hint: {
        ru: 'Смотрите шаг «Равные концы» на вкладке «Реализация».',
        en: 'See the "Equal ends" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Из условия цикла в Python убрали `arr[lo] <= target <= arr[hi]`. Что будет при поиске 100 среди нечётных чисел от 1 до 19?',
        en: 'The `arr[lo] <= target <= arr[hi]` part was removed from the Python loop condition. What happens on a search for 100 among the odd numbers 1 to 19?',
      },
      options: [
        { ru: 'Ничего: цикл всё равно кончится, и ответ, как и раньше, будет `-1`', en: 'Nothing: the loop still ends, and the answer is `-1` as before' },
        { ru: '`ZeroDivisionError`: концы диапазона окажутся равны', en: '`ZeroDivisionError`: the ends of the range turn out equal' },
        { ru: 'Вечный цикл: `lo` и `hi` больше не будут сдвигаться', en: 'An endless loop: `lo` and `hi` no longer move at all' },
        { ru: '`IndexError`: формула даст `pos = 49` в списке из 10', en: '`IndexError`: the formula gives `pos = 49` in a list of 10' },
      ],
      correct: 3,
      explanation: {
        ru: '`pos = 0 + (100 - 1) · 9 // 18 = 49`, а индексы - от 0 до 9. Доля в формуле лежит от 0 до 1, только если искомое между концами. Поиск 0 без проверки ещё коварнее: `pos = -1`, и Python молча читает последний элемент.',
        en: '`pos = 0 + (100 - 1) · 9 // 18 = 49`, while the indices run from 0 to 9. The share in the formula lies between 0 and 1 only if the target is between the ends. A search for 0 without the check is sneakier still: `pos = -1`, and Python silently reads the last element.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the second paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему на равномерных ключах интерполяционному поиску в среднем хватает O(log log n) проб?',
        en: 'Why does interpolation search need only O(log log n) probes on average for evenly spread keys?',
      },
      options: [
        { ru: 'Каждая проба вдвое сужает диапазон, но середина считается иначе', en: 'Each probe halves the range, but the middle is computed more precisely' },
        { ru: 'Средняя ошибка оценки после пробы - квадратный корень из прежней', en: 'The average error after each probe is the root of the previous one' },
        { ru: 'Первая проба всегда точно попадает, а остальные нужны для проверки', en: 'The first probe always hits exactly, and the rest are only checks' },
        { ru: 'Так верно для любых отсортированных данных, распределение неважно', en: 'This holds for any sorted data, the distribution does not matter' },
      ],
      correct: 1,
      explanation: {
        ru: 'По Перлу, Итаи и Авни, средняя ошибка после первой пробы меньше √N, после j-й - меньше N^(2^-j), и после log log N проб она не больше двух. Это доказано для независимых равномерно распределённых ключей; на выбросе метод вырождается в O(n).',
        en: 'According to Perl, Itai and Avni, the average error after the first probe is less than √N, after the j-th less than N^(2^-j), and after log log N probes it is at most two. This is proven for independent, uniformly distributed keys; on an outlier the method degrades to O(n).',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the third paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернёт `interpolationSearch([1, 3, 3, 3, 3, 3, 5], 3)`?',
        en: 'What does `interpolationSearch([1, 3, 3, 3, 3, 3, 5], 3)` return?',
      },
      options: [
        { ru: '`1` - первое вхождение, как у прыжкового поиска', en: '`1` - the first occurrence, as jump search gives' },
        { ru: '`5` - последнее вхождение, ведь проба тянется к концу', en: '`5` - the last occurrence, since the probe leans to the end' },
        { ru: '`-1` - на дубликатах формула делит на ноль и сдаётся', en: '`-1` - on duplicates the formula divides by zero and gives up' },
        { ru: '`3` - ту тройку, на которую пришлась первая проба', en: '`3` - whichever 3 the first probe happened to land on' },
      ],
      correct: 3,
      explanation: {
        ru: '`pos = ⌊(3 - 1) · 6 / (5 - 1)⌋ = 3`, и `arr[3] = 3` - совпадение. Интерполяционный поиск возвращает любое вхождение, куда попала проба: в `[1, 3, 3, 3, 3]` это последнее, `4`, а в `[3, 3, 3, 3, 5]` - первое, `0`. Деления на ноль нет: концы `1` и `5` разные.',
        en: '`pos = ⌊(3 - 1) · 6 / (5 - 1)⌋ = 3`, and `arr[3] = 3` - a match. Interpolation search returns whichever occurrence the probe hit: in `[1, 3, 3, 3, 3]` that is the last, `4`, and in `[3, 3, 3, 3, 5]` the first, `0`. There is no division by zero: the ends `1` and `5` differ.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the sixth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Массив `[1, 2, ..., 9999, 10^9]` из 10 000 чисел, ищем 9999. Сколько проб сделают интерполяционный и бинарный поиск?',
        en: 'An array `[1, 2, ..., 9999, 10^9]` of 10,000 numbers, looking for 9999. How many probes do interpolation and binary search make?',
      },
      options: [
        { ru: 'Около 4 и 13: данные почти равномерные, выброс всего один', en: 'About 4 and 13: the data is nearly even, there is just one outlier' },
        { ru: 'По 13: на неравномерных данных интерполяция равна бинарному поиску', en: '13 each: on uneven data interpolation equals binary search' },
        { ru: '9999 и 13: из-за выброса в конце каждая проба падает на `lo`', en: '9999 and 13: the outlier at the end drags every probe to `lo`' },
        { ru: 'Одна и 13: выброс в конце сразу указывает на искомое', en: 'One and 13: the outlier at the end points straight to the target' },
      ],
      correct: 2,
      explanation: {
        ru: 'Отрезок значений растянут до 10^9, и доля `(9999 - arr[lo]) / (10^9 - arr[lo])` почти ноль: каждая проба падает на `lo`, и `lo` растёт на единицу. Прогон: 9999 проб против 13 у бинарного. Это и есть худший случай O(n).',
        en: 'The range of values is stretched to 10^9, and the share `(9999 - arr[lo]) / (10^9 - arr[lo])` is nearly zero: every probe lands on `lo`, and `lo` grows by one. A run: 9999 probes against 13 for binary search. That is the O(n) worst case.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fifth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Код перенесли на Java с `int`. Массив - 100 000 чисел `i · 20 000`, ищем `arr[60000]`. Что произойдёт?',
        en: 'The code was ported to Java with `int`. The array is 100,000 numbers `i · 20,000`, looking for `arr[60000]`. What happens?',
      },
      options: [
        { ru: 'Найдёт с первой пробы: данные строго равномерные', en: 'It finds it on the first probe: the data is perfectly even' },
        { ru: 'Произведение переполнится, `pos` станет `lo - 1`, цикл не кончится', en: 'The product overflows, `pos` becomes `lo - 1`, and the loop never ends' },
        { ru: 'Компилятор Java откажется собирать: произведение не влезает в `int`', en: 'The Java compiler refuses to build it: the product does not fit an `int`' },
        { ru: 'Сработает, но медленнее: Java сама перейдёт на `long`', en: 'It works, only slower: Java switches to `long` by itself' },
      ],
      correct: 1,
      explanation: {
        ru: '`(1 200 000 000) · 99 999` вместо 119 998 800 000 000 даёт в `int` 1 708 717 056. Дальше `pos` приходит на `lo - 1`, проба меньше искомого, `lo` снова тот же - прогон остановили после 3 млн итераций. Лечится `long` в произведении. В JS переполнения нет, а в Python целые не ограничены.',
        en: '`1,200,000,000 · 99,999`, instead of 119,998,800,000,000, gives 1,708,717,056 in an `int`. After that `pos` lands on `lo - 1`, the probe is less than the target, `lo` stays the same - the run was stopped after 3 million iterations. `long` in the product fixes it. JS has no overflow, and Python integers are unbounded.',
      },
      hint: {
        ru: 'Смотрите седьмой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the seventh paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Миллиард числовых ключей, распределение неизвестно, а худший случай важен. Что выбрать?',
        en: 'A billion numeric keys, the distribution unknown, and the worst case matters. What to choose?',
      },
      options: [
        { ru: 'Чистый интерполяционный: около 5 проб на миллиарде при любых данных', en: 'Plain interpolation: about 5 probes on a billion whatever the data' },
        { ru: 'Прыжковый поиск: √n проверок не зависят от распределения ключей', en: 'Jump search: √n checks do not depend on the distribution of keys' },
        { ru: 'Бинарный поиск или гибрид с гарантией O(log n), как Adaptive Search', en: 'Binary search, or an O(log n)-safe hybrid such as Adaptive Search' },
        { ru: 'Линейный поиск: только он не зависит от того, как распределены ключи', en: 'Linear search: it alone does not depend on how the keys are spread' },
      ],
      correct: 2,
      explanation: {
        ru: 'log log n ≈ 4.9 обещано только для равномерных ключей, а на неизвестных данных чистая интерполяция может дойти до O(n). Бинарному хватает 30 сравнений при любых данных, а Adaptive Search Бонасеры и др. держит O(log n) в худшем случае и O(log log n) на почти равномерных. Прыжковому нужно до 63 245, линейному - до миллиарда.',
        en: 'log log n ≈ 4.9 is promised only for uniform keys, and on unknown data plain interpolation can reach O(n). Binary search needs 30 comparisons on any data, and Adaptive Search by Bonasera et al. keeps O(log n) in the worst case and O(log log n) on nearly uniform keys. Jump search needs up to 63,245, linear search up to a billion.',
      },
      hint: {
        ru: 'Смотрите пункт «Нужна гарантия O(log n) и скорость интерполяции» раздела «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "A guarantee of O(log n) plus the speed of interpolation" item of the "Choice nuances" section on the "Intent" tab.',
      },
    },
  ],
};

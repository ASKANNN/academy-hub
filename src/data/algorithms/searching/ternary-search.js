export const ternarySearch = {
  slug: 'ternary-search',
  category: 'searching',
  name: { ru: 'Ternary Search', en: 'Ternary Search' },
  complexity: {
    time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['unimodal-input', 'random-access', 'divide-and-conquer'],

  intent: {
    ru: 'Тернарный поиск находит максимум или минимум унимодальной функции - такой, что до пика строго растёт, а после строго убывает (для минимума - наоборот). Две пробы делят отрезок на три части, и сравнение двух значений между собой отбрасывает одну крайнюю треть. Его часто путают с бинарным поиском, но в отсортированном массиве он делает больше проб, чем бинарный, и в среднем, и в худшем случае, а для пика есть способы экономнее - и это стоит знать, прежде чем его брать.',
    en: 'Ternary search finds the maximum or minimum of a unimodal function - one that rises strictly up to a peak and falls strictly after it (for a minimum, the other way round). Two probes split the stretch into three parts, and comparing the two values with each other throws away one outer third. It is often confused with binary search, but in a sorted array it makes more probes than binary search, both on average and in the worst case, and for a peak there are thriftier methods - worth knowing before you reach for it.',
  },

  problem: {
    ru: 'Бинарный поиск сравнивает элемент с **искомым** и знает, куда идти: массив отсортирован. У задачи «найти пик» искомого числа нет, а значения не отсортированы: одно значение `f(m)` не говорит, на подъёме мы или на спуске: одно и то же число бывает и слева от пика, и справа. Нужен другой вопрос к данным: не «больше ли элемент искомого», а «какое из двух значений больше». Так ставится задача, например, «найти скорость, при которой расход топлива минимален», когда расход сначала падает, потом растёт.',
    en: 'Binary search compares an element with the **target** and knows where to go: the array is sorted. The "find the peak" problem has no target, and the values are not sorted: a single value `f(m)` does not say whether we are on the way up or on the way down: the same number can sit both left and right of the peak. A different question has to be asked of the data: not "is the element greater than the target" but "which of two values is greater". That is how a problem like "find the speed at which fuel use is lowest" is posed, when the use first falls and then rises.',
  },

  solution: {
    ru: 'Внутри отрезка `[lo, hi]` ставятся две пробы, `m1` и `m2`, на трети длины от каждого конца. Если `f(m1) < f(m2)`, то `m1` точно на подъёме, и пик правее: отбрасывается всё от `lo` до `m1`. Иначе пик левее `m2`, и отбрасывается всё от `m2` до `hi`. Каждый шаг оставляет **около двух третей** отрезка. В массиве это делают, пока в отрезке больше трёх элементов, а остаток досматривают подряд; для функции на вещественных числах - фиксированное число шагов. В отличие от **Binary Search**, здесь сравнивают два значения между собой, а не значение с искомым; в отличие от **поиска золотого сечения** (о нём - на странице Fibonacci Search), пробы стоят на третях, и ни одна не переиспользуется на следующем шаге.',
    en: 'Inside the stretch `[lo, hi]` two probes, `m1` and `m2`, are placed a third of the length from each end. If `f(m1) < f(m2)`, then `m1` is surely on the way up, and the peak is to the right: everything from `lo` to `m1` is thrown away. Otherwise the peak is left of `m2`, and everything from `m2` to `hi` goes. Every step keeps **about two thirds** of the stretch. In an array this is done while the stretch holds more than three elements, and the rest is scanned one by one; for a function on real numbers - for a fixed number of steps. Unlike **Binary Search**, two values are compared with each other, not a value with a target; unlike **golden section search** (see the Fibonacci Search page), the probes sit on the thirds, and neither is reused at the next step.',
  },

  steps: [
    {
      title: { ru: 'Весь массив - кандидат на пик', en: 'The whole array may hold the peak' },
      explanation: {
        ru: 'Массив в демо сначала строго растёт, потом строго убывает. Искомого числа нет: ищем индекс самого большого элемента. Пока ничего не прочитано, пик может быть на любой из 13 позиций.',
        en: 'The demo array first rises strictly, then falls strictly. There is no target: we look for the index of the largest element. Nothing has been read yet, so the peak may be at any of the 13 positions.',
      },
    },
    {
      title: { ru: 'Две пробы делят отрезок на три', en: 'Two probes split the stretch in three' },
      explanation: {
        ru: 'Треть - `Math.floor((hi - lo) / 3)`, пробы - `m1 = lo + треть` и `m2 = hi - треть`. На отрезке 0-12 треть равна 4, и подсвечены индексы 4 и 8 - значения 31 и 49. Под столбиками видно, как вышло сравнение: два элемента сравниваются друг с другом, а не с искомым.',
        en: 'The third is `Math.floor((hi - lo) / 3)`, the probes are `m1 = lo + third` and `m2 = hi - third`. On the stretch 0-12 the third is 4, and indices 4 and 8 are highlighted - values 31 and 49. The line under the bars shows how the comparison went: two elements are compared with each other, not with a target.',
      },
    },
    {
      title: { ru: 'Отбросить крайнюю треть', en: 'Throw away an outer third' },
      explanation: {
        ru: 'Левая проба меньше - она на подъёме, и всё до неё включительно отпадает. Иначе отпадает всё от правой пробы до конца. В демо: 31 < 49 - остаются индексы 5-12, 45 > 35 - остаются 5-9, 40 < 49 - остаются 7-9. Пустым контуром показано то, что уже исключено: то слева, то справа.',
        en: 'The left probe is smaller - it is on the way up, and everything up to it, inclusive, drops out. Otherwise everything from the right probe to the end drops out. In the demo: 31 < 49 - indices 5-12 stay, 45 > 35 - 5-9 stay, 40 < 49 - 7-9 stay. An empty outline marks what has been ruled out: now on the left, now on the right.',
      },
    },
    {
      title: { ru: 'Досмотреть последние два-три', en: 'Scan the last two or three' },
      explanation: {
        ru: 'Когда в отрезке три элемента или меньше, две разные пробы внутри него уже не поставить, и цикл заканчивается. Остаток проверяется подряд, каждый следующий - с лучшим пока. В демо это 45, 49 и 43.',
        en: 'When the stretch holds three elements or fewer, two distinct probes no longer fit inside it, and the loop ends. The rest is checked one by one, each next element against the best so far. In the demo that is 45, 49 and 43.',
      },
    },
    {
      title: { ru: 'Ответ - индекс пика', en: 'The answer is the index of the peak' },
      explanation: {
        ru: 'Пик - 49 на индексе 8: три шага по две пробы и досмотр трёх элементов - два сравнения по два чтения, всего 10 чтений в коде. Число шагов зависит только от длины: в этом массиве при любом положении пика их три. «Другой массив» ставит пик в другое место, в том числе на край.',
        en: 'The peak is 49 at index 8: three steps of two probes and a scan of three elements - two comparisons of two reads each, 10 reads in the code in all. The number of steps depends only on the length: in this array it is three wherever the peak is. "Another array" puts the peak somewhere else, the edges included.',
      },
    },
  ],

  implementation: {
    javascript: `function ternarySearchPeak(arr) {
  if (arr.length === 0) return -1;
  let lo = 0;
  let hi = arr.length - 1;
  while (hi - lo > 2) {
    const third = Math.floor((hi - lo) / 3);
    const m1 = lo + third;
    const m2 = hi - third;
    if (arr[m1] < arr[m2]) lo = m1 + 1;
    else hi = m2 - 1;
  }
  let best = lo;
  for (let i = lo + 1; i <= hi; i++) {
    if (arr[i] > arr[best]) best = i;
  }
  return best;
}

function ternarySearchMax(f, lo, hi, steps = 100) {
  for (let i = 0; i < steps; i++) {
    const m1 = lo + (hi - lo) / 3;
    const m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) lo = m1;
    else hi = m2;
  }
  return (lo + hi) / 2;
}`,
    python: `def ternary_search_peak(arr):
    if not arr:
        return -1
    lo, hi = 0, len(arr) - 1
    while hi - lo > 2:
        third = (hi - lo) // 3
        m1 = lo + third
        m2 = hi - third
        if arr[m1] < arr[m2]:
            lo = m1 + 1
        else:
            hi = m2 - 1
    best = lo
    for i in range(lo + 1, hi + 1):
        if arr[i] > arr[best]:
            best = i
    return best


def ternary_search_max(f, lo, hi, steps=100):
    for _ in range(steps):
        m1 = lo + (hi - lo) / 3
        m2 = hi - (hi - lo) / 3
        if f(m1) < f(m2):
            lo = m1
        else:
            hi = m2
    return (lo + hi) / 2`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`ternarySearchPeak` принимает массив `arr`, который до пика строго растёт, а после строго убывает, и вернёт индекс пика. Искомого значения нет. Форму массива функция не проверяет: это стоило бы O(n), ради экономии которого она и нужна.',
          en: '`ternarySearchPeak` takes an array `arr` that rises strictly up to its peak and falls strictly after it, and returns the index of the peak. There is no target value. The function does not check the shape of the array: that would cost O(n), the very cost it exists to avoid.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Пустой массив', en: 'An empty array' },
        explanation: {
          ru: 'У пустого массива пика нет, и ответ `-1`. Без этой строки цикл не выполнится ни разу, и функция вернёт `0` - индекс несуществующего элемента.',
          en: 'An empty array has no peak, and the answer is `-1`. Without this line the loop never runs, and the function returns `0` - the index of an element that does not exist.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Границы', en: 'The bounds' },
        explanation: {
          ru: '`lo` и `hi` - индексы первого и последнего кандидата, оба включительно. Сначала это весь массив. Если взять `hi = arr.length`, JS иногда прочитает `arr[n]` - `undefined` - и промолчит: сравнение с ним всегда ложно, и на 1830 проверенных массивах ответ не испортился. Python в том же месте в 61 случае из 1830 падает с `IndexError`.',
          en: '`lo` and `hi` are the indices of the first and the last candidate, both inclusive. At first that is the whole array. Take `hi = arr.length` and JS sometimes reads `arr[n]` - `undefined` - and stays silent: a comparison with it is always false, and on 1830 checked arrays the answer was never spoiled. Python in the same spot fails with `IndexError` in 61 cases out of 1830.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Пока кандидатов больше трёх', en: 'While more than three candidates remain' },
        explanation: {
          ru: '`hi - lo > 2` значит, что в отрезке не меньше четырёх элементов. Тогда треть не меньше 1, и пробы стоят внутри отрезка и не совпадают. При трёх и меньше треть была бы 0, пробы легли бы на концы, и вариант с `lo = m1` (как в функции ниже) топтался бы на месте вечно - так и вышло в прогоне с условием `lo < hi`. Нашему коду с `m1 + 1` и `m2 - 1` хватило бы и `lo < hi` без досмотра - в прогоне ни одной ошибки, - но граница `> 2` держит код верным при любой из двух записей, и так же её ставит cp-algorithms.',
          en: '`hi - lo > 2` means the stretch holds at least four elements. Then the third is at least 1, and the probes sit inside the stretch and differ. With three or fewer the third would be 0, the probes would land on the ends, and a variant with `lo = m1` (as in the function below) would stand still forever - which is what a run with the condition `lo < hi` showed. Our code, with `m1 + 1` and `m2 - 1`, would also do with `lo < hi` and no scan - not a single error in a run - but the bound `> 2` keeps the code right with either way of writing it, and cp-algorithms sets it the same way.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Две пробы', en: 'Two probes' },
        explanation: {
          ru: '`third` - треть длины, округлённая вниз. `m1` отступает на неё от левого края, `m2` - от правого. `Math.floor` обязателен: без него индексы становятся дробными - в этом примере на втором шаге, `arr[5.67]` - `undefined`, сравнение ложно, и `ternarySearchPeak([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])` вернёт 4 вместо 9. Записать `m2` как `lo + 2 * third` можно, но только при этом условии цикла: с `lo < hi` на отрезке из двух элементов `m1` и `m2` совпадут, и в прогоне около половины ответов были неверными.',
          en: '`third` is a third of the length, rounded down. `m1` steps that far from the left end, `m2` from the right. `Math.floor` is required: without it the indices turn fractional - in this example at the second step, `arr[5.67]` is `undefined`, the comparison is false, and `ternarySearchPeak([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])` returns 4 instead of 9. Writing `m2` as `lo + 2 * third` works, but only with this loop condition: with `lo < hi`, on a stretch of two elements `m1` and `m2` coincide, and in a run about half the answers were wrong.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Пик правее левой пробы', en: 'The peak is right of the left probe' },
        explanation: {
          ru: '`arr[m1] < arr[m2]` - значит, `m1` на подъёме: на спуске всё правее меньше. Пик правее `m1`, и `lo` переезжает на `m1 + 1`, отбрасывая левую треть вместе с самой пробой.',
          en: '`arr[m1] < arr[m2]` means `m1` is on the way up: on the way down everything further right is smaller. The peak is right of `m1`, and `lo` moves to `m1 + 1`, dropping the left third along with the probe itself.',
        },
      },
      {
        lines: [10, 11],
        title: { ru: 'Пик левее правой пробы', en: 'The peak is left of the right probe' },
        explanation: {
          ru: 'Иначе `arr[m1] >= arr[m2]`: `m2` на спуске, и `hi = m2 - 1`. Равенство при строгом подъёме и спуске возможно, только если пробы стоят по разные стороны от пика, - тогда годится любая ветка. А вот **плато** на склоне ломает поиск: в `[1, 2, 2, 2, 2, 2, 2, 5, 1]` обе пробы попадают на двойки, правая часть с пятёркой отбрасывается, и ответ - индекс 1.',
          en: 'Otherwise `arr[m1] >= arr[m2]`: `m2` is on the way down, and `hi = m2 - 1`. With a strict rise and fall, equality is possible only when the probes sit on either side of the peak - then either branch will do. A **plateau** on a slope, however, breaks the search: in `[1, 2, 2, 2, 2, 2, 2, 5, 1]` both probes land on twos, the right part with the five is dropped, and the answer is index 1.',
        },
      },
      {
        lines: [12, 15],
        title: { ru: 'Досмотр остатка', en: 'Scanning the rest' },
        explanation: {
          ru: 'Осталось от одного до трёх кандидатов. `best` начинается с первого, и каждый следующий сравнивается с ним. Сравнение строгое (`>`), поэтому при плато на самой вершине возвращается его **левый край**: в `[1, 3, 5, 5, 5, 2]` ответ 2. Это не случайность: ни одна ветка цикла не отбрасывает левый край вершины, что подтвердили 172 245 случайных массивов с плато на вершине.',
          en: 'One to three candidates are left. `best` starts at the first, and each next one is compared with it. The comparison is strict (`>`), so with a plateau at the very top its **left edge** is returned: in `[1, 3, 5, 5, 5, 2]` the answer is 2. That is no accident: neither branch of the loop ever drops the left edge of the top, as 172,245 random arrays with a plateau at the top confirmed.',
        },
      },
      {
        lines: [16, 17],
        title: { ru: 'Ответ', en: 'The answer' },
        explanation: {
          ru: 'Возвращается индекс, а не значение: значение читается как `arr[best]`. На массиве не той формы функция всё равно что-то вернёт - на 200 000 случайных массивах это был самый большой элемент только в 27.5% случаев.',
          en: 'The index is returned, not the value: the value is read as `arr[best]`. On an array of the wrong shape the function still returns something - on 200,000 random arrays it was the largest element in only 27.5% of cases.',
        },
      },
      {
        lines: [19],
        title: { ru: 'Вариант для функции', en: 'The variant for a function' },
        explanation: {
          ru: '`ternarySearchMax` ищет максимум функции `f` на отрезке `[lo, hi]` вещественных чисел. Здесь нет элементов, которые можно досмотреть подряд, поэтому вместо условия на длину - число шагов `steps`.',
          en: '`ternarySearchMax` looks for the maximum of a function `f` on an interval `[lo, hi]` of real numbers. There are no elements to scan one by one here, so instead of a condition on the length there is a number of steps, `steps`.',
        },
      },
      {
        lines: [20],
        title: { ru: 'Фиксированное число шагов', en: 'A fixed number of steps' },
        explanation: {
          ru: '100 шагов сжимают отрезок в (3/2)^100, примерно в 4 · 10^17 раз. Привычное `while (hi - lo > eps)` опасно: если `eps` меньше шага между соседними числами float у этих концов, длина перестаёт уменьшаться. На отрезке от 10^9 до 10^9 + 1 с `eps = 1e-9` цикл в прогоне не закончился - длина застыла на 1.19 · 10^-7.',
          en: '100 steps shrink the interval by (3/2)^100, about 4 · 10^17 times. The usual `while (hi - lo > eps)` is risky: if `eps` is smaller than the gap between neighbouring floats at these ends, the length stops shrinking. On the interval from 10^9 to 10^9 + 1 with `eps = 1e-9` the loop never finished in a run - the length froze at 1.19 · 10^-7.',
        },
      },
      {
        lines: [21, 22],
        title: { ru: 'Пробы без округления', en: 'Probes without rounding' },
        explanation: {
          ru: 'Те же трети, но без `Math.floor`: точки могут быть любыми числами. `hi - lo` переполняется, только если концы почти у предела float: на `[-1.7e308, 1.7e308]` разность - `Infinity`, и ответ в JS и Python - `NaN`.',
          en: 'The same thirds, but without `Math.floor`: the points can be any numbers. `hi - lo` overflows only when the ends are near the limit of float: on `[-1.7e308, 1.7e308]` the difference is `Infinity`, and the answer in JS and Python is `NaN`.',
        },
      },
      {
        lines: [23, 24],
        title: { ru: 'Сужение без отступа', en: 'Narrowing without a step past the probe' },
        explanation: {
          ru: 'Граница переезжает на саму пробу, а не на соседа: у вещественных чисел соседа нет. Каждый шаг вычисляет `f` дважды, так что 100 шагов - это 200 вычислений.',
          en: 'The bound moves onto the probe itself, not past it: real numbers have no neighbour. Each step evaluates `f` twice, so 100 steps are 200 evaluations.',
        },
      },
      {
        lines: [25, 27],
        title: { ru: 'Середина последнего отрезка', en: 'The middle of the last interval' },
        explanation: {
          ru: 'Ответ - середина того, что осталось. Точность всё равно ограничена float: у гладкого пика значения `f` рядом с вершиной совпадают до последнего бита, и для `Math.sin` на `[0, π]` ошибка вышла около 10^-8, хотя отрезок сжался гораздо сильнее.',
          en: 'The answer is the middle of what is left. The accuracy is still limited by float: near a smooth peak the values of `f` agree to the last bit, and for `Math.sin` on `[0, π]` the error came out at about 10^-8, though the interval shrank far more.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`ternary_search_peak` принимает список `arr`, который до пика строго растёт, а после строго убывает, и вернёт индекс пика. Форму списка функция не проверяет.',
          en: '`ternary_search_peak` takes a list `arr` that rises strictly up to its peak and falls strictly after it, and returns the index of the peak. The function does not check the shape of the list.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Пустой список', en: 'An empty list' },
        explanation: {
          ru: 'Пустой список ложен в условии, и ответ `-1`. Без этой проверки функция вернула бы `0`.',
          en: 'An empty list is false in a condition, and the answer is `-1`. Without this check the function would return `0`.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Границы', en: 'The bounds' },
        explanation: {
          ru: '`lo` и `hi` - первый и последний кандидат, оба включительно. С `hi = len(arr)` досмотр иногда читает `arr[n]` и падает с `IndexError`: в прогоне - 61 раз из 1830, например на списке из одного элемента.',
          en: '`lo` and `hi` are the first and the last candidate, both inclusive. With `hi = len(arr)` the scan sometimes reads `arr[n]` and fails with `IndexError`: 61 times out of 1830 in a run, for instance on a list of one element.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Пока кандидатов больше трёх', en: 'While more than three candidates remain' },
        explanation: {
          ru: 'При четырёх и больше элементах треть не меньше 1, и пробы стоят внутри отрезка. При трёх и меньше они легли бы на концы, поэтому остаток досматривается подряд. С нашими `m1 + 1` и `m2 - 1` хватило бы и `lo < hi`, но `> 2` не ломается и при записи `lo = m1`.',
          en: 'With four or more elements the third is at least 1, and the probes sit inside the stretch. With three or fewer they would land on the ends, which is why the rest is scanned one by one. With our `m1 + 1` and `m2 - 1`, `lo < hi` would do too, but `> 2` does not break even when written as `lo = m1`.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Две пробы', en: 'Two probes' },
        explanation: {
          ru: '`//` - целочисленное деление, и индексы целые. С обычным `/` треть - число float, и чтение `arr[m1]` падает с `TypeError: list indices must be integers or slices, not float` - в отличие от JS, который молча читает `undefined`.',
          en: '`//` is integer division, and the indices are whole. With a plain `/` the third is a float, and reading `arr[m1]` fails with `TypeError: list indices must be integers or slices, not float` - unlike JS, which silently reads `undefined`.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Пик правее левой пробы', en: 'The peak is right of the left probe' },
        explanation: {
          ru: 'Левая проба меньше правой - она на подъёме, и левая треть вместе с ней отбрасывается: `lo = m1 + 1`.',
          en: 'The left probe is smaller than the right one - it is on the way up, and the left third goes along with it: `lo = m1 + 1`.',
        },
      },
      {
        lines: [11, 12],
        title: { ru: 'Пик левее правой пробы', en: 'The peak is left of the right probe' },
        explanation: {
          ru: 'Иначе правая проба на спуске: `hi = m2 - 1`. Плато на склоне ломает поиск так же, как в JS: `[1, 2, 2, 2, 2, 2, 2, 5, 1]` даёт 1.',
          en: 'Otherwise the right probe is on the way down: `hi = m2 - 1`. A plateau on a slope breaks the search the same way as in JS: `[1, 2, 2, 2, 2, 2, 2, 5, 1]` gives 1.',
        },
      },
      {
        lines: [13, 16],
        title: { ru: 'Досмотр остатка', en: 'Scanning the rest' },
        explanation: {
          ru: '`range(lo + 1, hi + 1)` проходит оставшихся кандидатов после первого. Строгое `>` оставляет первый из равных, поэтому при плато на вершине ответ - его левый край.',
          en: '`range(lo + 1, hi + 1)` walks the remaining candidates after the first. The strict `>` keeps the first of equal ones, so with a plateau at the top the answer is its left edge.',
        },
      },
      {
        lines: [17],
        title: { ru: 'Ответ', en: 'The answer' },
        explanation: {
          ru: 'Индекс пика. JS и Python на одних и тех же списках, включая списки не той формы, отвечают одинаково.',
          en: 'The index of the peak. JS and Python answer the same on the same lists, lists of the wrong shape included.',
        },
      },
      {
        lines: [20],
        title: { ru: 'Вариант для функции', en: 'The variant for a function' },
        explanation: {
          ru: '`ternary_search_max` ищет максимум функции `f` на отрезке вещественных чисел, делая `steps` шагов.',
          en: '`ternary_search_max` looks for the maximum of a function `f` on an interval of real numbers, taking `steps` steps.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Фиксированное число шагов', en: 'A fixed number of steps' },
        explanation: {
          ru: '`_` - переменная, которая не нужна: важен только счёт. Условие `while hi - lo > eps` в Python зацикливается так же, как в JS, если `eps` меньше шага float у концов отрезка.',
          en: '`_` is a variable that is not needed: only the count matters. The condition `while hi - lo > eps` loops forever in Python just as in JS when `eps` is smaller than the float gap at the ends of the interval.',
        },
      },
      {
        lines: [22, 23],
        title: { ru: 'Пробы без округления', en: 'Probes without rounding' },
        explanation: {
          ru: 'Здесь `/` - то, что нужно: точки вещественные. Целые числа в Python не переполняются, но концы - float, и на `[-1.7e308, 1.7e308]` ответ - `nan`.',
          en: 'Here `/` is exactly what is needed: the points are real. Python integers do not overflow, but the ends are floats, and on `[-1.7e308, 1.7e308]` the answer is `nan`.',
        },
      },
      {
        lines: [24, 27],
        title: { ru: 'Сужение без отступа', en: 'Narrowing without a step past the probe' },
        explanation: {
          ru: 'Граница переезжает на саму пробу. Два вычисления `f` на шаг - 200 за 100 шагов.',
          en: 'The bound moves onto the probe itself. Two evaluations of `f` per step - 200 in 100 steps.',
        },
      },
      {
        lines: [28],
        title: { ru: 'Середина последнего отрезка', en: 'The middle of the last interval' },
        explanation: {
          ru: 'Ответ - середина оставшегося отрезка, с той же оговоркой про точность float у гладкого пика.',
          en: 'The answer is the middle of the remaining interval, with the same caveat about float accuracy at a smooth peak.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Находит экстремум, не зная производной и формулы: нужно только уметь вычислить значение и сравнить два значения между собой.',
      en: 'Finds an extremum without a derivative or a formula: all it needs is to compute a value and compare two values with each other.',
    },
    {
      ru: 'Простой и предсказуемый: число шагов зависит только от длины - на миллионе элементов всегда 31 шаг и 64 чтения, где бы ни был пик.',
      en: 'Simple and predictable: the number of steps depends only on the length - on a million elements always 31 steps and 64 reads, wherever the peak is.',
    },
    {
      ru: 'Одна и та же идея работает и на массиве, и на функции вещественного аргумента; меняется только условие остановки.',
      en: 'The same idea works both on an array and on a function of a real argument; only the stopping condition changes.',
    },
  ],
  cons: [
    {
      ru: 'Для пика массива есть способ экономнее: бинарный поиск по соседям, `arr[m] < arr[m + 1]`, на миллионе элементов делает до 40 чтений против 64.',
      en: 'For the peak of an array there is a thriftier way: binary search on neighbours, `arr[m] < arr[m + 1]`, makes up to 40 reads on a million elements against 64.',
    },
    {
      ru: 'Для функции проигрывает поиску золотого сечения: на точность 10^-9 на отрезке длины 1 - 104 вычисления против 46.',
      en: 'For a function it loses to golden section search: for an accuracy of 10^-9 on an interval of length 1 - 104 evaluations against 46.',
    },
    {
      ru: 'Требует строгой унимодальности: на плато на склоне или втором пике ответ может оказаться неверным - молча, без ошибки.',
      en: 'Needs strict unimodality: with a plateau on a slope or a second peak the answer may be wrong - silently, with no error.',
    },
  ],

  whenToUse: [
    {
      ru: '**Олимпиадная задача на экстремум** - когда функция заведомо унимодальна, а время на написание важнее лишних вычислений. Так он и разобран в справочнике cp-algorithms.',
      en: '**A competitive programming problem on an extremum** - when the function is known to be unimodal, and writing time matters more than extra evaluations. That is how the cp-algorithms reference covers it.',
    },
    {
      ru: '**Не для поиска значения** в отсортированном массиве: там **Binary Search** - на миллионе элементов до 20 проб против 25 у тернарного.',
      en: '**Not for finding a value** in a sorted array: that is a job for **Binary Search** - up to 20 probes on a million elements against 25 for ternary search.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**cp-algorithms** - справочник по олимпиадным алгоритмам разбирает тернарный поиск для унимодальной функции, вариант на целых числах с досмотром остатка при `r - l < 3` и приводит 19 задач с Codeforces, CodeChef, SPOJ, UVa, Timus и других архивов.',
      en: '**cp-algorithms** - a reference of competitive programming algorithms covers ternary search for a unimodal function, the integer variant with a scan of the rest at `r - l < 3`, and lists 19 problems from Codeforces, CodeChef, SPOJ, UVa, Timus and other archives.',
    },
    {
      ru: '**SciPy** - `minimize_scalar` в версии 1.18.1 предлагает методы `brent`, `bounded` и `golden`, по умолчанию - метод Брента. Тернарного среди них нет; почему - в коде не сказано, но на ту же точность он тратит больше вычислений, чем золотое сечение.',
      en: '**SciPy** - `minimize_scalar` in version 1.18.1 offers the methods `brent`, `bounded` and `golden`, with Brent\'s method by default. Ternary search is not among them; the code does not say why, but for the same accuracy it spends more evaluations than golden section search.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Тернарный поиск - это поиск экстремума, а не значения.** Его настоящая задача - максимум или минимум **унимодальной функции**: до пика она строго растёт, после строго убывает (для минимума - наоборот). Сравнивать здесь не с чем: искомого числа нет, есть только два значения функции, которые сравнивают между собой. Название подводит - кажется, что это «бинарный поиск, только на три части», и его пробуют на отсортированном массиве. Там он работает, но хуже бинарного, и это первое, что стоит запомнить.',
        en: '**Ternary search is a search for an extremum, not for a value.** Its real job is the maximum or minimum of a **unimodal function**: it rises strictly up to a peak and falls strictly after it (for a minimum, the other way round). There is nothing to compare with here: there is no target, only two values of the function, which are compared with each other. The name misleads - it sounds like "binary search, only into three parts", and people try it on a sorted array. It works there, but worse than binary search, and that is the first thing worth remembering.',
      },
      {
        ru: '**Почему нельзя бинарный поиск по значению.** Бинарному нужен ответ «искомое левее или правее середины», а его даёт только порядок. У функции с пиком значения не отсортированы: в демо 36 стоит на подъёме, а 35 - на спуске: почти одинаковые числа по разные стороны пика, и по одному числу не понять, где мы. Два значения - понять можно: если `f(m1) < f(m2)`, то `m1` не может быть на спуске, ведь там всё правее меньше. Значит, пик правее `m1`. Если `f(m1) > f(m2)`, то по той же причине `m2` не на подъёме, и пик левее `m2`. Равенство при строгой унимодальности бывает, только когда пик между пробами, - и тогда годится любая ветка.',
        en: '**Why binary search on the value does not work.** Binary search needs the answer "the target is left or right of the middle", and only order gives it. The values of a function with a peak are not sorted: in the demo 36 sits on the way up and 35 on the way down: nearly equal numbers on either side of the peak, and one number cannot tell you where you are. Two values can: if `f(m1) < f(m2)`, then `m1` cannot be on the way down, since everything further right is smaller there. So the peak is right of `m1`. If `f(m1) > f(m2)`, then for the same reason `m2` is not on the way up, and the peak is left of `m2`. With strict unimodality equality happens only when the peak is between the probes - and then either branch will do.',
      },
      {
        ru: '**Две пробы на шаг - почему это хуже деления пополам.** На отсортированном массиве тернарный поиск сравнивает искомое с двумя пробами и оставляет одну треть из трёх: шагов log₃ n, но в каждом до двух проб - **2 log₃ n против log₂ n**, то есть в 2 / log₂ 3 ≈ 1.26 раза больше в худшем случае. Прогон на 10^6 по всем позициям: найденное - **19.9 пробы в среднем против 19.0** у бинарного, максимум **25 против 20** (25 / 20 = 1.25). Дешевле бинарного 266 668 позиций, дороже 581 465, вровень 151 867; первый элемент - 13 проб, последний - 25. Промах - 20.9 против 20.0. Сравнений в нашем порядке проверок («равно `m1`», «меньше `m1`», «равно `m2`», «больше `m2`») - 38.8 в среднем и до 49, у бинарного с «равно» первым - 36.9 и до 39: тут проигрыш и по пробам, и по сравнениям.',
        en: '**Two probes per step - why that is worse than halving.** On a sorted array ternary search compares the target with two probes and keeps one third out of three: log₃ n steps, but up to two probes in each - **2 log₃ n against log₂ n**, that is 2 / log₂ 3 ≈ 1.26 times more in the worst case. A run on 10^6 over every position: a found target takes **19.9 probes on average against 19.0** for binary search, at most **25 against 20** (25 / 20 = 1.25). Binary search is beaten on 266,668 positions, it wins on 581,465, and they tie on 151,867; the first element takes 13 probes, the last 25. A miss costs 20.9 against 20.0. Comparisons in our order of checks ("equal to `m1`", "less than `m1`", "equal to `m2`", "greater than `m2`") come to 38.8 on average and up to 49, for binary search with "equal" first to 36.9 and up to 39: here it loses both in probes and in comparisons.',
      },
      {
        ru: '**В поиске пика каждый шаг оставляет две трети.** Отрезок сжимается в 3/2 раза за две пробы, поэтому чтений около 2 log₁.₅ n ≈ 3.4 log₂ n. На 10^6 прогон дал **64 чтения при любом положении пика** - 31 шаг по два и два в досмотре: каждая ветка отрезает треть плюс один элемент, так что длины отрезков от пика не зависят. **Бинарный поиск по соседям** - середина `m` и сравнение `arr[m] < arr[m + 1]`: подъём, значит пик правее, - делает 39.9 чтения в среднем и не больше 40, сравнений 20 против 32. Поиск по числам Фибоначчи для максимума, переиспользующий одну пробу, - 28.7 чтения и не больше 29. Так что и в своей задаче, на массиве, тернарный поиск - самый дорогой из трёх.',
        en: '**In a peak search every step keeps two thirds.** The stretch shrinks 3/2 times for two probes, so there are about 2 log₁.₅ n ≈ 3.4 log₂ n reads. On 10^6 a run gave **64 reads wherever the peak was** - 31 steps of two and two in the scan: each branch cuts off a third plus one element, so the lengths of the stretches do not depend on the peak. **Binary search on neighbours** - a middle `m` and the comparison `arr[m] < arr[m + 1]`: rising, so the peak is to the right - makes 39.9 reads on average and at most 40, with 20 comparisons against 32. A Fibonacci-number search for the maximum that reuses one probe takes 28.7 reads and at most 29. So even at its own job, on an array, ternary search is the most expensive of the three.',
      },
      {
        ru: '**Связь с поиском золотого сечения.** Об этом семействе уже рассказывает страница **Fibonacci Search**: Кифер (1953) в пересказе Оливера и Уайлда и `scipy.optimize.golden`. Разница с тернарным - в одной детали. Если поставить пробы не на трети, а в пропорции 0.382 и 0.618, то после шага одна старая проба оказывается ровно на месте новой, и её значение уже известно: **одно новое вычисление на шаг вместо двух**, при сжатии в 1.618 раза вместо 1.5. Прогон на отрезке длины 1 до точности 10^-9: **тернарный - 104 вычисления, золотое сечение - 46**, деление пополам с парой близких точек (`f(m - δ)` против `f(m + δ)`) - 62. cp-algorithms разбирает золотое сечение сразу после тернарного поиска с той же мотивацией: когда `f` вычисляется медленно, считать её один раз на шаг.',
        en: '**The link with golden section search.** The **Fibonacci Search** page already tells this family\'s story: Kiefer (1953) as Oliver and Wilde retell it, and `scipy.optimize.golden`. The difference from ternary search is one detail. Place the probes not on the thirds but in the proportion 0.382 and 0.618, and after a step one old probe lands exactly where a new one goes, and its value is already known: **one new evaluation per step instead of two**, with a shrink of 1.618 times instead of 1.5. A run on an interval of length 1 to an accuracy of 10^-9: **ternary search - 104 evaluations, golden section - 46**, halving with a pair of close points (`f(m - δ)` against `f(m + δ)`) - 62. cp-algorithms covers golden section search right after ternary search with the same motivation: when `f` is slow to compute, evaluate it once per step.',
      },
      {
        ru: '**Целые против вещественных.** В массиве пробы - индексы, нужен `Math.floor` (`//` в Python), и цикл идёт, пока в отрезке больше трёх элементов: тогда треть не меньше 1, а остаток из двух-трёх досматривается подряд. cp-algorithms ставит ту же границу, `r - l < 3`, и объясняет её так же: иначе пробы не отличить от концов, и возможен вечный цикл. Наш прогон это подтвердил: с `lo = m1` и `hi = m2` (как у функции) условие `lo < hi` зациклилось почти на всех массивах, `hi - lo > 1` - тоже, а `hi - lo > 2` - нет. Для функции досматривать нечего, и остаётся либо `eps`, либо число шагов. cp-algorithms упоминает оба способа; `eps` мы не взяли, потому что на отрезке от 10^9 до 10^9 + 1 с `eps = 1e-9` цикл не закончился.',
        en: '**Integers against reals.** In an array the probes are indices, `Math.floor` is needed (`//` in Python), and the loop runs while the stretch holds more than three elements: then the third is at least 1, and a rest of two or three is scanned one by one. cp-algorithms sets the same bound, `r - l < 3`, and explains it the same way: otherwise the probes cannot be told from the ends, and an infinite loop is possible. Our run confirmed it: with `lo = m1` and `hi = m2` (as in the function) the condition `lo < hi` looped on nearly every array, `hi - lo > 1` too, and `hi - lo > 2` did not. A function has nothing to scan, which leaves either `eps` or a number of steps. cp-algorithms mentions both; we did not take `eps`, because on the interval from 10^9 to 10^9 + 1 with `eps = 1e-9` the loop never finished.',
      },
      {
        ru: '**Плато и данные не той формы.** Плато на **вершине** безопасно: ответ - его левый край. Плато на **склоне** - нет: две пробы с равными значениями ничего не говорят о направлении, и в прогоне на 200 000 случайных массивах, где 30% шагов склона были нулевыми, пик терялся в 3.7% случаев. На массиве с несколькими пиками функция возвращает какой-то элемент без ошибки: на 200 000 случайных массивах почти всегда это был локальный максимум, но самый большой элемент - только в 27.5%. Проверить унимодальность заранее - O(n), и тогда проще сразу взять максимум проходом.',
        en: '**Plateaus and data of the wrong shape.** A plateau at the **top** is safe: the answer is its left edge. A plateau on a **slope** is not: two probes with equal values say nothing about direction, and in a run on 200,000 random arrays where 30% of the slope steps were flat, the peak was lost in 3.7% of cases. On an array with several peaks the function returns some element without an error: on 200,000 random arrays it was nearly always a local maximum, but the largest element only in 27.5%. Checking unimodality in advance costs O(n), and then it is simpler to take the maximum in one pass.',
      },
      {
        ru: '**Дубликаты при поиске значения.** Если всё же искать тернарным поиском значение в отсортированном массиве, ответ - то вхождение, на которое попала проба. `[1, 3, 3, 3, 3, 3, 5]`, ищем 3: тернарный и поиск Фибоначчи дают 2, `binarySearch` - 3, прыжковый и экспоненциальный - 1. `[10, 20, 30, 40, 50, 60, 60, 70, 80]`, ищем 60: тернарный, бинарный и экспоненциальный - 6, прыжковый и поиск Фибоначчи - 5. На 200 000 случайных массивах с повторами первое вхождение вернулось в 59.7% случаев у тернарного, в 58.2% у бинарного и всегда у прыжкового. **Переполнение**: индексы в JS меньше 2^32, а `lo + third` не больше `hi`, так что выйти за точные целые негде; в Python целые не ограничены.',
        en: '**Duplicates in a value search.** If you do search a sorted array for a value with ternary search, the answer is whichever occurrence a probe landed on. `[1, 3, 3, 3, 3, 3, 5]`, looking for 3: ternary and Fibonacci search give 2, `binarySearch` gives 3, jump and exponential search give 1. `[10, 20, 30, 40, 50, 60, 60, 70, 80]`, looking for 60: ternary, binary and exponential search give 6, jump and Fibonacci search give 5. On 200,000 random arrays with repeats the first occurrence came back in 59.7% of cases for ternary search, in 58.2% for binary and always for jump search. **Overflow**: indices in JS are below 2^32, and `lo + third` never exceeds `hi`, so there is nowhere to leave the exact integers; in Python integers are unbounded.',
      },
    ],
    whenToUse: [
      {
        ru: '**Значение в отсортированном массиве** - **Binary Search**: на миллионе элементов в среднем 19.0 пробы против 19.9 и в худшем 20 против 25. Тернарный здесь не выигрывает ни по пробам, ни по сравнениям.',
        en: '**A value in a sorted array** - **Binary Search**: on a million elements 19.0 probes on average against 19.9, and 20 against 25 in the worst case. Ternary search wins here neither in probes nor in comparisons.',
      },
      {
        ru: '**Пик массива** - бинарный поиск по соседям, `arr[m] < arr[m + 1]`: до 40 чтений на миллионе против 64, и код не длиннее. По числу чтений тернарный здесь не выигрывает: его берут ради привычной формы, а не ради скорости.',
        en: '**The peak of an array** - binary search on neighbours, `arr[m] < arr[m + 1]`: up to 40 reads on a million against 64, and the code is no longer. Ternary search does not win here on reads: people take it for its familiar shape, not for speed.',
      },
      {
        ru: '**Экстремум дорогой функции** - поиск золотого сечения или метод Брента, как в `scipy.optimize.minimize_scalar`: золотое сечение тратит одно вычисление на шаг, и на точность 10^-9 это 46 вычислений против 104.',
        en: '**The extremum of an expensive function** - golden section search or Brent\'s method, as in `scipy.optimize.minimize_scalar`: golden section spends one evaluation per step, and for an accuracy of 10^-9 that is 46 evaluations against 104.',
      },
      {
        ru: '**Дешёвая функция и олимпиада** - тернарный поиск легко запомнить и проверить: две пробы на третях и фиксированное число шагов. лишние вычисления - 104 против 46 на точность 10^-9 - там обычно незаметны.',
        en: '**A cheap function in a contest** - ternary search is easy to remember and to check: two probes on the thirds and a fixed number of steps. the extra evaluations - 104 against 46 for an accuracy of 10^-9 - usually go unnoticed there.',
      },
      {
        ru: '**Нет гарантии унимодальности** - ни тернарный, ни золотое сечение: на плато или втором пике оба молча ошибаются. Для массива - проход за O(n), для функции - сначала сетка значений, чтобы найти отрезок с одним пиком.',
        en: '**No guarantee of unimodality** - neither ternary nor golden section search: on a plateau or a second peak both are silently wrong. For an array - a pass in O(n), for a function - a grid of values first, to find an interval with a single peak.',
      },
    ],
    realWorld: [
      {
        ru: '**cp-algorithms, «Ternary Search»** (src/num_methods/ternary_search.md, коммит 82a06ff от 24 марта 2025, перевод статьи e-maxx.ru, CC BY-SA 4.0) - унимодальная функция, пробы `l + (r - l) / 3` и `r - (r - l) / 3`, «`eps` is in fact the absolute error», замена `eps` числом шагов («200 - 300 iterations are sufficient» для 10^-6 - с запасом: 100 шагов сжимают отрезок в 4 · 10^17 раз), целые аргументы с остановкой при `r - l < 3`, абзац о золотом сечении и список из 20 ссылок на задачи (одна задача SPOJ повторена дважды).',
        en: '**cp-algorithms, "Ternary Search"** (src/num_methods/ternary_search.md, commit 82a06ff of 24 March 2025, a translation of an e-maxx.ru article, CC BY-SA 4.0) - a unimodal function, probes `l + (r - l) / 3` and `r - (r - l) / 3`, "`eps` is in fact the absolute error", replacing `eps` with a number of steps ("200 - 300 iterations are sufficient" for 10^-6 - with room to spare: 100 steps shrink the interval 4 · 10^17 times), integer arguments with a stop at `r - l < 3`, a paragraph on golden section search, and a list of 20 problem links (one SPOJ problem appears twice).',
      },
      {
        ru: '**SciPy 1.18.1, scipy/optimize/_minimize.py** - `MINIMIZE_SCALAR_METHODS = [\'brent\', \'bounded\', \'golden\']`; по умолчанию `bounded`, если заданы границы, и `brent` иначе. В документации: метод Брента ускоряет золотое сечение обратной параболической интерполяцией, а `golden` «usually» уступает ему. Слова «ternary» в файле нет.',
        en: '**SciPy 1.18.1, scipy/optimize/_minimize.py** - `MINIMIZE_SCALAR_METHODS = [\'brent\', \'bounded\', \'golden\']`; the default is `bounded` when bounds are given and `brent` otherwise. The documentation says Brent\'s method speeds golden section search up with inverse parabolic interpolation, and `golden` is "usually" worse than it. The word "ternary" does not appear in the file.',
      },
      {
        ru: '**J. Kiefer, «Sequential minimax search for a maximum», 1953** - задача о максимуме унимодальной функции при заданном числе вычислений; её содержание (по пересказу Оливера и Уайлда, 1964) и выходные данные уже есть на странице Fibonacci Search. Сам текст на сайте AMS за проверкой браузера, мы его не открыли.',
        en: '**J. Kiefer, "Sequential minimax search for a maximum", 1953** - the problem of the maximum of a unimodal function for a given number of evaluations; its content (as Oliver and Wilde retold it in 1964) and the publication details are already on the Fibonacci Search page. The text itself is behind a browser check on the AMS site, and we have not opened it.',
      },
      {
        ru: '**Кто придумал тернарный поиск** - первоисточника мы не нашли. cp-algorithms и разборы задач описывают метод без автора и даты; статья Оливера и Уайлда его не упоминает, а Кнута, т. 3, мы не открывали. Поэтому имени и года здесь нет.',
        en: '**Who invented ternary search** - we have not found a primary source. cp-algorithms and problem write-ups describe the method with no author or date; the Oliver and Wilde paper does not mention it, and we have not opened Knuth, vol. 3. So there is no name or year here.',
      },
    ],
  },

  relatedAlgorithms: ['binary-search', 'fibonacci-search', 'exponential-search', 'jump-search', 'interpolation-search', 'linear-search'],

  quiz: [
    {
      question: {
        ru: 'Что ищет тернарный поиск на этой странице?',
        en: 'What does ternary search look for on this page?',
      },
      options: [
        { ru: 'Индекс искомого значения в отсортированном по возрастанию массиве', en: 'The index of a target value in an array sorted in ascending order' },
        { ru: 'Индекс пика массива, который сначала растёт, а потом убывает', en: 'The index of the peak of an array that first rises and then falls' },
        { ru: 'Медиану массива: элемент, левее которого ровно половина', en: 'The median of the array: the element with exactly half to its left' },
        { ru: 'Самый маленький элемент в массиве любой формы, без сортировки', en: 'The smallest element of an array of any shape, without sorting' },
      ],
      correct: 1,
      explanation: {
        ru: 'Искомого числа нет: ищется максимум унимодального массива. Поиск значения в отсортированном массиве - задача бинарного поиска, где тернарный проигрывает; минимум произвольного массива требует прохода за O(n).',
        en: 'There is no target: the maximum of a unimodal array is sought. A value in a sorted array is a job for binary search, where ternary search loses; the minimum of an arbitrary array needs a pass in O(n).',
      },
      hint: {
        ru: 'Смотрите шаг «Весь массив - кандидат на пик» на вкладке «Визуализация».',
        en: 'See the "The whole array may hold the peak" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Отрезок - индексы от 0 до 12. Где встанут две пробы?',
        en: 'The stretch is indices 0 to 12. Where do the two probes go?',
      },
      options: [
        { ru: 'На 6 и 7: середина и её правый сосед', en: 'At 6 and 7: the middle and its right neighbour' },
        { ru: 'На 3 и 9: на четвертях длины от концов', en: 'At 3 and 9: a quarter of the length from the ends' },
        { ru: 'На 4 и 8: треть, 4, от каждого конца', en: 'At 4 and 8: a third, 4, in from each end' },
        { ru: 'На 0 и 12: на самих концах отрезка', en: 'At 0 and 12: right on the ends' },
      ],
      correct: 2,
      explanation: {
        ru: '`third = Math.floor(12 / 3) = 4`, `m1 = 0 + 4`, `m2 = 12 - 4`. Середина с соседом - это бинарный поиск по соседям, четверти - не тернарный, а концы дадут пробы только при трети 0, которую цикл не допускает.',
        en: '`third = Math.floor(12 / 3) = 4`, `m1 = 0 + 4`, `m2 = 12 - 4`. The middle with a neighbour is binary search on neighbours, quarters are not ternary search, and the ends would be the probes only with a third of 0, which the loop does not allow.',
      },
      hint: {
        ru: 'Смотрите шаг «Две пробы делят отрезок на три» на вкладке «Визуализация».',
        en: 'See the "Two probes split the stretch in three" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Оказалось, что `arr[m1] < arr[m2]`. Что отбрасывается?',
        en: 'It turns out that `arr[m1] < arr[m2]`. What is thrown away?',
      },
      options: [
        { ru: 'Всё от `lo` до `m1` включительно: `m1` на подъёме, пик правее', en: 'Everything from `lo` to `m1`: `m1` is rising, the peak is right' },
        { ru: 'Всё от `m2` до `hi`: меньшее значение всегда стоит после пика', en: 'Everything from `m2` to `hi`: the smaller value stands after the peak' },
        { ru: 'Средняя треть между пробами: пик всегда лежит у одного из концов', en: 'The middle third between the probes: the peak is always near an end' },
        { ru: 'Ничего: сначала нужно сравнить обе пробы с искомым числом', en: 'Nothing: both probes must first be compared with the target' },
      ],
      correct: 0,
      explanation: {
        ru: 'На спуске всё правее меньше, поэтому меньшая левая проба может стоять только на подъёме: `lo = m1 + 1`. Средняя треть как раз остаётся, а искомого числа в этой задаче нет.',
        en: 'On the way down everything further right is smaller, so the smaller left probe can only be on the way up: `lo = m1 + 1`. The middle third is exactly what stays, and this problem has no target.',
      },
      hint: {
        ru: 'Смотрите шаг «Пик правее левой пробы» на вкладке «Реализация».',
        en: 'See the "The peak is right of the left probe" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему для пика функции нельзя взять бинарный поиск по значению, как в отсортированном массиве?',
        en: 'Why can binary search on the value not be used for the peak of a function, as in a sorted array?',
      },
      options: [
        { ru: 'Потому что бинарный поиск работает только с целыми индексами', en: 'Because binary search works only with integer indices of an array' },
        { ru: 'Потому что у функции нет конечного числа значений для перебора', en: 'Because a function has no finite number of values to go through' },
        { ru: 'Потому что бинарный поиск всегда медленнее тернарного на функциях', en: 'Because binary search is always slower than ternary on functions' },
        { ru: 'Значения не отсортированы: по одному не понять, подъём или спуск', en: 'The values are not sorted: one value cannot tell rise from fall' },
      ],
      correct: 3,
      explanation: {
        ru: 'Бинарному нужен порядок, чтобы по одному сравнению с искомым понять сторону. У функции с пиком одно и то же значение бывает по обе стороны, а искомого числа нет вовсе - нужно сравнить два значения между собой. А бинарный поиск по соседям в массиве, `arr[m]` против `arr[m + 1]`, как раз работает: он тоже сравнивает два значения.',
        en: 'Binary search needs order to tell the side from one comparison with the target. A function with a peak has the same value on both sides, and there is no target at all - two values have to be compared with each other. Binary search on neighbours in an array, `arr[m]` against `arr[m + 1]`, does work: it too compares two values.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the second paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему цикл в массиве идёт только пока `hi - lo > 2`, а остаток досматривается подряд?',
        en: 'Why does the array loop run only while `hi - lo > 2`, with the rest scanned one by one?',
      },
      options: [
        { ru: 'На трёх элементах и меньше треть 0, пробы ложатся на концы', en: 'At three elements or fewer the third is 0, the probes hit the ends' },
        { ru: 'Чтобы при плато на вершине вернуть его правый край, а не левый', en: 'To return the right edge of a plateau at the top, not the left one' },
        { ru: 'Чтобы вернуть первое вхождение, если в массиве есть дубликаты', en: 'To return the first occurrence when the array contains duplicates' },
        { ru: 'Чтобы не выйти за массив, когда пик стоит на самом последнем месте', en: 'To avoid reading past the array when the peak is in the last position' },
      ],
      correct: 0,
      explanation: {
        ru: 'При четырёх и больше элементах треть не меньше 1, и пробы внутри отрезка. При трёх и меньше они совпадают с концами, и запись `lo = m1` перестаёт сдвигать границу: вариант с `lo = m1` и условием `lo < hi` в прогоне зациклился почти на всех массивах. С нашими `m1 + 1` и `m2 - 1` хватило бы и `lo < hi`, но граница `> 2` верна при обеих записях; cp-algorithms останавливается при `r - l < 3` по той же причине. Плато на вершине даёт левый край, а не правый.',
        en: 'With four or more elements the third is at least 1, and the probes are inside the stretch. With three or fewer they coincide with the ends, and writing `lo = m1` stops moving the bound: a variant with `lo = m1` and the condition `lo < hi` looped on nearly every array in a run. With our `m1 + 1` and `m2 - 1`, `lo < hi` would do too, but the bound `> 2` is right with both ways of writing it; cp-algorithms stops at `r - l < 3` for the same reason. A plateau at the top gives its left edge, not the right.',
      },
      hint: {
        ru: 'Смотрите шаг «Пока кандидатов больше трёх» на вкладке «Реализация».',
        en: 'See the "While more than three candidates remain" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернёт `ternarySearchPeak([1, 2, 2, 2, 2, 2, 2, 5, 1])`?',
        en: 'What does `ternarySearchPeak([1, 2, 2, 2, 2, 2, 2, 5, 1])` return?',
      },
      options: [
        { ru: '7: пик 5 стоит на индексе семь, и поиск находит именно его', en: '7: the peak 5 sits at index seven, and the search finds it there' },
        { ru: '1: обе пробы на двойках, и часть с пиком отбрасывается', en: '1: both probes land on twos, the part with the peak is dropped' },
        { ru: '`-1`: массив не унимодален, и функция сообщает об ошибке', en: '`-1`: the array is not unimodal, and the function reports an error' },
        { ru: 'Ничего: на равных значениях цикл зацикливается навсегда', en: 'Nothing: on equal values the loop goes round forever' },
      ],
      correct: 1,
      explanation: {
        ru: 'Пробы 2 и 6 - обе двойки, равенство уходит в ветку «иначе», `hi = m2 - 1`, и пятёрка на индексе 7 выпадает. Функция не проверяет форму массива и не зацикливается: на плато на склоне она просто молча ошибается.',
        en: 'Probes 2 and 6 are both twos, equality takes the "otherwise" branch, `hi = m2 - 1`, and the five at index 7 drops out. The function does not check the shape of the array and does not loop: on a plateau on a slope it is simply silently wrong.',
      },
      hint: {
        ru: 'Смотрите шаг «Пик левее правой пробы» на вкладке «Реализация».',
        en: 'See the "The peak is left of the right probe" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'В JS-версии убрали `Math.floor`. Что вернёт `ternarySearchPeak([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])`?',
        en: 'The `Math.floor` was removed from the JS version. What does `ternarySearchPeak([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])` return?',
      },
      options: [
        { ru: '9: JS сам отбрасывает дробную часть индекса при чтении', en: '9: JS quietly drops the fractional part of an index on reading' },
        { ru: 'Исключение `TypeError`, как и в Python при дробном индексе списка', en: 'A `TypeError` exception, as in Python with a fractional index' },
        { ru: '4: дробный индекс даёт `undefined`, и правая часть отпадает', en: '4: a fractional index reads `undefined`, the right part drops' },
        { ru: 'Ничего: дробные границы никогда не сходятся, и цикл вечный', en: 'Nothing: fractional bounds never converge, so the loop never ends' },
      ],
      correct: 2,
      explanation: {
        ru: 'Первый шаг проходит (треть ровно 3), а на втором пробы 5.67 и 7.33: `arr[5.67]` - `undefined`, сравнение ложно, срабатывает `hi = m2 - 1`, и пик 10 выпадает. JS не округляет индекс и не бросает исключение - это делает Python.',
        en: 'The first step passes (the third is exactly 3), but at the second the probes are 5.67 and 7.33: `arr[5.67]` is `undefined`, the comparison is false, `hi = m2 - 1` fires, and the peak 10 drops out. JS neither rounds the index nor throws - Python is the one that throws.',
      },
      hint: {
        ru: 'Смотрите шаг «Две пробы» на вкладке «Реализация».',
        en: 'See the "Two probes" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Отсортированный массив из 10^6 чисел, поиск значения по всем позициям. Сколько проб в среднем и в худшем у тернарного и у бинарного?',
        en: 'A sorted array of 10^6 numbers, a value search over every position. How many probes on average and in the worst case for ternary and binary search?',
      },
      options: [
        { ru: 'Тернарный 12.6 и 13, бинарный 19.0 и 20: делить на три выгоднее', en: 'Ternary 12.6 and 13, binary 19.0 and 20: splitting in three pays' },
        { ru: 'Оба 19.0 и 20: число частей на число проб никак не влияет', en: 'Both 19.0 and 20: the number of parts does not affect the probes' },
        { ru: 'Тернарный 19.9 и 25, бинарный 19.0 и 20: две пробы на шаг дороже', en: 'Ternary 19.9 and 25, binary 19.0 and 20: two probes a step cost more' },
        { ru: 'Тернарный 19.0 и 40, бинарный 19.0 и 20: худший случай вдвое хуже', en: 'Ternary 19.0 and 40, binary 19.0 and 20: the worst case is twice as bad' },
      ],
      correct: 2,
      explanation: {
        ru: 'Шагов log₃ n ≈ 12.6, но в каждом до двух проб: 2 log₃ n против log₂ n, в 1.26 раза больше в худшем. Прогон: 19.9 против 19.0 в среднем, 25 против 20 в худшем. 12.6 - это число шагов, а не проб.',
        en: 'There are log₃ n ≈ 12.6 steps, but up to two probes in each: 2 log₃ n against log₂ n, 1.26 times more in the worst case. A run: 19.9 against 19.0 on average, 25 against 20 in the worst case. 12.6 is the number of steps, not probes.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the third paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Нужен пик унимодального массива из 10^6 элементов, и каждое чтение дорого. Что выбрать?',
        en: 'You need the peak of a unimodal array of 10^6 elements, and every read is expensive. What do you choose?',
      },
      options: [
        { ru: 'Тернарный: 64 чтения, меньше всех, потому что отрезок делится на три', en: 'Ternary: 64 reads, the fewest, because the stretch splits in three' },
        { ru: 'Бинарный поиск по значению: 20 чтений, как на любом массиве', en: 'Binary search on the value: 20 reads, as on any array' },
        { ru: 'Проход по всем элементам: только он работает без сортировки', en: 'A pass over every element: only it works without sorting' },
        { ru: 'Поиск по числам Фибоначчи с одной общей пробой: около 29 чтений', en: 'A Fibonacci-number search sharing a probe: about 29 reads' },
      ],
      correct: 3,
      explanation: {
        ru: 'Прогон на 10^6: тернарный - 64 чтения при любом пике, бинарный по соседям - до 40, поиск по числам Фибоначчи, переиспользующий пробу, - до 29. Бинарный по значению не годится - значения не отсортированы, а проход стоит миллион чтений.',
        en: 'A run on 10^6: ternary search - 64 reads wherever the peak is, binary search on neighbours - up to 40, a Fibonacci-number search that reuses a probe - up to 29. Binary search on the value does not apply - the values are not sorted, and a pass costs a million reads.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fourth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему поиск золотого сечения при той же точности вычисляет функцию реже тернарного?',
        en: 'Why does golden section search evaluate the function less often than ternary search for the same accuracy?',
      },
      options: [
        { ru: 'Он ставит пробы ближе к концам, и отрезок сжимается сильнее', en: 'It places the probes nearer the ends, so the interval shrinks more' },
        { ru: 'Одна старая проба совпадает с новой: одно вычисление на шаг', en: 'One old probe coincides with a new one: one evaluation per step' },
        { ru: 'Он использует производную функции и сразу идёт к вершине', en: 'It uses the derivative of the function and heads straight to the top' },
        { ru: 'Он останавливается раньше и ради скорости жертвует точностью ответа', en: 'It stops earlier, giving up some of the accuracy of the answer' },
      ],
      correct: 1,
      explanation: {
        ru: 'В пропорции 0.382 и 0.618 после шага одна проба оказывается на месте новой, и её значение уже известно. За шаг отрезок сжимается в 1.618 раза за одно вычисление, у тернарного - в 1.5 раза за два: на точность 10^-9 это 46 вычислений против 104. Производная не нужна ни тому, ни другому.',
        en: 'In the proportion 0.382 and 0.618, after a step one probe lands where a new one goes, and its value is already known. Each step shrinks the interval 1.618 times for one evaluation, ternary search 1.5 times for two: for an accuracy of 10^-9 that is 46 evaluations against 104. Neither needs a derivative.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fifth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
  ],
};

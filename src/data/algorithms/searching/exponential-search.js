export const exponentialSearch = {
  slug: 'exponential-search',
  category: 'searching',
  name: { ru: 'Exponential Search', en: 'Exponential Search' },
  complexity: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['sorted-input', 'random-access', 'unbounded'],

  intent: {
    ru: 'Экспоненциальный поиск ищет значение в отсортированном массиве в два этапа: удваивает границу - 1, 2, 4, 8, ... - пока элемент на ней меньше искомого, а потом запускает бинарный поиск на последнем отрезке. Стоимость зависит не от длины массива, а от позиции искомого i: около 2 log₂ i сравнений. Поэтому он выигрывает, когда искомое близко к началу, и работает, даже когда длина массива неизвестна.',
    en: 'Exponential search looks for a value in a sorted array in two stages: it doubles a bound - 1, 2, 4, 8, ... - while the element at it is less than the target, and then runs binary search on the last stretch. The cost depends not on the length of the array but on the position i of the target: about 2 log₂ i comparisons. So it wins when the target is near the start, and it works even when the length of the array is unknown.',
  },

  problem: {
    ru: 'Бинарный поиск начинает с середины всего массива и тратит около log₂ n сравнений, даже если искомое лежит на пятой позиции: в миллионе элементов это в среднем 19 сравнений. А если длина неизвестна - данные идут потоком, или вместо массива есть только функция, которую можно вычислить в любой точке, - бинарному поиску не с чего начать: ему нужна правая граница. **Jump Search** тоже не поможет: его шаг √n считается от той же неизвестной длины.',
    en: 'Binary search starts at the middle of the whole array and spends about log₂ n comparisons even if the target sits at the fifth position: in a million elements that is 19 comparisons on average. And if the length is unknown - the data arrives as a stream, or instead of an array there is only a function you can evaluate at any point - binary search has nowhere to start: it needs a right bound. **Jump Search** does not help either: its √n step is computed from that same unknown length.',
  },

  solution: {
    ru: 'Сначала проверяется `arr[0]`. Потом граница `bound` начинается с 1 и **удваивается**, пока `arr[bound]` меньше искомого и `bound` не вышла за массив. Когда цикл остановился, искомое может лежать только между `bound / 2` и `bound`: `arr[bound / 2]` уже проверен и меньше искомого, а `arr[bound]` - нет. Правый край обрезается до `n - 1`, и на этом отрезке работает обычный **бинарный поиск** с включёнными границами. В отличие от **Jump Search**, шаг не постоянный, а растёт: прыжков столько, сколько раз нужно удвоить 1, чтобы дойти до искомого.',
    en: 'First `arr[0]` is checked. Then the bound `bound` starts at 1 and **doubles** while `arr[bound]` is less than the target and `bound` is still inside the array. When the loop stops, the target can only lie between `bound / 2` and `bound`: `arr[bound / 2]` has already been checked and is less than the target, while `arr[bound]` is not. The right end is cut down to `n - 1`, and on that stretch an ordinary **binary search** with both bounds included does the rest. Unlike **Jump Search**, the step is not fixed but grows: there are as many jumps as the times 1 has to be doubled to reach the target.',
  },

  steps: [
    {
      title: { ru: 'Проверить первый элемент', en: 'Check the first element' },
      explanation: {
        ru: 'Подсвечен `arr[0]`. Если это искомое, ответ `0` за одно сравнение. Граница дальше начинается с 1, а не с 0: с 0 удвоение не сдвинулось бы с места, `0 · 2 = 0`.',
        en: '`arr[0]` is highlighted. If it is the target, the answer is `0` after one comparison. From here on the bound starts at 1, not 0: from 0 doubling would never move, `0 · 2 = 0`.',
      },
    },
    {
      title: { ru: 'Удваивать границу', en: 'Double the bound' },
      explanation: {
        ru: 'Подсвечен `arr[bound]`. Он меньше искомого - значит, и всё левее него меньше, и граница удваивается: 1, 2, 4, 8. Прежняя граница становится левым краем возможного отрезка, всё левее неё остаётся пустым контуром. Для 26 это 15, 17 и 23 - меньше, а на `arr[8] = 34` удвоение останавливается.',
        en: '`arr[bound]` is highlighted. It is less than the target - so everything to its left is less too, and the bound doubles: 1, 2, 4, 8. The previous bound becomes the left end of the possible stretch, and everything to its left is left as an empty outline. For 26 that is 15, 17 and 23 - all less - and doubling stops at `arr[8] = 34`.',
      },
    },
    {
      title: { ru: 'Отрезок для бинарного поиска', en: 'The stretch for binary search' },
      explanation: {
        ru: 'Искомое может лежать только в `[bound / 2, min(bound, n - 1)]`. Для 26 это индексы от 4 до 8. Если граница выскочила за массив, правый край - последний элемент: для 43 граница дошла до 16 при 12 элементах, и отрезок - от 8 до 11.',
        en: 'The target can only lie in `[bound / 2, min(bound, n - 1)]`. For 26 that is indices 4 to 8. If the bound has jumped past the array, the right end is the last element: for 43 the bound reached 16 with 12 elements, and the stretch is 8 to 11.',
      },
    },
    {
      title: { ru: 'Бинарный поиск внутри отрезка', en: 'Binary search inside the stretch' },
      explanation: {
        ru: 'Дальше - обычный **Binary Search**, только не по всему массиву: середина отрезка сравнивается с искомым, и половина отбрасывается. Для 26: `arr[6] = 28` больше, `arr[4] = 23` меньше, `arr[5] = 26` - совпало. На 12 элементах выигрыша нет: бинарный поиск по всему массиву попал бы в `arr[5]` с первого раза. Выигрыш появляется, когда искомое близко к началу большого массива.',
        en: 'From here it is an ordinary **Binary Search**, only not over the whole array: the middle of the stretch is compared with the target, and half is discarded. For 26: `arr[6] = 28` is greater, `arr[4] = 23` is less, `arr[5] = 26` - a match. On 12 elements there is no gain: binary search over the whole array would hit `arr[5]` first time. The gain appears when the target is near the start of a large array.',
      },
    },
    {
      title: { ru: 'Ответ - индекс или -1', en: 'The answer is an index or -1' },
      explanation: {
        ru: 'Совпало - ответ индекс. Отрезок опустел - ответ `-1`: левее отрезка всё меньше искомого по удвоениям, правее - больше по порядку массива. Для 43 это 4 проверки границ, 3 сравнения внутри и `-1`.',
        en: 'A match - the answer is the index. The stretch is empty - the answer is `-1`: everything to the left of the stretch is less than the target by the doublings, and everything to its right is greater by the order of the array. For 43 that is 4 checks of the bound, 3 comparisons inside and `-1`.',
      },
    },
  ],

  implementation: {
    javascript: `function exponentialSearch(arr, target) {
  const n = arr.length;
  if (n === 0) return -1;
  if (arr[0] === target) return 0;
  let bound = 1;
  while (bound < n && arr[bound] < target) bound *= 2;
  return binarySearch(arr, target, Math.floor(bound / 2), Math.min(bound, n - 1));
}

function binarySearch(arr, target, lo, hi) {
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    python: `def exponential_search(arr, target):
    n = len(arr)
    if n == 0:
        return -1
    if arr[0] == target:
        return 0
    bound = 1
    while bound < n and arr[bound] < target:
        bound *= 2
    return binary_search(arr, target, bound // 2, min(bound, n - 1))


def binary_search(arr, target, lo, hi):
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`exponentialSearch` принимает отсортированный по возрастанию массив `arr` и искомое `target` и вернёт индекс совпадения или `-1`. Порядок массива функция не проверяет: это стоило бы O(n) и съело бы весь выигрыш.',
          en: '`exponentialSearch` takes an array `arr` sorted in ascending order and a target `target` and returns the index of a match, or `-1`. The function does not check the order of the array: that would cost O(n) and eat up the whole gain.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Пустой массив', en: 'An empty array' },
        explanation: {
          ru: '`n` - длина массива. В пустом массиве искать нечего, и ответ сразу `-1`. Без неё следующая строка прочитала бы несуществующий `arr[0]`: обычно ответ всё равно `-1` - `Math.min(1, -1)` даёт пустой отрезок, - но `exponentialSearch([], undefined)` вернул бы `0`.',
          en: '`n` is the length of the array. There is nothing to search in an empty array, and the answer is `-1` at once. Without it the next line would read a nonexistent `arr[0]`: usually the answer is still `-1` - `Math.min(1, -1)` gives an empty stretch - but `exponentialSearch([], undefined)` would return `0`.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Первый элемент отдельно', en: 'The first element on its own' },
        explanation: {
          ru: 'Если искомое - `arr[0]`, ответ `0` за одно сравнение. Для правильности эта строка не обязательна: без неё граница остановится на 1, и бинарный поиск на отрезке `[0, 1]` всё равно найдёт `arr[0]` - на 100 000 случайных массивов без неё не было ни одного неверного ответа. Она экономит сравнение, когда искомое в начале, но если граница так и осталась 1, бинарный поиск ниже сравнит `arr[0]` ещё раз.',
          en: 'If the target is `arr[0]`, the answer is `0` after one comparison. Correctness does not need this line: without it the bound stops at 1, and binary search on the stretch `[0, 1]` still finds `arr[0]` - on 100,000 random arrays without it there was not a single wrong answer. It saves a comparison when the target is at the start, but if the bound stays at 1, the binary search below compares `arr[0]` once more.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Граница начинается с 1', en: 'The bound starts at 1' },
        explanation: {
          ru: '`bound` - индекс, который будет проверяться и удваиваться. Начать с 0 нельзя: `0 * 2 = 0`, граница стояла бы на месте, и цикл ниже не кончился бы, пока `arr[0]` меньше искомого. Поэтому граница стартует с 1, а `arr[0]` проверен строкой выше.',
          en: '`bound` is the index that will be checked and doubled. It cannot start at 0: `0 * 2 = 0`, the bound would stand still, and the loop below would never end while `arr[0]` is less than the target. That is why the bound starts at 1, and `arr[0]` is checked on the line above.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Удвоение границы', en: 'Doubling the bound' },
        explanation: {
          ru: 'Пока граница внутри массива и `arr[bound]` меньше искомого, граница удваивается: 1, 2, 4, 8, ... Порядок условий важен: `bound < n` проверяется первым, и за массив цикл не читает. Если искомое на позиции i (i от 2 и больше), цикл остановится на первой степени двойки, не меньшей i, - это не больше ⌈log₂ i⌉ + 1 проверок. Переполнения в JS нет: длина массива меньше 2^32, а числа точны до 2^53.',
          en: 'While the bound is inside the array and `arr[bound]` is less than the target, the bound doubles: 1, 2, 4, 8, ... The order of the conditions matters: `bound < n` is checked first, so the loop never reads past the array. If the target is at position i (i of 2 or more), the loop stops at the first power of two not less than i - at most ⌈log₂ i⌉ + 1 checks. JS has no overflow here: an array is shorter than 2^32, and numbers are exact up to 2^53.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Нижняя граница отрезка', en: 'The lower end of the stretch' },
        explanation: {
          ru: 'Левый край - `bound / 2`, а не 0: удвоение дошло до `bound` только потому, что `arr[bound / 2]` оказался меньше искомого, а с ним и всё левее. `Math.floor` нужен для одного случая: если граница осталась 1, `1 / 2 = 0.5`, и `arr[0.5]` в JS - `undefined`. Без `Math.floor` поиск 15 в демо-массиве, где 15 стоит на индексе 1, возвращает `-1`.',
          en: 'The left end is `bound / 2`, not 0: doubling reached `bound` only because `arr[bound / 2]` turned out less than the target, and everything to its left with it. `Math.floor` is there for one case: if the bound stayed at 1, `1 / 2 = 0.5`, and `arr[0.5]` in JS is `undefined`. Without `Math.floor` a search for 15 in the demo array, where 15 sits at index 1, returns `-1`.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Верхняя граница отрезка', en: 'The upper end of the stretch' },
        explanation: {
          ru: 'Правый край - `bound`, потому что `arr[bound]` не меньше искомого. Но цикл мог остановиться и потому, что граница вышла за массив: для 12 элементов она прыгает с 8 на 16. Тогда `Math.min(bound, n - 1)` обрезает отрезок до последнего элемента. Без `min` поиск 42 в демо-массиве читает `arr[12]` - в JS это `undefined`, и ответ верный лишь по случайности, а Python падает с `IndexError`.',
          en: 'The right end is `bound`, because `arr[bound]` is not less than the target. But the loop may also have stopped because the bound went past the array: for 12 elements it jumps from 8 to 16. Then `Math.min(bound, n - 1)` cuts the stretch down to the last element. Without `min` a search for 42 in the demo array reads `arr[12]` - in JS that is `undefined`, and the answer is right only by luck, while Python fails with `IndexError`.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Бинарный поиск с границами', en: 'Binary search with bounds' },
        explanation: {
          ru: 'Это тот же `binarySearch`, что на странице **Binary Search**, но границы `lo` и `hi` приходят параметрами, а не равны всему массиву. Обе включены: искомое, если оно есть, лежит в `arr[lo..hi]`. Если искомое на позиции i (от 2 и больше), в отрезке не больше i элементов, и бинарному поиску нужно около log₂ i сравнений.',
          en: 'This is the same `binarySearch` as on the **Binary Search** page, but the bounds `lo` and `hi` come in as parameters instead of covering the whole array. Both are included: the target, if present, lies in `arr[lo..hi]`. If the target is at position i (2 or more), the stretch has at most i elements, and binary search needs about log₂ i comparisons.',
        },
      },
      {
        lines: [11, 12],
        title: { ru: 'Середина отрезка', en: 'The middle of the stretch' },
        explanation: {
          ru: 'Пока отрезок не пуст, берётся середина `lo + Math.floor((hi - lo) / 2)`. Запись через разность, а не `(lo + hi) / 2`, - привычка из языков с ограниченными целыми, где сумма может переполниться; в JS это не нужно, но вариант тот же, что в **Binary Search**.',
          en: 'While the stretch is not empty, the middle is `lo + Math.floor((hi - lo) / 2)`. Writing it via the difference rather than `(lo + hi) / 2` is a habit from languages with bounded integers, where the sum can overflow; JS does not need it, but the variant is the same as in **Binary Search**.',
        },
      },
      {
        lines: [13, 15],
        title: { ru: 'Сравнить и сузить', en: 'Compare and narrow' },
        explanation: {
          ru: 'Середина равна искомому - ответ `mid`. Меньше - отбрасываются она и всё левее, `lo = mid + 1`; больше - она и всё правее, `hi = mid - 1`. Среди дубликатов это не обязательно первое вхождение: в `[10, 20, 30, 40, 50, 60, 60, 70, 80]` поиск 60 вернёт 6, а не 5.',
          en: 'The middle equals the target - the answer is `mid`. Less - it and everything to its left are discarded, `lo = mid + 1`; greater - it and everything to its right, `hi = mid - 1`. Among duplicates this is not necessarily the first occurrence: in `[10, 20, 30, 40, 50, 60, 60, 70, 80]` a search for 60 returns 6, not 5.',
        },
      },
      {
        lines: [16, 18],
        title: { ru: 'Искомого нет', en: 'The target is absent' },
        explanation: {
          ru: 'Отрезок опустел - ответ `-1`. Левее отрезка искомого нет по удвоениям, правее - по порядку массива, так что отсутствие доказано без просмотра всего массива: для числа больше максимума в миллионе элементов это 40 сравнений.',
          en: 'The stretch is empty - the answer is `-1`. There is nothing to the left of the stretch by the doublings, and nothing to its right by the order of the array, so absence is proven without looking at the whole array: for a number greater than the maximum in a million elements that is 40 comparisons.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`exponential_search` принимает отсортированный по возрастанию список `arr` и искомое `target` и вернёт индекс совпадения или `-1`. Порядок списка функция не проверяет.',
          en: '`exponential_search` takes a list `arr` sorted in ascending order and a target `target` and returns the index of a match, or `-1`. The function does not check the order of the list.',
        },
      },
      {
        lines: [2, 4],
        title: { ru: 'Пустой список', en: 'An empty list' },
        explanation: {
          ru: '`n` - длина списка. В пустом списке ответ сразу `-1`; без этой проверки следующая строка упала бы с `IndexError` на `arr[0]`.',
          en: '`n` is the length of the list. For an empty list the answer is `-1` at once; without this check the next line would fail with `IndexError` on `arr[0]`.',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Первый элемент отдельно', en: 'The first element on its own' },
        explanation: {
          ru: 'Искомое - `arr[0]`, ответ `0` за одно сравнение. Как и в JS, для правильности проверка не обязательна - бинарный поиск на `[0, 1]` нашёл бы его, - она экономит сравнения, когда искомое первое.',
          en: 'The target is `arr[0]`, the answer is `0` after one comparison. As in JS, correctness does not need the check - binary search on `[0, 1]` would find it - it saves comparisons when the target is first.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Граница начинается с 1', en: 'The bound starts at 1' },
        explanation: {
          ru: 'С 0 удвоение не сдвинулось бы: `0 * 2 = 0`, и цикл ниже не кончился бы, пока `arr[0]` меньше искомого.',
          en: 'From 0 doubling would not move: `0 * 2 = 0`, and the loop below would never end while `arr[0]` is less than the target.',
        },
      },
      {
        lines: [8, 9],
        title: { ru: 'Удвоение границы', en: 'Doubling the bound' },
        explanation: {
          ru: 'Пока граница внутри списка и `arr[bound]` меньше искомого, она удваивается: 1, 2, 4, 8, ... `and` не вычисляет вторую половину, если первая ложна, поэтому за список цикл не читает. Целые в Python не ограничены, переполнения нет.',
          en: 'While the bound is inside the list and `arr[bound]` is less than the target, it doubles: 1, 2, 4, 8, ... `and` does not evaluate its second half when the first is false, so the loop never reads past the list. Python integers are unbounded, so there is no overflow.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Нижняя граница отрезка', en: 'The lower end of the stretch' },
        explanation: {
          ru: 'Левый край - `bound // 2`: этот элемент уже проверен и меньше искомого, и всё левее него тоже. Именно `//`, а не `/`: `/` в Python всегда даёт число с плавающей точкой, `4 / 2 = 2.0`, и `arr[2.0]` - `TypeError`.',
          en: 'The left end is `bound // 2`: that element has already been checked and is less than the target, and so is everything to its left. It has to be `//`, not `/`: in Python `/` always gives a floating-point number, `4 / 2 = 2.0`, and `arr[2.0]` is a `TypeError`.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Верхняя граница отрезка', en: 'The upper end of the stretch' },
        explanation: {
          ru: 'Правый край - `min(bound, n - 1)`: граница могла выскочить за список. Без `min` поиск 39, 42 или 43 в демо-списке из 12 чисел падает с `IndexError` - граница 16, и середина отрезка `[8, 16]` - индекс 12.',
          en: 'The right end is `min(bound, n - 1)`: the bound may have jumped past the list. Without `min` a search for 39, 42 or 43 in the 12-number demo list fails with `IndexError` - the bound is 16, and the middle of the stretch `[8, 16]` is index 12.',
        },
      },
      {
        lines: [13, 15],
        title: { ru: 'Бинарный поиск с границами', en: 'Binary search with bounds' },
        explanation: {
          ru: '`binary_search` - тот же вариант, что на странице **Binary Search**, с включёнными границами, но `lo` и `hi` приходят параметрами. Пока отрезок не пуст, берётся середина.',
          en: '`binary_search` is the same variant as on the **Binary Search** page, with both bounds included, but `lo` and `hi` come in as parameters. While the stretch is not empty, the middle is taken.',
        },
      },
      {
        lines: [16, 21],
        title: { ru: 'Сравнить и сузить', en: 'Compare and narrow' },
        explanation: {
          ru: 'Совпало - ответ `mid`. Середина меньше - `lo` переходит за неё, больше - `hi` перед ней. Среди дубликатов ответ - то вхождение, куда попала середина.',
          en: 'A match - the answer is `mid`. The middle is less - `lo` moves past it; greater - `hi` moves before it. Among duplicates the answer is whichever occurrence the middle landed on.',
        },
      },
      {
        lines: [22],
        title: { ru: 'Искомого нет', en: 'The target is absent' },
        explanation: {
          ru: 'Отрезок опустел - ответ `-1`.',
          en: 'The stretch is empty - the answer is `-1`.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Стоимость зависит от позиции искомого, а не от длины: в миллионе элементов искомое среди первых 10 находится в среднем за 5.8 сравнения, а бинарному поиску по всему массиву нужно 19.',
      en: 'The cost depends on the position of the target, not the length: in a million elements a target among the first 10 is found in 5.8 comparisons on average, while binary search over the whole array needs 19.',
    },
    {
      ru: 'Не нужно знать длину заранее: подходит для потока, бесконечной последовательности или монотонной функции, где правой границы нет.',
      en: 'The length need not be known in advance: it suits a stream, an infinite sequence or a monotonic function, where there is no right bound.',
    },
    {
      ru: 'Вторая половина - обычный бинарный поиск с памятью O(1), отдельно его писать и проверять не нужно.',
      en: 'The second half is an ordinary binary search with O(1) memory, so there is nothing new to write or test.',
    },
  ],
  cons: [
    {
      ru: 'Если искомое в конце, сравнений вдвое больше, чем у бинарного: в миллионе элементов 40 против 20.',
      en: 'If the target is near the end, it takes twice as many comparisons as binary search: 40 against 20 in a million elements.',
    },
    {
      ru: 'Нужен отсортированный массив и доступ по индексу: на связном списке каждый прыжок стоил бы прохода.',
      en: 'It needs a sorted array and access by index: on a linked list every jump would cost a walk.',
    },
    {
      ru: 'Ловушки на границах: `bound` с 0 зацикливается, без `min` - выход за массив, в Java с `int` удвоение переполняется при n больше 2^30.',
      en: 'Traps at the edges: `bound` from 0 loops forever, without `min` it reads past the array, and in Java with `int` doubling overflows when n is above 2^30.',
    },
  ],

  whenToUse: [
    {
      ru: '**Длина неизвестна или бесконечна** - поток, функция вместо массива, поиск точки, где монотонная величина переходит порог. Бинарному поиску нужна правая граница, удвоение её находит.',
      en: '**The length is unknown or infinite** - a stream, a function instead of an array, a search for the point where a monotonic quantity crosses a threshold. Binary search needs a right bound, and doubling finds it.',
    },
    {
      ru: '**Искомое обычно близко к началу** - например, при слиянии отсортированных частей, как galloping в Timsort. Если же позиция случайна по всему массиву, обычный **Binary Search** вдвое экономнее.',
      en: '**The target is usually near the start** - for instance when merging sorted runs, as galloping does in Timsort. If the position is random across the whole array, plain **Binary Search** is twice as frugal.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Timsort в CPython** - при слиянии двух серий, когда элементы одной серии много раз подряд оказываются меньше, сортировка переходит в режим galloping: ищет место элемента удвоением шага 1, 3, 7, 15, ... и бинарным поиском, а потом копирует целый кусок. Начальный порог - `MIN_GALLOP = 7` (Objects/listobject.c), дальше он подстраивается под данные.',
      en: '**Timsort in CPython** - when merging two runs, if elements of one run keep winning many times in a row, the sort switches to galloping mode: it finds the place of an element by doubling offsets 1, 3, 7, 15, ... plus binary search, and then copies a whole chunk. The initial threshold is `MIN_GALLOP = 7` (Objects/listobject.c), and it then adapts to the data.',
    },
    {
      ru: '**Поиск точки отказа** - пример Бентли и Яо: система работает без нагрузки, и нужно найти нагрузку, при которой она перестаёт работать. Верхней границы заранее нет, и её ищут удвоением.',
      en: '**Finding a breaking point** - an example from Bentley and Yao: a system works with no load, and you need the load at which it stops working. There is no upper bound in advance, so it is found by doubling.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Экспоненциальный поиск - это бинарный поиск, который сам находит себе правую границу.** Первый этап проверяет индексы 1, 2, 4, 8, ..., пока элемент меньше искомого, второй ищет бинарным поиском на последнем отрезке. От **Jump Search** он отличается шагом: там шаг постоянный, √n, и считается от длины, а здесь каждый прыжок вдвое длиннее прежнего. «Экспоненциальный» - про рост границы, 2^k, а не про сложность: время - O(log i), и с **O(2^n)** из раздела Big O у него общего только слово. С **Interpolation Search** его тоже легко спутать по названию, но тот выбирает пробу по значению, а этот смотрит только на порядок.',
        en: '**Exponential search is binary search that finds its own right bound.** The first stage checks indices 1, 2, 4, 8, ... while the element is less than the target, and the second runs binary search on the last stretch. It differs from **Jump Search** in the step: there the step is fixed, √n, computed from the length, while here every jump is twice as long as the last. "Exponential" is about the growth of the bound, 2^k, not about complexity: the time is O(log i), and it shares nothing with **O(2^n)** from the Big O section except a word. It is also easy to confuse with **Interpolation Search** by name, but that one picks the probe from the value, while this one looks only at the order.',
      },
      {
        ru: '**Почему отрезок именно `[bound / 2, min(bound, n - 1)]`.** Цикл перешёл к `bound` только потому, что `arr[bound / 2]` меньше искомого - значит, и всё левее меньше, и искать там незачем. А `arr[bound]` не меньше искомого, так что правее него искомого нет. Если цикл остановился, потому что граница вышла за массив, правый край - последний элемент, `n - 1`. Оба края - места ошибок: без `Math.floor` JS теряет `arr[1]` (граница 1, `1 / 2 = 0.5`), без `min` Python падает с `IndexError`, а JS читает `undefined` и отвечает верно лишь по случайности.',
        en: '**Why the stretch is exactly `[bound / 2, min(bound, n - 1)]`.** The loop moved on to `bound` only because `arr[bound / 2]` is less than the target - so everything to its left is less too, and there is no point looking there. And `arr[bound]` is not less than the target, so the target is not to its right. If the loop stopped because the bound left the array, the right end is the last element, `n - 1`. Both ends are where mistakes happen: without `Math.floor` JS loses `arr[1]` (bound 1, `1 / 2 = 0.5`), and without `min` Python fails with `IndexError`, while JS reads `undefined` and answers correctly only by luck.',
      },
      {
        ru: '**Откуда O(log i).** Пусть искомое на позиции i, i от 2 и больше. Удвоение остановится на первой степени двойки, не меньшей i, то есть на `bound < 2i`: это не больше ⌈log₂ i⌉ + 1 проверок. Отрезок `[bound / 2, bound]` содержит не больше i элементов, и бинарному поиску на нём нужно около log₂ i сравнений. Вместе - около **2 log₂ i**. Бентли и Яо для своего варианта (они проверяют позиции 2^k - 1, у них n - позиция искомого) получили ровно 2⌊lg n⌋ + 1 вычислений; в нашем прогоне на больших позициях выходит в среднем на одно больше - это сравнение с `arr[0]`.',
        en: '**Where O(log i) comes from.** Let the target be at position i, with i of 2 or more. Doubling stops at the first power of two not less than i, that is at `bound < 2i`: at most ⌈log₂ i⌉ + 1 checks. The stretch `[bound / 2, bound]` holds at most i elements, and binary search on it needs about log₂ i comparisons. Together that is about **2 log₂ i**. Bentley and Yao got exactly 2⌊lg n⌋ + 1 evaluations for their variant (they check positions 2^k - 1, and their n is the position of the target); in our run, at large positions, it comes out one more on average - the comparison with `arr[0]`.',
      },
      {
        ru: '**В числах, n = 10^6** (прогон по всем позициям, сравнение = одно чтение элемента). Искомое на позиции 10 - 9 сравнений, бинарному по всему массиву нужно 18; на позиции 100 - 13 против 20. Для позиций от 2^k до 2^(k+1) в среднем около 2k + 2: от 1024 до 2047 - 22.0. Равенство - около позиции 500: от 256 до 511 в среднем 18.0 против 19.0, от 512 до 1023 - уже 20.0 против 19.0. Во второй половине массива в среднем 38.9 против 19.0, максимум 40 против 20, - **вдвое хуже**. Правило: выигрыш есть, пока искомое левее примерно √n.',
        en: '**In numbers, n = 10^6** (a run over every position, a comparison = one read of an element). A target at position 10 takes 9 comparisons, while binary search over the whole array needs 18; at position 100 it is 13 against 20. For positions from 2^k to 2^(k+1) the average is about 2k + 2: from 1024 to 2047 it is 22.0. They break even around position 500: from 256 to 511 the average is 18.0 against 19.0, from 512 to 1023 already 20.0 against 19.0. In the second half of the array it averages 38.9 against 19.0, at most 40 against 20 - **twice as bad**. The rule: it wins while the target lies left of about √n.',
      },
      {
        ru: '**Неограниченный поиск - главный довод.** Бентли и Яо (1976) ставят задачу так: есть функция F на натуральных числах, она равна X до некоторого n и Y начиная с n, и найти n можно только вычисляя F в выбранных точках. Это то же, что поиск в отсортированной таблице бесконечной длины. Применения из их статьи: ноль функции, которая пересекает ось один раз; нагрузка, при которой система перестаёт работать; поиск в очень большой таблице, когда платить хочется пропорционально расстоянию от начала. Бинарный поиск здесь неприменим вовсе - ему не с чего начать.',
        en: '**Unbounded search is the main argument.** Bentley and Yao (1976) frame the problem like this: there is a function F on the natural numbers, equal to X below some n and to Y from n on, and n can be found only by evaluating F at chosen points. That is the same as searching a sorted table of infinite length. Applications from their paper: the zero of a function that crosses the axis once; the load at which a system stops working; a search in a very large table when you want to pay in proportion to the distance from the start. Binary search does not apply here at all - it has nowhere to start.',
      },
      {
        ru: '**Удвоение - не предел.** У Бентли и Яо наш алгоритм называется B1, «бинарный поиск» со «стратегией игрока» - удваивать каждую следующую догадку. Первый этап B1 - по сути линейный поиск по показателю степени, и его можно заменить тем же B1: так получается **B2**, «двойной бинарный поиск», ⌊lg n⌋ + 2⌊lg(⌊lg n⌋ + 1)⌋ + 1 вычислений. Повторяя замену, получают Bk, а алгоритм U выбирает k по самому n. Они же доказали нижнюю границу: любому алгоритму для бесконечно многих n нужно больше lg n + lg lg n + lg lg lg n + ... вычислений (точнее, этой суммы минус 2 lg* n), и U почти её достигает. На практике используют B1: разница проявляется только на огромных n.',
        en: '**Doubling is not the limit.** In Bentley and Yao our algorithm is called B1, "binary search" with the "gambler\'s strategy" of doubling successive guesses. The first stage of B1 is essentially a linear search over the exponent, and it can be replaced by B1 itself: that gives **B2**, "double binary search", with ⌊lg n⌋ + 2⌊lg(⌊lg n⌋ + 1)⌋ + 1 evaluations. Repeating the replacement gives Bk, and algorithm U chooses k from n itself. They also proved a lower bound: for infinitely many n any algorithm needs more than lg n + lg lg n + lg lg lg n + ... evaluations (more precisely, that sum minus 2 lg* n), and U nearly reaches it. In practice B1 is what gets used: the difference shows only on huge n.',
      },
      {
        ru: '**Ловушки в начале и в удвоении.** Граница начинается с 1, потому что `0 * 2 = 0` и цикл с 0 не кончился бы; `arr[0]` удвоение не проверяет, и его сравнивают отдельно. Эта проверка экономит сравнение, но для правильности не нужна: без неё на 100 000 случайных массивов не было ни одного неверного ответа. **Переполнение** зависит от языка. В Java с `int` граница 2^30 при n больше 2^30 удваивается в -2^31: на массиве из 1.5 млрд байт поиск последнего элемента упал с `ArrayIndexOutOfBoundsException: Index -2147483648`, а на миллиарде - нашёл. В JS длина массива меньше 2^32, а числа точны до 2^53; в Python целые не ограничены.',
        en: '**Traps at the start and in doubling.** The bound starts at 1 because `0 * 2 = 0` and a loop from 0 would never end; doubling never checks `arr[0]`, so it is compared on its own. The check saves a comparison but correctness does not need it: without it, 100,000 random arrays gave not a single wrong answer. **Overflow** depends on the language. In Java with `int` a bound of 2^30 with n above 2^30 doubles to -2^31: on an array of 1.5 billion bytes a search for the last element failed with `ArrayIndexOutOfBoundsException: Index -2147483648`, while on a billion it found it. In JS an array is shorter than 2^32 and numbers are exact up to 2^53; in Python integers are unbounded.',
      },
      {
        ru: '**Дубликаты.** Отрезок начинается с элемента, который меньше искомого, поэтому первое вхождение всегда внутри отрезка - но бинарный поиск внутри возвращает то, на которое попала середина. `[1, 3, 3, 3, 3, 3, 5]`, ищем 3: экспоненциальный даёт 1 (первое), `binarySearch` по всему массиву - 3, прыжковый - 1. `[10, 20, 30, 40, 50, 60, 60, 70, 80]`, ищем 60: экспоненциальный и бинарный дают 6, прыжковый - 5. На 200 000 случайных массивов с повторами первое вхождение вернулось в 75% случаев у экспоненциального, в 58% у бинарного и всегда у прыжкового. Нужно первое - внутри ставят **lower bound**.',
        en: '**Duplicates.** The stretch starts at an element less than the target, so the first occurrence is always inside it - but binary search inside returns whichever one the middle lands on. `[1, 3, 3, 3, 3, 3, 5]`, looking for 3: exponential gives 1 (the first), `binarySearch` over the whole array gives 3, jump search gives 1. `[10, 20, 30, 40, 50, 60, 60, 70, 80]`, looking for 60: exponential and binary give 6, jump search gives 5. On 200,000 random arrays with repeats the first occurrence came back in 75% of cases for exponential, 58% for binary and always for jump search. If you need the first one, put a **lower bound** inside.',
      },
    ],
    whenToUse: [
      {
        ru: '**Искомое обычно близко к началу** - экспоненциальный выигрывает, пока позиция меньше примерно √n: на миллионе элементов искомое среди первых 100 находится в среднем за 11.7 сравнения против 19. Если позиция случайна по всему массиву, он в среднем вдвое хуже бинарного: 37.4 против 19.0.',
        en: '**The target is usually near the start** - exponential wins while the position is below roughly √n: on a million elements a target among the first 100 is found in 11.7 comparisons on average, against 19. If the position is random across the whole array, it is on average twice as bad as binary search: 37.4 against 19.0.',
      },
      {
        ru: '**Длина неизвестна** - поток, бесконечная последовательность, монотонная функция. Условие `bound < n` тогда заменяют проверкой, существует ли элемент, или убирают совсем, если последовательность бесконечна. **Binary Search** и **Jump Search** без длины не начнут.',
        en: '**The length is unknown** - a stream, an infinite sequence, a monotonic function. The condition `bound < n` is then replaced by a check that the element exists, or dropped altogether if the sequence is infinite. **Binary Search** and **Jump Search** cannot start without the length.',
      },
      {
        ru: '**Слияние отсортированных последовательностей** - когда одна последовательность много раз подряд «выигрывает», место элемента ищут удвоением от текущей позиции. Так устроен galloping в Timsort, а в listsort.txt есть таблица: на позициях от 0 до 5 он проигрывает линейному проходу (на 2 и 4) или идёт вровень, начиная с 6 - всегда выигрывает.',
        en: '**Merging sorted sequences** - when one sequence keeps "winning" many times in a row, the place of an element is found by doubling from the current position. That is how galloping works in Timsort, and listsort.txt has a table: at positions 0 to 5 it loses to a linear pass (at 2 and 4) or ties, and from 6 on it always wins.',
      },
      {
        ru: '**Только вперёд, без доступа по индексу** - выбирайте **Jump Search** или **Linear Search**: экспоненциальному нужен прыжок в любую позицию, а на связном списке каждое удвоение стоит прохода.',
        en: '**Only forward, no access by index** - choose **Jump Search** or **Linear Search**: exponential search needs to jump to any position, and on a linked list every doubling costs a walk.',
      },
      {
        ru: '**Числовые ключи, равномерно распределённые** - **Interpolation Search** в среднем быстрее обоих, но без гарантии на худший случай; экспоненциальный гарантирует O(log n) на любых данных.',
        en: '**Numeric keys, evenly distributed** - **Interpolation Search** is faster than both on average, but without a worst-case guarantee; exponential search guarantees O(log n) on any data.',
      },
    ],
    realWorld: [
      {
        ru: '**J. L. Bentley, A. C. Yao, «An almost optimal algorithm for unbounded searching», Information Processing Letters 5(3), август 1976, с. 82-87** - задача неограниченного поиска, алгоритмы B0 (линейный), B1 (удвоение + бинарный, 2⌊lg n⌋ + 1), B2, Bk и U, нижняя граница. Сверено по препринту SLAC-PUB-1679 (ноябрь 1975); журнальный текст мы не открывали, выходные данные - по Crossref. На Кнута, т. 3, §6.2.1 они ссылаются только для поиска в конечной таблице; книгу Кнута мы не открывали.',
        en: '**J. L. Bentley, A. C. Yao, "An almost optimal algorithm for unbounded searching", Information Processing Letters 5(3), August 1976, pp. 82-87** - the unbounded search problem, algorithms B0 (linear), B1 (doubling + binary, 2⌊lg n⌋ + 1), B2, Bk and U, and a lower bound. Checked against the preprint SLAC-PUB-1679 (November 1975); we have not opened the journal text, and the publication details are from Crossref. They cite Knuth, vol. 3, §6.2.1 only for search in a finite table; we have not opened Knuth\'s book.',
      },
      {
        ru: '**CPython 3.15.2, Objects/listsort.txt и Objects/listobject.c** - galloping в Timsort: смещения 1, 3, 7, 15, ... от индекса-подсказки (0 или n - 1), потом бинарный поиск; `gallop_left` и `gallop_right` работают как `bisect_left` и `bisect_right`, чтобы сохранить устойчивость. `MIN_GALLOP = 7`, а `min_gallop` подстраивается: растёт, когда galloping не окупается, и падает, когда окупается. Перед каждым удвоением смещения стоит `assert` против переполнения.',
        en: '**CPython 3.15.2, Objects/listsort.txt and Objects/listobject.c** - galloping in Timsort: offsets 1, 3, 7, 15, ... from a hint index (0 or n - 1), then binary search; `gallop_left` and `gallop_right` behave like `bisect_left` and `bisect_right`, to keep the sort stable. `MIN_GALLOP = 7`, and `min_gallop` adapts: it grows when galloping does not pay off and shrinks when it does. Every doubling of the offset is preceded by an `assert` against overflow.',
      },
      {
        ru: '**OpenJDK, java/util/TimSort.java (тег jdk-25-ga)** - перенос Timsort из CPython: `gallopLeft`, `gallopRight`, `MIN_GALLOP = 7`. После каждого `ofs = (ofs << 1) + 1` стоит проверка `if (ofs <= 0) // int overflow` - та самая ловушка удвоения в 32-битном `int`.',
        en: '**OpenJDK, java/util/TimSort.java (tag jdk-25-ga)** - a port of Timsort from CPython: `gallopLeft`, `gallopRight`, `MIN_GALLOP = 7`. After every `ofs = (ofs << 1) + 1` there is a check `if (ofs <= 0) // int overflow` - exactly the doubling trap of a 32-bit `int`.',
      },
      {
        ru: '**Откуда название** - по listsort.txt, Тим Петерс узнал о galloping из работы Demaine, López-Ortiz, Munro «Adaptive Set Intersections, Unions, and Differences» (2000), а название «exponential search» встретил раньше у Peter McIlroy, «Optimistic Sorting and Information Theoretic Complexity» (SODA 1993), и пишет, что идея, вероятно, восходит к Бентли и Яо. Обе статьи мы не открывали и знаем только по этой ссылке.',
        en: '**Where the name comes from** - according to listsort.txt, Tim Peters learned about galloping from Demaine, López-Ortiz and Munro, "Adaptive Set Intersections, Unions, and Differences" (2000), met the name "exponential search" earlier in Peter McIlroy, "Optimistic Sorting and Information Theoretic Complexity" (SODA 1993), and writes that the idea probably goes back to Bentley and Yao. We have opened neither paper and know them only from this reference.',
      },
    ],
  },

  relatedAlgorithms: ['binary-search', 'jump-search', 'interpolation-search', 'linear-search', 'fibonacci-search', 'ternary-search'],

  quiz: [
    {
      question: {
        ru: 'Как экспоненциальный поиск находит отрезок, где лежит искомое?',
        en: 'How does exponential search find the stretch where the target lies?',
      },
      options: [
        { ru: 'Прыгает вперёд блоками по √n и сверяет последний элемент блока', en: 'It jumps ahead in blocks of √n and checks the end of each block' },
        { ru: 'Удваивает границу 1, 2, 4, 8, пока `arr[bound]` меньше искомого', en: 'It doubles a bound 1, 2, 4, 8 while `arr[bound]` is too small' },
        { ru: 'Оценивает позицию по значению искомого относительно концов отрезка', en: 'It estimates the position from the target value relative to the ends' },
        { ru: 'Сразу делит весь массив пополам и отбрасывает лишнюю половину', en: 'It splits the whole array in half at once and drops the wrong half' },
      ],
      correct: 1,
      explanation: {
        ru: 'Граница начинается с 1 и удваивается, пока `arr[bound]` меньше искомого; потом бинарный поиск на `[bound / 2, min(bound, n - 1)]`. Блоки по √n - это прыжковый поиск, оценка по значению - интерполяционный, деление всего массива - бинарный.',
        en: 'The bound starts at 1 and doubles while `arr[bound]` is less than the target; then binary search runs on `[bound / 2, min(bound, n - 1)]`. Blocks of √n are jump search, estimating from the value is interpolation search, splitting the whole array is binary search.',
      },
      hint: {
        ru: 'Смотрите шаг «Удваивать границу» на вкладке «Визуализация».',
        en: 'See the "Double the bound" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Массив `[12, 15, 17, 20, 23, 26, 28, 31, 34, 37, 39, 42]`, ищем 26. На каком отрезке запустится бинарный поиск?',
        en: 'The array `[12, 15, 17, 20, 23, 26, 28, 31, 34, 37, 39, 42]`, looking for 26. On which stretch does binary search run?',
      },
      options: [
        { ru: 'Индексы от 0 до 11 - бинарный поиск всегда идёт по всему массиву', en: 'Indices 0 to 11 - binary search always covers the whole array' },
        { ru: 'Индексы от 4 до 8: `arr[4] = 23` меньше, `arr[8] = 34` уже нет', en: 'Indices 4 to 8: `arr[4] = 23` is less, `arr[8] = 34` is not' },
        { ru: 'Индексы от 3 до 5 - один блок длиной ⌊√12⌋, как в прыжковом', en: 'Indices 3 to 5 - one block of length ⌊√12⌋, as in jump search' },
        { ru: 'Индексы от 8 до 11 - граница доходит до 16 и обрезается до n - 1', en: 'Indices 8 to 11 - the bound reaches 16 and is cut down' },
      ],
      correct: 1,
      explanation: {
        ru: 'Граница проходит 1 (15), 2 (17), 4 (23) - всё меньше 26 - и останавливается на 8, где 34. Отрезок - `[8 / 2, 8]` = от 4 до 8. До 16 граница доходит при поиске 43, тогда отрезок от 8 до 11.',
        en: 'The bound passes 1 (15), 2 (17), 4 (23) - all less than 26 - and stops at 8, where 34 is. The stretch is `[8 / 2, 8]` = 4 to 8. The bound reaches 16 on a search for 43, and then the stretch is 8 to 11.',
      },
      hint: {
        ru: 'Смотрите шаг «Отрезок для бинарного поиска» на вкладке «Визуализация».',
        en: 'See the "The stretch for binary search" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Что в экспоненциальном поиске растёт экспоненциально?',
        en: 'What grows exponentially in exponential search?',
      },
      options: [
        { ru: 'Время работы: это алгоритм класса O(2^n), как перебор подмножеств', en: 'The running time: it is an O(2^n) algorithm, like trying all subsets' },
        { ru: 'Проверяемая граница: 1, 2, 4, 8, то есть 2^k после k удвоений', en: 'The bound it checks: 1, 2, 4, 8, that is 2^k after k doublings' },
        { ru: 'Точность оценки: каждая проба по значению вдвое точнее', en: 'The precision of the estimate: each value-based probe is twice as precise' },
        { ru: 'Расход памяти: каждое удвоение копирует отрезок массива', en: 'The memory use: each doubling copies a stretch of the array' },
      ],
      correct: 1,
      explanation: {
        ru: 'Слово в названии - про границу, 2^k. Время - O(log i), память - O(1), а пробы по значению - это интерполяционный поиск. С O(2^n) из раздела Big O общего только слово.',
        en: 'The word in the name is about the bound, 2^k. The time is O(log i), the memory O(1), and value-based probes are interpolation search. It shares nothing with O(2^n) from the Big O section but the word.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the first paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему бинарный поиск после удвоения начинается с `bound / 2`, а не с 0?',
        en: 'Why does binary search after doubling start at `bound / 2` rather than 0?',
      },
      options: [
        { ru: 'Чтобы отрезок всегда был длиной ровно в степень двойки', en: 'So that the stretch is always exactly a power of two long' },
        { ru: 'Это лишь оптимизация: с 0 он бы иногда давал ошибку', en: 'It is only an optimisation: from 0 it would sometimes be wrong' },
        { ru: '`arr[bound / 2]` уже проверен: он и всё левее меньше искомого', en: '`arr[bound / 2]` was checked: it and all left of it are too small' },
        { ru: 'Левее `bound / 2` элементы при удвоении могли поменяться местами', en: 'Left of `bound / 2` elements may have been swapped during doubling' },
      ],
      correct: 2,
      explanation: {
        ru: 'Удвоение перешло к `bound` только потому, что `arr[bound / 2] < target`; массив отсортирован, значит, всё левее тоже меньше. С 0 поиск был бы верным, но не O(log i). Массив поиск не меняет, а длина отрезка - не обязательно степень двойки: правый край обрезается до `n - 1`.',
        en: 'Doubling moved on to `bound` only because `arr[bound / 2] < target`; the array is sorted, so everything to the left is less too. From 0 the search would be correct, but not O(log i). The search never changes the array, and the stretch is not necessarily a power of two long: the right end is cut to `n - 1`.',
      },
      hint: {
        ru: 'Смотрите шаг «Нижняя граница отрезка» на вкладке «Реализация».',
        en: 'See the "The lower end of the stretch" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Из Python-версии убрали `min` и передают просто `bound`. Что будет при поиске 42 в демо-списке из 12 чисел?',
        en: 'The `min` was removed from the Python version, and plain `bound` is passed. What happens on a search for 42 in the 12-number demo list?',
      },
      options: [
        { ru: 'Ничего: бинарный поиск сам остановится на последнем элементе списка', en: 'Nothing: binary search stops at the last element of the list by itself' },
        { ru: 'Вернёт `-1`: 42 окажется за правым краем отрезка поиска', en: 'It returns `-1`: 42 ends up past the right end of the stretch' },
        { ru: 'Вечный цикл: граница 16 больше не будет удваиваться', en: 'An endless loop: the bound of 16 never doubles again' },
        { ru: '`IndexError`: граница 16, и середина `[8, 16]` - индекс 12', en: '`IndexError`: the bound is 16, and the middle of `[8, 16]` is 12' },
      ],
      correct: 3,
      explanation: {
        ru: 'Граница прыгает с 8 на 16 при 12 элементах, середина отрезка `[8, 16]` - `arr[12]`, и Python падает с `IndexError`. JS в той же ситуации читает `undefined`, сравнения с ним ложны, и ответ 11 верен лишь по случайности.',
        en: 'The bound jumps from 8 to 16 with 12 elements, the middle of `[8, 16]` is `arr[12]`, and Python fails with `IndexError`. JS in the same spot reads `undefined`, the comparisons with it are false, and the answer 11 is right only by luck.',
      },
      hint: {
        ru: 'Смотрите шаг «Верхняя граница отрезка» на вкладке «Реализация».',
        en: 'See the "The upper end of the stretch" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему `bound` начинается с 1, а `arr[0]` проверяется отдельной строкой?',
        en: 'Why does `bound` start at 1, with `arr[0]` checked on a separate line?',
      },
      options: [
        { ru: 'С 0 удвоение стоит на месте, `0 * 2 = 0`, и цикл не кончится', en: 'From 0 doubling stands still, `0 * 2 = 0`, and the loop never ends' },
        { ru: 'Без отдельной проверки `arr[0]` его не найдёт никакой этап поиска', en: 'Without the separate check no stage of the search finds `arr[0]`' },
        { ru: 'Индекс 0 в отсортированном массиве всегда занят минимумом', en: 'Index 0 of a sorted array always holds the minimum, so skip it' },
        { ru: 'Так требует бинарный поиск: его отрезок не может включать 0', en: 'Binary search requires it: the stretch it gets can never include index 0' },
      ],
      correct: 0,
      explanation: {
        ru: 'Граница 0 после удвоения снова 0, и цикл крутится, пока `arr[0]` меньше искомого. Отдельная проверка `arr[0]` для правильности не нужна: при границе 1 бинарный поиск на `[0, 1]` всё равно его найдёт. Она даёт ответ за одно сравнение, когда искомое первое.',
        en: 'A bound of 0 is 0 again after doubling, and the loop spins while `arr[0]` is less than the target. The separate check of `arr[0]` is not needed for correctness: with a bound of 1, binary search on `[0, 1]` finds it anyway. It gives the answer in one comparison when the target is first.',
      },
      hint: {
        ru: 'Смотрите шаг «Граница начинается с 1» на вкладке «Реализация».',
        en: 'See the "The bound starts at 1" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернёт `exponentialSearch([10, 20, 30, 40, 50, 60, 60, 70, 80], 60)`?',
        en: 'What does `exponentialSearch([10, 20, 30, 40, 50, 60, 60, 70, 80], 60)` return?',
      },
      options: [
        { ru: '`5` - удвоение всегда выводит на первое вхождение', en: '`5` - doubling always leads to the first occurrence' },
        { ru: '`6` - ту из шестидесяток, куда попала середина отрезка', en: '`6` - whichever 60 the middle of the stretch landed on' },
        { ru: '`8` - граница 8 не меньше 60, и ответ берётся с неё', en: '`8` - the bound 8 is not less than 60, so it is the answer' },
        { ru: '`-1` - на дубликатах бинарный поиск внутри отрезка теряется', en: '`-1` - on duplicates the binary search inside gets lost' },
      ],
      correct: 1,
      explanation: {
        ru: 'Граница проходит 1, 2, 4 (50 < 60) и останавливается на 8 (80). Отрезок `[4, 8]`, середина - индекс 6, там 60, ответ 6. Первое вхождение, 5, внутри отрезка есть, но бинарный поиск возвращает то, куда попал. Прыжковый поиск здесь дал бы 5.',
        en: 'The bound passes 1, 2, 4 (50 < 60) and stops at 8 (80). The stretch is `[4, 8]`, its middle is index 6, which holds 60, so the answer is 6. The first occurrence, 5, is inside the stretch, but binary search returns wherever it lands. Jump search would give 5 here.',
      },
      hint: {
        ru: 'Смотрите восьмой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the eighth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Массив из 10^6 чисел. Сколько сравнений сделают экспоненциальный и бинарный поиск для искомого на позиции 10 и на позиции 999 999?',
        en: 'An array of 10^6 numbers. How many comparisons do exponential and binary search make for a target at position 10 and at position 999,999?',
      },
      options: [
        { ru: '9 и 40 у экспоненциального, 18 и 20 у бинарного по всему массиву', en: '9 and 40 for exponential, 18 and 20 for binary over the whole array' },
        { ru: 'Около 20 оба раза у обоих: O(log n) не зависит от позиции искомого', en: 'About 20 both times for both: O(log n) does not depend on the position' },
        { ru: '4 и 20 у экспоненциального, 20 и 20 у бинарного поиска', en: '4 and 20 for exponential, 20 and 20 for binary search' },
        { ru: '9 и 20 у экспоненциального: в конце он равен бинарному', en: '9 and 20 for exponential: at the end it equals binary search' },
      ],
      correct: 0,
      explanation: {
        ru: 'Прогон: позиция 10 - 9 сравнений против 18, позиция 999 999 - 40 против 20. Экспоненциальный тратит около 2 log₂ i: удвоения плюс бинарный на отрезке длиной до i. В начале он выигрывает, в конце вдвое проигрывает; равенство - около позиции 500, примерно √n.',
        en: 'A run: position 10 takes 9 comparisons against 18, position 999,999 takes 40 against 20. Exponential search spends about 2 log₂ i: the doublings plus binary search on a stretch of up to i. Near the start it wins, near the end it loses by a factor of two; they break even around position 500, roughly √n.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fourth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Код перенесли на Java с `int bound` и ищут последний элемент массива из 1.5 млрд байт. Что произойдёт?',
        en: 'The code was ported to Java with `int bound`, searching for the last element of an array of 1.5 billion bytes. What happens?',
      },
      options: [
        { ru: 'Найдёт за 62 сравнения: в Java массив не длиннее 2^31 - 1', en: 'It finds it in 62 comparisons: a Java array is at most 2^31 - 1' },
        { ru: 'Граница 2^30 удвоится в -2^31, и чтение упадёт с исключением', en: 'The bound 2^30 doubles to -2^31, and the read throws an exception' },
        { ru: 'Компилятор откажется собирать: `bound * 2` не влезает в `int`', en: 'The compiler refuses to build it: `bound * 2` does not fit an `int`' },
        { ru: 'Java сама перейдёт на `long`, и поиск просто станет медленнее', en: 'Java switches to `long` by itself, and the search just gets slower' },
      ],
      correct: 1,
      explanation: {
        ru: 'При n больше 2^30 граница 2^30 ещё меньше n, и `bound *= 2` даёт -2147483648. Проверка `bound < n` проходит, и `arr[bound]` падает с `ArrayIndexOutOfBoundsException` - так и случилось в прогоне на Java 24; на миллиарде элементов поиск нашёл ответ. В OpenJDK TimSort после удвоения стоит проверка `if (ofs <= 0) // int overflow`.',
        en: 'With n above 2^30 the bound 2^30 is still less than n, and `bound *= 2` gives -2147483648. The check `bound < n` passes, and `arr[bound]` throws `ArrayIndexOutOfBoundsException` - that is what happened in a run on Java 24; on a billion elements the search found the answer. OpenJDK TimSort has a check `if (ofs <= 0) // int overflow` after doubling.',
      },
      hint: {
        ru: 'Смотрите седьмой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the seventh paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Есть монотонная функция `f(k)`, длина последовательности неизвестна, нужно найти первое k, где `f(k)` не меньше порога. Что выбрать?',
        en: 'There is a monotonic function `f(k)`, the length of the sequence is unknown, and you need the first k where `f(k)` is at least a threshold. What do you choose?',
      },
      options: [
        { ru: 'Бинарный поиск: он всегда быстрее, достаточно взять большой `hi`', en: 'Binary search: it is always faster, just pick a large `hi`' },
        { ru: 'Прыжковый поиск: шаг √n не зависит от длины последовательности', en: 'Jump search: the √n step does not depend on the sequence length' },
        { ru: 'Интерполяционный: функция монотонна, значит, её значения равномерны', en: 'Interpolation search: the function is monotonic, so its values are even' },
        { ru: 'Удвоение границы до порога, затем бинарный поиск: длина не нужна', en: 'Double the bound past the threshold, then binary search: no n needed' },
      ],
      correct: 3,
      explanation: {
        ru: 'Это задача неограниченного поиска Бентли и Яо: правой границы нет, и удвоение её находит за около log₂ k шагов, а бинарный поиск доводит дело. «Большой `hi`» - догадка, которая может оказаться мала; шаг √n требует знать n; монотонность не значит равномерность.',
        en: 'This is the unbounded search problem of Bentley and Yao: there is no right bound, doubling finds one in about log₂ k steps, and binary search finishes the job. A "large `hi`" is a guess that may turn out too small; a √n step needs n; monotonic does not mean evenly spread.',
      },
      hint: {
        ru: 'Смотрите пункт «Длина неизвестна» раздела «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "The length is unknown" item of the "Choice nuances" section on the "Intent" tab.',
      },
    },
  ],
};

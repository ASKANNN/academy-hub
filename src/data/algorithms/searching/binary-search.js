export const binarySearch = {
  slug: 'binary-search',
  category: 'searching',
  name: { ru: 'Binary Search', en: 'Binary Search' },
  complexity: {
    time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['divide-and-conquer', 'sorted-input', 'random-access'],

  intent: {
    ru: 'Бинарный поиск ищет значение в отсортированном массиве: сравнивает искомое с серединой и отбрасывает ту половину, где его быть не может. Каждое сравнение вдвое сужает диапазон, поэтому в миллионе элементов хватает 20 проверок середины, а линейному поиску может понадобиться миллион. Цена - массив должен быть отсортирован, и к любому элементу нужен доступ по индексу.',
    en: 'Binary search looks for a value in a sorted array: it compares the target with the middle and throws away the half where the target cannot be. Every comparison halves the range, so in a million elements 20 checks of the middle are enough, where linear search may need a million. The price is that the array must be sorted, and every element must be reachable by index.',
  },

  problem: {
    ru: 'Линейный поиск тратит одно сравнение на один элемент и ничего не узнаёт о соседях. В отсортированном массиве это расточительно: если элемент на позиции k меньше искомого, то и всё левее него тоже меньше, и проверять эти элементы незачем. А когда по одним и тем же данным ищут много раз, каждый линейный поиск снова проходит до n элементов.',
    en: 'Linear search spends one comparison on one element and learns nothing about its neighbours. In a sorted array that is wasteful: if the element at position k is less than the target, everything to its left is less too, and there is no point in checking those elements. And when the same data is searched many times, every linear search walks up to n elements again.',
  },

  solution: {
    ru: 'Границы `lo` и `hi` отмечают диапазон, где искомое ещё может быть, сначала это весь массив. Берём середину `mid` и сравниваем: совпало - ответ найден. Середина меньше искомого - всё левее неё тоже меньше, и диапазон сжимается до правой половины (`lo = mid + 1`). Больше - до левой (`hi = mid - 1`). Когда `lo` обгоняет `hi`, кандидатов не осталось, и ответ `-1`. Вариант **lower bound** не останавливается на совпадении, а ищет первую позицию, где элемент не меньше искомого: это и **первое вхождение** среди дубликатов, и место, куда искомое можно вставить, не нарушив порядок.',
    en: 'The bounds `lo` and `hi` mark the range where the target can still be; at first that is the whole array. Take the middle `mid` and compare: a match - the answer is found. The middle is less than the target - everything to its left is less too, and the range shrinks to the right half (`lo = mid + 1`). Greater - to the left half (`hi = mid - 1`). When `lo` overtakes `hi`, no candidates are left, and the answer is `-1`. The **lower bound** variant does not stop on a match but looks for the first position where the element is not less than the target: that is both the **first occurrence** among duplicates and the place where the target can be inserted without breaking the order.',
  },

  steps: [
    {
      title: { ru: 'Весь массив - диапазон поиска', en: 'The whole array is the search range' },
      explanation: {
        ru: 'Массив отсортирован, поэтому если искомое в нём есть, оно лежит между `lo = 0` и `hi = n - 1`. Дальше этот диапазон будет только сужаться.',
        en: 'The array is sorted, so if the target is in it, it lies between `lo = 0` and `hi = n - 1`. From here on this range only shrinks.',
      },
    },
    {
      title: { ru: 'Сравнить с серединой', en: 'Compare with the middle' },
      explanation: {
        ru: 'Середина диапазона (подсвечена) сравнивается с искомым. Одно сравнение говорит не только про этот элемент: по порядку в массиве понятно, в какой половине искать дальше.',
        en: 'The middle of the range (highlighted) is compared with the target. One comparison says more than this element: thanks to the order of the array, it tells which half to search next.',
      },
    },
    {
      title: { ru: 'Отбросить половину', en: 'Discard half' },
      explanation: {
        ru: 'Середина меньше искомого - она и всё левее неё отброшены, `lo = mid + 1`. Больше - отброшены она и всё правее, `hi = mid - 1`. Отброшенная часть остаётся пустым контуром, диапазон стал вдвое меньше.',
        en: 'The middle is less than the target - it and everything to its left are discarded, `lo = mid + 1`. Greater - it and everything to its right are discarded, `hi = mid - 1`. The discarded part is left as an empty outline, and the range is half as large.',
      },
    },
    {
      title: { ru: 'Совпало - вернуть индекс', en: 'A match - return the index' },
      explanation: {
        ru: 'Середина равна искомому - поиск заканчивается и возвращает `mid`. Если таких значений несколько, это не обязательно первое из них: найдено то, на которое попала середина.',
        en: 'The middle equals the target - the search ends and returns `mid`. If there are several such values, this is not necessarily the first of them: it is the one the middle happened to land on.',
      },
    },
    {
      title: { ru: 'Диапазон пуст - вернуть -1', en: 'The range is empty - return -1' },
      explanation: {
        ru: '`lo` обогнал `hi`, кандидатов не осталось, и ответ `-1`. Для 11 элементов это случается не позже чем через 4 сравнения с серединой - отсутствие доказано без просмотра всего массива.',
        en: '`lo` has overtaken `hi`, no candidates are left, and the answer is `-1`. For 11 elements this happens after at most 4 comparisons with the middle - absence is proven without looking at the whole array.',
      },
    },
  ],

  implementation: {
    javascript: `function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

function lowerBound(arr, target) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}`,
    python: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


def lower_bound(arr, target):
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`binarySearch` принимает отсортированный по возрастанию массив `arr` и искомое значение `target` и вернёт индекс совпадения или `-1`. Проверять, отсортирован ли массив, функция не будет: это было бы O(n) и съело бы весь выигрыш.',
          en: '`binarySearch` takes an array `arr` sorted in ascending order and a target value `target` and returns the index of a match, or `-1`. The function does not check whether the array is sorted: that would be O(n) and would eat up the whole gain.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Границы диапазона', en: 'The bounds of the range' },
        explanation: {
          ru: '`lo` и `hi` - первый и последний индекс, где искомое ещё может быть, обе границы включены. На этом держится вся функция: если `target` есть в массиве, он лежит в `arr[lo..hi]`. Такое утверждение, верное перед каждым шагом цикла, называют **инвариантом цикла**.',
          en: '`lo` and `hi` are the first and last index where the target can still be; both bounds are included. The whole function rests on this: if `target` is in the array, it lies in `arr[lo..hi]`. A statement like this, true before every step of the loop, is called a **loop invariant**.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Пока диапазон не пуст', en: 'While the range is not empty' },
        explanation: {
          ru: 'При включённых границах диапазон из одного элемента - это `lo === hi`, и его тоже нужно проверить, поэтому условие `lo <= hi`, а не `lo < hi`. С `lo < hi` функция не нашла бы `7` в массиве `[7]`: цикл не выполнился бы ни разу.',
          en: 'With both bounds included, a range of one element is `lo === hi`, and it has to be checked too, so the condition is `lo <= hi`, not `lo < hi`. With `lo < hi` the function would not find `7` in the array `[7]`: the loop would not run even once.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Середина без переполнения', en: 'The middle without overflow' },
        explanation: {
          ru: 'Середина считается как `lo` плюс половина длины диапазона. В JS проще написать `Math.floor((lo + hi) / 2)`, как на странице O(log n) в разделе Big O, и это тоже верно: числа в JS не переполняются на таких размерах. Но в Java и C сумма `lo + hi` может переполнить `int` - это баг, который нашёл Джошуа Блох, разбор в разделе «Как это работает». Эта запись безопасна в любом языке.',
          en: 'The middle is computed as `lo` plus half the length of the range. In JS it is simpler to write `Math.floor((lo + hi) / 2)`, as the O(log n) page in the Big O section does, and that is correct too: numbers in JS do not overflow at these sizes. But in Java and C the sum `lo + hi` can overflow an `int` - the bug Joshua Bloch found, discussed in the "How it works" section. This form is safe in any language.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Совпало', en: 'A match' },
        explanation: {
          ru: 'Середина равна искомому - функция сразу возвращает `mid`. Это лучший случай, O(1), если искомое попало в середину с первого раза. Среди дубликатов вернётся тот, на который попала середина: в `[1, 3, 3, 3, 5]` поиск `3` даёт `2`, а не `1`.',
          en: 'The middle equals the target - the function returns `mid` at once. This is the best case, O(1), when the target is hit by the very first middle. Among duplicates it returns whichever one the middle landed on: in `[1, 3, 3, 3, 5]` a search for `3` gives `2`, not `1`.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Сдвинуть границу за середину', en: 'Moving a bound past the middle' },
        explanation: {
          ru: 'Середина меньше искомого - сама она уже проверена и не подошла, поэтому `lo = mid + 1`, а не `lo = mid`. Иначе диапазон из двух элементов мог бы не сужаться: в `[1, 3]` поиск `3` с `lo = mid` зацикливается, середина всё время `0`. По той же причине в другой ветке `hi = mid - 1`.',
          en: 'The middle is less than the target - it has already been checked and did not match, so `lo = mid + 1`, not `lo = mid`. Otherwise a two-element range might never shrink: in `[1, 3]` a search for `3` with `lo = mid` loops forever, the middle stays `0`. For the same reason the other branch sets `hi = mid - 1`.',
        },
      },
      {
        lines: [9, 11],
        title: { ru: 'Диапазон пуст', en: 'The range is empty' },
        explanation: {
          ru: 'Цикл закончился, когда `lo` стал больше `hi`: по инварианту искомого нет нигде. Каждый шаг уменьшал диапазон хотя бы вдвое, поэтому шагов не больше ⌊log₂ n⌋ + 1 - для миллиона элементов это 20.',
          en: 'The loop ended when `lo` became greater than `hi`: by the invariant the target is nowhere. Every step at least halved the range, so there are at most ⌊log₂ n⌋ + 1 steps - 20 for a million elements.',
        },
      },
      {
        lines: [13],
        title: { ru: 'Lower bound', en: 'Lower bound' },
        explanation: {
          ru: '`lowerBound` отвечает на другой вопрос: какая первая позиция, куда можно вставить `target`, не нарушив порядок. Это индекс первого элемента, который не меньше `target`, или `arr.length`, если таких нет. Так же работают `bisect_left` в Python и `std::lower_bound` в C++.',
          en: '`lowerBound` answers a different question: what is the first position where `target` can be inserted without breaking the order. That is the index of the first element not less than `target`, or `arr.length` if there is none. Python\'s `bisect_left` and C++\'s `std::lower_bound` work the same way.',
        },
      },
      {
        lines: [14, 15],
        title: { ru: 'Полуоткрытый диапазон', en: 'A half-open range' },
        explanation: {
          ru: 'Здесь `hi = arr.length`, а не `arr.length - 1`: правая граница не включена, и ответ ищется среди позиций от `0` до `n`. Позиция `n` - законный ответ: вставить в самый конец. Инвариант теперь другой: всё левее `lo` меньше `target`, всё начиная с `hi` - не меньше.',
          en: 'Here `hi = arr.length`, not `arr.length - 1`: the right bound is excluded, and the answer is sought among the positions `0` to `n`. Position `n` is a legitimate answer: insert at the very end. The invariant is different now: everything left of `lo` is less than `target`, everything from `hi` on is not less.',
        },
      },
      {
        lines: [16, 17],
        title: { ru: 'Пока позиции не сошлись', en: 'Until the positions meet' },
        explanation: {
          ru: 'Цикл идёт, пока `lo < hi`: когда границы сойдутся, неизвестных позиций не останется. Середина та же, что в `binarySearch`. Сравнения на равенство в цикле нет, поэтому `lowerBound` всегда делает около log₂ n шагов, даже если середина сразу попала на `target`.',
          en: 'The loop runs while `lo < hi`: once the bounds meet, no unknown positions remain. The middle is the same as in `binarySearch`. There is no equality test in the loop, so `lowerBound` always takes about log₂ n steps, even if the middle hits `target` at once.',
        },
      },
      {
        lines: [18, 19],
        title: { ru: 'Сдвиг без потери ответа', en: 'Moving without losing the answer' },
        explanation: {
          ru: 'Середина меньше `target` - она точно не ответ, и `lo = mid + 1`. Иначе `arr[mid]` не меньше `target`, и `mid` сам может оказаться ответом, поэтому `hi = mid`, а не `mid - 1`. Зацикливания нет: `mid` всегда меньше `hi`, и диапазон сужается на каждом шаге.',
          en: 'The middle is less than `target` - it is certainly not the answer, and `lo = mid + 1`. Otherwise `arr[mid]` is not less than `target`, and `mid` itself may be the answer, so `hi = mid`, not `mid - 1`. There is no infinite loop: `mid` is always less than `hi`, and the range shrinks on every step.',
        },
      },
      {
        lines: [20, 22],
        title: { ru: 'Ответ - место встречи', en: 'The answer is where they meet' },
        explanation: {
          ru: 'Границы сошлись, и `lo` - искомая позиция. В `[1, 3, 3, 3, 5]` для `3` это `1`, первое вхождение. Чтобы узнать, есть ли `target` в массиве, остаётся одна проверка: `lo < arr.length && arr[lo] === target`.',
          en: 'The bounds have met, and `lo` is the position sought. In `[1, 3, 3, 3, 5]` for `3` it is `1`, the first occurrence. To find out whether `target` is in the array, one check remains: `lo < arr.length && arr[lo] === target`.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`binary_search` принимает отсортированный по возрастанию список `arr` и искомое `target` и вернёт индекс совпадения или `-1`. Порядок списка функция не проверяет: это стоило бы O(n).',
          en: '`binary_search` takes a list `arr` sorted in ascending order and a target `target` and returns the index of a match, or `-1`. The function does not check the order of the list: that would cost O(n).',
        },
      },
      {
        lines: [2],
        title: { ru: 'Границы диапазона', en: 'The bounds of the range' },
        explanation: {
          ru: '`lo` и `hi` - первый и последний индекс, где искомое ещё может быть, обе границы включены. **Инвариант цикла**: если `target` есть в списке, он лежит в `arr[lo..hi]`.',
          en: '`lo` and `hi` are the first and last index where the target can still be; both bounds are included. The **loop invariant**: if `target` is in the list, it lies in `arr[lo..hi]`.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Пока диапазон не пуст', en: 'While the range is not empty' },
        explanation: {
          ru: 'Диапазон из одного элемента - это `lo == hi`, его тоже нужно проверить, поэтому `lo <= hi`. С `lo < hi` поиск `7` в `[7]` вернул бы `-1`.',
          en: 'A one-element range is `lo == hi`, and it has to be checked too, hence `lo <= hi`. With `lo < hi` a search for `7` in `[7]` would return `-1`.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Середина', en: 'The middle' },
        explanation: {
          ru: 'Целые числа в Python не переполняются, поэтому `(lo + hi) // 2` тоже верно - так и написано в `Lib/bisect.py`. Запись `lo + (hi - lo) // 2` оставлена такой же, как в JS-версии: она безопасна и там, где `int` ограничен.',
          en: 'Integers in Python do not overflow, so `(lo + hi) // 2` is correct too - that is exactly what `Lib/bisect.py` writes. The form `lo + (hi - lo) // 2` is kept the same as in the JS version: it is safe even where `int` is bounded.',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Совпало', en: 'A match' },
        explanation: {
          ru: 'Середина равна искомому - функция сразу возвращает `mid`, это лучший случай O(1). Среди дубликатов вернётся тот, на который попала середина, не обязательно первый.',
          en: 'The middle equals the target - the function returns `mid` at once; this is the best case, O(1). Among duplicates it returns whichever one the middle landed on, not necessarily the first.',
        },
      },
      {
        lines: [7, 10],
        title: { ru: 'Сдвинуть границу за середину', en: 'Moving a bound past the middle' },
        explanation: {
          ru: 'Середина уже проверена и не подошла, поэтому граница сдвигается за неё: `lo = mid + 1` или `hi = mid - 1`. С `lo = mid` диапазон из двух элементов мог бы не сужаться никогда.',
          en: 'The middle has been checked and did not match, so the bound moves past it: `lo = mid + 1` or `hi = mid - 1`. With `lo = mid` a two-element range might never shrink.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Диапазон пуст', en: 'The range is empty' },
        explanation: {
          ru: '`lo` обогнал `hi` - по инварианту искомого нет, ответ `-1`. Шагов было не больше ⌊log₂ n⌋ + 1.',
          en: '`lo` has overtaken `hi` - by the invariant the target is absent, and the answer is `-1`. There were at most ⌊log₂ n⌋ + 1 steps.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Lower bound', en: 'Lower bound' },
        explanation: {
          ru: '`lower_bound` возвращает первую позицию, куда можно вставить `target`, не нарушив порядок, - индекс первого элемента не меньше `target` или `len(arr)`. Это ровно `bisect.bisect_left` из стандартной библиотеки.',
          en: '`lower_bound` returns the first position where `target` can be inserted without breaking the order - the index of the first element not less than `target`, or `len(arr)`. This is exactly `bisect.bisect_left` from the standard library.',
        },
      },
      {
        lines: [15],
        title: { ru: 'Полуоткрытый диапазон', en: 'A half-open range' },
        explanation: {
          ru: '`hi = len(arr)`: правая граница не включена, ответ - одна из позиций от `0` до `n`, и `n` значит «в самый конец». Инвариант: всё левее `lo` меньше `target`, всё начиная с `hi` - не меньше. Так же его формулирует документация `bisect`.',
          en: '`hi = len(arr)`: the right bound is excluded, the answer is one of the positions `0` to `n`, and `n` means "at the very end". The invariant: everything left of `lo` is less than `target`, everything from `hi` on is not less. The `bisect` documentation states it the same way.',
        },
      },
      {
        lines: [16, 17],
        title: { ru: 'Пока позиции не сошлись', en: 'Until the positions meet' },
        explanation: {
          ru: 'Цикл идёт, пока `lo < hi`. Проверки на равенство нет, поэтому `lower_bound` всегда делает около log₂ n шагов.',
          en: 'The loop runs while `lo < hi`. There is no equality test, so `lower_bound` always takes about log₂ n steps.',
        },
      },
      {
        lines: [18, 21],
        title: { ru: 'Сдвиг без потери ответа', en: 'Moving without losing the answer' },
        explanation: {
          ru: 'Середина меньше `target` - она не ответ, `lo = mid + 1`. Иначе `mid` сам может быть ответом, поэтому `hi = mid`. `mid` всегда меньше `hi`, так что диапазон сужается на каждом шаге.',
          en: 'The middle is less than `target` - it is not the answer, `lo = mid + 1`. Otherwise `mid` itself may be the answer, so `hi = mid`. `mid` is always less than `hi`, so the range shrinks on every step.',
        },
      },
      {
        lines: [22],
        title: { ru: 'Ответ - место встречи', en: 'The answer is where they meet' },
        explanation: {
          ru: 'Границы сошлись, `lo` - ответ: для `3` в `[1, 3, 3, 3, 5]` это `1`, как и у `bisect_left`. Есть ли `target` в списке, решает одна проверка: `lo < len(arr) and arr[lo] == target`.',
          en: 'The bounds have met, and `lo` is the answer: for `3` in `[1, 3, 3, 3, 5]` it is `1`, as with `bisect_left`. Whether `target` is in the list is settled by one check: `lo < len(arr) and arr[lo] == target`.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'O(log n) сравнений: 20 проверок середины на миллион элементов, 30 - на миллиард. Удвоение массива добавляет всего один шаг.',
      en: 'O(log n) comparisons: 20 checks of the middle for a million elements, 30 for a billion. Doubling the array adds just one step.',
    },
    {
      ru: 'O(1) дополнительной памяти в итеративной версии и никакой подготовки, кроме уже отсортированного массива.',
      en: 'O(1) extra memory in the iterative version and no preparation beyond an already sorted array.',
    },
    {
      ru: 'Отвечает не только «есть ли», но и «где было бы»: lower bound даёт место вставки, первое вхождение и границы диапазона значений.',
      en: 'Answers not only "is it there" but also "where would it go": lower bound gives the insertion point, the first occurrence, and the bounds of a range of values.',
    },
  ],
  cons: [
    {
      ru: 'Работает только на отсортированных данных, а на несортированных молча даёт неверный ответ: ошибки не будет, будет `-1` для значения, которое есть.',
      en: 'Works only on sorted data, and on unsorted data it silently gives a wrong answer: there is no error, just `-1` for a value that is present.',
    },
    {
      ru: 'Нужен доступ по индексу за O(1): в связном списке путь до середины сам стоит O(n).',
      en: 'Needs O(1) access by index: in a linked list getting to the middle costs O(n) by itself.',
    },
    {
      ru: 'Легко ошибиться на единицу: `lo <= hi` против `lo < hi`, `mid + 1` против `mid` - неверная граница даёт пропуск элемента или вечный цикл.',
      en: 'Easy to get off by one: `lo <= hi` versus `lo < hi`, `mid + 1` versus `mid` - a wrong bound means a missed element or an infinite loop.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда по одним и тем же отсортированным данным ищут много раз: сортировка O(n log n) делается один раз, а каждый поиск потом стоит O(log n).',
      en: 'When the same sorted data is searched many times: the O(n log n) sort is done once, and every search afterwards costs O(log n).',
    },
    {
      ru: 'Когда нужен не только ответ «есть или нет», но и место: куда вставить, сколько значений меньше заданного, где начинается и кончается диапазон.',
      en: 'When what is needed is not just "there or not" but a position: where to insert, how many values are less than a given one, where a range starts and ends.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Модуль bisect в Python** - `bisect_left` и `bisect_right` возвращают место вставки слева или справа от равных элементов, а `insort` вставляет с сохранением порядка. Документация называет модуль по алгоритму деления пополам (bisection) и отмечает, что O(log n) поиска в `insort` тонет в O(n) самой вставки.',
      en: '**The bisect module in Python** - `bisect_left` and `bisect_right` return the insertion point to the left or to the right of equal elements, and `insort` inserts while keeping the order. The documentation names the module after the bisection algorithm and notes that the O(log n) search in `insort` is dominated by the O(n) insertion itself.',
    },
    {
      ru: '**git bisect** - бинарный поиск по истории коммитов: отмечаешь один коммит «хорошим», другой «плохим», и git предлагает коммит посередине, пока не останется тот, что внёс ошибку. В примере из документации на 675 оставшихся ревизий git обещает примерно 10 шагов.',
      en: '**git bisect** - binary search over the commit history: you mark one commit "good" and another "bad", and git offers a commit in between until only the one that introduced the bug is left. In the documentation\'s example git promises roughly 10 steps for 675 remaining revisions.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Главное отличие от линейного поиска** - что даёт одно сравнение. У **Linear Search** оно исключает один элемент, у бинарного - половину диапазона. После k сравнений остаётся не больше n / 2^k кандидатов, поэтому шагов не больше ⌊log₂ n⌋ + 1: **4** для 11 элементов, **20** для миллиона, а линейному поиску в худшем случае нужно 11 и миллион. Страница **O(log n) - Логарифмическая Сложность** в разделе Big O разбирает, почему логарифм растёт так медленно; здесь речь о самом алгоритме - его границах, вариантах и ловушках.',
        en: '**The main difference from linear search** is what one comparison buys. In **Linear Search** it rules out one element, in binary search half the range. After k comparisons at most n / 2^k candidates remain, so there are at most ⌊log₂ n⌋ + 1 steps: **4** for 11 elements, **20** for a million, while linear search needs 11 and a million in the worst case. The **O(log n) - Logarithmic Time** page in the Big O section explains why the logarithm grows so slowly; this page is about the algorithm itself - its bounds, variants, and traps.',
      },
      {
        ru: 'Корректность держится на **инварианте**: если искомое есть, оно в `arr[lo..hi]`. Кнут формулирует его прямо в шаге B2 своего Algorithm B, а из него следуют все «плюс-минус единицы». Середина проверена и не подошла - значит, её можно исключить: `lo = mid + 1`, `hi = mid - 1`. Границы включены - значит, диапазон из одного элемента ещё не пуст: `lo <= hi`. Проверка запуском: с `lo = mid` поиск `3` в `[1, 3]` зацикливается, с `lo < hi` поиск `7` в `[7]` даёт `-1`.',
        en: 'Correctness rests on an **invariant**: if the target is present, it is in `arr[lo..hi]`. Knuth states it directly in step B2 of his Algorithm B, and every "plus or minus one" follows from it. The middle was checked and did not match - so it can be excluded: `lo = mid + 1`, `hi = mid - 1`. The bounds are inclusive - so a one-element range is not yet empty: `lo <= hi`. Checked by running: with `lo = mid` a search for `3` in `[1, 3]` loops forever, with `lo < hi` a search for `7` in `[7]` gives `-1`.',
      },
      {
        ru: 'Идея старая, а аккуратная версия - нет. По **Кнуту** (т. 3, §6.2.1), бинарный поиск впервые упомянул **Джон Мокли** в 1946 году, в лекциях Moore School. Потом метод стал общеизвестным, но, как пишет Кнут, никто не продумал, что делать, когда n не равно 2^k - 1. Первым алгоритм для любого n опубликовал **Деррик Лемер** в 1960 году. В 1962 году **Герман Боттенбрух** предложил вариант, который откладывает проверку на равенство до самого конца и среди дубликатов находит самый правый. Кнут там же предупреждает: детали удивительно коварны, и многие хорошие программисты ошибались в первых попытках.',
        en: 'The idea is old; a careful version is not. According to **Knuth** (vol. 3, §6.2.1), binary search was first mentioned by **John Mauchly** in 1946, in the Moore School lectures. The method then became well known, but, as Knuth writes, nobody worked out what to do when n is not 2^k - 1. The first algorithm for any n was published by **Derrick Lehmer** in 1960. In 1962 **Hermann Bottenbruch** proposed a variant that postpones the equality test to the very end and finds the rightmost of several duplicates. Knuth warns in the same place that the details are surprisingly tricky and many good programmers got it wrong in their first attempts.',
      },
      {
        ru: 'Самый известный баг нашёлся позже. 2 июня 2006 года **Джошуа Блох** написал в блоге Google Research, что `java.util.Arrays.binarySearch`, которую он сам написал для JDK, содержит строку `int mid = (low + high) / 2;`. На массивах от 2^30 элементов сумма переполняет `int`, становится отрицательной, и Java выбрасывает `ArrayIndexOutOfBoundsException`. Ошибка пролежала в JDK около девяти лет, а в доказанной версии из «Programming Pearls» Бентли - около двадцати. Исправления по Блоху: `low + ((high - low) / 2)` или `(low + high) >>> 1`. Проверка на Java 24: для `1 500 000 000` и `1 600 000 000` первая запись даёт `-597483648`, исправленные - `1550000000`.',
        en: 'The best-known bug was found later. On 2 June 2006 **Joshua Bloch** wrote on the Google Research blog that `java.util.Arrays.binarySearch`, which he himself had written for the JDK, contained the line `int mid = (low + high) / 2;`. For arrays of 2^30 elements or more the sum overflows `int`, turns negative, and Java throws `ArrayIndexOutOfBoundsException`. The bug lay in the JDK for about nine years, and in the proven version from Bentley\'s "Programming Pearls" for about twenty. Bloch\'s fixes: `low + ((high - low) / 2)` or `(low + high) >>> 1`. Checked on Java 24: for `1 500 000 000` and `1 600 000 000` the first form gives `-597483648`, the fixed ones `1550000000`.',
      },
      {
        ru: 'В JS этот баг так не проявляется. Числа в JS - 64-битные с плавающей точкой, целые в них точны до 2^53, а длина массива не больше 2^32 - 1 (`new Array(2 ** 32)` выбрасывает `RangeError`). Поэтому `Math.floor((lo + hi) / 2)` со страницы O(log n) верна для любого массива. Ловушка в другом: побитовые операции приводят число к 32 битам. Проверка запуском: при `lo = 2 ** 31 - 10` и `hi = 2 ** 31 + 10` и `(lo + hi) >> 1`, и даже явский рецепт `(lo + hi) >>> 1` дают `0`. В Python целые не ограничены, и `Lib/bisect.py` спокойно пишет `(lo + hi) // 2`.',
        en: 'In JS this bug does not show up the same way. Numbers in JS are 64-bit floating point, integers in them are exact up to 2^53, and an array is at most 2^32 - 1 long (`new Array(2 ** 32)` throws a `RangeError`). So `Math.floor((lo + hi) / 2)` from the O(log n) page is correct for any array. The trap is elsewhere: bitwise operators convert the number to 32 bits. Checked by running: with `lo = 2 ** 31 - 10` and `hi = 2 ** 31 + 10`, both `(lo + hi) >> 1` and even the Java recipe `(lo + hi) >>> 1` give `0`. In Python integers are unbounded, and `Lib/bisect.py` simply writes `(lo + hi) // 2`.',
      },
      {
        ru: 'Среди дубликатов `binarySearch` возвращает тот, на который попала середина: в `[1, 3, 3, 3, 5]` это `2`, а не первое вхождение `1`. Когда важно, какой именно, нужны **lower bound** и **upper bound**: первая позиция, где элемент не меньше искомого, и первая, где он больше. Для `3` это `1` и `4`, и их разность `3` - число вхождений. Последнее вхождение - upper bound минус один. В Python это `bisect_left` и `bisect_right`, в C++ - `std::lower_bound` и `std::upper_bound`, а `std::binary_search` возвращает только `bool`, и cppreference советует брать `lower_bound`, если нужна позиция.',
        en: 'Among duplicates `binarySearch` returns whichever one the middle landed on: in `[1, 3, 3, 3, 5]` that is `2`, not the first occurrence `1`. When it matters which one, you need **lower bound** and **upper bound**: the first position where the element is not less than the target, and the first where it is greater. For `3` they are `1` and `4`, and their difference `3` is the number of occurrences. The last occurrence is upper bound minus one. In Python these are `bisect_left` and `bisect_right`, in C++ `std::lower_bound` and `std::upper_bound`, while `std::binary_search` returns only a `bool`, and cppreference advises taking `lower_bound` if a position is needed.',
      },
      {
        ru: 'Требование **отсортированности** не проверяется и не прощается. `binarySearch([5, 1, 4, 2, 3], 1)` возвращает `-1`, хотя `1` в массиве есть: отбрасывание половины опирается на порядок, которого нет. Документация Java прямо пишет, что на несортированном массиве результат не определён. А сортировка ради поиска стоит O(n log n): для одного поиска это дороже, чем n сравнений линейного, и окупается только тогда, когда поисков много.',
        en: 'The **sortedness** requirement is neither checked nor forgiven. `binarySearch([5, 1, 4, 2, 3], 1)` returns `-1` although `1` is in the array: discarding half relies on an order that is not there. The Java documentation says outright that on an unsorted array the results are undefined. And sorting for the sake of searching costs O(n log n): for one search that is more than the n comparisons of linear search, and it pays off only when there are many searches.',
      },
    ],
    whenToUse: [
      {
        ru: '**Много поисков по неизменным данным** - один раз отсортировать за O(n log n), дальше каждый поиск O(log n). Тысяча поисков в миллионе элементов - около 20 тысяч проверок середины вместо до миллиарда сравнений линейного поиска.',
        en: '**Many searches over unchanging data** - sort once in O(n log n), then every search is O(log n). A thousand searches in a million elements come to about 20 thousand checks of the middle instead of up to a billion comparisons with linear search.',
      },
      {
        ru: '**Нужен порядок, а не только равенство** - `Set` и `Map` отвечают «есть или нет» в среднем за O(1), но не скажут, какое значение ближайшее, сколько значений меньше заданного или где начинается диапазон. Lower и upper bound отвечают на это за O(log n).',
        en: '**Order is needed, not just equality** - `Set` and `Map` answer "there or not" in O(1) on average, but they will not tell which value is nearest, how many values are less than a given one, or where a range starts. Lower and upper bound answer this in O(log n).',
      },
      {
        ru: '**Один поиск в несортированных данных** - бинарный поиск проигрывает: сортировка стоит дороже, чем один проход **Linear Search**.',
        en: '**A single search in unsorted data** - binary search loses: sorting costs more than one pass of **Linear Search**.',
      },
      {
        ru: '**Нет доступа по индексу** - в связном списке или потоке дойти до середины стоит O(n), и выигрыш пропадает. Нужен массив или структура с доступом к элементу за O(1).',
        en: '**No access by index** - in a linked list or a stream reaching the middle costs O(n), and the gain disappears. An array is needed, or a structure with O(1) access to an element.',
      },
      {
        ru: '**Частые вставки** - найти место в отсортированном массиве быстро, но вставка сдвигает хвост за O(n). Если данные постоянно меняются, лучше сбалансированное дерево поиска, где и поиск, и вставка O(log n).',
        en: '**Frequent insertions** - finding the place in a sorted array is fast, but inserting shifts the tail in O(n). If the data keeps changing, a balanced search tree is better, where both search and insertion are O(log n).',
      },
    ],
    realWorld: [
      {
        ru: '**Donald Knuth, «The Art of Computer Programming», т. 3, §6.2.1 «Searching an Ordered Table»** - Algorithm B с границами l и u, инвариант в шаге B2 и история: Мокли (1946), Лемер (1960), Боттенбрух (1962). Сверено по первому изданию 1973 года, страницы 410 и 422.',
        en: '**Donald Knuth, "The Art of Computer Programming", vol. 3, §6.2.1 "Searching an Ordered Table"** - Algorithm B with bounds l and u, the invariant in step B2, and the history: Mauchly (1946), Lehmer (1960), Bottenbruch (1962). Checked against the first edition of 1973, pages 410 and 422.',
      },
      {
        ru: '**Jon Bentley, «Programming Pearls»** - глава о бинарном поиске, где Бентли рассказывает, что дал эту задачу профессиональным программистам на курсах и при нескольких часах на работу правильно её решили лишь около десяти процентов. Блох пишет, что в доказанной Бентли версии из этой книги и сидел баг переполнения.',
        en: '**Jon Bentley, "Programming Pearls"** - the chapter on binary search, where Bentley tells how he gave this task to professional programmers in his courses and, with several hours to work, only about ten percent got it right. Bloch writes that the overflow bug sat in the version Bentley proved correct in this book.',
      },
      {
        ru: '**Joshua Bloch, «Extra, Extra - Read All About It: Nearly All Binary Searches and Mergesorts are Broken»** - пост в блоге Google Research от 2 июня 2006 года про переполнение `(low + high) / 2` в `java.util.Arrays.binarySearch` и про исправления для Java и C.',
        en: '**Joshua Bloch, "Extra, Extra - Read All About It: Nearly All Binary Searches and Mergesorts are Broken"** - a Google Research blog post of 2 June 2006 on the `(low + high) / 2` overflow in `java.util.Arrays.binarySearch` and on the fixes for Java and C.',
      },
      {
        ru: '**Java, Arrays.binarySearch** - при промахе возвращает `-(insertion point) - 1`, где insertion point - индекс первого элемента больше ключа. Поэтому ответ не меньше нуля тогда и только тогда, когда ключ найден, а среди дубликатов документация не обещает, какой найдётся. Проверено: для `{1, 3, 5, 7}` поиск `4` даёт `-3`.',
        en: '**Java, Arrays.binarySearch** - on a miss it returns `-(insertion point) - 1`, where the insertion point is the index of the first element greater than the key. So the result is non-negative if and only if the key is found, and among duplicates the documentation does not promise which one is found. Checked: for `{1, 3, 5, 7}` a search for `4` gives `-3`.',
      },
      {
        ru: '**C++, std::lower_bound и std::binary_search** - по cppreference, `lower_bound` возвращает первый элемент, который не упорядочен раньше значения, и делает не больше log₂(N) + O(1) сравнений. Диапазону достаточно быть разбитым относительно значения, полная сортировка не обязательна.',
        en: '**C++, std::lower_bound and std::binary_search** - according to cppreference, `lower_bound` returns the first element that is not ordered before the value and makes at most log₂(N) + O(1) comparisons. The range only has to be partitioned with respect to the value; full sorting is not required.',
      },
    ],
  },

  relatedAlgorithms: ['linear-search', 'jump-search'],

  quiz: [
    {
      question: {
        ru: 'Сколько раз `binarySearch` сравнит искомое с серединой в отсортированном массиве из миллиона элементов в худшем случае?',
        en: 'How many times does `binarySearch` compare the target with the middle in a sorted array of a million elements in the worst case?',
      },
      options: [
        { ru: 'Миллион раз, как и линейный поиск, если значения нет', en: 'A million times, like linear search, if the value is absent' },
        { ru: 'Около тысячи раз - это квадратный корень из миллиона', en: 'About a thousand times - the square root of a million' },
        { ru: '20 раз: каждое сравнение вдвое сужает диапазон поиска', en: '20 times: every comparison halves the remaining range' },
        { ru: 'Полмиллиона раз, потому что смотрится только половина', en: 'Half a million times, since only half is looked at' },
      ],
      correct: 2,
      explanation: {
        ru: 'После k сравнений остаётся не больше n / 2^k кандидатов, поэтому шагов не больше ⌊log₂ n⌋ + 1. Для миллиона это 20, что подтверждает и прогон кода.',
        en: 'After k comparisons at most n / 2^k candidates remain, so there are at most ⌊log₂ n⌋ + 1 steps. For a million that is 20, which a run of the code confirms.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the first paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что бинарный поиск требует от массива?',
        en: 'What does binary search require of the array?',
      },
      options: [
        { ru: 'Чтобы длина массива была степенью двойки минус один', en: 'That the array length be a power of two minus one' },
        { ru: 'Чтобы массив был отсортирован по возрастанию', en: 'That the array be sorted in ascending order' },
        { ru: 'Чтобы все значения в массиве были уникальными', en: 'That all the values in the array be unique' },
        { ru: 'Ничего - подойдёт любая последовательность', en: 'Nothing: any sequence at all will do as is' },
      ],
      correct: 1,
      explanation: {
        ru: 'Отбросить половину можно только потому, что всё левее середины не больше её, а всё правее - не меньше. Длина 2^k - 1 была ограничением ранних версий до Лемера, а дубликаты допустимы, только неизвестно, какой из них найдётся.',
        en: 'Half can be discarded only because everything left of the middle is not greater than it and everything right of it is not less. Length 2^k - 1 was a limitation of early versions before Lehmer, and duplicates are allowed; it is just unknown which of them will be found.',
      },
      hint: {
        ru: 'Смотрите шаг «Весь массив - диапазон поиска» на вкладке «Визуализация».',
        en: 'See the "The whole array is the search range" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'В `binarySearch` оказалось `arr[mid] < target`. Что происходит дальше?',
        en: 'In `binarySearch` it turns out that `arr[mid] < target`. What happens next?',
      },
      options: [
        { ru: '`hi = mid - 1`: искомое должно лежать левее середины', en: '`hi = mid - 1`: the target must lie to the left of the middle' },
        { ru: '`lo = mid + 1`: середина и всё левее неё отброшены', en: '`lo = mid + 1`: the middle and all left of it are dropped' },
        { ru: 'Функция возвращает `-1`, ведь середина не совпала', en: 'The function returns `-1`, as the middle did not match' },
        { ru: '`lo = mid`: середина остаётся в диапазоне поиска', en: '`lo = mid`: the middle stays in the search range' },
      ],
      correct: 1,
      explanation: {
        ru: 'Массив отсортирован, поэтому всё левее середины тоже меньше искомого. Сама середина проверена, так что новая левая граница - `mid + 1`.',
        en: 'The array is sorted, so everything left of the middle is less than the target too. The middle itself has been checked, so the new left bound is `mid + 1`.',
      },
      hint: {
        ru: 'Смотрите шаг «Отбросить половину» на вкладке «Визуализация».',
        en: 'See the "Discard half" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Что сломается, если в `binarySearch` заменить `lo = mid + 1` на `lo = mid`?',
        en: 'What breaks if `lo = mid + 1` in `binarySearch` is replaced with `lo = mid`?',
      },
      options: [
        { ru: 'Ничего, функция просто сделает на одну итерацию больше', en: 'Nothing, the function will just make one more iteration' },
        { ru: 'Функция начнёт возвращать последнее вхождение, а не середину', en: 'The function will start returning the last occurrence instead' },
        { ru: 'Диапазон из двух элементов не сузится, и цикл зависнет', en: 'A two-element range stops shrinking, and the loop hangs' },
        { ru: 'Сумма `lo + hi` переполнится уже на маленьких массивах', en: 'The sum `lo + hi` will overflow even on small arrays' },
      ],
      correct: 2,
      explanation: {
        ru: 'При `lo = 0`, `hi = 1` середина `0`. Если `arr[0] < target`, то `lo` снова `0`, и всё повторяется. Проверено: поиск `3` в `[1, 3]` с `lo = mid` не заканчивается.',
        en: 'With `lo = 0` and `hi = 1` the middle is `0`. If `arr[0] < target`, `lo` is `0` again, and everything repeats. Checked: a search for `3` in `[1, 3]` with `lo = mid` never ends.',
      },
      hint: {
        ru: 'Смотрите шаг «Сдвинуть границу за середину» на вкладке «Реализация».',
        en: 'See the "Moving a bound past the middle" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернут `binarySearch([1, 3, 3, 3, 5], 3)` и `lowerBound([1, 3, 3, 3, 5], 3)`?',
        en: 'What do `binarySearch([1, 3, 3, 3, 5], 3)` and `lowerBound([1, 3, 3, 3, 5], 3)` return?',
      },
      options: [
        { ru: '`1` и `1`: обе функции находят самое первое вхождение тройки', en: '`1` and `1`: both functions find the very first occurrence of 3' },
        { ru: '`2` и `1`: первая попадает в середину, вторая - в начало', en: '`2` and `1`: one lands on the middle, the other on the start' },
        { ru: '`3` и `4`: обе функции находят последнее вхождение', en: '`3` and `4`: both functions find the last occurrence' },
        { ru: '`2` и `4`: вторая возвращает место после всех троек', en: '`2` and `4`: the second returns the place after all the 3s' },
      ],
      correct: 1,
      explanation: {
        ru: 'Первая же середина - индекс `2`, и там `3`, поэтому `binarySearch` сразу возвращает `2`. `lowerBound` не останавливается на совпадении и сужает диапазон до первой позиции, где элемент не меньше `3`, - это `1`. Место после всех троек, `4`, вернул бы upper bound.',
        en: 'The very first middle is index `2`, which holds `3`, so `binarySearch` returns `2` at once. `lowerBound` does not stop on a match and narrows down to the first position where the element is not less than `3` - that is `1`. The place after all the 3s, `4`, is what upper bound would return.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the sixth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему в `lowerBound` ветка «иначе» пишет `hi = mid`, а не `hi = mid - 1`?',
        en: 'Why does the "else" branch in `lowerBound` set `hi = mid` rather than `hi = mid - 1`?',
      },
      options: [
        { ru: '`arr[mid]` не меньше `target`, и `mid` сам может быть ответом', en: '`arr[mid]` is not less than `target`, so `mid` may be the answer' },
        { ru: 'Так короче, а с `mid - 1` результат получился бы тем же', en: 'It is shorter, and `mid - 1` would give the same result' },
        { ru: 'С `hi = mid - 1` сумма `lo + hi` могла бы стать отрицательной', en: 'With `hi = mid - 1` the sum `lo + hi` could turn negative' },
        { ru: 'Правая граница включена, поэтому её нельзя сдвигать за `mid`', en: 'The right bound is inclusive, so it must never be moved past `mid`' },
      ],
      correct: 0,
      explanation: {
        ru: 'Ищется первая позиция, где элемент не меньше `target`. Если `arr[mid]` уже такой, ответ - `mid` или левее, и выбросить `mid` нельзя. Правая граница здесь как раз не включена, и зацикливания нет, потому что `mid` всегда меньше `hi`.',
        en: 'What is sought is the first position whose element is not less than `target`. If `arr[mid]` is already like that, the answer is `mid` or further left, and `mid` must not be thrown away. The right bound here is in fact excluded, and there is no infinite loop because `mid` is always less than `hi`.',
      },
      hint: {
        ru: 'Смотрите шаг «Сдвиг без потери ответа» на вкладке «Реализация».',
        en: 'See the "Moving without losing the answer" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Строка `int mid = (low + high) / 2;` ломала `Arrays.binarySearch` в Java. Почему `Math.floor((lo + hi) / 2)` в JS безопасна?',
        en: 'The line `int mid = (low + high) / 2;` broke `Arrays.binarySearch` in Java. Why is `Math.floor((lo + hi) / 2)` safe in JS?',
      },
      options: [
        { ru: 'JS проверяет переполнение и при нём выбрасывает `RangeError`', en: 'JS checks for overflow and throws a `RangeError` when it happens' },
        { ru: 'Движок сам переводит большие суммы индексов в `BigInt`', en: 'The engine turns large index sums into `BigInt` by itself' },
        { ru: 'Числа в JS точны до 2^53, а длина массива меньше 2^32', en: 'JS numbers are exact up to 2^53, and arrays are under 2^32 long' },
        { ru: 'Массивы в JS не бывают длиннее 2^30, как и в Java', en: 'Arrays in JS are never longer than 2^30, just as in Java' },
      ],
      correct: 2,
      explanation: {
        ru: 'Сумма двух индексов не больше 2^33, а 64-битное число с плавающей точкой хранит целые точно до 2^53. Переполнения нет. Опасны только побитовые операции: `(lo + hi) >> 1` и `>>> 1` приводят число к 32 битам.',
        en: 'The sum of two indices is at most 2^33, and a 64-bit floating-point number stores integers exactly up to 2^53. There is no overflow. Only bitwise operators are dangerous: `(lo + hi) >> 1` and `>>> 1` convert the number to 32 bits.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fifth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'По несортированному массиву из миллиона чисел нужно сделать один поиск. Что выгоднее?',
        en: 'A single search has to be made in an unsorted array of a million numbers. What pays off better?',
      },
      options: [
        { ru: 'Отсортировать и искать бинарным: поиск займёт всего 20 шагов', en: 'Sort it and use binary search: the search takes just 20 steps' },
        { ru: 'Сразу искать бинарным: порядок для одного поиска не важен', en: 'Use binary search at once: order does not matter for one search' },
        { ru: 'Один линейный поиск: это не больше миллиона сравнений', en: 'One linear search: at most a million comparisons in all' },
        { ru: 'Сложить числа в `Set`: проверка в нём займёт O(1)', en: 'Put the numbers into a `Set`: checking it takes O(1)' },
      ],
      correct: 2,
      explanation: {
        ru: 'Сортировка стоит порядка n log₂ n - около 20 миллионов сравнений, больше, чем весь линейный поиск. Построение `Set` - тот же проход по всем элементам плюс память. Бинарный поиск без сортировки молча ошибается.',
        en: 'Sorting costs on the order of n log₂ n - about 20 million comparisons, more than the whole linear search. Building a `Set` is the same pass over every element plus memory. Binary search without sorting fails silently.',
      },
      hint: {
        ru: 'Смотрите пункт «Один поиск в несортированных данных» раздела «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "A single search in unsorted data" item of the "Choice nuances" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'В отсортированном массиве из миллиона чисел нужно быстро узнать, сколько раз встречается значение x. Как?',
        en: 'In a sorted array of a million numbers you need to find quickly how many times the value x occurs. How?',
      },
      options: [
        { ru: 'Найти x бинарным поиском и считать соседей влево и вправо от него', en: 'Find x with binary search and count neighbours left and right' },
        { ru: 'Upper bound минус lower bound: два поиска по O(log n) каждый', en: 'Upper bound minus lower bound: two searches of O(log n) each' },
        { ru: 'Один бинарный поиск: он сразу возвращает число вхождений', en: 'One binary search: it returns the count of occurrences at once' },
        { ru: 'Пройти массив линейно: бинарный поиск дубликаты не видит', en: 'Walk the array linearly: binary search cannot see duplicates' },
      ],
      correct: 1,
      explanation: {
        ru: 'Lower bound - первая позиция, где элемент не меньше x, upper bound - первая, где больше. Между ними ровно все вхождения x. Подсчёт соседей тоже даёт ответ, но если x занимает половину массива, это O(n).',
        en: 'Lower bound is the first position whose element is not less than x, upper bound the first where it is greater. Exactly all the occurrences of x lie between them. Counting neighbours also gives the answer, but if x fills half the array, that is O(n).',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the sixth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернёт в Java `Arrays.binarySearch(new int[]{1, 3, 5, 7}, 4)`?',
        en: 'What does `Arrays.binarySearch(new int[]{1, 3, 5, 7}, 4)` return in Java?',
      },
      options: [
        { ru: '`-1`, как и любой поиск, не нашедший значения в массиве', en: '`-1`, like any search that does not find the value' },
        { ru: '`2` - индекс, куда значение `4` можно было бы вставить', en: '`2` - the index where the value `4` could be inserted' },
        { ru: '`-3`: место вставки `2`, закодированное как `-(2) - 1`', en: '`-3`: the insertion point `2`, encoded as `-(2) - 1`' },
        { ru: '`-2`: место вставки, взятое со знаком минус', en: '`-2`: the insertion point taken with a minus sign' },
      ],
      correct: 2,
      explanation: {
        ru: 'Первый элемент больше `4` - `5` на индексе `2`, это место вставки. Java возвращает `-(insertion point) - 1`, то есть `-3`. Минус единица нужна, чтобы место вставки `0` не дало `0`, неотличимый от найденного индекса. Проверено на Java 24.',
        en: 'The first element greater than `4` is `5` at index `2`; that is the insertion point. Java returns `-(insertion point) - 1`, that is `-3`. The minus one is there so that insertion point `0` does not give `0`, indistinguishable from a found index. Checked on Java 24.',
      },
      hint: {
        ru: 'Смотрите четвёртый пункт раздела «Примеры в коде» на вкладке «Суть».',
        en: 'See the fourth item of the "In code" section on the "Intent" tab.',
      },
    },
  ],
};

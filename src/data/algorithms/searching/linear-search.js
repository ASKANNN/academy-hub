export const linearSearch = {
  slug: 'linear-search',
  category: 'searching',
  name: { ru: 'Linear Search', en: 'Linear Search' },
  complexity: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['sequential', 'unsorted-input', 'no-preprocessing'],

  intent: {
    ru: 'Линейный поиск проверяет элементы по очереди, с первого, пока не найдёт нужный или не дойдёт до конца. Он ничего не требует от данных: массив может быть не отсортирован, а элементы могут приходить по одному, как из потока или связного списка. Цена этой простоты - в худшем случае приходится посмотреть все n элементов.',
    en: 'Linear search checks the elements one by one, starting with the first, until it finds the one it wants or reaches the end. It asks nothing of the data: the array may be unsorted, and the elements may arrive one at a time, as from a stream or a linked list. The price of this simplicity is that in the worst case all n elements have to be looked at.',
  },

  problem: {
    ru: 'Быстрые способы поиска опираются на подготовку данных: бинарному поиску нужен отсортированный массив, хеш-таблице - заранее построенный индекс. Если данные не упорядочены, приходят потоком или искать нужно один раз, такая подготовка стоит дороже самого поиска. Нужен способ, который работает с любой последовательностью как она есть.',
    en: 'Fast ways of searching rely on preparing the data: binary search needs a sorted array, a hash table needs an index built in advance. If the data is unordered, arrives as a stream, or has to be searched only once, that preparation costs more than the search itself. What is needed is a way that works with any sequence as it is.',
  },

  solution: {
    ru: 'Идём по массиву слева направо и сравниваем каждый элемент с искомым. Совпало - возвращаем индекс, и это **первое вхождение**. Дошли до конца без совпадения - возвращаем `-1`. В обычном цикле на каждом шаге две проверки: не кончился ли массив и не тот ли это элемент. Вариант с **барьером** (sentinel) кладёт искомое значение в конец массива, и цикл гарантированно остановится на нём, поэтому проверка границы внутри цикла больше не нужна.',
    en: 'Walk the array from left to right and compare each element with the target. A match - return the index, and that is the **first occurrence**. The end reached with no match - return `-1`. A plain loop makes two checks on every step: has the array ended, and is this the element. The **sentinel** variant puts the target value at the end of the array, so the loop is certain to stop on it, and the bounds check inside the loop is no longer needed.',
  },

  steps: [
    {
      title: { ru: 'Начать с первого элемента', en: 'Start at the first element' },
      explanation: {
        ru: 'Под подозрением весь массив: искомое число может стоять где угодно, порядка в данных нет.',
        en: 'The whole array is under suspicion: the target can be anywhere, and the data has no order.',
      },
    },
    {
      title: { ru: 'Сравнить с искомым', en: 'Compare with the target' },
      explanation: {
        ru: 'Текущий элемент (подсвечен) сравнивается с искомым числом. Одна проверка - один элемент, никакой информации о соседях она не даёт.',
        en: 'The current element (highlighted) is compared with the target. One check covers one element and says nothing about its neighbours.',
      },
    },
    {
      title: { ru: 'Не совпало - шаг вправо', en: 'No match - step right' },
      explanation: {
        ru: 'Проверенный элемент больше не нужен и остаётся пустым контуром. Остаток массива справа по-прежнему под подозрением целиком.',
        en: 'The checked element is no longer needed and is left as an empty outline. The rest of the array to the right is still entirely under suspicion.',
      },
    },
    {
      title: { ru: 'Совпало - вернуть индекс', en: 'A match - return the index' },
      explanation: {
        ru: 'Элемент совпал с искомым - поиск заканчивается и возвращает его индекс. Если таких значений несколько, это первое из них.',
        en: 'The element matches the target - the search ends and returns its index. If there are several such values, this is the first of them.',
      },
    },
    {
      title: { ru: 'Дошли до конца - вернуть -1', en: 'Reached the end - return -1' },
      explanation: {
        ru: 'Совпадений нет, и проверены все n элементов. Отсутствие элемента всегда стоит полного прохода: доказать, что числа нет, можно, только посмотрев каждый элемент.',
        en: 'There is no match, and all n elements have been checked. A missing element always costs a full pass: the only way to prove a number is absent is to look at every element.',
      },
    },
  ],

  implementation: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

function linearSearchSentinel(arr, target) {
  if (Number.isNaN(target)) return -1;
  const n = arr.length;
  arr.push(target);
  let i = 0;
  while (arr[i] !== target) {
    i++;
  }
  arr.pop();
  return i < n ? i : -1;
}`,
    python: `def linear_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i
    return -1


def linear_search_sentinel(arr, target):
    if target != target:
        return -1
    n = len(arr)
    arr.append(target)
    i = 0
    while arr[i] != target:
        i += 1
    arr.pop()
    return i if i < n else -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`linearSearch` принимает массив `arr` и искомое значение `target` и вернёт индекс первого совпадения или `-1`. Массив функция не меняет.',
          en: '`linearSearch` takes an array `arr` and a target value `target` and returns the index of the first match, or `-1`. The function does not change the array.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Проход слева направо', en: 'A left-to-right pass' },
        explanation: {
          ru: 'Цикл перебирает индексы от `0` до последнего. Условие `i < arr.length` - первая из двух проверок на каждом шаге: не вышли ли за конец массива.',
          en: 'The loop goes through the indices from `0` to the last one. The condition `i < arr.length` is the first of two checks on every step: have we gone past the end of the array.',
        },
      },
      {
        lines: [3, 5],
        title: { ru: 'Сравнение и ранний выход', en: 'The comparison and the early exit' },
        explanation: {
          ru: 'Вторая проверка - `arr[i] === target`. Совпало - функция сразу возвращает `i`, остальные элементы не смотрит. Поэтому лучший случай - один шаг, если искомое стоит первым, а возвращается всегда первое вхождение. `===` - строгое равенство, поэтому `NaN` так не найти: `NaN === NaN` в JS ложно.',
          en: 'The second check is `arr[i] === target`. A match - the function returns `i` at once and does not look at the remaining elements. So the best case is one step, when the target comes first, and it is always the first occurrence that is returned. `===` is strict equality, so `NaN` cannot be found this way: `NaN === NaN` is false in JS.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Не нашли', en: 'Not found' },
        explanation: {
          ru: 'Цикл закончился без совпадения - значит, проверены все n элементов, и функция возвращает `-1`, как встроенный `indexOf`. Это худший случай: отсутствующее значение всегда стоит полного прохода.',
          en: 'The loop ended with no match - so all n elements were checked, and the function returns `-1`, as the built-in `indexOf` does. This is the worst case: a missing value always costs a full pass.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Вариант с барьером', en: 'The sentinel variant' },
        explanation: {
          ru: '`linearSearchSentinel` делает ту же работу, но избавляется от проверки границы внутри цикла. Этот приём описан у Кнута в «Искусстве программирования» (т. 3, §6.1, Algorithm Q). Платой будет временная правка массива.',
          en: '`linearSearchSentinel` does the same work but gets rid of the bounds check inside the loop. Knuth describes this trick in "The Art of Computer Programming" (vol. 3, §6.1, Algorithm Q). The price is a temporary change to the array.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Защита от NaN', en: 'Guarding against NaN' },
        explanation: {
          ru: 'Барьер работает, только если искомое значение равно самому себе. `NaN !== NaN`, поэтому цикл ниже прошёл бы мимо барьера и не остановился бы никогда. `NaN` в массиве этой функцией всё равно не найти, так что ответ `-1` сразу честен.',
          en: 'The sentinel works only if the target equals itself. `NaN !== NaN`, so the loop below would run past the sentinel and never stop. This function cannot find `NaN` in the array anyway, so answering `-1` at once is honest.',
        },
      },
      {
        lines: [12, 13],
        title: { ru: 'Поставить барьер', en: 'Placing the sentinel' },
        explanation: {
          ru: 'Сначала запоминаем настоящую длину `n`, потом дописываем искомое значение в конец массива. Теперь совпадение в массиве есть всегда - хотя бы на последнем месте.',
          en: 'First the real length `n` is remembered, then the target value is appended to the end of the array. Now there is always a match in the array - at the very least in the last place.',
        },
      },
      {
        lines: [14, 17],
        title: { ru: 'Одна проверка на шаг', en: 'One check per step' },
        explanation: {
          ru: 'Цикл проверяет только `arr[i] !== target` - условия про длину массива нет. Выйти за конец он не может: в крайнем случае остановится на барьере. На каждом шаге одной проверкой меньше, чем в обычном цикле.',
          en: 'The loop checks only `arr[i] !== target` - there is no condition on the array length. It cannot run past the end: at worst it stops on the sentinel. Every step makes one check fewer than the plain loop.',
        },
      },
      {
        lines: [18, 20],
        title: { ru: 'Убрать барьер и решить', en: 'Removing the sentinel and deciding' },
        explanation: {
          ru: '`pop()` возвращает массиву прежний вид. Если цикл остановился раньше `n` - это настоящее совпадение, иначе он дошёл до барьера, и ответ `-1`. Пока барьер стоит, массив изменён, поэтому так нельзя искать в замороженном массиве или в том, который в это же время читает другой код.',
          en: '`pop()` puts the array back the way it was. If the loop stopped before `n`, that is a real match; otherwise it reached the sentinel, and the answer is `-1`. While the sentinel is in place the array is changed, so this cannot be used on a frozen array or on one that other code is reading at the same time.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`linear_search` принимает список `arr` и искомое значение `target` и вернёт индекс первого совпадения или `-1`. Встроенный `list.index` в такой ситуации не возвращает `-1`, а выбрасывает `ValueError`.',
          en: '`linear_search` takes a list `arr` and a target value `target` and returns the index of the first match, or `-1`. The built-in `list.index` does not return `-1` in this situation but raises `ValueError`.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Проход с индексами', en: 'A pass with indices' },
        explanation: {
          ru: '`enumerate(arr)` выдаёт пары «индекс, значение» по порядку. Проверку границы делает сам цикл `for`: он закончится, когда элементы кончатся.',
          en: '`enumerate(arr)` yields "index, value" pairs in order. The `for` loop does the bounds check itself: it ends when the elements run out.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Сравнение и ранний выход', en: 'The comparison and the early exit' },
        explanation: {
          ru: 'Совпало (`value == target`) - функция сразу возвращает индекс, остальные элементы не смотрит. Лучший случай - один шаг, и возвращается всегда первое вхождение.',
          en: 'A match (`value == target`) - the function returns the index at once and does not look at the remaining elements. The best case is one step, and it is always the first occurrence that is returned.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Не нашли', en: 'Not found' },
        explanation: {
          ru: 'Цикл закончился без совпадения - проверены все n элементов, ответ `-1`. Это худший случай.',
          en: 'The loop ended with no match - all n elements were checked, and the answer is `-1`. This is the worst case.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Вариант с барьером', en: 'The sentinel variant' },
        explanation: {
          ru: '`linear_search_sentinel` - тот же приём из Кнута (т. 3, §6.1, Algorithm Q): искомое значение ставится в конец списка, и проверка границы в цикле больше не нужна.',
          en: '`linear_search_sentinel` is the same trick from Knuth (vol. 3, §6.1, Algorithm Q): the target value is placed at the end of the list, and the loop no longer needs a bounds check.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Защита от NaN', en: 'Guarding against NaN' },
        explanation: {
          ru: '`target != target` верно только для NaN. Без этой строки цикл прошёл бы мимо барьера: `!=` для чисел с плавающей точкой не смотрит, тот ли это объект, и `nan != nan` даёт `True`. В Python это кончилось бы `IndexError` за концом списка.',
          en: '`target != target` is true only for NaN. Without this line the loop would run past the sentinel: `!=` on floats does not check whether it is the same object, and `nan != nan` gives `True`. In Python that would end in an `IndexError` past the end of the list.',
        },
      },
      {
        lines: [11, 12],
        title: { ru: 'Поставить барьер', en: 'Placing the sentinel' },
        explanation: {
          ru: 'Запоминаем настоящую длину `n` и дописываем искомое значение в конец списка. Теперь совпадение есть всегда.',
          en: 'The real length `n` is remembered, and the target value is appended to the end of the list. Now there is always a match.',
        },
      },
      {
        lines: [13, 15],
        title: { ru: 'Одна проверка на шаг', en: 'One check per step' },
        explanation: {
          ru: 'Цикл `while` проверяет только `arr[i] != target`, без условия на длину: в крайнем случае он остановится на барьере.',
          en: 'The `while` loop checks only `arr[i] != target`, with no length condition: at worst it stops on the sentinel.',
        },
      },
      {
        lines: [16, 17],
        title: { ru: 'Убрать барьер и решить', en: 'Removing the sentinel and deciding' },
        explanation: {
          ru: '`pop()` возвращает список к прежнему виду. Остановились раньше `n` - настоящее совпадение, иначе дошли до барьера, и ответ `-1`. Пока барьер стоит, список изменён, поэтому со списком, который одновременно читает другой поток, так делать нельзя.',
          en: '`pop()` puts the list back the way it was. Stopped before `n` - a real match; otherwise we reached the sentinel, and the answer is `-1`. While the sentinel is in place the list is changed, so this must not be done to a list another thread is reading at the same time.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Ничего не требует от данных: порядок, индекс и подготовка не нужны, работает и с несортированным массивом, и с потоком, и со связным списком.',
      en: 'Asks nothing of the data: no order, no index, no preparation; it works with an unsorted array, a stream, and a linked list alike.',
    },
    {
      ru: 'O(1) дополнительной памяти и несколько строк кода, в которых трудно ошибиться.',
      en: 'O(1) extra memory and a few lines of code that are hard to get wrong.',
    },
    {
      ru: 'Находит первое вхождение и останавливается сразу: если искомое близко к началу, работы почти нет.',
      en: 'Finds the first occurrence and stops at once: if the target is near the start, there is almost no work.',
    },
  ],
  cons: [
    {
      ru: 'O(n) в среднем и худшем случае: в массиве из миллиона элементов поиск может потребовать миллион сравнений.',
      en: 'O(n) on average and in the worst case: in an array of a million elements a search may take a million comparisons.',
    },
    {
      ru: 'Отсутствующий элемент всегда стоит полного прохода - раньше конца доказать отсутствие нельзя.',
      en: 'A missing element always costs a full pass - absence cannot be proven before the end.',
    },
    {
      ru: 'Не учится на повторных поисках: тысяча поисков - тысяча проходов, тогда как отсортированный массив или хеш-таблица окупают подготовку.',
      en: 'It learns nothing from repeated searches: a thousand searches mean a thousand passes, whereas a sorted array or a hash table repays its preparation.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные не отсортированы, а искать нужно один или несколько раз: сортировка ради одного поиска стоит O(n log n), а сам поиск - n сравнений.',
      en: 'When the data is unsorted and has to be searched once or a few times: sorting for one search costs O(n log n), while the search itself is n comparisons.',
    },
    {
      ru: 'Когда к элементам нельзя обратиться по индексу - поток, связный список, генератор - или когда массив маленький.',
      en: 'When the elements cannot be reached by index - a stream, a linked list, a generator - or when the array is small.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Методы массива в JavaScript** - `indexOf`, `includes` и `find` идут по элементам по порядку. `indexOf` сравнивает строгим равенством и `NaN` не находит, а `includes` использует сравнение SameValueZero, где `NaN` равен себе: `[1, 2, NaN].indexOf(NaN)` даёт `-1`, а `includes(NaN)` - `true`.',
      en: '**JavaScript array methods** - `indexOf`, `includes`, and `find` walk the elements in order. `indexOf` compares with strict equality and does not find `NaN`, while `includes` uses the SameValueZero comparison, where `NaN` equals itself: `[1, 2, NaN].indexOf(NaN)` gives `-1`, and `includes(NaN)` gives `true`.',
    },
    {
      ru: '**Поиск в списках Python** - оператор `in` и метод `list.index` в CPython - простые циклы в `Objects/listobject.c` (`list_contains`, `list_index_impl`). Если значения нет, `list.index` выбрасывает `ValueError`, а не возвращает `-1`.',
      en: '**Searching Python lists** - the `in` operator and the `list.index` method are plain loops in CPython, in `Objects/listobject.c` (`list_contains`, `list_index_impl`). If the value is missing, `list.index` raises `ValueError` rather than returning `-1`.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Линейный поиск** - точка отсчёта для всех остальных алгоритмов поиска: он смотрит элементы по очереди и ничего не знает о данных заранее. Лучший случай - **одно сравнение**, если искомое стоит первым. Худший - **n сравнений**, если оно последнее или его нет. Если каждый элемент ищут одинаково часто, удачный поиск в среднем стоит `(n + 1) / 2` сравнений: для массива из 9 элементов это ровно 5.',
        en: '**Linear search** is the reference point for every other search algorithm: it looks at the elements in turn and knows nothing about the data in advance. The best case is **one comparison**, when the target comes first. The worst is **n comparisons**, when it is last or absent. If every element is searched for equally often, a successful search costs `(n + 1) / 2` comparisons on average: for an array of 9 elements that is exactly 5.',
      },
      {
        ru: 'В обычном цикле на каждом шаге **две проверки**: `i < arr.length` и `arr[i] === target`. **Кнут** в третьем томе «Искусства программирования» (§6.1) описывает приём, который убирает первую: **барьер** (sentinel, Algorithm Q). Искомое значение ставят в конец массива, и цикл гарантированно на нём остановится. После цикла остаётся одна проверка: остановились на настоящем элементе или на барьере.',
        en: 'A plain loop makes **two checks** on every step: `i < arr.length` and `arr[i] === target`. **Knuth**, in the third volume of "The Art of Computer Programming" (§6.1), describes a trick that removes the first one: the **sentinel** (Algorithm Q). The target value is placed at the end of the array, and the loop is certain to stop on it. After the loop one check remains: did it stop on a real element or on the sentinel.',
      },
      {
        ru: 'У барьера две цены. Первая - массив на время **меняется**: так нельзя искать в замороженном массиве, в данных, которые одновременно читает другой код, или там, где в конец просто нечего дописать. Вторая - барьер работает, только если искомое **равно самому себе**. Для `NaN` это неверно: в JS цикл без защиты не останавливается (проверка с ограничителем дошла до миллиона шагов), а в Python падает с `IndexError` за концом списка. Поэтому в примере стоит отдельная проверка на NaN.',
        en: 'The sentinel has two prices. First, the array is **changed** for a while: this cannot be used on a frozen array, on data other code is reading at the same time, or where there is simply nothing to append to. Second, the sentinel works only if the target **equals itself**. For `NaN` this is false: in JS the unguarded loop does not stop (a check with a cap ran to a million steps), and in Python it fails with an `IndexError` past the end of the list. That is why the example has a separate NaN check.',
      },
      {
        ru: 'Если массив **отсортирован**, линейный поиск может бросить работу раньше: как только текущий элемент больше искомого, дальше его быть не может. У Кнута это отдельный вариант для упорядоченной таблицы (Algorithm T). Отсутствующий элемент находится быстрее, но в худшем случае это всё равно **O(n)**. Порядок можно использовать гораздо сильнее - каждое сравнение отбрасывает половину массива, и это уже бинарный поиск.',
        en: 'If the array is **sorted**, linear search can give up early: once the current element exceeds the target, the target cannot be further on. Knuth has a separate variant for an ordered table (Algorithm T). A missing element is detected sooner, but the worst case is still **O(n)**. Order can be exploited far more strongly - every comparison throws away half the array, and that is already binary search.',
      },
      {
        ru: 'Когда одни элементы ищут гораздо чаще других, их выгодно держать ближе к началу. **Самоорганизующиеся списки** делают это сами: найденный элемент переносят в начало (move-to-front) или меняют местами с предыдущим (transpose). Порядок подстраивается под реальные запросы, и частые поиски становятся короткими, хотя худший случай остаётся O(n).',
        en: 'When some elements are searched for far more often than others, it pays to keep them near the start. **Self-organizing lists** do this themselves: the element found is moved to the front (move-to-front) or swapped with its predecessor (transpose). The order adapts to the real queries, and frequent searches become short, though the worst case stays O(n).',
      },
      {
        ru: 'Встроенные функции поиска в языках - тоже линейный поиск, но с разным понятием равенства. В JS `indexOf` сравнивает строгим равенством, а `includes` - через **SameValueZero**, поэтому `[1, 2, NaN].indexOf(NaN)` даёт `-1`, а `includes(NaN)` - `true`. В CPython оператор `in` перед сравнением проверяет, **тот же ли это объект**: `nan in [nan]` даёт `True`, а `float(\'nan\') in [nan]` - `False`, потому что это другой объект NaN.',
        en: 'The built-in search functions in languages are linear search too, but with different notions of equality. In JS `indexOf` compares with strict equality, while `includes` uses **SameValueZero**, so `[1, 2, NaN].indexOf(NaN)` gives `-1` and `includes(NaN)` gives `true`. In CPython the `in` operator first checks whether it is **the same object**: `nan in [nan]` gives `True`, while `float(\'nan\') in [nan]` gives `False`, because that is a different NaN object.',
      },
      {
        ru: 'Страница **O(n) - Линейная Сложность** в разделе Big O использует ту же функцию как пример класса сложности; здесь речь о самом алгоритме - его вариантах и ловушках. Линейный поиск проигрывает, когда искать приходится **много раз**: тогда один раз отсортировать массив и искать бинарным поиском или построить `Set`/`Map` выгоднее, чем каждый раз проходить всё. Но для одного поиска в несортированных данных подготовка дороже самого поиска, и линейный поиск остаётся лучшим выбором.',
        en: 'The **O(n) - Linear Time** page in the Big O section uses the same function as an example of a complexity class; this page is about the algorithm itself - its variants and traps. Linear search loses when the data has to be searched **many times**: then sorting the array once and searching it with binary search, or building a `Set`/`Map`, beats walking everything every time. But for a single search in unsorted data the preparation costs more than the search, and linear search stays the best choice.',
      },
    ],
    whenToUse: [
      {
        ru: '**Один поиск в несортированных данных** - сортировка ради одного поиска стоит O(n log n), а сам линейный поиск - не больше n сравнений. Подготовка не окупится.',
        en: '**A single search in unsorted data** - sorting for one search costs O(n log n), while linear search itself is at most n comparisons. The preparation will not pay off.',
      },
      {
        ru: '**Нет доступа по индексу** - в связном списке, потоке или генераторе к середине не прыгнуть, поэтому бинарный поиск невозможен, а линейный работает как есть.',
        en: '**No access by index** - in a linked list, a stream, or a generator there is no jumping to the middle, so binary search is impossible, while linear search works as it is.',
      },
      {
        ru: '**Много поисков** - если по одним данным ищут снова и снова, лучше один раз отсортировать и искать бинарным поиском или сложить значения в `Set`/`Map` и проверять за O(1) в среднем.',
        en: '**Many searches** - if the same data is searched again and again, it is better to sort once and use binary search, or to put the values into a `Set`/`Map` and check in O(1) on average.',
      },
      {
        ru: '**Неравные вероятности** - если часть элементов ищут гораздо чаще, их ставят в начало, вручную или самоорганизующимся списком (move-to-front, transpose).',
        en: '**Unequal probabilities** - if some elements are searched for far more often, they are put at the front, by hand or with a self-organizing list (move-to-front, transpose).',
      },
      {
        ru: '**Барьер - только где можно менять массив** - вариант с барьером требует временной записи в конец и значения, равного самому себе. Замороженные и общие массивы и поиск NaN ему не подходят.',
        en: '**A sentinel only where the array may change** - the sentinel variant needs a temporary write at the end and a value equal to itself. Frozen and shared arrays and searching for NaN do not suit it.',
      },
    ],
    realWorld: [
      {
        ru: '**Donald Knuth, «The Art of Computer Programming», т. 3 «Sorting and Searching», §6.1 «Sequential Searching»** - последовательный поиск, вариант с барьером (Algorithm Q) и вариант для упорядоченной таблицы (Algorithm T).',
        en: '**Donald Knuth, "The Art of Computer Programming", vol. 3 "Sorting and Searching", §6.1 "Sequential Searching"** - sequential search, the sentinel variant (Algorithm Q), and the variant for an ordered table (Algorithm T).',
      },
      {
        ru: '**Строки в C** - строка заканчивается нулевым байтом `\'\\0\'`, и `strlen` идёт по символам, пока его не встретит. Это тот же барьер: длину строки нигде не хранят, конец отмечен значением.',
        en: '**Strings in C** - a string ends with a zero byte `\'\\0\'`, and `strlen` walks the characters until it meets it. This is the same sentinel: the string length is stored nowhere, the end is marked by a value.',
      },
      {
        ru: '**CPython, сравнение объектов** - функция `PyObject_RichCompareBool` в `Objects/object.c` перед сравнением на равенство проверяет, не один ли это объект, и если один, сразу отвечает «равны». Поэтому `in` и `list.index` находят тот же самый объект NaN.',
        en: '**CPython, comparing objects** - the `PyObject_RichCompareBool` function in `Objects/object.c` checks, before comparing for equality, whether the two are one object, and if so answers "equal" at once. That is why `in` and `list.index` find the very same NaN object.',
      },
      {
        ru: '**MDN о методе includes** - страница `Array.prototype.includes` описывает сравнение SameValueZero: как строгое равенство, только `NaN` считается равным самому себе, а `-0` и `+0` - равными друг другу.',
        en: '**MDN on the includes method** - the `Array.prototype.includes` page describes the SameValueZero comparison: like strict equality, except that `NaN` is considered equal to itself, and `-0` and `+0` are equal to each other.',
      },
    ],
  },

  relatedAlgorithms: ['binary-search', 'jump-search', 'interpolation-search', 'exponential-search', 'fibonacci-search'],

  quiz: [
    {
      question: {
        ru: 'Сколько сравнений сделает `linearSearch` в массиве из n элементов, если искомого значения в нём нет?',
        en: 'How many comparisons does `linearSearch` make in an array of n elements if the target is not in it?',
      },
      options: [
        { ru: 'Примерно log₂ n, потому что поиск каждый раз отбрасывает половину массива', en: 'About log₂ n, because the search discards half of the array' },
        { ru: 'Ровно n: отсутствие доказать можно, только проверив все элементы', en: 'Exactly n: absence can be proven only by checking every element' },
        { ru: 'Одно сравнение, если первый элемент не равен искомому значению', en: 'One comparison, if the first element is not equal to the target' },
        { ru: 'Примерно n / 2, как в среднем случае удачного поиска элемента', en: 'About n / 2, as in the average case of a successful search' },
      ],
      correct: 1,
      explanation: {
        ru: 'Линейный поиск ничего не знает о порядке данных, поэтому каждое сравнение исключает только один элемент. Чтобы ответить `-1`, нужно проверить все n.',
        en: 'Linear search knows nothing of the order of the data, so each comparison rules out only one element. To answer `-1`, all n have to be checked.',
      },
      hint: {
        ru: 'Смотрите шаг «Дошли до конца - вернуть -1» на вкладке «Визуализация».',
        en: 'See the "Reached the end - return -1" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернёт `linearSearch([3, 1, 3], 3)`?',
        en: 'What does `linearSearch([3, 1, 3], 3)` return?',
      },
      options: [
        { ru: '`2` - индекс последнего вхождения значения в массиве', en: '`2` - the index of the last occurrence of the value' },
        { ru: '`[0, 2]` - индексы всех вхождений этого значения', en: '`[0, 2]` - the indices of every occurrence of the value' },
        { ru: '`0` - функция выходит на первом найденном совпадении', en: '`0` - the function exits on the first match it meets' },
        { ru: '`-1`, потому что значение в массиве встречается дважды', en: '`-1`, because the value occurs in the array twice' },
      ],
      correct: 2,
      explanation: {
        ru: 'Как только `arr[i] === target`, функция возвращает `i` и дальше не смотрит. Поэтому линейный поиск всегда находит первое вхождение.',
        en: 'As soon as `arr[i] === target`, the function returns `i` and looks no further. So linear search always finds the first occurrence.',
      },
      hint: {
        ru: 'Смотрите шаг «Сравнение и ранний выход» на вкладке «Реализация».',
        en: 'See the "The comparison and the early exit" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что линейный поиск требует от массива?',
        en: 'What does linear search require of the array?',
      },
      options: [
        { ru: 'Чтобы массив был отсортирован по возрастанию', en: 'That the array be sorted in ascending order' },
        { ru: 'Чтобы все значения в массиве были уникальными', en: 'That all the values in the array be unique' },
        { ru: 'Чтобы заранее построили индекс значений', en: 'That an index of values be built in advance' },
        { ru: 'Ничего - подойдёт любая последовательность', en: 'Nothing: any sequence at all will do as is' },
      ],
      correct: 3,
      explanation: {
        ru: 'Каждый элемент просто сравнивается с искомым, порядок и уникальность ни на что не влияют. Поэтому линейный поиск работает и с несортированным массивом, и с потоком.',
        en: 'Each element is simply compared with the target; order and uniqueness affect nothing. That is why linear search works with an unsorted array and with a stream alike.',
      },
      hint: {
        ru: 'Смотрите раздел «Проблема» на вкладке «Суть».',
        en: 'See the "Problem" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему в `linearSearchSentinel` цикл может обойтись без проверки `i < n`?',
        en: 'Why can the loop in `linearSearchSentinel` do without the `i < n` check?',
      },
      options: [
        { ru: 'В конец дописали искомое значение, и на нём цикл точно остановится', en: 'The target is appended to the end, and the loop is sure to stop on it' },
        { ru: 'JavaScript сам прерывает цикл, когда индекс выходит за массив', en: 'JavaScript breaks the loop itself when the index goes past the array\'s end' },
        { ru: 'Функция вызывается только для значений, которые точно есть в массиве', en: 'The function is called only for values that are surely in the array' },
        { ru: 'Проверка перенесена внутрь `pop()`, который вызывается на каждом шаге', en: 'The check moved into `pop()`, which is called on every single step' },
      ],
      correct: 0,
      explanation: {
        ru: 'После `arr.push(target)` совпадение есть всегда, хотя бы на последнем месте, поэтому выйти за конец цикл не может. После цикла `i < n` отличает настоящее совпадение от барьера.',
        en: 'After `arr.push(target)` there is always a match, at least in the last place, so the loop cannot run past the end. After the loop, `i < n` tells a real match from the sentinel.',
      },
      hint: {
        ru: 'Смотрите шаги «Поставить барьер» и «Одна проверка на шаг» на вкладке «Реализация».',
        en: 'See the "Placing the sentinel" and "One check per step" steps on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем в `linearSearchSentinel` первая строка `if (Number.isNaN(target)) return -1`?',
        en: 'Why is the first line of `linearSearchSentinel` `if (Number.isNaN(target)) return -1`?',
      },
      options: [
        { ru: 'Чтобы ускорить поиск чисел, так как NaN встречается в массивах часто', en: 'To speed up searching numbers, since NaN occurs in arrays quite often' },
        { ru: '`push` не умеет дописывать NaN в массив и выбросил бы ошибку', en: '`push` cannot append NaN to an array and would throw an error' },
        { ru: '`NaN !== NaN`: без защиты цикл пройдёт мимо барьера и не встанет', en: '`NaN !== NaN`: unguarded, the loop would pass the sentinel forever' },
        { ru: 'Это требование стандарта: все функции поиска обязаны отклонять NaN', en: 'The standard requires it: every search function must reject NaN' },
      ],
      correct: 2,
      explanation: {
        ru: 'Барьер работает, только если искомое равно самому себе. NaN себе не равен, поэтому в JS цикл ушёл бы за барьер навсегда, а в Python упал бы с `IndexError`.',
        en: 'The sentinel works only if the target equals itself. NaN does not equal itself, so in JS the loop would run past the sentinel forever, and in Python it would fail with an `IndexError`.',
      },
      hint: {
        ru: 'Смотрите шаг «Защита от NaN» на вкладке «Реализация».',
        en: 'See the "Guarding against NaN" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Каждый из 9 элементов массива ищут одинаково часто, и искомое всегда есть в массиве. Сколько сравнений в среднем делает линейный поиск?',
        en: 'Each of an array\'s 9 elements is searched for equally often, and the target is always in the array. How many comparisons does linear search make on average?',
      },
      options: [
        { ru: '9 - каждый раз приходится проверить весь массив целиком', en: '9 - the whole array has to be checked every single time' },
        { ru: '5 - это (n + 1) / 2: от одного сравнения до девяти', en: '5 - that is (n + 1) / 2: from one comparison up to nine' },
        { ru: '4,5 - ровно половина длины массива, n / 2 сравнений', en: '4.5 - exactly half the array length, n / 2 comparisons' },
        { ru: 'Около 3 - примерно log₂ 9, как у деления пополам', en: 'About 3 - roughly log₂ 9, as with halving the array' },
      ],
      correct: 1,
      explanation: {
        ru: 'Элемент на позиции k (считая с единицы) находится за k сравнений. Среднее от 1 до 9 - это (1 + 9) / 2 = 5, то есть (n + 1) / 2.',
        en: 'The element at position k (counting from one) is found in k comparisons. The average of 1 to 9 is (1 + 9) / 2 = 5, that is (n + 1) / 2.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the first paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернут в JavaScript `[1, 2, NaN].indexOf(NaN)` и `[1, 2, NaN].includes(NaN)`?',
        en: 'What do `[1, 2, NaN].indexOf(NaN)` and `[1, 2, NaN].includes(NaN)` return in JavaScript?',
      },
      options: [
        { ru: '`2` и `true`: оба метода сравнивают одинаково и находят NaN', en: '`2` and `true`: both methods compare the same way and find NaN' },
        { ru: '`-1` и `false`: NaN не равен ничему, даже самому себе', en: '`-1` and `false`: NaN equals nothing, not even itself' },
        { ru: '`-1` и `true`: `includes` считает NaN равным самому себе', en: '`-1` and `true`: `includes` treats NaN as equal to itself' },
        { ru: '`2` и `false`: `indexOf` ищет по типу, `includes` - по значению', en: '`2` and `false`: `indexOf` matches by type, `includes` by value' },
      ],
      correct: 2,
      explanation: {
        ru: '`indexOf` сравнивает строгим равенством, а `NaN === NaN` ложно. `includes` использует SameValueZero, где NaN равен себе. Оба метода - линейный поиск, отличаются только понятием равенства.',
        en: '`indexOf` compares with strict equality, and `NaN === NaN` is false. `includes` uses SameValueZero, where NaN equals itself. Both methods are linear search; they differ only in their notion of equality.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the sixth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'По несортированному массиву из миллиона чисел нужно сделать тысячу поисков. Что выгоднее?',
        en: 'A thousand searches have to be made over an unsorted array of a million numbers. What pays off better?',
      },
      options: [
        { ru: 'Тысячу раз линейный поиск: он ничего не требует от данных', en: 'Linear search a thousand times: it asks nothing of the data' },
        { ru: 'Линейный поиск с барьером: он делает в два раза меньше проходов', en: 'Linear search with a sentinel: it makes half as many passes' },
        { ru: 'Один раз сложить числа в `Set` и проверять каждое за O(1)', en: 'Put the numbers into a `Set` once and check each one in O(1)' },
        { ru: 'Перед каждым поиском сортировать массив и искать бинарным', en: 'Sort the array before every search and then use binary search' },
      ],
      correct: 2,
      explanation: {
        ru: 'Тысяча линейных поисков - до миллиарда сравнений. Построить `Set` стоит один проход, после чего каждая проверка в среднем O(1). Барьер убирает проверку границы, но не число элементов, а сортировка перед каждым поиском дороже самого поиска.',
        en: 'A thousand linear searches mean up to a billion comparisons. Building a `Set` costs one pass, after which each check is O(1) on average. A sentinel removes the bounds check but not the number of elements, and sorting before every search costs more than the search itself.',
      },
      hint: {
        ru: 'Смотрите пункт «Много поисков» раздела «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Many searches" item of the "Choice nuances" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Массив отсортирован, и линейный поиск останавливается, как только элемент больше искомого. Что это меняет?',
        en: 'The array is sorted, and linear search stops as soon as an element exceeds the target. What does that change?',
      },
      options: [
        { ru: 'Поиск становится O(log n), как бинарный, потому что порядок известен', en: 'The search becomes O(log n), like binary search, since the order is known' },
        { ru: 'Отсутствие находится раньше, но худший случай всё ещё остаётся O(n)', en: 'Absence is found sooner, but the worst case is still O(n) as before' },
        { ru: 'Ничего: линейный поиск не может использовать порядок элементов', en: 'Nothing: linear search cannot make any use of element order' },
        { ru: 'Поиск начинает возвращать последнее вхождение вместо первого', en: 'The search starts returning the last occurrence instead of the first' },
      ],
      correct: 1,
      explanation: {
        ru: 'Это вариант Кнута для упорядоченной таблицы (Algorithm T): отсутствующее значение больше не требует прохода до конца. Но искомое может стоять в конце, и тогда сравнений по-прежнему n. Порядок полностью использует только бинарный поиск.',
        en: 'This is Knuth\'s variant for an ordered table (Algorithm T): a missing value no longer requires a pass to the end. But the target may sit at the end, and then there are still n comparisons. Only binary search makes full use of the order.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fourth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'В CPython `nan = float(\'nan\')`, и `nan in [nan]` даёт `True`, а `float(\'nan\') in [nan]` - `False`. Почему?',
        en: 'In CPython, with `nan = float(\'nan\')`, `nan in [nan]` gives `True`, while `float(\'nan\') in [nan]` gives `False`. Why?',
      },
      options: [
        { ru: 'Python кэширует NaN, и второе выражение берёт значение из кэша', en: 'Python caches NaN, and the second expression takes it from the cache' },
        { ru: '`in` сначала проверяет, тот ли это объект, и лишь потом сравнивает', en: '`in` first checks whether it is the same object, and only then compares' },
        { ru: '`in` для списков работает через хеш, а у разных NaN хеши разные', en: '`in` for lists works through hashing, and different NaNs hash differently' },
        { ru: 'Второе выражение создаёт строку `\'nan\'`, а не число с плавающей точкой', en: 'The second expression creates the string `\'nan\'`, not a float number' },
      ],
      correct: 1,
      explanation: {
        ru: '`PyObject_RichCompareBool` перед сравнением проверяет идентичность: один и тот же объект считается равным. В первом случае это тот же объект `nan`, во втором - новый NaN, а `nan == nan` ложно. Поиск по списку остаётся линейным, хешей тут нет.',
        en: '`PyObject_RichCompareBool` checks identity before comparing: the same object counts as equal. In the first case it is the same `nan` object, in the second a new NaN, and `nan == nan` is false. The list search stays linear; there is no hashing here.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» и третий пункт раздела «Примеры в коде» на вкладке «Суть».',
        en: 'See the sixth paragraph of the "How it works" section and the third item of the "In code" section on the "Intent" tab.',
      },
    },
  ],
};

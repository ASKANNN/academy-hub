export const jumpSearch = {
  slug: 'jump-search',
  category: 'searching',
  name: { ru: 'Jump Search', en: 'Jump Search' },
  complexity: {
    time: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['sequential', 'sorted-input', 'block-skipping'],

  intent: {
    ru: 'Прыжковый поиск ищет значение в отсортированном массиве в два этапа: прыгает вперёд блоками по √n элементов, сверяя только конец каждого блока, а потом проходит линейно один блок, где искомое может быть. В миллионе элементов это не больше 1999 проверок вместо миллиона у линейного поиска, хотя бинарному хватает 20. Зато поиск идёт только вперёд и возвращается назад не больше одного раза - к началу последнего блока.',
    en: 'Jump search looks for a value in a sorted array in two stages: it jumps forward in blocks of √n elements, checking only the end of each block, and then walks linearly through the one block where the target can be. In a million elements that is at most 1999 checks instead of a million for linear search, though binary search needs only 20. In exchange the search only moves forward and goes back at most once - to the start of the last block.',
  },

  problem: {
    ru: 'Линейный поиск по отсортированному массиву проверяет элементы по одному и не пользуется порядком: если элемент на позиции k меньше искомого, всё левее него тоже меньше, а проверять их всё равно приходится. Бинарный поиск пользуется порядком лучше всех, но ему нужен доступ к середине за O(1) и свобода ходить по данным в обе стороны. Если данные можно читать только по порядку, с редкими указателями вперёд - как связанный отсортированный файл или блоки на ленте, - до середины не добраться дёшево.',
    en: 'Linear search over a sorted array checks the elements one by one and makes no use of the order: if the element at position k is less than the target, everything to its left is less too, yet those elements still get checked. Binary search uses the order best of all, but it needs O(1) access to the middle and the freedom to move through the data in both directions. If the data can only be read in order, with occasional pointers forward - like a linked sorted file or blocks on a tape - there is no cheap way to reach the middle.',
  },

  solution: {
    ru: 'Массив делится на блоки длиной `m = ⌊√n⌋`. **Этап прыжков**: смотрим на последний элемент блока - если он меньше искомого, то и весь блок меньше, и мы перепрыгиваем его целиком (`prev = next`, `next += m`). Как только конец блока оказался не меньше искомого, искомое может быть только в этом блоке. **Этап линейного прохода**: идём по блоку слева направо - совпало, значит ответ найден; элемент больше искомого или блок кончился - ответ `-1`. Последний блок может быть короче остальных, поэтому его конец - `min(next, n)`, а не `next`. Шаг √n выбран не на глаз: при нём сумма прыжков и шагов внутри блока минимальна.',
    en: 'The array is split into blocks of length `m = ⌊√n⌋`. **The jump stage**: look at the last element of a block - if it is less than the target, the whole block is less, and we jump over it entirely (`prev = next`, `next += m`). As soon as a block end is not less than the target, the target can only be in that block. **The linear stage**: walk through the block from left to right - a match means the answer is found; an element greater than the target or the end of the block means the answer is `-1`. The last block may be shorter than the rest, so its end is `min(next, n)`, not `next`. The step √n is not chosen by eye: with it the sum of jumps and steps inside the block is smallest.',
  },

  steps: [
    {
      title: { ru: 'Шаг прыжка - корень из n', en: 'The jump step is the square root of n' },
      explanation: {
        ru: 'В массиве 16 элементов, шаг прыжка `m = ⌊√16⌋ = 4`, то есть 4 блока по 4 элемента. Массив отсортирован, поэтому сначала достаточно найти блок, где искомое может быть, а не сам элемент.',
        en: 'The array has 16 elements, the jump step is `m = ⌊√16⌋ = 4`, so there are 4 blocks of 4 elements. The array is sorted, so the first job is to find the block where the target can be, not the element itself.',
      },
    },
    {
      title: { ru: 'Проверить конец блока', en: 'Check the end of the block' },
      explanation: {
        ru: 'Подсвечен последний элемент текущего блока, индекс `next - 1`. Одно сравнение с ним решает судьбу всего блока: если он меньше искомого, то и все элементы блока меньше.',
        en: 'The last element of the current block is highlighted, index `next - 1`. One comparison with it decides the fate of the whole block: if it is less than the target, every element of the block is less.',
      },
    },
    {
      title: { ru: 'Перепрыгнуть блок', en: 'Jump over the block' },
      explanation: {
        ru: 'Конец блока меньше искомого - весь блок отброшен и остаётся пустым контуром, `prev = next`, `next += m`. К отброшенным блокам поиск больше не вернётся.',
        en: 'The block end is less than the target - the whole block is discarded and left as an empty outline, `prev = next`, `next += m`. The search never comes back to discarded blocks.',
      },
    },
    {
      title: { ru: 'Линейный проход внутри блока', en: 'A linear pass inside the block' },
      explanation: {
        ru: 'Конец блока не меньше искомого, или это последний блок, - значит, искомое может быть только здесь. Диапазон сузился до одного блока, и проход начинается с его начала. Если прыжки остановились на конце блока, это единственный шаг назад за весь поиск. Дальше элементы проверяются слева направо, как в линейном поиске.',
        en: 'The block end is not less than the target, or this is the last block - so the target can only be here. The range has narrowed to one block, and the pass begins at its start. If the jumps stopped at the block end, this is the only step back in the whole search. From there the elements are checked from left to right, as in linear search.',
      },
    },
    {
      title: { ru: 'Ответ - индекс или -1', en: 'The answer is an index or -1' },
      explanation: {
        ru: 'Совпало - поиск возвращает индекс. Элемент больше искомого или блок кончился - ответ `-1`: левее искомого нет по прыжкам, правее - по порядку массива. Для 16 элементов это не больше 3 прыжков и 4 проверок внутри блока.',
        en: 'A match - the search returns the index. An element greater than the target or the end of the block - the answer is `-1`: there is nothing to the left by the jumps, and nothing to the right by the order of the array. For 16 elements that is at most 3 jumps and 4 checks inside the block.',
      },
    },
  ],

  implementation: {
    javascript: `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  let next = step;
  while (next < n && arr[next - 1] < target) {
    prev = next;
    next += step;
  }
  const end = Math.min(next, n);
  for (let i = prev; i < end; i++) {
    if (arr[i] === target) return i;
    if (arr[i] > target) return -1;
  }
  return -1;
}`,
    python: `import math


def jump_search(arr, target):
    n = len(arr)
    step = math.isqrt(n)
    prev, nxt = 0, step
    while nxt < n and arr[nxt - 1] < target:
        prev = nxt
        nxt += step
    for i in range(prev, min(nxt, n)):
        if arr[i] == target:
            return i
        if arr[i] > target:
            return -1
    return -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`jumpSearch` принимает отсортированный по возрастанию массив `arr` и искомое значение `target` и вернёт индекс совпадения или `-1`. Порядок массива функция не проверяет: это стоило бы O(n) и съело бы весь выигрыш.',
          en: '`jumpSearch` takes an array `arr` sorted in ascending order and a target value `target` and returns the index of a match, or `-1`. The function does not check the order of the array: that would cost O(n) and eat up the whole gain.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Шаг прыжка', en: 'The jump step' },
        explanation: {
          ru: '`step` - длина блока, целая часть квадратного корня из длины массива: для 16 элементов это `4`, для 10 - `3`, для миллиона - `1000`. Почему именно корень, разобрано во втором абзаце раздела «Как это работает». Для пустого массива `step` равен `0`, но цикл ниже тогда не выполнится ни разу.',
          en: '`step` is the block length, the integer part of the square root of the array length: `4` for 16 elements, `3` for 10, `1000` for a million. Why exactly the root is explained in the second paragraph of the "How it works" section. For an empty array `step` is `0`, but then the loop below never runs.',
        },
      },
      {
        lines: [4, 5],
        title: { ru: 'Границы текущего блока', en: 'The bounds of the current block' },
        explanation: {
          ru: '`prev` - первый индекс текущего блока, `next` - первый индекс следующего, так что блок - это `arr[prev]` ... `arr[next - 1]`. Сначала это первые `step` элементов.',
          en: '`prev` is the first index of the current block and `next` the first index of the next one, so the block is `arr[prev]` ... `arr[next - 1]`. At first that is the first `step` elements.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Условие прыжка', en: 'The jump condition' },
        explanation: {
          ru: 'Прыгать дальше можно, пока за блоком ещё есть элементы (`next < n`) и конец блока `arr[next - 1]` меньше искомого. Проверка `next < n` стоит первой: без неё на последнем прыжке индекс уйдёт за конец массива. В Python это `IndexError`, а в JS `arr[11]` в массиве из 10 элементов молча даёт `undefined`.',
          en: 'Jumping on is allowed while there are elements beyond the block (`next < n`) and the block end `arr[next - 1]` is less than the target. The check `next < n` comes first: without it the last jump would take the index past the end of the array. In Python that is an `IndexError`, and in JS `arr[11]` in an array of 10 elements silently gives `undefined`.',
        },
      },
      {
        lines: [7, 9],
        title: { ru: 'Прыжок', en: 'The jump' },
        explanation: {
          ru: 'Конец блока меньше искомого, значит, и весь блок меньше: массив отсортирован. Блок отбрасывается целиком, и границы сдвигаются на `step` вперёд. Каждый прыжок стоит одно сравнение, а исключает `step` элементов.',
          en: 'The block end is less than the target, so the whole block is less: the array is sorted. The block is discarded entirely, and the bounds move `step` forward. Every jump costs one comparison and rules out `step` elements.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Последний блок короче', en: 'The last block is shorter' },
        explanation: {
          ru: 'Если `n` не делится на `step` нацело, последний блок короче остальных: при `n = 10` и `step = 3` блоки - `0-2`, `3-5`, `6-8` и один элемент `9`. Тогда `next` может оказаться больше `n` (здесь `12`), и конец прохода - `Math.min(next, n)`. Без него JS прочитал бы `arr[10]` и `arr[11]`, получил бы `undefined` и вернул бы `-1` по случайности, а не по логике.',
          en: 'If `n` is not a multiple of `step`, the last block is shorter than the rest: with `n = 10` and `step = 3` the blocks are `0-2`, `3-5`, `6-8` and the single element `9`. Then `next` can end up greater than `n` (here `12`), and the end of the pass is `Math.min(next, n)`. Without it JS would read `arr[10]` and `arr[11]`, get `undefined`, and return `-1` by luck rather than by logic.',
        },
      },
      {
        lines: [11, 12],
        title: { ru: 'Линейный проход и совпадение', en: 'The linear pass and a match' },
        explanation: {
          ru: 'Проход начинается с `prev` - с начала блока, на котором остановились прыжки. Если они остановились на его конце `arr[next - 1]`, это единственный шаг назад во всём поиске. Совпало - функция возвращает `i`. Всё левее `prev` меньше искомого, поэтому среди дубликатов это всегда первое вхождение.',
          en: 'The pass starts at `prev` - the start of the block where the jumps stopped. If they stopped at its end `arr[next - 1]`, this is the only step back in the whole search. A match - the function returns `i`. Everything left of `prev` is less than the target, so among duplicates this is always the first occurrence.',
        },
      },
      {
        lines: [13],
        title: { ru: 'Проскочили - искомого нет', en: 'Overshot - the target is absent' },
        explanation: {
          ru: 'Элемент больше искомого - дальше по блоку только большие, и ответ `-1` можно вернуть сразу, не доходя до конца блока. Так же быстро отвечает поиск значения меньше первого элемента: в массиве от двух элементов это одно сравнение с концом первого блока и одно с `arr[0]`.',
          en: 'The element is greater than the target - further along the block there are only greater ones, and `-1` can be returned at once, without reaching the end of the block. A search for a value less than the first element answers just as fast: in an array of two or more elements that is one comparison with the end of the first block and one with `arr[0]`.',
        },
      },
      {
        lines: [14, 16],
        title: { ru: 'Блок кончился', en: 'The block has ended' },
        explanation: {
          ru: 'Цикл дошёл до конца блока - все его элементы меньше искомого. Так бывает только в последнем блоке: на любом другом прыжки остановились потому, что его конец не меньше искомого, и проход вернул бы ответ раньше. Остаётся `-1`. В худшем случае это `n / step - 1` прыжков плюс `step` проверок в блоке: 199 для 10 000 элементов.',
          en: 'The loop reached the end of the block - all its elements are less than the target. That happens only in the last block: on any other block the jumps stopped because its end is not less than the target, and the pass would have returned earlier. What is left is `-1`. In the worst case that is `n / step - 1` jumps plus `step` checks in the block: 199 for 10,000 elements.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Импорт', en: 'The import' },
        explanation: {
          ru: '`math` нужен ради `math.isqrt` - целого квадратного корня.',
          en: '`math` is needed for `math.isqrt` - the integer square root.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`jump_search` принимает отсортированный по возрастанию список `arr` и искомое `target` и вернёт индекс совпадения или `-1`. Порядок списка функция не проверяет: это стоило бы O(n).',
          en: '`jump_search` takes a list `arr` sorted in ascending order and a target `target` and returns the index of a match, or `-1`. The function does not check the order of the list: that would cost O(n).',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Шаг прыжка', en: 'The jump step' },
        explanation: {
          ru: '`math.isqrt(n)` - точная целая часть корня. `int(math.sqrt(n))` считает через число с плавающей точкой и на больших `n` ошибается: для `n = (10**8 + 1)**2 - 1` он даёт `100000001`, а верный ответ `100000000`. Для пустого списка шаг `0`, и цикл ниже не выполнится.',
          en: '`math.isqrt(n)` is the exact integer part of the root. `int(math.sqrt(n))` goes through a floating-point number and is wrong for large `n`: for `n = (10**8 + 1)**2 - 1` it gives `100000001`, while the right answer is `100000000`. For an empty list the step is `0`, and the loop below does not run.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Границы текущего блока', en: 'The bounds of the current block' },
        explanation: {
          ru: 'Блок - это `arr[prev:nxt]`. Имя `nxt`, а не `next`, чтобы не заслонять встроенную функцию `next`.',
          en: 'The block is `arr[prev:nxt]`. The name is `nxt`, not `next`, so as not to shadow the built-in function `next`.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Условие прыжка', en: 'The jump condition' },
        explanation: {
          ru: 'Прыгаем, пока за блоком есть элементы и его конец `arr[nxt - 1]` меньше искомого. Без `nxt < n` поиск `19` в списке из 10 нечётных чисел падает с `IndexError`: прыжок уводит `nxt` к `12`.',
          en: 'We jump while there are elements beyond the block and its end `arr[nxt - 1]` is less than the target. Without `nxt < n` a search for `19` in a list of 10 odd numbers fails with `IndexError`: the jump takes `nxt` to `12`.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Прыжок', en: 'The jump' },
        explanation: {
          ru: 'Конец блока меньше искомого - весь блок меньше, он отбрасывается, и границы сдвигаются на `step`. Одно сравнение исключает `step` элементов.',
          en: 'The block end is less than the target - the whole block is less, it is discarded, and the bounds move by `step`. One comparison rules out `step` elements.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Последний блок короче', en: 'The last block is shorter' },
        explanation: {
          ru: 'Проход идёт от начала блока до `min(nxt, n)`: последний блок может быть короче, и `nxt` тогда больше `n`. Без `min` поиск `25` в списке из 10 нечётных чисел от 1 до 19 падает с `IndexError`.',
          en: 'The pass runs from the start of the block to `min(nxt, n)`: the last block may be shorter, and then `nxt` is greater than `n`. Without `min` a search for `25` in a list of the 10 odd numbers 1 to 19 fails with `IndexError`.',
        },
      },
      {
        lines: [12, 13],
        title: { ru: 'Совпадение', en: 'A match' },
        explanation: {
          ru: 'Совпало - функция возвращает `i`. Всё левее `prev` меньше искомого, поэтому среди дубликатов это первое вхождение: в `[1, 3, 3, 3, 3, 3, 5]` поиск `3` даёт `1`.',
          en: 'A match - the function returns `i`. Everything left of `prev` is less than the target, so among duplicates this is the first occurrence: in `[1, 3, 3, 3, 3, 3, 5]` a search for `3` gives `1`.',
        },
      },
      {
        lines: [14, 15],
        title: { ru: 'Проскочили - искомого нет', en: 'Overshot - the target is absent' },
        explanation: {
          ru: 'Элемент больше искомого - дальше только большие, и `-1` возвращается сразу, не доходя до конца блока.',
          en: 'The element is greater than the target - only greater ones follow, and `-1` is returned at once, without reaching the end of the block.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Блок кончился', en: 'The block has ended' },
        explanation: {
          ru: 'Все элементы блока меньше искомого, а дальше по прыжкам искать нечего - ответ `-1`. В худшем случае это `n / step - 1` прыжков плюс `step` проверок: 1999 для миллиона элементов.',
          en: 'Every element of the block is less than the target, and by the jumps there is nothing further to look at - the answer is `-1`. In the worst case that is `n / step - 1` jumps plus `step` checks: 1999 for a million elements.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'O(√n) проверок вместо O(n) у линейного поиска: 199 на 10 000 элементов, 1999 на миллион.',
      en: 'O(√n) checks instead of O(n) for linear search: 199 for 10,000 elements, 1999 for a million.',
    },
    {
      ru: 'Ходит только вперёд и возвращается назад не больше одного раза - к началу последнего блока, поэтому подходит для данных, которые читаются по порядку.',
      en: 'Moves only forward and goes back at most once - to the start of the last block, so it suits data that is read in order.',
    },
    {
      ru: 'Среди дубликатов всегда находит первое вхождение, без отдельного варианта вроде lower bound.',
      en: 'Among duplicates it always finds the first occurrence, with no separate variant like lower bound.',
    },
  ],
  cons: [
    {
      ru: 'В массиве с доступом по индексу проигрывает бинарному поиску: 1999 проверок против 20 на миллионе элементов.',
      en: 'In an array with index access it loses to binary search: 1999 checks against 20 on a million elements.',
    },
    {
      ru: 'Как и бинарный, требует отсортированных данных и на несортированных молча ошибается: `-1` для значения, которое есть.',
      en: 'Like binary search, it requires sorted data and silently fails on unsorted data: `-1` for a value that is present.',
    },
    {
      ru: 'Легко ошибиться на последнем, коротком блоке: без `min(next, n)` и `next < n` индекс уходит за конец массива.',
      en: 'Easy to get wrong on the last, shorter block: without `min(next, n)` and `next < n` the index runs past the end of the array.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные отсортированы, но читаются только по порядку, а перепрыгнуть вперёд на блок дешевле, чем добраться до середины: связанный файл с указателями вперёд, блоки на ленте.',
      en: 'When the data is sorted but can only be read in order, and jumping forward a block is cheaper than reaching the middle: a linked file with forward pointers, blocks on a tape.',
    },
    {
      ru: 'Как учебный шаг между линейным и бинарным поиском: на нём хорошо видно, как выбор размера шага превращается в задачу оптимизации.',
      en: 'As a teaching step between linear and binary search: it shows clearly how choosing a step size turns into an optimisation problem.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Индексы VSAM** - по Шнейдерману, прыжковым поиском просматривают sequence set, нижний уровень индекса IBM VSAM: ключи там сжаты и имеют разную длину, и бинарный поиск по ним невозможен, а указатели позволяют перепрыгивать примерно через √N ключей.',
      en: '**VSAM indexes** - according to Shneiderman, jump search is used to scan the sequence set, the lowest level of an IBM VSAM index: the keys there are compressed and of varying length, so binary search over them is impossible, while pointers allow jumping over about √N keys.',
    },
    {
      ru: '**Записи на ленте** - Шнейдерман называет прыжковый поиск естественным способом найти запись на ленте с записями, собранными в блоки: читается блок, сверяется ключ его последней записи, и только в нужном блоке записи просматриваются по одной.',
      en: '**Records on tape** - Shneiderman calls jump search the natural way to find a record on a tape with blocked records: a block is read, the key of its last record is checked, and only in the right block are the records examined one by one.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Прыжковый поиск стоит между линейным и бинарным.** От **Linear Search** он берёт проход по порядку, но пропускает целые блоки - и поэтому, как и **Binary Search**, требует отсортированного массива. Цена в худшем случае, по прогону кода на миллионе элементов: **1999** проверок против миллиона у линейного и 20 у бинарного. Страница **O(log n) - Логарифмическая Сложность** в разделе Big O объясняет, почему 20 так мало; здесь речь о том, откуда берётся √n и где оно всё-таки выгодно.',
        en: '**Jump search sits between linear and binary search.** From **Linear Search** it takes walking in order, but it skips whole blocks - and so, like **Binary Search**, it needs a sorted array. The worst-case cost, from running the code on a million elements: **1999** checks against a million for linear search and 20 for binary search. The **O(log n) - Logarithmic Time** page in the Big O section explains why 20 is so few; this page is about where √n comes from and where it still pays off.',
      },
      {
        ru: 'Почему шаг именно **√n**. При шаге m в худшем случае поиск делает n / m - 1 прыжков и потом до m проверок внутри последнего блока: всего f(m) = n / m + m - 1. Производная -n / m² + 1 обращается в ноль при m = √n, и тогда f = 2√n - 1. Прогон подтверждает: для 10 000 элементов и шага 100 худший случай - **199** проверок. Шнейдерман в статье 1978 года выводит то же для среднего случая: C(N) = ½·N/n + ½·(n - 1), минимум при n = √N.',
        en: 'Why the step is exactly **√n**. With step m the worst case makes n / m - 1 jumps and then up to m checks inside the last block: f(m) = n / m + m - 1 in all. The derivative -n / m² + 1 is zero at m = √n, and then f = 2√n - 1. A run confirms it: for 10,000 elements and step 100 the worst case is **199** checks. Shneiderman derives the same for the average case in his 1978 paper: C(N) = ½·N/n + ½·(n - 1), smallest at n = √N.',
      },
      {
        ru: 'Что будет при **неудачном шаге**, проверено запуском на 10 000 элементов, худший случай: m = 1 - 10 000 проверок (это просто линейный поиск по концам «блоков»), m = 10 - 1009, m = 50 - 249, m = 100 - **199**, m = 200 - 249, m = 1000 - 1009, m = 10 000 - снова 10 000 (один блок, весь массив проходится линейно). Кривая симметрична: n / m и m меняются местами, и слишком маленький шаг так же плох, как слишком большой. При этом рядом с √n она пологая - шаг в 2 раза больше или меньше стоит лишь 25% лишних проверок.',
        en: 'What a **bad step** does, checked by running on 10,000 elements, worst case: m = 1 - 10,000 checks (that is just linear search over the ends of the "blocks"), m = 10 - 1009, m = 50 - 249, m = 100 - **199**, m = 200 - 249, m = 1000 - 1009, m = 10,000 - 10,000 again (one block, the whole array walked linearly). The curve is symmetric: n / m and m swap places, and a step that is too small is as bad as one that is too large. Near √n, though, it is flat - a step twice as large or small costs only 25% extra checks.',
      },
      {
        ru: '**Ошибки на единицу** здесь живут на краях. Последний блок короче остальных, если n не делится на шаг: при n = 10 и шаге 3 после трёх прыжков `next = 12`, и проход до `next` читает `arr[10]` и `arr[11]`. В Python это `IndexError`, а в JS - тихие `undefined`, и функция возвращает `-1` верно, но по случайности: `undefined > 25` - `false`. Отсюда `min(next, n)` и проверка `next < n` перед `arr[next - 1]`. Пустой массив безопасен: шаг `0`, цикл не начинается, ответ `-1`. Значение меньше первого элемента в массиве от двух элементов стоит две проверки: конец первого блока и `arr[0]`.',
        en: '**Off-by-one errors** live at the edges here. The last block is shorter than the rest if n is not a multiple of the step: with n = 10 and step 3, after three jumps `next = 12`, and a pass up to `next` reads `arr[10]` and `arr[11]`. In Python that is an `IndexError`, and in JS quiet `undefined` values, and the function returns `-1` correctly but by luck: `undefined > 25` is `false`. Hence `min(next, n)` and the check `next < n` before `arr[next - 1]`. An empty array is safe: the step is `0`, the loop never starts, the answer is `-1`. In an array of two or more elements, a value less than the first one costs two checks: the end of the first block and `arr[0]`.',
      },
      {
        ru: '**Дубликаты**: прыжковый поиск всегда возвращает первое вхождение. Прыжки останавливаются на первом блоке, конец которого не меньше искомого, поэтому всё левее `prev` строго меньше, и проход натыкается на первое равное. Проверено: в `[1, 3, 3, 3, 3, 3, 5]` поиск `3` даёт `1`, в девяти тройках - `0`, а на случайных отсортированных массивах длиной до 60 результат совпал с `indexOf` во всех 402 600 проверках. У `binarySearch` на `[1, 3, 3, 3, 5]` ответ `2` - тот, куда попала середина.',
        en: '**Duplicates**: jump search always returns the first occurrence. The jumps stop at the first block whose end is not less than the target, so everything left of `prev` is strictly less, and the pass hits the first equal one. Checked: in `[1, 3, 3, 3, 3, 3, 5]` a search for `3` gives `1`, in nine 3s it gives `0`, and on random sorted arrays up to 60 long the result matched `indexOf` in all 402,600 checks. `binarySearch` on `[1, 3, 3, 3, 5]` answers `2` - wherever the middle landed.',
      },
      {
        ru: 'Где прыжки **выгоднее бинарного поиска**. Бинарный поиск ходит по массиву туда и обратно до log₂ n раз, прыжковый - только вперёд и не больше одного раза назад, к началу блока. Английская Википедия делает из этого вывод, что метод хорош там, где шаг назад дорогой, но отдельного источника для этого не приводит. Шнейдерман формулирует иначе: прыжки нужны там, где **бинарный поиск невозможен** - в отсортированном файле, порядок которого держится на ссылках, при сжатых ключах разной длины, на ленте. Если прыжок стоит a, а шаг просмотра b, оптимальный шаг у него √((a / b)·N).',
        en: 'Where jumps **beat binary search**. Binary search moves back and forth through the array up to log₂ n times, jump search only forward and at most once back, to the start of a block. The English Wikipedia concludes from this that the method is good where stepping back is expensive, but gives no separate source for that. Shneiderman puts it differently: jumps are needed where **binary search is not feasible** - in a sorted file whose order is held by links, with compressed keys of varying length, on tape. If a jump costs a and a scan step costs b, his optimal step is √((a / b)·N).',
      },
      {
        ru: 'Внутри блока можно искать и **бинарным поиском** - блок ведь отсортирован. Асимптотику это не меняет: прыжков всё равно около √n. Прогон на миллионе элементов с шагом 1000: 1999 проверок с линейным проходом и 1009 с бинарным. Шнейдерман предлагает похожий ход - повторить прыжки с шагом √m внутри блока (двухуровневый прыжковый поиск) - и пишет, что при log₂ N уровнях прыжковый поиск превращается в бинарный. Там же разобраны прыжки уменьшающейся длины, которые дают около 6% выигрыша.',
        en: 'Inside the block one can also use **binary search** - the block is sorted, after all. It does not change the asymptotics: there are still about √n jumps. A run on a million elements with step 1000: 1999 checks with a linear pass and 1009 with a binary one. Shneiderman suggests a similar move - repeating jumps of size √m inside the block (two-level jump search) - and notes that with log₂ N levels jump search becomes binary search. The same paper covers jumps of decreasing length, which gain about 6%.',
      },
      {
        ru: '**История.** Самая цитируемая работа - **Бен Шнейдерман**, «Jump Searching: A Fast Sequential Search Technique», Communications of the ACM, т. 21, № 10, октябрь 1978, с. 831-834 (получена в мае 1977, переработана в мае 1978). Но изобретателем себя автор не называет: он пишет о «классической» схеме с шагом √N и разбирает её варианты, а название «block search» берёт из книги Джеймса Мартина 1977 года. Кто придумал метод первым, по этой статье установить нельзя.',
        en: '**History.** The most cited work is **Ben Shneiderman**, "Jump Searching: A Fast Sequential Search Technique", Communications of the ACM, vol. 21, no. 10, October 1978, pp. 831-834 (received May 1977, revised May 1978). But the author does not claim to have invented it: he writes about the "classic" scheme with step √N and studies its variants, and takes the name "block search" from a 1977 book by James Martin. Who came up with the method first cannot be established from this paper.',
      },
    ],
    whenToUse: [
      {
        ru: '**Отсортированные данные без доступа к середине** - связанный файл с указателями вперёд, блоки на ленте, сжатые ключи разной длины. Бинарный поиск тут невозможен, а прыжки по √n дают O(√n) вместо O(n) у линейного.',
        en: '**Sorted data with no access to the middle** - a linked file with forward pointers, blocks on tape, compressed keys of varying length. Binary search is impossible here, and jumps of √n give O(√n) instead of the O(n) of linear search.',
      },
      {
        ru: '**Обычный массив в памяти** - выбирайте **Binary Search**: 20 проверок против 1999 на миллионе элементов, и доступ по индексу ничего не стоит.',
        en: '**An ordinary array in memory** - choose **Binary Search**: 20 checks against 1999 on a million elements, and index access costs nothing.',
      },
      {
        ru: '**Несортированные данные** - прыжки не работают: `jumpSearch([5, 1, 4, 2, 3], 1)` возвращает `-1`, хотя `1` в массиве есть. Для одного поиска нужен **Linear Search**.',
        en: '**Unsorted data** - jumps do not work: `jumpSearch([5, 1, 4, 2, 3], 1)` returns `-1` although `1` is in the array. A single search needs **Linear Search**.',
      },
      {
        ru: '**Прыжок и просмотр стоят по-разному** - шаг стоит подобрать под отношение цен: по Шнейдерману, если прыжок в a раз дороже просмотра одного элемента, оптимальный шаг √(a·N), а не √N.',
        en: '**A jump and a scan cost different amounts** - the step should be fitted to the ratio of costs: according to Shneiderman, if a jump is a times dearer than scanning one element, the optimal step is √(a·N), not √N.',
      },
    ],
    realWorld: [
      {
        ru: '**Ben Shneiderman, «Jump Searching: A Fast Sequential Search Technique», CACM 21(10), 1978, с. 831-834** - вывод шага √N, двухуровневые прыжки, прыжки переменной длины, таблица среднего числа проверок для 50, 100 и 500 записей. Сверено по PDF со страницы автора в Мэрилендском университете.',
        en: '**Ben Shneiderman, "Jump Searching: A Fast Sequential Search Technique", CACM 21(10), 1978, pp. 831-834** - the derivation of the √N step, two-level jumps, variable-length jumps, a table of the average number of checks for 50, 100 and 500 records. Checked against the PDF on the author\'s University of Maryland page.',
      },
      {
        ru: '**IBM VSAM** - по Шнейдерману (со ссылкой на руководство IBM по планированию VSAM, которое мы не открывали), прыжковый поиск применяется в sequence set, нижнем уровне индекса, потому что сжатые ключи разной длины не позволяют бинарного поиска.',
        en: '**IBM VSAM** - according to Shneiderman (citing the IBM VSAM planning guide, which we have not opened), jump search is used in the sequence set, the lowest level of the index, because compressed keys of varying length rule out binary search.',
      },
      {
        ru: '**Наборы «владелец - члены» CODASYL** - Шнейдерман предлагает прыжки для поиска записи-члена в упорядоченном наборе, связанном указателями через страницы диска: меньше страниц придётся читать в память. Это предложение автора, а не описание существующей системы.',
        en: '**CODASYL owner-member sets** - Shneiderman suggests jumps for finding a member record in an ordered set linked by pointers across disk pages: fewer pages have to be read into memory. This is the author\'s proposal, not a description of an existing system.',
      },
      {
        ru: '**Поиск внутри страницы индекса** - Шнейдерман ссылается на отчёт IBM Стронга, Марковского и Чандры (1977) о «семействе стратегий корневого поиска»: их стратегии квадратного и кубического корня соответствуют простому и двухуровневому прыжковому поиску. Сам отчёт мы не открывали.',
        en: '**Searching within an index page** - Shneiderman cites an IBM report by Strong, Markowsky and Chandra (1977) on a "family of root search strategies": their square and cube root strategies correspond to simple and two-level jump search. We have not opened the report itself.',
      },
    ],
  },

  relatedAlgorithms: ['linear-search', 'binary-search', 'interpolation-search', 'exponential-search', 'fibonacci-search'],

  quiz: [
    {
      question: {
        ru: 'Из каких двух этапов состоит прыжковый поиск?',
        en: 'What two stages does jump search consist of?',
      },
      options: [
        { ru: 'Сравнить с серединой и отбросить половину, пока диапазон не опустеет', en: 'Compare with the middle and drop half until the range is empty' },
        { ru: 'Прыжки по концам блоков, потом линейный проход внутри одного блока', en: 'Jumps over block ends, then a linear pass through one block' },
        { ru: 'Сначала отсортировать массив, потом пройти его линейно с начала', en: 'First sort the array, then walk it linearly from the start' },
        { ru: 'Прыжки с удвоением шага, потом бинарный поиск в найденном отрезке', en: 'Jumps with a doubling step, then binary search in the range' },
      ],
      correct: 1,
      explanation: {
        ru: 'Сначала поиск сверяет только последний элемент каждого блока длиной √n и перепрыгивает блоки, которые целиком меньше искомого. Потом проходит линейно один блок, где искомое может быть. Удвоение шага с бинарным поиском - это экспоненциальный поиск, а середина - бинарный.',
        en: 'First the search checks only the last element of each block of length √n and jumps over blocks that are entirely less than the target. Then it walks linearly through the one block where the target can be. A doubling step followed by binary search is exponential search, and the middle is binary search.',
      },
      hint: {
        ru: 'Смотрите шаги «Проверить конец блока» и «Линейный проход внутри блока» на вкладке «Визуализация».',
        en: 'See the "Check the end of the block" and "A linear pass inside the block" steps on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Какой шаг прыжка выберет `jumpSearch` для массива из 10 000 элементов?',
        en: 'What jump step does `jumpSearch` choose for an array of 10,000 elements?',
      },
      options: [
        { ru: '14 - примерно логарифм числа элементов по основанию два', en: '14 - roughly the base-two logarithm of the element count' },
        { ru: '5000 - половину массива, как бинарный поиск', en: '5000 - half the array, like binary search does' },
        { ru: '100 - целую часть квадратного корня из 10 000', en: '100 - the integer part of the square root of 10,000' },
        { ru: '1 - каждый элемент, иначе можно пропустить искомое', en: '1 - every element, or the target could be skipped' },
      ],
      correct: 2,
      explanation: {
        ru: '`step = Math.floor(Math.sqrt(n))`, для 10 000 это 100: 100 блоков по 100 элементов. Пропустить искомое нельзя и при большом шаге: перепрыгиваются только блоки, конец которых меньше искомого.',
        en: '`step = Math.floor(Math.sqrt(n))`, which is 100 for 10,000: 100 blocks of 100 elements. The target cannot be skipped even with a large step: only blocks whose end is less than the target are jumped over.',
      },
      hint: {
        ru: 'Смотрите шаг «Шаг прыжка» на вкладке «Реализация».',
        en: 'See the "The jump step" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Последний элемент текущего блока меньше искомого. Что делает прыжковый поиск?',
        en: 'The last element of the current block is less than the target. What does jump search do?',
      },
      options: [
        { ru: 'Отбрасывает блок целиком и прыгает к концу следующего', en: 'Drops the whole block and jumps to the next one\'s end' },
        { ru: 'Проходит этот блок линейно: искомое должно быть в нём', en: 'Walks this block linearly: the target must be in it' },
        { ru: 'Возвращает `-1`: искомое больше всех элементов массива', en: 'Returns `-1`: the target is greater than every element' },
        { ru: 'Возвращается на блок назад и ищет там бинарным поиском', en: 'Steps back one block and searches it with binary search' },
      ],
      correct: 0,
      explanation: {
        ru: 'Массив отсортирован, поэтому если конец блока меньше искомого, то и все элементы блока меньше. Блок отбрасывается целиком: `prev = next`, `next += step`, и следующая проверка - конец следующего блока.',
        en: 'The array is sorted, so if the block end is less than the target, every element of the block is less too. The block is discarded entirely: `prev = next`, `next += step`, and the next check is the end of the next block.',
      },
      hint: {
        ru: 'Смотрите шаг «Перепрыгнуть блок» на вкладке «Визуализация».',
        en: 'See the "Jump over the block" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Почему оптимальный шаг прыжка - именно √n?',
        en: 'Why is the optimal jump step exactly √n?',
      },
      options: [
        { ru: 'Так получается ровно log₂ n прыжков, как у бинарного поиска', en: 'It gives exactly log₂ n jumps, the same as binary search' },
        { ru: 'Сумма прыжков и проверок n / m + m - 1 минимальна при m = √n', en: 'Jumps plus checks, n / m + m - 1, are fewest at m = √n' },
        { ru: 'При любом другом шаге поиск может пропустить искомое значение', en: 'With any other step the search can skip the target value' },
        { ru: 'Корень проще всего вычислить, а точный шаг на скорость не влияет', en: 'The root is easiest to compute, and the step does not affect speed' },
      ],
      correct: 1,
      explanation: {
        ru: 'В худшем случае f(m) = n / m + m - 1. Производная -n / m² + 1 равна нулю при m = √n, и f = 2√n - 1: для 10 000 элементов прогон даёт 199. Корректность от шага не зависит, только число проверок.',
        en: 'In the worst case f(m) = n / m + m - 1. The derivative -n / m² + 1 is zero at m = √n, and f = 2√n - 1: for 10,000 elements a run gives 199. Correctness does not depend on the step, only the number of checks does.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the second paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Массив из 10 000 элементов, шаг вместо 100 взяли 10 или 1000. Что будет с худшим случаем?',
        en: 'An array of 10,000 elements, and the step is 10 or 1000 instead of 100. What happens to the worst case?',
      },
      options: [
        { ru: 'Шаг 10 быстрее: меньше проверок внутри блока, а прыжки дешёвые', en: 'Step 10 is faster: fewer checks inside the block, and jumps are cheap' },
        { ru: 'Шаг 1000 быстрее: всего 9 прыжков, а блок проходится за раз', en: 'Step 1000 is faster: only 9 jumps, and the block is walked in one go' },
        { ru: 'Оба около 1009 вместо 199: много прыжков или шагов в блоке', en: 'Both about 1009 checks instead of 199: too many jumps or block steps' },
        { ru: 'Ничего: число проверок от шага не зависит, только от n', en: 'Nothing: the number of checks depends on n, not on the step' },
      ],
      correct: 2,
      explanation: {
        ru: 'Прогон: при шаге 10 - 999 прыжков и 10 проверок в блоке, при шаге 1000 - 9 прыжков и 1000 проверок, оба раза 1009. n / m и m меняются местами, поэтому кривая симметрична, а минимум 199 - при шаге 100.',
        en: 'A run: with step 10 there are 999 jumps and 10 checks in the block, with step 1000 there are 9 jumps and 1000 checks, 1009 both times. n / m and m swap places, so the curve is symmetric, and the minimum of 199 is at step 100.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the third paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем линейный проход в `jumpSearch` идёт до `Math.min(next, n)`, а не до `next`?',
        en: 'Why does the linear pass in `jumpSearch` run to `Math.min(next, n)` rather than to `next`?',
      },
      options: [
        { ru: 'Чтобы проход не доходил до конца блока и экономил одну проверку', en: 'So the pass stops short of the block end and saves one check' },
        { ru: 'Без него для пустого массива цикл прыжков стал бы бесконечным', en: 'Without it the jump loop would run forever on an empty array' },
        { ru: 'Последний блок бывает короче, и `next` может уйти дальше `n`', en: 'The last block can be shorter, and `next` may end up beyond `n`' },
        { ru: 'Так среди дубликатов находится последнее вхождение, а не первое', en: 'So that among duplicates the last occurrence is found, not the first' },
      ],
      correct: 2,
      explanation: {
        ru: 'При n = 10 и шаге 3 после трёх прыжков `next = 12`. Проход до `next` прочитал бы `arr[10]` и `arr[11]`: в Python это `IndexError`, в JS - `undefined` и верный `-1` только по случайности.',
        en: 'With n = 10 and step 3, after three jumps `next = 12`. A pass up to `next` would read `arr[10]` and `arr[11]`: in Python that is an `IndexError`, in JS `undefined` and a correct `-1` only by luck.',
      },
      hint: {
        ru: 'Смотрите шаг «Последний блок короче» на вкладке «Реализация».',
        en: 'See the "The last block is shorter" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернёт `jumpSearch([1, 3, 3, 3, 3, 3, 5], 3)`?',
        en: 'What does `jumpSearch([1, 3, 3, 3, 3, 3, 5], 3)` return?',
      },
      options: [
        { ru: '`1` - первое вхождение: всё левее `prev` меньше тройки', en: '`1` - the first occurrence: all left of `prev` is less than 3' },
        { ru: '`3` - ту тройку, на которую попала середина массива', en: '`3` - whichever 3 the middle of the array landed on' },
        { ru: '`5` - последнее вхождение, ведь прыжки идут только вперёд', en: '`5` - the last occurrence, since the jumps only go forward' },
        { ru: '`2` - тройку на конце первого блока, где прыжки остановились', en: '`2` - the 3 at the end of the first block, where jumps stopped' },
      ],
      correct: 0,
      explanation: {
        ru: 'Шаг 2, конец первого блока `arr[1] = 3` не меньше искомого, прыжки останавливаются, и проход с `arr[0]` находит тройку на индексе `1`. Прыжки всегда останавливаются на первом блоке, конец которого не меньше искомого, поэтому ответ - первое вхождение.',
        en: 'The step is 2, the end of the first block `arr[1] = 3` is not less than the target, the jumps stop, and the pass from `arr[0]` finds the 3 at index `1`. The jumps always stop at the first block whose end is not less than the target, so the answer is the first occurrence.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the fifth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Где, по статье Шнейдермана 1978 года, прыжковый поиск предпочтительнее бинарного?',
        en: 'Where, according to Shneiderman\'s 1978 paper, is jump search preferable to binary search?',
      },
      options: [
        { ru: 'Везде: √n проверок всегда меньше, чем log₂ n у бинарного поиска', en: 'Everywhere: √n checks are always fewer than binary search\'s log₂ n' },
        { ru: 'Где бинарный невозможен: связанный файл, сжатые ключи, лента', en: 'Where binary search is impossible: linked files, packed keys, tape' },
        { ru: 'В несортированных массивах, где бинарный поиск ошибается', en: 'In unsorted arrays, where binary search gives wrong answers' },
        { ru: 'В обычных массивах в памяти, потому что прыжки лучше кешируются', en: 'In ordinary in-memory arrays, because jumps are more cache-friendly' },
      ],
      correct: 1,
      explanation: {
        ru: 'Шнейдерман пишет: когда бинарный поиск возможен, его трудно превзойти. Прыжки нужны для отсортированных файлов, порядок которых держится на ссылках, для сжатых ключей разной длины в индексах VSAM и для блоков на ленте. На миллионе элементов в массиве бинарному хватает 20 проверок, прыжковому нужно до 1999.',
        en: 'Shneiderman writes that when binary search can be done it is hard to beat. Jumps are for sorted files whose order is held by links, for compressed keys of varying length in VSAM indexes, and for blocks on tape. On a million elements in an array binary search needs 20 checks, jump search up to 1999.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the sixth paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Внутри найденного блока искать бинарным поиском, а не линейно. Как изменится худший случай на миллионе элементов?',
        en: 'Search the found block with binary search instead of linearly. How does the worst case change on a million elements?',
      },
      options: [
        { ru: 'Станет O(log n), как у бинарного поиска: около 20 проверок', en: 'It becomes O(log n), like binary search: about 20 checks' },
        { ru: 'Не изменится: в блоке и так не больше одной проверки', en: 'No change: the block takes at most one check anyway' },
        { ru: 'Станет хуже: бинарному поиску в блоке нужно больше проверок', en: 'It gets worse: binary search in a block needs more checks' },
        { ru: '1009 вместо 1999, но всё ещё O(√n): прыжков так же около √n', en: '1009, not 1999, yet still O(√n): about √n jumps remain' },
      ],
      correct: 3,
      explanation: {
        ru: 'Прогон с шагом 1000: 999 прыжков остаются, а 1000 проверок в блоке превращаются в 10. Итого 1009 против 1999 - почти вдвое лучше, но асимптотику определяют прыжки, и она остаётся O(√n).',
        en: 'A run with step 1000: the 999 jumps stay, and the 1000 checks in the block turn into 10. That is 1009 against 1999 - almost twice as good, but the jumps set the asymptotics, and it stays O(√n).',
      },
      hint: {
        ru: 'Смотрите седьмой абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the seventh paragraph of the "How it works" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что вернёт `jumpSearch([5, 1, 4, 2, 3], 1)`, и что выбрать для одного поиска в таком массиве?',
        en: 'What does `jumpSearch([5, 1, 4, 2, 3], 1)` return, and what fits a single search in such an array?',
      },
      options: [
        { ru: '`1`: прыжки сами пропускают нарушения порядка в массиве', en: '`1`: the jumps skip over breaks in the order by themselves' },
        { ru: '`-1`, хотя `1` в массиве есть; одному поиску нужен линейный', en: '`-1`, though `1` is there; one search calls for linear search' },
        { ru: 'Ошибку `RangeError`: функция проверяет, отсортирован ли массив', en: 'A `RangeError`: the function checks whether the array is sorted' },
        { ru: '`-1`, и это верно: в несортированном массиве ответа нет', en: '`-1`, and that is right: an unsorted array has no answer' },
      ],
      correct: 1,
      explanation: {
        ru: 'Шаг 2, конец первого блока `arr[1] = 1` не меньше искомого, проход начинает с `arr[0] = 5`, видит элемент больше искомого и возвращает `-1`. Порядок функция не проверяет. Для одного поиска сортировка дороже прохода, поэтому нужен **Linear Search**.',
        en: 'The step is 2, the end of the first block `arr[1] = 1` is not less than the target, the pass starts at `arr[0] = 5`, sees an element greater than the target, and returns `-1`. The function does not check the order. For a single search sorting costs more than a pass, so **Linear Search** is the one to use.',
      },
      hint: {
        ru: 'Смотрите пункт «Несортированные данные» раздела «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Unsorted data" item of the "Choice nuances" section on the "Intent" tab.',
      },
    },
  ],
};

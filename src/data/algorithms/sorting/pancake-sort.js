export const pancakeSort = {
  slug: 'pancake-sort',
  category: 'sorting',
  name: { ru: 'Pancake Sort', en: 'Pancake Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable', 'reversal-based'],

  intent: {
    ru: 'Блинная сортировка сортирует массив, используя только одну операцию - «переворот» (flip) префикса массива, как переворачивание стопки блинов лопаткой: перевернуть верхние k блинов сразу, не трогая остальные.',
    en: 'Pancake sort sorts an array using only one operation - "flipping" a prefix of the array, like flipping a stack of pancakes with a spatula: flip the top k pancakes all at once, without touching the rest.',
  },

  problem: {
    ru: 'Представьте стопку блинов разного размера, которые нужно расставить по возрастанию размера сверху вниз, но единственное разрешённое действие - просунуть лопатку под какой-то блин и перевернуть всю стопку блинов над ней. Нельзя вытащить блин из середины стопки или поменять местами два произвольных блина - только переворот целого верхнего сегмента. Как этой одной операцией добиться полной сортировки за конечное число шагов?',
    en: 'Imagine a stack of differently sized pancakes that must be arranged by increasing size from top to bottom, but the only allowed move is to slide a spatula under some pancake and flip the entire stack of pancakes above it. You cannot pull a pancake out of the middle of the stack or swap two arbitrary pancakes - only flip a whole top segment. How can this single operation achieve a full sort in a finite number of moves?',
  },

  solution: {
    ru: 'На каждом шаге рассматривается ещё не отсортированный префикс массива размером `size` (изначально - весь массив). В нём находится позиция максимального элемента. Если максимум уже стоит в конце этого префикса - переходим к следующему, уменьшенному префиксу. Иначе выполняются два переворота: сначала переворачивается префикс до позиции максимума (это переносит максимум на самый верх, то есть в начало массива), затем переворачивается весь префикс размера `size` (это переносит максимум с начала прямо на последнюю позицию префикса - его законное место). После этого `size` уменьшается на единицу, и процесс повторяется для оставшейся неотсортированной части.',
    en: 'At each step, the still-unsorted prefix of size `size` (initially the whole array) is examined. The position of its maximum element is found. If the maximum already sits at the end of this prefix, move on to the next, smaller prefix. Otherwise two flips are performed: first, flip the prefix up to the maximum\'s position (this brings the maximum to the very top, i.e., the start of the array); then flip the entire prefix of size `size` (this carries the maximum from the start straight to the last position of the prefix - its rightful place). Then `size` is decreased by one, and the process repeats for the remaining unsorted portion.',
  },

  steps: [
    {
      title: { ru: 'Найти максимум в префиксе', en: 'Find the maximum in the prefix' },
      explanation: {
        ru: 'В ещё не отсортированном префиксе размера size найти позицию наибольшего элемента.',
        en: 'In the still-unsorted prefix of size size, find the position of the largest element.',
      },
    },
    {
      title: { ru: 'Перевернуть до максимума', en: 'Flip up to the maximum' },
      explanation: {
        ru: 'Перевернуть префикс до найденной позиции - максимум оказывается в самом начале массива.',
        en: 'Flip the prefix up to the found position - the maximum ends up at the very start of the array.',
      },
    },
    {
      title: { ru: 'Перевернуть весь текущий префикс', en: 'Flip the whole current prefix' },
      explanation: {
        ru: 'Перевернуть весь префикс размера size - максимум перемещается с начала на своё законное последнее место в этом префиксе.',
        en: 'Flip the entire prefix of size size - the maximum moves from the start to its rightful last place within that prefix.',
      },
    },
    {
      title: { ru: 'Уменьшить границу префикса', en: 'Shrink the prefix boundary' },
      explanation: {
        ru: 'Уменьшить size на единицу - последний элемент теперь на своём месте и больше не рассматривается.',
        en: 'Decrease size by one - the last element is now in place and no longer considered.',
      },
    },
    {
      title: { ru: 'Повторить для остатка', en: 'Repeat for the rest' },
      explanation: {
        ru: 'Процесс повторяется для уменьшенного префикса, пока размер префикса не станет равен единице.',
        en: 'The process repeats for the shrunk prefix until the prefix size reaches one.',
      },
    },
  ],
  stepBreakpoints: [9, 14, 36, 54],

  implementation: {
    javascript: `function pancakeSort(arr) {
  const a = [...arr];
  const n = a.length;

  function flip(k) {
    let lo = 0, hi = k;
    while (lo < hi) {
      [a[lo], a[hi]] = [a[hi], a[lo]];
      lo++;
      hi--;
    }
  }

  for (let size = n; size > 1; size--) {
    let maxIdx = 0;
    for (let i = 1; i < size; i++) {
      if (a[i] > a[maxIdx]) maxIdx = i;
    }
    if (maxIdx !== size - 1) {
      if (maxIdx !== 0) flip(maxIdx);
      flip(size - 1);
    }
  }
  return a;
}`,
    python: `def pancake_sort(arr):
    a = arr.copy()
    n = len(a)

    def flip(k):
        lo, hi = 0, k
        while lo < hi:
            a[lo], a[hi] = a[hi], a[lo]
            lo += 1
            hi -= 1

    for size in range(n, 1, -1):
        max_idx = 0
        for i in range(1, size):
            if a[i] > a[max_idx]:
                max_idx = i
        if max_idx != size - 1:
            if max_idx != 0:
                flip(max_idx)
            flip(size - 1)
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - вся сортировка сводится к повторяющимся вызовам одной вспомогательной операции `flip`.',
          en: 'The function takes a single array `arr` - the whole sort boils down to repeated calls of one helper operation, `flip`.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Копия массива и длина', en: 'Copying the array and its length' },
        explanation: {
          ru: '`const a = [...arr]` копирует вход, чтобы не менять аргумент вызывающего кода; `const n = a.length` запоминает длину для внешнего цикла ниже.',
          en: '`const a = [...arr]` copies the input so the caller\'s argument stays untouched; `const n = a.length` records the length used by the outer loop below.',
        },
      },
      {
        lines: [5, 12],
        title: { ru: 'Вспомогательная функция flip', en: 'The flip helper' },
        explanation: {
          ru: '`flip(k)` - единственная разрешённая операция алгоритма: разворачивает префикс `a[0..k]` через два указателя `lo`/`hi`, сближающихся к середине, меняя элементы местами, пока `lo < hi`.',
          en: '`flip(k)` is the algorithm\'s only permitted operation: it reverses the prefix `a[0..k]` using two pointers, `lo`/`hi`, closing in toward the middle and swapping elements while `lo < hi`.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Границы внешнего цикла', en: 'Outer loop bounds' },
        explanation: {
          ru: '`for (let size = n; size > 1; size--)` уменьшает границу ещё не отсортированного префикса на единицу за итерацию - `size = 1` не требует обработки, единственный элемент уже на своём месте.',
          en: '`for (let size = n; size > 1; size--)` shrinks the still-unsorted prefix boundary by one each iteration - `size = 1` needs no work, a single element is already in place.',
        },
      },
      {
        lines: [15, 18],
        title: { ru: 'Поиск максимума в префиксе', en: 'Finding the maximum in the prefix' },
        explanation: {
          ru: '`maxIdx = 0`, затем цикл `for (let i = 1; i < size; i++)` линейно просматривает весь текущий префикс, обновляя `maxIdx` при каждом большем значении - это ровно `size - 1` сравнений на каждую итерацию, независимо от того, насколько массив уже упорядочен.',
          en: '`maxIdx = 0`, then `for (let i = 1; i < size; i++)` linearly scans the whole current prefix, updating `maxIdx` on every larger value - exactly `size - 1` comparisons per iteration, regardless of how ordered the array already is.',
        },
      },
      {
        lines: [19],
        title: { ru: 'Проверка «уже на месте»', en: 'The "already in place" check' },
        explanation: {
          ru: '`if (maxIdx !== size - 1)` - если максимум уже стоит на последней позиции текущего префикса, оба переворота ниже пропускаются целиком, и итерация завершается без единой операции flip.',
          en: '`if (maxIdx !== size - 1)` - if the maximum already sits at the last position of the current prefix, both flips below are skipped entirely, and the iteration finishes with zero flip operations.',
        },
      },
      {
        lines: [20],
        title: { ru: 'Первый переворот - вывести максимум в начало', en: 'The first flip - bringing the maximum to the front' },
        explanation: {
          ru: '`if (maxIdx !== 0) flip(maxIdx)` - если максимум ещё не на позиции 0, переворот префикса до его позиции ставит его на самое начало массива; если максимум уже на позиции 0, этот переворот не нужен вовсе.',
          en: '`if (maxIdx !== 0) flip(maxIdx)` - if the maximum isn\'t already at position 0, flipping the prefix up to its position puts it at the very front; if it\'s already at position 0, this flip is skipped entirely.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Второй переворот - довести максимум до места', en: 'The second flip - carrying the maximum home' },
        explanation: {
          ru: '`flip(size - 1)` переворачивает весь текущий префикс - максимум, только что оказавшийся на позиции 0, перемещается прямо на последнюю позицию префикса, своё законное место.',
          en: '`flip(size - 1)` reverses the entire current prefix - the maximum, just placed at position 0, moves straight to the prefix\'s last position, its rightful place.',
        },
      },
      {
        lines: [24],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда внешний цикл завершается (`size` дошёл до 1), каждый элемент уже поставлен на своё место одним из предыдущих проходов - `a` возвращается отсортированным.',
          en: 'When the outer loop ends (`size` has reached 1), every element has already been placed by one of the earlier passes - `a` is returned sorted.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - структура идентична JS-версии: вспомогательная функция `flip` и один внешний цикл.',
          en: 'The function takes a single list `arr` - the structure matches the JS version: a `flip` helper plus one outer loop.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Копия списка и длина', en: 'Copying the list and its length' },
        explanation: {
          ru: '`a = arr.copy()` копирует вход, `n = len(a)` запоминает длину - идентично JS.',
          en: '`a = arr.copy()` copies the input, `n = len(a)` records the length - identical to JS.',
        },
      },
      {
        lines: [5, 10],
        title: { ru: 'Вспомогательная функция flip', en: 'The flip helper' },
        explanation: {
          ru: '`flip(k)` разворачивает срез `a[0..k]` теми же двумя сближающимися указателями `lo`/`hi`, что и в JS, только обмен идёт кортежным присваиванием `a[lo], a[hi] = a[hi], a[lo]`.',
          en: '`flip(k)` reverses the `a[0..k]` slice using the same two closing-in pointers, `lo`/`hi`, as JS, just with the swap done via tuple assignment `a[lo], a[hi] = a[hi], a[lo]`.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Границы внешнего цикла', en: 'Outer loop bounds' },
        explanation: {
          ru: '`for size in range(n, 1, -1):` уменьшает границу префикса от `n` до 2 включительно - эквивалент `for (let size = n; size > 1; size--)` в JS.',
          en: '`for size in range(n, 1, -1):` shrinks the prefix boundary from `n` down to 2 inclusive - the equivalent of `for (let size = n; size > 1; size--)` in JS.',
        },
      },
      {
        lines: [13, 16],
        title: { ru: 'Поиск максимума в префиксе', en: 'Finding the maximum in the prefix' },
        explanation: {
          ru: '`max_idx = 0`, затем `for i in range(1, size):` просматривает весь префикс, обновляя `max_idx` - ровно `size - 1` сравнений за итерацию, как в JS.',
          en: '`max_idx = 0`, then `for i in range(1, size):` scans the whole prefix, updating `max_idx` - exactly `size - 1` comparisons per iteration, same as JS.',
        },
      },
      {
        lines: [17],
        title: { ru: 'Проверка «уже на месте»', en: 'The "already in place" check' },
        explanation: {
          ru: '`if max_idx != size - 1:` пропускает оба переворота, если максимум уже стоит на последней позиции текущего префикса.',
          en: '`if max_idx != size - 1:` skips both flips if the maximum already sits at the prefix\'s last position.',
        },
      },
      {
        lines: [18, 19],
        title: { ru: 'Первый переворот - вывести максимум в начало', en: 'The first flip - bringing the maximum to the front' },
        explanation: {
          ru: '`if max_idx != 0: flip(max_idx)` ставит максимум на позицию 0, если он ещё не там - идентично JS.',
          en: '`if max_idx != 0: flip(max_idx)` puts the maximum at position 0 if it isn\'t already there - identical to JS.',
        },
      },
      {
        lines: [20],
        title: { ru: 'Второй переворот - довести максимум до места', en: 'The second flip - carrying the maximum home' },
        explanation: {
          ru: '`flip(size - 1)` переворачивает весь текущий префикс, перенося максимум с позиции 0 на его законное последнее место.',
          en: '`flip(size - 1)` reverses the entire current prefix, carrying the maximum from position 0 to its rightful last place.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда цикл `for size in range(n, 1, -1):` завершается, `a` полностью отсортирован и возвращается.',
          en: 'When the `for size in range(n, 1, -1):` loop ends, `a` is fully sorted and gets returned.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Использует единственную операцию (переворот префикса), что делает его отличным примером сортировки с ограниченным набором разрешённых действий - классическая задача в теории алгоритмов.',
      en: 'Uses a single operation (prefix flip), making it an excellent example of sorting under a restricted set of allowed moves - a classic problem in algorithm theory.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти.',
      en: 'Sorts in place with O(1) extra memory.',
    },
    {
      ru: 'Число переворотов ограничено 2(n-1), что даёт понятную, легко доказуемую верхнюю границу на число операций.',
      en: 'The number of flips is bounded by 2(n-1), giving a clean, easily provable upper bound on the number of operations.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений в среднем и худшем случае - не быстрее обычной сортировки выбором.',
      en: 'O(n²) comparisons on average and worst case - no faster than plain selection sort.',
    },
    {
      ru: 'Неустойчив: переворот префикса меняет относительный порядок равных элементов.',
      en: 'Unstable: flipping a prefix changes the relative order of equal elements.',
    },
    {
      ru: 'Нахождение минимального числа переворотов для сортировки произвольной перестановки («блинная задача», pancake problem) - открытая NP-трудная задача с неизвестной точной формулой; показанный алгоритм даёт лишь простую, но не минимальную по числу переворотов стратегию.',
      en: 'Finding the minimum number of flips to sort an arbitrary permutation (the "pancake problem") is an open, NP-hard problem with no known exact formula; the algorithm shown gives a simple but not flip-minimal strategy.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда единственная доступная операция - это переворот префикса (например, задачи с ограничением на модель вычислений или роботизированные системы, физически способные только «перевернуть верхний блок»).',
      en: 'When the only available operation is a prefix flip (for example, problems with a restricted computation model, or robotic systems that can physically only "flip the top block").',
    },
    {
      ru: 'Как учебный пример для изучения NP-трудной «блинной задачи» и того, как ограниченный набор операций всё ещё позволяет достичь полной сортировки.',
      en: 'As a teaching example for studying the NP-hard "pancake problem" and how a restricted set of operations can still achieve a full sort.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Ранняя статья Билла Гейтса и Христоса Пападимитриу (1979)** предложила алгоритм и оценку числа переворотов для «блинной задачи», ставшую классической в теории алгоритмов.',
      en: '**An early paper by Bill Gates and Christos Papadimitriou (1979)** proposed an algorithm and a bound on the number of flips for the "pancake problem," which became a classic in algorithm theory.',
    },
    {
      ru: '**Перестройка сегментов ДНК в биоинформатике** моделируется похожей задачей о развороте (сортировка перестановок реверсиями) - переворот отрезка последовательности вместо отдельных перестановок элементов.',
      en: '**DNA segment rearrangement in bioinformatics** is modeled by a similar reversal problem (sorting permutations by reversals) - flipping a segment of the sequence rather than swapping individual elements.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проверим числа на конкретном входе - том же массиве `[8, 3, 9, 1, 6, 4, 7, 2, 5]` (n = 9), что используется на вкладке «Визуализация». Симуляция кода с вкладки «Реализация» даёт: **36 сравнений** и **14 переворотов** до полной сортировки.',
        en: 'Let\'s check the numbers on a concrete input - the same array `[8, 3, 9, 1, 6, 4, 7, 2, 5]` (n = 9) used on the "Visualization" tab. Simulating the code from the "Implementation" tab gives: **36 comparisons** and **14 flips** before the array is fully sorted.',
      },
      {
        ru: '36 - это не случайное число: поиск максимума на каждой итерации всегда просматривает весь текущий префикс целиком, независимо от того, насколько массив уже упорядочен. Сумма `8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36` - в точности `n(n-1)/2` для n = 9. Это подтверждается прямым замером: на уже отсортированном `[1..9]` алгоритм тоже делает **ровно 36 сравнений**, хотя не выполняет вообще ни одного переворота (**0 flips**) - максимум всегда уже на месте.',
        en: '36 isn\'t a random number: the maximum search at every iteration always scans the entire current prefix, regardless of how ordered the array already is. The sum `8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36` is exactly `n(n-1)/2` for n = 9. A direct measurement confirms this: on the already-sorted `[1..9]`, the algorithm also makes **exactly 36 comparisons**, despite performing zero flips at all (**0 flips**) - the maximum is always already in place.',
      },
      {
        ru: 'Это значит, что в отличие от многих сортировок сравнением, у блинной сортировки **нет лучшего случая по числу сравнений** - она всегда `Θ(n²)`, а не `O(n)` на отсортированном входе, как у insertion sort или bubble sort с ранним выходом. Причина - на строке 15-18 JS-реализации нет условия для остановки поиска максимума раньше времени, даже если он найден в самом начале префикса.',
        en: 'This means that, unlike many comparison sorts, pancake sort has **no best case in terms of comparisons** - it\'s always `Θ(n²)`, not `O(n)` on sorted input the way insertion sort or bubble sort with an early exit would be. The reason is that lines 15-18 of the JS implementation have no condition to stop the maximum search early, even if it\'s found right at the start of the prefix.',
      },
      {
        ru: 'Число переворотов, наоборот, сильно зависит от входа - и не всегда предсказуемым образом. Развёрнутый массив `[9..1]` кажется «худшим случаем», но даёт всего **1 переворот**: на первой итерации максимум (9) уже стоит на позиции 0, поэтому первый flip пропускается (строка 20), а единственный `flip(size - 1)` разворачивает весь массив целиком - и развёрнутый убывающий массив после одного полного разворота сразу становится отсортированным по возрастанию. Дальше на каждой итерации максимум уже на месте, флипов больше не требуется.',
        en: 'The flip count, by contrast, depends heavily on the input - and not always predictably. The reversed array `[9..1]` looks like a "worst case" but produces just **1 flip**: on the first iteration the maximum (9) already sits at position 0, so the first flip is skipped (line 20), and the single `flip(size - 1)` reverses the whole array at once - a descending array, after one full reversal, becomes ascending and sorted immediately. On every later iteration the maximum is already in place, so no more flips are needed.',
      },
      {
        ru: 'Настоящий худший случай по числу флипов не так очевиден. Полный перебор всех 720 перестановок `[1..6]` (n = 6) находит максимум в **9 переворотов** - например, на входе `[1, 5, 2, 3, 6, 4]` - против теоретической верхней границы `2(n-1) = 10`. Граница `2(n-1)` не достигается на каждом входе, но остаётся верной верхней оценкой: не более двух переворотов на каждую из `n - 1` итераций внешнего цикла.',
        en: 'The actual worst case in flip count isn\'t obvious. An exhaustive search over all 720 permutations of `[1..6]` (n = 6) finds a maximum of **9 flips** - for instance, on the input `[1, 5, 2, 3, 6, 4]` - against the theoretical upper bound `2(n-1) = 10`. The `2(n-1)` bound isn\'t hit on every input, but it remains a valid upper estimate: at most two flips per each of the `n - 1` outer-loop iterations.',
      },
      {
        ru: 'Важно не путать этот `2(n-1)` - верхнюю границу для конкретного жадного алгоритма, показанного здесь, - с открытой **«блинной задачей»** (pancake problem): нахождением минимально возможного числа переворотов для произвольной перестановки любым алгоритмом. Билл Гейтс и Христос Пападимитриу в статье 1979 года улучшили известную на тот момент оценку минимума до `(5n + 5) / 3` переворотов в худшем случае - точная минимальная формула не найдена до сих пор, а для «подгоревшей» версии задачи (pancake flipping with burnt side) она и вовсе доказана NP-трудной.',
        en: 'It\'s important not to confuse this `2(n-1)` - the upper bound for the specific greedy algorithm shown here - with the open **"pancake problem"**: finding the smallest possible number of flips for an arbitrary permutation, by any algorithm. Bill Gates and Christos Papadimitriou\'s 1979 paper improved the then-known minimum-flip bound to `(5n + 5) / 3` in the worst case - the exact minimal formula is still unknown today, and the "burnt pancake" variant of the problem has been proven NP-hard outright.',
      },
      {
        ru: 'Итог: сравнения у блинной сортировки всегда квадратичны по построению (`n(n-1)/2`, не зависит от порядка входа), а переворотов - от нуля (уже отсортированный или, как показано выше, даже полностью развёрнутый вход) до порядка `2n`. Асимптотический класс `O(n²)` определяется именно сравнениями, а не флипами - урок о том, что ограниченный набор разрешённых операций (здесь - только переворот префикса) может сделать структуру сложности алгоритма нетипичной по сравнению с более гибкими сортировками.',
        en: 'The takeaway: pancake sort\'s comparisons are always quadratic by construction (`n(n-1)/2`, independent of input order), while flips range from zero (an already-sorted or, as shown above, even a fully reversed input) to on the order of `2n`. The `O(n²)` asymptotic class is set by the comparisons, not the flips - a lesson in how a restricted set of allowed operations (here, only a prefix flip) can give an algorithm an atypical complexity structure compared to more flexible sorts.',
      },
    ],
    whenToUse: [
      {
        ru: '**Против сортировки выбором** - те же `n(n-1)/2` сравнений и тот же принцип «найти максимум, поставить на место», но выбором элемент переносится одним обменом, а здесь - до двух переворотов; выбирайте pancake sort только когда операция обмена произвольных элементов физически недоступна.',
        en: '**Against selection sort** - the same `n(n-1)/2` comparisons and the same "find the max, place it" principle, but selection sort moves the element with one swap, while this needs up to two flips; pick pancake sort only when swapping arbitrary elements isn\'t physically available.',
      },
      {
        ru: '**Не ожидать лучшего случая на отсортированном входе** - как показано в разборе выше, число сравнений (36 при n = 9) не меняется вообще, независимо от порядка входа; выигрыш от порядка виден только в числе переворотов, а не во времени поиска максимума.',
        en: '**Don\'t expect a best case on sorted input** - as shown in the deep-dive above, the comparison count (36 at n = 9) doesn\'t change at all regardless of input order; any benefit from ordering shows up only in the flip count, not in the maximum-search time.',
      },
      {
        ru: '**Как учебный пример ограниченной модели вычислений** - удобно показывать, что при единственной разрешённой операции (переворот префикса) достижим полный сорт за конечное и ограниченное число шагов, даже без произвольного обмена.',
        en: '**As a teaching example of a restricted computation model** - a convenient way to show that with a single allowed operation (a prefix flip), a full sort is still achievable in a finite, bounded number of steps, even without arbitrary swaps.',
      },
      {
        ru: '**Не путать жадный алгоритм с открытой «блинной задачей»** - если задача требует именно минимального числа переворотов (а не просто корректной сортировки), показанный здесь алгоритм не даёт оптимума; минимизация - отдельная, значительно более сложная NP-трудная задача.',
        en: '**Don\'t confuse the greedy algorithm with the open "pancake problem"** - if the task specifically requires the minimum number of flips (not just a correct sort), the algorithm shown here isn\'t optimal; minimization is a separate, considerably harder NP-hard problem.',
      },
    ],
    realWorld: [
      {
        ru: '**Оценка Гейтса и Пападимитриу `(5n + 5) / 3`** (1979) десятилетиями оставалась одной из наиболее влиятельных верхних границ для минимального числа переворотов в блинной задаче - на неё до сих пор ссылаются как на отправную точку почти все последующие работы по этой теме.',
        en: '**The Gates-Papadimitriou `(5n + 5) / 3` bound** (1979) remained one of the most influential upper bounds on the minimum flip count in the pancake problem for decades - nearly every later paper on the topic still cites it as its starting point.',
      },
      {
        ru: '**«Подгоревшая» блинная задача (burnt pancake problem)**, где каждый блин ещё и имеет сторону (подгоревшую и нет), а переворот меняет их местами, моделирует задачи реверсии со знаком в геномике - обобщение того же приёма переворота сегмента, но с направленностью элементов.',
        en: '**The "burnt pancake problem"**, where each pancake also has a side (burnt or not) and a flip swaps them, models signed reversal problems in genomics - a generalization of the same segment-flip trick, but with directional elements.',
      },
      {
        ru: '**Курсы по теории сложности и NP-трудности** регулярно используют блинную сортировку как доступный, интуитивно понятный вход в понятие "проблема с известным простым алгоритмом, но неизвестной оптимальной границей" - контраст с задачами, где оптимум известен точно (как в сортировке слиянием).',
        en: '**Complexity theory and NP-hardness courses** regularly use pancake sorting as an accessible, intuitive entry point into the idea of "a problem with a known simple algorithm but an unknown optimal bound" - a contrast to problems where the optimum is known exactly (like merge sort).',
      },
      {
        ru: '**Робототехнические и промышленные системы с ограниченным захватом** (например, конвейеры, способные только «перевернуть верхний блок стопки», а не переставить произвольные элементы) - редкий, но реальный класс физических систем, где модель pancake sort соответствует буквальному ограничению оборудования.',
        en: '**Robotic and industrial systems with a restricted gripper** (e.g. conveyors that can only "flip the top block of a stack," not rearrange arbitrary items) - a rare but real class of physical systems where the pancake-sort model matches an actual hardware constraint.',
      },
    ],
  },

  relatedAlgorithms: ['selection-sort', 'cycle-sort'],

  quiz: [
    {
      question: {
        ru: 'Какая единственная операция разрешена в блинной сортировке?',
        en: 'What is the single operation allowed in pancake sort?',
      },
      options: [
        { ru: 'Переворот (flip) префикса массива', en: 'Flipping (reversing) a prefix of the array' },
        { ru: 'Обмен местами двух произвольных элементов', en: 'Swapping two arbitrary elements' },
        { ru: 'Удаление элемента из середины массива', en: 'Removing an element from the middle of the array' },
        { ru: 'Циклический сдвиг всего массива', en: 'Cyclically rotating the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как лопатка переворачивает верхнюю часть стопки блинов, алгоритм может лишь развернуть какой-то начальный отрезок массива.',
        en: 'Just as a spatula flips the top part of a pancake stack, the algorithm can only reverse some leading segment of the array.',
      },
      hint: {
        ru: 'Смотрите вступительный абзац (intent) в самом начале вкладки «Суть» и вспомогательную функцию `flip` (строки 5-12) на вкладке «Реализация».',
        en: 'See the opening (intent) paragraph at the very top of the "Intent" tab and the `flip` helper (lines 5-12) on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем на каждом шаге выполняются два переворота, а не один?',
        en: 'Why are two flips performed at each step instead of one?',
      },
      options: [
        {
          ru: 'Первый переворот доставляет максимум в начало, второй - переносит его на нужное место в конце префикса',
          en: 'The first flip brings the maximum to the start, the second carries it to its correct place at the end of the prefix',
        },
        { ru: 'Один-единственный переворот всегда сортирует весь массив полностью, поэтому второй переворот выполняется лишь для дополнительной проверки итогового результата', en: 'A single flip always sorts the entire array completely on its own, so the second flip is only ever performed to double-check the final result' },
        { ru: 'Второй переворот полностью отменяет действие первого, возвращая массив ровно в то же исходное состояние, в котором он находился перед началом текущего шага', en: 'The second flip completely undoes the effect of the first one, returning the array to exactly the same original state it was in before the current step began' },
        { ru: 'Такая пара переворотов требуется исключительно для массивов с чётным числом элементов, тогда как для массивов с нечётным числом элементов достаточно всего одного переворота', en: 'This pair of flips is only ever required for arrays with an even number of elements, while arrays with an odd count need just a single flip' },
      ],
      correct: 0,
      explanation: {
        ru: 'Переворот префикса может переместить элемент только на позицию 0 или на текущий конец префикса, поэтому максимум сначала выводится в начало, а затем - в конец.',
        en: 'A prefix flip can only move an element to position 0 or to the current end of the prefix, so the maximum is first brought to the start, then to the end.',
      },
      hint: {
        ru: 'Смотрите шаги «Перевернуть до максимума» и «Перевернуть весь текущий префикс» на вкладке «Визуализация» и строки 20-21 функции `pancakeSort` на вкладке «Реализация».',
        en: 'See the "Flip up to the maximum" and "Flip the whole current prefix" steps on the "Visualization" tab and lines 20-21 of `pancakeSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Как называется задача о нахождении минимального числа переворотов для сортировки произвольной перестановки?',
        en: 'What is the problem of finding the minimum number of flips to sort an arbitrary permutation called?',
      },
      options: [
        { ru: 'Блинная задача', en: 'The pancake problem' },
        { ru: 'Задача о рюкзаке', en: 'The knapsack problem' },
        { ru: 'Задача коммивояжёра', en: 'The traveling salesman problem' },
        { ru: 'Задача о раскраске графа', en: 'The graph coloring problem' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это классическая NP-трудная задача, точная минимальная формула для которой до сих пор неизвестна.',
        en: 'This is a classic NP-hard problem for which an exact minimal formula is still unknown.',
      },
      hint: {
        ru: 'Смотрите подраздел «Проблема» на вкладке «Суть» и пятый абзац раздела «Как это работает» там же (пятый абзац объясняет разницу между жадным алгоритмом и открытой задачей).',
        en: 'See the "Problem" subsection on the "Intent" tab and the fifth paragraph of the "How it works" section there (it explains the difference between the greedy algorithm and the open problem).',
      },
    },
    {
      question: {
        ru: 'Является ли блинная сортировка устойчивой (stable)?',
        en: 'Is pancake sort stable?',
      },
      options: [
        { ru: 'Нет - переворот префикса меняет относительный порядок равных элементов', en: 'No - flipping a prefix changes the relative order of equal elements' },
        { ru: 'Да, она всегда полностью сохраняет исходный относительный порядок равных элементов', en: 'Yes, it always fully preserves the original relative order of equal elements' },
        { ru: 'Только в частном случае массивов, вообще не содержащих никаких повторяющихся значений', en: 'Only in the special case of arrays containing no duplicate values whatsoever' },
        { ru: 'Понятие устойчивости вообще не определено и неприменимо для данного конкретного алгоритма', en: 'The concept of stability isn\'t defined or applicable for this particular algorithm at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Разворот сегмента переставляет местами позиции равных элементов внутри него, поэтому исходный относительный порядок теряется.',
        en: 'Reversing a segment swaps the positions of equal elements within it, so their original relative order is lost.',
      },
      hint: {
        ru: 'Смотрите тег `unstable` рядом с названием алгоритма вверху страницы и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the `unstable` tag next to the algorithm name at the top of the page and the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность блинной сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of pancake sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n), как у большинства эффективных сортировок сравнением', en: 'O(n log n), like most efficient comparison sorts' },
        { ru: 'O(n), поскольку каждый элемент перемещается не более одного раза', en: 'O(n), since each element is moved at most once' },
        { ru: 'O(2^n), из-за экспоненциального роста числа возможных переворотов', en: 'O(2^n), due to the exponential growth in the number of possible flips' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поиск максимума в префиксе на каждом из n шагов даёт квадратичное число сравнений, как в сортировке выбором.',
        en: 'Finding the maximum in the prefix at each of the n steps gives a quadratic number of comparisons, just like selection sort.',
      },
      hint: {
        ru: 'Смотрите бейдж «Худший» вверху страницы и второй абзац раздела «Как это работает» на вкладке «Суть» (36 сравнений при n = 9, всегда одинаково).',
        en: 'See the "Worst" complexity badge at the top of the page and the second paragraph of the "How it works" section on the "Intent" tab (36 comparisons at n = 9, always the same).',
      },
    },
    {
      question: {
        ru: 'Какова верхняя граница числа переворотов для сортировки массива из n элементов?',
        en: 'What is the upper bound on the number of flips to sort an array of n elements?',
      },
      options: [
        { ru: '2(n−1)', en: '2(n−1)' },
        { ru: 'n!', en: 'n!' },
        { ru: 'n log n', en: 'n log n' },
        { ru: 'n²', en: 'n²' },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом шаге выполняется не более двух переворотов, а шагов n−1, поэтому верхняя граница - 2(n−1) переворотов.',
        en: 'At each of the n−1 steps at most two flips are made, so the upper bound is 2(n−1) flips.',
      },
      hint: {
        ru: 'Смотрите третий пункт плюсов на вкладке «Плюсы и минусы» и пятый абзац раздела «Как это работает» на вкладке «Суть» (9 из 10 возможных на n = 6).',
        en: 'See the third "Pros" item on the "Pros & Cons" tab and the fifth paragraph of the "How it works" section on the "Intent" tab (9 out of a possible 10 at n = 6).',
      },
    },
    {
      question: {
        ru: 'Что происходит, если максимум уже стоит на последнем месте текущего префикса?',
        en: 'What happens if the maximum is already at the last position of the current prefix?',
      },
      options: [
        { ru: 'Перевороты не выполняются - алгоритм сразу переходит к меньшему префиксу', en: 'No flips are made - the algorithm immediately moves to the smaller prefix' },
        { ru: 'Всё равно выполняется один переворот для проверки правильности положения', en: 'One flip is still made to verify the element is in the correct position' },
        { ru: 'Весь массив переворачивается, чтобы убедиться в его полной отсортированности', en: 'The entire array is flipped to confirm it is fully sorted' },
        { ru: 'Алгоритм переходит к следующей итерации, но увеличивает, а не уменьшает размер префикса', en: 'The algorithm moves to the next iteration but increases rather than decreases the prefix size' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если максимум уже на нужном месте, никаких переворотов не нужно - он уже «уложен» и граница префикса просто уменьшается.',
        en: 'If the maximum is already in place, no flips are needed - it is already "settled" and the prefix boundary simply shrinks.',
      },
      hint: {
        ru: 'Смотрите строку 19 (`if (maxIdx !== size - 1)`) функции `pancakeSort` на вкладке «Реализация» и шаг «Уменьшить границу префикса» на вкладке «Визуализация».',
        en: 'See line 19 (`if (maxIdx !== size - 1)`) of `pancakeSort` on the "Implementation" tab and the "Shrink the prefix boundary" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Как блинная сортировка связана с задачами биоинформатики?',
        en: 'How is pancake sort related to problems in bioinformatics?',
      },
      options: [
        { ru: 'Реверсии сегментов ДНК формально аналогичны сортировке переворотами', en: 'DNA segment rearrangement by reversals is formally analogous to sorting by flips' },
        { ru: 'Алгоритм используется для выравнивания белковых последовательностей в базах данных', en: 'The algorithm is used to align protein sequences in databases' },
        { ru: 'Блинная сортировка применяется для сжатия геномных данных перед хранением', en: 'Pancake sort is applied to compress genomic data before storage' },
        { ru: 'Никакой реальной связи нет - это просто отдалённая метафора без практического значения', en: 'There is no real connection - it is merely a distant metaphor without practical significance' },
      ],
      correct: 0,
      explanation: {
        ru: 'В геномике хромосомные перестройки моделируются реверсиями сегментов последовательности, что математически идентично задаче блинной сортировки.',
        en: 'In genomics, chromosomal rearrangements are modeled as reversals of sequence segments, which is mathematically identical to the pancake sorting problem.',
      },
      hint: {
        ru: 'Смотрите второй пункт раздела «Примеры из практики» на вкладке «Суть» и второй пункт раздела «Примеры в коде» (углублённого) там же.',
        en: 'See the second item in the "Real-world examples" section on the "Intent" tab and the second item in the extended "Real-world" section there.',
      },
    },
    {
      question: {
        ru: 'Чем блинная сортировка концептуально похожа на сортировку выбором?',
        en: 'How is pancake sort conceptually similar to selection sort?',
      },
      options: [
        { ru: 'Оба находят максимум в неотсортированной части и помещают его на нужное место', en: 'Both find the maximum in the unsorted part at each step and place it in its correct position' },
        { ru: 'Оба используют переворот префикса как единственную разрешённую операцию над массивом', en: 'Both use a prefix flip as the only allowed operation on the array, never swapping arbitrary elements' },
        { ru: 'Оба устойчивы и сортируют за O(n log n) в лучшем случае на упорядоченных данных', en: 'Both are stable and sort in O(n log n) in the best case on ordered data' },
        { ru: 'Оба используют случайный выбор опорного элемента для ускорения сортировки', en: 'Both use random pivot selection to speed up the sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма последовательно помещают максимальный элемент неотсортированной части на его законное место; разница лишь в том, как именно он туда доставляется.',
        en: 'Both algorithms successively place the unsorted portion\'s maximum at its rightful position; the difference is only in how it is delivered there.',
      },
      hint: {
        ru: 'Смотрите шаг «Найти максимум в префиксе» на вкладке «Визуализация» и раздел «Похожие алгоритмы» внизу страницы (`selection-sort` в списке).',
        en: 'See the "Find the maximum in the prefix" step on the "Visualization" tab and the "Related algorithms" section at the bottom of the page (`selection-sort` in the list).',
      },
    },
    {
      question: {
        ru: 'Кто из известных учёных написал раннюю статью о блинной задаче?',
        en: 'Which well-known figure co-authored an early paper on the pancake problem?',
      },
      options: [
        { ru: 'Билл Гейтс', en: 'Bill Gates' },
        { ru: 'Дональд Кнут', en: 'Donald Knuth' },
        { ru: 'Тони Хоар', en: 'Tony Hoare' },
        { ru: 'Джон фон Нейман', en: 'John von Neumann' },
      ],
      correct: 0,
      explanation: {
        ru: 'Билл Гейтс и Христос Пападимитриу опубликовали статью о блинной задаче в 1979 году - это единственная научная публикация Гейтса.',
        en: 'Bill Gates and Christos Papadimitriou published a paper on the pancake problem in 1979 - it is Gates\'s only academic publication.',
      },
      hint: {
        ru: 'Смотрите первый пункт раздела «Примеры из практики» на вкладке «Суть» и шестой абзац раздела «Как это работает» (углублённого) там же.',
        en: 'See the first item in the "Real-world examples" section on the "Intent" tab and the sixth paragraph of the extended "How it works" section there.',
      },
    },
  ],
};

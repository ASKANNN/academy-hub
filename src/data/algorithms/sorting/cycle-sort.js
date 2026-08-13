export const cycleSort = {
  slug: 'cycle-sort',
  category: 'sorting',
  name: { ru: 'Cycle Sort', en: 'Cycle Sort' },
  complexity: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable', 'minimizes-writes'],

  intent: {
    ru: 'Циклическая сортировка находит для каждого элемента его финальную позицию в отсортированном массиве и переставляет элементы по циклам так, чтобы каждый элемент был записан ровно один раз.',
    en: 'Cycle sort finds each element\'s final position in the sorted array and rotates elements through cycles so that each element is written exactly once.',
  },

  problem: {
    ru: 'На флеш-памяти, EEPROM или в системах, где каждая запись стоит дорого (ограниченный ресурс перезаписи, дорогая операция ввода-вывода), важно не количество сравнений, а количество записей. Большинство сортировок делают O(n log n) или O(n²) записей - нужен алгоритм, который сортирует массив с теоретически минимальным числом записей.',
    en: 'On flash memory, EEPROM, or in systems where each write is expensive (limited write endurance, costly I/O), what matters isn\'t the number of comparisons but the number of writes. Most sorts perform O(n log n) or O(n²) writes - an algorithm is needed that sorts with the theoretically minimal number of writes.',
  },

  solution: {
    ru: 'Для каждой позиции i вычисляется, сколько элементов массива меньше a[i] - это и есть правильная позиция элемента в отсортированном массиве. Если элемент уже на своём месте, он пропускается без записи. Иначе элемент записывается на верную позицию, а элемент, который там был, вытесняется и ищет уже свою правильную позицию - так образуется «цикл» перестановок, который завершается, когда вытесненный элемент возвращается в исходную точку. Каждый элемент внутри цикла записывается ровно один раз - общее число записей равно n минус число уже правильно стоящих элементов, что является теоретическим минимумом.',
    en: 'For each position i, the algorithm computes how many array elements are less than a[i] - that is the element\'s correct position in the sorted array. If the element is already in place, it is skipped without a write. Otherwise, the element is written to its correct position, and whatever element was there gets displaced and looks for its own correct position - forming a "cycle" of rotations that closes when the displaced element returns to its starting point. Each element within a cycle is written exactly once - the total write count equals n minus the number of already-correct elements, the theoretical minimum.',
  },

  steps: [
    {
      title: { ru: 'Начать цикл с позиции i', en: 'Start a cycle at position i' },
      explanation: {
        ru: 'Взять элемент на позиции i и посчитать, сколько элементов массива меньше него - это его правильная позиция.',
        en: 'Take the element at position i and count how many array elements are smaller - that is its correct position.',
      },
    },
    {
      title: { ru: 'Пропустить, если элемент уже на месте', en: 'Skip if the element is already in place' },
      explanation: {
        ru: 'Если правильная позиция совпадает с текущей, перейти к следующей позиции без записи.',
        en: 'If the correct position matches the current one, move to the next position without a write.',
      },
    },
    {
      title: { ru: 'Записать элемент на правильную позицию', en: 'Write the element to its correct position' },
      explanation: {
        ru: 'Поменять элемент местами с тем, что стоит на его правильной позиции - вытесненный элемент теперь нужно пристроить.',
        en: 'Swap the element with whatever occupies its correct position - the displaced element now needs to be placed too.',
      },
    },
    {
      title: { ru: 'Продолжить цикл для вытесненного элемента', en: 'Continue the cycle for the displaced element' },
      explanation: {
        ru: 'Повторить процесс для вытесненного элемента: найти его правильную позицию и записать туда.',
        en: 'Repeat the process for the displaced element: find its correct position and write it there.',
      },
    },
    {
      title: { ru: 'Замкнуть цикл', en: 'Close the cycle' },
      explanation: {
        ru: 'Цикл завершается, когда вытесненный элемент возвращается на позицию i - тогда переходим к следующей начальной позиции.',
        en: 'The cycle closes when the displaced element returns to position i - then move on to the next starting position.',
      },
    },
  ],
  stepBreakpoints: [9, 36, 64, 87],

  implementation: {
    javascript: `function cycleSort(arr) {
  const a = [...arr];
  const n = a.length;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = a[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < n; i++) {
      if (a[i] < item) pos++;
    }
    if (pos === cycleStart) continue;

    while (item === a[pos]) pos++;
    [a[pos], item] = [item, a[pos]];

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (a[i] < item) pos++;
      }
      while (item === a[pos]) pos++;
      [a[pos], item] = [item, a[pos]];
    }
  }
  return a;
}`,
    python: `def cycle_sort(arr):
    a = arr.copy()
    n = len(a)

    for cycle_start in range(n - 1):
        item = a[cycle_start]
        pos = cycle_start

        for i in range(cycle_start + 1, n):
            if a[i] < item:
                pos += 1
        if pos == cycle_start:
            continue

        while item == a[pos]:
            pos += 1
        a[pos], item = item, a[pos]

        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, n):
                if a[i] < item:
                    pos += 1
            while item == a[pos]:
                pos += 1
            a[pos], item = item, a[pos]

    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - вся логика циклов и подсчёта позиций живёт внутри, дополнительных параметров не требуется.',
          en: 'The function takes a single array `arr` - all the cycle and position-counting logic lives inside, no extra parameters needed.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Копия массива и длина', en: 'Copying the array and its length' },
        explanation: {
          ru: '`const a = [...arr]` копирует вход, чтобы не менять аргумент вызывающего кода, `n` сохраняет длину для использования в циклах ниже.',
          en: '`const a = [...arr]` copies the input so the caller\'s argument stays untouched, `n` stores the length for use in the loops below.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Внешний цикл по стартам циклов', en: 'The outer loop over cycle starts' },
        explanation: {
          ru: '`for (let cycleStart = 0; cycleStart < n - 1; cycleStart++)` перебирает каждую позицию как потенциальное начало цикла перестановок - до `n - 1`, а не `n`, потому что если все элементы кроме последнего на своих местах, последний обязан быть тоже на своём.',
          en: '`for (let cycleStart = 0; cycleStart < n - 1; cycleStart++)` walks every position as a potential cycle start - up to `n - 1`, not `n`, because if every element except the last is in place, the last one must be in place too.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Элемент и предполагаемая позиция', en: 'The element and its assumed position' },
        explanation: {
          ru: '`item` запоминает значение на старте цикла, `pos` инициализируется текущей позицией и будет скорректирован ниже до настоящей правильной позиции элемента.',
          en: '`item` remembers the value at the start of the cycle, `pos` is initialized to the current position and will be corrected below to the element\'s true correct position.',
        },
      },
      {
        lines: [9, 11],
        title: { ru: 'Подсчёт правильной позиции', en: 'Counting the correct position' },
        explanation: {
          ru: 'Вложенный цикл проходит все элементы после `cycleStart` и увеличивает `pos` на каждый, который меньше `item` - итоговый `pos` равен числу меньших элементов, то есть индексу, который `item` должен занимать в отсортированном массиве.',
          en: 'The nested loop walks every element after `cycleStart` and bumps `pos` for each one smaller than `item` - the final `pos` equals the count of smaller elements, i.e. the index `item` must occupy in the sorted array.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Пропуск уже верной позиции', en: 'Skipping an already-correct position' },
        explanation: {
          ru: '`if (pos === cycleStart) continue` - если вычисленная позиция совпадает с текущей, элемент уже на месте, никакой записи не требуется, и цикл переходит к следующему `cycleStart` без единой записи в массив.',
          en: '`if (pos === cycleStart) continue` - if the computed position matches the current one, the element is already in place, no write happens, and the loop moves to the next `cycleStart` with zero array writes.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Пропуск дубликатов', en: 'Skipping duplicates' },
        explanation: {
          ru: '`while (item === a[pos]) pos++` сдвигает `pos` вперёд, пока там стоит значение, равное `item` - без этого элемент попытался бы записаться поверх своего же дубликата, который уже правильно расположен.',
          en: '`while (item === a[pos]) pos++` advances `pos` past any value equal to `item` - without this, the element would try to write over its own duplicate that\'s already correctly placed.',
        },
      },
      {
        lines: [15],
        title: { ru: 'Первая запись цикла', en: 'The cycle\'s first write' },
        explanation: {
          ru: '`[a[pos], item] = [item, a[pos]]` меняет местами `item` и то, что стояло на позиции `pos` - это единственная запись, которую элемент, стартовавший цикл, делает за весь алгоритм; вытесненное значение продолжает цикл в переменной `item`.',
          en: '`[a[pos], item] = [item, a[pos]]` swaps `item` with whatever was at `pos` - this is the only write the cycle-starting element ever makes; the displaced value carries the cycle forward in the `item` variable.',
        },
      },
      {
        lines: [17, 21],
        title: { ru: 'Продолжение цикла', en: 'Continuing the cycle' },
        explanation: {
          ru: '`while (pos !== cycleStart)` повторяет процесс для вытесненного `item`: `pos` сбрасывается обратно к `cycleStart`, и внутренний цикл пересчитывает, сколько элементов меньше нового `item` - находя уже его собственную правильную позицию.',
          en: '`while (pos !== cycleStart)` repeats the process for the displaced `item`: `pos` resets to `cycleStart`, and the inner loop recomputes how many elements are smaller than the new `item` - finding its own correct position.',
        },
      },
      {
        lines: [22, 23],
        title: { ru: 'Пропуск дубликатов и запись в цикле', en: 'Skipping duplicates and writing inside the cycle' },
        explanation: {
          ru: 'Та же защита от дубликатов, что и на строке 14, и та же перестановка, что и на строке 15 - цикл продолжается, пока `pos` снова не станет равным `cycleStart`, то есть пока цепочка не замкнётся.',
          en: 'Same duplicate guard as line 14, same swap as line 15 - the cycle continues until `pos` equals `cycleStart` again, i.e. until the chain closes.',
        },
      },
      {
        lines: [26],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После обработки всех стартовых позиций `a` полностью отсортирован - каждый элемент был записан не более одного раза за всё время выполнения.',
          en: 'After all starting positions are processed, `a` is fully sorted - every element was written at most once during the entire run.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, вся логика находится внутри функции.',
          en: 'The function takes a single list `arr` - just like the JS version, all logic lives inside the function.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Копия списка и длина', en: 'Copying the list and its length' },
        explanation: {
          ru: '`a = arr.copy()` копирует вход, `n = len(a)` сохраняет длину - идентично JS-версии.',
          en: '`a = arr.copy()` copies the input, `n = len(a)` stores the length - identical to the JS version.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Внешний цикл по стартам циклов', en: 'The outer loop over cycle starts' },
        explanation: {
          ru: '`for cycle_start in range(n - 1):` - то же ограничение `n - 1`, что и в JS: последняя позиция не нуждается в отдельной проверке.',
          en: '`for cycle_start in range(n - 1):` - the same `n - 1` bound as JS: the last position never needs a separate check.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Элемент и предполагаемая позиция', en: 'The element and its assumed position' },
        explanation: {
          ru: '`item = a[cycle_start]` и `pos = cycle_start` - те же роли переменных, что и в JS-версии.',
          en: '`item = a[cycle_start]` and `pos = cycle_start` - the same variable roles as the JS version.',
        },
      },
      {
        lines: [9, 11],
        title: { ru: 'Подсчёт правильной позиции', en: 'Counting the correct position' },
        explanation: {
          ru: '`for i in range(cycle_start + 1, n): if a[i] < item: pos += 1` считает элементы меньше `item` после текущей позиции - результат `pos` и есть целевой индекс `item`.',
          en: '`for i in range(cycle_start + 1, n): if a[i] < item: pos += 1` counts elements smaller than `item` after the current position - the resulting `pos` is `item`\'s target index.',
        },
      },
      {
        lines: [12, 13],
        title: { ru: 'Пропуск уже верной позиции', en: 'Skipping an already-correct position' },
        explanation: {
          ru: '`if pos == cycle_start: continue` - если позиция не изменилась, элемент уже стоит верно, записи не будет.',
          en: '`if pos == cycle_start: continue` - if the position didn\'t change, the element is already correct, no write happens.',
        },
      },
      {
        lines: [15, 16],
        title: { ru: 'Пропуск дубликатов', en: 'Skipping duplicates' },
        explanation: {
          ru: '`while item == a[pos]: pos += 1` сдвигает `pos` мимо равных значений - без этого элемент переписал бы свой же дубликат, уже стоящий правильно.',
          en: '`while item == a[pos]: pos += 1` moves `pos` past equal values - without this the element would overwrite its own already-correct duplicate.',
        },
      },
      {
        lines: [17],
        title: { ru: 'Первая запись цикла', en: 'The cycle\'s first write' },
        explanation: {
          ru: '`a[pos], item = item, a[pos]` - кортежное присваивание Python меняет местами `item` и содержимое `a[pos]` за один шаг, эквивалент строки 15 в JS-версии.',
          en: '`a[pos], item = item, a[pos]` - Python\'s tuple assignment swaps `item` and the contents of `a[pos]` in one step, equivalent to line 15 of the JS version.',
        },
      },
      {
        lines: [19, 23],
        title: { ru: 'Продолжение цикла', en: 'Continuing the cycle' },
        explanation: {
          ru: '`while pos != cycle_start:` сбрасывает `pos` обратно к `cycle_start` и пересчитывает целевую позицию для вытесненного `item` - тот же механизм, что в JS-версии.',
          en: '`while pos != cycle_start:` resets `pos` back to `cycle_start` and recomputes the target position for the displaced `item` - same mechanism as the JS version.',
        },
      },
      {
        lines: [24, 26],
        title: { ru: 'Пропуск дубликатов и запись в цикле', en: 'Skipping duplicates and writing inside the cycle' },
        explanation: {
          ru: 'Та же защита от дубликатов и та же перестановка, что и выше - цикл продолжается, пока `pos` не вернётся к `cycle_start`.',
          en: 'Same duplicate guard and same swap as above - the cycle continues until `pos` returns to `cycle_start`.',
        },
      },
      {
        lines: [28],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После обработки всех стартовых позиций `a` возвращается полностью отсортированным.',
          en: 'After all starting positions are processed, `a` is returned fully sorted.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Теоретически минимальное число записей в массив - каждый элемент записывается не более одного раза за весь алгоритм.',
      en: 'Theoretically minimal number of array writes - each element is written at most once during the entire algorithm.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти.',
      en: 'Sorts in place with O(1) extra memory.',
    },
    {
      ru: 'Незаменим там, где запись физически дороже чтения (флеш-память, EEPROM с ограниченным ресурсом циклов перезаписи).',
      en: 'Invaluable where writes are physically more expensive than reads (flash memory, EEPROM with limited write-cycle endurance).',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений даже в лучшем случае - на большинстве современных процессоров вычисления дешевле записи, поэтому этот компромисс редко оправдан вне embedded-систем.',
      en: 'O(n²) comparisons even in the best case - on most modern CPUs, computation is cheaper than writes, so this tradeoff rarely pays off outside embedded systems.',
    },
    {
      ru: 'Неустойчив - не сохраняет относительный порядок равных элементов.',
      en: 'Not stable - doesn\'t preserve the relative order of equal elements.',
    },
    {
      ru: 'Существенно медленнее quicksort/mergesort по общему времени выполнения на обычном железе.',
      en: 'Significantly slower than quicksort/merge sort in total runtime on typical hardware.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортировка происходит во флеш-памяти или EEPROM, где важно минимизировать число циклов записи.',
      en: 'When sorting happens on flash memory or EEPROM, where minimizing write cycles matters.',
    },
    {
      ru: 'В embedded-системах, где запись в память энергозатратна или физически ограничена по ресурсу.',
      en: 'In embedded systems where writing to memory is power-costly or physically limited in endurance.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Прошивки embedded-устройств** - сортировка конфигурационных данных прямо во флеш-памяти микроконтроллера с ограниченным числом циклов перезаписи.',
      en: '**Embedded device firmware** - sorting configuration data directly in a microcontroller\'s flash memory with a limited number of rewrite cycles.',
    },
    {
      ru: '**Задача «найти недостающее/дублирующееся число»** - циклическая сортировка часто используется как приём для задач с числами в диапазоне [1, n] за O(n) времени и O(1) памяти.',
      en: '**"Find the missing/duplicate number" problems** - cycle sort\'s technique is often reused as a trick for problems with numbers in range [1, n] in O(n) time and O(1) space.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Возьмём массив `[5, 1, 4, 2, 3]` (n = 5) - ни один элемент не стоит на своём месте. `item = 5`, вложенный цикл находит 4 элемента меньше пяти среди `[1, 4, 2, 3]`, значит `pos = 4`. Запись `a[4] = 5` вытесняет тройку - **это первая из пяти записей алгоритма**.',
        en: 'Take the array `[5, 1, 4, 2, 3]` (n = 5) - no element is in its correct spot. `item = 5`, the inner loop finds 4 elements smaller than five among `[1, 4, 2, 3]`, so `pos = 4`. The write `a[4] = 5` displaces the 3 - **the first of the algorithm\'s five writes**.',
      },
      {
        ru: 'Вытесненная тройка продолжает цикл: среди `[1, 4, 2]` (позиции 1-3) меньше трёх - `1` и `2`, значит `pos = 2`. Запись на позицию 2 вытесняет `4`. Дальше `4` находит `pos = 3` (три элемента: `1, 3, 2` меньше него), вытесняет `2`. `2` находит `pos = 1`, вытесняет `1`. Наконец `1` находит `pos = 0`, замыкая цикл записью на стартовую позицию.',
        en: 'The displaced 3 continues the cycle: among `[1, 4, 2]` (positions 1-3), the elements smaller than 3 are `1` and `2`, so `pos = 2`. The write at position 2 displaces `4`. Next `4` finds `pos = 3` (three elements `1, 3, 2` are smaller), displacing `2`. `2` finds `pos = 1`, displacing `1`. Finally `1` finds `pos = 0`, closing the cycle with a write to the starting position.',
      },
      {
        ru: 'Итог: `5 → позиция 4`, `3 → позиция 2`, `4 → позиция 3`, `2 → позиция 1`, `1 → позиция 0` - **ровно 5 записей на 5 элементов**, ни одной лишней. Массив стал `[1, 2, 3, 4, 5]` за один проход одного цикла, охватившего все позиции - это и есть теоретический минимум: каждый неправильно стоящий элемент пишется ровно один раз.',
        en: 'The result: `5 → position 4`, `3 → position 2`, `4 → position 3`, `2 → position 1`, `1 → position 0` - **exactly 5 writes for 5 elements**, not one extra. The array becomes `[1, 2, 3, 4, 5]` in a single cycle spanning every position - this is the theoretical minimum: every out-of-place element gets written exactly once.',
      },
      {
        ru: 'Сравним с частично отсортированным входом `[3, 1, 2, 4]` (n = 4). Цикл, стартующий на позиции 0, охватывает только три элемента: `3 → позиция 2`, `2 → позиция 1`, `1 → позиция 0` - **3 записи**. Позиции 1 и 2 при повторной проверке (`cycleStart = 1, 2`) оказываются уже верными и пропускаются без единой записи, а позиция 3 (`4`) вообще не проверяется - алгоритм доходит только до `n - 2` включительно.',
        en: 'Compare this with the partially sorted input `[3, 1, 2, 4]` (n = 4). The cycle starting at position 0 covers only three elements: `3 → position 2`, `2 → position 1`, `1 → position 0` - **3 writes**. Positions 1 and 2, re-checked as `cycleStart = 1, 2`, turn out already correct and are skipped with zero writes, while position 3 (`4`) is never even checked - the algorithm only runs up to `n - 2`.',
      },
      {
        ru: 'Для сравнения: сортировка выбором на этом же входе `[5, 1, 4, 2, 3]` делает до 4 обменов (по одному на позицию, кроме последней), а каждый обмен через временную переменную - это 3 записи, то есть **до 12 записей** против 5 у циклической сортировки. Разница растёт линейно с n: cycle sort пишет не более n раз, а selection sort - до 3(n - 1) раз.',
        en: 'For comparison: selection sort on the same input `[5, 1, 4, 2, 3]` makes up to 4 swaps (one per position except the last), and each swap via a temporary variable costs 3 writes - **up to 12 writes** versus cycle sort\'s 5. The gap grows linearly with n: cycle sort writes at most n times, selection sort up to 3(n - 1) times.',
      },
      {
        ru: 'Цена этой экономии - подсчёт правильной позиции. Для каждого элемента цикла алгоритм пересчитывает, сколько элементов меньше него, проходя оставшуюся часть массива заново - **O(n) сравнений на каждую запись**, откуда и берётся общая сложность O(n²), даже когда реальных записей требуется мало.',
        en: 'The price of this savings is position counting. For every element in a cycle, the algorithm recomputes how many elements are smaller by re-scanning the rest of the array - **O(n) comparisons per write**, which is where the overall O(n²) complexity comes from, even when few actual writes are needed.',
      },
      {
        ru: 'Циклическую сортировку впервые описали в контексте задач с минимизацией числа записей в связи с ранними системами хранения данных, где физическая запись была на порядки дороже чтения; сегодня та же логика применяется к флеш-памяти и EEPROM, ресурс перезаписи которых ограничен десятками-сотнями тысяч циклов на ячейку.',
        en: 'Cycle sort was first described in the context of write-minimization problems tied to early storage systems, where a physical write was orders of magnitude more expensive than a read; today the same logic applies to flash memory and EEPROM, whose per-cell write endurance is limited to tens or hundreds of thousands of cycles.',
      },
      {
        ru: 'Итог: cycle sort - это не «быстрая» сортировка в привычном смысле, а сортировка с гарантированно минимальным числом записей ценой O(n²) сравнений. Там, где записи дёшевы (обычная RAM), этот обмен невыгоден; там, где записи дороги (флеш-память), он становится единственным разумным выбором среди алгоритмов сравнения.',
        en: 'The takeaway: cycle sort isn\'t "fast" in the usual sense - it\'s a sort with a guaranteed-minimal write count at the cost of O(n²) comparisons. Where writes are cheap (ordinary RAM), that trade doesn\'t pay off; where writes are expensive (flash memory), it becomes the only sensible choice among comparison-based sorts.',
      },
    ],
    whenToUse: [
      {
        ru: '**Вместо selection sort, когда важны именно записи** - оба алгоритма делают O(n²) сравнений, но cycle sort пишет до 3 раз реже (n записей против до 3(n-1) у selection sort через временную переменную).',
        en: '**Instead of selection sort when writes specifically matter** - both make O(n²) comparisons, but cycle sort writes up to 3x less (n writes versus up to 3(n-1) for selection sort via a temp variable).',
      },
      {
        ru: '**На носителях с ограниченным ресурсом перезаписи** - флеш-память, EEPROM, где счётчик циклов записи на ячейку исчерпаем и его превышение выводит ячейку из строя.',
        en: '**On media with limited write endurance** - flash memory, EEPROM, where the per-cell write-cycle counter is finite and exceeding it disables the cell.',
      },
      {
        ru: '**Против merge sort/quicksort - когда n велико и данные в обычной RAM** - там O(n log n) сравнивающие сортировки почти всегда быстрее по общему времени, потому что запись на современном CPU почти так же дешева, как чтение.',
        en: '**Against merge sort/quicksort - when n is large and data sits in ordinary RAM** - there, O(n log n) comparison sorts almost always win on total time, because on a modern CPU a write is nearly as cheap as a read.',
      },
      {
        ru: '**Для задач с числами в диапазоне [1, n] без дубликатов** - тот же приём «поставь элемент на позицию, равную его значению» решает задачи поиска пропущенного или дублирующегося числа за O(n) времени и O(1) памяти, даже если финальная сортировка не нужна.',
        en: '**For problems with numbers in range [1, n] without duplicates** - the same "place the element at the index matching its value" trick solves missing-number or duplicate-number problems in O(n) time and O(1) space, even when a full sort isn\'t needed.',
      },
    ],
    realWorld: [
      {
        ru: '**Прошивки счётчиков и логгеров на EEPROM** - сортировка небольших массивов калибровочных или журнальных данных прямо в энергонезависимой памяти, где производитель гарантирует лишь ограниченное число циклов перезаписи на ячейку.',
        en: '**Firmware for EEPROM-based counters and loggers** - sorting small arrays of calibration or log data directly in non-volatile memory, where the manufacturer guarantees only a limited number of rewrite cycles per cell.',
      },
      {
        ru: '**Задачи вида LeetCode "Find All Duplicates/Missing Number"** - приём цикличесской сортировки (placement by value) - стандартное O(n)/O(1) решение, регулярно встречающееся в подборках по темам "массивы" и "сортировка на месте".',
        en: '**LeetCode-style "Find All Duplicates/Missing Number" problems** - the cycle-sort placement-by-value trick is the standard O(n)/O(1) solution, a recurring entry in "arrays" and "in-place sorting" problem sets.',
      },
      {
        ru: '**Курсы по алгоритмам, посвящённые метрикам сложности за пределами счёта сравнений** - cycle sort часто приводится как контрпример к интуиции «меньше операций - всегда быстрее»: он минимизирует записи ценой сравнений, показывая, что модель стоимости имеет значение.',
        en: '**Algorithms courses covering complexity metrics beyond comparison counts** - cycle sort is often used as a counterexample to the intuition "fewer operations is always faster": it minimizes writes at the cost of comparisons, showing that the cost model matters.',
      },
      {
        ru: '**Встраиваемые системы с батарейным питанием** - минимизация записей во флеш-память снижает энергопотребление отдельно от вопроса износа, что важно для устройств с ограниченным ресурсом батареи (датчики IoT, носимая электроника).',
        en: '**Battery-powered embedded systems** - minimizing flash writes reduces power draw separately from the wear-leveling question, which matters for battery-constrained devices (IoT sensors, wearables).',
      },
    ],
  },

  relatedAlgorithms: ['selection-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что минимизирует циклическая сортировка по сравнению с другими алгоритмами сортировки?',
        en: 'What does cycle sort minimize compared to other sorting algorithms?',
      },
      options: [
        { ru: 'Число записей в массив', en: 'The number of array writes' },
        { ru: 'Число сравнений между элементами массива', en: 'The number of comparisons between array elements' },
        { ru: 'Используемую дополнительную память сверх исходного массива', en: 'The extra memory used beyond the original array' },
        { ru: 'Глубину рекурсии при вызовах функции', en: 'The recursion depth across function calls' },
      ],
      correct: 0,
      explanation: {
        ru: 'Циклическая сортировка жертвует числом сравнений (O(n²)) ради теоретически минимального числа записей - каждый элемент пишется не более одного раза.',
        en: 'Cycle sort sacrifices comparison count (O(n²)) for a theoretically minimal write count - each element is written at most once.',
      },
      hint: {
        ru: 'Смотрите первый пункт плюсов на вкладке «Плюсы и минусы» и пятый абзац раздела «Глубже» с числами 5 против 12 записей.',
        en: 'See the first "Pros" item on the "Pros & Cons" tab and the fifth "Deep dive" paragraph with the 5-versus-12 write count.',
      },
    },
    {
      question: {
        ru: 'Почему циклическая сортировка особенно полезна на флеш-памяти?',
        en: 'Why is cycle sort especially useful on flash memory?',
      },
      options: [
        {
          ru: 'Флеш-память имеет ограниченный ресурс циклов перезаписи, а запись физически дороже чтения',
          en: 'Flash memory has limited write-cycle endurance, and writes are physically more expensive than reads',
        },
        { ru: 'Флеш-память в принципе не поддерживает чтение произвольного доступа, а только строго последовательное чтение данных', en: 'Flash memory doesn\'t support random-access reads at all, only strictly sequential reads of the data' },
        { ru: 'Циклическая сортировка вообще не использует сравнения, полагаясь только на хеширование значений', en: 'Cycle sort doesn\'t use comparisons at all, relying only on hashing the values instead' },
        { ru: 'Это единственный известный человечеству алгоритм, который вообще умеет сортировать отдельные байты', en: 'It\'s the only algorithm known to humanity that can sort individual bytes at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Минимизация записей напрямую продлевает срок службы флеш-памяти и снижает энергопотребление - то, за что другие алгоритмы не оптимизируют.',
        en: 'Minimizing writes directly extends flash memory lifespan and reduces power consumption - something other algorithms don\'t optimize for.',
      },
      hint: {
        ru: 'Смотрите третий пункт плюсов на вкладке «Плюсы и минусы» и первый пункт раздела «В реальном мире» (расширенного, на вкладке «Суть») про прошивки на EEPROM.',
        en: 'See the third "Pros" item on the "Pros & Cons" tab and the first extended "Real world" item on the "Intent" tab about EEPROM firmware.',
      },
    },
    {
      question: {
        ru: 'Как циклическая сортировка находит правильную позицию элемента без вспомогательных структур?',
        en: 'How does cycle sort find an element\'s correct position without auxiliary structures?',
      },
      options: [
        {
          ru: 'Подсчитывает, сколько элементов в массиве меньше данного',
          en: 'It counts how many elements in the array are smaller than the given one',
        },
        { ru: 'Использует бинарный поиск по заранее отсортированной вспомогательной копии массива', en: 'It uses binary search on a pre-sorted auxiliary copy of the array' },
        { ru: 'Строит хеш-таблицу значений и их будущих индексов заранее', en: 'It builds a hash table mapping values to their future indices in advance' },
        { ru: 'Запрашивает правильную позицию у пользователя через ввод данных', en: 'It asks the user for the correct position via input' },
      ],
      correct: 0,
      explanation: {
        ru: 'Число элементов меньше данного равно числу позиций перед ним в отсортированном порядке - это и есть его целевой индекс.',
        en: 'The count of smaller elements equals the number of positions before it in sorted order - that is exactly its target index.',
      },
      hint: {
        ru: 'Смотрите строки 9-11 функции `cycleSort` на вкладке «Реализация» (подсчёт `pos`) и шаг «Начать цикл с позиции i» на вкладке «Визуализация».',
        en: 'See lines 9-11 of `cycleSort` on the "Implementation" tab (the `pos` count) and the "Start a cycle at position i" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Почему циклическая сортировка редко используется вне embedded-систем?',
        en: 'Why is cycle sort rarely used outside embedded systems?',
      },
      options: [
        {
          ru: 'На обычном железе вычисления дешевле записи, а O(n²) сравнений делает её медленнее quicksort/mergesort',
          en: 'On typical hardware, computation is cheaper than writes, and O(n²) comparisons make it slower than quicksort/merge sort',
        },
        { ru: 'Она требует O(n) дополнительной памяти на каждый отдельный вызов функции сортировки, что делает её совершенно непрактичной для встраиваемых систем', en: 'It requires O(n) extra memory on every single call to the sort function, which makes it completely impractical for embedded systems' },
        { ru: 'Она в принципе не умеет работать с целыми числами и требует исключительно чисел с плавающей точкой для всего', en: 'It fundamentally can\'t work with integers and requires floating-point numbers exclusively for everything' },
        { ru: 'Она никогда не была опубликована в открытом доступе и известна лишь очень узкому кругу специалистов по алгоритмам', en: 'It was never published openly and is known only to a very small circle of algorithm specialists' },
      ],
      correct: 0,
      explanation: {
        ru: 'На CPU и RAM запись почти так же дешева, как чтение - компромисс "меньше записей ценой квадратичных сравнений" там невыгоден.',
        en: 'On CPU and RAM, writes are nearly as cheap as reads - the "fewer writes at the cost of quadratic comparisons" tradeoff doesn\'t pay off there.',
      },
      hint: {
        ru: 'Смотрите первый пункт минусов на вкладке «Плюсы и минусы» и шестой абзац раздела «Глубже» про O(n) сравнений на каждую запись.',
        en: 'See the first "Cons" item on the "Pros & Cons" tab and the sixth "Deep dive" paragraph about O(n) comparisons per write.',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда вытесненный элемент возвращается на позицию, с которой начался цикл?',
        en: 'What happens when the displaced element returns to the position where the cycle started?',
      },
      options: [
        { ru: 'Цикл завершается, алгоритм переходит к следующей начальной позиции', en: 'The cycle closes and the algorithm moves to the next starting position' },
        { ru: 'Алгоритм немедленно останавливается с ошибкой переполнения индекса массива, что требует перезапуска всей сортировки', en: 'The algorithm immediately stops with an array index overflow error, requiring the whole sort to be restarted' },
        { ru: 'Начинается совершенно новый проход по всему массиву с самого первого элемента, игнорируя уже сделанную работу', en: 'A brand new pass over the whole array begins again from the very first element, ignoring the work already done' },
        { ru: 'Весь массив сортируется заново с нуля с использованием совершенно другого запасного алгоритма', en: 'The entire array is re-sorted from scratch using a completely different fallback algorithm instead' },
      ],
      correct: 0,
      explanation: {
        ru: 'Возврат в стартовую точку означает, что цепочка перестановок замкнулась и все элементы цикла заняли свои места - цикл закрыт.',
        en: 'Returning to the starting point means the rotation chain has closed and all elements in the cycle have taken their places - the cycle is done.',
      },
      hint: {
        ru: 'Смотрите шаг «Замкнуть цикл» на вкладке «Визуализация» и строку 17 (`while (pos !== cycleStart)`) функции `cycleSort` на вкладке «Реализация».',
        en: 'See the "Close the cycle" step on the "Visualization" tab and line 17 (`while (pos !== cycleStart)`) of `cycleSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность циклической сортировки в лучшем случае?',
        en: 'What is the best-case time complexity of cycle sort?',
      },
      options: [
        { ru: 'O(n²) - подсчёт позиций всегда требует прохода по оставшейся части массива', en: 'O(n²) - counting correct positions always requires scanning the remaining portion of the array' },
        { ru: 'O(n) - когда массив уже отсортирован и запись не нужна ни разу', en: 'O(n) - when the array is already sorted and no writes are needed at all' },
        { ru: 'O(n log n) - благодаря структуре циклов, аналогичной куче', en: 'O(n log n) - due to the cycle structure similar to a heap' },
        { ru: 'O(1) - если все элементы уже стоят на своих местах без каких-либо перемещений', en: 'O(1) - if all elements are already in place with no movements needed whatsoever regardless of input' },
      ],
      correct: 0,
      explanation: {
        ru: 'Даже когда массив уже отсортирован (записей нет), для каждой позиции i алгоритм всё равно проходит по всем j > i, подсчитывая меньшие элементы - это даёт O(n²) сравнений.',
        en: 'Even when the array is already sorted (no writes needed), for each position i the algorithm still scans all j > i to count smaller elements - giving O(n²) comparisons.',
      },
      hint: {
        ru: 'Смотрите строки 9-11 функции `cycleSort` на вкладке «Реализация» - этот подсчёт выполняется на каждой позиции безусловно, до проверки `pos === cycleStart`.',
        en: 'See lines 9-11 of `cycleSort` on the "Implementation" tab - this count runs unconditionally at every position, before the `pos === cycleStart` check.',
      },
    },
    {
      question: {
        ru: 'Является ли циклическая сортировка устойчивой (stable)?',
        en: 'Is cycle sort stable?',
      },
      options: [
        { ru: 'Нет - перестановка по циклам может изменить порядок равных элементов', en: 'No - cycling through permutations can change the relative order of equal elements' },
        { ru: 'Да - каждый элемент записывается ровно один раз, поэтому их порядок не нарушается', en: 'Yes - each element is written exactly once, so their order is not disturbed' },
        { ru: 'Только если все элементы в массиве различны и дубликатов нет', en: 'Only if all elements in the array are distinct and there are no duplicates' },
        { ru: 'Только при чётном числе элементов из-за симметрии циклов перестановок', en: 'Only when the element count is even due to the symmetry of permutation cycles always' },
      ],
      correct: 0,
      explanation: {
        ru: 'При подсчёте элементов меньше данного алгоритм может поставить элемент перед равным ему, изменив их исходный порядок - устойчивость не гарантирована.',
        en: 'When counting elements smaller than the current one, the algorithm may place an element before an equal one, altering their original order - stability is not guaranteed.',
      },
      hint: {
        ru: 'Смотрите второй пункт минусов на вкладке «Плюсы и минусы» (тег `unstable` рядом с названием алгоритма вверху страницы).',
        en: 'See the second "Cons" item on the "Pros & Cons" tab (also the `unstable` tag near the algorithm name at the top of the page).',
      },
    },
    {
      question: {
        ru: 'Почему алгоритм дополнительно сдвигает pos вперёд при `item === a[pos]`?',
        en: 'Why does the algorithm shift pos forward when `item === a[pos]`?',
      },
      options: [
        { ru: 'Не перезаписывать равный элемент, когда тот уже стоит на правильной позиции', en: 'To avoid overwriting an equal element that is already in its correct position' },
        { ru: 'Чтобы ускорить поиск позиции с помощью пропуска уже обработанных элементов', en: 'To speed up position search by skipping already processed elements' },
        { ru: 'Потому что сравнение на равенство работает медленнее, чем сравнение на меньше', en: 'Because equality comparison runs slower than less-than comparison' },
        { ru: 'Это баг в стандартной реализации, который никто не удосужился исправить', en: 'This is a bug in the standard implementation that nobody bothered to fix always' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если на целевой позиции стоит элемент, равный перемещаемому, его нельзя трогать - он уже корректно размещён. Алгоритм ищет следующую позицию с другим значением.',
        en: 'If the target position holds an element equal to the one being moved, it must not be touched - it is already correctly placed. The algorithm finds the next position with a different value.',
      },
      hint: {
        ru: 'Смотрите строку 14 (`while (item === a[pos]) pos++`) функции `cycleSort` на вкладке «Реализация» - её роль в walkthrough объяснена как «Пропуск дубликатов».',
        en: 'See line 14 (`while (item === a[pos]) pos++`) of `cycleSort` on the "Implementation" tab - its role is covered in the walkthrough as "Skipping duplicates".',
      },
    },
    {
      question: {
        ru: 'Чем циклическая сортировка принципиально отличается от сортировки выбором по числу записей?',
        en: 'How does cycle sort fundamentally differ from selection sort in terms of write count?',
      },
      options: [
        { ru: 'Cycle sort: O(n) записей; selection sort: O(n) обменов ≈ 2-3 записи каждый', en: 'Cycle sort makes O(n) writes, while selection sort makes O(n) swaps each involving 2-3 writes' },
        { ru: 'Cycle sort делает O(n²) записей, а selection sort - O(n log n) обменов', en: 'Cycle sort makes O(n²) writes, while selection sort makes O(n log n) swaps regardless of input' },
        { ru: 'Оба алгоритма делают абсолютно одинаковое число записей на любых входных данных', en: 'Both algorithms make the exact same number of writes on any input data' },
        { ru: 'Selection sort вообще не делает записей, поскольку использует только сравнения', en: 'Selection sort makes no writes at all since it only uses comparisons' },
      ],
      correct: 0,
      explanation: {
        ru: 'Selection sort делает примерно n обменов, каждый из которых требует 3 записи (через временную переменную). Cycle sort записывает каждый элемент ровно раз - итого не более n записей.',
        en: 'Selection sort makes roughly n swaps, each needing 3 writes (via a temporary variable). Cycle sort writes each element exactly once - at most n writes total.',
      },
      hint: {
        ru: 'Смотрите четвёртый и пятый абзацы раздела «Глубже» с трассировкой `[5,1,4,2,3]`: 5 записей у cycle sort против 12 у selection sort.',
        en: 'See the fourth and fifth "Deep dive" paragraphs tracing `[5,1,4,2,3]`: cycle sort\'s 5 writes versus selection sort\'s 12.',
      },
    },
    {
      question: {
        ru: 'Как задача «найти пропущенное число в массиве [1, n]» связана с идеей циклической сортировки?',
        en: 'How does the "find the missing number in array [1, n]" problem relate to cycle sort\'s idea?',
      },
      options: [
        { ru: 'Оба используют подсчёт меньших элементов для определения правильной позиции каждого числа', en: 'Both use counting smaller elements to determine each number\'s correct position' },
        { ru: 'Задача о пропущенном числе решается только сортировкой слиянием и не имеет связи с cycle sort', en: 'The missing-number problem is solved only by merge sort and has no relation to cycle sort' },
        { ru: 'Cycle sort специально разработан для задач о пропущенных числах и не умеет ничего другого', en: 'Cycle sort was specifically designed for missing-number problems and cannot do anything else' },
        { ru: 'Связь отсутствует: это принципиально разные алгоритмические задачи без пересечений', en: 'There is no connection: these are fundamentally different algorithmic problems with no overlap' },
      ],
      correct: 0,
      explanation: {
        ru: 'Трюк cycle sort - «поставь число на позицию, равную его значению минус 1» - напрямую применим для расстановки чисел [1, n] на свои индексы, после чего пропущенное число легко найти.',
        en: 'Cycle sort\'s trick - "place a number at the index equal to its value minus 1" - applies directly to arranging numbers [1, n] at their indices, after which the missing number is easy to find.',
      },
      hint: {
        ru: 'Смотрите четвёртый пункт расширенного «Когда применять» на вкладке «Суть» и второй пункт раздела «В реальном мире» про задачи LeetCode.',
        en: 'See the fourth extended "When to use" item on the "Intent" tab and the second "Real world" item about LeetCode problems.',
      },
    },
  ],
};

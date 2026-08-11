export const insertionSort = {
  slug: 'insertion-sort',
  category: 'sorting',
  name: { ru: 'Insertion Sort', en: 'Insertion Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['comparison', 'in-place', 'stable', 'online'],

  intent: {
    ru: 'Сортировка вставками строит отсортированную часть массива слева направо, забирая по одному элементу из неотсортированной части и вставляя его на правильную позицию.',
    en: 'Insertion sort builds the sorted part of the array left to right, taking one element at a time from the unsorted part and inserting it at its correct position.',
  },

  problem: {
    ru: 'Представьте, что вы держите в руке карты и сортируете их по одной, вставляя каждую новую карту в нужное место среди уже отсортированных. Нужен алгоритм, который так же естественно работает с данными, поступающими по одному элементу (например, поток), и который особенно эффективен, если данные уже почти упорядочены.',
    en: 'Imagine sorting a hand of playing cards one at a time, inserting each new card into the right place among the already-sorted ones. You need an algorithm that naturally handles data arriving one element at a time (e.g. a stream) and that is especially efficient when the data is already nearly sorted.',
  },

  solution: {
    ru: 'Массив делится на отсортированную часть слева (изначально из одного элемента) и неотсортированную часть справа. На каждом шаге берётся первый элемент неотсортированной части и сдвигается влево через отсортированную часть до тех пор, пока не найдётся элемент меньше него - туда он и вставляется. Отсортированная часть растёт на один элемент за шаг.',
    en: 'The array is split into a sorted left part (initially a single element) and an unsorted right part. On each step, the first element of the unsorted part is taken and shifted left through the sorted part until an element smaller than it is found - that is where it gets inserted. The sorted part grows by one element per step.',
  },

  steps: [
    {
      title: { ru: 'Взять следующий элемент', en: 'Take the next element' },
      explanation: {
        ru: 'Забрать первый элемент неотсортированной части и запомнить его значение.',
        en: 'Take the first element of the unsorted part and remember its value.',
      },
    },
    {
      title: { ru: 'Сравнивать и сдвигать', en: 'Compare and shift' },
      explanation: {
        ru: 'Идти влево по отсортированной части, сдвигая каждый больший элемент на одну позицию вправо.',
        en: 'Walk left through the sorted part, shifting each larger element one position to the right.',
      },
    },
    {
      title: { ru: 'Найти позицию вставки', en: 'Find the insertion point' },
      explanation: {
        ru: 'Остановиться, когда встретится элемент меньше или равный запомненному значению (или дойдя до начала массива).',
        en: 'Stop when an element smaller than or equal to the stored value is found (or the start of the array is reached).',
      },
    },
    {
      title: { ru: 'Вставить элемент', en: 'Insert the element' },
      explanation: {
        ru: 'Поставить запомненное значение в освободившуюся позицию.',
        en: 'Place the stored value into the freed-up position.',
      },
    },
    {
      title: { ru: 'Повторять до конца массива', en: 'Repeat to the end of the array' },
      explanation: {
        ru: 'Перейти к следующему элементу неотсортированной части и повторить процесс.',
        en: 'Move on to the next element of the unsorted part and repeat the process.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 21, 31],

  implementation: {
    javascript: `function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const current = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > current) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = current;
  }
  return a;
}`,
    python: `def insertion_sort(arr):
    a = arr.copy()
    for i in range(1, len(a)):
        current = a[i]
        j = i - 1
        while j >= 0 and a[j] > current:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = current
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - вся логика сдвига и вставки живёт внутри функции, дополнительные параметры не нужны.',
          en: 'The function takes a single array `arr` - all the shifting and insertion logic lives inside the function, no extra parameters are needed.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия массива', en: 'Copying the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт копию входного массива, чтобы функция не изменяла аргумент, переданный вызывающим кодом - все сдвиги и вставки ниже происходят в этой копии.',
          en: '`const a = [...arr]` copies the input array so the function doesn\'t mutate the caller\'s argument - every shift and insertion below happens on this copy.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Внешний цикл по неотсортированной части', en: 'Outer loop over the unsorted part' },
        explanation: {
          ru: '`for (let i = 1; i < a.length; i++)` перебирает элементы неотсортированной части, начиная с индекса 1 - элемент `a[0]` уже сам по себе является отсортированной частью из одного элемента, ему не с чем сравниваться.',
          en: '`for (let i = 1; i < a.length; i++)` walks the unsorted part starting at index 1 - `a[0]` on its own is already a sorted part of one element, with nothing to compare against.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Запоминание ключа', en: 'Remembering the key' },
        explanation: {
          ru: '`const current = a[i]` сохраняет значение вставляемого элемента до того, как позиция `i` будет перезаписана сдвигами - без этой копии значение потерялось бы при первом же `a[j + 1] = a[j]`.',
          en: '`const current = a[i]` saves the value being inserted before position `i` gets overwritten by shifts - without this copy the value would be lost on the very first `a[j + 1] = a[j]`.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Начало сканирования влево', en: 'Starting the leftward scan' },
        explanation: {
          ru: '`let j = i - 1` устанавливает `j` на последний индекс уже отсортированной части - именно с ним ключ будет сравниваться первым.',
          en: '`let j = i - 1` sets `j` to the last index of the already-sorted part - that\'s the first element the key gets compared against.',
        },
      },
      {
        lines: [6, 9],
        title: { ru: 'Цикл сдвига', en: 'The shift loop' },
        explanation: {
          ru: '`while (j >= 0 && a[j] > current)` продолжается, пока не кончилась отсортированная часть (`j >= 0`) и элемент слева больше ключа. На каждой итерации `a[j + 1] = a[j]` сдвигает этот больший элемент на одну позицию вправо, а `j--` двигает сканирование дальше влево. Цикл останавливается сам, как только встречает элемент не больше ключа - именно тогда найдено место вставки.',
          en: '`while (j >= 0 && a[j] > current)` keeps going while the sorted part isn\'t exhausted (`j >= 0`) and the element to the left is greater than the key. Each iteration `a[j + 1] = a[j]` shifts that larger element one position right, and `j--` moves the scan further left. The loop stops on its own as soon as it hits an element no greater than the key - that\'s exactly the insertion point.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Вставка ключа', en: 'Inserting the key' },
        explanation: {
          ru: '`a[j + 1] = current` записывает сохранённый ключ в позицию, освобождённую последним сдвигом (или в исходную позицию `i`, если сдвигов не было вовсе) - отсортированная часть выросла на один элемент.',
          en: '`a[j + 1] = current` writes the saved key into the spot the last shift freed up (or into the original position `i`, if no shift happened at all) - the sorted part has grown by one element.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда внешний цикл проходит все индексы до `a.length - 1`, каждый элемент уже вставлен на своё место, и `a` полностью отсортирован.',
          en: 'Once the outer loop has run through every index up to `a.length - 1`, every element has been inserted into its place, and `a` is fully sorted.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, вся логика сдвига и вставки живёт внутри функции.',
          en: 'The function takes a single list `arr` - just like the JS version, all the shifting and insertion logic lives inside the function.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия списка', en: 'Copying the list' },
        explanation: {
          ru: '`a = arr.copy()` создаёт копию входного списка, чтобы не изменять аргумент вызывающего кода.',
          en: '`a = arr.copy()` copies the input list so the caller\'s argument stays untouched.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Внешний цикл по неотсортированной части', en: 'Outer loop over the unsorted part' },
        explanation: {
          ru: '`for i in range(1, len(a)):` перебирает элементы неотсортированной части начиная с индекса 1 - `a[0]` уже сам по себе отсортированная часть из одного элемента.',
          en: '`for i in range(1, len(a)):` walks the unsorted part starting at index 1 - `a[0]` on its own is already a sorted part of one element.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Запоминание ключа', en: 'Remembering the key' },
        explanation: {
          ru: '`current = a[i]` сохраняет значение вставляемого элемента до того, как позиция `i` будет перезаписана сдвигами.',
          en: '`current = a[i]` saves the value being inserted before position `i` gets overwritten by shifts.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Начало сканирования влево', en: 'Starting the leftward scan' },
        explanation: {
          ru: '`j = i - 1` устанавливает `j` на последний индекс уже отсортированной части.',
          en: '`j = i - 1` sets `j` to the last index of the already-sorted part.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Цикл сдвига', en: 'The shift loop' },
        explanation: {
          ru: '`while j >= 0 and a[j] > current:` продолжается, пока не кончилась отсортированная часть и элемент слева больше ключа. `a[j + 1] = a[j]` сдвигает этот элемент на одну позицию вправо, `j -= 1` двигает сканирование дальше влево - идентично циклу в JS-версии.',
          en: '`while j >= 0 and a[j] > current:` keeps going while the sorted part isn\'t exhausted and the element to the left is greater than the key. `a[j + 1] = a[j]` shifts that element one position right, `j -= 1` moves the scan further left - identical to the JS version\'s loop.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Вставка ключа', en: 'Inserting the key' },
        explanation: {
          ru: '`a[j + 1] = current` записывает сохранённый ключ в позицию, освобождённую последним сдвигом (или в исходную позицию `i`, если сдвигов не было).',
          en: '`a[j + 1] = current` writes the saved key into the spot the last shift freed up (or into the original position `i`, if no shift happened).',
        },
      },
      {
        lines: [10],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда внешний цикл проходит все индексы, каждый элемент уже вставлен на своё место, и `a` полностью отсортирован.',
          en: 'Once the outer loop has run through every index, every element has been inserted into its place, and `a` is fully sorted.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'На почти отсортированных данных приближается к O(n) - каждый новый элемент сдвигается всего на пару позиций.',
      en: 'Approaches O(n) on nearly sorted data - each new element only shifts a couple of positions.',
    },
    {
      ru: 'Онлайн-алгоритм: может сортировать данные по мере их поступления, не имея всего массива заранее.',
      en: 'An online algorithm: can sort data as it arrives, without needing the whole array upfront.',
    },
    {
      ru: 'Устойчив и сортирует на месте с O(1) дополнительной памяти.',
      en: 'Stable and sorts in place with O(1) extra memory.',
    },
    {
      ru: 'Простая реализация, которую многие языки/библиотеки используют как «финальный штрих» для маленьких подмассивов в гибридных сортировках.',
      en: 'Simple enough that many languages/libraries use it as the "finishing touch" for small subarrays inside hybrid sorts.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) в среднем и худшем случае - на случайных или обратно отсортированных больших массивах медленный.',
      en: 'O(n²) average and worst case - slow on random or reverse-sorted large arrays.',
    },
    {
      ru: 'Сдвиг элементов в массиве - операция O(n) в худшем случае на каждой вставке, что дороже, чем перестановка местами в сортировке выбором.',
      en: 'Shifting array elements is an O(n) operation in the worst case per insertion, more expensive than a single swap in selection sort.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные почти отсортированы или поступают потоком, элемент за элементом.',
      en: 'When data is nearly sorted or arrives as a stream, one element at a time.',
    },
    {
      ru: 'Как финальный проход для маленьких подмассивов внутри более сложных алгоритмов (Timsort, интроспективная сортировка).',
      en: 'As the final pass for small subarrays inside more advanced algorithms (Timsort, introspective sort).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Timsort** (используется в Python `sorted()` и Java `Arrays.sort()` для объектов) применяет сортировку вставками для небольших «прогонов» перед их слиянием.',
      en: '**Timsort** (used by Python\'s `sorted()` and Java\'s `Arrays.sort()` for objects) uses insertion sort on small "runs" before merging them.',
    },
    {
      ru: '**Сортировка карт в руке** - классическая аналогия, буквально описывающая механику алгоритма.',
      en: '**Sorting a hand of playing cards** - the classic analogy that literally describes the algorithm\'s mechanics.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Сортировка вставками строит отсортированную часть **постепенно**, беря по одному элементу из неотсортированного хвоста и находя ему место **сдвигом** (не обменом) уже упорядоченных соседей. Это отличает её от алгоритмов на основе swap - здесь двигается блок элементов, а не пара.',
        en: 'Insertion sort builds the sorted part **gradually**, taking one element at a time from the unsorted tail and finding its spot via a **shift** (not a swap) of already-ordered neighbors. This sets it apart from swap-based algorithms - here a block of elements moves, not a pair.',
      },
      {
        ru: 'На конкретных числах: массив `[5, 2, 4, 6, 1, 3]`. При `i = 1` ключ `current = 2`; `5 > 2`, поэтому 5 сдвигается вправо → `[5, 5, 4, 6, 1, 3]`, `j` доходит до -1, ключ встаёт в начало → `[2, 5, 4, 6, 1, 3]`. При `i = 2` ключ `current = 4`; `5 > 4` - сдвиг → `[2, 5, 5, 6, 1, 3]`; `2 > 4` ложно - остановка, ключ встаёт на позицию 1 → `[2, 4, 5, 6, 1, 3]`. За два шага понадобилось всего 2 сдвига.',
        en: 'In concrete numbers: array `[5, 2, 4, 6, 1, 3]`. At `i = 1` the key is `current = 2`; `5 > 2`, so 5 shifts right → `[5, 5, 4, 6, 1, 3]`, `j` reaches -1, the key lands at the front → `[2, 5, 4, 6, 1, 3]`. At `i = 2` the key is `current = 4`; `5 > 4` - a shift → `[2, 5, 5, 6, 1, 3]`; `2 > 4` is false - stop, the key lands at index 1 → `[2, 4, 5, 6, 1, 3]`. Two steps, only 2 shifts total.',
      },
      {
        ru: 'Отличительная черта алгоритма - **адаптивность** к исходному порядку. На почти отсортированном массиве каждый ключ уже стоит рядом со своей финальной позицией, поэтому цикл `while` останавливается почти сразу же после первого сравнения, и общее число сдвигов близко к нулю.',
        en: 'The algorithm\'s distinguishing trait is **adaptivity** to the input order. On a nearly sorted array, each key already sits close to its final position, so the `while` loop stops almost right after the first comparison, and the total shift count stays close to zero.',
      },
      {
        ru: 'На **обратно отсортированном** массиве происходит противоположное. Для `[6, 5, 4, 3, 2, 1]` (n = 6): при `i = 1` ключ 5 требует 1 сдвиг, при `i = 2` ключ 4 - 2 сдвига, ..., при `i = 5` ключ 1 - 5 сдвигов. Сумма `1 + 2 + 3 + 4 + 5 = 15` сдвигов - это худший случай алгоритма.',
        en: 'On a **reverse-sorted** array the opposite happens. For `[6, 5, 4, 3, 2, 1]` (n = 6): at `i = 1` key 5 needs 1 shift, at `i = 2` key 4 needs 2 shifts, ..., at `i = 5` key 1 needs 5 shifts. The sum `1 + 2 + 3 + 4 + 5 = 15` shifts is the algorithm\'s worst case.',
      },
      {
        ru: 'Эта цифра не случайна - число сдвигов для каждого элемента равно числу элементов слева от него, которые больше него самого, то есть числу **инверсий**, в которых он участвует. Сумма по всем элементам даёт полное число инверсий массива: для `[6, 5, 4, 3, 2, 1]` это ровно `n(n-1)/2 = 6·5/2 = 15` - максимально возможное число инверсий для n = 6, совпадающее со счётом выше.',
        en: 'This number is no accident - the shift count for each element equals the number of elements to its left that are greater than it, i.e. the number of **inversions** it takes part in. Summed over all elements, this gives the array\'s total inversion count: for `[6, 5, 4, 3, 2, 1]` that is exactly `n(n-1)/2 = 6·5/2 = 15` - the maximum possible inversion count for n = 6, matching the tally above.',
      },
      {
        ru: 'Механика сдвига отличается от обмена и по паттерну доступа к памяти. Swap в bubble/selection sort - это перестановка ровно двух ячеек. Сдвиг в insertion sort - это последовательное копирование блока `a[j]` в `a[j+1]` при движении `j` влево, а затем одна финальная запись ключа. При коротких сдвигах (что типично на почти отсортированных данных) это дёшево; при длинных сдвигах (худший случай) число записей растёт линейно с длиной сдвигаемого блока.',
        en: 'The shift mechanic also differs from a swap in its memory access pattern. A swap in bubble/selection sort exchanges exactly two cells. A shift in insertion sort sequentially copies `a[j]` into `a[j+1]` as `j` walks left, followed by one final write of the key. For short shifts (typical on nearly sorted data) this is cheap; for long shifts (worst case) the write count grows linearly with the length of the shifted block.',
      },
      {
        ru: 'В сравнении с **Bubble Sort** оба алгоритма делают O(n²) сравнений в худшем случае, но по-разному распределяют работу за проход: bubble sort двигает каждый большой элемент только на одну позицию за проход, insertion sort сразу дотаскивает вставляемый ключ до правильного места за один внутренний цикл. Итоговая асимптотика совпадает, но константы и характер деградации на разных входах отличаются - именно поэтому insertion sort, а не bubble sort, оказался финальным шагом Timsort.',
        en: 'Compared to **Bubble Sort**, both algorithms make O(n²) comparisons in the worst case, but distribute work per pass differently: bubble sort moves each large element only one position per pass, while insertion sort drags the current key all the way to its correct spot within a single inner loop. The asymptotics match, but the constants and degradation pattern on different inputs differ - which is exactly why insertion sort, not bubble sort, ended up as Timsort\'s finishing step.',
      },
    ],
    whenToUse: [
      {
        ru: '**Против Selection Sort** - на почти отсортированных данных вставками выигрывают, потому что адаптируются к числу инверсий (см. пример выше: 15 сдвигов на n = 6 в худшем случае), тогда как Selection Sort всегда делает ровно n-1 перестановку, сколько бы элементов уже ни стояло на своих местах.',
        en: '**Against Selection Sort** - on nearly sorted data, insertion sort wins because it adapts to the inversion count (see the example above: 15 shifts for n = 6 in the worst case), while Selection Sort always performs exactly n-1 swaps, no matter how many elements are already in place.',
      },
      {
        ru: '**Онлайн-сценарий** - когда элементы поступают по одному и отсортированный порядок нужен в любой промежуточный момент, а не только в конце. Selection Sort для этого не годится - ей нужно видеть весь оставшийся диапазон, чтобы найти минимум.',
        en: '**Online scenario** - when elements arrive one at a time and a sorted order is needed at any intermediate moment, not just at the end. Selection Sort can\'t do this - it needs to see the whole remaining range to find the minimum.',
      },
      {
        ru: '**Малые подмассивы внутри гибридных сортировок** - Timsort переключается на (бинарную) сортировку вставками для «прогонов» короче примерно 32-64 элементов, Introsort в C++ STL - на финальном проходе после рекурсивного деления. Причина одна и та же: у insertion sort ниже константы на маленьком n, чем у merge/quicksort с их накладными расходами на рекурсию и слияние.',
        en: '**Small subarrays inside hybrid sorts** - Timsort switches to (binary) insertion sort for "runs" shorter than roughly 32-64 elements, Introsort in the C++ STL uses it as a finishing pass after recursive splitting. The reason is the same: insertion sort has lower constants at small n than merge/quicksort with their recursion and merge overhead.',
      },
      {
        ru: '**На связных списках, а не массивах** - вставка узла в найденную позицию стоит O(1) (переставить пару указателей), поэтому оверхед сдвига, характерный именно для непрерывного массива в памяти, вообще исчезает - остаётся только O(n) на поиск позиции.',
        en: '**On linked lists rather than arrays** - splicing a node into the found position costs O(1) (re-pointing a couple of pointers), so the shift overhead that\'s specific to a contiguous array in memory disappears entirely - only the O(n) search for the position remains.',
      },
      {
        ru: '**Не выбирать для больших случайных массивов** - без знания о порядке входных данных O(n²) сдвигов делает алгоритм заметно медленнее Merge Sort, Quicksort или Heap Sort уже на нескольких тысячах элементов; для этого случая нужен алгоритм с гарантией O(n log n), а не адаптивностью.',
        en: '**Don\'t pick it for large random arrays** - without knowledge of input order, O(n²) shifts make the algorithm noticeably slower than Merge Sort, Quicksort, or Heap Sort at just a few thousand elements; that case calls for an O(n log n) guarantee, not adaptivity.',
      },
    ],
    realWorld: [
      {
        ru: '**Timsort (Tim Peters, 2002)** - стандартный алгоритм сортировки в CPython (`listobject.c`) и Java (`ComparableTimSort` для объектов) - использует именно бинарную сортировку вставками для «прогонов» короче `MIN_RUN` (обычно 32-64 элемента), находя позицию вставки бинарным поиском перед сдвигом.',
        en: '**Timsort (Tim Peters, 2002)** - the standard sort in CPython (`listobject.c`) and Java (`ComparableTimSort` for objects) - uses binary insertion sort specifically for "runs" shorter than `MIN_RUN` (typically 32-64 elements), locating the insertion point via binary search before shifting.',
      },
      {
        ru: '**`java.util.DualPivotQuicksort`** (примитивные массивы Java, не объекты) переключается с quicksort на insertion sort для поддиапазонов короче константы `INSERTION_SORT_THRESHOLD = 47` - число подобрано эмпирически по бенчмаркам JDK.',
        en: '**`java.util.DualPivotQuicksort`** (Java primitive arrays, not objects) switches from quicksort to insertion sort for subranges shorter than the `INSERTION_SORT_THRESHOLD = 47` constant - a number tuned empirically against JDK benchmarks.',
      },
      {
        ru: '**GCC libstdc++ `std::sort`** реализует Introsort и завершает его отдельным проходом `__final_insertion_sort` с порогом в 16 элементов - на этом этапе массив уже «почти отсортирован» (каждый элемент рекурсией уже подведён близко к финальной позиции), что именно та ситуация, в которой вставками наиболее эффективны.',
        en: '**GCC libstdc++\'s `std::sort`** implements Introsort and finishes with a separate `__final_insertion_sort` pass using a 16-element threshold - by that point the array is already "nearly sorted" (recursion has already brought every element close to its final spot), exactly the situation where insertion sort shines.',
      },
      {
        ru: '**Прошивки микроконтроллеров без динамической памяти** используют сортировку вставками там, где данных мало (десятки записей), а O(1) дополнительной памяти и отсутствие рекурсии важнее асимптотики - лишний стек вызовов quicksort в среде с несколькими килобайтами ОЗУ может быть недопустим.',
        en: '**Microcontroller firmware without dynamic memory** uses insertion sort where data volumes are small (dozens of records) and O(1) extra memory plus the absence of recursion matter more than asymptotics - the extra call stack quicksort needs can be unaffordable in an environment with a few kilobytes of RAM.',
      },
      {
        ru: '**Учебные визуализаторы алгоритмов** (например, VisuAlgo) почти всегда ставят insertion sort рядом с selection sort именно для демонстрации адаптивности: на одном и том же почти отсортированном входе insertion sort делает заметно меньше операций, а selection sort - нет.',
        en: '**Algorithm visualizer tools** (e.g. VisuAlgo) almost always place insertion sort next to selection sort specifically to demonstrate adaptivity: on the same nearly sorted input, insertion sort performs noticeably fewer operations, while selection sort does not.',
      },
    ],
  },

  relatedAlgorithms: ['bubble-sort', 'selection-sort', 'merge-sort'],

  quiz: [
    {
      question: {
        ru: 'Какова временная сложность сортировки вставками на уже отсортированном массиве?',
        en: 'What is the time complexity of insertion sort on an already sorted array?',
      },
      options: [
        { ru: 'O(n) - лучший случай', en: 'O(n) - best case' },
        { ru: 'O(n²) - как и всегда', en: 'O(n²) - same as always' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если каждый следующий элемент уже больше предыдущего, внутренний цикл сдвига ни разу не выполняется - алгоритм делает всего n−1 сравнение.',
        en: 'If every next element is already greater than the previous one, the inner shifting loop never runs - the algorithm makes only n−1 comparisons.',
      },
      hint: {
        ru: 'Посмотри на бейдж «Лучший» вверху страницы и на условие `while (j >= 0 && a[j] > current)` на вкладке «Реализация» - сколько раз оно окажется истинным, если массив уже отсортирован?',
        en: 'Look at the "Best" badge at the top of the page and the `while (j >= 0 && a[j] > current)` condition on the "Implementation" tab - how many times can it be true if the array is already sorted?',
      },
    },
    {
      question: {
        ru: 'Что делает внутренний цикл (`while`) в реализации сортировки вставками?',
        en: 'What does the inner (`while`) loop do in the insertion sort implementation?',
      },
      options: [
        {
          ru: 'Сдвигает элементы отсортированной части вправо, освобождая место для вставки',
          en: 'Shifts elements of the sorted part rightward, making room for the insertion',
        },
        { ru: 'Меняет местами два соседних элемента, как это делает сортировка пузырьком', en: 'Swaps two neighboring elements, the way bubble sort does' },
        { ru: 'Ищет минимум во всём массиве и переставляет его в начало, как в сортировке выбором', en: 'Searches for the minimum across the whole array and moves it to the front, as in selection sort' },
        { ru: 'Разбивает массив пополам и рекурсивно сортирует обе половины', en: 'Splits the array in half and recursively sorts both halves' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от swap-based алгоритмов, вставками использует сдвиг (shift): элементы копируются на одну позицию вправо, пока не найдётся место для вставляемого значения.',
        en: 'Unlike swap-based algorithms, insertion sort uses a shift: elements are copied one position to the right until a spot is found for the value being inserted.',
      },
      hint: {
        ru: 'Открой шаг «Цикл сдвига» в разборе кода на вкладке «Реализация» и шаг «Сравнивать и сдвигать» на вкладке «Визуализация» - что именно двигается на каждой итерации: пара элементов или блок?',
        en: 'Open the "The shift loop" step in the code walkthrough on the "Implementation" tab and the "Compare and shift" step on the "Visualization" tab - what actually moves on each iteration: a pair of elements, or a block?',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность сортировки вставками на массиве, отсортированном в обратном порядке?',
        en: 'What is the time complexity of insertion sort on a reverse-sorted array?',
      },
      options: [
        {
          ru: 'O(n²) - каждый новый элемент сдвигается через всю отсортированную часть',
          en: 'O(n²) - each new element shifts across the entire already-sorted part',
        },
        {
          ru: 'O(n log n) - благодаря бинарному поиску места вставки для каждого элемента',
          en: 'O(n log n) - thanks to a binary search for the insertion point of each element',
        },
        {
          ru: 'O(n) - точно так же, как и на уже отсортированном по возрастанию массиве',
          en: 'O(n) - exactly the same as on an already ascending-sorted array',
        },
        {
          ru: 'O(1) - потому что сортировка происходит мгновенно независимо от размера',
          en: 'O(1) - because the sort completes instantly regardless of array size',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На развёрнутом массиве каждый следующий элемент меньше всех уже отсортированных, поэтому сдвигается до самого начала - суммарно получается квадратичное число операций, худший случай алгоритма.',
        en: "On a reverse-sorted array, every next element is smaller than everything already sorted, so it shifts all the way to the front - the total work is quadratic, the algorithm's worst case.",
      },
      hint: {
        ru: 'Посмотри бейдж «Худший» вверху страницы и посчитай сдвиги для `[6, 5, 4, 3, 2, 1]` в разделе «Как это работает» на вкладке «Суть» - там разобран точный пример на n = 6 с суммой 15 сдвигов.',
        en: 'Check the "Worst" badge at the top of the page and the shift count for `[6, 5, 4, 3, 2, 1]` in the "How it works" section on the "Intent" tab - it walks through an exact n = 6 example totaling 15 shifts.',
      },
    },
    {
      question: {
        ru: 'Что значит, что сортировка вставками - «онлайн-алгоритм»?',
        en: 'What does it mean that insertion sort is an "online algorithm"?',
      },
      options: [
        {
          ru: 'Она может сортировать элементы по мере их поступления, не имея всего массива заранее',
          en: 'It can sort elements as they arrive, without having the entire array upfront',
        },
        { ru: 'Она требует подключения к интернету для синхронизации промежуточных результатов сортировки', en: 'It requires an internet connection to synchronize intermediate sorting results' },
        { ru: 'Она работает только с числами с плавающей точкой из-за особенностей округления при сравнении', en: 'It only works with floating-point numbers because of rounding quirks in the comparisons' },
        { ru: 'Она использует облачные вычисления для распределения сравнений между узлами', en: 'It uses cloud computing to distribute comparisons across nodes' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отсортированная часть массива в любой момент валидна сама по себе - можно вставлять новые элементы по одному, не пересчитывая всё заново.',
        en: 'The sorted part of the array is valid on its own at any point - new elements can be inserted one at a time without recomputing everything.',
      },
      hint: {
        ru: 'Второй пункт на вкладке «Плюсы и минусы» назван прямо. Также см. пункт «Онлайн-сценарий» в разделе «Нюансы выбора» на вкладке «Суть».',
        en: 'The second item on the "Pros & Cons" tab names this directly. Also see the "Online scenario" item in the "Choice nuances" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Почему Timsort использует сортировку вставками для маленьких подмассивов?',
        en: 'Why does Timsort use insertion sort for small subarrays?',
      },
      options: [
        {
          ru: 'На маленьких n накладные расходы более сложных алгоритмов не окупаются, а вставками быстро и просто',
          en: "At small n, the overhead of more complex algorithms doesn't pay off, while insertion sort is fast and simple",
        },
        {
          ru: 'Потому что она работает за O(n log n), точно так же как и слияние прогонов в самом Timsort на больших массивах',
          en: 'Because it runs in O(n log n), exactly the same as the run-merging step in Timsort itself on large arrays',
        },
        {
          ru: 'Потому что она использует заметно меньше памяти, чем любой другой алгоритм сортировки, что критично для встроенных систем',
          en: 'Because it uses noticeably less memory than any other sorting algorithm, which matters greatly for embedded systems',
        },
        {
          ru: 'Это в корне не так, Timsort никогда не использует сортировку вставками - это распространённое заблуждение среди новичков в программировании',
          en: "That's fundamentally not true, Timsort never uses insertion sort at all - a common misconception among beginner programmers",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На маленьких подмассивах (обычно до ~32-64 элементов) практическая скорость сортировки вставками из-за низких констант превосходит асимптотически более быстрые, но более «тяжёлые» алгоритмы.',
        en: 'On small subarrays (typically up to ~32-64 elements), insertion sort\'s low constant factors make it practically faster than asymptotically superior but "heavier" algorithms.',
      },
      hint: {
        ru: 'Пункт «Малые подмассивы внутри гибридных сортировок» в разделе «Нюансы выбора» на вкладке «Суть» - там же названы конкретные пороги Timsort и Introsort. См. также четвёртый пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'The "Small subarrays inside hybrid sorts" item in the "Choice nuances" section on the "Intent" tab - it names Timsort\'s and Introsort\'s actual thresholds. Also see the fourth "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Сортировка вставками устойчива (stable). Почему?',
        en: 'Insertion sort is stable. Why?',
      },
      options: [
        {
          ru: 'Элемент вставляется сразу после последнего равного ему элемента, а не перед ним',
          en: 'An element is inserted right after the last equal element, not before it',
        },
        { ru: 'Она никогда не сравнивает равные элементы, потому что цикл сдвига пропускает такие пары', en: 'It never compares equal elements, because the shift loop skips over such pairs' },
        { ru: 'Она использует хеш-таблицу для отслеживания порядка исходных индексов элементов', en: 'It uses a hash table to track the original indices of elements for ordering' },
        { ru: 'Стабильность не гарантируется, это распространённое заблуждение, как и в сортировке выбором', en: 'Stability is not guaranteed, this is a common misconception, same as with selection sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Цикл сдвига останавливается на условии `a[j] > current` (строгое сравнение) - равные элементы не сдвигаются, поэтому их относительный порядок сохраняется.',
        en: "The shift loop stops on `a[j] > current` (strict comparison) - equal elements don't get shifted past, so their relative order is preserved.",
      },
      hint: {
        ru: 'Посмотри условие `a[j] > current` в шаге «Цикл сдвига» на вкладке «Реализация» - строгое оно или нестрогое? Третий пункт плюсов на вкладке «Плюсы и минусы» называет свойство прямо.',
        en: 'Check the `a[j] > current` condition in the "The shift loop" step on the "Implementation" tab - is it strict or non-strict? The third "Pros" item on "Pros & Cons" names the property directly.',
      },
    },
    {
      question: {
        ru: 'С чем напрямую связано число сдвигов, которые сортировка вставками делает для каждого элемента?',
        en: "What does the number of shifts insertion sort performs for each element directly relate to?",
      },
      options: [
        {
          ru: 'С числом инверсий - пар элементов, стоящих в неправильном относительном порядке',
          en: 'The number of inversions - pairs of elements standing in the wrong relative order',
        },
        {
          ru: 'Только с длиной всего массива целиком, и больше ни с чем другим',
          en: 'Only the total length of the whole array, and nothing else at all',
        },
        {
          ru: 'С числом простых делителей длины массива, что довольно необычно для алгоритмов сортировки',
          en: 'The number of prime divisors of the array length, which is unusual for sorting algorithms',
        },
        {
          ru: 'Только со значением самого вставляемого элемента, а не с его положением',
          en: 'Only the value of the element being inserted, not its position at all',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Для каждого элемента число сдвигов равно количеству элементов слева от него, которые больше него самого, - то есть числу инверсий, в которых он участвует. Сумма по всем элементам даёт общее число инверсий массива.',
        en: "For each element, the number of shifts equals the number of elements to its left that are greater than it - i.e. the number of inversions it takes part in. Summed over all elements, this gives the array's total inversion count.",
      },
      hint: {
        ru: 'Третий и четвёртый абзацы раздела «Как это работает» на вкладке «Суть» разбирают этот термин на числовом примере с массивом `[6, 5, 4, 3, 2, 1]`.',
        en: 'The third and fourth paragraphs of the "How it works" section on the "Intent" tab work through this term with a numeric example on `[6, 5, 4, 3, 2, 1]`.',
      },
    },
    {
      question: {
        ru: 'Бинарная сортировка вставками ищет место вставки бинарным поиском за O(log n). Почему это не ускоряет алгоритм до O(n log n)?',
        en: "Binary insertion sort finds the insertion point via binary search in O(log n). Why doesn't this speed the algorithm up to O(n log n)?",
      },
      options: [
        {
          ru: 'Потому что сдвиг элементов для освобождения места всё равно остаётся O(n) операцией',
          en: 'Because shifting elements to make room is still an O(n) operation',
        },
        {
          ru: 'Потому что бинарный поиск в принципе не работает на обычных индексируемых массивах',
          en: 'Because binary search does not work on regular indexable arrays at all',
        },
        {
          ru: 'Потому что использование бинарного поиска делает получившийся алгоритм неустойчивым',
          en: 'Because using binary search makes the resulting algorithm unstable overall',
        },
        {
          ru: 'На самом деле это действительно ускоряет весь алгоритм целиком до O(n log n)',
          en: 'It actually does speed the whole algorithm up to O(n log n) overall',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Бинарный поиск сокращает число сравнений до O(log n) за вставку, но освобождение места под новый элемент по-прежнему требует сдвига до O(n) элементов - именно сдвиг, а не поиск, определяет асимптотику, поэтому в худшем случае остаётся O(n²).',
        en: "Binary search cuts comparisons down to O(log n) per insertion, but making room for the new element still requires shifting up to O(n) elements - it's the shifting, not the search, that dominates the asymptotics, so the worst case stays O(n²).",
      },
      hint: {
        ru: 'Шестой абзац раздела «Как это работает» на вкладке «Суть» разбирает разницу между поиском позиции и самим сдвигом блока элементов. Также см. второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'The sixth paragraph of the "How it works" section on the "Intent" tab breaks down the difference between finding the position and actually shifting the block of elements. Also see the second "Cons" item on "Pros & Cons".',
      },
    },
    {
      question: {
        ru: 'Нужен ли сдвиг элементов, если применить идею сортировки вставками к связному списку (linked list) вместо массива?',
        en: 'Is shifting needed if the idea of insertion sort is applied to a linked list instead of an array?',
      },
      options: [
        {
          ru: 'Нет - вставка узла в найденную позицию стоит O(1), сдвигать нечего',
          en: 'No - inserting a node at the found position costs O(1), there is nothing to shift',
        },
        {
          ru: 'Да, сдвиг элементов всегда обязателен независимо от используемой структуры данных',
          en: 'Yes, shifting elements is always required regardless of which data structure is used',
        },
        {
          ru: 'Связные списки в принципе нельзя сортировать с помощью сортировки вставками',
          en: 'Linked lists cannot be sorted with insertion sort as a matter of principle',
        },
        {
          ru: 'Применение к связному списку делает получившийся алгоритм сортировки неустойчивым',
          en: 'Applying it to a linked list makes the resulting sorting algorithm unstable overall',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В связном списке, как только найдена позиция вставки, «вклеить» туда новый узел - это просто переставить пару указателей, O(1). Поиск позиции всё ещё требует до O(n) обхода, но дорогостоящего сдвига остальных элементов, как в массиве, не происходит.',
        en: 'In a linked list, once the insertion point is found, splicing in the new node is just re-pointing a couple of pointers - O(1). Finding the position still takes up to O(n) traversal, but there is no expensive shifting of the remaining elements like in an array.',
      },
      hint: {
        ru: 'Пункт «На связных списках, а не массивах» в разделе «Нюансы выбора» на вкладке «Суть» разбирает именно эту разницу.',
        en: 'The "On linked lists rather than arrays" item in the "Choice nuances" section on the "Intent" tab covers exactly this difference.',
      },
    },
    {
      question: {
        ru: 'Чем принципиально отличается объём работы сортировки вставками на почти отсортированных данных от объёма работы сортировки выбором?',
        en: 'How does the amount of work insertion sort does on nearly sorted data fundamentally differ from selection sort?',
      },
      options: [
        {
          ru: 'Работа вставками масштабируется с числом «беспорядка» в данных, а выбором всегда делает одно и то же число перестановок',
          en: "Insertion sort's work scales with how disordered the data is, while selection sort always performs the same number of swaps",
        },
        {
          ru: 'Оба алгоритма всегда выполняют совершенно одинаковый фиксированный объём работы независимо от степени упорядоченности исходных данных',
          en: 'Both algorithms always do exactly the same fixed amount of work regardless of how ordered the original input data already happens to be',
        },
        {
          ru: 'Сортировка выбором адаптируется к порядку входных данных, а сортировка вставками - совершенно нет',
          en: 'Selection sort adapts to the order of the input data, while insertion sort absolutely does not',
        },
        {
          ru: 'Сортировка вставками всегда делает больше операций записи, чем выбором, независимо от входных данных и их порядка',
          en: 'Insertion sort always writes more than selection sort, regardless of the input data and its ordering',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Число сдвигов сортировки вставками равно числу инверсий и стремится к нулю на почти отсортированных данных. Сортировка выбором игнорирует существующий порядок и всегда делает ровно n−1 перестановку, сколько бы элементов уже ни стояло на своих местах.',
        en: "Insertion sort's shift count equals the number of inversions and shrinks toward zero on nearly sorted data. Selection sort ignores existing order and always performs exactly n−1 swaps, no matter how many elements are already in place.",
      },
      hint: {
        ru: 'Первый пункт «Против Selection Sort» в разделе «Нюансы выбора» на вкладке «Суть» сравнивает объём работы напрямую. Также см. второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'The first item "Against Selection Sort" in the "Choice nuances" section on the "Intent" tab compares the amount of work directly. Also see the second "Cons" item on "Pros & Cons".',
      },
    },
  ],
};

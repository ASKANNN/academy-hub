export const bitonicSort = {
  slug: 'bitonic-sort',
  category: 'sorting',
  name: { ru: 'Bitonic Sort', en: 'Bitonic Sort' },
  complexity: {
    time: { best: 'O(n log² n)', average: 'O(n log² n)', worst: 'O(n log² n)' },
    space: 'O(n)',
  },
  popularity: 2,
  tags: ['comparison', 'sorting-network', 'parallelizable', 'divide-and-conquer'],

  intent: {
    ru: 'Битоническая сортировка строит массив из «битонических» последовательностей - тех, что сначала монотонно возрастают, а потом монотонно убывают (или наоборот) - и сливает их фиксированной сетью сравнений, у которой заранее известны все пары элементов для сравнения, независимо от значений самих элементов.',
    en: 'Bitonic sort builds up "bitonic" sequences - ones that first monotonically increase, then monotonically decrease (or vice versa) - and merges them with a fixed comparison network whose comparison pairs are known in advance, independent of the actual element values.',
  },

  problem: {
    ru: 'Большинство быстрых алгоритмов сортировки (быстрая, сортировка слиянием) выбирают, что сравнивать дальше, в зависимости от результатов предыдущих сравнений - это затрудняет их аппаратную реализацию или выполнение на GPU, где заранее хочется знать полную и неизменную последовательность операций сравнения, чтобы выполнять их параллельно, независимо от входных данных.',
    en: 'Most fast sorting algorithms (quicksort, merge sort) decide what to compare next based on the outcome of previous comparisons - this makes them awkward to implement in hardware or on a GPU, where a fixed, data-independent sequence of comparisons, known in advance, is what allows many of them to run in parallel.',
  },

  solution: {
    ru: 'Массив (дополненный до размера, равного степени двойки) рекурсивно делится на две половины: левая сортируется по возрастанию, правая - по убыванию. Вместе они образуют битоническую последовательность (сначала растёт, потом падает). Такую последовательность можно слить в отсортированный порядок с помощью «битонического слияния»: сравнить и, если нужно, поменять местами каждый элемент первой половины с соответствующим элементом второй половины, затем рекурсивно слить каждую половину так же. Ключевое свойство: результат такого слияния всегда правильно отсортирован, а пары сравнений полностью фиксированы заранее - это и есть сеть сравнений.',
    en: 'The array (padded to a power-of-two size) is recursively split into two halves: the left half sorted ascending, the right half sorted descending. Together they form a bitonic sequence (rising, then falling). Such a sequence can be merged into fully sorted order via "bitonic merge": compare and, if needed, swap each element of the first half with the corresponding element of the second half, then recursively merge each half the same way. The key property is that this merge always produces a correctly sorted result, and the comparison pairs are completely fixed in advance - that fixed structure is the comparison network.',
  },

  steps: [
    {
      title: { ru: 'Дополнить до степени двойки', en: 'Pad to a power of two' },
      explanation: {
        ru: 'Дополнить массив фиктивными элементами, большими любого настоящего, чтобы его размер стал степенью двойки - этого требует классическая сеть.',
        en: 'Pad the array with sentinel elements larger than any real one, so its size becomes a power of two - required by the classic network.',
      },
    },
    {
      title: { ru: 'Построить битоническую последовательность', en: 'Build a bitonic sequence' },
      explanation: {
        ru: 'Рекурсивно отсортировать левую половину по возрастанию, а правую - по убыванию, получив в сумме битоническую последовательность.',
        en: 'Recursively sort the left half ascending and the right half descending, producing a combined bitonic sequence.',
      },
    },
    {
      title: { ru: 'Сравнить половины', en: 'Compare the halves' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами каждый элемент первой половины с соответствующим элементом второй половины.',
        en: 'Compare and, if needed, swap every element of the first half with the corresponding element of the second half.',
      },
    },
    {
      title: { ru: 'Слить рекурсивно', en: 'Merge recursively' },
      explanation: {
        ru: 'Каждая из двух получившихся половин снова является битонической последовательностью - рекурсивно слить каждую из них тем же способом.',
        en: 'Each of the two resulting halves is itself a bitonic sequence - recursively merge each one the same way.',
      },
    },
    {
      title: { ru: 'Отбросить дополнение', en: 'Drop the padding' },
      explanation: {
        ru: 'После завершения сети сравнений отбросить фиктивные элементы - оставшиеся элементы отсортированы.',
        en: 'Once the comparison network finishes, drop the sentinel elements - the remaining elements are sorted.',
      },
    },
  ],
  stepBreakpoints: [2, 31, 61, 86],

  implementation: {
    javascript: `function bitonicSort(arr) {
  const n = arr.length;
  if (n <= 1) return [...arr];

  let size = 1;
  while (size < n) size *= 2;
  const sentinel = Math.max(...arr) + 1;
  const a = [...arr, ...new Array(size - n).fill(sentinel)];

  function compareAndSwap(i, j, dir) {
    if ((dir === 1 && a[i] > a[j]) || (dir === 0 && a[i] < a[j])) {
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  function bitonicMerge(lo, cnt, dir) {
    if (cnt > 1) {
      const k = Math.floor(cnt / 2);
      for (let i = lo; i < lo + k; i++) compareAndSwap(i, i + k, dir);
      bitonicMerge(lo, k, dir);
      bitonicMerge(lo + k, cnt - k, dir);
    }
  }

  function bitonicSortRec(lo, cnt, dir) {
    if (cnt > 1) {
      const k = Math.floor(cnt / 2);
      bitonicSortRec(lo, k, 1);
      bitonicSortRec(lo + k, cnt - k, 0);
      bitonicMerge(lo, cnt, dir);
    }
  }

  bitonicSortRec(0, size, 1);
  return a.slice(0, n);
}`,
    python: `def bitonic_sort(arr):
    n = len(arr)
    if n <= 1:
        return list(arr)

    size = 1
    while size < n:
        size *= 2
    sentinel = max(arr) + 1
    a = list(arr) + [sentinel] * (size - n)

    def compare_and_swap(i, j, dir_):
        if (dir_ == 1 and a[i] > a[j]) or (dir_ == 0 and a[i] < a[j]):
            a[i], a[j] = a[j], a[i]

    def bitonic_merge(lo, cnt, dir_):
        if cnt > 1:
            k = cnt // 2
            for i in range(lo, lo + k):
                compare_and_swap(i, i + k, dir_)
            bitonic_merge(lo, k, dir_)
            bitonic_merge(lo + k, cnt - k, dir_)

    def bitonic_sort_rec(lo, cnt, dir_):
        if cnt > 1:
            k = cnt // 2
            bitonic_sort_rec(lo, k, 1)
            bitonic_sort_rec(lo + k, cnt - k, 0)
            bitonic_merge(lo, cnt, dir_)

    bitonic_sort_rec(0, size, 1)
    return a[:n]`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [2, 3],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: 'Массив длиной 0 или 1 уже отсортирован по определению - `n <= 1` сразу возвращает копию `[...arr]`, не запуская сеть сравнений вообще.',
          en: 'An array of length 0 or 1 is sorted by definition - `n <= 1` immediately returns a copy `[...arr]` without ever building the comparison network.',
        },
      },
      {
        lines: [5, 8],
        title: { ru: 'Дополнение до степени двойки', en: 'Pad to a power of two' },
        explanation: {
          ru: 'Цикл `while (size < n) size *= 2` находит ближайшую степень двойки не меньше `n`. `sentinel` - значение больше любого элемента массива, оно дополняет массив справа через spread-оператор в `a`, чтобы сеть, рассчитанная на степень двойки, получила подходящий вход.',
          en: 'The loop `while (size < n) size *= 2` finds the nearest power of two that is at least `n`. `sentinel` is a value larger than any array element; it pads the array on the right via the spread operator into `a`, so the network, which assumes a power-of-two size, gets a valid input.',
        },
      },
      {
        lines: [10, 14],
        title: { ru: 'compareAndSwap: один компаратор сети', en: 'compareAndSwap: a single network comparator' },
        explanation: {
          ru: 'Элементарный «кирпичик» всей сети: сравнивает `a[i]` и `a[j]` и меняет их местами, если порядок неверный для направления `dir`. При `dir === 1` требуется возрастание, при `dir === 0` - убывание. Флаг `dir` превращает одну и ту же функцию в компаратор для обеих половин сети.',
          en: 'The elementary building block of the whole network: it compares `a[i]` and `a[j]` and swaps them if the order is wrong for direction `dir`. `dir === 1` means ascending, `dir === 0` means descending. The `dir` flag turns the same function into a comparator for either half of the network.',
        },
      },
      {
        lines: [16, 23],
        title: { ru: 'bitonicMerge: слияние битонической последовательности', en: 'bitonicMerge: merging a bitonic sequence' },
        explanation: {
          ru: '`k = cnt / 2` делит текущий блок пополам. Цикл `for (i = lo; i < lo + k; i++)` сравнивает каждый элемент первой половины с элементом на позиции `i + k` во второй - это и есть шаг «сравнить половины». После этого обе половины сами становятся битоническими последовательностями меньшего размера и рекурсивно сливаются тем же способом (строки 20-21).',
          en: '`k = cnt / 2` splits the current block in half. The loop `for (i = lo; i < lo + k; i++)` compares each element of the first half against the element at position `i + k` in the second - this is the "compare the halves" step. Both halves then become bitonic sequences of half the size and are recursively merged the same way (lines 20-21).',
        },
      },
      {
        lines: [25, 32],
        title: { ru: 'bitonicSortRec: строим и сливаем', en: 'bitonicSortRec: build, then merge' },
        explanation: {
          ru: 'Левая половина (`lo`, `k`) рекурсивно сортируется по возрастанию (`dir = 1`), правая - по убыванию (`dir = 0`). Вместе они образуют битоническую последовательность. Строка 30 вызывает `bitonicMerge` на весь блок с направлением `dir`, полученным извне.',
          en: 'The left half (`lo`, `k`) is recursively sorted ascending (`dir = 1`), the right half descending (`dir = 0`). Together they form a bitonic sequence. Line 30 calls `bitonicMerge` on the whole block with the direction `dir` passed in from the caller.',
        },
      },
      {
        lines: [34, 35],
        title: { ru: 'Запуск и отбрасывание дополнения', en: 'Kick off and drop the padding' },
        explanation: {
          ru: '`bitonicSortRec(0, size, 1)` запускает построение сети на весь дополненный массив с направлением «по возрастанию». `a.slice(0, n)` отбрасывает фиктивные `sentinel`-элементы, оставляя только исходные `n` значений в отсортированном порядке.',
          en: '`bitonicSortRec(0, size, 1)` kicks off the network on the whole padded array with an ascending direction. `a.slice(0, n)` drops the sentinel elements, leaving only the original `n` values in sorted order.',
        },
      },
    ],
    python: [
      {
        lines: [2, 4],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: '`n = len(arr)` вычисляется один раз. Если `n <= 1`, массив уже отсортирован по определению - функция сразу возвращает `list(arr)`, независимую копию, не строя сеть сравнений.',
          en: '`n = len(arr)` is computed once. If `n <= 1`, the array is already sorted by definition - the function returns `list(arr)`, an independent copy, without building any comparison network.',
        },
      },
      {
        lines: [6, 10],
        title: { ru: 'Дополнение до степени двойки', en: 'Pad to a power of two' },
        explanation: {
          ru: 'Цикл `while size < n: size *= 2` находит ближайшую степень двойки. `sentinel = max(arr) + 1` больше любого настоящего элемента. `a = list(arr) + [sentinel] * (size - n)` дополняет копию массива справа фиктивными значениями до нужного размера.',
          en: 'The loop `while size < n: size *= 2` finds the nearest power of two. `sentinel = max(arr) + 1` is larger than any real element. `a = list(arr) + [sentinel] * (size - n)` pads a copy of the array on the right with dummy values up to the required size.',
        },
      },
      {
        lines: [12, 14],
        title: { ru: 'compare_and_swap: один компаратор', en: 'compare_and_swap: one comparator' },
        explanation: {
          ru: 'Сравнивает `a[i]` и `a[j]` и меняет их местами через `a[i], a[j] = a[j], a[i]`, если порядок нарушен для направления `dir_` (суффикс `_`, потому что `dir` - имя встроенной функции Python). При `dir_ == 1` требуется возрастание, при `dir_ == 0` - убывание.',
          en: 'Compares `a[i]` and `a[j]` and swaps them via `a[i], a[j] = a[j], a[i]` if the order is wrong for direction `dir_` (the trailing underscore avoids shadowing Python\'s built-in `dir`). `dir_ == 1` means ascending, `dir_ == 0` means descending.',
        },
      },
      {
        lines: [16, 22],
        title: { ru: 'bitonic_merge: слияние', en: 'bitonic_merge: merging' },
        explanation: {
          ru: '`k = cnt // 2` делит блок пополам целочисленным делением. `range(lo, lo + k)` перебирает позиции первой половины, сравнивая каждую с парной позицией `i + k` во второй - шаг «сравнить половины». Затем обе половины рекурсивно сливаются тем же способом (строки 21-22).',
          en: '`k = cnt // 2` splits the block in half using integer division. `range(lo, lo + k)` walks the positions of the first half, comparing each against its paired position `i + k` in the second half - the "compare the halves" step. Both halves are then recursively merged the same way (lines 21-22).',
        },
      },
      {
        lines: [24, 29],
        title: { ru: 'bitonic_sort_rec: строим и сливаем', en: 'bitonic_sort_rec: build, then merge' },
        explanation: {
          ru: 'Левая половина сортируется рекурсивно по возрастанию (`dir_=1`), правая - по убыванию (`dir_=0`), образуя вместе битоническую последовательность. Строка 29 сливает весь блок вызовом `bitonic_merge` с направлением, переданным извне.',
          en: 'The left half is recursively sorted ascending (`dir_=1`), the right half descending (`dir_=0`), together forming a bitonic sequence. Line 29 merges the whole block via `bitonic_merge` with the direction passed in from the caller.',
        },
      },
      {
        lines: [31, 32],
        title: { ru: 'Запуск и обрезка', en: 'Kick off and trim' },
        explanation: {
          ru: '`bitonic_sort_rec(0, size, 1)` строит сеть на весь дополненный массив с направлением «по возрастанию». `a[:n]` отбрасывает `sentinel`-элементы срезом, возвращая только исходные `n` значений.',
          en: '`bitonic_sort_rec(0, size, 1)` builds the network over the whole padded array with an ascending direction. `a[:n]` drops the sentinel elements via a slice, returning only the original `n` values.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Сеть сравнений полностью фиксирована заранее и не зависит от значений элементов - идеально подходит для параллельного или аппаратного выполнения (GPU, FPGA, SIMD).',
      en: 'The comparison network is completely fixed in advance and independent of element values - ideal for parallel or hardware execution (GPU, FPGA, SIMD).',
    },
    {
      ru: 'Гарантированная сложность O(n log² n) вне зависимости от исходного порядка элементов - нет отдельного «худшего случая», как у быстрой сортировки.',
      en: 'Guaranteed O(n log² n) complexity regardless of the initial ordering - there\'s no separate "worst case" the way there is for quicksort.',
    },
    {
      ru: 'При достаточном числе параллельных процессоров все сравнения одного уровня сети выполняются одновременно, снижая реальное время выполнения до O(log² n).',
      en: 'Given enough parallel processors, all comparisons at one network level run simultaneously, cutting real execution time to O(log² n).',
    },
  ],
  cons: [
    {
      ru: 'Требует дополнения массива до размера, равного степени двойки - на данных произвольного размера часть сравнений выполняется впустую с фиктивными элементами.',
      en: 'Requires padding the array to a power-of-two size - on arbitrary-sized data, some comparisons are wasted on sentinel elements.',
    },
    {
      ru: 'На обычном последовательном процессоре с одним потоком выполняет больше сравнений, чем сортировка слиянием (O(n log² n) против O(n log n)) - параллельность здесь ключевое преимущество, а не сама по себе последовательная скорость.',
      en: 'On an ordinary single-threaded processor it performs more comparisons than merge sort (O(n log² n) vs O(n log n)) - the parallelism is the key advantage here, not raw sequential speed.',
    },
    {
      ru: 'Не является устойчивой сортировкой: фиксированная сеть сравнений не сохраняет исходный относительный порядок равных элементов.',
      en: 'Not a stable sort: the fixed comparison network does not preserve the original relative order of equal elements.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортировка выполняется на параллельном оборудовании (GPU-шейдеры, FPGA, SIMD-инструкции) и важна предсказуемая, полностью статическая последовательность операций.',
      en: 'When sorting runs on parallel hardware (GPU shaders, FPGA, SIMD instructions) and a predictable, fully static sequence of operations matters.',
    },
    {
      ru: 'В задачах с фиксированным, заранее известным размером входных данных, где заранее скомпилированная сеть сравнений может быть развёрнута без циклов и условных переходов.',
      en: 'In problems with a fixed, known-in-advance input size, where a precompiled comparison network can be unrolled without loops or branches.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**GPU-реализации сортировки** (например, в OpenCL и CUDA) часто используют битоническую сортировку именно потому, что её сеть сравнений не содержит ветвлений по данным, что критично для эффективного выполнения на SIMD-архитектурах.',
      en: '**GPU sorting implementations** (e.g., in OpenCL and CUDA) frequently use bitonic sort precisely because its comparison network contains no data-dependent branches, which is critical for efficient execution on SIMD architectures.',
    },
    {
      ru: '**Сети сортировки в аппаратных ускорителях и сетевых коммутаторах** используют битонические сети для сортировки пакетов данных на лету с предсказуемой задержкой и полным параллелизмом.',
      en: '**Sorting networks in hardware accelerators and network switches** use bitonic networks to sort data packets on the fly with predictable latency and full parallelism.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Представь две стрелки, направленные друг к другу: одна последовательность растёт слева направо, другая падает. Вместе они образуют **битоническую последовательность** - подъём, потом спуск (или наоборот). Один-единственный элемент тоже считается битонической последовательностью тривиально - его не с чем сравнивать. Из этих тривиальных «атомов» и строится вся сеть снизу вверх.',
        en: 'Picture two arrows pointing toward each other: one sequence rising left to right, the other falling. Together they form a **bitonic sequence** - a rise, then a fall (or the reverse). A single element also counts as a bitonic sequence trivially, since there is nothing to compare it against. The whole network is built bottom-up from these trivial "atoms".',
      },
      {
        ru: 'Построение идёт снизу вверх, блоками возрастающего размера. Для блока из 2 элементов один сортируется по возрастанию, второй - по убыванию: вместе они уже битоническая пара. Для блока из 4 - две готовые битонические пары сортируются в противоположных направлениях и снова образуют битоническую последовательность вдвое длиннее. Так на каждом уровне размер блока удваивается, пока не охватит весь массив.',
        en: 'Construction proceeds bottom-up, in blocks of doubling size. For a block of 2 elements, one is sorted ascending and the other descending: together they are already a bitonic pair. For a block of 4, two ready-made bitonic pairs are sorted in opposite directions and again form a bitonic sequence twice as long. At each level, the block size doubles until it spans the whole array.',
      },
      {
        ru: 'Слияние битонической последовательности длиной `cnt` работает так: сравнить элемент `i` первой половины с элементом `i + k` второй (`k = cnt / 2`) и поменять местами при необходимости. После этого шага - и это ключевое свойство сети - **все элементы первой половины меньше или равны всем элементам второй** (для возрастающего направления), а обе половины сами остаются битоническими последовательностями. Значит, их можно слить рекурсивно тем же способом, пока размер блока не станет равным 1.',
        en: 'Merging a bitonic sequence of length `cnt` works like this: compare element `i` of the first half against element `i + k` of the second (`k = cnt / 2`) and swap if needed. After this step - and this is the key property of the network - **every element of the first half is less than or equal to every element of the second** (for the ascending direction), while both halves remain bitonic sequences themselves. That means they can be merged recursively the same way, down to blocks of size 1.',
      },
      {
        ru: 'Почему это вообще корректно для произвольных чисел, а не только для наглядного примера? Здесь помогает классический приём теории сетей сравнений - **принцип ноля-единицы** (zero-one principle): если сеть компараторов правильно сортирует любую последовательность из нулей и единиц, она правильно сортирует и любую последовательность произвольных чисел. Доказательство для 0/1-последовательностей проще, потому что таких последовательностей конечное число - его придумал **Кен Бэтчер** в 1968 году вместе с самой сетью.',
        en: 'Why does this work at all for arbitrary numbers, not just the illustrative example? A classic technique from sorting-network theory helps here - the **zero-one principle**: if a comparator network correctly sorts every sequence of zeros and ones, it correctly sorts every sequence of arbitrary numbers too. The proof for 0/1 sequences is simpler because there are finitely many of them, and it was devised by **Ken Batcher** in 1968 alongside the network itself.',
      },
      {
        ru: 'Сложность складывается из двух множителей. Построение битонических блоков удвоенного размера требует **log₂ n** уровней. Слияние блока размера `cnt` само рекурсивное и требует ещё **log₂ cnt** уровней сравнений. Итого получается **log² n** уровней сети, на каждом из которых выполняется O(n) сравнений - отсюда общая сложность **O(n log² n)**, немного хуже, чем O(n log n) у merge sort.',
        en: 'The complexity comes from two multiplied factors. Building bitonic blocks of doubling size takes **log₂ n** levels. Merging a block of size `cnt` is itself recursive and needs another **log₂ cnt** levels of comparisons. That gives **log² n** network levels total, each doing O(n) comparisons - hence the overall **O(n log² n)** complexity, slightly worse than merge sort\'s O(n log n).',
      },
      {
        ru: 'Дополнение до степени двойки - не случайность реализации, а прямое следствие того, как строится сеть: каждый уровень делит блок ровно пополам (`k = cnt / 2`), и это деление предполагается точным. Для произвольного `n` (например, 13) массив дополняют фиктивными **sentinel**-элементами, заведомо большими любого настоящего значения, до ближайшей степени двойки (16). После завершения сети эти элементы просто отбрасываются - они всегда оказываются в конце отсортированного результата.',
        en: 'Padding to a power of two is not an implementation accident but a direct consequence of how the network is built: every level splits a block exactly in half (`k = cnt / 2`), and that split is assumed to be exact. For an arbitrary `n` (say, 13), the array is padded with **sentinel** elements guaranteed to be larger than any real value, up to the nearest power of two (16). Once the network finishes, these elements are simply dropped - they always end up at the end of the sorted result.',
      },
      {
        ru: 'Ключевое отличие от «обычных» быстрых алгоритмов - в том, что именно измеряет сложность. У merge sort и quicksort O(n log n) - это последовательная работа одного процессора. У битонической сети O(n log² n) - тоже последовательная работа, но при наличии n/2 параллельных компараторов **реальное время** выполнения сводится к **глубине сети**, O(log² n), потому что все сравнения одного уровня независимы друг от друга и выполняются одновременно. Именно эта параллельная глубина, а не общее число сравнений, делает сеть привлекательной для GPU и FPGA.',
        en: 'The key difference from "ordinary" fast algorithms is what the complexity actually measures. For merge sort and quicksort, O(n log n) is the sequential work of a single processor. For a bitonic network, O(n log² n) is also sequential work, but given n/2 parallel comparators, the **actual running time** collapses to the **network depth**, O(log² n), because every comparison at one level is independent of the others and runs simultaneously. It is this parallel depth, not the total comparison count, that makes the network attractive for GPUs and FPGAs.',
      },
    ],
    whenToUse: [
      {
        ru: '**Параллельное оборудование** - главная и практически единственная причина выбирать битоническую сортировку. На GPU-шейдерах, FPGA и SIMD-инструкциях важна не общая скорость на одном ядре, а **предсказуемая, статическая последовательность операций без ветвлений по данным** - именно это и даёт фиксированная сеть сравнений.',
        en: '**Parallel hardware** is the primary, almost sole reason to choose bitonic sort. On GPU shaders, FPGAs, and SIMD instructions, what matters is not raw single-core speed but a **predictable, static sequence of operations with no data-dependent branching** - exactly what a fixed comparison network provides.',
      },
      {
        ru: '**Заранее известный, фиксированный размер входа** - ещё одно условие, при котором сеть особенно выгодна. Если размер данных известен на этапе компиляции (например, сортировка 256 частиц в шейдере), сеть можно полностью развернуть без циклов и условных переходов - компилятор превращает её в прямую последовательность инструкций.',
        en: '**A known, fixed input size** is another condition where the network really pays off. If the data size is known at compile time (say, sorting 256 particles in a shader), the network can be fully unrolled without loops or branches - the compiler turns it into a straight sequence of instructions.',
      },
      {
        ru: '**Обычный последовательный процессор** - худший сценарий для битонической сортировки. Она делает O(n log² n) сравнений против O(n log n) у merge sort, то есть **на однопоточном CPU почти всегда медленнее** при большом n. Без параллельного железа выигрыш в предсказуемости не окупает лишние сравнения.',
        en: '**An ordinary single-threaded processor** is the worst scenario for bitonic sort. It performs O(n log² n) comparisons against merge sort\'s O(n log n), meaning it is **almost always slower on single-threaded CPUs** at large n. Without parallel hardware, the predictability gain does not pay for the extra comparisons.',
      },
      {
        ru: '**Три оси сравнения** с соседями по классу: скорость на одном ядре - хуже quicksort и merge sort (лишний множитель log n). Параллельная глубина - лучше почти всех сравнительных сортировок, потому что merge sort имеет O(n) последовательных шагов слияния, а сеть - O(log² n). Предсказуемость - максимальная: пары сравнений известны до запуска, в отличие от quicksort, где выбор опорного элемента зависит от данных.',
        en: '**Three comparison axes** against its comparison-sort peers: single-core speed - worse than quicksort and merge sort (an extra log n factor). Parallel depth - better than almost all comparison sorts, since merge sort has O(n) sequential merge steps while the network has O(log² n). Predictability - maximal: comparison pairs are known before execution, unlike quicksort, where pivot choice depends on the data.',
      },
      {
        ru: '**Данные переменного размера в рантайме** - ситуация, где преимущество сети частично теряется. Дополнение до степени двойки означает, что при n=17 сеть фактически работает с 32 элементами, тратя сравнения на фиктивные sentinel-значения. При сильно нерегулярных размерах данных это может съедать заметную часть выигрыша от параллелизма.',
        en: '**Data with a size that varies at runtime** is a case where the network\'s advantage partially erodes. Padding to a power of two means that for n=17 the network effectively operates on 32 elements, spending comparisons on dummy sentinel values. With highly irregular data sizes, this can eat into a meaningful share of the parallelism gain.',
      },
    ],
    realWorld: [
      {
        ru: '**Игровые движки** - одна из самых заметных практических ниш. Битоническая сортировка через compute-шейдеры используется для сортировки частиц по глубине перед рендерингом прозрачности (order-independent transparency): без сортировки полупрозрачные частицы накладываются в неверном порядке и дают визуальные артефакты. Такой подход применяется в системах частиц Unreal Engine и Unity DOTS - счёт может идти на сотни тысяч частиц за кадр.',
        en: '**Game engines** are one of the most visible practical niches. Bitonic sort via compute shaders is used to sort particles by depth before rendering transparency (order-independent transparency): without sorting, semi-transparent particles composite in the wrong order and produce visual artifacts. This approach appears in the particle systems of Unreal Engine and Unity DOTS, sometimes handling hundreds of thousands of particles per frame.',
      },
      {
        ru: 'Историю сети задал один человек: в 1968 году **Кен Бэтчер** опубликовал статью «Sorting Networks and Their Applications», где представил и битоническую сеть, и родственную ей odd-even mergesort. Обе были придуманы для аппаратных сортирующих устройств задолго до появления современных GPU - идея «сравнения без ветвлений» родилась именно из ограничений железа 1960-х.',
        en: 'The network\'s history traces to one person: in 1968, **Ken Batcher** published "Sorting Networks and Their Applications," introducing both the bitonic network and its relative, odd-even mergesort. Both were designed for hardware sorting devices long before modern GPUs existed - the idea of branch-free comparison was born directly from 1960s hardware constraints.',
      },
      {
        ru: 'До появления современных GPU-библиотек сортировки (вроде **Thrust** для CUDA) программисты реализовывали сортировку на видеокартах через пиксельные шейдеры - в известной статье «Improved GPU Sorting» (GPU Gems 2, 2005) именно битоническая сеть использовалась как основа, потому что старые шейдерные конвейеры вообще не поддерживали условные переходы по данным.',
        en: 'Before modern GPU sorting libraries existed (like **Thrust** for CUDA), programmers implemented GPU sorting through pixel shaders - the well-known "Improved GPU Sorting" article (GPU Gems 2, 2005) used the bitonic network as its foundation precisely because older shader pipelines did not support data-dependent branching at all.',
      },
      {
        ru: '**Сетевое оборудование и FPGA-системы** используют сети сравнений (включая варианты битонической) там, где нужна предсказуемая задержка - например, при построении приоритетных очередей пакетов на коммутаторах или в системах с жёсткими требованиями по latency, таких как FPGA-платформы для алгоритмической торговли, где ранжирование заявок должно укладываться в наносекунды без единого условного перехода.',
        en: '**Network hardware and FPGA systems** use comparison networks (bitonic variants included) wherever latency must be predictable - for example, building priority queues of packets on switches, or in hard-real-time systems like FPGA platforms for algorithmic trading, where ranking orders must fit within nanoseconds without a single conditional branch.',
      },
      {
        ru: 'При этом ни в одной массовой стандартной библиотеке для CPU (V8, CPython, Java) битоническая сортировка не применяется - там правят Timsort и introsort, потому что на одном ядре лишний множитель log n в сложности перевешивает предсказуемость. Битоническая сеть остаётся узкоспециализированным инструментом именно для параллельного и аппаратного мира, а не заменой универсальным алгоритмам.',
        en: 'That said, no mainstream CPU standard library (V8, CPython, Java) uses bitonic sort - Timsort and introsort rule there, because on a single core the extra log n factor outweighs the predictability. The bitonic network remains a narrowly specialized tool for the parallel and hardware world, not a replacement for general-purpose algorithms.',
      },
    ],
  },

  relatedAlgorithms: ['merge-sort', 'heap-sort'],

  quiz: [
    {
      question: {
        ru: 'Что такое «битоническая последовательность»?',
        en: 'What is a "bitonic sequence"?',
      },
      options: [
        {
          ru: 'Последовательность, сначала монотонно возрастающая, а затем монотонно убывающая (или наоборот)',
          en: 'A sequence that first monotonically increases, then monotonically decreases (or vice versa)',
        },
        { ru: 'Последовательность из ровно двух элементов, которые сравниваются напрямую друг с другом на каждом шаге сети', en: 'A sequence of exactly two elements, which are compared directly against each other at every step of the network' },
        { ru: 'Последовательность, отсортированная в случайном порядке на каждом отдельном шаге рекурсивного построения сети', en: 'A sequence sorted in random order at every individual step of the network\'s recursive construction' },
        { ru: 'Последовательность, состоящая только из чётных чисел, поскольку так того требует классическая сеть сравнений', en: 'A sequence consisting only of even numbers, since that is what the classic comparison network requires' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно эта форма («гора» или «долина») позволяет корректно слить последовательность за один проход битонического слияния.',
        en: 'Exactly this shape (a "mountain" or "valley") is what lets the sequence be correctly merged in a single bitonic-merge pass.',
      },
      hint: {
        ru: 'Представьте профиль горы: сначала подъём, потом спуск. Определение - в начале раздела «Как это работает».',
        en: 'Picture a mountain profile: first a rise, then a fall. The definition opens the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Зачем массив дополняется до размера, равного степени двойки?',
        en: 'Why is the array padded to a power-of-two size?',
      },
      options: [
        { ru: 'Классическая сеть построена рекурсивным делением пополам и требует этого размера входа', en: 'The classic bitonic comparison network is built by recursive halving and requires this size' },
        { ru: 'Иначе сортировка даёт неверный результат для отрицательных чисел из-за переполнения при сравнении', en: 'Otherwise the sort gives an incorrect result for negative numbers due to comparison overflow' },
        { ru: 'Это ускоряет работу на обычном процессоре с одним потоком, как и в случае с merge sort', en: 'It speeds up execution on an ordinary single-threaded processor, the same way it does for merge sort' },
        { ru: 'Дополнение не нужно, это просто архитектурная особенность конкретной, не самой удачной реализации', en: 'Padding isn\'t actually needed - it\'s just an implementation quirk of one particular, suboptimal version' },
      ],
      correct: 0,
      explanation: {
        ru: 'Рекурсивное деление cnt/2 на каждом уровне сети предполагает степень двойки; для произвольного n массив дополняют фиктивными элементами.',
        en: 'The recursive cnt/2 split at every network level assumes a power of two; for arbitrary n, the array is padded with sentinel elements.',
      },
      hint: {
        ru: 'Подумайте, как сеть строится рекурсивным делением пополам - объяснено в разделе «Как это работает».',
        en: 'Think about how the network is built by splitting in half - explained in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Почему битоническая сортировка хорошо подходит для параллельного оборудования?',
        en: 'Why is bitonic sort well suited to parallel hardware?',
      },
      options: [
        {
          ru: 'Все пары сравнений известны заранее и не зависят от значений элементов',
          en: 'All comparison pairs are known in advance and don\'t depend on element values',
        },
        { ru: 'Она использует меньше сравнений, чем любой другой известный алгоритм сортировки, включая quicksort и merge sort', en: 'It uses fewer comparisons than any other known sorting algorithm, including quicksort and merge sort' },
        { ru: 'Она никогда не переставляет элементы местами, что экономит время на записи в память при каждом сравнении', en: 'It never swaps elements, which saves time on memory writes during every comparison' },
        { ru: 'Она работает только с уже отсортированными данными, как и большинство других сетей сравнений', en: 'It only works on already-sorted data, like most other comparison networks' },
      ],
      correct: 0,
      explanation: {
        ru: 'Фиксированная, независимая от данных структура сравнений позволяет выполнять их одновременно на многих процессорах без ветвлений.',
        en: 'A fixed, data-independent comparison structure lets many processors execute them simultaneously without branching.',
      },
      hint: {
        ru: 'Что мешает обычным алгоритмам запускать сравнения параллельно? Разбор параллельной глубины - в разделе «Как это работает».',
        en: 'What prevents ordinary algorithms from running comparisons in parallel? See the parallel-depth breakdown in "How it works".',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность битонической сортировки?',
        en: 'What is the time complexity of bitonic sort?',
      },
      options: [
        { ru: 'O(n log² n)', en: 'O(n log² n)' },
        { ru: 'O(n log n), как у сортировки слиянием', en: 'O(n log n), same as merge sort' },
        { ru: 'O(n), поскольку сеть строится заранее', en: 'O(n), since the network is built in advance' },
        { ru: 'O(n²), как у пузырьковой сортировки', en: 'O(n²), same as bubble sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сеть состоит из O(log² n) уровней, каждый из которых требует O(n) сравнений, что даёт в сумме O(n log² n).',
        en: 'The network consists of O(log² n) levels, each requiring O(n) comparisons, giving O(n log² n) overall.',
      },
      hint: {
        ru: 'Сеть имеет O(log² n) уровней, на каждом - O(n) сравнений. Значение указано в бейджах сложности вверху страницы.',
        en: 'The network has O(log² n) levels with O(n) comparisons each. See the complexity badges at the top of the page.',
      },
    },
    {
      question: {
        ru: 'Является ли битоническая сортировка устойчивой (stable)?',
        en: 'Is bitonic sort stable?',
      },
      options: [
        { ru: 'Нет - фиксированная сеть сравнений не сохраняет исходный порядок равных элементов', en: 'No - the fixed comparison network doesn\'t preserve the original order of equal elements' },
        { ru: 'Да, всегда сохраняет порядок равных элементов, точно так же, как это делает merge sort', en: 'Yes, it always preserves the order of equal elements, exactly the way merge sort does' },
        { ru: 'Только если массив уже отсортирован перед началом работы алгоритма сравнения', en: 'Only if the array is already sorted before the comparison algorithm starts running' },
        { ru: 'Устойчивость не определена для сетей сравнений вообще, поскольку это чисто аппаратное понятие', en: 'Stability is undefined for comparison networks in general, since it\'s a purely hardware-level notion' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и большинство сетей сравнений, битоническая сортировка меняет местами равные элементы в зависимости от их позиции в сети, теряя исходный порядок.',
        en: 'Like most comparison networks, bitonic sort swaps equal elements based on their position in the network, losing their original order.',
      },
      hint: {
        ru: 'Может ли сеть с фиксированными парами сравнений «видеть» исходные позиции равных элементов? Ответ прямо указан в разделе «Плюсы и минусы».',
        en: 'Can a network with fixed comparison pairs "see" the original positions of equal elements? Stated directly in the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Чем битоническая сортировка лучше merge sort на параллельном оборудовании?',
        en: 'Where does bitonic sort outperform merge sort on parallel hardware?',
      },
      options: [
        { ru: 'Глубина O(log² n) вместо O(n log n) у merge sort', en: 'Network depth O(log² n) versus O(n log n) sequential steps in merge sort' },
        { ru: 'Меньше сравнений в сумме, что всегда быстрее на любом железе', en: 'Fewer total comparisons overall, making it always faster on any hardware platform' },
        { ru: 'Устойчивость, которой нет у merge sort в параллельной реализации', en: 'Stability that merge sort lacks in a parallel implementation' },
        { ru: 'Отсутствие необходимости в дополнительной памяти для слияния', en: 'No need for any extra memory during the merge phase' },
      ],
      correct: 0,
      explanation: {
        ru: 'При достаточном числе процессоров все сравнения одного уровня сети выполняются одновременно - реальное время сводится к глубине сети O(log² n).',
        en: 'With enough processors, all comparisons at one network level run simultaneously - actual time reduces to the network depth O(log² n).',
      },
      hint: {
        ru: 'Если все сравнения одного уровня выполняются одновременно, что определяет реальное время выполнения? Разбор - в разделе «Плюсы и минусы».',
        en: 'If all comparisons at one level run simultaneously, what determines the actual wall-clock time? See the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Что такое «сеть сравнений» в контексте битонической сортировки?',
        en: 'What is a "comparison network" in the context of bitonic sort?',
      },
      options: [
        { ru: 'Фиксированная схема пар для сравнения, не зависящая от значений элементов', en: 'A fixed pre-determined scheme of element pairs to compare, independent of their values' },
        { ru: 'Граф соседних элементов, по которому строится порядок обходов во время работы', en: 'A graph of neighboring elements used to determine the full traversal order dynamically at runtime' },
        { ru: 'Нейронная сеть, обученная предсказывать результат сравнения двух элементов', en: 'A neural network trained to predict the result of comparing two elements' },
        { ru: 'Компьютерная сеть из нескольких машин, каждая из которых сравнивает свою пару', en: 'A computer network of several machines, each comparing its assigned pair' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сеть сравнений - это набор компараторов (пар индексов), порядок и выбор которых полностью определён до запуска алгоритма, независимо от входных данных.',
        en: 'A comparison network is a set of comparators (index pairs) whose order and selection are fully determined before the algorithm runs, regardless of the input.',
      },
      hint: {
        ru: 'Ключевое слово - «заранее». Определение есть в разделе «Как это работает».',
        en: 'The key word is "in advance." The definition is in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Что происходит, если входной массив имеет размер, не являющийся степенью двойки?',
        en: 'What happens when the input array has a size that is not a power of two?',
      },
      options: [
        { ru: 'Его дополняют фиктивными элементами до ближайшей степени двойки', en: 'It is padded with sentinel elements up to the nearest power of two' },
        { ru: 'Алгоритм выдаёт ошибку и завершается без результата', en: 'The algorithm throws an error and exits without a result' },
        { ru: 'Последний лишний элемент игнорируется при построении сети', en: 'The last leftover element is silently ignored when building the network' },
        { ru: 'Используется более медленная версия алгоритма без рекурсивного деления', en: 'A slower version of the algorithm without recursive halving is used instead' },
      ],
      correct: 0,
      explanation: {
        ru: 'Фиктивные элементы (sentinel) устанавливаются больше любого настоящего, чтобы сеть корректно работала, а после окончания они просто отбрасываются.',
        en: 'Sentinel elements are set larger than any real element so the network operates correctly, and they are simply dropped at the end.',
      },
      hint: {
        ru: 'Как заставить сеть, рассчитанную на степень двойки, работать с произвольным n? Смотри код в разделе «Реализация».',
        en: 'How do you make a network designed for a power of two work with an arbitrary n? See the code in the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'На каком типе оборудования битоническая сортировка применяется на практике?',
        en: 'On what type of hardware is bitonic sort used in practice?',
      },
      options: [
        { ru: 'GPU и FPGA, где важна предсказуемая структура операций', en: 'GPUs and FPGAs, where a predictable operation structure matters' },
        { ru: 'Исключительно одноядерных процессорах без поддержки SIMD', en: 'Exclusively single-core processors without SIMD support' },
        { ru: 'Квантовых компьютерах, так как требует суперпозиции состояний', en: 'Quantum computers, since it requires superposition of quantum states to operate' },
        { ru: 'Только в учебных симуляторах, реальных применений нет', en: 'Only in teaching simulators - no real-world use exists' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отсутствие ветвлений по данным и фиксированная структура операций делают битоническую сортировку идеальной для GPU-шейдеров, FPGA и SIMD-инструкций.',
        en: 'The absence of data-dependent branches and the fixed operation structure make bitonic sort ideal for GPU shaders, FPGAs, and SIMD instructions.',
      },
      hint: {
        ru: 'Какое оборудование выигрывает от отсутствия условных переходов? Примеры (игровые движки, FPGA) перечислены в разделах «Нюансы выбора» и «Примеры в коде».',
        en: 'What hardware benefits from having no conditional branches? Examples (game engines, FPGAs) are listed in the "Choice nuances" and "In code" sections.',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность битонической сортировки?',
        en: 'What is the space complexity of bitonic sort?',
      },
      options: [
        { ru: 'O(n) - на дополненный массив и рекурсивный стек вызовов', en: 'O(n) - for the padded array and the recursive call stack' },
        { ru: 'O(1) - все операции выполняются на месте без каких-либо вспомогательных структур', en: 'O(1) - all operations happen in place with no auxiliary structures at all' },
        { ru: 'O(n log n) - пропорционально числу уровней сети и размеру массива', en: 'O(n log n) - proportional to the number of network levels times the array size' },
        { ru: 'O(n²) - из-за хранения всех пар элементов для сравнения', en: 'O(n²) - due to storing all element pairs to compare' },
      ],
      correct: 0,
      explanation: {
        ru: 'Основная память - это дополненная копия массива размером до 2n, плюс стек рекурсии глубиной O(log² n) - итого O(n).',
        en: 'The main memory is the padded copy of up to 2n elements, plus a recursion stack of depth O(log² n) - giving O(n) overall.',
      },
      hint: {
        ru: 'Нужна ли копия массива для дополнения? Значение указано в бейдже «Память» вверху страницы, код - в «Реализации».',
        en: 'Is a copy of the array needed for padding? See the "Space" badge at the top of the page and the code in "Implementation".',
      },
    },
  ],
};

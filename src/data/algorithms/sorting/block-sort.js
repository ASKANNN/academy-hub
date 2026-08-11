export const blockSort = {
  slug: 'block-sort',
  category: 'sorting',
  name: { ru: 'Block Sort (WikiSort)', en: 'Block Sort (WikiSort)' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'stable', 'merge-based'],

  intent: {
    ru: 'Блочная сортировка (семейство алгоритмов, к которому относится WikiSort) - это устойчивая сортировка слиянием, которая сливает два отсортированных участка на месте, без вспомогательного массива размером O(n), в отличие от классического merge sort.',
    en: 'Block sort (the family of algorithms WikiSort belongs to) is a stable merge sort that merges two sorted runs in place, without an O(n) auxiliary array, unlike classic merge sort.',
  },

  problem: {
    ru: 'Merge sort гарантирует устойчивость и O(n log n), но платит за это O(n) дополнительной памяти на слияние. Heap sort и quicksort экономят память, но теряют устойчивость (heap sort) или гарантию худшего случая (quicksort). Нужен способ слить два отсортированных участка массива друг с другом, оставаясь устойчивым, но не выделяя память, пропорциональную размеру всего массива.',
    en: 'Merge sort guarantees stability and O(n log n), but pays for it with O(n) extra memory for merging. Heap sort and quicksort save memory but lose stability (heap sort) or the worst-case guarantee (quicksort). A way is needed to merge two sorted runs of an array with each other while remaining stable, without allocating memory proportional to the whole array\'s size.',
  },

  solution: {
    ru: 'Идея блочного слияния - переставлять сами элементы внутри массива вместо копирования в буфер. Простейший вариант: при слиянии двух участков [lo, mid) и [mid, hi), как только элемент из правого участка оказывается меньше текущего элемента левого, весь блок между ними сдвигается на одну позицию вправо (поворот подмассива), а меньший элемент занимает освободившееся место. Настоящий WikiSort идёт дальше и переставляет не отдельные элементы, а целые блоки размера ≈√n за один шаг, что и даёт полную гарантию O(n log n) при O(1) памяти - здесь показан упрощённый, но корректный и устойчивый вариант той же идеи на уровне отдельных элементов.',
    en: 'The idea behind block merging is to rearrange the elements themselves within the array instead of copying into a buffer. The simplest version: while merging two runs [lo, mid) and [mid, hi), as soon as an element from the right run is smaller than the current element of the left run, the whole block between them shifts one position right (a subarray rotation), and the smaller element takes the freed spot. Real WikiSort goes further and rearranges whole blocks of size ≈√n at a time, which is what gives the full O(n log n) guarantee at O(1) memory - shown here is a simplified but correct and stable version of the same idea at the level of individual elements.',
  },

  steps: [
    {
      title: { ru: 'Разбить на минимальные прогоны', en: 'Split into minimal runs' },
      explanation: {
        ru: 'Считать каждый отдельный элемент отсортированным подмассивом длины 1 - начальным «прогоном».',
        en: 'Treat each individual element as a sorted subarray of length 1 - an initial "run".',
      },
    },
    {
      title: { ru: 'Слить соседние прогоны на месте', en: 'Merge adjacent runs in place' },
      explanation: {
        ru: 'Для каждой пары соседних прогонов слить их без вспомогательного массива, сдвигая (поворачивая) элементы внутри исходного массива.',
        en: 'For each pair of adjacent runs, merge them without an auxiliary array by shifting (rotating) elements within the original array.',
      },
    },
    {
      title: { ru: 'Сравнить и сдвинуть блок', en: 'Compare and shift the block' },
      explanation: {
        ru: 'Когда элемент правого прогона меньше текущего элемента левого, сдвинуть блок между ними на одну позицию и вставить меньший элемент - это и есть поворот подмассива.',
        en: 'When a right-run element is smaller than the current left-run element, shift the block between them by one position and insert the smaller element - this is the subarray rotation.',
      },
    },
    {
      title: { ru: 'Удвоить длину прогона', en: 'Double the run length' },
      explanation: {
        ru: 'После слияния всех пар прогонов текущей длины удвоить длину прогона и повторить, как в bottom-up merge sort.',
        en: 'After merging all pairs of runs at the current length, double the run length and repeat, as in bottom-up merge sort.',
      },
    },
    {
      title: { ru: 'Повторять до одного прогона', en: 'Repeat until one run remains' },
      explanation: {
        ru: 'Продолжать удваивать длину прогона и сливать, пока весь массив не станет одним отсортированным прогоном.',
        en: 'Keep doubling the run length and merging until the whole array becomes a single sorted run.',
      },
    },
  ],
  stepBreakpoints: [2, 17, 33, 46],

  implementation: {
    javascript: `function mergeInPlace(a, lo, mid, hi) {
  let i = lo, j = mid;
  while (i < j && j < hi) {
    if (a[i] <= a[j]) {
      i++;
    } else {
      const value = a[j];
      for (let k = j; k > i; k--) a[k] = a[k - 1];
      a[i] = value;
      i++;
      j++;
    }
  }
}

function blockSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let width = 1; width < n; width *= 2) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n);
      const hi = Math.min(lo + 2 * width, n);
      if (mid < hi) mergeInPlace(a, lo, mid, hi);
    }
  }
  return a;
}`,
    python: `def merge_in_place(a, lo, mid, hi):
    i, j = lo, mid
    while i < j and j < hi:
        if a[i] <= a[j]:
            i += 1
        else:
            value = a[j]
            for k in range(j, i, -1):
                a[k] = a[k - 1]
            a[i] = value
            i += 1
            j += 1


def block_sort(arr):
    a = arr.copy()
    n = len(a)
    width = 1
    while width < n:
        lo = 0
        while lo < n:
            mid = min(lo + width, n)
            hi = min(lo + 2 * width, n)
            if mid < hi:
                merge_in_place(a, lo, mid, hi)
            lo += 2 * width
        width *= 2
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'mergeInPlace: два указателя', en: 'mergeInPlace: two pointers' },
        explanation: {
          ru: '`i` бежит по левому прогону начиная с `lo`, `j` - по правому начиная с `mid`. Слияние идёт, пока у обоих прогонов остались элементы для сравнения.',
          en: '`i` walks the left run starting at `lo`, `j` walks the right run starting at `mid`. The merge continues as long as both runs still have elements to compare.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Условие цикла и сравнение', en: 'Loop condition and comparison' },
        explanation: {
          ru: 'Цикл `while (i < j && j < hi)` останавливается, когда один из прогонов исчерпан. Внутри `a[i] <= a[j]` проверяет, стоит ли текущий элемент левого прогона на своём месте относительно правого.',
          en: 'The `while (i < j && j < hi)` loop stops once one run is exhausted. Inside, `a[i] <= a[j]` checks whether the current left-run element already belongs before the right-run one.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Элемент уже на месте', en: 'Element already in place' },
        explanation: {
          ru: 'Если `a[i] <= a[j]`, элемент левого прогона меньше или равен - перестановка не нужна, просто `i++` двигает указатель дальше.',
          en: 'If `a[i] <= a[j]`, the left-run element is already smaller or equal - no rearrangement needed, `i++` simply advances the pointer.',
        },
      },
      {
        lines: [6, 11],
        title: { ru: 'Поворот блока', en: 'Rotating the block' },
        explanation: {
          ru: 'Иначе элемент `a[j]` меньше и должен встать раньше `a[i]`. Строка 7 сохраняет его в `value`, цикл `for (k = j; k > i; k--)` сдвигает весь блок `[i, j)` на одну позицию вправо, а строка 9 вставляет сохранённое значение на позицию `i` - это и есть поворот подмассива.',
          en: 'Otherwise `a[j]` is smaller and belongs before `a[i]`. Line 7 saves it into `value`, the `for (k = j; k > i; k--)` loop shifts the whole `[i, j)` block one position right, and line 9 inserts the saved value at position `i` - this is the subarray rotation.',
        },
      },
      {
        lines: [16, 18],
        title: { ru: 'blockSort: копия и длина', en: 'blockSort: copy and length' },
        explanation: {
          ru: '`blockSort` работает на копии `[...arr]`, не трогая исходный массив. `n` - длина массива, используется как граница всех циклов ниже.',
          en: '`blockSort` operates on a copy `[...arr]`, leaving the original array untouched. `n` is the array length, used as the bound for every loop below.',
        },
      },
      {
        lines: [19, 20],
        title: { ru: 'Удвоение ширины прогона', en: 'Doubling the run width' },
        explanation: {
          ru: 'Внешний цикл `for (width = 1; width < n; width *= 2)` - тот же принцип, что и в bottom-up merge sort: ширина прогона удваивается на каждом уровне. Внутренний `for (lo = 0; lo < n; lo += 2 * width)` перебирает пары соседних прогонов текущей ширины.',
          en: 'The outer `for (width = 1; width < n; width *= 2)` loop follows the same principle as bottom-up merge sort: run width doubles at every level. The inner `for (lo = 0; lo < n; lo += 2 * width)` walks adjacent pairs of runs at the current width.',
        },
      },
      {
        lines: [21, 23],
        title: { ru: 'Границы пары прогонов', en: 'Bounding the run pair' },
        explanation: {
          ru: '`mid` и `hi` вычисляются через `Math.min`, чтобы не выйти за пределы массива на последней, неполной паре прогонов. Слияние вызывается только если `mid < hi` - то есть правый прогон действительно существует.',
          en: '`mid` and `hi` use `Math.min` to avoid running past the array\'s end on the last, incomplete pair of runs. The merge is called only if `mid < hi` - meaning a right run actually exists.',
        },
      },
      {
        lines: [26],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После того как ширина прогона превысила `n`, весь массив стал одним отсортированным прогоном - `return a` отдаёт готовый результат.',
          en: 'Once the run width exceeds `n`, the whole array has become a single sorted run - `return a` hands back the finished result.',
        },
      },
    ],
    python: [
      {
        lines: [1, 2],
        title: { ru: 'merge_in_place: два указателя', en: 'merge_in_place: two pointers' },
        explanation: {
          ru: '`i` бежит по левому прогону начиная с `lo`, `j` - по правому начиная с `mid`, заданных через `i, j = lo, mid`.',
          en: '`i` walks the left run starting at `lo`, `j` walks the right run starting at `mid`, set up via `i, j = lo, mid`.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Условие цикла и сравнение', en: 'Loop condition and comparison' },
        explanation: {
          ru: '`while i < j and j < hi` останавливается, когда один из прогонов исчерпан. `if a[i] <= a[j]` проверяет, стоит ли текущий элемент левого прогона на своём месте относительно правого.',
          en: '`while i < j and j < hi` stops once one run is exhausted. `if a[i] <= a[j]` checks whether the current left-run element already belongs before the right-run one.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Элемент уже на месте', en: 'Element already in place' },
        explanation: {
          ru: 'Если `a[i] <= a[j]`, элемент левого прогона меньше или равен - перестановка не нужна, `i += 1` просто двигает указатель дальше.',
          en: 'If `a[i] <= a[j]`, the left-run element is already smaller or equal - no rearrangement needed, `i += 1` simply advances the pointer.',
        },
      },
      {
        lines: [6, 12],
        title: { ru: 'Поворот блока', en: 'Rotating the block' },
        explanation: {
          ru: 'Иначе `a[j]` меньше и должен встать раньше `a[i]`. `value = a[j]` сохраняет его, `for k in range(j, i, -1)` сдвигает блок `[i, j)` на одну позицию вправо, `a[i] = value` вставляет сохранённое значение - это поворот подмассива.',
          en: 'Otherwise `a[j]` is smaller and belongs before `a[i]`. `value = a[j]` saves it, `for k in range(j, i, -1)` shifts the `[i, j)` block one position right, `a[i] = value` inserts the saved value - this is the subarray rotation.',
        },
      },
      {
        lines: [15, 18],
        title: { ru: 'block_sort: копия и длина', en: 'block_sort: copy and length' },
        explanation: {
          ru: '`a = arr.copy()` работает на независимой копии, не трогая исходный список. `n = len(a)` и `width = 1` задают начальные значения для цикла удвоения ниже.',
          en: '`a = arr.copy()` operates on an independent copy, leaving the original list untouched. `n = len(a)` and `width = 1` set the starting values for the doubling loop below.',
        },
      },
      {
        lines: [19, 21],
        title: { ru: 'Удвоение ширины прогона', en: 'Doubling the run width' },
        explanation: {
          ru: '`while width < n` - тот же принцип, что и в bottom-up merge sort: ширина прогона удваивается на каждом уровне (строка 27, `width *= 2`). Вложенный `while lo < n` перебирает пары соседних прогонов текущей ширины.',
          en: '`while width < n` follows the same principle as bottom-up merge sort: run width doubles at every level (line 27, `width *= 2`). The nested `while lo < n` walks adjacent pairs of runs at the current width.',
        },
      },
      {
        lines: [22, 25],
        title: { ru: 'Границы пары прогонов', en: 'Bounding the run pair' },
        explanation: {
          ru: '`mid` и `hi` вычисляются через `min`, чтобы не выйти за пределы списка на последней, неполной паре прогонов. `merge_in_place` вызывается только если `mid < hi` - то есть правый прогон действительно существует.',
          en: '`mid` and `hi` use `min` to avoid running past the list\'s end on the last, incomplete pair of runs. `merge_in_place` is called only if `mid < hi` - meaning a right run actually exists.',
        },
      },
      {
        lines: [28],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После того как `width` превысит `n`, весь список стал одним отсортированным прогоном - `return a` отдаёт готовый результат.',
          en: 'Once `width` exceeds `n`, the whole list has become a single sorted run - `return a` hands back the finished result.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Устойчив и работает по существу на месте - полноценный WikiSort достигает O(1) дополнительной памяти, сохраняя гарантию O(n log n) и устойчивость merge sort.',
      en: 'Stable and essentially in-place - the full WikiSort achieves O(1) extra memory while keeping merge sort\'s O(n log n) guarantee and stability.',
    },
    {
      ru: 'Не имеет патологического худшего случая, в отличие от quicksort, и не жертвует устойчивостью, в отличие от heap sort и intro sort.',
      en: 'Has no pathological worst case, unlike quicksort, and doesn\'t sacrifice stability, unlike heap sort and introsort.',
    },
    {
      ru: 'Как и Timsort, естественно строится на прогонах - можно комбинировать с обнаружением уже упорядоченных участков для адаптивности.',
      en: 'Like Timsort, it naturally builds on runs - it can be combined with detecting already-ordered stretches for adaptivity.',
    },
  ],
  cons: [
    {
      ru: 'Упрощённая версия, показанная здесь, сдвигает элементы по одному, что в худшем случае даёт O(n) на одно слияние блока (то есть O(n²/log n) суммарно для отдельных патологических входов) - полноценный WikiSort избегает этого перестановкой блоков размера √n.',
      en: 'The simplified version shown here shifts elements one at a time, giving O(n) worst case per block merge (i.e., O(n²/log n) total for certain pathological inputs) - the full WikiSort avoids this by rearranging blocks of size √n.',
    },
    {
      ru: 'Полная реализация WikiSort со всеми оптимизациями (блочный своп, буфер для внутреннего слияния, бинарный поиск вставки) значительно сложнее в разработке и отладке, чем обычный merge sort.',
      en: 'The full WikiSort implementation with all its optimizations (block swaps, an internal-merge buffer, binary-search insertion) is substantially harder to develop and debug than plain merge sort.',
    },
    {
      ru: 'На практике часто медленнее quicksort/Timsort на случайных данных из-за дополнительной работы по перестановке блоков.',
      en: 'In practice often slower than quicksort/Timsort on random data due to the extra block-rearrangement work.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда одновременно нужны устойчивость, гарантия худшего случая O(n log n) и жёсткое ограничение памяти - сочетание, которое merge sort, quicksort и heap sort по отдельности не дают.',
      en: 'When stability, an O(n log n) worst-case guarantee, and a hard memory constraint are all required at once - a combination merge sort, quicksort, and heap sort don\'t provide individually.',
    },
    {
      ru: 'Во встраиваемых системах, где выделение O(n) буфера для сортировки недопустимо, но стабильность сортировки критична (например, сортировка записей по нескольким ключам).',
      en: 'In embedded systems where allocating an O(n) sort buffer isn\'t acceptable, but sort stability is critical (e.g., sorting records by multiple keys).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**WikiSort** - открытая реализация 2014 года (Mike McFadden), названная в честь совместной разработки идеи на Wikipedia; демонстрирует, что O(1)-памятный устойчивый merge sort практически реализуем.',
      en: '**WikiSort** - an open-source 2014 implementation (by Mike McFadden), named after the collaborative development of the idea on Wikipedia; demonstrates that an O(1)-memory stable merge sort is practically achievable.',
    },
    {
      ru: '**Grailsort** и другие блочные сортировки** - семейство алгоритмов, вдохновлённых работой Хуанга и Ланглуа (Huang-Langston) по слиянию блоков, используемых в исследовательских и embedded-контекстах.',
      en: '**Grailsort and other block-merge sorts** - a family of algorithms inspired by Huang and Langston\'s block-merging work, used in research and embedded contexts.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Упрощённая версия из этого урока сдвигает элементы по одному, а настоящий WikiSort двигает целые **блоки** размера примерно √n за один шаг. Каждый прогон делится на такие блоки, и вместо десятков отдельных вставок алгоритм переставляет уже собранные блоки местами, как кубики - это на порядок сокращает число операций перемещения при большом n.',
        en: 'The simplified version in this lesson shifts elements one at a time, while real WikiSort moves whole **blocks** of roughly √n elements in a single step. Each run is split into such blocks, and instead of dozens of individual insertions, the algorithm swaps already-assembled blocks like tiles - this cuts the number of move operations by an order of magnitude at large n.',
      },
      {
        ru: 'Чтобы переставлять блоки без выделения памяти, WikiSort сначала выбирает **внутренний буфер** - примерно √n элементов с уникальными значениями, которые временно откладываются в сторону внутри самого массива (никакой отдельной памяти не выделяется). Этот буфер служит рабочей областью для блочных перестановок и локальных слияний внутри одного прогона.',
        en: 'To rearrange blocks without allocating memory, WikiSort first picks an **internal buffer** - roughly √n elements with unique values that are temporarily set aside within the array itself (no separate memory is allocated). This buffer acts as scratch space for block swaps and local merges within one run.',
      },
      {
        ru: 'Блоки из левого прогона помечаются меткой `A`, из правого - `B`. Алгоритм переставляет их с помощью **сортировки выбором по блокам**: находит для каждой позиции блок с наименьшим первым элементом и меняет местами целиком. После такой перестановки блоки идут в нужном порядке, но их внутреннее содержимое ещё не слито - для этого запускается локальное слияние с использованием буфера и **бинарного поиска** точки вставки, что снижает число сравнений на сильно неравных по длине прогонах.',
        en: 'Blocks from the left run are tagged `A`, from the right run `B`. The algorithm rearranges them with a **block selection sort**: for each position it finds the block with the smallest first element and swaps the whole block into place. After this pass, blocks sit in the right order but their contents are not merged yet - a local merge follows, using the buffer and a **binary search** for the insertion point, which cuts comparisons on runs of very unequal length.',
      },
      {
        ru: 'Если в прогоне меньше √n различных значений (например, массив из 1000 повторяющихся `7` и `3`), набрать буфер из уникальных элементов не получается. В этом случае WikiSort переключается на более медленный, но всё ещё безбуферный режим слияния - те же повороты подмассива, что и в упрощённой версии этого урока, только применённые к целым блокам. Именно поэтому WikiSort остаётся корректным на любых данных, а не только на входах с достаточным разнообразием значений.',
        en: 'If a run has fewer than √n distinct values (say, an array of 1000 repeated `7`s and `3`s), a buffer of unique elements can\'t be assembled. In that case WikiSort falls back to a slower, still buffer-free merge mode - the same subarray rotations as the simplified version in this lesson, just applied to whole blocks. This is why WikiSort stays correct on any input, not only on ones with enough value diversity.',
      },
      {
        ru: 'Сложить эти части в оценку O(n log n) можно так: как и в обычном merge sort, длина прогона удваивается на **log₂ n** уровнях. На каждом уровне суммарная работа по перестановке блоков и локальным слияниям пропорциональна n - блоков O(√n), каждый размером O(√n), и перестановка блока стоит O(√n), что в сумме и даёт O(n) на уровень. Итог - O(n log n) сравнений и перемещений при использовании лишь O(1) дополнительных переменных (буфер живёт внутри самого массива, а не вне него).',
        en: 'Adding these pieces up to O(n log n): as in ordinary merge sort, run length doubles across **log₂ n** levels. At each level, the total work of block rearrangement and local merging is proportional to n - there are O(√n) blocks, each of size O(√n), and swapping a block costs O(√n), which sums to O(n) per level. The result is O(n log n) comparisons and moves using only O(1) extra variables (the buffer lives inside the array itself, not outside it).',
      },
      {
        ru: 'Идея слияния в постоянной дополнительной памяти не нова - на неё ещё в 1969 году указал советский математик **М. А. Кронрод**, а полноценный алгоритм с доказанной сложностью O(n log n) описали **Бин-Чао Хуан и Майкл Ланглуа** в конце 1980-х в статье о быстром устойчивом слиянии в постоянной памяти. WikiSort (2014) и родственный ему Grailsort - практические, читаемые реализации именно этой более ранней академической идеи.',
        en: 'The idea of merging in constant extra memory isn\'t new - Soviet mathematician **M. A. Kronrod** pointed toward it back in 1969, and a full algorithm with a proven O(n log n) bound was described by **Bing-Chao Huang and Michael Langston** in the late 1980s, in a paper on fast stable merging in constant space. WikiSort (2014) and its relative Grailsort are practical, readable implementations of that earlier academic idea.',
      },
      {
        ru: 'Инженерный компромисс становится виден в сравнении с Timsort: там, где Timsort тратит до O(n) памяти на буфер, но выигрывает за счёт агрессивного обнаружения уже упорядоченных прогонов и **галопирующего слияния** (galloping merge) на реальных, часто частично отсортированных данных, WikiSort жертвует этой адаптивностью ради жёсткого потолка памяти. Блочная сортировка выигрывает не скоростью на типичных данных, а гарантией - O(1) память и O(n log n) в худшем случае одновременно, без исключений.',
        en: 'The engineering trade-off shows up clearly against Timsort: where Timsort spends up to O(n) memory on a buffer but gains from aggressively detecting already-ordered runs and using **galloping merge** on real, often partially sorted data, WikiSort gives up that adaptivity for a hard memory ceiling. Block sort doesn\'t win on typical-data speed - it wins on guarantees, delivering O(1) memory and worst-case O(n log n) at the same time, with no exceptions.',
      },
    ],
    whenToUse: [
      {
        ru: '**Многократная сортировка больших наборов записей** на устройстве с ограниченной оперативной памятью, где даже временный буфер размером в проценты от общего объёма данных недопустим - например, при сортировке логов на встроенном контроллере с килобайтами свободного ОЗУ.',
        en: '**Repeatedly sorting large record sets** on a device with tight RAM, where even a temporary buffer worth a few percent of the data size is unacceptable - for example, sorting logs on an embedded controller with only kilobytes of free memory.',
      },
      {
        ru: '**Выбор между WikiSort и Timsort** сводится к одному вопросу: что важнее, жёсткая гарантия по памяти или средняя скорость на реальных данных? Python, Java и V8 выбрали Timsort ради адаптивности; блочная сортировка выигрывает только тогда, когда память - это твёрдый лимит, а не просто желательная экономия.',
        en: '**Choosing between WikiSort and Timsort** comes down to one question: which matters more, a hard memory guarantee or average speed on real data? Python, Java, and V8 chose Timsort for its adaptivity; block sort wins only when memory is a hard limit, not just a nice-to-have saving.',
      },
      {
        ru: '**Сортировка записей по нескольким ключам подряд** (например, сначала по отделу, потом по имени), где важно не потерять порядок предыдущей сортировки - устойчивость здесь не опция, а требование корректности, и блочная сортировка даёт её без платы памятью.',
        en: '**Sorting records by several keys in sequence** (say, by department, then by name), where the order from the previous sort must be preserved - stability here isn\'t optional, it\'s a correctness requirement, and block sort delivers it without paying in memory.',
      },
      {
        ru: 'Когда память не ограничена и данные - случайные, без встроенной структуры, блочная сортировка почти всегда проигрывает по скорости и quicksort, и Timsort: лишняя работа по перестановке блоков и выбору буфера окупается только жёстким лимитом памяти, а не сама по себе.',
        en: 'When memory isn\'t constrained and the data is random with no built-in structure, block sort almost always loses on speed to both quicksort and Timsort: the extra work of block rearrangement and buffer selection only pays off under a hard memory limit, not on its own merits.',
      },
      {
        ru: 'По трём осям сравнения с соседями по классу: память - строго O(1), лучше и merge sort, и Timsort. Устойчивость - есть, как у merge sort и Timsort, но не у quicksort и heap sort. Скорость на случайных данных - хуже всех перечисленных из-за накладных расходов на блоки и буфер. Блочная сортировка занимает нишу там, где первая ось важнее третьей.',
        en: 'Across three comparison axes against its peers: memory - a strict O(1), better than both merge sort and Timsort. Stability - present, like merge sort and Timsort, unlike quicksort and heap sort. Speed on random data - worse than all of them due to block and buffer overhead. Block sort occupies the niche where the first axis outweighs the third.',
      },
    ],
    realWorld: [
      {
        ru: '**WikiSort** появился в 2014 году как открытый проект программиста, публиковавшегося под ником BonzaiThePenguin, - название отсылает к тому, что идея алгоритма и его описание собирались коллективно, по образцу википедии, из разрозненных академических источников 1980-х годов.',
        en: '**WikiSort** appeared in 2014 as an open-source project by a developer publishing under the handle BonzaiThePenguin - the name nods to how the algorithm\'s description was assembled collectively, wiki-style, from scattered 1980s academic sources.',
      },
      {
        ru: '**Grailsort**, созданный программистом Андреем Астрелиным (известным под ником Mrrl), - независимая реализация той же идеи блочного слияния, которая легла в основу нескольких портов на C, C#, Java и Rust; ей пользуются в первую очередь в исследовательских и учебных проектах по алгоритмам сортировки, а не в промышленных стандартных библиотеках.',
        en: '**Grailsort**, created by programmer Andrey Astrelin (known as Mrrl), is an independent implementation of the same block-merge idea that became the basis for several ports to C, C#, Java, and Rust; it is used mainly in research and educational sorting-algorithm projects rather than in production standard libraries.',
      },
      {
        ru: 'Академический фундамент заложила статья **Бин-Чао Хуана и Майкла Ланглуа** о слиянии двух отсортированных последовательностей в постоянной дополнительной памяти - именно оттуда взяты идея блочных перестановок и использования части массива как временного буфера, которые WikiSort превратил в работающий, читаемый код тридцать с лишним лет спустя.',
        en: 'The academic foundation was laid by a paper by **Bing-Chao Huang and Michael Langston** on merging two sorted sequences in constant extra space - it is the source of both the block-rearrangement idea and the trick of using part of the array as a temporary buffer, which WikiSort turned into working, readable code more than three decades later.',
      },
      {
        ru: 'Ни один массовый язык программирования не использует блочную сортировку как сортировку по умолчанию: **CPython**, **V8** и **OpenJDK** выбрали Timsort, потому что на типичных, частично упорядоченных входах адаптивность и галопирующее слияние дают лучшую среднюю скорость, чем строгий потолок памяти WikiSort.',
        en: 'No mainstream programming language uses block sort as its default: **CPython**, **V8**, and **OpenJDK** all chose Timsort, because on typical, partially ordered inputs, adaptivity and galloping merge deliver better average speed than WikiSort\'s strict memory ceiling.',
      },
      {
        ru: 'Практическая ниша блочной сортировки - это код, где malloc или new вообще недопустимы во время сортировки: прошивки микроконтроллеров, драйверы и модули ядра, где выделение памяти запрещено правилами безопасности или бюджетом ОЗУ, а устойчивая сортировка записей всё равно нужна.',
        en: 'Block sort\'s practical niche is code where malloc or new are simply not allowed during sorting: microcontroller firmware, drivers, and kernel modules, where memory allocation is forbidden by safety rules or RAM budget, yet a stable sort of records is still required.',
      },
    ],
  },

  relatedAlgorithms: ['merge-sort', 'tim-sort'],

  quiz: [
    {
      question: {
        ru: 'Какую главную проблему обычного merge sort решает блочная сортировка?',
        en: 'What main problem of plain merge sort does block sort solve?',
      },
      options: [
        {
          ru: 'Необходимость O(n) дополнительной памяти для буфера слияния',
          en: 'The need for O(n) extra memory for the merge buffer',
        },
        { ru: 'Отсутствие устойчивости при сортировке записей с одинаковыми ключами', en: 'Lack of stability when sorting records with equal keys' },
        { ru: 'Плохую производительность на строках переменной длины и юникод-символах', en: 'Poor performance on variable-length strings and Unicode characters' },
        { ru: 'Невозможность сортировать по убыванию без дополнительного прохода', en: 'Inability to sort in descending order without an extra pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Классический merge sort копирует данные во вспомогательный массив при слиянии; блочная сортировка переставляет элементы на месте, избегая этого.',
        en: 'Classic merge sort copies data into an auxiliary array while merging; block sort rearranges elements in place, avoiding that.',
      },
      hint: {
        ru: 'Merge sort - устойчивый и O(n log n), но за что он «платит» при слиянии двух участков? Ответ - в разделе «Суть», в описании проблемы.',
        en: 'Merge sort is stable and O(n log n), but what does it "pay" when merging two runs? See the problem description in the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Как упрощённая версия из этого урока сливает два отсортированных участка без буфера?',
        en: 'How does this lesson\'s simplified version merge two sorted runs without a buffer?',
      },
      options: [
        {
          ru: 'Сдвигая (поворачивая) блок элементов внутри массива на месте, когда элемент из правого участка меньше текущего из левого',
          en: 'By shifting (rotating) a block of elements within the array in place whenever a right-run element is smaller than the current left-run one',
        },
        { ru: 'Создавая полную копию всего массива в отдельном временном буфере заранее, перед началом аккуратного слияния двух отсортированных участков', en: 'By creating a full copy of the whole array in a separate temporary buffer ahead of time, before starting to carefully merge the two sorted runs' },
        { ru: 'Удаляя дубликаты перед слиянием, чтобы существенно сократить общий объём работы алгоритма при слиянии двух участков', en: 'By removing duplicates before merging, to significantly reduce the algorithm\'s overall amount of work when merging the two runs' },
        { ru: 'Сортируя оба участка заново вместе с самого начала обычным алгоритмом quicksort, как это делают некоторые гибридные реализации на практике сегодня', en: 'By re-sorting both runs together from scratch using plain quicksort, the way some hybrid implementations do in practice today' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сдвиг блока - это поворот подмассива на месте, который вставляет меньший элемент на нужную позицию без выделения новой памяти.',
        en: 'The block shift is an in-place subarray rotation that inserts the smaller element at the right position without allocating new memory.',
      },
      hint: {
        ru: 'Если элемент из правого участка должен встать раньше, нужно сдвинуть мешающие элементы. Механика описана в разделе «Суть», код - в «Реализации».',
        en: 'If a right-run element needs to go earlier, the elements in the way must shift. Explained in the "Intent" tab, code in "Implementation".',
      },
    },
    {
      question: {
        ru: 'Чем настоящий WikiSort отличается от упрощённой версии, показанной в этом уроке?',
        en: 'How does the real WikiSort differ from the simplified version shown in this lesson?',
      },
      options: [
        {
          ru: 'Он переставляет блоки размера примерно √n за раз вместо отдельных элементов, что даёт полную гарантию O(n log n)',
          en: 'It rearranges blocks of roughly √n elements at a time instead of individual elements, giving the full O(n log n) guarantee',
        },
        { ru: 'Он не является устойчивым, в отличие от упрощённой версии, показанной здесь в этом уроке, и требует отдельной пометки исходных индексов элементов', en: 'It isn\'t stable, unlike the simplified version shown here in this lesson, and needs separate index tagging of elements to fix' },
        { ru: 'Он использует O(n) дополнительной памяти, точно так же, как классический merge sort, вместо работы почти на месте', en: 'It uses O(n) extra memory, exactly the same way classic merge sort does, instead of working nearly in place' },
        { ru: 'Он не умеет сортировать массивы с повторяющимися элементами или значениями вообще, в отличие от упрощённой версии', en: 'It can\'t sort arrays with duplicate elements or repeated values at all, unlike the simplified version' },
      ],
      correct: 0,
      explanation: {
        ru: 'Перестановка целых блоков вместо отдельных элементов - ключевая оптимизация, которая избегает O(n) сдвигов на каждое слияние в худшем случае.',
        en: 'Rearranging whole blocks instead of individual elements is the key optimization that avoids O(n) shifts per merge in the worst case.',
      },
      hint: {
        ru: 'Упрощённая версия сдвигает по одному элементу. Что WikiSort делает иначе - разобрано в первом абзаце раздела «Как это работает».',
        en: 'The simplified version shifts one element at a time. What WikiSort does differently is explained in the first paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Является ли блочная сортировка устойчивой (stable)?',
        en: 'Is block sort stable?',
      },
      options: [
        { ru: 'Да - равные из левого участка остаются перед равными из правого', en: 'Yes - equal elements from the left run always stay before equal ones from the right' },
        { ru: 'Нет, как и heap sort, из-за постоянных перестановок элементов внутри кучи', en: 'No, like heap sort, because of how elements are constantly rearranged inside the heap' },
        { ru: 'Только для чисел, но не для строк или более сложных составных объектов', en: 'Only for numbers, not for strings or more complex composite objects' },
        { ru: 'Зависит от размера входного массива и выбранного заранее размера блока', en: 'It depends on the input array\'s size and the block size chosen beforehand' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие слияния `a[i] <= a[j]` отдаёт приоритет левому элементу при равенстве, что и обеспечивает устойчивость.',
        en: 'The merge condition `a[i] <= a[j]` favors the left element on ties, which is exactly what preserves stability.',
      },
      hint: {
        ru: 'Посмотрите на условие слияния `a[i] <= a[j]` в разделе «Реализация»: какой элемент попадёт в результат первым при равенстве?',
        en: 'Look at the `a[i] <= a[j]` merge condition in the "Implementation" tab: when equal, which element ends up in the result first?',
      },
    },
    {
      question: {
        ru: 'Какую комбинацию свойств блочная сортировка предлагает, недоступную ни quicksort, ни heap sort по отдельности?',
        en: 'What combination of properties does block sort offer that neither quicksort nor heap sort provides alone?',
      },
      options: [
        {
          ru: 'Устойчивость + гарантия O(n log n) в худшем случае + O(1) дополнительной памяти',
          en: 'Stability + a guaranteed O(n log n) worst case + O(1) extra memory',
        },
        { ru: 'O(n) время выполнения в лучшем случае для абсолютно любых входных данных без исключений', en: 'O(n) best-case time for absolutely any input data, no exceptions' },
        { ru: 'Полное отсутствие сравнений элементов благодаря особой блочной структуре алгоритма', en: 'No element comparisons at all, thanks to the algorithm\'s special block structure' },
        { ru: 'Параллельное выполнение без потоков за счёт блочного слияния на месте', en: 'Parallel execution without threads, thanks to in-place block merging' },
      ],
      correct: 0,
      explanation: {
        ru: 'Quicksort не гарантирует O(n log n) в худшем случае, heap sort неустойчив, а обычный merge sort требует O(n) памяти - блочная сортировка совмещает все три свойства.',
        en: 'Quicksort doesn\'t guarantee O(n log n) worst case, heap sort is unstable, and plain merge sort needs O(n) memory - block sort combines all three properties.',
      },
      hint: {
        ru: 'Найдите слабость каждого из трёх конкурентов: quicksort, heap sort, merge sort - все три перечислены в разделе «Плюсы и минусы».',
        en: 'Find the weakness of each competitor - quicksort, heap sort, merge sort - all three are listed in the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность упрощённой версии блочной сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of the simplified block sort version shown here?',
      },
      options: [
        { ru: 'O(n² / log n) из-за сдвига элементов по одному при каждом слиянии', en: 'O(n² / log n) due to shifting elements one at a time during each merge' },
        { ru: 'O(n log n), как и у полного WikiSort, за счёт умного выбора блоков', en: 'O(n log n), same as full WikiSort, thanks to smart block selection always' },
        { ru: 'O(n²) из-за повторного прохода по всему массиву при каждом сдвиге', en: 'O(n²) from re-scanning the entire array on every shift operation' },
        { ru: 'O(n log² n), как у битонической сортировки на той же структуре данных', en: 'O(n log² n), same as bitonic sort on the same data structure' },
      ],
      correct: 0,
      explanation: {
        ru: 'На патологических входах каждый сдвиг блока стоит O(n), а таких сдвигов может быть O(n / log n) на каждом уровне - итого O(n² / log n), что хуже, чем у полного WikiSort.',
        en: 'On pathological inputs, each block shift costs O(n), and there can be O(n / log n) such shifts per level - giving O(n² / log n) total, worse than full WikiSort.',
      },
      hint: {
        ru: 'Сдвиг одного элемента стоит O(n) в худшем случае. Разбор итоговой оценки - в первом пункте раздела «Плюсы и минусы» (минусы).',
        en: 'Shifting one element costs O(n) in the worst case. The full breakdown is in the first item of the "Cons" list under "Pros & Cons".',
      },
    },
    {
      question: {
        ru: 'Почему блочная сортировка особенно ценна во встроенных системах?',
        en: 'Why is block sort especially valuable in embedded systems?',
      },
      options: [
        { ru: 'Она устойчива и работает без дополнительного O(n) буфера', en: 'It is stable and works without an O(n) auxiliary buffer' },
        { ru: 'Она самая быстрая на случайных данных из всех известных алгоритмов', en: 'It is the fastest on random data among all known algorithms' },
        { ru: 'Она не требует сравнений, что снижает нагрузку на процессор', en: 'It requires no comparisons, reducing processor load' },
        { ru: 'Она автоматически адаптируется к любому типу данных без настройки', en: 'It auto-adapts to any data type without configuration' },
      ],
      correct: 0,
      explanation: {
        ru: 'Во встроенных системах памяти мало, а стабильность порядка записей часто критична - блочная сортировка даёт оба свойства без O(n) буфера.',
        en: 'In embedded systems memory is scarce and record-order stability is often critical - block sort delivers both without an O(n) buffer.',
      },
      hint: {
        ru: 'Что является главным ограничением во встроенных системах? Первый пункт подраздела «Нюансы выбора» (сразу после «Как это работает») разбирает это напрямую.',
        en: 'What is the main constraint in embedded systems? The first item of the "Choice nuances" subsection (right after "How it works") addresses this directly.',
      },
    },
    {
      question: {
        ru: 'На каком принципе основана идея «слияния на месте» в блочной сортировке?',
        en: 'What principle underlies the "in-place merge" idea in block sort?',
      },
      options: [
        { ru: 'Поворот (сдвиг) подмассива, чтобы вставить элемент без выделения памяти', en: 'Rotating a subarray to insert an element without allocating memory' },
        { ru: 'Удвоение массива с последующим сжатием дубликатов в финальный результат', en: 'Doubling the array and then compressing duplicates into the final result' },
        { ru: 'Хэширование элементов для определения их целевых позиций заранее', en: 'Hashing elements to determine their target positions in advance' },
        { ru: 'Разбиение на простые числа для гарантии равномерного распределения', en: 'Splitting on prime numbers to guarantee even distribution' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поворот подмассива - ключевая идея: когда нужно вставить элемент правого участка раньше, блок сдвигается вправо, освобождая место без дополнительной памяти.',
        en: 'Subarray rotation is the key idea: when a right-run element must be inserted earlier, the block shifts right to make room without extra memory.',
      },
      hint: {
        ru: 'Как переместить элемент к нужной позиции внутри массива, не выделяя буфер? Название приёма дано в разделе «Суть», код - в «Реализации».',
        en: 'How do you move an element to its target position without allocating a buffer? The technique is named in the "Intent" tab, the code is in "Implementation".',
      },
    },
    {
      question: {
        ru: 'Что общего между блочной сортировкой и Timsort?',
        en: 'What do block sort and Timsort have in common?',
      },
      options: [
        { ru: 'Оба строятся на слиянии отсортированных прогонов', en: 'Both are built on merging sorted runs' },
        { ru: 'Оба используют O(n) памяти и нестабильны по определению', en: 'Both use O(n) memory and are unstable by definition' },
        { ru: 'Оба работают только с целыми числами в заранее известном диапазоне', en: 'Both only work with integers in a pre-known range' },
        { ru: 'Оба требуют предварительной сортировки половины массива перед запуском', en: 'Both require pre-sorting half the array before starting' },
      ],
      correct: 0,
      explanation: {
        ru: 'И блочная сортировка, и Timsort используют идею прогонов и их последовательного слияния, что позволяет им адаптироваться к уже упорядоченным участкам.',
        en: 'Both block sort and Timsort exploit the idea of runs and their sequential merging, which lets them adapt to already-ordered stretches.',
      },
      hint: {
        ru: 'Подумайте о структуре данных, которую оба алгоритма используют как строительные блоки перед слиянием - третий пункт плюсов в «Плюсы и минусы», а сравнение их подхода к памяти разобрано в последнем абзаце «Как это работает».',
        en: 'Think about the data structure both algorithms use as building blocks before merging - see the third "Pros" item in "Pros & Cons", and the memory-tradeoff comparison in the last paragraph of "How it works".',
      },
    },
    {
      question: {
        ru: 'Чем полный WikiSort улучшает гарантию по времени по сравнению с упрощённой версией?',
        en: 'How does the full WikiSort improve the time guarantee over the simplified version?',
      },
      options: [
        { ru: 'Переставляет блоки √n за один шаг вместо отдельных элементов', en: 'Rearranges whole blocks of size √n in one step instead of individual elements' },
        { ru: 'Использует хэш-таблицу для мгновенного поиска нужной позиции вставки', en: 'Uses a hash table for instant lookup of the target insertion position in all cases' },
        { ru: 'Запускает несколько потоков для параллельного слияния отдельных прогонов', en: 'Spawns multiple threads to merge separate runs in parallel' },
        { ru: 'Копирует данные в буфер размером O(log n) вместо O(n)', en: 'Copies data into a buffer of size O(log n) instead of O(n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Блочная перестановка размером √n позволяет избежать O(n) сдвигов на каждое элементарное слияние, сохраняя гарантию O(n log n) при O(1) памяти.',
        en: 'Block swaps of size √n avoid O(n) shifts per elementary merge, preserving the O(n log n) guarantee at O(1) memory.',
      },
      hint: {
        ru: 'Узкое место упрощённой версии - сдвиг по одному элементу. Как WikiSort ускоряет это через блоки и внутренний буфер - разобрано в первых трёх абзацах раздела «Как это работает».',
        en: 'The bottleneck of the simplified version is shifting one element at a time. How WikiSort speeds this up via blocks and an internal buffer is covered in the first three paragraphs of "How it works".',
      },
    },
  ],
};

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
    ru: 'Блочная сортировка (семейство алгоритмов, к которому относится WikiSort) — это устойчивая сортировка слиянием, которая сливает два отсортированных участка на месте, без вспомогательного массива размером O(n), в отличие от классического merge sort.',
    en: 'Block sort (the family of algorithms WikiSort belongs to) is a stable merge sort that merges two sorted runs in place, without an O(n) auxiliary array, unlike classic merge sort.',
  },

  problem: {
    ru: 'Merge sort гарантирует устойчивость и O(n log n), но платит за это O(n) дополнительной памяти на слияние. Heap sort и quicksort экономят память, но теряют устойчивость (heap sort) или гарантию худшего случая (quicksort). Нужен способ слить два отсортированных участка массива друг с другом, оставаясь устойчивым, но не выделяя память, пропорциональную размеру всего массива.',
    en: 'Merge sort guarantees stability and O(n log n), but pays for it with O(n) extra memory for merging. Heap sort and quicksort save memory but lose stability (heap sort) or the worst-case guarantee (quicksort). A way is needed to merge two sorted runs of an array with each other while remaining stable, without allocating memory proportional to the whole array\'s size.',
  },

  solution: {
    ru: 'Идея блочного слияния — переставлять сами элементы внутри массива вместо копирования в буфер. Простейший вариант: при слиянии двух участков [lo, mid) и [mid, hi), как только элемент из правого участка оказывается меньше текущего элемента левого, весь блок между ними сдвигается на одну позицию вправо (поворот подмассива), а меньший элемент занимает освободившееся место. Настоящий WikiSort идёт дальше и переставляет не отдельные элементы, а целые блоки размера ≈√n за один шаг, что и даёт полную гарантию O(n log n) при O(1) памяти — здесь показан упрощённый, но корректный и устойчивый вариант той же идеи на уровне отдельных элементов.',
    en: 'The idea behind block merging is to rearrange the elements themselves within the array instead of copying into a buffer. The simplest version: while merging two runs [lo, mid) and [mid, hi), as soon as an element from the right run is smaller than the current element of the left run, the whole block between them shifts one position right (a subarray rotation), and the smaller element takes the freed spot. Real WikiSort goes further and rearranges whole blocks of size ≈√n at a time, which is what gives the full O(n log n) guarantee at O(1) memory — shown here is a simplified but correct and stable version of the same idea at the level of individual elements.',
  },

  steps: [
    {
      title: { ru: 'Разбить на минимальные прогоны', en: 'Split into minimal runs' },
      explanation: {
        ru: 'Считать каждый отдельный элемент отсортированным подмассивом длины 1 — начальным «прогоном».',
        en: 'Treat each individual element as a sorted subarray of length 1 — an initial "run".',
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
        ru: 'Когда элемент правого прогона меньше текущего элемента левого, сдвинуть блок между ними на одну позицию и вставить меньший элемент — это и есть поворот подмассива.',
        en: 'When a right-run element is smaller than the current left-run element, shift the block between them by one position and insert the smaller element — this is the subarray rotation.',
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

  pros: [
    {
      ru: 'Устойчив и работает по существу на месте — полноценный WikiSort достигает O(1) дополнительной памяти, сохраняя гарантию O(n log n) и устойчивость merge sort.',
      en: 'Stable and essentially in-place — the full WikiSort achieves O(1) extra memory while keeping merge sort\'s O(n log n) guarantee and stability.',
    },
    {
      ru: 'Не имеет патологического худшего случая, в отличие от quicksort, и не жертвует устойчивостью, в отличие от heap sort и intro sort.',
      en: 'Has no pathological worst case, unlike quicksort, and doesn\'t sacrifice stability, unlike heap sort and introsort.',
    },
    {
      ru: 'Как и Timsort, естественно строится на прогонах — можно комбинировать с обнаружением уже упорядоченных участков для адаптивности.',
      en: 'Like Timsort, it naturally builds on runs — it can be combined with detecting already-ordered stretches for adaptivity.',
    },
  ],
  cons: [
    {
      ru: 'Упрощённая версия, показанная здесь, сдвигает элементы по одному, что в худшем случае даёт O(n) на одно слияние блока (то есть O(n²/log n) суммарно для отдельных патологических входов) — полноценный WikiSort избегает этого перестановкой блоков размера √n.',
      en: 'The simplified version shown here shifts elements one at a time, giving O(n) worst case per block merge (i.e., O(n²/log n) total for certain pathological inputs) — the full WikiSort avoids this by rearranging blocks of size √n.',
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
      ru: 'Когда одновременно нужны устойчивость, гарантия худшего случая O(n log n) и жёсткое ограничение памяти — сочетание, которое merge sort, quicksort и heap sort по отдельности не дают.',
      en: 'When stability, an O(n log n) worst-case guarantee, and a hard memory constraint are all required at once — a combination merge sort, quicksort, and heap sort don\'t provide individually.',
    },
    {
      ru: 'Во встраиваемых системах, где выделение O(n) буфера для сортировки недопустимо, но стабильность сортировки критична (например, сортировка записей по нескольким ключам).',
      en: 'In embedded systems where allocating an O(n) sort buffer isn\'t acceptable, but sort stability is critical (e.g., sorting records by multiple keys).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**WikiSort** — открытая реализация 2014 года (Mike McFadden), названная в честь совместной разработки идеи на Wikipedia; демонстрирует, что O(1)-памятный устойчивый merge sort практически реализуем.',
      en: '**WikiSort** — an open-source 2014 implementation (by Mike McFadden), named after the collaborative development of the idea on Wikipedia; demonstrates that an O(1)-memory stable merge sort is practically achievable.',
    },
    {
      ru: '**Grailsort** и другие блочные сортировки** — семейство алгоритмов, вдохновлённых работой Хуанга и Ланглуа (Huang-Langston) по слиянию блоков, используемых в исследовательских и embedded-контекстах.',
      en: '**Grailsort and other block-merge sorts** — a family of algorithms inspired by Huang and Langston\'s block-merging work, used in research and embedded contexts.',
    },
  ],

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
        ru: 'Merge sort — устойчивый и O(n log n), но за что он «платит» при слиянии двух участков?',
        en: 'Merge sort is stable and O(n log n), but what does it "pay" when merging two runs?',
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
        ru: 'Сдвиг блока — это поворот подмассива на месте, который вставляет меньший элемент на нужную позицию без выделения новой памяти.',
        en: 'The block shift is an in-place subarray rotation that inserts the smaller element at the right position without allocating new memory.',
      },
      hint: {
        ru: 'Если элемент из правого участка должен встать раньше, нужно сдвинуть мешающие элементы. Как это сделать без буфера?',
        en: 'If a right-run element needs to go earlier, the elements in the way must shift. How to do that without a buffer?',
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
        ru: 'Перестановка целых блоков вместо отдельных элементов — ключевая оптимизация, которая избегает O(n) сдвигов на каждое слияние в худшем случае.',
        en: 'Rearranging whole blocks instead of individual elements is the key optimization that avoids O(n) shifts per merge in the worst case.',
      },
      hint: {
        ru: 'Упрощённая версия сдвигает по одному элементу. Что WikiSort делает иначе, чтобы избежать этой дороговизны?',
        en: 'The simplified version shifts one element at a time. What does WikiSort do differently to avoid that cost?',
      },
    },
    {
      question: {
        ru: 'Является ли блочная сортировка устойчивой (stable)?',
        en: 'Is block sort stable?',
      },
      options: [
        { ru: 'Да — равные из левого участка остаются перед равными из правого', en: 'Yes — equal elements from the left run always stay before equal ones from the right' },
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
        ru: 'Посмотрите на условие слияния: что происходит, когда два элемента равны — какой из них попадёт в результат первым?',
        en: 'Look at the merge condition: when two elements are equal, which one ends up in the result first?',
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
        ru: 'Quicksort не гарантирует O(n log n) в худшем случае, heap sort неустойчив, а обычный merge sort требует O(n) памяти — блочная сортировка совмещает все три свойства.',
        en: 'Quicksort doesn\'t guarantee O(n log n) worst case, heap sort is unstable, and plain merge sort needs O(n) memory — block sort combines all three properties.',
      },
      hint: {
        ru: 'Найдите слабость каждого из трёх конкурентов: quicksort, heap sort, merge sort — и проверьте, какой из них лишён каждой из этих слабостей.',
        en: 'Find the weakness of each competitor — quicksort, heap sort, merge sort — and check which of those weaknesses block sort avoids.',
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
        ru: 'На патологических входах каждый сдвиг блока стоит O(n), а таких сдвигов может быть O(n / log n) на каждом уровне — итого O(n² / log n), что хуже, чем у полного WikiSort.',
        en: 'On pathological inputs, each block shift costs O(n), and there can be O(n / log n) such shifts per level — giving O(n² / log n) total, worse than full WikiSort.',
      },
      hint: {
        ru: 'Сдвиг одного элемента стоит O(n) в худшем случае. Сколько таких сдвигов может быть за всё время работы?',
        en: 'Shifting one element costs O(n) in the worst case. How many such shifts can happen over the entire run?',
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
        ru: 'Во встроенных системах памяти мало, а стабильность порядка записей часто критична — блочная сортировка даёт оба свойства без O(n) буфера.',
        en: 'In embedded systems memory is scarce and record-order stability is often critical — block sort delivers both without an O(n) buffer.',
      },
      hint: {
        ru: 'Что является главным ограничением во встроенных системах и почему merge sort там неудобен?',
        en: 'What is the main constraint in embedded systems, and why is plain merge sort inconvenient there?',
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
        ru: 'Поворот подмассива — ключевая идея: когда нужно вставить элемент правого участка раньше, блок сдвигается вправо, освобождая место без дополнительной памяти.',
        en: 'Subarray rotation is the key idea: when a right-run element must be inserted earlier, the block shifts right to make room without extra memory.',
      },
      hint: {
        ru: 'Как переместить элемент к нужной позиции внутри массива, не выделяя буфер?',
        en: 'How do you move an element to its target position inside the array without allocating a buffer?',
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
        ru: 'Подумайте о структуре данных, которую оба алгоритма используют как строительные блоки перед слиянием.',
        en: 'Think about the data structure both algorithms use as building blocks before merging.',
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
        ru: 'Узкое место упрощённой версии — сдвиг по одному элементу. Как WikiSort делает это же быстрее?',
        en: 'The bottleneck of the simplified version is shifting one element at a time. How does WikiSort do the same thing faster?',
      },
    },
  ],
};

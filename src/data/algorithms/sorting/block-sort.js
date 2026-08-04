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
    javascript: `// Упрощённая учебная реализация: устойчивое слияние на месте
// через сдвиг блока (поворот), без буфера O(n).
// Настоящий WikiSort переставляет блоки размера ~sqrt(n) за раз для полной
// гарантии O(n log n); здесь та же идея показана на уровне элементов.
function mergeInPlace(a, lo, mid, hi) {
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
    },
    {
      question: {
        ru: 'Является ли блочная сортировка устойчивой (stable)?',
        en: 'Is block sort stable?',
      },
      options: [
        { ru: 'Да — равные элементы из левого участка всегда остаются перед равными из правого', en: 'Yes — equal elements from the left run always stay before equal ones from the right' },
        { ru: 'Нет, как и heap sort, из-за постоянных перестановок элементов внутри кучи', en: 'No, like heap sort, because of how elements are constantly rearranged inside the heap' },
        { ru: 'Только для чисел, но не для строк или более сложных составных объектов', en: 'Only for numbers, not for strings or more complex composite objects' },
        { ru: 'Зависит от размера входного массива и выбранного заранее размера блока', en: 'It depends on the input array\'s size and the block size chosen beforehand' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие слияния `a[i] <= a[j]` отдаёт приоритет левому элементу при равенстве, что и обеспечивает устойчивость.',
        en: 'The merge condition `a[i] <= a[j]` favors the left element on ties, which is exactly what preserves stability.',
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
    },
  ],
};

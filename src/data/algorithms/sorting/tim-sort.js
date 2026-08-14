export const timSort = {
  slug: 'tim-sort',
  category: 'sorting',
  name: { ru: 'Timsort', en: 'Timsort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 3,
  tags: ['hybrid', 'stable', 'comparison', 'adaptive'],

  intent: {
    ru: 'Timsort - гибридный алгоритм, объединяющий сортировку вставками для маленьких «прогонов» (run) и сортировку слиянием для их объединения, специально настроенный на реальные данные, которые часто содержат уже отсортированные участки.',
    en: 'Timsort is a hybrid algorithm combining insertion sort for small "runs" with merge sort for combining them, specifically tuned for real-world data that often contains already-sorted stretches.',
  },

  problem: {
    ru: 'Сортировка слиянием даёт гарантию O(n log n), но игнорирует структуру реальных данных: логи, отсортированные по времени с редкими вставками, частично обработанные списки - всё это содержит длинные уже отсортированные участки. Сортировка вставками эффективна на маленьких и почти отсортированных массивах, но деградирует до O(n²) на больших случайных данных. Нужен алгоритм, который использует сильные стороны обоих подходов и адаптируется к реальному, а не худшему случаю.',
    en: 'Merge sort guarantees O(n log n) but ignores the structure of real-world data: time-ordered logs with occasional inserts, partially processed lists - these all contain long already-sorted stretches. Insertion sort is efficient on small and nearly sorted arrays but degrades to O(n²) on large random data. What is needed is an algorithm that combines the strengths of both and adapts to the real case, not just the worst case.',
  },

  solution: {
    ru: 'Timsort идёт по массиву и сначала ищет естественный прогон - уже упорядоченный участок, который в реальных данных встречается сам по себе. Если участок убывает, он разворачивается за O(k) и становится возрастающим прогоном бесплатно. Если естественный прогон короче minrun (обычно 32-64 элемента), он **достраивается** сортировкой вставками до длины minrun - на таком размере она быстрее из-за низких констант. Отсортированные прогоны затем сливаются попарно тем же механизмом слияния, что и в merge sort, пока не останется один отсортированный массив. Чем длиннее естественные прогоны во входных данных, тем меньше слияний требуется.',
    en: 'Timsort walks the array and first looks for a natural run - an already-ordered stretch that shows up on its own in real data. If the stretch is descending, it is reversed in O(k) and becomes an ascending run for free. If the natural run is shorter than minrun (typically 32-64 elements), it is **extended** with insertion sort up to minrun length - at that size insertion sort is faster due to low constant factors. The sorted runs are then merged pairwise using the same merge mechanism as merge sort, until one sorted array remains. The longer the natural runs already present in the input, the fewer merges are needed.',
  },

  steps: [
    {
      title: { ru: 'Найти естественный прогон', en: 'Detect a natural run' },
      explanation: {
        ru: 'Пройти от текущей позиции и найти уже упорядоченный участок; если он убывает, развернуть его за O(k), превратив в возрастающий.',
        en: 'Scan from the current position for an already-ordered stretch; if it is descending, reverse it in O(k), turning it into an ascending run.',
      },
    },
    {
      title: { ru: 'Достроить прогон до minrun', en: 'Extend the run to minrun' },
      explanation: {
        ru: 'Если найденный прогон короче minrun (например, 32 элемента), досортировать его вставками до этой длины.',
        en: 'If the detected run is shorter than minrun (e.g. 32 elements), extend it with insertion sort up to that length.',
      },
    },
    {
      title: { ru: 'Слить соседние прогоны', en: 'Merge adjacent runs' },
      explanation: {
        ru: 'Слить пары соседних отсортированных прогонов тем же способом, что и в сортировке слиянием.',
        en: 'Merge pairs of adjacent sorted runs the same way merge sort does.',
      },
    },
    {
      title: { ru: 'Удваивать размер слитых блоков', en: 'Double the merged block size' },
      explanation: {
        ru: 'После каждого раунда слияния размер отсортированных блоков удваивается - повторять, пока блоков больше одного.',
        en: 'After each merge round, the size of sorted blocks doubles - repeat while more than one block remains.',
      },
    },
    {
      title: { ru: 'Получить единый отсортированный массив', en: 'Obtain the final sorted array' },
      explanation: {
        ru: 'Когда остаётся один блок размером со весь массив, он и есть результат сортировки.',
        en: 'When a single block spanning the whole array remains, it is the sorted result.',
      },
    },
  ],
  stepBreakpoints: [2, 8, 26, 40],

  implementation: {
    javascript: `const MIN_RUN = 32;

function insertionSortRange(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
}

function findRunEnd(arr, start, n) {
  if (start === n - 1) return start;
  let end = start + 1;
  if (arr[end] < arr[start]) {
    while (end < n - 1 && arr[end + 1] < arr[end]) end++;
    let left = start, right = end;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  } else {
    while (end < n - 1 && arr[end + 1] >= arr[end]) end++;
  }
  return end;
}

function merge(arr, left, mid, right) {
  const leftPart = arr.slice(left, mid + 1);
  const rightPart = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < leftPart.length && j < rightPart.length) {
    if (leftPart[i] <= rightPart[j]) arr[k++] = leftPart[i++];
    else arr[k++] = rightPart[j++];
  }
  while (i < leftPart.length) arr[k++] = leftPart[i++];
  while (j < rightPart.length) arr[k++] = rightPart[j++];
}

function timSort(arr) {
  const a = [...arr];
  const n = a.length;
  if (n < 2) return a;

  const runs = [];
  let start = 0;
  while (start < n) {
    let end = findRunEnd(a, start, n);
    if (end - start + 1 < MIN_RUN) {
      end = Math.min(start + MIN_RUN - 1, n - 1);
      insertionSortRange(a, start, end);
    }
    runs.push([start, end]);
    start = end + 1;
  }

  while (runs.length > 1) {
    const merged = [];
    for (let i = 0; i < runs.length; i += 2) {
      if (i + 1 < runs.length) {
        const [left, mid] = runs[i];
        const [, right] = runs[i + 1];
        merge(a, left, mid, right);
        merged.push([left, right]);
      } else {
        merged.push(runs[i]);
      }
    }
    runs.length = 0;
    runs.push(...merged);
  }

  return a;
}`,
    python: `MIN_RUN = 32


def insertion_sort_range(arr, left, right):
    for i in range(left + 1, right + 1):
        current = arr[i]
        j = i - 1
        while j >= left and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = current


def find_run_end(arr, start, n):
    if start == n - 1:
        return start
    end = start + 1
    if arr[end] < arr[start]:
        while end < n - 1 and arr[end + 1] < arr[end]:
            end += 1
        left, right = start, end
        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
    else:
        while end < n - 1 and arr[end + 1] >= arr[end]:
            end += 1
    return end


def merge(arr, left, mid, right):
    left_part = arr[left:mid + 1]
    right_part = arr[mid + 1:right + 1]
    i = j = 0
    k = left

    while i < len(left_part) and j < len(right_part):
        if left_part[i] <= right_part[j]:
            arr[k] = left_part[i]
            i += 1
        else:
            arr[k] = right_part[j]
            j += 1
        k += 1

    while i < len(left_part):
        arr[k] = left_part[i]
        i += 1
        k += 1
    while j < len(right_part):
        arr[k] = right_part[j]
        j += 1
        k += 1


def tim_sort(arr):
    a = arr.copy()
    n = len(a)
    if n < 2:
        return a

    runs = []
    start = 0
    while start < n:
        end = find_run_end(a, start, n)
        if end - start + 1 < MIN_RUN:
            end = min(start + MIN_RUN - 1, n - 1)
            insertion_sort_range(a, start, end)
        runs.append((start, end))
        start = end + 1

    while len(runs) > 1:
        merged = []
        for i in range(0, len(runs), 2):
            if i + 1 < len(runs):
                left, mid = runs[i]
                _, right = runs[i + 1]
                merge(a, left, mid, right)
                merged.append((left, right))
            else:
                merged.append(runs[i])
        runs = merged

    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Порог minrun', en: 'The minrun threshold' },
        explanation: {
          ru: 'Константа `MIN_RUN = 32` задаёт минимальную длину прогона: короче него сортировка вставками ещё выигрывает у слияния по константным расходам.',
          en: 'The constant `MIN_RUN = 32` sets the minimum run length: below it, insertion sort still beats merging on constant-factor overhead.',
        },
      },
      {
        lines: [3, 6],
        title: { ru: 'Сигнатура insertionSortRange', en: 'insertionSortRange signature' },
        explanation: {
          ru: 'Функция сортирует вставками только диапазон `[left, right]` массива `arr`, а не весь массив - она вызывается и для достройки прогона, и как утилита.',
          en: 'The function insertion-sorts only the `[left, right]` slice of `arr`, not the whole array - it is reused both to extend a run and as a general utility.',
        },
      },
      {
        lines: [7, 11],
        title: { ru: 'Сдвиг и вставка', en: 'Shift and insert' },
        explanation: {
          ru: 'Пока слева стоит элемент больше текущего, он сдвигается на одну позицию вправо; когда цикл останавливается, `current` вставляется в освободившуюся ячейку.',
          en: 'While the element to the left is greater than `current`, it shifts one position right; once the loop stops, `current` is inserted into the freed slot.',
        },
      },
      {
        lines: [15, 17],
        title: { ru: 'Сигнатура findRunEnd', en: 'findRunEnd signature' },
        explanation: {
          ru: 'Функция ищет, где заканчивается естественный прогон, начинающийся в `start` - возвращает индекс последнего элемента этого прогона.',
          en: 'The function finds where the natural run starting at `start` ends - it returns the index of that run\'s last element.',
        },
      },
      {
        lines: [18, 19],
        title: { ru: 'Обнаружение убывающего прогона', en: 'Detecting a descending run' },
        explanation: {
          ru: 'Если следующий элемент меньше текущего, прогон убывает - цикл расширяет `end`, пока последовательность продолжает убывать (строго, без повторов).',
          en: 'If the next element is smaller than the current one, the run is descending - the loop extends `end` while the sequence keeps strictly decreasing.',
        },
      },
      {
        lines: [20, 25],
        title: { ru: 'Разворот убывающего прогона', en: 'Reversing the descending run' },
        explanation: {
          ru: 'Найденный убывающий участок разворачивается на месте за O(k) двумя указателями - после разворота он становится готовым возрастающим прогоном без единого сравнения с соседями.',
          en: 'The found descending stretch is reversed in place in O(k) with two pointers - after reversal it becomes a ready ascending run without a single extra comparison against neighbors.',
        },
      },
      {
        lines: [26, 28],
        title: { ru: 'Ветка возрастающего прогона', en: 'The ascending-run branch' },
        explanation: {
          ru: 'Если следующий элемент не меньше текущего, прогон уже возрастает - цикл просто расширяет `end`, пока порядок не нарушится.',
          en: 'If the next element is not smaller, the run is already ascending - the loop simply extends `end` until the order breaks.',
        },
      },
      {
        lines: [32, 35],
        title: { ru: 'Сигнатура merge', en: 'merge signature' },
        explanation: {
          ru: 'Классическое слияние двух смежных отсортированных диапазонов `[left, mid]` и `[mid+1, right]`, идентичное merge sort - копирует их во временные массивы и сливает обратно.',
          en: 'Classic merging of two adjacent sorted ranges `[left, mid]` and `[mid+1, right]`, identical to merge sort - copies them into temporary arrays and merges back.',
        },
      },
      {
        lines: [37, 42],
        title: { ru: 'Слияние с сохранением порядка равных', en: 'Merging while preserving equal order' },
        explanation: {
          ru: 'Сравнение `<=` (не `<`) означает: при равенстве элемент из левой части берётся первым - это и делает Timsort устойчивым.',
          en: 'The `<=` comparison (not `<`) means: on a tie, the element from the left part is taken first - this is exactly what makes Timsort stable.',
        },
      },
      {
        lines: [45, 48],
        title: { ru: 'Точка входа', en: 'Entry point' },
        explanation: {
          ru: 'Массив копируется, чтобы не мутировать вход; массивы из 0-1 элементов уже отсортированы и возвращаются сразу.',
          en: 'The array is copied so the input is not mutated; arrays of 0-1 elements are already sorted and returned immediately.',
        },
      },
      {
        lines: [50, 60],
        title: { ru: 'Построение списка прогонов', en: 'Building the list of runs' },
        explanation: {
          ru: 'Для каждой позиции ищется естественный прогон; если он короче minrun, он достраивается сортировкой вставками. Каждая пара `[start, end]` запоминается в `runs`.',
          en: 'For each position, a natural run is found; if it is shorter than minrun, it is extended with insertion sort. Each `[start, end]` pair is recorded in `runs`.',
        },
      },
      {
        lines: [62, 76],
        title: { ru: 'Попарное слияние прогонов', en: 'Pairwise merging of runs' },
        explanation: {
          ru: 'Пока прогонов больше одного, соседние пары сливаются, а нечётный последний прогон переносится без изменений в следующий раунд - число раундов равно ceil(log2(число прогонов)).',
          en: 'While more than one run remains, adjacent pairs are merged, and a leftover odd run is carried unchanged into the next round - the number of rounds equals ceil(log2(number of runs)).',
        },
      },
      {
        lines: [78],
        title: { ru: 'Результат', en: 'Result' },
        explanation: {
          ru: 'Когда остаётся один прогон, охватывающий весь массив, он и есть отсортированный результат.',
          en: 'When a single run spanning the whole array remains, it is the sorted result.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Порог minrun', en: 'The minrun threshold' },
        explanation: {
          ru: '`MIN_RUN = 32` - тот же порог, что и в JS-версии: ниже него вставки эффективнее слияния из-за низких констант.',
          en: '`MIN_RUN = 32` - the same threshold as the JS version: below it, insertion sort beats merging thanks to low constant factors.',
        },
      },
      {
        lines: [4, 7],
        title: { ru: 'Сигнатура insertion_sort_range', en: 'insertion_sort_range signature' },
        explanation: {
          ru: 'Сортирует вставками только диапазон `[left, right]` списка `arr` - переиспользуется и для достройки прогона до minrun.',
          en: 'Insertion-sorts only the `[left, right]` slice of `arr` - reused both to extend a run to minrun.',
        },
      },
      {
        lines: [8, 11],
        title: { ru: 'Сдвиг и вставка', en: 'Shift and insert' },
        explanation: {
          ru: 'Элементы больше `current` сдвигаются вправо; когда `while` останавливается, `current` вставляется в освободившееся место.',
          en: 'Elements greater than `current` shift right; once the `while` stops, `current` is inserted into the freed slot.',
        },
      },
      {
        lines: [14, 17],
        title: { ru: 'Сигнатура find_run_end', en: 'find_run_end signature' },
        explanation: {
          ru: 'Находит конец естественного прогона, начинающегося в `start`; для последнего элемента массива прогон тривиально состоит из одного элемента.',
          en: 'Finds the end of the natural run starting at `start`; for the array\'s last element the run trivially consists of one element.',
        },
      },
      {
        lines: [18, 20],
        title: { ru: 'Обнаружение убывающего прогона', en: 'Detecting a descending run' },
        explanation: {
          ru: 'Если следующий элемент меньше текущего, `end` расширяется, пока последовательность строго убывает.',
          en: '`end` is extended while the following elements keep strictly decreasing.',
        },
      },
      {
        lines: [21, 25],
        title: { ru: 'Разворот убывающего прогона', en: 'Reversing the descending run' },
        explanation: {
          ru: 'Найденный убывающий участок разворачивается на месте двумя указателями за O(k), становясь готовым возрастающим прогоном.',
          en: 'The descending stretch is reversed in place with two pointers in O(k), becoming a ready ascending run.',
        },
      },
      {
        lines: [26, 28],
        title: { ru: 'Ветка возрастающего прогона', en: 'The ascending-run branch' },
        explanation: {
          ru: 'Если прогон уже возрастает, `end` просто расширяется, пока порядок не нарушится.',
          en: 'If the run is already ascending, `end` simply extends until the order breaks.',
        },
      },
      {
        lines: [32, 36],
        title: { ru: 'Сигнатура merge', en: 'merge signature' },
        explanation: {
          ru: 'Копирует диапазоны `[left, mid]` и `[mid+1, right]` во временные списки перед слиянием - та же техника, что в merge sort.',
          en: 'Copies the `[left, mid]` and `[mid+1, right]` ranges into temporary lists before merging - the same technique as merge sort.',
        },
      },
      {
        lines: [38, 45],
        title: { ru: 'Слияние с сохранением порядка равных', en: 'Merging while preserving equal order' },
        explanation: {
          ru: 'Сравнение `<=` берёт элемент из левой части при равенстве первым - именно это делает Timsort устойчивым.',
          en: 'The `<=` comparison takes the left-part element first on a tie - this is exactly what makes Timsort stable.',
        },
      },
      {
        lines: [57, 61],
        title: { ru: 'Точка входа', en: 'Entry point' },
        explanation: {
          ru: 'Список копируется, чтобы не менять вход; списки из 0-1 элементов уже отсортированы.',
          en: 'The list is copied so the input stays unmodified; lists of 0-1 elements are already sorted.',
        },
      },
      {
        lines: [63, 71],
        title: { ru: 'Построение списка прогонов', en: 'Building the list of runs' },
        explanation: {
          ru: 'Для каждой позиции ищется естественный прогон; короткие достраиваются вставками до minrun, границы каждого прогона сохраняются в `runs`.',
          en: 'A natural run is found for each position; short ones are extended with insertion sort up to minrun, and each run\'s bounds are stored in `runs`.',
        },
      },
      {
        lines: [73, 83],
        title: { ru: 'Попарное слияние прогонов', en: 'Pairwise merging of runs' },
        explanation: {
          ru: 'Соседние прогоны сливаются попарно за раунд; непарный последний переносится без изменений - число раундов логарифмическое от числа прогонов.',
          en: 'Adjacent runs are merged pairwise per round; a leftover unpaired run carries over unchanged - the number of rounds is logarithmic in the run count.',
        },
      },
      {
        lines: [85],
        title: { ru: 'Результат', en: 'Result' },
        explanation: {
          ru: 'Когда остаётся один прогон на весь список, он и есть отсортированный результат.',
          en: 'When a single run spans the whole list, it is the sorted result.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Адаптивен: на частично отсортированных данных приближается к O(n), используя существующие прогоны напрямую.',
      en: 'Adaptive: approaches O(n) on partially sorted data by using existing runs directly.',
    },
    {
      ru: 'Устойчив - как и merge sort, сохраняет относительный порядок равных элементов, что важно при сортировке объектов.',
      en: 'Stable - like merge sort, preserves the relative order of equal elements, important when sorting objects.',
    },
    {
      ru: 'На маленьких прогонах использует сортировку вставками, избегая накладных расходов рекурсии на низком уровне.',
      en: 'Uses insertion sort on small runs, avoiding recursion overhead at the low level.',
    },
    {
      ru: 'Проверенная в промышленных условиях реализация - стандартная сортировка в Python и Java уже больше десяти лет.',
      en: 'Battle-tested in production - the default sort in Python and Java for over a decade.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти для временных массивов при слиянии, как и обычный merge sort.',
      en: 'Needs O(n) extra memory for temporary arrays during merging, same as regular merge sort.',
    },
    {
      ru: 'Сложнее в реализации и отладке, чем любой из алгоритмов, из которых он состоит по отдельности.',
      en: 'More complex to implement and debug than either of the algorithms it is built from individually.',
    },
    {
      ru: 'На полностью случайных данных без структуры не даёт заметного выигрыша перед обычным merge sort.',
      en: 'On fully random data with no structure, offers no meaningful advantage over plain merge sort.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сортируются реальные данные, которые часто частично упорядочены (логи, истории изменений, повторные сортировки).',
      en: 'When sorting real-world data that is often partially ordered (logs, change histories, repeated sorts).',
    },
    {
      ru: 'Когда нужна и устойчивость, и хорошая производительность на типичных, а не только на худших входных данных.',
      en: 'When both stability and good performance on typical (not just worst-case) input are required.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Python** использует Timsort как реализацию встроенных `sorted()` и `list.sort()` с 2002 года.',
      en: '**Python** has used Timsort to implement the built-in `sorted()` and `list.sort()` since 2002.',
    },
    {
      ru: '**Java** использует Timsort в `Collections.sort()` и `Arrays.sort()` для массивов объектов (не примитивов).',
      en: '**Java** uses Timsort in `Collections.sort()` and `Arrays.sort()` for arrays of objects (not primitives).',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Ключевая идея Timsort - не изобретение нового способа сравнивать элементы, а **переиспользование структуры, которая уже есть во входных данных**. Прежде чем что-либо сортировать, алгоритм сначала *ищет* прогоны: участки, которые уже возрастают или убывают. На массиве `[1, 3, 5, 4, 2, 6, 8]` первый прогон `[1, 3, 5]` находится за 2 сравнения, ничего не пересортировывая.',
        en: 'The core idea of Timsort is not a new way to compare elements, but **reusing structure already present in the input**. Before sorting anything, the algorithm first *looks* for runs: stretches that are already ascending or descending. On `[1, 3, 5, 4, 2, 6, 8]`, the first run `[1, 3, 5]` is found in 2 comparisons, without re-sorting anything.',
      },
      {
        ru: 'Убывающие прогоны не отбрасываются - они **разворачиваются** за O(k), где k - длина прогона, и становятся полноценными возрастающими прогонами. Это дёшево: разворот делает k/2 обменов, тогда как пересортировка вставками того же участка потребовала бы до k²/4 сравнений в худшем случае. На участке из 8 убывающих элементов это 4 обмена вместо потенциальных 16 сравнений.',
        en: 'Descending runs are not discarded - they are **reversed** in O(k), where k is the run length, becoming full ascending runs. This is cheap: reversal does k/2 swaps, whereas re-sorting the same stretch with insertion sort could take up to k²/4 comparisons in the worst case. On an 8-element descending stretch that is 4 swaps instead of up to 16 comparisons.',
      },
      {
        ru: 'Если естественный прогон короче **minrun** (в этой реализации фиксировано 32, в CPython вычисляется динамически через сдвиг битов длины массива так, чтобы n/minrun было близко к степени двойки), прогон **достраивается** сортировкой вставками до этой длины - не пересортировывается с нуля, а именно достраивается, потому что уже найденный префикс остаётся частью диапазона `insertionSortRange`.',
        en: 'If a natural run is shorter than **minrun** (fixed at 32 in this implementation; in CPython it is computed dynamically by shifting the array length\'s bits so that n/minrun is close to a power of two), the run is **extended** with insertion sort up to that length - not re-sorted from scratch, since the already-found prefix stays inside the `insertionSortRange` call.',
      },
      {
        ru: 'Настоящий (CPython) Timsort сливает прогоны не парами подряд, а через **стек с тремя инвариантами длины** и режим **галопирования** (galloping): если один прогон стабильно "побеждает" другой много раз подряд, слияние переключается на бинарный поиск позиции вставки вместо поэлементного сравнения. Эта реализация упрощена до попарного слияния прогонов раундами без стека и без галопирования - она сохраняет и адаптивность (короткое число раундов при длинных естественных прогонах), и устойчивость, но не достигает точной производительности продакшен-версии на структурированных данных.',
        en: 'Real (CPython) Timsort does not merge runs in simple consecutive pairs - it uses a **stack with three length invariants** and a **galloping mode**: if one run keeps "winning" against another many times in a row, merging switches to binary search for the insertion point instead of element-by-element comparison. This implementation is simplified to plain pairwise round-based merging without a stack or galloping - it keeps both adaptivity (few rounds when natural runs are long) and stability, but does not match production-version performance on highly structured data.',
      },
      {
        ru: 'Проверка на реальных прогонах массива из 1000 элементов: уже отсортированный массив даёт **999 сравнений всего** (одно на пару соседей при поиске единственного прогона на весь массив), тогда как n·log₂(n) ≈ 9966 - более чем в 9 раз меньше. Случайный массив из 1000 элементов даёт около **13700-14000 сравнений**, что того же порядка, что и n·log₂(n), с некоторым запасом из-за O(n²) внутри блоков minrun.',
        en: 'Measured on a real 1000-element array: an already-sorted array takes just **999 comparisons total** (one per neighboring pair while finding the single run spanning the whole array), versus n·log₂(n) ≈ 9966 - more than 9 times fewer. A random 1000-element array takes roughly **13,700-14,000 comparisons**, the same order as n·log₂(n), with some overhead from the O(n²) work inside each minrun block.',
      },
      {
        ru: 'Обычный merge sort не умеет использовать существующий порядок: он всегда делит массив пополам и сливает, независимо от того, отсортирован вход или нет, и всегда делает порядка n·log₂(n) сравнений. Timsort же на уже отсортированном массиве находит один прогон на весь массив и вообще не делает ни одного раунда слияния - это и есть разница между "гарантированная асимптотика" и "адаптивная асимптотика".',
        en: 'Plain merge sort cannot exploit existing order: it always splits the array in half and merges, regardless of whether the input is sorted, always doing on the order of n·log₂(n) comparisons. Timsort, on an already-sorted array, finds a single run spanning the whole array and performs zero merge rounds at all - that is the difference between "guaranteed asymptotics" and "adaptive asymptotics".',
      },
      {
        ru: 'Timsort был написан **Тимом Питерсом (Tim Peters)** в 2002 году специально для CPython, заменив предыдущую реализацию сортировки на основе samplesort. Название буквально "Tim\'s sort" - редкий случай алгоритма, названного в честь конкретного инженера, а не абстрактного принципа, как у большинства классических сортировок.',
        en: 'Timsort was written by **Tim Peters** in 2002 specifically for CPython, replacing a previous samplesort-based implementation. The name is literally "Tim\'s sort" - a rare case of an algorithm named after a specific engineer rather than an abstract principle, unlike most classic sorts.',
      },
    ],
    whenToUse: [
      {
        ru: '**По сравнению с обычным merge sort**: выбирайте Timsort, когда входные данные хотя бы иногда содержат порядок (логи, повторные сортировки почти тех же данных) - на полностью случайных данных выигрыш исчезает, и оба алгоритма делают сопоставимую работу.',
        en: '**Versus plain merge sort**: pick Timsort when the input at least sometimes contains order (logs, repeated sorts of near-identical data) - on fully random data the advantage disappears and both algorithms do comparable work.',
      },
      {
        ru: '**По сравнению с quicksort**: если нужна гарантия отсутствия O(n²) в худшем случае и устойчивость (сохранение порядка равных ключей), Timsort предпочтительнее - quicksort быстрее в среднем, но может деградировать и не устойчив без модификаций.',
        en: '**Versus quicksort**: if a guaranteed absence of O(n²) worst case and stability (preserving the order of equal keys) are required, Timsort is preferable - quicksort is faster on average but can degrade and is not stable without modification.',
      },
      {
        ru: 'Когда сортировка выполняется **многократно по разным ключам** одного набора данных (например, сначала по дате, потом стабильно по статусу) - устойчивость гарантирует, что вторая сортировка не разрушит порядок, установленный первой.',
        en: 'When sorting is performed **repeatedly by different keys** on the same dataset (e.g., first by date, then stably by status) - stability guarantees the second sort will not destroy the order established by the first.',
      },
      {
        ru: 'Крайний случай - **очень маленькие массивы (n < minrun)**: тогда Timsort вырождается в чистую сортировку вставками, без единого раунда слияния - для таких размеров можно с тем же результатом использовать insertion sort напрямую и не тянуть за собой сложность гибридной реализации.',
        en: 'Edge case - **very small arrays (n < minrun)**: Timsort degenerates into pure insertion sort, with zero merge rounds - at that size, using insertion sort directly gives the same result without pulling in the complexity of the hybrid implementation.',
      },
    ],
    realWorld: [
      {
        ru: '**CPython** (`Objects/listobject.c`, функция `listsort_impl`) - оригинальная реализация Тима Питерса 2002 года для `list.sort()` и `sorted()`, до сих пор используется практически без изменений в логике прогонов.',
        en: '**CPython** (`Objects/listobject.c`, `listsort_impl`) - Tim Peters\' original 2002 implementation for `list.sort()` and `sorted()`, still used with essentially unchanged run logic today.',
      },
      {
        ru: '**OpenJDK** портировал Timsort в `java.util.Collections.sort()` и `Arrays.sort(Object[])` в 2009 году (JDK 7) - примитивные массивы (`int[]`, `double[]`) при этом по-прежнему сортируются dual-pivot quicksort, потому что для них устойчивость не имеет смысла (нет "равных, но разных" объектов).',
        en: '**OpenJDK** ported Timsort into `java.util.Collections.sort()` and `Arrays.sort(Object[])` in 2009 (JDK 7) - primitive arrays (`int[]`, `double[]`) are still sorted with dual-pivot quicksort, since stability is meaningless there (no "equal but distinct" objects).',
      },
      {
        ru: '**V8** (движок JavaScript в Chrome и Node.js) использует вариант Timsort для `Array.prototype.sort()` с 2018 года, заменив нестабильный quicksort - это устранило класс багов, где `sort()` менял порядок визуально одинаковых строк в UI.',
        en: '**V8** (the JavaScript engine in Chrome and Node.js) has used a Timsort variant for `Array.prototype.sort()` since 2018, replacing an unstable quicksort - this eliminated a class of bugs where `sort()` reordered visually identical strings in UI code.',
      },
      {
        ru: '**Android** использует Timsort в `Collections.sort()` через тот же код OpenJDK, что делает его одним из самых часто исполняемых алгоритмов сортировки в мире по числу устройств, где он фактически работает.',
        en: '**Android** uses Timsort in `Collections.sort()` via the same OpenJDK code, making it one of the most frequently executed sorting algorithms in the world by number of devices it actually runs on.',
      },
    ],
  },

  relatedAlgorithms: ['merge-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Из каких двух алгоритмов состоит Timsort?',
        en: 'Which two algorithms is Timsort built from?',
      },
      options: [
        {
          ru: 'Сортировка вставками (для прогонов) и сортировка слиянием (для их объединения)',
          en: 'Insertion sort (for runs) and merge sort (for combining them)',
        },
        {
          ru: 'Быстрая сортировка для прогонов и пирамидальная сортировка для их окончательного слияния',
          en: 'Quicksort for the runs and heap sort for their final combination step',
        },
        {
          ru: 'Сортировка пузырьком для маленьких прогонов и сортировка подсчётом для их объединения',
          en: 'Bubble sort for small runs and counting sort for combining them together',
        },
        {
          ru: 'Только классическая сортировка слиянием без каких-либо модификаций или гибридизации',
          en: 'Just classic merge sort, completely unmodified and without any hybridization at all',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Timsort сортирует маленькие прогоны сортировкой вставками, а затем сливает их механизмом слияния, идентичным merge sort.',
        en: 'Timsort sorts small runs with insertion sort, then merges them using a mechanism identical to merge sort.',
      },
      hint: {
        ru: 'Смотрите абзац `solution` на вкладке «Суть» и шаги «Сигнатура insertionSortRange» / «Сигнатура merge» построчного разбора на вкладке «Реализация».',
        en: 'See the `solution` paragraph on the "Intent" tab and the "insertionSortRange signature" / "merge signature" walkthrough steps on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему для сортировки маленьких прогонов используется именно сортировка вставками, а не рекурсивный merge sort?',
        en: 'Why is insertion sort specifically used to sort small runs instead of recursive merge sort?',
      },
      options: [
        {
          ru: 'На маленьких размерах низкие константные накладные расходы вставками делают её быстрее асимптотически лучших алгоритмов',
          en: 'At small sizes, insertion sort\'s low constant overhead makes it faster than asymptotically superior algorithms',
        },
        {
          ru: 'Потому что сортировка вставками, вопреки распространённому мнению большинства программистов, на самом деле работает за O(log n)',
          en: 'Because insertion sort, contrary to what most programmers commonly believe, actually runs in O(log n) time overall',
        },
        {
          ru: 'Сортировка слиянием технически принципиально не умеет обрабатывать маленькие массивы вообще',
          en: 'Merge sort is technically and fundamentally incapable of handling small arrays at all',
        },
        {
          ru: 'Это чисто исторический выбор разработчиков языка без какой-либо реальной технической причины позади него',
          en: "It is a purely historical choice made by the language's developers with no real technical reason behind it",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На массивах размером ~32-64 элемента O(n²) сортировки вставками на практике быстрее, чем рекурсия merge sort из-за меньшего числа операций и лучшей локальности данных.',
        en: 'On arrays of ~32-64 elements, insertion sort\'s O(n²) is faster in practice than merge sort\'s recursion, due to fewer operations and better data locality.',
      },
      hint: {
        ru: 'Смотрите абзац `solution` на вкладке «Суть» (низкие константы вставками) и третий абзац раздела «Углублённо» там же (порог minrun = 32).',
        en: 'See the `solution` paragraph on the "Intent" tab (insertion sort\'s low constant overhead) and the third "Deep dive" paragraph there (the minrun = 32 threshold).',
      },
    },
    {
      question: {
        ru: 'Что делает Timsort «адаптивным» алгоритмом?',
        en: 'What makes Timsort an "adaptive" algorithm?',
      },
      options: [
        {
          ru: 'Он распознаёт уже существующие отсортированные участки во входных данных и использует их напрямую как готовые прогоны',
          en: 'It detects already-sorted stretches in the input data and uses them directly as ready-made runs',
        },
        {
          ru: 'Он способен каким-то загадочным образом менять сам язык программирования, на котором написан, прямо во время выполнения программы',
          en: 'It is somehow able to change the very programming language it was written in, dynamically at runtime while executing',
        },
        {
          ru: 'Он всегда работает строго за линейное время O(n) для абсолютно любых входных данных без единого исключения',
          en: 'It always runs in strictly linear O(n) time for absolutely any input data whatsoever, with no exceptions',
        },
        {
          ru: 'Он случайным образом выбирает один из нескольких совершенно разных алгоритмов сортировки на каждом отдельном запуске',
          en: 'It randomly picks one of several completely different sorting algorithms to use on every single separate run',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Если входной массив уже содержит длинный отсортированный (или обратно отсортированный) участок, Timsort использует его как прогон вместо принудительного разбиения на фиксированные блоки.',
        en: 'If the input array already contains a long sorted (or reverse-sorted) stretch, Timsort uses it as a run instead of forcibly splitting into fixed blocks.',
      },
      hint: {
        ru: 'Смотрите шаг «Обнаружение убывающего прогона» / «Ветка возрастающего прогона» построчного разбора на вкладке «Реализация» и первый абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the "Detecting a descending run" / "The ascending-run branch" walkthrough steps on the "Implementation" tab and the first "Deep dive" paragraph on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какую гарантию сохраняет Timsort от своего merge-компонента?',
        en: 'What guarantee does Timsort retain from its merge component?',
      },
      options: [
        { ru: 'Устойчивость - равные элементы сохраняют относительный порядок', en: 'Stability - equal elements keep their original relative order' },
        {
          ru: 'Сортировку строго на месте, требующую всего O(1) дополнительной памяти',
          en: 'Strictly in-place sorting that requires only O(1) extra memory to run',
        },
        {
          ru: 'Полное отсутствие каких-либо сравнений элементов друг с другом вообще',
          en: 'A complete absence of any comparisons between elements whatsoever',
        },
        {
          ru: 'Возможность работать исключительно с целыми числами, а не с объектами',
          en: 'The ability to work exclusively with integers, rather than with objects',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и обычный merge sort, слияние в Timsort берёт элемент из левого прогона при равенстве - это сохраняет устойчивость всего алгоритма.',
        en: 'Like regular merge sort, Timsort\'s merge step takes the element from the left run on ties - this preserves stability across the whole algorithm.',
      },
      hint: {
        ru: 'Смотрите шаг «Слияние с сохранением порядка равных» построчного разбора на вкладке «Реализация» (сравнение `<=`) и второй пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the "Merging while preserving equal order" walkthrough step on the "Implementation" tab (the `<=` comparison) and the second "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Почему именно Python и Java выбрали Timsort как сортировку по умолчанию для объектов?',
        en: 'Why did Python and Java specifically choose Timsort as the default sort for objects?',
      },
      options: [
        {
          ru: 'Реальные данные приложений часто частично упорядочены, а устойчивость критична при сортировке объектов по полям',
          en: 'Real application data is often partially ordered, and stability is critical when sorting objects by fields',
        },
        {
          ru: 'Timsort считается самым простым из всех известных алгоритмов сортировки для практической реализации с нуля',
          en: 'Timsort is widely considered the simplest of all known sorting algorithms to implement from scratch in practice',
        },
        {
          ru: 'Timsort требует меньше всего дополнительной памяти среди абсолютно всех существующих алгоритмов сортировки без исключения',
          en: 'Timsort requires the least extra memory among absolutely all existing sorting algorithms without exception',
        },
        {
          ru: 'Это было полностью произвольное решение разработчиков языка, принятое без какого-либо предварительного анализа или тестирования',
          en: "It was a completely arbitrary decision made by the language's developers without any prior analysis or testing",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Для языков общего назначения важны и типичная производительность на реальных, часто частично упорядоченных данных, и устойчивость при сортировке сложных объектов - Timsort даёт оба свойства.',
        en: 'General-purpose languages need both typical performance on real, often partially-ordered data and stability when sorting complex objects - Timsort provides both.',
      },
      hint: {
        ru: 'Смотрите второй пункт whenToUse (углублённого) на вкладке «Суть» и раздел «Примеры из практики» (углублённого) там же (CPython, OpenJDK).',
        en: 'See the second extended "When to use" item on the "Intent" tab and the extended "Real world" section there (CPython, OpenJDK).',
      },
    },
    {
      question: {
        ru: 'Каков типичный размер прогона (minrun) в Timsort и почему именно такой?',
        en: 'What is the typical run size (minrun) in Timsort and why that value?',
      },
      options: [
        { ru: '32-64 элемента: вставки тут быстрее из-за малых констант', en: '32-64 elements - the range where insertion sort wins on constant factors' },
        { ru: '2 элемента - минимально возможная единица для слияния пар', en: '2 elements - the smallest possible unit for pairwise merging' },
        { ru: '1000 элементов - достаточно большой блок, чтобы избежать рекурсии', en: '1000 elements - large enough to avoid recursion altogether' },
        { ru: 'Всегда n/2 - ровно половина массива, как в классическом merge sort', en: 'Always n/2 - exactly half the array, just like classic merge sort in all cases' },
      ],
      correct: 0,
      explanation: {
        ru: 'В диапазоне 32-64 сортировка вставками на практике обгоняет merge sort благодаря лучшей локальности кэша и меньшим константным расходам на рекурсию.',
        en: 'In the 32-64 range, insertion sort beats merge sort in practice thanks to better cache locality and lower constant overhead from recursion.',
      },
      hint: {
        ru: 'Смотрите строку `const MIN_RUN = 32` (шаг «Порог minrun» построчного разбора на вкладке «Реализация») и третий абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the `const MIN_RUN = 32` line (the "The minrun threshold" walkthrough step on the "Implementation" tab) and the third "Deep dive" paragraph on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что происходит с обратно отсортированными прогонами при обнаружении в Timsort?',
        en: 'What happens to descending runs when Timsort encounters them?',
      },
      options: [
        { ru: 'Они разворачиваются на месте, превращаясь в возрастающие прогоны', en: 'They are reversed in place, turning them into ascending runs' },
        { ru: 'Они игнорируются и сортируются с нуля сортировкой вставками', en: 'They are ignored and sorted from scratch with insertion sort' },
        { ru: 'Они удаляются из массива и добавляются в конец', en: 'They are removed from the array and appended to the end' },
        { ru: 'Они вызывают переключение на быструю сортировку для данного блока', en: 'They trigger a switch to quicksort for that block' },
      ],
      correct: 0,
      explanation: {
        ru: 'Timsort распознаёт строго убывающие прогоны и разворачивает их за O(k), получая готовый возрастающий прогон без лишней работы.',
        en: 'Timsort detects strictly descending runs and reverses them in O(k), obtaining a ready ascending run without extra work.',
      },
      hint: {
        ru: 'Смотрите шаг «Разворот убывающего прогона» построчного разбора на вкладке «Реализация» и второй абзац раздела «Углублённо» на вкладке «Суть» (4 обмена вместо 16 сравнений).',
        en: 'See the "Reversing the descending run" walkthrough step on the "Implementation" tab and the second "Deep dive" paragraph on the "Intent" tab (4 swaps instead of up to 16 comparisons).',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность Timsort?',
        en: 'What is the space complexity of Timsort?',
      },
      options: [
        { ru: 'O(n) - буферы при слиянии занимают линейную память', en: 'O(n) - merge buffers occupy linear extra memory' },
        { ru: 'O(1) - Timsort сортирует полностью на месте', en: 'O(1) - Timsort sorts entirely in place' },
        { ru: 'O(log n) - только стек вызовов без дополнительных массивов', en: 'O(log n) - only the call stack without extra arrays' },
        { ru: 'O(n²) - каждый прогон создаёт копию всего массива', en: 'O(n²) - each run creates a copy of the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Слияние двух прогонов в Timsort требует временного буфера размером с меньший из них - в худшем случае O(n).',
        en: 'Merging two runs in Timsort requires a temporary buffer the size of the smaller run - O(n) in the worst case.',
      },
      hint: {
        ru: 'Смотрите шаг «Сигнатура merge» построчного разбора на вкладке «Реализация» (`arr.slice`) и первый пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the "merge signature" walkthrough step on the "Implementation" tab (`arr.slice`) and the first "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Даёт ли Timsort гарантированный O(n log n) в худшем случае?',
        en: 'Does Timsort guarantee O(n log n) in the worst case?',
      },
      options: [
        { ru: 'Да - даже на случайных данных Timsort не деградирует хуже O(n log n)', en: 'Yes - even on random data Timsort does not degrade worse than O(n log n)' },
        { ru: 'Нет - на случайных данных возможно O(n²) из-за большого числа коротких прогонов', en: 'No - on random data O(n²) is possible due to a large number of short runs' },
        { ru: 'Да, но только на отсортированных данных; на случайных гарантии нет', en: 'Yes, but only on sorted data; there\'s no guarantee on random data' },
        { ru: 'Нет - в худшем случае Timsort вырождается до O(n³)', en: 'No - in the worst case Timsort degenerates to O(n³)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Гарантия O(n log n) в худшем случае достигается за счёт механизма слияния прогонов - даже при коротких прогонах слияние выполняется за логарифмическое число раундов.',
        en: 'The O(n log n) worst-case guarantee comes from the run-merging mechanism - even with short runs, merging takes a logarithmic number of rounds.',
      },
      hint: {
        ru: 'Смотрите шаг «Попарное слияние прогонов» построчного разбора на вкладке «Реализация» (ceil(log2(число прогонов)) раундов) и пятый абзац раздела «Углублённо» на вкладке «Суть» (~13700 сравнений на случайных 1000 элементах).',
        en: 'See the "Pairwise merging of runs" walkthrough step on the "Implementation" tab (ceil(log2(run count)) rounds) and the fifth "Deep dive" paragraph on the "Intent" tab (~13,700 comparisons on a random 1000-element array).',
      },
    },
    {
      question: {
        ru: 'Как изменяется производительность Timsort при сортировке уже полностью отсортированного массива?',
        en: 'How does Timsort\'s performance change when sorting an already fully sorted array?',
      },
      options: [
        { ru: 'Деградирует до O(n) - весь массив распознаётся как один прогон', en: 'Improves to O(n) - the whole array is detected as one run' },
        { ru: 'Остаётся O(n log n) - алгоритм не способен использовать готовый порядок', en: 'Stays O(n log n) - the algorithm cannot exploit existing order' },
        { ru: 'Деградирует до O(n²) - слияние одного прогона с пустым результатом дорогостоящее', en: 'Degrades to O(n²) - merging one run with an empty result is costly' },
        { ru: 'Ухудшается до O(n³) из-за повторных сравнений внутри прогона', en: 'Worsens to O(n³) due to repeated comparisons inside the run' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если массив уже отсортирован, Timsort распознаёт его как один естественный прогон и не делает ни одного лишнего обмена - сложность O(n).',
        en: 'If the array is already sorted, Timsort recognizes it as one natural run and makes no unnecessary swaps - complexity O(n).',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Углублённо» на вкладке «Суть» (999 сравнений на отсортированных 1000 элементах вместо ~9966) и шестой абзац там же (контраст с merge sort).',
        en: 'See the fifth "Deep dive" paragraph on the "Intent" tab (999 comparisons on a sorted 1000-element array versus ~9966) and the sixth paragraph there (contrast with merge sort).',
      },
    },
  ],
};

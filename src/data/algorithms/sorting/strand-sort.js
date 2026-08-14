export const strandSort = {
  slug: 'strand-sort',
  category: 'sorting',
  name: { ru: 'Strand Sort', en: 'Strand Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['comparison', 'merge-based', 'stable', 'linked-list-friendly'],

  intent: {
    ru: 'Сортировка прядями раз за разом вытягивает из входных данных максимально длинную уже возрастающую подпоследовательность («прядь»), а затем сливает её с результатом - так же, как последний шаг сортировки слиянием, но без предварительного деления массива пополам.',
    en: 'Strand sort repeatedly pulls the longest already-increasing subsequence (a "strand") out of the input, then merges it into the result - much like the final merge step of merge sort, but without first splitting the array in half.',
  },

  problem: {
    ru: 'Сортировка слиянием эффективно объединяет уже отсортированные части, но сначала слепо делит массив пополам, не глядя на то, что в данных уже может быть естественный порядок. Если во входных данных уже встречаются длинные возрастающие участки (частично отсортированные данные, объединение нескольких предварительно отсортированных источников), хочется алгоритма, который распознаёт и использует эти участки напрямую, а не проходит через ненужное деление.',
    en: 'Merge sort efficiently combines already-sorted pieces, but first blindly splits the array in half, ignoring any order that might already exist in the data. If the input already contains long increasing runs (partially sorted data, several pre-sorted sources being combined), an algorithm that recognizes and uses those runs directly - rather than going through pointless splitting - is more appealing.',
  },

  solution: {
    ru: 'Из оставшихся (ещё не обработанных) элементов извлекается «прядь»: первый элемент берётся всегда, а следующие добавляются к пряди, только если они не меньше последнего элемента пряди - так формируется самая длинная возрастающая подпоследовательность, встречающаяся по порядку в оставшихся данных. Все элементы, не попавшие в прядь, остаются для следующей итерации. Готовая прядь сливается (как в сортировке слиянием) с уже накопленным результатом. Процесс повторяется, пока не останется необработанных элементов.',
    en: 'A "strand" is pulled from the remaining (not-yet-processed) elements: the first element is always taken, and subsequent elements join the strand only if they are not smaller than the strand\'s last element - this forms the longest increasing subsequence that appears in order within the remaining data. Elements that don\'t join the strand are kept for the next iteration. The finished strand is then merged (as in merge sort) into the result accumulated so far. This repeats until no elements remain.',
  },

  steps: [
    {
      title: { ru: 'Начать новую прядь', en: 'Start a new strand' },
      explanation: {
        ru: 'Взять первый из оставшихся элементов как начало новой пряди.',
        en: 'Take the first of the remaining elements as the start of a new strand.',
      },
    },
    {
      title: { ru: 'Собрать возрастающую подпоследовательность', en: 'Collect the increasing subsequence' },
      explanation: {
        ru: 'Пройти по оставшимся элементам по порядку, добавляя в прядь каждый, что не меньше последнего добавленного.',
        en: 'Walk the remaining elements in order, appending each one that is not smaller than the last one added to the strand.',
      },
    },
    {
      title: { ru: 'Отложить неподходящие элементы', en: 'Set aside the rest' },
      explanation: {
        ru: 'Элементы, не вошедшие в прядь, остаются в списке оставшихся для следующей итерации.',
        en: 'Elements that didn\'t join the strand stay in the remaining list for the next iteration.',
      },
    },
    {
      title: { ru: 'Слить прядь с результатом', en: 'Merge the strand into the result' },
      explanation: {
        ru: 'Готовая прядь сливается с уже накопленным отсортированным результатом, как в сортировке слиянием.',
        en: 'The finished strand is merged into the sorted result accumulated so far, just like in merge sort.',
      },
    },
    {
      title: { ru: 'Повторить до конца', en: 'Repeat until done' },
      explanation: {
        ru: 'Процесс повторяется, пока не останется необработанных элементов - тогда результат полностью отсортирован.',
        en: 'The process repeats until no elements remain unprocessed - at that point the result is fully sorted.',
      },
    },
  ],
  stepBreakpoints: [10, 12, 19, 29],

  implementation: {
    javascript: `function strandSort(arr) {
  let remaining = [...arr];
  let result = [];

  while (remaining.length) {
    const strand = [remaining[0]];
    const rest = [];
    for (let i = 1; i < remaining.length; i++) {
      if (remaining[i] >= strand[strand.length - 1]) {
        strand.push(remaining[i]);
      } else {
        rest.push(remaining[i]);
      }
    }
    remaining = rest;
    result = merge(result, strand);
  }
  return result;
}

function merge(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}`,
    python: `def strand_sort(arr):
    remaining = list(arr)
    result = []

    while remaining:
        strand = [remaining[0]]
        rest = []
        for x in remaining[1:]:
            if x >= strand[-1]:
                strand.append(x)
            else:
                rest.append(x)
        remaining = rest
        result = merge(result, strand)
    return result


def merge(a, b):
    out = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`strandSort` принимает массив `arr` и координирует две операции: извлечение прядей из `remaining` и их слияние в `result`. Вспомогательная функция `merge` объявлена отдельно ниже.',
          en: '`strandSort` takes an array `arr` and coordinates two operations: pulling strands out of `remaining` and merging them into `result`. The helper `merge` is declared separately below.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Начальное состояние', en: 'Initial state' },
        explanation: {
          ru: '`remaining` - копия входного массива, из которой будут извлекаться пряди. `result` начинается пустым и постепенно накапливает отсортированные элементы.',
          en: '`remaining` is a copy of the input array that strands get pulled from. `result` starts empty and gradually accumulates sorted elements.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Основной цикл', en: 'The main loop' },
        explanation: {
          ru: '`while (remaining.length)` повторяет извлечение и слияние прядей, пока в `remaining` остаются необработанные элементы.',
          en: '`while (remaining.length)` repeats strand extraction and merging as long as `remaining` still has unprocessed elements.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Начало новой пряди', en: 'Starting a new strand' },
        explanation: {
          ru: 'Новая прядь `strand` начинается с первого элемента `remaining` - он всегда берётся безусловно. `rest` собирает элементы, не попавшие в прядь на этой итерации.',
          en: 'The new `strand` starts with the first element of `remaining` - it is always taken unconditionally. `rest` collects the elements that don\'t join the strand this iteration.',
        },
      },
      {
        lines: [8, 14],
        title: { ru: 'Жадный сбор возрастающей подпоследовательности', en: 'Greedily collecting the increasing subsequence' },
        explanation: {
          ru: 'Цикл проходит по оставшимся элементам `remaining` по порядку. Каждый элемент, не меньший последнего в текущей пряди (`remaining[i] >= strand[strand.length - 1]`), присоединяется к пряди; остальные откладываются в `rest`.',
          en: 'The loop walks the rest of `remaining` in order. Each element not smaller than the strand\'s last one (`remaining[i] >= strand[strand.length - 1]`) joins the strand; the rest are set aside in `rest`.',
        },
      },
      {
        lines: [15, 16],
        title: { ru: 'Обновление remaining и слияние', en: 'Updating remaining and merging' },
        explanation: {
          ru: '`remaining = rest` заменяет оставшиеся элементы на те, что не попали в прядь. `result = merge(result, strand)` сливает свежую прядь с уже накопленным отсортированным результатом.',
          en: '`remaining = rest` replaces the remaining elements with the ones that didn\'t join the strand. `result = merge(result, strand)` merges the fresh strand into the sorted result accumulated so far.',
        },
      },
      {
        lines: [18],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `remaining` опустошается, `result` содержит все элементы в отсортированном порядке и возвращается.',
          en: 'Once `remaining` is empty, `result` holds every element in sorted order and gets returned.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Сигнатура merge', en: 'The merge signature' },
        explanation: {
          ru: '`merge(a, b)` принимает два уже отсортированных массива и сливает их в один, как в классической сортировке слиянием.',
          en: '`merge(a, b)` takes two already-sorted arrays and merges them into one, exactly as in classic merge sort.',
        },
      },
      {
        lines: [22, 23],
        title: { ru: 'Инициализация указателей', en: 'Initializing the pointers' },
        explanation: {
          ru: '`out` - результирующий массив. `i` и `j` - указатели на текущую позицию в `a` и `b` соответственно.',
          en: '`out` is the result array. `i` and `j` are pointers to the current position in `a` and `b` respectively.',
        },
      },
      {
        lines: [24, 26],
        title: { ru: 'Основной цикл слияния', en: 'The main merge loop' },
        explanation: {
          ru: 'Пока оба указателя в пределах своих массивов, в `out` добавляется меньший из текущих элементов `a[i]` и `b[j]`, а соответствующий указатель сдвигается вперёд. При равенстве берётся элемент из `a` (`<=`), что и обеспечивает устойчивость.',
          en: 'While both pointers are within their arrays, the smaller of the current `a[i]` and `b[j]` is pushed to `out`, and that pointer advances. On ties, the element from `a` is taken (`<=`), which is exactly what makes the merge stable.',
        },
      },
      {
        lines: [27, 28],
        title: { ru: 'Дозапись остатков', en: 'Draining the leftovers' },
        explanation: {
          ru: 'Когда один из массивов исчерпан, второй мог остаться не до конца пройденным - оставшиеся элементы дописываются в `out` как есть, поскольку они уже отсортированы.',
          en: 'When one array runs out, the other may still have unvisited elements - they get appended to `out` as-is, since they are already sorted.',
        },
      },
      {
        lines: [29],
        title: { ru: 'Возврат слитого массива', en: 'Returning the merged array' },
        explanation: {
          ru: '`out` содержит все элементы `a` и `b` в отсортированном порядке и возвращается вызывающему коду.',
          en: '`out` holds every element of `a` and `b` in sorted order and is returned to the caller.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`strand_sort` принимает список `arr` и координирует извлечение прядей и слияние, как и JS-версия.',
          en: '`strand_sort` takes a list `arr` and coordinates strand extraction and merging, same as the JS version.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Начальное состояние', en: 'Initial state' },
        explanation: {
          ru: '`remaining = list(arr)` копирует входной список. `result = []` начинается пустым списком-аккумулятором.',
          en: '`remaining = list(arr)` copies the input list. `result = []` starts as an empty accumulator list.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Основной цикл', en: 'The main loop' },
        explanation: {
          ru: '`while remaining:` повторяется, пока список `remaining` не пуст.',
          en: '`while remaining:` repeats as long as the `remaining` list is non-empty.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Начало новой пряди', en: 'Starting a new strand' },
        explanation: {
          ru: '`strand = [remaining[0]]` начинает прядь с первого элемента. `rest = []` собирает элементы, не вошедшие в прядь.',
          en: '`strand = [remaining[0]]` starts the strand with the first element. `rest = []` collects the elements that don\'t join it.',
        },
      },
      {
        lines: [8, 12],
        title: { ru: 'Жадный сбор возрастающей подпоследовательности', en: 'Greedily collecting the increasing subsequence' },
        explanation: {
          ru: '`for x in remaining[1:]` проходит оставшиеся элементы по порядку. Условие `x >= strand[-1]` присоединяет элемент к пряди; иначе он попадает в `rest`.',
          en: '`for x in remaining[1:]` walks the rest of the elements in order. The `x >= strand[-1]` condition appends the element to the strand; otherwise it goes into `rest`.',
        },
      },
      {
        lines: [13, 14],
        title: { ru: 'Обновление remaining и слияние', en: 'Updating remaining and merging' },
        explanation: {
          ru: '`remaining = rest` заменяет список оставшихся элементов. `result = merge(result, strand)` сливает прядь с накопленным результатом.',
          en: '`remaining = rest` replaces the remaining-elements list. `result = merge(result, strand)` merges the strand into the accumulated result.',
        },
      },
      {
        lines: [15],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `remaining` опустошается, цикл завершается и `result` возвращается полностью отсортированным.',
          en: 'Once `remaining` is exhausted, the loop ends and `result` is returned fully sorted.',
        },
      },
      {
        lines: [18],
        title: { ru: 'Сигнатура merge', en: 'The merge signature' },
        explanation: {
          ru: '`merge(a, b)` принимает два отсортированных списка и сливает их в один, идентично JS-версии.',
          en: '`merge(a, b)` takes two sorted lists and merges them into one, identical to the JS version.',
        },
      },
      {
        lines: [19, 20],
        title: { ru: 'Инициализация указателей', en: 'Initializing the pointers' },
        explanation: {
          ru: '`out = []` - результирующий список. `i = j = 0` инициализирует оба указателя нулём.',
          en: '`out = []` is the result list. `i = j = 0` initializes both pointers to zero.',
        },
      },
      {
        lines: [21, 25],
        title: { ru: 'Основной цикл слияния', en: 'The main merge loop' },
        explanation: {
          ru: 'Пока оба указателя в пределах своих списков, сравнение `a[i] <= b[j]` решает, откуда добавить элемент в `out`, и соответствующий указатель увеличивается. Взятие из `a` при равенстве обеспечивает устойчивость.',
          en: 'While both pointers are within their lists, the `a[i] <= b[j]` comparison decides which side to pull from into `out`, and that pointer increments. Taking from `a` on ties makes the merge stable.',
        },
      },
      {
        lines: [26, 27],
        title: { ru: 'Дозапись остатков', en: 'Draining the leftovers' },
        explanation: {
          ru: '`out.extend(a[i:])` и `out.extend(b[j:])` дописывают все ещё не пройденные элементы одного из списков - выполнится только один из срезов, так как второй список уже пуст.',
          en: '`out.extend(a[i:])` and `out.extend(b[j:])` append whichever list still has unvisited elements - only one of these slices does anything, since the other list is already exhausted.',
        },
      },
      {
        lines: [28],
        title: { ru: 'Возврат слитого списка', en: 'Returning the merged list' },
        explanation: {
          ru: '`out` содержит все элементы `a` и `b` в отсортированном порядке и возвращается.',
          en: '`out` holds every element of `a` and `b` in sorted order and is returned.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'На частично отсортированных данных с длинными возрастающими участками ведёт себя близко к O(n), извлекая почти весь массив одной прядью.',
      en: 'On partially sorted data with long increasing runs, behaves close to O(n), pulling nearly the whole array out as one strand.',
    },
    {
      ru: 'Устойчив: слияние сохраняет относительный порядок равных элементов.',
      en: 'Stable: the merge step preserves the relative order of equal elements.',
    },
    {
      ru: 'Естественно подходит для связных списков - извлечение пряди и слияние выполняются через перестановку ссылок, без произвольного доступа по индексу, который нужен большинству других алгоритмов сортировки.',
      en: 'Naturally suited to linked lists - extracting a strand and merging can be done by relinking pointers, without the random index access most other sorting algorithms need.',
    },
  ],
  cons: [
    {
      ru: 'На случайных данных (без длинных естественных возрастающих участков) деградирует до O(n²), так как каждая прядь оказывается короткой.',
      en: 'On random data (with no long natural increasing runs) it degrades to O(n²), since each strand ends up short.',
    },
    {
      ru: 'Требует O(n) дополнительной памяти для промежуточных прядей и результата - не сортирует на месте.',
      en: 'Requires O(n) extra memory for the intermediate strands and result - does not sort in place.',
    },
    {
      ru: 'Менее предсказуем по производительности, чем сортировка слиянием, так как число и длина прядей зависят от структуры входных данных.',
      en: 'Less predictable in performance than merge sort, since the number and length of strands depend on the structure of the input data.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда входные данные представлены связным списком и уже частично упорядочены (например, объединение нескольких предварительно отсортированных потоков).',
      en: 'When the input is a linked list and is already partially ordered (for example, combining several pre-sorted streams).',
    },
    {
      ru: 'Как учебный пример алгоритма, использующего естественный порядок в данных, в противовес слепому делению массива пополам в классической сортировке слиянием.',
      en: 'As a teaching example of an algorithm that exploits natural order already present in the data, in contrast to merge sort\'s blind halving of the array.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Слияние нескольких предварительно отсортированных журналов или очередей событий** - если каждый источник уже упорядочен, стратегия «вытянуть длинную возрастающую цепочку и слить» эффективно объединяет их.',
      en: '**Merging several pre-sorted logs or event queues** - when each source is already ordered, the "pull out a long increasing chain and merge" strategy combines them efficiently.',
    },
    {
      ru: '**Реализации сортировки для связных списков** нередко используют идею прядей, поскольку извлечение подпоследовательности через перестановку указателей естественно для списков и избегает накладных расходов на произвольный доступ по индексу.',
      en: '**Linked-list sorting implementations** often use the strand idea, since extracting a subsequence via pointer relinking is natural for lists and avoids the overhead of random index access.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проследим сортировку прядями на массиве `[6, 2, 5, 1, 9, 3, 8, 4, 7]` (n = 9). Первая прядь: 6, затем 9 (первый элемент, не меньший 6) - `[6, 9]`, длина 2. Оставшиеся `[2, 5, 1, 3, 8, 4, 7]` дают вторую прядь `[2, 5, 8]`, длина 3. Оставшиеся `[1, 3, 4, 7]` образуют третью прядь целиком - `[1, 3, 4, 7]`, длина 4. Три итерации, длины прядей растут - **2, 3, 4** - и покрывают все 9 элементов.',
        en: 'Let\'s trace strand sort on `[6, 2, 5, 1, 9, 3, 8, 4, 7]` (n = 9). The first strand: 6, then 9 (the first element not smaller than 6) - `[6, 9]`, length 2. The remaining `[2, 5, 1, 3, 8, 4, 7]` give a second strand `[2, 5, 8]`, length 3. The remaining `[1, 3, 4, 7]` form a third strand entirely - `[1, 3, 4, 7]`, length 4. Three iterations, strand lengths growing - **2, 3, 4** - covering all 9 elements.',
      },
      {
        ru: 'Слияние этих трёх прядей стоит **0 + 4 + 7 = 11 сравнений**: первое слияние (пустой результат с прядью длины 2) не требует сравнений вовсе, второе слияет 2 и 3 элемента за 4 сравнения, третье - 5 и 4 элемента за 7. Итого на n = 9 массив отсортирован за 3 извлечения прядей вместо, например, n − 1 = 8 сравнений одной сортировкой вставками с худшим случаем - здесь длинные пряди резко сокращают число итераций.',
        en: 'Merging these three strands costs **0 + 4 + 7 = 11 comparisons**: the first merge (an empty result with a length-2 strand) needs no comparisons at all, the second merges 2 and 3 elements in 4 comparisons, the third merges 5 and 4 elements in 7. In total, for n = 9 the array is sorted in 3 strand extractions - the long strands sharply cut down the number of iterations compared to something like insertion sort\'s worst case.',
      },
      {
        ru: 'Худший случай - обратно отсортированный массив `[9, 8, 7, 6, 5, 4, 3, 2, 1]`: каждая прядь состоит **ровно из одного элемента** (следующий элемент всегда меньше предыдущего), и требуется **9 итераций** для массива из 9 элементов. Это вырождает алгоритм в поведение, эквивалентное сортировке вставками - O(n²).',
        en: 'The worst case is a reverse-sorted array `[9, 8, 7, 6, 5, 4, 3, 2, 1]`: every strand consists of **exactly one element** (the next one is always smaller than the previous), requiring **9 iterations** for a 9-element array. This degenerates the algorithm into insertion-sort-like behavior - O(n²).',
      },
      {
        ru: 'Лучший случай - уже отсортированный массив `[1, 2, ..., 9]`: первая же прядь захватывает все 9 элементов за **1 итерацию**, и единственное слияние - с пустым результатом - обходится без единого сравнения. Отсюда и заявленная O(n) в лучшем случае: один проход по массиву, ни одной операции слияния сверх копирования.',
        en: 'The best case is an already-sorted array `[1, 2, ..., 9]`: the very first strand captures all 9 elements in **1 iteration**, and the single merge - with an empty result - costs no comparisons at all. This is exactly what gives the stated best-case O(n): one pass over the array, no merge work beyond copying.',
      },
      {
        ru: 'В отличие от классической сортировки слиянием, чья рекуррентность T(n) = 2T(n/2) + O(n) не зависит от содержимого массива, сортировка прядями адаптивна: число итераций и их размер полностью определяются тем, сколько и каких по длине возрастающих участков реально есть во входных данных. Это плата и выигрыш одновременно - предсказуемости меньше, но на подходящих данных алгоритм заметно быстрее.',
        en: 'Unlike classic merge sort, whose recurrence T(n) = 2T(n/2) + O(n) is independent of the array\'s contents, strand sort is adaptive: the number and size of iterations are entirely determined by how many increasing runs actually exist in the input and how long they are. That\'s both the cost and the payoff - less predictability, but noticeably faster on suitable data.',
      },
      {
        ru: 'Классический раздел **«естественного слияния» (natural merging)** в третьем томе Дональда Кнута «The Art of Computer Programming» описывает семейство алгоритмов, которые вместо произвольного деления массива объединяют уже существующие в данных возрастающие участки (runs) - сортировка прядями формализует именно эту идею, выбирая на каждом шаге ровно одну самую длинную такую последовательность.',
        en: 'The classic **"natural merging"** section of volume 3 of Donald Knuth\'s "The Art of Computer Programming" describes a family of algorithms that, instead of splitting the array arbitrarily, combine the increasing runs already present in the data - strand sort formalizes exactly this idea, greedily picking one longest such run per step.',
      },
      {
        ru: 'Современный наследник этой идеи - **Timsort**: вместо того чтобы искать сколь угодно длинную прядь ценой одного линейного прохода за раз, он находит естественные возрастающие (и убывающие) участки, при необходимости растягивает короткие до порогового `minrun`, и сливает их «умным» слиянием с режимом галопирования. Сортировка прядями - концептуальный, максимально прямолинейный предок этой оптимизации.',
        en: 'The modern heir to this idea is **Timsort**: instead of hunting for an arbitrarily long strand at the cost of one linear pass at a time, it finds natural ascending (and descending) runs, pads short ones up to a `minrun` threshold when needed, and merges them with a "smart" galloping merge. Strand sort is the conceptual, most straightforward ancestor of that optimization.',
      },
    ],
    whenToUse: [
      {
        ru: '**Связные списки с уже частично упорядоченными данными** - объединение нескольких предварительно отсортированных потоков (логов, очередей) без промежуточного преобразования в массив.',
        en: '**Linked lists with already partially ordered data** - combining several pre-sorted streams (logs, queues) without an intermediate conversion to an array.',
      },
      {
        ru: '**Как учебный контраст с классической сортировкой слиянием** - обе рекурсивно или итеративно опираются на слияние отсортированных частей, но merge sort делит массив вслепую, а сортировка прядями находит существующий порядок.',
        en: '**As a teaching contrast with classic merge sort** - both rely on merging sorted pieces, but merge sort splits the array blindly while strand sort finds existing order.',
      },
      {
        ru: '**Не для случайных данных без известной структуры** - без длинных естественных участков число итераций приближается к n, и алгоритм вырождается в поведение O(n²), не давая никакого преимущества перед сортировкой вставками.',
        en: '**Not for random data with no known structure** - without long natural runs, the iteration count approaches n, and the algorithm degenerates into O(n²) behavior with no advantage over insertion sort.',
      },
      {
        ru: '**Как введение к идее Timsort** - прежде чем изучать minrun, галопирование и стек слияний Timsort, сортировка прядями показывает базовую идею «искать существующий порядок» в её самом простом виде.',
        en: '**As an introduction to Timsort\'s idea** - before studying minrun, galloping, and Timsort\'s merge stack, strand sort demonstrates the core "look for existing order" idea in its simplest form.',
      },
    ],
    realWorld: [
      {
        ru: '**Donald Knuth, «The Art of Computer Programming, Volume 3: Sorting and Searching» (раздел 5.2.4, «natural merging»)** - классическое описание семейства алгоритмов, использующих естественные возрастающие участки данных вместо произвольного деления.',
        en: '**Donald Knuth, "The Art of Computer Programming, Volume 3: Sorting and Searching" (section 5.2.4, "natural merging")** - the classic description of the algorithm family that uses naturally occurring increasing runs instead of arbitrary splitting.',
      },
      {
        ru: '**Timsort** (стандартная сортировка CPython `list.sort()` и Java `Arrays.sort()` для объектов) явно находит возрастающие и убывающие участки во входных данных - та же базовая идея, что и у сортировки прядями, но с порогом `minrun` и оптимизированным слиянием вместо чисто жадного извлечения.',
        en: '**Timsort** (the standard sort behind CPython\'s `list.sort()` and Java\'s `Arrays.sort()` for objects) explicitly finds ascending and descending runs in the input - the same core idea as strand sort, but with a `minrun` threshold and an optimized merge instead of pure greedy extraction.',
      },
      {
        ru: '**Слияние отсортированных лог-файлов и очередей событий** в системах обработки данных - когда несколько источников уже упорядочены по времени, стратегия «вытянуть длинную цепочку и слить» напрямую применима без модификации.',
        en: '**Merging sorted log files and event queues** in data processing systems - when several sources are already time-ordered, the "pull a long chain and merge" strategy applies directly without modification.',
      },
      {
        ru: '**Реализации сортировки для связных списков** в учебных курсах по структурам данных часто используют идею прядей как более простую альтернативу merge sort на списках, поскольку не требует вычисления середины списка для деления пополам.',
        en: '**Linked-list sorting implementations** in data structures courses often use the strand idea as a simpler alternative to merge sort on lists, since it avoids computing the list\'s midpoint for halving.',
      },
    ],
  },

  relatedAlgorithms: ['merge-sort', 'tim-sort', 'patience-sort'],

  quiz: [
    {
      question: {
        ru: 'Что представляет собой «прядь» в сортировке прядями?',
        en: 'What is a "strand" in strand sort?',
      },
      options: [
        {
          ru: 'Самая длинная возрастающая подпоследовательность, встречающаяся по порядку в оставшихся элементах',
          en: 'The longest increasing subsequence appearing in order within the remaining elements',
        },
        { ru: 'Случайно выбираемое подмножество элементов заранее заданного фиксированного размера', en: 'A randomly chosen subset of elements of a predetermined fixed size' },
        { ru: 'Ровно половина массива, полученная простым делением его пополам по индексу', en: 'Exactly half of the array, obtained by simply splitting it in two by index' },
        { ru: 'Единственный самый большой по значению элемент, найденный где-либо во всём исходном массиве целиком', en: 'The single largest-valued element found anywhere at all within the entire original array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Прядь собирается жадно: первый элемент берётся всегда, а следующий добавляется, только если он не меньше последнего добавленного.',
        en: 'The strand is built greedily: the first element is always taken, and the next joins only if it is not smaller than the last one added.',
      },
      hint: {
        ru: 'Смотрите шаг «Собрать возрастающую подпоследовательность» на вкладке «Визуализация» и строки 8-14 функции `strandSort` на вкладке «Реализация».',
        en: 'See the "Collect the increasing subsequence" step on the "Visualization" tab and lines 8-14 of `strandSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Как готовая прядь объединяется с уже накопленным результатом?',
        en: 'How is a finished strand combined with the result accumulated so far?',
      },
      options: [
        { ru: 'Через слияние, как в сортировке слиянием', en: 'Via a merge, just like in merge sort' },
        { ru: 'Прядь просто дописывается в конец результата без изменений', en: 'The strand is simply appended to the end of the result unchanged' },
        { ru: 'Прядь и результат сортируются заново целиком', en: 'The strand and result are both re-sorted from scratch' },
        { ru: 'Прядь отбрасывается, если результат уже не пуст', en: 'The strand is discarded if the result is already non-empty' },
      ],
      correct: 0,
      explanation: {
        ru: 'Поскольку и прядь, и накопленный результат уже отсортированы по отдельности, их можно слить за линейное время, как два отсортированных списка.',
        en: 'Since both the strand and the accumulated result are already individually sorted, they can be merged in linear time like any two sorted lists.',
      },
      hint: {
        ru: 'Смотрите шаг «Слить прядь с результатом» на вкладке «Визуализация» и строки 21-29 функции `merge` на вкладке «Реализация».',
        en: 'See the "Merge the strand into the result" step on the "Visualization" tab and lines 21-29 of the `merge` function on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'На каких данных сортировка прядями показывает лучшую производительность?',
        en: 'On which kind of data does strand sort perform best?',
      },
      options: [
        {
          ru: 'На данных с длинными возрастающими участками',
          en: 'On data with long natural increasing runs',
        },
        { ru: 'На полностью случайных данных', en: 'On fully random data' },
        { ru: 'На данных, состоящих только из повторяющихся значений', en: 'On data consisting only of repeated values' },
        { ru: 'Производительность не зависит от структуры данных', en: 'Performance doesn\'t depend on the structure of the data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Чем длиннее естественные возрастающие участки, тем меньше итераций требуется, чтобы извлечь и слить все элементы.',
        en: 'The longer the natural increasing runs, the fewer iterations are needed to extract and merge all the elements.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» - там прослежен пример с прядями длины 2, 3 и 4.',
        en: 'See the first paragraph of the "Deep dive" section on the "Intent" tab - it traces an example with strands of length 2, 3, and 4.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка прядями хорошо подходит для связных списков?',
        en: 'Why is strand sort well suited to linked lists?',
      },
      options: [
        {
          ru: 'Извлечение пряди и слияние выполняются перестановкой ссылок, без доступа по индексу',
          en: 'Extracting a strand and merging can be done by relinking pointers, without random index access',
        },
        { ru: 'Потому что связные списки в принципе нельзя отсортировать никаким другим известным способом', en: 'Because linked lists fundamentally cannot be sorted by any other known method whatsoever' },
        { ru: 'Потому что элементы в связных списках всегда изначально уже находятся в отсортированном порядке', en: 'Because elements in linked lists are always already found in sorted order to begin with' },
        { ru: 'Потому что связные списки в принципе не поддерживают операцию сравнения между своими элементами', en: 'Because linked lists fundamentally don\'t support the comparison operation between their elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от алгоритмов, опирающихся на индексацию (например, быстрой сортировки), извлечение пряди естественно выражается через перестановку указателей.',
        en: 'Unlike algorithms that rely on indexing (such as quicksort), extracting a strand is naturally expressed through pointer relinking.',
      },
      hint: {
        ru: 'Смотрите третий пункт плюсов на вкладке «Плюсы и минусы» и первый пункт «Когда применять» раздела «Углублённо» на вкладке «Суть».',
        en: 'See the third "Pros" item on the "Pros & Cons" tab and the first "When to use" item in the "Deep dive" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность сортировки прядями в худшем случае?',
        en: 'What is the worst-case time complexity of strand sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'В худшем случае (например, на обратно отсортированном массиве) каждая прядь состоит из одного элемента, что даёт квадратичное поведение, как у сортировки вставками.',
        en: 'In the worst case (e.g., a reverse-sorted array), every strand consists of a single element, giving quadratic behavior similar to insertion sort.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Углублённо» на вкладке «Суть» (обратно отсортированный массив, 9 итераций по одному элементу).',
        en: 'See the third paragraph of the "Deep dive" section on the "Intent" tab (a reverse-sorted array, 9 single-element iterations).',
      },
    },
    {
      question: {
        ru: 'Каков лучший случай временной сложности сортировки прядями и когда он достигается?',
        en: 'What is the best-case time complexity of strand sort and when is it achieved?',
      },
      options: [
        { ru: 'O(n) - когда весь массив уже отсортирован и образует одну прядь', en: 'O(n) - when the whole array is already sorted and forms a single strand' },
        { ru: 'O(log n) - когда массив содержит ровно два возрастающих участка', en: 'O(log n) - when the array contains exactly two increasing runs in all cases' },
        { ru: 'O(n log n) - лучший случай совпадает со средним', en: 'O(n log n) - the best case equals the average case' },
        { ru: 'O(1) - когда массив пуст или содержит один элемент', en: 'O(1) - when the array is empty or has a single element' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если весь массив уже возрастающий, первая прядь захватывает все n элементов, и единственная операция слияния (с пустым результатом) занимает O(n).',
        en: 'If the whole array is already increasing, the first strand captures all n elements, and the single merge operation (with an empty result) takes O(n).',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Углублённо» на вкладке «Суть» (уже отсортированный массив, 1 итерация без слияний).',
        en: 'See the fourth paragraph of the "Deep dive" section on the "Intent" tab (an already-sorted array, 1 iteration with no merge work).',
      },
    },
    {
      question: {
        ru: 'Является ли сортировка прядями устойчивой?',
        en: 'Is strand sort stable?',
      },
      options: [
        { ru: 'Да - слияние берёт элемент из левого списка при равенстве, сохраняя порядок', en: 'Yes - the merge takes from the left list on ties, preserving order' },
        { ru: 'Нет - порядок равных элементов не определён из-за произвольного выбора пряди', en: 'No - the order of equal elements is undefined due to arbitrary strand selection' },
        { ru: 'Зависит от реализации - не является свойством самого алгоритма', en: 'Depends on the implementation - it is not a property of the algorithm itself' },
        { ru: 'Нет - элементы переставляются по значению, что нарушает исходный порядок', en: 'No - elements are rearranged by value, which breaks the original order' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие x >= strand[-1] пропускает равные элементы в прядь, а слияние при равенстве берёт из левого (ранее накопленного) списка - вместе это обеспечивает устойчивость.',
        en: 'The condition x >= strand[-1] admits equal elements into the strand, and the merge on ties takes from the left (already-accumulated) list - together these ensure stability.',
      },
      hint: {
        ru: 'Смотрите строку 25 функции `merge` на вкладке «Реализация» (`a[i] <= b[j]`) и её построчный разбор в шаге «Основной цикл слияния».',
        en: 'See line 25 of the `merge` function on the "Implementation" tab (`a[i] <= b[j]`) and its walkthrough in the "Main merge loop" step.',
      },
    },
    {
      question: {
        ru: 'Что происходит с элементами, не попавшими в текущую прядь?',
        en: 'What happens to elements that did not join the current strand?',
      },
      options: [
        { ru: 'Остаются в списке для следующей итерации', en: 'They stay in the remaining list for the next iteration' },
        { ru: 'Они отбрасываются и не попадают в результат', en: 'They are discarded and never appear in the result' },
        { ru: 'Они немедленно добавляются в конец результата', en: 'They are immediately appended to the end of the result' },
        { ru: 'Они вставляются в текущую прядь в случайном порядке', en: 'They are inserted into the current strand in random order' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно эти элементы, пропущенные текущей прядью, образуют оставшийся список для следующего шага - они будут захвачены в последующих прядях.',
        en: 'These elements skipped by the current strand form the remaining list for the next step - they will be captured in subsequent strands.',
      },
      hint: {
        ru: 'Смотрите шаг «Отложить неподходящие элементы» на вкладке «Визуализация» и строки 8-15 функции `strandSort` на вкладке «Реализация» (переменная `rest`).',
        en: 'See the "Set aside the rest" step on the "Visualization" tab and lines 8-15 of `strandSort` on the "Implementation" tab (the `rest` variable).',
      },
    },
    {
      question: {
        ru: 'Чем сортировка прядями отличается от сортировки слиянием в подходе к входным данным?',
        en: 'How does strand sort differ from merge sort in its approach to the input?',
      },
      options: [
        { ru: 'Она использует уже существующий порядок в данных, а не слепо делит массив пополам', en: 'It uses the order already present in the data rather than blindly splitting the array' },
        { ru: 'Она всегда работает за O(n log n), тогда как слияние бывает медленнее', en: 'It always runs in O(n log n), while merge sort can be slower regardless of input size or order' },
        { ru: 'Она сортирует массив на месте, а сортировка слиянием требует дополнительной памяти', en: 'It sorts in place, while merge sort requires extra memory' },
        { ru: 'Она нестабильна, а сортировка слиянием - устойчива', en: 'It is unstable, while merge sort is stable' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка прядями адаптируется к структуре данных, вытягивая уже упорядоченные участки; сортировка слиянием делит массив механически, не глядя на существующий порядок.',
        en: 'Strand sort adapts to data structure by pulling out already-ordered runs; merge sort divides the array mechanically without looking at existing order.',
      },
      hint: {
        ru: 'Смотрите раздел «Проблема» на вкладке «Суть» и пятый абзац раздела «Углублённо» (сравнение рекуррентности merge sort с адаптивностью сортировки прядями).',
        en: 'See the "Problem" section on the "Intent" tab and the fifth paragraph of the "Deep dive" section (comparing merge sort\'s recurrence with strand sort\'s adaptiveness).',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность сортировки прядями?',
        en: 'What is the space complexity of strand sort?',
      },
      options: [
        { ru: 'O(n) - промежуточные пряди и результат занимают O(n) памяти', en: 'O(n) - intermediate strands and the result occupy linear memory' },
        { ru: 'O(1) - сортировка выполняется полностью на месте', en: 'O(1) - the sort runs entirely in place' },
        { ru: 'O(log n) - только стек рекурсии без вспомогательных массивов', en: 'O(log n) - only the recursion stack without auxiliary arrays' },
        { ru: 'O(n²) - каждая прядь хранит копию всего оставшегося массива', en: 'O(n²) - each strand stores a copy of the whole remaining array always' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм хранит прядь, список оставшихся элементов и накопленный результат - суммарно O(n) дополнительной памяти.',
        en: 'The algorithm stores the strand, the remaining-elements list, and the accumulated result - O(n) extra memory in total.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the "Space" complexity badge at the top of the page and the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
  ],
};

export const stoogeSort = {
  slug: 'stooge-sort',
  category: 'sorting',
  name: { ru: 'Stooge Sort', en: 'Stooge Sort' },
  complexity: {
    time: { best: 'O(n^2.7095)', average: 'O(n^2.7095)', worst: 'O(n^2.7095)' },
    space: 'O(log n)',
  },
  popularity: 1,
  tags: ['joke', 'recursive', 'inefficient', 'educational'],

  intent: {
    ru: 'Стуз-сортировка - намеренно неэффективный рекурсивный алгоритм: он сравнивает и при необходимости меняет местами лишь крайние элементы диапазона, а затем трижды рекурсивно обрабатывает пересекающиеся две трети диапазона - интересный не практической пользой, а тем, насколько простая на вид рекурсия может давать почти кубическую сложность.',
    en: "Stooge sort is a deliberately inefficient recursive algorithm: it compares and, if needed, swaps only the outermost elements of a range, then recursively processes three overlapping two-thirds of the range - interesting not for practical use but for how a simple-looking recursion can yield near-cubic complexity.",
  },

  problem: {
    ru: 'Многие эффективные сортировки делят массив на непересекающиеся половины или трети и обрабатывают их независимо. Что произойдёт, если вместо непересекающихся частей рекурсивно обрабатывать перекрывающиеся две трети диапазона - сначала первые 2/3, потом последние 2/3, потом снова первые 2/3? Формально это всё ещё корректно сортирует массив, но перекрытие означает огромную избыточную работу: значительная часть элементов обрабатывается заново по несколько раз на каждом уровне рекурсии.',
    en: 'Many efficient sorts split the array into non-overlapping halves or thirds and process them independently. What happens if, instead of non-overlapping parts, we recursively process overlapping two-thirds of the range - first the first 2/3, then the last 2/3, then the first 2/3 again? Formally this still correctly sorts the array, but the overlap means enormous redundant work: a large fraction of elements gets reprocessed multiple times at every level of recursion.',
  },

  solution: {
    ru: 'Для диапазона [lo, hi] сначала сравниваются крайние элементы: если a[lo] больше a[hi], они меняются местами - это гарантирует, что после всей обработки наибольший элемент диапазона не окажется в начале. Если в диапазоне больше двух элементов, вычисляется треть его длины t, и рекурсивно обрабатываются три перекрывающихся поддиапазона: первые две трети [lo, hi−t], последние две трети [lo+t, hi], и снова первые две трети [lo, hi−t]. Такое тройное перекрывающееся применение гарантирует корректность (это доказуемо, хотя и не очевидно с первого взгляда), но приводит к сложности порядка O(n^log(3)/log(1.5)) ≈ O(n^2.71) - гораздо хуже, чем даже пузырьковая сортировка.',
    en: "For a range [lo, hi], the outer elements are first compared: if a[lo] is greater than a[hi], they're swapped - this guarantees the largest element of the range won't end up at the start after processing. If the range has more than two elements, its length's third t is computed, and three overlapping subranges are recursively processed: the first two-thirds [lo, hi−t], the last two-thirds [lo+t, hi], and the first two-thirds again [lo, hi−t]. This triple overlapping application guarantees correctness (provable, though not obvious at a glance), but results in complexity on the order of O(n^log(3)/log(1.5)) ≈ O(n^2.71) - far worse than even bubble sort.",
  },

  steps: [
    {
      title: { ru: 'Сравнить крайние элементы диапазона', en: 'Compare the range\'s outer elements' },
      explanation: {
        ru: 'Если первый элемент диапазона больше последнего, поменять их местами.',
        en: "If the range's first element is greater than its last, swap them.",
      },
    },
    {
      title: { ru: 'Проверить размер диапазона', en: 'Check the range size' },
      explanation: {
        ru: 'Если в диапазоне два или меньше элементов, обработка этого диапазона завершена.',
        en: "If the range has two or fewer elements, processing of this range is done.",
      },
    },
    {
      title: { ru: 'Рекурсивно обработать первые две трети', en: 'Recursively process the first two-thirds' },
      explanation: {
        ru: 'Вычислить треть длины диапазона и рекурсивно вызвать сортировку на первых двух третях.',
        en: "Compute a third of the range's length and recursively sort its first two-thirds.",
      },
    },
    {
      title: { ru: 'Рекурсивно обработать последние две трети', en: 'Recursively process the last two-thirds' },
      explanation: {
        ru: 'Рекурсивно вызвать сортировку на последних двух третях того же диапазона.',
        en: 'Recursively sort the last two-thirds of the same range.',
      },
    },
    {
      title: { ru: 'Снова обработать первые две трети', en: 'Process the first two-thirds again' },
      explanation: {
        ru: 'Повторно рекурсивно вызвать сортировку на первых двух третях, чтобы гарантировать корректность после предыдущих двух шагов.',
        en: 'Recursively sort the first two-thirds once more, to guarantee correctness after the previous two steps.',
      },
    },
  ],
  stepBreakpoints: [2, 42, 83, 116],

  implementation: {
    javascript: `function stoogeSort(arr) {
  const a = [...arr];

  function rec(lo, hi) {
    if (a[lo] > a[hi]) {
      [a[lo], a[hi]] = [a[hi], a[lo]];
    }
    if (hi - lo + 1 > 2) {
      const t = Math.floor((hi - lo + 1) / 3);
      rec(lo, hi - t);
      rec(lo + t, hi);
      rec(lo, hi - t);
    }
  }

  if (a.length > 1) rec(0, a.length - 1);
  return a;
}`,
    python: `def stooge_sort(arr):
    a = list(arr)

    def rec(lo, hi):
        if a[lo] > a[hi]:
            a[lo], a[hi] = a[hi], a[lo]
        if hi - lo + 1 > 2:
            t = (hi - lo + 1) // 3
            rec(lo, hi - t)
            rec(lo + t, hi)
            rec(lo, hi - t)

    if len(a) > 1:
        rec(0, len(a) - 1)
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`stoogeSort` принимает массив `arr` и настраивает вспомогательную рекурсивную функцию `rec`, замыкающуюся на общий массив `a` - все рекурсивные вызовы работают с одной и той же копией, передавая только границы диапазона.',
          en: '`stoogeSort` takes an array `arr` and sets up a helper recursive function `rec` closing over the shared array `a` - every recursive call works on the same copy, passing only the range boundaries.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия массива', en: 'Copying the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт копию входного массива - вся сортировка выполняется на месте внутри этой копии.',
          en: '`const a = [...arr]` copies the input array - the whole sort runs in place inside this copy.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Сигнатура rec', en: 'The rec signature' },
        explanation: {
          ru: '`rec(lo, hi)` обрабатывает диапазон массива `a` от индекса `lo` до `hi` включительно - именно эти границы определяют, какая часть массива рассматривается на текущем уровне рекурсии.',
          en: '`rec(lo, hi)` processes the range of array `a` from index `lo` to `hi` inclusive - these boundaries define which part of the array the current recursion level considers.',
        },
      },
      {
        lines: [5, 7],
        title: { ru: 'Сравнение и обмен крайних элементов', en: 'Comparing and swapping the outer elements' },
        explanation: {
          ru: 'Если первый элемент диапазона больше последнего, они меняются местами. Это единственное фактическое сравнение значений на каждом уровне рекурсии - весь остальной код лишь решает, куда рекурсивно спуститься дальше.',
          en: "If the range's first element is greater than its last, they're swapped. This is the only actual value comparison at each recursion level - all the remaining code only decides where to recurse next.",
        },
      },
      {
        lines: [8, 9],
        title: { ru: 'Базовый случай и вычисление трети', en: 'Base case and computing the third' },
        explanation: {
          ru: 'Если в диапазоне два или меньше элементов (`hi - lo + 1 <= 2`), рекурсия на этом уровне останавливается - обработка исчерпывается одним сравнением из предыдущего шага. Иначе вычисляется `t` - целая треть длины диапазона.',
          en: 'If the range has two or fewer elements (`hi - lo + 1 <= 2`), recursion stops at this level - processing is exhausted by the single comparison from the previous step. Otherwise `t` is computed - the integer third of the range length.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Первый рекурсивный вызов: первые 2/3', en: 'First recursive call: the first two-thirds' },
        explanation: {
          ru: '`rec(lo, hi - t)` рекурсивно обрабатывает первые две трети текущего диапазона.',
          en: '`rec(lo, hi - t)` recursively processes the first two-thirds of the current range.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Второй рекурсивный вызов: последние 2/3', en: 'Second recursive call: the last two-thirds' },
        explanation: {
          ru: '`rec(lo + t, hi)` рекурсивно обрабатывает последние две трети того же диапазона - этот вызов перекрывается с предыдущим на средней трети.',
          en: '`rec(lo + t, hi)` recursively processes the last two-thirds of the same range - this call overlaps the previous one across the middle third.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Третий рекурсивный вызов: снова первые 2/3', en: 'Third recursive call: the first two-thirds again' },
        explanation: {
          ru: '`rec(lo, hi - t)` повторяет первый вызов - без этого повторения элементы, перемещённые вторым вызовом в начало диапазона, могли бы остаться на неверных местах.',
          en: '`rec(lo, hi - t)` repeats the first call - without this repetition, elements moved by the second call into the start of the range could be left in the wrong spots.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Запуск рекурсии', en: 'Kicking off the recursion' },
        explanation: {
          ru: '`if (a.length > 1) rec(0, a.length - 1)` запускает рекурсию на всём массиве, только если в нём больше одного элемента - для пустого массива или массива из одного элемента сортировать нечего.',
          en: '`if (a.length > 1) rec(0, a.length - 1)` starts the recursion over the whole array only if it has more than one element - an empty array or a single-element one needs no sorting.',
        },
      },
      {
        lines: [17],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После завершения всей рекурсии `a` полностью отсортирован и возвращается вызывающему коду.',
          en: 'Once the whole recursion finishes, `a` is fully sorted and returned to the caller.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`stooge_sort` принимает список `arr` и определяет вложенную функцию `rec`, замыкающуюся на общий список `a`, как и в JS-версии.',
          en: '`stooge_sort` takes a list `arr` and defines a nested function `rec` closing over the shared list `a`, same as the JS version.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия списка', en: 'Copying the list' },
        explanation: {
          ru: '`a = list(arr)` создаёт копию входного списка, чтобы не изменять аргумент вызывающего кода.',
          en: '`a = list(arr)` copies the input list so the caller\'s argument stays untouched.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Сигнатура rec', en: 'The rec signature' },
        explanation: {
          ru: '`rec(lo, hi)` обрабатывает диапазон списка `a` от индекса `lo` до `hi` включительно, идентично JS-версии.',
          en: '`rec(lo, hi)` processes the range of list `a` from index `lo` to `hi` inclusive, identical to the JS version.',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Сравнение и обмен крайних элементов', en: 'Comparing and swapping the outer elements' },
        explanation: {
          ru: 'Если `a[lo] > a[hi]`, элементы меняются местами кортежным присваиванием `a[lo], a[hi] = a[hi], a[lo]` - единственное фактическое сравнение на уровне.',
          en: 'If `a[lo] > a[hi]`, the elements are swapped via tuple assignment `a[lo], a[hi] = a[hi], a[lo]` - the only actual comparison at this level.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Базовый случай и вычисление трети', en: 'Base case and computing the third' },
        explanation: {
          ru: 'Условие `hi - lo + 1 > 2` защищает от рекурсии на диапазонах из двух или меньше элементов. Иначе `t = (hi - lo + 1) // 3` вычисляет целую треть длины диапазона.',
          en: 'The `hi - lo + 1 > 2` condition guards against recursing on ranges of two or fewer elements. Otherwise `t = (hi - lo + 1) // 3` computes the integer third of the range length.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Первый рекурсивный вызов: первые 2/3', en: 'First recursive call: the first two-thirds' },
        explanation: {
          ru: '`rec(lo, hi - t)` обрабатывает первые две трети диапазона.',
          en: '`rec(lo, hi - t)` processes the first two-thirds of the range.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Второй рекурсивный вызов: последние 2/3', en: 'Second recursive call: the last two-thirds' },
        explanation: {
          ru: '`rec(lo + t, hi)` обрабатывает последние две трети, перекрываясь с первым вызовом на средней трети.',
          en: '`rec(lo + t, hi)` processes the last two-thirds, overlapping the first call across the middle third.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Третий рекурсивный вызов: снова первые 2/3', en: 'Third recursive call: the first two-thirds again' },
        explanation: {
          ru: '`rec(lo, hi - t)` повторяется в третий раз, гарантируя, что элементы, сдвинутые вторым вызовом, окажутся на верных местах.',
          en: '`rec(lo, hi - t)` repeats a third time, guaranteeing that elements shifted by the second call end up in their correct spots.',
        },
      },
      {
        lines: [13, 14],
        title: { ru: 'Запуск рекурсии', en: 'Kicking off the recursion' },
        explanation: {
          ru: '`if len(a) > 1: rec(0, len(a) - 1)` запускает рекурсию только для списков длиннее одного элемента.',
          en: '`if len(a) > 1: rec(0, len(a) - 1)` starts the recursion only for lists longer than one element.',
        },
      },
      {
        lines: [15],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После завершения рекурсии `a` полностью отсортирован и возвращается.',
          en: 'Once the recursion finishes, `a` is fully sorted and returned.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Реализация предельно короткая и рекурсия концептуально проста - интересный пример того, что «простой код» и «эффективный код» не одно и то же.',
      en: 'The implementation is extremely short and the recursion is conceptually simple - an interesting example that "simple code" and "efficient code" are not the same thing.',
    },
    {
      ru: 'Корректность доказывается индукцией по перекрывающимся третям - хорошая учебная задача на доказательство корректности рекурсивных алгоритмов.',
      en: "Correctness is proved by induction over the overlapping thirds - a good exercise in proving correctness of recursive algorithms.",
    },
    {
      ru: 'Требует лишь O(log n) дополнительной памяти на стек рекурсии, в отличие от многих других намеренно неэффективных алгоритмов.',
      en: 'Requires only O(log n) extra memory for the recursion stack, unlike many other deliberately inefficient algorithms.',
    },
  ],
  cons: [
    {
      ru: 'Сложность порядка O(n^2.71) хуже, чем у пузырьковой или сортировки вставками (O(n²)) - практически нет сценария, где Стуз-сортировка была бы предпочтительнее их.',
      en: "Complexity on the order of O(n^2.71) is worse than bubble or insertion sort (O(n²)) - there is virtually no scenario where stooge sort would be preferable to them.",
    },
    {
      ru: 'Тройное перекрывающееся рекурсивное применение к двум третям диапазона порождает огромную избыточную работу - большая часть элементов обрабатывается заново по несколько раз.',
      en: 'The triple overlapping recursive application to two-thirds of the range creates enormous redundant work - most elements get reprocessed several times.',
    },
    {
      ru: 'Существует исключительно в учебных и шуточных целях; ни одна известная реальная система не использует его для сортировки данных.',
      en: 'Exists purely for educational and joke purposes; no known real-world system uses it to sort data.',
    },
  ],

  whenToUse: [
    {
      ru: 'Никогда в реальных задачах - как и Бого-сортировка, Стуз-сортировка существует исключительно как учебный и шуточный пример.',
      en: 'Never in real tasks - like bogosort, stooge sort exists purely as an educational and joke example.',
    },
    {
      ru: 'В обучении рекурсии и анализу сложности - хороший пример того, как перекрывающиеся подзадачи (в отличие от непересекающихся, как в сортировке слиянием) резко ухудшают асимптотику.',
      en: "In teaching recursion and complexity analysis - a good example of how overlapping subproblems (unlike the non-overlapping ones in merge sort) drastically worsen the asymptotics.",
    },
  ],

  realWorldExamples: [
    {
      ru: '**Курсы по анализу алгоритмов** нередко используют Стуз-сортировку как задачу на вывод рекуррентного соотношения T(n) = 3T(2n/3) + O(1) и его решение методом основной теоремы.',
      en: '**Algorithm analysis courses** often use stooge sort as an exercise in deriving the recurrence T(n) = 3T(2n/3) + O(1) and solving it with the master theorem.',
    },
    {
      ru: '**Списки «алгоритмов-приколов»** в сообществе программистов регулярно упоминают Стуз-сортировку рядом с Бого-сортировкой как пример нарочито плохого дизайна.',
      en: '**"Joke algorithm" lists** in the programming community regularly mention stooge sort alongside bogosort as an example of deliberately bad design.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проследим полный вызов на массиве `[4, 1, 3, 2]` (n = 4). Верхний вызов `rec(0,3)` сравнивает 4 и 2, меняет их местами - `[2, 1, 3, 4]`. Затем `t = floor(4/3) = 1`, и следуют три вложенных вызова: `rec(0,2)`, `rec(1,3)`, `rec(0,2)`. Первый находит и исправляет пару (2, 1) внутри себя, давая `[1, 2, 3, 4]`; второй и третий не находят больше нарушений порядка. Итог: массив отсортирован всего за **2 обмена**, но ценой **13 рекурсивных вызовов** - по одному сравнению на вызов.',
        en: 'Let\'s trace a full call on `[4, 1, 3, 2]` (n = 4). The top call `rec(0,3)` compares 4 and 2 and swaps them - `[2, 1, 3, 4]`. Then `t = floor(4/3) = 1`, followed by three nested calls: `rec(0,2)`, `rec(1,3)`, `rec(0,2)`. The first finds and fixes the pair (2, 1) inside it, producing `[1, 2, 3, 4]`; the second and third find no more disorder. Result: the array is sorted in just **2 swaps**, at the cost of **13 recursive calls** - one comparison per call.',
      },
      {
        ru: 'Каждый вызов `rec` делает ровно одно сравнение, поэтому число сравнений равно числу вызовов. Оно растёт стремительно: для n = 9 требуется **121 вызов**, для n = 16 - **1093**, для n = 27 - **3280** (проверено прямым подсчётом). Для сравнения, пузырьковая сортировка на n = 27 делает не более `27*26/2 = 351` сравнений в худшем случае - Стуз-сортировка тратит на порядок больше работы уже на небольших массивах.',
        en: 'Every `rec` call makes exactly one comparison, so the call count equals the comparison count. It grows fast: n = 9 needs **121 calls**, n = 16 needs **1093**, n = 27 needs **3280** (verified by direct counting). For comparison, bubble sort on n = 27 makes at most `27*26/2 = 351` comparisons in the worst case - stooge sort spends an order of magnitude more work even on small arrays.',
      },
      {
        ru: 'Откуда берётся показатель степени 2.71? Рекуррентное соотношение T(n) = 3T(2n/3) + O(1) по основной теореме о рекуррентных соотношениях (случай, где `a = 3` вызовов на подзадачу размера `n/b` с `b = 1.5`) даёт T(n) = O(n^(log₃/log₁.₅)). Численно `log(3) ≈ 1.0986`, `log(1.5) ≈ 0.4055`, их отношение - **≈ 2.7095**, отсюда и заявленная сложность O(n^2.7095).',
        en: 'Where does the 2.71 exponent come from? The recurrence T(n) = 3T(2n/3) + O(1), by the master theorem (the case of `a = 3` calls on a subproblem of size `n/b` with `b = 1.5`), gives T(n) = O(n^(log(3)/log(1.5))). Numerically `log(3) ≈ 1.0986`, `log(1.5) ≈ 0.4055`, and their ratio is **≈ 2.7095**, which is exactly the stated O(n^2.7095) complexity.',
      },
      {
        ru: 'Ключевая деталь - перекрытие. Если бы диапазон делился на непересекающиеся трети (как в тернарной версии сортировки слиянием), рекуррентное соотношение было бы T(n) = 3T(n/3) + O(n) с логарифмической сложностью O(n log n). Именно перекрытие в две трети вместо непересекающейся трети превращает эффективный тернарный алгоритм в один из худших известных алгоритмов сортировки со стабильно правильным результатом.',
        en: 'The key detail is the overlap. If the range were split into non-overlapping thirds (like a ternary merge sort), the recurrence would be T(n) = 3T(n/3) + O(n) with logarithmic O(n log n) complexity. It\'s specifically the two-thirds overlap instead of a non-overlapping third that turns what could be an efficient ternary algorithm into one of the worst known sorting algorithms that still always produces a correct result.',
      },
      {
        ru: 'Корректность при этом не случайна - её можно доказать индукцией по длине диапазона. Первый вызов гарантирует, что наибольший элемент диапазона не окажется среди первых двух третей после обработки второго вызова (он "прячется" среди последней трети или дальше). Третий вызов затем сортирует первые две трети снова, подтягивая в них всё, что должно там оказаться, включая элементы, "принесённые" вторым вызовом.',
        en: 'Correctness here isn\'t accidental - it can be proved by induction on the range length. The first call guarantees the range\'s largest element won\'t end up among the first two-thirds after the second call\'s processing (it "hides" in the last third or beyond). The third call then sorts the first two-thirds again, pulling in everything that belongs there, including elements the second call "brought in".',
      },
      {
        ru: 'Стуз-сортировка часто упоминается как учебное упражнение на вывод и решение рекуррентных соотношений методом основной теоремы - в частности, в книге **Udi Manber, «Introduction to Algorithms: A Creative Approach» (1989)**, где подобные алгоритмы используются, чтобы показать, что интуитивно «похожий на быстрый» рекурсивный алгоритм может оказаться катастрофически медленным при неправильной структуре подзадач.',
        en: 'Stooge sort is often cited as a teaching exercise in deriving and solving recurrences via the master theorem - notably in **Udi Manber\'s "Introduction to Algorithms: A Creative Approach" (1989)**, where such algorithms illustrate that a recursive algorithm which intuitively "looks fast" can turn out catastrophically slow if its subproblem structure is wrong.',
      },
      {
        ru: 'При этом глубина рекурсии остаётся логарифмической: каждый уровень уменьшает размер диапазона в 1.5 раза (`2n/3`), поэтому глубина - O(log₁.₅ n), а не O(n), как можно было бы ожидать от алгоритма с такой плохой временной сложностью. Именно поэтому пространственная сложность Стуз-сортировки - всего O(log n), несмотря на почти кубическое время работы.',
        en: 'Yet the recursion depth stays logarithmic: each level shrinks the range by a factor of 1.5 (`2n/3`), so the depth is O(log₁.₅ n), not O(n) as one might expect from an algorithm with such poor time complexity. This is exactly why stooge sort\'s space complexity is only O(log n), despite its near-cubic running time.',
      },
    ],
    whenToUse: [
      {
        ru: '**Никогда для реальной сортировки данных** - даже сортировка вставками (O(n²)) или пузырьковая сортировка выигрывают у Стуз-сортировки (O(n^2.71)) на любом n больше нескольких элементов.',
        en: '**Never for real data sorting** - even insertion sort or bubble sort (both O(n²)) beat stooge sort (O(n^2.71)) for any n beyond a handful of elements.',
      },
      {
        ru: '**При обучении выводу рекуррентных соотношений** - Стуз-сортировка даёт наглядный пример перехода от T(n) = aT(n/b) + O(1) к основной теореме, с результатом, который не является ни O(n log n), ни O(n²), ни O(n), а честной дробной степенью.',
        en: '**When teaching recurrence derivation** - stooge sort gives a clear example of going from T(n) = aT(n/b) + O(1) through the master theorem, with a result that is neither O(n log n), nor O(n²), nor O(n), but a genuine fractional power.',
      },
      {
        ru: '**При сравнении с сортировкой слиянием** - contrast полезен именно потому, что оба алгоритма рекурсивно делят диапазон на трети, но merge sort делает это без перекрытия и с явным шагом слияния за O(n), а Стуз-сортировка - с перекрытием и без слияния вовсе.',
        en: '**When contrasting with merge sort** - the comparison is useful precisely because both algorithms recursively split the range into thirds, but merge sort does so without overlap and with an explicit O(n) merge step, while stooge sort overlaps and has no merge step at all.',
      },
      {
        ru: '**При обсуждении «ложной интуиции» о рекурсии** - студенты часто предполагают, что любое рекурсивное деление диапазона на части даёт O(n log n); Стуз-сортировка - контрпример, показывающий, что решает именно структура подзадач (перекрывающиеся или нет), а не сам факт рекурсии.',
        en: '**When discussing "false intuition" about recursion** - students often assume any recursive range-splitting gives O(n log n); stooge sort is a counterexample showing that what matters is the subproblem structure (overlapping or not), not the mere fact of recursion.',
      },
    ],
    realWorld: [
      {
        ru: '**Udi Manber, «Introduction to Algorithms: A Creative Approach» (Addison-Wesley, 1989)** - учебник, где подобные намеренно неэффективные рекурсивные алгоритмы используются как упражнения на анализ рекуррентных соотношений.',
        en: '**Udi Manber, "Introduction to Algorithms: A Creative Approach" (Addison-Wesley, 1989)** - the textbook where deliberately inefficient recursive algorithms like this are used as exercises in recurrence analysis.',
      },
      {
        ru: '**Rosetta Code и аналогичные сайты-каталоги алгоритмов** реализуют Стуз-сортировку на десятках языков программирования как демонстрацию курьёзной, но корректной рекурсии, а не как практический инструмент.',
        en: '**Rosetta Code and similar algorithm-catalog sites** implement stooge sort in dozens of programming languages as a demonstration of a curious-but-correct recursion, not as a practical tool.',
      },
      {
        ru: '**Списки «худших алгоритмов сортировки»** в сообществе программистов неизменно ставят Стуз-сортировку рядом с Бого- и Слоу-сортировкой (Slowsort) как пример того, насколько плохой может быть асимптотика при внешне разумном коде.',
        en: '**"Worst sorting algorithms" lists** in the programming community consistently place stooge sort alongside bogosort and slowsort as an example of how bad asymptotics can get from outwardly reasonable-looking code.',
      },
      {
        ru: '**Курсы по алгоритмическому анализу** (университетские и онлайн) используют вывод показателя `log(3)/log(1.5) ≈ 2.71` как готовую задачу применения основной теоремы для рекуррентных соотношений с нецелой степенью в основании логарифма.',
        en: '**Algorithm analysis courses** (university and online) use deriving the `log(3)/log(1.5) ≈ 2.71` exponent as a ready-made exercise in applying the master theorem to recurrences with a non-integer base.',
      },
    ],
  },

  relatedAlgorithms: ['bogosort', 'bubble-sort', 'gnome-sort'],

  quiz: [
    {
      question: {
        ru: 'Что сравнивается и при необходимости меняется местами на каждом шаге Стуз-сортировки?',
        en: 'What is compared and, if needed, swapped at each step of stooge sort?',
      },
      options: [
        { ru: 'Первый и последний элементы текущего диапазона', en: "The first and last elements of the current range" },
        { ru: 'Два соседних элемента, как в пузырьковой сортировке на каждом проходе', en: 'Two adjacent elements, as bubble sort does on every pass' },
        { ru: 'Средний элемент с первым, чтобы выбрать опорное значение для разбиения', en: 'The middle element with the first, to pick a pivot value for partitioning' },
        { ru: 'Максимум и минимум всего массива, чтобы определить границы диапазона значений', en: 'The maximum and minimum of the whole array, to determine the range of values' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если первый элемент диапазона больше последнего, они меняются местами - это единственное фактическое сравнение на каждом уровне.',
        en: "If the range's first element is greater than its last, they are swapped - this is the only actual comparison at each level.",
      },
      hint: {
        ru: 'Смотрите шаг «Сравнить крайние элементы диапазона» на вкладке «Визуализация» и строки 5-7 функции `rec` на вкладке «Реализация».',
        en: 'See the "Compare the range\'s outer elements" step on the "Visualization" tab and lines 5-7 of the `rec` function on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'На какие подзадачи рекурсивно делится диапазон в Стуз-сортировке?',
        en: 'Into what subproblems is the range recursively split in stooge sort?',
      },
      options: [
        { ru: 'На три перекрывающихся вызова: первые 2/3, последние 2/3, снова первые 2/3', en: 'Three overlapping calls: the first 2/3, the last 2/3, the first 2/3 again' },
        { ru: 'На две полностью непересекающиеся половины, которые впоследствии сливаются между собой в отсортированном порядке', en: 'Two entirely non-overlapping halves, which are subsequently merged back together in sorted order' },
        { ru: 'На n полностью непересекающихся частей по одному элементу в каждой, точно как в корзинной сортировке', en: 'n entirely non-overlapping single-element parts, each on its own, exactly as in bucket sort' },
        { ru: 'На случайно выбираемые подмассивы произвольного размера, который каждый раз меняется при новом вызове', en: 'Randomly chosen subarrays of arbitrary size, which changes anew on every single call' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно перекрытие двух третей - а не непересекающееся деление, как в сортировке слиянием - отличает Стуз-сортировку и объясняет её плохую асимптотику.',
        en: "It's exactly the overlap of the two-thirds - not a non-overlapping split like in merge sort - that defines stooge sort and explains its poor asymptotics.",
      },
      hint: {
        ru: 'Смотрите шаги «Рекурсивно обработать первые/последние две трети» на вкладке «Визуализация» и строки 10-12 функции `rec` на вкладке «Реализация».',
        en: 'See the "Recursively process the first/last two-thirds" steps on the "Visualization" tab and lines 10-12 of the `rec` function on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова асимптотическая сложность Стуз-сортировки?',
        en: 'What is the asymptotic complexity of stooge sort?',
      },
      options: [
        { ru: 'O(n^2.71), хуже, чем у пузырьковой сортировки', en: 'O(n^2.71), worse than bubble sort' },
        { ru: 'O(n log n), как у сортировки слиянием, поскольку рекурсия делит диапазон на части', en: 'O(n log n), like merge sort, since the recursion splits the range into parts' },
        { ru: 'O(n), линейная, потому что каждый элемент сравнивается лишь один раз за весь процесс', en: 'O(n), linear, because each element is compared only once during the whole process' },
        { ru: 'O(n²), точно как у пузырьковой сортировки в её типичной реализации', en: "O(n²), exactly like bubble sort in its typical implementation" },
      ],
      correct: 0,
      explanation: {
        ru: 'Решение рекуррентного соотношения T(n) = 3T(2n/3) + O(1) даёт показатель степени log(3)/log(1.5) ≈ 2.71.',
        en: 'Solving the recurrence T(n) = 3T(2n/3) + O(1) gives the exponent log(3)/log(1.5) ≈ 2.71.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Углублённо» на вкладке «Суть» - там показан вывод показателя log(3)/log(1.5) ≈ 2.71 через основную теорему.',
        en: 'See the third paragraph of the "Deep dive" section on the "Intent" tab - it derives the log(3)/log(1.5) ≈ 2.71 exponent via the master theorem.',
      },
    },
    {
      question: {
        ru: 'Почему, несмотря на плохую сложность, Стуз-сортировка вообще корректно сортирует массив?',
        en: 'Why, despite its poor complexity, does stooge sort correctly sort the array at all?',
      },
      options: [
        {
          ru: 'Тройное перекрывающееся применение к двум третям диапазона доказуемо гарантирует правильный порядок',
          en: 'The triple overlapping application to two-thirds of the range provably guarantees correct ordering',
        },
        { ru: 'На самом деле она вообще не гарантирует корректность в общем случае и иногда оставляет часть массива неотсортированной', en: 'It actually does not guarantee correctness in the general case at all and sometimes leaves part of the array unsorted' },
        { ru: 'Потому что перед этим сначала незаметно выполняется отдельный скрытый проход сортировки вставками по всему массиву целиком', en: 'Because a separate hidden insertion sort pass silently runs first over the entire array beforehand' },
        { ru: 'Это работает только для чётного числа элементов, тогда как для нечётного числа требуется совершенно отдельная обработка', en: 'This only works for an even number of elements, while an odd count requires completely separate handling' },
      ],
      correct: 0,
      explanation: {
        ru: 'Хотя это не очевидно на интуитивном уровне, тройное перекрывающееся рекурсивное применение можно строго доказать корректным индукцией по размеру диапазона.',
        en: 'Although not intuitively obvious, the triple overlapping recursive application can be rigorously proved correct by induction on the range size.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Углублённо» на вкладке «Суть» (индуктивное доказательство корректности).',
        en: 'See the fifth paragraph of the "Deep dive" section on the "Intent" tab (the inductive correctness proof).',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует Стуз-сортировка?',
        en: 'How much extra memory does stooge sort require?',
      },
      options: [
        { ru: 'O(log n) на стек рекурсии', en: 'O(log n) for the recursion stack' },
        { ru: 'O(n) на вспомогательный массив, в который копируются все элементы перед сортировкой', en: 'O(n) for an auxiliary array into which all elements are copied before sorting' },
        { ru: 'O(n²) на матрицу сравнений, хранящую результат каждого попарного сравнения', en: 'O(n²) for a comparison matrix storing the result of every pairwise comparison' },
        { ru: 'O(1), рекурсия не используется, так как весь алгоритм реализован через простой цикл', en: 'O(1), no recursion is used, since the whole algorithm is implemented with a simple loop' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка выполняется на месте, а дополнительная память уходит только на глубину рекурсивных вызовов.',
        en: 'The sort runs in place, and the only extra memory goes to the depth of the recursive calls.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и седьмой абзац раздела «Углублённо» на вкладке «Суть» (глубина рекурсии O(log₁.₅ n)).',
        en: 'See the "Space" complexity badge at the top of the page and the seventh paragraph of the "Deep dive" section on the "Intent" tab (the O(log₁.₅ n) recursion depth).',
      },
    },
    {
      question: {
        ru: 'Какое рекуррентное соотношение описывает сложность Стуз-сортировки?',
        en: 'Which recurrence relation describes the complexity of stooge sort?',
      },
      options: [
        { ru: 'T(n) = 3T(2n/3) + O(1)', en: 'T(n) = 3T(2n/3) + O(1)' },
        { ru: 'T(n) = 2T(n/2) + O(n), как у сортировки слиянием', en: 'T(n) = 2T(n/2) + O(n), the same as merge sort' },
        { ru: 'T(n) = T(n−1) + O(n), как у сортировки вставками', en: 'T(n) = T(n−1) + O(n), the same as insertion sort' },
        { ru: 'T(n) = T(n/2) + O(1), как у бинарного поиска', en: 'T(n) = T(n/2) + O(1), the same as binary search' },
      ],
      correct: 0,
      explanation: {
        ru: 'Три рекурсивных вызова на диапазонах размером 2n/3 и константная работа на каждом уровне дают T(n) = 3T(2n/3) + O(1).',
        en: 'Three recursive calls on ranges of size 2n/3 and constant work at each level give T(n) = 3T(2n/3) + O(1).',
      },
      hint: {
        ru: 'Смотрите строки 8-12 функции `rec` на вкладке «Реализация» (три вызова на диапазонах размером 2n/3) и третий абзац раздела «Углублённо».',
        en: 'See lines 8-12 of the `rec` function on the "Implementation" tab (three calls on ranges of size 2n/3) and the third paragraph of the "Deep dive" section.',
      },
    },
    {
      question: {
        ru: 'Чем Стуз-сортировка хуже пузырьковой сортировки с точки зрения асимптотики?',
        en: 'In what way is stooge sort worse than bubble sort in terms of asymptotics?',
      },
      options: [
        { ru: 'Стуз: степень ~2.71, пузырьковая - ровно 2', en: 'Stooge sort has exponent ~2.71, while bubble sort has exactly 2' },
        { ru: 'Стуз-сортировка использует O(n) памяти, а пузырьковая - только O(1)', en: 'Stooge sort uses O(n) memory for its recursion, while bubble sort uses only O(1)' },
        { ru: 'Пузырьковая сортировка нестабильна, а Стуз-сортировка - устойчива', en: 'Bubble sort is unstable, while stooge sort is stable' },
        { ru: 'Никакой разницы - обе сортировки имеют одинаковую асимптотику O(n²)', en: 'No difference - both sorts have the same O(n²) asymptotics' },
      ],
      correct: 0,
      explanation: {
        ru: 'O(n^2.71) растёт быстрее O(n²) при увеличении n, поэтому Стуз-сортировка асимптотически хуже даже пузырьковой.',
        en: 'O(n^2.71) grows faster than O(n²) as n increases, so stooge sort is asymptotically worse than even bubble sort.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Углублённо» на вкладке «Суть» - там сравнивается число вызовов Стуз-сортировки с числом сравнений пузырьковой на одном и том же n.',
        en: 'See the second paragraph of the "Deep dive" section on the "Intent" tab - it compares stooge sort\'s call count with bubble sort\'s comparison count for the same n.',
      },
    },
    {
      question: {
        ru: 'Зачем алгоритм делает третий рекурсивный вызов на первых двух третях после уже двух предыдущих вызовов?',
        en: 'Why does the algorithm make a third recursive call on the first two-thirds after the previous two calls?',
      },
      options: [
        { ru: 'Гарантировать правильные позиции элементов после двух предыдущих вызовов', en: 'To guarantee that elements shifted by the last two calls are in their correct positions' },
        { ru: 'Только для симметрии кода - третий вызов не влияет на результат', en: 'Only for code symmetry - the third call has no effect on the result' },
        { ru: 'Чтобы выполнить итоговую проверку на отсортированность без изменений', en: 'To perform a final check for sortedness without making changes' },
        { ru: 'Потому что два вызова обрабатывают только половину элементов, а третий - оставшиеся', en: 'Because the first two calls together only cover half the elements, and the third handles the rest' },
      ],
      correct: 0,
      explanation: {
        ru: 'Без третьего вызова элементы, «занесённые» вторым вызовом (последние 2/3) в начало диапазона, могут оказаться не на своих местах.',
        en: 'Without the third call, elements "introduced" by the second call (last 2/3) into the start of the range may not be in their correct positions.',
      },
      hint: {
        ru: 'Смотрите шаг «Третий рекурсивный вызов: снова первые 2/3» в построчном разборе на вкладке «Реализация» (строка 12).',
        en: 'See the "Third recursive call: the first two-thirds again" step in the line-by-line walkthrough on the "Implementation" tab (line 12).',
      },
    },
    {
      question: {
        ru: 'Какое практическое применение имеет Стуз-сортировка за пределами учебных целей?',
        en: 'What practical application does stooge sort have beyond educational purposes?',
      },
      options: [
        { ru: 'Никакого - намеренно неэффективен, только учебный пример', en: 'None - the algorithm is deliberately inefficient and used only as a teaching example' },
        { ru: 'Сортировка строк в базах данных, где требуется лексикографический порядок', en: 'Sorting strings in databases where lexicographic order is required regardless of input' },
        { ru: 'Параллельная сортировка на GPU благодаря простой структуре рекурсии', en: 'Parallel sorting on GPUs thanks to the simple recursion structure' },
        { ru: 'Внешняя сортировка файлов, не помещающихся в оперативную память', en: 'External sorting of files that do not fit in RAM' },
      ],
      correct: 0,
      explanation: {
        ru: 'Стуз-сортировка существует исключительно как учебный и шуточный пример - ни одна известная реальная система не использует её.',
        en: 'Stooge sort exists purely as an educational and joke example - no known real-world system uses it.',
      },
      hint: {
        ru: 'Смотрите раздел «Когда применять» на вкладке «Суть» и второй пункт realWorld раздела «Углублённо» (каталоги алгоритмов вроде Rosetta Code).',
        en: 'See the "When to use" section on the "Intent" tab and the second "Real world" item in the "Deep dive" section (algorithm catalogs like Rosetta Code).',
      },
    },
    {
      question: {
        ru: 'Что происходит с диапазоном из двух элементов в Стуз-сортировке?',
        en: 'What happens to a two-element range in stooge sort?',
      },
      options: [
        { ru: 'Элементы сравниваются и меняются местами, рекурсии нет', en: 'The elements are compared and swapped if needed, no recursion is called' },
        { ru: 'Рекурсия вызывается ещё три раза, каждый раз на всём том же диапазоне', en: 'Recursion is called three more times, each time on the same full range' },
        { ru: 'Диапазон из двух элементов считается уже отсортированным без проверки', en: 'A two-element range is considered already sorted without any check' },
        { ru: 'Два элемента сортируются встроенной функцией сравнения платформы', en: 'The two elements are sorted by the platform\'s built-in comparison function' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие hi − lo + 1 > 2 не выполняется для двух элементов, поэтому рекурсия останавливается после единственного сравнения и возможного обмена.',
        en: 'The condition hi − lo + 1 > 2 is not satisfied for two elements, so recursion stops after the single comparison and possible swap.',
      },
      hint: {
        ru: 'Смотрите строки 8-9 функции `rec` на вкладке «Реализация» (условие `hi - lo + 1 > 2`) и одноимённый шаг построчного разбора.',
        en: 'See lines 8-9 of the `rec` function on the "Implementation" tab (the `hi - lo + 1 > 2` condition) and the matching walkthrough step.',
      },
    },
  ],
};

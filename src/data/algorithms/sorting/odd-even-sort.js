export const oddEvenSort = {
  slug: 'odd-even-sort',
  category: 'sorting',
  name: { ru: 'Odd-Even Sort', en: 'Odd-Even Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'stable', 'parallelizable'],

  intent: {
    ru: 'Чётно-нечётная сортировка (brick sort) - вариант пузырьковой сортировки, который вместо одного последовательного прохода чередует два независимых набора сравнений: по нечётным и по чётным позициям, что делает пары сравнений внутри каждого набора независимыми друг от друга и пригодными для параллельного выполнения.',
    en: 'Odd-even sort (brick sort) is a bubble sort variant that, instead of one sequential pass, alternates between two independent sets of comparisons: odd-indexed pairs and even-indexed pairs - which makes the comparisons within each set independent of one another and suitable for parallel execution.',
  },

  problem: {
    ru: 'Обычная пузырьковая сортировка по своей природе последовательна: каждое сравнение (i, i+1) должно выполниться после предыдущего (i-1, i), потому что результат обмена на предыдущем шаге влияет на следующий. Это делает bubble sort плохим кандидатом для параллельных вычислений или аппаратной реализации (например, в сортирующих сетях), где хочется выполнять много сравнений одновременно.',
    en: 'Plain bubble sort is inherently sequential: each comparison (i, i+1) must happen after the previous one (i-1, i), because the previous step\'s swap outcome affects the next. This makes bubble sort a poor fit for parallel computation or hardware implementations (e.g., in sorting networks), where many comparisons should run simultaneously.',
  },

  solution: {
    ru: 'Все сравнения разбиваются на две группы, которые не пересекаются по индексам: «нечётная» фаза сравнивает пары (1,2), (3,4), (5,6)... а «чётная» фаза - пары (0,1), (2,3), (4,5).... Внутри одной фазы ни одна пара индексов не используется дважды, поэтому все сравнения этой фазы можно выполнять одновременно, независимо друг от друга. Алгоритм чередует нечётную и чётную фазы, пока за очередной полный проход (обе фазы) не произойдёт ни одного обмена - тогда массив отсортирован.',
    en: 'All comparisons are split into two non-overlapping groups by index: the "odd" phase compares pairs (1,2), (3,4), (5,6)... and the "even" phase compares pairs (0,1), (2,3), (4,5).... Within a single phase, no index is used twice, so every comparison in that phase can run simultaneously, independent of the others. The algorithm alternates odd and even phases until a full pass (both phases) makes no swaps at all - at which point the array is sorted.',
  },

  steps: [
    {
      title: { ru: 'Нечётная фаза', en: 'Odd phase' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами все пары (a[1],a[2]), (a[3],a[4]), (a[5],a[6])...',
        en: 'Compare and, if needed, swap every pair (a[1],a[2]), (a[3],a[4]), (a[5],a[6])...',
      },
    },
    {
      title: { ru: 'Чётная фаза', en: 'Even phase' },
      explanation: {
        ru: 'Сравнить и при необходимости поменять местами все пары (a[0],a[1]), (a[2],a[3]), (a[4],a[5])...',
        en: 'Compare and, if needed, swap every pair (a[0],a[1]), (a[2],a[3]), (a[4],a[5])...',
      },
    },
    {
      title: { ru: 'Отследить перестановки', en: 'Track swaps' },
      explanation: {
        ru: 'Запомнить, была ли хотя бы одна перестановка в течение обеих фаз этого прохода.',
        en: 'Remember whether at least one swap happened during either phase of this pass.',
      },
    },
    {
      title: { ru: 'Повторить обе фазы', en: 'Repeat both phases' },
      explanation: {
        ru: 'Повторять чередование нечётной и чётной фаз, пока происходят перестановки.',
        en: 'Keep alternating the odd and even phases as long as swaps occur.',
      },
    },
    {
      title: { ru: 'Остановиться', en: 'Stop' },
      explanation: {
        ru: 'Когда полный проход (обе фазы) не даёт ни одной перестановки, массив отсортирован.',
        en: 'When a full pass (both phases) produces no swaps, the array is sorted.',
      },
    },
  ],
  stepBreakpoints: [6, 22, 39, 53],

  implementation: {
    javascript: `function oddEvenSort(arr) {
  const a = [...arr];
  const n = a.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 1; i + 1 < n; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
      }
    }
    for (let i = 0; i + 1 < n; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
      }
    }
  }
  return a;
}`,
    python: `def odd_even_sort(arr):
    a = arr.copy()
    n = len(a)
    sorted_ = False

    while not sorted_:
        sorted_ = True
        for i in range(1, n - 1, 2):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                sorted_ = False
        for i in range(0, n - 1, 2):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                sorted_ = False
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - весь алгоритм умещается в чередование двух циклов внутри функции, без вспомогательных структур.',
          en: 'The function takes a single array `arr` - the whole algorithm fits into two alternating loops inside the function, with no auxiliary structures.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Копия массива и длина', en: 'Copying the array and its length' },
        explanation: {
          ru: '`const a = [...arr]` копирует вход, чтобы не менять аргумент вызывающего кода; `const n = a.length` запоминает длину для границ обоих циклов ниже.',
          en: '`const a = [...arr]` copies the input so the caller\'s argument stays untouched; `const n = a.length` records the length used by both loop bounds below.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Флаг завершения', en: 'The termination flag' },
        explanation: {
          ru: '`let sorted = false` стартует в `false`, чтобы внешний цикл `while (!sorted)` выполнился хотя бы один полный проход (обе фазы), прежде чем алгоритм сможет остановиться.',
          en: '`let sorted = false` starts as `false` so the outer `while (!sorted)` loop runs at least one full pass (both phases) before the algorithm can stop.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Внешний цикл и сброс флага', en: 'The outer loop and resetting the flag' },
        explanation: {
          ru: '`while (!sorted)` повторяет пары фаз, пока не пройдёт проход без единой перестановки. `sorted = true` в начале каждой итерации - предположение, которое любая перестановка ниже (в любой из фаз) отменит.',
          en: '`while (!sorted)` repeats pairs of phases until one pass makes no swaps at all. `sorted = true` at the start of each iteration is an assumption that any swap below (in either phase) will undo.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Границы нечётной фазы', en: 'Odd-phase bounds' },
        explanation: {
          ru: '`for (let i = 1; i + 1 < n; i += 2)` перебирает индексы 1, 3, 5... - каждый `i` сравнивается со своим соседом `i + 1`, а шаг `+= 2` гарантирует, что ни одна пара индексов не используется дважды внутри этой фазы.',
          en: '`for (let i = 1; i + 1 < n; i += 2)` walks indices 1, 3, 5... - each `i` is compared against its neighbor `i + 1`, and the `+= 2` step guarantees no index pair is used twice within this phase.',
        },
      },
      {
        lines: [9, 12],
        title: { ru: 'Сравнение и обмен в нечётной фазе', en: 'Comparing and swapping in the odd phase' },
        explanation: {
          ru: '`if (a[i] > a[i + 1])` меняет пару местами при нарушении порядка и ставит `sorted = false` - раз перестановка случилась, массив ещё не готов и понадобится ещё один полный проход.',
          en: '`if (a[i] > a[i + 1])` swaps the pair when out of order and sets `sorted = false` - a swap happening means the array isn\'t done yet and another full pass will be needed.',
        },
      },
      {
        lines: [14],
        title: { ru: 'Границы чётной фазы', en: 'Even-phase bounds' },
        explanation: {
          ru: '`for (let i = 0; i + 1 < n; i += 2)` перебирает индексы 0, 2, 4... - те же правила, что и в нечётной фазе, но со сдвигом на одну позицию, поэтому эта фаза покрывает ровно те пары, которые нечётная не затрагивала.',
          en: '`for (let i = 0; i + 1 < n; i += 2)` walks indices 0, 2, 4... - same rules as the odd phase, just shifted by one position, so this phase covers exactly the pairs the odd phase left untouched.',
        },
      },
      {
        lines: [15, 18],
        title: { ru: 'Сравнение и обмен в чётной фазе', en: 'Comparing and swapping in the even phase' },
        explanation: {
          ru: 'Идентичная логика сравнения и обмена, что и в нечётной фазе, только на других парах индексов - обе фазы вместе покрывают все соседние пары массива ровно по одному разу за проход.',
          en: 'The same compare-and-swap logic as the odd phase, just on a different set of index pairs - together, the two phases cover every adjacent pair in the array exactly once per pass.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `while (!sorted)` завершается - обе фазы очередного прохода не сделали ни одной перестановки - `a` полностью отсортирован и возвращается.',
          en: 'When `while (!sorted)` ends - both phases of the latest pass made zero swaps - `a` is fully sorted and gets returned.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - структура идентична JS-версии: два чередующихся цикла внутри одной функции.',
          en: 'The function takes a single list `arr` - the structure matches the JS version: two alternating loops inside one function.',
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
        lines: [4],
        title: { ru: 'Флаг завершения', en: 'The termination flag' },
        explanation: {
          ru: '`sorted_ = False` - с подчёркиванием в конце имени, потому что `sorted` - встроенная функция Python; переменная работает так же, как `sorted` в JS-версии.',
          en: '`sorted_ = False` - trailing underscore because `sorted` is a Python builtin; the variable behaves exactly like `sorted` in the JS version.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Внешний цикл и сброс флага', en: 'The outer loop and resetting the flag' },
        explanation: {
          ru: '`while not sorted_:` повторяет пары фаз, пока проход не пройдёт без перестановок. `sorted_ = True` в начале каждой итерации - предположение, которое отменяется при первой же перестановке.',
          en: '`while not sorted_:` repeats pairs of phases until a swap-free pass occurs. `sorted_ = True` at the start of each iteration is an assumption undone by the first swap.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Границы нечётной фазы', en: 'Odd-phase bounds' },
        explanation: {
          ru: '`for i in range(1, n - 1, 2):` перебирает индексы 1, 3, 5... с шагом 2 - эквивалент условия `i + 1 < n` в JS-версии, выраженный через границу диапазона `n - 1`.',
          en: '`for i in range(1, n - 1, 2):` walks indices 1, 3, 5... with a step of 2 - equivalent to the `i + 1 < n` condition in the JS version, expressed via the `n - 1` range bound.',
        },
      },
      {
        lines: [9, 11],
        title: { ru: 'Сравнение и обмен в нечётной фазе', en: 'Comparing and swapping in the odd phase' },
        explanation: {
          ru: '`if a[i] > a[i + 1]:` меняет пару местами кортежным присваиванием `a[i], a[i + 1] = a[i + 1], a[i]` и устанавливает `sorted_ = False`, как в JS.',
          en: '`if a[i] > a[i + 1]:` swaps the pair via tuple assignment `a[i], a[i + 1] = a[i + 1], a[i]` and sets `sorted_ = False`, same as JS.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Границы чётной фазы', en: 'Even-phase bounds' },
        explanation: {
          ru: '`for i in range(0, n - 1, 2):` перебирает индексы 0, 2, 4... - те же пары, которые нечётная фаза не затрагивала.',
          en: '`for i in range(0, n - 1, 2):` walks indices 0, 2, 4... - exactly the pairs the odd phase left untouched.',
        },
      },
      {
        lines: [13, 15],
        title: { ru: 'Сравнение и обмен в чётной фазе', en: 'Comparing and swapping in the even phase' },
        explanation: {
          ru: 'Та же логика сравнения и обмена, применённая к парам чётной фазы - обе фазы вместе за один проход покрывают все соседние пары ровно один раз.',
          en: 'The same compare-and-swap logic, applied to the even-phase pairs - together the two phases cover every adjacent pair exactly once per pass.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `while not sorted_:` завершается, `a` полностью отсортирован и возвращается.',
          en: 'When `while not sorted_:` ends, `a` is fully sorted and gets returned.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Сравнения внутри каждой фазы независимы друг от друга, поэтому алгоритм естественно распараллеливается - каждый процессор может обрабатывать свою пару без блокировок.',
      en: 'Comparisons within each phase are independent of one another, so the algorithm parallelizes naturally - each processor can handle its own pair without locking.',
    },
    {
      ru: 'Устойчив и сортирует на месте с O(1) дополнительной памяти, как и обычный bubble sort.',
      en: 'Stable and sorts in place with O(1) extra memory, same as plain bubble sort.',
    },
    {
      ru: 'Простая, регулярная структура сравнений делает алгоритм удобным для реализации в виде сортирующей сети или на SIMD/GPU-архитектурах.',
      en: 'The simple, regular comparison structure makes the algorithm convenient to implement as a sorting network or on SIMD/GPU architectures.',
    },
  ],
  cons: [
    {
      ru: 'В последовательном (не параллельном) исполнении остаётся O(n²), не давая никакого выигрыша по сравнению с обычным bubble sort.',
      en: 'In sequential (non-parallel) execution it remains O(n²), offering no gain over plain bubble sort.',
    },
    {
      ru: 'При аппаратной/параллельной реализации требует n процессоров или ядер для полного выигрыша - на обычном процессоре с одним потоком эта параллельность не используется.',
      en: 'A hardware/parallel implementation needs n processors or cores for the full benefit - on an ordinary single-threaded CPU, this parallelism goes unused.',
    },
    {
      ru: 'Как и bubble sort, страдает от «черепах» - маленьких элементов, застревающих в конце массива и требующих много проходов.',
      en: 'Like bubble sort, it suffers from "turtles" - small elements stuck near the end of the array that need many passes.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда доступно параллельное или SIMD-оборудование и нужна простая, регулярная схема сравнений без сложной логики зависимостей - например, в сортирующих сетях.',
      en: 'When parallel or SIMD hardware is available and a simple, regular comparison scheme without complex dependency logic is needed - for example, in sorting networks.',
    },
    {
      ru: 'Как учебный пример того, как переформулировать последовательный алгоритм (bubble sort) в параллельно-совместимую форму, разбив зависимые шаги на независимые группы.',
      en: 'As a teaching example of how to reformulate a sequential algorithm (bubble sort) into a parallel-friendly form by splitting dependent steps into independent groups.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Параллельные вычислительные архитектуры и transputer-сети (1980-е годы)** использовали чётно-нечётную сортировку как один из первых практических примеров параллельного алгоритма сортировки.',
      en: '**Parallel computing architectures and transputer networks (1980s)** used odd-even sort as one of the earliest practical examples of a parallel sorting algorithm.',
    },
    {
      ru: '**Сортирующие сети (sorting networks) и их аппаратные реализации** нередко используют чётно-нечётную схему сравнений как основу для регулярной, легко масштабируемой топологии компараторов.',
      en: '**Sorting networks and their hardware implementations** often use the odd-even comparison scheme as the basis for a regular, easily scalable comparator topology.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Проверим поведение на конкретном входе - том же массиве `[8, 3, 9, 1, 6, 4, 7, 2, 5]` (n = 9), что используется на вкладке «Визуализация». Симуляция кода с вкладки «Реализация» даёт: **5 полных проходов** (нечётная + чётная фаза), **40 сравнений** и **21 обмен** до полной сортировки.',
        en: 'Let\'s check the behavior on a concrete input - the same array `[8, 3, 9, 1, 6, 4, 7, 2, 5]` (n = 9) used on the "Visualization" tab. Simulating the code from the "Implementation" tab gives: **5 full passes** (odd + even phase), **40 comparisons**, and **21 swaps** before the array is fully sorted.',
      },
      {
        ru: 'Для сравнения: на уже отсортированном `[1..9]` алгоритм делает **1 проход, 8 сравнений и 0 обменов** - оба полупрохода (по 4 сравнения каждый при n = 9) сразу подтверждают порядок. На развороте `[9..1]` - **6 проходов, 48 сравнений и 36 обменов**: это худший случай, но обратите внимание - обычная пузырьковая сортировка на том же входе потребовала бы 8 проходов (n - 1), а не 6.',
        en: 'For comparison: on the already-sorted `[1..9]`, the algorithm takes **1 pass, 8 comparisons, and 0 swaps** - both half-phases (4 comparisons each at n = 9) immediately confirm the order is correct. On the reversed `[9..1]` - **6 passes, 48 comparisons, and 36 swaps**: the worst case, but note that plain bubble sort on the same input would need 8 passes (n - 1), not 6.',
      },
      {
        ru: 'Эта разница не случайна: разбиение на нечётную и чётную фазы позволяет элементу переместиться на **две** позиции за один полный проход вместо одной, как в обычном bubble sort - если элемент сдвинулся вправо в нечётной фазе, он может тут же сдвинуться ещё раз в следующей за ней чётной. Замер на нескольких размерах подтверждает это: для развёрнутого входа число проходов растёт примерно как `n/2` - 3 при n = 4, 6 при n = 9, 11 при n = 20, 26 при n = 50, а не как `n`.',
        en: 'This difference isn\'t accidental: splitting into odd and even phases lets an element move **two** positions in one full pass instead of one, as in plain bubble sort - if an element shifts right during the odd phase, it can immediately shift again in the even phase right after. Measurements across several sizes confirm this: for reversed input, the pass count grows roughly as `n/2` - 3 at n = 4, 6 at n = 9, 11 at n = 20, 26 at n = 50, not as `n`.',
      },
      {
        ru: 'Но это не меняет сложность по числу сравнений: каждый проход по-прежнему стоит `O(n)` сравнений (обе фазы вместе покрывают почти весь массив), и с `O(n/2)` проходами общая **последовательная** сложность остаётся `O(n²)` - тот же класс, что у обычного bubble sort, просто с меньшей константой. Разделение на фазы не даёт асимптотического выигрыша, если выполнять его на одном ядре одно за другим.',
        en: 'This doesn\'t change the comparison-count complexity, though: each pass still costs `O(n)` comparisons (both phases together cover nearly the whole array), and with `O(n/2)` passes the total **sequential** complexity stays `O(n²)` - the same class as plain bubble sort, just with a smaller constant. Splitting into phases gives no asymptotic win if executed one core at a time.',
      },
      {
        ru: 'Выигрыш появляется только при реальном параллельном исполнении. Внутри одной фазы ни один индекс не встречается дважды - сравнения `(1,2)`, `(3,4)`, `(5,6)`... не пересекаются по данным, поэтому с `n/2` процессорами вся фаза выполняется за `O(1)` параллельного времени. Число проходов при этом ограничено сверху значением `n` (строгий теоретический результат для odd-even transposition sort, доказываемый через **принцип 0-1** для сортирующих сетей), что даёт `O(n)` суммарного параллельного времени вместо `O(n²)` последовательного.',
        en: 'The win only shows up under real parallel execution. Within a single phase, no index appears twice - the `(1,2)`, `(3,4)`, `(5,6)`... comparisons never touch the same data, so with `n/2` processors an entire phase runs in `O(1)` parallel time. The number of passes is bounded above by `n` (a strict theoretical result for odd-even transposition sort, proved via the **zero-one principle** for sorting networks), giving `O(n)` total parallel time instead of `O(n²)` sequential.',
      },
      {
        ru: 'Метод изобрёл **А. Наум Хабермann** в 1972 году как одну из первых схем сортировки для параллельных вычислительных систем (сети transputer-подобных процессоров). Именно строгая доказуемость через принцип 0-1 (если сеть компараторов корректно сортирует все последовательности из нулей и единиц, она сортирует любые числа) сделала odd-even transposition sort стандартным учебным примером сортирующей сети, а не просто ещё одним вариантом bubble sort.',
        en: 'The method was invented by **A. Nico Habermann** in 1972 as one of the earliest sorting schemes designed for parallel computing systems (networks of transputer-like processors). It\'s the rigorous provability via the zero-one principle (if a comparator network correctly sorts every sequence of zeros and ones, it sorts any numbers) that made odd-even transposition sort a standard teaching example of a sorting network, not just another bubble sort variant.',
      },
      {
        ru: 'Итог: чётно-нечётная сортировка - не более быстрый bubble sort в обычном смысле, а его переформулировка под другую вычислительную модель. На одном ядре она выигрывает лишь константу (в 1.5-2 раза меньше проходов, как показано выше), но при наличии параллельного оборудования переходит из класса `O(n²)` в класс `O(n)` - смена, недоступная простому bubble sort ни при какой оптимизации на одном потоке.',
        en: 'The takeaway: odd-even sort isn\'t a faster bubble sort in the ordinary sense - it\'s a reformulation for a different computational model. On a single core it only wins a constant factor (1.5-2x fewer passes, as shown above), but given parallel hardware it moves from the `O(n²)` class to the `O(n)` class - a shift plain bubble sort can\'t achieve no matter how it\'s optimized on a single thread.',
      },
    ],
    whenToUse: [
      {
        ru: '**Против обычного bubble sort на одном ядре** - тот же квадратичный класс сложности, но измеримо меньше проходов (6 вместо 8 на развороте из 9 элементов); разумная замена, если код и так был написан как bubble sort.',
        en: '**Against plain bubble sort on a single core** - the same quadratic complexity class, but measurably fewer passes (6 instead of 8 on a 9-element reversal); a reasonable swap-in if the code was already written as bubble sort.',
      },
      {
        ru: '**Против cocktail shaker sort** - оба устраняют часть слабости bubble sort, но разными средствами: shaker sort меняет направление прохода, оставаясь строго последовательным, тогда как odd-even sort разбивает проход на независимые фазы, жертвуя простотой ради параллелизуемости.',
        en: '**Against cocktail shaker sort** - both address part of bubble sort\'s weakness, but by different means: shaker sort reverses pass direction while staying strictly sequential, whereas odd-even sort splits a pass into independent phases, trading simplicity for parallelizability.',
      },
      {
        ru: '**На параллельном или SIMD/GPU оборудовании с n/2 доступными потоками** - именно здесь алгоритм переходит в класс `O(n)`; без такого оборудования этот выигрыш недостижим, и выбор сводится к константному ускорению на одном ядре.',
        en: '**On parallel or SIMD/GPU hardware with n/2 available threads** - this is where the algorithm moves into the `O(n)` class; without such hardware this win is unreachable, and the choice comes down to a constant-factor speed-up on a single core.',
      },
      {
        ru: '**Не выбирать для больших последовательных массивов без параллельного оборудования** - при отсутствии параллелизма выигрыш ограничен вдвое-втрое меньшим числом проходов, а не сменой асимптотического класса; для реального ускорения на одном ядре подойдут quick sort, merge sort или даже comb sort.',
        en: '**Don\'t pick it for large sequential arrays without parallel hardware** - without parallelism the win is capped at roughly 2-3x fewer passes, not a change of asymptotic class; for a real single-core speed-up, use quick sort, merge sort, or even comb sort.',
      },
    ],
    realWorld: [
      {
        ru: '**Работа А. Наума Хабермана (1972)** - первое описание чётно-нечётной сортировки как схемы для параллельных многопроцессорных систем, задолго до появления современных GPU и SIMD-инструкций.',
        en: '**A. Nico Habermann\'s 1972 work** - the first description of odd-even transposition sort as a scheme for parallel multiprocessor systems, long before modern GPUs and SIMD instructions existed.',
      },
      {
        ru: '**Принцип 0-1 (zero-one principle) Кнута** из третьего тома «Искусства программирования» - стандартный инструмент доказательства корректности сортирующих сетей, включая odd-even transposition network, без перебора всех возможных перестановок.',
        en: '**Knuth\'s zero-one principle**, from volume 3 of "The Art of Computer Programming" - the standard tool for proving sorting-network correctness, including the odd-even transposition network, without enumerating every possible permutation.',
      },
      {
        ru: '**Аппаратные сортирующие сети в FPGA и ASIC** используют регулярную, независимую по фазам структуру odd-even transposition sort как основу для схем компараторов с предсказуемой топологией межсоединений.',
        en: '**Hardware sorting networks in FPGAs and ASICs** use the regular, phase-independent structure of odd-even transposition sort as a basis for comparator circuits with predictable interconnect topology.',
      },
      {
        ru: '**Учебные курсы по параллельным алгоритмам** (например, в рамках PRAM-модели) неизменно берут odd-even transposition sort как первый пример перехода от последовательного алгоритма к параллельному через разбиение зависимостей на независимые группы.',
        en: '**Parallel algorithms courses** (e.g. under the PRAM model) consistently use odd-even transposition sort as the first example of turning a sequential algorithm into a parallel one by splitting dependencies into independent groups.',
      },
    ],
  },

  relatedAlgorithms: ['bubble-sort', 'cocktail-shaker-sort'],

  quiz: [
    {
      question: {
        ru: 'Какие пары индексов сравниваются на «нечётной» фазе?',
        en: 'Which index pairs are compared during the "odd" phase?',
      },
      options: [
        { ru: '(1,2), (3,4), (5,6) и так далее', en: '(1,2), (3,4), (5,6), and so on' },
        { ru: '(0,1), (2,3), (4,5) и так далее', en: '(0,1), (2,3), (4,5), and so on' },
        { ru: 'Все возможные пары сразу', en: 'All possible pairs at once' },
        { ru: 'Только пара (0, n-1)', en: 'Only the pair (0, n-1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Нечётная фаза начинается с индекса 1 и сравнивает соседние пары, не пересекаясь по индексам, что позволяет выполнять их одновременно.',
        en: 'The odd phase starts at index 1 and compares neighboring pairs that never share an index, which is what allows them to run simultaneously.',
      },
      hint: {
        ru: 'Смотрите шаг «Нечётная фаза» на вкладке «Визуализация» и строку 8 (`for (let i = 1; ...)`) функции `oddEvenSort` на вкладке «Реализация».',
        en: 'See the "Odd phase" step on the "Visualization" tab and line 8 (`for (let i = 1; ...)`) of `oddEvenSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему сравнения внутри одной фазы можно выполнять параллельно?',
        en: 'Why can comparisons within a single phase run in parallel?',
      },
      options: [
        {
          ru: 'Ни один индекс не участвует в двух парах одновременно внутри одной фазы',
          en: 'No index participates in two pairs at once within a single phase',
        },
        { ru: 'Потому что массив уже почти отсортирован, как это часто предполагается перед последним проходом', en: 'Because the array is already nearly sorted, as is commonly assumed right before the very last pass of the algorithm' },
        { ru: 'Потому что используется случайный выбор пар на каждой итерации, как в рандомизированной сортировке', en: 'Because pairs are chosen randomly on every iteration, as in a randomized sort' },
        { ru: 'Параллельность здесь невозможна в принципе, так как сравнения всегда зависят друг от друга', en: 'Parallelism isn\'t actually possible here, since comparisons always depend on one another' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отсутствие пересечения по индексам - ключевое свойство, которое устраняет зависимости между сравнениями внутри фазы.',
        en: 'The lack of overlapping indices is the key property that removes dependencies between comparisons within a phase.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» (принцип 0-1 и оценка O(1) на фазу).',
        en: 'See the fifth paragraph of the "How it works" section on the "Intent" tab (the zero-one principle and the O(1)-per-phase claim).',
      },
    },
    {
      question: {
        ru: 'Когда чётно-нечётная сортировка останавливается?',
        en: 'When does odd-even sort stop?',
      },
      options: [
        {
          ru: 'Когда полный проход (обе фазы) не произвёл ни одной перестановки',
          en: 'When a full pass (both phases) produces no swaps',
        },
        { ru: 'После ровно n/2 проходов, независимо от того, как расположены элементы', en: 'After exactly n/2 passes, regardless of how the elements are arranged' },
        { ru: 'Когда встречается первый уже отсортированный элемент где-то в середине массива', en: 'When the first already-sorted element is found somewhere in the middle of the array' },
        { ru: 'Никогда - алгоритм не имеет условия остановки и должен прерываться извне', en: 'Never - the algorithm has no stopping condition and must be interrupted externally' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и в bubble sort, отсутствие перестановок на полном проходе - надёжный признак того, что массив отсортирован.',
        en: 'As in bubble sort, no swaps during a full pass is a reliable sign the array is sorted.',
      },
      hint: {
        ru: 'Смотрите шаг «Остановиться» на вкладке «Визуализация» и строки 9-12/15-18 (`sorted = false`) функции `oddEvenSort` на вкладке «Реализация».',
        en: 'See the "Stop" step on the "Visualization" tab and lines 9-12/15-18 (`sorted = false`) of `oddEvenSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность чётно-нечётной сортировки при обычном последовательном выполнении?',
        en: 'What is the time complexity of odd-even sort under ordinary sequential execution?',
      },
      options: [
        { ru: 'O(n²), как у обычной пузырьковой сортировки', en: 'O(n²), same as plain bubble sort' },
        { ru: 'O(n log n), как у merge sort благодаря чередованию фаз', en: 'O(n log n), same as merge sort thanks to the alternating phases' },
        { ru: 'O(n), благодаря параллельности, доступной даже на одном ядре', en: 'O(n), thanks to the parallelism, even available on a single core' },
        { ru: 'O(log n), поскольку число фаз растёт логарифмически', en: 'O(log n), since the number of phases grows logarithmically' },
      ],
      correct: 0,
      explanation: {
        ru: 'Параллельность снижает сложность только при наличии реального параллельного оборудования; на одном ядре число операций остаётся квадратичным.',
        en: 'The parallelism only reduces complexity given real parallel hardware; on a single core, the operation count stays quadratic.',
      },
      hint: {
        ru: 'Смотрите бейдж «Средний» вверху страницы и четвёртый абзац раздела «Как это работает» на вкладке «Суть» (последовательная сложность остаётся O(n²)).',
        en: 'See the "Average" complexity badge at the top of the page and the fourth paragraph of the "How it works" section on the "Intent" tab (sequential complexity stays O(n²)).',
      },
    },
    {
      question: {
        ru: 'В какой области чётно-нечётная сортировка находит наибольшее практическое применение?',
        en: 'Where does odd-even sort find its greatest practical use?',
      },
      options: [
        {
          ru: 'В сортирующих сетях и параллельных/аппаратных архитектурах',
          en: 'In sorting networks and parallel/hardware architectures',
        },
        { ru: 'В сортировке больших текстовых файлов на диске, где важна последовательность операций', en: 'In sorting large text files on disk, where sequential operation order matters' },
        { ru: 'В базах данных с одним потоком выполнения и без параллельных операций', en: 'In single-threaded databases with no parallel operations' },
        { ru: 'В сжатии видео, где нужна быстрая последовательная обработка кадров', en: 'In video compression, where fast sequential frame processing is needed' },
      ],
      correct: 0,
      explanation: {
        ru: 'Регулярная, независимая структура сравнений именно то, что нужно для эффективной аппаратной или SIMD-реализации.',
        en: 'The regular, independent comparison structure is exactly what an efficient hardware or SIMD implementation needs.',
      },
      hint: {
        ru: 'Смотрите третий пункт раздела «Нюансы выбора» (углублённого, на вкладке «Суть») и последний пункт раздела «Примеры в коде» там же (аппаратные сортирующие сети).',
        en: 'See the third item in the extended "Nuances of choice" section on the "Intent" tab and the last item in the "Real-world" section there (hardware sorting networks).',
      },
    },
    {
      question: {
        ru: 'Является ли чётно-нечётная сортировка устойчивой (stable)?',
        en: 'Is odd-even sort stable?',
      },
      options: [
        { ru: 'Да: сравниваются лишь соседние элементы, обмен только при строгом неравенстве', en: 'Yes, it is stable because only adjacent elements are compared and a swap only occurs on strict inequality' },
        { ru: 'Нет, обмены на нечётной фазе всегда нарушают относительный порядок равных элементов', en: 'No, odd-phase swaps always break the relative order of equal elements' },
        { ru: 'Только если массив не содержит дубликатов', en: 'Only if the array contains no duplicate values' },
        { ru: 'Устойчивость зависит от конкретного компилятора, а не от самого алгоритма', en: 'Stability depends on the specific compiler, not on the algorithm itself regardless of input size, distribution, or order' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и bubble sort, чётно-нечётная сортировка сравнивает только соседние элементы и меняет их только при строгом неравенстве, не нарушая порядок равных элементов.',
        en: 'Like bubble sort, odd-even sort compares only adjacent elements and swaps them only on strict inequality, leaving the order of equal elements intact.',
      },
      hint: {
        ru: 'Смотрите тег `stable` рядом с названием алгоритма вверху страницы и строки 9/15 (`if (a[i] > a[i + 1])`) функции `oddEvenSort` на вкладке «Реализация».',
        en: 'See the `stable` tag next to the algorithm name at the top of the page and lines 9/15 (`if (a[i] > a[i + 1])`) of `oddEvenSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Чем чётно-нечётная сортировка отличается от коктейльной (cocktail shaker sort)?',
        en: 'How does odd-even sort differ from cocktail shaker sort?',
      },
      options: [
        { ru: 'Odd-even sort чередует нечётные и чётные фазы, cocktail sort - прямые и обратные проходы', en: 'Odd-even sort alternates odd and even phases; cocktail sort alternates forward and backward passes' },
        { ru: 'Cocktail sort параллелизуем, а odd-even sort - нет, и это их главное практическое различие', en: 'Cocktail sort is parallelizable while odd-even sort is not - that\'s their main practical difference' },
        { ru: 'Они полностью идентичны и являются просто разными названиями одного и того же алгоритма', en: 'They are completely identical and are simply two names for the exact same algorithm' },
        { ru: 'Cocktail sort сортирует за O(n log n), тогда как odd-even sort всегда работает за O(n²)', en: 'Cocktail sort sorts in O(n log n) while odd-even sort always runs in O(n²)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба улучшают bubble sort, но по-разному: odd-even sort разбивает проход на независимые фазы, а cocktail sort устраняет «черепах» двунаправленными проходами.',
        en: 'Both improve on bubble sort, but differently: odd-even sort splits a pass into independent phases, while cocktail sort addresses turtles via bidirectional passes.',
      },
      hint: {
        ru: 'Смотрите второй пункт раздела «Нюансы выбора» (углублённого, на вкладке «Суть») и раздел «Похожие алгоритмы» внизу страницы.',
        en: 'See the second item in the extended "Nuances of choice" section on the "Intent" tab and the "Related algorithms" section at the bottom of the page.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность чётно-нечётной сортировки при параллельном выполнении с n/2 процессорами?',
        en: 'What is the time complexity of odd-even sort with n/2 processors running in parallel?',
      },
      options: [
        { ru: 'O(n) - каждая фаза выполняется за O(1) параллельного времени, проходов O(n)', en: 'O(n) - each phase runs in O(1) parallel time, and there are O(n) passes' },
        { ru: 'O(n log n) - параллельность снижает сложность, но не до линейной', en: 'O(n log n) - parallelism reduces complexity but not to linear' },
        { ru: 'O(n²) - параллельность не меняет асимптотику даже при неограниченном числе процессоров', en: 'O(n²) - parallelism doesn\'t change asymptotics even with unlimited processors' },
        { ru: 'O(log n) - число фаз логарифмически зависит от n при параллельном исполнении', en: 'O(log n) - the number of phases depends logarithmically on n under parallel execution' },
      ],
      correct: 0,
      explanation: {
        ru: 'С n/2 процессорами каждая фаза занимает O(1) параллельного времени, но потребуется до O(n) проходов, что даёт O(n) суммарно.',
        en: 'With n/2 processors each phase takes O(1) parallel time, but up to O(n) passes may be needed, giving O(n) total.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» (O(1) на фазу, O(n) проходов по принципу 0-1).',
        en: 'See the fifth paragraph of the "How it works" section on the "Intent" tab (O(1) per phase, O(n) passes via the zero-one principle).',
      },
    },
    {
      question: {
        ru: 'Какие пары индексов сравниваются на «чётной» фазе?',
        en: 'Which index pairs are compared during the "even" phase?',
      },
      options: [
        { ru: '(0,1), (2,3), (4,5) и так далее', en: '(0,1), (2,3), (4,5), and so on' },
        { ru: '(1,2), (3,4), (5,6) и так далее', en: '(1,2), (3,4), (5,6), and so on' },
        { ru: '(0,2), (1,3), (4,6) и так далее - пары с шагом 2', en: '(0,2), (1,3), (4,6), and so on - pairs with a step of 2' },
        { ru: 'Только пары с чётными значениями элементов', en: 'Only pairs where element values are even' },
      ],
      correct: 0,
      explanation: {
        ru: 'Чётная фаза начинается с индекса 0 и сравнивает пары (0,1), (2,3), (4,5)... - они не пересекаются с нечётными парами и также могут выполняться параллельно.',
        en: 'The even phase starts at index 0 and compares pairs (0,1), (2,3), (4,5)... - they do not overlap with odd pairs and can also run in parallel.',
      },
      hint: {
        ru: 'Смотрите шаг «Чётная фаза» на вкладке «Визуализация» и строку 14 (`for (let i = 0; ...)`) функции `oddEvenSort` на вкладке «Реализация».',
        en: 'See the "Even phase" step on the "Visualization" tab and line 14 (`for (let i = 0; ...)`) of `oddEvenSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему чётно-нечётную сортировку называют «brick sort» («кирпичная сортировка»)?',
        en: 'Why is odd-even sort also called "brick sort"?',
      },
      options: [
        { ru: 'Схема сравнений напоминает кирпичную кладку: ряды нечётной и чётной фаз смещены', en: 'The comparison pattern resembles a brick wall: even and odd rows are offset from each other' },
        { ru: 'Алгоритм был изобретён строителями для сортировки кирпичей по размеру на заводе', en: 'The algorithm was invented by construction workers specifically for sorting bricks by size at a factory' },
        { ru: 'Каждый элемент перемещается ровно на одну позицию за проход, как укладка кирпичей', en: 'Each element moves exactly one position per pass, like laying bricks one by one' },
        { ru: 'Название произошло от аббревиатуры, не связанной с внешним видом алгоритма', en: 'The name comes from an acronym unrelated to the visual appearance of the algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если нарисовать пары сравнений, нечётные и чётные фазы чередуются со смещением, образуя узор, похожий на кирпичную кладку со сдвинутыми рядами.',
        en: 'If you draw the comparison pairs, odd and even phases alternate with an offset, forming a pattern resembling a brick wall with shifted rows.',
      },
      hint: {
        ru: 'Смотрите вступительный абзац (intent) в самом начале вкладки «Суть», где упомянуто альтернативное название «brick sort».',
        en: 'See the opening (intent) paragraph at the very top of the "Intent" tab, where the alternative name "brick sort" is mentioned.',
      },
    },
  ],
};

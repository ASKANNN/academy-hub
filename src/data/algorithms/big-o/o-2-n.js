export const o2N = {
  slug: 'o-2-n',
  category: 'big-o',
  name: { ru: 'O(2ⁿ) - Экспоненциальная Сложность', en: 'O(2^n) - Exponential Time' },
  complexity: {
    time: { best: 'O(2ⁿ)', average: 'O(2ⁿ)', worst: 'O(2ⁿ)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['exponential', 'recursion-tree', 'brute-force'],
  tier: 'catastrophic',

  intent: {
    ru: 'O(2ⁿ) - это когда каждый новый элемент на входе удваивает объём работы. Один дополнительный элемент - вдвое больше шагов, два дополнительных - вчетверо больше. Это класс сложности, за которым обычно стоит наивный перебор: код, который на каждом шаге ветвится на два варианта и исследует оба, вместо того чтобы переиспользовать уже посчитанное.',
    en: 'O(2^n) describes work that doubles with every additional element in the input. One extra element means twice the steps, two extra elements mean four times the steps. It is the complexity class behind naive brute-force code: work that branches into two options at every step and explores both, instead of reusing what has already been computed.',
  },

  problem: {
    ru: 'Рекурсивные решения «в лоб» выглядят обманчиво просто: код короткий, логика прямая, тесты на маленьких данных проходят мгновенно. Проблема всплывает не на этапе написания, а на этапе роста входа - `n = 20` отрабатывает за долю секунды, `n = 40` уже висит минутами, а `n = 60` не досчитается никогда. Без понимания того, что за красивой рекурсией прячется дерево вызовов, растущее вдвое на каждом уровне, легко зафиксировать баг производительности, который проявится только в проде, на реальных данных.',
    en: 'Naive recursive solutions look deceptively simple: the code is short, the logic is direct, and tests on small inputs finish instantly. The problem does not show up while writing the code, it shows up as the input grows - `n = 20` finishes in a fraction of a second, `n = 40` already hangs for minutes, and `n = 60` never finishes at all. Without recognizing that a clean-looking recursion hides a call tree doubling in size at every level, it is easy to ship a performance bug that only surfaces later in production, on real data.',
  },

  solution: {
    ru: 'Операция попадает в O(2ⁿ), если на каждом из `n` шагов решение **разветвляется на два независимых вызова**, и оба вызова затем сами продолжают ветвиться так же. Узнать такой код можно по форме: **рекурсивная функция, вызывающая саму себя дважды** внутри одного вызова, без переиспользования результатов уже пройденных веток. Классический пример - наивное вычисление чисел Фибоначчи: `fib(n)` вызывает `fib(n - 1)` и `fib(n - 2)`, каждый из которых снова разветвляется надвое, и так до самого основания рекурсии.',
    en: 'An operation lands in O(2^n) when at each of the `n` steps the solution **branches into two independent calls**, and both of those calls keep branching the same way. The tell is structural: a **recursive function that calls itself twice** inside one invocation, with no reuse of results from branches already explored. The classic example is naive Fibonacci: `fib(n)` calls `fib(n - 1)` and `fib(n - 2)`, each of which branches into two again, all the way down to the base of the recursion.',
  },

  steps: [
    {
      title: { ru: 'Каждый шаг удваивает работу', en: 'Every step doubles the work' },
      explanation: {
        ru: 'При `n = 1` дерево вызовов почти пустое. При `n = 2` оно уже вдвое шире. Прирост одного элемента на входе умножает объём работы на постоянный множитель, а не добавляет к нему фиксированную порцию, как у O(n).',
        en: 'At `n = 1` the call tree is almost empty. At `n = 2` it is already twice as wide. Adding one element to the input multiplies the amount of work by a constant factor, instead of adding a fixed chunk to it the way O(n) does.',
      },
    },
    {
      title: { ru: 'От единиц - к миллионам за десяток шагов', en: 'From single digits to millions in a dozen steps' },
      explanation: {
        ru: 'На `n = 10` дерево вызовов - это около тысячи узлов, ещё терпимо. На `n = 20` - уже больше миллиона. Кривая почти прижата к оси на маленьких `n` и взлетает почти вертикально, как только `n` переваливает за десяток-другой.',
        en: 'At `n = 10` the call tree has roughly a thousand nodes, still tolerable. At `n = 20` it already exceeds a million. The curve hugs the axis for small `n` and then shoots almost straight up once `n` crosses into the low twenties.',
      },
    },
    {
      title: { ru: 'Пример: наивный fib(n)', en: 'Example: naive fib(n)' },
      explanation: {
        ru: 'Самый частый источник O(2ⁿ) - рекурсия без памяти о уже решённых подзадачах: `fib(n) = fib(n - 1) + fib(n - 2)` пересчитывает одни и те же меньшие числа Фибоначчи снова и снова, вместо того чтобы один раз сохранить результат.',
        en: 'The typical source of O(2^n) is recursion with no memory of subproblems already solved: `fib(n) = fib(n - 1) + fib(n - 2)` recomputes the same smaller Fibonacci numbers over and over, instead of storing the result once.',
      },
    },
    {
      title: { ru: 'n = 8: дерево уже заметно шире', en: 'n = 8: the tree is visibly wider already' },
      explanation: {
        ru: 'К `n = 8` дерево вызовов `fib` содержит уже больше 60 узлов - и это только начало. У O(n) на этом же `n` было бы всего 8 шагов.',
        en: 'By `n = 8` the call tree for `fib` already has more than 60 nodes, and that is just the start. O(n) would still be at only 8 steps for the same `n`.',
      },
    },
    {
      title: { ru: 'Рядом с O(n³)', en: 'Next to O(n^3)' },
      explanation: {
        ru: 'К `n = 10` линия O(n³) стоит на отметке 1000, а линия O(2ⁿ) - уже на 1024, почти вровень. Но к `n = 30` O(n³) даст 27 000, а O(2ⁿ) - больше миллиарда: разрыв, который на маленьких `n` незаметен, взрывается за считаные шаги.',
        en: 'By `n = 10` the O(n^3) line sits at 1000 while the O(2^n) line is already at 1024, almost level. But by `n = 30` O(n^3) gives 27,000 while O(2^n) gives over a billion: a gap invisible at small n that explodes within a handful of extra steps.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
    python: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`fib` принимает индекс `n` и возвращает n-е число Фибоначчи. Никакой памяти о предыдущих вызовах не заводится.',
          en: '`fib` takes an index `n` and returns the nth Fibonacci number. No memory of earlier calls is kept anywhere.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: '`n <= 1` останавливает рекурсию: `fib(0)` и `fib(1)` возвращают сами себя без дальнейших вызовов. Это дно дерева вызовов.',
          en: '`n <= 1` stops the recursion: `fib(0)` and `fib(1)` return themselves with no further calls. This is the bottom of the call tree.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Двойное ветвление - ядро O(2ⁿ)', en: 'The double branch - the core of O(2^n)' },
        explanation: {
          ru: '`fib(n - 1) + fib(n - 2)` - один вызов порождает два новых. Оба независимо повторяют то же самое ветвление, и `fib(n - 2)` частично пересчитывает то, что уже посчитано внутри `fib(n - 1)`.',
          en: '`fib(n - 1) + fib(n - 2)` - one call spawns two new ones. Both independently repeat the same branching, and `fib(n - 2)` partially recomputes work that already happened inside `fib(n - 1)`.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`fib` принимает `n` - тот же контракт, что и в JS-версии, без какого-либо кеша между вызовами.',
          en: '`fib` takes `n`, matching the JS version\'s contract exactly, with no cache shared between calls.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Базовый случай', en: 'Base case' },
        explanation: {
          ru: '`if n <= 1: return n` - та же остановка рекурсии, что в JS: `fib(0)` и `fib(1)` не порождают новых вызовов.',
          en: '`if n <= 1: return n` is the same recursion stop as in JS: `fib(0)` and `fib(1)` spawn no further calls.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Двойное ветвление - ядро O(2ⁿ)', en: 'The double branch - the core of O(2^n)' },
        explanation: {
          ru: '`fib(n - 1) + fib(n - 2)` работает так же, как в JS: каждый вызов без памяти о прошлом заново разворачивает оба поддерева.',
          en: '`fib(n - 1) + fib(n - 2)` works exactly like the JS version: every call, with no memory of the past, unfolds both subtrees from scratch.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Код почти всегда самый короткий и самый прямой из всех возможных: рекурсия дословно повторяет математическое определение задачи, без дополнительных структур данных.',
      en: 'The code is almost always the shortest and most direct option available: the recursion mirrors the mathematical definition of the problem word for word, with no extra data structures.',
    },
    {
      ru: 'Не требует придумывать порядок обхода подзадач заранее - рекурсия сама выстраивает нужную последовательность вызовов.',
      en: 'Requires no upfront thinking about the order subproblems should be visited in - the recursion builds the right call sequence on its own.',
    },
    {
      ru: 'На действительно маленьком `n` (до 20-25) разница со сложными оптимизированными решениями практически не ощущается на глаз.',
      en: 'On a genuinely small `n` (up to 20-25) the difference from a heavily optimized solution is practically invisible.',
    },
  ],
  cons: [
    {
      ru: 'Взрывной рост делает алгоритм непригодным уже за пределами `n ≈ 40`: время работы уходит в часы и дни без единого изменения в самих данных, только за счёт роста `n`.',
      en: 'Explosive growth makes the algorithm unusable past roughly `n = 40`: runtime jumps into hours and days with no change to the data itself, purely from the growth of `n`.',
    },
    {
      ru: 'Почти всегда прячет за собой **повторяющиеся подзадачи** - одни и те же меньшие вызовы считаются заново десятки и сотни раз, хотя ответ на них не меняется.',
      en: 'Almost always hides **overlapping subproblems** underneath - the same smaller calls get recomputed dozens or hundreds of times even though their answer never changes.',
    },
    {
      ru: 'Расход памяти на стек вызовов растёт вместе с глубиной рекурсии - на глубоких деревьях легко получить переполнение стека ещё до того, как истечёт время.',
      en: 'Call-stack memory grows with recursion depth - on deep trees a stack overflow can happen before the time budget even runs out.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда `n` гарантированно маленькое (до 20-25) и задача не встречает эффективного решения - переборный код проще написать, проверить и объяснить, чем оптимизировать раньше времени.',
      en: 'When `n` is guaranteed small (up to 20-25) and the problem has no efficient known solution - brute-force code is simpler to write, verify, and explain than optimizing prematurely.',
    },
    {
      ru: 'На этапе прототипа, чтобы получить заведомо правильный ответ и только потом решать, нужна ли оптимизация - и есть ли она вообще для этой задачи.',
      en: 'At the prototyping stage, to get a provably correct answer first and only then decide whether optimization is needed - and whether one even exists for this problem.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Наивная рекурсия Фибоначчи** - учебный, но реальный пример: та же формула без мемоизации превращает O(n) в O(2ⁿ) буквально одной пропущенной оптимизацией.',
      en: '**Naive Fibonacci recursion** - a textbook but genuine example: the same formula without memoization turns O(n) into O(2^n) from a single missing optimization.',
    },
    {
      ru: '**Перебор всех подмножеств множества** - у множества из `n` элементов ровно `2ⁿ` подмножеств, и любой код, честно перебирающий их все, обязан быть O(2ⁿ).',
      en: '**Enumerating all subsets of a set** - a set of `n` elements has exactly `2^n` subsets, and any code that honestly walks through all of them is necessarily O(2^n).',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Формально O(2ⁿ) означает, что объём работы **умножается на постоянный множитель** при добавлении каждого нового элемента, а не увеличивается на фиксированную порцию, как у O(n) или O(n²). Для `fib(n)` этот множитель - двойка: каждый вызов без базового случая порождает ровно два новых. Строгая асимптотика Фибоначчи чуть точнее - около `1.618ⁿ` (золотое сечение), но её всё равно относят к экспоненциальному классу `O(cⁿ)` при `c > 1`, и O(2ⁿ) - удобная и корректная верхняя оценка сверху.',
        en: 'Formally, O(2^n) means the amount of work **gets multiplied by a constant factor** with each new element added, instead of growing by a fixed chunk the way O(n) or O(n^2) do. For `fib(n)` that factor is two: every call without a base case spawns exactly two new ones. The tight asymptotic for Fibonacci is actually closer to `1.618^n` (the golden ratio), but it still belongs to the exponential class `O(c^n)` for `c > 1`, and O(2^n) is a convenient and valid upper bound on it.',
      },
      {
        ru: 'Числа делают разрыв нагляднее любых слов. `fib(10)` наивно - это около 177 вызовов функции, вполне терпимо. `fib(30)` - уже почти 2.7 миллиона вызовов. `fib(40)` - больше 330 миллионов, и на обычном ноутбуке это уже секунды-десятки секунд заметного ожидания там, где мемоизированная версия отработала бы за микросекунды.',
        en: 'Concrete numbers make the gap clearer than any description. Naive `fib(10)` makes about 177 function calls, entirely tolerable. `fib(30)` already makes nearly 2.7 million calls. `fib(40)` makes over 330 million, and on an ordinary laptop that is already seconds to tens of seconds of visible waiting, where a memoized version would finish in microseconds.',
      },
      {
        ru: 'Причина взрыва - **перекрывающиеся подзадачи**: `fib(5)` вызывает `fib(4)` и `fib(3)`, но `fib(4)` сам внутри себя снова вызывает `fib(3)`. Уже на глубине в два уровня один и тот же `fib(3)` считается дважды, а на больших `n` - тысячи и миллионы раз. Именно эта избыточность и есть мост к динамическому программированию: если запоминать результат каждого `fib(k)` при первом вычислении, повторные вызовы превращаются в мгновенный поиск по таблице, и O(2ⁿ) сжимается до O(n).',
        en: 'The reason for the explosion is **overlapping subproblems**: `fib(5)` calls `fib(4)` and `fib(3)`, but `fib(4)` itself calls `fib(3)` again internally. Already at two levels of depth, the same `fib(3)` gets computed twice, and for larger `n` it gets computed thousands or millions of times. This exact redundancy is the bridge to dynamic programming: if the result of each `fib(k)` is stored the first time it is computed, repeated calls turn into an instant table lookup, and O(2^n) collapses down to O(n).',
      },
      {
        ru: 'Сравнение с полиномиальным ростом показывает, где именно проходит граница практической применимости. При `n = 100` кубический алгоритм O(n³) делает миллион шагов - для современного компьютера это доли секунды. Экспоненциальный при том же `n = 100` требует `2¹⁰⁰` шагов - число из 31 цифры, на много порядков больше, чем количество атомов на Земле. Никакой рост мощности компьютеров не сокращает этот разрыв - он растёт вместе с `n` быстрее, чем любое линейное ускорение железа.',
        en: 'A comparison with polynomial growth shows exactly where the boundary of practical usability lies. At `n = 100`, a cubic O(n^3) algorithm takes a million steps, a fraction of a second on a modern machine. An exponential algorithm at the same `n = 100` requires `2^100` steps, a 31-digit number, many orders of magnitude larger than the number of atoms on Earth. No amount of hardware improvement closes that gap - it grows with `n` faster than any linear speedup in hardware ever could.',
      },
      {
        ru: 'Экспоненциальный рост не всегда - признак плохого кода: у некоторых задач он неустраним в принципе. Перебор всех подмножеств множества из `n` элементов честно требует `2ⁿ` шагов, потому что подмножеств ровно столько - меньше просмотреть и остаться корректным нельзя. Такие задачи (в том числе многие NP-полные) не решаются полиномиально никаким известным на сегодня алгоритмом, и экспоненциальный перебор там - не ошибка, а осознанный выбор при небольшом `n`.',
        en: 'Exponential growth is not always a sign of bad code - for some problems it is unavoidable in principle. Enumerating every subset of an n-element set genuinely requires `2^n` steps, because that is exactly how many subsets exist - visiting fewer while staying correct is not possible. Such problems (including many NP-complete ones) have no known polynomial-time algorithm today, and exponential brute force there is not a mistake, it is a deliberate choice for small `n`.',
      },
      {
        ru: '**Бэктрекинг с отсечением веток** (branch and bound) - практический способ мириться с экспоненциальным потолком: формальная верхняя оценка остаётся O(2ⁿ), но если алгоритм рано распознаёт заведомо бесперспективные ветки и не спускается в них, реальное время на конкретных входных данных может оказаться в тысячи раз меньше худшего случая, даже когда сама Big O-оценка не меняется.',
        en: '**Backtracking with pruning** (branch and bound) is the practical way to live with an exponential ceiling: the formal upper bound stays O(2^n), but if the algorithm recognizes hopeless branches early and never descends into them, the real runtime on specific inputs can end up thousands of times smaller than the worst case, even though the Big O bound itself does not change.',
      },
    ],
    whenToUse: [
      {
        ru: '**Гарантированно малый `n`** - если по условию задачи `n` никогда не превысит 20-25, честный перебор проще, надёжнее и легче проверяется, чем сложная оптимизация ради выигрыша, который никто не заметит.',
        en: '**Guaranteed small `n`** - if the problem statement guarantees `n` never exceeds 20-25, honest brute force is simpler, more reliable, and easier to verify than a complex optimization for a gain nobody will notice.',
      },
      {
        ru: '**Против динамического программирования** - как только в рекурсии находятся повторяющиеся подзадачи (тот же `fib(3)`, посчитанный дважды), запоминание результатов сводит O(2ⁿ) к O(n) без потери корректности - это почти всегда более правильный выбор, чем мириться с экспонентой.',
        en: '**Against dynamic programming** - the moment overlapping subproblems appear in the recursion (the same `fib(3)` computed twice), memoizing results collapses O(2^n) down to O(n) with no loss of correctness - almost always the better choice over living with the exponential.',
      },
      {
        ru: '**Против O(n!)** - экспоненциальный класс `2ⁿ` растёт заметно медленнее факториального: на `n = 20` это 1 048 576 против 2.4 квинтиллиона у `n!`. Если задача сводится именно к перебору подмножеств, а не перестановок, `2ⁿ` - уже не худший из катастрофических вариантов.',
        en: '**Against O(n!)** - the exponential class `2^n` grows noticeably slower than factorial: at `n = 20` that is 1,048,576 versus 2.4 quintillion for `n!`. If the problem reduces to enumerating subsets rather than orderings, `2^n` is not the worst of the catastrophic options.',
      },
      {
        ru: '**Когда точный ответ обязателен** - приближённые эвристики для NP-полных задач существуют, но если нужен именно доказуемо оптимальный результат на небольшом входе, экспоненциальный перебор остаётся единственным честным способом его получить.',
        en: '**When an exact answer is required** - approximate heuristics exist for NP-complete problems, but if a provably optimal result is required on a small input, exponential enumeration remains the only honest way to get it.',
      },
    ],
    realWorld: [
      {
        ru: '**SAT-солверы** (проверка выполнимости булевых формул) - задача NP-полная, худший случай остаётся экспоненциальным, но промышленные решатели вроде MiniSat справляются с формулами из миллионов переменных за счёт эвристик отсечения, а не за счёт изменения самой Big O-границы.',
        en: '**SAT solvers** (boolean satisfiability checking) - an NP-complete problem whose worst case stays exponential, yet industrial solvers like MiniSat handle formulas with millions of variables through pruning heuristics, not by changing the underlying Big O bound.',
      },
      {
        ru: '**Алгоритм Хелда-Карпа для задачи коммивояжёра** - сводит перебор всех маршрутов от O(n!) к O(n² · 2ⁿ) через динамическое программирование по битовым маскам подмножеств: всё ещё экспоненциально, но на порядки практичнее прямого перебора перестановок.',
        en: '**The Held-Karp algorithm for the traveling salesman problem** - reduces route enumeration from O(n!) to O(n^2 * 2^n) via dynamic programming over subset bitmasks: still exponential, but orders of magnitude more practical than brute-forcing every permutation.',
      },
      {
        ru: '**Устойчивость криптографических ключей** - брутфорс AES-128 требует перебора `2¹²⁸` вариантов ключа. Каждый дополнительный бит длины ключа буквально удваивает пространство перебора - это тот же самый рост, что у наивного `fib`, только применённый намеренно как защита.',
        en: '**Cryptographic key strength** - brute-forcing AES-128 requires searching through `2^128` key variants. Every extra bit of key length literally doubles the search space, the same growth pattern as naive `fib`, applied deliberately as a defense.',
      },
      {
        ru: '**Перебор в задаче о рюкзаке (Knapsack)** - прямое решение проверяет все `2ⁿ` подмножеств предметов, чтобы найти лучшую комбинацию по весу и ценности; для дискретной версии с целыми весами существует более быстрое псевдополиномиальное решение через динамическое программирование, но общий случай остаётся NP-полным.',
        en: '**Brute-forcing the Knapsack problem** - a direct solution checks all `2^n` subsets of items to find the best combination of weight and value; for the discrete version with integer weights a faster pseudo-polynomial dynamic-programming solution exists, but the general case remains NP-complete.',
      },
    ],
  },

  relatedAlgorithms: ['o-n-3'],

  quiz: [
    {
      question: {
        ru: 'Как меняется объём работы у операции класса O(2ⁿ) при добавлении одного элемента к входу?',
        en: 'How does the amount of work in an O(2^n) operation change when one element is added to the input?',
      },
      options: [
        { ru: 'Умножается на постоянный множитель - работа удваивается', en: 'It gets multiplied by a constant factor - the work doubles' },
        { ru: 'Увеличивается на фиксированное число шагов, как и у линейной сложности', en: 'It increases by a fixed number of steps, the same way linear complexity does' },
        { ru: 'Растёт пропорционально квадрату нового размера входных данных', en: 'It grows proportionally to the square of the new input size' },
        { ru: 'Остаётся прежним, потому что один элемент не влияет на итог заметно', en: 'It stays the same, because one element does not noticeably affect the outcome' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это и есть определение экспоненциального роста: каждый новый элемент умножает работу на постоянный множитель, а не добавляет к ней фиксированную порцию.',
        en: 'That is the definition of exponential growth: every new element multiplies the work by a constant factor rather than adding a fixed chunk to it.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - там прямо описано удвоение работы на каждом шаге.',
        en: 'See the "Intent" tab - it directly describes the doubling of work at every step.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде почти всегда можно узнать O(2ⁿ)?',
        en: 'What code pattern almost always signals O(2^n)?',
      },
      options: [
        { ru: 'Рекурсивная функция вызывает саму себя дважды в одном вызове', en: 'A recursive function calls itself twice inside one invocation' },
        { ru: 'Один цикл без вложенности, проходящий по всем элементам один раз', en: 'A single, non-nested loop that walks every element exactly once' },
        { ru: 'Размер входа делится пополам на каждом шаге рекурсии', en: 'The input size gets cut in half on every step of the recursion' },
        { ru: 'Два независимых цикла, идущих один за другим, а не вложенных', en: 'Two independent loops running one after another, not nested' },
      ],
      correct: 0,
      explanation: {
        ru: 'Двойной вызов внутри рекурсии - ядро O(2ⁿ), именно это делает `fib(n - 1) + fib(n - 2)` на вкладке «Реализация».',
        en: 'A double call inside the recursion is the core of O(2^n), exactly what `fib(n - 1) + fib(n - 2)` does on the "Implementation" tab.',
      },
      hint: {
        ru: 'Смотрите строку 3 функции `fib` на вкладке «Реализация» и шаг «Двойное ветвление».',
        en: 'See line 3 of `fib` on the "Implementation" tab and its walkthrough step "The double branch".',
      },
    },
    {
      question: {
        ru: 'На графике: как выглядит линия O(2ⁿ) при небольших значениях n?',
        en: 'On the visualization chart: how does the O(2^n) line look at small values of n?',
      },
      options: [
        { ru: 'Почти прижата к оси, а затем резко взлетает почти вертикально', en: 'It hugs the axis closely, then shoots up almost vertically' },
        { ru: 'Идёт ровной диагональю от начала координат до самого конца', en: 'It rises as a steady diagonal from the origin all the way to the end' },
        { ru: 'Быстро поднимается вверх, а затем выполаживается почти до горизонтали', en: 'It rises quickly at first, then flattens out to nearly horizontal' },
        { ru: 'Остаётся горизонтальной линией на всём протяжении графика целиком', en: 'It stays a horizontal line across the entire length of the chart' },
      ],
      correct: 0,
      explanation: {
        ru: 'Экспоненциальный рост на графике выглядит почти плоским на малых n и почти вертикальным ближе к правому краю - это и есть форма кривой c^n.',
        en: 'Exponential growth on the chart looks almost flat for small n and nearly vertical near the right edge - that is exactly the shape of the c^n curve.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и сравните точку на графике при n = 2 и при n = 8.',
        en: 'Open the "Visualization" tab and compare the marker position at n = 2 and at n = 8.',
      },
    },
    {
      question: {
        ru: 'Почему наивный `fib(n)` пересчитывает одни и те же значения по нескольку раз?',
        en: 'Why does naive `fib(n)` recompute the same values multiple times?',
      },
      options: [
        { ru: 'Из-за перекрывающихся подзадач - fib(3) вызывается и из fib(4), и из fib(5)', en: 'Because of overlapping subproblems - fib(3) gets called both from fib(4) and from fib(5)' },
        { ru: 'Из-за ошибки в базовом случае, который никогда не останавливает рекурсию', en: 'Because of a bug in the base case that never actually stops the recursion' },
        { ru: 'Потому что JavaScript и Python не умеют кешировать результаты функций сами', en: 'Because JavaScript and Python are simply unable to cache function results on their own' },
        { ru: 'Потому что сложение fib(n - 1) и fib(n - 2) само по себе требует O(n) шагов', en: 'Because adding fib(n - 1) and fib(n - 2) together itself requires O(n) steps to complete' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждый вызов без памяти о прошлом заново разворачивает оба поддерева, и одни и те же меньшие числа Фибоначчи вычисляются повторно на разных ветках дерева.',
        en: 'Every call, with no memory of the past, unfolds both subtrees from scratch, so the same smaller Fibonacci numbers get computed again on different branches of the tree.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - про перекрывающиеся подзадачи.',
        en: 'See the third paragraph of the "Deep dive" section on the "Intent" tab - about overlapping subproblems.',
      },
    },
    {
      question: {
        ru: 'Что происходит с O(2ⁿ), если результаты подзадач начать сохранять (мемоизировать)?',
        en: 'What happens to O(2^n) once subproblem results start getting memoized?',
      },
      options: [
        { ru: 'Сложность падает до O(n), потому что каждое значение считается лишь один раз', en: 'Complexity drops to O(n), because each value only ever gets computed once' },
        { ru: 'Сложность остаётся прежней, потому что кеш всё равно занимает столько же памяти', en: 'Complexity stays the same, because the cache takes up just as much memory' },
        { ru: 'Сложность растёт до O(n²), потому что поиск в кеше сам по себе линеен', en: 'Complexity grows to O(n^2), because looking values up in the cache is itself linear' },
        { ru: 'Мемоизация не влияет на классы Big O, а лишь ускоряет константу c', en: 'Memoization does not affect Big O classes at all, it only speeds up the constant c' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если каждый fib(k) считается один раз и берётся из таблицы при повторном обращении, дерево вызовов сжимается до n уникальных вычислений - это и есть переход от O(2ⁿ) к O(n).',
        en: 'If each fib(k) is computed once and pulled from a table on repeated access, the call tree collapses to n unique computations - exactly the transition from O(2^n) to O(n).',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» - там объясняется мост к динамическому программированию.',
        en: 'See the third paragraph of the "Deep dive" section - it explains the bridge to dynamic programming.',
      },
    },
    {
      question: {
        ru: 'Почему рост O(2ⁿ) невозможно компенсировать более быстрым компьютером?',
        en: 'Why can O(2^n) growth not be compensated for with a faster computer?',
      },
      options: [
        { ru: 'Потому что разрыв с ростом n увеличивается быстрее любого линейного ускорения железа', en: 'Because the gap grows faster with n than any linear hardware speedup can keep up with' },
        { ru: 'Потому что современные процессоры физически не способны выполнять рекурсию', en: 'Because modern processors are physically incapable of executing recursive calls at all' },
        { ru: 'Потому что O(2ⁿ) всегда требует заведомо больше памяти, чем есть в любом существующем компьютере', en: 'Because O(2^n) always requires more memory than exists in any computer whatsoever' },
        { ru: 'На самом деле более быстрый компьютер полностью решает проблему роста O(2ⁿ)', en: 'A faster computer actually does fully solve the problem of O(2^n) growth' },
      ],
      correct: 0,
      explanation: {
        ru: 'Ускорение железа в k раз даёт лишь постоянный множитель, а O(2ⁿ) растёт умножением на каждом шаге n - через несколько десятков дополнительных элементов любое аппаратное ускорение будет съедено экспонентой.',
        en: 'A k-times hardware speedup only gives a constant factor, while O(2^n) grows by multiplication at every step of n - within a few dozen extra elements, any hardware speedup gets swallowed by the exponential.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» - про сравнение с O(n³) при n = 100.',
        en: 'See the fourth paragraph of the "Deep dive" section - about the comparison with O(n^3) at n = 100.',
      },
    },
    {
      question: {
        ru: 'Всегда ли O(2ⁿ) в коде означает ошибку или недосмотр программиста?',
        en: 'Does O(2^n) in code always mean a programmer mistake or oversight?',
      },
      options: [
        { ru: 'Нет - у некоторых задач, например перебора всех подмножеств, он неустраним в принципе', en: 'No - for some problems, like enumerating all subsets, it is unavoidable in principle' },
        { ru: 'Да - для любой задачи всегда существует полиномиальный алгоритм, который просто ещё не нашли', en: 'Yes - a polynomial algorithm always exists for every problem, it just has not been found yet' },
        { ru: 'Да - экспоненциальный рост появляется исключительно из-за забытой мемоизации', en: 'Yes - exponential growth only ever appears because of forgotten memoization' },
        { ru: 'Нет, но лишь потому, что современные компьютеры достаточно быстрые для любого n', en: 'No, but only because modern computers are fast enough to handle any value of n' },
      ],
      correct: 0,
      explanation: {
        ru: 'Перебор всех 2ⁿ подмножеств множества из n элементов честно требует 2ⁿ шагов - меньше и остаться корректным нельзя, это не ошибка, а свойство задачи.',
        en: 'Enumerating all 2^n subsets of an n-element set genuinely requires 2^n steps - fewer while staying correct is not possible, this is a property of the problem, not a bug.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» - про перебор подмножеств.',
        en: 'See the fifth paragraph of the "Deep dive" section on the "Intent" tab - about enumerating subsets.',
      },
    },
    {
      question: {
        ru: 'Что делает бэктрекинг с отсечением веток (branch and bound) для алгоритмов с O(2ⁿ)-границей?',
        en: 'What does backtracking with pruning (branch and bound) do for algorithms with an O(2^n) bound?',
      },
      options: [
        { ru: 'Не меняет формальную Big O-границу, но может резко сократить время на конкретных входах', en: 'It does not change the formal Big O bound, but can sharply cut runtime on specific inputs' },
        { ru: 'Снижает формальную границу с O(2ⁿ) до O(n log n) для любых входных данных без исключений', en: 'It lowers the formal bound from O(2^n) to O(n log n) for any input data without exception' },
        { ru: 'Полностью устраняет рекурсию, заменяя её единственным циклом без ветвлений', en: 'It fully eliminates recursion, replacing it with a single loop that has no branching at all' },
        { ru: 'Работает только для задач с чётным n и не даёт эффекта на нечётных значениях', en: 'It only works for problems with an even n and has no effect for odd values' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отсечение веток не меняет худший случай на бумаге, но на практике избегает спуска в заведомо бесперспективные ветки, что может дать выигрыш в тысячи раз без изменения самой Big O-оценки.',
        en: 'Pruning does not change the worst case on paper, but in practice it avoids descending into hopeless branches, which can yield a thousandfold speedup without changing the Big O bound itself.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» на вкладке «Суть» - про бэктрекинг.',
        en: 'See the closing paragraph of the "Deep dive" section on the "Intent" tab - about backtracking.',
      },
    },
    {
      question: {
        ru: 'При n = 20 что растёт быстрее - O(2ⁿ) или O(n!)?',
        en: 'At n = 20, which grows faster - O(2^n) or O(n!)?',
      },
      options: [
        { ru: 'O(n!) - при n = 20 это уже квинтиллионы против чуть больше миллиона у O(2ⁿ)', en: 'O(n!) - at n = 20 that is already quintillions versus just over a million for O(2^n)' },
        { ru: 'O(2ⁿ) - экспоненциальный рост при любом n всегда обгоняет факториальный', en: 'O(2^n) - exponential growth always overtakes factorial growth at any n' },
        { ru: 'Оба растут абсолютно одинаково, потому что относятся к одному катастрофическому классу', en: 'Both grow at exactly the same rate, because they belong to the same catastrophic class' },
        { ru: 'Это зависит от того, какой конкретно язык программирования используется для расчёта', en: 'It depends on which specific programming language is used to run the calculation' },
      ],
      correct: 0,
      explanation: {
        ru: 'При n = 20 O(2ⁿ) даёт 1 048 576, а O(n!) - около 2.4 квинтиллиона: факториальный рост обгоняет экспоненциальный уже на небольших n и дальше отрывается ещё сильнее.',
        en: 'At n = 20, O(2^n) gives 1,048,576 while O(n!) gives about 2.4 quintillion: factorial growth overtakes exponential growth already at small n and pulls further ahead from there.',
      },
      hint: {
        ru: 'Смотрите пункт «Против O(n!)» в разделе «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Against O(n!)" point in the "Choice nuances" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Алгоритм Хелда-Карпа сводит задачу коммивояжёра от O(n!) к O(n² · 2ⁿ). Почему это всё ещё считается катастрофической сложностью, а не практичным решением?',
        en: 'The Held-Karp algorithm reduces the traveling salesman problem from O(n!) to O(n^2 * 2^n). Why is this still considered catastrophic complexity rather than a practical solution?',
      },
      options: [
        { ru: 'Множитель 2ⁿ всё равно взрывается на десятках городов, несмотря на выигрыш у n!', en: 'The 2^n factor still explodes at a few dozen cities, despite the improvement over n!' },
        { ru: 'Алгоритм Хелда-Карпа на самом деле работает медленнее прямого перебора перестановок', en: 'The Held-Karp algorithm actually runs slower than brute-forcing every permutation directly' },
        { ru: 'O(n² · 2ⁿ) - это полиномиальная сложность, а название «катастрофическая» здесь ошибочно', en: 'O(n^2 * 2^n) is actually polynomial complexity, and calling it "catastrophic" here is a mistake' },
        { ru: 'Динамическое программирование по битовым маскам вообще не применимо к задаче коммивояжёра', en: 'Dynamic programming over bitmasks is not applicable to the traveling salesman problem at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'O(n² · 2ⁿ) на порядки практичнее O(n!), но множитель 2ⁿ всё равно растёт экспоненциально - уже на 40-50 городах алгоритм становится невыполнимым, несмотря на выигрыш у прямого перебора маршрутов.',
        en: 'O(n^2 * 2^n) is orders of magnitude more practical than O(n!), but the 2^n factor still grows exponentially - already at 40-50 cities the algorithm becomes infeasible, despite the win over brute-forcing every route.',
      },
      hint: {
        ru: 'Смотрите второй пункт раздела «В реальном мире» на вкладке «Суть» - про алгоритм Хелда-Карпа.',
        en: 'See the second point of the "Real world" section on the "Intent" tab - about the Held-Karp algorithm.',
      },
    },
  ],
};

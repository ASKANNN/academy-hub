export const bestAverageWorstCase = {
  slug: 'best-average-worst-case',
  category: 'big-o',
  name: { ru: 'Лучший, Средний и Худший Случай', en: 'Best, Average, and Worst Case' },
  complexity: {
    time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['best-case', 'average-case', 'worst-case', 'algorithm-analysis'],

  intent: {
    ru: 'Лучший, средний и худший случай - это не отдельный класс сложности, а способ описать, что один и тот же алгоритм может работать по-разному в зависимости от того, какие именно данные ему достались. Три отдельных значения Big O для одного алгоритма - не прихоть, а необходимость: одно число часто просто врёт о том, чего ждать на практике.',
    en: 'Best, average, and worst case are not a fourth complexity class - they describe how the same algorithm can behave differently depending on which specific input it receives. Three separate Big O values for one algorithm are not a quirk of notation, they are a necessity: a single number often lies about what to actually expect in practice.',
  },

  problem: {
    ru: 'Сказать «этот алгоритм - O(n log n)» звучит как законченный факт, но он может быть правдой только в среднем или только в лучшем случае, а в худшем - алгоритм внезапно станет O(n²). Тот, кто не уточнил, какой именно случай имеется в виду, рискует выбрать алгоритм по красивой цифре из статьи и получить неприятный сюрприз в проде на конкретном, неудачно устроенном входе - там, где «редкий» худший случай оказался ровно тем, что регулярно происходит с реальными данными.',
    en: 'Saying "this algorithm is O(n log n)" sounds like a complete fact, but it might only be true on average or in the best case, while the worst case is suddenly O(n²). Someone who never asks which case is meant risks picking an algorithm based on the attractive number from an article and getting an unpleasant surprise in production on a specific, unlucky input - exactly where the "rare" worst case turns out to be what real data does regularly.',
  },

  solution: {
    ru: 'Три случая - это **три разных вопроса об одном и том же алгоритме**: лучший случай - сколько работы потребуется на самом удачном для алгоритма входе, худший - на самом неудачном, средний - сколько потребуется в ожидании по типичному распределению входов. Когда Big O упоминают без уточнения, по умолчанию имеют в виду **худший случай** - это негласное соглашение, а не строгое правило, поэтому уточнять явно всё равно стоит. Узнать, какой случай перед вами, можно, спросив: «какое конкретно расположение данных даёт эту цифру?» - если ответ разный для разных входов одного размера n, речь именно о лучшем/среднем/худшем случае, а не о едином классе.',
    en: 'The three cases are **three different questions about the same algorithm**: best case asks how much work the luckiest possible input needs, worst case asks about the unluckiest one, average case asks what to expect given a typical distribution of inputs. When Big O is mentioned with no qualifier, the unspoken convention is that it means the **worst case** - a convention, not a strict rule, which is exactly why it is still worth stating explicitly. The way to tell which case is being described: ask "which specific arrangement of data produces this number?" - if the answer differs across inputs of the same size n, that is precisely a best/average/worst distinction, not a single unified class.',
  },

  steps: [
    {
      title: { ru: 'Один код - три возможных исхода', en: 'One piece of code, three possible outcomes' },
      explanation: {
        ru: 'Один и тот же `linearSearch` может занять 1 шаг, а может - все n, в зависимости не от кода, а от того, где именно в массиве находится искомое значение.',
        en: 'The exact same `linearSearch` can take 1 step or all n, depending not on the code but on where in the array the target value happens to sit.',
      },
    },
    {
      title: { ru: 'Лучший случай: цель - первый элемент', en: 'Best case: the target is the first element' },
      explanation: {
        ru: 'Если искомое значение стоит на позиции 0, цикл завершается на первой же итерации - ровно 1 сравнение, независимо от того, n = 10 или n = 10 000 000.',
        en: 'If the target sits at position 0, the loop finishes on its very first iteration - exactly 1 comparison, whether n = 10 or n = 10,000,000.',
      },
    },
    {
      title: { ru: 'Средний случай: цель - где-то в середине', en: 'Average case: the target is somewhere in the middle' },
      explanation: {
        ru: 'Если позиция цели равновероятна среди всех n позиций, в среднем цикл пройдёт около n / 2 итераций - не 1 и не n, а типичное значение между ними.',
        en: 'If the target\'s position is equally likely to be anywhere among the n positions, the loop runs about n / 2 iterations on average - not 1, not n, but a typical value in between.',
      },
    },
    {
      title: { ru: 'Худший случай: цель в конце или её нет вовсе', en: 'Worst case: the target is last or missing entirely' },
      explanation: {
        ru: 'Если цель - последний элемент или её вообще нет в массиве, цикл отрабатывает все n итераций до конца. Именно это значение обычно и называют «сложностью O(n)» алгоритма без уточнений.',
        en: 'If the target is the last element, or is not in the array at all, the loop runs all n iterations to the end. This is usually the exact number meant by calling the algorithm "O(n)" with no further qualifier.',
      },
    },
    {
      title: { ru: 'Не у всех алгоритмов три разные линии', en: 'Not every algorithm has three different lines' },
      explanation: {
        ru: 'У бинарного поиска лучший, средний и худший случай совпадают - все три O(log n), потому что диапазон поиска всегда делится пополам независимо от того, где спрятана цель. Расхождение линий - не универсальное свойство, а особенность конкретных алгоритмов вроде линейного поиска.',
        en: 'For binary search, the best, average, and worst case all coincide - all three are O(log n), because the search range always halves regardless of where the target is hiding. The lines diverging is not a universal property, it is a feature of specific algorithms like linear search.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`linearSearch` принимает массив `arr` и значение `target`. Ни один из трёх случаев ещё не определён на этой строке - всё решает то, что передадут при вызове.',
          en: '`linearSearch` takes an array `arr` and a value `target`. None of the three cases is decided yet on this line - it all comes down to what gets passed in at the call site.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Цикл: верхняя граница на n итераций', en: 'The loop: an upper bound of n iterations' },
        explanation: {
          ru: '`for (let i = 0; i < arr.length; i++)` может дойти максимум до n итераций - это и есть источник худшего случая O(n), но цикл вполне может завершиться и намного раньше.',
          en: '`for (let i = 0; i < arr.length; i++)` can run at most n iterations - the source of the worst-case O(n) - but it is entirely free to finish much sooner.',
        },
      },
      {
        lines: [3, 5],
        title: { ru: 'Точка расхождения трёх случаев', en: 'Where the three cases actually diverge' },
        explanation: {
          ru: '`if (arr[i] === target) return i;` - именно эта строка решает исход. Если совпадение находится на итерации i, функция делает ровно i + 1 сравнение: i = 0 даёт лучший случай, i = n - 1 или отсутствие совпадения - худший.',
          en: '`if (arr[i] === target) return i;` is exactly where the outcome gets decided. If the match happens on iteration i, the function makes exactly i + 1 comparisons: i = 0 gives the best case, i = n - 1 or no match at all gives the worst case.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Худший случай: цикл исчерпан без совпадения', en: 'The worst case: the loop runs out with no match' },
        explanation: {
          ru: '`return -1` выполняется, только когда цикл дошёл до конца, ни разу не найдя совпадения, - это ровно n сравнений, максимум из всех возможных для этого алгоритма.',
          en: '`return -1` only runs once the loop has gone all the way through with no match found - exactly n comparisons, the maximum possible for this algorithm.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`linear_search` принимает `arr` и `target` - тот же контракт, что в JS-версии, и тот же нерешённый на этой строке вопрос о том, какой случай произойдёт.',
          en: '`linear_search` takes `arr` and `target` - the same contract as the JS version, and the same undecided question at this point about which case will occur.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Цикл: верхняя граница на n итераций', en: 'The loop: an upper bound of n iterations' },
        explanation: {
          ru: '`for i in range(len(arr))` - тот же самый верхний предел в n итераций, что и в JS, необязательный к полному исчерпанию.',
          en: '`for i in range(len(arr))` is the same upper bound of n iterations as JS, not obligated to run to exhaustion.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Точка расхождения трёх случаев', en: 'Where the three cases actually diverge' },
        explanation: {
          ru: '`if arr[i] == target: return i` работает так же, как в JS: позиция совпадения `i` напрямую определяет, какой из трёх случаев произошёл именно сейчас.',
          en: '`if arr[i] == target: return i` works exactly like JS: the position `i` of the match directly determines which of the three cases just happened.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Худший случай: цикл исчерпан без совпадения', en: 'The worst case: the loop runs out with no match' },
        explanation: {
          ru: '`return -1` - тот же худший случай, что и в JS: n сравнений, ни одно не дало совпадения.',
          en: '`return -1` is the same worst case as JS: n comparisons, none of them a match.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Даёт полную картину вместо одной вводящей в заблуждение цифры - видно и оптимистичный, и пессимистичный сценарий сразу.',
      en: 'Gives the full picture instead of one potentially misleading number - both the optimistic and pessimistic scenario are visible at once.',
    },
    {
      ru: 'Позволяет выбирать алгоритм осознанно под конкретную задачу: где-то важна гарантия худшего случая, где-то - типичная скорость.',
      en: 'Allows picking an algorithm deliberately for the task at hand: sometimes a worst-case guarantee matters, sometimes typical speed does.',
    },
    {
      ru: 'Вскрывает случаи, когда репутация алгоритма («быстрый в среднем») резко расходится с тем, что происходит на конкретных, не случайных данных.',
      en: 'Exposes cases where an algorithm\'s reputation ("fast on average") sharply diverges from what happens on specific, non-random data.',
    },
  ],
  cons: [
    {
      ru: 'Три числа сложнее держать в голове и обсуждать, чем одно - требует всегда уточнять, о каком случае идёт речь.',
      en: 'Three numbers are harder to keep in mind and discuss than one - it always requires specifying which case is being talked about.',
    },
    {
      ru: '«Средний случай» подразумевает конкретное распределение входных данных (обычно равномерное случайное), которое реальные данные не обязаны соблюдать.',
      en: 'The "average case" assumes a specific input distribution (usually uniform random), which real-world data has no obligation to follow.',
    },
    {
      ru: 'В неформальном общении и статьях часто называют только одно число без уточнения, какой это случай - это и есть источник путаницы, которую решает данный материал.',
      en: 'Casual discussions and articles often quote just one number without saying which case it is - exactly the source of confusion this material addresses.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда сравниваются два алгоритма с одинаковой средней сложностью, но разным худшим случаем - разница проявится именно на неудачных входах.',
      en: 'When comparing two algorithms with the same average complexity but different worst cases - the difference shows up exactly on unlucky inputs.',
    },
    {
      ru: 'Когда реальные данные заведомо не случайны (например, часто почти отсортированы) - тогда важнее не абстрактный средний случай, а поведение алгоритма именно на таких данных.',
      en: 'When real data is known to be non-random (for example, often nearly sorted already) - what matters is not the abstract average case, but the algorithm\'s behavior on data shaped like that.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Quick Sort** (в разделе сортировок) - O(n log n) в среднем, но O(n²) в худшем случае на неудачно выбранном опорном элементе и уже отсортированном входе.',
      en: '**Quick Sort** (in the sorting section) - O(n log n) on average, but O(n²) in the worst case with a poorly chosen pivot on already-sorted input.',
    },
    {
      ru: '**Bubble Sort** (в разделе сортировок) - с оптимизацией раннего выхода даёт O(n) в лучшем случае на уже отсортированном массиве, но остаётся O(n²) в худшем.',
      en: '**Bubble Sort** (in the sorting section) - with an early-exit optimization it reaches O(n) in the best case on an already-sorted array, but stays O(n²) in the worst case.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Формально: лучший случай - это минимум объёма работы по всем входам размера n, худший - максимум по всем входам размера n, средний - математическое ожидание объёма работы при заданном распределении входов (обычно предполагается равномерное случайное распределение, если не сказано иное). Это три разных функции от n, и для одного и того же алгоритма они вполне могут иметь разный порядок роста - не просто разные константы, а разные классы Big O целиком.',
        en: 'Formally: the best case is the minimum amount of work across all inputs of size n, the worst case is the maximum across all inputs of size n, the average case is the expected amount of work under some assumed input distribution (usually taken to be uniform random unless stated otherwise). These are three different functions of n, and for the same algorithm they can genuinely have different growth orders - not just different constants, but entirely different Big O classes.',
      },
      {
        ru: 'Числа `linearSearch` делают разницу наглядной. При n = 1 000: лучший случай - 1 сравнение, средний - около 500, худший - 1 000. При n = 1 000 000: лучший всё так же 1, средний - 500 000, худший - 1 000 000. Лучший случай не меняется вместе с n вообще - он O(1), а не O(n), хотя формально принадлежит тому же самому алгоритму, который называют «O(n) в худшем случае».',
        en: 'The numbers for `linearSearch` make the gap concrete. At n = 1,000: best case is 1 comparison, average is about 500, worst is 1,000. At n = 1,000,000: best is still 1, average is 500,000, worst is 1,000,000. The best case does not scale with n at all - it is O(1), not O(n), despite belonging to the very same algorithm usually described as "O(n) in the worst case".',
      },
      {
        ru: 'Когда Big O упоминают без уточнения - «этот алгоритм O(n log n)» - по молчаливому соглашению почти всегда имеют в виду **худший случай**. Это соглашение, а не строгое правило языка нотации, и именно поэтому путаница возникает так часто: автор может иметь в виду средний случай, а читатель по умолчанию поймёт это как худший - или наоборот.',
        en: 'When Big O is mentioned with no qualifier - "this algorithm is O(n log n)" - the unspoken convention is that it almost always means the **worst case**. That is a convention, not a strict rule of the notation itself, which is exactly why confusion happens so often: the author might mean the average case, and the reader defaults to reading it as the worst case, or the other way around.',
      },
      {
        ru: 'Разброс между тремя случаями сильно различается от алгоритма к алгоритму. У бинарного поиска (материал про O(log n)) все три случая совпадают - O(log n) для любого расположения искомого элемента, потому что диапазон поиска всегда делится пополам независимо от входа. У Quick Sort (в разделе сортировок) - самый широкий разрыв из уже реализованных алгоритмов: O(n log n) в среднем и лучшем случае, но O(n²) в худшем при неудачном выборе опорного элемента на уже отсортированных данных.',
        en: 'The spread between the three cases varies a lot from algorithm to algorithm. Binary search (in the O(log n) material) has all three cases coincide - O(log n) regardless of where the target sits, because the search range always halves no matter what the input looks like. Quick Sort (in the sorting section) has the widest gap among the algorithms already implemented here: O(n log n) in the average and best case, but O(n²) in the worst case with a poorly chosen pivot on already-sorted data.',
      },
      {
        ru: 'Лучший случай не всегда встроен в алгоритм изначально - иногда это результат осознанной оптимизации кода. Bubble Sort (в разделе сортировок) с проверкой флага `swapped` завершает работу за O(n), если очередной проход не произвёл ни одной перестановки - это значит, что массив уже отсортирован. Без этой проверки тот же самый Bubble Sort выполнял бы все проходы всегда, и его лучший случай совпадал бы с худшим - O(n²) в обоих. Лучший случай может зависеть от конкретной реализации не меньше, чем от самого входа.',
        en: 'The best case is not always baked into an algorithm from the start - sometimes it is the result of a deliberate code optimization. Bubble Sort (in the sorting section), with a `swapped` flag check, finishes in O(n) if a pass makes zero swaps, which signals the array is already sorted. Without that check, the same Bubble Sort would always run every pass, and its best case would coincide with its worst - O(n²) in both. The best case can depend on the specific implementation just as much as on the input itself.',
      },
      {
        ru: 'Средний случай опирается на предположение о распределении входов, и это предположение - самое слабое место всей идеи. Анализ среднего случая обычно берёт равномерно случайные данные, но реальные данные часто устроены совсем не так: логи почти всегда почти отсортированы по времени, пользовательский ввод часто повторяется. Алгоритм с «хорошим средним случаем O(n log n)», рассчитанным на случайные данные, на систематически неслучайных реальных данных может вести себя куда ближе к своему худшему случаю, чем к заявленному среднему.',
        en: 'The average case rests on an assumption about the input distribution, and that assumption is the weakest link in the whole idea. Average-case analysis typically assumes uniformly random data, but real data is often structured very differently: logs are nearly always nearly sorted by time, user input often repeats. An algorithm with a "good average case of O(n log n)", calculated for random data, can behave much closer to its worst case than its stated average on real data that is systematically non-random.',
      },
      {
        ru: 'Инженерная реакция на плохой худший случай - гибридные алгоритмы, которые меняют стратегию на лету. Intro Sort (в разделе сортировок) начинает как Quick Sort, но переключается на Heap Sort, если глубина рекурсии намекает на приближение к худшему случаю - гарантируя O(n log n) даже там, где чистый Quick Sort скатился бы к O(n²). Timsort (в разделе сортировок) устроен похоже: гарантирует O(n log n) в худшем случае, но ускоряется на частично отсортированных данных, приближаясь к O(n) на них.',
        en: 'The engineering response to a bad worst case is hybrid algorithms that switch strategy on the fly. Intro Sort (in the sorting section) starts as Quick Sort but switches to Heap Sort if the recursion depth signals it is approaching the worst case, guaranteeing O(n log n) even where plain Quick Sort would degrade to O(n²). Timsort (in the sorting section) works similarly: it guarantees O(n log n) in the worst case, while speeding up toward O(n) on partially sorted data.',
      },
    ],
    whenToUse: [
      {
        ru: '**Гарантия против типичной скорости** - системы реального времени и другой код с жёсткими ограничениями по времени нуждаются в гарантии худшего случая, а не в «обычно быстро».',
        en: '**Guarantee versus typical speed** - real-time systems and other code with hard timing constraints need a worst-case guarantee, not "usually fast".',
      },
      {
        ru: '**Известное распределение входов** - если про реальные данные точно известно, что они почти отсортированы или иначе неслучайны, стоит смотреть на поведение алгоритма именно на таких данных, а не на абстрактный средний случай.',
        en: '**A known input distribution** - if real data is known to be nearly sorted or otherwise non-random, look at the algorithm\'s behavior on data shaped like that, not the abstract average case.',
      },
      {
        ru: '**Точная коммуникация сложности** - всегда указывать, о каком случае идёт речь, при обсуждении Big O с коллегами - невысказанное соглашение о «худшем случае по умолчанию» слишком часто не срабатывает на практике.',
        en: '**Precise communication about complexity** - always state which case is meant when discussing Big O with colleagues - the unspoken "worst case by default" convention fails to land in practice far too often.',
      },
      {
        ru: '**Совпадение всех трёх случаев как сигнал стабильности** - если лучший, средний и худший случай у алгоритма совпадают (как у бинарного поиска), это признак того, что его поведение не зависит от конкретных входных данных - предсказуемость без сюрпризов.',
        en: '**All three cases coinciding as a sign of stability** - if an algorithm\'s best, average, and worst case all match (like binary search), that signals its behavior does not depend on the specific input - predictability with no surprises.',
      },
    ],
    realWorld: [
      {
        ru: '**Timsort** (в разделе сортировок, стандарт сортировки в Python и Java) - спроектирован так, чтобы гарантировать O(n log n) в худшем случае и одновременно ускоряться до почти O(n) на частично отсортированных реальных данных.',
        en: '**Timsort** (in the sorting section, the standard sort in Python and Java) - designed to guarantee O(n log n) in the worst case while also speeding up toward nearly O(n) on partially sorted real-world data.',
      },
      {
        ru: '**Intro Sort** (в разделе сортировок, используется в реализациях `std::sort` в C++) - переключается с Quick Sort на Heap Sort при признаках приближения к худшему случаю, устраняя главный недостаток чистого Quick Sort.',
        en: '**Intro Sort** (in the sorting section, used in C++ `std::sort` implementations) - switches from Quick Sort to Heap Sort when it detects signs of approaching the worst case, eliminating plain Quick Sort\'s main weakness.',
      },
      {
        ru: '**Авионика и медицинское оборудование** - системы, где редкий, но катастрофически медленный худший случай недопустим в принципе, поэтому выбор алгоритма там определяется именно гарантией худшего случая, а не средней скоростью.',
        en: '**Avionics and medical equipment** - systems where a rare but catastrophically slow worst case is unacceptable in principle, so algorithm choice there is driven by the worst-case guarantee, not average speed.',
      },
      {
        ru: '**Планировщики запросов в базах данных** - выбирают между стратегиями выполнения запроса (например, полное сканирование таблицы против использования индекса), делая ставку именно на предполагаемое типичное распределение данных - то есть буквально на средний случай для конкретной таблицы.',
        en: '**Database query planners** - choose between execution strategies (say, a full table scan versus using an index) by betting on the assumed typical data distribution - literally the average case for that specific table.',
      },
    ],
  },

  relatedAlgorithms: ['o-n', 'o-log-n'],

  quiz: [
    {
      question: {
        ru: 'Что означает «лучший случай» для алгоритма?',
        en: 'What does the "best case" mean for an algorithm?',
      },
      options: [
        { ru: 'Расположение входных данных размера n, требующее наименьшего объёма работы', en: 'The arrangement of size-n input data that requires the least amount of work' },
        { ru: 'Самый маленький из всех возможных размеров входных данных n', en: 'The smallest of all possible input data sizes n' },
        { ru: 'Версия алгоритма, переписанная и оптимизированная лучше всех остальных', en: 'The version of the algorithm rewritten and optimized better than all the others' },
        { ru: 'Случай, который на практике вообще никогда не встречается в реальных данных', en: 'The case that in practice never actually occurs in real-world data at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Лучший случай - это минимум объёма работы среди всех входов одного и того же размера n, а не что-то, связанное с самим размером или версией кода.',
        en: 'The best case is the minimum amount of work among all inputs of the same size n, not something about the size itself or the code version.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - определение дано в разделе «Решение».',
        en: 'See the "Intent" tab - the definition is given in the "Solution" section.',
      },
    },
    {
      question: {
        ru: 'Что именно определяет, какой из трёх случаев произойдёт при конкретном запуске `linearSearch`?',
        en: 'What exactly determines which of the three cases happens on a specific run of `linearSearch`?',
      },
      options: [
        { ru: 'Позиция искомого значения target в конкретном переданном массиве', en: 'The position of the target value inside the specific array passed in' },
        { ru: 'Язык программирования, на котором функция была написана и запущена', en: 'The programming language the function happened to be written and run in' },
        { ru: 'Общий размер массива n сам по себе, независимо от его содержимого', en: 'The overall array size n by itself, regardless of what it actually contains' },
        { ru: 'Случайное число, которое генератор случайных чисел выбирает при вызове', en: 'A random number that a random number generator picks on each call' },
      ],
      correct: 0,
      explanation: {
        ru: 'Код `linearSearch` всегда один и тот же - именно то, где в массиве находится target, определяет, сколько сравнений потребуется.',
        en: '`linearSearch`\'s code never changes - it is exactly where the target sits in the array that determines how many comparisons are needed.',
      },
      hint: {
        ru: 'Смотрите шаг «Точка расхождения трёх случаев» на вкладке «Реализация».',
        en: 'See the "Where the three cases actually diverge" walkthrough step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какими цветами на графике визуализации показаны лучший, средний и худший случай?',
        en: 'What colors does the visualization chart use for best, average, and worst case?',
      },
      options: [
        { ru: 'Зелёный, жёлтый и красный - от самого удачного сценария к самому неудачному', en: 'Green, yellow, and red - from the luckiest scenario to the unluckiest one' },
        { ru: 'Все три случая показаны одним и тем же синим цветом без различий', en: 'All three cases are shown in the exact same blue color with no distinction' },
        { ru: 'Случайный цвет для каждого случая, меняющийся при каждой перезагрузке страницы', en: 'A random color for each case, changing on every page reload' },
        { ru: 'Оттенки серого - от светло-серого лучшего случая до чёрного худшего', en: 'Shades of gray - from a light gray best case to a black worst case' },
      ],
      correct: 0,
      explanation: {
        ru: 'Визуализатор в этом режиме рисует три отдельные линии: зелёную (лучший), жёлтую (средний) и красную (худший) - вместо графика роста одного класса.',
        en: 'In this mode the visualizer draws three separate lines: green (best), yellow (average), and red (worst), instead of the growth chart of a single class.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и посмотрите на легенду под графиком.',
        en: 'Open the "Visualization" tab and check the legend below the chart.',
      },
    },
    {
      question: {
        ru: 'Почему упоминание «O(n)» без уточнения обычно понимают как худший случай?',
        en: 'Why is an unqualified "O(n)" usually understood to mean the worst case?',
      },
      options: [
        { ru: 'Это негласное соглашение сообщества, а не строгое правило самой нотации Big O', en: 'It is an unspoken convention of the community, not a strict rule of Big O notation itself' },
        { ru: 'Средний и лучший случай в принципе невозможно выразить через запись Big O', en: 'The average and best case cannot in principle be expressed using Big O notation' },
        { ru: 'Худший случай технически быстрее вычислить компьютеру, чем средний или лучший', en: 'The worst case is technically faster for a computer to calculate than average or best' },
        { ru: 'Такое правило прописано в официальном стандарте языка программирования ECMAScript', en: 'Such a rule is explicitly written into the official ECMAScript programming language standard itself' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это именно соглашение, принятое сообществом для удобства - именно поэтому оно иногда нарушается и создаёт путаницу, а не строгий закон нотации.',
        en: 'It is exactly a convention adopted by the community for convenience - which is exactly why it sometimes breaks down and causes confusion, not a strict law of the notation.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть».',
        en: 'See the third "Deep dive" paragraph on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'При n = 1000 у linearSearch: лучший случай - 1 сравнение, худший - 1000. Почему такой большой разрыв?',
        en: 'At n = 1000 for linearSearch: best case is 1 comparison, worst is 1000. Why such a large gap?',
      },
      options: [
        { ru: 'Лучший случай не зависит от n вовсе (O(1)), а худший растёт вместе с n (O(n))', en: 'The best case does not depend on n at all (O(1)), while the worst grows together with n (O(n))' },
        { ru: 'Это просто ошибка измерения - на самом деле оба случая всегда должны совпадать между собой', en: 'This is a measurement error - in reality both cases should be equal to each other' },
        { ru: 'Разрыв специфичен только для n = 1000 и исчезает при любых других размерах n', en: 'The gap is specific only to n = 1000 and disappears completely at any other single input size of n' },
        { ru: 'Лучший случай всегда равен ровно половине от значения худшего случая', en: 'The best case always equals exactly half of the worst case value' },
      ],
      correct: 0,
      explanation: {
        ru: 'Лучший случай (target на позиции 0) - это O(1), не зависящее от n, а худший (target в конце или отсутствует) - O(n), растущее вместе с размером массива.',
        en: 'The best case (target at position 0) is O(1), independent of n, while the worst case (target last or missing) is O(n), growing together with the array size.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть» - там разобраны точные числа.',
        en: 'See the second "Deep dive" paragraph on the "Intent" tab - it works through the exact numbers.',
      },
    },
    {
      question: {
        ru: 'Почему у бинарного поиска лучший, средний и худший случай - все три O(log n)?',
        en: 'Why are binary search\'s best, average, and worst case all O(log n)?',
      },
      options: [
        { ru: 'Диапазон поиска делится пополам на каждом шаге независимо от расположения искомого элемента', en: 'The search range halves on every step regardless of where the target element is located' },
        { ru: 'Бинарный поиск на самом деле вообще не является алгоритмом сравнения элементов между собой никогда', en: 'Binary search is not actually a comparison-based algorithm at all in the first place' },
        { ru: 'Это просто совпадение, специфичное только для этой конкретной реализации кода', en: 'It is simply a coincidence, specific only to this one particular implementation of the code' },
        { ru: 'Массив для бинарного поиска всегда искусственно ограничен ровно 10 элементами', en: 'The array for binary search is always artificially limited to exactly 10 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Диапазон поиска у бинарного поиска сокращается вдвое на каждом шаге вне зависимости от того, где именно находится цель - поэтому все три случая структурно совпадают.',
        en: 'Binary search\'s range shrinks by half on every step no matter where the target actually is - which is why all three cases coincide structurally.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть» - про бинарный поиск как пример совпадения.',
        en: 'See the fourth "Deep dive" paragraph on the "Intent" tab - about binary search as an example of coinciding cases.',
      },
    },
    {
      question: {
        ru: 'Bubble Sort с проверкой флага `swapped` даёт O(n) в лучшем случае. Почему это не меняет его худший случай O(n²)?',
        en: 'Bubble Sort with a `swapped` flag check gives O(n) in the best case. Why does this not change its O(n²) worst case?',
      },
      options: [
        { ru: 'Флаг помогает завершить работу раньше только когда данные уже отсортированы, а не всегда', en: 'The flag only helps finish earlier when the data is already sorted, not always' },
        { ru: 'Флаг swapped на самом деле полностью меняет и худший случай тоже, снижая его сразу до O(n)', en: 'The swapped flag actually fully changes the worst case too, lowering it to O(n)' },
        { ru: 'Проверка флага технически не влияет на реальную скорость выполнения кода никак', en: 'Checking the flag technically has no effect on the real execution speed of the code at all' },
        { ru: 'Это на самом деле баг в реализации Bubble Sort, который стоило бы исправить', en: 'This is actually a bug in the Bubble Sort implementation that should be fixed' },
      ],
      correct: 0,
      explanation: {
        ru: 'Флаг swapped позволяет выйти раньше только когда проход не сделал ни одной перестановки - на неудачно упорядоченных данных (худший случай) перестановки происходят на каждом проходе, и ранний выход не срабатывает.',
        en: 'The swapped flag only allows an early exit when a pass makes zero swaps - on badly ordered data (the worst case) swaps happen on every pass, so the early exit never triggers.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» - про Bubble Sort и флаг swapped.',
        en: 'See the fifth "Deep dive" paragraph on the "Intent" tab - about Bubble Sort and the swapped flag.',
      },
    },
    {
      question: {
        ru: 'Нужна гарантия, что сортировка никогда не деградирует до O(n²), даже на специально подобранном неудачном входе. Quick Sort или Merge Sort?',
        en: 'A guarantee is needed that a sort never degrades to O(n²), even on a specially crafted adversarial input. Quick Sort or Merge Sort?',
      },
      options: [
        { ru: 'Merge Sort - его худший случай остаётся O(n log n) при любом возможном входе', en: 'Merge Sort - its worst case stays O(n log n) regardless of the input' },
        { ru: 'Quick Sort - его средний случай O(n log n) быстрее в большинстве реальных бенчмарков', en: 'Quick Sort - its average case of O(n log n) is faster in most real-world benchmarks' },
        { ru: 'Разницы нет - у обоих алгоритмов худший случай абсолютно одинаковый по классу', en: 'There is no difference - both algorithms have the exact same worst-case class' },
        { ru: 'Ни один вариант не подходит - гарантия худшего случая невозможна ни для одной сортировки', en: 'Neither option works - a worst-case guarantee is impossible for any sorting algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Quick Sort в худшем случае деградирует до O(n²) на неудачном выборе опорного элемента, а Merge Sort гарантирует O(n log n) при любом входе - это и есть разница между гарантией и типичной скоростью.',
        en: 'Quick Sort degrades to O(n²) in the worst case with a poor pivot choice, while Merge Sort guarantees O(n log n) on any input - exactly the difference between a guarantee and typical speed.',
      },
      hint: {
        ru: 'Смотрите пункт «Гарантия против типичной скорости» в разделе «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Guarantee versus typical speed" point in the "Choice nuances" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Реальные данные системы почти всегда почти отсортированы по времени (логи). Почему опасно полагаться на «средний случай O(n log n)», рассчитанный для случайных данных?',
        en: 'A system\'s real data is almost always nearly time-sorted (logs). Why is it risky to rely on an "average case of O(n log n)" calculated for random data?',
      },
      options: [
        { ru: 'Реальные неслучайные данные могут вести себя ближе к худшему случаю, чем к среднему', en: 'Real, non-random data can behave closer to the worst case than to the average one' },
        { ru: 'Это вообще не опасно - средний случай гарантированно применим к любым данным без единого исключения', en: 'It is not risky at all - the average case is guaranteed to apply to any data with no exceptions' },
        { ru: 'Логи технически вообще не могут обрабатываться алгоритмами сортировки в принципе', en: 'Logs technically cannot be processed by sorting algorithms in the first place' },
        { ru: 'Опасность существует только если данных меньше 10 записей одновременно', en: 'The risk only exists if there are fewer than 10 records at a time' },
      ],
      correct: 0,
      explanation: {
        ru: 'Анализ среднего случая обычно предполагает случайные данные, а систематически неслучайные реальные данные (почти отсортированные логи) могут вести себя куда ближе к заявленному худшему случаю.',
        en: 'Average-case analysis typically assumes random data, and systematically non-random real data (nearly sorted logs) can behave much closer to the stated worst case instead.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть» - про ловушку предположения о среднем случае.',
        en: 'See the sixth "Deep dive" paragraph on the "Intent" tab - about the average-case assumption trap.',
      },
    },
    {
      question: {
        ru: 'Как Intro Sort гарантирует O(n log n), несмотря на то что начинает работу как обычный Quick Sort?',
        en: 'How does Intro Sort guarantee O(n log n) despite starting out as plain Quick Sort?',
      },
      options: [
        { ru: 'Переключается на Heap Sort, если глубина рекурсии намекает на приближение к худшему случаю', en: 'It switches to Heap Sort if the recursion depth signals it is approaching the worst case' },
        { ru: 'Полностью отказывается от самой идеи Quick Sort и с самого же начала работает как Merge Sort', en: 'It abandons the idea of Quick Sort entirely and works like Merge Sort from the very start' },
        { ru: 'Случайным образом перемешивает входной массив перед каждым запуском алгоритма', en: 'It randomly shuffles the input array before every single run of the algorithm' },
        { ru: 'Ограничивает размер входного массива, отказываясь сортировать больше 1000 элементов', en: 'It limits the input array size, refusing to sort more than 1000 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Intro Sort отслеживает глубину рекурсии Quick Sort и переключается на Heap Sort при признаках приближения к худшему случаю, устраняя главный недостаток чистого Quick Sort.',
        en: 'Intro Sort tracks Quick Sort\'s recursion depth and switches to Heap Sort when it detects signs of approaching the worst case, eliminating plain Quick Sort\'s main weakness.',
      },
      hint: {
        ru: 'Смотрите седьмой абзац раздела «Как это работает» на вкладке «Суть» - про Intro Sort и Timsort.',
        en: 'See the seventh "Deep dive" paragraph on the "Intent" tab - about Intro Sort and Timsort.',
      },
    },
  ],
};

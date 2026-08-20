export const oNFactorial = {
  slug: 'o-n-factorial',
  category: 'big-o',
  name: { ru: 'O(n!) - Факториальная Сложность', en: 'O(n!) - Factorial Time' },
  complexity: {
    time: { best: 'O(n!)', average: 'O(n!)', worst: 'O(n!)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['factorial', 'permutations', 'brute-force'],
  tier: 'catastrophic',

  intent: {
    ru: 'O(n!) - это самый быстрорастущий класс сложности из тех, что реально встречаются в коде. За ним стоит перебор всех возможных порядков расположения n элементов: первый элемент можно выбрать n способами, второй - оставшимися n - 1, третий - n - 2, и так далее, пока не переберётся каждая перестановка. Растёт быстрее любой экспоненты и быстрее любого полинома, и уже на скромных n превращает алгоритм в неработоспособный.',
    en: 'O(n!) is the fastest-growing complexity class that actually shows up in real code. It comes from enumerating every possible ordering of n elements: the first element can be chosen n ways, the second from the remaining n - 1, the third from n - 2, and so on until every permutation has been visited. It grows faster than any exponential and faster than any polynomial, and turns an algorithm unusable already at modest values of n.',
  },

  problem: {
    ru: 'Задачи вроде «найти оптимальный порядок обхода городов» или «расставить n предметов наилучшим образом» звучат так, будто единственный надёжный способ решить их - проверить все возможные порядки и выбрать лучший. Код для этого пишется буквально в одну рекурсивную функцию, выглядит корректно и проходит любые тесты на 4-5 элементах. Опасность в том, что рост числа перестановок скрыт за восклицательным знаком в формуле, и никакой интуиции «n чуть больше - работы чуть больше» здесь не работает: перестановок 10 элементов уже 3 628 800, а 15 элементов - больше триллиона.',
    en: 'Problems like "find the optimal order to visit these cities" or "arrange n items in the best possible way" sound as if the only reliable way to solve them is to check every possible ordering and pick the best one. The code for that is literally a single recursive function, looks correct, and passes any test on 4-5 elements. The danger is that the growth in the number of permutations hides behind an exclamation mark in the formula, and the intuition "a bit more n means a bit more work" simply does not apply here: 10 elements already have 3,628,800 permutations, and 15 elements have over a trillion.',
  },

  solution: {
    ru: 'Операция попадает в O(n!), если решение перебирает **все возможные упорядочивания** n элементов, и на каждом шаге число оставшихся вариантов уменьшается ровно на единицу. Узнать такой код можно по форме: **рекурсия с циклом внутри, где на каждом уровне выбор идёт из оставшихся элементов**, а не из фиксированного набора вариантов. Классический пример - генерация всех перестановок массива через обмен элементов местами: на первом уровне рекурсии n вариантов выбора, на втором - n - 1, и так далее до единственного оставшегося элемента.',
    en: 'An operation lands in O(n!) when the solution enumerates **every possible ordering** of n elements, and at each step the number of remaining options shrinks by exactly one. The tell is structural: **recursion with a loop inside it, where the choice at each level comes from the elements still remaining**, not from a fixed set of options. The classic example is generating every permutation of an array by swapping elements: n choices at the first level of recursion, n - 1 at the second, and so on down to a single remaining element.',
  },

  steps: [
    {
      title: { ru: 'На каждом шаге выбор сужается на единицу', en: 'The choice shrinks by one at every step' },
      explanation: {
        ru: 'На первом уровне рекурсии есть n вариантов выбора следующего элемента. На втором уровне - уже n - 1, потому что один элемент уже занят своим местом. Множители перемножаются: n · (n - 1) · (n - 2) · ... · 1.',
        en: 'At the first level of recursion there are n choices for the next element. At the second level there are only n - 1, because one element already has its position fixed. The factors multiply: n * (n - 1) * (n - 2) * ... * 1.',
      },
    },
    {
      title: { ru: 'Обгоняет даже O(2ⁿ) за считаные шаги', en: 'Overtakes even O(2^n) within a handful of steps' },
      explanation: {
        ru: 'На n = 10 перестановок 3 628 800 - это уже больше, чем даёт 2¹⁰ = 1024, в тысячи раз. Факториал растёт быстрее любой фиксированной экспоненты cⁿ, потому что сам множитель на каждом шаге увеличивается, а не остаётся постоянным.',
        en: 'At n = 10 there are 3,628,800 permutations, already thousands of times more than 2^10 = 1024. Factorial growth outpaces any fixed exponential c^n, because the multiplier itself grows at every step instead of staying constant.',
      },
    },
    {
      title: { ru: 'Пример: генерация всех перестановок', en: 'Example: generating every permutation' },
      explanation: {
        ru: 'Самый частый источник O(n!) - перебор всех возможных порядков элементов: `permute` рекурсивно фиксирует по одному элементу на каждой позиции и перебирает все варианты для оставшихся.',
        en: 'The typical source of O(n!) is enumerating every possible ordering of elements: `permute` recursively fixes one element per position and tries every option for the rest.',
      },
    },
    {
      title: { ru: 'n = 8: уже больше 40 тысяч перестановок', en: 'n = 8: already over 40,000 permutations' },
      explanation: {
        ru: 'К n = 8 количество перестановок - 40 320. У O(2ⁿ) на этом же n было бы всего 256, у O(n) - всего 8: разрыв огромен уже на однозначном n.',
        en: 'By n = 8 the number of permutations is 40,320. O(2^n) would give only 256 at the same n, O(n) would give only 8: the gap is already enormous at a single-digit n.',
      },
    },
    {
      title: { ru: 'Рядом с O(2ⁿ)', en: 'Next to O(2^n)' },
      explanation: {
        ru: 'На n = 4 обе кривые ещё близки: 24 против 16. К n = 10 разрыв - 3 628 800 против 1024, в тысячи раз. Факториал не просто быстрее экспоненты - он обгоняет её ускоряющимися темпами.',
        en: 'At n = 4 the two curves are still close: 24 versus 16. By n = 10 the gap is 3,628,800 versus 1024, a thousandfold difference. Factorial is not just faster than exponential, it pulls ahead at an accelerating rate.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function permute(arr, start = 0, result = []) {
  if (start === arr.length) {
    result.push([...arr]);
    return result;
  }
  for (let i = start; i < arr.length; i++) {
    [arr[start], arr[i]] = [arr[i], arr[start]];
    permute(arr, start + 1, result);
    [arr[start], arr[i]] = [arr[i], arr[start]];
  }
  return result;
}`,
    python: `def permute(arr, start=0, result=None):
    if result is None:
        result = []
    if start == len(arr):
        result.append(arr[:])
        return result
    for i in range(start, len(arr)):
        arr[start], arr[i] = arr[i], arr[start]
        permute(arr, start + 1, result)
        arr[start], arr[i] = arr[i], arr[start]
    return result`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`permute` принимает массив `arr`, позицию `start`, начиная с которой ещё нужно расставить элементы, и накопитель `result` для готовых перестановок.',
          en: '`permute` takes an array `arr`, a position `start` from which elements still need placing, and an accumulator `result` for finished permutations.',
        },
      },
      {
        lines: [2, 3, 4],
        title: { ru: 'Базовый случай - перестановка готова', en: 'Base case - a permutation is complete' },
        explanation: {
          ru: 'Когда `start` доходит до конца массива, все позиции заняты - текущая расстановка `arr` копируется в `result`, и функция возвращается на уровень выше.',
          en: 'When `start` reaches the end of the array, every position is filled - the current arrangement of `arr` gets copied into `result`, and the function returns up a level.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Перебор оставшихся кандидатов', en: 'Looping over the remaining candidates' },
        explanation: {
          ru: '`for (let i = start; ...)` перебирает каждый ещё не зафиксированный элемент как кандидата на позицию `start` - именно этот цикл и даёт множитель, уменьшающийся на единицу на каждом уровне рекурсии.',
          en: '`for (let i = start; ...)` tries every not-yet-fixed element as a candidate for position `start` - exactly this loop produces the multiplier that shrinks by one at each level of recursion.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Ставим кандидата на позицию', en: 'Placing the candidate' },
        explanation: {
          ru: '`[arr[start], arr[i]] = [arr[i], arr[start]]` меняет местами кандидата `arr[i]` и текущую позицию `arr[start]`, фиксируя кандидата на своём месте перед спуском глубже.',
          en: '`[arr[start], arr[i]] = [arr[i], arr[start]]` swaps the candidate `arr[i]` with the current position `arr[start]`, locking the candidate into place before descending deeper.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Рекурсия на оставшийся хвост', en: 'Recursing into the remaining tail' },
        explanation: {
          ru: '`permute(arr, start + 1, result)` спускается на следующую позицию, где выбор идёт уже из на один элемент меньшего набора - отсюда множитель n - 1, n - 2 и так далее.',
          en: '`permute(arr, start + 1, result)` descends to the next position, where the choice now comes from a set one element smaller - the source of the n - 1, n - 2 multipliers.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Откат - возвращаем массив как было', en: 'Backtracking - restoring the array' },
        explanation: {
          ru: 'Второй такой же обмен возвращает `arr[start]` и `arr[i]` на исходные места, чтобы следующая итерация цикла пробовала следующего кандидата на чистом состоянии массива.',
          en: 'The second identical swap puts `arr[start]` and `arr[i]` back where they were, so the next loop iteration tries the next candidate against a clean array state.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Возврат накопленного результата', en: 'Returning the accumulated result' },
        explanation: {
          ru: '`return result` отдаёт наружу общий массив со всеми найденными перестановками - он один и тот же объект на всех уровнях рекурсии, поэтому пополняется, а не пересоздаётся.',
          en: '`return result` hands back the shared array of every permutation found so far - it is the same object at every level of the recursion, so it accumulates rather than getting recreated.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`permute` принимает `arr`, `start` и `result` - тот же контракт, что в JS-версии, но `result` по умолчанию `None`, а не `[]`.',
          en: '`permute` takes `arr`, `start`, and `result` - the same contract as the JS version, but `result` defaults to `None` instead of `[]`.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Обход изменяемого значения по умолчанию', en: 'Working around a mutable default' },
        explanation: {
          ru: 'В Python список по умолчанию делится между всеми вызовами функции, если задать его прямо в сигнатуре - поэтому `result` создаётся заново внутри тела функции при первом вызове, когда он ещё `None`.',
          en: 'In Python, a default list gets shared across every call of the function if set directly in the signature - so `result` is freshly created inside the body on the first call, while it is still `None`.',
        },
      },
      {
        lines: [4, 5, 6],
        title: { ru: 'Базовый случай - перестановка готова', en: 'Base case - a permutation is complete' },
        explanation: {
          ru: 'Когда `start` равен длине `arr`, все позиции заняты - `arr[:]` копирует текущий срез списка в `result`, и функция возвращается.',
          en: 'When `start` equals the length of `arr`, every position is filled - `arr[:]` copies the current slice of the list into `result`, and the function returns.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Перебор оставшихся кандидатов', en: 'Looping over the remaining candidates' },
        explanation: {
          ru: '`for i in range(start, len(arr))` работает так же, как цикл в JS - перебирает всех ещё не зафиксированных кандидатов на позицию `start`.',
          en: '`for i in range(start, len(arr))` works exactly like the JS loop - it tries every not-yet-fixed candidate for position `start`.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Ставим кандидата на позицию', en: 'Placing the candidate' },
        explanation: {
          ru: '`arr[start], arr[i] = arr[i], arr[start]` - обмен без временной переменной, стандартный питоновский способ поменять местами два элемента списка.',
          en: '`arr[start], arr[i] = arr[i], arr[start]` swaps without a temporary variable, the standard Python idiom for exchanging two list elements.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Рекурсия на оставшийся хвост', en: 'Recursing into the remaining tail' },
        explanation: {
          ru: '`permute(arr, start + 1, result)` спускается глубже, как и в JS-версии, сужая выбор на следующем уровне на один элемент.',
          en: '`permute(arr, start + 1, result)` descends deeper just like the JS version, narrowing the choice by one element at the next level.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Откат - возвращаем список как было', en: 'Backtracking - restoring the list' },
        explanation: {
          ru: 'Повторный обмен возвращает элементы на исходные места перед тем, как цикл перейдёт к следующему кандидату `i`.',
          en: 'The repeated swap restores the elements to their original places before the loop moves on to the next candidate `i`.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Возврат накопленного результата', en: 'Returning the accumulated result' },
        explanation: {
          ru: '`return result` работает так же, как в JS: один и тот же список пополняется на всех уровнях рекурсии и возвращается наружу целиком.',
          en: '`return result` works exactly like the JS version: the same list gets filled in at every level of the recursion and is returned whole at the end.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Гарантированно перебирает абсолютно все возможные упорядочивания, поэтому найденный оптимум - действительно оптимум, без единого пропущенного варианта.',
      en: 'Guaranteed to visit absolutely every possible ordering, so the optimum it finds is a genuine optimum, with not a single option skipped.',
    },
    {
      ru: 'Код прямо соответствует определению задачи «перебрать все порядки» и не требует специальных знаний об оптимизации, чтобы его написать правильно.',
      en: 'The code maps directly onto the definition of "enumerate every ordering" and requires no special optimization knowledge to write correctly.',
    },
    {
      ru: 'На действительно крошечном n (до 8-10) выполняется практически мгновенно, а гарантия корректности того стоит.',
      en: 'On a genuinely tiny n (up to 8-10) it runs practically instantly, and the correctness guarantee is worth it.',
    },
  ],
  cons: [
    {
      ru: 'Самый быстрорастущий класс сложности из всех практически встречающихся - уже при n = 15 счёт идёт на триллионы операций.',
      en: 'The fastest-growing complexity class that shows up in practice - already at n = 15 the count runs into trillions of operations.',
    },
    {
      ru: 'Почти всегда есть более узкая формулировка задачи, где не нужен полный перебор порядков - факториальный алгоритм часто означает, что задача сформулирована шире, чем требуется на самом деле.',
      en: 'Almost always there is a narrower framing of the problem that does not need a full enumeration of orderings - a factorial algorithm often means the problem was stated more broadly than actually required.',
    },
    {
      ru: 'Даже при точечном отсечении заведомо плохих веток худший случай на бумаге остаётся тем же самым O(n!), в отличие от полиномиальных алгоритмов, где оптимизация обычно меняет саму границу.',
      en: 'Even with targeted pruning of hopeless branches, the worst case on paper stays the same O(n!), unlike polynomial algorithms where optimization usually changes the bound itself.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда n гарантированно совсем маленькое (до 8-10) и задача действительно требует именно порядка элементов, а не просто их набора.',
      en: 'When n is guaranteed to be genuinely tiny (up to 8-10) and the problem truly requires an ordering of the elements, not just a set of them.',
    },
    {
      ru: 'Для эталонной проверки более быстрого алгоритма на маленьких данных - полный перебор перестановок даёт заведомо правильный ответ, с которым можно сверить оптимизированное решение.',
      en: 'For a reference check of a faster algorithm on small data - a full permutation enumeration gives a provably correct answer that an optimized solution can be verified against.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Прямой перебор задачи коммивояжёра** - учебная точка отсчёта: проверить все n! возможных маршрутов и выбрать самый короткий, работает лишь при считаных городах.',
      en: '**Brute-force traveling salesman** - the textbook baseline: checking all n! possible routes and picking the shortest one, viable only for a handful of cities.',
    },
    {
      ru: '**Генерация всех расстановок ферзей на шахматной доске** без учёта атак - перебор всех n! расположений n ферзей на n позициях по одной в столбце.',
      en: '**Generating every arrangement of queens on a chessboard** with no attack constraint - enumerating all n! placements of n queens across n column positions.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Формально n! ("n факториал") - это произведение всех целых чисел от 1 до n: `n! = n · (n - 1) · (n - 2) · ... · 2 · 1`. Для `permute` это ровно число всех перестановок массива из n различных элементов: на первую позицию можно поставить любой из n элементов, на вторую - любой из оставшихся n - 1, и так далее, пока не останется один-единственный вариант для последней позиции.',
        en: 'Formally, n! ("n factorial") is the product of every integer from 1 to n: `n! = n * (n - 1) * (n - 2) * ... * 2 * 1`. For `permute` this is exactly the number of permutations of an array with n distinct elements: any of the n elements can go in the first position, any of the remaining n - 1 in the second, and so on until only one option is left for the last position.',
      },
      {
        ru: 'Числа делают рост наглядным. `5! = 120` - терпимо. `10! = 3 628 800` - уже больше трёх с половиной миллионов. `15! ≈ 1.3 триллиона`. `20! ≈ 2.4 квинтиллиона` - число, которое современный процессор не переберёт даже за годы непрерывной работы, даже если каждая перестановка проверяется за одну наносекунду.',
        en: 'The numbers make the growth vivid. `5! = 120` is tolerable. `10! = 3,628,800` is already over three and a half million. `15! ≈ 1.3 trillion`. `20! ≈ 2.4 quintillion`, a number a modern processor could not fully enumerate even over years of continuous work, even checking one permutation per nanosecond.',
      },
      {
        ru: 'Сравнение с O(2ⁿ) показывает, почему факториал считается ещё более катастрофическим классом. У экспоненты множитель на каждом шаге один и тот же - постоянная c. У факториала множитель сам уменьшается с каждым уровнем рекурсии, но остаётся числом, сравнимым с n, а не с постоянной двойкой - поэтому `n!` обгоняет `2ⁿ` уже к n ≈ 4-5 и дальше отрывается ускоряющимися темпами: на n = 20 разрыв - больше двух триллионов раз (2 432 902 008 176 640 000 против 1 048 576).',
        en: 'A comparison with O(2^n) shows why factorial is considered an even more catastrophic class. The exponential\'s multiplier is the same constant c at every step. The factorial\'s multiplier shrinks with each level of recursion, but stays comparable in size to n itself rather than to a constant of two, which is why `n!` overtakes `2^n` already around n ≈ 4-5 and pulls further ahead at an accelerating rate: at n = 20 the gap is over two trillion times (2,432,902,008,176,640,000 versus 1,048,576).',
      },
      {
        ru: 'Разница между «перебрать все подмножества» (O(2ⁿ)) и «перебрать все порядки» (O(n!)) - это разница между вопросом «что входит в набор» и вопросом «в каком порядке». Подмножеств множества из n элементов - `2ⁿ`. Упорядочиваний того же множества - `n!`, потому что для каждого подмножества-набора нужно ещё перебрать все способы его расставить. Это и объясняет, почему факториальный рост всегда обгоняет экспоненциальный на одном и том же n.',
        en: 'The difference between "enumerate all subsets" (O(2^n)) and "enumerate all orderings" (O(n!)) is the difference between the question "what is in the set" and the question "in what order". A set of n elements has `2^n` subsets. Orderings of that same set number `n!`, because for each subset-as-a-set there are additionally all the ways to arrange it. This is exactly why factorial growth always overtakes exponential growth at the same n.',
      },
      {
        ru: 'Практически ни одна промышленная система не оставляет задачу с O(n!) как есть. Задача коммивояжёра сводится к O(n² · 2ⁿ) алгоритмом Хелда-Карпа через динамическое программирование по подмножествам, или решается приближённо эвристиками (ближайший сосед, генетические алгоритмы), которые не гарантируют оптимум, но дают хорошее решение за полиномиальное время. Факториальный перебор в реальном коде почти всегда сигнал: задача сформулирована шире, чем нужно, и стоит поискать более узкую переформулировку.',
        en: 'Practically no production system leaves an O(n!) problem as-is. The traveling salesman problem reduces to O(n^2 * 2^n) via the Held-Karp dynamic-programming algorithm, or gets solved approximately with heuristics (nearest neighbor, genetic algorithms) that do not guarantee the optimum but produce a good solution in polynomial time. A factorial enumeration in production code is almost always a signal that the problem was stated more broadly than necessary, and a narrower reformulation is worth looking for.',
      },
      {
        ru: 'Небольшая, но реальная оптимизация внутри самого класса O(n!) - **отсечение симметричных перестановок**: если часть элементов одинакова, многие перестановки совпадают друг с другом, и их можно не генерировать повторно. Это не меняет Big O в общем случае (при всех различных элементах симметрии нет), но заметно снижает реальную работу на входах с повторами.',
        en: 'A small but real optimization within the O(n!) class itself is **pruning symmetric permutations**: if some elements are equal, many permutations coincide with each other and do not need to be generated repeatedly. This does not change the Big O in the general case (with all-distinct elements there is no symmetry to exploit), but it noticeably cuts real work on inputs with repeats.',
      },
    ],
    whenToUse: [
      {
        ru: '**Гарантированно крошечное n** - если условие задачи фиксирует n на уровне 8-10 и меньше, полный перебор перестановок проще писать и проверять, чем искать более узкую формулировку.',
        en: '**Guaranteed tiny n** - if the problem statement fixes n at 8-10 or below, a full permutation enumeration is simpler to write and verify than hunting for a narrower formulation.',
      },
      {
        ru: '**Против O(2ⁿ)** - если задача сводится к выбору набора элементов, а не их порядка, перебор подмножеств (O(2ⁿ)) почти всегда достаточен и заметно дешевле полного перебора перестановок.',
        en: '**Against O(2^n)** - if the problem reduces to choosing a set of elements rather than their order, enumerating subsets (O(2^n)) is almost always sufficient and noticeably cheaper than a full permutation enumeration.',
      },
      {
        ru: '**Против динамического программирования по маскам** - как только задача о порядке допускает переформулировку через подмножества посещённых элементов (как в задаче коммивояжёра), O(n!) сводится к O(n² · 2ⁿ) - всё ещё катастрофически, но на порядки практичнее.',
        en: '**Against bitmask dynamic programming** - once an ordering problem can be reframed in terms of subsets of visited elements (as in the traveling salesman problem), O(n!) reduces to O(n^2 * 2^n), still catastrophic, but orders of magnitude more practical.',
      },
      {
        ru: '**Против эвристик** - когда точный оптимум не обязателен, приближённые методы (ближайший сосед, локальный поиск, генетические алгоритмы) дают решение, близкое к лучшему, за полиномиальное время вместо факториального.',
        en: '**Against heuristics** - when the exact optimum is not required, approximate methods (nearest neighbor, local search, genetic algorithms) yield a near-best solution in polynomial time instead of factorial time.',
      },
    ],
    realWorld: [
      {
        ru: '**Прямое решение задачи коммивояжёра** - справочная точка отсчёта в любом курсе по алгоритмам: наглядно показывает, зачем вообще нужны Хелд-Карп, эвристики и приближённые методы.',
        en: '**The direct traveling salesman solution** - the reference baseline in every algorithms course, a clear demonstration of why Held-Karp, heuristics, and approximation methods exist at all.',
      },
      {
        ru: '**Планирование расписаний** (составление порядка выполнения n задач на одном ресурсе) в наивной формулировке сводится к перебору n! порядков; на практике решается жадными эвристиками или целочисленным программированием.',
        en: '**Job scheduling** (ordering n tasks on a single resource) reduces in its naive formulation to enumerating n! orderings; in practice it gets solved with greedy heuristics or integer programming instead.',
      },
      {
        ru: '**Задача о восьми ферзях и её обобщение на n ферзей** - классический пример из теории алгоритмов, где наивный перебор расстановок факториален, а бэктрекинг с отсечением атакующих позиций резко сокращает реальное время работы.',
        en: '**The eight queens puzzle and its n-queens generalization** - a classic algorithms-theory example where naive enumeration of placements is factorial, and backtracking with attack-position pruning sharply cuts real runtime.',
      },
      {
        ru: '**Выравнивание последовательностей ДНК/белков при сравнении более двух последовательностей одновременно** - наивный многосторонний перебор порядков выравнивания растёт факториально с числом последовательностей, поэтому используются приближённые прогрессивные методы (как в ClustalW).',
        en: '**Multiple sequence alignment in DNA/protein comparison** (aligning more than two sequences at once) - a naive enumeration of alignment orderings grows factorially with the number of sequences, which is why approximate progressive methods (like ClustalW) get used instead.',
      },
    ],
  },

  relatedAlgorithms: ['o-2-n', 'o-n-3'],

  quiz: [
    {
      question: {
        ru: 'Что именно перебирает алгоритм класса O(n!)?',
        en: 'What exactly does an O(n!) algorithm enumerate?',
      },
      options: [
        { ru: 'Все возможные порядки расположения n элементов', en: 'Every possible ordering of n elements' },
        { ru: 'Все пары соседних элементов во входном массиве', en: 'Every pair of neighboring elements in the input array' },
        { ru: 'Все подмножества входного набора без учёта порядка', en: 'Every subset of the input set, with order ignored' },
        { ru: 'Каждый элемент входного массива ровно один раз подряд', en: 'Every element of the input array exactly once, in sequence' },
      ],
      correct: 0,
      explanation: {
        ru: 'O(n!) - это число всех перестановок n элементов, то есть всех возможных порядков их расположения.',
        en: 'O(n!) is the count of all permutations of n elements, that is, every possible ordering they can be arranged in.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - там прямо написано про перебор порядков расположения.',
        en: 'See the "Intent" tab - it directly describes enumerating orderings.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде почти всегда можно узнать O(n!)?',
        en: 'What code pattern almost always signals O(n!)?',
      },
      options: [
        { ru: 'Рекурсия с циклом внутри, где выбор идёт из оставшихся элементов', en: 'Recursion with a loop inside it, choosing from the elements still remaining' },
        { ru: 'Один цикл без вложенности, проходящий по всем элементам ровно один раз подряд', en: 'A single, non-nested loop that walks every element exactly once, no recursion involved' },
        { ru: 'Рекурсивная функция, вызывающая саму себя ровно два раза подряд на каждом шаге', en: 'A recursive function calling itself exactly twice in a row on every single step' },
        { ru: 'Размер входа делится пополам на каждом следующем шаге алгоритма без остатка', en: 'The input size gets cut in half at every following step of the algorithm without fail' },
      ],
      correct: 0,
      explanation: {
        ru: 'Рекурсия с циклом внутри, где число вариантов на каждом уровне уменьшается на единицу - именно это делает `permute` на вкладке «Реализация».',
        en: 'Recursion with a loop inside it, where the number of options shrinks by one at each level, is exactly what `permute` does on the "Implementation" tab.',
      },
      hint: {
        ru: 'Смотрите строку 6 функции `permute` на вкладке «Реализация» и шаг «Перебор оставшихся кандидатов».',
        en: 'See line 6 of `permute` on the "Implementation" tab and its walkthrough step "Looping over the remaining candidates".',
      },
    },
    {
      question: {
        ru: 'Сколько перестановок у массива из 10 различных элементов?',
        en: 'How many permutations does an array of 10 distinct elements have?',
      },
      options: [
        { ru: '3 628 800 - это 10 факториал', en: '3,628,800 - that is 10 factorial' },
        { ru: '1024 - это 2 в десятой степени', en: '1024 - that is 2 to the tenth power' },
        { ru: '100 - это 10 в квадрате', en: '100 - that is 10 squared' },
        { ru: '10 - по одной перестановке на каждый элемент', en: '10 - one permutation per element' },
      ],
      correct: 0,
      explanation: {
        ru: '10! = 10 · 9 · 8 · ... · 1 = 3 628 800 - именно столько перестановок у массива из 10 различных элементов.',
        en: '10! = 10 * 9 * 8 * ... * 1 = 3,628,800, exactly the number of permutations of an array with 10 distinct elements.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть» - там приведены конкретные значения факториала.',
        en: 'See the second paragraph of the "Deep dive" section on the "Intent" tab - it lists concrete factorial values.',
      },
    },
    {
      question: {
        ru: 'Зачем в реализации `permute` элементы меняются местами дважды - до и после рекурсивного вызова?',
        en: 'Why does the `permute` implementation swap elements twice, before and after the recursive call?',
      },
      options: [
        { ru: 'Второй обмен - откат, который возвращает массив к состоянию до этой итерации', en: 'The second swap is the backtrack, restoring the array to its state before this iteration' },
        { ru: 'Второй обмен нужен только для ускорения работы сборщика мусора внутри движка языка', en: 'The second swap only exists to speed up garbage collection inside the language engine itself' },
        { ru: 'Это ошибка в реализации, которую можно безопасно убрать без каких-либо последствий', en: 'This is an implementation bug that can be safely removed with absolutely no consequences' },
        { ru: 'Второй обмен меняет местами два случайных элемента ради проверки корректности кода', en: 'The second swap exchanges two random elements purely as a code correctness sanity check' },
      ],
      correct: 0,
      explanation: {
        ru: 'Без отката следующая итерация цикла продолжила бы работать с уже изменённым массивом, и часть перестановок оказалась бы пропущена или продублирована.',
        en: 'Without the backtrack, the next loop iteration would keep working on an already-modified array, and some permutations would end up skipped or duplicated.',
      },
      hint: {
        ru: 'Смотрите шаг «Откат - возвращаем массив как было» на вкладке «Реализация».',
        en: 'See the "Backtracking - restoring the array" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'При n = 20 во сколько примерно раз O(n!) больше O(2ⁿ)?',
        en: 'At n = 20, roughly how many times larger is O(n!) than O(2^n)?',
      },
      options: [
        { ru: 'Больше чем в два триллиона раз', en: 'More than two trillion times larger' },
        { ru: 'Примерно в два раза', en: 'Roughly twice as large' },
        { ru: 'Примерно в двадцать раз', en: 'Roughly twenty times as large' },
        { ru: 'Они равны при n = 20 и расходятся только позже', en: 'They are equal at n = 20 and only diverge later' },
      ],
      correct: 0,
      explanation: {
        ru: 'При n = 20 O(2ⁿ) даёт 1 048 576, а O(n!) - около 2.4 квинтиллиона: разрыв больше двух триллионов раз, и он продолжает расти с увеличением n.',
        en: 'At n = 20, O(2^n) gives 1,048,576 while O(n!) gives about 2.4 quintillion: a gap of more than two trillion times, and it keeps growing as n increases.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - про сравнение с O(2ⁿ).',
        en: 'See the third paragraph of the "Deep dive" section on the "Intent" tab - about the comparison with O(2^n).',
      },
    },
    {
      question: {
        ru: 'В чём разница между «перебрать все подмножества» (O(2ⁿ)) и «перебрать все порядки» (O(n!)) одного и того же множества?',
        en: 'What is the difference between "enumerate all subsets" (O(2^n)) and "enumerate all orderings" (O(n!)) of the same set?',
      },
      options: [
        { ru: 'Подмножеств 2ⁿ, а для каждого набора есть ещё n! способов его расставить', en: 'There are 2^n subsets, and for each set there are additionally n! ways to arrange it' },
        { ru: 'Это два разных названия для абсолютно одной и той же математической величины полностью', en: 'These are two different names for exactly the same mathematical quantity, nothing more' },
        { ru: 'O(2ⁿ) считает порядки, а O(n!) - наборы элементов совершенно без учёта порядка', en: 'O(2^n) counts orderings, while O(n!) counts sets of elements with order fully ignored' },
        { ru: 'Разница есть только для множеств с повторяющимися элементами внутри самого набора', en: 'The difference only exists for sets that contain repeated elements inside them' },
      ],
      correct: 0,
      explanation: {
        ru: 'Подмножеств множества из n элементов - 2ⁿ, а упорядочиваний - n!, потому что для каждого подмножества-набора есть ещё все способы его расставить по порядку.',
        en: 'A set of n elements has 2^n subsets, and n! orderings, because for each subset-as-a-set there are additionally all the ways to arrange it in order.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть» - про разницу подмножеств и упорядочиваний.',
        en: 'See the fourth paragraph of the "Deep dive" section on the "Intent" tab - about the difference between subsets and orderings.',
      },
    },
    {
      question: {
        ru: 'Как алгоритм Хелда-Карпа избегает полного факториального перебора в задаче коммивояжёра?',
        en: 'How does the Held-Karp algorithm avoid a full factorial enumeration in the traveling salesman problem?',
      },
      options: [
        { ru: 'Переформулирует задачу через подмножества посещённых городов вместо полного порядка', en: 'It reframes the problem in terms of subsets of visited cities instead of a full ordering' },
        { ru: 'Полностью убирает необходимость посещать все города в рамках одного маршрута целиком', en: 'It fully removes the need to visit every city within a single route altogether' },
        { ru: 'Заменяет точный ответ случайным приближением без каких-либо гарантий корректности', en: 'It replaces the exact answer with a random approximation carrying no correctness guarantees' },
        { ru: 'Ограничивает задачу только городами, расположенными строго на одной прямой линии', en: 'It restricts the problem to cities that lie strictly along a single straight line' },
      ],
      correct: 0,
      explanation: {
        ru: 'Хелд-Карп хранит состояние как «набор уже посещённых городов + последний город», а не полный порядок обхода - это сводит O(n!) к O(n² · 2ⁿ).',
        en: 'Held-Karp tracks state as "set of cities visited so far plus the last city", not the full visiting order, which reduces O(n!) to O(n^2 * 2^n).',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» - про сведение к O(n² · 2ⁿ).',
        en: 'See the fifth paragraph of the "Deep dive" section on the "Intent" tab - about the reduction to O(n^2 * 2^n).',
      },
    },
    {
      question: {
        ru: 'Почему отсечение симметричных перестановок (при повторяющихся элементах) не меняет Big O в общем случае?',
        en: 'Why does pruning symmetric permutations (when elements repeat) not change the Big O in the general case?',
      },
      options: [
        { ru: 'При всех различных элементах симметрий нет, и перебирать всё равно нужно все n!', en: 'With all-distinct elements there is no symmetry, and all n! still need to be enumerated' },
        { ru: 'Отсечение симметрий физически невозможно реализовать ни в каком реальном коде', en: 'Pruning symmetries is physically impossible to implement in any real code at all' },
        { ru: 'Оно всегда меняет Big O с O(n!) на O(n log n) независимо от входных данных целиком', en: 'It always changes the Big O from O(n!) to O(n log n) regardless of the input data entirely' },
        { ru: 'Симметричные перестановки в принципе не существуют ни при каких входных данных вообще', en: 'Symmetric permutations do not exist in principle for any input data whatsoever, ever' },
      ],
      correct: 0,
      explanation: {
        ru: 'Big O описывает худший случай, а худший случай для перестановок - это набор из полностью различных элементов, где отсекать нечего.',
        en: 'Big O describes the worst case, and the worst case for permutations is a set of entirely distinct elements, where there is nothing to prune.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» на вкладке «Суть» - про отсечение симметричных перестановок.',
        en: 'See the closing paragraph of the "Deep dive" section on the "Intent" tab - about pruning symmetric permutations.',
      },
    },
    {
      question: {
        ru: 'Нужно найти доказуемо оптимальный порядок обхода 6 точек курьером. Какой подход подходит лучше всего?',
        en: 'A courier needs the provably optimal order to visit 6 stops. Which approach fits best?',
      },
      options: [
        { ru: 'Полный перебор всех 6! = 720 маршрутов - на таком n это ещё выполнимо', en: 'A full enumeration of all 6! = 720 routes - still feasible at this n' },
        { ru: 'Жадная эвристика ближайшего соседа без каких-либо гарантий оптимальности', en: 'A greedy nearest-neighbor heuristic with no optimality guarantee whatsoever' },
        { ru: 'Случайная перестановка точек без последующей проверки результата', en: 'A random shuffle of the stops with no verification of the result afterward' },
        { ru: 'Игнорирование части точек ради ускорения общего расчёта маршрута', en: 'Ignoring some of the stops in order to speed up the overall route calculation' },
      ],
      correct: 0,
      explanation: {
        ru: 'На n = 6 полный перебор 720 маршрутов выполняется мгновенно и даёт гарантированный оптимум - именно та ситуация, где O(n!) ещё практична.',
        en: 'At n = 6, a full enumeration of 720 routes runs instantly and produces a guaranteed optimum, exactly the situation where O(n!) is still practical.',
      },
      hint: {
        ru: 'Смотрите первый пункт «Когда применять» на вкладке «Суть» - про гарантированно крошечное n.',
        en: 'See the first "When to use" item on the "Intent" tab - about a guaranteed tiny n.',
      },
    },
    {
      question: {
        ru: 'Нужно найти доказуемо оптимальный маршрут для 40 городов. Почему полный перебор перестановок здесь неприемлем?',
        en: 'A provably optimal route is needed for 40 cities. Why is a full permutation enumeration unacceptable here?',
      },
      options: [
        { ru: '40! - астрономическое число, недостижимое даже за всё время существования Вселенной', en: '40! is an astronomical number, unreachable even within the entire lifetime of the universe' },
        { ru: 'При n = 40 факториальный перебор на самом деле быстрее любого другого известного подхода', en: 'At n = 40 a factorial enumeration is actually faster than any other known approach available' },
        { ru: '40 городов - это слишком мало для того, чтобы перестановки вообще существовали в принципе', en: '40 cities is too few for permutations to even exist in the first place, in principle' },
        { ru: 'Задача при 40 городах перестаёт быть NP-полной и становится строго линейной по n', en: 'At 40 cities the problem stops being NP-complete and becomes strictly linear in n' },
      ],
      correct: 0,
      explanation: {
        ru: '40! - число из 48 цифр, многократно превышающее возраст Вселенной в наносекундах даже при переборе триллионов вариантов в секунду - здесь нужен Хелд-Карп или эвристики, а не прямой перебор.',
        en: '40! is a 48-digit number, vastly exceeding the age of the universe in nanoseconds even at trillions of checks per second - this calls for Held-Karp or heuristics, not direct enumeration.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть» - про конкретные значения факториала на больших n.',
        en: 'See the second paragraph of the "Deep dive" section on the "Intent" tab - about concrete factorial values at large n.',
      },
    },
  ],
};

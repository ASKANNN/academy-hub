export const baseCase = {
  slug: 'base-case',
  category: 'recursion',
  name: { ru: 'Базовый случай', en: 'Base Case' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(n)',
  },
  popularity: 3,
  tags: ['base-case', 'linear-recursion', 'call-stack'],

  intent: {
    ru: 'Базовый случай (Base Case) - условие, при котором рекурсивная функция отвечает сразу, не вызывая себя ещё раз. Рекурсивная функция решает задачу, вызывая себя на задаче поменьше, и базовый случай - та самая маленькая задача, ответ на которую известен заранее. Без него вызовы не кончаются, пока не кончится стек. Здесь обе части любой рекурсии - базовый случай и рекурсивный шаг - разобраны на факториале.',
    en: 'A base case is the condition under which a recursive function answers right away, without calling itself again. A recursive function solves a problem by calling itself on a smaller version of it, and the base case is that smallest version, whose answer is known up front. Without one the calls never end until the stack runs out. This page takes apart both halves of any recursion - the base case and the recursive step - on the factorial.',
  },

  problem: {
    ru: '**Факториал** `n!` - произведение всех целых чисел от 1 до `n`: `5! = 1 × 2 × 3 × 4 × 5 = 120`, а `0! = 1` по определению (произведение без множителей). Он считает, сколькими способами можно выстроить `n` предметов в ряд. Многие задачи естественно описываются через самих себя: `n!` - это `n × (n - 1)!`, папка - это файлы и папки внутри неё, JSON-массив - это элементы, каждый из которых тоже может быть массивом. Записать такое определение в код буквально - значит написать функцию, которая вызывает сама себя. Но правило «`n! = n × (n - 1)!`» само по себе не кончается: `(n - 1)!` снова раскрывается, и так без конца. В математике его останавливает отдельная строка «`0! = 1`». В коде без такой строки каждый вызов делает следующий, пока не кончится память под вызовы: `RangeError: Maximum call stack size exceeded` в JavaScript, `RecursionError` в Python.',
    en: 'The **factorial** `n!` is the product of all integers from 1 to `n`: `5! = 1 × 2 × 3 × 4 × 5 = 120`, and `0! = 1` by definition (a product with no factors). It counts the ways to line up `n` items in a row. Many problems are naturally described in terms of themselves: `n!` is `n × (n - 1)!`, a folder is the files and folders inside it, a JSON array is elements, any of which can be an array too. Writing such a definition into code literally means writing a function that calls itself. But the rule "`n! = n × (n - 1)!`" does not end on its own: `(n - 1)!` unfolds again, and so on forever. In maths a separate line, "`0! = 1`", stops it. In code without such a line every call makes the next one until the memory for calls runs out: `RangeError: Maximum call stack size exceeded` in JavaScript, `RecursionError` in Python.',
  },

  solution: {
    ru: 'Рекурсивная функция состоит из двух частей. **Базовый случай** - проверка в начале: если задача уже настолько мала, что ответ известен (`n <= 1` - ответ 1), функция сразу его возвращает. **Рекурсивный шаг** - всё остальное: свести задачу к меньшей (`factorial(n - 1)`), дождаться её ответа и достроить свой (`n * ...`). Чтобы рекурсия закончилась, нужно ещё одно условие: каждый шаг обязан **приближать** аргумент к базовому случаю. Для целого `n >= 1` вычитание единицы за `n - 1` шагов приводит к 1 (в `Number` - пока `n` не больше 2⁵³). Проверка `n <= 1`, а не `n === 0`, останавливает и на 1, и на 0, и на отрицательных - но для `-1` или `2.5` возвращает бессмысленное число вместо ошибки. Поэтому вход проверяется один раз снаружи, в `checkedFactorial`, а не на каждом уровне рекурсии.',
    en: 'A recursive function has two parts. The **base case** is a check at the start: if the problem is already so small that the answer is known (`n <= 1` - the answer is 1), the function returns it at once. The **recursive step** is everything else: reduce the problem to a smaller one (`factorial(n - 1)`), wait for its answer and build your own on top (`n * ...`). For the recursion to end, one more condition is needed: every step must bring the argument **closer** to the base case. For an integer `n >= 1`, subtracting one reaches 1 in `n - 1` steps (in a `Number`, as long as `n` is at most 2⁵³). The check `n <= 1` rather than `n === 0` stops at 1, at 0 and at negatives too - but for `-1` or `2.5` it returns a meaningless number instead of an error. That is why the input is checked once, outside, in `checkedFactorial`, and not at every level of the recursion.',
  },

  steps: [
    {
      title: { ru: 'Первый вызов: ответ пока неизвестен', en: 'The first call: no answer yet' },
      explanation: {
        ru: 'Вызов `factorial(5)` кладёт на стек первый кадр - свою копию переменной `n = 5`. Проверка `5 <= 1` не проходит: сразу ответить нельзя. Функция откладывает умножение `5 × ?`, пока не узнает `factorial(4)`.',
        en: 'The call `factorial(5)` puts the first frame on the stack - its own copy of the variable `n = 5`. The check `5 <= 1` fails: there is no answer yet. The function puts off the multiplication `5 × ?` until it knows `factorial(4)`.',
      },
    },
    {
      title: { ru: 'Рекурсивный шаг: та же задача, но меньше', en: 'The recursive step: the same problem, smaller' },
      explanation: {
        ru: 'Каждый вызов делает новый, с `n - 1`: `factorial(4)`, `factorial(3)`, `factorial(2)`. Новый кадр ложится на стек поверх старого, а старый ждёт с недосчитанным умножением. В дереве активный вызов залит, ждущие обведены сплошной линией, а ещё не сделанные - пунктиром.',
        en: 'Every call makes a new one with `n - 1`: `factorial(4)`, `factorial(3)`, `factorial(2)`. The new frame goes on the stack on top of the old one, and the old one waits with its multiplication unfinished. In the tree the active call is filled, waiting calls have a solid outline, and calls not made yet a dashed one.',
      },
    },
    {
      title: { ru: 'Базовый случай останавливает спуск', en: 'The base case stops the descent' },
      explanation: {
        ru: 'В `factorial(1)` проверка `1 <= 1` проходит, и функция возвращает 1, не вызывая себя. Это единственное место, где ответ известен без нового вызова: без него спуск дошёл бы до переполнения стека. В демо это пятый вызов и самый глубокий момент - на стеке пять кадров.',
        en: 'In `factorial(1)` the check `1 <= 1` passes, and the function returns 1 without calling itself. It is the only place where the answer is known without another call: without it the descent would run until the stack overflowed. In the demo this is the fifth call and the deepest moment - five frames on the stack.',
      },
    },
    {
      title: { ru: 'Подъём: каждый кадр досчитывает своё', en: 'On the way back each frame finishes its own work' },
      explanation: {
        ru: 'Ответ возвращается тому, кто его ждал: `factorial(2) = 2 × 1 = 2`, затем `3 × 2 = 6`, `4 × 6 = 24`, `5 × 24 = 120`. Вернувший кадр снимается со стека, а в дереве вызов остаётся - зелёным, со своим значением. Умножения идут в обратном порядке: первым досчитывает `factorial(2)`, самый глубокий из ждущих.',
        en: 'The answer goes back to whoever was waiting for it: `factorial(2) = 2 × 1 = 2`, then `3 × 2 = 6`, `4 × 6 = 24`, `5 × 24 = 120`. A frame that has returned leaves the stack, while the call stays in the tree - green, with its value. The multiplications run in reverse order: `factorial(2)`, the deepest of the waiting calls, finishes first.',
      },
    },
    {
      title: { ru: 'Ответ и его цена', en: 'The answer and what it cost' },
      explanation: {
        ru: '`factorial(5) = 120`: пять вызовов и пять кадров на стеке в самый глубокий момент. И время, и память растут вместе с `n` - O(n) по обоим, тогда как цикл обошёлся бы O(1) памяти. «Другое n» запускает демо для n от 0 до 6; при `n = 0` и `n = 1` уже первый вызов - базовый случай.',
        en: '`factorial(5) = 120`: five calls and five frames on the stack at the deepest moment. Both time and memory grow with `n` - O(n) for each, where a loop would need O(1) memory. "Another n" runs the demo for n from 0 to 6; for `n = 0` and `n = 1` the very first call is the base case.',
      },
    },
  ],

  implementation: {
    javascript: `function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function checkedFactorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(\`factorial needs an integer >= 0, got \${n}\`);
  }
  return factorial(n);
}`,
    python: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)


def checked_factorial(n):
    if not isinstance(n, int) or n < 0:
        raise ValueError(f"factorial needs an integer >= 0, got {n!r}")
    return factorial(n)`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Функция, которая вызовет сама себя', en: 'A function that will call itself' },
        explanation: {
          ru: '`factorial` принимает одно число `n`. Ничего особенного в объявлении нет: рекурсивной функцию делает только то, что внутри тела есть вызов `factorial`. Каждый такой вызов получит свою копию `n`.',
          en: '`factorial` takes one number, `n`. There is nothing special about the declaration: the function is recursive only because its body contains a call to `factorial`. Every such call gets its own copy of `n`.',
        },
      },
      {
        lines: [2, 4],
        title: { ru: 'Базовый случай', en: 'The base case' },
        explanation: {
          ru: 'Если `n` равно 1 или меньше, ответ известен: `1! = 0! = 1`, и функция возвращает 1, не вызывая себя. Проверка стоит первой, до рекурсивного вызова, - иначе до неё бы никогда не дошло. `<=`, а не `=== 0`, останавливает рекурсию на один вызов раньше и на любом числе не больше 1.',
          en: 'If `n` is 1 or less, the answer is known: `1! = 0! = 1`, and the function returns 1 without calling itself. The check comes first, before the recursive call - otherwise it would never be reached. `<=` rather than `=== 0` stops the recursion one call earlier and on any number not above 1.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Рекурсивный шаг: задача поменьше', en: 'The recursive step: a smaller problem' },
        explanation: {
          ru: '`factorial(n - 1)` - та же задача для числа на единицу меньше. Пока этот вызов не вернётся, текущий стоит на стеке и ждёт. Именно `n - 1` приближает аргумент к базовому случаю: шаг, который аргумент не уменьшает, зациклился бы.',
          en: '`factorial(n - 1)` is the same problem for a number one smaller. Until that call returns, the current one sits on the stack and waits. It is `n - 1` that moves the argument towards the base case: a step that did not shrink it would loop forever.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Достроить свой ответ', en: 'Build your own answer on top' },
        explanation: {
          ru: 'Когда `factorial(n - 1)` вернул число, остаётся умножить его на своё `n`. Умножение выполняется уже на обратном пути: сначала в `factorial(2)` (`2 × 1`), последним - в первом вызове (`5 × 24`).',
          en: 'Once `factorial(n - 1)` has returned a number, all that is left is to multiply it by this call\'s own `n`. The multiplication happens on the way back: first in `factorial(2)` (`2 × 1`), last in the first call (`5 × 24`).',
        },
      },
      {
        lines: [8],
        title: { ru: 'Обёртка для проверки входа', en: 'A wrapper that checks the input' },
        explanation: {
          ru: '`checkedFactorial` - то, что стоит вызывать снаружи. Она проверяет аргумент один раз и передаёт его в `factorial`. Внутри рекурсии проверять повторно незачем: из целого `n >= 2` вычитание единицы даёт целое `n >= 1`.',
          en: '`checkedFactorial` is what callers from outside should use. It checks the argument once and hands it to `factorial`. There is no point checking again inside the recursion: subtracting one from an integer `n >= 2` gives an integer `n >= 1`.',
        },
      },
      {
        lines: [9, 11],
        title: { ru: 'Отсечь то, что базовый случай поймает неправильно', en: 'Reject what the base case would catch wrongly' },
        explanation: {
          ru: '`factorial(-1)` вернул бы 1, а `factorial(2.5)` - 3.75: проверка `n <= 1` их останавливает, но ответ бессмысленный. `NaN` вообще не остановился бы: `NaN <= 1` ложно, а `NaN - 1` - снова `NaN`. `Number.isInteger` отсекает дроби, `NaN`, `Infinity` и не-числа вроде строки `\'5\'`, `n < 0` - отрицательные.',
          en: '`factorial(-1)` would return 1 and `factorial(2.5)` 3.75: the check `n <= 1` stops them, but the answer is meaningless. `NaN` would not stop at all: `NaN <= 1` is false, and `NaN - 1` is `NaN` again. `Number.isInteger` rejects fractions, `NaN`, `Infinity` and non-numbers such as the string `\'5\'`, and `n < 0` rejects negatives.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Передать дальше', en: 'Pass it on' },
        explanation: {
          ru: 'Проверенный аргумент уходит в рекурсию. Проверка не защищает от двух пределов: уже `171!` в типе `Number` - это `Infinity`, а очень большое целое упрётся в размер стека и бросит `RangeError` о переполнении стека - другого рода, чем ошибка из строки 10.',
          en: 'The checked argument goes into the recursion. The check does not guard against two limits: `171!` is already `Infinity` in the `Number` type, and a very large integer runs into the stack size and throws a stack-overflow `RangeError` - a different kind from the one on line 10.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Функция, которая вызовет сама себя', en: 'A function that will call itself' },
        explanation: {
          ru: '`factorial` принимает одно число `n`. Рекурсивной её делает только вызов `factorial` внутри тела. Каждый вызов получает свою копию `n`.',
          en: '`factorial` takes one number, `n`. It is recursive only because of the call to `factorial` inside the body. Every call gets its own copy of `n`.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Базовый случай', en: 'The base case' },
        explanation: {
          ru: 'При `n <= 1` ответ известен - 1, и функция возвращает его, не вызывая себя. Проверка стоит до рекурсивного вызова, иначе до неё бы не дошло.',
          en: 'For `n <= 1` the answer is known - 1 - and the function returns it without calling itself. The check comes before the recursive call, or it would never be reached.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Рекурсивный шаг и обратный путь', en: 'The recursive step and the way back' },
        explanation: {
          ru: '`factorial(n - 1)` - та же задача на единицу меньше, и текущий вызов ждёт её ответа на стеке. Когда ответ пришёл, остаётся умножить его на своё `n`. Целые числа в Python не переполняются: `factorial(500)` - число из 1135 цифр, и первым упирается не число, а глубина.',
          en: '`factorial(n - 1)` is the same problem one smaller, and the current call waits on the stack for its answer. Once it arrives, all that is left is to multiply by this call\'s own `n`. Python integers do not overflow: `factorial(500)` is a 1135-digit number, so what runs out first is depth, not the number.',
        },
      },
      {
        lines: [7],
        title: { ru: 'Обёртка для проверки входа', en: 'A wrapper that checks the input' },
        explanation: {
          ru: '`checked_factorial` проверяет аргумент один раз и передаёт его в `factorial`. Внутри рекурсии проверять повторно незачем: из целого `n >= 2` вычитание единицы даёт целое `n >= 1`.',
          en: '`checked_factorial` checks the argument once and hands it to `factorial`. There is no point checking again inside the recursion: subtracting one from an integer `n >= 2` gives an integer `n >= 1`.',
        },
      },
      {
        lines: [8, 9],
        title: { ru: 'Отсечь то, что базовый случай поймает неправильно', en: 'Reject what the base case would catch wrongly' },
        explanation: {
          ru: '`factorial(-1)` вернул бы 1, `factorial(2.5)` - 3.75, а `float(\'nan\')` не остановился бы никогда. `isinstance(n, int)` отсекает дроби и строки, `n < 0` - отрицательные. `True` - тоже `int` в Python и пройдёт как 1, так же, как в `math.factorial(True)`.',
          en: '`factorial(-1)` would return 1, `factorial(2.5)` 3.75, and `float(\'nan\')` would never stop. `isinstance(n, int)` rejects fractions and strings, `n < 0` rejects negatives. `True` is an `int` in Python too and passes as 1, the same as in `math.factorial(True)`.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Передать дальше', en: 'Pass it on' },
        explanation: {
          ru: 'Проверенный аргумент уходит в рекурсию. От предела глубины проверка не спасает: при пределе 1000 по умолчанию `checked_factorial(999)` из модуля бросает `RecursionError` - обёртка сама занимает один кадр, и `factorial` достаётся на один меньше.',
          en: 'The checked argument goes into the recursion. The check does not protect against the depth limit: with the default limit of 1000, `checked_factorial(999)` called from a module raises `RecursionError` - the wrapper takes one frame itself, leaving `factorial` one fewer.',
        },
      },
    ],
  },

  pros: [
    {
      ru: '**Код повторяет определение**: `n! = n × (n - 1)!` и `1! = 1` - две строки, которые можно сверить с математикой по одной.',
      en: '**The code mirrors the definition**: `n! = n × (n - 1)!` and `1! = 1` - two lines you can check against the maths one at a time.',
    },
    {
      ru: '**Корректность проверяется по частям**, как индукция: базовый случай верен сам по себе, а шаг верен, если верен ответ на меньшую задачу.',
      en: '**Correctness is checked piece by piece**, like induction: the base case is right on its own, and the step is right if the answer to the smaller problem is.',
    },
    {
      ru: '**Та же схема подходит для вложенных данных** - папок, деревьев, JSON, - где у цикла нет одного счётчика, по которому идти.',
      en: '**The same scheme fits nested data** - folders, trees, JSON - where a loop has no single counter to walk along.',
    },
  ],

  cons: [
    {
      ru: '**Каждый ждущий вызов держит кадр стека**: память O(n), а не O(1), как у цикла, и глубина ограничена - в Python 1000 по умолчанию, в Node для этой функции примерно от 8,9 до 15,6 тысячи.',
      en: '**Every waiting call holds a stack frame**: O(n) memory rather than a loop\'s O(1), and the depth is capped - 1000 by default in Python, about 8.9 to 15.6 thousand for this function in Node.',
    },
    {
      ru: '**Ошибка в базе или шаге часто видна только на редких входах** - дробных, отрицательных, `NaN` - и проявляется то падением по стеку, то молча неверным ответом.',
      en: '**A mistake in the base or the step often shows only on rare inputs** - fractions, negatives, `NaN` - and turns up now as a stack crash, now as a silently wrong answer.',
    },
    {
      ru: '**Вызов дороже шага цикла**: в замере на `n = 20` рекурсивный факториал медленнее цикла примерно в 9 раз в Node и в 1.7 раза в Python.',
      en: '**A call costs more than a loop step**: measured at `n = 20`, the recursive factorial is about 9 times slower than a loop in Node and 1.7 times slower in Python.',
    },
  ],

  whenToUse: [
    {
      ru: '**Данные определены через себя** - дерево, папка с подпапками, вложенный JSON: базовый случай - лист или пустой узел, шаг - каждый ребёнок.',
      en: '**The data is defined in terms of itself** - a tree, a folder with subfolders, nested JSON: the base case is a leaf or an empty node, the step is each child.',
    },
    {
      ru: '**Глубина заведомо небольшая** - десятки или сотни уровней. Для факториала или суммы длинного списка, где глубина равна `n`, цикл надёжнее.',
      en: '**The depth is known to be small** - tens or hundreds of levels. For a factorial or the sum of a long list, where the depth equals `n`, a loop is safer.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**CPython** в `math.factorial` считает не `n × (n - 1)!`: функция `factorial_partial_product` в `Modules/mathmodule.c` рекурсивно делит диапазон множителей пополам, а базовый случай - кусок, произведение которого помещается в машинное целое. Глубина такой рекурсии - логарифм, а не `n`.',
      en: '**CPython** in `math.factorial` does not compute `n × (n - 1)!`: the function `factorial_partial_product` in `Modules/mathmodule.c` recursively splits the range of factors in half, and the base case is a piece whose product fits in a machine integer. The depth of that recursion is a logarithm, not `n`.',
    },
    {
      ru: '**Копирование вложенных данных** - `JSON.stringify` и `structuredClone` в V8, `copy.deepcopy` в Python - устроено так же: базовый случай - простое значение вроде числа или строки, шаг - каждый элемент. Поэтому массив вложенностью 100 000 они не переживают: в Node 24 оба бросают `RangeError`, а `deepcopy` падает с `RecursionError` уже на вложенности 5000.',
      en: '**Copying nested data** - `JSON.stringify` and `structuredClone` in V8, `copy.deepcopy` in Python - works the same way: the base case is a plain value such as a number or a string, the step is each element. That is why they do not survive an array nested 100,000 deep: in Node 24 both throw `RangeError`, and `deepcopy` fails with `RecursionError` already at a depth of 5000.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: '**Рекурсия гарантированно заканчивается**, когда выполнены три условия: базовый случай есть, он проверяется раньше рекурсивного вызова, и каждый шаг приближает аргумент к нему. Первые два видны в коде сразу. Третье - свойство входа, а не одной строки, и именно оно обычно и ломается.',
        en: '**A recursion is sure to end** when three conditions hold: there is a base case, it is checked before the recursive call, and every step brings the argument closer to it. The first two are visible in the code at a glance. The third is a property of the input, not of one line, and it is the one that usually breaks.',
      },
      {
        ru: '**Ход по кадрам** для `factorial(5)`: пять вызовов - 5, 4, 3, 2, 1 - ложатся на стек друг на друга, и в момент проверки `1 <= 1` все пять живы. Потом стек разматывается: `2 × 1`, `3 × 2`, `4 × 6`, `5 × 24`. Четыре умножения, и все они на обратном пути. Ни одно не может выполниться раньше: каждому нужен ответ вызова, который ещё не вернулся.',
        en: '**The run frame by frame** for `factorial(5)`: five calls - 5, 4, 3, 2, 1 - pile up on the stack, and at the moment of the check `1 <= 1` all five are alive. Then the stack unwinds: `2 × 1`, `3 × 2`, `4 × 6`, `5 × 24`. Four multiplications, all on the way back. None can happen earlier: each needs the answer of a call that has not returned yet.',
      },
      {
        ru: '**Какую проверку выбрать**: `n <= 1` или `n === 0`? Для целых `n >= 0` обе версии дают верный ответ, но `=== 0` делает на один вызов больше: `factorial(1)` ещё вызывает `factorial(0)`. Важнее другое: `=== 0` не останавливается на `2.5` и `-1`: первое проскакивает ноль, второе уходит от него, и вызовы идут до `RangeError`. `<= 1` останавливается на любом числе не больше 1, но молча возвращает 1 для `-1` и 3.75 для `2.5`. Ни одна проверка не справляется с плохим входом сама, поэтому он отсекается отдельно, один раз.',
        en: '**Which check to pick**: `n <= 1` or `n === 0`? For integers `n >= 0` both give the right answer, but `=== 0` makes one more call: `factorial(1)` still calls `factorial(0)`. More important: `=== 0` does not stop at `2.5` or `-1`: the first skips past zero, the second moves away from it, and the calls go on until `RangeError`. `<= 1` stops at any number not above 1, but silently returns 1 for `-1` and 3.75 for `2.5`. Neither check handles bad input by itself, so it is rejected separately, once.',
      },
      {
        ru: '**«Шаг приближает к базе» верно не для любого числа.** Для `NaN` проверка `NaN <= 1` ложна, а `NaN - 1` - снова `NaN`. Для `1e300` вычитание единицы вообще ничего не меняет: `1e300 - 1 === 1e300`, потому что у `double` около 16 значащих цифр. Это целое число, поэтому `checkedFactorial(1e300)` его пропускает - и получает `RangeError` о переполнении стека, а не о неверном аргументе. Так же ведёт себя Python: для `1e300` и для `nan` - `RecursionError`.',
        en: '**"The step moves towards the base" is not true for every number.** For `NaN` the check `NaN <= 1` is false, and `NaN - 1` is `NaN` again. For `1e300` subtracting one changes nothing at all: `1e300 - 1 === 1e300`, because a `double` has about 16 significant digits. It is an integer, so `checkedFactorial(1e300)` lets it through - and gets a stack-overflow `RangeError`, not an invalid-argument one. Python behaves the same: `RecursionError` for both `1e300` and `nan`.',
      },
      {
        ru: '**Предел глубины в Node** - не число вызовов, а размер стека в байтах: у V8 флаг `--stack-size` по умолчанию 984 КБ. Сколько вызовов в него влезает, зависит от размера кадра, а кадр меняется, когда V8 оптимизирует функцию. В Node 24.11 этот `factorial` в свежем процессе проходит до `n = 8897`, после прогрева - до 12 455, после долгого прогрева - до 15 565; пустая рекурсивная функция успевает около 10 400 вызовов. Поднять `--stack-size` выше стека потока ОС нельзя: при 9000 КБ и `ulimit -s` 8176 КБ процесс падает с segfault, а не с `RangeError`.',
        en: '**The depth limit in Node** is not a number of calls but a stack size in bytes: V8\'s `--stack-size` flag defaults to 984 KB. How many calls fit depends on the frame size, and the frame changes when V8 optimizes the function. In Node 24.11 this `factorial` gets to `n = 8897` in a fresh process, to 12,455 after warming up, and to 15,565 after a long warm-up; an empty recursive function manages about 10,400 calls. Raising `--stack-size` past the OS thread stack does not work: at 9000 KB with `ulimit -s` at 8176 KB the process dies with a segfault, not a `RangeError`.',
      },
      {
        ru: '**В Python предел считается в вызовах**: `sys.getrecursionlimit()` по умолчанию 1000. Из модуля `factorial(999)` проходит, `factorial(1000)` бросает `RecursionError` - один кадр занят самим модулем. С версии 3.12 предел касается только кода на Python: кадры таких функций лежат в куче, и после `sys.setrecursionlimit(10**8)` простая рекурсивная функция в нашем замере прошла 3 000 000 уровней. Код на C ограничен отдельно: `json.loads` на вложенности 200 000 бросает `RecursionError` при любом поднятом пределе.',
        en: '**In Python the limit is counted in calls**: `sys.getrecursionlimit()` is 1000 by default. From a module `factorial(999)` passes and `factorial(1000)` raises `RecursionError` - one frame is taken by the module itself. Since 3.12 the limit applies only to Python code: the frames of such functions live on the heap, and after `sys.setrecursionlimit(10**8)` a simple recursive function went 3,000,000 levels deep in our test. C code is capped separately: `json.loads` raises `RecursionError` at a nesting of 200,000 whatever the limit is raised to.',
      },
      {
        ru: '**Число тоже кончается**, и в JavaScript раньше стека. `Number` хранит факториал точно до `22!`, `23!` уже округлён, а `171!` - `Infinity`. Python считает в целых произвольной длины, и там первым кончается глубина. Сложность при этом одинаковая: `n` вызовов, `n - 1` умножений и до `n` кадров одновременно, то есть O(n) по времени и O(n) по памяти. В Python O(n) - это число вызовов: сами умножения больших целых дорожают с ростом числа.',
        en: '**The number runs out too**, and in JavaScript before the stack does. `Number` holds the factorial exactly up to `22!`, `23!` is already rounded, and `171!` is `Infinity`. Python computes with arbitrary-length integers, and there depth runs out first. The complexity is the same either way: `n` calls, `n - 1` multiplications and up to `n` frames at once, that is O(n) time and O(n) memory. In Python the O(n) counts calls: the multiplications of big integers themselves get dearer as the number grows.',
      },
      {
        ru: '**Итог**: базовый случай - не формальность, а то, что превращает определение в вычисление. Цикл `for (let i = 2; i <= n; i++)` считает тот же факториал за O(1) памяти и без предела глубины. Рекурсия выигрывает там, где у задачи нет одного счётчика, - в деревьях и вложенных данных, - и там тоже начинается с вопроса «какой вход самый маленький и что на нём ответить».',
        en: '**In short**: the base case is not a formality but what turns a definition into a computation. The loop `for (let i = 2; i <= n; i++)` computes the same factorial with O(1) memory and no depth limit. Recursion wins where the problem has no single counter - in trees and nested data - and there too it starts with the question "what is the smallest input, and what is the answer on it".',
      },
    ],
    whenToUse: [
      {
        ru: '**Рекурсия или цикл для факториала**: цикл. Глубина рекурсии равна `n`, память O(n) против O(1), а в замере на `n = 20` цикл быстрее в разы. Рекурсивная версия хороша, чтобы увидеть механику, а не для продакшена.',
        en: '**Recursion or a loop for the factorial**: a loop. The recursion depth equals `n`, O(n) memory against O(1), and measured at `n = 20` the loop is several times faster. The recursive version is good for seeing the mechanics, not for production.',
      },
      {
        ru: '**Сколько базовых случаев нужно**: столько, сколько разных «самых маленьких» входов может дать шаг. Шаг `n - 1` от целого сходится к 1 - хватает одного. Шаг, который берёт `n - 1` и `n - 2`, как у чисел Фибоначчи, может прийти и к 1, и к 0 - покрыть нужно оба, хотя бы одной проверкой `n <= 1`. У обхода дерева база - пустой узел, у поиска по отрезку - пустой отрезок.',
        en: '**How many base cases you need**: as many as there are distinct "smallest" inputs the step can produce. The step `n - 1` from an integer converges to 1 - one is enough. A step that takes `n - 1` and `n - 2`, like Fibonacci\'s, can land on either 1 or 0 - both must be covered, if only by one check `n <= 1`. For a tree walk the base is an empty node, for a search over a range an empty range.',
      },
      {
        ru: '**Глубина важнее общего числа вызовов**: предел стека считает только вызовы, которые ещё не вернулись. Обход сбалансированного дерева из миллиона узлов делает миллион вызовов, но глубина - около 20 (`log2` от 10⁶), и это безопасно. Сумма списка из 50 000 элементов рекурсией - 50 000 уровней, и в Python это `RecursionError`.',
        en: '**Depth matters more than the total number of calls**: the stack limit counts only calls that have not returned yet. A walk over a balanced tree of a million nodes makes a million calls, but the depth is about 20 (`log2` of 10⁶), and that is safe. Summing a 50,000-element list recursively is 50,000 levels, and in Python that is `RecursionError`.',
      },
      {
        ru: '**Поднимать предел - последнее средство**: `node --stack-size` выше стека потока ОС роняет процесс без исключения, а в Python 3.12 высокий `sys.setrecursionlimit` работает, но каждый уровень - это кадр в памяти вместо одной переменной цикла, а код на C, как `json.loads`, ограничен отдельно. Если глубина растёт вместе с входом, надёжнее цикл или явный стек в массиве.',
        en: '**Raising the limit is a last resort**: `node --stack-size` above the OS thread stack crashes the process with no exception, while in Python 3.12 a high `sys.setrecursionlimit` works, but every level is a frame in memory instead of one loop variable, and C code such as `json.loads` is capped separately. If the depth grows with the input, a loop or an explicit stack in an array is more reliable.',
      },
      {
        ru: '**Проверка входа - отдельно от базового случая**: базовый случай отвечает «когда остановиться», а не «допустим ли аргумент». Смешать их - значит повторять проверку на каждом из `n` уровней или, как с `n <= 1`, молча вернуть ответ на бессмысленный вход.',
        en: '**Input validation is separate from the base case**: the base case answers "when to stop", not "is this argument allowed". Mixing them means repeating the check at every one of the `n` levels or, as with `n <= 1`, silently returning an answer for a meaningless input.',
      },
    ],
    realWorld: [
      {
        ru: '**Node 24**: `JSON.parse` и `JSON.stringify` ведут себя по-разному на одних и тех же данных: массив вложенностью 100 000 `JSON.parse` разбирает, а `JSON.stringify` того же массива бросает `RangeError: Maximum call stack size exceeded`. Предел стека - деталь реализации каждой функции, а не языка.',
        en: '**Node 24**: `JSON.parse` and `JSON.stringify` behave differently on the very same data: `JSON.parse` reads an array nested 100,000 deep, while `JSON.stringify` of that array throws `RangeError: Maximum call stack size exceeded`. The stack limit is a detail of each function\'s implementation, not of the language.',
      },
      {
        ru: '**Python 3.12**: `json.loads` на той же вложенности бросает `RecursionError` с текстом «maximum recursion depth exceeded while decoding a JSON array from a unicode string»: разбор устроен рекурсивно и проверяет тот же предел, что и функции на Python.',
        en: '**Python 3.12**: `json.loads` raises `RecursionError` on the same nesting, with the message "maximum recursion depth exceeded while decoding a JSON array from a unicode string": the parser is recursive and checks the same limit as Python functions do.',
      },
      {
        ru: '**CPython 3.12**: `os.walk` обходит папки циклом с явным стеком (`stack = [fspath(top)]` в `Lib/os.py`), а не рекурсией. Поводом стал запрос gh-89727: дерево папок глубже предела рекурсии нельзя было ни обойти, ни удалить через `shutil.rmtree`. `pathlib.Path.walk` переписали так же (gh-100282).',
        en: '**CPython 3.12**: `os.walk` walks folders with a loop and an explicit stack (`stack = [fspath(top)]` in `Lib/os.py`), not with recursion. The trigger was request gh-89727: a folder tree deeper than the recursion limit could be neither walked nor removed with `shutil.rmtree`. `pathlib.Path.walk` was rewritten the same way (gh-100282).',
      },
      {
        ru: '**Стандартная библиотека Python** проверяет вход так же, как `checked_factorial`, только строже: `math.factorial(-1)` бросает `ValueError` с текстом «factorial() not defined for negative values», а `math.factorial(2.5)` и даже `math.factorial(2.0)` - `TypeError`. `True` она, как и наша обёртка, принимает за 1: `bool` в Python - подкласс `int`.',
        en: '**The Python standard library** checks its input the same way as `checked_factorial`, only more strictly: `math.factorial(-1)` raises `ValueError` with the message "factorial() not defined for negative values", while `math.factorial(2.5)` and even `math.factorial(2.0)` raise `TypeError`. Like our wrapper, it takes `True` as 1: `bool` is a subclass of `int` in Python.',
      },
    ],
  },

  relatedAlgorithms: [],

  quiz: [
    {
      question: {
        ru: 'Что такое базовый случай рекурсивной функции?',
        en: 'What is the base case of a recursive function?',
      },
      options: [
        { ru: 'Самый первый вызов функции, с которого начинается вся цепочка вызовов', en: 'The very first call of the function, where the whole chain of calls begins' },
        { ru: 'Условие, при котором функция возвращает ответ, не вызывая себя', en: 'The condition under which the function returns an answer without calling itself' },
        { ru: 'Проверка аргумента в начале функции, которая бросает ошибку на неверном входе', en: 'An argument check at the top of the function that throws an error on invalid input' },
        { ru: 'Последний кадр, который снимается со стека в самом конце', en: 'The last frame to be removed from the stack at the very end' },
      ],
      correct: 1,
      explanation: {
        ru: 'Базовый случай - вход, ответ на который известен без нового вызова (`n <= 1` - вернуть 1). Первый вызов - обычно как раз не базовый, проверка входа - отдельная обёртка, а последним со стека снимается первый вызов.',
        en: 'The base case is an input whose answer is known without another call (`n <= 1` - return 1). The first call is usually not the base case, input checking is a separate wrapper, and the last frame off the stack belongs to the first call.',
      },
      hint: {
        ru: 'Вкладка «Суть», раздел «Решение»: из каких двух частей состоит рекурсивная функция.',
        en: 'The "Intent" tab, the "Solution" section: which two parts make up a recursive function.',
      },
    },
    {
      question: {
        ru: 'Что вернёт `factorial(1)` и сколько вызовов `factorial` при этом будет?',
        en: 'What does `factorial(1)` return, and how many calls of `factorial` does it make?',
      },
      options: [
        { ru: '1, но сначала будет вызов `factorial(0)`, который тоже вернёт 1', en: '1, but first there is a call to `factorial(0)`, which returns 1 too' },
        { ru: '0, потому что произведение чисел от 1 до 0 считается пустым', en: '0, because the product of the numbers from 1 down to 0 counts as empty' },
        { ru: 'Ошибку стека: дальше единицы аргумент уже не уменьшается', en: 'A stack error: the argument cannot shrink any further below one' },
        { ru: '1, и вызов будет один: проверка `1 <= 1` проходит сразу', en: '1, in a single call: the check `1 <= 1` passes at once' },
      ],
      correct: 3,
      explanation: {
        ru: 'Проверка `n <= 1` стоит первой и при `n = 1` проходит: функция возвращает 1, ни разу не вызвав себя. Вызов `factorial(0)` был бы только у версии с проверкой `n === 0`.',
        en: 'The check `n <= 1` comes first and passes for `n = 1`: the function returns 1 without calling itself once. A call to `factorial(0)` would only happen in a version that checks `n === 0`.',
      },
      hint: {
        ru: 'Вкладка «Визуализация»: нажмите «Другое n», пока не выпадет 1, и посмотрите на счётчик вызовов.',
        en: 'The "Visualization" tab: press "Another n" until it lands on 1, and look at the call counter.',
      },
    },
    {
      question: {
        ru: 'В каком порядке выполняются умножения при вызове `factorial(5)`?',
        en: 'In what order are the multiplications done when calling `factorial(5)`?',
      },
      options: [
        { ru: 'Сначала `5 × 4`, затем результат умножается на 3, на 2 и на 1', en: 'First `5 × 4`, then the result is multiplied by 3, by 2 and finally by 1' },
        { ru: 'Каждый вызов умножает сразу, ещё до того как вызвать следующий', en: 'Every call multiplies at once, before making the next call' },
        { ru: 'Снизу вверх, с `factorial(2)`: `2 × 1`, `3 × 2`, `4 × 6`, `5 × 24`', en: 'Bottom up, from `factorial(2)`: `2 × 1`, `3 × 2`, `4 × 6`, `5 × 24`' },
        { ru: 'Все четыре сразу, в тот момент, когда базовый случай вернул единицу', en: 'All four at once, at the moment the base case has returned its one' },
      ],
      correct: 2,
      explanation: {
        ru: 'Умножению `n * factorial(n - 1)` нужен ответ меньшего вызова, поэтому ни одно не выполняется на спуске. Первым досчитывает самый глубокий ждущий вызов, `factorial(2)`, последним - первый, `factorial(5)`.',
        en: 'The multiplication `n * factorial(n - 1)` needs the smaller call\'s answer, so none of them run on the way down. The deepest waiting call, `factorial(2)`, finishes first and the first call, `factorial(5)`, finishes last.',
      },
      hint: {
        ru: 'Вкладка «Визуализация», шаг «Подъём: каждый кадр досчитывает своё».',
        en: 'The "Visualization" tab, the step "On the way back each frame finishes its own work".',
      },
    },
    {
      question: {
        ru: 'Почему в `factorial` проверка `n <= 1`, а не `n === 0`?',
        en: 'Why does `factorial` check `n <= 1` rather than `n === 0`?',
      },
      options: [
        { ru: '`=== 0` неверна при `n = 1`: получилось бы `1 × 0`, и весь факториал стал бы нулём', en: '`=== 0` is wrong for `n = 1`: it would give `1 × 0`, and the whole factorial would be zero' },
        { ru: '`=== 0` тоже верна, но делает лишний вызов и не останавливается на `2.5` и `-1`', en: '`=== 0` works too, but makes an extra call and never stops on `2.5` or `-1`' },
        { ru: 'Разницы нет: обе проверки останавливают рекурсию ровно на одних и тех же входах', en: 'There is no difference: both checks stop the recursion on exactly the same inputs' },
        { ru: 'Сравнение `<=` выполняется быстрее строгого равенства `===`', en: 'The comparison `<=` runs faster than the strict equality `===`' },
      ],
      correct: 1,
      explanation: {
        ru: 'Для целых `n >= 0` обе версии дают верный ответ (`1 × factorial(0) = 1 × 1`), но `=== 0` делает на один вызов больше. `2.5` проскакивает ноль, `-1` уходит от него, и вызовы идут до переполнения стека, а `<= 1` останавливается на обоих.',
        en: 'For integers `n >= 0` both versions are correct (`1 × factorial(0) = 1 × 1`), but `=== 0` makes one more call. `2.5` skips past zero, `-1` moves away from it, and the calls run until the stack overflows, while `<= 1` stops on both.',
      },
      hint: {
        ru: 'Вкладка «Суть», раздел «Как это работает»: абзац про `n <= 1` и `n === 0`.',
        en: 'The "Intent" tab, the "How it works" section: the paragraph on `n <= 1` and `n === 0`.',
      },
    },
    {
      question: {
        ru: 'Что будет, если из `factorial` убрать базовый случай и вызвать `factorial(5)` в JavaScript?',
        en: 'What happens if the base case is removed from `factorial` and `factorial(5)` is called in JavaScript?',
      },
      options: [
        { ru: 'Вернётся 0: на `n = 0` всё накопленное произведение умножится на ноль', en: 'It returns 0: at `n = 0` the whole accumulated product gets multiplied by zero' },
        { ru: 'Движок заметит бесконечную рекурсию, прервёт её и вернёт `undefined`', en: 'The engine notices the infinite recursion, cuts it off and returns `undefined`' },
        { ru: 'Вернётся `-Infinity`: аргумент уйдёт в отрицательные числа', en: 'It returns `-Infinity`: the argument heads off into negative numbers' },
        { ru: 'Вызовы пойдут дальше 0 и кончатся `RangeError` о переполнении стека', en: 'The calls go on past 0 and end in a stack-overflow `RangeError`' },
      ],
      correct: 3,
      explanation: {
        ru: 'Умножение выполняется только на обратном пути, а обратного пути нет: ни один вызов не возвращается, пока не вернётся следующий. Аргумент проходит 0, `-1`, `-2`... пока стек не кончится, и до умножения на ноль дело не доходит.',
        en: 'The multiplication happens only on the way back, and there is no way back: no call returns until the next one does. The argument goes through 0, `-1`, `-2`... until the stack runs out, and the multiplication by zero is never reached.',
      },
      hint: {
        ru: 'Вкладка «Суть», раздел «Проблема»: чем заканчивается правило без строки «`0! = 1`».',
        en: 'The "Intent" tab, the "Problem" section: how the rule ends without the line "`0! = 1`".',
      },
    },
    {
      question: {
        ru: 'Почему проверка входа вынесена в `checkedFactorial`, а не стоит внутри `factorial`?',
        en: 'Why is the input check in `checkedFactorial` instead of inside `factorial`?',
      },
      options: [
        { ru: 'Из целого `n >= 2` шаг даёт целое `n >= 1`: проверять каждый уровень незачем', en: 'From an integer `n >= 2` the step gives an integer `n >= 1`: no need to recheck' },
        { ru: 'Иначе проверка входа перехватила бы базовый случай, и `factorial(1)` бросал бы ошибку', en: 'Otherwise the input check would catch the base case, and `factorial(1)` would throw an error' },
        { ru: 'Чтобы `factorial` мог принимать строки вроде `\'5\'` и сам переводил их в числа', en: 'So that `factorial` can accept strings like `\'5\'` and turn them into numbers itself' },
        { ru: 'Потому что бросить `RangeError` из рекурсивной функции нельзя', en: 'Because a `RangeError` cannot be thrown from a recursive function' },
      ],
      correct: 0,
      explanation: {
        ru: 'Шаг `n - 1` сохраняет то, что уже проверено: целое неотрицательное остаётся целым неотрицательным до базы. Проверка на каждом уровне повторила бы одно и то же `n` раз, ничего не поймав.',
        en: 'The step `n - 1` preserves what has already been checked: a non-negative integer stays a non-negative integer down to the base. A check at every level would repeat the same thing `n` times and catch nothing.',
      },
      hint: {
        ru: 'Вкладка «Реализация», шаг walkthrough «Обёртка для проверки входа».',
        en: 'The "Implementation" tab, the walkthrough step "A wrapper that checks the input".',
      },
    },
    {
      question: {
        ru: 'Сколько кадров `factorial` лежит на стеке в самый глубокий момент вызова `factorial(5)` и почему?',
        en: 'How many `factorial` frames are on the stack at the deepest moment of `factorial(5)`, and why?',
      },
      options: [
        { ru: 'Один: каждый новый вызов занимает место предыдущего кадра на стеке', en: 'One: each new call takes over the place of the previous frame on the stack' },
        { ru: 'Два: только текущий вызов и тот вызов, который его сделал', en: 'Two: only the current call and the call that made it' },
        { ru: 'Пять: четыре ждут, а пятый, `factorial(1)`, проверяет базу', en: 'Five: four are waiting, and the fifth, `factorial(1)`, checks the base' },
        { ru: '120: по кадру на каждую единицу итогового ответа', en: '120: one frame for each unit of the final answer' },
      ],
      correct: 2,
      explanation: {
        ru: 'Вызов не может вернуться, пока не узнает ответ следующего, поэтому кадры 5, 4, 3, 2 ждут, пока `factorial(1)` проверяет базу. Глубина равна `n` - отсюда O(n) памяти. Один кадр был бы только при переиспользовании кадра, а здесь после вызова ещё есть умножение.',
        en: 'A call cannot return until it knows the next one\'s answer, so frames 5, 4, 3, 2 wait while `factorial(1)` checks the base. The depth equals `n` - hence O(n) memory. A single frame would need the frame to be reused, but here there is still a multiplication after the call.',
      },
      hint: {
        ru: 'Вкладка «Визуализация», шаг «Базовый случай останавливает спуск»: счётчик глубины над стеком.',
        en: 'The "Visualization" tab, the step "The base case stops the descent": the depth counter above the stack.',
      },
    },
    {
      question: {
        ru: 'Что сделает `checkedFactorial(1e300)` в JavaScript?',
        en: 'What does `checkedFactorial(1e300)` do in JavaScript?',
      },
      options: [
        { ru: 'Бросит `RangeError` из проверки: число больше `Number.MAX_SAFE_INTEGER`', en: 'Throws the `RangeError` from the check: the number exceeds `Number.MAX_SAFE_INTEGER`' },
        { ru: 'Вернёт `Infinity`, как и любой факториал начиная со `171!`', en: 'Returns `Infinity`, like any factorial from `171!` upwards' },
        { ru: 'Пройдёт проверку, но `1e300 - 1 === 1e300`, и стек переполнится', en: 'Passes the check, but `1e300 - 1 === 1e300`, and the stack overflows' },
        { ru: 'Вернёт 1: при таком числе сравнение `n <= 1` ведёт себя иначе', en: 'Returns 1: with such a number the comparison `n <= 1` behaves differently' },
      ],
      correct: 2,
      explanation: {
        ru: '`Number.isInteger(1e300)` - `true`, так что проверка пропускает число. Но у `double` около 16 значащих цифр, и вычитание единицы не меняет `1e300`: аргумент не приближается к базе, и выходит `RangeError: Maximum call stack size exceeded`. До `Infinity` дело не доходит - умножения идут только на обратном пути.',
        en: '`Number.isInteger(1e300)` is `true`, so the check lets the number through. But a `double` has about 16 significant digits, and subtracting one leaves `1e300` unchanged: the argument does not move towards the base, and the result is `RangeError: Maximum call stack size exceeded`. `Infinity` is never reached - the multiplications happen only on the way back.',
      },
      hint: {
        ru: 'Вкладка «Суть», раздел «Как это работает»: абзац «Шаг приближает к базе» верно не для любого числа.',
        en: 'The "Intent" tab, the "How it works" section: the paragraph "The step moves towards the base" is not true for every number.',
      },
    },
    {
      question: {
        ru: 'Нужно сложить элементы списка из 50 000 чисел в Python. Есть рекурсивная версия `total(xs, i) = xs[i] + total(xs, i + 1)` с базой `i == len(xs)`. Что выбрать?',
        en: 'You need to add up a list of 50,000 numbers in Python. There is a recursive version `total(xs, i) = xs[i] + total(xs, i + 1)` with the base `i == len(xs)`. What should you choose?',
      },
      options: [
        { ru: 'Её же: Python сам превращает вызов в конце выражения в цикл без кадров', en: 'The same: Python turns a call at the end of an expression into a frameless loop' },
        { ru: 'Её же: 50 000 вызовов - немного, рекурсия справится за доли секунды', en: 'The same: 50,000 calls is not much, recursion copes in a fraction of a second' },
        { ru: 'Её же, добавив второй базовый случай для последнего элемента списка', en: 'The same, with a second base case added for the last element of the list' },
        { ru: 'Цикл или `sum`: глубина рекурсии равна длине списка, а предел - 1000', en: 'A loop or `sum`: the depth equals the list length, and the limit is 1000' },
      ],
      correct: 3,
      explanation: {
        ru: 'Здесь глубина растёт вместе с входом: 50 000 уровней при пределе 1000 - `RecursionError`. CPython не превращает вызовы в цикл, лишняя база глубину не меняет, а поднятый предел оставит 50 000 кадров в памяти там, где циклу хватит одной переменной.',
        en: 'Here the depth grows with the input: 50,000 levels against a limit of 1000 is `RecursionError`. CPython does not turn calls into a loop, an extra base case does not change the depth, and a raised limit would leave 50,000 frames in memory where a loop needs one variable.',
      },
      hint: {
        ru: 'Вкладка «Суть», раздел «Нюансы выбора»: глубина против общего числа вызовов и подъём предела.',
        en: 'The "Intent" tab, the "Choice nuances" section: depth against the total number of calls, and raising the limit.',
      },
    },
    {
      question: {
        ru: 'Рекурсивный обход сбалансированного дерева из миллиона узлов работает, а рекурсивный `factorial(50000)` падает. В чём разница?',
        en: 'A recursive walk over a balanced tree of a million nodes works, while a recursive `factorial(50000)` crashes. What is the difference?',
      },
      options: [
        { ru: 'У обхода дерева в сумме меньше вызовов, чем у факториала от 50 000, и стек не кончается', en: 'The tree walk makes fewer calls in total than the factorial of 50,000, so the stack holds out' },
        { ru: 'Обход дерева - хвостовая рекурсия, и движок переиспользует один кадр', en: 'The tree walk is tail recursion, and the engine reuses a single frame' },
        { ru: 'Стек ограничивает глубину: у дерева около 20 уровней, у факториала - 50 000', en: 'The stack limits depth: the tree has about 20 levels, the factorial 50,000' },
        { ru: 'Узлы дерева лежат в куче, а не на стеке, поэтому их вызовы стек не занимают', en: 'The tree nodes live on the heap, not the stack, so their calls take no stack space' },
      ],
      correct: 2,
      explanation: {
        ru: 'Предел стека считает только вызовы, которые ещё не вернулись. Обход дерева делает миллион вызовов, но одновременно ждут не больше `log2(10⁶)`, около 20. У факториала все 50 000 ждут одновременно. Где лежат узлы, для кадров вызовов неважно.',
        en: 'The stack limit counts only calls that have not returned yet. The tree walk makes a million calls, but no more than `log2(10⁶)`, about 20, wait at once. In the factorial all 50,000 wait at once. Where the nodes live does not matter for call frames.',
      },
      hint: {
        ru: 'Вкладка «Суть», раздел «Нюансы выбора»: пункт «Глубина важнее общего числа вызовов».',
        en: 'The "Intent" tab, the "Choice nuances" section: the item "Depth matters more than the total number of calls".',
      },
    },
  ],
};

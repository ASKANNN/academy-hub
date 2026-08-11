export const bogoSort = {
  slug: 'bogosort',
  category: 'sorting',
  name: { ru: 'Bogosort', en: 'Bogosort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n · n!)', worst: 'O(∞)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['joke', 'random', 'brute-force', 'educational'],

  intent: {
    ru: 'Бого-сортировка - шуточный алгоритм: массив случайно перемешивается снова и снова, пока он не окажется отсортированным. Это не практичный метод сортировки, а наглядная иллюстрация того, насколько плохим может быть алгоритм и почему «просто пробовать наугад» - не стратегия.',
    en: "Bogosort is a joke algorithm: the array is randomly shuffled over and over until it happens to come out sorted. It is not a practical sorting method - it's a vivid illustration of how bad an algorithm can be, and why \"just try randomly\" is not a strategy.",
  },

  problem: {
    ru: 'Формально, отсортированный массив - это просто одна из n! возможных перестановок исходных элементов. Значит, если перебирать случайные перестановки, рано или поздно можно наткнуться на отсортированную. Вопрос в том, сколько на это уйдёт времени - и именно это Бого-сортировка демонстрирует на практике: она не использует никакой информации о порядке элементов, кроме проверки «отсортирован ли массив прямо сейчас».',
    en: 'Formally, a sorted array is just one of n! possible permutations of the original elements. So if random permutations are tried repeatedly, a sorted one will eventually turn up. The question is how long that takes - and that is exactly what bogosort demonstrates in practice: it uses no information about element order beyond checking "is the array sorted right now".',
  },

  solution: {
    ru: 'Проверяется, отсортирован ли массив. Если да - готово. Если нет, массив перемешивается случайным образом (например, тасованием Фишера - Йетса) и проверка повторяется. Поскольку перемешивание случайно и независимо от предыдущих попыток, число попыток до успеха не ограничено сверху: в среднем требуется порядка n! перемешиваний, а теоретически процесс может продолжаться бесконечно долго.',
    en: "The array is checked for being sorted. If it is, we're done. If not, the array is randomly reshuffled (e.g., with a Fisher-Yates shuffle) and the check repeats. Since each shuffle is random and independent of previous attempts, there is no upper bound on the number of attempts needed to succeed: on average around n! shuffles are required, and in theory the process could continue forever.",
  },

  steps: [
    {
      title: { ru: 'Проверить, отсортирован ли массив', en: 'Check whether the array is sorted' },
      explanation: {
        ru: 'Пройти по массиву и убедиться, что каждый элемент не больше следующего.',
        en: 'Scan the array and check that every element is no greater than the next.',
      },
    },
    {
      title: { ru: 'Если да - завершить', en: 'If sorted - stop' },
      explanation: {
        ru: 'Если массив уже отсортирован, алгоритм завершается.',
        en: 'If the array is already sorted, the algorithm terminates.',
      },
    },
    {
      title: { ru: 'Если нет - перемешать случайным образом', en: 'If not - shuffle randomly' },
      explanation: {
        ru: 'Иначе выполнить случайное тасование всего массива, например тасованием Фишера - Йетса.',
        en: 'Otherwise perform a random shuffle of the whole array, for example with a Fisher-Yates shuffle.',
      },
    },
    {
      title: { ru: 'Повторить проверку', en: 'Repeat the check' },
      explanation: {
        ru: 'Снова проверить, отсортирован ли перемешанный массив, и продолжать цикл, пока это не произойдёт.',
        en: 'Check again whether the shuffled array is sorted, and keep looping until it is.',
      },
    },
    {
      title: { ru: 'Нет гарантированного числа попыток', en: 'No guaranteed number of attempts' },
      explanation: {
        ru: 'В отличие от почти всех других алгоритмов сортировки, здесь нет верхней границы на число итераций - только вероятностное ожидание.',
        en: 'Unlike almost every other sorting algorithm, there is no upper bound on the number of iterations here - only a probabilistic expectation.',
      },
    },
  ],

  implementation: {
    javascript: `function bogoSort(arr) {
  const a = [...arr];

  function isSorted(x) {
    for (let i = 1; i < x.length; i++) {
      if (x[i - 1] > x[i]) return false;
    }
    return true;
  }

  function shuffle(x) {
    for (let i = x.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [x[i], x[j]] = [x[j], x[i]];
    }
  }

  while (!isSorted(a)) {
    shuffle(a);
  }
  return a;
}`,
    python: `import random

def bogo_sort(arr):
    a = list(arr)

    def is_sorted(x):
        return all(x[i - 1] <= x[i] for i in range(1, len(x)))

    while not is_sorted(a):
        random.shuffle(a)
    return a`,
  },

  pros: [
    {
      ru: 'Реализуется буквально в несколько строк и не требует понимания никаких структур данных или техник - только проверка условия и перемешивание.',
      en: 'Implementable in literally a few lines and requires no understanding of any data structures or techniques - just a condition check and a shuffle.',
    },
    {
      ru: 'Отлично иллюстрирует разницу между «алгоритм, который в принципе может дать верный ответ» и «алгоритм, пригодный для практического использования».',
      en: 'Excellently illustrates the difference between "an algorithm that can in principle produce the right answer" and "an algorithm suitable for practical use".',
    },
    {
      ru: 'Не использует никакой дополнительной памяти сверх исходного массива - по этому единственному показателю формально эффективен.',
      en: "Uses no extra memory beyond the original array - by this one metric alone, it's formally efficient.",
    },
  ],
  cons: [
    {
      ru: 'Ожидаемое время работы порядка O(n · n!) - уже для 15 элементов это больше триллиона попыток (15! ≈ 1,3·10¹²); для практической сортировки абсолютно непригоден.',
      en: 'Expected running time is on the order of O(n · n!) - already for 15 elements this is over a trillion attempts (15! ≈ 1.3·10¹²); utterly unusable for practical sorting.',
    },
    {
      ru: 'Не имеет верхней границы числа попыток: теоретически может не завершиться никогда, хотя вероятность этого стремится к нулю с ростом числа попыток.',
      en: 'Has no upper bound on the number of attempts: theoretically it might never terminate, though the probability of that approaches zero as attempts grow.',
    },
    {
      ru: 'В этом тренажёре для наглядности используется укороченный массив из 5 элементов вместо стандартных 9 (5! = 120 попыток в среднем - ещё терпимо для браузера), а число попыток перемешивания дополнительно ограничено (после чего визуализация просто сортирует массив принудительно) - иначе демонстрация могла бы зависнуть на неопределённое время.',
      en: "For visualization purposes, this trainer uses a shortened 5-element sample instead of the standard 9 (5! = 120 attempts on average - still tolerable in a browser), and the number of shuffle attempts is additionally capped (after which the visualization simply force-sorts the array) - otherwise the demo could hang for an unbounded amount of time.",
    },
  ],

  whenToUse: [
    {
      ru: 'Никогда в реальных задачах - Бого-сортировка существует исключительно как учебный и шуточный пример.',
      en: 'Never in real tasks - bogosort exists purely as an educational and joke example.',
    },
    {
      ru: 'В обучении, чтобы наглядно показать, зачем нужны продуманные алгоритмы, и сравнить понятие «случайный перебор» с понятием «детерминированная стратегия».',
      en: 'In teaching, to vividly demonstrate why well-designed algorithms are needed, and to contrast the notion of "random guessing" with "deterministic strategy".',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Курсы и вводные лекции по алгоритмам** часто упоминают Бого-сортировку как контрпример - «алгоритм», который формально сортирует, но им нельзя пользоваться.',
      en: '**Algorithms courses and intro lectures** often mention bogosort as a counterexample - an "algorithm" that formally sorts but should never actually be used.',
    },
    {
      ru: '**Интернет-мемы и списки «худших алгоритмов»** в сообществе программистов регулярно ссылаются на Бого-сортировку как классический пример анти-паттерна производительности.',
      en: '**Internet memes and "worst algorithms" lists** in the programming community regularly reference bogosort as the classic example of a performance anti-pattern.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Число попыток растёт не просто быстро - оно растёт **факториально**, а это самый быстрый рост среди всех величин, которые обычно встречаются в анализе алгоритмов. Для 5 элементов (как в тренажёре выше) в среднем нужно 5! = 120 попыток - это ещё вполне терпимо. Для 10 элементов - уже 10! = 3 628 800 попыток, то есть около 36 миллионов элементарных операций сравнения при O(n) на попытку.',
        en: 'The number of attempts doesn\'t just grow fast - it grows **factorially**, the fastest growth rate that shows up in ordinary algorithm analysis. For 5 elements (as in the trainer above), on average 120 attempts (5!) are needed - still tolerable. For 10 elements it is already 3,628,800 attempts (10!), roughly 36 million elementary comparison operations at O(n) per attempt.',
      },
      {
        ru: 'Дальше рост становится буквально астрономическим. Для 20 элементов среднее число попыток - 20! ≈ 2,43·10¹⁸. При скорости в миллиард попыток в секунду (оптимистичная оценка для современного процессора) сортировка заняла бы порядка **77 лет** непрерывной работы. Для сравнения, у merge sort на тех же 20 элементах ушло бы около 20 · log₂ 20 ≈ 86 операций - разница больше чем на 16 порядков величины.',
        en: 'From there, growth becomes literally astronomical. For 20 elements the average number of attempts is 20! ≈ 2.43·10¹⁸. At a billion attempts per second (an optimistic estimate for a modern processor), sorting would take roughly **77 years** of continuous work. For comparison, merge sort on the same 20 elements would take about 20 · log₂ 20 ≈ 86 operations - a difference of more than 16 orders of magnitude.',
      },
      {
        ru: 'Математически каждая попытка - независимое испытание Бернулли с вероятностью успеха `p = 1/n!` (ровно одна из n! перестановок отсортирована). Число попыток до первого успеха подчиняется **геометрическому распределению**, и его математическое ожидание равно `1/p = n!` - отсюда и берётся оценка O(n · n!). При этом отдельный конкретный запуск может повезти на первой же попытке или растянуться на порядок дольше среднего - у геометрического распределения большой разброс.',
        en: 'Mathematically, each attempt is an independent Bernoulli trial with success probability `p = 1/n!` (exactly one of n! permutations is sorted). The number of attempts until the first success follows a **geometric distribution**, whose expected value is `1/p = n!` - which is exactly where the O(n · n!) estimate comes from. Any single run might get lucky on the first try or stretch on for an order of magnitude longer than average - geometric distributions have high variance.',
      },
      {
        ru: 'Гарантия завершения тоже вероятностная, а не абсолютная. Вероятность того, что первые `k` попыток все окажутся неудачными, равна `(1 - p)^k` и стремится к нулю при `k → ∞` - значит, алгоритм завершается **с вероятностью 1**, но не за гарантированное конечное число шагов. Это тонкое, но важное различие: «почти наверное завершится» - не то же самое, что «завершится за N шагов» - и Бого-сортировка - редкий пример алгоритма, где эта разница видна невооружённым глазом.',
        en: 'The termination guarantee is also probabilistic, not absolute. The probability that the first `k` attempts all fail equals `(1 - p)^k` and tends to zero as `k → ∞` - so the algorithm terminates **with probability 1**, but not within a guaranteed finite number of steps. That is a subtle but important distinction: "almost surely terminates" is not the same as "terminates within N steps" - and bogosort is a rare algorithm where this difference is plainly visible.',
      },
      {
        ru: 'Бого-сортировку иногда называют вычислительной иллюстрацией **теоремы о бесконечных обезьянах** (infinite monkey theorem) - идеи о том, что случайный процесс, повторяемый достаточно долго, рано или поздно произведёт любой конкретный результат, включая полное собрание сочинений Шекспира. Разница в том, что у Бого-сортировки «результат» - это всего одна из n! перестановок, и его можно посчитать и проверить за разумное время только для очень маленьких n.',
        en: 'Bogosort is sometimes described as a computational illustration of the **infinite monkey theorem** - the idea that a random process, repeated long enough, will eventually produce any specific outcome, including the complete works of Shakespeare. The difference is that bogosort\'s "outcome" is just one of n! permutations, and it can only be computed and checked in reasonable time for very small n.',
      },
      {
        ru: 'В сообществе любителей эзотерических алгоритмов существуют шуточные вариации, доводящие идею до абсурда ещё дальше - например, **bogobogosort**, которая рекурсивно бого-сортирует каждый префикс массива и отбрасывает результат при малейшей неудаче, что делает её на порядки медленнее обычной Бого-сортировки. Такие варианты не несут практической ценности - они существуют как чисто концептуальная шутка о том, «насколько плохо можно было бы сделать ещё хуже».',
        en: 'The esoteric-algorithms community has joke variants that push the idea further into absurdity - for instance **bogobogosort**, which recursively bogosorts every prefix of the array and discards the result on the slightest failure, making it orders of magnitude slower than ordinary bogosort. Such variants have no practical value - they exist purely as a conceptual joke about "how much worse could this possibly get".',
      },
      {
        ru: 'Педагогическая ценность Бого-сортировки - в контрасте между «продуктивной» и «непродуктивной» случайностью в алгоритмах. Quicksort использует случайный выбор опорного элемента, чтобы **избежать** конкретного противника - это случайность, снижающая ожидаемую сложность. Бого-сортировка использует случайность, которая **не извлекает никакой информации** из предыдущих попыток: она не приближается к ответу постепенно, а каждый раз стартует заново - именно поэтому она остаётся плохим алгоритмом, несмотря на корректность.',
        en: 'Bogosort\'s pedagogical value lies in the contrast between "productive" and "unproductive" randomness in algorithms. Quicksort uses a random pivot choice to **avoid** a specific adversary - randomness that lowers expected complexity. Bogosort uses randomness that **extracts no information** from previous attempts: it never inches closer to the answer, it just starts over each time - which is exactly why it remains a bad algorithm despite being correct.',
      },
    ],
    whenToUse: [
      {
        ru: '**При объяснении случайных алгоритмов новичкам** - как контрастный пример «плохой» случайности рядом с quicksort или skip list, где случайность действительно снижает сложность вместо того, чтобы просто перебирать варианты вслепую.',
        en: '**When teaching randomized algorithms to beginners** - as a contrasting example of "bad" randomness alongside quicksort or skip lists, where randomness genuinely lowers complexity instead of just blindly enumerating options.',
      },
      {
        ru: '**При демонстрации геометрического распределения** на курсах теории вероятностей и статистики - Бого-сортировка даёт наглядный, легко программируемый пример испытаний Бернулли с крошечной вероятностью успеха.',
        en: '**When demonstrating the geometric distribution** in probability and statistics courses - bogosort gives a vivid, easily coded example of Bernoulli trials with a tiny success probability.',
      },
      {
        ru: 'Никогда в production-коде и никогда там, где n превышает буквально несколько элементов - даже как «шутка» в коде она рискует превратиться в реальный источник зависаний, если случайно попадёт на вход с 15+ элементами.',
        en: 'Never in production code, and never where n exceeds a literal handful of elements - even as a "joke" in code, it risks becoming a real source of hangs if it accidentally runs on an input of 15+ elements.',
      },
      {
        ru: '**В споре о том, «что вообще значит алгоритм сортировки»** - Бого-сортировка формально удовлетворяет определению (корректно завершается и производит отсортированный вывод), что делает её полезным пограничным случаем для обсуждения того, отделяет ли определение алгоритма практичность от корректности.',
        en: '**In debates about "what counts as a sorting algorithm"** - bogosort formally satisfies the definition (it terminates correctly and produces sorted output), making it a useful edge case for discussing whether the definition of an algorithm separates practicality from correctness.',
      },
      {
        ru: 'Как шкала для сравнения «насколько плохих» алгоритмов друг с другом: bubble sort и Бого-сортировка оба формально «плохие», но разница между O(n²) и O(n · n!) огромна - Бого-сортировка задаёт нижнюю границу спектра, относительно которой даже bubble sort выглядит вполне разумным.',
        en: 'As a yardstick for comparing "how bad" algorithms are relative to each other: bubble sort and bogosort are both formally "bad", but the gap between O(n²) and O(n · n!) is enormous - bogosort anchors the bottom of the spectrum, against which even bubble sort looks perfectly reasonable.',
      },
    ],
    realWorld: [
      {
        ru: 'Название и сама идея Бого-сортировки возникли как шутка в сообществах программистов ещё в 1990-х годах (обсуждения на Usenet-группах вроде comp.programming), задолго до того, как стали фигурировать в современных списках «худших алгоритмов» и мемах - точное происхождение термина, как это часто бывает с интернет-фольклором, установить сложно.',
        en: 'The name and idea of bogosort emerged as a programmer-community joke back in the 1990s (in Usenet discussion groups such as comp.programming), long before it started showing up in modern "worst algorithms" lists and memes - the exact origin of the term, as is common with internet folklore, is hard to pin down precisely.',
      },
      {
        ru: '**Видео-визуализаторы алгоритмов сортировки** (например, проект «Sound of Sorting» Тимо Бингмана, озвучивающий сравнения элементов как звук) почти всегда включают Бого-сортировку - не ради практической пользы, а ради комического контраста: рядом с несколько секундными анимациями quicksort и merge sort она либо зависает, либо завершается результатом чистого везения.',
        en: '**Sorting-algorithm visualizer videos** (for example Timo Bingmann\'s "Sound of Sorting" project, which sonifies element comparisons) almost always include bogosort - not for practical value, but for comic contrast: next to the few-second animations of quicksort and merge sort, it either hangs or finishes purely by luck.',
      },
      {
        ru: 'На **Rosetta Code** и в вики эзотерических языков программирования Бого-сортировка и её пародийные производные (включая bogobogosort) реализованы на десятках языков - это стало своего рода ритуалом сообщества, демонстрирующим синтаксис языка на заведомо бесполезной, но забавной задаче.',
        en: 'On **Rosetta Code** and esoteric-programming-language wikis, bogosort and its parody derivatives (including bogobogosort) are implemented in dozens of languages - it has become a kind of community ritual, showcasing a language\'s syntax on a deliberately useless but entertaining task.',
      },
      {
        ru: 'В повседневном жаргоне разработчиков фраза **«медленнее, чем Бого-сортировка»** используется как гиперболическое сравнение при обсуждении неэффективного кода в код-ревью - несмотря на шуточное происхождение, само название стало общепонятной единицей измерения «плохой сложности алгоритма».',
        en: 'In everyday developer slang, the phrase **"slower than bogosort"** is used as a hyperbolic comparison when discussing inefficient code in code review - despite its joke origins, the name itself has become a commonly understood unit for measuring "bad algorithmic complexity".',
      },
    ],
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Копия массива', en: 'Copying the array' },
        explanation: {
          ru: '`bogoSort` работает на копии `[...arr]`, чтобы не изменять исходный массив, переданный вызывающим кодом.',
          en: '`bogoSort` operates on a copy `[...arr]`, so the array passed in by the caller is never mutated.',
        },
      },
      {
        lines: [4, 9],
        title: { ru: 'isSorted: проверка порядка', en: 'isSorted: checking the order' },
        explanation: {
          ru: 'Проходит по массиву и как только находит пару `x[i-1] > x[i]`, сразу возвращает `false` - массив не отсортирован. Если ни одной такой пары не нашлось, возвращает `true`.',
          en: 'Walks the array and returns `false` as soon as it finds a pair `x[i-1] > x[i]` - the array is not sorted. If no such pair turns up, it returns `true`.',
        },
      },
      {
        lines: [11, 16],
        title: { ru: 'shuffle: тасование Фишера - Йетса', en: 'shuffle: the Fisher-Yates shuffle' },
        explanation: {
          ru: 'Идёт с конца массива к началу; для каждой позиции `i` выбирает случайный индекс `j` от `0` до `i` включительно и меняет местами `x[i]` и `x[j]`. Это даёт равновероятную случайную перестановку - каждая из n! перестановок одинаково вероятна.',
          en: 'Walks from the end of the array to the start; for each position `i` it picks a random index `j` from `0` to `i` inclusive and swaps `x[i]` with `x[j]`. This produces a uniformly random permutation - each of the n! permutations is equally likely.',
        },
      },
      {
        lines: [18, 20],
        title: { ru: 'Основной цикл', en: 'The main loop' },
        explanation: {
          ru: '`while (!isSorted(a))` повторяет перемешивание, пока проверка не подтвердит, что массив отсортирован. Именно этот цикл не имеет верхней границы числа итераций.',
          en: '`while (!isSorted(a))` keeps reshuffling until the check confirms the array is sorted. This is exactly the loop with no upper bound on the number of iterations.',
        },
      },
      {
        lines: [21],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Как только `isSorted(a)` возвращает `true`, цикл завершается и функция отдаёт готовый отсортированный массив.',
          en: 'As soon as `isSorted(a)` returns `true`, the loop exits and the function hands back the finished, sorted array.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Импорт random', en: 'Importing random' },
        explanation: {
          ru: 'Модуль `random` нужен только для одной функции - `random.shuffle`, которая перемешивает список на месте.',
          en: 'The `random` module is needed for exactly one function - `random.shuffle`, which shuffles a list in place.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Копия списка', en: 'Copying the list' },
        explanation: {
          ru: '`bogo_sort` работает на копии `list(arr)`, чтобы не изменять исходный список, переданный вызывающим кодом.',
          en: '`bogo_sort` operates on a copy `list(arr)`, so the list passed in by the caller is never mutated.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'is_sorted: проверка порядка', en: 'is_sorted: checking the order' },
        explanation: {
          ru: '`all(x[i-1] <= x[i] for i in range(1, len(x)))` - однострочная проверка: массив отсортирован тогда и только тогда, когда каждый элемент не больше следующего.',
          en: '`all(x[i-1] <= x[i] for i in range(1, len(x)))` is a one-line check: the array is sorted exactly when every element is no greater than the next.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Основной цикл', en: 'The main loop' },
        explanation: {
          ru: '`while not is_sorted(a): random.shuffle(a)` повторяет перемешивание, пока проверка не подтвердит, что массив отсортирован - этот цикл не имеет верхней границы числа итераций.',
          en: '`while not is_sorted(a): random.shuffle(a)` keeps reshuffling until the check confirms the array is sorted - this loop has no upper bound on the number of iterations.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Как только `is_sorted(a)` возвращает `True`, цикл завершается, и функция отдаёт готовый отсортированный список.',
          en: 'As soon as `is_sorted(a)` returns `True`, the loop exits and the function returns the finished, sorted list.',
        },
      },
    ],
  },

  relatedAlgorithms: ['stooge-sort', 'gnome-sort', 'bubble-sort'],

  quiz: [
    {
      question: {
        ru: 'Как работает Бого-сортировка?',
        en: 'How does bogosort work?',
      },
      options: [
        { ru: 'Случайно перемешивает, пока массив не отсортирован', en: 'Randomly shuffles the array until it happens to be sorted' },
        { ru: 'Рекурсивно делит массив пополам и сливает половины', en: 'Recursively splits the array in half and merges the halves' },
        { ru: 'Строит кучу и извлекает минимум', en: 'Builds a heap and extracts the minimum' },
        { ru: 'Сравнивает только соседние элементы по одному разу', en: 'Compares only adjacent elements, once each' },
      ],
      correct: 0,
      explanation: {
        ru: 'После каждого перемешивания проверяется, отсортирован ли массив; если нет, перемешивание повторяется.',
        en: 'After each shuffle, it checks whether the array is sorted; if not, the shuffle is repeated.',
      },
      hint: {
        ru: 'Алгоритм не запоминает предыдущие попытки и не использует никакой информации об элементах. Что он делает снова и снова - см. раздел «Суть», подраздел «Решение».',
        en: 'The algorithm remembers nothing from previous attempts and uses no information about elements. What does it do over and over - see the "Solution" subsection in the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Каково ожидаемое время работы Бого-сортировки?',
        en: "What is bogosort's expected running time?",
      },
      options: [
        { ru: 'O(n · n!)', en: 'O(n · n!)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n)', en: 'O(n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Существует n! перестановок массива, и в среднем нужно перебрать порядка n! попыток, каждая из которых требует O(n) на перемешивание и проверку.',
        en: 'There are n! permutations of the array, and on average roughly n! attempts are needed, each costing O(n) to shuffle and check.',
      },
      hint: {
        ru: 'Сколько всего возможных перестановок n элементов и во сколько обходится каждая попытка - разобрано в разделе «Суть», подраздел «Решение».',
        en: 'How many total permutations of n elements are there and how much does each attempt cost - explained in the "Solution" subsection of the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Есть ли у Бого-сортировки гарантированная верхняя граница на число попыток?',
        en: 'Does bogosort have a guaranteed upper bound on the number of attempts?',
      },
      options: [
        { ru: 'Нет - теоретически процесс может продолжаться бесконечно', en: 'No - in theory the process could continue forever' },
        { ru: 'Да, гарантированно не больше n попыток в худшем случае', en: 'Yes, guaranteed at most n attempts in the worst case' },
        { ru: 'Да, гарантированно не больше n! попыток в худшем случае', en: 'Yes, guaranteed at most n! attempts in the worst case' },
        { ru: 'Да, гарантированно не больше log n попыток в худшем случае', en: 'Yes, guaranteed at most log n attempts in the worst case' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждое перемешивание независимо и случайно, поэтому сколь угодно длинная серия неудачных попыток остаётся возможной, хоть и крайне маловероятной.',
        en: 'Each shuffle is independent and random, so an arbitrarily long streak of failed attempts remains possible, though extremely unlikely.',
      },
      hint: {
        ru: 'Если каждая попытка независима от предыдущих, может ли алгоритм «знать», что следующая попытка обязательно будет удачной? Названо в шаге «Нет гарантированного числа попыток» на «Визуализации», во втором пункте минусов на «Плюсы и минусы», и разобрано формулой в четвёртом абзаце раздела «Как это работает».',
        en: 'If each attempt is independent of the previous ones, can the algorithm "know" the next attempt must succeed? Named in the "No guaranteed number of attempts" step on "Visualization", the second "Cons" item in "Pros & Cons", and worked out with a formula in the fourth paragraph of "How it works".',
      },
    },
    {
      question: {
        ru: 'Зачем вообще изучают Бого-сортировку, если она непригодна для практики?',
        en: 'Why is bogosort studied at all if it is unusable in practice?',
      },
      options: [
        {
          ru: 'Как наглядный учебный пример «наихудшего разумного» подхода к сортировке',
          en: 'As a vivid teaching example of the "worst sane" approach to sorting',
        },
        { ru: 'Потому что на практике она оказывается самой быстрой на маленьких массивах', en: 'Because it turns out to be the fastest option on small arrays in practice' },
        { ru: 'Потому что среди всех алгоритмов сортировки только она сортирует на месте', en: 'Because among all sorting algorithms it is the only one that sorts in place' },
        { ru: 'Потому что она устойчива (stable) и сохраняет порядок равных элементов', en: 'Because it is a stable sort that preserves the order of equal elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Бого-сортировка используется исключительно как обучающая иллюстрация, а не как практический инструмент.',
        en: 'Bogosort is used exclusively as a teaching illustration, not as a practical tool.',
      },
      hint: {
        ru: 'Что можно объяснить студентам через контрпример - алгоритм, который правильный, но бесполезный? Разобрано в подразделе «Когда применять» раздела «Суть», и первым пунктом в подразделе «Нюансы выбора» ниже (про продуктивную и непродуктивную случайность).',
        en: 'What can be taught through a counterexample - an algorithm that is correct but completely useless? See the "When to use" subsection in "Intent", and the first item in the "Choice nuances" subsection below (on productive vs unproductive randomness).',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует Бого-сортировка помимо исходного массива?',
        en: 'How much extra memory does bogosort require beyond the original array?',
      },
      options: [
        { ru: 'O(1)', en: 'O(1)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n!)', en: 'O(n!)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Перемешивание выполняется на месте, так что дополнительная память не зависит от размера массива.',
        en: 'The shuffle is done in place, so the extra memory does not depend on the array size.',
      },
      hint: {
        ru: 'Создаёт ли алгоритм копии массива или дополнительные структуры данных при каждом перемешивании? Третий пункт плюсов на вкладке «Плюсы и минусы» отвечает напрямую.',
        en: 'Does the algorithm create copies of the array or extra data structures on each shuffle? The third "Pros" item in "Pros & Cons" answers this directly.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность Бого-сортировки в лучшем случае?',
        en: 'What is the best-case time complexity of bogosort?',
      },
      options: [
        { ru: 'O(n) - если массив уже отсортирован и достаточно одной проверки', en: 'O(n) - if the array is already sorted and one check suffices' },
        { ru: 'O(1) - если первое же перемешивание даёт отсортированный результат', en: 'O(1) - if the very first shuffle yields a sorted result' },
        { ru: 'O(n!) - в лучшем случае нужна одна полная перестановка', en: 'O(n!) - in the best case one full permutation pass is needed' },
        { ru: 'O(n log n) - оптимальная сортировка случайного массива', en: 'O(n log n) - optimal sorting of a random array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если входной массив уже отсортирован, алгоритм выходит после одной проверки, которая стоит O(n) - это и есть лучший случай.',
        en: 'If the input is already sorted, the algorithm exits after one check costing O(n) - that is the best case.',
      },
      hint: {
        ru: 'При каком входе алгоритм завершается как можно быстрее? Сколько шагов занимает проверка - см. бейдж «Лучший случай» вверху страницы и шаг «Проверить, отсортирован ли массив» на вкладке «Визуализация».',
        en: 'On what input does the algorithm finish as quickly as possible? See the "Best" complexity badge at the top of the page and the "Check whether the array is sorted" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Почему Бого-сортировка считается алгоритмом, а не просто случайным перебором?',
        en: 'Why is bogosort considered an algorithm rather than just random enumeration?',
      },
      options: [
        { ru: 'Гарантированно завершается с вероятностью 1 при бесконечном числе попыток', en: 'It terminates with probability 1 given an unlimited number of attempts' },
        { ru: 'Она детерминированна и всегда завершается за конечное число шагов', en: 'It is deterministic and always finishes in a finite number of steps always' },
        { ru: 'Она используется в стандартных библиотеках некоторых языков программирования', en: 'It is used in standard libraries of some programming languages' },
        { ru: 'Она упорядочивает элементы, используя структуру данных типа куча', en: 'It orders elements using a heap data structure internally' },
      ],
      correct: 0,
      explanation: {
        ru: 'Вероятность бесконечного числа неудачных попыток равна нулю, поэтому с вероятностью 1 алгоритм завершится - это и отличает его от нереализуемой бесконечной процедуры.',
        en: 'The probability of infinitely many failed attempts is zero, so the algorithm terminates with probability 1 - this is what distinguishes it from an unrealizable infinite procedure.',
      },
      hint: {
        ru: 'Может ли цепочка независимых случайных событий с одинаковой положительной вероятностью успеха никогда не завершиться? Начало разобрано в подразделе «Проблема» на «Суть», а формула вероятности завершения - в четвёртом абзаце «Как это работает».',
        en: 'Can a chain of independent random events, each with the same positive success probability, go on forever? Introduced in the "Problem" subsection on "Intent", with the termination-probability formula in the fourth paragraph of "How it works".',
      },
    },
    {
      question: {
        ru: 'Что произойдёт с ожидаемым числом попыток, если увеличить массив с 3 до 4 элементов?',
        en: 'What happens to the expected number of attempts when the array grows from 3 to 4 elements?',
      },
      options: [
        { ru: 'Оно возрастёт примерно в 4 раза - с ~6 до ~24 попыток', en: 'It grows roughly 4-fold - from ~6 to ~24 attempts' },
        { ru: 'Оно возрастёт примерно в 2 раза - линейно с числом элементов', en: 'It grows roughly 2-fold - linearly with the number of elements' },
        { ru: 'Оно возрастёт примерно в 1,5 раза - незначительно', en: 'It grows roughly 1.5-fold - barely noticeable' },
        { ru: 'Оно не изменится, так как перемешивание всегда равновероятно', en: 'It stays the same, since any shuffle is always equally probable' },
      ],
      correct: 0,
      explanation: {
        ru: 'Ожидаемое число попыток порядка n! (3! = 6, 4! = 24) - каждый новый элемент умножает ожидание на n, что делает рост факториальным.',
        en: 'The expected number of attempts is on the order of n! (3! = 6, 4! = 24) - each new element multiplies the expectation by n, making the growth factorial.',
      },
      hint: {
        ru: 'Во сколько раз 4! больше 3!? Бейдж «Средний случай» вверху страницы и подраздел «Решение» дают формулу роста, а конкретные числа для 5, 10 и 20 элементов - в первых двух абзацах раздела «Как это работает».',
        en: 'How many times larger is 4! than 3!? The "Average" badge at the top and the "Solution" subsection give the growth formula, and concrete numbers for 5, 10, and 20 elements are in the first two paragraphs of "How it works".',
      },
    },
    {
      question: {
        ru: 'Является ли Бого-сортировка детерминированной?',
        en: 'Is bogosort deterministic?',
      },
      options: [
        { ru: 'Нет - каждая попытка случайна и зависит от генератора случайных чисел', en: 'No - each attempt\'s outcome is random and depends on the random number generator' },
        { ru: 'Да - порядок проверяемых перестановок строго фиксирован заранее', en: 'Yes - the order of checked permutations is strictly fixed in advance in all cases' },
        { ru: 'Да - он сортирует один и тот же массив за одинаковое число шагов', en: 'Yes - it sorts the same array in the same number of steps every time' },
        { ru: 'Нет - он использует другой алгоритм сортировки для первоначальной проверки', en: 'No - it uses a different sorting algorithm for the initial check' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждое перемешивание использует генератор случайных чисел, поэтому ни число попыток, ни итоговый путь алгоритма не воспроизводимы при повторном запуске.',
        en: 'Each shuffle uses a random number generator, so neither the attempt count nor the algorithm\'s path is reproducible on re-run.',
      },
      hint: {
        ru: 'Зависит ли следующий шаг алгоритма от случайного числа? Посмотрите на шаг «Если нет - перемешать случайным образом» на вкладке «Визуализация» и на код функции `shuffle` в «Реализации».',
        en: 'Does the algorithm\'s next step depend on a random number? Look at the "If not - shuffle randomly" step on the "Visualization" tab and the `shuffle` function code in "Implementation".',
      },
    },
    {
      question: {
        ru: 'Как называется алгоритм случайного перемешивания, который обычно используется внутри Бого-сортировки?',
        en: 'What is the name of the random shuffle algorithm typically used inside bogosort?',
      },
      options: [
        { ru: 'Тасование Фишера - Йетса', en: 'Fisher-Yates shuffle' },
        { ru: 'Алгоритм Кнута для генерации перестановок', en: 'Knuth permutation generation algorithm' },
        { ru: 'Сортировка пузырьком в обратном порядке', en: 'Reverse-order bubble sort' },
        { ru: 'Алгоритм Монте-Карло для приближённых вычислений', en: 'Monte Carlo approximation algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Тасование Фишера - Йетса гарантирует равномерное распределение по всем n! перестановкам за O(n) время - именно оно применяется для честного случайного перемешивания.',
        en: 'The Fisher-Yates shuffle guarantees uniform distribution over all n! permutations in O(n) time - it is the standard choice for an unbiased random shuffle.',
      },
      hint: {
        ru: 'Какой алгоритм перемешивания равномерно распределяет все перестановки и работает за O(n)? Назван в разделе «Суть» (подраздел «Решение») и в функции `shuffle` на вкладке «Реализация».',
        en: 'Which shuffle algorithm uniformly distributes all permutations and runs in O(n)? Named in the "Solution" subsection of the "Intent" tab and in the `shuffle` function on the "Implementation" tab.',
      },
    },
  ],
};

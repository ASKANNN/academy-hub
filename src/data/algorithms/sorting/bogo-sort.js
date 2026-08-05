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
    ru: 'Бого-сортировка — шуточный алгоритм: массив случайно перемешивается снова и снова, пока он не окажется отсортированным. Это не практичный метод сортировки, а наглядная иллюстрация того, насколько плохим может быть алгоритм и почему «просто пробовать наугад» — не стратегия.',
    en: "Bogosort is a joke algorithm: the array is randomly shuffled over and over until it happens to come out sorted. It is not a practical sorting method — it's a vivid illustration of how bad an algorithm can be, and why \"just try randomly\" is not a strategy.",
  },

  problem: {
    ru: 'Формально, отсортированный массив — это просто одна из n! возможных перестановок исходных элементов. Значит, если перебирать случайные перестановки, рано или поздно можно наткнуться на отсортированную. Вопрос в том, сколько на это уйдёт времени — и именно это Бого-сортировка демонстрирует на практике: она не использует никакой информации о порядке элементов, кроме проверки «отсортирован ли массив прямо сейчас».',
    en: 'Formally, a sorted array is just one of n! possible permutations of the original elements. So if random permutations are tried repeatedly, a sorted one will eventually turn up. The question is how long that takes — and that is exactly what bogosort demonstrates in practice: it uses no information about element order beyond checking "is the array sorted right now".',
  },

  solution: {
    ru: 'Проверяется, отсортирован ли массив. Если да — готово. Если нет, массив перемешивается случайным образом (например, тасованием Фишера — Йетса) и проверка повторяется. Поскольку перемешивание случайно и независимо от предыдущих попыток, число попыток до успеха не ограничено сверху: в среднем требуется порядка n! перемешиваний, а теоретически процесс может продолжаться бесконечно долго.',
    en: "The array is checked for being sorted. If it is, we're done. If not, the array is randomly reshuffled (e.g., with a Fisher–Yates shuffle) and the check repeats. Since each shuffle is random and independent of previous attempts, there is no upper bound on the number of attempts needed to succeed: on average around n! shuffles are required, and in theory the process could continue forever.",
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
      title: { ru: 'Если да — завершить', en: 'If sorted — stop' },
      explanation: {
        ru: 'Если массив уже отсортирован, алгоритм завершается.',
        en: 'If the array is already sorted, the algorithm terminates.',
      },
    },
    {
      title: { ru: 'Если нет — перемешать случайным образом', en: 'If not — shuffle randomly' },
      explanation: {
        ru: 'Иначе выполнить случайное тасование всего массива, например тасованием Фишера — Йетса.',
        en: 'Otherwise perform a random shuffle of the whole array, for example with a Fisher–Yates shuffle.',
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
        ru: 'В отличие от почти всех других алгоритмов сортировки, здесь нет верхней границы на число итераций — только вероятностное ожидание.',
        en: 'Unlike almost every other sorting algorithm, there is no upper bound on the number of iterations here — only a probabilistic expectation.',
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
      ru: 'Реализуется буквально в несколько строк и не требует понимания никаких структур данных или техник — только проверка условия и перемешивание.',
      en: 'Implementable in literally a few lines and requires no understanding of any data structures or techniques — just a condition check and a shuffle.',
    },
    {
      ru: 'Отлично иллюстрирует разницу между «алгоритм, который в принципе может дать верный ответ» и «алгоритм, пригодный для практического использования».',
      en: 'Excellently illustrates the difference between "an algorithm that can in principle produce the right answer" and "an algorithm suitable for practical use".',
    },
    {
      ru: 'Не использует никакой дополнительной памяти сверх исходного массива — по этому единственному показателю формально эффективен.',
      en: "Uses no extra memory beyond the original array — by this one metric alone, it's formally efficient.",
    },
  ],
  cons: [
    {
      ru: 'Ожидаемое время работы порядка O(n · n!) — уже для 10 элементов это триллионы попыток; для практической сортировки абсолютно непригоден.',
      en: 'Expected running time is on the order of O(n · n!) — already for 10 elements this is trillions of attempts; utterly unusable for practical sorting.',
    },
    {
      ru: 'Не имеет верхней границы числа попыток: теоретически может не завершиться никогда, хотя вероятность этого стремится к нулю с ростом числа попыток.',
      en: 'Has no upper bound on the number of attempts: theoretically it might never terminate, though the probability of that approaches zero as attempts grow.',
    },
    {
      ru: 'В этом тренажёре для наглядности используется укороченный массив из 5 элементов вместо стандартных 9, а число попыток перемешивания ограничено (после которого визуализация просто сортирует массив принудительно) — иначе демонстрация могла бы зависнуть в браузере на неопределённое время.',
      en: "For visualization purposes, this trainer uses a shortened 5-element sample instead of the standard 9, and the number of shuffle attempts is capped (after which the visualization simply force-sorts the array) — otherwise the demo could hang in the browser for an unbounded amount of time.",
    },
  ],

  whenToUse: [
    {
      ru: 'Никогда в реальных задачах — Бого-сортировка существует исключительно как учебный и шуточный пример.',
      en: 'Never in real tasks — bogosort exists purely as an educational and joke example.',
    },
    {
      ru: 'В обучении, чтобы наглядно показать, зачем нужны продуманные алгоритмы, и сравнить понятие «случайный перебор» с понятием «детерминированная стратегия».',
      en: 'In teaching, to vividly demonstrate why well-designed algorithms are needed, and to contrast the notion of "random guessing" with "deterministic strategy".',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Курсы и вводные лекции по алгоритмам** часто упоминают Бого-сортировку как контрпример — «алгоритм», который формально сортирует, но им нельзя пользоваться.',
      en: '**Algorithms courses and intro lectures** often mention bogosort as a counterexample — an "algorithm" that formally sorts but should never actually be used.',
    },
    {
      ru: '**Интернет-мемы и списки «худших алгоритмов»** в сообществе программистов регулярно ссылаются на Бого-сортировку как классический пример анти-паттерна производительности.',
      en: '**Internet memes and "worst algorithms" lists** in the programming community regularly reference bogosort as the classic example of a performance anti-pattern.',
    },
  ],

  relatedAlgorithms: ['stooge-sort', 'gnome-sort', 'bubble-sort'],

  quiz: [
    {
      question: {
        ru: 'Как работает Бого-сортировка?',
        en: 'How does bogosort work?',
      },
      options: [
        { ru: 'Случайно перемешивает массив, пока он не окажется отсортированным', en: 'Randomly shuffles the array until it happens to be sorted' },
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
        ru: 'Алгоритм не запоминает предыдущие попытки и не использует никакой информации об элементах. Что он делает снова и снова?',
        en: 'The algorithm remembers nothing from previous attempts and uses no information about elements. What does it do over and over?',
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
        ru: 'Сколько всего возможных перестановок n элементов? Во сколько обходится каждая попытка?',
        en: 'How many total permutations of n elements are there? How much does each attempt cost?',
      },
    },
    {
      question: {
        ru: 'Есть ли у Бого-сортировки гарантированная верхняя граница на число попыток?',
        en: 'Does bogosort have a guaranteed upper bound on the number of attempts?',
      },
      options: [
        { ru: 'Нет — теоретически процесс может продолжаться бесконечно', en: 'No — in theory the process could continue forever' },
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
        ru: 'Если каждая попытка независима от предыдущих, может ли алгоритм «знать», что следующая попытка обязательно будет удачной?',
        en: 'If each attempt is independent of the previous ones, can the algorithm "know" that the next attempt must succeed?',
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
        ru: 'Что можно объяснить студентам через контрпример — алгоритм, который правильный, но бесполезный?',
        en: 'What can be taught through a counterexample — an algorithm that is correct but completely useless?',
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
        ru: 'Создаёт ли алгоритм копии массива или дополнительные структуры данных при каждом перемешивании?',
        en: 'Does the algorithm create copies of the array or extra data structures on each shuffle?',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность Бого-сортировки в лучшем случае?',
        en: 'What is the best-case time complexity of bogosort?',
      },
      options: [
        { ru: 'O(n) — если массив уже отсортирован и достаточно одной проверки', en: 'O(n) — if the array is already sorted and one check suffices' },
        { ru: 'O(1) — если первое же перемешивание даёт отсортированный результат', en: 'O(1) — if the very first shuffle yields a sorted result' },
        { ru: 'O(n!) — в лучшем случае нужна одна полная перестановка', en: 'O(n!) — in the best case one full permutation pass is needed' },
        { ru: 'O(n log n) — оптимальная сортировка случайного массива', en: 'O(n log n) — optimal sorting of a random array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если входной массив уже отсортирован, алгоритм выходит после одной проверки, которая стоит O(n) — это и есть лучший случай.',
        en: 'If the input is already sorted, the algorithm exits after one check costing O(n) — that is the best case.',
      },
      hint: {
        ru: 'При каком входе алгоритм завершается как можно быстрее? Сколько шагов занимает проверка?',
        en: 'On what input does the algorithm finish as quickly as possible? How many steps does a single check take?',
      },
    },
    {
      question: {
        ru: 'Почему Бого-сортировка считается алгоритмом, а не просто случайным перебором?',
        en: 'Why is bogosort considered an algorithm rather than just random enumeration?',
      },
      options: [
        { ru: 'Она гарантированно завершается с вероятностью 1 при бесконечном числе попыток', en: 'It terminates with probability 1 given an unlimited number of attempts' },
        { ru: 'Она детерминированна и всегда завершается за конечное число шагов', en: 'It is deterministic and always finishes in a finite number of steps always' },
        { ru: 'Она используется в стандартных библиотеках некоторых языков программирования', en: 'It is used in standard libraries of some programming languages' },
        { ru: 'Она упорядочивает элементы, используя структуру данных типа куча', en: 'It orders elements using a heap data structure internally' },
      ],
      correct: 0,
      explanation: {
        ru: 'Вероятность бесконечного числа неудачных попыток равна нулю, поэтому с вероятностью 1 алгоритм завершится — это и отличает его от нереализуемой бесконечной процедуры.',
        en: 'The probability of infinitely many failed attempts is zero, so the algorithm terminates with probability 1 — this is what distinguishes it from an unrealizable infinite procedure.',
      },
      hint: {
        ru: 'Может ли цепочка независимых случайных событий с одинаковой положительной вероятностью успеха никогда не завершиться?',
        en: 'Can a chain of independent random events each with the same positive success probability go on forever?',
      },
    },
    {
      question: {
        ru: 'Что произойдёт с ожидаемым числом попыток, если увеличить массив с 3 до 4 элементов?',
        en: 'What happens to the expected number of attempts when the array grows from 3 to 4 elements?',
      },
      options: [
        { ru: 'Оно возрастёт примерно в 4 раза — с ~6 до ~24 попыток', en: 'It grows roughly 4-fold — from ~6 to ~24 attempts' },
        { ru: 'Оно возрастёт примерно в 2 раза — линейно с числом элементов', en: 'It grows roughly 2-fold — linearly with the number of elements' },
        { ru: 'Оно возрастёт примерно в 1,5 раза — незначительно', en: 'It grows roughly 1.5-fold — barely noticeable' },
        { ru: 'Оно не изменится, так как перемешивание всегда равновероятно', en: 'It stays the same, since any shuffle is always equally probable' },
      ],
      correct: 0,
      explanation: {
        ru: 'Ожидаемое число попыток порядка n! (3! = 6, 4! = 24) — каждый новый элемент умножает ожидание на n, что делает рост факториальным.',
        en: 'The expected number of attempts is on the order of n! (3! = 6, 4! = 24) — each new element multiplies the expectation by n, making the growth factorial.',
      },
      hint: {
        ru: 'Во сколько раз 4! больше 3!? Что это говорит о скорости роста сложности?',
        en: 'How many times larger is 4! than 3!? What does that say about how fast the complexity grows?',
      },
    },
    {
      question: {
        ru: 'Является ли Бого-сортировка детерминированной?',
        en: 'Is bogosort deterministic?',
      },
      options: [
        { ru: 'Нет — результат каждой попытки случаен и зависит от генератора случайных чисел', en: 'No — each attempt\'s outcome is random and depends on the random number generator' },
        { ru: 'Да — порядок проверяемых перестановок строго фиксирован заранее', en: 'Yes — the order of checked permutations is strictly fixed in advance in all cases' },
        { ru: 'Да — он сортирует один и тот же массив за одинаковое число шагов', en: 'Yes — it sorts the same array in the same number of steps every time' },
        { ru: 'Нет — он использует другой алгоритм сортировки для первоначальной проверки', en: 'No — it uses a different sorting algorithm for the initial check' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждое перемешивание использует генератор случайных чисел, поэтому ни число попыток, ни итоговый путь алгоритма не воспроизводимы при повторном запуске.',
        en: 'Each shuffle uses a random number generator, so neither the attempt count nor the algorithm\'s path is reproducible on re-run.',
      },
      hint: {
        ru: 'Зависит ли следующий шаг алгоритма от случайного числа? Что это означает для воспроизводимости?',
        en: 'Does the algorithm\'s next step depend on a random number? What does that mean for reproducibility?',
      },
    },
    {
      question: {
        ru: 'Как называется алгоритм случайного перемешивания, который обычно используется внутри Бого-сортировки?',
        en: 'What is the name of the random shuffle algorithm typically used inside bogosort?',
      },
      options: [
        { ru: 'Тасование Фишера — Йетса', en: 'Fisher–Yates shuffle' },
        { ru: 'Алгоритм Кнута для генерации перестановок', en: 'Knuth permutation generation algorithm' },
        { ru: 'Сортировка пузырьком в обратном порядке', en: 'Reverse-order bubble sort' },
        { ru: 'Алгоритм Монте-Карло для приближённых вычислений', en: 'Monte Carlo approximation algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'Тасование Фишера — Йетса гарантирует равномерное распределение по всем n! перестановкам за O(n) время — именно оно применяется для честного случайного перемешивания.',
        en: 'The Fisher–Yates shuffle guarantees uniform distribution over all n! permutations in O(n) time — it is the standard choice for an unbiased random shuffle.',
      },
      hint: {
        ru: 'Какой алгоритм перемешивания равномерно распределяет все перестановки и работает за O(n)?',
        en: 'Which shuffle algorithm uniformly distributes all permutations and runs in O(n)?',
      },
    },
  ],
};

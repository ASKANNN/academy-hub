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
    },
  ],
};

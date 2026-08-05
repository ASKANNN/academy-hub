export const patienceSort = {
  slug: 'patience-sort',
  category: 'sorting',
  name: { ru: 'Patience Sort', en: 'Patience Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['comparison', 'not-in-place', 'unstable'],

  intent: {
    ru: 'Пасьянсная сортировка вдохновлена карточным пасьянсом «солитёр»: карты раскладываются по стопкам так, чтобы верх каждой стопки не убывал сверху вниз, а затем стопки сливаются как в merge sort — попутно алгоритм даёт изящный способ найти длиннейшую возрастающую подпоследовательность.',
    en: 'Patience sort is inspired by the solitaire card game: cards are dealt into piles so each pile\'s top never decreases as cards are added, then the piles are merged like in merge sort — as a side effect, the algorithm gives an elegant way to find the longest increasing subsequence.',
  },

  problem: {
    ru: 'Многие алгоритмы сортировки сравнением требуют либо явного разбиения (quicksort), либо явного слияния заранее упорядоченных половин (merge sort). Хочется алгоритма, который бы строил упорядоченные группы «на лету», раскладывая элементы по ходу единственного прохода, а не заранее зная, как делить массив.',
    en: 'Many comparison sorts require either explicit partitioning (quicksort) or explicitly merging pre-split halves (merge sort). What\'s wanted is an algorithm that builds ordered groups "on the fly" while dealing elements in a single pass, rather than deciding upfront how to split the array.',
  },

  solution: {
    ru: 'Элементы по очереди «раскладываются» на стопки: каждая карта кладётся на первую слева стопку, чей верх больше или равен ей (поиск такой стопки — бинарный, O(log n)); если подходящей стопки нет, начинается новая стопка. В результате получается несколько стопок, каждая из которых по построению убывает сверху вниз. Финальный шаг — слить эти стопки, как k отсортированных списков, многократно забирая минимальный верхний элемент среди всех стопок (эффективно — через кучу).',
    en: 'Elements are "dealt" one by one onto piles: each card goes on the leftmost pile whose top is greater than or equal to it (finding that pile is a binary search, O(log n)); if no pile fits, a new pile is started. This produces several piles, each decreasing top-to-bottom by construction. The final step merges these piles like k sorted lists, repeatedly taking the minimum top element across all piles (efficiently, via a heap).',
  },

  steps: [
    {
      title: { ru: 'Взять следующую карту', en: 'Take the next card' },
      explanation: {
        ru: 'Пройти по входному массиву слева направо, беря по одному элементу за раз.',
        en: 'Walk the input array left to right, taking one element at a time.',
      },
    },
    {
      title: { ru: 'Найти подходящую стопку', en: 'Find a fitting pile' },
      explanation: {
        ru: 'Бинарным поиском найти самую левую стопку, чей текущий верхний элемент больше либо равен взятой карте.',
        en: 'Binary-search for the leftmost pile whose current top element is greater than or equal to the card just taken.',
      },
    },
    {
      title: { ru: 'Положить карту или начать стопку', en: 'Place the card or start a pile' },
      explanation: {
        ru: 'Если подходящая стопка найдена — положить карту на неё; иначе создать новую стопку справа от всех.',
        en: 'If a fitting pile is found, place the card on it; otherwise create a new pile to the right of all existing ones.',
      },
    },
    {
      title: { ru: 'Повторить для всех карт', en: 'Repeat for every card' },
      explanation: {
        ru: 'Продолжать раскладывать карты, пока весь исходный массив не будет разложен по стопкам.',
        en: 'Keep dealing until the entire input array has been placed onto piles.',
      },
    },
    {
      title: { ru: 'Слить стопки', en: 'Merge the piles' },
      explanation: {
        ru: 'Многократно брать минимальный верхний элемент среди всех непустых стопок и добавлять его в результат, пока все стопки не опустеют.',
        en: 'Repeatedly take the minimum top element among all non-empty piles and append it to the result until every pile is empty.',
      },
    },
  ],

  implementation: {
    javascript: `function patienceSort(arr) {
  const n = arr.length;
  if (n === 0) return [];

  const piles = [];
  for (let i = 0; i < n; i++) {
    const value = arr[i];
    let lo = 0, hi = piles.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (piles[mid][piles[mid].length - 1] >= value) hi = mid;
      else lo = mid + 1;
    }
    if (lo === piles.length) piles.push([value]);
    else piles[lo].push(value);
  }

  const output = new Array(n);
  for (let outPos = 0; outPos < n; outPos++) {
    let best = -1;
    for (let p = 0; p < piles.length; p++) {
      if (piles[p].length === 0) continue;
      const top = piles[p][piles[p].length - 1];
      if (best === -1 || top < piles[best][piles[best].length - 1]) best = p;
    }
    output[outPos] = piles[best].pop();
  }
  return output;
}`,
    python: `def patience_sort(arr):
    n = len(arr)
    if n == 0:
        return []

    piles = []
    for value in arr:
        lo, hi = 0, len(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            if piles[mid][-1] >= value:
                hi = mid
            else:
                lo = mid + 1
        if lo == len(piles):
            piles.append([value])
        else:
            piles[lo].append(value)

    output = []
    while any(piles):
        best = min((p for p in piles if p), key=lambda pile: pile[-1])
        output.append(best.pop())
    return output`,
  },

  pros: [
    {
      ru: 'Побочный продукт алгоритма — число стопок равно длине самой длинной строго убывающей подпоследовательности сверху вниз, что даёт основу для эффективного O(n log n) поиска LIS (longest increasing subsequence).',
      en: 'A side effect of the algorithm: the number of piles equals the length of the longest strictly decreasing top-to-bottom run, giving the basis for an efficient O(n log n) longest-increasing-subsequence (LIS) algorithm.',
    },
    {
      ru: 'Гарантированное O(n log n) без худшего случая O(n²), в отличие от quicksort.',
      en: 'Guaranteed O(n log n) with no O(n²) worst case, unlike quicksort.',
    },
    {
      ru: 'Естественно адаптивен: на уже отсортированном массиве образуется всего одна стопка, и слияние тривиально.',
      en: 'Naturally adaptive: on an already sorted array, only one pile forms, and merging is trivial.',
    },
  ],
  cons: [
    {
      ru: 'Требует O(n) дополнительной памяти под стопки — не сортирует на месте.',
      en: 'Needs O(n) extra memory for the piles — doesn\'t sort in place.',
    },
    {
      ru: 'Неустойчив: относительный порядок равных элементов из разных стопок при слиянии не гарантируется.',
      en: 'Unstable: the relative order of equal elements coming from different piles isn\'t guaranteed during the merge.',
    },
    {
      ru: 'На практике медленнее сортировок с лучшей локальностью памяти, таких как quicksort или Timsort, из-за большого числа отдельных списков-стопок.',
      en: 'In practice slower than sorts with better memory locality, such as quicksort or Timsort, due to the many separate pile lists.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда наряду с сортировкой нужна длиннейшая возрастающая подпоследовательность — пасьянсная сортировка решает обе задачи по сути одним алгоритмом.',
      en: 'When the longest increasing subsequence is needed alongside sorting — patience sort essentially solves both with one algorithm.',
    },
    {
      ru: 'Как наглядная демонстрация связи между карточными играми, жадными стратегиями и гарантией O(n log n) — популярна в учебных курсах по анализу алгоритмов.',
      en: 'As a vivid demonstration of the connection between card games, greedy strategies, and an O(n log n) guarantee — popular in algorithm-analysis courses.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Утилита `git blame`/поиск наименьшего diff в системах контроля версий** использует вариант LIS, вычислимый через раскладывание по стопкам, для нахождения минимального набора изменений между версиями файла.',
      en: '**`git blame` / diff-minimizing tools in version control systems** use a variant of LIS, computable via pile-dealing, to find the minimal set of changes between file versions.',
    },
    {
      ru: '**Задачи на анализ последовательностей** (биоинформатика, финансовые временные ряды), где нужен эффективный поиск наибольшей возрастающей подпоследовательности значений.',
      en: '**Sequence-analysis problems** (bioinformatics, financial time series), where an efficient search for the longest increasing subsequence of values is needed.',
    },
  ],

  relatedAlgorithms: ['merge-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'На какую стопку кладётся очередная карта в пасьянсной сортировке?',
        en: 'Which pile does the next card go on in patience sort?',
      },
      options: [
        {
          ru: 'На самую левую стопку, чей верхний элемент больше либо равен этой карте',
          en: 'The leftmost pile whose top element is greater than or equal to that card',
        },
        { ru: 'Всегда на последнюю созданную стопку, независимо от значения её верхней карты', en: 'Always onto the most recently created pile, regardless of its top card value' },
        { ru: 'На случайно выбранную стопку среди всех, что уже существуют', en: 'Onto a randomly chosen pile among all that already exist' },
        { ru: 'На стопку с наибольшим числом карт, чтобы стопки оставались сбалансированными', en: 'Onto the pile with the most cards, to keep the piles balanced' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это правило гарантирует, что каждая стопка остаётся убывающей сверху вниз, а поиск подходящей стопки можно делать бинарным поиском.',
        en: 'This rule guarantees each pile stays decreasing top-to-bottom, and the fitting pile can be found via binary search.',
      },
      hint: {
        ru: 'Правило выбора стопки позаимствовано из карточного пасьянса: карта кладётся на первую, куда она «проходит» по значению.',
        en: 'The pile-selection rule comes from solitaire: a card goes onto the first pile it "fits" by value.',
      },
    },
    {
      question: {
        ru: 'Что означает количество получившихся стопок после раскладки?',
        en: 'What does the number of resulting piles represent after dealing?',
      },
      options: [
        {
          ru: 'Длину самой длинной строго убывающей (сверху вниз) подпоследовательности значений',
          en: 'The length of the longest strictly decreasing (top-to-bottom) subsequence of values',
        },
        { ru: 'Количество отдельных перестановок элементов, нужных для полной сортировки всего массива целиком', en: 'The number of individual element swaps needed to fully sort the entire array from start to finish' },
        { ru: 'Число элементов, которые уже были отсортированы заранее до самого начала процесса раскладки', en: 'The number of elements that were already sorted beforehand, well before the dealing process even began' },
        { ru: 'Совершенно ничего — это просто бессмысленный побочный эффект без какого-либо практического применения', en: 'Absolutely nothing — it\'s just a meaningless side effect with no practical application whatsoever' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это ключевое наблюдение, которое связывает пасьянсную сортировку с задачей поиска длиннейшей возрастающей подпоследовательности (LIS).',
        en: 'This is the key observation linking patience sort to the longest-increasing-subsequence (LIS) problem.',
      },
      hint: {
        ru: 'Число стопок связано с известной задачей на подпоследовательности — какой именно?',
        en: 'The number of piles is related to a well-known subsequence problem — which one?',
      },
    },
    {
      question: {
        ru: 'Как получить итоговый отсортированный массив после того, как все карты разложены по стопкам?',
        en: 'How is the final sorted array obtained once all cards are dealt onto piles?',
      },
      options: [
        {
          ru: 'Многократно забирать минимальный верхний элемент среди всех стопок',
          en: 'Repeatedly take the minimum top element across all piles',
        },
        { ru: 'Просто склеить стопки одну за другой в порядке их создания', en: 'Just concatenate the piles one after another in the order they were created' },
        { ru: 'Развернуть каждую стопку и склеить их слева направо', en: 'Reverse each pile and concatenate them left to right' },
        { ru: 'Отсортировать каждую стопку заново стандартной сортировкой сравнением', en: 'Re-sort each pile from scratch using a standard comparison sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это k-путевое слияние: каждая стопка уже упорядочена, поэтому многократный выбор минимального верха даёт полностью отсортированный результат, как при слиянии в merge sort.',
        en: 'This is a k-way merge: each pile is already ordered, so repeatedly picking the minimum top yields a fully sorted result, similar to merging in merge sort.',
      },
      hint: {
        ru: 'Каждая стопка уже упорядочена — как объединить несколько упорядоченных списков в один, не пересортировывая их?',
        en: 'Each pile is already ordered — how do you combine several ordered lists into one without re-sorting?',
      },
    },
    {
      question: {
        ru: 'Является ли пасьянсная сортировка сортировкой на месте (in-place)?',
        en: 'Is patience sort an in-place sort?',
      },
      options: [
        { ru: 'Нет — требует O(n) дополнительной памяти под стопки', en: 'No — it needs O(n) extra memory for the piles' },
        { ru: 'Да, всегда работает без дополнительной памяти, как quicksort', en: 'Yes, it always works with no extra memory, like quicksort' },
        { ru: 'Только если во входном массиве нет дубликатов значений', en: 'Only if the input array has no duplicate values' },
        { ru: 'Только для массивов длиной меньше 100 элементов', en: 'Only for arrays shorter than 100 elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'Стопки — это отдельная структура данных поверх исходного массива, поэтому память растёт линейно с n.',
        en: 'The piles are a separate data structure on top of the original array, so memory grows linearly with n.',
      },
      hint: {
        ru: 'Стопки хранятся отдельно от входного массива — входит ли это в понятие «на месте»?',
        en: 'The piles are stored separately from the input array — does that fit the definition of "in-place"?',
      },
    },
    {
      question: {
        ru: 'Откуда пасьянсная сортировка получила своё название?',
        en: 'Where does patience sort get its name from?',
      },
      options: [
        {
          ru: 'Она моделирует карточный пасьянс: раскладывание карт по стопкам',
          en: 'It models dealing cards into piles, as in the solitaire card game',
        },
        { ru: 'Она требует терпеливого ожидания O(n²) времени на больших массивах', en: 'It requires patiently waiting through O(n²) time on large arrays' },
        { ru: 'Её придумал программист по фамилии Пасьянс в начале XX века', en: 'It was invented by a programmer named Patience in the early 20th century' },
        { ru: 'Название никак не связано с сутью алгоритма и выбрано случайно', en: 'The name has nothing to do with how the algorithm works and was chosen arbitrarily' },
      ],
      correct: 0,
      explanation: {
        ru: 'Правило «класть карту на первую подходящую стопку» — это в точности упрощённая стратегия одного из пасьянсов.',
        en: 'The "place the card on the first fitting pile" rule is exactly the simplified strategy of one solitaire variant.',
      },
      hint: {
        ru: 'Подумайте о реальной игре с картами, в которой игрок раскладывает карты по столбикам по определённому правилу.',
        en: 'Think of a real card game where the player deals cards into columns according to a specific rule.',
      },
    },
    {
      question: {
        ru: 'Как связано число стопок в пасьянсной сортировке с задачей LIS?',
        en: 'How is the number of piles in patience sort connected to the LIS problem?',
      },
      options: [
        { ru: 'Число стопок равно длине LIS (возрастающей подпоследовательности) входа', en: 'The number of piles equals the length of the longest increasing subsequence (LIS) of the input' },
        { ru: 'Число стопок равно числу инверсий в исходном массиве', en: 'The number of piles equals the number of inversions in the original array' },
        { ru: 'LIS никак не связана с пасьянсной сортировкой — это совпадение терминов', en: 'LIS has nothing to do with patience sort — the apparent connection is merely a coincidence of terminology' },
        { ru: 'Число стопок равно квадрату длины LIS входного массива', en: 'The number of piles equals the square of the LIS length of the input array' },
      ],
      correct: 0,
      explanation: {
        ru: 'По теореме Дилворта число стопок в пасьянсной сортировке равно длине LIS: верхние карты стопок образуют убывающую последовательность, длина которой по теореме Дилворта равна длине LIS.',
        en: 'By Dilworth\'s theorem, the number of piles in patience sort equals the LIS length: pile tops form a decreasing sequence whose length equals the LIS length by Dilworth\'s theorem.',
      },
      hint: {
        ru: 'Вспомните, что число стопок равно длине наидлиннейшей убывающей подпоследовательности; что говорит о ней теорема Дилворта?',
        en: 'Recall that the number of piles equals the longest decreasing subsequence length; what does Dilworth\'s theorem say about that?',
      },
    },
    {
      question: {
        ru: 'Каков метод поиска подходящей стопки при раскладке карт?',
        en: 'What search method is used to find the fitting pile during dealing?',
      },
      options: [
        { ru: 'Бинарный поиск по верхним элементам стопок', en: 'Binary search over the pile tops' },
        { ru: 'Линейный перебор всех стопок слева направо', en: 'Linear scan of all piles from left to right' },
        { ru: 'Случайный выбор стопки с последующей проверкой', en: 'Random pile selection with a subsequent check' },
        { ru: 'Хеш-таблица с ключами из верхних элементов стопок', en: 'Hash table keyed on pile tops' },
      ],
      correct: 0,
      explanation: {
        ru: 'Верхние элементы стопок всегда образуют возрастающую последовательность (иначе карта легла бы раньше), поэтому по ним можно проводить бинарный поиск за O(log k), где k — текущее число стопок.',
        en: 'Pile tops always form an increasing sequence (otherwise the card would have been placed earlier), so binary search over them takes O(log k), where k is the current number of piles.',
      },
      hint: {
        ru: 'Верхние карты стопок упорядочены между собой — какой метод поиска оптимален для упорядоченного набора?',
        en: 'Pile tops are ordered among themselves — which search method is optimal for an ordered set?',
      },
    },
    {
      question: {
        ru: 'Как ведёт себя пасьянсная сортировка на полностью отсортированном входе?',
        en: 'How does patience sort behave on a fully sorted input?',
      },
      options: [
        { ru: 'Образуется ровно одна стопка, а слияние тривиально — алгоритм адаптивен', en: 'Exactly one pile forms and merging is trivial — the algorithm is adaptive' },
        { ru: 'Образуется n стопок по одной карте — это наихудший случай для пасьянсной сортировки', en: 'Exactly n piles of one card each form — this is the worst case for patience sort' },
        { ru: 'Алгоритм обнаруживает упорядоченность и завершает работу немедленно без раскладки', en: 'The algorithm detects the order and terminates immediately without dealing' },
        { ru: 'Число стопок равно log n, как в сбалансированном дереве', en: 'The number of piles equals log n, as in a balanced tree' },
      ],
      correct: 0,
      explanation: {
        ru: 'При возрастающем входе каждая следующая карта меньше или равна верху последней стопки, поэтому всегда находится первая же стопка — в итоге стопка одна.',
        en: 'For increasing input every next card is less than or equal to the last pile\'s top, so the first pile always fits — resulting in a single pile.',
      },
      hint: {
        ru: 'Если каждая следующая карта меньше верха текущей стопки, сколько стопок в итоге образуется?',
        en: 'If every next card is smaller than the current pile\'s top, how many piles end up forming?',
      },
    },
    {
      question: {
        ru: 'Почему пасьянсная сортировка считается неустойчивой?',
        en: 'Why is patience sort considered unstable?',
      },
      options: [
        { ru: 'Равные элементы из разных стопок могут поменяться местами при слиянии', en: 'Equal elements from different piles can change their relative order during the merge' },
        { ru: 'Бинарный поиск стопки всегда помещает новый элемент перед равными ему, нарушая порядок', en: 'Binary search always places a new element before equal ones, breaking their order always' },
        { ru: 'Алгоритм использует случайный порядок слияния стопок, что нарушает устойчивость', en: 'The algorithm merges piles in a random order, breaking stability' },
        { ru: 'Неустойчивость возникает только при повторяющихся значениях в уже отсортированном входе', en: 'Instability only occurs for duplicate values in an already-sorted input' },
      ],
      correct: 0,
      explanation: {
        ru: 'При слиянии k стопок не отслеживается, из какой именно стопки пришли равные элементы, поэтому их исходный относительный порядок не гарантируется.',
        en: 'During the k-way merge, no tracking is done of which pile equal elements came from, so their original relative order is not guaranteed.',
      },
      hint: {
        ru: 'При слиянии нескольких стопок одновременно, как определяется порядок равных элементов из разных стопок?',
        en: 'During a multi-pile merge, how is the order of equal elements from different piles determined?',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность пасьянсной сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of patience sort?',
      },
      options: [
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n²) при обратно отсортированном входе', en: 'O(n²) on reverse-sorted input' },
        { ru: 'O(n) при любом входе благодаря адаптивности', en: 'O(n) for any input thanks to adaptivity' },
        { ru: 'O(n log² n) из-за накладных расходов на k-путевое слияние', en: 'O(n log² n) due to k-way merge overhead' },
      ],
      correct: 0,
      explanation: {
        ru: 'Даже в худшем случае (обратно отсортированный вход, когда образуется n стопок) раскладка занимает O(n log n), а слияние n стопок через кучу тоже O(n log n).',
        en: 'Even in the worst case (reverse-sorted input, where n piles form), dealing takes O(n log n) and merging n piles via a heap also takes O(n log n).',
      },
      hint: {
        ru: 'Сколько стопок образуется в худшем случае и сколько стоит их слияние через кучу?',
        en: 'How many piles form in the worst case, and how much does merging them via a heap cost?',
      },
    },
  ],
};

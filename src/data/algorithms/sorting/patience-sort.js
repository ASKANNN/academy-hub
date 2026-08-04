export const patienceSort = {
  slug: 'patience-sort',
  category: 'sorting',
  name: { ru: 'Пасьянсная сортировка', en: 'Patience Sort' },
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
        { ru: 'Всегда на последнюю созданную стопку', en: 'Always onto the most recently created pile' },
        { ru: 'На случайно выбранную стопку', en: 'Onto a randomly chosen pile' },
        { ru: 'На стопку с наибольшим числом карт', en: 'Onto the pile with the most cards' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это правило гарантирует, что каждая стопка остаётся убывающей сверху вниз, а поиск подходящей стопки можно делать бинарным поиском.',
        en: 'This rule guarantees each pile stays decreasing top-to-bottom, and the fitting pile can be found via binary search.',
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
        { ru: 'Количество перестановок, нужных для сортировки', en: 'The number of swaps needed to sort' },
        { ru: 'Число уже отсортированных элементов', en: 'The number of already-sorted elements' },
        { ru: 'Ничего — это просто побочный эффект без смысла', en: 'Nothing — it\'s just a meaningless side effect' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это ключевое наблюдение, которое связывает пасьянсную сортировку с задачей поиска длиннейшей возрастающей подпоследовательности (LIS).',
        en: 'This is the key observation linking patience sort to the longest-increasing-subsequence (LIS) problem.',
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
        { ru: 'Просто склеить стопки одну за другой', en: 'Just concatenate the piles one after another' },
        { ru: 'Развернуть каждую стопку и склеить их', en: 'Reverse each pile and concatenate them' },
        { ru: 'Отсортировать каждую стопку заново', en: 'Re-sort each pile from scratch' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это k-путевое слияние: каждая стопка уже упорядочена, поэтому многократный выбор минимального верха даёт полностью отсортированный результат, как при слиянии в merge sort.',
        en: 'This is a k-way merge: each pile is already ordered, so repeatedly picking the minimum top yields a fully sorted result, similar to merging in merge sort.',
      },
    },
    {
      question: {
        ru: 'Является ли пасьянсная сортировка сортировкой на месте (in-place)?',
        en: 'Is patience sort an in-place sort?',
      },
      options: [
        { ru: 'Нет — требует O(n) дополнительной памяти под стопки', en: 'No — it needs O(n) extra memory for the piles' },
        { ru: 'Да, всегда работает без дополнительной памяти', en: 'Yes, it always works with no extra memory' },
        { ru: 'Только если во входном массиве нет дубликатов', en: 'Only if the input array has no duplicates' },
        { ru: 'Только для массивов длиной меньше 100', en: 'Only for arrays shorter than 100' },
      ],
      correct: 0,
      explanation: {
        ru: 'Стопки — это отдельная структура данных поверх исходного массива, поэтому память растёт линейно с n.',
        en: 'The piles are a separate data structure on top of the original array, so memory grows linearly with n.',
      },
    },
    {
      question: {
        ru: 'Откуда пасьянсная сортировка получила своё название?',
        en: 'Where does patience sort get its name from?',
      },
      options: [
        {
          ru: 'Она моделирует раскладывание карт по стопкам, как в карточном пасьянсе (solitaire)',
          en: 'It models dealing cards into piles, as in the solitaire card game',
        },
        { ru: 'Она требует терпеливого ожидания O(n²) времени', en: 'It requires patiently waiting O(n²) time' },
        { ru: 'Её придумал программист по фамилии Пасьянс', en: 'It was invented by a programmer named Patience' },
        { ru: 'Название никак не связано с сутью алгоритма', en: 'The name has nothing to do with how the algorithm works' },
      ],
      correct: 0,
      explanation: {
        ru: 'Правило «класть карту на первую подходящую стопку» — это в точности упрощённая стратегия одного из пасьянсов.',
        en: 'The "place the card on the first fitting pile" rule is exactly the simplified strategy of one solitaire variant.',
      },
    },
  ],
};

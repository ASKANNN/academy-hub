export const flashSort = {
  slug: 'flashsort',
  category: 'sorting',
  name: { ru: 'Flashsort', en: 'Flashsort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n²)' },
    space: 'O(n)',
  },
  popularity: 1,
  tags: ['distribution', 'classification', 'in-place-ish', 'numeric'],

  intent: {
    ru: 'Флэш-сортировка — алгоритм распределяющей сортировки, который сначала грубо раскидывает элементы по «классам» на основе их значения, переставляет их почти на нужные места за один проход, а затем сортировкой вставками устраняет оставшийся мелкий беспорядок внутри каждого класса.',
    en: 'Flashsort is a distribution sort that first roughly buckets elements into "classes" based on their value, permutes them into nearly their final positions in a single pass, and then uses insertion sort to clean up the remaining small-scale disorder within each class.',
  },

  problem: {
    ru: 'Сортировки сравнениями тратят время на попарные сравнения элементов, даже когда заранее известно, что данные — числа с более или менее равномерным распределением. Корзинная сортировка использует эту информацию, но выделяет под каждую корзину отдельный список, требуя дополнительной памяти и накладных расходов на её заполнение и последующую сборку. Хочется алгоритма, который использует ту же идею классификации по значению, но переставляет элементы прямо внутри исходного массива, без отдельных списков-корзин.',
    en: "Comparison sorts spend time on pairwise comparisons even when it's known in advance that the data is numeric and more or less evenly distributed. Bucket sort exploits that information but allocates a separate list per bucket, requiring extra memory and overhead to fill and later reassemble. What's wanted is an algorithm that uses the same value-classification idea but permutes elements directly within the original array, without separate bucket lists.",
  },

  solution: {
    ru: 'Массив делится на m «классов» по значению, и для каждого элемента заранее вычисляется, в какой класс он попадает. Строится массив границ классов (сколько элементов должно оказаться в каждом классе и левее него) — это похоже на подсчитывающую сортировку. Затем выполняется единственный проход циклических перестановок: элемент берётся, вычисляется класс, к которому он относится, и он ставится на границу этого класса, вытесняя оттуда другой элемент, который, в свою очередь, ставится на границу своего класса, и так далее, пока цепочка не замкнётся. После этого элементы почти отсортированы — внутри каждого класса возможен небольшой беспорядок, который устраняется финальным проходом сортировки вставками по всему массиву.',
    en: "The array is divided into m value-based \"classes\", and for each element it's precomputed which class it falls into. A boundary array is built (how many elements should end up in each class and to its left) — similar to counting sort. Then a single pass of cyclic permutations is performed: an element is picked, its class is computed, and it's placed at that class's boundary, displacing another element there, which is in turn placed at its own class's boundary, and so on until the chain closes. After this, the elements are nearly sorted — some small disorder remains within each class, which is cleaned up by a final insertion sort pass over the whole array.",
  },

  steps: [
    {
      title: { ru: 'Вычислить число классов и границы', en: 'Compute the class count and boundaries' },
      explanation: {
        ru: 'Выбрать число классов (обычно порядка 0.45·n) и подсчитать, сколько элементов относится к каждому классу.',
        en: 'Choose the number of classes (typically around 0.45·n) and count how many elements fall into each one.',
      },
    },
    {
      title: { ru: 'Построить накопленные границы классов', en: 'Build cumulative class boundaries' },
      explanation: {
        ru: 'Превратить счётчики классов в границы — индекс, на который должен встать последний элемент каждого класса.',
        en: 'Turn the per-class counts into boundaries — the index where the last element of each class should end up.',
      },
    },
    {
      title: { ru: 'Циклическая перестановка («вспышка»)', en: 'Cyclic permutation (the "flash")' },
      explanation: {
        ru: 'Взять элемент, поставить его на границу его класса, вытесненный элемент переставить на границу его класса, и так далее по цепочке.',
        en: 'Take an element, place it at its class boundary, move the displaced element to its own class boundary, and continue the chain.',
      },
    },
    {
      title: { ru: 'Повторить, пока не переставлены все элементы', en: 'Repeat until all elements are permuted' },
      explanation: {
        ru: 'Продолжать цепочки перестановок, переходя к следующему непереставленному элементу, пока весь массив не окажется почти отсортирован по классам.',
        en: 'Keep chaining permutations, moving to the next unplaced element, until the whole array is roughly sorted by class.',
      },
    },
    {
      title: { ru: 'Сортировка вставками для финальной точности', en: 'Insertion sort for final precision' },
      explanation: {
        ru: 'Пройти по массиву сортировкой вставками, чтобы устранить небольшой беспорядок, оставшийся внутри каждого класса.',
        en: 'Run insertion sort over the array to remove the small remaining disorder within each class.',
      },
    },
  ],

  implementation: {
    javascript: `function flashSort(arr) {
  const n = arr.length;
  if (n <= 1) return [...arr];
  const a = [...arr];
  const m = Math.max(2, Math.floor(0.45 * n));
  const min = Math.min(...a);
  const max = Math.max(...a);
  if (min === max) return a;
  const c1 = (m - 1) / (max - min);

  const L = new Array(m).fill(0);
  for (let i = 0; i < n; i++) {
    const k = Math.floor(c1 * (a[i] - min));
    L[k]++;
  }
  for (let i = 1; i < m; i++) L[i] += L[i - 1];

  let move = 0;
  let j = 0;
  let k = m - 1;
  while (move < n - 1) {
    while (j > L[k] - 1) {
      j++;
      k = Math.floor(c1 * (a[j] - min));
    }
    let flash = a[j];
    while (j !== L[k]) {
      k = Math.floor(c1 * (flash - min));
      const hold = a[L[k] - 1];
      a[L[k] - 1] = flash;
      flash = hold;
      L[k]--;
      move++;
    }
  }

  for (let i = 1; i < n; i++) {
    const current = a[i];
    let jj = i - 1;
    while (jj >= 0 && a[jj] > current) {
      a[jj + 1] = a[jj];
      jj--;
    }
    a[jj + 1] = current;
  }
  return a;
}`,
    python: `def flash_sort(arr):
    n = len(arr)
    if n <= 1:
        return list(arr)
    a = list(arr)
    m = max(2, int(0.45 * n))
    lo, hi = min(a), max(a)
    if lo == hi:
        return a
    c1 = (m - 1) / (hi - lo)

    L = [0] * m
    for x in a:
        k = int(c1 * (x - lo))
        L[k] += 1
    for i in range(1, m):
        L[i] += L[i - 1]

    move = 0
    j = 0
    k = m - 1
    while move < n - 1:
        while j > L[k] - 1:
            j += 1
            k = int(c1 * (a[j] - lo))
        flash = a[j]
        while j != L[k]:
            k = int(c1 * (flash - lo))
            a[L[k] - 1], flash = flash, a[L[k] - 1]
            L[k] -= 1
            move += 1

    for i in range(1, n):
        current = a[i]
        jj = i - 1
        while jj >= 0 and a[jj] > current:
            a[jj + 1] = a[jj]
            jj -= 1
        a[jj + 1] = current
    return a`,
  },

  pros: [
    {
      ru: 'В среднем случае для равномерно распределённых числовых данных работает за линейное время O(n) — значительно быстрее универсальных O(n log n) сортировок сравнениями.',
      en: 'On average, for evenly distributed numeric data, runs in linear time O(n) — notably faster than general-purpose O(n log n) comparison sorts.',
    },
    {
      ru: 'Переставляет элементы прямо внутри исходного массива (не считая небольшого вспомогательного массива границ классов), в отличие от корзинной сортировки со списками-корзинами.',
      en: 'Permutes elements directly within the original array (aside from a small auxiliary class-boundary array), unlike bucket sort with its per-bucket lists.',
    },
    {
      ru: 'Финальный проход сортировкой вставками недорог, потому что после классификации элементы уже находятся близко к своим итоговым позициям.',
      en: 'The final insertion sort pass is cheap because after classification the elements are already close to their final positions.',
    },
  ],
  cons: [
    {
      ru: 'В худшем случае (например, когда почти все элементы попадают в один класс из-за сильно неравномерного распределения) деградирует до O(n²) — так же, как обычная сортировка вставками.',
      en: 'In the worst case (for example, when almost all elements fall into a single class due to a heavily skewed distribution), it degrades to O(n²) — same as plain insertion sort.',
    },
    {
      ru: 'Требует, чтобы элементы поддерживали вычитание и умножение на константу (числовые ключи) — не подходит для произвольных объектов, сравнимых только оператором «меньше».',
      en: 'Requires elements to support subtraction and multiplication by a constant (numeric keys) — not suited to arbitrary objects that only support "less than" comparisons.',
    },
    {
      ru: 'Логика циклических перестановок сложнее для понимания и отладки, чем у большинства других сортировок — легко ошибиться в границах при собственной реализации.',
      en: "The cyclic-permutation logic is harder to follow and debug than most other sorts — it's easy to get the boundary bookkeeping wrong in a from-scratch implementation.",
    },
  ],

  whenToUse: [
    {
      ru: 'При сортировке больших массивов числовых данных, распределение которых предположительно близко к равномерному — там, где линейное среднее время окупает риск худшего случая.',
      en: 'When sorting large arrays of numeric data whose distribution is expected to be close to uniform — where the linear average-case runtime is worth the worst-case risk.',
    },
    {
      ru: 'В системах, где память под отдельные списки-корзины нежелательна, но выигрыш от классификации по значению всё же нужен.',
      en: 'In systems where memory for separate per-bucket lists is undesirable, but the benefit of value-based classification is still needed.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Обработка больших массивов сенсорных или измерительных данных** с известным диапазоном значений — классификация по классам хорошо ложится на такие данные.',
      en: '**Processing large arrays of sensor or measurement data** with a known value range — classification into classes fits such data well.',
    },
    {
      ru: '**Академические сравнения алгоритмов сортировки** часто включают Флэш-сортировку как пример распределяющей сортировки, конкурирующей по скорости с быстрой сортировкой на подходящих данных.',
      en: '**Academic comparisons of sorting algorithms** often include flashsort as an example of a distribution sort competitive in speed with quicksort on suitable data.',
    },
  ],

  relatedAlgorithms: ['bucket-sort', 'counting-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что делает Флэш-сортировка на первом этапе, до основной перестановки элементов?',
        en: 'What does flashsort do in the first stage, before the main permutation of elements?',
      },
      options: [
        { ru: 'Вычисляет границы классов по значению для каждого элемента', en: 'Computes value-based class boundaries for the elements' },
        { ru: 'Строит бинарное дерево поиска по всем элементам массива', en: 'Builds a binary search tree over all the array elements' },
        { ru: 'Рекурсивно делит массив пополам, как быстрая сортировка', en: 'Recursively splits the array in half, the way quicksort does' },
        { ru: 'Сортирует массив сравнениями перед основным проходом', en: 'Sorts the array with comparisons before the main pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и в подсчитывающей сортировке, сначала вычисляется, сколько элементов относится к каждому классу и где должны быть его границы.',
        en: 'Like in counting sort, it first computes how many elements fall into each class and where its boundaries should be.',
      },
    },
    {
      question: {
        ru: 'Как элементы переставляются на почти правильные позиции в основном проходе?',
        en: 'How are elements moved to nearly correct positions in the main pass?',
      },
      options: [
        { ru: 'Цепочкой циклических перестановок на границы классов', en: 'By a chain of cyclic permutations onto class boundaries' },
        { ru: 'Попарными обменами соседних элементов, как в пузырьковой сортировке', en: 'By pairwise swaps of adjacent elements, as in bubble sort' },
        { ru: 'Слиянием двух отдельно отсортированных половин массива', en: 'By merging two separately sorted halves of the array' },
        { ru: 'Извлечением минимума на каждом шаге, как в сортировке выбором', en: 'By extracting the minimum at each step, as in selection sort' },
      ],
      correct: 0,
      explanation: {
        ru: 'Элемент ставится на границу своего класса, вытесняя другой элемент, который переставляется на границу уже своего класса — так строится цепочка.',
        en: "An element is placed at its class's boundary, displacing another element, which is then placed at its own class's boundary — forming a chain.",
      },
    },
    {
      question: {
        ru: 'Зачем нужен финальный проход сортировкой вставками?',
        en: 'Why is a final insertion sort pass needed?',
      },
      options: [
        {
          ru: 'Чтобы устранить небольшой беспорядок, оставшийся внутри каждого класса после классификации',
          en: 'To remove the small disorder remaining within each class after classification',
        },
        { ru: 'Потому что этап классификации вообще никак не меняет порядок элементов в массиве', en: 'Because the classification step does not change the element order in the array at all' },
        { ru: 'Чтобы освободить память, занятую вспомогательным массивом классов после сортировки', en: 'To free up the memory used by the auxiliary class array once sorting finishes' },
        { ru: 'Он вообще не нужен, это чисто опциональная оптимизация исключительно ради скорости', en: 'It is not needed at all, it is a purely optional optimization purely for extra speed' },
      ],
      correct: 0,
      explanation: {
        ru: 'После классификации элементы находятся близко к финальным позициям, но не точно на них — сортировка вставками эффективно доводит порядок до точного.',
        en: "After classification, elements are close to their final positions but not exactly there — insertion sort efficiently finishes the ordering.",
      },
    },
    {
      question: {
        ru: 'Какова сложность Флэш-сортировки в худшем случае?',
        en: 'What is the worst-case complexity of flashsort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(log n)', en: 'O(log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'При сильно неравномерном распределении почти все элементы могут попасть в один класс, и алгоритм фактически выродится в сортировку вставками на всём массиве.',
        en: 'With a heavily skewed distribution, almost all elements can fall into a single class, and the algorithm effectively degenerates to insertion sort over the whole array.',
      },
    },
    {
      question: {
        ru: 'Какой тип данных требуется для ключей элементов в Флэш-сортировке?',
        en: 'What kind of data is required for element keys in flashsort?',
      },
      options: [
        {
          ru: 'Числовые ключи, поддерживающие вычитание и умножение на константу',
          en: 'Numeric keys supporting subtraction and multiplication by a constant',
        },
        { ru: 'Только целые числа без знака, укладывающиеся в фиксированный заранее известный диапазон', en: 'Only unsigned integers that fit within a fixed, known-in-advance range of values' },
        { ru: 'Любые объекты, сравнимые исключительно оператором «меньше», числа не требуются вовсе', en: 'Any objects comparable only with "less than", no numeric values required at all' },
        { ru: 'Только строки строго фиксированной длины, сравниваемые посимвольно слева направо', en: 'Only strictly fixed-length strings, compared character by character from left to right' },
      ],
      correct: 0,
      explanation: {
        ru: 'Вычисление класса элемента использует линейную формулу с разностью и умножением на коэффициент, что требует числовых значений.',
        en: "Computing an element's class uses a linear formula with subtraction and multiplication by a coefficient, which requires numeric values.",
      },
    },
  ],
};

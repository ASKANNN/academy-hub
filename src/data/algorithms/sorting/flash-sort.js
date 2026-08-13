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
    ru: 'Флэш-сортировка - алгоритм распределяющей сортировки, который сначала грубо раскидывает элементы по «классам» на основе их значения, переставляет их почти на нужные места за один проход, а затем сортировкой вставками устраняет оставшийся мелкий беспорядок внутри каждого класса.',
    en: 'Flashsort is a distribution sort that first roughly buckets elements into "classes" based on their value, permutes them into nearly their final positions in a single pass, and then uses insertion sort to clean up the remaining small-scale disorder within each class.',
  },

  problem: {
    ru: 'Сортировки сравнениями тратят время на попарные сравнения элементов, даже когда заранее известно, что данные - числа с более или менее равномерным распределением. Корзинная сортировка использует эту информацию, но выделяет под каждую корзину отдельный список, требуя дополнительной памяти и накладных расходов на её заполнение и последующую сборку. Хочется алгоритма, который использует ту же идею классификации по значению, но переставляет элементы прямо внутри исходного массива, без отдельных списков-корзин.',
    en: "Comparison sorts spend time on pairwise comparisons even when it's known in advance that the data is numeric and more or less evenly distributed. Bucket sort exploits that information but allocates a separate list per bucket, requiring extra memory and overhead to fill and later reassemble. What's wanted is an algorithm that uses the same value-classification idea but permutes elements directly within the original array, without separate bucket lists.",
  },

  solution: {
    ru: 'Массив делится на m «классов» по значению, и для каждого элемента заранее вычисляется, в какой класс он попадает. Строится массив границ классов (сколько элементов должно оказаться в каждом классе и левее него) - это похоже на подсчитывающую сортировку. Затем выполняется единственный проход циклических перестановок: элемент берётся, вычисляется класс, к которому он относится, и он ставится на границу этого класса, вытесняя оттуда другой элемент, который, в свою очередь, ставится на границу своего класса, и так далее, пока цепочка не замкнётся. После этого элементы почти отсортированы - внутри каждого класса возможен небольшой беспорядок, который устраняется финальным проходом сортировки вставками по всему массиву.',
    en: "The array is divided into m value-based \"classes\", and for each element it's precomputed which class it falls into. A boundary array is built (how many elements should end up in each class and to its left) - similar to counting sort. Then a single pass of cyclic permutations is performed: an element is picked, its class is computed, and it's placed at that class's boundary, displacing another element there, which is in turn placed at its own class's boundary, and so on until the chain closes. After this, the elements are nearly sorted - some small disorder remains within each class, which is cleaned up by a final insertion sort pass over the whole array.",
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
        ru: 'Превратить счётчики классов в границы - индекс, на который должен встать последний элемент каждого класса.',
        en: 'Turn the per-class counts into boundaries - the index where the last element of each class should end up.',
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
  stepBreakpoints: [2, 7, 13, 18],

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

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - число классов, коэффициент и все вспомогательные структуры вычисляются внутри.',
          en: 'The function takes a single array `arr` - the class count, coefficient, and all helper structures are computed inside.',
        },
      },
      {
        lines: [2, 3],
        title: { ru: 'Тривиальный случай', en: 'The trivial case' },
        explanation: {
          ru: '`if (n <= 1) return [...arr]` - массив из 0 или 1 элемента уже отсортирован, дальнейшая логика (классы, границы) для него не имеет смысла.',
          en: '`if (n <= 1) return [...arr]` - an array of 0 or 1 elements is already sorted, the rest of the logic (classes, boundaries) would be meaningless for it.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Копия массива', en: 'Copying the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт копию входа - все перестановки классификации и финальная сортировка вставками работают на этой копии.',
          en: '`const a = [...arr]` copies the input - both the classification permutations and the final insertion sort operate on this copy.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Число классов m', en: 'The class count m' },
        explanation: {
          ru: '`Math.max(2, Math.floor(0.45 * n))` берёт примерно 0.45 от длины массива, но не меньше 2 - для n = 10 это `m = 4`, эмпирически подобранный баланс между размером класса и размером вспомогательного массива L.',
          en: '`Math.max(2, Math.floor(0.45 * n))` takes roughly 0.45 of the array length, but never below 2 - for n = 10 that\'s `m = 4`, an empirically tuned balance between class size and the size of the L array.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Диапазон значений и вырожденный случай', en: 'The value range and the degenerate case' },
        explanation: {
          ru: '`min`/`max` находят границы данных; `if (min === max) return a` обрабатывает случай, когда все элементы равны - без этой проверки следующая строка делила бы на ноль.',
          en: '`min`/`max` find the data bounds; `if (min === max) return a` handles the case where all elements are equal - without it, the next line would divide by zero.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Коэффициент классификации', en: 'The classification coefficient' },
        explanation: {
          ru: '`c1 = (m - 1) / (max - min)` - линейный коэффициент, который переводит значение элемента в номер класса от 0 до m - 1; для примера с min = 4, max = 91, m = 4 это `c1 = 3 / 87 ≈ 0.0345`.',
          en: '`c1 = (m - 1) / (max - min)` - the linear coefficient that maps an element\'s value to a class number from 0 to m - 1; for min = 4, max = 91, m = 4 that\'s `c1 = 3 / 87 ≈ 0.0345`.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Массив границ классов', en: 'The class-boundary array' },
        explanation: {
          ru: '`const L = new Array(m).fill(0)` выделяет по одной ячейке на класс - в отличие от bucket sort, это не список элементов, а всего лишь счётчик/граница, размером m, а не n.',
          en: '`const L = new Array(m).fill(0)` allocates one cell per class - unlike bucket sort, this isn\'t a list of elements, just a counter/boundary, sized m rather than n.',
        },
      },
      {
        lines: [12, 15],
        title: { ru: 'Подсчёт элементов по классам', en: 'Counting elements per class' },
        explanation: {
          ru: 'Цикл вычисляет `k = Math.floor(c1 * (a[i] - min))` для каждого элемента и увеличивает `L[k]` - это подсчёт вхождений, идентичный первому шагу сортировки подсчётом, только по грубым классам, а не точным значениям.',
          en: 'The loop computes `k = Math.floor(c1 * (a[i] - min))` for each element and increments `L[k]` - counting occurrences, just like the first step of counting sort, only over coarse classes instead of exact values.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Накопленные границы', en: 'Cumulative boundaries' },
        explanation: {
          ru: '`for (let i = 1; i < m; i++) L[i] += L[i - 1]` превращает счётчики классов в границы - `L[k]` теперь означает индекс, на который должен встать последний элемент класса k.',
          en: '`for (let i = 1; i < m; i++) L[i] += L[i - 1]` turns per-class counts into boundaries - `L[k]` now means the index where the last element of class k should land.',
        },
      },
      {
        lines: [18, 20],
        title: { ru: 'Инициализация перестановки', en: 'Initializing the permutation pass' },
        explanation: {
          ru: '`move` считает, сколько элементов уже переставлено; `j` - текущая позиция сканирования; `k` стартует с последнего класса (m - 1), потому что первый обрабатываемый элемент будет искать своё место именно там.',
          en: '`move` counts how many elements have been permuted; `j` is the current scan position; `k` starts at the last class (m - 1), because the first element to be handled looks for its spot there.',
        },
      },
      {
        lines: [21, 25],
        title: { ru: 'Поиск неразмещённого элемента', en: 'Finding an unplaced element' },
        explanation: {
          ru: '`while (move < n - 1)` продолжает, пока не переставлены почти все элементы (последний встаёт на место автоматически). Внутренний `while (j > L[k] - 1)` сдвигает `j` вперёд и пересчитывает его класс, пропуская позиции, уже занятые правильным классом.',
          en: '`while (move < n - 1)` continues until nearly all elements are permuted (the last one falls into place automatically). The inner `while (j > L[k] - 1)` advances `j` and recomputes its class, skipping positions already occupied by the right class.',
        },
      },
      {
        lines: [26],
        title: { ru: 'Начало новой цепочки', en: 'Starting a new chain' },
        explanation: {
          ru: '`let flash = a[j]` берёт элемент, с которого начнётся новая цепочка циклических перестановок - имя `flash` отсылает к «вспышке», которой алгоритм назван.',
          en: '`let flash = a[j]` picks the element that starts a new chain of cyclic permutations - the name `flash` is where the algorithm gets its name from.',
        },
      },
      {
        lines: [27, 34],
        title: { ru: 'Цепочка циклических перестановок', en: 'The cyclic-permutation chain' },
        explanation: {
          ru: 'Пока `j !== L[k]`: вычисляется класс текущего `flash`, элемент, стоящий на границе `L[k] - 1` этого класса, извлекается в `hold`, `flash` записывается на его место, `hold` становится новым `flash`, а граница `L[k]` уменьшается - ровно та же схема «вытеснения», что и в циклической сортировке, но по классам, а не по точным позициям.',
          en: 'While `j !== L[k]`: the current `flash`\'s class is computed, the element sitting at that class\'s boundary `L[k] - 1` is pulled into `hold`, `flash` is written into its slot, `hold` becomes the new `flash`, and the boundary `L[k]` is decremented - the exact same "displacement" scheme as cycle sort, only over classes instead of exact positions.',
        },
      },
      {
        lines: [37, 45],
        title: { ru: 'Финальная сортировка вставками', en: 'The final insertion sort' },
        explanation: {
          ru: 'После классификации элементы стоят близко к нужным позициям, но не точно - обычная сортировка вставками проходит по всему массиву и устраняет этот остаточный беспорядок; она быстрая именно потому, что `jj` почти никогда не уходит далеко от `i`.',
          en: 'After classification, elements sit close to their target positions but not exactly - a plain insertion sort walks the whole array and removes this residual disorder; it\'s fast precisely because `jj` almost never travels far from `i`.',
        },
      },
      {
        lines: [46],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После финального прохода `a` полностью отсортирован и возвращается.',
          en: 'After the final pass, `a` is fully sorted and gets returned.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, все структуры вычисляются внутри.',
          en: 'The function takes a single list `arr` - just like the JS version, every structure is computed inside.',
        },
      },
      {
        lines: [2, 4],
        title: { ru: 'Тривиальный случай', en: 'The trivial case' },
        explanation: {
          ru: '`if n <= 1: return list(arr)` - список из 0 или 1 элемента уже отсортирован.',
          en: '`if n <= 1: return list(arr)` - a list of 0 or 1 elements is already sorted.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Копия списка', en: 'Copying the list' },
        explanation: {
          ru: '`a = list(arr)` копирует вход, чтобы аргумент вызывающего кода не менялся.',
          en: '`a = list(arr)` copies the input so the caller\'s argument stays unchanged.',
        },
      },
      {
        lines: [6],
        title: { ru: 'Число классов m', en: 'The class count m' },
        explanation: {
          ru: '`m = max(2, int(0.45 * n))` - идентично JS-версии: для n = 10 получается `m = 4`.',
          en: '`m = max(2, int(0.45 * n))` - identical to the JS version: for n = 10 this gives `m = 4`.',
        },
      },
      {
        lines: [7, 9],
        title: { ru: 'Диапазон значений и вырожденный случай', en: 'The value range and the degenerate case' },
        explanation: {
          ru: '`lo, hi = min(a), max(a)` находит границы, `if lo == hi: return a` избегает деления на ноль в следующей строке, если все элементы равны.',
          en: '`lo, hi = min(a), max(a)` finds the bounds, `if lo == hi: return a` avoids division by zero on the next line if every element is equal.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Коэффициент классификации', en: 'The classification coefficient' },
        explanation: {
          ru: '`c1 = (m - 1) / (hi - lo)` - тот же линейный коэффициент, что и в JS-версии.',
          en: '`c1 = (m - 1) / (hi - lo)` - the same linear coefficient as the JS version.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Массив границ классов', en: 'The class-boundary array' },
        explanation: {
          ru: '`L = [0] * m` выделяет по одной ячейке на класс, размером m, а не n.',
          en: '`L = [0] * m` allocates one cell per class, sized m rather than n.',
        },
      },
      {
        lines: [13, 15],
        title: { ru: 'Подсчёт элементов по классам', en: 'Counting elements per class' },
        explanation: {
          ru: '`for x in a: k = int(c1 * (x - lo)); L[k] += 1` - подсчёт вхождений по классам, идентичный JS-версии, `int()` играет роль `Math.floor`.',
          en: '`for x in a: k = int(c1 * (x - lo)); L[k] += 1` - counting occurrences per class, identical to the JS version, `int()` plays the role of `Math.floor`.',
        },
      },
      {
        lines: [16, 17],
        title: { ru: 'Накопленные границы', en: 'Cumulative boundaries' },
        explanation: {
          ru: '`for i in range(1, m): L[i] += L[i - 1]` превращает счётчики классов в границы, как в JS-версии.',
          en: '`for i in range(1, m): L[i] += L[i - 1]` turns per-class counts into boundaries, same as the JS version.',
        },
      },
      {
        lines: [19, 21],
        title: { ru: 'Инициализация перестановки', en: 'Initializing the permutation pass' },
        explanation: {
          ru: '`move`, `j`, `k` играют те же роли, что и в JS-версии: счётчик перестановок, позиция сканирования, текущий класс.',
          en: '`move`, `j`, `k` play the same roles as the JS version: the permutation counter, the scan position, the current class.',
        },
      },
      {
        lines: [22, 25],
        title: { ru: 'Поиск неразмещённого элемента', en: 'Finding an unplaced element' },
        explanation: {
          ru: '`while move < n - 1:` и вложенный `while j > L[k] - 1:` пропускают уже занятые позиции - идентично JS-версии.',
          en: '`while move < n - 1:` and the nested `while j > L[k] - 1:` skip already-occupied positions - identical to the JS version.',
        },
      },
      {
        lines: [26],
        title: { ru: 'Начало новой цепочки', en: 'Starting a new chain' },
        explanation: {
          ru: '`flash = a[j]` берёт элемент, начинающий новую цепочку перестановок.',
          en: '`flash = a[j]` picks the element that starts a new permutation chain.',
        },
      },
      {
        lines: [27, 31],
        title: { ru: 'Цепочка циклических перестановок', en: 'The cyclic-permutation chain' },
        explanation: {
          ru: '`while j != L[k]:` вычисляет класс `flash`, кортежным присваиванием `a[L[k] - 1], flash = flash, a[L[k] - 1]` меняет местами элемент на границе класса с `flash`, уменьшает границу - та же механика вытеснения, что в JS-версии, компактнее записанная за счёт синтаксиса Python.',
          en: '`while j != L[k]:` computes `flash`\'s class, the tuple assignment `a[L[k] - 1], flash = flash, a[L[k] - 1]` swaps the element at the class boundary with `flash`, decrements the boundary - the same displacement mechanics as the JS version, written more compactly thanks to Python\'s syntax.',
        },
      },
      {
        lines: [33, 39],
        title: { ru: 'Финальная сортировка вставками', en: 'The final insertion sort' },
        explanation: {
          ru: 'Тот же проход сортировкой вставками, что и в JS-версии, устраняющий остаточный беспорядок внутри классов.',
          en: 'The same insertion sort pass as the JS version, cleaning up residual disorder within classes.',
        },
      },
      {
        lines: [40],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'После финального прохода `a` возвращается полностью отсортированным.',
          en: 'After the final pass, `a` is returned fully sorted.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'В среднем случае для равномерно распределённых числовых данных работает за линейное время O(n) - значительно быстрее универсальных O(n log n) сортировок сравнениями.',
      en: 'On average, for evenly distributed numeric data, runs in linear time O(n) - notably faster than general-purpose O(n log n) comparison sorts.',
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
      ru: 'В худшем случае (например, когда почти все элементы попадают в один класс из-за сильно неравномерного распределения) деградирует до O(n²) - так же, как обычная сортировка вставками.',
      en: 'In the worst case (for example, when almost all elements fall into a single class due to a heavily skewed distribution), it degrades to O(n²) - same as plain insertion sort.',
    },
    {
      ru: 'Требует, чтобы элементы поддерживали вычитание и умножение на константу (числовые ключи) - не подходит для произвольных объектов, сравнимых только оператором «меньше».',
      en: 'Requires elements to support subtraction and multiplication by a constant (numeric keys) - not suited to arbitrary objects that only support "less than" comparisons.',
    },
    {
      ru: 'Логика циклических перестановок сложнее для понимания и отладки, чем у большинства других сортировок - легко ошибиться в границах при собственной реализации.',
      en: "The cyclic-permutation logic is harder to follow and debug than most other sorts - it's easy to get the boundary bookkeeping wrong in a from-scratch implementation.",
    },
  ],

  whenToUse: [
    {
      ru: 'При сортировке больших массивов числовых данных, распределение которых предположительно близко к равномерному - там, где линейное среднее время окупает риск худшего случая.',
      en: 'When sorting large arrays of numeric data whose distribution is expected to be close to uniform - where the linear average-case runtime is worth the worst-case risk.',
    },
    {
      ru: 'В системах, где память под отдельные списки-корзины нежелательна, но выигрыш от классификации по значению всё же нужен.',
      en: 'In systems where memory for separate per-bucket lists is undesirable, but the benefit of value-based classification is still needed.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Обработка больших массивов сенсорных или измерительных данных** с известным диапазоном значений - классификация по классам хорошо ложится на такие данные.',
      en: '**Processing large arrays of sensor or measurement data** with a known value range - classification into classes fits such data well.',
    },
    {
      ru: '**Академические сравнения алгоритмов сортировки** часто включают Флэш-сортировку как пример распределяющей сортировки, конкурирующей по скорости с быстрой сортировкой на подходящих данных.',
      en: '**Academic comparisons of sorting algorithms** often include flashsort as an example of a distribution sort competitive in speed with quicksort on suitable data.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Возьмём массив `[35, 12, 89, 4, 67, 23, 55, 91, 8, 42]` (n = 10). Число классов `m = max(2, floor(0.45 · 10)) = 4`. Диапазон значений min = 4, max = 91, коэффициент `c1 = (4 - 1) / (91 - 4) = 3 / 87 ≈ 0.0345`.',
        en: 'Take the array `[35, 12, 89, 4, 67, 23, 55, 91, 8, 42]` (n = 10). Class count `m = max(2, floor(0.45 · 10)) = 4`. Value range min = 4, max = 91, coefficient `c1 = (4 - 1) / (91 - 4) = 3 / 87 ≈ 0.0345`.',
      },
      {
        ru: 'Класс каждого элемента считается по формуле `floor(c1 · (значение - min))`. Например, для 35: `floor(0.0345 · 31) = floor(1.07) = 1`. Пересчитав так все 10 элементов, получаем распределение по классам: `4, 12, 23, 8` - класс 0 (4 элемента); `55, 42, 35` - класс 1 (3 элемента); `89, 67` - класс 2 (2 элемента); `91` - класс 3 (1 элемент).',
        en: 'Each element\'s class is computed as `floor(c1 · (value - min))`. For 35, for instance: `floor(0.0345 · 31) = floor(1.07) = 1`. Doing this for all 10 elements gives the class distribution: `4, 12, 23, 8` - class 0 (4 elements); `55, 42, 35` - class 1 (3 elements); `89, 67` - class 2 (2 elements); `91` - class 3 (1 element).',
      },
      {
        ru: 'Раскладка `L = [4, 3, 2, 1]` (счётчики по классам) после накопления сумм становится `L = [4, 7, 9, 10]` - **последнее значение, 10, равно n**, как и в счётчике сортировки подсчётом. Это означает: элементы класса 0 займут индексы 0-3, класса 1 - индексы 4-6, класса 2 - индексы 7-8, класса 3 - индекс 9.',
        en: 'The raw class counts `L = [4, 3, 2, 1]` become `L = [4, 7, 9, 10]` after the prefix-sum pass - **the last value, 10, equals n**, just like in counting sort\'s count array. This means class 0 elements take indices 0-3, class 1 indices 4-6, class 2 indices 7-8, and class 3 index 9.',
      },
      {
        ru: 'После цепочки циклических перестановок массив становится `[12, 8, 4, 23, 42, 55, 35, 67, 89, 91]` - все 10 элементов переставлены (`move` доходит до n - 1 = 9, плюс последний становится верным автоматически). **Классы уже верны** (первые 4 - действительно наименьшие, следующие 3 - средние, и так далее), но **внутри класса 1 порядок `42, 55, 35` неверен** - это и есть тот «мелкий беспорядок», который остаётся после классификации.',
        en: 'After the cyclic-permutation chain, the array becomes `[12, 8, 4, 23, 42, 55, 35, 67, 89, 91]` - all 10 elements have been permuted (`move` reaches n - 1 = 9, and the last one falls into place automatically). **The classes are already correct** (the first 4 really are the smallest, the next 3 are the middle ones, and so on), but **within class 1 the order `42, 55, 35` is wrong** - that\'s exactly the "small-scale disorder" left after classification.',
      },
      {
        ru: 'Финальная сортировка вставками проходит по всему массиву и приводит его к `[4, 8, 12, 23, 35, 42, 55, 67, 89, 91]`. Поскольку каждый элемент теперь стоит не дальше чем в пределах своего класса от финальной позиции, `jj` в цикле вставки почти никогда не уходит далеко назад - именно поэтому этот проход стоит близко к O(n), а не к O(n²), характерным для вставок на случайном массиве.',
        en: 'The final insertion sort walks the array and produces `[4, 8, 12, 23, 35, 42, 55, 67, 89, 91]`. Since every element now sits at most a class-width away from its final spot, `jj` in the insertion loop almost never travels far back - which is why this pass stays close to O(n), not the O(n²) typical of insertion sort on a random array.',
      },
      {
        ru: 'Худший случай возникает, когда распределение сильно скошено: если, например, 9 из 10 элементов попадают в один класс (сильно неравномерные данные), классификация почти ничего не даёт, и финальная сортировка вставками фактически сортирует весь массив заново - деградация до O(n²), совпадающая с обычной сортировкой вставками.',
        en: 'The worst case happens when the distribution is heavily skewed: if, say, 9 of 10 elements fall into a single class (badly non-uniform data), classification barely helps, and the final insertion sort effectively re-sorts the whole array from scratch - degrading to O(n²), matching plain insertion sort.',
      },
      {
        ru: 'Флэш-сортировку опубликовал **Карл-Дитрих Нойбер (Karl-Dietrich Neubert)** в статье 1998 года в Dr. Dobb\'s Journal, представив её как алгоритм, объединяющий скорость распределяющих сортировок с работой прямо в исходном массиве, без выделения отдельных списков-корзин, как в bucket sort.',
        en: 'Flashsort was published by **Karl-Dietrich Neubert** in a 1998 Dr. Dobb\'s Journal article, presenting it as an algorithm combining the speed of distribution sorts with in-place work on the original array, without allocating separate bucket lists the way bucket sort does.',
      },
      {
        ru: 'Итог: выигрыш Флэш-сортировки - линейное среднее время за счёт классификации плюс дешёвая доводка сортировкой вставками, а не отказ от сравнений вовсе (в отличие от counting sort). Она платит за это гарантией: без предположения о распределении данных её худший случай не лучше обычной сортировки вставками.',
        en: 'The takeaway: flashsort\'s win is linear average time from classification plus a cheap insertion-sort cleanup, not giving up comparisons entirely (unlike counting sort). The price is a guarantee: without an assumption about the data distribution, its worst case is no better than plain insertion sort.',
      },
    ],
    whenToUse: [
      {
        ru: '**Вместо bucket sort, когда важна память** - Флэш-сортировка использует лишь вспомогательный массив размером m (порядка 0.45n), тогда как bucket sort выделяет под каждую корзину отдельный список, суммарно занимающий O(n) дополнительной памяти на списки плюс их накладные расходы.',
        en: '**Instead of bucket sort when memory matters** - flashsort uses only an auxiliary array of size m (around 0.45n), while bucket sort allocates a separate list per bucket, together costing O(n) extra memory for the lists plus their overhead.',
      },
      {
        ru: '**Вместо quicksort на большом массиве заведомо равномерных числовых данных** - в среднем случае O(n) обгоняет O(n log n), но выигрыш ощутим только на действительно больших n (десятки тысяч и больше), где константы классификации окупаются.',
        en: '**Instead of quicksort on a large array of known-uniform numeric data** - the O(n) average case beats O(n log n), but the win only shows up on genuinely large n (tens of thousands or more), where the classification constants pay for themselves.',
      },
      {
        ru: '**Не выбирать при неизвестном или сильно скошенном распределении** - без гарантии равномерности риск деградации до O(n²) реален; для таких данных лучше merge sort/heap sort с гарантированным O(n log n) в худшем случае.',
        en: '**Don\'t pick it for unknown or heavily skewed distributions** - without a uniformity guarantee, the risk of degrading to O(n²) is real; for such data, merge sort/heap sort with a guaranteed O(n log n) worst case is a better fit.',
      },
      {
        ru: '**Против radix sort - когда ключи не разбиваются на разряды естественно** - Флэш-сортировка классифицирует по линейной формуле от значения целиком, тогда как radix sort требует представления числа как последовательности разрядов; для чисел с плавающей точкой Флэш-сортировка зачастую проще применить напрямую.',
        en: '**Against radix sort - when keys don\'t naturally decompose into digits** - flashsort classifies using one linear formula over the whole value, while radix sort needs the number represented as a digit sequence; for floating-point numbers, flashsort is often simpler to apply directly.',
      },
    ],
    realWorld: [
      {
        ru: '**Статья Карла-Дитриха Нойберта «Flashsort: A Distribution Sorting Algorithm» (Dr. Dobb\'s Journal, февраль 1998)** - оригинальная публикация, представившая алгоритм и его сравнение по скорости с quicksort на равномерных данных.',
        en: '**Karl-Dietrich Neubert\'s "Flashsort: A Distribution Sorting Algorithm" (Dr. Dobb\'s Journal, February 1998)** - the original publication introducing the algorithm and its speed comparison against quicksort on uniform data.',
      },
      {
        ru: '**Обработка больших выборок числовых измерений в научных вычислениях** - там, где заранее известно, что данные (например, показания датчиков в известном рабочем диапазоне) распределены плюс-минус равномерно.',
        en: '**Processing large samples of numeric measurements in scientific computing** - where it\'s known in advance that the data (e.g. sensor readings within a known operating range) is roughly uniformly distributed.',
      },
      {
        ru: '**Библиотеки и бенчмарки сортировок на C/C++**, сравнивающие распределяющие сортировки (flashsort, bucket sort, radix sort) между собой на синтетических равномерных наборах данных, часто включают Флэш-сортировку как эталон «сортировки почти без сравнений».',
        en: '**C/C++ sorting libraries and benchmarks** comparing distribution sorts (flashsort, bucket sort, radix sort) against each other on synthetic uniform datasets often include flashsort as the benchmark for "almost comparison-free sorting."',
      },
      {
        ru: '**Учебные курсы по продвинутым алгоритмам сортировки** используют Флэш-сортировку как пример двухфазного алгоритма - грубая классификация плюс точная доводка, - демонстрируя общий паттерн, который также лежит в основе intro sort и других гибридных схем.',
        en: '**Advanced sorting-algorithms courses** use flashsort as an example of a two-phase algorithm - coarse classification plus precise cleanup - demonstrating a general pattern that also underlies intro sort and other hybrid schemes.',
      },
    ],
  },

  relatedAlgorithms: ['bucket-sort', 'counting-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что делает Флэш-сортировка на первом этапе, до основной перестановки элементов?',
        en: 'What does flashsort do in the first stage, before the main permutation of elements?',
      },
      options: [
        { ru: 'Вычисляет границы классов по значению элементов', en: 'Computes value-based class boundaries for the elements' },
        { ru: 'Строит бинарное дерево поиска по всем элементам массива', en: 'Builds a binary search tree over all the array elements' },
        { ru: 'Рекурсивно делит массив пополам, как быстрая сортировка', en: 'Recursively splits the array in half, the way quicksort does' },
        { ru: 'Сортирует массив сравнениями перед основным проходом', en: 'Sorts the array with comparisons before the main pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и в подсчитывающей сортировке, сначала вычисляется, сколько элементов относится к каждому классу и где должны быть его границы.',
        en: 'Like in counting sort, it first computes how many elements fall into each class and where its boundaries should be.',
      },
      hint: {
        ru: 'Смотрите шаг «Вычислить число классов и границы» на вкладке «Визуализация» и второй абзац раздела «Глубже» с расчётом класса для значения 35.',
        en: 'See the "Compute the class count and boundaries" step on the "Visualization" tab and the second "Deep dive" paragraph computing the class for value 35.',
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
        ru: 'Элемент ставится на границу своего класса, вытесняя другой элемент, который переставляется на границу уже своего класса - так строится цепочка.',
        en: "An element is placed at its class's boundary, displacing another element, which is then placed at its own class's boundary - forming a chain.",
      },
      hint: {
        ru: 'Смотрите шаг walkthrough «Цепочка циклических перестановок» (строки 27-34) на вкладке «Реализация» и слово `flash` в её объяснении.',
        en: 'See the "The cyclic-permutation chain" walkthrough step (lines 27-34) on the "Implementation" tab and the word `flash` in its explanation.',
      },
    },
    {
      question: {
        ru: 'Зачем нужен финальный проход сортировкой вставками?',
        en: 'Why is a final insertion sort pass needed?',
      },
      options: [
        {
          ru: 'Устранить небольшой беспорядок внутри каждого класса после классификации',
          en: 'To remove the small disorder remaining within each class after classification',
        },
        { ru: 'Потому что этап классификации вообще никак не меняет порядок элементов в массиве', en: 'Because the classification step does not change the element order in the array at all' },
        { ru: 'Чтобы освободить память, занятую вспомогательным массивом классов после сортировки', en: 'To free up the memory used by the auxiliary class array once sorting finishes' },
        { ru: 'Он вообще не нужен, это чисто опциональная оптимизация исключительно ради скорости', en: 'It is not needed at all, it is a purely optional optimization purely for extra speed' },
      ],
      correct: 0,
      explanation: {
        ru: 'После классификации элементы находятся близко к финальным позициям, но не точно на них - сортировка вставками эффективно доводит порядок до точного.',
        en: "After classification, elements are close to their final positions but not exactly there - insertion sort efficiently finishes the ordering.",
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Глубже» - там показано, что после классификации порядок `42, 55, 35` внутри класса 1 ещё неверен.',
        en: 'See the fourth "Deep dive" paragraph - it shows that after classification the `42, 55, 35` order within class 1 is still wrong.',
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
      hint: {
        ru: 'Смотрите бейдж «Худший» вверху страницы и пятый абзац раздела «Глубже» про перекошенное распределение (9 из 10 в один класс).',
        en: 'See the "Worst" badge at the top of the page and the fifth "Deep dive" paragraph about a skewed distribution (9 of 10 in one class).',
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
      hint: {
        ru: 'Смотрите строку 9 (`const c1 = (m - 1) / (max - min)`) функции `flashSort` на вкладке «Реализация» и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See line 9 (`const c1 = (m - 1) / (max - min)`) of `flashSort` on the "Implementation" tab and the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Чем Флэш-сортировка отличается от корзинной сортировки (bucket sort) по использованию памяти?',
        en: 'How does flashsort differ from bucket sort in memory usage?',
      },
      options: [
        { ru: 'Флэш-сортировка работает на исходном массиве; корзинная создаёт отдельные списки', en: 'Flashsort permutes elements within the original array; bucket sort allocates separate lists for each bucket' },
        { ru: 'Флэш-сортировка требует O(n²) памяти, а корзинная сортировка всегда работает в O(1)', en: 'Flashsort requires O(n²) memory, while bucket sort always works in O(1)' },
        { ru: 'Оба алгоритма используют абсолютно одинаковый объём памяти на любых входных данных', en: 'Both algorithms use exactly the same amount of memory on any input data' },
        { ru: 'Флэш-сортировка требует памяти O(n log n) из-за рекурсии сортировки вставками', en: 'Flashsort requires O(n log n) memory due to the recursion of the insertion sort step regardless of input size' },
      ],
      correct: 0,
      explanation: {
        ru: 'Флэш-сортировка использует лишь небольшой массив L размером m для хранения границ классов, тогда как bucket sort создаёт динамические списки, которые суммарно занимают O(n) дополнительной памяти.',
        en: 'Flashsort uses only a small array L of size m to store class boundaries, while bucket sort creates dynamic lists that together occupy O(n) extra memory.',
      },
      hint: {
        ru: 'Смотрите второй пункт плюсов на вкладке «Плюсы и минусы» и первый пункт расширенного «Когда применять» на вкладке «Суть».',
        en: 'See the second "Pros" item on the "Pros & Cons" tab and the first extended "When to use" item on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'При каком условии Флэш-сортировка достигает линейного времени O(n)?',
        en: 'Under what condition does flashsort achieve linear O(n) time?',
      },
      options: [
        { ru: 'Когда данные равномерно распределены, элементы равномерно попадают в классы', en: 'When data is uniformly distributed and elements spread evenly across classes' },
        { ru: 'Когда массив уже полностью отсортирован и перестановок не требуется', en: 'When the array is already fully sorted and no permutations are needed' },
        { ru: 'Когда все элементы одинаковы и ни один класс не содержит более одного элемента', en: 'When all elements are identical and no class contains more than one element' },
        { ru: 'Когда число классов m равно числу элементов n без исключений', en: 'When the number of classes m equals the number of elements n without exception' },
      ],
      correct: 0,
      explanation: {
        ru: 'При равномерном распределении каждый класс содержит примерно n/m элементов. Финальная сортировка вставками внутри каждого класса занимает O((n/m)²), что суммарно даёт O(n) при m ~ n.',
        en: 'With uniform distribution, each class holds about n/m elements. The final insertion sort within each class takes O((n/m)²), summing to O(n) when m ~ n.',
      },
      hint: {
        ru: 'Смотрите первый пункт плюсов на вкладке «Плюсы и минусы» и пятый абзац раздела «Глубже» - там же объяснено, почему финальный проход остаётся близким к O(n).',
        en: 'See the first "Pros" item on the "Pros & Cons" tab and the fifth "Deep dive" paragraph, which explains why the final pass stays close to O(n).',
      },
    },
    {
      question: {
        ru: 'Почему Флэш-сортировка не подходит для сортировки строк без дополнительной обработки?',
        en: 'Why is flashsort not suitable for sorting strings without extra processing?',
      },
      options: [
        { ru: 'Формула классификации требует арифметики над значением, которая строкам недоступна', en: 'The class formula requires arithmetic operations on the value that are not defined for strings' },
        { ru: 'Строки занимают слишком много памяти и не помещаются в вспомогательный массив классов', en: 'Strings take too much memory and do not fit in the auxiliary class array regardless of input size' },
        { ru: 'Сортировка вставками, используемая финально, не работает со строками', en: 'The insertion sort used in the final step does not work with strings' },
        { ru: 'Строки всегда равномерно распределены, что делает Флэш-сортировку излишней', en: 'Strings are always uniformly distributed, making flashsort unnecessary' },
      ],
      correct: 0,
      explanation: {
        ru: 'Формула `floor(c1 * (value - min))` предполагает числовое вычитание и умножение - операции, не определённые для строк без явного преобразования в числа.',
        en: 'The formula `floor(c1 * (value - min))` assumes numeric subtraction and multiplication - operations not defined for strings without explicit conversion to numbers.',
      },
      hint: {
        ru: 'Смотрите строки 13 (JS) / 14 (Python) шага walkthrough «Подсчёт элементов по классам» на вкладке «Реализация» и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See lines 13 (JS) / 14 (Python) of the "Counting elements per class" walkthrough step on the "Implementation" tab and the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Как обычно выбирается число классов m в Флэш-сортировке?',
        en: 'How is the number of classes m typically chosen in flashsort?',
      },
      options: [
        { ru: 'Около 0.45·n - эмпирически найденный баланс скорости и памяти', en: 'Roughly 0.45·n - an empirically found value giving a good balance' },
        { ru: 'Всегда ровно 2, чтобы разделить массив на нижнюю и верхнюю половины', en: 'Always exactly 2, to split the array into a lower and upper half' },
        { ru: 'Равно log₂(n), аналогично глубине дерева при сортировке слиянием', en: 'Equal to log₂(n), analogous to the tree depth in merge sort' },
        { ru: 'Равно квадратному корню из n для минимизации суммы сравнений и памяти', en: 'Equal to the square root of n to minimize the sum of comparisons and memory' },
      ],
      correct: 0,
      explanation: {
        ru: 'Значение m ≈ 0.45·n было получено эмпирически: оно даёт достаточно мелкие классы для быстрой сортировки вставками, не требуя при этом слишком большого вспомогательного массива L.',
        en: 'The value m ≈ 0.45·n was found empirically: it gives classes small enough for fast insertion sort without requiring an excessively large auxiliary array L.',
      },
      hint: {
        ru: 'Смотрите строку 5 (`Math.max(2, Math.floor(0.45 * n))`) функции `flashSort` на вкладке «Реализация» и первый абзац раздела «Глубже», где для n = 10 получается m = 4.',
        en: 'See line 5 (`Math.max(2, Math.floor(0.45 * n))`) of `flashSort` on the "Implementation" tab and the first "Deep dive" paragraph, where n = 10 gives m = 4.',
      },
    },
    {
      question: {
        ru: 'Что происходит, если минимум и максимум входного массива совпадают?',
        en: 'What happens if the minimum and maximum of the input array are equal?',
      },
      options: [
        { ru: 'Алгоритм возвращает массив сразу, так как все элементы одинаковы', en: 'The algorithm returns the array immediately without changes, since all elements are equal' },
        { ru: 'Деление на ноль происходит при вычислении коэффициента c1, вызывая ошибку', en: 'Division by zero occurs when computing coefficient c1, causing an error' },
        { ru: 'Все элементы помещаются в класс 0, и выполняется только сортировка вставками', en: 'All elements go into class 0 and only insertion sort runs' },
        { ru: 'Число классов автоматически увеличивается до максимально возможного значения', en: 'The number of classes is automatically increased to the maximum possible value in all cases' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если min === max, все элементы одинаковы и массив уже «отсортирован» - специальная проверка перед вычислением c1 позволяет избежать деления на ноль и лишней работы.',
        en: 'If min === max, all elements are equal and the array is already "sorted" - a special check before computing c1 avoids division by zero and unnecessary work.',
      },
      hint: {
        ru: 'Смотрите шаг walkthrough «Диапазон значений и вырожденный случай» (строка 8, `if (min === max) return a`) на вкладке «Реализация».',
        en: 'See the "The value range and the degenerate case" walkthrough step (line 8, `if (min === max) return a`) on the "Implementation" tab.',
      },
    },
  ],
};

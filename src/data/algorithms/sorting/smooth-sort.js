export const smoothSort = {
  slug: 'smooth-sort',
  category: 'sorting',
  name: { ru: 'Smoothsort', en: 'Smoothsort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'unstable', 'adaptive'],

  intent: {
    ru: 'Смузсорт, придуманный Эдсгером Дейкстрой, — вариант пирамидальной сортировки, который строит не один бинарный, а лес куч Леонардо переменного размера, что позволяет ему адаптивно ускоряться на частично отсортированных данных, оставаясь сортировкой на месте с O(1) памяти.',
    en: 'Smoothsort, devised by Edsger Dijkstra, is a heap sort variant that builds a forest of variable-size Leonardo heaps instead of one binary heap, allowing it to adaptively speed up on partially sorted data while remaining an in-place sort with O(1) memory.',
  },

  problem: {
    ru: 'Heap sort гарантирует O(n log n) в любом случае, но не умеет использовать уже имеющийся порядок в данных — на почти отсортированном массиве он всё равно тратит полное время построения и разбора кучи. Нужен вариант heap sort, который адаптируется к порядку во входных данных, приближаясь к O(n) на почти отсортированных массивах, но сохраняет и гарантию O(n log n), и постоянную память heap sort.',
    en: 'Heap sort guarantees O(n log n) regardless of input, but can\'t exploit existing order in the data — on a nearly sorted array it still spends the full time building and tearing down the heap. A heap sort variant is needed that adapts to input order, approaching O(n) on nearly sorted arrays, while keeping heap sort\'s O(n log n) guarantee and constant memory.',
  },

  solution: {
    ru: 'Вместо одной бинарной кучи на весь массив смузсорт строит последовательность куч Леонардо — специальных бинарных деревьев с размерами по числам Леонардо (аналог чисел Фибоначчи: L(k) = L(k-1) + L(k-2) + 1). Массив постепенно превращается в лес таких куч слева направо (фаза «просеивания вверх»), а затем максимумы куч поочерёдно извлекаются справа налево, как в обычном heap sort. Ключевое отличие: если входные данные уже частично упорядочены, деревья строятся с меньшим числом операций восстановления кучи — отсюда адаптивность и почти линейное время на «гладких» данных.',
    en: 'Instead of one binary heap over the whole array, smoothsort builds a sequence of Leonardo heaps — special binary trees sized after Leonardo numbers (a Fibonacci-like sequence: L(k) = L(k-1) + L(k-2) + 1). The array is gradually turned into a forest of such heaps left to right (the "sift up" phase), then the heap maximums are extracted right to left, same as regular heap sort. The key difference: if the input is already partially ordered, the trees require fewer heapify operations to build — hence the adaptivity and near-linear time on "smooth" data.',
  },

  steps: [
    {
      title: { ru: 'Строить лес куч Леонардо', en: 'Build a forest of Leonardo heaps' },
      explanation: {
        ru: 'Проходя массив слева направо, добавлять каждый элемент, поддерживая инвариант леса куч с размерами по числам Леонардо.',
        en: 'Walking the array left to right, add each element while maintaining the forest invariant with Leonardo-number-sized heaps.',
      },
    },
    {
      title: { ru: 'Просеивать вверх (rectify)', en: 'Sift up (rectify)' },
      explanation: {
        ru: 'После добавления элемента восстановить свойство кучи, сравнивая корни соседних деревьев и просеивая новый элемент вверх при необходимости.',
        en: 'After adding an element, restore the heap property by comparing roots of adjacent trees and sifting the new element upward if needed.',
      },
    },
    {
      title: { ru: 'Извлекать максимум справа налево', en: 'Extract the maximum right to left' },
      explanation: {
        ru: 'Когда лес построен, максимальный элемент (корень самого правого дерева) меняется местами с последним элементом массива.',
        en: 'Once the forest is built, the maximum element (the root of the rightmost tree) is swapped with the array\'s last element.',
      },
    },
    {
      title: { ru: 'Разбить дерево и просеять вниз', en: 'Split the tree and sift down' },
      explanation: {
        ru: 'Дерево, у которого извлекли корень, разбивается на два меньших дерева Леонардо, после чего затронутые корни просеиваются вниз для восстановления кучи.',
        en: 'The tree whose root was extracted splits into two smaller Leonardo trees, then the affected roots are sifted down to restore the heap.',
      },
    },
    {
      title: { ru: 'Повторять до пустого леса', en: 'Repeat until the forest is empty' },
      explanation: {
        ru: 'Процесс извлечения продолжается справа налево, пока все элементы не окажутся на своих местах в отсортированном порядке.',
        en: 'The extraction process continues right to left until every element is in its correct sorted place.',
      },
    },
  ],

  implementation: {
    javascript: `// Упрощённая учебная реализация: строит лес куч Леонардо
// и извлекает максимумы, сохраняя асимптотику смузсорта.
const LEO = [1, 1];
function leonardo(k) {
  while (LEO.length <= k) LEO.push(LEO[LEO.length - 1] + LEO[LEO.length - 2] + 1);
  return LEO[k];
}

function siftDown(a, root, order) {
  while (order > 1) {
    const right = root - 1;
    const left = root - 1 - leonardo(order - 2);
    let bigger = root;
    if (a[left] > a[bigger]) bigger = left;
    if (a[right] > a[bigger]) bigger = right;
    if (bigger === root) break;
    [a[root], a[bigger]] = [a[bigger], a[root]];
    if (bigger === right) { root = right; order -= 2; }
    else { root = left; order -= 1; }
  }
}

function smoothSort(arr) {
  const a = [...arr];
  const n = a.length;
  const orders = [];

  function trinkle(root, idx) {
    let r = root;
    let i = idx;
    while (true) {
      const order = orders[i];
      let winner = r;
      let left = -1;
      let right = -1;
      if (order > 1) {
        right = r - 1;
        left = r - 1 - leonardo(order - 2);
        if (a[left] > a[winner]) winner = left;
        if (a[right] > a[winner]) winner = right;
      }
      const stepson = i > 0 ? r - leonardo(order) : -1;
      if (stepson >= 0 && a[stepson] > a[winner]) winner = stepson;
      if (winner === r) return;
      if (winner === stepson) {
        [a[r], a[stepson]] = [a[stepson], a[r]];
        r = stepson;
        i--;
        continue;
      }
      [a[r], a[winner]] = [a[winner], a[r]];
      if (winner === right) siftDown(a, right, order - 2);
      else siftDown(a, left, order - 1);
      return;
    }
  }

  for (let i = 0; i < n; i++) {
    if (orders.length >= 2 && orders[orders.length - 2] === orders[orders.length - 1] + 1) {
      orders[orders.length - 2] += 1;
      orders.pop();
    } else if (orders.length >= 1 && orders[orders.length - 1] === 1) {
      orders.push(0);
    } else {
      orders.push(1);
    }
    trinkle(i, orders.length - 1);
  }

  for (let i = n - 1; i > 0; i--) {
    if (orders[orders.length - 1] <= 1) {
      orders.pop();
    } else {
      const order = orders.pop();
      const right = i - 1;
      const left = i - 1 - leonardo(order - 2);
      orders.push(order - 1, order - 2);
      trinkle(left, orders.length - 2);
      trinkle(right, orders.length - 1);
    }
  }

  return a;
}`,
    python: `LEO = [1, 1]


def leonardo(k):
    while len(LEO) <= k:
        LEO.append(LEO[-1] + LEO[-2] + 1)
    return LEO[k]


def sift_down(a, root, order):
    while order > 1:
        right = root - 1
        left = root - 1 - leonardo(order - 2)
        bigger = root
        if a[left] > a[bigger]:
            bigger = left
        if a[right] > a[bigger]:
            bigger = right
        if bigger == root:
            break
        a[root], a[bigger] = a[bigger], a[root]
        if bigger == right:
            root, order = right, order - 2
        else:
            root, order = left, order - 1


def smooth_sort(arr):
    a = arr.copy()
    n = len(a)
    orders = []

    def trinkle(root, idx):
        r, i = root, idx
        while True:
            order = orders[i]
            winner = r
            left = right = -1
            if order > 1:
                right = r - 1
                left = r - 1 - leonardo(order - 2)
                if a[left] > a[winner]:
                    winner = left
                if a[right] > a[winner]:
                    winner = right
            stepson = r - leonardo(order) if i > 0 else -1
            if stepson >= 0 and a[stepson] > a[winner]:
                winner = stepson
            if winner == r:
                return
            if winner == stepson:
                a[r], a[stepson] = a[stepson], a[r]
                r, i = stepson, i - 1
                continue
            a[r], a[winner] = a[winner], a[r]
            if winner == right:
                sift_down(a, right, order - 2)
            else:
                sift_down(a, left, order - 1)
            return

    for i in range(n):
        if len(orders) >= 2 and orders[-2] == orders[-1] + 1:
            orders[-2] += 1
            orders.pop()
        elif orders and orders[-1] == 1:
            orders.append(0)
        else:
            orders.append(1)
        trinkle(i, len(orders) - 1)

    for i in range(n - 1, 0, -1):
        if orders[-1] <= 1:
            orders.pop()
        else:
            order = orders.pop()
            right = i - 1
            left = i - 1 - leonardo(order - 2)
            orders.append(order - 1)
            orders.append(order - 2)
            trinkle(left, len(orders) - 2)
            trinkle(right, len(orders) - 1)

    return a`,
  },

  pros: [
    {
      ru: 'Адаптивен: приближается к O(n) на уже почти отсортированных данных, в отличие от обычного heap sort.',
      en: 'Adaptive: approaches O(n) on already nearly sorted data, unlike regular heap sort.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти, сохраняя гарантию O(n log n) в худшем случае.',
      en: 'Sorts in place with O(1) extra memory while keeping the O(n log n) worst-case guarantee.',
    },
    {
      ru: 'Может быть прерван в любой момент — на этот момент уже обработанная часть массива корректно отсортирована относительно себя (свойство, важное для real-time систем).',
      en: 'Can be interrupted at any point — the already-processed part of the array is correctly sorted relative to itself at that moment (a property important for real-time systems).',
    },
  ],
  cons: [
    {
      ru: 'Одна из самых сложных для понимания и реализации сортировок — числа Леонардо и логика trinkle/rectify требуют внимательности.',
      en: 'One of the hardest sorts to understand and implement correctly — Leonardo numbers and the trinkle/rectify logic require care.',
    },
    {
      ru: 'Неустойчив, как и обычный heap sort.',
      en: 'Not stable, same as regular heap sort.',
    },
    {
      ru: 'На случайных данных практически не быстрее обычного heap sort — выигрыш проявляется только на частично упорядоченных входах.',
      en: 'On random data, practically no faster than regular heap sort — the benefit only shows up on partially ordered inputs.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные часто почти отсортированы и важна гарантия O(n log n) без дополнительной памяти (в отличие от Timsort, который использует O(n)).',
      en: 'When data is often nearly sorted and an O(n log n) guarantee without extra memory matters (unlike Timsort, which uses O(n)).',
    },
    {
      ru: 'В системах с жёсткими ограничениями по памяти, где heap sort уже используется, но хочется адаптивности.',
      en: 'In memory-constrained systems already using heap sort, where adaptivity would help.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Разработан Эдсгером Дейкстрой** в 1981 году как демонстрация того, что можно получить адаптивность heap sort без потери гарантий и памяти — важный академический результат в теории сортировок.',
      en: '**Devised by Edsger Dijkstra** in 1981 to demonstrate that heap sort\'s adaptivity could be achieved without sacrificing guarantees or memory — an important academic result in sorting theory.',
    },
    {
      ru: '**Встречается в исследовательских реализациях embedded и real-time систем**, где важна и гарантия худшего случая, и постоянная память, и возможность прерывания на полуслове.',
      en: '**Found in research implementations for embedded and real-time systems**, where both worst-case guarantees, constant memory, and mid-run interruptibility matter.',
    },
  ],

  relatedAlgorithms: ['heap-sort', 'tim-sort'],

  quiz: [
    {
      question: {
        ru: 'Чем куча Леонардо в смузсорте отличается от обычной бинарной кучи в heap sort?',
        en: 'How does a Leonardo heap in smoothsort differ from a regular binary heap in heap sort?',
      },
      options: [
        {
          ru: 'Смузсорт строит лес из нескольких деревьев переменного размера по числам Леонардо вместо одной кучи на весь массив',
          en: 'Smoothsort builds a forest of multiple variable-size trees sized by Leonardo numbers instead of one heap over the whole array',
        },
        {
          ru: 'Куча Леонардо в принципе никогда не поддерживает никакие сравнения элементов друг с другом, только их перестановку местами',
          en: "A Leonardo heap never supports any comparisons between its own elements at all, only their rearrangement in place",
        },
        {
          ru: 'Куча Леонардо всегда имеет ровно 3 элемента независимо от размера всего исходного сортируемого массива данных',
          en: 'A Leonardo heap always has exactly 3 elements regardless of the size of the whole original array of data being sorted',
        },
        {
          ru: 'Разницы нет вообще, это просто два разных исторических названия для абсолютно одной и той же структуры данных, хранящейся в памяти',
          en: "There's no difference at all, it's simply two different historical names for absolutely the same data structure stored in memory",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно структура «леса» переменных по размеру деревьев (вместо единой кучи) позволяет смузсорту адаптироваться к порядку входных данных.',
        en: 'It is exactly this "forest" of variable-sized trees (instead of a single heap) that lets smoothsort adapt to the order of the input data.',
      },
      hint: {
        ru: 'Heap sort строит одну кучу на весь массив. Что смузсорт строит вместо этого?',
        en: 'Heap sort builds one heap over the entire array. What does smoothsort build instead?',
      },
    },
    {
      question: {
        ru: 'Что делает смузсорт «адаптивным» алгоритмом?',
        en: 'What makes smoothsort an "adaptive" algorithm?',
      },
      options: [
        {
          ru: 'На почти отсортированных данных требуется меньше операций восстановления кучи',
          en: 'On already nearly sorted data, fewer heap-restructuring operations are needed',
        },
        {
          ru: 'Он меняет сам алгоритм сравнения элементов в зависимости от типа входных данных',
          en: 'It changes the comparison algorithm itself depending on the type of input data',
        },
        {
          ru: 'Он использует обученную модель машинного обучения, чтобы заранее предсказать порядок',
          en: 'It uses a trained machine learning model to predict the order of elements in advance',
        },
        {
          ru: 'Он всегда работает за строго одинаковое время независимо от входных данных',
          en: 'It always runs in strictly the same amount of time regardless of the input data',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Если элементы уже стоят близко к правильным позициям, просеивание (rectify/trinkle) завершается быстрее — отсюда приближение к O(n) на «гладких» данных.',
        en: 'If elements are already close to their correct positions, sifting (rectify/trinkle) finishes faster — hence the near-O(n) behavior on "smooth" data.',
      },
      hint: {
        ru: 'Адаптивный алгоритм делает меньше работы, когда данные уже частично упорядочены. Что именно требует меньше работы при наличии порядка в данных?',
        en: 'An adaptive algorithm does less work when data is already partially ordered. What specifically requires less work when order is present in the data?',
      },
    },
    {
      question: {
        ru: 'Какую гарантию памяти сохраняет смузсорт по сравнению с Timsort?',
        en: 'What memory guarantee does smoothsort retain compared to Timsort?',
      },
      options: [
        { ru: 'O(1) — сортирует полностью на месте, без временных массивов', en: 'O(1) — sorts entirely in place, with no temporary arrays' },
        {
          ru: 'O(n) — точно такая же дополнительная память, как требуется и Timsort',
          en: 'O(n) — exactly the same extra memory as Timsort requires for its runs',
        },
        {
          ru: 'O(log n) — только на стек рекурсии при обходе леса деревьев Леонардо',
          en: 'O(log n) — only for the recursion stack while traversing the Leonardo tree forest',
        },
        {
          ru: 'O(n log n) — по одному временному элементу на каждый шаг просеивания',
          en: 'O(n log n) — one temporary element allocated for every sifting step performed',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от Timsort, который тратит O(n) памяти на слияние прогонов, смузсорт как вариант heap sort перестраивает деревья прямо внутри исходного массива.',
        en: 'Unlike Timsort, which spends O(n) memory merging runs, smoothsort, as a heap sort variant, restructures trees directly within the original array.',
      },
      hint: {
        ru: 'Timsort сливает отсортированные прогоны во временный буфер. Смузсорт делает то же самое или обходится без него?',
        en: 'Timsort merges sorted runs into a temporary buffer. Does smoothsort do the same, or does it work without one?',
      },
    },
    {
      question: {
        ru: 'Кто разработал смузсорт и с какой целью?',
        en: 'Who devised smoothsort and for what purpose?',
      },
      options: [
        {
          ru: 'Эдсгер Дейкстра — чтобы показать, что heap sort может стать адаптивным без потери гарантий и постоянной памяти',
          en: 'Edsger Dijkstra — to show that heap sort could become adaptive without losing its guarantees or constant memory',
        },
        {
          ru: 'Дональд Кнут — как один из иллюстративных примеров в своей многотомной серии учебников TAOCP',
          en: 'Donald Knuth — as one of the illustrative examples in his own multi-volume TAOCP textbook series',
        },
        {
          ru: 'Тони Хоар — как дальнейшее усовершенствование и развитие своего собственного алгоритма быстрой сортировки quicksort в 1970-х',
          en: 'Tony Hoare — as a further improvement and extension of his own quicksort partitioning algorithm design in the 1970s',
        },
        {
          ru: 'Инженеры компании Google — специально для внутренних высокопроизводительных библиотек сортировки данных',
          en: "Google's own engineers — specifically for internal high-performance data sorting library code",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Смузсорт (1981) — работа Дейкстры, демонстрирующая, что адаптивность (как у insertion sort) не обязательно требует жертвовать памятью или гарантией худшего случая.',
        en: 'Smoothsort (1981) is Dijkstra\'s work, demonstrating that adaptivity (like insertion sort has) doesn\'t necessarily require sacrificing memory or the worst-case guarantee.',
      },
      hint: {
        ru: 'Этот учёный известен алгоритмом поиска кратчайшего пути и концепцией структурного программирования. Кто это?',
        en: 'This scientist is known for a shortest-path algorithm and the concept of structured programming. Who is it?',
      },
    },
    {
      question: {
        ru: 'Почему смузсорт считается одним из самых сложных в реализации алгоритмов сортировки?',
        en: 'Why is smoothsort considered one of the hardest sorting algorithms to implement?',
      },
      options: [
        {
          ru: 'Логика построения и разбора леса куч Леонардо (trinkle, rectify) содержит много взаимосвязанных краевых случаев',
          en: 'The logic for building and tearing down the Leonardo heap forest (trinkle, rectify) has many interdependent edge cases',
        },
        {
          ru: 'Он требует глубокого знания линейной алгебры и продвинутых матричных вычислений на практике при его реализации с нуля',
          en: 'It requires deep knowledge of linear algebra and advanced matrix computations in practice when implementing it from scratch',
        },
        {
          ru: 'Он не может быть реализован ни на одном известном языке программирования без автоматического сборщика мусора',
          en: 'It cannot be implemented in any known programming language without an automatic garbage collector present',
        },
        {
          ru: 'Он работает только с числами с плавающей точкой, но никогда не работает с обычными целыми числами',
          en: 'It only works with floating-point numbers, but never works with plain ordinary integers at all',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от обычного heap sort с единственной регулярной структурой, лес деревьев переменного размера по числам Леонардо требует отслеживания множества состояний при добавлении и удалении элементов.',
        en: 'Unlike regular heap sort with one uniform structure, a forest of variable-sized Leonardo-number trees requires tracking many states as elements are added and removed.',
      },
      hint: {
        ru: 'Сравните сложность поддержания одной бинарной кучи с поддержанием леса деревьев разного размера с нестандартными операциями slicing и merging.',
        en: 'Compare the complexity of maintaining one binary heap versus a forest of differently sized trees with non-standard slicing and merging operations.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность смузсорта в лучшем случае и при каком условии она достигается?',
        en: 'What is smoothsort\'s best-case time complexity and when is it achieved?',
      },
      options: [
        { ru: 'O(n) — когда входные данные уже полностью отсортированы', en: 'O(n) — when the input data is already fully sorted' },
        { ru: 'O(n log n) — лучший и средний случай у смузсорта одинаковы', en: 'O(n log n) — smoothsort\'s best and average cases are the same' },
        { ru: 'O(log n) — если все элементы массива одинаковы', en: 'O(log n) — if all elements in the array are identical' },
        { ru: 'O(1) — при пустом входном массиве без единого элемента', en: 'O(1) — with an empty input array containing no elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'На уже отсортированном массиве операции rectify/trinkle завершаются немедленно — ни один элемент не нарушает инвариант кучи, поэтому суммарная работа линейна.',
        en: 'On an already sorted array, rectify/trinkle operations complete immediately — no element violates the heap invariant — so total work is linear.',
      },
      hint: {
        ru: 'Если данные уже отсортированы, нужно ли что-то перемещать при построении леса куч?',
        en: 'If the data is already sorted, does anything need to be moved while building the heap forest?',
      },
    },
    {
      question: {
        ru: 'Что такое числа Леонардо и как они связаны со смузсортом?',
        en: 'What are Leonardo numbers and how are they related to smoothsort?',
      },
      options: [
        { ru: 'Последовательность L(k)=L(k-1)+L(k-2)+1, задающая допустимые размеры деревьев-куч', en: 'A Fibonacci-like sequence (L(k) = L(k-1) + L(k-2) + 1) defining valid tree sizes in the forest' },
        { ru: 'Простые числа, используемые для выбора опорного элемента при разбиении леса', en: 'Prime numbers used to select the pivot element when partitioning the forest' },
        { ru: 'Степени двойки, определяющие, на каком уровне дерева находится каждый элемент', en: 'Powers of two determining at which tree level each element is located' },
        { ru: 'Индексы элементов, которые гарантированно стоят на правильных позициях после каждого прохода', en: 'Indices of elements guaranteed to be in the correct position after each pass regardless of input' },
      ],
      correct: 0,
      explanation: {
        ru: 'Числа Леонардо: L(0) = 1, L(1) = 1, L(k) = L(k-1) + L(k-2) + 1. Размеры деревьев в лесу смузсорта всегда должны быть числами Леонардо — это обеспечивает корректное слияние и разбиение деревьев.',
        en: 'Leonardo numbers: L(0) = 1, L(1) = 1, L(k) = L(k-1) + L(k-2) + 1. Tree sizes in smoothsort\'s forest must always be Leonardo numbers — this ensures correct tree merging and splitting.',
      },
      hint: {
        ru: 'Вспомните числа Фибоначчи: F(k) = F(k-1) + F(k-2). Как числа Леонардо отличаются от них?',
        en: 'Recall Fibonacci numbers: F(k) = F(k-1) + F(k-2). How do Leonardo numbers differ from them?',
      },
    },
    {
      question: {
        ru: 'Является ли смузсорт устойчивым алгоритмом?',
        en: 'Is smoothsort a stable algorithm?',
      },
      options: [
        { ru: 'Нет — как heap sort, не сохраняет относительный порядок равных элементов', en: 'No — like regular heap sort, it does not preserve the relative order of equal elements' },
        { ru: 'Да — лес куч Леонардо специально спроектирован для сохранения порядка вставки', en: 'Yes — the Leonardo heap forest is specifically designed to preserve insertion order always' },
        { ru: 'Зависит от размера массива: при n < 100 устойчив, при больших n — нет', en: 'It depends on array size: stable for n < 100, unstable for larger n' },
        { ru: 'Да, но только если все элементы массива уникальны и не имеют дубликатов', en: 'Yes, but only if all array elements are unique with no duplicates at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Смузсорт, как и heap sort, при извлечении максимума и перестройке леса может менять относительный порядок одинаковых элементов. Устойчивость не является его свойством.',
        en: 'Smoothsort, like heap sort, can change the relative order of equal elements during maximum extraction and forest restructuring. Stability is not its property.',
      },
      hint: {
        ru: 'Heap sort известен тем, что неустойчив. Смузсорт — вариант heap sort. Что это говорит о его устойчивости?',
        en: 'Heap sort is known to be unstable. Smoothsort is a heap sort variant. What does that suggest about its stability?',
      },
    },
    {
      question: {
        ru: 'Почему смузсорт предпочтительнее Timsort в системах с жёсткими ограничениями памяти?',
        en: 'Why is smoothsort preferable to Timsort in systems with strict memory constraints?',
      },
      options: [
        { ru: 'Смузсорт — O(1) памяти; Timsort требует O(n) для слияния прогонов', en: 'Smoothsort uses O(1) memory, whereas Timsort requires O(n) to merge runs' },
        { ru: 'Смузсорт всегда быстрее Timsort на любом входе, включая случайные данные', en: 'Smoothsort is always faster than Timsort on any input, including random data' },
        { ru: 'Timsort нестабилен в отличие от смузсорта, что важно при сортировке по ключу', en: 'Timsort is unstable unlike smoothsort, which matters when sorting by key' },
        { ru: 'Timsort не может работать на данных с повторяющимися значениями', en: 'Timsort cannot handle data with repeating values at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Timsort сливает прогоны во временный буфер размером O(n), что неприемлемо там, где памяти мало. Смузсорт обходится без дополнительных массивов — весь лес строится прямо в исходном массиве.',
        en: 'Timsort merges runs into an O(n) temporary buffer, which is unacceptable where memory is scarce. Smoothsort needs no extra arrays — the entire forest is built directly within the original array.',
      },
      hint: {
        ru: 'Для чего Timsort выделяет дополнительную память — и нужно ли это смузсорту?',
        en: 'What does Timsort allocate extra memory for — and does smoothsort need that same thing?',
      },
    },
    {
      question: {
        ru: 'Что происходит с деревом в лесу смузсорта, когда из него извлекают корневой элемент?',
        en: 'What happens to a tree in smoothsort\'s forest when its root element is extracted?',
      },
      options: [
        { ru: 'Оно разбивается на два меньших дерева Леонардо, которые остаются в лесу', en: 'It splits into two smaller Leonardo trees that remain in the forest' },
        { ru: 'Оно полностью удаляется из леса, и его элементы больше не участвуют в сортировке', en: 'It is completely removed from the forest, and its elements no longer participate in sorting' },
        { ru: 'Оно заменяется одним новым деревом, вдвое меньшим по высоте исходного', en: 'It is replaced by a single new tree that is half the height of the original' },
        { ru: 'Оно перестраивается в одну бинарную кучу для последующего извлечения по одному', en: 'It is rebuilt into a single binary heap for subsequent one-by-one extraction' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждое дерево Леонардо порядка k состоит из корня и двух поддеревьев порядка k-1 и k-2. При удалении корня эти два поддерева становятся самостоятельными деревьями в лесу.',
        en: 'Each Leonardo tree of order k consists of a root and two subtrees of order k-1 and k-2. When the root is removed, these two subtrees become independent trees in the forest.',
      },
      hint: {
        ru: 'Число Леонардо L(k) = L(k-1) + L(k-2) + 1 (корень). Если убрать корень, что останется?',
        en: 'A Leonardo number L(k) = L(k-1) + L(k-2) + 1 (the root). If you remove the root, what is left?',
      },
    },
  ],
};

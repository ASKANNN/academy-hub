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
    ru: 'Смузсорт, придуманный Эдсгером Дейкстрой, - вариант пирамидальной сортировки, который строит не один бинарный, а лес куч Леонардо переменного размера, что позволяет ему адаптивно ускоряться на частично отсортированных данных, оставаясь сортировкой на месте с O(1) памяти.',
    en: 'Smoothsort, devised by Edsger Dijkstra, is a heap sort variant that builds a forest of variable-size Leonardo heaps instead of one binary heap, allowing it to adaptively speed up on partially sorted data while remaining an in-place sort with O(1) memory.',
  },

  problem: {
    ru: 'Heap sort гарантирует O(n log n) в любом случае, но не умеет использовать уже имеющийся порядок в данных - на почти отсортированном массиве он всё равно тратит полное время построения и разбора кучи. Нужен вариант heap sort, который адаптируется к порядку во входных данных, приближаясь к O(n) на почти отсортированных массивах, но сохраняет и гарантию O(n log n), и постоянную память heap sort.',
    en: 'Heap sort guarantees O(n log n) regardless of input, but can\'t exploit existing order in the data - on a nearly sorted array it still spends the full time building and tearing down the heap. A heap sort variant is needed that adapts to input order, approaching O(n) on nearly sorted arrays, while keeping heap sort\'s O(n log n) guarantee and constant memory.',
  },

  solution: {
    ru: 'Вместо одной бинарной кучи на весь массив смузсорт строит последовательность куч Леонардо - специальных бинарных деревьев с размерами по числам Леонардо (аналог чисел Фибоначчи: L(k) = L(k-1) + L(k-2) + 1). Массив постепенно превращается в лес таких куч слева направо (фаза «просеивания вверх»), а затем максимумы куч поочерёдно извлекаются справа налево, как в обычном heap sort. Ключевое отличие: если входные данные уже частично упорядочены, деревья строятся с меньшим числом операций восстановления кучи - отсюда адаптивность и почти линейное время на «гладких» данных.',
    en: 'Instead of one binary heap over the whole array, smoothsort builds a sequence of Leonardo heaps - special binary trees sized after Leonardo numbers (a Fibonacci-like sequence: L(k) = L(k-1) + L(k-2) + 1). The array is gradually turned into a forest of such heaps left to right (the "sift up" phase), then the heap maximums are extracted right to left, same as regular heap sort. The key difference: if the input is already partially ordered, the trees require fewer heapify operations to build - hence the adaptivity and near-linear time on "smooth" data.',
  },

  details: {
    deepDive: [
      {
        ru: 'Каждое дерево в лесу смузсорта - это не обычное сбалансированное бинарное дерево, а **куча Леонардо порядка k**: у неё есть корень и два поддерева - порядка k-1 и k-2 (а не k-1 и k-1, как у кучи из heap sort). Из-за этого размер дерева растёт не как степень двойки, а по формуле **L(k) = L(k-1) + L(k-2) + 1**, где L(0) = L(1) = 1. Получается последовательность 1, 1, 3, 5, 9, 15, 25, 41... - похожая на числа Фибоначчи, но с добавлением корня на каждом шаге.',
        en: 'Every tree in smoothsort\'s forest is not an ordinary balanced binary tree but a **Leonardo heap of order k**: it has a root and two subtrees - of order k-1 and k-2 (not k-1 and k-1, like a regular binary heap). That makes the tree size grow not as a power of two but by the formula **L(k) = L(k-1) + L(k-2) + 1**, where L(0) = L(1) = 1. The result is the sequence 1, 1, 3, 5, 9, 15, 25, 41... - Fibonacci-like, but with a root added at every step.',
      },
      {
        ru: 'В коде `leonardo(k)` вычисляется лениво и с мемоизацией через массив `LEO`: он растёт по мере того, как `trinkle`/`siftDown` запрашивают всё большие порядки, вместо того чтобы пересчитывать всю последовательность заранее. Для `order` дерева ровно `L(order) - 1` элементов лежат ниже корня, поровну (с точностью до -1) поделённые между левым поддеревом порядка `order-1` и правым порядка `order-2`.',
        en: 'In the code, `leonardo(k)` is computed lazily and memoized via the `LEO` array: it grows as `trinkle`/`siftDown` request larger orders, instead of precomputing the whole sequence upfront. For a tree of `order`, exactly `L(order) - 1` elements sit below the root, split between a left subtree of order `order-1` and a right subtree of order `order-2`.',
      },
      {
        ru: 'Массив `orders` - это, по сути, «цифры» числа n, записанного в системе счисления по числам Леонардо: похоже на теорему Цекендорфа для Фибоначчи, где любое число раскладывается в сумму различных чисел Леонардо. Цикл построения (строки 58-68) поддерживает этот инвариант - если два последних дерева стека имеют соседние порядки (k и k-1), они «сливаются» в одно дерево порядка k+1 (строки 59-61), что напоминает перенос разряда при сложении в этой системе счисления. Именно из-за этого инварианта лес никогда не превышает **O(log n)** деревьев.',
        en: 'The `orders` array is essentially the "digits" of n written in the Leonardo number system - similar to Zeckendorf\'s theorem for Fibonacci numbers, where every integer decomposes into a sum of distinct Leonardo numbers. The build loop (lines 58-68) maintains this invariant - if the stack\'s last two trees have adjacent orders (k and k-1), they "merge" into one tree of order k+1 (lines 59-61), resembling a carry during addition in this number system. This invariant is exactly why the forest never exceeds **O(log n)** trees.',
      },
      {
        ru: 'Функция `trinkle` (строки 28-56) - это расширенная версия просеивания вверх: новый элемент всегда попадает в лес как одноузловое дерево справа, и его нужно поднять не только внутри своего дерева, но, возможно, и через границу с соседним деревом. Для этого на каждом шаге сравниваются три кандидата - оба потомка текущего узла (если `order > 1`) и **«пасынок» (`stepson`)** - корень предыдущего, меньшего по порядку дерева в лесу, с которым текущий элемент мог бы поменяться местами при постройке.',
        en: 'The `trinkle` function (lines 28-56) is an extended sift-up: a new element always enters the forest as a one-node tree on the right, and it may need to move up not just within its own tree but potentially across a tree boundary too. To do that, every step compares three candidates - both children of the current node (if `order > 1`) and the **"stepson"** (`stepson`) - the root of the previous, smaller-order tree in the forest that the current element could swap into.',
      },
      {
        ru: 'Если побеждает «пасынок», элемент перепрыгивает в соседнее дерево слева (строки 45-49, `r = stepson; i--`), и цикл `while (true)` продолжается уже там - это единственный момент, где просеивание выходит за пределы одного дерева. Если побеждает один из детей, вызывается обычный `siftDown` (строки 51-53), который восстанавливает свойство кучи уже строго внутри дерева, спускаясь по нему аналогично heap sort, но со смещениями через `leonardo(order - 2)` вместо `2*i + 1`.',
        en: 'If the "stepson" wins, the element jumps into the neighboring tree on the left (lines 45-49, `r = stepson; i--`), and the `while (true)` loop continues there - the only point where sifting crosses a tree boundary. If one of the children wins instead, the regular `siftDown` is called (lines 51-53), which restores the heap property strictly within one tree, descending it much like heap sort but with offsets via `leonardo(order - 2)` instead of `2*i + 1`.',
      },
      {
        ru: 'Фаза извлечения (строки 70-82) идёт справа налево: последнее дерево леса содержит текущий максимум в своём корне (инвариант леса гарантирует, что корни деревьев слева направо не убывают). Если у извлечённого дерева `order > 1`, оно распадается на два дочерних дерева порядков `order-1` и `order-2` (строки 76-79), и оба новых открытых корня повторно проходят `trinkle` (строки 78-79) - удаление родителя могло нарушить инвариант упорядоченности корней леса.',
        en: 'The extraction phase (lines 70-82) goes right to left: the last tree in the forest holds the current maximum at its root (the forest invariant guarantees tree roots are non-decreasing left to right). If the extracted tree has `order > 1`, it splits into two child trees of order `order-1` and `order-2` (lines 76-79), and both newly exposed roots are re-run through `trinkle` (lines 78-79) - removing the parent could have broken the forest\'s root-ordering invariant.',
      },
      {
        ru: 'Худший случай остаётся **O(n log n)**: в лесу до O(log n) деревьев, и `trinkle` в худшем случае проходит через все их корни при каждой из n вставок/извлечений - для n = 1 000 000 это те же порядка 20 миллионов операций, что и у обычного heap sort. Но на уже отсортированном массиве ни один вызов `siftDown`/`trinkle` не находит нарушения (условия `if (bigger === root) break` и `if (winner === r) return` срабатывают сразу) - отсюда линейное **O(n)** в лучшем случае, недостижимое для heap sort.',
        en: 'The worst case remains **O(n log n)**: the forest has up to O(log n) trees, and in the worst case `trinkle` walks through all of their roots on each of n insertions/extractions - for n = 1,000,000 that\'s roughly the same 20 million operations as regular heap sort. But on an already-sorted array, no `siftDown`/`trinkle` call ever finds a violation (the `if (bigger === root) break` and `if (winner === r) return` conditions fire immediately) - hence the linear **O(n)** best case, unreachable for regular heap sort.',
      },
    ],
    whenToUse: [
      {
        ru: '**Real-time и embedded системы с жёсткой памятью** - когда одновременно нужны гарантия O(n log n), O(1) память и возможность прерваться в любой момент с валидным частичным порядком: ни quicksort (нет гарантии худшего случая), ни Timsort (O(n) память) не закрывают все три требования сразу.',
        en: '**Real-time and embedded systems with strict memory limits** - when you need an O(n log n) guarantee, O(1) memory, and the ability to interrupt mid-sort with a valid partial order all at once: neither quicksort (no worst-case guarantee) nor Timsort (O(n) memory) meets all three requirements together.',
      },
      {
        ru: '**Почти отсортированные потоковые данные** без бюджета на лишнюю память - там, где естественным выбором стал бы Timsort, но памяти на буфер слияния прогонов нет.',
        en: '**Nearly sorted streaming data** with no memory budget to spare - where Timsort would be the natural choice, but there is no room for its run-merging buffer.',
      },
      {
        ru: 'Не стоит использовать на **маленьких массивах** (n < 50) - издержки построения леса куч Леонардо и обилие вложенных функций перевешивают выигрыш; insertion sort проще и быстрее на таких размерах.',
        en: 'Not worth using on **small arrays** (n < 50) - the overhead of building the Leonardo heap forest and the many nested function calls outweigh any benefit; insertion sort is simpler and faster at that size.',
      },
      {
        ru: 'Не выбирать смузсорт, если **не нужны одновременно и гарантия худшего случая, и адаптивность** - если достаточно средней скорости, quicksort/introsort быстрее на практике за счёт лучшей локальности кэша.',
        en: 'Skip smoothsort if you don\'t need **both** the worst-case guarantee and adaptivity at once - if average-case speed is enough, quicksort/introsort is faster in practice thanks to better cache locality.',
      },
      {
        ru: 'Хороший выбор для **учебных и исследовательских задач** о структурах данных - демонстрирует нетривиальное применение чисел Леонардо и леса деревьев как альтернативу единственной куче heap sort.',
        en: 'A good fit for **educational and research work** on data structures - it demonstrates a nontrivial use of Leonardo numbers and a tree forest as an alternative to heap sort\'s single heap.',
      },
    ],
    realWorld: [
      {
        ru: '**EWD796** - оригинальная рукопись Дейкстры 1981 года «Smoothsort, an alphabetical variant of heapsort», доступна в архиве E.W. Dijkstra Archive Техасского университета в Остине.',
        en: '**EWD796** - Dijkstra\'s original 1981 manuscript "Smoothsort, an alphabetical variant of heapsort", available in the E.W. Dijkstra Archive at the University of Texas at Austin.',
      },
      {
        ru: '**Кит Шварц (Keith Schwarz)** написал один из самых цитируемых учебных разборов реализации смузсорта на своём личном сайте - оригинальное описание Дейкстры многие практики называют труднопонимаемым без такого разбора.',
        en: '**Keith Schwarz** wrote one of the most widely cited educational breakdowns of a smoothsort implementation on his personal site - Dijkstra\'s original description is considered hard to follow by many practitioners without it.',
      },
      {
        ru: 'Встречается в **академических курсах по структурам данных** (например, Stanford CS166 и аналогичные курсы) как пример нетривиальной кучи, но почти не используется в промышленных стандартных библиотеках (V8, CPython, glibc `qsort`) - сложность поддержки не окупается небольшим выигрышем над Timsort/introsort.',
        en: 'Shows up in **academic data structures courses** (e.g. Stanford CS166 and similar) as an example of a nontrivial heap, but is almost never used in production standard libraries (V8, CPython, glibc `qsort`) - the maintenance complexity doesn\'t pay off against the small edge over Timsort/introsort.',
      },
      {
        ru: 'Иногда упоминается в статьях об **алгоритмах сортировки с гарантией прерывания** (anytime sorting algorithms) рядом с patience sort - как пример алгоритма, применимого там, где процесс может быть остановлен на полуслове с валидным частично упорядоченным результатом.',
        en: 'Sometimes mentioned in articles about **interruptible ("anytime") sorting algorithms** alongside patience sort - as an example of an algorithm usable where the process may be stopped mid-run and still leave a validly partially ordered result.',
      },
    ],
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
  stepBreakpoints: [2, 15, 29, 40],

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

  walkthrough: {
    javascript: [
      {
        lines: [1, 7],
        title: { ru: 'Мемоизированные числа Леонардо', en: 'Memoized Leonardo numbers' },
        explanation: {
          ru: '`LEO` хранит уже вычисленные числа Леонардо; `leonardo(k)` при необходимости достраивает массив по формуле `L(k) = L(k-1) + L(k-2) + 1`, вместо того чтобы пересчитывать всю последовательность заранее.',
          en: '`LEO` caches Leonardo numbers already computed; `leonardo(k)` extends the array on demand via `L(k) = L(k-1) + L(k-2) + 1`, instead of precomputing the whole sequence upfront.',
        },
      },
      {
        lines: [9, 21],
        title: { ru: 'siftDown: просеивание внутри одного дерева', en: 'siftDown: sifting within a single tree' },
        explanation: {
          ru: 'Классическое просеивание вниз, но смещения детей вычисляются через `leonardo(order - 2)`, а не `2*i + 1` - потому что дерево Леонардо несимметрично: левое поддерево порядка `order-1`, правое `order-2`.',
          en: 'A classic sift-down, but child offsets come from `leonardo(order - 2)` instead of `2*i + 1` - because a Leonardo tree is asymmetric: the left subtree has order `order-1`, the right has order `order-2`.',
        },
      },
      {
        lines: [23, 26],
        title: { ru: 'smoothSort: подготовка', en: 'smoothSort: setup' },
        explanation: {
          ru: 'Копия массива `a` сортируется на месте; `orders` - стек порядков деревьев, реально составляющих лес в текущий момент.',
          en: 'A copy `a` is sorted in place; `orders` is the stack of tree orders that currently make up the forest.',
        },
      },
      {
        lines: [28, 43],
        title: { ru: 'trinkle: поиск победителя', en: 'trinkle: finding the winner' },
        explanation: {
          ru: 'Сравниваются три кандидата на позицию корня: оба ребёнка текущего узла (если `order > 1`) и «пасынок» `stepson` - корень предыдущего меньшего дерева леса.',
          en: 'Three candidates for the root position are compared: both children of the current node (if `order > 1`) and the "stepson" - the root of the previous, smaller tree in the forest.',
        },
      },
      {
        lines: [44, 56],
        title: { ru: 'trinkle: применение результата', en: 'trinkle: applying the result' },
        explanation: {
          ru: 'Если побеждает «пасынок», элемент перепрыгивает в соседнее дерево и цикл продолжается там (единственный выход за пределы одного дерева); если побеждает ребёнок - обмен и передача в `siftDown` для окончательного восстановления кучи.',
          en: 'If the "stepson" wins, the element jumps into the neighboring tree and the loop continues there (the only cross-tree move); if a child wins, swap and hand off to `siftDown` to finish restoring the heap.',
        },
      },
      {
        lines: [58, 68],
        title: { ru: 'Фаза построения леса', en: 'Forest-building phase' },
        explanation: {
          ru: 'На каждой вставке два последних дерева стека либо сливаются в одно большее (когда их порядки соседние), либо добавляется новое дерево - это «перенос разряда» в системе счисления по числам Леонардо; после каждого шага вызывается `trinkle`.',
          en: 'On each insertion, the stack\'s last two trees either merge into one bigger tree (when their orders are adjacent) or a new tree is pushed - the "carry" step of the Leonardo number system; `trinkle` runs after every step.',
        },
      },
      {
        lines: [70, 82],
        title: { ru: 'Фаза извлечения максимумов', en: 'Maximum-extraction phase' },
        explanation: {
          ru: 'Справа налево: последнее дерево отдаёт корень (текущий максимум) на своё финальное место; если у дерева `order > 1`, оно распадается на два дочерних дерева, и оба новых корня повторно проходят `trinkle`.',
          en: 'Right to left: the last tree gives up its root (the current maximum) to its final slot; if the tree\'s `order > 1`, it splits into two child trees, and both newly exposed roots are re-run through `trinkle`.',
        },
      },
      {
        lines: [83, 84],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'К этому моменту лес пуст, а массив `a` полностью отсортирован по возрастанию.',
          en: 'By this point the forest is empty, and array `a` is fully sorted in ascending order.',
        },
      },
    ],
    python: [
      {
        lines: [1, 7],
        title: { ru: 'Мемоизированные числа Леонардо', en: 'Memoized Leonardo numbers' },
        explanation: {
          ru: '`LEO` хранит уже вычисленные числа Леонардо; `leonardo(k)` при необходимости достраивает список по формуле `L(k) = L(k-1) + L(k-2) + 1`.',
          en: '`LEO` caches Leonardo numbers already computed; `leonardo(k)` extends the list on demand via `L(k) = L(k-1) + L(k-2) + 1`.',
        },
      },
      {
        lines: [10, 25],
        title: { ru: 'sift_down: просеивание внутри одного дерева', en: 'sift_down: sifting within a single tree' },
        explanation: {
          ru: 'Смещения детей вычисляются через `leonardo(order - 2)`, а не удвоением индекса - левое поддерево дерева Леонардо порядка `order-1`, правое `order-2`.',
          en: 'Child offsets come from `leonardo(order - 2)` rather than doubling the index - a Leonardo tree\'s left subtree has order `order-1`, the right has order `order-2`.',
        },
      },
      {
        lines: [28, 31],
        title: { ru: 'smooth_sort: подготовка', en: 'smooth_sort: setup' },
        explanation: {
          ru: 'Копия `a` сортируется на месте; `orders` - стек порядков деревьев текущего леса.',
          en: 'A copy `a` is sorted in place; `orders` is the stack of tree orders in the current forest.',
        },
      },
      {
        lines: [33, 48],
        title: { ru: 'trinkle: поиск победителя', en: 'trinkle: finding the winner' },
        explanation: {
          ru: 'Сравниваются оба ребёнка текущего узла (если `order > 1`) и «пасынок» `stepson` - корень предыдущего меньшего дерева леса, с которым текущий элемент мог бы поменяться местами.',
          en: 'Both children of the current node (if `order > 1`) and the "stepson" - the root of the previous, smaller tree in the forest that the element could swap into - are compared.',
        },
      },
      {
        lines: [49, 60],
        title: { ru: 'trinkle: применение результата', en: 'trinkle: applying the result' },
        explanation: {
          ru: 'Если побеждает «пасынок», элемент перепрыгивает в соседнее дерево (`r, i = stepson, i - 1`) и цикл продолжается там; если побеждает ребёнок - обмен и вызов `sift_down`.',
          en: 'If the "stepson" wins, the element jumps into the neighboring tree (`r, i = stepson, i - 1`) and the loop continues there; if a child wins, swap and call `sift_down`.',
        },
      },
      {
        lines: [62, 70],
        title: { ru: 'Фаза построения леса', en: 'Forest-building phase' },
        explanation: {
          ru: 'На каждой вставке два последних дерева стека либо сливаются в большее, либо добавляется новое дерево, после чего вызывается `trinkle`.',
          en: 'On each insertion, the stack\'s last two trees either merge into a bigger tree or a new tree is appended, and `trinkle` runs afterward.',
        },
      },
      {
        lines: [72, 82],
        title: { ru: 'Фаза извлечения максимумов', en: 'Maximum-extraction phase' },
        explanation: {
          ru: 'Справа налево: последнее дерево отдаёт корень на своё финальное место; дерево с `order > 1` распадается на два дочерних, и оба новых корня повторно проходят `trinkle`.',
          en: 'Right to left: the last tree gives up its root to its final slot; a tree with `order > 1` splits into two children, and both newly exposed roots are re-run through `trinkle`.',
        },
      },
      {
        lines: [84, 84],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Лес пуст, `a` полностью отсортирован по возрастанию.',
          en: 'The forest is empty, and `a` is fully sorted in ascending order.',
        },
      },
    ],
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
      ru: 'Может быть прерван в любой момент - на этот момент уже обработанная часть массива корректно отсортирована относительно себя (свойство, важное для real-time систем).',
      en: 'Can be interrupted at any point - the already-processed part of the array is correctly sorted relative to itself at that moment (a property important for real-time systems).',
    },
  ],
  cons: [
    {
      ru: 'Одна из самых сложных для понимания и реализации сортировок - числа Леонардо и логика trinkle/rectify требуют внимательности.',
      en: 'One of the hardest sorts to understand and implement correctly - Leonardo numbers and the trinkle/rectify logic require care.',
    },
    {
      ru: 'Неустойчив, как и обычный heap sort.',
      en: 'Not stable, same as regular heap sort.',
    },
    {
      ru: 'На случайных данных практически не быстрее обычного heap sort - выигрыш проявляется только на частично упорядоченных входах.',
      en: 'On random data, practically no faster than regular heap sort - the benefit only shows up on partially ordered inputs.',
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
      ru: '**Разработан Эдсгером Дейкстрой** в 1981 году как демонстрация того, что можно получить адаптивность heap sort без потери гарантий и памяти - важный академический результат в теории сортировок.',
      en: '**Devised by Edsger Dijkstra** in 1981 to demonstrate that heap sort\'s adaptivity could be achieved without sacrificing guarantees or memory - an important academic result in sorting theory.',
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
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» (куча Леонардо порядка k против бинарной кучи).',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab (a Leonardo heap of order k versus a binary heap).',
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
        ru: 'Если элементы уже стоят близко к правильным позициям, просеивание (rectify/trinkle) завершается быстрее - отсюда приближение к O(n) на «гладких» данных.',
        en: 'If elements are already close to their correct positions, sifting (rectify/trinkle) finishes faster - hence the near-O(n) behavior on "smooth" data.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Углублённо» на вкладке «Суть» (условия `break`/`return`, срабатывающие сразу на отсортированных данных).',
        en: 'See the last "Deep dive" paragraph on the "Intent" tab (the `break`/`return` conditions that fire immediately on sorted data).',
      },
    },
    {
      question: {
        ru: 'Какую гарантию памяти сохраняет смузсорт по сравнению с Timsort?',
        en: 'What memory guarantee does smoothsort retain compared to Timsort?',
      },
      options: [
        { ru: 'O(1) - сортирует полностью на месте, без временных массивов', en: 'O(1) - sorts entirely in place, with no temporary arrays' },
        {
          ru: 'O(n) - точно такая же дополнительная память, как требуется и Timsort',
          en: 'O(n) - exactly the same extra memory as Timsort requires for its runs',
        },
        {
          ru: 'O(log n) - только на стек рекурсии при обходе леса деревьев Леонардо',
          en: 'O(log n) - only for the recursion stack while traversing the Leonardo tree forest',
        },
        {
          ru: 'O(n log n) - по одному временному элементу на каждый шаг просеивания',
          en: 'O(n log n) - one temporary element allocated for every sifting step performed',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от Timsort, который тратит O(n) памяти на слияние прогонов, смузсорт как вариант heap sort перестраивает деревья прямо внутри исходного массива.',
        en: 'Unlike Timsort, which spends O(n) memory merging runs, smoothsort, as a heap sort variant, restructures trees directly within the original array.',
      },
      hint: {
        ru: 'Смотрите второй пункт плюсов на вкладке «Плюсы и минусы» и первый пункт whenToUse (углублённого) на вкладке «Суть».',
        en: 'See the second "Pros" item on the "Pros & Cons" tab and the first extended "When to use" item on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Кто разработал смузсорт и с какой целью?',
        en: 'Who devised smoothsort and for what purpose?',
      },
      options: [
        {
          ru: 'Эдсгер Дейкстра - чтобы показать, что heap sort может стать адаптивным без потери гарантий и постоянной памяти',
          en: 'Edsger Dijkstra - to show that heap sort could become adaptive without losing its guarantees or constant memory',
        },
        {
          ru: 'Дональд Кнут - как один из иллюстративных примеров в своей многотомной серии учебников TAOCP',
          en: 'Donald Knuth - as one of the illustrative examples in his own multi-volume TAOCP textbook series',
        },
        {
          ru: 'Тони Хоар - как дальнейшее усовершенствование и развитие своего собственного алгоритма быстрой сортировки quicksort в 1970-х',
          en: 'Tony Hoare - as a further improvement and extension of his own quicksort partitioning algorithm design in the 1970s',
        },
        {
          ru: 'Инженеры компании Google - специально для внутренних высокопроизводительных библиотек сортировки данных',
          en: "Google's own engineers - specifically for internal high-performance data sorting library code",
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Смузсорт (1981) - работа Дейкстры, демонстрирующая, что адаптивность (как у insertion sort) не обязательно требует жертвовать памятью или гарантией худшего случая.',
        en: 'Smoothsort (1981) is Dijkstra\'s work, demonstrating that adaptivity (like insertion sort has) doesn\'t necessarily require sacrificing memory or the worst-case guarantee.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Углублённо» и первый пункт «Примеры из практики» (углублённого) на вкладке «Суть» (рукопись EWD796, 1981).',
        en: 'See the last "Deep dive" paragraph and the first extended "Real world" item on the "Intent" tab (the EWD796 manuscript, 1981).',
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
        ru: 'Смотрите первый пункт минусов на вкладке «Плюсы и минусы» и абзацы 4-5 раздела «Углублённо» на вкладке «Суть» (логика `trinkle` и «пасынок»).',
        en: 'See the first "Cons" item on the "Pros & Cons" tab and the 4th-5th "Deep dive" paragraphs on the "Intent" tab (the `trinkle` logic and the "stepson").',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность смузсорта в лучшем случае и при каком условии она достигается?',
        en: 'What is smoothsort\'s best-case time complexity and when is it achieved?',
      },
      options: [
        { ru: 'O(n) - когда входные данные уже полностью отсортированы', en: 'O(n) - when the input data is already fully sorted' },
        { ru: 'O(n log n) - лучший и средний случай у смузсорта одинаковы', en: 'O(n log n) - smoothsort\'s best and average cases are the same' },
        { ru: 'O(log n) - если все элементы массива одинаковы', en: 'O(log n) - if all elements in the array are identical' },
        { ru: 'O(1) - при пустом входном массиве без единого элемента', en: 'O(1) - with an empty input array containing no elements' },
      ],
      correct: 0,
      explanation: {
        ru: 'На уже отсортированном массиве операции rectify/trinkle завершаются немедленно - ни один элемент не нарушает инвариант кучи, поэтому суммарная работа линейна.',
        en: 'On an already sorted array, rectify/trinkle operations complete immediately - no element violates the heap invariant - so total work is linear.',
      },
      hint: {
        ru: 'Смотрите бейдж «Время» вверху страницы (best case) и последний абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the "Time" complexity badge at the top of the page (best case) and the last "Deep dive" paragraph on the "Intent" tab.',
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
        ru: 'Числа Леонардо: L(0) = 1, L(1) = 1, L(k) = L(k-1) + L(k-2) + 1. Размеры деревьев в лесу смузсорта всегда должны быть числами Леонардо - это обеспечивает корректное слияние и разбиение деревьев.',
        en: 'Leonardo numbers: L(0) = 1, L(1) = 1, L(k) = L(k-1) + L(k-2) + 1. Tree sizes in smoothsort\'s forest must always be Leonardo numbers - this ensures correct tree merging and splitting.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Углублённо» на вкладке «Суть» и строки 3-7 функции `leonardo` на вкладке «Реализация».',
        en: 'See the first "Deep dive" paragraph on the "Intent" tab and lines 3-7 of the `leonardo` function on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли смузсорт устойчивым алгоритмом?',
        en: 'Is smoothsort a stable algorithm?',
      },
      options: [
        { ru: 'Нет - как heap sort, не сохраняет относительный порядок равных элементов', en: 'No - like regular heap sort, it does not preserve the relative order of equal elements' },
        { ru: 'Да - лес куч Леонардо специально спроектирован для сохранения порядка вставки', en: 'Yes - the Leonardo heap forest is specifically designed to preserve insertion order always' },
        { ru: 'Зависит от размера массива: при n < 100 устойчив, при больших n - нет', en: 'It depends on array size: stable for n < 100, unstable for larger n' },
        { ru: 'Да, но только если все элементы массива уникальны и не имеют дубликатов', en: 'Yes, but only if all array elements are unique with no duplicates at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Смузсорт, как и heap sort, при извлечении максимума и перестройке леса может менять относительный порядок одинаковых элементов. Устойчивость не является его свойством.',
        en: 'Smoothsort, like heap sort, can change the relative order of equal elements during maximum extraction and forest restructuring. Stability is not its property.',
      },
      hint: {
        ru: 'Смотрите тег `unstable` рядом с названием алгоритма вверху страницы и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the `unstable` tag next to the algorithm name at the top of the page and the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Почему смузсорт предпочтительнее Timsort в системах с жёсткими ограничениями памяти?',
        en: 'Why is smoothsort preferable to Timsort in systems with strict memory constraints?',
      },
      options: [
        { ru: 'Смузсорт - O(1) памяти; Timsort требует O(n) для слияния прогонов', en: 'Smoothsort uses O(1) memory, whereas Timsort requires O(n) to merge runs' },
        { ru: 'Смузсорт всегда быстрее Timsort на любом входе, включая случайные данные', en: 'Smoothsort is always faster than Timsort on any input, including random data' },
        { ru: 'Timsort нестабилен в отличие от смузсорта, что важно при сортировке по ключу', en: 'Timsort is unstable unlike smoothsort, which matters when sorting by key' },
        { ru: 'Timsort не может работать на данных с повторяющимися значениями', en: 'Timsort cannot handle data with repeating values at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Timsort сливает прогоны во временный буфер размером O(n), что неприемлемо там, где памяти мало. Смузсорт обходится без дополнительных массивов - весь лес строится прямо в исходном массиве.',
        en: 'Timsort merges runs into an O(n) temporary buffer, which is unacceptable where memory is scarce. Smoothsort needs no extra arrays - the entire forest is built directly within the original array.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и первый пункт whenToUse (углублённого) на вкладке «Суть».',
        en: 'See the "Space" complexity badge at the top of the page and the first extended "When to use" item on the "Intent" tab.',
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
        ru: 'Смотрите шестой абзац раздела «Углублённо» на вкладке «Суть» и шаг «Фаза извлечения максимумов» построчного разбора на вкладке «Реализация».',
        en: 'See the sixth "Deep dive" paragraph on the "Intent" tab and the "Maximum-extraction phase" walkthrough step on the "Implementation" tab.',
      },
    },
  ],
};

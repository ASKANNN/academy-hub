export const oLogN = {
  slug: 'o-log-n',
  category: 'big-o',
  name: { ru: 'O(log n) - Логарифмическая Сложность', en: 'O(log n) - Logarithmic Time' },
  complexity: {
    time: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['logarithmic', 'divide-and-conquer', 'halving'],
  tier: 'fast',

  intent: {
    ru: 'O(log n) - это когда каждый шаг алгоритма отбрасывает половину оставшихся данных, вместо того чтобы проверять их по одной. Массив из 1 000 000 элементов такой алгоритм разберёт всего за 20 шагов, а не за миллион. Это самый заметный переход от «медленно» к «быстро»: данных стало в тысячи раз больше, а шагов - всего на несколько штук.',
    en: 'O(log n) describes an algorithm that throws away half of the remaining data on every single step, instead of checking it one item at a time. On an array of 1,000,000 elements, such an algorithm finishes in just 20 steps, not a million. It is the clearest jump from "slow" to "fast": the data grew a thousandfold, and the step count barely moved.',
  },

  problem: {
    ru: 'Линейный поиск (O(n)) честно находит нужный элемент, но на действительно больших данных это дорого: миллион элементов - до миллиона сравнений. При этом сами данные часто уже отсортированы или могут быть организованы так, чтобы этим воспользоваться. Не пользоваться этим порядком и всё равно перебирать элемент за элементом - значит выбрасывать даром информацию, которая уже есть в структуре данных.',
    en: 'Linear search (O(n)) honestly finds the target, but on truly large data it is expensive: a million elements means up to a million comparisons. Often, though, the data is already sorted or can be organized to take advantage of that. Ignoring that order and still checking elements one by one throws away information that is already sitting right there in the structure of the data.',
  },

  solution: {
    ru: 'Алгоритм - O(log n), если на каждом шаге он **отбрасывает фиксированную долю оставшихся данных** (обычно половину) и работает дальше только с тем, что осталось. Узнать такой код можно по признаку: в нём **нет прохода по всем элементам**, вместо этого - сужение диапазона поиска, обычно с помощью двух границ `low`/`high`, которые на каждом шаге сдвигаются друг к другу. Количество таких шагов равно тому, сколько раз можно поделить `n` пополам, прежде чем останется 1 элемент - это и есть `log₂ n`.',
    en: 'An algorithm belongs to O(log n) if on every step it **discards a fixed fraction of the remaining data** (usually half) and continues working only with what is left. The tell: there is **no pass over all the elements** - instead, the search range narrows, typically tracked by two bounds `low`/`high` that move toward each other on each step. The number of such steps equals how many times `n` can be halved before 1 element is left, which is exactly `log₂ n`.',
  },

  steps: [
    {
      title: { ru: 'Один шаг - вдвое меньше данных', en: 'One step, half the data' },
      explanation: {
        ru: 'При `n = 2` алгоритму нужен 1 шаг, чтобы свести данные к одному элементу. При `n = 4` - уже 2 шага: 4 → 2 → 1.',
        en: 'At `n = 2` the algorithm needs 1 step to narrow the data down to one element. At `n = 4` it takes 2 steps: 4 to 2 to 1.',
      },
    },
    {
      title: { ru: 'Кривая, а не прямая', en: 'A curve, not a straight line' },
      explanation: {
        ru: 'Между `n = 2` и `n = 4` шагов стало больше на 1. Между `n = 512` и `n = 1024` - тоже на 1. Разница в шагах уменьшается, хотя сами данные растут всё сильнее.',
        en: 'Between `n = 2` and `n = 4` the step count rises by 1. Between `n = 512` and `n = 1024` it also rises by only 1. The gap in steps shrinks even as the data itself keeps growing faster.',
      },
    },
    {
      title: { ru: 'Пример: бинарный поиск', en: 'Example: binary search' },
      explanation: {
        ru: 'Самый частый источник O(log n) - поиск в отсортированном массиве, который сравнивает середину диапазона с искомым значением и отбрасывает половину, где ответа точно нет.',
        en: 'The typical source of O(log n) is searching a sorted array by comparing the middle of the range against the target and discarding the half that certainly does not contain the answer.',
      },
    },
    {
      title: { ru: 'n = 8: всего 3 шага', en: 'n = 8: just 3 steps' },
      explanation: {
        ru: '8 элементов сводятся к 1 всего за 3 деления пополам: 8 → 4 → 2 → 1. Для сравнения, линейному поиску в худшем случае понадобилось бы 8 сравнений.',
        en: '8 elements collapse to 1 in just 3 halvings: 8 to 4 to 2 to 1. For comparison, linear search would need up to 8 comparisons in the worst case on the same data.',
      },
    },
    {
      title: { ru: 'Рядом с O(n)', en: 'Next to O(n)' },
      explanation: {
        ru: 'К `n = 10` линия O(log n) едва оторвалась от нижнего края графика, а линия O(n) уже дошла до 10. Дальше, при действительно больших n, этот разрыв только увеличивается.',
        en: 'By `n = 10`, the O(log n) line has barely lifted off the bottom of the chart, while the O(n) line has already climbed to 10. At genuinely large n, that gap only keeps widening.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
    python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 3],
        title: { ru: 'Сигнатура и границы диапазона', en: 'Signature and the search range' },
        explanation: {
          ru: '`binarySearch` принимает **отсортированный** массив `arr` и значение `target`. `low` и `high` - это границы диапазона, в котором ещё может быть ответ, изначально весь массив целиком.',
          en: '`binarySearch` takes a **sorted** array `arr` and a value `target`. `low` and `high` mark the range that might still contain the answer, initially the whole array.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Цикл сужения, а не перебора', en: 'A narrowing loop, not a scan' },
        explanation: {
          ru: '`while (low <= high)` - цикл продолжается, пока диапазон не сузился до пустого. Это не проход по всем элементам: с каждым витком `low` и `high` сближаются вдвое быстрее, чем просто на 1.',
          en: '`while (low <= high)` keeps going until the range narrows to empty. This is not a scan over all elements: `low` and `high` close in on each other twice as fast as a simple step of 1 per iteration.',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Проверка середины', en: 'Checking the midpoint' },
        explanation: {
          ru: '`mid` - индекс ровно посередине текущего диапазона. Если `arr[mid] === target`, ответ найден за этот же шаг - это лучший случай, O(1) по факту, хотя весь алгоритм всё равно называют O(log n) по худшему случаю.',
          en: '`mid` is the index exactly in the middle of the current range. If `arr[mid] === target`, the answer is found right there - the best case, effectively O(1), even though the whole algorithm is still classified O(log n) by its worst case.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Отбрасывание половины', en: 'Discarding half' },
        explanation: {
          ru: 'Если `arr[mid] < target`, всё, что левее `mid`, отбрасывается целиком - ответ может быть только правее. Иначе отбрасывается правая половина. Это и есть суть O(log n): каждый шаг вдвое уменьшает область поиска.',
          en: 'If `arr[mid] < target`, everything left of `mid` is discarded outright - the answer can only be further right. Otherwise the right half is discarded. This is the essence of O(log n): every step cuts the search space in half.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Худший случай', en: 'The worst case' },
        explanation: {
          ru: 'Если диапазон сузился до пустого, а совпадения так и не было, `target` в массиве нет - это худший случай, ровно `⌊log₂ n⌋ + 1` шагов деления пополам.',
          en: 'If the range narrows to empty with no match found, `target` is not in the array - the worst case, taking exactly `⌊log₂ n⌋ + 1` halving steps.',
        },
      },
    ],
    python: [
      {
        lines: [1, 2],
        title: { ru: 'Сигнатура и границы диапазона', en: 'Signature and the search range' },
        explanation: {
          ru: '`binary_search` принимает тот же отсортированный список `arr` и `target`, что и JS-версия. `low`/`high` задают начальный диапазон - весь список.',
          en: '`binary_search` takes the same sorted list `arr` and `target` as the JS version. `low`/`high` set the starting range to the whole list.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Цикл сужения, а не перебора', en: 'A narrowing loop, not a scan' },
        explanation: {
          ru: '`while low <= high` - тот же самый цикл сужения диапазона, что и в JS-версии, а не перебор всех элементов подряд.',
          en: '`while low <= high` is the same range-narrowing loop as the JS version, not a sequential scan over every element.',
        },
      },
      {
        lines: [4, 6],
        title: { ru: 'Проверка середины', en: 'Checking the midpoint' },
        explanation: {
          ru: '`mid = (low + high) // 2` и сравнение с `target` - целочисленное деление в Python даёт тот же индекс середины, что и `Math.floor` в JS.',
          en: '`mid = (low + high) // 2` and the comparison against `target` - Python\'s integer division gives the same midpoint index as `Math.floor` in JS.',
        },
      },
      {
        lines: [7, 9],
        title: { ru: 'Отбрасывание половины', en: 'Discarding half' },
        explanation: {
          ru: 'Та же логика, что в JS: если середина меньше `target`, отбрасывается левая половина диапазона, иначе - правая. Каждый шаг режет область поиска пополам.',
          en: 'The same logic as JS: if the midpoint is less than `target`, the left half of the range is discarded, otherwise the right half is. Every step cuts the search area in half.',
        },
      },
      {
        lines: [10],
        title: { ru: 'Худший случай', en: 'The worst case' },
        explanation: {
          ru: '`return -1` выполняется, когда диапазон сузился до пустого без единого совпадения - тот же худший случай, что и в JS-версии.',
          en: '`return -1` runs once the range has narrowed to empty with no match found - the same worst case as the JS version.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'На больших данных работает почти мгновенно: миллиард отсортированных элементов разбирается всего за 30 шагов, а не за миллиард.',
      en: 'Runs almost instantly on large data: a billion sorted elements take just 30 steps, not a billion.',
    },
    {
      ru: 'Прирост данных почти не ощущается: увеличение размера в 1000 раз добавляет всего около 10 дополнительных шагов, а не в 1000 раз больше работы.',
      en: 'Barely feels growth in the data at all: a 1000x increase in size adds only about 10 extra steps, not 1000x more work.',
    },
    {
      ru: 'Требует всего пары переменных для хранения границ диапазона - лишней памяти под сам поиск почти не нужно.',
      en: 'Needs only a couple of variables to track the range boundaries - almost no extra memory required for the search itself.',
    },
  ],
  cons: [
    {
      ru: 'Работает только на данных, у которых уже есть порядок, который можно использовать - обычно на отсортированном массиве. На неотсортированных данных этот приём неприменим в принципе.',
      en: 'Only works on data with a usable order, typically a sorted array. On unsorted data this technique is simply not applicable.',
    },
    {
      ru: 'Если данные меняются часто, поддержание сортировки при каждой вставке может обойтись дороже, чем экономия на самом поиске.',
      en: 'If the data changes often, keeping it sorted after every insertion can cost more than what the search itself ends up saving.',
    },
    {
      ru: 'Требует произвольного доступа к элементам по индексу - на структуре без такого доступа (например, обычном связном списке) O(log n) уже не получить тем же способом.',
      en: 'Requires random access to elements by index - on a structure without that (like a plain linked list) O(log n) cannot be reached this same way.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные уже отсортированы или будут использоваться для многих повторяющихся поисков - разовая сортировка окупается на каждом следующем запросе.',
      en: 'When the data is already sorted, or will serve many repeated lookups - a one-time sort pays for itself on every subsequent query.',
    },
    {
      ru: 'Когда нужно не просто найти элемент, а определить его позицию среди отсортированных значений - например, куда вставить новое значение, сохранив порядок.',
      en: 'When the goal is not just finding an element but locating its position among sorted values - for example, where to insert a new value while keeping the order.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Бинарные деревья поиска и B-деревья** (индексы в базах данных вроде PostgreSQL/MySQL) - каждый уровень дерева отбрасывает часть данных, поиск по индексу идёт за O(log n).',
      en: '**Binary search trees and B-trees** (database indexes in PostgreSQL/MySQL) - each level of the tree discards a chunk of the data, so an index lookup runs in O(log n).',
    },
    {
      ru: '**git bisect** - находит коммит, который сломал код, делением диапазона коммитов пополам на каждом шаге, вместо проверки каждого коммита по очереди.',
      en: '**git bisect** - finds the commit that broke the code by halving the range of commits on each step, instead of checking every commit one at a time.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Формально O(log n) означает: число шагов растёт как логарифм по основанию 2 от `n` - сколько раз `n` можно поделить пополам, прежде чем останется 1. Для `n = 1 000 000` это `log₂ 1 000 000 ≈ 19.9`, округляется до **20 шагов**. Для линейного поиска на том же массиве в худшем случае потребовался бы **1 000 000** шагов - разница в 50 000 раз, и она только растёт с увеличением данных.',
        en: 'Formally, O(log n) means the step count grows as the base-2 logarithm of `n` - how many times `n` can be halved before 1 is left. For `n = 1,000,000` that is `log₂ 1,000,000 ≈ 19.9`, rounding up to **20 steps**. Linear search on the same array would need up to **1,000,000** steps in the worst case - a 50,000x gap that only widens as the data grows further.',
      },
      {
        ru: 'Пропорция особенно хорошо видна на удвоении данных. Если бинарному поиску на `n` элементах требуется `k` шагов, то на `2n` элементах потребуется всего `k + 1` шаг - не вдвое больше, а на единицу больше. Массив вырос в 1000 раз (это примерно `2^10`), а число шагов выросло всего на **10**.',
        en: 'The pattern shows up cleanly when the data doubles. If binary search on `n` elements takes `k` steps, on `2n` elements it takes just `k + 1` steps - not twice as many, one more. An array growing 1000x (roughly `2^10`) adds only **10** extra steps to the search.',
      },
      {
        ru: 'Ключевое условие для O(log n) - **произвольный доступ к середине диапазона за O(1)**. У массива это `arr[mid]` - мгновенный доступ по индексу (материал O(1)). У связного списка такого доступа нет, до середины нужно идти по ссылкам от начала - сам «поход к середине» уже стоит O(n), и весь алгоритм перестаёт быть O(log n), даже если логика деления пополам формально сохраняется.',
        en: 'The key requirement for O(log n) is **O(1) random access to the middle of the range**. For an array that is `arr[mid]`, instant index access (see the O(1) material). A linked list has no such access - reaching the middle means walking pointers from the start, and that walk alone already costs O(n), breaking the whole algorithm out of O(log n) even though the halving logic itself is unchanged.',
      },
      {
        ru: 'Частая ошибка - искать O(log n) там, где данных с полезным порядком на самом деле нет. Бинарный поиск по неотсортированному массиву не работает вообще: отбрасывание половины опирается на то, что всё слева от `mid` меньше искомого, а всё справа - больше. Без сортировки это предположение неверно, и алгоритм может пропустить существующий элемент.',
        en: 'A common mistake is expecting O(log n) where the data has no usable order to begin with. Binary search on an unsorted array does not work at all: discarding a half relies on everything left of `mid` being smaller than the target and everything right of it being larger. Without sorting, that assumption is false, and the algorithm can skip right past an element that is actually there.',
      },
      {
        ru: 'Логарифмическая сложность встречается не только в поиске: у сбалансированного бинарного дерева высота дерева - тоже `O(log n)` от числа узлов, и именно это делает вставку, удаление и поиск в нём быстрыми. Куча (структура, лежащая в основе **Heap Sort**, уже реализованного в разделе сортировок) по той же причине выполняет sift-up/sift-down за O(log n) - высота кучи растёт логарифмически от числа элементов.',
        en: 'Logarithmic complexity shows up beyond search: a balanced binary tree\'s height is also `O(log n)` in the number of nodes, which is exactly what keeps insertion, deletion, and lookup fast. A heap (the structure behind **Heap Sort**, already implemented in the sorting section) performs sift-up/sift-down in O(log n) for the same reason - heap height grows logarithmically with the element count.',
      },
      {
        ru: 'O(log n) обычно не стоит особняком в общей сложности алгоритма - он чаще встречается как множитель. У **Merge Sort** и **Quick Sort** (в разделе сортировок) сложность `O(n log n)`: `log n` уровней разбиения, и на каждом уровне ещё `O(n)` работы по слиянию или партиционированию - именно так и получается произведение `n · log n`, а не просто `log n`.',
        en: 'O(log n) rarely stands alone in the total cost of a larger algorithm - it more often shows up as a multiplier. **Merge Sort** and **Quick Sort** (in the sorting section) run at `O(n log n)`: `log n` levels of splitting, with `O(n)` of merge or partition work happening at each level - exactly how the product `n · log n` arises, not just `log n` on its own.',
      },
    ],
    whenToUse: [
      {
        ru: '**Поиск в статичных отсортированных данных** - справочники, каталоги, любые данные, которые редко меняются, но по которым часто ищут.',
        en: '**Searching static, sorted data** - lookup tables, catalogs, any data that changes rarely but gets searched often.',
      },
      {
        ru: '**Структуры, где порядок нужен постоянно** - деревья поиска, кучи, индексы баз данных: там O(log n) не разовый трюк, а свойство самой структуры.',
        en: '**Structures that need ordering all the time** - search trees, heaps, database indexes: there O(log n) is not a one-off trick but a property of the structure itself.',
      },
      {
        ru: '**Против O(1)** - если нужен только точный поиск по ключу и порядок не важен, хеш-таблица с её O(1) в среднем случае почти всегда быстрее, чем дерево с O(log n).',
        en: '**Against O(1)** - if only an exact-key lookup is needed and order does not matter, a hash table with its average-case O(1) is almost always faster than a tree at O(log n).',
      },
      {
        ru: '**Как множитель, а не сам по себе** - в составе `O(n log n)` логарифм почти всегда означает разбиение данных на уровни, как в Merge Sort или построении сбалансированного дерева.',
        en: '**As a multiplier, not standalone** - inside `O(n log n)`, the logarithm almost always signals data being split into levels, as in Merge Sort or building a balanced tree.',
      },
    ],
    realWorld: [
      {
        ru: '**Индексы в PostgreSQL и MySQL (B-tree)** - поиск строки по индексированному полю в таблице из миллионов записей укладывается в единицы уровней дерева, а не в перебор строк.',
        en: '**PostgreSQL and MySQL indexes (B-tree)** - looking up a row by an indexed column in a table of millions of records takes only a handful of tree levels, not a scan of the rows.',
      },
      {
        ru: '**Java TreeMap/TreeSet и C++ std::map** - реализованы поверх сбалансированных деревьев (обычно красно-чёрных), поэтому вставка, удаление и поиск - все O(log n).',
        en: '**Java TreeMap/TreeSet and C++ std::map** - built on top of balanced trees (usually red-black trees), so insertion, deletion, and lookup are all O(log n).',
      },
      {
        ru: '**git bisect** - двоичный поиск по истории коммитов для нахождения того, что сломал сборку: несколько десятков коммитов между известными «хорошим» и «плохим» находятся за считанные шаги.',
        en: '**git bisect** - binary search over commit history to find the one that broke the build: dozens of commits between a known "good" and "bad" one get narrowed down in just a handful of steps.',
      },
      {
        ru: '**Heap Sort** (в разделе сортировок) - его sift-down на каждом шаге спускается по дереву-куче на один уровень, а глубина кучи - тот самый `log n`, из-за которого вся сортировка укладывается в `O(n log n)`.',
        en: '**Heap Sort** (in the sorting section) - its sift-down descends one level of the heap tree per step, and the heap\'s depth is exactly that `log n`, which is why the whole sort runs at `O(n log n)`.',
      },
    ],
  },

  relatedAlgorithms: ['o-1', 'o-n'],

  quiz: [
    {
      question: {
        ru: 'Что происходит с количеством шагов алгоритма класса O(log n) при удвоении n?',
        en: 'What happens to the step count of an O(log n) algorithm when n doubles?',
      },
      options: [
        { ru: 'Увеличивается всего на 1 шаг, а не удваивается вместе с n', en: 'It grows by just 1 step, not doubling along with n' },
        { ru: 'Тоже удваивается, во столько же раз, во сколько выросло n', en: 'It also doubles, growing by the exact same factor as n' },
        { ru: 'Остаётся ровно тем же самым числом шагов, что и раньше', en: 'It stays exactly the same number of steps as before' },
        { ru: 'Растёт в квадрате по отношению к тому, во сколько раз выросло n', en: 'It grows quadratically relative to how much n increased' },
      ],
      correct: 0,
      explanation: {
        ru: 'Удвоение n добавляет ровно одно дополнительное деление пополам - именно так растёт логарифм по основанию 2.',
        en: 'Doubling n adds exactly one extra halving step - that is precisely how a base-2 logarithm grows.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - там прямо описан пример с удвоением данных.',
        en: 'See the "Intent" tab - it walks through the doubling example directly.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде можно узнать O(log n)?',
        en: 'What code pattern signals O(log n)?',
      },
      options: [
        { ru: 'Диапазон поиска сужается на каждом шаге, обычно делением пополам', en: 'The search range narrows on every step, usually by halving' },
        { ru: 'Один цикл без вложенности, который проходит по всем элементам один раз', en: 'A single, non-nested loop that walks every element once' },
        { ru: 'Два цикла один внутри другого, оба зависящие от полного размера входа', en: 'Two loops nested inside each other, both depending on the full input size' },
        { ru: 'Рекурсия, которая на каждом шаге создаёт две новые независимые ветки вызовов', en: 'Recursion that branches into two new independent calls on every step' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сужение диапазона делением пополам - именно это делает `binarySearch` на вкладке «Реализация».',
        en: 'Narrowing the range by halving is exactly what `binarySearch` does on the "Implementation" tab.',
      },
      hint: {
        ru: 'Смотрите строки 7-8 функции `binarySearch` на вкладке «Реализация» и шаг «Отбрасывание половины».',
        en: 'See lines 7-8 of `binarySearch` on the "Implementation" tab and its walkthrough step "Discarding half".',
      },
    },
    {
      question: {
        ru: 'На графике: как выглядит линия O(log n) при переходе от n = 1 к n = 10?',
        en: 'On the visualization chart: how does the O(log n) line behave from n = 1 to n = 10?',
      },
      options: [
        { ru: 'Поднимается быстро в начале и почти выравнивается ближе к n = 10', en: 'It rises quickly at first and nearly flattens out as it approaches n = 10' },
        { ru: 'Остаётся идеально горизонтальной линией на всём участке графика', en: 'It stays a perfectly horizontal line across the entire chart' },
        { ru: 'Поднимается ровно на одну и ту же величину между любой парой соседних n', en: 'It rises by the exact same amount between any pair of neighboring n values' },
        { ru: 'Резко взлетает к верхнему краю графика уже на первых нескольких значениях n', en: 'It shoots up toward the top edge of the chart within the first few values of n' },
      ],
      correct: 0,
      explanation: {
        ru: 'Логарифмическая кривая растёт быстро на маленьких n и быстро выполаживается - в этом и есть её характерная форма на графике.',
        en: 'A logarithmic curve rises quickly at small n and flattens out fast - that is its signature shape on the chart.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и сравните форму линии O(log n) с прямой линией O(n).',
        en: 'Open the "Visualization" tab and compare the shape of the O(log n) line with the straight O(n) line.',
      },
    },
    {
      question: {
        ru: 'Почему бинарный поиск не работает на неотсортированном массиве?',
        en: 'Why does binary search not work on an unsorted array?',
      },
      options: [
        { ru: 'Отбрасывание половины опирается на то, что данные слева и справа от середины упорядочены', en: 'Discarding a half relies on the data left and right of the midpoint being ordered' },
        { ru: 'Технически работает, но требует заметно больше памяти под хранение всего диапазона', en: 'It technically works, but requires noticeably more memory to track the whole range' },
        { ru: 'Массив нужно сначала полностью перевести в связный список, а потом уже искать в нём', en: 'The array first needs to be fully converted into a linked list before searching it' },
        { ru: 'Работает совершенно нормально, просто с чуть большим числом шагов, чем на отсортированном', en: 'It works perfectly fine, just with a somewhat larger step count than on sorted data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Без сортировки предположение «слева меньше, справа больше» неверно, и алгоритм может отбросить половину, где на самом деле лежит ответ.',
        en: 'Without sorting, the "left is smaller, right is larger" assumption is false, and the algorithm can discard the half that actually contains the answer.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть» - про ошибку с неотсортированными данными.',
        en: 'See the fourth paragraph of the "Deep dive" section on the "Intent" tab - about the mistake with unsorted data.',
      },
    },
    {
      question: {
        ru: 'Почему у связного списка не получится настоящего O(log n) поиска по «середине», даже если применить ту же логику деления пополам?',
        en: 'Why can a linked list not achieve true O(log n) "middle" search, even applying the same halving logic?',
      },
      options: [
        { ru: 'Доступ к середине списка сам по себе требует прохода по ссылкам за O(n)', en: 'Reaching the middle of the list itself requires walking pointers in O(n)' },
        { ru: 'Связные списки вообще не могут хранить отсортированные значения', en: 'Linked lists cannot store sorted values in the first place, structurally' },
        { ru: 'В связном списке нельзя завести две переменные-границы, как low и high', en: 'A linked list cannot hold two boundary variables, like low and high' },
        { ru: 'Деление пополам работает, но список после этого перестаёт быть отсортированным', en: 'Halving works fine, but the list stops being sorted as a side effect afterward' },
      ],
      correct: 0,
      explanation: {
        ru: 'У массива arr[mid] - O(1), а у связного списка до середины нужно идти по ссылкам от начала - сам этот проход уже O(n), что ломает всю логарифмическую логику.',
        en: 'An array gets arr[mid] in O(1), but a linked list has to walk pointers from the start to reach the middle - that walk alone is already O(n), breaking the whole logarithmic logic.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - про произвольный доступ за O(1) как условие.',
        en: 'See the third paragraph of the "Deep dive" section on the "Intent" tab - about O(1) random access as the requirement.',
      },
    },
    {
      question: {
        ru: 'Почему у Merge Sort и Quick Sort итоговая сложность записывается как O(n log n), а не просто O(log n)?',
        en: 'Why is the total complexity of Merge Sort and Quick Sort written as O(n log n), not just O(log n)?',
      },
      options: [
        { ru: 'На каждом из log n уровней разбиения выполняется ещё O(n) работы по слиянию или партиционированию', en: 'At each of the log n splitting levels, another O(n) of merge or partition work also runs' },
        { ru: 'log n здесь относится только к числу процессорных ядер, использованных при самой сортировке', en: 'log n here refers only to the number of CPU cores used during the sort' },
        { ru: 'n log n - это просто более осторожная, заведомо завышенная оценка сложности на всякий случай', en: 'n log n is simply a more cautious, inflated estimate used just to be safe' },
        { ru: 'На самом деле единственно верная запись - O(log n), а n добавляют по ошибке в большинстве учебников', en: 'The correct notation is actually O(log n), and n gets added by mistake in most textbooks' },
      ],
      correct: 0,
      explanation: {
        ru: 'log n уровней разбиения умножаются на O(n) работы на каждом уровне - произведение и даёт n log n.',
        en: 'log n levels of splitting get multiplied by O(n) of work per level - that product is exactly n log n.',
      },
      hint: {
        ru: 'Смотрите шестой абзац раздела «Как это работает» на вкладке «Суть» - про O(log n) как множитель.',
        en: 'See the sixth paragraph of the "Deep dive" section on the "Intent" tab - about O(log n) as a multiplier.',
      },
    },
    {
      question: {
        ru: 'Массив вырос со 1 000 до 1 000 000 элементов - в 1000 раз. Насколько выросло число шагов бинарного поиска?',
        en: 'An array grew from 1,000 to 1,000,000 elements (1000x). How much did the binary search step count grow?',
      },
      options: [
        { ru: 'Всего примерно на 10 дополнительных шагов, а не в 1000 раз', en: 'By only about 10 extra steps, not by a factor of 1000' },
        { ru: 'Ровно в 1000 раз, вместе с тем, во сколько раз выросли сами данные', en: 'By exactly 1000x, matching how much the data itself grew' },
        { ru: 'В 1 000 000 раз, потому что log n здесь считается от возведения n в квадрат', en: 'By 1,000,000x, because log n here is computed from n squared' },
        { ru: 'Шаги вообще не изменились - размер массива не влияет на бинарный поиск', en: 'The steps did not change at all - array size has no effect on binary search' },
      ],
      correct: 0,
      explanation: {
        ru: '1000-кратный рост данных - это примерно `2^10`, поэтому число шагов вырастает всего на 10, а не в 1000 раз.',
        en: 'A 1000x growth in data is roughly `2^10`, so the step count grows by only 10, not by a factor of 1000.',
      },
      hint: {
        ru: 'Смотрите первый и второй абзацы раздела «Как это работает» на вкладке «Суть» - там разобраны точные числа.',
        en: 'See the first and second paragraphs of the "Deep dive" section on the "Intent" tab - the exact numbers are worked through there.',
      },
    },
    {
      question: {
        ru: 'Нужен поиск строго по точному ключу в неупорядоченных данных, порядок никогда не понадобится. Что почти всегда быстрее: хеш-таблица (O(1)) или дерево поиска (O(log n))?',
        en: 'The task is a strict exact-key lookup in unordered data, order is never needed. What is almost always faster: a hash table (O(1)) or a search tree (O(log n))?',
      },
      options: [
        { ru: 'Хеш-таблица - раз порядок не нужен, её O(1) в среднем случае обгоняет O(log n)', en: 'The hash table - since order is not needed, its average-case O(1) beats O(log n)' },
        { ru: 'Дерево поиска - O(log n) в асимптотике всегда обгоняет O(1) на практике', en: 'The search tree - O(log n) always outperforms O(1) in practice by design' },
        { ru: 'Разницы нет никакой - обе структуры в асимптотике абсолютно эквивалентны друг другу', en: 'There is no difference at all - the two structures are fully equivalent asymptotically' },
        { ru: 'Дерево поиска, потому что оно не может деградировать, а хеш-таблица - может', en: 'The search tree, because it can never degrade, while a hash table can' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если единственная задача - точный поиск по ключу без сохранения порядка, O(1) хеш-таблицы почти всегда обгоняет O(log n) дерева.',
        en: 'If the only task is an exact-key lookup with no need to preserve order, a hash table\'s O(1) almost always beats a tree\'s O(log n).',
      },
      hint: {
        ru: 'Смотрите пункт «Против O(1)» в разделе «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Against O(1)" point in the "Choice nuances" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'git bisect ищет коммит, который сломал сборку, среди 1000 коммитов между известными «хорошим» и «плохим». Примерно сколько проверок понадобится?',
        en: 'git bisect searches for the commit that broke the build among 1000 commits between a known "good" and "bad" one. Roughly how many checks are needed?',
      },
      options: [
        { ru: 'Около 10 проверок - столько раз можно поделить 1000 коммитов пополам', en: 'About 10 checks - that is how many times 1000 commits can be halved' },
        { ru: 'Около 1000 проверок - придётся собрать и протестировать каждый коммит отдельно', en: 'About 1000 checks - every single commit has to be built and tested individually' },
        { ru: 'Около 500 проверок - примерно половина от общего числа коммитов в диапазоне', en: 'About 500 checks - roughly half of the total number of commits in the range' },
        { ru: 'Ровно 2 проверки - достаточно проверить только начало и конец всего диапазона', en: 'Exactly 2 checks - checking only the start and end of the whole range is enough' },
      ],
      correct: 0,
      explanation: {
        ru: 'git bisect - это бинарный поиск по коммитам: `log₂ 1000 ≈ 10`, столько и требуется проверок вместо перебора всей тысячи.',
        en: 'git bisect is binary search over commits: `log₂ 1000 ≈ 10`, so that many checks suffice instead of testing all thousand.',
      },
      hint: {
        ru: 'Смотрите пункт про git bisect в разделе «Примеры в коде» на вкладке «Суть».',
        en: 'See the git bisect point in the "Real world" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Данные меняются очень часто - вставки происходят постоянно, а поиск по ним требуется редко. Почему поддержание O(log n)-поиска здесь может оказаться невыгодным?',
        en: 'The data changes very frequently, with constant insertions, while lookups are rare. Why might maintaining an O(log n) search here be a bad trade-off?',
      },
      options: [
        { ru: 'Поддержание порядка (пересортировка/перестроение дерева) при каждой вставке может стоить дороже, чем экономия на редких поисках', en: 'Keeping the order (re-sorting/rebuilding the tree) on every insertion can cost more than what rare lookups actually save' },
        { ru: 'O(log n)-структуры в принципе никогда не поддерживают никаких вставок новых элементов вообще, ни при каких условиях', en: 'O(log n) structures fundamentally cannot support inserting new elements at all, under any circumstances' },
        { ru: 'Каждая отдельная вставка совершенно автоматически и необратимо превращает весь дальнейший поиск в O(n²) без единого исключения', en: 'Every single insertion automatically and irreversibly turns the entire search into O(n²), with absolutely no exceptions whatsoever' },
        { ru: 'Проблемы здесь вообще никакой не возникает - O(log n) всегда выгоднее любых других вариантов при абсолютно любой частоте вставок', en: 'There is no real issue at all - O(log n) always wins over every single alternative regardless of insertion frequency chosen' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если вставок намного больше, чем поисков, накладные расходы на поддержание порядка могут перевесить выигрыш от быстрого поиска.',
        en: 'If insertions vastly outnumber lookups, the overhead of keeping the order can outweigh the benefit of a fast search.',
      },
      hint: {
        ru: 'Смотрите второй пункт «Минусы» на вкладке «Плюсы и минусы».',
        en: 'See the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
  ],
};

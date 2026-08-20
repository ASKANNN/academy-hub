export const o1 = {
  slug: 'o-1',
  category: 'big-o',
  name: { ru: 'O(1) - Константная Сложность', en: 'O(1) - Constant Time' },
  complexity: {
    time: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['constant', 'no-growth', 'baseline'],
  tier: 'fast',

  intent: {
    ru: 'O(1) - это когда объём работы вообще не зависит от того, сколько данных на входе. Массив из 10 элементов или из 10 000 000 - разницы никакой, операция займёт одно и то же время. Это самый быстрый класс сложности из всех и одновременно теоретический потолок скорости: быстрее просто не бывает.',
    en: 'O(1) describes an operation whose cost does not depend on the size of the input at all. An array of 10 elements or one with 10,000,000 elements makes no difference: the operation takes the same amount of time either way. It is the fastest complexity class there is, and also the practical speed ceiling: nothing can be faster than not depending on input size.',
  },

  problem: {
    ru: 'В коде постоянно встречаются операции вроде «взять элемент по индексу» или «найти значение по ключу». Если не различать, какие из них правда не зависят от размера данных, а какие лишь выглядят простыми, легко ошибиться в оценке производительности целой системы. Разница между «эта операция быстрая всегда» и «эта операция быстрая, пока данных немного» решает, выдержит ли сервис рост в тысячу раз или начнёт тормозить уже на десятой тысяче записей.',
    en: 'Code is full of operations like "get the element at this index" or "look up a value by key". Without a clear way to tell which of them truly do not depend on data size and which only look simple, it is easy to misjudge the performance of an entire system. The difference between "this is always fast" and "this is fast only while the data stays small" decides whether a service survives a thousandfold growth in traffic or starts stalling after the first ten thousand records.',
  },

  solution: {
    ru: 'Операция - O(1), если для неё существует **фиксированное число шагов**, которое не меняется, сколько бы данных ни было на входе. Узнать такой код просто: в нём **нет циклов и нет обращений к структурам, которые сами зависят от размера данных** - только прямой доступ по известному адресу, индексу или ключу. Внутри операции может быть несколько отдельных действий подряд (например, сравнение, потом присваивание), но их количество фиксировано заранее и не растёт вместе с `n`.',
    en: 'An operation belongs to O(1) if there is a **fixed number of steps** that does not change no matter how much data is on the input. The tell is almost always the same: **no loops, and no access to a structure whose own cost depends on input size** - just a direct read by a known address, index, or key. There can be several distinct actions inside the operation (a comparison, then an assignment), but their count is fixed in advance and never grows together with `n`.',
  },

  steps: [
    {
      title: { ru: 'Одна операция, всегда', en: 'One operation, always' },
      explanation: {
        ru: 'При `n = 1` алгоритм делает 1 операцию. При `n = 10` - тоже 1. Размер входа никак не влияет на количество шагов.',
        en: 'At `n = 1` the operation takes 1 unit of work. At `n = 10` it still takes 1. The size of the input has no effect on the step count at all.',
      },
    },
    {
      title: { ru: 'Прямая линия на нуле роста', en: 'A flat line, zero growth' },
      explanation: {
        ru: 'Между любыми соседними значениями `n` разница в работе - ровно 0. На графике это горизонтальная линия, не диагональ, как у O(n).',
        en: 'Between any two neighboring values of `n` the difference in work is exactly 0. On the chart this is a flat horizontal line, not a rising diagonal like O(n).',
      },
    },
    {
      title: { ru: 'Пример: доступ по индексу', en: 'Example: access by index' },
      explanation: {
        ru: 'Самый частый источник O(1) - обращение к элементу массива по известному индексу: `arr[index]` находит нужную ячейку памяти сразу, без перебора.',
        en: 'The typical source of O(1) is reading an array element by a known index: `arr[index]` jumps straight to the right memory cell, no scanning required.',
      },
    },
    {
      title: { ru: 'n = 8: ничего не изменилось', en: 'n = 8: nothing changed' },
      explanation: {
        ru: '8 элементов в массиве или 800 - обращение `arr[3]` всё так же занимает одну операцию. Рост данных вообще не отражается на этой линии.',
        en: '8 elements in the array or 800, reading `arr[3]` still costs one operation either way. Growth in the data leaves this line completely untouched.',
      },
    },
    {
      title: { ru: 'Рядом с O(n)', en: 'Next to O(n)' },
      explanation: {
        ru: 'К `n = 10` линия O(1) всё ещё стоит на отметке 1, а линия O(n) уже дошла до 10. Это и есть разница между «не зависит от данных» и «растёт вместе с данными».',
        en: 'By `n = 10`, the O(1) line still sits at 1, while the O(n) line has climbed to 10. That gap is exactly the difference between "independent of the data" and "grows together with the data".',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function getElementAt(arr, index) {
  if (index < 0 || index >= arr.length) return undefined;
  return arr[index];
}`,
    python: `def get_element_at(arr, index):
    if index < 0 or index >= len(arr):
        return None
    return arr[index]`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`getElementAt` принимает массив `arr` и индекс `index`, который нужно прочитать. Возвращает значение по этому индексу.',
          en: '`getElementAt` takes an array `arr` and an `index` to read. It returns the value stored at that index.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Проверка границ - тоже O(1)', en: 'The bounds check is O(1) too' },
        explanation: {
          ru: '`index < 0 || index >= arr.length` - два сравнения и обращение к `arr.length`. Длина массива хранится готовым числом, а не считается перебором, поэтому и сама проверка не зависит от размера `arr`.',
          en: '`index < 0 || index >= arr.length` is two comparisons plus a read of `arr.length`. Array length is stored as a ready-made number, not computed by scanning, so the check itself does not depend on the size of `arr` either.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Прямой доступ по адресу', en: 'Direct access by address' },
        explanation: {
          ru: '`arr[index]` - это ядро O(1): движок вычисляет адрес ячейки по формуле «начало массива + index * размер элемента» и читает её напрямую, без единого шага перебора.',
          en: '`arr[index]` is the core O(1) step: the engine computes the cell address as "array start plus index times element size" and reads it directly, with no scanning step at all.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`get_element_at` принимает список `arr` и `index` - те же аргументы и тот же результат, что и в JS-версии.',
          en: '`get_element_at` takes a list `arr` and an `index`, matching the JS version\'s contract exactly.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Проверка границ - тоже O(1)', en: 'The bounds check is O(1) too' },
        explanation: {
          ru: '`index < 0 or index >= len(arr)` - `len()` в Python для списков тоже O(1): длина хранится отдельным полем, а не пересчитывается проходом по элементам.',
          en: '`index < 0 or index >= len(arr)` - `len()` on a Python list is also O(1): the length is stored as a separate field, not recomputed by walking the elements.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Прямой доступ по адресу', en: 'Direct access by address' },
        explanation: {
          ru: '`arr[index]` работает так же, как в JS-версии: интерпретатор сразу вычисляет нужный адрес в памяти, без перебора предыдущих элементов.',
          en: '`arr[index]` works exactly like the JS version: the interpreter computes the target memory address immediately, with no need to walk through the preceding elements.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Самый быстрый класс сложности из возможных: время выполнения не растёт вообще, сколько бы данных ни прибавилось.',
      en: 'The fastest complexity class there is: execution time does not grow at all, no matter how much data gets added.',
    },
    {
      ru: 'Поведение легко предсказать наперёд: если операция заняла микросекунду на маленьких данных, она займёт примерно столько же и на огромных.',
      en: 'Behavior is trivial to predict ahead of time: if the operation took a microsecond on small data, it will take about the same on huge data too.',
    },
    {
      ru: 'Отлично масштабируется под нагрузку: миллион запросов в секунду к O(1)-операции стоит примерно во столько же раз дороже, во сколько выросло число запросов, а не размер самих данных.',
      en: 'Scales cleanly under load: a million requests per second against an O(1) operation costs proportionally more only because of request count, never because the underlying dataset grew.',
    },
  ],
  cons: [
    {
      ru: 'Такой скорости не бывает бесплатно: обычно за ней стоит структура данных, которую заранее подготовили - отсортировали, построили индекс или хеш-таблицу.',
      en: 'That speed rarely comes for free: it usually rests on a data structure that was prepared in advance - sorted, indexed, or organized into a hash table ahead of time.',
    },
    {
      ru: '«Средний случай O(1)» у хеш-таблиц может незаметно деградировать до O(n) при плохом распределении ключей или большом числе коллизий.',
      en: 'The "average-case O(1)" of a hash table can silently degrade toward O(n) with a poorly distributed hash function or a large number of collisions.',
    },
    {
      ru: 'Не подходит для задач, где нужно увидеть или обработать все элементы: посчитать сумму или найти максимум за O(1) в принципе невозможно, для этого придётся заглянуть в каждый элемент хотя бы раз.',
      en: 'Not applicable to tasks that require touching every element: summing values or finding a maximum cannot be done in O(1) - that requires looking at each element at least once.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда нужно достать значение по уже известному адресу, индексу или ключу - массив по индексу, объект/словарь по ключу, стек через push/pop.',
      en: 'When the value needs to be reached by an already-known address, index, or key - an array by index, a dictionary by key, a stack via push/pop.',
    },
    {
      ru: 'Когда операция выполняется очень часто (тысячи или миллионы раз в секунду) - именно там разница между O(1) и любым растущим классом становится решающей.',
      en: 'When the operation runs very often (thousands or millions of times per second) - that is exactly where the gap between O(1) and any growing class starts to matter most.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**JavaScript Map/Object и Python dict** - чтение значения по ключу в среднем случае O(1), за счёт хеш-таблицы под капотом.',
      en: '**JavaScript Map/Object and Python dict** - reading a value by key is average-case O(1), thanks to a hash table underneath.',
    },
    {
      ru: '**Redis GET** - классическое хранилище ключ-значение, спроектированное так, чтобы чтение по ключу оставалось O(1) даже при миллионах записей.',
      en: '**Redis GET** - a classic key-value store, deliberately designed so that a lookup by key stays O(1) even with millions of entries.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'У O(1) есть точное определение: существует число `c`, такое что работа не превышает `c`, и это `c` не зависит от `n` вообще. У `getElementAt` это ровно 3 действия - проверка нижней границы, проверка верхней границы, чтение по адресу - и ни одно из них не становится длиннее с ростом массива. Это и делает функцию честным O(1), а не просто «выглядит быстрой на тестах».',
        en: 'Formally, O(1) means: there exists a constant `c` such that the work never exceeds `c`, and `c` does not depend on `n` at all. `getElementAt` above does exactly 3 things - a lower-bound check, an upper-bound check, and a read by address - and none of them get longer as the array grows. That is what makes the function honestly O(1), not just "fast in the benchmarks so far".',
      },
      {
        ru: 'Разница с O(n) видна на конкретных числах. Чтение `arr[500]` в массиве из **1 000** элементов - одна операция. То же чтение в массиве из **1 000 000** элементов - тоже одна операция: данные выросли в 1000 раз, а работа не выросла вовсе. Для сравнения, линейный поиск того же значения (материал O(n)) в худшем случае вырос бы вместе с массивом - с 1 000 сравнений до 1 000 000.',
        en: 'The difference from O(n) shows up in concrete numbers. Reading `arr[500]` in a **1,000**-element array is one operation. The same read in a **1,000,000**-element array is still one operation: the data grew 1000x, and the work did not grow at all. By comparison, a linear search for the same value (covered in the O(n) material) would in the worst case have grown right along with the array, from 1,000 comparisons to 1,000,000.',
      },
      {
        ru: 'Прямой доступ по индексу работает за O(1) из-за того, как устроен массив в памяти: все его элементы лежат подряд, друг за другом, поэтому адрес любого элемента можно вычислить формулой `начало + index * размер элемента`, не заглядывая в предыдущие ячейки. У связного списка такой формулы нет - элементы разбросаны по памяти и связаны ссылками, поэтому доступ к n-му элементу там уже O(n), а не O(1).',
        en: 'Direct index access is O(1) because of how an array is laid out in memory: all its elements sit contiguously, one after another, so the address of any element can be computed with the formula "start plus index times element size", with no need to look at the preceding cells. A linked list has no such formula - its elements are scattered in memory and connected by pointers, so reaching the nth element there is O(n), not O(1).',
      },
      {
        ru: 'Хеш-таблица (JS `Map`/`Object`, Python `dict`) добивается своего среднего O(1) иначе: ключ пропускается через хеш-функцию, которая превращает его в число - индекс внутри внутреннего массива - и дальше это уже обычный O(1)-доступ по индексу. «Средний случай» здесь важная оговорка: это работает, пока хеш-функция равномерно раскидывает ключи, без большого числа коллизий.',
        en: 'A hash table (JS `Map`/`Object`, Python `dict`) reaches its average-case O(1) a different way: the key is run through a hash function that turns it into a number - an index into an internal array - and from there it is ordinary O(1) index access. The "average case" qualifier matters here: this holds only while the hash function spreads keys evenly, without a large number of collisions.',
      },
      {
        ru: 'Частая ловушка - «амортизированный O(1)» путают с настоящим O(1). У `push()` в конец динамического массива (JS `Array.push`, растущий вектор в других языках) обычное добавление - O(1), но время от времени массиву не хватает места, и он копирует все элементы в новый, больший блок памяти - разовая операция O(n). Если размазать эти редкие O(n)-копирования по всем вызовам `push`, в среднем получается O(1) - но это не значит, что вообще каждый отдельный вызов гарантированно быстрый.',
        en: 'A common trap is confusing "amortized O(1)" with true O(1). Pushing onto the end of a dynamic array (JS `Array.push`, a growable vector in other languages) is normally O(1), but every so often the array runs out of room and copies all its elements into a new, larger memory block - a one-off O(n) operation. Spread those rare O(n) copies across every `push` call, and the average comes out O(1) - but that does not mean any single individual call is guaranteed to be fast.',
      },
      {
        ru: 'O(1) - это практический потолок скорости: быстрее, чем не заглянуть в данные вообще, не бывает. Любая задача, где ответ зависит хотя бы от одного значения на входе, требует минимум одной операции - значит, O(1) уже достиг этой границы, и ускорять его дальше некуда, разве что уменьшать саму константу `c` (например, заменить два сравнения на одно).',
        en: 'O(1) is the practical speed ceiling: nothing can be faster than not looking at the data at all. Any task whose answer depends on at least one input value requires a minimum of one operation, so O(1) has already hit that floor - there is nowhere left to speed it up except shrinking the constant `c` itself (say, replacing two comparisons with one).',
      },
    ],
    whenToUse: [
      {
        ru: '**Точечный доступ по известному адресу** - индекс массива, ключ словаря, вершина стека. Если позиция или ключ заранее известны, ничего быстрее O(1) не построить.',
        en: '**Pinpoint access by a known address** - an array index, a dictionary key, the top of a stack. If the position or key is already known, nothing faster than O(1) can be built.',
      },
      {
        ru: '**Кэширование результатов** - однажды посчитанное значение кладётся в хеш-таблицу по ключу, и повторный запрос того же ключа обходится в O(1) вместо повторного пересчёта.',
        en: '**Caching computed results** - a value computed once gets stored in a hash table by key, and a repeated request for the same key costs O(1) instead of recomputing it.',
      },
      {
        ru: '**Против O(log n)** - если нужен не точный ключ, а диапазон значений («все заказы дороже $50»), хеш-таблица с её O(1) тут не поможет: для диапазонных запросов нужна упорядоченная структура вроде дерева, а значит и O(log n).',
        en: '**Against O(log n)** - if the need is a range of values rather than an exact key ("all orders over $50"), a hash table\'s O(1) does not help: range queries need an ordered structure like a tree, which means O(log n) instead.',
      },
      {
        ru: '**Не притворяться там, где неправда** - если внутри «O(1)-операции» на самом деле прячется цикл или рекурсия по данным, это уже не O(1), и называть её так - ошибка, которая всплывёт при росте данных.',
        en: '**Do not fake it where it is not true** - if a "O(1) operation" actually hides a loop or recursion over the data, it is not O(1) anymore, and labeling it that way is a mistake that surfaces the moment the data grows.',
      },
    ],
    realWorld: [
      {
        ru: '**Хеш-таблицы CPython (dict) и V8 (Object/Map)** - обе реализации построены вокруг того, чтобы чтение и запись по ключу оставались O(1) в среднем случае, даже при десятках миллионов записей.',
        en: '**CPython\'s dict and V8\'s Object/Map** - both implementations are built around keeping read and write by key at average-case O(1), even with tens of millions of entries.',
      },
      {
        ru: '**Redis и Memcached** - хранилища ключ-значение в оперативной памяти, где GET/SET по ключу спроектированы как O(1) - именно за счёт этого их используют как кэш перед медленной базой данных.',
        en: '**Redis and Memcached** - in-memory key-value stores where GET/SET by key are designed as O(1) - exactly why they get used as a cache layer in front of a slower database.',
      },
      {
        ru: '**Хеш-индексы в базах данных (PostgreSQL hash index)** - для точного совпадения по ключу дают O(1) доступ, в отличие от B-tree индекса того же движка, который для той же задачи работает за O(log n).',
        en: '**Hash indexes in databases (PostgreSQL hash index)** - give O(1) access for exact-match lookups by key, unlike a B-tree index in the same engine, which handles the same task in O(log n).',
      },
      {
        ru: '**Массив с прямым доступом по индексу** (в разделе сортировок используется в реализации каждого алгоритма) - наглядный пример того, откуда берётся O(1) в самом фундаменте: без него не работала бы ни одна из сортировок.',
        en: '**Array indexing** (used inside every sorting algorithm\'s implementation in the sorting section) is a live example of where O(1) comes from at the very foundation - without it, none of those sorting algorithms would work at all.',
      },
    ],
  },

  relatedAlgorithms: ['o-n'],

  quiz: [
    {
      question: {
        ru: 'Как меняется объём работы у операции класса O(1), когда растёт `n`?',
        en: 'How does the amount of work in an O(1) operation depend on input size `n`?',
      },
      options: [
        { ru: 'Никак не меняется - остаётся одним и тем же числом операций', en: 'It does not change at all - the operation count stays the same fixed number' },
        { ru: 'Растёт медленно, но всё равно немного увеличивается вместе с ростом n', en: 'It grows slowly, but still creeps upward little by little together with n' },
        { ru: 'Сначала заметно растёт, а затем начинает постепенно уменьшаться обратно', en: 'It grows noticeably at first, then gradually starts decreasing back down again' },
        { ru: 'Зависит от того, насколько именно велико конкретное значение самого n', en: 'It depends on exactly how large the specific value of n itself happens to be' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это и есть определение O(1): работа остаётся постоянной, сколько бы данных ни было на входе.',
        en: 'That is the definition of O(1) - the work stays constant no matter how much data is on the input.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - там прямо написано про независимость от размера данных.',
        en: 'See the "Intent" tab - it directly explains the independence from data size.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде почти всегда можно узнать O(1)?',
        en: 'What code pattern almost always signals O(1)?',
      },
      options: [
        { ru: 'Нет циклов и нет обращений к структурам, зависящим от размера данных', en: 'No loops and no access to structures whose cost depends on data size' },
        { ru: 'Один цикл без вложенности, который проходит по всем элементам один раз', en: 'A single, non-nested loop that walks every element exactly once' },
        { ru: 'Два цикла один внутри другого, оба зависящие от размера входных данных', en: 'Two loops nested inside each other, both depending on the full input size' },
        { ru: 'Рекурсия, на каждом шаге которой данных остаётся вдвое меньше, чем было', en: 'Recursion where the amount of remaining data is cut in half on every call' },
      ],
      correct: 0,
      explanation: {
        ru: 'Прямой доступ по адресу без циклов и без обращений к растущим структурам - именно это делает `getElementAt` на вкладке «Реализация».',
        en: 'Direct access by address, with no loops and no calls into growing structures, is exactly what `getElementAt` does on the "Implementation" tab.',
      },
      hint: {
        ru: 'Смотрите строку 3 функции `getElementAt` на вкладке «Реализация» и шаг «Прямой доступ по адресу».',
        en: 'See line 3 of `getElementAt` on the "Implementation" tab and its walkthrough step "Direct access by address".',
      },
    },
    {
      question: {
        ru: 'На графике: что происходит с линией O(1) между n = 1 и n = 10?',
        en: 'On the visualization chart: what happens to the O(1) line between n = 1 and n = 10?',
      },
      options: [
        { ru: 'Остаётся на той же высоте - линия горизонтальная, без единого шага вверх', en: 'It stays at the same height - a flat horizontal line, without a single upward step' },
        { ru: 'Поднимается ровно на одну единицу между каждой соседней парой значений n подряд', en: 'It rises by exactly one unit between every single neighboring pair of n values in turn' },
        { ru: 'Резко взлетает вверх, почти касаясь самого верхнего края графика уже к n = 10', en: 'It shoots sharply upward, nearly reaching the very top edge of the chart already by n = 10' },
        { ru: 'Сначала растёт до самой середины графика, а затем внезапно падает обратно к нулю', en: 'It rises to the exact middle of the chart first, then suddenly drops back down to zero' },
      ],
      correct: 0,
      explanation: {
        ru: 'Постоянная сложность на графике - горизонтальная линия: высота не зависит от n.',
        en: 'Constant complexity on the chart is a horizontal line - the height does not depend on n.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и сравните точку на графике при n = 1 и при n = 10.',
        en: 'Open the "Visualization" tab and compare the marker position at n = 1 and at n = 10.',
      },
    },
    {
      question: {
        ru: 'Почему `arr[index]` - O(1), а `arr.includes(value)` на том же массиве - уже нет?',
        en: 'Why is `arr[index]` O(1) while `arr.includes(value)` on the same array is not?',
      },
      options: [
        { ru: 'Индекс сразу даёт адрес нужной ячейки, а includes должен проверить элементы по очереди', en: 'An index gives the address of the target cell directly, while includes must check elements one by one' },
        { ru: 'includes на самом деле работает заметно быстрее индекса, потому что использует внутреннюю хеш-таблицу', en: 'includes actually runs noticeably faster than indexing, because it internally relies on a hidden hash table' },
        { ru: 'Оба варианта на самом деле честный O(1) - разница есть только в удобстве написания самого кода', en: 'Both are actually honest O(1) - the only real difference is how convenient the code is to write' },
        { ru: 'arr[index] на самом деле работает медленнее, потому что каждый раз заново пересчитывает длину массива', en: 'arr[index] is actually slower in practice, because it recalculates the array length on every single call' },
      ],
      correct: 0,
      explanation: {
        ru: 'Индексация вычисляет адрес по формуле за одно действие, а includes в худшем случае проверяет каждый элемент - это уже O(n), разбирается в материале про O(n).',
        en: 'Indexing computes the address with a formula in one step, while includes checks every element in the worst case - that is O(n), covered in the O(n) material.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - про формулу адреса массива.',
        en: 'See the third paragraph of the "Deep dive" section on the "Intent" tab - about the array address formula.',
      },
    },
    {
      question: {
        ru: 'Что может незаметно ухудшить «средний случай O(1)» у хеш-таблицы?',
        en: 'What can silently degrade a hash table\'s "average-case O(1)"?',
      },
      options: [
        { ru: 'Плохая хеш-функция с большим числом коллизий между разными ключами', en: 'A poor hash function producing a large number of collisions between different keys' },
        { ru: 'Слишком маленький физический размер самих ключей, которые хранятся в таблице целиком', en: 'Keys that are too small in their physical size being stored inside the underlying table' },
        { ru: 'Использование строковых ключей вместо числовых во всех без единого исключения операциях', en: 'Using string keys instead of numeric keys for every single operation performed overall' },
        { ru: 'Хранение готовых значений, а не только одних ключей, внутри той же самой общей таблицы', en: 'Storing full ready-made values, and not only keys, inside that very same underlying table' },
      ],
      correct: 0,
      explanation: {
        ru: 'Много коллизий заставляет хеш-таблицу перебирать несколько кандидатов на один ключ, и в пределе это деградирует к O(n).',
        en: 'Heavy collisions force the hash table to check several candidates for one key, and in the limit this degrades toward O(n).',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть» - про хеш-таблицы и коллизии.',
        en: 'See the fourth paragraph of the "Deep dive" section on the "Intent" tab - about hash tables and collisions.',
      },
    },
    {
      question: {
        ru: 'Что значит «амортизированный O(1)» у операции push() в конец динамического массива?',
        en: 'What does "amortized O(1)" mean for a push() onto the end of a dynamic array?',
      },
      options: [
        { ru: 'Большинство вызовов - O(1), но редкие вызовы с копированием массива стоят O(n)', en: 'Most calls are O(1), but rare calls that trigger a resize copy cost O(n)' },
        { ru: 'Каждый отдельный вызов push гарантированно занимает ровно одну операцию всегда', en: 'Every single push call is guaranteed to take exactly one operation, no exceptions ever' },
        { ru: 'push работает заметно быстрее, если массив уже отсортирован по возрастанию значений', en: 'push runs noticeably faster if the array happens to already be sorted in ascending order' },
        { ru: 'Амортизация означает, что push всегда работает за O(n), а не за O(1) вовсе никогда', en: 'Amortization means push always runs at O(n), not at O(1) at all, despite what the name suggests' },
      ],
      correct: 0,
      explanation: {
        ru: 'Изредка массиву не хватает места и он копирует все элементы - разовое O(n), которое размазывается по многим быстрым вызовам и в среднем даёт O(1).',
        en: 'Occasionally the array runs out of room and copies every element - a one-off O(n) that gets spread across many fast calls, averaging out to O(1).',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» - про амортизированный O(1) и push.',
        en: 'See the fifth paragraph of the "Deep dive" section on the "Intent" tab - about amortized O(1) and push.',
      },
    },
    {
      question: {
        ru: 'Функция всегда выполняет ровно 5 действий подряд, независимо от размера входа. Какой у неё класс сложности?',
        en: 'A function always performs exactly 5 actions in a row, regardless of input size. What is its complexity class?',
      },
      options: [
        { ru: 'O(1) - число 5 не зависит от n и в нотации Big O опускается как константа', en: 'O(1) - the number 5 does not depend on n and gets dropped in Big O notation as a constant' },
        { ru: 'O(5) - это отдельный, специальный класс сложности где-то между O(1) и O(n)', en: 'O(5) - a distinct, special complexity class that sits somewhere in between O(1) and O(n)' },
        { ru: 'O(n), потому что абсолютно любая функция с несколькими действиями внутри - линейная', en: 'O(n), because absolutely any function with several fixed actions inside it always counts as linear' },
        { ru: 'Сложность здесь вообще нельзя определить без точного знания размера входа n заранее', en: 'The complexity cannot be determined at all here without first knowing the exact value of n in advance' },
      ],
      correct: 0,
      explanation: {
        ru: 'Big O описывает форму роста, а не точное число операций - фиксированное количество действий, не зависящее от n, всегда остаётся O(1).',
        en: 'Big O describes the shape of growth, not the exact operation count - a fixed number of actions that does not depend on n is always O(1).',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Как это работает» на вкладке «Суть» - там объясняется через число `c`.',
        en: 'See the first paragraph of the "Deep dive" section on the "Intent" tab - the formal definition using the constant c.',
      },
    },
    {
      question: {
        ru: 'В базе данных есть точный хеш-индекс (O(1)) и B-tree индекс (O(log n)) по одному и тому же полю. Когда стоит выбрать именно B-tree, а не более быстрый хеш-индекс?',
        en: 'A database offers both an exact hash index (O(1)) and a B-tree index (O(log n)) on the same field. When should the B-tree be chosen over the faster hash index?',
      },
      options: [
        { ru: 'Когда нужны диапазонные запросы - например, «все значения больше X»', en: 'When range queries are needed - for example, "all values greater than X"' },
        { ru: 'Когда сама таблица содержит меньше тысячи строк, а запросы приходят совсем редко', en: 'When the table itself holds fewer than a thousand rows and queries arrive very rarely indeed' },
        { ru: 'Когда абсолютно все без исключения запросы - это поиск по точному совпадению одного ключа', en: 'When absolutely every single query without exception is an exact-match lookup on just one key' },
        { ru: 'B-tree никогда вообще не стоит выбирать, если доступен хеш-индекс с постоянным O(1)', en: 'A B-tree should never be chosen at all whenever an O(1) hash index happens to be available' },
      ],
      correct: 0,
      explanation: {
        ru: 'Хеш-индекс отлично работает для точного совпадения, но не хранит порядок - для диапазонов нужна упорядоченная структура вроде B-tree, а значит O(log n).',
        en: 'A hash index works great for exact matches, but stores no order - range queries need an ordered structure like a B-tree, which means O(log n) instead.',
      },
      hint: {
        ru: 'Смотрите пункт «Против O(log n)» в разделе «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Against O(log n)" point in the "Choice nuances" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Нужно за доли миллисекунды проверять, есть ли конкретный ID пользователя среди 10 миллионов ID, миллионы раз в секунду, без учёта порядка. Какой подход подходит лучше всего?',
        en: 'You need to check whether a specific user ID exists among 10 million IDs, millions of times per second, with no need for ordering. Which approach fits best?',
      },
      options: [
        { ru: 'Хеш-множество (Set/dict) - проверка наличия ключа в среднем случае O(1)', en: 'A hash set (Set/dict) - checking whether a key exists is average-case O(1)' },
        { ru: 'Линейный перебор всех 10 миллионов ID при каждой отдельной новой проверке', en: 'A linear scan through all 10 million IDs on every single new check performed' },
        { ru: 'Полная пересортировка всех ID заново перед каждой отдельной новой проверкой', en: 'Fully re-sorting all the IDs from scratch before every single new check performed' },
        { ru: 'Связный список, потому что вставка новых ID в него быстрее, чем в обычный массив', en: 'A linked list, because inserting new IDs into it is faster than into a plain array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Проверка «есть ли ключ» в хеш-множестве - классический сценарий O(1), именно ради таких высокочастотных точечных проверок оно и существует.',
        en: 'Checking "does this key exist" in a hash set is the classic O(1) scenario - exactly the kind of high-frequency exact-match check it exists for.',
      },
      hint: {
        ru: 'Смотрите первый пункт «Когда применять» на вкладке «Суть» - про точечный доступ по известному ключу.',
        en: 'See the first "When to use" item on the "Intent" tab - about pinpoint access by a known key.',
      },
    },
    {
      question: {
        ru: 'Данные выросли с 1 000 до 1 000 000 элементов. Как изменилась стоимость одной O(1)-операции над этими данными?',
        en: 'The data grew from 1,000 to 1,000,000 elements. How did the cost of a single O(1) operation over that data change?',
      },
      options: [
        { ru: 'Не изменилась вообще - именно это и делает O(1) практическим потолком скорости', en: 'It did not change at all - which is exactly what makes O(1) the practical speed ceiling' },
        { ru: 'Выросла ровно в 1000 раз, во столько же, во сколько выросли сами данные целиком', en: 'It grew exactly 1000x, matching precisely how much the data itself grew overall' },
        { ru: 'Выросла в 1 000 000 раз, потому что операция должна сравнить абсолютно все элементы', en: 'It grew 1,000,000x, because the operation has to compare absolutely every single element' },
        { ru: 'Немного снизилась, потому что более крупные структуры данных обычно работают быстрее', en: 'It slightly decreased, because larger data structures are apparently faster in practice' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно неизменность при любом росте n делает O(1) теоретическим потолком: быстрее, чем не зависеть от размера данных, ничего не бывает.',
        en: 'This exact independence from the growth of n is what makes O(1) the theoretical ceiling: nothing can be faster than not depending on data size at all.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» и последний абзац перед «Нюансы выбора» на вкладке «Суть».',
        en: 'See the second paragraph of the "Deep dive" section and the closing paragraph before "Choice nuances" on the "Intent" tab.',
      },
    },
  ],
};

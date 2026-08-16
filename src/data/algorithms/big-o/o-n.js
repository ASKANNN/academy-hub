export const oN = {
  slug: 'o-n',
  category: 'big-o',
  name: { ru: 'O(n) - Линейное Время', en: 'O(n) - Linear Time' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['linear', 'single-pass', 'baseline'],

  intent: {
    ru: 'O(n) - это когда работы становится ровно во столько же раз больше, во сколько выросли данные. 10 элементов - 10 шагов. 100 элементов - 100 шагов. Никаких сюрпризов: сколько данных, столько и работы. Это самый простой и понятный класс сложности - примерно так люди и представляют себе «обработать список», даже без всякой математики.',
    en: 'O(n) describes an algorithm whose amount of work grows directly proportional to the size of the input n. Twice the elements means twice the operations, ten times the elements means ten times the operations, no exceptions and no jumps. It is the most intuitive complexity class: it matches how most people already picture "processing a list", math aside.',
  },

  problem: {
    ru: 'Фраза «этот код проходит по массиву» сама по себе ничего не говорит. Один цикл может быть безобидным O(n), а другой - незаметно прятать внутри себя ещё один проход по тем же данным и превращаться в O(n²). На 100 элементах разницы не видно вообще. На 100 000 - один вариант отработает за секунды, а другой будет тормозить часами. Нужно уметь заранее отличать «работа растёт вместе с данными» от «работа растёт быстрее данных» - до того, как программа реально начнёт тормозить у пользователей.',
    en: 'Saying "this code walks the array" tells you nothing about how it behaves on an input a thousand times larger. One loop can be a harmless O(n), while another quietly hides a second pass over the same data and becomes O(n²) - a difference invisible at 100 elements that turns into hours instead of seconds at 100,000. What is needed is a way to tell "work grows with the data" apart from "work grows faster than the data", without waiting for the program to actually slow down in production.',
  },

  solution: {
    ru: 'Алгоритм - это O(n), если он проходит по входным данным **один раз**: заглядывает в каждый элемент фиксированное число раз (обычно один), не возвращается к уже обработанным частям и не запускает внутри себя ещё один проход по тем же данным. Узнать такой код просто: в нём **один цикл, и внутри него нет ещё одного цикла**, а сам он идёт от начала до конца массива, строки или списка. Внутри цикла может быть сколько угодно простых действий - сравнение, сложение, запись в переменную - это не важно, потому что их количество не зависит от размера данных `n`.',
    en: 'An algorithm belongs to O(n) if it makes a **single pass** over the input - touching every element a constant number of times (usually once), never re-scanning already-processed parts, and never launching a nested pass over the same data. The technical tell is almost always one thing: a **single, non-nested loop** running from the start to the end of the array, string, or list. Inside that loop there can be any number of constant-time operations (a comparison, an addition, a variable write) - that does not change the class, because none of them depend on `n`.',
  },

  steps: [
    {
      title: { ru: 'Один элемент - одна операция', en: 'One element, one operation' },
      explanation: {
        ru: 'При `n = 1` алгоритм делает 1 операцию, при `n = 2` - уже 2. Каждый новый элемент добавляет ровно одну операцию, не больше и не меньше.',
        en: 'At `n = 1` the algorithm performs 1 operation, at `n = 2` it performs 2. Every new element adds exactly one unit of work, no more and no less.',
      },
    },
    {
      title: { ru: 'Прямая линия, без скачков', en: 'A straight line, no jumps' },
      explanation: {
        ru: 'Между `n = 3` и `n = 4` разница - ровно одна операция. И между любыми другими соседними значениями `n` - тоже ровно одна. Никаких резких скачков и никакого замедления.',
        en: 'Between `n = 3` and `n = 4` the difference is exactly one operation - the same gap as between any other neighboring pair of `n` values. No jumps, no flattening out.',
      },
    },
    {
      title: { ru: 'Одна операция на элемент', en: 'One operation per element' },
      explanation: {
        ru: 'Чаще всего O(n) получается из простого цикла, который заходит в каждый элемент массива ровно один раз: найти самое большое число, посчитать сумму, скопировать элементы.',
        en: 'The typical source of O(n) is a loop that visits every array element exactly once: finding the maximum, summing values, copying, a single traversal.',
      },
    },
    {
      title: { ru: 'n = 8: заметно, но честно', en: 'n = 8: noticeable, but honest' },
      explanation: {
        ru: '8 операций на 8 элементов - ровно вдвое больше, чем 4 операции на 4 элемента. Рост предсказуем: без резкого удорожания, просто пропорционально.',
        en: '8 operations for 8 elements is exactly twice the 4 operations for 4 elements. The growth is predictable and linear, with no sudden spike in cost.',
      },
    },
    {
      title: { ru: 'Рядом с O(n²)', en: 'Next to O(n²)' },
      explanation: {
        ru: 'К `n = 10` линия O(n) стоит на отметке 10, а линия O(n²) уже почти упирается в потолок графика. На маленьких `n` разница едва заметна - но именно она решает всё, когда данных становится много.',
        en: 'By `n = 10`, the O(n) line still sits at 10, while O(n²) is already brushing the top of the chart. At small `n` the gap is barely visible, but that exact gap decides everything at larger inputs.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`linearSearch` принимает массив `arr` и значение `target`, которое нужно найти. Возвращает индекс `target` в массиве, а если его там нет - `-1`.',
          en: '`linearSearch` takes an array `arr` and a value `target`, and returns the index of `target` in the array, or `-1` if it is not there.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Единственный проход', en: 'The single pass' },
        explanation: {
          ru: '`for (let i = 0; i < arr.length; i++)` - один цикл без цикла внутри него, который идёт от первого элемента до последнего. Именно из-за него получается O(n): в худшем случае цикл выполнится не больше `n` раз.',
          en: '`for (let i = 0; i < arr.length; i++)` is a single, non-nested loop that runs from the first element to the last. This is the source of O(n): in the worst case it runs no more than `n` iterations.',
        },
      },
      {
        lines: [3, 5],
        title: { ru: 'Сравнение и ранний выход', en: 'The comparison and early exit' },
        explanation: {
          ru: '`arr[i] === target` - сравнение, которое всегда занимает одно и то же время, независимо от размера массива. Если элемент найден, функция сразу возвращает `i`. Это лучший случай: если `target` - первый элемент, цикл выполнится всего 1 раз, хотя весь алгоритм всё равно называют O(n) - по его худшему случаю.',
          en: '`arr[i] === target` is a constant-time comparison that does not depend on `n`. If the element is found, the function returns `i` immediately: this is the best case - if `target` happens to be the first element, only 1 iteration actually runs, even though the algorithm is still classified O(n) by its worst case.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Худший случай', en: 'The worst case' },
        explanation: {
          ru: 'Если совпадений не было, цикл доходит до самого конца - до `n`-го элемента - и функция возвращает `-1`. Это и есть худший случай, который определяет класс O(n): ни одного совпадения, все `n` сравнений выполнены.',
          en: 'If nothing matched, the loop runs through all `n` elements and the function returns `-1`. This is exactly the scenario that defines the O(n) class: with no match at all, all `n` comparisons run, not one fewer.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: '`linear_search` принимает список `arr` и значение `target` - те же аргументы и тот же результат, что и в JS-версии.',
          en: '`linear_search` takes a list `arr` and a value `target`, matching the JS version\'s contract: the index on a match, `-1` if there is none.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Единственный проход', en: 'The single pass' },
        explanation: {
          ru: '`for i in range(len(arr))` - тот же самый единственный цикл без вложенности, что и в JS-версии, проходящий по всем индексам ровно один раз.',
          en: '`for i in range(len(arr))` is the same single, non-nested loop as the JS version, walking every index exactly once.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Сравнение и ранний выход', en: 'The comparison and early exit' },
        explanation: {
          ru: '`if arr[i] == target: return i` - сравнение с постоянным временем и немедленный возврат при совпадении, точно как лучший случай в JS-версии.',
          en: '`if arr[i] == target: return i` is a constant-time comparison with an immediate return on a match, identical to the JS version\'s best case.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Худший случай', en: 'The worst case' },
        explanation: {
          ru: '`return -1` выполняется, только когда цикл честно проверил все `n` элементов и не нашёл совпадения - тот же худший случай, что и в JS-версии.',
          en: '`return -1` runs only after the loop has honestly checked all `n` elements and found no match - the same worst case as the JS version.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Легко предсказать: если известно время обработки тысячи записей, время для миллиона легко прикинуть - просто умножить.',
      en: 'Predictable, direct dependence on input size - easy to estimate how long a million records will take once you know the time for a thousand.',
    },
    {
      ru: 'Не нужно ничего готовить заранее - ни сортировки, ни индексов. Один проход работает на любых данных, даже полностью неупорядоченных.',
      en: 'Needs no sorting, indexes, or other structures prepared in advance - a linear pass works on any data, even completely unordered.',
    },
    {
      ru: 'Обычно это один простой цикл без вложенности, поэтому код легко читать, и в нём редко прячутся случайные проблемы с производительностью.',
      en: 'Usually fits in a single non-nested loop, so the code is easy to read and rarely hides accidental performance problems.',
    },
  ],
  cons: [
    {
      ru: 'На очень больших `n` (миллиарды записей) даже O(n) может стать медленным - особенно если каждая отдельная операция внутри цикла сама по себе не бесплатна.',
      en: 'At very large `n` (billions of records), even O(n) becomes a bottleneck, especially if the operation inside the loop is not cheap on its own.',
    },
    {
      ru: 'Легко случайно превратить в O(n²): если внутри цикла вызвать ещё одну O(n)-операцию (например, поиск в массиве), сложность незаметно перемножается сама на себя.',
      en: 'Easily turns into O(n²) by accident: calling an O(n) function (like an array search) inside another loop of the same size `n` quietly squares the complexity.',
    },
    {
      ru: 'Не использует порядок, который уже есть в данных: даже в отсортированном массиве линейный поиск в худшем случае проверит все `n` элементов, хотя бинарный поиск справился бы за O(log n).',
      en: 'Ignores any order the data already has: even on a sorted array, linear search still checks all `n` elements in the worst case, while binary search would finish in O(log n).',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда данные нужно обработать целиком хотя бы раз: посчитать сумму, найти максимум, скопировать элементы. Такие задачи сами требуют «тронуть» каждый элемент минимум один раз.',
      en: 'When the data must be processed in full at least once - summing values, finding a maximum, copying elements: the task itself requires touching every element at least once.',
    },
    {
      ru: 'Когда данные не отсортированы и строить отдельную структуру (дерево, индекс) ради одного разового поиска не имеет смысла - один проход обойдётся дешевле подготовки.',
      en: 'When the input is unsorted and building an index or tree just for a single one-off lookup is not worth it - one pass is cheaper than preparing a data structure.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Array.prototype.map/filter/forEach** в JavaScript и списковые включения в Python - под капотом это один проход по всем элементам, O(n) по самому устройству метода.',
      en: '**Array.prototype.map/filter/forEach** in JavaScript and list comprehensions in Python - under the hood, a single pass over every element, O(n) by the very definition of the method.',
    },
    {
      ru: '**grep** читает файл построчно, ровно один раз - классический пример O(n) относительно размера файла, без предварительного построения индекса.',
      en: '**grep** reads a file line by line exactly once - a classic O(n) example relative to file size, with no content index built ahead of time.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'У O(n) есть точное определение: существует число `c`, такое что работы не больше, чем `c`, умноженное на `n`, начиная с какого-то размера входа. У `linearSearch` в худшем случае - ровно `n` сравнений: не `n + 5`, не `n / 2`, а именно `n`. Здесь `c = 1` - это самый чистый пример O(n), какой только бывает.',
        en: 'Formally, O(n) means: there exists a constant `c` such that the amount of work does not exceed `c · n` from some input size onward. For `linearSearch` above, the worst case runs exactly `n` comparisons - not `n + 5`, not `n / 2`, exactly `n`, so here `c = 1`. It is about as clean and literal an example of linear complexity as they come.',
      },
      {
        ru: 'Пропорциональность хорошо видна на числах. Поиск в массиве из **1 000** элементов в худшем случае - 1 000 сравнений. Поиск в массиве из **1 000 000** элементов - 1 000 000 сравнений: данных стало в 1000 раз больше, и работы стало ровно в 1000 раз больше, не больше и не меньше. Для сравнения: у алгоритма с O(n²) (как **Bubble Sort** или **Insertion Sort** из раздела сортировок) тот же рост данных в 1000 раз превращает 1 000 000 операций в **1 000 000 000 000** - в миллион раз больше, а не в тысячу.',
        en: 'The proportionality shows up in concrete numbers. Searching a **1,000**-element array in the worst case takes 1,000 comparisons. Searching a **1,000,000**-element array takes 1,000,000 comparisons: the input grew 1000x, and the work grew exactly 1000x, no more, no less. By comparison, an O(n²) algorithm (like **Bubble Sort** or **Insertion Sort**, both already implemented in the sorting section) turns that same 1000x input growth into 1,000,000 operations becoming **1,000,000,000,000** - a millionfold jump, not a thousandfold one.',
      },
      {
        ru: 'Разница с O(n²) видна прямо в коде. У **Bubble Sort** и **Insertion Sort** есть **цикл внутри цикла**: внешний проходит по всем `n` элементам, а внутри него - ещё один проход, тоже по `n` элементам. Отсюда `n · n = n²` сравнений. У `linearSearch` внутри цикла нет второго цикла - только простые действия вроде сравнения и возврата значения. Поэтому сложность остаётся `n · O(1) = O(n)`, а не `n · n`.',
        en: 'The difference from O(n²) is visible directly in the code structure. **Bubble Sort** and **Insertion Sort** use a **nested loop**: an outer pass over all `n` elements, and inside it, another pass that also depends on `n`, producing `n · n = n²` comparison pairs. Inside `linearSearch`\'s loop there is no second loop - only constant-time operations (a comparison, a return), so the total complexity stays `n · O(1) = O(n)`, not `n · n`.',
      },
      {
        ru: 'Самая частая ошибка - спрятанный O(n) внутри другого O(n). Код вида `for (const x of arr) { if (arr.includes(x)) { ... } }` выглядит как один цикл, но `.includes()` - это тоже проход по всему массиву, и он запускается на **каждой** итерации внешнего цикла. На массиве из 10 000 элементов это уже не 10 000 операций, а до **100 000 000**. Код остаётся O(n²) - просто вторая `n` спряталась внутри готового метода вместо явного `for`.',
        en: 'The most common trap is a hidden O(n) inside an O(n). Code like `for (const x of arr) { if (arr.includes(x)) { ... } }` looks like one loop, but `.includes()` is itself another linear pass over the array on **every** iteration of the outer loop. On a 10,000-element array that is not 10,000 operations but up to **100,000,000** - the code is still O(n²), the second `n` is just disguised as a built-in method call instead of an explicit `for`.',
      },
      {
        ru: 'Когда об алгоритме говорят просто «O(n)» без уточнений, почти всегда имеют в виду **худший случай**. У `linearSearch` лучший случай - O(1) (нужный элемент оказался первым), средний случай на случайных данных - примерно `n / 2` сравнений, а худший случай - все `n` сравнений (элемента нет вообще, или он последний). Разница между этими тремя случаями - отдельная тема, ей посвящён материал «Лучший/средний/худший случай».',
        en: '"O(n)" by default describes the **worst case**. `linearSearch`\'s best case is O(1) (the target is first), its average case on random data is around `n / 2` comparisons, and its worst case is the full `n` comparisons (the element is absent, or it is last). When an algorithm is described simply as "O(n)" with no qualifier, it almost always means the worst case - a distinction covered in full by the neighboring "Best/Average/Worst case" material.',
      },
      {
        ru: 'На однопроходных O(n)-алгоритмах держится обработка больших объёмов данных: подсчёт строк в лог-файле, вычисление контрольной суммы файла, поиск через `grep`. Все они читают вход ровно один раз, без повторных проходов и без загрузки всего файла в память сразу - именно за счёт линейности они справляются с файлами в десятки гигабайт.',
        en: 'Single-pass O(n) algorithms underpin large-scale streaming data processing: counting lines in a log file, computing a file checksum, line-by-line search with `grep`. All of them read the input exactly once, with no repeated passes and no need to load the whole file into memory at once - it is precisely the linearity that makes them viable on files tens of gigabytes in size.',
      },
      {
        ru: 'O(n) - это своего рода нижняя граница для любой задачи, где нужно хотя бы посмотреть на каждый элемент входа: быстрее, чем прочитать все `n` элементов, задачу решить не получится. Поэтому если данные не отсортированы и заранее не подготовлен индекс, поиск, сумма или максимум не могут быть быстрее O(n). А если код уже уместился в один проход без вложенности - он уже достиг этой границы.',
        en: 'O(n) is the practical floor for any task that has to at least look at every element of the input: there is no way to solve the problem faster than reading all `n` elements. The takeaway: if the data is unsorted and no index has been built ahead of time, a search, a sum, or a maximum cannot be faster than O(n) - and as soon as code fits in a single non-nested pass, it has already hit that floor.',
      },
    ],
    whenToUse: [
      {
        ru: '**Задачи, где нужно увидеть все данные целиком** - сумма, среднее, максимум, минимум, подсчёт вхождений. Результат просто нельзя получить, не посмотрев на каждый элемент хотя бы раз.',
        en: '**Tasks that require a full view of the data** - sum, average, max/min, counting occurrences: the result cannot in principle be obtained without looking at every element at least once.',
      },
      {
        ru: '**Разовый поиск в неотсортированных данных** - если массив не отсортирован и больше не понадобится, строить дерево или хеш-таблицу ради одного поиска дороже, чем просто пройти по массиву.',
        en: '**A one-off search in unsorted data** - if the array is unsorted and will not be reused, building a tree or hash table just for a single lookup costs more than the linear pass itself.',
      },
      {
        ru: '**Против O(log n)** - если данные уже отсортированы или под рукой есть хеш-таблица, O(n) почти всегда стоит заменить на бинарный поиск или прямой доступ по ключу. Здесь линейность - уже не предел возможностей, а упущенная возможность ускориться.',
        en: '**Against O(log n)** - if the data is already sorted or a structure like a hash table is available, O(n) should almost always be replaced with binary search or a direct key lookup: linearity stops being the floor and becomes a missed optimization.',
      },
      {
        ru: '**Как кирпичик, а не как цель** - простые однопроходные операции (map, filter, sum) свободно комбинируются друг с другом и остаются в сумме O(n) - если, конечно, не вкладывать их одну в другую по тем же данным.',
        en: '**As a building block, not an end goal** - single-pass operations (map, filter, sum) chain together freely and stay O(n) overall, as long as they are not nested over data of the same size.',
      },
    ],
    realWorld: [
      {
        ru: '**Утилиты Unix wc, grep, cat** - все они читают файл за один проход, поэтому спокойно работают с файлами, которые целиком не помещаются в оперативную память.',
        en: '**The Unix utilities wc, grep, cat** - all built around a single-pass read of the file, which is exactly what lets them work on files that clearly do not fit entirely in RAM.',
      },
      {
        ru: '**Обработка потоков событий (Kafka, лог-агрегаторы)** - каждое событие обрабатывается один раз, сразу при поступлении, без возврата к предыдущим. Линейность здесь заложена прямо в архитектуру.',
        en: '**Streaming event processing (Kafka consumers, log aggregators)** - each event is processed once as it arrives, with no re-scanning of previous ones - linearity in the number of events is built into the architecture itself.',
      },
      {
        ru: '**Контрольные суммы и хеш-функции (MD5, SHA-256)** - считаются за один проход по байтам файла, поэтому время расчёта растёт линейно вместе с размером файла.',
        en: '**File checksums and hash functions (MD5, SHA-256)** - computed in a single pass over the file\'s bytes, so hashing time grows linearly with file size.',
      },
      {
        ru: '**Bubble Sort и Insertion Sort** (в разделе сортировок) - наглядный пример противоположной ситуации: их внутренний цикл превращает один внешний O(n)-проход во вложенный O(n²). Хороший пример того, чем O(n) точно не является.',
        en: '**Bubble Sort and Insertion Sort** (in the sorting section) are a live counter-example: their inner loop turns a single outer O(n) pass into a nested O(n²) - a concrete illustration of what O(n) is not.',
      },
    ],
  },

  relatedAlgorithms: [],

  quiz: [
    {
      question: {
        ru: 'Как меняется объём работы у алгоритма класса O(n), когда растёт `n`?',
        en: 'How does the amount of work in an O(n) algorithm depend on input size `n`?',
      },
      options: [
        { ru: 'Прямо пропорционально: вдвое больше данных - вдвое больше операций', en: 'Directly proportional: twice the input means twice the operations' },
        { ru: 'Быстрее, чем сами данные, потому что каждый элемент сравнивается с каждым другим', en: 'Faster than the input itself, because every element gets compared with every other one' },
        { ru: 'Не меняется вообще, сколько бы данных ни было на входе алгоритма', en: 'Does not depend on input size and stays the same no matter what' },
        { ru: 'Замедляется по мере роста данных, приближаясь к одному и тому же числу', en: 'Slows its growth as input increases, tapering toward a constant' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это и есть определение O(n): работа растёт прямо пропорционально `n`, без ускорения и без замедления.',
        en: 'That is the definition of O(n) - work grows directly proportional to `n`, with no acceleration and no slowdown of that growth.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - там прямо написано про пропорциональность.',
        en: 'See the "Intent" tab - it explains the proportionality directly.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде почти всегда можно узнать O(n)?',
        en: 'What code pattern almost always signals O(n)?',
      },
      options: [
        { ru: 'Один цикл без цикла внутри него, который проходит по всем элементам один раз', en: 'A single, non-nested loop that walks every element once' },
        { ru: 'Два цикла один внутри другого, и оба зависят от размера входных данных целиком', en: 'Two loops nested inside each other, both depending on the full input size' },
        { ru: 'В коде вообще нет циклов - только фиксированный набор простых действий заранее', en: 'No loops present in the code at all - just a fixed set of constant operations' },
        { ru: 'Цикл, где на каждом следующем шаге данных остаётся вдвое меньше, чем было', en: 'A loop where the size of the processed data is cut in half on every iteration' },
      ],
      correct: 0,
      explanation: {
        ru: 'Один проход без вложенного цикла - именно это делает `linearSearch` на вкладке «Реализация».',
        en: 'A single non-nested pass is exactly what `linearSearch` does on the "Implementation" tab.',
      },
      hint: {
        ru: 'Смотрите строку 2 функции `linearSearch` на вкладке «Реализация» и шаг «Единственный проход».',
        en: 'See line 2 of `linearSearch` on the "Implementation" tab and its walkthrough step "The single pass".',
      },
    },
    {
      question: {
        ru: 'На графике: что происходит с линией O(n) между n = 9 и n = 10?',
        en: 'On the visualization chart: what happens to the O(n) line between n = 9 and n = 10?',
      },
      options: [
        { ru: 'Поднимается ровно на одну единицу - как и между любыми соседними значениями n', en: 'It rises by exactly one unit, same as between any other neighboring pair of n' },
        { ru: 'Резко взлетает вверх, почти касаясь самого верхнего края графика на этом шаге', en: 'It shoots sharply upward, nearly reaching the very top edge of the chart on this step' },
        { ru: 'Останавливается и почти полностью перестаёт расти дальше на этом участке', en: 'It flattens out and almost completely stops growing any further at this exact point' },
        { ru: 'Резко падает вниз, потому что при больших значениях n рост якобы замедляется', en: 'It drops sharply back down, because linear growth supposedly slows down at larger values of n' },
      ],
      correct: 0,
      explanation: {
        ru: 'Линейный рост значит одинаковый шаг между любыми соседними значениями n - на графике это прямая линия.',
        en: 'Linearity means the same increment between any neighboring values of n - on the chart this is literally a straight line.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и сравните точку на графике при n = 9 и при n = 10.',
        en: 'Open the "Visualization" tab and compare the marker position at n = 9 and at n = 10.',
      },
    },
    {
      question: {
        ru: 'Почему `linearSearch` всё равно называют O(n), если нужный элемент чаще всего находится первым?',
        en: 'Why is `linearSearch` still classified as O(n) even when the target is usually found first?',
      },
      options: [
        { ru: 'O(n) описывает худший случай - когда элемента нет вообще или он последний', en: 'The O(n) classification describes the worst case - when the element is absent or last' },
        { ru: 'Потому что JavaScript всегда выполняет цикл целиком, независимо от return внутри', en: 'Because JavaScript always runs the entire loop in full, regardless of any return inside it' },
        { ru: 'Потому что средний случай на практике почти всегда равен ровно n операциям', en: 'Because the average case in practice almost always equals exactly n operations in full' },
        { ru: 'Здесь ошибка - правильнее было бы называть этот код именно O(1)', en: 'The classification here is wrong - O(1) would be the more correct label for this exact code' },
      ],
      correct: 0,
      explanation: {
        ru: 'Big O без уточнений почти всегда описывает худший случай, а не типичный или лучший.',
        en: 'Big O without qualifiers almost always refers to the worst case, not the typical or best one.',
      },
      hint: {
        ru: 'Смотрите шаг «Худший случай» на вкладке «Реализация» и абзац про лучший/средний/худший случай в разделе «Как это работает».',
        en: 'See the "The worst case" walkthrough step on the "Implementation" tab and the best/average/worst paragraph in "How it works".',
      },
    },
    {
      question: {
        ru: 'Массив вырос с 1 000 до 1 000 000 элементов - в 1000 раз. Во сколько раз выросло время у O(n)-алгоритма и у O(n²)-алгоритма?',
        en: 'An array grew from 1,000 to 1,000,000 elements (1000x). How does the O(n) slowdown compare to the O(n²) slowdown on the same input?',
      },
      options: [
        { ru: 'O(n) вырос тоже в 1000 раз, а O(n²) - в 1 000 000 раз', en: 'O(n) also grew 1000x, while O(n²) grew 1,000,000x' },
        { ru: 'Оба выросли одинаково - ровно в 1000 раз, разница видна только на маленьких n', en: 'Both grew the same amount - exactly 1000x, the difference only shows up at small n' },
        { ru: 'O(n) вырос в 1 000 000 раз, потому что каждый элемент сравнивается со всеми остальными', en: 'O(n) grew 1,000,000x, because every element now gets compared against all the others' },
        { ru: 'O(n²) вырос всего в 1000 раз - квадрат применяется только к самому n, а не к его росту', en: 'O(n²) only grew 1000x - squaring applies to n itself, not to its growth factor' },
      ],
      correct: 0,
      explanation: {
        ru: 'Когда данные растут в k раз, O(n) растёт тоже в k раз, а O(n²) - в k² раз: здесь 1000 против 1000² = 1 000 000.',
        en: 'When the input grows k times, O(n) grows k times too, while O(n²) grows k² times: here that is 1000 versus 1000² = 1,000,000.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть» - там разобраны числа 1000 и 1 000 000.',
        en: 'See the second paragraph of the "Deep dive" section on the "Intent" tab - it works through the exact 1000 and 1,000,000 numbers.',
      },
    },
    {
      question: {
        ru: 'Код вида `for (const x of arr) { if (arr.includes(x)) { ... } }` на массиве из 10 000 элементов - какой у него реальный класс сложности?',
        en: 'Code like `for (const x of arr) { if (arr.includes(x)) { ... } }` on a 10,000-element array - what is its real complexity class?',
      },
      options: [
        { ru: 'O(n²) - includes сам по себе линейный и вызывается на каждом шаге внешнего цикла', en: 'O(n²) - includes is itself linear and gets called on every iteration of the outer loop' },
        { ru: 'O(n) - в коде виден только один явный цикл for, а значит и сложность линейная целиком', en: 'O(n) - only one explicit for loop is visible in the source code, so the complexity must be linear' },
        { ru: 'O(log n) - includes будто бы использует бинарный поиск внутри массива заранее', en: 'O(log n) - includes supposedly relies on binary search performed somewhere inside the array' },
        { ru: 'O(1) - includes якобы всегда выполняется за одно и то же постоянное время', en: 'O(1) - includes allegedly always runs in constant time no matter how long the array happens to be' },
      ],
      correct: 0,
      explanation: {
        ru: '`.includes()` - это ещё один проход по массиву, вложенный в первый: n вызовов по n операций в каждом дают n².',
        en: 'includes() is another linear pass nested inside the first one: n calls of n operations each give n².',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть» - про спрятанный O(n) внутри O(n).',
        en: 'See the fourth paragraph of the "Deep dive" section on the "Intent" tab - about the hidden O(n) inside an O(n).',
      },
    },
    {
      question: {
        ru: 'Массив уже отсортирован. Почему линейный поиск (O(n)) в этом случае обычно хуже бинарного поиска (O(log n))?',
        en: 'The array is already sorted. Why is linear search (O(n)) usually worse than binary search (O(log n)) in this case?',
      },
      options: [
        { ru: 'Линейный поиск не смотрит на порядок данных и в худшем случае проверит все n элементов', en: 'Linear search ignores the existing order and still checks all n elements in the worst case' },
        { ru: 'Бинарный поиск якобы быстрее только на неотсортированных данных, а не на отсортированных', en: 'Binary search is supposedly only faster on unsorted data, never on already-sorted arrays at all' },
        { ru: 'Линейный поиск на отсортированных данных будто бы всегда становится O(n²)', en: 'Linear search on sorted data allegedly always becomes O(n²) because of the extra order-checking steps' },
        { ru: 'На практике разницы нет - оба алгоритма делают одинаковое число сравнений', en: 'In practice there is no difference between them at all - both algorithms always perform the same number of comparisons' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сам по себе порядок в данных линейный поиск не ускоряет - чтобы им воспользоваться, нужен другой алгоритм, который на каждом шаге отбрасывает половину данных.',
        en: 'Order in the data does not speed up linear search on its own - taking advantage of it requires a different algorithm that discards half the data at each step.',
      },
      hint: {
        ru: 'Смотрите третий пункт «Минусы» на вкладке «Плюсы и минусы» и пункт «Против O(log n)» в разделе «Нюансы выбора».',
        en: 'See the third "Cons" item on the "Pros & Cons" tab and the "Against O(log n)" point in "Choice nuances".',
      },
    },
    {
      question: {
        ru: 'Чем `linearSearch` (O(n)) отличается по структуре от Bubble Sort (O(n²)) из раздела сортировок?',
        en: 'How does `linearSearch` (O(n)) structurally differ from Bubble Sort (O(n²)), already implemented in the sorting section?',
      },
      options: [
        { ru: 'У Bubble Sort внутри внешнего цикла есть ещё один цикл, тоже зависящий от n, а у linearSearch - только простые действия', en: "Bubble Sort has a second loop nested inside the outer one that also depends on n, while linearSearch only has constant-time operations inside its loop" },
        { ru: 'Bubble Sort вообще не использует циклы, а работает исключительно через рекурсивные вызовы самого себя', en: 'Bubble Sort supposedly uses no loops at all, relying exclusively on recursive calls to itself for every single pairwise comparison that it will ever make' },
        { ru: 'linearSearch делает заметно больше сравнений на каждый отдельный элемент, чем Bubble Sort вообще когда-либо успевает сделать', en: 'linearSearch allegedly performs noticeably more comparisons per individual element than Bubble Sort itself ever does in any of its many passes' },
        { ru: 'Разницы в структуре нет вообще никакой - у обоих ровно один цикл, разница только в данных на входе', en: 'There is supposedly no structural difference at all - both use exactly one loop, and the only real difference is the input data fed into them' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно вложенный цикл превращает n во внешнем проходе в n², когда его умножают на внутренний проход.',
        en: 'The nested loop is exactly what turns the n of the outer pass into n² once multiplied by the inner pass.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - там прямое сравнение с Bubble Sort и Insertion Sort.',
        en: 'See the third paragraph of the "Deep dive" section on the "Intent" tab - a direct code-structure comparison with Bubble Sort and Insertion Sort.',
      },
    },
    {
      question: {
        ru: 'Функция обрабатывает n элементов за один проход, но на каждый элемент делает не одну, а 5 операций. Как это влияет на класс сложности?',
        en: 'A function processes a list of n elements in one pass, but does a fixed 5 operations per element instead of one. How does this affect the complexity class?',
      },
      options: [
        { ru: 'Класс остаётся O(n) - число 5 не зависит от n и в нотации Big O опускается', en: 'The class stays O(n) - the constant factor of 5 does not depend on n and is dropped in Big O notation' },
        { ru: 'Класс становится O(5n) - это отдельный, более медленный класс сложности, чем обычный O(n)', en: 'The class becomes O(5n), which counts as a separate and genuinely slower complexity class than plain O(n)' },
        { ru: 'Класс становится O(n²), потому что 5 операций на элемент как бы умножают n саму на себя', en: 'The class becomes O(n²), because 5 operations per element effectively multiply n by itself twice over' },
        { ru: 'Класс становится O(n log n) из-за дополнительной работы, накапливающейся на каждом шаге', en: 'The class becomes O(n log n) because of the extra work that keeps accumulating on every single iteration' },
      ],
      correct: 0,
      explanation: {
        ru: 'Big O описывает форму роста, а не точное число операций - множители вроде «5», не зависящие от n, в записи не учитываются.',
        en: 'Big O describes the shape of growth, not the exact operation count - constant factors that do not depend on n are dropped in the asymptotics.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Как это работает» на вкладке «Суть» - там объясняется через число `c`.',
        en: 'See the first paragraph of the "Deep dive" section on the "Intent" tab - the formal definition using the constant c.',
      },
    },
    {
      question: {
        ru: 'Утилита grep читает файл размером 10 ГБ построчно один раз и ищет совпадения. Почему это остаётся O(n), даже если файл огромный?',
        en: 'The grep utility reads a 10 GB file line by line once, searching for matches. Why does this stay O(n) even though the file is huge?',
      },
      options: [
        { ru: 'Класс сложности зависит от структуры прохода (один проход без вложенности), а не от размера входа', en: 'The complexity class depends on the structure of the pass (a single non-nested pass), not on the absolute size of the input' },
        { ru: 'На самом деле это O(1), потому что точный размер файла заранее известен операционной системе целиком', en: 'It is actually O(1), because the exact size of the file is supposedly already known to the operating system well in advance' },
        { ru: 'Это O(log n), потому что grep будто бы заранее строит и использует индекс файла целиком', en: 'It is O(log n), because grep supposedly builds and uses a file index ahead of time to speed up finding all matching lines' },
        { ru: 'Класс сложности вообще не определён для файлов настолько огромного размера целиком', en: 'The complexity class is simply undefined and cannot be correctly computed at all for files this enormous in size' },
      ],
      correct: 0,
      explanation: {
        ru: 'Большой n не меняет класс сложности - 10 ГБ означает просто большое n, а не другую форму роста; структура остаётся тем же единственным линейным проходом.',
        en: 'A large n does not change the complexity class - 10 GB simply means a large n, not a different growth shape; the structure is still the same single linear pass.',
      },
      hint: {
        ru: 'Смотрите первый пункт раздела «Примеры в коде» на вкладке «Суть» - про wc, grep и cat.',
        en: 'See the first "Real world" item in the "Deep dive" section on the "Intent" tab - about wc, grep, and cat.',
      },
    },
  ],
};

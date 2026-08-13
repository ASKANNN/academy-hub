export const gnomeSort = {
  slug: 'gnome-sort',
  category: 'sorting',
  name: { ru: 'Gnome Sort', en: 'Gnome Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'stable'],

  intent: {
    ru: 'Гномья сортировка получила название по методу, которым садовый гном якобы сортирует горшки с цветами: он смотрит на два соседних горшка, и если порядок неправильный - меняет их местами и делает шаг назад, а если порядок правильный - делает шаг вперёд.',
    en: 'Gnome sort is named after the method a garden gnome supposedly uses to sort flower pots: it looks at two neighboring pots, and if they\'re out of order, swaps them and steps back; if they\'re in order, it steps forward.',
  },

  problem: {
    ru: 'Сортировка вставками эффективно перемещает элемент на нужное место, но требует внутреннего цикла со своим индексом для сдвига предыдущих элементов. Хочется алгоритма с той же идеей - «протолкнуть неуместный элемент назад», - но выраженного через единственный указатель и минимум управляющей логики, без вложенных циклов.',
    en: 'Insertion sort efficiently moves an element into place, but needs an inner loop with its own index to shift preceding elements. What\'s wanted is an algorithm with the same idea - "push the out-of-place element backward" - expressed with a single pointer and minimal control logic, no nested loops.',
  },

  solution: {
    ru: 'Указатель `i` движется по массиву. Если `i` в начале массива или `a[i-1] <= a[i]` - сравниваемая пара уже в порядке, указатель сдвигается вперёд. Если же `a[i-1] > a[i]` - элементы меняются местами, а указатель сдвигается на шаг назад, чтобы проверить новую пару перед собой. Это ровно тот же эффект, что и сдвиг элемента в сортировке вставками, но без явного внутреннего цикла - вся работа выполняется одним указателем, который то идёт вперёд, то пятится назад.',
    en: 'A pointer `i` walks through the array. If `i` is at the start of the array or `a[i-1] <= a[i]`, the compared pair is already in order, and the pointer moves forward. If `a[i-1] > a[i]`, the elements are swapped and the pointer steps back one position to check the new pair ahead of it. This has exactly the same effect as insertion sort\'s shifting, but without an explicit inner loop - all the work is done by one pointer moving forward and backward.',
  },

  steps: [
    {
      title: { ru: 'Начать с i = 0', en: 'Start with i = 0' },
      explanation: {
        ru: 'Указатель i устанавливается в начало массива.',
        en: 'The pointer i is set to the start of the array.',
      },
    },
    {
      title: { ru: 'Сравнить с предыдущим', en: 'Compare with the previous element' },
      explanation: {
        ru: 'Если i равен нулю или a[i-1] <= a[i], пара в порядке.',
        en: 'If i is zero or a[i-1] <= a[i], the pair is in order.',
      },
    },
    {
      title: { ru: 'Шаг вперёд', en: 'Step forward' },
      explanation: {
        ru: 'Когда пара в порядке, увеличить i на единицу и перейти к следующей паре.',
        en: 'When the pair is in order, increment i and move to the next pair.',
      },
    },
    {
      title: { ru: 'Поменять местами и отступить', en: 'Swap and step back' },
      explanation: {
        ru: 'Если a[i-1] > a[i], поменять элементы местами и уменьшить i на единицу, чтобы проверить новую пару перед текущей позицией.',
        en: 'If a[i-1] > a[i], swap the elements and decrement i to check the new pair before the current position.',
      },
    },
    {
      title: { ru: 'Остановиться в конце', en: 'Stop at the end' },
      explanation: {
        ru: 'Когда i достигает длины массива, все элементы отсортированы.',
        en: 'When i reaches the array\'s length, every element is sorted.',
      },
    },
  ],
  stepBreakpoints: [3, 24, 45, 62],

  implementation: {
    javascript: `function gnomeSort(arr) {
  const a = [...arr];
  const n = a.length;
  let i = 0;
  while (i < n) {
    if (i === 0 || a[i - 1] <= a[i]) {
      i++;
    } else {
      [a[i], a[i - 1]] = [a[i - 1], a[i]];
      i--;
    }
  }
  return a;
}`,
    python: `def gnome_sort(arr):
    a = arr.copy()
    n = len(a)
    i = 0
    while i < n:
        if i == 0 or a[i - 1] <= a[i]:
            i += 1
        else:
            a[i], a[i - 1] = a[i - 1], a[i]
            i -= 1
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - вся логика умещается в единственный указатель `i`, без дополнительных параметров вроде размера окна или порога.',
          en: 'The function takes a single array `arr` - all the logic fits into one pointer `i`, no extra parameters like a window size or threshold.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия массива', en: 'Copying the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт копию входного массива, чтобы функция не изменяла аргумент вызывающего кода - все обмены ниже происходят в этой копии.',
          en: '`const a = [...arr]` copies the input array so the function doesn\'t mutate the caller\'s argument - every swap below happens on this copy.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Длина массива', en: 'Array length' },
        explanation: {
          ru: '`const n = a.length` сохраняется один раз - указатель `i` будет сравниваться с этим значением на каждой итерации цикла.',
          en: '`const n = a.length` is cached once - the pointer `i` gets compared against this value on every loop iteration.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Начальная позиция указателя', en: 'Initial pointer position' },
        explanation: {
          ru: '`let i = 0` - единственная переменная состояния всего алгоритма. В отличие от сортировки вставками, здесь нет отдельного внешнего и внутреннего счётчика, только этот один указатель.',
          en: '`let i = 0` - the only state variable in the whole algorithm. Unlike insertion sort, there\'s no separate outer and inner counter, just this one pointer.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Главный цикл', en: 'The main loop' },
        explanation: {
          ru: '`while (i < n)` продолжается, пока указатель не дойдёт до конца массива. В отличие от вложенных циклов сортировки вставками, здесь всего один уровень цикла - вся сложность спрятана в направлении движения `i`.',
          en: '`while (i < n)` continues until the pointer reaches the end of the array. Unlike insertion sort\'s nested loops, there\'s only one loop level here - all the complexity is hidden in which direction `i` moves.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Пара в порядке - шаг вперёд', en: 'Pair in order - step forward' },
        explanation: {
          ru: '`if (i === 0 || a[i - 1] <= a[i])` проверяет две вещи через `||`: либо указатель у самого начала массива (сравнивать не с чем), либо пара уже упорядочена. В обоих случаях `i++` продвигает указатель к следующей паре.',
          en: '`if (i === 0 || a[i - 1] <= a[i])` checks two things via `||`: either the pointer is at the very start (nothing to compare against), or the pair is already in order. Either way, `i++` advances the pointer to the next pair.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Пара нарушена - обмен и откат', en: 'Pair out of order - swap and retreat' },
        explanation: {
          ru: '`[a[i], a[i - 1]] = [a[i - 1], a[i]]` меняет местами нарушающую порядок пару через деструктурирующее присваивание. Затем `i--` возвращает указатель на шаг назад - именно так переставленный элемент проверяется против своего нового левого соседа на следующей итерации.',
          en: '`[a[i], a[i - 1]] = [a[i - 1], a[i]]` swaps the out-of-order pair via destructuring assignment. Then `i--` moves the pointer back one step - this is exactly how the swapped element gets checked against its new left neighbor on the next iteration.',
        },
      },
      {
        lines: [13],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `i` достигает `n`, цикл завершается - это возможно только если ни одна пара впереди не нарушена, то есть массив полностью отсортирован.',
          en: 'When `i` reaches `n`, the loop ends - which is only possible if no pair ahead violates order, meaning the array is fully sorted.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, вся логика управляется единственным указателем.',
          en: 'The function takes a single list `arr` - just like the JS version, all the logic is driven by a single pointer.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия списка', en: 'Copying the list' },
        explanation: {
          ru: '`a = arr.copy()` создаёт копию входного списка, чтобы не изменять аргумент вызывающего кода.',
          en: '`a = arr.copy()` copies the input list so the caller\'s argument stays untouched.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Длина списка', en: 'List length' },
        explanation: {
          ru: '`n = len(a)` сохраняется один раз, идентично JS-версии.',
          en: '`n = len(a)` is cached once, identical to the JS version.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Начальная позиция указателя', en: 'Initial pointer position' },
        explanation: {
          ru: '`i = 0` - единственная переменная состояния алгоритма, без отдельного индекса для внутреннего цикла.',
          en: '`i = 0` - the algorithm\'s only state variable, no separate index for an inner loop.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Главный цикл', en: 'The main loop' },
        explanation: {
          ru: '`while i < n:` продолжается, пока указатель не дойдёт до конца списка - единственный уровень цикла на весь алгоритм.',
          en: '`while i < n:` continues until the pointer reaches the end of the list - a single loop level for the entire algorithm.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Пара в порядке - шаг вперёд', en: 'Pair in order - step forward' },
        explanation: {
          ru: '`if i == 0 or a[i - 1] <= a[i]:` проверяет через `or`, что указатель либо у начала списка, либо пара уже упорядочена. Тогда `i += 1` сдвигает указатель к следующей паре.',
          en: '`if i == 0 or a[i - 1] <= a[i]:` checks via `or` that the pointer is either at the start of the list or the pair is already in order. Then `i += 1` advances the pointer to the next pair.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Пара нарушена - обмен и откат', en: 'Pair out of order - swap and retreat' },
        explanation: {
          ru: '`a[i], a[i - 1] = a[i - 1], a[i]` меняет местами нарушающую порядок пару кортежным присваиванием. Затем `i -= 1` откатывает указатель на шаг назад для проверки новой пары.',
          en: '`a[i], a[i - 1] = a[i - 1], a[i]` swaps the out-of-order pair via tuple assignment. Then `i -= 1` steps the pointer back to check the new pair.',
        },
      },
      {
        lines: [11],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `i` достигает `n`, цикл `while` завершается, и `a` - полностью отсортированный список.',
          en: 'When `i` reaches `n`, the `while` loop ends, and `a` is a fully sorted list.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Один из самых простых алгоритмов сортировки в реализации - не требует вложенных циклов, только один указатель.',
      en: 'One of the simplest sorting algorithms to implement - no nested loops, just a single pointer.',
    },
    {
      ru: 'Устойчив: равные элементы никогда не меняются местами, так как своп происходит только при строгом нарушении порядка.',
      en: 'Stable: equal elements are never swapped, since a swap only happens on a strict order violation.',
    },
    {
      ru: 'Сортирует на месте с O(1) дополнительной памяти и, как и сортировка вставками, ведёт себя почти линейно на уже отсортированных данных.',
      en: 'Sorts in place with O(1) extra memory and, like insertion sort, behaves nearly linearly on already sorted data.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) в среднем и худшем случае - на случайных данных совершает заметно больше отдельных операций сравнения/обмена, чем сортировка вставками.',
      en: 'O(n²) on average and worst case - on random data it performs noticeably more individual compare/swap operations than insertion sort.',
    },
    {
      ru: 'Указатель может «пятиться» далеко назад при неудачном порядке элементов, что делает поведение менее предсказуемым, чем у обычных вложенных циклов.',
      en: 'The pointer can step far backward on unfavorable element orderings, making its behavior less predictable than plain nested loops.',
    },
    {
      ru: 'Не имеет практических преимуществ перед сортировкой вставками - используется почти исключительно в учебных целях.',
      en: 'Has no practical advantage over insertion sort - used almost exclusively for teaching purposes.',
    },
  ],

  whenToUse: [
    {
      ru: 'Как самый простой способ показать идею «сдвинуть элемент на место», не вводя понятие внутреннего цикла - хороший первый шаг перед сортировкой вставками.',
      en: 'As the simplest way to demonstrate the "shift an element into place" idea without introducing an inner loop - a good first step before insertion sort.',
    },
    {
      ru: 'В средах с крайне ограниченной кодовой базой (например, встраиваемые системы с жёстким лимитом на размер программы), где важна абсолютная простота кода, а не скорость.',
      en: 'In environments with an extremely constrained codebase (e.g., embedded systems with a hard program-size limit), where absolute code simplicity matters more than speed.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Учебные курсы по алгоритмам** используют гномью сортировку как забавный, легко запоминающийся пример того, как переформулировать сортировку вставками без вложенных циклов.',
      en: '**Algorithm courses** use gnome sort as a fun, memorable example of reformulating insertion sort without nested loops.',
    },
    {
      ru: '**Идея встречается в реализациях Brainfuck и других эзотерических языков** для сортировки чисел, так как единственный указатель проще реализовать при минималистичном наборе инструкций.',
      en: '**The idea shows up in Brainfuck and other esoteric-language implementations** for sorting numbers, since a single pointer is easier to implement with a minimalist instruction set.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Прослеживая работу на конкретном примере видно, как именно указатель «пятится». Для массива `[5, 2, 8, 1]` алгоритм совершает **12 итераций цикла** и делает **4 обмена**: сначала меняет местами 5 и 2 (i возвращается с 1 на 0), затем после нескольких шагов вперёд встречает пару (8, 1) и запускает цепочку из трёх обменов подряд - 8↔1, 5↔1, 2↔1 - пока единица не займёт своё место в начале массива.',
        en: 'Tracing a concrete example shows exactly how the pointer "retreats." For the array `[5, 2, 8, 1]`, the algorithm runs **12 loop iterations** and performs **4 swaps**: first it swaps 5 and 2 (i steps back from 1 to 0), then after a few forward steps it hits the pair (8, 1) and triggers a chain of three consecutive swaps - 8↔1, 5↔1, 2↔1 - until the 1 lands at the front of the array.',
      },
      {
        ru: 'На уже отсортированном массиве из 10 элементов алгоритм делает ровно **10 итераций и 0 обменов** - указатель ни разу не отступает назад, что даёт линейное **O(n)** поведение лучшего случая, идентичное лучшему случаю сортировки вставками.',
        en: 'On an already sorted array of 10 elements, the algorithm performs exactly **10 iterations and 0 swaps** - the pointer never steps back, giving the linear **O(n)** best-case behavior, identical to insertion sort\'s best case.',
      },
      {
        ru: 'Обратная картина на массиве `[10, 9, 8, ..., 1]` (n = 10, обратный порядок): **100 итераций цикла и 45 обменов**. Число обменов совпадает с количеством **инверсий** (пар элементов не в том порядке) в исходном массиве - для полностью обратного массива это `n(n-1)/2 = 45`, откуда и берётся квадратичный худший случай O(n²).',
        en: 'The reverse picture on `[10, 9, 8, ..., 1]` (n = 10, reverse order): **100 loop iterations and 45 swaps**. The swap count matches the number of **inversions** (out-of-order pairs) in the input array - for a fully reversed array that\'s `n(n-1)/2 = 45`, which is exactly where the quadratic O(n²) worst case comes from.',
      },
      {
        ru: 'Каждый обмен в гномьей сортировке - это тройное присваивание (временная переменная, две записи), тогда как сдвиг в сортировке вставками - одна запись. На том же обратно отсортированном массиве из 10 элементов гномья сортировка выполняет `45 × 3 = 135` записей в память, а сортировка вставками - всего **54 записи**: одна и та же логическая работа, но в 2.5 раза больше операций записи.',
        en: 'Each swap in gnome sort is a triple assignment (temp variable, two writes), while insertion sort\'s shift is a single write. On the same reverse-sorted array of 10 elements, gnome sort performs `45 × 3 = 135` memory writes, while insertion sort does just **54 writes**: the same logical work, but 2.5 times as many write operations.',
      },
      {
        ru: 'Алгоритм придумал нидерландский информатик **Дик Грюне (Dick Grune)**, изначально назвав его «stupid sort» - «глупая сортировка». Современное имя «gnome sort» он предложил в 2000 году после того, как кто-то в рассылке сравнил метод с гипотетическим способом, которым садовый гном мог бы сортировать горшки с цветами вдоль дорожки - шутка прижилась и стала официальным названием.',
        en: 'The algorithm was invented by Dutch computer scientist **Dick Grune**, who originally called it "stupid sort." The modern name "gnome sort" was proposed by him in 2000, after someone on a mailing list compared the method to a hypothetical way a garden gnome might sort flower pots along a path - the joke stuck and became the official name.',
      },
      {
        ru: 'Структурно гномья сортировка - это сортировка вставками, у которой внутренний цикл сдвига «развёрнут» в повторные проходы внешнего указателя назад. Там, где вставка сдвигает целый хвост элементов одним циклом с явным индексом, гном делает то же самое по одному попарному обмену за раз, платя за простоту кода дополнительными операциями записи.',
        en: 'Structurally, gnome sort is insertion sort with its inner shifting loop "unrolled" into repeated backward passes of the outer pointer. Where insertion sort shifts a whole tail of elements in one loop with an explicit index, gnome sort does the same thing one pairwise swap at a time, trading code simplicity for extra write operations.',
      },
      {
        ru: 'Итог: гномья сортировка не даёт никакого асимптотического выигрыша - её ценность полностью учебная. Она показывает, что идею «протолкнуть элемент на место» можно выразить единственным указателем без вложенных циклов, но за это приходится платить тройными обменами вместо одиночных сдвигов.',
        en: 'The takeaway: gnome sort offers no asymptotic advantage - its value is purely educational. It shows that the "push an element into place" idea can be expressed with a single pointer and no nested loops, but that comes at the cost of triple swaps instead of single shifts.',
      },
    ],
    whenToUse: [
      {
        ru: '**В учебных курсах как мостик к сортировке вставками** - показать, что тот же результат достижим без явного внутреннего цикла, а затем объяснить, почему вставка со сдвигом эффективнее.',
        en: '**In teaching courses as a bridge to insertion sort** - show that the same result is achievable without an explicit inner loop, then explain why shifting-based insertion is more efficient.',
      },
      {
        ru: '**Никогда в продакшене** - на любом реальном объёме данных сортировка вставками или библиотечная сортировка делает то же самое с меньшим числом операций записи.',
        en: '**Never in production** - at any real data volume, insertion sort or a library sort does the same job with fewer write operations.',
      },
      {
        ru: '**В минималистичных средах выполнения** (эзотерические языки, микроконтроллеры с крайне ограниченным набором инструкций), где важна компактность кода, а не скорость - единственный указатель проще выразить, чем пару вложенных индексов.',
        en: '**In minimalist runtime environments** (esoteric languages, microcontrollers with an extremely limited instruction set), where code compactness matters more than speed - a single pointer is easier to express than a pair of nested indices.',
      },
      {
        ru: '**При сравнении с bubble sort** - оба алгоритма квадратичны и работают через попарные обмены, но гномья сортировка не требует отдельного флага «была ли перестановка» и явного внешнего прохода, что делает её чуть компактнее в коде.',
        en: '**When comparing against bubble sort** - both are quadratic and work through pairwise swaps, but gnome sort doesn\'t need a separate "was there a swap" flag or an explicit outer pass, making it slightly more compact in code.',
      },
    ],
    realWorld: [
      {
        ru: '**Дик Грюне, автор алгоритма** - нидерландский информатик из Vrije Universiteit Amsterdam, также известный работами по компиляторам и синтаксическому анализу; страница алгоритма на его личном сайте (dickgrune.com) - основной первоисточник истории названия.',
        en: '**Dick Grune, the algorithm\'s author** - a Dutch computer scientist at Vrije Universiteit Amsterdam, also known for work on compilers and parsing; the algorithm\'s page on his personal site (dickgrune.com) is the primary source for the naming history.',
      },
      {
        ru: '**Учебные курсы по основам алгоритмов** используют гномью сортировку как первый пример «сортировки без вложенного цикла» перед тем, как вводить сортировку вставками во всей её полноте.',
        en: '**Introductory algorithms courses** use gnome sort as a first example of "sorting without an inner loop" before introducing insertion sort in its full form.',
      },
      {
        ru: '**Реализации на эзотерических языках** (Brainfuck и подобные), где минимальный набор инструкций делает управление единственным указателем проще, чем вложенные циклы с несколькими индексами.',
        en: '**Implementations in esoteric languages** (Brainfuck and similar), where a minimal instruction set makes managing a single pointer simpler than nested loops with multiple indices.',
      },
      {
        ru: '**Форумы и статьи по занимательным алгоритмам** регулярно приводят гномью сортировку как пример того, как переформулировка известного алгоритма через другую структуру управления не меняет асимптотику, а лишь константы.',
        en: '**Forums and articles on recreational algorithms** regularly cite gnome sort as an example of how reformulating a known algorithm through a different control structure changes only the constants, not the asymptotics.',
      },
    ],
  },

  relatedAlgorithms: ['insertion-sort', 'bubble-sort'],

  quiz: [
    {
      question: {
        ru: 'Что делает указатель гномьей сортировки, когда пара элементов уже в правильном порядке?',
        en: 'What does the gnome sort pointer do when a pair of elements is already in order?',
      },
      options: [
        { ru: 'Сдвигается на шаг вперёд', en: 'Steps forward by one' },
        { ru: 'Сдвигается на шаг назад', en: 'Steps back by one' },
        { ru: 'Останавливается навсегда', en: 'Stops permanently' },
        { ru: 'Меняет элементы местами на всякий случай', en: 'Swaps the elements just in case' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если a[i-1] <= a[i], менять местами нечего, и алгоритм просто переходит к следующей паре.',
        en: 'If a[i-1] <= a[i], there\'s nothing to swap, so the algorithm simply moves to the next pair.',
      },
      hint: {
        ru: 'Смотрите шаг «Шаг вперёд» на вкладке «Визуализация» и строки 6-7 функции `gnomeSort` на вкладке «Реализация».',
        en: 'See the "Step forward" step on the "Visualization" tab and lines 6-7 of `gnomeSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда указатель находит пару a[i-1] > a[i]?',
        en: 'What happens when the pointer finds a pair a[i-1] > a[i]?',
      },
      options: [
        { ru: 'Элементы меняются местами, указатель отступает на шаг назад', en: 'The elements are swapped, and the pointer steps back one position' },
        { ru: 'Весь массив полностью пересортировывается заново с самого начала', en: 'The whole array is completely re-sorted from the very beginning again' },
        { ru: 'Проблемный элемент насовсем удаляется из массива и отбрасывается', en: 'The problematic element is permanently removed from the array and discarded' },
        { ru: 'Указатель немедленно прыгает в самый конец массива', en: 'The pointer immediately jumps all the way to the end of the array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Отступ назад позволяет проверить, не нарушает ли переставленный элемент порядок и с тем, что стоит перед ним.',
        en: 'Stepping back lets the algorithm check whether the swapped element also violates order with what comes before it.',
      },
      hint: {
        ru: 'Смотрите шаг «Поменять местами и отступить» на вкладке «Визуализация» и разбор строк 9-10 функции `gnomeSort` на вкладке «Реализация».',
        en: 'See the "Swap and step back" step on the "Visualization" tab and the walkthrough of lines 9-10 of `gnomeSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность гномьей сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of gnome sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(log n)', en: 'O(log n)' },
      ],
      correct: 0,
      explanation: {
        ru: 'В худшем случае (например, обратно отсортированный массив) указатель многократно пятится назад, что даёт квадратичное число операций.',
        en: 'In the worst case (e.g., a reverse-sorted array), the pointer repeatedly steps back, giving a quadratic number of operations.',
      },
      hint: {
        ru: 'Смотрите бейдж «Худший» вверху страницы и третий абзац раздела «Углублённо» на вкладке «Суть» (пример с обратным массивом из 10 элементов).',
        en: 'See the "Worst" complexity badge at the top of the page and the third paragraph of the "Deep dive" section on the "Intent" tab (the 10-element reverse-array example).',
      },
    },
    {
      question: {
        ru: 'Является ли гномья сортировка устойчивой (stable)?',
        en: 'Is gnome sort stable?',
      },
      options: [
        { ru: 'Да - своп происходит только при строгом нарушении порядка', en: 'Yes - a swap only happens on a strict order violation' },
        { ru: 'Нет, она нестабильна точно так же, как и quicksort', en: 'No, it is unstable, just the same way quicksort is' },
        { ru: 'Только для отрицательных чисел, для положительных всё иначе', en: 'Only for negative numbers, positive ones behave differently' },
        { ru: 'Это зависит от конкретной длины сортируемого массива', en: 'It depends on the specific length of the array being sorted' },
      ],
      correct: 0,
      explanation: {
        ru: 'Условие обмена - строгое `a[i-1] > a[i]`, поэтому равные соседние элементы никогда не меняются местами.',
        en: 'The swap condition is the strict `a[i-1] > a[i]`, so equal neighboring elements are never swapped.',
      },
      hint: {
        ru: 'Смотрите тег `stable` рядом с названием алгоритма вверху страницы и строку 9 функции `gnomeSort` на вкладке «Реализация» (условие обмена).',
        en: 'See the `stable` tag next to the algorithm name at the top of the page and line 9 of `gnomeSort` on the "Implementation" tab (the swap condition).',
      },
    },
    {
      question: {
        ru: 'На какой известный алгоритм больше всего похожа гномья сортировка по своей логике?',
        en: 'Which well-known algorithm is gnome sort most similar to in its logic?',
      },
      options: [
        { ru: 'На сортировку вставками, но без вложенного цикла', en: 'Insertion sort, but without an inner loop' },
        { ru: 'На быструю сортировку и её стратегию выбора опорного элемента', en: 'Quicksort and its overall pivot-selection strategy' },
        { ru: 'На сортировку слиянием и её принцип разделения массива пополам', en: 'Merge sort and its principle of splitting the array in half' },
        { ru: 'На поразрядную сортировку и обработку чисел по разрядам', en: 'Radix sort and its digit-by-digit processing of numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма проталкивают неуместный элемент назад до его правильной позиции; гномья сортировка просто выражает это через единственный указатель.',
        en: 'Both algorithms push an out-of-place element backward to its correct position; gnome sort just expresses this with a single pointer.',
      },
      hint: {
        ru: 'Смотрите подраздел «Задача» на вкладке «Суть» и пятый абзац раздела «Углублённо» («структурно гномья сортировка - это...»).',
        en: 'See the "Problem" subsection on the "Intent" tab and the fifth paragraph of the "Deep dive" section ("structurally, gnome sort is...").',
      },
    },
    {
      question: {
        ru: 'Какова лучшая временная сложность гномьей сортировки и при каком условии она достигается?',
        en: 'What is the best-case time complexity of gnome sort and when is it achieved?',
      },
      options: [
        { ru: 'O(n) - когда массив уже отсортирован и указатель ни разу не пятится', en: 'O(n) - when the array is already sorted and the pointer never steps back' },
        { ru: 'O(1) - если массив содержит ровно один элемент и сортировать нечего', en: 'O(1) - if the array contains exactly one element and nothing needs sorting' },
        { ru: 'O(n log n) - на случайных данных за счёт особой структуры откатов указателя', en: 'O(n log n) - on random data due to the special structure of pointer rollbacks' },
        { ru: 'O(n²) всегда, независимо от исходного порядка элементов в массиве', en: 'O(n²) always, regardless of the initial order of elements in the array' },
      ],
      correct: 0,
      explanation: {
        ru: 'На уже отсортированном массиве каждый шаг - вперёд, ни одного обмена, итого n шагов.',
        en: 'On an already sorted array every step is forward, no swaps occur, giving n total steps.',
      },
      hint: {
        ru: 'Смотрите бейдж «Лучший» вверху страницы и второй абзац раздела «Углублённо» на вкладке «Суть» (пример с отсортированным массивом из 10 элементов).',
        en: 'See the "Best" complexity badge at the top of the page and the second paragraph of the "Deep dive" section on the "Intent" tab (the 10-element sorted-array example).',
      },
    },
    {
      question: {
        ru: 'Зачем гномья сортировка проверяет условие `i === 0` перед сравнением `a[i-1]` и `a[i]`?',
        en: 'Why does gnome sort check the condition `i === 0` before comparing `a[i-1]` and `a[i]`?',
      },
      options: [
        { ru: 'Чтобы не выйти за левую границу массива при обращении к a[i-1]', en: 'To avoid going past the left boundary of the array when accessing a[i-1]' },
        { ru: 'Чтобы ускорить первую итерацию и пропустить ненужное сравнение', en: 'To speed up the first iteration and skip an unnecessary comparison' },
        { ru: 'Потому что при i=0 элемент гарантированно является минимумом всего массива', en: 'Because at i=0 the element is guaranteed to be the minimum of the whole array' },
        { ru: 'Это избыточная проверка, которая никак не влияет на корректность алгоритма', en: 'This is a redundant check that has no effect on correctness of the algorithm' },
      ],
      correct: 0,
      explanation: {
        ru: 'При i = 0 обращение к a[-1] выйдет за границы массива. Проверка `i === 0` гарантирует, что `a[i-1]` всегда существует.',
        en: 'At i = 0, accessing a[-1] would be out of bounds. The `i === 0` check guarantees that `a[i-1]` always exists.',
      },
      hint: {
        ru: 'Смотрите построчный разбор строк 6-7 функции `gnomeSort` на вкладке «Реализация» (условие `i === 0`).',
        en: 'See the walkthrough of lines 6-7 of `gnomeSort` on the "Implementation" tab (the `i === 0` check).',
      },
    },
    {
      question: {
        ru: 'Чем гномья сортировка хуже сортировки вставками по числу операций на случайных данных?',
        en: 'How does gnome sort perform worse than insertion sort in operation count on random data?',
      },
      options: [
        { ru: 'Гномья сортировка делает больше обменов, а сортировка вставками сдвигает элементы без обмена', en: 'Gnome sort performs more swaps, while insertion sort shifts elements without swapping' },
        { ru: 'Гномья сортировка требует дополнительного прохода в конце для проверки результата', en: 'Gnome sort requires an extra pass at the end to verify the result' },
        { ru: 'Сортировка вставками использует рекурсию и поэтому быстрее при большом n', en: 'Insertion sort uses recursion and is therefore faster at large n' },
        { ru: 'Гномья сортировка не поддерживает параллельное выполнение, а сортировка вставками поддерживает', en: 'Gnome sort does not support parallel execution while insertion sort does at every step' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка вставками сдвигает элементы одной записью на шаг, тогда как гномья сортировка выполняет полный обмен (3 записи) на каждый шаг назад - это делает её медленнее по числу операций записи.',
        en: 'Insertion sort shifts elements with one write per step, while gnome sort performs a full swap (3 writes) on each backward step - making it slower in terms of write operations.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Углублённо» на вкладке «Суть» (сравнение 135 и 54 записей на массиве из 10 элементов).',
        en: 'See the fourth paragraph of the "Deep dive" section on the "Intent" tab (the 135-versus-54-write comparison on a 10-element array).',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность гномьей сортировки?',
        en: 'What is the space complexity of gnome sort?',
      },
      options: [
        { ru: 'O(1) - переменная-указатель и временная переменная для обмена', en: 'O(1) - only a pointer variable and a temporary variable for swapping' },
        { ru: 'O(n) - для хранения исходного массива во время сортировки', en: 'O(n) - to store the original array during sorting' },
        { ru: 'O(log n) - из-за глубины стека рекурсии при откатах указателя', en: 'O(log n) - due to the recursion stack depth during pointer rollbacks' },
        { ru: 'O(n²) - потому что хранится история всех позиций указателя', en: 'O(n²) - because the history of all pointer positions is stored' },
      ],
      correct: 0,
      explanation: {
        ru: 'Гномья сортировка работает прямо в исходном массиве и не выделяет никаких дополнительных структур - только счётчик i и временная переменная при обмене.',
        en: 'Gnome sort works directly on the original array and allocates no additional structures - only the counter i and a temporary variable during swaps.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и второй пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the "Space" complexity badge at the top of the page and the second "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Почему гномья сортировка почти не используется в производственном коде?',
        en: 'Why is gnome sort almost never used in production code?',
      },
      options: [
        { ru: 'Нет практических преимуществ перед сортировкой вставками, которая делает то же быстрее', en: 'It offers no practical advantage over insertion sort, which does the same thing faster' },
        { ru: 'Она нестабильна, что делает её непригодной для большинства реальных задач сортировки', en: 'It is unstable, which makes it unsuitable for most real-world sorting tasks' },
        { ru: 'Её патент запрещает коммерческое использование без лицензии правообладателя', en: 'Its patent prohibits commercial use without a license from the rights holder' },
        { ru: 'Большинство компиляторов не умеют оптимизировать код с одним указателем без вложенных циклов', en: 'Most compilers cannot optimize code with a single pointer and no nested loops in all cases' },
      ],
      correct: 0,
      explanation: {
        ru: 'Гномья сортировка делает то же самое, что сортировка вставками, но выполняет больше операций из-за попарных обменов вместо сдвигов - на практике это просто более медленная альтернатива с той же идеей.',
        en: 'Gnome sort does the same thing as insertion sort but performs more operations due to pairwise swaps instead of shifts - in practice it is simply a slower alternative with the same underlying idea.',
      },
      hint: {
        ru: 'Смотрите третий пункт минусов на вкладке «Плюсы и минусы» и последний абзац раздела «Углублённо» на вкладке «Суть».',
        en: 'See the third "Cons" item on the "Pros & Cons" tab and the final paragraph of the "Deep dive" section on the "Intent" tab.',
      },
    },
  ],
};

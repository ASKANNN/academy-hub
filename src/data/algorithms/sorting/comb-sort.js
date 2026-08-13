export const combSort = {
  slug: 'comb-sort',
  category: 'sorting',
  name: { ru: 'Comb Sort', en: 'Comb Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n² / 2^p)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 1,
  tags: ['comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Сортировка расчёской - это улучшение пузырьковой сортировки: она сравнивает элементы, отстоящие друг от друга на убывающий промежуток (gap), а не только соседей, что устраняет главную слабость bubble sort - маленькие элементы («черепахи»), застревающие в конце.',
    en: 'Comb sort is an improvement on bubble sort: it compares elements a shrinking gap apart instead of only neighbors, removing bubble sort\'s main weakness - small elements ("turtles") stuck near the end.',
  },

  problem: {
    ru: 'В обычной пузырьковой сортировке маленький элемент в конце массива продвигается к своей позиции только на один шаг за проход, что делает алгоритм катастрофически медленным именно на таких «неудобных» входных данных, даже если основная часть массива уже отсортирована.',
    en: 'In plain bubble sort, a small element near the end of the array only advances one position per pass toward its final spot, making the algorithm catastrophically slow on exactly these "awkward" inputs, even when most of the array is already sorted.',
  },

  solution: {
    ru: 'Алгоритм начинает с промежутка (gap), примерно равного длине массива, и сравнивает элементы, отстоящие друг от друга на этот gap, меняя их местами при необходимости. После каждого прохода gap уменьшается делением на фиксированный коэффициент (обычно 1.3). Когда gap становится равным 1, алгоритм превращается в обычный bubble sort, но к этому моменту большинство «черепах» уже переставлены на большое расстояние за один шаг, поэтому финальные проходы короткие.',
    en: 'The algorithm starts with a gap roughly equal to the array length and compares elements that far apart, swapping when needed. After each pass, the gap shrinks by dividing by a fixed shrink factor (typically 1.3). When the gap reaches 1, the algorithm becomes plain bubble sort, but by then most "turtles" have already jumped a long distance in a single step, so the final passes are short.',
  },

  steps: [
    {
      title: { ru: 'Выбрать начальный gap', en: 'Pick the initial gap' },
      explanation: {
        ru: 'Взять gap равным длине массива.',
        en: 'Set the gap to the length of the array.',
      },
    },
    {
      title: { ru: 'Уменьшить gap', en: 'Shrink the gap' },
      explanation: {
        ru: 'Разделить текущий gap на коэффициент сжатия (обычно 1.3) и округлить вниз, но не меньше 1.',
        en: 'Divide the current gap by the shrink factor (typically 1.3) and round down, but never below 1.',
      },
    },
    {
      title: { ru: 'Сравнить элементы через gap', en: 'Compare elements gap apart' },
      explanation: {
        ru: 'Пройти по массиву, сравнивая пары элементов, отстоящих друг от друга на gap, и меняя их местами, если левый больше правого.',
        en: 'Walk the array, comparing pairs of elements gap positions apart, swapping when the left one is greater.',
      },
    },
    {
      title: { ru: 'Отследить перестановки', en: 'Track swaps' },
      explanation: {
        ru: 'Запомнить, была ли хотя бы одна перестановка на этом проходе.',
        en: 'Remember whether at least one swap happened on this pass.',
      },
    },
    {
      title: { ru: 'Остановиться', en: 'Stop' },
      explanation: {
        ru: 'Когда gap равен 1 и на проходе не было перестановок, массив отсортирован.',
        en: 'When the gap is 1 and a pass makes no swaps, the array is sorted.',
      },
    },
  ],
  stepBreakpoints: [2, 16, 30, 41],

  implementation: {
    javascript: `function combSort(arr) {
  const a = [...arr];
  let gap = a.length;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    for (let i = 0; i + gap < a.length; i++) {
      if (a[i] > a[i + gap]) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        sorted = false;
      }
    }
  }
  return a;
}`,
    python: `def comb_sort(arr):
    a = arr.copy()
    gap = len(a)
    shrink = 1.3
    sorted_ = False

    while not sorted_:
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted_ = True
        for i in range(len(a) - gap):
            if a[i] > a[i + gap]:
                a[i], a[i + gap] = a[i + gap], a[i]
                sorted_ = False
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один массив `arr` - весь остальной алгоритм (gap, коэффициент сжатия, флаг завершения) настраивается внутри функции, дополнительных параметров не требуется.',
          en: 'The function takes a single array `arr` - everything else (gap, shrink factor, termination flag) is set up inside the function, no extra parameters needed.',
        },
      },
      {
        lines: [2],
        title: { ru: 'Копия массива', en: 'Copying the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт копию входного массива, чтобы функция не изменяла аргумент, переданный вызывающим кодом - все перестановки ниже происходят в этой копии.',
          en: '`const a = [...arr]` copies the input array so the function doesn\'t mutate the caller\'s argument - every swap below happens on this copy.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Начальный gap', en: 'Initial gap' },
        explanation: {
          ru: '`let gap = a.length` стартует с промежутком, равным всей длине массива - это позволяет первому же проходу сравнивать элементы на противоположных концах массива.',
          en: '`let gap = a.length` starts with a gap equal to the whole array length - this lets the very first pass compare elements at opposite ends of the array.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Коэффициент сжатия', en: 'Shrink factor' },
        explanation: {
          ru: '`const shrink = 1.3` - эмпирически найденное значение (Лейси и Бокс, 1991), которым делится gap после каждого прохода. Оно фиксировано и не меняется по ходу выполнения.',
          en: '`const shrink = 1.3` - the empirically found value (Lacey and Box, 1991) the gap is divided by after every pass. It\'s fixed and never changes during the run.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Флаг завершения', en: 'The termination flag' },
        explanation: {
          ru: '`let sorted = false` инициализируется в `false`, чтобы цикл `while (!sorted)` гарантированно выполнился хотя бы один раз - он станет `true` только когда gap достигнет 1 и ни одна перестановка не потребуется.',
          en: '`let sorted = false` starts as `false` so the `while (!sorted)` loop is guaranteed to run at least once - it only becomes `true` once the gap reaches 1 and no swap is needed.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Внешний цикл и сжатие gap', en: 'Outer loop and shrinking the gap' },
        explanation: {
          ru: '`while (!sorted)` повторяет проходы, пока алгоритм не сочтёт массив отсортированным. Первым делом на каждой итерации `gap = Math.floor(gap / shrink)` уменьшает промежуток - округление вниз гарантирует, что gap - целое число, пригодное для индексации.',
          en: '`while (!sorted)` repeats passes until the algorithm decides the array is sorted. The first thing each iteration does is `gap = Math.floor(gap / shrink)`, shrinking the gap - rounding down keeps it an integer usable as an index offset.',
        },
      },
      {
        lines: [9, 12],
        title: { ru: 'Ограничение gap снизу', en: 'Clamping the gap to a minimum' },
        explanation: {
          ru: '`if (gap <= 1) { gap = 1; sorted = true; }` не даёт промежутку упасть до 0 или отрицательного значения (что вызвало бы обращение за границы массива) и заранее помечает массив как отсортированный - но это предположение, не факт: если проход с gap=1 всё же найдёт перестановку, флаг будет сброшен обратно в строке 16.',
          en: '`if (gap <= 1) { gap = 1; sorted = true; }` keeps the gap from dropping to 0 or negative (which would index out of bounds) and tentatively marks the array as sorted - but that\'s an assumption, not a fact: if the gap=1 pass still finds a swap, the flag gets reset back on line 16.',
        },
      },
      {
        lines: [13],
        title: { ru: 'Границы прохода', en: 'Pass bounds' },
        explanation: {
          ru: '`for (let i = 0; i + gap < a.length; i++)` перебирает все позиции, для которых у `i` есть партнёр на расстоянии gap, не выходящий за конец массива - при большом gap таких позиций мало, при gap=1 их почти столько же, сколько во всём массиве.',
          en: '`for (let i = 0; i + gap < a.length; i++)` walks every position that has a gap-apart partner still inside the array - at a large gap there are few such positions, at gap=1 there are almost as many as the whole array.',
        },
      },
      {
        lines: [14, 16],
        title: { ru: 'Сравнение и перестановка через gap', en: 'Comparing and swapping across the gap' },
        explanation: {
          ru: '`if (a[i] > a[i + gap])` сравнивает элементы, отстоящие друг от друга на gap, а не соседей. При перестановке `sorted = false` откатывает предположение из строки 11 - раз перестановка случилась, массив ещё не готов, и потребуется ещё один проход.',
          en: '`if (a[i] > a[i + gap])` compares elements gap positions apart, not neighbors. On a swap, `sorted = false` walks back the assumption from line 11 - a swap happening means the array isn\'t done yet and another pass is needed.',
        },
      },
      {
        lines: [20],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `while (!sorted)` завершается - gap равен 1 и последний проход не сделал ни одной перестановки - `a` полностью отсортирован и возвращается.',
          en: 'When `while (!sorted)` ends - the gap is 1 and the last pass made zero swaps - `a` is fully sorted and gets returned.',
        },
      },
    ],
    python: [
      {
        lines: [1],
        title: { ru: 'Сигнатура', en: 'Signature' },
        explanation: {
          ru: 'Функция принимает один список `arr` - как и в JS-версии, вся настройка живёт внутри функции.',
          en: 'The function takes a single list `arr` - just like the JS version, all setup lives inside the function.',
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
        title: { ru: 'Начальный gap', en: 'Initial gap' },
        explanation: {
          ru: '`gap = len(a)` стартует с промежутком, равным длине списка - идентично JS-версии.',
          en: '`gap = len(a)` starts with a gap equal to the list length - identical to the JS version.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Коэффициент сжатия', en: 'Shrink factor' },
        explanation: {
          ru: '`shrink = 1.3` - тот же эмпирический коэффициент, на который делится gap после каждого прохода.',
          en: '`shrink = 1.3` - the same empirical factor the gap is divided by after every pass.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Флаг завершения', en: 'The termination flag' },
        explanation: {
          ru: '`sorted_ = False` - с подчёркиванием в конце имени, потому что `sorted` - встроенная функция Python; переменная работает так же, как `sorted` в JS-версии.',
          en: '`sorted_ = False` - trailing underscore because `sorted` is a Python builtin; the variable behaves exactly like `sorted` in the JS version.',
        },
      },
      {
        lines: [7, 8],
        title: { ru: 'Внешний цикл и сжатие gap', en: 'Outer loop and shrinking the gap' },
        explanation: {
          ru: '`while not sorted_:` повторяет проходы, пока массив не признан отсортированным. `gap = int(gap / shrink)` уменьшает gap - `int()` отбрасывает дробную часть, как `Math.floor` в JS.',
          en: '`while not sorted_:` repeats passes until the array is deemed sorted. `gap = int(gap / shrink)` shrinks the gap - `int()` truncates the fraction, just like `Math.floor` in JS.',
        },
      },
      {
        lines: [9, 11],
        title: { ru: 'Ограничение gap снизу', en: 'Clamping the gap to a minimum' },
        explanation: {
          ru: '`if gap <= 1: gap = 1; sorted_ = True` не даёт gap упасть до 0 или ниже и предварительно помечает список отсортированным - предположение, которое перестановка ниже может отменить.',
          en: '`if gap <= 1: gap = 1; sorted_ = True` keeps the gap from dropping to 0 or below and tentatively marks the list sorted - an assumption a swap below can undo.',
        },
      },
      {
        lines: [12],
        title: { ru: 'Границы прохода', en: 'Pass bounds' },
        explanation: {
          ru: '`for i in range(len(a) - gap):` перебирает все позиции, для которых у `i` есть партнёр на расстоянии gap внутри списка - эквивалент условия `i + gap < a.length` в JS.',
          en: '`for i in range(len(a) - gap):` walks every position with a gap-apart partner still inside the list - equivalent to the `i + gap < a.length` condition in JS.',
        },
      },
      {
        lines: [13, 15],
        title: { ru: 'Сравнение и перестановка через gap', en: 'Comparing and swapping across the gap' },
        explanation: {
          ru: '`if a[i] > a[i + gap]:` сравнивает элементы через gap, а не соседей. Перестановка `a[i], a[i + gap] = a[i + gap], a[i]` идёт кортежным присваиванием, а `sorted_ = False` откатывает предположение о завершении, как в JS-версии.',
          en: '`if a[i] > a[i + gap]:` compares elements gap positions apart, not neighbors. The swap `a[i], a[i + gap] = a[i + gap], a[i]` uses tuple assignment, and `sorted_ = False` walks back the completion assumption, same as the JS version.',
        },
      },
      {
        lines: [16],
        title: { ru: 'Возврат результата', en: 'Returning the result' },
        explanation: {
          ru: 'Когда `while not sorted_:` завершается, `a` полностью отсортирован и возвращается.',
          en: 'When `while not sorted_:` ends, `a` is fully sorted and gets returned.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Устраняет проблему «черепах» пузырьковой сортировки, давая заметный прирост производительности при почти такой же простоте реализации.',
      en: 'Fixes bubble sort\'s "turtle" problem, giving a noticeable speed-up while staying almost as simple to implement.',
    },
    {
      ru: 'Сортирует на месте - требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place - needs only O(1) extra memory.',
    },
    {
      ru: 'На практике часто быстрее сортировки Шелла на случайных данных при том же уровне простоты кода.',
      en: 'In practice often faster than Shell sort on random data at the same level of code simplicity.',
    },
  ],
  cons: [
    {
      ru: 'Неустойчив: сравнения через gap могут поменять относительный порядок равных элементов.',
      en: 'Unstable: gapped comparisons can change the relative order of equal elements.',
    },
    {
      ru: 'В худшем случае всё ещё O(n²), как и у обычного bubble sort.',
      en: 'Worst case is still O(n²), same as plain bubble sort.',
    },
    {
      ru: 'Коэффициент сжатия 1.3 подобран эмпирически - нет строгого теоретического обоснования, почему именно это значение оптимально.',
      en: 'The 1.3 shrink factor is empirically chosen - there\'s no rigorous theoretical proof that this exact value is optimal.',
    },
  ],

  whenToUse: [
    {
      ru: 'Как быстрая замена пузырьковой сортировке, когда простота кода важнее гарантированной сложности O(n log n).',
      en: 'As a fast drop-in replacement for bubble sort, when code simplicity matters more than a guaranteed O(n log n) bound.',
    },
    {
      ru: 'Для обучения идее «сжимающегося gap» перед переходом к сортировке Шелла, которая использует тот же принцип для вставок.',
      en: 'To teach the "shrinking gap" idea before moving to Shell sort, which applies the same principle to insertions.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Игровые движки и небольшие утилиты**, где нужно быстро улучшить существующую реализацию bubble sort без переписывания на другой алгоритм с нуля.',
      en: '**Game engines and small utilities**, where an existing bubble sort implementation needs a quick speed-up without rewriting it as a different algorithm from scratch.',
    },
    {
      ru: '**Учебные материалы по оптимизации алгоритмов** - классический пример того, как небольшое изменение (gap вместо соседей) убирает конкретный класс худших случаев.',
      en: '**Algorithm-optimization teaching material** - a classic example of how one small change (gap instead of neighbors) removes a specific class of worst cases.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Заявление «gap большой - элементы прыгают далеко» стоит проверить на конкретных числах. Возьмём массив `[2, 3, 4, 5, 6, 7, 8, 9, 10, 1]` (n = 10) - классическая «черепаха», единица, стоит на самом последнем месте.',
        en: 'The claim "a large gap means elements jump far" is worth checking against real numbers. Take the array `[2, 3, 4, 5, 6, 7, 8, 9, 10, 1]` (n = 10) - the classic "turtle", the 1, sits at the very last position.',
      },
      {
        ru: 'Начальный gap = 10. После первого деления на 1.3: `gap = floor(10 / 1.3) = 7`. Проход сравнивает `i` и `i + 7` для `i = 0, 1, 2`. При `i = 2` сравниваются `a[2] = 4` и `a[9] = 1` - перестановка отправляет 1 сразу на позицию 2. **Единица переместилась на 7 позиций за одно сравнение** - в обычном bubble sort на такое расстояние ушло бы 7 отдельных проходов.',
        en: 'Initial gap = 10. After the first division by 1.3: `gap = floor(10 / 1.3) = 7`. The pass compares `i` and `i + 7` for `i = 0, 1, 2`. At `i = 2`, `a[2] = 4` and `a[9] = 1` get compared - the swap sends the 1 straight to position 2. **The 1 moved 7 positions in a single comparison** - plain bubble sort would need 7 separate passes to cover that distance.',
      },
      {
        ru: 'Прослеживая дальше: gap уменьшается по цепочке `7 → 5 → 3 → 2 → 1`. Единица остаётся на позиции 2 через проходы с gap 5 и 3 (её партнёры по сравнению на этих промежутках больше неё), а на проходе с gap = 2 сравнение `a[0]` и `a[2]` отправляет её на позицию 0 - **на своё финальное место она попадает всего за 4 прохода**, а не за 9, как потребовалось бы обычному bubble sort для той же стартовой позиции.',
        en: 'Tracing further: the gap shrinks along the chain `7 → 5 → 3 → 2 → 1`. The 1 stays at position 2 through the gap-5 and gap-3 passes (its comparison partners at those distances are larger), then the gap-2 pass compares `a[0]` and `a[2]` and sends it to position 0 - **it reaches its final spot in just 4 passes**, versus the 9 plain bubble sort would need from the same starting position.',
      },
      {
        ru: 'Алгоритм в целом завершается за **6 проходов** на этом входе: gap = 7, 5, 3, 2, 1 (с перестановками), и ещё один финальный проход с gap = 1 без единой перестановки, подтверждающий, что массив готов. Геометрическое убывание gap - в отличие от линейного уменьшения на единицу в bubble sort - и даёт этот выигрыш в константе: число проходов растёт как `log₁.₃(n)`, а не как `n`.',
        en: 'The algorithm as a whole finishes in **6 passes** on this input: gap = 7, 5, 3, 2, 1 (with swaps), plus one final gap = 1 pass with zero swaps confirming the array is done. The geometric gap decay - as opposed to bubble sort\'s linear one-at-a-time shrink - is exactly what produces this constant-factor win: the pass count grows like `log₁.₃(n)`, not like `n`.',
      },
      {
        ru: 'Это не превращает алгоритм в O(n log n) в строгом смысле - каждый проход с малым gap всё ещё стоит O(n) сравнений, а на **враждебно построенных входах** быстрый спуск gap может не успеть развести все инверсии до перехода к gap = 1, и тогда финальные проходы деградируют к полноценному bubble sort - отсюда и худший случай O(n²), совпадающий с bubble sort.',
        en: 'That doesn\'t make the algorithm O(n log n) in the strict sense - each pass at a small gap still costs O(n) comparisons, and on **adversarially constructed inputs** the fast gap descent can fail to resolve all inversions before reaching gap = 1, at which point the final passes degrade into full-blown bubble sort - hence the worst case of O(n²), matching bubble sort.',
      },
      {
        ru: 'Есть известная слабость именно коэффициента 1.3: элементы, отстоящие ровно на 9 или 10 позиций в определённых паттернах, могут пережить всю цепочку сжатий gap и остаться неотсортированными до самого прохода с gap = 1. Модификация **Combsort11** решает это точечно: если очередной gap оказывается равен 9 или 10, он принудительно заменяется на 11 - небольшая эмпирическая заплатка поверх и без того эмпирического коэффициента 1.3.',
        en: 'There\'s a known weakness specific to the 1.3 factor: elements exactly 9 or 10 positions apart in certain patterns can survive the entire gap-shrinking chain and stay unsorted until the gap = 1 pass. The **Combsort11** variant patches this specifically: whenever the next gap would land on 9 or 10, it\'s forced to 11 instead - a small empirical fix on top of an already-empirical 1.3 factor.',
      },
      {
        ru: 'Сортировку расчёской изобрёл **Влодзимеж Добосевич (Włodzimierz Dobosiewicz)** в 1980 году, но она осталась малоизвестной до 1991-го, когда **Стивен Лейси и Ричард Бокс** заново описали её в статье «A Fast, Easy Sort» в журнале Byte Magazine - именно они экспериментально подобрали коэффициент 1.3 как оптимальный баланс между скоростью сжатия gap и качеством перемешивания, протестировав алгоритм на массивах разного размера.',
        en: 'Comb sort was invented by **Włodzimierz Dobosiewicz** in 1980, but stayed obscure until 1991, when **Stephen Lacey and Richard Box** re-described it in "A Fast, Easy Sort" in Byte Magazine - they were the ones who empirically settled on 1.3 as the best balance between fast gap convergence and thorough mixing, by testing the algorithm across array sizes.',
      },
      {
        ru: 'Итог: выигрыш сортировки расчёской - это константный множитель от геометрического сжатия gap, а не смена асимптотического класса. Она остаётся полезной как учебный мостик к **сортировке Шелла**, которая применяет ту же идею убывающего gap не к обмену соседей, а к вставке - и как таковая, к более серьёзному сокращению числа сравнений в среднем случае.',
        en: 'The takeaway: comb sort\'s win is a constant-factor speed-up from geometric gap shrinking, not a change of asymptotic class. Its lasting value is as a teaching bridge to **Shell sort**, which applies the same shrinking-gap idea not to swaps but to insertion - and, as such, to a more serious reduction in average-case comparisons.',
      },
    ],
    whenToUse: [
      {
        ru: '**Почти всегда вместо bubble sort** - реализация отличается на несколько строк (gap вместо фиксированного соседства), а выигрыш в константе заметен уже на массивах от нескольких сотен элементов.',
        en: '**Almost always instead of bubble sort** - the implementation differs by only a few lines (a gap instead of a fixed neighbor distance), and the constant-factor win shows up starting at just a few hundred elements.',
      },
      {
        ru: '**Против сортировки Шелла** - если важна более предсказуемая производительность на случайных данных, Shell sort с хорошей последовательностью gap (например, Chiba/Sedgewick) обычно обгоняет comb sort; выбирайте comb sort только когда важна простота одной операции - обмена, а не вставки.',
        en: '**Against Shell sort** - if more predictable performance on random data matters, Shell sort with a good gap sequence (e.g. Ciura or Sedgewick) usually beats comb sort; pick comb sort only when the simplicity of a single operation - swap, not insert - matters more.',
      },
      {
        ru: '**Не выбирать при известном враждебном или структурированном входе** - если входные данные могут быть подобраны злонамеренно или содержат регулярные паттерны, риск попасть в O(n²) реален; для гарантий стоит взять merge sort, heap sort или хотя бы Combsort11.',
        en: '**Don\'t pick it for known adversarial or structured input** - if the input could be crafted maliciously or has regular patterns, the risk of hitting O(n²) is real; for guarantees, use merge sort, heap sort, or at least Combsort11.',
      },
      {
        ru: '**Как шаг перед сортировкой Шелла в учебном курсе** - объяснить сначала, что убывающий gap с простым обменом соседей уже даёт заметный выигрыш, а затем показать, что тот же gap, применённый к вставке, даёт ещё более сильный алгоритм.',
        en: '**As a step before Shell sort in a teaching course** - first show that a shrinking gap with a plain neighbor swap already gives a real win, then show that the same gap applied to insertion produces an even stronger algorithm.',
      },
    ],
    realWorld: [
      {
        ru: '**Технический отчёт Влодзимежа Добосевича (1980)** - первое описание идеи сравнений через убывающий gap поверх пузырьковой сортировки, задолго до того, как алгоритм получил своё нынешнее имя.',
        en: '**Włodzimierz Dobosiewicz\'s 1980 technical report** - the first description of the shrinking-gap-over-bubble-sort idea, long before the algorithm got its current name.',
      },
      {
        ru: '**«A Fast, Easy Sort» Стивена Лейси и Ричарда Бокса (Byte Magazine, апрель 1991)** - статья, заново популяризировавшая алгоритм под именем «comb sort» среди хобби-программистов начала 1990-х и предложившая коэффициент сжатия 1.3 на основе собственных тестов.',
        en: '**"A Fast, Easy Sort" by Stephen Lacey and Richard Box (Byte Magazine, April 1991)** - the article that repopularized the algorithm under the name "comb sort" among early-1990s hobbyist programmers and proposed the 1.3 shrink factor based on their own testing.',
      },
      {
        ru: '**Combsort11** - широко цитируемая модификация, форсирующая gap в 11 вместо 9 или 10, встречается в справочных реализациях и обсуждениях как стандартная защита от известного класса плохо сортируемых входов при коэффициенте 1.3.',
        en: '**Combsort11** - a widely cited modification forcing a gap of 11 instead of 9 or 10, appears in reference implementations and discussions as the standard defense against a known class of poorly-sorting inputs at the 1.3 factor.',
      },
      {
        ru: '**Курсы по алгоритмам сортировки**, сравнивающие семейство «убывающего gap» (comb sort, Shell sort), используют именно эту пару как пример того, что одна и та же идея (сравнение не только соседей) даёт разный выигрыш в зависимости от того, к какой базовой операции - обмену или вставке - она применяется.',
        en: '**Sorting-algorithms courses** comparing the "shrinking gap" family (comb sort, Shell sort) use exactly this pair to show that the same idea (comparing more than just neighbors) yields a different payoff depending on which base operation - swap or insertion - it\'s applied to.',
      },
    ],
  },

  relatedAlgorithms: ['bubble-sort', 'shell-sort'],

  quiz: [
    {
      question: {
        ru: 'Какую слабость пузырьковой сортировки устраняет сортировка расчёской?',
        en: 'What bubble sort weakness does comb sort fix?',
      },
      options: [
        { ru: '«Черепах» - маленькие элементы, застревающие в конце массива', en: '"Turtles" - small elements getting stuck near the end of the array' },
        { ru: 'Избыточное использование памяти, как в сортировке слиянием', en: 'Excessive memory usage, similar to what merge sort requires' },
        { ru: 'Отсутствие поддержки отрицательных чисел без дополнительной обработки знака', en: 'Lack of support for negative numbers without extra sign handling' },
        { ru: 'Невозможность сортировки строк без предварительного преобразования в числа', en: 'Inability to sort strings without first converting them to numbers' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сравнения через большой gap позволяют маленькому элементу в конце массива быстро переместиться на много позиций влево за один шаг.',
        en: 'Large-gap comparisons let a small element near the end of the array jump many positions left in a single step.',
      },
      hint: {
        ru: 'Смотрите подраздел «Проблема» на вкладке «Суть» и шаг «Сравнить элементы через gap» на вкладке «Визуализация».',
        en: 'See the "Problem" subsection on the "Intent" tab and the "Compare elements gap apart" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Как изменяется gap между проходами в сортировке расчёской?',
        en: 'How does the gap change between passes in comb sort?',
      },
      options: [
        { ru: 'Делится на коэффициент сжатия (обычно 1.3)', en: 'Divided by a shrink factor (typically 1.3)' },
        { ru: 'Увеличивается вдвое каждый проход, как в бинарном поиске', en: 'Doubles every pass, similar to how binary search halves its range' },
        { ru: 'Остаётся фиксированным весь алгоритм, как размер блока в блочной сортировке', en: 'Stays fixed for the whole algorithm, like the block size in block sort' },
        { ru: 'Устанавливается случайно на каждом проходе для избежания худшего случая', en: 'Is set randomly on each pass to avoid worst-case inputs' },
      ],
      correct: 0,
      explanation: {
        ru: 'Уменьшение gap делением на ~1.3 - эмпирически найденное значение, дающее хороший баланс между скоростью схождения к gap=1 и качеством перемешивания.',
        en: 'Shrinking the gap by dividing by ~1.3 is an empirically found value giving a good balance between converging to gap=1 quickly and mixing elements well.',
      },
      hint: {
        ru: 'Смотрите шаг «Уменьшить gap» на вкладке «Визуализация» и подраздел «Решение» на вкладке «Суть».',
        en: 'See the "Shrink the gap" step on the "Visualization" tab and the "Solution" subsection on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Во что превращается сортировка расчёской, когда gap достигает 1?',
        en: 'What does comb sort become once the gap reaches 1?',
      },
      options: [
        { ru: 'В обычную пузырьковую сортировку', en: 'Plain bubble sort' },
        { ru: 'В сортировку вставками', en: 'Insertion sort' },
        { ru: 'В сортировку слиянием', en: 'Merge sort' },
        { ru: 'Алгоритм останавливается без финального прохода', en: 'The algorithm stops without a final pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'При gap = 1 сравниваются только соседние элементы - это в точности определение bubble sort, но выполняется оно на уже почти упорядоченном массиве.',
        en: 'At gap = 1, only adjacent elements are compared - that\'s exactly bubble sort, but it runs on an already nearly sorted array.',
      },
      hint: {
        ru: 'Смотрите строки 9-12 функции `combSort` на вкладке «Реализация» (условие `gap <= 1`) и шаг «Остановиться» на вкладке «Визуализация».',
        en: 'See lines 9-12 of `combSort` on the "Implementation" tab (the `gap <= 1` check) and the "Stop" step on the "Visualization" tab.',
      },
    },
    {
      question: {
        ru: 'Является ли сортировка расчёской устойчивой (stable)?',
        en: 'Is comb sort stable?',
      },
      options: [
        { ru: 'Нет - перестановки через gap могут изменить порядок равных элементов', en: 'No - gapped swaps can change the order of equal elements' },
        { ru: 'Да, как обычный bubble sort, ведь оба используют только обмены соседей', en: 'Yes, same as plain bubble sort, since both only ever swap adjacent-looking pairs' },
        { ru: 'Только при чётном значении gap, из-за симметрии сравнений', en: 'Only when the gap is even, due to the symmetry of the comparisons' },
        { ru: 'Только на финальном проходе с gap=1, когда сравниваются соседи', en: 'Only during the final gap=1 pass, when neighbors are compared' },
      ],
      correct: 0,
      explanation: {
        ru: 'Элемент может перепрыгнуть через равный себе элемент, стоящий между позициями i и i+gap, поэтому их относительный порядок не гарантирован.',
        en: 'An element can jump over an equal element sitting between positions i and i+gap, so their relative order isn\'t guaranteed.',
      },
      hint: {
        ru: 'Названо напрямую в первом пункте минусов на вкладке «Плюсы и минусы» (тег `unstable` рядом с названием алгоритма вверху страницы).',
        en: 'Named directly in the first "Cons" item on the "Pros & Cons" tab (see also the `unstable` tag near the algorithm name at the top).',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность сортировки расчёской в худшем случае?',
        en: 'What is the worst-case time complexity of comb sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Хотя на практике сортировка расчёской обычно намного быстрее bubble sort, для определённых патологических входов её худший случай остаётся квадратичным.',
        en: 'While in practice comb sort is usually much faster than bubble sort, for certain pathological inputs its worst case remains quadratic.',
      },
      hint: {
        ru: 'Смотрите бейдж «Худший» вверху страницы и второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the "Worst" complexity badge at the top of the page and the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Почему начальный gap выбирается примерно равным длине массива?',
        en: 'Why is the initial gap chosen to be roughly equal to the array length?',
      },
      options: [
        { ru: 'Перемещать элементы с первого прохода на максимально большое расстояние', en: 'To move elements the largest possible distance right from the first pass' },
        { ru: 'Чтобы сразу сравнивать только соседей и не делать лишних итераций', en: 'To compare only neighbors immediately and skip extra iterations' },
        { ru: 'Потому что меньший начальный gap гарантированно приводит к O(n log n) сложности', en: 'Because a smaller initial gap guarantees O(n log n) complexity' },
        { ru: 'Из-за ограничений на размер стека при рекурсивных вызовах функции', en: 'Due to call-stack size constraints when the function is called recursively' },
      ],
      correct: 0,
      explanation: {
        ru: 'Большой начальный gap позволяет элементам сразу прыгать через весь массив, что устраняет «черепах» быстрее всего.',
        en: 'A large initial gap lets elements jump across the whole array immediately, which eliminates "turtles" as fast as possible.',
      },
      hint: {
        ru: 'Смотрите шаг «Выбрать начальный gap» на вкладке «Визуализация» и числовой пример с одним прыжком на 7 позиций в подразделе «Как это работает» на вкладке «Суть».',
        en: 'See the "Pick the initial gap" step on the "Visualization" tab and the numeric example of a single 7-position jump in the "How it works" subsection on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Как сортировка расчёской соотносится с сортировкой Шелла?',
        en: 'How does comb sort relate to Shell sort?',
      },
      options: [
        { ru: 'Оба применяют убывающий gap: comb sort обменивает соседей, Shell sort вставляет', en: 'Both use a shrinking gap, but comb sort applies it to swaps (like bubble), while Shell sort applies it to insertions' },
        { ru: 'Это один и тот же алгоритм с разными названиями и идентичной реализацией', en: 'They are the same algorithm with different names and an identical implementation' },
        { ru: 'Shell sort является частным случаем comb sort только при коэффициенте сжатия ровно 2.0', en: 'Shell sort is a special case of comb sort only when the shrink factor is exactly 2.0 regardless of input size or order' },
        { ru: 'Comb sort всегда медленнее Shell sort на любых возможных входных данных', en: 'Comb sort is always slower than Shell sort on any possible input data' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка Шелла уменьшает gap для сортировки вставками, тогда как сортировка расчёской уменьшает gap для пузырьковой сортировки - общая идея та же, базовый примитив разный.',
        en: 'Shell sort shrinks the gap for insertion sort, while comb sort shrinks it for bubble sort - the overarching idea is the same, but the underlying primitive differs.',
      },
      hint: {
        ru: 'Смотрите второй пункт раздела «Когда применять» (расширенного, на вкладке «Суть») и раздел «Похожие алгоритмы» внизу страницы.',
        en: 'See the second item in the extended "When to use" section on the "Intent" tab and the "Related algorithms" section at the bottom of the page.',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если не ограничивать gap снизу значением 1?',
        en: 'What happens if the gap is not clamped to a minimum of 1?',
      },
      options: [
        { ru: 'Gap может стать нулём или меньше, вызвав ошибку при обращении к элементам', en: 'The gap can reach zero or below, causing an error when accessing array elements' },
        { ru: 'Алгоритм станет быстрее, так как пропустит неэффективный финальный проход при gap=1', en: 'The algorithm becomes faster by skipping the inefficient final pass at gap=1 always' },
        { ru: 'Gap автоматически обнуляется языком программирования при делении на 1.3', en: 'The gap is automatically zeroed out by the language when divided by 1.3' },
        { ru: 'Сортировка станет устойчивой, так как перестанет совершать сравнения через промежуток', en: 'The sort becomes stable since it stops making gapped comparisons altogether' },
      ],
      correct: 0,
      explanation: {
        ru: 'При gap = 0 индексы i и i+gap совпадают, а при gap < 0 доступ выходит за границы массива.',
        en: 'At gap = 0, indices i and i+gap coincide; at gap < 0, the access goes out of array bounds.',
      },
      hint: {
        ru: 'Смотрите строки 13-14 функции `combSort` на вкладке «Реализация» (`a[i]` и `a[i + gap]` внутри цикла `for`) - что если gap станет 0?',
        en: 'See lines 13-14 of `combSort` on the "Implementation" tab (`a[i]` and `a[i + gap]` inside the `for` loop) - what if the gap became 0?',
      },
    },
    {
      question: {
        ru: 'Почему алгоритм продолжает работу даже после того, как gap достиг 1 и прошёл один проход без перестановок?',
        en: 'Why does the algorithm stop only after gap equals 1 AND a pass makes no swaps?',
      },
      options: [
        { ru: 'Gap=1 не гарантирует результат - нужно убедиться, что при gap=1 больше нечего менять', en: 'Because gap=1 alone does not guarantee sorted order - it must be confirmed that nothing needs swapping at gap=1' },
        { ru: 'Потому что каждый проход с gap=1 сортирует ровно один дополнительный элемент на своём месте', en: 'Because each gap=1 pass puts exactly one additional element into its correct place regardless of input size or order' },
        { ru: 'Из-за ограничений языка: цикл должен выполниться хотя бы один раз при gap=1', en: 'Due to a language constraint: the loop must execute at least once at gap=1' },
        { ru: 'Потому что массив всегда полностью отсортирован уже после первого прохода с gap=1', en: 'Because the array is always fully sorted after the very first gap=1 pass' },
      ],
      correct: 0,
      explanation: {
        ru: 'Gap=1 означает, что следующий проход будет по соседям, но сам массив может ещё быть неупорядочен - только отсутствие перестановок при gap=1 служит доказательством сортировки.',
        en: 'Gap=1 means the next pass will compare neighbors, but the array may still be disordered - only a swap-free pass at gap=1 proves the array is sorted.',
      },
      hint: {
        ru: 'Смотрите шаги «Отследить перестановки» и «Остановиться» на вкладке «Визуализация» и строку 16 (`sorted = false`) функции `combSort` на вкладке «Реализация».',
        en: 'See the "Track swaps" and "Stop" steps on the "Visualization" tab and line 16 (`sorted = false`) of `combSort` on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какова пространственная сложность сортировки расчёской?',
        en: 'What is the space complexity of comb sort?',
      },
      options: [
        { ru: 'O(1) - требуется лишь несколько переменных для gap и флага', en: 'O(1) - only a few variables for the gap and a flag are needed' },
        { ru: 'O(n) - для хранения вспомогательной копии массива при перестановках', en: 'O(n) - to store an auxiliary array copy during the permutation phase' },
        { ru: 'O(log n) - из-за стека вызовов при рекурсивном уменьшении gap', en: 'O(log n) - due to the call stack when gap is reduced recursively' },
        { ru: 'O(n log n) - из-за числа проходов, умноженного на размер массива', en: 'O(n log n) - because the number of passes multiplied by array size' },
      ],
      correct: 0,
      explanation: {
        ru: 'Comb sort работает прямо в исходном массиве, используя лишь переменные gap, sorted и временную переменную для обмена.',
        en: 'Comb sort works directly on the input array, using only the gap, sorted flag, and a temporary swap variable.',
      },
      hint: {
        ru: 'Смотрите бейдж «Память» вверху страницы и второй пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the "Space" complexity badge at the top of the page and the second "Pros" item on the "Pros & Cons" tab.',
      },
    },
  ],
};

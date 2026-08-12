export const shellSort = {
  slug: 'shell-sort',
  category: 'sorting',
  name: { ru: 'Shell Sort', en: 'Shell Sort' },
  complexity: {
    time: { best: 'O(n log n)', average: 'O(n^1.3)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Сортировка Шелла - это сортировка вставками, которая сначала сравнивает и переставляет далеко отстоящие друг от друга элементы, постепенно сокращая это расстояние (gap) до 1.',
    en: 'Shell sort is insertion sort that first compares and swaps elements far apart from each other, gradually shrinking that gap down to 1.',
  },

  problem: {
    ru: 'Сортировка вставками эффективна на почти отсортированных данных, но медленна, когда маленький элемент находится далеко от своего места - его приходится сдвигать через все промежуточные позиции по одной. На случайном массиве это создаёт много «мелких шагов» там, где нужен один большой прыжок.',
    en: 'Insertion sort is efficient on nearly sorted data, but slow when a small element is far from its final position - it has to be shifted through every intermediate slot one at a time. On a random array, this creates many "small steps" where one big jump would do.',
  },

  solution: {
    ru: 'Алгоритм задаёт последовательность убывающих промежутков (gap), например n/2, n/4, ..., 1. На каждом шаге он выполняет сортировку вставками, но сравнивает не соседние элементы, а элементы, отстоящие друг от друга на текущий gap - это позволяет далёким элементам быстро «перепрыгнуть» на нужную сторону массива. Когда gap становится равным 1, выполняется обычная сортировка вставками, но к этому моменту массив уже почти упорядочен, поэтому она проходит быстро.',
    en: 'The algorithm defines a decreasing sequence of gaps, e.g. n/2, n/4, ..., 1. At each step it runs insertion sort, but compares elements that are `gap` positions apart instead of adjacent ones - letting far-away elements quickly "jump" to the right side of the array. When the gap reaches 1, a plain insertion sort runs, but by then the array is already nearly sorted, so it finishes fast.',
  },

  steps: [
    {
      title: { ru: 'Выбрать начальный gap', en: 'Pick the initial gap' },
      explanation: {
        ru: 'Взять gap равным половине длины массива (или другую убывающую последовательность).',
        en: 'Set the gap to half the array length (or another decreasing sequence).',
      },
    },
    {
      title: { ru: 'Сортировка вставками с шагом gap', en: 'Gapped insertion sort' },
      explanation: {
        ru: 'Для каждого элемента, начиная с позиции gap, сравнить его с элементом на gap позиций левее и сдвигать, пока порядок не восстановится.',
        en: 'For each element starting at index gap, compare it with the element gap positions to the left and shift until order is restored.',
      },
    },
    {
      title: { ru: 'Уменьшить gap', en: 'Shrink the gap' },
      explanation: {
        ru: 'Разделить gap пополам (или по формуле выбранной последовательности) и повторить проход.',
        en: 'Halve the gap (or follow the chosen sequence) and repeat the pass.',
      },
    },
    {
      title: { ru: 'Повторять до gap = 1', en: 'Repeat until gap = 1' },
      explanation: {
        ru: 'Продолжать уменьшать gap и сортировать, пока он не станет равным единице.',
        en: 'Keep shrinking the gap and sorting until it equals one.',
      },
    },
    {
      title: { ru: 'Финальный проход', en: 'Final pass' },
      explanation: {
        ru: 'При gap = 1 выполняется обычная сортировка вставками - но данные уже почти упорядочены, поэтому сдвигов немного.',
        en: 'At gap = 1, a plain insertion sort runs - but the data is already nearly sorted, so few shifts are needed.',
      },
    },
  ],
  stepBreakpoints: [2, 13, 24, 34],

  implementation: {
    javascript: `function shellSort(arr) {
  const a = [...arr];
  const n = a.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const current = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > current) {
        a[j] = a[j - gap];
        j -= gap;
      }
      a[j] = current;
    }
  }
  return a;
}`,
    python: `def shell_sort(arr):
    a = arr.copy()
    n = len(a)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            current = a[i]
            j = i
            while j >= gap and a[j - gap] > current:
                a[j] = a[j - gap]
                j -= gap
            a[j] = current
        gap //= 2
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 3],
        title: { ru: 'Подготовка: копия и длина', en: 'Setup: copy and length' },
        explanation: {
          ru: '`const a = [...arr]` создаёт независимую копию через spread-оператор - алгоритм работает с ней, не меняя оригинал. `const n = a.length` вычисляется один раз: обе вложенные переменные gap используют `n` на каждой итерации, одиночный вызов эффективнее.',
          en: '`const a = [...arr]` makes an independent copy via the spread operator - the algorithm works on it without mutating the original. `const n = a.length` is computed once: both gap-dependent loops use `n` on every iteration, so a single call is more efficient.',
        },
      },
      {
        lines: [4, 4],
        title: { ru: 'Внешний цикл: управление gap', en: 'Outer loop: gap control' },
        explanation: {
          ru: 'Цикл стартует с `gap = Math.floor(n / 2)` и на каждой итерации делит gap пополам: `gap = Math.floor(gap / 2)`. Условие `gap > 0` гарантирует завершение - gap убывает геометрически и рано или поздно достигнет 1, а следующее деление даст 0.',
          en: 'The loop starts at `gap = Math.floor(n / 2)` and halves the gap each iteration: `gap = Math.floor(gap / 2)`. The condition `gap > 0` guarantees termination - gap shrinks geometrically and will eventually reach 1, then halve to 0.',
        },
      },
      {
        lines: [5, 5],
        title: { ru: 'Внутренний цикл: перебор элементов с шагом gap', en: 'Inner loop: iterate elements gap apart' },
        explanation: {
          ru: '`i` стартует с `gap`, а не с 0 - первые `gap` элементов не имеют левого соседа на расстоянии gap. Цикл обходит все элементы начиная с позиции `gap` и для каждого запускает вставку в подпоследовательность с тем же шагом.',
          en: '`i` starts at `gap`, not 0 - the first `gap` elements have no left neighbor at gap distance. The loop visits every element from position `gap` onward and for each one runs an insertion into the corresponding gapped subsequence.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Запоминаем вставляемый элемент', en: 'Save the element to insert' },
        explanation: {
          ru: '`const current = a[i]` сохраняет вставляемый элемент до начала сдвигов - иначе он будет перезаписан. `let j = i` - позиция, куда пойдёт вставка: начинаем с текущей позиции и будем сдвигать её влево на gap шагов.',
          en: '`const current = a[i]` saves the element being inserted before any shifts start - otherwise it would be overwritten. `let j = i` is the insertion position: we start at the current index and will shift it left by gap steps.',
        },
      },
      {
        lines: [8, 10],
        title: { ru: 'Сдвиг: аналог вставки, но через gap', en: 'Shift: insertion logic over gap distance' },
        explanation: {
          ru: 'Пока левый сосед на расстоянии gap существует (`j >= gap`) и он больше `current` (`a[j - gap] > current`) - копируем его вправо: `a[j] = a[j - gap]`, затем сдвигаем `j` на gap влево. Это то же самое, что в обычной сортировке вставками, только шаг не 1, а gap.',
          en: 'While a left neighbor at gap distance exists (`j >= gap`) and it is greater than `current` (`a[j - gap] > current`), copy it right: `a[j] = a[j - gap]`, then shift `j` left by gap. This is identical to plain insertion sort logic, except the step is gap instead of 1.',
        },
      },
      {
        lines: [11, 11],
        title: { ru: 'Вставка на найденную позицию', en: 'Place the element at its found position' },
        explanation: {
          ru: 'После выхода из `while` переменная `j` указывает на позицию, где левого большего соседа уже нет - это место для `current`. Запись `a[j] = current` завершает вставку. В отличие от обычных обменов, здесь минимум операций записи: один сдвиг за сдвинутый элемент плюс одна финальная запись.',
          en: 'After the `while` loop exits, `j` points to the position where no larger left neighbor exists at gap distance - that is where `current` belongs. Writing `a[j] = current` completes the insertion. Unlike naive swaps, this minimizes writes: one shift per shifted element plus one final write.',
        },
      },
      {
        lines: [13, 13],
        title: { ru: 'Возврат отсортированной копии', en: 'Return the sorted copy' },
        explanation: {
          ru: 'Возвращается `a` - отсортированная копия исходного массива. `arr` не изменён. Когда gap на последней итерации был равен 1 и цикл завершился, массив гарантированно полностью отсортирован.',
          en: 'Returns `a` - the sorted copy of the original array. `arr` is untouched. When gap was 1 on the last iteration and the loop finished, the array is guaranteed to be fully sorted.',
        },
      },
    ],
    python: [
      {
        lines: [1, 3],
        title: { ru: 'Подготовка: копия, длина, начальный gap', en: 'Setup: copy, length, initial gap' },
        explanation: {
          ru: '`a = arr.copy()` создаёт независимую копию списка. `n = len(a)` используется в обоих циклах. `gap = n // 2` - начальное значение: целочисленное деление сразу даёт правильный стартовый gap без отдельного `floor`.',
          en: '`a = arr.copy()` creates an independent list copy. `n = len(a)` is reused in both loops. `gap = n // 2` sets the initial gap: integer division immediately gives the correct starting value without a separate `floor` call.',
        },
      },
      {
        lines: [4, 4],
        title: { ru: 'Внешний цикл `while`: управление gap', en: 'Outer `while` loop: gap control' },
        explanation: {
          ru: '`while gap > 0` продолжает работу, пока gap не обнулится. В отличие от JS-версии с тройной конструкцией `for`, Python использует `while` - логика та же, но gap уменьшается в конце тела цикла на строке 7. Читается как «пока есть что делать».',
          en: '`while gap > 0` continues while gap is positive. Unlike the JS version with a three-part `for`, Python uses `while` - the logic is identical but gap shrinks at the end of the loop body on line 7. Reads naturally as "while there is work to do."',
        },
      },
      {
        lines: [5, 5],
        title: { ru: 'Внутренний цикл: перебор с позиции gap', en: 'Inner loop: iterate from position gap' },
        explanation: {
          ru: '`range(gap, n)` генерирует индексы от `gap` до `n-1`. Каждый индекс `i` - это элемент, который нужно вставить в свою подпоследовательность (все элементы с шагом gap, левее `i`). Старт с `gap`, а не с 0 - первые `gap` элементов не имеют левого соседа.',
          en: '`range(gap, n)` generates indices from `gap` to `n-1`. Each index `i` is an element to insert into its own subsequence (all elements gap-spaced to the left of `i`). Starting at `gap` rather than 0 because the first `gap` elements have no left neighbor at gap distance.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Запоминаем вставляемый элемент', en: 'Save the element to insert' },
        explanation: {
          ru: '`current = a[i]` сохраняет значение до начала сдвигов - иначе оно будет перезаписано на строке 9. `j = i` - стартовая позиция для поиска места вставки. Обе строки зеркалят логику обычной сортировки вставками, но работают через gap.',
          en: '`current = a[i]` saves the value before any shifts overwrite it on line 9. `j = i` is the starting position for the insertion search. Both lines mirror plain insertion sort logic, but operating across gap distance.',
        },
      },
      {
        lines: [8, 10],
        title: { ru: 'Сдвиг элементов вправо через gap', en: 'Shift elements right across gap' },
        explanation: {
          ru: 'Пока `j >= gap` (есть левый сосед) и `a[j - gap] > current` (он больше) - сдвигаем: `a[j] = a[j - gap]`, затем `j -= gap`. Каждый сдвиг освобождает место на позиции `j` и перемещает поиск на gap шагов влево. Цикл завершается, когда нашлось место или дошли до начала.',
          en: 'While `j >= gap` (a left neighbor exists) and `a[j - gap] > current` (it is larger), shift: `a[j] = a[j - gap]`, then `j -= gap`. Each shift frees position `j` and moves the search gap steps left. The loop stops when a slot is found or the start is reached.',
        },
      },
      {
        lines: [11, 11],
        title: { ru: 'Вставка на найденную позицию', en: 'Place the element at its found position' },
        explanation: {
          ru: 'После `while` позиция `j` - это место, где левый сосед на расстоянии gap не превышает `current`. Запись `a[j] = current` завершает вставку за одну операцию. Всего на один элемент: несколько сдвигов плюс одна финальная запись.',
          en: 'After `while`, position `j` is where the left neighbor at gap distance no longer exceeds `current`. Writing `a[j] = current` completes the insertion in one operation. Total per element: several shifts plus one final write.',
        },
      },
      {
        lines: [12, 12],
        title: { ru: 'Уменьшение gap: переход к следующему проходу', en: 'Shrink gap: move to the next pass' },
        explanation: {
          ru: '`gap //= 2` делит gap пополам целочисленно. При gap=1 следующее деление даст 0, и `while gap > 0` завершит внешний цикл. Финальный проход с gap=1 - обычная сортировка вставками по почти упорядоченному массиву.',
          en: '`gap //= 2` halves the gap with integer division. When gap=1 the next division gives 0, and `while gap > 0` ends the outer loop. The final pass with gap=1 is plain insertion sort over an already nearly sorted array.',
        },
      },
      {
        lines: [13, 13],
        title: { ru: 'Возврат отсортированной копии', en: 'Return the sorted copy' },
        explanation: {
          ru: 'Возвращается `a`. Исходный список `arr` не изменён ни на одном шаге. После того как `while` завершился (gap стал 0), массив `a` гарантированно полностью отсортирован.',
          en: 'Returns `a`. The original list `arr` was never modified at any step. Once `while` exits (gap reached 0), array `a` is guaranteed to be fully sorted.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Заметно быстрее простой сортировки вставками на средних по размеру массивах, оставаясь простым в реализации.',
      en: 'Noticeably faster than plain insertion sort on medium-sized arrays, while staying simple to implement.',
    },
    {
      ru: 'Сортирует на месте - требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place - needs only O(1) extra memory.',
    },
    {
      ru: 'Не требует рекурсии и дополнительных структур данных, в отличие от merge sort.',
      en: 'Needs no recursion or extra data structures, unlike merge sort.',
    },
  ],
  cons: [
    {
      ru: 'Неустойчив: равные элементы могут поменять относительный порядок из-за сравнений «через gap».',
      en: 'Unstable: equal elements can change relative order because of the gapped comparisons.',
    },
    {
      ru: 'Точная временная сложность зависит от выбранной последовательности gap и математически анализируется сложно.',
      en: 'The exact time complexity depends on the chosen gap sequence and is mathematically hard to analyze.',
    },
    {
      ru: 'Всё ещё уступает O(n log n) алгоритмам вроде merge sort и quicksort на больших массивах.',
      en: 'Still loses to O(n log n) algorithms like merge sort and quicksort on large arrays.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Возьмём массив `[8, 3, 6, 1, 5, 2, 7, 4]` (n=8). Сортировка Шелла начинает с gap = 4 и делит массив на **4 подпоследовательности**: `[8,5]`, `[3,2]`, `[6,7]`, `[1,4]`. Каждая сортируется вставками независимо. После первого прохода массив выглядит как `[5, 2, 6, 1, 8, 3, 7, 4]` - ни одна пара ещё не стоит правильно относительно соседа, но **дальние элементы уже близко к своим позициям**. Это главная идея: крупные прыжки сначала.',
        en: 'Take the array `[8, 3, 6, 1, 5, 2, 7, 4]` (n=8). Shell sort starts with gap = 4 and splits the array into **4 subsequences**: `[8,5]`, `[3,2]`, `[6,7]`, `[1,4]`. Each is sorted by insertion sort independently. After the first pass the array looks like `[5, 2, 6, 1, 8, 3, 7, 4]` - no adjacent pair is correct yet, but **distant elements are already near their final positions**. That is the core idea: big jumps first.',
      },
      {
        ru: 'Почему обычная сортировка вставками медленна на случайных данных? Из-за **«черепах»** - маленьких элементов, попавших в правую часть массива. Элемент `1` в позиции 7 при вставками сдвигается на одну позицию влево за проход - значит, ему нужно **7 проходов**, чтобы добраться до начала. Сортировка Шелла убивает черепах за **один проход с большим gap**: при gap=4 элемент `1` сразу перепрыгивает через 4 позиции вместо одной. Именно устранение черепах объясняет ускорение.',
        en: 'Why is plain insertion sort slow on random data? Because of **"turtles"** - small elements stuck in the right half of the array. An element `1` at position 7 moves one position left per pass in insertion sort - it needs **7 passes** to reach the start. Shell sort kills turtles in **one pass with a large gap**: at gap=4 the element `1` immediately jumps 4 positions instead of one. Eliminating turtles explains the speedup.',
      },
      {
        ru: 'Последовательность gap n/2, n/4, ..., 1 даёт **O(log n) проходов**. Для n=8 это проходы с gap 4, 2, 1 - всего три. На каждом проходе алгоритм выполняет сортировку вставками для подпоследовательностей длиной n/gap. Ключевое наблюдение: к моменту финального прохода с gap=1 массив уже **почти отсортирован** - предыдущие проходы разместили все элементы близко от их итоговых позиций. Сортировка вставками на почти отсортированном массиве работает за **O(n)**, а не за O(n²).',
        en: 'The n/2, n/4, ..., 1 gap sequence produces **O(log n) passes**. For n=8 that means passes with gaps 4, 2, 1 - only three passes total. On each pass the algorithm runs insertion sort over subsequences of length n/gap. The key observation: by the time the final gap=1 pass runs, the array is already **nearly sorted** - earlier passes placed all elements close to their final positions. Insertion sort on a nearly sorted array runs in **O(n)**, not O(n²).',
      },
      {
        ru: 'Почему средняя сложность ~**O(n^1.3)**, а не O(n log n)? Дело в проходах с промежуточными значениями gap. При gap=2 алгоритм обрабатывает подпоследовательности длиной n/2, и каждая занимает до O((n/2)²) в худшем случае. Точный анализ зависит от выбранной последовательности gap и остаётся открытой математической задачей для некоторых вариантов. Простейшая последовательность Шелла (n/2, n/4, ...) даёт **O(n²)** в худшем случае; более умные последовательности снижают это до O(n^1.3) и лучше.',
        en: 'Why is the average complexity ~**O(n^1.3)** rather than O(n log n)? The intermediate gap passes are the culprit. At gap=2 the algorithm processes subsequences of length n/2, each taking up to O((n/2)²) in the worst case. Exact analysis depends on the chosen gap sequence and remains an open mathematical problem for some variants. Shell\'s own simple sequence (n/2, n/4, ...) gives **O(n²)** worst case; smarter sequences reduce this to O(n^1.3) and better.',
      },
      {
        ru: 'Почему сортировка Шелла **неустойчива** (unstable)? Возьмём `[2a, 2b, 1]`, где `2a` и `2b` - равные значения. При gap=2 алгоритм сравнивает элементы на позициях 0 и 2: `2a` и `1`. Поскольку `2a > 1`, происходит обмен: `[1, 2b, 2a]`. Теперь `2b` стоит левее `2a`, хотя исходно было наоборот. **Прыжок через равный элемент** - корень проблемы: в отличие от сортировки вставками, где элемент сдвигается по одной позиции и никогда не перепрыгивает равных, здесь gap позволяет перескочить через них.',
        en: 'Why is Shell sort **unstable**? Take `[2a, 2b, 1]`, where `2a` and `2b` are equal values. At gap=2 the algorithm compares positions 0 and 2: `2a` and `1`. Since `2a > 1`, a swap happens: `[1, 2b, 2a]`. Now `2b` sits left of `2a`, though originally it was the reverse. The **jump over an equal element** is the root cause: unlike plain insertion sort, where each element shifts one position at a time and never leaps over equals, the gap allows skipping past them.',
      },
      {
        ru: 'Сравнение с **сортировкой вставками** раскрывает, что именно ускоряет алгоритм. Оба метода в финале делают одно и то же - сортировку вставками с gap=1. Разница в том, что Shell sort **заранее подготавливает данные**: несколько проходов с большими gap гарантируют, что к финальному проходу никакой элемент не отстоит от своего места более чем на несколько позиций. На случайном массиве размером n=1000 insertion sort делает в среднем **~250 000 сдвигов**, Shell sort с последовательностью n/2 - около **~11 000 сдвигов**.',
        en: 'Comparing with **insertion sort** reveals what actually speeds things up. Both methods ultimately do the same thing - insertion sort with gap=1. The difference is that Shell sort **prepares the data upfront**: several large-gap passes guarantee that by the final pass no element is more than a few positions from its target. On a random array of n=1000, insertion sort performs on average **~250,000 shifts**; Shell sort with the n/2 sequence performs around **~11,000 shifts**.',
      },
      {
        ru: 'Сравнение с **merge sort** показывает главный компромисс. Merge sort гарантирует **O(n log n)** в любом случае и устойчива - но требует **O(n) дополнительной памяти** и рекурсии глубиной O(log n). Сортировка Шелла работает **на месте** без рекурсии: весь код умещается в два вложенных цикла и не выделяет ни одного байта сверх O(1). На массивах от 20 до ~500 элементов Shell sort в практических тестах нередко **обгоняет merge sort** за счёт отсутствия оверхеда на аллокацию и рекурсивные вызовы.',
        en: 'Comparing with **merge sort** shows the core trade-off. Merge sort guarantees **O(n log n)** in every case and is stable - but needs **O(n) extra memory** and recursion of depth O(log n). Shell sort works **in place** without recursion: the entire code fits in two nested loops and allocates zero bytes beyond O(1). On arrays of 20 to ~500 elements, Shell sort in practical benchmarks often **outperforms merge sort** by avoiding allocation and recursive call overhead.',
      },
    ],
    whenToUse: [
      {
        ru: 'Главная ниша сортировки Шелла - **ограниченная среда**: встроенные системы и ядра ОС, где запрещено динамическое выделение памяти или глубокая рекурсия. Merge sort требует O(n) дополнительной памяти - недопустимо при стеке в **2-4 KB** на микроконтроллере. Quicksort при глубокой рекурсии может переполнить стек на вырожденных входных данных. Shell sort решает обе проблемы: **O(1) памяти и ноль рекурсии** - конкретный промышленный пример такого выбора смотри в разделе «Примеры в коде».',
        en: 'The main niche of Shell sort is **constrained environments**: embedded systems and OS kernels where dynamic memory allocation or deep recursion are forbidden. Merge sort needs O(n) extra memory - unacceptable with a **2-4 KB** stack on a microcontroller. Quicksort with deep recursion can overflow the stack on degenerate input. Shell sort solves both: **O(1) memory and zero recursion** - see the "In code" section for a concrete industrial example of this choice.',
      },
      {
        ru: '**Средние массивы** (от ~20 до ~500 элементов) - ещё одна подходящая ниша. На этом диапазоне сортировка Шелла стабильно опережает bubble sort и insertion sort, при этом не несёт оверхеда рекурсии и аллокации merge sort. Quicksort асимптотически быстрее, но его худший случай O(n²) возникает на уже отсортированных данных при наивном выборе pivot. Shell sort лишён этого риска - у неё **нет вырожденного входа** в смысле катастрофического замедления.',
        en: '**Medium-sized arrays** (roughly 20 to 500 elements) are another fitting niche. In this range Shell sort consistently beats bubble sort and insertion sort while carrying none of the recursion and allocation overhead of merge sort. Quicksort is asymptotically faster, but its O(n²) worst case appears on already-sorted data with a naive pivot. Shell sort avoids this risk - it has **no degenerate input** in the sense of catastrophic slowdown.',
      },
      {
        ru: 'Shell sort подходит, когда **устойчивость не нужна**. Если порядок равных элементов после сортировки не важен - алгоритм полностью справляется. Как только появляется требование «сохранить исходный порядок среди равных» (например, сортировка таблицы по нескольким полям) - нужен **Timsort, merge sort или insertion sort**, все из которых устойчивы. Смена алгоритма в этом случае обязательна, не опциональна.',
        en: 'Shell sort is appropriate when **stability is not required**. If the order of equal elements after sorting does not matter, the algorithm is fully capable. The moment a requirement appears to "preserve original order among equals" (for example, sorting a table by multiple columns) - the answer is **Timsort, merge sort, or insertion sort**, all of which are stable. Switching algorithms in that case is mandatory, not optional.',
      },
      {
        ru: '**Три оси выбора** помогают принять решение: память, рекурсия, скорость. По **памяти** Shell sort выигрывает у merge sort (O(1) против O(n)). По **рекурсии** выигрывает у quicksort и merge sort - итеративный по построению. По **скорости** уступает обоим на больших массивах (n > 500), где O(n log n) начинает решать. Выбирать Shell sort, когда **первые два критерия важнее третьего** - это именно среда выполнения задаёт приоритеты.',
        en: '**Three decision axes** clarify the choice: memory, recursion, speed. On **memory** Shell sort beats merge sort (O(1) vs O(n)). On **recursion** it beats quicksort and merge sort - iterative by construction. On **speed** it loses to both on large arrays (n > 500), where O(n log n) starts to dominate. Choose Shell sort when **the first two criteria outweigh the third** - the execution environment sets those priorities.',
      },
      {
        ru: '**Никогда для больших данных** (n > 1000). При таких размерах разрыв между ~O(n^1.3) и O(n log n) становится ощутимым: на n=10 000 merge sort делает ~130 000 операций, Shell sort с простой последовательностью - порядка **~500 000**. Кэш-промахи от прыжков через gap ещё ухудшают картину на современных CPU. Для больших массивов - quicksort, merge sort или Timsort без исключений.',
        en: '**Never for large data** (n > 1000). At that scale the gap between ~O(n^1.3) and O(n log n) becomes measurable: at n=10,000 merge sort performs ~130,000 operations, Shell sort with the simple sequence around **~500,000**. Cache misses from gap jumps make things worse on modern CPUs. For large arrays - quicksort, merge sort, or Timsort, without exception.',
      },
      {
        ru: '**Как строительный блок**: идея убывающих расстояний между сравниваемыми элементами влияет на другие алгоритмы. **Comb sort** применяет ту же убывающую последовательность gap к пузырьковой сортировке вместо вставками, добиваясь схожего ускорения. Сам принцип «сначала устранить дальние несоответствия, потом точно настроить соседей» встречается в **библиотечной сортировке** и некоторых вариантах сортировки вставками с бинарным поиском позиции.',
        en: '**As a building block**: the idea of a shrinking gap between compared elements influences other algorithms. **Comb sort** applies the same decreasing gap sequence to bubble sort instead of insertion sort, achieving a similar speedup. The principle "first eliminate distant misorderings, then fine-tune neighbors" appears in **library sort** and some variants of insertion sort with binary position search.',
      },
    ],
    realWorld: [
      {
        ru: '**uClibc** - наиболее известный пример промышленного применения. Это стандартная C-библиотека для встраиваемых Linux-систем (роутеры, NAS-устройства, промышленные контроллеры). Её `qsort()` реализован через Shell sort, а не quicksort: причина - **отсутствие рекурсии и гарантированный O(1) стек**. В прошивке роутера или промышленного ПЛК переполнение стека во время сортировки неприемлемо, а Shell sort это исключает по конструкции.',
        en: '**uClibc** is the most well-known industrial use case. It is the standard C library for embedded Linux systems (routers, NAS devices, industrial controllers). Its `qsort()` is implemented via Shell sort, not quicksort: the reason is **no recursion and a guaranteed O(1) stack**. In a router or industrial PLC firmware, a stack overflow during sorting is unacceptable, and Shell sort rules it out by construction.',
      },
      {
        ru: '**Linux kernel** использовал Shell sort в ряде внутренних компонентов. В частности, ранние версии `lib/sort.c` содержали реализацию Shell sort для сортировки небольших внутренних структур ядра. Позднее его заменили на **Heapsort** (`lib/sort.c`, начиная с версий 2.6.x) - тот же O(1) памяти и отсутствие рекурсии, но гарантированный O(n log n) вместо ~O(n^1.3). Переход отражает стандартную эволюцию: Shell sort как промежуточный шаг перед более строгой гарантией.',
        en: '**Linux kernel** used Shell sort in several internal components. Early versions of `lib/sort.c` contained a Shell sort implementation for sorting small internal kernel structures. It was later replaced with **Heapsort** (`lib/sort.c`, from the 2.6.x era) - same O(1) memory and no recursion, but a guaranteed O(n log n) instead of ~O(n^1.3). The transition reflects the standard evolution: Shell sort as an intermediate step before stricter guarantees.',
      },
      {
        ru: 'История **последовательностей gap** - отдельная исследовательская область. Дональд Шелл в 1959 году предложил простейшую n/2. Дональд Кнут в 1973 году показал, что последовательность **1, 4, 13, 40, 121, ...** (h = 3h+1) даёт O(n^1.5). Роберт Седжвик в 1986 году нашёл последовательность, дающую **O(n^4/3)** в худшем случае. Чистая задача "найти оптимальную последовательность gap для Shell sort" до сих пор остаётся **математически открытой** - это редкий пример алгоритма, оптимальность которого не доказана.',
        en: 'The history of **gap sequences** is its own research field. Donald Shell proposed the simple n/2 in 1959. Donald Knuth showed in 1973 that the sequence **1, 4, 13, 40, 121, ...** (h = 3h+1) yields O(n^1.5). Robert Sedgewick found a sequence giving **O(n^4/3)** worst case in 1986. The pure problem of "find the optimal gap sequence for Shell sort" remains **mathematically open** - a rare example of an algorithm whose optimality has never been proven.',
      },
      {
        ru: '**Comb sort** (1980, Влodek Dobosiewicz) - прямой духовный потомок Shell sort. Вместо применения убывающего gap к **сортировке вставками** comb sort применяет его к **сортировке пузырьком**: сравнивает и переставляет элементы на расстоянии gap, затем уменьшает gap по фактору ~1.3. Практическая скорость сопоставима с Shell sort, реализация ещё проще - два вложенных цикла с одним условием. Оба алгоритма решают одну и ту же проблему черепах одним и тем же принципом, но от разных базовых алгоритмов.',
        en: '**Comb sort** (1980, Wlodek Dobosiewicz) is a direct spiritual descendant of Shell sort. Instead of applying a shrinking gap to **insertion sort**, comb sort applies it to **bubble sort**: comparing and swapping elements gap positions apart, then shrinking the gap by a factor of ~1.3. Practical speed is comparable to Shell sort, implementation even simpler - two nested loops with one condition. Both algorithms solve the same turtle problem with the same principle, but starting from different base algorithms.',
      },
      {
        ru: 'Где Shell sort **не** встречается? В стандартных библиотеках языков общего назначения - нигде. Python (`list.sort`) - Timsort. Java (`Arrays.sort` для объектов) - Timsort. C++ (`std::sort`) - introsort. Go (`sort.Slice`) - pdqsort. Rust (`slice::sort_unstable`) - pdqsort. Причина: все эти языки работают в средах с достаточным стеком и динамической памятью, где **O(n log n) с гарантией** важнее экономии на аллокации. Shell sort живёт там, где ресурсов мало - и именно там он незаменим.',
        en: 'Where does Shell sort **not** appear? In standard libraries of general-purpose languages - nowhere. Python (`list.sort`) - Timsort. Java (`Arrays.sort` for objects) - Timsort. C++ (`std::sort`) - introsort. Go (`sort.Slice`) - pdqsort. Rust (`slice::sort_unstable`) - pdqsort. The reason: all these languages run in environments with sufficient stack and dynamic memory, where **guaranteed O(n log n)** matters more than allocation savings. Shell sort lives where resources are scarce - and there it is irreplaceable.',
      },
    ],
  },

  whenToUse: [
    {
      ru: 'Когда нужна сортировка на месте лучше, чем O(n²), но без накладных расходов на рекурсию или дополнительную память merge sort.',
      en: 'When you need in-place sorting better than O(n²) but without merge sort\'s recursion or extra-memory overhead.',
    },
    {
      ru: 'Для встроенных систем и библиотек, где важна простота кода при разумной производительности на средних объёмах данных.',
      en: 'For embedded systems and libraries where code simplicity matters alongside reasonable performance on medium-sized data.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**uClibc** (стандартная библиотека C для встраиваемых систем) использует сортировку Шелла для `qsort()` из-за её компактного кода и хорошей производительности без рекурсии.',
      en: '**uClibc** (a C standard library for embedded systems) uses Shell sort for `qsort()` because of its compact code and good performance without recursion.',
    },
    {
      ru: '**Ранние версии Linux kernel** применяли сортировку Шелла в некоторых внутренних утилитах, где нужна была простая сортировка на месте без выделения памяти.',
      en: '**Early Linux kernel** versions used Shell sort in some internal utilities that needed a simple in-place sort without memory allocation.',
    },
  ],

  relatedAlgorithms: ['insertion-sort', 'comb-sort'],

  quiz: [
    {
      question: {
        ru: 'Что делает сортировку Шелла быстрее обычной сортировки вставками?',
        en: 'What makes Shell sort faster than plain insertion sort?',
      },
      options: [
        { ru: 'Сравнение элементов на расстоянии gap друг от друга вместо соседних', en: 'Comparing elements gap positions apart instead of adjacent ones' },
        { ru: 'Использование дополнительного массива такого же размера для слияния отсортированных половин', en: 'Using an extra array the same size as the input for merging sorted halves' },
        { ru: 'Рекурсивное разбиение массива пополам до тех пор, пока не останутся единичные элементы', en: 'Recursively splitting the array in half until only single elements remain' },
        { ru: 'Подсчёт количества вхождений каждого отдельного значения во всём массиве', en: 'Counting the number of occurrences of each individual value across the whole array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сравнения «через gap» позволяют далёким друг от друга элементам быстро переместиться на большое расстояние за один шаг, а не через множество мелких сдвигов.',
        en: 'Gapped comparisons let far-apart elements move a long distance in one step instead of many small shifts.',
      },
      hint: {
        ru: 'Главная слабость сортировки вставками - маленький элемент ползёт к началу массива по одной позиции. Ответ разобран в разделе «Решение».',
        en: 'Insertion sort\'s main weakness is a small element crawling toward the start one position at a time. See the "Solution" section for the answer.',
      },
    },
    {
      question: {
        ru: 'Что происходит, когда gap становится равным 1?',
        en: 'What happens when the gap becomes 1?',
      },
      options: [
        { ru: 'Выполняется обычная сортировка вставками по почти упорядоченному массиву', en: 'A plain insertion sort runs over an already nearly sorted array' },
        { ru: 'Алгоритм полностью завершается, вообще пропуская последний финальный проход', en: 'The algorithm finishes entirely, completely skipping the very last final pass' },
        { ru: 'Оставшийся массив досортировывается путём слияния двух его отсортированных половин', en: 'The remaining array gets sorted by merging its two already-sorted halves together' },
        { ru: 'Начинается отдельный подсчёт частот встречаемости каждого элемента массива', en: 'A separate count of each array element\'s frequency of occurrence begins' },
      ],
      correct: 0,
      explanation: {
        ru: 'При gap = 1 алгоритм превращается в обычную сортировку вставками, но благодаря предыдущим проходам данные уже почти упорядочены, поэтому сдвигов немного.',
        en: 'At gap = 1 the algorithm is plain insertion sort, but thanks to earlier passes the data is already nearly sorted, so few shifts remain.',
      },
      hint: {
        ru: 'Gap = 1 означает сравнение соседних элементов. Это прямо описано в разделе «Решение».',
        en: 'Gap = 1 means comparing adjacent elements. Stated directly in the "Solution" section.',
      },
    },
    {
      question: {
        ru: 'Является ли сортировка Шелла устойчивой (stable)?',
        en: 'Is Shell sort stable?',
      },
      options: [
        { ru: 'Нет - сравнения через gap могут поменять порядок равных элементов', en: 'No - gapped comparisons can change the order of equal elements' },
        { ru: 'Да - она устойчива точно так же, как и обычная сортировка вставками', en: 'Yes - it\'s stable in exactly the same way plain insertion sort is' },
        { ru: 'Зависит от конкретного размера сортируемого входного массива', en: 'It depends on the specific size of the input array being sorted' },
        { ru: 'Устойчивость к сортировкам на месте неприменима', en: 'Stability doesn\'t apply to in-place sorts' },
      ],
      correct: 0,
      explanation: {
        ru: 'Элемент может «перепрыгнуть» через равный себе элемент, стоящий между позициями i и i-gap, поэтому относительный порядок равных элементов не гарантирован.',
        en: 'An element can jump over an equal element sitting between positions i and i-gap, so equal elements\' relative order isn\'t guaranteed.',
      },
      hint: {
        ru: 'Когда элемент перепрыгивает через несколько позиций сразу, что может случиться с равными ему элементами между старым и новым местом? Ответ - в разделе «Плюсы и минусы».',
        en: 'When an element jumps over several positions at once, what can happen to equal elements between the old and new position? See the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует сортировка Шелла?',
        en: 'How much extra memory does Shell sort need?',
      },
      options: [
        { ru: 'O(1) - сортировка происходит на месте', en: 'O(1) - it sorts in place' },
        { ru: 'O(n) - как merge sort', en: 'O(n) - like merge sort' },
        { ru: 'O(log n) - на стек рекурсии', en: 'O(log n) - for the recursion stack' },
        { ru: 'O(n log n) - на хранение всех gap-последовательностей', en: 'O(n log n) - to store all gap sequences' },
      ],
      correct: 0,
      explanation: {
        ru: 'Как и обычная сортировка вставками, алгоритм переставляет элементы прямо в исходном массиве.',
        en: 'Like plain insertion sort, the algorithm rearranges elements directly in the original array.',
      },
      hint: {
        ru: 'Создаёт ли алгоритм дополнительные массивы или использует рекурсию - или он работает непосредственно в исходном массиве? Ответ в разделе «Плюсы и минусы».',
        en: 'Does the algorithm create extra arrays or use recursion - or does it work directly in the original array? See the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Почему точный анализ временной сложности сортировки Шелла сложен?',
        en: 'Why is the exact time complexity analysis of Shell sort difficult?',
      },
      options: [
        { ru: 'Сильно зависит от выбранной последовательности gap', en: 'It depends heavily on the chosen gap sequence' },
        { ru: 'Алгоритм использует случайный выбор опорного элемента', en: 'The algorithm uses a random pivot choice' },
        { ru: 'Сложность меняется в зависимости от языка реализации', en: 'Complexity changes depending on the implementation language' },
        { ru: 'Она никогда не была измерена эмпирически', en: 'It has never been measured empirically' },
      ],
      correct: 0,
      explanation: {
        ru: 'Разные последовательности gap (Шелла, Кнута, Седжвика и другие) дают разные гарантии сложности - от O(n²) до O(n^1.3) и лучше, поэтому единой формулы для «сортировки Шелла вообще» не существует.',
        en: 'Different gap sequences (Shell\'s, Knuth\'s, Sedgewick\'s, and others) give different complexity guarantees - from O(n²) to O(n^1.3) and better - so there is no single formula for "Shell sort in general."',
      },
      hint: {
        ru: 'Какой единственный параметр алгоритма кардинально меняет его производительность и не зафиксирован стандартом? Ответ - в разделе «Плюсы и минусы».',
        en: 'Which single parameter of the algorithm drastically changes its performance and is not fixed by any standard? See the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если остановить алгоритм раньше, не дав gap дойти до 1?',
        en: 'What happens if the algorithm stops before the gap reaches 1?',
      },
      options: [
        { ru: 'Массив останется не до конца отсортированным - соседи ещё не сравнивались', en: 'The array stays not fully sorted - adjacent elements go uncompared' },
        { ru: 'Массив всё равно окажется полностью отсортирован благодаря прошлым проходам', en: 'The array ends up fully sorted anyway thanks to the earlier passes' },
        { ru: 'Алгоритм зациклится, потому что gap не может остановиться на значении больше 1', en: 'The algorithm loops forever because gap cannot stop at a value above 1' },
        { ru: 'Результат совпадёт с обычной сортировкой вставками по исходному массиву', en: 'The result matches plain insertion sort run on the original array' },
      ],
      correct: 0,
      explanation: {
        ru: 'Проходы с gap > 1 упорядочивают только элементы внутри своих подпоследовательностей, а не массив целиком. Финальный проход с gap = 1 - единственный, что сравнивает по-настоящему соседние элементы и гарантирует полный порядок.',
        en: 'Passes with gap > 1 only order elements within their own subsequences, not the whole array. The final gap = 1 pass is the only one that compares truly adjacent elements and guarantees full order.',
      },
      hint: {
        ru: 'Сравнивает ли проход с gap > 1 действительно соседние элементы массива? Смотри разделы «Визуализация» и «Решение».',
        en: 'Does a pass with gap > 1 actually compare neighboring array elements? See the "Visualization" and "Solution" sections.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка Шелла предпочтительна перед merge sort во встроенных системах?',
        en: 'Why is Shell sort preferred over merge sort in embedded systems?',
      },
      options: [
        { ru: 'Сортирует на месте без рекурсии, не требуя дополнительной памяти', en: 'It sorts in place without recursion, needing no extra memory' },
        { ru: 'Она всегда быстрее merge sort на любых входных данных любого размера', en: 'It is always faster than merge sort on any input data of any size' },
        { ru: 'Она устойчива, что важно при сортировке структур с несколькими полями', en: 'It is stable, which matters when sorting structs with multiple fields' },
        { ru: 'Она использует меньше сравнений, чем сортировка пузырьком, при любом gap', en: 'It uses fewer comparisons than bubble sort for any gap value at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Во встроенных системах часто критичен жёсткий лимит стека и отсутствие динамического выделения памяти. Сортировка Шелла удовлетворяет обоим требованиям: нет рекурсии, нет дополнительных массивов.',
        en: 'Embedded systems often have strict stack limits and no dynamic memory allocation. Shell sort satisfies both constraints: no recursion, no extra arrays.',
      },
      hint: {
        ru: 'Каковы два главных ресурсных ограничения встроенных систем, и как сортировка Шелла их соблюдает? Смотри разделы «Когда применять» и «Примеры из практики».',
        en: 'What are the two main resource constraints of embedded systems, and how does Shell sort respect both? See the "When to use" and "Real-world examples" sections.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка Шелла всё равно уступает merge sort и quicksort на больших массивах?',
        en: 'Why does Shell sort still lose to merge sort and quicksort on large arrays?',
      },
      options: [
        { ru: 'Её средняя сложность ~O(n^1.3) хуже, чем O(n log n) у соперников', en: 'Its average ~O(n^1.3) is worse than their O(n log n)' },
        { ru: 'Она требует O(n) дополнительной памяти, в отличие от merge sort и quicksort', en: 'It needs O(n) extra memory, unlike merge sort and quicksort' },
        { ru: 'Она нестабильна, а merge sort и quicksort всегда стабильны', en: 'It is unstable, while merge sort and quicksort are always stable' },
        { ru: 'Она использует рекурсию глубже, чем merge sort и quicksort', en: 'It uses deeper recursion than merge sort and quicksort' },
      ],
      correct: 0,
      explanation: {
        ru: 'На больших массивах разница в асимптотике решает: O(n^1.3) растёт заметно быстрее, чем O(n log n), поэтому с ростом n merge sort и quicksort в итоге обгоняют сортировку Шелла.',
        en: 'On large arrays the asymptotic gap decides: O(n^1.3) grows noticeably faster than O(n log n), so as n grows, merge sort and quicksort eventually overtake Shell sort.',
      },
      hint: {
        ru: 'Сравни средний случай сортировки Шелла с O(n log n) - что растёт быстрее при увеличении n? Ответ - в разделе «Плюсы и минусы».',
        en: 'Compare Shell sort\'s average case with O(n log n) - which grows faster as n increases? See the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Почему у сортировки Шелла лучший случай O(n log n), а не O(n), как у обычной сортировки вставками?',
        en: 'Why is Shell sort\'s best case O(n log n), not O(n) like plain insertion sort?',
      },
      options: [
        { ru: 'Последовательность n/2, n/4, ..., 1 даёт O(log n) проходов, каждый стоит O(n)', en: 'The n/2, n/4, ..., 1 sequence gives O(log n) passes, each costing O(n)' },
        { ru: 'Проверка условия gap > 0 в цикле сама по себе занимает O(log n) операций', en: 'Checking the gap > 0 loop condition by itself costs O(log n) operations' },
        { ru: 'На отсортированном массиве сортировка Шелла всё равно выполняет полные перестановки', en: 'On a sorted array Shell sort still performs full element swaps' },
        { ru: 'Каждый проход с новым gap требует пересчёта длины массива заново', en: 'Every pass with a new gap recomputes the array length from scratch' },
      ],
      correct: 0,
      explanation: {
        ru: 'Gap проходит через ~log n значений (n/2, n/4, ..., 1), и на каждом из них алгоритм хотя бы раз обходит массив (O(n)), даже если ни одного сдвига не требуется. Отсюда O(n log n), а не O(n) - в отличие от вставками, здесь несколько проходов обязательны по построению.',
        en: 'The gap passes through ~log n values (n/2, n/4, ..., 1), and at each one the algorithm scans the array at least once (O(n)), even when no shifts are needed. That gives O(n log n), not O(n) - unlike insertion sort, multiple passes are mandatory by construction.',
      },
      hint: {
        ru: 'Сколько значений принимает gap, пока не дойдёт до 1 (см. раздел «Решение»), и сколько стоит один проход по массиву?',
        en: 'How many values does gap pass through before reaching 1 (see the "Solution" section), and what does one pass over the array cost?',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если использовать последовательность gap с чётными числами (например, 4, 2)?',
        en: 'What happens if you use a gap sequence of only even numbers (for example, 4, 2)?',
      },
      options: [
        { ru: 'Нечётные позиции никогда не сравниваются с чётными до финального прохода gap = 1', en: 'Odd-indexed elements never compare against even-indexed ones until the final gap=1 pass' },
        { ru: 'Алгоритм завершится быстрее, поскольку чётные числа делятся пополам за меньшее число шагов', en: 'The algorithm finishes faster because even numbers halve in fewer steps than odd ones' },
        { ru: 'Результат будет неверным, так как не все элементы попадут в одну группу сравнений', en: 'The result will be incorrect because not all elements end up in the same comparison group' },
        { ru: 'Алгоритм вообще не сможет запуститься, так как gap должен быть нечётным по определению', en: 'The algorithm cannot start at all because gap must be odd by definition' },
      ],
      correct: 0,
      explanation: {
        ru: 'С чётными gap элементы на чётных позициях сравниваются только между собой, а элементы на нечётных - только между собой, до тех пор пока gap не станет 1. Это не ошибка - массив будет отсортирован - но может быть неэффективно.',
        en: 'With even gaps, even-indexed elements only compare among themselves and odd-indexed elements only among themselves, until gap reaches 1. This isn\'t incorrect - the array will be sorted - but can be inefficient.',
      },
      hint: {
        ru: 'При чётном gap элементы с чётными и нечётными индексами смешиваются? Проверь: если gap = 2, то элемент на позиции 1 сравнивается с позицией -1 или позицией 3? Механика gap описана в разделе «Решение».',
        en: 'With an even gap, do elements at even and odd indices ever mix? Check: if gap = 2, does the element at index 1 compare with index -1 or index 3? The gap mechanic is described in the "Solution" section.',
      },
    },
  ],
};

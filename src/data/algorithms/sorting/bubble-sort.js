export const bubbleSort = {
  slug: 'bubble-sort',
  category: 'sorting',
  name: { ru: 'Bubble Sort', en: 'Bubble Sort' },
  complexity: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'stable'],

  intent: {
    ru: 'Пузырьковая сортировка многократно проходит по массиву, меняя местами соседние элементы, пока весь массив не окажется упорядочен.',
    en: 'Bubble sort repeatedly walks the array, swapping adjacent elements that are out of order, until the whole array is sorted.',
  },

  problem: {
    ru: 'Дан массив чисел в произвольном порядке, например `[5, 2, 8, 1]`. Нужно упорядочить его по возрастанию. Простейшая идея: брать пары **соседних элементов** и менять их местами, если левый больше правого. Вопрос в том, как повторять это действие так, чтобы за **конечное число проходов** массив гарантированно стал отсортированным.',
    en: 'Given an array of numbers in arbitrary order - say `[5, 2, 8, 1]` - you need it sorted ascending. The simplest **mental model**: compare **neighboring pairs** and swap them when the left one is bigger. The question is how to repeat that action so the array is guaranteed sorted after a **finite number of passes**.',
  },

  solution: {
    ru: 'На каждом **проходе** алгоритм сравнивает пары соседних элементов слева направо и меняет их местами, если они стоят в неправильном порядке. После первого прохода самый большой элемент гарантированно **«всплывает»** в конец массива - отсюда и **название алгоритма**. Проходы повторяются, каждый раз исключая один элемент справа, пока за целый проход не произойдёт ни одной **перестановки** - это сигнал, что массив уже отсортирован.',
    en: 'On each **pass**, the algorithm compares neighboring pairs left to right and swaps them when they are in the wrong order. After the first pass, the largest element is guaranteed to have **"bubbled"** to the end - hence the **algorithm\'s name**. Passes repeat, each one shrinking by one element from the right, until a full pass makes zero **swaps** - the signal that the array is already sorted.',
  },

  steps: [
    {
      title: { ru: 'Сравнить соседей', en: 'Compare neighbors' },
      explanation: {
        ru: 'Взять текущий элемент и следующий за ним, сравнить их значения.',
        en: 'Take the current element and the one right after it, compare their values.',
      },
    },
    {
      title: { ru: 'Поменять местами при необходимости', en: 'Swap if needed' },
      explanation: {
        ru: 'Если левый элемент больше правого - поменять их местами.',
        en: 'If the left element is greater than the right one, swap them.',
      },
    },
    {
      title: { ru: 'Дойти до конца прохода', en: 'Reach the end of the pass' },
      explanation: {
        ru: 'Повторять сравнение для каждой следующей пары до конца неотсортированной части массива.',
        en: 'Repeat the comparison for every next pair until the end of the unsorted part of the array.',
      },
    },
    {
      title: { ru: 'Сократить границу', en: 'Shrink the boundary' },
      explanation: {
        ru: 'Самый большой элемент прохода теперь на своём месте - исключить его из следующих проходов.',
        en: 'The largest element of the pass is now in its final place - exclude it from the next passes.',
      },
    },
    {
      title: { ru: 'Остановиться без перестановок', en: 'Stop with no swaps' },
      explanation: {
        ru: 'Если целый проход не дал ни одной перестановки, массив отсортирован - можно закончить раньше времени.',
        en: 'If a full pass makes zero swaps, the array is sorted - the algorithm can exit early.',
      },
    },
  ],
  stepBreakpoints: [2, 16, 31, 47],

  implementation: {
    javascript: `function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return a;
}`,
    python: `def bubble_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Копируем массив', en: 'Copy the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт независимую копию через spread-оператор. Алгоритм работает с копией, не меняя оригинал `arr` - это делает функцию чистой (pure), без побочных эффектов.',
          en: '`const a = [...arr]` makes an independent copy via the spread operator. The algorithm works on the copy, leaving the original `arr` untouched - this makes the function pure with no side effects.',
        },
      },
      {
        lines: [3, 3],
        title: { ru: 'Внешний цикл: счётчик проходов', en: 'Outer loop: pass counter' },
        explanation: {
          ru: '`i` - номер прохода. После прохода `i` последние `i+1` элементов гарантированно стоят на финальных позициях, поэтому цикл идёт до `a.length - 1` - последний оставшийся элемент уже обязан быть на месте.',
          en: '`i` is the pass number. After pass `i`, the last `i+1` elements are guaranteed to be in their final positions, so the loop runs to `a.length - 1` - the single remaining element must already be in place.',
        },
      },
      {
        lines: [4, 4],
        title: { ru: 'Флаг `swapped`: ключ к O(n)', en: 'Flag `swapped`: key to O(n)' },
        explanation: {
          ru: 'Сбрасывается в `false` перед каждым проходом. Если после прохода флаг всё ещё `false` - ни одной перестановки не было, массив уже отсортирован, и строка 11 завершит работу досрочно.',
          en: 'Reset to `false` before each pass. If after the pass the flag is still `false` - no swap happened, the array is already sorted, and line 11 will exit early.',
        },
      },
      {
        lines: [5, 5],
        title: { ru: 'Внутренний цикл: сужающаяся граница', en: 'Inner loop: shrinking boundary' },
        explanation: {
          ru: 'Граница `a.length - 1 - i` сдвигается влево с каждым проходом. Элементы правее уже зафиксированы - их незачем сравнивать снова. Так каждый проход работает с меньшим числом элементов.',
          en: 'The boundary `a.length - 1 - i` shifts left each pass. Elements beyond it are already locked - no need to compare them again. This makes each pass work on a smaller range.',
        },
      },
      {
        lines: [6, 9],
        title: { ru: 'Сравнение и обмен пары', en: 'Compare and swap the pair' },
        explanation: {
          ru: 'Если `a[j] > a[j+1]` - меняем местами через деструктуризацию `[a[j], a[j+1]] = [a[j+1], a[j]]`. Строгое `>` гарантирует устойчивость: равные соседи не переставляются, их исходный порядок сохраняется.',
          en: 'If `a[j] > a[j+1]`, swap via destructuring `[a[j], a[j+1]] = [a[j+1], a[j]]`. The strict `>` guarantees stability: equal neighbors are never swapped, so their original relative order is preserved.',
        },
      },
      {
        lines: [11, 11],
        title: { ru: 'Ранний выход: O(n) в лучшем случае', en: 'Early exit: O(n) best case' },
        explanation: {
          ru: 'Если за весь проход `swapped` не стал `true` - ни одного обмена не было. Это означает, что все соседние пары уже стоят правильно. Алгоритм завершается, не тратя время на оставшиеся проходы.',
          en: 'If `swapped` never became `true` during the entire pass - no swaps occurred. That means every neighboring pair is already in order. The algorithm exits without spending time on the remaining passes.',
        },
      },
      {
        lines: [13, 13],
        title: { ru: 'Возврат отсортированной копии', en: 'Return the sorted copy' },
        explanation: {
          ru: 'Возвращается `a` - отсортированная копия. Исходный массив `arr` не тронут. Вызывающий код получает новый массив, а оригинал остаётся неизменным.',
          en: 'Returns `a` - the sorted copy. The original `arr` was never modified. The caller receives a new array; the original remains unchanged.',
        },
      },
    ],
    python: [
      {
        lines: [1, 3],
        title: { ru: 'Подготовка: копия и длина', en: 'Setup: copy and length' },
        explanation: {
          ru: '`a = arr.copy()` создаёт независимую копию списка - без этого функция меняла бы оригинал. `n = len(a)` вычисляется один раз и используется в обоих циклах, что немного эффективнее повторных вызовов `len()`.',
          en: '`a = arr.copy()` creates an independent list copy - without it the function would mutate the original. `n = len(a)` is computed once and reused in both loops, which is slightly more efficient than repeated `len()` calls.',
        },
      },
      {
        lines: [4, 4],
        title: { ru: 'Внешний цикл: n-1 проходов максимум', en: 'Outer loop: at most n-1 passes' },
        explanation: {
          ru: '`range(n - 1)` генерирует 0, 1, ..., n-2. `i` - номер прохода: после прохода `i` последние `i+1` элементов на своих местах. Цикл никогда не нужен более n-1 раз: после n-1 проходов единственный оставшийся элемент уже на месте.',
          en: '`range(n - 1)` generates 0, 1, ..., n-2. `i` is the pass number: after pass `i`, the last `i+1` elements are in place. The loop never needs more than n-1 iterations: after n-1 passes the single remaining element must already be correct.',
        },
      },
      {
        lines: [5, 5],
        title: { ru: 'Флаг `swapped`: основа ранней остановки', en: 'Flag `swapped`: basis of early exit' },
        explanation: {
          ru: 'Сбрасывается в `False` в начале каждого прохода. Если после прохода всё ещё `False` - не было ни одного обмена, массив отсортирован, и строки 10-11 прервут работу досрочно.',
          en: 'Reset to `False` at the start of every pass. If it is still `False` after the pass - no swaps happened, the array is sorted, and lines 10-11 will break out early.',
        },
      },
      {
        lines: [6, 9],
        title: { ru: 'Внутренний цикл: сравнение и обмен', en: 'Inner loop: compare and swap' },
        explanation: {
          ru: '`range(n - 1 - i)` сужает границу с каждым проходом. `a[j] > a[j + 1]` - строгое неравенство: равные соседи не меняются местами, что обеспечивает устойчивость. Обмен через `a[j], a[j+1] = a[j+1], a[j]` - питонический способ без временной переменной.',
          en: '`range(n - 1 - i)` narrows the boundary each pass. `a[j] > a[j + 1]` is a strict inequality: equal neighbors are never swapped, which guarantees stability. The swap `a[j], a[j+1] = a[j+1], a[j]` is Pythonic - no temporary variable needed.',
        },
      },
      {
        lines: [10, 11],
        title: { ru: 'Ранний выход: O(n) на отсортированных данных', en: 'Early exit: O(n) on sorted data' },
        explanation: {
          ru: 'Если `swapped` осталось `False` после прохода - массив отсортирован. `break` прерывает внешний цикл досрочно. Именно это превращает лучший случай (уже отсортированный массив) из O(n²) в O(n): нужен ровно один проход.',
          en: 'If `swapped` stayed `False` after a pass - the array is sorted. `break` exits the outer loop early. This is what turns the best case (already sorted input) from O(n²) into O(n): exactly one pass is enough.',
        },
      },
      {
        lines: [12, 12],
        title: { ru: 'Возврат отсортированной копии', en: 'Return the sorted copy' },
        explanation: {
          ru: 'Возвращается `a` - отсортированная копия. Оригинальный список `arr` не изменён. Вызывающий код получает новый список, а исходные данные остаются нетронутыми.',
          en: 'Returns `a` - the sorted copy. The original list `arr` was never modified. The caller gets a new list; the original data remains untouched.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Один из самых простых алгоритмов сортировки для понимания и реализации с нуля.',
      en: 'One of the simplest sorting algorithms to understand and implement from scratch.',
    },
    {
      ru: 'Сортирует на месте - требует лишь O(1) дополнительной памяти.',
      en: 'Sorts in place - needs only O(1) extra memory.',
    },
    {
      ru: 'Устойчив: равные элементы сохраняют исходный относительный порядок.',
      en: 'Stable: equal elements keep their original relative order.',
    },
    {
      ru: 'С флагом ранней остановки на почти отсортированных данных выполняется за O(n).',
      en: 'With the early-exit flag, it runs in O(n) on nearly sorted data.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений и перестановок в среднем и худшем случае делает его непригодным для больших массивов.',
      en: 'O(n²) comparisons and swaps on average and worst case make it impractical for large arrays.',
    },
    {
      ru: 'Большинство промышленных алгоритмов (merge sort, quicksort, Timsort) обгоняют его на любом размере данных, кроме совсем малых.',
      en: 'Most production algorithms (merge sort, quicksort, Timsort) outperform it at any size beyond tiny inputs.',
    },
    {
      ru: 'Много операций записи в массив - на больших данных это дороже, чем алгоритмы с меньшим числом перестановок (например, сортировка выбором).',
      en: 'It performs many array writes - costlier on large data than algorithms with fewer swaps (e.g. selection sort).',
    },
  ],

  whenToUse: [
    {
      ru: '**Учебный пример** - для объяснения самой идеи **сортировки сравнением** до перехода к более сложным алгоритмам.',
      en: '**Teaching example** - for explaining the very idea of **comparison sorting** before moving to more complex algorithms.',
    },
    {
      ru: '**Маленькие и почти отсортированные массивы** - при n < 10-15, где простота кода важнее асимптотики.',
      en: '**Small or nearly sorted arrays** - at n < 10-15, where code simplicity matters more than asymptotics.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Учебные курсы по алгоритмам** - почти всегда первый алгоритм сортировки, который объясняют, благодаря наглядности идеи «всплытия».',
      en: '**Algorithms courses** - almost always the first sorting algorithm taught, thanks to how visual the "bubbling" idea is.',
    },
    {
      ru: '**Встроенные системы** - где O(1) дополнительной памяти важнее скорости на небольшом наборе данных.',
      en: '**Embedded systems** - where O(1) extra memory matters more than speed on a small dataset.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Представь, что у тебя в руке набор игральных карт в случайном порядке, и ты хочешь разложить их по возрастанию. Самый интуитивный способ - брать пару **соседних карт** и, если левая больше правой, **менять их местами**. Именно это и делает пузырьковая сортировка: она идёт по массиву слева направо, сравнивая каждую пару соседних элементов и переставляя их, если они стоят не в том порядке.',
        en: 'Picture holding a hand of playing cards in random order and wanting to arrange them ascending. The most intuitive approach: take each pair of **neighboring cards** and **swap them** if the left one is bigger than the right. That is exactly what bubble sort does: it walks the array left to right, comparing each neighboring pair and swapping them when they are out of order.',
      },
      {
        ru: 'После **первого полного прохода** происходит кое-что гарантированное: самый большой элемент оказывается в конце массива. Почему? При каждом сравнении большее значение «толкается» вправо. Как только самый большой элемент встречает левого соседа, он всегда оказывается больше - и продолжает двигаться вправо до самого конца. Этот эффект дал алгоритму **название**: большие элементы **«всплывают»** вверх, как пузырьки в воде.',
        en: 'After the **first full pass**, something is guaranteed: the largest element ends up at the end of the array. Why? At every comparison the larger value gets pushed rightward. The moment the largest element meets its left neighbor, it is always the bigger one - and it keeps moving right all the way to the end. This effect gave the algorithm its **name**: large elements **"bubble up"** to the top like bubbles in water.',
      },
      {
        ru: 'Второй проход начинается с тем же правилом, но правая граница сдвигается: последний элемент уже на месте. После k-го прохода k наибольших элементов стоят на своих окончательных позициях. Это и есть **инвариант цикла**: слева от границы ещё нужно работать, справа - уже всё правильно. Поэтому в худшем случае нужно **n-1 проходов**: после каждого граница сдвигается влево на одну позицию.',
        en: 'The second pass starts the same way, but the right boundary shifts: the last element is already in place. After the k-th pass, the k largest elements occupy their final positions. This is the **loop invariant**: to the right of the boundary everything is correct; to the left, work remains. That is why the worst case needs **n-1 passes**: after each one the boundary moves one position left.',
      },
      {
        ru: 'Но что если массив уже почти отсортирован? Здесь вступает в игру **флаг** `swapped`. Перед каждым проходом он сбрасывается в `false`. Если произошла хотя бы одна перестановка, флаг становится `true`. Если после прохода он остался `false` - все соседние пары уже стоят правильно, массив отсортирован, и алгоритм **завершается досрочно**. Именно поэтому лучший случай достигает **O(n)**: нужен ровно один проход без единой перестановки.',
        en: 'But what if the array is nearly sorted? This is where the **swapped** flag comes in. At the start of each pass it is reset to `false`. If at least one swap occurs, the flag is set to `true`. If after the pass it is still `false` - every pair is already in order, the array is sorted, and the algorithm **exits early**. This is exactly why the best case reaches **O(n)**: exactly one pass with zero swaps is enough.',
      },
      {
        ru: 'Теперь о худшем случае **O(n²)**. Он возникает, когда массив отсортирован в обратном порядке. Рассмотрим `[4, 3, 2, 1]`. Элемент 1 стоит в конце, а должен быть в начале. За один проход он сдвигается максимум на одну позицию влево - пузырьковая сортировка перемещает элементы влево только на один шаг за проход. Такой медленный элемент в правой части называют **«черепахой»** (turtle). Черепаха вынуждает алгоритм делать n-1 проходов даже тогда, когда 99% массива уже отсортировано.',
        en: 'Now for the **O(n²)** worst case. It arises when the array is reverse-sorted. Consider `[4, 3, 2, 1]`. Element 1 is at the end but needs to be at the start. In one pass it moves at most one position left - bubble sort shifts elements leftward by only one step per pass. Such a slow element on the right is called a **"turtle"**. A turtle forces n-1 passes even when 99% of the array is already sorted.',
      },
      {
        ru: 'Сравнение с **сортировкой вставками** важно для понимания, когда вообще использовать пузырьковую. Обе имеют O(n²) в среднем и O(n) в лучшем случае. Но insertion sort перемещает элементы к их позиции с меньшим числом операций записи - она сдвигает элементы по одному без многократных попарных обменов. На почти отсортированных данных insertion sort обычно быстрее пузырьковой, хотя асимптотики совпадают.',
        en: 'The comparison with **insertion sort** matters for understanding when to use bubble sort at all. Both have O(n²) average and O(n) best case. But insertion sort moves elements to their position with fewer write operations - it shifts elements one by one rather than making repeated pairwise swaps. On nearly sorted input, insertion sort is typically faster in practice, even though the asymptotic complexities match.',
      },
      {
        ru: 'Пузырьковая сортировка является **устойчивой** (stable): если два элемента одинаковы по значению, они сохраняют исходный относительный порядок. Устойчивость обеспечивается **строгим условием обмена**: `a[j] > a[j+1]`. При равенстве (`a[j] === a[j+1]`) обмен не происходит, левый из равных всегда остаётся левее. Это важно, например, при сортировке списка людей сначала по фамилии, а затем по имени - устойчивая сортировка сохранит порядок внутри одинаковых фамилий.',
        en: 'Bubble sort is **stable**: if two elements have equal values, they keep their original relative order. Stability comes from the **strict swap condition**: `a[j] > a[j+1]`. When they are equal (`a[j] === a[j+1]`) no swap occurs, so the left element always stays left. This matters when sorting a list of people first by last name and then by first name - a stable sort preserves order within matching last names.',
      },
    ],
    whenToUse: [
      {
        ru: '**Учебный инструмент** - пузырьковая идеальна для объяснения самой идеи **сортировки сравнением**: механика прозрачна, анимация «всплытия» интуитивно понятна, и её можно нарисовать на доске за минуту. Практически все курсы по алгоритмам начинают именно с неё - и это оправданно.',
        en: '**Teaching tool** - bubble sort is ideal for explaining the very idea of **comparison sorting**: the mechanics are transparent, the "bubbling" animation is intuitive, and you can draw it on a whiteboard in a minute. Virtually every algorithms course starts with it - and for good reason.',
      },
      {
        ru: '**Production-код** - применима только для очень маленьких массивов (**n < 10-15**) или данных, которые заведомо почти отсортированы. При n < 10 разница между O(n²) и O(n log n) практически не ощутима: константы и оверхед вызова съедают асимптотическое преимущество.',
        en: '**Production code** - only applicable for very small arrays (**n < 10-15**) or data known to be nearly sorted. When n < 10, the difference between O(n²) and O(n log n) is practically imperceptible: constant factors and function call overhead negate the asymptotic advantage.',
      },
      {
        ru: '**Когда писать что-то другое** - для массивов от 50 элементов и выше всегда quicksort или merge sort. Для встроенных систем с дорогими операциями записи (EEPROM, флеш-память) - **сортировка выбором**, потому что она гарантирует не более n перестановок против O(n²) у пузырьковой. Если нужна устойчивость и скорость одновременно - merge sort или Timsort.',
        en: '**When to switch** - for arrays of 50+ elements always quicksort or merge sort. For embedded systems where writes are expensive (EEPROM, flash) - **selection sort**, because it guarantees at most n swaps versus O(n²) for bubble sort. If you need both stability and speed - merge sort or Timsort.',
      },
      {
        ru: '**Три оси сравнения** - скорость, память, простота. По скорости: пузырьковая хуже insertion sort на практике, хуже selection sort при большом числе записей, хуже merge/quicksort асимптотически. По памяти: **O(1)** - наравне с insertion и selection sort, лучше merge sort с его O(n). По простоте кода: примерно равна insertion sort, проще merge sort.',
        en: '**Three comparison axes** - speed, memory, simplicity. Speed: bubble sort is worse than insertion sort in practice, worse than selection sort when writes are expensive, worse than merge/quicksort asymptotically. Memory: **O(1)** - on par with insertion and selection sort, better than merge sort\'s O(n). Simplicity: roughly equal to insertion sort, simpler than merge sort.',
      },
      {
        ru: 'Насколько именно ощутим этот разрыв на практике (причина разобрана в разделе «Как это работает»)? На почти отсортированных массивах insertion sort обычно в **1.5-2x быстрее** пузырьковой - каждый обмен там это 3 операции записи вместо прямого сдвига на одну позицию.',
        en: 'How big is that gap in practice (the reason is covered in "How it works")? On nearly sorted arrays insertion sort is typically **1.5-2x faster** than bubble sort - each bubble swap costs 3 write operations versus a direct one-position shift.',
      },
      {
        ru: '**Дорогие операции записи** - например, NAND флеш с ограниченным числом циклов перезаписи. В этом случае считай **число перестановок**, а не сравнений. Пузырьковая в худшем случае делает O(n²) перестановок. **Сортировка выбором** делает максимум n-1 перестановок даже в худшем случае - на флеш-памяти это принципиально.',
        en: '**Expensive write operations** - for example NAND flash with a limited write cycle count. In this case count **swap count**, not comparisons. Bubble sort makes O(n²) swaps in the worst case. **Selection sort** makes at most n-1 swaps even in the worst case - on flash memory this is decisive.',
      },
      {
        ru: '**Краткая таблица** - когда выбрать пузырьковую вместо соседей. Bubble vs Insertion: при n < 10 или для обучения; insertion лучше на почти отсортированных при n > 20. Bubble vs Selection: если нужна устойчивость и записи не дорогие; selection лучше когда записи дорогие. Bubble vs Merge: merge всегда быстрее при n > 15-20, но требует O(n) памяти. Bubble vs Quick: quick быстрее в среднем, но нестабилен и O(n²) в худшем.',
        en: '**Quick decision table** - when to pick bubble over its neighbors. Bubble vs Insertion: at n < 10 or for teaching; insertion is better on nearly sorted input at n > 20. Bubble vs Selection: when stability is needed and writes are cheap; selection is better when writes are costly. Bubble vs Merge: merge is always faster at n > 15-20 but needs O(n) memory. Bubble vs Quick: quick is faster on average but unstable and O(n²) worst case.',
      },
    ],
    realWorld: [
      {
        ru: 'На практике пузырьковая сортировка встречается редко, но её идея повлияла на более практичные варианты. Самый известный - **Cocktail Shaker Sort** (шейкерная, или двунаправленная пузырьковая). Она чередует направление прохода: сначала слева направо (выталкивая большие элементы вправо), потом справа налево (выталкивая маленькие элементы влево). Это напрямую решает проблему **«черепах»**.',
        en: 'In production code bubble sort appears rarely, but its idea influenced more practical variants. The most well-known is **Cocktail Shaker Sort** (bidirectional bubble sort). It alternates pass direction: first left to right (pushing large elements right), then right to left (pushing small elements left). This directly addresses the **"turtle" problem**.',
      },
      {
        ru: 'Как именно шейкерная ускоряет работу с черепахами? Возьмём `[2, 3, 4, 5, 1]`, где 1 - черепаха в конце. Обычная пузырьковая потратит **4 прохода**, чтобы сдвинуть 1 в начало, по одной позиции за проход. Шейкерная на обратном проходе (справа налево) сразу переместит 1 на несколько позиций. Асимптотика остаётся O(n²), но на практике шейкерная заметно быстрее на случайных данных с малыми элементами у правого края.',
        en: 'How exactly does cocktail sort speed up turtle handling? Take `[2, 3, 4, 5, 1]`, where 1 is a turtle at the end. Plain bubble sort spends **4 passes** moving 1 to the start, one position per pass. Cocktail sort on its backward pass (right to left) moves 1 several positions at once. Asymptotic complexity stays O(n²), but in practice cocktail sort runs noticeably faster on random data with small elements near the right edge.',
      },
      {
        ru: 'Исторически пузырьковая входила в стандартные реализации языков до появления **Timsort** и introsort. Java до версии 7 использовала модифицированную merge sort в `Arrays.sort()`. В Python до 2.3 `list.sort()` использовала sample sort. После 2002 года Timsort (разработанный **Тимом Петерсом**) стал де-факто стандартом в Python и Java 7+, затем V8 перешёл на него в 2019 году. Пузырьковая давно уступила место гибридам.',
        en: 'Historically, bubble sort appeared in standard library implementations before **Timsort** and introsort arrived. Java before version 7 used a modified merge sort in `Arrays.sort()`. Python before 2.3 used sample sort in `list.sort()`. After 2002, Timsort (developed by **Tim Peters**) became the de-facto standard in Python and Java 7+, then V8 adopted it in 2019. Bubble sort long ago gave way to hybrids.',
      },
      {
        ru: 'Где живёт пузырьковая идея сегодня? **Timsort** использует insertion sort для маленьких подмассивов (run-ов), а insertion sort на почти отсортированных данных работает аналогично пузырьковой. **Comb Sort** - ещё один вариант: вместо сравнения соседей (gap=1) он начинает с большого шага, постепенно уменьшая его до 1. Это устраняет черепах гораздо эффективнее - так же, как Shell Sort применил ту же идею к insertion sort.',
        en: 'Where does the bubble sort idea live today? **Timsort** uses insertion sort for small subarrays (runs), and insertion sort on nearly sorted data works similarly to bubble sort. **Comb Sort** is another variant: instead of comparing neighbors (gap=1) it starts with a large gap, shrinking it to 1. This eliminates turtles far more efficiently - just as Shell Sort applied the same idea to insertion sort.',
      },
      {
        ru: '**Встроенные системы** - одна из ниш, где пузырьковая изредка встречается: на микроконтроллерах для малых буферов сенсорных данных (5-15 значений). Например, **медианный фильтр** (STM32, Arduino): собери N последних измерений, отсортируй, возьми средний элемент. При N=7 пузырьковая с флагом занимает **~42 байта** кода против ~120 байт у quicksort на ARM Cortex-M0 - и этот размер иногда решает, влезет ли прошивка во флеш.',
        en: 'In **embedded systems** bubble sort occasionally appears on microcontrollers for small sensor data buffers (5-15 values). For example, a **median filter** (STM32, Arduino): collect the last N measurements, sort, take the middle element. At N=7 bubble sort with the flag takes **~42 bytes** of code versus ~120 bytes for quicksort on ARM Cortex-M0 - a size difference that sometimes determines whether firmware fits in flash.',
      },
      {
        ru: '**Крупные open-source проекты** сохраняют пузырьковую идею в виде наследников: **CPython** (`Objects/listobject.c`) использует Timsort, чья логика работы с run-ами наследует insertion sort; **ядро Linux** (`lib/sort.c`) - heapsort с оптимизациями; **SQLite** (`src/vdbesort.c`) - внешнюю сортировку на основе merge sort. Сама пузырьковая в продакшн-коде крупных проектов не встречается, но понимание её механики необходимо для понимания гибридов.',
        en: 'In open-source projects bubble sort ideas surface through descendants: **CPython** (`Objects/listobject.c`) uses Timsort, whose run-handling logic inherits from insertion sort; the **Linux kernel** (`lib/sort.c`) uses heapsort with optimizations; **SQLite** (`src/vdbesort.c`) uses merge-sort-based external sorting. Bubble sort itself does not appear in major project code, but understanding its mechanics is essential for understanding hybrids.',
      },
      {
        ru: 'Культурный след: пузырьковая остаётся стандартным примером в академических работах по сложности алгоритмов. В 1988 году **Кнут** в TAOCP назвал её «худшим из практических алгоритмов». В 2000-х Барак Обама, отвечая на вопрос о лучшем алгоритме сортировки, заявил: «bubble sort is the wrong answer». Этот момент точно формулирует суть: пузырьковая - **педагогический артефакт**, а не рабочий инструмент.',
        en: 'Cultural footprint: bubble sort remains a standard example in academic work on algorithm complexity. In 1988 **Knuth** in TAOCP called it "the worst of the practical algorithms." In the 2000s Barack Obama, asked about the best sorting algorithm, said: "bubble sort is the wrong answer." That moment captures the essence: bubble sort is a **pedagogical artifact**, not a working tool.',
      },
    ],
  },

  relatedAlgorithms: ['selection-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Что происходит с самым большим элементом массива после первого прохода пузырьковой сортировки?',
        en: 'What happens to the largest element in the array after the first pass of bubble sort?',
      },
      options: [
        { ru: 'Он оказывается в конце массива', en: 'It ends up at the end of the array' },
        { ru: 'Он оказывается в начале массива', en: 'It ends up at the start of the array' },
        { ru: 'Он остаётся на случайной позиции', en: 'It stays at a random position' },
        { ru: 'Массив нужно пройти дважды, чтобы это произошло', en: 'The array must be traversed twice for this to happen' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сравнивая соседей слева направо и переставляя большие элементы правее, алгоритм гарантированно «выталкивает» наибольший элемент в конец за один проход.',
        en: 'By comparing left-to-right and pushing larger elements rightward, the algorithm guarantees the largest element gets pushed to the end in a single pass.',
      },
      hint: {
        ru: 'Подумай, что происходит с элементом, когда он оказывается больше своего соседа при каждом сравнении - куда он «двигается»? Ответ разобран в разделе «Как это работает».',
        en: 'Think about what happens to an element whenever it\'s bigger than its neighbor at each comparison - which direction does it keep moving? See the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Какова временная сложность пузырьковой сортировки в худшем случае?',
        en: 'What is the worst-case time complexity of bubble sort?',
      },
      options: [
        { ru: 'O(n²)', en: 'O(n²)' },
        { ru: 'O(n log n)', en: 'O(n log n)' },
        { ru: 'O(n)', en: 'O(n)' },
        { ru: 'O(1)', en: 'O(1)' },
      ],
      correct: 0,
      explanation: {
        ru: 'В худшем случае (массив отсортирован в обратном порядке) требуется полное количество проходов и сравнений - квадратичное от размера массива.',
        en: 'In the worst case (reverse-sorted array), the algorithm needs the full number of passes and comparisons - quadratic in the array size.',
      },
      hint: {
        ru: 'Посчитай, сколько сравнений потребуется, если после каждого прохода массив остаётся в обратном порядке. Подробный разбор - в разделе «Как это работает».',
        en: 'Count how many comparisons are needed if the array stays reverse-ordered after every pass. See the "How it works" section for the full breakdown.',
      },
    },
    {
      question: {
        ru: 'Сколько дополнительной памяти требует пузырьковая сортировка?',
        en: 'How much extra memory does bubble sort require?',
      },
      options: [
        { ru: 'O(1) - сортировка происходит на месте', en: 'O(1) - it sorts in place' },
        { ru: 'O(n) - нужен второй массив', en: 'O(n) - a second array is needed' },
        { ru: 'O(log n) - как у merge sort', en: 'O(log n) - like merge sort' },
        { ru: 'O(n²) - по одной ячейке на каждое сравнение', en: 'O(n²) - one cell per comparison' },
      ],
      correct: 0,
      explanation: {
        ru: 'Все перестановки происходят прямо в исходном массиве, дополнительно нужна лишь пара временных переменных для обмена значениями.',
        en: 'All swaps happen directly in the original array; only a couple of temporary variables are needed to exchange values.',
      },
      hint: {
        ru: 'Обрати внимание, используется ли отдельная структура данных для хранения промежуточных результатов, или всё происходит прямо в исходном массиве. Это прямо указано в разделе «Плюсы и минусы».',
        en: 'Notice whether any separate data structure holds intermediate results, or whether everything happens directly in the original array. Stated directly in the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем нужен флаг `swapped` в реализации?',
        en: 'Why does the implementation track a `swapped` flag?',
      },
      options: [
        { ru: 'Досрочно завершить сортировку, если массив уже упорядочен', en: 'To exit early once the array is already sorted' },
        { ru: 'Чтобы посчитать общее количество инверсий за все проходы', en: 'To count the total number of inversions across all passes' },
        { ru: 'Чтобы гарантировать устойчивость сортировки между проходами', en: 'To guarantee sort stability between passes' },
        { ru: 'Он ни на что не влияет и оставлен по ошибке', en: 'It has no effect and was left in by mistake' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если за целый проход не было перестановок, значит массив уже отсортирован - алгоритм может выйти из цикла раньше, доводя лучший случай до O(n).',
        en: 'If a full pass makes no swaps, the array is already sorted - the algorithm can break out early, bringing the best case down to O(n).',
      },
      hint: {
        ru: 'Что означает отсутствие перестановок за целый проход с точки зрения порядка массива? Смотри разбор кода в разделе «Реализация».',
        en: "What does zero swaps during an entire pass tell you about the array's order? See the code walkthrough in the \"Implementation\" tab.",
      },
    },
    {
      question: {
        ru: 'Почему пузырьковая сортировка является устойчивой (stable)?',
        en: 'Why is bubble sort stable?',
      },
      options: [
        { ru: 'Обмен идёт при строгом >, поэтому равные соседние элементы не меняются местами', en: 'The swap uses strict >, so equal adjacent elements are never swapped' },
        { ru: 'Каждый проход делает чётное число перестановок, поэтому элементы возвращаются на исходные места', en: 'Every pass makes an even number of swaps, so elements end up back in their original slots' },
        { ru: 'Алгоритм сравнивает элементы по составному ключу «значение + исходный индекс»', en: 'The algorithm compares elements using a compound key of "value + original index"' },
        { ru: 'Перед сортировкой все дубликаты переносятся в начало массива', en: 'All duplicate values are moved to the front of the array before sorting starts' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм меняет местами соседей только если a[j] > a[j+1] (строгое неравенство). При a[j] === a[j+1] обмена не происходит, поэтому относительный порядок равных элементов всегда сохраняется.',
        en: 'The algorithm swaps neighbors only when a[j] > a[j+1] (strict inequality). When a[j] === a[j+1] no swap occurs, so the relative order of equal elements is always preserved.',
      },
      hint: {
        ru: 'Посмотри на условие обмена в разделе «Реализация» - что происходит, когда два соседних элемента равны по значению?',
        en: 'Look at the swap condition in the "Implementation" tab - what happens when two neighboring elements are equal in value?',
      },
    },
    {
      question: {
        ru: 'При каких условиях пузырьковая сортировка с флагом `swapped` достигает лучшего случая O(n)?',
        en: 'Under what condition does bubble sort with the `swapped` flag hit its best case of O(n)?',
      },
      options: [
        { ru: 'Когда массив уже отсортирован', en: 'When the array is already sorted' },
        { ru: 'Когда массив отсортирован в обратном порядке', en: 'When the array is reverse-sorted' },
        { ru: 'Когда все элементы одинаковы, но флаг отключён', en: 'When all elements are equal but the flag is disabled' },
        { ru: 'Лучший случай всегда O(n²), флаг ничего не меняет', en: 'The best case is always O(n²); the flag changes nothing' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если массив уже упорядочен, первый же проход не находит ни одной пары для перестановки, флаг остаётся `false`, и алгоритм завершается за один линейный проход.',
        en: 'If the array is already sorted, the very first pass finds no pair to swap, the flag stays `false`, and the algorithm finishes after a single linear pass.',
      },
      hint: {
        ru: 'Подумай, что покажет самый первый проход, если сравнивать уже упорядоченные соседние элементы. Механика разобрана в разделе «Как это работает».',
        en: 'Think about what the very first pass finds when comparing neighbors that are already in order. Walked through in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Сколько проходов нужно пузырьковой сортировке в худшем случае для массива из n элементов?',
        en: 'How many passes does bubble sort need in the worst case for an array of n elements?',
      },
      options: [
        { ru: 'n - 1', en: 'n - 1' },
        { ru: 'n', en: 'n' },
        { ru: 'log n (по основанию 2)', en: 'log n (base 2)' },
        { ru: 'n / 2 (половина от длины)', en: 'n / 2 (half the length)' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждый полный проход гарантированно ставит на место ещё один элемент с конца, поэтому после n - 1 проходов оставшийся единственный элемент уже обязан быть на своём месте.',
        en: 'Each full pass is guaranteed to place one more element correctly at the end, so after n - 1 passes the single remaining element must already be in its place.',
      },
      hint: {
        ru: 'Подумай, сколько элементов остаётся «непроверенными», если каждый проход фиксирует ровно один элемент справа. Доказательство - в разделе «Как это работает».',
        en: 'Think about how many elements remain unchecked if each pass locks exactly one more element on the right. The proof is in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Когда пузырьковая сортировка с флагом `swapped` вынуждена делать ровно n-1 проходов, несмотря на то что почти все элементы уже стоят на правильных местах?',
        en: 'When is bubble sort with the `swapped` flag forced to make exactly n-1 passes, even though almost every element is already in its correct position?',
      },
      options: [
        { ru: 'Когда наименьший элемент стоит в самом конце массива («черепаха»)', en: "When the smallest element is at the very end of the array (a 'turtle')" },
        { ru: 'Когда наибольший элемент стоит в начале массива (это не создаёт проблем)', en: "When the largest element is at the start of the array (this causes no problem)" },
        { ru: 'Когда в массиве есть ровно одна пара соседних элементов не в том порядке', en: 'When the array has exactly one adjacent pair in the wrong order' },
        { ru: 'Когда все элементы принимают одно и то же числовое значение', en: 'When all elements share the same numeric value' },
      ],
      correct: 0,
      explanation: {
        ru: 'Пузырьковая сортировка сдвигает элементы влево не более чем на одну позицию за проход. Маленький элемент у правого конца вынуждает хотя бы одну перестановку на каждом из n-1 проходов - флаг `swapped` каждый раз становится `true`, ранний выход не срабатывает.',
        en: "Bubble sort can shift an element leftward by at most one position per pass. A small element near the right end forces at least one swap on each of the n-1 passes - the `swapped` flag is set to `true` every time, so early exit never triggers.",
      },
      hint: {
        ru: 'Подумай, насколько быстро элемент может переместиться к началу массива за один проход пузырьковой сортировки. «Черепахи» подробно разобраны в разделе «Как это работает».',
        en: 'Think about how far left an element can travel in a single bubble sort pass. Turtles are covered in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Чем отличается число перестановок у пузырьковой сортировки от сортировки выбором в худшем случае?',
        en: 'How does the number of swaps in bubble sort compare to selection sort in the worst case?',
      },
      options: [
        {
          ru: 'Пузырьковая делает до O(n²) перестановок, сортировка выбором - не больше n-1',
          en: 'Bubble sort makes up to O(n²) swaps, selection sort makes at most n-1',
        },
        { ru: 'Обе делают одинаковое число перестановок независимо от размера и порядка входа', en: 'Both make the exact same number of swaps regardless of the input size or order' },
        { ru: 'Пузырьковая всегда делает меньше перестановок за проход, чем сортировка выбором', en: 'Bubble sort always makes fewer swaps per pass than selection sort does' },
        { ru: 'Сортировка выбором делает больше перестановок в сумме, чем пузырьковая', en: 'Selection sort makes more swaps in total than bubble sort does' },
      ],
      correct: 0,
      explanation: {
        ru: 'Пузырьковая сортировка меняет местами любую соседнюю пару не в том порядке - до O(n²) перестановок. Сортировка выбором делает не более одной перестановки за проход - всего до n-1, что важно при дорогих операциях записи (флеш-память).',
        en: "Bubble sort swaps any adjacent out-of-order pair - up to O(n²) swaps total. Selection sort does at most one swap per pass - up to n-1 total, which matters when writes are expensive (flash memory).",
      },
      hint: {
        ru: 'Подумай, сколько перестановок каждый алгоритм делает за один проход по непросортированной части массива. Сравнение чисел перестановок - в разделе «Нюансы выбора».',
        en: 'Think about how many swaps each algorithm makes during a single pass over the unsorted portion. The swap-count comparison is in the "Choice nuances" section.',
      },
    },
    {
      question: {
        ru: 'Что делает Cocktail Shaker Sort быстрее обычной пузырьковой на практике?',
        en: 'What makes Cocktail Shaker Sort faster than plain bubble sort in practice?',
      },
      options: [
        {
          ru: 'Чередует проходы вперёд и назад, быстрее вынося мелкие элементы к началу',
          en: 'It alternates forward and backward passes, moving small elements forward faster',
        },
        {
          ru: 'Резервирует буфер размером n и копирует туда элементы перед каждым проходом',
          en: 'It reserves a buffer of size n and copies elements into it before each pass',
        },
        {
          ru: 'Делит массив на две половины и сравнивает их параллельно через два указателя',
          en: 'It splits the array into two halves and compares them in parallel using two pointers',
        },
        {
          ru: 'Снижает худший случай до O(n log n), пропуская уже отсортированные подмассивы',
          en: 'It reduces the worst case to O(n log n) by skipping already-sorted subarrays',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Обычная пузырьковая двигает «черепаху» (малый элемент у правого конца) лишь на одну позицию влево за проход. Шейкерная сортировка на обратном проходе (справа налево) сразу перемещает её на много позиций, оставаясь O(n²) в худшем случае.',
        en: "Plain bubble sort moves a 'turtle' (small element near the right end) only one position left per pass. Cocktail shaker sort on its backward pass (right to left) moves it many positions at once, while still being O(n²) in the worst case.",
      },
      hint: {
        ru: 'Представь маленький элемент в самом конце массива в обычной пузырьковой - сколько проходов ему нужно, чтобы добраться до начала? Механика Cocktail Shaker Sort описана в разделе «Примеры в коде».',
        en: 'Picture a small element sitting at the very end of the array in plain bubble sort - how many passes does it take to reach the front? Cocktail Shaker Sort is explained in the "In code" section.',
      },
    },
  ],
};

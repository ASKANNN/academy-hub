export const selectionSort = {
  slug: 'selection-sort',
  category: 'sorting',
  name: { ru: 'Selection Sort', en: 'Selection Sort' },
  complexity: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 2,
  tags: ['comparison', 'in-place', 'unstable'],

  intent: {
    ru: 'Сортировка выбором на каждом шаге находит наименьший элемент в неотсортированной части массива и ставит его сразу после уже отсортированной части.',
    en: 'Selection sort repeatedly finds the smallest element in the unsorted part of the array and places it right after the sorted part.',
  },

  problem: {
    ru: 'Нужно отсортировать массив, но при этом минимизировать количество операций записи (перестановок), потому что запись в память или на диск иногда дороже, чем чтение и сравнение. Пузырьковая сортировка делает перестановку почти при каждом сравнении - хочется алгоритм, который переставляет элементы реже.',
    en: 'You need to sort an array while minimizing the number of writes (swaps), because writing to memory or disk is sometimes more expensive than reading and comparing. Bubble sort swaps on almost every comparison - a cheaper alternative in terms of writes would help.',
  },

  solution: {
    ru: 'Массив мысленно делится на отсортированную часть слева и неотсортированную справа. На каждом шаге алгоритм просматривает всю неотсортированную часть, находит в ней минимальный элемент и меняет его местами с первым элементом неотсортированной части - ровно одна перестановка за шаг, независимо от того, сколько было сравнений.',
    en: 'The array is conceptually split into a sorted left part and an unsorted right part. On each step, the algorithm scans the entire unsorted part, finds its minimum, and swaps it with the first element of the unsorted part - exactly one swap per step, no matter how many comparisons it took.',
  },

  steps: [
    {
      title: { ru: 'Отметить границу', en: 'Mark the boundary' },
      explanation: {
        ru: 'Считать всё слева от текущей позиции уже отсортированным, всё справа - нет.',
        en: 'Treat everything left of the current position as sorted, everything to the right as not.',
      },
    },
    {
      title: { ru: 'Найти минимум справа', en: 'Find the minimum on the right' },
      explanation: {
        ru: 'Пройти всю неотсортированную часть и запомнить индекс наименьшего элемента.',
        en: 'Scan the whole unsorted part and remember the index of the smallest element.',
      },
    },
    {
      title: { ru: 'Поменять местами один раз', en: 'Swap once' },
      explanation: {
        ru: 'Обменять найденный минимум с элементом на границе - ровно одна перестановка за шаг.',
        en: 'Swap the found minimum with the element at the boundary - exactly one swap per step.',
      },
    },
    {
      title: { ru: 'Сдвинуть границу', en: 'Advance the boundary' },
      explanation: {
        ru: 'Отсортированная часть выросла на один элемент - сдвинуть границу на позицию вправо.',
        en: 'The sorted part grew by one element - move the boundary one position to the right.',
      },
    },
    {
      title: { ru: 'Повторять до конца', en: 'Repeat to the end' },
      explanation: {
        ru: 'Повторять поиск минимума и перестановку, пока неотсортированная часть не сведётся к одному элементу.',
        en: 'Repeat finding the minimum and swapping until the unsorted part is down to one element.',
      },
    },
  ],
  stepBreakpoints: [9, 11, 24, 36],

  implementation: {
    javascript: `function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
    }
  }
  return a;
}`,
    python: `def selection_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if a[j] < a[min_index]:
                min_index = j
        if min_index != i:
            a[i], a[min_index] = a[min_index], a[i]
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Копируем массив', en: 'Copy the array' },
        explanation: {
          ru: '`const a = [...arr]` создаёт независимую копию через spread-оператор. Функция работает с копией, не изменяя исходный `arr` - это делает её **чистой** (pure): один и тот же вход всегда даёт один и тот же выход без побочных эффектов.',
          en: '`const a = [...arr]` creates an independent copy via the spread operator. The function works on the copy, leaving the original `arr` untouched - this makes it **pure**: the same input always produces the same output with no side effects.',
        },
      },
      {
        lines: [3, 3],
        title: { ru: 'Внешний цикл: граница отсортированной части', en: 'Outer loop: sorted boundary' },
        explanation: {
          ru: '`i` - индекс первого элемента неотсортированной части. Цикл идёт до `a.length - 1`: после n-1 итераций n-1 наименьших элементов стоят на финальных позициях, а единственный оставшийся обязан быть наибольшим - лишняя итерация не нужна.',
          en: '`i` is the index of the first element of the unsorted part. The loop runs to `a.length - 1`: after n-1 iterations the n-1 smallest elements are in final positions, and the one remaining element must be the largest - one extra iteration is unnecessary.',
        },
      },
      {
        lines: [4, 4],
        title: { ru: 'Предположение: минимум на границе', en: 'Assumption: minimum at boundary' },
        explanation: {
          ru: '`minIndex = i` - алгоритм **предполагает**, что граничный элемент уже является минимумом неотсортированной части. Внутренний цикл может опровергнуть это, обновив `minIndex`. Если ни один элемент правее не окажется меньше, `minIndex` так и останется `i`.',
          en: '`minIndex = i` - the algorithm **assumes** the boundary element is already the minimum of the unsorted part. The inner loop can disprove this by updating `minIndex`. If no element to the right turns out smaller, `minIndex` stays `i`.',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Внутренний цикл: поиск истинного минимума', en: 'Inner loop: find the true minimum' },
        explanation: {
          ru: 'Цикл идёт от `i+1` до конца массива - всегда `n-1-i` итераций, ни одной меньше. Строгое `a[j] < a[minIndex]`: при нахождении меньшего элемента `minIndex` обновляется. Раннего выхода нет - алгоритм не знает, найден ли истинный минимум, пока не просмотрит весь диапазон.',
          en: 'The loop runs from `i+1` to the end of the array - always `n-1-i` iterations, never fewer. Strict `a[j] < a[minIndex]`: when a smaller element is found, `minIndex` updates. No early exit - the algorithm cannot know the true minimum until it has scanned the full range.',
        },
      },
      {
        lines: [8, 9],
        title: { ru: 'Условная перестановка: ровно одна за шаг', en: 'Conditional swap: exactly one per step' },
        explanation: {
          ru: '`if (minIndex !== i)` исключает лишнюю запись: если минимум уже стоит на границе, обмен не нужен. Деструктуризация `[a[i], a[minIndex]] = [a[minIndex], a[i]]` делает это за одно выражение. Это **единственная перестановка** за весь шаг - именно поэтому суммарно не более n-1 записей в массив.',
          en: '`if (minIndex !== i)` prevents an unnecessary write: if the minimum is already at the boundary, no swap is needed. Destructuring `[a[i], a[minIndex]] = [a[minIndex], a[i]]` does it in one expression. This is the **only swap** for the entire step - exactly why the total write count stays at n-1.',
        },
      },
      {
        lines: [12, 12],
        title: { ru: 'Возврат отсортированной копии', en: 'Return the sorted copy' },
        explanation: {
          ru: 'Возвращается `a` - отсортированная копия. Исходный массив `arr` не тронут. Вызывающий код получает новый массив, а оригинальные данные остаются неизменными - без скрытых мутаций.',
          en: 'Returns `a` - the sorted copy. The original array `arr` was never modified. The caller receives a new array; the original data remains unchanged - no hidden mutations.',
        },
      },
    ],
    python: [
      {
        lines: [1, 3],
        title: { ru: 'Подготовка: копия и длина', en: 'Setup: copy and length' },
        explanation: {
          ru: '`a = arr.copy()` создаёт независимую копию списка - без этого функция меняла бы оригинал. `n = len(a)` вычисляется один раз и переиспользуется в обоих циклах - повторный вызов `len()` на каждой итерации был бы лишней работой.',
          en: '`a = arr.copy()` creates an independent copy - without it the function would mutate the original. `n = len(a)` is computed once and reused in both loops - calling `len()` on every iteration would be redundant work.',
        },
      },
      {
        lines: [4, 4],
        title: { ru: 'Внешний цикл: n-1 шагов', en: 'Outer loop: n-1 steps' },
        explanation: {
          ru: '`range(n - 1)` генерирует 0, 1, ..., n-2. `i` - индекс границы. После каждого шага элемент `a[i]` занимает финальную позицию навсегда. Последний элемент обрабатывать не нужно: если n-1 наименьших уже на месте, оставшийся обязан быть наибольшим.',
          en: '`range(n - 1)` generates 0, 1, ..., n-2. `i` is the boundary index. After each step, element `a[i]` takes its final position permanently. The last element needs no processing: if the n-1 smallest are already placed, the remaining one must be the largest.',
        },
      },
      {
        lines: [5, 5],
        title: { ru: 'min_index: начальная гипотеза', en: 'min_index: opening assumption' },
        explanation: {
          ru: '`min_index = i` - стартовое предположение: граничный элемент является минимумом неотсортированной части. Это избавляет от необходимости включать граничный элемент во внутренний цикл - он уже учтён через `min_index`.',
          en: '`min_index = i` - the opening assumption: the boundary element is the minimum of the unsorted part. This avoids including the boundary element in the inner loop itself - it is already accounted for via `min_index`.',
        },
      },
      {
        lines: [6, 8],
        title: { ru: 'Внутренний цикл: обновление минимума', en: 'Inner loop: update the minimum' },
        explanation: {
          ru: '`range(i + 1, n)` - от следующего за границей до конца. Строгое `a[j] < a[min_index]`: при равных значениях `min_index` не обновляется, что слегка сдерживает нестабильность - хотя полностью устойчивым алгоритм не становится из-за прямого обмена ниже.',
          en: '`range(i + 1, n)` - from the element after the boundary to the end. Strict `a[j] < a[min_index]`: equal values do not update `min_index`, which slightly restrains instability - though the algorithm is not fully stable because of the direct swap below.',
        },
      },
      {
        lines: [9, 10],
        title: { ru: 'Условный обмен: питонический без временной переменной', en: 'Conditional swap: Pythonic, no temp variable' },
        explanation: {
          ru: '`if min_index != i` проверяет, нужен ли обмен вообще. Питонический обмен `a[i], a[min_index] = a[min_index], a[i]` вычисляет правую часть как кортеж до присваивания - временная переменная не нужна. Одна запись за шаг, сколько бы сравнений ни было.',
          en: '`if min_index != i` checks whether any swap is needed at all. Pythonic swap `a[i], a[min_index] = a[min_index], a[i]` evaluates the right side as a tuple before assignment - no temporary variable is needed. One write per step, regardless of how many comparisons were made.',
        },
      },
      {
        lines: [11, 11],
        title: { ru: 'Возврат отсортированной копии', en: 'Return the sorted copy' },
        explanation: {
          ru: 'Возвращается `a` - отсортированная копия. Оригинальный список `arr` не изменён. Функция не производит побочных эффектов: вызывающий код получает новый список, исходные данные остаются нетронутыми.',
          en: 'Returns `a` - the sorted copy. The original list `arr` was not modified. The function produces no side effects: the caller gets a new list, the original data remains untouched.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Делает не более n-1 перестановок, независимо от исходного порядка данных - полезно, когда запись дороже сравнения.',
      en: 'Makes at most n-1 swaps regardless of the initial order - useful when writes are more expensive than comparisons.',
    },
    {
      ru: 'Простая реализация без рекурсии и дополнительных структур данных.',
      en: 'Simple implementation with no recursion or extra data structures.',
    },
    {
      ru: 'Сортирует на месте - O(1) дополнительной памяти.',
      en: 'Sorts in place - O(1) extra memory.',
    },
  ],
  cons: [
    {
      ru: 'O(n²) сравнений всегда - в отличие от пузырьковой сортировки, нет способа завершиться раньше на почти отсортированных данных.',
      en: 'Always O(n²) comparisons - unlike bubble sort, there is no way to finish early on nearly sorted data.',
    },
    {
      ru: 'Неустойчив в базовой реализации: перестановка минимума с границей может изменить относительный порядок равных элементов.',
      en: 'Unstable in the basic implementation: swapping the minimum with the boundary can change the relative order of equal elements.',
    },
    {
      ru: 'На больших наборах данных проигрывает по скорости алгоритмам O(n log n).',
      en: 'Loses on speed to O(n log n) algorithms on large datasets.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда операция записи в память заметно дороже сравнения - например, запись на флеш-память с ограниченным числом циклов перезаписи.',
      en: 'When a write operation is noticeably more expensive than a comparison - e.g. writing to flash memory with limited write cycles.',
    },
    {
      ru: 'Для небольших массивов или как шаг в комбинированных алгоритмах (например, в качестве finishing touch для маленьких подмассивов в интроспективной сортировке).',
      en: 'For small arrays, or as a step inside hybrid algorithms (e.g. as the finishing touch for small subarrays in introspective sort).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Сортировка данных на носителях с дорогой записью** - там, где важно свести число операций записи к минимуму, а не число сравнений.',
      en: '**Sorting on storage with expensive writes** - where minimizing the number of write operations matters more than the number of comparisons.',
    },
    {
      ru: '**Учебные визуализации** - предсказуемое, линейно нарастающее поведение делает алгоритм удобным для демонстрации самой идеи «выбора минимума».',
      en: '**Teaching visualizations** - its predictable, linearly growing behavior makes it convenient for demonstrating the "pick the minimum" idea itself.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Представь массив `[64, 25, 12, 22, 11]`. Сортировка выбором делит его мысленно на **отсортированную** часть слева и **неотсортированную** справа. На первом шаге граница стоит у самого начала - весь массив неотсортирован. Алгоритм просматривает все 5 элементов, находит минимум **11** и меняет его с первым элементом: `[11, 25, 12, 22, 64]`. Граница сдвигается вправо - `11` навсегда занял своё место.',
        en: 'Picture the array `[64, 25, 12, 22, 11]`. Selection sort mentally divides it into a **sorted** left part and an **unsorted** right part. On step one the boundary sits at the very start - the whole array is unsorted. The algorithm scans all 5 elements, finds the minimum **11**, and swaps it with the first element: `[11, 25, 12, 22, 64]`. The boundary advances - `11` is permanently in place.',
      },
      {
        ru: 'Почему сортировка выбором всегда делает ровно **n(n-1)/2** сравнений? На первом шаге внутренний цикл просматривает `n-1` элементов, на втором - `n-2`, и так далее. Сумма `(n-1) + (n-2) + ... + 1 = n(n-1)/2`. При n=8 это **28 сравнений** - ровно столько же, отсортирован ли массив или перевёрнут. Внутренний цикл не умеет «срезать угол»: он должен пройти до конца неотсортированной части, чтобы гарантировать нахождение истинного минимума.',
        en: 'Why does selection sort always make exactly **n(n-1)/2** comparisons? On step one the inner loop scans `n-1` elements, on step two `n-2`, and so on. The sum `(n-1) + (n-2) + ... + 1 = n(n-1)/2`. At n=8 that is **28 comparisons** - the same whether the array is sorted or reversed. The inner loop cannot cut corners: it must scan to the end of the unsorted part to guarantee finding the true minimum.',
      },
      {
        ru: 'Зато число **перестановок** под жёстким контролем: не более **n-1** за всё время. На каждом из n-1 шагов происходит не более одного обмена - минимум меняется местами с элементом на границе. Если минимум уже стоит на границе, обмен пропускается (`if (minIndex !== i)`). Для n=8 это максимум **7 перестановок** против потенциальных **28** у пузырьковой - именно это делает алгоритм ценным там, где запись в память дороже чтения.',
        en: 'The **swap count**, however, is under tight control: no more than **n-1** total. Each of the n-1 steps performs at most one swap - the minimum trades places with the boundary element. If the minimum is already at the boundary, the swap is skipped (`if (minIndex !== i)`). For n=8 that means at most **7 swaps** versus a potential **28** for bubble sort - exactly what makes the algorithm valuable where writing to memory costs more than reading.',
      },
      {
        ru: '**Инвариант цикла** - ключ к корректности алгоритма. В начале каждого шага `i` все элементы с индексами **0..i-1** уже стоят на своих финальных позициях и больше никогда не трогаются. После шага `i` элемент с индексом `i` добавляется к этой «заморозке». Именно поэтому достаточно **n-1 шагов**: после n-1 итераций левее границы стоят n-1 наименьших элементов, а оставшийся единственный обязан быть наибольшим.',
        en: 'The **loop invariant** is the key to correctness. At the start of each step `i`, all elements at indices **0..i-1** are already in their final positions and are never touched again. After step `i`, the element at index `i` joins this frozen region. That is exactly why **n-1 steps** suffice: after n-1 iterations the n-1 smallest elements sit left of the boundary, and the one remaining element must be the largest.',
      },
      {
        ru: 'Почему сортировка выбором **неустойчива** (unstable)? Возьмём `[3a, 3b, 1]`, где `3a` и `3b` - одинаковые значения, исходный порядок: `a` левее `b`. На первом шаге минимум `1` стоит в позиции 2 и меняется с позицией 0: результат `[1, 3b, 3a]`. Теперь `3b` левее `3a` - исходный порядок нарушен. Прямой **обмен через прыжок** - корень нестабильности: минимум телепортируется на нужное место, перепрыгивая через равный ему элемент без его сдвига.',
        en: 'Why is selection sort **unstable**? Take `[3a, 3b, 1]`, where `3a` and `3b` are equal values with `a` originally to the left of `b`. On step one, minimum `1` is at index 2 and swaps with index 0: result `[1, 3b, 3a]`. Now `3b` is left of `3a` - the original order is broken. The direct **long-range swap** is the root of instability: the minimum teleports to its target, jumping over the equal element without shifting it.',
      },
      {
        ru: 'Сравнение с **пузырьковой** раскрывает главный компромисс. Оба алгоритма делают **O(n²) сравнений** в среднем и худшем случае. Но в числе записей разрыв огромный: пузырьковая переставляет элементы почти при каждом сравнении - до O(n²) перестановок. Сортировка выбором ограничивает себя до **n-1 перестановок** ценой потери раннего выхода. Пузырьковая с флагом завершается за O(n) на уже отсортированных данных - сортировка выбором всегда тратит все n(n-1)/2 сравнений, даже если массив идеально отсортирован.',
        en: 'Comparing with **bubble sort** reveals the core trade-off. Both algorithms make **O(n²) comparisons** on average and worst case. But the write-count gap is enormous: bubble sort can swap on nearly every comparison - up to O(n²) swaps. Selection sort caps itself at **n-1 swaps** at the cost of losing early-exit capability. Bubble sort with its flag finishes in O(n) on already-sorted input; selection sort always spends all n(n-1)/2 comparisons - even if the array is perfectly sorted.',
      },
      {
        ru: 'Как сделать сортировку выбором **устойчивой** - ценой дополнительных записей? Вместо прямого обмена найденного минимума с границей нужно **сдвинуть** все элементы между границей и минимумом на одну позицию вправо (как в сортировке вставками) и вставить минимум на место границы. Это сохраняет порядок равных элементов, но превращает одну перестановку за шаг в до **O(n) сдвигов** за шаг. Итоговое число записей приближается к O(n²) - столько же, сколько у пузырьковой, но уже без её раннего выхода.',
        en: 'How to make selection sort **stable** - at the cost of extra writes? Instead of directly swapping the found minimum to the boundary, **shift** all elements between the boundary and the minimum one position right (just like insertion sort), then place the minimum at the boundary. This preserves the order of equal elements, but turns one swap per step into up to **O(n) shifts** per step. The total write count approaches O(n²) - matching bubble sort, but now without bubble sort\'s early-exit advantage.',
      },
    ],
    whenToUse: [
      {
        ru: 'Главная ниша сортировки выбором - **носители с дорогой записью**. Flash-память (NAND, NOR) и EEPROM имеют ограниченное число циклов перезаписи - обычно **100 000 - 1 000 000** для одной ячейки. Каждая лишняя операция записи приближает конец жизни носителя. В этом контексте **n-1 перестановок** против O(n²) у пузырьковой - принципиальная разница: при n=100 это 99 перестановок против потенциальных 4950.',
        en: 'The main niche of selection sort is **write-heavy storage**. Flash memory (NAND, NOR) and EEPROM have a limited write cycle count - typically **100,000 to 1,000,000** per cell. Every extra write brings storage closer to end-of-life. In this context **n-1 swaps** against O(n²) for bubble sort is a meaningful practical difference: at n=100 that is 99 swaps versus a potential 4,950.',
      },
      {
        ru: '**Маленькие массивы** (n < 10-15) - ещё одна подходящая ниша. При n < 10 разница между O(n²) и O(n log n) незаметна на фоне константных расходов и оверхеда вызовов. Предсказуемость алгоритма (всегда ровно n(n-1)/2 итераций внутреннего цикла) даже удобна: поведение детерминировано и легко отлаживается. Однако при n < 10 **сортировка вставками** обычно быстрее на практике - она делает меньше физических записей на почти упорядоченных данных.',
        en: '**Small arrays** (n < 10-15) are another fitting niche. When n < 10 the gap between O(n²) and O(n log n) is invisible against constant factors and call overhead. The algorithm\'s predictability (always exactly n(n-1)/2 inner iterations) is even convenient: behavior is deterministic and easy to debug. However, for n < 10, **insertion sort** is usually faster in practice - it makes fewer physical writes on nearly ordered data.',
      },
      {
        ru: 'Сортировка выбором подходит, когда **устойчивость не нужна**. Если ключ сортировки - единственное поле объекта, или порядок среди равных элементов заведомо не важен, отсутствие гарантии стабильности не создаёт проблем. Как только появляется требование «при равных значениях сохранить исходный порядок» - нужны **Timsort**, **merge sort** или сортировка вставками, все из которых устойчивы по определению.',
        en: 'Selection sort is appropriate when **stability is not required**. If the sort key is the only field of an object, or the order among equal elements is guaranteed not to matter, the lack of stability causes no problems. The moment the requirement "preserve original order among equals" appears - the answer is **Timsort**, **merge sort**, or insertion sort, all of which are stable by definition.',
      },
      {
        ru: '**Три оси выбора** помогают принять решение: число перестановок, число сравнений, устойчивость. По **перестановкам** сортировка выбором побеждает (n-1 максимум) - лучше bubble и insertion sort в худшем случае. По **сравнениям** проигрывает: всегда n(n-1)/2 без ранней остановки - хуже пузырьковой на почти отсортированных данных. По **устойчивости** уступает обеим. Выбирать только если минимизация записей явно важнее всего остального.',
        en: '**Three decision axes** help choose: swap count, comparison count, stability. On **swaps** selection sort wins (n-1 maximum) - better than bubble and insertion sort in the worst case. On **comparisons** it loses: always n(n-1)/2 with no early exit - worse than bubble sort on nearly sorted data. On **stability** it yields to both. Choose it only when minimizing writes is explicitly more important than everything else.',
      },
      {
        ru: '**Никогда для больших данных**. При n > 50-100 даже простой quicksort опережает сортировку выбором настолько, что экономия на перестановках полностью съедается разницей в сравнениях. Merge sort даёт O(n log n) гарантированно и устойчиво ценой O(n) памяти. На современных CPU кэш-промахи от n(n-1)/2 квазислучайных чтений при поиске минимума стоят дороже, чем может сэкономить алгоритм на перестановках.',
        en: '**Never for large data**. At n > 50-100 even a straightforward quicksort outperforms selection sort so decisively that the write savings are completely erased by the comparison gap. Merge sort delivers O(n log n) guaranteed and stable at the cost of O(n) memory. On modern CPUs, cache misses from n(n-1)/2 quasi-random reads during minimum search cost more than the algorithm can recover in write savings.',
      },
      {
        ru: '**Как строительный блок**: если существует структура данных, ускоряющая поиск минимума, идея сортировки выбором остаётся полезной. Именно так работает **Heapsort** - он заменяет линейный поиск минимума за O(n) на извлечение из кучи за O(log n), сохраняя принцип «извлеки минимум, поставь на место». Результат - O(n log n) при O(1) дополнительной памяти. Сортировка выбором - это понятный шаблон, из которого вырастает Heapsort.',
        en: '**As a building block**: if a data structure exists that speeds up finding the minimum, the selection sort idea stays useful. That is exactly how **Heapsort** works - it replaces the O(n) linear minimum search with an O(log n) heap extraction, keeping the principle "extract minimum, place it." Result: O(n log n) at O(1) extra memory. Selection sort is the clear template from which Heapsort grows.',
      },
    ],
    realWorld: [
      {
        ru: 'В **встроенных системах** сортировка выбором занимает живую нишу. Типичный пример - **медианный фильтр** на микроконтроллере: собери 7-9 последних показаний АЦП (датчик температуры, давления), отсортируй, возьми средний элемент. При n=7 алгоритм делает **21 сравнение и не более 6 перестановок**. На ARM Cortex-M0 с flash на 100k циклов это принципиально: лишние записи укорачивают жизнь прошивки на реальных проектах - STM32, Arduino, ESP32.',
        en: 'In **embedded systems**, selection sort occupies a live niche. A typical example is a **median filter** on a microcontroller: collect 7-9 recent ADC readings (temperature or pressure sensor), sort them, take the middle element. At n=7 the algorithm makes **21 comparisons and at most 6 swaps**. On an ARM Cortex-M0 with 100k-cycle flash, this matters: extra writes shorten firmware lifetime on real projects - STM32, Arduino, ESP32.',
      },
      {
        ru: 'Самое влиятельное «потомство» сортировки выбором - **Heapsort** (пирамидальная сортировка). Идея та же: извлечь минимум, положить на финальное место, сдвинуть границу. Разница - в инструменте поиска минимума: Heapsort держит неотсортированную часть в виде **двоичной кучи** и извлекает экстремальный элемент за **O(log n)** вместо линейного O(n). Итог - O(n log n) при O(1) памяти. `std::partial_sort` в GCC использует heap-based подход, унаследованный из этой идеи.',
        en: 'The most influential descendant of selection sort is **Heapsort**. The idea is identical: extract the minimum, place it at its final position, advance the boundary. The difference is in the search tool: Heapsort keeps the unsorted part as a **binary heap** and extracts the extreme element in **O(log n)** instead of linear O(n). Result: O(n log n) at O(1) memory. `std::partial_sort` in GCC uses a heap-based approach inherited from this idea.',
      },
      {
        ru: '**Ранние движки JavaScript** использовали сортировку выбором для коротких массивов. V8 (Chrome) до 2019 года переключался на insertion sort для массивов длиной < 10 элементов; ещё более ранние версии содержали selection sort как запасной вариант для крошечных массивов. После 2019 года V8 полностью перешёл на **Timsort**, устранив все O(n²) случаи. SpiderMonkey (Firefox) аналогично эволюционировал от ad-hoc сортировок для малых массивов к унифицированному Timsort.',
        en: '**Early JavaScript engines** used selection sort for short arrays. V8 (Chrome) before 2019 switched to insertion sort for arrays shorter than 10 elements; even earlier versions contained selection sort as a fallback for tiny arrays. After 2019, V8 fully adopted **Timsort**, eliminating all O(n²) cases. SpiderMonkey (Firefox) similarly evolved from ad-hoc sorts for small arrays to a unified Timsort.',
      },
      {
        ru: '**Stable selection sort** встречается в учебных библиотеках и специализированных реализациях. Вместо прямого обмена с границей такая версия сдвигает элементы между минимумом и границей вправо (как insertion sort) и вставляет минимум на место. Устойчивость обеспечена, но число записей вырастает до O(n²). В стандартных библиотеках (Python, Java, C++) стабильная сортировка реализована через **Timsort**, не через stable selection sort.',
        en: '**Stable selection sort** appears in teaching libraries and specialized implementations. Instead of a direct boundary swap, this variant shifts elements between the minimum and the boundary right (like insertion sort) and inserts the minimum in place. Stability is achieved, but write count grows to O(n²). In standard libraries (Python, Java, C++), stable sorting is implemented via **Timsort**, not stable selection sort.',
      },
      {
        ru: 'В **соревновательном программировании** (Codeforces, LeetCode) сортировка выбором встречается как основа задачи «минимальное число перестановок для сортировки». Задача напрямую моделирует алгоритм: число инверсий указывает, сколько перестановок нужно. Это же свойство - гарантированно ограниченное число обменов - используют в задачах, где стоимость перестановки задана явно и нужно минимизировать суммарные расходы.',
        en: 'In **competitive programming** (Codeforces, LeetCode), selection sort appears as the basis for "minimum number of swaps to sort." The problem directly models the algorithm: the number of inversions tells how many swaps are needed. The same bounded-swap property is used in problems where swap cost is explicitly given and total cost must be minimized.',
      },
      {
        ru: 'Где сортировка выбором **не** встречается? В стандартных библиотеках языков общего назначения - нигде. Python (`list.sort`) - Timsort. Java (`Arrays.sort` для объектов) - Timsort. C++ (`std::sort`) - introsort. Go (`sort.Slice`) - pdqsort. Rust (`slice::sort_unstable`) - pdqsort. Единственное конкурентное преимущество алгоритма (минимальные записи) доступно через **Heapsort** при O(n log n) сравнениях - это и объясняет его отсутствие в современных стандартных библиотеках.',
        en: 'Where does selection sort **not** appear? In standard libraries of general-purpose languages - nowhere. Python (`list.sort`) - Timsort. Java (`Arrays.sort` for objects) - Timsort. C++ (`std::sort`) - introsort. Go (`sort.Slice`) - pdqsort. Rust (`slice::sort_unstable`) - pdqsort. The algorithm\'s sole competitive advantage (minimal writes) is available via **Heapsort** at O(n log n) comparisons - this explains its complete absence from modern standard libraries.',
      },
    ],
  },

  relatedAlgorithms: ['bubble-sort', 'insertion-sort'],

  quiz: [
    {
      question: {
        ru: 'Какова временная сложность сортировки выбором в лучшем, среднем и худшем случаях?',
        en: 'What is the time complexity of selection sort in the best, average, and worst cases?',
      },
      options: [
        { ru: 'O(n²) во всех трёх случаях - количество сравнений не зависит от порядка', en: 'O(n²) in all three cases - comparisons never depend on input order' },
        { ru: 'O(n) в лучшем случае (уже отсортирован) и O(n²) в худшем', en: 'O(n) in the best case (already sorted) and O(n²) in the worst' },
        { ru: 'O(n log n) в среднем случае благодаря встроенному бинарному поиску минимума', en: 'O(n log n) on average thanks to a built-in binary search for the minimum' },
        { ru: 'O(n²) в худшем и O(n log n) в среднем, как у большинства популярных алгоритмов', en: 'O(n²) in the worst and O(n log n) on average, like most popular algorithms' },
      ],
      correct: 0,
      explanation: {
        ru: 'Сортировка выбором всегда проходит весь оставшийся неотсортированный участок на каждом шаге - число сравнений фиксировано и равно n(n-1)/2 независимо от расположения элементов. Ни одного «лучшего» случая не существует.',
        en: 'Selection sort always scans the entire remaining unsorted range on every step - the number of comparisons is fixed at n(n-1)/2 regardless of element order. There is no "good" case.',
      },
      hint: {
        ru: 'Подумай, может ли внутренний цикл поиска минимума пропустить часть массива хотя бы в одном случае.',
        en: 'Think about whether the inner loop searching for the minimum can ever skip part of the array in any case.',
      },
    },
    {
      question: {
        ru: 'Какой инвариант сортировка выбором поддерживает в начале каждого шага?',
        en: 'What invariant does selection sort maintain at the start of every step?',
      },
      options: [
        {
          ru: 'Слева от границы всё уже на своём окончательном отсортированном месте',
          en: 'Everything left of the boundary is already in its final sorted position',
        },
        {
          ru: 'Весь массив в любой момент является корректной кучей относительно значений',
          en: 'The whole array is a valid heap with respect to values at every moment',
        },
        {
          ru: 'Элементы отсортированы по модулю значения, а не по самому значению',
          en: 'Elements are sorted by absolute value rather than by their actual value',
        },
        {
          ru: 'Массив в любой момент разбит на две уже независимо отсортированные половины',
          en: 'The array is split into two already independently sorted halves at all times',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Это инвариант цикла, который делает алгоритм корректным: как только элемент поставлен на границу и граница сдвинута, этот элемент больше никогда не трогается.',
        en: "This is the loop invariant that makes the algorithm correct: once an element is placed at the boundary and the boundary advances, that element is never touched again.",
      },
      hint: {
        ru: 'Подумай, что остаётся неизменным для элементов, уже оказавшихся слева от текущей границы шага.',
        en: "Think about what stays unchanged for elements that already ended up left of the current step's boundary.",
      },
    },
    {
      question: {
        ru: 'Сколько всего сравнений выполнит сортировка выбором на массиве из n элементов, независимо от исходного порядка?',
        en: 'How many total comparisons does selection sort perform on an array of n elements, regardless of the initial order?',
      },
      options: [
        { ru: 'n(n - 1) / 2', en: 'n(n - 1) / 2' },
        {
          ru: 'n log n - как у оптимальных алгоритмов сравнения',
          en: 'n log n - matching the optimal comparison-based algorithms',
        },
        {
          ru: 'n - 1 - столько же, сколько и максимальное число перестановок',
          en: 'n - 1 - the same as the maximum number of swaps',
        },
        {
          ru: 'Зависит от исходного порядка расположения элементов в массиве',
          en: 'It depends on the initial order in which the elements are arranged',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом из n-1 шагов алгоритм просматривает весь оставшийся неотсортированный участок: (n-1) + (n-2) + ... + 1 = n(n - 1) / 2 сравнений - эта сумма не зависит от того, как расположены элементы.',
        en: 'Each of the n-1 steps scans the entire remaining unsorted range: (n-1) + (n-2) + ... + 1 = n(n - 1) / 2 comparisons - this sum does not depend on how the elements are arranged.',
      },
      hint: {
        ru: 'Просуммируй, сколько элементов просматривается на каждом из n-1 шагов.',
        en: 'Sum up how many elements get scanned on each of the n-1 steps.',
      },
    },
    {
      question: {
        ru: 'Сколько перестановок (swap) максимум выполнит сортировка выбором на массиве из n элементов?',
        en: 'At most how many swaps will selection sort perform on an array of n elements?',
      },
      options: [
        { ru: 'n - 1', en: 'n - 1' },
        { ru: 'n²', en: 'n²' },
        { ru: 'n log n', en: 'n log n' },
        { ru: 'Ровно n', en: 'Exactly n' },
      ],
      correct: 0,
      explanation: {
        ru: 'На каждом из n-1 шагов происходит не более одной перестановки - минимум обменивается с элементом на границе.',
        en: 'Each of the n-1 steps performs at most one swap - the minimum is exchanged with the boundary element.',
      },
      hint: {
        ru: 'Подумай, сколько перестановок происходит за один шаг, и сколько всего таких шагов в алгоритме.',
        en: 'Think about how many swaps happen per step, and how many steps the algorithm takes in total.',
      },
    },
    {
      question: {
        ru: 'Почему сортировка выбором может считаться неустойчивой (unstable)?',
        en: 'Why can selection sort be considered unstable?',
      },
      options: [
        {
          ru: 'Перестановка минимума с границей может «перепрыгнуть» через равный элемент и изменить его относительный порядок',
          en: 'Swapping the minimum with the boundary can "jump over" an equal element and change its relative order',
        },
        {
          ru: 'Алгоритм использует случайные числа для выбора следующего элемента на каждом шаге, что делает результат непредсказуемым',
          en: 'The algorithm uses random numbers to decide the next element to process at every step, making the result unpredictable',
        },
        {
          ru: 'Он не сортирует на месте, требуя отдельного вспомогательного массива для результата размером с исходный',
          en: 'It does not sort in place, requiring a separate auxiliary array the same size as the original for the result',
        },
        {
          ru: 'Он работает только с целыми числами и не может обрабатывать строки или объекты',
          en: 'It only works with integers and cannot handle strings or arbitrary objects',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Если минимум находится дальше в массиве, чем равный ему по значению элемент ближе к границе, обмен местами меняет их исходный порядок.',
        en: 'If the minimum is found further in the array than an equal-valued element closer to the boundary, the swap changes their original order.',
      },
      hint: {
        ru: 'Подумай, что происходит с равным по значению элементом, стоящим между границей и найденным минимумом, когда происходит обмен.',
        en: 'Think about what happens to an equal-valued element sitting between the boundary and the found minimum when the swap happens.',
      },
    },
    {
      question: {
        ru: 'Есть ли у сортировки выбором лучший случай быстрее O(n²)?',
        en: 'Does selection sort have a best case faster than O(n²)?',
      },
      options: [
        {
          ru: 'Нет - она всегда просматривает всю неотсортированную часть на каждом шаге',
          en: 'No - it always scans the entire unsorted part on every step',
        },
        {
          ru: 'Да, O(n) на уже отсортированном массиве благодаря раннему выходу из цикла',
          en: 'Yes, O(n) on an already sorted array thanks to an early exit from the loop',
        },
        {
          ru: 'Да, O(log n) на случайных данных за счёт бинарного поиска минимума',
          en: 'Yes, O(log n) on random data thanks to a binary search for the minimum',
        },
        {
          ru: 'Да, но только для строк благодаря лексикографическому сравнению символов',
          en: 'Yes, but only for strings thanks to lexicographic character comparison',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от пузырьковой сортировки с ранним выходом, сортировка выбором всегда ищет минимум по всей оставшейся части - сравнения не зависят от исходного порядка.',
        en: "Unlike bubble sort with early exit, selection sort always searches for the minimum across the whole remaining part - comparisons don't depend on the initial order.",
      },
      hint: {
        ru: 'Подумай, может ли внутренний цикл поиска минимума когда-нибудь пропустить часть неотсортированного участка.',
        en: 'Think about whether the inner minimum-search loop can ever skip part of the unsorted range.',
      },
    },
    {
      question: {
        ru: 'Когда сортировка выбором особенно уместна?',
        en: 'When is selection sort particularly appropriate?',
      },
      options: [
        {
          ru: 'Когда операция записи заметно дороже операции сравнения',
          en: 'When a write operation is noticeably more expensive than a comparison',
        },
        {
          ru: 'Для сортировки многогигабайтных файлов на диске с ограниченной оперативной памятью',
          en: 'For sorting multi-gigabyte files on disk with limited available memory',
        },
        {
          ru: 'Когда данные почти отсортированы и нужен алгоритм с ранним завершением',
          en: 'When the data is nearly sorted and an early-exit algorithm is desired',
        },
        {
          ru: 'Для сортировки связных списков, где произвольный доступ к элементам недоступен',
          en: 'For sorting linked lists, where random access to elements is unavailable',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Минимизация количества перестановок - главное преимущество алгоритма, поэтому он оправдан там, где запись стоит дороже, чем чтение и сравнение.',
        en: "Minimizing the number of swaps is the algorithm's main advantage, so it pays off where writing costs more than reading and comparing.",
      },
      hint: {
        ru: 'Вспомни главное преимущество алгоритма из его описания - что именно он минимизирует ценой большего числа сравнений.',
        en: "Recall the algorithm's main advantage from its description - what exactly it minimizes at the cost of more comparisons.",
      },
    },
    {
      question: {
        ru: 'В чём главное отличие сортировки выбором от пузырьковой в терминах производительности?',
        en: 'What is the main performance difference between selection sort and bubble sort?',
      },
      options: [
        {
          ru: 'Сортировка выбором делает намного меньше перестановок, но столько же сравнений',
          en: 'Selection sort makes far fewer swaps but the same number of comparisons',
        },
        {
          ru: 'Сортировка выбором работает за O(n log n) благодаря более умному поиску минимума',
          en: 'Selection sort runs in O(n log n) thanks to a smarter way of locating the minimum',
        },
        {
          ru: 'Сортировка выбором требует O(n) дополнительной памяти для хранения промежуточных результатов',
          en: 'Selection sort needs O(n) extra memory to store intermediate results during sorting',
        },
        {
          ru: 'Разницы нет - оба алгоритма идентичны по производительности в любых сценариях',
          en: 'There is no difference - both algorithms perform identically in every scenario',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Оба алгоритма делают O(n²) сравнений, но сортировка выбором ограничивает число перестановок до n-1, тогда как пузырьковая может переставлять элементы почти при каждом сравнении.',
        en: 'Both make O(n²) comparisons, but selection sort caps swaps at n-1, while bubble sort can swap on almost every comparison.',
      },
      hint: {
        ru: 'Раздели вопрос на два отдельных счётчика: сколько сравнений и сколько перестановок делает каждый алгоритм.',
        en: 'Split the question into two separate counters: how many comparisons and how many swaps each algorithm performs.',
      },
    },
    {
      question: {
        ru: 'Какой классический алгоритм можно рассматривать как ускоренную версию шага «найти минимум» из сортировки выбором?',
        en: "Which classic algorithm can be seen as a sped-up version of selection sort's 'find the minimum' step?",
      },
      options: [
        {
          ru: 'Пирамидальная сортировка - находит минимум/максимум за O(log n) вместо O(n)',
          en: 'Heap sort - it finds the minimum/maximum in O(log n) instead of O(n)',
        },
        {
          ru: 'Сортировка слиянием - делит массив пополам и сливает отсортированные половины обратно',
          en: 'Merge sort - splits the array in half and merges the sorted halves back together',
        },
        {
          ru: 'Сортировка подсчётом - считает частоту каждого значения вместо сравнения элементов',
          en: 'Counting sort - tallies the frequency of each value instead of comparing elements',
        },
        {
          ru: 'Пузырьковая сортировка - многократно меняет местами соседние элементы не по порядку',
          en: 'Bubble sort - repeatedly swaps adjacent elements that are out of order with each other',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Пирамидальная сортировка хранит неотсортированную часть в виде кучи, поэтому извлечение следующего экстремального элемента стоит O(log n) вместо полного линейного просмотра - это и снижает общую сложность до O(n log n).',
        en: 'Heap sort keeps the unsorted part as a heap, so extracting the next extreme element costs O(log n) instead of a full linear scan - this is exactly what brings the total complexity down to O(n log n).',
      },
      hint: {
        ru: 'Подумай, какая структура данных позволяет находить минимум быстрее, чем перебором всех элементов подряд.',
        en: 'Think about what data structure lets you find a minimum faster than scanning every element one by one.',
      },
    },
    {
      question: {
        ru: 'Как можно сделать сортировку выбором устойчивой (stable), пожертвовав числом операций записи?',
        en: 'How can selection sort be made stable, at the cost of extra writes?',
      },
      options: [
        {
          ru: 'Вставлять найденный минимум на место сдвигом элементов, а не прямым обменом с границей',
          en: 'Insert the found minimum into place by shifting elements over, instead of directly swapping with the boundary',
        },
        {
          ru: 'Сортировать в обратном порядке, а затем полностью развернуть весь итоговый результат целиком в самом конце работы',
          en: 'Sort in reverse order and then completely reverse the entire final result afterward at the very end of the run',
        },
        {
          ru: 'Использовать два отдельных массива и постоянно копировать элементы туда и обратно между ними на каждом шаге',
          en: 'Use two separate arrays and constantly copy elements back and forth between them at every single step',
        },
        {
          ru: 'Это принципиально невозможно сделать для данного конкретного алгоритма никаким известным способом',
          en: 'It is fundamentally impossible to do for this particular algorithm by any known method whatsoever',
        },
      ],
      correct: 0,
      explanation: {
        ru: 'Устойчивость ломается именно из-за прямого обмена, который «перепрыгивает» через равный элемент. Если вместо обмена сдвигать элементы, освобождая место для минимума (как в сортировке вставками), относительный порядок равных элементов сохранится - ценой до O(n) записей за шаг вместо одной.',
        en: 'Stability breaks specifically because of the direct swap, which "jumps over" an equal element. If, instead of swapping, elements are shifted to make room for the minimum (like in insertion sort), the relative order of equal elements is preserved - at the cost of up to O(n) writes per step instead of one.',
      },
      hint: {
        ru: 'Подумай, что именно ломает устойчивость - сам обмен местами - и как избежать этого «перепрыгивания».',
        en: 'Think about what specifically breaks stability - the swap itself - and how you would avoid that "jump".',
      },
    },
  ],
};

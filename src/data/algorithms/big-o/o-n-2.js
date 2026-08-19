export const oN2 = {
  slug: 'o-n-2',
  category: 'big-o',
  name: { ru: 'O(n²) - Квадратичная Сложность', en: 'O(n²) - Quadratic Time' },
  complexity: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
  },
  popularity: 3,
  tags: ['quadratic', 'nested-loop', 'all-pairs'],

  intent: {
    ru: 'O(n²) - это когда объём работы растёт как квадрат размера входных данных. Вдвое больше данных - не вдвое, а вчетверо больше работы. Это класс, в котором живёт каждый код с циклом внутри цикла, где оба цикла зависят от одного и того же n - самый частый источник неожиданных тормозов, потому что на маленьких данных он выглядит совершенно безобидно.',
    en: 'O(n²) describes an algorithm whose work grows as the square of the input size. Twice the data does not mean twice the work - it means four times the work. This is the class every nested loop falls into when both loops depend on the same n - the most common source of surprise slowdowns, precisely because it looks perfectly harmless on small data.',
  },

  problem: {
    ru: 'Задачи вроде «сравнить каждый элемент с каждым другим» (найти дубликаты, отсортировать без лишней памяти, посчитать расстояние между всеми парами точек) естественным образом наводят на код с двумя вложенными циклами. На 10 элементах это 45 сравнений - мгновенно. На 10 000 - уже под 50 000 000, и разница между «работает» и «зависает» здесь не постепенная, а обвальная. Нужно уметь заранее увидеть эту опасность в коде, а не после того, как проект столкнётся с реальными объёмами данных.',
    en: 'Tasks like "compare every element against every other" (finding duplicates, sorting without extra memory, computing the distance between all pairs of points) naturally lead to code with two nested loops. On 10 elements that is 45 comparisons - instant. On 10,000 it is already close to 50,000,000, and the gap between "works fine" and "hangs" is not gradual, it is a cliff. Spotting this danger in the code ahead of time matters more than discovering it after the project meets real-world data volumes.',
  },

  solution: {
    ru: 'Алгоритм - O(n²), если в нём есть **два вложенных цикла, и оба зависят от размера входа n**: внешний проходит по n элементам, а внутри каждой его итерации - ещё один проход, тоже по n (или почти по n) элементам. Итоговое число операций - произведение `n · n = n²`. Узнать такой код просто: если убрать один из циклов, второй сам по себе был бы обычным O(n) - именно вложенность, а не сами циклы по отдельности, и даёт квадрат.',
    en: 'An algorithm is O(n²) if it has **two nested loops, both depending on the input size n**: the outer one walks n elements, and inside every single iteration of it sits another loop over n (or nearly n) elements. The total operation count is the product `n · n = n²`. The tell is simple: strip away either loop, and the other one alone would be an ordinary O(n) - it is the nesting itself, not either loop in isolation, that produces the square.',
  },

  steps: [
    {
      title: { ru: 'Каждый элемент - с каждым', en: 'Every element against every other' },
      explanation: {
        ru: 'При `n = 2` - 1 сравнение. При `n = 3` - уже 3 сравнения (каждый с каждым). Рост не постоянный, как у O(n) - он ускоряется вместе с самим n.',
        en: 'At `n = 2` there is 1 comparison. At `n = 3` there are already 3 (every element against every other). The growth is not steady like O(n) - it speeds up along with n itself.',
      },
    },
    {
      title: { ru: 'Кривая уходит вверх круче всех соседей', en: 'The curve climbs steeper than its linear neighbors' },
      explanation: {
        ru: 'Между `n = 4` и `n = 5` рост O(n) - плюс 1. Рост O(n²) - плюс 9 (с 16 до 25). Разница между соседними значениями сама растёт вместе с n.',
        en: 'Between `n = 4` and `n = 5`, O(n) grows by 1. O(n²) grows by 9 (from 16 to 25). The gap between neighboring values keeps growing along with n itself.',
      },
    },
    {
      title: { ru: 'Пример: Bubble Sort', en: 'Example: Bubble Sort' },
      explanation: {
        ru: 'Самый частый источник O(n²) - цикл внутри цикла. Bubble Sort сравнивает каждую пару соседних элементов на каждом из n проходов - `n` проходов по `n` элементов дают `n²`.',
        en: 'The typical source of O(n²) is a loop nested inside another loop. Bubble Sort compares neighboring pairs on each of n passes - `n` passes over `n` elements give `n²`.',
      },
    },
    {
      title: { ru: 'n = 8: 28 сравнений', en: 'n = 8: 28 comparisons' },
      explanation: {
        ru: '`8 · 7 / 2 = 28` сравнений - заметно больше, чем 8 у O(n) или 24 у O(n log n) на том же n. Разрыв только увеличивается дальше.',
        en: '`8 · 7 / 2 = 28` comparisons - noticeably more than the 8 of O(n) or the 24 of O(n log n) at the same n. The gap only widens from here.',
      },
    },
    {
      title: { ru: 'n = 10: ровно у потолка графика', en: 'n = 10: right at the top of the chart' },
      explanation: {
        ru: 'При `n = 10` значение O(n²) - ровно 100, то есть прямо в верхней границе графика. Не совпадение: 10² в точности равно 100 - шкала графика выбрана так, чтобы это было заметно.',
        en: 'At `n = 10`, O(n²) equals exactly 100 - right at the top edge of the chart. Not a coincidence: 10² is exactly 100, and the chart scale was chosen to make that visible.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}`,
    python: `def bubble_sort(arr):
    a = arr.copy()
    n = len(a)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Сигнатура и копия массива', en: 'Signature and the array copy' },
        explanation: {
          ru: '`bubbleSort` принимает массив `arr` и работает с копией `a`, не трогая исходный массив вызывающего кода.',
          en: '`bubbleSort` takes an array `arr` and works on a copy `a`, leaving the caller\'s original array untouched.',
        },
      },
      {
        lines: [3],
        title: { ru: 'Внешний цикл: n - 1 проход', en: 'The outer loop: n - 1 passes' },
        explanation: {
          ru: '`for (let i = 0; i < a.length - 1; i++)` - внешний цикл выполняется почти n раз. Сам по себе, без ничего внутри, он был бы обычным O(n).',
          en: '`for (let i = 0; i < a.length - 1; i++)` runs the outer loop nearly n times. On its own, with nothing inside it, this would be a plain O(n).',
        },
      },
      {
        lines: [4],
        title: { ru: 'Внутренний цикл: ещё n итераций на каждый проход', en: 'The inner loop: another n iterations per pass' },
        explanation: {
          ru: '`for (let j = 0; j < a.length - 1 - i; j++)` - внутри каждой из n итераций внешнего цикла запускается ещё один цикл, тоже почти по n элементам. Именно эта вложенность и умножает n на n.',
          en: '`for (let j = 0; j < a.length - 1 - i; j++)` runs another loop, also over nearly n elements, inside every single one of the outer loop\'s n iterations. This nesting is exactly what multiplies n by n.',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Сравнение и обмен', en: 'The comparison and swap' },
        explanation: {
          ru: '`if (a[j] > a[j + 1])` и обмен местами - постоянная работа на каждую пару, не зависящая от n. Она не меняет класс сложности, только константу перед n².',
          en: '`if (a[j] > a[j + 1])` and the swap - constant work per pair, independent of n. It does not change the complexity class, only the constant factor in front of n².',
        },
      },
      {
        lines: [10],
        title: { ru: 'Итог: около n² / 2 сравнений', en: 'The total: roughly n² / 2 comparisons' },
        explanation: {
          ru: 'Суммарно все проходы дают `(n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2` сравнений - при n = 9 это 36. Множитель `1/2` не влияет на класс: O(n²/2) записывается точно так же, как O(n²).',
          en: 'Summed across all passes, that is `(n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2` comparisons - 36 at n = 9. The `1/2` factor does not change the class: O(n²/2) is written exactly the same as O(n²).',
        },
      },
    ],
    python: [
      {
        lines: [1, 2, 3],
        title: { ru: 'Сигнатура и копия массива', en: 'Signature and the array copy' },
        explanation: {
          ru: '`bubble_sort` принимает список `arr`, копирует его в `a` и сохраняет длину `n` - тот же контракт, что и в JS-версии.',
          en: '`bubble_sort` takes a list `arr`, copies it into `a`, and stores the length `n` - the same contract as the JS version.',
        },
      },
      {
        lines: [4],
        title: { ru: 'Внешний цикл: n - 1 проход', en: 'The outer loop: n - 1 passes' },
        explanation: {
          ru: '`for i in range(n - 1)` - тот же самый внешний проход по почти n элементам, что и `for` в JS.',
          en: '`for i in range(n - 1)` is the same outer pass over nearly n elements as the JS `for`.',
        },
      },
      {
        lines: [5],
        title: { ru: 'Внутренний цикл: ещё n итераций на каждый проход', en: 'The inner loop: another n iterations per pass' },
        explanation: {
          ru: '`for j in range(n - 1 - i)` - тот же вложенный цикл, что и в JS: ещё почти n итераций внутри каждой итерации внешнего.',
          en: '`for j in range(n - 1 - i)` is the same nested loop as in JS: another nearly-n iterations inside every outer iteration.',
        },
      },
      {
        lines: [6, 7],
        title: { ru: 'Сравнение и обмен', en: 'The comparison and swap' },
        explanation: {
          ru: '`if a[j] > a[j + 1]:` и обмен местами кортежным присваиванием - та же константная работа на пару, что и в JS.',
          en: '`if a[j] > a[j + 1]:` and the tuple-assignment swap - the same constant work per pair as in JS.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Итог: около n² / 2 сравнений', en: 'The total: roughly n² / 2 comparisons' },
        explanation: {
          ru: '`return a` завершает функцию после `n(n - 1) / 2` сравнений в сумме - тот же итог, что и в JS-версии.',
          en: '`return a` finishes the function after `n(n - 1) / 2` comparisons in total - the same total as the JS version.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Код почти всегда простой и прямолинейный: два цикла, понятные с первого взгляда, без хитрых структур данных или трюков.',
      en: 'The code is almost always simple and direct: two loops, understandable at a glance, no clever data structures or tricks required.',
    },
    {
      ru: 'На маленьких и умеренных n (примерно до нескольких тысяч элементов) реальное время работы остаётся приемлемым, а простота кода перевешивает выигрыш от более сложной O(n log n)-альтернативы.',
      en: 'At small to moderate n (roughly up to a few thousand elements), real running time stays acceptable, and the code\'s simplicity outweighs the benefit of a more complex O(n log n) alternative.',
    },
    {
      ru: 'Не требует дополнительной памяти под структуры вроде хеш-таблиц или деревьев - обычно работает прямо на входных данных, in-place.',
      en: 'Needs no extra memory for structures like hash tables or trees - it typically works directly on the input data, in place.',
    },
  ],
  cons: [
    {
      ru: 'На больших n становится непригодным очень резко: 10 000 элементов - уже около 50 000 000 операций, 1 000 000 элементов - около 500 000 000 000.',
      en: 'Becomes unusable very abruptly at scale: 10,000 elements is already about 50,000,000 operations, 1,000,000 elements is about 500,000,000,000.',
    },
    {
      ru: 'Для большинства задач, где применяется O(n²) (в первую очередь сортировка), существует O(n log n)-альтернатива - выбор квадратичного варианта на реальных объёмах данных почти всегда упущенная оптимизация, а не необходимость.',
      en: 'For most problems where O(n²) shows up (sorting being the classic one), an O(n log n) alternative exists - choosing the quadratic option at real data volumes is almost always a missed optimization, not a necessity.',
    },
    {
      ru: 'Вложенный цикл легко спрятать случайно: вызов линейной операции (например, поиска в массиве) внутри другого цикла того же размера превращает безобидный на вид O(n) в O(n²) незаметно для автора кода.',
      en: 'A nested loop is easy to hide by accident: calling a linear operation (like an array search) inside another loop of the same size quietly turns a seemingly harmless O(n) into O(n²) without the author noticing.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда n заведомо маленькое или умеренное (примерно до нескольких тысяч) и простота кода важнее выжимания последних миллисекунд.',
      en: 'When n is known to be small or moderate (roughly up to a few thousand) and code simplicity matters more than squeezing out the last few milliseconds.',
    },
    {
      ru: 'Когда задача по своей природе требует сравнить все пары элементов между собой (расстояние между всеми точками, попарные коллизии) и более быстрой структуры для неё нет.',
      en: 'When the task inherently requires comparing every pair of elements against each other (all-pairs distances, pairwise collisions) and no faster structure applies to it.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Bubble Sort и Insertion Sort** (в разделе сортировок) - классические примеры вложенного цикла, дающего O(n²) в среднем и худшем случае.',
      en: '**Bubble Sort and Insertion Sort** (in the sorting section) - the classic examples of a nested loop producing O(n²) on average and in the worst case.',
    },
    {
      ru: '**Наивная проверка на дубликаты** двумя вложенными циклами (`for x of arr { for y of arr { ... } }`) - до появления `Set` или хеш-таблицы это был стандартный подход.',
      en: '**Naive duplicate detection** with two nested loops (`for x of arr { for y of arr { ... } }`) - the standard approach before `Set` or hash tables became the go-to fix.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Формально O(n²) означает: работа не превышает `c · n²` для некоторой константы `c`, начиная с какого-то размера входа. У `bubbleSort` точное число сравнений - `n(n - 1) / 2`, то есть `c = 1/2`. Это тот же порядок роста, что и у `n²` без множителя - Big O описывает **форму** кривой, а не точный коэффициент перед ней.',
        en: 'Formally, O(n²) means the work does not exceed `c · n²` for some constant `c`, from some input size onward. `bubbleSort`\'s exact comparison count is `n(n - 1) / 2`, so `c = 1/2`. That is the same growth order as plain `n²` with no factor at all - Big O describes the **shape** of the curve, not the exact coefficient in front of it.',
      },
      {
        ru: 'Числа растут пугающе быстро. При `n = 1 000` - около **499 500** сравнений, меньше полумиллиона, ещё терпимо. При `n = 1 000 000` - уже **499 999 500 000**, то есть почти **полтриллиона**. Данные выросли в 1000 раз, а работа - примерно в **1 000 000 раз**, а не в 1000: рост здесь квадратичный по отношению к росту самих данных, `k²` при `k`-кратном увеличении n.',
        en: 'The numbers grow at an alarming pace. At `n = 1,000`, it is about **499,500** comparisons, still under half a million, still tolerable. At `n = 1,000,000`, it is **499,999,500,000**, nearly **half a trillion**. The input grew 1000x, and the work grew by roughly **1,000,000x**, not 1000x: the growth is quadratic relative to the growth of the data itself, `k²` for a `k`-fold increase in n.',
      },
      {
        ru: 'Структурно причина всегда одна: **два цикла, вложенных друг в друга, и оба зависящие от n**. У `bubbleSort` внешний цикл проходит по `i` от 0 до почти n, а внутри каждой его итерации - ещё цикл по `j`, тоже до почти n. Если убрать внешний цикл и оставить только внутренний, получился бы обычный O(n) проход - именно комбинация двух таких проходов и даёт квадрат.',
        en: 'Structurally the cause is always the same: **two loops nested inside each other, both depending on n**. `bubbleSort`\'s outer loop runs `i` from 0 to nearly n, and inside every one of its iterations sits another loop over `j`, also up to nearly n. Strip away the outer loop and keep only the inner one, and it would be an ordinary O(n) pass - it is the combination of two such passes that produces the square.',
      },
      {
        ru: 'O(n²) не обязательно означает «ровно n²»: `n(n - 1) / 2` (треугольное число, как у `bubbleSort`), `3n²`, `n² / 4` - всё это один и тот же класс O(n²), потому что все они растут пропорционально квадрату n с точностью до постоянного множителя. Отличать их по названию бессмысленно - важна форма кривой, а не число перед `n²`.',
        en: 'O(n²) does not have to mean literally "n squared": `n(n - 1) / 2` (a triangular number, like `bubbleSort`\'s), `3n²`, `n² / 4` - all of these are the same O(n²) class, because all of them grow proportionally to the square of n up to a constant factor. Distinguishing them by name is pointless - the shape of the curve matters, not the number in front of `n²`.',
      },
      {
        ru: 'Сортировка не обязана быть O(n²) - Merge Sort и другие алгоритмы разделяй-и-властвуй (уже разобраны в материале про O(n log n)) решают ту же задачу за `n log n`, заметно быстрее при больших n. Но на маленьких массивах (примерно до пары десятков элементов) простой вложенный цикл Bubble Sort или Insertion Sort часто оказывается быстрее на практике - у рекурсии `mergeSort` есть собственные накладные расходы, которые перевешивают выигрыш от `log n`, пока n не станет достаточно большим.',
        en: 'Sorting does not have to be O(n²) - Merge Sort and other divide-and-conquer algorithms (already covered in the O(n log n) material) solve the same problem in `n log n`, noticeably faster at large n. But on small arrays (roughly up to a couple dozen elements), a plain nested-loop Bubble Sort or Insertion Sort is often faster in practice - `mergeSort`\'s recursion carries its own overhead that outweighs the `log n` gain until n grows large enough.',
      },
      {
        ru: 'Некоторые задачи, которые выглядят как «нужно сравнить всё со всем», на самом деле не обязаны быть O(n²) - построение выпуклой оболочки (уже упомянуто в материале про O(n log n)) наивно кажется перебором всех пар точек, но алгоритмы вроде Quickhull решают её за `n log n`, находя структуру в задаче вместо честного перебора. Настоящий O(n²) остаётся только там, где такой структуры нет и сравнить действительно нужно каждую пару - например, точный расчёт попарных расстояний между всеми точками.',
        en: 'Some problems that look like "compare everything against everything" do not actually have to be O(n²) - convex hull construction (already mentioned in the O(n log n) material) naively looks like checking every pair of points, but algorithms like Quickhull solve it in `n log n` by finding structure in the problem instead of brute-forcing it. True O(n²) survives only where no such structure exists and every pair genuinely must be compared - for instance, an exact pairwise distance calculation between every pair of points.',
      },
    ],
    whenToUse: [
      {
        ru: '**Малые и умеренные n** - до нескольких тысяч элементов, где абсолютное время выполнения всё ещё измеряется миллисекундами, а не секундами или минутами.',
        en: '**Small to moderate n** - up to a few thousand elements, where the absolute running time is still measured in milliseconds, not seconds or minutes.',
      },
      {
        ru: '**Задачи, генуинно требующие всех пар** - попарные расстояния, коллизии, корреляционные матрицы - там, где для конкретной задачи не существует более быстрой структуры.',
        en: '**Tasks that genuinely need every pair** - pairwise distances, collision checks, correlation matrices - where no faster structure exists for that specific problem.',
      },
      {
        ru: '**Против O(n log n)** - как только n выходит за пределы «маленького» (обычно уже на паре тысяч элементов), для сортировки и похожих задач почти всегда стоит переходить на алгоритм с более быстрым классом сложности.',
        en: '**Against O(n log n)** - once n grows past "small" (usually already in the low thousands), sorting and similar tasks almost always call for switching to an algorithm with a faster complexity class.',
      },
      {
        ru: '**Как индикатор скрытой проблемы** - если в коде обнаружился неожиданный вложенный цикл (например, линейный поиск внутри другого цикла), это почти всегда сигнал пересмотреть структуру данных, а не мириться с квадратом.',
        en: '**As a red flag, not a design goal** - discovering an unexpected nested loop in the code (like a linear search inside another loop) is almost always a signal to reconsider the data structure, not to accept the quadratic cost.',
      },
    ],
    realWorld: [
      {
        ru: '**Bubble Sort, Insertion Sort и Selection Sort** (в разделе сортировок) - три классических примера квадратичной сортировки через вложенный цикл, каждый со своим вариантом того, что именно повторяется на внутреннем проходе.',
        en: '**Bubble Sort, Insertion Sort, and Selection Sort** (in the sorting section) - three classic examples of quadratic sorting via a nested loop, each with its own take on what exactly repeats on the inner pass.',
      },
      {
        ru: '**Наивные физические движки** - проверка коллизий каждого объекта с каждым другим (`for i { for j { ... } }`) без пространственного разбиения даёт O(n²) на числе объектов сцены.',
        en: '**Naive physics engines** - checking every object for collision against every other object (`for i { for j { ... } }`) with no spatial partitioning produces O(n²) in the number of scene objects.',
      },
      {
        ru: '**Корреляционные и дистанционные матрицы** в анализе данных - строки для n точек данных, где каждая пара сравнивается по отдельности, естественным образом дают таблицу размером n².',
        en: '**Correlation and distance matrices** in data analysis - built for n data points where every pair is compared individually, naturally producing an n²-sized table.',
      },
      {
        ru: '**Наивное сравнение строк на схожесть** (например, посимвольное сравнение всех пар строк в списке без индекса) - количество пар растёт как n², даже если сравнение одной пары само по себе быстрое.',
        en: '**Naive string similarity comparison** (for example, comparing every pair of strings in a list character by character with no index) - the number of pairs grows as n², even when comparing a single pair is itself fast.',
      },
    ],
  },

  relatedAlgorithms: ['o-n-log-n', 'o-n', 'o-n-3'],

  quiz: [
    {
      question: {
        ru: 'Как меняется объём работы у алгоритма класса O(n²), если данные увеличить вдвое?',
        en: 'How does the amount of work in an O(n²) algorithm change if the input doubles?',
      },
      options: [
        { ru: 'Увеличивается вчетверо, а не вдвое - работа растёт как квадрат размера входа', en: 'It quadruples, not doubles - the work grows as the square of the input size' },
        { ru: 'Увеличивается ровно вдвое, точно вместе с тем, во сколько раз выросли сами данные', en: 'It exactly doubles, matching how much the data itself grew' },
        { ru: 'Не меняется вообще, сколько бы данных ни было на входе алгоритма', en: 'It does not change at all, no matter how much input the algorithm receives' },
        { ru: 'Увеличивается всего на одну дополнительную операцию сверх прежнего объёма', en: 'It increases by just one single extra operation on top of the previous total amount' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это и есть определение O(n²): при увеличении n в k раз работа растёт в k² раз - вдвое больше данных даёт вчетверо больше работы.',
        en: 'That is the definition of O(n²): when n grows k times, the work grows k² times - twice the data means four times the work.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - там прямо написано про рост «вчетверо, а не вдвое».',
        en: 'See the "Intent" tab - it directly states the "four times, not twice" growth.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде почти всегда можно узнать O(n²)?',
        en: 'What code pattern almost always signals O(n²)?',
      },
      options: [
        { ru: 'Два цикла один внутри другого, и оба зависят от размера входных данных', en: 'Two loops nested inside each other, both depending on the input size' },
        { ru: 'Один цикл без вложенности, который проходит по всем элементам один раз', en: 'A single, non-nested loop that walks every element once' },
        { ru: 'Рекурсия, которая на каждом шаге делит входные данные примерно пополам', en: 'Recursion that roughly halves the input data on every step' },
        { ru: 'Код вообще без циклов - только фиксированный набор действий заранее', en: 'Code with no loops at all - just a fixed set of operations decided ahead of time' },
      ],
      correct: 0,
      explanation: {
        ru: 'Два вложенных цикла, оба зависящие от n, - именно это делает `bubbleSort` на вкладке «Реализация».',
        en: 'Two nested loops, both depending on n, are exactly what `bubbleSort` does on the "Implementation" tab.',
      },
      hint: {
        ru: 'Смотрите строки 3-4 функции `bubbleSort` на вкладке «Реализация» и шаг «Внутренний цикл».',
        en: 'See lines 3-4 of `bubbleSort` on the "Implementation" tab and its walkthrough step about the inner loop.',
      },
    },
    {
      question: {
        ru: 'На графике: что происходит с линией O(n²) при n = 10?',
        en: 'On the visualization chart: what happens to the O(n²) line at n = 10?',
      },
      options: [
        { ru: 'Она достигает ровно верхней границы графика - 100, потому что 10² = 100', en: 'It reaches exactly the top edge of the chart - 100, because 10² = 100' },
        { ru: 'Она остаётся у самого нижнего края графика, почти не отрываясь от нуля', en: 'It stays right at the bottom edge of the chart, barely rising off zero' },
        { ru: 'Она идёт вровень с линией O(n), обе линии сливаются в одну на этом участке', en: 'It runs level with the O(n) line, the two lines merge into one at this point' },
        { ru: 'Она обгоняет линию O(2ⁿ), которая к этому моменту ещё заметно ниже неё', en: 'It overtakes the O(2ⁿ) line, which is still noticeably below it at this point' },
      ],
      correct: 0,
      explanation: {
        ru: 'Шкала графика ограничена сотней, и ровно при n = 10 значение O(n²) достигает этого предела - не случайность, а прямое следствие 10² = 100.',
        en: 'The chart scale caps at a hundred, and O(n²) reaches exactly that limit at n = 10 - not a coincidence, a direct consequence of 10² = 100.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и посмотрите, где линия O(n²) находится при n = 10.',
        en: 'Open the "Visualization" tab and check where the O(n²) line sits at n = 10.',
      },
    },
    {
      question: {
        ru: 'Почему у `bubbleSort` число сравнений - `n(n - 1) / 2`, а не ровно `n²`, но класс всё равно называют O(n²)?',
        en: 'Why is `bubbleSort`\'s comparison count `n(n - 1) / 2`, not exactly `n²`, yet the class is still called O(n²)?',
      },
      options: [
        { ru: 'Big O описывает форму роста, а постоянные множители вроде `1/2` в записи опускаются', en: 'Big O describes the shape of growth, and constant factors like `1/2` are dropped from the notation' },
        { ru: 'Это ошибка в классификации - правильнее было бы называть `bubbleSort` алгоритмом O(n)', en: 'This is a classification error - `bubbleSort` should really have been labeled a plain O(n) algorithm instead' },
        { ru: 'Множитель `1/2` появляется только на нечётных значениях n, на чётных его нет вовсе', en: 'The `1/2` factor only appears at odd values of n, it is entirely absent at even ones' },
        { ru: '`n(n - 1) / 2` и `n²` - на самом деле два совершенно разных класса сложности', en: '`n(n - 1) / 2` and `n²` are actually two entirely separate, unrelated complexity classes' },
      ],
      correct: 0,
      explanation: {
        ru: '`n(n - 1) / 2` растёт пропорционально квадрату n с точностью до постоянного множителя - именно форма роста определяет класс, а не точный коэффициент.',
        en: '`n(n - 1) / 2` grows proportionally to the square of n up to a constant factor - it is the shape of the growth that defines the class, not the exact coefficient.',
      },
      hint: {
        ru: 'Смотрите первый и четвёртый абзацы раздела «Как это работает» на вкладке «Суть».',
        en: 'See the first and fourth "Deep dive" paragraphs on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Данные выросли с 1 000 до 1 000 000 элементов - в 1000 раз. Во сколько раз выросла работа у O(n²)-алгоритма?',
        en: 'The data grew from 1,000 to 1,000,000 elements - 1000x. By what factor did the work of an O(n²) algorithm grow?',
      },
      options: [
        { ru: 'Примерно в 1 000 000 раз - рост данных в k раз даёт рост работы в k² раз', en: 'By roughly 1,000,000x - a k-fold growth in data produces a k²-fold growth in work' },
        { ru: 'Ровно в 1000 раз, вместе с тем, во сколько раз выросли сами данные', en: 'By exactly 1000x, matching how much the data itself grew' },
        { ru: 'Всего примерно на 10 дополнительных операций, а не в 1 000 000 раз', en: 'By only about 10 extra operations, not by a factor of 1,000,000' },
        { ru: 'Работа не изменилась вообще ни капли - O(n²) не зависит от абсолютного размера n', en: 'The work did not change at all - O(n²) does not depend on the absolute size of n in any way' },
      ],
      correct: 0,
      explanation: {
        ru: '1000-кратный рост n даёт рост работы в 1000² = 1 000 000 раз: с 499 500 до 499 999 500 000.',
        en: 'A 1000x growth in n produces a 1000² = 1,000,000x growth in work: from 499,500 to 499,999,500,000.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть» - там разобраны точные числа.',
        en: 'See the second "Deep dive" paragraph on the "Intent" tab - it works through the exact numbers.',
      },
    },
    {
      question: {
        ru: 'Почему на маленьких массивах (скажем, до пары десятков элементов) Bubble Sort часто оказывается быстрее Merge Sort на практике, хотя у Merge Sort лучший класс сложности?',
        en: 'Why is Bubble Sort often faster than Merge Sort in practice on small arrays (say, up to a couple dozen elements), even though Merge Sort has the better complexity class?',
      },
      options: [
        { ru: 'У рекурсии Merge Sort есть собственные накладные расходы, которые на маленьком n перевешивают выигрыш от log n', en: "Merge Sort's recursion carries its own overhead, which outweighs the log n gain at small n" },
        { ru: 'Big O-классы вообще не имеют никакого значения на практике ни при каком размере входных данных, вообще никогда', en: 'Big O classes have no practical meaning at all, regardless of input size' },
        { ru: 'На самом деле Merge Sort быстрее в этом случае тоже - утверждение в вопросе неверно', en: 'Merge Sort is actually faster in this exact case too - the whole premise of the question is simply false' },
        { ru: 'Bubble Sort на маленьких массивах перестаёт быть O(n²) и становится O(n)', en: 'Bubble Sort stops being O(n²) entirely on small arrays and becomes O(n) instead' },
      ],
      correct: 0,
      explanation: {
        ru: 'Big O игнорирует константы и накладные расходы - на маленьком n они могут решать больше, чем сам класс роста, поэтому простой O(n²)-алгоритм иногда обгоняет асимптотически более быстрый O(n log n).',
        en: 'Big O ignores constants and overhead - at small n those can matter more than the growth class itself, so a simple O(n²) algorithm sometimes outruns an asymptotically faster O(n log n) one.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» - про Merge Sort и накладные расходы рекурсии.',
        en: 'See the fifth "Deep dive" paragraph on the "Intent" tab - about Merge Sort and its recursion overhead.',
      },
    },
    {
      question: {
        ru: 'Построение выпуклой оболочки (convex hull) выглядит как «сравнить все пары точек», но реальные алгоритмы решают её за O(n log n). Как это возможно?',
        en: 'Convex hull construction looks like "compare every pair of points", yet real algorithms solve it in O(n log n). How is that possible?',
      },
      options: [
        { ru: 'Алгоритмы вроде Quickhull находят структуру в задаче и не сравнивают буквально каждую пару', en: 'Algorithms like Quickhull find structure in the problem instead of literally comparing every pair' },
        { ru: 'Это неверно - выпуклую оболочку в принципе невозможно построить быстрее O(n²)', en: 'This is false - a convex hull can never be built faster than O(n²) in principle' },
        { ru: 'O(n log n) здесь достигается только за счёт использования параллельных вычислений', en: 'The O(n log n) result here only comes from relying on parallel computation' },
        { ru: 'Задача заведомо упрощается - реальный алгоритм строит не точную, а приблизительную оболочку', en: 'The task is quietly simplified - the real algorithm builds only an approximate hull, not an exact one' },
      ],
      correct: 0,
      explanation: {
        ru: 'Не любая задача, которая «звучит» как перебор всех пар, обязана им быть - если в задаче есть структура (как в геометрии точек), алгоритм может воспользоваться ею и обойти честный O(n²).',
        en: 'Not every task that "sounds like" checking all pairs is actually forced to - if the problem has structure (as with points in geometry), an algorithm can exploit it and sidestep a genuine O(n²).',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» на вкладке «Суть» - про convex hull и Quickhull.',
        en: 'See the last "Deep dive" paragraph on the "Intent" tab - about convex hull and Quickhull.',
      },
    },
    {
      question: {
        ru: 'Чем `bubbleSort` (O(n²)) структурно отличается от `mergeSort` (O(n log n), уже разобран в материале про линеарифмическую сложность)?',
        en: 'How does `bubbleSort` (O(n²)) structurally differ from `mergeSort` (O(n log n), already covered in the linearithmic time material)?',
      },
      options: [
        { ru: 'У bubbleSort - n полных проходов друг за другом, у mergeSort - log n уровней рекурсии с O(n) работы на каждом', en: 'bubbleSort runs n full passes back to back, while mergeSort has log n recursion levels with O(n) work each' },
        { ru: 'mergeSort вообще не использует никакие сравнения элементов, только прямую перестановку по заранее известным индексам', en: 'mergeSort uses no element comparisons at all, only direct repositioning by pre-known indices' },
        { ru: 'bubbleSort делает меньше сравнений на каждый элемент, чем mergeSort делает в лучшем случае', en: 'bubbleSort performs noticeably fewer comparisons per element than mergeSort ever does, even in its own best case' },
        { ru: 'Структурной разницы нет - у обоих в сумме одинаковое количество операций на любом n', en: 'There is no structural difference - both perform the same total number of operations at any n' },
      ],
      correct: 0,
      explanation: {
        ru: 'n проходов по n элементов дают n · n = n², а log n уровней по O(n) работы каждый дают n · log n - заметно меньше при больших n.',
        en: 'n passes over n elements give n · n = n², while log n levels of O(n) work each give n · log n - noticeably smaller at large n.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - прямое сравнение структуры двух алгоритмов.',
        en: 'See the third "Deep dive" paragraph on the "Intent" tab - a direct comparison of the two algorithms\' structure.',
      },
    },
    {
      question: {
        ru: 'Нужно посчитать точное расстояние между каждой парой из 100 000 точек на плоскости, без каких-либо приближений. Можно ли в общем случае избежать O(n²)?',
        en: 'The task is to compute the exact distance between every pair of 100,000 points on a plane, with no approximations allowed. Can O(n²) be avoided in the general case?',
      },
      options: [
        { ru: 'Нет - если действительно нужны все n(n - 1) / 2 пар без исключения, меньше пар просто не бывает', en: 'No - if all n(n - 1) / 2 pairs are genuinely required with no exceptions, there simply cannot be fewer pairs than that' },
        { ru: 'Да - для абсолютно любой задачи с полным перебором всех пар почти всегда существует O(n log n)-решение', en: 'Yes - an O(n log n) solution always exists for any task that involves checking every pair' },
        { ru: 'Да - достаточно просто переписать вложенный цикл через рекурсию, и класс станет O(n log n)', en: 'Yes - simply rewriting the nested loop as plain recursion is already enough on its own to make the whole class O(n log n)' },
        { ru: 'Вопрос некорректен - расстояние между точками вообще нельзя посчитать за конечное время', en: 'The question itself is malformed - the distance between points cannot be computed in finite time at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если задача действительно требует результат для каждой из n(n - 1) / 2 пар (а не только, например, ближайшую пару), меньше n² операций физически не получится - в отличие от convex hull, здесь нет структуры, которую можно использовать для сокращения перебора.',
        en: 'If the task genuinely requires an output for every one of the n(n - 1) / 2 pairs (not, say, just the closest pair), fewer than n² operations is not physically possible - unlike convex hull, there is no structure here to exploit to shrink the search.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» на вкладке «Суть» - там объясняется разница между «есть структура» и «структуры нет».',
        en: 'See the last "Deep dive" paragraph on the "Intent" tab - it explains the difference between "structure exists" and "no structure exists".',
      },
    },
    {
      question: {
        ru: 'Код вида `for (const x of arr) { if (otherArr.includes(x)) { ... } }`, где `arr` и `otherArr` - оба длиной n. Какой у него реальный класс сложности?',
        en: 'Code like `for (const x of arr) { if (otherArr.includes(x)) { ... } }`, where both `arr` and `otherArr` have length n - what is its real complexity class?',
      },
      options: [
        { ru: 'O(n²) - includes сам по себе линейный проход, вложенный в другой линейный проход того же размера', en: 'O(n²) - includes is itself a linear pass, nested inside another linear pass of the same size' },
        { ru: 'O(n) - в коде виден только один явный цикл for, а значит вся сложность здесь всегда целиком линейна', en: 'O(n) - only one explicit for loop is visible in the code, so the whole complexity must be linear' },
        { ru: 'O(log n) - includes будто бы всегда использует бинарный поиск внутри массива otherArr', en: 'O(log n) - includes supposedly always relies on binary search inside the array' },
        { ru: 'O(1) - includes якобы выполняется за постоянное время независимо от длины otherArr', en: 'O(1) - includes allegedly always runs in constant time regardless of the length of otherArr' },
      ],
      correct: 0,
      explanation: {
        ru: '`.includes()` - это ещё один проход по массиву длиной n, вызванный на каждой из n итераций внешнего цикла: n · n = n², даже без единого явного вложенного `for`.',
        en: '`.includes()` is another pass over an n-length array, called on every one of the outer loop\'s n iterations: n · n = n², even without a single explicit nested `for`.',
      },
      hint: {
        ru: 'Смотрите третий пункт «Минусы» на вкладке «Плюсы и минусы» - про случайно спрятанный вложенный цикл.',
        en: 'See the third "Cons" item on the "Pros & Cons" tab - about an accidentally hidden nested loop.',
      },
    },
  ],
};

export const oN3 = {
  slug: 'o-n-3',
  category: 'big-o',
  name: { ru: 'O(n³) - Кубическая Сложность', en: 'O(n^3) - Cubic Time' },
  complexity: {
    time: { best: 'O(n³)', average: 'O(n³)', worst: 'O(n³)' },
    space: 'O(n²)',
  },
  popularity: 2,
  tags: ['cubic', 'triple-nested-loop', 'matrix-multiplication'],
  tier: 'slow',

  intent: {
    ru: 'O(n³) - это когда объём работы растёт как куб размера входных данных: три вложенных цикла, и все три зависят от одного и того же n. Вдвое больше данных - не вчетверо, как у O(n²), а в восемь раз больше работы. Это класс, где цена лишнего уровня вложенности особенно заметна: третий цикл добавляет не ещё немного работы, а умножает всё, что было, на n.',
    en: 'O(n^3) describes an algorithm whose work grows as the cube of the input size: three nested loops, all three depending on the same n. Twice the data does not mean four times the work like O(n²) - it means eight times the work. This is the class where the cost of one more level of nesting really shows: the third loop does not add a bit more work, it multiplies everything that came before it by n.',
  },

  problem: {
    ru: 'Умножение двух матриц размера n×n - естественная задача с тройной структурой: результат тоже n×n, и каждая из его n² ячеек требует своей собственной суммы из n произведений. Записать это напрямую - значит получить три вложенных цикла: по строкам, по столбцам, по элементам суммы. На матрицах 10×10 это 1000 операций - ничтожно мало. На 1000×1000 - уже миллиард, и разница между «мгновенно» и «минутами» здесь скрыта в третьем, самом незаметном уровне вложенности.',
    en: 'Multiplying two n-by-n matrices is a naturally three-dimensional problem: the result is also n-by-n, and each of its n² cells needs its own sum of n products. Writing this directly produces three nested loops: over rows, over columns, over the terms of the sum. On 10x10 matrices that is 1,000 operations, nothing. On 1000x1000 it is already a billion, and the gap between "instant" and "minutes" is hiding in that third, easiest-to-miss level of nesting.',
  },

  solution: {
    ru: 'Алгоритм - O(n³), если в нём есть **три вложенных цикла, и все три зависят от размера входа n**. Узнать такой код можно, посчитав уровни вложенности: если убрать самый внутренний цикл, останется обычный O(n²) - именно третий уровень и делает из квадрата куб. Итоговое число операций - произведение `n · n · n = n³`, то есть каждый из n² «внешних» шагов дополнительно требует ещё n операций внутри.',
    en: 'An algorithm is O(n^3) if it has **three nested loops, all three depending on the input size n**. The tell is counting nesting levels: strip away the innermost loop, and what remains is an ordinary O(n²) - it is that third level that turns a square into a cube. The total operation count is the product `n · n · n = n^3`: each of the n² "outer" steps needs another n operations inside it.',
  },

  steps: [
    {
      title: { ru: 'Тройная вложенность - куб, а не квадрат', en: 'Triple nesting, a cube not a square' },
      explanation: {
        ru: 'При `n = 2` работа - `2³ = 8`. При `n = 3` - уже `3³ = 27`. Каждый новый уровень вложенности умножает результат ещё на один множитель n.',
        en: 'At `n = 2` the work is `2^3 = 8`. At `n = 3` it is already `3^3 = 27`. Each extra level of nesting multiplies the result by one more factor of n.',
      },
    },
    {
      title: { ru: 'Круче параболы O(n²)', en: 'Steeper than the O(n²) parabola' },
      explanation: {
        ru: 'Между `n = 4` и `n = 5` рост O(n²) - плюс 9 (с 16 до 25). Рост O(n³) на том же шаге - плюс 61 (с 64 до 125). Третий множитель n делает разницу между соседними значениями заметно больше.',
        en: 'Between `n = 4` and `n = 5`, O(n²) grows by 9 (from 16 to 25). O(n^3) grows by 61 on the same step (from 64 to 125). The third factor of n makes the gap between neighboring values noticeably larger.',
      },
    },
    {
      title: { ru: 'Пример: умножение матриц', en: 'Example: matrix multiplication' },
      explanation: {
        ru: 'Самый частый источник O(n³) - наивное умножение матриц. У результата n² ячеек, и каждая требует своей суммы из n произведений - `n² · n = n³`.',
        en: 'The typical source of O(n^3) is naive matrix multiplication. The result has n² cells, and each needs its own sum of n products - `n² · n = n^3`.',
      },
    },
    {
      title: { ru: 'n = 8: 512 операций', en: 'n = 8: 512 operations' },
      explanation: {
        ru: '`8³ = 512` - заметно больше, чем 64 у O(n²) или 24 у O(n log n) на том же n. Разрыв растёт быстрее, чем у любого из младших классов.',
        en: '`8^3 = 512` - noticeably more than the 64 of O(n²) or the 24 of O(n log n) at the same n. The gap widens faster than for any of the smaller classes.',
      },
    },
    {
      title: { ru: 'Уходит за край графика раньше, чем O(n²)', en: 'Leaves the chart earlier than O(n²)' },
      explanation: {
        ru: 'O(n²) ровно достигает потолка графика (100) при n = 10. O(n³) достигает того же потолка уже при n ≈ 4.6 - и к n = 10 успевает вырасти до 1000, вдесятеро выше верхней границы.',
        en: 'O(n²) lands exactly on the top of the chart (100) at n = 10. O(n^3) reaches that same ceiling already around n ≈ 4.6, and by n = 10 it has grown to 1000, ten times past the top edge.',
      },
    },
  ],
  stepBreakpoints: [2, 4, 6, 8],

  implementation: {
    javascript: `function multiplyMatrices(a, b, n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(new Array(n).fill(0));
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}`,
    python: `def multiply_matrices(a, b, n):
    result = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            total = 0
            for k in range(n):
                total += a[i][k] * b[k][j]
            result[i][j] = total
    return result`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Сигнатура и пустой результат', en: 'Signature and the empty result' },
        explanation: {
          ru: '`multiplyMatrices` принимает две матрицы `a`/`b` размера n×n и сам размер `n`. `result` начинается пустым - в него построчно сложится итоговая матрица.',
          en: '`multiplyMatrices` takes two n-by-n matrices `a`/`b` and the size `n` itself. `result` starts empty - the output matrix is built into it row by row.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Внешний цикл: n строк результата', en: 'The outer loop: n rows of the result' },
        explanation: {
          ru: '`for (let i = 0; i < n; i++)` проходит по n строкам будущего результата, каждой заводя пустой ряд из n нулей. Сам по себе этот цикл - O(n).',
          en: '`for (let i = 0; i < n; i++)` walks the n rows of the future result, giving each a fresh row of n zeros. On its own, this loop is O(n).',
        },
      },
      {
        lines: [5, 6],
        title: { ru: 'Средний цикл: n ячеек в каждой строке', en: 'The middle loop: n cells per row' },
        explanation: {
          ru: '`for (let j = 0; j < n; j++)` вложен в первый - для каждой из n строк перебирает все n столбцов. Уже эта пара даёт O(n²), как у наивного сравнения всех пар.',
          en: '`for (let j = 0; j < n; j++)` is nested inside the first - for each of the n rows it walks all n columns. This pair alone already gives O(n²), the same as comparing every pair naively.',
        },
      },
      {
        lines: [7, 8, 9],
        title: { ru: 'Внутренний цикл: n слагаемых на ячейку', en: 'The inner loop: n terms per cell' },
        explanation: {
          ru: '`for (let k = 0; k < n; k++)` - третий уровень вложенности, вычисляющий сумму `n` произведений для одной ячейки результата. Это и есть третий множитель n, превращающий O(n²) в O(n³).',
          en: '`for (let k = 0; k < n; k++)` is the third nesting level, computing a sum of `n` products for one result cell. This is the third factor of n that turns O(n²) into O(n^3).',
        },
      },
      {
        lines: [10],
        title: { ru: 'Запись готовой ячейки', en: 'Writing the finished cell' },
        explanation: {
          ru: '`result[i][j] = sum` сохраняет накопленную сумму - это происходит один раз на каждую из n² ячеек, уже после того, как внутренний цикл отработал все n слагаемых.',
          en: '`result[i][j] = sum` stores the accumulated sum - this happens once per each of the n² cells, only after the inner loop has finished all n terms.',
        },
      },
      {
        lines: [13],
        title: { ru: 'Итог: n² ячеек по n операций каждая', en: 'The total: n² cells, n operations each' },
        explanation: {
          ru: '`return result` завершает функцию после `n² · n = n³` операций умножения-сложения - именно такое произведение и даёт кубическую сложность.',
          en: '`return result` finishes the function after `n² · n = n^3` multiply-add operations - exactly that product is what produces the cubic complexity.',
        },
      },
    ],
    python: [
      {
        lines: [1, 2],
        title: { ru: 'Сигнатура и пустой результат', en: 'Signature and the empty result' },
        explanation: {
          ru: '`multiply_matrices` принимает те же `a`/`b`/`n`, что и JS-версия. `result` сразу строится как n×n таблица нулей через list comprehension - тот же контракт, другой синтаксис.',
          en: '`multiply_matrices` takes the same `a`/`b`/`n` as the JS version. `result` is built as an n-by-n table of zeros right away via a list comprehension - the same contract, different syntax.',
        },
      },
      {
        lines: [3, 4],
        title: { ru: 'Внешний и средний циклы: n² ячеек', en: 'The outer and middle loops: n² cells' },
        explanation: {
          ru: '`for i in range(n)` и вложенный `for j in range(n)` - та же пара, что в JS: n строк, в каждой n столбцов, вместе - O(n²) ячеек результата.',
          en: '`for i in range(n)` and the nested `for j in range(n)` are the same pair as in JS: n rows, n columns each, together O(n²) result cells.',
        },
      },
      {
        lines: [5, 6, 7],
        title: { ru: 'Внутренний цикл: n слагаемых на ячейку', en: 'The inner loop: n terms per cell' },
        explanation: {
          ru: '`total = 0` и вложенный `for k in range(n)` - третий уровень вложенности, тот же самый источник третьего множителя n, что и в JS-версии.',
          en: '`total = 0` and the nested `for k in range(n)` are the third nesting level, the same source of the third factor of n as in the JS version.',
        },
      },
      {
        lines: [8],
        title: { ru: 'Запись готовой ячейки', en: 'Writing the finished cell' },
        explanation: {
          ru: '`result[i][j] = total` - та же запись накопленной суммы в ячейку, что и `result[i][j] = sum` в JS, один раз на каждую из n² ячеек.',
          en: '`result[i][j] = total` is the same write of the accumulated sum into a cell as `result[i][j] = sum` in JS, once per each of the n² cells.',
        },
      },
      {
        lines: [9],
        title: { ru: 'Итог: n² ячеек по n операций каждая', en: 'The total: n² cells, n operations each' },
        explanation: {
          ru: '`return result` завершает функцию после того же `n² · n = n³` объёма работы, что и в JS-версии.',
          en: '`return result` finishes the function after the same `n² · n = n^3` amount of work as the JS version.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Код почти всегда прямолинейный и легко читаемый: три обычных цикла, без сложных структур данных или трюков.',
      en: 'The code is almost always straightforward and easy to read: three ordinary loops, no complex data structures or tricks.',
    },
    {
      ru: 'На маленьких n (матрицы примерно до нескольких сотен элементов в стороне) реальное время работы остаётся разумным, а простота реализации перевешивает выигрыш от более сложных алгоритмов.',
      en: 'At small n (matrices roughly up to a few hundred elements on a side), real running time stays reasonable, and the simplicity of the implementation outweighs the benefit of more complex algorithms.',
    },
    {
      ru: 'Для задач, у которых действительно три независимых измерения (как у умножения матриц), это самый прямой и понятный способ выразить решение.',
      en: 'For problems that genuinely have three independent dimensions (like matrix multiplication), this is the most direct and understandable way to express the solution.',
    },
  ],
  cons: [
    {
      ru: 'Становится неприменимым очень быстро: матрицы 1000×1000 - уже около миллиарда операций, 1 000 000×1 000 000 - квинтиллион, то есть 10¹⁸.',
      en: 'Becomes impractical very quickly: 1000x1000 matrices are already about a billion operations, 1,000,000x1,000,000 is a quintillion, 10^18.',
    },
    {
      ru: 'Для самой частой задачи этого класса - умножения матриц - существуют более быстрые алгоритмы (например, Штрассена, около O(n^2.807)), так что наивный тройной цикл не единственный вариант.',
      en: 'For the most common problem in this class, matrix multiplication, faster algorithms exist (Strassen\'s algorithm, roughly O(n^2.807)), so the naive triple loop is not the only option.',
    },
    {
      ru: 'Третий уровень вложенности легко упустить при code review: два вложенных цикла бросаются в глаза, третий - реже, а именно он превращает терпимый O(n²) в куда более дорогой O(n³).',
      en: 'The third nesting level is easy to miss during code review: two nested loops stand out, a third one less so, and it is exactly that third level that turns a tolerable O(n²) into a much more expensive O(n^3).',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда n заведомо маленькое (матрицы или таблицы примерно до нескольких сотен элементов) и простота кода важнее возможной оптимизации.',
      en: 'When n is known to be small (matrices or tables roughly up to a few hundred elements) and code simplicity matters more than a possible optimization.',
    },
    {
      ru: 'Когда задача по своей природе имеет три независимых измерения, как у умножения матриц, и более быстрой альтернативы для конкретного случая нет или она не оправдана сложностью.',
      en: 'When the task inherently has three independent dimensions, like matrix multiplication, and no faster alternative exists for the specific case, or the added complexity is not worth it.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Наивное умножение матриц** - основа линейной алгебры и компьютерной графики, тройной цикл до появления оптимизированных библиотек вроде BLAS.',
      en: '**Naive matrix multiplication** - a foundation of linear algebra and computer graphics, a triple loop before optimized libraries like BLAS took over.',
    },
    {
      ru: '**Алгоритм Флойда-Уоршелла** - поиск кратчайших путей между всеми парами вершин графа за три вложенных цикла по вершинам.',
      en: '**The Floyd-Warshall algorithm** - finding shortest paths between every pair of vertices in a graph using three nested loops over the vertices.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Формально O(n³) означает: работа не превышает `c · n³` для некоторой константы `c`, начиная с какого-то размера входа. У `multiplyMatrices` она ровно `n³`: n² ячеек результата, и на каждую - сумма из n произведений. Три вложенных цикла - структурный признак этого класса, так же как два вложенных давали O(n²) в материале про квадратичную сложность.',
        en: 'Formally, O(n^3) means the work does not exceed `c · n^3` for some constant `c`, from some input size onward. For `multiplyMatrices` it is exactly `n^3`: n² result cells, each needing a sum of n products. Three nested loops are the structural signature of this class, the same way two nested loops signaled O(n²) in the quadratic complexity material.',
      },
      {
        ru: 'Числа растут гораздо резче, чем у O(n²). При `n = 1 000` - ровно **1 000 000 000**, один миллиард операций: на современном железе это уже секунды, а не миллисекунды. При `n = 1 000 000` - **10¹⁸**, квинтиллион: даже при миллиарде операций в секунду это заняло бы больше 31 года непрерывной работы. Данные выросли в 1000 раз, работа - в **миллиард раз** (`1000³`), а не в миллион, как было бы у O(n²).',
        en: 'The numbers climb far more sharply than O(n²). At `n = 1,000`, it is exactly **1,000,000,000**, one billion operations: on modern hardware that is already seconds, not milliseconds. At `n = 1,000,000`, it is **10^18**, a quintillion: even at a billion operations per second, that would take more than 31 years of continuous compute. The input grew 1000x, the work grew by **a billion times** (`1000^3`), not a million, the way O(n²) would.',
      },
      {
        ru: 'Структурно причина - **три цикла, вложенных друг в друга, и все три зависящие от n**. У `multiplyMatrices` это `i` (строки), `j` (столбцы) и `k` (слагаемые суммы). Убрать любой один из трёх - и останется обычный O(n²): например, без внутреннего цикла `k` пришлось бы вычислять сумму как-то иначе, но перебор по `i` и `j` сам по себе даёт только квадрат.',
        en: 'Structurally the cause is **three loops nested inside each other, all three depending on n**. For `multiplyMatrices` that is `i` (rows), `j` (columns), and `k` (the terms of the sum). Remove any one of the three and what remains is an ordinary O(n²): without the inner `k` loop, for instance, the sum would need to be computed some other way, but the `i`/`j` walk alone only produces a square.',
      },
      {
        ru: 'O(n³) - не последнее слово даже для своей собственной классической задачи. Алгоритм Штрассена умножает матрицы за **примерно O(n^2.807)**, находя в задаче структуру, которая позволяет обойтись без честного тройного перебора - тем же приёмом, что convex hull обходит наивный O(n²) в материале про O(n²) (только там речь была о геометрии точек, а не о числах в матрице). На практике наивный тройной цикл всё равно часто побеждает на небольших матрицах - у алгоритма Штрассена своя накладная расходность, которая окупается только на достаточно больших n.',
        en: 'O(n^3) is not the final word even for its own classic problem. Strassen\'s algorithm multiplies matrices in **roughly O(n^2.807)**, finding structure in the problem that avoids a genuinely triple brute force, the same trick that lets convex hull sidestep a naive O(n²) in the O(n²) material (just applied to numbers in a matrix instead of points in geometry). In practice the naive triple loop still often wins on smaller matrices, since Strassen\'s algorithm carries its own overhead that only pays off at sufficiently large n.',
      },
      {
        ru: 'Не всякая задача с O(n³) настолько повезёт с оптимизацией. Алгоритм Флойда-Уоршелла находит кратчайшие пути между всеми парами вершин графа за три вложенных цикла (промежуточная вершина, начало, конец), и для него, в отличие от умножения матриц, не существует настолько же быстрой альтернативы для общего случая - O(n³) здесь не наивность, а по сути неизбежная цена задачи.',
        en: 'Not every O(n^3) problem gets so lucky with an optimization. The Floyd-Warshall algorithm finds shortest paths between every pair of vertices in a graph using three nested loops (intermediate vertex, start, end), and unlike matrix multiplication, no comparably fast general-case alternative exists for it - O(n^3) here is not naivety, it is essentially the problem\'s real cost.',
      },
      {
        ru: 'Отличить O(n³) от O(n²) в code review проще всего простым подсчётом: сколько циклов вложены один в другой и все ли они зависят от одного и того же n. Третий уровень легко потерять из виду, особенно если он спрятан не в виде явного `for`, а внутри вызова другой O(n)-функции из уже вложенного дважды цикла - тот же приём, что превращает O(n) в O(n²) незаметно для автора, только на один уровень глубже.',
        en: 'The easiest way to tell O(n^3) apart from O(n²) in code review is a plain count: how many loops are nested inside each other, and whether all of them depend on the same n. The third level is easy to lose track of, especially when it is hidden not as an explicit `for` but inside a call to another O(n) function from an already doubly-nested loop - the same trick that quietly turns O(n) into O(n²), just one level deeper.',
      },
    ],
    whenToUse: [
      {
        ru: '**Маленькие и умеренные n** - матрицы или таблицы примерно до нескольких сотен элементов в стороне, где секунды, а не минуты, остаются приемлемыми.',
        en: '**Small to moderate n** - matrices or tables up to roughly a few hundred elements on a side, where seconds rather than minutes stay acceptable.',
      },
      {
        ru: '**Задачи без известной более быстрой альтернативы** - как у алгоритма Флойда-Уоршелла, где O(n³) - не наивность, а фактическая цена решения в общем случае.',
        en: '**Tasks with no known faster alternative** - like the Floyd-Warshall algorithm, where O(n^3) is not naivety but the actual cost of solving the problem in the general case.',
      },
      {
        ru: '**Против более быстрых, но сложных альтернатив** - если задача допускает алгоритм вроде Штрассена, переход на него оправдан только при достаточно больших n, иначе накладные расходы съедят выигрыш.',
        en: '**Against faster but more complex alternatives** - if the task allows something like Strassen\'s algorithm, switching to it only pays off at sufficiently large n, otherwise the overhead eats the gain.',
      },
      {
        ru: '**Как сигнал перепроверить структуру данных** - обнаружив третий уровень вложенности циклов, стоит спросить, действительно ли задаче нужны все три измерения, или это случайно спрятанный O(n) внутри уже вложенного O(n²).',
        en: '**As a signal to double-check the data structure** - spotting a third level of loop nesting is a good moment to ask whether the task genuinely needs all three dimensions, or whether it is an accidentally hidden O(n) inside an already-nested O(n²).',
      },
    ],
    realWorld: [
      {
        ru: '**BLAS и LAPACK** - стандартные библиотеки линейной алгебры не используют наивный тройной цикл напрямую, но именно от него отталкивались первые реализации умножения матриц, прежде чем появилась блочная и кэш-дружественная оптимизация.',
        en: '**BLAS and LAPACK** - the standard linear algebra libraries do not use the naive triple loop directly, but it is exactly what early matrix multiplication implementations started from, before block-based, cache-friendly optimizations arrived.',
      },
      {
        ru: '**Алгоритм Флойда-Уоршелла** - в маршрутизации сетей и анализе графов находит кратчайшие расстояния между всеми парами узлов сразу, а не по одному, за счёт трёх вложенных циклов по вершинам.',
        en: '**The Floyd-Warshall algorithm** - in network routing and graph analysis, it finds shortest distances between every pair of nodes at once rather than one at a time, using three nested loops over the vertices.',
      },
      {
        ru: '**Динамическое программирование с тремя измерениями** - некоторые задачи (например, выравнивание нескольких последовательностей в биоинформатике) естественно требуют трёхмерной DP-таблицы, что и даёт O(n³) на её заполнение.',
        en: '**Three-dimensional dynamic programming** - some problems (like aligning multiple sequences in bioinformatics) naturally need a three-dimensional DP table, which is exactly what produces O(n^3) to fill it.',
      },
      {
        ru: '**Наивный перебор троек** - решение задачи "найти три числа в массиве с заданной суммой" тремя вложенными циклами по одному и тому же массиву - тот же структурный паттерн, что у умножения матриц, только над одним массивом вместо двух.',
        en: '**Naive triple enumeration** - solving "find three numbers in an array that sum to a target" with three nested loops over the same array - the same structural pattern as matrix multiplication, just over one array instead of two.',
      },
    ],
  },

  relatedAlgorithms: ['o-n-2', 'o-2-n'],

  quiz: [
    {
      question: {
        ru: 'Как меняется объём работы у алгоритма класса O(n³), если данные увеличить вдвое?',
        en: 'How does the amount of work in an O(n^3) algorithm change if the input doubles?',
      },
      options: [
        { ru: 'Увеличивается в восемь раз, а не вчетверо, как у O(n²)', en: 'It increases eightfold, not fourfold like O(n²)' },
        { ru: 'Увеличивается ровно вчетверо, точно так же, как у O(n²)', en: 'It increases exactly fourfold, the same way O(n²) does' },
        { ru: 'Увеличивается ровно вдвое, вместе с тем, во сколько раз выросли данные', en: 'It increases exactly twofold, matching how much the data itself grew' },
        { ru: 'Не меняется вообще, сколько бы данных ни было на входе алгоритма', en: 'It does not change at all, no matter how much input the algorithm receives' },
      ],
      correct: 0,
      explanation: {
        ru: 'При увеличении n в k раз работа O(n³) растёт в k³ раз - вдвое больше данных даёт `2³ = 8` раз больше работы.',
        en: 'When n grows k times, O(n^3) work grows k^3 times - twice the data means `2^3 = 8` times more work.',
      },
      hint: {
        ru: 'Смотрите вкладку «Суть» - там прямо написано про рост «в восемь раз».',
        en: 'See the "Intent" tab - it directly states the "eightfold" growth.',
      },
    },
    {
      question: {
        ru: 'По какому признаку в коде почти всегда можно узнать O(n³)?',
        en: 'What code pattern almost always signals O(n^3)?',
      },
      options: [
        { ru: 'Три цикла, один внутри другого, и все три зависят от размера входа', en: 'Three loops, nested one inside another, all three depending on the input size' },
        { ru: 'Два цикла один внутри другого, оба зависящие от полного размера входа', en: 'Two loops nested inside each other, both depending on the full input size overall' },
        { ru: 'Один цикл без вложенности, который проходит по всем элементам один раз', en: 'A single, completely non-nested loop that walks every element just once' },
        { ru: 'Рекурсия, которая на каждом шаге делит входные данные примерно пополам', en: 'Recursion that roughly halves the given input data on every single step' },
      ],
      correct: 0,
      explanation: {
        ru: 'Три вложенных цикла, все зависящие от n, - именно это делает `multiplyMatrices` на вкладке «Реализация».',
        en: 'Three nested loops, all depending on n, are exactly what `multiplyMatrices` does on the "Implementation" tab.',
      },
      hint: {
        ru: 'Смотрите строки 3, 5 и 7 функции `multiplyMatrices` на вкладке «Реализация» и три соответствующих шага разбора.',
        en: 'See lines 3, 5, and 7 of `multiplyMatrices` on the "Implementation" tab and the three matching walkthrough steps.',
      },
    },
    {
      question: {
        ru: 'На графике: как ведёт себя линия O(n³) по сравнению с O(n²) при приближении к n = 10?',
        en: 'On the visualization chart: how does the O(n^3) line behave compared to O(n²) as n approaches 10?',
      },
      options: [
        { ru: 'Уходит за верхний край графика заметно раньше, чем O(n²)', en: 'It runs off the top edge of the chart noticeably earlier than O(n²)' },
        { ru: 'Достигает верхнего края графика ровно в той же точке, что и O(n²)', en: 'It reaches the top edge of the chart at exactly the same point as O(n²)' },
        { ru: 'Остаётся заметно ниже линии O(n²) на всём участке графика', en: 'It stays noticeably below the O(n²) line across the entire chart' },
        { ru: 'Идёт вровень с линией O(n log n), обе сливаются в одну линию', en: 'It runs level with the O(n log n) line, the two merge into one line' },
      ],
      correct: 0,
      explanation: {
        ru: 'O(n²) достигает потолка графика (100) ровно при n = 10, а O(n³) достигает того же потолка уже при n ≈ 4.6 - заметно раньше.',
        en: 'O(n²) reaches the chart\'s ceiling (100) exactly at n = 10, while O(n^3) reaches that same ceiling already around n ≈ 4.6 - noticeably earlier.',
      },
      hint: {
        ru: 'Откройте вкладку «Визуализация» и сравните, при каком n каждая из двух линий уходит за верхний край.',
        en: 'Open the "Visualization" tab and compare at which n each of the two lines runs off the top edge.',
      },
    },
    {
      question: {
        ru: 'Что останется от `multiplyMatrices`, если убрать самый внутренний цикл (`for k`)?',
        en: 'What would be left of `multiplyMatrices` if the innermost loop (`for k`) were removed?',
      },
      options: [
        { ru: 'Обычный код класса O(n²) - куб превращается обратно в квадрат', en: 'Ordinary O(n²) code - the cube turns back into a square' },
        { ru: 'Тот же самый O(n³) - убранный цикл никак не влияет на класс сложности', en: 'The exact same O(n^3) - the removed loop has no effect on the complexity class' },
        { ru: 'Код класса O(n) - остался бы только один цикл из трёх изначальных', en: 'O(n) code - only one loop out of the original three would remain' },
        { ru: 'Код перестанет работать вообще - без него функция не может существовать', en: 'The code would stop working entirely - the function cannot exist without it' },
      ],
      correct: 0,
      explanation: {
        ru: 'Без третьего уровня вложенности останутся только циклы по `i` и `j` - ровно та же структура, что даёт O(n²) в материале про квадратичную сложность.',
        en: 'Without the third nesting level, only the `i` and `j` loops remain - exactly the same structure that produces O(n²) in the quadratic complexity material.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает» на вкладке «Суть» - про удаление одного из трёх циклов.',
        en: 'See the third "Deep dive" paragraph on the "Intent" tab - about removing one of the three loops.',
      },
    },
    {
      question: {
        ru: 'Данные выросли с 1 000 до 1 000 000 элементов - в 1000 раз. Во сколько раз выросла работа у O(n³)-алгоритма?',
        en: 'The data grew from 1,000 to 1,000,000 elements - 1000x. By what factor did the work of an O(n^3) algorithm grow?',
      },
      options: [
        { ru: 'Примерно в миллиард раз - рост данных в k раз даёт рост работы в k³ раз', en: 'By roughly a billion times - a k-fold growth in data produces a k^3-fold growth in work' },
        { ru: 'Примерно в миллион раз, точно так же, как это было бы у O(n²)', en: 'By roughly a million times, exactly the same way it would be for a plain O(n²) algorithm' },
        { ru: 'Ровно в 1000 раз, точно вместе с тем, во сколько раз выросли сами данные', en: 'By exactly 1000x, matching how much the data itself grew' },
        { ru: 'Всего примерно на 10 дополнительных операций, а не в миллиард раз', en: 'By only about 10 extra operations, not by a factor of a billion' },
      ],
      correct: 0,
      explanation: {
        ru: '1000-кратный рост n даёт рост работы в `1000³ = 1 000 000 000` раз: с миллиарда операций до квинтиллиона.',
        en: 'A 1000x growth in n produces a `1000^3 = 1,000,000,000`-fold growth in work: from a billion operations to a quintillion.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает» на вкладке «Суть» - там разобраны точные числа.',
        en: 'See the second "Deep dive" paragraph on the "Intent" tab - it works through the exact numbers.',
      },
    },
    {
      question: {
        ru: 'Алгоритм Штрассена умножает матрицы примерно за O(n^2.807), а не за наивные O(n³). Что это означает?',
        en: 'Strassen\'s algorithm multiplies matrices in roughly O(n^2.807), not the naive O(n^3). What does this mean?',
      },
      options: [
        { ru: 'Даже классическая O(n³)-задача не обязана оставаться кубической при поиске структуры в ней', en: 'Even a classic O(n^3) task is not forced to stay cubic once structure inside it is found' },
        { ru: 'Наивный тройной цикл на самом деле содержит ошибку и никогда не должен использоваться', en: 'The naive triple loop actually contains a bug and should never be used at all' },
        { ru: 'O(n^2.807) и O(n³) - это просто два разных способа записи одного и того же класса', en: 'O(n^2.807) and O(n^3) are simply two different ways of writing the exact same class' },
        { ru: 'Алгоритм Штрассена работает быстрее только на очень маленьких матрицах, буквально от пары элементов', en: 'Strassen\'s algorithm is only ever faster on very small matrices, just a couple of elements wide' },
      ],
      correct: 0,
      explanation: {
        ru: 'Штрассен находит в задаче умножения матриц структуру, которая позволяет обойтись без честного тройного перебора - тем же приёмом, что convex hull обходит наивный O(n²).',
        en: 'Strassen finds structure in matrix multiplication that avoids a genuinely triple brute force - the same trick that lets convex hull sidestep a naive O(n²).',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает» на вкладке «Суть» - про алгоритм Штрассена.',
        en: 'See the fourth "Deep dive" paragraph on the "Intent" tab - about Strassen\'s algorithm.',
      },
    },
    {
      question: {
        ru: 'Чем алгоритм Флойда-Уоршелла отличается от умножения матриц в плане возможностей ускорения?',
        en: 'How does the Floyd-Warshall algorithm differ from matrix multiplication in terms of speed-up potential?',
      },
      options: [
        { ru: 'Для него не существует настолько же быстрой альтернативы - O(n³) здесь фактическая цена задачи', en: 'No comparably fast alternative exists for it - O(n^3) here is the actual cost of the problem' },
        { ru: 'Он вообще не использует вложенные циклы, работает принципиально иначе', en: 'It does not use nested loops at all, it works on a fundamentally different principle' },
        { ru: 'Для него давно существует свой аналог алгоритма Штрассена с той же выгодой', en: 'It has long had its own Strassen-style analog with the same benefit' },
        { ru: 'Он всегда работает быстрее умножения матриц при абсолютно любом размере входа, без единого исключения', en: 'It always runs strictly faster than matrix multiplication at absolutely any input size whatsoever' },
      ],
      correct: 0,
      explanation: {
        ru: 'В отличие от умножения матриц, у Флойда-Уоршелла нет известной настолько же быстрой альтернативы для общего случая - три вложенных цикла здесь не наивность.',
        en: 'Unlike matrix multiplication, Floyd-Warshall has no known comparably fast alternative for the general case - the three nested loops here are not naivety.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает» на вкладке «Суть» - про Флойда-Уоршелла как исключение.',
        en: 'See the fifth "Deep dive" paragraph on the "Intent" tab - about Floyd-Warshall as the exception.',
      },
    },
    {
      question: {
        ru: 'Почему третий уровень вложенности цикла легче пропустить в code review, чем второй?',
        en: 'Why is a third level of loop nesting easier to miss in code review than a second one?',
      },
      options: [
        { ru: 'Он реже бросается в глаза и может быть спрятан внутри вызова другой функции', en: 'It stands out less and can be hidden inside a call to another function' },
        { ru: 'Технически в JavaScript и Python больше трёх вложенных циклов писать нельзя', en: 'JavaScript and Python technically do not allow writing more than three nested loops' },
        { ru: 'Третий уровень вложенности всегда автоматически превращает код в O(n²), а не в O(n³)', en: 'A third nesting level always automatically turns the code into O(n²), not O(n^3)' },
        { ru: 'Ревьюеры физически не способны заметить третий цикл ни при каких обстоятельствах', en: 'Reviewers are physically incapable of noticing a third loop under any circumstances' },
      ],
      correct: 0,
      explanation: {
        ru: 'Два вложенных цикла обычно хорошо видны, а третий - особенно если спрятан внутри вызова другой O(n)-функции - легко потерять из виду.',
        en: 'Two nested loops are usually easy to spot, but a third one, especially if hidden inside a call to another O(n) function, is easy to lose track of.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» на вкладке «Суть» - про подсчёт уровней вложенности.',
        en: 'See the last "Deep dive" paragraph on the "Intent" tab - about counting nesting levels.',
      },
    },
    {
      question: {
        ru: 'Нужно посчитать кратчайшие пути между всеми парами вершин в графе. Почему для этого выбирают Флойда-Уоршелла (O(n³)), а не «наивно попробовать всё»?',
        en: 'The task is to find shortest paths between every pair of vertices in a graph. Why choose Floyd-Warshall (O(n^3)) over "naively trying everything"?',
      },
      options: [
        { ru: 'Три вложенных цикла по вершинам уже и есть систематический, а не наивный перебор всех путей', en: 'The three nested loops over vertices are already a systematic search, not a naive brute force over all paths' },
        { ru: 'Флойд-Уоршелл на самом деле работает за O(n), а название «кубическая сложность» здесь попросту ошибочно', en: 'Floyd-Warshall actually runs in plain O(n), and the "cubic complexity" label used here is simply a mistake made up' },
        { ru: 'Любой другой способ решить эту задачу заведомо работает быстрее O(n³) при любом размере графа', en: 'Any other way to solve this task is guaranteed to run faster than O(n^3) at any graph size' },
        { ru: 'Задача вообще не может быть решена ни для какого графа с более чем двумя вершинами', en: 'The task cannot be solved at all for any graph with more than two vertices' },
      ],
      correct: 0,
      explanation: {
        ru: 'Флойд-Уоршелл систематически перебирает промежуточные вершины через три вложенных цикла - это уже сама O(n³)-структура задачи, не наивный полный перебор путей.',
        en: 'Floyd-Warshall systematically walks intermediate vertices through three nested loops - that is already the problem\'s own O(n^3) structure, not a naive full enumeration of paths.',
      },
      hint: {
        ru: 'Смотрите пункт про Флойда-Уоршелла в разделе «Примеры в коде» на вкладке «Суть».',
        en: 'See the Floyd-Warshall point in the "Real world" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Матрицы небольшого размера (скажем, 20×20) нужно перемножить один раз. Что разумнее: наивный тройной цикл или алгоритм Штрассена?',
        en: 'Small matrices (say, 20x20) need to be multiplied once. What is more sensible: the naive triple loop or Strassen\'s algorithm?',
      },
      options: [
        { ru: 'Наивный тройной цикл - накладные расходы Штрассена не окупятся на таком маленьком n', en: 'The naive triple loop - Strassen\'s overhead would not pay off at such a small n' },
        { ru: 'Алгоритм Штрассена - он быстрее наивного варианта абсолютно при любом размере матриц', en: 'Strassen\'s algorithm - it is faster than the naive version at absolutely any matrix size' },
        { ru: 'Разницы нет никакой - оба варианта выполняются за совершенно одинаковое время всегда', en: 'There is no difference at all - both options run in exactly the same time always' },
        { ru: 'Ни один вариант не подходит - для матриц 20×20 умножение в принципе невозможно', en: 'Neither option works - multiplying 20x20 matrices is fundamentally impossible' },
      ],
      correct: 0,
      explanation: {
        ru: 'Алгоритм Штрассена окупается только на достаточно больших n - на маленьких матрицах его накладные расходы перевешивают выигрыш от лучшей асимптотики.',
        en: 'Strassen\'s algorithm only pays off at sufficiently large n - on small matrices its overhead outweighs the benefit of the better asymptotics.',
      },
      hint: {
        ru: 'Смотрите пункт «Против более быстрых, но сложных альтернатив» в разделе «Нюансы выбора» на вкладке «Суть».',
        en: 'See the "Against faster but more complex alternatives" point in the "Choice nuances" section on the "Intent" tab.',
      },
    },
  ],
};

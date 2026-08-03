export const ALGORITHM_CATEGORIES = [
  {
    slug: 'sorting',
    icon: 'sorting',
    name: { ru: 'Сортировки', en: 'Sorting' },
    tagline: {
      ru: 'Как превратить хаотичный массив в упорядоченный — и какой ценой',
      en: 'How to turn a chaotic array into an ordered one — and at what cost',
    },
    status: 'live',
  },
  {
    slug: 'big-o',
    icon: 'big-o',
    name: { ru: 'Big O Notation', en: 'Big O Notation' },
    tagline: {
      ru: 'Язык, на котором индустрия обсуждает скорость и память алгоритмов',
      en: 'The language the industry uses to talk about speed and memory',
    },
    status: 'coming-soon',
    topics: {
      ru: ['O(1) и O(n)', 'O(log n)', 'O(n²) и вложенные циклы', 'Лучший/средний/худший случай'],
      en: ['O(1) and O(n)', 'O(log n)', 'O(n²) and nested loops', 'Best/average/worst case'],
    },
  },
  {
    slug: 'searching',
    icon: 'searching',
    name: { ru: 'Поиск', en: 'Searching' },
    tagline: {
      ru: 'Линейный и бинарный поиск, поиск в отсортированных и неотсортированных данных',
      en: 'Linear and binary search, sorted vs. unsorted data',
    },
    status: 'coming-soon',
    topics: {
      ru: ['Линейный поиск', 'Бинарный поиск', 'Поиск в дереве', 'Интерполяционный поиск'],
      en: ['Linear search', 'Binary search', 'Tree search', 'Interpolation search'],
    },
  },
  {
    slug: 'recursion',
    icon: 'recursion',
    name: { ru: 'Рекурсия', en: 'Recursion' },
    tagline: {
      ru: 'Функции, которые решают задачу, вызывая себя на меньшей версии той же задачи',
      en: 'Functions that solve a problem by calling themselves on a smaller version of it',
    },
    status: 'coming-soon',
    topics: {
      ru: ['Базовый случай', 'Стек вызовов', 'Хвостовая рекурсия', 'Мемоизация'],
      en: ['Base case', 'Call stack', 'Tail recursion', 'Memoization'],
    },
  },
  {
    slug: 'dynamic-programming',
    icon: 'dynamic-programming',
    name: { ru: 'Динамическое программирование', en: 'Dynamic Programming' },
    tagline: {
      ru: 'Разбить задачу на перекрывающиеся подзадачи и не решать их дважды',
      en: 'Break a problem into overlapping subproblems and never solve one twice',
    },
    status: 'coming-soon',
    topics: {
      ru: ['Мемоизация', 'Табуляция', 'Оптимальная подструктура', 'Классические задачи DP'],
      en: ['Memoization', 'Tabulation', 'Optimal substructure', 'Classic DP problems'],
    },
  },
];

export function getCategory(slug) {
  return ALGORITHM_CATEGORIES.find((c) => c.slug === slug);
}

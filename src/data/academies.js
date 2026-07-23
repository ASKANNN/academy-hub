export const DESIGN_PATTERNS_URL = 'http://localhost:3000';

export const ACADEMIES = [
  {
    id: 'design-patterns',
    name: 'Design Patterns Academy',
    tagline: {
      ru: '23 паттерна GoF на живых интерактивных схемах',
      en: '23 GoF patterns on live interactive diagrams',
    },
    icon: 'patterns',
    status: 'live',
    url: DESIGN_PATTERNS_URL,
  },
  {
    id: 'algorithms',
    name: 'Algorithms Academy',
    tagline: {
      ru: 'Сложность, сортировки, поиск, рекурсия',
      en: 'Complexity, sorting, search, recursion',
    },
    icon: 'algorithms',
    status: 'planned',
    topics: {
      ru: ['Big O Notation', 'Сортировки', 'Поиск', 'Рекурсия', 'Динамическое программирование'],
      en: ['Big O Notation', 'Sorting', 'Search', 'Recursion', 'Dynamic Programming'],
    },
  },
  {
    id: 'data-structures',
    name: 'Data Structures Academy',
    tagline: {
      ru: 'Массивы, деревья, графы, хэш-таблицы',
      en: 'Arrays, trees, graphs, hash tables',
    },
    icon: 'data-structures',
    status: 'planned',
    topics: {
      ru: ['Массивы и списки', 'Стек и очередь', 'Деревья', 'Графы', 'Хэш-таблицы'],
      en: ['Arrays & Lists', 'Stack & Queue', 'Trees', 'Graphs', 'Hash Tables'],
    },
  },
  {
    id: 'backend',
    name: 'Backend Academy',
    tagline: {
      ru: 'API, базы данных, аутентификация, архитектура сервисов',
      en: 'APIs, databases, authentication, service architecture',
    },
    icon: 'backend',
    status: 'planned',
    topics: {
      ru: ['REST / HTTP', 'Базы данных', 'Аутентификация', 'Кэширование', 'Микросервисы'],
      en: ['REST / HTTP', 'Databases', 'Authentication', 'Caching', 'Microservices'],
    },
  },
  {
    id: 'devops',
    name: 'DevOps Academy',
    tagline: {
      ru: 'CI/CD, контейнеры, инфраструктура, мониторинг',
      en: 'CI/CD, containers, infrastructure, monitoring',
    },
    icon: 'devops',
    status: 'planned',
    topics: {
      ru: ['CI/CD', 'Docker', 'Оркестрация', 'Мониторинг', 'Инфраструктура как код'],
      en: ['CI/CD', 'Docker', 'Orchestration', 'Monitoring', 'Infrastructure as Code'],
    },
  },
  {
    id: 'ai',
    name: 'AI Academy',
    tagline: {
      ru: 'Основы ML, нейросети, промпт-инжиниринг',
      en: 'ML fundamentals, neural networks, prompt engineering',
    },
    icon: 'ai',
    status: 'planned',
    topics: {
      ru: ['Основы Machine Learning', 'Нейросети', 'Промпт-инжиниринг', 'Векторные представления'],
      en: ['Machine Learning Basics', 'Neural Networks', 'Prompt Engineering', 'Vector Embeddings'],
    },
  },
];

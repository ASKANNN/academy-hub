export const ARCHITECTURE_CATEGORIES = [
  {
    slug: 'presentation',
    icon: 'arch-presentation',
    name: { ru: 'Слой представления', en: 'Presentation Layer' },
    tagline: {
      ru: 'Как разделить данные, экран и ввод пользователя: MVC, MVP, MVVM',
      en: 'How to split data, screen, and user input: MVC, MVP, MVVM',
    },
    status: 'live',
  },
  {
    slug: 'structure',
    icon: 'arch-structure',
    name: { ru: 'Структура системы', en: 'System Structure' },
    tagline: {
      ru: 'Слоистая архитектура, гексагональная архитектура, микроядро, клиент-сервер',
      en: 'Layered architecture, hexagonal architecture, microkernel, client-server',
    },
    status: 'coming-soon',
    topics: {
      ru: ['Слоистая архитектура', 'Гексагональная архитектура', 'Микроядро', 'Клиент-сервер'],
      en: ['Layered Architecture', 'Hexagonal Architecture', 'Microkernel', 'Client-Server'],
    },
  },
  {
    slug: 'distributed',
    icon: 'arch-distributed',
    name: { ru: 'Распределённые системы', en: 'Distributed Systems' },
    tagline: {
      ru: 'Микросервисы, событийная архитектура, CQRS',
      en: 'Microservices, event-driven architecture, CQRS',
    },
    status: 'coming-soon',
    topics: {
      ru: ['Микросервисы', 'Событийная архитектура', 'CQRS'],
      en: ['Microservices', 'Event-Driven Architecture', 'CQRS'],
    },
  },
];

export function getArchitectureCategory(slug) {
  return ARCHITECTURE_CATEGORIES.find((c) => c.slug === slug);
}

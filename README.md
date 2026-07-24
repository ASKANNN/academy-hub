# Askan Academy

Стартовая страница-хаб платформы Software Engineering Academy. Показывает
дерево академий по темам программирования: каждая академия — либо готовый
самостоятельный проект (карточка ссылается на него), либо запланированная
ветка со списком тем, которые появятся по мере готовности.

Открытый исходный код, лицензия MIT.

## Возможности

- Canvas-анимация созвездия при первом заходе за сессию (`prefers-reduced-motion` учитывается)
- Светлая / тёмная тема, сохраняется в `localStorage`
- Переключение языка RU / EN по всему сайту, тексты централизованы в `src/i18n/strings.js`
- Виджет доступности: размер текста, высокий контраст, инверсия, монохромный режим,
  легкочитаемый шрифт, принудительное подчёркивание ссылок — настройки сохраняются в `localStorage`
- Стеклянный хедер с backdrop-blur
- Адаптивная сетка карточек академий
- Клик-раскрытие списка тем/категорий внутри карточки запланированной академии

## Стек

Vite + React, plain JS (без TypeScript), без сторонних UI-библиотек и CSS-фреймворков.
Дизайн-токены (`src/styles/tokens.css`) — единственный источник цветов, типографики,
отступов, теней и z-index; хардкодить эти значения напрямую в компонентах нельзя.

## Структура

```
src/
  main.jsx                — точка входа, подключает стили и монтирует <App/>
  App.jsx                 — сборка страницы: intro, Header, Hero, AcademyTree, Footer, AccessibilityWidget
  components/
    Header.jsx             — логотип, переключатель RU|EN, кнопка темы
    Hero.jsx                — баннер-заголовок
    AcademyTree.jsx          — адаптивная сетка карточек
    AcademyCard.jsx           — карточка академии: live — ссылка, planned — раскрытие тем по клику
    Footer.jsx                — копирайт + ссылки
    BrandMark.jsx              — SVG-логотип
    Icon.jsx                    — иконки академий по id
    PageIntro.jsx                — canvas-анимация созвездия, показывается раз за сессию
    AccessibilityWidget.jsx       — плавающая кнопка + панель настроек доступности
  data/
    academies.js            — список академий: live (есть url) и planned (есть topics/categories)
  hooks/
    useTheme.js              — светлая/тёмная тема, localStorage
    useLocale.js               — язык RU/EN, localStorage
    useIntro.js                 — флаг показа intro-анимации, sessionStorage
    useAccessibility.js          — настройки доступности, localStorage
  i18n/
    strings.js                — весь текст интерфейса на RU и EN в одном месте
  styles/
    tokens.css                — дизайн-токены: цвета, типографика, отступы, тени, z-index
    base.css                   — сброс стилей и базовая типографика
    app.css                     — стили всех компонентов
    accessibility.css            — стили виджета доступности и глобальные классы-эффекты
```

## Как добавить академию

**Новая тема внутри академии** — дописать строку в `topics.ru` и `topics.en`
нужной академии в `src/data/academies.js`.

**Новая академия** — добавить объект в массив `ACADEMIES`:
```js
{
  id: 'my-academy',
  name: 'My Academy',
  tagline: { ru: 'Краткое описание', en: 'Short description' },
  icon: 'icon-id',
  status: 'planned',   // или 'live'
  url: 'https://...',  // только для live
  topics: {
    ru: ['Тема 1', 'Тема 2'],
    en: ['Topic 1', 'Topic 2'],
  },
}
```
И добавить SVG-путь иконки в `GLYPHS` в `src/components/Icon.jsx`.

**Академия готова** — сменить `status: 'planned'` → `'live'`, указать `url`.

## Как добавить текст интерфейса

Весь текст UI живёт в `src/i18n/strings.js` (объекты `ru` и `en`). Локальные
`TEXTS`/`LABELS`-объекты или инлайн-тернарии внутри компонентов не используются —
новый текст всегда добавляется туда и читается через `getStrings(lang)`.

## Запуск

```bash
npm install
npm run dev
```

## Проверки

```bash
npm run lint      # oxlint
npm run build     # production-сборка
```

## Лицензия

MIT © 2026 Askan Academy

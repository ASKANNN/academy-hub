export const STRINGS = {
  ru: {
    skipLink: 'Перейти к содержимому',
    header: {
      home: 'Askan Academy — на главную',
      langToggle: 'Switch to English',
      themeToLight: 'Включить светлую тему',
      themeToDark: 'Включить тёмную тему',
    },
    hero: {
      eyebrow: 'Software Engineering Platform',
      title: 'Askan Academy',
      subtitle:
        'Живая база знаний: каждая академия — самостоятельная ветвь инженерного мышления, растущая в своём темпе. Design Patterns Academy уже открыта — остальные ветви прорастают по мере готовности.',
      quote:
        '«Программы должны писаться для людей, которые их читают, и лишь во вторую очередь - для машин, которые их выполняют»',
      quoteAuthor: '— Гарольд Абельсон, «Структура и интерпретация компьютерных программ»',
    },
    academyTree: {
      label: 'Дерево академий',
    },
    academyCard: {
      live: 'Открыто',
      planned: 'Скоро',
      openLabel: 'перейти',
      expand: 'Показать темы',
      collapse: 'Свернуть',
    },
    footer: {
      desc: 'Живая база знаний — каждая академия растёт как отдельная ветвь инженерного мышления.',
      sections: 'Разделы',
      contacts: 'Контакты',
      license: 'Некоммерческая лицензия на исходный код.',
      scrollTop: 'Прокрутить наверх',
    },
    accessibility: {
      toggle: 'Настройки доступности',
      dockTab: 'Показать/скрыть кнопку доступности',
      panelTitle: 'Доступность',
      close: 'Закрыть панель доступности',
      textSize: 'Размер текста',
      textSizeNormal: 'Обычный',
      textSizeLarge: 'Крупный',
      textSizeXLarge: 'Очень крупный',
      contrast: 'Контрастность',
      contrastNormal: 'Обычная',
      contrastHigh: 'Высокая',
      contrastInvert: 'Инверсия',
      monochrome: 'Чёрно-белый режим',
      readableFont: 'Легкочитаемый шрифт',
      underlineLinks: 'Подчёркивать ссылки',
      reset: 'Сбросить всё',
    },
  },
  en: {
    skipLink: 'Skip to content',
    header: {
      home: 'Askan Academy — home',
      langToggle: 'Переключить на русский',
      themeToLight: 'Switch to light',
      themeToDark: 'Switch to dark',
    },
    hero: {
      eyebrow: 'Software Engineering Platform',
      title: 'Askan Academy',
      subtitle:
        'A living knowledge base: each academy is its own branch of engineering thought, growing at its own pace. Design Patterns Academy is open — the remaining branches unfold as they mature.',
      quote:
        '"Programs must be written for people to read, and only incidentally for machines to execute"',
      quoteAuthor: '— Harold Abelson, Structure and Interpretation of Computer Programs',
    },
    academyTree: {
      label: 'Academy tree',
    },
    academyCard: {
      live: 'Open',
      planned: 'Coming soon',
      openLabel: 'open',
      expand: 'Show topics',
      collapse: 'Collapse',
    },
    footer: {
      desc: 'A living knowledge base — each academy grows as its own branch of engineering thought.',
      sections: 'Sections',
      contacts: 'Contacts',
      license: 'Non-commercial source-available license.',
      scrollTop: 'Scroll to top',
    },
    accessibility: {
      toggle: 'Accessibility settings',
      dockTab: 'Show/hide accessibility button',
      panelTitle: 'Accessibility',
      close: 'Close accessibility panel',
      textSize: 'Text size',
      textSizeNormal: 'Normal',
      textSizeLarge: 'Large',
      textSizeXLarge: 'Extra large',
      contrast: 'Contrast',
      contrastNormal: 'Normal',
      contrastHigh: 'High',
      contrastInvert: 'Invert',
      monochrome: 'Monochrome mode',
      readableFont: 'Readable font',
      underlineLinks: 'Underline links',
      reset: 'Reset all',
    },
  },
};

export function getStrings(lang) {
  return STRINGS[lang] ?? STRINGS.ru;
}

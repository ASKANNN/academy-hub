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
        '«Программы должны писаться для людей, которые их читают, и лишь во вторую очередь — для машин, которые их выполняют»',
      quoteAuthor: '— Харольд Абельсон, «Структура и интерпретация компьютерных программ»',
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
      mit: 'Открытый исходный код, лицензия MIT.',
      backTop: 'Наверх',
      scrollTop: 'Прокрутить наверх',
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
        '"Programs must be written for people to read, and only incidentally for machines to execute."',
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
      mit: 'Open source, MIT license.',
      backTop: 'Top',
      scrollTop: 'Scroll to top',
    },
  },
};

export function getStrings(lang) {
  return STRINGS[lang] ?? STRINGS.ru;
}

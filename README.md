# Askan Academy

Landing/hub page for the Software Engineering Academy platform. Shows a tree
of academies by programming topic: each academy is either a finished
standalone project (the card links to it) or a planned branch with a list of
topics that will appear as they're ready.

Source-available, non-commercial license.

## Features

- Canvas constellation animation on first visit per session (`prefers-reduced-motion` respected)
- Light / dark theme, persisted in `localStorage`
- RU / EN language toggle across the whole site, text centralized in `src/i18n/strings.js`
- Accessibility widget: text size, high contrast, invert, monochrome mode,
  readable font, forced underlined links — settings persisted in `localStorage`
- Glass header with backdrop-blur
- Responsive grid of academy cards
- Click-to-expand topics/categories list inside a planned academy's card

## Stack

Vite + React, plain JS (no TypeScript), no third-party UI libraries or CSS frameworks.
Design tokens (`src/styles/tokens.css`) are the single source of truth for colors,
typography, spacing, shadows and z-index; hardcoding these values directly in
components is not allowed.

## Structure

```
src/
  main.jsx                — entry point, imports styles and mounts <App/>
  App.jsx                 — page assembly: intro, Header, Hero, AcademyTree, Footer, AccessibilityWidget
  components/
    Header.jsx             — logo, RU|EN switcher, theme toggle
    Hero.jsx                — banner heading
    AcademyTree.jsx          — responsive grid of cards
    AcademyCard.jsx           — academy card: live — link, planned — click-to-expand topics
    Footer.jsx                — copyright + links
    BrandMark.jsx              — SVG logo
    Icon.jsx                    — academy icons by id
    PageIntro.jsx                — canvas constellation animation, shown once per session
    AccessibilityWidget.jsx       — floating button + accessibility settings panel
  data/
    academies.js            — list of academies: live (has url) and planned (has topics/categories)
  hooks/
    useTheme.js              — light/dark theme, localStorage
    useLocale.js               — RU/EN language, localStorage
    useIntro.js                 — flag for showing the intro animation, sessionStorage
    useAccessibility.js          — accessibility settings, localStorage
  i18n/
    strings.js                — all interface text in RU and EN in one place
  styles/
    tokens.css                — design tokens: colors, typography, spacing, shadows, z-index
    base.css                   — CSS reset and base typography
    app.css                     — styles for all components
    accessibility.css            — accessibility widget styles and global effect classes
```

## How to add an academy

**A new topic within an academy** — add a line to `topics.ru` and `topics.en`
of the relevant academy in `src/data/academies.js`.

**A new academy** — add an object to the `ACADEMIES` array:
```js
{
  id: 'my-academy',
  name: 'My Academy',
  tagline: { ru: 'Краткое описание', en: 'Short description' },
  icon: 'icon-id',
  status: 'planned',   // or 'live'
  url: 'https://...',  // live only
  topics: {
    ru: ['Тема 1', 'Тема 2'],
    en: ['Topic 1', 'Topic 2'],
  },
}
```
And add the icon's SVG path to `GLYPHS` in `src/components/Icon.jsx`.

**Academy is ready** — change `status: 'planned'` → `'live'`, set `url`.

## How to add interface text

All UI text lives in `src/i18n/strings.js` (the `ru` and `en` objects). Local
`TEXTS`/`LABELS` objects or inline ternaries inside components are not used —
new text always goes there and is read via `getStrings(lang)`.

## Running

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint      # oxlint
npm run build     # production build
```

## License

Askan Academy Non-Commercial Source License © 2026 Askan Academy — free to view, use,
and modify for non-commercial purposes; commercial use requires prior written
permission. See [LICENSE](./LICENSE).

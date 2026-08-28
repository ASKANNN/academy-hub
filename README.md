# Askan Academy

**Live:** [askanacademy.com](https://askanacademy.com)

Landing/hub page for the Software Engineering Academy platform. Shows a tree
of academies by programming topic: each academy is either a finished
standalone project (the card links to it) or a planned branch with a list of
topics that will appear as they're ready.

Source-available, non-commercial license.

## Features

- Canvas constellation animation on first visit per session, skippable by
  tap/click/keypress (`prefers-reduced-motion` respected)
- Light / dark theme, persisted in `localStorage`
- RU / EN language toggle across the whole site, text centralized in `src/i18n/strings.js`
- Accessibility widget: text size, high contrast, invert, monochrome mode,
  readable font, forced underlined links — settings persisted in `localStorage`
- Full keyboard navigation: all interactive elements reachable by Tab, activated
  by Enter/Space; `:focus-visible` accent rings on buttons and quiz options;
  icon-only buttons have `aria-label`
- Glass header with backdrop-blur
- Responsive grid of academy cards, click-to-expand topics list inside a
  planned academy's card
- Client-side routing (`react-router-dom`) with a fade/slide page transition
  on every navigation
- **Algorithms Academy** — full in-app section (`/algorithms/...`): 31 sorting
  algorithms plus a Big O Notation category, each with animated visualizers,
  a 5-tab detail page (Intent / Visualization / Implementation / Pros&Cons /
  Quiz), a deep-dive writeup, line-by-line JS/Python code walkthroughs, and a
  10-question quiz — all bilingual RU/EN
- **Architectural Patterns Academy** — full in-app section
  (`/architectural-patterns/...`): classic architectural patterns (MVC live
  so far, 9 more planned) on a static SVG component/relationship diagram
  instead of an animated visualizer, same 5-tab detail page and 10-question
  quiz format, bilingual RU/EN
- **Prerendering** — all 47 routes ship pre-rendered HTML (title, description,
  canonical, OG tags, JSON-LD, `#root` content), visible to crawlers without JS

## Stack

Vite + React 19, plain JS (no TypeScript). `react-router-dom` for routing and
`prism-react-renderer` for code-block syntax highlighting are the only two
runtime dependencies beyond React itself — no other UI libraries or CSS
frameworks. Design tokens (`src/styles/tokens.css`) are the single source of
truth for colors, typography, spacing, shadows and z-index; hardcoding these
values directly in components is not allowed.

## Structure

```
src/
  main.jsx                — entry point: BrowserRouter + route table, imports all stylesheets
  data/
    academies.js            — hub tree: live (external url or internal path) and planned (topics) academies
    algorithms/              — Algorithms Academy content: categories.js, per-algorithm modules (bilingual), index.js registry
    architectural-patterns/  — Architectural Patterns Academy content: categories.js, per-pattern modules (bilingual), index.js registry
  components/
    Layout.jsx               — shared route shell: intro, header, page-transition wrapper around <Outlet/>, footer, a11y widget
    Header.jsx                — logo, RU|EN switcher, theme toggle
    Hero.jsx                  — banner heading
    AcademyTree.jsx            — responsive grid of cards
    AcademyCard.jsx             — live+external: new-tab link; live+internal: <Link>; planned: click-to-expand topics
    Footer.jsx                  — copyright + links
    BrandMark.jsx                — SVG logo
    Icon.jsx                      — academy icons by id (GLYPHS map)
    PageIntro.jsx                  — canvas constellation animation, shown once per session, skippable
    AccessibilityWidget.jsx         — floating button + accessibility settings panel
    BackToTop.jsx                   — floating scroll-to-top button
    ErrorBoundary.jsx                — catches render errors, wraps AlgorithmDetailPage
    algorithms/                      — AlgorithmCard, CategoryCard, AlgorithmVisualizer, AlgorithmIcon, Breadcrumb, PrevNextNav, ComplexityPips
    ui/                                — CodeBlock, WalkthroughBlock, Quiz, Tabs, RichText, Accordion, PrerequisiteBadge, ExpandHint, TopicsList
  pages/                     — one component per route: HomePage, AlgorithmsCatalogPage, AlgorithmsCategoryPage, AlgorithmDetailPage, NotFoundPage
  hooks/
    useTheme.js              — light/dark theme, localStorage
    useLocale.js               — RU/EN language, localStorage
    useIntro.js                 — sessionStorage flag gating PageIntro
    useAccessibility.js          — a11y settings, localStorage
    usePageMeta.js               — sets title/description/canonical/OG per route via useEffect
    usePageContext.js             — wraps react-router's useOutletContext(), reads { lang, theme, t } from Layout
  utils/
    algorithmSteps.js         — pure step generators per algorithm slug; replays the real algorithm into visualizer frames
    sound.js                    — Web Audio tone synthesis (no audio files), used by Quiz.jsx for answer feedback
  i18n/
    strings.js                — ALL UI text in RU and EN; read via getStrings(lang); never add local TEXTS/LABELS
  styles/
    tokens.css                — design tokens (verbatim from design-patterns-academy): colors, typography, spacing, shadows, z-index
    base.css                   — CSS reset and base typography
    app.css                     — hub component styles
    algorithms.css               — Algorithms Academy styles
    accessibility.css             — a11y widget styles and global override classes
scripts/
  lib/routes.mjs             — getAllRoutes() / getSortingSlugs(), shared by sitemap + snapshot scripts
  generate-sitemap.mjs       — writes public/sitemap.xml (34 URLs); runs automatically via npm run build
  generate-snapshot.mjs      — dev-only: visits every route in headless Chromium, writes prerendered/**/page.json
  inject-prerender.mjs       — postbuild: reads page.json files, writes dist/<route>/index.html with pre-rendered content
  validate-algorithms.mjs       — schema validation for all algorithm files (structure, bilingual fields, quiz format, length-tell check)
  audit-quiz-length.mjs         — standalone length-tell check for quiz answers (both RU and EN)
  compute-step-breakpoints.mjs  — dev-only; computes exact frame-index breakpoints for the visualizer step labels and writes them back into each algorithm module; re-run after editing algorithmSteps.js
prerendered/                 — one page.json per route (34 total); commit these — they are the prerendered content source
```

## How to add an academy

**A new topic within an academy** — add a line to `topics.ru` and `topics.en`
of the relevant academy in `src/data/academies.js`.

**A new academy** — add an object to the `ACADEMIES` array:

Planned academy (`status: 'planned'`) — needs `topics`:
```js
{
  id: 'my-academy',
  name: 'My Academy',
  tagline: { ru: '<Russian tagline>', en: 'Short description' },
  icon: 'icon-id',
  status: 'planned',
  topics: {
    ru: ['<Russian topic 1>', '<Russian topic 2>'],
    en: ['Topic 1', 'Topic 2'],
  },
}
```

Live academy (`status: 'live'`) — by default, build it **in-app**, the same
way Algorithms Academy was built (routes + `src/data/<academy>/` + page
components). The hub-tree entry just points at it:
```js
{
  id: 'my-academy',
  name: 'My Academy',
  tagline: { ru: '<Russian tagline>', en: 'Short description' },
  icon: 'icon-id',
  status: 'live',
  internal: true,
  path: '/my-academy',
}
```
Only link out to a separately deployed project (`url` instead of `internal`/`path`)
if there's a specific reason — that's the exception, kept only for
`design-patterns-academy` which predates this convention.

`icon` must match a key in `GLYPHS` (`src/components/Icon.jsx`); add the SVG
path there for a new icon.

## How to add interface text

All UI text lives in `src/i18n/strings.js` under both `STRINGS.ru` and
`STRINGS.en`, read via `getStrings(lang)`. Local `TEXTS`/`LABELS` objects or
inline ternaries inside components are not allowed.

## Running

```bash
npm install
npm run dev         # dev server at localhost:5173
```

## Checks and build

```bash
npm run lint        # oxlint
npm run validate    # schema check for all algorithm files
npm run audit:quiz  # length-tell check for quiz answers (both RU and EN)
npm run build       # sitemap → vite build → inject prerender
```

After adding routes or changing page content, regenerate the prerendered snapshots:
```bash
npm run build
npm run snapshot    # requires a local Chromium; writes prerendered/**/page.json
npm run build       # second build picks up the new snapshots
```
Commit every `prerendered/**/page.json` — they are the only source of prerendered
content that Vercel uses at deploy time.

## License

Askan Academy Non-Commercial Source License © 2026 Askan Academy — free to view, use,
and modify for non-commercial purposes; commercial use requires prior written
permission. See [LICENSE](./LICENSE).

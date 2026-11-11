# Askan Academy

A free, bilingual (RU / EN) knowledge base for software engineers: algorithms,
architectural patterns and design patterns. Every topic comes with a visual
explanation, working code with a line-by-line walkthrough, and a quiz.

**Live site:** [askanacademy.com](https://askanacademy.com)

## What's inside

The home page is a map of academies. Each one is either live or planned.

| Academy | Status | Content |
| --- | --- | --- |
| Algorithms | Live | Sorting (31), Big O Notation (9), Searching (5 of 5). Recursion and Dynamic Programming are planned. |
| Architectural Patterns | Live | Presentation (MVC, MVP, MVVM), System Structure (Layered, Hexagonal, Microkernel, Client-Server), Distributed Systems (Microservices, Event-Driven, CQRS). |
| Design Patterns | Live | A separate site, linked from the hub. |
| Data Structures, Backend, DevOps, AI | Planned | The card lists the topics that are on the way. |

Every algorithm and pattern page has five tabs:

1. **Intent**: the problem, the solution, when to use it, real-world examples, and a longer deep dive.
2. **Visualization**: an animated step-by-step visualizer for algorithms, a growth chart for Big O, or an interactive component diagram for patterns.
3. **Implementation**: working code with a line-by-line walkthrough (JavaScript and Python for algorithms, JavaScript for patterns).
4. **Pros & Cons**.
5. **Quiz**: 10 questions, from basic to hard, with hints and explanations.

## Features

- Full Russian and English versions, switchable on any page.
- Light and dark themes.
- Accessibility panel: text size, high contrast, inverted colors, monochrome,
  a readable font and underlined links. The site works from the keyboard
  alone and respects `prefers-reduced-motion`.
- Every page is prerendered to static HTML, so search engines and link
  previews see the real content without running JavaScript.

## Tech stack

- [Vite](https://vite.dev) and React 19, plain JavaScript, plain CSS.
- [`react-router-dom`](https://reactrouter.com) for routing and
  [`prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer)
  for code highlighting. These are the only runtime dependencies besides React.
- No UI kit or CSS framework. Colors, type, spacing and shadows all come from
  design tokens in `src/styles/tokens.css`.
- Hosted on Vercel.

## Getting started

You need Node.js 20.19+ or 22.12+ (required by Vite 8).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server. |
| `npm run build` | Generate the sitemap, build with Vite, then inject the prerendered HTML. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Lint with oxlint. |
| `npm run validate` | Check every algorithm file against the content schema. |
| `npm run validate:architecture` | Same check for architectural pattern files. |
| `npm run audit:quiz` | Flag quiz questions where the correct answer gives itself away by being the longest. |
| `npm run snapshot` | Regenerate the prerendered pages (needs local Chromium, see below). |

## Project structure

```
src/
  data/          content: the academy map, algorithms, architectural patterns
  components/    shared UI, plus algorithms/, architecture/ and ui/ subfolders
  pages/         one component per route
  hooks/         theme, language, accessibility, page metadata
  i18n/          all interface text, in Russian and English
  utils/         visualizer step generators, sound effects, image lookup
  styles/        design tokens and stylesheets
scripts/         sitemap, prerendering, content validation
prerendered/     one page.json per route, the source for prerendered HTML
public/          favicon, OG image, illustrations, robots.txt, sitemap.xml
```

## Adding content

- **Interface text** goes in `src/i18n/strings.js`, in both `ru` and `en`.
  Components never contain their own strings.
- **An algorithm or pattern** is one data file under `src/data/algorithms/<category>/`
  or `src/data/architectural-patterns/<category>/`, registered in that academy's
  `index.js`. Run the matching `validate` script before committing.
- **An academy** is an entry in `src/data/academies.js`. A planned academy
  needs a list of `topics`. A live academy is built inside this app, the same
  way as Algorithms, and the entry points at its route:

  ```js
  {
    id: 'my-academy',
    name: 'My Academy',
    tagline: { ru: '...', en: 'Short description' },
    icon: 'my-academy',   // key in GLYPHS, src/components/Icon.jsx
    status: 'live',
    internal: true,
    path: '/my-academy',
  }
  ```

## Prerendering

Vercel's build machine can't run a headless browser, so prerendering happens in
two steps:

1. **Locally**, `npm run snapshot` opens every route in Chromium and saves its
   rendered HTML, title and description to `prerendered/<route>/page.json`.
2. **On every build**, `scripts/inject-prerender.mjs` turns each `page.json`
   into `dist/<route>/index.html`. No browser is needed for this step.

After you add a route or change page content, run:

```bash
npm run build
npm run snapshot
npm run build
```

Then commit the updated `prerendered/**/page.json` files.

## License

Source-available under the Askan Academy Non-Commercial Source License.
You can view, use and modify the code for non-commercial purposes.
Commercial use needs prior written permission. See [LICENSE](./LICENSE).

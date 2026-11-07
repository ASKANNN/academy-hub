const B = 'architecture-icon__base';
const A = 'architecture-icon__accent';
const F = 'architecture-icon__accent architecture-icon__accent--fill';

// Per-pattern icon (mirrors AlgorithmIcon.jsx, not Icon.jsx - category icons
// stay in Icon.jsx like CategoryCard.jsx's do). Every glyph is two layers:
// base (structure, currentColor) + accent (the pattern's essence, --icon-accent,
// at most one filled focal mark), see docs/ICON_SYSTEM.md.
const GLYPHS = {
  // Accent = the Controller - the one node that receives input and decides
  // how View and Model react; View and Model are plain structure.
  mvc: `
    <path class="${B}" d="M10 2h4v4h-4z M17 17h4v4h-4z M10.9 6.3 6.1 16.7 M13.1 6.3 17.9 16.7 M7.5 19H16.5"/>
    <path class="${F}" d="M3 17h4v4h-4z"/>`,

  // Accent = the Presenter - the one part paired one-to-one with the View
  // through an interface (the double-tick seam), the only thing that turns
  // user gestures into Model calls and formats the result back for the
  // screen. View (top) and Model (bottom) are plain passive structure.
  mvp: `
    <path class="${B}" d="M4 3h9v5H4z M11 16h9v5h-9z M6 8v2 M8 8v2 M9 15 12 16.6"/>
    <path class="${F}" d="M4 10h6v5H4z"/>`,

  // Accent = the two-way binding - two arcs closing a sync loop between the
  // View (screen, top left) and the filled ViewModel, so changes flow both
  // ways automatically and the ViewModel never calls the View.
  mvvm: `
    <path class="${B}" d="M3 3.5h9v7H3z M3 6h9"/>
    <path class="${A}" d="M14 7h2.5a2 2 0 0 1 2 2v2.5 M17 10 18.5 11.5 20 10 M10 17H7.5a2 2 0 0 1-2-2v-2.5 M4 14 5.5 12.5 7 14"/>
    <path class="${F}" d="M12 13.5h9v7h-9z"/>`,

  // Accent = the one-way downward arrow beside the stack: calls go only from
  // an upper layer to the one below it, and no layer ever calls upward.
  layered: `
    <path class="${B}" d="M3 3.5h12v4H3z M3 10h12v4H3z M3 16.5h12v4H3z"/>
    <path class="${A}" d="M19 4v12"/>
    <path class="${F}" d="M16.5 15.5 19 20.5 21.5 15.5Z"/>`,

  // Accent = the core - the filled centre that every adapter (the two plugs
  // on the left and right) connects to through a port on the hexagon's
  // boundary, while nothing leads outward from the core itself.
  hexagonal: `
    <path class="${B}" d="M12 5 18.06 8.5v7L12 19 5.94 15.5v-7Z M2 10h3v4H2z M19 10h3v4h-3z M5 12h.94 M18.06 12H19"/>
    <path class="${F}" d="M12 8.8 14.77 10.4v3.2L12 15.2 9.23 13.6v-3.2Z"/>`,

  // Accent = the new plug-in with its prongs, about to connect to the tall
  // core block (one plug-in is already attached above): the product grows by
  // plugging pieces into a core that itself stays the same.
  microkernel: `
    <path class="${B}" d="M3 3.5h8.5v17H3z M15 3.5h6v5.5h-6z M11.5 6.25H15"/>
    <path class="${A}" d="M13 15.75h2.5 M13 18.25h2.5"/>
    <path class="${F}" d="M15.5 14h5.5v6h-5.5z"/>`,

  // Accent = the request and its reply - two opposite arrows between the
  // client's screen (left) and the server tower (right): only the client
  // starts an exchange (the filled head), the server only answers.
  'client-server': `
    <path class="${B}" d="M2.5 5.5h6.5v5h-6.5z M5.75 10.5v3 M4 13.5h3.5 M17.5 3.5h4v17h-4z M19.5 7h.01 M19.5 10h.01"/>
    <path class="${A}" d="M10 8H13 M16 16H10.5 M12.3 14.2 10.5 16 12.3 17.8"/>
    <path class="${F}" d="M13 6 15.75 8 13 10Z"/>`,

  // Accent = one service lifted out of the row and shipped on its own (the
  // filled box and its upward arrow), while its neighbours stay where they
  // are: independent deployment is the style's defining property.
  microservices: `
    <path class="${B}" d="M2.5 11.5h5.5v9h-5.5z M16 11.5h5.5v9h-5.5z M9.5 20.5h5"/>
    <path class="${A}" d="M12 6V2.5 M10 4.5 12 2.5 14 4.5"/>
    <path class="${F}" d="M9.25 7.5h5.5v9h-5.5z"/>`,

  // Accent = one event (the filled dot) going into the channel and leaving it
  // as a copy for every subscriber, in one direction only: the producer does
  // not wait for anyone and nothing comes back.
  'event-driven': `
    <path class="${B}" d="M9 4h3v16H9z M17.5 3h4v4h-4z M17.5 10h4v4h-4z M17.5 17h4v4h-4z"/>
    <path class="${A}" d="M6.5 12H9 M12 12H16 M14.5 10.5 16 12 14.5 13.5 M12 7.5 16 5 M13.95 4.53 16 5 15.53 7.05 M12 16.5 16 19 M15.53 16.95 16 19 13.95 19.47"/>
    <path class="${F}" d="M2.5 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>`,

  // Accent = the two separate paths: writes go down into the write store (the
  // cylinder), reads come up out of the read model laid out as a table, and
  // the only link between the two is the event (the filled dot).
  cqrs: `
    <path class="${B}" d="M2.5 11a3 1.25 0 1 0 6 0a3 1.25 0 1 0 -6 0 M2.5 11v8.25a3 1.25 0 0 0 6 0V11 M15.5 9.75h6v10.75h-6z M15.5 13.33h6 M15.5 16.92h6"/>
    <path class="${A}" d="M5.5 2.5V7.5 M3.5 5.5 5.5 7.5 7.5 5.5 M18.5 7.5V2.5 M16.5 4.5 18.5 2.5 20.5 4.5 M8.5 15.5h2 M13.5 15.5h2"/>
    <path class="${F}" d="M10.5 15.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0"/>`,
};

export function ArchitectureIcon({ slug = '', size = 'md', className = '' }) {
  const glyph = GLYPHS[slug];
  if (!glyph) return null;

  const cls = ['architecture-icon', `architecture-icon--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      className={cls}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: glyph }}
    />
  );
}

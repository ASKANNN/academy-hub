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

const B = 'architecture-icon__base';
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

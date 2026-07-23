const GLYPHS = {
  patterns: 'M12 2.6 20.4 7v10L12 21.4 3.6 17V7z M12 2.6V12M20.4 7 12 12 3.6 7',
  algorithms: 'M3 20h18 M6.5 20V13 M12.5 20V7.5 M18.5 20V4',
  'data-structures':
    'M12 5m-2.3 0a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0 M5 18m-2.3 0a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0 M19 18m-2.3 0a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0 M10.6 6.8 6.2 16.2 M13.4 6.8 17.8 16.2',
  backend: 'M4 4h16v5H4z M4 10.5h16v5H4z M4 17h16v4H4z M7 6.5h.01 M7 13h.01 M7 19h.01',
  devops:
    'M4 12a8 8 0 0 1 8-8c2.2 0 4.2.9 5.7 2.3 M20 12a8 8 0 0 1-8 8c-2.2 0-4.2-.9-5.7-2.3 M16.5 3.5 17.7 6.3 14.9 7.5 M7.5 20.5 6.3 17.7 9.1 16.5',
  ai: 'M12 3v18M3 12h18M6 6l12 12M18 6 6 18',
};

export function Icon({ name, size = 24, className = '' }) {
  const d = GLYPHS[name];
  if (!d) return null;

  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

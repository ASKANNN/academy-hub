const GLYPHS = {
  patterns: 'M12 2.6 20.4 7v10L12 21.4 3.6 17V7z M12 2.6V12M20.4 7 12 12 3.6 7',
  algorithms:
    'M9 2.5h6v2.5H9z M12 5V7.5 M12 7.5 15.5 11 12 14.5 8.5 11Z M8.5 11 5 16 M15.5 11 19 16 M3 16h4v3H3z M17 16h4v3H17z',
  'data-structures':
    'M12 5m-2.3 0a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0 M5 18m-2.3 0a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0 M19 18m-2.3 0a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0 M10.6 6.8 6.2 16.2 M13.4 6.8 17.8 16.2',
  backend: 'M4 4h16v5H4z M4 10.5h16v5H4z M4 17h16v4H4z M7 6.5h.01 M7 13h.01 M7 19h.01',
  devops:
    'M4 12a8 8 0 0 1 8-8c2.2 0 4.2.9 5.7 2.3 M20 12a8 8 0 0 1-8 8c-2.2 0-4.2-.9-5.7-2.3 M16.5 3.5 17.7 6.3 14.9 7.5 M7.5 20.5 6.3 17.7 9.1 16.5',
  ai: 'M12 3v18M3 12h18M6 6l12 12M18 6 6 18',
  'big-o': 'M4 4V20H20 M5 18C9 18 11 6 19 5 M16.8 6 19 5 18 7.4',
  sorting: 'M4 20h3V10H4z M9.5 20h3V4h-3z M15 20h3V13h-3z',
  searching: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M16.2 16.2 21 21',
  recursion: 'M12 4a8 8 0 1 0 8 8h-3a5 5 0 1 1-5-5V4Z M17 4v4h-4',
  'dynamic-programming': 'M4 4h16v16H4z M4 10.5h16 M10.5 4v16',
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

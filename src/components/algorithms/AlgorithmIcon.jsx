const B = 'algorithm-icon__base';
const A = 'algorithm-icon__accent';
const F = 'algorithm-icon__accent algorithm-icon__accent--fill';
const D = 'style="fill:currentColor;stroke:none"';

const GLYPHS = {
  'o-1': `
    <path class="${B}" d="M3 21H21"/>
    <path class="${B}" d="M3 21V3"/>
    <path class="${A}" d="M4 8H20"/>
    <circle class="${F}" cx="14" cy="8" r="1.8"/>`,

  'o-log-n': `
    <path class="${B}" d="M3 21H21"/>
    <path class="${B}" d="M3 21V3"/>
    <path class="${A}" d="M4 20Q8 6 20 5"/>
    <circle class="${F}" cx="14" cy="6" r="1.8"/>`,

  'o-n': `
    <path class="${B}" d="M3 21H21"/>
    <path class="${B}" d="M3 21V3"/>
    <path class="${A}" d="M4 19L20 5"/>
    <circle class="${F}" cx="14" cy="10.3" r="1.8"/>`,

  'bitonic-sort': `
    <path class="${B}" d="M3 19L12 5"/>
    <path class="${A}" d="M12 5L21 19"/>
    <circle class="${F}" cx="12" cy="5" r="2"/>`,

  'block-sort': `
    <rect class="${B}" x="2" y="5" width="20" height="14" rx="1.5"/>
    <line class="${A}" x1="9" y1="5" x2="9" y2="19"/>
    <line class="${A}" x1="16" y1="5" x2="16" y2="19"/>`,

  'bogosort': `
    <rect class="${B}" x="4" y="4" width="16" height="16" rx="3"/>
    <circle class="${B}" cx="8.5" cy="8.5" r="1.3" ${D}/>
    <circle class="${B}" cx="15.5" cy="8.5" r="1.3" ${D}/>
    <circle class="${F}" cx="12" cy="12" r="1.3"/>
    <circle class="${B}" cx="8.5" cy="15.5" r="1.3" ${D}/>
    <circle class="${B}" cx="15.5" cy="15.5" r="1.3" ${D}/>`,

  'bubble-sort': `
    <circle class="${B}" cx="5" cy="18" r="2.5"/>
    <circle class="${B}" cx="12" cy="12.5" r="2.5"/>
    <circle class="${A}" cx="19" cy="7" r="2.5"/>
    <path class="${A}" d="M17.5 5.5L19 3.5L20.5 5.5"/>`,

  'bucket-sort': `
    <path class="${B}" d="M2 9L3.3 20H8.7L10 9Z"/>
    <path class="${B}" d="M2.6 9H9.4"/>
    <path class="${A}" d="M14 9L15.3 20H20.7L22 9Z"/>
    <path class="${A}" d="M14.6 9H21.4"/>
    <path class="${A}" d="M12 2V7M10.5 5.3L12 6.8L13.5 5.3"/>`,

  'cocktail-shaker-sort': `
    <path class="${B}" d="M7 3H17L15 21H9Z"/>
    <path class="${A}" d="M12 8V16M9.5 10.2L12 8L14.5 10.2M9.5 13.8L12 16L14.5 13.8"/>`,

  'comb-sort': `
    <rect class="${B}" x="2" y="3" width="20" height="2" rx="1"/>
    <line class="${B}" x1="4" y1="5" x2="4" y2="19"/>
    <line class="${B}" x1="7.5" y1="5" x2="7.5" y2="17"/>
    <line class="${B}" x1="11" y1="5" x2="11" y2="15"/>
    <line class="${A}" x1="14.5" y1="5" x2="14.5" y2="12"/>
    <line class="${A}" x1="18" y1="5" x2="18" y2="9"/>`,

  'counting-sort': `
    <line class="${B}" x1="2" y1="22" x2="22" y2="22"/>
    <rect class="${B}" x="3" y="13" width="4" height="9" rx="0.5"/>
    <rect class="${B}" x="9" y="8" width="4" height="14" rx="0.5"/>
    <rect class="${A}" x="15" y="3" width="4" height="19" rx="0.5"/>`,

  'cycle-sort': `
    <path class="${B}" d="M18 11A7 7 0 1 1 11 4"/>
    <path class="${A}" d="M9 2.7L11 4L9 5.3"/>
    <circle class="${F}" cx="18" cy="11" r="2"/>`,

  'flashsort': `
    <path class="${F}" d="M14 2L9 12H13L10 22L19 10H15L14 2Z"/>`,

  'gnome-sort': `
    <line class="${B}" x1="2" y1="20" x2="22" y2="20"/>
    <path class="${B}" d="M3 14H7L6.3 20H3.7Z"/>
    <path class="${F}" d="M10 14H14L13.3 20H10.7Z"/>
    <path class="${B}" d="M17 14H21L20.3 20H17.7Z"/>
    <path class="${A}" d="M12 6L15 11H9Z"/>
    <circle class="${A}" cx="12" cy="4.3" r="1"/>`,

  'heap-sort': `
    <circle class="${F}" cx="12" cy="4" r="2.5"/>
    <circle class="${B}" cx="7" cy="11" r="2"/>
    <circle class="${B}" cx="17" cy="11" r="2"/>
    <circle class="${B}" cx="4" cy="18" r="1.5"/>
    <circle class="${B}" cx="10" cy="18" r="1.5"/>
    <path class="${B}" d="M10.2 5.8L8.4 9.4M13.8 5.8L15.6 9.4M5.4 12.4L4.6 16.4M8.6 12.4L9.4 16.4"/>`,

  'insertion-sort': `
    <rect class="${B}" x="3" y="19" width="16" height="3" rx="1"/>
    <rect class="${B}" x="3" y="14" width="12" height="3" rx="1"/>
    <rect class="${B}" x="3" y="9" width="8" height="3" rx="1"/>
    <rect class="${F}" x="7" y="2" width="6" height="3" rx="1"/>
    <path class="${A}" d="M10 5.3V8M8.5 6.5L10 8L11.5 6.5"/>`,

  'intro-sort': `
    <path class="${B}" d="M12 21V14"/>
    <path class="${A}" d="M12 14L5 4M12 14L19 4"/>
    <circle class="${F}" cx="12" cy="14" r="2"/>`,

  'library-sort': `
    <rect class="${B}" x="2" y="9" width="3" height="12" rx="0.8"/>
    <rect class="${B}" x="7" y="13" width="3" height="8" rx="0.8"/>
    <rect class="${B}" x="15" y="5" width="3" height="16" rx="0.8"/>
    <rect class="${B}" x="20" y="11" width="3" height="10" rx="0.8"/>
    <rect class="${F}" x="11" y="1" width="3" height="4" rx="0.6"/>
    <path class="${A}" d="M12.5 5V9M11 7.3L12.5 9L14 7.3"/>`,

  'merge-sort': `
    <path class="${B}" d="M4 3C4 9 10 12 12 15"/>
    <path class="${B}" d="M20 3C20 9 14 12 12 15"/>
    <path class="${A}" d="M12 15V22"/>
    <path class="${A}" d="M10.5 20.5L12 22L13.5 20.5"/>`,

  'odd-even-sort': `
    <rect class="${B}" x="2" y="16" width="9" height="6" rx="0.5"/>
    <rect class="${B}" x="13" y="16" width="9" height="6" rx="0.5"/>
    <rect class="${A}" x="7.5" y="8" width="9" height="6" rx="0.5"/>
    <path class="${A}" d="M9.5 5.5L12 3L14.5 5.5"/>`,

  'pancake-sort': `
    <ellipse class="${B}" cx="12" cy="19" rx="9" ry="2"/>
    <ellipse class="${B}" cx="12" cy="15" rx="7" ry="1.7"/>
    <ellipse class="${A}" cx="12" cy="11" rx="5" ry="1.7"/>
    <path class="${A}" d="M7 8Q12 3 17 8"/>
    <path class="${A}" d="M15.5 6.5L17 8L15 8.5"/>`,

  'patience-sort': `
    <rect class="${B}" x="2" y="15" width="5" height="7" rx="0.8"/>
    <rect class="${B}" x="2" y="12" width="5" height="7" rx="0.8"/>
    <rect class="${B}" x="9.5" y="15" width="5" height="7" rx="0.8"/>
    <rect class="${B}" x="9.5" y="10" width="5" height="7" rx="0.8"/>
    <rect class="${F}" x="17" y="15" width="5" height="7" rx="0.8"/>
    <path class="${A}" d="M19.5 8V13M18 10L19.5 8L21 10"/>`,

  'postman-sort': `
    <rect class="${B}" x="2" y="6" width="20" height="13" rx="2"/>
    <path class="${A}" d="M2 8L12 14L22 8"/>`,

  'quick-sort': `
    <line class="${A}" x1="12" y1="2" x2="12" y2="22"/>
    <path class="${B}" d="M3 8H10M3 12H9M3 16H10"/>
    <path class="${B}" d="M21 8H14M21 12H15M21 16H14"/>`,

  'radix-sort': `
    <rect class="${B}" x="2" y="8" width="6" height="8" rx="1"/>
    <line class="${B}" x1="2" y1="12" x2="8" y2="12"/>
    <rect class="${B}" x="9" y="8" width="6" height="8" rx="1"/>
    <line class="${B}" x1="9" y1="12" x2="15" y2="12"/>
    <rect class="${F}" x="16" y="8" width="6" height="8" rx="1"/>
    <line class="${A}" x1="16" y1="12" x2="22" y2="12"/>
    <path class="${A}" d="M19 3.5V6.5M17.5 5L19 6.5L20.5 5"/>`,

  'selection-sort': `
    <rect class="${B}" x="2" y="18" width="3" height="4" rx="0.5"/>
    <rect class="${F}" x="9" y="17" width="3" height="5" rx="0.5"/>
    <rect class="${B}" x="14" y="9" width="3" height="13" rx="0.5"/>
    <rect class="${B}" x="19" y="5" width="3" height="17" rx="0.5"/>
    <path class="${A}" d="M9 14H5.5M7 12.5L5.5 14L7 15.5"/>`,

  'shell-sort': `
    <line class="${B}" x1="2" y1="20" x2="22" y2="20"/>
    <circle class="${B}" cx="4" cy="20" r="1.3" ${D}/>
    <circle class="${B}" cx="15" cy="20" r="1.3" ${D}/>
    <circle class="${F}" cx="20" cy="20" r="1.3"/>
    <path class="${B}" d="M4 20Q9.5 7 15 20"/>
    <path class="${A}" d="M15 20Q17.5 13 20 20"/>`,

  'smooth-sort': `
    <circle class="${B}" cx="4" cy="4" r="2.2"/>
    <circle class="${B}" cx="2" cy="9" r="1.4" ${D}/>
    <circle class="${B}" cx="6.5" cy="9" r="1.4" ${D}/>
    <path class="${B}" d="M4 6.2L2 8M4 6.2L6.5 8"/>
    <circle class="${B}" cx="12.5" cy="7" r="1.8"/>
    <circle class="${B}" cx="12.5" cy="13" r="1.4" ${D}/>
    <path class="${B}" d="M12.5 8.8V11.6"/>
    <circle class="${F}" cx="19.5" cy="10" r="1.5"/>
    <path class="${A}" d="M2 19Q11 23 22 19"/>`,

  'sorting-network': `
    <rect class="${B}" x="6" y="6" width="12" height="12" rx="1.5"/>
    <line class="${B}" x1="2" y1="9" x2="6" y2="9"/>
    <line class="${B}" x1="2" y1="15" x2="6" y2="15"/>
    <line class="${A}" x1="18" y1="9" x2="22" y2="9"/>
    <line class="${A}" x1="18" y1="15" x2="22" y2="15"/>
    <circle class="${F}" cx="12" cy="12" r="1.6"/>`,

  'spread-sort': `
    <circle class="${F}" cx="4" cy="12" r="2.5"/>
    <path class="${B}" d="M6.5 12L19 6"/>
    <path class="${B}" d="M6.5 12L19 12"/>
    <path class="${B}" d="M6.5 12L19 18"/>
    <circle class="${B}" cx="20" cy="6" r="1.5" ${D}/>
    <circle class="${B}" cx="20" cy="12" r="1.5" ${D}/>
    <circle class="${B}" cx="20" cy="18" r="1.5" ${D}/>`,

  'stooge-sort': `
    <path class="${B}" d="M2 8H22M2 8V11M22 8V11"/>
    <path class="${A}" d="M2 16H16M2 16V19M16 16V19"/>
    <circle class="${F}" cx="9" cy="12.5" r="1.5"/>`,

  'strand-sort': `
    <line class="${B}" x1="2" y1="20" x2="22" y2="20"/>
    <circle class="${B}" cx="9" cy="20" r="1.5" ${D}/>
    <circle class="${B}" cx="15" cy="20" r="1.5" ${D}/>
    <path class="${A}" d="M4 20Q10 10 20 4"/>
    <circle class="${F}" cx="4" cy="20" r="1.5"/>
    <circle class="${F}" cx="20" cy="4" r="1.5"/>
    <path class="${A}" d="M18 3.3L20 4L19.3 6"/>`,

  'tim-sort': `
    <path class="${B}" d="M5 8C5 12 10 14 12 17"/>
    <path class="${B}" d="M19 3C19 10 14 13 12 17"/>
    <path class="${A}" d="M12 17V22"/>
    <path class="${A}" d="M10.5 20.5L12 22L13.5 20.5"/>
    <circle class="${F}" cx="5" cy="8" r="1.5"/>`,

  'tournament-sort': `
    <line class="${B}" x1="2" y1="6" x2="8" y2="6"/>
    <line class="${B}" x1="2" y1="12" x2="8" y2="12"/>
    <line class="${B}" x1="8" y1="6" x2="8" y2="12"/>
    <line class="${B}" x1="2" y1="18" x2="8" y2="18"/>
    <line class="${B}" x1="8" y1="12" x2="8" y2="18"/>
    <line class="${A}" x1="8" y1="9" x2="14" y2="9"/>
    <line class="${A}" x1="8" y1="15" x2="14" y2="15"/>
    <line class="${A}" x1="14" y1="9" x2="14" y2="15"/>
    <line class="${A}" x1="14" y1="12" x2="20" y2="12"/>
    <circle class="${F}" cx="20" cy="12" r="2"/>`,
};

export function AlgorithmIcon({ slug = '', size = 'md', className = '' }) {
  const glyph = GLYPHS[slug];
  if (!glyph) return null;

  const cls = ['algorithm-icon', `algorithm-icon--${size}`, className]
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

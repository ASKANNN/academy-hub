const B = 'algorithm-icon__base';
const A = 'algorithm-icon__accent';
const F = 'algorithm-icon__accent algorithm-icon__accent--fill';
const D = 'style="fill:currentColor;stroke:none"';

const GLYPHS = {
  'bitonic-sort': `
    <path class="${B}" d="M3 19L12 5"/>
    <path class="${A}" d="M12 5L21 19"/>
    <circle class="${F}" cx="12" cy="5" r="2"/>`,

  'block-sort': `
    <rect class="${B}" x="2" y="5" width="20" height="14" rx="1.5"/>
    <line class="${A}" x1="9" y1="5" x2="9" y2="19"/>
    <line class="${A}" x1="16" y1="5" x2="16" y2="19"/>`,

  'bogosort': `
    <circle class="${B}" cx="5" cy="5" r="1.5" ${D}/>
    <circle class="${B}" cx="19" cy="7" r="1.5" ${D}/>
    <circle class="${B}" cx="7" cy="19" r="1.5" ${D}/>
    <circle class="${F}" cx="19" cy="18" r="1.5"/>
    <path class="${A}" d="M8 7L17 17M15.5 14.5L17 17L14.5 15.5"/>
    <path class="${B}" d="M17 7L8 17"/>`,

  'bubble-sort': `
    <circle class="${B}" cx="5" cy="18" r="2.5"/>
    <circle class="${B}" cx="12" cy="12.5" r="2.5"/>
    <circle class="${A}" cx="19" cy="7" r="2.5"/>
    <path class="${A}" d="M17.5 5.5L19 3.5L20.5 5.5"/>`,

  'bucket-sort': `
    <path class="${B}" d="M2 7v11h6V7"/>
    <path class="${B}" d="M9 7v11h6V7"/>
    <path class="${A}" d="M16 7v11h6V7"/>
    <line class="${A}" x1="16" y1="12" x2="22" y2="12"/>`,

  'cocktail-shaker-sort': `
    <line class="${B}" x1="7" y1="8" x2="7" y2="20"/>
    <line class="${B}" x1="11" y1="5" x2="11" y2="20"/>
    <line class="${B}" x1="15" y1="10" x2="15" y2="20"/>
    <line class="${B}" x1="19" y1="4" x2="19" y2="20"/>
    <path class="${A}" d="M3 6H21M19 4.5L21 6L19 7.5"/>
    <path class="${A}" d="M21 18H3M5 16.5L3 18L5 19.5"/>`,

  'comb-sort': `
    <path class="${B}" d="M3 4H21V8"/>
    <line class="${B}" x1="6" y1="8" x2="6" y2="21"/>
    <line class="${B}" x1="11" y1="8" x2="11" y2="17"/>
    <line class="${A}" x1="16" y1="8" x2="16" y2="13"/>
    <line class="${A}" x1="21" y1="8" x2="21" y2="11"/>`,

  'counting-sort': `
    <line class="${B}" x1="2" y1="22" x2="22" y2="22"/>
    <rect class="${B}" x="3" y="13" width="4" height="9" rx="0.5"/>
    <rect class="${B}" x="9" y="8" width="4" height="14" rx="0.5"/>
    <rect class="${A}" x="15" y="3" width="4" height="19" rx="0.5"/>`,

  'cycle-sort': `
    <path class="${B}" d="M19 12A7 7 0 1 1 12 5"/>
    <path class="${A}" d="M12 5L10 8M12 5L15 7"/>
    <circle class="${F}" cx="19" cy="12" r="2"/>`,

  'flashsort': `
    <path class="${F}" d="M14 2L9 12H13L10 22L19 10H15L14 2Z"/>`,

  'gnome-sort': `
    <line class="${B}" x1="2" y1="19" x2="22" y2="19"/>
    <circle class="${B}" cx="9" cy="19" r="1.5" ${D}/>
    <circle class="${B}" cx="14" cy="19" r="1.5" ${D}/>
    <circle class="${B}" cx="19" cy="19" r="1.5" ${D}/>
    <circle class="${F}" cx="4" cy="19" r="2"/>
    <path class="${A}" d="M19 16Q12 4 5 16"/>
    <path class="${A}" d="M7 14.5L5 16L7 17"/>`,

  'heap-sort': `
    <circle class="${F}" cx="12" cy="4" r="2.5"/>
    <circle class="${B}" cx="7" cy="11" r="2"/>
    <circle class="${B}" cx="17" cy="11" r="2"/>
    <circle class="${B}" cx="4" cy="18" r="1.5"/>
    <circle class="${B}" cx="10" cy="18" r="1.5"/>
    <path class="${B}" d="M10.2 5.8L8.4 9.4M13.8 5.8L15.6 9.4M5.4 12.4L4.6 16.4M8.6 12.4L9.4 16.4"/>`,

  'insertion-sort': `
    <rect class="${B}" x="3" y="9" width="18" height="3" rx="1"/>
    <rect class="${B}" x="3" y="14" width="12" height="3" rx="1"/>
    <rect class="${B}" x="3" y="19" width="16" height="3" rx="1"/>
    <rect class="${A}" x="7" y="2" width="6" height="3" rx="1"/>
    <path class="${A}" d="M10 5L10 8.5M8.5 7.5L10 9L11.5 7.5"/>`,

  'intro-sort': `
    <circle class="${F}" cx="12" cy="12" r="3"/>
    <path class="${B}" d="M12 9V3M10.5 3.5L12 2L13.5 3.5"/>
    <path class="${A}" d="M14.5 13.5L20 18M18.5 17L20 18L19 19.5"/>
    <path class="${B}" d="M9.5 13.5L4 18M5.5 17L4 18L5 19.5"/>`,

  'library-sort': `
    <rect class="${B}" x="2" y="5" width="4" height="17" rx="1"/>
    <rect class="${B}" x="7.5" y="8" width="4" height="14" rx="1"/>
    <rect class="${B}" x="14" y="3" width="4" height="19" rx="1"/>
    <rect class="${B}" x="19" y="7" width="3" height="15" rx="1"/>
    <rect class="${A}" x="11" y="2" width="2.5" height="5" rx="0.5"/>
    <path class="${A}" d="M12.25 7L12.25 9.5M11 8.5L12.25 10L13.5 8.5"/>`,

  'merge-sort': `
    <path class="${B}" d="M4 3C4 9 10 12 12 15"/>
    <path class="${B}" d="M20 3C20 9 14 12 12 15"/>
    <path class="${A}" d="M12 15V22"/>
    <path class="${A}" d="M10.5 20.5L12 22L13.5 20.5"/>`,

  'odd-even-sort': `
    <rect class="${B}" x="2" y="14" width="3" height="8" rx="0.5"/>
    <rect class="${B}" x="7" y="8" width="3" height="14" rx="0.5"/>
    <path class="${B}" d="M3.5 11H8.5M3.5 10L2 11L3.5 12"/>
    <rect class="${A}" x="13" y="5" width="3" height="17" rx="0.5"/>
    <rect class="${A}" x="18" y="10" width="3" height="12" rx="0.5"/>
    <path class="${A}" d="M14.5 8H19.5M20.5 7L22 8L20.5 9"/>`,

  'pancake-sort': `
    <ellipse class="${B}" cx="12" cy="19" rx="9" ry="2"/>
    <ellipse class="${B}" cx="12" cy="15" rx="7" ry="1.7"/>
    <ellipse class="${A}" cx="12" cy="11" rx="5" ry="1.7"/>
    <path class="${A}" d="M7 8Q12 3 17 8"/>
    <path class="${A}" d="M15.5 6.5L17 8L15 8.5"/>`,

  'patience-sort': `
    <rect class="${B}" x="2" y="16" width="5" height="3" rx="0.5"/>
    <rect class="${B}" x="2" y="12" width="5" height="3" rx="0.5"/>
    <rect class="${B}" x="2" y="8" width="5" height="3" rx="0.5"/>
    <rect class="${B}" x="9.5" y="16" width="5" height="3" rx="0.5"/>
    <rect class="${B}" x="9.5" y="12" width="5" height="3" rx="0.5"/>
    <rect class="${B}" x="17" y="16" width="5" height="3" rx="0.5"/>
    <rect class="${A}" x="17" y="5" width="5" height="3" rx="0.5"/>
    <path class="${A}" d="M19.5 8L19.5 11.5M18.2 10.5L19.5 12L20.8 10.5"/>`,

  'postman-sort': `
    <rect class="${B}" x="2" y="6" width="20" height="13" rx="2"/>
    <path class="${A}" d="M2 8L12 14L22 8"/>`,

  'quick-sort': `
    <line class="${A}" x1="12" y1="2" x2="12" y2="22"/>
    <path class="${B}" d="M3 8H10M3 12H9M3 16H10"/>
    <path class="${B}" d="M21 8H14M21 12H15M21 16H14"/>`,

  'radix-sort': `
    <rect class="${B}" x="2" y="10" width="5" height="12" rx="1"/>
    <line class="${B}" x1="2" y1="14" x2="7" y2="14"/>
    <line class="${B}" x1="2" y1="18" x2="7" y2="18"/>
    <rect class="${B}" x="9.5" y="6" width="5" height="16" rx="1"/>
    <line class="${B}" x1="9.5" y1="10" x2="14.5" y2="10"/>
    <line class="${B}" x1="9.5" y1="14" x2="14.5" y2="14"/>
    <rect class="${A}" x="17" y="2" width="5" height="20" rx="1"/>
    <line class="${A}" x1="17" y1="7" x2="22" y2="7"/>
    <line class="${A}" x1="17" y1="12" x2="22" y2="12"/>`,

  'selection-sort': `
    <rect class="${B}" x="10" y="14" width="3" height="8" rx="0.5"/>
    <rect class="${B}" x="15" y="9" width="3" height="13" rx="0.5"/>
    <rect class="${B}" x="20" y="5" width="2" height="17" rx="0.5"/>
    <circle class="${A}" cx="5" cy="13" r="4.5"/>
    <line class="${A}" x1="8.5" y1="16.5" x2="11.5" y2="19.5"/>
    <rect class="${B}" x="2" y="16" width="3" height="6" rx="0.5"/>`,

  'shell-sort': `
    <line class="${B}" x1="2" y1="20" x2="22" y2="20"/>
    <circle class="${B}" cx="4" cy="20" r="1.2" ${D}/>
    <circle class="${B}" cx="9" cy="20" r="1.2" ${D}/>
    <circle class="${B}" cx="14" cy="20" r="1.2" ${D}/>
    <circle class="${B}" cx="19" cy="20" r="1.2" ${D}/>
    <path class="${B}" d="M4 20Q11.5 7 19 20"/>
    <path class="${A}" d="M4 20Q8.5 11 13 20"/>
    <path class="${A}" d="M9 20Q12 14 15 20"/>`,

  'smooth-sort': `
    <circle class="${F}" cx="12" cy="5" r="2.5"/>
    <circle class="${B}" cx="7" cy="11" r="2"/>
    <circle class="${B}" cx="17" cy="11" r="1.5"/>
    <circle class="${B}" cx="4.5" cy="17" r="1.5"/>
    <circle class="${B}" cx="9.5" cy="17" r="1.5"/>
    <path class="${B}" d="M10.2 6.8L8.4 9.4M13.8 6.8L15.8 9.8M5.4 12.4L5 15.4M8.6 12.4L9 15.4"/>
    <path class="${A}" d="M3 21L7 17L10 21"/>`,

  'sorting-network': `
    <line class="${B}" x1="2" y1="7" x2="22" y2="7"/>
    <line class="${B}" x1="2" y1="12" x2="22" y2="12"/>
    <line class="${B}" x1="2" y1="17" x2="22" y2="17"/>
    <line class="${A}" x1="7" y1="7" x2="7" y2="12"/>
    <circle class="${F}" cx="7" cy="7" r="1.5"/>
    <circle class="${F}" cx="7" cy="12" r="1.5"/>
    <line class="${A}" x1="13" y1="12" x2="13" y2="17"/>
    <circle class="${F}" cx="13" cy="12" r="1.5"/>
    <circle class="${F}" cx="13" cy="17" r="1.5"/>
    <line class="${B}" x1="19" y1="7" x2="19" y2="17"/>
    <circle class="${B}" cx="19" cy="7" r="1.5" ${D}/>
    <circle class="${B}" cx="19" cy="17" r="1.5" ${D}/>`,

  'spread-sort': `
    <circle class="${F}" cx="4" cy="12" r="2.5"/>
    <path class="${B}" d="M6.5 12L19 6"/>
    <path class="${B}" d="M6.5 12L19 12"/>
    <path class="${B}" d="M6.5 12L19 18"/>
    <circle class="${B}" cx="20" cy="6" r="1.5" ${D}/>
    <circle class="${B}" cx="20" cy="12" r="1.5" ${D}/>
    <circle class="${B}" cx="20" cy="18" r="1.5" ${D}/>`,

  'stooge-sort': `
    <rect class="${B}" x="2" y="10" width="20" height="4" rx="1"/>
    <path class="${A}" d="M2 9V5H15V9"/>
    <path class="${B}" d="M9 15V19H22V15"/>
    <circle class="${F}" cx="11" cy="12" r="1.5"/>`,

  'strand-sort': `
    <line class="${B}" x1="2" y1="20" x2="22" y2="20"/>
    <circle class="${B}" cx="5" cy="20" r="1.5" ${D}/>
    <circle class="${B}" cx="10" cy="20" r="1.5" ${D}/>
    <circle class="${B}" cx="15" cy="20" r="1.5" ${D}/>
    <circle class="${B}" cx="20" cy="20" r="1.5" ${D}/>
    <path class="${A}" d="M5 20Q10 12 17 6"/>
    <circle class="${F}" cx="5" cy="20" r="1.5"/>
    <circle class="${F}" cx="11" cy="14.5" r="1.5"/>
    <circle class="${F}" cx="17" cy="6" r="1.5"/>
    <path class="${A}" d="M15.5 4.5L17 6L17 8"/>`,

  'tim-sort': `
    <line class="${B}" x1="12" y1="3" x2="12" y2="21"/>
    <rect class="${B}" x="2" y="15" width="4" height="7" rx="0.5"/>
    <rect class="${B}" x="2" y="9" width="4" height="5" rx="0.5"/>
    <rect class="${A}" x="2" y="3" width="4" height="5" rx="0.5"/>
    <path class="${A}" d="M2 6L6 6"/>
    <path class="${B}" d="M14 4C14 10 20 10 20 14"/>
    <path class="${B}" d="M14 22C14 16 20 16 20 14"/>
    <circle class="${F}" cx="20" cy="14" r="1.5"/>`,

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

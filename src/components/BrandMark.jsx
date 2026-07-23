export function BrandMark({ size = 28 }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <line x1="16" y1="16" x2="16" y2="6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <line x1="16" y1="16" x2="7.4" y2="21.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <line x1="16" y1="16" x2="24.6" y2="21.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <polygon
        points="16 11.5 20 14 20 18 16 20.5 12 18 12 14"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="6.4" r="2.1" fill="currentColor" />
      <circle cx="7.4" cy="21.8" r="2.1" fill="currentColor" />
      <circle cx="24.6" cy="21.8" r="2.1" fill="currentColor" />
    </svg>
  );
}

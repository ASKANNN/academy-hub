import { useId } from 'react';

export function BrandMark({ size = 28 }) {
  const gradientId = useId();

  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="5" y1="24" x2="27" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="35%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <polygon
        points="16 4, 27 24, 23.3 24, 16 12, 8.7 24, 5 24"
        fill={`url(#${gradientId})`}
      />
      <polygon
        points="16 17.5, 18.2 20.8, 16 24.2, 13.8 20.8"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

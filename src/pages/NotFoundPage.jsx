import { Link } from 'react-router-dom';
import { usePageContext } from '../components/Layout.jsx';
import { getStrings } from '../i18n/strings.js';

const BACKDROP_POINTS = [
  [4, 38], [14, 66], [26, 30], [38, 72], [50, 42],
  [62, 68], [74, 34], [86, 62], [94, 40], [20, 48],
];

const BACKDROP_LINES = [
  [0, 2], [2, 9], [9, 4], [4, 6], [6, 8], [1, 2], [3, 4], [5, 7],
];

function ErrorBackdrop() {
  return (
    <svg className="error-page__backdrop" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {BACKDROP_LINES.map(([a, b], i) => {
        const [x1, y1] = BACKDROP_POINTS[a];
        const [x2, y2] = BACKDROP_POINTS[b];
        return (
          <line
            key={`${a}-${b}`}
            className="error-page__bg-line"
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            style={{ animationDelay: `${(i * 0.6).toFixed(2)}s` }}
          />
        );
      })}
      {BACKDROP_POINTS.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          className="error-page__bg-node"
          cx={x}
          cy={y}
          r={0.7}
          style={{ animationDelay: `${(i * 0.4).toFixed(2)}s` }}
        />
      ))}
    </svg>
  );
}

function ErrorIllustration() {
  return (
    <svg className="error-illustration" viewBox="0 0 200 106" fill="none" aria-hidden="true">
      <rect className="error-illustration__base" x="14" y="40" width="48" height="38" rx="8" />
      <path className="error-illustration__base" d="M24 58h28M24 66h20" />
      <path className="error-illustration__dash" d="M62 59c30 0 46 0 62 0" />
      <circle className="error-illustration__particle" cx="93" cy="59" r="2.6" />
      <g className="error-illustration__ghost-wrap">
        <circle className="error-illustration__glow" cx="162" cy="59" r="26" />
        <rect className="error-illustration__ghost" x="138" y="40" width="48" height="38" rx="8" />
        <text className="error-illustration__mark" x="162" y="65" textAnchor="middle">?</text>
      </g>
    </svg>
  );
}

export default function NotFoundPage() {
  const { lang } = usePageContext();
  const t = getStrings(lang).algorithms;

  return (
    <div className="error-page" aria-labelledby="error-title">
      <ErrorBackdrop />
      <div className="container">
        <div className="error-page__content">
          <div className="error-page__art">
            <ErrorIllustration />
            <span className="error-page__code" aria-hidden="true">404</span>
          </div>
          <h1 className="error-page__title" id="error-title">{t.notFoundTitle}</h1>
          <p className="error-page__desc">{t.notFoundSubtitle}</p>
          <div className="error-page__actions">
            <Link to="/" className="btn btn--primary">{t.notFoundCta}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

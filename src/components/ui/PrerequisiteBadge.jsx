import { Link } from 'react-router-dom';

export function PrerequisiteBadge({ t }) {
  return (
    <div className="prerequisite-badge">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="8" cy="8" r="6" />
        <line x1="8" y1="7" x2="8" y2="11" />
        <circle cx="8" cy="5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
      <span className="prerequisite-badge__label">{t.prerequisiteLabel}:</span>
      <Link to="/algorithms/big-o" className="prerequisite-badge__link">{t.prerequisiteBigO}</Link>
    </div>
  );
}

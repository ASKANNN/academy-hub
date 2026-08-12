export function ExpandHint({ expanded, onToggle, label }) {
  const className = `academy-card__expand-hint${onToggle ? ' academy-card__expand-hint--button' : ''} ${expanded ? 'is-expanded' : ''}`;

  if (!onToggle) {
    return <span className={className}>{label}</span>;
  }

  return (
    <button type="button" className={className} onClick={onToggle} aria-expanded={expanded}>
      {label}
    </button>
  );
}

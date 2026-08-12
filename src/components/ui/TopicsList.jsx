export function TopicsList({ expanded, items }) {
  return (
    <div className={`academy-card__topics-wrap ${expanded ? 'is-expanded' : ''}`}>
      <ul className="academy-card__topics">
        {items.map((item) => (
          <li key={item.key} className="academy-card__topic">
            <span className={`academy-card__topic-dot ${item.dotClassName ?? ''}`} aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

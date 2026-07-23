import { useState } from 'react';
import { Icon } from './Icon.jsx';

const TEXTS = {
  ru: {
    live: 'Открыто',
    planned: 'Скоро',
    openLabel: 'перейти',
    expand: 'Показать темы',
    collapse: 'Свернуть',
  },
  en: {
    live: 'Open',
    planned: 'Coming soon',
    openLabel: 'open',
    expand: 'Show topics',
    collapse: 'Collapse',
  },
};

function CardShell({ academy, lang, children, ...rest }) {
  const t = TEXTS[lang] ?? TEXTS.ru;
  const tagline = academy.tagline[lang] ?? academy.tagline.ru;

  return (
    <div className={`academy-card academy-card--${academy.status}`} {...rest}>
      <div className="academy-card__icon">
        <Icon name={academy.icon} size={26} />
      </div>
      <div className="academy-card__body">
        <div className="academy-card__head">
          <h3 className="academy-card__title">{academy.name}</h3>
          <span className={`status-badge status-badge--${academy.status}`}>
            {academy.status === 'live' ? t.live : t.planned}
          </span>
        </div>
        <p className="academy-card__tagline">{tagline}</p>
        {children}
      </div>
    </div>
  );
}

export function AcademyCard({ academy, lang = 'ru' }) {
  const [expanded, setExpanded] = useState(false);
  const t = TEXTS[lang] ?? TEXTS.ru;

  if (academy.status === 'live') {
    return (
      <a
        className="academy-card-link"
        href={academy.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${academy.name} — ${t.openLabel}`}
      >
        <CardShell academy={academy} lang={lang} />
      </a>
    );
  }

  const topics = academy.topics[lang] ?? academy.topics.ru;

  return (
    <button
      type="button"
      className="academy-card-link academy-card-link--button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
    >
      <CardShell academy={academy} lang={lang}>
        <div className={`academy-card__topics-wrap ${expanded ? 'is-expanded' : ''}`}>
          <ul className="academy-card__topics">
            {topics.map((topic) => (
              <li key={topic} className="academy-card__topic">
                <span className="academy-card__topic-dot" aria-hidden="true" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <span className="academy-card__expand-hint">
          {expanded ? t.collapse : t.expand}
        </span>
      </CardShell>
    </button>
  );
}

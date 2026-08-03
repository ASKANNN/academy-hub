import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon.jsx';
import { getStrings } from '../../i18n/strings.js';

export function CategoryCard({ category, count, algorithms, lang = 'ru' }) {
  const [expanded, setExpanded] = useState(false);
  const t = getStrings(lang).algorithms;
  const name = category.name[lang] ?? category.name.ru;
  const tagline = category.tagline[lang] ?? category.tagline.ru;

  if (category.status === 'live') {
    const topics = (algorithms ?? []).map((a) => a.name[lang] ?? a.name.ru);

    return (
      <div className="academy-card-link">
        <div className="academy-card academy-card--live">
          <Link
            className="academy-card__stretched-link"
            to={`/algorithms/${category.slug}`}
            aria-label={`${name} — ${t.categoryOpenHint}`}
          />
          <div className="academy-card__icon">
            <Icon name={category.icon} size={26} />
          </div>
          <div className="academy-card__body">
            <div className="academy-card__head">
              <h3 className="academy-card__title">{name}</h3>
              <span className="status-badge status-badge--live">{t.categoryCount(count)}</span>
            </div>
            <p className="academy-card__tagline">{tagline}</p>
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
            <button
              type="button"
              className={`academy-card__expand-hint academy-card__expand-hint--button ${expanded ? 'is-expanded' : ''}`}
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? t.collapse : t.expand}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const topics = category.topics?.[lang] ?? category.topics?.ru ?? [];

  return (
    <button
      type="button"
      className="academy-card-link academy-card-link--button"
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
    >
      <div className="academy-card academy-card--planned">
        <div className="academy-card__icon">
          <Icon name={category.icon} size={26} />
        </div>
        <div className="academy-card__body">
          <div className="academy-card__head">
            <h3 className="academy-card__title">{name}</h3>
            <span className="status-badge status-badge--planned">{t.comingSoon}</span>
          </div>
          <p className="academy-card__tagline">{tagline}</p>
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
          <span className={`academy-card__expand-hint ${expanded ? 'is-expanded' : ''}`}>
            {t.comingSoonHint}
          </span>
        </div>
      </div>
    </button>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon.jsx';
import { TopicsList } from '../ui/TopicsList.jsx';
import { ExpandHint } from '../ui/ExpandHint.jsx';
import { getStrings } from '../../i18n/strings.js';

export function ArchitectureCategoryCard({ category, count, patterns, lang = 'ru' }) {
  const [expanded, setExpanded] = useState(false);
  const t = getStrings(lang).architecturalPatterns;
  const name = category.name[lang] ?? category.name.ru;
  const tagline = category.tagline[lang] ?? category.tagline.ru;

  if (category.status === 'live') {
    const topics = (patterns ?? []).map((p) => p.name[lang] ?? p.name.ru);

    return (
      <div className="academy-card-link">
        <div className="academy-card academy-card--live">
          <Link
            className="academy-card__stretched-link"
            to={`/architectural-patterns/${category.slug}`}
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
            <TopicsList expanded={expanded} items={topics.map((topic) => ({ key: topic, label: topic }))} />
            <ExpandHint
              expanded={expanded}
              onToggle={() => setExpanded((v) => !v)}
              label={expanded ? t.collapse : t.expand}
            />
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
          <TopicsList expanded={expanded} items={topics.map((topic) => ({ key: topic, label: topic }))} />
          <ExpandHint expanded={expanded} label={t.comingSoonHint} />
        </div>
      </div>
    </button>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon.jsx';
import { TopicsList } from './ui/TopicsList.jsx';
import { ExpandHint } from './ui/ExpandHint.jsx';
import { getStrings } from '../i18n/strings.js';

function CardShell({ academy, lang, children, ...rest }) {
  const t = getStrings(lang).academyCard;
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
  const onToggle = () => setExpanded((v) => !v);
  const t = getStrings(lang).academyCard;

  if (academy.status === 'live') {
    const topics = academy.topics?.[lang] ?? academy.topics?.ru;

    return (
      <div className="academy-card-link">
        <CardShell academy={academy} lang={lang}>
          {academy.internal ? (
            <Link
              className="academy-card__stretched-link"
              to={academy.path}
              aria-label={`${academy.name} — ${t.openLabel}`}
            />
          ) : (
            <a
              className="academy-card__stretched-link"
              href={academy.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${academy.name} — ${t.openLabel}`}
            />
          )}
          {academy.categories && (
            <>
              <TopicsList
                expanded={expanded}
                items={academy.categories.map((cat) => ({
                  key: cat.key,
                  label: `${cat.label[lang] ?? cat.label.ru} · ${cat.count}`,
                  dotClassName: `academy-card__topic-dot--${cat.color}`,
                }))}
              />
              <ExpandHint expanded={expanded} onToggle={onToggle} label={expanded ? t.collapse : t.expand} />
            </>
          )}
          {topics && (
            <>
              <TopicsList expanded={expanded} items={topics.map((topic) => ({ key: topic, label: topic }))} />
              <ExpandHint expanded={expanded} onToggle={onToggle} label={expanded ? t.collapse : t.expand} />
            </>
          )}
        </CardShell>
      </div>
    );
  }

  const topics = academy.topics[lang] ?? academy.topics.ru;

  return (
    <button
      type="button"
      className="academy-card-link academy-card-link--button"
      onClick={onToggle}
      aria-expanded={expanded}
    >
      <CardShell academy={academy} lang={lang}>
        <TopicsList expanded={expanded} items={topics.map((topic) => ({ key: topic, label: topic }))} />
        <ExpandHint expanded={expanded} label={expanded ? t.collapse : t.expand} />
      </CardShell>
    </button>
  );
}

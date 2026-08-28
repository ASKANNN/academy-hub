import { Link } from 'react-router-dom';

export function ArchitecturePrevNextNav({ category, prev, next, lang, t }) {
  if (!prev && !next) return null;

  return (
    <nav className="prev-next-nav">
      {prev ? (
        <Link to={`/architectural-patterns/${category}/${prev.slug}`} className="prev-next-nav__link prev-next-nav__link--prev">
          <span className="prev-next-nav__label">← {t.prev}</span>
          <span className="prev-next-nav__title">{prev.name[lang] ?? prev.name.ru}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link to={`/architectural-patterns/${category}/${next.slug}`} className="prev-next-nav__link prev-next-nav__link--next">
          <span className="prev-next-nav__label">{t.next} →</span>
          <span className="prev-next-nav__title">{next.name[lang] ?? next.name.ru}</span>
        </Link>
      ) : <span />}
    </nav>
  );
}

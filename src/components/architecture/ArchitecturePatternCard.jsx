import { Link } from 'react-router-dom';
import { ArchitectureIcon } from './ArchitectureIcon.jsx';
import { ComplexityPips } from '../ui/ComplexityPips.jsx';

export function ArchitecturePatternCard({ pattern, lang = 'ru', index = 0 }) {
  const name = pattern.name[lang] ?? pattern.name.ru;
  const intent = pattern.intent[lang] ?? pattern.intent.ru;

  return (
    <Link
      to={`/architectural-patterns/${pattern.category}/${pattern.slug}`}
      className="academy-card-link algorithm-card-link"
      style={{ '--card-index': index }}
    >
      <div className="academy-card academy-card--live algorithm-card">
        <div className="academy-card__body">
          <div className="academy-card__head">
            <h3 className="academy-card__title">
              <ArchitectureIcon slug={pattern.slug} size="md" />
              {name}
            </h3>
            <ComplexityPips popularity={pattern.popularity} />
          </div>
          <p className="academy-card__tagline">{intent}</p>
        </div>
      </div>
    </Link>
  );
}

import { Link } from 'react-router-dom';

export function AlgorithmCard({ algorithm, lang = 'ru' }) {
  const name = algorithm.name[lang] ?? algorithm.name.ru;
  const intent = algorithm.intent[lang] ?? algorithm.intent.ru;

  return (
    <Link
      to={`/algorithms/${algorithm.category}/${algorithm.slug}`}
      className="academy-card-link algorithm-card-link"
    >
      <div className="academy-card academy-card--live algorithm-card">
        <div className="academy-card__body">
          <div className="academy-card__head">
            <h3 className="academy-card__title">{name}</h3>
            <span className="complexity-pips" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`complexity-pip ${n <= algorithm.popularity ? 'is-filled' : ''}`} />
              ))}
            </span>
          </div>
          <p className="academy-card__tagline">{intent}</p>
          <div className="algorithm-card__complexity">
            <span className="algorithm-card__complexity-badge">{algorithm.complexity.time.average}</span>
            <span className="algorithm-card__complexity-badge">{algorithm.complexity.space}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

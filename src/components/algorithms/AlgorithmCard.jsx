import { Link } from 'react-router-dom';
import { AlgorithmIcon } from './AlgorithmIcon.jsx';
import { ComplexityPips } from './ComplexityPips.jsx';
import { getStrings } from '../../i18n/strings.js';

const TIER_KEY = {
  fast: 'tierFast',
  moderate: 'tierModerate',
  slow: 'tierSlow',
  catastrophic: 'tierCatastrophic',
};

export function AlgorithmCard({ algorithm, lang = 'ru', index = 0 }) {
  const t = getStrings(lang).algorithms;
  const name = algorithm.name[lang] ?? algorithm.name.ru;
  const intent = algorithm.intent[lang] ?? algorithm.intent.ru;
  const tierLabel = algorithm.tier ? t[TIER_KEY[algorithm.tier]] : null;

  return (
    <Link
      to={`/algorithms/${algorithm.category}/${algorithm.slug}`}
      className="academy-card-link algorithm-card-link"
      style={{ '--card-index': index }}
    >
      <div className={`academy-card academy-card--live algorithm-card${algorithm.category === 'big-o' ? ' algorithm-card--big-o' : ''}`}>
        <div className="academy-card__body">
          <div className="academy-card__head">
            <h3 className="academy-card__title">
              <AlgorithmIcon slug={algorithm.slug} size="md" />
              {name}
            </h3>
            <ComplexityPips popularity={algorithm.popularity} />
          </div>
          <p className="academy-card__tagline">{intent}</p>
          {algorithm.category !== 'big-o' && (
            <div className="algorithm-card__complexity">
              <span className="algorithm-card__complexity-badge">{algorithm.complexity.time.average}</span>
              <span className="algorithm-card__complexity-badge">{algorithm.complexity.space}</span>
            </div>
          )}
          {tierLabel && (
            <div className="algorithm-card__complexity">
              <span className={`algorithm-card__tier-badge is-${algorithm.tier}`}>{tierLabel}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

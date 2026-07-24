import { ACADEMIES } from '../data/academies.js';
import { AcademyCard } from './AcademyCard.jsx';
import { getStrings } from '../i18n/strings.js';

export function AcademyTree({ lang = 'ru' }) {
  const t = getStrings(lang).academyTree;

  return (
    <div className="cards-bg">
      <section className="academy-tree container" aria-label={t.label}>
        {ACADEMIES.map((academy) => (
          <AcademyCard key={academy.id} academy={academy} lang={lang} />
        ))}
      </section>
    </div>
  );
}

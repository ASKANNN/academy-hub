import { ACADEMIES } from '../data/academies.js';
import { AcademyCard } from './AcademyCard.jsx';

const LABEL = { ru: 'Дерево академий', en: 'Academy tree' };

export function AcademyTree({ lang = 'ru' }) {
  return (
    <div className="cards-bg">
      <section className="academy-tree container" aria-label={LABEL[lang]}>
        {ACADEMIES.map((academy) => (
          <AcademyCard key={academy.id} academy={academy} lang={lang} />
        ))}
      </section>
    </div>
  );
}

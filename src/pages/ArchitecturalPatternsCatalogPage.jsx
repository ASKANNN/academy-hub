import { usePageContext } from '../hooks/usePageContext.js';
import { ArchitectureCategoryCard } from '../components/architecture/ArchitectureCategoryCard.jsx';
import { ARCHITECTURE_CATEGORIES, getPatternsByCategory } from '../data/architectural-patterns/index.js';
import { getStrings } from '../i18n/strings.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function ArchitecturalPatternsCatalogPage() {
  const { lang } = usePageContext();
  const t = getStrings(lang).architecturalPatterns;

  usePageMeta({
    title: 'Architectural Patterns Academy | Askan Academy',
    description: t.catalogSubtitle,
    path: '/architectural-patterns',
  });

  return (
    <div className="cards-bg">
      <section className="algorithms-hero container">
        <span className="hero__eyebrow">{t.catalogEyebrow}</span>
        <h1 className="algorithms-hero__title">{t.catalogTitle}</h1>
        <p className="algorithms-hero__subtitle">{t.catalogSubtitle}</p>
      </section>
      <section className="academy-tree container" aria-label={t.catalogTitle}>
        {ARCHITECTURE_CATEGORIES.map((category) => (
          <ArchitectureCategoryCard
            key={category.slug}
            category={category}
            count={getPatternsByCategory(category.slug).length}
            patterns={getPatternsByCategory(category.slug)}
            lang={lang}
          />
        ))}
      </section>
    </div>
  );
}

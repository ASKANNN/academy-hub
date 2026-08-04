import { usePageContext } from '../components/Layout.jsx';
import { CategoryCard } from '../components/algorithms/CategoryCard.jsx';
import { ALGORITHM_CATEGORIES, getAlgorithmsByCategory } from '../data/algorithms/index.js';
import { getStrings } from '../i18n/strings.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function AlgorithmsCatalogPage() {
  const { lang } = usePageContext();
  const t = getStrings(lang).algorithms;

  usePageMeta({
    title: 'Algorithms Academy | Askan Academy',
    description: t.catalogSubtitle,
    path: '/algorithms',
  });

  return (
    <div className="cards-bg">
      <section className="algorithms-hero container">
        <span className="hero__eyebrow">{t.catalogEyebrow}</span>
        <h1 className="algorithms-hero__title">{t.catalogTitle}</h1>
        <p className="algorithms-hero__subtitle">{t.catalogSubtitle}</p>
      </section>
      <section className="academy-tree container" aria-label={t.catalogTitle}>
        {ALGORITHM_CATEGORIES.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            count={getAlgorithmsByCategory(category.slug).length}
            algorithms={getAlgorithmsByCategory(category.slug)}
            lang={lang}
          />
        ))}
      </section>
    </div>
  );
}

import { Navigate, useParams } from 'react-router-dom';
import { usePageContext } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/algorithms/Breadcrumb.jsx';
import { AlgorithmCard } from '../components/algorithms/AlgorithmCard.jsx';
import { getCategory, getAlgorithmsByCategory } from '../data/algorithms/index.js';
import { getStrings } from '../i18n/strings.js';

export default function AlgorithmsCategoryPage() {
  const { category: categorySlug } = useParams();
  const { lang } = usePageContext();
  const t = getStrings(lang).algorithms;
  const category = getCategory(categorySlug);

  if (!category || category.status !== 'live') {
    return <Navigate to="/algorithms" replace />;
  }

  const algorithms = getAlgorithmsByCategory(categorySlug);
  const name = category.name[lang] ?? category.name.ru;
  const tagline = category.tagline[lang] ?? category.tagline.ru;

  return (
    <div className="cards-bg">
      <section className="algorithms-hero container">
        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: '/' },
            { label: t.breadcrumbAlgorithms, to: '/algorithms' },
            { label: name },
          ]}
        />
        <h1 className="algorithms-hero__title">{name}</h1>
        <p className="algorithms-hero__subtitle">{tagline}</p>
      </section>
      <section className="academy-tree container" aria-label={name}>
        {algorithms.map((algorithm) => (
          <AlgorithmCard key={algorithm.slug} algorithm={algorithm} lang={lang} />
        ))}
      </section>
    </div>
  );
}

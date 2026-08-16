import { Navigate, useParams } from 'react-router-dom';
import { usePageContext } from '../hooks/usePageContext.js';
import { Breadcrumb } from '../components/algorithms/Breadcrumb.jsx';
import { AlgorithmCard } from '../components/algorithms/AlgorithmCard.jsx';
import { Accordion } from '../components/ui/Accordion.jsx';
import { getCategory, getAlgorithmsByCategory } from '../data/algorithms/index.js';
import { getStrings } from '../i18n/strings.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function AlgorithmsCategoryPage() {
  const { category: categorySlug } = useParams();
  const { lang } = usePageContext();
  const t = getStrings(lang).algorithms;
  const category = getCategory(categorySlug);

  const name = category ? (category.name[lang] ?? category.name.ru) : '';
  const tagline = category ? (category.tagline[lang] ?? category.tagline.ru) : '';

  usePageMeta({
    title: `${name} — Algorithms Academy | Askan Academy`,
    description: tagline,
    path: `/algorithms/${categorySlug}`,
  });

  if (!category || category.status !== 'live') {
    return <Navigate to="/algorithms" replace />;
  }

  const algorithms = getAlgorithmsByCategory(categorySlug);

  const accordionKey = `${categorySlug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Accordion`;
  const accordionData = t[accordionKey];

  const accordionItems = accordionData
    ? accordionData.map(item => ({
        title: item.title,
        content: item.blocks.map((block, i) =>
          block.type === 'ul'
            ? <ul key={i} className="accordion__list">{block.items.map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>
            : <p key={i} dangerouslySetInnerHTML={{ __html: block.html }} />
        ),
      }))
    : null;

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
      {accordionItems && (
        <div className="category-intro container">
          <Accordion items={accordionItems} />
        </div>
      )}
      <section className="academy-tree container" aria-label={name}>
        {algorithms.map((algorithm, index) => (
          <AlgorithmCard key={algorithm.slug} algorithm={algorithm} lang={lang} index={index} />
        ))}
      </section>
    </div>
  );
}

import { Navigate, useParams } from 'react-router-dom';
import { usePageContext } from '../hooks/usePageContext.js';
import { Breadcrumb } from '../components/ui/Breadcrumb.jsx';
import { ArchitecturePatternCard } from '../components/architecture/ArchitecturePatternCard.jsx';
import { Accordion } from '../components/ui/Accordion.jsx';
import { getArchitectureCategory, getPatternsByCategory } from '../data/architectural-patterns/index.js';
import { getStrings } from '../i18n/strings.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function ArchitecturalPatternsCategoryPage() {
  const { category: categorySlug } = useParams();
  const { lang } = usePageContext();
  const t = getStrings(lang).architecturalPatterns;
  const category = getArchitectureCategory(categorySlug);

  const name = category ? (category.name[lang] ?? category.name.ru) : '';
  const tagline = category ? (category.tagline[lang] ?? category.tagline.ru) : '';

  usePageMeta({
    title: `${name} — Architectural Patterns Academy | Askan Academy`,
    description: tagline,
    path: `/architectural-patterns/${categorySlug}`,
  });

  if (!category || category.status !== 'live') {
    return <Navigate to="/architectural-patterns" replace />;
  }

  const patterns = getPatternsByCategory(categorySlug);

  const accordionKey = `${categorySlug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Accordion`;
  const accordionData = t[accordionKey];

  const accordionItems = accordionData
    ? accordionData.map(item => ({
        title: item.title,
        content: item.blocks.map((block, i) => {
          if (block.type === 'group') {
            return (
              <div key={i} className={`accordion__group is-${block.tier}`}>
                <p className="accordion__group-label">{block.label}</p>
                <ul className="accordion__list">
                  {block.items.map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: li }} />)}
                </ul>
              </div>
            );
          }
          return block.type === 'ul'
            ? <ul key={i} className="accordion__list">{block.items.map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>
            : <p key={i} dangerouslySetInnerHTML={{ __html: block.html }} />;
        }),
      }))
    : null;

  return (
    <div className="cards-bg">
      <section className="algorithms-hero container">
        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: '/' },
            { label: t.breadcrumbArchitecturalPatterns, to: '/architectural-patterns' },
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
        {patterns.map((pattern, index) => (
          <ArchitecturePatternCard key={pattern.slug} pattern={pattern} lang={lang} index={index} />
        ))}
      </section>
    </div>
  );
}

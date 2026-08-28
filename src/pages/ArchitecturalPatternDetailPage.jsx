import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import { usePageContext } from '../hooks/usePageContext.js';
import { ErrorBoundary } from '../components/ErrorBoundary.jsx';
import { Breadcrumb } from '../components/ui/Breadcrumb.jsx';
import { ComplexityPips } from '../components/ui/ComplexityPips.jsx';
import { ArchitecturePatternCard } from '../components/architecture/ArchitecturePatternCard.jsx';
import { ArchitecturePrevNextNav } from '../components/architecture/ArchitecturePrevNextNav.jsx';
import { ArchitectureDiagram } from '../components/architecture/ArchitectureDiagram.jsx';
import { ArchitectureIcon } from '../components/architecture/ArchitectureIcon.jsx';
import { CodeBlock } from '../components/ui/CodeBlock.jsx';
import { WalkthroughBlock } from '../components/ui/WalkthroughBlock.jsx';
import { Tabs } from '../components/ui/Tabs.jsx';
import { Quiz } from '../components/ui/Quiz.jsx';
import { RichText } from '../components/ui/RichText.jsx';
import { getArchitectureCategory, getPattern, getAdjacentPatterns, getPatternsByCategory } from '../data/architectural-patterns/index.js';
import { getStrings } from '../i18n/strings.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function ArchitecturalPatternDetailPage() {
  const { category: categorySlug, slug } = useParams();
  const { lang, theme } = usePageContext();
  const t = getStrings(lang).architecturalPatterns;
  const category = getArchitectureCategory(categorySlug);
  const pattern = getPattern(categorySlug, slug);

  const name = pattern ? (pattern.name[lang] ?? pattern.name.ru) : '';
  const intent = pattern ? (pattern.intent[lang] ?? pattern.intent.ru) : '';
  const categoryNameForMeta = category ? (category.name[lang] ?? category.name.ru) : '';

  usePageMeta({
    title: `${name} — Architectural Patterns Academy | Askan Academy`,
    description: intent.slice(0, 155),
    path: `/architectural-patterns/${categorySlug}/${slug}`,
    jsonLd: pattern
      ? {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name,
          description: intent,
          educationalLevel: 'beginner',
          teaches: categoryNameForMeta,
          url: `https://askanacademy.com/architectural-patterns/${categorySlug}/${slug}`,
          inLanguage: lang,
          isPartOf: {
            '@type': 'Course',
            name: 'Architectural Patterns Academy',
            url: 'https://askanacademy.com/architectural-patterns',
          },
        }
      : undefined,
  });

  if (!category || category.status !== 'live' || !pattern) {
    return <NotFoundPage />;
  }

  const categoryName = category.name[lang] ?? category.name.ru;
  const { prev, next } = getAdjacentPatterns(categorySlug, slug);
  const related = pattern.relatedPatterns
    .map((relSlug) => getPatternsByCategory(categorySlug).find((p) => p.slug === relSlug))
    .filter(Boolean);

  return (
    <ErrorBoundary>
    <div className="cards-bg">
      <section className="algorithms-hero container">
        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: '/' },
            { label: t.breadcrumbArchitecturalPatterns, to: '/architectural-patterns' },
            { label: categoryName, to: `/architectural-patterns/${categorySlug}` },
            { label: name },
          ]}
        />
        <div className="architecture-detail__head">
          <ArchitectureIcon slug={slug} size="lg" />
          <h1 className="algorithms-hero__title">{name}</h1>
          <ComplexityPips popularity={pattern.popularity} />
        </div>
        <p className="algorithms-hero__subtitle">{intent}</p>
      </section>

      <section className="container algorithm-detail__section">
        <Tabs
          label={t.tabsAriaLabel}
          items={[
            {
              key: 'intent',
              label: t.sectionIntent,
              content: (
                <div className="detail-section">
                  <div>
                    <h3 className="detail-section__title">{t.sectionProblem}</h3>
                    <p><RichText text={pattern.problem[lang] ?? pattern.problem.ru} /></p>
                  </div>
                  <div>
                    <h3 className="detail-section__title">{t.sectionSolution}</h3>
                    <p><RichText text={pattern.solution[lang] ?? pattern.solution.ru} /></p>
                  </div>
                  {pattern.details && (
                    <>
                      <div>
                        <h3 className="detail-section__title">{t.sectionDeepDive}</h3>
                        {pattern.details.deepDive.map((para, i) => (
                          <p key={i}><RichText text={para[lang] ?? para.ru} /></p>
                        ))}
                      </div>
                      <div>
                        <h3 className="detail-section__title">{t.sectionDetailsWhenToUse}</h3>
                        {pattern.details.whenToUse.map((para, i) => (
                          <p key={i}><RichText text={para[lang] ?? para.ru} /></p>
                        ))}
                      </div>
                      <div>
                        <h3 className="detail-section__title">{t.sectionRealWorldDetails}</h3>
                        {pattern.details.realWorld.map((para, i) => (
                          <p key={i}><RichText text={para[lang] ?? para.ru} /></p>
                        ))}
                      </div>
                    </>
                  )}
                  <div>
                    <h3 className="detail-section__title">{t.sectionWhenToUse}</h3>
                    <ul className="detail-list">
                      {pattern.whenToUse.map((item, i) => (
                        <li key={i} className="detail-list__item"><RichText text={item[lang] ?? item.ru} /></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="detail-section__title">{t.sectionRealWorld}</h3>
                    <ul className="detail-list">
                      {pattern.realWorldExamples.map((item, i) => (
                        <li key={i} className="detail-list__item"><RichText text={item[lang] ?? item.ru} /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              key: 'diagram',
              label: t.sectionDiagram,
              content: (
                <div className="detail-section">
                  <ArchitectureDiagram diagram={pattern.diagram} lang={lang} />
                  <ul className="architecture-roles">
                    {pattern.diagram.nodes.map((node) => (
                      <li key={node.id} className="architecture-roles__item">
                        <strong>{node.label[lang] ?? node.label.ru}</strong>
                        <span><RichText text={node.role[lang] ?? node.role.ru} /></span>
                      </li>
                    ))}
                  </ul>
                  <ol className="algorithm-steps">
                    {pattern.steps.map((step, i) => (
                      <li key={i} className="algorithm-steps__item">
                        <h3>{step.title[lang] ?? step.title.ru}</h3>
                        <p><RichText text={step.explanation[lang] ?? step.explanation.ru} /></p>
                      </li>
                    ))}
                  </ol>
                </div>
              ),
            },
            {
              key: 'implementation',
              label: t.sectionImplementation,
              content: pattern.walkthrough
                ? <WalkthroughBlock code={pattern.implementation} walkthrough={pattern.walkthrough} lang={lang} theme={theme} t={t} />
                : <CodeBlock code={pattern.implementation} theme={theme} />,
            },
            {
              key: 'prosCons',
              label: t.sectionProsCons,
              content: (
                <div className="pros-cons">
                  <div className="pros-cons__col pros-cons__col--pros">
                    <h3>{t.sectionPros}</h3>
                    <ul>
                      {pattern.pros.map((pro, i) => (
                        <li key={i}><RichText text={pro[lang] ?? pro.ru} /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="pros-cons__col pros-cons__col--cons">
                    <h3>{t.sectionCons}</h3>
                    <ul>
                      {pattern.cons.map((con, i) => (
                        <li key={i}><RichText text={con[lang] ?? con.ru} /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              key: 'quiz',
              label: t.sectionQuiz,
              content: <Quiz quiz={pattern.quiz} lang={lang} t={t} reportUrl="https://github.com/ASKANNN/academy-hub/issues/new" />,
            },
          ]}
        />
      </section>

      {related.length > 0 && (
        <section className="container algorithm-detail__section">
          <h2 className="algorithm-detail__heading">{t.sectionRelated}</h2>
          <div className="academy-tree">
            {related.map((rel, index) => (
              <ArchitecturePatternCard key={rel.slug} pattern={rel} lang={lang} index={index} />
            ))}
          </div>
        </section>
      )}

      <section className="container algorithm-detail__section">
        <ArchitecturePrevNextNav category={categorySlug} prev={prev} next={next} lang={lang} t={t} />
      </section>
    </div>
    </ErrorBoundary>
  );
}

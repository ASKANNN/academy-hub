import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import { usePageContext } from '../hooks/usePageContext.js';
import { ErrorBoundary } from '../components/ErrorBoundary.jsx';
import { Breadcrumb } from '../components/algorithms/Breadcrumb.jsx';
import { PrevNextNav } from '../components/algorithms/PrevNextNav.jsx';
import { AlgorithmCard } from '../components/algorithms/AlgorithmCard.jsx';
import { AlgorithmIcon } from '../components/algorithms/AlgorithmIcon.jsx';
import { ComplexityPips } from '../components/algorithms/ComplexityPips.jsx';
import { AlgorithmIllustration } from '../components/algorithms/AlgorithmIllustration.jsx';
import { AlgorithmVisualizer } from '../components/algorithms/AlgorithmVisualizer.jsx';
import { CodeBlock } from '../components/ui/CodeBlock.jsx';
import { WalkthroughBlock } from '../components/ui/WalkthroughBlock.jsx';
import { Tabs } from '../components/ui/Tabs.jsx';
import { Quiz } from '../components/ui/Quiz.jsx';
import { RichText } from '../components/ui/RichText.jsx';
import { PrerequisiteBadge } from '../components/ui/PrerequisiteBadge.jsx';
import { getCategory, getAlgorithm, getAdjacentAlgorithms, getAlgorithmsByCategory } from '../data/algorithms/index.js';
import { getStrings } from '../i18n/strings.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function AlgorithmDetailPage() {
  const { category: categorySlug, slug } = useParams();
  const { lang, theme } = usePageContext();
  const t = getStrings(lang).algorithms;
  const category = getCategory(categorySlug);
  const algorithm = getAlgorithm(categorySlug, slug);

  const name = algorithm ? (algorithm.name[lang] ?? algorithm.name.ru) : '';
  const intent = algorithm ? (algorithm.intent[lang] ?? algorithm.intent.ru) : '';
  const categoryNameForMeta = category ? (category.name[lang] ?? category.name.ru) : '';

  usePageMeta({
    title: `${name} — Algorithms Academy | Askan Academy`,
    description: intent.slice(0, 155),
    path: `/algorithms/${categorySlug}/${slug}`,
    jsonLd: algorithm
      ? {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name,
          description: intent,
          educationalLevel: 'beginner',
          teaches: categoryNameForMeta,
          url: `https://askanacademy.com/algorithms/${categorySlug}/${slug}`,
          inLanguage: lang,
          isPartOf: {
            '@type': 'Course',
            name: 'Algorithms Academy',
            url: 'https://askanacademy.com/algorithms',
          },
        }
      : undefined,
  });

  if (!category || category.status !== 'live' || !algorithm) {
    return <NotFoundPage />;
  }

  const categoryName = category.name[lang] ?? category.name.ru;
  const { prev, next } = getAdjacentAlgorithms(categorySlug, slug);
  const related = algorithm.relatedAlgorithms
    .map((relSlug) => getAlgorithmsByCategory(categorySlug).find((a) => a.slug === relSlug))
    .filter(Boolean);

  return (
    <ErrorBoundary>
    <div className="cards-bg">
      <section className="algorithms-hero container">
        <Breadcrumb
          items={[
            { label: t.breadcrumbHome, to: '/' },
            { label: t.breadcrumbAlgorithms, to: '/algorithms' },
            { label: categoryName, to: `/algorithms/${categorySlug}` },
            { label: name },
          ]}
        />
        <div className="algorithm-detail__head">
          <AlgorithmIcon slug={slug} size="lg" />
          <h1 className="algorithms-hero__title">{name}</h1>
          <ComplexityPips popularity={algorithm.popularity} />
        </div>
        <p className="algorithms-hero__subtitle">{algorithm.intent[lang] ?? algorithm.intent.ru}</p>
        <PrerequisiteBadge t={t} />
        <div className="algorithm-detail__complexity">
          <span className="algorithm-card__complexity-badge">{t.best}: {algorithm.complexity.time.best}</span>
          <span className="algorithm-card__complexity-badge">{t.average}: {algorithm.complexity.time.average}</span>
          <span className="algorithm-card__complexity-badge">{t.worst}: {algorithm.complexity.time.worst}</span>
          <span className="algorithm-card__complexity-badge">{t.space}: {algorithm.complexity.space}</span>
        </div>
        <AlgorithmIllustration slug={algorithm.slug} alt={name} t={t} />
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
                    <p><RichText text={algorithm.problem[lang] ?? algorithm.problem.ru} /></p>
                  </div>
                  <div>
                    <h3 className="detail-section__title">{t.sectionSolution}</h3>
                    <p><RichText text={algorithm.solution[lang] ?? algorithm.solution.ru} /></p>
                  </div>
                  {algorithm.details && (
                    <>
                      <div>
                        <h3 className="detail-section__title">{t.sectionDeepDive}</h3>
                        {Array.isArray(algorithm.details.deepDive)
                          ? algorithm.details.deepDive.map((para, i) => <p key={i}><RichText text={para[lang] ?? para.ru} /></p>)
                          : <p><RichText text={algorithm.details.deepDive[lang] ?? algorithm.details.deepDive.ru} /></p>}
                      </div>
                      <div>
                        <h3 className="detail-section__title">{t.sectionDetailsWhenToUse}</h3>
                        {Array.isArray(algorithm.details.whenToUse)
                          ? algorithm.details.whenToUse.map((para, i) => <p key={i}><RichText text={para[lang] ?? para.ru} /></p>)
                          : <p><RichText text={algorithm.details.whenToUse[lang] ?? algorithm.details.whenToUse.ru} /></p>}
                      </div>
                      <div>
                        <h3 className="detail-section__title">{t.sectionRealWorldDetails}</h3>
                        {Array.isArray(algorithm.details.realWorld)
                          ? algorithm.details.realWorld.map((para, i) => <p key={i}><RichText text={para[lang] ?? para.ru} /></p>)
                          : <p><RichText text={algorithm.details.realWorld[lang] ?? algorithm.details.realWorld.ru} /></p>}
                      </div>
                    </>
                  )}
                  <div>
                    <h3 className="detail-section__title">{t.sectionWhenToUse}</h3>
                    <ul className="detail-list">
                      {algorithm.whenToUse.map((item, i) => (
                        <li key={i} className="detail-list__item"><RichText text={item[lang] ?? item.ru} /></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="detail-section__title">{t.sectionRealWorld}</h3>
                    <ul className="detail-list">
                      {algorithm.realWorldExamples.map((item, i) => (
                        <li key={i} className="detail-list__item"><RichText text={item[lang] ?? item.ru} /></li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              key: 'visualization',
              label: t.sectionVisualization,
              content: (
                <div className="detail-section">
                  <AlgorithmVisualizer slug={algorithm.slug} t={t} steps={algorithm.steps} lang={lang} stepBreakpoints={algorithm.stepBreakpoints} />
                  <ol className="algorithm-steps">
                    {algorithm.steps.map((step, i) => (
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
              content: algorithm.walkthrough
                ? <WalkthroughBlock code={algorithm.implementation} walkthrough={algorithm.walkthrough} lang={lang} theme={theme} t={t} />
                : <CodeBlock code={algorithm.implementation} theme={theme} />,
            },
            {
              key: 'prosCons',
              label: t.sectionProsCons,
              content: (
                <div className="pros-cons">
                  <div className="pros-cons__col pros-cons__col--pros">
                    <h3>{t.sectionPros}</h3>
                    <ul>
                      {algorithm.pros.map((pro, i) => (
                        <li key={i}><RichText text={pro[lang] ?? pro.ru} /></li>
                      ))}
                    </ul>
                  </div>
                  <div className="pros-cons__col pros-cons__col--cons">
                    <h3>{t.sectionCons}</h3>
                    <ul>
                      {algorithm.cons.map((con, i) => (
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
              content: <Quiz quiz={algorithm.quiz} lang={lang} t={t} reportUrl="https://github.com/ASKANNN/academy-hub/issues/new" />,
            },
          ]}
        />
      </section>

      {related.length > 0 && (
        <section className="container algorithm-detail__section">
          <h2 className="algorithm-detail__heading">{t.sectionRelated}</h2>
          <div className="academy-tree">
            {related.map((rel, index) => (
              <AlgorithmCard key={rel.slug} algorithm={rel} lang={lang} index={index} />
            ))}
          </div>
        </section>
      )}

      <section className="container algorithm-detail__section">
        <PrevNextNav category={categorySlug} prev={prev} next={next} lang={lang} t={t} />
      </section>
    </div>
    </ErrorBoundary>
  );
}

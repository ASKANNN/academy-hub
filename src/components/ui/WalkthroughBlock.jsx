import { useState } from 'react';
import { CodeBlock } from './CodeBlock.jsx';
import { RichText } from './RichText.jsx';

const RESTART_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.4 9.4 0 0 0-4.5 1.15"/>
    <polyline points="3 3 3 8 8 8"/>
  </svg>
);

export function WalkthroughBlock({ code, walkthrough, lang, theme, t }) {
  const languages = Object.keys(code);
  const [activeLang, setActiveLang] = useState(languages[0]);
  const [step, setStep] = useState(0);

  const steps = walkthrough?.[activeLang] ?? [];
  const current = steps[step];
  const activeLines = current?.lines;
  const total = steps.length;
  const isLast = step === total - 1;

  function handleLangChange(newLang) {
    setActiveLang(newLang);
    setStep(0);
  }

  function handlePrev() { setStep(s => Math.max(0, s - 1)); }
  function handleNext() { setStep(s => (isLast ? 0 : s + 1)); }

  return (
    <div className="walkthrough-wrap">
      <CodeBlock
        code={code}
        activeLanguage={activeLang}
        onLanguageChange={handleLangChange}
        activeLines={activeLines}
        theme={theme}
      />
      {steps.length > 0 && current && (
        <div className="walkthrough">
          <div className="walkthrough__steps">
            <div className="walkthrough__step">
              <p className="walkthrough__progress">{t.walkthroughStep(step + 1, total)}</p>
              <h4 className="walkthrough__title"><RichText text={current.title[lang] ?? current.title.ru} /></h4>
              <p className="walkthrough__explanation">
                <RichText text={current.explanation[lang] ?? current.explanation.ru} />
              </p>
            </div>
          </div>
          <div className="walkthrough__nav">
            <button
              type="button"
              className="btn btn--secondary btn--sm walkthrough__prev"
              disabled={step === 0}
              onClick={handlePrev}
            >
              {t.walkthroughPrev}
            </button>
            <span className="walkthrough__dots" aria-hidden="true">
              {steps.map((_, i) => (
                <span key={i} className={`walkthrough__dot${i === step ? ' is-active' : ''}`} />
              ))}
            </span>
            <button
              type="button"
              className={`btn btn--primary btn--sm walkthrough__next${isLast ? ' walkthrough__next--restart' : ''}`}
              onClick={handleNext}
            >
              {isLast ? <>{RESTART_ICON}{t.walkthroughRestart}</> : t.walkthroughNext}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

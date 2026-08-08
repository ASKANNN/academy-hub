import { useEffect, useMemo, useRef, useState } from 'react';
import { playErrorTone, playSuccessChime } from '../../utils/sound.js';

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleQuestion(question) {
  const indexed = question.options.map((opt, i) => ({ opt, i }));
  const shuffled = shuffle(indexed);
  return {
    ...question,
    options: shuffled.map((o) => o.opt),
    correct: shuffled.findIndex((o) => o.i === question.correct),
  };
}

function IconHint() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" /><path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="quiz__feedback-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="2 8 6 12 14 4" />
    </svg>
  );
}

function IconX() {
  return (
    <svg className="quiz__feedback-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  );
}

function IconPass() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" /><circle cx="12" cy="8" r="7" />
    </svg>
  );
}

function IconWarn() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}

function IconFail() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 9v4" /><path d="M12 17h.01" /><circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function IconReport() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}

const TIER_ICON = { pass: <IconPass />, warn: <IconWarn />, fail: <IconFail /> };

function getTier(score, total) {
  const ratio = score / total;
  return ratio >= 0.7 ? 'pass' : ratio >= 0.4 ? 'warn' : 'fail';
}

function cap(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export function Quiz({ quiz, lang, t, reportUrl = '' }) {
  const questions = useMemo(() => shuffle(quiz).map(shuffleQuestion), [quiz]);
  const total = questions.length;

  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const nextBtnRef = useRef(null);
  const quizRef = useRef(null);

  const isIntro = step === -1;
  const isResult = step >= total;

  useEffect(() => {
    if (!isResult) return;
    getTier(score, total) === 'pass' ? playSuccessChime() : playErrorTone();
  }, [isResult]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selected !== null) nextBtnRef.current?.focus({ preventScroll: true });
  }, [selected]);

  useEffect(() => {
    if (step < 0) return;
    quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  function reset() {
    setStep(-1);
    setSelected(null);
    setScore(0);
    setHintOpen(false);
  }

  function handleSelect(index) {
    if (selected !== null) return;
    const correct = index === questions[step].correct;
    setSelected(index);
    if (correct) {
      setScore((s) => s + 1);
      playSuccessChime();
    } else {
      playErrorTone();
    }
  }

  function handleNext() {
    setSelected(null);
    setHintOpen(false);
    setStep((s) => s + 1);
  }

  const reportLink = reportUrl ? (
    <a className="quiz__report" href={reportUrl} target="_blank" rel="noopener noreferrer">
      <IconReport />
      {t.quizReportIssue}
    </a>
  ) : null;

  if (isIntro) {
    return (
      <div ref={quizRef} className="quiz quiz--intro">
        <button type="button" className="btn btn--primary" onClick={() => setStep(0)}>
          {t.quizStart}
        </button>
        {reportLink}
      </div>
    );
  }

  if (isResult) {
    const tier = getTier(score, total);
    return (
      <div ref={quizRef} className="quiz">
        <div className={`quiz__results is-${tier}`}>
          <div className="quiz__result-icon" aria-hidden="true">
            {TIER_ICON[tier]}
          </div>
          <p className="quiz__result-title">{t[`quiz${cap(tier)}Title`]}</p>
          <p className="quiz__score">{t.quizScore(score, total)}</p>
          <p className="quiz__result-message">{t[`quiz${cap(tier)}`]}</p>
          <button type="button" className="btn btn--secondary btn--md" onClick={reset}>
            {t.quizRetry}
          </button>
        </div>
        {reportLink}
      </div>
    );
  }

  const question = questions[step];
  const isLast = step === total - 1;
  const answered = selected !== null;
  const isCorrect = selected === question.correct;

  return (
    <div ref={quizRef} className="quiz">
      <p className="quiz__progress">{step + 1} / {total}</p>
      <div className="quiz__prompt-row">
        <p className="quiz__question">{question.question[lang] ?? question.question.ru}</p>
        {question.hint && (
          <button
            type="button"
            className="quiz__hint-btn"
            onClick={() => setHintOpen((o) => !o)}
            aria-expanded={hintOpen}
            aria-label={hintOpen ? t.quizHintHide : t.quizHintShow}
            title={hintOpen ? t.quizHintHide : t.quizHintShow}
          >
            <IconHint />
          </button>
        )}
      </div>
      {question.hint && (
        <div className={`quiz__hint-wrap${hintOpen ? ' is-open' : ''}`}>
          <p className="quiz__hint">{question.hint[lang] ?? question.hint.ru}</p>
        </div>
      )}
      <ul className="quiz__options" role="radiogroup" aria-label={question.question[lang] ?? question.question.ru}>
        {question.options.map((opt, i) => {
          const isCor = i === question.correct;
          const isSel = i === selected;
          const stateClass = !answered ? '' : isCor ? ' is-correct' : isSel ? ' is-incorrect' : '';
          return (
            <li key={i}>
              <button
                type="button"
                className={`quiz__option${stateClass}`}
                onClick={() => handleSelect(i)}
                disabled={answered}
              >
                <span className="quiz__option-marker" aria-hidden="true" />
                <span className="quiz__option-text">{opt[lang] ?? opt.ru}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div className="quiz__feedback" aria-live="polite">
          <p className={`quiz__feedback-text quiz__feedback-text--${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? <IconCheck /> : <IconX />}
            <span>
              <strong className="quiz__feedback-label">
                {isCorrect ? t.quizCorrect : t.quizIncorrect}
              </strong>{' '}
              {question.explanation[lang] ?? question.explanation.ru}
            </span>
          </p>
          <button ref={nextBtnRef} type="button" className="btn btn--primary btn--md" onClick={handleNext}>
            {isLast ? t.quizFinish : t.quizNext}
          </button>
        </div>
      )}
      {reportLink}
    </div>
  );
}

import { useMemo, useState } from 'react';

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleQuestion(question) {
  const options = question.options.map((opt, index) => ({ opt, index }));
  const shuffled = shuffle(options);
  return {
    ...question,
    options: shuffled.map((o) => o.opt),
    correct: shuffled.findIndex((o) => o.index === question.correct),
  };
}

function HintIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  );
}

export function Quiz({ quiz, lang, t }) {
  const questions = useMemo(() => shuffle(quiz).map(shuffleQuestion), [quiz]);
  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);

  if (step === -1) {
    return (
      <div className="quiz quiz--intro">
        <button type="button" className="btn btn--primary" onClick={() => setStep(0)}>
          {t.quizStart}
        </button>
      </div>
    );
  }

  if (step >= questions.length) {
    const ratio = score / questions.length;
    const tier = ratio >= 0.7 ? 'pass' : ratio >= 0.4 ? 'warn' : 'fail';
    return (
      <div className={`quiz quiz--result quiz--result-${tier}`}>
        <p className="quiz__score">{t.quizScore(score, questions.length)}</p>
        <p className="quiz__verdict">{t[`quiz${tier[0].toUpperCase()}${tier.slice(1)}`]}</p>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => {
            setStep(-1);
            setSelected(null);
            setScore(0);
          }}
        >
          {t.quizRetry}
        </button>
      </div>
    );
  }

  const question = questions[step];
  const isLast = step === questions.length - 1;

  function handleSelect(index) {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    setSelected(null);
    setHintOpen(false);
    setStep((s) => s + 1);
  }

  return (
    <div className="quiz">
      <p className="quiz__progress">{step + 1} / {questions.length}</p>
      <div className="quiz__prompt-row">
        <p className="quiz__question">{question.question[lang] ?? question.question.ru}</p>
        {question.hint && (
          <button
            type="button"
            className="quiz__hint-btn"
            onClick={() => setHintOpen((open) => !open)}
            aria-expanded={hintOpen}
            aria-label={hintOpen ? t.quizHintHide : t.quizHintShow}
            title={hintOpen ? t.quizHintHide : t.quizHintShow}
          >
            <HintIcon />
          </button>
        )}
      </div>
      {question.hint && (
        <div className={`quiz__hint-wrap ${hintOpen ? 'is-open' : ''}`}>
          <p className="quiz__hint">{question.hint[lang] ?? question.hint.ru}</p>
        </div>
      )}
      <ul className="quiz__options">
        {question.options.map((opt, index) => {
          const isCorrect = index === question.correct;
          const isSelected = index === selected;
          const state =
            selected === null ? '' : isCorrect ? 'is-correct' : isSelected ? 'is-wrong' : '';
          return (
            <li key={index}>
              <button
                type="button"
                className={`quiz__option ${state}`}
                onClick={() => handleSelect(index)}
                disabled={selected !== null}
              >
                {opt[lang] ?? opt.ru}
              </button>
            </li>
          );
        })}
      </ul>
      {selected !== null && (() => {
        const isCorrect = selected === question.correct;
        return (
          <div className="quiz__feedback">
            <p className={`quiz__feedback-text quiz__feedback-text--${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <svg className="quiz__feedback-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="2 8 6 12 14 4" /></svg>
              ) : (
                <svg className="quiz__feedback-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" /></svg>
              )}
              <span>
                <strong className="quiz__feedback-label">{isCorrect ? t.quizCorrect : t.quizIncorrect}</strong>
                {' '}
                {question.explanation[lang] ?? question.explanation.ru}
              </span>
            </p>
            <button type="button" className="btn btn--primary" onClick={handleNext}>
              {isLast ? t.quizFinish : t.quizNext}
            </button>
          </div>
        );
      })()}
    </div>
  );
}

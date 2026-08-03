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

export function Quiz({ quiz, lang, t }) {
  const questions = useMemo(() => shuffle(quiz).map(shuffleQuestion), [quiz]);
  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

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
    setStep((s) => s + 1);
  }

  return (
    <div className="quiz">
      <p className="quiz__progress">{step + 1} / {questions.length}</p>
      <p className="quiz__question">{question.question[lang] ?? question.question.ru}</p>
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
      {selected !== null && (
        <div className="quiz__feedback">
          <p>{question.explanation[lang] ?? question.explanation.ru}</p>
          <button type="button" className="btn btn--primary" onClick={handleNext}>
            {isLast ? t.quizFinish : t.quizNext}
          </button>
        </div>
      )}
    </div>
  );
}

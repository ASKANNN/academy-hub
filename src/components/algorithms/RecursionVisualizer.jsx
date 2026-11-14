import { useEffect, useMemo, useState } from 'react';
import { generateRecursionSteps, RECURSION_SAMPLES } from '../../utils/recursionSteps.js';

const PLAY_INTERVAL = 750;

function randomOption(options, current) {
  const rest = options.filter((v) => v !== current);
  return rest[Math.floor(Math.random() * rest.length)];
}

export function RecursionVisualizer({ slug, t, steps, lang }) {
  const sample = RECURSION_SAMPLES[slug];
  const [n, setN] = useState(sample.n);
  const frames = useMemo(() => generateRecursionSteps(slug, n), [slug, n]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shownFrames, setShownFrames] = useState(frames);

  useEffect(() => {
    setN(RECURSION_SAMPLES[slug].n);
  }, [slug]);

  // Same render-time reset as AlgorithmVisualizer: an effect would draw the
  // new run once with the old step number.
  if (frames !== shownFrames) {
    setShownFrames(frames);
    setStep(0);
    setPlaying(false);
  }

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => {
      setStep((s) => {
        if (s >= frames.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [playing, frames.length]);

  const shown = Math.min(step, frames.length - 1);
  const current = frames[shown];
  const isLast = shown === frames.length - 1;
  const top = current.stack[current.stack.length - 1];
  // Every run reserves rows for the largest n on offer, so switching n does
  // not resize the panels either.
  const rows = Math.max(...sample.options);
  const conceptStep = current.phase;

  return (
    <div className="visualizer recursion-visualizer">
      <div className="visualizer__topbar">
        <span className="visualizer__target">
          {t.recursionTarget(`${sample.fn}(${n})`)}
          {isLast && ` = ${current.nodes[0].value}`}
        </span>
        <span className="visualizer__step-count">
          {t.visualizerStep} {shown + 1} / {frames.length}
        </span>
      </div>

      <div className="recursion-visualizer__panels" style={{ '--rows': rows }}>
        <section className="recursion-panel" aria-label={t.recursionTree}>
          <header className="recursion-panel__head">
            <span>{t.recursionTree}</span>
            <span className="recursion-panel__count">{t.recursionCalls(current.calls)}</span>
          </header>
          <ol className="recursion-tree">
            {current.nodes.map((node) => (
              <li key={node.id} className={`recursion-tree__node is-${node.status}`}>
                <span className="recursion-tree__dot">{node.n}</span>
                <span className="recursion-tree__text">{node.status === 'idle' ? '' : node.text}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="recursion-panel" aria-label={t.recursionStack}>
          <header className="recursion-panel__head">
            <span>{t.recursionStack}</span>
            <span className="recursion-panel__count">{t.recursionDepth(current.stack.length)}</span>
          </header>
          <ol className="recursion-stack">
            {current.stack.map((id) => (
              <li key={id} className={`recursion-stack__frame${id === top ? ' is-top' : ''}`}>
                n = {current.nodes[id].n}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="visualizer__caption">
        {t.recursionCaptions[current.caption[0]](...current.caption.slice(1))}
      </p>
      {steps?.length > 0 && (
        <p key={conceptStep} className="visualizer__step-label">
          <strong>{conceptStep + 1}. {steps[conceptStep].title[lang] ?? steps[conceptStep].title.ru}</strong>
        </p>
      )}
      <div className="visualizer__controls">
        <button type="button" className="btn btn--secondary" onClick={() => setN(randomOption(sample.options, n))}>
          {t.recursionNewN}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          aria-label={t.visualizerPrevStep}
        >
          ←
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            if (step >= frames.length - 1) setStep(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? t.visualizerPause : t.visualizerPlay}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setStep((s) => Math.min(frames.length - 1, s + 1))}
          disabled={step >= frames.length - 1}
          aria-label={t.visualizerNextStep}
        >
          →
        </button>
      </div>
    </div>
  );
}

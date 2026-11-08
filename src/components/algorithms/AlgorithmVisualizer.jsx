import { useEffect, useMemo, useRef, useState } from 'react';
import { generateSteps, SEARCH_SAMPLES } from '../../utils/algorithmSteps.js';

const SAMPLE_ARRAY = [8, 3, 9, 1, 6, 4, 7, 2, 5];
const SMALL_SAMPLE_ARRAY = [4, 2, 5, 1, 3];
const SMALL_SAMPLE_SLUGS = new Set(['bogosort']);
const PLAY_INTERVAL = 750;

function sampleFor(slug) {
  if (SEARCH_SAMPLES[slug]) return SEARCH_SAMPLES[slug].array;
  return SMALL_SAMPLE_SLUGS.has(slug) ? SMALL_SAMPLE_ARRAY : SAMPLE_ARRAY;
}

// A new target for a search demo: any value in the array, or - with the
// same chance as each of them - one that is missing, to show the miss.
function randomTarget(array, current) {
  const options = [...array, Math.max(...array) + 1].filter((v) => v !== current);
  return options[Math.floor(Math.random() * options.length)];
}

function shuffleArray(base) {
  const arr = [...base];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function AlgorithmVisualizer({ slug, t, steps, lang, stepBreakpoints }) {
  const search = SEARCH_SAMPLES[slug];
  const [array, setArray] = useState(() => sampleFor(slug));
  const [target, setTarget] = useState(search?.target);
  const frames = useMemo(() => generateSteps(slug, array, target), [slug, array, target]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setArray(sampleFor(slug));
    setTarget(SEARCH_SAMPLES[slug]?.target);
  }, [slug]);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [frames]);

  useEffect(() => {
    if (!playing) return undefined;
    intervalRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= frames.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, PLAY_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [playing, frames.length]);

  // New frames (a shuffle, another target) arrive one render before the
  // effect above resets `step`; if the new run is shorter, `frames[step]`
  // would be undefined and the whole visualizer would crash.
  const shown = Math.min(step, frames.length - 1);
  const current = frames[shown];
  const max = Math.max(...current.array);

  const isLast = shown === frames.length - 1;
  const conceptStep = steps?.length
    ? (current.phase !== undefined
      ? current.phase
      : stepBreakpoints?.length
        ? stepBreakpoints.filter((b) => shown >= b).length
        : Math.min(Math.floor((shown * steps.length) / frames.length), steps.length - 1))
    : 0;

  return (
    <div className="visualizer">
      <div className="visualizer__topbar">
        {search && (
          <span className="visualizer__target">
            {t.visualizerTarget(target)}
            {isLast && ` · ${current.sorted.length ? t.visualizerFound(current.sorted[0]) : t.visualizerNotFound}`}
          </span>
        )}
        <span className="visualizer__step-count">
          {t.visualizerStep} {shown + 1} / {frames.length}
        </span>
      </div>
      <div className="visualizer__bars">
        {current.array.map((value, index) => {
          const isActive = current.active.includes(index);
          const isSorted = current.sorted.includes(index);
          const isOut = current.range && (index < current.range[0] || index > current.range[1]);
          return (
            <div
              key={index}
              className={`visualizer__bar ${isActive ? 'is-active' : ''} ${isSorted ? 'is-sorted' : ''} ${isOut ? 'is-out' : ''}`}
              style={{ height: `${(value / max) * 100}%` }}
            >
              <span>{value}</span>
            </div>
          );
        })}
      </div>
      {steps?.length > 0 && (
        <p key={conceptStep} className="visualizer__step-label">
          <strong>{conceptStep + 1}. {steps[conceptStep].title[lang] ?? steps[conceptStep].title.ru}</strong>
        </p>
      )}
      <div className="visualizer__controls">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => (search ? setTarget(randomTarget(array, target)) : setArray(shuffleArray(sampleFor(slug))))}
        >
          {search ? t.visualizerNewTarget : t.visualizerShuffle}
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

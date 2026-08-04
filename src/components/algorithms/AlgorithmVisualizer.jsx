import { useEffect, useMemo, useRef, useState } from 'react';
import { generateSteps } from '../../utils/algorithmSteps.js';

const SAMPLE_ARRAY = [8, 3, 9, 1, 6, 4, 7, 2, 5];
const SMALL_SAMPLE_ARRAY = [4, 2, 5, 1, 3];
const SMALL_SAMPLE_SLUGS = new Set(['bogosort']);
const PLAY_INTERVAL = 500;

function sampleFor(slug) {
  return SMALL_SAMPLE_SLUGS.has(slug) ? SMALL_SAMPLE_ARRAY : SAMPLE_ARRAY;
}

function shuffleArray(base) {
  const arr = [...base];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function AlgorithmVisualizer({ slug, t }) {
  const [array, setArray] = useState(() => sampleFor(slug));
  const frames = useMemo(() => generateSteps(slug, array), [slug, array]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setArray(sampleFor(slug));
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

  const current = frames[step];
  const max = Math.max(...current.array);

  return (
    <div className="visualizer">
      <div className="visualizer__bars">
        {current.array.map((value, index) => {
          const isActive = current.active.includes(index);
          const isSorted = current.sorted.includes(index);
          return (
            <div
              key={index}
              className={`visualizer__bar ${isActive ? 'is-active' : ''} ${isSorted ? 'is-sorted' : ''}`}
              style={{ height: `${(value / max) * 100}%` }}
            >
              <span>{value}</span>
            </div>
          );
        })}
      </div>
      <div className="visualizer__controls">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setArray(shuffleArray(sampleFor(slug)))}
        >
          {t.visualizerShuffle}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
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
        >
          →
        </button>
        <span className="visualizer__step-count">
          {t.visualizerStep} {step + 1} / {frames.length}
        </span>
      </div>
    </div>
  );
}

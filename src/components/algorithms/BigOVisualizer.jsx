import { useEffect, useRef, useState } from 'react';

const N_MIN = 1;
const N_MAX = 10;
const N_STEPS = N_MAX - N_MIN + 1;
const Y_CAP = 100;
const PLAY_INTERVAL = 750;

const VIEW_W = 640;
const VIEW_H = 300;
const PAD_LEFT = 40;
const PAD_RIGHT = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 34;
const PLOT_W = VIEW_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = VIEW_H - PAD_TOP - PAD_BOTTOM;

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

const CURVE_ORDER = ['o-1', 'o-log-n', 'o-n', 'o-n-log-n', 'o-n-2', 'o-n-3', 'o-2-n', 'o-n-factorial'];

const CURVES = {
  'o-1': () => 1,
  'o-log-n': (n) => Math.log2(n),
  'o-n': (n) => n,
  'o-n-log-n': (n) => n * Math.log2(n),
  'o-n-2': (n) => n * n,
  'o-n-3': (n) => n * n * n,
  'o-2-n': (n) => 2 ** n,
  'o-n-factorial': (n) => factorial(n),
};

const NOTATION = {
  'o-1': 'O(1)',
  'o-log-n': 'O(log n)',
  'o-n': 'O(n)',
  'o-n-log-n': 'O(n log n)',
  'o-n-2': 'O(n²)',
  'o-n-3': 'O(n³)',
  'o-2-n': 'O(2ⁿ)',
  'o-n-factorial': 'O(n!)',
};

const CASE_MODE_SLUG = 'best-average-worst-case';
const CASE_CURVES = [
  { key: 'best', fn: () => 1, color: 'var(--color-success)' },
  { key: 'average', fn: (n) => n / 2, color: 'var(--color-warning)' },
  { key: 'worst', fn: (n) => n, color: 'var(--color-error)' },
];

function xScale(n) {
  return PAD_LEFT + ((n - N_MIN) / (N_MAX - N_MIN)) * PLOT_W;
}

function yScale(value) {
  return PAD_TOP + (1 - value / Y_CAP) * PLOT_H;
}

function curvePoints(fn) {
  const pts = [];
  for (let n = N_MIN; n <= N_MAX; n++) pts.push(`${xScale(n)},${yScale(fn(n))}`);
  return pts.join(' ');
}

function formatOps(value, t) {
  const n = Math.round(value);
  if (n < 1000) return { text: String(n), opsWord: t.bigOOpsWord(n) };
  const tier = n < 1_000_000
    ? { div: 1_000, suffix: t.bigOSuffixThousand }
    : { div: 1_000_000, suffix: t.bigOSuffixMillion };
  const scaled = Math.round((n / tier.div) * 10) / 10;
  return { text: `${scaled} ${tier.suffix}`, opsWord: t.bigOOpsWord(0) };
}

const GRID_Y = [0, 25, 50, 75, 100];

export function BigOVisualizer({ slug, t, steps, lang, stepBreakpoints }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [slug]);

  useEffect(() => {
    if (!playing) return undefined;
    intervalRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= N_STEPS - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, PLAY_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const n = N_MIN + step;
  const isCaseMode = slug === CASE_MODE_SLUG;

  const conceptStep = steps?.length
    ? (stepBreakpoints?.length
        ? stepBreakpoints.filter((b) => step >= b).length
        : Math.min(Math.floor((step * steps.length) / N_STEPS), steps.length - 1))
    : 0;

  const plotBottom = PAD_TOP + PLOT_H;
  const plotRight = PAD_LEFT + PLOT_W;

  return (
    <div className="visualizer">
      <div className="visualizer__topbar">
        <span className="visualizer__step-count">
          {t.visualizerStep} {step + 1} / {N_STEPS}
        </span>
      </div>

      <p className="bigo-chart__caption">
        {isCaseMode ? t.bigOChartCaptionCases : t.bigOChartCaption}
      </p>

      <div className="bigo-chart">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-hidden="true">
          <clipPath id="bigo-plot-clip">
            <rect x={PAD_LEFT} y={PAD_TOP} width={PLOT_W} height={PLOT_H} />
          </clipPath>

          <text
            className="bigo-chart__axis-label"
            x={PAD_LEFT}
            y={12}
            textAnchor="start"
          >
            {t.bigOAxisOps}
          </text>
          <text
            className="bigo-chart__axis-label"
            x={PAD_LEFT + PLOT_W}
            y={VIEW_H - 4}
            textAnchor="end"
          >
            {t.bigOAxisN}
          </text>

          {GRID_Y.map((v) => (
            <g key={v}>
              <line
                className="bigo-chart__gridline"
                x1={PAD_LEFT}
                y1={yScale(v)}
                x2={plotRight}
                y2={yScale(v)}
              />
              <text className="bigo-chart__tick" x={PAD_LEFT - 8} y={yScale(v)} textAnchor="end" dominantBaseline="middle">
                {v}
              </text>
            </g>
          ))}

          {Array.from({ length: N_MAX - N_MIN + 1 }, (_, i) => N_MIN + i).map((tickN) => (
            <text
              key={tickN}
              className="bigo-chart__tick"
              x={xScale(tickN)}
              y={plotBottom + 18}
              textAnchor="middle"
            >
              {tickN}
            </text>
          ))}

          <line className="bigo-chart__axis" x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={plotBottom} />
          <line className="bigo-chart__axis" x1={PAD_LEFT} y1={plotBottom} x2={plotRight} y2={plotBottom} />

          <g clipPath="url(#bigo-plot-clip)">
            {!isCaseMode && CURVE_ORDER.filter((key) => key !== slug).map((key) => (
              <polyline key={key} className="bigo-chart__curve" points={curvePoints(CURVES[key])} />
            ))}
            {!isCaseMode && (
              <>
                <polyline
                  className="bigo-chart__curve bigo-chart__curve--active"
                  points={curvePoints(CURVES[slug])}
                />
                <circle
                  className="bigo-chart__marker"
                  cx={xScale(n)}
                  cy={yScale(CURVES[slug](n))}
                  r="5"
                />
              </>
            )}
            {isCaseMode && CASE_CURVES.map(({ key, fn, color }) => (
              <g key={key}>
                <polyline className="bigo-chart__curve bigo-chart__curve--active" points={curvePoints(fn)} style={{ stroke: color }} />
                <circle className="bigo-chart__marker" cx={xScale(n)} cy={yScale(fn(n))} r="5" style={{ fill: color }} />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <p className="bigo-chart__readout">
        {(() => {
          const { text, opsWord } = formatOps(isCaseMode ? n : CURVES[slug](n), t);
          return t.bigOReadout(n, text, opsWord);
        })()}
        {!isCaseMode && CURVES[slug](n) > Y_CAP ? t.bigOOffChart : ''}
      </p>

      <div className="bigo-legend">
        {!isCaseMode && CURVE_ORDER.map((key) => (
          <span key={key} className={`bigo-legend__item ${key === slug ? 'is-active' : ''}`}>
            <span className="bigo-legend__dot" style={key === slug ? { backgroundColor: 'var(--color-accent)' } : undefined} />
            {NOTATION[key]}
          </span>
        ))}
        {isCaseMode && CASE_CURVES.map(({ key, color }) => (
          <span key={key} className="bigo-legend__item is-active">
            <span className="bigo-legend__dot" style={{ backgroundColor: color }} />
            {t[key]}
          </span>
        ))}
      </div>

      {steps?.length > 0 && (
        <p key={conceptStep} className="visualizer__step-label">
          <strong>{conceptStep + 1}. {steps[conceptStep].title[lang] ?? steps[conceptStep].title.ru}</strong>
        </p>
      )}

      <div className="bigo-visualizer__controls">
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
            if (step >= N_STEPS - 1) setStep(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? t.visualizerPause : t.visualizerPlay}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setStep((s) => Math.min(N_STEPS - 1, s + 1))}
          disabled={step >= N_STEPS - 1}
          aria-label={t.visualizerNextStep}
        >
          →
        </button>
      </div>
    </div>
  );
}

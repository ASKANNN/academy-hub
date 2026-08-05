let _ctx = null;

function getCtx() {
  if (_ctx) return _ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  _ctx = new AudioCtx();
  return _ctx;
}

function _withCtx(fn) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  fn(ctx, ctx.currentTime);
}

function _tone(ctx, now, { freq, endFreq, duration, delay = 0, peak = 0.08, filterStart, filterEnd, q = 0.6 }) {
  const start = now + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  let node = osc;

  osc.frequency.setValueAtTime(freq, start);
  osc.frequency.exponentialRampToValueAtTime(endFreq ?? freq, start + duration);

  if (filterStart) {
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = q;
    filter.frequency.setValueAtTime(filterStart, start);
    filter.frequency.exponentialRampToValueAtTime(filterEnd ?? filterStart, start + duration);
    node.connect(filter);
    node = filter;
  }

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  node.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration);
}

export function playSuccessChime() {
  _withCtx((ctx, now) => {
    _tone(ctx, now, { freq: 523.25, duration: 0.11, delay: 0,    peak: 0.055, filterStart: 2200, filterEnd: 1400 });
    _tone(ctx, now, { freq: 659.25, duration: 0.13, delay: 0.08, peak: 0.06,  filterStart: 2200, filterEnd: 1400 });
    _tone(ctx, now, { freq: 784,    duration: 0.2,  delay: 0.16, peak: 0.065, filterStart: 2200, filterEnd: 1100 });
  });
}

export function playErrorTone() {
  _withCtx((ctx, now) => {
    _tone(ctx, now, { freq: 190, endFreq: 160, duration: 0.11, delay: 0,    peak: 0.08, filterStart: 900, filterEnd: 300 });
    _tone(ctx, now, { freq: 170, endFreq: 140, duration: 0.14, delay: 0.13, peak: 0.07, filterStart: 900, filterEnd: 250 });
  });
}

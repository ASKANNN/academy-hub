import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateSteps } from '../src/utils/algorithmSteps.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SORTING_DIR = join(__dirname, '../src/data/algorithms/sorting');

const SAMPLE_ARRAY = [8, 3, 9, 1, 6, 4, 7, 2, 5];
const SMALL_SAMPLE_ARRAY = [4, 2, 5, 1, 3];
const SMALL_SAMPLE_SLUGS = new Set(['bogosort']);

const SLUG_TO_FILE = {
  bogosort: 'bogo-sort.js',
  flashsort: 'flash-sort.js',
};

// bogosort has random frame count each run — stepBreakpoints would be wrong; skip it
const SKIP_SLUGS = new Set(['bogosort']);

const ALL_SLUGS = [
  'bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort',
  'heap-sort', 'shell-sort', 'cocktail-shaker-sort', 'comb-sort', 'counting-sort',
  'radix-sort', 'bucket-sort', 'tim-sort', 'intro-sort', 'cycle-sort',
  'smooth-sort', 'tournament-sort', 'patience-sort', 'block-sort', 'library-sort',
  'gnome-sort', 'odd-even-sort', 'strand-sort', 'pancake-sort', 'postman-sort',
  'bitonic-sort', 'sorting-network', 'spread-sort', 'flashsort', 'bogosort',
  'stooge-sort',
];

const MIN_STEP_FRAMES = 2;

function computeBreakpoints(frames, numSteps) {
  const n = frames.length;
  const numBPs = numSteps - 1;

  // First frame where array content actually changes (first swap / placement)
  let firstChange = -1;
  for (let i = 1; i < n; i++) {
    if (frames[i].array.some((v, j) => v !== frames[i - 1].array[j])) {
      firstChange = i;
      break;
    }
  }
  if (firstChange === -1) firstChange = Math.max(1, Math.floor(n * 0.1));

  // Frames where sorted.length grows (excluding the very last frame)
  const sortedGrowths = [];
  for (let i = 1; i < n - 1; i++) {
    if (frames[i].sorted.length > frames[i - 1].sorted.length) {
      sortedGrowths.push(i);
    }
  }

  let bp0, bp1, bp2, bp3;

  if (firstChange <= n * 0.30) {
    bp0 = firstChange;

    if (sortedGrowths.length >= 3) {
      bp1 = sortedGrowths[0];
      bp2 = Math.floor(n * 0.55);
      bp3 = Math.floor(n * 0.82);
    } else {
      const rem = n - 1 - bp0;
      bp1 = bp0 + Math.floor(rem * 0.30);
      bp2 = bp0 + Math.floor(rem * 0.60);
      bp3 = bp0 + Math.floor(rem * 0.85);
    }
  } else {
    // First real array change is late — only anchor on it if enough frames remain
    const remaining = n - 1 - firstChange;
    if (remaining >= (numBPs - 1) * MIN_STEP_FRAMES) {
      bp0 = Math.max(1, Math.min(3, Math.floor(firstChange / 3)));
      bp1 = firstChange;
      const rem = n - 1 - bp1;
      bp2 = bp1 + Math.floor(rem / 3);
      bp3 = bp1 + Math.floor(2 * rem / 3);
    } else {
      // Not enough frames after firstChange — pure proportional split
      return Array.from({ length: numBPs }, (_, k) =>
        Math.floor((k + 1) * n / numSteps)
      );
    }
  }

  const bps = [bp0, bp1, bp2, bp3];
  bps[0] = Math.max(bps[0], MIN_STEP_FRAMES);

  for (let i = 1; i < bps.length; i++) {
    bps[i] = Math.max(bps[i], bps[i - 1] + MIN_STEP_FRAMES);
  }
  // Ensure each bp leaves room for all subsequent ones
  for (let i = bps.length - 1; i >= 0; i--) {
    bps[i] = Math.min(bps[i], n - 1 - (bps.length - 1 - i));
  }
  // Re-enforce forward after backward clamp
  for (let i = 1; i < bps.length; i++) {
    bps[i] = Math.max(bps[i], bps[i - 1] + 1);
  }

  return bps;
}

function removeBreakpoints(filePath) {
  let content = readFileSync(filePath, 'utf8');
  if (content.includes('stepBreakpoints:')) {
    content = content.replace(/\n  stepBreakpoints: \[[\d, ]+\],/, '');
    writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function updateFile(filePath, breakpoints) {
  let content = readFileSync(filePath, 'utf8');
  const bpsLine = `  stepBreakpoints: [${breakpoints.join(', ')}],\n`;

  if (content.includes('stepBreakpoints:')) {
    content = content.replace(/  stepBreakpoints: \[[\d, ]+\],\n/, bpsLine);
  } else {
    content = content.replace(
      '\n\n  implementation:',
      `\n  stepBreakpoints: [${breakpoints.join(', ')}],\n\n  implementation:`
    );
  }

  writeFileSync(filePath, content, 'utf8');
}

for (const slug of ALL_SLUGS) {
  const filename = SLUG_TO_FILE[slug] ?? `${slug}.js`;
  const filePath = join(SORTING_DIR, filename);

  if (SKIP_SLUGS.has(slug)) {
    const removed = removeBreakpoints(filePath);
    console.log(`${slug}: skipped (random frames)${removed ? ' — removed stale breakpoints' : ''}`);
    continue;
  }

  const sample = SMALL_SAMPLE_SLUGS.has(slug) ? SMALL_SAMPLE_ARRAY : SAMPLE_ARRAY;
  const frames = generateSteps(slug, sample);
  const bps = computeBreakpoints(frames, 5);

  updateFile(filePath, bps);
  console.log(`${slug}: [${bps.join(', ')}] / ${frames.length} frames`);
}

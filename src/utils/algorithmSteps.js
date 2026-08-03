function frame(array, active = [], sorted = []) {
  return { array: [...array], active, sorted };
}

function bubbleSortSteps(input) {
  const a = [...input];
  const frames = [frame(a, [], [])];
  const n = a.length;
  const sortedFrom = n;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      frames.push(frame(a, [j, j + 1], rangeFrom(sortedFrom - i, n)));
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        frames.push(frame(a, [j, j + 1], rangeFrom(sortedFrom - i, n)));
      }
    }
    if (!swapped) break;
  }
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function selectionSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      frames.push(frame(a, [minIndex, j], rangeFrom(0, i)));
      if (a[j] < a[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
      frames.push(frame(a, [i, minIndex], rangeFrom(0, i)));
    }
  }
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function insertionSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], rangeFrom(0, 1))];

  for (let i = 1; i < n; i++) {
    const current = a[i];
    let j = i - 1;
    frames.push(frame(a, [i], rangeFrom(0, i)));
    while (j >= 0 && a[j] > current) {
      a[j + 1] = a[j];
      j--;
      frames.push(frame(a, [j + 1], rangeFrom(0, i)));
    }
    a[j + 1] = current;
    frames.push(frame(a, [j + 1], rangeFrom(0, i + 1)));
  }
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function mergeSortSteps(input) {
  const a = [...input];
  const frames = [frame(a, [], [])];

  function mergeSortRec(lo, hi) {
    if (hi - lo <= 1) return;
    const mid = Math.floor((lo + hi) / 2);
    mergeSortRec(lo, mid);
    mergeSortRec(mid, hi);

    const left = a.slice(lo, mid);
    const right = a.slice(mid, hi);
    let i = 0, j = 0, k = lo;

    while (i < left.length && j < right.length) {
      frames.push(frame(a, [k], []));
      if (left[i] <= right[j]) a[k++] = left[i++];
      else a[k++] = right[j++];
      frames.push(frame(a, [k - 1], []));
    }
    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];
    frames.push(frame(a, rangeFrom(lo, hi), []));
  }

  mergeSortRec(0, a.length);
  frames.push(frame(a, [], rangeFrom(0, a.length)));
  return frames;
}

function quickSortSteps(input) {
  const a = [...input];
  const frames = [frame(a, [], [])];
  const sortedIndices = new Set();

  function partition(low, high) {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      frames.push(frame(a, [j, high], [...sortedIndices]));
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        frames.push(frame(a, [i, j], [...sortedIndices]));
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    frames.push(frame(a, [i + 1, high], [...sortedIndices]));
    sortedIndices.add(i + 1);
    return i + 1;
  }

  function quickSortRec(low, high) {
    if (low < high) {
      const p = partition(low, high);
      quickSortRec(low, p - 1);
      quickSortRec(p + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
    }
  }

  quickSortRec(0, a.length - 1);
  frames.push(frame(a, [], rangeFrom(0, a.length)));
  return frames;
}

function heapSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];

  function siftDown(size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      frames.push(frame(a, [largest, left], rangeFrom(size, n)));
      if (a[left] > a[largest]) largest = left;
    }
    if (right < size) {
      frames.push(frame(a, [largest, right], rangeFrom(size, n)));
      if (a[right] > a[largest]) largest = right;
    }

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      frames.push(frame(a, [i, largest], rangeFrom(size, n)));
      siftDown(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    frames.push(frame(a, [0, end], rangeFrom(end, n)));
    siftDown(end, 0);
  }

  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function rangeFrom(start, end) {
  const out = [];
  for (let i = start; i < end; i++) out.push(i);
  return out;
}

const GENERATORS = {
  'bubble-sort': bubbleSortSteps,
  'selection-sort': selectionSortSteps,
  'insertion-sort': insertionSortSteps,
  'merge-sort': mergeSortSteps,
  'quick-sort': quickSortSteps,
  'heap-sort': heapSortSteps,
};

export function generateSteps(slug, array) {
  const generator = GENERATORS[slug];
  return generator ? generator(array) : [frame(array, [], [])];
}

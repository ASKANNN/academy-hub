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

function shellSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const current = a[i];
      let j = i;
      frames.push(frame(a, [j, j - gap], []));
      while (j >= gap && a[j - gap] > current) {
        a[j] = a[j - gap];
        j -= gap;
        frames.push(frame(a, [j], []));
      }
      a[j] = current;
    }
  }
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function cocktailShakerSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  let start = 0;
  let end = n - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i++) {
      frames.push(frame(a, [i, i + 1], [...rangeFrom(0, start), ...rangeFrom(end + 1, n)]));
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
        frames.push(frame(a, [i, i + 1], [...rangeFrom(0, start), ...rangeFrom(end + 1, n)]));
      }
    }
    end--;
    if (!swapped) break;

    swapped = false;
    for (let i = end; i > start; i--) {
      frames.push(frame(a, [i - 1, i], [...rangeFrom(0, start), ...rangeFrom(end + 1, n)]));
      if (a[i - 1] > a[i]) {
        [a[i - 1], a[i]] = [a[i], a[i - 1]];
        swapped = true;
        frames.push(frame(a, [i - 1, i], [...rangeFrom(0, start), ...rangeFrom(end + 1, n)]));
      }
    }
    start++;
  }
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function combSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  let gap = n;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }
    for (let i = 0; i + gap < n; i++) {
      frames.push(frame(a, [i, i + gap], []));
      if (a[i] > a[i + gap]) {
        [a[i], a[i + gap]] = [a[i + gap], a[i]];
        sorted = false;
        frames.push(frame(a, [i, i + gap], []));
      }
    }
  }
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function countingSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  if (n === 0) return frames;

  const min = Math.min(...a);
  const max = Math.max(...a);
  const count = new Array(max - min + 1).fill(0);

  for (let i = 0; i < n; i++) {
    count[a[i] - min]++;
    frames.push(frame(a, [i], []));
  }
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];

  const output = [...a];
  for (let i = n - 1; i >= 0; i--) {
    const value = a[i];
    count[value - min]--;
    const pos = count[value - min];
    output[pos] = value;
    frames.push(frame(output, [pos], []));
  }
  frames.push(frame(output, [], rangeFrom(0, n)));
  return frames;
}

function radixSortSteps(input) {
  const n = input.length;
  const frames = [frame(input, [], [])];
  if (n === 0) return frames;

  let working = [...input];
  const max = Math.max(...working);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(working[i] / exp) % 10;
      buckets[digit].push(working[i]);
      frames.push(frame(working, [i], []));
    }
    working = buckets.flat();
    frames.push(frame(working, [], []));
  }
  frames.push(frame(working, [], rangeFrom(0, n)));
  return frames;
}

function bucketSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  if (n === 0) return frames;

  const min = Math.min(...a);
  const max = Math.max(...a);
  const bucketCount = Math.max(1, Math.ceil(Math.sqrt(n)));
  const span = (max - min + 1) / bucketCount || 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < n; i++) {
    let idx = Math.floor((a[i] - min) / span);
    if (idx >= bucketCount) idx = bucketCount - 1;
    buckets[idx].push(a[i]);
    frames.push(frame(a, [i], []));
  }

  const working = [];
  for (const bucket of buckets) {
    bucket.sort((x, y) => x - y);
    for (const value of bucket) {
      working.push(value);
      frames.push(frame([...working, ...a.slice(working.length)], [working.length - 1], rangeFrom(0, working.length)));
    }
  }
  frames.push(frame(working, [], rangeFrom(0, n)));
  return frames;
}

function timSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  const MIN_RUN = 4;

  for (let start = 0; start < n; start += MIN_RUN) {
    const end = Math.min(start + MIN_RUN - 1, n - 1);
    for (let i = start + 1; i <= end; i++) {
      const current = a[i];
      let j = i - 1;
      frames.push(frame(a, [i], []));
      while (j >= start && a[j] > current) {
        a[j + 1] = a[j];
        j--;
        frames.push(frame(a, [j + 1], []));
      }
      a[j + 1] = current;
    }
    frames.push(frame(a, [], rangeFrom(start, end + 1)));
  }

  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += size * 2) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + size * 2 - 1, n - 1);
      if (mid >= right) continue;

      const leftPart = a.slice(left, mid + 1);
      const rightPart = a.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;
      while (i < leftPart.length && j < rightPart.length) {
        frames.push(frame(a, [k], []));
        if (leftPart[i] <= rightPart[j]) a[k++] = leftPart[i++];
        else a[k++] = rightPart[j++];
        frames.push(frame(a, [k - 1], []));
      }
      while (i < leftPart.length) { a[k++] = leftPart[i++]; frames.push(frame(a, [k - 1], [])); }
      while (j < rightPart.length) { a[k++] = rightPart[j++]; frames.push(frame(a, [k - 1], [])); }
      frames.push(frame(a, [], rangeFrom(left, right + 1)));
    }
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
  'shell-sort': shellSortSteps,
  'cocktail-shaker-sort': cocktailShakerSortSteps,
  'comb-sort': combSortSteps,
  'counting-sort': countingSortSteps,
  'radix-sort': radixSortSteps,
  'bucket-sort': bucketSortSteps,
  'tim-sort': timSortSteps,
};

export function generateSteps(slug, array) {
  const generator = GENERATORS[slug];
  return generator ? generator(array) : [frame(array, [], [])];
}

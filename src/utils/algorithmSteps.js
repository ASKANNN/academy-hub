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

function introSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  const maxDepth = 2 * Math.floor(Math.log2(n || 1));

  function insertionSortRange(low, high) {
    for (let i = low + 1; i <= high; i++) {
      const current = a[i];
      let j = i - 1;
      frames.push(frame(a, [i], []));
      while (j >= low && a[j] > current) {
        a[j + 1] = a[j];
        j--;
        frames.push(frame(a, [j + 1], []));
      }
      a[j + 1] = current;
    }
  }

  function siftDown(low, size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < size) {
      frames.push(frame(a, [low + largest, low + left], []));
      if (a[low + left] > a[low + largest]) largest = left;
    }
    if (right < size) {
      frames.push(frame(a, [low + largest, low + right], []));
      if (a[low + right] > a[low + largest]) largest = right;
    }
    if (largest !== i) {
      [a[low + i], a[low + largest]] = [a[low + largest], a[low + i]];
      frames.push(frame(a, [low + i, low + largest], []));
      siftDown(low, size, largest);
    }
  }

  function heapSortRange(low, high) {
    const size = high - low + 1;
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) siftDown(low, size, i);
    for (let end = size - 1; end > 0; end--) {
      [a[low], a[low + end]] = [a[low + end], a[low]];
      frames.push(frame(a, [low, low + end], []));
      siftDown(low, end, 0);
    }
  }

  function partition(low, high) {
    const pivot = a[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      frames.push(frame(a, [j, high], []));
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        frames.push(frame(a, [i, j], []));
      }
    }
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    frames.push(frame(a, [i + 1, high], []));
    return i + 1;
  }

  function introsortRec(low, high, depthLimit) {
    const size = high - low + 1;
    if (size < 16) { insertionSortRange(low, high); return; }
    if (depthLimit === 0) { heapSortRange(low, high); return; }
    const p = partition(low, high);
    introsortRec(low, p - 1, depthLimit - 1);
    introsortRec(p + 1, high, depthLimit - 1);
  }

  introsortRec(0, n - 1, maxDepth);
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function cycleSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = a[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < n; i++) {
      frames.push(frame(a, [cycleStart, i], []));
      if (a[i] < item) pos++;
    }
    if (pos === cycleStart) continue;

    while (item === a[pos]) pos++;
    [a[pos], item] = [item, a[pos]];
    frames.push(frame(a, [pos], []));

    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        frames.push(frame(a, [cycleStart, i], []));
        if (a[i] < item) pos++;
      }
      while (item === a[pos]) pos++;
      [a[pos], item] = [item, a[pos]];
      frames.push(frame(a, [pos], []));
    }
  }
  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function smoothSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  const LEO = [1, 1];
  function leonardo(k) {
    while (LEO.length <= k) LEO.push(LEO[LEO.length - 1] + LEO[LEO.length - 2] + 1);
    return LEO[k];
  }

  function siftDown(root, order) {
    while (order > 1) {
      const right = root - 1;
      const left = root - 1 - leonardo(order - 2);
      let bigger = root;
      frames.push(frame(a, [root, left, right], []));
      if (a[left] > a[bigger]) bigger = left;
      if (a[right] > a[bigger]) bigger = right;
      if (bigger === root) break;
      [a[root], a[bigger]] = [a[bigger], a[root]];
      frames.push(frame(a, [root, bigger], []));
      if (bigger === right) { root = right; order -= 2; }
      else { root = left; order -= 1; }
    }
  }

  const orders = [];
  function trinkle(root, idx) {
    let r = root;
    let i = idx;
    while (true) {
      const order = orders[i];
      let winner = r;
      let left = -1;
      let right = -1;
      if (order > 1) {
        right = r - 1;
        left = r - 1 - leonardo(order - 2);
        frames.push(frame(a, [r, left, right], []));
        if (a[left] > a[winner]) winner = left;
        if (a[right] > a[winner]) winner = right;
      }
      const hasStepson = i > 0;
      const stepson = hasStepson ? r - leonardo(order) : -1;
      if (hasStepson) {
        frames.push(frame(a, [r, stepson], []));
        if (a[stepson] > a[winner]) winner = stepson;
      }
      if (winner === r) return;
      if (winner === stepson) {
        [a[r], a[stepson]] = [a[stepson], a[r]];
        frames.push(frame(a, [r, stepson], []));
        r = stepson;
        i--;
        continue;
      }
      [a[r], a[winner]] = [a[winner], a[r]];
      frames.push(frame(a, [r, winner], []));
      if (winner === right) siftDown(right, order - 2);
      else siftDown(left, order - 1);
      return;
    }
  }

  for (let i = 0; i < n; i++) {
    if (orders.length >= 2 && orders[orders.length - 2] === orders[orders.length - 1] + 1) {
      orders[orders.length - 2] += 1;
      orders.pop();
    } else if (orders.length >= 1 && orders[orders.length - 1] === 1) {
      orders.push(0);
    } else {
      orders.push(1);
    }
    trinkle(i, orders.length - 1);
  }

  for (let i = n - 1; i > 0; i--) {
    if (orders[orders.length - 1] <= 1) {
      orders.pop();
    } else {
      const order = orders.pop();
      const right = i - 1;
      const left = i - 1 - leonardo(order - 2);
      orders.push(order - 1, order - 2);
      trinkle(left, orders.length - 2);
      trinkle(right, orders.length - 1);
    }
  }

  frames.push(frame(a, [], rangeFrom(0, n)));
  return frames;
}

function tournamentSortSteps(input) {
  const orig = [...input];
  const n = orig.length;
  const frames = [frame(orig, [], [])];
  const output = [...orig];
  if (n <= 1) {
    frames.push(frame(output, [], rangeFrom(0, n)));
    return frames;
  }

  let size = 1;
  while (size < n) size *= 2;
  const INF = Infinity;
  const leaves = new Array(size).fill(INF);
  const leafOrig = new Array(size).fill(-1);
  for (let i = 0; i < n; i++) {
    leaves[i] = orig[i];
    leafOrig[i] = i;
  }

  const winner = new Array(2 * size - 1).fill(-1);
  for (let i = 0; i < size; i++) winner[size - 1 + i] = i;

  function buildFrom(leafSlot) {
    let node = size - 1 + leafSlot;
    while (node > 0) {
      const parent = Math.floor((node - 1) / 2);
      const leftChild = parent * 2 + 1;
      const rightChild = parent * 2 + 2;
      const leftLeaf = winner[leftChild];
      const rightLeaf = winner[rightChild];
      const leftVal = leftLeaf === -1 ? INF : leaves[leftLeaf];
      const rightVal = rightLeaf === -1 ? INF : leaves[rightLeaf];
      const li = leftLeaf === -1 ? -1 : leafOrig[leftLeaf];
      const ri = rightLeaf === -1 ? -1 : leafOrig[rightLeaf];
      const active = [li, ri].filter((x) => x >= 0);
      if (active.length) frames.push(frame(output, active, []));
      winner[parent] = leftVal <= rightVal ? leftLeaf : rightLeaf;
      node = parent;
    }
  }
  for (let leafSlot = 0; leafSlot < size; leafSlot++) buildFrom(leafSlot);

  for (let outPos = 0; outPos < n; outPos++) {
    const championLeaf = winner[0];
    output[outPos] = leaves[championLeaf];
    frames.push(frame(output, [outPos], rangeFrom(0, outPos)));
    leaves[championLeaf] = INF;
    leafOrig[championLeaf] = -1;
    buildFrom(championLeaf);
  }

  frames.push(frame(output, [], rangeFrom(0, n)));
  return frames;
}

function patienceSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];
  if (n === 0) return frames;

  const piles = [];
  for (let i = 0; i < n; i++) {
    const value = a[i];
    let lo = 0;
    let hi = piles.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      const top = piles[mid][piles[mid].length - 1];
      frames.push(frame(a, [i], []));
      if (top >= value) hi = mid;
      else lo = mid + 1;
    }
    if (lo === piles.length) piles.push([value]);
    else piles[lo].push(value);
    frames.push(frame(a, [i], []));
  }

  const output = [...a];
  for (let outPos = 0; outPos < n; outPos++) {
    let bestPile = -1;
    for (let p = 0; p < piles.length; p++) {
      if (piles[p].length === 0) continue;
      const top = piles[p][piles[p].length - 1];
      if (bestPile === -1 || top < piles[bestPile][piles[bestPile].length - 1]) bestPile = p;
    }
    output[outPos] = piles[bestPile].pop();
    frames.push(frame(output, [outPos], rangeFrom(0, outPos)));
  }

  frames.push(frame(output, [], rangeFrom(0, n)));
  return frames;
}

function blockSortSteps(input) {
  const a = [...input];
  const n = a.length;
  const frames = [frame(a, [], [])];

  function mergeInPlace(lo, mid, hi) {
    let i = lo;
    let j = mid;
    while (i < j && j < hi) {
      frames.push(frame(a, [i, j], []));
      if (a[i] <= a[j]) {
        i++;
      } else {
        const value = a[j];
        for (let k = j; k > i; k--) {
          a[k] = a[k - 1];
          frames.push(frame(a, [k, k - 1], []));
        }
        a[i] = value;
        frames.push(frame(a, [i], []));
        i++;
        j++;
      }
    }
  }

  for (let width = 1; width < n; width *= 2) {
    for (let lo = 0; lo < n; lo += 2 * width) {
      const mid = Math.min(lo + width, n);
      const hi = Math.min(lo + 2 * width, n);
      if (mid < hi) mergeInPlace(lo, mid, hi);
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
  'intro-sort': introSortSteps,
  'cycle-sort': cycleSortSteps,
  'smooth-sort': smoothSortSteps,
  'tournament-sort': tournamentSortSteps,
  'patience-sort': patienceSortSteps,
  'block-sort': blockSortSteps,
};

export function generateSteps(slug, array) {
  const generator = GENERATORS[slug];
  return generator ? generator(array) : [frame(array, [], [])];
}

// Frames for RecursionVisualizer. Each generator runs a traced copy of the
// page's real function and turns its calls and returns into frames, so the
// animation can never drift from the code. A frame holds every node of the
// run (laid out up front, so nothing moves between frames), the stack as a
// list of node ids from the bottom up, `phase` (the index into `steps`) and a
// `caption` for the line under the panels.

export const RECURSION_SAMPLES = {
  'base-case': { fn: 'factorial', n: 5, options: [0, 1, 2, 3, 4, 5, 6] },
};

function traceFactorial(n) {
  const nodes = [];
  const events = [];
  function factorial(k) {
    const id = nodes.length;
    nodes.push({ id, n: k });
    events.push({ type: 'call', id });
    if (k <= 1) {
      events.push({ type: 'return', id, value: 1 });
      return 1;
    }
    const sub = factorial(k - 1);
    const value = k * sub;
    events.push({ type: 'return', id, value, sub });
    return value;
  }
  const value = factorial(n);
  return { nodes, events, value };
}

function factorialFrames(n) {
  const { nodes, events, value } = traceFactorial(n);
  const state = nodes.map(() => ({ status: 'idle' }));
  const stack = [];
  const frames = [];
  let calls = 0;
  const snap = (phase, caption) => frames.push({
    nodes: nodes.map((node, i) => ({ ...node, ...state[i] })),
    stack: [...stack],
    calls,
    phase,
    caption,
  });

  for (const event of events) {
    const { id } = event;
    const k = nodes[id].n;
    if (event.type === 'call') {
      if (stack.length) state[stack[stack.length - 1]].status = 'waiting';
      stack.push(id);
      calls++;
      if (k <= 1) {
        state[id] = { status: 'active', text: '→ 1' };
        snap(2, ['factorialBase', k]);
      } else {
        state[id] = { status: 'active', text: `${k} × ?` };
        snap(id === 0 ? 0 : 1, ['factorialStep', k]);
      }
    } else {
      state[id].value = event.value;
      // A base case already said "return 1" on its own frame. Any other
      // return is drawn as the caller resuming: the callee leaves the stack
      // and the caller finishes its multiplication in the same frame.
      if (event.sub === undefined) continue;
      const child = stack.pop();
      state[child] = { status: 'done', text: `= ${state[child].value}`, value: state[child].value };
      state[id] = { status: 'active', text: `${k} × ${event.sub} = ${event.value}`, value: event.value };
      snap(3, ['factorialCombine', k, event.sub, event.value]);
    }
  }

  const root = stack.pop();
  state[root] = { status: 'done', text: `= ${value}`, value };
  snap(4, ['answer', `factorial(${n})`, value, calls]);
  return frames;
}

const GENERATORS = {
  'base-case': factorialFrames,
};

export function generateRecursionSteps(slug, n) {
  return GENERATORS[slug](n);
}

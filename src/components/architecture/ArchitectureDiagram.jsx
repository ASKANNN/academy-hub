import { useId, useState } from 'react';
import { getStrings } from '../../i18n/strings.js';

const BOX_W = 216;
const BOX_H = 84;
const CHIP = 52;
const CHIP_MARGIN = 16;
const PLUGIN_W = 184;
const PLUGIN_H = 120;
const HEX_R = 124;
const HEX_HALF = HEX_R * Math.cos(Math.PI / 6);
const SOCKET_W = 48;
const SOCKET_H = 16;

function stackPositions(nodes) {
  const width = 640;
  const gapY = 150;
  const height = 40 + (nodes.length - 1) * gapY + BOX_H + 40;
  return {
    width,
    height,
    positions: nodes.map((node, i) => ({
      id: node.id,
      x: width / 2 - BOX_W / 2,
      y: 40 + i * gapY,
    })),
  };
}

function pipelinePositions(nodes) {
  const gapX = 256;
  const width = 40 + (nodes.length - 1) * gapX + BOX_W + 40;
  const height = BOX_H + 80;
  return {
    width,
    height,
    positions: nodes.map((node, i) => ({
      id: node.id,
      x: 40 + i * gapX,
      y: height / 2 - BOX_H / 2,
    })),
  };
}

function hubPositions(nodes) {
  const satellites = nodes.slice(1);
  // Satellites sit on an ellipse, rotated half a step so four of them land on
  // the diagonals: on a circle the wide boxes at 0deg and 180deg would overlap
  // the centre box sideways.
  const rx = 368;
  const ry = 250;
  const centers = [
    { id: nodes[0].id, x: 0, y: 0 },
    ...satellites.map((node, i) => {
      const angle = (2 * Math.PI * (i - 0.5)) / satellites.length - Math.PI / 2;
      return { id: node.id, x: rx * Math.cos(angle), y: ry * Math.sin(angle) };
    }),
  ];
  const minX = Math.min(...centers.map((c) => c.x));
  const maxX = Math.max(...centers.map((c) => c.x));
  const minY = Math.min(...centers.map((c) => c.y));
  const maxY = Math.max(...centers.map((c) => c.y));
  return {
    width: maxX - minX + BOX_W + 80,
    height: maxY - minY + BOX_H + 80,
    positions: centers.map((c) => ({ id: c.id, x: c.x - minX + 40, y: c.y - minY + 40 })),
  };
}

// Ports and Adapters: the core is drawn as an actual hexagon with one port on
// its left face (driving side) and one on its right face (driven side), and
// every adapter attaches to its side's port - so several adapters visibly
// share one port, which is the point of the pattern.
function hexagonPositions(nodes) {
  const margin = 30;
  const step = 200;
  // Ports sit a little below the hexagon centre, leaving room above them for
  // the core's icon and title; adapter rows are centred on the port line so
  // the edges on both sides meet their port at mirrored angles.
  const portOffset = 12;
  const left = nodes.filter((n) => n.side === 'left');
  const right = nodes.filter((n) => n.side === 'right');
  const rows = Math.max(left.length, right.length, 1);
  const rowsHalf = ((rows - 1) * step) / 2 + BOX_H / 2;
  const portY = margin + Math.max(rowsHalf, HEX_R + portOffset);
  const height = portY + Math.max(rowsHalf, HEX_R - portOffset) + margin;
  const cy = portY - portOffset;
  const cx = margin + BOX_W + 84 + HEX_HALF;
  const width = 2 * cx;
  const column = (list, x) =>
    list.map((node, i) => ({
      id: node.id,
      x,
      y: portY + (i - (list.length - 1) / 2) * step - BOX_H / 2,
      w: BOX_W,
      h: BOX_H,
    }));
  const leftPort = { x: cx - HEX_HALF, y: portY };
  const rightPort = { x: cx + HEX_HALF, y: portY };
  // Edges stop just outside the port marker so the arrowhead stays visible.
  const leftAnchor = { x: leftPort.x - 9, y: portY };
  const rightAnchor = { x: rightPort.x + 9, y: portY };
  return {
    width,
    height,
    positions: [
      { id: nodes[0].id, x: cx - HEX_HALF, y: cy - HEX_R, w: 2 * HEX_HALF, h: 2 * HEX_R, shape: 'hexagon' },
      ...column(left, margin),
      ...column(right, width - margin - BOX_W),
    ],
    anchors: Object.fromEntries([
      ...left.map((n) => [n.id, leftAnchor]),
      ...right.map((n) => [n.id, rightAnchor]),
    ]),
    ports: [
      { side: 'left', ...leftPort },
      { side: 'right', ...rightPort },
    ],
  };
}

// Microkernel: a wide core with one socket per plug-in on its bottom edge,
// plug-ins plugged in underneath, one extra empty socket for the next
// plug-in, and the clients that call the core above it.
function pluginPositions(nodes) {
  const margin = 36;
  const gap = 20;
  const top = nodes.filter((n) => n.side === 'top');
  const plugins = nodes.filter((n) => n.side === 'bottom');
  const columns = plugins.length + 1;
  const rowW = columns * PLUGIN_W + (columns - 1) * gap;
  const width = rowW + 2 * margin;
  const coreY = 30 + BOX_H + 64;
  const coreH = 100;
  const socketY = coreY + coreH;
  const pluginY = socketY + 56;
  const height = pluginY + PLUGIN_H + 30;
  const columnX = (j) => margin + j * (PLUGIN_W + gap);
  const topX = (i) => width / 2 + (i - (top.length - 1) / 2) * (BOX_W + 40) - BOX_W / 2;
  return {
    width,
    height,
    positions: [
      { id: nodes[0].id, x: margin, y: coreY, w: rowW, h: coreH },
      ...top.map((node, i) => ({ id: node.id, x: topX(i), y: 30 })),
      ...plugins.map((node, j) => ({
        id: node.id,
        x: columnX(j),
        y: pluginY,
        w: PLUGIN_W,
        h: PLUGIN_H,
        variant: 'column',
      })),
    ],
    anchors: Object.fromEntries([
      ...top.map((n, i) => [n.id, { x: topX(i) + BOX_W / 2, y: coreY }]),
      ...plugins.map((n, j) => [n.id, { x: columnX(j) + PLUGIN_W / 2, y: socketY + SOCKET_H / 2 }]),
    ]),
    sockets: Array.from({ length: columns }, (_, j) => ({
      x: columnX(j) + PLUGIN_W / 2,
      y: socketY,
      free: j === plugins.length,
    })),
    freeSlot: { x: columnX(plugins.length), y: pluginY, w: PLUGIN_W, h: PLUGIN_H },
  };
}

const LAYOUTS = {
  stack: stackPositions,
  pipeline: pipelinePositions,
  hub: hubPositions,
  hexagon: hexagonPositions,
  plugin: pluginPositions,
};

// Node icons are keyed by the common vocabulary the 10 planned patterns share
// (view/controller/model today, service/database/client/... as more patterns
// are authored) rather than added to the data schema - a node whose id isn't
// recognized falls back to a generic component glyph instead of breaking.
const NODE_ICONS = {
  view: { d: 'M4 4h16v12H4z M4 7.5h16 M10 16v3h4v-3' },
  controller: {
    d: 'M12 12m-7.2 0a7.2 7.2 0 1 0 14.4 0a7.2 7.2 0 1 0 -14.4 0',
    fillD: 'M9.8 8.7 16 12 9.8 15.3Z',
  },
  model: {
    d: 'M6 6a6 2.1 0 1 0 12 0a6 2.1 0 1 0 -12 0 M6 6v11.5 M18 6v11.5 M6 11.75a6 2.1 0 0 0 12 0 M6 17.5a6 2.1 0 0 0 12 0',
  },
  presenter: {
    d: 'M12 12m-7.2 0a7.2 7.2 0 1 0 14.4 0a7.2 7.2 0 1 0 -14.4 0',
    fillD: 'M9.8 8.7 16 12 9.8 15.3Z',
  },
  viewmodel: {
    d: 'M12 12m-7.2 0a7.2 7.2 0 1 0 14.4 0a7.2 7.2 0 1 0 -14.4 0',
    fillD: 'M9.8 8.7 16 12 9.8 15.3Z',
  },
  presentation: { d: 'M4 4h16v12H4z M4 7.5h16 M10 16v3h4v-3' },
  business: { d: 'M6.5 4.5h11v16h-11z M10 3h4v3h-4z M9.5 13l2 2 3.5-4' },
  persistence: { d: 'M4 13h4.5l1.5 2.5h4l1.5-2.5H20v6H4z M12 3.5v8 M8.8 8.3 12 11.5l3.2-3.2' },
  database: {
    d: 'M6 6a6 2.1 0 1 0 12 0a6 2.1 0 1 0 -12 0 M6 6v11.5 M18 6v11.5 M6 11.75a6 2.1 0 0 0 12 0 M6 17.5a6 2.1 0 0 0 12 0',
  },
  core: {
    d: 'M12 3.5 19.4 7.75v8.5L12 20.5 4.6 16.25v-8.5Z',
    fillD: 'M12 9.4 14.25 10.7v2.6L12 14.6 9.75 13.3v-2.6Z',
  },
  form: { d: 'M3.5 5.5h17v5h-17z M6 8h6 M12 14h8.5v4.5H12z' },
  tests: { d: 'M9 3.5h6 M10.5 3.5v6L5.4 18.3a1.5 1.5 0 0 0 1.3 2.2h10.6a1.5 1.5 0 0 0 1.3-2.2L13.5 9.5v-6 M7.6 14.5h8.8' },
  memory: { d: 'M7.5 7.5h9v9h-9z M10 4.5v3 M14 4.5v3 M10 16.5v3 M14 16.5v3 M4.5 10h3 M4.5 14h3 M16.5 10h3 M16.5 14h3' },
  'browser-storage': {
    d: 'M6 6a6 2.1 0 1 0 12 0a6 2.1 0 1 0 -12 0 M6 6v11.5 M18 6v11.5 M6 11.75a6 2.1 0 0 0 12 0 M6 17.5a6 2.1 0 0 0 12 0',
  },
  kernel: { d: 'M6 6h12v12H6z', fillD: 'M9.5 9.5h5v5h-5z' },
  page: { d: 'M4 4h16v12H4z M4 7.5h16 M10 16v3h4v-3' },
  'no-disposable': { d: 'M5 7h14 M9.5 7V4.5h5V7 M7 7l1 13h8l1-13 M10.5 10.5v6 M13.5 10.5v6' },
  'corporate-only': { d: 'M4.5 20.5h15 M7 20.5V4h10v16.5 M10 7.5h1 M13 7.5h1 M10 11h1 M13 11h1 M10 14.5h1 M13 14.5h1' },
  'broken-demo': {
    d: 'M12 7.5a4 4 0 0 1 4 4v3a4 4 0 0 1-8 0v-3a4 4 0 0 1 4-4z M9.5 5 11 7.6 M14.5 5 13 7.6 M8 11.5H4.5 M19.5 11.5H16 M8 15.5H4.5 M19.5 15.5H16 M12 11v7.5',
  },
  default: { d: 'M12 3 21 12 12 21 3 12Z' },
};

function center(pos) {
  return { x: pos.x + (pos.w ?? BOX_W) / 2, y: pos.y + (pos.h ?? BOX_H) / 2 };
}

function edgePoint(from, to, box = {}) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const halfW = (box.w ?? BOX_W) / 2;
  const halfH = (box.h ?? BOX_H) / 2;
  const scale = Math.min(
    Math.abs(dx) > 0 ? halfW / Math.abs(Math.cos(angle)) : Infinity,
    Math.abs(dy) > 0 ? halfH / Math.abs(Math.sin(angle)) : Infinity,
  );
  return { x: from.x + Math.cos(angle) * scale, y: from.y + Math.sin(angle) * scale };
}

function NodeContent({ pos, label, note, icon }) {
  const w = pos.w ?? BOX_W;
  const h = pos.h ?? BOX_H;
  const iconSize = 26;
  const chipIcon = (chipX, chipY) => (
    <>
      <rect className="architecture-diagram__node-chip" x={chipX} y={chipY} width={CHIP} height={CHIP} rx={15} />
      <svg
        x={chipX + (CHIP - iconSize) / 2}
        y={chipY + (CHIP - iconSize) / 2}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        className="architecture-diagram__node-icon"
      >
        <path d={icon.d} fill="none" />
        {icon.fillD && <path d={icon.fillD} className="architecture-diagram__node-icon-fill" stroke="none" />}
      </svg>
    </>
  );

  if (pos.shape === 'hexagon') {
    const points = [0, 1, 2, 3, 4, 5]
      .map((k) => {
        const angle = -Math.PI / 2 + (k * Math.PI) / 3;
        return `${w / 2 + HEX_R * Math.cos(angle)},${h / 2 + HEX_R * Math.sin(angle)}`;
      })
      .join(' ');
    return (
      <>
        <polygon className="architecture-diagram__node-box" points={points} />
        {chipIcon(w / 2 - CHIP / 2, h / 2 - 100)}
        <text x={w / 2} y={h / 2 - 26} textAnchor="middle" className="architecture-diagram__node-label">
          {label}
        </text>
        {note && (
          <text x={w / 2} y={h / 2 - 7} textAnchor="middle" className="architecture-diagram__node-note">
            {note}
          </text>
        )}
      </>
    );
  }

  if (pos.variant === 'column') {
    return (
      <>
        <rect className="architecture-diagram__node-box" width={w} height={h} rx={18} />
        {chipIcon(w / 2 - CHIP / 2, 12)}
        <text x={w / 2} y={86} textAnchor="middle" className="architecture-diagram__node-label architecture-diagram__node-label--compact">
          {label}
        </text>
        {note && (
          <text x={w / 2} y={105} textAnchor="middle" className="architecture-diagram__node-note">
            {note}
          </text>
        )}
      </>
    );
  }

  return (
    <>
      <rect className="architecture-diagram__node-box" width={w} height={h} rx={18} />
      {chipIcon(CHIP_MARGIN, (h - CHIP) / 2)}
      <text x={CHIP_MARGIN + CHIP + 16} y={note ? h / 2 - 9 : h / 2} dy="5.5" className="architecture-diagram__node-label">
        {label}
      </text>
      {note && (
        <text x={CHIP_MARGIN + CHIP + 16} y={h / 2 + 15} dy="4" className="architecture-diagram__node-note">
          {note}
        </text>
      )}
    </>
  );
}

export function ArchitectureDiagram({ diagram, lang }) {
  const uid = useId();
  const [activeId, setActiveId] = useState(null);
  const layoutFn = LAYOUTS[diagram.layout] ?? LAYOUTS.stack;
  const { width, height, positions, anchors, ports, sockets, freeSlot } = layoutFn(diagram.nodes);
  const posById = Object.fromEntries(positions.map((p) => [p.id, p]));
  const indexById = Object.fromEntries(diagram.nodes.map((n, i) => [n.id, i]));
  const t = getStrings(lang).architecturalPatterns;
  const pick = (text) => (text ? (text[lang] ?? text.ru) : null);

  // Group connections by the unordered pair of nodes they link. A pair joined
  // by two connections (MVP's flow goes back and forth: View <-> Presenter and
  // Presenter <-> Model) can't be drawn as two straight lines - they'd sit
  // exactly on top of each other - so each side is bowed out in opposite
  // directions below.
  const pairKeyOf = (conn) => [conn.from, conn.to].slice().sort().join('~');
  const connectionsByPair = {};
  diagram.connections.forEach((conn, i) => {
    const key = pairKeyOf(conn);
    (connectionsByPair[key] ??= []).push(i);
  });

  const arrowId = `${uid}-arrow`;
  const arrowActiveId = `${uid}-arrow-active`;

  // Layouts with anchors (hexagon ports, plug-in sockets) attach every
  // satellite to a fixed point on the core instead of the core's outline.
  function anchoredPath(conn) {
    const satelliteId = anchors[conn.from] ? conn.from : conn.to;
    const anchor = anchors[satelliteId];
    const box = posById[satelliteId];
    const boxPoint = edgePoint(center(box), anchor, box);
    const [start, end] = satelliteId === conn.from ? [boxPoint, anchor] : [anchor, boxPoint];
    // The label sits nearer the satellite: edges that share one port or
    // socket converge at the core, so their midpoints would crowd together.
    const labelAt = (p) => boxPoint[p] + (anchor[p] - boxPoint[p]) * 0.4;
    return {
      start,
      end,
      controlX: (start.x + end.x) / 2,
      controlY: (start.y + end.y) / 2,
      labelX: labelAt('x'),
      labelY: labelAt('y'),
    };
  }

  function bowedPath(conn, i) {
    const fromBox = posById[conn.from];
    const toBox = posById[conn.to];
    const fromCenter = center(fromBox);
    const toCenter = center(toBox);

    const indexGap = Math.abs(indexById[conn.to] - indexById[conn.from]);
    const clearance = Math.max(BOX_W, BOX_H) / 2 + 40;

    const twinIndices = connectionsByPair[pairKeyOf(conn)];
    const isTwin = twinIndices.length > 1 && indexGap === 1;

    let nx;
    let ny;
    if (isTwin) {
      // Two connections share this node pair. Take the perpendicular in a
      // fixed node order (low index -> high index) so the pair's arrows
      // land on opposite sides regardless of which way each one points.
      const loId = indexById[conn.from] <= indexById[conn.to] ? conn.from : conn.to;
      const hiId = loId === conn.from ? conn.to : conn.from;
      const loC = center(posById[loId]);
      const hiC = center(posById[hiId]);
      const cdx = hiC.x - loC.x;
      const cdy = hiC.y - loC.y;
      const clen = Math.hypot(cdx, cdy) || 1;
      const side = twinIndices.indexOf(i) === 0 ? 1 : -1;
      nx = (-cdy / clen) * clearance * side;
      ny = (cdx / clen) * clearance * side;
    } else {
      // Connections between non-adjacent nodes bow out to a control point
      // instead of drawing a straight line, so they don't visually cut
      // through an intermediate node's box (e.g. Model -> View in MVC's
      // three-node cycle would otherwise pass right through Controller).
      // A quadratic bezier's max distance from the straight chord is half
      // the control point's offset, so the offset needs to clear the box
      // by twice the box's half-extent plus a visible margin.
      // In a hub the centre is adjacent to every satellite, so the index
      // gap between them says nothing about nodes in the way.
      const touchesHubCentre =
        diagram.layout === 'hub' && (indexById[conn.from] === 0 || indexById[conn.to] === 0);
      const bow = indexGap > 1 && !touchesHubCentre ? 2 * clearance + 60 * (indexGap - 2) : 0;
      const sign = i % 2 === 0 ? 1 : -1;
      const dx = toCenter.x - fromCenter.x;
      const dy = toCenter.y - fromCenter.y;
      const len = Math.hypot(dx, dy) || 1;
      nx = (-dy / len) * bow * sign;
      ny = (dx / len) * bow * sign;
    }
    const controlX = (fromCenter.x + toCenter.x) / 2 + nx;
    const controlY = (fromCenter.y + toCenter.y) / 2 + ny;
    const start = edgePoint(fromCenter, { x: controlX, y: controlY }, fromBox);
    const end = edgePoint(toCenter, { x: controlX, y: controlY }, toBox);
    return { start, end, controlX, controlY };
  }

  return (
    <div className="architecture-diagram__viewport">
      <svg
        className="architecture-diagram"
        style={{ maxWidth: `${width}px` }}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={diagram.nodes.map((n) => pick(n.label)).join(', ')}
      >
        <defs>
          <marker id={arrowId} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0 L9 4.5 L0 9 Z" className="architecture-diagram__arrowhead" />
          </marker>
          <marker id={arrowActiveId} markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0 0 L9 4.5 L0 9 Z" className="architecture-diagram__arrowhead architecture-diagram__arrowhead--active" />
          </marker>
        </defs>

        {freeSlot && (
          <g className="architecture-diagram__free-slot">
            <rect x={freeSlot.x} y={freeSlot.y} width={freeSlot.w} height={freeSlot.h} rx={18} />
            <line x1={freeSlot.x + freeSlot.w / 2} y1={freeSlot.y} x2={freeSlot.x + freeSlot.w / 2} y2={sockets.at(-1).y + SOCKET_H / 2} />
            <text x={freeSlot.x + freeSlot.w / 2} y={freeSlot.y + freeSlot.h / 2} dy="5" textAnchor="middle">
              {t.diagramFreeSlot}
            </text>
          </g>
        )}

        {diagram.connections.map((conn, i) => {
          if (!posById[conn.from] || !posById[conn.to]) return null;
          const { start, end, controlX, controlY, labelX, labelY } = anchors ? anchoredPath(conn) : bowedPath(conn, i);
          const midX = labelX ?? 0.25 * start.x + 0.5 * controlX + 0.25 * end.x;
          const midY = labelY ?? 0.25 * start.y + 0.5 * controlY + 0.25 * end.y;
          const label = pick(conn.label);
          const pathD = `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
          // Only the outgoing edge highlights - hovering a node should teach
          // the one thing that node actively does next, not also whatever
          // notifies it from elsewhere (e.g. hovering View must not light up
          // Model's "notifies" edge just because it happens to end at View).
          const isActive = activeId && conn.from === activeId;

          return (
            <g
              key={i}
              className={`architecture-diagram__edge${isActive ? ' is-active' : ''}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <path d={pathD} fill="none" className="architecture-diagram__edge-line" markerEnd={`url(#${isActive ? arrowActiveId : arrowId})`} />
              <path d={pathD} fill="none" className="architecture-diagram__edge-flow" style={{ animationDelay: `${i * 550}ms` }} />
              {label && (
                <text x={midX} y={midY} dy="4.5" textAnchor="middle" className="architecture-diagram__edge-label">
                  {label}
                </text>
              )}
            </g>
          );
        })}

        {diagram.nodes.map((node, i) => {
          const pos = posById[node.id];
          if (!pos) return null;
          const label = pick(node.label);
          const isActive = activeId === node.id;

          return (
            <g
              key={node.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              className={`architecture-diagram__node${isActive ? ' is-active' : ''}`}
              style={{ animationDelay: `${i * 90}ms` }}
              tabIndex={0}
              role="img"
              aria-label={label}
              onMouseEnter={() => setActiveId(node.id)}
              onMouseLeave={() => setActiveId((current) => (current === node.id ? null : current))}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId((current) => (current === node.id ? null : current))}
            >
              <NodeContent
                pos={pos}
                label={label}
                note={pick(node.note)}
                icon={NODE_ICONS[node.id] ?? NODE_ICONS.default}
              />
            </g>
          );
        })}

        {sockets?.map((socket) => (
          <rect
            key={socket.x}
            className={`architecture-diagram__socket${socket.free ? ' architecture-diagram__socket--free' : ''}`}
            x={socket.x - SOCKET_W / 2}
            y={socket.y - SOCKET_H / 2}
            width={SOCKET_W}
            height={SOCKET_H}
            rx={4}
          />
        ))}

        {ports?.map((port) => (
          <g key={port.side} className="architecture-diagram__port">
            <rect x={port.x - 7} y={port.y - 15} width={14} height={30} rx={4} />
            <text
              x={port.side === 'left' ? port.x + 18 : port.x - 18}
              y={port.y}
              dy="4.5"
              textAnchor={port.side === 'left' ? 'start' : 'end'}
            >
              {pick(diagram.ports?.[port.side])}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

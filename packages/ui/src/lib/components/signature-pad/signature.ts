/** A point of a stroke: where, and how hard (0–1). */
export type ScSignaturePoint = readonly [
  x: number,
  y: number,
  pressure: number,
];

/** A stroke: its points, its colour and the pen's width. */
export interface ScSignatureStroke {
  readonly points: readonly ScSignaturePoint[];
  readonly color: string;
  /** The pen's width, at an even pressure. */
  readonly width: number;
}

/**
 * A signature: its strokes, on a pad of `width` × `height` — plain data, to
 * store and give back (a pad draws it again, fitted to its size).
 */
export interface ScSignature {
  readonly width: number;
  readonly height: number;
  readonly strokes: readonly ScSignatureStroke[];
}

/** What `signatureToSvg` and `signatureToBlob` take. */
export interface ScSignatureExportOptions {
  /** Space round the ink, in the signature's pixels (8). */
  readonly padding?: number;
}

/** What `signatureToBlob` takes. */
export interface ScSignatureBlobOptions extends ScSignatureExportOptions {
  /** `image/png` (the default, transparent); others on white. */
  readonly type?: string;
  /** For JPEG and WebP: 0 to 1. */
  readonly quality?: number;
  /** Pixels per signature pixel (2). */
  readonly scale?: number;
}

/** How far a point trails the pointer: 0 as written, 1 never moves. */
const STREAMLINE = 0.45;

/** The ink's colour on paper: `currentColor` is black there. */
const inkColor = (color: string) =>
  color === 'currentColor' ? '#000000' : color;

/**
 * The next point of a stroke: smoothed, and — without a pen's pressure —
 * pressed lighter the faster it moves.
 */
export function nextPoint(
  last: ScSignaturePoint | undefined,
  x: number,
  y: number,
  pressure: number | null,
): ScSignaturePoint {
  if (!last) return [x, y, pressure ?? 0.5];
  const sx = last[0] + (x - last[0]) * (1 - STREAMLINE);
  const sy = last[1] + (y - last[1]) * (1 - STREAMLINE);
  const speed = Math.hypot(sx - last[0], sy - last[1]);
  const target = pressure ?? Math.max(0.15, 1 - speed / 18);
  // The pressure eases too: no jumps in the ink's width.
  return [sx, sy, last[2] + (target - last[2]) * 0.3];
}

/** A stroke's outline: a closed shape round its points, wide as pressed; a dot for a tap. */
function outline(stroke: ScSignatureStroke): [number, number][] {
  const points = stroke.points;
  const radius = (p: ScSignaturePoint) =>
    (stroke.width / 2) * (0.35 + 1.3 * p[2]);
  if (points.length === 1) {
    const [x, y] = points[0];
    return arc(x, y, radius(points[0]), 0, Math.PI * 2, 12);
  }
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  points.forEach((point, i) => {
    const before = points[Math.max(0, i - 1)];
    const after = points[Math.min(points.length - 1, i + 1)];
    const dx = after[0] - before[0];
    const dy = after[1] - before[1];
    const length = Math.hypot(dx, dy) || 1;
    const r = radius(point);
    const nx = (-dy / length) * r;
    const ny = (dx / length) * r;
    left.push([point[0] + nx, point[1] + ny]);
    right.push([point[0] - nx, point[1] - ny]);
  });
  const first = points[0];
  const last = points[points.length - 1];
  return [
    ...left,
    ...cap(last, left[left.length - 1], radius(last)),
    ...right.reverse(),
    ...cap(first, right[right.length - 1], radius(first)),
  ];
}

/** Half a circle round a stroke's end, from one side to the other. */
function cap(
  center: ScSignaturePoint,
  from: [number, number],
  r: number,
): [number, number][] {
  const start = Math.atan2(from[1] - center[1], from[0] - center[0]);
  return arc(center[0], center[1], r, start, start - Math.PI, 6).slice(1, -1);
}

function arc(
  x: number,
  y: number,
  r: number,
  from: number,
  to: number,
  steps: number,
): [number, number][] {
  return Array.from({ length: steps }, (_, i) => {
    const angle = from + ((to - from) * i) / (steps - 1 || 1);
    return [x + Math.cos(angle) * r, y + Math.sin(angle) * r];
  });
}

/** A stroke as an SVG path: its outline, its corners rounded. */
export function strokePath(stroke: ScSignatureStroke): string {
  const shape = outline(stroke);
  if (!shape.length) return '';
  const round = (n: number) => Math.round(n * 100) / 100;
  const parts: (string | number)[] = [
    'M',
    round(shape[0][0]),
    round(shape[0][1]),
    'Q',
  ];
  shape.forEach(([x0, y0], i) => {
    const [x1, y1] = shape[(i + 1) % shape.length];
    parts.push(
      round(x0),
      round(y0),
      round((x0 + x1) / 2),
      round((y0 + y1) / 2),
    );
  });
  parts.push('Z');
  return parts.join(' ');
}

/** The ink's bounds, `padding` round them; none without ink. */
function bounds(
  signature: ScSignature,
  padding: number,
): { x: number; y: number; width: number; height: number } | null {
  const points = signature.strokes.flatMap(outline);
  if (!points.length) return null;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const x = Math.min(...xs) - padding;
  const y = Math.min(...ys) - padding;
  return {
    x,
    y,
    width: Math.max(...xs) + padding - x,
    height: Math.max(...ys) + padding - y,
  };
}

const escape = (text: string) =>
  text.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

/** The signature as an SVG document, trimmed to its ink ('' without ink). */
export function signatureToSvg(
  signature: ScSignature,
  { padding = 8 }: ScSignatureExportOptions = {},
): string {
  const box = bounds(signature, padding);
  if (!box) return '';
  const paths = signature.strokes
    .map(
      (stroke) =>
        `<path d="${strokePath(stroke)}" fill="${escape(inkColor(stroke.color))}"/>`,
    )
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(box.width)}" height="${Math.ceil(box.height)}" viewBox="${box.x} ${box.y} ${box.width} ${box.height}">${paths}</svg>`;
}

/** The signature as an image (PNG by default), trimmed to its ink. In the browser only. */
export async function signatureToBlob(
  signature: ScSignature,
  {
    type = 'image/png',
    quality,
    scale = 2,
    padding = 8,
  }: ScSignatureBlobOptions = {},
): Promise<Blob | null> {
  const box = bounds(signature, padding);
  if (!box) return null;
  const width = Math.ceil(box.width * scale);
  const height = Math.ceil(box.height * scale);
  const offscreen = typeof OffscreenCanvas !== 'undefined';
  const canvas = offscreen
    ? new OffscreenCanvas(width, height)
    : Object.assign(document.createElement('canvas'), { width, height });
  const context = canvas.getContext('2d') as
    CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
  if (!context) return null;
  if (type !== 'image/png') {
    // No transparency: on white.
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  }
  context.scale(scale, scale);
  context.translate(-box.x, -box.y);
  for (const stroke of signature.strokes) {
    context.fillStyle = inkColor(stroke.color);
    context.fill(new Path2D(strokePath(stroke)));
  }
  if (canvas instanceof HTMLCanvasElement) {
    return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  }
  return canvas.convertToBlob({ type, quality });
}

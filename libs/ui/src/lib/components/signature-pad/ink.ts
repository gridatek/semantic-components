/** A point of a stroke: where, and how hard (0–1). */
export type ScSignaturePoint = readonly [
  x: number,
  y: number,
  pressure: number,
];

export interface ScSignatureStroke {
  readonly points: readonly ScSignaturePoint[];
  readonly color: string;
  /** The pen's width, at an even pressure. */
  readonly width: number;
}

/** Drawn: its strokes, on a surface of `width` × `height`. */
export interface ScDrawnSignature {
  readonly width: number;
  readonly height: number;
  readonly strokes: readonly ScSignatureStroke[];
}

/** Typed: a name, in a font. */
export interface ScTypedSignature {
  readonly text: string;
  /** The input's `font-family`, when typed. */
  readonly font: string;
}

/** A signature: plain data, to store and give back. */
export type ScSignature = ScDrawnSignature | ScTypedSignature;

export const isTyped = (
  signature: ScSignature | null,
): signature is ScTypedSignature =>
  !!signature && 'text' in (signature as object);

/** The ink's colour when exported: `currentColor` is black on paper. */
const inkColor = (color: string) =>
  color === 'currentColor' ? '#000000' : color;

/** How far a point is from the last, from 0 (none) to 1 (as written). */
const STREAMLINE = 0.45;

/**
 * The next point of a stroke, from the pointer: smoothed, and — without a
 * pen's pressure — pressed lighter the faster it moves.
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

/** A stroke's outline: a closed shape around its points, wide as pressed. */
export function outline(stroke: ScSignatureStroke): [number, number][] {
  const points = stroke.points;
  const radius = (p: ScSignaturePoint) =>
    (stroke.width / 2) * (0.35 + 1.3 * p[2]);
  if (points.length === 1) {
    const [x, y] = points[0];
    return circle(x, y, radius(points[0]));
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

/** Half a circle around `center`, from `from` to the opposite side. */
function cap(
  center: ScSignaturePoint,
  from: [number, number],
  r: number,
): [number, number][] {
  const start = Math.atan2(from[1] - center[1], from[0] - center[0]);
  return Array.from({ length: 5 }, (_, i) => {
    const angle = start - ((i + 1) / 6) * Math.PI;
    return [
      center[0] + Math.cos(angle) * r,
      center[1] + Math.sin(angle) * r,
    ] as [number, number];
  });
}

function circle(x: number, y: number, r: number): [number, number][] {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    return [x + Math.cos(angle) * r, y + Math.sin(angle) * r];
  });
}

/** An outline as an SVG path, its corners rounded. */
export function pathData(shape: readonly [number, number][]): string {
  if (!shape.length) return '';
  const round = (n: number) => Math.round(n * 100) / 100;
  const parts = ['M', round(shape[0][0]), round(shape[0][1]), 'Q'];
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

/** The size typed signatures are exported at. */
const TEXT_SIZE = 64;

interface ScSignaturePadBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

function measureText(
  signature: ScTypedSignature,
  canvas: HTMLCanvasElement,
): ScSignaturePadBox {
  const context = canvas.getContext('2d');
  if (context) context.font = `${TEXT_SIZE}px ${signature.font}`;
  const width = context?.measureText(signature.text).width ?? 0;
  return { x: 0, y: 0, width, height: TEXT_SIZE * 1.3 };
}

/** The ink's bounds, with `padding` around. */
function bounds(
  signature: ScSignature,
  padding: number,
  canvas: HTMLCanvasElement,
): ScSignaturePadBox | null {
  if (isTyped(signature)) {
    const box = measureText(signature, canvas);
    return {
      x: -padding,
      y: -padding,
      width: box.width + padding * 2,
      height: box.height + padding * 2,
    };
  }
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

/**
 * The signature as an SVG document, trimmed to its ink (a typed one is
 * measured on `canvas`).
 */
export function toSvg(
  signature: ScSignature,
  canvas: HTMLCanvasElement,
  padding = 8,
): string {
  const box = bounds(signature, padding, canvas);
  if (!box) return '';
  const view = `${box.x} ${box.y} ${box.width} ${box.height}`;
  const body = isTyped(signature)
    ? `<text x="0" y="${TEXT_SIZE}" font-size="${TEXT_SIZE}" font-family="${escape(signature.font)}">${escape(signature.text)}</text>`
    : signature.strokes
        .map(
          (stroke) =>
            `<path d="${pathData(outline(stroke))}" fill="${escape(inkColor(stroke.color))}"/>`,
        )
        .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(box.width)}" height="${Math.ceil(box.height)}" viewBox="${view}">${body}</svg>`;
}

/** The signature as an image (PNG by default), drawn on `canvas`, trimmed to its ink. */
export function toBlob(
  signature: ScSignature,
  canvas: HTMLCanvasElement,
  type = 'image/png',
  { scale = 2, padding = 8 } = {},
): Promise<Blob | null> {
  const box = bounds(signature, padding, canvas);
  if (!box) return Promise.resolve(null);
  canvas.width = Math.ceil(box.width * scale);
  canvas.height = Math.ceil(box.height * scale);
  const context = canvas.getContext('2d');
  if (!context) return Promise.resolve(null);
  if (type !== 'image/png') {
    // No transparency: on white.
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.scale(scale, scale);
  context.translate(-box.x, -box.y);
  if (isTyped(signature)) {
    context.font = `${TEXT_SIZE}px ${signature.font}`;
    context.fillStyle = '#000000';
    context.fillText(signature.text, 0, TEXT_SIZE);
  } else {
    for (const stroke of signature.strokes) {
      context.fillStyle = inkColor(stroke.color);
      context.fill(new Path2D(pathData(outline(stroke))));
    }
  }
  return new Promise((resolve) => canvas.toBlob(resolve, type));
}

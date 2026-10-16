import type {
  ScImageAnnotatorNextAnnotation as Annotation,
  ScImageAnnotatorNextBounds as Bounds,
  ScImageAnnotatorNextPoint as Point,
} from './image-annotator-next-types';

/** A text's font size, from its width. */
export const fontSize = (annotation: Annotation) =>
  Math.max(12, annotation.width * 5);

/** A highlighter is wide and see-through. */
export const HIGHLIGHTER_WIDTH = 4;
export const HIGHLIGHTER_OPACITY = 0.35;

/** The box around an annotation. */
export function bounds(annotation: Annotation): Bounds {
  if (annotation.kind === 'text') {
    const size = fontSize(annotation);
    const [at] = annotation.points;
    return {
      x: at.x,
      y: at.y,
      // An estimate: the text's own width isn't known without a layout.
      width: Math.max(size, (annotation.text?.length ?? 0) * size * 0.6),
      height: size * 1.25,
    };
  }
  const xs = annotation.points.map((p) => p.x);
  const ys = annotation.points.map((p) => p.y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return {
    x,
    y,
    width: Math.max(...xs) - x,
    height: Math.max(...ys) - y,
  };
}

/** The annotation moved by `dx`, `dy`. */
export function translate(
  annotation: Annotation,
  dx: number,
  dy: number,
): Annotation {
  return {
    ...annotation,
    points: annotation.points.map((p) => ({ x: p.x + dx, y: p.y + dy })),
  };
}

/** The annotation stretched from its bounds to `to`. */
export function fit(annotation: Annotation, to: Bounds): Annotation {
  const from = bounds(annotation);
  const sx = from.width ? to.width / from.width : 1;
  const sy = from.height ? to.height / from.height : 1;
  return {
    ...annotation,
    points: annotation.points.map((p) => ({
      x: to.x + (p.x - from.x) * sx,
      y: to.y + (p.y - from.y) * sy,
    })),
  };
}

/** A box from two corners, in any order. */
export function boxOf(a: Point, b: Point): Bounds {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(b.x - a.x),
    height: Math.abs(b.y - a.y),
  };
}

/** A smooth path through a stroke's points (curves through their middles). */
export function smoothPath(points: readonly Point[]): string {
  if (!points.length) return '';
  if (points.length < 3) {
    return points
      .map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
  }
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const mid = {
      x: (points[i].x + points[i + 1].x) / 2,
      y: (points[i].y + points[i + 1].y) / 2,
    };
    d += ` Q${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)} ${mid.x.toFixed(1)} ${mid.y.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  return `${d} L${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
}

/** A stroke's next point, if far enough from the last to be worth it. */
export function addPoint(points: readonly Point[], point: Point): Point[] {
  const last = points[points.length - 1];
  if (last && Math.hypot(point.x - last.x, point.y - last.y) < 2) {
    return [...points];
  }
  return [...points, point];
}

/** An arrow's head: three points at its end, sized by its width. */
export function arrowHead(annotation: Annotation): Point[] {
  const [from, to] = annotation.points;
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const length = Math.max(10, annotation.width * 4);
  const spread = Math.PI / 7;
  return [
    to,
    {
      x: to.x - length * Math.cos(angle - spread),
      y: to.y - length * Math.sin(angle - spread),
    },
    {
      x: to.x - length * Math.cos(angle + spread),
      y: to.y - length * Math.sin(angle + spread),
    },
  ];
}

/** Draws an annotation on a canvas (for `toBlob()`), as the SVG shows it. */
export function draw(
  context: CanvasRenderingContext2D,
  annotation: Annotation,
): void {
  context.save();
  context.strokeStyle = annotation.color;
  context.fillStyle = annotation.color;
  context.lineWidth = annotation.width;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  const [a, b] = annotation.points;
  switch (annotation.kind) {
    case 'highlighter':
      context.globalAlpha = HIGHLIGHTER_OPACITY;
      context.lineWidth = annotation.width * HIGHLIGHTER_WIDTH;
      context.lineCap = 'butt';
      context.stroke(new Path2D(smoothPath(annotation.points)));
      break;
    case 'pen':
      context.stroke(new Path2D(smoothPath(annotation.points)));
      break;
    case 'line':
    case 'arrow':
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
      if (annotation.kind === 'arrow') {
        const [tip, left, right] = arrowHead(annotation);
        context.beginPath();
        context.moveTo(tip.x, tip.y);
        context.lineTo(left.x, left.y);
        context.lineTo(right.x, right.y);
        context.closePath();
        context.fill();
      }
      break;
    case 'rectangle': {
      const box = boxOf(a, b);
      context.strokeRect(box.x, box.y, box.width, box.height);
      break;
    }
    case 'ellipse': {
      const box = boxOf(a, b);
      context.beginPath();
      context.ellipse(
        box.x + box.width / 2,
        box.y + box.height / 2,
        box.width / 2,
        box.height / 2,
        0,
        0,
        Math.PI * 2,
      );
      context.stroke();
      break;
    }
    case 'text':
      context.font = `600 ${fontSize(annotation)}px system-ui, sans-serif`;
      context.textBaseline = 'top';
      context.fillText(annotation.text ?? '', a.x, a.y);
      break;
  }
  context.restore();
}

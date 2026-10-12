import type { PDFDocumentProxy, PageViewport } from 'pdfjs-dist';
import { AnnotationEditorType } from 'pdfjs-dist';
import type { ScPdfComment, ScPdfEditorAnnotation } from './pdf-viewer-types';

/**
 * pdf.js writes values stored under this prefix in the annotation storage as
 * new annotations when it saves (or extracts pages from) a document.
 */
const EDITOR_PREFIX = 'pdfjs_internal_editor_';

/** Size of a comment's note icon, in PDF points. */
const NOTE_SIZE = 20;

type Rgb = [number, number, number];

function rgb(hex: string | undefined, fallback: Rgb): Rgb {
  const match = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex ?? '');
  return match
    ? [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)]
    : fallback;
}

/** The bounding box of points (`[x0, y0, x1, y1, …]`), grown by `margin`. */
function bounds(points: number[], margin = 0): number[] {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < points.length; i += 2) {
    minX = Math.min(minX, points[i]);
    maxX = Math.max(maxX, points[i]);
    minY = Math.min(minY, points[i + 1]);
    maxY = Math.max(maxY, points[i + 1]);
  }
  return [minX - margin, minY - margin, maxX + margin, maxY + margin];
}

/** A data URL (an image annotation) as a bitmap pdf.js can embed. */
async function bitmapOf(dataUrl: string): Promise<ImageBitmap> {
  return createImageBitmap(await (await fetch(dataUrl)).blob());
}

/** A sticky-note icon for a comment, drawn at 4× for print. */
function noteBitmap(color: string): Promise<ImageBitmap> {
  const size = NOTE_SIZE * 4;
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
  ctx.fillStyle = color;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(4, 4, size - 8, size - 20, 10);
  ctx.moveTo(18, size - 16);
  ctx.lineTo(18, size - 4);
  ctx.lineTo(34, size - 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  for (const y of [22, 36, 50]) ctx.fillRect(18, y, size - 36, 5);
  return createImageBitmap(canvas);
}

/** Text width in PDF points, measured in Helvetica (what pdf.js writes). */
function textWidth(lines: string[], fontSize: number): number {
  const ctx = new OffscreenCanvas(1, 1).getContext(
    '2d',
  ) as OffscreenCanvasRenderingContext2D;
  ctx.font = `${fontSize}px Helvetica, Arial, sans-serif`;
  return Math.max(...lines.map((line) => ctx.measureText(line).width), 1);
}

/**
 * The viewer's annotations and comments as pdf.js annotation-storage values,
 * so `saveDocument()` / `extractPages()` write them into the PDF:
 * highlights → Highlight, text → FreeText, drawings → Ink, images and
 * signatures → Stamp, comments → a note-icon Stamp with a popup holding the
 * comment (author and text).
 *
 * The viewer stores positions as fractions of the page as displayed at
 * scale 1 (with the page's own /Rotate); the viewport converts them back.
 */
export async function annotationStorageValues(
  doc: PDFDocumentProxy,
  annotations: ScPdfEditorAnnotation[],
  comments: ScPdfComment[],
): Promise<Map<string, object>> {
  const values = new Map<string, object>();
  const viewports = new Map<number, PageViewport>();
  const pageRotations = new Map<number, number>();
  const viewportOf = async (pageNumber: number) => {
    let viewport = viewports.get(pageNumber);
    if (!viewport) {
      const page = await doc.getPage(pageNumber);
      viewport = page.getViewport({ scale: 1 });
      viewports.set(pageNumber, viewport);
      pageRotations.set(pageNumber, page.rotate);
    }
    return viewport;
  };
  // A fraction of the displayed page → PDF user space.
  const toPdf = (viewport: PageViewport, x: number, y: number): number[] =>
    viewport.convertToPdfPoint(x * viewport.width, y * viewport.height);

  let index = 0;
  const add = (value: object) =>
    values.set(`${EDITOR_PREFIX}sc_${index++}`, value);

  for (const ann of annotations) {
    if (ann.pageNumber > doc.numPages) continue;
    const viewport = await viewportOf(ann.pageNumber);
    const base = {
      pageIndex: ann.pageNumber - 1,
      rotation: pageRotations.get(ann.pageNumber) ?? 0,
    };

    switch (ann.type) {
      case 'highlight': {
        const quadPoints: number[] = [];
        const outlines: number[][] = [];
        for (const r of ann.rects ?? []) {
          // Corners: top-left, top-right, bottom-left, bottom-right.
          const corners = [
            toPdf(viewport, r.x, r.y),
            toPdf(viewport, r.x + r.width, r.y),
            toPdf(viewport, r.x, r.y + r.height),
            toPdf(viewport, r.x + r.width, r.y + r.height),
          ];
          quadPoints.push(...corners.flat());
          const [tl, tr, bl, br] = corners;
          outlines.push([...tl, ...tr, ...br, ...bl]);
        }
        if (!quadPoints.length) break;
        add({
          ...base,
          annotationType: AnnotationEditorType.HIGHLIGHT,
          color: rgb(ann.color, [255, 255, 0]),
          opacity: ann.opacity ?? 0.4,
          thickness: 0,
          quadPoints,
          outlines,
          rect: bounds(quadPoints),
        });
        break;
      }
      case 'freetext': {
        const value = ann.text ?? '';
        if (!value.trim()) break;
        const fontSize = ann.fontSize ?? 14;
        const lines = value.split('\n');
        // The width / height on the page, in fractions.
        const w = (textWidth(lines, fontSize) + 8) / viewport.width;
        const h = (lines.length * fontSize * 1.2 + 4) / viewport.height;
        const x = ann.x ?? 0;
        const y = ann.y ?? 0;
        add({
          ...base,
          annotationType: AnnotationEditorType.FREETEXT,
          color: rgb(ann.fontColor, [0, 0, 0]),
          fontSize,
          value,
          rect: bounds([
            ...toPdf(viewport, x, y),
            ...toPdf(viewport, x + w, y + h),
          ]),
        });
        break;
      }
      case 'ink': {
        const thickness = ann.strokeWidth ?? 1;
        const points = (ann.strokes ?? [])
          .filter((stroke) => stroke.length > 1)
          .map((stroke) => stroke.flatMap((p) => toPdf(viewport, p.x, p.y)));
        if (!points.length) break;
        // pdf.js's path format: each point after `[NaN × 4]` is a line to it.
        const lines = points.map((flat) => {
          const line: number[] = [];
          for (let i = 0; i < flat.length; i += 2) {
            line.push(NaN, NaN, NaN, NaN, flat[i], flat[i + 1]);
          }
          return line;
        });
        add({
          ...base,
          annotationType: AnnotationEditorType.INK,
          color: rgb(ann.color, [0, 0, 0]),
          opacity: ann.opacity ?? 1,
          thickness,
          paths: { lines, points },
          rect: bounds(points.flat(), thickness / 2),
        });
        break;
      }
      case 'stamp':
      case 'signature': {
        if (!ann.imageDataUrl) break;
        const x = ann.x ?? 0;
        const y = ann.y ?? 0;
        add({
          ...base,
          annotationType: AnnotationEditorType.STAMP,
          bitmap: await bitmapOf(ann.imageDataUrl),
          bitmapId: `sc_bitmap_${index}`,
          rect: bounds([
            ...toPdf(viewport, x, y),
            ...toPdf(
              viewport,
              x + (ann.width ?? 0.15),
              y + (ann.height ?? 0.15),
            ),
          ]),
        });
        break;
      }
    }
  }

  for (const comment of comments) {
    if (comment.pageNumber > doc.numPages || !comment.text.trim()) continue;
    const viewport = await viewportOf(comment.pageNumber);
    const [cx, cy] = toPdf(viewport, comment.x, comment.y);
    const half = NOTE_SIZE / 2;
    add({
      pageIndex: comment.pageNumber - 1,
      rotation: 0,
      annotationType: AnnotationEditorType.STAMP,
      bitmap: await noteBitmap(comment.color || '#facc15'),
      bitmapId: `sc_bitmap_${index}`,
      rect: [cx - half, cy - half, cx + half, cy + half],
      // No `date`: the comment's is a display string; pdf.js uses now.
      user: comment.author,
      popup: {
        contents: comment.text,
        rect: [cx + half, cy - 4 * NOTE_SIZE, cx + 10 * NOTE_SIZE, cy + half],
      },
    });
  }
  return values;
}

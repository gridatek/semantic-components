import { Service, type Signal, computed, signal } from '@angular/core';
import { Subject } from 'rxjs';
import {
  type Annotation,
  type AnnotationPoint,
  type AnnotationTool,
  type AnnotatorColor,
  type AnnotatorToolOption,
  DEFAULT_ANNOTATOR_COLORS,
  DEFAULT_ANNOTATOR_TOOLS,
} from './image-annotator-types';

/**
 * Shared state of one image annotator: the annotations (with undo/redo
 * history), the current tool settings, and the events the parts exchange.
 * Provided by `ScImageAnnotator`.
 */
@Service({ autoProvided: false })
export class ScImageAnnotatorState {
  /** Bound by `ScImageAnnotator` to its inputs. */
  src: Signal<string> = signal('');
  width: Signal<number> = signal(600);
  height: Signal<number> = signal(400);
  alt: Signal<string> = signal('');
  colors: Signal<readonly AnnotatorColor[]> = signal(DEFAULT_ANNOTATOR_COLORS);
  tools: Signal<readonly AnnotatorToolOption[]> = signal(
    DEFAULT_ANNOTATOR_TOOLS,
  );

  readonly annotations = signal<Annotation[]>([]);
  readonly currentTool = signal<AnnotationTool>('pen');
  readonly currentColor = signal(DEFAULT_ANNOTATOR_COLORS[0].value);
  readonly lineWidth = signal(3);
  readonly imageLoaded = signal(false);

  private readonly past = signal<Annotation[][]>([]);
  private readonly future = signal<Annotation[][]>([]);
  readonly canUndo = computed(() => this.past().length > 0);
  readonly canRedo = computed(() => this.future().length > 0);

  /** Emits the annotations after every user change (draw, erase, undo…). */
  readonly changes = new Subject<Annotation[]>();
  /** Asks the canvas to export and download the annotated image. */
  readonly downloadRequests = new Subject<void>();
  /** Emits the exported PNG data URL. */
  readonly saved = new Subject<string>();

  readonly cursor = computed(() =>
    this.currentTool() === 'eraser' ? 'cell' : 'crosshair',
  );

  /** Snapshot taken when an erase gesture starts (one undo step per gesture). */
  private eraseSnapshot: Annotation[] | null = null;

  selectTool(tool: AnnotationTool): void {
    this.currentTool.set(tool);
  }

  selectColor(color: string): void {
    this.currentColor.set(color);
  }

  setLineWidth(width: number): void {
    this.lineWidth.set(width);
  }

  addAnnotation(annotation: Annotation): void {
    this.commit([...this.annotations(), annotation]);
  }

  beginErase(): void {
    this.eraseSnapshot = this.annotations();
  }

  /** Removes annotations within reach of `point` (image coordinates). */
  eraseAt(point: AnnotationPoint): void {
    const radius = Math.max(this.lineWidth() * 2, 8);
    this.annotations.update((anns) =>
      anns.filter((ann) => distanceTo(ann, point) > radius + ann.lineWidth / 2),
    );
  }

  endErase(): void {
    const before = this.eraseSnapshot;
    this.eraseSnapshot = null;
    if (!before || before.length === this.annotations().length) return;
    this.past.update((p) => [...p, before]);
    this.future.set([]);
    this.changes.next(this.annotations());
  }

  undo(): void {
    const past = this.past();
    if (!past.length) return;
    this.future.update((f) => [...f, this.annotations()]);
    this.past.set(past.slice(0, -1));
    this.annotations.set(past[past.length - 1]);
    this.changes.next(this.annotations());
  }

  redo(): void {
    const future = this.future();
    if (!future.length) return;
    this.past.update((p) => [...p, this.annotations()]);
    this.future.set(future.slice(0, -1));
    this.annotations.set(future[future.length - 1]);
    this.changes.next(this.annotations());
  }

  clearAll(): void {
    if (this.annotations().length) this.commit([]);
  }

  download(): void {
    this.downloadRequests.next();
  }

  getAnnotations(): Annotation[] {
    return this.annotations();
  }

  /** Replaces the annotations from outside; resets the history, emits nothing. */
  setAnnotations(annotations: Annotation[]): void {
    this.annotations.set(annotations);
    this.past.set([]);
    this.future.set([]);
  }

  private commit(next: Annotation[]): void {
    this.past.update((p) => [...p, this.annotations()]);
    this.future.set([]);
    this.annotations.set(next);
    this.changes.next(next);
  }
}

/** Shortest distance from `p` to the stroke of an annotation. */
function distanceTo(ann: Annotation, p: AnnotationPoint): number {
  const [a, b] = ann.points;
  switch (ann.tool) {
    case 'pen':
      if (ann.points.length === 1) return dist(p, a);
      return Math.min(
        ...ann.points.slice(1).map((q, i) => segment(p, ann.points[i], q)),
      );
    case 'line':
    case 'arrow':
      return b ? segment(p, a, b) : dist(p, a);
    case 'rectangle': {
      if (!b) return dist(p, a);
      const c = { x: b.x, y: a.y };
      const d = { x: a.x, y: b.y };
      return Math.min(
        segment(p, a, c),
        segment(p, c, b),
        segment(p, b, d),
        segment(p, d, a),
      );
    }
    case 'circle':
      return b ? Math.abs(dist(p, a) - dist(a, b)) : dist(p, a);
  }
}

function dist(p: AnnotationPoint, q: AnnotationPoint): number {
  return Math.hypot(p.x - q.x, p.y - q.y);
}

function segment(
  p: AnnotationPoint,
  a: AnnotationPoint,
  b: AnnotationPoint,
): number {
  const len = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  if (!len) return dist(p, a);
  const t = Math.max(
    0,
    Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / len),
  );
  return dist(p, { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
}

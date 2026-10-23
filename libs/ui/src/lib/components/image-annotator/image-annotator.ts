import { DOCUMENT } from '@angular/common';
import {
  Directive,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { bounds, draw, fit, translate } from './image-annotator-geometry';
import type {
  ScImageAnnotatorAnnotation as Annotation,
  ScImageAnnotatorBlobOptions,
  ScImageAnnotatorBounds,
  ScImageAnnotatorKind,
  ScImageAnnotatorToolName,
} from './image-annotator-types';

/** How many changes can be undone. */
const HISTORY = 100;

/**
 * An image annotator: its annotations — plain data, in the image's pixels —
 * the tool, colour and width, what is selected, and undo. Put its parts
 * inside: a `scImageAnnotatorStage` with your `img`, and the buttons.
 */
@Directive({
  selector: '[scImageAnnotator]',
  exportAs: 'scImageAnnotator',
  host: {
    'data-slot': 'image-annotator',
    '[attr.data-tool]': 'tool()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScImageAnnotator {
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly annotations = model<readonly Annotation[]>([]);
  readonly tool = model<ScImageAnnotatorToolName>('select');
  /** The colour drawn with — and of the selected annotation. */
  readonly color = model('#e11d48');
  /** The width drawn with — and of the selected annotation. */
  readonly width = model(4);
  /** The selected annotation's id. */
  readonly selected = model<string | null>(null);
  /** Shown, not edited. */
  readonly readonly = input(false);
  /** An annotation's name, yours to write ("Arrow", "Text: Fix this"…). */
  readonly label = input<(annotation: Annotation) => string>();

  /** The image: set by `img[scImageAnnotatorImage]`. */
  readonly ɵimage = signal<HTMLImageElement | null>(null);
  readonly ɵnatural = signal({ width: 0, height: 0 });
  /** Screen pixels per image pixel: set by the stage. */
  readonly ɵscale = signal(1);
  /** The text being written, if any. */
  readonly editing = signal<string | null>(null);

  readonly ready = computed(() => this.ɵnatural().width > 0);
  readonly selectedAnnotation = computed(
    () => this.annotations().find((a) => a.id === this.selected()) ?? null,
  );

  private readonly past = signal<readonly (readonly Annotation[])[]>([]);
  private readonly future = signal<readonly (readonly Annotation[])[]>([]);
  readonly canUndo = computed(() => this.past().length > 0);
  readonly canRedo = computed(() => this.future().length > 0);

  /** What a gesture started from: its changes are one undo step. */
  private before: readonly Annotation[] | null = null;

  protected readonly class = computed(() =>
    cn('flex flex-col gap-3', this.classInput()),
  );

  constructor() {
    // Selecting shows the annotation's colour and width; changing them
    // restyles it.
    effect(() => {
      const annotation = this.selectedAnnotation();
      untracked(() => {
        if (!annotation) return;
        this.color.set(annotation.color);
        this.width.set(annotation.width);
      });
    });
    effect(() => {
      const color = this.color();
      const width = this.width();
      untracked(() => {
        const annotation = this.selectedAnnotation();
        if (
          annotation &&
          (annotation.color !== color || annotation.width !== width)
        ) {
          this.change(annotation.id, (a) => ({ ...a, color, width }));
        }
      });
    });
  }

  /** A new annotation of `kind`, in the current colour and width, not yet added. */
  create(
    kind: ScImageAnnotatorKind,
    points: Annotation['points'],
    text?: string,
  ): Annotation {
    return {
      id: crypto.randomUUID(),
      kind,
      points,
      color: this.color(),
      width: this.width(),
      ...(kind === 'text' ? { text: text ?? '' } : {}),
    };
  }

  add(annotation: Annotation): void {
    this.apply([...this.annotations(), annotation]);
  }

  /** Changes an annotation: one undo step (or part of the gesture under way). */
  change(id: string, update: (annotation: Annotation) => Annotation): void {
    this.apply(this.annotations().map((a) => (a.id === id ? update(a) : a)));
  }

  remove(id: string): void {
    if (this.selected() === id) this.selected.set(null);
    this.apply(this.annotations().filter((a) => a.id !== id));
  }

  removeSelected(): void {
    const id = this.selected();
    if (id) this.remove(id);
  }

  clear(): void {
    this.selected.set(null);
    this.commit([]);
  }

  undo(): void {
    const past = this.past();
    if (!past.length) return;
    this.future.update((f) => [this.annotations(), ...f]);
    this.past.set(past.slice(0, -1));
    this.restore(past[past.length - 1]);
  }

  redo(): void {
    const [next, ...rest] = this.future();
    if (!next) return;
    this.past.update((p) => [...p, this.annotations()]);
    this.future.set(rest);
    this.restore(next);
  }

  /** A gesture starts: what it changes is one undo step. */
  ɵbegin(): void {
    // Already under way (a new text, then its writing): one step.
    this.before ??= this.annotations();
  }

  /** A gesture ends. */
  ɵend(): void {
    const before = this.before;
    this.before = null;
    const now = this.annotations();
    const same =
      before?.length === now.length && before.every((a, i) => a === now[i]);
    if (before && !same) this.record(before);
  }

  /** Moves the selected annotation by `dx`, `dy` image pixels. */
  moveSelected(dx: number, dy: number): void {
    const id = this.selected();
    if (id) this.change(id, (a) => translate(a, dx, dy));
  }

  /** Resizes the selected annotation's box by `dx`, `dy` image pixels. */
  resizeSelected(dx: number, dy: number): void {
    const annotation = this.selectedAnnotation();
    if (!annotation || annotation.kind === 'text') return;
    const box = bounds(annotation);
    this.change(annotation.id, (a) =>
      fit(a, {
        ...box,
        width: Math.max(4, box.width + dx),
        height: Math.max(4, box.height + dy),
      }),
    );
  }

  /** Places a shape of the current tool in the middle (from the keyboard), selected. */
  placeShape(): Annotation | null {
    const tool = this.tool();
    const { width, height } = this.ɵnatural();
    if (!this.ready() || this.readonly()) return null;
    const cx = width / 2;
    const cy = height / 2;
    const size = Math.min(width, height) / 5;
    const points: Record<string, Annotation['points']> = {
      line: [
        { x: cx - size, y: cy },
        { x: cx + size, y: cy },
      ],
      arrow: [
        { x: cx - size, y: cy + size / 2 },
        { x: cx + size, y: cy - size / 2 },
      ],
      rectangle: [
        { x: cx - size, y: cy - size / 2 },
        { x: cx + size, y: cy + size / 2 },
      ],
      ellipse: [
        { x: cx - size, y: cy - size / 2 },
        { x: cx + size, y: cy + size / 2 },
      ],
      text: [{ x: cx - size, y: cy }],
    };
    if (!points[tool]) return null;
    const annotation = this.create(tool as ScImageAnnotatorKind, points[tool]);
    // A text: added and written, one step (its field ends it).
    if (tool === 'text') this.ɵbegin();
    this.add(annotation);
    this.selected.set(annotation.id);
    if (tool === 'text') this.editing.set(annotation.id);
    return annotation;
  }

  /** The box around an annotation. */
  boundsOf(annotation: Annotation): ScImageAnnotatorBounds {
    return bounds(annotation);
  }

  /** The image with its annotations, as a file (`Blob`), at the image's size. */
  toBlob(options: ScImageAnnotatorBlobOptions = {}): Promise<Blob> {
    const image = this.ɵimage();
    const { width, height } = this.ɵnatural();
    if (!image || !width) {
      return Promise.reject(new Error('ScImageAnnotator: no image yet.'));
    }
    const canvas = this.document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) {
      return Promise.reject(new Error('ScImageAnnotator: no 2D canvas.'));
    }
    context.drawImage(image, 0, 0, width, height);
    for (const annotation of this.annotations()) draw(context, annotation);
    return new Promise((resolve, reject) =>
      canvas.toBlob(
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error('ScImageAnnotator: the export failed.')),
        options.type ?? 'image/png',
        options.quality,
      ),
    );
  }

  /** Ctrl+Z, Ctrl+Shift+Z / Ctrl+Y — anywhere in the annotator but a text field. */
  protected onKeydown(event: KeyboardEvent): void {
    if (this.readonly() || !(event.ctrlKey || event.metaKey)) return;
    if ((event.target as Element).closest('input, textarea')) return;
    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) {
      event.preventDefault();
      this.undo();
    } else if ((key === 'z' && event.shiftKey) || key === 'y') {
      event.preventDefault();
      this.redo();
    }
  }

  /** A change: one undo step, or part of the gesture under way. */
  private apply(next: readonly Annotation[]): void {
    if (this.before) this.annotations.set(next);
    else this.commit(next);
  }

  private commit(next: readonly Annotation[]): void {
    this.record(this.annotations());
    this.annotations.set(next);
  }

  private record(previous: readonly Annotation[]): void {
    this.past.update((p) => [...p, previous].slice(-HISTORY));
    this.future.set([]);
  }

  private restore(annotations: readonly Annotation[]): void {
    this.annotations.set(annotations);
    if (!annotations.some((a) => a.id === this.selected())) {
      this.selected.set(null);
    }
  }
}

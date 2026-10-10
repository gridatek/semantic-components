import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';
import type { Annotation, AnnotationPoint } from './image-annotator-types';

/**
 * The drawing surface: the image plus an annotation layer.
 *
 * - Scales to its container width, keeping the annotator's `width`/`height`
 *   ratio. Annotations are stored in image coordinates, so they survive
 *   resizing, and both layers render at the device pixel ratio (sharp on
 *   high-DPI screens).
 * - Pointer events: mouse, touch and pen. `touch-action: none` stops the page
 *   from scrolling while drawing.
 * - `role="img"` named by the annotator's `alt`. Freehand drawing is
 *   path-dependent input, so it has no keyboard equivalent (WCAG 2.1.1
 *   exception); every other control is in the keyboard-operable toolbar.
 */
@Component({
  selector: 'div[scImageAnnotatorCanvas]',
  template: `
    <canvas #imageCanvas class="absolute inset-0 size-full"></canvas>
    <canvas
      #annotationCanvas
      class="absolute inset-0 size-full touch-none"
      (pointerdown)="onPointerDown($event)"
      (pointermove)="onPointerMove($event)"
      (pointerup)="onPointerUp($event)"
      (pointercancel)="onPointerUp($event)"
    ></canvas>
    @if (!state.imageLoaded()) {
      <div
        class="bg-muted text-muted-foreground absolute inset-0 flex items-center justify-center text-sm"
      >
        Loading image…
      </div>
    }
  `,
  host: {
    'data-slot': 'image-annotator-canvas',
    role: 'img',
    '[attr.aria-label]': 'state.alt()',
    '[attr.data-state]': 'state.imageLoaded() ? "ready" : "loading"',
    '[style.aspect-ratio]': 'aspectRatio()',
    '[style.cursor]': 'state.cursor()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScImageAnnotatorCanvas {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScImageAnnotatorState);
  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly imageCanvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('imageCanvas');
  private readonly annotationCanvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('annotationCanvas');

  /** Displayed size in CSS pixels, kept up to date by a ResizeObserver. */
  private readonly displayWidth = signal(0);
  private readonly image = signal<HTMLImageElement | null>(null);
  /** The annotation being drawn, not yet committed. */
  private readonly draft = signal<Annotation | null>(null);

  private activePointer: number | null = null;
  private startPoint: AnnotationPoint | null = null;

  protected readonly aspectRatio = computed(
    () => `${this.state.width()} / ${this.state.height()}`,
  );

  protected readonly class = computed(() =>
    cn('relative block w-full overflow-hidden', this.classInput()),
  );

  constructor() {
    const observer = new ResizeObserver(([entry]) =>
      this.displayWidth.set(entry.contentRect.width),
    );
    observer.observe(this.host.nativeElement);
    inject(DestroyRef).onDestroy(() => observer.disconnect());

    // (Re)load the image whenever the source changes.
    effect((onCleanup) => {
      const src = this.state.src();
      this.state.imageLoaded.set(false);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.image.set(img);
        this.state.imageLoaded.set(true);
      };
      img.onerror = () => {
        this.image.set(null);
        this.state.imageLoaded.set(true);
      };
      img.src = src;
      onCleanup(() => {
        img.onload = null;
        img.onerror = null;
      });
    });

    // Image layer: on load, resize and size changes.
    effect(() => {
      const ctx = this.prepare(this.imageCanvas().nativeElement);
      if (!ctx) return;
      this.drawImage(ctx, this.image());
    });

    // Annotation layer: on every change, including the draft while drawing.
    effect(() => {
      const ctx = this.prepare(this.annotationCanvas().nativeElement);
      if (!ctx) return;
      for (const ann of this.state.annotations()) drawAnnotation(ctx, ann);
      const draft = this.draft();
      if (draft) drawAnnotation(ctx, draft);
    });

    this.state.downloadRequests
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.download());
  }

  /**
   * Sizes a canvas to its displayed size at the device pixel ratio, clears it,
   * and scales the context so drawing uses image coordinates.
   */
  private prepare(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
    const cssWidth = this.displayWidth();
    const width = this.state.width();
    const height = this.state.height();
    if (!cssWidth) return null;
    const ratio = this.document.defaultView?.devicePixelRatio ?? 1;
    const scale = (cssWidth * ratio) / width;
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, width, height);
    return ctx;
  }

  private drawImage(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement | null,
  ): void {
    const width = this.state.width();
    const height = this.state.height();
    if (img) {
      ctx.drawImage(img, 0, 0, width, height);
      return;
    }
    if (!this.state.imageLoaded()) return;
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Failed to load image', width / 2, height / 2);
  }

  /** Pointer position in image coordinates. */
  private toImagePoint(event: PointerEvent): AnnotationPoint {
    const rect = this.annotationCanvas().nativeElement.getBoundingClientRect();
    const sx = this.state.width() / rect.width;
    const sy = this.state.height() / rect.height;
    return {
      x: (event.clientX - rect.left) * sx,
      y: (event.clientY - rect.top) * sy,
    };
  }

  protected onPointerDown(event: PointerEvent): void {
    if (this.activePointer !== null || event.button !== 0) return;
    event.preventDefault();
    this.activePointer = event.pointerId;
    this.annotationCanvas().nativeElement.setPointerCapture(event.pointerId);

    const point = this.toImagePoint(event);
    this.startPoint = point;
    const tool = this.state.currentTool();
    if (tool === 'eraser') {
      this.state.beginErase();
      this.state.eraseAt(point);
      return;
    }
    this.draft.set({
      id: crypto.randomUUID(),
      tool,
      points: [point],
      color: this.state.currentColor(),
      lineWidth: this.state.lineWidth(),
    });
  }

  protected onPointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.activePointer) return;
    const point = this.toImagePoint(event);
    if (this.state.currentTool() === 'eraser') {
      this.state.eraseAt(point);
      return;
    }
    const draft = this.draft();
    if (!draft || !this.startPoint) return;
    this.draft.set({
      ...draft,
      points:
        draft.tool === 'pen'
          ? [...draft.points, point]
          : [this.startPoint, point],
    });
  }

  protected onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.activePointer) return;
    this.activePointer = null;
    this.startPoint = null;

    if (this.state.currentTool() === 'eraser') {
      this.state.endErase();
      return;
    }
    const draft = this.draft();
    this.draft.set(null);
    // A click (no movement) only makes sense for the pen: it draws a dot.
    if (draft && (draft.tool === 'pen' || draft.points.length > 1)) {
      this.state.addAnnotation(draft);
    }
  }

  /** Exports image + annotations at full image resolution and downloads it. */
  private download(): void {
    const width = this.state.width();
    const height = this.state.height();
    const canvas = this.document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.drawImage(ctx, this.image());
    for (const ann of this.state.annotations()) drawAnnotation(ctx, ann);

    let dataUrl: string;
    try {
      dataUrl = canvas.toDataURL('image/png');
    } catch {
      // The image was served without CORS headers: the canvas is tainted.
      return;
    }
    this.state.saved.next(dataUrl);

    const link = this.document.createElement('a');
    link.download = 'annotated-image.png';
    link.href = dataUrl;
    link.click();
  }
}

function drawAnnotation(ctx: CanvasRenderingContext2D, ann: Annotation): void {
  const [a, b] = ann.points;
  ctx.strokeStyle = ann.color;
  ctx.fillStyle = ann.color;
  ctx.lineWidth = ann.lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (ann.points.length === 1) {
    // A single click with the pen: a dot as wide as the stroke.
    ctx.beginPath();
    ctx.arc(a.x, a.y, ann.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.beginPath();
  switch (ann.tool) {
    case 'pen':
      ctx.moveTo(a.x, a.y);
      for (const p of ann.points.slice(1)) ctx.lineTo(p.x, p.y);
      break;
    case 'line':
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      break;
    case 'rectangle':
      ctx.rect(a.x, a.y, b.x - a.x, b.y - a.y);
      break;
    case 'circle':
      ctx.arc(a.x, a.y, Math.hypot(b.x - a.x, b.y - a.y), 0, Math.PI * 2);
      break;
    case 'arrow': {
      const head = Math.max(12, ann.lineWidth * 4);
      const angle = Math.atan2(b.y - a.y, b.x - a.x);
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(
        b.x - head * Math.cos(angle - Math.PI / 6),
        b.y - head * Math.sin(angle - Math.PI / 6),
      );
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(
        b.x - head * Math.cos(angle + Math.PI / 6),
        b.y - head * Math.sin(angle + Math.PI / 6),
      );
      break;
    }
  }
  ctx.stroke();
}

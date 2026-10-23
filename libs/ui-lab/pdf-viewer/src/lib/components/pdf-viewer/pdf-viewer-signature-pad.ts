import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_PDF_SIGNATURE_INK,
  type ScPdfSignatureStroke,
  ScPdfViewerSignatureForm,
} from './pdf-viewer-signature-form';

/**
 * Where a signature is drawn, in a `scPdfViewerSignatureForm`: black ink on
 * white, strokes as thick as `form.thickness()`. Recreated (e.g. switching
 * tabs and back), it shows what was drawn. Give it an `aria-label`; write a
 * hint over it while `form.strokes()` is empty.
 */
@Directive({
  selector: 'canvas[scPdfViewerSignaturePad]',
  host: {
    'data-slot': 'pdf-viewer-signature-pad',
    '[class]': 'class()',
    '(pointerdown)': 'start($event)',
    '(pointermove)': 'move($event)',
    '(pointerup)': 'end($event)',
    '(pointercancel)': 'end($event)',
  },
})
export class ScPdfViewerSignaturePad {
  private readonly form = inject(ScPdfViewerSignatureForm);
  private readonly canvas =
    inject<ElementRef<HTMLCanvasElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'size-full cursor-crosshair touch-none rounded-lg border bg-white',
      this.classInput(),
    ),
  );

  private current: ScPdfSignatureStroke | null = null;

  constructor() {
    this.form.drawing = () => this.canvas.toDataURL('image/png');
    inject(DestroyRef).onDestroy(() => {
      if (this.form.drawing) this.form.drawing = null;
    });

    // Size to the element, then show the strokes (also after Clear).
    afterNextRender(() => {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
      this.redraw(this.form.strokes());
    });
    effect(() => this.redraw(this.form.strokes()));
  }

  protected start(event: PointerEvent): void {
    this.canvas.setPointerCapture(event.pointerId);
    this.current = {
      points: [this.point(event)],
      width: this.form.thickness(),
    };
  }

  protected move(event: PointerEvent): void {
    const stroke = this.current;
    const context = this.canvas.getContext('2d');
    if (!stroke || !context) return;
    const from = stroke.points[stroke.points.length - 1];
    const to = this.point(event);
    stroke.points.push(to);
    this.ink(context, stroke.width);
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  }

  protected end(event: PointerEvent): void {
    const stroke = this.current;
    this.current = null;
    if (this.canvas.hasPointerCapture(event.pointerId)) {
      this.canvas.releasePointerCapture(event.pointerId);
    }
    if (stroke && stroke.points.length > 1) {
      this.form.strokes.update((strokes) => [...strokes, stroke]);
    }
  }

  private point(event: PointerEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  private ink(context: CanvasRenderingContext2D, width: number): void {
    context.strokeStyle = SC_PDF_SIGNATURE_INK;
    context.lineWidth = width;
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }

  private redraw(strokes: readonly ScPdfSignatureStroke[]): void {
    const context = this.canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const stroke of strokes) {
      const [first, ...rest] = stroke.points;
      if (!first || !rest.length) continue;
      this.ink(context, stroke.width);
      context.beginPath();
      context.moveTo(first.x, first.y);
      for (const point of rest) context.lineTo(point.x, point.y);
      context.stroke();
    }
  }
}

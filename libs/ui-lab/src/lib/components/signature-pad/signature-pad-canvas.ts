import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  model,
  output,
  inject,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  DestroyRef,
  effect,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SIGNATURE_PAD, ScSignaturePoint } from './signature-pad';

@Component({
  selector: 'canvas[sc-signature-pad-canvas]',
  template: '',
  host: {
    'data-slot': 'signature-pad-canvas',
    '[class]': 'class()',
    '[width]': 'width()',
    '[height]': 'height()',
    role: 'img',
    '(mousedown)': 'onPointerDown($event)',
    '(mousemove)': 'onPointerMove($event)',
    '(mouseup)': 'onPointerUp()',
    '(mouseleave)': 'onPointerUp()',
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onPointerUp()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSignaturePadCanvas {
  readonly signaturePad = inject(SC_SIGNATURE_PAD);
  private readonly elementRef = inject(ElementRef<HTMLCanvasElement>);
  private readonly destroyRef = inject(DestroyRef);

  // Canvas requires width/height as attributes (not CSS) to set the internal drawing buffer resolution.
  // CSS/Tailwind only sets display size, which causes stretching and poor drawing quality.
  readonly width = input<number>(400);
  readonly height = input<number>(200);
  readonly classInput = input<string>('', { alias: 'class' });

  // Two-way binding
  readonly value = model<string>('');

  // Outputs
  readonly signatureChange = output<string>();
  readonly strokeEnd = output<void>();

  protected readonly class = computed(() =>
    cn(
      'border rounded-lg cursor-crosshair touch-none',
      this.signaturePad.disabled() && 'opacity-50 cursor-not-allowed',
      this.classInput(),
    ),
  );

  constructor() {
    // Register canvas with parent directive
    afterNextRender(() => {
      const canvas = this.elementRef.nativeElement;
      this.signaturePad.canvasElement.set(canvas);
      this.redraw();
    });

    // Watch for line changes and redraw
    effect(() => {
      this.signaturePad.lines();
      this.redraw();
    });
  }

  private getCanvasPoint(clientX: number, clientY: number): ScSignaturePoint {
    const canvas = this.elementRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  protected onPointerDown(event: MouseEvent): void {
    if (this.signaturePad.disabled()) return;

    this.signaturePad.isDrawing.set(true);
    const point = this.getCanvasPoint(event.clientX, event.clientY);
    this.signaturePad.currentLine.set([point]);
    this.drawPoint(point);
  }

  protected onPointerMove(event: MouseEvent): void {
    if (!this.signaturePad.isDrawing() || this.signaturePad.disabled()) return;

    const point = this.getCanvasPoint(event.clientX, event.clientY);
    this.signaturePad.currentLine.update((line) => [...line, point]);
    this.drawLine();
  }

  protected onPointerUp(): void {
    if (!this.signaturePad.isDrawing()) return;

    this.signaturePad.isDrawing.set(false);

    if (this.signaturePad.currentLine().length > 0) {
      this.signaturePad.addLine({
        points: this.signaturePad.currentLine(),
        color: this.signaturePad.penColor(),
        width: this.signaturePad.penWidth(),
      });
      this.signaturePad.currentLine.set([]);
      this.strokeEnd.emit();
      this.emitSignature();
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    if (this.signaturePad.disabled()) return;
    event.preventDefault();

    const touch = event.touches[0];
    this.signaturePad.isDrawing.set(true);
    const point = this.getCanvasPoint(touch.clientX, touch.clientY);
    this.signaturePad.currentLine.set([point]);
    this.drawPoint(point);
  }

  protected onTouchMove(event: TouchEvent): void {
    if (!this.signaturePad.isDrawing() || this.signaturePad.disabled()) return;
    event.preventDefault();

    const touch = event.touches[0];
    const point = this.getCanvasPoint(touch.clientX, touch.clientY);
    this.signaturePad.currentLine.update((line) => [...line, point]);
    this.drawLine();
  }

  private drawPoint(point: ScSignaturePoint): void {
    const ctx = this.signaturePad.getContext();
    if (!ctx) return;

    ctx.fillStyle = this.signaturePad.penColor();
    ctx.beginPath();
    ctx.arc(point.x, point.y, this.signaturePad.penWidth() / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawLine(): void {
    const ctx = this.signaturePad.getContext();
    const points = this.signaturePad.currentLine();
    if (!ctx || points.length < 2) return;

    ctx.strokeStyle = this.signaturePad.penColor();
    ctx.lineWidth = this.signaturePad.penWidth();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const lastTwo = points.slice(-2);
    ctx.beginPath();
    ctx.moveTo(lastTwo[0].x, lastTwo[0].y);
    ctx.lineTo(lastTwo[1].x, lastTwo[1].y);
    ctx.stroke();
  }

  private drawFullLine(line: {
    points: ScSignaturePoint[];
    color: string;
    width: number;
  }): void {
    const ctx = this.signaturePad.getContext();
    if (!ctx || line.points.length === 0) return;

    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (line.points.length === 1) {
      ctx.fillStyle = line.color;
      ctx.beginPath();
      ctx.arc(
        line.points[0].x,
        line.points[0].y,
        line.width / 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      return;
    }

    ctx.beginPath();
    ctx.moveTo(line.points[0].x, line.points[0].y);

    for (let i = 1; i < line.points.length; i++) {
      ctx.lineTo(line.points[i].x, line.points[i].y);
    }
    ctx.stroke();
  }

  private redraw(): void {
    const ctx = this.signaturePad.getContext();
    if (!ctx) return;

    // Clear and fill background
    ctx.fillStyle = this.signaturePad.backgroundColor();
    ctx.fillRect(0, 0, this.width(), this.height());

    // Redraw all lines
    for (const line of this.signaturePad.lines()) {
      this.drawFullLine(line);
    }
  }

  private emitSignature(): void {
    const dataURL = this.signaturePad.toDataURL();
    this.value.set(dataURL);
    this.signatureChange.emit(dataURL);
  }
}

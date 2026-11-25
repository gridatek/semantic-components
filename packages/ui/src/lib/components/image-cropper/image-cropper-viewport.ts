import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScImageCropper } from './image-cropper';

/**
 * The area the image shows in: give it a size (`h-80`…). In frame mode,
 * dragging pans the image under the frame, the wheel zooms at the pointer
 * and two fingers pinch.
 */
@Directive({
  selector: '[scImageCropperViewport]',
  host: {
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
    '(wheel)': 'onWheel($event)',
  },
})
export class ScImageCropperViewport {
  private readonly cropper = inject(ScImageCropper);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The fingers down (frame): two pinch. */
  private readonly pointers = new Map<number, { x: number; y: number }>();
  private pinch: { spread: number; x: number; y: number } | null = null;

  private readonly frame = computed(() => this.cropper.mode() === 'frame');

  private readonly class = computed(() =>
    cn(
      'bg-muted relative touch-none overflow-hidden select-none',
      this.frame() &&
        !this.cropper.disabled() &&
        'cursor-grab in-data-dragging:cursor-grabbing',
      this.classInput(),
    ),
  );

  constructor() {
    this.cropper.ɵviewport.set(this.element);
    // Its size places the image: measured in the browser.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(() =>
        this.cropper.ɵviewportSize.set({
          width: this.element.clientWidth,
          height: this.element.clientHeight,
        }),
      );
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private onPointerDown(event: PointerEvent): void {
    if (!this.frame() || this.cropper.disabled() || !this.cropper.ready()) {
      return;
    }
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.pointers.size === 2) {
      // A second finger: a pinch, not a pan.
      this.cropper.ɵendDrag();
      this.element.setPointerCapture?.(event.pointerId);
      this.pinch = this.measure();
      return;
    }
    if (this.pointers.size === 1) {
      this.cropper.ɵstartDrag(event, this.element, 'pan');
    }
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.pointers.has(event.pointerId)) return;
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const pinch = this.pinch;
    if (!pinch || this.pointers.size !== 2) return;
    const now = this.measure();
    if (!now) return;
    // Zoomed by the fingers' spread, about their middle, which pans as it moves.
    if (pinch.spread > 0) {
      this.cropper.zoomBy(
        now.spread / pinch.spread,
        this.cropper.ɵimagePoint(now.x, now.y),
      );
    }
    this.cropper.ɵpan(now.x - pinch.x, now.y - pinch.y);
    this.pinch = now;
  }

  private onPointerUp(event: PointerEvent): void {
    this.pointers.delete(event.pointerId);
    if (this.pointers.size < 2) this.pinch = null;
  }

  private onWheel(event: WheelEvent): void {
    if (!this.frame() || this.cropper.disabled() || !this.cropper.ready()) {
      return;
    }
    event.preventDefault();
    // Lines and pages as pixels; a notch at most 50.
    const unit =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? this.element.clientHeight
          : 1;
    const delta = Math.min(50, Math.max(-50, event.deltaY * unit));
    this.cropper.zoomBy(
      Math.exp(-delta * 0.01),
      this.cropper.ɵimagePoint(event.clientX, event.clientY),
    );
  }

  private measure(): { spread: number; x: number; y: number } | null {
    const [a, b] = [...this.pointers.values()];
    if (!a || !b) return null;
    return {
      spread: Math.hypot(a.x - b.x, a.y - b.y),
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    };
  }
}

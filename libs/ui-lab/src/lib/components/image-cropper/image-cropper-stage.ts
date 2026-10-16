import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageCropper } from './image-cropper';
import type { ScImageCropperHandlePosition } from './image-cropper-geometry';

type Drag =
  | { kind: 'pan' }
  | { kind: 'move' }
  | { kind: 'resize'; handle: ScImageCropperHandlePosition };

/**
 * Where the image is shown and cropped: give it a height. Dragging pans the
 * image — or, on a box with handles, moves or resizes it; the wheel and a
 * pinch zoom.
 */
@Directive({
  selector: '[scImageCropperStage]',
  host: {
    'data-slot': 'image-cropper-stage',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
    '(wheel)': 'onWheel($event)',
  },
})
export class ScImageCropperStage {
  private readonly cropper = inject(ScImageCropper);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly pointers = new Map<number, { x: number; y: number }>();
  private drag: Drag | null = null;

  protected readonly class = computed(() =>
    cn(
      'bg-muted relative touch-none overflow-hidden select-none',
      this.cropper.resizable() ? 'cursor-crosshair' : 'cursor-grab',
      'data-active:cursor-grabbing',
      this.classInput(),
    ),
  );

  constructor() {
    // Its size places the image: measured in the browser.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(([entry]) =>
        this.cropper.ɵstage.set({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        }),
      );
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || !this.cropper.ready()) return;
    this.element.setPointerCapture(event.pointerId);
    this.pointers.set(event.pointerId, this.point(event));
    if (this.pointers.size > 1) {
      // A second finger: a pinch, not a drag.
      this.drag = { kind: 'pan' };
      return;
    }
    const target = event.target as Element;
    const handle = target.closest('[data-handle]')?.getAttribute('data-handle');
    const onSelection = !!target.closest(
      '[data-slot="image-cropper-selection"]',
    );
    this.drag =
      handle && this.cropper.resizable()
        ? { kind: 'resize', handle: handle as ScImageCropperHandlePosition }
        : onSelection && this.cropper.resizable()
          ? { kind: 'move' }
          : { kind: 'pan' };
    this.cropper.active.set(true);
  }

  protected onPointerMove(event: PointerEvent): void {
    const previous = this.pointers.get(event.pointerId);
    if (!previous || !this.drag) return;
    const point = this.point(event);

    if (this.pointers.size === 2) {
      // Pinch: zoom by how far the fingers went apart, around their middle.
      const [a, b] = [...this.pointers.values()];
      const before = Math.hypot(a.x - b.x, a.y - b.y);
      this.pointers.set(event.pointerId, point);
      const [c, d] = [...this.pointers.values()];
      const after = Math.hypot(c.x - d.x, c.y - d.y);
      if (before > 0) {
        this.cropper.zoomBy(after / before, {
          x: (c.x + d.x) / 2,
          y: (c.y + d.y) / 2,
        });
      }
      return;
    }

    this.pointers.set(event.pointerId, point);
    const dx = point.x - previous.x;
    const dy = point.y - previous.y;
    const s = this.cropper.scale() || 1;
    switch (this.drag.kind) {
      case 'pan':
        this.cropper.pan(dx, dy);
        break;
      case 'move':
        this.cropper.move(dx / s, dy / s);
        break;
      case 'resize':
        this.cropper.resizeBy(this.drag.handle, dx / s, dy / s);
        break;
    }
  }

  protected onPointerUp(event: PointerEvent): void {
    this.pointers.delete(event.pointerId);
    if (!this.pointers.size) {
      this.drag = null;
      this.cropper.active.set(false);
    }
  }

  protected onWheel(event: WheelEvent): void {
    if (!this.cropper.ready()) return;
    event.preventDefault();
    this.cropper.zoomBy(Math.exp(-event.deltaY * 0.002), this.point(event));
  }

  /** The event's point, in the stage. */
  private point(event: MouseEvent): { x: number; y: number } {
    const rect = this.element.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
}

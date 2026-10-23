import { Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * Two things compared, one over the other, split by a divider: your
 * `scCompareBefore` and `scCompareAfter` — images, videos, or any content —
 * and a `scCompareHandle`, the divider's slider. `position` is how much of
 * the before shows, from the start (or the top).
 */
@Directive({
  selector: '[scCompare]',
  exportAs: 'scCompare',
  host: {
    'data-slot': 'compare',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-dragging]': 'dragging() || null',
    '[style.--sc-compare-position.%]': 'position()',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
  },
})
export class ScCompare {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly direction = inject(Directionality);

  readonly classInput = input<string>('', { alias: 'class' });

  /** How much of the before shows, 0–100. */
  readonly position = model(50);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  /** The divider follows the pointer, without a press. */
  readonly hover = input(false, { transform: booleanAttribute });
  /** Only the handle drags the divider; elsewhere does nothing. */
  readonly handleOnly = input(false, { transform: booleanAttribute });
  /** How close to the edges the divider goes, in percent. */
  readonly bounds = input(0);

  readonly dragging = signal(false);
  readonly rtl = computed(() => this.direction.valueSignal() === 'rtl');

  protected readonly class = computed(() =>
    cn(
      // Its own stacking context: the handle stays under what covers it (a sticky header).
      'relative isolate block overflow-hidden select-none',
      this.hover() || !this.handleOnly()
        ? this.orientation() === 'vertical'
          ? 'cursor-ns-resize'
          : 'cursor-ew-resize'
        : '',
      'data-dragging:touch-none',
      this.classInput(),
    ),
  );

  /** Sets the position, within the bounds. */
  setPosition(value: number): void {
    const min = this.bounds();
    this.position.set(
      Math.round(Math.min(100 - min, Math.max(min, value)) * 100) / 100,
    );
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || this.hover()) return;
    const onHandle = (event.target as Element).closest(
      '[data-slot="compare-handle"]',
    );
    if (this.handleOnly() && !onHandle) return;
    this.element.setPointerCapture(event.pointerId);
    this.dragging.set(true);
    // A press elsewhere jumps the divider there; on the handle, it stays.
    if (!onHandle) this.follow(event);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (this.dragging() || this.hover()) this.follow(event);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging()) return;
    this.dragging.set(false);
    this.element.releasePointerCapture(event.pointerId);
  }

  /** The divider to the pointer. */
  private follow(event: PointerEvent): void {
    const rect = this.element.getBoundingClientRect();
    const ratio =
      this.orientation() === 'vertical'
        ? (event.clientY - rect.top) / rect.height
        : this.rtl()
          ? (rect.right - event.clientX) / rect.width
          : (event.clientX - rect.left) / rect.width;
    this.setPosition(ratio * 100);
  }
}

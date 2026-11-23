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
import { cn } from 'cn';

/** Who drags the divider: `true` only the handle; `'touch'` only the handle on a touch screen (the page still scrolls), anywhere with a mouse or a pen. */
export type ScCompareHandleOnly = boolean | 'touch';

/**
 * Two things compared, one over the other, split by a divider you drag —
 * photos before and after an edit, two themes of a design, any content.
 * `[(position)]`: how much of the before shows, 0–100 from the start (the
 * top, when vertical).
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
  /** Only the handle drags: always, never, or on a touch screen (the default). */
  readonly handleOnly = input<ScCompareHandleOnly, unknown>('touch', {
    transform: (value: unknown) =>
      value === 'touch' ? 'touch' : booleanAttribute(value),
  });
  /** How close to the edges the divider goes, in percent. */
  readonly bounds = input(0);
  /** An arrow key's step, in percent (Shift: ten of them). */
  readonly step = input(1);

  readonly dragging = signal(false);
  /** Moved by the keyboard: the divider glides (not while dragged). */
  readonly gliding = signal(false);
  readonly rtl = computed(() => this.direction.valueSignal() === 'rtl');

  private readonly class = computed(() =>
    cn(
      // Its own stacking context: the handle stays under what covers it (a sticky header).
      'relative isolate block overflow-hidden select-none',
      this.hover() || this.handleOnly() !== true
        ? this.orientation() === 'vertical'
          ? 'cursor-ns-resize'
          : 'cursor-ew-resize'
        : '',
      this.dragging() && 'touch-none',
      this.classInput(),
    ),
  );

  /** Sets the position, within the bounds. */
  setPosition(value: number, glide = false): void {
    const min = this.bounds();
    this.gliding.set(glide);
    this.position.set(
      Math.round(Math.min(100 - min, Math.max(min, value)) * 100) / 100,
    );
  }

  private onPointerDown(event: PointerEvent): void {
    if (event.button !== 0 || this.hover()) return;
    const onHandle = (event.target as Element).closest(
      '[data-slot="compare-handle"]',
    );
    const handleOnly = this.handleOnly();
    const onlyTheHandle =
      handleOnly === true ||
      (handleOnly === 'touch' && event.pointerType === 'touch');
    if (onlyTheHandle && !onHandle) return;
    this.element.setPointerCapture(event.pointerId);
    this.dragging.set(true);
    // A press elsewhere jumps the divider there; on the handle, it stays.
    if (!onHandle) this.follow(event);
  }

  private onPointerMove(event: PointerEvent): void {
    if (this.dragging() || this.hover()) this.follow(event);
  }

  private onPointerUp(event: PointerEvent): void {
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

import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScScrollAreaNext } from './scroll-area-next';
import { ScScrollAreaNextScrollbar } from './scroll-area-next-scrollbar';

/**
 * The scrollbar's thumb, in the preset's look: as long as the share of the
 * content in view, where the scroll is. Dragged, it scrolls.
 * As Base UI's ScrollArea.Thumb.
 */
@Directive({
  selector: 'div[scScrollAreaNextThumb]',
  host: {
    '[attr.data-orientation]': 'bar.orientation()',
    '[attr.data-scrolling]': 'area.scrolling() ? "" : null',
    '[style.height.px]': 'vertical() ? bar.thumbLength() : null',
    '[style.width.px]': 'vertical() ? null : bar.thumbLength()',
    '[style.transform]': 'transform()',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
  },
})
export class ScScrollAreaNextThumb {
  private readonly styles = injectPreset().scrollArea;
  protected readonly area = inject(ScScrollAreaNext);
  protected readonly bar = inject(ScScrollAreaNextScrollbar);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly vertical = computed(
    () => this.bar.orientation() === 'vertical',
  );
  /** Where the pointer took it, from the thumb's start (px). */
  private grip: number | null = null;

  protected readonly transform = computed(() => {
    const offset = this.bar.thumbOffset();
    if (this.vertical()) return `translate3d(0, ${offset}px, 0)`;
    // A right-to-left bar starts at the right: the thumb moves left.
    return `translate3d(${this.area.isRtl() ? -offset : offset}px, 0, 0)`;
  });

  protected readonly class = computed(() =>
    cn(this.styles.thumb, this.classInput()),
  );

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.grip = this.bar.pointerOffset(event) - this.bar.thumbOffset();
  }

  protected onPointerMove(event: PointerEvent): void {
    if (this.grip === null) return;
    this.bar.scrollToThumb(this.bar.pointerOffset(event) - this.grip);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.grip === null) return;
    this.grip = null;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
  }
}

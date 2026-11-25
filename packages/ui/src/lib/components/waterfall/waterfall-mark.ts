import { Directionality } from '@angular/cdk/bidi';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScWaterfall } from './waterfall';

/**
 * A moment across every row — "DOMContentLoaded" — in the axis: your text at
 * its time (`--sc-waterfall-mark`), a line through the bars. Past the middle of
 * the range, the text on the line's other side: inside the axis, on a narrow
 * screen too. `data-outside` when the range doesn't hold it.
 */
@Directive({
  selector: '[scWaterfallMark]',
  host: {
    'data-slot': 'waterfall-mark',
    '[attr.data-outside]': 'outside() || null',
    '[style.--sc-waterfall-mark]': 'place() + "%"',
    '[style.inset-inline-start.%]': 'place()',
    '[style.transform]': 'shift()',
    '[class]': 'class()',
  },
})
export class ScWaterfallMark {
  private readonly waterfall = inject(ScWaterfall);
  private readonly directionality = inject(Directionality);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its time, in ms. */
  readonly time = input.required<number>();

  private readonly place = computed(() =>
    this.waterfall.percentAt(this.time()),
  );
  /** Its text before the line rather than after it: past the middle. */
  private readonly before = computed(() => this.place() > 50);
  /** Moved back by its own width, the line (its end border) at its time. */
  private readonly shift = computed(() => {
    if (!this.before()) return null;
    return this.directionality.value === 'rtl'
      ? 'translateX(100%)'
      : 'translateX(-100%)';
  });
  private readonly outside = computed(() => {
    const [from, to] = this.waterfall.bounds();
    return this.time() < from || this.time() > to;
  });

  private readonly class = computed(() =>
    cn(
      'text-foreground absolute -top-4 text-xs whitespace-nowrap',
      this.before() ? 'border-e pe-1' : 'border-s ps-1',
      this.outside() && 'hidden',
      this.classInput(),
    ),
  );

  constructor() {
    effect((onCleanup) => {
      const time = this.time();
      this.waterfall.marks.update((marks) => [...marks, time]);
      onCleanup(() =>
        this.waterfall.marks.update((marks) => {
          const at = marks.indexOf(time);
          return at < 0 ? marks : marks.filter((_, i) => i !== at);
        }),
      );
    });
  }
}

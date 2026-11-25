import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScWaterfall } from './waterfall';
import { scWaterfallTicks } from './waterfall-data';
import { ScWaterfallTick } from './waterfall-tick';

/**
 * The time axis, in the timeline's column header: round times across the
 * range (at most `maxTicks`, and one every 80px of its width — fewer on a
 * phone, never on top of each other) — or your ticks and marks inside it. Its times
 * are the column header's text (named by its `aria-label`, "Timeline"). `#axis="scWaterfallAxis"`:
 * `ticks()`.
 */
@Component({
  selector: '[scWaterfallAxis]',
  exportAs: 'scWaterfallAxis',
  imports: [ScWaterfallTick],
  template: `
    <ng-content select="[scWaterfallMark]" />
    <ng-content>
      @for (tick of ticks(); track $index) {
        <span scWaterfallTick [time]="tick"></span>
      }
    </ng-content>
  `,
  host: {
    'data-slot': 'waterfall-axis',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScWaterfallAxis {
  private readonly waterfall = inject(ScWaterfall);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The most ticks: round times, and one every 80px of the axis — so maybe fewer. */
  readonly maxTicks = input(5);

  /** Its width, measured in the browser: none on the server. */
  private readonly width = signal<number | null>(null);

  /** The ticks' times. */
  readonly ticks = computed(() => {
    const width = this.width();
    // As many steps as 80px each fit (d3's `ticks(width / 80)`): at least one.
    const fit =
      width === null ? this.maxTicks() : Math.max(1, Math.floor(width / 80));
    return scWaterfallTicks(
      this.waterfall.bounds(),
      Math.min(this.maxTicks(), fit),
    );
  });

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground relative h-5 w-full self-end text-xs font-normal',
      this.classInput(),
    ),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(([entry]) =>
        this.width.set(entry.contentRect.width),
      );
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}

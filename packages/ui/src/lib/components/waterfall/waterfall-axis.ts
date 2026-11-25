import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScWaterfall } from './waterfall';
import { scWaterfallTicks } from './waterfall-data';
import { ScWaterfallTick } from './waterfall-tick';

/**
 * The time axis, in the timeline's column header: round times across the
 * range (at most `maxTicks`) — or your ticks and marks inside it. Its times
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

  readonly classInput = input<string>('', { alias: 'class' });
  /** The most ticks: round times, so maybe fewer. */
  readonly maxTicks = input(5);

  /** The ticks' times. */
  readonly ticks = computed(() =>
    scWaterfallTicks(this.waterfall.bounds(), this.maxTicks()),
  );

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground relative h-5 w-full self-end text-xs font-normal',
      this.classInput(),
    ),
  );
}

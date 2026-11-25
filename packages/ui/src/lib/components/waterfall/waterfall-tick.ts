import { Directionality } from '@angular/cdk/bidi';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScWaterfall } from './waterfall';

/** A time on the axis, at its place (`--sc-waterfall-tick`): written, or your text inside it. */
@Component({
  selector: '[scWaterfallTick]',
  template: `<ng-content>{{ text() }}</ng-content>`,
  host: {
    'data-slot': 'waterfall-tick',
    '[style.--sc-waterfall-tick]': 'place() + "%"',
    '[style.inset-inline-start.%]': 'place()',
    '[style.transform]': 'shift()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScWaterfallTick {
  private readonly waterfall = inject(ScWaterfall);
  private readonly directionality = inject(Directionality);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its time, in ms. */
  readonly time = input.required<number>();

  private readonly place = computed(() =>
    this.waterfall.percentAt(this.time()),
  );
  /** Its label moved back by its own place: the first starts at its tick, the last ends at it — inside the axis. */
  private readonly shift = computed(() => {
    const back =
      this.directionality.value === 'rtl' ? this.place() : -this.place();
    return `translateX(${back}%)`;
  });
  private readonly text = computed(() =>
    this.waterfall.formatTime(this.time()),
  );

  private readonly class = computed(() =>
    cn('absolute top-0 whitespace-nowrap tabular-nums', this.classInput()),
  );
}

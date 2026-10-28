import {
  Component,
  DestroyRef,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartNextState } from './chart-next-state';

/**
 * The values, beside the plot: a label at each tick, in the app's locale or
 * through `tickFormatter` (`expand` stacks: a share, 0 to 1).
 */
@Component({
  selector: 'g[scChartNextYAxis]',
  template: `
    @for (tick of ticks(); track tick.value) {
      <svg:text
        [attr.x]="x()"
        [attr.y]="tick.y"
        text-anchor="end"
        dominant-baseline="middle"
      >
        {{ tick.label }}
      </svg:text>
    }
  `,
  host: {
    'data-slot': 'chart-y-axis',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartNextYAxis {
  private readonly state = inject(ScChartNextState);
  private readonly numbers = new Intl.NumberFormat(inject(LOCALE_ID));

  readonly classInput = input<string>('', { alias: 'class' });
  /** The room its labels take, in px. */
  readonly width = input(40);
  /** About how many ticks. */
  readonly tickCount = input(5);
  readonly tickFormatter = input<((value: number) => string) | null>(null);

  protected readonly x = computed(() => this.state.area().left - 8);

  protected readonly ticks = computed(() => {
    const y = this.state.y();
    const format =
      this.tickFormatter() ?? ((v: number) => this.numbers.format(v));
    return y
      .ticks(this.tickCount())
      .map((value) => ({ value, y: y(value), label: format(value) }));
  });

  protected readonly class = computed(() =>
    cn('fill-muted-foreground', this.classInput()),
  );

  constructor() {
    this.state.yAxis.set(this.width);
    inject(DestroyRef).onDestroy(() => this.state.yAxis.set(null));
  }
}

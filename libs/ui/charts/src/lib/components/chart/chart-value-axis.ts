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
import { ScChartState } from './chart-state';

/**
 * The values: beside the plot, or under it in a `vertical` layout — a label at
 * each tick, in the app's locale or through `tickFormatter` (`expand` stacks:
 * a share, 0 to 1).
 */
@Component({
  selector: 'g[scChartValueAxis]',
  template: `
    @for (tick of ticks(); track tick.value) {
      <svg:text
        [attr.x]="tick.x"
        [attr.y]="tick.y"
        [attr.text-anchor]="vertical() ? 'middle' : 'end'"
        [attr.dominant-baseline]="vertical() ? 'hanging' : 'middle'"
      >
        {{ tick.label }}
      </svg:text>
    }
  `,
  host: {
    'data-slot': 'chart-value-axis',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartValueAxis {
  private readonly state = inject(ScChartState);
  private readonly numbers = new Intl.NumberFormat(inject(LOCALE_ID));

  readonly classInput = input<string>('', { alias: 'class' });
  /** Beside the plot: the room its labels take, in px. */
  readonly width = input(40);
  /** About how many ticks. */
  readonly tickCount = input(5);
  readonly tickFormatter = input<((value: number) => string) | null>(null);

  protected readonly vertical = this.state.vertical;

  protected readonly ticks = computed(() => {
    const scale = this.state.valueScale();
    const { left, bottom } = this.state.area();
    const format =
      this.tickFormatter() ?? ((v: number) => this.numbers.format(v));
    const vertical = this.vertical();
    return scale.ticks(this.tickCount()).map((value) => ({
      value,
      label: format(value),
      x: vertical ? scale(value) : left - 8,
      y: vertical ? bottom + 8 : scale(value),
    }));
  });

  protected readonly class = computed(() =>
    cn('fill-muted-foreground', this.classInput()),
  );

  constructor() {
    this.state.valueAxis.set(this.width);
    inject(DestroyRef).onDestroy(() => this.state.valueAxis.set(null));
  }
}

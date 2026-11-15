import {
  Component,
  DestroyRef,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { optionalBoolean } from './chart-axis-input';
import { type ScChartAxisSide, ScChartState } from './chart-state';

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
        [attr.text-anchor]="tick.anchor"
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
  /** How many ticks (Recharts' `tickCount`): they also set the value domain. */
  readonly tickCount = input(5);
  readonly tickFormatter = input<((value: number) => string) | null>(null);
  /**
   * The values run backwards (Recharts'): down from the top, or from the
   * right in a `vertical` layout. Unset: the chart's default — mirrored in
   * right to left (`vertical`) when the app follows the direction.
   */
  readonly reversed = input<
    boolean | undefined,
    boolean | string | null | undefined
  >(undefined, { transform: optionalBoolean });
  /** Beside the plot: its side (Recharts'). Unset: the chart's default — the right when mirrored. */
  readonly orientation = input<ScChartAxisSide | undefined>(undefined);

  protected readonly vertical = this.state.vertical;

  protected readonly ticks = computed(() => {
    const scale = this.state.valueScale();
    const { left, right, bottom } = this.state.area();
    // Beside the plot: on its left, or its right (labels away from it).
    const onRight = this.state.sideAxisSide() === 'right';
    const format =
      this.tickFormatter() ?? ((v: number) => this.numbers.format(v));
    const vertical = this.vertical();
    return this.state.valueTicks().map((value) => ({
      value,
      label: format(value),
      x: vertical ? scale(value) : onRight ? right + 8 : left - 8,
      y: vertical ? bottom + 8 : scale(value),
      anchor: vertical ? 'middle' : onRight ? 'start' : 'end',
    }));
  });

  protected readonly class = computed(() =>
    cn('fill-muted-foreground', this.classInput()),
  );

  constructor() {
    this.state.valueAxis.set({
      width: this.width,
      reversed: this.reversed,
      orientation: this.orientation,
    });
    effect(() => this.state.valueTickCount.set(this.tickCount()));
    inject(DestroyRef).onDestroy(() => {
      this.state.valueAxis.set(null);
      this.state.valueTickCount.set(5);
    });
  }
}

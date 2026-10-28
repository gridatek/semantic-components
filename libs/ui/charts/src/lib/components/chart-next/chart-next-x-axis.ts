import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartNextState } from './chart-next-state';

/** About a character's width, in px, at the axis' size: to space the labels. */
const CHARACTER = 7;

/**
 * The categories, under the plot — as many as fit, evenly skipped; each as
 * written in the data, or through `tickFormatter`.
 */
@Component({
  selector: 'g[scChartNextXAxis]',
  template: `
    @for (tick of ticks(); track tick.index) {
      <svg:text
        [attr.x]="tick.x"
        [attr.y]="y()"
        text-anchor="middle"
        dominant-baseline="hanging"
      >
        {{ tick.label }}
      </svg:text>
    }
  `,
  host: {
    'data-slot': 'chart-x-axis',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartNextXAxis {
  private readonly state = inject(ScChartNextState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** A category's label (`'January'` → `'Jan'`). */
  readonly tickFormatter = input<(category: string, index: number) => string>(
    (category) => category,
  );

  protected readonly y = computed(() => this.state.area().bottom + 8);

  protected readonly ticks = computed(() => {
    const format = this.tickFormatter();
    const labels = this.state
      .categories()
      .map((category, index) => format(category, index));
    if (!labels.length) return [];
    const { left, right } = this.state.area();
    const step = (right - left) / labels.length;
    const widest = Math.max(...labels.map((label) => label.length)) * CHARACTER;
    const every = Math.max(1, Math.ceil((widest + 8) / Math.max(step, 1)));
    return labels
      .map((label, index) => ({ index, label, x: this.state.center(index) }))
      .filter((tick) => tick.index % every === 0);
  });

  protected readonly class = computed(() =>
    cn('fill-muted-foreground', this.classInput()),
  );

  constructor() {
    this.state.xAxisHeight.set(24);
    inject(DestroyRef).onDestroy(() => this.state.xAxisHeight.set(0));
  }
}

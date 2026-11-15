import {
  Component,
  DestroyRef,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { optionalBoolean } from './chart-axis-input';
import { type ScChartAxisSide, ScChartState } from './chart-state';

/** About a character's width, in px, at the axis' size: to space the labels. */
const CHARACTER = 7;
/** About a line's height, in px: to space the labels down the side. */
const LINE = 16;

/**
 * The categories (a scatter's x values): under the plot, or beside it in a `vertical` layout — as
 * many as fit, evenly skipped; each as written in the data, or through
 * `tickFormatter`.
 */
@Component({
  selector: 'g[scChartCategoryAxis]',
  template: `
    @for (tick of ticks(); track tick.index) {
      <svg:text
        [attr.x]="tick.x"
        [attr.y]="tick.y"
        [attr.text-anchor]="tick.anchor"
        [attr.dominant-baseline]="vertical() ? 'middle' : 'hanging'"
      >
        {{ tick.label }}
      </svg:text>
    }
  `,
  host: {
    'data-slot': 'chart-category-axis',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartCategoryAxis {
  private readonly state = inject(ScChartState);
  private readonly numbers = new Intl.NumberFormat(inject(LOCALE_ID));

  readonly classInput = input<string>('', { alias: 'class' });
  /** A category's label (`'January'` → `'Jan'`). */
  readonly tickFormatter = input<(category: string, index: number) => string>(
    (category) => category,
  );
  /** Beside the plot (`vertical` layout): the room its labels take, in px. */
  readonly width = input(60);
  /**
   * The categories run backwards (Recharts'): from the right, or from the
   * bottom in a `vertical` layout. Unset: the chart's default — mirrored
   * in right to left when the app follows the direction.
   */
  readonly reversed = input<
    boolean | undefined,
    boolean | string | null | undefined
  >(undefined, { transform: optionalBoolean });
  /** Beside the plot (`vertical` layout): its side (Recharts'). Unset: the chart's default. */
  readonly orientation = input<ScChartAxisSide | undefined>(undefined);

  protected readonly vertical = this.state.vertical;

  protected readonly ticks = computed(() => {
    // A scatter's: the x values, at their ticks.
    if (this.state.xKey()) {
      const scale = this.state.xScale();
      const { bottom } = this.state.area();
      const format = this.tickFormatter();
      return scale.ticks(5).map((value, index) => ({
        index,
        label: format(this.numbers.format(value), index),
        x: scale(value),
        y: bottom + 8,
        anchor: 'middle',
      }));
    }
    const format = this.tickFormatter();
    const labels = this.state
      .categories()
      .map((category, index) => format(category, index));
    if (!labels.length) return [];
    const { left, top, right, bottom } = this.state.area();
    const vertical = this.vertical();
    // Beside the plot: on its left, or its right (labels away from it).
    const onRight = this.state.sideAxisSide() === 'right';
    const step = (vertical ? bottom - top : right - left) / labels.length || 1;
    const size = vertical
      ? LINE
      : Math.max(...labels.map((label) => label.length)) * CHARACTER + 8;
    const every = Math.max(1, Math.ceil(size / step));
    return labels
      .map((label, index) => {
        const along = this.state.center(index);
        return vertical
          ? {
              index,
              label,
              x: onRight ? right + 8 : left - 8,
              y: along,
              anchor: onRight ? 'start' : 'end',
            }
          : { index, label, x: along, y: bottom + 8, anchor: 'middle' };
      })
      .filter((tick) => tick.index % every === 0);
  });

  protected readonly class = computed(() =>
    cn('fill-muted-foreground', this.classInput()),
  );

  constructor() {
    this.state.categoryAxis.set({
      width: this.width,
      reversed: this.reversed,
      orientation: this.orientation,
    });
    inject(DestroyRef).onDestroy(() => this.state.categoryAxis.set(null));
  }
}

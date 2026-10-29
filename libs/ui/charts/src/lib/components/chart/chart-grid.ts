import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from './chart-state';

/**
 * The plot's grid: `horizontal` lines and, if asked, `vertical` ones — at
 * the value ticks across the values' direction, at the categories across
 * theirs.
 */
@Component({
  selector: 'g[scChartGrid]',
  template: `
    @if (horizontal()) {
      @for (y of rows(); track y) {
        <svg:line
          [attr.x1]="state.area().left"
          [attr.x2]="state.area().right"
          [attr.y1]="y"
          [attr.y2]="y"
        />
      }
    }
    @if (vertical()) {
      @for (x of columns(); track $index) {
        <svg:line
          [attr.x1]="x"
          [attr.x2]="x"
          [attr.y1]="state.area().top"
          [attr.y2]="state.area().bottom"
        />
      }
    }
  `,
  host: {
    'data-slot': 'chart-grid',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartGrid {
  protected readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly horizontal = input(true, { transform: booleanAttribute });
  readonly vertical = input(false, { transform: booleanAttribute });
  /** About how many value lines. */
  readonly tickCount = input(5);

  private readonly valueLines = computed(() => {
    const scale = this.state.valueScale();
    return scale.ticks(this.tickCount()).map((tick) => scale(tick));
  });

  private readonly categoryLines = computed(() =>
    this.state.data().map((_, index) => this.state.center(index)),
  );

  /** The horizontal lines: at the values — at the categories, laid out vertically. */
  protected readonly rows = computed(() =>
    this.state.vertical() ? this.categoryLines() : this.valueLines(),
  );

  /** The vertical lines: at the categories — at the values, laid out vertically. */
  protected readonly columns = computed(() =>
    this.state.vertical() ? this.valueLines() : this.categoryLines(),
  );

  protected readonly class = computed(() =>
    cn('stroke-border/50', this.classInput()),
  );
}

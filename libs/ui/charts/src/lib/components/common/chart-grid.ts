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

/** The plot's grid: a line at each value tick and, if asked, each category. */
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

  protected readonly rows = computed(() => {
    const y = this.state.y();
    return y.ticks(this.tickCount()).map((tick) => y(tick));
  });

  protected readonly columns = computed(() =>
    this.state.data().map((_, index) => this.state.center(index)),
  );

  protected readonly class = computed(() =>
    cn('stroke-border/50', this.classInput()),
  );
}

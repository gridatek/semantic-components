import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from './chart-state';

/**
 * Marks the category pointed at: its band behind bars, a line across points.
 * Put it before the series, so it is drawn behind them.
 */
@Component({
  selector: 'g[scChartCursor]',
  template: `
    @if (cursor(); as c) {
      @if (c.band) {
        <svg:rect
          class="fill-muted"
          [attr.x]="c.x"
          [attr.y]="c.top"
          [attr.width]="c.width"
          [attr.height]="c.height"
        />
      } @else {
        <svg:line
          class="stroke-border"
          [attr.x1]="c.x"
          [attr.x2]="c.x"
          [attr.y1]="c.top"
          [attr.y2]="c.top + c.height"
        />
      }
    }
  `,
  host: {
    'data-slot': 'chart-cursor',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartCursor {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly cursor = computed(() => {
    const index = this.state.activeIndex();
    // Around a center, nothing to mark across: the slice says it.
    if (index === null || this.state.polar()) return null;
    const { top, bottom } = this.state.area();
    const x = this.state.x();
    const band = this.state.banded();
    return {
      band,
      x: band ? (x(index) ?? 0) : this.state.center(index),
      width: x.bandwidth(),
      top,
      height: bottom - top,
    };
  });

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.classInput()),
  );
}

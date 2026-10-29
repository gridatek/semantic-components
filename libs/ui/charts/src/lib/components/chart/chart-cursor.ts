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
          [attr.y]="c.y"
          [attr.width]="c.width"
          [attr.height]="c.height"
        />
      } @else {
        <svg:line
          class="stroke-border"
          [attr.x1]="c.x"
          [attr.y1]="c.y"
          [attr.x2]="c.x + c.width"
          [attr.y2]="c.y + c.height"
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
    if (index === null || this.state.shaped() || this.state.xKey()) return null;
    const { left, top, right, bottom } = this.state.area();
    const scale = this.state.categoryScale();
    const band = this.state.banded();
    const start = band ? (scale(index) ?? 0) : this.state.center(index);
    const across = band ? scale.bandwidth() : 0;
    // Its category's band (or line), across the values.
    return this.state.vertical()
      ? { band, x: left, y: start, width: right - left, height: across }
      : { band, x: start, y: top, width: across, height: bottom - top };
  });

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.classInput()),
  );
}

import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { area, line } from 'd3-shape';
import { curveOf } from '../chart/chart-curve';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';
import type { ScChartCurve } from '../chart/chart-types';

interface Point {
  /** Its value. */
  x: number;
  y: number;
  /** Its base: 0, or the series under it. */
  bx: number;
  by: number;
}

/**
 * A series as an area: its values (`key`) filled down to 0 — or onto the
 * series under it in its `stack`. Its color: `--color-<key>`, or `fill`
 * (a gradient of yours: `url(#…)`).
 */
@Component({
  selector: 'g[scChartArea]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartArea }],
  template: `
    <svg:path
      [attr.d]="areaPath()"
      [attr.fill]="fill() || color()"
      [attr.fill-opacity]="fillOpacity()"
    />
    <svg:path
      [attr.d]="edgePath()"
      [attr.stroke]="color()"
      stroke-width="2"
      fill="none"
    />
    @if (activePoint(); as p) {
      <svg:circle
        class="stroke-background"
        [attr.cx]="p.x"
        [attr.cy]="p.y"
        r="4"
        stroke-width="2"
        [attr.fill]="color()"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-area',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartArea implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  readonly curve = input<ScChartCurve>('natural');
  /** Areas of a stack are drawn on one another. */
  readonly stack = input<string | null>(null);
  /** Instead of its color: `url(#gradient)`. */
  readonly fill = input('');
  readonly fillOpacity = input(0.4);
  /** A dot where the pointer is. */
  readonly activeDot = input(true, { transform: booleanAttribute });

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  private readonly points = computed<Point[]>(() =>
    (this.state.extents().get(this.key()) ?? []).map(([low, high], i) => {
      const value = this.state.at(i, high);
      const below = this.state.at(i, low);
      return { x: value.x, y: value.y, bx: below.x, by: below.y };
    }),
  );

  protected readonly areaPath = computed(() => {
    const vertical = this.state.vertical();
    const shape = vertical
      ? area<Point>()
          .y((p) => p.y)
          .x0((p) => p.bx)
          .x1((p) => p.x)
      : area<Point>()
          .x((p) => p.x)
          .y0((p) => p.by)
          .y1((p) => p.y);
    return shape.curve(curveOf(this.curve(), vertical))(this.points()) ?? '';
  });

  protected readonly edgePath = computed(
    () =>
      line<Point>()
        .x((p) => p.x)
        .y((p) => p.y)
        .curve(curveOf(this.curve(), this.state.vertical()))(this.points()) ??
      '',
  );

  protected readonly activePoint = computed(() => {
    const index = this.state.activeIndex();
    return this.activeDot() && index !== null ? this.points()[index] : null;
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'area',
      stack: this.stack,
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    const rows = this.state.data();
    const vertical = this.state.vertical();
    return this.points().map((p, index) => {
      const value = numberOf(rows[index]?.[this.key()]);
      if (position === 'inside')
        return {
          index,
          value,
          x: (p.x + p.bx) / 2,
          y: (p.y + p.by) / 2,
          anchor: 'middle',
          baseline: 'middle',
        };
      return vertical
        ? {
            index,
            value,
            x: p.x + offset,
            y: p.y,
            anchor: 'start',
            baseline: 'middle',
          }
        : {
            index,
            value,
            x: p.x,
            y: p.y - offset,
            anchor: 'middle',
            baseline: 'auto',
          };
    });
  }
}

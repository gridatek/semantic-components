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
import { line } from 'd3-shape';
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
  x: number;
  y: number;
}

/** A series as a line through its values (`key`), in `--color-<key>`. */
@Component({
  selector: 'g[scChartLine]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartLine }],
  template: `
    <svg:path
      [attr.d]="path()"
      [attr.stroke]="color()"
      [attr.stroke-width]="strokeWidth()"
      fill="none"
    />
    @if (dots()) {
      @for (p of points(); track $index) {
        <svg:circle
          [attr.cx]="p.x"
          [attr.cy]="p.y"
          r="3"
          [attr.fill]="color()"
        />
      }
    }
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
    'data-slot': 'chart-line',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartLine implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  readonly curve = input<ScChartCurve>('natural');
  readonly strokeWidth = input(2);
  /** A dot at each value. */
  readonly dots = input(false, { transform: booleanAttribute });
  /** A dot where the pointer is. */
  readonly activeDot = input(true, { transform: booleanAttribute });

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  protected readonly points = computed<Point[]>(() =>
    (this.state.extents().get(this.key()) ?? []).map(([, value], i) =>
      this.state.at(i, value),
    ),
  );

  protected readonly path = computed(
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
      kind: 'line',
      stack: computed(() => null),
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
        return { index, value, ...p, anchor: 'middle', baseline: 'middle' };
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

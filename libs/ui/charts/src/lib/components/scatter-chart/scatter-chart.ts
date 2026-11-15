import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { scaleSqrt } from 'd3-scale';
import {
  type ScChartAnimationEasing,
  scChartEntrance,
} from '../chart/chart-animation';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';

interface ScScatterChartDot {
  index: number;
  x: number;
  y: number;
  r: number;
}

/**
 * A series as a scatter: a point per row at its x (`xKey`) and y (`key`)
 * values — the plot's axes both numeric — sized by a third (`sizeKey`: a
 * bubble chart). In `--color-<key>`.
 */
@Component({
  selector: 'g[scChartScatter]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartScatter }],
  template: `
    @for (dot of dots(); track dot.index) {
      <svg:circle
        [attr.cx]="dot.x"
        [attr.cy]="dot.y"
        [attr.r]="dot.r"
        [attr.fill]="color()"
        [attr.fill-opacity]="fillOpacity()"
      />
    }
    @if (activeDot(); as dot) {
      <svg:circle
        [attr.cx]="dot.x"
        [attr.cy]="dot.y"
        [attr.r]="dot.r + 3"
        fill="none"
        [attr.stroke]="color()"
        stroke-width="2"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-scatter',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartScatter implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The key of its rows' y values. */
  readonly key = input.required<string>();
  /** The key of its rows' x values. */
  readonly xKey = input.required<string>();
  /** The key of a third value, its points' sizes (a bubble chart). */
  readonly sizeKey = input('');
  /** Its points' radius, in px — the largest's, with a `sizeKey`. */
  readonly radius = input(5);
  readonly fillOpacity = input(0.7);
  /** Its points grow when it appears (Recharts'); not with reduced motion. */
  readonly isAnimationActive = input(true);
  /** The wait before they grow, in ms. */
  readonly animationBegin = input(0);
  /** How long they grow, in ms. */
  readonly animationDuration = input(400);
  readonly animationEasing = input<ScChartAnimationEasing>('linear');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  private readonly grown = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  protected readonly dots = computed<ScScatterChartDot[]>(() => {
    const rows = this.state.data();
    const sizeKey = this.sizeKey();
    const radius = this.radius();
    const size = scaleSqrt()
      .domain([0, Math.max(1, ...rows.map((row) => numberOf(row[sizeKey])))])
      .range([2, radius]);
    // Growing: their area on the way to its own (Recharts' size).
    const grown = Math.sqrt(this.grown());
    return rows.map((row, index) => ({
      index,
      ...this.state.at(index, numberOf(row[this.key()])),
      r: (sizeKey ? size(numberOf(row[sizeKey])) : radius) * grown,
    }));
  });

  protected readonly activeDot = computed(() => {
    const index = this.state.activeIndex();
    return index === null ? null : this.dots()[index];
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'scatter',
      stack: computed(() => null),
      xKey: this.xKey,
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    // Once they've grown (Recharts').
    if (this.grown() < 1) return [];
    const rows = this.state.data();
    return this.dots().map((dot) => ({
      index: dot.index,
      value: numberOf(rows[dot.index]?.[this.key()]),
      x: dot.x,
      y: position === 'inside' ? dot.y : dot.y - dot.r - offset,
      anchor: 'middle',
      baseline: position === 'inside' ? 'middle' : 'auto',
    }));
  }
}

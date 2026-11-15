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
  type ScChartAnimationMatchBy,
  scChartInterpolate as between,
  scChartEntrance,
  scChartTransition,
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
  /** Its row's key, to match it by (`animationMatchBy`). */
  id?: string | number | null;
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
  /**
   * Its points grow when it appears, and move to their new places when its
   * data changes (Recharts'); not with reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before they grow, in ms. */
  readonly animationBegin = input(0);
  /** How long they grow, in ms. */
  readonly animationDuration = input(400);
  readonly animationEasing = input<ScChartAnimationEasing>('linear');
  /** How its points before and after a change are paired (Recharts'): the first with the first. */
  readonly animationMatchBy = input<ScChartAnimationMatchBy>('append');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    start: this.state.seen,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  private readonly grown = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  /** Its points where they belong now. */
  private readonly targets = computed<ScScatterChartDot[]>(() => {
    const rows = this.state.data();
    const matchBy = this.animationMatchBy();
    const sizeKey = this.sizeKey();
    const radius = this.radius();
    const size = scaleSqrt()
      .domain([0, Math.max(1, ...rows.map((row) => numberOf(row[sizeKey])))])
      .range([2, radius]);
    return rows.map((row, index) => ({
      index,
      id: typeof matchBy === 'function' ? matchBy(row, index) : null,
      ...this.state.at(index, numberOf(row[this.key()])),
      r: sizeKey ? size(numberOf(row[sizeKey])) : radius,
    }));
  });

  /**
   * Its points moving to their new places when they change (Recharts'):
   * matched ones from where they were, their area too; new ones growing.
   */
  private readonly moving = scChartTransition({
    items: this.targets,
    ready: this.state.measured,
    active: this.isAnimationActive,
    matchBy: this.animationMatchBy,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
    interpolate: (items, time) =>
      items.flatMap((item) => {
        if (item.status === 'removed') return [];
        const { next } = item;
        if (item.status === 'added')
          return [{ ...next, r: next.r * Math.sqrt(time) }];
        const { prev } = item;
        return [
          {
            ...next,
            x: between(prev.x, next.x, time),
            y: between(prev.y, next.y, time),
            r: Math.sqrt(between(prev.r ** 2, next.r ** 2, time)),
          },
        ];
      }),
  });

  protected readonly dots = computed<ScScatterChartDot[]>(() => {
    // Growing in: their area on the way to its own (Recharts' size).
    const grown = Math.sqrt(this.grown());
    return this.moving.items().map((dot) => ({ ...dot, r: dot.r * grown }));
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
      // The keyboard's item: its point (not a category's band: its x is a value).
      anchor: (index) => {
        const dot = this.dots().find((d) => d.index === index);
        return dot
          ? {
              x: dot.x - dot.r,
              y: dot.y - dot.r,
              width: dot.r * 2,
              height: dot.r * 2,
            }
          : null;
      },
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    // Once they've grown and are still (Recharts').
    if (this.grown() < 1 || this.moving.animating()) return [];
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

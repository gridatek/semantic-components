import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
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

interface ScFunnelChartStage {
  index: number;
  path: string;
  color: string;
  cx: number;
  cy: number;
  /** Half its top's width. */
  half: number;
  /** Its top and bottom edges. */
  top: number;
  bottom: number;
}

/**
 * A series as a funnel: a stage per row, top to bottom, each as wide as its
 * value (the largest, the plot's width) narrowing to the next one's, in its
 * category's color (`--color-<category>`).
 */
@Component({
  selector: 'g[scChartFunnel]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartFunnel }],
  template: `
    @for (stage of stages(); track stage.index) {
      <svg:path
        [attr.d]="stage.path"
        [attr.fill]="stage.color"
        [attr.fill-opacity]="stage.index === active() ? 1 : 0.85"
        (pointerenter)="point(stage.index)"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-funnel',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartFunnel implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows: each stage's value. */
  readonly key = input.required<string>();
  /** The space between stages, in px. */
  readonly gap = input(2);
  /**
   * Its stages grow out of their centers when it appears, and move to their
   * new places when its data changes (Recharts'); not with reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before they grow, in ms. */
  readonly animationBegin = input(400);
  /** How long they grow, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');
  /** How its stages before and after a change are paired (Recharts'): the first with the first. */
  readonly animationMatchBy = input<ScChartAnimationMatchBy>('append');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  private readonly grown = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );

  protected readonly active = this.state.activeIndex;

  /** Its stages where they belong now: their center, half widths and half height. */
  private readonly targets = computed(() => {
    const rows = this.state.data();
    const values = rows.map((row) => numberOf(row[this.key()]));
    const max = Math.max(1, ...values);
    const { left, top, right, bottom } = this.state.area();
    const width = right - left;
    const height = (bottom - top) / Math.max(1, rows.length);
    const gap = this.gap();
    const matchBy = this.animationMatchBy();
    return values.map((value, index) => {
      const next = index + 1 < values.length ? values[index + 1] : value * 0.6;
      return {
        index,
        id: typeof matchBy === 'function' ? matchBy(rows[index], index) : null,
        cx: (left + right) / 2,
        cy: top + (index + 0.5) * height,
        half: (width * value) / max / 2,
        narrow: (width * next) / max / 2,
        reach: height / 2 - gap / 2,
      };
    });
  });

  /**
   * Its stages moving to their new places when they change (Recharts'):
   * matched ones from where they were, new ones out of their center.
   */
  private readonly moving = scChartTransition({
    items: this.targets,
    active: this.isAnimationActive,
    matchBy: this.animationMatchBy,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
    interpolate: (items, time) =>
      items.flatMap((item) => {
        if (item.status === 'removed') return [];
        const { next } = item;
        const prev =
          item.status === 'matched'
            ? item.prev
            : { ...next, half: 0, narrow: 0, reach: 0 };
        return [
          {
            ...next,
            cx: between(prev.cx, next.cx, time),
            cy: between(prev.cy, next.cy, time),
            half: between(prev.half, next.half, time),
            narrow: between(prev.narrow, next.narrow, time),
            reach: between(prev.reach, next.reach, time),
          },
        ];
      }),
  });

  protected readonly stages = computed<ScFunnelChartStage[]>(() => {
    const categories = this.state.categories();
    // Growing in: each stage out of its own center, its widths and height.
    const grown = this.grown();
    return this.moving.items().map((stage) => {
      const { index, cx, cy } = stage;
      const half = stage.half * grown;
      const narrow = stage.narrow * grown;
      const y0 = cy - stage.reach * grown;
      const y1 = cy + stage.reach * grown;
      return {
        index,
        cx,
        cy,
        half,
        top: y0,
        bottom: y1,
        color: `var(--color-${categories[index]})`,
        path: `M${cx - half},${y0}H${cx + half}L${cx + narrow},${y1}H${cx - narrow}Z`,
      };
    });
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'funnel',
      stack: computed(() => null),
      colorBy: computed(() => 'category' as const),
      // The keyboard's item: its stage.
      anchor: (index) => {
        const stage = this.stages().find((s) => s.index === index);
        return stage
          ? {
              x: stage.cx - stage.half,
              y: stage.top,
              width: stage.half * 2,
              height: stage.bottom - stage.top,
            }
          : null;
      },
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  protected point(index: number): void {
    this.state.activeIndex.set(index);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    // Once they've grown and are still (Recharts').
    if (this.grown() < 1 || this.moving.animating()) return [];
    const rows = this.state.data();
    return this.stages().map((stage) => {
      const value = numberOf(rows[stage.index]?.[this.key()]);
      // Outside: beyond its right edge; else in its middle.
      return position === 'outside'
        ? {
            index: stage.index,
            value,
            x: stage.cx + stage.half + offset,
            y: stage.cy,
            anchor: 'start',
            baseline: 'middle',
          }
        : {
            index: stage.index,
            value,
            x: stage.cx,
            y: stage.cy,
            anchor: 'middle',
            baseline: 'middle',
          };
    });
  }
}

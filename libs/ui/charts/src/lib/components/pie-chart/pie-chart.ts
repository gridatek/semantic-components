import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { arc, pie } from 'd3-shape';
import {
  type ScChartAnimationEasing,
  type ScChartAnimationItem,
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
  anchorAt,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';

interface ScPieChartSlice {
  index: number;
  path: string;
  color: string;
  /** Its middle angle, and its radii (px). */
  middle: number;
  inner: number;
  outer: number;
}

/** A slice's angles, before it's drawn. */
interface ScPieChartAngles {
  index: number;
  /** Its row's key, to match it by (`animationMatchBy`). */
  id: string | number | null;
  start: number;
  end: number;
  pad: number;
}

/**
 * Recharts' pie step: the slices one after another from the first's start,
 * each its angle on the way from its old one (a new one's from 0); gone ones
 * leave.
 */
function stepSlices(
  items: readonly ScChartAnimationItem<ScPieChartAngles>[],
  time: number,
): ScPieChartAngles[] {
  const first = items.find((item) => item.status !== 'removed');
  let angle = first ? first.next.start : 0;
  return items.flatMap((item) => {
    if (item.status === 'removed') return [];
    const span = item.next.end - item.next.start;
    const from =
      item.status === 'matched' ? item.prev.end - item.prev.start : 0;
    const start = angle;
    angle += between(from, span, time);
    return [{ ...item.next, start, end: angle }];
  });
}

/** A point at an angle (0 at the top, clockwise) and a radius, around (0, 0). */
const around = (angle: number, radius: number) => ({
  x: radius * Math.sin(angle),
  y: -radius * Math.cos(angle),
});

/**
 * A series as a pie: a slice per row, its share of the total, in its
 * category's color (`--color-<category>`). A donut with an `innerRadius`;
 * rings, with pies of different radii.
 */
@Component({
  selector: 'g[scChartPie]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartPie }],
  template: `
    @for (slice of slices(); track slice.index) {
      <svg:path
        class="stroke-background"
        [attr.d]="slice.path"
        [attr.fill]="slice.color"
        [attr.stroke-width]="strokeWidth()"
        (pointerenter)="point(slice.index)"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-pie',
    '[attr.data-key]': 'key()',
    '[attr.transform]': 'transform()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartPie implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows: each slice's value. */
  readonly key = input.required<string>();
  /** Its hole, as a share of the radius (0: a pie; 0.6: a donut). */
  readonly innerRadius = input(0);
  /** Its edge, as a share of the radius. */
  readonly outerRadius = input(1);
  /** The gap between slices, in degrees. */
  readonly padAngle = input(0);
  /**
   * Its slices' corners' rounding, in px. Unset: a donut's or a ring's the
   * style's (the preset's `--chart-bar-radius`); a whole pie's none — its
   * slices meet in the middle.
   */
  readonly cornerRadius = input<number | undefined>(undefined);
  /** The line between slices, in px (0: none). */
  readonly strokeWidth = input(2);
  /** How far the slice pointed at grows, in px. */
  readonly activeOffset = input(6);
  /**
   * It sweeps round from its start angle when it appears, and its slices
   * move to their new angles when its data changes (Recharts'); not with
   * reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before it sweeps, in ms. */
  readonly animationBegin = input(400);
  /** How long it sweeps or changes, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');
  /** How its slices before and after a change are paired (Recharts'): the first with the first. */
  readonly animationMatchBy = input<ScChartAnimationMatchBy>('append');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    start: this.state.seen,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  private readonly swept = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );

  /** Its slices' angles where they belong now. */
  private readonly targets = computed<ScPieChartAngles[]>(() => {
    const rows = this.state.data();
    const key = this.key();
    const matchBy = this.animationMatchBy();
    const [start, end] = this.state.angles();
    return pie<number>()
      .value((index) => numberOf(rows[index][key]))
      .sort(null)
      .startAngle(start)
      .endAngle(end)
      .padAngle((this.padAngle() * Math.PI) / 180)(rows.map((_, i) => i))
      .map((a) => ({
        index: a.data,
        id:
          typeof matchBy === 'function' ? matchBy(rows[a.data], a.data) : null,
        start: a.startAngle,
        end: a.endAngle,
        pad: a.padAngle,
      }));
  });

  /** Its slices moving to their new angles when they change. */
  private readonly moving = scChartTransition({
    items: this.targets,
    ready: this.state.measured,
    active: this.isAnimationActive,
    matchBy: this.animationMatchBy,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
    interpolate: stepSlices,
  });

  protected readonly transform = computed(() => {
    const { cx, cy } = this.state.circle();
    return `translate(${cx},${cy})`;
  });

  protected readonly slices = computed<ScPieChartSlice[]>(() => {
    const categories = this.state.categories();
    const [origin] = this.state.angles();
    // Sweeping in: the slices share the arc drawn so far.
    const swept = this.swept();
    const at = (angle: number) => origin + (angle - origin) * swept;
    const { radius } = this.state.circle();
    const active = this.state.activeIndex();
    const arcs = this.moving.items().map((slice) => ({
      data: slice.index,
      startAngle: at(slice.start),
      endAngle: at(slice.end),
      padAngle: slice.pad,
    }));
    return arcs.map((a) => ({
      index: a.data,
      middle: (a.startAngle + a.endAngle) / 2,
      inner: radius * this.innerRadius(),
      outer: radius * this.outerRadius(),
      color: `var(--color-${categories[a.data]})`,
      path:
        arc()
          .innerRadius(radius * this.innerRadius())
          .outerRadius(
            radius * this.outerRadius() +
              (a.data === active ? this.activeOffset() : 0),
          )
          .cornerRadius(
            this.cornerRadius() ??
              (this.innerRadius() > 0 ? this.state.barRadius() : 0),
          )({
          innerRadius: 0,
          outerRadius: 0,
          startAngle: a.startAngle,
          endAngle: a.endAngle,
          padAngle: a.padAngle,
        }) ?? '',
    }));
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'pie',
      stack: computed(() => null),
      colorBy: computed(() => 'category' as const),
      // The keyboard's item: its slice's outer edge, at its middle.
      anchor: (index) => {
        const slice = this.slices().find((s) => s.index === index);
        if (!slice) return null;
        const { cx, cy } = this.state.circle();
        const p = around(slice.middle, slice.outer);
        return { x: cx + p.x, y: cy + p.y, width: 0, height: 0 };
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
    // Once it's whole and still (Recharts').
    if (this.swept() < 1 || this.moving.animating()) return [];
    const rows = this.state.data();
    return this.slices().map((slice) => {
      const value = numberOf(rows[slice.index]?.[this.key()]);
      // Outside: beyond its edge; else in its middle.
      if (position === 'outside')
        return {
          index: slice.index,
          value,
          ...around(slice.middle, slice.outer + offset),
          anchor: anchorAt(slice.middle),
          baseline: 'middle',
        };
      return {
        index: slice.index,
        value,
        ...around(slice.middle, (slice.inner + slice.outer) / 2),
        anchor: 'middle',
        baseline: 'middle',
      };
    });
  }
}

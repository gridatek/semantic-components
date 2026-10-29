import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { arc, pie } from 'd3-shape';
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
  readonly cornerRadius = input(0);
  /** The line between slices, in px (0: none). */
  readonly strokeWidth = input(2);
  /** How far the slice pointed at grows, in px. */
  readonly activeOffset = input(6);

  protected readonly transform = computed(() => {
    const { cx, cy } = this.state.circle();
    return `translate(${cx},${cy})`;
  });

  protected readonly slices = computed<ScPieChartSlice[]>(() => {
    const rows = this.state.data();
    const key = this.key();
    const categories = this.state.categories();
    const [start, end] = this.state.angles();
    const { radius } = this.state.circle();
    const active = this.state.activeIndex();
    const arcs = pie<number>()
      .value((index) => numberOf(rows[index][key]))
      .sort(null)
      .startAngle(start)
      .endAngle(end)
      .padAngle((this.padAngle() * Math.PI) / 180)(rows.map((_, i) => i));
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
          .cornerRadius(this.cornerRadius())({
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

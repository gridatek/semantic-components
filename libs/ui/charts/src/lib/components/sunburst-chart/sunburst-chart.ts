import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { arc } from 'd3-shape';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
  anchorAt,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';

interface ScSunburstChartRing {
  /** A leaf's row; a group's, -1. */
  index: number;
  name: string;
  path: string;
  color: string;
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
 * A series as a sunburst: its rows' groups (`groupKey`) as an inner ring, each
 * its rows' total, and the rows around them, in their group's color
 * (`--color-<group>`).
 */
@Component({
  selector: 'g[scChartSunburst]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartSunburst }],
  template: `
    @for (group of groups(); track group.name) {
      <svg:path
        class="stroke-background"
        [attr.d]="group.path"
        [attr.fill]="group.color"
        [attr.stroke-width]="strokeWidth()"
      />
    }
    @for (leaf of leaves(); track leaf.index) {
      <svg:path
        class="stroke-background"
        [attr.d]="leaf.path"
        [attr.fill]="leaf.color"
        [attr.fill-opacity]="leaf.index === active() ? 1 : 0.7"
        [attr.stroke-width]="strokeWidth()"
        (pointerenter)="point(leaf.index)"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-sunburst',
    '[attr.data-key]': 'key()',
    '[attr.transform]': 'transform()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartSunburst implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows: each row's value. */
  readonly key = input.required<string>();
  /** The key of each row's group: the inner ring. */
  readonly groupKey = input.required<string>();
  /** Its hole, as a share of the radius. */
  readonly innerRadius = input(0.3);
  /** Where the groups' ring ends and the rows' begins, as a share of the radius. */
  readonly splitRadius = input(0.65);
  /** The line between slices, in px (0: none). */
  readonly strokeWidth = input(2);

  protected readonly active = this.state.activeIndex;

  protected readonly transform = computed(() => {
    const { cx, cy } = this.state.circle();
    return `translate(${cx},${cy})`;
  });

  private readonly groupOf = (index: number) =>
    String(this.state.data()[index]?.[this.groupKey()] ?? '');

  /** The rows, by group, in the order the groups come in. */
  private readonly order = computed(() => {
    const rows = this.state.data();
    const names = [...new Set(rows.map((_, index) => this.groupOf(index)))];
    return names.map((name) => ({
      name,
      indices: rows.map((_, i) => i).filter((i) => this.groupOf(i) === name),
    }));
  });

  private readonly rings = computed(() => {
    const rows = this.state.data();
    const key = this.key();
    const [start, end] = this.state.angles();
    const { radius } = this.state.circle();
    const value = (index: number) => Math.max(0, numberOf(rows[index][key]));
    const total = rows.reduce((sum, _, index) => sum + value(index), 0) || 1;
    const per = (end - start) / total;
    const inner = radius * this.innerRadius();
    const split = radius * this.splitRadius();
    const path = (a0: number, a1: number, r0: number, r1: number) =>
      arc()({
        innerRadius: r0,
        outerRadius: r1,
        startAngle: a0,
        endAngle: a1,
      }) ?? '';
    const groups: ScSunburstChartRing[] = [];
    const leaves: ScSunburstChartRing[] = [];
    let angle = start;
    for (const group of this.order()) {
      const from = angle;
      const color = `var(--color-${group.name})`;
      for (const index of group.indices) {
        const to = angle + value(index) * per;
        leaves.push({
          index,
          name: this.state.categories()[index],
          path: path(angle, to, split, radius),
          color,
          middle: (angle + to) / 2,
          inner: split,
          outer: radius,
        });
        angle = to;
      }
      groups.push({
        index: -1,
        name: group.name,
        path: path(from, angle, inner, split),
        color,
        middle: (from + angle) / 2,
        inner,
        outer: split,
      });
    }
    return { groups, leaves };
  });

  protected readonly groups = computed(() => this.rings().groups);
  protected readonly leaves = computed(() => this.rings().leaves);

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'sunburst',
      stack: computed(() => null),
      colorBy: computed(() => 'category' as const),
      colorOf: (index) => `var(--color-${this.groupOf(index)})`,
      legend: computed(() => this.order().map((group) => group.name)),
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
    return this.leaves()
      .map((leaf) => {
        const value = numberOf(rows[leaf.index]?.[this.key()]);
        // Outside: beyond its edge; else in its middle.
        if (position === 'outside')
          return {
            index: leaf.index,
            value,
            ...around(leaf.middle, leaf.outer + offset),
            anchor: anchorAt(leaf.middle),
            baseline: 'middle' as const,
          };
        return {
          index: leaf.index,
          value,
          ...around(leaf.middle, (leaf.inner + leaf.outer) / 2),
          anchor: 'middle' as const,
          baseline: 'middle' as const,
        };
      })
      .sort((a, b) => a.index - b.index);
  }
}

import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';

/** Corners' radii: top start, top end, bottom end, bottom start. */
export type ScChartRadius = number | readonly [number, number, number, number];

/** A rectangle with each corner's own radius (clamped to fit). */
function roundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  [tl, tr, br, bl]: readonly [number, number, number, number],
): string {
  const max = Math.min(width, height) / 2;
  const [a, b, c, d] = [tl, tr, br, bl].map((r) =>
    Math.max(0, Math.min(r, max)),
  );
  return [
    `M${x + a},${y}`,
    `H${x + width - b}`,
    `A${b},${b} 0 0 1 ${x + width},${y + b}`,
    `V${y + height - c}`,
    `A${c},${c} 0 0 1 ${x + width - c},${y + height}`,
    `H${x + d}`,
    `A${d},${d} 0 0 1 ${x},${y + height - d}`,
    `V${y + a}`,
    `A${a},${a} 0 0 1 ${x + a},${y}`,
    'Z',
  ].join('');
}

interface Bar {
  index: number;
  path: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Its value is at or above its base. */
  up: boolean;
}

/**
 * A series as bars: one per category, side by side with the other series' —
 * or on one another, within a `stack`. Below 0, downwards; across, in a
 * `vertical` layout. In `--color-<key>`. Labels: a `g[scChartLabels]` inside.
 */
@Component({
  selector: 'g[scChartBar]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartBar }],
  template: `
    @for (bar of bars(); track bar.index) {
      <svg:path [attr.d]="bar.path" [attr.fill]="fill() || color()" />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-bar',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartBar implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  /** Bars of a stack are drawn on one another. */
  readonly stack = input<string | null>(null);
  /**
   * Its corners' radius — one, or each: `[4, 4, 0, 0]` (its end's two, then
   * its base's). Below 0 or across, turned with it.
   */
  readonly radius = input<ScChartRadius>(4);
  /** Instead of its color: `url(#gradient)`. */
  readonly fill = input('');

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  protected readonly bars = computed<Bar[]>(() => {
    const categories = this.state.categoryScale();
    const values = this.state.valueScale();
    const vertical = this.state.vertical();
    const slots = this.state.barSlots();
    const offset = slots(this.stack() ?? `\u0000${this.key()}`) ?? 0;
    const thickness = slots.bandwidth();
    const radius = this.radius();
    const [ts, te, be, bs] =
      typeof radius === 'number'
        ? ([radius, radius, radius, radius] as const)
        : radius;
    return (this.state.extents().get(this.key()) ?? []).map(
      ([low, high], index) => {
        const a = values(low);
        const b = values(high);
        const up = high >= low;
        const start = (categories(index) ?? 0) + offset;
        const box = vertical
          ? {
              x: Math.min(a, b),
              y: start,
              width: Math.abs(a - b),
              height: thickness,
            }
          : {
              x: start,
              y: Math.min(a, b),
              width: thickness,
              height: Math.abs(a - b),
            };
        // Screen corners (top left, top right, bottom right, bottom left) from
        // its end's and its base's: turned a quarter across, mirrored below 0.
        const corners: readonly [number, number, number, number] = vertical
          ? up
            ? [bs, ts, te, be]
            : [ts, bs, be, te]
          : up
            ? [ts, te, be, bs]
            : [bs, be, te, ts];
        return {
          index,
          up,
          ...box,
          path: roundedRect(box.x, box.y, box.width, box.height, corners),
        };
      },
    );
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'bar',
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
    return this.bars().map((bar) => {
      const value = numberOf(rows[bar.index]?.[this.key()]);
      const middle = {
        x: bar.x + bar.width / 2,
        y: bar.y + bar.height / 2,
      };
      if (position === 'inside')
        return {
          index: bar.index,
          value,
          ...middle,
          anchor: 'middle',
          baseline: 'middle',
        };
      // Its end (outside, beyond it) or its base (start, within it).
      const atEnd = position === 'outside';
      // Both run the bar's way: beyond its end, or in from its base.
      const forward = bar.up;
      if (vertical) {
        const edge = bar.up ? bar.x + bar.width : bar.x;
        const base = bar.up ? bar.x : bar.x + bar.width;
        return {
          index: bar.index,
          value,
          x: atEnd
            ? edge + (bar.up ? offset : -offset)
            : base + (bar.up ? offset : -offset),
          y: middle.y,
          anchor: forward ? 'start' : 'end',
          baseline: 'middle',
        };
      }
      const edge = bar.up ? bar.y : bar.y + bar.height;
      const base = bar.up ? bar.y + bar.height : bar.y;
      return {
        index: bar.index,
        value,
        x: middle.x,
        y: atEnd
          ? edge + (bar.up ? -offset : offset)
          : base + (bar.up ? -offset : offset),
        anchor: 'middle',
        baseline: forward ? 'auto' : 'hanging',
      };
    });
  }
}

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
  scChartEntrance,
} from '../chart/chart-animation';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';

/**
 * Which corners are rounded — by how much is the style's (`--chart-bar-radius`,
 * set by the preset): all, the bar's end's two, its base's two, or none.
 */
export type ScChartBarCorners = 'all' | 'end' | 'base' | 'none';

interface ScBarChartBar {
  index: number;
  /** Its colour: its key's, or its category's (`colorBy`). */
  color: string;
  /**
   * What is drawn, in the bar's own box (an `svg` its size, which hides what
   * overflows): the bar, longer past the side left square.
   */
  shape: { x: number; y: number; width: number; height: number };
  x: number;
  y: number;
  width: number;
  height: number;
  /** Its value is at or above its base. */
  up: boolean;
}

/** The rect drawn in a bar's box: the box, longer past the side left square. */
function shapeOf(
  { width, height }: { width: number; height: number },
  corners: ScChartBarCorners,
  vertical: boolean,
  up: boolean,
  past: number,
): ScBarChartBar['shape'] {
  if (corners === 'all' || corners === 'none')
    return { x: 0, y: 0, width, height };
  // The square side: its base (rounded at its end), or its end.
  const squareAtBase = corners === 'end';
  // Where the base is on screen: left of a bar across (up), under a column (up).
  const baseIsStart = vertical ? up : !up;
  const extendStart = squareAtBase === baseIsStart;
  return vertical
    ? { x: extendStart ? -past : 0, y: 0, width: width + past, height }
    : { x: 0, y: extendStart ? -past : 0, width, height: height + past };
}

/**
 * A series as bars: one per category, side by side with the other series' —
 * or on one another, within a `stack`. Below 0, downwards; across, in a
 * `vertical` layout. In `--color-<key>`, or each bar its category's (`colorBy`). Labels: a `g[scChartLabels]` inside.
 */
@Component({
  selector: 'g[scChartBar]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartBar }],
  template: `
    @for (bar of bars(); track bar.index) {
      <!-- The bar's box: what overflows it (a square side's corners) is hidden. -->
      <svg:svg
        overflow="hidden"
        [attr.x]="bar.x"
        [attr.y]="bar.y"
        [attr.width]="bar.width"
        [attr.height]="bar.height"
      >
        <svg:rect
          [class]="
            corners() === 'none' ? '' : '[rx:var(--chart-bar-radius,0px)]'
          "
          [attr.x]="bar.shape.x"
          [attr.y]="bar.shape.y"
          [attr.width]="bar.shape.width"
          [attr.height]="bar.shape.height"
          [attr.fill]="fill() || bar.color"
        />
      </svg:svg>
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
  /** Its color: its key's, or each row's category's (a colour per bar, from the config). */
  readonly colorBy = input<'key' | 'category'>('key');
  /**
   * Its rounded corners: all, its end's two (`end`: the top of a column),
   * its base's two (`base`), or none — turned with it below 0 or across.
   * How round is the style's: the preset sets `--chart-bar-radius`.
   */
  readonly corners = input<ScChartBarCorners>('all');
  /** Instead of its color: `url(#gradient)`. */
  readonly fill = input('');
  /** Its width in pixels, centered in its slot (Recharts' `barSize`); the slot's by default. */
  readonly barSize = input<number | undefined>(undefined);
  /** Its widest, in pixels (Recharts' `maxBarSize`): a narrower slot keeps its width. */
  readonly maxBarSize = input<number | undefined>(undefined);
  /** Its bars grow from their base when it appears (Recharts'); not with reduced motion. */
  readonly isAnimationActive = input(true);
  /** The wait before they grow, in ms. */
  readonly animationBegin = input(0);
  /** How long they grow, in ms. */
  readonly animationDuration = input(400);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  protected readonly bars = computed<ScBarChartBar[]>(() => {
    const categories = this.state.categoryScale();
    const values = this.state.valueScale();
    const vertical = this.state.vertical();
    const slots = this.state.barSlots();
    const slot = slots.bandwidth();
    const thickness = Math.min(
      this.barSize() ?? slot,
      this.maxBarSize() ?? Number.POSITIVE_INFINITY,
    );
    // Narrower than its slot: centered in it.
    const offset =
      (slots(this.stack() ?? `\u0000${this.key()}`) ?? 0) +
      (slot - thickness) / 2;
    const corners = this.corners();
    // Past the square side by half its thickness: more than any corner can be
    // (a rect's rx is at most half its width).
    const past = thickness / 2;
    const names = this.state.categories();
    const byCategory = this.colorBy() === 'category';
    // Growing from its base: its end on the way to its value.
    const grown = this.isAnimationActive() ? this.entrance() : 1;
    return (this.state.extents().get(this.key()) ?? []).map(
      ([low, high], index) => {
        const a = values(low);
        const b = values(low + (high - low) * grown);
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
        return {
          index,
          up,
          color: byCategory ? `var(--color-${names[index]})` : this.color(),
          ...box,
          shape: shapeOf(box, corners, vertical, up, past),
        };
      },
    );
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'bar',
      colorBy: this.colorBy,
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

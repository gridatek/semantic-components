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

/** A bar before it's boxed: where it runs, across and along the values. */
interface ScBarChartTarget {
  index: number;
  /** Its row's key, to match it by (`animationMatchBy`). */
  id: string | number | null;
  color: string;
  up: boolean;
  /** Across: where it starts, and its thickness. */
  start: number;
  thickness: number;
  /** Along the values: its base and its end. */
  base: number;
  end: number;
}

/** Recharts' bar step: matched bars move, new ones grow from their base, gone ones shrink to it. */
function stepBars(
  items: readonly ScChartAnimationItem<ScBarChartTarget>[],
  time: number,
): ScBarChartTarget[] {
  return items.map((item) => {
    if (item.status === 'added')
      return {
        ...item.next,
        end: between(item.next.base, item.next.end, time),
      };
    if (item.status === 'removed')
      return {
        ...item.prev,
        end: between(item.prev.end, item.prev.base, time),
      };
    return {
      ...item.next,
      start: between(item.prev.start, item.next.start, time),
      thickness: between(item.prev.thickness, item.next.thickness, time),
      base: between(item.prev.base, item.next.base, time),
      end: between(item.prev.end, item.next.end, time),
    };
  });
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
  /**
   * Its bars grow from their base when it appears, and move to their new
   * places when its data changes (Recharts'); not with reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before they grow or move, in ms. */
  readonly animationBegin = input(0);
  /** How long they grow or move, in ms. */
  readonly animationDuration = input(400);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');
  /** How its bars before and after a change are paired (Recharts'): the first with the first. */
  readonly animationMatchBy = input<ScChartAnimationMatchBy>('append');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  /** Its bars where they belong now: no entrance, no change under way. */
  private readonly targets = computed<ScBarChartTarget[]>(() => {
    const categories = this.state.categoryScale();
    const values = this.state.valueScale();
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
    const names = this.state.categories();
    const rows = this.state.data();
    const byCategory = this.colorBy() === 'category';
    const matchBy = this.animationMatchBy();
    return (this.state.extents().get(this.key()) ?? []).map(
      ([low, high], index) => ({
        index,
        id: typeof matchBy === 'function' ? matchBy(rows[index], index) : null,
        color: byCategory ? `var(--color-${names[index]})` : this.color(),
        up: high >= low,
        start: (categories(index) ?? 0) + offset,
        thickness,
        base: values(low),
        end: values(high),
      }),
    );
  });

  /** Its bars moving to their new places when they change. */
  private readonly moving = scChartTransition({
    items: this.targets,
    active: this.isAnimationActive,
    matchBy: this.animationMatchBy,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
    interpolate: stepBars,
  });

  protected readonly bars = computed<ScBarChartBar[]>(() => {
    const vertical = this.state.vertical();
    const corners = this.corners();
    // Growing from its base: its end on the way to its value.
    const grown = this.isAnimationActive() ? this.entrance() : 1;
    return this.moving.items().map((bar) => {
      const a = bar.base;
      const b = between(bar.base, bar.end, grown);
      const box = vertical
        ? {
            x: Math.min(a, b),
            y: bar.start,
            width: Math.abs(a - b),
            height: bar.thickness,
          }
        : {
            x: bar.start,
            y: Math.min(a, b),
            width: bar.thickness,
            height: Math.abs(a - b),
          };
      // Past the square side by half its thickness: more than any corner can
      // be (a rect's rx is at most half its width).
      return {
        index: bar.index,
        up: bar.up,
        color: bar.color,
        ...box,
        shape: shapeOf(box, corners, vertical, bar.up, bar.thickness / 2),
      };
    });
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
    // Once its bars are still (Recharts').
    const still = !this.isAnimationActive() || this.entrance() === 1;
    if (!still || this.moving.animating()) return [];
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

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
  /** On screen, its end is further along than its base (rightwards, or down). */
  forward: boolean;
  /** Its rounded corners here: in a stack, only where the stack ends. */
  corners: ScChartBarCorners;
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
  /** In its stack, here: no bar beyond its end (outer), none under its base (inner). */
  outer: boolean;
  inner: boolean;
}

/**
 * A bar's corners where it is in its stack: the stack rounds as one bar —
 * its end's corners on the outermost bar, its base's on the innermost,
 * whichever series they are in each category.
 */
function cornersIn(
  corners: ScChartBarCorners,
  outer: boolean,
  inner: boolean,
): ScChartBarCorners {
  const end = (corners === 'all' || corners === 'end') && outer;
  const base = (corners === 'all' || corners === 'base') && inner;
  return end && base ? 'all' : end ? 'end' : base ? 'base' : 'none';
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
  forward: boolean,
  past: number,
): ScBarChartBar['shape'] {
  if (corners === 'all' || corners === 'none')
    return { x: 0, y: 0, width, height };
  // The square side: its base (rounded at its end), or its end.
  const squareAtBase = corners === 'end';
  // Where the base is on screen: first (left, or top) when the bar runs on
  // from it — whichever way the values run.
  const baseIsStart = forward;
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
            bar.corners === 'none' ? '' : '[rx:var(--chart-bar-radius,0px)]'
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
   * In a `stack`, the stack's: rounded as one bar, wherever it ends in each
   * category (a series at 0 there leaves its corners to the next).
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
    start: this.state.seen,
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
    const extents = this.state.extents();
    // The other bars of its stack: what lies beyond its end, or under its base.
    const stack = this.stack();
    const others =
      stack === null
        ? []
        : this.state
            .series()
            .filter(
              (s) =>
                s.kind === 'bar' &&
                s.stack() === stack &&
                s.key() !== this.key(),
            )
            .map((s) => extents.get(s.key()) ?? []);
    const near = 1e-9;
    return (extents.get(this.key()) ?? []).map(([low, high], index) => {
      const up = high >= low;
      const shown = others
        .map((extent) => extent[index])
        .filter((pair) => pair && pair[0] !== pair[1]);
      // Up: a bar above starts at or past its end; one under ends at or
      // before its base. Down (below 0): the same, the other way.
      const outer = !shown.some(([l, h]) =>
        up ? h > l && l >= high - near : h < l && l <= high + near,
      );
      const inner = !shown.some(([l, h]) =>
        up ? h > l && h <= low + near : h < l && h >= low - near,
      );
      return {
        index,
        outer,
        inner,
        id: typeof matchBy === 'function' ? matchBy(rows[index], index) : null,
        color: byCategory ? `var(--color-${names[index]})` : this.color(),
        up,
        start: (categories(index) ?? 0) + offset,
        thickness,
        base: values(low),
        end: values(high),
      };
    });
  });

  /** Its bars moving to their new places when they change. */
  private readonly moving = scChartTransition({
    items: this.targets,
    ready: this.state.measured,
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
      // Which way it runs on screen: from its base towards its value.
      const forward =
        bar.end === bar.base ? vertical === bar.up : bar.end > bar.base;
      // In a stack, rounded only where the stack ends.
      const here = cornersIn(corners, bar.outer, bar.inner);
      // Past the square side by half its thickness: more than any corner can
      // be (a rect's rx is at most half its width).
      return {
        index: bar.index,
        up: bar.up,
        forward,
        corners: here,
        color: bar.color,
        ...box,
        shape: shapeOf(box, here, vertical, forward, bar.thickness / 2),
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
      // Its end (outside, beyond it) or its base (start, within it), both
      // the way it runs on screen.
      const atEnd = position === 'outside';
      const step = bar.forward ? offset : -offset;
      if (vertical) {
        const end = bar.forward ? bar.x + bar.width : bar.x;
        const base = bar.forward ? bar.x : bar.x + bar.width;
        return {
          index: bar.index,
          value,
          x: (atEnd ? end : base) + step,
          y: middle.y,
          anchor: bar.forward ? 'start' : 'end',
          baseline: 'middle',
        };
      }
      const end = bar.forward ? bar.y + bar.height : bar.y;
      const base = bar.forward ? bar.y : bar.y + bar.height;
      return {
        index: bar.index,
        value,
        x: middle.x,
        y: (atEnd ? end : base) + step,
        anchor: 'middle',
        baseline: bar.forward ? 'hanging' : 'auto',
      };
    });
  }
}

import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { type ScEasing } from '@semantic-components/ui';
import { cn } from 'cn';
import { area, line } from 'd3-shape';
import {
  type ScChartAnimationItem,
  type ScChartAnimationMatchBy,
  scChartInterpolate as between,
  scChartEntrance,
  scChartTransition,
} from '../chart/chart-animation';
import { curveOf } from '../chart/chart-curve';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
} from '../chart/chart-series';
import { ScChartState, numberOf } from '../chart/chart-state';
import type { ScChartCurve } from '../chart/chart-types';

interface ScAreaChartPoint {
  /** Its value. */
  x: number;
  y: number;
  /** Its base: 0, or the series under it. */
  bx: number;
  by: number;
  /** Its row's key, to match it by (`animationMatchBy`). */
  id?: string | number | null;
}

/** Recharts' area step: matched points move, with their base; new ones are there at once; gone ones go. */
function stepArea(
  items: readonly ScChartAnimationItem<ScAreaChartPoint>[],
  time: number,
): ScAreaChartPoint[] {
  return items.flatMap((item) => {
    if (item.status === 'removed') return [];
    if (item.status === 'added') return [item.next];
    const { prev, next } = item;
    return [
      {
        ...next,
        x: between(prev.x, next.x, time),
        y: between(prev.y, next.y, time),
        bx: between(prev.bx, next.bx, time),
        by: between(prev.by, next.by, time),
      },
    ];
  });
}

/**
 * A series as an area: its values (`key`) filled down to 0 — or onto the
 * series under it in its `stack`. Its color: `--color-<key>`, or `fill`
 * (a gradient of yours: `url(#…)`).
 */
@Component({
  selector: 'g[scChartArea]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartArea }],
  template: `
    @if (reveal(); as r) {
      <svg:clipPath [attr.id]="clipId">
        <svg:rect
          [attr.x]="r.x"
          [attr.y]="r.y"
          [attr.width]="r.width"
          [attr.height]="r.height"
        />
      </svg:clipPath>
    }
    <svg:path
      [attr.d]="areaPath()"
      [attr.fill]="fill() || color()"
      [attr.fill-opacity]="fillOpacity()"
      [attr.clip-path]="reveal() ? 'url(#' + clipId + ')' : null"
    />
    <svg:path
      [attr.d]="edgePath()"
      [attr.stroke]="color()"
      stroke-width="2"
      fill="none"
      [attr.clip-path]="reveal() ? 'url(#' + clipId + ')' : null"
    />
    @if (activePoint(); as p) {
      <svg:circle
        class="stroke-background"
        [attr.cx]="p.x"
        [attr.cy]="p.y"
        r="4"
        stroke-width="2"
        [attr.fill]="color()"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-area',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartArea implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  readonly curve = input<ScChartCurve>('natural');
  /** Areas of a stack are drawn on one another. */
  readonly stack = input<string | null>(null);
  /** Instead of its color: `url(#gradient)`. */
  readonly fill = input('');
  readonly fillOpacity = input(0.4);
  /** A dot where the pointer is. */
  readonly activeDot = input(true, { transform: booleanAttribute });
  /**
   * It unveils itself from its first category when it appears, and moves to
   * its new place when its data changes (Recharts'); not with reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before it unveils or moves, in ms. */
  readonly animationBegin = input(0);
  /** How long it unveils or moves, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScEasing>('ease');
  /** How its points before and after a change are paired (Recharts'): by position, stretched. */
  readonly animationMatchBy = input<ScChartAnimationMatchBy>('index');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    start: this.state.seen,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  private readonly shown = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );
  private readonly clipId = inject(_IdGenerator).getId('sc-chart-area-clip-');

  private readonly color = computed(() => `var(--color-${this.key()})`);

  /** Its points where they belong now. */
  private readonly targets = computed<ScAreaChartPoint[]>(() => {
    const rows = this.state.data();
    const matchBy = this.animationMatchBy();
    return (this.state.extents().get(this.key()) ?? []).map(
      ([low, high], i) => {
        const value = this.state.at(i, high);
        const below = this.state.at(i, low);
        return {
          x: value.x,
          y: value.y,
          bx: below.x,
          by: below.y,
          id: typeof matchBy === 'function' ? matchBy(rows[i], i) : null,
        };
      },
    );
  });

  /** Its points moving to their new places when they change. */
  private readonly moving = scChartTransition({
    items: this.targets,
    ready: this.state.measured,
    active: this.isAnimationActive,
    matchBy: this.animationMatchBy,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
    interpolate: stepArea,
  });

  /** What is drawn: its points, moving or still. */
  private readonly points = this.moving.items;

  private readonly areaPath = computed(() => {
    const vertical = this.state.vertical();
    const shape = vertical
      ? area<ScAreaChartPoint>()
          .y((p) => p.y)
          .x0((p) => p.bx)
          .x1((p) => p.x)
      : area<ScAreaChartPoint>()
          .x((p) => p.x)
          .y0((p) => p.by)
          .y1((p) => p.y);
    return shape.curve(curveOf(this.curve(), vertical))(this.points()) ?? '';
  });

  private readonly edgePath = computed(
    () =>
      line<ScAreaChartPoint>()
        .x((p) => p.x)
        .y((p) => p.y)
        .curve(curveOf(this.curve(), this.state.vertical()))(this.points()) ??
      '',
  );

  /**
   * While it unveils: the clip's box, from its first category towards its
   * last (down, vertical; leftwards, right to left), across everything.
   */
  private readonly reveal = computed(() => {
    const shown = this.shown();
    const points = this.points();
    if (shown >= 1 || points.length === 0) return null;
    const vertical = this.state.vertical();
    const along = (p: ScAreaChartPoint) => (vertical ? p.y : p.x);
    const first = along(points[0]);
    const last = along(points[points.length - 1]);
    // Past the ends by the edge's width: its round caps show whole.
    const pad = Math.sign(last - first || 1) * 2;
    const from = first - pad;
    const to = from + (last + pad - from) * shown;
    const start = Math.min(from, to);
    const length = Math.abs(to - from);
    const across = { start: -1e5, length: 2e5 };
    return vertical
      ? { x: across.start, y: start, width: across.length, height: length }
      : { x: start, y: across.start, width: length, height: across.length };
  });

  private readonly activePoint = computed(() => {
    const index = this.state.activeIndex();
    return this.activeDot() && index !== null ? this.targets()[index] : null;
  });

  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'area',
      stack: this.stack,
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    // Once it's whole and still (Recharts').
    if (this.shown() < 1 || this.moving.animating()) return [];
    const rows = this.state.data();
    const vertical = this.state.vertical();
    const backwards = this.state.valueReversed();
    return this.targets().map((p, index) => {
      const value = numberOf(rows[index]?.[this.key()]);
      if (position === 'inside')
        return {
          index,
          value,
          x: (p.x + p.bx) / 2,
          y: (p.y + p.by) / 2,
          anchor: 'middle',
          baseline: 'middle',
        };
      return vertical
        ? {
            index,
            value,
            // Beyond its value: the way the values run (leftwards, reversed).
            x: p.x + (backwards ? -offset : offset),
            y: p.y,
            anchor: backwards ? 'end' : 'start',
            baseline: 'middle',
          }
        : {
            index,
            value,
            x: p.x,
            // Beyond its value: above it, or below when the values run down.
            y: p.y + (backwards ? offset : -offset),
            anchor: 'middle',
            baseline: backwards ? 'hanging' : 'auto',
          };
    });
  }
}

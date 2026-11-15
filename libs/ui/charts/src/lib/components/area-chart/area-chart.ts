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
import { cn } from 'cn';
import { area, line } from 'd3-shape';
import {
  type ScChartAnimationEasing,
  scChartEntrance,
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
  /** It unveils itself from its first category when it appears (Recharts'); not with reduced motion. */
  readonly isAnimationActive = input(true);
  /** The wait before it unveils, in ms. */
  readonly animationBegin = input(0);
  /** How long it unveils, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  private readonly shown = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );
  private readonly clipId = inject(_IdGenerator).getId('sc-chart-area-clip-');

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  private readonly points = computed<ScAreaChartPoint[]>(() =>
    (this.state.extents().get(this.key()) ?? []).map(([low, high], i) => {
      const value = this.state.at(i, high);
      const below = this.state.at(i, low);
      return { x: value.x, y: value.y, bx: below.x, by: below.y };
    }),
  );

  protected readonly areaPath = computed(() => {
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

  protected readonly edgePath = computed(
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

  protected readonly activePoint = computed(() => {
    const index = this.state.activeIndex();
    return this.activeDot() && index !== null ? this.points()[index] : null;
  });

  protected readonly class = computed(() => cn(this.classInput()));

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
    // Once it's whole (Recharts').
    if (this.shown() < 1) return [];
    const rows = this.state.data();
    const vertical = this.state.vertical();
    return this.points().map((p, index) => {
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
            x: p.x + offset,
            y: p.y,
            anchor: 'start',
            baseline: 'middle',
          }
        : {
            index,
            value,
            x: p.x,
            y: p.y - offset,
            anchor: 'middle',
            baseline: 'auto',
          };
    });
  }
}

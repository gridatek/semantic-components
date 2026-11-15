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
import { line } from 'd3-shape';
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

interface ScLineChartPoint {
  x: number;
  y: number;
  /** Its row's key, to match it by (`animationMatchBy`). */
  id?: string | number | null;
}

/**
 * Recharts' line step: matched points move; new ones come in, gone ones go
 * out, along the categories by the matched points' average shift.
 */
function stepPoints(vertical: boolean) {
  const along = (p: ScLineChartPoint) => (vertical ? p.y : p.x);
  const moved = (p: ScLineChartPoint, by: number) =>
    vertical ? { ...p, y: p.y + by } : { ...p, x: p.x + by };
  return (
    items: readonly ScChartAnimationItem<ScLineChartPoint>[],
    time: number,
  ): ScLineChartPoint[] => {
    const matched = items.filter((item) => item.status === 'matched');
    const shift = matched.length
      ? matched.reduce(
          (sum, item) => sum + along(item.next) - along(item.prev),
          0,
        ) / matched.length
      : 0;
    return items.map((item) => {
      if (item.status === 'matched')
        return {
          ...item.next,
          x: between(item.prev.x, item.next.x, time),
          y: between(item.prev.y, item.next.y, time),
        };
      if (item.status === 'added') return moved(item.next, -shift * (1 - time));
      return moved(item.prev, shift * time);
    });
  };
}

/** A series as a line through its values (`key`), in `--color-<key>`. */
@Component({
  selector: 'g[scChartLine]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartLine }],
  template: `
    <svg:path
      [attr.d]="path()"
      [attr.stroke]="color()"
      [attr.stroke-width]="strokeWidth()"
      [attr.pathLength]="drawn() < 1 ? 1 : null"
      [attr.stroke-dasharray]="drawn() < 1 ? drawn() + ' 1' : null"
      fill="none"
    />
    @if (dots() && drawn() === 1) {
      @for (p of points(); track $index) {
        <svg:circle
          [attr.cx]="p.x"
          [attr.cy]="p.y"
          r="3"
          [attr.fill]="color()"
        />
      }
    }
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
    'data-slot': 'chart-line',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartLine implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  readonly curve = input<ScChartCurve>('natural');
  readonly strokeWidth = input(2);
  /** A dot at each value. */
  readonly dots = input(false, { transform: booleanAttribute });
  /** A dot where the pointer is. */
  readonly activeDot = input(true, { transform: booleanAttribute });
  /**
   * Its line draws itself when it appears, and moves to its new place when
   * its data changes (Recharts'); not with reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before it draws or moves, in ms. */
  readonly animationBegin = input(0);
  /** How long it draws or moves, in ms. */
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
  /** How much of the line is drawn: its dots once all of it is (Recharts'). */
  private readonly drawn = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  /** Its points where they belong now. */
  private readonly targets = computed<ScLineChartPoint[]>(() => {
    const rows = this.state.data();
    const matchBy = this.animationMatchBy();
    return (this.state.extents().get(this.key()) ?? []).map(([, value], i) => ({
      ...this.state.at(i, value),
      id: typeof matchBy === 'function' ? matchBy(rows[i], i) : null,
    }));
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
    interpolate: (items, time) =>
      stepPoints(this.state.vertical())(items, time),
  });

  /** What is drawn: its points, moving or still. */
  protected readonly points = this.moving.items;

  protected readonly path = computed(
    () =>
      line<ScLineChartPoint>()
        .x((p) => p.x)
        .y((p) => p.y)
        .curve(curveOf(this.curve(), this.state.vertical()))(this.points()) ??
      '',
  );

  protected readonly activePoint = computed(() => {
    const index = this.state.activeIndex();
    return this.activeDot() && index !== null ? this.targets()[index] : null;
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'line',
      stack: computed(() => null),
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    // Once the line is drawn and still, as its dots (Recharts').
    if (this.drawn() < 1 || this.moving.animating()) return [];
    const rows = this.state.data();
    const vertical = this.state.vertical();
    const backwards = this.state.valueReversed();
    return this.targets().map((p, index) => {
      const value = numberOf(rows[index]?.[this.key()]);
      if (position === 'inside')
        return { index, value, ...p, anchor: 'middle', baseline: 'middle' };
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

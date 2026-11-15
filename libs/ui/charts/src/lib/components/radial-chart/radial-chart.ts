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
import { arc } from 'd3-shape';
import {
  type ScChartAnimationEasing,
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

interface ScRadialChartRing {
  index: number;
  path: string;
  track: string;
  color: string;
  /** Its arc's angles, and its middle radius (px). */
  from: number;
  to: number;
  radius: number;
}

/** A point at an angle (0 at the top, clockwise) and a radius, around (0, 0). */
const around = (angle: number, radius: number) => ({
  x: radius * Math.sin(angle),
  y: -radius * Math.cos(angle),
});

/**
 * A series as radial bars: a ring per row, the first innermost, its value as
 * an arc from the plot's `startAngle` towards its `endAngle` — on the other
 * series' arcs, within a `stack`. Colored by its key, or by each row's
 * category (`colorBy`).
 */
@Component({
  selector: 'g[scChartRadialBar]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartRadialBar }],
  template: `
    @if (track()) {
      @for (ring of rings(); track ring.index) {
        <svg:path
          class="fill-muted"
          [attr.d]="ring.track"
          (pointerenter)="point(ring.index)"
        />
      }
    }
    @for (ring of rings(); track ring.index) {
      <svg:path
        [attr.d]="ring.path"
        [attr.fill]="ring.color"
        (pointerenter)="point(ring.index)"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-radial-bar',
    '[attr.data-key]': 'key()',
    '[attr.transform]': 'transform()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartRadialBar implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  /** Radial bars of a stack are drawn one after the other along the ring. */
  readonly stack = input<string | null>(null);
  /** Its color: its key's, or each row's category's. */
  readonly colorBy = input<'key' | 'category'>('key');
  /** Where the rings start, as a share of the radius. */
  readonly innerRadius = input(0.3);
  /** Where they end, as a share of the radius. */
  readonly outerRadius = input(1);
  readonly cornerRadius = input(0);
  /** Each ring's full length behind it. */
  readonly track = input(false, { transform: booleanAttribute });
  /**
   * Its arcs grow along their rings when it appears, and move to their new
   * angles when its data changes (Recharts'); not with reduced motion.
   */
  readonly isAnimationActive = input(true);
  /** The wait before they grow, in ms. */
  readonly animationBegin = input(0);
  /** How long they grow, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScChartAnimationEasing>('ease');
  /** How its arcs before and after a change are paired (Recharts'): the first with the first. */
  readonly animationMatchBy = input<ScChartAnimationMatchBy>('append');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  private readonly grown = computed(() =>
    this.isAnimationActive() ? this.entrance() : 1,
  );

  protected readonly transform = computed(() => {
    const { cx, cy } = this.state.circle();
    return `translate(${cx},${cy})`;
  });

  /** Its arcs' angles where they belong now. */
  private readonly targets = computed(() => {
    const share = this.state.share();
    const [start, end] = this.state.angles();
    const at = (value: number) => start + (end - start) * share(value);
    const rows = this.state.data();
    const matchBy = this.animationMatchBy();
    return (this.state.extents().get(this.key()) ?? []).map(
      ([low, high], index) => ({
        index,
        id: typeof matchBy === 'function' ? matchBy(rows[index], index) : null,
        from: at(low),
        to: at(high),
      }),
    );
  });

  /**
   * Its arcs moving to their new angles when they change (Recharts'): matched
   * ones from where they were, new ones growing from their start.
   */
  private readonly moving = scChartTransition({
    items: this.targets,
    active: this.isAnimationActive,
    matchBy: this.animationMatchBy,
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
    interpolate: (items, time) =>
      items.flatMap((item) => {
        if (item.status === 'removed') return [];
        const { next } = item;
        return item.status === 'matched'
          ? [
              {
                ...next,
                from: between(item.prev.from, next.from, time),
                to: between(item.prev.to, next.to, time),
              },
            ]
          : [{ ...next, to: between(next.from, next.to, time) }];
      }),
  });

  protected readonly rings = computed<ScRadialChartRing[]>(() => {
    const arcs = this.moving.items();
    const [start, end] = this.state.angles();
    const { radius } = this.state.circle();
    const inner = radius * this.innerRadius();
    const outer = radius * this.outerRadius();
    const step = (outer - inner) / Math.max(1, arcs.length);
    const gap = arcs.length > 1 ? step * 0.2 : 0;
    const categories = this.state.categories();
    const grown = this.grown();
    return arcs.map(({ index, from, to: value }) => {
      const shape = arc()
        .innerRadius(inner + index * step + gap / 2)
        .outerRadius(inner + (index + 1) * step - gap / 2)
        .cornerRadius(this.cornerRadius());
      const angles = { innerRadius: 0, outerRadius: 0, padAngle: 0 };
      // Growing in: its end on the way from its start to its value.
      const to = between(from, value, grown);
      return {
        index,
        from,
        to,
        radius: inner + (index + 0.5) * step,
        path: shape({ ...angles, startAngle: from, endAngle: to }) ?? '',
        track: shape({ ...angles, startAngle: start, endAngle: end }) ?? '',
        color: `var(--color-${this.colorBy() === 'category' ? categories[index] : this.key()})`,
      };
    });
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'radial',
      stack: this.stack,
      colorBy: this.colorBy,
      // The keyboard's item: its arc's end.
      anchor: (index) => {
        const ring = this.rings().find((r) => r.index === index);
        if (!ring) return null;
        const { cx, cy } = this.state.circle();
        const p = around(ring.to, ring.radius);
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
    // Once they've grown and are still (Recharts').
    if (this.grown() < 1 || this.moving.animating()) return [];
    const rows = this.state.data();
    return this.rings().map((ring) => {
      const value = numberOf(rows[ring.index]?.[this.key()]);
      // Along the ring: at its arc's start, beyond its end, or in its middle.
      const nudge = offset / Math.max(1, ring.radius);
      const angle =
        position === 'start'
          ? ring.from + nudge
          : position === 'outside'
            ? ring.to + nudge
            : (ring.from + ring.to) / 2;
      return {
        index: ring.index,
        value,
        ...around(angle, ring.radius),
        anchor: position === 'inside' ? 'middle' : 'start',
        baseline: 'middle',
      };
    });
  }
}

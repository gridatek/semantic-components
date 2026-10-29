import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  booleanAttribute,
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

  protected readonly transform = computed(() => {
    const { cx, cy } = this.state.circle();
    return `translate(${cx},${cy})`;
  });

  protected readonly rings = computed<ScRadialChartRing[]>(() => {
    const extent = this.state.extents().get(this.key()) ?? [];
    const share = this.state.share();
    const [start, end] = this.state.angles();
    const { radius } = this.state.circle();
    const inner = radius * this.innerRadius();
    const outer = radius * this.outerRadius();
    const step = (outer - inner) / Math.max(1, extent.length);
    const gap = extent.length > 1 ? step * 0.2 : 0;
    const categories = this.state.categories();
    return extent.map(([low, high], index) => {
      const shape = arc()
        .innerRadius(inner + index * step + gap / 2)
        .outerRadius(inner + (index + 1) * step - gap / 2)
        .cornerRadius(this.cornerRadius());
      const at = (value: number) => start + (end - start) * share(value);
      const angles = { innerRadius: 0, outerRadius: 0, padAngle: 0 };
      return {
        index,
        from: at(low),
        to: at(high),
        radius: inner + (index + 0.5) * step,
        path:
          shape({ ...angles, startAngle: at(low), endAngle: at(high) }) ?? '',
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

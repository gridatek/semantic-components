import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScChartState } from './chart-state';

/**
 * A polar chart's grid: rings — polygons through the spokes, or circles —
 * and the spokes, one per category.
 */
@Component({
  selector: 'g[scChartPolarGrid]',
  template: `
    @for (ring of ringList(); track $index) {
      @if (shape() === 'circle') {
        <svg:circle
          [attr.cx]="ring.cx"
          [attr.cy]="ring.cy"
          [attr.r]="ring.radius"
          fill="none"
        />
      } @else {
        <svg:polygon [attr.points]="ring.points" fill="none" />
      }
    }
    @if (spokes()) {
      @for (spoke of spokeList(); track $index) {
        <svg:line
          [attr.x1]="spoke.cx"
          [attr.y1]="spoke.cy"
          [attr.x2]="spoke.x"
          [attr.y2]="spoke.y"
        />
      }
    }
  `,
  host: {
    'data-slot': 'chart-polar-grid',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartPolarGrid {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Polygons through the spokes, or circles. */
  readonly shape = input<'polygon' | 'circle'>('polygon');
  /** How many rings. */
  readonly ringCount = input(4);
  /** A line to each category. */
  readonly spokes = input(true, { transform: booleanAttribute });

  private readonly ringList = computed(() => {
    const { cx, cy, radius } = this.state.circle();
    const spokes = this.state.data().map((_, i) => this.state.spokeAngle(i));
    // Radial bars: through each ring's middle (Recharts' circles at the
    // categories); else rings evenly out to the edge.
    const rings = this.state
      .series()
      .find((s) => s.rings)
      ?.rings?.();
    const count = Math.max(1, this.ringCount());
    const radii =
      rings ??
      Array.from({ length: count }, (_, ring) => (radius * (ring + 1)) / count);
    return radii.map((r) => {
      return {
        cx,
        cy,
        radius: r,
        points: spokes
          .map((angle) => {
            const p = this.state.point(angle, r);
            return `${p.x},${p.y}`;
          })
          .join(' '),
      };
    });
  });

  private readonly spokeList = computed(() => {
    const { cx, cy, radius } = this.state.circle();
    // Radial bars: at the values' ticks along the ring (Recharts' radial
    // lines on the angle axis); else to each category.
    const rings = this.state
      .series()
      .find((s) => s.rings)
      ?.rings?.();
    if (rings?.length) {
      const share = this.state.share();
      const [start, end] = this.state.angles();
      // From the hole's edge (half a ring inside the first), as Recharts'
      // from the chart's inner radius: the hole stays empty.
      const half = rings.length > 1 ? (rings[1] - rings[0]) / 2 : 0;
      const inner = Math.max(0, rings[0] - half);
      return share
        .ticks(5)
        .map((value) => start + (end - start) * share(value))
        .map((angle) => {
          const from = this.state.point(angle, inner);
          return { cx: from.x, cy: from.y, ...this.state.point(angle, radius) };
        });
    }
    return this.state.data().map((_, index) => ({
      cx,
      cy,
      ...this.state.point(this.state.spokeAngle(index), radius),
    }));
  });

  private readonly class = computed(() =>
    cn('stroke-border', this.classInput()),
  );
}

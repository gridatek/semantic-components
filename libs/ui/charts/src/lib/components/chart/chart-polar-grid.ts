import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
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

  protected readonly ringList = computed(() => {
    const { cx, cy, radius } = this.state.circle();
    const count = Math.max(1, this.ringCount());
    const spokes = this.state.data().map((_, i) => this.state.spokeAngle(i));
    return Array.from({ length: count }, (_, ring) => {
      const r = (radius * (ring + 1)) / count;
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

  protected readonly spokeList = computed(() => {
    const { cx, cy, radius } = this.state.circle();
    return this.state.data().map((_, index) => ({
      cx,
      cy,
      ...this.state.point(this.state.spokeAngle(index), radius),
    }));
  });

  protected readonly class = computed(() =>
    cn('stroke-border', this.classInput()),
  );
}

import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from './chart-state';

/**
 * A radar's categories, around it at the end of each spoke — as written in
 * the data, or through `tickFormatter`. Makes room for itself.
 */
@Component({
  selector: 'g[scChartPolarAngleAxis]',
  template: `
    @for (tick of ticks(); track tick.index) {
      <svg:text
        [attr.x]="tick.x"
        [attr.y]="tick.y"
        [attr.text-anchor]="tick.anchor"
        dominant-baseline="middle"
      >
        {{ tick.label }}
      </svg:text>
    }
  `,
  host: {
    'data-slot': 'chart-polar-angle-axis',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartPolarAngleAxis {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** A category's label (`'January'` → `'Jan'`). */
  readonly tickFormatter = input<(category: string, index: number) => string>(
    (category) => category,
  );

  protected readonly ticks = computed(() => {
    const { radius } = this.state.circle();
    const format = this.tickFormatter();
    return this.state.categories().map((category, index) => {
      const angle = this.state.spokeAngle(index);
      const { x, y } = this.state.point(angle, radius + 10);
      const side = Math.sin(angle);
      return {
        index,
        x,
        y,
        label: format(category, index),
        anchor: Math.abs(side) < 0.1 ? 'middle' : side > 0 ? 'start' : 'end',
      };
    });
  });

  protected readonly class = computed(() =>
    cn('fill-muted-foreground', this.classInput()),
  );

  constructor() {
    // The labels' room, around the radar.
    this.state.polarPadding.set(28);
    inject(DestroyRef).onDestroy(() => this.state.polarPadding.set(0));
  }
}

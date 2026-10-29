import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from './chart-state';

/**
 * The center of a polar chart: your SVG in it — a donut's total, a radial
 * chart's label (`<text text-anchor="middle">`), at (0, 0).
 */
@Directive({
  selector: 'g[scChartCenter]',
  host: {
    'data-slot': 'chart-center',
    '[attr.transform]': 'transform()',
    '[class]': 'class()',
  },
})
export class ScChartCenter {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly transform = computed(() => {
    const { cx, cy } = this.state.circle();
    return `translate(${cx},${cy})`;
  });

  protected readonly class = computed(() =>
    cn('pointer-events-none', this.classInput()),
  );
}

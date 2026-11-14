import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import type { ScChartLegendPayload } from './chart-types';

/** An entry of the legend: one of its `payload()` items, whose colour its indicator takes. Write its name. */
@Directive({
  selector: '[scChartLegendItem]',
  host: {
    'data-slot': 'chart-legend-item',
    '[class]': 'class()',
  },
})
export class ScChartLegendItem {
  /** The entry it shows. */
  readonly item = input.required<ScChartLegendPayload>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1.5', this.classInput()),
  );
}

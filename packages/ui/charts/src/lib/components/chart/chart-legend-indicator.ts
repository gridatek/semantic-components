import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScChartLegendItem } from './chart-legend-item';

/** A legend entry's swatch, in its colour. */
@Directive({
  selector: '[scChartLegendIndicator]',
  host: {
    'data-slot': 'chart-legend-indicator',
    'aria-hidden': 'true',
    '[style.background-color]': 'color()',
    '[class]': 'class()',
  },
})
export class ScChartLegendIndicator {
  private readonly entry = inject(ScChartLegendItem);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly color = computed(() => this.entry.item().color);

  private readonly class = computed(() =>
    cn('size-2 shrink-0 rounded-[2px]', this.classInput()),
  );
}

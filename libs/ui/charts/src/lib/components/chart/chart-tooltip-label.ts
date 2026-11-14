import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** The tooltip's title, the category: write it (`tooltip.label()`, formatted as you like). */
@Directive({
  selector: '[scChartTooltipLabel]',
  host: {
    'data-slot': 'chart-tooltip-label',
    '[class]': 'class()',
  },
})
export class ScChartTooltipLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('font-medium', this.classInput()),
  );
}

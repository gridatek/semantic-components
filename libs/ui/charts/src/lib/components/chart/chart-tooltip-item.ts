import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import type { ScChartTooltipPayload } from './chart-types';

/** A row of the tooltip: one of its `payload()` items, whose colour its indicator takes. */
@Directive({
  selector: '[scChartTooltipItem]',
  host: {
    'data-slot': 'chart-tooltip-item',
    '[class]': 'class()',
  },
})
export class ScChartTooltipItem {
  /** The series it shows. */
  readonly item = input.required<ScChartTooltipPayload>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex w-full items-stretch gap-2 leading-none', this.classInput()),
  );
}

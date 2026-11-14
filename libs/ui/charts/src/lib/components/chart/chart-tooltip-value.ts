import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** A tooltip row's value, at its end: write it, formatted (`item.value | number`). */
@Directive({
  selector: '[scChartTooltipValue]',
  host: {
    'data-slot': 'chart-tooltip-value',
    '[class]': 'class()',
  },
})
export class ScChartTooltipValue {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-foreground ms-auto self-center ps-4 font-mono font-medium tabular-nums',
      this.classInput(),
    ),
  );
}

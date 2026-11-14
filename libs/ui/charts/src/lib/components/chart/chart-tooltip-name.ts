import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** A tooltip row's series name: write it (`item.name`). */
@Directive({
  selector: '[scChartTooltipName]',
  host: {
    'data-slot': 'chart-tooltip-name',
    '[class]': 'class()',
  },
})
export class ScChartTooltipName {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground self-center', this.classInput()),
  );
}

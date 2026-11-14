import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScChartTooltipItem } from './chart-tooltip-item';
import type { ScChartIndicator } from './chart-types';

/** A tooltip row's mark, in its series' colour: a dot, a line or a dashed line. */
@Directive({
  selector: '[scChartTooltipIndicator]',
  host: {
    'data-slot': 'chart-tooltip-indicator',
    'aria-hidden': 'true',
    '[style.--color-bg]': 'color()',
    '[style.--color-border]': 'color()',
    '[class]': 'class()',
  },
})
export class ScChartTooltipIndicator {
  private readonly row = inject(ScChartTooltipItem);

  readonly variant = input<ScChartIndicator>('dot');
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly color = computed(() => this.row.item().color);

  protected readonly class = computed(() => {
    const variant = this.variant();
    return cn(
      'shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)',
      variant === 'dot' && 'size-2.5 self-center',
      variant === 'line' && 'w-1',
      variant === 'dashed' && 'w-0 border-[1.5px] border-dashed bg-transparent',
      this.classInput(),
    );
  });
}

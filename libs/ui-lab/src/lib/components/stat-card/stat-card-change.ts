import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardTrend } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-change]',
  host: {
    'data-slot': 'stat-card-change',
    '[class]': 'class()',
  },
})
export class ScStatCardChange {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly trend = input<StatCardTrend>('neutral');

  protected readonly class = computed(() => {
    const trend = this.trend();

    return cn(
      'inline-flex items-center gap-1 text-xs font-medium',
      trend === 'up' && 'text-green-600',
      trend === 'down' && 'text-red-600',
      trend === 'neutral' && 'text-muted-foreground',
      this.classInput(),
    );
  });
}

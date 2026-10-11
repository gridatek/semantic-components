import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { ScStatCardTrend } from './stat-card-types';

@Directive({
  selector: '[scStatCardChange]',
  host: {
    '[class]': 'class()',
  },
})
export class ScStatCardChange {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly trend = input<ScStatCardTrend>('neutral');

  protected readonly class = computed(() => {
    const trend = this.trend();

    return cn(
      'inline-flex items-center gap-1 text-xs font-medium',
      trend === 'up' && 'text-green-700 dark:text-green-400',
      trend === 'down' && 'text-red-700 dark:text-red-400',
      trend === 'neutral' && 'text-muted-foreground',
      'group-data-[variant=filled]/stat-card:text-primary-foreground',
      this.classInput(),
    );
  });
}

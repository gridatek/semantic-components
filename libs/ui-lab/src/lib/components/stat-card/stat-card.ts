import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardSize, StatCardVariant } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card]',
  host: {
    'data-slot': 'stat-card',
    '[class]': 'class()',
  },
})
export class ScStatCard {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<StatCardVariant>('default');
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const variant = this.variant();
    const size = this.size();

    return cn(
      'rounded-lg transition-colors',
      // Variants
      variant === 'default' && 'border bg-card text-card-foreground',
      variant === 'outline' && 'border-2 bg-transparent',
      variant === 'filled' && 'bg-primary text-primary-foreground',
      // Sizes
      size === 'sm' && 'p-4',
      size === 'md' && 'p-6',
      size === 'lg' && 'p-8',
      this.classInput(),
    );
  });
}

import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardSize } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-value]',
  host: {
    'data-slot': 'stat-card-value',
    '[class]': 'class()',
  },
})
export class ScStatCardValue {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const size = this.size();

    return cn(
      'font-bold tracking-tight',
      size === 'sm' && 'text-xl',
      size === 'md' && 'text-2xl',
      size === 'lg' && 'text-4xl',
      this.classInput(),
    );
  });
}

import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardSize } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-label]',
  host: {
    'data-slot': 'stat-card-label',
    '[class]': 'class()',
  },
})
export class ScStatCardLabel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const size = this.size();

    return cn(
      'font-medium text-muted-foreground',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      size === 'lg' && 'text-base',
      this.classInput(),
    );
  });
}

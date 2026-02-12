import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';
import type { StatCardSize } from './stat-card-types';

@Directive({
  selector: '[sc-stat-card-icon]',
  host: {
    'data-slot': 'stat-card-icon',
    '[class]': 'class()',
  },
})
export class ScStatCardIcon {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<StatCardSize>('md');

  protected readonly class = computed(() => {
    const size = this.size();

    return cn(
      'rounded-md bg-muted p-2',
      'inline-flex items-center justify-center',
      size === 'sm' && '[&>svg]:w-4 [&>svg]:h-4',
      size === 'md' && '[&>svg]:w-5 [&>svg]:h-5',
      size === 'lg' && '[&>svg]:w-6 [&>svg]:h-6',
      this.classInput(),
    );
  });
}

import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { StatCardSize } from './stat-card-types';

@Directive({
  selector: '[scStatCardLabel]',
  host: {
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
      'group-data-[variant=filled]/stat-card:text-primary-foreground/80',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      size === 'lg' && 'text-base',
      this.classInput(),
    );
  });
}

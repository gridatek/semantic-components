import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-stat-card-description]',
  host: {
    'data-slot': 'stat-card-description',
    '[class]': 'class()',
  },
})
export class ScStatCardDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-xs text-muted-foreground', this.classInput()),
  );
}

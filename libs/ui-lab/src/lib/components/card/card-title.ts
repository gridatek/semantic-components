import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-card-title]',
  host: {
    'data-slot': 'card-title',
    '[class]': 'class()',
  },
})
export class ScCardTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-2xl font-semibold leading-none tracking-tight', this.classInput()),
  );
}

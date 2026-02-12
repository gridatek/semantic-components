import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-card-header]',
  host: {
    'data-slot': 'card-header',
    '[class]': 'class()',
  },
})
export class ScCardHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col space-y-1.5 p-6', this.classInput()),
  );
}

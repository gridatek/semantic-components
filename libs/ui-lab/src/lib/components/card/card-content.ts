import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-card-content]',
  host: {
    'data-slot': 'card-content',
    '[class]': 'class()',
  },
})
export class ScCardContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('p-6 pt-0', this.classInput()));
}

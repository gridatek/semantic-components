import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-item-actions]',
  host: {
    'data-slot': 'item-actions',
    '[class]': 'class()',
  },
})
export class ScItemActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-2 flex items-center', this.classInput()),
  );
}

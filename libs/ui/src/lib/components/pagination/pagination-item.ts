import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[sc-pagination-item]',
  host: {
    'data-slot': 'pagination-item',
    '[class]': 'class()',
  },
})
export class ScPaginationItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}

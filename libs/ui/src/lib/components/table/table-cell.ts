import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'td[sc-table-cell]',
  host: {
    'data-slot': 'table-cell',
    '[class]': 'class()',
  },
})
export class ScTableCell {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', this.classInput()),
  );
}

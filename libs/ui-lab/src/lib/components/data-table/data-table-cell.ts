import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-data-table-cell]',
  host: {
    'data-slot': 'data-table-cell',
    '[class]': 'class()',
  },
})
export class ScDataTableCell {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      this.classInput(),
    ),
  );
}

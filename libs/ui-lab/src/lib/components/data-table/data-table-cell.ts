import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_DATA_TABLE } from './data-table';

@Directive({
  selector: '[scDataTableCell]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDataTableCell {
  private readonly table = inject(SC_DATA_TABLE);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The column this cell belongs to; the cell is hidden with its column. */
  readonly columnId = input<string>('');

  protected readonly class = computed(() =>
    cn(
      'p-2 align-middle [&:has([role=checkbox])]:pe-0 *:[[role=checkbox]]:translate-y-[2px]',
      this.columnId() &&
        !this.table.isColumnVisible(this.columnId()) &&
        'hidden',
      this.classInput(),
    ),
  );
}

import { Directive, computed, inject, input } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { cn } from 'cn';
import { syncDataTableCheckbox } from './data-table-checkbox';
import { ScDataTableProvider } from './data-table-provider';
import type { ScDataTableSelectAllTable } from './data-table-types';

/**
 * "Select all" checkbox: checked when every row is selected, indeterminate
 * when some are. `scope="page"` (default) covers the current page, `"all"`
 * every row. On an `scCheckbox`; the table from `scDataTableProvider`.
 *
 * ```html
 * <input type="checkbox" scCheckbox scDataTableSelectAll aria-label="Select all rows" />
 * ```
 */
@Directive({
  selector: 'input[type="checkbox"][scDataTableSelectAll]',
  host: {
    '(change)': 'toggle($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableSelectAll {
  private readonly table = inject(ScDataTableProvider)
    .table as () => ScDataTableSelectAllTable;
  readonly scope = input<'page' | 'all'>('page');
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly allSelected = computed(() =>
    this.scope() === 'page'
      ? this.table().getIsAllPageRowsSelected()
      : this.table().getIsAllRowsSelected(),
  );

  // TanStack: "some" also holds when all are selected.
  private readonly indeterminate = computed(
    () =>
      !this.allSelected() &&
      (this.scope() === 'page'
        ? this.table().getIsSomePageRowsSelected()
        : this.table().getIsSomeRowsSelected()),
  );

  private readonly class = computed(() => cn(this.classInput()));

  constructor() {
    ɵwarnIfUnnamed('scDataTableSelectAll');
    syncDataTableCheckbox(this.allSelected, this.indeterminate);
  }

  private toggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (this.scope() === 'page')
      this.table().toggleAllPageRowsSelected(checked);
    else this.table().toggleAllRowsSelected(checked);
  }
}

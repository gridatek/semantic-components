import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { syncDataTableCheckbox } from './data-table-checkbox';
import type { DataTableSelectAllTable } from './data-table-types';

/**
 * "Select all" checkbox: checked when every row is selected, indeterminate
 * when some are. `scope="page"` (default) covers the current page, `"all"`
 * every row. Works alone or with `scCheckbox`.
 *
 * ```html
 * <input type="checkbox" scCheckbox scDataTableSelectAll [table]="table" />
 * ```
 */
@Directive({
  selector: 'input[type="checkbox"][scDataTableSelectAll]',
  host: {
    '[attr.aria-label]': 'ariaLabel()',
    '(change)': 'toggle($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableSelectAll {
  readonly table = input.required<DataTableSelectAllTable>();
  readonly scope = input<'page' | 'all'>('page');
  readonly ariaLabel = input('Select all rows', { alias: 'aria-label' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly allSelected = computed(() =>
    this.scope() === 'page'
      ? this.table().getIsAllPageRowsSelected()
      : this.table().getIsAllRowsSelected(),
  );

  // TanStack: "some" also holds when all are selected.
  protected readonly indeterminate = computed(
    () =>
      !this.allSelected() &&
      (this.scope() === 'page'
        ? this.table().getIsSomePageRowsSelected()
        : this.table().getIsSomeRowsSelected()),
  );

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    syncDataTableCheckbox(this.allSelected, this.indeterminate);
  }

  protected toggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (this.scope() === 'page')
      this.table().toggleAllPageRowsSelected(checked);
    else this.table().toggleAllRowsSelected(checked);
  }
}

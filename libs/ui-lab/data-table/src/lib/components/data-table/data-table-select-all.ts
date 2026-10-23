import { Directive, computed, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { syncDataTableCheckbox } from './data-table-checkbox';
import type { ScDataTableSelectAllTable } from './data-table-types';

/**
 * "Select all" checkbox: checked when every row is selected, indeterminate
 * when some are. `scope="page"` (default) covers the current page, `"all"`
 * every row. Works alone or with `scCheckbox`.
 *
 * ```html
 * <input type="checkbox" scCheckbox scDataTableSelectAll aria-label="Select all rows" [table]="table" />
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
  readonly table = input.required<ScDataTableSelectAllTable>();
  readonly scope = input<'page' | 'all'>('page');
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
    ɵwarnIfUnnamed('scDataTableSelectAll');
    syncDataTableCheckbox(this.allSelected, this.indeterminate);
  }

  protected toggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (this.scope() === 'page')
      this.table().toggleAllPageRowsSelected(checked);
    else this.table().toggleAllRowsSelected(checked);
  }
}

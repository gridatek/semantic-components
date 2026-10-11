import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { syncDataTableCheckbox } from './data-table-checkbox';
import type { DataTableSelectableRow } from './data-table-types';

/**
 * A row's selection checkbox; disabled when the row can't be selected. Give
 * it a name, e.g. `[attr.aria-label]="'Select ' + row.original.name"`.
 *
 * ```html
 * <input type="checkbox" scCheckbox scDataTableSelectRow [row]="row" />
 * ```
 */
@Directive({
  selector: 'input[type="checkbox"][scDataTableSelectRow]',
  host: {
    '[disabled]': '!row().getCanSelect()',
    '(change)': 'toggle($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableSelectRow {
  readonly row = input.required<DataTableSelectableRow>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly selected = computed(() => this.row().getIsSelected());
  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    syncDataTableCheckbox(this.selected);
  }

  protected toggle(event: Event): void {
    this.row().toggleSelected((event.target as HTMLInputElement).checked);
  }
}

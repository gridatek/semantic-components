import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { syncDataTableCheckbox } from './data-table-checkbox';
import { ScDataTableTreeGrid } from './data-table-tree-grid';
import type { ScDataTableSelectableRow } from './data-table-types';

/**
 * A row's selection checkbox; disabled when the row can't be selected —
 * half-ticked when only some of its sub-rows are (a tree table). Give
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
    // In a tree grid, Space on the row selects: one tab stop, not one per row.
    '[attr.tabindex]': 'tree ? -1 : null',
    '(change)': 'toggle($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableSelectRow {
  protected readonly tree = inject(ScDataTableTreeGrid, { optional: true });

  readonly row = input.required<ScDataTableSelectableRow>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly selected = computed(() => this.row().getIsSelected());
  // As TanStack's examples: half-ticked while only some sub-rows are
  // selected, the row itself selected or not.
  protected readonly some = computed(() => !!this.row().getIsSomeSelected?.());
  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    syncDataTableCheckbox(this.selected, this.some);
  }

  protected toggle(event: Event): void {
    this.row().toggleSelected((event.target as HTMLInputElement).checked);
  }
}

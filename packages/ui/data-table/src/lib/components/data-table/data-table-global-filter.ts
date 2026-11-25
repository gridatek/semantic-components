import { Directive, computed, inject } from '@angular/core';
import { ScInput } from '@semantic-components/ui';
import { ScDataTableProvider } from './data-table-provider';
import type { ScDataTableGlobalFilterTable } from './data-table-types';

/**
 * Filters the whole table as you type: an input in the Input's look, the
 * table from `scDataTableProvider`. Give it a name (`aria-label` or a
 * `<label>`).
 *
 * ```html
 * <input scDataTableGlobalFilter aria-label="Search" />
 * ```
 */
@Directive({
  selector: 'input[scDataTableGlobalFilter]',
  hostDirectives: [
    { directive: ScInput, inputs: ['class', 'id', 'aria-describedby'] },
  ],
  host: {
    type: 'search',
    '[value]': 'value()',
    '(input)': 'onInput($event)',
  },
})
export class ScDataTableGlobalFilter {
  private readonly table = inject(ScDataTableProvider)
    .table as () => ScDataTableGlobalFilterTable;

  private readonly value = computed(() =>
    String(this.table().atoms.globalFilter.get() ?? ''),
  );

  private onInput(event: Event): void {
    this.table().setGlobalFilter((event.target as HTMLInputElement).value);
  }
}

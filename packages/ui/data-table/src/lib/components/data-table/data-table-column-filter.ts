import { Directive, computed, input } from '@angular/core';
import { ScInput } from '@semantic-components/ui';
import type { ScDataTableFilterableColumn } from './data-table-types';

/**
 * Filters one column as you type (empty clears it): an input in the Input's
 * look. Give it a name, e.g. `[attr.aria-label]="'Filter ' + header.column.id"`.
 *
 * ```html
 * <input scDataTableColumnFilter [column]="header.column" />
 * ```
 */
@Directive({
  selector: 'input[scDataTableColumnFilter]',
  hostDirectives: [
    { directive: ScInput, inputs: ['class', 'id', 'aria-describedby'] },
  ],
  host: {
    '[value]': 'value()',
    '(input)': 'onInput($event)',
  },
})
export class ScDataTableColumnFilter {
  readonly column = input.required<ScDataTableFilterableColumn>();

  private readonly value = computed(() =>
    String(this.column().getFilterValue() ?? ''),
  );

  private onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.column().setFilterValue(value === '' ? undefined : value);
  }
}

import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { ScDataTableFilterableColumn } from './data-table-types';

/**
 * Filters one column as you type (empty clears it). Use with `scInput`; give
 * it a name, e.g. `[attr.aria-label]="'Filter ' + header.column.id"`.
 *
 * ```html
 * <input scInput scDataTableColumnFilter [column]="header.column" />
 * ```
 */
@Directive({
  selector: 'input[scDataTableColumnFilter]',
  host: {
    '[value]': 'value()',
    '(input)': 'onInput($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableColumnFilter {
  readonly column = input.required<ScDataTableFilterableColumn>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly value = computed(() =>
    String(this.column().getFilterValue() ?? ''),
  );
  protected readonly class = computed(() => cn(this.classInput()));

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.column().setFilterValue(value === '' ? undefined : value);
  }
}

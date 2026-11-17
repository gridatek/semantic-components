import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import type { ScDataTableGlobalFilterTable } from './data-table-types';

/**
 * Filters the whole table as you type. Use with `scInput`; give it a name
 * (`aria-label` or a `<label>`).
 *
 * ```html
 * <input scInput scDataTableGlobalFilter [table]="table" aria-label="Search" />
 * ```
 */
@Directive({
  selector: 'input[scDataTableGlobalFilter]',
  host: {
    type: 'search',
    '[value]': 'value()',
    '(input)': 'onInput($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableGlobalFilter {
  readonly table = input.required<ScDataTableGlobalFilterTable>();
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly value = computed(() =>
    String(this.table().atoms.globalFilter.get() ?? ''),
  );
  private readonly class = computed(() => cn(this.classInput()));

  private onInput(event: Event): void {
    this.table().setGlobalFilter((event.target as HTMLInputElement).value);
  }
}

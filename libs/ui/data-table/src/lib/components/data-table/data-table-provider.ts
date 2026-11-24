import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import type { ScDataTableTable } from './data-table-types';

/**
 * Holds the table for the parts around it and in it — the filter, the
 * pagination, "select all", a tree grid: give it once, here. Wraps the
 * toolbar, the table and the pagination.
 *
 * ```html
 * <div scDataTableProvider [table]="table">
 *   <input scDataTableGlobalFilter aria-label="Search" />
 *   <div scDataTableContainer><table scDataTable>…</table></div>
 *   <nav scDataTablePagination>…</nav>
 * </div>
 * ```
 */
@Directive({
  selector: 'div[scDataTableProvider]',
  host: {
    '[class]': 'class()',
  },
})
export class ScDataTableProvider {
  /** TanStack's table. */
  readonly table = input.required<ScDataTableTable>();
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));
}

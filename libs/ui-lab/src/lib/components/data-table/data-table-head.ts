import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { dataTablePinnedClasses, dataTablePinning } from './data-table-pinning';
import type { DataTableHeadColumn } from './data-table-types';

/**
 * A header cell bound to its column: `aria-sort` for sortable columns and
 * sticky positioning for pinned ones. Use with `scTableHeaderCell`.
 *
 * ```html
 * <th scTableHeaderCell scDataTableHead [column]="header.column">…</th>
 * ```
 */
@Directive({
  selector: 'th[scDataTableHead]',
  host: {
    '[attr.aria-sort]': 'ariaSort()',
    '[attr.data-pinned]': 'pinning.pinned() || null',
    '[style.inset-inline-start.px]': 'pinning.offsetStart()',
    '[style.inset-inline-end.px]': 'pinning.offsetEnd()',
    '[class]': 'class()',
  },
})
export class ScDataTableHead {
  readonly column = input<DataTableHeadColumn>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly pinning = dataTablePinning(this.column);

  protected readonly ariaSort = computed(() => {
    const column = this.column();
    if (!column?.getCanSort?.()) return null;
    const sorted = column.getIsSorted?.();
    return sorted === 'asc'
      ? 'ascending'
      : sorted === 'desc'
        ? 'descending'
        : 'none';
  });

  protected readonly class = computed(() =>
    cn(dataTablePinnedClasses, this.classInput()),
  );
}

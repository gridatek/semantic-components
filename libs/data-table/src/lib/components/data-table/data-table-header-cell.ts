import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { dataTablePinnedClasses, dataTablePinning } from './data-table-pinning';
import type { ScDataTableCellColumn } from './data-table-types';

/**
 * A header cell bound to its column: `aria-sort` for sortable columns and
 * sticky positioning for pinned ones. Use with `scTableHeaderCell`.
 *
 * ```html
 * <th scTableHeaderCell scDataTableHeaderCell [column]="header.column">…</th>
 * ```
 */
@Directive({
  selector: 'th[scDataTableHeaderCell]',
  host: {
    '[attr.aria-sort]': 'ariaSort()',
    '[attr.data-pinned]': 'pinning.pinned() || null',
    '[style.inset-inline-start.px]': 'pinning.offsetStart()',
    '[style.inset-inline-end.px]': 'pinning.offsetEnd()',
    '[class]': 'class()',
  },
})
export class ScDataTableHeaderCell {
  readonly column = input<ScDataTableCellColumn>();
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

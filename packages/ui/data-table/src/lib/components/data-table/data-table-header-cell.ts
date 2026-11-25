import { Directive, computed, input } from '@angular/core';
import { ScTableHeaderCell } from '@semantic-components/ui';
import { dataTablePinnedClasses, dataTablePinning } from './data-table-pinning';
import type { ScDataTableCellColumn } from './data-table-types';

/**
 * A header cell, in the Table's look; bound to its column: `aria-sort` when
 * it sorts, sticky when it is pinned.
 *
 * ```html
 * <th scDataTableHeaderCell [column]="header.column">…</th>
 * ```
 */
@Directive({
  selector: 'th[scDataTableHeaderCell]',
  hostDirectives: [{ directive: ScTableHeaderCell, inputs: ['class'] }],
  host: {
    class: dataTablePinnedClasses,
    '[attr.aria-sort]': 'ariaSort()',
    '[attr.data-pinned]': 'pinning.pinned() || null',
    '[style.inset-inline-start.px]': 'pinning.offsetStart()',
    '[style.inset-inline-end.px]': 'pinning.offsetEnd()',
  },
})
export class ScDataTableHeaderCell {
  readonly column = input<ScDataTableCellColumn>();

  private readonly pinning = dataTablePinning(this.column);

  private readonly ariaSort = computed(() => {
    const column = this.column();
    if (!column?.getCanSort?.()) return null;
    const sorted = column.getIsSorted?.();
    return sorted === 'asc'
      ? 'ascending'
      : sorted === 'desc'
        ? 'descending'
        : 'none';
  });
}

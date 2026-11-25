import { Directive, input } from '@angular/core';
import { ScTableCell } from '@semantic-components/ui';
import { dataTablePinnedClasses, dataTablePinning } from './data-table-pinning';
import type { ScDataTableCellColumn } from './data-table-types';

/**
 * A body cell, in the Table's look; bound to its column, it sticks when the
 * column is pinned. A cell of no column (a "No results." row) takes none.
 *
 * ```html
 * <td scDataTableCell [column]="cell.column">…</td>
 * ```
 */
@Directive({
  selector: 'td[scDataTableCell]',
  hostDirectives: [{ directive: ScTableCell, inputs: ['class'] }],
  host: {
    class: dataTablePinnedClasses,
    '[attr.data-pinned]': 'pinning.pinned() || null',
    '[style.inset-inline-start.px]': 'pinning.offsetStart()',
    '[style.inset-inline-end.px]': 'pinning.offsetEnd()',
  },
})
export class ScDataTableCell {
  readonly column = input<ScDataTableCellColumn>();

  private readonly pinning = dataTablePinning(this.column);
}

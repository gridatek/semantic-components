import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { dataTablePinnedClasses, dataTablePinning } from './data-table-pinning';
import type { DataTableHeadColumn } from './data-table-types';

/**
 * A body cell bound to its column, for sticky pinned columns. Use with
 * `scTableCell`.
 *
 * ```html
 * <td scTableCell scDataTableCell [column]="cell.column">…</td>
 * ```
 */
@Directive({
  selector: 'td[scDataTableCell]',
  host: {
    '[attr.data-pinned]': 'pinning.pinned() || null',
    '[style.inset-inline-start.px]': 'pinning.offsetStart()',
    '[style.inset-inline-end.px]': 'pinning.offsetEnd()',
    '[class]': 'class()',
  },
})
export class ScDataTableCell {
  readonly column = input<DataTableHeadColumn>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly pinning = dataTablePinning(this.column);

  protected readonly class = computed(() =>
    cn(dataTablePinnedClasses, this.classInput()),
  );
}

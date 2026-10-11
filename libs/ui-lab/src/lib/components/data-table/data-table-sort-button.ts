import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { DataTableSortableColumn } from './data-table-types';

/**
 * Sorts its column on click (Shift+click adds to a multi-sort). The icons are
 * yours: read `direction()` to show them.
 *
 * ```html
 * <button scDataTableSortButton #sort="scDataTableSortButton" [column]="header.column">
 *   Email
 *   @switch (sort.direction()) {
 *     @case ('asc') { <svg siArrowUpIcon></svg> }
 *     @case ('desc') { <svg siArrowDownIcon></svg> }
 *     @default { <svg siChevronsUpDownIcon></svg> }
 *   }
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scDataTableSortButton]',
  exportAs: 'scDataTableSortButton',
  host: {
    type: 'button',
    '[attr.data-sort]': 'direction() || null',
    '[disabled]': '!column().getCanSort()',
    '(click)': 'toggle($event)',
    '[class]': 'class()',
  },
})
export class ScDataTableSortButton {
  readonly column = input.required<DataTableSortableColumn>();
  readonly classInput = input<string>('', { alias: 'class' });

  /** `'asc'`, `'desc'` or `false`. */
  readonly direction = computed(() => this.column().getIsSorted());

  protected readonly class = computed(() =>
    cn(
      '-ms-2 inline-flex h-8 items-center gap-1.5 rounded-md px-2 font-medium outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:pointer-events-none',
      '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground data-sort:[&_svg]:text-foreground',
      this.classInput(),
    ),
  );

  protected toggle(event: MouseEvent): void {
    const column = this.column();
    if (!column.getCanSort()) return;
    const multi = event.shiftKey && (column.getCanMultiSort?.() ?? false);
    column.toggleSorting(undefined, multi);
  }
}

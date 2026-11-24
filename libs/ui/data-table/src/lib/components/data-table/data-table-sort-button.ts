import { Directive, computed, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import type { ScDataTableSortableColumn } from './data-table-types';

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
  readonly column = input.required<ScDataTableSortableColumn>();
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly buttonStyles = injectStyle().button;

  /** `'asc'`, `'desc'` or `false`. */
  readonly direction = computed(() => this.column().getIsSorted());

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // Its text in line with the column's: the button's padding before it.
      '-ms-2.5',
      '[&_svg]:text-muted-foreground data-sort:[&_svg]:text-foreground',
      this.classInput(),
    ),
  );

  private toggle(event: MouseEvent): void {
    const column = this.column();
    if (!column.getCanSort()) return;
    const multi = event.shiftKey && (column.getCanMultiSort?.() ?? false);
    column.toggleSorting(undefined, multi);
  }
}

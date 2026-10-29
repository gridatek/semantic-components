import { Directive, computed, inject, input } from '@angular/core';
import { cn, injectPreset, ɵwarnIfUnnamed } from '@semantic-components/ui';
import type { ScButtonVariants } from '@semantic-components/ui';
import { ScDataTableTreeGrid } from './data-table-tree-grid';
import type { ScDataTableTreeRow } from './data-table-types';

/**
 * Opens or closes a row's children: your chevron inside (pointing to the
 * end), turned down when open, and its name (`sr-only`). Kept, unseen, on a
 * row without children, so the names line up. In a tree grid the row itself
 * is the control (→ / ←, Enter): the button is out of the tab order, and
 * hidden from screen readers.
 *
 * ```html
 * <button scDataTableExpand [row]="row">
 *   <svg siChevronRightIcon></svg>
 *   <span class="sr-only">Open {{ row.original.name }}</span>
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scDataTableExpand]',
  host: {
    type: 'button',
    '[attr.aria-expanded]': 'tree ? null : row().getIsExpanded()',
    '[attr.aria-hidden]': 'tree || !row().getCanExpand() ? "true" : null',
    '[attr.tabindex]': 'tree || !row().getCanExpand() ? -1 : null',
    '[attr.data-state]': 'row().getIsExpanded() ? "open" : "closed"',
    '[class]': 'class()',
    '(click)': 'toggle($event)',
  },
})
export class ScDataTableExpand {
  private readonly buttonStyles = injectPreset().button;
  protected readonly tree = inject(ScDataTableTreeGrid, { optional: true });

  readonly row = input.required<ScDataTableTreeRow>();
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      '[&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-90 rtl:data-[state=closed]:[&_svg]:-scale-x-100',
      !this.row().getCanExpand() && 'invisible',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scDataTableExpand');
  }

  protected toggle(event: Event): void {
    // The row, not the button, keeps the focus in a tree grid.
    if (this.tree) event.preventDefault();
    this.row().toggleExpanded();
  }
}

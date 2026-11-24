import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { ScTableRow } from '@semantic-components/ui';
import { ScDataTableTreeGrid } from './data-table-tree-grid';
import type { ScDataTableTreeRow } from './data-table-types';

/**
 * A row as `scDataTableRow` reads it: TanStack's — with selection, with
 * expanding, or neither.
 */
type ScDataTableRowState = Partial<ScDataTableTreeRow>;

/**
 * A row, in the Table's look. Bound to its row (`[row]`, in the body):
 * `data-state="selected"` while selected, which the look shows. In a tree grid
 * (`scDataTableTreeGrid`): a row of the tree — its level, its place among its
 * siblings, open or not, and in the tab order when it is the one focused.
 */
@Directive({
  selector: 'tr[scDataTableRow]',
  hostDirectives: [{ directive: ScTableRow, inputs: ['class'] }],
  host: {
    // Its focus ring, in a tree grid (the only rows that take focus).
    class:
      'focus-visible:outline-ring/50 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2',
    '[attr.data-state]': 'row()?.getIsSelected?.() ? "selected" : null',
    '[attr.data-row-id]': 'tree ? row()?.id : null',
    '[attr.aria-level]': 'tree ? (row()?.depth ?? 0) + 1 : null',
    '[attr.aria-posinset]': 'position()?.index ?? null',
    '[attr.aria-setsize]': 'position()?.count ?? null',
    '[attr.aria-expanded]': 'expanded()',
    '[attr.aria-selected]':
      'tree?.selectable() ? !!row()?.getIsSelected?.() : null',
    '[attr.tabindex]': 'tree ? (focused() ? 0 : -1) : null',
    '(focusin)': 'onFocus()',
  },
})
export class ScDataTableRow {
  private readonly tree = inject(ScDataTableTreeGrid, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly row = input<ScDataTableRowState>();
  private readonly position = computed(() => {
    const id = this.row()?.id;
    return this.tree && id ? this.tree.positions().get(id) : undefined;
  });

  /** Open or closed — for a row that has children. */
  private readonly expanded = computed(() => {
    const row = this.row();
    if (!this.tree || !row?.getCanExpand?.()) return null;
    return !!row.getIsExpanded?.();
  });

  private readonly focused = computed(
    () => !!this.tree && this.tree.focusedId() === this.row()?.id,
  );

  constructor() {
    effect((onCleanup) => {
      const id = this.row()?.id;
      if (this.tree && id) onCleanup(this.tree.register(id, this.element));
    });
  }

  private onFocus(): void {
    const id = this.row()?.id;
    if (this.tree && id) this.tree.activate(id);
  }
}

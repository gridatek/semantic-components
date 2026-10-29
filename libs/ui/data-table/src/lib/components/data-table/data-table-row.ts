import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScDataTableTreeGrid } from './data-table-tree-grid';
import type { ScDataTableTreeRow } from './data-table-types';

/**
 * A row as `scDataTableRow` reads it: TanStack's — with selection, with
 * expanding, or neither.
 */
type ScDataTableRowState = Partial<ScDataTableTreeRow>;

/**
 * A body row bound to its row: `data-state="selected"` while selected (the
 * `scTableRow` styles use it). Use with `scTableRow`. In a tree grid
 * (`scDataTableTreeGrid`): a row of the tree — its level, its place among its
 * siblings, open or not, and in the tab order when it is the one focused.
 */
@Directive({
  selector: 'tr[scDataTableRow]',
  host: {
    '[attr.data-state]': 'row()?.getIsSelected?.() ? "selected" : null',
    '[attr.data-row-id]': 'tree ? row()?.id : null',
    '[attr.aria-level]': 'tree ? (row()?.depth ?? 0) + 1 : null',
    '[attr.aria-posinset]': 'position()?.index ?? null',
    '[attr.aria-setsize]': 'position()?.count ?? null',
    '[attr.aria-expanded]': 'expanded()',
    '[attr.aria-selected]':
      'tree?.selectable() ? !!row()?.getIsSelected?.() : null',
    '[attr.tabindex]': 'tree ? (focused() ? 0 : -1) : null',
    '[class]': 'class()',
    '(focusin)': 'onFocus()',
  },
})
export class ScDataTableRow {
  protected readonly tree = inject(ScDataTableTreeGrid, { optional: true });
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly row = input<ScDataTableRowState>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly position = computed(() => {
    const id = this.row()?.id;
    return this.tree && id ? this.tree.positions().get(id) : undefined;
  });

  /** Open or closed — for a row that has children. */
  protected readonly expanded = computed(() => {
    const row = this.row();
    if (!this.tree || !row?.getCanExpand?.()) return null;
    return !!row.getIsExpanded?.();
  });

  protected readonly focused = computed(
    () => !!this.tree && this.tree.focusedId() === this.row()?.id,
  );

  protected readonly class = computed(() =>
    cn(
      this.tree &&
        'focus-visible:outline-ring/50 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2',
      this.classInput(),
    ),
  );

  constructor() {
    effect((onCleanup) => {
      const id = this.row()?.id;
      if (this.tree && id) onCleanup(this.tree.register(id, this.element));
    });
  }

  protected onFocus(): void {
    const id = this.row()?.id;
    if (this.tree && id) this.tree.activate(id);
  }
}

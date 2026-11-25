import { Directive, ElementRef, computed, inject, signal } from '@angular/core';
import { ScTable } from '@semantic-components/ui';
import { ScDataTableProvider } from './data-table-provider';
import type {
  ScDataTableTreePosition,
  ScDataTableTreeRow,
  ScDataTableTreeTable,
} from './data-table-types';

/**
 * A tree table, for the keyboard and screen readers (WAI-ARIA treegrid): one
 * tab stop, the rows below it — ↑/↓ between them, → opens a row or goes into
 * it, ← closes it or goes up to its parent (mirrored in right-to-left), Home
 * and End, Space selects, Enter opens or closes. Each `scDataTableRow` says
 * its level, its place and whether it is open. In the Table's look; its table
 * from `scDataTableProvider`.
 *
 * ```html
 * <div scDataTableProvider [table]="table">
 *   <table scDataTableTreeGrid aria-label="Files">…</table>
 * </div>
 * ```
 */
@Directive({
  selector: 'table[scDataTableTreeGrid]',
  exportAs: 'scDataTableTreeGrid',
  hostDirectives: [{ directive: ScTable, inputs: ['class'] }],
  host: {
    role: 'treegrid',
    '[attr.aria-multiselectable]': 'selectable() || null',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScDataTableTreeGrid {
  private readonly element =
    inject<ElementRef<HTMLTableElement>>(ElementRef).nativeElement;

  private readonly table = inject(ScDataTableProvider)
    .table as () => ScDataTableTreeTable;

  /** The rows shown, in order. */
  readonly rows = computed(() => this.table().getRowModel().rows);
  /** Rows that can be selected: Space selects, `aria-selected` says so. */
  readonly selectable = computed(
    () => this.rows()[0]?.getCanSelect?.() ?? false,
  );

  private readonly activeId = signal<string | null>(null);
  /** The row in the tab order: the last one focused, or the first. */
  readonly focusedId = computed(() => {
    const rows = this.rows();
    const id = this.activeId();
    return rows.some((row) => row.id === id) ? id : (rows[0]?.id ?? null);
  });

  readonly positions = computed(() => {
    const groups = new Map<string, ScDataTableTreeRow[]>();
    for (const row of this.rows()) {
      const key = row.parentId ?? '';
      groups.set(key, [...(groups.get(key) ?? []), row]);
    }
    const positions = new Map<string, ScDataTableTreePosition>();
    for (const siblings of groups.values())
      siblings.forEach((row, index) =>
        positions.set(row.id, { index: index + 1, count: siblings.length }),
      );
    return positions;
  });

  private readonly elements = new Map<string, HTMLElement>();

  /** A row's element, to focus it. */
  register(id: string, element: HTMLElement): () => void {
    this.elements.set(id, element);
    return () => {
      if (this.elements.get(id) === element) this.elements.delete(id);
    };
  }

  /** A row focused — by the keyboard or a click. */
  activate(id: string): void {
    this.activeId.set(id);
  }

  private onKeydown(event: KeyboardEvent): void {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    const target = event.target as HTMLElement;
    const rowElement = target.closest<HTMLElement>('tr[data-row-id]');
    if (!rowElement || !this.element.contains(rowElement)) return;
    const rows = this.rows();
    const index = rows.findIndex(
      (row) => row.id === rowElement.dataset['rowId'],
    );
    const row = rows[index];
    if (!row) return;
    const onRow = target === rowElement;
    // ← and → follow the line: reversed in right-to-left.
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const key =
      rtl && event.key === 'ArrowRight'
        ? 'ArrowLeft'
        : rtl && event.key === 'ArrowLeft'
          ? 'ArrowRight'
          : event.key;
    switch (key) {
      case 'ArrowDown':
        this.focus(rows[index + 1]);
        break;
      case 'ArrowUp':
        this.focus(rows[index - 1]);
        break;
      case 'Home':
        this.focus(rows[0]);
        break;
      case 'End':
        this.focus(rows[rows.length - 1]);
        break;
      case 'ArrowRight':
        if (row.getCanExpand() && !row.getIsExpanded())
          row.toggleExpanded(true);
        else if (row.getIsExpanded()) this.focus(rows[index + 1]);
        break;
      case 'ArrowLeft':
        if (row.getIsExpanded()) row.toggleExpanded(false);
        else this.focus(rows.find((r) => r.id === row.parentId));
        break;
      case 'Enter':
        if (!onRow || !row.getCanExpand()) return;
        row.toggleExpanded();
        break;
      case ' ':
        // Space on a checkbox ticks it itself.
        if (!onRow || !row.getCanSelect?.()) return;
        row.toggleSelected?.();
        break;
      default:
        return;
    }
    event.preventDefault();
  }

  private focus(row: ScDataTableTreeRow | undefined): void {
    if (!row) return;
    this.activeId.set(row.id);
    this.elements.get(row.id)?.focus();
  }
}

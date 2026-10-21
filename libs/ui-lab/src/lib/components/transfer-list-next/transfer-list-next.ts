import {
  Directive,
  booleanAttribute,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '@semantic-components/ui';
import type { ScTransferListNextPane } from './transfer-list-next-pane';

/** An item: yours, with an id and a label (for search and typeahead). */
export interface ScTransferListItem {
  readonly id: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export type ScTransferListSide = 'source' | 'target';

/**
 * Two sides: what can be chosen, and what is — `value`, the chosen ids in
 * order (a `[formField]`). The source side is the rest of `items`. Each side
 * a `scTransferListNextPane`; moved with the buttons, Enter or a double-click.
 */
@Directive({
  selector: '[scTransferListNext]',
  exportAs: 'scTransferListNext',
  host: {
    'data-slot': 'transfer-list',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
  },
})
export class ScTransferListNext<
  T extends ScTransferListItem = ScTransferListItem,
> implements FormValueControl<string[]> {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly items = input<readonly T[]>([]);
  /** The chosen ids, in order. */
  readonly value = model<string[]>([]);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  /** Left (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** Invalid once touched. */
  readonly showInvalid = computed(() => this.invalid() && this.touched());

  /** The chosen items, in the value's order. */
  readonly chosen = computed(() => {
    const byId = new Map(this.items().map((item) => [item.id, item]));
    return this.value()
      .map((id) => byId.get(id))
      .filter((item): item is T => !!item);
  });

  /** The rest, in the items' order. */
  readonly available = computed(() => {
    const chosen = new Set(this.value());
    return this.items().filter((item) => !chosen.has(item.id));
  });

  protected readonly class = computed(() =>
    cn('grid grid-cols-[1fr_auto_1fr] items-stretch gap-3', this.classInput()),
  );

  /** Its sides, as they register: a signal, for what reads them (the buttons). */
  private readonly panes = signal<
    Partial<Record<ScTransferListSide, ScTransferListNextPane>>
  >({});

  /** The items of a side. */
  side(side: ScTransferListSide): readonly T[] {
    return side === 'source' ? this.available() : this.chosen();
  }

  /** Moves `ids` to a side — still selected there, to move back at once. */
  move(ids: readonly string[], to: ScTransferListSide): void {
    if (this.disabled()) return;
    const movable = new Set(
      this.items()
        .filter((item) => ids.includes(item.id) && !item.disabled)
        .map((item) => item.id),
    );
    if (!movable.size) return;
    const value = this.value();
    this.value.set(
      to === 'target'
        ? [
            ...value,
            ...ids.filter((id) => movable.has(id) && !value.includes(id)),
          ]
        : value.filter((id) => !movable.has(id)),
    );
    this.pane(to === 'target' ? 'source' : 'target')?.ɵdeselect([...movable]);
    this.pane(to)?.ɵselect([...movable]);
    this.touch.emit();
  }

  /** Moves the chosen `ids` up (−1) or down (+1), together. */
  reorder(ids: readonly string[], step: -1 | 1): void {
    const value = [...this.value()];
    const picked = new Set(ids);
    const order = step < 0 ? value.keys() : [...value.keys()].reverse();
    for (const i of order) {
      const j = i + step;
      if (!picked.has(value[i]) || j < 0 || j >= value.length) continue;
      if (picked.has(value[j])) continue;
      [value[i], value[j]] = [value[j], value[i]];
    }
    this.value.set(value);
  }

  /** Whether the chosen `ids` can move by `step`. */
  canReorder(ids: readonly string[], step: -1 | 1): boolean {
    const value = this.value();
    const at = ids.map((id) => value.indexOf(id)).filter((i) => i >= 0);
    if (!at.length) return false;
    return step < 0 ? Math.min(...at) > 0 : Math.max(...at) < value.length - 1;
  }

  pane(side: ScTransferListSide): ScTransferListNextPane | undefined {
    return this.panes()[side];
  }

  ɵregister(pane: ScTransferListNextPane): () => void {
    const side = pane.side();
    this.panes.update((panes) => ({ ...panes, [side]: pane }));
    return () =>
      this.panes.update((panes) =>
        side === 'source' ? { target: panes.target } : { source: panes.source },
      );
  }
}

import {
  DestroyRef,
  Directive,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  ScTransferList,
  type ScTransferListItem,
  type ScTransferListSide,
} from './transfer-list';

/**
 * One side — `scTransferListPane="source"` or `"target"`: its items
 * (searched), its selection. Put in it your title, a search, a select-all,
 * and its listbox.
 */
@Directive({
  selector: '[scTransferListPane]',
  exportAs: 'scTransferListPane',
  host: {
    'data-slot': 'transfer-list-pane',
    '[attr.data-side]': 'side()',
    '[class]': 'class()',
  },
})
export class ScTransferListPane {
  readonly list = inject(ScTransferList);

  readonly side = input.required<ScTransferListSide>({
    alias: 'scTransferListPane',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  /** The search's text. */
  readonly query = signal('');
  /** The selected ids, on this side. */
  readonly selected = signal<string[]>([]);

  /** Its items, as searched. */
  readonly items = computed<readonly ScTransferListItem[]>(() => {
    const all = this.list.side(this.side());
    const query = this.query().trim().toLocaleLowerCase();
    return query
      ? all.filter((item) => item.label.toLocaleLowerCase().includes(query))
      : all;
  });

  /** The ones that can be selected and moved. */
  readonly selectable = computed(() =>
    this.items().filter((item) => !item.disabled),
  );

  protected readonly class = computed(() =>
    cn(
      'bg-card text-foreground flex min-w-0 flex-col overflow-hidden rounded-lg border',
      this.list.showInvalid() && 'border-destructive',
      this.classInput(),
    ),
  );

  constructor() {
    const destroy = inject(DestroyRef);
    // Registered once its side is known.
    afterNextRender(() => destroy.onDestroy(this.list.ɵregister(this)));
    // Selected, still here: an item moved away, or filtered out, is not.
    effect(() => {
      const ids = new Set(this.items().map((item) => item.id));
      untracked(() =>
        this.selected.update((selected) =>
          selected.every((id) => ids.has(id))
            ? selected
            : selected.filter((id) => ids.has(id)),
        ),
      );
    });
  }

  /** Selects all it shows, or none. */
  selectAll(on: boolean): void {
    this.selected.set(on ? this.selectable().map((item) => item.id) : []);
  }

  /** Moves its selection to the other side. */
  moveSelected(): void {
    this.list.move(
      this.selected(),
      this.side() === 'source' ? 'target' : 'source',
    );
  }

  ɵselect(ids: readonly string[]): void {
    this.selected.set([...ids]);
  }

  ɵdeselect(ids: readonly string[]): void {
    this.selected.update((selected) =>
      selected.filter((id) => !ids.includes(id)),
    );
  }
}

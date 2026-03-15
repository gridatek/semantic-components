import {
  Injectable,
  type WritableSignal,
  computed,
  signal,
} from '@angular/core';
import type { TransferListItem } from './transfer-list-types';

@Injectable()
export class ScTransferListState {
  sourceItems!: WritableSignal<TransferListItem[]>;
  targetItems!: WritableSignal<TransferListItem[]>;

  onTransfer: (() => void) | undefined;

  readonly selectedSourceIds = signal<Set<string>>(new Set());
  readonly selectedTargetIds = signal<Set<string>>(new Set());
  readonly sourceSearch = signal('');
  readonly targetSearch = signal('');

  readonly filteredSourceItems = computed(() => {
    const search = this.sourceSearch().toLowerCase();
    if (!search) return this.sourceItems();
    return this.sourceItems().filter(
      (item) =>
        item.label.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search),
    );
  });

  readonly filteredTargetItems = computed(() => {
    const search = this.targetSearch().toLowerCase();
    if (!search) return this.targetItems();
    return this.targetItems().filter(
      (item) =>
        item.label.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search),
    );
  });

  readonly allSourceSelected = computed(() => {
    const items = this.sourceItems().filter((i) => !i.disabled);
    return (
      items.length > 0 && items.every((i) => this.selectedSourceIds().has(i.id))
    );
  });

  readonly someSourceSelected = computed(() => {
    const items = this.sourceItems().filter((i) => !i.disabled);
    const selected = items.filter((i) => this.selectedSourceIds().has(i.id));
    return selected.length > 0 && selected.length < items.length;
  });

  readonly allTargetSelected = computed(() => {
    const items = this.targetItems().filter((i) => !i.disabled);
    return (
      items.length > 0 && items.every((i) => this.selectedTargetIds().has(i.id))
    );
  });

  readonly someTargetSelected = computed(() => {
    const items = this.targetItems().filter((i) => !i.disabled);
    const selected = items.filter((i) => this.selectedTargetIds().has(i.id));
    return selected.length > 0 && selected.length < items.length;
  });

  toggleItem(side: 'source' | 'target', item: TransferListItem): void {
    if (item.disabled) return;
    const ids =
      side === 'source' ? this.selectedSourceIds : this.selectedTargetIds;
    ids.update((set) => {
      const newSet = new Set(set);
      if (newSet.has(item.id)) {
        newSet.delete(item.id);
      } else {
        newSet.add(item.id);
      }
      return newSet;
    });
  }

  toggleAll(side: 'source' | 'target'): void {
    const items = (
      side === 'source' ? this.sourceItems : this.targetItems
    )().filter((i) => !i.disabled);
    const ids =
      side === 'source' ? this.selectedSourceIds : this.selectedTargetIds;
    const allSel =
      side === 'source' ? this.allSourceSelected : this.allTargetSelected;
    if (allSel()) {
      ids.set(new Set());
    } else {
      ids.set(new Set(items.map((i) => i.id)));
    }
  }

  moveToTarget(): void {
    const selectedIds = this.selectedSourceIds();
    const toMove = this.sourceItems().filter(
      (i) => selectedIds.has(i.id) && !i.disabled,
    );
    const remaining = this.sourceItems().filter(
      (i) => !selectedIds.has(i.id) || i.disabled,
    );
    this.sourceItems.set(remaining);
    this.targetItems.update((items) => [...items, ...toMove]);
    this.selectedSourceIds.set(new Set());
    this.onTransfer?.();
  }

  moveToSource(): void {
    const selectedIds = this.selectedTargetIds();
    const toMove = this.targetItems().filter(
      (i) => selectedIds.has(i.id) && !i.disabled,
    );
    const remaining = this.targetItems().filter(
      (i) => !selectedIds.has(i.id) || i.disabled,
    );
    this.targetItems.set(remaining);
    this.sourceItems.update((items) => [...items, ...toMove]);
    this.selectedTargetIds.set(new Set());
    this.onTransfer?.();
  }

  moveAllToTarget(): void {
    const toMove = this.sourceItems().filter((i) => !i.disabled);
    const remaining = this.sourceItems().filter((i) => i.disabled);
    this.sourceItems.set(remaining);
    this.targetItems.update((items) => [...items, ...toMove]);
    this.selectedSourceIds.set(new Set());
    this.onTransfer?.();
  }

  moveAllToSource(): void {
    const toMove = this.targetItems().filter((i) => !i.disabled);
    const remaining = this.targetItems().filter((i) => i.disabled);
    this.targetItems.set(remaining);
    this.sourceItems.update((items) => [...items, ...toMove]);
    this.selectedTargetIds.set(new Set());
    this.onTransfer?.();
  }
}

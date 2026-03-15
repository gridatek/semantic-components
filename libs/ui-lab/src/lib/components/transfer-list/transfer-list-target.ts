import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_TRANSFER_LIST_PANEL,
  type ScTransferListPanelRef,
} from './transfer-list-panel-ref';
import { ScTransferListState } from './transfer-list-state';
import type { TransferListItem } from './transfer-list-types';

@Directive({
  selector: 'div[scTransferListTarget]',
  exportAs: 'scTransferListTarget',
  providers: [
    {
      provide: SC_TRANSFER_LIST_PANEL,
      useExisting: ScTransferListTarget,
    },
  ],
  host: {
    'data-slot': 'transfer-list-target',
    '[class]': 'class()',
  },
})
export class ScTransferListTarget implements ScTransferListPanelRef {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = inject(ScTransferListState);

  protected readonly class = computed(() =>
    cn(
      'flex flex-col overflow-hidden rounded-lg border bg-card',
      this.classInput(),
    ),
  );

  readonly filteredItems = computed(() => this.state.filteredTargetItems());
  readonly selectedIds = computed(() => this.state.selectedTargetIds());
  readonly allSelected = computed(() => this.state.allTargetSelected());
  readonly someSelected = computed(() => this.state.someTargetSelected());
  readonly selectedCount = computed(() => this.state.selectedTargetIds().size);
  readonly totalCount = computed(() => this.state.targetItems().length);
  readonly searchValue = computed(() => this.state.targetSearch());

  toggleAll(): void {
    this.state.toggleAll('target');
  }

  toggleItem(item: TransferListItem): void {
    this.state.toggleItem('target', item);
  }

  onSearchInput(value: string): void {
    this.state.targetSearch.set(value);
  }
}

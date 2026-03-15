import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_TRANSFER_LIST_PANEL,
  type ScTransferListPanelRef,
} from './transfer-list-panel-ref';
import { ScTransferListState } from './transfer-list-state';
import type { TransferListItem } from './transfer-list-types';

@Directive({
  selector: 'div[scTransferListSource]',
  exportAs: 'scTransferListSource',
  providers: [
    {
      provide: SC_TRANSFER_LIST_PANEL,
      useExisting: ScTransferListSource,
    },
  ],
  host: {
    'data-slot': 'transfer-list-source',
    '[class]': 'class()',
  },
})
export class ScTransferListSource implements ScTransferListPanelRef {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = inject(ScTransferListState);

  protected readonly class = computed(() =>
    cn(
      'flex flex-col overflow-hidden rounded-lg border bg-card',
      this.classInput(),
    ),
  );

  readonly filteredItems = computed(() => this.state.filteredSourceItems());
  readonly selectedIds = computed(() => this.state.selectedSourceIds());
  readonly allSelected = computed(() => this.state.allSourceSelected());
  readonly someSelected = computed(() => this.state.someSourceSelected());
  readonly selectedCount = computed(() => this.state.selectedSourceIds().size);
  readonly totalCount = computed(() => this.state.sourceItems().length);
  readonly searchValue = computed(() => this.state.sourceSearch());

  toggleAll(): void {
    this.state.toggleAll('source');
  }

  toggleItem(item: TransferListItem): void {
    this.state.toggleItem('source', item);
  }

  onSearchInput(value: string): void {
    this.state.sourceSearch.set(value);
  }
}

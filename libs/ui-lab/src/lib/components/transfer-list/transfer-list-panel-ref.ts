import { InjectionToken, type Signal } from '@angular/core';
import type { TransferListItem } from './transfer-list-types';

export interface ScTransferListPanelRef {
  readonly filteredItems: Signal<TransferListItem[]>;
  readonly selectedIds: Signal<Set<string>>;
  readonly allSelected: Signal<boolean>;
  readonly someSelected: Signal<boolean>;
  readonly selectedCount: Signal<number>;
  readonly totalCount: Signal<number>;
  readonly searchValue: Signal<string>;
  toggleAll(): void;
  toggleItem(item: TransferListItem): void;
  onSearchInput(value: string): void;
}

export const SC_TRANSFER_LIST_PANEL =
  new InjectionToken<ScTransferListPanelRef>('ScTransferListPanel');

export interface TransferListItem {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferListState {
  source: TransferListItem[];
  target: TransferListItem[];
}

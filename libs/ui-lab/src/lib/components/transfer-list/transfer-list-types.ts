export interface ScTransferListItemData {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ScTransferListChange {
  source: ScTransferListItemData[];
  target: ScTransferListItemData[];
}

export interface ScCombobox2Item {
  id: string;
  label: string;
  subtitle?: string;
  data?: unknown;
}

export interface ScCombobox2Config {
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  showSearch?: boolean;
}

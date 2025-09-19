export interface ScComboboxItem {
  id: string;
  label: string;
  subtitle?: string;
  data?: unknown;
}

export interface ScComboboxConfig {
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  showSearch?: boolean;
}

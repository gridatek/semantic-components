export interface SearchSuggestion {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category?: string;
}

export interface SearchInputOptions {
  placeholder?: string;
  debounceMs?: number;
  minChars?: number;
  maxSuggestions?: number;
}

export const DEFAULT_SEARCH_OPTIONS: Required<SearchInputOptions> = {
  placeholder: 'Search...',
  debounceMs: 300,
  minChars: 1,
  maxSuggestions: 10,
};

import { computed, signal } from '@angular/core';

import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

export interface SearchableItem {
  id: string;
  label: string;
  subtitle?: string;
  group?: string;
  [key: string]: any;
}

export interface SearchConfig {
  debounceTime?: number;
  minSearchLength?: number;
  searchFields?: string[];
  caseSensitive?: boolean;
}

export class SearchBehavior<T extends SearchableItem> {
  private readonly _searchTerm = signal<string>('');
  private readonly _items = signal<T[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  private readonly searchSubject = new BehaviorSubject<string>('');
  private readonly destroy$ = new Subject<void>();

  readonly searchTerm = this._searchTerm.asReadonly();
  readonly items = this._items.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly filteredItems = computed(() => {
    const term = this._searchTerm();
    const items = this._items();

    if (!term) return items;

    return this.filterItems(items, term);
  });

  readonly hasResults = computed(() => this.filteredItems().length > 0);
  readonly isEmpty = computed(() => this.filteredItems().length === 0 && !this.isLoading());

  constructor(private config: SearchConfig = {}) {
    this.setupSearch();
  }

  private setupSearch(): void {
    const debounce = this.config.debounceTime ?? 300;

    this.searchSubject
      .pipe(
        debounceTime(debounce),
        distinctUntilChanged(),
        map((term) => term.trim()),
      )
      .subscribe((term) => {
        this._searchTerm.set(term);
      });
  }

  setItems(items: T[]): void {
    this._items.set(items);
  }

  updateSearch(term: string): void {
    this.searchSubject.next(term);
  }

  clearSearch(): void {
    this._searchTerm.set('');
    this.searchSubject.next('');
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  private filterItems(items: T[], searchTerm: string): T[] {
    const {
      minSearchLength = 0,
      searchFields = ['label', 'subtitle'],
      caseSensitive = false,
    } = this.config;

    if (searchTerm.length < minSearchLength) {
      return items;
    }

    const term = caseSensitive ? searchTerm : searchTerm.toLowerCase();

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          const fieldValue = caseSensitive ? value : value.toLowerCase();
          return fieldValue.includes(term);
        }
        return false;
      });
    });
  }

  getGroupedItems(): { group: string; items: T[] }[] {
    const items = this.filteredItems();
    const groups = new Map<string, T[]>();

    items.forEach((item) => {
      const group = item.group || 'Other';
      if (!groups.has(group)) {
        groups.set(group, []);
      }
      groups.get(group)!.push(item);
    });

    return Array.from(groups.entries()).map(([group, items]) => ({
      group,
      items,
    }));
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

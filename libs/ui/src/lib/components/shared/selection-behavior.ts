import { computed, signal } from '@angular/core';

export interface SelectionConfig {
  multiple?: boolean;
  maxSelections?: number;
  required?: boolean;
}

export class SelectionBehavior<T extends { id: string }> {
  private readonly _selectedItems = signal<T[]>([]);
  private readonly _config = signal<SelectionConfig>({});

  readonly selectedItems = this._selectedItems.asReadonly();
  readonly config = this._config.asReadonly();

  readonly selectedValues = computed(() => this._selectedItems().map((item) => item.id));

  readonly selectedValueSet = computed(() => new Set(this.selectedValues()));

  readonly hasSelection = computed(() => this._selectedItems().length > 0);

  readonly selectionCount = computed(() => this._selectedItems().length);

  readonly isSingleSelection = computed(() => !this._config().multiple);

  readonly isMultipleSelection = computed(() => !!this._config().multiple);

  readonly canSelectMore = computed(() => {
    const config = this._config();
    if (!config.multiple) return !this.hasSelection();
    if (config.maxSelections) {
      return this.selectionCount() < config.maxSelections;
    }
    return true;
  });

  setConfig(config: SelectionConfig): void {
    this._config.set(config);

    // If switching to single selection, keep only first item
    if (!config.multiple && this._selectedItems().length > 1) {
      this._selectedItems.set([this._selectedItems()[0]]);
    }
  }

  selectItem(item: T): void {
    const config = this._config();
    const currentItems = this._selectedItems();

    if (config.multiple) {
      // Multi-select logic
      const isSelected = this.isSelected(item);

      if (isSelected) {
        // Remove item
        this._selectedItems.set(currentItems.filter((selected) => selected.id !== item.id));
      } else if (this.canSelectMore()) {
        // Add item
        this._selectedItems.set([...currentItems, item]);
      }
    } else {
      // Single select logic
      this._selectedItems.set([item]);
    }
  }

  deselectItem(item: T): void {
    this._selectedItems.set(this._selectedItems().filter((selected) => selected.id !== item.id));
  }

  clearSelection(): void {
    this._selectedItems.set([]);
  }

  isSelected(item: T): boolean {
    return this.selectedValueSet().has(item.id);
  }

  setSelectedItems(items: T[]): void {
    const config = this._config();

    if (!config.multiple && items.length > 1) {
      // For single selection, only take the first item
      this._selectedItems.set(items.slice(0, 1));
    } else if (config.maxSelections && items.length > config.maxSelections) {
      // Respect max selections limit
      this._selectedItems.set(items.slice(0, config.maxSelections));
    } else {
      this._selectedItems.set([...items]);
    }
  }

  setSelectedValues(values: string[], allItems: T[]): void {
    const valueSet = new Set(values);
    const selectedItems = allItems.filter((item) => valueSet.has(item.id));
    this.setSelectedItems(selectedItems);
  }

  toggleItem(item: T): void {
    if (this.isSelected(item)) {
      this.deselectItem(item);
    } else {
      this.selectItem(item);
    }
  }

  getFormValue(): string | string[] | null {
    const config = this._config();
    const values = this.selectedValues();

    if (config.multiple) {
      return values;
    } else {
      return values.length > 0 ? values[0] : null;
    }
  }

  validate(): { [key: string]: any } | null {
    const config = this._config();
    const hasSelection = this.hasSelection();

    if (config.required && !hasSelection) {
      return { required: true };
    }

    return null;
  }
}

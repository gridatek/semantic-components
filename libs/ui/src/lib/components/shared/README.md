# Shared Behaviors for Selector Components

This directory contains reusable behavior classes that provide common functionality for selector components like comboboxes, autocompletes, multi-selects, and dropdowns.

## 🎯 Overview

The shared behaviors follow a composition-over-inheritance pattern, allowing components to mix and match the behaviors they need while maintaining consistency across the component library.

### Available Behaviors

- **`DropdownBehavior`** - Manages dropdown state and overlay positioning
- **`SearchBehavior`** - Handles search/filtering with debounced input
- **`SelectionBehavior`** - Manages single/multi-selection logic

### Available Components

- **`ScSelectorOption`** - Common directive for option items with consistent styling and behavior
- **`ScSelectorPanel`** - Reusable panel component for displaying filtered options with support for grouping and custom templates

## 📚 Behavior Classes

### DropdownBehavior

Manages dropdown overlay state, positioning, and trigger width calculations.

```typescript
import { DropdownBehavior } from '@semantic-components/ui';

export class MyComponent {
  protected readonly dropdown = new DropdownBehavior();

  // Use computed properties
  protected readonly isOpen = computed(() => this.dropdown.isOpen());

  // Use default positions
  get overlayPositions() {
    return this.dropdown.defaultPositions;
  }

  // Control dropdown state
  toggleDropdown() {
    this.dropdown.toggle();
  }

  openDropdown() {
    this.dropdown.open();
  }

  closeDropdown() {
    this.dropdown.close();
  }

  // Update trigger width (call when dropdown opens)
  updateTriggerWidth() {
    this.dropdown.updateTriggerWidth(this.triggerElementRef);
  }
}
```

### SearchBehavior

Provides search/filtering functionality with configurable options.

```typescript
import { SearchBehavior, SearchableItem } from '@semantic-components/ui';

// Your items must implement SearchableItem interface
interface MyItem extends SearchableItem {
  id: string;
  label: string;
  subtitle?: string;
  group?: string;
}

export class MyComponent {
  protected readonly search = new SearchBehavior<MyItem>({
    debounceTime: 300, // ms to debounce search input
    minSearchLength: 2, // minimum characters before filtering
    searchFields: ['label', 'subtitle'], // fields to search in
    caseSensitive: false, // case sensitive search
  });

  // Use computed properties
  protected readonly searchTerm = computed(() => this.search.searchTerm());
  protected readonly filteredItems = computed(() => this.search.filteredItems());
  protected readonly isLoading = computed(() => this.search.isLoading());

  constructor() {
    // Set initial items
    effect(() => {
      this.search.setItems(this.myItems());
    });

    // Handle search changes
    effect(() => {
      const term = this.search.searchTerm();
      this.onSearchChange.emit(term);
    });
  }

  // Update search term
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.updateSearch(input.value);
  }

  // Clear search
  clearSearch() {
    this.search.clearSearch();
  }

  // For async search
  async performAsyncSearch(term: string) {
    this.search.setLoading(true);
    try {
      const results = await this.fetchResults(term);
      this.search.setItems(results);
    } finally {
      this.search.setLoading(false);
    }
  }

  ngOnDestroy() {
    this.search.destroy();
  }
}
```

### SelectionBehavior

Manages item selection for both single and multi-select scenarios.

```typescript
import { SearchableItem, SelectionBehavior } from '@semantic-components/ui';

export class MyComponent {
  protected readonly selection = new SelectionBehavior<MyItem>();

  // Use computed properties
  protected readonly selectedItems = computed(() => this.selection.selectedItems());
  protected readonly selectedValues = computed(() => this.selection.selectedValues());
  protected readonly hasSelection = computed(() => this.selection.hasSelection());

  constructor() {
    // Configure selection behavior
    this.selection.setConfig({
      multiple: true, // allow multiple selections
      maxSelections: 5, // limit number of selections
      required: true, // require at least one selection
    });

    // Handle selection changes
    effect(() => {
      const selected = this.selection.selectedItems();
      this.onSelectionChange.emit(selected);
    });
  }

  // Select an item
  selectItem(item: MyItem) {
    this.selection.selectItem(item);
  }

  // Toggle selection
  toggleItem(item: MyItem) {
    this.selection.toggleItem(item);
  }

  // Check if item is selected
  isSelected(item: MyItem): boolean {
    return this.selection.isSelected(item);
  }

  // Clear all selections
  clearSelection() {
    this.selection.clearSelection();
  }

  // Set selections programmatically
  setSelectedItems(items: MyItem[]) {
    this.selection.setSelectedItems(items);
  }

  // For form integration
  writeValue(values: string[]) {
    this.selection.setSelectedValues(values, this.allItems);
  }

  // Get form value
  getFormValue() {
    return this.selection.getFormValue(); // string | string[] | null
  }

  // Validate selection
  validate() {
    return this.selection.validate(); // validation errors or null
  }
}
```

## 🧩 Shared Components

### ScSelectorOption Directive

A directive that provides consistent styling and behavior for option items across all selector components.

```typescript
import { ScSelectorOption } from '@semantic-components/ui';

@Component({
  template: `
    @for (item of items(); track item.id) {
      <div
        [item]="item"
        [isSelected]="isSelected(item)"
        [disabled]="isDisabled(item)"
        (click)="selectItem(item)"
        (mouseenter)="setActiveItem(item)"
        scSelectorOption
      >
        <div class="flex-1">
          <div class="font-medium">{{ item.label }}</div>
          @if (item.subtitle) {
            <div class="text-xs text-muted-foreground">{{ item.subtitle }}</div>
          }
        </div>
      </div>
    }
  `,
})
export class MyComponent {
  // The directive automatically provides:
  // - Consistent hover and active styles
  // - Proper ARIA attributes
  // - Smooth scrolling when highlighted
  // - Disabled state handling
}
```

### ScSelectorPanel Component

A complete panel component that handles the display of options with built-in support for loading states, empty states, grouping, and custom templates.

```typescript
import { ScSelectorPanel } from '@semantic-components/ui';

@Component({
  template: `
    <sc-selector-panel
      [items]="filteredItems()"
      [multiple]="true"
      [grouped]="true"
      [isLoading]="isLoading()"
      [selectedValues]="selectedValues()"
      [disabledValues]="disabledValues()"
      [loadingMessage]="'Searching...'"
      [emptyMessage]="'No results found'"
      (itemSelected)="onItemSelected($event)"
      (itemHovered)="onItemHovered($event)"
    >
      <!-- Optional custom item template -->
      <ng-template itemTemplate let-item let-selected="selected">
        <div class="flex items-center space-x-2">
          <img class="w-6 h-6 rounded-full" [src]="item.avatar" />
          <div class="flex-1">
            <div class="font-medium">{{ item.label }}</div>
            <div class="text-xs text-muted-foreground">{{ item.email }}</div>
          </div>
          @if (selected) {
            <svg class="w-4 h-4 text-primary" fill="currentColor">
              <!-- checkmark icon -->
            </svg>
          }
        </div>
      </ng-template>
    </sc-selector-panel>
  `,
})
export class MyComponent {
  // The panel automatically handles:
  // - Loading states with customizable messages
  // - Empty states when no items match
  // - Grouping items by the 'group' property
  // - Multi-select with checkmarks
  // - Custom item templates
  // - Disabled items
  // - Keyboard navigation support
}
```

## 🔧 Complete Component Example

Here's how to combine all three behaviors in a complete selector component:

```typescript
import {
  DropdownBehavior,
  SearchBehavior,
  SearchableItem,
  SelectionBehavior,
} from '@semantic-components/ui';

interface MySelectItem extends SearchableItem {
  id: string;
  label: string;
  subtitle?: string;
  data?: any;
}

@Component({
  selector: 'my-select',
  template: `
    <button [attr.aria-expanded]="isOpen()" (click)="dropdown.toggle()">
      {{ selectedItems().length ? getDisplayText() : placeholder() }}
    </button>

    <ng-template [cdkConnectedOverlayOpen]="isOpen()" cdkConnectedOverlay>
      <div class="dropdown-panel">
        <input [value]="searchTerm()" (input)="handleSearch($event)" placeholder="Search..." />

        @if (isLoading()) {
          <div>Loading...</div>
        } @else {
          @for (item of filteredItems(); track item.id) {
            <div [class.selected]="selection.isSelected(item)" (click)="selectItem(item)">
              {{ item.label }}
            </div>
          }
        }
      </div>
    </ng-template>
  `,
})
export class MySelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // Shared behaviors
  protected readonly dropdown = new DropdownBehavior();
  protected readonly search = new SearchBehavior<MySelectItem>();
  protected readonly selection = new SelectionBehavior<MySelectItem>();

  // Inputs
  readonly items = input<MySelectItem[]>([]);
  readonly placeholder = input('Select items...');
  readonly multiple = input(false);

  // Computed properties
  protected readonly isOpen = computed(() => this.dropdown.isOpen());
  protected readonly searchTerm = computed(() => this.search.searchTerm());
  protected readonly filteredItems = computed(() => this.search.filteredItems());
  protected readonly isLoading = computed(() => this.search.isLoading());
  protected readonly selectedItems = computed(() => this.selection.selectedItems());

  constructor() {
    // Setup behaviors
    effect(() => {
      this.selection.setConfig({ multiple: this.multiple() });
    });

    effect(() => {
      this.search.setItems(this.items());
    });

    // Handle changes
    effect(() => {
      const selected = this.selection.selectedItems();
      this.onChange(this.selection.getFormValue());
      this.selectionChange.emit(selected);
    });
  }

  handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.updateSearch(input.value);
  }

  selectItem(item: MySelectItem) {
    this.selection.selectItem(item);
    if (!this.multiple()) {
      this.dropdown.close();
    }
  }

  getDisplayText(): string {
    const selected = this.selectedItems();
    if (selected.length === 1) {
      return selected[0].label;
    }
    return `${selected.length} items selected`;
  }

  // ControlValueAccessor implementation
  writeValue(value: any) {
    if (Array.isArray(value)) {
      this.selection.setSelectedValues(value, this.items());
    } else if (value) {
      this.selection.setSelectedValues([value], this.items());
    } else {
      this.selection.clearSelection();
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.search.destroy();
  }
}
```

## 🏗️ Architecture Benefits

### Code Reuse

- Eliminates duplicate logic across selector components
- Consistent behavior patterns throughout the library
- Easier to maintain and update common functionality

### Type Safety

- Full TypeScript support with generics
- Proper interfaces for extensibility
- Compile-time error checking

### Performance

- Angular signals for efficient change detection
- Computed properties for optimized updates
- Debounced search to reduce API calls

### Flexibility

- Mix and match behaviors as needed
- Configure each behavior independently
- Easy to extend with custom logic

## 📝 Interface Reference

### SearchableItem

```typescript
interface SearchableItem {
  id: string;
  label: string;
  subtitle?: string;
  group?: string;
  [key: string]: any;
}
```

### SearchConfig

```typescript
interface SearchConfig {
  debounceTime?: number; // Default: 300ms
  minSearchLength?: number; // Default: 0
  searchFields?: string[]; // Default: ['label', 'subtitle']
  caseSensitive?: boolean; // Default: false
}
```

### SelectionConfig

```typescript
interface SelectionConfig {
  multiple?: boolean; // Default: false
  maxSelections?: number; // Default: unlimited
  required?: boolean; // Default: false
}
```

## 🔄 Migration Guide

If you have existing selector components, here's how to migrate them:

1. **Install the shared behaviors**:

   ```typescript
   import { DropdownBehavior, SearchBehavior, SelectionBehavior } from '@semantic-components/ui';
   ```

2. **Replace manual state management**:

   ```typescript
   // Before
   isOpen = signal(false);
   selectedItems = signal([]);

   // After
   protected readonly dropdown = new DropdownBehavior();
   protected readonly selection = new SelectionBehavior();
   protected readonly isOpen = computed(() => this.dropdown.isOpen());
   protected readonly selectedItems = computed(() => this.selection.selectedItems());
   ```

3. **Update template bindings**:

   ```html
   <!-- Before -->
   [isOpen]="isOpen()"

   <!-- After -->
   [isOpen]="dropdown.isOpen()"
   ```

4. **Replace method calls**:

   ```typescript
   // Before
   this.isOpen.set(true);

   // After
   this.dropdown.open();
   ```

## 🚀 Getting Started

1. Import the behaviors you need from `@semantic-components/ui`
2. Create instances in your component constructor
3. Use computed properties to access behavior state
4. Set up effects to handle configuration and changes
5. Call behavior methods to control state

See the `combobox-refactored-example.ts` file for a complete working example.

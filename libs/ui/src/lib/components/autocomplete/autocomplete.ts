import { _IdGenerator } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject } from 'rxjs';

import { DropdownBehavior } from '../shared/dropdown-behavior';
import { SearchBehavior, SearchableItem } from '../shared/search-behavior';
import { SelectionBehavior } from '../shared/selection-behavior';
import { ScSelectorPanel } from '../shared/selector-panel';
import { ScAutocompleteInput } from './autocomplete-input';

// Helper function to convert string to SearchableItem
function toSearchableItem(item: string | SearchableItem): SearchableItem {
  if (typeof item === 'string') {
    return { id: item, label: item };
  }
  return item;
}

@Component({
  selector: 'sc-autocomplete',
  imports: [OverlayModule, ScAutocompleteInput, ScSelectorPanel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScAutocomplete),
      multi: true,
    },
  ],
  template: `
    <div class="autocomplete-container" #container>
      <div class="relative">
        <!-- Single Select Input -->
        <sc-autocomplete-input
          #singleInput
          #trigger="cdkOverlayOrigin"
          [inputId]="id()"
          [placeholder]="placeholder()"
          [showToggleButton]="showToggleButton()"
          [isOpen]="isOpen()"
          [listboxId]="listboxId"
          [activeItemId]="activeItemId"
          (inputChange)="handleInput($event)"
          (focusChange)="open()"
          (blurChange)="handleBlur()"
          (keydownChange)="handleKeydown($event)"
          (toggleChange)="toggle()"
          cdkOverlayOrigin
        />

        <!-- Dropdown Panel using CDK Overlay -->
        <ng-template
          [cdkConnectedOverlayOrigin]="triggerElement()"
          [cdkConnectedOverlayOpen]="isOpen()"
          [cdkConnectedOverlayWidth]="triggerWidth + 'px'"
          [cdkConnectedOverlayMinWidth]="triggerWidth + 'px'"
          [cdkConnectedOverlayHasBackdrop]="true"
          [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
          [cdkConnectedOverlayPositions]="positions"
          (backdropClick)="close()"
          (detach)="close()"
          cdkConnectedOverlay
        >
          <sc-selector-panel
            #panel
            [items]="filteredItems()"
            [multiple]="false"
            [grouped]="grouped()"
            [selectedValues]="selectedValuesSet()"
            [isLoading]="isLoading()"
            [style.width.px]="triggerWidth"
            [style.min-width.px]="triggerWidth"
            [style.max-width.px]="triggerWidth"
            (itemSelected)="selectItem($event)"
            (itemHovered)="setActiveItem($event)"
          />
        </ng-template>
      </div>

      <!-- Status Display -->
      @if (showStatus()) {
        <p class="mt-2 text-sm text-gray-500">
          Selected:
          <span class="font-medium">
            {{ selectedValue() ? getItemLabel(selectedValue()) : 'None' }}
          </span>
        </p>
      }
      @if (async() && showStatus()) {
        <p class="mt-2 text-sm text-gray-500">
          Status:
          <span class="font-medium">{{ isLoading() ? 'Loading...' : 'Ready' }}</span>
        </p>
      }
    </div>
  `,
  host: {
    'data-slot': 'control',
    class: 'block',
  },
})
export class ScAutocomplete implements OnDestroy, AfterViewInit, ControlValueAccessor {
  // Shared behaviors
  protected readonly dropdownBehavior = new DropdownBehavior();
  protected readonly search = new SearchBehavior<SearchableItem>();
  protected readonly selection = new SelectionBehavior<SearchableItem>();

  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-autocomplete-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());

  readonly placeholderInput = input<string>('Type to search...', {
    alias: 'placeholder',
  });
  readonly placeholder = linkedSignal(() => this.placeholderInput());
  readonly items = input<(string | SearchableItem)[]>([]);
  readonly async = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly showStatus = input<boolean>(true);
  readonly showToggleButton = input<boolean>(true);
  readonly asyncSearchFn = input<(query: string) => Promise<SearchableItem[]>>();

  readonly selectionChange = output<any>();
  readonly searchChange = output<string>();

  readonly singleInput = viewChild<ScAutocompleteInput>('singleInput');
  readonly panel = viewChild<ScSelectorPanel>('panel');
  readonly containerElement = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  // Computed properties using shared behaviors
  protected readonly isOpen = computed(() => this.dropdownBehavior.isOpen());
  protected readonly isLoading = computed(() => this.search.isLoading());
  protected readonly filteredItems = computed(() => {
    return this.search.filteredItems();
  });

  protected readonly selectedValue = computed(() => {
    const selected = this.selection.selectedItems()[0];
    return selected ? selected.id : null;
  });

  protected readonly selectedValuesSet = computed(() => {
    const selected = this.selection.selectedItems();
    return new Set(selected.map((item) => item.id));
  });

  // Legacy properties for template compatibility
  listboxId = `listbox-${Math.random().toString(36).substr(2, 9)}`;
  activeItemId: string | null = null;
  triggerWidth = 0;

  private destroy$ = new Subject<void>();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  // CDK Overlay positions (using dropdown behavior's default positions)
  get positions() {
    return this.dropdownBehavior.defaultPositions;
  }

  constructor() {
    // Setup behaviors
    this.selection.setConfig({ multiple: false });

    // Sync items with search behavior
    effect(() => {
      const searchableItems = this.items().map(toSearchableItem);
      this.search.setItems(searchableItems);
    });

    // Update trigger width when dropdown opens
    effect(() => {
      if (this.dropdownBehavior.isOpen()) {
        this.updateTriggerWidth();
      }
    });

    // Handle selection changes
    effect(() => {
      const selected = this.selection.selectedItems()[0];
      const value = selected ? selected.id : null;
      this.onChange(value);
      this.selectionChange.emit(value);

      // Update input display
      if (selected) {
        const singleInput = this.singleInput();
        if (singleInput) {
          singleInput.searchQuery = selected.label;
        }
      }
    });

    // Handle search changes
    effect(() => {
      const searchTerm = this.search.searchTerm();
      this.searchChange.emit(searchTerm);

      // Handle async search if configured
      if (this.async() && this.asyncSearchFn()) {
        this.handleAsyncSearch(searchTerm);
      }
    });
  }

  ngAfterViewInit() {
    // Update trigger width
    this.updateTriggerWidth();
  }

  ngOnDestroy() {
    this.search.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTriggerWidth() {
    this.dropdownBehavior.updateTriggerWidth(this.triggerElement());
    const triggerEl = this.triggerElement()?.nativeElement;
    if (triggerEl) {
      this.triggerWidth = triggerEl.offsetWidth;
    }
  }

  writeValue(value: any): void {
    if (value) {
      const allSearchableItems = this.items().map(toSearchableItem);
      this.selection.setSelectedValues([value], allSearchableItems);
    } else {
      this.selection.clearSelection();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.updateSearch(value);

    if (!this.async()) {
      this.open();
    }
  }

  // Async search handling (if needed)
  private async handleAsyncSearch(searchTerm: string) {
    if (!searchTerm) {
      this.search.setItems([]);
      return;
    }

    this.search.setLoading(true);
    try {
      const asyncSearchFn = this.asyncSearchFn();
      if (asyncSearchFn) {
        const results = await asyncSearchFn(searchTerm);
        const searchableResults = results.map(toSearchableItem);
        this.search.setItems(searchableResults);
        this.open();
      } else {
        console.warn('asyncSearchFn is required when using async mode');
        this.search.setItems([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      this.search.setItems([]);
    } finally {
      this.search.setLoading(false);
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.isOpen() && (event.key === 'ArrowDown' || event.key === 'Enter')) {
      this.open();
      event.preventDefault();
      return;
    }

    if (!this.isOpen()) {
      return;
    }

    // Basic keyboard handling
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      // Select first filtered item if available
      const firstItem = this.filteredItems()[0];
      if (firstItem) {
        this.selectItem(firstItem);
      }
    }
  }

  handleBlur() {
    this.onTouched();
    setTimeout(() => {
      if (!this.containerElement()?.nativeElement.contains(document.activeElement)) {
        this.close();
      }
    }, 200);
  }

  setActiveItem(item: string | SearchableItem) {
    // Active item handling can be implemented if needed
  }

  selectItem(item: string | SearchableItem) {
    let searchableItem: SearchableItem;
    if (typeof item === 'string') {
      searchableItem = { id: item, label: item };
    } else {
      searchableItem = item;
    }
    this.selection.selectItem(searchableItem);
    this.close();
  }

  getItemLabel(item: any): string {
    if (!item) return '';
    if (typeof item === 'string') return item;

    // If item is a value from selectedValues, find the actual item
    const actualItem = this.items().find((i) => {
      if (typeof i === 'string') return i === item;
      return i.value === item;
    });

    if (actualItem) {
      return typeof actualItem === 'string' ? actualItem : actualItem.label;
    }

    return typeof item === 'string' ? item : item.label;
  }

  getItemValue(item: string | SearchableItem): string {
    return typeof item === 'string' ? item : item.id;
  }

  getItemSubtitle(item: string | SearchableItem): string | undefined {
    return typeof item === 'string' ? undefined : item.subtitle;
  }

  open() {
    if (this.dropdownBehavior.isOpen()) return;
    this.dropdownBehavior.open();
  }

  close() {
    if (!this.dropdownBehavior.isOpen()) return;
    this.dropdownBehavior.close();
    this.activeItemId = null;
  }

  toggle() {
    this.dropdownBehavior.toggle();
  }
}

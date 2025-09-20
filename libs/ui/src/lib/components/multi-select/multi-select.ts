import { ActiveDescendantKeyManager, _IdGenerator } from '@angular/cdk/a11y';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { ScAutocompleteMultiInput } from '../autocomplete/autocomplete-multi-input';
import { DropdownBehavior } from '../shared/dropdown-behavior';
import { SearchBehavior, SearchableItem } from '../shared/search-behavior';
import { SelectionBehavior } from '../shared/selection-behavior';
import { ScSelectorPanel } from '../shared/selector-panel';

// Helper function to convert string to SearchableItem
function toSearchableItem(item: string | SearchableItem): SearchableItem {
  if (typeof item === 'string') {
    return { id: item, label: item };
  }
  return item;
}

@Component({
  selector: 'sc-multi-select',
  imports: [OverlayModule, ScAutocompleteMultiInput, ScSelectorPanel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScMultiSelect),
      multi: true,
    },
  ],
  template: `
    <div class="multi-select-container" #container>
      <div class="relative">
        <!-- Multi Select Input with Chips -->
        <sc-autocomplete-multi-input
          #multiInput
          #trigger="cdkOverlayOrigin"
          [inputId]="id()"
          [placeholder]="placeholder()"
          [selectedValues]="selectedValues()"
          [items]="items()"
          [isOpen]="isOpen()"
          [listboxId]="listboxId"
          [activeItemId]="activeItemId"
          (inputChange)="handleInput($event)"
          (focusChange)="open()"
          (blurChange)="handleBlur()"
          (keydownChange)="handleKeydown($event)"
          (chipRemoved)="removeChip($event)"
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
            [multiple]="true"
            [grouped]="grouped()"
            [selectedValues]="selectedValues()"
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
          Selected count:
          <span class="font-medium">{{ selectedValues().size }}</span>
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
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiSelect implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  // Shared behaviors
  protected readonly dropdownBehavior = new DropdownBehavior();
  protected readonly searchBehavior = new SearchBehavior<SearchableItem>();
  protected readonly selectionBehavior = new SelectionBehavior<SearchableItem>();

  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-multi-select-'), {
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
  readonly asyncSearchFn = input<(query: string) => Promise<SearchableItem[]>>();

  readonly selectionChange = output<string[]>();
  readonly searchChange = output<string>();

  readonly multiInput = viewChild<ScAutocompleteMultiInput>('multiInput');
  readonly panel = viewChild<ScSelectorPanel>('panel');
  readonly containerElement = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  // Computed properties using shared behaviors
  protected readonly isOpen = computed(() => this.dropdownBehavior.isOpen());
  protected readonly isLoading = computed(() => this.searchBehavior.isLoading());
  protected readonly filteredItems = computed(() => {
    const searchableItems = this.searchBehavior.filteredItems();
    // Convert to format expected by selector panel: (string | SearchableItem)[]
    return searchableItems.map((item) => {
      // Find the original item to preserve string format when appropriate
      const originalItem = this.items().find((orig) =>
        typeof orig === 'string' ? orig === item.id : orig.id === item.id,
      );
      // If original was a string, return as string
      if (typeof originalItem === 'string') {
        return originalItem;
      }
      // Otherwise return as SearchableItem (which includes converted ScAutocompleteItem)
      return item;
    });
  });

  protected readonly selectedValues = computed(() => {
    return new Set(this.selectionBehavior.selectedValues());
  });

  // Legacy properties for template compatibility
  listboxId = `listbox-${Math.random().toString(36).substr(2, 9)}`;
  activeItemId: string | null = null;
  triggerWidth = 0;

  keyManager!: ActiveDescendantKeyManager<any>;
  private destroy$ = new Subject<void>();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  // CDK Overlay positions (using dropdown behavior's default positions)
  get positions() {
    return this.dropdownBehavior.defaultPositions;
  }

  constructor() {
    // Setup behaviors
    this.selectionBehavior.setConfig({ multiple: true });

    // Sync items with search behavior
    effect(() => {
      const searchableItems = this.items().map(toSearchableItem);
      this.searchBehavior.setItems(searchableItems);
    });

    // Update trigger width when dropdown opens
    effect(() => {
      if (this.dropdownBehavior.isOpen()) {
        this.updateTriggerWidth();
      }
    });

    // Handle selection changes
    effect(() => {
      const selectedItems = this.selectionBehavior.selectedItems();
      const selectedArray = selectedItems.map((item) => item.id);
      this.onChange(selectedArray);
      this.selectionChange.emit(selectedArray);
    });

    // Handle search changes
    effect(() => {
      const searchTerm = this.searchBehavior.searchTerm();
      this.searchChange.emit(searchTerm);
    });
  }

  ngOnInit() {
    // Behaviors are already set up in constructor
  }

  ngOnDestroy() {
    this.searchBehavior.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.updateTriggerWidth();
    this.setupKeyManager();
  }

  // Async search handling (if needed)
  private async handleAsyncSearch(searchTerm: string) {
    if (this.async() && this.asyncSearchFn()) {
      this.searchBehavior.setLoading(true);
      try {
        const results = await this.asyncSearchFn()!(searchTerm);
        const searchableResults = results.map(toSearchableItem);
        this.searchBehavior.setItems(searchableResults);
      } catch (error) {
        console.error('Search failed:', error);
        this.searchBehavior.setItems([]);
      } finally {
        this.searchBehavior.setLoading(false);
      }
    }
  }

  private setupKeyManager() {
    if (this.panel()) {
      const options = this.panel()!.options();
      if (options.length > 0) {
        this.keyManager = new ActiveDescendantKeyManager<any>(options).withWrap();
        this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe((activeIndex) => {
          const activeOption = options[activeIndex];
          this.activeItemId = activeOption ? this.getItemValue(activeOption.item()) : null;
        });
      }
    }
  }

  private updateTriggerWidth() {
    this.dropdownBehavior.updateTriggerWidth(this.triggerElement());
    const triggerEl = this.triggerElement()?.nativeElement;
    if (triggerEl) {
      this.triggerWidth = triggerEl.offsetWidth;
    }
  }

  open() {
    if (!this.dropdownBehavior.isOpen()) {
      this.dropdownBehavior.open();
      setTimeout(() => this.setupKeyManager(), 0);
    }
  }

  close() {
    this.dropdownBehavior.close();
    this.activeItemId = null;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchBehavior.updateSearch(input.value);

    // Handle async search if configured
    if (this.async() && this.asyncSearchFn()) {
      this.handleAsyncSearch(input.value);
    }
  }

  handleBlur() {
    this.onTouched();
    // Small delay to allow for option selection
    setTimeout(() => {
      if (!this.isOpen()) {
        this.close();
      }
    }, 150);
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.dropdownBehavior.isOpen()) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
        this.open();
      }
      return;
    }

    if (this.keyManager) {
      if (event.key === 'ArrowDown') {
        this.keyManager.setNextItemActive();
        event.preventDefault();
      } else if (event.key === 'ArrowUp') {
        this.keyManager.setPreviousItemActive();
        event.preventDefault();
      } else if (event.key === 'Enter') {
        const activeItem = this.keyManager.activeItem;
        if (activeItem) {
          this.selectItem(activeItem.item());
        }
        event.preventDefault();
      } else if (event.key === 'Escape') {
        this.close();
        event.preventDefault();
      }
    }
  }

  selectItem(item: string | SearchableItem) {
    let searchableItem: SearchableItem;
    if (typeof item === 'string') {
      searchableItem = { id: item, label: item };
    } else {
      searchableItem = item;
    }
    this.selectionBehavior.toggleItem(searchableItem);
  }

  removeChip(value: string) {
    const itemToRemove = this.selectionBehavior.selectedItems().find((item) => item.id === value);
    if (itemToRemove) {
      this.selectionBehavior.deselectItem(itemToRemove);
    }
  }

  setActiveItem(item: string | SearchableItem) {
    this.activeItemId = typeof item === 'string' ? item : item.id;
  }

  getItemValue(item: string | SearchableItem): string {
    return typeof item === 'string' ? item : item.id;
  }

  getItemLabel(value: string): string {
    const item = this.items().find((i) => {
      if (typeof i === 'string') return i === value;
      return i.id === value;
    });

    if (item) {
      return typeof item === 'string' ? item : item.label;
    }

    return value;
  }

  // ControlValueAccessor implementation
  writeValue(value: string[] | null): void {
    if (value && Array.isArray(value)) {
      const allSearchableItems = this.items().map(toSearchableItem);
      this.selectionBehavior.setSelectedValues(value, allSearchableItems);
    } else {
      this.selectionBehavior.clearSelection();
    }
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }
}

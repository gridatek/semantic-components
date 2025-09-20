import { ActiveDescendantKeyManager, _IdGenerator } from '@angular/cdk/a11y';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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

import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { DropdownBehavior } from '../shared/dropdown-behavior';
import { SearchBehavior, SearchableItem } from '../shared/search-behavior';
import { SelectionBehavior } from '../shared/selection-behavior';
import { ScAutocompleteInput } from './autocomplete-input';
import { ScAutocompleteOption } from './autocomplete-option';
import { ScAutocompletePanel } from './autocomplete-panel';
import { ScAutocompleteItem } from './autocomplete-types';

// Helper function to convert ScAutocompleteItem to SearchableItem
function toSearchableItem(item: string | ScAutocompleteItem): SearchableItem {
  if (typeof item === 'string') {
    return { id: item, label: item };
  }
  return {
    id: item.value,
    label: item.label,
    subtitle: item.subtitle,
    group: item.group,
  };
}

// Helper function to convert back to ScAutocompleteItem
function fromSearchableItem(searchableItem: SearchableItem): ScAutocompleteItem {
  return {
    value: searchableItem.id,
    label: searchableItem.label,
    subtitle: searchableItem.subtitle,
    group: searchableItem.group,
  };
}

@Component({
  selector: 'sc-autocomplete',
  imports: [OverlayModule, ScAutocompleteInput, ScAutocompletePanel],
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
          <sc-autocomplete-panel
            #panel
            [listboxId]="listboxId"
            [filteredItems]="filteredItems()"
            [multiple]="false"
            [grouped]="grouped()"
            [selectedValue]="selectedValue()"
            [selectedValues]="emptySet"
            [isLoading]="isLoading()"
            [style.width.px]="triggerWidth"
            [style.min-width.px]="triggerWidth"
            [style.max-width.px]="triggerWidth"
            (itemSelected)="selectItem($event)"
            (itemActiveChange)="setActiveItem($event)"
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
export class ScAutocomplete implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
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
  readonly items = input<(string | ScAutocompleteItem)[]>([]);
  readonly async = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly showStatus = input<boolean>(true);
  readonly showToggleButton = input<boolean>(true);
  readonly asyncSearchFn = input<(query: string) => Promise<ScAutocompleteItem[]>>();

  readonly selectionChange = output<any>();
  readonly searchChange = output<string>();

  readonly singleInput = viewChild<ScAutocompleteInput>('singleInput');
  readonly panel = viewChild<ScAutocompletePanel>('panel');
  readonly containerElement = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  // Computed properties using shared behaviors
  protected readonly isOpen = computed(() => this.dropdownBehavior.isOpen());
  protected readonly isLoading = computed(() => this.search.isLoading());
  protected readonly filteredItems = computed(() => {
    return this.search.filteredItems().map((item) => {
      // Convert back to original format for template compatibility
      if (item.subtitle || item.group) {
        return fromSearchableItem(item);
      }
      // If it's a simple item, return as string if original was string
      const originalItem = this.items().find((orig) =>
        typeof orig === 'string' ? orig === item.id : orig.value === item.id,
      );
      return typeof originalItem === 'string' ? item.id : fromSearchableItem(item);
    });
  });

  protected readonly selectedValue = computed(() => {
    const selected = this.selection.selectedItems()[0];
    return selected ? selected.id : null;
  });

  // Legacy properties for template compatibility
  emptySet = new Set<string>();
  listboxId = `listbox-${Math.random().toString(36).substr(2, 9)}`;
  activeItemId: string | null = null;
  triggerWidth = 0;

  keyManager!: ActiveDescendantKeyManager<ScAutocompleteOption>;
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

  ngOnInit() {
    // Behaviors are already set up in constructor
  }

  ngAfterViewInit() {
    // Initialize key manager after view init when options are available
    this.initKeyManager();

    // Watch for options changes
    const panel = this.panel();
    if (panel) {
      panel.options.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.initKeyManager();
      });
    }

    // Update trigger width
    this.updateTriggerWidth();
  }

  ngOnDestroy() {
    this.search.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initKeyManager() {
    const options = this.panel()?.options;
    if (options && options.length) {
      this.keyManager = new ActiveDescendantKeyManager(options).withWrap().withTypeAhead(300);

      // Update aria-activedescendant
      this.keyManager.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
        const activeItem = this.keyManager.activeItem;
        if (activeItem) {
          const element = activeItem['element'].nativeElement;
          this.activeItemId = element.id;
        } else {
          this.activeItemId = null;
        }
      });
    }
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
    if (!this.isOpen && (event.key === 'ArrowDown' || event.key === 'Enter')) {
      this.open();
      event.preventDefault();
      return;
    }

    if (!this.isOpen) {
      return;
    }

    // Let the key manager handle navigation
    if (this.keyManager) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const activeItem = this.keyManager.activeItem;
        if (activeItem) {
          this.selectItem(activeItem.item());
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        this.close();
      } else {
        // Handle arrow keys and typeahead
        this.keyManager.onKeydown(event);
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

  setActiveItem(item: string | ScAutocompleteItem) {
    const panel = this.panel();
    if (this.keyManager && panel) {
      const index = panel.options.toArray().findIndex((option) => {
        const optionValue = this.getItemValue(option.item());
        const itemValue = this.getItemValue(item);
        return optionValue === itemValue;
      });

      if (index >= 0) {
        this.keyManager.setActiveItem(index);
      }
    }
  }

  selectItem(item: string | ScAutocompleteItem) {
    const searchableItem = toSearchableItem(item);
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

  getItemValue(item: string | ScAutocompleteItem): string {
    return typeof item === 'string' ? item : item.value;
  }

  getItemSubtitle(item: string | ScAutocompleteItem): string | undefined {
    return typeof item === 'string' ? undefined : item.subtitle;
  }

  open() {
    if (this.dropdownBehavior.isOpen()) return;
    this.dropdownBehavior.open();

    // Initialize key manager when opening
    setTimeout(() => {
      this.initKeyManager();
      const panel = this.panel();
      const selectedValue = this.selectedValue();
      if (this.keyManager && selectedValue && panel) {
        // Set active item to selected value
        const selectedIndex = panel.options.toArray().findIndex((option) => {
          const optionValue = this.getItemValue(option.item());
          return optionValue === selectedValue;
        });
        if (selectedIndex >= 0) {
          this.keyManager.setActiveItem(selectedIndex);
        }
      }
    });
  }

  close() {
    if (!this.dropdownBehavior.isOpen()) return;
    this.dropdownBehavior.close();
    this.activeItemId = null;
    if (this.keyManager) {
      this.keyManager.setActiveItem(-1);
    }
  }

  toggle() {
    this.dropdownBehavior.toggle();
  }
}

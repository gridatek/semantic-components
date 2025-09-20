import { _IdGenerator } from '@angular/cdk/a11y';
import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { Subject } from 'rxjs';

import { DropdownBehavior } from '../shared/dropdown-behavior';
import { SearchBehavior, SearchableItem } from '../shared/search-behavior';
import { SelectionBehavior } from '../shared/selection-behavior';
import { ScComboboxDropdown } from './combobox-dropdown';
import { ScComboboxTrigger } from './combobox-trigger';
import { ScComboboxConfig, ScComboboxItem } from './types';

// Helper function to convert ScComboboxItem to SearchableItem
function toSearchableItem(item: ScComboboxItem): SearchableItem {
  return {
    id: item.id,
    label: item.label,
    subtitle: item.subtitle,
    data: item.data,
  };
}

// Helper function to convert back to ScComboboxItem
function fromSearchableItem(searchableItem: SearchableItem): ScComboboxItem {
  return {
    id: searchableItem.id,
    label: searchableItem.label,
    subtitle: searchableItem.subtitle,
    data: searchableItem['data'],
  };
}

@Component({
  selector: 'sc-combobox',
  imports: [ScComboboxTrigger, ScComboboxDropdown, OverlayModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScCombobox),
      multi: true,
    },
  ],
  template: `
    <div [class]="computedClass()">
      @if (label()) {
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          [for]="id()"
        >
          {{ label() }}
          @if (required()) {
            <span class="text-destructive">*</span>
          }
        </label>
      }

      <div class="relative" #trigger="cdkOverlayOrigin" cdkOverlayOrigin>
        <sc-combobox-trigger
          [selectedItem]="selectedItem()"
          [placeholder]="placeholder()"
          [isInvalid]="isInvalid()"
          [disabled]="disabled()"
          [triggerTemplate]="customTriggerTemplate() || null"
          (triggerClick)="toggleDropdown()"
          (triggerFocus)="onTriggerFocus()"
          (triggerBlur)="onTriggerBlur()"
        />
      </div>

      @if (errorMessage() && (isTouched() || showErrors())) {
        <p class="text-sm text-destructive mt-2">{{ errorMessage() }}</p>
      }

      @if (helperText() && !errorMessage()) {
        <p class="text-sm text-muted-foreground mt-2">{{ helperText() }}</p>
      }
    </div>

    <sc-combobox-dropdown
      #dropdown
      [overlayOrigin]="trigger"
      [isOpen]="showDropdown()"
      [items]="filteredItems()"
      [searchTerm]="searchTerm()"
      [activeIndex]="activeItemIndex()"
      [overlayPositions]="overlayPositions"
      [overlayWidth]="overlayWidth()"
      [config]="config()"
      [isLoading]="isLoading()"
      [itemTemplate]="customItemTemplate() || null"
      (searchChange)="onSearchChange($event)"
      (keydownEvent)="onKeydown($event)"
      (itemSelect)="selectItem($event)"
      (backdropClick)="closeDropdown()"
    />
  `,
  host: {
    'data-slot': 'control',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCombobox implements ControlValueAccessor, OnDestroy {
  // Shared behaviors
  protected readonly dropdownBehavior = new DropdownBehavior();
  protected readonly searchBehavior = new SearchBehavior<SearchableItem>();
  protected readonly selectionBehavior = new SelectionBehavior<SearchableItem>();

  readonly class = input<string>('');
  readonly id = input<string>(inject(_IdGenerator).getId('sc-combobox-'));

  protected readonly computedClass = computed(() => cn('space-y-2', this.class()));

  readonly label = input<string>('');
  readonly placeholder = input<string>('Select option...');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly showErrors = input<boolean>(false);
  readonly items = input<ScComboboxItem[]>([]);
  readonly config = input<ScComboboxConfig>({} as ScComboboxConfig);
  readonly filterFn = input<(items: ScComboboxItem[], searchTerm: string) => ScComboboxItem[]>();

  readonly customTriggerTemplate =
    contentChild<TemplateRef<{ $implicit: ScComboboxItem | null }>>('triggerTemplate');
  readonly customItemTemplate =
    contentChild<TemplateRef<{ $implicit: ScComboboxItem; index: number }>>('itemTemplate');

  readonly selectionChange = output<ScComboboxItem | null>();
  readonly searchChange = output<string>();

  // Computed properties using shared behaviors
  protected readonly selectedItem = computed(() => {
    const selected = this.selectionBehavior.selectedItems()[0];
    return selected ? fromSearchableItem(selected) : null;
  });
  protected readonly showDropdown = computed(() => this.dropdownBehavior.isOpen());
  protected readonly searchTerm = computed(() => this.searchBehavior.searchTerm());
  protected readonly filteredItems = computed(() => {
    return this.searchBehavior.filteredItems().map(fromSearchableItem);
  });
  protected readonly isLoading = computed(() => this.searchBehavior.isLoading());

  protected readonly isValid = signal<boolean>(false);
  protected readonly isInvalid = signal<boolean>(false);
  protected readonly isTouched = signal<boolean>(false);
  protected readonly errorMessage = signal<string>('');

  protected readonly trigger = viewChild.required<CdkOverlayOrigin>('trigger');
  protected readonly dropdown = viewChild<ScComboboxDropdown>('dropdown');
  protected readonly activeItemIndex = signal<number>(-1);
  protected readonly overlayWidth = signal<number>(400);

  // Use dropdown behavior's positions
  get overlayPositions() {
    return this.dropdownBehavior.defaultPositions;
  }

  private readonly destroy$ = new Subject<void>();
  private onChange = (_value: string | null) => {
    // Intentionally empty - implemented by Angular forms
  };
  private onTouched = () => {
    // Intentionally empty - implemented by Angular forms
  };

  constructor() {
    // Setup behaviors
    this.selectionBehavior.setConfig({ multiple: false });

    // Sync items with search behavior
    effect(() => {
      const searchableItems = this.items().map(toSearchableItem);
      this.searchBehavior.setItems(searchableItems);
    });

    // Update trigger width when dropdown opens
    effect(() => {
      if (this.dropdownBehavior.isOpen()) {
        this.dropdownBehavior.updateTriggerWidth(this.trigger().elementRef);
        const triggerElement = this.trigger()?.elementRef?.nativeElement;
        if (triggerElement) {
          this.overlayWidth.set(Math.max(400, triggerElement.offsetWidth));
        }
      }
    });

    // Handle selection changes
    effect(() => {
      const selected = this.selectionBehavior.selectedItems()[0];
      const item = selected ? fromSearchableItem(selected) : null;
      this.onChange(item?.id || null);
      this.selectionChange.emit(item);

      // Update validation
      this.isValid.set(!!item);
      this.isInvalid.set(!item && this.required());
      this.errorMessage.set(!item && this.required() ? 'Selection is required' : '');
    });

    // Handle search changes
    effect(() => {
      const searchTerm = this.searchBehavior.searchTerm();
      this.searchChange.emit(searchTerm);
    });

    // Reset active index when filtered items change
    effect(() => {
      const filteredItems = this.filteredItems();
      if (filteredItems.length > 0) {
        this.activeItemIndex.set(0);
        setTimeout(() => this.scrollToActiveItem(), 0);
      } else {
        this.activeItemIndex.set(-1);
      }
    });
  }

  protected toggleDropdown(): void {
    this.dropdownBehavior.toggle();
    if (this.dropdownBehavior.isOpen()) {
      this.searchBehavior.clearSearch();
      this.activeItemIndex.set(0);
      this.dropdown()?.focusSearchInput();
    }
  }

  protected closeDropdown(): void {
    this.dropdownBehavior.close();
  }

  protected selectItem(item: ScComboboxItem): void {
    const searchableItem = toSearchableItem(item);
    this.selectionBehavior.selectItem(searchableItem);
    this.dropdownBehavior.close();
  }

  protected onTriggerFocus(): void {
    // Handle focus if needed
  }

  protected onTriggerBlur(): void {
    this.isTouched.set(true);
    this.onTouched();

    // Small delay to allow for dropdown interaction
    setTimeout(() => {
      if (!this.showDropdown()) {
        this.validateSelection();
      }
    }, 100);
  }

  protected onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchBehavior.updateSearch(target.value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.dropdownBehavior.isOpen()) return;

    const filteredItems = this.filteredItems();
    const currentIndex = this.activeItemIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
      this.activeItemIndex.set(nextIndex);
      this.scrollToActiveItem();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
      this.activeItemIndex.set(prevIndex);
      this.scrollToActiveItem();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const activeItem = filteredItems[currentIndex];
      if (activeItem) {
        this.selectItem(activeItem);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
    }
  }

  protected scrollToActiveItem(): void {
    this.dropdown()?.scrollToActiveItem();
  }

  private validateSelection(): void {
    if (this.required() && !this.selectedItem()) {
      this.isValid.set(false);
      this.isInvalid.set(true);
      this.errorMessage.set('Selection is required');
    } else {
      this.isValid.set(true);
      this.isInvalid.set(false);
      this.errorMessage.set('');
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    if (value) {
      const allSearchableItems = this.items().map(toSearchableItem);
      this.selectionBehavior.setSelectedValues([value], allSearchableItems);
    } else {
      this.selectionBehavior.clearSelection();
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // The disabled state is handled through the disabled input signal
  }

  ngOnDestroy(): void {
    this.searchBehavior.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}

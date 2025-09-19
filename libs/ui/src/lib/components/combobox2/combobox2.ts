import { _IdGenerator } from '@angular/cdk/a11y';
import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
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

import { ScCombobox2Dropdown } from './combobox2-dropdown';
import { ScCombobox2Trigger } from './combobox2-trigger';
import { ScCombobox2Config, ScCombobox2Item } from './types';

@Component({
  selector: 'sc-combobox2',
  imports: [ScCombobox2Trigger, ScCombobox2Dropdown, OverlayModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScCombobox2),
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
        <sc-combobox2-trigger
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

    <sc-combobox2-dropdown
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
export class ScCombobox2 implements ControlValueAccessor, OnDestroy {
  readonly class = input<string>('');
  readonly id = input<string>(inject(_IdGenerator).getId('sc-combobox2-'));

  protected readonly computedClass = computed(() => cn('space-y-2', this.class()));

  readonly label = input<string>('');
  readonly placeholder = input<string>('Select option...');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly showErrors = input<boolean>(false);
  readonly items = input<ScCombobox2Item[]>([]);
  readonly config = input<ScCombobox2Config>({} as ScCombobox2Config);
  readonly filterFn = input<(items: ScCombobox2Item[], searchTerm: string) => ScCombobox2Item[]>();

  readonly customTriggerTemplate =
    contentChild<TemplateRef<{ $implicit: ScCombobox2Item | null }>>('triggerTemplate');
  readonly customItemTemplate =
    contentChild<TemplateRef<{ $implicit: ScCombobox2Item; index: number }>>('itemTemplate');

  readonly selectionChange = output<ScCombobox2Item | null>();
  readonly searchChange = output<string>();

  protected readonly selectedItem = signal<ScCombobox2Item | null>(null);
  protected readonly showDropdown = signal<boolean>(false);
  protected readonly searchTerm = signal<string>('');
  protected readonly filteredItems = signal<ScCombobox2Item[]>([]);
  protected readonly isLoading = signal<boolean>(false);

  protected readonly isValid = signal<boolean>(false);
  protected readonly isInvalid = signal<boolean>(false);
  protected readonly isTouched = signal<boolean>(false);
  protected readonly errorMessage = signal<string>('');

  protected readonly trigger = viewChild.required<CdkOverlayOrigin>('trigger');
  protected readonly dropdown = viewChild<ScCombobox2Dropdown>('dropdown');
  protected readonly activeItemIndex = signal<number>(-1);
  protected readonly overlayWidth = signal<number>(400);

  protected readonly overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];

  private readonly destroy$ = new Subject<void>();
  private onChange = (_value: string | null) => {
    // Intentionally empty - implemented by Angular forms
  };
  private onTouched = () => {
    // Intentionally empty - implemented by Angular forms
  };

  constructor() {
    // Initialize filtered items
    effect(() => {
      this.updateFilteredItems();
    });

    // Set overlay width based on trigger
    effect(() => {
      const triggerElement = this.trigger()?.elementRef?.nativeElement;
      if (triggerElement) {
        this.overlayWidth.set(Math.max(400, triggerElement.offsetWidth));
      }
    });
  }

  protected toggleDropdown(): void {
    this.showDropdown.update((show) => !show);
    if (this.showDropdown()) {
      this.searchTerm.set('');
      this.activeItemIndex.set(0);
      this.dropdown()?.focusSearchInput();
    }
  }

  protected closeDropdown(): void {
    this.showDropdown.set(false);
  }

  protected selectItem(item: ScCombobox2Item): void {
    this.selectedItem.set(item);
    this.showDropdown.set(false);
    this.isValid.set(true);
    this.isInvalid.set(false);
    this.errorMessage.set('');

    this.onChange(item.id);
    this.selectionChange.emit(item);
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
    this.searchTerm.set(target.value);
    this.searchChange.emit(target.value);
    this.updateFilteredItems();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.showDropdown()) return;

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

  private updateFilteredItems(): void {
    const items = this.items();
    const searchTerm = this.searchTerm();
    const filterFn = this.filterFn();

    if (filterFn) {
      this.filteredItems.set(filterFn(items, searchTerm));
    } else {
      this.filteredItems.set(this.defaultFilter(items, searchTerm));
    }

    // Reset active index when filtering
    if (this.filteredItems().length > 0) {
      this.activeItemIndex.set(0);
      setTimeout(() => this.scrollToActiveItem(), 0);
    } else {
      this.activeItemIndex.set(-1);
    }
  }

  private defaultFilter(items: ScCombobox2Item[], searchTerm: string): ScCombobox2Item[] {
    if (!searchTerm) return items;

    const term = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.subtitle?.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term),
    );
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
      const item = this.items().find((item) => item.id === value);
      if (item) {
        this.selectedItem.set(item);
        this.isValid.set(true);
      }
    } else {
      this.selectedItem.set(null);
      this.isValid.set(false);
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}

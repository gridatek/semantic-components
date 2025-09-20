import { _IdGenerator } from '@angular/cdk/a11y';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
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

import { DropdownBehavior } from './dropdown-behavior';
import { SearchBehavior, SearchableItem } from './search-behavior';
import { SelectionBehavior } from './selection-behavior';
import { ScSelectorPanel } from './selector-panel';

interface MySelectorItem extends SearchableItem {
  id: string;
  label: string;
  subtitle?: string;
  group?: string;
  disabled?: boolean;
  data?: any;
}

/**
 * Example component showing how to use the shared selector behaviors and components
 * This demonstrates the complete pattern for building selector components
 */
@Component({
  selector: 'sc-selector-example',
  imports: [OverlayModule, CommonModule, ScSelectorPanel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScSelectorExample),
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
        <!-- Trigger Button -->
        <button
          class="inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10 w-full"
          [id]="id()"
          [class.border-destructive]="isInvalid()"
          [disabled]="disabled()"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-haspopup]="'listbox'"
          (click)="toggleDropdown()"
          (focus)="onTriggerFocus()"
          (blur)="onTriggerBlur()"
          type="button"
        >
          <div class="flex items-center space-x-2 overflow-hidden flex-1">
            @if (customTriggerTemplate()) {
              <ng-container
                [ngTemplateOutlet]="customTriggerTemplate()!"
                [ngTemplateOutletContext]="{ $implicit: getDisplayValue() }"
              />
            } @else {
              <span class="truncate">{{ getDisplayText() }}</span>
            }
          </div>
          <svg
            class="h-4 w-4 opacity-50 flex-shrink-0"
            [class.rotate-180]="isOpen()"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m6 9 6 6 6-6"
            />
          </svg>
        </button>
      </div>

      @if (errorMessage() && (isTouched() || showErrors())) {
        <p class="text-sm text-destructive mt-2">{{ errorMessage() }}</p>
      }

      @if (helperText() && !errorMessage()) {
        <p class="text-sm text-muted-foreground mt-2">{{ helperText() }}</p>
      }
    </div>

    <!-- Dropdown Panel using CDK Overlay -->
    <ng-template
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="dropdownBehavior.defaultPositions"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      [cdkConnectedOverlayWidth]="triggerWidth() + 'px'"
      [cdkConnectedOverlayMinWidth]="triggerWidth() + 'px'"
      (backdropClick)="dropdownBehavior.handleBackdropClick()"
      cdkConnectedOverlay
      cdkConnectedOverlayPanelClass="z-50"
    >
      <div class="space-y-1 p-1">
        <!-- Search Input (optional) -->
        @if (showSearch()) {
          <div class="p-2">
            <input
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              [value]="searchTerm()"
              [placeholder]="searchPlaceholder()"
              (input)="handleSearchInput($event)"
              (keydown)="handleKeydown($event)"
              type="text"
              role="combobox"
              aria-label="Search options"
            />
          </div>
        }

        <!-- Selector Panel -->
        <sc-selector-panel
          [items]="filteredItems()"
          [multiple]="multiple()"
          [grouped]="grouped()"
          [isLoading]="isLoading()"
          [selectedValues]="selectedValues()"
          [disabledValues]="disabledValues()"
          [loadingMessage]="loadingMessage()"
          [emptyMessage]="emptyMessage()"
          (itemSelected)="selectItem($event)"
          (itemHovered)="setActiveItem($event)"
        >
          <!-- Custom item template if provided -->
          @if (customItemTemplate()) {
            <ng-template itemTemplate let-item let-index="index" let-selected="selected">
              <ng-container
                [ngTemplateOutlet]="customItemTemplate()!"
                [ngTemplateOutletContext]="{ $implicit: item, index: index, selected: selected }"
              />
            </ng-template>
          }
        </sc-selector-panel>
      </div>
    </ng-template>
  `,
  host: {
    'data-slot': 'control',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectorExample implements OnDestroy, ControlValueAccessor {
  // Shared behaviors
  protected readonly dropdownBehavior = new DropdownBehavior();
  protected readonly searchBehavior = new SearchBehavior<MySelectorItem>();
  protected readonly selectionBehavior = new SelectionBehavior<MySelectorItem>();

  // Component inputs
  readonly class = input<string>('');
  readonly id = input<string>(inject(_IdGenerator).getId('sc-selector-example-'));
  readonly label = input<string>('');
  readonly placeholder = input<string>('Select option...');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly showErrors = input<boolean>(false);
  readonly items = input<MySelectorItem[]>([]);

  // Selector configuration
  readonly multiple = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly showSearch = input<boolean>(true);
  readonly searchPlaceholder = input<string>('Search...');
  readonly emptyMessage = input<string>('No options found');
  readonly loadingMessage = input<string>('Loading...');

  // Templates
  readonly customTriggerTemplate =
    contentChild<TemplateRef<{ $implicit: MySelectorItem | MySelectorItem[] | null }>>(
      'triggerTemplate',
    );
  readonly customItemTemplate =
    contentChild<TemplateRef<{ $implicit: MySelectorItem; index: number; selected: boolean }>>(
      'itemTemplate',
    );

  // Outputs
  readonly selectionChange = output<MySelectorItem | MySelectorItem[] | null>();
  readonly searchChange = output<string>();

  // View references
  protected readonly trigger = viewChild.required<CdkOverlayOrigin>('trigger');

  // State
  protected readonly isInvalid = signal<boolean>(false);
  protected readonly isTouched = signal<boolean>(false);
  protected readonly errorMessage = signal<string>('');

  // Computed properties
  protected readonly computedClass = computed(() => cn('space-y-2', this.class()));
  protected readonly isOpen = computed(() => this.dropdownBehavior.isOpen());
  protected readonly searchTerm = computed(() => this.searchBehavior.searchTerm());
  protected readonly filteredItems = computed(() => this.searchBehavior.filteredItems());
  protected readonly isLoading = computed(() => this.searchBehavior.isLoading());
  protected readonly selectedItems = computed(() => this.selectionBehavior.selectedItems());
  protected readonly selectedValues = computed(
    () => new Set(this.selectionBehavior.selectedValues()),
  );
  protected readonly triggerWidth = computed(() => this.dropdownBehavior.triggerWidth());

  // Disabled items (could be computed from item.disabled property)
  protected readonly disabledValues = computed(() => {
    return new Set(
      this.items()
        .filter((item) => item.disabled)
        .map((item) => item.id),
    );
  });

  // Form control
  private onChange = (_value: any) => {};
  private onTouched = () => {};

  constructor() {
    // Setup behaviors
    effect(() => {
      this.selectionBehavior.setConfig({
        multiple: this.multiple(),
        required: this.required(),
      });
    });

    effect(() => {
      this.searchBehavior.setItems(this.items());
    });

    // Update trigger width when dropdown opens
    effect(() => {
      if (this.dropdownBehavior.isOpen()) {
        this.dropdownBehavior.updateTriggerWidth(this.trigger().elementRef);
      }
    });

    // Handle selection changes
    effect(() => {
      const selected = this.selectionBehavior.selectedItems();
      const value = this.multiple() ? selected : selected[0] || null;
      this.onChange(this.getFormValue());
      this.selectionChange.emit(value);
    });

    // Handle search changes
    effect(() => {
      const searchTerm = this.searchBehavior.searchTerm();
      this.searchChange.emit(searchTerm);
    });
  }

  ngOnDestroy() {
    this.searchBehavior.destroy();
  }

  // Event handlers
  protected toggleDropdown(): void {
    this.dropdownBehavior.toggle();
  }

  protected handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchBehavior.updateSearch(target.value);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    // Basic keyboard navigation - could be enhanced with key manager
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.dropdownBehavior.close();
        break;
      case 'Enter':
        event.preventDefault();
        // Select first filtered item if no active item
        const first = this.filteredItems()[0];
        if (first) {
          this.selectItem(first);
        }
        break;
    }
  }

  protected selectItem(item: MySelectorItem): void {
    this.selectionBehavior.selectItem(item);
    if (!this.multiple()) {
      this.dropdownBehavior.close();
    }
  }

  protected setActiveItem(item: MySelectorItem): void {
    // Could be used with key manager for keyboard navigation
  }

  protected onTriggerFocus(): void {
    // Handle focus if needed
  }

  protected onTriggerBlur(): void {
    this.isTouched.set(true);
    this.onTouched();

    // Small delay to allow for option selection
    setTimeout(() => {
      if (!this.dropdownBehavior.isOpen()) {
        this.validateSelection();
      }
    }, 150);
  }

  // Display helpers
  protected getDisplayText(): string {
    const selected = this.selectedItems();
    if (selected.length === 0) {
      return this.placeholder();
    }
    if (this.multiple()) {
      return selected.length === 1 ? selected[0].label : `${selected.length} items selected`;
    }
    return selected[0].label;
  }

  protected getDisplayValue(): MySelectorItem | MySelectorItem[] | null {
    const selected = this.selectedItems();
    if (selected.length === 0) return null;
    return this.multiple() ? selected : selected[0];
  }

  private validateSelection(): void {
    if (this.required() && this.selectedItems().length === 0) {
      this.isInvalid.set(true);
      this.errorMessage.set('Selection is required');
    } else {
      this.isInvalid.set(false);
      this.errorMessage.set('');
    }
  }

  private getFormValue(): any {
    return this.selectionBehavior.getFormValue();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value) {
      if (Array.isArray(value)) {
        this.selectionBehavior.setSelectedValues(value, this.items());
      } else {
        this.selectionBehavior.setSelectedValues([value], this.items());
      }
    } else {
      this.selectionBehavior.clearSelection();
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Handle disabled state if needed
  }
}

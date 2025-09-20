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
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';

import { DropdownBehavior } from './dropdown-behavior';
import { SearchBehavior, SearchableItem } from './search-behavior';
import { SelectionBehavior } from './selection-behavior';

// Example of how ScCombobox could be refactored
@Component({
  selector: 'sc-combobox-refactored',
  imports: [OverlayModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScComboboxRefactored),
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
          [class.border-destructive]="isInvalid()"
          [disabled]="disabled()"
          (click)="dropdown.toggle()"
          (focus)="onTriggerFocus()"
          (blur)="onTriggerBlur()"
          type="button"
        >
          <div class="flex items-center space-x-2 overflow-hidden flex-1">
            @if (customTriggerTemplate()) {
              <ng-container
                [ngTemplateOutlet]="customTriggerTemplate()!"
                [ngTemplateOutletContext]="{ $implicit: selectedItem() }"
              />
            } @else {
              @if (selectedItem()) {
                <span class="truncate">{{ selectedItem()!.label }}</span>
              } @else {
                <span class="text-muted-foreground truncate">{{ placeholder() }}</span>
              }
            }
          </div>
          <svg
            class="h-4 w-4 opacity-50 flex-shrink-0"
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

    <!-- Dropdown -->
    <ng-template
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="dropdown.isOpen()"
      [cdkConnectedOverlayPositions]="dropdown.defaultPositions"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      [cdkConnectedOverlayWidth]="dropdown.triggerWidth() + 'px'"
      [cdkConnectedOverlayMinWidth]="dropdown.triggerWidth() + 'px'"
      (backdropClick)="dropdown.handleBackdropClick()"
      cdkConnectedOverlay
      cdkConnectedOverlayPanelClass="z-50"
    >
      <div class="rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
        <!-- Search Input -->
        @if (showSearch()) {
          <div class="p-2">
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              #searchInput
              [value]="search.searchTerm()"
              [placeholder]="searchPlaceholder()"
              (input)="handleSearchInput($event)"
              (keydown)="handleKeydown($event)"
              type="text"
              role="combobox"
              aria-label="Search options"
            />
          </div>
        }

        <!-- Options List -->
        <div class="max-h-60 overflow-y-auto" #itemListContainer>
          @if (search.isLoading()) {
            <div class="px-2 py-3 text-sm text-muted-foreground text-center">
              {{ loadingMessage() }}
            </div>
          } @else if (search.isEmpty()) {
            <div class="px-2 py-3 text-sm text-muted-foreground text-center">
              {{ emptyMessage() }}
            </div>
          } @else {
            @for (item of search.filteredItems(); track item.id; let i = $index) {
              <div
                class="relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
                [class.bg-accent]="i === activeIndex()"
                [class.text-accent-foreground]="i === activeIndex()"
                [id]="'option-' + i"
                (click)="selectItem(item)"
                (mouseenter)="setActiveIndex(i)"
                role="option"
              >
                @if (customItemTemplate()) {
                  <ng-container
                    [ngTemplateOutlet]="customItemTemplate()!"
                    [ngTemplateOutletContext]="{ $implicit: item, index: i }"
                  />
                } @else {
                  <div class="flex-1">
                    <div class="font-medium">{{ item.label }}</div>
                    @if (item.subtitle) {
                      <div class="text-xs text-muted-foreground">{{ item.subtitle }}</div>
                    }
                  </div>
                }
              </div>
            }
          }
        </div>
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
export class ScComboboxRefactored implements OnDestroy {
  // Shared behaviors
  protected readonly dropdown = new DropdownBehavior();
  protected readonly search = new SearchBehavior<SearchableItem>();
  protected readonly selection = new SelectionBehavior<SearchableItem>();

  // Component-specific inputs
  readonly class = input<string>('');
  readonly id = input<string>('sc-combobox-');
  readonly label = input<string>('');
  readonly placeholder = input<string>('Select option...');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly showErrors = input<boolean>(false);
  readonly items = input<SearchableItem[]>([]);

  // Search configuration
  readonly showSearch = input<boolean>(true);
  readonly searchPlaceholder = input<string>('Search...');
  readonly emptyMessage = input<string>('No options found');
  readonly loadingMessage = input<string>('Loading...');

  // Templates
  readonly customTriggerTemplate =
    contentChild<TemplateRef<{ $implicit: SearchableItem | null }>>('triggerTemplate');
  readonly customItemTemplate =
    contentChild<TemplateRef<{ $implicit: SearchableItem; index: number }>>('itemTemplate');

  // Outputs
  readonly selectionChange = output<SearchableItem | null>();
  readonly searchChange = output<string>();

  // State
  protected readonly selectedItem = signal<SearchableItem | null>(null);
  protected readonly activeIndex = signal<number>(-1);
  protected readonly isInvalid = signal<boolean>(false);
  protected readonly isTouched = signal<boolean>(false);
  protected readonly errorMessage = signal<string>('');

  // Computed
  protected readonly computedClass = computed(() => cn('space-y-2', this.class()));

  // Form control
  private onChange = (_value: string | null) => {};
  private onTouched = () => {};

  // View references
  protected readonly trigger = viewChild.required<CdkOverlayOrigin>('trigger');

  constructor() {
    // Setup behaviors
    this.selection.setConfig({ multiple: false });

    // Sync items with search behavior
    effect(() => {
      this.search.setItems(this.items());
    });

    // Update trigger width when dropdown opens
    effect(() => {
      if (this.dropdown.isOpen()) {
        this.dropdown.updateTriggerWidth(this.trigger());
      }
    });

    // Handle selection changes
    effect(() => {
      const selected = this.selection.selectedItems()[0] || null;
      this.selectedItem.set(selected);
      this.onChange(selected?.id || null);
      this.selectionChange.emit(selected);
    });
  }

  ngOnDestroy() {
    this.search.destroy();
  }

  // Event handlers
  protected handleSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.search.updateSearch(target.value);
    this.searchChange.emit(target.value);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (!this.dropdown.isOpen()) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.dropdown.open();
        return;
      }
    }

    const filteredItems = this.search.filteredItems();
    const currentIndex = this.activeIndex();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
        this.setActiveIndex(nextIndex);
        break;

      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
        this.setActiveIndex(prevIndex);
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        const activeItem = filteredItems[currentIndex];
        if (activeItem) {
          this.selectItem(activeItem);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.dropdown.close();
        break;
    }
  }

  protected selectItem(item: SearchableItem): void {
    this.selection.selectItem(item);
    this.dropdown.close();
    this.activeIndex.set(-1);
  }

  protected setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }

  protected onTriggerFocus(): void {
    // Handle focus
  }

  protected onTriggerBlur(): void {
    this.isTouched.set(true);
    this.onTouched();

    setTimeout(() => {
      // Validate if needed
    }, 100);
  }

  // ControlValueAccessor implementation
  writeValue(value: string | null): void {
    if (value) {
      const item = this.items().find((item) => item.id === value);
      if (item) {
        this.selection.setSelectedItems([item]);
      }
    } else {
      this.selection.clearSelection();
    }
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Handle disabled state
  }
}

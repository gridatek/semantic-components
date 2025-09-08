// combobox.component.ts
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
// Option component for ActiveDescendantKeyManager
import { Highlightable } from '@angular/cdk/a11y';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  forwardRef,
  inject,
  input,
  output,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

export interface ComboboxItem {
  label: string;
  value: string;
  subtitle?: string;
  group?: string;
}

@Directive({
  selector: '[appComboboxOption]',
  standalone: true,
  host: {
    '[class.bg-blue-50]': 'isActive',
    '[attr.aria-selected]': 'isSelected()',
    role: 'option',
  },
})
export class ComboboxOptionDirective implements Highlightable {
  private element = inject(ElementRef);

  readonly item = input.required<string | ComboboxItem>();
  readonly isSelected = input<boolean>(false);
  isActive: boolean = false;
  disabled?: boolean = false;

  setActiveStyles(): void {
    this.isActive = true;
    this.element.nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  setInactiveStyles(): void {
    this.isActive = false;
  }

  getLabel?(): string {
    const item = this.item();
    return typeof item === 'string' ? item : item.label;
  }
}

@Component({
  selector: 'sc-combobox',
  standalone: true,
  imports: [FormsModule, OverlayModule, ComboboxOptionDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScCombobox),
      multi: true,
    },
  ],
  template: `
    <div class="combobox-container" #container>
      @if (label) {
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ label }}
        </label>
      }
      <div class="relative">
        <!-- Single Select Input -->
        @if (!multiple()) {
          <div class="relative">
            <input
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              #inputElement
              #trigger="cdkOverlayOrigin"
              [(ngModel)]="searchQuery"
              [placeholder]="placeholder()"
              [attr.aria-expanded]="isOpen"
              [attr.aria-controls]="listboxId"
              [attr.aria-activedescendant]="activeItemId"
              (input)="handleInput($event)"
              (focus)="open()"
              (blur)="handleBlur()"
              (keydown)="handleKeydown($event)"
              cdkOverlayOrigin
              type="text"
              role="combobox"
              aria-autocomplete="list"
            />
            @if (showToggleButton()) {
              <button
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                (click)="toggle()"
                type="button"
                tabindex="-1"
              >
                <svg
                  class="w-5 h-5 transition-transform duration-200"
                  [class.rotate-180]="isOpen"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            }
          </div>
        }

        <!-- Multi Select Input with Chips -->
        @if (multiple()) {
          <div
            class="min-h-[42px] w-full px-3 py-1 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition duration-200 flex flex-wrap gap-2 items-center"
            #trigger="cdkOverlayOrigin"
            cdkOverlayOrigin
          >
            <div class="selected-chips flex flex-wrap gap-2">
              @for (value of selectedValues; track value) {
                <div
                  class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
                >
                  {{ getItemLabel(value) }}
                  <button
                    class="hover:text-blue-900"
                    (click)="removeChip(value, $event)"
                    type="button"
                    tabindex="-1"
                  >
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              }
            </div>
            <input
              class="flex-1 min-w-[150px] outline-none py-1"
              #inputElement
              [(ngModel)]="searchQuery"
              [placeholder]="placeholder()"
              [attr.aria-expanded]="isOpen"
              [attr.aria-controls]="listboxId"
              [attr.aria-activedescendant]="activeItemId"
              (input)="handleInput($event)"
              (focus)="open()"
              (blur)="handleBlur()"
              (keydown)="handleKeydown($event)"
              type="text"
              role="combobox"
              aria-autocomplete="list"
            />
          </div>
        }

        <!-- Loading Spinner (for async) -->
        @if (async() && isLoading) {
          <div class="loading-spinner absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              class="animate-spin h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        }

        <!-- Dropdown Panel using CDK Overlay -->
        <ng-template
          [cdkConnectedOverlayOrigin]="triggerElement"
          [cdkConnectedOverlayOpen]="isOpen"
          [cdkConnectedOverlayWidth]="triggerWidth"
          [cdkConnectedOverlayHasBackdrop]="false"
          [cdkConnectedOverlayPositions]="positions"
          (backdropClick)="close()"
          (detach)="close()"
          cdkConnectedOverlay
        >
          <div
            class="combobox-panel bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            [id]="listboxId"
            [attr.aria-multiselectable]="multiple()"
            role="listbox"
          >
            <!-- No Results -->
            @if (filteredItems.length === 0) {
              <div class="px-4 py-3 text-gray-500 text-sm">No results found</div>
            }

            <!-- Grouped Options -->
            @if (grouped() && filteredItems.length > 0) {
              @for (group of getGroups(); track group) {
                <div
                  class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 group-header"
                >
                  {{ group.name }}
                </div>
                @for (item of group.items; track item; let i = $index) {
                  <div
                    class="combobox-option px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    [item]="item"
                    [isSelected]="isItemSelected(item)"
                    [id]="'option-' + group.name + '-' + i"
                    (click)="selectItem(item)"
                    (mouseenter)="setActiveItem(item)"
                    appComboboxOption
                  >
                    <div class="flex flex-col">
                      <span class="text-gray-900">{{ item.label }}</span>
                      @if (item.subtitle) {
                        <span class="text-xs text-gray-500">
                          {{ item.subtitle }}
                        </span>
                      }
                    </div>
                    @if (multiple() && isItemSelected(item)) {
                      <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    }
                  </div>
                }
              }
            }

            <!-- Non-grouped Options -->
            @if (!grouped() && filteredItems.length > 0) {
              @for (item of filteredItems; track item; let i = $index) {
                <div
                  class="combobox-option px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  [item]="item"
                  [isSelected]="isItemSelected(item)"
                  [id]="'option-' + i"
                  (click)="selectItem(item)"
                  (mouseenter)="setActiveItem(item)"
                  appComboboxOption
                >
                  <div class="flex flex-col">
                    <span class="text-gray-900">{{ getItemLabel(item) }}</span>
                    @if (getItemSubtitle(item)) {
                      <span class="text-xs text-gray-500">
                        {{ getItemSubtitle(item) }}
                      </span>
                    }
                  </div>
                  @if (multiple() && isItemSelected(item)) {
                    <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  }
                </div>
              }
            }
          </div>
        </ng-template>
      </div>

      <!-- Status Display -->
      @if (showStatus()) {
        <p class="mt-2 text-sm text-gray-500">
          @if (!multiple()) {
            Selected:
            <span class="font-medium">
              {{ selectedValue ? getItemLabel(selectedValue) : 'None' }}
            </span>
          }
          @if (multiple()) {
            Selected count:
            <span class="font-medium">{{ selectedValues.size }}</span>
          }
        </p>
      }
      @if (async() && showStatus()) {
        <p class="mt-2 text-sm text-gray-500">
          Status:
          <span class="font-medium">{{ isLoading ? 'Loading...' : 'Ready' }}</span>
        </p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      /* Custom animations */
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .combobox-panel {
        animation: slideDown 0.2s ease-out;
      }

      /* Focus styles */
      .combobox-option:focus {
        outline: none;
      }

      /* Scrollbar styling */
      .combobox-panel::-webkit-scrollbar {
        width: 8px;
      }

      .combobox-panel::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }

      .combobox-panel::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }

      .combobox-panel::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      /* Tailwind animation classes */
      .animate-spin {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .rotate-180 {
        transform: rotate(180deg);
      }
    `,
  ],
})
export class ScCombobox implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  @Input() label: string = '';
  readonly placeholder = input<string>('Type to search...');
  readonly items = input<(string | ComboboxItem)[]>([]);
  readonly multiple = input<boolean>(false);
  readonly async = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly showStatus = input<boolean>(true);
  readonly showToggleButton = input<boolean>(true);
  readonly asyncSearchFn = input<(query: string) => Promise<ComboboxItem[]>>();

  readonly selectionChange = output<any>();
  readonly searchChange = output<string>();

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('container') containerElement!: ElementRef<HTMLDivElement>;
  @ViewChild('trigger', { read: ElementRef }) triggerElement!: ElementRef;
  @ViewChildren(ComboboxOptionDirective) options!: QueryList<ComboboxOptionDirective>;

  searchQuery: string = '';
  selectedValue: any = null;
  selectedValues: Set<string> = new Set();
  filteredItems: (string | ComboboxItem)[] = [];
  isOpen: boolean = false;
  isLoading: boolean = false;
  listboxId: string = `listbox-${Math.random().toString(36).substr(2, 9)}`;
  activeItemId: string | null = null;
  triggerWidth: number = 0;

  keyManager!: ActiveDescendantKeyManager<ComboboxOptionDirective>;
  private searchSubject = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();
  private onChange: any = () => {};
  private onTouched: any = () => {};

  // CDK Overlay positions
  positions: ConnectedPosition[] = [
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

  ngOnInit() {
    this.filteredItems = [...this.items()];

    if (this.async()) {
      this.searchSubject
        .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((query) => {
          this.performAsyncSearch(query);
        });
    }
  }

  ngAfterViewInit() {
    // Initialize key manager after view init when options are available
    this.initKeyManager();

    // Watch for options changes
    this.options.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initKeyManager();
    });

    // Set trigger width
    if (this.triggerElement) {
      this.triggerWidth = this.triggerElement.nativeElement.offsetWidth;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initKeyManager() {
    if (this.options && this.options.length) {
      this.keyManager = new ActiveDescendantKeyManager(this.options).withWrap().withTypeAhead(300);

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

  writeValue(value: any): void {
    if (this.multiple()) {
      this.selectedValues = new Set(value || []);
    } else {
      this.selectedValue = value;
      if (value) {
        const item = this.items().find((i) => this.getItemValue(i) === value);
        if (item) {
          this.searchQuery = this.getItemLabel(item);
        }
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if (this.async()) {
      this.searchSubject.next(value);
    } else {
      this.filterItems(value);
      this.open();
    }

    this.searchChange.emit(value);
  }

  filterItems(query: string) {
    if (!query) {
      this.filteredItems = [...this.items()];
    } else {
      this.filteredItems = this.items().filter((item) => {
        const label = this.getItemLabel(item).toLowerCase();
        return label.includes(query);
      });
    }
  }

  async performAsyncSearch(query: string) {
    if (!query) {
      this.filteredItems = [];
      return;
    }

    this.isLoading = true;

    try {
      const asyncSearchFn = this.asyncSearchFn();
      if (asyncSearchFn) {
        this.filteredItems = await asyncSearchFn(query);
      } else {
        // Default mock implementation
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockUsers = [
          'John Doe',
          'Jane Smith',
          'Bob Johnson',
          'Alice Williams',
          'Charlie Brown',
          'Diana Prince',
          'Eve Adams',
          'Frank Miller',
        ];

        this.filteredItems = mockUsers
          .filter((user) => user.toLowerCase().includes(query))
          .map((user) => ({
            label: user,
            value: user.toLowerCase().replace(' ', '_'),
            subtitle: `@${user.toLowerCase().replace(' ', '_')}`,
          }));
      }

      this.open();
    } finally {
      this.isLoading = false;
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
      if (!this.containerElement?.nativeElement.contains(document.activeElement)) {
        this.close();
      }
    }, 200);
  }

  setActiveItem(item: string | ComboboxItem) {
    if (this.keyManager) {
      const index = this.options.toArray().findIndex((option) => {
        const optionValue = this.getItemValue(option.item());
        const itemValue = this.getItemValue(item);
        return optionValue === itemValue;
      });

      if (index >= 0) {
        this.keyManager.setActiveItem(index);
      }
    }
  }

  selectItem(item: string | ComboboxItem) {
    if (this.multiple()) {
      this.toggleMultiSelect(item);
    } else {
      const value = this.getItemValue(item);
      const label = this.getItemLabel(item);

      this.selectedValue = value;
      this.searchQuery = label;
      this.onChange(value);
      this.selectionChange.emit(value);
      this.close();
    }
  }

  toggleMultiSelect(item: string | ComboboxItem) {
    const value = this.getItemValue(item);

    if (this.selectedValues.has(value)) {
      this.selectedValues.delete(value);
    } else {
      this.selectedValues.add(value);
    }

    const valuesArray = Array.from(this.selectedValues);
    this.onChange(valuesArray);
    this.selectionChange.emit(valuesArray);
    this.searchQuery = '';
  }

  removeChip(value: string, event: Event) {
    event.stopPropagation();
    this.selectedValues.delete(value);
    const valuesArray = Array.from(this.selectedValues);
    this.onChange(valuesArray);
    this.selectionChange.emit(valuesArray);
  }

  isItemSelected(item: string | ComboboxItem): boolean {
    const value = this.getItemValue(item);
    if (this.multiple()) {
      return this.selectedValues.has(value);
    }
    return this.selectedValue === value;
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

  getItemValue(item: string | ComboboxItem): string {
    return typeof item === 'string' ? item : item.value;
  }

  getItemSubtitle(item: string | ComboboxItem): string | undefined {
    return typeof item === 'string' ? undefined : item.subtitle;
  }

  getGroups(): { name: string; items: ComboboxItem[] }[] {
    const groups: { [key: string]: ComboboxItem[] } = {};

    this.filteredItems.forEach((item) => {
      if (typeof item !== 'string') {
        const group = item.group || 'Other';
        if (!groups[group]) groups[group] = [];
        groups[group].push(item);
      }
    });

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;

    // Initialize key manager when opening
    setTimeout(() => {
      this.initKeyManager();
      if (this.keyManager && this.selectedValue) {
        // Set active item to selected value
        const selectedIndex = this.options.toArray().findIndex((option) => {
          const optionValue = this.getItemValue(option.item());
          return optionValue === this.selectedValue;
        });
        if (selectedIndex >= 0) {
          this.keyManager.setActiveItem(selectedIndex);
        }
      }
    });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.activeItemId = null;
    if (this.keyManager) {
      this.keyManager.setActiveItem(-1);
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

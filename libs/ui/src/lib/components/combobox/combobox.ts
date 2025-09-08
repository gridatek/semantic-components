import { ActiveDescendantKeyManager, _IdGenerator } from '@angular/cdk/a11y';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  forwardRef,
  inject,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

import { ScComboboxInput } from './combobox-input';
import { ScComboboxMultiInput } from './combobox-multi-input';
import { ScComboboxOption } from './combobox-option';
import { ScComboboxPanel } from './combobox-panel';
import { ScComboboxItem } from './combobox-types';

export { ScComboboxItem as ComboboxItem } from './combobox-types';

@Component({
  selector: 'sc-combobox',
  standalone: true,
  imports: [OverlayModule, ScComboboxInput, ScComboboxMultiInput, ScComboboxPanel],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScCombobox),
      multi: true,
    },
  ],
  template: `
    <div class="combobox-container" #container>
      <div class="relative">
        <!-- Single Select Input -->
        @if (!multiple()) {
          <sc-combobox-input
            #singleInput
            #trigger="cdkOverlayOrigin"
            [inputId]="id()"
            [placeholder]="placeholder()"
            [showToggleButton]="showToggleButton()"
            [isOpen]="isOpen"
            [listboxId]="listboxId"
            [activeItemId]="activeItemId"
            (inputChange)="handleInput($event)"
            (focusChange)="open()"
            (blurChange)="handleBlur()"
            (keydownChange)="handleKeydown($event)"
            (toggleChange)="toggle()"
            cdkOverlayOrigin
          />
        }

        <!-- Multi Select Input with Chips -->
        @if (multiple()) {
          <sc-combobox-multi-input
            #multiInput
            #trigger="cdkOverlayOrigin"
            [inputId]="id()"
            [placeholder]="placeholder()"
            [selectedValues]="selectedValues"
            [items]="items()"
            [isOpen]="isOpen"
            [listboxId]="listboxId"
            [activeItemId]="activeItemId"
            (inputChange)="handleInput($event)"
            (focusChange)="open()"
            (blurChange)="handleBlur()"
            (keydownChange)="handleKeydown($event)"
            (chipRemoved)="removeChip($event)"
            cdkOverlayOrigin
          />
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
          [cdkConnectedOverlayOrigin]="triggerElement()"
          [cdkConnectedOverlayOpen]="isOpen"
          [cdkConnectedOverlayWidth]="triggerWidth"
          [cdkConnectedOverlayHasBackdrop]="false"
          [cdkConnectedOverlayPositions]="positions"
          (backdropClick)="close()"
          (detach)="close()"
          cdkConnectedOverlay
        >
          <sc-combobox-panel
            #panel
            [listboxId]="listboxId"
            [filteredItems]="filteredItems"
            [multiple]="multiple()"
            [grouped]="grouped()"
            [selectedValue]="selectedValue"
            [selectedValues]="selectedValues"
            (itemSelected)="selectItem($event)"
            (itemActiveChange)="setActiveItem($event)"
          />
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
  host: {
    'data-slot': 'control',
  },
  styles: [
    `
      :host {
        display: block;
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
  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-combobox-'), {
    alias: 'id',
  });

  readonly id = linkedSignal(() => this.idInput());

  readonly placeholder = input<string>('Type to search...');
  readonly items = input<(string | ScComboboxItem)[]>([]);
  readonly multiple = input<boolean>(false);
  readonly async = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly showStatus = input<boolean>(true);
  readonly showToggleButton = input<boolean>(true);
  readonly asyncSearchFn = input<(query: string) => Promise<ScComboboxItem[]>>();

  readonly selectionChange = output<any>();
  readonly searchChange = output<string>();

  readonly singleInput = viewChild<ScComboboxInput>('singleInput');
  readonly multiInput = viewChild<ScComboboxMultiInput>('multiInput');
  readonly panel = viewChild<ScComboboxPanel>('panel');
  readonly containerElement = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  selectedValue: any = null;
  selectedValues: Set<string> = new Set();
  filteredItems: (string | ScComboboxItem)[] = [];
  isOpen: boolean = false;
  isLoading: boolean = false;
  listboxId: string = `listbox-${Math.random().toString(36).substr(2, 9)}`;
  activeItemId: string | null = null;
  triggerWidth: number = 0;

  keyManager!: ActiveDescendantKeyManager<ScComboboxOption>;
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
    const panel = this.panel();
    if (panel) {
      panel.options.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.initKeyManager();
      });
    }

    // Set trigger width
    const triggerElement = this.triggerElement();
    if (triggerElement) {
      this.triggerWidth = triggerElement.nativeElement.offsetWidth;
    }
  }

  ngOnDestroy() {
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

  writeValue(value: any): void {
    if (this.multiple()) {
      this.selectedValues = new Set(value || []);
    } else {
      this.selectedValue = value;
      if (value) {
        const item = this.items().find((i) => this.getItemValue(i) === value);
        if (item) {
          const searchQuery = this.getItemLabel(item);
          const singleInput = this.singleInput();
          if (singleInput) {
            singleInput.searchQuery = searchQuery;
          }
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
      if (!this.containerElement()?.nativeElement.contains(document.activeElement)) {
        this.close();
      }
    }, 200);
  }

  setActiveItem(item: string | ScComboboxItem) {
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

  selectItem(item: string | ScComboboxItem) {
    if (this.multiple()) {
      this.toggleMultiSelect(item);
    } else {
      const value = this.getItemValue(item);
      const label = this.getItemLabel(item);

      this.selectedValue = value;
      const singleInput = this.singleInput();
      if (singleInput) {
        singleInput.searchQuery = label;
      }
      this.onChange(value);
      this.selectionChange.emit(value);
      this.close();
    }
  }

  toggleMultiSelect(item: string | ScComboboxItem) {
    const value = this.getItemValue(item);

    if (this.selectedValues.has(value)) {
      this.selectedValues.delete(value);
    } else {
      this.selectedValues.add(value);
    }

    const valuesArray = Array.from(this.selectedValues);
    this.onChange(valuesArray);
    this.selectionChange.emit(valuesArray);
    const multiInput = this.multiInput();
    if (multiInput) {
      multiInput.searchQuery = '';
    }
  }

  removeChip(value: string) {
    this.selectedValues.delete(value);
    const valuesArray = Array.from(this.selectedValues);
    this.onChange(valuesArray);
    this.selectionChange.emit(valuesArray);
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

  getItemValue(item: string | ScComboboxItem): string {
    return typeof item === 'string' ? item : item.value;
  }

  getItemSubtitle(item: string | ScComboboxItem): string | undefined {
    return typeof item === 'string' ? undefined : item.subtitle;
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;

    // Initialize key manager when opening
    setTimeout(() => {
      this.initKeyManager();
      const panel = this.panel();
      if (this.keyManager && this.selectedValue && panel) {
        // Set active item to selected value
        const selectedIndex = panel.options.toArray().findIndex((option) => {
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

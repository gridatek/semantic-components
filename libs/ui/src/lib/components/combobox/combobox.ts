import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

export interface ComboboxItem {
  label: string;
  value: string;
  subtitle?: string;
  group?: string;
}

@Component({
  selector: 'sc-combobox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScCombobox),
      multi: true,
    },
  ],
  template: `
    <div class="combobox-container" #container>
      <label class="block text-sm font-medium text-gray-700 mb-2" *ngIf="label">
        {{ label }}
      </label>
      <div class="relative">
        <!-- Single Select Input -->
        <div class="relative" *ngIf="!multiple">
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            #inputElement
            [(ngModel)]="searchQuery"
            [placeholder]="placeholder"
            [attr.aria-expanded]="isOpen"
            [attr.aria-controls]="listboxId"
            (input)="handleInput($event)"
            (focus)="open()"
            (blur)="handleBlur()"
            (keydown)="handleKeydown($event)"
            type="text"
            role="combobox"
            aria-autocomplete="list"
          />
          <button
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            *ngIf="showToggleButton"
            (click)="toggle()"
            type="button"
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
        </div>

        <!-- Multi Select Input with Chips -->
        <div
          class="min-h-[42px] w-full px-3 py-1 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition duration-200 flex flex-wrap gap-2 items-center"
          *ngIf="multiple"
        >
          <div class="selected-chips flex flex-wrap gap-2">
            <div
              class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
              *ngFor="let value of selectedValues"
            >
              {{ getItemLabel(value) }}
              <button class="hover:text-blue-900" (click)="removeChip(value, $event)" type="button">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <input
            class="flex-1 min-w-[150px] outline-none py-1"
            #inputElement
            [(ngModel)]="searchQuery"
            [placeholder]="placeholder"
            [attr.aria-expanded]="isOpen"
            [attr.aria-controls]="listboxId"
            (input)="handleInput($event)"
            (focus)="open()"
            (blur)="handleBlur()"
            (keydown)="handleKeydown($event)"
            type="text"
            role="combobox"
            aria-autocomplete="list"
          />
        </div>

        <!-- Loading Spinner (for async) -->
        <div
          class="loading-spinner absolute right-3 top-1/2 transform -translate-y-1/2"
          *ngIf="async && isLoading"
        >
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

        <!-- Dropdown Panel -->
        <div
          class="combobox-panel absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          [id]="listboxId"
          [class.hidden]="!isOpen"
          [attr.aria-multiselectable]="multiple"
          role="listbox"
        >
          <!-- No Results -->
          <div class="px-4 py-3 text-gray-500 text-sm" *ngIf="filteredItems.length === 0">
            No results found
          </div>

          <!-- Grouped Options -->
          <ng-container *ngIf="grouped && filteredItems.length > 0">
            <ng-container *ngFor="let group of getGroups()">
              <div
                class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 group-header"
              >
                {{ group.name }}
              </div>
              <div
                class="combobox-option px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                *ngFor="let item of group.items; let i = index"
                [class.bg-blue-50]="selectedIndex === getGlobalIndex(group.name, i)"
                [attr.aria-selected]="isItemSelected(item)"
                (click)="selectItem(item)"
                (mouseenter)="selectedIndex = getGlobalIndex(group.name, i)"
                role="option"
              >
                <div class="flex flex-col">
                  <span class="text-gray-900">{{ item.label }}</span>
                  <span class="text-xs text-gray-500" *ngIf="item.subtitle">
                    {{ item.subtitle }}
                  </span>
                </div>
                <svg
                  class="w-5 h-5 text-blue-600"
                  *ngIf="multiple && isItemSelected(item)"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </ng-container>
          </ng-container>

          <!-- Non-grouped Options -->
          <ng-container *ngIf="!grouped && filteredItems.length > 0">
            <div
              class="combobox-option px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              *ngFor="let item of filteredItems; let i = index"
              [class.bg-blue-50]="selectedIndex === i"
              [attr.aria-selected]="isItemSelected(item)"
              (click)="selectItem(item)"
              (mouseenter)="selectedIndex = i"
              role="option"
            >
              <div class="flex flex-col">
                <span class="text-gray-900">{{ getItemLabel(item) }}</span>
                <span class="text-xs text-gray-500" *ngIf="getItemSubtitle(item)">
                  {{ getItemSubtitle(item) }}
                </span>
              </div>
              <svg
                class="w-5 h-5 text-blue-600"
                *ngIf="multiple && isItemSelected(item)"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </ng-container>
        </div>
      </div>

      <!-- Status Display -->
      <p class="mt-2 text-sm text-gray-500" *ngIf="showStatus">
        <ng-container *ngIf="!multiple">
          Selected:
          <span class="font-medium">
            {{ selectedValue ? getItemLabel(selectedValue) : 'None' }}
          </span>
        </ng-container>
        <ng-container *ngIf="multiple">
          Selected count:
          <span class="font-medium">{{ selectedValues.size }}</span>
        </ng-container>
      </p>
      <p class="mt-2 text-sm text-gray-500" *ngIf="async && showStatus">
        Status:
        <span class="font-medium">{{ isLoading ? 'Loading...' : 'Ready' }}</span>
      </p>
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
export class ScCombobox implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Type to search...';
  @Input() items: (string | ComboboxItem)[] = [];
  @Input() multiple: boolean = false;
  @Input() async: boolean = false;
  @Input() grouped: boolean = false;
  @Input() showStatus: boolean = true;
  @Input() showToggleButton: boolean = true;
  @Input() asyncSearchFn?: (query: string) => Promise<ComboboxItem[]>;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() searchChange = new EventEmitter<string>();

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('container') containerElement!: ElementRef<HTMLDivElement>;

  searchQuery: string = '';
  selectedValue: any = null;
  selectedValues: Set<string> = new Set();
  filteredItems: (string | ComboboxItem)[] = [];
  selectedIndex: number = -1;
  isOpen: boolean = false;
  isLoading: boolean = false;
  listboxId: string = `listbox-${Math.random().toString(36).substr(2, 9)}`;

  private searchSubject = new BehaviorSubject<string>('');
  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit() {
    this.filteredItems = [...this.items];

    if (this.async) {
      this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe((query) => {
        this.performAsyncSearch(query);
      });
    }
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedValues = new Set(value || []);
    } else {
      this.selectedValue = value;
      if (value) {
        const item = this.items.find((i) => this.getItemValue(i) === value);
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

    if (this.async) {
      this.searchSubject.next(value);
    } else {
      this.filterItems(value);
      this.open();
    }

    this.searchChange.emit(value);
  }

  filterItems(query: string) {
    if (!query) {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter((item) => {
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
      if (this.asyncSearchFn) {
        this.filteredItems = await this.asyncSearchFn(query);
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
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectPrevious();
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0 && this.filteredItems[this.selectedIndex]) {
          this.selectItem(this.filteredItems[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.close();
        break;
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

  selectNext() {
    this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredItems.length - 1);
  }

  selectPrevious() {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
  }

  selectItem(item: string | ComboboxItem) {
    if (this.multiple) {
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
    if (this.multiple) {
      return this.selectedValues.has(value);
    }
    return this.selectedValue === value;
  }

  getItemLabel(item: any): string {
    if (!item) return '';
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

  getGlobalIndex(groupName: string, localIndex: number): number {
    let globalIndex = 0;
    const groups = this.getGroups();

    for (const group of groups) {
      if (group.name === groupName) {
        return globalIndex + localIndex;
      }
      globalIndex += group.items.length;
    }

    return -1;
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.selectedIndex = -1;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.containerElement?.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}

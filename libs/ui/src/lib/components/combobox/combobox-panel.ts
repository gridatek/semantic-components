import { Component, QueryList, ViewChildren, input, output } from '@angular/core';

import { ScComboboxOption } from './combobox-option';
import { ScComboboxItem } from './combobox-types';

@Component({
  selector: 'sc-combobox-panel',
  standalone: true,
  imports: [ScComboboxOption],
  template: `
    <div
      class="combobox-panel w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
      [id]="listboxId()"
      [attr.aria-multiselectable]="multiple()"
      role="listbox"
    >
      <!-- No Results -->
      @if (filteredItems().length === 0) {
        <div class="px-4 py-3 text-gray-500 text-sm">No results found</div>
      }

      <!-- Grouped Options -->
      @if (grouped() && filteredItems().length > 0) {
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
      @if (!grouped() && filteredItems().length > 0) {
        @for (item of filteredItems(); track item; let i = $index) {
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
  `,
  styles: [
    `
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
        box-sizing: border-box;
      }

      .combobox-option {
        width: 100%;
        box-sizing: border-box;
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
    `,
  ],
})
export class ScComboboxPanel {
  @ViewChildren(ScComboboxOption) options!: QueryList<ScComboboxOption>;

  readonly listboxId = input<string>('');
  readonly filteredItems = input<(string | ScComboboxItem)[]>([]);
  readonly multiple = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly selectedValue = input<any>(null);
  readonly selectedValues = input<Set<string>>(new Set());

  readonly itemSelected = output<string | ScComboboxItem>();
  readonly itemActiveChange = output<string | ScComboboxItem>();

  selectItem(item: string | ScComboboxItem) {
    this.itemSelected.emit(item);
  }

  setActiveItem(item: string | ScComboboxItem) {
    this.itemActiveChange.emit(item);
  }

  isItemSelected(item: string | ScComboboxItem): boolean {
    const value = this.getItemValue(item);
    if (this.multiple()) {
      return this.selectedValues().has(value);
    }
    return this.selectedValue() === value;
  }

  getItemLabel(item: string | ScComboboxItem): string {
    return typeof item === 'string' ? item : item.label;
  }

  getItemValue(item: string | ScComboboxItem): string {
    return typeof item === 'string' ? item : item.value;
  }

  getItemSubtitle(item: string | ScComboboxItem): string | undefined {
    return typeof item === 'string' ? undefined : item.subtitle;
  }

  getGroups(): { name: string; items: ScComboboxItem[] }[] {
    const groups: { [key: string]: ScComboboxItem[] } = {};

    this.filteredItems().forEach((item) => {
      if (typeof item !== 'string') {
        const group = item.group || 'Other';
        if (!groups[group]) groups[group] = [];
        groups[group].push(item);
      }
    });

    return Object.entries(groups).map(([name, items]) => ({ name, items }));
  }
}

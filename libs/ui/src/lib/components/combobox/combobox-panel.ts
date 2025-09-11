import { Component, QueryList, ViewChildren, input, output } from '@angular/core';

import { ScComboboxOption } from './combobox-option';
import { ScComboboxItem } from './combobox-types';

@Component({
  selector: 'sc-combobox-panel',
  standalone: true,
  imports: [ScComboboxOption],
  template: `
    <div
      class="combobox-panel relative z-50 max-h-60 min-w-[8rem] overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      [id]="listboxId()"
      [attr.aria-multiselectable]="multiple()"
      role="listbox"
    >
      <!-- Loading State -->
      @if (isLoading()) {
        <div class="flex items-center justify-center py-6">
          <svg
            class="h-4 w-4 animate-spin text-muted-foreground mr-2"
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
          <span class="text-sm text-muted-foreground">Searching...</span>
        </div>
      }

      <!-- No Results -->
      @if (!isLoading() && filteredItems().length === 0) {
        <div class="py-6 text-center text-sm text-muted-foreground">No results found</div>
      }

      <!-- Grouped Options -->
      @if (!isLoading() && grouped() && filteredItems().length > 0) {
        @for (group of getGroups(); track group.name) {
          <div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
            {{ group.name }}
          </div>
          @for (item of group.items; track item.value; let i = $index) {
            <div
              class="combobox-option relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              [item]="item"
              [isSelected]="isItemSelected(item)"
              [id]="'option-' + group.name + '-' + i"
              (click)="selectItem(item)"
              (mouseenter)="setActiveItem(item)"
              scComboboxOption
            >
              <div class="flex flex-col">
                <span>{{ item.label }}</span>
                @if (item.subtitle) {
                  <span class="text-xs text-muted-foreground">
                    {{ item.subtitle }}
                  </span>
                }
              </div>
              @if (multiple() && isItemSelected(item)) {
                <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              }
            </div>
          }
        }
      }

      <!-- Non-grouped Options -->
      @if (!isLoading() && !grouped() && filteredItems().length > 0) {
        @for (item of filteredItems(); track getItemValue(item); let i = $index) {
          <div
            class="combobox-option relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            [item]="item"
            [isSelected]="isItemSelected(item)"
            [id]="'option-' + i"
            (click)="selectItem(item)"
            (mouseenter)="setActiveItem(item)"
            scComboboxOption
          >
            <div class="flex flex-col">
              <span>{{ getItemLabel(item) }}</span>
              @if (getItemSubtitle(item)) {
                <span class="text-xs text-muted-foreground">
                  {{ getItemSubtitle(item) }}
                </span>
              }
            </div>
            @if (multiple() && isItemSelected(item)) {
              <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            }
          </div>
        }
      }
    </div>
  `,
})
export class ScComboboxPanel {
  @ViewChildren(ScComboboxOption) options!: QueryList<ScComboboxOption>;

  readonly listboxId = input<string>('');
  readonly filteredItems = input<(string | ScComboboxItem)[]>([]);
  readonly multiple = input<boolean>(false);
  readonly grouped = input<boolean>(false);
  readonly selectedValue = input<any>(null);
  readonly selectedValues = input<Set<string>>(new Set());
  readonly isLoading = input<boolean>(false);

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

import { OverlayModule } from '@angular/cdk/overlay';
import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScAutocompleteItem } from './autocomplete-types';

@Component({
  selector: 'sc-autocomplete-multi-input',
  imports: [FormsModule, OverlayModule],
  template: `
    <div
      class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-wrap gap-2 min-h-[2.5rem]"
      #trigger="cdkOverlayOrigin"
      cdkOverlayOrigin
    >
      <div class="selected-chips flex flex-wrap gap-2">
        @for (value of selectedValues(); track value) {
          <div
            class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 gap-1"
          >
            {{ getItemLabel(value) }}
            <button
              class="ml-1 h-3 w-3 rounded-full outline-none ring-offset-background transition-colors hover:bg-secondary-foreground/20 focus:bg-secondary-foreground/20 focus:outline-none"
              (click)="removeChip(value, $event)"
              type="button"
              tabindex="-1"
            >
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        }
      </div>
      <input
        class="flex-1 min-w-[8rem] bg-transparent outline-none placeholder:text-muted-foreground"
        #inputElement
        [(ngModel)]="searchQuery"
        [id]="inputId()"
        [placeholder]="placeholder()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="listboxId()"
        [attr.aria-activedescendant]="activeItemId()"
        (input)="handleInput($event)"
        (focus)="focusChange.emit()"
        (blur)="blurChange.emit()"
        (keydown)="handleKeydown($event)"
        type="text"
        role="combobox"
        aria-autocomplete="list"
      />
    </div>
  `,
})
export class ScAutocompleteMultiInput {
  readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  readonly inputId = input<string>('');
  readonly placeholder = input<string>('Type to search...');
  readonly selectedValues = input<Set<string>>(new Set());
  readonly items = input<(string | ScAutocompleteItem)[]>([]);
  readonly isOpen = input<boolean>(false);
  readonly listboxId = input<string>('');
  readonly activeItemId = input<string | null>(null);

  readonly inputChange = output<Event>();
  readonly focusChange = output<void>();
  readonly blurChange = output<void>();
  readonly keydownChange = output<KeyboardEvent>();
  readonly chipRemoved = output<string>();

  searchQuery = '';

  handleInput(event: Event) {
    this.inputChange.emit(event);
  }

  handleKeydown(event: KeyboardEvent) {
    // Handle Delete/Backspace when input is empty to remove last chip
    if ((event.key === 'Backspace' || event.key === 'Delete') && this.searchQuery === '') {
      event.preventDefault();
      const selectedValuesArray = Array.from(this.selectedValues());
      if (selectedValuesArray.length > 0) {
        const lastValue = selectedValuesArray[selectedValuesArray.length - 1];
        this.chipRemoved.emit(lastValue);
      }
    } else {
      // Emit keydown for other keys to be handled by parent
      this.keydownChange.emit(event);
    }
  }

  removeChip(value: string, event: Event) {
    event.stopPropagation();
    this.chipRemoved.emit(value);
  }

  getItemLabel(value: string): string {
    const item = this.items().find((i) => {
      if (typeof i === 'string') return i === value;
      return i.value === value;
    });

    if (item) {
      return typeof item === 'string' ? item : item.label;
    }

    return value;
  }
}

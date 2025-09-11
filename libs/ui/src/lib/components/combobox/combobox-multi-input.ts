import { OverlayModule } from '@angular/cdk/overlay';
import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScComboboxItem } from './combobox-types';

@Component({
  selector: 'sc-combobox-multi-input',
  standalone: true,
  imports: [FormsModule, OverlayModule],
  template: `
    <div
      class="min-h-[42px] w-full px-3 py-1 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition duration-200 flex flex-wrap gap-2 items-center"
      #trigger="cdkOverlayOrigin"
      cdkOverlayOrigin
    >
      <div class="selected-chips flex flex-wrap gap-2">
        @for (value of selectedValues(); track value) {
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
        [id]="inputId()"
        [placeholder]="placeholder()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="listboxId()"
        [attr.aria-activedescendant]="activeItemId()"
        (input)="handleInput($event)"
        (focus)="focusChange.emit()"
        (blur)="blurChange.emit()"
        (keydown)="keydownChange.emit($event)"
        type="text"
        role="combobox"
        aria-autocomplete="list"
      />
    </div>
  `,
})
export class ScComboboxMultiInput {
  readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  readonly inputId = input<string>('');
  readonly placeholder = input<string>('Type to search...');
  readonly selectedValues = input<Set<string>>(new Set());
  readonly items = input<(string | ScComboboxItem)[]>([]);
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

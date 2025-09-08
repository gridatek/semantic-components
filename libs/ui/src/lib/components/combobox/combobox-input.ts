import { OverlayModule } from '@angular/cdk/overlay';
import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sc-combobox-input',
  standalone: true,
  imports: [FormsModule, OverlayModule],
  template: `
    <div class="relative">
      <input
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        #inputElement
        #trigger="cdkOverlayOrigin"
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
        cdkOverlayOrigin
        type="text"
        role="combobox"
        aria-autocomplete="list"
      />
      @if (showToggleButton()) {
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          (click)="toggleChange.emit()"
          type="button"
          tabindex="-1"
        >
          <svg
            class="w-5 h-5 transition-transform duration-200"
            [class.rotate-180]="isOpen()"
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
  `,
})
export class ScComboboxInput {
  readonly inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');
  readonly triggerElement = viewChild.required('trigger', { read: ElementRef });

  readonly inputId = input<string>('');
  readonly placeholder = input<string>('Type to search...');
  readonly showToggleButton = input<boolean>(true);
  readonly isOpen = input<boolean>(false);
  readonly listboxId = input<string>('');
  readonly activeItemId = input<string | null>(null);

  readonly inputChange = output<Event>();
  readonly focusChange = output<void>();
  readonly blurChange = output<void>();
  readonly keydownChange = output<KeyboardEvent>();
  readonly toggleChange = output<void>();

  searchQuery: string = '';

  handleInput(event: Event) {
    this.inputChange.emit(event);
  }
}

import { OverlayModule } from '@angular/cdk/overlay';
import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sc-autocomplete-input',
  imports: [FormsModule, OverlayModule],
  template: `
    <div class="relative">
      <input
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 hover:opacity-100"
          (click)="toggleChange.emit()"
          type="button"
          tabindex="-1"
        >
          <svg
            class="h-4 w-4 shrink-0 transition-transform duration-200"
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
      }
    </div>
  `,
})
export class ScAutocompleteInput {
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

  searchQuery = '';

  handleInput(event: Event) {
    this.inputChange.emit(event);
  }
}

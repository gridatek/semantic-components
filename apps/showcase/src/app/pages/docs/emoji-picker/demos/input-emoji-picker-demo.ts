import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScInput } from '@semantic-components/ui';
import { Emoji, ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-input-emoji-picker-demo',
  imports: [ScEmojiPicker, ScInput],
  template: `
    <div class="flex items-start gap-2">
      <div class="flex-1">
        <div class="relative">
          <input
            scInput
            type="text"
            [value]="inputValue()"
            (input)="onInputChange($event)"
            placeholder="Type a message..."
            class="pr-10"
          />
          <button
            type="button"
            class="hover:bg-accent absolute top-1/2 right-2 -translate-y-1/2 rounded p-1"
            (click)="togglePicker()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="text-muted-foreground size-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
          </button>
        </div>
        @if (showInputPicker()) {
          <div class="mt-2">
            <sc-emoji-picker
              (emojiSelect)="insertEmoji($event)"
              [maxRecent]="6"
            />
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputEmojiPickerDemo {
  readonly inputValue = signal('');
  readonly showInputPicker = signal(false);

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue.set(input.value);
  }

  togglePicker(): void {
    this.showInputPicker.set(!this.showInputPicker());
  }

  insertEmoji(emoji: Emoji): void {
    this.inputValue.update((v) => v + emoji.emoji);
    this.showInputPicker.set(false);
  }
}

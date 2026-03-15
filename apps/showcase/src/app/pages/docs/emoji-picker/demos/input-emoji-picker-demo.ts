import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScInput } from '@semantic-components/ui';
import {
  Emoji,
  ScEmojiPicker,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';
import { SiSmileIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-emoji-picker-demo',
  imports: [
    ScInput,
    SiSmileIcon,
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerGrid,
    ScEmojiPickerRecent,
  ],
  template: `
    <div class="flex w-full max-w-sm items-start gap-2">
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
            <svg siSmileIcon class="text-muted-foreground size-4"></svg>
          </button>
        </div>
        @if (showInputPicker()) {
          <div class="mt-2">
            <div
              scEmojiPicker
              (emojiSelect)="insertEmoji($event)"
              [maxRecent]="6"
            >
              <div class="p-2">
                <input scEmojiPickerSearch />
              </div>
              <div scEmojiPickerCategoryTabs></div>
              <div scEmojiPickerGrid></div>
              <div scEmojiPickerRecent></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
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

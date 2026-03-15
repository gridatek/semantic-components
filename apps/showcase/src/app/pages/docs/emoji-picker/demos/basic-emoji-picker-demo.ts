import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  Emoji,
  ScEmojiPicker,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerGrid,
    ScEmojiPickerRecent,
  ],
  template: `
    <div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
      <div class="p-2">
        <input scEmojiPickerSearch />
      </div>
      <div scEmojiPickerCategoryTabs></div>
      <div scEmojiPickerGrid></div>
      <div scEmojiPickerRecent></div>
    </div>
    @if (selectedEmoji()) {
      <p class="text-muted-foreground mt-4 text-sm">
        Selected: {{ selectedEmoji()?.emoji }} ({{ selectedEmoji()?.name }})
      </p>
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicEmojiPickerDemo {
  readonly selectedEmoji = signal<Emoji | null>(null);

  onEmojiSelect(emoji: Emoji): void {
    this.selectedEmoji.set(emoji);
  }
}

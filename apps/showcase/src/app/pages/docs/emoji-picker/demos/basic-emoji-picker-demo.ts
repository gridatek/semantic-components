import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  Emoji,
  ScEmojiPicker,
  ScEmojiPickerCategoryTab,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerCategoryTab,
    ScEmojiPickerGrid,
    ScEmojiPickerItem,
    ScEmojiPickerRecent,
  ],
  template: `
    <div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
      <div class="p-2">
        <input scEmojiPickerSearch />
      </div>
      <div scEmojiPickerCategoryTabs #tabs="scEmojiPickerCategoryTabs">
        @for (category of tabs.state.categories(); track category.id) {
          <button scEmojiPickerCategoryTab [category]="category">
            {{ category.icon }}
          </button>
        }
      </div>
      <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
        @if (grid.isEmpty()) {
          <p
            class="text-muted-foreground col-span-full p-2 text-center text-sm"
          >
            No emoji found
          </p>
        } @else {
          @for (emoji of grid.emojis(); track emoji.emoji) {
            <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
          }
        }
      </div>
      <div scEmojiPickerRecent #recent="scEmojiPickerRecent">
        @for (emoji of recent.state.recentEmojis(); track emoji.emoji) {
          <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
        }
      </div>
    </div>
    @if (selectedEmoji()) {
      <p class="text-muted-foreground mt-4 text-sm">
        Selected: {{ selectedEmoji()?.emoji }} ({{ selectedEmoji()?.name }})
      </p>
    }
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicEmojiPickerDemo {
  readonly selectedEmoji = signal<Emoji | null>(null);

  onEmojiSelect(emoji: Emoji): void {
    this.selectedEmoji.set(emoji);
  }
}

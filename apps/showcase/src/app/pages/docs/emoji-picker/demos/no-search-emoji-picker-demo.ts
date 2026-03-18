import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerCategoryTab,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
  ScEmojiPickerRecent,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerCategoryTab,
    ScEmojiPickerGrid,
    ScEmojiPickerItem,
    ScEmojiPickerRecent,
  ],
  template: `
    <div scEmojiPicker>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoSearchEmojiPickerDemo {}

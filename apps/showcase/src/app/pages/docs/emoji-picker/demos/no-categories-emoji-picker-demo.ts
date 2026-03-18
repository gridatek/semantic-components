import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerGrid,
  ScEmojiPickerItem,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-categories-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerGrid,
    ScEmojiPickerItem,
    ScEmojiPickerRecent,
  ],
  template: `
    <div scEmojiPicker class="h-72">
      <div class="p-2">
        <input scEmojiPickerSearch />
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
export class NoCategoriesEmojiPickerDemo {}

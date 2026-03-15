import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-recent-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerGrid,
  ],
  template: `
    <div scEmojiPicker>
      <div class="p-2">
        <input scEmojiPickerSearch />
      </div>
      <div scEmojiPickerCategoryTabs></div>
      <div scEmojiPickerGrid></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoRecentEmojiPickerDemo {}

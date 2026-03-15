import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerRecent,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerGrid,
    ScEmojiPickerRecent,
  ],
  template: `
    <div scEmojiPicker>
      <div scEmojiPickerCategoryTabs></div>
      <div scEmojiPickerGrid></div>
      <div scEmojiPickerRecent></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoSearchEmojiPickerDemo {}

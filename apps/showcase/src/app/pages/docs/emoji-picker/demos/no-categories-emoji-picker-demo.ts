import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerGrid,
  ScEmojiPickerRecent,
  ScEmojiPickerSearch,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-categories-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerSearch,
    ScEmojiPickerGrid,
    ScEmojiPickerRecent,
  ],
  template: `
    <div scEmojiPicker class="h-72">
      <div class="p-2">
        <input scEmojiPickerSearch />
      </div>
      <div scEmojiPickerGrid></div>
      <div scEmojiPickerRecent></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCategoriesEmojiPickerDemo {}

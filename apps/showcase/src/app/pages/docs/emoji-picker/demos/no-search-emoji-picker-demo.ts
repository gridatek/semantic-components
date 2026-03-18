import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScEmojiPicker,
  ScEmojiPickerCategoryTab,
  ScEmojiPickerCategoryTabs,
  ScEmojiPickerGrid,
  ScEmojiPickerRecent,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-emoji-picker-demo',
  imports: [
    ScEmojiPicker,
    ScEmojiPickerCategoryTabs,
    ScEmojiPickerCategoryTab,
    ScEmojiPickerGrid,
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
      <div scEmojiPickerGrid></div>
      <div scEmojiPickerRecent></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoSearchEmojiPickerDemo {}

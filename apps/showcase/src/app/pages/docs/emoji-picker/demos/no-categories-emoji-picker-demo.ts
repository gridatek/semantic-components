import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-categories-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <sc-emoji-picker [showCategories]="false" class="h-72" />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class NoCategoriesEmojiPickerDemo {}

import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-categories-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <sc-emoji-picker [showCategories]="false" class="h-72" />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoCategoriesEmojiPickerDemo {}

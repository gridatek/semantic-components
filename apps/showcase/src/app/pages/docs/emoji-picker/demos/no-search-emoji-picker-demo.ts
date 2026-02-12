import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-search-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <sc-emoji-picker [showSearch]="false" />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class NoSearchEmojiPickerDemo {}

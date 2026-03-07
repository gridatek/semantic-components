import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-recent-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <sc-emoji-picker [showRecent]="false" />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NoRecentEmojiPickerDemo {}

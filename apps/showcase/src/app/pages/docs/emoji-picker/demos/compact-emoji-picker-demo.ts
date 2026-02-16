import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-compact-emoji-picker-demo',
  imports: [ScEmojiPicker],
  template: `
    <scEmojiPicker [columns]="6" class="w-56" />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class CompactEmojiPickerDemo {}

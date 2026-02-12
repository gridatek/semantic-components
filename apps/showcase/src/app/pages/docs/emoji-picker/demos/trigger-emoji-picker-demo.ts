import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPickerTrigger } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-trigger-emoji-picker-demo',
  imports: [ScEmojiPickerTrigger],
  template: `
    <p class="text-sm text-muted-foreground mb-2">
      Use with a popover for dropdown behavior:
    </p>
    <div class="flex items-center gap-2">
      <button sc-emoji-picker-trigger></button>
      <span class="text-sm text-muted-foreground">
        ← Click to open (requires popover)
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class TriggerEmojiPickerDemo {}

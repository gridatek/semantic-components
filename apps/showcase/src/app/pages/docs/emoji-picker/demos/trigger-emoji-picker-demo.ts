import { Component, ViewEncapsulation } from '@angular/core';
import { ScEmojiPickerTrigger } from '@semantic-components/ui-lab';
import { SiSmileIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-trigger-emoji-picker-demo',
  imports: [ScEmojiPickerTrigger, SiSmileIcon],
  template: `
    <p class="text-muted-foreground mb-2 text-sm">
      Use with a popover for dropdown behavior:
    </p>
    <div class="flex items-center gap-2">
      <button scEmojiPickerTrigger>
        <svg siSmileIcon class="size-4"></svg>
      </button>
      <span class="text-muted-foreground text-sm">
        ← Click to open (requires popover)
      </span>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerEmojiPickerDemo {}

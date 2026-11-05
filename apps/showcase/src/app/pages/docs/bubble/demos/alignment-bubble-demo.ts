import { Component, ViewEncapsulation } from '@angular/core';
import { ScBubble, ScBubbleContent } from '@semantic-components/ui';

/** align: start (default) or end, for your own messages. Inline: it follows the direction. */
@Component({
  selector: 'app-alignment-bubble-demo',
  imports: [ScBubble, ScBubbleContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble variant="muted">
        <div scBubbleContent>
          This bubble is aligned to the start. This is the default alignment.
        </div>
      </div>
      <div scBubble align="end">
        <div scBubbleContent>
          This bubble is aligned to the end. Use this for user messages.
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlignmentBubbleDemo {}

import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleGroup,
  ScFrame,
} from '@semantic-components/ui';

/** scBubbleContent on a button or a link: the whole bubble is clickable, named by its text. */
@Component({
  selector: 'app-links-buttons-bubble-demo',
  imports: [ScFrame, ScBubbleGroup, ScBubble, ScBubbleContent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble variant="muted">
        <div scBubbleContent>How can I help you today?</div>
      </div>
      <div scBubbleGroup>
        <div scBubble variant="tinted" align="end">
          <button scBubbleContent (click)="chosen.set('I forgot my password')">
            I forgot my password
          </button>
        </div>
        <div scBubble variant="tinted" align="end">
          <button
            scBubbleContent
            (click)="chosen.set('I need help with my subscription')"
          >
            I need help with my subscription
          </button>
        </div>
        <div scBubble variant="tinted" align="end">
          <button
            scBubbleContent
            (click)="chosen.set('Something else. Talk to a human.')"
          >
            Something else. Talk to a human.
          </button>
        </div>
      </div>
      <div scBubble variant="outline">
        <a scBubbleContent href="/docs/components/message"
          >Read about messages</a
        >
      </div>
      @if (chosen()) {
        <p scFrame class="bg-muted p-4 text-sm">You chose: {{ chosen() }}</p>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksButtonsBubbleDemo {
  protected readonly chosen = signal('');
}

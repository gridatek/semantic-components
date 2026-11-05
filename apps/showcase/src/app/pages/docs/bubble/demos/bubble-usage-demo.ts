import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleGroup,
  ScBubbleReactions,
} from '@semantic-components/ui';

@Component({
  selector: 'app-bubble-usage-demo',
  imports: [ScBubbleGroup, ScBubble, ScBubbleContent, ScBubbleReactions],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble align="end">
        <div scBubbleContent>Hey there! What&apos;s up?</div>
      </div>
      <div scBubbleGroup>
        <div scBubble variant="muted">
          <div scBubbleContent>Hey! Want to see chat bubbles?</div>
        </div>
        <div scBubble variant="muted">
          <div scBubbleContent>
            I can group messages, switch sides, and keep the whole thread easy
            to scan.
          </div>
          <div scBubbleReactions role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </div>
        </div>
      </div>
      <div scBubble align="end">
        <div scBubbleContent>Sure. Hit me with your best demo.</div>
      </div>
      <div scBubble variant="muted">
        <div scBubbleContent>
          Yes. You are reading a demo that is demoing itself. Very meta.
        </div>
        <div
          scBubbleReactions
          role="img"
          aria-label="Reactions: thumbs up, fire, eyes, and 2 more"
        >
          <span>👍</span>
          <span>🔥</span>
          <span>👀</span>
          <span>+2</span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BubbleUsageDemo {}

import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleReactions,
  ScButton,
  ScFrame,
} from '@semantic-components/ui';

/** side (bottom, top) and align (end, start). They overlap the edge: leave room between rows (gap-12). Emoji: one image, named; buttons: named. */
@Component({
  selector: 'app-reactions-bubble-demo',
  imports: [ScFrame, ScBubble, ScBubbleContent, ScBubbleReactions, ScButton],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-12 py-6">
      <div scBubble variant="muted" alignment="end">
        <div scBubbleContent>
          I don&apos;t need tests, I know my code works.
        </div>
        <div
          scBubbleReactions
          alignment="start"
          role="img"
          aria-label="Reactions: thumbs up, surprised"
        >
          <span>👍</span>
          <span>😮</span>
        </div>
      </div>
      <div scBubble variant="muted">
        <div scBubbleContent>
          Bold. Fine, I&apos;ll add some tests. I&apos;ll let you know when
          they&apos;re done.
        </div>
        <div
          scBubbleReactions
          role="img"
          aria-label="Reactions: eyes, rocket, and 2 more"
        >
          <span>👀</span>
          <span>🚀</span>
          <span>+2</span>
        </div>
      </div>
      <div scBubble alignment="end">
        <div scBubbleContent>
          Tests passed on the first try. All 142 of them. Looking good!
        </div>
        <div
          scBubbleReactions
          side="top"
          alignment="start"
          role="img"
          aria-label="Reactions: party popper, clapping hands"
        >
          <span>🎉</span>
          <span>👏</span>
        </div>
      </div>
      <div scBubble variant="destructive">
        <div scBubbleContent>Are you sure I can run this command?</div>
        <div scBubbleReactions>
          <button scButton variant="ghost" size="xs" (click)="ran.set(true)">
            Yes, run it
          </button>
        </div>
      </div>
      @if (ran()) {
        <p scFrame class="bg-muted p-4 text-sm">Running the command…</p>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ReactionsBubbleDemo {
  protected readonly ran = signal(false);
}

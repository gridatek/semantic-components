import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsBubbleDemo } from './variants-bubble-demo';

@Component({
  selector: 'app-variants-bubble-demo-container',
  imports: [DemoContainer, VariantsBubbleDemo],
  template: `
    <app-demo-container
      title="Variants"
      demoUrl="/demos/bubble/variants-bubble-demo"
      [code]="code"
    >
      <app-variants-bubble-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsBubbleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleReactions,
} from '@semantic-components/ui';

/** variant colours the content: default (primary), secondary, muted, tinted, outline, ghost (unframed, full width), destructive. */
@Component({
  selector: 'app-variants-bubble-demo',
  imports: [ScBubble, ScBubbleContent, ScBubbleReactions],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-12 py-6">
      <div scBubble>
        <div scBubbleContent>This is the default primary bubble.</div>
      </div>
      <div scBubble variant="secondary" alignment="end">
        <div scBubbleContent>This is the secondary variant.</div>
      </div>
      <div scBubble variant="muted">
        <div scBubbleContent>
          This one is muted. It uses a lower emphasis color for the chat bubble.
        </div>
        <div scBubbleReactions role="img" aria-label="Reaction: thumbs up">
          <span>👍</span>
        </div>
      </div>
      <div scBubble variant="tinted" alignment="end">
        <div scBubbleContent>
          This one is tinted. The tint is a softer color derived from the
          primary color.
        </div>
      </div>
      <div scBubble variant="outline">
        <div scBubbleContent>We can also use an outlined variant.</div>
      </div>
      <div scBubble variant="destructive" alignment="end">
        <div scBubbleContent>Or a destructive variant with a reaction.</div>
        <div scBubbleReactions role="img" aria-label="Reaction: fire">
          <span>🔥</span>
        </div>
      </div>
      <div scBubble variant="ghost">
        <div scBubbleContent>
          Ghost bubbles work for assistant text and other content that should
          not be framed. They take the full width of the container.
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VariantsBubbleDemo {}`;
}

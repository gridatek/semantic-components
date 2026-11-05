import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupBubbleDemo } from './group-bubble-demo';

@Component({
  selector: 'app-group-bubble-demo-container',
  imports: [DemoContainer, GroupBubbleDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/bubble/group-bubble-demo"
      [code]="code"
    >
      <app-group-bubble-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupBubbleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleGroup,
  ScBubbleReactions,
} from '@semantic-components/ui';

/** Consecutive bubbles from the same sender, closer together; align goes on each bubble. */
@Component({
  selector: 'app-group-bubble-demo',
  imports: [ScBubbleGroup, ScBubble, ScBubbleContent, ScBubbleReactions],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scBubble variant="muted">
        <div scBubbleContent>Can you tell me what&apos;s the issue?</div>
      </div>
      <div scBubbleGroup>
        <div scBubble align="end">
          <div scBubbleContent>You tell me!</div>
        </div>
        <div scBubble align="end">
          <div scBubbleContent>It worked yesterday. You broke it!</div>
        </div>
        <div scBubble align="end">
          <div scBubbleContent>Find the bug and fix it.</div>
          <div
            scBubbleReactions
            align="start"
            role="img"
            aria-label="Reaction: eyes"
          >
            <span>👀</span>
          </div>
        </div>
      </div>
      <div scBubble variant="muted">
        <div scBubbleContent>
          Want me to diff yesterday&apos;s you against today&apos;s you?
          It&apos;s a bit embarrassing.
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupBubbleDemo {}`;
}

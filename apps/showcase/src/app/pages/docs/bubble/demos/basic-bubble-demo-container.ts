import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicBubbleDemo } from './basic-bubble-demo';

@Component({
  selector: 'app-basic-bubble-demo-container',
  imports: [DemoContainer, BasicBubbleDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/bubble/basic-bubble-demo"
      [code]="code"
    >
      <app-basic-bubble-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicBubbleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScBubbleGroup,
  ScBubbleReactions,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-bubble-demo',
  imports: [ScBubbleGroup, ScBubble, ScBubbleContent, ScBubbleReactions],
  template: \`
    <div scBubbleGroup class="w-full max-w-md">
      <div scBubble variant="muted">
        <div scBubbleContent>Are we still on for tomorrow?</div>
      </div>

      <div scBubble align="end" class="mb-3">
        <div scBubbleContent>Yes — 10am works.</div>
        <div scBubbleReactions side="bottom" align="end">👍</div>
      </div>

      <div scBubble variant="muted">
        <div scBubbleContent>Perfect, see you then.</div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicBubbleDemo {}`;
}

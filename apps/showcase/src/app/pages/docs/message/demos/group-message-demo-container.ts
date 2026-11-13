import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupMessageDemo } from './group-message-demo';

@Component({
  selector: 'app-group-message-demo-container',
  imports: [DemoContainer, GroupMessageDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/message/group-message-demo"
      [code]="code"
    >
      <app-group-message-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupMessageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
  ScMessageGroup,
} from '@semantic-components/ui';

/** Consecutive messages from one sender in a scMessageGroup: an empty avatar on the earlier ones keeps them in line with the last. */
@Component({
  selector: 'app-group-message-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
    ScMessageGroup,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-6 py-6">
      <div scMessageGroup>
        <div scMessage>
          <div scMessageAvatar></div>
          <div scMessageContent>
            <div scBubble variant="muted">
              <div scBubbleContent>I pushed a fix for the install step.</div>
            </div>
          </div>
        </div>
        <div scMessage>
          <div scMessageAvatar></div>
          <div scMessageContent>
            <div scBubble variant="muted">
              <div scBubbleContent>
                It pins the workspace package to the lockfile version.
              </div>
            </div>
          </div>
        </div>
        <div scMessage>
          <div scMessageAvatar>
            <span scAvatar><span scAvatarFallback>OM</span></span>
          </div>
          <div scMessageContent>
            <div scBubble variant="muted">
              <div scBubbleContent>Can you run the build again?</div>
            </div>
          </div>
        </div>
      </div>
      <div scMessage alignment="end">
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>ME</span></span>
        </div>
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>Running it now.</div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupMessageDemo {}`;
}

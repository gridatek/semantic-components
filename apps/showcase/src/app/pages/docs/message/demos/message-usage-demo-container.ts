import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { MessageUsageDemo } from './message-usage-demo';

@Component({
  selector: 'app-message-usage-demo-container',
  imports: [UsageCode, MessageUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-message-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
  ScMessageFooter,
  ScMessageHeader,
} from '@semantic-components/ui';

@Component({
  selector: 'app-message-usage-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
    ScMessageFooter,
    ScMessageHeader,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-6 py-6">
      <div scMessage>
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>OM</span></span>
        </div>
        <div scMessageContent>
          <div scMessageHeader>Olivia</div>
          <div scBubble variant="muted">
            <div scBubbleContent>
              The build failed during dependency installation.
            </div>
          </div>
        </div>
      </div>
      <div scMessage align="end">
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>ME</span></span>
        </div>
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>Can you share the exact error?</div>
          </div>
          <div scMessageFooter>Read 10:42</div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageUsageDemo {}`;
}

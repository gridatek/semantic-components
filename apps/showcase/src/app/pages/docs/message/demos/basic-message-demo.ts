import { Component, ViewEncapsulation } from '@angular/core';
import { ScAvatar, ScAvatarFallback } from '@semantic-components/ui';
import {
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
  ScMessageFooter,
  ScMessageGroup,
  ScMessageHeader,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-message-demo',
  imports: [
    ScMessageGroup,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
    ScMessageHeader,
    ScMessageFooter,
    ScBubble,
    ScBubbleContent,
    ScAvatar,
    ScAvatarFallback,
  ],
  template: `
    <div scMessageGroup class="w-full max-w-lg">
      <div scMessage>
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>AR</span></span>
        </div>
        <div scMessageContent>
          <div scMessageHeader>Ada</div>
          <div scBubble variant="muted">
            <div scBubbleContent>The build is green again.</div>
          </div>
        </div>
      </div>

      <div scMessage align="end">
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>ME</span></span>
        </div>
        <div scMessageContent>
          <div scBubble align="end">
            <div scBubbleContent>Nice — shipping it now.</div>
          </div>
          <div scMessageFooter>Sent 10:42</div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicMessageDemo {}

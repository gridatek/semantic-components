import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBubble,
  ScBubbleContent,
  ScBubbleGroup,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
} from '@semantic-components/ui';

/** scMessageAvatar beside the content, at its bottom; align="end" puts it at the end. */
@Component({
  selector: 'app-avatar-message-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScBubble,
    ScBubbleContent,
    ScBubbleGroup,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6 py-6">
      <div scMessage>
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>OM</span></span>
        </div>
        <div scMessageContent>
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
        </div>
      </div>
      <div scMessage>
        <div scMessageAvatar>
          <span scAvatar><span scAvatarFallback>OM</span></span>
        </div>
        <div scMessageContent>
          <div scBubbleGroup>
            <div scBubble variant="muted">
              <div scBubbleContent>Here&apos;s the error from the logs</div>
            </div>
            <div scBubble variant="muted">
              <div scBubbleContent>
                Something went wrong with the build. The libraries are not
                installed correctly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarMessageDemo {}

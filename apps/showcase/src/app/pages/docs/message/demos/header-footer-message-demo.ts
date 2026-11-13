import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageContent,
  ScMessageFooter,
  ScMessageHeader,
} from '@semantic-components/ui';

/** scMessageHeader for the sender, scMessageFooter for a status — at the end on your own messages. */
@Component({
  selector: 'app-header-footer-message-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageContent,
    ScMessageFooter,
    ScMessageHeader,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMessage>
        <div scMessageContent>
          <div scMessageHeader>Olivia</div>
          <div scBubble variant="muted">
            <div scBubbleContent>I already checked the logs.</div>
          </div>
        </div>
      </div>
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>
              Send the report to the team. Ping Sam if you need help.
            </div>
          </div>
          <div scMessageFooter>
            <div>Read <span class="font-normal">Yesterday</span></div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderFooterMessageDemo {}

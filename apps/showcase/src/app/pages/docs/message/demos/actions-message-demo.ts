import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScMessage,
  ScMessageContent,
  ScMessageFooter,
} from '@semantic-components/ui';
import {
  SiCopyIcon,
  SiRefreshCcwIcon,
  SiThumbsDownIcon,
  SiThumbsUpIcon,
} from '@semantic-icons/lucide-icons';

/** The message’s actions in its footer: your buttons, each named (sr-only text). */
@Component({
  selector: 'app-actions-message-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScMessage,
    ScMessageContent,
    ScMessageFooter,
    SiCopyIcon,
    SiThumbsUpIcon,
    SiThumbsDownIcon,
    SiRefreshCcwIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMessage>
        <div scMessageContent>
          <div scBubble variant="muted">
            <div scBubbleContent>
              The install failure is coming from the workspace package.
            </div>
          </div>
          <div scMessageFooter>
            <button scButton variant="ghost" size="icon">
              <svg siCopyIcon></svg>
              <span class="sr-only">Copy</span>
            </button>
            <button scButton variant="ghost" size="icon">
              <svg siThumbsUpIcon></svg>
              <span class="sr-only">Like</span>
            </button>
            <button scButton variant="ghost" size="icon">
              <svg siThumbsDownIcon></svg>
              <span class="sr-only">Dislike</span>
            </button>
          </div>
        </div>
      </div>
      <div scMessage align="end">
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>Okay, drop me a link. Taking a look...</div>
          </div>
          <div scMessageFooter class="gap-2">
            <span class="text-destructive font-normal">Failed to send</span>
            <button scButton variant="ghost" size="icon-xs">
              <svg siRefreshCcwIcon></svg>
              <span class="sr-only">Retry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ActionsMessageDemo {}

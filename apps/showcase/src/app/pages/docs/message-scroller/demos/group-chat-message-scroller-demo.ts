import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScFrame,
  ScMarker,
  ScMarkerContent,
  ScMessage,
  ScMessageContent,
  ScMessageHeader,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
} from '@semantic-components/ui';
import { SiArrowDownIcon } from '@semantic-icons/lucide-icons';

/** The turn is whatever starts it: here a marker, “Marcus joined the chat”, is the anchor. */
@Component({
  selector: 'app-group-chat-message-scroller-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScFrame,
    ScMarker,
    ScMarkerContent,
    ScMessage,
    ScMessageContent,
    ScMessageHeader,
    ScMessageScroller,
    ScMessageScrollerButton,
    ScMessageScrollerContent,
    ScMessageScrollerItem,
    ScMessageScrollerViewport,
    SiArrowDownIcon,
  ],
  template: `
    <div class="flex flex-col gap-3">
      <div scFrame class="h-80 overflow-hidden">
        <div scMessageScroller>
          <div scMessageScrollerViewport aria-label="Group chat">
            <div scMessageScrollerContent class="p-4">
              @for (message of messages(); track message.id) {
                @if (message.kind === 'marker') {
                  <div
                    scMessageScrollerItem
                    [messageId]="message.id"
                    scrollAnchor
                  >
                    <div scMarker variant="separator">
                      <span scMarkerContent>{{ message.text }}</span>
                    </div>
                  </div>
                } @else {
                  <div scMessageScrollerItem [messageId]="message.id">
                    <div
                      scMessage
                      [alignment]="message.author === 'You' ? 'end' : 'start'"
                    >
                      <div scMessageContent>
                        @if (message.author !== 'You') {
                          <div scMessageHeader>{{ message.author }}</div>
                        }
                        <div
                          scBubble
                          [variant]="
                            message.author === 'You' ? 'default' : 'muted'
                          "
                        >
                          <div scBubbleContent>{{ message.text }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              }
            </div>
          </div>
          <button scMessageScrollerButton>
            <svg siArrowDownIcon></svg>
            <span class="sr-only">Scroll to the latest message</span>
          </button>
        </div>
      </div>
      <button scButton class="self-end" [disabled]="joined()" (click)="join()">
        Marcus joins
      </button>
    </div>
  `,
  host: { class: 'mx-auto block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupChatMessageScrollerDemo {
  readonly messages = signal<
    { id: string; kind: 'message' | 'marker'; author?: string; text: string }[]
  >([
    {
      id: 'm1',
      kind: 'message',
      author: 'Olivia',
      text: 'The release is on Friday.',
    },
    {
      id: 'm2',
      kind: 'message',
      author: 'You',
      text: 'Is the changelog ready?',
    },
    {
      id: 'm3',
      kind: 'message',
      author: 'Olivia',
      text: 'Almost: two entries left.',
    },
    {
      id: 'm4',
      kind: 'message',
      author: 'Sam',
      text: 'I can write them today.',
    },
    { id: 'm5', kind: 'message', author: 'You', text: 'Thanks, Sam.' },
    {
      id: 'm6',
      kind: 'message',
      author: 'Olivia',
      text: 'Then we are on track.',
    },
  ]);
  readonly joined = signal(false);

  join(): void {
    this.joined.set(true);
    this.messages.update((messages) => [
      ...messages,
      { id: 'joined', kind: 'marker', text: 'Marcus joined the chat' },
      {
        id: 'm7',
        kind: 'message',
        author: 'Marcus',
        text: 'Hi all — what did I miss?',
      },
    ]);
  }
}

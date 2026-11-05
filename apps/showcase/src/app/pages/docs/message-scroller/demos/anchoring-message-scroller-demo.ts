import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScFrame,
  ScMessage,
  ScMessageContent,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
} from '@semantic-components/ui';
import { SiArrowDownIcon } from '@semantic-icons/lucide-icons';

/** scrollAnchor marks the row a new turn starts at: sent, it moves near the top. Any row can be the anchor — here your question, or the reply. */
@Component({
  selector: 'app-anchoring-message-scroller-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScFrame,
    ScMessage,
    ScMessageContent,
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
          <div scMessageScrollerViewport aria-label="Anchored conversation">
            <div scMessageScrollerContent class="p-4">
              @for (message of messages(); track message.id) {
                <div
                  scMessageScrollerItem
                  [messageId]="message.id"
                  [scrollAnchor]="
                    anchorReply()
                      ? message.role === 'assistant'
                      : message.role === 'user'
                  "
                >
                  <div
                    scMessage
                    [align]="message.role === 'user' ? 'end' : 'start'"
                  >
                    <div scMessageContent>
                      <div
                        scBubble
                        [align]="message.role === 'user' ? 'end' : 'start'"
                        [variant]="
                          message.role === 'user' ? 'default' : 'muted'
                        "
                      >
                        <div scBubbleContent>{{ message.text }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <button scMessageScrollerButton>
            <svg siArrowDownIcon></svg>
            <span class="sr-only">Scroll to the latest message</span>
          </button>
        </div>
      </div>
      <div class="flex items-center justify-end gap-2">
        <button
          scButton
          variant="outline"
          [attr.aria-pressed]="anchorReply()"
          (click)="anchorReply.set(!anchorReply())"
        >
          Anchor the reply
        </button>
        <button scButton (click)="send()">Send</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class AnchoringMessageScrollerDemo {
  readonly messages = signal([
    { id: 'q1', role: 'user', text: 'What does a message scroller do?' },
    {
      id: 'a1',
      role: 'assistant',
      text: 'It keeps a conversation where you want it: at the end when it opens, on your question while the answer arrives.',
    },
    { id: 'q2', role: 'user', text: 'And when I scroll up?' },
    {
      id: 'a2',
      role: 'assistant',
      text: 'Then it stops following. New messages arrive without moving you, and a button appears to jump back.',
    },
    { id: 'q3', role: 'user', text: 'Can a keyboard scroll it?' },
    {
      id: 'a3',
      role: 'assistant',
      text: 'Yes: the conversation is a region you can tab to, and the arrow keys, Page Up, Page Down, Home and End scroll it.',
    },
  ]);
  readonly anchorReply = signal(false);
  private sent = 0;

  send(): void {
    const n = ++this.sent;
    this.messages.update((messages) => [
      ...messages,
      { id: `ask-${n}`, role: 'user', text: 'Tell me more.' },
      {
        id: `reply-${n}`,
        role: 'assistant',
        text: 'Here is more. The new turn starts near the top of the conversation, the reply below it, a slice of what came before still in view.',
      },
    ]);
  }
}

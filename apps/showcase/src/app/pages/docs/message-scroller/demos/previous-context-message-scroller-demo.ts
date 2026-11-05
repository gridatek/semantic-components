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

/** scrollPreviousItemPeek keeps a slice of the previous row above a new turn, so it still reads as one thread. */
@Component({
  selector: 'app-previous-context-message-scroller-demo',
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
        <div scMessageScroller [scrollPreviousItemPeek]="peek()">
          <div scMessageScrollerViewport aria-label="Conversation with context">
            <div scMessageScrollerContent class="p-4">
              @for (message of messages(); track message.id) {
                <div
                  scMessageScrollerItem
                  [messageId]="message.id"
                  [scrollAnchor]="message.role === 'user'"
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
      <div class="flex flex-wrap items-center justify-end gap-2">
        <span class="text-muted-foreground text-sm">Peek</span>
        @for (value of peeks; track value) {
          <button
            scButton
            variant="outline"
            size="sm"
            [attr.aria-pressed]="peek() === value"
            (click)="peek.set(value)"
          >
            {{ value }}px
          </button>
        }
        <button scButton (click)="send()">Send</button>
      </div>
    </div>
  `,
  host: { class: 'mx-auto block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviousContextMessageScrollerDemo {
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
  protected readonly peeks = [0, 64, 160];
  readonly peek = signal(64);
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

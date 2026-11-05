import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
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

/** visibility(): the turn being read (currentAnchorId) and the rows on screen — here a jump menu showing where you are. */
@Component({
  selector: 'app-visibility-message-scroller-demo',
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
      <nav aria-label="Questions" class="flex flex-wrap gap-2">
        @for (question of questions(); track question.id) {
          <button
            scButton
            variant="outline"
            size="sm"
            [attr.aria-current]="
              scroller.visibility().currentAnchorId === question.id
                ? 'true'
                : null
            "
            class="aria-[current=true]:bg-muted"
            (click)="scroller.scrollToMessage(question.id)"
          >
            {{ question.text }}
          </button>
        }
      </nav>
      <div scFrame class="h-80 overflow-hidden">
        <div scMessageScroller #scroller="scMessageScroller">
          <div
            scMessageScrollerViewport
            aria-label="Conversation to jump through"
          >
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
    </div>
  `,
  host: { class: 'mx-auto block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class VisibilityMessageScrollerDemo {
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
  protected readonly questions = computed(() =>
    this.messages().filter((message) => message.role === 'user'),
  );
}

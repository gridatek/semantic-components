import {
  Component,
  ViewEncapsulation,
  computed,
  viewChild,
} from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScMessage,
  ScMessageContent,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
} from '@semantic-components/ui';
import { SiArrowDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-commands-message-scroller-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
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
      <div class="flex flex-wrap gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="scroller.scrollToStart({ behavior: 'smooth' })"
        >
          First
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="scroller.scrollToMessage('q3', { behavior: 'smooth' })"
        >
          Question 3
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="scroller.scrollToEnd({ behavior: 'smooth' })"
        >
          Latest
        </button>
      </div>
      <div class="bg-background h-80 overflow-hidden rounded-xl border">
        <div scMessageScroller #scroller="scMessageScroller">
          <div
            scMessageScrollerViewport
            aria-label="Conversation with commands"
          >
            <div scMessageScrollerContent class="p-4">
              @for (message of messages; track message.id) {
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
      <p class="text-muted-foreground text-sm" aria-live="polite">
        Reading: {{ reading() }}
      </p>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class CommandsMessageScrollerDemo {
  private readonly scroller = viewChild.required<ScMessageScroller>('scroller');
  readonly messages = [
    { id: 'q1', role: 'user', text: 'What does a message scroller do?' },
    {
      id: 'a1',
      role: 'assistant',
      text: 'It keeps a conversation where you want it: at the end when it opens, on your question while the answer arrives, and on the message you are reading when older ones load.',
    },
    { id: 'q2', role: 'user', text: 'And when I scroll up?' },
    {
      id: 'a2',
      role: 'assistant',
      text: 'Then it stops following. New messages arrive without moving you, and a button appears to jump back to the latest one.',
    },
    { id: 'q3', role: 'user', text: 'Can a keyboard scroll it?' },
    {
      id: 'a3',
      role: 'assistant',
      text: 'Yes. The conversation is a region you can tab to, and the arrow keys, Page Up, Page Down, Home and End scroll it.',
    },
    { id: 'q4', role: 'user', text: 'Do screen readers hear new messages?' },
    {
      id: 'a4',
      role: 'assistant',
      text: 'They do: the messages are a log, so each new one is announced once it is added.',
    },
  ];

  /** The question whose turn is on screen. */
  protected readonly reading = computed(() => {
    const id = this.scroller().visibility().currentAnchorId;
    return this.messages.find((message) => message.id === id)?.text ?? '—';
  });
}

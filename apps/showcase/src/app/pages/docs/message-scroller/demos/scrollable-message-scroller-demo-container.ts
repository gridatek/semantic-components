import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScrollableMessageScrollerDemo } from './scrollable-message-scroller-demo';

@Component({
  selector: 'app-scrollable-message-scroller-demo-container',
  imports: [DemoContainer, ScrollableMessageScrollerDemo],
  template: `
    <app-demo-container
      title="Reading scroll state"
      demoUrl="/demos/message-scroller/scrollable-message-scroller-demo"
      [code]="code"
    >
      <app-scrollable-message-scroller-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableMessageScrollerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
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

/** scrollable(): which edges the conversation can still scroll toward — here, said in words. */
@Component({
  selector: 'app-scrollable-message-scroller-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
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
  template: \`
    <div class="flex flex-col gap-3">
      <div scFrame class="h-80 overflow-hidden">
        <div scMessageScroller #scroller="scMessageScroller">
          <div
            scMessageScrollerViewport
            aria-label="Conversation with its scroll state"
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
      <p class="text-muted-foreground text-sm" aria-live="polite">
        {{ scroller.scrollable().start ? 'More above' : 'At the start' }} ·
        {{ scroller.scrollable().end ? 'More below' : 'At the end' }}
      </p>
    </div>
  \`,
  host: { class: 'mx-auto block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class ScrollableMessageScrollerDemo {
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
}`;
}

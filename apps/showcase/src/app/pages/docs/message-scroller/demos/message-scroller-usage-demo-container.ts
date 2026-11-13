import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { MessageScrollerUsageDemo } from './message-scroller-usage-demo';

@Component({
  selector: 'app-message-scroller-usage-demo-container',
  imports: [UsageCode, MessageScrollerUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-message-scroller-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageScrollerUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-message-scroller-usage-demo',
  imports: [
    ScFrame,
    ScBubble,
    ScBubbleContent,
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
    <div scFrame class="h-80 overflow-hidden">
      <div scMessageScroller>
        <div scMessageScrollerViewport aria-label="Conversation">
          <div scMessageScrollerContent class="p-4">
            @for (message of messages; track message.id) {
              <div
                scMessageScrollerItem
                [messageId]="message.id"
                [scrollAnchor]="message.role === 'user'"
              >
                <div
                  scMessage
                  [alignment]="message.role === 'user' ? 'end' : 'start'"
                >
                  <div scMessageContent>
                    <div
                      scBubble
                      [alignment]="message.role === 'user' ? 'end' : 'start'"
                      [variant]="message.role === 'user' ? 'default' : 'muted'"
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
  \`,
  host: { class: 'mx-auto block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class MessageScrollerUsageDemo {
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
}`;
}

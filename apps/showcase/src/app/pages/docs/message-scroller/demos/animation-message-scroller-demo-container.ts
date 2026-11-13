import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AnimationMessageScrollerDemo } from './animation-message-scroller-demo';

@Component({
  selector: 'app-animation-message-scroller-demo-container',
  imports: [DemoContainer, AnimationMessageScrollerDemo],
  template: `
    <app-demo-container
      title="Animating new messages"
      demoUrl="/demos/message-scroller/animation-message-scroller-demo"
      [code]="code"
    >
      <app-animation-message-scroller-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AnimationMessageScrollerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/** A new row rises in (a starting: transition of opacity and translate — never height); none when motion is reduced. */
@Component({
  selector: 'app-animation-message-scroller-demo',
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
  template: \`
    <div class="flex flex-col gap-3">
      <div scFrame class="h-80 overflow-hidden">
        <div scMessageScroller>
          <div scMessageScrollerViewport aria-label="Animated conversation">
            <div scMessageScrollerContent class="p-4">
              @for (message of messages(); track message.id) {
                <div
                  scMessageScrollerItem
                  [messageId]="message.id"
                  [scrollAnchor]="message.role === 'user'"
                  class="transition-[opacity,translate] duration-300 motion-reduce:transition-none starting:translate-y-4 starting:opacity-0"
                >
                  <div
                    scMessage
                    [alignment]="message.role === 'user' ? 'end' : 'start'"
                  >
                    <div scMessageContent>
                      <div
                        scBubble
                        [alignment]="message.role === 'user' ? 'end' : 'start'"
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
      <button scButton class="self-end" (click)="send()">Send</button>
    </div>
  \`,
  host: { class: 'mx-auto block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class AnimationMessageScrollerDemo {
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
  private sent = 0;

  send(): void {
    const n = ++this.sent;
    this.messages.update((messages) => [
      ...messages,
      { id: \`ask-\${n}\`, role: 'user', text: 'Tell me more.' },
      {
        id: \`reply-\${n}\`,
        role: 'assistant',
        text: 'Here is more. The new turn starts near the top of the conversation, the reply below it, a slice of what came before still in view.',
      },
    ]);
  }
}`;
}

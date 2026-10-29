import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StreamingMessageScrollerDemo } from './streaming-message-scroller-demo';

@Component({
  selector: 'app-streaming-message-scroller-demo-container',
  imports: [DemoContainer, StreamingMessageScrollerDemo],
  template: `
    <app-demo-container
      title="Streaming"
      demoUrl="/demos/message-scroller/streaming-message-scroller-demo"
      [code]="code"
    >
      <app-streaming-message-scroller-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StreamingMessageScrollerDemoContainer {
  readonly code = `import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
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
  selector: 'app-streaming-message-scroller-demo',
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
  template: \`
    <div class="flex flex-col gap-3">
      <div class="bg-background h-80 overflow-hidden rounded-xl border">
        <div scMessageScroller autoScroll>
          <div scMessageScrollerViewport aria-label="Streaming conversation">
            <div
              scMessageScrollerContent
              class="p-4"
              [attr.aria-busy]="streaming()"
            >
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
      <button
        scButton
        class="self-end"
        [disabled]="streaming()"
        (click)="ask()"
      >
        Ask again
      </button>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class StreamingMessageScrollerDemo {
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setInterval> | undefined;
  private asked = 0;

  readonly messages = signal([
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
  ]);
  readonly streaming = signal(false);

  constructor() {
    this.destroyRef.onDestroy(() => clearInterval(this.timer));
  }

  /** Your question, near the top; the reply word by word below it. */
  ask(): void {
    const n = ++this.asked;
    const words = (
      'Your question stays near the top while this reply arrives below it, a word at a time. ' +
      'Once the reply fills the conversation, it follows the end — until you scroll away. '
    )
      .repeat(3)
      .trim()
      .split(' ');
    this.messages.update((messages) => [
      ...messages,
      { id: \`ask-\${n}\`, role: 'user', text: 'Show me streaming.' },
      { id: \`reply-\${n}\`, role: 'assistant', text: '' },
    ]);
    this.streaming.set(true);
    let next = 0;
    this.timer = setInterval(() => {
      const word = words[next++];
      this.messages.update((messages) =>
        messages.map((message) =>
          message.id === \`reply-\${n}\`
            ? { ...message, text: (message.text + ' ' + word).trim() }
            : message,
        ),
      );
      if (next === words.length) {
        clearInterval(this.timer);
        this.streaming.set(false);
      }
    }, 60);
  }
}`;
}

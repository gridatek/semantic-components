import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChatInfiniteScrollDemo } from './chat-infinite-scroll-demo';

@Component({
  selector: 'app-chat-infinite-scroll-demo-container',
  imports: [DemoContainer, ChatInfiniteScrollDemo],
  template: `
    <app-demo-container
      title="Chat"
      [code]="code"
      demoUrl="/demos/infinite-scroll/chat-infinite-scroll-demo"
    >
      <app-chat-infinite-scroll-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatInfiniteScrollDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScInfiniteScroll,
  ScInfiniteScrollStatus,
} from '@semantic-components/ui-lab';

interface Message {
  readonly id: number;
  readonly text: string;
  readonly mine: boolean;
}

/** direction="start": it opens at the end, and older messages come in above as the reader scrolls up — the one they were reading stays where it was. */
@Component({
  selector: 'app-chat-infinite-scroll-demo',
  imports: [ScInfiniteScroll, ScInfiniteScrollStatus],
  template: \`
    <div
      class="h-80 w-full max-w-md overflow-y-auto rounded-lg border"
      tabindex="0"
      role="log"
      aria-label="Messages"
    >
      <p scInfiniteScrollStatus class="pt-2">
        @if (loading()) {
          Loading older messages…
        } @else if (done()) {
          The start of the conversation.
        }
      </p>
      <ol
        scInfiniteScroll
        direction="start"
        class="grid gap-2 p-3"
        [loading]="loading()"
        [done]="done()"
        (more)="load()"
      >
        @for (message of messages(); track message.id) {
          <li
            class="max-w-[80%] rounded-lg px-3 py-2 text-sm"
            [class]="
              message.mine
                ? 'bg-primary text-primary-foreground justify-self-end'
                : 'bg-muted'
            "
          >
            {{ message.text }}
          </li>
        }
      </ol>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatInfiniteScrollDemo {
  /** The newest 15, oldest first. */
  readonly messages = signal<Message[]>(this.page(60, 15));
  readonly loading = signal(false);
  readonly done = signal(false);

  async load(): Promise<void> {
    this.loading.set(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const oldest = this.messages()[0].id;
    this.messages.update((messages) => [
      ...this.page(oldest - 1, 15),
      ...messages,
    ]);
    this.done.set(this.messages()[0].id === 1);
    this.loading.set(false);
  }

  /** Messages up to \`last\`, \`count\` of them (or down to the first). */
  private page(last: number, count: number): Message[] {
    const first = Math.max(1, last - count + 1);
    return Array.from({ length: last - first + 1 }, (_, i) => ({
      id: first + i,
      text: 'Message ' + (first + i),
      mine: (first + i) % 3 === 0,
    }));
  }
}`;
}

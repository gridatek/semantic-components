import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChatInfiniteScrollNextDemo } from './chat-infinite-scroll-next-demo';

@Component({
  selector: 'app-chat-infinite-scroll-next-demo-container',
  imports: [DemoContainer, ChatInfiniteScrollNextDemo],
  template: `
    <app-demo-container
      title="Chat"
      [code]="code"
      demoUrl="/demos/infinite-scroll-next/chat-infinite-scroll-next-demo"
    >
      <app-chat-infinite-scroll-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatInfiniteScrollNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScInfiniteScrollNext } from '@semantic-components/ui';

interface Message {
  readonly id: number;
  readonly text: string;
  readonly mine: boolean;
}

/** direction="start": it opens at the end, and older messages come in above as the reader scrolls up — the one they were reading stays where it was. */
@Component({
  selector: 'app-chat-infinite-scroll-next-demo',
  imports: [ScFrame, ScInfiniteScrollNext],
  template: \`
    <div
      scFrame
      class="h-80 w-full max-w-md overflow-y-auto"
      tabindex="0"
      role="log"
      aria-label="Messages"
    >
      <p
        role="status"
        class="text-muted-foreground flex min-h-6 items-center justify-center gap-2 pt-2 text-sm [&>svg]:size-4 [&>svg]:shrink-0"
      >
        @if (loading()) {
          Loading older messages…
        } @else if (done()) {
          The start of the conversation.
        }
      </p>
      <ol
        scInfiniteScrollNext
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
export class ChatInfiniteScrollNextDemo {
  /** The newest 15, oldest first. */
  private readonly messages = signal<Message[]>(this.page(60, 15));
  private readonly loading = signal(false);
  private readonly done = signal(false);

  private async load(): Promise<void> {
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

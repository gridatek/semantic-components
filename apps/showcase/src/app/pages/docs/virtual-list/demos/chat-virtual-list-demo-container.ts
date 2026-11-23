import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ChatVirtualListDemo } from './chat-virtual-list-demo';

@Component({
  selector: 'app-chat-virtual-list-demo-container',
  imports: [DemoContainer, ChatVirtualListDemo],
  template: `
    <app-demo-container
      title="Chat"
      [code]="code"
      demoUrl="/demos/virtual-list/chat-virtual-list-demo"
    >
      <app-chat-virtual-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatVirtualListDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton, ScFrame, ScInput } from '@semantic-components/ui';
import {
  ScVirtualList,
  ScVirtualListRow,
} from '@semantic-components/ui/virtual-list';

/** anchor="end", a chat: it opens at the end; older messages come in above and the one you read stays put; at the end, new ones are followed — read back, they are not. */
@Component({
  selector: 'app-chat-virtual-list-demo',
  imports: [ScButton, ScFrame, ScInput, ScVirtualList, ScVirtualListRow],
  template: \`
    <div class="grid w-full max-w-md gap-2">
      <button
        scButton
        variant="outline"
        size="sm"
        class="justify-self-center"
        (click)="older()"
      >
        Load older
      </button>
      <ol
        scVirtualList
        #list="scVirtualList"
        anchor="end"
        tabindex="0"
        [count]="messages().length"
        [estimate]="56"
        [key]="keyOf"
        [gap]="8"
        aria-label="Messages"
        scFrame
        class="h-80 overflow-y-auto"
      >
        @for (row of list.rows(); track row.key) {
          <li [scVirtualListRow]="row" class="px-3">
            <div scFrame size="sm" class="bg-muted p-2 text-sm">
              <span class="font-medium">{{ messages()[row.index].from }}:</span>
              {{ messages()[row.index].text }}
            </div>
          </li>
        }
      </ol>
      <div class="flex gap-2">
        <input
          scInput
          aria-label="Message"
          placeholder="Say something"
          [value]="draft()"
          (input)="onDraft($event)"
          (keydown.enter)="send()"
        />
        <button scButton (click)="send()">Send</button>
      </div>
      <p class="text-muted-foreground text-sm" data-testid="where">
        {{ list.isAtEnd() ? 'At the end' : 'Reading back' }} ·
        {{ messages().length }} messages
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatVirtualListDemo {
  private readonly names = [
    'Ada',
    'Grace',
    'Alan',
    'Katherine',
    'Margaret',
    'Hedy',
    'Linus',
    'Barbara',
    'Dennis',
    'Radia',
  ];
  private oldest = 1000;
  private newest = 1050;
  private readonly messages = signal(
    Array.from({ length: 50 }, (_, i) => this.message(1000 + i)),
  );
  private readonly draft = signal('');
  private readonly keyOf = (index: number) => this.messages()[index].id;

  private message(n: number) {
    return { id: 'm' + n, from: this.names[n % 10], text: 'Message ' + n };
  }

  /** Twenty older messages, in above. */
  private older(): void {
    const from = this.oldest - 20;
    this.oldest = from;
    this.messages.update((list) => [
      ...Array.from({ length: 20 }, (_, i) => this.message(from + i)),
      ...list,
    ]);
  }

  private onDraft(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  private send(): void {
    const text = this.draft().trim();
    if (!text) return;
    const id = 'm' + this.newest++;
    this.messages.update((list) => [...list, { id, from: 'You', text }]);
    this.draft.set('');
  }
}`;
}

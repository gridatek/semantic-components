import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { ChatUsageDemoContainer } from './demos/chat-usage-demo-container';
import { RtlChatDemoContainer } from './demos/rtl-chat-demo-container';

/** shadcn's Chat pattern: the thread, the Message Scroller keeping your place. */
@Component({
  selector: 'app-chat-page',
  imports: [
    Anatomy,
    ChatUsageDemoContainer,
    RouterLink,
    RtlChatDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Chat</h1>
        <p class="text-muted-foreground">
          The thread of a conversation with the agent. The Message Scroller
          keeps your place while the reply streams.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-chat-usage-demo-container />
        <p class="text-muted-foreground">
          Each turn is a
          <a scLink routerLink="/docs/components/message">Message</a> inside a
          <a scLink routerLink="/docs/components/message-scroller"
            >Message Scroller</a
          >. The person&apos;s message is the scroll anchor, so a new question
          settles near the top and the reply streams in under it. The field is a
          <a scLink routerLink="/docs/ai-elements/prompt-input">Prompt Input</a
          >: an
          <a scLink routerLink="/docs/components/input-group">Input Group</a>
          around a textarea bound with Signal Forms.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scrollAnchor</code
          >
          goes on the person&apos;s turn;
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">autoScroll</code>
          follows the reply while the person stays at the live edge.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Scripted turns</h2>
        <p class="text-muted-foreground">
          The demo has no model: each agent turn is scripted — reasoning, a
          command and a reply — and played on timers. The field holds the next
          scripted question; anything else gets a fallback reply, and Reset
          starts over. The reply is built from blocks (paragraphs, list items,
          code), streamed a word at a time: the library has no Markdown
          renderer.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-chat-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the
          <a scLink routerLink="/docs/components/message-scroller"
            >Message Scroller</a
          >, the <a scLink routerLink="/docs/components/message">Message</a>,
          the <a scLink routerLink="/docs/components/bubble">Bubble</a> and the
          <a scLink routerLink="/docs/components/input-group">Input Group</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ChatPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMessageScroller, ScMessageScrollerViewport, ScMessageScrollerContent,',
      '  ScMessageScrollerItem, ScMessageScrollerButton,',
      '  ScMessage, ScMessageContent, ScBubble, ScBubbleContent,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMessageScroller autoScroll>',
      '  <div scMessageScrollerViewport aria-label="Conversation">',
      '    <div scMessageScrollerContent>',
      '      <div scMessageScrollerItem [messageId]="id" scrollAnchor>',
      '        <div scMessage alignment="end">',
      '          <div scMessageContent>',
      '            <div scBubble alignment="end" variant="muted">',
      '              <div scBubbleContent>{{ text }}</div>',
      '            </div>',
      '          </div>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <button scMessageScrollerButton>…</button>',
      '</div>',
    ].join('\n'),
  };
}

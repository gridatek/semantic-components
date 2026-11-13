import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { MessagePatternUsageDemoContainer } from './demos/message-pattern-usage-demo-container';
import { RtlMessagePatternDemoContainer } from './demos/rtl-message-pattern-demo-container';

/** shadcn's Message pattern: one turn, and the actions under it. */
@Component({
  selector: 'app-message-page',
  imports: [
    Anatomy,
    MessagePatternUsageDemoContainer,
    RouterLink,
    RtlMessagePatternDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Message</h1>
        <p class="text-muted-foreground">
          One turn: the person&apos;s message, and the agent&apos;s reply with
          its actions.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-message-pattern-usage-demo-container />
        <p class="text-muted-foreground">
          The person&apos;s text is a
          <a scLink routerLink="/docs/components/bubble">Bubble</a> on a
          <a scLink routerLink="/docs/components/message">Message</a> aligned to
          the end; the agent&apos;s reply is text on a Message, with actions
          under it. A thread of these turns is
          <a scLink routerLink="/docs/ai-elements/chat">Chat</a>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Actions</h2>
        <p class="text-muted-foreground">
          Actions go in the message&apos;s footer, which follows its alignment:
          on the person&apos;s turn they sit at the end. Ghost icon buttons,
          each named by hidden text and shown in a tooltip.
        </p>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            <strong>Copy</strong> writes the reply to the clipboard and turns to
            a check for two seconds; its name follows: Copy, then Copied.
          </li>
          <li>
            <strong>Good response</strong> and <strong>Bad response</strong> are
            toggles: a fixed name, the state in
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >aria-pressed</code
            >.
          </li>
          <li><strong>Retry</strong> runs the turn again.</li>
          <li>
            <strong>Edit</strong>, on the person&apos;s turn, puts the text back
            in the field.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Markdown</h2>
        <p class="text-muted-foreground">
          The reply streams as markdown. The library has no Markdown renderer
          yet: here the reply is written out, its code in a
          <a scLink routerLink="/docs/components/code-block">Code Block</a>.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-message-pattern-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the <a scLink routerLink="/docs/components/message">Message</a>,
          the <a scLink routerLink="/docs/components/bubble">Bubble</a> and the
          <a scLink routerLink="/docs/components/tooltip">Tooltip</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MessagePage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMessage, ScMessageContent, ScMessageFooter,',
      '  ScBubble, ScBubbleContent, ScButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMessage alignment="end">',
      '  <div scMessageContent>',
      '    <div scBubble alignment="end" variant="muted">',
      '      <div scBubbleContent>How do I add a settings dialog?</div>',
      '    </div>',
      '  </div>',
      '</div>',
      '<div scMessage>',
      '  <div scMessageContent class="gap-2">',
      '    <p>Install Dialog, then open it from the gear button.</p>',
      '    <div scMessageFooter>',
      '      <button scButton variant="ghost" size="icon-sm">',
      '        <svg siCopyIcon></svg>',
      '        <span class="sr-only">Copy</span>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}

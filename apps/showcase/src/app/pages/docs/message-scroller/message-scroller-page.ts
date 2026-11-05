import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AnchoringMessageScrollerDemoContainer } from './demos/anchoring-message-scroller-demo-container';
import { AnimationMessageScrollerDemoContainer } from './demos/animation-message-scroller-demo-container';
import { CommandsMessageScrollerDemoContainer } from './demos/commands-message-scroller-demo-container';
import { GroupChatMessageScrollerDemoContainer } from './demos/group-chat-message-scroller-demo-container';
import { HistoryMessageScrollerDemoContainer } from './demos/history-message-scroller-demo-container';
import { MessageScrollerUsageDemoContainer } from './demos/message-scroller-usage-demo-container';
import { PositionMessageScrollerDemoContainer } from './demos/position-message-scroller-demo-container';
import { PreviousContextMessageScrollerDemoContainer } from './demos/previous-context-message-scroller-demo-container';
import { RtlMessageScrollerDemoContainer } from './demos/rtl-message-scroller-demo-container';
import { ScrollableMessageScrollerDemoContainer } from './demos/scrollable-message-scroller-demo-container';
import { StreamingMessageScrollerDemoContainer } from './demos/streaming-message-scroller-demo-container';
import { VisibilityMessageScrollerDemoContainer } from './demos/visibility-message-scroller-demo-container';

@Component({
  selector: 'app-message-scroller-page',
  imports: [
    Anatomy,
    MessageScrollerUsageDemoContainer,
    AnchoringMessageScrollerDemoContainer,
    GroupChatMessageScrollerDemoContainer,
    PreviousContextMessageScrollerDemoContainer,
    StreamingMessageScrollerDemoContainer,
    PositionMessageScrollerDemoContainer,
    HistoryMessageScrollerDemoContainer,
    AnimationMessageScrollerDemoContainer,
    CommandsMessageScrollerDemoContainer,
    VisibilityMessageScrollerDemoContainer,
    ScrollableMessageScrollerDemoContainer,
    RtlMessageScrollerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Message Scroller</h1>
        <p class="text-muted-foreground">
          A conversation that scrolls itself: it opens on the last turn, holds a
          new turn near the top while its reply arrives, follows the end until
          you scroll away, and keeps your place when older messages load above.
          In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="message-scroller" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-message-scroller-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the messages and the
          button&apos;s icon and name are yours. Its state and commands, through
          exportAs: scrollable(), visibility(), scrollToEnd(), scrollToStart(),
          scrollToMessage(id).
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The viewport is a region you can tab to — name it (aria-label); the
            arrow keys, Page Up, Page Down, Home and End scroll it.
          </li>
          <li>
            The content is a log: each new message is announced once, as it is
            added. Keep history controls (Load earlier) outside it, or they are
            read as messages.
          </li>
          <li>
            The scroll button is hidden and inert while there is nothing to
            scroll to; name it in sr-only text.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-anchoring-message-scroller-demo-container />
        <app-group-chat-message-scroller-demo-container />
        <app-previous-context-message-scroller-demo-container />
        <app-streaming-message-scroller-demo-container />
        <app-position-message-scroller-demo-container />
        <app-history-message-scroller-demo-container />
        <app-animation-message-scroller-demo-container />
        <app-commands-message-scroller-demo-container />
        <app-visibility-message-scroller-demo-container />
        <app-scrollable-message-scroller-demo-container />
        <app-rtl-message-scroller-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Message Scroller parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MessageScrollerPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMessageScroller, ScMessageScrollerViewport, ScMessageScrollerContent,',
      '  ScMessageScrollerItem, ScMessageScrollerButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMessageScroller autoScroll #scroller="scMessageScroller">',
      '  <div scMessageScrollerViewport aria-label="…">',
      '    <div scMessageScrollerContent>',
      '      <div scMessageScrollerItem messageId="…" scrollAnchor>…</div>',
      '    </div>',
      '  </div>',
      '  <button scMessageScrollerButton>…</button>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScMessageScroller',
      selector: 'div[scMessageScroller]',
      description:
        "autoScroll, defaultScrollPosition ('end', 'last-anchor', 'start'), scrollPreviousItemPeek (64), scrollEdgeThreshold, scrollMargin. exportAs: scrollable(), visibility(), scrollToEnd(), scrollToStart(), scrollToMessage(id).",
    },
    {
      name: 'ScMessageScrollerViewport',
      selector: 'div[scMessageScrollerViewport]',
      description:
        'The scrolling region (name it); hidden until its opening position is applied.',
    },
    {
      name: 'ScMessageScrollerContent',
      selector: 'div[scMessageScrollerContent]',
      description: 'The rows, a log: each new one announced.',
    },
    {
      name: 'ScMessageScrollerItem',
      selector: 'div[scMessageScrollerItem]',
      description:
        'A row: messageId (to jump to it), scrollAnchor (a new turn starts here).',
    },
    {
      name: 'ScMessageScrollerButton',
      selector: 'button[scMessageScrollerButton]',
      description:
        "To the end (direction 'end') or the start; the preset's button, shown when there is somewhere to go.",
    },
  ];
}

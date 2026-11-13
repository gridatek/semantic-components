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
import { ActionsMessageDemoContainer } from './demos/actions-message-demo-container';
import { AttachmentMessageDemoContainer } from './demos/attachment-message-demo-container';
import { AvatarMessageDemoContainer } from './demos/avatar-message-demo-container';
import { GroupMessageDemoContainer } from './demos/group-message-demo-container';
import { HeaderFooterMessageDemoContainer } from './demos/header-footer-message-demo-container';
import { MessageUsageDemoContainer } from './demos/message-usage-demo-container';
import { PatternMessageDemoContainer } from './demos/pattern-message-demo-container';
import { RtlMessageDemoContainer } from './demos/rtl-message-demo-container';
import { StatusMessageDemoContainer } from './demos/status-message-demo-container';

@Component({
  selector: 'app-message-page',
  imports: [
    Anatomy,
    MessageUsageDemoContainer,
    AvatarMessageDemoContainer,
    GroupMessageDemoContainer,
    HeaderFooterMessageDemoContainer,
    ActionsMessageDemoContainer,
    AttachmentMessageDemoContainer,
    StatusMessageDemoContainer,
    PatternMessageDemoContainer,
    RtlMessageDemoContainer,
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
        <h1 scHeading>Message</h1>
        <p class="text-muted-foreground">
          A row of a conversation: an avatar beside its bubbles, a sender above,
          a status or actions below. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="message" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-message-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the bubbles, the avatar and
          every word are yours. The layout is the message&apos;s; the
          bubble&apos;s look is Bubble&apos;s.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A message is layout: what it says is read from what you put in it.
          </li>
          <li>
            Its actions are usually icon-only: name each, in sr-only text. A
            button whose effect shows (Copy) says it in its name (Copied); a
            toggle (Good response) keeps its name and says aria-pressed.
          </li>
          <li>
            A message in progress: a Marker with role=&quot;status&quot;, so it
            is announced as it appears.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-avatar-message-demo-container />
        <app-group-message-demo-container />
        <app-header-footer-message-demo-container />
        <app-actions-message-demo-container />
        <app-attachment-message-demo-container />
        <app-status-message-demo-container />
        <app-pattern-message-demo-container />
        <app-rtl-message-demo-container />
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
          aria-label="Message parts"
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
export default class MessagePage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMessageGroup, ScMessage, ScMessageAvatar, ScMessageContent,',
      '  ScMessageHeader, ScMessageFooter,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scMessageGroup>',
      '  <div scMessage alignment="…">',
      '    <div scMessageAvatar>…</div>',
      '    <div scMessageContent>',
      '      <div scMessageHeader>…</div>',
      '      <div scBubble>…</div>',
      '      <div scMessageFooter>…</div>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScMessageGroup',
      selector: 'div[scMessageGroup]',
      description: 'Consecutive messages from one sender.',
    },
    {
      name: 'ScMessage',
      selector: 'div[scMessage]',
      description:
        "align ('start', 'end' — yours: the row reversed, its bubbles and footer at the end).",
    },
    {
      name: 'ScMessageAvatar',
      selector: 'div[scMessageAvatar]',
      description:
        'Your avatar, at the bottom, clear of the footer; empty, it keeps a group in line.',
    },
    {
      name: 'ScMessageContent',
      selector: 'div[scMessageContent]',
      description: 'The column: header, bubbles, attachments, footer.',
    },
    {
      name: 'ScMessageHeader, ScMessageFooter',
      selector: 'div[…]',
      description:
        'The sender above; a status or actions below — at the end on your messages.',
    },
  ];
}

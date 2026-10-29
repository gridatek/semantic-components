import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicMessageScrollerDemoContainer } from './demos/basic-message-scroller-demo-container';
import { CommandsMessageScrollerDemoContainer } from './demos/commands-message-scroller-demo-container';
import { HistoryMessageScrollerDemoContainer } from './demos/history-message-scroller-demo-container';
import { PositionMessageScrollerDemoContainer } from './demos/position-message-scroller-demo-container';
import { RtlMessageScrollerDemoContainer } from './demos/rtl-message-scroller-demo-container';
import { StreamingMessageScrollerDemoContainer } from './demos/streaming-message-scroller-demo-container';

@Component({
  selector: 'app-message-scroller-page',
  imports: [
    BasicMessageScrollerDemoContainer,
    StreamingMessageScrollerDemoContainer,
    HistoryMessageScrollerDemoContainer,
    CommandsMessageScrollerDemoContainer,
    PositionMessageScrollerDemoContainer,
    RtlMessageScrollerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Message Scroller</h1>
        <p class="text-muted-foreground">
          A conversation that scrolls itself: it opens at the end, holds your
          question near the top while the answer arrives, follows the end until
          you scroll away, and keeps your place when older messages load above.
          The keyboard can reach and scroll it; screen readers hear each new
          message.
        </p>
        <app-component-badges path="message-scroller" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-message-scroller-demo-container />
        <app-streaming-message-scroller-demo-container />
        <app-history-message-scroller-demo-container />
        <app-commands-message-scroller-demo-container />
        <app-position-message-scroller-demo-container />
        <app-rtl-message-scroller-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MessageScrollerPage {}

import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicMessageDemoContainer } from './demos/basic-message-demo-container';

@Component({
  selector: 'app-message-page',
  imports: [BasicMessageDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Message</h1>
        <p class="text-muted-foreground">
          A row in a conversation: an avatar beside a column of bubbles, with an
          optional header and footer.
        </p>
        <app-component-badges path="message" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-message-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class MessagePage {}

import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicBubbleDemoContainer } from './demos/basic-bubble-demo-container';

@Component({
  selector: 'app-bubble-page',
  imports: [BasicBubbleDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Bubble</h1>
        <p class="text-muted-foreground">
          A single message in a conversation, aligned to either side and
          optionally carrying reactions.
        </p>
        <app-component-badges path="bubble" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-bubble-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class BubblePage {}

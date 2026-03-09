import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicHoverCardDemoContainer } from './demos/basic-hover-card-demo-container';
import { RightHoverCardDemoContainer } from './demos/right-hover-card-demo-container';
import { TopHoverCardDemoContainer } from './demos/top-hover-card-demo-container';

@Component({
  selector: 'app-hover-card-page',
  imports: [
    BasicHoverCardDemoContainer,
    RightHoverCardDemoContainer,
    TopHoverCardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Hover Card</h1>
        <p class="text-muted-foreground">
          For sighted users to preview content available behind a link.
        </p>
        <app-component-badges path="hover-card" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-hover-card-demo-container />
        <app-right-hover-card-demo-container />
        <app-top-hover-card-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HoverCardPage {}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCardDemoContainer } from './demos/basic-card-demo-container';
import { FormCardDemoContainer } from './demos/form-card-demo-container';
import { NotificationCardDemoContainer } from './demos/notification-card-demo-container';
import { StatsCardDemoContainer } from './demos/stats-card-demo-container';

@Component({
  selector: 'app-card-page',
  imports: [
    BasicCardDemoContainer,
    FormCardDemoContainer,
    NotificationCardDemoContainer,
    StatsCardDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Card</h1>
        <p class="text-muted-foreground">
          Displays a card with header, content, and footer.
        </p>
        <app-component-badges path="card" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-card-demo-container />
        <app-form-card-demo-container />
        <app-notification-card-demo-container />
        <app-stats-card-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardPage {}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicCardDemoContainer } from './demos/basic-card-demo-container';
import { FormCardDemoContainer } from './demos/form-card-demo-container';
import { NotificationCardDemoContainer } from './demos/notification-card-demo-container';
import { StatsCardDemoContainer } from './demos/stats-card-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-card-page',
  imports: [
    BasicCardDemoContainer,
    FormCardDemoContainer,
    NotificationCardDemoContainer,
    StatsCardDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Card</h1>
        <p class="text-muted-foreground">
          Displays a card with header, content, and footer.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
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
export default class CardPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'card')!.status;
}

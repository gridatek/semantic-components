import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { GroupedNotificationCenterDemoContainer } from './demos/grouped-notification-center-demo-container';
import { FlatNotificationCenterDemoContainer } from './demos/flat-notification-center-demo-container';
import { EmptyNotificationCenterDemoContainer } from './demos/empty-notification-center-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-notification-center-page',
  imports: [
    GroupedNotificationCenterDemoContainer,
    FlatNotificationCenterDemoContainer,
    EmptyNotificationCenterDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">NotificationCenter</h1>
        <p class="text-muted-foreground">
          A grouped notification management component with filtering, read
          states, and actions.
        </p>
        <app-component-badges path="notification-center" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-grouped-notification-center-demo-container />
        <app-flat-notification-center-demo-container />
        <app-empty-notification-center-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotificationCenterPage {}

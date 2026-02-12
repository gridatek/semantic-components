import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNotificationCenter,
  ScNotificationCenterContainer,
  type Notification,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-empty-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: `
    <div
      sc-notification-center
      [(notifications)]="notifications"
      emptyTitle="All caught up!"
      emptyDescription="No new notifications to show."
      class="max-w-md h-[300px]"
    >
      <div sc-notification-center-container class="h-full"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyNotificationCenterDemo {
  readonly notifications = signal<Notification[]>([]);
}

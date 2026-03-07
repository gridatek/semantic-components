import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  type Notification,
  ScNotificationCenter,
  ScNotificationCenterContainer,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-empty-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: `
    <div
      scNotificationCenter
      [(notifications)]="notifications"
      emptyTitle="All caught up!"
      emptyDescription="No new notifications to show."
      class="h-[300px] max-w-md"
    >
      <div scNotificationCenterContainer class="h-full"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyNotificationCenterDemo {
  readonly notifications = signal<Notification[]>([]);
}

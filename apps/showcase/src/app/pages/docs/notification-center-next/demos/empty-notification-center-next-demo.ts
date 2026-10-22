import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScNotificationNext,
  ScNotificationNextCenter,
  ScNotificationNextCenterHeader,
  ScNotificationNextCenterTitle,
  ScNotificationNextEmpty,
} from '@semantic-components/ui-lab';
import { SiBellOffIcon } from '@semantic-icons/lucide-icons';

/** No notifications: the empty state, written by you. */
@Component({
  selector: 'app-empty-notification-center-next-demo',
  imports: [
    ScNotificationNextCenter,
    ScNotificationNextCenterHeader,
    ScNotificationNextCenterTitle,
    ScNotificationNextEmpty,
    SiBellOffIcon,
  ],
  template: `
    <section
      scNotificationNextCenter
      #center="scNotificationNextCenter"
      [(notifications)]="notifications"
      aria-labelledby="empty-notifications-title"
      class="bg-card w-full max-w-md rounded-xl border"
    >
      <div scNotificationNextCenterHeader>
        <h2 scNotificationNextCenterTitle id="empty-notifications-title">
          Notifications
        </h2>
      </div>
      @if (!center.visible().length) {
        <div scNotificationNextEmpty>
          <svg siBellOffIcon></svg>
          <p class="text-foreground font-medium">All caught up</p>
          <p>New notifications will show up here.</p>
        </div>
      }
    </section>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyNotificationCenterNextDemo {
  readonly notifications = signal<ScNotificationNext[]>([]);
}

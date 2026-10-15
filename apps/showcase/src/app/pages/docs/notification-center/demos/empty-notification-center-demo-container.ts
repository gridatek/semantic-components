import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EmptyNotificationCenterDemo } from './empty-notification-center-demo';

@Component({
  selector: 'app-empty-notification-center-demo-container',
  imports: [DemoContainer, EmptyNotificationCenterDemo],
  template: `
    <app-demo-container
      title="Nothing yet"
      demoUrl="/demos/notification-center/empty-notification-center-demo"
      [code]="code"
    >
      <app-empty-notification-center-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyNotificationCenterDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScNotification,
  ScNotificationCenter,
  ScNotificationCenterHeader,
  ScNotificationCenterTitle,
  ScNotificationEmpty,
} from '@semantic-components/ui-lab';
import { SiBellOffIcon } from '@semantic-icons/lucide-icons';

/** No notifications: the empty state, written by you. */
@Component({
  selector: 'app-empty-notification-center-demo',
  imports: [
    ScNotificationCenter,
    ScNotificationCenterHeader,
    ScNotificationCenterTitle,
    ScNotificationEmpty,
    SiBellOffIcon,
  ],
  template: \`
    <section
      scNotificationCenter
      #center="scNotificationCenter"
      [(notifications)]="notifications"
      aria-labelledby="empty-notifications-title"
      class="bg-card w-full max-w-md rounded-xl border"
    >
      <div scNotificationCenterHeader>
        <h2 scNotificationCenterTitle id="empty-notifications-title">
          Notifications
        </h2>
      </div>
      @if (!center.visible().length) {
        <div scNotificationEmpty>
          <svg siBellOffIcon></svg>
          <p class="text-foreground font-medium">All caught up</p>
          <p>New notifications will show up here.</p>
        </div>
      }
    </section>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyNotificationCenterDemo {
  readonly notifications = signal<ScNotification[]>([]);
}`;
}

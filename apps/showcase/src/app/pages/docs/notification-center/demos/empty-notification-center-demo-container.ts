import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { EmptyNotificationCenterDemo } from './empty-notification-center-demo';

@Component({
  selector: 'app-empty-notification-center-demo-container',
  imports: [DemoContainer, EmptyNotificationCenterDemo],
  template: `
    <app-demo-container
      title="Empty State"
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
  ScNotificationCenterContainer,
  type ScNotificationCenterLabels,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-empty-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: \`
    <div
      scNotificationCenter
      title="Notifications"
      [labels]="notificationLabels"
      aria-label="Empty notifications"
      [(notifications)]="notifications"
      emptyTitle="All caught up!"
      emptyDescription="No new notifications to show."
      class="h-[300px] max-w-md"
    >
      <div scNotificationCenterContainer class="h-full"></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyNotificationCenterDemo {
  /** The notification center's texts. */
  readonly notificationLabels: ScNotificationCenterLabels = {
    all: 'All',
    unread: 'Unread',
    read: 'Read',
    markAllRead: 'Mark all as read',
    clearAll: 'Clear all notifications',
    other: 'Other',
    dismiss: 'Dismiss notification',
    groupEmpty: 'No notifications',
    newCount: (count) => \`\${count} new\`,
    markAllReadIn: (group) => \`Mark all as read in \${group}\`,
    clearAllIn: (group) => \`Clear all in \${group}\`,
  };

  readonly notifications = signal<ScNotification[]>([]);
}`;
}

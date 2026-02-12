import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupedNotificationCenterDemo } from './grouped-notification-center-demo';

@Component({
  selector: 'app-grouped-notification-center-demo-container',
  imports: [DemoContainer, GroupedNotificationCenterDemo],
  template: `
    <app-demo-container
      title="Grouped"
      demoUrl="/demos/notification-center/grouped-notification-center-demo"
      [code]="code"
    >
      <app-grouped-notification-center-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedNotificationCenterDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNotificationCenter,
  ScNotificationCenterContainer,
  type Notification,
  type NotificationGroup,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-grouped-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: \`
    <div
      sc-notification-center
      [(notifications)]="notifications"
      [groups]="groups()"
      (markRead)="onMarkRead($event)"
      (dismiss)="onDismiss($event)"
      (clearAll)="onClearAll()"
      class="max-w-md h-[500px]"
    >
      <div sc-notification-center-container class="h-full"></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedNotificationCenterDemo {
  readonly groups = signal<NotificationGroup[]>([
    { id: 'messages', title: 'Messages' },
    { id: 'updates', title: 'Updates' },
    { id: 'alerts', title: 'Alerts' },
  ]);

  readonly notifications = signal<Notification[]>([
    {
      id: '1',
      title: 'New message from Alice',
      description: 'Hey! Are you available for a quick call this afternoon?',
      type: 'message',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      groupId: 'messages',
      avatar: 'https://i.pravatar.cc/150?u=alice',
      action: { label: 'Reply' },
    },
    {
      id: '2',
      title: 'Bob mentioned you in a comment',
      description: '@you Great work on the new feature!',
      type: 'message',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false,
      groupId: 'messages',
      avatar: 'https://i.pravatar.cc/150?u=bob',
    },
    {
      id: '3',
      title: 'New version available',
      description:
        'Version 2.5.0 is now available with new features and bug fixes.',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: true,
      groupId: 'updates',
      action: { label: 'Update now' },
    },
    {
      id: '4',
      title: 'Weekly report generated',
      description: 'Your weekly activity report is ready to view.',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 3600000),
      read: true,
      groupId: 'updates',
    },
    {
      id: '5',
      title: 'Payment failed',
      description:
        'Your payment method was declined. Please update your billing info.',
      type: 'error',
      timestamp: new Date(Date.now() - 10 * 60000),
      read: false,
      groupId: 'alerts',
      action: { label: 'Update payment' },
    },
    {
      id: '6',
      title: 'Storage limit warning',
      description: "You've used 90% of your storage quota.",
      type: 'warning',
      timestamp: new Date(Date.now() - 3 * 3600000),
      read: false,
      groupId: 'alerts',
      action: { label: 'Upgrade plan' },
    },
  ]);

  onMarkRead(event: { notification: Notification; read: boolean }): void {
    console.log('Mark read:', event);
  }

  onDismiss(notification: Notification): void {
    console.log('Dismissed:', notification);
  }

  onClearAll(): void {
    console.log('Cleared all notifications');
  }
}`;
}

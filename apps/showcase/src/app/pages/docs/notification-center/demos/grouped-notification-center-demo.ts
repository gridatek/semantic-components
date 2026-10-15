import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScNotification,
  ScNotificationCenter,
  ScNotificationCenterContainer,
  type ScNotificationCenterLabels,
  type ScNotificationGroupData,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-grouped-notification-center-demo',
  imports: [ScNotificationCenter, ScNotificationCenterContainer],
  template: `
    <div
      scNotificationCenter
      title="Notifications"
      emptyTitle="No notifications"
      emptyDescription="You're all caught up!"
      [labels]="notificationLabels"
      aria-label="Grouped notifications"
      [(notifications)]="notifications"
      [groups]="groups()"
      (markRead)="onMarkRead($event)"
      (dismiss)="onDismiss($event)"
      (clearAll)="onClearAll()"
      class="h-[500px] max-w-md"
    >
      <div scNotificationCenterContainer class="h-full"></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupedNotificationCenterDemo {
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
    newCount: (count) => `${count} new`,
    markAllReadIn: (group) => `Mark all as read in ${group}`,
    clearAllIn: (group) => `Clear all in ${group}`,
  };

  readonly groups = signal<ScNotificationGroupData[]>([
    { id: 'messages', title: 'Messages' },
    { id: 'updates', title: 'Updates' },
    { id: 'alerts', title: 'Alerts' },
  ]);

  readonly notifications = signal<ScNotification[]>([
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

  onMarkRead(event: { notification: ScNotification; read: boolean }): void {
    console.log('Mark read:', event);
  }

  onDismiss(notification: ScNotification): void {
    console.log('Dismissed:', notification);
  }

  onClearAll(): void {
    console.log('Cleared all notifications');
  }
}

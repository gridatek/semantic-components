import {
  computed,
  Directive,
  InjectionToken,
  input,
  model,
  output,
} from '@angular/core';
import type {
  Notification,
  NotificationAction,
  NotificationGroup,
} from './notification-types';

export type NotificationFilter = 'all' | 'unread' | 'read';

export interface ScNotificationCenter {
  readonly notifications: ReturnType<typeof model<Notification[]>>;
  readonly groups: () => NotificationGroup[];
  readonly title: () => string;
  readonly showFilters: () => boolean;
  readonly showClearAll: () => boolean;
  readonly showDismiss: () => boolean;
  readonly emptyTitle: () => string;
  readonly emptyDescription: () => string;
  readonly filter: ReturnType<typeof model<NotificationFilter>>;
  readonly totalUnread: () => number;
  readonly filteredNotifications: () => Notification[];
  readonly ungroupedNotifications: () => Notification[];
  readonly itemClick: ReturnType<typeof output<Notification>>;
  getGroupNotifications(groupId: string): Notification[];
  setFilter(f: NotificationFilter): void;
  onMarkRead(notification: Notification, read: boolean): void;
  onMarkAllRead(): void;
  onMarkAllReadInGroup(groupId: string): void;
  onDismiss(notification: Notification): void;
  onClearAll(): void;
  onClearGroup(groupId: string): void;
  onActionClick(notification: Notification, action: NotificationAction): void;
}

export const SC_NOTIFICATION_CENTER = new InjectionToken<ScNotificationCenter>(
  'SC_NOTIFICATION_CENTER',
);

@Directive({
  selector: '[sc-notification-center]',
  exportAs: 'scNotificationCenter',
  providers: [
    {
      provide: SC_NOTIFICATION_CENTER,
      useExisting: ScNotificationCenterDirective,
    },
  ],
  host: {
    'data-slot': 'notification-center',
  },
})
export class ScNotificationCenterDirective implements ScNotificationCenter {
  readonly notifications = model<Notification[]>([]);
  readonly groups = input<NotificationGroup[]>([]);
  readonly title = input('Notifications');
  readonly showFilters = input(true);
  readonly showClearAll = input(true);
  readonly showDismiss = input(true);
  readonly emptyTitle = input('No notifications');
  readonly emptyDescription = input("You're all caught up!");
  readonly class = input<string>('');

  readonly markRead = output<{ notification: Notification; read: boolean }>();
  readonly markAllRead = output<void>();
  readonly dismiss = output<Notification>();
  readonly clearAll = output<void>();
  readonly actionClick = output<{
    notification: Notification;
    action: NotificationAction;
  }>();
  readonly itemClick = output<Notification>();
  readonly filterChange = output<NotificationFilter>();

  readonly filter = model<NotificationFilter>('all');

  readonly totalUnread = computed(
    () => this.notifications().filter((n) => !n.read).length,
  );

  readonly filteredNotifications = computed(() => {
    const f = this.filter();
    const all = this.notifications();

    switch (f) {
      case 'unread':
        return all.filter((n) => !n.read);
      case 'read':
        return all.filter((n) => n.read);
      default:
        return all;
    }
  });

  readonly ungroupedNotifications = computed(() =>
    this.filteredNotifications().filter((n) => !n.groupId),
  );

  getGroupNotifications(groupId: string): Notification[] {
    return this.filteredNotifications().filter((n) => n.groupId === groupId);
  }

  setFilter(f: NotificationFilter): void {
    this.filter.set(f);
    this.filterChange.emit(f);
  }

  onMarkRead(notification: Notification, read: boolean): void {
    this.notifications.update((notifications) =>
      notifications.map((n) => (n.id === notification.id ? { ...n, read } : n)),
    );
    this.markRead.emit({ notification, read });
  }

  onMarkAllRead(): void {
    this.notifications.update((notifications) =>
      notifications.map((n) => ({ ...n, read: true })),
    );
    this.markAllRead.emit();
  }

  onMarkAllReadInGroup(groupId: string): void {
    this.notifications.update((notifications) =>
      notifications.map((n) =>
        n.groupId === groupId ? { ...n, read: true } : n,
      ),
    );
  }

  onDismiss(notification: Notification): void {
    this.notifications.update((notifications) =>
      notifications.filter((n) => n.id !== notification.id),
    );
    this.dismiss.emit(notification);
  }

  onClearAll(): void {
    this.notifications.set([]);
    this.clearAll.emit();
  }

  onClearGroup(groupId: string): void {
    this.notifications.update((notifications) =>
      notifications.filter((n) => n.groupId !== groupId),
    );
  }

  onActionClick(notification: Notification, action: NotificationAction): void {
    this.actionClick.emit({ notification, action });
  }
}

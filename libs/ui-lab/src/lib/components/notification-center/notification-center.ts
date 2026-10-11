import {
  Directive,
  InjectionToken,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import type {
  ScNotification,
  ScNotificationAction,
  ScNotificationGroupData,
} from './notification-types';

export type ScNotificationFilter = 'all' | 'unread' | 'read';

export interface ScNotificationCenterApi {
  readonly notifications: ReturnType<typeof model<ScNotification[]>>;
  readonly groups: () => ScNotificationGroupData[];
  readonly title: () => string;
  readonly showFilters: () => boolean;
  readonly showClearAll: () => boolean;
  readonly showDismiss: () => boolean;
  readonly emptyTitle: () => string;
  readonly emptyDescription: () => string;
  readonly filter: ReturnType<typeof model<ScNotificationFilter>>;
  readonly totalUnread: () => number;
  readonly filteredNotifications: () => ScNotification[];
  readonly ungroupedNotifications: () => ScNotification[];
  readonly itemClick: ReturnType<typeof output<ScNotification>>;
  getGroupNotifications(groupId: string): ScNotification[];
  setFilter(f: ScNotificationFilter): void;
  onMarkRead(notification: ScNotification, read: boolean): void;
  onMarkAllRead(): void;
  onMarkAllReadInGroup(groupId: string): void;
  onDismiss(notification: ScNotification): void;
  onClearAll(): void;
  onClearGroup(groupId: string): void;
  onActionClick(
    notification: ScNotification,
    action: ScNotificationAction,
  ): void;
}

export const SC_NOTIFICATION_CENTER =
  new InjectionToken<ScNotificationCenterApi>('SC_NOTIFICATION_CENTER');

@Directive({
  selector: '[scNotificationCenter]',
  exportAs: 'scNotificationCenter',
  providers: [
    {
      provide: SC_NOTIFICATION_CENTER,
      useExisting: ScNotificationCenter,
    },
  ],
  host: {
    role: 'region',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel() || title()',
  },
})
export class ScNotificationCenter implements ScNotificationCenterApi {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly notifications = model<ScNotification[]>([]);
  readonly groups = input<ScNotificationGroupData[]>([]);
  readonly title = input('Notifications');
  /** Name of the region; defaults to `title`. Make it unique per page. */
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });
  readonly showFilters = input(true);
  readonly showClearAll = input(true);
  readonly showDismiss = input(true);
  readonly emptyTitle = input('No notifications');
  readonly emptyDescription = input("You're all caught up!");

  readonly markRead = output<{ notification: ScNotification; read: boolean }>();
  readonly markAllRead = output<void>();
  readonly dismiss = output<ScNotification>();
  readonly clearAll = output<void>();
  readonly actionClick = output<{
    notification: ScNotification;
    action: ScNotificationAction;
  }>();
  readonly itemClick = output<ScNotification>();

  readonly filter = model<ScNotificationFilter>('all');

  protected readonly class = computed(() => cn(this.classInput()));

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

  getGroupNotifications(groupId: string): ScNotification[] {
    return this.filteredNotifications().filter((n) => n.groupId === groupId);
  }

  setFilter(f: ScNotificationFilter): void {
    this.filter.set(f);
  }

  onMarkRead(notification: ScNotification, read: boolean): void {
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

  onDismiss(notification: ScNotification): void {
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

  onActionClick(
    notification: ScNotification,
    action: ScNotificationAction,
  ): void {
    this.actionClick.emit({ notification, action });
  }
}

/** What a notification is about: its icon's colour follows it. */
export type ScNotificationType =
  'info' | 'success' | 'warning' | 'error' | 'message';

/**
 * What the notification center needs of a notification. Extend it with your
 * own fields — a title, an avatar, a link — and write them in your template.
 */
export interface ScNotification {
  readonly id: string;
  readonly read: boolean;
  /** When it happened: `scNotificationTime` writes how long ago. */
  readonly timestamp: Temporal.Instant;
  readonly type?: ScNotificationType;
}

/** Which notifications are shown: all of them, or the unread ones. */
export type ScNotificationFilterValue = 'all' | 'unread';

/** A day of notifications (`days()`): the day, and those of it. */
export interface ScNotificationDayGroup<T extends ScNotification> {
  readonly day: Temporal.PlainDate;
  readonly notifications: T[];
}

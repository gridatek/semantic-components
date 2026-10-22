/** What a notification is about: its icon's colour follows it. */
export type ScNotificationNextType =
  'info' | 'success' | 'warning' | 'error' | 'message';

/**
 * What the notification center needs of a notification. Extend it with your
 * own fields — a title, an avatar, a link — and write them in your template.
 */
export interface ScNotificationNext {
  readonly id: string;
  readonly read: boolean;
  /** When it happened: `scNotificationNextTime` writes how long ago. */
  readonly timestamp: Temporal.Instant;
  readonly type?: ScNotificationNextType;
}

/** Which notifications are shown: all of them, or the unread ones. */
export type ScNotificationNextFilterValue = 'all' | 'unread';

/** A day of notifications (`days()`): the day, and those of it. */
export interface ScNotificationNextDayGroup<T extends ScNotificationNext> {
  readonly day: Temporal.PlainDate;
  readonly notifications: T[];
}

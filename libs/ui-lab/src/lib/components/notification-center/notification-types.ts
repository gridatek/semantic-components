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
  readonly timestamp: Date;
  readonly type?: ScNotificationType;
  /** The group it belongs to (your id), for `visibleIn(group)`. */
  readonly group?: string;
}

/** Which notifications are shown. */
export type ScNotificationFilterValue = 'all' | 'unread' | 'read';

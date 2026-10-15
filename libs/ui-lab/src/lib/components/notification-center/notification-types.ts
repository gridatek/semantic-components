export type ScNotificationType =
  'info' | 'success' | 'warning' | 'error' | 'message';

export interface ScNotification {
  id: string;
  title: string;
  description?: string;
  type: ScNotificationType;
  timestamp: Date;
  read: boolean;
  groupId?: string;
  avatar?: string;
  icon?: string;
  action?: ScNotificationAction;
  metadata?: Record<string, unknown>;
}

export interface ScNotificationAction {
  label: string;
  url?: string;
  handler?: () => void;
}

export interface ScNotificationGroupData {
  id: string;
  title: string;
  icon?: string;
  collapsed?: boolean;
}

export interface ScNotificationMarkReadEvent {
  notification: ScNotification;
  read: boolean;
}

export interface ScNotificationDismissEvent {
  notification: ScNotification;
}

export interface ScNotificationActionEvent {
  notification: ScNotification;
  action: ScNotificationAction;
}

export interface ScNotificationGroupCollapseEvent {
  group: ScNotificationGroupData;
  collapsed: boolean;
}

/**
 * The notification center's texts — the library writes none. The functions
 * get what the text is about: a group's title, a count.
 */
export interface ScNotificationCenterLabels {
  /** The filters. */
  readonly all: string;
  readonly unread: string;
  readonly read: string;
  /** The header's buttons. */
  readonly markAllRead: string;
  readonly clearAll: string;
  /** The heading of the notifications in no group. */
  readonly other: string;
  /** Each notification's dismiss button. */
  readonly dismiss: string;
  /** A group with no notifications. */
  readonly groupEmpty: string;
  /** A group's unread count ("3 new"). */
  readonly newCount: (count: number) => string;
  /** A group's buttons ("Mark all as read in Today"). */
  readonly markAllReadIn: (group: string) => string;
  readonly clearAllIn: (group: string) => string;
}

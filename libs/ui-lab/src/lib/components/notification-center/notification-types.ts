export type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'message';

export interface Notification {
  id: string;
  title: string;
  description?: string;
  type: NotificationType;
  timestamp: Date;
  read: boolean;
  groupId?: string;
  avatar?: string;
  icon?: string;
  action?: NotificationAction;
  metadata?: Record<string, unknown>;
}

export interface NotificationAction {
  label: string;
  url?: string;
  handler?: () => void;
}

export interface NotificationGroup {
  id: string;
  title: string;
  icon?: string;
  collapsed?: boolean;
}

export interface NotificationMarkReadEvent {
  notification: Notification;
  read: boolean;
}

export interface NotificationDismissEvent {
  notification: Notification;
}

export interface NotificationActionEvent {
  notification: Notification;
  action: NotificationAction;
}

export interface NotificationGroupCollapseEvent {
  group: NotificationGroup;
  collapsed: boolean;
}

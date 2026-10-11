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

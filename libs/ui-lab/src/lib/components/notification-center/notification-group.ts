import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNotificationItem } from './notification-item';
import type {
  Notification,
  NotificationAction,
  NotificationGroup,
} from './notification-types';

@Component({
  selector: 'sc-notification-group',
  imports: [ScNotificationItem],
  template: `
    <div [class]="groupClass()">
      <!-- Group Header -->
      <button
        type="button"
        class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
        (click)="toggleCollapse()"
        [attr.aria-expanded]="!collapsed()"
        [attr.aria-controls]="'group-' + group().id"
      >
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="collapsed() ? '-rotate-90' : 'rotate-0'"
            class="transition-transform"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
          @if (group().icon) {
            <span [innerHTML]="group().icon"></span>
          }
          <span>{{ group().title }}</span>
          <span class="px-1.5 py-0.5 text-xs bg-muted rounded-full">
            {{ notifications().length }}
          </span>
          @if (unreadCount() > 0) {
            <span
              class="px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full"
            >
              {{ unreadCount() }} new
            </span>
          }
        </div>

        @if (notifications().length > 0) {
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              (click)="onMarkAllRead($event)"
              [attr.aria-label]="'Mark all as read in ' + group().title"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </button>
            <button
              type="button"
              class="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              (click)="onClearAll($event)"
              [attr.aria-label]="'Clear all in ' + group().title"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        }
      </button>

      <!-- Notifications List -->
      @if (!collapsed()) {
        <div
          [id]="'group-' + group().id"
          class="mt-1 space-y-1"
          role="feed"
          aria-label="Notifications"
        >
          @for (notification of notifications(); track notification.id) {
            <sc-notification-item
              [notification]="notification"
              [showDismiss]="showDismiss()"
              (markRead)="onMarkRead(notification, $event)"
              (dismiss)="onDismiss(notification)"
              (actionClick)="onActionClick(notification, $event)"
              (itemClick)="itemClick.emit(notification)"
            />
          }

          @if (notifications().length === 0) {
            <p class="px-3 py-4 text-sm text-muted-foreground text-center">
              No notifications
            </p>
          }
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNotificationGroup {
  readonly group = input.required<NotificationGroup>();
  readonly notifications = input<Notification[]>([]);
  readonly showDismiss = input(true);
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
  readonly collapseChange = output<boolean>();

  protected readonly collapsed = signal(false);

  protected readonly groupClass = computed(() => cn('', this.class()));

  protected readonly unreadCount = computed(
    () => this.notifications().filter((n) => !n.read).length,
  );

  protected toggleCollapse(): void {
    const newValue = !this.collapsed();
    this.collapsed.set(newValue);
    this.collapseChange.emit(newValue);
  }

  protected onMarkRead(notification: Notification, read: boolean): void {
    this.markRead.emit({ notification, read });
  }

  protected onMarkAllRead(event: MouseEvent): void {
    event.stopPropagation();
    this.markAllRead.emit();
  }

  protected onDismiss(notification: Notification): void {
    this.dismiss.emit(notification);
  }

  protected onClearAll(event: MouseEvent): void {
    event.stopPropagation();
    this.clearAll.emit();
  }

  protected onActionClick(
    notification: Notification,
    action: NotificationAction,
  ): void {
    this.actionClick.emit({ notification, action });
  }
}

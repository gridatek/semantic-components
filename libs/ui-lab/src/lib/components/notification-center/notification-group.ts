import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiCircleCheckIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import { ScNotificationItem } from './notification-item';
import type {
  ScNotification,
  ScNotificationAction,
  ScNotificationGroupData,
} from './notification-types';

@Component({
  selector: 'div[scNotificationGroup]',
  imports: [
    ScNotificationItem,
    SiChevronDownIcon,
    SiCircleCheckIcon,
    SiTrash2Icon,
  ],
  template: `
    <!-- Group Header -->
    <div
      class="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg pe-3 transition-colors"
    >
      <button
        type="button"
        class="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium outline-none focus-visible:ring-3"
        (click)="toggleCollapse()"
        [attr.aria-expanded]="!collapsed()"
        [attr.aria-controls]="'group-' + group().id"
      >
        <svg
          siChevronDownIcon
          [class]="
            collapsed()
              ? '-rotate-90 transition-transform'
              : 'rotate-0 transition-transform'
          "
        ></svg>
        @if (group().icon) {
          <span [innerHTML]="group().icon"></span>
        }
        <span>{{ group().title }}</span>
        <span class="bg-muted rounded-full px-1.5 py-0.5 text-xs">
          {{ notifications().length }}
        </span>
        @if (unreadCount() > 0) {
          <span
            class="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs"
          >
            {{ unreadCount() }} new
          </span>
        }
      </button>

      @if (notifications().length > 0) {
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
            (click)="onMarkAllRead($event)"
            [attr.aria-label]="'Mark all as read in ' + group().title"
          >
            <svg siCircleCheckIcon class="size-3.5"></svg>
          </button>
          <button
            type="button"
            class="hover:bg-muted text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
            (click)="onClearAll($event)"
            [attr.aria-label]="'Clear all in ' + group().title"
          >
            <svg siTrash2Icon class="size-3.5"></svg>
          </button>
        </div>
      }
    </div>

    <!-- Notifications List -->
    @if (!collapsed()) {
      <div
        [id]="'group-' + group().id"
        class="mt-1 space-y-1"
        role="feed"
        aria-label="Notifications"
      >
        @for (notification of notifications(); track notification.id) {
          <div
            scNotificationItem
            [notification]="notification"
            [showDismiss]="showDismiss()"
            (markRead)="onMarkRead(notification, $event)"
            (dismiss)="onDismiss(notification)"
            (actionClick)="onActionClick(notification, $event)"
            (itemClick)="itemClick.emit(notification)"
          ></div>
        }

        @if (notifications().length === 0) {
          <p class="text-muted-foreground px-3 py-4 text-center text-sm">
            No notifications
          </p>
        }
      </div>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNotificationGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly group = input.required<ScNotificationGroupData>();
  readonly notifications = input<ScNotification[]>([]);
  readonly showDismiss = input(true);

  readonly markRead = output<{ notification: ScNotification; read: boolean }>();
  readonly markAllRead = output<void>();
  readonly dismiss = output<ScNotification>();
  readonly clearAll = output<void>();
  readonly actionClick = output<{
    notification: ScNotification;
    action: ScNotificationAction;
  }>();
  readonly itemClick = output<ScNotification>();
  readonly collapseChange = output<boolean>();

  protected readonly collapsed = signal(false);

  protected readonly class = computed(() => cn(this.classInput()));

  protected readonly unreadCount = computed(
    () => this.notifications().filter((n) => !n.read).length,
  );

  protected toggleCollapse(): void {
    const newValue = !this.collapsed();
    this.collapsed.set(newValue);
    this.collapseChange.emit(newValue);
  }

  protected onMarkRead(notification: ScNotification, read: boolean): void {
    this.markRead.emit({ notification, read });
  }

  protected onMarkAllRead(event: MouseEvent): void {
    event.stopPropagation();
    this.markAllRead.emit();
  }

  protected onDismiss(notification: ScNotification): void {
    this.dismiss.emit(notification);
  }

  protected onClearAll(event: MouseEvent): void {
    event.stopPropagation();
    this.clearAll.emit();
  }

  protected onActionClick(
    notification: ScNotification,
    action: ScNotificationAction,
  ): void {
    this.actionClick.emit({ notification, action });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiBellIcon,
  SiCircleCheckIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';
import {
  type NotificationFilter,
  SC_NOTIFICATION_CENTER,
} from './notification-center';
import { ScNotificationGroup } from './notification-group';
import { ScNotificationItem } from './notification-item';

@Component({
  selector: '[scNotificationCenterContainer]',
  imports: [
    ScNotificationGroup,
    ScNotificationItem,
    SiCircleCheckIcon,
    SiTrash2Icon,
    SiBellIcon,
  ],
  template: `
    <div [class]="containerClass()">
      <!-- Header -->
      <div class="flex items-center justify-between border-b px-4 py-3">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold">{{ center.title() }}</h2>
          @if (center.totalUnread() > 0) {
            <span
              class="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-medium"
            >
              {{ center.totalUnread() }}
            </span>
          }
        </div>

        <div class="flex items-center gap-2">
          <!-- Filter tabs -->
          @if (center.showFilters()) {
            <div class="bg-muted flex items-center rounded-lg p-0.5">
              @for (f of filters; track f.value) {
                <button
                  type="button"
                  class="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
                  [class.bg-background]="center.filter() === f.value"
                  [class.text-foreground]="center.filter() === f.value"
                  [class.shadow-sm]="center.filter() === f.value"
                  [class.text-muted-foreground]="center.filter() !== f.value"
                  [class.hover:text-foreground]="center.filter() !== f.value"
                  (click)="center.setFilter(f.value)"
                >
                  {{ f.label }}
                </button>
              }
            </div>
          }

          <!-- Mark all read -->
          @if (center.totalUnread() > 0) {
            <button
              type="button"
              class="hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg p-1.5 transition-colors"
              (click)="center.onMarkAllRead()"
              aria-label="Mark all as read"
              title="Mark all as read"
            >
              <svg siCircleCheckIcon class="size-4.5"></svg>
            </button>
          }

          <!-- Clear all -->
          @if (center.notifications().length > 0 && center.showClearAll()) {
            <button
              type="button"
              class="hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg p-1.5 transition-colors"
              (click)="center.onClearAll()"
              aria-label="Clear all notifications"
              title="Clear all"
            >
              <svg siTrash2Icon class="size-4.5"></svg>
            </button>
          }
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        @if (center.filteredNotifications().length === 0) {
          <div
            class="flex flex-col items-center justify-center py-12 text-center"
          >
            <div
              class="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            >
              <svg siBellIcon class="text-muted-foreground size-8"></svg>
            </div>
            <p class="text-foreground text-sm font-medium">
              {{ center.emptyTitle() }}
            </p>
            <p class="text-muted-foreground mt-1 text-sm">
              {{ center.emptyDescription() }}
            </p>
          </div>
        } @else if (center.groups().length > 0) {
          <!-- Grouped notifications -->
          <div class="space-y-4 p-2">
            @for (group of center.groups(); track group.id) {
              <sc-notification-group
                [group]="group"
                [notifications]="center.getGroupNotifications(group.id)"
                [showDismiss]="center.showDismiss()"
                (markRead)="center.onMarkRead($event.notification, $event.read)"
                (markAllRead)="center.onMarkAllReadInGroup(group.id)"
                (dismiss)="center.onDismiss($event)"
                (clearAll)="center.onClearGroup(group.id)"
                (actionClick)="
                  center.onActionClick($event.notification, $event.action)
                "
                (itemClick)="center.itemClick.emit($event)"
              />
            }

            <!-- Ungrouped notifications -->
            @if (center.ungroupedNotifications().length > 0) {
              <div>
                <p class="text-muted-foreground px-3 py-2 text-sm font-medium">
                  Other
                </p>
                <div class="space-y-1">
                  @for (
                    notification of center.ungroupedNotifications();
                    track notification.id
                  ) {
                    <sc-notification-item
                      [notification]="notification"
                      [showDismiss]="center.showDismiss()"
                      (markRead)="center.onMarkRead(notification, $event)"
                      (dismiss)="center.onDismiss(notification)"
                      (actionClick)="center.onActionClick(notification, $event)"
                      (itemClick)="center.itemClick.emit(notification)"
                    />
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- Flat list -->
          <div class="space-y-1 p-2" role="feed" aria-label="Notifications">
            @for (
              notification of center.filteredNotifications();
              track notification.id
            ) {
              <sc-notification-item
                [notification]="notification"
                [showDismiss]="center.showDismiss()"
                (markRead)="center.onMarkRead(notification, $event)"
                (dismiss)="center.onDismiss(notification)"
                (actionClick)="center.onActionClick(notification, $event)"
                (itemClick)="center.itemClick.emit(notification)"
              />
            }
          </div>
        }
      </div>
    </div>
  `,
  host: {
    'data-slot': 'notification-center-container',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNotificationCenterContainer {
  readonly center = inject(SC_NOTIFICATION_CENTER);
  readonly class = input<string>('');

  protected readonly filters: { value: NotificationFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
  ];

  protected readonly containerClass = computed(() =>
    cn('flex flex-col bg-background border rounded-lg shadow-lg', this.class()),
  );
}

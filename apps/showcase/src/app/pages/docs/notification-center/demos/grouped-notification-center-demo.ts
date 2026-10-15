import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  type ScNotification,
  ScNotificationCenter,
  ScNotificationCenterHeader,
  ScNotificationCenterTitle,
  ScNotificationClearAll,
  ScNotificationContent,
  ScNotificationDescription,
  ScNotificationDismiss,
  ScNotificationEmpty,
  ScNotificationFilter,
  ScNotificationFilters,
  ScNotificationGroup,
  ScNotificationGroupTitle,
  ScNotificationIcon,
  ScNotificationItem,
  ScNotificationList,
  ScNotificationMarkAllRead,
  ScNotificationTime,
  ScNotificationTitle,
  ScNotificationUnread,
} from '@semantic-components/ui-lab';
import {
  SiBellOffIcon,
  SiCheckCheckIcon,
  SiCircleCheckIcon,
  SiInfoIcon,
  SiMessageSquareIcon,
  SiTrash2Icon,
  SiTriangleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

interface Notice extends ScNotification {
  readonly title: string;
  readonly description?: string;
}

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60000);

/** Notifications in groups, each with its own buttons. */
@Component({
  selector: 'app-grouped-notification-center-demo',
  imports: [
    ScButton,
    ScNotificationCenter,
    ScNotificationCenterHeader,
    ScNotificationCenterTitle,
    ScNotificationClearAll,
    ScNotificationContent,
    ScNotificationDescription,
    ScNotificationDismiss,
    ScNotificationEmpty,
    ScNotificationFilter,
    ScNotificationFilters,
    ScNotificationGroup,
    ScNotificationGroupTitle,
    ScNotificationIcon,
    ScNotificationItem,
    ScNotificationList,
    ScNotificationMarkAllRead,
    ScNotificationTime,
    ScNotificationTitle,
    ScNotificationUnread,
    SiBellOffIcon,
    SiCheckCheckIcon,
    SiCircleCheckIcon,
    SiInfoIcon,
    SiMessageSquareIcon,
    SiTrash2Icon,
    SiTriangleAlertIcon,
    SiXIcon,
  ],
  template: `
    <section
      scNotificationCenter
      #center="scNotificationCenter"
      [(notifications)]="notifications"
      aria-labelledby="grouped-notifications-title"
      class="bg-card w-full max-w-md rounded-xl border"
    >
      <div scNotificationCenterHeader>
        <h2 scNotificationCenterTitle id="grouped-notifications-title">
          Activity
        </h2>
        <div class="flex items-center gap-1">
          <button
            scButton
            variant="ghost"
            size="icon-sm"
            scNotificationMarkAllRead
            aria-label="Mark all as read"
          >
            <svg siCheckCheckIcon></svg>
          </button>
          <button
            scButton
            variant="ghost"
            size="icon-sm"
            scNotificationClearAll
            aria-label="Clear all"
          >
            <svg siTrash2Icon></svg>
          </button>
        </div>
      </div>

      <div class="px-4 pt-3">
        <div scNotificationFilters aria-label="Show">
          <button scNotificationFilter="all">All</button>
          <button scNotificationFilter="unread">
            Unread ({{ center.unreadCount() }})
          </button>
        </div>
      </div>

      @if (center.visible().length) {
        <div class="p-2">
          @for (group of groups; track group.id) {
            @if (center.visibleIn(group.id).length) {
              <div [scNotificationGroup]="group.id">
                <div class="flex items-center justify-between pe-1">
                  <h3 scNotificationGroupTitle>{{ group.title }}</h3>
                  <button
                    scButton
                    variant="ghost"
                    size="icon-xs"
                    scNotificationMarkAllRead
                    [attr.aria-label]="'Mark all as read in ' + group.title"
                  >
                    <svg siCheckCheckIcon></svg>
                  </button>
                </div>
                <ul scNotificationList>
                  @for (notice of center.visibleIn(group.id); track notice.id) {
                    <li [scNotification]="notice">
                      <span scNotificationUnread>
                        <span class="sr-only">Unread</span>
                      </span>
                      <span scNotificationIcon>
                        @switch (notice.type) {
                          @case ('message') {
                            <svg siMessageSquareIcon></svg>
                          }
                          @case ('success') {
                            <svg siCircleCheckIcon></svg>
                          }
                          @case ('warning') {
                            <svg siTriangleAlertIcon></svg>
                          }
                          @default {
                            <svg siInfoIcon></svg>
                          }
                        }
                      </span>
                      <div scNotificationContent>
                        <div class="flex items-start justify-between gap-2">
                          <p scNotificationTitle>{{ notice.title }}</p>
                          <time scNotificationTime></time>
                        </div>
                        @if (notice.description) {
                          <p scNotificationDescription>
                            {{ notice.description }}
                          </p>
                        }
                      </div>
                      <button
                        scButton
                        variant="ghost"
                        size="icon-xs"
                        scNotificationDismiss
                        [attr.aria-label]="'Dismiss ' + notice.title"
                      >
                        <svg siXIcon></svg>
                      </button>
                    </li>
                  }
                </ul>
              </div>
            }
          }
        </div>
      } @else {
        <div scNotificationEmpty>
          <svg siBellOffIcon></svg>
          <p>You're all caught up.</p>
        </div>
      }
    </section>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupedNotificationCenterDemo {
  readonly groups = [
    { id: 'messages', title: 'Messages' },
    { id: 'updates', title: 'Updates' },
    { id: 'alerts', title: 'Alerts' },
  ];

  readonly notifications = signal<Notice[]>([
    {
      id: '1',
      title: 'New message from Alice',
      description: 'Are you free for a quick call this afternoon?',
      type: 'message',
      timestamp: minutesAgo(5),
      read: false,
      group: 'messages',
    },
    {
      id: '2',
      title: 'Bob mentioned you',
      description: 'Great work on the new feature!',
      type: 'message',
      timestamp: minutesAgo(30),
      read: false,
      group: 'messages',
    },
    {
      id: '3',
      title: 'Version 2.5 is out',
      type: 'info',
      timestamp: minutesAgo(120),
      read: true,
      group: 'updates',
    },
    {
      id: '4',
      title: 'Weekly report ready',
      type: 'success',
      timestamp: minutesAgo(24 * 60),
      read: true,
      group: 'updates',
    },
    {
      id: '5',
      title: 'Storage almost full',
      description: 'You have used 90% of your space.',
      type: 'warning',
      timestamp: minutesAgo(180),
      read: false,
      group: 'alerts',
    },
  ]);
}

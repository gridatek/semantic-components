import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InboxNotificationCenterDemo } from './inbox-notification-center-demo';

@Component({
  selector: 'app-inbox-notification-center-demo-container',
  imports: [DemoContainer, InboxNotificationCenterDemo],
  template: `
    <app-demo-container
      title="Inbox behind a bell"
      [code]="code"
      demoUrl="/demos/notification-center/inbox-notification-center-demo"
    >
      <app-inbox-notification-center-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InboxNotificationCenterDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import {
  type ScNotification,
  ScNotificationActions,
  ScNotificationCenter,
  ScNotificationCenterHeader,
  ScNotificationCenterTitle,
  ScNotificationContent,
  ScNotificationDescription,
  ScNotificationDismiss,
  ScNotificationEmpty,
  ScNotificationFilter,
  ScNotificationFilters,
  ScNotificationIcon,
  ScNotificationItem,
  ScNotificationList,
  ScNotificationMarkAllRead,
  ScNotificationMarkRead,
  ScNotificationTime,
  ScNotificationTitle,
  ScNotificationUnread,
} from '@semantic-components/ui-lab';
import {
  SiBellIcon,
  SiBellOffIcon,
  SiCheckCheckIcon,
  SiCircleCheckIcon,
  SiCircleXIcon,
  SiInfoIcon,
  SiTriangleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A notification, with what this app shows of it. */
interface Notice extends ScNotification {
  readonly title: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly action?: string;
}

const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60000);

/** An inbox behind a bell: the unread count, filters, actions. */
@Component({
  selector: 'app-inbox-notification-center-demo',
  imports: [
    ScBadge,
    ScButton,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScNotificationActions,
    ScNotificationCenter,
    ScNotificationCenterHeader,
    ScNotificationCenterTitle,
    ScNotificationContent,
    ScNotificationDescription,
    ScNotificationDismiss,
    ScNotificationEmpty,
    ScNotificationFilter,
    ScNotificationFilters,
    ScNotificationIcon,
    ScNotificationItem,
    ScNotificationList,
    ScNotificationMarkAllRead,
    ScNotificationMarkRead,
    ScNotificationTime,
    ScNotificationTitle,
    ScNotificationUnread,
    SiBellIcon,
    SiBellOffIcon,
    SiCheckCheckIcon,
    SiCircleCheckIcon,
    SiCircleXIcon,
    SiInfoIcon,
    SiTriangleAlertIcon,
    SiXIcon,
  ],
  template: \`
    <div
      scNotificationCenter
      #center="scNotificationCenter"
      [(notifications)]="notifications"
    >
      <div scPopoverProvider align="end">
        <button
          scButton
          variant="outline"
          size="icon"
          scPopoverTrigger
          class="relative"
          [attr.aria-label]="
            center.unreadCount()
              ? 'Notifications, ' + center.unreadCount() + ' unread'
              : 'Notifications'
          "
        >
          <svg siBellIcon></svg>
          @if (center.unreadCount()) {
            <span
              scBadge
              aria-hidden="true"
              class="absolute -end-1.5 -top-1.5 h-4 min-w-4 px-1 tabular-nums"
            >
              {{ center.unreadCount() }}
            </span>
          }
        </button>

        <ng-template scPopoverPortal>
          <div
            scPopover
            aria-label="Notifications"
            class="w-96 max-w-[calc(100vw-2rem)] p-0"
          >
            <div scNotificationCenterHeader>
              <h2 scNotificationCenterTitle>Notifications</h2>
              <button
                scButton
                variant="ghost"
                size="sm"
                scNotificationMarkAllRead
              >
                <svg siCheckCheckIcon></svg>
                Mark all as read
              </button>
            </div>

            <div class="px-4 pt-3">
              <div scNotificationFilters aria-label="Show">
                <button scNotificationFilter="all">All</button>
                <button scNotificationFilter="unread">Unread</button>
              </div>
            </div>

            @if (center.visible().length) {
              <ul scNotificationList class="max-h-96 overflow-y-auto p-2">
                @for (notice of center.visible(); track notice.id) {
                  <li [scNotification]="notice">
                    <span scNotificationUnread>
                      <span class="sr-only">Unread</span>
                    </span>
                    <span scNotificationIcon>
                      @if (notice.avatar) {
                        <img [src]="notice.avatar" alt="" />
                      } @else {
                        @switch (notice.type) {
                          @case ('success') {
                            <svg siCircleCheckIcon></svg>
                          }
                          @case ('warning') {
                            <svg siTriangleAlertIcon></svg>
                          }
                          @case ('error') {
                            <svg siCircleXIcon></svg>
                          }
                          @default {
                            <svg siInfoIcon></svg>
                          }
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
                      <div scNotificationActions>
                        @if (notice.action) {
                          <button scButton variant="outline" size="xs">
                            {{ notice.action }}
                          </button>
                        }
                        <button
                          scButton
                          variant="ghost"
                          size="xs"
                          scNotificationMarkRead
                        >
                          {{ notice.read ? 'Mark as unread' : 'Mark as read' }}
                        </button>
                      </div>
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
            } @else {
              <div scNotificationEmpty>
                <svg siBellOffIcon></svg>
                <p>Nothing here.</p>
              </div>
            }
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InboxNotificationCenterDemo {
  readonly notifications = signal<Notice[]>([
    {
      id: '1',
      title: 'Alice replied to your comment',
      description: 'Sounds good — let’s ship it on Friday.',
      type: 'message',
      timestamp: minutesAgo(4),
      read: false,
      avatar: 'https://i.pravatar.cc/80?u=alice',
      action: 'Reply',
    },
    {
      id: '2',
      title: 'Payment failed',
      description: 'Your card was declined. Update your billing details.',
      type: 'error',
      timestamp: minutesAgo(35),
      read: false,
      action: 'Update payment',
    },
    {
      id: '3',
      title: 'Storage almost full',
      description: 'You have used 90% of your space.',
      type: 'warning',
      timestamp: minutesAgo(180),
      read: false,
    },
    {
      id: '4',
      title: 'Weekly report ready',
      type: 'success',
      timestamp: minutesAgo(26 * 60),
      read: true,
    },
    {
      id: '5',
      title: 'Version 2.5 is out',
      description: 'New features and bug fixes.',
      type: 'info',
      timestamp: minutesAgo(9 * 24 * 60),
      read: true,
    },
  ]);
}`;
}

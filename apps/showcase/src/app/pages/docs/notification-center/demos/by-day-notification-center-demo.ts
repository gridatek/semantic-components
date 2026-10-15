import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  ScNotificationIcon,
  ScNotificationItem,
  ScNotificationList,
  ScNotificationMarkAllRead,
  ScNotificationSection,
  ScNotificationSectionTitle,
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

interface Day {
  readonly title: string;
  readonly notices: readonly Notice[];
}

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3600000);

/** Notifications in sections by day, as most apps show them. */
@Component({
  selector: 'app-by-day-notification-center-demo',
  imports: [
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
    ScNotificationIcon,
    ScNotificationItem,
    ScNotificationList,
    ScNotificationMarkAllRead,
    ScNotificationSection,
    ScNotificationSectionTitle,
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
      aria-labelledby="by-day-notifications-title"
      class="bg-card w-full max-w-md rounded-xl border"
    >
      <div scNotificationCenterHeader>
        <h2 scNotificationCenterTitle id="by-day-notifications-title">
          Activity
        </h2>
        <div class="flex items-center gap-1">
          <button size="icon-sm" scNotificationMarkAllRead>
            <svg siCheckCheckIcon></svg>
            <span class="sr-only">Mark all as read</span>
          </button>
          <button scNotificationClearAll>
            <svg siTrash2Icon></svg>
            <span class="sr-only">Clear all</span>
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
          @for (day of byDay(center.visible()); track day.title) {
            <div scNotificationSection>
              <h3 scNotificationSectionTitle>{{ day.title }}</h3>
              <ul scNotificationList>
                @for (notice of day.notices; track notice.id) {
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
                    <button scNotificationDismiss>
                      <svg siXIcon></svg>
                      <span class="sr-only">{{
                        'Dismiss ' + notice.title
                      }}</span>
                    </button>
                  </li>
                }
              </ul>
            </div>
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
export class ByDayNotificationCenterDemo {
  readonly notifications = signal<Notice[]>([
    {
      id: '1',
      title: 'New message from Alice',
      description: 'Are you free for a quick call this afternoon?',
      type: 'message',
      timestamp: hoursAgo(0.1),
      read: false,
    },
    {
      id: '2',
      title: 'Storage almost full',
      description: 'You have used 90% of your space.',
      type: 'warning',
      timestamp: hoursAgo(2),
      read: false,
    },
    {
      id: '3',
      title: 'Bob mentioned you',
      description: 'Great work on the new feature!',
      type: 'message',
      timestamp: hoursAgo(26),
      read: false,
    },
    {
      id: '4',
      title: 'Weekly report ready',
      type: 'success',
      timestamp: hoursAgo(30),
      read: true,
    },
    {
      id: '5',
      title: 'Version 2.5 is out',
      type: 'info',
      timestamp: hoursAgo(24 * 5),
      read: true,
    },
  ]);

  /** The notifications in days: Today, Yesterday, Earlier (empty ones left out). */
  byDay(notices: readonly Notice[]): Day[] {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const today = startOfToday.getTime();
    const yesterday = today - 24 * 3600000;
    const days: Day[] = [
      {
        title: 'Today',
        notices: notices.filter((n) => n.timestamp.getTime() >= today),
      },
      {
        title: 'Yesterday',
        notices: notices.filter((n) => {
          const t = n.timestamp.getTime();
          return t >= yesterday && t < today;
        }),
      },
      {
        title: 'Earlier',
        notices: notices.filter((n) => n.timestamp.getTime() < yesterday),
      },
    ];
    return days.filter((day) => day.notices.length);
  }
}

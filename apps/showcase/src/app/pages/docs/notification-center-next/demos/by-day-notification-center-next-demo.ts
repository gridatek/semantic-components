import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  type ScNotificationNext,
  ScNotificationNextCenter,
  ScNotificationNextCenterHeader,
  ScNotificationNextCenterTitle,
  ScNotificationNextClearAll,
  ScNotificationNextContent,
  ScNotificationNextDay,
  ScNotificationNextDescription,
  ScNotificationNextDismiss,
  ScNotificationNextEmpty,
  ScNotificationNextFilter,
  ScNotificationNextFilters,
  ScNotificationNextIcon,
  ScNotificationNextItem,
  ScNotificationNextList,
  ScNotificationNextMarkAllRead,
  ScNotificationNextSection,
  ScNotificationNextSectionTitle,
  ScNotificationNextTime,
  ScNotificationNextTitle,
  ScNotificationNextUnread,
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

interface Notice extends ScNotificationNext {
  readonly title: string;
  readonly description?: string;
}

const hoursAgo = (hours: number) =>
  Temporal.Now.instant().subtract({ minutes: Math.round(hours * 60) });

/** Notifications in sections by day, as most apps show them: days(), each titled by scNotificationNextDay. */
@Component({
  selector: 'app-by-day-notification-center-next-demo',
  imports: [
    ScNotificationNextCenter,
    ScNotificationNextCenterHeader,
    ScNotificationNextCenterTitle,
    ScNotificationNextClearAll,
    ScNotificationNextContent,
    ScNotificationNextDay,
    ScNotificationNextDescription,
    ScNotificationNextDismiss,
    ScNotificationNextEmpty,
    ScNotificationNextFilter,
    ScNotificationNextFilters,
    ScNotificationNextIcon,
    ScNotificationNextItem,
    ScNotificationNextList,
    ScNotificationNextMarkAllRead,
    ScNotificationNextSection,
    ScNotificationNextSectionTitle,
    ScNotificationNextTime,
    ScNotificationNextTitle,
    ScNotificationNextUnread,
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
      scNotificationNextCenter
      #center="scNotificationNextCenter"
      [(notifications)]="notifications"
      aria-labelledby="by-day-notifications-title"
      class="bg-card w-full max-w-md rounded-xl border"
    >
      <div scNotificationNextCenterHeader>
        <h2 scNotificationNextCenterTitle id="by-day-notifications-title">
          Activity
        </h2>
        <div class="flex items-center gap-1">
          <button size="icon-sm" scNotificationNextMarkAllRead>
            <svg siCheckCheckIcon></svg>
            <span class="sr-only">Mark all as read</span>
          </button>
          <button scNotificationNextClearAll>
            <svg siTrash2Icon></svg>
            <span class="sr-only">Clear all</span>
          </button>
        </div>
      </div>

      <div class="px-4 pt-3">
        <div scNotificationNextFilters aria-label="Show">
          <button scNotificationNextFilter="all">All</button>
          <button scNotificationNextFilter="unread">
            Unread ({{ center.unreadCount() }})
          </button>
        </div>
      </div>

      @if (center.visible().length) {
        <div class="p-2">
          @for (group of center.days(); track group.day.toString()) {
            <div scNotificationNextSection>
              <h3 scNotificationNextSectionTitle>
                <time [scNotificationNextDay]="group.day"></time>
              </h3>
              <ul scNotificationNextList>
                @for (notice of group.notifications; track notice.id) {
                  <li [scNotificationNext]="notice">
                    <span scNotificationNextUnread>
                      <span class="sr-only">Unread</span>
                    </span>
                    <span scNotificationNextIcon>
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
                    <div scNotificationNextContent>
                      <div class="flex items-start justify-between gap-2">
                        <p scNotificationNextTitle>{{ notice.title }}</p>
                        <time scNotificationNextTime></time>
                      </div>
                      @if (notice.description) {
                        <p scNotificationNextDescription>
                          {{ notice.description }}
                        </p>
                      }
                    </div>
                    <button scNotificationNextDismiss>
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
        <div scNotificationNextEmpty>
          <svg siBellOffIcon></svg>
          <p>You're all caught up.</p>
        </div>
      }
    </section>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ByDayNotificationCenterNextDemo {
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
    {
      id: '6',
      title: 'Welcome to the team',
      type: 'info',
      timestamp: hoursAgo(24 * 12),
      read: true,
    },
  ]);
}

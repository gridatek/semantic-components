import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { EmptyNotificationCenterDemoContainer } from './demos/empty-notification-center-demo-container';
import { GroupedNotificationCenterDemoContainer } from './demos/grouped-notification-center-demo-container';
import { InboxNotificationCenterDemoContainer } from './demos/inbox-notification-center-demo-container';

@Component({
  selector: 'app-notification-center-page',
  imports: [
    InboxNotificationCenterDemoContainer,
    GroupedNotificationCenterDemoContainer,
    EmptyNotificationCenterDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Notification Center</h1>
        <p class="text-muted-foreground">
          Notifications you put together from parts: the center holds them and
          their filter, the parts read and change it, and you write the rest —
          each notification's content, icons, texts and layout.
        </p>
        <app-component-badges path="notification-center" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Inbox</h2>
        <p class="text-muted-foreground">
          A bell with the unread count, opening the notifications in a popover:
          filters, mark all as read, and on each notification its action, mark
          as read and dismiss. Times are written in the app's language and kept
          up to date.
        </p>
        <app-inbox-notification-center-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Groups</h2>
        <p class="text-muted-foreground">
          Each notification's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">group</code>,
          shown with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >visibleIn(group)</code
          >. In a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scNotificationGroup</code
          >, mark all as read and clear all act on the group alone.
        </p>
        <app-grouped-notification-center-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Empty</h2>
        <p class="text-muted-foreground">
          When nothing matches the filter,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >scNotificationEmpty</code
          >
          holds what you write.
        </p>
        <app-empty-notification-center-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NotificationCenterPage {}

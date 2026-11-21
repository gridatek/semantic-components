import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ByDayNotificationCenterDemoContainer } from './demos/by-day-notification-center-demo-container';
import { NotificationCenterUsageDemoContainer } from './demos/notification-center-usage-demo-container';
import { RtlNotificationCenterDemoContainer } from './demos/rtl-notification-center-demo-container';

@Component({
  selector: 'app-notification-center-page',
  imports: [
    Anatomy,
    RouterLink,
    ScLink,
    ScTypeset,
    NotificationCenterUsageDemoContainer,
    ByDayNotificationCenterDemoContainer,
    RtlNotificationCenterDemoContainer,
    TocHeading,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Notification Center</h1>
        <p class="text-muted-foreground">
          A recipe: notifications behind a bell, or in a page section — a
          <a scLink routerLink="/docs/components/popover">Popover</a>, an
          <a scLink routerLink="/docs/components/item">Item</a> for each, a
          <a scLink routerLink="/docs/components/toggle-group">Toggle Group</a>
          to filter, the state in your signals. No component of its own.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-notification-center-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>How it is made</h2>
        <p>
          The notifications are a signal of yours — each with an id, a Temporal
          instant, read or not — and the rest is computed from it: the unread
          count on the bell (a Badge), what the filter shows. Marking read and
          dismissing are updates of that signal. Times are written in the
          locale: <code scTypeset>Intl.RelativeTimeFormat</code> («5 minutes
          ago», «yesterday»), the days from the reader&apos;s calendar.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The bell says the count in words («Notifications, 2 unread»); the
            Badge on it is hidden from screen readers.
          </li>
          <li>
            The list is a list; an unread one says so in words, not only by its
            dot; each button is named for its notification («Dismiss “New
            comment”»).
          </li>
          <li>
            The Popover&apos;s: focus moves in when it opens, and back to the
            bell when it closes.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-by-day-notification-center-demo-container />
        <app-rtl-notification-center-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NotificationCenterPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScPopoverProvider, ScPopoverTrigger, ScPopoverPortal, ScPopover, ScBadge,',
      '  ScToggleGroup, ScToggleGroupItem, ScItemGroup, ScItem, ScItemBody, ScItemTitle,',
      '  ScItemDescription, ScItemActions, ScEmpty,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scPopoverProvider>',
      '  <button scButton scPopoverTrigger>bell, «2 unread», <span scBadge>2</span></button>',
      '  <ng-template scPopoverPortal>',
      '    <div scPopover>',
      '      <div scToggleGroup [(value)]="filter">All · Unread</div>',
      '      <div scItemGroup role="list">',
      '        @for (notice of visible(); track notice.id) {',
      '          <div scItem role="listitem">',
      '            <div scItemBody>…</div>',
      '            <div scItemActions>Mark read · Dismiss</div>',
      '          </div>',
      '        }',
      '      </div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };
}

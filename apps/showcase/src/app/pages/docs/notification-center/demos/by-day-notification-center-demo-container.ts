import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ByDayNotificationCenterDemo } from './by-day-notification-center-demo';

@Component({
  selector: 'app-by-day-notification-center-demo-container',
  imports: [DemoContainer, ByDayNotificationCenterDemo],
  template: `
    <app-demo-container
      title="By day"
      [code]="code"
      demoUrl="/demos/notification-center/by-day-notification-center-demo"
    >
      <app-by-day-notification-center-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ByDayNotificationCenterDemoContainer {
  readonly code = `import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScFrame,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemTitle,
} from '@semantic-components/ui';

interface Notice {
  readonly id: string;
  readonly title: string;
  readonly at: Temporal.Instant;
}

/**
 * A page section, grouped by the reader's calendar day — Today, Yesterday,
 * then dates in the locale — with Clear all.
 */
@Component({
  selector: 'app-by-day-notification-center-demo',
  imports: [
    ScButton,
    ScFrame,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemTitle,
  ],
  template: \`
    <section
      scFrame
      aria-labelledby="activity-title"
      class="flex w-full max-w-md flex-col gap-4 p-4"
    >
      <div class="flex items-center justify-between">
        <h3 id="activity-title" class="font-semibold">Activity</h3>
        <button
          scButton
          variant="ghost"
          size="sm"
          [disabled]="!notifications().length"
          (click)="notifications.set([])"
        >
          Clear all
        </button>
      </div>
      @for (day of days(); track day.label) {
        <section [attr.aria-label]="day.label" class="flex flex-col gap-1">
          <h4
            class="text-muted-foreground text-xs font-medium first-letter:uppercase"
          >
            {{ day.label }}
          </h4>
          <div scItemGroup role="list">
            @for (notice of day.notices; track notice.id) {
              <div scItem size="sm" role="listitem">
                <div scItemBody>
                  <div scItemTitle>{{ notice.title }}</div>
                  <p scItemDescription>
                    <time [attr.datetime]="notice.at.toString()">{{
                      time(notice.at)
                    }}</time>
                  </p>
                </div>
              </div>
            }
          </div>
        </section>
      } @empty {
        <p class="text-muted-foreground text-sm">Nothing yet.</p>
      }
    </section>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ByDayNotificationCenterDemo {
  private readonly locale = inject(LOCALE_ID);
  private readonly zone = Temporal.Now.timeZoneId();
  private readonly now = Temporal.Now.instant();
  private readonly relative = new Intl.RelativeTimeFormat(this.locale, {
    numeric: 'auto',
  });

  private readonly notifications = signal<readonly Notice[]>([
    {
      id: '1',
      title: 'Grace joined the team',
      at: this.now.subtract({ minutes: 20 }),
    },
    {
      id: '2',
      title: 'Weekly report ready',
      at: this.now.subtract({ hours: 3 }),
    },
    {
      id: '3',
      title: 'Password changed',
      at: this.now.subtract({ hours: 30 }),
    },
    {
      id: '4',
      title: 'New sign-in from Lisbon',
      at: this.now.subtract({ hours: 80 }),
    },
  ]);

  /** The notifications by calendar day, latest first. */
  private readonly days = computed(() => {
    const today = this.now.toZonedDateTimeISO(this.zone).toPlainDate();
    const groups = new Map<string, Notice[]>();
    for (const notice of this.notifications()) {
      const day = notice.at.toZonedDateTimeISO(this.zone).toPlainDate();
      const ago = today.since(day, { largestUnit: 'day' }).days;
      const label =
        ago < 2
          ? this.relative.format(-ago, 'day')
          : day.toLocaleString(this.locale, { dateStyle: 'medium' });
      groups.set(label, [...(groups.get(label) ?? []), notice]);
    }
    return [...groups].map(([label, notices]) => ({ label, notices }));
  });

  private time(at: Temporal.Instant): string {
    return at
      .toZonedDateTimeISO(this.zone)
      .toLocaleString(this.locale, { timeStyle: 'short' });
  }
}`;
}

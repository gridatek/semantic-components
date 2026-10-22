import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_NOTIFICATION_NEXT } from './notification-next';
import { SC_NOTIFICATION_NEXT_CENTER } from './notification-next-center';

/**
 * When the notification happened, in the app's language: "now", "5 minutes
 * ago", "yesterday" — a date after a week. Kept up to date every minute; the
 * exact time is its `datetime`.
 */
@Directive({
  selector: 'time[scNotificationNextTime]',
  host: {
    'data-slot': 'notification-time',
    '[attr.datetime]': 'iso()',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScNotificationNextTime {
  private readonly center = inject(SC_NOTIFICATION_NEXT_CENTER);
  private readonly item = inject(SC_NOTIFICATION_NEXT);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly iso = computed(() =>
    this.item.notification().timestamp.toString(),
  );

  protected readonly text = computed(() => {
    const then = this.item.notification().timestamp;
    const minutes = Math.round(
      (then.epochMilliseconds - this.center.now().epochMilliseconds) / 60000,
    );
    const relative = new Intl.RelativeTimeFormat(this.locale, {
      numeric: 'auto',
    });
    if (minutes > -60) return relative.format(minutes, 'minute');
    if (minutes > -24 * 60) {
      return relative.format(Math.round(minutes / 60), 'hour');
    }
    if (minutes > -7 * 24 * 60) {
      return relative.format(Math.round(minutes / (24 * 60)), 'day');
    }
    return then.toLocaleString(this.locale, {
      month: 'short',
      day: 'numeric',
    });
  });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-xs whitespace-nowrap', this.classInput()),
  );
}

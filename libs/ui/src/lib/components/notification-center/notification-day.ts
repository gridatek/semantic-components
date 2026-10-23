import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/**
 * A day, as a section's title, in the app's language: "Today", "Yesterday",
 * the weekday within a week, then the date (with its year, if not this
 * one's). Follows midnight; the day itself is its `datetime`.
 */
@Directive({
  selector: 'time[scNotificationDay]',
  host: {
    'data-slot': 'notification-day',
    '[attr.datetime]': 'day().toString()',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScNotificationDay {
  private readonly center = inject(SC_NOTIFICATION_CENTER);
  private readonly locale = inject(LOCALE_ID);

  readonly day = input.required<Temporal.PlainDate>({
    alias: 'scNotificationDay',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly text = computed(() => {
    const day = this.day();
    const today = this.center
      .now()
      .toZonedDateTimeISO(Temporal.Now.timeZoneId())
      .toPlainDate();
    const ago = day.until(today).days;
    if (ago >= 0 && ago < 2) {
      return new Intl.RelativeTimeFormat(this.locale, {
        numeric: 'auto',
      }).format(-ago, 'day');
    }
    if (ago > 0 && ago < 7) {
      return day.toLocaleString(this.locale, { weekday: 'long' });
    }
    return day.toLocaleString(this.locale, {
      month: 'long',
      day: 'numeric',
      year: day.year === today.year ? undefined : 'numeric',
    });
  });

  // A title: its first letter up ("today" → "Today"), where the language has one.
  protected readonly class = computed(() =>
    cn('inline-block first-letter:uppercase', this.classInput()),
  );
}

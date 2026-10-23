import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScScheduler } from './scheduler';
import { SC_SCHEDULER_EVENT } from './scheduler-types';

/**
 * The event's times, written in the app's language ("9:00 – 10:30 AM"), in
 * the scheduler's time zone. Nothing for an all-day event.
 */
@Directive({
  selector: 'time[scSchedulerEventTime]',
  host: {
    'data-slot': 'scheduler-event-time',
    '[attr.datetime]': 'datetime()',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScSchedulerEventTime {
  private readonly context = inject(SC_SCHEDULER_EVENT);
  private readonly scheduler = inject(ScScheduler);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly start = computed(() =>
    this.context.event.start.withTimeZone(this.scheduler.timeZone()),
  );

  protected readonly datetime = computed(() =>
    this.start().toPlainDateTime().toString({ smallestUnit: 'minute' }),
  );

  protected readonly text = computed(() => {
    const { event } = this.context;
    if (event.allDay) return '';
    const format = new Intl.DateTimeFormat(this.locale, {
      hour: 'numeric',
      minute: '2-digit',
    });
    const start = this.start().toPlainTime();
    const end = event.end.withTimeZone(this.scheduler.timeZone()).toPlainTime();
    // A line in a month's day: when it starts. Elsewhere: from – to.
    return this.context.place === 'month'
      ? format.format(start)
      : format.formatRange(start, end);
  });

  protected readonly class = computed(() =>
    cn('tabular-nums opacity-80', this.classInput()),
  );
}

import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScScheduler } from './scheduler';
import { isBar } from './scheduler-layout';
import { SC_SCHEDULER_EVENT } from './scheduler-types';

/**
 * The event's times, written in the app's language, in the scheduler's time
 * zone: "9:00 – 10:30 AM"; over days, "Oct 12, 9:00 PM – Oct 13, 1:00 AM";
 * a month's line, when it starts. Nothing for an all-day event, nor on a
 * month's bar (its place says its days).
 */
@Directive({
  selector: 'time[scSchedulerEventTime]',
  host: {
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
    this.context.event.start
      .withTimeZone(this.scheduler.timeZone())
      .toPlainDateTime(),
  );
  private readonly end = computed(() =>
    this.context.event.end
      .withTimeZone(this.scheduler.timeZone())
      .toPlainDateTime(),
  );

  private readonly datetime = computed(() =>
    this.start().toString({ smallestUnit: 'minute' }),
  );

  private readonly text = computed(() => {
    const { event, place } = this.context;
    if (event.allDay) return '';
    const bar = isBar(event, this.scheduler.timeZone());
    if (place === 'month') {
      return bar
        ? ''
        : new Intl.DateTimeFormat(this.locale, {
            hour: 'numeric',
            minute: '2-digit',
          }).format(this.start());
    }
    const format = new Intl.DateTimeFormat(this.locale, {
      ...(bar ? { month: 'short', day: 'numeric' } : {}),
      hour: 'numeric',
      minute: '2-digit',
    });
    return bar
      ? format.formatRange(this.start(), this.end())
      : format.formatRange(
          this.start().toPlainTime(),
          this.end().toPlainTime(),
        );
  });

  private readonly class = computed(() =>
    cn('tabular-nums opacity-80', this.classInput()),
  );
}

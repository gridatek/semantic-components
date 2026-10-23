import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** A moment the time part can write. */
export type ScTimelineMoment =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.ZonedDateTime
  | Temporal.Instant;

/**
 * When it happened: your `time`, its text written in the app's language and
 * its `datetime` set, from a Temporal value — `[value]`. Dates show as dates
 * (`dateStyle: 'medium'`), moments with their time; `options` to choose.
 */
@Directive({
  selector: 'time[scTimelineTime]',
  host: {
    'data-slot': 'timeline-time',
    '[attr.datetime]': 'datetime()',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScTimelineTime {
  private readonly locale = inject(LOCALE_ID);

  readonly value = input.required<ScTimelineMoment>();
  /** How it is written (Intl.DateTimeFormat options). */
  readonly options = input<Intl.DateTimeFormatOptions>();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly text = computed(() => {
    const value = this.value();
    const dateOnly = value instanceof Temporal.PlainDate;
    return value.toLocaleString(
      this.locale,
      this.options() ??
        (dateOnly
          ? { dateStyle: 'medium' }
          : { dateStyle: 'medium', timeStyle: 'short' }),
    );
  });

  /** A valid `datetime`: a zoned moment, as its instant. */
  protected readonly datetime = computed(() => {
    const value = this.value();
    return value instanceof Temporal.ZonedDateTime
      ? value.toInstant().toString()
      : value.toString();
  });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-xs', this.classInput()),
  );
}

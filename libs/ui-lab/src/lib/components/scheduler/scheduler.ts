import {
  DestroyRef,
  Directive,
  LOCALE_ID,
  afterNextRender,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSchedulerEventTemplate } from './scheduler-event-template';
import { daysFrom, monthWeeks, startOfWeek } from './scheduler-layout';
import { ScSchedulerMoreTemplate } from './scheduler-more-template';
import type { ScSchedulerEventData, ScSchedulerView } from './scheduler-types';

/** The locale's first day of the week (1 = Monday … 7 = Sunday), Monday if unknown. */
function firstDayOf(locale: string): number {
  const info = new Intl.Locale(locale) as unknown as {
    getWeekInfo?: () => { firstDay: number };
    weekInfo?: { firstDay: number };
  };
  return info.getWeekInfo?.().firstDay ?? info.weekInfo?.firstDay ?? 1;
}

/**
 * A scheduler: its events, the view (month, week, day) and the date it shows.
 * Put its parts inside — the toolbar's buttons and title, a view
 * (`scSchedulerMonth`, `scSchedulerTimeGrid`), and how an event looks
 * (`scSchedulerEventTemplate`).
 */
@Directive({
  selector: '[scScheduler]',
  exportAs: 'scScheduler',
  host: {
    'data-slot': 'scheduler',
    '[attr.data-view]': 'view()',
    '[class]': 'class()',
  },
})
export class ScScheduler<
  T extends ScSchedulerEventData = ScSchedulerEventData,
> {
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly events = input<readonly T[]>([]);
  readonly view = model<ScSchedulerView>('week');
  /** The date shown: its month, its week, or itself. */
  readonly date = model<Temporal.PlainDate>(Temporal.Now.plainDateISO());
  /** Where the events are placed (the user's own by default). */
  readonly timeZone = input<string>(Temporal.Now.timeZoneId());
  /** 1 = Monday … 7 = Sunday; the locale's by default. */
  readonly firstDayOfWeek = input<number>(firstDayOf(this.locale));

  /** How an event looks: your `scSchedulerEventTemplate`. */
  readonly eventTemplate = contentChild(ScSchedulerEventTemplate, {
    descendants: true,
  });
  /** A month's day's "more": your `scSchedulerMoreTemplate`. */
  readonly moreTemplate = contentChild(ScSchedulerMoreTemplate, {
    descendants: true,
  });

  /** Now, in the time zone, moving on every minute. */
  readonly now = computed(() =>
    this.clock().toZonedDateTimeISO(this.timeZone()),
  );
  readonly today = computed(() => this.now().toPlainDate());
  private readonly clock = signal(Temporal.Now.instant());

  /** The weeks shown in the month view. */
  readonly weeks = computed(() =>
    monthWeeks(this.date(), this.firstDayOfWeek()),
  );

  /** The days shown: the month's weeks, the week, or the day. */
  readonly days = computed(() => {
    switch (this.view()) {
      case 'month':
        return this.weeks().flat();
      case 'week':
        return daysFrom(startOfWeek(this.date(), this.firstDayOfWeek()), 7);
      case 'day':
        return [this.date()];
    }
  });

  /** What is shown, in the app's language: "October 2026", "Oct 12 – 18, 2026"… */
  readonly label = computed(() => {
    const date = this.date();
    switch (this.view()) {
      case 'month':
        return date.toLocaleString(this.locale, {
          month: 'long',
          year: 'numeric',
        });
      case 'week': {
        const days = this.days();
        return new Intl.DateTimeFormat(this.locale, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).formatRange(days[0], days[days.length - 1]);
      }
      case 'day':
        return date.toLocaleString(this.locale, { dateStyle: 'full' });
    }
  });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-4', this.classInput()),
  );

  constructor() {
    // In the browser only: the server renders the time once.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const timer = setInterval(
        () => this.clock.set(Temporal.Now.instant()),
        60_000,
      );
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  /** The month, week or day before. */
  previous(): void {
    this.date.update((date) => date.subtract(this.step()));
  }

  /** The month, week or day after. */
  next(): void {
    this.date.update((date) => date.add(this.step()));
  }

  goToToday(): void {
    this.date.set(this.today());
  }

  /** Shows `date`, in `view` if given. */
  goTo(date: Temporal.PlainDate, view?: ScSchedulerView): void {
    this.date.set(date);
    if (view) this.view.set(view);
  }

  private step(): Temporal.DurationLike {
    switch (this.view()) {
      case 'month':
        return { months: 1 };
      case 'week':
        return { weeks: 1 };
      case 'day':
        return { days: 1 };
    }
  }
}

import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  LOCALE_ID,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import {
  type ScFirstDayOfWeek,
  injectDisplayLocale,
  ɵchosenFirstDayOfWeek,
  ɵweekStart,
} from '../../utils';
import { ScSchedulerEventTemplate } from './scheduler-event-template';
import { daysFrom, monthWeeks, startOfWeek } from './scheduler-layout';
import { ScSchedulerMoreTemplate } from './scheduler-more-template';
import type {
  ScSchedulerEventChange,
  ScSchedulerEventData,
  ScSchedulerSlot,
  ScSchedulerView,
} from './scheduler-types';

/** The locale's first day of the week (1 = Monday … 7 = Sunday), Monday if unknown. */
/**
 * A scheduler: its events, the view (month, week, day, agenda) and the date
 * it shows. Put its parts inside — the toolbar's buttons and title, a view
 * (`scSchedulerMonth`, `scSchedulerTimeGrid`, `scSchedulerAgenda`), and how
 * an event looks (`scSchedulerEventTemplate`).
 *
 * `pickable`: an empty day or time picked (a click, a drag, the keys) is
 * emitted (`slotPick`) for you to create an event. `editable`: events dragged
 * or moved by the keys are emitted (`eventChange`) for you to save — the
 * scheduler shows `events`, so it moves once you do.
 */
@Directive({
  selector: 'div[scScheduler]',
  exportAs: 'scScheduler',
  host: {
    '[attr.data-view]': 'view()',
    '[class]': 'class()',
  },
})
export class ScScheduler<
  T extends ScSchedulerEventData = ScSchedulerEventData,
> {
  private readonly locale = inject(LOCALE_ID);
  /** What it shows: the locale, in the user's numbering system. */
  private readonly displayLocale = injectDisplayLocale();
  private readonly announcer = inject(LiveAnnouncer);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly events = input<readonly T[]>([]);
  readonly view = model<ScSchedulerView>('week');
  /** The date shown: its month, its week, or itself. */
  readonly date = model<Temporal.PlainDate>(Temporal.Now.plainDateISO());
  /** Where the events are placed (the user's own by default). */
  readonly timeZone = input<string>(Temporal.Now.timeZoneId());
  /**
   * The week's first day, `'mon'` … `'sun'` — unless the user chose one
   * (`injectFirstDayOfWeek()`); left out, the locale's.
   */
  readonly firstDayOfWeek = input<ScFirstDayOfWeek | undefined>(undefined);
  /** The week's first day as Temporal counts it, 1 (Monday) – 7 (Sunday). */
  readonly weekStart = computed(() =>
    ɵweekStart(this.locale, this.chosenWeekStart() ?? this.firstDayOfWeek()),
  );
  /** The user's first day, once chosen: before the part's. */
  private readonly chosenWeekStart = ɵchosenFirstDayOfWeek();
  /** Empty days and times can be picked: `slotPick`. */
  readonly pickable = input(false, { transform: booleanAttribute });
  /** Events can be moved and resized: `eventChange`. */
  readonly editable = input(false, { transform: booleanAttribute });
  /** The step of times picked, moved and resized, in minutes. */
  readonly slotMinutes = input(30);

  /** An empty slot picked: create an event there. */
  readonly slotPick = output<ScSchedulerSlot>();
  /** An event moved or resized: save its new times. */
  readonly eventChange = output<ScSchedulerEventChange<T>>();

  /** How an event looks: your `scSchedulerEventTemplate`. */
  readonly eventTemplate = contentChild(ScSchedulerEventTemplate, {
    descendants: true,
  });
  /** A crowded day's "more": your `scSchedulerMoreTemplate`. */
  readonly moreTemplate = contentChild(ScSchedulerMoreTemplate, {
    descendants: true,
  });

  /** Now, in the time zone, moving on every minute. */
  readonly now = computed(() =>
    this.clock().toZonedDateTimeISO(this.timeZone()),
  );
  readonly today = computed(() => this.now().toPlainDate());
  private readonly clock = signal(Temporal.Now.instant());

  /** @internal An event being dragged: where it would go. */
  readonly preview = signal<{
    id: string;
    start: Temporal.ZonedDateTime;
    end: Temporal.ZonedDateTime;
  } | null>(null);
  /** @internal An event moved by the keys, to focus again once placed. */
  readonly refocus = signal<string | null>(null);

  /** The events as shown: the one dragged where it would go. */
  readonly shownEvents = computed((): readonly T[] => {
    const preview = this.preview();
    const events = this.events();
    if (!preview) return events;
    return events.map((event) =>
      event.id === preview.id
        ? { ...event, start: preview.start, end: preview.end }
        : event,
    );
  });

  /** The weeks shown in the month view. */
  readonly weeks = computed(() => monthWeeks(this.date(), this.weekStart()));

  /** The days shown: the month's weeks, the week, the day, or the month's days (agenda). */
  readonly days = computed(() => {
    const date = this.date();
    switch (this.view()) {
      case 'month':
        return this.weeks().flat();
      case 'week':
        return daysFrom(startOfWeek(date, this.weekStart()), 7);
      case 'day':
        return [date];
      case 'agenda':
        return daysFrom(date.with({ day: 1 }), date.daysInMonth);
    }
  });

  /** What is shown, in the app's language: "October 2026", "Oct 12 – 18, 2026"… */
  readonly label = computed(() => {
    const date = this.date();
    switch (this.view()) {
      case 'month':
      case 'agenda':
        return date.toLocaleString(this.displayLocale(), {
          month: 'long',
          year: 'numeric',
        });
      case 'week': {
        const days = this.days();
        return new Intl.DateTimeFormat(this.displayLocale(), {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).formatRange(days[0], days[days.length - 1]);
      }
      case 'day':
        return date.toLocaleString(this.displayLocale(), { dateStyle: 'full' });
    }
  });

  private readonly class = computed(() =>
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

  /** @internal A slot picked (a view's click, drag or keys). */
  pick(slot: ScSchedulerSlot): void {
    if (!this.pickable()) return;
    this.slotPick.emit(slot);
  }

  /**
   * @internal An event moved or resized (a drag, the keys): emitted, and its
   * new times said to screen readers; `refocus` keeps the keyboard on it.
   */
  change(
    id: string,
    start: Temporal.ZonedDateTime,
    end: Temporal.ZonedDateTime,
    refocus = false,
  ): void {
    this.preview.set(null);
    const event = this.events().find((e) => e.id === id);
    if (!event || !this.editable()) return;
    if (
      Temporal.ZonedDateTime.compare(event.start, start) === 0 &&
      Temporal.ZonedDateTime.compare(event.end, end) === 0
    ) {
      return;
    }
    if (refocus) this.refocus.set(id);
    this.eventChange.emit({ event, start, end });
    this.announcer.announce(this.describe(start, end, !!event.allDay));
  }

  /** A time range in the app's language: "Tue, Oct 14, 10:30 – 12:00 PM". */
  describe(
    start: Temporal.ZonedDateTime,
    end: Temporal.ZonedDateTime,
    allDay: boolean,
  ): string {
    const zone = this.timeZone();
    const from = start.withTimeZone(zone).toPlainDateTime();
    const to = end.withTimeZone(zone).toPlainDateTime();
    if (allDay) {
      return new Intl.DateTimeFormat(this.displayLocale(), {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).formatRange(
        from.toPlainDate(),
        to.toPlainDate().subtract({ days: 1 }),
      );
    }
    return new Intl.DateTimeFormat(this.displayLocale(), {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).formatRange(from, to);
  }

  private step(): Temporal.DurationLike {
    switch (this.view()) {
      case 'month':
      case 'agenda':
        return { months: 1 };
      case 'week':
        return { weeks: 1 };
      case 'day':
        return { days: 1 };
    }
  }
}

import {
  Component,
  ElementRef,
  Injector,
  LOCALE_ID,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScCalendarDay } from './calendar-day';
import { ScCalendarMonth } from './calendar-month';
import { ScCalendarMonths } from './calendar-months';
import { ScCalendarYears } from './calendar-years';

export type ScCalendarMode = 'single' | 'multiple' | 'range';
export type ScCalendarView = 'day' | 'month' | 'year';

/** A range: from a day to a day — the second missing while it is picked. */
export interface ScCalendarRange {
  readonly from: Temporal.PlainDate | undefined;
  readonly to: Temporal.PlainDate | undefined;
}

/** A day (single), days (multiple), or a range — by `mode`; null: none. */
export type ScCalendarValue =
  Temporal.PlainDate | readonly Temporal.PlainDate[] | ScCalendarRange | null;

/**
 * A calendar: days, months and years, in the app's language — every word
 * from `Intl` — its week as the locale has it. One Tab stop: the focused
 * day; arrows, Home and End, PageUp and PageDown (with Shift, years) move
 * it, across months. A `[formField]`.
 */
@Component({
  selector: 'div[scCalendar]',
  exportAs: 'scCalendar',
  imports: [ScCalendarMonth, ScCalendarMonths, ScCalendarYears],
  template: `
    <ng-content select="[scCalendarHeader]" />
    <!-- What the heading says, said when it changes. -->
    <div class="sr-only" aria-live="polite">{{ heading() }}</div>

    @switch (view()) {
      @case ('day') {
        <div class="flex flex-col gap-4 sm:flex-row">
          @for (month of months(); track month.toString()) {
            <div scCalendarMonth [month]="month" class="flex flex-col gap-2">
              @if (months().length > 1) {
                <div class="text-center text-sm font-medium" aria-hidden="true">
                  {{ monthHeading(month) }}
                </div>
              }
            </div>
          }
        </div>
      }
      @case ('month') {
        <div scCalendarMonths></div>
      }
      @case ('year') {
        <div scCalendarYears></div>
      }
    }

    <ng-content select="[scCalendarFooter]" />
  `,
  host: {
    'data-slot': 'calendar',
    role: 'group',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-invalid]': '(invalid() && touched()) || null',
    '(focusout)': 'onFocusOut($event)',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendar implements FormValueControl<ScCalendarValue> {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly injector = inject(Injector);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly value = model<ScCalendarValue>(null);
  readonly mode = input<ScCalendarMode>('single');
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);
  /** Days that cannot be picked: booked, weekends… */
  readonly unavailable = input<(date: Temporal.PlainDate) => boolean>(
    () => false,
  );
  /** The language of its words; the app's by default. */
  readonly locale = input(inject(LOCALE_ID));
  /** The week's first day, 1 (Monday) – 7 (Sunday); the locale's by default. */
  readonly firstDayOfWeek = input<number | undefined>(undefined);
  readonly numberOfMonths = input(1);
  readonly showOutsideDays = input(true, { transform: booleanAttribute });
  /** Always six weeks: the height holds still from month to month. */
  readonly fixedWeeks = input(false, { transform: booleanAttribute });
  readonly showWeekNumbers = input(false, { transform: booleanAttribute });
  /** The view it opens on. */
  readonly startView = input<ScCalendarView>('day');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** Your content for a day (`ng-template scCalendarDay`). */
  readonly dayTemplate = contentChild(ScCalendarDay);

  readonly view = linkedSignal(() => this.startView());
  /** Where it opens: the (first) day picked, or today — within min and max. */
  private readonly initial = computed(() => {
    const value = this.value();
    const first =
      value instanceof Temporal.PlainDate
        ? value
        : Array.isArray(value)
          ? (value as readonly Temporal.PlainDate[])[0]
          : (value as ScCalendarRange | null)?.from;
    return this.clamp(first ?? Temporal.Now.plainDateISO());
  });
  /** The focused day — the Tab stop. */
  readonly focused = linkedSignal<Temporal.PlainDate>(() => this.initial());
  /** The first month shown: kept while the value stays in sight. */
  readonly first = linkedSignal<Temporal.PlainDate, Temporal.PlainYearMonth>({
    source: () => this.initial(),
    computation: (initial, previous) => {
      const month = initial.toPlainYearMonth();
      if (!previous) return month;
      const last = previous.value.add({ months: this.numberOfMonths() - 1 });
      const shown =
        Temporal.PlainYearMonth.compare(month, previous.value) >= 0 &&
        Temporal.PlainYearMonth.compare(month, last) <= 0;
      return shown ? previous.value : month;
    },
  });
  /** A range being picked: the day the pointer or focus is on. */
  readonly hovered = signal<Temporal.PlainDate | null>(null);

  readonly today = signal(Temporal.Now.plainDateISO());

  /** The months shown. */
  readonly months = computed(() =>
    Array.from({ length: Math.max(1, this.numberOfMonths()) }, (_, i) =>
      this.first().add({ months: i }),
    ),
  );

  /** The week's first day, 1–7, as the locale has it. */
  readonly weekStart = computed(() => {
    const given = this.firstDayOfWeek();
    if (given) return given;
    const locale = new Intl.Locale(this.locale()) as Intl.Locale & {
      getWeekInfo?: () => { firstDay: number };
      weekInfo?: { firstDay: number };
    };
    return locale.getWeekInfo?.().firstDay ?? locale.weekInfo?.firstDay ?? 7;
  });

  /** What is shown: the month(s), the year, or the years. */
  readonly heading = computed(() => {
    const locale = this.locale();
    const view = this.view();
    const first = this.first();
    if (view === 'year') {
      const start = this.decadeStart();
      return `${start} – ${start + 11}`;
    }
    if (view === 'month') return String(first.year);
    const months = this.months();
    const last = months[months.length - 1];
    const label = (month: Temporal.PlainYearMonth) =>
      month.toPlainDate({ day: 1 }).toLocaleString(locale, {
        month: 'long',
        year: 'numeric',
      });
    if (months.length === 1) return label(first);
    // "October – November 2026"; across a year, both years.
    const firstLabel =
      first.year === last.year
        ? first
            .toPlainDate({ day: 1 })
            .toLocaleString(locale, { month: 'long' })
        : label(first);
    return `${firstLabel} – ${label(last)}`;
  });

  /** The year view's first year: twelve at a time. */
  readonly decadeStart = linkedSignal(
    () => Math.floor(this.focused().year / 12) * 12,
  );

  protected readonly class = computed(() =>
    cn(
      'bg-background flex w-fit flex-col gap-4 p-3',
      this.disabled() && 'pointer-events-none opacity-50',
      this.classInput(),
    ),
  );

  monthHeading(month: Temporal.PlainYearMonth): string {
    return month.toPlainDate({ day: 1 }).toLocaleString(this.locale(), {
      month: 'long',
      year: 'numeric',
    });
  }

  // ── State of a day ───────────────────────────────────────────────────

  isUnavailable(date: Temporal.PlainDate): boolean {
    return !this.inRange(date) || this.unavailable()(date);
  }

  inRange(date: Temporal.PlainDate): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    return (
      (!min || Temporal.PlainDate.compare(date, min) >= 0) &&
      (!max || Temporal.PlainDate.compare(date, max) <= 0)
    );
  }

  isSelected(date: Temporal.PlainDate): boolean {
    const value = this.value();
    if (!value) return false;
    if (value instanceof Temporal.PlainDate) return value.equals(date);
    if (Array.isArray(value)) {
      return (value as readonly Temporal.PlainDate[]).some((d) =>
        d.equals(date),
      );
    }
    const { from, to } = value as ScCalendarRange;
    if (!from) return false;
    if (!to) return from.equals(date);
    return between(date, from, to, true);
  }

  /** Where a day stands in the range — picked, or previewed. */
  rangePart(
    date: Temporal.PlainDate,
  ): 'start' | 'middle' | 'end' | 'preview' | null {
    if (this.mode() !== 'range') return null;
    const range = this.value() as ScCalendarRange | null;
    if (!range?.from) return null;
    if (range.to) {
      if (date.equals(range.from)) return 'start';
      if (date.equals(range.to)) return 'end';
      return between(date, range.from, range.to, false) ? 'middle' : null;
    }
    const hovered = this.hovered();
    if (date.equals(range.from)) return 'start';
    if (!hovered) return null;
    const [a, b] =
      Temporal.PlainDate.compare(hovered, range.from) < 0
        ? [hovered, range.from]
        : [range.from, hovered];
    return between(date, a, b, true) ? 'preview' : null;
  }

  // ── Doing ────────────────────────────────────────────────────────────

  /** Picks a day, as the mode has it. */
  select(date: Temporal.PlainDate): void {
    if (this.disabled() || this.isUnavailable(date)) return;
    this.focused.set(date);
    const mode = this.mode();
    if (mode === 'single') {
      this.value.set(date);
    } else if (mode === 'multiple') {
      const days = (this.value() as readonly Temporal.PlainDate[]) ?? [];
      this.value.set(
        days.some((d) => d.equals(date))
          ? days.filter((d) => !d.equals(date))
          : [...days, date],
      );
    } else {
      const range = this.value() as ScCalendarRange | null;
      if (!range?.from || range.to) {
        this.value.set({ from: date, to: undefined });
      } else if (Temporal.PlainDate.compare(date, range.from) < 0) {
        this.value.set({ from: date, to: range.from });
      } else {
        this.value.set({ from: range.from, to: date });
      }
      this.hovered.set(null);
    }
  }

  clear(): void {
    this.value.set(null);
  }

  /** Today: shown, focused, picked. */
  goToToday(): void {
    const today = Temporal.Now.plainDateISO();
    this.view.set('day');
    this.moveTo(today, false);
    this.select(today);
  }

  /** The heading: days → months → years. */
  zoomOut(): void {
    this.view.update((view) => (view === 'day' ? 'month' : 'year'));
  }

  previous(): void {
    this.page(-1);
  }

  next(): void {
    this.page(1);
  }

  private page(by: number): void {
    const view = this.view();
    if (view === 'year') {
      this.decadeStart.update((start) => start + by * 12);
      return;
    }
    const step = view === 'month' ? { years: by } : { months: by };
    this.first.update((first) => first.add(step));
    this.focused.update((date) => this.clamp(date.add(step)));
  }

  /** A month picked in the month view: its days. */
  pickMonth(month: Temporal.PlainYearMonth): void {
    this.moveTo(this.focused().with({ year: month.year, month: month.month }));
    this.view.set('day');
  }

  /** A year picked in the year view: its months. */
  pickYear(year: number): void {
    this.moveTo(this.focused().with({ year }));
    this.view.set('month');
  }

  /**
   * Moves the focused day (within min and max); the shown months follow.
   * `focus`: the keyboard's — focus goes there once drawn.
   */
  moveTo(date: Temporal.PlainDate, focus = false): void {
    const target = this.clamp(date);
    this.focused.set(target);
    const month = target.toPlainYearMonth();
    const months = this.months();
    const first = months[0];
    const last = months[months.length - 1];
    if (Temporal.PlainYearMonth.compare(month, first) < 0) {
      this.first.set(month);
    } else if (Temporal.PlainYearMonth.compare(month, last) > 0) {
      this.first.set(month.subtract({ months: months.length - 1 }));
    }
    if (this.mode() === 'range') this.hovered.set(target);
    if (focus) this.focusCell();
  }

  /** Focus on the focused cell, once drawn — in whichever view. */
  focusCell(): void {
    afterNextRender(
      () =>
        this.host
          .querySelector<HTMLElement>(
            '[data-slot^="calendar-cell"][tabindex="0"]',
          )
          ?.focus(),
      { injector: this.injector },
    );
  }

  /** The days' keys: arrows, Home, End, PageUp, PageDown; Enter or Space picks. */
  onDayKeydown(event: KeyboardEvent): void {
    const date = this.focused();
    const rtl = getComputedStyle(this.host).direction === 'rtl';
    const start = this.weekStart();
    const intoWeek = (date.dayOfWeek - start + 7) % 7;
    const page = event.shiftKey ? { years: 1 } : { months: 1 };
    const moves: Record<string, () => Temporal.PlainDate> = {
      ArrowLeft: () => date.add({ days: rtl ? 1 : -1 }),
      ArrowRight: () => date.add({ days: rtl ? -1 : 1 }),
      ArrowUp: () => date.subtract({ days: 7 }),
      ArrowDown: () => date.add({ days: 7 }),
      Home: () => date.subtract({ days: intoWeek }),
      End: () => date.add({ days: 6 - intoWeek }),
      PageUp: () => date.subtract(page),
      PageDown: () => date.add(page),
    };
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.select(date);
      return;
    }
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    this.moveTo(move(), true);
  }

  protected onFocusOut(event: FocusEvent): void {
    const to = event.relatedTarget as Node | null;
    if (!to || !this.host.contains(to)) {
      this.hovered.set(null);
      this.touch.emit();
    }
  }

  /** Within min and max. */
  private clamp(date: Temporal.PlainDate): Temporal.PlainDate {
    const min = this.minDate();
    const max = this.maxDate();
    if (min && Temporal.PlainDate.compare(date, min) < 0) return min;
    if (max && Temporal.PlainDate.compare(date, max) > 0) return max;
    return date;
  }
}

/** `date` between `a` and `b` (ends counted, or not). */
function between(
  date: Temporal.PlainDate,
  a: Temporal.PlainDate,
  b: Temporal.PlainDate,
  ends: boolean,
): boolean {
  const after = Temporal.PlainDate.compare(date, a);
  const before = Temporal.PlainDate.compare(date, b);
  return ends ? after >= 0 && before <= 0 : after > 0 && before < 0;
}

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  LOCALE_ID,
  ViewEncapsulation,
  afterNextRender,
  afterRenderEffect,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { ScCalendar } from './calendar';

interface ScCalendarDay {
  readonly date: Temporal.PlainDate;
  readonly key: string;
  /** Of the month before or after. */
  readonly outside: boolean;
  /** Not drawn: an outside day, hidden. */
  readonly blank: boolean;
}

/** A reference Monday: the week's days, named from it. */
const MONDAY = Temporal.PlainDate.from('2024-01-01');

/**
 * One month's days, as a grid — internal: the calendar draws one for each
 * month shown. Headers name the days in full for screen readers; each day
 * says its full date, and today and the picked are marked as such.
 */
@Component({
  selector: '[scCalendarMonth]',
  imports: [NgTemplateOutlet],
  template: `
    <ng-content />
    <table
      role="grid"
      class="max-w-full min-w-full table-fixed border-collapse"
      [class]="
        calendar.showWeekNumbers()
          ? 'w-[calc(var(--cell-size)*8)]'
          : 'w-[calc(var(--cell-size)*7)]'
      "
      [attr.aria-label]="calendar.monthHeading(month())"
      (keydown)="calendar.onDayKeydown($event)"
    >
      <thead>
        <tr class="flex w-full">
          @if (calendar.showWeekNumbers()) {
            <td class="w-(--cell-size) shrink-0"></td>
          }
          @for (name of weekdays(); track name.long) {
            <th
              scope="col"
              class="text-muted-foreground relative min-w-0 flex-1 text-[0.8rem] font-normal"
            >
              @if (calendar.weekdayFormat() === 'long') {
                <!-- In full where it fits; else out of sight (still measured)
                  and the short form shown. -->
                <span
                  aria-hidden="true"
                  data-weekday-long
                  class="whitespace-nowrap"
                  [class.invisible]="!longFits()"
                  [class.absolute]="!longFits()"
                  >{{ name.long }}</span
                >
                @if (!longFits()) {
                  <span aria-hidden="true">{{ name.compact }}</span>
                }
              } @else {
                <span aria-hidden="true">{{ name.shown }}</span>
              }
              <span class="sr-only">{{ name.long }}</span>
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (week of weeks(); track week[0].key) {
          <tr class="mt-1 flex w-full">
            @if (calendar.showWeekNumbers()) {
              <th
                scope="row"
                class="text-muted-foreground grid w-(--cell-size) shrink-0 place-items-center text-[0.8rem] font-normal"
              >
                {{ weekNumber(week) }}
              </th>
            }
            @for (day of week; track day.key) {
              @if (day.blank) {
                <td class="aspect-square min-w-0 flex-1"></td>
              } @else {
                <td
                  data-slot="calendar-cell"
                  [attr.data-date]="day.key"
                  [attr.tabindex]="tabIndex(day)"
                  [attr.cdkFocusInitial]="
                    calendar.initialFocus() && tabIndex(day) === 0 ? '' : null
                  "
                  [attr.aria-selected]="
                    day.outside ? null : calendar.isSelected(day.date)
                  "
                  [attr.aria-disabled]="
                    calendar.isUnavailable(day.date) || null
                  "
                  [attr.aria-current]="
                    day.date.equals(calendar.today()) ? 'date' : null
                  "
                  [attr.data-outside]="day.outside || null"
                  [attr.data-range]="calendar.rangePart(day.date)"
                  [class]="cellClass(day)"
                  (click)="pick(day)"
                  (pointerenter)="preview(day)"
                >
                  <span aria-hidden="true">{{ number(day.date) }}</span>
                  <span class="sr-only">{{ fullDate(day.date) }}</span>
                  @if (calendar.dayTemplate(); as custom) {
                    <ng-container
                      [ngTemplateOutlet]="custom.template"
                      [ngTemplateOutletContext]="context(day)"
                    />
                  }
                </td>
              }
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  host: { 'data-slot': 'calendar-month', class: 'w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarMonth {
  private readonly calendar = inject(forwardRef(() => ScCalendar));
  private readonly locale = inject(LOCALE_ID);

  readonly month = input.required<Temporal.PlainYearMonth>();

  /**
   * The week's days, from its first: shown as the calendar's `weekdayFormat`,
   * compact (the `short` form, a `long` one's fallback), and in full (read).
   * `short` narrows where a language's short names are words of their own
   * (Arabic's الأحد, Persian, Hebrew: over 4 letters), too wide for a day's
   * column: a letter each (ح ن ث…). From the locale, so the server draws the
   * same.
   */
  private readonly weekdays = computed(() => {
    const locale = this.locale;
    const start = this.calendar.weekStart();
    const days = Array.from({ length: 7 }, (_, i) =>
      MONDAY.add({ days: (start - 1 + i) % 7 }),
    );
    const name = (weekday: 'narrow' | 'short' | 'long') =>
      days.map((day) => day.toLocaleString(locale, { weekday }));
    const long = name('long');
    const short = name('short');
    const compact = short.some((n) => [...n].length > 4)
      ? name('narrow')
      : short;
    const format = this.calendar.weekdayFormat();
    const shown =
      format === 'long' ? long : format === 'narrow' ? name('narrow') : compact;
    return days.map((_, i) => ({
      shown: shown[i],
      compact: compact[i],
      long: long[i],
    }));
  });

  /**
   * With `long`: whether every full name fits its column — measured in the
   * browser, after rendering and as the month's width changes (its cells
   * shrink in a narrow box). The server draws them in full.
   */
  private readonly longFits = signal(true);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const measure = () => {
      if (this.calendar.weekdayFormat() !== 'long') return;
      this.longFits.set(
        [...this.element.querySelectorAll('[data-weekday-long]')].every(
          (name) =>
            name.getBoundingClientRect().width <=
            (name.parentElement as Element).getBoundingClientRect().width + 0.5,
        ),
      );
    };
    // The names or the format changed.
    afterRenderEffect(() => {
      this.weekdays();
      measure();
    });
    // Its width changed.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(measure);
      observer.observe(this.element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** Its weeks: whole, from the week's first day — six, with fixedWeeks. */
  private readonly weeks = computed(() => {
    const month = this.month();
    const first = month.toPlainDate({ day: 1 });
    const offset = (first.dayOfWeek - this.calendar.weekStart() + 7) % 7;
    const count = this.calendar.fixedWeeks()
      ? 6
      : Math.ceil((offset + month.daysInMonth) / 7);
    // Outside days: shown alone; beside other months, they would repeat.
    const showOutside =
      this.calendar.showOutsideDays() && this.calendar.months().length === 1;
    const start = first.subtract({ days: offset });
    return Array.from({ length: count }, (_, w) =>
      Array.from({ length: 7 }, (_, d): ScCalendarDay => {
        const date = start.add({ days: w * 7 + d });
        const outside = date.month !== month.month;
        return {
          date,
          key: date.toString(),
          outside,
          blank: outside && !showOutside,
        };
      }),
    );
  });

  private weekNumber(week: ScCalendarDay[]): number | undefined {
    return (week.find((day) => !day.outside) ?? week[0]).date.weekOfYear;
  }

  private tabIndex(day: ScCalendarDay): number | null {
    if (this.calendar.disabled() || day.outside) return -1;
    return day.date.equals(this.calendar.focused()) ? 0 : -1;
  }

  private number(date: Temporal.PlainDate): string {
    return date.toLocaleString(this.locale, { day: 'numeric' });
  }

  private fullDate(date: Temporal.PlainDate): string {
    return date.toLocaleString(this.locale, { dateStyle: 'full' });
  }

  private context(day: ScCalendarDay) {
    return {
      $implicit: day.date,
      selected: this.calendar.isSelected(day.date),
      today: day.date.equals(this.calendar.today()),
      unavailable: this.calendar.isUnavailable(day.date),
      outside: day.outside,
    };
  }

  private pick(day: ScCalendarDay): void {
    this.calendar.select(day.date);
    // An outside day: its month shown.
    if (day.outside) this.calendar.moveTo(day.date);
  }

  private preview(day: ScCalendarDay): void {
    if (this.calendar.mode() === 'range') this.calendar.hovered.set(day.date);
  }

  private cellClass(day: ScCalendarDay): string {
    const calendar = this.calendar;
    const selected = calendar.isSelected(day.date);
    const range = calendar.rangePart(day.date);
    const today = day.date.equals(calendar.today());
    return cn(
      'relative flex aspect-square min-w-0 flex-1 cursor-pointer flex-col items-center justify-center rounded-(--cell-radius) text-sm outline-none select-none',
      'hover:bg-muted hover:text-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      today && !selected && 'bg-muted text-foreground',
      selected &&
        range !== 'middle' &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
      range === 'middle' && 'bg-muted text-foreground rounded-none',
      range === 'start' && calendar.isSelected(day.date) && 'rounded-e-none',
      range === 'end' && 'rounded-s-none',
      range === 'preview' && 'bg-muted/60 rounded-none',
      day.outside && !selected && 'text-muted-foreground',
      calendar.isUnavailable(day.date) &&
        'text-muted-foreground pointer-events-none line-through opacity-50',
    );
  }
}

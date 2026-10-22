import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScCalendar } from './calendar';

interface Day {
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
      class="border-collapse"
      [attr.aria-label]="calendar.monthHeading(month())"
      (keydown)="calendar.onDayKeydown($event)"
    >
      <thead>
        <tr class="flex">
          @if (calendar.showWeekNumbers()) {
            <td class="w-9"></td>
          }
          @for (name of weekdays(); track name.long) {
            <th
              scope="col"
              class="text-muted-foreground w-9 text-[0.8rem] font-normal"
            >
              <span aria-hidden="true">{{ name.short }}</span>
              <span class="sr-only">{{ name.long }}</span>
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (week of weeks(); track week[0].key) {
          <tr class="mt-1 flex">
            @if (calendar.showWeekNumbers()) {
              <th
                scope="row"
                class="text-muted-foreground grid w-9 place-items-center text-[0.8rem] font-normal"
              >
                {{ weekNumber(week) }}
              </th>
            }
            @for (day of week; track day.key) {
              @if (day.blank) {
                <td class="size-9"></td>
              } @else {
                <td
                  data-slot="calendar-cell"
                  [attr.data-date]="day.key"
                  [attr.tabindex]="tabIndex(day)"
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
  host: { 'data-slot': 'calendar-month' },
  encapsulation: ViewEncapsulation.None,
})
export class ScCalendarMonth {
  protected readonly calendar = inject(forwardRef(() => ScCalendar));

  readonly month = input.required<Temporal.PlainYearMonth>();

  /** The week's days, from its first: short, and in full. */
  protected readonly weekdays = computed(() => {
    const locale = this.calendar.locale();
    const start = this.calendar.weekStart();
    return Array.from({ length: 7 }, (_, i) => {
      const day = MONDAY.add({ days: (start - 1 + i) % 7 });
      return {
        short: day.toLocaleString(locale, { weekday: 'short' }),
        long: day.toLocaleString(locale, { weekday: 'long' }),
      };
    });
  });

  /** Its weeks: whole, from the week's first day — six, with fixedWeeks. */
  protected readonly weeks = computed(() => {
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
      Array.from({ length: 7 }, (_, d): Day => {
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

  protected weekNumber(week: Day[]): number | undefined {
    return (week.find((day) => !day.outside) ?? week[0]).date.weekOfYear;
  }

  protected tabIndex(day: Day): number | null {
    if (this.calendar.disabled() || day.outside) return -1;
    return day.date.equals(this.calendar.focused()) ? 0 : -1;
  }

  protected number(date: Temporal.PlainDate): string {
    return date.toLocaleString(this.calendar.locale(), { day: 'numeric' });
  }

  protected fullDate(date: Temporal.PlainDate): string {
    return date.toLocaleString(this.calendar.locale(), { dateStyle: 'full' });
  }

  protected context(day: Day) {
    return {
      $implicit: day.date,
      selected: this.calendar.isSelected(day.date),
      today: day.date.equals(this.calendar.today()),
      unavailable: this.calendar.isUnavailable(day.date),
      outside: day.outside,
    };
  }

  protected pick(day: Day): void {
    this.calendar.select(day.date);
    // An outside day: its month shown.
    if (day.outside) this.calendar.moveTo(day.date);
  }

  protected preview(day: Day): void {
    if (this.calendar.mode() === 'range') this.calendar.hovered.set(day.date);
  }

  protected cellClass(day: Day): string {
    const calendar = this.calendar;
    const selected = calendar.isSelected(day.date);
    const range = calendar.rangePart(day.date);
    const today = day.date.equals(calendar.today());
    return cn(
      'relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-md text-sm outline-none select-none',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      today && !selected && 'bg-accent text-accent-foreground',
      selected &&
        range !== 'middle' &&
        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
      range === 'middle' && 'bg-accent text-accent-foreground rounded-none',
      range === 'start' && calendar.isSelected(day.date) && 'rounded-e-none',
      range === 'end' && 'rounded-s-none',
      range === 'preview' && 'bg-accent/60 rounded-none',
      day.outside && !selected && 'text-muted-foreground',
      calendar.isUnavailable(day.date) &&
        'text-muted-foreground pointer-events-none line-through opacity-50',
    );
  }
}

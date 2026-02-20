import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { Temporal } from '@js-temporal/polyfill';
import { ScCalendarDayView } from './calendar-day-view';
import { ScCalendarMonthView } from './calendar-month-view';
import { ScCalendarYearView } from './calendar-year-view';
import { ScCalendarHeader } from './calendar-header';

export type ScCalendarMode = 'single' | 'multiple' | 'range';
export type ScCalendarViewMode = 'day' | 'month' | 'year';

export interface ScDateRange {
  from: Temporal.PlainDate | undefined;
  to: Temporal.PlainDate | undefined;
}

export type ScCalendarValue =
  | Temporal.PlainDate
  | Temporal.PlainDate[]
  | ScDateRange
  | undefined;

@Component({
  selector: 'sc-calendar',
  imports: [
    ScCalendarDayView,
    ScCalendarMonthView,
    ScCalendarYearView,
    ScCalendarHeader,
  ],
  host: {
    'data-slot': 'calendar',
    '[class]': 'class()',
    role: 'application',
    '[attr.aria-label]': '"Calendar"',
  },
  template: `
    <div class="flex flex-col gap-4">
      <!-- Header with navigation -->
      <div
        scCalendarHeader
        [label]="monthYearLabel()"
        [previousLabel]="previousAriaLabel()"
        [nextLabel]="nextAriaLabel()"
        [headerLabel]="headerAriaLabel()"
        [expanded]="viewMode() !== 'day'"
        (previous)="handlePrevious()"
        (next)="handleNext()"
        (headerClick)="handleHeaderClick()"
      ></div>

      <!-- View content -->
      @switch (viewMode()) {
        @case ('day') {
          <div
            scCalendarDayView
            [viewDate]="viewDate()"
            [mode]="mode()"
            [value]="value()"
            [disabled]="disabled()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            [weekDays]="weekDays"
            (dateSelected)="selectDate($event)"
            (monthScrollUp)="previousMonth()"
            (monthScrollDown)="nextMonth()"
          ></div>
        }
        @case ('month') {
          <div
            scCalendarMonthView
            [year]="viewDate().year"
            [selectedMonth]="viewDate().month"
            (monthSelected)="selectMonth($event)"
            (yearScrollUp)="previousYear()"
            (yearScrollDown)="nextYear()"
          ></div>
        }
        @case ('year') {
          <div
            scCalendarYearView
            [decadeStart]="decadeStart()"
            [selectedYear]="viewDate().year"
            (yearSelected)="selectYear($event)"
            (decadeScrollUp)="previousDecade()"
            (decadeScrollDown)="nextDecade()"
          ></div>
        }
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCalendar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly mode = input<ScCalendarMode>('single');
  readonly disabled = input<Temporal.PlainDate[]>([]);
  readonly minDate = input<Temporal.PlainDate | undefined>(undefined);
  readonly maxDate = input<Temporal.PlainDate | undefined>(undefined);

  readonly value = model<ScCalendarValue>(undefined);

  readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  protected readonly viewDate = signal(Temporal.Now.plainDateISO());
  protected readonly viewMode = signal<ScCalendarViewMode>('day');
  protected readonly decadeStart = signal<number>(
    Math.floor(Temporal.Now.plainDateISO().year / 12) * 12,
  );

  protected readonly class = computed(() =>
    cn('block p-3 w-[276px]', this.classInput()),
  );

  protected readonly monthYearLabel = computed(() => {
    const date = this.viewDate();
    const mode = this.viewMode();

    if (mode === 'year') {
      const start = this.decadeStart();
      return `${start} - ${start + 11}`;
    }

    if (mode === 'month') {
      return date.year.toString();
    }

    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  });

  protected previousAriaLabel(): string {
    const mode = this.viewMode();
    return mode === 'day'
      ? 'Go to previous month'
      : mode === 'month'
        ? 'Go to previous year'
        : 'Go to previous decade';
  }

  protected nextAriaLabel(): string {
    const mode = this.viewMode();
    return mode === 'day'
      ? 'Go to next month'
      : mode === 'month'
        ? 'Go to next year'
        : 'Go to next decade';
  }

  protected headerAriaLabel(): string {
    const mode = this.viewMode();
    return mode === 'day'
      ? 'Switch to month view'
      : mode === 'month'
        ? 'Switch to year view'
        : 'Year view - select a year';
  }

  protected selectDate(date: Temporal.PlainDate): void {
    const mode = this.mode();

    if (mode === 'single') {
      this.value.set(date);
    } else if (mode === 'multiple') {
      const current = (this.value() as Temporal.PlainDate[] | undefined) ?? [];
      const exists = current.some((d) => d.equals(date));
      if (exists) {
        this.value.set(current.filter((d) => !d.equals(date)));
      } else {
        this.value.set([...current, date]);
      }
    } else if (mode === 'range') {
      const range = (this.value() as ScDateRange | undefined) ?? {
        from: undefined,
        to: undefined,
      };
      if (!range.from || (range.from && range.to)) {
        this.value.set({ from: date, to: undefined });
      } else {
        if (Temporal.PlainDate.compare(date, range.from) < 0) {
          this.value.set({ from: date, to: range.from });
        } else {
          this.value.set({ from: range.from, to: date });
        }
      }
    }
  }

  // Header click - drill down through views
  protected handleHeaderClick(): void {
    const current = this.viewMode();
    if (current === 'day') {
      this.viewMode.set('month');
    } else if (current === 'month') {
      this.viewMode.set('year');
      const currentYear = this.viewDate().year;
      this.decadeStart.set(Math.floor(currentYear / 12) * 12);
    }
  }

  // Context-aware previous/next
  protected handlePrevious(): void {
    const mode = this.viewMode();
    if (mode === 'day') this.previousMonth();
    else if (mode === 'month') this.previousYear();
    else this.previousDecade();
  }

  protected handleNext(): void {
    const mode = this.viewMode();
    if (mode === 'day') this.nextMonth();
    else if (mode === 'month') this.nextYear();
    else this.nextDecade();
  }

  protected previousMonth(): void {
    this.viewDate.update((d) => d.subtract({ months: 1 }).with({ day: 1 }));
  }

  protected nextMonth(): void {
    this.viewDate.update((d) => d.add({ months: 1 }).with({ day: 1 }));
  }

  protected previousYear(): void {
    this.viewDate.update((d) => d.subtract({ years: 1 }).with({ day: 1 }));
  }

  protected nextYear(): void {
    this.viewDate.update((d) => d.add({ years: 1 }).with({ day: 1 }));
  }

  protected previousDecade(): void {
    this.decadeStart.update((start) => start - 12);
  }

  protected nextDecade(): void {
    this.decadeStart.update((start) => start + 12);
  }

  // Selection handlers - return to previous view
  protected selectMonth(month: number): void {
    const current = this.viewDate();
    this.viewDate.set(new Temporal.PlainDate(current.year, month, 1));
    this.viewMode.set('day');
  }

  protected selectYear(year: number): void {
    const current = this.viewDate();
    this.viewDate.set(new Temporal.PlainDate(year, current.month, 1));
    this.viewMode.set('month');
  }
}

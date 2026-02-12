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
import { ScCalendarDayView } from './calendar-day-view';
import { ScCalendarMonthView } from './calendar-month-view';
import { ScCalendarYearView } from './calendar-year-view';
import { ScCalendarHeader } from './calendar-header';

export type CalendarMode = 'single' | 'multiple' | 'range';
export type CalendarViewMode = 'day' | 'month' | 'year';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

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
      <sc-calendar-header
        [label]="monthYearLabel()"
        [previousLabel]="previousAriaLabel()"
        [nextLabel]="nextAriaLabel()"
        [headerLabel]="headerAriaLabel()"
        [expanded]="viewMode() !== 'day'"
        (previous)="handlePrevious()"
        (next)="handleNext()"
        (headerClick)="handleHeaderClick()"
      />

      <!-- View content -->
      @switch (viewMode()) {
        @case ('day') {
          <sc-calendar-day-view
            [viewDate]="viewDate()"
            [mode]="mode()"
            [selected]="selected()"
            [selectedDates]="selectedDates()"
            [selectedRange]="selectedRange()"
            [disabled]="disabled()"
            [minDate]="minDate()"
            [maxDate]="maxDate()"
            [weekDays]="weekDays"
            (dateSelected)="selectDate($event)"
            (monthScrollUp)="previousMonth()"
            (monthScrollDown)="nextMonth()"
          />
        }
        @case ('month') {
          <sc-calendar-month-view
            [year]="viewDate().getFullYear()"
            [selectedMonth]="viewDate().getMonth()"
            (monthSelected)="selectMonth($event)"
            (yearScrollUp)="previousYear()"
            (yearScrollDown)="nextYear()"
          />
        }
        @case ('year') {
          <sc-calendar-year-view
            [decadeStart]="decadeStart()"
            [selectedYear]="viewDate().getFullYear()"
            (yearSelected)="selectYear($event)"
            (decadeScrollUp)="previousDecade()"
            (decadeScrollDown)="nextDecade()"
          />
        }
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCalendar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly mode = input<CalendarMode>('single');
  readonly disabled = input<Date[]>([]);
  readonly minDate = input<Date | undefined>(undefined);
  readonly maxDate = input<Date | undefined>(undefined);

  // For single mode
  readonly selected = model<Date | undefined>(undefined);
  // For multiple mode
  readonly selectedDates = model<Date[]>([]);
  // For range mode
  readonly selectedRange = model<DateRange>({ from: undefined, to: undefined });

  readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  protected readonly viewDate = signal(new Date());
  protected readonly viewMode = signal<CalendarViewMode>('day');
  protected readonly decadeStart = signal<number>(
    Math.floor(new Date().getFullYear() / 12) * 12,
  );

  protected readonly class = computed(() => cn('p-3', this.classInput()));

  protected readonly monthYearLabel = computed(() => {
    const date = this.viewDate();
    const mode = this.viewMode();

    if (mode === 'year') {
      const start = this.decadeStart();
      return `${start} - ${start + 11}`;
    }

    if (mode === 'month') {
      return date.getFullYear().toString();
    }

    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

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

  protected selectDate(date: Date): void {
    const mode = this.mode();

    if (mode === 'single') {
      this.selected.set(date);
    } else if (mode === 'multiple') {
      const current = this.selectedDates();
      const exists = current.some((d) => this.isSameDay(d, date));
      if (exists) {
        this.selectedDates.set(current.filter((d) => !this.isSameDay(d, date)));
      } else {
        this.selectedDates.set([...current, date]);
      }
    } else if (mode === 'range') {
      const range = this.selectedRange();
      if (!range.from || (range.from && range.to)) {
        // Start new range
        this.selectedRange.set({ from: date, to: undefined });
      } else {
        // Complete the range
        if (date < range.from) {
          this.selectedRange.set({ from: date, to: range.from });
        } else {
          this.selectedRange.set({ from: range.from, to: date });
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
      const currentYear = this.viewDate().getFullYear();
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
    const current = this.viewDate();
    this.viewDate.set(
      new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  }

  protected nextMonth(): void {
    const current = this.viewDate();
    this.viewDate.set(
      new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  }

  protected previousYear(): void {
    const current = this.viewDate();
    this.viewDate.set(
      new Date(current.getFullYear() - 1, current.getMonth(), 1),
    );
  }

  protected nextYear(): void {
    const current = this.viewDate();
    this.viewDate.set(
      new Date(current.getFullYear() + 1, current.getMonth(), 1),
    );
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
    this.viewDate.set(new Date(current.getFullYear(), month, 1));
    this.viewMode.set('day');
  }

  protected selectYear(year: number): void {
    const current = this.viewDate();
    this.viewDate.set(new Date(year, current.getMonth(), 1));
    this.viewMode.set('month');
  }
}

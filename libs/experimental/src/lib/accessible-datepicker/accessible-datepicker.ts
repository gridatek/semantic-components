import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  forwardRef,
  input,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Temporal } from '@js-temporal/polyfill';

// Interface for calendar day
interface CalendarDay {
  date: Temporal.PlainDate;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'sc-accessible-datepicker',
  imports: [],
  template: `
    <div class="relative w-full max-w-xs" [class.opacity-60]="isDisabled">
      <label class="block text-sm font-medium text-gray-700 mb-1" [for]="id()">
        {{ label() }}
        @if (required()) {
          <span class="text-red-500 ml-1">*</span>
        }
      </label>

      <div class="relative">
        <input
          class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          [id]="id()"
          [value]="dateInputValue"
          [placeholder]="placeholder()"
          [required]="required()"
          [disabled]="isDisabled"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-required]="required()"
          [attr.aria-describedby]="ariaDescribedBy()"
          [attr.aria-expanded]="isCalendarOpen"
          [attr.aria-owns]="isCalendarOpen ? id() + '-calendar' : null"
          (input)="onInputChange($event)"
          (click)="toggleCalendar()"
          (focus)="markAsTouched()"
          type="text"
        />

        <button
          class="absolute right-0 top-0 h-full px-3 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-md"
          [disabled]="isDisabled"
          [attr.aria-label]="isCalendarOpen ? 'Close calendar' : 'Open calendar'"
          (click)="toggleCalendar()"
          type="button"
        >
          <svg
            class="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      @if (isCalendarOpen) {
        <div
          class="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-72"
          [id]="id() + '-calendar'"
          [attr.aria-label]="'Calendar dialog'"
          (click)="onCalendarClick($event)"
          (keydown)="ff()"
          role="dialog"
          aria-modal="true"
        >
          <div class="p-2">
            <div class="flex items-center justify-between mb-2">
              <button
                class="p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                (click)="prevMonth()"
                type="button"
                aria-label="Previous month"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div class="flex space-x-2">
                <select
                  class="py-1 pl-2 pr-6 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  [value]="currentMonth?.month"
                  (change)="onMonthChange($event)"
                  aria-label="Select month"
                >
                  @for (monthName of months; track monthName; let i = $index) {
                    <option [value]="i + 1">
                      {{ monthName }}
                    </option>
                  }
                </select>
                <select
                  class="py-1 pl-2 pr-6 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  [value]="currentMonth?.year"
                  (change)="onYearChange($event)"
                  aria-label="Select year"
                >
                  @for (year of years; track year) {
                    <option [value]="year">
                      {{ year }}
                    </option>
                  }
                </select>
              </div>
              <button
                class="p-1 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                (click)="nextMonth()"
                type="button"
                aria-label="Next month"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div class="grid grid-cols-7 gap-0">
              @for (day of weekdays; track day) {
                <div class="h-8 flex items-center justify-center text-xs font-medium text-gray-700">
                  {{ day }}
                </div>
              }
              @for (day of calendarDays; track day; let i = $index) {
                <button
                  class="h-8 w-8 mx-auto flex items-center justify-center text-sm rounded-full"
                  [class.text-gray-400]="!day.isCurrentMonth"
                  [class.ring-1]="day.isToday && !day.isSelected"
                  [class.ring-blue-500]="day.isToday && !day.isSelected"
                  [class.bg-blue-500]="day.isSelected"
                  [class.text-white]="day.isSelected"
                  [class.hover:bg-gray-100]="!day.isSelected && !day.isDisabled"
                  [class.text-gray-300]="day.isDisabled"
                  [class.cursor-pointer]="!day.isDisabled"
                  [class.cursor-not-allowed]="day.isDisabled"
                  [class.ring-2]="i === focusedDayIndex"
                  [class.ring-blue-400]="i === focusedDayIndex"
                  [class.ring-offset-1]="i === focusedDayIndex"
                  [attr.aria-selected]="day.isSelected"
                  [attr.aria-disabled]="day.isDisabled"
                  [attr.aria-current]="day.isToday ? 'date' : null"
                  [attr.tabindex]="i === focusedDayIndex ? 0 : -1"
                  (click)="selectDate(day.date)"
                  role="gridcell"
                >
                  {{ day.dayOfMonth }}
                </button>
              }
            </div>
            <div class="mt-2 flex justify-between">
              <button
                class="px-3 py-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                (click)="f()"
                type="button"
                aria-label="Select today"
              >
                Today
              </button>
              <button
                class="px-3 py-1 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                (click)="closeCalendar()"
                type="button"
                aria-label="Close calendar"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      }

      @if (selectedDate) {
        <div class="sr-only" aria-live="polite">Selected date: {{ selectedDate.toString() }}</div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScAccessibleDatepicker),
      multi: true,
    },
  ],
})
export class ScAccessibleDatepicker implements OnInit, ControlValueAccessor {
  readonly label = input('Select date');
  readonly placeholder = input('MM/DD/YYYY');
  readonly minDate = input<Temporal.PlainDate>();
  readonly maxDate = input<Temporal.PlainDate>();
  readonly required = input(false);
  readonly id = input('accessible-datepicker');
  readonly ariaLabel = input('Date picker');
  readonly ariaDescribedBy = input('');
  readonly dateChange = output<Temporal.PlainDate>();

  isCalendarOpen = false;
  isDisabled = false;
  touched = false;
  dateInputValue = '';

  selectedDate: Temporal.PlainDate | null = null;
  currentMonth: Temporal.PlainYearMonth | null = null;
  calendarDays: CalendarDay[] = [];
  weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = [];

  // For keyboard navigation
  focusedDayIndex = -1;

  // For ControlValueAccessor
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: any = () => {};

  constructor() {
    // Generate years for selection (100 years before and after current year)
    const currentYear = Temporal.Now.plainDateISO().year;
    for (let year = currentYear - 100; year <= currentYear + 100; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    // Initialize with current month
    if (!this.currentMonth) {
      this.currentMonth = Temporal.Now.plainDateISO().toPlainYearMonth();
    }
    this.generateCalendarDays();
  }

  // Generate calendar days for the current month view
  generateCalendarDays(): void {
    this.calendarDays = [];
    if (!this.currentMonth) return;

    const firstDayOfMonth = this.currentMonth.toPlainDate({ day: 1 });
    const lastDayOfMonth = this.currentMonth.toPlainDate({
      day: this.currentMonth.daysInMonth,
    });

    // Get the day of the week for the first day (0-6, Sunday-Saturday)
    const firstDayOfWeek = firstDayOfMonth.dayOfWeek % 7;

    // Add days from previous month to fill the first week
    const prevMonth = this.currentMonth.subtract({ months: 1 });
    const daysInPrevMonth = prevMonth.daysInMonth;

    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = daysInPrevMonth - firstDayOfWeek + i + 1;
      const date = prevMonth.toPlainDate({ day });
      this.calendarDays.push({
        date,
        dayOfMonth: day,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.isSelected(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    // Add days of current month
    for (let day = 1; day <= this.currentMonth.daysInMonth; day++) {
      const date = this.currentMonth.toPlainDate({ day });
      this.calendarDays.push({
        date,
        dayOfMonth: day,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        isSelected: this.isSelected(date),
        isDisabled: this.isDateDisabled(date),
      });
    }

    // Add days from next month to complete the grid (always show 6 weeks)
    const daysNeeded = 42 - this.calendarDays.length;
    const nextMonth = this.currentMonth.add({ months: 1 });

    for (let day = 1; day <= daysNeeded; day++) {
      const date = nextMonth.toPlainDate({ day });
      this.calendarDays.push({
        date,
        dayOfMonth: day,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        isSelected: this.isSelected(date),
        isDisabled: this.isDateDisabled(date),
      });
    }
  }

  // Helper methods
  isToday(date: Temporal.PlainDate): boolean {
    const today = Temporal.Now.plainDateISO();
    return date.equals(today);
  }

  isSelected(date: Temporal.PlainDate): boolean {
    return this.selectedDate ? date.equals(this.selectedDate) : false;
  }

  isDateDisabled(date: Temporal.PlainDate): boolean {
    const minDate = this.minDate();
    if (minDate && Temporal.PlainDate.compare(date, minDate) < 0) {
      return true;
    }
    const maxDate = this.maxDate();
    if (maxDate && Temporal.PlainDate.compare(date, maxDate) > 0) {
      return true;
    }
    return false;
  }

  // Event handlers
  toggleCalendar(): void {
    if (this.isDisabled) return;

    this.isCalendarOpen = !this.isCalendarOpen;
    if (this.isCalendarOpen) {
      this.markAsTouched();
      // Set focus to selected date or today
      setTimeout(() => {
        const selectedIndex = this.calendarDays.findIndex((day) =>
          this.selectedDate ? day.date.equals(this.selectedDate) : day.isToday,
        );
        this.focusedDayIndex =
          selectedIndex >= 0 ? selectedIndex : this.calendarDays.findIndex((day) => day.isToday);
      });
    }
  }

  closeCalendar(): void {
    this.isCalendarOpen = false;
  }

  // Prevent closing when clicking inside the calendar
  onCalendarClick(event: Event): void {
    event.stopPropagation();
  }

  // Keyboard navigation for the calendar
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.isCalendarOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeCalendar();
        break;
      case 'ArrowLeft':
        this.moveFocus(-1);
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.moveFocus(1);
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.moveFocus(-7);
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.moveFocus(7);
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        if (this.focusedDayIndex >= 0 && this.focusedDayIndex < this.calendarDays.length) {
          this.selectDate(this.calendarDays[this.focusedDayIndex].date);
          event.preventDefault();
        }
        break;
      case 'Home':
        // Move to first day of the month
        this.focusedDayIndex = this.calendarDays.findIndex(
          (day) => day.isCurrentMonth && day.dayOfMonth === 1,
        );
        event.preventDefault();
        break;
      case 'End':
        // Move to last day of the month
        for (let i = this.calendarDays.length - 1; i >= 0; i--) {
          if (this.calendarDays[i].isCurrentMonth) {
            this.focusedDayIndex = i;
            break;
          }
        }
        event.preventDefault();
        break;
      case 'PageUp':
        // Previous month
        this.prevMonth();
        event.preventDefault();
        break;
      case 'PageDown':
        // Next month
        this.nextMonth();
        event.preventDefault();
        break;
    }
  }

  // Move focus in the calendar grid with support for month navigation
  moveFocus(delta: number): void {
    const newIndex = this.focusedDayIndex + delta;

    if (newIndex >= 0 && newIndex < this.calendarDays.length) {
      // Standard case: new focus position is within current calendar view
      this.focusedDayIndex = newIndex;
    } else if (newIndex < 0) {
      // Moving backwards beyond the first day of the calendar view
      this.prevMonth();
      // Set focus to the last day of the newly displayed month
      setTimeout(() => {
        // Find last day that belongs to the current month
        for (let i = this.calendarDays.length - 1; i >= 0; i--) {
          if (this.calendarDays[i].isCurrentMonth) {
            this.focusedDayIndex = i;
            break;
          }
        }
      });
    } else if (newIndex >= this.calendarDays.length) {
      // Moving forward beyond the last day of the calendar view
      this.nextMonth();
      // Set focus to the first day of the newly displayed month
      setTimeout(() => {
        // Find first day that belongs to the current month
        this.focusedDayIndex = this.calendarDays.findIndex((day) => day.isCurrentMonth);
      });
    }
  }

  selectDate(date: Temporal.PlainDate): void {
    if (this.isDateDisabled(date)) return;

    this.selectedDate = date;
    this.dateInputValue = this.formatDate(date);
    this.onChange(date);
    this.onTouch();
    this.dateChange.emit(date);
    this.closeCalendar();
  }

  // Format date for display
  formatDate(date: Temporal.PlainDate): string {
    return `${date.month.toString().padStart(2, '0')}/${date.day.toString().padStart(2, '0')}/${date.year}`;
  }

  // Parse user input
  onInputChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.dateInputValue = input;

    try {
      // Try to parse the date from input (MM/DD/YYYY format)
      const parts = input.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          const date = Temporal.PlainDate.from({
            year,
            month,
            day,
          });

          if (!this.isDateDisabled(date)) {
            this.selectedDate = date;
            this.currentMonth = date.toPlainYearMonth();
            this.generateCalendarDays();
            this.onChange(date);
          }
        }
      }
    } catch (error) {
      // Invalid date input, don't update selectedDate
    }

    this.markAsTouched();
  }

  // Navigation methods
  prevMonth(): void {
    if (this.currentMonth) {
      this.currentMonth = this.currentMonth.subtract({ months: 1 });
      this.generateCalendarDays();
      // Reset focused day to same date in new month or first valid date
      this.updateFocusAfterMonthChange();
    }
  }

  nextMonth(): void {
    if (this.currentMonth) {
      this.currentMonth = this.currentMonth.add({ months: 1 });
      this.generateCalendarDays();
      // Reset focused day to same date in new month or first valid date
      this.updateFocusAfterMonthChange();
    }
  }

  updateFocusAfterMonthChange(): void {
    if (this.selectedDate) {
      // Try to focus the same day in the new month
      const day = Math.min(this.selectedDate.day, this.currentMonth!.daysInMonth);
      const targetDate = this.currentMonth!.toPlainDate({ day });
      this.focusedDayIndex = this.calendarDays.findIndex(
        (calDay) =>
          calDay.date.year === targetDate.year &&
          calDay.date.month === targetDate.month &&
          calDay.date.day === targetDate.day,
      );
    } else {
      // Focus first day of current month
      this.focusedDayIndex = this.calendarDays.findIndex(
        (day) => day.isCurrentMonth && day.dayOfMonth === 1,
      );
    }
  }

  onMonthChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const month = parseInt(select.value, 10);

    if (this.currentMonth && !isNaN(month)) {
      this.currentMonth = Temporal.PlainYearMonth.from({
        year: this.currentMonth.year,
        month,
      });
      this.generateCalendarDays();
      this.updateFocusAfterMonthChange();
    }
  }

  onYearChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const year = parseInt(select.value, 10);

    if (this.currentMonth && !isNaN(year)) {
      this.currentMonth = Temporal.PlainYearMonth.from({
        year,
        month: this.currentMonth.month,
      });
      this.generateCalendarDays();
      this.updateFocusAfterMonthChange();
    }
  }

  // ControlValueAccessor methods
  writeValue(date: Temporal.PlainDate | null): void {
    this.selectedDate = date;
    this.dateInputValue = date ? this.formatDate(date) : '';

    if (date) {
      this.currentMonth = date.toPlainYearMonth();
      this.generateCalendarDays();
    } else {
      this.currentMonth = Temporal.Now.plainDateISO().toPlainYearMonth();
      this.generateCalendarDays();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  f() {
    this.selectDate(Temporal.Now.plainDateISO());
  }

  ff() {
    console.log('ff');
  }
}

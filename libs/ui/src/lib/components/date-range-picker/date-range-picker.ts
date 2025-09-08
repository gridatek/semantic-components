import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Temporal } from '@js-temporal/polyfill';

@Component({
  selector: 'sc-date-range-picker',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  template: `
    <!-- date-range-picker.component.html -->
    <div class="relative w-full max-w-md">
      <!-- Date range display input -->
      <button
        class="flex justify-between items-center p-3 border border-gray-300 rounded-md bg-white cursor-pointer hover:border-blue-500 transition-colors"
        (click)="toggleCalendar()"
        type="button"
      >
        <div class="flex items-center space-x-1">
          <span class="text-gray-700">
            {{ selectedStartDate ? formatDate(selectedStartDate) : 'Start date' }}
          </span>
          <span class="text-gray-500">to</span>
          <span class="text-gray-700">
            {{ selectedEndDate ? formatDate(selectedEndDate) : 'End date' }}
          </span>
        </div>
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

      <!-- Calendar dropdown -->
      @if (showCalendar) {
        <div
          class="absolute mt-1 z-10 bg-white rounded-md shadow-lg border border-gray-200 p-3 w-full md:w-[350px]"
        >
          <!-- Header with navigation and dropdown -->
          <div class="flex justify-between items-center mb-3">
            <!-- Month/Year selectors -->
            <div class="flex items-center space-x-1">
              <select
                class="p-1 border border-gray-300 rounded text-sm"
                [ngModel]="currentMonth.month"
                (ngModelChange)="setMonth($event)"
              >
                @for (month of months; track month; let i = $index) {
                  <option [value]="i + 1">
                    {{ month }}
                  </option>
                }
              </select>
              <select
                class="p-1 border border-gray-300 rounded text-sm"
                [ngModel]="currentMonth.year"
                (ngModelChange)="setYear($event)"
              >
                @for (year of years; track year) {
                  <option [value]="year">
                    {{ year }}
                  </option>
                }
              </select>
            </div>
            <!-- Previous/Next month buttons -->
            <div class="flex space-x-1">
              <button class="p-1 rounded hover:bg-gray-100" (click)="prevMonth()" type="button">
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
              <button class="p-1 rounded hover:bg-gray-100" (click)="nextMonth()" type="button">
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
          </div>
          <!-- Calendar grid -->
          <div class="mb-3">
            <!-- Weekday headers -->
            <div class="grid grid-cols-7 mb-1">
              @for (day of weekdays; track day) {
                <div class="text-center text-xs font-medium text-gray-500 py-1">
                  {{ day }}
                </div>
              }
            </div>
            <!-- Calendar days -->
            <div class="grid grid-cols-7">
              @for (day of calendarDays; track day) {
                <button
                  class="text-center py-1 relative"
                  [ngClass]="{
                    'text-gray-400': !day.isCurrentMonth,
                    'bg-blue-100': day.isInRange && !day.isSelected,
                    'cursor-pointer hover:bg-gray-100': !day.isDisabled,
                    'cursor-not-allowed opacity-50': day.isDisabled,
                  }"
                  (click)="selectDate(day.date, day.isDisabled)"
                  type="button"
                >
                  <div
                    class="w-8 h-8 flex items-center justify-center mx-auto rounded-full"
                    [ngClass]="{
                      'bg-blue-600 text-white': day.isSelected,
                      'ring-2 ring-blue-600 ring-offset-1': day.isToday && !day.isSelected,
                    }"
                  >
                    {{ day.date.day }}
                  </div>
                </button>
              }
            </div>
          </div>
          <!-- Quick selection buttons -->
          <div class="grid grid-cols-3 gap-2 mb-3">
            <button
              class="px-2 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors border border-gray-300"
              (click)="setLastWeek()"
              type="button"
            >
              Last 7 days
            </button>
            <button
              class="px-2 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors border border-gray-300"
              (click)="setLastMonth()"
              type="button"
            >
              Last month
            </button>
            <button
              class="px-2 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors border border-gray-300"
              (click)="setLastThreeMonths()"
              type="button"
            >
              Last 3 months
            </button>
          </div>
          <!-- Status text and buttons -->
          <div class="text-sm text-gray-500 mb-2">
            @if (isSelectingEndDate && selectedStartDate) {
              <div>
                <p>Select end date</p>
              </div>
            }
            @if (!isSelectingEndDate && !selectedEndDate) {
              <div>
                <p>Select start date</p>
              </div>
            }
            @if (selectedStartDate && selectedEndDate) {
              <div>
                <p>{{ formatDate(selectedStartDate) }} to {{ formatDate(selectedEndDate) }}</p>
              </div>
            }
          </div>
          <div class="flex justify-end space-x-2">
            <button
              class="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              (click)="cancelSelection()"
              type="button"
            >
              Cancel
            </button>
            <button
              class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              [disabled]="!selectedStartDate || !selectedEndDate"
              [ngClass]="{
                'opacity-50 cursor-not-allowed': !selectedStartDate || !selectedEndDate,
              }"
              (click)="applyDateRange()"
              type="button"
            >
              Apply
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDateRangePicker implements OnInit {
  readonly startDate = input<Temporal.PlainDate>(Temporal.Now.plainDateISO());
  readonly endDate = input<Temporal.PlainDate>(Temporal.Now.plainDateISO());
  readonly minDate = input<Temporal.PlainDate | null>(null);
  readonly maxDate = input<Temporal.PlainDate | null>(null);
  readonly dateRangeSelected = output<{
    startDate: Temporal.PlainDate;
    endDate: Temporal.PlainDate;
  }>();

  // Calendar state
  currentMonth: Temporal.PlainYearMonth;
  calendarDays: Array<{
    date: Temporal.PlainDate;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isInRange: boolean;
    isDisabled: boolean;
  }> = [];

  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months: string[] = [
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

  // Selection state
  selectedStartDate: Temporal.PlainDate | null = null;
  selectedEndDate: Temporal.PlainDate | null = null;
  isSelectingEndDate = false;

  // UI state
  showCalendar = false;
  today: Temporal.PlainDate = Temporal.Now.plainDateISO();

  constructor() {
    this.currentMonth = Temporal.Now.plainDateISO().toPlainYearMonth();

    // Generate selectable years (10 years before and after current year)
    const currentYear = Temporal.Now.plainDateISO().year;
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.selectedStartDate = this.startDate();
    this.selectedEndDate = this.endDate();
    this.currentMonth = this.startDate().toPlainYearMonth();
    this.generateCalendarDays();
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      // Reset to start date's month when opening calendar
      this.currentMonth =
        this.selectedStartDate?.toPlainYearMonth() ||
        Temporal.Now.plainDateISO().toPlainYearMonth();
      this.generateCalendarDays();
    }
  }

  generateCalendarDays(): void {
    this.calendarDays = [];

    const firstOfMonth = Temporal.PlainDate.from({
      year: this.currentMonth.year,
      month: this.currentMonth.month,
      day: 1,
    });

    const lastOfMonth = firstOfMonth.with({ day: firstOfMonth.daysInMonth });

    // Get the first date to show (might be from previous month)
    let startingDate = firstOfMonth;
    const dayOfWeek = firstOfMonth.dayOfWeek % 7; // 0-indexed, Sunday = 0
    if (dayOfWeek > 0) {
      startingDate = firstOfMonth.subtract({ days: dayOfWeek });
    }

    // Calculate the last date to show (might be from next month)
    const endDate = lastOfMonth.add({ days: 6 - (lastOfMonth.dayOfWeek % 7) });

    // Generate all days for the calendar view
    let currentDate = startingDate;

    while (Temporal.PlainDate.compare(currentDate, endDate) <= 0) {
      const isCurrentMonth = currentDate.month === this.currentMonth.month;
      const isToday = Temporal.PlainDate.compare(currentDate, this.today) === 0;

      const isSelected =
        (this.selectedStartDate &&
          Temporal.PlainDate.compare(currentDate, this.selectedStartDate) === 0) ||
        (this.selectedEndDate &&
          Temporal.PlainDate.compare(currentDate, this.selectedEndDate) === 0);

      // Check if date is in the selected range
      const isInRange =
        this.selectedStartDate &&
        this.selectedEndDate &&
        Temporal.PlainDate.compare(currentDate, this.selectedStartDate) >= 0 &&
        Temporal.PlainDate.compare(currentDate, this.selectedEndDate) <= 0;

      // Check if date is disabled (before min date or after max date)
      const minDate = this.minDate();
      const maxDate = this.maxDate();
      const isDisabled =
        (minDate && Temporal.PlainDate.compare(currentDate, minDate) < 0) ||
        (maxDate && Temporal.PlainDate.compare(currentDate, maxDate) > 0);

      this.calendarDays.push({
        date: currentDate,
        isCurrentMonth,
        isToday,
        isSelected: !!isSelected,
        isInRange: !!isInRange,
        isDisabled: !!isDisabled,
      });

      currentDate = currentDate.add({ days: 1 });
    }
  }

  prevMonth(): void {
    this.currentMonth = this.currentMonth.subtract({ months: 1 });
    this.generateCalendarDays();
  }

  nextMonth(): void {
    this.currentMonth = this.currentMonth.add({ months: 1 });
    this.generateCalendarDays();
  }

  setMonth(month: number): void {
    this.currentMonth = this.currentMonth.with({ month });
    this.generateCalendarDays();
  }

  setYear(year: number): void {
    this.currentMonth = this.currentMonth.with({ year });
    this.generateCalendarDays();
  }

  selectDate(date: Temporal.PlainDate, isDisabled: boolean): void {
    if (isDisabled) return;

    if (!this.isSelectingEndDate) {
      // Selecting start date
      this.selectedStartDate = date;
      this.selectedEndDate = null;
      this.isSelectingEndDate = true;
    } else {
      // Selecting end date
      if (Temporal.PlainDate.compare(date, this.selectedStartDate!) < 0) {
        // If end date is before start date, swap them
        this.selectedEndDate = this.selectedStartDate;
        this.selectedStartDate = date;
      } else {
        this.selectedEndDate = date;
      }
      this.isSelectingEndDate = false;
    }

    this.generateCalendarDays();
  }

  applyDateRange(): void {
    if (this.selectedStartDate && this.selectedEndDate) {
      this.dateRangeSelected.emit({
        startDate: this.selectedStartDate,
        endDate: this.selectedEndDate,
      });
      this.showCalendar = false;
    }
  }

  cancelSelection(): void {
    this.showCalendar = false;
    // Reset to previous selection
    this.selectedStartDate = this.startDate();
    this.selectedEndDate = this.endDate();
    this.isSelectingEndDate = false;
    this.generateCalendarDays();
  }

  // Predefined ranges
  setLastWeek(): void {
    const end = Temporal.Now.plainDateISO();
    const start = end.subtract({ days: 6 });

    this.selectedStartDate = start;
    this.selectedEndDate = end;
    this.generateCalendarDays();
    this.applyDateRange();
  }

  setLastMonth(): void {
    const end = Temporal.Now.plainDateISO();
    const start = end.subtract({ months: 1 });

    this.selectedStartDate = start;
    this.selectedEndDate = end;
    this.generateCalendarDays();
    this.applyDateRange();
  }

  setLastThreeMonths(): void {
    const end = Temporal.Now.plainDateISO();
    const start = end.subtract({ months: 3 });

    this.selectedStartDate = start;
    this.selectedEndDate = end;
    this.generateCalendarDays();
    this.applyDateRange();
  }

  formatDate(date: Temporal.PlainDate | null): string {
    if (!date) return '';
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

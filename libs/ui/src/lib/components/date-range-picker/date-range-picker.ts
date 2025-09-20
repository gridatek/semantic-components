import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface QuickRange {
  label: string;
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'sc-date-range-picker',
  imports: [FormsModule],
  template: `
    <div class="relative">
      <!-- Main Input Display -->
      <div class="relative">
        <input
          class="w-full px-4 py-3 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer hover:border-gray-400 transition-colors"
          [value]="getDisplayValue()"
          [placeholder]="placeholder"
          (click)="toggleCalendar()"
          type="text"
          readonly
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Calendar Dropdown -->
      @if (showCalendar) {
        <div
          class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4 min-w-max"
        >
          <!-- Quick Range Buttons -->
          <div class="mb-4 pb-4 border-b border-gray-100">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Quick Ranges</h4>
            <div class="flex flex-wrap gap-2">
              @for (range of quickRanges; track range) {
                <button
                  class="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors"
                  (click)="selectQuickRange(range)"
                >
                  {{ range.label }}
                </button>
              }
            </div>
          </div>
          <!-- Custom Range Input -->
          <div class="mb-4">
            <div class="flex items-center space-x-3 mb-3">
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                <input
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                  [value]="selectedRange.startDate ? formatDate(selectedRange.startDate) : ''"
                  type="text"
                  readonly
                  placeholder="Select start date"
                />
              </div>
              <div class="flex items-center pt-5">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                <input
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                  [value]="selectedRange.endDate ? formatDate(selectedRange.endDate) : ''"
                  type="text"
                  readonly
                  placeholder="Select end date"
                />
              </div>
            </div>
          </div>
          <!-- Calendar Grid -->
          <div class="flex space-x-4">
            <!-- Left Calendar (Start Month) -->
            <div class="flex-1">
              <div class="flex items-center justify-between mb-4">
                <button
                  class="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  (click)="previousMonth('left')"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <h3 class="text-sm font-semibold text-gray-900">
                  {{ getMonthYear(leftMonth) }}
                </h3>
                <button
                  class="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  (click)="nextMonth('left')"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
              <!-- Days of Week -->
              <div class="grid grid-cols-7 gap-1 mb-2">
                @for (day of daysOfWeek; track day) {
                  <div class="text-center text-xs font-medium text-gray-500 py-1">
                    {{ day }}
                  </div>
                }
              </div>
              <!-- Calendar Days -->
              <div class="grid grid-cols-7 gap-1">
                @for (day of getDaysInMonth(leftMonth); track day) {
                  <button
                    class="h-8 text-sm rounded-md transition-colors disabled:cursor-default disabled:opacity-50"
                    [disabled]="!day || isDateDisabled(day)"
                    [class]="getDayClasses(day, 'left')"
                    (click)="selectDate(day)"
                  >
                    {{ day?.getDate() }}
                  </button>
                }
              </div>
            </div>
            <!-- Right Calendar (End Month) -->
            <div class="flex-1">
              <div class="flex items-center justify-between mb-4">
                <button
                  class="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  (click)="previousMonth('right')"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <h3 class="text-sm font-semibold text-gray-900">
                  {{ getMonthYear(rightMonth) }}
                </h3>
                <button
                  class="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  (click)="nextMonth('right')"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
              <!-- Days of Week -->
              <div class="grid grid-cols-7 gap-1 mb-2">
                @for (day of daysOfWeek; track day) {
                  <div class="text-center text-xs font-medium text-gray-500 py-1">
                    {{ day }}
                  </div>
                }
              </div>
              <!-- Calendar Days -->
              <div class="grid grid-cols-7 gap-1">
                @for (day of getDaysInMonth(rightMonth); track day) {
                  <button
                    class="h-8 text-sm rounded-md transition-colors disabled:cursor-default disabled:opacity-50"
                    [disabled]="!day || isDateDisabled(day)"
                    [class]="getDayClasses(day, 'right')"
                    (click)="selectDate(day)"
                  >
                    {{ day?.getDate() }}
                  </button>
                }
              </div>
            </div>
          </div>
          <!-- Footer Actions -->
          <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <button
              class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              (click)="clearSelection()"
            >
              Clear
            </button>
            <div class="flex space-x-2">
              <button
                class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                (click)="cancelSelection()"
              >
                Cancel
              </button>
              <button
                class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                [disabled]="!isValidRange()"
                (click)="applySelection()"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ScDateRangePicker implements OnInit {
  @Input() value: DateRange | null = null;
  @Input() placeholder: string = 'Select date range';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Output() valueChange = new EventEmitter<DateRange>();

  selectedRange: DateRange = { startDate: null, endDate: null };
  tempRange: DateRange = { startDate: null, endDate: null };
  leftMonth: Date = new Date();
  rightMonth: Date = new Date();
  showCalendar = false;
  isSelectingEnd = false;

  daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  quickRanges: QuickRange[] = [
    {
      label: 'Today',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: 'Yesterday',
      startDate: this.getDateDaysAgo(1),
      endDate: this.getDateDaysAgo(1),
    },
    {
      label: 'Last 7 days',
      startDate: this.getDateDaysAgo(7),
      endDate: new Date(),
    },
    {
      label: 'Last 30 days',
      startDate: this.getDateDaysAgo(30),
      endDate: new Date(),
    },
    {
      label: 'This month',
      startDate: this.getStartOfMonth(),
      endDate: new Date(),
    },
    {
      label: 'Last month',
      startDate: this.getStartOfLastMonth(),
      endDate: this.getEndOfLastMonth(),
    },
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.value) {
      this.selectedRange = { ...this.value };
      this.tempRange = { ...this.value };
    }

    // Initialize right month to be next month
    this.rightMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showCalendar = false;
      this.resetTempRange();
    }
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.tempRange = { ...this.selectedRange };
      this.isSelectingEnd = false;
    }
  }

  getDisplayValue(): string {
    if (this.selectedRange.startDate && this.selectedRange.endDate) {
      return `${this.formatDate(this.selectedRange.startDate)} - ${this.formatDate(this.selectedRange.endDate)}`;
    } else if (this.selectedRange.startDate) {
      return this.formatDate(this.selectedRange.startDate);
    }
    return '';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  getMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }

  previousMonth(calendar: 'left' | 'right') {
    if (calendar === 'left') {
      this.leftMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() - 1, 1);
      // Ensure right month is always after left month
      if (this.leftMonth >= this.rightMonth) {
        this.rightMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
      }
    } else {
      this.rightMonth = new Date(this.rightMonth.getFullYear(), this.rightMonth.getMonth() - 1, 1);
      // Ensure right month is always after left month
      if (this.rightMonth <= this.leftMonth) {
        this.leftMonth = new Date(this.rightMonth.getFullYear(), this.rightMonth.getMonth() - 1, 1);
      }
    }
  }

  nextMonth(calendar: 'left' | 'right') {
    if (calendar === 'left') {
      this.leftMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
      // Ensure right month is always after left month
      if (this.leftMonth >= this.rightMonth) {
        this.rightMonth = new Date(this.leftMonth.getFullYear(), this.leftMonth.getMonth() + 1, 1);
      }
    } else {
      this.rightMonth = new Date(this.rightMonth.getFullYear(), this.rightMonth.getMonth() + 1, 1);
      // Ensure right month is always after left month
      if (this.rightMonth <= this.leftMonth) {
        this.leftMonth = new Date(this.rightMonth.getFullYear(), this.rightMonth.getMonth() - 1, 1);
      }
    }
  }

  getDaysInMonth(date: Date): (Date | null)[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  getDayClasses(day: Date | null, calendar: 'left' | 'right'): string {
    if (!day) return '';

    let classes = 'hover:bg-blue-50 ';

    const isStart = this.tempRange.startDate && this.isSameDay(day, this.tempRange.startDate);
    const isEnd = this.tempRange.endDate && this.isSameDay(day, this.tempRange.endDate);
    const isInRange = this.isDateInRange(day);
    const isToday = this.isToday(day);

    if (isStart || isEnd) {
      classes += 'bg-blue-600 text-white hover:bg-blue-700 ';
    } else if (isInRange) {
      classes += 'bg-blue-100 text-blue-800 ';
    } else if (isToday) {
      classes += 'bg-gray-100 text-gray-800 font-medium ';
    } else {
      classes += 'text-gray-700 ';
    }

    return classes;
  }

  selectDate(day: Date | null) {
    if (!day || this.isDateDisabled(day)) return;

    if (!this.tempRange.startDate || this.isSelectingEnd) {
      // Selecting start date or we're explicitly selecting end date
      if (!this.tempRange.startDate) {
        this.tempRange.startDate = day;
        this.tempRange.endDate = null;
        this.isSelectingEnd = false;
      } else {
        // Selecting end date
        if (day >= this.tempRange.startDate) {
          this.tempRange.endDate = day;
        } else {
          // If selected date is before start date, make it the new start date
          this.tempRange.startDate = day;
          this.tempRange.endDate = null;
        }
        this.isSelectingEnd = false;
      }
    } else {
      // We have start date, selecting end date
      if (day >= this.tempRange.startDate) {
        this.tempRange.endDate = day;
      } else {
        // If selected date is before start date, make it the new start date
        this.tempRange.startDate = day;
        this.tempRange.endDate = null;
      }
    }
  }

  selectQuickRange(range: QuickRange) {
    this.tempRange = {
      startDate: new Date(range.startDate),
      endDate: new Date(range.endDate),
    };
  }

  clearSelection() {
    this.tempRange = { startDate: null, endDate: null };
  }

  cancelSelection() {
    this.resetTempRange();
    this.showCalendar = false;
  }

  applySelection() {
    if (this.isValidRange()) {
      this.selectedRange = { ...this.tempRange };
      this.valueChange.emit(this.selectedRange);
      this.showCalendar = false;
    }
  }

  private resetTempRange() {
    this.tempRange = { ...this.selectedRange };
    this.isSelectingEnd = false;
  }

  protected isValidRange(): boolean {
    return !!(this.tempRange.startDate && this.tempRange.endDate);
  }

  private isDateInRange(date: Date): boolean {
    if (!this.tempRange.startDate || !this.tempRange.endDate) return false;
    return date > this.tempRange.startDate && date < this.tempRange.endDate;
  }

  protected isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return this.isSameDay(date, today);
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  private getStartOfMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getStartOfLastMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }

  private getEndOfLastMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }
}

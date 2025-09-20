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

export interface DateTimeValue {
  date: Date;
  time: {
    hours: number;
    minutes: number;
    ampm: 'AM' | 'PM';
  };
}

@Component({
  selector: 'sc-date-time-picker',
  imports: [FormsModule],
  template: `
    <div class="relative">
      <!-- Main Input -->
      <div class="flex space-x-2">
        <div class="relative flex-1">
          <input
            class="w-full px-4 py-3 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer hover:border-gray-400 transition-colors"
            [value]="formatDate(selectedDate)"
            (click)="toggleCalendar()"
            type="text"
            readonly
            placeholder="Select date"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>

        <div class="relative">
          <input
            class="w-32 px-4 py-3 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer hover:border-gray-400 transition-colors"
            [value]="formatTime(selectedTime)"
            (click)="toggleTimePicker()"
            type="text"
            readonly
            placeholder="Time"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Calendar Dropdown -->
      @if (showCalendar) {
        <div
          class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-80"
        >
          <!-- Calendar Header -->
          <div class="flex items-center justify-between mb-4">
            <button
              class="p-1 hover:bg-gray-100 rounded-full transition-colors"
              (click)="previousMonth()"
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
            <h3 class="text-lg font-semibold text-gray-900">
              {{ getMonthYear(currentMonth) }}
            </h3>
            <button
              class="p-1 hover:bg-gray-100 rounded-full transition-colors"
              (click)="nextMonth()"
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
              <div class="text-center text-xs font-medium text-gray-500 py-2">
                {{ day }}
              </div>
            }
          </div>
          <!-- Calendar Days -->
          <div class="grid grid-cols-7 gap-1">
            @for (day of getDaysInMonth(currentMonth); track day) {
              <button
                class="h-8 text-sm rounded-md transition-colors disabled:cursor-default"
                [disabled]="!day"
                [class]="getDayClasses(day)"
                (click)="selectDate(day)"
              >
                {{ day?.getDate() }}
              </button>
            }
          </div>
          <!-- Today Button -->
          <div class="flex justify-end mt-4 pt-3 border-t border-gray-100">
            <button
              class="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              (click)="selectToday()"
            >
              Today
            </button>
          </div>
        </div>
      }

      <!-- Time Picker Dropdown -->
      @if (showTimePicker) {
        <div
          class="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-64"
        >
          <h4 class="text-sm font-medium text-gray-900 mb-3">Select Time</h4>
          <div class="flex items-center space-x-3">
            <!-- Hours -->
            <div class="flex-1">
              <label class="block text-xs text-gray-500 mb-1">Hours</label>
              <select
                class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                [(ngModel)]="selectedTime.hours"
                (change)="onTimeChange()"
              >
                @for (hour of hours; track hour) {
                  <option [value]="hour">
                    {{ hour.toString().padStart(2, '0') }}
                  </option>
                }
              </select>
            </div>
            <!-- Minutes -->
            <div class="flex-1">
              <label class="block text-xs text-gray-500 mb-1">Minutes</label>
              <select
                class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                [(ngModel)]="selectedTime.minutes"
                (change)="onTimeChange()"
              >
                @for (minute of minutes; track minute) {
                  <option [value]="minute">
                    {{ minute.toString().padStart(2, '0') }}
                  </option>
                }
              </select>
            </div>
            <!-- AM/PM -->
            <div class="flex-1">
              <label class="block text-xs text-gray-500 mb-1">AM/PM</label>
              <select
                class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                [(ngModel)]="selectedTime.ampm"
                (change)="onTimeChange()"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <!-- Quick Time Buttons -->
          <div class="mt-4 pt-3 border-t border-gray-100">
            <div class="flex flex-wrap gap-2">
              @for (time of quickTimes; track time) {
                <button
                  class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  (click)="selectQuickTime(time)"
                >
                  {{ time.label }}
                </button>
              }
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
export class ScDateTimePicker implements OnInit {
  @Input() value: DateTimeValue | null = null;
  @Output() valueChange = new EventEmitter<DateTimeValue>();

  selectedDate: Date = new Date();
  selectedTime = { hours: 12, minutes: 0, ampm: 'PM' as 'AM' | 'PM' };
  currentMonth: Date = new Date();
  showCalendar = false;
  showTimePicker = false;

  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  hours = Array.from({ length: 12 }, (_, i) => i + 1);
  minutes = [0, 15, 30, 45];

  quickTimes = [
    { label: '9:00 AM', hours: 9, minutes: 0, ampm: 'AM' as 'AM' | 'PM' },
    { label: '12:00 PM', hours: 12, minutes: 0, ampm: 'PM' as 'AM' | 'PM' },
    { label: '1:00 PM', hours: 1, minutes: 0, ampm: 'PM' as 'AM' | 'PM' },
    { label: '5:00 PM', hours: 5, minutes: 0, ampm: 'PM' as 'AM' | 'PM' },
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.value) {
      this.selectedDate = this.value.date;
      this.selectedTime = this.value.time;
      this.currentMonth = new Date(this.value.date);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showCalendar = false;
      this.showTimePicker = false;
    }
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
    this.showTimePicker = false;
  }

  toggleTimePicker() {
    this.showTimePicker = !this.showTimePicker;
    this.showCalendar = false;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatTime(time: { hours: number; minutes: number; ampm: 'AM' | 'PM' }): string {
    const hours = time.hours.toString().padStart(2, '0');
    const minutes = time.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes} ${time.ampm}`;
  }

  getMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  }

  previousMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1,
    );
  }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1,
    );
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

  getDayClasses(day: Date | null): string {
    if (!day) return '';

    let classes = 'hover:bg-blue-50 ';

    if (this.isToday(day)) {
      classes += 'bg-blue-100 text-blue-800 font-medium ';
    }

    if (this.isSameDay(day, this.selectedDate)) {
      classes += 'bg-blue-600 text-white hover:bg-blue-700 ';
    } else {
      classes += 'text-gray-700 ';
    }

    return classes;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  selectDate(day: Date | null) {
    if (!day) return;

    this.selectedDate = day;
    this.showCalendar = false;
    this.emitChange();
  }

  selectToday() {
    this.selectedDate = new Date();
    this.currentMonth = new Date();
    this.showCalendar = false;
    this.emitChange();
  }

  selectQuickTime(time: { hours: number; minutes: number; ampm: 'AM' | 'PM' }) {
    this.selectedTime = { ...time };
    this.showTimePicker = false;
    this.emitChange();
  }

  onTimeChange() {
    this.emitChange();
  }

  private emitChange() {
    this.valueChange.emit({
      date: this.selectedDate,
      time: this.selectedTime,
    });
  }
}

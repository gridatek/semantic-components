import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ScDayView } from './day-view';

@Component({
  selector: 'sc-week-view',
  imports: [DatePipe, ScDayView],
  template: `
    <div class="mb-4 flex items-center justify-between">
      <!-- Previous Week Button -->
      <button
        class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        (click)="goToPreviousWeek()"
        (keydown)="onKeydown($event, 'previous')"
        tabindex="0"
      >
        &lt;
      </button>

      <span class="grow text-center text-lg font-semibold">
        Week of {{ currentDate | date: 'MMMM d, yyyy' }}
      </span>

      <!-- Next Week Button -->
      <button
        class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        (click)="goToNextWeek()"
        (keydown)="onKeydown($event, 'next')"
        tabindex="0"
      >
        &gt;
      </button>
    </div>

    <!-- Week Days -->
    <div class="grid grid-cols-7 gap-4">
      @for (day of weekDays; track day) {
        <div>
          <sc-day-view [date]="day" />
          <!-- Pass each day to Day Component -->
        </div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScWeekView implements OnInit {
  currentDate: Date;
  weekDays: Date[];

  constructor() {
    this.currentDate = new Date();
    this.weekDays = this.getWeekDays(this.currentDate); // Get current week's days
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  // Helper method to get the dates for the week
  getWeekDays(date: Date): Date[] {
    const startOfWeek = date.getDate() - date.getDay(); // Start of the week (Sunday)
    const days: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(startOfWeek + i);
      days.push(day);
    }

    return days;
  }

  // Go to the previous week
  goToPreviousWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.weekDays = this.getWeekDays(this.currentDate);
  }

  // Go to the next week
  goToNextWeek(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.weekDays = this.getWeekDays(this.currentDate);
  }

  // Handle keyboard events for week navigation
  onKeydown(event: KeyboardEvent, direction: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      if (direction === 'previous') {
        this.goToPreviousWeek();
      } else if (direction === 'next') {
        this.goToNextWeek();
      }
    }
  }
}

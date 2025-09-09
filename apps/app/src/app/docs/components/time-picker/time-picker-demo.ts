import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-demo',
  imports: [ScTimePicker],
  template: `
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">24-hour format</h3>
        <p class="text-sm text-muted-foreground">Time picker in 24-hour format (military time).</p>
        <div class="space-y-4">
          <div [(value)]="time24Hour" [is24HourFormat]="true" sc-time-picker></div>
          <div class="text-sm">
            Selected time:
            <span class="font-mono">{{ formatTime(time24Hour(), true) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">12-hour format with AM/PM</h3>
        <p class="text-sm text-muted-foreground">
          Time picker in 12-hour format with AM/PM selector.
        </p>
        <div class="space-y-4">
          <div [(value)]="time12Hour" [is24HourFormat]="false" sc-time-picker></div>
          <div class="text-sm">
            Selected time:
            <span class="font-mono">{{ formatTime(time12Hour(), false) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With seconds</h3>
        <p class="text-sm text-muted-foreground">Time picker that includes seconds selection.</p>
        <div class="space-y-4">
          <div [(value)]="timeWithSeconds" [showSeconds]="true" sc-time-picker></div>
          <div class="text-sm">
            Selected time:
            <span class="font-mono">{{ formatTimeWithSeconds(timeWithSeconds()) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom step intervals</h3>
        <p class="text-sm text-muted-foreground">Time picker with 15-minute step intervals.</p>
        <div class="space-y-4">
          <div [(value)]="timeWithStep" [step]="15" sc-time-picker></div>
          <div class="text-sm">
            Selected time:
            <span class="font-mono">{{ formatTime(timeWithStep(), true) }}</span>
            <span class="text-muted-foreground ml-2">(15-minute steps)</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Disabled state</h3>
        <p class="text-sm text-muted-foreground">Time picker in disabled state.</p>
        <div class="space-y-4">
          <div [(value)]="disabledTime" [disabled]="true" sc-time-picker></div>
          <div class="text-sm text-muted-foreground">
            This time picker is disabled and cannot be modified.
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive example</h3>
        <p class="text-sm text-muted-foreground">
          Use the buttons to control the time picker programmatically.
        </p>
        <div class="space-y-4">
          <div [(value)]="interactiveTime" [showSeconds]="true" sc-time-picker></div>
          <div class="flex gap-2">
            <button
              class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
              (click)="setCurrentTime()"
            >
              Current Time
            </button>
            <button
              class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              (click)="setNoonTime()"
            >
              12:00 PM
            </button>
            <button
              class="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/90"
              (click)="resetTime()"
            >
              Reset
            </button>
          </div>
          <div class="text-sm">
            Selected time:
            <span class="font-mono">{{ formatTimeWithSeconds(interactiveTime()) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Multiple time pickers</h3>
        <p class="text-sm text-muted-foreground">
          Multiple time pickers for scheduling or time ranges.
        </p>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-medium">Start Time</label>
              <div [(value)]="startTime" [is24HourFormat]="false" sc-time-picker></div>
              <div class="text-xs text-muted-foreground">
                {{ formatTime(startTime(), false) }}
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">End Time</label>
              <div [(value)]="endTime" [is24HourFormat]="false" sc-time-picker></div>
              <div class="text-xs text-muted-foreground">
                {{ formatTime(endTime(), false) }}
              </div>
            </div>
          </div>
          <div class="p-4 bg-muted rounded-lg">
            <div class="text-sm font-medium">Schedule Summary</div>
            <div class="text-sm text-muted-foreground mt-1">
              Duration: {{ formatTime(startTime(), false) }} - {{ formatTime(endTime(), false) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDemo {
  readonly time24Hour = signal<TimeValue>({ hours: 14, minutes: 30 });
  readonly time12Hour = signal<TimeValue>({ hours: 9, minutes: 15 });
  readonly timeWithSeconds = signal<TimeValue>({ hours: 16, minutes: 45, seconds: 30 });
  readonly timeWithStep = signal<TimeValue>({ hours: 10, minutes: 0 });
  readonly disabledTime = signal<TimeValue>({ hours: 12, minutes: 0 });
  readonly interactiveTime = signal<TimeValue>({ hours: 8, minutes: 0, seconds: 0 });
  readonly startTime = signal<TimeValue>({ hours: 9, minutes: 0 });
  readonly endTime = signal<TimeValue>({ hours: 17, minutes: 30 });

  formatTime(time: TimeValue, is24Hour: boolean): string {
    if (is24Hour) {
      return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;
    } else {
      const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
      const period = time.hours >= 12 ? 'PM' : 'AM';
      return `${hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')} ${period}`;
    }
  }

  formatTimeWithSeconds(time: TimeValue): string {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${(time.seconds || 0).toString().padStart(2, '0')}`;
  }

  setCurrentTime(): void {
    const now = new Date();
    this.interactiveTime.set({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    });
  }

  setNoonTime(): void {
    this.interactiveTime.set({
      hours: 12,
      minutes: 0,
      seconds: 0,
    });
  }

  resetTime(): void {
    this.interactiveTime.set({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
}

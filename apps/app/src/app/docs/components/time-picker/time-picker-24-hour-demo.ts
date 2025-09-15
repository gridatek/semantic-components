import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-24-hour-demo',
  imports: [ScTimePicker],
  template: `
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">24-hour format</h3>
      <p class="text-sm text-muted-foreground">Time picker in 24-hour format (military time).</p>
      <div class="space-y-4">
        <div [(value)]="time24Hour" [is24HourFormat]="true" sc-time-picker></div>
        <div class="text-sm">
          Selected time:
          <span class="font-mono">{{ formatTime(time24Hour()) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePicker24HourDemo {
  readonly time24Hour = signal<TimeValue>({ hours: 14, minutes: 30 });

  formatTime(time: TimeValue): string {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;
  }
}

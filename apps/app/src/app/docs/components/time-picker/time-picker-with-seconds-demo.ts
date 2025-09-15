import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-with-seconds-demo',
  imports: [ScTimePicker],
  template: `
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
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerWithSecondsDemo {
  readonly timeWithSeconds = signal<TimeValue>({ hours: 16, minutes: 45, seconds: 30 });

  formatTimeWithSeconds(time: TimeValue): string {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${(time.seconds || 0).toString().padStart(2, '0')}`;
  }
}

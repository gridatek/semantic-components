import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  selector: 'app-clock-picker-12h-demo',
  imports: [ScClockPicker],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div [(value)]="time12h" sc-clock-picker format="12h"></div>
      <p class="text-sm text-muted-foreground">Selected: {{ formatTime(time12h) }}</p>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPicker12hDemo {
  time12h: TimeValue = { hours: 14, minutes: 30, period: 'PM' };

  formatTime(time: TimeValue): string {
    const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    return `${hours}:${time.minutes.toString().padStart(2, '0')} ${time.period}`;
  }
}

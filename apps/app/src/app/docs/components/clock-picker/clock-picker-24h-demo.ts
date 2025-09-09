import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  selector: 'app-clock-picker-24h-demo',
  imports: [ScClockPicker],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div [(value)]="time24h" sc-clock-picker format="24h"></div>
      <p class="text-sm text-muted-foreground">Selected: {{ formatTime(time24h) }}</p>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPicker24hDemo {
  time24h: TimeValue = { hours: 14, minutes: 30 };

  formatTime(time: TimeValue): string {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;
  }
}

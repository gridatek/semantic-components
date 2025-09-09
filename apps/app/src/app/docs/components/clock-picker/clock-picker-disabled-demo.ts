import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  selector: 'app-clock-picker-disabled-demo',
  imports: [ScClockPicker],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div [(value)]="timeDisabled" [disabled]="true" sc-clock-picker></div>
      <p class="text-sm text-muted-foreground">Selected: {{ formatTime(timeDisabled) }}</p>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPickerDisabledDemo {
  timeDisabled: TimeValue = { hours: 9, minutes: 15, period: 'AM' };

  formatTime(time: TimeValue): string {
    const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    return `${hours}:${time.minutes.toString().padStart(2, '0')} ${time.period}`;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerClock,
  ScTimePickerPeriod,
  TimeValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-clock-hours-time-picker-demo',
  imports: [ScTimePicker, ScTimePickerClock, ScTimePickerPeriod],
  template: `
    <div class="flex items-start gap-8">
      <div sc-time-picker format="12h" [(value)]="time">
        <div sc-time-picker-clock mode="hours"></div>
      </div>
      <div class="space-y-2">
        <p class="text-sm font-medium">Selected Hour</p>
        <p class="text-2xl tabular-nums">
          {{ (time()?.hours ?? 0) % 12 || 12 }}:00
          {{ (time()?.hours ?? 0) >= 12 ? 'PM' : 'AM' }}
        </p>
        <div sc-time-picker format="12h" [(value)]="time">
          <div sc-time-picker-period></div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockHoursTimePickerDemo {
  readonly time = signal<TimeValue | null>({ hours: 10, minutes: 0 });
}

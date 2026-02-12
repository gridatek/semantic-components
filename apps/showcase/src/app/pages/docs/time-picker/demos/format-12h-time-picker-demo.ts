import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerInput,
  ScTimePickerSeparator,
  ScTimePickerPeriod,
  TimeValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-format-12h-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <div sc-time-picker format="12h" [(value)]="time">
        <input sc-time-picker-input type="hours" aria-label="Hours" />
        <span sc-time-picker-separator>:</span>
        <input sc-time-picker-input type="minutes" aria-label="Minutes" />
        <div sc-time-picker-period></div>
      </div>
      <p class="text-sm text-muted-foreground">
        Selected: {{ formatTime(time()) }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Format12hTimePickerDemo {
  readonly time = signal<TimeValue | null>({
    hours: 9,
    minutes: 30,
    period: 'AM',
  });

  formatTime(val: TimeValue | null): string {
    if (!val) return 'No time selected';
    const hours = val.hours % 12 || 12;
    const period = val.period || (val.hours >= 12 ? 'PM' : 'AM');
    return `${hours.toString().padStart(2, '0')}:${val.minutes.toString().padStart(2, '0')} ${period}`;
  }
}

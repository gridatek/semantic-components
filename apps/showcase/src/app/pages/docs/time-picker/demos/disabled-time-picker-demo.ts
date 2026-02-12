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
  selector: 'app-disabled-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
  ],
  template: `
    <div sc-time-picker format="12h" [disabled]="true" [(value)]="time">
      <input sc-time-picker-input type="hours" aria-label="Hours" />
      <span sc-time-picker-separator>:</span>
      <input sc-time-picker-input type="minutes" aria-label="Minutes" />
      <div sc-time-picker-period></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTimePickerDemo {
  readonly time = signal<TimeValue | null>({
    hours: 8,
    minutes: 0,
    period: 'AM',
  });
}

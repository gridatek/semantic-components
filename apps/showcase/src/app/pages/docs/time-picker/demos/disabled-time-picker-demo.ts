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
    <div scTimePicker format="12h" [disabled]="true" [(value)]="time">
      <input scTimePickerInput type="hours" aria-label="Hours" />
      <span scTimePickerSeparator>:</span>
      <input scTimePickerInput type="minutes" aria-label="Minutes" />
      <div scTimePickerPeriod></div>
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

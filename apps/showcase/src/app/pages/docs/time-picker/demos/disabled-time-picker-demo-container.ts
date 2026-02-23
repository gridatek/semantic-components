import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTimePickerDemo } from './disabled-time-picker-demo';

@Component({
  selector: 'app-disabled-time-picker-demo-container',
  imports: [DemoContainer, DisabledTimePickerDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-time-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTimePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerInput,
  ScTimePickerHoursInput,
  ScTimePickerMinutesInput,
  ScTimePickerSeparator,
  ScTimePickerPeriod,
  ScTimePickerPeriodAM,
  ScTimePickerPeriodPM,
  ScTimeValue,
} from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
    ScTimePickerPeriodAM,
    ScTimePickerPeriodPM,
  ],
  template: \`
    <div scTimePicker format="12h" [disabled]="true" [(value)]="time">
      <input scTimePickerInput scTimePickerHoursInput />
      <span scTimePickerSeparator>:</span>
      <input scTimePickerInput scTimePickerMinutesInput />
      <div scTimePickerPeriod>
        <button scTimePickerPeriodAM>AM</button>
        <button scTimePickerPeriodPM>PM</button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTimePickerDemo {
  readonly time = signal<ScTimeValue | null>({
    hours: 8,
    minutes: 0,
    period: 'AM',
  });
}`;
}

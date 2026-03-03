import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HoursTimePickerClockDemo } from './hours-time-picker-clock-demo';

@Component({
  selector: 'app-hours-time-picker-clock-demo-container',
  imports: [DemoContainer, HoursTimePickerClockDemo],
  template: `
    <app-demo-container
      title="Demo"
      demoUrl="/demos/time-picker-clock/hours-time-picker-clock-demo"
      [code]="code"
    >
      <app-hours-time-picker-clock-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoursTimePickerClockDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerHoursInput,
  ScTimePickerInput,
  ScTimePickerMinutesInput,
  ScTimePickerPeriod,
  ScTimePickerPeriodAM,
  ScTimePickerPeriodPM,
  ScTimePickerSeparator,
  ScTimeValue,
} from '@semantic-components/ui';
import { ScTimePickerClock } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-hours-time-picker-clock-demo',
  imports: [
    ScTimePicker,
    ScTimePickerClock,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
    ScTimePickerPeriodAM,
    ScTimePickerPeriodPM,
  ],
  template: \`
    <div
      scTimePicker
      format="12h"
      [(value)]="time"
      class="flex flex-col items-center gap-4"
    >
      <div class="flex items-center gap-2">
        <input
          scTimePickerInput
          scTimePickerHoursInput
          (focus)="clockMode.set('hours')"
        />
        <span scTimePickerSeparator>:</span>
        <input
          scTimePickerInput
          scTimePickerMinutesInput
          (focus)="clockMode.set('minutes')"
        />
        <div scTimePickerPeriod>
          <button scTimePickerPeriodAM>AM</button>
          <button scTimePickerPeriodPM>PM</button>
        </div>
      </div>
      <div
        scTimePickerClock
        [mode]="clockMode()"
        (valueSelected)="onValueSelected()"
      ></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoursTimePickerClockDemo {
  readonly time = signal<ScTimeValue | null>({ hours: 10, minutes: 0 });
  readonly clockMode = signal<'hours' | 'minutes'>('hours');

  onValueSelected(): void {
    if (this.clockMode() === 'hours') {
      setTimeout(() => this.clockMode.set('minutes'), 300);
    }
  }
}`;
}

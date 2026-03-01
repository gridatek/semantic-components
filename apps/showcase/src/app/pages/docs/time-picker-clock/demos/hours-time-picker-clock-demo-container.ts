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
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerPeriod,
  ScTimePickerPeriodAM,
  ScTimePickerPeriodPM,
  ScTimeValue,
} from '@semantic-components/ui';
import { ScTimePickerClock } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-hours-time-picker-clock-demo',
  imports: [
    ScTimePicker,
    ScTimePickerClock,
    ScTimePickerPeriod,
    ScTimePickerPeriodAM,
    ScTimePickerPeriodPM,
  ],
  template: \`
    <div class="flex items-start gap-8">
      <div scTimePicker format="12h" [(value)]="time">
        <div scTimePickerClock mode="hours"></div>
      </div>
      <div class="space-y-2">
        <p class="text-sm font-medium">Selected Hour</p>
        <p class="text-2xl tabular-nums">
          {{ (time()?.hours ?? 0) % 12 || 12 }}:00
          {{ (time()?.hours ?? 0) >= 12 ? 'PM' : 'AM' }}
        </p>
        <div scTimePicker format="12h" [(value)]="time">
          <div scTimePickerPeriod>
            <button scTimePickerPeriodAM>AM</button>
            <button scTimePickerPeriodPM>PM</button>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoursTimePickerClockDemo {
  readonly time = signal<ScTimeValue | null>({ hours: 10, minutes: 0 });
}`;
}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ClockMinutesTimePickerDemo } from './clock-minutes-time-picker-demo';

@Component({
  selector: 'app-clock-minutes-time-picker-demo-container',
  imports: [DemoContainer, ClockMinutesTimePickerDemo],
  template: `
    <app-demo-container title="Clock Interface - Minutes" [code]="code">
      <app-clock-minutes-time-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockMinutesTimePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerClock,
  TimeValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-clock-minutes-time-picker-demo',
  imports: [ScTimePicker, ScTimePickerClock],
  template: \`
    <div class="flex items-start gap-8">
      <div sc-time-picker format="12h" [(value)]="time">
        <div sc-time-picker-clock mode="minutes"></div>
      </div>
      <div class="space-y-2">
        <p class="text-sm font-medium">Selected Time</p>
        <p class="text-2xl tabular-nums">
          {{ ((time()?.hours ?? 0) % 12 || 12).toString().padStart(2, '0') }}:{{
            (time()?.minutes ?? 0).toString().padStart(2, '0')
          }}
        </p>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockMinutesTimePickerDemo {
  readonly time = signal<TimeValue | null>({
    hours: 10,
    minutes: 30,
  });
}`;
}

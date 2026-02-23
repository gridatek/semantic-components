import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MinutesTimePickerClockDemo } from './minutes-time-picker-clock-demo';

@Component({
  selector: 'app-minutes-time-picker-clock-demo-container',
  imports: [DemoContainer, MinutesTimePickerClockDemo],
  template: `
    <app-demo-container
      title="Minutes"
      demoUrl="/demos/time-picker-clock/minutes-time-picker-clock-demo"
      [code]="code"
    >
      <app-minutes-time-picker-clock-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinutesTimePickerClockDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerClock,
  ScTimeValue,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-minutes-time-picker-clock-demo',
  imports: [ScTimePicker, ScTimePickerClock],
  template: \`
    <div class="flex items-start gap-8">
      <div scTimePicker format="12h" [(value)]="time">
        <div scTimePickerClock mode="minutes"></div>
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
export class MinutesTimePickerClockDemo {
  readonly time = signal<ScTimeValue | null>({
    hours: 10,
    minutes: 30,
  });
}`;
}

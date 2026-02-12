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
  template: \`
    <div sc-time-picker format="12h" [disabled]="true" [(value)]="time">
      <input sc-time-picker-input type="hours" aria-label="Hours" />
      <span sc-time-picker-separator>:</span>
      <input sc-time-picker-input type="minutes" aria-label="Minutes" />
      <div sc-time-picker-period></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledTimePickerDemo {
  readonly time = signal<TimeValue | null>({
    hours: 8,
    minutes: 0,
    period: 'AM',
  });
}`;
}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { Format24hTimePickerDemo } from './format-24h-time-picker-demo';

@Component({
  selector: 'app-format-24h-time-picker-demo-container',
  imports: [DemoContainer, Format24hTimePickerDemo],
  template: `
    <app-demo-container title="24 Hour Format" [code]="code">
      <app-format-24h-time-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Format24hTimePickerDemoContainer {
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
  ScTimePickerSeparator,
  ScTimeValue,
} from '@semantic-components/ui';

@Component({
  selector: 'app-format-24h-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSeparator,
  ],
  template: \`
    <div class="flex flex-col gap-4">
      <div scTimePicker format="24h" [(value)]="time">
        <input scTimePickerInput scTimePickerHoursInput />
        <span scTimePickerSeparator>:</span>
        <input scTimePickerInput scTimePickerMinutesInput />
      </div>
      <p class="text-muted-foreground text-sm">
        Selected: {{ formatTime(time()) }}
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Format24hTimePickerDemo {
  readonly time = signal<ScTimeValue | null>({ hours: 14, minutes: 45 });

  formatTime(val: ScTimeValue | null): string {
    if (!val) return 'No time selected';
    return \`\${val.hours.toString().padStart(2, '0')}:\${val.minutes.toString().padStart(2, '0')}\`;
  }
}`;
}

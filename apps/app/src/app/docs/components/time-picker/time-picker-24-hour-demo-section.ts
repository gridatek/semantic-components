import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimePicker24HourDemo } from './time-picker-24-hour-demo';

@Component({
  selector: 'app-time-picker-24-hour-demo-section',
  imports: [PreviewCodeTabs, TimePicker24HourDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-time-picker-24-hour-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePicker24HourDemoSection {
  readonly title = input<string>('24-hour format');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-24-hour-demo',
  imports: [ScTimePicker],
  template: \`
    <div class="space-y-4">
      <div sc-time-picker [(value)]="time24Hour" [is24HourFormat]="true"></div>
      <div class="text-sm">
        Selected time: <span class="font-mono">{{ formatTime(time24Hour()) }}</span>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePicker24HourDemo {
  readonly time24Hour = signal<TimeValue>({ hours: 14, minutes: 30 });

  formatTime(time: TimeValue): string {
    return \`\${time.hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')}\`;
  }
}`;
}

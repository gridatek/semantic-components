import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimePicker12HourDemo } from './time-picker-12-hour-demo';

@Component({
  selector: 'app-time-picker-12-hour-demo-section',
  imports: [PreviewCodeTabs, TimePicker12HourDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-time-picker-12-hour-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePicker12HourDemoSection {
  readonly title = input<string>('12-hour format');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-12-hour-demo',
  imports: [ScTimePicker],
  template: \`
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">12-hour format with AM/PM</h3>
      <p class="text-sm text-muted-foreground">
        Time picker in 12-hour format with AM/PM selector.
      </p>
      <div class="space-y-4">
        <div [(value)]="time12Hour" [is24HourFormat]="false" sc-time-picker></div>
        <div class="text-sm">
          Selected time:
          <span class="font-mono">{{ formatTime(time12Hour()) }}</span>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePicker12HourDemo {
  readonly time12Hour = signal<TimeValue>({ hours: 9, minutes: 15 });

  formatTime(time: TimeValue): string {
    const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    const period = time.hours >= 12 ? 'PM' : 'AM';
    return \`\${hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')} \${period}\`;
  }
}`;
}

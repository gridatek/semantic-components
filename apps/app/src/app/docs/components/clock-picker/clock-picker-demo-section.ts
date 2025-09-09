import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ClockPickerDemo } from './clock-picker-demo';

@Component({
  selector: 'app-clock-picker-demo-section',
  imports: [PreviewCodeTabs, ClockPickerDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-clock-picker-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPickerDemoSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  selector: 'app-clock-picker-demo',
  imports: [ScClockPicker],
  template: \`
    <div class="flex flex-col items-center gap-6">
      <!-- 12-hour format -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">12-hour format</h3>
        <div sc-clock-picker [(value)]="time12h" format="12h"></div>
        <p class="text-sm text-muted-foreground">
          Selected: {{ formatTime(time12h, '12h') }}
        </p>
      </div>

      <!-- 24-hour format -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">24-hour format</h3>
        <div sc-clock-picker [(value)]="time24h" format="24h"></div>
        <p class="text-sm text-muted-foreground">
          Selected: {{ formatTime(time24h, '24h') }}
        </p>
      </div>

      <!-- Disabled state -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Disabled</h3>
        <div sc-clock-picker [(value)]="timeDisabled" [disabled]="true"></div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPickerDemo {
  time12h: TimeValue = { hours: 14, minutes: 30, period: 'PM' };
  time24h: TimeValue = { hours: 14, minutes: 30 };
  timeDisabled: TimeValue = { hours: 9, minutes: 15, period: 'AM' };

  formatTime(time: TimeValue, format: '12h' | '24h'): string {
    if (format === '12h') {
      const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
      return \`\${hours}:\${time.minutes.toString().padStart(2, '0')} \${time.period}\`;
    } else {
      return \`\${time.hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')}\`;
    }
  }
}`;
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ClockPickerDisabledDemo } from './clock-picker-disabled-demo';

@Component({
  selector: 'app-clock-picker-disabled-demo-section',
  imports: [PreviewCodeTabs, ClockPickerDisabledDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-clock-picker-disabled-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPickerDisabledDemoSection {
  readonly title = input<string>('Disabled State');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  selector: 'app-clock-picker-disabled-demo',
  imports: [ScClockPicker],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div [(value)]="timeDisabled" [disabled]="true" sc-clock-picker></div>
      <p class="text-sm text-muted-foreground">Selected: {{ formatTime(timeDisabled) }}</p>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPickerDisabledDemo {
  timeDisabled: TimeValue = { hours: 9, minutes: 15, period: 'AM' };

  formatTime(time: TimeValue): string {
    const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    return \`\${hours}:\${time.minutes.toString().padStart(2, '0')} \${time.period}\`;
  }
}`;
}

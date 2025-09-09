import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ClockPicker12hDemo } from './clock-picker-12h-demo';

@Component({
  selector: 'app-clock-picker-12h-demo-section',
  imports: [PreviewCodeTabs, ClockPicker12hDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-clock-picker-12h-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPicker12hDemoSection {
  readonly title = input<string>('12-Hour Format');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  selector: 'app-clock-picker-12h-demo',
  imports: [ScClockPicker],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div [(value)]="time12h" sc-clock-picker format="12h"></div>
      <p class="text-sm text-muted-foreground">Selected: {{ formatTime(time12h) }}</p>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPicker12hDemo {
  time12h: TimeValue = { hours: 14, minutes: 30, period: 'PM' };

  formatTime(time: TimeValue): string {
    const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    return \`\${hours}:\${time.minutes.toString().padStart(2, '0')} \${time.period}\`;
  }
}`;
}

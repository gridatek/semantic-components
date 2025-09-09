import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ClockPicker24hDemo } from './clock-picker-24h-demo';

@Component({
  selector: 'app-clock-picker-24h-demo-section',
  imports: [PreviewCodeTabs, ClockPicker24hDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-clock-picker-24h-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPicker24hDemoSection {
  readonly title = input<string>('24-Hour Format');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  selector: 'app-clock-picker-24h-demo',
  imports: [ScClockPicker],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div [(value)]="time24h" sc-clock-picker format="24h"></div>
      <p class="text-sm text-muted-foreground">Selected: {{ formatTime(time24h) }}</p>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockPicker24hDemo {
  time24h: TimeValue = { hours: 14, minutes: 30 };

  formatTime(time: TimeValue): string {
    return \`\${time.hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')}\`;
  }
}`;
}

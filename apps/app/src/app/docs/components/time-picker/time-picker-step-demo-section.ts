import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimePickerStepDemo } from './time-picker-step-demo';

@Component({
  selector: 'app-time-picker-step-demo-section',
  imports: [PreviewCodeTabs, TimePickerStepDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-time-picker-step-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerStepDemoSection {
  readonly title = input<string>('Custom step intervals');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-step-demo',
  imports: [ScTimePicker],
  template: \`
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Custom step intervals</h3>
      <p class="text-sm text-muted-foreground">Time picker with 15-minute step intervals.</p>
      <div class="space-y-4">
        <div [(value)]="timeWithStep" [step]="15" sc-time-picker></div>
        <div class="text-sm">
          Selected time:
          <span class="font-mono">{{ formatTime(timeWithStep()) }}</span>
          <span class="text-muted-foreground ml-2">(15-minute steps)</span>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerStepDemo {
  readonly timeWithStep = signal<TimeValue>({ hours: 10, minutes: 0 });

  formatTime(time: TimeValue): string {
    return \`\${time.hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')}\`;
  }
}`;
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimePickerMultipleDemo } from './time-picker-multiple-demo';

@Component({
  selector: 'app-time-picker-multiple-demo-section',
  imports: [PreviewCodeTabs, TimePickerMultipleDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-time-picker-multiple-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerMultipleDemoSection {
  readonly title = input<string>('Multiple time pickers');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-multiple-demo',
  imports: [ScTimePicker],
  template: \`
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Multiple time pickers</h3>
      <p class="text-sm text-muted-foreground">
        Multiple time pickers for scheduling or time ranges.
      </p>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <label class="block text-sm font-medium">Start Time</label>
            <div [(value)]="startTime" [is24HourFormat]="false" sc-time-picker></div>
            <div class="text-xs text-muted-foreground">
              {{ formatTime(startTime()) }}
            </div>
          </div>
          <div class="space-y-3">
            <label class="block text-sm font-medium">End Time</label>
            <div [(value)]="endTime" [is24HourFormat]="false" sc-time-picker></div>
            <div class="text-xs text-muted-foreground">
              {{ formatTime(endTime()) }}
            </div>
          </div>
        </div>
        <div class="p-4 bg-muted rounded-lg">
          <div class="text-sm font-medium">Schedule Summary</div>
          <div class="text-sm text-muted-foreground mt-1">
            Duration: {{ formatTime(startTime()) }} - {{ formatTime(endTime()) }}
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerMultipleDemo {
  readonly startTime = signal<TimeValue>({ hours: 9, minutes: 0 });
  readonly endTime = signal<TimeValue>({ hours: 17, minutes: 30 });

  formatTime(time: TimeValue): string {
    const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    const period = time.hours >= 12 ? 'PM' : 'AM';
    return \`\${hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')} \${period}\`;
  }
}`;
}

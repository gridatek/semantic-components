import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimePickerDemo } from './time-picker-demo';

@Component({
  selector: 'app-time-picker-demo-section',
  imports: [TimePickerDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-time-picker-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-demo',
  imports: [ScTimePicker],
  template: \`
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">24-hour format</h3>
        <p class="text-sm text-muted-foreground">
          Time picker in 24-hour format (military time).
        </p>
        <div class="space-y-4">
          <div sc-time-picker [(value)]="time24Hour" [is24HourFormat]="true"></div>
          <div class="text-sm">
            Selected time: <span class="font-mono">{{ formatTime(time24Hour(), true) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">12-hour format with AM/PM</h3>
        <p class="text-sm text-muted-foreground">
          Time picker in 12-hour format with AM/PM selector.
        </p>
        <div class="space-y-4">
          <div sc-time-picker [(value)]="time12Hour" [is24HourFormat]="false"></div>
          <div class="text-sm">
            Selected time: <span class="font-mono">{{ formatTime(time12Hour(), false) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With seconds</h3>
        <p class="text-sm text-muted-foreground">
          Time picker that includes seconds selection.
        </p>
        <div class="space-y-4">
          <div sc-time-picker [(value)]="timeWithSeconds" [showSeconds]="true"></div>
          <div class="text-sm">
            Selected time: <span class="font-mono">{{ formatTimeWithSeconds(timeWithSeconds()) }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive example</h3>
        <div class="space-y-4">
          <div sc-time-picker [(value)]="interactiveTime" [showSeconds]="true"></div>
          <div class="flex gap-2">
            <button 
              class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
              (click)="setCurrentTime()">
              Current Time
            </button>
            <button 
              class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
              (click)="setNoonTime()">
              12:00 PM
            </button>
            <button 
              class="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/90"
              (click)="resetTime()">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDemo {
  readonly time24Hour = signal<TimeValue>({ hours: 14, minutes: 30 });
  readonly time12Hour = signal<TimeValue>({ hours: 9, minutes: 15 });
  readonly timeWithSeconds = signal<TimeValue>({ hours: 16, minutes: 45, seconds: 30 });
  readonly interactiveTime = signal<TimeValue>({ hours: 8, minutes: 0, seconds: 0 });

  formatTime(time: TimeValue, is24Hour: boolean): string {
    if (is24Hour) {
      return \`\${time.hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')}\`;
    } else {
      const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
      const period = time.hours >= 12 ? 'PM' : 'AM';
      return \`\${hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')} \${period}\`;
    }
  }

  formatTimeWithSeconds(time: TimeValue): string {
    return \`\${time.hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')}:\${(time.seconds || 0).toString().padStart(2, '0')}\`;
  }

  setCurrentTime(): void {
    const now = new Date();
    this.interactiveTime.set({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    });
  }

  setNoonTime(): void {
    this.interactiveTime.set({
      hours: 12,
      minutes: 0,
      seconds: 0
    });
  }

  resetTime(): void {
    this.interactiveTime.set({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  }
}`;
}

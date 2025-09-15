import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimePickerInteractiveDemo } from './time-picker-interactive-demo';

@Component({
  selector: 'app-time-picker-interactive-demo-section',
  imports: [PreviewCodeTabs, TimePickerInteractiveDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-time-picker-interactive-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerInteractiveDemoSection {
  readonly title = input<string>('Interactive example');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-interactive-demo',
  imports: [ScTimePicker],
  template: \`
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Interactive example</h3>
      <p class="text-sm text-muted-foreground">
        Use the buttons to control the time picker programmatically.
      </p>
      <div class="space-y-4">
        <div [(value)]="interactiveTime" [showSeconds]="true" sc-time-picker></div>
        <div class="flex gap-2">
          <button
            class="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
            (click)="setCurrentTime()"
          >
            Current Time
          </button>
          <button
            class="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90"
            (click)="setNoonTime()"
          >
            12:00 PM
          </button>
          <button
            class="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/90"
            (click)="resetTime()"
          >
            Reset
          </button>
        </div>
        <div class="text-sm">
          Selected time:
          <span class="font-mono">{{ formatTimeWithSeconds(interactiveTime()) }}</span>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerInteractiveDemo {
  readonly interactiveTime = signal<TimeValue>({ hours: 8, minutes: 0, seconds: 0 });

  formatTimeWithSeconds(time: TimeValue): string {
    return \`\${time.hours.toString().padStart(2, '0')}:\${time.minutes.toString().padStart(2, '0')}:\${(time.seconds || 0).toString().padStart(2, '0')}\`;
  }

  setCurrentTime(): void {
    const now = new Date();
    this.interactiveTime.set({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    });
  }

  setNoonTime(): void {
    this.interactiveTime.set({
      hours: 12,
      minutes: 0,
      seconds: 0,
    });
  }

  resetTime(): void {
    this.interactiveTime.set({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }
}`;
}

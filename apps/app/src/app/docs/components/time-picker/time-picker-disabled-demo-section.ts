import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { TimePickerDisabledDemo } from './time-picker-disabled-demo';

@Component({
  selector: 'app-time-picker-disabled-demo-section',
  imports: [PreviewCodeTabs, TimePickerDisabledDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-time-picker-disabled-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDisabledDemoSection {
  readonly title = input<string>('Disabled state');
  readonly level = input<'2' | '3'>('3');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScTimePicker } from '@semantic-components/ui';

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'app-time-picker-disabled-demo',
  imports: [ScTimePicker],
  template: \`
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Disabled state</h3>
      <p class="text-sm text-muted-foreground">Time picker in disabled state.</p>
      <div class="space-y-4">
        <div [(value)]="disabledTime" [disabled]="true" sc-time-picker></div>
        <div class="text-sm text-muted-foreground">
          This time picker is disabled and cannot be modified.
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerDisabledDemo {
  readonly disabledTime = signal<TimeValue>({ hours: 12, minutes: 0 });
}`;
}

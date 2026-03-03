import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PresetsTimePickerDemo } from './presets-time-picker-demo';

@Component({
  selector: 'app-presets-time-picker-demo-container',
  imports: [DemoContainer, PresetsTimePickerDemo],
  template: `
    <app-demo-container title="Preset Times" [code]="code">
      <app-presets-time-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetsTimePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTimePicker,
  ScTimePickerHoursInput,
  ScTimePickerInput,
  ScTimePickerMinutesInput,
  ScTimePickerPeriod,
  ScTimePickerPeriodAM,
  ScTimePickerPeriodPM,
  ScTimePickerSeparator,
  ScTimeValue,
} from '@semantic-components/ui';

@Component({
  selector: 'app-presets-time-picker-demo',
  imports: [
    ScTimePicker,
    ScTimePickerInput,
    ScTimePickerHoursInput,
    ScTimePickerMinutesInput,
    ScTimePickerSeparator,
    ScTimePickerPeriod,
    ScTimePickerPeriodAM,
    ScTimePickerPeriodPM,
  ],
  template: \`
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
          (click)="setPreset(9, 0, 'AM')"
        >
          9:00 AM
        </button>
        <button
          type="button"
          class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
          (click)="setPreset(12, 0, 'PM')"
        >
          12:00 PM
        </button>
        <button
          type="button"
          class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
          (click)="setPreset(3, 30, 'PM')"
        >
          3:30 PM
        </button>
        <button
          type="button"
          class="hover:bg-accent rounded-md border px-3 py-1.5 text-sm"
          (click)="setPreset(6, 0, 'PM')"
        >
          6:00 PM
        </button>
      </div>
      <div scTimePicker format="12h" [(value)]="time">
        <input scTimePickerInput scTimePickerHoursInput />
        <span scTimePickerSeparator>:</span>
        <input scTimePickerInput scTimePickerMinutesInput />
        <div scTimePickerPeriod>
          <button scTimePickerPeriodAM>AM</button>
          <button scTimePickerPeriodPM>PM</button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetsTimePickerDemo {
  readonly time = signal<ScTimeValue | null>(null);

  setPreset(hours: number, minutes: number, period: 'AM' | 'PM'): void {
    const adjustedHours =
      period === 'PM' && hours !== 12
        ? hours + 12
        : period === 'AM' && hours === 12
          ? 0
          : hours;
    this.time.set({ hours: adjustedHours, minutes, period });
  }
}`;
}

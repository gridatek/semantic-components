import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRange } from '@semantic-components/ui';
import {
  ScDateRangePicker,
  ScDateRangePreset,
  createScDateRangePresets,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-presets-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <sc-date-range-picker
      [(value)]="range"
      [presets]="presets"
      placeholder="Select date range"
    />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetsDateRangePickerDemo {
  readonly range = signal<ScDateRange>({ from: undefined, to: undefined });
  readonly presets: ScDateRangePreset[] = createScDateRangePresets();
}

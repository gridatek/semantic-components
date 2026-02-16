import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDateRangePicker,
  DateRange,
  DateRangePreset,
  createDateRangePresets,
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
  readonly range = signal<DateRange>({ from: undefined, to: undefined });
  readonly presets: DateRangePreset[] = createDateRangePresets();
}

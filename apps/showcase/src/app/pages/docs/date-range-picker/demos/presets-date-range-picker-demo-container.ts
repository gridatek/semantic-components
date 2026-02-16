import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PresetsDateRangePickerDemo } from './presets-date-range-picker-demo';

@Component({
  selector: 'app-presets-date-range-picker-demo-container',
  imports: [DemoContainer, PresetsDateRangePickerDemo],
  template: `
    <app-demo-container
      title="With Presets"
      demoUrl="/demos/date-range-picker/presets-date-range-picker-demo"
      [code]="code"
    >
      <app-presets-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetsDateRangePickerDemoContainer {
  readonly code = `import {
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
  template: \`
    <sc-date-range-picker
      [(value)]="range"
      [presets]="presets"
      placeholder="Select date range"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetsDateRangePickerDemo {
  readonly range = signal<DateRange>({ from: undefined, to: undefined });
  readonly presets: DateRangePreset[] = createDateRangePresets();
}`;
}

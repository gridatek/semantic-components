import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AnalyticsDateRangePickerDemo } from './analytics-date-range-picker-demo';

@Component({
  selector: 'app-analytics-date-range-picker-demo-container',
  imports: [DemoContainer, AnalyticsDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Analytics Example"
      demoUrl="/demos/date-range-picker/analytics-date-range-picker-demo"
      [code]="code"
    >
      <app-analytics-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsDateRangePickerDemoContainer {
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
  selector: 'app-analytics-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: \`
    <div class="max-w-2xl rounded-lg border p-4 space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">Analytics Dashboard</h4>
        <sc-date-range-picker
          [(value)]="range"
          [presets]="presets"
          placeholder="Select period"
        />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="rounded-lg bg-muted p-4">
          <div class="text-2xl font-bold">12,345</div>
          <div class="text-sm text-muted-foreground">Page Views</div>
        </div>
        <div class="rounded-lg bg-muted p-4">
          <div class="text-2xl font-bold">1,234</div>
          <div class="text-sm text-muted-foreground">Unique Visitors</div>
        </div>
        <div class="rounded-lg bg-muted p-4">
          <div class="text-2xl font-bold">5.2%</div>
          <div class="text-sm text-muted-foreground">Conversion Rate</div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsDateRangePickerDemo {
  readonly range = signal<DateRange>({ from: undefined, to: undefined });
  readonly presets: DateRangePreset[] = createDateRangePresets();
}`;
}

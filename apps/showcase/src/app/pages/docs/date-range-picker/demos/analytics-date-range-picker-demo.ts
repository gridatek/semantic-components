import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScDateRange } from '@semantic-components/ui';
import {
  ScDateRangePicker,
  ScDateRangePreset,
  createScDateRangePresets,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-analytics-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <div class="max-w-2xl space-y-4 rounded-lg border p-4">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">Analytics Dashboard</h4>
        <sc-date-range-picker
          [(value)]="range"
          [presets]="presets"
          placeholder="Select period"
        />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-muted rounded-lg p-4">
          <div class="text-2xl font-bold">12,345</div>
          <div class="text-muted-foreground text-sm">Page Views</div>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-2xl font-bold">1,234</div>
          <div class="text-muted-foreground text-sm">Unique Visitors</div>
        </div>
        <div class="bg-muted rounded-lg p-4">
          <div class="text-2xl font-bold">5.2%</div>
          <div class="text-muted-foreground text-sm">Conversion Rate</div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsDateRangePickerDemo {
  readonly range = signal<ScDateRange>({ from: undefined, to: undefined });
  readonly presets: ScDateRangePreset[] = createScDateRangePresets();
}

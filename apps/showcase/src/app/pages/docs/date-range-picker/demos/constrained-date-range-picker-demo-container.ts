import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConstrainedDateRangePickerDemo } from './constrained-date-range-picker-demo';

@Component({
  selector: 'app-constrained-date-range-picker-demo-container',
  imports: [DemoContainer, ConstrainedDateRangePickerDemo],
  template: `
    <app-demo-container
      title="With Min/Max Dates"
      demoUrl="/demos/date-range-picker/constrained-date-range-picker-demo"
      [code]="code"
    >
      <app-constrained-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDateRangePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-constrained-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: \`
    <p class="text-sm text-muted-foreground mb-4">
      Restrict selection to dates within the last 30 days.
    </p>
    <sc-date-range-picker
      [minDate]="minDate"
      [maxDate]="maxDate"
      placeholder="Select within last 30 days"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDateRangePickerDemo {
  readonly minDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  readonly maxDate = new Date();
}`;
}

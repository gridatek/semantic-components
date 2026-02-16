import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConstrainedDatePickerDemo } from './constrained-date-picker-demo';

@Component({
  selector: 'app-constrained-date-picker-demo-container',
  imports: [DemoContainer, ConstrainedDatePickerDemo],
  template: `
    <app-demo-container
      title="With Constraints"
      demoUrl="/demos/date-picker/constrained-date-picker-demo"
      [code]="code"
    >
      <app-constrained-date-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDatePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScDatePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-constrained-date-picker-demo',
  imports: [ScDatePicker],
  template: \`
    <p class="text-xs text-muted-foreground mb-4">
      Only dates within the next 30 days
    </p>
    <sc-date-picker
      [(selected)]="selectedDate"
      [minDate]="minDate"
      [maxDate]="maxDate"
      placeholder="Pick a date (next 30 days)"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedDatePickerDemo {
  readonly selectedDate = signal<Date | undefined>(undefined);
  readonly minDate = new Date();
  readonly maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}`;
}

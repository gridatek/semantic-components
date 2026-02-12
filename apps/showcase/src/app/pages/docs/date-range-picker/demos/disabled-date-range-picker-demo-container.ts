import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledDateRangePickerDemo } from './disabled-date-range-picker-demo';

@Component({
  selector: 'app-disabled-date-range-picker-demo-container',
  imports: [DemoContainer, DisabledDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/date-range-picker/disabled-date-range-picker-demo"
      [code]="code"
    >
      <app-disabled-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledDateRangePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: \`
    <sc-date-range-picker [disabled]="true" placeholder="Disabled" />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledDateRangePickerDemo {}`;
}

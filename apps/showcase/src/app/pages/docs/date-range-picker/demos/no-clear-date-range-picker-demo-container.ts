import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NoClearDateRangePickerDemo } from './no-clear-date-range-picker-demo';

@Component({
  selector: 'app-no-clear-date-range-picker-demo-container',
  imports: [DemoContainer, NoClearDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Without Clear Button"
      demoUrl="/demos/date-range-picker/no-clear-date-range-picker-demo"
      [code]="code"
    >
      <app-no-clear-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoClearDateRangePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-no-clear-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: \`
    <sc-date-range-picker [showClear]="false" placeholder="No clear button" />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoClearDateRangePickerDemo {}`;
}

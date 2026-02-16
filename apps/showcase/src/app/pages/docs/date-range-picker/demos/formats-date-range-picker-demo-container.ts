import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormatsDateRangePickerDemo } from './formats-date-range-picker-demo';

@Component({
  selector: 'app-formats-date-range-picker-demo-container',
  imports: [DemoContainer, FormatsDateRangePickerDemo],
  template: `
    <app-demo-container
      title="Date Formats"
      demoUrl="/demos/date-range-picker/formats-date-range-picker-demo"
      [code]="code"
    >
      <app-formats-date-range-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatsDateRangePickerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-formats-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: \`
    <div class="flex flex-col gap-3">
      <div>
        <span class="text-sm text-muted-foreground mr-2">Short:</span>
        <sc-date-range-picker dateFormat="short" placeholder="Short format" />
      </div>
      <div>
        <span class="text-sm text-muted-foreground mr-2">Long:</span>
        <sc-date-range-picker dateFormat="long" placeholder="Long format" />
      </div>
      <div>
        <span class="text-sm text-muted-foreground mr-2">ISO:</span>
        <sc-date-range-picker dateFormat="iso" placeholder="ISO format" />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatsDateRangePickerDemo {}`;
}

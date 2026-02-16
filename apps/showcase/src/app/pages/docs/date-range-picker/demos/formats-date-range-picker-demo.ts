import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDateRangePicker } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-formats-date-range-picker-demo',
  imports: [ScDateRangePicker],
  template: `
    <div class="flex flex-col gap-3">
      <div>
        <span class="text-sm text-muted-foreground mr-2">Short:</span>
        <scDateRangePicker dateFormat="short" placeholder="Short format" />
      </div>
      <div>
        <span class="text-sm text-muted-foreground mr-2">Long:</span>
        <scDateRangePicker dateFormat="long" placeholder="Long format" />
      </div>
      <div>
        <span class="text-sm text-muted-foreground mr-2">ISO:</span>
        <scDateRangePicker dateFormat="iso" placeholder="ISO format" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatsDateRangePickerDemo {}

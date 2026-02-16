import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-multi-select-demo',
  imports: [ScMultiSelect],
  template: `
    <div class="max-w-sm">
      <sc-multi-select
        [options]="options"
        [disabled]="true"
        placeholder="Select fruits..."
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledMultiSelectDemo {
  readonly options: MultiSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
}

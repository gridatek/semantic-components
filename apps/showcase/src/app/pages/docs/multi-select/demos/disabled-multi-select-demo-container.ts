import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledMultiSelectDemo } from './disabled-multi-select-demo';

@Component({
  selector: 'app-disabled-multi-select-demo-container',
  imports: [DemoContainer, DisabledMultiSelectDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-multi-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledMultiSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-multi-select-demo',
  imports: [ScMultiSelect],
  template: \`
    <div class="max-w-sm">
      <sc-multi-select
        [options]="options"
        [disabled]="true"
        placeholder="Select fruits..."
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledMultiSelectDemo {
  readonly options: MultiSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
}`;
}

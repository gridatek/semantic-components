import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NosearchMultiSelectDemo } from './nosearch-multi-select-demo';

@Component({
  selector: 'app-nosearch-multi-select-demo-container',
  imports: [DemoContainer, NosearchMultiSelectDemo],
  template: `
    <app-demo-container title="Without Search" [code]="code">
      <app-nosearch-multi-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NosearchMultiSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-nosearch-multi-select-demo',
  imports: [ScMultiSelect],
  template: \`
    <div class="max-w-sm">
      <sc-multi-select
        [options]="options"
        [searchable]="false"
        placeholder="Select sizes..."
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NosearchMultiSelectDemo {
  readonly options: MultiSelectOption[] = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ];
}`;
}

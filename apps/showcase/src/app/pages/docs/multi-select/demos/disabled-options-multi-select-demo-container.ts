import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledOptionsMultiSelectDemo } from './disabled-options-multi-select-demo';

@Component({
  selector: 'app-disabled-options-multi-select-demo-container',
  imports: [DemoContainer, DisabledOptionsMultiSelectDemo],
  template: `
    <app-demo-container title="Disabled Options" [code]="code">
      <app-disabled-options-multi-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOptionsMultiSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-options-multi-select-demo',
  imports: [ScMultiSelect],
  template: \`
    <div class="max-w-sm">
      <sc-multi-select [options]="options" placeholder="Select frameworks..." />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOptionsMultiSelectDemo {
  readonly options: MultiSelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte', disabled: true },
    { value: 'solid', label: 'Solid', disabled: true },
    { value: 'next', label: 'Next.js' },
  ];
}`;
}

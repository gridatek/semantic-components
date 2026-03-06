import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CheckboxLabelDemo } from './checkbox-label-demo';

@Component({
  selector: 'app-checkbox-label-demo-container',
  imports: [DemoContainer, CheckboxLabelDemo],
  template: `
    <app-demo-container
      title="With Checkbox"
      demoUrl="/demos/label/checkbox-label-demo"
      [code]="code"
    >
      <app-checkbox-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxLabelDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-checkbox-label-demo',
  imports: [ScLabel, ScCheckboxField, ScCheckbox],
  template: \`
    <div scCheckboxField>
      <input type="checkbox" scCheckbox />
      <label scLabel [for]="'terms-label'">Accept terms and conditions</label>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxLabelDemo {}`;
}

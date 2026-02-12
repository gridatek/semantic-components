import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPasswordFieldDemo } from './disabled-password-field-demo';

@Component({
  selector: 'app-disabled-password-field-demo-container',
  imports: [DemoContainer, DisabledPasswordFieldDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/password-field/disabled-password-field-demo"
      [code]="code"
    >
      <app-disabled-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisabledPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: \`
    <div
      sc-password-field
      [value]="'********'"
      [disabled]="true"
      class="space-y-2"
    >
      <label sc-label>Password (Disabled)</label>
      <div sc-password-field-input-group>
        <input sc-password-field-input />
        <button sc-password-field-toggle></button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPasswordFieldDemo {}`;
}

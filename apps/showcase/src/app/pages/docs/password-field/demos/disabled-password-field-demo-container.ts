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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DisabledPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

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
      scPasswordField
      [value]="'********'"
      [disabled]="true"
      class="space-y-2"
    >
      <label scLabel>Password (Disabled)</label>
      <div scPasswordFieldInputGroup>
        <input scPasswordFieldInput />
        <button scPasswordFieldToggle></button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPasswordFieldDemo {}`;
}

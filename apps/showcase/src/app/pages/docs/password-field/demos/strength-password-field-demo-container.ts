import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StrengthPasswordFieldDemo } from './strength-password-field-demo';

@Component({
  selector: 'app-strength-password-field-demo-container',
  imports: [DemoContainer, StrengthPasswordFieldDemo],
  template: `
    <app-demo-container
      title="With Strength Indicator"
      demoUrl="/demos/password-field/strength-password-field-demo"
      [code]="code"
    >
      <app-strength-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StrengthPasswordFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPasswordField,
  ScPasswordFieldInputGroup,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
  ScPasswordFieldStrength,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-strength-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScPasswordFieldStrength,
    ScLabel,
  ],
  template: \`
    <div sc-password-field [(value)]="password" class="space-y-2">
      <label sc-label>Password</label>
      <div sc-password-field-input-group>
        <input
          sc-password-field-input
          placeholder="Enter password"
          autocomplete="new-password"
        />
        <button sc-password-field-toggle></button>
      </div>
      <div sc-password-field-strength></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthPasswordFieldDemo {
  readonly password = signal<string>('');
}`;
}

import {
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
  template: `
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthPasswordFieldDemo {
  readonly password = signal<string>('');
}

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
} from '@semantic-components/ui-lab';
import { ScLabel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-new-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInputGroup,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScLabel,
  ],
  template: `
    <div class="space-y-4">
      <div sc-password-field [(value)]="newPassword" class="space-y-2">
        <label sc-label>New Password</label>
        <div sc-password-field-input-group>
          <input
            sc-password-field-input
            placeholder="Enter new password"
            autocomplete="new-password"
          />
          <button sc-password-field-toggle></button>
        </div>
        <p class="text-sm text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      <div sc-password-field [(value)]="confirmPassword" class="space-y-2">
        <label sc-label>Confirm Password</label>
        <div sc-password-field-input-group>
          <input
            sc-password-field-input
            placeholder="Confirm new password"
            autocomplete="new-password"
          />
          <button sc-password-field-toggle></button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPasswordFieldDemo {
  readonly newPassword = signal<string>('');
  readonly confirmPassword = signal<string>('');
}

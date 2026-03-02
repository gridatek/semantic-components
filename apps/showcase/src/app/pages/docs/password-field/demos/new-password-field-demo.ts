import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScLabel } from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldInputGroup,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';

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
      <div scPasswordField [(value)]="newPassword" class="space-y-2">
        <label scLabel>New Password</label>
        <div scPasswordFieldInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Enter new password"
            autocomplete="new-password"
          />
          <button scPasswordFieldToggle></button>
        </div>
        <p class="text-muted-foreground text-sm">
          Must be at least 8 characters
        </p>
      </div>

      <div scPasswordField [(value)]="confirmPassword" class="space-y-2">
        <label scLabel>Confirm Password</label>
        <div scPasswordFieldInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Confirm new password"
            autocomplete="new-password"
          />
          <button scPasswordFieldToggle></button>
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

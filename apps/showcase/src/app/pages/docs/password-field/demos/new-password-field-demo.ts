import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import {
  ScPasswordField,
  ScPasswordFieldInput,
  ScPasswordFieldToggle,
} from '@semantic-components/ui-lab';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-password-field-demo',
  imports: [
    ScPasswordField,
    ScPasswordFieldInput,
    ScPasswordFieldToggle,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm space-y-4">
      <div
        scPasswordField
        #newPasswordField="scPasswordField"
        [(value)]="newPassword"
        class="space-y-2"
      >
        <label scLabel>New Password</label>
        <div scInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Enter new password"
            autocomplete="new-password"
          />
          <div scInputGroupAddon align="inline-end">
            <button scPasswordFieldToggle>
              @if (newPasswordField.visible()) {
                <svg siEyeOffIcon></svg>
              } @else {
                <svg siEyeIcon></svg>
              }
              <span class="sr-only">Toggle password visibility</span>
            </button>
          </div>
        </div>
        <p class="text-muted-foreground text-sm">
          Must be at least 8 characters
        </p>
      </div>

      <div
        scPasswordField
        #confirmPasswordField="scPasswordField"
        [(value)]="confirmPassword"
        class="space-y-2"
      >
        <label scLabel>Confirm Password</label>
        <div scInputGroup>
          <input
            scPasswordFieldInput
            placeholder="Confirm new password"
            autocomplete="new-password"
          />
          <div scInputGroupAddon align="inline-end">
            <button scPasswordFieldToggle>
              @if (confirmPasswordField.visible()) {
                <svg siEyeOffIcon></svg>
              } @else {
                <svg siEyeIcon></svg>
              }
              <span class="sr-only">Toggle password visibility</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPasswordFieldDemo {
  readonly newPassword = signal<string>('');
  readonly confirmPassword = signal<string>('');
}

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
  ScPassword,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-new-password-demo',
  imports: [
    ScPassword,
    ScPasswordInput,
    ScPasswordToggle,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm space-y-4">
      <div scPassword #newPasswordField="scPassword" class="space-y-2">
        <label scLabel>New Password</label>
        <div scInputGroup>
          <input
            scPasswordInput
            placeholder="Enter new password"
            autocomplete="new-password"
          />
          <div scInputGroupAddon align="inline-end">
            <button scPasswordToggle>
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

      <div scPassword #confirmPasswordField="scPassword" class="space-y-2">
        <label scLabel>Confirm Password</label>
        <div scInputGroup>
          <input
            scPasswordInput
            placeholder="Confirm new password"
            autocomplete="new-password"
          />
          <div scInputGroupAddon align="inline-end">
            <button scPasswordToggle>
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
export class NewPasswordDemo {
  readonly newPassword = signal<string>('');
  readonly confirmPassword = signal<string>('');
}

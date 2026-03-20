import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPasswordInput,
  ScPasswordProvider,
  ScPasswordRequirementItem,
  ScPasswordRequirements,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-requirements-password-demo',
  imports: [
    FormField,
    ScField,
    ScPasswordProvider,
    ScPasswordInput,
    ScPasswordToggle,
    ScPasswordRequirements,
    ScPasswordRequirementItem,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scField class="space-y-2">
        <label scLabel>Password</label>
        <div scPasswordProvider #passwordField="scPasswordProvider">
          <div scInputGroup>
            <input
              scPasswordInput
              [formField]="passwordForm.password"
              placeholder="Enter password"
              autocomplete="new-password"
            />
            <div scInputGroupAddon align="inline-end">
              <button scPasswordToggle>
                @if (passwordField.visible()) {
                  <svg siEyeOffIcon></svg>
                } @else {
                  <svg siEyeIcon></svg>
                }
                <span class="sr-only">Toggle password visibility</span>
              </button>
            </div>
          </div>
        </div>
        <ul scPasswordRequirements>
          <li scPasswordRequirementItem [met]="password().length >= 8">
            At least 8 characters
          </li>
          <li scPasswordRequirementItem [met]="hasUppercase()">
            Contains uppercase letter
          </li>
          <li scPasswordRequirementItem [met]="hasLowercase()">
            Contains lowercase letter
          </li>
          <li scPasswordRequirementItem [met]="hasNumber()">Contains number</li>
          <li scPasswordRequirementItem [met]="hasSpecial()">
            Contains special character
          </li>
        </ul>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequirementsPasswordDemo {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel);

  readonly password = computed(() => this.formModel().password);
  readonly hasUppercase = computed(() => /[A-Z]/.test(this.password()));
  readonly hasLowercase = computed(() => /[a-z]/.test(this.password()));
  readonly hasNumber = computed(() => /\d/.test(this.password()));
  readonly hasSpecial = computed(() =>
    /[!@#$%^&*(),.?":{}|<>]/.test(this.password()),
  );
}

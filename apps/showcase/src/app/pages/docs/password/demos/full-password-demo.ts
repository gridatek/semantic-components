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
  ScPasswordStrength,
  ScPasswordToggle,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCircleIcon,
  SiEyeIcon,
  SiEyeOffIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-full-password-demo',
  imports: [
    FormField,
    ScField,
    ScPasswordProvider,
    ScPasswordInput,
    ScPasswordToggle,
    ScPasswordStrength,
    ScPasswordRequirements,
    ScPasswordRequirementItem,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiCheckIcon,
    SiCircleIcon,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div class="w-full max-w-sm">
      <div scField class="space-y-2">
        <label scLabel>Create Password</label>
        <div scPasswordProvider #passwordField="scPasswordProvider">
          <div scInputGroup>
            <input
              scPasswordInput
              [formField]="passwordForm.password"
              placeholder="Enter a strong password"
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
        <div scPasswordStrength [value]="formModel().password"></div>
        <ul scPasswordRequirements>
          @for (req of requirements; track req.label) {
            <li scPasswordRequirementItem [met]="req.test(password())">
              @if (req.test(password())) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCircleIcon></svg>
              }
              {{ req.label }}
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullPasswordDemo {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel);

  readonly password = computed(() => this.formModel().password);

  readonly requirements = [
    { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
    {
      label: 'Contains uppercase letter',
      test: (v: string) => /[A-Z]/.test(v),
    },
    {
      label: 'Contains lowercase letter',
      test: (v: string) => /[a-z]/.test(v),
    },
    { label: 'Contains number', test: (v: string) => /\d/.test(v) },
    {
      label: 'Contains special character',
      test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
    },
  ];
}

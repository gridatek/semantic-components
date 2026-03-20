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
  ScPasswordStrength,
  ScPasswordStrengthBar,
  ScPasswordStrengthLabel,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-strength-password-demo',
  imports: [
    FormField,
    ScField,
    ScPasswordProvider,
    ScPasswordInput,
    ScPasswordToggle,
    ScPasswordStrength,
    ScPasswordStrengthBar,
    ScPasswordStrengthLabel,
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
        <div scPasswordStrength [strength]="strength()">
          <div class="flex gap-1">
            @for (i of [0, 1, 2, 3]; track i) {
              <div scPasswordStrengthBar [index]="i"></div>
            }
          </div>
          <p scPasswordStrengthLabel>
            {{ strengthLabels[strength()] }}
          </p>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrengthPasswordDemo {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel);

  private readonly rules = [
    (v: string) => v.length >= 8,
    (v: string) => v.length >= 12,
    (v: string) => /[A-Z]/.test(v),
    (v: string) => /[a-z]/.test(v),
    (v: string) => /\d/.test(v),
    (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
  ];

  readonly strength = computed(() => {
    const password = this.formModel().password;
    if (!password) return 0;

    const score = this.rules.filter((rule) => rule(password)).length;
    return Math.round((score / this.rules.length) * 4);
  });

  readonly strengthLabels = [
    'Very weak',
    'Weak',
    'Fair',
    'Strong',
    'Very strong',
  ];
}

import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordStrength,
  ScPasswordStrengthLabel,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-strength-password-field-demo',
  imports: [
    FormField,
    ScLabel,
    ScPasswordField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordStrengthLabel,
    ScPasswordStrength,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div scPasswordField #password="scPasswordField" class="w-full max-w-sm">
      <label scLabel>New password</label>
      <div scPasswordGroup>
        <input
          scPasswordInput
          autocomplete="new-password"
          [formField]="signup.password"
        />
        <button scPasswordToggle>
          @if (password.visible()) {
            <svg siEyeOffIcon></svg>
            <span class="sr-only">Hide password</span>
          } @else {
            <svg siEyeIcon></svg>
            <span class="sr-only">Show password</span>
          }
        </button>
      </div>
      <div scPasswordStrength [score]="score()" aria-label="Password strength">
        <span scPasswordStrengthLabel>{{ strength() }}</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class StrengthPasswordFieldDemo {
  private readonly model = signal({ password: '' });
  readonly signup = form(this.model);

  /** 0: nothing yet; then a point for each rule met, at least 1. */
  readonly score = computed(() => {
    const value = this.model().password;
    if (!value) return 0;
    const met = [
      value.length >= 12,
      /\d/.test(value),
      /[a-z]/.test(value) && /[A-Z]/.test(value),
      /[^A-Za-z0-9]/.test(value),
    ].filter(Boolean).length;
    return Math.max(met, 1);
  });
  readonly strength = computed(
    () => ['', 'Weak', 'Fair', 'Good', 'Strong'][this.score()],
  );
}

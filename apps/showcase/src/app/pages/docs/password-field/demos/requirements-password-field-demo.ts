import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordRequirement,
  ScPasswordRequirements,
  ScPasswordToggle,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiEyeIcon,
  SiEyeOffIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-requirements-password-field-demo',
  imports: [
    FormField,
    ScLabel,
    ScPasswordField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordRequirement,
    ScPasswordRequirements,
    ScPasswordToggle,
    SiCheckIcon,
    SiEyeIcon,
    SiEyeOffIcon,
    SiXIcon,
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
      <ul scPasswordRequirements>
        @for (rule of rules(); track rule.text) {
          <li scPasswordRequirement [met]="rule.met">
            @if (rule.met) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siXIcon></svg>
            }
            {{ rule.text }}
            <span class="sr-only">{{ rule.met ? '(met)' : '(not met)' }}</span>
          </li>
        }
      </ul>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RequirementsPasswordFieldDemo {
  private readonly model = signal({ password: '' });
  readonly signup = form(this.model);

  readonly rules = computed(() => {
    const value = this.model().password;
    return [
      { text: 'At least 12 characters', met: value.length >= 12 },
      { text: 'A number', met: /\d/.test(value) },
      {
        text: 'Upper and lower case',
        met: /[a-z]/.test(value) && /[A-Z]/.test(value),
      },
      { text: 'A symbol', met: /[^A-Za-z0-9]/.test(value) },
    ];
  });
}

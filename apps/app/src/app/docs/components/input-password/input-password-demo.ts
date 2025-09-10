import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';

import {
  PasswordRequirement,
  ScInputPassword,
  ScInputPasswordDescription,
  ScInputPasswordField,
  ScInputPasswordRequirements,
  ScInputPasswordStrength,
  ScInputPasswordToggle,
} from '@semantic-components/ui';
import { ScLabel } from '@semantic-components/ui';

export interface ValidationRule {
  regex: RegExp;
  text: string;
}

@Component({
  selector: 'app-input-password-demo',
  imports: [
    ScInputPassword,
    ScInputPasswordField,
    ScInputPasswordToggle,
    ScInputPasswordStrength,
    ScInputPasswordDescription,
    ScInputPasswordRequirements,
    ScLabel,
  ],
  template: `
    <div class="space-y-2" sc-input-password>
      <label for="password-field" sc-label>Password</label>
      <div class="relative">
        <input
          id="password-field"
          [isVisible]="isVisible()"
          (passwordChange)="onPasswordChange($event)"
          sc-input-password-field
          aria-describedby="password-description"
        />
        <button
          [isVisible]="isVisible()"
          (visibilityChange)="onVisibilityChange($event)"
          sc-input-password-toggle
        ></button>
      </div>

      <div sc-input-password-strength>
        <p id="password-description" sc-input-password-description></p>
        <ul sc-input-password-requirements></ul>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordDemo {
  readonly password = signal<string>('');
  readonly isVisible = signal<boolean>(false);

  readonly validationRules: ValidationRule[] = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /\d/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, text: 'At least 1 special character' },
  ];

  readonly requirements = computed(() =>
    this.validationRules.map((rule) => ({
      met: rule.regex.test(this.password()),
      text: rule.text,
    })),
  );

  readonly strengthScore = computed(() => this.requirements().filter((req) => req.met).length);

  onPasswordChange(password: string) {
    this.password.set(password);
  }

  onVisibilityChange(visible: boolean) {
    this.isVisible.set(visible);
  }
}

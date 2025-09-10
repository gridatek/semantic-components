import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';

import {
  PasswordRequirement,
  ScInputPasswordDescription,
  ScInputPasswordField,
  ScInputPasswordRequirements,
  ScInputPasswordStrength,
  ScInputPasswordToggle,
} from '@semantic-components/ui';
import { ScLabel } from '@semantic-components/ui';

interface ValidationRule {
  regex: RegExp;
  text: string;
}

@Component({
  selector: 'app-input-password-composition-demo',
  imports: [
    ScInputPasswordField,
    ScInputPasswordToggle,
    ScInputPasswordStrength,
    ScInputPasswordDescription,
    ScInputPasswordRequirements,
    ScLabel,
  ],
  template: `
    <div class="space-y-4">
      <!-- Custom composition example -->
      <div class="space-y-2">
        <label for="custom-password" sc-label>Custom Password Layout</label>
        <div class="relative">
          <input
            id="custom-password"
            [isVisible]="isVisible()"
            [strengthScore]="strengthScore()"
            (passwordChange)="onPasswordChange($event)"
            sc-input-password-field
            aria-describedby="custom-password-description"
          />
          <button
            [isVisible]="isVisible()"
            (visibilityChange)="onVisibilityChange($event)"
            sc-input-password-toggle
          ></button>
        </div>
      </div>

      <!-- Separate strength indicator -->
      <div class="rounded-lg border p-4">
        <div [strengthScore]="strengthScore()" sc-input-password-strength>
          <h4 class="text-sm font-semibold mb-2">Password Strength</h4>
          <p
            id="custom-password-description"
            [strengthScore]="strengthScore()"
            sc-input-password-description
          ></p>
          <ul [requirements]="requirements()" sc-input-password-requirements></ul>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordCompositionDemo {
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

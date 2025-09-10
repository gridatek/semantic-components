import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  PasswordRule,
  PasswordValidationService,
  ScInputPasswordDescription,
  ScInputPasswordField,
  ScInputPasswordRequirements,
  ScInputPasswordStrength,
  ScInputPasswordToggle,
} from '@semantic-components/ui';
import { ScLabel } from '@semantic-components/ui';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-input-password-modern-demo',
  imports: [
    ReactiveFormsModule,
    ScInputPasswordField,
    ScInputPasswordToggle,
    ScInputPasswordStrength,
    ScInputPasswordDescription,
    ScInputPasswordRequirements,
    ScLabel,
    ScButton,
  ],
  providers: [PasswordValidationService],
  template: `
    <div class="space-y-6">
      <!-- Basic Example -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Basic Password Input</h3>
        <form class="space-y-4" [formGroup]="basicForm">
          <div class="space-y-2">
            <label for="basic-password" sc-label>Password*</label>
            <div class="relative">
              <input
                id="basic-password"
                [isVisible]="isBasicVisible()"
                [required]="true"
                sc-input-password-field
                formControlName="password"
                ariaDescribedby="basic-password-description"
              />
              <button
                [isVisible]="isBasicVisible()"
                (visibilityChange)="isBasicVisible.set($event)"
                sc-input-password-toggle
              ></button>
            </div>
          </div>

          <div [animate]="true" [size]="'md'" sc-input-password-strength>
            <p id="basic-password-description" [showHelp]="true" sc-input-password-description></p>
            <ul [size]="'md'" [compact]="false" sc-input-password-requirements></ul>
          </div>

          <button class="w-full" [disabled]="!basicForm.valid" sc-button type="submit">
            Create Account
          </button>
        </form>
      </div>

      <!-- Advanced Example with Custom Rules -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Custom Validation Rules</h3>
        <form class="space-y-4" [formGroup]="advancedForm">
          <div class="space-y-2">
            <label for="advanced-password" sc-label>Password (Custom Rules)*</label>
            <div class="relative">
              <input
                id="advanced-password"
                [isVisible]="isAdvancedVisible()"
                [required]="true"
                [placeholder]="'Enter a strong password'"
                sc-input-password-field
                formControlName="password"
                ariaDescribedby="advanced-password-description"
              />
              <button
                [isVisible]="isAdvancedVisible()"
                [size]="'lg'"
                (visibilityChange)="isAdvancedVisible.set($event)"
                sc-input-password-toggle
              ></button>
            </div>
          </div>

          <div [animate]="true" [size]="'lg'" [showPercentage]="true" sc-input-password-strength>
            <p
              id="advanced-password-description"
              [showHelp]="true"
              sc-input-password-description
            ></p>
            <ul
              [size]="'md'"
              [compact]="false"
              [showIcons]="true"
              sc-input-password-requirements
            ></ul>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button (click)="toggleCustomRules()" sc-button variant="outline" type="button">
              {{ useCustomRules() ? 'Use Default Rules' : 'Use Custom Rules' }}
            </button>
            <button [disabled]="!advancedForm.valid" sc-button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <!-- Compact Example -->
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">Compact Layout</h3>
        <form class="space-y-4" [formGroup]="compactForm">
          <div class="space-y-2">
            <label for="compact-password" sc-label>Password</label>
            <div class="relative">
              <input
                id="compact-password"
                [isVisible]="isCompactVisible()"
                [placeholder]="'Password'"
                sc-input-password-field
                formControlName="password"
                ariaDescribedby="compact-password-description"
              />
              <button
                [isVisible]="isCompactVisible()"
                [controlsId]="'compact-password'"
                [size]="'sm'"
                (visibilityChange)="isCompactVisible.set($event)"
                sc-input-password-toggle
              ></button>
            </div>
          </div>

          <div [animate]="true" [size]="'sm'" sc-input-password-strength>
            <p
              id="compact-password-description"
              [showHelp]="false"
              sc-input-password-description
            ></p>
            <ul
              [size]="'sm'"
              [compact]="true"
              [showIcons]="false"
              sc-input-password-requirements
            ></ul>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordModernDemo {
  private readonly fb = inject(FormBuilder);
  private readonly validationService = inject(PasswordValidationService);

  readonly isBasicVisible = signal(false);
  readonly isAdvancedVisible = signal(false);
  readonly isCompactVisible = signal(false);
  readonly useCustomRules = signal(false);

  readonly basicForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
  });

  readonly advancedForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
  });

  readonly compactForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
  });

  private readonly customRules: PasswordRule[] = [
    {
      id: 'minLength',
      regex: /.{12,}/,
      message: 'At least 12 characters',
      weight: 2,
    },
    {
      id: 'hasNumber',
      regex: /\d/,
      message: 'At least 1 number',
      weight: 1,
    },
    {
      id: 'hasLowercase',
      regex: /[a-z]/,
      message: 'At least 1 lowercase letter',
      weight: 1,
    },
    {
      id: 'hasUppercase',
      regex: /[A-Z]/,
      message: 'At least 1 uppercase letter',
      weight: 1,
    },
    {
      id: 'hasSpecialChar',
      regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      message: 'At least 1 special character',
      weight: 1,
    },
    {
      id: 'noSequential',
      regex:
        /^(?!.*(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz))/i,
      message: 'No sequential characters',
      weight: 2,
    },
  ];

  toggleCustomRules(): void {
    const newUseCustom = !this.useCustomRules();
    this.useCustomRules.set(newUseCustom);

    if (newUseCustom) {
      this.validationService.updateRules(this.customRules);
    } else {
      // Reset to default rules
      this.validationService.updateRules([]);
    }
  }
}

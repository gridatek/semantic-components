import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  PasswordValidationService,
  ScInputPasswordDescription,
  ScInputPasswordField,
  ScInputPasswordRequirements,
  ScInputPasswordStrength,
  ScInputPasswordToggle,
} from '@semantic-components/ui';
import { ScButton, ScLabel } from '@semantic-components/ui';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';

@Component({
  selector: 'app-input-password-confirmation-section',
  imports: [
    ReactiveFormsModule,
    ScInputPasswordField,
    ScInputPasswordToggle,
    ScInputPasswordStrength,
    ScInputPasswordDescription,
    ScInputPasswordRequirements,
    ScLabel,
    ScButton,
    PreviewCodeTabs,
  ],
  providers: [PasswordValidationService],
  template: `
    <app-preview-code-tabs>
      <div class="space-y-4" preview>
        <h3 class="text-lg font-semibold">{{ title() }}</h3>
        <form class="space-y-4" [formGroup]="confirmationForm">
          <div class="space-y-2">
            <label for="confirm-password" sc-label>Password*</label>
            <div class="relative">
              <input
                id="confirm-password"
                [isVisible]="isPasswordVisible()"
                [required]="true"
                [placeholder]="'Enter your password'"
                sc-input-password-field
                formControlName="password"
                ariaDescribedby="confirm-password-description"
              />
              <button
                [isVisible]="isPasswordVisible()"
                (visibilityChange)="isPasswordVisible.set($event)"
                sc-input-password-toggle
              ></button>
            </div>
          </div>

          <div [animate]="true" [size]="'md'" sc-input-password-strength>
            <p
              id="confirm-password-description"
              [showHelp]="true"
              sc-input-password-description
            ></p>
            <ul [size]="'md'" [compact]="false" sc-input-password-requirements></ul>
          </div>

          <div class="space-y-2">
            <label for="confirm-password-repeat" sc-label>Confirm Password*</label>
            <div class="relative">
              <input
                id="confirm-password-repeat"
                [isVisible]="isConfirmVisible()"
                [required]="true"
                [placeholder]="'Repeat your password'"
                sc-input-password-field
                formControlName="confirmPassword"
              />
              <button
                [isVisible]="isConfirmVisible()"
                (visibilityChange)="isConfirmVisible.set($event)"
                sc-input-password-toggle
              ></button>
            </div>
            @if (
              confirmationForm.hasError('passwordMismatch') &&
              confirmationForm.get('confirmPassword')?.touched
            ) {
              <p class="text-sm text-destructive">Passwords do not match</p>
            }
          </div>

          <button class="w-full" [disabled]="!confirmationForm.valid" sc-button type="submit">
            Register
          </button>
        </form>
      </div>

      <div code>
        <pre><code>{{ codeExample }}</code></pre>
      </div>
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordConfirmationSection {
  private readonly fb = inject(FormBuilder);

  readonly title = input<string>('Password with Confirmation');
  readonly isPasswordVisible = signal(false);
  readonly isConfirmVisible = signal(false);

  readonly confirmationForm: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator },
  );

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  protected readonly codeExample = `// Form-level password confirmation validator
passwordMatchValidator(form: AbstractControl) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  
  return password === confirmPassword ? null : { passwordMismatch: true };
}

// Form setup with cross-field validation
readonly form = this.fb.group({
  password: ['', [Validators.required]],
  confirmPassword: ['', [Validators.required]]
}, { validators: this.passwordMatchValidator });

<!-- Template -->
<form [formGroup]="form">
  <!-- Password field with validation -->
  <input sc-input-password-field formControlName="password" />
  <div sc-input-password-strength>
    <p sc-input-password-description></p>
    <ul sc-input-password-requirements></ul>
  </div>

  <!-- Confirm password field -->
  <input sc-input-password-field formControlName="confirmPassword" />
  @if (form.hasError('passwordMismatch') && form.get('confirmPassword')?.touched) {
    <p class="text-destructive">Passwords do not match</p>
  }
</form>`;
}

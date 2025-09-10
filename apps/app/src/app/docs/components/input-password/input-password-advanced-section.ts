import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
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
import { ScButton, ScLabel } from '@semantic-components/ui';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';

@Component({
  selector: 'app-input-password-advanced-section',
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
        <form class="space-y-4" [formGroup]="advancedForm">
          <div class="space-y-2">
            <label for="advanced-password" sc-label>Password (Custom Rules)*</label>
            <div class="relative">
              <input
                id="advanced-password"
                [isVisible]="isVisible()"
                [required]="true"
                [placeholder]="'Enter a strong password'"
                sc-input-password-field
                formControlName="password"
                ariaDescribedby="advanced-password-description"
              />
              <button
                [isVisible]="isVisible()"
                [size]="'lg'"
                (visibilityChange)="isVisible.set($event)"
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
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordAdvancedSection {
  private readonly fb = inject(FormBuilder);
  private readonly validationService = inject(PasswordValidationService);

  readonly title = input<string>('Custom Validation Rules');
  readonly isVisible = signal(false);
  readonly useCustomRules = signal(false);

  readonly advancedForm: FormGroup = this.fb.group({
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
      this.validationService.updateRules([]);
    }
  }

  protected readonly codeExample = `// Custom validation rules
const customRules: PasswordRule[] = [
  {
    id: 'minLength',
    regex: /.{12,}/,
    message: 'At least 12 characters',
    weight: 2,
  },
  {
    id: 'hasSpecialChar',
    regex: /[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]/,
    message: 'At least 1 special character',
    weight: 1,
  },
  {
    id: 'noSequential',
    regex: /^(?!.*(?:012|123|abc|bcd))/i,
    message: 'No sequential characters',
    weight: 2,
  }
];

// Update validation rules
validationService.updateRules(customRules);

// Template with advanced features
<div [showPercentage]="true" sc-input-password-strength>
  <p sc-input-password-description></p>
  <ul [showIcons]="true" sc-input-password-requirements></ul>
</div>`;
}

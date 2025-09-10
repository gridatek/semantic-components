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

          <button class="w-full" [disabled]="!advancedForm.valid" sc-button type="submit">
            Submit
          </button>
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
  readonly useCustomRules = signal(true);

  readonly advancedForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
  });

  constructor() {
    // Apply custom rules by default
    this.validationService.addRules(this.additionalRules);
  }

  private readonly additionalRules: PasswordRule[] = [
    {
      id: 'longerPassword',
      regex: /.{12,}/,
      message: 'At least 12 characters (enhanced)',
      weight: 1,
    },
    {
      id: 'noSequential',
      regex:
        /^(?=.+)(?!.*(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz))/i,
      message: 'No sequential characters',
      weight: 2,
    },
  ];

  protected readonly codeExample = `// Additional validation rules (added to default rules)
const additionalRules: PasswordRule[] = [
  {
    id: 'longerPassword',
    regex: /.{12,}/,
    message: 'At least 12 characters (enhanced)',
    weight: 1,
  },
  {
    id: 'noSequential',
    regex: /^(?=.+)(?!.*(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz))/i,
    message: 'No sequential characters',
    weight: 2,
  },
];

// Add additional rules (keeps default rules + adds these)
validationService.addRules(additionalRules);

// Reset to default rules only
validationService.updateRules([]);

// Template with advanced features
<div [showPercentage]="true" sc-input-password-strength>
  <p sc-input-password-description></p>
  <ul [showIcons]="true" sc-input-password-requirements></ul>
</div>`;
}

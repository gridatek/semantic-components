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
  selector: 'app-input-password-basic-section',
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
        <form class="space-y-4" [formGroup]="basicForm">
          <div class="space-y-2">
            <label for="basic-password" sc-label>Password*</label>
            <div class="relative">
              <input
                id="basic-password"
                [isVisible]="isVisible()"
                [required]="true"
                sc-input-password-field
                formControlName="password"
                ariaDescribedby="basic-password-description"
              />
              <button
                [isVisible]="isVisible()"
                (visibilityChange)="isVisible.set($event)"
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

      <div code>
        <pre><code>{{ codeExample }}</code></pre>
      </div>
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordBasicSection {
  private readonly fb = inject(FormBuilder);

  readonly title = input<string>('Basic Password Input');
  readonly isVisible = signal(false);

  readonly basicForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
  });

  protected readonly codeExample = `<form [formGroup]="passwordForm">
  <div class="space-y-2">
    <label for="password" sc-label>Password*</label>
    <div class="relative">
      <input
        id="password"
        [isVisible]="isVisible()"
        sc-input-password-field
        formControlName="password"
      />
      <button
        [isVisible]="isVisible()"
        (visibilityChange)="isVisible.set($event)"
        sc-input-password-toggle
      ></button>
    </div>
  </div>

  <div sc-input-password-strength>
    <p sc-input-password-description></p>
    <ul sc-input-password-requirements></ul>
  </div>

  <button [disabled]="!passwordForm.valid" sc-button>
    Submit
  </button>
</form>`;
}

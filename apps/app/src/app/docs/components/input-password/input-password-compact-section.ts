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
  selector: 'app-input-password-compact-section',
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
        <form class="space-y-4" [formGroup]="compactForm">
          <div class="space-y-2">
            <label for="compact-password" sc-label>Password</label>
            <div class="relative">
              <input
                id="compact-password"
                [isVisible]="isVisible()"
                [placeholder]="'Password'"
                sc-input-password-field
                formControlName="password"
                ariaDescribedby="compact-password-description"
              />
              <button
                [isVisible]="isVisible()"
                [controlsId]="'compact-password'"
                [size]="'sm'"
                (visibilityChange)="isVisible.set($event)"
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

          <button class="w-full" [disabled]="!compactForm.valid" sc-button type="submit">
            Sign In
          </button>
        </form>
      </div>
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordCompactSection {
  private readonly fb = inject(FormBuilder);

  readonly title = input<string>('Compact Layout');
  readonly isVisible = signal(false);

  readonly compactForm: FormGroup = this.fb.group({
    password: ['', [Validators.required]],
  });

  protected readonly codeExample = `<!-- Compact password input with minimal UI -->
<div class="space-y-2">
  <label for="password" sc-label>Password</label>
  <div class="relative">
    <input
      id="password"
      [isVisible]="isVisible()"
      [placeholder]="'Password'"
      sc-input-password-field
      formControlName="password"
    />
    <button
      [isVisible]="isVisible()"
      [size]="'sm'"
      (visibilityChange)="isVisible.set($event)"
      sc-input-password-toggle
    ></button>
  </div>
</div>

<!-- Compact strength indicator -->
<div [size]="'sm'" sc-input-password-strength>
  <p [showHelp]="false" sc-input-password-description></p>
  <ul
    [size]="'sm'"
    [compact]="true"
    [showIcons]="false"
    sc-input-password-requirements
  ></ul>
</div>`;
}

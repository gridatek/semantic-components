import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ScInputPasswordField, ScInputPasswordToggle } from '@semantic-components/ui';
import { ScButton, ScLabel } from '@semantic-components/ui';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';

@Component({
  selector: 'app-input-password-basic-section',
  imports: [
    ReactiveFormsModule,
    ScInputPasswordField,
    ScInputPasswordToggle,
    ScLabel,
    ScButton,
    PreviewCodeTabs,
  ],
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
              />
              <button
                [isVisible]="isVisible()"
                (visibilityChange)="isVisible.set($event)"
                sc-input-password-toggle
              ></button>
            </div>
          </div>

          <button class="w-full" [disabled]="!basicForm.valid" sc-button type="submit">
            Create Account
          </button>
        </form>
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

  protected readonly codeExample = `// Basic password input - just the field with toggle
<form [formGroup]="passwordForm">
  <div class="space-y-2">
    <label for="password" sc-label>Password*</label>
    <div class="relative">
      <input
        id="password"
        [isVisible]="isVisible()"
        [required]="true"
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

  <button [disabled]="!passwordForm.valid" sc-button>
    Submit
  </button>
</form>

// Component setup
readonly isVisible = signal(false);
readonly passwordForm = this.fb.group({
  password: ['', [Validators.required]]
});`;
}

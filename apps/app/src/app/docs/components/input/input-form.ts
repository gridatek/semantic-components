import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  inject,
  viewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrorMessage,
  ScFieldset,
  ScInput,
  ScLabel,
  ScToast,
  ScToastClose,
  ScToastContent,
  ScToastTitle,
  Toaster,
} from '@semantic-components/ui';

@Component({
  selector: 'app-input-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ScInput,
    ScLabel,
    ScButton,
    ScFieldDescription,
    ScFieldErrorMessage,
    ScField,
    ScFieldset,
    ScToast,
    ScToastContent,
    ScToastTitle,
    ScToastClose,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <fieldset sc-fieldset>
        <div sc-field>
          <label sc-label>Username</label>
          <input sc-input type="text" formControlName="username" placeholder="shadcn" />
          <p sc-field-description>This is your public display name.</p>
          @if (
            form.get('username')?.invalid &&
            (form.get('username')?.dirty || form.get('username')?.touched)
          ) {
            <div sc-field-error-message>
              @if (form.get('username')?.errors?.['required']) {
                Username is required.
              }
              @if (form.get('username')?.errors?.['minlength']) {
                Username must be at least 2 characters.
              }
            </div>
          }
        </div>
        <button [disabled]="form.invalid" sc-button variant="primary" type="submit">Submit</button>
      </fieldset>
    </form>

    <ng-template #toastTemplate>
      <div sc-toast>
        <div sc-toast-content>
          <h2 sc-toast-title>Form Submitted</h2>
          <p class="text-sm text-muted-foreground">You submitted the following values:</p>
          <pre class="mt-2 text-xs bg-muted p-2 rounded overflow-x-auto">
            <code>{{ submittedData | json }}</code>
          </pre>
        </div>
        <button sc-toast-close>
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputForm {
  private readonly fb = inject(FormBuilder);
  private readonly toaster = inject(Toaster);

  form: FormGroup;
  submittedData: any = null;

  protected readonly toastTemplate = viewChild.required<TemplateRef<unknown>>('toastTemplate');

  constructor() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedData = this.form.value;
      this.toaster.show(this.toastTemplate());
    }
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldset,
  ScInput,
  ScLabel,
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
    ScField,
    ScFieldset,
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
            <div class="text-sm text-destructive">
              @if (form.get('username')?.errors?.['required']) {
                <div>Username is required.</div>
              }
              @if (form.get('username')?.errors?.['minlength']) {
                <div>Username must be at least 2 characters.</div>
              }
            </div>
          }
        </div>
        <button [disabled]="form.invalid" sc-button variant="primary" type="submit">Submit</button>
      </fieldset>
    </form>

    <!-- Toast notification -->
    @if (showToast) {
      <div class="fixed bottom-4 right-4 w-80 z-50">
        <div class="bg-background rounded-lg shadow-lg overflow-hidden border">
          <div class="px-4 py-3 bg-muted border-b flex justify-between items-center">
            <p class="font-medium">You submitted the following values:</p>
            <button
              class="text-muted-foreground hover:text-foreground focus:outline-none"
              (click)="hideToast()"
              type="button"
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div class="px-4 py-3">
            <pre class="mt-2 w-full rounded-md bg-muted p-4 overflow-x-auto">
                <code class="text-foreground">{{ submittedData | json }}</code>
              </pre>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputForm {
  private readonly fb = inject(FormBuilder);

  form: FormGroup;
  showToast = false;
  submittedData: any = null;

  constructor() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedData = this.form.value;
      this.showToast = true;

      // Auto hide toast after 5 seconds
      setTimeout(() => {
        this.hideToast();
      }, 5000);
    }
  }

  hideToast() {
    this.showToast = false;
  }
}

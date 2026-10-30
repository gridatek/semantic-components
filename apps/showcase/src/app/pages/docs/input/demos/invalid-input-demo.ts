import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, email, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

/** Invalid once touched: the form says so, not the markup. */
@Component({
  selector: 'app-invalid-input-demo',
  imports: [FormField, ScField, ScFieldErrors, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-xs">
      <label scLabel>Email</label>
      <input scInput type="email" [formField]="emailForm.email" />
      <div scFieldErrors></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidInputDemo {
  private readonly model = signal({ email: 'jordan@' });
  protected readonly emailForm = form(this.model, (s) =>
    email(s.email, { message: 'Enter a valid email address.' }),
  );

  constructor() {
    // Shown as if the reader had already left the field.
    this.emailForm.email().markAsTouched();
  }
}

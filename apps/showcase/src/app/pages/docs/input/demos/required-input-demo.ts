import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-required-input-demo',
  imports: [
    FormField,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScInput,
    ScLabel,
  ],
  template: `
    <div scField class="w-full max-w-xs">
      <label scLabel>
        Required Field
        <span class="text-destructive" aria-hidden="true">*</span>
      </label>
      <input
        scInput
        [formField]="nameForm.name"
        placeholder="This field is required"
      />
      <p scFieldDescription>This field must be filled out.</p>
      <div scFieldErrors></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RequiredInputDemo {
  private readonly model = signal({ name: '' });
  protected readonly nameForm = form(this.model, (s) =>
    required(s.name, { message: 'Fill this field out.' }),
  );
}

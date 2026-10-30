import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-input-demo',
  imports: [FormField, ScField, ScFieldDescription, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-xs">
      <label scLabel>Email</label>
      <input
        scInput
        type="email"
        [formField]="emailForm.email"
        placeholder="Email"
      />
      <p scFieldDescription>This field is currently disabled.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledInputDemo {
  private readonly model = signal({ email: '' });
  protected readonly emailForm = form(this.model, (s) => disabled(s.email));
}

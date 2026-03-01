import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { ScField, ScFieldErrors, ScLabel } from '@semantic-components/ui';
import { ScInput } from '@semantic-components/ui';

@Component({
  selector: 'app-error-field-demo',
  imports: [FormField, ScField, ScFieldErrors, ScInput, ScLabel],
  template: `
    <div scField>
      <label scLabel>Password</label>
      <input
        scInput
        type="password"
        [formField]="passwordForm.password"
        placeholder="Enter password"
      />
      <div scFieldErrors></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFieldDemo {
  readonly formModel = signal({ password: '' });
  readonly passwordForm = form(this.formModel, (s) => {
    required(s.password, { message: 'Password is required' });
  });
}

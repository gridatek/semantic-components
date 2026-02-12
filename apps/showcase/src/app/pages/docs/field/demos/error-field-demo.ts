import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldError,
  ScInput,
  ScLabel,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-error-field-demo',
  imports: [FormField, ScField, ScFieldError, ScInput, ScLabel],
  template: `
    <div sc-field>
      <label sc-label>Password</label>
      <input
        sc-input
        type="password"
        [formField]="passwordForm.password"
        placeholder="Enter password"
      />
      @for (error of passwordForm.password().errors(); track error.kind) {
        <p sc-field-error>{{ error.message }}</p>
      }
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

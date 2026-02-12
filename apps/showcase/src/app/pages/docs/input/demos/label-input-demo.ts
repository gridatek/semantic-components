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
  selector: 'app-label-input-demo',
  imports: [FormField, ScField, ScFieldError, ScInput, ScLabel],
  template: `
    <div sc-field>
      <label sc-label>Email</label>
      <input
        sc-input
        type="email"
        [formField]="emailForm.email"
        placeholder="Email"
      />
      @for (error of emailForm.email().errors(); track error.kind) {
        <p sc-field-error>{{ error.message }}</p>
      }
    </div>
    <pre class="mt-4 text-xs">
invalid: {{ emailForm.email().invalid() }}
disabled: {{ emailForm.email().disabled() }}
dirty: {{ emailForm.email().dirty() }}
value: "{{ emailForm.email().value() }}"
    </pre
    >
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputDemo {
  readonly formModel = signal({ email: '' });
  readonly emailForm = form(this.formModel, (s) => {
    required(s.email, { message: 'Email is required' });
  });
}

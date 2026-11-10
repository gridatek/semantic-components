import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

/** Two-way, [(value)], without a form: the code shown as it is typed. */
@Component({
  selector: 'app-controlled-otp-field-demo',
  imports: [ScField, ScLabel, ScOtpField, ScOtpFieldGroup, ScOtpFieldInput],
  template: `
    <div class="space-y-2">
      <div scField class="w-fit">
        <label scLabel>One-time password</label>
        <div scOtpField [(value)]="code">
          <div scOtpFieldGroup>
            <input scOtpFieldInput />
            <input scOtpFieldInput aria-label="Character 2 of 6" />
            <input scOtpFieldInput aria-label="Character 3 of 6" />
            <input scOtpFieldInput aria-label="Character 4 of 6" />
            <input scOtpFieldInput aria-label="Character 5 of 6" />
            <input scOtpFieldInput aria-label="Character 6 of 6" />
          </div>
        </div>
      </div>
      <p class="text-center text-sm">
        @if (code() === '') {
          Enter your one-time password.
        } @else {
          You entered: {{ code() }}
        }
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControlledOtpFieldDemo {
  protected readonly code = signal('');
}

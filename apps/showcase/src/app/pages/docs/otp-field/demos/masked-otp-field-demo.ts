import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
} from '@semantic-components/ui';

/** mask: the characters hidden as they are typed. */
@Component({
  selector: 'app-masked-otp-field-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
  ],
  template: `
    <div scField class="w-fit">
      <label scLabel>PIN</label>
      <div scOtpField mask [formField]="otpForm.pin">
        <div scOtpFieldGroup>
          <input scOtpFieldInput />
          <input scOtpFieldInput aria-label="Character 2 of 4" />
          <input scOtpFieldInput aria-label="Character 3 of 4" />
          <input scOtpFieldInput aria-label="Character 4 of 4" />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MaskedOtpFieldDemo {
  protected readonly otpForm = form(signal({ pin: '' }));
}

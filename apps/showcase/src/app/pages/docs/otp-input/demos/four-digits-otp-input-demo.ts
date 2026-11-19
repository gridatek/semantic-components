import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
} from '@semantic-components/ui';

/** As many inputs as characters: four. */
@Component({
  selector: 'app-four-digits-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
  ],
  template: `
    <div scField class="w-fit">
      <label scLabel>PIN</label>
      <div scOtpInput [formField]="otpForm.pin">
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot aria-label="Character 2 of 4" />
          <input scOtpInputSlot aria-label="Character 3 of 4" />
          <input scOtpInputSlot aria-label="Character 4 of 4" />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FourDigitsOtpInputDemo {
  private readonly otpForm = form(signal({ pin: '' }));
}

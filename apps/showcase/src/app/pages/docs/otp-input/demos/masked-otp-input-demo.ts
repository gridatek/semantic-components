import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
} from '@semantic-components/ui';

/** mask: the characters hidden as they are typed. */
@Component({
  selector: 'app-masked-otp-input-demo',
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
      <div
        scOtpInput
        slotLabel="Character {index} of {length}"
        mask
        [formField]="otpForm.pin"
      >
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MaskedOtpInputDemo {
  private readonly otpForm = form(signal({ pin: '' }));
}

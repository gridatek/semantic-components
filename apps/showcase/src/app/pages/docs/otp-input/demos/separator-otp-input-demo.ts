import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
} from '@semantic-components/ui';

/** Chunks of two, separators between them. */
@Component({
  selector: 'app-separator-otp-input-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
  ],
  template: `
    <div scField class="w-fit">
      <label scLabel>Verification code</label>
      <div
        scOtpInput
        slotLabel="Character {index} of {length}"
        [formField]="otpForm.code"
      >
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator></div>
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator></div>
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
}

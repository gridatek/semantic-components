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
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Six characters, one input each: typed in order, pasted or autofilled from an SMS. */
@Component({
  selector: 'app-otp-input-usage-demo',
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
      <div scOtpInput [formField]="otpForm.code">
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot aria-label="Character 2 of 6" />
          <input scOtpInputSlot aria-label="Character 3 of 6" />
        </div>
        <div scSeparator></div>
        <div scOtpInputGroup>
          <input scOtpInputSlot aria-label="Character 4 of 6" />
          <input scOtpInputSlot aria-label="Character 5 of 6" />
          <input scOtpInputSlot aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OtpInputUsageDemo {
  private readonly otpForm = form(signal({ code: '123456' }));
}

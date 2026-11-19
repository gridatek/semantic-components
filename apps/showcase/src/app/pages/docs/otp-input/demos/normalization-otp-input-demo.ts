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

/** normalizeValue: accepted text uppercased before it is kept. */
@Component({
  selector: 'app-normalization-otp-input-demo',
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
      <label scLabel>Invite code</label>
      <div
        scOtpInput
        slotLabel="Character {index} of {length}"
        validationType="alphanumeric"
        [normalizeValue]="uppercase"
        [formField]="otpForm.code"
      >
        <div scOtpInputGroup>
          <input scOtpInputSlot />
          <input scOtpInputSlot />
          <input scOtpInputSlot />
        </div>
        <div scSeparator></div>
        <div scOtpInputGroup>
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
export class NormalizationOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }));
  private readonly uppercase = (value: string) => value.toUpperCase();
}

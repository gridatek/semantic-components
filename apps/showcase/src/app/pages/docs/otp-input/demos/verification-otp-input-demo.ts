import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScFrame,
  ScLabel,
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSeparator,
  ScOtpInputSlot,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Complete — every input filled — it can be checked: complete() and data-complete. */
@Component({
  selector: 'app-verification-otp-input-demo',
  imports: [
    ScFrame,
    ScField,
    FormField,
    ScFieldDescription,
    ScLabel,
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScOtpInputSeparator,
    SiMinusIcon,
  ],
  template: `
    <div scFrame class="max-w-sm p-6">
      <div scField>
        <label scLabel class="justify-center">Enter verification code</label>
        <p scFieldDescription class="text-center">
          We sent a code to your email address.
        </p>
        <div
          scOtpInput
          #otp="scOtpInput"
          [formField]="otpForm.code"
          class="mx-auto"
        >
          <div scOtpInputGroup>
            <input scOtpInputSlot />
            <input scOtpInputSlot aria-label="Character 2 of 6" />
            <input scOtpInputSlot aria-label="Character 3 of 6" />
          </div>
          <div scOtpInputSeparator>
            <svg siMinusIcon></svg>
          </div>
          <div scOtpInputGroup>
            <input scOtpInputSlot aria-label="Character 4 of 6" />
            <input scOtpInputSlot aria-label="Character 5 of 6" />
            <input scOtpInputSlot aria-label="Character 6 of 6" />
          </div>
        </div>
        <p class="text-muted-foreground text-center text-sm" role="status">
          @if (otp.complete()) {
            Verifying {{ otpForm.code().value() }}…
          } @else {
            Enter all 6 digits.
          }
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerificationOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }), (path) => {
    required(path.code);
    minLength(path.code, 6);
  });
}

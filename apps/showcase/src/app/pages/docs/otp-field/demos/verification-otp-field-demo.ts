import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Complete — every input filled — it can be checked: complete() and data-complete. */
@Component({
  selector: 'app-verification-otp-field-demo',
  imports: [
    ScField,
    FormField,
    ScFieldDescription,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
    ScOtpFieldSeparator,
    SiMinusIcon,
  ],
  template: `
    <div class="max-w-sm rounded-lg border p-6">
      <div scField>
        <label scLabel class="justify-center">Enter verification code</label>
        <p scFieldDescription class="text-center">
          We sent a code to your email address.
        </p>
        <div
          scOtpField
          #otp="scOtpField"
          [formField]="otpForm.code"
          class="mx-auto"
        >
          <div scOtpFieldGroup>
            <input scOtpFieldInput />
            <input scOtpFieldInput aria-label="Character 2 of 6" />
            <input scOtpFieldInput aria-label="Character 3 of 6" />
          </div>
          <div scOtpFieldSeparator>
            <svg siMinusIcon></svg>
          </div>
          <div scOtpFieldGroup>
            <input scOtpFieldInput aria-label="Character 4 of 6" />
            <input scOtpFieldInput aria-label="Character 5 of 6" />
            <input scOtpFieldInput aria-label="Character 6 of 6" />
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
export class VerificationOtpFieldDemo {
  protected readonly otpForm = form(signal({ code: '' }), (path) => {
    required(path.code);
    minLength(path.code, 6);
  });
}

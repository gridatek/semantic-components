import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
  ScOtpFieldNextSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Required and six long, touched and short: marked invalid, its errors shown (Signal Forms). */
@Component({
  selector: 'app-invalid-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScFieldErrors,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
    ScOtpFieldNextSeparator,
    SiMinusIcon,
  ],
  template: `
    <div scField>
      <label scLabel>Verification code</label>
      <div scOtpFieldNext [formField]="otpForm.code">
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput />
          <input scOtpFieldNextInput aria-label="Character 2 of 6" />
        </div>
        <div scOtpFieldNextSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput aria-label="Character 3 of 6" />
          <input scOtpFieldNextInput aria-label="Character 4 of 6" />
        </div>
        <div scOtpFieldNextSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput aria-label="Character 5 of 6" />
          <input scOtpFieldNextInput aria-label="Character 6 of 6" />
        </div>
      </div>
      <p scFieldErrors></p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '12' }), (path) => {
    required(path.code, { message: 'Enter the code.' });
    minLength(path.code, 6, { message: 'Enter all 6 digits.' });
  });

  constructor() {
    // Touched already, to show it invalid.
    this.otpForm.code().markAsTouched();
  }
}

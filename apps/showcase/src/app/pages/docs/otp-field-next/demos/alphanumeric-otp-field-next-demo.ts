import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScOtpFieldNext,
  ScOtpFieldNextGroup,
  ScOtpFieldNextInput,
  ScOtpFieldNextSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** validationType="alphanumeric": letters and digits — recovery and invite codes. */
@Component({
  selector: 'app-alphanumeric-otp-field-next-demo',
  imports: [
    ScField,
    FormField,
    ScLabel,
    ScOtpFieldNext,
    ScOtpFieldNextGroup,
    ScOtpFieldNextInput,
    ScOtpFieldNextSeparator,
    SiMinusIcon,
  ],
  template: `
    <div scField class="w-fit">
      <label scLabel>Recovery code</label>
      <div
        scOtpFieldNext
        validationType="alphanumeric"
        [formField]="otpForm.code"
      >
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput />
          <input scOtpFieldNextInput aria-label="Character 2 of 6" />
          <input scOtpFieldNextInput aria-label="Character 3 of 6" />
        </div>
        <div scOtpFieldNextSeparator>
          <svg siMinusIcon></svg>
        </div>
        <div scOtpFieldNextGroup>
          <input scOtpFieldNextInput aria-label="Character 4 of 6" />
          <input scOtpFieldNextInput aria-label="Character 5 of 6" />
          <input scOtpFieldNextInput aria-label="Character 6 of 6" />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AlphanumericOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}

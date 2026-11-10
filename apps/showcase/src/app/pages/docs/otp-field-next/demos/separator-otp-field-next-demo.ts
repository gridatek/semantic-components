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

/** Chunks of two, separators between them. */
@Component({
  selector: 'app-separator-otp-field-next-demo',
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
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SeparatorOtpFieldNextDemo {
  protected readonly otpForm = form(signal({ code: '' }));
}

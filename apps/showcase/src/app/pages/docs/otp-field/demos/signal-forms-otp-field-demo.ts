import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScFieldErrors,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

interface OtpFormModel {
  otp: string;
}

/**
 * `[formField]` on the OTP field: once it is left incomplete, the slots turn
 * invalid and `scFieldErrors` (inside the field) shows the message.
 */
@Component({
  selector: 'app-signal-forms-otp-field-demo',
  imports: [
    ScFieldErrors,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldSeparator,
    ScOtpFieldInput,
    FormField,
    SiMinusIcon,
  ],
  template: `
    <div class="space-y-4">
      <div scOtpField [formField]="otpForm.otp">
        <div scOtpFieldGroup>
          <input scOtpFieldInput aria-label="Digit 1 of 6" />
          <input scOtpFieldInput aria-label="Digit 2 of 6" />
          <input scOtpFieldInput aria-label="Digit 3 of 6" />
          <div scOtpFieldSeparator>
            <svg siMinusIcon class="size-4"></svg>
          </div>
          <input scOtpFieldInput aria-label="Digit 4 of 6" />
          <input scOtpFieldInput aria-label="Digit 5 of 6" />
          <input scOtpFieldInput aria-label="Digit 6 of 6" />
        </div>
        <p scFieldErrors></p>
      </div>

      <div class="bg-muted/50 rounded-lg border p-4">
        <p class="text-sm font-medium">Form State:</p>
        <pre class="text-muted-foreground mt-2 text-xs">{{ formState() }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SignalFormsOtpFieldDemo {
  private readonly formModel = signal<OtpFormModel>({
    otp: '',
  });

  readonly otpForm = form(this.formModel, (path) => {
    required(path.otp, { message: 'Enter the code.' });
    minLength(path.otp, 6, { message: 'Enter all 6 digits.' });
  });

  formState(): string {
    return JSON.stringify(
      {
        value: this.formModel(),
        valid: this.otpForm.otp().valid(),
        invalid: this.otpForm.otp().invalid(),
        touched: this.otpForm.otp().touched(),
      },
      null,
      2,
    );
  }
}

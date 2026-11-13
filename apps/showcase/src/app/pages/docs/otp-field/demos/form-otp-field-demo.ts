import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon, SiRefreshCwIcon } from '@semantic-icons/lucide-icons';

/** In a card: a bigger code, a resend button beside its label, its errors once left. */
@Component({
  selector: 'app-form-otp-field-demo',
  imports: [
    ScField,
    FormField,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
    ScOtpFieldSeparator,
    SiMinusIcon,
    SiRefreshCwIcon,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardHeader>
        <h3 scCardTitle>Verify your login</h3>
        <p scCardDescription>
          Enter the verification code we sent to your email address:
          <span class="font-medium">m&#64;example.com</span>.
        </p>
      </div>
      <div scCardBody>
        <div scField>
          <div class="flex items-center justify-between">
            <label scLabel>Verification code</label>
            <button scButton variant="outline" size="xs" type="button">
              <svg siRefreshCwIcon></svg>
              Resend Code
            </button>
          </div>
          <div scOtpField [formField]="otpForm.code">
            <div scOtpFieldGroup class="*:h-12 *:w-11 *:text-xl">
              <input scOtpFieldInput />
              <input scOtpFieldInput aria-label="Character 2 of 6" />
              <input scOtpFieldInput aria-label="Character 3 of 6" />
            </div>
            <div scOtpFieldSeparator class="mx-2">
              <svg siMinusIcon></svg>
            </div>
            <div scOtpFieldGroup class="*:h-12 *:w-11 *:text-xl">
              <input scOtpFieldInput aria-label="Character 4 of 6" />
              <input scOtpFieldInput aria-label="Character 5 of 6" />
              <input scOtpFieldInput aria-label="Character 6 of 6" />
            </div>
          </div>
          <p scFieldDescription>
            <a href="#">I no longer have access to this email address.</a>
          </p>
          <p scFieldErrors></p>
        </div>
      </div>
      <div scCardFooter class="flex-col items-stretch gap-3">
        <button scButton type="button" (click)="verify()">Verify</button>
        <p class="text-muted-foreground text-sm">
          Having trouble signing in?
          <a href="#" class="hover:text-primary underline underline-offset-4"
            >Contact support</a
          >
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormOtpFieldDemo {
  protected readonly otpForm = form(signal({ code: '' }), (path) => {
    required(path.code, { message: 'Enter the code.' });
    minLength(path.code, 6, { message: 'Enter all 6 digits.' });
  });

  protected verify(): void {
    this.otpForm.code().markAsTouched();
  }
}

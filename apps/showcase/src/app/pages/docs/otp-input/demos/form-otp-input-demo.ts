import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
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
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
} from '@semantic-components/ui';
import { SiMinusIcon, SiRefreshCwIcon } from '@semantic-icons/lucide-icons';

/** In a card: a bigger code, a resend button beside its label, its errors once left. */
@Component({
  selector: 'app-form-otp-input-demo',
  imports: [
    RouterLink,
    SiMinusIcon,
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
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
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
          <div
            scOtpInput
            slotLabel="Character {index} of {length}"
            [formField]="otpForm.code"
          >
            <div scOtpInputGroup class="*:h-12 *:w-11 *:text-xl">
              <input scOtpInputSlot />
              <input scOtpInputSlot />
              <input scOtpInputSlot />
            </div>
            <div scSeparator><svg siMinusIcon></svg></div>
            <div scOtpInputGroup class="*:h-12 *:w-11 *:text-xl">
              <input scOtpInputSlot />
              <input scOtpInputSlot />
              <input scOtpInputSlot />
            </div>
          </div>
          <p scFieldDescription>
            <a routerLink="." fragment="i-no-longer-have"
              >I no longer have access to this email address.</a
            >
          </p>
          <p scFieldErrors></p>
        </div>
      </div>
      <div scCardFooter class="flex-col items-stretch gap-3">
        <button scButton type="button" (click)="verify()">Verify</button>
        <p class="text-muted-foreground text-sm">
          Having trouble signing in?
          <a
            routerLink="."
            fragment="contact-support"
            class="hover:text-primary underline underline-offset-4"
            >Contact support</a
          >
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormOtpInputDemo {
  private readonly otpForm = form(signal({ code: '' }), (path) => {
    required(path.code, { message: 'Enter the code.' });
    minLength(path.code, 6, { message: 'Enter all 6 digits.' });
  });

  private verify(): void {
    this.otpForm.code().markAsTouched();
  }
}

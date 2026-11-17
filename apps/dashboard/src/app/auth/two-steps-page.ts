import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, form, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScLabel,
  ScOtpField,
  ScOtpFieldGroup,
  ScOtpFieldInput,
  ScOtpFieldSeparator,
  ScToaster,
} from '@semantic-components/ui';
import { SiMinusIcon } from '@semantic-icons/lucide-icons';

/** Boxed Two Steps: the code sent to the phone (shadcndashboard's auth2/two-steps). */
@Component({
  selector: 'app-two-steps-page',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScLabel,
    ScOtpField,
    ScOtpFieldGroup,
    ScOtpFieldInput,
    ScOtpFieldSeparator,
    SiMinusIcon,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardHeader class="text-center">
        <h1 scCardTitle class="text-xl">Two Step Verification</h1>
        <p scCardDescription>
          We sent a verification code to your mobile. Enter the code from the
          mobile in the field below. ******1234
        </p>
      </div>
      <div scCardBody>
        <form
          class="flex flex-col items-center gap-6"
          (submit)="verify($event)"
        >
          <div scField class="w-fit">
            <label scLabel>Type your 6 digits security code</label>
            <div scOtpField [formField]="codeForm.code">
              <div scOtpFieldGroup>
                <input scOtpFieldInput />
                <input scOtpFieldInput aria-label="Character 2 of 6" />
                <input scOtpFieldInput aria-label="Character 3 of 6" />
              </div>
              <div scOtpFieldSeparator><svg siMinusIcon></svg></div>
              <div scOtpFieldGroup>
                <input scOtpFieldInput aria-label="Character 4 of 6" />
                <input scOtpFieldInput aria-label="Character 5 of 6" />
                <input scOtpFieldInput aria-label="Character 6 of 6" />
              </div>
            </div>
          </div>
          <button scButton type="submit" class="w-full">
            Verify My Account
          </button>
          <p class="text-muted-foreground text-sm">
            Didn't get the code?
            <button
              scButton
              variant="link"
              type="button"
              class="h-auto p-0"
              (click)="resend()"
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TwoStepsPage {
  private readonly router = inject(Router);
  private readonly toaster = inject(ScToaster);
  private readonly model = signal({ code: '' });
  protected readonly codeForm = form(this.model, (path) => {
    required(path.code);
    minLength(path.code, 6);
  });

  protected verify(event: Event): void {
    event.preventDefault();
    if (this.codeForm().valid()) void this.router.navigateByUrl('/');
  }

  protected resend(): void {
    this.toaster.show({ variant: 'info', title: 'A new code is on its way' });
  }
}

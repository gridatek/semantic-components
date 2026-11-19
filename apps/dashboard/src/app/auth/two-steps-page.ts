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
  ScOtpInput,
  ScOtpInputGroup,
  ScOtpInputSlot,
  ScSeparator,
  ScToaster,
} from '@semantic-components/ui';

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
    ScOtpInput,
    ScOtpInputGroup,
    ScOtpInputSlot,
    ScSeparator,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardHeader class="text-center">
        <h1
          i18n="@@auth.twoSteps.twoStepVerification"
          scCardTitle
          class="text-xl"
        >
          Two Step Verification
        </h1>
        <p i18n="@@auth.twoSteps.weSentAVerificationCode" scCardDescription>
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
            <label i18n="@@auth.twoSteps.typeYour6DigitsSecurity" scLabel
              >Type your 6 digits security code</label
            >
            <div scOtpInput [formField]="codeForm.code">
              <div scOtpInputGroup>
                <input scOtpInputSlot />
                <input
                  i18n-aria-label="@@auth.twoSteps.character2Of6"
                  scOtpInputSlot
                  aria-label="Character 2 of 6"
                />
                <input
                  i18n-aria-label="@@auth.twoSteps.character3Of6"
                  scOtpInputSlot
                  aria-label="Character 3 of 6"
                />
              </div>
              <div scSeparator></div>
              <div scOtpInputGroup>
                <input
                  i18n-aria-label="@@auth.twoSteps.character4Of6"
                  scOtpInputSlot
                  aria-label="Character 4 of 6"
                />
                <input
                  i18n-aria-label="@@auth.twoSteps.character5Of6"
                  scOtpInputSlot
                  aria-label="Character 5 of 6"
                />
                <input
                  i18n-aria-label="@@auth.twoSteps.character6Of6"
                  scOtpInputSlot
                  aria-label="Character 6 of 6"
                />
              </div>
            </div>
          </div>
          <button
            i18n="@@auth.twoSteps.verifyMyAccount"
            scButton
            type="submit"
            class="w-full"
          >
            Verify My Account
          </button>
          <p class="text-muted-foreground text-sm">
            <ng-container i18n="@@auth.twoSteps.didnTGetTheCode"
              >Didn't get the code?</ng-container
            >
            <button
              i18n="@@auth.twoSteps.resend"
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
  private readonly codeForm = form(this.model, (path) => {
    required(path.code);
    minLength(path.code, 6);
  });

  private verify(event: Event): void {
    event.preventDefault();
    if (this.codeForm().valid()) void this.router.navigateByUrl('/');
  }

  private resend(): void {
    this.toaster.show({
      variant: 'info',
      title: $localize`:@@auth.twoSteps.aNewCodeIsOn:A new code is on its way`,
    });
  }
}

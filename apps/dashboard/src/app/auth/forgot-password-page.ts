import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
  ScToaster,
} from '@semantic-components/ui';

/** Boxed Forgot Password. */
@Component({
  selector: 'app-forgot-password-page',
  imports: [
    FormField,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardHeader class="text-center">
        <h1
          i18n="@@auth.forgotPassword.forgotPassword"
          scCardTitle
          class="text-xl"
        >
          Forgot Password
        </h1>
        <p
          i18n="@@auth.forgotPassword.pleaseEnterTheEmailAddress"
          scCardDescription
        >
          Please enter the email address associated with your account and we
          will email you a link to reset your password.
        </p>
      </div>
      <div scCardBody>
        <form (submit)="send($event)">
          <div scFieldGroup>
            <div scField>
              <label i18n="@@auth.forgotPassword.emailAddress" scLabel
                >Email Address</label
              >
              <input
                scInput
                type="email"
                autocomplete="email"
                [formField]="resetForm.email"
              />
            </div>
            <button
              i18n="@@auth.forgotPassword.forgotPassword"
              scButton
              type="submit"
              class="w-full"
            >
              Forgot Password
            </button>
            <a
              i18n="@@auth.forgotPassword.backToLogin"
              scLink
              variant="outline"
              routerLink="/auth/login"
              class="w-full"
              >Back to Login</a
            >
          </div>
        </form>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordPage {
  private readonly toaster = inject(ScToaster);
  private readonly model = signal({ email: '' });
  private readonly resetForm = form(this.model, (path) => {
    required(path.email);
    email(path.email);
  });

  private send(event: Event): void {
    event.preventDefault();
    if (this.resetForm().invalid()) return;
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@auth.forgotPassword.checkYourEmail:Check your email`,
      description: $localize`:@@auth.forgotPassword.weSentAResetLink:We sent a reset link to ${this.model().email}.`,
    });
  }
}

import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import {
  FormField,
  email,
  form,
  minLength,
  required,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldDescription,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';
import { injectFormats } from '../shared/formats';
import { SocialButtons } from './social-buttons';

/** Boxed Register. */
@Component({
  selector: 'app-register-page',
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
    ScFieldDescription,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
    SocialButtons,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardHeader class="text-center">
        <h1 i18n="@@auth.register.signUp" scCardTitle class="text-xl">
          Sign Up
        </h1>
        <p i18n="@@auth.register.createYourAccount" scCardDescription>
          Create your account
        </p>
      </div>
      <div scCardBody class="flex flex-col gap-6">
        <app-social-buttons action="sign up" />
        <form (submit)="signUp($event)">
          <div scFieldGroup>
            <div scField>
              <label i18n="@@auth.register.name" scLabel>Name</label>
              <input
                scInput
                autocomplete="name"
                [formField]="registerForm.name"
              />
            </div>
            <div scField>
              <label i18n="@@auth.register.emailAddress" scLabel
                >Email Address</label
              >
              <input
                scInput
                type="email"
                autocomplete="email"
                [formField]="registerForm.email"
              />
            </div>
            <div scField>
              <label i18n="@@auth.register.password" scLabel>Password</label>
              <div scPasswordGroup #password="scPasswordGroup">
                <input
                  scPasswordInput
                  autocomplete="new-password"
                  [formField]="registerForm.password"
                />
                <button scPasswordToggle>
                  @if (password.visible()) {
                    <svg siEyeOffIcon></svg>
                    <span i18n="@@auth.register.hidePassword" class="sr-only"
                      >Hide password</span
                    >
                  } @else {
                    <svg siEyeIcon></svg>
                    <span i18n="@@auth.register.showPassword" class="sr-only"
                      >Show password</span
                    >
                  }
                </button>
              </div>
              <p i18n="@@auth.register.atLeast8Characters" scFieldDescription>
                At least {{ f.count(8) }} characters.
              </p>
            </div>
            <button
              i18n="@@auth.register.signUp"
              scButton
              type="submit"
              class="w-full"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p
          i18n="@@auth.register.alreadyHaveAnAccountSign"
          class="text-muted-foreground text-center text-sm"
        >
          Already have an account?
          <a scLink routerLink="/auth/login">Sign in</a>
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPage {
  /** Figures as the library writes them (the dashboard's choices). */
  private readonly f = injectFormats();
  /** In the user's numbering system. */

  private readonly router = inject(Router);
  private readonly model = signal({ name: '', email: '', password: '' });
  private readonly registerForm = form(this.model, (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
    required(path.password);
    minLength(path.password, 8);
  });

  private signUp(event: Event): void {
    event.preventDefault();
    if (this.registerForm().valid()) void this.router.navigateByUrl('/');
  }
}

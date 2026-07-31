import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  required,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
  ScSeparator,
} from '@semantic-components/ui';
import { SiGithubIcon } from '@semantic-icons/lucide-icons';
import { Logo } from '../../components/logo/logo';

@Component({
  selector: 'app-signup',
  imports: [
    FormField,
    FormRoot,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
    ScSeparator,
    SiGithubIcon,
    Logo,
  ],
  host: { class: 'block' },
  template: `
    <div class="bg-muted/30 flex min-h-screen items-center justify-center p-4">
      <div scCard class="w-full max-w-lg">
        <div scCardHeader class="text-center">
          <div class="mb-2 flex justify-center">
            <app-logo />
          </div>
          <h1 scCardTitle class="text-2xl">Create an account</h1>
          <p scCardDescription>Enter your information to get started</p>
        </div>

        <div scCardBody>
          <form [formRoot]="signupForm">
            <div scFieldGroup>
              <div class="grid grid-cols-2 gap-4">
                <div scField>
                  <label scLabel>First name</label>
                  <input
                    scInput
                    type="text"
                    [formField]="signupForm.firstName"
                    placeholder="John"
                  />
                </div>
                <div scField>
                  <label scLabel>Last name</label>
                  <input
                    scInput
                    type="text"
                    [formField]="signupForm.lastName"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div scField>
                <label scLabel>Email</label>
                <input
                  scInput
                  type="email"
                  [formField]="signupForm.email"
                  placeholder="john@example.com"
                />
              </div>

              <div scField>
                <label scLabel>Password</label>
                <input
                  scInput
                  type="password"
                  [formField]="signupForm.password"
                  placeholder="Create a password"
                />
              </div>

              <div scField>
                <label scLabel>Confirm password</label>
                <input
                  scInput
                  type="password"
                  [formField]="signupForm.confirmPassword"
                  placeholder="Confirm your password"
                />
              </div>

              <div class="flex items-start gap-2">
                <input type="checkbox" scCheckbox id="terms" />
                <label
                  scLabel
                  for="terms"
                  class="text-sm leading-snug font-normal"
                >
                  I agree to the
                  <a scLink variant="link" href="#">Terms of Service</a>
                  and
                  <a scLink variant="link" href="#">Privacy Policy</a>
                </label>
              </div>

              <button scButton class="w-full" type="submit">
                Create Account
              </button>

              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div scSeparator class="w-full"></div>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-card text-muted-foreground px-2">
                    Or continue with
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <button scButton variant="outline" type="button">
                  <svg siGithubIcon class="size-4"></svg>
                  GitHub
                </button>
                <button scButton variant="outline" type="button">Google</button>
              </div>
            </div>
          </form>
        </div>

        <div scCardFooter class="justify-center">
          <p class="text-muted-foreground text-sm">
            Already have an account?
            <a scLink variant="link" routerLink="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SignupPage {
  private readonly formModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  readonly signupForm = form(
    this.formModel,
    (s) => {
      required(s.firstName);
      required(s.lastName);
      required(s.email);
      email(s.email);
      required(s.password);
      required(s.confirmPassword);
    },
    {
      submission: {
        action: async (formTree) => {
          console.log('Submitting:', formTree().value());
        },
      },
    },
  );
}

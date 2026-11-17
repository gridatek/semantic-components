import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';
import { SocialButtons } from './social-buttons';

/** Boxed Login (shadcndashboard's auth2/login). */
@Component({
  selector: 'app-login-page',
  imports: [
    FormField,
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
    ScPasswordField,
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
        <h1 scCardTitle class="text-xl">Sign In</h1>
        <p scCardDescription>Your admin dashboard</p>
      </div>
      <div scCardBody class="flex flex-col gap-6">
        <app-social-buttons />
        <form (submit)="signIn($event)">
          <div scFieldGroup>
            <div scField>
              <label scLabel>Email</label>
              <input
                scInput
                type="email"
                autocomplete="email"
                [formField]="loginForm.email"
              />
            </div>
            <div scPasswordField #password="scPasswordField">
              <label scLabel>Password</label>
              <div scPasswordGroup>
                <input
                  scPasswordInput
                  autocomplete="current-password"
                  [formField]="loginForm.password"
                />
                <button scPasswordToggle>
                  @if (password.visible()) {
                    <svg siEyeOffIcon></svg>
                    <span class="sr-only">Hide password</span>
                  } @else {
                    <svg siEyeIcon></svg>
                    <span class="sr-only">Show password</span>
                  }
                </button>
              </div>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div scField orientation="horizontal">
                <input scCheckbox [formField]="loginForm.remember" />
                <label scLabel>Remember this device</label>
              </div>
              <a scLink routerLink="/auth/forgot-password" class="text-sm"
                >Forgot Password?</a
              >
            </div>
            <button scButton type="submit" class="w-full">Sign In</button>
          </div>
        </form>
        <p class="text-muted-foreground text-center text-sm">
          New to the dashboard?
          <a scLink routerLink="/auth/register">Create an account</a>
        </p>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage {
  private readonly router = inject(Router);
  private readonly model = signal({
    email: 'mathew.anderson@gmail.com',
    password: 'admin123',
    remember: true,
  });
  protected readonly loginForm = form(this.model, (path) => {
    required(path.email);
    email(path.email);
    required(path.password);
  });

  protected signIn(event: Event): void {
    event.preventDefault();
    if (this.loginForm().valid()) void this.router.navigateByUrl('/');
  }
}

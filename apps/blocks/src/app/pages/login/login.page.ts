import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
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
  selector: 'app-login',
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
      <div scCard class="w-full max-w-md">
        <div scCardHeader class="text-center">
          <div class="mb-2 flex justify-center">
            <app-logo />
          </div>
          <h1 scCardTitle class="text-2xl">Welcome back</h1>
          <p scCardDescription>Enter your credentials to access your account</p>
        </div>

        <div scCardBody>
          <form [formRoot]="loginForm">
            <div scFieldGroup>
              <div scField>
                <label scLabel>Email</label>
                <input
                  scInput
                  type="email"
                  [formField]="loginForm.email"
                  placeholder="name@example.com"
                  autocomplete="email"
                />
              </div>

              <div scField>
                <div class="flex items-center justify-between">
                  <label scLabel>Password</label>
                  <a scLink variant="link" routerLink="/forgot-password">
                    Forgot password?
                  </a>
                </div>
                <input
                  scInput
                  type="password"
                  [formField]="loginForm.password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
              </div>

              <div class="flex items-center gap-2">
                <input type="checkbox" scCheckbox id="remember" />
                <label scLabel for="remember">Remember me</label>
              </div>

              <button scButton class="w-full" type="submit">Log in</button>

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
            Don't have an account?
            <a scLink variant="link" routerLink="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  private readonly formModel = signal({
    email: '',
    password: '',
  });

  readonly loginForm = form(
    this.formModel,
    (s) => {
      required(s.email);
      email(s.email);
      required(s.password);
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

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
  ScInput,
  ScLabel,
  ScSeparator,
} from '@semantic-components/ui';
import { SiGithubIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-signup',
  imports: [
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScInput,
    ScLabel,
    ScSeparator,
    SiGithubIcon,
  ],
  host: { class: 'block' },
  template: `
    <div class="bg-muted/30 flex min-h-screen items-center justify-center p-4">
      <div scCard class="w-full max-w-lg">
        <div scCardHeader class="text-center">
          <h1 scCardTitle class="text-2xl">Create an account</h1>
          <p scCardDescription>Enter your information to get started</p>
        </div>

        <div scCardBody class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label scLabel for="first-name">First name</label>
              <input scInput id="first-name" type="text" placeholder="John" />
            </div>
            <div class="space-y-2">
              <label scLabel for="last-name">Last name</label>
              <input scInput id="last-name" type="text" placeholder="Doe" />
            </div>
          </div>

          <div class="space-y-2">
            <label scLabel for="signup-email">Email</label>
            <input
              scInput
              id="signup-email"
              type="email"
              placeholder="john@example.com"
            />
          </div>

          <div class="space-y-2">
            <label scLabel for="signup-password">Password</label>
            <input
              scInput
              id="signup-password"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <div class="space-y-2">
            <label scLabel for="confirm-password">Confirm password</label>
            <input
              scInput
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <div class="flex items-start gap-2">
            <input type="checkbox" scCheckbox id="terms" />
            <label scLabel for="terms" class="text-sm leading-snug font-normal">
              I agree to the
              <a href="#" class="text-primary underline underline-offset-4">
                Terms of Service
              </a>
              and
              <a href="#" class="text-primary underline underline-offset-4">
                Privacy Policy
              </a>
            </label>
          </div>

          <button scButton class="w-full">Create Account</button>

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
            <button scButton variant="outline">
              <svg siGithubIcon class="size-4"></svg>
              GitHub
            </button>
            <button scButton variant="outline">Google</button>
          </div>
        </div>

        <div scCardFooter class="justify-center">
          <p class="text-muted-foreground text-sm">
            Already have an account?
            <a
              routerLink="/login"
              class="text-primary underline underline-offset-4"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignupPage {}

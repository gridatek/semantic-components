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
  selector: 'app-login',
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
      <div scCard class="w-full max-w-md">
        <div scCardHeader class="text-center">
          <h1 scCardTitle class="text-2xl">Welcome back</h1>
          <p scCardDescription>Enter your credentials to access your account</p>
        </div>

        <div scCardBody class="space-y-4">
          <div class="space-y-2">
            <label scLabel for="email">Email</label>
            <input
              scInput
              id="email"
              type="email"
              placeholder="name@example.com"
              autocomplete="email"
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label scLabel for="password">Password</label>
              <a
                routerLink="/forgot-password"
                class="text-primary text-sm font-medium underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              scInput
              id="password"
              type="password"
              placeholder="Enter your password"
              autocomplete="current-password"
            />
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" scCheckbox id="remember" />
            <label scLabel for="remember">Remember me</label>
          </div>

          <button scButton class="w-full">Log in</button>

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
            Don't have an account?
            <a
              routerLink="/signup"
              class="text-primary font-medium underline-offset-4 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {}

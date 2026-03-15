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
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { SiMailIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterLink,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScInput,
    ScLabel,
    SiMailIcon,
  ],
  template: `
    <div class="bg-muted/30 flex min-h-screen items-center justify-center">
      <div scCard class="w-full max-w-md">
        <div scCardHeader class="text-center">
          <div class="mb-2 flex justify-center">
            <svg siMailIcon class="text-muted-foreground size-10"></svg>
          </div>
          <h1 scCardTitle>Forgot your password?</h1>
          <p scCardDescription>
            Enter your email address and we'll send you a reset link.
          </p>
        </div>
        <div scCardBody>
          <div class="space-y-4">
            <div class="space-y-2">
              <label scLabel for="email">Email</label>
              <input
                scInput
                id="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <button scButton class="w-full">Send Reset Link</button>
          </div>
        </div>
        <div scCardFooter class="justify-center">
          <a
            routerLink="/login"
            class="text-muted-foreground text-sm hover:underline"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ForgotPasswordPage {}
